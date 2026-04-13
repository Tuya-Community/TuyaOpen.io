---
title: "添加新的 ESP32 开发板"
---

# 添加新的 ESP32 开发板

为自定义 ESP32 硬件创建 TuyaOpen 板级支持包 (BSP)。完成后，你的开发板可通过 `tos.py config choice` 选择并与任何 TuyaOpen 应用一起构建。

## 前提条件

- 已完成 [ESP32 快速开始](esp32-quick-start)
- 了解你的开发板硬件（芯片型号、引脚分配、外设）
- 熟悉 Kconfig 和 CMake 基础

## 需求

- TuyaOpen SDK 已克隆并完成环境配置
- 自定义 ESP32 开发板（用于测试的实际硬件）
- 开发板原理图或引脚定义参考

## 开发板文件结构

每个开发板位于 `boards/ESP32/{BOARD_NAME}/` 下：

```
boards/ESP32/MY_CUSTOM_BOARD/
├── Kconfig                 # 板级 Kconfig（芯片、引脚、功能）
├── CMakeLists.txt          # 构建配置
├── my_custom_board.c       # 开发板初始化和硬件注册
├── board_config.h          # 引脚定义和硬件常量
└── board_com_api.h         # 开发板通用 API 声明
```

## 步骤

### 1. 复制现有开发板作为模板

选择与你硬件最接近的现有开发板：

```bash
cd TuyaOpen/boards/ESP32
cp -r ESP32-S3 MY_CUSTOM_BOARD
```

### 2. 编辑 Kconfig

更新 `MY_CUSTOM_BOARD/Kconfig`：

```kconfig
config BOARD_CHOICE_MY_CUSTOM_BOARD
    bool "MY_CUSTOM_BOARD"
    select ENABLE_WIFI
    select ENABLE_BLUETOOTH
    select ENABLE_GPIO
    select ENABLE_UART

config CHIP_CHOICE
    string
    default "esp32s3"

config BOARD_CHOICE
    string
    default "MY_CUSTOM_BOARD"

config UART_NUM_0_TXD_PIN
    int
    default 43

config UART_NUM_0_RXD_PIN
    int
    default 44
```

根据芯片调整 `CHIP_CHOICE`（`esp32`、`esp32s3`、`esp32c3`、`esp32c6`）。设置 UART 引脚匹配你的开发板串口输出。

### 3. 在父 Kconfig 中注册开发板

编辑 `boards/ESP32/Kconfig`，在 `choice` 块中添加你的开发板：

```kconfig
config BOARD_CHOICE_MY_CUSTOM_BOARD
    bool "MY_CUSTOM_BOARD"
    depends on BOARD_ENABLE_ESP32
```

### 4. 在 board_config.h 中配置引脚映射

定义你的开发板硬件连接：

```c
#ifndef __BOARD_CONFIG_H__
#define __BOARD_CONFIG_H__

#define BOARD_UART0_TX_PIN      43
#define BOARD_UART0_RX_PIN      44
#define BOARD_I2C_SDA_PIN       8
#define BOARD_I2C_SCL_PIN       9

#endif /* __BOARD_CONFIG_H__ */
```

### 5. 实现开发板初始化

编辑 `my_custom_board.c`：

```c
#include "board_config.h"
#include "board_com_api.h"
#include "tkl_gpio.h"

void board_register_hardware(void)
{
    /* 注册显示、音频或其他板级硬件。
       参见 boards/ESP32/common/ 获取共享的 ESP32 BSP 驱动
       （LCD、音频编解码器、触摸、IO 扩展器、LED）。 */
}
```

### 6. 更新 CMakeLists.txt

```cmake
aux_source_directory(${CMAKE_CURRENT_SOURCE_DIR} MODULE_SRC)
set(MODULE_NAME my_custom_board)
add_library(${MODULE_NAME} ${MODULE_SRC})
target_include_directories(${MODULE_NAME} PUBLIC ${CMAKE_CURRENT_SOURCE_DIR})

set(COMPONENT_LIBS ${COMPONENT_LIBS} ${MODULE_NAME} PARENT_SCOPE)
set(COMPONENT_PUBINC ${COMPONENT_PUBINC} ${CMAKE_CURRENT_SOURCE_DIR} PARENT_SCOPE)
```

### 7. 创建配置预设

```bash
mkdir -p apps/my_app/config
```

写入 `apps/my_app/config/MY_CUSTOM_BOARD.config`：

```
CONFIG_BOARD_CHOICE_ESP32=y
CONFIG_BOARD_CHOICE_MY_CUSTOM_BOARD=y
CONFIG_ENABLE_WIFI=y
CONFIG_ENABLE_GPIO=y
```

### 8. 构建和测试

```bash
cd apps/my_app
tos.py config choice        # 选择 MY_CUSTOM_BOARD
tos.py build
tos.py flash
tos.py monitor
```

## 架构规则

编写开发板代码时遵循以下依赖规则：

| 层 | 可以调用 | 不能调用 |
|----|---------|---------|
| `boards/ESP32/MY_BOARD/` | TKL API、`boards/ESP32/common/`、ESP-IDF 厂商 API | TuyaOpen `src/` |
| `boards/ESP32/common/` | TKL API、ESP-IDF 厂商 API | 应用代码 |
| 你的应用代码 | TAL/TKL API、TuyaOpen `src/` | ESP-IDF 厂商 API（不可移植） |

:::warning
如果你的开发板代码直接调用 ESP-IDF API（如 `esp_lcd_*`、`i2s_channel_*`），该代码为 ESP32 特定。应放在 `boards/ESP32/` 中，而非应用 `src/` 中。
:::

## 参考资料

- [ESP32 与 TuyaOpen -- 概述](overview-esp32)
- [ESP32 支持功能](esp32-supported-features)
- [移植新平台](../../new-hardware/porting-platform)
- [SDK 中的 add_new_board.md](https://github.com/tuya/TuyaOpen/blob/master/boards/add_new_board.md)
