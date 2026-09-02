---
title: Lua 脚本
description: "让 TClaw Agent 自己写 Lua 5.5 脚本并在设备上执行：lua_run_script 工具、沙盒规则、GPIO 与延时模块，以及如何扩展自己的模块。"
keywords:
  - TClaw
  - Lua
  - lua_run_script
  - 沙盒
  - MCP 工具
---

# Lua 脚本

TClaw 内嵌了一个 **Lua 5.5** 解释器，并以一个 MCP 工具 `lua_run_script` 暴露给 Agent。
Agent 针对眼前的具体情况现写一小段脚本，设备执行，脚本 `print` 出来的内容作为工具
结果返回。

真正有意思的地方在于分工：

- **你**把设备能力包装成 Lua 函数——`gpio.set_level`、`delay.delay_ms`，
  以及你自己扩展的那些。它们是**原语**。
- **Agent** 在需要的那一刻，现写把这些原语组合起来的**逻辑**。

这和普通 MCP 工具的形态不同。**工具**是你事先预判到的能力，用 C 实现好、随固件发布——
一次调用，一个固定行为；**脚本**则是 Agent **当场组合出来**的能力。所以一块只会翻转
引脚和延时的板子，依然可以做按键消抖、产生一段时序、轮询到电平稳定、把读数换算后再
判阈值——这些你一个工具都没写过，也不需要重新烧录固件。

换句话说，**让设备更强的办法是增加原语，而不是穷举结果**。你每暴露一个 Lua 函数，
Agent 能在它之上即兴发挥的空间就成倍增长。

## 什么时候该用

适合：

- 算术、单位换算、字符串或表处理、UTF-8 处理。
- 把若干变量归结成一个判断，只回传最终结果。
- 从其他工具已经取到的 JSON 字符串里挑一个字段。
- 用真正的逻辑去驱动 GPIO——循环、条件、时序——而不是一次工具调用只能做一个固定动作。

不适合——这些不在沙盒的设计范围内：

- 文件系统、网络、摄像头、显示控制。
- 运行超过几秒的任务。
- 在两次调用之间保留状态。每次调用都是全新的解释器，全局变量和模块都不会留存。

## 整体结构

三层，这也正是它容易扩展的原因：

```
云端 LLM
   │  MCP 工具调用：lua_run_script { code, timeout_ms }
   ▼
tools/tool_lua.c          MCP 封装 —— 输出捕获、超时、结果字符串
   ▼
components/lua/port/      沙盒运行时 —— 安全库子集、模块加载、
                          print() 捕获、超时钩子、traceback
   ▼
components/lua/modules/   硬件模块 —— gpio、delay，以及你自己加的
   ▼
TuyaOpen tkl_* / tal_*    真正的硬件 API
```

模块在初始化时把自己登记到一张小表里（`lua_module_register(name, luaopen_fn)`），
运行时会把所有已登记的模块装进每一个新建的解释器。上限
`LUA_MODULE_REGISTRY_MAX`（16 个）。

### 每次调用发生了什么

每一次 `lua_run_script` 调用都会新建一整个解释器、执行源码、然后整个丢掉：

1. **新建 `lua_State`**，分配器基于 `claw_malloc`——开启 `ENABLE_EXT_RAM` 时
   脚本内存来自 PSRAM。
2. **打开沙盒库子集**，只加载安全的那部分标准库。
3. **装入所有已注册模块**，于是 `gpio`、`delay` 以及你新增的模块直接以全局变量就绪。
4. **替换 `print()`**，改为写入回传给 Agent 的输出缓冲区的闭包。
5. **装上 debug 钩子**，每执行 100 条字节码触发一次，一旦超过墙钟截止时间就中断脚本。
6. **编译并执行**源码，且只接受文本模式——预编译字节码会被拒绝；随后关闭解释器，
   返回捕获到的输出。

由此带来两个直接结果。**失控的脚本不会把设备卡死**——第 5 步的钩子无论它在干什么
都会打断它。**脚本也留不下任何东西**：状态、全局变量、模块都随解释器一起销毁，
所以每次调用的独立性是结构上保证的，而不是靠约定。

## 如何开启

需要打开**两个**开关，而不是一个。`ENABLE_LUA` 编译解释器，`ENABLE_LUA_TOOL`
注册让 Agent 能调用它的 MCP 工具。只开前者，你会得到一个没人能调用的解释器。

```bash
CONFIG_ENABLE_LUA=y
CONFIG_ENABLE_LUA_TOOL=y             # 必需：注册 lua_run_script
CONFIG_ENABLE_LUA_MODULE_GPIO=y      # 可选：脚本中可用 gpio.*
CONFIG_ENABLE_LUA_MODULE_DELAY=y     # 可选：脚本中可用 delay.*
```

在 `menuconfig` 里两者位于不同菜单：`ENABLE_LUA` 与两个模块开关在
*Enable embedded Lua 5.5 interpreter* 下，`ENABLE_LUA_TOOL` 在
*Tools (Filesystem) Config* 下。

| 配置项 | 默认值 | 含义 |
| :-- | :-- | :-- |
| `ENABLE_LUA` | 关 | 编译 Lua 5.5 解释器 |
| `ENABLE_LUA_TOOL` | 关 | 注册 `lua_run_script` MCP 工具（依赖 `ENABLE_LUA`） |
| `LUA_OUTPUT_BUFFER_SIZE` | `4096` | `print()` 输出被截断前的最大字节数 |
| `LUA_DEFAULT_TIMEOUT_MS` | `3000` | 模型未指定超时时的墙钟预算 |
| `ENABLE_LUA_MODULE_GPIO` | 关 | 暴露 `gpio.*` |
| `ENABLE_LUA_MODULE_DELAY` | 关 | 暴露 `delay.*` |

`ENABLE_LUA` 关闭时，解释器与工具封装都不会被编译进去，因此不占用任何资源。

:::note
仓库自带的板型配置都没有开启 Lua，因此**预编译的 Release 镜像里不含该功能**，
需要从源码构建才能使用。
:::

## 沙盒

解释器是刻意做小的——Agent 写的代码你没有审过，所以影响范围在编译期就固定死，
而不是在运行时去信任它。可用：

- 标准库子集：base、`string`、`table`、`math`、`utf8`、`coroutine`。
- `os` 子集——**仅** `os.time()` 与 `os.date()`。

不可用：`io`、`package` / `require`、`debug`，以及任何网络与 shell 访问。
`os.execute`、`os.remove`、`os.rename`、`os.exit`、`os.getenv` 全部已移除。
预编译字节码会被拒绝，只接受文本源码。

:::warning[已知缺口]
目前 base 库是整体加载的，因此脚本仍然能拿到 `load`、`dofile`、`loadfile`。
`load` 不会带来脚本本来做不到的事，但 `dofile` 与 `loadfile` 走的是 C 的 `fopen`
——在 Linux 与树莓派目标上，这意味着真实的宿主文件系统读取能力。在收紧之前，
请把这个沙盒理解为「无网络、无 shell」，而不是完全封闭。
:::

有两点需要记牢：

- **`print()` 是唯一的输出通道。** 脚本没有 print 的东西，调用方看不到。
  超过 `LUA_OUTPUT_BUFFER_SIZE` 的输出会被截断，结果末尾带 `[output truncated]`。
- **每次调用都从零开始。** 每次都是全新的 `lua_State`，调用之间不留任何状态。

## 工具参数

`lua_run_script` 接受：

| 参数 | 类型 | 说明 |
| :-- | :-- | :-- |
| `code` | string | Lua 5.5 源码，纯文本 |
| `timeout_ms` | int | 可选，默认取 `LUA_DEFAULT_TIMEOUT_MS`，范围 100–60000 |

成功时返回捕获到的 `print()` 输出；若脚本没有任何输出，则返回
`Lua script completed with no output.`。出错时返回出错前已打印的内容，
后接 `ERROR: <message>` 与调用栈。超出预算会抛出 `execution timed out`。

## 硬件模块

编译进去后会作为全局变量加载。

### `gpio`

```lua
gpio.set_direction(pin, mode)   -- "input" | "output" | "input_output"
                                -- "output_od" | "input_output_od" | "disable"
gpio.set_level(pin, level)      -- 1 = 高，0 = 低
local v = gpio.get_level(pin)   -- 返回 0 或 1
```

引脚编号使用板卡原生编号，模块在所有板型上都接受 `0..55`。`set_level` 与
`get_level` 内部会重新初始化引脚，因此不强制要求先调用 `set_direction`。

### `delay`

```lua
delay.delay_ms(ms)   -- 让出当前任务
delay.delay_us(us)   -- 阻塞式，单次上限 1,000,000 us
```

一秒及以上的等待请用 `delay_ms`，好让调度器还能运行其他任务。
两者都计入脚本的超时预算。

## 示例

让 20 号引脚上的 LED 闪三次并回报：

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

Agent 收到的就是 `blinked 3 times on pin 20`。

## 扩展自己的模块

`gpio` 和 `delay` 只是随仓库自带的两个。同样的模式可以把 PWM、I2C、UART、ADC
或某个传感器驱动接进沙盒——**你每加一个模块，Agent 能即兴发挥的范围就宽一圈，
而不需要再动固件**。

以新增一个 `pwm` 模块为例，完整流程：

1. **写模块源码** `components/lua/modules/pwm/lua_module_pwm.c`。在 `luaopen_pwm()`
   里拼出一张 C 函数表，函数内部调 TuyaOpen 的 `tkl_*` / `tal_*` API，并自注册：

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

2. **加条件源**：在 `components/lua/CMakeLists.txt` 中按开关追加源文件，
   并把模块目录加进 include 路径。
3. **加 Kconfig 开关** `ENABLE_LUA_MODULE_PWM`（`components/lua/Kconfig`，
   `depends on ENABLE_LUA`）。
4. **调用注册函数**：在 `tools/tools_register.c` 中同样的条件编译保护下调用。
5. **在板型配置里启用**：`CONFIG_ENABLE_LUA_MODULE_PWM=y`。

然后要让模型知道它的存在——见下一节。**Agent 不知道的模块，等于没编译进去。**

完整流程（含沙盒内部实现与平台支持矩阵）见仓库中的 `docs/lua-module-porting.md`。

## 让 Agent 更会用它

内置的三个无需任何准备。工具描述本身已经告诉模型沙盒提供了什么，而 TClaw 把
`lua_run`、`lua_gpio`、`lua_delay` 作为**内置技能**随固件发布，`skill_loader` 会在
首次启动时把它们安装到设备的技能目录（`/sdcard/skills/`，无 SD 卡的板子为
`/skills/`）。其摘要会并入 system prompt，Agent 需要细节时再用 `read_file` 读取全文。

对于你自己新增的模块，照内置的做法做两件事：

- 在 `tools/tool_lua.c` 的 `lua_run_script` 描述里追加一行 `pwm.*` API 概要——
  这是**强信号**，模型每次都会看到。
- 补一份技能文档（`docs/skills/lua_pwm.md`，以及 `skills/skill_loader.c` 里
  精简版的 `BUILTIN_LUA_PWM`）作为完整参考。

技能机制的整体介绍见[硬件外设技能](./hardware-skill.md)；当动作是固定的、
Lua 不是合适的抽象层次时，改写原生工具见[自定义设备 MCP](./custom-device-mcp.md)。
