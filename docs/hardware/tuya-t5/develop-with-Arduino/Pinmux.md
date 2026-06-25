# TUYA T5AI Pin Mapping

This document describes the pin definitions and multiplexing mappings of the TUYA_T5AI_BOARD / TUYA_T5AI_CORE development boards, helping developers quickly look up GPIO numbers and peripheral function assignments. The pin definitions of both boards are identical.

## GPIO Overview

The T5AI provides P0 - P55 available pins. The table below lists the Arduino aliases and available multiplexed functions for each pin.

---

## UART Serial

| Port | Signal | Arduino Alias | T5 Hardware Pin |
|:-----|:-----|:------------|:----:|
| UART0 (default serial) | TX | `TX` | P11 |
| UART0 (default serial) | RX | `RX` | P10 |
| UART1 | TX | `TX1` | P0 |
| UART1 | RX | `RX1` | P1 |
| UART2 (default) | TX | `TX2` | P31 |
| UART2 (default) | RX | `RX2` | P30 |
| UART2 | TX | `TX2` | P41 |
| UART2 | RX | `RX2` | P40 |

> `Serial` uses UART0 (P10/P11) by default.

---

## I2C Bus

| Signal | Arduino Alias | T5 Hardware Pin |
|:-----|:------------|:----:|
| SCL | `SCL` | P20 |
| SDA | `SDA` | P21 |

---

## SPI Bus

Default clock frequency: 8 MHz

| Signal | Arduino Alias | T5 Hardware Pin |
|:-----|:------------|:----:|
| SCK | `SCK` | P14 |
| SS (CS) | `SS` | P15 |
| MOSI | `MOSI` | P16 |
| MISO | `MISO` | P17 |

---

## ADC Analog Input

Resolution: 12-bit ｜ Mode: Continuous sampling

| Arduino Alias | T5 Hardware Pin | ADC Channel | Description |
|:------------|:----:|:--------:|:-----|
| `A0` | P25 | CH1 | Recommended analog input |
| `A1` | P24 | CH2 | Recommended analog input |
| `A2` | P23 | CH3 | Recommended analog input |
| `A3` | P28 | CH4 | Recommended analog input |
| `A4` | P22 | CH5 | Recommended analog input |
| `A5` | P21 | CH6 | Shared with I2C SDA |

> A0–A4 are dedicated analog input pins with no multiplexing conflicts — recommended for priority use. A5 serves other functions as well; verify there are no multiplexing conflicts before using it for ADC.

---

## PWM Output

12 PWM channels in total:

| PWM Channel | T5 Hardware Pin | Arduino Alias | Description |
|:--------:|:----:|:------------|:-----|
| PWM0 | P18 | `D0` | — |
| PWM1 | P24 | `A1` / `D1` | Shared with ADC CH2 |
| PWM2 | P32 | `D2` | — |
| PWM3 | P34 | `D3` | — |
| PWM4 | P36 | `D4` | — |
| PWM5 | P19 | `D5` | — |
| PWM6 | P8 | — | — |
| PWM7 | P9 | — | — |
| PWM8 | P25 | `A0` | Shared with ADC CH1 |
| PWM9 | P33 | — | — |
| PWM10 | P35 | — | — |
| PWM11 | P37 | — | — |

> D0–D5 are the recommended PWM output pins.

---

## Analog Pin Aliases (Ax)

| Alias | T5 Hardware Pin | ADC Channel | Note |
|:-----|:----:|:--------:|:-----|
| `A0` | P25 | CH1 | Also usable as PWM8 |
| `A1` | P24 | CH2 | Also usable as PWM1, shared with `D1` |
| `A2` | P23 | CH3 | — |
| `A3` | P28 | CH4 | — |
| `A4` | P22 | CH5 | — |
| `A5` | P21 | CH6 | Shared with I2C SDA |

## Digital Pin Aliases (Dx)

| Alias | T5 Hardware Pin | PWM Channel | Note |
|:-----|:----:|:--------:|:-----|
| `D0` | P18 | PWM0 | — |
| `D1` | P24 | PWM1 | Shares P24 with `A1` |
| `D2` | P32 | PWM2 | — |
| `D3` | P34 | PWM3 | — |
| `D4` | P36 | PWM4 | — |
| `D5` | P19 | PWM5 | — |

> `A1` and `D1` share P24 and support both ADC and PWM functions. Avoid enabling both peripherals simultaneously.
