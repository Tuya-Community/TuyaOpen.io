---
title: L511C-Y6 Peripheral Mapping
description: L511C-Y6E pin mapping and current SDK support status.
---

# L511C-Y6 Peripheral Mapping

This page applies to **L511C-Y6E**, with SDK target **L511C_Y6E**. Check pin multiplexing and electrical limits against the module specification and schematic.

## GPIO

| Tuya Pin | Default function | GPIO/PAD | Notes |
|---:|---|---|---|
| 16 | NET_STATUS | GPIO14 | Network indicator; network-light control unsupported in versions 0.0.4 and earlier, per reference |
| 19 | MAIN_DTR | PAD0 | Reference says reserved for low-power module wakeup, not general GPIO |
| 20 | MAIN_RI | GPIO11 / PAD4 | Reference notes MCU wakeup |
| 21 | MAIN_DCD | GPIO18 | No additional limitation listed |
| 22 | MAIN_CTS | GPIO19 | Listed as an I2C1 multiplexing pin in the reference |
| 23 | MAIN_RTS | GPIO20 | Listed as an I2C1 multiplexing pin in old reference |
| 25 | STATUS | GPIO12 / PAD5 | Multiplexed with PWM2 |

These are mappings in the reference. Do not infer GPIO availability for unlisted pins. Verify multiplexing and electrical limits against the Y6E module specification and schematic.

## ADC

The hardware reference lists Tuya ADC 0→ADC0 and Tuya ADC 1→ADC1 as OK; ADC_BAT is listed without a verification result. Some read/query APIs in Y6E SDK `tkl_adc.c` return `OPRT_NOT_SUPPORTED`, so the old table alone does not establish full ADC support. Verify usable read APIs, channels, and pin mapping against the current platform implementation and target board.

## PWM

| Tuya PWM | Tuya Pin | PWM channel |
|---:|---:|---|
| 0 | 28 | PWM0 |
| 1 | 29 | PWM1 |
| 2 | 25 | PWM2 |
| 3 | 20 | PWM3 |
| 4 | 16 | PWM4 |

PWM mappings are listed above. The Y6E SDK provides basic channel control in `tkl_pwm.c`; multi-channel, polarity, and capture interfaces are unsupported. Check board routing and pin multiplexing before use.

## I2C

**Current Y6E SDK does not support I2C master transfers.** In `platform/L511C_Y6E/tuyaos/tuyaos_adapter/src/tkl_i2c.c`, interfaces including `tkl_i2c_master_send()` and `tkl_i2c_master_receive()` return `OPRT_NOT_SUPPORTED`. Treat I2C as unsupported for current product designs.

The older hardware reference still lists I2C0 on Tuya Pins 18/19 and I2C1 on Pins 22/23, both marked OK. This conflicts with the current SDK; the old entries are retained as historical notes and do not indicate current software support. Recheck if SDK support changes.

## SPI

**The current Y6E SDK does not provide usable SPI peripheral support; treat SPI as unsupported.** The old hardware reference has an empty SPI section and explicitly lists SPI among unsupported items. Do not apply Y7PM SPI mappings or external Flash recommendations to Y6E.

## UART

Y6E SDK contains a `tkl_uart.c` adapter, but the old hardware reference provides no UART port numbers, Tuya Pins, or validation results. Only the presence of adapter source is confirmed. Available ports, pin multiplexing, debug port, and board wiring remain unverified; do not infer a usable pin assignment.

## I2S

This page does not provide an I2S wiring scheme for Y6E. Do not apply Y7PM PCM pin assignments or ES8311 notes.

## References

- [L511C-Y6E hardware reference](https://github.com/tuya/tuyaopen-ide-manifests/blob/main/docs/hardware/l511c-y6e.md): older GPIO, ADC, I2C, PWM tables and unsupported-item list. Its I2C table says OK while its final section says I2C is unsupported.
- [L511C_Y6E SDK source](https://github.com/tuya/TuyaOpen-LYNQ/tree/83069e5b60baf4bedd2bf5e6fd21e81472d13428/tuyaos/tuyaos_adapter/src): `tkl_i2c.c`, `tkl_gpio.c`, `tkl_adc.c`, `tkl_pwm.c`, and `tkl_uart.c`.
