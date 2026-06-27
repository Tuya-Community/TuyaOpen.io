---
title: 新增开发板
---

`tos.py new board` 基于 TuyaOpen 已支持的芯片平台快速创建一个新的硬件开发板支持包。该命令通过交互式提示和模板系统，为现有芯片平台添加新的开发板配置，从而简化硬件移植和适配流程。

本文适用于自主设计新硬件开发板的开发者，帮助您完成该开发板的驱动初始化流程及适配。

## Board 命名

Board 名称由必选字段和可选字段组合而成。

### 必选字段

- 厂家名称：开发板的生产厂家。涂鸦推出的开发板以 **TUYA** 开头。
- 芯片名称：Platform 名称，如 **T2**、**T5AI**。

### 可选字段

- 关键特性：体现开发板主要特点或功能的功能模块或特性，如 **LCD**、**CAM**。
- 系列名称和版本信息：部分厂商会有系列化产品，可在命名中体现系列名称和版本号。
- 其他：其他硬件标识。

### 命名规则

- 使用大写英文字母。
- 字段之间以下划线（`_`）相连。
- 字段顺序为 **厂家名称_开发板名称_可选字段**。
- 避免使用特殊字符。

示例：`TUYA_T5AI_BOARD`。

## 创建 Board

1. 运行 `tos.py new board`，选择目标平台。命令执行后会列出所有可用的硬件平台。

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

    使用方向键选择目标平台（此处以 T5AI 为例），然后按 Enter 键确认。

2. 输入开发板名称。

    ```
    [NOTE] Input new board name.
    input: MY_CUSTOM_BOARD
    ```

    :::tip
    请遵守上述命名规则。
    :::

3. 命令会自动生成以下文件结构。

    ```
    boards/<platform>/<board_name>/
    ├── Kconfig           # 板级配置文件
    ├── CMakeLists.txt    # CMake 构建配置
    ├── board_com_api.h   # 板级 API 声明
    └── board_com_api.c   # 板级 API 实现
    ```

    命令同时会更新 `boards/<platform>/Kconfig` 文件，加入新开发板的配置选项。

    ```
    config BOARD_CHOICE_MY_CUSTOM_BOARD
    bool "MY_CUSTOM_BOARD"
    if (BOARD_CHOICE_MY_CUSTOM_BOARD)
        rsource "./MY_CUSTOM_BOARD/Kconfig"
    endif
    ```

## 后续操作

创建开发板后，依次验证编译、适配开发板、调整配置，并保存板级默认配置。

### 验证编译

1. 运行 `tos.py new project` 创建一个新项目，并进入项目目录。

2. 运行 `tos.py config choice`，选择相同芯片平台的现有配置，以节省配置时间。

3. 运行 `tos.py config menu`，选择刚创建的新开发板。

4. 运行 `tos.py build` 验证编译。

### 适配开发板

修改 `boards/<platform>/<board_name>/board_com_api.c` 文件，适配新开发板。

在文件中找到 `OPERATE_RET board_register_hardware(void)` 函数，并根据新开发板的硬件信息进行修改。例如，添加 KEY、LED、I2C 等外设的初始化代码。此过程可参考已有开发板的实现。

如需添加其他源文件或头文件目录，可修改 `CMakeLists.txt` 文件，并配置 `LIB_SRCS` 和 `LIB_PUBLIC_INC` 变量。

### 调整配置

运行 `tos.py config menu` 进入配置菜单，调整功能选项和参数。然后结合上一步骤验证功能。

### 保存配置

将项目目录下的 `app_default.config` 文件复制到 `boards/<platform>/config` 目录下，并重命名为 `<board_name>.config`，以便其他开发者复用。

## 常见问题

### 如何删除已创建的开发板？

删除 `boards/<platform>/<board_name>` 目录，然后手动从 `boards/<platform>/Kconfig` 中移除相关配置。

### 如何修改已创建的开发板的名称？

手动修改：

1. 重命名开发板目录。
2. 更新平台 `Kconfig` 中的引用。
3. 更新开发板内部 `Kconfig` 的默认值。
