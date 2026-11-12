---
title: AC792N_Develop_Board Peripheral Mapping
description: "AC792N / WL83 fixed board pins, GPIO numbering and TKL-to-SDK peripheral mappings."
keywords:
  - ac792n-develop-board
  - ac792n
  - ac7926a
  - wl83
  - jieli
  - peripheral mapping
  - pin mapping
  - tuyaopen hardware
  - tkl
  - mipi-dsi
---

# AC792N_Develop_Board (AC792N / WL83) peripheral mapping

Pin numbers are the TKL flat numbers, `16 x port index + bit`. WL83 exposes fewer pads than WL82: PC0-PC13, PF0-PF5 and the USB pads only. Whether a pad is bonded out is a board question; the tables list what the TKL checks accept.

## Board pins fixed at build time

| Pin | Function | Defined in |
| --- | --- | --- |
| PD1 / PE11 | Log UART0 TX / RX, 115200 8N1 | `CONFIG_JIELI_BOARD_LOG_UART_PORT=0`; TX pin symbol keeps the vendor PD1 |
| HUSB DPB / DMB | USB device: mass storage and optional CDC-ACM | `CONFIG_JIELI_BOARD_USB_ROLE=host` -> `TCFG_HUSB_DEVICE` |
| PB0 / PB1 | MIPI-DSI reset / backlight (ST7701S 480x800) | `CONFIG_JIELI_BOARD_DISPLAY_RESET_IO` / `_BACKLIGHT_IO` |
| PC7 / PC6 / PC9 | MIC1 ADC0 P / N, bias MICBIASA | `audio_config.h` |
| PC11 / PC12 / PC10 | MIC2 ADC1 P / N, bias MICBIASB; the channel actually captured | `audio_config.h` |
| PE15 | Audio PA mute, mute value low, 300 ms release delay | `audio_config.h` |
| PD0 | Button K1, ADC0 channel 0, pressed range 0-96 | `board_com_api.c` |

Both microphones are configured, but the capture path maps ADC1 (MIC2) only. Opening both at once fails in the vendor ADC driver.

Log sink: `CONFIG_ENABLE_JIELI_USB_CDC_LOG` (default `n`) switches `tkl_log_output()` from the UART to USB CDC-ACM; the COM port appears a few seconds after boot. Baud rate comes from `CONFIG_JIELI_UART_LOG_BAUDRATE` (default 115200).

## GPIO

| Port | TKL numbers |
| --- | --- |
| PA0-PA15 | `TUYA_GPIO_NUM_0` - `TUYA_GPIO_NUM_15` |
| PB0-PB15 | 16 - 31 |
| PC0-PC13 | 32 - 45 (PC14 / PC15 do not exist) |
| PD0-PD15 | 48 - 63 |
| PE0-PE15 | 64 - 79 |
| PF0-PF5 | 80 - 85 (PF6-PF15 do not exist) |
| FUSB DPA / DMA | 96 / 97 |
| HUSB DPB / DMB | 112 / 113 |

| Feature | Support |
| --- | --- |
| Input, output | Yes; output is push-pull only |
| Pull-up / pull-down | 10 kOhm, either leg |
| Open-drain | No (`OPRT_NOT_SUPPORTED`) |
| Interrupt | Rising or falling edge only; one EXTI per pin, a pin without EXTI capability returns `OPRT_NOT_SUPPORTED` |

Ports G and any number above 127 are rejected by the adapter.

## UART

| TKL port | SDK port | Pins |
| --- | --- | --- |
| `TUYA_UART_NUM_0` | `uart0` | PD1 TX / PE11 RX (log console) |
| `TUYA_UART_NUM_1` | `uart2` | PB4 TX / PB5 RX |

| Item | Value |
| --- | --- |
| Framing | 8 data bits, 1 stop bit, no parity, no flow control |
| Baud rate | Any non-zero value |
| Receive | Interrupt driven: the SDK RX event wakes a task that runs the TAL callback; 1 KB ring buffer |
| Pin change | Per-pin: one `tkl_io_pinmux_config()` call per pin, flat pin numbers; requests are re-applied after the port opens |
| Log pins | Set in the staged vendor board, not through the pinmux API |

## IIC

| TKL port | Implementation | Speed | Default pins |
| --- | --- | --- | --- |
| `TUYA_I2C_NUM_0` | Hardware | 100 kHz, 400 kHz, 1 MHz | PA4 SCL / PA5 SDA |
| `TUYA_I2C_NUM_1` | Hardware | 100 kHz, 400 kHz, 1 MHz | PA6 SCL / PA7 SDA |
| `TUYA_I2C_NUM_2` | Software, bit-banged | Fixed timing, the requested speed is ignored | PA2 SCL / PA3 SDA |

3.4 MHz is rejected. Both hardware ports sit on the pin crossbar, so a run-time request overrides the board default; the software port can only be moved in the board Kconfig. Master only, 7-bit addresses; slave mode and register-address ioctls are not supported.

## ADC

ADC0, 10-bit, reference 3300 mV, scan or continuous sampling, at most 8 channels per request.

| Channel | Pin | SDK enum |
| --- | --- | --- |
| 0 | PD0 | `ADC_IO_CH_PD00` |
| 1 | PD1 | `ADC_IO_CH_PD01` |
| 2 | PD6 | `ADC_IO_CH_PD06` |
| 3 | PD7 | `ADC_IO_CH_PD07` |
| 4 | PD8 | `ADC_IO_CH_PD08` |
| 5 | PD9 | `ADC_IO_CH_PD09` |
| 6 | PD10 | `ADC_IO_CH_PD10` |
| 7 | PE4 | `ADC_IO_CH_PE04` |
| 8 | PE5 | `ADC_IO_CH_PE05` |
| 9 | PE6 | `ADC_IO_CH_PE06` |
| 10 | PE7 | `ADC_IO_CH_PE07` |
| 11 | PE8 | `ADC_IO_CH_PE08` |
| 12 | PE9 | `ADC_IO_CH_PE09` |
| 13 | PC13 | `ADC_IO_CH_PC13` |
| 14 | FUSB DPA | `ADC_IO_CH_DP` |
| 15 | HUSB DPB | `ADC_IO_CH_DM` |

Single sampling is rejected. `ch_nums` must equal the number of bits set in `ch_list`.

## SPI

| Controller | CLK | DO (MOSI) | DI (MISO) |
| --- | --- | --- | --- |
| SPI0 | PC3 | PC4 | PC5 |
| SPI1 | PC0 | PC1 | PC2 |
| SPI2 | PD2 | PD3 | PD4 |

| Item | Value |
| --- | --- |
| Mode | Master, 8-bit, mode 0 |
| Rate | Set at init through `IOCTL_SPI_SET_BAUDRATE`; any non-zero value |
| Bit order | MSB first; `TUYA_SPI_ORDER_LSB2MSB` is done in software |
| Chip select | Caller-driven GPIO; no controller CS and no CS argument in TKL |
| Pinmux | Per-pin `tkl_io_pinmux_config()` works only before that port is opened (`OPRT_COM_ERROR` afterwards) |

## PWM

| Channel | H pin | L pin |
| --- | --- | --- |
| `TUYA_PWM_NUM_0` | PB8 | PB9 |
| `TUYA_PWM_NUM_1` | PA8 | PA10 |
| `TUYA_PWM_NUM_2` | PB10 | PB11 |
| `TUYA_PWM_NUM_3` | PB12 | PB13 |

| Item | Value |
| --- | --- |
| Hardware | MCPWM, one complementary H / L pair per TKL channel |
| Duty | Counts against `cycle`; `cycle == 0` is treated as 10000 |
| Polarity | Positive and negative |
| Channel setup | Channel 1 is muxed when the device opens; channels 0, 2 and 3 are added at run time through `IOCTL_PWM_SET_ADD_CHANNEL` |
| Pin change | Board Kconfig only; no PWM route through the pinmux API |

## TIMER

| TKL timer | `TUYA_TIMER_NUM_0` - `TUYA_TIMER_NUM_5` |
| --- | --- |
| Hardware | Shared SDK microsecond timer service, not six independent timers |
| Concurrency | One active timer; a second start returns `OPRT_RESOURCE_NOT_READY` |
| Callback | Runs in the SDK timer task, not an ISR |
| Unit | Microseconds; one-shot and periodic |
