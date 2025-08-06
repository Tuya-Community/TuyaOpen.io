---
title: 创建platform
---

# 创建`platform`

## 概述

使用命令`tos.py new platform`，创建一个新的硬件平台移植模板

这个命令是给希望将涂鸦OS（TuyaOS）移植到一款新的、官方尚未支持的硬件芯片或开发板的开发者使用的。它会自动生成一套完整的、用于适配新硬件的目录结构和基础代码文件

总结：new platform 命令极大地简化了将TuyaOS移植到新硬件的工作量。开发者无需手动创建所有必需的文件和目录，只需运行此命令，然后专注于在生成的模板文件（`.c` 和 `.h`）中实现与具体硬件平台相关的驱动代码即可


## 操作原理

1. 输入命令`tos.py new platform`：会提示你输入新平台的名称（例如 `my_new_chip`）

    ![input new platform](/img/new-platform/new-platform-input.png)

1. 生成Kconfig配置：

    * 创建一个顶层的`Kconfig`文件，用于将新平台集成到项目的配置系统中

    * 弹出一个 `menuconfig` 交互界面，让你选择这个新平台需要支持哪些基础功能（如WIFI, BLE, GPIO, I2C等）。你的选择会保存在一个 `default.config` 文件中。

    ![menuconfig](/img/new-platform/new-platform-menu.png)

1. 创建平台目录：在 platform/ 目录下创建一个以你输入名称命名的文件夹（`platform/my_new_chip`）

    ![new platform floder](/img/new-platform/new-platform-filelist.png)

1. 复制适配层模板：根据你在上一步的选择，从 `tools/porting/adapter` 目录中复制对应的硬件抽象层（TKL - Tuya Kernel Layer）接口模板到 `platform/my_new_chip/tuyaos/` 目录下。

    * 例如，如果你勾选了WIFI功能，它就会把WIFI相关的 tkl_init_wifi.c 和 tkl_init_wifi.h 等文件的模板复制过去。

    ![new tuyaos](/img/new-platform/new-platform-generate.png)

1. 创建板级配置：在 `boards/` 目录下也创建一个同名文件夹（`boards/my_new_chip`），并生成相应的 `Kconfig` 文件，用于将这个新平台作为可选项添加到编译系统中。

    ![new board floder](/img/new-platform/new-platform-filelist2.png)

1. 编译验证，使用命令`tos.py new project`，创建一个新项目，选择`my_new_chip`平台，使用命令`tos.py build`编译验证。

    ![new project](/img/new-platform/new-platform-build.png)

    ![build project](/img/new-platform/new-platform-build2.png)

## 后续操作

概览：

    > 1. 修改`platform/my_new_chip/platform_prepare.py`文件，完成平台的初始，如工具链下载等操作
    >
    > 1. 修改`platform/my_new_chip/toolchain_file.cmake`文件，配置编译工具的实际路径，以及编译选项
    >
    > 1. *修改`platform/my_new_chip/platform_config.cmake`文件，配置应用层使用的头文件路径（非必要）*
    >
    > 1. 在`platform/my_new_chip/tuyaos/tuyaos_adapter/src`目录下，根据提示，填写实际的硬件驱动代码
    >
    > 1. 修改`platform/my_new_chip/build_example.py`文件，完成编译和链接步骤
    >
    > 1. *修改`platform/platform_config.yaml`文件，配置仓库的git信息（非必要）*

### 平台初始化

修改`platform/my_new_chip/platform_prepare.py`文件，完成平台的初始，如工具链下载等操作

在编译过程中，会先执行这个脚本

请在此脚本中完成所需要的编译工具下载，推荐将工具链下载在`platform/tools`目录下

下载逻辑可自行开发或参考其他官方平台（`T5AI`、`ESP32`）的实现

若有其他需要在编译前完成的操作，也可以在此脚本中实现

![platform prepare](/img/new-platform/new-platform-prepare.png)

### 配置编译工具

修改`platform/my_new_chip/toolchain_file.cmake`文件，配置编译工具的实际路径，以及编译选项

这个文件需要指定编译工具`gcc`、`g++`、`ar`等的实际路径，以及编译选项

![toolchain_file](/img/new-platform/new-platform-toolchain.png)

### 配置特殊头文件路径（非必要）

修改`platform/my_new_chip/platform_config.cmake`文件，配置应用层使用的头文件路径

根据`TuyaOpen`跨平台的设计，应该仅仅包含`tuyaos_adapter`相关的头文件路径，这部分已经在模板中生成了

但是如果你的平台需要暴露其他头文件给应用层使用，可以在这个文件中添加

变量 **`PLATFORM_PUBINC`**，用于指定应用层使用的头文件路径，可通过修改此变量来增加头文件路径

![platform config](/img/new-platform/new-platform-config.png)

### 补充代码

在`platform/my_new_chip/tuyaos/tuyaos_adapter/src`目录下，根据提示，填写实际的硬件驱动代码

此过程是最重要的部分，需要根据具体硬件平台的特性，编写对应的驱动代码

在创建模板的过程中，已经将一些必要的接口函数模板生成，在对应的`.c`文件中，实现这些函数的具体逻辑

因为`TuyaOpen` 使用的和 `TuyaOS` 完全一致的底层接口，可以按照 [TuyaOS移植指南](https://developer.tuya.com/cn/docs/iot-device-dev/TuyaOS-translation_linux?id=Kcrwrf72ciez5#title-1-适配-RTC) 和 [RTOS移植指南](https://developer.tuya.com/cn/docs/iot-device-dev/TuyaOS-translation_rtos?id=Kcrwraf21847l#title-1-适配程序入口) 进行适配。

![tuyaos adapter src](/img/new-platform/new-platform-src.png)

### 编译和链接

修改`platform/my_new_chip/build_example.py`文件，完成编译和链接步骤

可以根据新平台的编译方式修改此脚本，此脚本需要完成三个步骤：

    > 1. 编译``tuyaos_adapter`目录下的源代码文件
    >
    > 1. 编译平台内部需要的其他源代码文件
    >
    > 1. 将编译产物与`TuyaOpen`上层产物`libtuyaapp.a libtuyaos.a`链接成可执行文件

需要注意的是，该脚本接受两个参数：`params_path`和`user_cmd`

1. `params_path`是编译参数文件的路径，提供三种格式：cmake/config/json，可以使用`${BUILD_PARAM_PATH}/build_param.cmake`方式访问

        参数文件中会提供编译所需的各种参数，如`OPEN_ROOT/OPEN_HEADER_DIR/OPEN_LIBS_DIR/PLATFORM_NEED_LIBS`等等

        另外还有功能配置的结果，也在这个参数文件中，可以使用

1. `user_cmd`是用户自定义的命令

        可能值包括： `build`编译平台代码；`clean`清理编译产物

        你需要根据传入命令的不同，在脚本中实现不同的逻辑

### 关于固件烧录（非必要）

新适配的硬件平台可能需要特定的固件烧录方式，而``TuyaOpen`所使用的`tyutool`烧录工具并没有提供通用的烧录脚本

可以在[tyutool仓库](https://github.com/tuya/tyutool)提`issue`请求官方提供支持

### 配置仓库信息（非必要）

修改`platform/my_new_chip/platform_config.yaml`文件，配置仓库的git信息

此操作针对需要把新建的平台提供给其他开发者使用的情况

如果是本地自己使用，可忽略此步骤

## 常见问题
