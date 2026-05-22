---
title: Kconfig and project configuration
---

## Overview

TuyaOpen projects are configured with **Kconfig** (menu-driven options) and a small saved file, **`app_default.config`**, in each application or example directory. The `tos.py config` commands connect the two: you pick a board preset, optionally open a graphical menu, and the result is written back to `app_default.config`.

This page has two parts:

1. **Everyday use** — enough to select a board, toggle common features, and recover from mistakes.
2. **Deeper dive** — how Kconfig files are wired together and how configuration reaches the compiler (for BSP, driver, or build work).

**Audience:** Application developers (first sections) and BSP/driver developers (deeper section).

## Prerequisites

- Completed [Environment setup](../../quick-start/enviroment-setup) and able to run `tos.py` from a project folder (see [tos.py tool guide](../../tos-tools/tos-guide)).
- A clone of the [TuyaOpen](https://github.com/tuya/TuyaOpen) tree next to your workflow (paths below use `TuyaOpen/` as the SDK root).

## Requirements

- Shell in the **project directory** (for example `TuyaOpen/apps/tuya_cloud/switch_demo` or `TuyaOpen/examples/peripherals/gpio`).

## Everyday use

### What `app_default.config` is

Each app or example keeps an **`app_default.config`** file in its project root. It stores only **non-default** Kconfig choices (a minimal diff). Together with the Kconfig trees under the SDK, it defines platform, board, enabled components, and many feature toggles.

For a structural overview, see [TuyaOpen directory walkthrough — `app_default.config`](../../project-walkthrough#app_defaultconfig).

### Step 1: Choose a board or preset (`tos.py config choice`)

From your **project** directory:

```bash
tos.py config choice
```

You get a numbered list of **preset** `.config` files. Picking one **replaces** `app_default.config` with that preset. Presets come from:

1. A `config/` folder **inside the project** (if it exists), or
2. Otherwise, board bundles under `TuyaOpen/boards/` (typical for examples under `examples/`).

To **only** list board presets from `boards/` (ignore the project `config/` folder), use:

```bash
tos.py config -d choice
```

:::note
`choice` and `menu` run a **deep clean** first because the toolchain or platform may change when configuration changes.
:::

### Step 2: Adjust options (`tos.py config menu`)

To open the **menuconfig** UI and change options interactively:

```bash
tos.py config menu
```

Save and exit in the menu when done; the tool updates **`app_default.config`** accordingly. Use this when tutorials ask you to enable a driver, LVGL, Bluetooth role, and similar options.

Screenshots and command help: [tos.py — config](../../tos-tools/tos-guide#config).

### Step 3 (optional): Save your own preset (`tos.py config save`)

After you have a working `app_default.config` (often after using `menu`), you can snapshot it as a named preset under the project `config/` directory:

```bash
tos.py config save
```

Enter a name when prompted. That file can be selected later with `tos.py config choice`. This is useful for teams or for keeping debug vs release profiles.

### If configuration breaks the build

- Run **`tos.py config choice`** again and re-select a known-good preset.
- Restore `app_default.config` from version control if you committed a working version.
- Ask in support channels if a menu change pulled in an incompatible combination; see the warning on [tos.py config menu](../../tos-tools/tos-guide#config-menu).

## Deeper dive (for developers)

### Where Kconfig definitions live

Configuration options are spread across the SDK and the project:

- **Project** — `Kconfig` in the app/example root (app-specific options).
- **SDK** — `TuyaOpen/src/Kconfig` and subtrees for components (Wi-Fi, Bluetooth, display, and so on).
- **Boards** — `TuyaOpen/boards/<platform>/...` supply board and chip choices.

`tos.py config` aggregates these into a catalog used to resolve your selections against `app_default.config`.

### Generated files you may inspect

After `config` or `build`, the project **`.build/cache/`** directory (under the project, not the SDK root) typically holds generated configuration artifacts, including a merged view of selected symbols and metadata the build needs. The exact names can vary by tool version; treat this directory as **generated** — edit `app_default.config` or use `menu`, not these cache files by hand.

After Kconfig resolves, the build reads **`<project>/.build/cache/using.config`** and continues with platform fetch and CMake; see [Compilation guide](../../build-system/compilation-guide). For how **`libtuyaos.a`**, **`tuyaapp`**, and board `CMakeLists.txt` fit together, see [CMake, Kconfig, and the component model](../../build-system/cmake-kconfig-and-components).

### `CONFIG_*` symbols in C code

Enabled options become preprocessor macros (names usually prefixed with `CONFIG_`) included through generated headers used during compilation. When you `select` or `depends on` options in Kconfig, you are controlling which sources and defines participate in the link.

### ESP32 and IDF menuconfig

On ESP32 targets, native ESP-IDF configuration is available via `tos.py idf menuconfig` when the project is already configured for ESP32. See [tos.py idf reference](../../tos-tools/tos-idf-reference).

## Expected outcome

After `choice` or `menu`, `app_default.config` reflects your board and features, and `tos.py build` uses that configuration on the next compile.

## References

- [tos.py tool guide](../../tos-tools/tos-guide) (config choice, menu, save)
- [TuyaOpen directory walkthrough — `app_default.config`](../../project-walkthrough#app_defaultconfig)
- [Compilation guide](../../build-system/compilation-guide) (`tos.py build` after configuration)
- [CMake, Kconfig, and the component model](../../build-system/cmake-kconfig-and-components)
- [Display](../display) (see the Kconfig configuration section for display options)
