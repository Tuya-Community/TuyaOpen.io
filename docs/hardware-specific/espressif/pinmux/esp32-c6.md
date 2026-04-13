---
title: "ESP32-C6 Peripheral Mapping"
---

This document describes the mapping between ESP32-C6 (single RISC-V core, Wi-Fi 6) hardware peripherals and TuyaOpen TKL/TAL software ports.

## GPIO

- ESP32-C6 has 31 GPIO entries (GPIO 0-30). No gaps.
- All GPIOs support interrupts.

| Board Pin | Function | Software Pin | Software Port |
|-----------|----------|-------------|---------------|
| GPIO 0-30 | GPIO | `TUYA_GPIO_NUM_0` - `TUYA_GPIO_NUM_30` | / |

Source: `tkl_pin.c` lines 59-62 (`CONFIG_IDF_TARGET_ESP32C6` block).

## ADC

- ADC1 has 7 channels. No ADC2 on C6.
- Fixed attenuation `ADC_ATTEN_DB_12` (0-3.3 V). Calibration: curve-fitting.

| ADC Channel | GPIO | Software Pin | Software Port |
|-------------|------|-------------|---------------|
| ADC1_CH0 | GPIO 0 | ch_0 (bit 0) | `TUYA_ADC_NUM_0` |
| ADC1_CH1 | GPIO 1 | ch_1 (bit 1) | `TUYA_ADC_NUM_0` |
| ADC1_CH2 | GPIO 2 | ch_2 (bit 2) | `TUYA_ADC_NUM_0` |
| ADC1_CH3 | GPIO 3 | ch_3 (bit 3) | `TUYA_ADC_NUM_0` |
| ADC1_CH4 | GPIO 4 | ch_4 (bit 4) | `TUYA_ADC_NUM_0` |
| ADC1_CH5 | GPIO 5 | ch_5 (bit 5) | `TUYA_ADC_NUM_0` |
| ADC1_CH6 | GPIO 6 | ch_6 (bit 6) | `TUYA_ADC_NUM_0` |

Source: `tkl_adc.c` + Espressif `soc/esp32c6/include/soc/adc_channel.h`.

## I2C

- 1 I2C master port (I2C0).

| Board Pin | Function | Software Pin | Software Port |
|-----------|----------|-------------|---------------|
| GPIO 0 (default) | I2C0_SCL | `TUYA_IIC0_SCL` | `TUYA_I2C_NUM_0` |
| GPIO 1 (default) | I2C0_SDA | `TUYA_IIC0_SDA` | `TUYA_I2C_NUM_0` |

Override via `tkl_io_pinmux_config()`.

## UART

:::warning Pin Conflict
UART0 RX default (GPIO 17) and UART1 TX (GPIO 17) share the same pin. If using both UART ports, remap UART0 via Kconfig.
:::

| Board Pin | Function | Software Pin | Software Port | Notes |
|-----------|----------|-------------|---------------|-------|
| GPIO 16 (default) | UART0_TX | / | `TUYA_UART_NUM_0` | Override via Kconfig |
| GPIO 17 (default) | UART0_RX | / | `TUYA_UART_NUM_0` | **Conflicts with UART1 TX** |
| GPIO 17 | UART1_TX | / | `TUYA_UART_NUM_1` | Fixed in driver |
| GPIO 18 | UART1_RX | / | `TUYA_UART_NUM_1` | Fixed in driver |

Source: `boards/ESP32/ESP32-C6/Kconfig`; `tkl_uart.c` lines 252-255.

## PWM

| Board Pin | Function | Software Pin | Software Port | Notes |
|-----------|----------|-------------|---------------|-------|
| GPIO 18 | PWM_CH0 | `TUYA_PWM0` | `TUYA_PWM_NUM_0` | |
| GPIO 19 | PWM_CH1 | `TUYA_PWM1` | `TUYA_PWM_NUM_1` | |
| GPIO 22 | PWM_CH2 | `TUYA_PWM2` | `TUYA_PWM_NUM_2` | Valid on C6 (0-30 range) |
| GPIO 23 | PWM_CH3 | `TUYA_PWM3` | `TUYA_PWM_NUM_3` | Valid on C6 |
| GPIO 25 | PWM_CH4 | `TUYA_PWM4` | `TUYA_PWM_NUM_4` | Valid on C6 |
| GPIO 26 | PWM_CH5 | `TUYA_PWM5` | `TUYA_PWM_NUM_5` | Valid on C6 |

All default PWM pins are within the C6 GPIO range (0-30).

## Board: Waveshare ESP32-C6 DevKit N16

| Function | GPIO | Notes |
|----------|------|-------|
| Button | GPIO 9 | `TUYA_GPIO_NUM_9`, active low |
| LED (WS2812) | GPIO 8 | `TUYA_GPIO_NUM_8`, addressable RGB via RMT |
| UART0 TX | GPIO 16 | Default |
| UART0 RX | GPIO 17 | Default |

Kconfig selects: `ENABLE_BUTTON`, `ENABLE_LED`, `PLATFORM_FLASHSIZE_16M`.

## TIMER

- 3 GPTimer instances. Resolution: 1 MHz.

## Thread / Zigbee

- ESP32-C6 supports IEEE 802.15.4 (Thread, Zigbee) at the hardware level.
- **TuyaOpen does not abstract these protocols.** Use ESP-IDF `esp_openthread_*` or `esp_zb_*` directly. This code is not portable to other TuyaOpen platforms.

## TKL Not Implemented on ESP32-C6

| Interface | Status | Notes |
|-----------|--------|-------|
| `tkl_spi` | Not implemented | Use ESP-IDF `spi_master` |
| `tkl_i2s` | Not practical | No audio BSP for C6 |
| `tkl_dac` | Not available | C6 has no DAC |
| `tkl_display` | No TKL layer | No display BSP for C6 |
| `tkl_camera` | Not available | No camera interface |
| Thread / Zigbee | Not abstracted | Use ESP-IDF directly |

## References

- [ESP32 Peripheral Mapping Overview](../esp32-pin-mapping)
- [ESP32-C6 Datasheet](https://www.espressif.com.cn/sites/default/files/documentation/esp32-c6_datasheet_en.pdf)
