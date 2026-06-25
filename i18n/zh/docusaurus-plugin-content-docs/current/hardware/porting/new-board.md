---
title: 创建 Board
---

# 创建 Board


## 概述

本文适用于开发者自主设计新硬件开发板的场景，旨在提供该开发板的驱动初始化流程及适配相关的指导。

`tos.py new board` 是 TuyaOpen SDK 提供的一个命令行工具，用于快速创建一个新的、基于 TuyaOpen 已支持的芯片平台的硬件开发板支持包。通过交互式界面和模板系统，该命令能够帮助开发者快速为现有芯片平台添加新的开发板配置，极大地简化了硬件移植和适配的工作流程。

## Board 命名

### 必选字段

- 厂家名称：开发板的生产厂家，如涂鸦推出的开发板则会以 **TUYA** 开头。
- 芯片名称：Platform 名称，如 **T2**、**T5AI**。

### 可选字段

- 若 Board 具有特定的功能模块或特点，要体现开发板的主要特点或者功能，如 **LCD**、**CAM**。
- 系列名称和版本信息：一些厂商会有系列化的产品，可在命名中体现系列名称和版本号。
- 其他：一些硬件标识等。

### 命名规则

- 请使用大写英文字母。
- 请将字段和字段之间以下划线相连。
- 字段结合顺序：**厂家名称_开发板名称_可选字段**
- 请避免使用特殊字符。

示例：`TUYA_T5AI_BOARD`


## 操作原理

1. 使用命令 `tos.py new board`，选择目标平台。命令执行后，系统会列出所有可用的硬件平台，如下所示：

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

    可以使用方向键选择目标平台（这里以 `T5AI` 为例），然后按下回车键确认。

2. 输入开发板名称。

    ```
    [NOTE] Input new board name.
    input: MY_CUSTOM_BOARD
    ```

    :::important
    命名时，请严格遵守命名规则。
    :::

3. 自动生成文件。系统会自动创建以下文件结构：

    ```
    boards/<platform>/<board_name>/
    ├── Kconfig           # 板级配置文件
    ├── CMakeLists.txt    # CMake 构建配置
    ├── board_com_api.h   # 板级 API 声明
    └── board_com_api.c   # 板级 API 实现
    ```

    `boards/<platform>/Kconfig` 文件会自动更新，包含新板的配置选项。

    ```
    config BOARD_CHOICE_MY_CUSTOM_BOARD
    bool "MY_CUSTOM_BOARD"
    if (BOARD_CHOICE_MY_CUSTOM_BOARD)
        rsource "./MY_CUSTOM_BOARD/Kconfig"
    endif
    ```

## 后续操作

概览：

    > 1. 验证编译。
    >
    > 2. 修改 `boards/<platform>/<board_name>/board_com_api.c` 文件，适配新开发板。
    >
    > 3. 调整配置。
    >
    > 4. 保存板级默认配置文件。

### 验证编译

1. 使用命令 `tos.py new project` 创建一个新的项目，进入项目目录。

2. 使用命令 `tos.py config choice` 选择一个相同芯片平台的配置（可以节省配置时间）。

3. 使用命令 `tos.py config menu`，选择刚刚创建的新开发板。

4. 执行命令 `tos.py build` 验证编译。


### 适配开发板

修改 `boards/<platform>/<board_name>/board_com_api.c` 文件，适配新开发板。

在文件中找到 `PERATE_RET board_register_hardware(void)` 函数，并根据新开发板的硬件信息进行修改。

例如，添加 KEY、LED、I2C 等外设的初始化代码，此过程可以参考已有的开发板实现。

如果需要添加其他的源文件或头文件目录，可以通过修改 `CMakeLists.txt` 文件、配置 `LIB_SRCS` 和 `LIB_PUBLIC_INC` 变量来实现。

### 调整配置

使用命令 `tos.py config menu` 进入配置菜单，调整功能选项和参数。

然后，结合上一步骤验证功能。

### 保存配置

将项目目录下面的 `app_default.config` 文件复制到 `boards/<platform>/config` 目录下，并修改名称为 `<board_name>.config` 方便其他开发者使用。

## 常见问题

### 如何删除已创建的开发板？

直接删除 `boards/<platform>/<board_name>` 目录，并手动从 `boards/<platform>/Kconfig` 中移除相关配置。

### 如何修改已创建的开发板的名称？

需要手动修改：
1. 重命名开发板目录。
2. 更新平台 Kconfig 中的引用。
3. 更新开发板内部 Kconfig 的默认值。
