# TUYA T5AI Pin Mapping

This document describes the pin definitions and multiplexing mappings of the TUYA_T5AI_BOARD / TUYA_T5AI_CORE development boards, helping developers quickly look up GPIO numbers and peripheral function assignments. The pin definitions of both boards are identical.

## GPIO Overview

The T5AI provides P0 - P55 available pins. The table below lists the Arduino aliases and available multiplexed functions for each pin.

---

## UART Serial

| Port | Signal | Arduino Alias | GPIO |
|:-----|:-----|:------------|:----:|
| UART0 (default serial) | TX | `TX` | 11 |
| UART0 (default serial) | RX | `RX` | 10 |
| UART1 | TX | `TX1` | 0 |
| UART1 | RX | `RX1` | 1 |
| UART2 (default) | TX | `TX2` | 31 |
| UART2 (default) | RX | `RX2` | 30 |
| UART2 | TX | `TX2` | 41 |
| UART2 | RX | `RX2` | 40 |

> `Serial` uses UART0 (GPIO 10/11) by default.

---

## I2C Bus

| Signal | Arduino Alias | GPIO |
|:-----|:------------|:----:|
| SCL | `SCL` | 20 |
| SDA | `SDA` | 21 |

---

## SPI Bus

Default clock frequency: 8 MHz

| Signal | Arduino Alias | GPIO |
|:-----|:------------|:----:|
| SCK | `SCK` | 14 |
| SS (CS) | `SS` | 15 |
| MOSI | `MOSI` | 16 |
| MISO | `MISO` | 17 |

---

## ADC Analog Input

Resolution: 12-bit ｜ Mode: Continuous sampling

| Arduino Alias | GPIO | ADC Channel | Description |
|:------------|:----:|:--------:|:-----|
| `A0` | 25 | CH1 | Recommended analog input |
| `A1` | 24 | CH2 | Recommended analog input |
| `A2` | 23 | CH3 | Recommended analog input |
| `A3` | 28 | CH4 | Recommended analog input |
| `A4` | 22 | CH5 | Recommended analog input |
| `A5` | 21 | CH6 | Shared with I2C SDA |

> A0–A4 are dedicated analog input pins with no multiplexing conflicts — recommended for priority use. A5 serves other functions as well; verify there are no multiplexing conflicts before using it for ADC.

---

## PWM Output

12 PWM channels in total:

| PWM Channel | GPIO | Arduino Alias | Description |
|:--------:|:----:|:------------|:-----|
| PWM0 | 18 | `D0` | — |
| PWM1 | 24 | `A1` / `D1` | Shared with ADC CH2 |
| PWM2 | 32 | `D2` | — |
| PWM3 | 34 | `D3` | — |
| PWM4 | 36 | `D4` | — |
| PWM5 | 19 | `D5` | — |
| PWM6 | 8 | — | — |
| PWM7 | 9 | — | — |
| PWM8 | 25 | `A0` | Shared with ADC CH1 |
| PWM9 | 33 | — | — |
| PWM10 | 35 | — | — |
| PWM11 | 37 | — | — |

> D0–D5 are the recommended PWM output pins.

---

## Analog Pin Aliases (Ax)

| Alias | GPIO | ADC Channel | Note |
|:-----|:----:|:--------:|:-----|
| `A0` | 25 | CH1 | Also usable as PWM8 |
| `A1` | 24 | CH2 | Also usable as PWM1, shared with `D1` |
| `A2` | 23 | CH3 | — |
| `A3` | 28 | CH4 | — |
| `A4` | 22 | CH5 | — |
| `A5` | 21 | CH6 | Shared with I2C SDA |

## Digital Pin Aliases (Dx)

| Alias | GPIO | PWM Channel | Note |
|:-----|:----:|:--------:|:-----|
| `D0` | 18 | PWM0 | — |
| `D1` | 24 | PWM1 | Shares GPIO 24 with `A1` |
| `D2` | 32 | PWM2 | — |
| `D3` | 34 | PWM3 | — |
| `D4` | 36 | PWM4 | — |
| `D5` | 19 | PWM5 | — |

> `A1` and `D1` share GPIO 24 and support both ADC and PWM functions. Avoid enabling both peripherals simultaneously.
