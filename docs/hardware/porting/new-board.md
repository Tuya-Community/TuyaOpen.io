---
title: Add a new board
description: "Add a new board to a TuyaOpen-supported chip platform with tos.py new board, which generates a board configuration through an interactive prompt."
keywords:
  - tuyaopen
  - new board
  - bsp
  - tos.py
  - porting
---

`tos.py new board` creates a new board support package for a chip platform that TuyaOpen already supports. Through an interactive prompt and a template system, the command adds a new board configuration to an existing chip platform, which simplifies hardware porting and adaptation.

This guide is for developers who design their own hardware boards and need to adapt the driver initialization flow for that board.

## Board naming

A board name combines required and optional fields.

### Required fields

- Manufacturer name: the manufacturer of the board. Boards released by Tuya start with **TUYA**.
- Chip name: the platform name, such as **T2** or **T5AI**.

### Optional fields

- Key features: a functional module or characteristic that reflects the board's main feature, such as **LCD** or **CAM**.
- Series name and version: some manufacturers maintain product series, which you can reflect in the name together with a version number.
- Other: any additional hardware identifier.

### Naming rules

- Use uppercase English letters.
- Connect fields with underscores (`_`).
- Order fields as **Manufacturer name_Board name_Optional fields**.
- Avoid special characters.

For example: `TUYA_T5AI_BOARD`.

## Create the board

1. Run `tos.py new board` and select the target platform. The command lists all available hardware platforms.

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

    Use the arrow keys to select the platform (T5AI here), then press Enter to confirm.

2. Enter the board name.

    ```
    [NOTE] Input new board name.
    input: MY_CUSTOM_BOARD
    ```

    :::tip
    Follow the naming rules above.
    :::

3. The command generates the following file structure.

    ```
    boards/<platform>/<board_name>/
    ├── Kconfig           # Board-level configuration file
    ├── CMakeLists.txt    # CMake build configuration
    ├── board_com_api.h   # Board-level API declarations
    └── board_com_api.c   # Board-level API implementations
    ```

    The command also updates `boards/<platform>/Kconfig` to include the configuration options for the new board.

    ```
    config BOARD_CHOICE_MY_CUSTOM_BOARD
    bool "MY_CUSTOM_BOARD"
    if (BOARD_CHOICE_MY_CUSTOM_BOARD)
        rsource "./MY_CUSTOM_BOARD/Kconfig"
    endif
    ```

## Next steps

After creating the board, verify the compilation, adapt the board API, adjust the configuration, and save the board-level default configuration.

### Verify the compilation

1. Run `tos.py new project` to create a new project, then enter the project directory.

2. Run `tos.py config choice` to select an existing configuration for the same chip platform. This saves configuration time.

3. Run `tos.py config menu` and select the new board.

4. Run `tos.py build` to verify the compilation.

### Adapt the board

Modify `boards/<platform>/<board_name>/board_com_api.c` to adapt the new board.

Locate the `OPERATE_RET board_register_hardware(void)` function in the file and modify it based on the board's hardware information. For example, add initialization code for peripherals such as KEY, LED, and I2C. Refer to existing boards for the implementation.

To add other source files or header directories, modify `CMakeLists.txt` and configure the `LIB_SRCS` and `LIB_PUBLIC_INC` variables.

### Adjust configuration

Run `tos.py config menu` to open the configuration menu and adjust functional options and parameters. Then verify the functionality together with the previous step.

### Save configuration

Copy the `app_default.config` file from the project directory to the `boards/<platform>/config` directory, and rename it to `<board_name>.config` so that other developers can reuse it.

## FAQ

### How do I delete a created board?

Delete the `boards/<platform>/<board_name>` directory, then manually remove the related configuration from `boards/<platform>/Kconfig`.

### How do I rename a created board?

Rename the board manually:

1. Rename the board directory.
2. Update the references in the platform's `Kconfig`.
3. Update the default values in the board's internal `Kconfig`.
