---
title: Compilation Guide
---

# TuyaOpen Compilation Process Detailed Guide

## Overview

This document provides a detailed introduction to the compilation process of the `TuyaOpen` project, from executing the `tos.py build` command to the complete process of generating binary files.

`TuyaOpen` uses Python scripts to coordinate CMake/Ninja build tools, supporting multi-platform and multi-configuration compilation.

## Compilation Process Architecture

```
tos.py build
    │
    ├── Environment Check
    ├── Configuration Initialization
    ├── Platform Download
    ├── Platform Preparation
    ├── Build Setup
    ├── CMake Configuration
    ├── Ninja Build
    └── Output Validation
```

## Process Description

### 1. Config Command Execution (cli_config.py)

When the user executes the `tos.py config choice` command:

1. **File Replacement**

    Replace the default `app_default.config` file with the user-selected configuration file.

2. **Generate CatalogKconfig**

    Generate the `CatalogKconfig` file in the `.build/cache/` directory, containing all Kconfig configuration files.

    Mainly includes `<project>/Kconfig`, `src/Kconfig`, and `boards/Kconfig`.

3. **Generate using.config File**

    Based on the configuration options provided by `CatalogKconfig` and the configuration results provided by the `app_default.config` file.

    Generate the `.build/cache/using.config` file.

    This file contains not only all user-selected code-related configuration information but also some compilation-related data, such as project name, version, platform, development board, etc.

### 2. Build Command Execution (cli_build.py)

Related logic can be found in the file: `tools/cli_command/cli_build.py`

#### 2.1 Environment Check

```python
def env_check():
    ...
```

Equivalent command:

```bash
git submodule update --init
```

Ensure all dependent submodules are properly updated.

#### 2.2 Configuration Initialization

Generate the `.build/cache/using.config` file

```python
init_using_config(force=False)
```

Main configuration items required for compilation include:
- `CONFIG_PROJECT_NAME`: Project name
- `CONFIG_PLATFORM_CHOICE`: Platform selection
- `CONFIG_CHIP_CHOICE`: Chip model
- `CONFIG_BOARD_CHOICE`: Development board model
- `CONFIG_FRAMEWORK_CHOICE`: Framework type

#### 2.3 Platform Download

```python
def download_platform(platform):
    ...
```

Based on the project configuration information and git information provided by the `platform/platform_config.yaml` file, download the corresponding hardware platform code.

Platform code is stored in the `platform/` directory.

Equivalent command:

```bash
git clone <repository_url> <tuyaopen_root>/platform/<platform_name>
cd <tuyaopen_root>/platform/<platform_name>
git checkout <commit_hash>
```

#### 2.4 Platform Preparation

If there is a `platform_prepare.py` script in the platform code, execute this script for platform-specific preparation work:

```python
def prepare_platform(platform, chip=""):
    ...
```

Please complete the required compilation tool downloads in this script, and it is recommended to download the toolchain in the `platform/tools` directory.

Preparation work needed before compilation, such as configuration file updates, parameter settings, etc., can also be implemented in this script.

Equivalent command:

```bash
python <tuyaopen_root>/platform/<platform_name>/platform_prepare.py $CHIP
```

#### 2.5 Build Setup

If there is a `build_setup.py` script in the platform code, execute this script for build setup:

```python
def build_setup(platform, project_name, framework, chip=""):
    ...
```

The purpose of this script is the same as the `platform_prepare.py` mentioned in "2.4 Platform Preparation", and the execution timing is also the same.

Therefore, only one of them needs to exist.

*Note: Due to some historical reasons in TuyaOpen's development, both scripts may take effect simultaneously*

Equivalent command:

```bash
python <tuyaopen_root>/platform/<platform_name>/build_setup.py $PROJ_NAME $PLATFORM $FRAMEWORK $CHIP
```

#### 2.6 CMake Configuration

Generate CMake build files:

```python
def cmake_configure(using_data, verbose=False):
    ...
```

`TuyaOpen` uses the CMake build system, with configuration files located in the `<tuyaopen_root>/CMakeLists.txt` file.

Main build steps are described later.

Equivalent command:

```bash
mkdir <project_root>/.build
cd <project_root>/.build
cmake -G Ninja $CMAKE_VERBOSE $OPEN_SDK_ROOT -DTOS_PROJECT_NAME=$PROJ -DTOS_PROJECT_ROOT=$PROJECT_ROOT -DTOS_PROJECT_PLATFORM=$PROJECT_PLATFORM -DTOS_FRAMEWORK=$PROJECT_FRAMEWORK -DTOS_PROJECT_CHIP=$PROJECT_CHIP -DTOS_PROJECT_BOARD=$PROJECT_BOARD
```

#### 2.7 Ninja Build

Execute the actual compilation process:

```python
def ninja_build(build_path, verbose=False):
    ...
```

Equivalent command:

```bash
cd <project_root>/.build
ninja example
```

#### 2.8 Output Validation

After compilation, verify that the generated binary files meet expectations:

```python
def check_bin_file(using_data):
    ...
```

### 3. CMake Build System (CMakeLists.txt)

The main CMakeLists.txt file is responsible for the build configuration of the entire project:

`<tuyaopen_root>/CMakeLists.txt`

#### 3.1 Kconfig Configuration System

- Use Kconfig to manage configuration options
- Include `using.cmake` configuration
- Generate `tuya_kconfig.h` header file

#### 3.2 Toolchain Configuration

```cmake
include("${PLATFORM_PATH}/toolchain_file.cmake")
```

Configure the specific location of the cross-compilation toolchain and common compilation options.

```cmake
include("${PLATFORM_PATH}/platform_config.cmake")
```

Configure header file paths used by the application layer. According to `TuyaOpen`'s cross-platform design, it should only include header file paths related to `tuyaos_adapter`.

#### 3.3 Component Compilation
```cmake
# Compile all components in the src/ directory
list_components(COMPONENT_LIST "${TOP_SOURCE_DIR}/src")
foreach(comp ${COMPONENT_LIST})
    add_subdirectory("${TOP_SOURCE_DIR}/src/${comp}")
endforeach(comp)

# Compile board-level code
if(EXISTS "${TOP_SOURCE_DIR}/boards/${TOS_PROJECT_PLATFORM}/${TOS_PROJECT_BOARD}/CMakeLists.txt")
    add_subdirectory("${TOP_SOURCE_DIR}/boards/${TOS_PROJECT_PLATFORM}/${TOS_PROJECT_BOARD}")
endif()
```

Each component can be configured for compilation through the `src/<component_name>/CMakeLists.txt` file.

Board-level code is configured for compilation through the `boards/<platform>/<board>/CMakeLists.txt` file.

Output: `lib<component_name>.a`

#### 3.4 Library File Generation
```cmake
# Generate tuyaos static library containing all components
add_library(${COMPONENTS_ALL_LIB} STATIC ${all_need})
```

Output: `libtuyaos.a`, a static library containing all components.

#### 3.5 Application Compilation
```cmake
# Compile application code
set(EXAMPLE_LIB "tuyaapp")
include(${TOS_PROJECT_ROOT}/CMakeLists.txt)
target_link_libraries(${EXAMPLE_LIB} ${COMPONENTS_ALL_LIB})
```

Application code is configured for compilation through the `<project_root>/CMakeLists.txt` file.

Output: `libtuyaapp.a`

#### 3.6 Platform Build
```cmake
# Call platform-specific build script
if(EXISTS "${TOP_SOURCE_DIR}/platform/${TOS_PROJECT_PLATFORM}/build_example.py")
    set(BUILD_COMMAND python -u ./build_example.py)
```

Since `TuyaOpen` supports multi-platform compilation, all platform-specific compilation logic can be implemented through the `platform/<platform_name>/build_example.py` file.

For the main purpose of the script, refer to: [build_example.py](../new-hardware/new-platform.md#build-and-link)

### 4. Key Files and Directory Structure

```
TuyaOpen/
├── tos.py                    # Main entry script
├── tools/
│   ├── cli_command/         # CLI command implementation
│   │   ├── cli_build.py     # build command implementation
│   │   ├── cli_config.py    # config command implementation
│   │   ├── util.py          # Utility functions
│   │   └── ...
│   ├── cmake/               # CMake related files
│   └── kconfiglib/          # Kconfig tools
├── platform/                # Platform code directory
│   ├── platform_config.yaml # Platform configuration
│   └── [platform_name]/     # Specific platforms
├── src/                     # Source code components
├── boards/                  # Board support packages
└── [project]/              # User project directory
    ├── CMakeLists.txt      # Project CMake file
    ├── app_default.config  # Default configuration
    └── .build/             # Build output directory
        ├── bin/            # Binary files
        ├── lib/            # Library files
        └── cache/          # Configuration cache
```

### 5. Compilation Output

After successful compilation, files will be generated in the following locations:

- **Binary files**: `.build/bin/{app_name}_QIO_{version}.bin`
- **Library files**: `.build/lib/`
- **Build parameters**: `.build/build/build_param`

Output information example:
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

TuyaOpen's build system coordinates CMake/Ninja build tools through Python scripts, achieving:

1. **Multi-platform support**: Support for different hardware platforms through platform abstraction layer
2. **Configuration management**: Use Kconfig system to manage configuration options
3. **Modular design**: Component-based source code structure
4. **Automated build**: One-click compilation, automatic dependency handling

The entire process is clearly designed, easy to extend and maintain, suitable for cross-platform development of IoT devices.

## FAQ
