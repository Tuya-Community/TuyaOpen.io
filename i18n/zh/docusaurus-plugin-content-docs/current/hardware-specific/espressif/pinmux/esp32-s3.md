---
title: "ESP32-S3 引脚映射"
---

# ESP32-S3 引脚映射

**ESP32-S3**（双核 Xtensa LX7）的引脚映射、外设分配和 TKL 实现状态。这是 TuyaOpen 中 AI 和音频应用的主要芯片。

## GPIO 范围

| 范围 | 引脚数 | 说明 |
|------|--------|------|
| GPIO 0-21 | 22 | 完全可用 |
| GPIO 22-25 | **NC** | pinmap 中为 `GPIO_NUM_NC` -- **不要使用** |
| GPIO 26-48 | 23 | 完全可用 |
| **pinmap 总数** | **49 条**（45 可用） | |

:::warning NC 引脚
`TUYA_GPIO_NUM_22` 到 `TUYA_GPIO_NUM_25` 映射为 `GPIO_NUM_NC`。对其调用 `tkl_gpio_init()` 将失败。
:::

## UART

| 端口 | TX | RX | 来源 |
|------|----|----|------|
| UART0 | GPIO 43 | GPIO 44 | `boards/ESP32/ESP32-S3/Kconfig` |
| UART1 | GPIO 17 | GPIO 18 | `tkl_uart.c`（固定） |

启用 `ENABLE_ESP32S3_USB_JTAG_ONLY` 的开发板（Waveshare AMOLED、XingZhi Cube）通过内部 USB Serial JTAG 控制器路由 UART0。

## 预配置开发板

### DNESP32S3

| 功能 | GPIO | 外设 |
|------|------|------|
| I2C SCL | 42 | ES8388、XL9555 |
| I2C SDA | 41 | ES8388、XL9555 |
| I2S MCLK | 0 | 音频 |
| I2S BCLK | 46 | 音频 |
| I2S WS | 3 | 音频 |
| I2S DOUT | 9 | 音频 |
| I2S DIN | 10 | 音频 |
| SPI MOSI | 11 | ST7789 显示 |
| SPI CLK | 12 | ST7789 显示 |
| SPI CS | 40 | ST7789 显示 |
| LCD DC | 21 | ST7789 显示 |
| 背光 | 13 | 显示 |

### DNESP32S3-BOX

| 功能 | GPIO | 外设 |
|------|------|------|
| I2C SCL | 45 | ES8311/NS4168、XL9555 |
| I2C SDA | 48 | ES8311/NS4168、XL9555 |
| I2S BCLK | 13 | 音频 |
| I2S WS | 47 | 音频 |
| I2S DOUT | 14 | 音频 |
| I2S DIN | 21 | 音频 |
| LCD D0-D7 | 40,39,38,12,11,10,9,46 | 并行 8080 |
| LCD CS | 1 | 显示 |
| LCD DC | 2 | 显示 |

### ESP32S3 Bread Compact / XingZhi Cube

| 功能 | GPIO | 外设 |
|------|------|------|
| OLED I2C SCL | 42 | SSD1306 OLED |
| OLED I2C SDA | 41 | SSD1306 OLED |
| 按键 | 0 | Boot 按键 |

### Waveshare ESP32-S3 Touch AMOLED 1.8"

| 功能 | GPIO | 外设 |
|------|------|------|
| I2C SCL | 14 | TCA9554、FT5x06 触摸 |
| I2C SDA | 15 | TCA9554、FT5x06 触摸 |
| 触摸 INT | 21 | FT5x06 电容触摸 |
| I2S MCLK | 16 | ES8311 |
| I2S BCLK | 45 | 音频 |
| SPI MOSI | 7 | SH8601 AMOLED (QSPI) |
| SPI CLK | 6 | SH8601 AMOLED |
| SPI CS | 12 | SH8601 AMOLED |
| PA 使能 | 46 | 功放 |

USB JTAG 模式已启用（无 UART0 GPIO）。

## TKL/TAL 实现状态

| TKL 模块 | 已实现 | 说明 |
|----------|--------|------|
| `tkl_wifi` | 是 | 802.11 b/g/n |
| `tkl_bt` (BLE) | 是 | BLE 5.0 |
| `tkl_pin` (GPIO) | 是 | 45 可用引脚（22-25 为 NC） |
| `tkl_uart` | 是 | 2 端口；可选 USB JTAG 模式 |
| `tkl_pwm` | 是 | 8 LEDC 通道可用（默认映射 6 个） |
| `tkl_adc` | 是 | ADC1 + ADC2 |
| `tkl_i2c` | 是 | 2 端口 |
| `tkl_spi` | **未实现** | 板级 BSP 通过 ESP-IDF 处理 SPI |
| `tkl_i2s` | 条件性 | 需 `ENABLE_AUDIO=y` |
| `tkl_dac` | **不可用** | ESP32-S3 无 DAC 硬件 |
| `tkl_display` | **无 TKL** | 板级 BSP + ESP-IDF LVGL |
| `tkl_qspi` | **未实现** | SH8601 QSPI 由板级 BSP 处理 |
| `tkl_camera` | **未实现** | 使用 ESP-IDF `esp_camera` |

## 参考资料

- [ESP32 引脚映射 -- 概述](../esp32-pin-mapping)
- [ESP32-S3 数据手册](https://www.espressif.com.cn/sites/default/files/documentation/esp32-s3_datasheet_en.pdf)
