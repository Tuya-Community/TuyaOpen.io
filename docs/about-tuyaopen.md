---
title: About TuyaOpen
---

![TuyaOpen](https://images.tuyacn.com/fe-static/docs/img/c128362b-eb25-4512-b5f2-ad14aae2395c.jpg)


## Overview

TuyaOpen is an open source AI+IoT development framework designed for rapid creation of intelligent, connected devices. It supports multiple chip platforms and RTOS-like operating systems, enabling seamless integration of multimodal AI capabilities—including audio, video, and sensor data processing.

### 🚀 With TuyaOpen, you can:
- Develop hardware products featuring speech technologies such as `ASR` (Automatic Speech Recognition), `KWS` (Keyword Spotting), `TTS` (Text-to-Speech), and `STT` (Speech-to-Text)
- Integrate with leading LLMs and AI platforms, including `Deepseek`, `ChatGPT`, `Claude`, `Gemini`, and more.
- Build smart devices with `advanced multimodal AI capabilities`, including voice, vision, and sensor-based features
- Create custom products and seamlessly connect them to Tuya Cloud for `remote control`, `monitoring`, and `OTA updates`
- Develop devices compatible with `Google Home` and `Amazon Alexa`
- Design custom `Powered by Tuya` hardware
- Target a wide range of hardware applications using `Bluetooth`, `Wi-Fi`, `Ethernet`, and more
- Benefit from robust built-in `security`, `device authentication`, and `data encryption`


Whether you’re creating smart home products, industrial IoT solutions, or custom AI applications, TuyaOpen provides the tools and examples to get started quickly and scale your ideas across platforms.

---

### TuyaOpen SDK Framework
![TuyaOpen SDK Framework](https://images.tuyacn.com/fe-static/docs/img/25713212-9840-4cf5-889c-6f55476a59f9.jpg)


The TuyaOpen SDK adopts a layered architecture, consisting of the following five main layers:

---

#### 1. **TKL Kernel Layer**

- **Role**: This is the lowest layer of the architecture, responsible for basic hardware platform adaptation. It provides cross-hardware and cross-OS driver support for the upper layers, serving as the "hardware cornerstone" of the entire framework.
- **Main Components**:
  - **Hardware Platform SDKs**: Supports core SDKs for different chips/platforms, such as the Tuya T-Series MCU Core-SDK (Tuya’s self-developed MCU series), ESP32-Series IDF SDK (Espressif ESP32 series), and upcoming support for Raspberry Pi Pico.
  - **General Hardware Drivers**: Provides TKL drivers for common peripherals like PWM, ADC, DAC, GPIO, I2C, etc., abstracting hardware differences so upper layers do not need to handle hardware specifics.
  - **Heterogeneous Platform Adaptation**: Supports platforms requiring BSPs (Board Support Packages), such as ARM SoCs and Linux/Ubuntu, ensuring the architecture can run on various hardware types.
> Developers usually do not need to pay attention to the implementation details of this layer. TKL mainly maps and connects chip capabilities.

---

#### 2. **TAL Abstract Layer**

- **Role**: Sits above TKL, abstracting hardware and system differences to provide unified interfaces and basic capabilities for upper layers. It acts as a "bridge" between "underlying hardware" and "upper-layer software."
- **Main Components**:
  - **TuyaOpen API (OS+Device) Functional Modules**: Provides core system-level interfaces, covering memory management, logging, event/message/scheduling queues, time/timezone management, thread management, secure storage, TAL drivers, etc., supporting upper-layer concurrency, storage, and scheduling.
  - **Connectivity**: Responsible for device networking, supporting Wi-Fi, Ethernet, LTE Cat.1, Bluetooth, and more, enabling flexible network access.
  - **Security**: Ensures device and data security, providing security algorithms (encryption/decryption, etc.) and security engines (hardware/software-based).

---

#### 3. **Libraries Layer**

- **Role**: Based on the unified interfaces of TAL, this layer encapsulates various general-purpose libraries and protocols, providing "ready-to-use" capability components for the "Services" and "Applications" layers above.
- **Main Components**:
  - **Networking Protocols**: Supports MQTT (mainstream IoT protocol), mbedTLS (secure transmission), HTTP, WebSocket, meeting device networking and data transmission needs.
  - **Resource Managers**: Manages core resources such as AI Service Manager/APIs, Display Manager, and Audio Manager.
  - **Multimedia Protocols**: Supports P2P (peer-to-peer), RTSP/RTP (streaming media), and more, empowering audio and video applications.
  - **Miscellaneous Tools**: Provides LVGL GUI (embedded graphical interface), cJSON (JSON parsing), QR Code processing, etc., covering a wide range of scenarios.

---

#### 4. **Services Layer**

- **Role**: Builds on the capabilities of the Libraries layer, encapsulating higher-level services and development tools to reduce the complexity of application development. It is the direct support layer for "application innovation."
- **Main Components**:
  - **Cross-Platform Dev Tools**: Offers multi-tech stack development support, such as TuyaOpen SDK (C/C++), "tos.py" helper tool, Arduino IDE, Lua, and MicroPython.
  - **Tuya Cloud Services**: Core Tuya cloud capabilities, including AI Agent, Multi-Model (Audio/Video), Cloud ASR/VAD (cloud-based speech processing), IoT PaaS (IoT platform services), as well as LLM Model (large language models), RAG (retrieval-augmented generation), and Tuya AI+IoT Cloud (AI and IoT integrated cloud).
  - **Peripherals Drivers**: Also known as Tuya Device Drivers (TDD), supporting buttons, LEDs, displays, audio codecs, ADC, SPI, and other hardware interfaces.
  - **Audio ASR**: Focused on speech processing, including VAD (voice activity detection), DOA (direction of arrival, planned), AEC (echo cancellation), Beam-forming (planned), Wake-Word detection, and more.

---

#### 5. **Applications Layer (User Applications)**

- **Role**: The topmost layer of the architecture, directly targeting business scenarios and end applications. It integrates all lower-layer capabilities to support product implementation across multiple domains.
- **Typical Scenarios**:
  - Industrial
  - Outdoor
  - Vision
  - Audio
  - AI Agent
  - Robot
  - Exercise & Health
  - Security & Video Surveillance
  - Smart Home
  - Entertainment
  - Others

---

> **Core Advantages of Layered Design**: The lower layers flexibly adapt to hardware, the middle layers provide reusable capabilities, and the upper layers can rapidly develop standardized services, enabling "develop once, deploy everywhere" and accelerating the implementation of IoT and AI applications.
---

---


## Supported chipset platforms

| Platform | Windows | Linux | macOS |
| :------: | :-----: | :---: | :---: |
| BK7231N | ⌛️ | ✅ | ⌛️ |
| ESP32 | ✅ | ✅ | ✅️ |
| ESP32-C3 | ✅ | ✅ | ✅️ |
| ESP32-S3 | ✅ | ✅ | ✅️ |
| LN882H | ⌛️ | ✅ | ⌛️ |
| T2 | ⌛️ | ✅ | ⌛️ |
| T3 | ⌛️ | ✅ | ⌛️ |
| T5AI | ✅ | ✅ | ✅ |
| Ubuntu | ➖ | ✅ | ➖ |

- ✅: Already supported.
- ⌛️: To be supported soon.
- ➖: Not supported.

## Contribute code

If you are interested in TuyaOpen and wish to participate in its development as a code contributor, please first review the [Contribution Guide](./contribute/contribute-guide.md).

## Related links

- [TuyaOpen for C](https://github.com/tuya/TuyaOpen)
- [TuyaOpen for Arduino](https://github.com/tuya/arduino-TuyaOpen)
- [TuyaOpen for LuaNode](https://github.com/tuya/luanode-TuyaOpen)

### Gitee mirroring

- C for TuyaOpen: [https://gitee.com/tuya-open/TuyaOpen](https://gitee.com/tuya-open/TuyaOpen)
- Arduino for TuyaOpen: [https://gitee.com/tuya-open/arduino-TuyaOpen](https://gitee.com/tuya-open/arduino-TuyaOpen)
- Luanode for TuyaOpen: [https://gitee.com/tuya-open/luanode-TuyaOpen](https://gitee.com/tuya-open/luanode-TuyaOpen)


## Updates and Releases

TuyaOpen is currently in rapid development phase, and we follow the following release strategy:

### Version Branch Description

- **release**: Stable version, recommended for production environments
- **master**: Beta version, suitable for early adopters
- **dev**: Development version, contains latest features but may have instability

### Release Cycle

- **Stable Version**: Release a stable version every 1-2 months
- **Beta Version**: Every Wednesday, after thorough testing, merge dev branch to master branch

### Version Selection Recommendations

- **Production Environment**: Recommend using release version for stability
- **Development Testing**: Can use master version to experience latest features
- **Feature Preview**: Can choose dev version, but be aware of potential instability

Please follow our [TuyaOpen Release Roadmap](/docs/maintenance-and-releases) for the latest release information!
