---
title: "ESP32 支持功能"
---

# ESP32 支持功能

TuyaOpen 中各 ESP32 芯片型号的详细功能矩阵。

## 芯片对比矩阵

| 功能 | ESP32 | ESP32-S2 | ESP32-S3 | ESP32-C3 | ESP32-C6 |
|------|-------|----------|----------|----------|----------|
| **CPU** | 双核 Xtensa LX6 | 单核 Xtensa LX7 | 双核 Xtensa LX7 | 单核 RISC-V | 单核 RISC-V |
| **Wi-Fi** | 802.11 b/g/n | 802.11 b/g/n | 802.11 b/g/n | 802.11 b/g/n | 802.11 ax (Wi-Fi 6) |
| **蓝牙** | 经典 + BLE 4.2 | 无 | BLE 5.0 | BLE 5.0 | BLE 5.0 |
| **TuyaOpen BLE** | 支持 | **不支持** | 支持 | 支持 | 支持 |
| **PSRAM** | 可选 | 可选 | 可选 (8-16 MB) | 无 | 无 |
| **USB** | 无 | 支持 (OTG) | 支持 (OTG) | 无 | 无 |
| **AI/音频** | 有限 | 不支持 | 支持 | 不支持 | 不支持 |
| **Thread/Zigbee** | 不支持 | 不支持 | 不支持 | 不支持 | 支持 |

## 各芯片 TKL 适配器支持

除特别说明外，所有 TKL 适配器均适用于所有 ESP32 型号。

| TKL 模块 | ESP32 | ESP32-S2 | ESP32-S3 | ESP32-C3 | ESP32-C6 |
|----------|-------|----------|----------|----------|----------|
| `tkl_wifi` | 支持 | 支持 | 支持 | 支持 | 支持 |
| `tkl_bt` (BLE) | 支持 | **不支持** | 支持 | 支持 | 支持 |
| `tkl_pin` (GPIO) | 支持 | 支持 | 支持 | 支持 | 支持 |
| `tkl_uart` | 支持 | 支持 | 支持 | 支持 | 支持 |
| `tkl_pwm` | 支持 | 支持 | 支持 | 支持 | 支持 |
| `tkl_adc` | 支持 | 支持 | 支持 | 支持 | 支持 |
| `tkl_i2c` | 支持 | 支持 | 支持 | 支持 | 支持 |
| `tkl_spi` | 支持 | 支持 | 支持 | 支持 | 支持 |
| `tkl_i2s` | 支持 | 支持 | 支持 | 不适用 | 不适用 |
| `tkl_flash` | 支持 | 支持 | 支持 | 支持 | 支持 |
| `tkl_timer` | 支持 | 支持 | 支持 | 支持 | 支持 |
| `tkl_watchdog` | 支持 | 支持 | 支持 | 支持 | 支持 |
| `tkl_rtc` | 支持 | 支持 | 支持 | 支持 | 支持 |
| `tkl_ota` | 支持 | 支持 | 支持 | 支持 | 支持 |
| `tkl_network` | 支持 | 支持 | 支持 | 支持 | 支持 |
| `tkl_pinmux` | 支持 | 支持 | 支持 | 支持 | 支持 |

## Kconfig 功能开关

ESP32 板级 Kconfig (`boards/ESP32/TKL_Kconfig`) 提供以下功能开关：

| 配置项 | 默认值 | 说明 |
|--------|--------|------|
| `ENABLE_WIFI` | y | Wi-Fi 支持 |
| `ENABLE_BLUETOOTH` | y | BLE 支持 |
| `ENABLE_ADC` | y | ADC 外设 |
| `ENABLE_GPIO` | y | GPIO 外设 |
| `ENABLE_UART` | y | UART 外设 |
| `ENABLE_PWM` | y | PWM 外设 |
| `ENABLE_I2C` | y | I2C 外设 |
| `ENABLE_I2S` | y | I2S 音频总线 |
| `ENABLE_SPI` | y | SPI 外设 |
| `ENABLE_TIMER` | y | 硬件定时器 |
| `ENABLE_WATCHDOG` | y | 看门狗定时器 |
| `ENABLE_AUDIO` | n | 音频编解码器支持（板级特定） |
| `ENABLE_VIDEO` | n | 视频/摄像头支持（板级特定） |
| `ENABLE_ESP_DISPLAY` | n | 显示/LCD 支持（板级特定） |

## 板级 BSP 模块

`boards/ESP32/common/` 下提供共享的 ESP32 BSP 驱动：

### 显示 (`common/display/`)

ESP32 的 LVGL 显示移植。提供 `lv_port_disp_init()` 和 `lv_port_indev_init()`。

:::note
ESP32 使用自己的 LVGL 集成（通过 ESP-IDF LVGL 组件），而非 TuyaOpen 通用 LVGL 移植。`boards/ESP32/common/display/ui/` 下的 UI 代码为 ESP32 特定。
:::

### LCD 驱动 (`common/lcd/`)

| 驱动 | 显示屏 | 接口 |
|------|--------|------|
| `lcd_st7789_spi` | ST7789 SPI | SPI |
| `lcd_st7789_80` | ST7789 8080 | 并行 8-bit |
| `oled_ssd1306` | SSD1306 OLED | I2C |
| `lcd_sh8601` | SH8601 AMOLED | QSPI |

### 音频编解码器 (`common/audio/`)

| 驱动 | 编解码器 | 说明 |
|------|---------|------|
| `tdd_audio_8311_codec` | ES8311 | I2S，S3 开发板常用 |
| `tdd_audio_es8388_codec` | ES8388 | I2S，备选编解码器 |
| `tdd_audio_es8389_codec` | ES8389 | I2S |
| `tdd_audio_no_codec` | 无（DAC） | 直接 DAC 输出 |
| `tdd_audio_atk_no_codec` | ATK（无编解码器） | 备选无编解码器方案 |

### 触摸 (`common/touch/`)

| 驱动 | 控制器 |
|------|--------|
| `touch_ft5x06` | FT5x06 电容触摸 |

### IO 扩展器 (`common/io_expander/`)

| 驱动 | 芯片 |
|------|------|
| `xl9555` | XL9555 I2C GPIO 扩展器 |
| `tca9554` | TCA9554 I2C GPIO 扩展器 |

### LED (`common/led/`)

| 驱动 | 类型 |
|------|------|
| `tdd_led_esp_ws1280` | WS2812 兼容可寻址 LED（通过 RMT） |

## 已验证的 ESP32 应用

以下 TuyaOpen 应用已有预构建的 ESP32 配置：

| 应用 | ESP32 开发板 | 配置文件 |
|------|-------------|----------|
| `your_chat_bot`（AI 聊天机器人） | DNESP32S3, DNESP32S3-BOX, BOX2, Bread Compact, Waveshare S3, XingZhi S3 | 每个开发板多个 `.config` |
| `your_serial_chat_bot` | Waveshare S3, XingZhi S3 | 2 个配置 |
| `switch_demo`（云端开关） | ESP32-S3（默认） | `app_default.config` |
| LVGL demo（图形） | ESP32 Bread Board, DNESP32S3-BOX | 2 个配置 |
| LED 示例 | Waveshare ESP32-C6 | 1 个配置 |

## 参考资料

- [ESP32 与 TuyaOpen -- 概述](overview-esp32)
- [添加新的 ESP32 开发板](esp32-new-board)
- [TKL GPIO API](../../tkl-api/tkl_gpio)
- [外设支持列表](../../peripheral/support_peripheral_list)
- [TuyaOpen-esp32 仓库](https://github.com/tuya/TuyaOpen-esp32)
