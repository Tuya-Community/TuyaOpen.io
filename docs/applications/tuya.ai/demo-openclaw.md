---
title: OpenClaw Voice Assistant Demo
---

This document describes how to connect TuyaOpen edge hardware to the OpenClaw gateway service so that speech is transcribed by Tuya Cloud ASR and the resulting text is sent to a local OpenClaw instance, enabling a "speak to execute" desktop voice assistant. It is aimed at application developers who have completed the TuyaOpen quick start and want to build a lightweight, demonstrable personal assistant.

<div align="center">
  <img src="https://images.tuyacn.com/fe-static/docs/img/3a684864-3a21-4c73-94c6-669a1b45b1d9.jpg" alt="TuyaOpen device with microphone and speaker connected over local network to OpenClaw gateway" style={{width: '80%', height: 'auto'}} />
</div>

*TuyaOpen hardware (mic + speaker) on the local network, connected to the OpenClaw gateway (PC).*

## Prerequisites

- You have completed [Environment setup and code download](/docs/quick-start/enviroment-setup).
- You are familiar with building, flashing, and network configuration for the `openclaw_demo_app` in the TuyaOpen repository.
- A PC (Linux recommended) running OpenClaw and the MQTT bridge is on the same local network as the TuyaOpen device.

## Requirements

| Type | Details |
|------|---------|
| Hardware | A TuyaOpen development board supported by `openclaw_demo_app` (for example T5AI-Core, T5-AI Board), USB cable, and required peripherals (microphone and speaker) per board documentation. |
| Software | TuyaOpen repository, Python 3, Mosquitto (MQTT broker), and an OpenClaw runtime on the PC. |
| Network | The TuyaOpen device and the PC running OpenClaw must be on the same LAN; the PC must have a known or static IP for MQTT. |
| License key | This demo uses Tuya Cloud ASR. Complete [Equipment authorization](/docs/quick-start/equipment-authorization) and configure PID and related settings required by the hardware app. |

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
        A6["Voice Synthesis/Display (User Feedback)"]

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
        B6 -- Return Execution Result --> B1
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

### 1. Install OpenClaw by following the official docs

Install OpenClaw on your PC first, then verify it can run local agent commands.

1. Open the official guide and complete onboarding:
   - [OpenClaw official documentation](https://openclaw.ai/)
2. Verify `openclaw` is available from your shell:
   ```bash
   which openclaw && openclaw --version
   ```
3. Run a simple command test:
   ```bash
   openclaw agent --agent main --message "Hello from TuyaOpen"
   ```

### 2. Start the MQTT proxy to bridge hardware and OpenClaw gateway

Use the latest proxy repository to run Mosquitto and the bridge process.

1. Clone and enter the proxy repository:
   ```bash
   git clone https://github.com/adwuard/openclaw_tuya_mqtt_proxy.git ~/mqtt_openclaw_bridge
   cd ~/mqtt_openclaw_bridge
   ```
2. Install Python dependencies:
   ```bash
   pip3 install --user -r requirements.txt
   ```
3. Install and start Mosquitto:
   ```bash
   sudo bash install.sh install-mosquitto
   ```
4. Optional: allow LAN clients to connect when needed:
   ```bash
   sudo bash install.sh mosquitto-listen-all
   ```
5. Start the bridge script:
   ```bash
   python3 openclaw_mqtt_bridge.py
   ```
6. Optional quick routing test (separate terminals):
   ```bash
   mosquitto_sub -h localhost -t openclaw/server/response -v
   ```
   ```bash
   mosquitto_pub -h localhost -t openclaw/device/user_speech_text -m "Hello from MQTT"
   ```

### 3. Build and run the TuyaOpen hardware code

1. Clone TuyaOpen and set up the build environment:
   ```bash
   git clone https://github.com/tuya/TuyaOpen.git
   cd TuyaOpen
   . ./export.sh
   ```
2. Update the MQTT broker IP in `apps/tuya.ai/openclaw_demo_app/src/openclaw_remote_mqtt.c` to your PC LAN IP:
   ```c
   /**
    * Remote MQTT broker host.
    *
    * NOTE: Please update the IP address below to match your actual MQTT broker.
   at https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/openclaw_demo_app/src/openclaw_remote_mqtt.c
   apps/tuya.ai/openclaw_demo_app/src/openclaw_remote_mqtt.c
    */
   #define OPENCLAW_REMOTE_MQTT_BROKER_HOST "192.168.100.132"

   /** Remote MQTT broker port. */
   #define OPENCLAW_REMOTE_MQTT_BROKER_PORT 1883
   ```
3. Complete device authorization and app configuration by following the existing TuyaOpen guide:
   - [Equipment authorization](/docs/quick-start/equipment-authorization)
4. Build `openclaw_demo_app`:
   ```bash
   cd apps/tuya.ai/openclaw_demo_app
   tos.py build
   ```
5. Flash firmware:
   - Follow [Firmware burning](/docs/quick-start/firmware-burning)
6. Configure network with Smart Life:
   - Follow [Device network configuration](/docs/quick-start/device-network-configuration)
7. Start chatting with the device and observe bridge logs:
   - Speak to the device after network setup.
   - You should see proxied ASR messages in `openclaw_mqtt_bridge.py` output and response messages returned through MQTT.

## MQTT configuration

| Option | Description | Example |
|--------|-------------|---------|
| MQTT_BROKER | MQTT broker host used by `openclaw_mqtt_bridge.py` and the device client | `127.0.0.1` (local broker) / `192.168.100.132` (LAN broker) |
| MQTT_PORT | MQTT broker port | `1883` |
| MQTT_TOPIC_IN_COMMAND | Topic carrying device ASR text to OpenClaw | `openclaw/device/user_speech_text` |
| MQTT_TOPIC_OUT_RESULT | Topic carrying OpenClaw results back to the device | `openclaw/server/response` |

Use `127.0.0.1` for a local broker, or the broker machine's LAN IP/domain for a remote broker.

## Notes

- **Same LAN**: The TuyaOpen device and the PC running OpenClaw and Mosquitto must be on the same local network, and the device must be able to reach the PC’s MQTT port.
- **IP**: If the PC’s IP changes, update `MQTT_BROKER` on both the device and the bridge.
- **Broker reachability**: If LAN clients cannot connect, verify Mosquitto is listening on the expected interface/port and open `1883/tcp` in the firewall.
- **Ecosystem**: Additional TuyaOpen + OpenClaw integration options are in development; check the repository and docs for updates.

## Expected result

After completing the steps, voice input on the TuyaOpen device is transcribed by Tuya Cloud ASR; the device sends the text over MQTT to the PC; OpenClaw runs the corresponding tasks (e.g. email, create folder, code). You get a lightweight "voice-controlled desktop" assistant.

## References

- [Environment setup and code download](/docs/quick-start/enviroment-setup)
- [Firmware burning](/docs/quick-start/firmware-burning)
- [Device network configuration](/docs/quick-start/device-network-configuration)
- [Equipment authorization](/docs/quick-start/equipment-authorization)
- [OpenClaw official documentation](https://openclaw.ai/)
- [MQTT OpenClaw Bridge](https://github.com/adwuard/openclaw_tuya_mqtt_proxy)
- [openclaw_remote_mqtt.c (TuyaOpen)](https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/openclaw_demo_app/src/openclaw_remote_mqtt.c)
