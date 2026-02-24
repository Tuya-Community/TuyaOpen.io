# 快速开始

## Arduino IDE 下载

推荐安装最新版本的 Arduino IDE，可点击 [Arduino 官网](https://www.arduino.cc/) 根据您使用的操作系统下载。本项目的所有编译烧录测试均在 Arduino IDE 2 上进行。

## 开发板管理器安装

1. 复制下方开发板管理地址：

    - GitHub 地址：
    ```
    https://github.com/tuya/arduino-tuyaopen/releases/download/global/package_tuya_open_index.json
    ```

    - 或者使用 gitee 地址：
    ```
    https://gitee.com/tuya-open/arduino-tuyaopen/releases/download/global/package_tuya_open_index_cn.json
    ```

2. 启动 Arduino IDE 2，并依次点击 “文件” -> “首选项” ，打开首选项窗口。

  ![Preferences](https://images.tuyacn.com/fe-static/docs/img/9f354b85-5f9d-4af6-be60-c114d7b1e822.png)

3. 在 “其他开发板管理器地址” 中输入上述开发板管理地址。

  ![BoardManagerURL](https://images.tuyacn.com/fe-static/docs/img/3e53a3ce-c603-481a-9ac0-fd20d6fa6525.png)

4. 在左侧“开发板管理器”中输入 `Tuya Open` 查找并安装最新版本。安装成功后即可选择 TUYA 系列开发板。

  ![BoardManager](https://images.tuyacn.com/fe-static/docs/img/7ad65978-9e6d-424f-a38d-7663fb9ce1ee.png)

## 设备硬件选择

推荐使用 [T5AI-Board Devkit](https://tuyaopen.ai/zh/docs/hardware-specific/tuya-t5/t5-ai-board/overview-t5-ai-board) 开发板和 [T5AI-Core Devkit](https://tuyaopen.ai/zh/docs/hardware-specific/tuya-t5/t5-ai-core/overview-t5-ai-core) 开发板进行开发。

- **T5AI-Board Devkit**：提供丰富的外设扩展，包括 LCD 屏幕、摄像头、麦克风、扬声器、SD 卡等。
- **T5AI-Core Devkit**：高集成度语音核心开发板，适用于低功耗与便携场景下的 AIoT 语音交互应用开发。

## APP 设备配网

涂鸦的 AIoT 设备统一使用 `智能生活 APP` 进行配网，APP 下载及具体配网操作请参考[设备配网文档](https://tuyaopen.ai/zh/docs/quick-start/device-network-configuration)。

## 云服务 - AIoT 能力

**涂鸦所有的 AIoT 能力都与设备的 PID 深度绑定**，代码中提供的默认 PID 支持当前示例所涉及的 AIoT 能力。如需扩展更多能力（角色管理、设备自控、设备被控、数据库、触发器、智能体、MCP 服务器），请参考[创建新产品文档](https://tuyaopen.ai/zh/docs/cloud/tuya-cloud/creating-new-product)进行配置。

> 建议先使用默认 PID 配置，熟悉设备功能后添加更多 AI 功能。

```c
#define TUYA_PRODUCT_ID     "xxxxxxxxxxxxxxxx"
```

## 示例介绍

Arduino-TuyaOpen 提供 `AI Agent`、`WiFi`、`BLE`、`IoT`、`音视频`、`摄像头`、`UART/IIC/SPI` 等丰富的外设示例以及最新的 AI 能力，方便快速上手开发。

- **我想快速体验：**`AIcomponents/examples/YourChatBot` 是一个完整的聊天机器人示例，参考[应用开发文档](Application.md)可以快速体验所有 AI 能力。
- **我想逐步学习：**[AI API 开发文档](AI_API_Development.md)提供了由浅入深的 AI 示例，帮助开发者快速上手 AI 能力（文本、音频、MCP、Skill 等）开发。各外设库目录下也提供了对应的硬件示例（串口、IIC、麦克风、扬声器、摄像头、屏幕、SD 卡等）。

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
Wire                // IIC 
└─examples
    └─masterWriter
```

