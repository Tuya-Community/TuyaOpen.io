---
title: Overview
---

[Arduino-TuyaOpen](https://github.com/tuya/arduino-TuyaOpen/tree/main) is an open-source development framework that lets you build AIoT smart devices on the Arduino platform, backed by the Tuya Cloud and remote AI-powered control.

Arduino-TuyaOpen is built on top of the [TuyaOpen](https://github.com/tuya/TuyaOpen) framework and exposes a simplified set of Arduino-style APIs for faster development. Designed around the Arduino common interface standard, it supports communication protocols such as Bluetooth, Wi-Fi, and Ethernet, and provides core IoT capabilities including network provisioning, activation, control, and OTA upgrades. It carries the security and compliance features — device authentication, data encryption, and communication encryption — needed to meet data compliance requirements across countries and regions worldwide.

AIoT products developed on TuyaOpen leverage the ecosystem capabilities of the Tuya App and cloud services, and interoperate with all Powered by Tuya devices.

TuyaOpen continues to expand with more cloud platform integrations, voice, video, and AI Agent features. Arduino-TuyaOpen is updated in sync to support these new capabilities.

## T5 and Arduino supported features

### Arduino standard interface

Develop on T5 using familiar Arduino APIs:

- **Digital I/O**: `pinMode()`, `digitalWrite()`, `digitalRead()` — control LEDs and relays, read button states.
- **Analog input**: `analogRead()` — read sensor values (temperature, humidity, light, potentiometers, and more) at 12-bit resolution.
- **PWM output**: `analogWrite()` — control motor speed, LED brightness, and servo angles.
- **Serial communication**: `Serial`, `Serial1`, `Serial2` — communicate with external modules (GPS, fingerprint, sensors).
- **I2C bus**: `Wire` — connect OLED displays and sensor modules.
- **SPI bus**: `SPI` — connect SD cards and high-speed sensors.

### Wireless connectivity

- **Wi-Fi connection**: supports AP provisioning and Bluetooth provisioning, and connects to the Tuya Cloud for remote control.
- **Bluetooth BLE**: communicates with mobile apps for local control and data transmission.
- **OTA upgrade**: upgrades firmware remotely via the cloud, easing product iteration.

### Tuya Cloud services

- **Device activation**: connect to the Tuya Cloud for device management capabilities.
- **DP data points**: use the standardized data point model for seamless interaction with the Tuya App.
- **Remote control**: control devices anytime, anywhere via the Tuya App.
- **Scene linkage**: link with other Powered by Tuya devices to build smart home scenarios.

### AI intelligence capabilities

- **Automatic Speech Recognition (ASR)**: offline and online speech recognition for voice control.
- **Text-to-Speech (TTS)**: text-to-speech announcements for voice feedback.
- **Keyword wake-up (KWS)**: support for custom wake words.
- **AI dialogue**: integrate with large language models (Deepseek, ChatGPT, and others) to build AI assistants.

### Application scenarios

- **Smart sensor node**: read temperature and humidity sensors with `analogRead()`, upload the data to the Tuya Cloud over Wi-Fi, then view historical charts and receive alerts in the App.
- **Smart switch / light control**: drive relays with `digitalWrite()` or adjust PWM dimming with `analogWrite()`, then switch remotely, schedule control, and link scenes through the Tuya App.
- **Voice interactive device**: combine T5's voice capabilities to build voice control panels and AI speakers — wake by voice, recognize commands, and execute actions.
- **Display products**: drive displays (OLED, TFT) over SPI or I2C to show sensor data, weather, and device status in real time.
- **Motor control**: use PWM to drive DC and stepper motors for smart curtains, fans, robots, and similar products.

## See also

- [Quick Start](Quick_start.md) — install the Arduino IDE and flash your first example.
