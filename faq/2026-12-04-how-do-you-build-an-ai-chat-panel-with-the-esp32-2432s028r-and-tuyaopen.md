# How Do You Build an AI Chat Panel with the ESP32-2432S028R and TuyaOpen?


The ESP32-2432S028R, better known as the Cheap Yellow Display or CYD, is a 2.8-inch 240×320 ESP32 board with a resistive touch panel, a microSD slot, an RGB LED, and a few exposed GPIOs. It is popular because it bundles a display, touch, Wi-Fi, and an ESP32-WROOM module on one PCB for a low price. It is also a frustrating board to support blindly, because the same model number ships with different display controllers, different USB connectors, and different pin behaviour. The [CYD community repository](https://github.com/witnessmenow/ESP32-Cheap-Yellow-Display) is a useful starting point for revision notes, and the [ESP32 datasheet](https://documentation.espressif.com/esp32_datasheet_en.html) and [hardware design guidelines](https://docs.espressif.com/projects/esp-hardware-design-guidelines/en/latest/esp32/schematic-checklist.html) cover the chip and board-level constraints underneath. For the graphics layer, the [LVGL documentation](https://docs.lvgl.io/) and the [TFT_eSPI library](https://github.com/Bodmer/TFT_eSPI) explain the two ecosystems most CYD examples use.

![ESP32-2432S028R and TuyaOpen](https://images.tuyacn.com/rms-static/8b38fc60-ea10-11f1-ad92-c1e753125120-1795749220134.webp?tyName=02-esp32-2432s028r-cyd-tuyaopen-insert-2.webp)

TuyaOpen is not a drop-in CYD firmware. The display component already supports ILI9341 and ST7789 over SPI, which covers the two common CYD panels, but the touch driver list is shorter: FT5x06 is supported, while the CYD's XPT2046 resistive controller is not in the standard list. The base ESP32 board configurations also do not describe the CYD's shared pins and second SPI bus. The practical path is a small board support package: use TuyaOpen's [display driver](https://tuyaopen.ai/docs/peripheral/display), add a touch driver for the XPT2046, and describe the panel and pins in a new board configuration. The [new ESP32 board guide](https://tuyaopen.ai/docs/hardware/espressif/esp32-new-board) and the [LVGL application guide](https://tuyaopen.ai/docs/peripheral/tutorials/lvgl-application-guide) are the reference pages for that work.

This guide walks through the port and then builds a text-based AI chat panel on top of it. The CYD has no microphone and no audio codec, so voice input is not part of the base project; a touch keyboard and a cloud agent are the realistic interaction model. If voice is the requirement, a T5-AI or ESP32-S3 board with I2S audio is a better fit. The [chat bot demo](https://tuyaopen.ai/docs/cloud/device-ai/demo-your-chat-bot), [TuyaOpen IDE](https://tuyaopen.ai/tuyaopen-ide), and [quick start](https://tuyaopen.ai/docs/quick-start) are useful alongside this article.

![How to Build an AI Chat Panel with the ESP32-2432S028R and TuyaOpen](https://images.tuyacn.com/rms-static/8b37c3e0-ea10-11f1-b94a-e98384376412-1795749220126.webp?tyName=02-esp32-2432s028r-cyd-tuyaopen-insert-3.webp)

## Know which CYD you have

The CYD is a family, not a single SKU. The original board uses an ILI9341 display controller, a micro-USB connector, and an XPT2046 resistive touch controller. Later batches, including some dual-USB boards, ship with an ST7789 or ILI9342 panel and may invert colours. The display and touch share the same model number but not always the same driver settings. If a known-good sketch shows a white screen, inverted colours, or a shifted image, the first suspect is the panel controller, not the code.

| Variant | USB | Display controller | Typical driver setting |
|---|---|---|---|
| Original CYD | Micro-USB | ILI9341 | ILI9341, no inversion |
| CYD v2 | USB-C | ILI9341 | ILI9341, sometimes inversion on |
| Dual-USB CYD | Micro-USB + USB-C | ST7789 or ILI9342 by batch | ST7789/ILI9342, check inversion and colour order |

The safest identification method is to read the display controller ID at boot or to compare a known test pattern against the vendor's documentation. Do not trust the product listing alone. The CYD repository documents several revisions and the settings that work with each; the board's silkscreen and the number of USB ports are useful clues, but the controller ID is the decisive one.

![ESP32-2432S028R Details](https://images.tuyacn.com/rms-static/8b379cd0-ea10-11f1-b94a-e98384376412-1795749220125.webp?tyName=02-esp32-2432s028r-cyd-tuyaopen-insert-1.webp)

### Pin map

The CYD uses two separate SPI buses: one for the display and one for touch. Espressif's [SPI master driver documentation](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/peripherals/spi_master.html) is the reference for bus configuration and DMA behaviour. That design avoids some conflicts but creates others, especially when code assumes both devices share a bus.

| Function | GPIO | Notes |
|---|---|---|
| TFT MOSI | 13 | Display SPI (HSPI) |
| TFT MISO | 12 | Optional; can conflict with touch if misconfigured |
| TFT SCLK | 14 | Display SPI |
| TFT CS | 15 | Display chip select |
| TFT DC | 2 | Data/command |
| TFT RST | Not connected | Tied to board reset |
| Backlight | 21 | Active high; PWM dimming possible |
| Touch CLK | 25 | XPT2046, separate SPI |
| Touch MOSI | 32 | XPT2046 |
| Touch MISO | 39 | Input-only GPIO |
| Touch CS | 33 | XPT2046 |
| Touch IRQ | 36 | Input-only GPIO |
| RGB LED | 4, 16, 17 | Active low |
| LDR | 34 | Analog input only |
| Speaker amp | 26 | DAC output; no microphone |
| SD card | 5, 18, 19, 23 | VSPI; shares pins with other functions |
| Free GPIOs | 22, 27, 35 | GPIO35 is input-only |

The practical consequence is that the CYD has very little expansion room. The display, touch, SD card, RGB LED, light sensor, and speaker amplifier consume most of the useful pins. If your project needs an I2S microphone, a second sensor bus, or a lot of buttons, the CYD may not be the right board. It is well suited to a display-first controller and poorly suited to a voice-first device.

Power is another common source of confusion. The board expects 5 V over USB and uses an onboard regulator for 3.3 V. Some dual-USB revisions have USB-C connectors without the CC resistors that a USB-C-to-USB-C cable expects, so the board may not power from a USB-C charger. Use a USB-A-to-USB-C cable or the micro-USB port when in doubt. Flicker, random resets, and Wi-Fi dropouts often trace back to the cable or supply rather than the firmware.

## What TuyaOpen provides, and what you must add

TuyaOpen's display layer provides a unified registration and frame-buffer model, with SPI drivers for ILI9341 and ST7789. That covers the CYD panel once the pins, orientation, colour order, and inversion are set correctly. The [display driver documentation](https://tuyaopen.ai/docs/peripheral/display) explains the `tdl_display`/`tdd_display` split, the Kconfig switches, and the frame-buffer API. On ESP32, LVGL is integrated through the ESP-IDF LVGL component rather than TuyaOpen's generic LVGL port, so the board support package has to provide the panel and touch input to LVGL; the [ESP32 platform overview](https://tuyaopen.ai/docs/hardware/espressif/overview-esp32) explains that boundary.

Touch is the gap. The standard TuyaOpen touch list includes FT5x06, not XPT2046. You have two options: write a small XPT2046 driver that reads the touch controller over its own SPI bus and feeds coordinates into LVGL, or use a CYD variant with a supported capacitive controller if one exists. The first option is more work but keeps the common CYD hardware. The driver itself is not complex: assert CS, send the control byte, read the 12-bit X/Y values, apply calibration, and map the result to the display orientation.

A board support package also needs to describe the board to Kconfig: chip target, display enable, touch enable, backlight pin, and any audio or LED peripherals. The `tos.py new board` command creates the template. A minimal CYD configuration would select the ESP32 platform, the ILI9341 or ST7789 display driver, and the custom touch driver, then expose the display initialization functions that LVGL expects. Keep the pin definitions in a board header rather than scattering magic numbers through the application.

## Display bring-up

Start with a solid colour test before adding LVGL; the [display driver guide](https://tuyaopen.ai/docs/peripheral/tutorials/display-driver-guide) covers registration and refresh behaviour in more detail. A display that shows red, green, and blue fills correctly is ready for text; a display that shows a white screen or wrong colours needs a driver or inversion change first.

1. Set the SPI host and pins to the CYD's display bus (SCLK 14, MOSI 13, MISO 12, CS 15, DC 2).
2. Set the panel controller to ILI9341 or ST7789 to match your board.
3. Set the orientation. The CYD panel is physically 240×320; landscape is a rotation, not a different panel.
4. Set colour order and inversion. If red and blue are swapped, change the RGB/BGR order; if the image looks like a photographic negative, toggle inversion.
5. Set the backlight pin (GPIO21) and confirm that PWM dimming works.
6. Draw a test pattern with known geometry: a border, a centre cross, and colour bars.

Only after the test pattern is correct should you add LVGL. The CYD has no PSRAM on the common N4 variants, so a full-screen 240×320 RGB565 framebuffer costs about 150 KB, which is a large share of the ESP32's SRAM. Use a smaller draw buffer and partial refresh. A 40–60 pixel high buffer is often enough for a chat UI, and it leaves memory for Wi-Fi, TLS, and the application. If you try to animate a full-screen scene with a large buffer, you will spend the rest of the project chasing memory failures.

SPI frequency is a trade-off. The panel and the wiring may tolerate 40 MHz, sometimes more, but a long ribbon cable or a clone panel may not. Start at a conservative frequency, confirm stability, and increase it only after the UI is correct. The same rule applies to the touch bus: a stable 1–2 MHz read is better than a marginal 4 MHz read that occasionally returns garbage.

## Touch bring-up

The XPT2046 is a resistive controller. It measures pressure and position, not capacitance, and it needs calibration. The CYD wires it to a separate SPI bus, so the driver must use the correct pins and chip select, not the display's.

A workable sequence:

1. Initialize the touch SPI bus at a modest clock.
2. Read the 12-bit X and Y values, plus the pressure or Z value if available.
3. Apply calibration constants for your panel. Resistive panels vary; a calibration that works on one CYD may be off on another.
4. Map the raw coordinates to the display's current rotation. If you rotate the display, rotate the touch coordinates too.
5. Add debounce and a small movement threshold so a finger resting on the panel does not generate a stream of taps.
6. Feed the coordinates and pressed state into LVGL as a pointer input.

Test with a crosshair that follows the touch point, then with buttons at the four corners, then with a small on-screen keyboard. The keyboard is the real test: if adjacent keys are hard to hit, the calibration or the coordinate mapping is wrong. Resistive panels also require a firmer press than capacitive screens; design the UI with larger touch targets and clear pressed states.

## Build the AI chat panel

The project is a wall-mounted AI console with three regions: a status bar, a scrolling conversation, and a text input area with a touch keyboard. The CYD displays the conversation; the cloud agent does the reasoning.

### UI layout

- **Status bar:** Wi-Fi state, cloud connection, agent state, and a small error indicator.
- **Conversation:** alternating user and assistant bubbles, with a scroll container and a "thinking" indicator.
- **Input:** a text area and a send button; tapping the text area opens an LVGL keyboard.
- **System controls:** clear conversation, reconnect, and a settings screen for Wi-Fi and agent selection.

Keep the visual language simple. The CYD's 240×320 panel and resistive touch are not well suited to dense dashboards or tiny controls. Large type, high contrast, and a clear send button matter more than decoration.

### Connectivity and AI path

Use the TuyaOpen Wi-Fi provisioning flow and a valid license key for cloud features. The [equipment authorization guide](https://tuyaopen.ai/docs/quick-start/equipment-authorization) explains the UUID, AuthKey, and PID configuration. The [chat bot demo](https://tuyaopen.ai/docs/cloud/device-ai/demo-your-chat-bot) is voice-first on boards with microphones, but its application structure is still useful: it shows how the device talks to the Tuya AI agent, how conversation state is displayed, and how the UI reacts to connection changes.

For a text-only CYD, send the user's text to the same agent path and render the response. Keep the request and response format explicit, and handle timeouts. A chat UI that hangs on "thinking" forever is worse than one that shows a retry button. The [AI agent platform documentation](https://tuyaopen.ai/docs/cloud/tuya-cloud/ai-agent/ai-agent-dev-platform) covers the cloud-side configuration; the device should not embed model keys or provider-specific prompts in firmware.

### State machine

A simple state machine keeps the UI honest:

- `IDLE`: connected, no request in flight.
- `SENDING`: request sent, waiting for the first response.
- `STREAMING` or `WAITING`: response is arriving or the cloud is still working.
- `ERROR`: timeout, auth failure, or network loss.
- `OFFLINE`: Wi-Fi or cloud unavailable; the input is disabled with a clear message.

On error, keep the user's text so it can be retried. On reconnect, re-check the license and agent configuration before enabling send. Log the error category, not the full prompt, to avoid leaking user content into device logs.

### What about voice?

The CYD has a speaker amplifier on GPIO26 but no microphone and no I2S codec. Adding voice would require an I2S microphone, an audio codec, and enough free pins for I2S clocks and data; the CYD's expansion header does not make that easy. For a voice-first product, use a T5-AI board with built-in microphones and speaker, or an ESP32-S3 board with an I2S codec. The CYD is a display and touch board; treating it as a voice board leads to a chain of adapters and compromises.

## Performance and reliability

The CYD's constraints are manageable if you design for them.

- **Memory:** no PSRAM on common variants. Use partial LVGL refresh and avoid large images. Store fonts and icons in flash, not RAM.
- **SPI bandwidth:** the display and touch have separate buses, but both compete with Wi-Fi for CPU time. Avoid redrawing the entire screen on every keystroke.
- **Power:** use a stable 5 V supply. A weak charger can cause brownouts during Wi-Fi transmit, which look like random display glitches.
- **Touch latency:** read touch at 30–50 Hz, not as fast as possible. Resistive panels are noisy; filtering improves the experience.
- **OTA:** test an [OTA update](https://tuyaopen.ai/docs/hardware/espressif/esp32-ota) with the display and touch running. A firmware update that leaves the panel blank is a field failure, not a lab curiosity.
- **Enclosure:** the backlight and regulator generate heat, and the antenna needs clearance. Do not sandwich the board against a metal plate.

## Production checklist

- Confirm the panel controller and touch controller for every batch, not just the first sample.
- Record the display orientation, colour order, inversion, and touch calibration in the board configuration.
- Keep a known-good test firmware for bring-up and field diagnosis.
- Use a licensed Tuya Cloud project and test provisioning from a clean phone.
- Define offline and error states for the AI panel before shipping.
- Test OTA with a full UI and a Wi-Fi reconnect.
- Validate touch at the corners and with the on-screen keyboard.
- Check the 5 V supply and USB cable under Wi-Fi load.
- Document which GPIOs are free; assume the rest are taken.

## FAQ

**Is the CYD officially supported by TuyaOpen?** Not as a named board in the base repository. The display drivers cover its panels, but the CYD needs a board support package and an XPT2046 touch driver. Treat it as a porting project.

**Why is my screen white or inverted?** The CYD ships with different panel controllers. Check whether your board is ILI9341 or ST7789, then adjust the driver, inversion, and RGB/BGR order one setting at a time.

**Can I use the CYD for voice chat?** Not without adding a microphone and an I2S codec. The board has a speaker amplifier but no microphone. A T5-AI or ESP32-S3 audio board is a better starting point.

**Why does touch not work with the display library?** The XPT2046 is on a separate SPI bus. Use a dedicated touch driver and the correct chip select and IRQ pins; do not assume it shares the display bus.

**Can I use all the free GPIOs?** The commonly free pins are GPIO22, GPIO27, and GPIO35, and GPIO35 is input-only. The display, touch, SD card, LED, LDR, and speaker use the rest. Check your revision before planning a shield.

**Does the CYD have PSRAM?** Many common variants do not. Check the module marking and the board documentation. Without PSRAM, use partial refresh and keep the LVGL buffer small.

The CYD is a good match for TuyaOpen when the product is display-first: a control panel, a status screen, a text-based AI console, or a touch interface for a cloud agent. It is a poor match for voice-first or camera-first products. Porting it once, with a proper board support package and a calibrated touch driver, turns a cheap display board into a repeatable TuyaOpen target.

*CYD revisions, panel controllers, and pin behaviour vary by batch. Verify the controller ID and schematic for your board, and check the current TuyaOpen display and LVGL documentation for the exact configuration names in your SDK version.*

 *This article is an original publication of Tuya. All rights reserved. No part of this content may be reproduced, distributed, or referenced without prior written permission from Tuya. Copyright © Tuya Inc. All Rights Reserved.*
