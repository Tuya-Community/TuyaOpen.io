---
title: CMake, Kconfig, and the component model
---

## Overview

TuyaOpen uses **CMake** plus **Ninja** for the actual compile, and **Kconfig** (via `tos.py config`) to decide **what** gets built. This page explains how those layers connect: where libraries come from, how the SDK root and your project `CMakeLists.txt` relate, and where to look when you extend a board or component.

**Audience:** Developers porting boards, adding components, or debugging link errors.

## Prerequisites

- [Compilation guide](compilation-guide) — ordered **`tos.py build`** pipeline (env check → platform → CMake/Ninja → output).
- [Kconfig and project configuration](../peripheral/tutorials/kconfig-and-project-configuration) — `app_default.config`, `tos.py config choice` / `menu`, and generated cache under `.build/cache/`.

## Requirements

- Familiarity with CMake concepts (`add_subdirectory`, `target_link_libraries`, static libraries).
- A local [TuyaOpen](https://github.com/tuya/TuyaOpen) tree for path references (`TuyaOpen/` = SDK root, `<project>/` = app or example folder).

## Configuration to CMake (conceptual flow)

1. **`app_default.config`** in the project records your Kconfig choices (minimal diff).
2. **`tos.py config`** / **`tos.py build`** merges those choices with the Kconfig trees under `TuyaOpen/src`, `TuyaOpen/boards`, and the project’s own `Kconfig`, producing data under **`<project>/.build/cache/`** (see [compilation guide](compilation-guide)).
3. **CMake** is invoked with variables such as project name, platform, board, and chip so the correct toolchain, board BSP, and component set are selected.
4. **Kconfig output** is consumed by the CMake layer (for example via generated includes) so that `CONFIG_*` options match compiled sources and defines.

This page focuses on **structure and responsibility**; the [compilation guide](compilation-guide) lists the build steps and script entry points.

## Top-level CMake layout (SDK)

The SDK root **`TuyaOpen/CMakeLists.txt`** orchestrates:

- Toolchain and platform CMake fragments under `TuyaOpen/platform/<platform>/`.
- **Components** under `TuyaOpen/src/<component>/` — each component typically has its own `CMakeLists.txt`.
- **Board support** under `TuyaOpen/boards/<platform>/<board>/` when a board `CMakeLists.txt` exists.
- **Your application** — the project’s **`CMakeLists.txt`** (next to `app_default.config`) builds the app static library and links it against the aggregated SDK library.

In short: iterate **`src/`** components (each with `CMakeLists.txt`), optionally add **`boards/<platform>/<board>/`**, produce **`libtuyaos.a`**, then **`include(${TOS_PROJECT_ROOT}/CMakeLists.txt)`** and link target **`tuyaapp`** to that library (summarized in the [compilation guide](compilation-guide) CMake/Ninja step).

## What gets linked

| Artifact | Typical role |
|----------|----------------|
| **`libtuyaos.a`** | Static library built from enabled SDK components under `src/` (plus board glue as configured). |
| **`libtuyaapp.a`** (target `tuyaapp`) | Your application sources from the project `CMakeLists.txt`. |
| **Platform script** | `platform/<platform>/build_example.py` (when present) runs platform-specific packaging or flash layout steps after CMake/Ninja. |

Exact target names and flags can vary slightly by platform; treat your platform’s CMake and the [compilation guide](compilation-guide) build phase as authoritative.

## Project directory vs SDK root

| Location | Role |
|----------|------|
| **`TuyaOpen/`** | SDK: `src/`, `boards/`, `platform/`, root `CMakeLists.txt`, `tos.py`. |
| **`<project>/`** (e.g. `apps/...` or `examples/...`) | App: `CMakeLists.txt`, `app_default.config`, `Kconfig`, optional `config/*.config`, build output `.build/`. |

`tos.py` is always run from **`<project>/`**, not from `TuyaOpen/` alone, for normal app builds.

## Ninja and `.build`

CMake is configured with **Ninja**. The build tree lives under **`<project>/.build/`** (binaries under `.build/bin/`, libraries under `.build/lib/`, cache under `.build/cache/`). Do not commit `.build/`.

## Extending the system

- **New SDK component** — add a directory under `TuyaOpen/src/<name>/` with `CMakeLists.txt` and Kconfig wiring so it can be selected from menuconfig; follow an existing small component as a template.
- **New or custom board** — BSP under `TuyaOpen/boards/<platform>/<board>/` with CMake and Kconfig; see [New board](../new-hardware/new-board) and [Compilation guide](compilation-guide).
- **App-only changes** — usually only the project `CMakeLists.txt` and `app_default.config` / Kconfig in the app tree; avoid editing generated files under `.build/cache/`.

## Expected outcome

You can trace a feature from **Kconfig symbol** → **included sources** → **CMake target** → **final firmware**, and know which tree (`src`, `boards`, or project) to change for a given layer.

## References

- [Compilation guide](compilation-guide)
- [Kconfig and project configuration](../peripheral/tutorials/kconfig-and-project-configuration)
- [New platform](../new-hardware/new-platform), [New board](../new-hardware/new-board)
- [tos.py tool guide](../tos-tools/tos-guide)
