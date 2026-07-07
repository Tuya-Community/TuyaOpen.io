---
title: Create the platform
description: "Create the platform for a new TuyaOpen hardware target with tos.py new platform, which generates the directory structure and adapter template files."
keywords:
  - tuyaopen
  - new platform
  - tos.py
  - porting
  - tkl
---

`tos.py new platform` creates a porting template for a new hardware platform. The command generates a complete directory structure and the basic code files needed to adapt TuyaOpen to new hardware.

This command is for developers who want to port TuyaOS to a hardware chip or board that is not officially supported yet.

:::info
The `new platform` command greatly reduces the work of porting TuyaOS to new hardware. You do not create all the required files and directories by hand. Run the command, then focus on implementing the hardware-specific driver code in the generated template files (`.c` and `.h`).
:::

## Operation principle

1. Run `tos.py new platform`. The command prompts you for the name of the new platform, for example `my_new_chip`.

    ![Prompt to input the new platform name](/img/new-platform/new-platform-input.png)

2. Generate the Kconfig configuration:

    - The command creates a top-level `Kconfig` file to integrate the new platform into the project's configuration system.
    - A `menuconfig` interactive interface opens, where you select which basic features (such as WIFI, BLE, GPIO, and I2C) the new platform supports. Your selections are saved in a `default.config` file.

    ![menuconfig feature selection interface](/img/new-platform/new-platform-menu.png)

3. Create the platform directory. The command creates a folder named after your input (for example `platform/my_new_chip`) under the `platform/` directory.

    ![New platform folder under the platform directory](/img/new-platform/new-platform-filelist.png)

4. Copy the adapter layer templates. Based on your selections, the corresponding Tuya Kernel Layer (TKL) interface templates are copied from the `tools/porting/adapter` directory to `platform/my_new_chip/tuyaos/`.

    For example, if you select the WIFI feature, the WIFI template files such as `tkl_init_wifi.c` and `tkl_init_wifi.h` are copied over.

    ![Copied TKL adapter template files](/img/new-platform/new-platform-generate.png)

5. Create the board-level configuration. A folder with the same name (for example `boards/my_new_chip`) is also created under the `boards/` directory, with a corresponding `Kconfig` file that adds the new platform as an option in the build system.

    ![New board folder under the boards directory](/img/new-platform/new-platform-filelist2.png)

6. Verify the build. Run `tos.py new project` to create a new project, select the `my_new_chip` platform, then run `tos.py build` to build and verify.

    ![Creating a new project with the new platform](/img/new-platform/new-platform-build.png)

    ![Successful build of the new platform](/img/new-platform/new-platform-build2.png)

## Next steps

After creating the platform template, complete the following:

1. Modify `platform/my_new_chip/platform_prepare.py` for platform initialization, such as the toolchain download.
2. Modify `platform/my_new_chip/toolchain_file.cmake` to configure the actual paths of the build tools and the build options.
3. (Optional) Modify `platform/my_new_chip/platform_config.cmake` to configure header file paths used by the application layer.
4. Fill in the actual hardware driver code in the `platform/my_new_chip/tuyaos/tuyaos_adapter/src` directory.
5. Modify `platform/my_new_chip/build_example.py` to complete the build and link steps.
6. (Optional) Modify `platform/platform_config.yaml` to configure repository git information.

### Platform initialization

Modify `platform/my_new_chip/platform_prepare.py` for platform initialization, such as the toolchain download.

This script runs first during the build process. Complete the required build tool downloads in it. Download the toolchain to the `platform/tools` directory. You can develop the download logic yourself or refer to other official platforms (`T5AI`, `ESP32`).

If other operations must complete before compilation, implement them in this script as well.

![platform_prepare.py file content](/img/new-platform/new-platform-prepare.png)

### Configure build tools

Modify `platform/my_new_chip/toolchain_file.cmake` to configure the actual paths of the build tools and the build options.

This file specifies the actual paths of build tools such as `gcc`, `g++`, and `ar`, as well as the build options.

![toolchain_file.cmake file content](/img/new-platform/new-platform-toolchain.png)

### Configure special header file paths (optional)

Modify `platform/my_new_chip/platform_config.cmake` to configure header file paths used by the application layer.

:::info
- By the cross-platform design of `TuyaOpen`, this file should only include header file paths related to `tuyaos_adapter`, which the template already generates.
- If your platform needs to expose other header files to the application layer, add them in this file.
- The `PLATFORM_PUBINC` variable specifies the header file paths used by the application layer. Modify it to add header file paths.
:::

![platform_config.cmake file content](/img/new-platform/new-platform-config.png)

### Fill in the code

Fill in the actual hardware driver code in the `platform/my_new_chip/tuyaos/tuyaos_adapter/src` directory.

:::warning
This step is the most important part. You write the driver code according to the characteristics of your specific hardware platform.
:::

The template creation generates the necessary interface function templates. Implement the specific logic of these functions in the corresponding `.c` files.

Because `TuyaOpen` uses exactly the same underlying interface as `TuyaOS`, you can follow the [TuyaOS Porting Guide](https://developer.tuya.com/en/docs/iot-device-dev/TuyaOS-translation_linux?id=Kcrwrf72ciez5#title-1-Adapt-RTC) and the [RTOS Porting Guide](https://developer.tuya.com/en/docs/iot-device-dev/TuyaOS-translation_rtos?id=Kcrwraf21847l#title-1-Adapt-entry-point) for adaptation.

![tuyaos_adapter/src directory content](/img/new-platform/new-platform-src.png)

### Build and link

Modify `platform/my_new_chip/build_example.py` to complete the build and link steps.

Adjust this script according to the build method of the new platform. The script completes three steps:

1. Compile the source files in the `tuyaos_adapter` directory.
2. Compile the other source files the platform needs internally.
3. Link the build products with the `TuyaOpen` upper-layer products `libtuyaapp.a libtuyaos.a` into an executable file.

The script accepts two parameters: `params_path` and `user_cmd`.

- `params_path` is the path to the build parameter file. It provides three formats — cmake, config, and json — which you can access using `${BUILD_PARAM_PATH}/build_param.cmake`.

    The parameter file provides the parameters required for compilation, such as `OPEN_ROOT/OPEN_HEADER_DIR/OPEN_LIBS_DIR/PLATFORM_NEED_LIBS`. The results of the feature configuration are also in this parameter file.

- `user_cmd` is a user-defined command. Possible values are `build` to compile the platform code and `clean` to clean the build products. Implement the logic for each command in the script.

### Firmware flashing (optional)

A newly adapted hardware platform may require a specific firmware flashing method, and the `tyutool` flashing tool that `TuyaOpen` uses does not provide a universal flashing script.

You can submit an issue in the [tyutool repository](https://github.com/tuya/tyutool) to request official support.

### Configure repository information (optional)

Modify `platform/my_new_chip/platform_config.yaml` to configure repository git information.

This step applies when you provide the new platform to other developers. If you use it locally, you can skip this step.
