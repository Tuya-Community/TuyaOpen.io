---
title: "ESP32-C6 Peripheral Mapping"
---

# ESP32-C6 Peripheral Mapping

This document describes the mapping between ESP32-C6 (single-core RISC-V, Wi-Fi 6, Thread/Zigbee) on-chip peripherals and the TuyaOpen TKL layer software ports.

## GPIO

- All GPIO pins support interrupts.
- `TUYA_GPIO_NUM_E` enum values map 1:1 to physical ESP32-C6 GPIO numbers.
- 31 GPIOs in total (GPIO0 ~ GPIO30), no gaps.

| GPIO Range | TUYA_GPIO_NUM Range | Notes |
|------------|---------------------|-------|
| GPIO0 ~ GPIO30 | TUYA_GPIO_NUM_0 ~ TUYA_GPIO_NUM_30 | General-purpose IO, all usable |

## UART

- 2 UART ports supported.
- UART0 TX/RX pins are controlled by Kconfig options `UART_NUM0_TX_PIN` / `UART_NUM0_RX_PIN`, defaulting to GPIO16 / GPIO17.
- UART1 has no dedicated IO_MUX pins and routes through the GPIO Matrix. Default pins can be overridden before initialization via `tkl_io_pinmux_config()`.

:::info[Changing UART0 Pins]
Run `tos.py config menu` in your project directory to enter the board configuration menu, find the relevant options and set the target GPIO numbers, or edit the `default` entries in `boards/ESP32/ESP32-C6/Kconfig` directly, then rebuild.
:::

| Board Pin | Function | Software Pin | Software Port |
|-----------|----------|--------------|---------------|
| GPIO16 (default) | UART0_TX | TUYA_GPIO_NUM_16 | TUYA_UART_NUM_0 |
| GPIO17 (default) | UART0_RX | TUYA_GPIO_NUM_17 | TUYA_UART_NUM_0 |
| GPIO6 (default) | UART1_TX | TUYA_GPIO_NUM_6 | TUYA_UART_NUM_1 |
| GPIO7 (default) | UART1_RX | TUYA_GPIO_NUM_7 | TUYA_UART_NUM_1 |

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
- All default PWM pins (GPIO18–GPIO26) are within the C6 GPIO range (0–30).

| Board Pin (default) | Function | Software Pin | Software Port |
|--------------------|----------|--------------|---------------|
| GPIO18 | PWM0 | TUYA_PWM0 | TUYA_PWM_NUM_0 |
| GPIO19 | PWM1 | TUYA_PWM1 | TUYA_PWM_NUM_1 |
| GPIO22 | PWM2 | TUYA_PWM2 | TUYA_PWM_NUM_2 |
| GPIO23 | PWM3 | TUYA_PWM3 | TUYA_PWM_NUM_3 |
| GPIO25 | PWM4 | TUYA_PWM4 | TUYA_PWM_NUM_4 |
| GPIO26 | PWM5 | TUYA_PWM5 | TUYA_PWM_NUM_5 |

## ADC

- ADC1 only (TUYA_ADC_NUM_0), 7 channels.
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
| GPIO6 | ADC1_CH6 | TUYA_ADC_NUM_0 |

## References

- [ESP32 Pin Mapping -- Overview](../esp32-pin-mapping)
- [ESP32-C6 Datasheet](https://www.espressif.com.cn/sites/default/files/documentation/esp32-c6_datasheet_en.pdf)
