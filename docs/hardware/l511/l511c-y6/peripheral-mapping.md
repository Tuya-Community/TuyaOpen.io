---
title: L511C-Y6 Peripheral Mapping
description: L511C-Y6E pin mapping and TuyaOpen SDK peripheral support.
---

# L511C-Y6 Peripheral Mapping

Applies to **L511C-Y6E** (SDK target **L511C_Y6E**). Check pin multiplexing against the module specification and board schematic.

## GPIO

| Tuya Pin | Default function | GPIO/PAD | Notes |
|---:|---|---|---|
| 16 | NET_STATUS | GPIO14 | Network indicator; network-light control unsupported in versions 0.0.4 and earlier, per reference |
| 19 | MAIN_DTR | PAD0 | Reserved for low-power module wakeup; not general GPIO |
| 20 | MAIN_RI | GPIO11 / PAD4 | MCU wakeup |
| 21 | MAIN_DCD | GPIO18 |  |
| 22 | MAIN_CTS | GPIO19 | I2C1 multiplexing pin in the reference |
| 23 | MAIN_RTS | GPIO20 | I2C1 multiplexing pin in the reference |
| 25 | STATUS | GPIO12 / PAD5 | Multiplexed with PWM2 |

## ADC

ADC ports 0 and 1 support `tkl_adc_read_voltage()`, which reads voltage in millivolts. `tkl_adc_read_data()` and `tkl_adc_read_single_channel()` are not supported.

## PWM

| Tuya PWM | Tuya Pin | PWM channel |
|---:|---:|---|
| 0 | 28 | PWM0 |
| 1 | 29 | PWM1 |
| 2 | 25 | PWM2 |
| 3 | 20 | PWM3 |
| 4 | 16 | PWM4 |

The SDK supports basic channel control; multi-channel, polarity, and capture interfaces are unsupported.

## I2C

The current SDK does not support I2C master transfers; the relevant APIs return `OPRT_NOT_SUPPORTED`.

## SPI

The current SDK does not support SPI.

## UART

The UART interface pin mapping is not provided.

## I2S

I2S wiring information is not provided.

## References

- [L511C-Y6E hardware reference](https://github.com/tuya/tuyaopen-ide-manifests/blob/main/docs/hardware/l511c-y6e.md)
- [L511C_Y6E SDK source](https://github.com/tuya/TuyaOpen-LYNQ/tree/83069e5b60baf4bedd2bf5e6fd21e81472d13428/tuyaos/tuyaos_adapter/src)
