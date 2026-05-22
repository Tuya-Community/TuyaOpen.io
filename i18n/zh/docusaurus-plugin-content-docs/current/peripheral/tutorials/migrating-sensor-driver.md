---
title: "将传感器库迁移到 TuyaOpen"
---

# 将传感器库迁移到 TuyaOpen

将现有的 Arduino 或 ESP-IDF 传感器库移植到 TuyaOpen，使其在所有支持的平台上工作。

## 前提条件

- 已完成[环境搭建](../../quick-start/enviroment-setup)
- 已阅读 [TDD/TDL 驱动架构](../driver-architecture)
- 拥有要移植的传感器库源代码

## 迁移策略

大多数传感器库有三层：总线抽象、寄存器访问、应用逻辑。你只需替换第一层（总线抽象），其余保持不变。

## Arduino Wire.h -> TKL I2C 映射

| Arduino | TuyaOpen |
|---------|----------|
| `Wire.begin(sda, scl)` | `tkl_io_pinmux_config()` + `tkl_i2c_init()` |
| `Wire.beginTransmission(addr)` + `Wire.write()` + `Wire.endTransmission()` | `tkl_i2c_master_send(port, addr, data, len, TRUE)` |
| `Wire.requestFrom(addr, len)` + `Wire.read()` | `tkl_i2c_master_receive(port, addr, buf, len, TRUE)` |

## ESP-IDF -> TKL I2C 映射

| ESP-IDF | TuyaOpen |
|---------|----------|
| `i2c_new_master_bus()` | `tkl_i2c_init()` |
| `i2c_master_transmit()` | `tkl_i2c_master_send()` |
| `i2c_master_receive()` | `tkl_i2c_master_receive()` |

## 通用替换

| Arduino / ESP-IDF | TuyaOpen |
|-------------------|----------|
| `delay(ms)` | `tal_system_sleep(ms)` |
| `Serial.println()` | `TAL_PR_INFO()` |
| `millis()` | `tal_system_get_millisecond()` |
| `malloc` / `free` | `tal_malloc` / `tal_free` |

## SPI 传感器

TuyaOpen 在 ESP32 上未提供 `tkl_spi` 适配器。两个选项：
- **选项 A：** 直接使用 ESP-IDF SPI（仅 ESP32，不可移植）
- **选项 B：** 编写自己的 SPI 封装并在各平台移植

## 无法移植的内容

- 基于 DMA 的 SPI 传输
- 硬件特定传感器外设（ESP32 触摸传感器、ULP ADC）
- 厂商 SDK 回调（`esp_event_*`）

## 参考资料

- [TDD/TDL 驱动架构](../driver-architecture)
- [编写新的传感器驱动](writing-sensor-driver)
- [ESP32 迁移指南](../../hardware-specific/espressif/esp32-migration-guide)
- [TKL I2C API](/docs/tkl-api/tkl_i2c)
