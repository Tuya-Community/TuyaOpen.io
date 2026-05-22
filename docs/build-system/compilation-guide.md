---
title: Compilation Guide
---

## Overview

This guide describes the **`tos.py build`** pipeline: what runs after you configure a project, how Python in `TuyaOpen/tools/cli_command/` drives CMake/Ninja, and where artifacts land. It stays close to the implementation order in `cli_build.py`.

For **changing** configuration (`choice`, `menu`, `app_default.config`), use [Kconfig and project configuration](../peripheral/tutorials/kconfig-and-project-configuration). For **how** the SDK CMake graph ties to Kconfig (`libtuyaos.a`, components, app target), use [CMake, Kconfig, and the component model](cmake-kconfig-and-components). For **CLI** usage and screenshots, use [tos.py tool guide](../tos-tools/tos-guide).

## Build pipeline (high level)

```
tos.py build
    │
    ├── Environment check (submodules)
    ├── Configuration data (.build/cache/using.config)
    ├── Platform download (from platform_config.yaml)
    ├── Platform hooks (prepare / build_setup scripts)
    ├── CMake configure (Ninja generator, project .build/)
    ├── Ninja build (e.g. ninja example)
    └── Output validation (bin under .build/bin/)
```

## 1. Configuration phase (`cli_config.py`)

When you run **`tos.py config choice`**, **`tos.py config menu`**, or equivalent, the config flow (implemented in `TuyaOpen/tools/cli_command/cli_config.py`):

1. Writes **`app_default.config`** in the project (preset replace or menu save).
2. Merges Kconfig from the **project**, **`TuyaOpen/src`**, and **`TuyaOpen/boards`**, and writes generated files under **`<project>/.build/cache/`** (including a catalog of Kconfig inputs and a resolved **`using.config`** used by the build).

User-facing steps and recovery: [Kconfig and project configuration](../peripheral/tutorials/kconfig-and-project-configuration).

## 2. Build phase (`cli_build.py`)

Implementation reference: **`TuyaOpen/tools/cli_command/cli_build.py`**. Below matches the typical order of operations (names may vary slightly by release).

### 2.1 Environment check

Ensures SDK submodules are present. Equivalent:

```bash
git submodule update --init
```

### 2.2 Configuration initialization

Ensures **`<project>/.build/cache/using.config`** reflects the current Kconfig resolution. Key symbols used downstream include:

- `CONFIG_PROJECT_NAME` — project name  
- `CONFIG_PLATFORM_CHOICE` — platform  
- `CONFIG_CHIP_CHOICE` — chip  
- `CONFIG_BOARD_CHOICE` — board  
- `CONFIG_FRAMEWORK_CHOICE` — framework  

### 2.3 Platform download

Uses **`TuyaOpen/platform/platform_config.yaml`** (and git metadata) to clone or update the selected platform repository under **`TuyaOpen/platform/<platform_name>/`** at the pinned revision.

```bash
git clone <repository_url> <tuyaopen_root>/platform/<platform_name>
cd <tuyaopen_root>/platform/<platform_name>
git checkout <commit_hash>
```

### 2.4 Platform hooks (`platform_prepare` / `build_setup`)

If present, the platform tree may run **`platform_prepare.py`** and/or **`build_setup.py`** (toolchain fetch, extra config, and similar). Only one is strictly necessary; historically both may run. Typical invocations:

```bash
python <tuyaopen_root>/platform/<platform_name>/platform_prepare.py $CHIP
python <tuyaopen_root>/platform/<platform_name>/build_setup.py $PROJ_NAME $PLATFORM $FRAMEWORK $CHIP
```

### 2.5 CMake and Ninja

CMake is configured under **`<project>/.build/`** with Ninja as the generator, passing project root, platform, board, chip, and framework as CMake variables. Conceptually:

```bash
mkdir -p <project_root>/.build
cd <project_root>/.build
cmake -G Ninja $CMAKE_VERBOSE $OPEN_SDK_ROOT \
  -DTOS_PROJECT_NAME=$PROJ \
  -DTOS_PROJECT_ROOT=$PROJECT_ROOT \
  -DTOS_PROJECT_PLATFORM=$PROJECT_PLATFORM \
  -DTOS_FRAMEWORK=$PROJECT_FRAMEWORK \
  -DTOS_PROJECT_CHIP=$PROJECT_CHIP \
  -DTOS_PROJECT_BOARD=$PROJECT_BOARD
ninja example
```

**CMake layout** (toolchain includes, `src/` components, board BSP, app `CMakeLists.txt`, optional `build_example.py`): [CMake, Kconfig, and the component model](cmake-kconfig-and-components).

### 2.6 Output validation

The build checks that expected binaries exist under **`.build/bin/`** (see `check_bin_file` in `cli_build.py`).

## Project and SDK layout (build-relevant)

```
TuyaOpen/                          # SDK root (OPEN_SDK_ROOT in CMake)
├── tos.py
├── tools/cli_command/             # cli_build.py, cli_config.py, …
├── platform/                      # Downloaded platform trees
├── src/                           # SDK components (CMake per module)
├── boards/                        # Board BSP
└── …

<project>/                         # App or example (cwd for tos.py)
├── CMakeLists.txt
├── app_default.config
├── Kconfig
└── .build/
    ├── bin/                       # Firmware output
    ├── lib/
    ├── cache/                     # Generated Kconfig / config cache
    └── build/build_param          # Build metadata (when present)
```

## Compilation output

After a successful build:

- **Binary:** `.build/bin/{app_name}_QIO_{version}.bin` (exact pattern may vary by platform).
- **Libraries:** `.build/lib/`
- **Parameters:** `.build/build/build_param` (when generated)

Example log excerpt:

```
====================[ BUILD SUCCESS ]===================
 Target    : example_QIO_1.0.0.bin
 Output    : /path/to/project/.build/bin
 Platform  : T2
 Chip      : T2-U
 Board     : t2_evb
 Framework : base
========================================================
```

## Summary

- **Configure** with `tos.py config` → details in [Kconfig and project configuration](../peripheral/tutorials/kconfig-and-project-configuration).  
- **Build** with `tos.py build` → environment, platform, CMake/Ninja, validation as above.  
- **CMake structure** → [CMake, Kconfig, and the component model](cmake-kconfig-and-components).
