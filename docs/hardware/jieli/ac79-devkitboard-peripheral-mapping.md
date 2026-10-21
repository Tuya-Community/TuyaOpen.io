---
title: AC79_DevKitBoard Peripheral Mapping
description: "AC79_DevKitBoard (AC791 / WL82) peripheral mapping — how its GPIO, ADC, UART, IIC, PWM, TIMER and SPI pins correspond to Tuya TKL software ports, with the current TuyaOpen support state."
keywords:
  - ac79-devkitboard
  - ac791
  - wl82
  - jieli
  - peripheral mapping
  - tuyaopen hardware
  - tkl
---

This document describes the mapping between the AC79_DevKitBoard (AC791 / WL82)
hardware peripherals and the Tuya TKL layer software peripheral ports.

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
`TUYA_GPIO_NUM_E`. So **`PA7` is software pin `7`**; no lookup table is needed.

| Board pin | Vendor macro | Software pin |
| --------- | ------------ | ------------ |
| PA7 | `IO_PORTA_07` | 7 |
| PB1 (K1 button) | `IO_PORTB_01` | 17 |
| PB3 (log TX) | `IO_PORTB_03` | 19 |
| PD7 | `IO_PORTD_07` | 55 |

**ADC channels are a separate namespace**, unrelated to the pin number:
`AD_CH_PB01` is channel 3 while `IO_PORTB_01` is pin 17.

## GPIO

- The chip's GPIO ports are A–H, 16 bits each, numbered 0–127.
- The vendor header also defines `IO_PORTI_00`–`IO_PORTI_15` and derives
  `IO_MAX_NUM` as 144, but `WL82.h` has **no `JL_PORTI` register block** — port I
  has names without an implementation and must not be used.
- Tuya's TKL GPIO numbering stops at `TUYA_GPIO_NUM_MAX` (64), so **only ports
  A–D (pins 0–63) are reachable through TKL**.

| Board pin | Function | Software pin | Software port |
| --------- | -------- | ------------ | ------------- |
| PA0 – PD15 | GPIO | `TUYA_GPIO_NUM_0` – `TUYA_GPIO_NUM_63` | / |

### Interrupts

- **At most two arbitrary-pin external interrupts at once.** The chip has only
  `EVENT_IO_0` and `EVENT_IO_1` as remappable events, each with a single remap
  field.
- The vendor remap table **omits port D and port F**, so those pins cannot be
  used as external interrupts (they still work as plain GPIO).
- Only **rising** and **falling** edges are supported; there is no both-edges or
  level-triggered mode.
- Once a pin is used as an interrupt, the vendor driver sets the pull resistor to
  match the edge, overriding whatever `tkl_gpio_init` requested.

### Electrical modes

- Pull-up / pull-down: fixed 10K, supported.
- Open-drain output: not available on this chip; `tkl_gpio_init` returns
  `OPRT_NOT_SUPPORTED`.

## ADC

- One ADC unit (`TUYA_ADC_NUM_0`), **10 bit**, 3.3 V reference.
- 14 external channels (0–13). The RTC / PMU internal channels (0xe / 0xf) are
  outside the TKL external sampling range.

| Board pin | Function | Software channel | Software port |
| --------- | -------- | ---------------- | ------------- |
| PA7 | ADC ch0 | `ch_0` | `TUYA_ADC_NUM_0` |
| PA8 | ADC ch1 | `ch_1` | `TUYA_ADC_NUM_0` |
| PA10 | ADC ch2 | `ch_2` | `TUYA_ADC_NUM_0` |
| **PB1** | **ADC ch3 (K1 button)** | `ch_3` | `TUYA_ADC_NUM_0` |
| PB6 | ADC ch4 | `ch_4` | `TUYA_ADC_NUM_0` |
| PB7 | ADC ch5 | `ch_5` | `TUYA_ADC_NUM_0` |
| PC0 | ADC ch6 | `ch_6` | `TUYA_ADC_NUM_0` |
| PC1 | ADC ch7 | `ch_7` | `TUYA_ADC_NUM_0` |
| PC9 | ADC ch8 | `ch_8` | `TUYA_ADC_NUM_0` |
| PC10 | ADC ch9 | `ch_9` | `TUYA_ADC_NUM_0` |
| PH0 | ADC ch10 | `ch_10` | `TUYA_ADC_NUM_0` |
| PH3 | ADC ch11 | `ch_11` | `TUYA_ADC_NUM_0` |
| DM | ADC ch12 | `ch_12` | `TUYA_ADC_NUM_0` |
| DP | ADC ch13 | `ch_13` | `TUYA_ADC_NUM_0` |

- The on-board K1 button sits on the **PB1 (ADC channel 3)** resistor ladder, with
  a pressed range of 824–1007 raw.
- Use `tkl_adc_read_single_channel` for one-shot reads; `tkl_adc_read_data`
  returns the registered channels in ascending order.
- Temperature (`tkl_adc_temperature_get`) and `tkl_adc_ioctl` are not
  implemented and return `OPRT_NOT_SUPPORTED`.

## UART

- Three hardware UARTs (UART0/1/2).
- **The log port is SDK UART1 on PB3**, with RX set to `-1` (transmit only).
- **The service port (TAL CLI) is SDK UART0 on PA5 / PA6**, physically separate
  from the log port.
- TKL logical `TUYA_UART_NUM_0` maps to SDK `uart0`; **logical UART1 is not
  supported on this chip** and returns `OPRT_NOT_SUPPORTED`.

| Board pin | Function | Software pin | Software port |
| --------- | -------- | ------------ | ------------- |
| PB3 | UART1_TX (log) | / | / |
| PA5 | UART0_TX (service / CLI) | `TUYA_UART0_TX` | `TUYA_UART_NUM_0` |
| PA6 | UART0_RX (service / CLI) | `TUYA_UART0_RX` | `TUYA_UART_NUM_0` |

- The baud rate comes from `CONFIG_JIELI_UART_LOG_BAUDRATE` /
  `CONFIG_JIELI_UART_LOG_PORT`; the default is 115200.
- **Receive**: this chip's SDK has no "UART interrupt event callback" ioctl, so
  TAL's receive ring cannot be filled from an interrupt. The adapter polls
  `UART_GET_RECV_CNT` from a task every 10 ms, which adds up to one poll period
  of latency.
- TX interrupt, hardware flow control, `tkl_uart_wait_for_data` and
  `tkl_uart_ioctl` are not implemented.

## IIC

- The chip provides hardware IIC and software-emulated IIC devices.
- The vendor `demo_DevKitBoard` board file (`CONFIG_IIC_ENABLE`) declares `iic1`
  as hardware IIC and `iic0` as software IIC, **both on PH0 / PH1**.

| Board pin | Function | Planned software port |
| --------- | -------- | --------------------- |
| PH0 | IIC SCL | `TUYA_I2C_NUM_1` (hardware) |
| PH1 | IIC SDA | `TUYA_I2C_NUM_1` (hardware) |

> **Current state: not registered.** TuyaOpen builds against the `demo_hello`
> board profile, which registers no IIC device, so `tkl_i2c_init` returns
> `OPRT_NOT_SUPPORTED` at run time and `ENABLE_I2C` is left undeclared. Enabling
> it requires registering the device in the board profile with pins confirmed
> against the schematic.
>
> Note that PH0 is also ADC channel 10's pin; confirm before reusing it.

## PWM

- The vendor `demo_DevKitBoard` board file (`CONFIG_PWM_ENABLE`) declares
  `pwm1` on **PH2**, channel `PWM_TIMER2_OPCH2`. The vendor comment states this
  configuration supports **only two PWM channels** (it occupies output channels
  2/3).

> **Current state: not registered**, same as IIC. `ENABLE_PWM` is undeclared.
>
> **Once opened, wl82 supports only a single channel group** (the vendor example
> says "after init, only single-channel selection is supported"), so
> `tkl_pwm_multichannel_start` returns `OPRT_NOT_SUPPORTED` on this chip rather
> than silently configuring only the last channel.

## TIMER

- The TKL timer is built on the vendor's microsecond timer service; it needs **no
  board registration and no pin**.
- Callbacks run in the SDK's timer **task**, not in the interrupt
  (`call_in_irq = 0`), so a callback may safely stop or deinit its own timer. The
  cost is that callback latency is a scheduler tick.
- `tkl_timer_get` returns microseconds elapsed since the timer was started (the
  vendor API has no separate capture register).

## SPI

- Three SPI controllers. The vendor `demo_DevKitBoard` board file registers
  `spi0` / `spi1` / `spi2` using port groups `A` / `B` / `C`.

| Controller | Board port group | Pin set for that group |
| ---------- | ---------------- | ---------------------- |
| spi0 | `A` | CS PD0, DI PD1, DO PD5, CLK PD4, D2 PD2, D3 PD3 |
| spi1 | `B` | DI PB5, DO PB7, CLK PB6 (CS = -1, software driven) |
| spi2 | `C` | DI PH2, DO PH1, CLK PH0 (CS = -1, software driven) |

> **Current state: not registered**, same as IIC. `ENABLE_SPI` is undeclared.
>
> The adapter implements **synchronous** master transfers (8-bit, MSB first).
> Slave mode, interrupt completion callbacks, status queries and ioctl all return
> `OPRT_NOT_SUPPORTED`.

## Resources already in use on this board

Avoid these when adding a peripheral:

| Pin | Use |
| --- | --- |
| PB3 | Log output (SDK UART1 TX) |
| PA5 / PA6 | Service UART / TAL CLI (SDK UART0) |
| PB1 | K1 button (ADC channel 3) |
| PH0 / PH1 | Declared as IIC by the vendor board file (not registered) |
| PH2 | Declared as PWM by the vendor board file (not registered) |

## Current TuyaOpen support state

| Peripheral | TKL implementation | Capability declared | Usable at run time |
| ---------- | ------------------ | ------------------- | ------------------ |
| GPIO (incl. IRQ, pulls) | yes | `ENABLE_GPIO` | yes (0–63, at most two arbitrary-pin interrupts) |
| ADC | yes | `ENABLE_ADC` | yes (ADC0, 10 bit, 14 channels) |
| UART | yes | `ENABLE_UART` | yes (log UART1/PB3, service UART0/PA5-PA6) |
| TIMER | yes | `ENABLE_TIMER` | yes |
| IIC | yes | not declared | **no**: no device registered by the board |
| PWM | yes | not declared | **no**: no device registered by the board |
| SPI | yes | not declared | **no**: no device registered by the board |
| pinmux | no (wl82 has no generic pin-function API) | not declared | no |
