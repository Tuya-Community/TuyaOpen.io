---
title: "ESP32-C3 引脚映射"
---

# ESP32-C3 引脚映射

**ESP32-C3**（单核 RISC-V，成本优化）的引脚映射、外设分配和 TKL 实现状态。

## GPIO 范围

| 范围 | 引脚数 | 说明 |
|------|--------|------|
| GPIO 0-21 | 22 | 全部可用 |
| **pinmap 总数** | **22 条** | ESP32 家族中最小的 GPIO 集 |

:::note 有限引脚数
ESP32-C3 仅有 22 个 GPIO。请仔细规划外设分配，避免引脚冲突。
:::

## UART

| 端口 | TX | RX | 来源 |
|------|----|----|------|
| UART0 | GPIO 21 | GPIO 20 | `boards/ESP32/ESP32-C3/Kconfig` |
| UART1 | GPIO 17 | GPIO 18 | `tkl_uart.c`（固定） |

## TKL/TAL 实现状态

| TKL 模块 | 已实现 | 说明 |
|----------|--------|------|
| `tkl_wifi` | 是 | 802.11 b/g/n |
| `tkl_bt` (BLE) | 是 | BLE 5.0 |
| `tkl_pin` (GPIO) | 是 | 22 引脚 |
| `tkl_uart` | 是 | 2 端口 |
| `tkl_pwm` | 是 | LEDC |
| `tkl_adc` | 是 | ADC1（6 通道） |
| `tkl_i2c` | 是 | 1 端口（仅 I2C0） |
| `tkl_spi` | **未实现** | 使用 ESP-IDF `spi_bus_*` |
| `tkl_i2s` | **不实用** | C3 I2S 受限；无音频 BSP |
| `tkl_dac` | **不可用** | ESP32-C3 无 DAC 硬件 |
| `tkl_display` | **无 TKL** | C3 无显示 BSP |
| `tkl_camera` | **不可用** | C3 无摄像头接口 |

:::warning 音频限制
ESP32-C3 I2S 支持有限，TuyaOpen 中无预配置音频 BSP。AI 聊天机器人和语音应用需要 ESP32-S3。
:::

## 引脚规划指南

| 分配 | 占用引脚 | 剩余 |
|------|---------|------|
| UART0（调试） | GPIO 20, 21 | 20 |
| UART1（传感器） | GPIO 17, 18 | 18 |
| I2C（传感器） | GPIO 0, 1 | 16 |
| Wi-Fi + BLE | 内部（无 GPIO） | 16 |
| SPI（显示） | 4-5 引脚 | 11-12 |
| GPIO（按键、LED） | 剩余 | 视情况而定 |

## 参考资料

- [ESP32 引脚映射 -- 概述](../esp32-pin-mapping)
- [ESP32-C3 数据手册](https://www.espressif.com.cn/sites/default/files/documentation/esp32-c3_datasheet_en.pdf)
