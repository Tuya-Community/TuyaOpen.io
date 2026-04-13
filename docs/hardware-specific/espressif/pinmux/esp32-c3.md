---
title: "ESP32-C3 Pin Mapping"
---

# ESP32-C3 Pin Mapping

Pin mapping, peripheral assignments, and TKL implementation status for the **ESP32-C3** (single RISC-V core, cost-optimized).

## GPIO Range

| Range | Pins | Notes |
|-------|------|-------|
| GPIO 0-21 | 22 pins | All usable |
| **Total in pinmap** | **22 entries** | Smallest GPIO set among ESP32 family |

From [`tkl_pin.c`](https://github.com/tuya/TuyaOpen-esp32/blob/master/tuya_open_sdk/tuyaos_adapter/src/drivers/tkl_pin.c):

```c
#if defined(CONFIG_IDF_TARGET_ESP32C3)
{GPIO_NUM_21, NULL, NULL},
/* pinmap ends here -- only GPIO 0-21 */
```

:::note Limited Pin Count
ESP32-C3 has only 22 GPIOs. Plan peripheral assignments carefully to avoid pin conflicts, especially when using Wi-Fi + BLE + UART + I2C simultaneously.
:::

## UART

| Port | TX | RX | RTS | CTS | Source |
|------|----|----|-----|-----|--------|
| UART0 | GPIO 21 | GPIO 20 | NC | NC | `boards/ESP32/ESP32-C3/Kconfig` |
| UART1 | GPIO 17 | GPIO 18 | NC | NC | `tkl_uart.c` (fixed) |

## Pre-Configured Boards

### ESP32-C3 Generic

Minimal config, no BSP peripherals. Config: `ESP32-C3.config`.

No display, audio, or additional peripheral BSP is included. This is a bare chip target for custom applications.

## TKL/TAL Implementation Status

| TKL Module | Implemented | Notes |
|-----------|------------|-------|
| `tkl_wifi` | Yes | 802.11 b/g/n |
| `tkl_bt` (BLE) | Yes | BLE 5.0 |
| `tkl_pin` (GPIO) | Yes | 22 pins |
| `tkl_uart` | Yes | 2 ports |
| `tkl_pwm` | Yes | LEDC, any GPIO |
| `tkl_adc` | Yes | ADC1 (6 channels) |
| `tkl_i2c` | Yes | 1 port (I2C0 only on C3 hardware) |
| `tkl_spi` | **Not implemented** | Use ESP-IDF `spi_bus_*` directly |
| `tkl_i2s` | **Not available** | C3 has limited I2S; `ENABLE_AUDIO` not practical |
| `tkl_flash` | Yes | |
| `tkl_timer` | Yes | 2 hardware timer groups |
| `tkl_watchdog` | Yes | |
| `tkl_rtc` | Yes | |
| `tkl_ota` | Yes | |
| `tkl_network` | Yes | Vendor lwIP |
| `tkl_pinmux` | Partial | I2C + PWM only; SPI is no-op |
| `tkl_dac` | **Not available** | ESP32-C3 has no DAC hardware |
| `tkl_display` | **No TKL** | No board BSP with display for C3 |
| `tkl_qspi` | **Not implemented** | |
| `tkl_camera` | **Not available** | No camera interface on C3 |

:::warning Audio Limitations
ESP32-C3 has limited I2S support and no pre-configured audio BSP in TuyaOpen. The AI chatbot and voice applications require ESP32-S3. If your project needs audio, use the S3 variant.
:::

## ESP32-C3 Pin Planning Guide

With only 22 GPIOs, here is a practical allocation for a typical IoT application:

| Allocation | Pins Used | Remaining |
|-----------|-----------|-----------|
| UART0 (debug) | GPIO 20, 21 | 20 |
| UART1 (sensor) | GPIO 17, 18 | 18 |
| I2C (sensor) | GPIO 0, 1 | 16 |
| Wi-Fi + BLE | Internal (no GPIO) | 16 |
| SPI (display, if needed) | 4-5 pins | 11-12 |
| GPIO (buttons, LEDs, relays) | Remaining | Varies |

## References

- [ESP32 Pin Mapping -- Overview](../esp32-pin-mapping)
- [ESP32-C3 Datasheet](https://www.espressif.com.cn/sites/default/files/documentation/esp32-c3_datasheet_en.pdf)
- [boards/ESP32/ESP32-C3/ Kconfig](https://github.com/tuya/TuyaOpen/tree/master/boards/ESP32)
