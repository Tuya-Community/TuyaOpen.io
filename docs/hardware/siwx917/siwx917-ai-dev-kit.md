---
id: siwx917-ai-dev-kit
title: "SiWx917 AI Dev Kit"
description: "The SEKORM SK_SIWG917_AI_MB AI dev kit: a voice-and-display interaction board based on the SiWG917M111 module, with an ST7789 display, analog microphone and speaker, a chat button, and RGB LEDs — plus breakout header pinouts and pin mapping."
keywords:
  - SIWX917_AI_DEV_KIT
  - SK_SIWG917_AI_MB
  - SiWx917
  - SEKORM
  - TuyaOpen hardware
---

The SiWx917 AI dev kit (`SIWX917_AI_DEV_KIT`, SEKORM part `SK_SIWG917_AI_MB`) is a voice-and-display interaction board built around the SiWG917M111 module. It carries an ST7789 SPI display, an analog microphone and speaker (no external codec), a chat button, and RGB LEDs — a ready carrier for AI Agent applications such as `your_chat_bot`.

![SK_SIWG917_AI_MB AI dev kit](/img/hardware/siwx917/siwx917-ai-dev-kit.png)

## Software build configuration

The board configuration file defines the configuration parameters for peripheral drivers, pin mapping, the BSP package, and third-party libraries. Building with the kit's preconfigured board file saves most of the hardware adaptation effort.

:::tip Want to develop new peripherals?
**Config notes:**
- **To add peripherals, write the drivers at the application layer.** BSP drivers mainly serve the peripherals fixed on the board.
- Peripheral needs differ between applications; adjust the Config file accordingly.
- Different applications may need different third-party library parameters.
- **Recommended:** treat the initial configuration file as the **board base template** and extend it for your own development.
:::

To enable a Config, see [CLI - tos.py tools - config choice](/docs/tos-tools/tos-guide#config-choice).

<table class="hw-config-flag-table">
  <tbody>
    <tr>
      <th>Build flag</th>
      <td><code>SIWX917.config</code></td>
      <td>SiWx917 AI dev kit board config - <a href="https://github.com/tuya/TuyaOpen/blob/master/boards/SIWX917/config/SIWX917.config">config file</a></td>
    </tr>
    <tr>
      <th>App config</th>
      <td><code>SIWX917_AI_DEV_KIT.config</code></td>
      <td>your_chat_bot example config - <a href="https://github.com/tuya/TuyaOpen/blob/master/apps/tuya.ai/your_chat_bot/config/SIWX917_AI_DEV_KIT.config">config file</a></td>
    </tr>
    <tr>
      <th>BSP sources</th>
      <td colspan="2"><a href="https://github.com/tuya/TuyaOpen/tree/master/boards/SIWX917/SIWX917_AI_DEV_KIT">SiWx917 AI dev kit BSP sources</a></td>
    </tr>
  </tbody>
</table>

Select this board:

```bash
tos.py config choice -c SIWX917
```

## Hardware overview

The kit is designed around voice and display interaction: the SiWG917M111 module provides the dual-core Wi-Fi 6 + BLE radio and 8 MB of in-package PSRAM; application code runs on the Cortex-M4, and audio goes straight to the on-chip I2S with no external codec. Flashing works through an external J-Link (SWD) or the ISP UART, and logs leave on the ULP UART.

## Kit highlights

- SiWG917M111 module (Wi-Fi 6 2.4 GHz + Bluetooth LE)
- ARM Cortex-M4 @ 180 MHz
- 8 MB flash + 8 MB in-package PSRAM
- ST7789 320×240 SPI display (RGB565)
- Analog microphone + speaker (on-chip I2S, no external codec)
- Chat button SW1 and buttons SW2/SW3
- RGB LED
- J-Link (SWD) or ISP UART flashing; ULP UART logs

## Detailed specifications

| Feature | Specification |
|---------|---------------|
| On-board module | SiWG917M111MGTBA |
| CPU | ARM Cortex-M4 @ 180 MHz |
| Wireless | Wi-Fi 6 (802.11ax, 2.4 GHz) + Bluetooth LE |
| Flash | 8 MB |
| PSRAM | 8 MB in-package (hosts `.text`/`.bss`/FreeRTOS heap) |
| Display | ST7789 320×240 SPI, RGB565 |
| Audio | Analog microphone + speaker, no external codec (on-chip I2S) |
| Interaction | Chat button SW1, buttons SW2/SW3, RGB LED |
| Flash/debug | J-Link (SWD) or ISP UART; logs on the ULP UART |

## Pin definitions

### Breakout headers (H2 / H3 / H4 / DEBUG)

The kit routes module signals to four headers (pin numbers per the schematic):

| Header | Format | Purpose |
|--------|--------|---------|
| H2 | 1×18 | Module header: debug port (SWDIO/SWO/SWCLK/TDI), ISP UART (GPIO_8/9), ULP GPIOs |
| H3 | 1×14 | Expansion header: ULP/UULP GPIOs, POC_IN reset, GPIO_15/25/27/29/30, VMCU/GND |
| H4 | 1×18 | HP GPIO expansion header: GPIO_46-51, GPIO_10-12, GPIO_26/28 |
| DEBUG (H5) | 2×5 | Debug header: J-Link (SWD) flashing and the ULP log UART |

#### H2 module header (1×18)

| Pin | Signal | Pin | Signal |
|-----|--------|-----|--------|
| 1 | GND | 10 | ULP_GP11 (log TX) |
| 2 | NC | 11 | ULP_GP7 |
| 3 | NC | 12 | GPIO_8 (ISP RX) |
| 4 | NC | 13 | GPIO_7 |
| 5 | UULP_GP0 | 14 | GPIO_9 (ISP TX) |
| 6 | SWDIO | 15 | GPIO_6 |
| 7 | SWO | 16 | ULP_GP6 |
| 8 | SWCLK | 17 | ULP_GP10 |
| 9 | DBG_TDI | 18 | ULP_GP9 |

#### H3 expansion header (1×14)

| Pin | Signal | Pin | Signal |
|-----|--------|-----|--------|
| 1 | ULP_GP1 | 8 | GPIO_15 |
| 2 | UULP_GP3 | 9 | GPIO_30 |
| 3 | UULP_GP2 | 10 | GPIO_27 |
| 4 | POC_IN (hardware reset) | 11 | VMCU |
| 5 | UULP_GP1 | 12 | GND |
| 6 | ULP_GP8 | 13 | GPIO_29 |
| 7 | ULP_GP2 | 14 | GPIO_25 |

#### H4 HP GPIO expansion header (1×18)

| Pin | Signal | Pin | Signal |
|-----|--------|-----|--------|
| 1 | GND | 10 | NC |
| 2 | GPIO_48 | 11 | NC |
| 3 | GPIO_47 | 12 | NC |
| 4 | GPIO_49 | 13 | NC |
| 5 | GPIO_50 | 14 | GPIO_12 |
| 6 | GPIO_51 | 15 | GPIO_11 |
| 7 | GPIO_46 | 16 | GPIO_10 |
| 8 | NC | 17 | GPIO_26 |
| 9 | NC | 18 | GPIO_28 |

#### DEBUG header H5 (2×5, top view)

| Left column | | Right column | |
|-------------|---|--------------|---|
| 10 GND | | 9 GND | |
| 8 DBG_TDI | | 7 ULP_GP11 (log TX) | |
| 6 SWO | | 5 ULP_GP9 (log RX) | |
| 4 SWCLK | | 3 POC_IN (reset) | |
| 2 SWDIO | | 1 VMCU | |

Wiring diagrams for J-Link flashing, ISP serial flashing, and the log UART are in the [Quick Start](siwx917-quick-start#5-flash-the-firmware).

### Board-level pins (application-visible)

From [`SIWX917_AI_DEV_KIT/Kconfig`](https://github.com/tuya/TuyaOpen/blob/master/boards/SIWX917/SIWX917_AI_DEV_KIT/Kconfig) and `siwx917_ai_board.c`.

| Function | Kconfig | TUYA GPIO | Chip pad | Registered name |
|----------|---------|-----------|----------|-----------------|
| Button 1 (chat) | `BOARD_SW1_PIN` | 49 | HP 49 | `ai_chat_button` |
| Button 2 | `BOARD_SW2_PIN` | 2 | UULP 2 | `SW2` |
| Button 3 | `BOARD_SW3_PIN` | 3 | UULP 3 | `SW3` |
| LED R | `BOARD_LEDR_PIN` | 50 | HP 50 | `LEDR` |
| LED G | `BOARD_LEDG_PIN` | 51 | HP 51 | — (reused as display CS placeholder) |
| LED B | `BOARD_LEDB_PIN` | 15 | HP 15 | `LEDB` |

Buttons use `LEVEL_LOW` + `PULLUP` + `TIMER_SCAN_MODE`; LEDs use `LEVEL_LOW` + `PUSH_PULL`.

#### Display

| Signal | TUYA GPIO | Notes |
|--------|-----------|-------|
| SPI port | `TUYA_SPI_NUM_3` | = GSPI_MASTER, 40 MHz |
| DC | 29 | |
| RST | 26 | |
| CS | 28 | driven automatically by GSPI hardware |
| Backlight | 30 | GPIO backlight, active high |
| Resolution | | 320×240 RGB565 |

#### Audio (I2S0)

| Signal | Chip pad | Use |
|--------|----------|-----|
| SCLK | HP 46 | |
| WSCLK | HP 47 | |
| DIN0 | HP 48 | microphone input |
| DOUT0 | HP 11 | speaker output |

#### GPIO number conversion

TUYA GPIO numbers map to chip pads through `SI91X_PIN_MAPPING` in `tkl_gpio.c`: UULP_VBAT and HP domains keep their numbers (0–4 / 6–12, 15, 25–34, 46–57); the ULP domain maps TUYA 20–24 → pads 0–4 and TUYA 35–41 → pads 5–11. For example, the log UART's ULP 11 = TUYA GPIO 41.

:::note[GPIO 8/16 reserved]
`TUYA_GPIO_NUM_8` and `TUYA_GPIO_NUM_16` are used for vcom; do not use them as regular GPIOs in applications.
:::

## Downloads

### SiWx917 AI dev kit

- [SK_SiWx917_AI_MB schematic V1.1 (PDF)](/docs/hardware/siwx917/SK_SiWx917_AI_MB_Schematic_V1.1.pdf): complete circuit diagram of the dev kit.
- [SK_SIWG917_AI_MB purchase (SEKORM)](https://www.sekorm.com/product/603942256.html): purchase channel and product details.

### SiWx917 chip documentation (Silicon Labs)

- [SiWx917 documentation](https://docs.silabs.com/): official entry point for chip, SDK, and tooling docs.
- [WiSeConnect SDK repository (GitHub)](https://github.com/SiliconLabs/wiseconnect): host drivers and TA firmware notes.

## Related docs / demos

- [SiWx917 Quick Start — setup + flashing + provisioning](siwx917-quick-start)
- [your_chat_bot demo](/docs/cloud/device-ai/demo-your-chat-bot)
- [SiWx917 Overview](overview-siwx917)
- [BRD2605A Dev Kit](brd2605a)
