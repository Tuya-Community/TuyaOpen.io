---
title: AC792N_Develop_Board Peripheral Mapping and Development Guide
description: "AC792N / WL83 pin mapping and usage per peripheral: GPIO, UART, IIC, ADC, SPI, PWM, timer and the MIPI panel."
keywords:
  - ac792n-develop-board
  - ac792n
  - ac7926a
  - wl83
  - jieli
  - peripheral mapping
  - pin mapping
  - development guide
  - tkl
  - mipi-dsi
---

# AC792N_Develop_Board (AC792N / WL83) peripheral mapping and development guide

AC792N, AC7926A reference profile on the WL83 core. Board layer: `boards/JIELI/AC792N_Develop_Board/`. Build profile: `boards/JIELI/config/AC792N_Develop_Board.config`.

Pin numbers are the TKL flat numbers, `16 x port index + bit`. WL83 exposes fewer pads than WL82: PC0-PC13, PF0-PF5 and the USB pads only. Whether a pad is bonded out is a board question; the tables list what the TKL checks accept.

Each peripheral below is described in two parts: **mapping** (pins, ports and limits the TKL accepts) and **usage** (what the application calls and what has to be configured first).

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

## How a pin reaches the driver

Peripheral pins have one source: the board Kconfig. The value becomes a `TUYA_BOARD_*` macro at build time and is force-included into the whole build, so the adapter can fill the vendor platform data from it.

1. Set the symbol in `boards/JIELI/AC792N_Develop_Board/Kconfig`:

   ```kconfig
   config JIELI_BOARD_SPI0_CLK_PIN
       int "SPI0 CLK pin (flat GPIO number)"
       range 0 127
       default 35
   ```

2. The build stages it: `tools/jieli_build/board_config.py` maps `CONFIG_JIELI_BOARD_SPI0_CLK_PIN` to `TUYA_BOARD_SPI0_CLK_PIN`, writes it into `tuya_board_periph_config.h` beside the staged vendor board file, and `sdk_overlay.py` adds that header as a forced include. A new symbol needs one more line in the mapping table.

3. The adapter reads the macro where it builds the platform data — for SPI, `tuyaos/tuyaos_adapter/src/driver/tkl_spi.c`.

4. Re-configure and rebuild. The staging header is produced during the build, so an incremental build can keep the old pins:

   ```bash
   export JIELI_TOOL_DIR=platform/JIELI/tools/toolchains/<os>/pi32/bin
   tos.py config choice -d -c AC792N_Develop_Board.config
   tos.py build
   ```

5. The application keeps calling `tkl_<periph>_init()`. The pin never appears in application code.

## GPIO

### Mapping

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

### Usage

GPIO needs nothing from the board; pick the flat pin number at run time:

```c
#include "tkl_gpio.h"

#define EXAMPLE_GPIO ((TUYA_GPIO_NUM_E)44) /* PC12 = 16 x 2 + 12 */

void example_gpio(void)
{
    TUYA_GPIO_BASE_CFG_T cfg = {.mode = TUYA_GPIO_PUSH_PULL,
                                .direct = TUYA_GPIO_OUTPUT,
                                .level = TUYA_GPIO_LEVEL_LOW};

    tkl_gpio_init(EXAMPLE_GPIO, &cfg);
    tkl_gpio_write(EXAMPLE_GPIO, TUYA_GPIO_LEVEL_HIGH);
}
```

## UART

### Mapping

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

### Usage

UART0 is the log port. UART1 is the vendor `uart2` block and is enabled like any other TKL controller:

```c
#include "tkl_uart.h"

void example_uart1(void)
{
    TUYA_UART_BASE_CFG_T cfg = {.baudrate = 115200, .parity = TUYA_UART_PARITY_TYPE_NONE,
                                .databits = TUYA_UART_DATA_LEN_8BIT,
                                .stopbits = TUYA_UART_STOP_LEN_1BIT};

    tkl_uart_init(TUYA_UART_NUM_1, &cfg);
    tkl_uart_write(TUYA_UART_NUM_1, (uint8_t *)"hello\r\n", 7);
}
```

If the port has to leave PB4/PB5, mux both signals before `tkl_uart_init()`:

```c
tkl_io_pinmux_config(new_tx_pin, TUYA_UART1_TX);
tkl_io_pinmux_config(new_rx_pin, TUYA_UART1_RX);
```

## IIC

### Mapping

| TKL port | Implementation | Speed | Default pins |
| --- | --- | --- | --- |
| `TUYA_I2C_NUM_0` | Hardware | 100 kHz, 400 kHz, 1 MHz | PA4 SCL / PA5 SDA |
| `TUYA_I2C_NUM_1` | Hardware | 100 kHz, 400 kHz, 1 MHz | PA6 SCL / PA7 SDA |
| `TUYA_I2C_NUM_2` | Software, bit-banged | Fixed timing, the requested speed is ignored | PA2 SCL / PA3 SDA |

3.4 MHz is rejected. Both hardware ports sit on the pin crossbar, so a run-time request overrides the board default; the software port can only be moved in the board Kconfig. Master only, 7-bit addresses; slave mode and register-address ioctls are not supported.

### Usage

1. Set the pins in the board Kconfig (`JIELI_BOARD_IIC{0,1,2}_{SCL,SDA}_PIN`) if the defaults do not match your wiring.
2. Rebuild with the [pin flow](#how-a-pin-reaches-the-driver).
3. For the hardware ports the pins can also be moved at run time, before the first `tkl_i2c_init()`:

   ```c
   #include "tkl_pinmux.h"

   tkl_io_pinmux_config(4, TUYA_IIC0_SCL);  /* PA4 */
   tkl_io_pinmux_config(5, TUYA_IIC0_SDA);  /* PA5 */
   ```

4. The software port (IIC2) takes its pins from the build-time platform data only — there is no runtime remap for it.

The application call is the same either way:

```c
#include "tkl_i2c.h"

#define EXAMPLE_I2C_ADDR 0x44 /* SHT3x, ADDR pin to GND */

void example_i2c(void)
{
    TUYA_IIC_BASE_CFG_T cfg = {.role = TUYA_IIC_MODE_MASTER,
                               .speed = TUYA_IIC_BUS_SPEED_100K,
                               .addr_width = TUYA_IIC_ADDRESS_7BIT};
    uint8_t cmd[2] = {0xE0, 0x00}; /* SHT3x FETCH_DATA */
    uint8_t rx[6] = {0};

    tkl_i2c_init(TUYA_I2C_NUM_0, &cfg);
    tkl_i2c_master_send(TUYA_I2C_NUM_0, EXAMPLE_I2C_ADDR, cmd, sizeof(cmd), FALSE);
    tkl_i2c_master_receive(TUYA_I2C_NUM_0, EXAMPLE_I2C_ADDR, rx, sizeof(rx), FALSE);
}
```

## ADC

### Mapping

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

### Usage

The pad has to be muxed to the converter before the first read:

```c
#include "tkl_adc.h"
#include "tkl_pinmux.h"

#define EXAMPLE_ADC_PIN ((TUYA_PIN_NAME_E)68) /* PE4 = 16 x 4 + 4 */

void example_adc(void)
{
    TUYA_ADC_BASE_CFG_T cfg = {.ch_list.data = 1u << 7, /* channel 7 = PE4 */
                               .ch_nums = 1, .width = 10,
                               .type = TUYA_ADC_EXTERNAL_SAMPLE_VOL,
                               .mode = TUYA_ADC_CONTINUOUS, .conv_cnt = 1};
    int32_t mv = 0;

    tkl_io_pinmux_config(EXAMPLE_ADC_PIN, TUYA_ADC0);
    tkl_adc_init(TUYA_ADC_NUM_0, &cfg);
    tkl_adc_read_voltage(TUYA_ADC_NUM_0, &mv, 1);
}
```

## SPI

### Mapping

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

### Usage

WL83 accepts per-pin SPI requests. The request is recorded and handed to the vendor driver by `tkl_spi_init()`, which means the order matters: pinmux first, init second, transfer third.

```c
#include "tkl_pinmux.h"
#include "tkl_spi.h"

void example_spi_move(void)
{
    tkl_io_pinmux_config(35, TUYA_SPI0_CLK);   /* PB3  */
    tkl_io_pinmux_config(36, TUYA_SPI0_MOSI);  /* PB4  */
    tkl_io_pinmux_config(37, TUYA_SPI0_MISO);  /* PB5  */

    TUYA_SPI_BASE_CFG_T cfg = {.role = TUYA_SPI_ROLE_MASTER, .mode = TUYA_SPI_MODE0,
                               .freq_hz = 1000000, .databits = TUYA_SPI_DATA_BIT8};
    tkl_spi_init(TUYA_SPI_NUM_0, &cfg);
}
```

Without a pinmux call, the port uses the pins the board Kconfig staged (`JIELI_BOARD_SPI0_*_PIN` and so on). A pin that already belongs to another SPI port, or an open port whose pins were latched, is rejected.

## PWM

### Mapping

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

### Usage

Each channel drives a complementary pair, `JIELI_BOARD_PWM{n}_H_PIN` and `_L_PIN` (defaults for channel 0: `24`/`25` = PB8/PB9). Both pins belong to the channel; there is no single-pin output.

1. Set both pins in the board Kconfig.
2. Rebuild with the [pin flow](#how-a-pin-reaches-the-driver). The complementary pair is fixed at build time — WL83 does not remap PWM at run time.
3. Use the channel from the application:

   ```c
   #include "tkl_pwm.h"

   void example_pwm(void)
   {
       TUYA_PWM_BASE_CFG_T cfg = {
           .duty = 5000, .cycle = 10000, .frequency = 1000,
           .polarity = TUYA_PWM_POSITIVE};

       tkl_pwm_init(TUYA_PWM_NUM_0, &cfg);
       tkl_pwm_start(TUYA_PWM_NUM_0);
       tkl_pwm_duty_set(TUYA_PWM_NUM_0, 2500); /* 25 % */
   }
   ```

## TIMER

### Mapping

| TKL timer | `TUYA_TIMER_NUM_0` - `TUYA_TIMER_NUM_5` |
| --- | --- |
| Hardware | Shared SDK microsecond timer service, not six independent timers |
| Concurrency | One active timer; a second start returns `OPRT_RESOURCE_NOT_READY` |
| Callback | Runs in the SDK timer task, not an ISR |
| Unit | Microseconds; one-shot and periodic |

### Usage

No pin and no board symbol; call `tkl_timer_init()` / `tkl_timer_start()` directly.

## Display

### Mapping

| Item | Value |
| --- | --- |
| Panel | MIPI-DSI, ST7701S, 480 x 800 |
| Reset / backlight | PB0 / PB1 |
| Enabling | The board definition selects `ENABLE_DISPLAY` and `ENABLE_MIPI_DSI`; the panel parameters live in `JIELI_BOARD_DISPLAY_PANEL` / `_RESET_IO` / `_BACKLIGHT_IO` |

### Usage

The display stack is part of the board rather than an application choice — nothing to configure before use:

```c
TDL_DISP_HANDLE_T disp = tdl_disp_find_dev("display");
tdl_disp_dev_open(disp);
```

## Camera

TKL DVP is WL82-only; the WL83 adapter does not register a camera device. A camera on a WL83 board needs its own TKL implementation first.

## Build

```bash
export JIELI_TOOL_DIR=platform/JIELI/tools/toolchains/<os>/pi32/bin
tos.py config choice -d -c AC792N_Develop_Board.config
tos.py build
```
