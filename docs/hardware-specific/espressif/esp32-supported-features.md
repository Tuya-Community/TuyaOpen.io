---
title: "ESP32 Supported Features"
---

# ESP32 Supported Features

Detailed feature matrix across ESP32 chip variants in TuyaOpen.

## Chip Comparison Matrix

| Feature | ESP32 | ESP32-S2 | ESP32-S3 | ESP32-C3 | ESP32-C6 |
|---------|-------|----------|----------|----------|----------|
| **CPU** | Dual Xtensa LX6 | Single Xtensa LX7 | Dual Xtensa LX7 | Single RISC-V | Single RISC-V |
| **Wi-Fi** | 802.11 b/g/n | 802.11 b/g/n | 802.11 b/g/n | 802.11 b/g/n | 802.11 ax (Wi-Fi 6) |
| **Bluetooth** | Classic + BLE 4.2 | None | BLE 5.0 | BLE 5.0 | BLE 5.0 |
| **TuyaOpen BLE** | Yes | **No** | Yes | Yes | Yes |
| **PSRAM** | Optional | Optional | Optional (8-16 MB) | No | No |
| **USB** | No | Yes (OTG) | Yes (OTG) | No | No |
| **AI/Audio** | Limited | No | Yes | No | No |
| **Thread/Zigbee** | No | No | No | No | Yes |

## TKL Adapter Support by Chip

All TKL adapters are available for all ESP32 variants unless noted.

| TKL Module | ESP32 | ESP32-S2 | ESP32-S3 | ESP32-C3 | ESP32-C6 |
|-----------|-------|----------|----------|----------|----------|
| `tkl_wifi` | Yes | Yes | Yes | Yes | Yes |
| `tkl_bt` (BLE) | Yes | **No** | Yes | Yes | Yes |
| `tkl_pin` (GPIO) | Yes | Yes | Yes | Yes | Yes |
| `tkl_uart` | Yes | Yes | Yes | Yes | Yes |
| `tkl_pwm` | Yes | Yes | Yes | Yes | Yes |
| `tkl_adc` | Yes | Yes | Yes | Yes | Yes |
| `tkl_i2c` | Yes | Yes | Yes | Yes | Yes |
| `tkl_spi` | Yes | Yes | Yes | Yes | Yes |
| `tkl_i2s` | Yes | Yes | Yes | N/A | N/A |
| `tkl_flash` | Yes | Yes | Yes | Yes | Yes |
| `tkl_timer` | Yes | Yes | Yes | Yes | Yes |
| `tkl_watchdog` | Yes | Yes | Yes | Yes | Yes |
| `tkl_rtc` | Yes | Yes | Yes | Yes | Yes |
| `tkl_ota` | Yes | Yes | Yes | Yes | Yes |
| `tkl_network` | Yes | Yes | Yes | Yes | Yes |
| `tkl_pinmux` | Yes | Yes | Yes | Yes | Yes |

## Kconfig Feature Toggles

The ESP32 board Kconfig (`boards/ESP32/TKL_Kconfig`) provides these feature toggles:

| Config | Default | Description |
|--------|---------|-------------|
| `ENABLE_WIFI` | y | Wi-Fi support |
| `ENABLE_BLUETOOTH` | y | BLE support |
| `ENABLE_ADC` | y | ADC peripheral |
| `ENABLE_GPIO` | y | GPIO peripheral |
| `ENABLE_UART` | y | UART peripheral |
| `ENABLE_PWM` | y | PWM peripheral |
| `ENABLE_I2C` | y | I2C peripheral |
| `ENABLE_I2S` | y | I2S audio bus |
| `ENABLE_SPI` | y | SPI peripheral |
| `ENABLE_TIMER` | y | Hardware timer |
| `ENABLE_WATCHDOG` | y | Watchdog timer |
| `ENABLE_AUDIO` | n | Audio codec support (board-specific) |
| `ENABLE_VIDEO` | n | Video/camera support (board-specific) |
| `ENABLE_ESP_DISPLAY` | n | Display/LCD support (board-specific) |

## Board-Level BSP Modules

Boards under `boards/ESP32/common/` provide shared ESP32 BSP drivers:

### Display (`common/display/`)

LVGL display port for ESP32. Provides `lv_port_disp_init()` and `lv_port_indev_init()`.

:::note
ESP32 uses its own LVGL integration (via ESP-IDF LVGL component), not the TuyaOpen generic LVGL port. UI code under `boards/ESP32/common/display/ui/` is ESP32-specific.
:::

### LCD Drivers (`common/lcd/`)

| Driver | Display | Interface |
|--------|---------|-----------|
| `lcd_st7789_spi` | ST7789 via SPI | SPI |
| `lcd_st7789_80` | ST7789 via 8080 | Parallel 8-bit |
| `oled_ssd1306` | SSD1306 OLED | I2C |
| `lcd_sh8601` | SH8601 AMOLED | QSPI |

### Audio Codecs (`common/audio/`)

| Driver | Codec | Notes |
|--------|-------|-------|
| `tdd_audio_8311_codec` | ES8311 | I2S, common on S3 boards |
| `tdd_audio_es8388_codec` | ES8388 | I2S, alternate codec |
| `tdd_audio_es8389_codec` | ES8389 | I2S |
| `tdd_audio_no_codec` | None (DAC) | Direct DAC output |
| `tdd_audio_atk_no_codec` | ATK (no codec) | Alternate no-codec path |

### Touch (`common/touch/`)

| Driver | Controller |
|--------|-----------|
| `touch_ft5x06` | FT5x06 capacitive touch |

### IO Expander (`common/io_expander/`)

| Driver | Chip |
|--------|------|
| `xl9555` | XL9555 I2C GPIO expander |
| `tca9554` | TCA9554 I2C GPIO expander |

### LED (`common/led/`)

| Driver | Type |
|--------|------|
| `tdd_led_esp_ws1280` | WS2812-compatible addressable LEDs via RMT |

## Applications Tested on ESP32

These TuyaOpen applications have pre-built ESP32 configs:

| Application | ESP32 Boards | Config Files |
|-------------|-------------|--------------|
| `your_chat_bot` (AI chatbot) | DNESP32S3, DNESP32S3-BOX, BOX2, Bread Compact, Waveshare S3, XingZhi S3 | Multiple `.config` per board |
| `your_serial_chat_bot` | Waveshare S3, XingZhi S3 | 2 configs |
| `switch_demo` (cloud switch) | ESP32-S3 (default) | `app_default.config` |
| LVGL demo (graphics) | ESP32 Bread Board, DNESP32S3-BOX | 2 configs |
| LED example | Waveshare ESP32-C6 | 1 config |

## References

- [ESP32 on TuyaOpen -- Overview](overview-esp32)
- [Adding a New ESP32 Board](esp32-new-board)
- [TKL GPIO API](../../tkl-api/tkl_gpio)
- [Peripheral Support List](../../peripheral/support_peripheral_list)
- [TuyaOpen-esp32 Repository](https://github.com/tuya/TuyaOpen-esp32)
