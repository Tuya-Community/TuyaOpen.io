# TuyaAI API Development

This document describes how to use the TuyaAI API for AIoT development in Arduino IDE. TuyaAI provides a concise and easy-to-use set of interfaces to help developers quickly integrate AI capabilities into device applications. The following examples will guide you progressively from basic to advanced AI development on Arduino.

```
TuyaAI (Main Class)
├── TuyaAI.UI      - UI display management
├── TuyaAI.Audio   - Audio input/output
├── TuyaAI.MCP     - Model Context Protocol tool extension
└── TuyaAI.Skill   - Music, stories, emotion recognition, and other skills
```

## Examples Overview

### 00_IoT_SimpleExample

An IoT switch example based on the Tuya Cloud. This example demonstrates how to use Tuya DP (Data Point) to implement three-way communication between `Device` - `Cloud` - `APP`, controlling the on-board LED on/off via the phone APP.

- Hardware platform: Tuya-compatible development boards (T2, T3, T5AI, ESP32, LN882H, or XH_WB5E series)
- [How to create a PID and configure DPs for cloud-device communication](https://tuyaopen.ai/en/docs/cloud/tuya-cloud/creating-new-product)

### 01_AI_TextChat

An AI Agent text chat example based on the Tuya Cloud. This example demonstrates how to interact with the AI Agent via serial port text — after successful provisioning, send text in the Arduino IDE Serial Monitor to chat with the AI, and the AI's response is output as streaming text in real time.

- Hardware platform: TUYA-T5AI series, ESP32 series

### 02_AI_AudioChat

An AI Agent voice chat example based on the Tuya Cloud. This example demonstrates how to interact with the AI Agent via microphone and speaker — after successful provisioning, a prompt tone is played, and users can wake the device with the wake word to start a conversation.

- Default mode is Wakeup; switch conversation modes by double-clicking the button or modifying the `TuyaAI.begin` parameters
- Wake word: 你好涂鸦 (Hey Tuya)
- Serial text chat is also supported
- Hardware platform: TUYA-T5AI series only

### 03_AI_AudioSave

An AIoT device audio data recording example. This example demonstrates how to save raw microphone audio data (PCM format) and cloud TTS synthesized audio data (MP3 format) to an SD card, for voice data collection and offline analysis.

- Hardware platform: SD card functionality is only supported on the T5AI-Board development board

### 04_AI_Mcp

An MCP (Model Context Protocol) example for AI Agent. This example demonstrates how to register MCP tools on the device, enabling the AI Agent to invoke device-side local tools during conversations. The example registers a volume control tool, allowing users to adjust the device volume through voice or text commands to the AI.

- Hardware platform: TUYA-T5AI series only

> **Note:** Tuya's MCP feature currently supports two configuration methods:
>
> - **Device MCP**: Register MCP tools by calling APIs in the code. During conversations, the AI Agent can invoke device-side registered tools (e.g., taking photos, adjusting volume).
> - **Custom MCP Service**: Download Tuya's [MCP SDK repository](https://github.com/tuya/tuya-mcp-sdk.git), customize MCP tools on the PC side and start the service. During conversations, the AI Agent can invoke PC-side defined tools. For detailed instructions, refer to the [Custom MCP Service Documentation](https://tuyaopen.ai/en/docs/cloud/tuya-cloud/ai-agent/13.1-custom-mcp-services).

### 05_AI_Skill

A Skill example for AI Agent. This example demonstrates how to parse and handle skill events dispatched by the Agent, including music/story playback and emotion recognition — users can trigger music/story playback through conversation and obtain emotion data perceived by the Agent (emotion name / emoji). For Agent skill configuration, refer to the [AI Agent Development Platform Documentation](https://tuyaopen.ai/en/docs/cloud/tuya-cloud/ai-agent/ai-agent-dev-platform).

- Music tools may have different pricing models depending on the service provider
- NetEase Cloud Music is only available in the China data center; non-China regions can only play preview content
- Music/story skills only support device-side playback
- Hardware platform: TUYA-T5AI series only

### 06_AI_TuyaUI

An AI custom UI display example. This example demonstrates how to access built-in fonts, emojis, icons, and other UI resources, and use LVGL for custom chat interface design, enabling real-time display of ASR text and AI responses.

- Hardware platform: LVGL display capability is only supported on the T5AI-Board development board
