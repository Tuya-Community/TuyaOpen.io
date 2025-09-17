---
title: 关于 TuyaOpen
---

![TuyaOpen](https://images.tuyacn.com/fe-static/docs/img/c128362b-eb25-4512-b5f2-ad14aae2395c.jpg)

## 概述

TuyaOpen 是一个开源的 AI+IoT 开发框架，旨在帮助开发者快速创建智能互联设备。它支持多种芯片平台和类 RTOS 操作系统，能够无缝集成多模态 AI 能力，包括音频、视频和传感器数据处理。

### 🚀 使用 TuyaOpen，你可以：
- 开发具备语音技术的硬件产品，如 `ASR`（Automatic Speech Recognition）、`KWS`（Keyword Spotting）、`TTS`（Text-to-Speech）、`STT`（Speech-to-Text）
- 集成主流 LLMs 及 AI 平台，包括 `Deepseek`、`ChatGPT`、`Claude`、`Gemini` 等
- 构建具备 `多模态AI能力` 的智能设备，包括文本、语音、视觉和基于传感器的功能
- 创建自定义产品，并无缝连接至涂鸦云，实现 `远程控制`、`监控` 和 `OTA 升级`
- 开发兼容 `Google Home` 和 `Amazon Alexa` 的设备
- 设计自定义的 `Powered by Tuya` 硬件
- 支持广泛的硬件应用，包括 `蓝牙`、`Wi-Fi`、`以太网` 等多种连接方式
- 受益于强大的内置 `安全性`、`设备认证` 和 `数据加密` 能力

无论你是在开发智能家居产品、工业 IoT 解决方案，还是定制 AI 应用，TuyaOpen 都能为你提供快速入门和跨平台扩展的工具与示例。

---

### TuyaOpen SDK 框架
![TuyaOpen SDK 框架](https://images.tuyacn.com/fe-static/docs/img/25713212-9840-4cf5-889c-6f55476a59f9.jpg)

---

## 支持 Platform

| Platform | Windows | Linux | macOS |
| :------: | :-----: | :---: | :---: |
| BK7231N  |    ⌛️    |   ✅   |   ⌛️   |
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
