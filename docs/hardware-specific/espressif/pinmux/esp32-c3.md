---
title: "ESP32-C3 Peripheral Mapping"
---

# ESP32-C3 Peripheral Mapping

This document describes the mapping between ESP32-C3 (single-core RISC-V, cost-optimized) on-chip peripherals and the TuyaOpen TKL layer software ports.

## GPIO

- All GPIO pins support interrupts.
- `TUYA_GPIO_NUM_E` enum values map 1:1 to physical ESP32-C3 GPIO numbers.
- 22 GPIOs in total (GPIO0 ~ GPIO21). Plan pin assignments carefully to avoid conflicts.

| GPIO Range | TUYA_GPIO_NUM Range | Notes |
|------------|---------------------|-------|
| GPIO0 ~ GPIO21 | TUYA_GPIO_NUM_0 ~ TUYA_GPIO_NUM_21 | General-purpose IO, all usable |

## UART

- 2 UART ports supported.
- UART0 TX/RX pins are controlled by Kconfig options `UART_NUM0_TX_PIN` / `UART_NUM0_RX_PIN`, defaulting to GPIO21 / GPIO20.
- UART1 has no dedicated IO_MUX pins and routes through the GPIO Matrix. Default pins can be overridden before initialization via `tkl_io_pinmux_config()`.

:::info[Changing UART0 Pins]
Run `tos.py config menu` in your project directory to enter the board configuration menu, find the relevant options and set the target GPIO numbers, or edit the `default` entries in `boards/ESP32/ESP32-C3/Kconfig` directly, then rebuild.
:::

| Board Pin | Function | Software Pin | Software Port |
|-----------|----------|--------------|---------------|
| GPIO21 (default) | UART0_TX | TUYA_GPIO_NUM_21 | TUYA_UART_NUM_0 |
| GPIO20 (default) | UART0_RX | TUYA_GPIO_NUM_20 | TUYA_UART_NUM_0 |
| GPIO17 (default) | UART1_TX | TUYA_GPIO_NUM_17 | TUYA_UART_NUM_1 |
| GPIO18 (default) | UART1_RX | TUYA_GPIO_NUM_18 | TUYA_UART_NUM_1 |

## I2C

- 1 hardware I2C port supported (TUYA_I2C_NUM_0).
- Default pins can be overridden before initialization via `tkl_io_pinmux_config()`.

| Board Pin (default) | Function | Software Pin | Software Port |
|--------------------|----------|--------------|---------------|
| GPIO0 | I2C0_SCL | TUYA_IIC0_SCL | TUYA_I2C_NUM_0 |
| GPIO1 | I2C0_SDA | TUYA_IIC0_SDA | TUYA_I2C_NUM_0 |

## PWM

- 6 PWM channels, implemented using ESP-IDF LEDC driver (LEDC_LOW_SPEED_MODE, 12-bit resolution).
- Default pins can be overridden before initialization via `tkl_io_pinmux_config()`.

| Board Pin (default) | Function | Software Pin | Software Port |
|--------------------|----------|--------------|---------------|
| GPIO18 | PWM0 | TUYA_PWM0 | TUYA_PWM_NUM_0 |
| GPIO19 | PWM1 | TUYA_PWM1 | TUYA_PWM_NUM_1 |
| GPIO3 | PWM2 | TUYA_PWM2 | TUYA_PWM_NUM_2 |
| GPIO4 | PWM3 | TUYA_PWM3 | TUYA_PWM_NUM_3 |
| GPIO5 | PWM4 | TUYA_PWM4 | TUYA_PWM_NUM_4 |
| GPIO6 | PWM5 | TUYA_PWM5 | TUYA_PWM_NUM_5 |

## ADC

- ADC1 only (TUYA_ADC_NUM_0), 6 channels.
- Channels are configured via bitmask (`ch_list.data`), where bit N enables `ADC_CHANNEL_N`.
- Attenuation is fixed at `ADC_ATTEN_DB_12` (~0–3.3 V range). Calibration uses the curve-fitting scheme.

| Board Pin | ADC Channel | Software Port |
|-----------|-------------|---------------|
| GPIO0 | ADC1_CH0 | TUYA_ADC_NUM_0 |
| GPIO1 | ADC1_CH1 | TUYA_ADC_NUM_0 |
| GPIO2 | ADC1_CH2 | TUYA_ADC_NUM_0 |
| GPIO3 | ADC1_CH3 | TUYA_ADC_NUM_0 |
| GPIO4 | ADC1_CH4 | TUYA_ADC_NUM_0 |
| GPIO5 | ADC1_CH5 | TUYA_ADC_NUM_0 |

## References

- [ESP32 Pin Mapping -- Overview](../esp32-pin-mapping)
- [ESP32-C3 Datasheet](https://www.espressif.com.cn/sites/default/files/documentation/esp32-c3_datasheet_en.pdf)
