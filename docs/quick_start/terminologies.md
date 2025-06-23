---
title: Terminologies
---

# TuyaOpen Terminologies
This document describes the commonly used terms in TuyaOpen Framework

:::tip Contribution Guidelines
If you find that some terms are missing from the documentation or need to add new technical terms, you are welcome to contribute your knowledge through Pull Requests. When submitting a PR, please ensure:
1. Term explanations should be accurate and clear
2. Maintain consistent table formatting
3. Add new terms to appropriate categories
4. Provide original English terms (if applicable)

Thank you for your contribution!
:::


## TuyaOpen vs TuyaOS
### TuyaOpen
TuyaOpen is an open-source, open development framework for the AIoT industry, built upon the mature commercial-grade IoT system TuyaOS. It inherits core features such as cross-platform compatibility, cross-system support, modularity, and security compliance, validated by billions of devices and millions of users worldwide.

TuyaOpen integrates edge-side AI inference engines, supports the Tuya Cloud Agent Hub, and enables multi-modal AI capabilities through edge-cloud fusion. Developers can seamlessly access compliant domestic large models (e.g., DeepSeek, Qwen, Doubao) or flexibly integrate global-leading AI services (e.g., ChatGPT, Claude, Gemini). Through a diverse tool ecosystem, developers can implement various AI functionalities such as text/voice conversations, image generation, and video generation.

Additionally, TuyaOpen supports mainstream open-source hardware and software ecosystems in the industry, allowing developers to easily port and deploy projects to any chip or development board. This accelerates innovation through AI technology and shortens product development cycles.

### TuyaOS
TuyaOS is a distributed, cross-platform operating system designed for IoT applications, supporting full connectivity and scenarios across RTOS, Linux, and Non-OS kernels. Based on the TuyaOS Kernel and its rich development components, it liberates developers from fragmented experiences across different chip platforms, systems, communication protocols, and application software, enabling them to focus solely on business innovation and development. With "write once, deploy everywhere," TuyaOS ensures global availability and compliance.

Its architecture adopts a layered, plug-and-play component design, allowing customization based on chip resources and application scenarios to generate tailored development frameworks. Through Tuya's proprietary device model and self-developed soft bus, products developed with TuyaOS can interconnect regardless of communication protocols.

### Key Differences

| Feature                  | TuyaOpen                                         | TuyaOS                                                      |
|-------------------------|--------------------------------------------------|-------------------------------------------------------------|
| Target Users            | Open-source developers                           | Commercial partners                                         |
| Source Code Access       | Fully open-source                                | Partially open-source, supports secondary development       |
| Code Download           | Free on GitHub/Gitee                             | Requires WindIDE (VSCode plugin) + email authorization      |
| Development Environment  | Linux, Windows, Mac                              | Linux-only (other platforms require a VM)                   |
| Tuya Cloud AI Components| ✅                                               | ✅ (Latest & fastest)                                        |
| Tuya Voice AI (ASR)     | ✅                                               | ✅                                                           |
| Tuya Video AI           | ➖ (Under development)                   | ✅                                                           |
| Tuya Cloud LLM Customization (LLM/Prompt/Workflow/RAG) | ✅                                | ✅                                                           |
| Source Code Customization| Highly customizable                              | API-level customization, richer commercial components       |
| Chip Support            | Tuya T-series / ESP-series (see compatibility list) | Tuya T-series                                        |
| Development Language     | C/C++                                           | C/C++                                                        |
| Documentation           | [TuyaOpen Official Site](https://TuyaOpen.ai)   | [Tuya Developer Portal](https://developer.tuya.com/cn/docs/iot-device-dev) |
| Open Contribution       | ✅                                               | Copyright License required                                   |
| Hardware Ecosystem       | Continuously expanding drivers for chips/devices | Uses recommended solutions                                  |


## Hardware Development

| Term | Description |
|------|-------------|
| MCU | A microcontroller unit (MCU) is a small computer on a single integrated circuit, with very high integration, rich functions, very high response speed, reliability, and a wide application field. Devices with the MCU have their own control boards, which define the product functions. Network modules connect to control boards to implement the network connection. |
| SoC | SoC stands for system on a chip. An SoC device does not have a microcontroller unit (MCU). The control programs are written into SoC or the module. |
| Network module | A network module is a component that is integrated into an embedded electronic system to connect the system to a network. Each module is the circuit module that connects the embedded system to the network. Currently, Tuya provides the following modules for network connections in different modes: Wi-Fi module, GPRS module, Bluetooth mesh module, Wi-Fi and Bluetooth Low Energy (LE) combo module, Zigbee module, Sub-GHz module, NB-IoT module. |
| DP | A data point (DP) represents a smart device function. Tuya abstracts each function into a data point. DPs are defined in different data types, such as Boolean, enumeration, and integer. DPs have read and write attributes. For example, a 2-gang switch has two Boolean DPs, and each DP has either a True or False value, which can be read and written. To read means to get the current value of the switch, and to write means to change the current value of the switch. |
| DPID | DP ID represents the ID of a DP event under a communication protocol. |
| Device ID | An identifier that uniquely identifies each device. |
| DPCode | The unique identifier of a DP event. In most cases, the DPCode is the same for the same DP event under different communication protocols. |
| AuthKey | The device authentication key issued by the platform. The AuthKey is strongly bound with the product ID (PID) and universally unique identifier (UUID). Note: This parameter is very important and will be used during device authentication. Keep the value safe. |


## Communication and Protocols

| Term | Description |
|------|-------------|
| Bluetooth | Bluetooth technology is an open global specification that is designed to enable short-range wireless voice and data communication. Through low-cost, short-distance wireless connections, Bluetooth is used to exchange data between fixed and mobile devices. This way, portable devices and other digital devices can connect to the internet through wireless connections, without the need for wires or cables. |
| P2P | Peer-to-peer (P2P) networking is a distributed application architecture that partitions tasks or workloads between peers. P2P is a networking or network type that is formed by peer computational models at the application layer. |
| RTP | The Real-time Transport Protocol (RTP) is a network protocol for end-to-end (E2E) real-time data transmission. For example, deliver interactive audio and video or analog data over multicast or unicast networks. RTP is widely used in communication and entertainment systems that involve streaming media, such as telephone, video conferencing, television services, and web-based push-to-talk features. |
| Socket | A socket is an endpoint of a two-way communication link between two programs running on a network. A communication link involves at least two sockets, each of which is bound to a port number. In essence, a socket refers to an application programming interface (API) that is provided to programmers for network development during Transmission Control Protocol (TCP)/IP encapsulation. |
| MQTT | Message Queuing Telemetry Transport (MQTT) is a publish-subscribe-based messaging protocol that IBM has developed. MQTT supports all the platforms and can connect most IoT products to the external environment. It is used as a communication protocol for sensors and brakes. |

## Hardware

| Term | Description |
|------|-------------|
| I/O pin and GPIO | Indicates the pins on the module, which is the input/output channel. GPIO refers to a general-purpose input/output pin. |
| Pin | A pin links the internal circuit of an integrated circuit (chip) to an external circuit. All pins of a chip form interfaces of the chip. |
| AC-DC power module | An AC-DC power module provides a constant current in the circuit, including dry cells, storage batteries, and DC generators. |
| LDO | A low-dropout linear regulator (LDO) is a DC linear voltage regulator that can regulate the output voltage even when the supply voltage is very close to the output voltage. |
| Development board | A development board is a circuit board that assists embedded system development. |
| PCB | A printed circuit board (PCB) mechanically supports and electrically connects electrical or electronic components using conductive tracks, pads, and other features etched from one or more sheet layers of copper laminated onto and/or between sheet layers of a non-conductive substrate. |
| PCBA/PCB'A | Printed circuit board assembly (PCBA) is the overall process of placing components onto a blank PCB using surface-mount technology (SMT), and then through-hole mounting dual in-line packages (DIPs) into the PCB. Developers in China usually use PCBA, whereas the standard spelling is PCB'A in Europe and America. |
| Antenna interface | An antenna is a hardware component that receives and transmits signals through wireless connections. Typical antennas PCB antennas, helical antennas, ceramic chip antennas, FPC antennas with I-PEX connectors, and rod-shaped copper antennas. |
| Antenna gain | Antenna gain is the ratio of the power density of the actual antenna signal to the ideal radiation unit at the same point in space, given equal input power. Antenna gain quantitatively describes how well an antenna converts input power to radio waves headed in a specified direction. |
| Receiving sensitivity | Receiving sensitivity is a measure of the minimum signal level that the receiver can recover demodulation. This value is a negative number. The smaller the value, the better the receiver performance. |

## Embedded Programming

| Term | Description |
|------|-------------|
| SDK | A software development kit (SDK) contains the documents, examples, and tools required to develop software. Tuya provides free SDKs to encourage developers to use their systems or languages. |
| Firmware | Firmware refers to programs written into the erasable programmable read-only memory (EROM) or electrically erasable programmable read-only memory (EEPROM). The firmware drives programs embedded in devices, for example, CD-ROM and CD-R. The firmware enables operating systems to drive devices based on standard device drivers. Firmware is the software that completes the most basic bottom-layer tasks of a system. |
| OTA | An OTA update is the wireless delivery of new software, firmware, or other data to connected smart devices. Firmware updates can be wireless or wired. Firmware over-the-air (FOTA) is a wireless update method. |
| Serial port | A serial port, also known as a serial communications port (generally referred to as a COM port), is an extended port that uses the serial communication mode. A serial port transfers one bit at a time. It features simple communication paths. A pair of transmission cables, for example, a pair of telephone lines, can enable two-way communications between two serial ports, greatly reducing communications costs. Serial ports specifically focus on long-range communication but with a low transmission speed. |
| UART | A universal asynchronous receiver/transmitter (UART) is a computer hardware device that converts parallel input signals to serial output signals. A UART is usually integrated into other communication interface devices, such as independent modular chips or peripherals integrated into microprocessors. |
| Serial communication protocol | Serial communication protocol enables a serial port to transmit and receive data on a per-bit basis. Although serial communication is slower than parallel communication in which data is exchanged by byte, a serial port can use one link to send data, and another link to receive data at the same time. Common serial communication protocols include RS-232, RS-422, and RS-485. |
| RTC | A real-time clock (RTC) is a device that is independent of the system timer. It is used to set the system clock and provide an alarm or periodic timer. |
| Arduino | Arduino is one of the most popular open source hardware products in the world, an excellent hardware development platform, and the trend of hardware development. With simple development, Arduino allows you to pay more attention to creative ideas and implementation, complete their project development more quickly, reduce learning costs, and shorten development cycles. |
| ADC | ADC stands for Analog-to-Digital Converter. It is a device that converts analog signals into digital signals. In embedded systems, ADCs are commonly used to read values from analog sensors such as temperature, humidity, and light sensors. |
| GPIO | GPIO stands for General-Purpose Input/Output. It is a basic interface in embedded systems used to control external devices, which can be configured as either input or output mode. |
| PWM | PWM stands for Pulse Width Modulation. It is a technique that controls output power by adjusting the duty cycle of a signal, commonly used for controlling motor speed, LED brightness, and other applications. |
| Timer | A timer is used to execute tasks at specific time intervals. In embedded systems, timers are commonly used to generate precise time delays, measure time intervals, or create periodic events. |
| Sleep | Sleep mode is a low-power state where a device suspends most functions to conserve energy. In embedded systems, sleep mode is commonly used to extend battery life. |
| SPI | SPI stands for Serial Peripheral Interface. It is a synchronous serial communication protocol commonly used to connect microcontrollers with external devices such as sensors and memory. |
| I2C | I2C stands for Inter-Integrated Circuit. It is a synchronous serial communication protocol commonly used to connect microcontrollers with external devices such as sensors and memory. |
| I2S | I2S stands for Inter-IC Sound. It is a serial communication protocol used for audio data transmission, commonly used to connect audio devices such as speakers and microphones. |
| DVP | DVP stands for Digital Video Port. It is an interface used for transmitting digital video signals, commonly used to connect video devices such as cameras. |



## Cloud Development

| Term | Description |
|------|-------------|
| Tuya Cloud | The device management hub for Tuya's global deployment. This hub connects to Powered by Tuya (PBT) devices through southbound interfaces and communicates with IoT applications through northbound interfaces. |
| Cloud project | The unit of your data storage. All kinds of development permissions and data are managed based on the cloud projects. |
| Cloud service | A collection of OpenAPIs that can be called to implement features in a specific scenario. |
| Link | During cloud integration, you can link existing apps, PIDs, and other business data with a cloud project. |
| accessId and accessKey | Also known as a cloud application key pair. After a cloud application is created in the cloud development section of the platform, accessId and accessKey are generated automatically in the background. |

## Common Terms

| Term | Description |
|------|-------------|
| PID | Stands for the product ID. Each product created on the platform is assigned a unique PID. |
| UUID | Stands for Universally Unique Identifier. In Tuya's smart product development, UUID serves as the unique identification ID for devices. AuthKey is the authentication key required for device registration in the cloud, forming a one-to-one matching relationship with UUID. The UUID length is 20 characters, while AuthKey is 32 characters. The UUID remains unchanged regardless of repeated activation or network configuration operations. PID, UUID, and AuthKey are often referred to as the "device triplet". |
| DeviceID | The ID assigned by the cloud each time a device is activated and configured for network connection. It links to actual user device data associated with accounts and apps after network configuration. The DeviceID may change in specific scenarios (e.g., when a user enters the device properties page in the app, clicks "Unbind and Clear Data" in the top-right corner) and requires reconfiguration/reactivation. |
| API | Application programming interfaces (APIs) are predefined functions that enable application programs and developers to access the library based on software or hardware. |
| Cloud API | Cloud APIs enable you to use a cloud application programming interface that has a service delivered by cloud service providers. |