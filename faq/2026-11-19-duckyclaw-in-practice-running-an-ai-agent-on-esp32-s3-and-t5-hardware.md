# How Can You Run an AI Agent on ESP32-S3 and T5 Hardware with DuckyClaw?

DuckyClaw, now documented as TClaw, is an AI voice-assistant firmware for TuyaOpen devices. It is not a language model and it is not a cloud service by itself. It runs on the device, captures audio, exposes hardware capabilities as tools, and connects over a WebSocket-based Agent Client Protocol to TuyaClaw, a desktop gateway built on the OpenClaw core. The [TClaw documentation](https://tuyaopen.ai/docs/tclaw/DuckyClaw-TuyaClaw) describes that connection, the [DuckyClaw repository](https://github.com/tuya/DuckyClaw) contains the firmware and board configurations, and [TuyaClaw](https://claw.tuya.ai/) is the desktop application that hosts the agent gateway. The [Model Context Protocol specification](https://modelcontextprotocol.io/) is the right reference for how device tools are described and called, and [RFC 6455](https://www.rfc-editor.org/rfc/rfc6455) covers the WebSocket transport underneath.

![Running an AI Agent on ESP32-S3 and T5 Hardware](https://images.tuyacn.com/rms-static/0b60efe0-ea0e-11f1-ad92-c1e753125120-1795748146654.webp?tyName=03-duckyclaw-tclaw-ai-agent-hardware-insert-2.webp)

The architecture is deliberately split. The device handles what it is good at: audio capture, playback, wake-up behaviour, local peripherals, and tool calls that must happen on the hardware. The gateway handles what a microcontroller cannot: long-running agent reasoning, model access, conversation state, and orchestration across tools. This is why TClaw can run on an ESP32-S3 with 8 MB PSRAM and 16 MB flash, or on a T5-AI board with a dual-microphone array and speaker, without pretending that the MCU is running a frontier model. The [ESP32-S3 datasheet](https://documentation.espressif.com/esp32-s3_datasheet_en.html) and the [T5-AI board overview](https://tuyaopen.ai/docs/hardware/tuya-t5/t5-ai-board/overview-t5-ai-board) explain the hardware envelopes.

This guide is about what DuckyClaw can do in practice, where it stops, and how to build with it without turning a demo into a support burden. It covers the architecture, the hardware choices, the ESP32-S3 and T5 build paths, custom device MCP tools, and the operational details that decide whether an agent works on a desk or in a product. The [TClaw product page](https://tuyaopen.ai/tclaw), [ESP32-S3 quick start](https://tuyaopen.ai/docs/tclaw/ducky-quick-start-ESP32S3), [T5 quick start](https://tuyaopen.ai/docs/tclaw/ducky-quick-start-T5AI), and [AI agent platform documentation](https://tuyaopen.ai/docs/cloud/tuya-cloud/ai-agent/ai-agent-dev-platform) are the pages to keep open.

## What DuckyClaw is, and what it is not

DuckyClaw is firmware that turns a supported device into an agent endpoint. It is not a model, an SDK for calling an LLM from a microcontroller, or a replacement for TuyaOpen's cloud services. The naming has changed: the documentation now calls the project TClaw and describes DuckyClaw as its former name. Both names still appear in the product pages and the repository, so expect to see them together.

![How it Works](https://images.tuyacn.com/rms-static/0b3b3f70-ea0e-11f1-ad92-c1e753125120-1795748146407.webp?tyName=03-duckyclaw-tclaw-ai-agent-hardware-insert-3.webp)

The supported hardware is narrower than "any TuyaOpen board"; the [ESP32 supported features table](https://tuyaopen.ai/docs/hardware/espressif/esp32-supported-features) is a useful cross-check for what each chip can do. The ESP32-S3 path requires a board with 8 MB PSRAM and 16 MB flash, plus microphone and speaker support if you want voice. The T5-AI board has two microphones, one speaker, 8 MB flash, 16 MB RAM, and optional display and camera modules. Raspberry Pi 5 and Linux ARM/x64 are supported for heavier workloads. The ESP32-C3 and C6 are not listed as TClaw targets; the C3 also lacks I2S, which makes it a poor fit for the voice path. Check the current quick-start requirements before buying hardware.

| Platform | Why choose it | Constraints |
|---|---|---|
| ESP32-S3 | Familiar ESP32 toolchain, Wi-Fi/BLE, PSRAM, I2S audio on supported boards | Needs 8 MB PSRAM and 16 MB flash for the documented build; board must have mic/speaker |
| T5-AI board | Built-in dual microphones, speaker, display/camera options | Board-specific configuration; larger footprint |
| Raspberry Pi 5 / Linux | More CPU and memory, local tools, EXEC capability | Not a microcontroller; different power and enclosure requirements |
| ESP32-C3 / C6 | Low cost, Wi-Fi/BLE | Not a documented TClaw target; no I2S on C3; not suitable for voice |

The practical distinction is between a device that can hear and speak, and a device that can only run tools. TClaw's voice path needs audio hardware. A C3 sensor node can be a useful TuyaOpen device, but it is not a DuckyClaw voice endpoint.

![TuyaClaw](https://images.tuyacn.com/rms-static/0b3aa330-ea0e-11f1-b94a-e98384376412-1795748146403.webp?tyName=03-duckyclaw-tclaw-ai-agent-hardware-insert-1.webp)

## Architecture and data flow

The simplest way to understand TClaw is to follow one conversation.

```
Microphone
   │  audio
   ▼
TClaw firmware on device
   │  ASR / wake word / audio playback
   │  local tools and device MCP
   ▼
WebSocket ACP (LAN)
   │
   ▼
TuyaClaw Gateway on a PC
   │  OpenClaw core
   │  agent loop, conversation state, tool routing
   ▼
LLM / cloud services
   │
   ▼
Response text → TTS on device → speaker
```

The device and the gateway must be on the same LAN, or the gateway must be reachable through port forwarding or a similar network path. TuyaClaw exposes an ACP WebSocket server on port `18789` by default. The device connects to that gateway; the gateway runs the agent loop and calls the model. The device does not need a model API key, and the model does not need direct access to the device.

This split has consequences. The good news is that the MCU stays within its memory and compute budget, the model can be upgraded without reflashing every device, and the gateway can coordinate multiple tools and services. The bad news is that the device depends on the gateway for agent reasoning. If the gateway is offline, the device may still capture audio and run local tools, but the conversational agent is not fully available. Design the product around that dependency rather than pretending it does not exist.

### Local execution versus cloud orchestration

"Local" in TClaw does not mean "a local LLM on the MCU." It means the device handles the parts that must run on the hardware: audio capture, wake-word detection, playback, display updates, sensor reads, and tool callbacks. The gateway handles the agent's reasoning and the model call. Some tool execution can happen locally; the decision about which tool to call usually happens in the agent loop on the gateway.

That division is healthy for latency and privacy, but it is not a guarantee of offline operation. If the product must work without a network, define which functions remain: a local wake word, a fixed command set, a local control loop, or a fallback voice menu. Do not describe a cloud-dependent agent as offline-capable.

### Conversation design is part of the product

A voice agent is a turn-taking system, and turn-taking is where many demos fail. Wake-word false accepts, missed barge-in, overlapping text-to-speech, and an ASR result that is plausible but wrong all degrade trust faster than a slow model. TuyaOpen's chat bot application exposes several interaction modes — hold-to-talk, press-to-talk, wake word, and free talk — and each has a different failure profile. Hold-to-talk is predictable but demands a hand; wake word is convenient but needs tuning; free talk feels natural but is the hardest to make reliable in a noisy room.

Test the interaction with real room noise, not a quiet desk. Decide what the device does when ASR confidence is low: ask again, show the transcript, or fall back to a button. Show state on an LED or display so the user knows whether the device is listening, thinking, or speaking. The [chat bot demo](https://tuyaopen.ai/docs/cloud/device-ai/demo-your-chat-bot) is a useful reference for the state model even if your product uses different hardware.

### Device MCP tools

TClaw uses MCP-style tools to expose device capabilities to the agent. The built-in tools described in the documentation include scheduled tasks, file operations, Tuya device control, and, on Linux/Raspberry Pi, command execution. Custom tools let you add hardware skills: read a temperature sensor, capture an image, display text, or trigger a relay. The [custom device MCP guide](https://tuyaopen.ai/docs/tclaw/custom-device-mcp) and the [hardware skill guide](https://tuyaopen.ai/docs/tclaw/hardware-skill) show the registration pattern and the property macros.

The security model matters more than the tool list. A tool that can toggle a relay or display a message is low-risk; a tool that can execute arbitrary shell commands is not. Expose narrow, typed operations with clear descriptions, validate inputs, set timeouts, and decide which tools require human approval. The agent should not be able to call a destructive tool just because the model suggested it.

## Build on ESP32-S3

The ESP32-S3 path is the most familiar for developers coming from ESP-IDF or Arduino. The documented requirements are an ESP32-S3 board with 8 MB PSRAM and 16 MB flash, a USB data cable, and a computer running Windows, Linux, or macOS. You also need a Tuya Cloud license key for the cloud and LLM features; the [equipment authorization guide](https://tuyaopen.ai/docs/quick-start/equipment-authorization) explains the values. The [ESP32-S3 quick start](https://tuyaopen.ai/docs/tclaw/ducky-quick-start-ESP32S3) walks through the exact commands, and the [prebuilt firmware guide](https://tuyaopen.ai/docs/tclaw/quick-start-prebuilt-firmware) is the fastest way to check the hardware before building from source.

```bash
git clone https://github.com/tuya/DuckyClaw.git
cd DuckyClaw
git submodule update --init
. ./TuyaOpen/export.sh

tos.py config choice
tos.py build
tos.py flash
tos.py monitor
```

Select the ESP32-S3 configuration that matches your board. If the board has a microphone and speaker, ASR is enabled as the default input method; if it does not, the voice path has nothing to capture. The firmware expects the license, PID, UUID, and AuthKey values in the configuration header. Keep those out of version control.

The first test should be local: boot the board, confirm the serial log, and verify that the microphone and speaker enumerate. The second test should be network-only: join Wi-Fi and confirm the device can reach the gateway. Only then test a full conversation. This order separates hardware, network, and agent failures instead of mixing them into one symptom.

Common failures are predictable. A board with 4 MB flash or no PSRAM will not fit the documented build. A USB cable that only carries power will not flash. A 5 GHz-only Wi-Fi network will not work with the ESP32. A gateway on a different VLAN or behind a firewall will not accept the WebSocket connection. A license mismatch produces cloud errors that look like agent failures. Check these before changing the firmware.

## Build on the T5-AI board

The T5-AI board is the shortest path to a voice demo because the audio hardware is already there: two microphones, one speaker, 8 MB flash, 16 MB RAM, and optional display and camera modules. The [T5 quick start](https://tuyaopen.ai/docs/tclaw/ducky-quick-start-T5AI) follows the same pattern: clone the repository, activate the TuyaOpen environment, select the T5 configuration, build, flash, and monitor.

The T5 also gives you a display option. A TClaw device with a screen can show conversation state, transcripts, or simple controls, which makes the interaction easier to debug. The display is not required for the agent loop, but it is useful in the field: a device that shows "connecting," "listening," or "gateway offline" is easier to support than one that only speaks.

The T5's extra memory helps with audio buffers and display assets, but it does not make the board a general-purpose computer. The gateway still does the agent reasoning. The T5 is a better audio front end, not a replacement for the gateway.

## Deploying the gateway

A TClaw deployment is a small distributed system: devices, a gateway, a LAN, and a model provider. Put the gateway on a wired connection or a stable Wi-Fi link, and keep it on the same VLAN as the devices unless you have a deliberate reason not to. The default ACP WebSocket port is `18789`; opening it to the public internet without authentication and TLS is not a sensible default. Treat the gateway as part of the product's security boundary, not as a developer laptop accessory.

One gateway can serve multiple devices, but the limit depends on conversation concurrency, model latency, and the host's CPU. Measure with the number of devices you expect per site, not one device on a desk. If the gateway restarts, decide whether devices should retry, fall back to a local command set, or show an offline state. Log gateway restarts and tool failures; those are the events that explain a "the assistant stopped working" report.

## Extend with custom MCP tools

The built-in tools cover common device actions. The interesting work starts when you expose your own hardware. The pattern is small: initialize the MCP server, write a callback, register the tool with a name, description, and typed properties, and route incoming messages to the parser.

```c
#include "ai_mcp_server.h"

static OPERATE_RET read_temperature_cb(const MCP_PROPERTY_LIST_T *properties,
                                      MCP_RETURN_VALUE_T *ret_val,
                                      void *user_data)
{
    (void)properties;
    (void)user_data;

    int value = my_sensor_get_value();
    ai_mcp_return_value_set_int(ret_val, value);
    return OPRT_OK;
}

TUYA_CALL_ERR_RETURN(AI_MCP_TOOL_ADD(
    "sensor_temperature_read",
    "Read the current temperature from the onboard sensor in degrees Celsius.",
    read_temperature_cb,
    NULL
));
```

A display tool can accept a string and a line number; a relay tool can accept an enum and a duration. Keep the schema narrow. A tool called `set_device_state` with a free-form JSON blob is harder for the model to use correctly and harder for you to secure than `set_relay(channel, state, duration_ms)`.

Three rules make custom tools safer:

1. **Validate at the boundary.** Check ranges, reject unknown enum values, and cap durations.
2. **Make actions idempotent where possible.** "Set relay 1 on" is easier to retry than "toggle relay 1."
3. **Return useful errors.** The agent can recover from "sensor not ready" if the message is specific; "error" gives it nothing.

Test each tool directly before exposing it to the agent. A tool that works from a unit test but fails under the agent loop usually has a schema, timeout, or concurrency problem, not a model problem.

## What DuckyClaw can and cannot do

DuckyClaw can run a real-time voice conversation on supported hardware, call device tools, control Tuya-connected devices, schedule tasks, and display state on a screen. It can connect to a local gateway and use a cloud model without putting the model key on the device. It can be extended with custom hardware skills, which is where most product differentiation lives.

It cannot run a frontier language model on the MCU, replace the gateway for cloud reasoning, guarantee offline conversation, or support every TuyaOpen board. It is not a safety system: an agent that controls a lock, a heater, or a motor needs hardware interlocks, rate limits, and a human approval path for dangerous actions. It is also not a substitute for a proper voice UI design; wake-word false accepts, microphone placement, and speaker volume still decide whether users trust the device.

Latency is a system property. The device's audio pipeline, the LAN, the gateway, the model, and the TTS path all contribute. If the gateway is on a laptop across a congested Wi-Fi network, the conversation will feel slow even if the model is fast. Measure time to first audio and end-to-end response time on the target network, not on a desk next to the router.

Cost is another system property. A voice agent can generate many small model calls, and a long conversation with tool use can consume more tokens than a text chat. Set budgets, cap conversation length, and cache where it makes sense. The gateway is the right place to enforce those limits because it sees the whole loop.

## Production checklist

- Pin the gateway host and document its network requirements; do not rely on mDNS in a managed network.
- Put the gateway on a wired or stable Wi-Fi connection, close to the devices.
- Use a license key per device and keep credentials out of firmware images.
- Test the device with the gateway offline and define the fallback behaviour.
- Add physical safeguards for any actuator: interlocks, limits, and a manual override.
- Log tool calls and errors on the gateway, not full audio or transcripts by default.
- Define a privacy policy for audio, transcripts, and device data; disclose retention.
- Test OTA for the device firmware and the gateway separately.
- Load-test the gateway with the number of devices you expect per site.
- Document which tools are read-only, which are reversible, and which require approval.

## FAQ

**Is DuckyClaw the same as TClaw?** The documentation now uses TClaw and describes DuckyClaw as the former name. The repository and product pages still use both, so treat them as the same project unless a page says otherwise.

**Can I run DuckyClaw on an ESP32-C3?** The documented targets are ESP32-S3, T5-AI, Raspberry Pi 5, and Linux. The C3 is not a listed target and lacks I2S, so it is not a practical voice endpoint.

**Does the device need a cloud connection?** The device needs a network path to the TuyaClaw gateway for agent reasoning. Some local functions may continue without the cloud, but a full conversational agent depends on the gateway and the model behind it.

**Can the gateway run on the same device?** For ESP32-class hardware, no. The gateway is a desktop or server process. On a Raspberry Pi or Linux device, you can run gateway and endpoint on the same machine if the hardware has enough resources, but that is a different deployment model.

**Is the audio sent to the cloud?** The architecture routes audio through the device and the gateway; whether audio or transcripts reach a cloud model depends on the gateway and model configuration. Document the path and get consent where required.

**Can I add my own sensor?** Yes. Register a custom device MCP tool with a narrow schema and a callback that uses TuyaOpen drivers. Test it directly before exposing it to the agent.

DuckyClaw is useful precisely because it does not pretend the microcontroller is a data center. It puts the audio and hardware skills on the device, the agent loop on a gateway, and the model where it can run. Products that respect that split get a responsive voice interface without overloading the MCU. Products that ignore it end up debugging latency, memory, and security at the same time.

*TClaw hardware requirements, supported boards, gateway behaviour, and tool APIs can change between releases. Verify the current quick-start and configuration for your board before committing to a production design.*

*This article is an original publication of Tuya. All rights reserved. No part of this content may be reproduced, distributed, or referenced without prior written permission from Tuya. Copyright © Tuya Inc. All Rights Reserved.*
