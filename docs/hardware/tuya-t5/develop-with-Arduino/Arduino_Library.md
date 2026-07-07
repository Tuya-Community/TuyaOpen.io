---
title: Arduino Ecosystem Library Adaptation
description: "Arduino ecosystem library adaptation for TUYA-T5AI boards — adapt an Arduino extension library such as TFT_eSPI for SPI LCD display development."
keywords:
  - arduino library
  - tft_espi
  - t5ai
  - tuyaopen hardware
  - display
---

The Arduino ecosystem offers a rich collection of extension libraries. This guide shows you how to adapt an Arduino extension library for the TUYA-T5AI series development boards, using the TFT_eSPI display library as the worked example.

## Display library: TFT_eSPI

The `TFT_eSPI` library is an Arduino library that drives LCD screens over SPI. It provides a rich set of APIs for controlling the display, including initialization, text rendering, and graphics drawing. `TFT_eSPI` is now adapted for the TUYA-T5AI series, so you can use it for screen display development on these boards.

### Add the library

1. Download the repository: [TFT_eSPI repository](https://github.com/maidang-xing/TFT_eSPI).

2. Copy the repository into the Arduino library directory. Find its location via **Arduino IDE** -> **File** -> **Preferences** -> **Sketchbook location**.

3. Restart the Arduino IDE, open the example `File > Examples > TFT_eSPI > Generic > Gradient_Fill`, select the matching board model, then compile and upload.

#### Hardware information

| Item | Parameter |
| ---- | --------- |
| Development board | TUYA T5AI Series |
| Display | 1.54-inch TFT LCD |
| Driver IC | ST7789 |
| Resolution | 240 × 240 |
| Interface | SPI |
| Pixel format | RGB565 |
| Platform macro | `ARDUINO_TUYA_T5AI_CORE` `ARDUINO_TUYA_T5AI_BOARD` |

**LCD pin definitions:**

| Function | GPIO | Description |
| -------- | ---- | ----------- |
| SPI SCLK | 14 | SPI clock |
| SPI MOSI | 16 | SPI data output |
| SPI MISO | 17 | SPI data input (not used in this case) |
| SPI CS | 15 | SPI chip select |
| DC | 18 | Data/Command select |
| RST | 6 | Screen reset |
| BL | 5 | Backlight control (active HIGH) |

:::note
The LCD driver, screen size, device pin mapping, font, and other configuration details are defined in `User_Setups/Setup_TUYA_T5AI_ST7789.h`. Modify this file to adapt the library to your own requirements.
:::

#### Compile and verify

In the Arduino IDE:

1. Select the board **TUYA-T5AI Series** and connect the hardware correctly.
2. Open any TFT_eSPI example (for example, `File > Examples > TFT_eSPI > Generic > Gradient_Fill`).
3. Click **Verify/Compile**.
4. Confirm the build succeeds (no errors; warnings can be ignored).
5. Click **Upload** to flash the firmware.
