---
title: Technical Roadmap & Releases
description: Comprehensive information about TuyaOpen maintenance frequency, SDK releases, platform support, roadmap, and release notes.
---

# Technical Roadmap & Releases

This topic walks you through the TuyaOpen maintenance plan, release cycle, platform support, and development roadmap.

## Maintenance plan

### TuyaOpen OS core (C/C++)

TuyaOpen follows a structured maintenance plan to ensure reliability and continuous improvement:

- **Active development**: Ongoing development with daily code commits.
- **Bug fixes**: Critical bugs are resolved within 24 to 48 hours. You can report issues and provide feedback via [GitHub Issues](https://github.com/tuya/TuyaOpen/issues).
- **Feature updates**: New features are released every two weeks.
- **Major releases**: Major versions with significant new features are released quarterly.

### New feature requests

Have suggestions for the project? You're welcome to [join the discussion](https://github.com/tuya/TuyaOpen/discussions).
- **New chip support**: Tuya continuously evaluates and introduces support for new chips based on community demand, product roadmap priorities, and technical feasibility.
- **New peripherals & driver support**: The R&D team consistently extends the diversity of supported devices and peripherals by actively integrating new drivers (updated regularly). **Community partners are also encouraged to participate in the ecosystem** by contributing device drivers or other capability components.
- **Third-party library (libs) support**: Tuya encourages community co-creation and welcomes contributions of third-party libraries that comply with open-source licenses such as the Apache License. All contributed libraries must meet open-source compliance requirements. While Apache License is preferred, libraries under other licenses are acceptable provided license compatibility is verified and explicitly declared, thereby fostering a thriving ecosystem.

## Platform support plan

### SDK support plan

| SDK | Activity level (Update frequency) | Description |
|-----------------|------------------------|------|
| **C/C++** | Highly active - daily development | Supports popular embedded platforms and chips, with continuous optimization and extension. |
| **Arduino** | Supported, slow updates | Supports Arduino IDE, compatible with Tuya T-Series and ESP development boards, and continuously follows updates to the Tuya Cloud/AI SDK versions. |
| **Lua** | Supported, slow updates | Adapted for popular Lua platforms, suitable for various embedded application scenarios. |
| **MicroPython** | Planned, not yet initiated | It is planned to support popular MicroPython firmware and development boards (such as ESP32 and T5AI) to enable Python development for embedded systems and integration with Tuya Cloud. |

### Chip platform support

Tuya chip platforms are regularly updated and maintained.

| Chip platform | Support status | Activity level (Update frequency) | Remarks |
|------------------|------------|------------------------|-------|
| **MCU T5AI** | ✅ Active | Highly active | Ideal for: AI multimodal interaction, including audio, video, and text. |
| **MCU T2/T3** | ✅ Active | Actively maintained | Ideal for: AI text LLM + IoT capabilities, with advantages in low power scenarios. |
| **MCU BK7231N** | ✅ Active | Regularly maintained | - |
| **MCU LN882H** | ✅ Active | Regularly maintained | - |
| **MCU ESP32 series** | ✅ Active | Regularly maintained | - |
| **SoC ARM Cortex-A** | 🚧 Beta | Developing (Available on master branch) | Primarily supports networking, connection to the Tuya IoT PaaS cloud, and cloud AI capabilities. The hardware architecture differs significantly from the MCU series. Users need to develop DTS device trees for peripheral integration. |
| **SoC Raspberry Pi 5** | 🚧 Beta | Developing | Primarily supports networking, connection to the Tuya IoT PaaS cloud, and cloud AI capabilities. The hardware driver architecture differs from the MCU series. Users need to develop DTS device trees for peripheral integration. Given the Raspberry Pi's rich peripheral ecosystem and predefined 40-pin extension, it is recommended to refer to the official hardware ecosystem documentation for device integration before connecting to cloud services. |
| **Ubuntu** | ✅ Active | Actively maintained | Primarily supports networking, connection to the Tuya IoT PaaS cloud, and cloud AI capabilities. |


## Development roadmap
## To-dos
- Enable SMP CPU architecture support for the T5 series chip.
- Extend support to popular SoC platforms (such as Raspberry Pi, Rockchip, and Allwinner).
- Optimize video modality capabilities for TuyaOpen DVP cameras.
- Establish partnerships with third-party development board ecosystems.
- Upgrade cloud APIs to AI SDK 3.0 specification.
- Publish cloud development tutorials on official portals.
- Launch the Tuya Pocket open source project with full T5 hardware demonstration.
- Enrich official peripheral and driver libraries.
- Implement BlueZ protocol for Bluetooth pairing on Raspberry Pi.
- Develop ALSA HAL layer to enable SoC-based ASR (CPU KWS/VAD).
- Integrate 4G Cat.1 cellular modules via USB/AT interfaces.
- Enable third-party cloud connections (Doubao, Coze, and Alibaba Bailian).
- Activate ASR-LLM integration with Netease Cloud Music services.


---

## TuyaOpen release notes

#### **2025**

<details>
<summary><strong>v1.5.0 (September 22, 2025) [Latest stable release]</strong></summary>

**T5AI platform and hardware support:**
- Enhanced the T5AI platform with full symmetric multiprocessing (SMP) architecture support, improving multi-core performance.
- Added support for multiple new official and ecosystem development boards, including `TUYA_T5AI_Pocket`, `TUYA_T5A_Core`, and `WAVESHARE_T5AI_TOUCH_AMOLED_1_75`, enriching the hardware ecosystem.
- Introduced the `tuya_t5_pocket` gaming console application to showcase T5AI hardware capabilities.

**Graphics and display:**
- Added support for the LVGL v8 graphics library, allowing users to flexibly switch between LVGL v9 and v8 to meet different project requirements.
- Launched the LVGL game application, featuring built-in classic games like 2048, Klotski (Hua Rong Dao), and Match-3 to enhance the interactive experience.

**AI and cloud applications:**
- Introduced the `camera_demo` demo, enabling camera integration with the Tuya Cloud and supporting various video sensor drivers and demos to extend AI vision capabilities.
- Added the `weather_get_demo` demo, which retrieves weather information in multiple formats via the Tuya Cloud, facilitating smart scenario development.

**Peripherals and driver extension:**
- Integrated multiple new T5AI DVP video sensor drivers and application examples, enhancing video capture and processing capabilities.
- Added IR remote control reception and transmission examples, supporting various IR remote control scenarios.
- Introduced drivers and application examples for RGB light beads like WS2812, enriching lighting control and creative applications.

</details>


<details>
<summary><strong>v1.4.0 (June 27, 2025)</strong></summary>

**Build system and cross-platform support:**
- Implemented a Python-based build system architecture to enhance cross-platform compatibility.
- Extended support for T5AI and ESP32 chip series on Linux, Windows, and macOS platforms.
- Introduced comprehensive build automation and dependency management.

**Display and graphics engine:**
- Upgraded the LVGL graphics library to v9.1.0, resolving GIF playback performance issues.
- Implemented screen rotation functionality with hardware acceleration support.
- Enhanced the display driver architecture to support QSPI and MCU8080 interfaces.
- Integrated three new display drivers: SPI ST7305, QSPI ST7735S, and MCU8080 ST7796.
- Optimized monochrome display driver compatibility for embedded applications.

**Hardware integration and drivers:**
- Improved the driver performance and reliability of the I/O extension chip XL9555.
- Enhanced hardware compatibility for the DNESP32-BOX ES8311 and NS4168 development boards.
- Resolved compilation warnings on the ESP32 platform, improving code quality.

**AI applications and user interface:**
- Released the dual-screen emotional robot application with advanced AI capabilities.
- Enhanced the `chat_bot` user interface, optimizing emotional display and interaction modes.

**Technical improvements:**
- Refactored the compilation system architecture to improve maintainability.
- Implemented a comprehensive error handling and logging mechanism.
- Enhanced memory management and resource optimization.

</details>

<details>
<summary><strong>v1.3.1 (June 9, 2025)</strong></summary>

**AI applications and robotics:**
- Integrated the Otto Robot AI application featuring advanced motion control algorithms.
- Enhanced AI voice interaction with improved interrupt handling and response accuracy.

**Development tools and environment:**
- Implemented a comprehensive logging system for TuyaOpen and platform diagnostics.
- Introduced dedicated product IDs (PIDs) for T5AI/ESP32 development boards.
- Released a Docker-based build environment to ensure consistent development workflows.
- Added license flashing functionality for secure device configuration.

**Hardware integration and performance:**
- Integrated an LED peripheral driver component with advanced control capabilities.
- Optimized compilation methods for sample projects to improve build efficiency.
- Enhanced compatibility and stability of the ESP32 AI/IoT build system.
- Improved display rendering performance and visual quality for ESP32/T5AI platforms.
- Fine-tuned audio processing algorithms for the ESP32-S3 development board.

**System architecture:**
- Streamlined build processes with enhanced dependency management.
- Improved error reporting and debugging capabilities.
- Strengthened cross-platform compatibility and portability.

</details>

<details>
<summary><strong>v1.3.0 (May 16, 2025)</strong></summary>

**AI platform and multimodal capabilities:**
- Integrated the Tuya.AI 2.0 platform, enhancing multimodal processing capabilities for voice and video interactions.
- Enabled ESP32S3 integration with Tuya.AI cloud services to deliver advanced AI functionalities.
- Optimized interaction response time and processing efficiency.

**Hardware platform support:**
- Extended T5AI development board support for T5AI_Board, T5AI_EVB, and T5AI_MOJI.
- Integrated four ESP32S3 development boards: ESP32 Breadboard, Alientek ESP32S3_BOX, Waveshare ESP32 1.8" AMOLED, and Xingzhi Cube 0.96" OLED.
- Enhanced the hardware abstraction layer (HAL) to improve device compatibility.

**Application integration and user experience:**
- Resolved compatibility issues between ESP32 Tuya Cloud IoT applications and AI applications.
- Enhanced the `your_chat_bot` voice interaction experience, improving response accuracy and reducing latency.
- Updated the `your_chat_bot` user interface to support emotion display and enhanced visual feedback.
- Implemented keyword wake-up and interrupt handling to support natural conversation flow.

**System architecture:**
- Improved application isolation and resource management.
- Strengthened cross-platform compatibility and portability.
- Optimized memory usage and performance metrics.

</details>

<details>
<summary><strong>v1.2.1 (May 6, 2025)</strong></summary>

**Platform integration:**
- Achieved comprehensive ESP32S3 platform support with optimized performance.
- Enhanced the hardware abstraction layer (HAL) to improve device compatibility.

**AI application optimization:**
- Optimized the `your_chat_bot` application for the T5AI platform architecture.
- Improved AI processing efficiency and response accuracy.

**System improvements:**
- Strengthened cross-platform compatibility and stability.
- Improved resource management and memory optimization.

</details>

<details>
<summary><strong>v1.2.0 (March 20, 2025)</strong></summary>

**AI platform integration:**
- Integrated Tuya.AI support to power the `your_chat_bot` AI application.
- Implemented advanced natural language processing (NLP) capabilities.

**Graphics and display framework:**
- Integrated LVGL graphics library demos for the T5AI platform.
- Enhanced visual rendering capabilities and user interface components.

**Development framework:**
- Improved application development tools and APIs.
- Enhanced debugging and analytics capabilities.

</details>

<details>
<summary><strong>v1.1.1 (February 28, 2025)</strong></summary>

**Audio and multimedia support:**
- Implemented comprehensive audio capture and playback functionality for the T5AI_Board.
- Integrated advanced audio processing algorithms and codec support.

**Display and touch interface:**
- Added SPI-TFT screen driver support for ILI9341, ST7789, and GC9A01.
- Integrated I2C touch chip drivers for GT911 and CST816X, enhancing user interaction.

**Hardware integration:**
- Implemented a rotary encoder driver component with advanced control features.
- Integrated LVGL components and examples for the T3 platform.
- Extended support for BK7231N and LN882H chip architectures.

**Development tools and security:**
- Updated the TOS flashing tool to support ESP32 series chip flashing.
- Upgraded the Ninja build tool for improved build performance.
- Added HTTPS client examples supporting secure communication protocols.

</details>

#### **2024**

<details>
<summary><strong>v1.1.0 (October 22, 2024)</strong></summary>

**Platform support and integration:**
- Achieved comprehensive T5 platform support with optimized performance.
- Extended ESP32/ESP32C3 platform compatibility and feature set.
- Integrated the PlatformIO development environment to enhance the developer experience.

**Security and communication:**
- Upgraded the TOS tool with enhanced security features and performance improvements.
- Updated the TLS component to support Mbed TLS v3.5, improving cryptographic security.

**Development framework:**
- Enhanced the build system architecture and dependency management.
- Strengthened cross-platform compatibility and portability.

</details>

<details>
<summary><strong>v1.0.0 (August 30, 2024) [Initial release]</strong></summary>

**Core platform architecture:**
- Implemented a TOS command-based build system to streamline development workflows.
- Established T2/T3/Ubuntu platform support with comprehensive hardware abstraction.

**Development framework:**
- Introduced independent compilation methods for sample projects.
- Implemented a modular architecture to improve code organization and maintainability.

**Connectivity and cloud integration:**
- Integrated comprehensive connectivity support, including Wi-Fi, Bluetooth, and wired connection modes.
- Enabled Tuya Cloud integration for IoT device management and data synchronization.
- Added on-board license reading functionality for secure device authentication.

**System foundation:**
- Established the core system architecture and API framework.
- Implemented a comprehensive error handling and logging mechanism.

</details>


## TuyaAI platform/Tuya cloud service release notes
For information about TuyaAI platform capability updates and the latest Tuya Cloud Service release announcements and detailed updates, please visit the official announcement page: [Release announcements & update notes](https://developer.tuya.com/en/docs/iot/announcement-update?id=Ka5o4ytv9ihvq).

---

## Support and maintenance

### Community support channels

- **WeChat/Tencent QQ (in China)/Discord (Global)**: Receive real-time technical support and interactive communication. You are welcome to join at any time.
- **GitHub Issues**: Submit bug reports, feature suggestions, and technical questions. The development team responds promptly.
- **Official documentation**: Comprehensive development guides, API references, and practical tutorials to facilitate quick onboarding and in-depth development.
- **Community forum**: An open discussion area for you to share experiences, answer questions, and discuss best practices.

## Software version acquisition and updates

### Get and update versions

- **GitHub/Gitee releases**: Download the latest stable release directly, or get the newest code via Git Clone or Git Pull.
- **Version history and changelog**: Available on the repository's Releases page for tracking update contents.

### Release and update notifications

- **GitHub watch/star**: It is recommended to watch and star the main repository to receive immediate notifications for new versions and feature releases.
- **Social media and official channels**: Follow official accounts to get real-time updates and important announcements.
   - China region: WeChat official account and official website
   - International region: Discord, YouTube, and official website

---

*To access the latest updates and version information, please visit Tuya's [GitHub repository](https://github.com/tuya/TuyaOpen) or join the [Discord Community](https://discord.com/invite/yPPShSTttG) to interact with developers worldwide.*
