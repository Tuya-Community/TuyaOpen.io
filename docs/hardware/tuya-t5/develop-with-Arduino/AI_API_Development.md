---
title: TuyaAI API Development
description: "TuyaAI API development in Arduino — add AI capabilities to a device app, from an IoT switch to voice chat, MCP tools, and custom UI on T5 boards."
keywords:
  - tuyaai api
  - arduino
  - t5
  - ai development
  - mcp
---

The `TuyaAI` API gives you a concise set of interfaces for adding AI capabilities to a device application in the Arduino IDE. The examples below progress from basic to advanced, taking you from a simple IoT switch to voice chat, MCP tools, and custom UI on Arduino.

```
TuyaAI (Main Class)
├── TuyaAI.UI      - UI display management
├── TuyaAI.Audio   - Audio input/output
├── TuyaAI.MCP     - Model Context Protocol tool extension
└── TuyaAI.Skill   - Music, stories, emotion recognition, and other skills
```

## Examples overview

### [00_IoT_SimpleExample](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/AIcomponents/examples/00_IoT_SimpleExample)

An IoT switch example based on the Tuya Cloud. It uses Tuya DP (Data Point) to implement three-way communication between `Device`, `Cloud`, and `APP`, controlling the onboard LED on and off from the phone app.

- Hardware platform: Tuya-compatible development boards (T2, T3, T5AI, ESP32, LN882H, or XH_WB5E series)
- [How to create a PID and configure DPs for cloud-device communication](https://tuyaopen.ai/docs/cloud/tuya-cloud/creating-new-product)

### [01_AI_TextChat](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/AIcomponents/examples/01_AI_TextChat)

An AI Agent text chat example based on the Tuya Cloud. It interacts with the AI Agent over serial text — after provisioning, send text in the Arduino IDE Serial Monitor to chat with the AI, and the AI's response streams back as text in real time.

- Hardware platform: TUYA-T5AI series, ESP32 series

### [02_AI_AudioChat](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/AIcomponents/examples/02_AI_AudioChat)

An AI Agent voice chat example based on the Tuya Cloud. It interacts with the AI Agent through the microphone and speaker — after provisioning, a prompt tone plays, and you wake the device with the wake word to start a conversation.

- The default mode is Wakeup; switch conversation modes by double-clicking the button or modifying the `TuyaAI.begin` parameters.
- Wake word: Hey Tuya
- Serial text chat is also supported.
- Hardware platform: TUYA-T5AI series only

### [03_AI_AudioSave](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/AIcomponents/examples/03_AI_AudioSave)

An AIoT device audio recording example. It saves raw microphone audio (PCM format) and cloud TTS synthesized audio (MP3 format) to an SD card, for voice data collection and offline analysis.

- Hardware platform: SD card functionality is supported only on the T5AI-Board development board

### [04_AI_Mcp](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/AIcomponents/examples/04_AI_Mcp)

An MCP (Model Context Protocol) example for the AI Agent. It registers MCP tools on the device so the AI Agent can invoke device-side local tools during a conversation. The example registers a volume control tool, letting you adjust the device volume through voice or text commands.

- Hardware platform: TUYA-T5AI series only

:::note
Tuya's MCP feature currently supports two configuration methods:

- **Device MCP**: register MCP tools by calling APIs in the code. During conversations, the AI Agent can invoke device-side registered tools (for example, taking photos or adjusting volume).
- **Custom MCP Service**: download Tuya's [MCP SDK repository](https://github.com/tuya/tuya-mcp-sdk.git), customize MCP tools on the PC side, and start the service. During conversations, the AI Agent can invoke PC-side tools. For details, see the [Custom MCP Service documentation](https://tuyaopen.ai/docs/cloud/tuya-cloud/ai-agent/13.1-custom-mcp-services).
:::

### [05_AI_Skill](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/AIcomponents/examples/05_AI_Skill)

A Skill example for the AI Agent. It parses and handles skill events dispatched by the Agent, including music and story playback and emotion recognition — you can trigger music or story playback through conversation and obtain the emotion data the Agent perceives (emotion name and emoji). For Agent skill configuration, see the [AI Agent Development Platform documentation](https://tuyaopen.ai/docs/cloud/tuya-cloud/ai-agent/ai-agent-dev-platform).

- Music tools may have different pricing models depending on the service provider.
- NetEase Cloud Music is available only in the China data center; non-China regions can play preview content only.
- Music and story skills support device-side playback only.
- Hardware platform: TUYA-T5AI series only

### [06_AI_TuyaUI](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/AIcomponents/examples/06_AI_TuyaUI)

An AI custom UI display example. It accesses built-in fonts, emojis, icons, and other UI resources, and uses LVGL for custom chat interface design, displaying ASR text and AI responses in real time.

- Hardware platform: LVGL display capability is supported only on the T5AI-Board development board

## See also

- [Application Development](Application.md) — the full `YourChatBot` example that combines these capabilities.
- [Peripheral Development](Peripheral_Development.md) — the peripheral and networking library examples.
