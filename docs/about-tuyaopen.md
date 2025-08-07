---
title: About TuyaOpen
---

![TuyaOpen](https://images.tuyacn.com/fe-static/docs/img/c128362b-eb25-4512-b5f2-ad14aae2395c.jpg)

## Overview

TuyaOpen stands out as an open-source framework for AIoT development, built on top of the proven commercial-grade TuyaOS IoT system. TuyaOpen delivers cross-platform architecture, component-based design, and enterprise-grade security compliance, all rigorously validated through global deployment across hundreds of millions of devices and millions of users.

TuyaOpen integrates an on-device AI inference engine, supports the Tuya Cloud AI Agent Hub, and enables device-cloud integrated multimodal AI capabilities. You can seamlessly access compliant Chinese LLMs (such as DeepSeek, Qwen, and Doubao) or integrate global AI services (such as ChatGPT, Claude, and Gemini) through unified API toolkits for text/voice interactions and image/video generation.

Additionally, TuyaOpen supports popular open-source hardware/software ecosystems in the industry. You can effortlessly port projects to any chipset and deploy solutions on any development board. This accelerates AI innovation prototyping to production-ready deployment via Tuya's certified hardware partners.

## Supported platforms

| Platform | Windows | Linux | macOS |
| :------: | :-----: | :---: | :---: |
| BK7231N | ⌛️ | ✅ | ⌛️ |
| ESP32 | ✅ | ✅ | ⌛️ |
| ESP32-C3 | ✅ | ✅ | ⌛️ |
| ESP32-S3 | ✅ | ✅ | ⌛️ |
| LN882H | ⌛️ | ✅ | ⌛️ |
| T2 | ⌛️ | ✅ | ⌛️ |
| T3 | ⌛️ | ✅ | ⌛️ |
| T5AI | ✅ | ✅ | ⌛️ |
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

Please follow our [TuyaOpen Related Links](#related-links-of-tuyaopen) for the latest release information!
