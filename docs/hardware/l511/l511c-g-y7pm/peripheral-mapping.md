---
title: L511C/G-Y7PM Peripheral Mapping
description: Pin multiplexing and TuyaOpen SDK support status for L511C/G-Y7PM.
---

# L511C/G-Y7PM Peripheral Mapping

Applies to L511C-Y7PM and L511G-Y7PM. The TKL GPIO API takes the module Tuya Pin number, not a SoC GPIO number. This table covers ordinary GPIO API support only. If a pin is not registered, `tkl_gpio_init` returns `OPRT_COM_ERROR`. Hardware-reference GPIO “OK” results cover output only and do not establish input, interrupt, wakeup, or multiplexed-function support.

## GPIO

Module I/O defaults to **1.8 V**. Switch to 3.3 V only when the SDK for the specific model supports it and has been configured accordingly; confirm signal levels, common ground, and the applicable board schematic before wiring. Status below is based on the C/G SDK `pinMap`, `get_pinmap`, and `tkl_gpio_init`; it does not claim device validation. “Registered” means a mapping exists and init does not reject it in a special branch; “Not exposed” means it is absent from the mapping; “Dedicated/conditional” means it has a dedicated use or init restriction. An ordinary GPIO pin marked not exposed may still be multiplexed by a separate I2C/SPI driver.

| Tuya Pin | Default/multiplexed function | C ordinary GPIO | G ordinary GPIO | Notes |
|---:|---|---|---|---|
| 5 | GPIO1 | Registered | Registered | Init configures a wakeup pad. |
| 6 | GPIO2 | Registered | Registered | Init configures a wakeup pad. |
| 16 | NET_STATUS | Registered | Registered | Occupied by the network status indicator. |
| 19 | MAIN_DTR | Registered | Registered | Init configures a wakeup pad. |
| 20 | MAIN_RI | Registered | Registered |  |
| 21 | MAIN_DCD | Registered | Registered |  |
| 22 | MAIN_CTS | Registered | Registered |  |
| 25 | STATUS | Registered | Registered |  |
| 26 | I2S_MCLK | Registered | Registered |  |
| 28 | AUX_RXD | Registered | Registered |  |
| 29 | AUX_TXD | Registered | Registered |  |
| 30 | PCM_CLK | Registered | Registered |  |
| 31 | PCM_SYNC | Registered | Registered |  |
| 32 | PCM_DIN | Registered | Registered | Interrupt anomaly noted in the old reference. |
| 33 | PCM_DOUT | Registered | Registered |  |
| 49 | LCD_RST | Registered | Registered |  |
| 50 | LCD_SPI_OUT | Registered | Registered |  |
| 51 | LCD_SPI_RS | Registered | Registered |  |
| 52 | LCD_SPI_CS | Registered | Registered |  |
| 53 | LCD_SPI_CLK | Registered | Registered |  |
| 54 | CAM_MCLK | Registered | Registered |  |
| 55 | CAM_SPI_DATA0 | Registered | Registered |  |
| 56 | CAM_SPI_DATA1 | Registered | Registered |  |
| 57 | CAM_I2C_SCL | Registered | Registered |  |
| 58 | CAM_I2C_SDA | Registered | Registered | Interrupt anomaly noted in the old reference. |
| 62 | USIM2_CLK | Not exposed | Not exposed |  |
| 63 | USIM2_RST | Not exposed | Not exposed |  |
| 64 | USIM2_DATA | Not exposed | Not exposed |  |
| 66 | I2C1_SDA | Registered | Not exposed | C source notes IRQ abnormal despite output registration. |
| 67 | I2C1_SCL | Registered | Not exposed | C source notes IRQ abnormal despite output registration. |
| 78 | LCD_TE | Registered | Not exposed |  |
| 79 | USIM1_DET | Dedicated/conditional | Dedicated/conditional | Both SDKs return `OPRT_NOT_SUPPORTED` from `tkl_gpio_init`; SIM-detect/wakeup use, subject to platform conditions. |
| 80 | CAM_SPI_CLK | Registered | Registered |  |
| 81 | CAM_PWDN | Registered | Registered |  |
| 82 | USB_BOOT | Registered | Registered | USB boot function. |
| 100 | GPIO3 | Not exposed | Registered | May be occupied on versions with built-in GNSS, per hardware reference. |
| 101 | GPIO4 | Registered | Not exposed |  |
| 103 | CAM_RST_N | Registered | Not exposed |  |

## ADC

The current C/G-Y7PM SDK adapter accepts `port_num` 0 and 1 (`ADC_CHN_MAX=2`), corresponding to SDK ADC0 and ADC1. `tkl_adc_read_voltage()` has a read implementation, while `tkl_adc_read_data()` and `tkl_adc_read_single_channel()` return `OPRT_NOT_SUPPORTED`. The older hardware table labels Tuya ADC 1→ADC0 and 2→ADC1, which conflicts with current software port numbering. It also lists ADC_BAT without confirming its port/API. Use SDK application ports 0/1 and validate on the target platform.

## PWM

| Tuya PWM | Tuya Pin | PWM channel in hardware reference |
|---:|---:|---|
| 0 | 22 | PWM0 |
| 1 | 23 | PWM1 |
| 2 | 54 | PWM2 |
| 3 | 25 | PWM3 |
| 4 | 20 | PWM4 |

PWM ports map to the module pins as follows; these pins are multiplexed with other functions. Check the selected C/G model pinmux and supported API before use.

## I2C

Current default routing in the C/G-Y7PM SDK `tkl_i2c.c`:

| SDK I2C port | SCL | SDA | Status |
|---:|---:|---:|---|
| I2C0 | Tuya Pin 57 | Tuya Pin 58 | SDK default; old reference notes interrupt anomaly on Pin 58 |
| I2C1 | Tuya Pin 67 | Tuya Pin 66 | SDK default; SDA=66, SCL=67 |

The older hardware reference also lists Pin 38/39→I2C0, Pin 57/58→I2C1, and Pin 80/81→I2C1. These are historical candidates, **not current SDK defaults and must not be treated as available mappings**. C/G source implements master initialization, send, and receive; IRQ and slave interfaces are unsupported. Verify module breakout and board occupancy against the actual schematic/configuration.

## SPI

The older reference lists candidate multiplexing: SPI0 CS=66, MOSI=67, MISO=28, CLK=29; SPI1 CLK=49, MISO=62, MOSI=63, CS=64. These conflict with I2C, AUX UART, LCD, USIM, and other functions. Check each C/G board configuration; SDK SPI source does not prove these candidate pins work on hardware. The old external Flash capacity recommendation does not replace the installed component specification.

## UART

The hardware reference marks UART0, UART1, and USB UART (Tuya UART 3) OK, and UART2 as pending verification, but does not provide complete Tuya Pin routing for the first three. Pins 28/29 are named AUX_RXD/AUX_TXD, which alone does not establish their TKL UART port mapping. Check the exact model pinmux/configuration before wiring. GPIO output validation does not establish UART, input, or interrupt behavior.

## I2S

The hardware reference lists candidate PCM/I2S pins: Pin 30 PCM_CLK, 31 PCM_SYNC, 32 PCM_DIN, 33 PCM_DOUT, and 26 I2S_MCLK, and mentions an ES8311 module. Pin 32 also has an interrupt anomaly note. Audio adapter source and reference notes do not prove the codec, clocks, pins, or audio path on a particular module. Verify the circuit and model configuration.

## References

- [L511C/G-Y7PM hardware reference (manifest main)](https://github.com/tuya/tuyaopen-ide-manifests/blob/main/docs/hardware/l511c-g-y7pm.md)
- [L511C-Y7PM SDK source](https://github.com/tuya/TuyaOpen-LYNQ/tree/8034a0198880850ca9e579b2f254b592c3132327/tuyaos/tuyaos_adapter/src)
- [L511G-Y7PM SDK source](https://github.com/tuya/TuyaOpen-LYNQ/tree/d7ccde744e87659d8dd11bcaa7b246c5b9f856cf/tuyaos/tuyaos_adapter/src)
