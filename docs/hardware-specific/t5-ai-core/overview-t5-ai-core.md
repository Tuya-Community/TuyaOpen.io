---
title: "T5AI-Core Overview"
---

# T5AI-Core Development Kit

![T5AI-Core DevKit](https://images.tuyacn.com/fe-static/docs/img/02037ea4-3282-4c8c-b2ec-c9c1894e8064.png)


## Software build configuration

The board-level configuration file defines key functional components, such as peripheral drivers, pin mapping, board support packages (BSP), and third-party libraries. By using the pre-configured board-level configuration files for the development board, you can significantly reduce the workload of hardware adaptation and driver development, thus improving development efficiency.


:::tip Interested in developing new peripherals?
**Configuration features:**
- **To add a new peripheral, you can write drivers directly at the application layer.** BSP drivers are primarily intended for peripherals integrated on the board.
- Peripheral requirements might vary across applications. You must adjust the configuration files based on specific needs.
- Depending on your application requirements, you might need to configure different third-party library parameters.
- <span style={{color: 'red'}}><strong>It is recommended</strong> to make board-level configurations on top of the provided initial configuration file</span>, and perform custom development and functional extensions.
:::

How to enable board-level configurations? Refer to [tos.py User Guide > config choice](/docs/tos-tools/tos-guide#config-choice).

<table class="hw-config-flag-table">
  <tbody>
    <tr>
      <th>Build flag</th>
      <td><code>TUYA_T5AI_CORE.config</code></td>
      <td>T5AI-Core + Onboard mic/speaker BSP board configuration - <a href="https://github.com/tuya/TuyaOpen/blob/master/apps/tuya.ai/your_chat_bot/config/TUYA_T5AI_CORE.config">Configuration file</a></td>
    </tr>
    <tr>
      <th>BSP driver source code</th>
      <td colspan="2"><a href="https://github.com/tuya/TuyaOpen/tree/master/boards/T5AI/TUYA_T5AI_CORE">T5AI-Core BSP driver source code</a></td>
    </tr>
  </tbody>
</table>



## Overview

Tuya T5AI-Core Development Kit is a highly integrated voice core development board based on the T5-E1 module. The T5-E1 module, independently developed by Tuya Smart, incorporates embedded Wi-Fi and Bluetooth capabilities, making it suitable for a variety of smart hardware scenarios. This board features an onboard microphone and speaker, supporting local voice recognition and audio playback to meet the requirements of voice interaction applications.

The board is equipped with a 44-pin header, making it easy for you to quickly develop and prototype AIoT projects. An onboard lithium battery power management circuit supports low-power design, suitable for developing mobile and portable smart devices.

This board provides extensive hardware interfaces and comprehensive voice functionality, so it stands out as an ideal choice for you to develop AIoT voice interaction applications.

<div align="center">
  <img src="https://images.tuyacn.com/fe-static/docs/img/dd9d442f-bd51-4ce0-bbb5-687058270bff.jpg" alt="" width="400" />
  <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
    <img src="https://images.tuyacn.com/fe-static/docs/img/6a1310df-c48c-4c71-b52e-483ba4b49bc1.jpg" alt="" width="250" />
    <img src="https://images.tuyacn.com/fe-static/docs/img/2475d214-9adf-4aaa-a1fe-67c88b50fbd2.jpg" alt="" width="250" />
  </div>
</div>



## Highlights

- Tuya T5 MCU module (Wi-Fi 2.4 GHz + Bluetooth LE 5.4)
- ARMv8-M Star (M33F) processor, up to 480 MHz
- 8 MB flash memory (internal to the module chip)
- 16 MB RAM (internal to the module chip)
- Serial firmware download and debug logging
- 1-channel microphone
- 1-channel echo sampling
- 1-channel speaker
- Module pin breakout
- Onboard 2.4 GHz Wi-Fi antenna
- USB power supply + dual serial port chip
- Board dimensions: 73 mm × 29 mm × 11 mm (excluding pin headers) / 17 mm (including pin headers)




### Hardware architecture

![T5AI-Core hardware architecture](https://images.tuyacn.com/fe-static/docs/img/e230929b-39a7-4851-bdb8-d614624a48fc.jpg)

### Design philosophy and pin availability

This board was designed with a focus on both portability and development flexibility. It integrates only core functional modules such as **battery power supply**, **firmware flashing and debugging**, and **audio input/output**. Therefore, the board is ready to use out of the box and can satisfy the main application scenarios like voice interaction.

In addition to the core functionalities mentioned above, all other pins are fully accessible through the 44-pin header, significantly enhancing hardware extensibility and accessibility. You can flexibly connect various external sensors, actuators, or other peripherals based on actual project requirements, greatly facilitating prototyping and functional validation. This design not only achieves a concise and efficient board layout but also provides a solid hardware foundation for future feature extension and custom development.

To accommodate additional I/O interfaces, pad test points are reserved on the PCB surface, offering comprehensive extensibility while maintaining a compact form factor.


## Hardware details

### Power management system

#### Power input

- **Type-C USB 2.0 port**: Provides 5V main power input, and supports firmware flashing and log debugging via dual-channel serial ports.
- **JST PH 1.25 mm battery connector**: Supports 3.7V lithium battery power supply for portable applications.


<div style={{ display: 'flex', justifyContent: 'left', gap: '16px', flexWrap: 'wrap' }}>
    <img src="https://images.tuyacn.com/fe-static/docs/img/b1f63d5f-80c7-44c6-9cbc-82e97461c6b2.png" alt="" width="150" />
    <img src="https://images.tuyacn.com/fe-static/docs/img/3911e3dd-680f-48d0-a448-f764bec39d67.png" alt="" width="150" />
</div>


#### Power switch

A toggle switch serves as the main power switch of the system, with its upstream power supplied from either **USB port** or a **lithium battery**.

:::warning
Make sure the power switch is turned on when flashing the firmware.
:::

<p align="center">
  <img src="https://images.tuyacn.com/fe-static/docs/img/84a7c2b7-020c-4004-aab8-c0cbd6f425a4.png" alt="" width="150" />
</p>



#### Power management chip

**ETA6003 battery management chip**:

- Accepts 5V input from the Type-C USB port and 3.7V input from the battery connector.
- Manages battery charging and power distribution.
- Outputs 5V to the power switch.
- Controls the power indicator (PW LED) and charging indicator (Charge LED).

#### Power switch and regulation

- **Power switch**: Controls the main system voltage (`VSYS`) and receives 5V input from the ETA6003 chip.
- **LN2220PAR boost converter**: Steps up `VSYS` to a stable 5V power domain to supply high-power components such as the audio amplifier.
- **RY3408 3.3V regulator**: Steps down the boosted 5V to a 3.3V power domain to supply the T5-E1 module and digital circuits.

## Power supply features

- Dual power input: 5V from the USB port and 3.7V from the lithium battery.
- Smart power management supporting battery charging and power switching.
- Multi-stage voltage regulation, providing stable 5V and 3.3V power domains.
- Low-power design optimized for portable applications.


:::warning Battery requirements
- **Battery type**: 3.7V lithium batteries with a discharge rate of at least 1C are recommended to ensure a stable system power supply.
- **Capacity recommendation**: Select an appropriate capacity based on application needs, typically ranging from 500 mAh to 2000 mAh.
- **Polarity consideration**: Strictly follow the positive and negative markings when connecting the battery to avoid reverse connection and device damage.
- **Protection circuit**: It is advised to use lithium batteries with overcharge, over-discharge, and short-circuit protection features to enhance safety.

<p align="center">
  <img src="https://images.tuyacn.com/fe-static/docs/img/9eade1d0-f90d-41ed-b2de-686f3e9a255e.jpg" alt="" width="250" />
</p>
:::


### Charge LED

ETA6003 battery management chip controls the charge LED to show the current charging status. The logic is as follows:

<p align="center">
<img src="https://images.tuyacn.com/fe-static/docs/img/eed5a4d5-8eba-4d6a-87a3-c641cf0facdd.png" alt="" width="150" />
</p>

- When the toggle switch is in the **On** position, the power LED lights up, indicating the system is powered on.
- **Charging**: When the lithium battery is charging, the charge LED is steady on, indicating charging is in progress.
- **Fully charged**: When the lithium battery is fully charged, the charge LED automatically turns off, indicating charging is completed.
- **No battery or not charging**: The charge LED blinks continuously.

:::warning
To check the charging status, observe whether the charge LED on the development board is lit.
:::



## Core processing unit

#### T5-E1 Wi-Fi and Bluetooth module
- **Processor**: ARMv8-M Star (M33F) architecture, with a maximum clock rate of 480 MHz.
- **Storage**: Built-in 8 MB flash memory and 16 MB RAM.
- **Wireless communication**: Integrated 2.4 GHz Wi-Fi and Bluetooth low energy (LE) 5.4 functionality.
- **Power supply**: Operates within the 3.3V power domain.
- **Feature**: Acts as the core processing unit, handling all computation, communication, and control tasks.

<p align="center">
<img src="https://images.tuyacn.com/fe-static/docs/img/28b35dec-a9a0-4543-ba41-b9c3f71a8527.png" alt="" width="250" />
</p>

## Communication interfaces

#### USB serial communication

- **CP2105 dual-channel serial chip**:

   - Connects to the DP/DN signal lines of the Type-C USB interface.
   - Provides dual UART download and debugging functionality.
   - Supports firmware flashing and debugging log output.
- Driver installation: Refer to the [USB-to-serial driver installation](#USB-to-serial-chip-driver-installation).

## User interaction components

### User input and output

| Component | Pin | Description |
| ------------ | ------- | ------------------------------------------ |
| User LED | P9 | User indicator light controlled by the T5-E1 module, connected to GPIO pin P9. |
| User button | P29 | User input button, connected to the T5-E1 module's GPIO pin P29. |
| Reset button | RST | Dedicated reset button that sends a reset signal to the T5-E1 module. |

<div style="{{" display: "flex", justifyContent: "center", gap: "24px", alignItems: "center" }}>
  <img src="https://images.tuyacn.com/fe-static/docs/img/2e0043dc-59d8-4900-b5d1-524de845131d.png" alt="" width="250" />
  <img src="https://images.tuyacn.com/fe-static/docs/img/cd0b54a3-d292-4d74-b91d-c474f51c89c1.png" alt="" width="250" />
</div>

## Audio system
#### Audio sampling specifications

- **Standard sampling rate**: 16 KHz
- **Sampling bit depth**: 16 bits

The T5AI-Core audio system **adopts a default sampling rate of 16 KHz and 16-bit sampling precision**, making it suitable for applications such as voice recognition and audio processing. It is compatible with popular audio algorithms and protocols.

## Audio input

The T5 module supports two channels of analog microphone input, facilitating audio capture and loopback. The audio input channels on this board are assigned as follows:

| Channel | Purpose description |
|-------|--------------------|
| CH1 | Microphone audio input |
| CH2 | Speaker loopback signal input (supports interrupt functionality) |

- **Onboard analog microphone**: An integrated microphone that provides analog audio input to the T5-E1 module.

   <p align="center">
     <img src="https://images.tuyacn.com/fe-static/docs/img/e23b3b2c-f268-4a45-8271-2945a32a094d.png" alt="" width="250" />
   </p>

- **Loopback circuit**: An audio loopback circuit designed for audio testing and processing. It supports Acoustic Echo Cancellation (AEC) and echo suppression features, and is connected to the T5-E1 module.

## Audio output

- **1W audio amplifier**:
   - Powered by the 5V power domain.
   - Receives audio signals from the T5-E1 module.
   - Outputs amplified audio to the speaker connector.
- **JST PH 1.25 mm speaker connector**: External speaker output interface, compatible with **4Ω 3W** speakers.
   <p align="center">
     <img src="https://images.tuyacn.com/fe-static/docs/img/ebb095cd-be13-472d-99a0-bc4b0ff15242.png" alt="" width="250" />
   </p>

:::warning Speaker selection
It is recommended to use speakers with **4Ω** impedance and **1W to 3W** power. Make sure your selected speakers have good echo cancellation and noise suppression performance to meet the audio system requirements.
:::

## Extension interfaces

### 44-pin 2.54 mm header

- **Power pins**: Provide 5V and 3.3V power outputs.
- **Signal pins**: Expose various signals from the T5-E1 module, including GPIO, UART, SPI, and I2C.
- **Functionality**: Facilitate external circuit connections and functional extension, supporting rapid prototype verification.

The following section details pin multiplexing and functional definitions:

<p align="center">
  <img src="https://images.tuyacn.com/fe-static/docs/img/e902e201-77b8-4c83-aa71-1c0dae77cfb3.png" alt="" width="450" />
</p>
<p align="center">
  <img src="https://images.tuyacn.com/fe-static/docs/img/683ec5fa-9c4e-401a-b645-e8120628ac03.png" alt="" width="400" />
</p>



## USB host interface (Functional extension)

The T5 module supports one USB host channel, enabling connections to various USB devices, such as USB cameras and USB serial ports using the Communications Device Class (CDC). Thus, the module can meet diverse peripheral extension requirements.

<p align="center">
  <img src="https://images.tuyacn.com/fe-static/docs/img/f7b6d377-2a65-4e23-b6f3-d2c50cd42168.png" alt="T5 USB host diagram" width="200" />
</p>

## Firmware download UART (Multiplexed)

The UART pins of the T5 module are shared with the onboard serial chip. After firmware flashing is completed, the UART port can be reassigned for other device applications, enabling flexible management of serial resources.

<p align="center">
  <img src="https://images.tuyacn.com/fe-static/docs/img/fca1b1a2-e89e-4a85-aa52-b048850843d6.png" alt="T5 UART diagram" width="200" />
</p>


### Antenna system

**Onboard 2.4 GHz Wi-Fi and Bluetooth LE antenna**: An integrated antenna that provides wireless communication support for the T5-E1 module.


## Resources
#### T5AI-Core development board

- [T5AI-Core schematic diagram](/docs/hardware/t5ai-core/T5AI-Core_V101-SCH.pdf): Complete circuit diagram.
- [T5AI-Core silkscreen (ASM)](/docs/hardware/t5ai-core/T5AI-Core_V101-ASM.pdf): Provides detailed silkscreen reference for this board.
- [T5AI-Core 3D structural file (STEP)](/docs/hardware/t5ai-core/T5AI-Core_V101-3D.step): Offers a 3D model for structural design and integration.


#### T5 MCU datasheets

- [T5-E1 Module Datasheet](https://developer.tuya.com/en/docs/iot/T5-E1-Module-Datasheet?id=Kdar6hf0kzmfi): Technical specifications and pin definitions of the T5-E1 module.
- [T5 MCU Chip Technical Datasheet](https://images.tuyaeu.com/content-platform/hestia/1731549161e5fd8879de6.pdf): Comprehensive technical specifications and reference documentation for the T5 series.


### USB-to-serial chip driver installation

The T5AI-Core uses an onboard CH343 USB-to-serial chip for firmware flashing and debugging. Download the appropriate driver for your operating system:

- [Windows driver](https://www.wch-ic.com/downloads/CH343SER_ZIP.html)
- [Linux driver](https://github.com/WCHSoftGroup/ch343ser_linux)
- [macOS driver](https://github.com/WCHSoftGroup/ch34xser_macos)


## Technical docs and demos

- [Get started with T5AI (Environment setup and flashing demo)](/docs/quick-start/enviroment-setup)
- [T5AI demo: Chatbots](/docs/applications/tuya.ai/demo-your-chat-bot)
- [T5AI demo: IoT smart sockets and lights](/docs/applications/tuya_cloud/demo-tuya-iot-light)
- [T5AI demo: Wi-Fi, Bluetooth, and other peripherals](/docs/examples/demo-generic-examples)
