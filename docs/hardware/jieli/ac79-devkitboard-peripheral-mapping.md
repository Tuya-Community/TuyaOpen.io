---
title: AC79_DevKitBoard Peripheral Mapping
description: "AC79 / WL82 fixed board pins, GPIO numbering and TKL-to-SDK peripheral mappings."
keywords:
  - ac79-devkitboard
  - ac791
  - wl82
  - jieli
  - peripheral mapping
  - pin mapping
  - tuyaopen hardware
  - tkl
---

# AC79_DevKitBoard (AC791 / WL82) peripheral mapping

Pin numbers are the TKL flat numbers, `16 x port index + bit` (PA0-PA15 = 0-15, ..., PH0-PH15 = 112-127). Whether a pad is bonded out is a board question; the tables list what the TKL checks accept.

## Board pins fixed at build time

| Pin | Function | Defined in |
| --- | --- | --- |
| PB3 | Log UART1 TX, 115200 8N1 (RX not used) | `CONFIG_JIELI_BOARD_LOG_UART_TX_PIN` |
| PA5 / PA6 | Service UART0 TX / RX, TAL CLI | `CONFIG_JIELI_BOARD_SERVICE_UART_TX_PIN` / `_RX_PIN` |
| USB DPA / DMA | USB device: mass storage and optional CDC-ACM | `CONFIG_JIELI_BOARD_USB_ROLE=device` |
| PC9 / PB0 | Panel DC / panel reset (ILI9488 320x480, MCU8080) | hard-coded in `tkl_8080.c`, no Kconfig symbol |
| PB2 | Audio PA mute, active low, 200 ms release delay | `audio_config.h` |
| PB1 | Button K1, ADC0 channel 3, pressed range 824-1007 | `board_com_api.c` |
| - | Microphone `LADC_CH_MIC1_P_N`, DAC channel 0x05 | `audio_config.h` |

Log sink: `CONFIG_ENABLE_JIELI_USB_CDC_LOG` (default `n`) switches `tkl_log_output()` from `vprintf()` on PB3 to USB CDC-ACM; the COM port appears a few seconds after boot, so early boot output is lost. Baud rate comes from `CONFIG_JIELI_UART_LOG_BAUDRATE` (default 115200).

## GPIO

| Port | TKL numbers |
| --- | --- |
| PA0-PA15 | `TUYA_GPIO_NUM_0` - `TUYA_GPIO_NUM_15` |
| PB0-PB15 | 16 - 31 |
| PC0-PC15 | 32 - 47 |
| PD0-PD15 | 48 - 63 |
| PE0-PE15 | 64 - 79 |
| PF0-PF15 | 80 - 95 |
| PG0-PG15 | 96 - 111 |
| PH0-PH15 | 112 - 127 |

| Feature | Support |
| --- | --- |
| Input, output | Yes; output is push-pull only |
| Pull-up / pull-down | 10 kOhm, either leg |
| Open-drain | No (`OPRT_NOT_SUPPORTED`) |
| Interrupt | Rising or falling edge only; at most 2 pins at a time, and only pins the vendor remap table lists |

Ports PI, PR and the USB pads are outside 0-127 and are rejected by the adapter.

## UART

| TKL port | SDK port | Pins |
| --- | --- | --- |
| `TUYA_UART_NUM_0` | `uart0` | One of the four groups below |
| `TUYA_UART_NUM_1` | `uart2` | PH2 TX / PH3 RX, fixed |

| UART0 group | TX | RX |
| --- | --- | --- |
| 0 (default for the service UART) | PA5 | PA6 |
| 1 | PB1 | PB2 |
| 2 | PA3 | PA4 |
| 3 | PH0 | PH1 |

| Item | Value |
| --- | --- |
| Framing | 8 data bits, 1 stop bit, no parity, no flow control |
| Baud rate | UART0 from the TKL config; UART1 fixed at 115200 |
| Receive | Polled every 10 ms by a task (WL82 has no RX IRQ event), 1 KB ring buffer |
| UART1 opt-in | `CONFIG_JIELI_BOARD_UART1_ENABLE` (default `n`); any pin pair other than PH2/PH3 fails the build |
| UART0 pin change | Both pins of one group in separate `tkl_io_pinmux_config()` calls; mixed groups or a single pin return `OPRT_NOT_SUPPORTED` |

Opening UART1 stops the vendor debug console on PB3, and PH2 is also the PWM0 output, so a project uses one or the other.

## IIC

| TKL port | Implementation | Speed |
| --- | --- | --- |
| `TUYA_I2C_NUM_0` | Software, bit-banged | Fixed timing, the requested speed is ignored |
| `TUYA_I2C_NUM_1` | Hardware | 400 kHz only |

| IIC1 group | SCL | SDA |
| --- | --- | --- |
| 0 | USB DPA | USB DMA |
| 1 (default) | PA7 | PA8 |
| 2 | PC1 | PC2 |
| 3 | PH0 | PH1 |

IIC0 pins are PA0 SCL / PA1 SDA by default and can only be changed in the board Kconfig. Both ports are master only, 7-bit addresses; slave mode and register-address ioctls are not supported.

## ADC

ADC0, 10-bit, reference 3300 mV, scan or continuous sampling, at most 10 channels per request.

| Channel | Pin | SDK enum |
| --- | --- | --- |
| 0 | PA7 | `AD_CH_PA07` |
| 1 | PA8 | `AD_CH_PA08` |
| 2 | PA10 | `AD_CH_PA10` |
| 3 | PB1 | `AD_CH_PB01` |
| 4 | PB6 | `AD_CH_PB06` |
| 5 | PB7 | `AD_CH_PB07` |
| 6 | PC0 | `AD_CH_PC00` |
| 7 | PC1 | `AD_CH_PC01` |
| 8 | PC9 | `AD_CH_PC09` |
| 9 | PC10 | `AD_CH_PC10` |
| 10 | PH0 | `AD_CH_PH00` |
| 11 | PH3 | `AD_CH_PH03` |
| 12 | USB DMA | `AD_CH_DM` |
| 13 | USB DPA | `AD_CH_DP` |

Single sampling is rejected; configure the pad with `tkl_io_pinmux_config(pin, TUYA_ADC0)` and read the channel above.

## SPI

| Controller | Group | CLK | DO (MOSI) | DI (MISO) | Adapter |
| --- | --- | --- | --- | --- | --- |
| SPI0 | A | PD4 | PD5 | PD1 | Rejected |
| SPI0 | B (default) | PC3 | PC4 | PC0 | Selectable |
| SPI1 | A | PB6 | PB7 | PB5 | Selectable |
| SPI1 | B (default) | PC9 | PC10 | PC8 | Selectable |
| SPI2 | A (default) | PH0 | PH1 | PH2 | Selectable |
| SPI2 | B | USB DPA | USB DMA | PG15 | Rejected |
| SPI2 | C | PA3 | PA4 | PA2 | Selectable |

| Item | Value |
| --- | --- |
| Mode | Master, 8-bit, mode 0 |
| Rate | Fixed at 1 MHz; other rates return `OPRT_NOT_SUPPORTED` |
| Bit order | MSB first; `TUYA_SPI_ORDER_LSB2MSB` is done in software |
| Chip select | Caller-driven GPIO; the controller has no CS register and TKL has no CS argument |
| Pinmux | Per-pin `tkl_io_pinmux_config(pin, TUYA_SPIn_*)` is rejected; the group comes from the platform data `.port` letter (`jieli_wl82_spi_pinmux_select()`) and is applied when the controller opens |

## PWM

| Channel | Pin | Hardware |
| --- | --- | --- |
| `TUYA_PWM_NUM_0` | PH2 by default (`CONFIG_JIELI_BOARD_PWM0_PIN`) | TIMER2 output channel 2 |

| Item | Value |
| --- | --- |
| Duty | Counts against `cycle`; `cycle == 0` is treated as 10000 |
| Polarity | Positive only |
| Channels | PWM0 only; `TUYA_PWM_NUM_1` to `_3` and multichannel start/stop return `OPRT_NOT_SUPPORTED` |
| Pin change | Compile-time from the board Kconfig; WL82 has no PWM pinmux route |

## TIMER

| TKL timer | `TUYA_TIMER_NUM_0` - `TUYA_TIMER_NUM_5` |
| --- | --- |
| Hardware | Shared SDK microsecond timer service, not six independent timers |
| Concurrency | One active timer; a second start returns `OPRT_RESOURCE_NOT_READY` |
| Callback | Runs in the SDK timer task, not an ISR |
| Unit | Microseconds; one-shot and periodic |
