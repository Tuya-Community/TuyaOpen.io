---
title: AC792N_Develop_Board Peripheral Mapping
description: "AC792N_Develop_Board (AC792N / WL83) peripheral mapping — how its GPIO, ADC, UART, IIC, PWM, TIMER, SPI and MIPI-DSI pins correspond to Tuya TKL software ports, with the current TuyaOpen support state."
keywords:
  - ac792n-develop-board
  - ac792n
  - ac7926a
  - wl83
  - jieli
  - peripheral mapping
  - tuyaopen hardware
  - tkl
---

This document describes the mapping between the AC792N_Develop_Board
(AC792N / WL83) hardware peripherals and the Tuya TKL layer software peripheral
ports.

> The pin data here comes from the vendor SDK's board files and headers, **not
> from a schematic**. No schematic ships with the repository, so whether a pin is
> bonded out on the package, and whether the board already uses it for something
> else, still has to be confirmed against the version-matched schematic. Items
> marked "not registered" or "unverified" are not usable capabilities.

## Pin naming and numbering

JieLi names a pin `IO_PORT<port letter>_<number>`, and **that name is already a
number**:

```c
#define IO_GROUP_NUM  16
#define IO_PORTA_07   (IO_GROUP_NUM * 0 + 7)    /* = 7  */
#define IO_PORTD_07   (IO_GROUP_NUM * 3 + 7)    /* = 55 */
```

Port A occupies 0–15, B 16–31, and so on — the same flat layout as Tuya's
`TUYA_GPIO_NUM_E`. So **`PA7` is software pin `7`**.

**ADC channels are a separate namespace**: `ADC_IO_CH_PD00` is channel 0, which
is not the same numbering as the GPIO pin PD0.

## GPIO

- Port widths are **not uniform** (from the masks in `asm/gpio.h`):

  | Port | Width | Pin range |
  | ---- | ----- | --------- |
  | A | 16 | 0–15 |
  | B | 16 | 16–31 |
  | C | **14** | 32–45 (PC14 / PC15 do not exist) |
  | D | 16 | 48–63 |
  | E | 16 | 64–79 |
  | F | **6** | 80–85 |
  | FUSB | 2 | 96 (DPA), 97 (DMA) |
  | HUSB | 2 | 112 (DPB), 113 (DMB) |

  So 46, 47, 86–95 and 98–111 are not valid pins; R (128/129) and V (144/145)
  sit above `IO_MAX_NUM` and are outside this numbering.
- Tuya's TKL GPIO numbering stops at `TUYA_GPIO_NUM_MAX` (64), so **only ports
  A–D (pins 0–63) are reachable through TKL**.

| Board pin | Function | Software pin | Software port |
| --------- | -------- | ------------ | ------------- |
| PA0 – PD15 | GPIO | `TUYA_GPIO_NUM_0` – `TUYA_GPIO_NUM_63` | / |

### Interrupts

- This chip has a real **per-pin external interrupt** (`exti_init`); the number
  of pins is not limited by an event table.
- Only **rising** and **falling** edges are supported; there is no both-edges or
  level-triggered mode.
- The TKL upper bound still applies: interrupts can only be registered for pins
  0–63.

### Electrical modes

- Pull-up / pull-down: only the 10K tap is available (the vendor header marks
  100K / 1M as unsupported on this part).
- Open-drain output: not available; `tkl_gpio_init` returns
  `OPRT_NOT_SUPPORTED`.

## ADC

- One ADC unit (`TUYA_ADC_NUM_0`), **10 bit**, 3.3 V reference.
- 16 external analog channels:

| Board pin | Software channel | Software port |
| --------- | ---------------- | ------------- |
| **PD0** | `ch_0` (**K1 button**) | `TUYA_ADC_NUM_0` |
| PD1 | `ch_1` | `TUYA_ADC_NUM_0` |
| PD6 | `ch_2` | `TUYA_ADC_NUM_0` |
| PD7 | `ch_3` | `TUYA_ADC_NUM_0` |
| PD8 | `ch_4` | `TUYA_ADC_NUM_0` |
| PD9 | `ch_5` | `TUYA_ADC_NUM_0` |
| PD10 | `ch_6` | `TUYA_ADC_NUM_0` |
| PE4 | `ch_7` | `TUYA_ADC_NUM_0` |
| PE5 | `ch_8` | `TUYA_ADC_NUM_0` |
| PE6 | `ch_9` | `TUYA_ADC_NUM_0` |
| PE7 | `ch_10` | `TUYA_ADC_NUM_0` |
| PE8 | `ch_11` | `TUYA_ADC_NUM_0` |
| PE9 | `ch_12` | `TUYA_ADC_NUM_0` |
| PC13 | `ch_13` | `TUYA_ADC_NUM_0` |
| DP | `ch_14` | `TUYA_ADC_NUM_0` |
| DM | `ch_15` | `TUYA_ADC_NUM_0` |

- The on-board K1 button sits on the **PD0 (ADC channel 0)** resistor ladder,
  with a pressed range of 0–96 raw.
- PD1 is also the log UART TX pin, so PD0/PD1 should not be repurposed as plain
  GPIO.
- Temperature and `tkl_adc_ioctl` are not implemented and return
  `OPRT_NOT_SUPPORTED`.

## UART

- The log port is **SDK UART0: TX = PD1, RX = PE11**.
- **This board has no separate service UART** (`JIELI_BOARD_HAS_SERVICE_UART =
  n`), so **TAL CLI and logging share the same `uart0`** — console output and CLI
  input go through one physical port.
- The baud rate comes from `CONFIG_JIELI_UART_LOG_BAUDRATE`; the default is
  **115200** (the vendor header's 1000000 is rewritten during staging).
- TKL logical `TUYA_UART_NUM_0` maps to SDK `uart0`; logical `TUYA_UART_NUM_1`
  maps to SDK `uart2`, but **`uart2` is not registered by the current board
  profile** (`TCFG_UART2_ENABLE` is only defined under
  `USE_UART_DEVICE_TEST_DEMO`), so logical UART1 is unavailable at run time.

| Board pin | Function | Software pin | Software port |
| --------- | -------- | ------------ | ------------- |
| PD1 | UART0_TX (log + CLI) | `TUYA_UART0_TX` | `TUYA_UART_NUM_0` |
| PE11 | UART0_RX (log + CLI) | `TUYA_UART0_RX` | `TUYA_UART_NUM_0` |

- **PE11 = 75, which is outside the TKL GPIO range 0–63**, so it can only be
  configured on the vendor side and is not reachable through `tkl_gpio_*`.
- Receive is driven by the vendor's interrupt event callback: the ISR only posts
  a semaphore and a task performs `dev_read`.
- TX interrupt, hardware flow control, `tkl_uart_wait_for_data` and
  `tkl_uart_ioctl` are not implemented.

## IIC

- The chip provides hardware IIC and software-emulated IIC. The vendor
  `demo_hello` board file defines three buses, **all behind
  `USE_IIC_TEST_DEMO`, which is off**:

| Device | Type | Board pins |
| ------ | ---- | ---------- |
| `iic0` | hardware IIC | SCL PA4, SDA PA5 |
| `iic1` | hardware IIC | SCL PA6, SDA PA7 |
| `iic2` | software IIC | SCL PA6, SDA PA7 |

> **Current state: not registered**, so `tkl_i2c_init` returns
> `OPRT_NOT_SUPPORTED` at run time and `ENABLE_I2C` is undeclared. Enabling it
> requires registering the device in the board profile with pins confirmed
> against the schematic.

## PWM

- The vendor board file defines `pwm1`, **behind `USE_PWM_TEST_DEMO`, which is
  off**:
  - timer-PWM remap pin: PA4 (TIMER2)
  - MCPWM channels: all `-1` (unused)
- This chip supports **multi-channel** PWM (each channel's pin is fixed in the
  board's remap table).

> **Current state: not registered**; `ENABLE_PWM` is undeclared.

## TIMER

- The TKL timer is built on the vendor's microsecond timer service; it needs **no
  board registration and no pin**.
- Callbacks run in the SDK's timer **task**, not in the interrupt
  (`call_in_irq = 0`), so a callback may safely stop or deinit its own timer. The
  cost is that callback latency is a scheduler tick.
- `tkl_timer_get` returns microseconds elapsed since the timer was started.

## SPI

- Three SPI controllers. The vendor board file defines `spi1` / `spi2`, **both
  behind their `USE_SPI_*_TEST_DEMO` switch, which is off**.
- `spi1` (master example): CLK PA4, DO PA5, DI PA6, CS `-1` (software driven).

> **Current state: not registered**; `ENABLE_SPI` is undeclared.
>
> The adapter implements **synchronous** master transfers (8-bit, MSB first).
> Slave mode, interrupt completion callbacks, status queries and ioctl all return
> `OPRT_NOT_SUPPORTED`.

## MIPI-DSI display

- The board carries a MIPI-DSI panel, model `MIPI_480x800_ST7701S`.
- Board control pins: reset `PB0`, backlight `PB1` (from the board facts).
- This path is used by the display TDD and **does not go through the GPIO/SPI TKL
  interfaces**.

## Resources already in use on this board

Avoid these when adding a peripheral:

| Pin | Use |
| --- | --- |
| PD1 | Log output (SDK UART0 TX) |
| PE11 | Log / CLI input (SDK UART0 RX) |
| PD0 | K1 button (ADC channel 0) |
| PB0 | Display reset |
| PB1 | Display backlight |
| PA4 / PA5 / PA6 / PA7 | Declared as IIC / PWM / SPI in vendor examples (not registered, not checked against a schematic) |

## Current TuyaOpen support state

| Peripheral | TKL implementation | Capability declared | Usable at run time |
| ---------- | ------------------ | ------------------- | ------------------ |
| GPIO (incl. IRQ, pulls) | yes | `ENABLE_GPIO` | yes (0–63; PC14/PC15 do not exist) |
| ADC | yes | `ENABLE_ADC` | yes (ADC0, 10 bit, 16 channels) |
| UART | yes | `ENABLE_UART` | yes (logical UART0 = uart0, PD1 / PE11; logical UART1 not registered) |
| TIMER | yes | `ENABLE_TIMER` | yes |
| IIC | yes | not declared | **no**: no device registered by the board |
| PWM | yes | not declared | **no**: no device registered by the board |
| SPI | yes | not declared | **no**: no device registered by the board |
| MIPI-DSI | yes (this chip only) | declared through board display facts | yes (not exposed through TKL peripheral APIs) |
| pinmux | yes (this chip only) | not declared | implemented but undeclared: `ENABLE_PINMUX` has no chip dimension, so declaring it would misrepresent wl82 |
