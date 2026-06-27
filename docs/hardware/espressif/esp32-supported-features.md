---
title: "ESP32 Supported Features"
---

This reference lists which chip features, on-board peripherals, boards, and applications TuyaOpen supports across the ESP32 chip variants.

## Chip comparison matrix

### Chip features
| Feature | ESP32 | ESP32-S3 | ESP32-C3 | ESP32-C6 |
|---------|-------|----------|----------|----------|
| **CPU** | Dual Xtensa LX6 | Dual Xtensa LX7 | Single RISC-V | Single RISC-V |
| **Wi-Fi** | 802.11 b/g/n | 802.11 b/g/n | 802.11 b/g/n | 802.11 ax (Wi-Fi 6) |
| **Bluetooth** | Classic + BLE 4.2 | BLE 5.0 | BLE 5.0 | BLE 5.0 |
| **USB** | No | Yes (OTG) | No | No |

### Peripheral support by chip

The following table lists peripherals adapted in TuyaOpen for each chip.

| Peripheral | ESP32 | ESP32-S3 | ESP32-C3 | ESP32-C6 |
|------------|-------|----------|----------|----------|
| Wi-Fi | Yes | Yes | Yes | Yes |
| BLE | Yes | Yes | Yes | Yes |
| GPIO | Yes | Yes | Yes | Yes |
| UART | Yes | Yes | Yes | Yes |
| PWM | Yes | Yes | Yes | Yes |
| ADC | Yes | Yes | Yes | Yes |
| I2C | Yes | Yes | Yes | Yes |
| SPI | No | No | No | No |
| I2S | Yes | Yes | N/A | N/A |
| Flash storage | Yes | Yes | Yes | Yes |
| Hardware timer | Yes | Yes | Yes | Yes |
| Watchdog | Yes | Yes | Yes | Yes |
| RTC | Yes | Yes | Yes | Yes |

## Supported on-board peripherals

### Audio codecs

| Driver | Codec | Notes |
|--------|-------|-------|
| `tdd_audio_8311_codec` | ES8311 | I2S, common on S3 boards |
| `tdd_audio_es8388_codec` | ES8388 | I2S, alternate codec |
| `tdd_audio_es8389_codec` | ES8389 | I2S |
| `tdd_audio_no_codec` | None (DAC) | Direct DAC output |
| `tdd_audio_atk_no_codec` | ATK (no codec) | Alternate no-codec path |

:::note
Audio driver unified spec: 16000 Hz sample rate, I2S interface, 6 DMA descriptors, frame size 240.
:::

### LCD drivers

| Driver | Display | Interface |
|--------|---------|-----------|
| `lcd_st7789_spi` | ST7789 via SPI | SPI |
| `lcd_st7789_80` | ST7789 via 8080 | Parallel 8-bit |
| `oled_ssd1306` | SSD1306 OLED | I2C |
| `lcd_sh8601` | SH8601 AMOLED | QSPI |

:::note
ESP32 uses its own LVGL integration (via ESP-IDF LVGL component), not the TuyaOpen generic LVGL port.
:::

### Touch

| Driver | Controller |
|--------|-----------|
| `touch_ft5x06` | FT5x06 capacitive touch |

### IO expander

| Driver | Chip |
|--------|------|
| `xl9555` | XL9555 I2C GPIO expander |
| `tca9554` | TCA9554 I2C GPIO expander |

### LED

| Driver | Type |
|--------|------|
| `tdd_led_esp_ws1280` | WS2812-compatible addressable LEDs via RMT |

## Supported boards

All boards currently supported under `boards/ESP32/`:

| Board | Chip | Description |
|-------|------|-------------|
| `ESP32` | ESP32 | Base ESP32 module |
| `ESP32-C3` | ESP32-C3 | Base ESP32-C3 module |
| `ESP32-C6` | ESP32-C6 | Base ESP32-C6 module |
| `ESP32-S3` | ESP32-S3 | Base ESP32-S3 module |
| `ESP32S3_BREAD_COMPACT_WIFI` | ESP32-S3 | Espressif ESP32-S3 breadboard |
| `XINGZHI_ESP32S3_CUDE_0.96_OLED_WIFI` | ESP32-S3 | XingZhi ESP32-S3 board with 0.96" OLED |
| `WAVESHARE_ESP32S3_Touch_AMOLED_1.8` | ESP32-S3 | Waveshare ESP32-S3 board with 1.8" touch AMOLED |
| `DNESP32S3` | ESP32-S3 | Zhengdian ESP32-S3 base board |
| `DNESP32S3_BOX` | ESP32-S3 | Zhengdian ESP32-S3 BOX board |
| `DNESP32S3_BOX2_WIFI` | ESP32-S3 | Zhengdian ESP32-S3 BOX2 (with 4G/charging) |
| `WAVESHARE_ESP32C6_DEV_KIT_N16` | ESP32-C6 | Waveshare ESP32-C6 dev kit |

## Board-to-peripheral mapping

| Board | Display | Touch | Audio Codec | IO Expander | Button | LED | Other |
|-------|---------|-------|-------------|-------------|--------|-----|-------|
| `ESP32` | ST7789 SPI 320×240 | — | ES8388 | XL9555 | — | — | Speaker enable |
| `ESP32-C3` | — | — | — | — | — | — | UART only |
| `ESP32-C6` | — | — | — | — | — | — | UART only |
| `ESP32-S3` | — | — | — | — | — | — | UART only |
| `ESP32S3_BREAD_COMPACT_WIFI` | SSD1306 I2C 128×32 | — | — | — | GPIO0 | — | I2C/I2S |
| `XINGZHI_ESP32S3_CUDE_0.96_OLED_WIFI` | SSD1306 I2C 128×64 | — | — | — | GPIO0 | — | I2C/I2S |
| `WAVESHARE_ESP32S3_Touch_AMOLED_1.8` | SH8601 SPI 368×448 | FT5X06 I2C | ES8311 (0x30) | TCA9554 | — | — | — |
| `DNESP32S3` | ST7789 SPI 320×240 | — | ES8388 (0x20) | XL9555 | — | — | Speaker enable |
| `DNESP32S3_BOX` | ST7789 I80 320×240 | — | ES8311/NS4168 (0x30) | XL9555 | XL9555 key | Red LED | Buzzer |
| `DNESP32S3_BOX2_WIFI` | ST7789 I80 320×240 | — | ES8389 (0x20) | XL9555 | — | — | 4G module, USB switch, charging |
| `WAVESHARE_ESP32C6_DEV_KIT_N16` | — | — | — | — | GPIO9 | WS1280 GPIO8 | — |

## Applications tested on ESP32

These TuyaOpen applications have pre-built ESP32 configs:

:::tip[Note]
Applications fall into two categories:
- **Board-specific**: Has a `config/` subdirectory with one config per board, targeting boards with specific peripherals such as a display or audio codec.
- **Generic**: No `config/` subdirectory — works on any base ESP32 module (`ESP32` / `ESP32-C3` / `ESP32-S3` / `ESP32-C6`) without requiring board-specific hardware.
:::

### Board-specific applications

#### your_chat_bot (AI Chatbot)

| Board | Config File |
|-------|-------------|
| `DNESP32S3` | `DNESP32S3.config` |
| `DNESP32S3_BOX` | `DNESP32S3_BOX.config` |
| `DNESP32S3_BOX2_WIFI` | `DNESP32S3_BOX2_WIFI.config` |
| `ESP32S3_BREAD_COMPACT_WIFI` | `ESP32S3_BREAD_COMPACT_WIFI.config` |
| `WAVESHARE_ESP32S3_Touch_AMOLED_1.8` | `WAVESHARE_ESP32S3_TOUCH_AMOLED_1_8.config` |
| `XINGZHI_ESP32S3_CUDE_0.96_OLED_WIFI` | `XINGZHI_ESP32S3_Cube_0_96OLED_WIFI.config` |

#### your_serial_chat_bot (Serial AI Chatbot)

| Board | Config File |
|-------|-------------|
| `WAVESHARE_ESP32S3_Touch_AMOLED_1.8` | `WAVESHARE_ESP32S3_TOUCH_AMOLED_1_8.config` |
| `XINGZHI_ESP32S3_CUDE_0.96_OLED_WIFI` | `XINGZHI_ESP32S3_Cube_0_96OLED_WIFI.config` |

### Generic applications

The following apps support all base ESP32 modules and require no board-specific peripherals:

| Application | Description |
|-------------|-------------|
| `tuya_cloud/switch_demo` | Tuya cloud-connected switch demo |
| `tuya_cloud/weather_get_demo` | Weather data fetch demo |

## See also

- [ESP32 on TuyaOpen -- Overview](overview-esp32)
- [Adding a New ESP32 Board](esp32-new-board)
- [TuyaOpen-esp32 Repository](https://github.com/tuya/TuyaOpen-esp32)
