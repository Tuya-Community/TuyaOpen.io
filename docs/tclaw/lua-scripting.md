---
title: Lua Scripting
description: "Let the TClaw agent write Lua 5.5 scripts and run them on the device via the lua_run_script MCP tool — sandbox rules, GPIO and delay modules, and how to add your own."
keywords:
  - tclaw
  - lua
  - lua_run_script
  - sandbox
  - mcp tool
---

# Lua Scripting

TClaw embeds a **Lua 5.5** interpreter and exposes it to the agent as one MCP
tool, `lua_run_script`. The agent writes a short script for the situation in front
of it, the device executes it, and whatever the script `print`s comes back as the
tool result.

The division of labour is the interesting part:

- **You** wrap device capabilities as Lua functions — `gpio.set_level`,
  `delay.delay_ms`, and whatever else you add. These are the primitives.
- **The agent** writes the logic that combines them, at the moment it is needed.

That is a different shape from a normal MCP tool. A tool is a capability you
anticipated, implemented in C, and shipped in the firmware — one call, one fixed
behaviour. A script is a capability the agent *composes on the spot*. So a board
that can only toggle a pin and sleep can still debounce a button, emit a timing
pattern, poll until a level settles, or convert and threshold a reading — with no
tool written for any of it, and no reflash.

Which means the way to make the device more capable is to add primitives, not to
enumerate outcomes. Every Lua function you expose multiplies what the agent can
improvise from it.

## When it earns its place

Good fits:

- Arithmetic, unit conversion, string or table manipulation, UTF-8 handling.
- Collapsing several variables into one decision and returning just the answer.
- Picking a field out of a JSON string that another tool already fetched.
- Driving GPIO with real logic — loops, conditions, timing — rather than one
  fixed operation per tool call.

Poor fits — these are outside what the sandbox is meant to offer:

- Filesystem, network, camera, or display access.
- Anything that runs longer than a few seconds.
- Carrying state between calls. Every invocation gets a fresh interpreter;
  globals and modules do not survive.

## How it fits together

Three layers, which is also why it is straightforward to extend:

```
Cloud LLM
   │  MCP tool call: lua_run_script { code, timeout_ms }
   ▼
tools/tool_lua.c          MCP wrapper — output capture, timeout, result string
   ▼
components/lua/port/      sandbox runtime — safe library subset, module loading,
                          print() capture, timeout hook, traceback
   ▼
components/lua/modules/   hardware modules — gpio, delay, and anything you add
   ▼
TuyaOpen tkl_* / tal_*    the actual hardware APIs
```

Modules register themselves into a small table at init
(`lua_module_register(name, luaopen_fn)`), and the runtime loads every registered
module into each fresh interpreter. Up to `LUA_MODULE_REGISTRY_MAX` (16) modules.

### What happens on each call

Every `lua_run_script` call builds a whole interpreter, runs the source, and
throws it away:

1. **Create a fresh `lua_State`** with a `claw_malloc`-backed allocator, so
   script memory comes from PSRAM when `ENABLE_EXT_RAM` is on.
2. **Open the sandboxed library subset** — the safe standard libraries only.
3. **Load every registered module** into that state, so `gpio`, `delay` and
   anything you added are ready as globals.
4. **Replace `print()`** with a closure that appends to the output buffer handed
   back to the agent.
5. **Install a debug hook** that fires every 100 bytecode instructions and aborts
   the script once its wall-clock deadline passes.
6. **Compile and run** the source in text-only mode — precompiled bytecode is
   rejected — then close the state and return the captured output.

Two things follow from that. A runaway script cannot hang the device — step 5's
hook interrupts it regardless of what it is doing. And a script cannot leave
anything behind: state, globals and modules all die with the interpreter, so each
call is independent by construction rather than by convention.

## Enabling it

It takes **two** options, not one. `ENABLE_LUA` compiles the interpreter;
`ENABLE_LUA_TOOL` registers the MCP tool that lets the agent reach it. Setting
only the first gives you an interpreter nothing can call.

```bash
CONFIG_ENABLE_LUA=y
CONFIG_ENABLE_LUA_TOOL=y             # required: registers lua_run_script
CONFIG_ENABLE_LUA_MODULE_GPIO=y      # optional: gpio.* in scripts
CONFIG_ENABLE_LUA_MODULE_DELAY=y     # optional: delay.* in scripts
```

In `menuconfig` they sit in different menus: `ENABLE_LUA` and the two module
options under *Enable embedded Lua 5.5 interpreter*, and `ENABLE_LUA_TOOL` under
*Tools (Filesystem) Config*.

| Option | Default | Meaning |
| :-- | :-- | :-- |
| `ENABLE_LUA` | off | Compile the Lua 5.5 interpreter |
| `ENABLE_LUA_TOOL` | off | Register the `lua_run_script` MCP tool (requires `ENABLE_LUA`) |
| `LUA_OUTPUT_BUFFER_SIZE` | `4096` | Max bytes captured from `print()` before truncation |
| `LUA_DEFAULT_TIMEOUT_MS` | `3000` | Wall-clock budget when the model does not pass one |
| `ENABLE_LUA_MODULE_GPIO` | off | Expose `gpio.*` |
| `ENABLE_LUA_MODULE_DELAY` | off | Expose `delay.*` |

With `ENABLE_LUA` off, neither the interpreter nor the tool wrapper is compiled
in, so the feature costs nothing.

:::note
No shipped board config enables Lua, so a **prebuilt release image does not
include it**. You need a source build to use this feature.
:::

## The sandbox

The interpreter is deliberately small — the agent is writing code you have not
reviewed, so the blast radius is fixed at build time rather than trusted at
runtime. Available:

- Standard library subset: base, `string`, `table`, `math`, `utf8`, `coroutine`.
- An `os` subset — **only** `os.time()` and `os.date()`.

Not available: `io`, `package` / `require`, `debug`, and any network or shell
access. `os.execute`, `os.remove`, `os.rename`, `os.exit`, and `os.getenv` are all
removed. Pre-compiled bytecode is rejected — text source only.

:::warning[Known gap]
The base library is currently loaded whole, so `load`, `dofile`, and `loadfile`
are still reachable from a script. `load` adds nothing a script could not already
do, but `dofile` and `loadfile` go through C `fopen` — on the Linux and Raspberry
Pi targets that is real read access to the host filesystem. Until this is
tightened, treat the sandbox as "no network, no shell" rather than fully sealed.
:::

Two consequences worth internalising:

- **`print()` is the only output channel.** Anything the script does not print is
  invisible to the caller. Output beyond `LUA_OUTPUT_BUFFER_SIZE` is cut, and the
  result ends with `[output truncated]`.
- **Every call starts clean.** A fresh `lua_State` per invocation, so nothing
  carries over between calls.

## Tool parameters

`lua_run_script` takes:

| Parameter | Type | Notes |
| :-- | :-- | :-- |
| `code` | string | Lua 5.5 source, plain text |
| `timeout_ms` | int | Optional. Defaults to `LUA_DEFAULT_TIMEOUT_MS`, range 100–60000 |

On success you get the captured `print()` output, or
`Lua script completed with no output.` if the script printed nothing. On failure
you get whatever was printed before the error, then `ERROR: <message>` and a
traceback. Exceeding the budget raises `execution timed out`.

## Hardware modules

These are loaded as globals when compiled in.

### `gpio`

```lua
gpio.set_direction(pin, mode)   -- "input" | "output" | "input_output"
                                -- "output_od" | "input_output_od" | "disable"
gpio.set_level(pin, level)      -- 1 = HIGH, 0 = LOW
local v = gpio.get_level(pin)   -- returns 0 or 1
```

Pin numbers are board-native, and the module accepts `0..55` on every board.
`set_level` and `get_level` re-initialise the pin internally, so calling
`set_direction` first is optional.

### `delay`

```lua
delay.delay_ms(ms)   -- yields the task
delay.delay_us(us)   -- blocking, capped at 1,000,000 us per call
```

Use `delay_ms` for anything a second or longer so the scheduler can still run
other tasks. Both count against the script's timeout.

## Example

Blink an LED on pin 20 three times and report back:

```lua
local pin = 20
gpio.set_direction(pin, "output")
for i = 1, 3 do
  gpio.set_level(pin, 1)
  delay.delay_ms(200)
  gpio.set_level(pin, 0)
  delay.delay_ms(200)
end
print("blinked 3 times on pin " .. pin)
```

The agent receives `blinked 3 times on pin 20`.

## Adding your own module

`gpio` and `delay` are just the two that ship. The same pattern takes PWM, I2C,
UART, ADC, or a sensor driver into the sandbox — and every module you add widens
what the agent can improvise without further firmware work.

A new `pwm` module, end to end:

1. **Write the module** in `components/lua/modules/pwm/lua_module_pwm.c`. Build a
   table of C functions in `luaopen_pwm()`, call the TuyaOpen `tkl_*` / `tal_*`
   APIs from them, and self-register:

   ```c
   int luaopen_pwm(lua_State *L) {
       lua_newtable(L);
       lua_pushcfunction(L, lua_pwm_start); lua_setfield(L, -2, "start");
       return 1;
   }

   void lua_module_pwm_register(void) {
       lua_module_register("pwm", luaopen_pwm);
   }
   ```

2. **Add the source** conditionally in `components/lua/CMakeLists.txt`, and add
   the module directory to the include paths.
3. **Add a Kconfig switch** `ENABLE_LUA_MODULE_PWM` in `components/lua/Kconfig`,
   with `depends on ENABLE_LUA`.
4. **Call the registrar** from `tools/tools_register.c`, behind the same guard.
5. **Enable it** in your board config: `CONFIG_ENABLE_LUA_MODULE_PWM=y`.

Then tell the model it exists — see below. A module the agent does not know about
might as well not be compiled in.

The full walkthrough, including the sandbox internals and platform support
matrix, is in `docs/lua-module-porting.md` in the repository.

## Teaching the agent to use it

Nothing to set up for the built-ins. The tool description already tells the model
what the sandbox offers, and TClaw ships `lua_run`, `lua_gpio`, and `lua_delay` as
**built-in skills** that `skill_loader` installs into the device's skills
directory (`/sdcard/skills/`, or `/skills/` on boards without an SD card) on first
boot. Their summaries go into the system prompt, and the agent reads the full text
with `read_file` when it needs the detail.

For a module you added, do the same two things the built-ins do:

- Append a line summarising your `pwm.*` API to the `lua_run_script` description
  in `tools/tool_lua.c` — this is the strong signal, the model always sees it.
- Ship a skill file (`docs/skills/lua_pwm.md`, and a condensed `BUILTIN_LUA_PWM`
  in `skills/skill_loader.c`) for the full reference.

See [hardware peripheral skills](./hardware-skill.md) for the broader skill
mechanism, and [custom device MCP](./custom-device-mcp.md) for writing a native
tool instead when the operation is fixed and Lua is the wrong level.
