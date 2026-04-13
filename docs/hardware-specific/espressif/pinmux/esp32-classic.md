---
title: "ESP32 (Classic) Peripheral Mapping"
---

This document describes the mapping between ESP32 (classic, dual-core Xtensa LX6) hardware peripherals and TuyaOpen TKL/TAL software ports. Cross-referenced with the TKL adapter source code.

## GPIO

- ESP32 has 39 GPIO entries in the pinmap. GPIO 24 is `GPIO_NUM_NC`.
- GPIO 34-39 are **input-only** (no output, no internal pull-up/pull-down).
- All usable GPIOs support interrupts.

| Board Pin | Function | Software Pin | Software Port | Notes |
|-----------|----------|-------------|---------------|-------|
| GPIO 0-23 | GPIO | `TUYA_GPIO_NUM_0` - `TUYA_GPIO_NUM_23` | / | GPIO 24 is NC |
| GPIO 25-33 | GPIO | `TUYA_GPIO_NUM_25` - `TUYA_GPIO_NUM_33` | / | Fully usable |
| GPIO 34-39 | GPIO (input) | `TUYA_GPIO_NUM_34` - `TUYA_GPIO_NUM_39` | / | **Input-only** |

Source: `tkl_pin.c` lines 63-68 (`CONFIG_IDF_TARGET_ESP32` block).

## ADC

- ESP32 classic has ADC1 (8 channels) and ADC2 (10 channels).
- **ADC2 is unavailable when Wi-Fi is active.** Use ADC1 for always-on analog reads.
- Fixed attenuation `ADC_ATTEN_DB_12` (0-3.3 V). Reference: 3300 mV. Calibration: line-fitting.

| ADC Channel | GPIO | Software Pin | Software Port | Notes |
|-------------|------|-------------|---------------|-------|
| ADC1_CH0 | GPIO 36 | ch_0 (bit 0) | `TUYA_ADC_NUM_0` | Input-only pin |
| ADC1_CH1 | GPIO 37 | ch_1 (bit 1) | `TUYA_ADC_NUM_0` | Input-only pin |
| ADC1_CH2 | GPIO 38 | ch_2 (bit 2) | `TUYA_ADC_NUM_0` | Input-only pin |
| ADC1_CH3 | GPIO 39 | ch_3 (bit 3) | `TUYA_ADC_NUM_0` | Input-only pin |
| ADC1_CH4 | GPIO 32 | ch_4 (bit 4) | `TUYA_ADC_NUM_0` | |
| ADC1_CH5 | GPIO 33 | ch_5 (bit 5) | `TUYA_ADC_NUM_0` | |
| ADC1_CH6 | GPIO 34 | ch_6 (bit 6) | `TUYA_ADC_NUM_0` | Input-only pin |
| ADC1_CH7 | GPIO 35 | ch_7 (bit 7) | `TUYA_ADC_NUM_0` | Input-only pin |
| ADC2_CH0 | GPIO 4 | ch_0 (bit 0) | `TUYA_ADC_NUM_1` | **Unavailable during Wi-Fi** |
| ADC2_CH1 | GPIO 0 | ch_1 (bit 1) | `TUYA_ADC_NUM_1` | **Unavailable during Wi-Fi** |
| ADC2_CH2 | GPIO 2 | ch_2 (bit 2) | `TUYA_ADC_NUM_1` | **Unavailable during Wi-Fi** |
| ADC2_CH3 | GPIO 15 | ch_3 (bit 3) | `TUYA_ADC_NUM_1` | **Unavailable during Wi-Fi** |
| ADC2_CH4 | GPIO 13 | ch_4 (bit 4) | `TUYA_ADC_NUM_1` | **Unavailable during Wi-Fi** |
| ADC2_CH5 | GPIO 12 | ch_5 (bit 5) | `TUYA_ADC_NUM_1` | **Unavailable during Wi-Fi** |
| ADC2_CH6 | GPIO 14 | ch_6 (bit 6) | `TUYA_ADC_NUM_1` | **Unavailable during Wi-Fi** |
| ADC2_CH7 | GPIO 27 | ch_7 (bit 7) | `TUYA_ADC_NUM_1` | **Unavailable during Wi-Fi** |
| ADC2_CH8 | GPIO 25 | ch_8 (bit 8) | `TUYA_ADC_NUM_1` | **Unavailable during Wi-Fi** |
| ADC2_CH9 | GPIO 26 | ch_9 (bit 9) | `TUYA_ADC_NUM_1` | **Unavailable during Wi-Fi** |

Source: `tkl_adc.c` + Espressif `soc/esp32/include/soc/adc_channel.h`.

## I2C

- 2 I2C master ports supported. Slave mode not supported.
- Any GPIO can be used for I2C via the GPIO matrix.

| Board Pin | Function | Software Pin | Software Port | Notes |
|-----------|----------|-------------|---------------|-------|
| GPIO 0 (default) | I2C0_SCL | `TUYA_IIC0_SCL` | `TUYA_I2C_NUM_0` | Override via pinmux |
| GPIO 1 (default) | I2C0_SDA | `TUYA_IIC0_SDA` | `TUYA_I2C_NUM_0` | Override via pinmux |
| GPIO 2 (default) | I2C1_SCL | `TUYA_IIC1_SCL` | `TUYA_I2C_NUM_1` | Override via pinmux |
| GPIO 3 (default) | I2C1_SDA | `TUYA_IIC1_SDA` | `TUYA_I2C_NUM_1` | Override via pinmux |

Source: `tkl_i2c.c` `sg_i2c_pin[]` lines 39-46.

## UART

| Board Pin | Function | Software Pin | Software Port | Notes |
|-----------|----------|-------------|---------------|-------|
| GPIO 1 (default) | UART0_TX | / | `TUYA_UART_NUM_0` | Override via Kconfig `UART_NUM0_TX_PIN` |
| GPIO 3 (default) | UART0_RX | / | `TUYA_UART_NUM_0` | Override via Kconfig `UART_NUM0_RX_PIN` |
| GPIO 17 | UART1_TX | / | `TUYA_UART_NUM_1` | Fixed in driver |
| GPIO 18 | UART1_RX | / | `TUYA_UART_NUM_1` | Fixed in driver |

Source: `tkl_uart.c` lines 240-255; `boards/ESP32/ESP32/Kconfig`.

## PWM

- 6 LEDC channels mapped by default. ESP32 hardware supports 8 per speed mode.
- Resolution: 12-bit. Speed mode: `LEDC_LOW_SPEED_MODE`.

| Board Pin | Function | Software Pin | Software Port |
|-----------|----------|-------------|---------------|
| GPIO 18 | PWM_CH0 | `TUYA_PWM0` | `TUYA_PWM_NUM_0` |
| GPIO 19 | PWM_CH1 | `TUYA_PWM1` | `TUYA_PWM_NUM_1` |
| GPIO 22 | PWM_CH2 | `TUYA_PWM2` | `TUYA_PWM_NUM_2` |
| GPIO 23 | PWM_CH3 | `TUYA_PWM3` | `TUYA_PWM_NUM_3` |
| GPIO 25 | PWM_CH4 | `TUYA_PWM4` | `TUYA_PWM_NUM_4` |
| GPIO 26 | PWM_CH5 | `TUYA_PWM5` | `TUYA_PWM_NUM_5` |

All defaults are valid GPIOs on classic ESP32. Override via `tkl_io_pinmux_config()`.

Source: `tkl_pwm.c` `sg_pwm_gpio_map[]` lines 43-50.

## TIMER

- 3 GPTimer instances. Resolution: 1 MHz (1 us/tick). Count up.
- `tkl_timer_get_current_value()`: `OPRT_NOT_SUPPORTED`.

## WATCHDOG

- ESP-IDF Task WDT. `trigger_panic = true`. Timeout from `cfg->interval_ms`.

## RTC

- POSIX `gettimeofday` / `settimeofday`. Not a hardware RTC.

## SPI

- **Not implemented** via TKL. Board BSP handles SPI for displays.

:::danger Pin Number Warning
The `boards/ESP32/ESP32/board_config.h` defines I2C pins as GPIO 42/41 and I2S pins as GPIO 46, which exceed the classic ESP32 range (0-39). This BSP likely targets S3 hardware despite the directory name. If using actual classic ESP32, remap all pins to GPIO 0-39.
:::

## TKL Not Implemented on ESP32 Classic

| Interface | Status | Workaround |
|-----------|--------|-----------|
| `tkl_spi` | Not implemented | ESP-IDF `spi_master` or board BSP |
| `tkl_dac` | Not implemented | ESP32 has DAC on GPIO 25/26; use ESP-IDF `dac_output_*` |
| `tkl_display` | No TKL layer | Board BSP + ESP-IDF LVGL |
| `tkl_i2c` slave | `OPRT_NOT_SUPPORTED` | ESP-IDF `i2c_slave` |
| `tkl_cpu_sleep_callback` | `OPRT_NOT_SUPPORTED` | ESP-IDF `esp_pm_*` |
| `tkl_flash_lock/unlock` | `OPRT_NOT_SUPPORTED` | ESP-IDF flash encryption |

## References

- [ESP32 Peripheral Mapping Overview](../esp32-pin-mapping)
- [ESP32 Datasheet](https://www.espressif.com.cn/sites/default/files/documentation/esp32_datasheet_en.pdf)
