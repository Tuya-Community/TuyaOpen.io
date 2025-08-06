---
title: Create project
---

# Create `project`

## Overview

The `tos.py new project` command is used to create new projects in the TuyaOpen development environment.

This command quickly initializes the basic structure of a new project based on predefined templates.

## Operation Principle

1. Execute the command `tos.py new project`, the system will prompt you to enter the name of the new project and select a platform

    ```bash
    ❯ tos.py new project
    [INFO]: Running tos.py ...
    [NOTE]: Input new project name.
    input: new-project
    ```

    After the command execution is complete, the system will create a folder named `new-project` in the current directory, containing the basic structure of the new project.

1. Directory Structure

    ```
    new-project
    ├── app_default.config  # Default configuration file
    ├── CMakeLists.txt      # CMake build configuration
    └── src
        └── hello_world.c   # Sample code file
    ```

1. Option Parameters

    - `-f, --framework [base|arduino]`: Specify the framework type used by the project
        - `base` (default): Create a basic framework project
        - `arduino`: Create an Arduino framework project

## Next Steps

Overview:

    > 1. Compilation verification
    >
    > 2. Code development
    >
    > 3. Modify configuration, function verification
    >
    > 4. Save default configuration file for other developers to use

### Compilation Verification

Use the command `tos.py config choice` to select the chip platform configuration you want to use.

Then use the command `tos.py build` for compilation verification.

### Code Development

1. Determine your code directory structure and configure source file and header file paths in `CMakeLists.txt`

    Configure the source file and header file paths required by the target `add_library(${EXAMPLE_LIB})` in the file.

    Where `${EXAMPLE_LIB}` is a variable representing the library name, defined by the main framework, do not modify it yourself.

    Use standard `cmake` syntax to configure the `APP_SRC` and `APP_INC` variables.

1. Perform code development

    Use the interfaces provided in `${tuyaopen_root}/src` and `${tuyaopen_root}/platform/.../tuyaos_adapter` for development.

    You can refer to the official sample code in `apps` and `examples`.

1. Change configuration files

    Enter the configuration interface through the command `tos.py config menu` to adjust the configuration options of `TuyaOpen`.

### Function Verification

Flash and verify code functionality.

### Save Default Configuration File

Save the current configuration as the default configuration file through the command `tos.py config save`.

## FAQ