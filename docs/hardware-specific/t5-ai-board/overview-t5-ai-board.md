---
title: T5AI-Board Overview
---

# T5AI-Board Development Kit

![T5AI-Board DevKit](https://images.tuyacn.com/fe-static/docs/img/83859360-38f6-42c2-9614-99b47f487775.jpg)


## Software build configuration

The board-level configuration file defines key functional components, such as peripheral drivers, pin mapping, board support packages (BSP), and third-party libraries. By using the pre-configured board-level configuration files for the development board, you can significantly reduce the workload of hardware adaptation and driver development, thus improving development efficiency.


:::tip Interested in developing new peripherals?
**Configuration features:**
- **To add a new peripheral, you can write drivers directly at the application layer.** BSP drivers are primarily intended for peripherals integrated on the board.
- Peripheral requirements might vary across applications. You must adjust the configuration files based on specific needs.
- Depending on your application requirements, you might need to configure different third-party library parameters.
- It is **recommended** to use the initial config file as the **base template for board-level configuration** and extend or modify it as needed for your project.
:::

How to enable configurations? Refer to [tos.py User Guide > config choice](/docs/tos-tools/tos-guide#config-choice).

<table class="hw-config-flag-table">
  <tbody>
    <tr>
      <th>Build flag</th>
      <td><code>TUYA_T5AI_BOARD_LCD_3.5.config</code></td>
      <td>T5AI-Board + 3.5-inch screen BSP board configuration - <a href="https://github.com/tuya/TuyaOpen/blob/master/apps/tuya.ai/your_chat_bot/config/TUYA_T5AI_BOARD_LCD_3.5.config">Configuration file</a></td>
    </tr>
    <tr>
      <th>BSP driver source code</th>
      <td colspan="2"><a href="https://github.com/tuya/TuyaOpen/tree/master/boards/T5AI/TUYA_T5AI_BOARD">T5AI-Board BSP driver source code</a></td>
    </tr>
  </tbody>
</table>

---

## Hardware overview

Tuya T5AI-Board is a voice and screen multi-interaction development board based on the T5-E1-IPEX module, which is an embedded Wi-Fi and Bluetooth combo module developed by Tuya. The board is equipped with 2 microphones and 1 speaker, supporting voice recognition and playback to enable voice interaction functionality.

Through the I/O connectors on the board, you can use an LCD display stack module to implement touchscreen and camera capture capabilities. You can also design your own LCD screen, supporting multiple interfaces including I2C, SPI, 8080, and RGB.

---

## Highlights

- Tuya T5 MCU module (Wi-Fi 2.4 GHz + Bluetooth LE 5.4)
- 8 MB flash memory
- 16 MB RAM
- Serial firmware download and debug logging
- 2-channel microphone
- 1-channel speaker
- TF card slot
- Complete module pin breakout
- Onboard 2.4 GHz Wi-Fi antenna
- USB host interface
- USB power supply
- (Optional stack module) RGB565 display + DVP camera support

## Detailed specifications

| Feature | Specification |
|---------|---------------|
| Onboard module | T5-E1-IPEX |
| CPU | ARMv8-M Star (M33F) @480 MHz |
| Cache | 16 KB ITCM and 16 KB DTCM |
| Flash memory | 8 MB SiP flash memory |
| RAM | 16 MB SiP PSRAM |
| SRAM | 640 KB shared SRAM |
| Audio ADC | 2-channel 16-bit 48 KHz |
| Audio DAC | 1-channel 16-bit 48 KHz |
| Equalizer | 4-band digital equalizer |
| Camera | DVP interface |
| Display | RGB and 8080 interfaces |
| Extension | TF card support |
| GPIO | 56 GPIOs |
| Interfaces | 2x SPI, 2x QSPI, 3x UART, 2x I2C, 1x SDIO, 1x CAN, 12x PWM, and 3x I2S |
| Standard | IEEE 802.11b/g/n/ax compliant |
| Bluetooth | Bluetooth LE 5.4 |
| USB type-C | Input: 5V@1A, firmware download and debugging |

---

## Pinout

The T5AI-Board provides comprehensive pinout options through its expansion headers. Here is a detailed breakdown of the available pins and their functionalities.

![T5AI-Board pinout](https://images.tuyacn.com/fe-static/docs/img/6b7ab959-0635-4293-991b-b8dda293614b.jpg)

### Download high-resolution pinout diagram

[![](https://img.shields.io/badge/V102-Download%20PDF%20Illustration-orange?style=for-the-badge)](/docs/hardware/T5-AI-Board-Pinout-v102.pdf)

---
## LCD + camera module
The T5AI-Board supports an optional LCD and camera module, which can be stacked onto the baseboard.

#### Display specifications:
- 3.5" TFT display with 320 × 480 RGB resolution
- TFT display driver: `ILI9488`
- Touch panel driver: `GT1151QM`

#### Camera specifications:

- Image sensor: `GC2145`
- Resolution: 2 MP (1616 × 1232 pixels)
- I2C communication addresses: `0x78` and `0x79`
- [View the camera datasheet](https://e2e.ti.com/cfs-file/__key/communityserver-discussions-components-files/968/GC2145-CSP-DataSheet-release-V1.0_5F00_20131201.pdf)

### Pin configuration

The following diagram shows the pin assignments used by the LCD and camera module:

![Stacking module pins](https://images.tuyacn.com/content-platform/hestia/173693668247bb1930ac5.png)

:::info Important note
- The camera and touch panel share a common I2C interface.
- TF card pins `DATA3` and `DATA2` are shared with the module's UART port for firmware updates.
:::


## Resources
#### T5AI-Board development board

- [T5AI-Board schematic diagram](https://images.tuyacn.com/content-platform/hestia/174243908480e34e64d08.pdf): Complete circuit diagram.
- [T5AI-Board pinout](/docs/hardware/T5-AI-Board-Pinout-v102.pdf): Detailed pin mapping and interface layout.
- [Schematic diagram of LCD and camera module](https://images.tuyacn.com/content-platform/hestia/17387200670bcae1561bf.pdf): Circuit diagrams of the LCD and camera module boards.
- [T5AI-Board 3D structural file (LCD+Base-Board)(STEP)](/docs/hardware/t5ai-board/T5-BOARD_V102-3D.zip): Offers a 3D model for structural design and integration.

#### T5 MCU datasheets

- [T5-E1-IPEX Module Datasheet](https://developer.tuya.com/en/docs/iot/T5-E1-IPEX-Module-Datasheet?id=Kdskxvxe835tq#title-12-Pin%20definition): Technical specifications and pin definitions of the T5-E1-IPEX module.
- [T5 MCU Chip Technical Datasheet](https://images.tuyaeu.com/content-platform/hestia/1731549161e5fd8879de6.pdf): Comprehensive technical specifications and reference documentation for the T5 series.


### USB-to-serial chip driver installation

T5AI-Board uses an onboard CH343 USB-to-serial chip for firmware flashing and debugging. Download the appropriate driver for your operating system:

- [Windows driver](https://www.wch-ic.com/downloads/CH343SER_ZIP.html)
- [Linux driver](https://github.com/WCHSoftGroup/ch343ser_linux)
- [macOS driver](https://github.com/WCHSoftGroup/ch34xser_macos)

## Technical docs and demos

- [Get started with T5AI-Board (Environment setup and flashing demo)](/docs/quick-start/enviroment-setup)
- [T5AI-Board demo: Chatbots](/docs/applications/tuya.ai/demo-your-chat-bot)
- [T5AI-Board demo: IoT smart sockets and lights](/docs/applications/tuya_cloud/demo-tuya-iot-light)
- [T5AI-Board demo: Wi-Fi, Bluetooth, and other peripherals](/docs/examples/demo-generic-examples)
