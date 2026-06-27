---
title: Create a project
---

`tos.py new project` creates a new project in the TuyaOpen development environment. The command initializes the basic structure of a project from a predefined template.

## Create the project

Run `tos.py new project`. The command prompts you for the project name and the platform.

```bash
❯ tos.py new project
[INFO]: Running tos.py ...
[NOTE]: Input new project name.
input: new-project
```

The command creates a folder named `new-project` in the current directory, containing the basic project structure.

### Directory

```
new-project
├── app_default.config  # Default configuration file
├── CMakeLists.txt      # CMake build configuration
└── src
    └── hello_world.c   # Sample code file
```

### Parameters

`-f, --framework [base|arduino]`: the framework type the project uses.

- `base` (default): creates a base framework project.
- `arduino`: creates an Arduino framework project.

## Next steps

After creating the project, build and verify it, write your code, adjust the configuration to verify functionality, and save the default configuration for other developers.

### Build and verify

1. Run `tos.py config choice` to select the chip platform configuration.
2. Run `tos.py build` to verify the compilation.

### Write code

1. Determine your code's directory structure, then configure the source and header file paths required by `add_library(${EXAMPLE_LIB})` in `CMakeLists.txt`.

    - `${EXAMPLE_LIB}` is the library name variable. The main framework defines it, so you do not modify it manually.
    - Configure the `APP_SRC` and `APP_INC` variables using standard `CMake` syntax.

2. Develop your code. Use the interfaces provided in `${tuyaopen_root}/src` and `${tuyaopen_root}/platform/.../tuyaos_adapter`. Refer to the official sample code under `apps` and `examples`.

3. Change the configuration. Run `tos.py config menu` to open the configuration interface, then adjust the TuyaOpen configuration options.

### Verify functionality

Flash the firmware and verify the code's functionality.

### Save the default configuration

Run `tos.py config save` to save the current configuration as the default configuration file.
