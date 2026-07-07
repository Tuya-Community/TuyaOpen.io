---
title: 创建平台
description: "介绍 tos.py new platform 命令：生成完整的平台目录结构与 TKL 适配层模板代码，用于将 TuyaOpen 移植到新硬件芯片。"
keywords:
  - 创建平台
  - tos.py
  - TKL 模板
  - 移植
  - TuyaOpen 硬件
---

`tos.py new platform` 用于创建一个新的硬件平台移植模板。该命令会自动生成一套完整的目录结构和基础代码文件，用于将 TuyaOpen 适配到新硬件。

该命令适用于需要将涂鸦操作系统（TuyaOS）移植到官方暂未支持的硬件芯片或开发板的开发者。

:::info
`new platform` 命令极大地简化了将 TuyaOS 移植到新硬件的工作量。您无需手动创建所有必需的文件和目录，只需运行此命令，然后专注于在生成的模板文件（`.c` 和 `.h`）中实现与具体硬件平台相关的驱动代码即可。
:::

## 操作原理

1. 运行 `tos.py new platform`。命令会提示您输入新平台的名称，例如 `my_new_chip`。

    ![输入新平台名称的提示](/img/new-platform/new-platform-input.png)

2. 生成 `Kconfig` 配置：

    - 命令会创建一个顶层 `Kconfig` 文件，将新平台集成到项目的配置系统中。
    - 随后弹出 `menuconfig` 交互界面，您可以选择此新平台需要支持哪些基础功能（如 WIFI、BLE、GPIO、I2C 等），选择会保存在 `default.config` 文件中。

    ![menuconfig 功能选择界面](/img/new-platform/new-platform-menu.png)

3. 创建平台目录：命令会在 `platform/` 目录下创建一个以新平台名称命名的文件夹，例如 `platform/my_new_chip`。

    ![platform 目录下的新平台文件夹](/img/new-platform/new-platform-filelist.png)

4. 复制适配层模板：根据您的选择，从 `tools/porting/adapter` 目录复制对应的硬件抽象层（Tuya Kernel Layer，TKL）接口模板到 `platform/my_new_chip/tuyaos/` 目录下。

    例如，勾选 WIFI 功能后，`tkl_init_wifi.c`、`tkl_init_wifi.h` 等 WIFI 相关模板文件会被复制过来。

    ![复制的 TKL 适配层模板文件](/img/new-platform/new-platform-generate.png)

5. 创建板级配置：命令会在 `boards/` 目录下创建一个同名文件夹（例如 `boards/my_new_chip`），并生成相应的 `Kconfig` 文件，将此新平台作为可选项添加到编译系统中。

    ![boards 目录下的新板级文件夹](/img/new-platform/new-platform-filelist2.png)

6. 编译验证：运行 `tos.py new project` 创建一个新项目，选择 `my_new_chip` 平台，然后运行 `tos.py build` 进行编译验证。

    ![使用新平台创建新项目](/img/new-platform/new-platform-build.png)

    ![新平台编译成功](/img/new-platform/new-platform-build2.png)

## 后续操作

创建平台模板后，完成以下操作：

1. 修改 `platform/my_new_chip/platform_prepare.py` 文件，完成平台初始化，如工具链下载等操作。
2. 修改 `platform/my_new_chip/toolchain_file.cmake` 文件，配置编译工具的实际路径和编译选项。
3. （非必要）修改 `platform/my_new_chip/platform_config.cmake` 文件，配置应用层使用的头文件路径。
4. 在 `platform/my_new_chip/tuyaos/tuyaos_adapter/src` 目录下，根据提示填写实际的硬件驱动代码。
5. 修改 `platform/my_new_chip/build_example.py` 文件，完成编译和链接步骤。
6. （非必要）修改 `platform/platform_config.yaml` 文件，配置仓库的 Git 信息。

### 平台初始化

修改 `platform/my_new_chip/platform_prepare.py` 文件，完成平台初始化，如工具链下载等操作。

此脚本在编译过程中最先执行。请在此脚本中完成所需的编译工具下载，推荐将工具链下载到 `platform/tools` 目录。下载逻辑可自行开发，也可参考其他官方平台（`T5AI`、`ESP32`）的实现。

若有其他需要在编译前完成的操作，也可以在此脚本中实现。

![platform_prepare.py 文件内容](/img/new-platform/new-platform-prepare.png)

### 配置编译工具

修改 `platform/my_new_chip/toolchain_file.cmake` 文件，配置编译工具的实际路径和编译选项。

此文件需要指定 `gcc`、`g++`、`ar` 等编译工具的实际路径和编译选项。

![toolchain_file.cmake 文件内容](/img/new-platform/new-platform-toolchain.png)

### 配置特殊头文件路径（非必要）

修改 `platform/my_new_chip/platform_config.cmake` 文件，配置应用层使用的头文件路径。

:::info
- 根据 `TuyaOpen` 的跨平台设计，此文件应仅包含 `tuyaos_adapter` 相关的头文件路径，这部分已在模板中生成。
- 如果您的平台需要向应用层暴露其他头文件，可在此文件中添加。
- `PLATFORM_PUBINC` 变量用于指定应用层使用的头文件路径，修改此变量即可增加头文件路径。
:::

![platform_config.cmake 文件内容](/img/new-platform/new-platform-config.png)

### 补充代码

在 `platform/my_new_chip/tuyaos/tuyaos_adapter/src` 目录下，根据提示填写实际的硬件驱动代码。

:::warning
本步骤非常重要。您需要根据具体硬件平台的特性编写对应的驱动代码。
:::

创建模板时已生成必要的接口函数模板，请在对应的 `.c` 文件中实现这些函数的具体逻辑。

因为 `TuyaOpen` 使用了与 `TuyaOS` 完全一致的底层接口，您可以参考 [TuyaOS 移植指南](https://developer.tuya.com/cn/docs/iot-device-dev/TuyaOS-translation_linux?id=Kcrwrf72ciez5#title-1-适配-RTC) 和 [RTOS 移植指南](https://developer.tuya.com/cn/docs/iot-device-dev/TuyaOS-translation_rtos?id=Kcrwraf21847l#title-1-适配程序入口) 进行适配。

![tuyaos_adapter/src 目录内容](/img/new-platform/new-platform-src.png)

### 编译和链接

修改 `platform/my_new_chip/build_example.py` 文件，完成编译和链接步骤。

请根据新平台的编译方式调整此脚本。该脚本需要完成三个步骤：

1. 编译 `tuyaos_adapter` 目录下的源代码文件。
2. 编译平台内部需要的其他源代码文件。
3. 将编译产物与 `TuyaOpen` 上层产物 `libtuyaapp.a libtuyaos.a` 链接成可执行文件。

该脚本接受两个参数：`params_path` 和 `user_cmd`。

- `params_path` 是编译参数文件的路径，提供 cmake、config、json 三种格式，可通过 `${BUILD_PARAM_PATH}/build_param.cmake` 方式访问。

    参数文件中会提供编译所需的各种参数，如 `OPEN_ROOT/OPEN_HEADER_DIR/OPEN_LIBS_DIR/PLATFORM_NEED_LIBS` 等。功能配置的结果也在此参数文件中。

- `user_cmd` 是用户自定义的命令。可能值包括 `build`（编译平台代码）和 `clean`（清理编译产物）。请在脚本中为每个命令实现相应的逻辑。

### 固件烧录（非必要）

新适配的硬件平台可能需要特定的固件烧录方式，而 `TuyaOpen` 使用的 `tyutool` 烧录工具未提供通用的烧录脚本。

您可以在 [tyutool 仓库](https://github.com/tuya/tyutool) 提交 Issue 请求官方提供支持。

### 配置仓库信息（非必要）

修改 `platform/my_new_chip/platform_config.yaml` 文件，配置仓库的 Git 信息。

此操作适用于需要将新建平台提供给其他开发者使用的情况。如果您仅在本地使用，可忽略此步骤。
