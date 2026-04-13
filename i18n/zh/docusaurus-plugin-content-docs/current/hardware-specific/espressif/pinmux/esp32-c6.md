---
title: "ESP32-C6 引脚映射"
---

# ESP32-C6 引脚映射

**ESP32-C6**（单核 RISC-V，Wi-Fi 6，Thread/Zigbee）的引脚映射、外设分配和 TKL 实现状态。

## GPIO 范围

| 范围 | 引脚数 | 说明 |
|------|--------|------|
| GPIO 0-30 | 31 | 全部可用，无空位 |
| **pinmap 总数** | **31 条** | |

## UART

| 端口 | TX | RX | 来源 |
|------|----|----|------|
| UART0 | GPIO 16 | GPIO 17 | `boards/ESP32/ESP32-C6/Kconfig` |
| UART1 | GPIO 17 | GPIO 18 | `tkl_uart.c`（固定） |

:::warning UART 引脚冲突
ESP32-C6 上，UART0 RX（GPIO 17）和 UART1 TX（GPIO 17）默认共享同一引脚。如同时使用两个 UART 端口，需通过 Kconfig 重映射 UART0。
:::

## 预配置开发板

### Waveshare ESP32-C6 DevKit N16

| 功能 | GPIO | 说明 |
|------|------|------|
| 按键 | GPIO 9 | `TUYA_GPIO_NUM_9`，低电平有效 |
| LED (WS2812) | GPIO 8 | `TUYA_GPIO_NUM_8`，可寻址 RGB |
| UART0 TX | GPIO 16 | 默认 |
| UART0 RX | GPIO 17 | 默认 |

Kconfig 选择：`ENABLE_BUTTON`、`ENABLE_LED`、`PLATFORM_FLASHSIZE_16M`。无显示或音频 BSP。

## TKL/TAL 实现状态

| TKL 模块 | 已实现 | 说明 |
|----------|--------|------|
| `tkl_wifi` | 是 | 802.11 ax (Wi-Fi 6) |
| `tkl_bt` (BLE) | 是 | BLE 5.0 |
| `tkl_pin` (GPIO) | 是 | 31 引脚 |
| `tkl_uart` | 是 | 2 端口（注意默认引脚冲突） |
| `tkl_pwm` | 是 | LEDC |
| `tkl_adc` | 是 | ADC1（7 通道） |
| `tkl_i2c` | 是 | 1 端口（I2C0） |
| `tkl_spi` | **未实现** | 使用 ESP-IDF `spi_bus_*` |
| `tkl_i2s` | **不实用** | C6 I2S 受限；无音频 BSP |
| `tkl_dac` | **不可用** | ESP32-C6 无 DAC 硬件 |
| `tkl_display` | **无 TKL** | C6 无显示 BSP |
| `tkl_camera` | **不可用** | C6 无摄像头接口 |
| Thread / Zigbee | **TKL 未抽象** | 使用 ESP-IDF `esp_openthread_*` 或 `esp_zb_*` |

:::note Thread 和 Zigbee
ESP32-C6 在硬件层面支持 IEEE 802.15.4（Thread/Zigbee），但 TuyaOpen 未通过 TKL/TAL 抽象这些协议。使用时直接调用 ESP-IDF API，这些代码无法移植到其他 TuyaOpen 平台。
:::

## 参考资料

- [ESP32 引脚映射 -- 概述](../esp32-pin-mapping)
- [ESP32-C6 数据手册](https://www.espressif.com.cn/sites/default/files/documentation/esp32-c6_datasheet_en.pdf)
