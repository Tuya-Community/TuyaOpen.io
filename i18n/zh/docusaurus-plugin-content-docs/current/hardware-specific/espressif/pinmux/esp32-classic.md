---
title: "ESP32（经典款）引脚映射"
---

# ESP32（经典款）引脚映射

**ESP32**（双核 Xtensa LX6）的引脚映射、外设分配和 TKL 实现状态。

## GPIO 范围

| 范围 | 引脚数 | 说明 |
|------|--------|------|
| GPIO 0-23 | 24 | GPIO 24 在 pinmap 中为 `GPIO_NUM_NC` |
| GPIO 25-39 | 15 | GPIO 34-39 为**仅输入**（无输出、无上下拉） |
| **pinmap 总数** | **39 条** | |

:::warning 仅输入引脚
GPIO 34、35、36、37、38、39 在 ESP32 上为**仅输入**。使用 `TUYA_GPIO_OUTPUT` 调用 `tkl_gpio_init()` 将失败。仅用于 ADC、数字输入或中断。
:::

## UART

| 端口 | TX | RX | 来源 |
|------|----|----|------|
| UART0 | GPIO 1 | GPIO 3 | `boards/ESP32/ESP32/Kconfig` |
| UART1 | GPIO 17 | GPIO 18 | `tkl_uart.c`（固定） |

## 预配置开发板

### ESP32 Bread Board

显示（SPI ST7789）：MOSI=23, CLK=18, CS=25, DC=2, 背光=19

音频（ES8388）：I2C SCL=42, SDA=41; I2S MCLK=0, BCLK=46, WS=3, DOUT=9, DIN=10

IO 扩展器：XL9555，同一 I2C 总线。

## TKL/TAL 实现状态

| TKL 模块 | 已实现 | 说明 |
|----------|--------|------|
| `tkl_wifi` | 是 | |
| `tkl_bt` (BLE) | 是 | 经典 BT + BLE 4.2 |
| `tkl_pin` (GPIO) | 是 | 39 引脚，34-39 仅输入 |
| `tkl_uart` | 是 | 2 端口 |
| `tkl_pwm` | 是 | 6 LEDC 通道 |
| `tkl_adc` | 是 | ADC2 在 Wi-Fi 激活时不可用 |
| `tkl_i2c` | 是 | 2 端口 |
| `tkl_spi` | **未实现** | 使用板级 BSP 或 ESP-IDF |
| `tkl_i2s` | 条件性 | 需 `ENABLE_AUDIO=y` |
| `tkl_dac` | **未实现** | ESP32 在 GPIO 25/26 有 DAC；使用 IDF `dac_output_*` |
| `tkl_display` | **无 TKL** | 板级 BSP + ESP-IDF LVGL |
| `tkl_qspi` | **未实现** | |

## 参考资料

- [ESP32 引脚映射 -- 概述](../esp32-pin-mapping)
- [ESP32 数据手册](https://www.espressif.com.cn/sites/default/files/documentation/esp32_datasheet_en.pdf)
