---
title: Create platform
---

# Create `platform`

## Overview

Use the command `tos.py new platform` to create a new hardware platform porting template.

This command is intended for developers who want to port TuyaOS to a new hardware chip or development board that is not officially supported yet. It will automatically generate a complete directory structure and basic code files for adapting to the new hardware.

Summary: The new platform command greatly simplifies the workload of porting TuyaOS to new hardware. Developers do not need to manually create all the required files and directories. Just run this command and then focus on implementing the hardware-specific driver code in the generated template files (`.c` and `.h`).

## Operation Principle

1. Enter the command `tos.py new platform`: You will be prompted to enter the name of the new platform (e.g., `my_new_chip`).

    ![input new platform](/img/new-platform/new-platform-input.png)

1. Generate Kconfig configuration:

    * Create a top-level `Kconfig` file to integrate the new platform into the project's configuration system.

    * A `menuconfig` interactive interface will pop up, allowing you to select which basic features (such as WIFI, BLE, GPIO, I2C, etc.) this new platform needs to support. Your selections will be saved in a `default.config` file.

    ![menuconfig](/img/new-platform/new-platform-menu.png)

1. Create the platform directory: A folder named after your input (e.g., `platform/my_new_chip`) will be created under the `platform/` directory.

    ![new platform folder](/img/new-platform/new-platform-filelist.png)

1. Copy adapter layer templates: According to your previous selections, the corresponding hardware abstraction layer (TKL - Tuya Kernel Layer) interface templates will be copied from the `tools/porting/adapter` directory to `platform/my_new_chip/tuyaos/`.

    * For example, if you checked the WIFI feature, the WIFI-related template files such as tkl_init_wifi.c and tkl_init_wifi.h will be copied over.

    ![new tuyaos](/img/new-platform/new-platform-generate.png)

1. Create board-level configuration: A folder with the same name (e.g., `boards/my_new_chip`) will also be created under the `boards/` directory, and a corresponding `Kconfig` file will be generated to add this new platform as an option in the build system.

    ![new board folder](/img/new-platform/new-platform-filelist2.png)

1. Build verification: Use the command `tos.py new project` to create a new project, select the `my_new_chip` platform, and use the command `tos.py build` to build and verify.

    ![new project](/img/new-platform/new-platform-build.png)

    ![build project](/img/new-platform/new-platform-build2.png)

## Next Steps

Overview:

    > 1. Modify the `platform/my_new_chip/platform_prepare.py` file to complete platform initialization, such as toolchain download operations
    >
    > 1. Modify the `platform/my_new_chip/toolchain_file.cmake` file to configure the actual path of the build tools and build options
    >
    > 1. *Modify the `platform/my_new_chip/platform_config.cmake` file to configure header file paths used by the application layer (optional)*
    >
    > 1. In the `platform/my_new_chip/tuyaos/tuyaos_adapter/src` directory, fill in the actual hardware driver code as prompted
    >
    > 1. Modify the `platform/my_new_chip/build_example.py` file to complete the build and link steps
    >
    > 1. *Modify the `platform/platform_config.yaml` file to configure repository git information (optional)*

### Platform Initialization

Modify the `platform/my_new_chip/platform_prepare.py` file to complete platform initialization, such as toolchain download operations.

This script will be executed first during the build process.

Please complete the required build tool downloads in this script. It is recommended to download the toolchain to the `platform/tools` directory.

The download logic can be developed independently or refer to the implementation of other official platforms (`T5AI`, `ESP32`).

If there are other operations that need to be completed before compilation, they can also be implemented in this script.

![platform prepare](/img/new-platform/new-platform-prepare.png)

### Configure Build Tools

Modify the `platform/my_new_chip/toolchain_file.cmake` file to configure the actual path of the build tools and build options.

This file needs to specify the actual paths of build tools such as `gcc`, `g++`, `ar`, etc., as well as build options.

![toolchain_file](/img/new-platform/new-platform-toolchain.png)

### Configure Special Header File Paths (Optional)

Modify the `platform/my_new_chip/platform_config.cmake` file to configure header file paths used by the application layer.

According to the cross-platform design of `TuyaOpen`, it should only include header file paths related to `tuyaos_adapter`, which have already been generated in the template.

However, if your platform needs to expose other header files to the application layer, you can add them in this file.

The variable **`PLATFORM_PUBINC`** is used to specify the header file paths used by the application layer. You can modify this variable to add header file paths.

![platform config](/img/new-platform/new-platform-config.png)

### Fill in the Code

In the `platform/my_new_chip/tuyaos/tuyaos_adapter/src` directory, fill in the actual hardware driver code as prompted.

This process is the most important part, requiring the writing of corresponding driver code according to the specific hardware platform characteristics.

During the template creation process, some necessary interface function templates have been generated. Implement the specific logic of these functions in the corresponding `.c` files.

Since `TuyaOpen` uses exactly the same underlying interface as `TuyaOS`, you can follow the [TuyaOS Porting Guide](https://developer.tuya.com/cn/docs/iot-device-dev/TuyaOS-translation_linux?id=Kcrwrf72ciez5#title-1-Adapt-RTC) and [RTOS Porting Guide](https://developer.tuya.com/cn/docs/iot-device-dev/TuyaOS-translation_rtos?id=Kcrwraf21847l#title-1-Adapt-entry-point) for adaptation.

![tuyaos adapter src](/img/new-platform/new-platform-src.png)

### Build and Link

Modify the `platform/my_new_chip/build_example.py` file to complete the build and link steps.

This script can be modified according to the build method of the new platform. This script needs to complete three steps:

    > 1. Compile the source code files in the `tuyaos_adapter` directory
    >
    > 1. Compile other source code files needed internally by the platform
    >
    > 1. Link the build products with the `TuyaOpen` upper-layer products `libtuyaapp.a libtuyaos.a` into an executable file

It should be noted that this script accepts two parameters: `params_path` and `user_cmd`.

1. `params_path` is the path to the build parameter file, providing three formats: cmake/config/json, which can be accessed using `${BUILD_PARAM_PATH}/build_param.cmake`.

        The parameter file will provide various parameters required for compilation, such as `OPEN_ROOT/OPEN_HEADER_DIR/OPEN_LIBS_DIR/PLATFORM_NEED_LIBS`, etc.

        In addition, the results of function configuration are also in this parameter file and can be used.

1. `user_cmd` is a user-defined command.

        Possible values include: `build` to compile platform code; `clean` to clean build products.

        You need to implement different logic in the script according to the different commands passed in.

### About Firmware Flashing (Optional)

The newly adapted hardware platform may require specific firmware flashing methods, and the `tyutool` flashing tool used by `TuyaOpen` does not provide universal flashing scripts.

You can submit an `issue` in the [tyutool repository](https://github.com/tuya/tyutool) to request official support.

### Configure Repository Information (Optional)

Modify the `platform/my_new_chip/platform_config.yaml` file to configure repository git information.

This operation is for cases where you need to provide the newly created platform to other developers.

If you are using it locally, you can ignore this step.

## FAQ
