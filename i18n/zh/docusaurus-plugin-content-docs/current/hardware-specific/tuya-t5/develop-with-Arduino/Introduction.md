# 概述

[Arduino-TuyaOpen](https://github.com/tuya/arduino-TuyaOpen/tree/main) 是涂鸦针对 Arduino 平台提供的开源开发框架，让众多喜欢 Arduino 的开发者可以快速开发出基于涂鸦云平台的 AIoT 智能设备，实现远程 AI 智能控制。

Arduino-TuyaOpen 基于 [TuyaOpen](https://github.com/tuya/TuyaOpen) 框架二次开发，提供了更简洁的 Arduino 风格 API 接口，方便用户快速开发。它基于 Arduino 通用接口设计，支持 Bluetooth、Wi-Fi、Ethernet 等通信协议，提供了物联网开发的核心功能，包括配网，激活，控制，升级等；它具备强大的安全合规能力，包括设备认证、数据加密、通信加密等，满足全球各个国家和地区的数据合规需求。

基于 TuyaOpen 开发的 AIoT 产品，可以使用涂鸦APP、云服务提供的强大生态能力，并与 Power By Tuya 设备互联互通。

同时 TuyaOpen 正在不断拓展，提供更多云平台接入功能，及语音、视频、AI Agent功能，Arduino-TuyaOpen 也会同步更新支持更多新的功能和特性。

## T5 + Arduino 支持的功能

#### Arduino 标准接口

使用熟悉的 Arduino API 进行 T5 开发：

- **数字 I/O**：`pinMode()`、`digitalWrite()`、`digitalRead()` - 控制 LED、继电器、读取按钮状态
- **模拟输入**：`analogRead()` - 读取传感器数值（温湿度、光照、电位器等），12位精度
- **PWM 输出**：`analogWrite()` - 控制电机速度、LED 亮度、舵机角度
- **串口通信**：`Serial`、`Serial1`、`Serial2` - 与外部模块通信（GPS、指纹、传感器）
- **I2C 总线**：`Wire` - 连接 OLED 屏幕、传感器模块
- **SPI 总线**：`SPI` - 连接 SD 卡、高速传感器

#### 无线连接

- **Wi-Fi 连接**：支持 AP 配网、蓝牙配网，连接涂鸦云实现远程控制
- **蓝牙 BLE**：与手机 App 通信，实现近场控制和数据传输
- **OTA 升级**：通过云端远程升级固件，方便产品迭代

#### 涂鸦云服务

- **设备激活**：快速接入涂鸦云，获得设备管理能力
- **DP 数据点**：使用标准化的数据点模型，与涂鸦 App 无缝交互
- **远程控制**：通过涂鸦 App 随时随地控制设备
- **场景联动**：与其他 Power By Tuya 设备联动，构建智能家居场景

#### AI 智能能力

- **语音识别（ASR）**：离线/在线语音识别，实现语音控制
- **语音合成（TTS）**：文本转语音播报，提供语音反馈
- **关键词唤醒（KWS）**：支持自定义唤醒词
- **AI 对话**：接入大语言模型（Deepseek、ChatGPT 等），打造 AI 助手

## 应用场景示例

**智能传感器节点**：使用 `analogRead()` 读取温湿度传感器，通过 Wi-Fi 上传数据到涂鸦云，在 App 中查看历史曲线和接收异常告警。

**智能开关/灯控**：使用 `digitalWrite()` 控制继电器或 `analogWrite()` 调节 PWM 调光，通过涂鸦 App 远程开关、定时控制、场景联动。

**语音交互设备**：结合 T5 的语音能力，开发语音控制面板、AI 音箱，语音唤醒后识别指令并执行动作。

**显示类产品**：通过 SPI/I2C 驱动显示屏（OLED、TFT），实时显示传感器数据、天气信息、设备状态等。

**电机控制**：使用 PWM 控制直流电机、步进电机，开发智能窗帘、风扇、机器人等产品。
