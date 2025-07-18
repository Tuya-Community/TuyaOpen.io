---
title: Create board
---

# Create `board`

This document is for developers who have designed a new hardware development board and need to do some driver initialization and adaptation work for this new development board.

## Overview

`tos.py new board` is a command-line tool provided by TuyaOpen SDK.

It is used to quickly create a new hardware development board support package based on chip platforms already supported by `TuyaOpen`.

This command helps developers quickly add new development board configurations for existing chip platforms through an interactive interface and template system, greatly simplifying the workflow of hardware porting and adaptation.

## Board Naming

### Mandatory Fields

- Manufacturer name: Represents the board manufacturer (e.g. "TUYA" for Tuya's boards)
- Chip name: Platform name (e.g. "T2", "T5AI")

### Optional Fields

- Key features: Indicate special functionalities (e.g. "LCD", "CAM")
- Series and version: For products with series variations
- Other identifiers: Additional hardware markers

### Naming Rules

1. UPPERCASE letters only
2. Fields separated by underscores
3. Order: Manufacturer_CoreBoardName_OptionalFields

Example: `TUYA_T5AI_BOARD`

## Operation Principle

1. Use the command `tos.py new board` to select the target platform

    After executing the command, the system will list all available hardware platforms:

    ```
    [INFO]: Running tos.py ...
    --------------------
    1. BK7231X
    2. ESP32
    3. LN882H
    4. T2
    5. T3
    6. T5AI
    7. Ubuntu
    --------------------
    Input "q" to exit.
    Choice platform: 6
    ```

    Use the arrow keys to select your target platform (here we use `T5AI` as an example), and press Enter to confirm.

2. Enter board name

    ```
    [NOTE] Input new board name.
    input: MY_CUSTOM_BOARD
    ```

    Enter the new development board name. It is recommended to use:

    - English uppercase letters
    - Underscores to separate words
    - Avoid using special characters

3. Automatically generate files

    The system will automatically create the following file structure:

    ```
    boards/<platform>/<board_name>/
    ├── Kconfig           # Board-level configuration file
    ├── CMakeLists.txt    # CMake build configuration
    ├── board_com_api.h   # Board-level API declarations
    └── board_com_api.c   # Board-level API implementation
    ```

    The `boards/<platform>/Kconfig` file will be automatically updated to include the new board configuration options:

    ```
    config BOARD_CHOICE_MY_CUSTOM_BOARD
    bool "MY_CUSTOM_BOARD"
    if (BOARD_CHOICE_MY_CUSTOM_BOARD)
        rsource "./MY_CUSTOM_BOARD/Kconfig"
    endif
    ```

## Next Steps

Overview:

    > 1. Verify compilation
    >
    > 2. Modify the `boards/<platform>/<board_name>/board_com_api.c` file to adapt the new development board
    >
    > 3. Adjust configuration
    >
    > 4. Save board-level default configuration file

### Verify Compilation

Use the command `tos.py new project` to create a new project, enter the project directory.

Use the command `tos.py config choice` to select a configuration for the same chip platform.

The advantage of this is that it can save configuration time.

Then use the command `tos.py config menu` to select the newly created development board.

Execute the command `tos.py build` to verify compilation.

### Adapt Development Board

Modify the `boards/<platform>/<board_name>/board_com_api.c` file to adapt the new development board.

Find the `PERATE_RET board_register_hardware(void)` function in the file and modify it according to the hardware information of the new development board.

For example, add initialization code for peripherals such as KEY, LED, I2C, etc. This process can refer to existing development board implementations.

If you need to add other source files or header file directories, you can modify the `CMakeLists.txt` file to configure the `LIB_SRCS` and `LIB_PUBLIC_INC` variables.

### Adjust Configuration

Use the command `tos.py config menu` to enter the configuration menu and adjust function options and parameters.

Combined with the previous step, verify functionality.

### Save Configuration

Copy the `app_default.config` file from the project directory to the `boards/<platform>/config` directory.

And rename it to `<board_name>.config`.

This makes it convenient for other developers to use.

## FAQ

### How to delete a created board

Directly delete the `boards/<platform>/<board_name>` directory and manually remove the related configuration from `boards/<platform>/Kconfig`.

### Modify the name of an already created board

Manual modification is required:
1. Rename the board directory
2. Update references in the platform Kconfig
3. Update the default values in the board's internal Kconfig
