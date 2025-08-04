---
title: 关于 TuyaOpen
---

![TuyaOpen](https://images.tuyacn.com/fe-static/docs/img/c128362b-eb25-4512-b5f2-ad14aae2395c.jpg)

## 概述

TuyaOpen 是一个面向 AIoT 行业的开源、开放的开发框架，基于成熟的商业级 IoT 系统 TuyaOS 构建而成。它继承了跨平台、跨系统、组件化和安全合规等核心特性，已通过全球亿级设备和百万级用户的实践验证。

TuyaOpen 集成了端侧 AI 推理引擎，支持涂鸦云智能体中枢，支持端云融合的多模态 AI 能力。开发者可以无缝调用国内合规的大模型（如 DeepSeek、通义千问、豆包）或灵活对接全球顶尖的 AI 服务（如 ChatGPT、Claude、Gemini）。通过多样化的工具生态，开发者能够实现文字和语音对话、图片生成、视频生成等多种 AI 功能。

此外，TuyaOpen 支持行业内主流的开源软硬件生态，开发者可以轻松地将项目移植和部署到任意芯片或开发板上。这不仅能让开发者快速体验 AI 技术带来的创新成果，更能有效缩短产品开发周期。

## 支持 Platform

| Platform | Windows | Linux | macOS |
| :------: | :-----: | :---: | :---: |
| BK7231N  |    ⌛️    |   ✅   |   ⌛️   |
|  ESP32   |    ✅    |   ✅   |   ⌛️   |
| ESP32-C3 |    ✅    |   ✅   |   ⌛️   |
| ESP32-S3 |    ✅    |   ✅   |   ⌛️   |
|  LN882H  |    ⌛️    |   ✅   |   ⌛️   |
|    T2    |    ⌛️    |   ✅   |   ⌛️   |
|    T3    |    ⌛️    |   ✅   |   ⌛️   |
|   T5AI   |    ✅    |   ✅   |   ⌛️   |
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

请关注我们的 [TuyaOpen 相关链接](#tuyaopen-相关链接) 获取最新发布信息！
