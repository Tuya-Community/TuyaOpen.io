---
title: OpenClaw Voice Assistant Demo
---

This document describes how to connect TuyaOpen edge hardware to the OpenClaw gateway service so that speech is transcribed by Tuya Cloud ASR and the resulting text is sent to a local OpenClaw instance, enabling a "speak to execute" desktop voice assistant. It is aimed at application developers who have completed the TuyaOpen quick start and want to build a lightweight, demonstrable personal assistant.

<img src="/img/applications/demo-openclaw-local-network.png" alt="TuyaOpen device with microphone and speaker connected over local network to OpenClaw gateway" style={{width: '80%', height: 'auto'}} />

*TuyaOpen hardware (mic + speaker) on the local network, connected to the OpenClaw gateway (PC).*

## Prerequisites

- You have completed [Environment setup and code download](quick-start/enviroment-setup) from the [Quick Start](quick-start/index).
- You are familiar with building, flashing, and network configuration for the [your_chat_bot](https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/your_chat_bot) app in the TuyaOpen repository.
- A PC (Linux recommended) running OpenClaw and the MQTT bridge is on the same local network as the TuyaOpen device.

## Requirements

- **Hardware**: A TuyaOpen development board supported by your_chat_bot (e.g. T5AI-Core, T5-AI Board), USB cable, and any peripherals (e.g. microphone) per the board documentation.
- **Software**: TuyaOpen repository, Python 3, Mosquitto (MQTT broker), and an OpenClaw runtime on the PC.
- **Network**: The TuyaOpen device and the PC running OpenClaw must be on the same LAN; the PC must have a known or static IP for MQTT.
- **License key**: This demo uses Tuya Cloud ASR. Complete [Equipment authorization](quick-start/equipment-authorization) and configure PID and related settings as required by your_chat_bot.

## Architecture overview

The TuyaOpen device connects to Tuya Cloud for ASR and receives transcribed text. It publishes that text over the local network via MQTT to the PC running OpenClaw. A bridge on the PC subscribes to the MQTT topic and forwards messages to OpenClaw for intent understanding and task execution (e.g. email, code, notes). Results can be sent back over MQTT to the device for display or playback.


### Architecture diagram

The diagram below shows the data flow between TuyaOpen edge hardware and the OpenClaw PC sandbox: local voice capture and Tuya Cloud ASR, MQTT relay, OpenClaw gateway intent parsing and execution, and result feedback.

```mermaid
graph TD

    subgraph TuyaOpen Edge Hardware - Super Assistant
        A1[Microphone Array]
        A2[Local Voice Capture]
        A3[API Call - Tuya Cloud ASR Service]
        A4[Receive Text Result]
        A5[MQTT Send Text Message]
        A6[Voice Synthesis/Display (User Feedback)]

        A1 --> A2
        A2 --> A3
        A3 --> A4
        A4 --> A5
        A4 --> A6
    end

    subgraph OpenClaw PC Sandbox Environment
    subgraph OpenClaw MQTT Relay
        A5 -. LAN MQTT Protocol .-> B1
        B1[Local MQTT Server]
    end

    subgraph OpenClaw Message Integration Service

    M1[Telegram Message]
    M2[WhatsApp Message]
    M3[Message Aggregation Service]

    M1 & M2 -->|Send Message| M3
    M3 -->|Via Message API| B2
    end


    subgraph OpenClaw Gateway
        B2[Text Message API]
        B3[Intent Understanding / Skill Execution Layer]
        B4[Control Commands to Smart Home Devices]
        B5[API Call to External AI Service]
        B7[Automated Execution Agent]
        B6[Return Execution Result]


        B1 -->|Call API| B2
        B2 -->|Intent Parsing/Skill Execution| B3
        B3 -->|Control| B4
        B3 -->|API Call| B5
        B6 -- Return Execution Result --> A4
        B3 --> B6
        B3 --> B7
    end

    
    end
    
    %% Improved color assignments for clarity and accessibility
    style A1 fill:#6C8AE4,stroke:#2D3E60,stroke-width:2px,color:#fff
    style A2 fill:#B2D6FF,stroke:#2D3E60,stroke-width:2px,color:#222
    style A3 fill:#70C1B3,stroke:#2D3E60,stroke-width:2px,color:#fff
    style A4 fill:#D6EAF8,stroke:#2D3E60,stroke-width:2px
    style A5 fill:#FFC857,stroke:#2D3E60,stroke-width:2px,color:#333
    style A6 fill:#FFB7B2,stroke:#2D3E60,stroke-width:2px,color:#222

    style B1 fill:#FFA07A,stroke:#2D3E60,stroke-width:2px,color:#222
    style B2 fill:#FDF498,stroke:#2D3E60,stroke-width:2px,color:#333
    style B3 fill:#36B37E,stroke:#2D3E60,stroke-width:2px,color:#fff
    style B4 fill:#91E6C7,stroke:#2D3E60,stroke-width:2px,color:#222
    style B5 fill:#0EC4B6,stroke:#2D3E60,stroke-width:2px,color:#fff
    style B6 fill:#F7CAC9,stroke:#2D3E60,stroke-width:2px,color:#222

    style M1 fill:#F28585,stroke:#2D3E60,stroke-width:2px,color:#fff
    style M2 fill:#F28585,stroke:#2D3E60,stroke-width:2px,color:#fff
    style M3 fill:#FFD6A5,stroke:#2D3E60,stroke-width:2px,color:#333
```


## Steps

### 1. TuyaOpen environment and your_chat_bot

1. **Clone TuyaOpen**
   ```bash
   git clone https://github.com/tuya/TuyaOpen.git
   cd TuyaOpen
   ```

2. **Activate the build environment**  
   Run this again in each new terminal:
   ```bash
   . ./export.sh
   ```

3. **Enter the app and build**  
   Buildable apps are under `apps` and `example`. For your_chat_bot:
   ```bash
   cd apps/tuya.ai/your_chat_bot
   tos.py build
   ```

4. **Flash firmware**  
   Follow [Firmware burning](quick-start/firmware-burning) to flash the built image.

5. **Configure device network**  
   Follow [Device network configuration](quick-start/device-network-configuration) so the device can reach Tuya Cloud and the LAN.

6. **Verify**  
   After power-on and network setup, the device should support voice interaction (ASR via Tuya Cloud). For issues, see [Project walkthrough](project-walkthrough).

### 2. Install OpenClaw

OpenClaw is an Alibaba Cloud model-related service that runs on the PC and executes tasks from text commands. Install and configure it from the official docs:

- [OpenClaw installation and configuration](https://help.aliyun.com/zh/model-studio/openclaw#step-config-manual-title) (Alibaba Cloud)

Example command on the PC:
```bash
openclaw agent --agent main --message "How is Seattle's Weather?"
```

### 3. Connect TuyaOpen to OpenClaw

Run an MQTT broker and a bridge script on the PC. On the TuyaOpen side, add an MQTT client that publishes ASR results to a topic the bridge subscribes to; the bridge then invokes OpenClaw.

#### 3.1 MQTT and bridge on the PC

1. **Install and start Mosquitto**
   ```bash
   sudo apt-get install mosquitto mosquitto-clients
   sudo systemctl start mosquitto
   sudo systemctl enable mosquitto
   ```
   If a `setup_mosquitto.sh` is provided, run it as needed:
   ```bash
   sudo ./setup_mosquitto.sh
   ```

2. **Run the MQTT–OpenClaw bridge**  
   Place the bridge code (e.g. `mqtt_openclaw_bridge`) on the PC and start it:
   ```bash
   cd ~/mqtt_openclaw_bridge
   python3 mqtt_openclaw_bridge.py
   ```
   The bridge subscribes to the device MQTT topic, sends received text to OpenClaw, and can publish results back to the device.

3. **Test MQTT (optional)**
   ```bash
   cd ~/mqtt_openclaw_bridge
   python3 test_receiver.py
   ```
   In another terminal:
   ```bash
   python3 test_sender.py "Create a Desktop folder and generate a new text file containing 10 poems."
   ```
   Confirm that OpenClaw receives and executes the command.

#### 3.2 Device: MQTT connection and sending ASR results

In the your_chat_bot project, add a connection to the PC MQTT broker and, when ASR results are received from Tuya Cloud, publish the text to the topic used by the bridge.

1. **Add MQTT connect function**  
   Add a function such as `claw_mqtt_connect` to connect to the broker (see the configuration table below for address and port).

2. **Publish from the ASR callback**  
   In the callback that receives ASR results (e.g. `__app_ai_audio_evt_inform_cb`), publish the transcribed text to the command topic, for example:
   ```c
   // Send ASR text to AI_CMD topic via MQTT
   uint16_t cmd_msgid = ai_cmd_send(data, len, MQTT_QOS_1);
   ```
   Implementation details depend on your project layout; refer to any OpenClaw integration sample code if provided in the repo or community.

3. **Set MQTT parameters**  
   Use the same MQTT settings on the device and in the bridge; set the broker address to the LAN IP of the PC running OpenClaw.

## MQTT configuration

| Option | Description | Example |
|--------|-------------|---------|
| MQTT_BROKER | MQTT broker address (LAN IP of the PC running OpenClaw) | `192.168.100.132` |
| MQTT_PORT | MQTT broker port | `1883` |
| MQTT_TOPIC_CMD | Topic for device commands | `AI_CMD` |
| MQTT_TOPIC_RET | Topic for results to the device | `AI_RET` |
| MQTT_CLIENT_ID | Device MQTT client ID | `T5_AI_CLAW` |

Set `MQTT_BROKER` in both `mqtt_openclaw_bridge.py` and in the your_chat_bot project to your PC’s actual LAN IP.

## Notes

:::note
This is a developer-experience setup with specific environment requirements.
:::

- **Same LAN**: The TuyaOpen device and the PC running OpenClaw and Mosquitto must be on the same local network, and the device must be able to reach the PC’s MQTT port.
- **IP**: If the PC’s IP changes, update `MQTT_BROKER` on both the device and the bridge.
- **Ecosystem**: Additional TuyaOpen + OpenClaw integration options are in development; check the repository and docs for updates.

## Expected result

After completing the steps, voice input on the TuyaOpen device is transcribed by Tuya Cloud ASR; the device sends the text over MQTT to the PC; OpenClaw runs the corresponding tasks (e.g. email, create folder, code). You get a lightweight "voice-controlled desktop" assistant.

## References

- [Quick Start](quick-start/index)
- [Environment setup and code download](quick-start/enviroment-setup)
- [Firmware burning](quick-start/firmware-burning)
- [Device network configuration](quick-start/device-network-configuration)
- [Project walkthrough](project-walkthrough)
- [Chatbot Demo (your_chat_bot)](applications/tuya.ai/demo-your-chat-bot)
- [OpenClaw documentation](https://help.aliyun.com/zh/model-studio/openclaw) (Alibaba Cloud)
