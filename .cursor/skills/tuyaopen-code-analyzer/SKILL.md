---
name: tuyaopen-code-analyzer
description: Deep-dive into TuyaOpen SDK codebase to extract documentation-worthy information. Use when analyzing TuyaOpen source code, identifying undocumented APIs, mapping code architecture, finding examples without docs, or planning documentation based on source code analysis.
---

# TuyaOpen Code Analyzer

Analyzes the TuyaOpen SDK source code at `TuyaOpen/` to identify documentation gaps and extract API information. Read-only -- never modifies source code.

## SDK Location

The TuyaOpen SDK is cloned at the repo root: `TuyaOpen/` (its own git repo).

## Layer Architecture

TuyaOpen follows a layered architecture. Understand which layer you are analyzing:

```
Applications (apps/)
    |
Services (src/tuya_cloud_service, src/tuya_ai_service, src/tuya_p2p)
    |
Libraries (src/libhttp, src/liblwip, src/libmqtt, src/libtls, src/liblvgl)
    |
TAL - Tuya Abstraction Layer (src/tal_*)
    |
TKL - Tuya Kernel Layer (tools/porting/adapter/*)
    |
BSP / Platform (boards/*, platform/*)
```

## Key Directories

| Path | Contents | Doc relevance |
|------|----------|---------------|
| `TuyaOpen/apps/` | Full application demos | Each app should have a doc in `docs/applications/` |
| `TuyaOpen/apps/tuya.ai/` | AI demos (chatbot, robot, emoji, etc.) | Maps to `docs/applications/tuya.ai/` |
| `TuyaOpen/apps/tuya_cloud/` | Cloud demos (switch, camera, weather) | Maps to `docs/applications/tuya_cloud/` |
| `TuyaOpen/examples/` | Focused examples by category | Maps to `docs/examples/` |
| `TuyaOpen/examples/peripherals/` | GPIO, UART, SPI, I2C, display, audio, etc. | Maps to `docs/peripheral/` and `docs/examples/` |
| `TuyaOpen/src/tal_*/` | TAL modules (system, wifi, bluetooth, etc.) | Docs should exist for each module's public API |
| `TuyaOpen/tools/porting/adapter/` | TKL adapter implementations | Maps to `docs/tkl-api/` |
| `TuyaOpen/boards/` | Board definitions (BK7231X, ESP32, LINUX, T2, T3, T5AI) | Maps to `docs/hardware-specific/` |
| `TuyaOpen/src/peripherals/` | Peripheral driver library (button, display, audio, etc.) | Maps to `docs/peripheral/` |
| `TuyaOpen/docs/` | SDK-internal docs (separate from Docusaurus site) | May contain useful content to port |

## Analysis Workflow

### Step 1: Identify Target

Decide what to analyze based on `agent-plan-workspace/PRD.md` priorities or user request:
- A specific module (e.g., `tal_wifi`)
- A category (e.g., all peripheral examples)
- An application (e.g., `apps/tuya.ai/your_chat_bot`)
- A platform (e.g., everything T5AI-specific)

### Step 2: Read Entry Points

For each target, read these files in order:

1. **README.md / README_zh.md** -- Overview, features, usage
2. **CMakeLists.txt** -- Dependencies, source files, build options
3. **Kconfig** -- Configurable options, defaults, dependencies
4. **Public headers (`include/*.h`)** -- API signatures, typedefs, enums, macros
5. **Implementation (`src/*.c`)** -- Call flow, error handling, platform conditionals

### Step 3: Extract API Information

For each public function in a header file, capture:

```
Function: function_name
Brief: (from @brief comment or inferred)
Parameters: (name, direction, type, description)
Return: (type and meaning)
Platforms: (all / specific -- check #ifdef guards)
Dependencies: (other modules required)
Example: (from README or example code)
```

### Step 4: Check Platform Support

Look for platform-conditional code:
- `#if defined(ENABLE_xxx)` or `#ifdef PLATFORM_xxx`
- Board-specific files in `boards/{platform}/`
- Kconfig `depends on` clauses

Record which platforms support the feature. This determines whether the doc goes in shared or hardware-specific location.

### Step 5: Cross-Reference with Existing Docs

Check if documentation already exists:
- Search `docs/` for the module/feature name
- Check `docs/tkl-api/` for TKL modules
- Check `docs/peripheral/` for peripheral drivers
- Check `docs/applications/` for app demos

### Step 6: Output Findings

Write results to `agent-plan-workspace/TODOS.md` as concrete tasks:

```markdown
- [ ] Document `tal_wifi` public API (12 functions, no existing doc)
- [ ] Add peripheral example doc for `examples/peripherals/camera/` (undocumented)
- [ ] Update `docs/applications/tuya.ai/demo-your-chat-bot.md` (new MCP features in source)
```

Write improvement recommendations to `agent-plan-workspace/IMPROVEMENTS.md`:

```markdown
### Missing Code Comments
- `src/tal_wifi/tal_wifi.c` -- `tal_wifi_scan()` missing @param descriptions
- `apps/tuya_cloud/switch_demo/src/tuya_main.c` -- no file header comment
```

## Analysis Commands

Use these CLI commands for exploration (read-only):

```bash
# List all public headers for a TAL module
ls TuyaOpen/src/tal_wifi/include/

# Find all public functions in a header
grep -n "^OPERATE_RET\|^VOID_T\|^BOOL_T\|^INT_T\|^UINT" TuyaOpen/src/tal_wifi/include/tal_wifi.h

# List all example directories
ls TuyaOpen/examples/peripherals/

# Check Kconfig options for a module
cat TuyaOpen/src/tal_wifi/Kconfig

# Find platform-specific code
grep -rn "#ifdef\|#if defined" TuyaOpen/src/tal_wifi/src/ | head -20

# List boards
ls TuyaOpen/boards/

# Check which apps exist
ls TuyaOpen/apps/tuya.ai/ TuyaOpen/apps/tuya_cloud/
```

## Rules

- **Never modify** any file under `TuyaOpen/`. Read-only analysis only.
- **Can execute** CLI commands to explore (grep, ls, cat, find, tos.py --help).
- **Cannot build** the SDK (may not have toolchain). Focus on source analysis.
- **Output to workspace** files only (`agent-plan-workspace/TODOS.md` and `IMPROVEMENTS.md`).

## SDK Structure Reference

For the full directory tree with descriptions, see [sdk-structure.md](sdk-structure.md).
