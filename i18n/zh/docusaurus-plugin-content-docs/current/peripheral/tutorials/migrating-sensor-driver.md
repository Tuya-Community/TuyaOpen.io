---
title: "将传感器库迁移到 TuyaOpen"
description: "迁移传感器库指在保留寄存器与应用逻辑的前提下，将其总线层替换为 TuyaOpen 的 TKL 接口，使驱动可在所有支持平台运行。"
keywords:
  - 传感器库迁移
  - TKL
  - 总线抽象
  - Arduino
  - TuyaOpen 教程
---

迁移传感器库，是指在保留其寄存器与应用逻辑不变的前提下，将其总线层替换为 TuyaOpen 的 TKL 接口，从而让驱动可在所有支持的平台上运行。本指南介绍如何移植现有的 Arduino 或 ESP-IDF 库。

## 前置条件

- 完成 [环境搭建](../../quick-start/enviroment-setup)
- 阅读 [TDD/TDL 驱动架构](../driver-architecture)
- 拥有要移植的传感器库（Arduino、ESP-IDF 或纯 C）

## 要求

- 已克隆 TuyaOpen SDK 并完成环境配置
- 传感器库的源代码
- 用作参考的传感器数据手册

## 迁移策略

大多数传感器库包含三层：

1. **总线抽象** —— Arduino `Wire.h` 或 ESP-IDF `i2c_master_*`
2. **寄存器访问** —— 读写芯片寄存器
3. **应用逻辑** —— 测量、标定、换算

你只需替换第 1 层，第 2、3 层保持不变。

## 分步：移植 BME280 Arduino 库

### 步骤 1：找出总线调用

典型的 Arduino 库中：

```cpp
Wire.beginTransmission(addr);
Wire.write(reg);
Wire.endTransmission();
Wire.requestFrom(addr, len);
while (Wire.available()) { data[i++] = Wire.read(); }
```

### 步骤 2：创建 TKL I2C 封装

用 TuyaOpen 等价接口替换 Wire 调用：

```c
#include "tkl_i2c.h"

#define BME280_I2C_PORT  TUYA_I2C_NUM_0
#define BME280_ADDR      0x76

static OPERATE_RET bme280_read_reg(UINT8_T reg, UINT8_T *buf, UINT8_T len)
{
    OPERATE_RET rt;
    rt = tkl_i2c_master_send(BME280_I2C_PORT, BME280_ADDR, &reg, 1, FALSE);
    if (rt != OPRT_OK) {
        return rt;
    }
    return tkl_i2c_master_receive(BME280_I2C_PORT, BME280_ADDR, buf, len, TRUE);
}

static OPERATE_RET bme280_write_reg(UINT8_T reg, UINT8_T value)
{
    UINT8_T buf[2] = { reg, value };
    return tkl_i2c_master_send(BME280_I2C_PORT, BME280_ADDR, buf, 2, TRUE);
}
```

### 步骤 3：移植初始化与读取函数

保留原有的标定算法，仅替换 I/O：

```c
static OPERATE_RET bme280_init(void)
{
    UINT8_T chip_id;
    OPERATE_RET rt = bme280_read_reg(0xD0, &chip_id, 1);
    if (rt != OPRT_OK || chip_id != 0x60) {
        return OPRT_COM_ERROR;
    }

    bme280_write_reg(0xF2, 0x01);  /* 湿度过采样 x1 */
    bme280_write_reg(0xF4, 0x27);  /* 温度+气压过采样 x1，正常模式 */
    bme280_write_reg(0xF5, 0xA0);  /* 待机 1000ms，关闭滤波 */

    /* 读取标定数据（与 Arduino 库逻辑相同） */
    return bme280_read_calibration();
}
```

### 步骤 4：替换延时与打印调用

| Arduino / ESP-IDF | TuyaOpen |
|-------------------|----------|
| `delay(ms)` | `tal_system_sleep(ms)` |
| `Serial.println()` | `TAL_PR_INFO()` |
| `millis()` | `tal_system_get_millisecond()` |
| `malloc` / `free` | `tal_malloc` / `tal_free` |

### 步骤 5：处理 SPI 传感器

对于 SPI 传感器，TuyaOpen 在 ESP32 上未提供 `tkl_spi` 适配器。两个选项：

**选项 A：** 直接使用 ESP-IDF SPI（仅 ESP32，不可移植）：

```c
#include "driver/spi_master.h"
spi_device_handle_t spi;
/* 标准 ESP-IDF SPI 初始化与传输 */
```

**选项 B：** 编写一个轻量的类 `tkl_spi` 封装，并在各平台上分别移植。

### 步骤 6：做成规范的 TuyaOpen 应用

```
apps/my_bme280_app/
├── CMakeLists.txt
├── src/
│   ├── tuya_main.c
│   └── bme280.c
├── include/
│   └── bme280.h
└── config/
    └── ESP32-S3.config
```

## 常见移植模式

### Arduino `Wire.h` -> TKL I2C

| Arduino | TuyaOpen |
|---------|----------|
| `Wire.begin(sda, scl)` | `tkl_io_pinmux_config()` + `tkl_i2c_init()` |
| `Wire.beginTransmission(addr)` + `Wire.write(data)` + `Wire.endTransmission()` | `tkl_i2c_master_send(port, addr, data, len, TRUE)` |
| `Wire.requestFrom(addr, len)` + `Wire.read()` | `tkl_i2c_master_receive(port, addr, buf, len, TRUE)` |
| `Wire.setClock(freq)` | 在初始化时设置 `TUYA_IIC_BASE_CFG_T` 中的 `speed` |

### ESP-IDF `i2c_master_*` -> TKL I2C

| ESP-IDF | TuyaOpen |
|---------|----------|
| `i2c_new_master_bus()` | `tkl_i2c_init()` |
| `i2c_master_transmit()` | `tkl_i2c_master_send()` |
| `i2c_master_receive()` | `tkl_i2c_master_receive()` |
| `i2c_master_bus_rm_device()` | `tkl_i2c_deinit()` |

### ESP-IDF `gpio_*` -> TKL GPIO

| ESP-IDF | TuyaOpen |
|---------|----------|
| `gpio_config()` | `tkl_gpio_init()` |
| `gpio_set_level()` | `tkl_gpio_write()` |
| `gpio_get_level()` | `tkl_gpio_read()` |
| `gpio_isr_handler_add()` | `tkl_gpio_irq_init()` + `tkl_gpio_irq_enable()` |

## 无法移植的内容（保持平台相关）

- 基于 DMA 的 SPI 传输
- 硬件特定的传感器外设（ESP32 触摸传感器、ULP ADC）
- 厂商 SDK 回调（`esp_event_*`）
- TAL 未涵盖的 FreeRTOS 专用接口（`xEventGroup`、`xStreamBuffer`）

## 参考资料

- [TDD/TDL 驱动架构](../driver-architecture)
- [编写新的传感器驱动](writing-sensor-driver)
- [ESP32 迁移指南](../../hardware/espressif/esp32-migration-guide)
- [TKL I2C API](/docs/tkl-api/tkl_i2c)
