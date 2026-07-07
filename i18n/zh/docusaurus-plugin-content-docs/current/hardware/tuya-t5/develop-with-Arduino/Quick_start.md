---
title: 快速开始
description: "Arduino IDE 上手 T5 开发板的快速指南：安装 IDE、添加涂鸦开发板管理器、选择开发板，并通过手机 App 完成设备配网。"
keywords:
  - Arduino
  - T5
  - 快速开始
  - 开发板管理器
  - 配网
---

本指南带你从全新的 Arduino IDE 开始，完成一次 T5 示例烧录：安装 IDE、添加涂鸦开发板管理器、选择开发板，并通过手机 App 完成设备配网。

## 下载 Arduino IDE

安装最新版本的 Arduino IDE，可前往 [Arduino 官网](https://www.arduino.cc/) 根据所用操作系统下载。本项目的所有编译烧录测试均在 Arduino IDE 2 上完成。

## 安装开发板管理器

1. 复制下方任一开发板管理器地址。

    - GitHub 地址：

    ```
    https://github.com/tuya/arduino-tuyaopen/releases/download/global/package_tuya_open_index.json
    ```

    - Gitee 地址：

    ```
    https://gitee.com/tuya-open/arduino-tuyaopen/releases/download/global/package_tuya_open_index_cn.json
    ```

2. 启动 Arduino IDE 2，依次点击 **文件** -> **首选项**，打开首选项窗口。

    ![Arduino IDE 首选项窗口](https://images.tuyacn.com/fe-static/docs/img/9f354b85-5f9d-4af6-be60-c114d7b1e822.png)

3. 在 **其他开发板管理器地址** 中输入上述开发板管理器地址。

    ![其他开发板管理器地址输入框](https://images.tuyacn.com/fe-static/docs/img/3e53a3ce-c603-481a-9ac0-fd20d6fa6525.png)

4. 打开左侧的 **开发板管理器** 面板，搜索 `Tuya Open` 并安装最新版本。安装成功后即可选择 TUYA 系列开发板。

    ![开发板管理器面板已安装 Tuya Open](https://images.tuyacn.com/fe-static/docs/img/7ad65978-9e6d-424f-a38d-7663fb9ce1ee.png)

## 设备硬件选择

推荐使用 [T5AI-Board Devkit](https://tuyaopen.ai/zh/docs/hardware/tuya-t5/t5-ai-board/overview-t5-ai-board) 与 [T5AI-Core Devkit](https://tuyaopen.ai/zh/docs/hardware/tuya-t5/t5-ai-core/overview-t5-ai-core) 进行开发。

- **T5AI-Board Devkit**：提供丰富的外设扩展，包括 LCD 屏幕、摄像头、麦克风、扬声器、SD 卡等。
- **T5AI-Core Devkit**：高集成度语音核心开发板，适用于低功耗与便携场景下的 AIoT 语音交互应用开发。

## 使用 App 配网

涂鸦的 AIoT 设备统一使用 `智能生活 APP` 进行配网。App 下载及具体配网步骤请参考[设备配网文档](https://tuyaopen.ai/zh/docs/quick-start/device-network-configuration)。

## 云服务与 AIoT 能力

涂鸦所有 AIoT 能力都与设备的 PID 绑定。示例代码中提供的默认 PID 支持当前示例所涉及的 AIoT 能力。如需扩展更多能力（角色管理、设备自控、设备被控、数据库、触发器、智能体、MCP 服务器），请参考[创建新产品文档](https://tuyaopen.ai/zh/docs/cloud/tuya-cloud/creating-new-product)进行配置。

:::tip
建议先使用默认 PID 配置，熟悉设备功能后再添加更多 AI 能力。
:::

```c
#define TUYA_PRODUCT_ID     "xxxxxxxxxxxxxxxx"
```

## 示例介绍

Arduino-TuyaOpen 提供 `AI Agent`、`WiFi`、`BLE`、`IoT`、`音视频`、`摄像头`、`UART/I2C/SPI` 等丰富的外设示例，以及最新的 AI 能力，方便快速上手开发。

- **快速体验**：`AIcomponents/examples/YourChatBot` 是一个完整的聊天机器人示例，参考[应用开发文档](Application.md)可快速体验所有 AI 能力。
- **逐步学习**：[AI API 开发文档](AI_API_Development.md)提供了由浅入深的 AI 示例，涵盖文本、音频、MCP、Skill 等。各外设库目录下也提供了对应的硬件示例（串口、I2C、麦克风、扬声器、摄像头、屏幕、SD 卡等）。

示例代码目录结构如下：

```
AIcomponents        // AI 组件
└─examples
    ├─00_IoT_SimpleExample
    ├─01_AI_TextChat
    ├─02_AI_AudioChat
    ├─03_AI_AudioSave
    ├─04_AI_Mcp
    ├─05_AI_Skill
    ├─06_AI_TuyaUI
    └─YourChatBot
Audio               // 音频
└─examples
    ├─Audio2SDcard
    ├─AudioRecorder
    └─AudioSpeaker
BLE                 // BLE
└─examples
    └─ble_server
Camera              // 摄像头
└─examples
    ├─Camera2Display
    └─Camera2SDcard
Display             // 显示
└─examples
    ├─DisplayFill
    ├─DisplayPicture
    └─LVGLdemo
DNSServer           // DNS 服务器
└─examples
    └─CaptivePortal
FSDemo              // 文件系统演示
└─examples
    ├─LittleFSDemo
    └─SDCardDemo
HTTPClient          // HTTP 客户端
└─examples
    ├─BasicHttpClient
    └─BasicHttpsClient
Log                 // 日志
└─examples
    └─logOutput
MQTTClient          // MQTT 客户端
└─examples
    ├─mqtt_auth
    ├─mqtt_basic
    └─mqtt_publish_in_callback
Peripherals         // 外设
└─examples
    └─Button
SPI                 // SPI
└─examples
    └─spiDemo
Ticker              // 定时器
└─examples
    ├─Blinker
    └─TickerParameter
TuyaIoT             // IoT
└─examples
    ├─dpType
    ├─quickStart
    └─weatherGet
WiFi                // WiFi
└─examples
    ├─SimpleWiFiServer
    ├─WiFiAccessPoint
    ├─WiFiClient
    ├─WiFiClientBasic
    ├─WiFiClientConnect
    ├─WiFiClientEvents
    ├─WiFiClientStaticIP
    ├─WiFiMulti
    ├─WiFiScan
    ├─WiFiScanDualAntenna
    ├─WiFiTelnetToSerial
    └─WiFiUDPClient
Wire                // I2C
└─examples
    └─masterWriter
```

## 相关文档

- [应用开发](Application.md) —— 烧录完整的 `YourChatBot` 示例。
- [AI API 开发](AI_API_Development.md) —— 逐步学习渐进式 AI 示例。
