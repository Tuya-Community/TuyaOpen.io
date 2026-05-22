# Overview

[Arduino-TuyaOpen](https://github.com/tuya/arduino-TuyaOpen/tree/main) is an open-source development framework provided by Tuya for the Arduino platform, enabling Arduino enthusiasts to rapidly develop AIoT smart devices based on the Tuya Cloud platform with remote AI-powered control.

Arduino-TuyaOpen is built on top of the [TuyaOpen](https://github.com/tuya/TuyaOpen) framework, offering a simplified set of Arduino-style APIs for faster development. Designed around the Arduino common interface standard, it supports communication protocols such as Bluetooth, Wi-Fi, and Ethernet, and provides core IoT development capabilities including network provisioning, activation, control, and OTA upgrades. It features robust security and compliance capabilities — including device authentication, data encryption, and communication encryption — to meet data compliance requirements across countries and regions worldwide.

AIoT products developed on TuyaOpen can leverage the powerful ecosystem capabilities provided by the Tuya App and cloud services, and interoperate with all Power By Tuya devices.

TuyaOpen is continuously expanding with more cloud platform integrations, voice, video, and AI Agent features. Arduino-TuyaOpen will be updated in sync to support these new capabilities.

## T5 + Arduino Supported Features

### Arduino Standard Interface

Develop with T5 using familiar Arduino APIs:

- **Digital I/O**: `pinMode()`, `digitalWrite()`, `digitalRead()` - Control LEDs, relays, read button states
- **Analog Input**: `analogRead()` - Read sensor values (temperature, humidity, light, potentiometers, etc.), 12-bit resolution
- **PWM Output**: `analogWrite()` - Control motor speed, LED brightness, servo angles
- **Serial Communication**: `Serial`, `Serial1`, `Serial2` - Communicate with external modules (GPS, fingerprint, sensors)
- **I2C Bus**: `Wire` - Connect OLED displays, sensor modules
- **SPI Bus**: `SPI` - Connect SD cards, high-speed sensors

### Wireless Connectivity

- **Wi-Fi Connection**: Supports AP provisioning and Bluetooth provisioning, connects to Tuya Cloud for remote control
- **Bluetooth BLE**: Communicate with mobile apps for local control and data transmission
- **OTA Upgrade**: Remotely upgrade firmware via cloud, facilitating product iterations

### Tuya Cloud Services

- **Device Activation**: Quickly connect to Tuya Cloud for device management capabilities
- **DP Data Points**: Use standardized data point models for seamless interaction with Tuya App
- **Remote Control**: Control devices anytime, anywhere via Tuya App
- **Scene Linkage**: Link with other Power By Tuya devices to build smart home scenarios

### AI Intelligence Capabilities

- **Automatic Speech Recognition (ASR)**: Offline/online speech recognition for voice control
- **Text-to-Speech (TTS)**: Text-to-speech announcements for voice feedback
- **Keyword Wake-up (KWS)**: Support custom wake words
- **AI Dialogue**: Integrate with Large Language Models (Deepseek, ChatGPT, etc.) to build AI assistants

### Application Scenarios

**Smart Sensor Node**: Use `analogRead()` to read temperature and humidity sensors, upload data to Tuya Cloud via Wi-Fi, view historical charts and receive abnormal alerts in the App.

**Smart Switch/Light Control**: Use `digitalWrite()` to control relays or `analogWrite()` to adjust PWM dimming, remotely switch via Tuya App, schedule control, and scene linkage.

**Voice Interactive Device**: Combine T5's voice capabilities to develop voice control panels and AI speakers - wake up by voice, recognize commands, and execute actions.

**Display Products**: Drive displays (OLED, TFT) via SPI/I2C to show sensor data, weather information, device status, etc. in real-time.

**Motor Control**: Use PWM to control DC motors and stepper motors, develop smart curtains, fans, robots, and other products.

