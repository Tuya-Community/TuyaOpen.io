---
title: Create Board
---

# Create Board


## Overview

This topic is intended for developers designing new hardware development boards independently, providing guidance on the driver initialization process and adaptation for that development board.

`tos.py new board` is a command-line tool provided by the TuyaOpen SDK. It is used to rapidly create a new support package based on chip platforms already supported by TuyaOpen. Utilizing an interactive interface and a template system, this command helps you quickly add new board configurations for existing chip platforms, significantly simplifying the hardware porting and adaptation workflow.

## Board naming

### Required fields

- Manufacturer name: The manufacturer of the development board. Boards released by Tuya would start with **TUYA**.
- Chip name: The platform name, such as **T2** and **T5AI**.

### Optional fields

- Key features: If the board has specific functional modules or characteristics, they should reflect the board's main features or functions, such as **LCD** and **CAM**.
- Series name and version information: Some manufacturers have product series, which can be reflected in the naming along with version numbers.
- Other: Various hardware identifiers.

### Naming rules

- Use uppercase English letters.
- Connect fields with underscores (_).
- Field combination order: **Manufacturer name_Development board name_Optional fields**.
- Avoid using special characters.

Example: `TUYA_T5AI_BOARD`.


## Procedure

1. Run the command `tos.py new board` and select the desired platform. After the command is run, the system will list all available hardware platforms.

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

    Use the arrow keys to select the desired platform (using T5AI as an example here), then press Enter to confirm.

2. Enter the development board name.

    ```
    [NOTE] Input new board name.
    input: MY_CUSTOM_BOARD
    ```

    :::tip
    Strictly adhere to the naming rules during this process.
    :::

3. The system will automatically generate the following file structure.

   ```
   boards/<platform>/<board_name>/
   ├── Kconfig           # Board-level configuration file
   ├── CMakeLists.txt    # CMake build configuration
   ├── board_com_api.h   # Board-level API declarations
   └── board_com_api.c   # Board-level API implementations
   ```

   The `boards/<platform>/Kconfig` file will be automatically updated to include the configuration options for the new board.

    ```
    config BOARD_CHOICE_MY_CUSTOM_BOARD
    bool "MY_CUSTOM_BOARD"
    if (BOARD_CHOICE_MY_CUSTOM_BOARD)
        rsource "./MY_CUSTOM_BOARD/Kconfig"
    endif
    ```

## Next step

Overview:

    > 1. Verify the compilation.
    >
    > 2. Modify the `boards/<platform>/<board_name>/board_com_api.c` file to adapt to the new development board.
    >
    > 3. Adjust the configuration.
    >
    > 4. Save the board-level default configuration file.

### Verify the compilation

1. Run the command `tos.py new project` to create a new project and navigate to the project directory.

2. Run the command `tos.py config choice` to select configurations for the same chip platform (this can save configuration time).

3. Run the command `tos.py config menu` to select the newly created development board.

4. Run the command `tos.py build` to verify the compilation.


### Adapt to development boards

Modify the `boards/<platform>/<board_name>/board_com_api.c` file to adapt to the new development board.

Locate the `PERATE_RET board_register_hardware(void)` function within the file and modify it based on the new board's hardware information.

For example, add initialization code for peripherals such as KEY, LED, and I2C. You can refer to the implementation of existing development boards for this process.

If you need to add other source files or header directories, you can do so by modifying the `CMakeLists.txt` file and configuring the `LIB_SRCS` and `LIB_PUBLIC_INC` variables.

### Adjust configuration

Run the command `tos.py config menu` to enter the configuration menu and adjust functional options and parameters.

Then, combine this with the previous step to verify the functionality.

### Save configuration

Copy the `app_default.config` file from the project directory to the `boards/<platform>/config` directory, and rename it to `<board_name>.config` to facilitate use by other developers.

## FAQs

### How to delete a created development board?

Delete the `boards/<platform>/<board_name>` directory, then manually remove the relevant configuration from `boards/<platform>/Kconfig`.

### How to rename a created development board?

You can rename the board manually.

1. Rename the development board directory.
2. Update the references in the platform's Kconfig.
3. Update the default values in the development board's internal Kconfig.
