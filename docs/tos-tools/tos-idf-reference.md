---
title: tos.py idf Command Reference
---

## Overview

`tos.py idf` forwards arguments to Espressif `idf.py` inside the ESP32 platform tree. Use it when you need native ESP-IDF workflows (menuconfig, fullclean, set-target, doctor, and so on) while staying in your TuyaOpen application directory.

**Audience:** Developers building ESP32 targets with TuyaOpen.

**Requirements:** Project must be configured for **ESP32** (`CONFIG_PLATFORM_CHOICE=ESP32` in `app_default.config`). Run `tos.py config choice` or `tos.py config menu` first.

## Behavior

1. Reads the active `app_default.config` and verifies the platform is ESP32.
2. Resolves the ESP32 platform directory under `TuyaOpen/platform/ESP32/`.
3. Builds a shell command: `idf.py` plus optional `--idf-flags` plus your subcommand and arguments.
4. Runs the command with working directory `platform/ESP32/tuya_open_sdk/` (where the ESP-IDF project lives).

This is a **passthrough**: any valid `idf.py` subcommand and options that your installed ESP-IDF supports can be used.

## Syntax

```bash
tos.py idf [OPTIONS] IDF_SUBCOMMAND [ARGS...]
```

| Option | Description |
|--------|-------------|
| `--idf-flags TEXT` | Extra tokens inserted after `idf.py` and before the subcommand (quoted string, shell-split). Example: `-v`, `-D MY_MACRO=1`. |

## Examples

```bash
tos.py idf menuconfig
tos.py idf fullclean
tos.py idf --idf-flags="-v" build
tos.py idf flash
```

## Common errors

- **Project not configured** — Run `tos.py config choice` or `tos.py config menu` from the application directory.
- **Not ESP32** — `idf` is rejected for other platforms; switch config or use the platform normal `tos.py build` flow.
- **Import or path errors** — Ensure ESP32 platform submodules and toolchain are installed (`tos.py check`, `tos.py update`).

## See also

- [ESP32 quick start](../hardware-specific/espressif/esp32-quick-start)
- [ESP32 overview](../hardware-specific/espressif/overview-esp32)
- [tos.py guide](tos-guide)
