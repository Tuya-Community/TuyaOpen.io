---
title: "ESP32-C3 Peripheral Mapping"
---

This document describes the mapping between ESP32-C3 (single RISC-V core) hardware peripherals and TuyaOpen TKL/TAL software ports.

## GPIO

- ESP32-C3 has 22 GPIO entries (GPIO 0-21). No gaps.
- All GPIOs support interrupts.

| Board Pin | Function | Software Pin | Software Port |
|-----------|----------|-------------|---------------|
| GPIO 0-21 | GPIO | `TUYA_GPIO_NUM_0` - `TUYA_GPIO_NUM_21` | / |

Source: `tkl_pin.c` lines 57-58 (`CONFIG_IDF_TARGET_ESP32C3` block).

## ADC

- ADC1 has 5 channels. ADC2 has 1 channel.
- Fixed attenuation `ADC_ATTEN_DB_12` (0-3.3 V). Calibration: curve-fitting.

| ADC Channel | GPIO | Software Pin | Software Port |
|-------------|------|-------------|---------------|
| ADC1_CH0 | GPIO 0 | ch_0 (bit 0) | `TUYA_ADC_NUM_0` |
| ADC1_CH1 | GPIO 1 | ch_1 (bit 1) | `TUYA_ADC_NUM_0` |
| ADC1_CH2 | GPIO 2 | ch_2 (bit 2) | `TUYA_ADC_NUM_0` |
| ADC1_CH3 | GPIO 3 | ch_3 (bit 3) | `TUYA_ADC_NUM_0` |
| ADC1_CH4 | GPIO 4 | ch_4 (bit 4) | `TUYA_ADC_NUM_0` |
| ADC2_CH0 | GPIO 5 | ch_0 (bit 0) | `TUYA_ADC_NUM_1` |

Source: `tkl_adc.c` + Espressif `soc/esp32c3/include/soc/adc_channel.h`.

## I2C

- 1 I2C master port (I2C0). C3 hardware has only 1 I2C controller.

| Board Pin | Function | Software Pin | Software Port |
|-----------|----------|-------------|---------------|
| GPIO 0 (default) | I2C0_SCL | `TUYA_IIC0_SCL` | `TUYA_I2C_NUM_0` |
| GPIO 1 (default) | I2C0_SDA | `TUYA_IIC0_SDA` | `TUYA_I2C_NUM_0` |

Override via `tkl_io_pinmux_config()`. Any GPIO 0-21 can be used.

## UART

| Board Pin | Function | Software Pin | Software Port | Notes |
|-----------|----------|-------------|---------------|-------|
| GPIO 21 (default) | UART0_TX | / | `TUYA_UART_NUM_0` | Override via Kconfig |
| GPIO 20 (default) | UART0_RX | / | `TUYA_UART_NUM_0` | Override via Kconfig |
| GPIO 17 | UART1_TX | / | `TUYA_UART_NUM_1` | Fixed in driver |
| GPIO 18 | UART1_RX | / | `TUYA_UART_NUM_1` | Fixed in driver |

Source: `boards/ESP32/ESP32-C3/Kconfig`; `tkl_uart.c` lines 252-255.

## PWM

- 6 LEDC channels. C3 hardware supports 6 channels total.

| Board Pin | Function | Software Pin | Software Port | Notes |
|-----------|----------|-------------|---------------|-------|
| GPIO 18 | PWM_CH0 | `TUYA_PWM0` | `TUYA_PWM_NUM_0` | |
| GPIO 19 | PWM_CH1 | `TUYA_PWM1` | `TUYA_PWM_NUM_1` | |
| GPIO 22 | PWM_CH2 | `TUYA_PWM2` | `TUYA_PWM_NUM_2` | **Invalid: C3 max GPIO is 21. Must override.** |
| GPIO 23 | PWM_CH3 | `TUYA_PWM3` | `TUYA_PWM_NUM_3` | **Invalid: must override.** |
| GPIO 25 | PWM_CH4 | `TUYA_PWM4` | `TUYA_PWM_NUM_4` | **Invalid: must override.** |
| GPIO 26 | PWM_CH5 | `TUYA_PWM5` | `TUYA_PWM_NUM_5` | **Invalid: must override.** |

:::warning
Default PWM pins 22, 23, 25, 26 do not exist on ESP32-C3 (max GPIO 21). You **must** call `tkl_io_pinmux_config()` to remap channels 2-5 before using them.
:::

## TIMER

- 3 GPTimer instances. Resolution: 1 MHz. `tkl_timer_get_current_value()`: `OPRT_NOT_SUPPORTED`.

## Pin Planning Guide (22 GPIOs)

| Allocation | Pins Used | Remaining |
|-----------|-----------|-----------|
| UART0 (debug) | GPIO 20, 21 | 20 |
| UART1 (external) | GPIO 17, 18 | 18 |
| I2C (sensor) | GPIO 0, 1 | 16 |
| ADC (analog) | GPIO 2-5 | 12 |
| PWM (LED/motor) | GPIO 6, 7 | 10 |
| Wi-Fi + BLE | Internal | 10 |
| Remaining GPIO | GPIO 8-16, 19 | 10 |

## TKL Not Implemented on ESP32-C3

| Interface | Status | Notes |
|-----------|--------|-------|
| `tkl_spi` | Not implemented | Use ESP-IDF `spi_master` |
| `tkl_i2s` | Not practical | No audio BSP for C3 |
| `tkl_dac` | Not available | C3 has no DAC |
| `tkl_display` | No TKL layer | No display BSP for C3 |
| `tkl_camera` | Not available | No camera interface |
| `tkl_bt` | Supported | BLE 5.0 only (no classic BT) |

## References

- [ESP32 Peripheral Mapping Overview](../esp32-pin-mapping)
- [ESP32-C3 Datasheet](https://www.espressif.com.cn/sites/default/files/documentation/esp32-c3_datasheet_en.pdf)
