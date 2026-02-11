# 概述

[Arduino-TuyaOpen](https://github.com/tuya/arduino-TuyaOpen/tree/main) 是涂鸦针对 Arduino 平台提供的开源开发框架，让众多喜欢 Arduino 的开发者可以快速开发出基于涂鸦云平台的 AIoT 智能设备，实现远程 AI 智能控制。

Arduino-TuyaOpen 基于 [TuyaOpen](https://github.com/tuya/TuyaOpen) 框架二次开发，提供了更简洁的 Arduino 风格 API 接口，方便用户快速开发。它基于 Arduino 通用接口设计，支持 Bluetooth、Wi-Fi、Ethernet 等通信协议，提供了物联网开发的核心功能，包括配网，激活，控制，升级等；它具备强大的安全合规能力，包括设备认证、数据加密、通信加密等，满足全球各个国家和地区的数据合规需求。

基于 TuyaOpen 开发的 AIoT 产品，可以使用涂鸦APP、云服务提供的强大生态能力，并与 Power By Tuya 设备互联互通。

同时 TuyaOpen 正在不断拓展，提供更多云平台接入功能，及语音、视频、AI Agent功能，Arduino-TuyaOpen 也会同步更新支持更多新的功能和特性。

## 支持的 Platform 芯片

| Platform  | Windows | Linux | macOS |
| :-------: | :-----: | :---: | :-----: |
|    T2     |    ✅    |   ✅   | ✅     |
|    T3     |    ✅    |   ✅   | ✅     |
| ESP32 |    ✅    |   ✅   | ✅     |
|   LN882H   |    ✅    |   ✅   | ✅     |
| TUYA-T5AI |    ✅    |   ✅   | ✅     |

## 能力

 - 集成主流的 LLMs 及 AI 平台，包括 `Deepseek`、`ChatGPT`、`Claude`、`Gemini` 等，支持多种 AI 能力调用(MCP、Skills等)。

 - 开发具备语音技术的硬件产品，如 `VAD`(语音活动检测),`AEC`(声学回声消除),`ASR`(自动语音识别),`TTS`(文本转语音),`KWS`(关键词唤醒)等功能。

 - 构建具备 `多模态 AI 能力` 的智能设备，包括文本、语音、视觉和基于传感器的功能。

 - 创建自定义产品，无缝连接至涂鸦云，实现远程设备控制。

 - 支持多种通信协议，包括 `Wi-Fi`、`Bluetooth` 和 `Ethernet`，满足不同应用场景需求。

 - 内置强大的 `安全合规`、`设备认证`、`数据加密`、`通信加密` 功能，确保设备和数据的安全性，符合全球各地的数据隐私法规。

 - 支持 Arduino 生态库，快速集成第三方传感器和模块，扩展设备功能。

## 仓库

- TuyaOpen：[tuya/TuyaOpen: Next-gen AI+IoT framework for T2/T3/T5AI/ESP32/and more – Fast IoT and AI Agent hardware integration](https://github.com/tuya/TuyaOpen)
- Arduino-TuyaOpen：[tuya/arduino-TuyaOpen: Arduino core for the T2/T3/T5](https://github.com/tuya/arduino-TuyaOpen)
