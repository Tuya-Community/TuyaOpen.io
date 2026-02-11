# TuyaAI API 开发

本文档介绍如何在 Arduino IDE 中使用 TuyaAI API 进行 AIoT 开发。TuyaAI 提供了一套简洁易用的接口，帮助开发者快速将 AI 能力集成到设备应用中。以下示例将由浅入深地引导您在 Arduino 上开发自己的 AIoT 设备。

```
TuyaAI (主类)
├── TuyaAI.UI      - UI 显示管理
├── TuyaAI.Audio   - 音频输入/输出
├── TuyaAI.MCP     - Model Context Protocol 工具扩展
└── TuyaAI.Skill   - 音乐、故事、情绪感知等技能
```

## 示例介绍

### 00_IoT_SimpleExample

基于涂鸦云的 IoT 开关示例。本示例演示了如何使用涂鸦 DP（Data Point）实现 `设备` - `云端` - `APP` 三方通信，通过手机 APP 控制板载 LED 的亮灭。

- 硬件平台：涂鸦兼容的开发板（T2、T3、T5AI、ESP32、LN882H 或 XH_WB5E 系列）
- [如何创建 PID、配置 DP 实现云端与设备通信](https://tuyaopen.ai/zh/docs/cloud/tuya-cloud/creating-new-product)

### 01_AI_TextChat

基于涂鸦云的 AI Agent 文本对话示例。本示例演示了如何通过串口与 AI Agent 进行文本交互——配网成功后，在 Arduino IDE 串口监视器中发送文本即可与 AI 对话，AI 的回复将以流式文本实时输出。

- 硬件平台：TUYA-T5AI 系列、ESP32 系列

### 02_AI_AudioChat

基于涂鸦云的 AI Agent 语音对话示例。本示例演示了如何通过麦克风和扬声器与 AI Agent 进行语音交互——配网成功后播放提示音，用户可通过唤醒词唤醒设备并进行对话。

- 默认为唤醒模式，可通过双击按键或修改 `TuyaAI.begin` 参数切换对话模式
- 唤醒词：你好涂鸦（Hey Tuya）
- 同时支持串口文本对话
- 硬件平台：仅支持 TUYA-T5AI 系列

### 03_AI_AudioSave

AIoT 设备音频数据录制示例。本示例演示了如何将麦克风采集的原始音频数据（PCM 格式）和云端 TTS 语音合成数据（MP3 格式）保存到 SD 卡，用于语音数据采集和离线分析。

- 硬件平台：SD 卡功能仅支持 T5AI-Board 开发板

### 04_AI_Mcp

AI Agent 的 MCP（Model Context Protocol）功能示例。本示例演示了如何在设备上注册 MCP 工具，使 AI Agent 在对话过程中能够调用设备端的本地工具。示例中注册了一个音量控制工具，用户可通过语音或文本让 AI 调节设备音量。

- 硬件平台：仅支持 TUYA-T5AI 系列

> **注意：** 涂鸦的 MCP 功能目前支持两种配置方式：
>
> - **设备 MCP**：在代码中调用接口注册 MCP 工具，对话过程中 AI Agent 可调用设备端注册的工具（如拍照、调节音量等）。
> - **自定义 MCP 服务**：下载涂鸦的 [MCP SDK 仓库](https://github.com/tuya/tuya-mcp-sdk.git)，在 PC 端自定义 MCP 工具并启动服务，对话过程中 AI Agent 可调用 PC 端定义的工具。具体操作流程请参考[自定义 MCP 服务文档](https://tuyaopen.ai/zh/docs/cloud/tuya-cloud/ai-agent/13.1-custom-mcp-services)。

### 05_AI_Skill

AI Agent 的 Skill 技能示例。本示例演示了如何解析和处理 Agent 下发的技能事件，包括音乐/故事播放、情绪感知等——用户可通过对话触发音乐/故事播放，获取 Agent 感知到的情绪数据（情绪名称 / emoji）。关于 Agent 的技能配置请参考[智能体开发平台文档](https://tuyaopen.ai/zh/docs/cloud/tuya-cloud/ai-agent/ai-agent-dev-platform)。

- 音乐工具因不同服务商提供的服务差异，可能存在不同的收费逻辑
- 网易云音乐仅支持中国数据中心，非中国区只能播放试听内容
- 音乐/故事技能仅支持设备端播放
- 硬件平台：仅支持 TUYA-T5AI 系列

### 06_AI_TuyaUI

AI 自定义 UI 显示示例。本示例演示了如何获取内置的字体、emoji、icon 等 UI 资源，并使用 LVGL 进行自定义聊天界面设计，实现 ASR 文本和 AI 回复的实时显示。

- 硬件平台：LVGL 显示能力仅支持 T5AI-Board 开发板

