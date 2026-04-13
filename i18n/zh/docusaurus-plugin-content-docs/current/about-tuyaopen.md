---
title: 关于 TuyaOpen
---

![TuyaOpen](https://images.tuyacn.com/fe-static/docs/img/c128362b-eb25-4512-b5f2-ad14aae2395c.jpg)

## 概述

TuyaOpen 赋能下一代 AI 智能体硬件：以灵活跨平台 C/C++ SDK 支持 涂鸦T系列 WIFI/蓝牙芯片、树莓派、ESP32 等设备，搭配涂鸦云低延迟多模态 AI（拖拽工作流），集成顶尖模型，简化开放式 AI-IoT 生态搭建。

![TuyaOpen One Pager](https://images.tuyacn.com/fe-static/docs/img/207eb9a0-5583-4f04-a71d-1917cbefc5ba.png)


### 🚀 使用 TuyaOpen，你可以：
- 开发具备语音技术的硬件产品，如 `ASR`（Automatic Speech Recognition）、`KWS`（Keyword Spotting）、`TTS`（Text-to-Speech）、`STT`（Speech-to-Text）。
- 集成主流 LLMs 及 AI 平台，包括 `Deepseek`、`ChatGPT`、`Claude`、`Gemini` 等。
- 构建具备 `多模态 AI 能力` 的智能设备，包括文本、语音、视觉和基于传感器的功能。
- 创建自定义产品，并无缝连接至涂鸦云，实现 `远程控制`、`监控` 和 `OTA 升级`。
- 开发兼容 `Google Home` 和 `Amazon Alexa` 的设备。
- 设计自定义的 `Powered by Tuya` 硬件。
- 支持广泛的硬件应用，包括 `蓝牙`、`Wi-Fi`、`以太网` 等多种连接方式。
- 受益于强大的内置 `安全性`、`设备认证` 和 `数据加密` 能力。

无论您是在开发智能家居产品、工业 IoT 解决方案，还是定制 AI 应用，TuyaOpen 都能为您提供快速入门和跨平台扩展的工具与示例。

---

### TuyaOpen SDK 框架

![TuyaOpen SDK 框架](https://images.tuyacn.com/fe-static/docs/img/25713212-9840-4cf5-889c-6f55476a59f9.jpg)

TuyaOpen SDK 采用分层架构，主要包括以下五个层级：

---

#### **TKL Kernel Layer（TKL 内核层）** 


- **定位**：架构的最底层，负责硬件平台的基础适配，为上层提供跨硬件、跨操作系统的驱动支持，是整个架构的 “硬件基石”。
- **主要内容**：
  - **硬件平台 SDK**：支持不同芯片/平台的核心 SDK，如 Tuya T-Series MCU Core-SDK（涂鸦自研 MCU 系列）、ESP32-Series IDF SDK（乐鑫 ESP32 系列），以及即将支持的 Raspberry Pi Pico。
  - **通用硬件驱动**：提供 PWM、ADC、DAC、GPIO、I2C 等通用外设的 TKL 驱动，屏蔽硬件差异，让上层无需关注具体硬件细节。
  - **异构平台适配**：支持需 BSP（板级支持包）的平台（如 ARM SoCs、Linux/Ubuntu），确保架构能在多类硬件上运行。
>开发者通常无需关注此层的具体实现细节，这里 TKL 大多是芯片能力的对接和映射。
---

#### **TAL Abstract Layer（TAL 抽象层）**

- **定位**：位于 TKL 之上，抽象硬件与系统差异，为上层提供统一的接口与基础能力，是连接 “底层硬件” 与 “上层软件” 的 “中间桥梁”。
- **主要内容**：
  - **TuyaOpen API（OS + Device）功能组件**：提供系统级核心接口，涵盖内存管理、日志、事件/消息/调度队列、时间/时区管理、线程管理、安全存储、TAL 驱动等，支撑上层的并发、存储、调度等基础能力。
  - **Connectivity（连接性）**：负责设备联网，支持 Wi-Fi、Ethernet、LTE Cat.1、Bluetooth 等多种连接方式，让设备能灵活接入网络。
  - **Security（安全）**：保障设备与数据安全，提供 Security Algorithms（加密/解密等安全算法）和 Security Engine（硬件/软件级安全引擎）。

---

#### **Libraries（库层）**

- **定位**：基于 TAL 的统一接口，封装各类通用库与协议，为上层 “服务层” 和 “应用层” 提供 “即拿即用” 的能力组件。
- **主要内容**：
  - **Networking Protocols（网络协议）**：支持 MQTT（物联网主流协议）、mbedTLS（安全传输）、HTTP、WebSocket，满足设备联网、数据传输的协议需求。
  - **Resource Managers（资源管理器）**：管理核心资源，如 AI Service Manager/APIs（AI 服务管理）、Display Manager（显示资源）、Audio Manager（音频资源）。
  - **Multimedia Protocols（多媒体协议）**：支持 P2P（点对点传输）、RTSP/RTP（流媒体）等，赋能音视频类应用。
  - **Miscellaneous（工具库）**：提供 LVGL GUI（嵌入式图形界面）、cJSON（JSON 解析）、QR Code（二维码处理）等，覆盖多类场景需求。

---

#### **Services（服务层）**

- **定位**：基于 Libraries 的能力，封装更高级的服务与开发工具，降低应用层的开发复杂度，是 “应用创新” 的直接支撑层。
- **主要内容**：
  - **Cross-Platform Dev Tools（跨平台开发工具）**：提供多技术栈的开发支持，如 TuyaOpen SDK（C/C++）、“tos.py” 辅助工具、Arduino IDE、Lua、MicroPython。
  - **Tuya Cloud Services（涂鸦云服务）**：涂鸦核心云能力，涵盖 AI Agent（AI 智能体）、Multi-Model（Audio/Video）（音视频多模型）、Cloud ASR/VAD（云端语音处理）、IoT PaaS（物联网平台服务），以及 LLM Model（大语言模型）、RAG（检索增强生成）、Tuya AI+IoT Cloud（AI 与 IoT 融合云）等。
  - **Peripherals Drivers（外设驱动）**：即 Tuya Device Drivers (TDD)，支持按钮、LED、显示屏、音频编解码及 ADC、SPI 等硬件接口。
  - **Audio ASR（音频 ASR）**：专注语音处理，包含 VAD（语音活动检测）、DOA（声源定位 *计划中）、AEC（回声消除）、Beam-forming（波束成形 *计划中）、Wake-Word（唤醒词）等能力。

---

#### **Applications（应用层-用户应用）**

- **定位**：作为架构的最上层，直接面向业务场景与终端应用，整合下层所有能力，支撑多领域产品落地。
- **典型场景**：
  - 工业（Industrial）
  - 户外（Outdoor）
  - 视觉（Vision）
  - 音频（Audio）
  - AI 智能体（AI Agent）
  - 机器人（Robot）
  - 运动健康（Exercise & Health）
  - 安全与视频监控（Security & Video Surveillance）
  - 智能家居（Smart Home）
  - 娱乐（Entertainment）
  - 其他领域（Others）

---

> **分层设计的核心优势**：底层灵活适配硬件，中间层能力可复用，上层应用能快速基于标准化服务开发，实现“一次开发，多端部署”，加速物联网与 AI 应用的落地。
---

## 支持 Platform 芯片

| Platform | Windows | Linux | macOS |
| :------: | :-----: | :---: | :---: |
| BK7231X  |    ⌛️    |   ✅   |   ⌛️   |
|  ESP32   |    ✅    |   ✅   |   ✅️   |
| ESP32-C3 |    ✅    |   ✅   |   ✅️   |
| ESP32-S3 |    ✅    |   ✅   |   ✅️   |
|  LN882H  |    ⌛️    |   ✅   |   ⌛️   |
|    T2    |    ⌛️    |   ✅   |   ⌛️   |
|    T3    |    ⌛️    |   ✅   |   ⌛️   |
|   T5AI   |    ✅    |   ✅   |   ✅️   |
|  Ubuntu  |    ➖    |   ✅   |   ➖   |

- ✅：已支持
- ⌛️：暂未支持
- ➖：不支持

## 贡献代码

如果您对 TuyaOpen 感兴趣，并希望参与 TuyaOpen 的开发并成为代码贡献者，请先参阅 [贡献指南](./contribute/contribute-guide.md)。

## TuyaOpen 相关链接

- C 版 TuyaOpen：[https://github.com/tuya/TuyaOpen](https://github.com/tuya/TuyaOpen)
- Arduino 版 TuyaOpen：[https://github.com/tuya/arduino-TuyaOpen](https://github.com/tuya/arduino-TuyaOpen)
- Luanode 版 TuyaOpen：[https://github.com/tuya/luanode-TuyaOpen](https://github.com/tuya/luanode-TuyaOpen)

### gitee 镜像

- C 版 TuyaOpen：[https://gitee.com/tuya-open/TuyaOpen](https://gitee.com/tuya-open/TuyaOpen)
- Arduino 版 TuyaOpen：[https://gitee.com/tuya-open/arduino-TuyaOpen](https://gitee.com/tuya-open/arduino-TuyaOpen)
- Luanode 版 TuyaOpen：[https://gitee.com/tuya-open/luanode-TuyaOpen](https://gitee.com/tuya-open/luanode-TuyaOpen)

## 更新与发布

TuyaOpen 目前处于快速开发阶段，我们遵循以下发布策略：

### 版本分支说明

- **release**：稳定版本，推荐生产环境使用
- **master**：测试版本，适合尝鲜用户
- **dev**：开发版本，包含最新功能但可能存在不稳定因素

### 发布周期

- **稳定版本**：每 1-2 个月发布一个 release 版本
- **测试版本**：每周三经过充分测试后，将 dev 分支合并到 master 分支

### 版本选择建议

- **生产环境**：建议使用 release 版本，确保稳定性
- **开发测试**：可使用 master 版本体验最新功能
- **功能尝鲜**：可选择 dev 版本，但需注意可能存在的不稳定性

请关注我们的 [TuyaOpen 发布计划](/docs/maintenance-and-releases) 获取最新发布信息！
