---
title: Create Project
---

# Create Project

## Overview

This topic describes how to run the `tos.py new project` command to create a new project. The `tos.py new project` command is used to create a new project within the TuyaOpen development environment. This command quickly initializes the basic structure of a new project based on predefined templates.

## Procedure

Run the command `tos.py new project`. The system will prompt you to enter the new project's name and select a platform.

```bash
❯ tos.py new project
[INFO]: Running tos.py ...
[NOTE]: Input new project name.
input: new-project
```

After the command execution is completed, the system will create a folder named `new-project` in the current directory, containing the basic structure of the new project.

### Directory

```
new-project
├── app_default.config  # Default configuration file
├── CMakeLists.txt      # CMake build configuration
└── src
    └── hello_world.c   # Sample code file
```

### Parameters

`-f, --framework [base|arduino]`: Specifies the framework type used by the project.
- `base` (default): Creates a base framework project.
- `arduino`: Creates an Arduino framework project.


## Next step

Overview:

    > 1. Build and verify.
    >
    > 2. Write code.
    >
    > 3. Modify configuration and verify functionality.
    >
    > 4. Save the default configuration file for use by other developers.

### Build and verify

First, use the command `tos.py config choice` to select the desired chip platform configuration.

Then, use the command `tos.py build` to perform compilation verification.

### Write code

1. Determine your code's directory structure and configure the source file and header file paths required for `add_library(${EXAMPLE_LIB})` in the `CMakeLists.txt` file.

   - `${EXAMPLE_LIB}`: This is the library name variable, defined by the main framework, and does not need to be modified manually.

   - Configure the `APP_SRC` and `APP_INC` variables using standard `CMake` syntax.

2. Proceed with code development.

   Develop using the interfaces provided in `${tuyaopen_root}/src` and `${tuyaopen_root}/platform/.../tuyaos_adapter`.

   You can refer to the official sample codes in `apps` and `examples`.

3. Change the configuration file.

   Run the command `tos.py config menu` to enter the configuration interface, then adjust TuyaOpen's configuration options.


### Verify functionalities

Flash the firmware and verify the code's functionalities.

### Save the default configuration file

Run the command `tos.py config save` to save the current configuration as the default configuration file.
