---
title: Overview T5-AI Devkit
---

# **T5AI-Board** Development Kit

![T5-AI Board DevKit](https://images.tuyacn.com/fe-static/docs/img/83859360-38f6-42c2-9614-99b47f487775.jpg)

## Overview
Tuya T5AI-Board is a voice and screen multi-interaction development board based on the T5-E1-IPEX, an embedded Wi-Fi and Bluetooth combo module developed by Tuya Smart. Equipped with 2 microphones and 1 speaker, the development board supports voice recognition and playback, offering voice interaction capabilities.

Through the I/O connector on the development board, you can use an LCD display stack on module to implement the touch screen and camera capture features. You can also design your own LCD screen with various interfaces, including I2C, SPI, 8080, and RGB interfaces. 

---
## DevKit Highlights
- Tuya T5 MCU Module (Wi-Fi 2.4G + BLE 5.4)
- 8 MB Flash Memory
- 16 MB RAM
- Serial Firmware Download and Debug Logging
- 2-Channel Microphones
- 1-Channel Speaker
- TF Card Slot
- Module Full Pin-Out Headers
- Onboard 2.4 GHz Wi-Fi antenna
- USB Host Interface
- USB Powered
- *(Optional Stack Module) RGB565 Display + DVP Camera Support

## Detail Specification
| Feature | Specification |
|---------|---------------|
| On Board Module | T5-E1-IPEX |
| CPU | ARMv8-M Star (M33F) @480MHz |
| Cache | 16KB ITCM and 16KB DTCM |
| Flash | 8 MB SiP flash memory |
| RAM | 16 MB SiP PSRAM |
| SRAM | 640 KB shared SRAM |
| Audio ADC | 2-channel 16-bit 48KHz|
| Audio DAC | 1-channel 16-bit 48KHz|
| Equalizer | 4-band digital equalizer |
| Camera | DVP interfaces |
| Display | RGB and 8080 interfaces |
| Expansion | TF card support |
| GPIO | 56x GPIOs |
| Interfaces | 2x SPI, 2x QSPI, 3x UART, 2x I2C, 1x SDIO, 1x CAN, 12x PWM, 3x I2S |
| Standard | IEEE 802.11b/g/n/ax compliant |
| Bluetooth | Bluetooth LE 5.4 |
| USB type-C | Input: 5V@1A , Firmware Download and Debugging |

---

## Pinout
The T5AI-Board provides comprehensive pinout options through its expansion headers. Here's a detailed breakdown of the available pins and their functions:

![T5-AI Board Pinout](https://images.tuyacn.com/fe-static/docs/img/6b7ab959-0635-4293-991b-b8dda293614b.jpg)

### Downlaod High-Res Pinout Illustration:
[![](https://img.shields.io/badge/V1002-Download%20PDF%20Illustration-orange?style=for-the-badge)](/docs/hardware/T5-AI%20Board-Pinout-v102.pdf)

---
## LCD Screen + Camera Module
The T5AI-Board supports an optional LCD screen and camera module that can be stacked on top of the main board.

#### Display Specifications:
- 3.5" TFT display with 320×480 RGB resolution
- TFT display driver: `ILI9488`
- Touch panel driver: `GT1151QM`

#### Camera Specifications:
- Image sensor: `GC2145`
- Resolution: 2MP (1616 x 1232 pixels)
- I2C communication addresses: `0x78` and `0x79`
- [View camera datasheet](https://e2e.ti.com/cfs-file/__key/communityserver-discussions-components-files/968/GC2145-CSP-DataSheet-release-V1.0_5F00_20131201.pdf)

### Pin Configuration
The following diagram shows the pin assignments used by the LCD screen and camera module:
![Stacking Module Pin Usage](https://images.tuyacn.com/content-platform/hestia/173693668247bb1930ac5.png)

:::info Important Pin Considerations
- The camera and touch panel share a common I2C interface
- TF card pins `DATA3` and `DATA2` are shared with the module's UART port for firmware updates
:::


## Download Resources
- [T5AI-Board Schematic](https://images.tuyacn.com/content-platform/hestia/174243908480e34e64d08.pdf) - Complete circuit diagram of the T5AI-Board
- [T5AI-Board Pinout Illustration](./static/T5-AI%20Board-Pinout-v102.pdf) - Detailed pin mapping and interface layout
- [LCD and Camera Module Schematic](https://images.tuyacn.com/content-platform/hestia/17387200670bcae1561bf.pdf) - Circuit diagram for the display and camera module board
#### T5 MCU Datasheets
- [T5-E1-IPEX Module Datasheet](https://developer.tuya.com/en/docs/iot/T5-E1-IPEX-Module-Datasheet?id=Kdskxvxe835tq#title-12-Pin%20definition) - Technical specifications and pin definitions for the T5-E1-IPEX module
- [T5 MCU Chip Technical Datasheet](https://images.tuyaeu.com/content-platform/hestia/1731549161e5fd8879de6.pdf) - Comprehensive technical specifications and reference documentation for the T5 series


### USB-to-Serial Driver Installation
The T5AI-Board uses On-Board CH343 USB-to-Serial chip for firmware flashing and debugging. Download the appropriate driver for your operating system:

- [Windows Driver](https://www.wch-ic.com/downloads/CH343SER_ZIP.html)
- [Linux Driver](https://github.com/WCHSoftGroup/ch343ser_linux)
- [macOS Driver](https://github.com/WCHSoftGroup/ch34xser_macos)


## Related Documentation
- [Getting Started with T5AI-Board](./) (Coming Soon)
