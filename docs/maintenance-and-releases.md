---
title: Roadmap & Releases
description: Comprehensive information about TuyaOpen maintenance frequency, SDK releases, platform support, roadmap, and release notes.
---

# Roadmap & Releases

This page provides comprehensive information about TuyaOpen's maintenance schedule, release cycles, platform support, and development roadmap.

## Maintenance Plan

### TuyaOpen OS Core (C/C++)

TuyaOpen follows a structured maintenance plan to ensure reliability and continuous improvement:

- **Active Development**: Ongoing development with daily code commits.
- **Bug Fixes**: Critical bugs are resolved within 24-48 hours. Submit issues and feedback via [Github Issue](https://github.com/tuya/TuyaOpen/issues).
- **Feature Updates**: New features are released every two weeks.
- **Major Releases**: Major versions with significant new features are released quarterly.

### Feature Requests?
- **New Chip Hardware Support**: We continuously evaluate and introduce support for new chips based on community needs, product roadmap, and technical feasibility.
- **New Peripheral & Driver Support**: The R&D team actively expands device and peripheral diversity, regularly introducing new drivers. Community partners are welcome to contribute device drivers or capability components to the ecosystem.

## Platform Support Plan

### SDK Support Plan

| SDK             | Activity (Update Frequency) | Description |
|-----------------|----------------------------|-------------|
| **C/C++**       | Highly active - daily dev   | Full support for mainstream embedded platforms and chips, continuous optimization and expansion |
| **Arduino**     | Supported, slower updates   | Supports Arduino IDE, compatible with Tuya T series and ESP boards, follows Tuya Cloud/AI SDK version upgrades |
| **Lua**         | Supported, slower updates   | Adapted for mainstream Lua platforms, suitable for various embedded scenarios |
| **MicroPython** | Planned, not started yet    | Planned support for major MicroPython firmware and boards (e.g., ESP32, T5AI) for Python-based embedded and Tuya Cloud integration |

### Chip Platform Support

Our chip platform support is regularly updated and maintained:

| Chip Platform         | Support Status | Activity (Update Frequency) | Notes |
|----------------------|----------------|-----------------------------|-------|
| **MCU T5AI**         | ✅ Active      | Highly active               |       |
| **MCU T2/T3**        | ✅ Active      | Actively maintained         |       |
| **MCU BK7231N**      | ✅ Active      | Regular maintenance         |       |
| **MCU LN882H**       | ✅ Active      | Regular maintenance         |       |
| **MCU ESP32 Series** | ✅ Active      | Regular maintenance         |       |
| **SoC ARM Cortex-A** | 🚧 Beta        | In development, try on master branch | Mainly supports networking and Tuya IoT PaaS cloud connection and cloud AI capabilities. This platform's hardware architecture differs significantly from MCU series; users need to develop DTS device trees for peripheral integration. |
| **SoC Raspberry Pi 5** | 🚧 Beta      | In development              | Mainly supports networking and Tuya IoT PaaS cloud connection and cloud AI capabilities. Hardware driver architecture differs from MCU series; users need to develop DTS device trees for peripherals. Given Raspberry Pi's rich peripheral ecosystem and predefined 40P expansion, refer to official hardware docs for device integration before connecting to cloud services. |
| **Ubuntu**           | ✅ Active      | Actively maintained         | Mainly supports networking and Tuya IoT PaaS cloud connection and cloud AI capabilities. |

## Development Roadmap
## Todos
- [ ] T5 series chip SMP CPU architecture support
- [ ] Support for more mainstream SoC chip platforms (Raspberry Pi/Rockchip/Allwinner, etc.)
- [ ] TuyaOpen DVP camera and video modality support optimization
- [ ] Third-party ecosystem development board collaboration
- [ ] AI SDK 3.0 cloud API version upgrade
- [ ] Official cloud development example tutorials
- [ ] Tuya Pocket open source project, official release. Showcases all T5 hardware capabilities
- [ ] Enrich official peripheral and driver library
- [ ] Raspberry Pi, Bluetooth BlueZ integration for Bluetooth provisioning
- [ ] SoC ALSA library HAL integration, supporting for AI and ASR capabilities (CPU KWS and VAD)
- [ ] USB/AT 4G Cat.1 cellular module support
- [ ] Third-party cloud integration: direct connection to Doubao/Coze, and Ali Bailian
- [ ] Support ASR LLM to call NetEase Cloud Music

---

## TuyaOpen Release Notes

<details>
<summary><strong>v1.4.0 (June 27, 2024) - Latest Release</strong></summary>

**Build System & Cross-Platform Support:**
- Implemented Python-based build system architecture for enhanced cross-platform compatibility
- Extended T5AI and ESP32 chip series support on Linux, Windows, and macOS
- Introduced comprehensive build automation and dependency management

**Display & Graphics Engine:**
- Upgraded LVGL graphics library to v9.1.0, resolving GIF playback performance issues
- Implemented screen rotation with hardware acceleration support
- Enhanced display driver architecture, supporting QSPI and MCU8080 interfaces
- Integrated three new display drivers: SPI ST7305, QSPI ST7735S, and MCU8080_ST7796
- Optimized monochrome display driver compatibility for embedded applications

**Hardware Integration & Drivers:**
- Optimized IO expander XL9555 driver performance and reliability
- Enhanced hardware compatibility for DNESP32-BOX ES8311 and NS4168 development boards
- Resolved ESP32 platform compile warnings, improving code quality

**AI Applications & User Interface:**
- Released dual-eye screen emotion robot application with advanced AI features
- Enhanced chat_bot UI, optimizing emotion display and interaction modes

**Technical Improvements:**
- Refactored build system architecture for better maintainability
- Implemented comprehensive error handling and logging mechanisms
- Enhanced memory management and resource optimization

</details>

<details>
<summary><strong>v1.3.1 (June 9, 2024)</strong></summary>

**AI Applications & Robotics:**
- Integrated Otto robot AI application with advanced motion control algorithms
- Enhanced AI voice interaction, improved interrupt handling and response accuracy

**Development Tools & Environment:**
- Implemented comprehensive logging system for TuyaOpen and platform diagnostics
- Introduced dedicated Product IDs (PID) for T5AI/ESP32 development boards
- Released Docker-based build environment for consistent development workflows
- Added license burning feature for secure device configuration

**Hardware Integration & Performance:**
- Integrated LED peripheral driver components with advanced control features
- Optimized example project build methods for improved efficiency
- Enhanced ESP32 AI/IoT build system compatibility and stability
- Improved ESP32/T5AI display rendering performance and visual quality
- Fine-tuned audio processing algorithms for ESP32-S3 development boards

**System Architecture:**
- Simplified build process, enhanced dependency management
- Improved error reporting and debugging features
- Enhanced cross-platform compatibility and portability

</details>

<details>
<summary><strong>v1.3.0 (May 16, 2024)</strong></summary>

**AI Platform & Multimodal Features:**
- Integrated Tuya.AI 2.0 platform, enhancing multimodal processing for voice and video interaction
- Enabled ESP32S3 integration with Tuya.AI cloud services, providing advanced AI features
- Optimized interaction response time and processing efficiency

**Hardware Platform Support:**
- Extended T5AI board support: T5AI_Board, T5AI_EVB, and T5AI_MOJI
- Integrated four ESP32S3 development boards: ESP32 Breadboard, Atomic ESP32S3_BOX, Waveshare ESP32 1.8 AMOLED, Xingzhi Cube 0.96 OLED
- Enhanced hardware abstraction layer for improved device compatibility

**Application Integration & User Experience:**
- Resolved compatibility issues between ESP32 Tuya Cloud IoT and AI applications
- Enhanced your_chat_bot voice interaction experience, improving response accuracy and latency
- Upgraded your_chat_bot UI to support emoji display and enhanced visual feedback
- Implemented keyword wake-up and interrupt handling for natural conversation flow

**System Architecture:**
- Improved application isolation and resource management
- Enhanced cross-platform compatibility and portability
- Optimized memory usage and performance metrics

</details>

<details>
<summary><strong>v1.2.1 (May 6, 2024)</strong></summary>

**Platform Integration:**
- Achieved comprehensive ESP32S3 platform support with optimized performance
- Enhanced hardware abstraction layer for improved device compatibility

**AI Application Optimization:**
- Optimized your_chat_bot application for T5AI platform architecture
- Improved AI processing efficiency and response accuracy

**System Improvements:**
- Enhanced cross-platform compatibility and stability
- Improved resource management and memory optimization

</details>

<details>
<summary><strong>v1.2.0 (March 20, 2024)</strong></summary>

**AI Platform Integration:**
- Integrated Tuya.AI support for your_chat_bot AI application
- Implemented advanced natural language processing features

**Graphics & Display Framework:**
- Integrated LVGL graphics library demo for T5AI platform
- Enhanced visual rendering and UI components

**Development Framework:**
- Improved application development tools and APIs
- Enhanced debugging and analysis features

</details>

<details>
<summary><strong>v1.1.1 (February 28, 2024)</strong></summary>

**Audio & Multimedia Support:**
- Implemented comprehensive audio capture and playback for T5AI_Board
- Integrated advanced audio processing algorithms and codec support

**Display & Touch Interface:**
- Added SPI-TFT display driver support: ILI9341, ST7789, and GC9A01
- Integrated IIC touch chip drivers: GT911 and CST816X, enhancing user interaction

**Hardware Integration:**
- Implemented rotary encoder driver component with advanced control features
- Integrated LVGL components and examples for T3 platform
- Extended BK7231N and LN882H chip architecture support

**Development Tools & Security:**
- Updated TOS burning tool to support ESP32 series chip programming
- Upgraded Ninja build tool for improved build performance
- Added HTTPS client example for secure communication protocol support

</details>

<details>
<summary><strong>v1.1.0 (October 22, 2024)</strong></summary>

**Platform Support & Integration:**
- Achieved comprehensive T5 platform support with optimized performance
- Extended ESP32/ESP32C3 platform compatibility and feature set
- Integrated PlatformIO development environment for improved developer experience

**Security & Communication:**
- Upgraded TOS tool for enhanced security features and performance improvements
- Updated TLS component to support mbedTLS v3.5 for improved encryption security

**Development Framework:**
- Enhanced build system architecture and dependency management
- Improved cross-platform compatibility and portability

</details>

<details>
<summary><strong>v1.0.0 (August 30, 2024) - Initial Release</strong></summary>

**Core Platform Architecture:**
- Implemented TOS command-based build system for simplified development workflow
- Established T2/T3/Ubuntu platform support with comprehensive hardware abstraction

**Development Framework:**
- Introduced independent build method for example projects
- Implemented modular architecture for improved code organization and maintainability

**Connectivity & Cloud Integration:**
- Integrated comprehensive connectivity: Wi-Fi, Bluetooth, and wired modes
- Implemented Tuya Cloud integration for IoT device management and data sync
- Added onboard license reading for secure device authentication

**System Foundation:**
- Established core system architecture and API framework
- Implemented comprehensive error handling and logging mechanisms

</details>

## TuyaAI Platform / Tuya Cloud Service Release Notes

For the latest updates on TuyaAI platform capabilities and Tuya Cloud Service release announcements and details,  
##### please visit the official announcement page: ---> [Release Announcements & Update Notes](https://developer.tuya.com/cn/docs/iot/announcement-update?id=Ka5o4ytv9ihvq)

---

## Support & Maintenance

### Community Support Channels

- **WX/QQ (Chinese Community) / Discord (Global)**: Real-time technical support and interactive communication. Developers are welcome to join at any time.
- **GitHub Issues**: For submitting bug reports, feature requests, and technical questions. The development team will respond promptly.
- **Official Documentation**: Comprehensive development guides, API references, and practical tutorials to help you get started quickly and develop in depth.
- **Community Forum**: Open discussion area for developers to exchange experiences, answer questions, and share best practices.

## Software Version Access & Updates

### How to Get Updates & Upgrade

- **GitHub/Gitee Releases**: Download the latest official version directly, or use Git Clone/Git Pull to get the latest code.
- **Version History & Changelog**: See the repository Release page for details on each update.

### Release & Update Notifications

- **GitHub Watch/Star**: We recommend watching and starring the main repository to get notified of new releases and features.
- **Social Media & Official Channels**: Follow official accounts for real-time updates and important announcements.
    - China: WeChat Official Account, Official Website
    - International: Discord, YouTube, Official Website

---

*For the latest news and version information, please visit our [GitHub repository](https://github.com/tuya/TuyaOpen), or join the [Discord community](https://discord.gg/cbGrBjx7) to interact with developers worldwide.*
