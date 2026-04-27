---
title: "ESP32-S3 Peripheral Mapping"
---

# ESP32-S3 Peripheral Mapping

This document describes the mapping between ESP32-S3 (dual-core Xtensa LX7, AI/audio) on-chip peripherals and the TuyaOpen TKL layer software ports. ESP32-S3 is the primary chip for AI chat and voice applications in TuyaOpen.

## GPIO

- All usable GPIO pins support interrupts.
- `TUYA_GPIO_NUM_E` enum values map 1:1 to physical ESP32-S3 GPIO numbers.
- `TUYA_GPIO_NUM_22` ~ `TUYA_GPIO_NUM_25` map to `GPIO_NUM_NC` and **must not be used**.

| GPIO Range | TUYA_GPIO_NUM Range | Notes |
|------------|---------------------|-------|
| GPIO0 ~ GPIO21 | TUYA_GPIO_NUM_0 ~ TUYA_GPIO_NUM_21 | General-purpose IO |
| — | TUYA_GPIO_NUM_22 ~ TUYA_GPIO_NUM_25 | NC, do not use |
| GPIO26 ~ GPIO48 | TUYA_GPIO_NUM_26 ~ TUYA_GPIO_NUM_48 | General-purpose IO |

## UART

- 2 UART ports supported.
- UART0 TX/RX pins are controlled by Kconfig options `UART_NUM0_TX_PIN` / `UART_NUM0_RX_PIN`, defaulting to GPIO43 / GPIO44.
- UART1 has dedicated IO_MUX pins. Default pins can be overridden before initialization via `tkl_io_pinmux_config()`.
- Boards with `ENABLE_ESP32S3_USB_JTAG_ONLY` route UART0 through the internal USB Serial JTAG controller — no GPIO pins required.

:::info[Changing UART0 Pins]
Run `tos.py config menu` in your project directory to enter the board configuration menu, find the relevant options and set the target GPIO numbers, or edit the `default` entries in `boards/ESP32/ESP32-S3/Kconfig` directly, then rebuild.
:::

| Board Pin | Function | Software Pin | Software Port |
|-----------|----------|--------------|---------------|
| GPIO43 (default) | UART0_TX | TUYA_GPIO_NUM_43 | TUYA_UART_NUM_0 |
| GPIO44 (default) | UART0_RX | TUYA_GPIO_NUM_44 | TUYA_UART_NUM_0 |
| GPIO17 (default) | UART1_TX | TUYA_GPIO_NUM_17 | TUYA_UART_NUM_1 |
| GPIO18 (default) | UART1_RX | TUYA_GPIO_NUM_18 | TUYA_UART_NUM_1 |

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
| GPIO38 | PWM2 | TUYA_PWM2 | TUYA_PWM_NUM_2 |
| GPIO39 | PWM3 | TUYA_PWM3 | TUYA_PWM_NUM_3 |
| GPIO40 | PWM4 | TUYA_PWM4 | TUYA_PWM_NUM_4 |
| GPIO41 | PWM5 | TUYA_PWM5 | TUYA_PWM_NUM_5 |

## ADC

- 2 ADC units supported, 10 channels each.
- Channels are configured via bitmask (`ch_list.data`), where bit N enables `ADC_CHANNEL_N`.
- Attenuation is fixed at `ADC_ATTEN_DB_12` (~0–3.3 V range). Calibration uses the curve-fitting scheme.
- ADC2 shares hardware with the Wi-Fi RF and is unavailable while Wi-Fi is active.

### ADC1 (TUYA_ADC_NUM_0)

| Board Pin | ADC Channel | Software Port |
|-----------|-------------|---------------|
| GPIO1 | ADC1_CH0 | TUYA_ADC_NUM_0 |
| GPIO2 | ADC1_CH1 | TUYA_ADC_NUM_0 |
| GPIO3 | ADC1_CH2 | TUYA_ADC_NUM_0 |
| GPIO4 | ADC1_CH3 | TUYA_ADC_NUM_0 |
| GPIO5 | ADC1_CH4 | TUYA_ADC_NUM_0 |
| GPIO6 | ADC1_CH5 | TUYA_ADC_NUM_0 |
| GPIO7 | ADC1_CH6 | TUYA_ADC_NUM_0 |
| GPIO8 | ADC1_CH7 | TUYA_ADC_NUM_0 |
| GPIO9 | ADC1_CH8 | TUYA_ADC_NUM_0 |
| GPIO10 | ADC1_CH9 | TUYA_ADC_NUM_0 |

### ADC2 (TUYA_ADC_NUM_1)

:::warning[Wi-Fi Conflict]
ESP32-S3 ADC2 shares hardware resources with the Wi-Fi RF. ADC2 reads will fail while Wi-Fi is active. Only use `TUYA_ADC_NUM_1` when Wi-Fi is disabled.
:::

| Board Pin | ADC Channel | Software Port |
|-----------|-------------|---------------|
| GPIO11 | ADC2_CH0 | TUYA_ADC_NUM_1 |
| GPIO12 | ADC2_CH1 | TUYA_ADC_NUM_1 |
| GPIO13 | ADC2_CH2 | TUYA_ADC_NUM_1 |
| GPIO14 | ADC2_CH3 | TUYA_ADC_NUM_1 |
| GPIO15 | ADC2_CH4 | TUYA_ADC_NUM_1 |
| GPIO16 | ADC2_CH5 | TUYA_ADC_NUM_1 |
| GPIO17 | ADC2_CH6 | TUYA_ADC_NUM_1 |
| GPIO18 | ADC2_CH7 | TUYA_ADC_NUM_1 |
| GPIO19 | ADC2_CH8 | TUYA_ADC_NUM_1 |
| GPIO20 | ADC2_CH9 | TUYA_ADC_NUM_1 |

## References

- [ESP32 Pin Mapping -- Overview](../esp32-pin-mapping)
- [ESP32-S3 Datasheet](https://www.espressif.com.cn/sites/default/files/documentation/esp32-s3_datasheet_en.pdf)
