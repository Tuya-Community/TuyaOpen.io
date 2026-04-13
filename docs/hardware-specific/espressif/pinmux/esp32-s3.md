---
title: "ESP32-S3 Pin Mapping"
---

# ESP32-S3 Pin Mapping

Pin mapping, peripheral assignments, and TKL implementation status for the **ESP32-S3** (dual-core Xtensa LX7). This is the primary chip for AI and audio applications in TuyaOpen.

## GPIO Range

| Range | Pins | Notes |
|-------|------|-------|
| GPIO 0-21 | 22 pins | Fully usable |
| GPIO 22-25 | **NC** | `GPIO_NUM_NC` in pinmap -- **do not use** |
| GPIO 26-48 | 23 pins | Fully usable |
| **Total in pinmap** | **49 entries** (45 usable) | |

From [`tkl_pin.c`](https://github.com/tuya/TuyaOpen-esp32/blob/master/tuya_open_sdk/tuyaos_adapter/src/drivers/tkl_pin.c):

```c
#elif defined(CONFIG_IDF_TARGET_ESP32S3)
{GPIO_NUM_21, NULL, NULL},
{GPIO_NUM_NC, NULL, NULL}, {GPIO_NUM_NC, NULL, NULL},  /* 22, 23 */
{GPIO_NUM_NC, NULL, NULL}, {GPIO_NUM_NC, NULL, NULL},  /* 24, 25 */
{GPIO_NUM_26, NULL, NULL}, ... {GPIO_NUM_48, NULL, NULL},
```

:::warning NC Pins
`TUYA_GPIO_NUM_22` through `TUYA_GPIO_NUM_25` map to `GPIO_NUM_NC`. Calling `tkl_gpio_init()` on them will fail.
:::

## UART

| Port | TX | RX | RTS | CTS | Source |
|------|----|----|-----|-----|--------|
| UART0 | GPIO 43 | GPIO 44 | NC | NC | `boards/ESP32/ESP32-S3/Kconfig` |
| UART1 | GPIO 17 | GPIO 18 | NC | NC | `tkl_uart.c` (fixed) |

Boards with `ENABLE_ESP32S3_USB_JTAG_ONLY` (Waveshare AMOLED, XingZhi Cube) route UART0 through the internal USB Serial JTAG controller instead of GPIO pins.

## Pre-Configured Boards

### ESP32-S3 Generic

Minimal config, no BSP peripherals. Config: `ESP32-S3.config`. UART0: GPIO 43/44.

### DNESP32S3

| Function | GPIO | Peripheral |
|----------|------|-----------|
| I2C SCL | 42 | ES8388 codec, XL9555 IO expander |
| I2C SDA | 41 | ES8388 codec, XL9555 IO expander |
| I2S MCLK | 0 | Audio |
| I2S BCLK | 46 | Audio |
| I2S WS | 3 | Audio |
| I2S DOUT | 9 | Audio |
| I2S DIN | 10 | Audio |
| SPI MOSI | 11 | ST7789 display |
| SPI CLK | 12 | ST7789 display |
| SPI CS | 40 | ST7789 display |
| LCD DC | 21 | ST7789 display |
| Backlight | 13 | Display |

### DNESP32S3-BOX

| Function | GPIO | Peripheral |
|----------|------|-----------|
| I2C SCL | 45 | ES8311/NS4168, XL9555 |
| I2C SDA | 48 | ES8311/NS4168, XL9555 |
| I2S BCLK | 13 | Audio |
| I2S WS | 47 | Audio |
| I2S DOUT | 14 | Audio |
| I2S DIN | 21 | Audio |
| LCD D0-D7 | 40,39,38,12,11,10,9,46 | ST7789 parallel 8080 |
| LCD CS | 1 | Display |
| LCD DC | 2 | Display |
| LCD RD | 41 | Display |
| LCD WR | 42 | Display |

### DNESP32S3-BOX2

| Function | GPIO | Peripheral |
|----------|------|-----------|
| I2C SCL | 47 | ES8389 codec |
| I2C SDA | 48 | ES8389 codec |
| I2S MCLK | 38 | Audio |
| I2S BCLK | 41 | Audio |
| I2S WS | 39 | Audio |
| I2S DOUT | 42 | Audio |
| I2S DIN | 40 | Audio |
| LCD D0-D7 | 13,9,8,7,6,5,4,3 | Parallel 8080 |
| LCD CS | 14 | Display |
| LCD DC | 12 | Display |
| LCD RD | 10 | Display |
| LCD WR | 11 | Display |
| Backlight | 21 | Display |

### ESP32S3 Bread Compact / XingZhi Cube OLED

| Function | GPIO | Peripheral |
|----------|------|-----------|
| OLED I2C SCL | 42 | SSD1306 OLED |
| OLED I2C SDA | 41 | SSD1306 OLED |
| Button | 0 | Boot button (optional) |

Bread Compact: 128x32 OLED. XingZhi Cube: 128x64 OLED.

### Waveshare ESP32-S3 Touch AMOLED 1.8"

| Function | GPIO | Peripheral |
|----------|------|-----------|
| I2C SCL | 14 | TCA9554 IO expander, FT5x06 touch |
| I2C SDA | 15 | TCA9554 IO expander, FT5x06 touch |
| Touch INT | 21 | FT5x06 capacitive touch |
| I2S MCLK | 16 | ES8311 codec |
| I2S BCLK | 45 | Audio |
| I2S WS | 9 | Audio |
| I2S DOUT | 8 | Audio |
| I2S DIN | 10 | Audio |
| PA Enable | 46 | Power amplifier |
| SPI MOSI | 7 | SH8601 AMOLED (QSPI) |
| SPI CLK | 6 | SH8601 AMOLED |
| SPI CS | 12 | SH8601 AMOLED |
| SPI D1 | 4 | QSPI data line |
| SPI D2 | 5 | QSPI data line |
| RST | 17 | Display reset |

USB JTAG mode enabled (no UART0 GPIO).

## TKL/TAL Implementation Status

| TKL Module | Implemented | Notes |
|-----------|------------|-------|
| `tkl_wifi` | Yes | 802.11 b/g/n |
| `tkl_bt` (BLE) | Yes | BLE 5.0 |
| `tkl_pin` (GPIO) | Yes | 45 usable pins (22-25 are NC) |
| `tkl_uart` | Yes | 2 ports; optional USB JTAG mode |
| `tkl_pwm` | Yes | 8 LEDC channels available (6 default mapped) |
| `tkl_adc` | Yes | ADC1 + ADC2 (ADC2 limited during Wi-Fi) |
| `tkl_i2c` | Yes | 2 ports, pinmux override |
| `tkl_spi` | **Not implemented** | Board BSP handles SPI (LCD, QSPI) via ESP-IDF |
| `tkl_i2s` | Conditional | Only when `ENABLE_AUDIO=y` |
| `tkl_flash` | Yes | 4 MB or 16 MB depending on board |
| `tkl_timer` | Yes | |
| `tkl_watchdog` | Yes | |
| `tkl_rtc` | Yes | |
| `tkl_ota` | Yes | |
| `tkl_network` | Yes | Vendor lwIP |
| `tkl_pinmux` | Partial | I2C + PWM routing; SPI is no-op |
| `tkl_dac` | **Not implemented** | ESP32-S3 has no DAC hardware |
| `tkl_display` | **No TKL** | Board BSP + ESP-IDF LVGL component |
| `tkl_qspi` | **Not implemented** | SH8601 QSPI handled by board BSP |
| `tkl_camera` | **Not implemented** | Use ESP-IDF `esp_camera` directly |

## References

- [ESP32 Pin Mapping -- Overview](../esp32-pin-mapping)
- [ESP32-S3 Datasheet](https://www.espressif.com.cn/sites/default/files/documentation/esp32-s3_datasheet_en.pdf)
- [boards/ESP32/ source](https://github.com/tuya/TuyaOpen/tree/master/boards/ESP32)
