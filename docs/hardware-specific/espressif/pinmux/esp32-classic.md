---
title: "ESP32 (Classic) Peripheral Mapping"
---

# ESP32 (Classic) Peripheral Mapping

This document describes the mapping between ESP32 (dual-core Xtensa LX6) on-chip peripherals and the TuyaOpen TKL layer software ports.

## GPIO

- All GPIO pins support interrupts.
- `TUYA_GPIO_NUM_E` enum values map 1:1 to physical ESP32 GPIO numbers.
- `TUYA_GPIO_NUM_24` maps to `GPIO_NUM_NC` and **must not be used**.
- GPIO34 ~ GPIO39 are **input-only** pins — output mode and pull-up/pull-down configuration are not supported.

| GPIO Range | TUYA_GPIO_NUM Range | Notes |
|------------|---------------------|-------|
| GPIO0 ~ GPIO23 | TUYA_GPIO_NUM_0 ~ TUYA_GPIO_NUM_23 | General-purpose IO |
| — | TUYA_GPIO_NUM_24 | NC, do not use |
| GPIO25 ~ GPIO33 | TUYA_GPIO_NUM_25 ~ TUYA_GPIO_NUM_33 | General-purpose IO |
| GPIO34 ~ GPIO39 | TUYA_GPIO_NUM_34 ~ TUYA_GPIO_NUM_39 | Input only, no output / pull |

## UART

- 2 UART ports supported.
- UART0 TX/RX pins are controlled by Kconfig options `UART_NUM0_TX_PIN` / `UART_NUM0_RX_PIN`, defaulting to GPIO1 / GPIO3.
- UART1 has dedicated IO_MUX pins. Default pins can be overridden before initialization via `tkl_io_pinmux_config()`.

:::info[Changing UART0 Pins]
Run `tos.py config menu` in your project directory to enter the board configuration menu, find the relevant options and set the target GPIO numbers, or edit the `default` entries in `boards/ESP32/ESP32/Kconfig` directly, then rebuild.
:::

| Board Pin | Function | Software Pin | Software Port |
|-----------|----------|--------------|---------------|
| GPIO1 (default) | UART0_TX | TUYA_GPIO_NUM_1 | TUYA_UART_NUM_0 |
| GPIO3 (default) | UART0_RX | TUYA_GPIO_NUM_3 | TUYA_UART_NUM_0 |
| GPIO10 (default) | UART1_TX | TUYA_GPIO_NUM_10 | TUYA_UART_NUM_1 |
| GPIO9 (default) | UART1_RX | TUYA_GPIO_NUM_9 | TUYA_UART_NUM_1 |

## I2C

- 2 I2C ports supported.
- Default pins can be overridden before initialization via `tkl_io_pinmux_config()`.

| Board Pin (default) | Function | Software Pin | Software Port |
|--------------------|----------|--------------|---------------|
| GPIO0 | I2C0_SCL | TUYA_IIC0_SCL | TUYA_I2C_NUM_0 |
| GPIO1 | I2C0_SDA | TUYA_IIC0_SDA | TUYA_I2C_NUM_0 |
| GPIO2 | I2C1_SCL | TUYA_IIC1_SCL | TUYA_I2C_NUM_1 |
| GPIO3 | I2C1_SDA | TUYA_IIC1_SDA | TUYA_I2C_NUM_1 |

## PWM

- 6 PWM channels, implemented using ESP-IDF LEDC driver (LEDC_LOW_SPEED_MODE, 12-bit resolution).
- Default pins can be overridden before initialization via `tkl_io_pinmux_config()`.

| Board Pin (default) | Function | Software Pin | Software Port |
|--------------------|----------|--------------|---------------|
| GPIO18 | PWM0 | TUYA_PWM0 | TUYA_PWM_NUM_0 |
| GPIO19 | PWM1 | TUYA_PWM1 | TUYA_PWM_NUM_1 |
| GPIO22 | PWM2 | TUYA_PWM2 | TUYA_PWM_NUM_2 |
| GPIO23 | PWM3 | TUYA_PWM3 | TUYA_PWM_NUM_3 |
| GPIO25 | PWM4 | TUYA_PWM4 | TUYA_PWM_NUM_4 |
| GPIO26 | PWM5 | TUYA_PWM5 | TUYA_PWM_NUM_5 |

## ADC

- 2 ADC units supported. Channels are configured via bitmask (`ch_list.data`), where bit N enables `ADC_CHANNEL_N`.
- Attenuation is fixed at `ADC_ATTEN_DB_12` (~0–3.3 V range). Calibration uses the line-fitting scheme.
- ADC2 shares hardware with the Wi-Fi RF and is unavailable while Wi-Fi is active.

### ADC1 (TUYA_ADC_NUM_0)

| Board Pin | ADC Channel | Software Port |
|-----------|-------------|---------------|
| GPIO36 (VP) | ADC1_CH0 | TUYA_ADC_NUM_0 |
| GPIO37 | ADC1_CH1 | TUYA_ADC_NUM_0 |
| GPIO38 | ADC1_CH2 | TUYA_ADC_NUM_0 |
| GPIO39 (VN) | ADC1_CH3 | TUYA_ADC_NUM_0 |
| GPIO32 | ADC1_CH4 | TUYA_ADC_NUM_0 |
| GPIO33 | ADC1_CH5 | TUYA_ADC_NUM_0 |
| GPIO34 | ADC1_CH6 | TUYA_ADC_NUM_0 |
| GPIO35 | ADC1_CH7 | TUYA_ADC_NUM_0 |

### ADC2 (TUYA_ADC_NUM_1)

:::warning[Wi-Fi Conflict]
ESP32 ADC2 shares hardware resources with the Wi-Fi RF. ADC2 reads will fail while Wi-Fi is active. Only use `TUYA_ADC_NUM_1` when Wi-Fi is disabled.
:::

| Board Pin | ADC Channel | Software Port |
|-----------|-------------|---------------|
| GPIO4 | ADC2_CH0 | TUYA_ADC_NUM_1 |
| GPIO0 | ADC2_CH1 | TUYA_ADC_NUM_1 |
| GPIO2 | ADC2_CH2 | TUYA_ADC_NUM_1 |
| GPIO15 | ADC2_CH3 | TUYA_ADC_NUM_1 |
| GPIO13 | ADC2_CH4 | TUYA_ADC_NUM_1 |
| GPIO12 | ADC2_CH5 | TUYA_ADC_NUM_1 |
| GPIO14 | ADC2_CH6 | TUYA_ADC_NUM_1 |
| GPIO27 | ADC2_CH7 | TUYA_ADC_NUM_1 |
| GPIO25 | ADC2_CH8 | TUYA_ADC_NUM_1 |
| GPIO26 | ADC2_CH9 | TUYA_ADC_NUM_1 |

## References

- [ESP32 Pin Mapping -- Overview](../esp32-pin-mapping)
- [ESP32 Datasheet](https://www.espressif.com.cn/sites/default/files/documentation/esp32_datasheet_en.pdf)
