---
title: "ESP32 (Classic) Pin Mapping"
---

# ESP32 (Classic) Pin Mapping

Pin mapping, peripheral assignments, and TKL implementation status for the **ESP32** (dual-core Xtensa LX6).

## GPIO Range

| Range | Pins | Notes |
|-------|------|-------|
| GPIO 0-23 | 24 pins | GPIO 24 is `GPIO_NUM_NC` in the pinmap |
| GPIO 25-39 | 15 pins | GPIO 34-39 are **input-only** (no output, no pull-up/pull-down) |
| **Total in pinmap** | **39 entries** | |

From [`tkl_pin.c`](https://github.com/tuya/TuyaOpen-esp32/blob/master/tuya_open_sdk/tuyaos_adapter/src/drivers/tkl_pin.c):

```c
#elif defined(CONFIG_IDF_TARGET_ESP32)
{GPIO_NUM_21, NULL, NULL}, {GPIO_NUM_22, NULL, NULL}, {GPIO_NUM_23, NULL, NULL},
{GPIO_NUM_NC, NULL, NULL}, /* GPIO 24: not connected */
{GPIO_NUM_25, NULL, NULL}, ... {GPIO_NUM_39, NULL, NULL},
```

:::warning Input-Only Pins
GPIO 34, 35, 36, 37, 38, 39 are **input-only** on ESP32. `tkl_gpio_init()` with `TUYA_GPIO_OUTPUT` will fail on these pins. Use them only for ADC, digital input, or interrupt.
:::

## UART

| Port | TX | RX | RTS | CTS | Source |
|------|----|----|-----|-----|--------|
| UART0 | GPIO 1 | GPIO 3 | NC | NC | `boards/ESP32/ESP32/Kconfig` |
| UART1 | GPIO 17 | GPIO 18 | NC | NC | `tkl_uart.c` (fixed) |

UART0 TX/RX are configurable via `UART_NUM0_TX_PIN` / `UART_NUM0_RX_PIN` in board Kconfig.

## Pre-Configured Boards

### ESP32 Bread Board

The only generic ESP32 board with a full BSP. Chip: `esp32`. Config: `ESP32.config`.

**Display (SPI ST7789):**

| Function | GPIO |
|----------|------|
| MOSI | 23 |
| CLK | 18 |
| CS | 25 |
| DC | 2 |
| RST | -1 (none) |
| Backlight | 19 |

**Audio (ES8388 via I2S + I2C):**

| Function | GPIO |
|----------|------|
| I2C SCL | 42 |
| I2C SDA | 41 |
| I2S MCLK | 0 |
| I2S BCLK | 46 |
| I2S WS | 3 |
| I2S DOUT | 9 |
| I2S DIN | 10 |
| Codec I2C addr | `0x20` (ES8388) |

**IO Expander:** XL9555 on same I2C bus.

:::danger Pin Number Inconsistency
The `boards/ESP32/ESP32/board_config.h` defines GPIO 41, 42, and 46 for I2C and I2S pins, but classic ESP32 only has GPIO 0-39. These pin numbers are only valid on ESP32-S3 hardware. The "ESP32 Bread Board" BSP likely targets an S3-based board despite the `boards/ESP32/ESP32/` directory name. If you are using actual classic ESP32 hardware (not S3), you must remap these pins in your board config to valid GPIO 0-39 range.
:::

## TKL/TAL Implementation Status

| TKL Module | Implemented | Notes |
|-----------|------------|-------|
| `tkl_wifi` | Yes | `esp_wifi_*` via TKL |
| `tkl_bt` (BLE) | Yes | Classic BT + BLE 4.2 |
| `tkl_pin` (GPIO) | Yes | 39 pins, GPIO 34-39 input-only |
| `tkl_uart` | Yes | 2 ports |
| `tkl_pwm` | Yes | 6 LEDC channels, any GPIO |
| `tkl_adc` | Yes | ADC1 (GPIO 32-39), ADC2 (limited when Wi-Fi active) |
| `tkl_i2c` | Yes | 2 ports, pinmux override |
| `tkl_spi` | **Not implemented** | Use board BSP or ESP-IDF directly |
| `tkl_i2s` | Conditional | Only when `ENABLE_AUDIO=y` |
| `tkl_flash` | Yes | |
| `tkl_timer` | Yes | |
| `tkl_watchdog` | Yes | |
| `tkl_rtc` | Yes | |
| `tkl_ota` | Yes | |
| `tkl_network` | Yes | Vendor lwIP |
| `tkl_pinmux` | Partial | I2C + PWM only; SPI is no-op |
| `tkl_dac` | **Not implemented** | ESP32 has DAC on GPIO 25/26; use IDF `dac_output_*` |
| `tkl_display` | **No TKL** | Board BSP + ESP-IDF LVGL |
| `tkl_qspi` | **Not implemented** | |

:::note ADC2 Limitation
On ESP32, ADC2 channels cannot be used while Wi-Fi is active. If your app uses Wi-Fi, only ADC1 (GPIO 32-39) is available for analog reads.
:::

## References

- [ESP32 Pin Mapping -- Overview](../esp32-pin-mapping)
- [ESP32 Datasheet](https://www.espressif.com.cn/sites/default/files/documentation/esp32_datasheet_en.pdf)
- [boards/ESP32/ESP32/ source](https://github.com/tuya/TuyaOpen/tree/master/boards/ESP32/ESP32)
