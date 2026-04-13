---
title: "ESP32-C6 Pin Mapping"
---

# ESP32-C6 Pin Mapping

Pin mapping, peripheral assignments, and TKL implementation status for the **ESP32-C6** (single RISC-V core, Wi-Fi 6, Thread/Zigbee).

## GPIO Range

| Range | Pins | Notes |
|-------|------|-------|
| GPIO 0-30 | 31 pins | All usable |
| **Total in pinmap** | **31 entries** | |

From [`tkl_pin.c`](https://github.com/tuya/TuyaOpen-esp32/blob/master/tuya_open_sdk/tuyaos_adapter/src/drivers/tkl_pin.c):

```c
#elif defined(CONFIG_IDF_TARGET_ESP32C6)
{GPIO_NUM_21, NULL, NULL}, {GPIO_NUM_22, NULL, NULL}, ... {GPIO_NUM_30, NULL, NULL},
/* pinmap: GPIO 0-30, no gaps */
```

## UART

| Port | TX | RX | RTS | CTS | Source |
|------|----|----|-----|-----|--------|
| UART0 | GPIO 16 | GPIO 17 | NC | NC | `boards/ESP32/ESP32-C6/Kconfig` |
| UART1 | GPIO 17 | GPIO 18 | NC | NC | `tkl_uart.c` (fixed) |

:::warning UART Pin Conflict
On ESP32-C6, UART0 RX (GPIO 17) and UART1 TX (GPIO 17) share the same pin by default. If you use both UART ports simultaneously, remap UART0 via Kconfig or remap UART1 in your application.
:::

## Pre-Configured Boards

### ESP32-C6 Generic

Minimal config. Config: `ESP32-C6.config`. Flash: 16 MB default.

### Waveshare ESP32-C6 DevKit N16

A minimal dev kit with button and addressable LED:

| Function | GPIO | Notes |
|----------|------|-------|
| Button | GPIO 9 | `TUYA_GPIO_NUM_9`, active low, pull-up |
| LED (WS2812) | GPIO 8 | `TUYA_GPIO_NUM_8`, addressable RGB via RMT |
| UART0 TX | GPIO 16 | Default |
| UART0 RX | GPIO 17 | Default |

Source: [`boards/ESP32/WAVESHARE_ESP32C6_DEV_KIT_N16/board_com_api.c`](https://github.com/tuya/TuyaOpen/tree/master/boards/ESP32/WAVESHARE_ESP32C6_DEV_KIT_N16)

Kconfig selects: `ENABLE_BUTTON`, `ENABLE_LED`, `PLATFORM_FLASHSIZE_16M`.

No display or audio BSP is included.

## TKL/TAL Implementation Status

| TKL Module | Implemented | Notes |
|-----------|------------|-------|
| `tkl_wifi` | Yes | 802.11 ax (Wi-Fi 6) |
| `tkl_bt` (BLE) | Yes | BLE 5.0 |
| `tkl_pin` (GPIO) | Yes | 31 pins |
| `tkl_uart` | Yes | 2 ports (watch default pin conflict) |
| `tkl_pwm` | Yes | LEDC, any GPIO |
| `tkl_adc` | Yes | ADC1 (7 channels) |
| `tkl_i2c` | Yes | 1 port (I2C0) |
| `tkl_spi` | **Not implemented** | Use ESP-IDF `spi_bus_*` directly |
| `tkl_i2s` | **Not practical** | C6 I2S is limited; no audio BSP |
| `tkl_flash` | Yes | 16 MB default |
| `tkl_timer` | Yes | |
| `tkl_watchdog` | Yes | |
| `tkl_rtc` | Yes | |
| `tkl_ota` | Yes | |
| `tkl_network` | Yes | Vendor lwIP |
| `tkl_pinmux` | Partial | I2C + PWM only; SPI is no-op |
| `tkl_dac` | **Not available** | ESP32-C6 has no DAC hardware |
| `tkl_display` | **No TKL** | No display BSP for C6 boards |
| `tkl_qspi` | **Not implemented** | |
| `tkl_camera` | **Not available** | No camera interface on C6 |
| Thread / Zigbee | **Not abstracted by TKL** | Use ESP-IDF `esp_openthread_*` or `esp_zb_*` directly |

:::note Thread and Zigbee
ESP32-C6 supports IEEE 802.15.4 (Thread/Zigbee) at the hardware level, but TuyaOpen does not abstract these protocols via TKL/TAL. To use Thread or Zigbee, call ESP-IDF APIs directly. This code will not be portable to other TuyaOpen platforms.
:::

## References

- [ESP32 Pin Mapping -- Overview](../esp32-pin-mapping)
- [ESP32-C6 Datasheet](https://www.espressif.com.cn/sites/default/files/documentation/esp32-c6_datasheet_en.pdf)
- [boards/ESP32/WAVESHARE_ESP32C6_DEV_KIT_N16/](https://github.com/tuya/TuyaOpen/tree/master/boards/ESP32/WAVESHARE_ESP32C6_DEV_KIT_N16)
