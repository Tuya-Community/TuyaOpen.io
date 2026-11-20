---
title: AC79_DevKitBoard Peripheral Mapping and Development Guide
description: "AC79 / WL82 pin mapping and usage per peripheral: GPIO, UART, IIC, ADC, SPI, PWM, timer, camera and display."
keywords:
  - ac79-devkitboard
  - ac791
  - wl82
  - jieli
  - peripheral mapping
  - pin mapping
  - development guide
  - tkl
---

# AC79_DevKitBoard (AC791 / WL82) peripheral mapping and development guide

AC791 with the WL82 core. Board layer: `boards/JIELI/AC79_DevKitBoard/`. Build profile: `boards/JIELI/config/AC79_DevKitBoard.config`.

Pin numbers are the TKL flat numbers, `16 x port index + bit` (PA0-PA15 = 0-15, ..., PH0-PH15 = 112-127). Whether a pad is bonded out is a board question; the tables list what the TKL checks accept.

Each peripheral below is described in two parts: **mapping** (pins, ports and limits the TKL accepts) and **usage** (what the application calls and what has to be configured first).

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

## How a pin reaches the driver

Peripheral pins have one source: the board Kconfig. The value becomes a `TUYA_BOARD_*` macro at build time and is force-included into the whole build, so the adapter can fill the vendor platform data from it.

1. Set the symbol in `boards/JIELI/AC79_DevKitBoard/Kconfig`:

   ```kconfig
   config JIELI_BOARD_PWM0_PIN
       int "PWM0 (TIMER2 output) pin (flat GPIO number)"
       range 0 127
       default 114
   ```

2. The build stages it: `tools/jieli_build/board_config.py` maps `CONFIG_JIELI_BOARD_PWM0_PIN` to `TUYA_BOARD_PWM0_PIN`, writes it into `tuya_board_periph_config.h` beside the staged vendor board file, and `sdk_overlay.py` adds that header as a forced include. A new symbol needs one more line in the mapping table.

3. The adapter reads the macro where it builds the platform data — for PWM that is `tuyaos/tuyaos_adapter/src/driver/tkl_pwm.c`.

4. Re-configure and rebuild. The staging header is produced during the build, so an incremental build can keep the old pins:

   ```bash
   export JIELI_TOOL_DIR=platform/JIELI/tools/toolchains/<os>/pi32/bin
   tos.py config choice -d -c AC79_DevKitBoard.config
   tos.py build
   ```

5. The application keeps calling `tkl_<periph>_init()`. The pin never appears in application code.

## GPIO

### Mapping

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

### Usage

GPIO needs nothing from the board; pick the flat pin number at run time:

```c
#include "tkl_gpio.h"

#define EXAMPLE_GPIO ((TUYA_GPIO_NUM_E)20) /* PB4 = 16 x 1 + 4 */

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

### Usage

UART0 works as-is. UART1 must be enabled before it exists:

1. In the board Kconfig set `JIELI_BOARD_UART1_ENABLE=y`. The `JIELI_BOARD_UART1_TX_PIN` / `_RX_PIN` symbols describe the fixed PH2/PH3 pair; the block does not move elsewhere.
2. Rebuild with the [pin flow](#how-a-pin-reaches-the-driver).
3. Expect the vendor debug console to stop: opening `uart2` on this SDK ends output on PB3 and does not move it to the new pins. That is why the switch is off by default.
4. The camera modules depend on `!JIELI_BOARD_UART1_ENABLE` — PH2/PH3 are their XCLK and reset pins, and PH2 is also the PWM0 output.

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

## IIC

### Mapping

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

### Usage

The pin pair decides which implementation you get; there is no switch:

| Port | Pins (`JIELI_BOARD_IIC*_PIN`) | Result |
| --- | --- | --- |
| IIC0 | default `0`/`1` (PA0/PA1) | software IIC |
| IIC0 | `112`/`113` (PH0/PH1), chosen automatically when a camera module is selected | software IIC |
| IIC1 | `7`/`8` (PA7/PA8) or `33`/`34` (PC1/PC2) | hardware IIC |
| IIC1 | `148`/`149` (USB DPA/DMA) | hardware IIC, runtime only |
| IIC1 | any other pair | falls back to software IIC |

PH0/PH1 always stay on software IIC because they also carry the camera module's 2-wire bus. The hardware port can additionally be moved at run time, before the first `tkl_i2c_init()`:

```c
#include "tkl_pinmux.h"
#include "tkl_i2c.h"

void example_i2c_move(void)
{
    tkl_io_pinmux_config(7, TUYA_IIC1_SCL);  /* PA7 */
    tkl_io_pinmux_config(8, TUYA_IIC1_SDA);  /* PA8 */
}
```

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

    tkl_i2c_init(TUYA_I2C_NUM_1, &cfg);
    tkl_i2c_master_send(TUYA_I2C_NUM_1, EXAMPLE_I2C_ADDR, cmd, sizeof(cmd), FALSE);
    tkl_i2c_master_receive(TUYA_I2C_NUM_1, EXAMPLE_I2C_ADDR, rx, sizeof(rx), FALSE);
}
```

## ADC

### Mapping

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

### Usage

Single sampling is rejected; configure the pad with `tkl_io_pinmux_config(pin, TUYA_ADC0)` and read the channel above.

```c
#include "tkl_adc.h"
#include "tkl_pinmux.h"

#define EXAMPLE_ADC_PIN ((TUYA_PIN_NAME_E)10) /* PA10 = channel 2 */

void example_adc(void)
{
    TUYA_ADC_BASE_CFG_T cfg = {.ch_list.data = 1u << 2, /* channel 2 = PA10 */
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

### Usage

WL82 SPI is a fixed group table, not a per-pin mux — `tkl_io_pinmux_config()` with a SPI function returns `OPRT_NOT_SUPPORTED` here.

1. Open `tuyaos/tuyaos_adapter/src/driver/tkl_spi.c`.
2. Set the group letter in the matching platform data block:

   ```c
   SPI1_PLATFORM_DATA_BEGIN(s_spi1_pd)
       .clk    = 1000000,
       .mode   = SPI_STD_MODE,
       .port   = 'A',
   SPI1_PLATFORM_DATA_END()
   ```

3. Rebuild. The vendor driver latches the group at `dev_open()`, so the application only calls `tkl_spi_init(TUYA_SPI_NUM_1, &cfg)` before its first transfer.

## PWM

### Mapping

| Channel | Pin | Hardware |
| --- | --- | --- |
| `TUYA_PWM_NUM_0` | PH2 by default (`CONFIG_JIELI_BOARD_PWM0_PIN`) | TIMER2 output channel 2 |

| Item | Value |
| --- | --- |
| Duty | Counts against `cycle`; `cycle == 0` is treated as 10000 |
| Polarity | Positive only |
| Channels | PWM0 only; `TUYA_PWM_NUM_1` to `_3` and multichannel start/stop return `OPRT_NOT_SUPPORTED` |
| Pin change | Compile-time from the board Kconfig; WL82 has no PWM pinmux route |

### Usage

`JIELI_BOARD_PWM0_PIN` defaults to `114` (PH2), which is also the camera XCLK and the TX pin of TKL UART1 — a project picks one of the three. Change the pin with the [pin flow](#how-a-pin-reaches-the-driver), then:

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

## Camera

### Mapping

Two connectors share pads and answer on the same I2C address, so exactly one module can be fitted and built. The sensor is owned by the TDD on both modules; the board only supplies the I2C port, reset pin and clock.

| Connector | Module | Transport | Board geometry default |
| --- | --- | --- | --- |
| J1, 24-pin | GC2145 | DVP | 640 x 480 @ 20 fps |
| J4, 12-pin | GC0310 | SPI | 320 x 240 @ 12 fps |

| Item | J1 / GC2145 | J4 / GC0310 |
| --- | --- | --- |
| I2C port | `TUYA_I2C_NUM_0` on PH0/PH1 (software) | `TUYA_I2C_NUM_1` on PH0/PH1 (software) |
| Reset | PH3, active low | PH3, active low |
| Clock | 24 MHz on PH2 | 24 MHz on PH2 |
| Preview path | `tkl_dvp` centre-crops the 640x480 raster | vendor `spi2` line-IRQ receiver, 1288 B/row |

### Usage

1. Pick the module in the board Kconfig (`JIELI_BOARD_CAMERA_GC2145`, the default, or `_GC0310`). The choice selects `ENABLE_CAMERA` and `ENABLE_DVP` and moves IIC0 to PH0/PH1 for you.
2. `JIELI_BOARD_CAMERA_WIDTH` / `_HEIGHT` / `_FPS` describe the **sensor**, not the preview. `board_com_api.c` registers the matching TDD driver with the I2C port, reset pin and clock.
3. The application only talks to TDL:

   ```c
   TDL_CAMERA_HANDLE_T hdl = tdl_camera_find_dev("camera");
   ```

4. Swapping modules is a power-off operation: both answer on 0x42, and probing the wrong one resets the right one.
5. The sensor tables are written before the transport powers the clock; the platform replays them through the TDD setup hook once `video0`/`spi2` is up (visible in the log as `TDD sensor restart ret=0`).

## Display

### Mapping

| Item | Value |
| --- | --- |
| Panel | ILI9488, 320 x 480, RGB565 |
| Bus | MCU8080, 8 data bits |
| DC / reset | PC9 / PB0 (owned by `tkl_8080.c`) |
| TE | PC0, rising edge |
| Backlight | plain GPIO driven by the vendor panel config |

### Usage

The board registers the panel when `ENABLE_MCU8080` and `ENABLE_DISPLAY` are both on — the `JIELI_AC79_DevKitBoard_dvp_lcd` and `_spi_lcd` profiles set both. Without TE an 8080 write can land mid scan-out and the picture shows a split line that moves with the refresh phase.

```c
TDL_DISP_HANDLE_T disp = tdl_disp_find_dev("display");
tdl_disp_dev_open(disp);
```

## Build

```bash
export JIELI_TOOL_DIR=platform/JIELI/tools/toolchains/<os>/pi32/bin
tos.py config choice -d -c AC79_DevKitBoard.config
tos.py build
```
