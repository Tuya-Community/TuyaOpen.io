# Arduino Ecosystem Library Adaptation

Arduino offers an extremely rich collection of extension libraries, allowing everyone to quickly bring their ideas to life with the help of these libraries. This example demonstrates how to adapt Arduino extension libraries for the TUYA-T5AI series development boards.

## Display Library: TFT_eSPI

The TFT_eSPI library is an Arduino library for driving LCD screens via SPI. It provides a rich set of APIs for controlling screen display, including initialization, text rendering, and graphics drawing. The TFT_eSPI library has now been adapted, enabling developers to easily use it for screen display development on TUYA-T5AI series development boards.

### Adding the Library

1. Download the repository: [TFT_eSPI Repository](https://github.com/maidang-xing/TFT_eSPI)
   
2. Copy the repository to the Arduino library directory. The directory location can be found via `Arduino IDE` -> `File` -> `Preferences` -> `Sketchbook location`.
   
3. Restart Arduino IDE, open the example `File > Examples > TFT_eSPI > Generic > Gradient_Fill`, select the corresponding board model, then compile and upload.

#### Hardware Information

| Item | Parameter |
| ---- | --------- |
| Development Board | TUYA T5AI Series |
| Display | 1.54-inch TFT LCD |
| Driver IC | ST7789 |
| Resolution | 240 × 240 |
| Interface | SPI |
| Pixel Format | RGB565 |
| Platform Macro | `ARDUINO_TUYA_T5AI_CORE` `ARDUINO_TUYA_T5AI_BOARD` |

**LCD Pin Definitions:**

| Function | GPIO | Description |
| -------- | ---- | ----------- |
| SPI SCLK | 14 | SPI clock |
| SPI MOSI | 16 | SPI data output |
| SPI MISO | 17 | SPI data input (not used in this case) |
| SPI CS | 15 | SPI chip select |
| DC | 18 | Data/Command select |
| RST | 6 | Screen reset |
| BL | 5 | Backlight control (active HIGH) |

> LCD screen driver, screen size, device pin mapping, font, and other configuration details are defined in the `User_Setups/Setup_TUYA_T5AI_ST7789.h` file. Developers can also modify this file to adapt to their specific requirements.

#### Compile and Verify

In the Arduino IDE:

1. Select the board: **TUYA-T5AI Series**, and connect the hardware correctly.
2. Open any TFT_eSPI example (e.g., `File > Examples > TFT_eSPI > Generic > Gradient_Fill`)
3. Click **Verify/Compile**
4. Confirm successful compilation (no errors; warnings can be ignored)
5. Click Upload to flash the firmware

---
