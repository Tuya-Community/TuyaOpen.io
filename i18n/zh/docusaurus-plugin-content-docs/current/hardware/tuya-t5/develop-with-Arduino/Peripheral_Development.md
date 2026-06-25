# Arduino 外设开发

本文档介绍如何在 Arduino IDE 中使用 Arduino-TuyaOpen 框架进行外设与网络开发。框架提供了丰富的外设驱动和网络通信库，帮助开发者快速实现 WiFi 联网、蓝牙通信、音视频采集、屏幕显示、文件存储、云端接入等功能。以下示例将按功能分类，引导您逐步掌握各外设库的使用方法。

```
外设与网络库
├── Log           - 日志输出
├── Ticker        - 软件定时器
├── Peripherals   - 按键驱动
├── SPI           - SPI 总线通信
├── Wire          - I2C 总线通信
├── FS / FSDemo   - LittleFS / SD 卡文件系统
├── Audio         - 音频录制与播放
├── Display       - 屏幕显示与 LVGL
├── Camera        - 摄像头采集与预览
├── BLE           - 低功耗蓝牙 GATT 服务
├── WiFi          - WiFi STA/AP/扫描/事件
├── TuyaIoT       - 涂鸦 IoT 云端接入
├── HTTPClient    - HTTP/HTTPS 客户端
├── MQTTClient    - MQTT 消息通信
└── DNSServer     - DNS 服务器（Captive Portal）
```

---

## 日志输出

Log 库提供了统一的日志输出功能，支持不同日志级别的输出控制。

### [logOutput](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/Log/examples/logOutput)

日志输出基础示例。本示例演示了如何使用 `Log` 类和 `PR_DEBUG` 宏输出调试日志信息，是所有项目中日志调试的基础用法。

- 使用 `Log.begin()` 初始化日志系统
- 支持 `PR_DEBUG`、`PR_NOTICE`、`PR_ERR` 等日志级别
- 硬件平台：所有开发板

---

## 软件定时器

Ticker 库提供了轻量级的软件定时器，支持定时执行回调函数，适用于周期性任务场景。

### [Blinker](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/Ticker/examples/Blinker)

定时器 LED 闪烁示例。本示例演示了如何使用 `Ticker` 类创建定时器，以固定间隔切换 LED 状态实现闪烁效果。

- 使用 `ticker.attach()` 设置周期和回调函数
- 硬件平台：所有开发板

### [TickerParameter](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/Ticker/examples/TickerParameter)

带参数定时器回调示例。本示例演示了如何使用 `Ticker` 类的参数化回调功能，将自定义参数传递给定时器回调函数，实现更灵活的定时任务。

- 使用 `ticker.attach()` 的带参数重载版本
- 硬件平台：所有开发板

---

## 外设接口

### [Button](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/Peripherals/examples/Button)

多按键事件驱动示例。本示例演示了如何使用 `Button` 类管理多个按键，为每个按键配置 GPIO 引脚、有效电平和上拉模式，并注册单击、双击、长按等事件的回调函数，实现按键事件驱动的交互逻辑。

- 使用 `ButtonConfig_t` / `PinConfig_t` 配置按键参数
- 支持 `BUTTON_EVENT_SINGLE_CLICK`、`BUTTON_EVENT_DOUBLE_CLICK`、`BUTTON_EVENT_LONG_PRESS` 等事件类型
- 硬件平台：所有开发板

### [spiDemo](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/SPI/examples/spiDemo)

SPI 总线通信示例。本示例演示了如何使用 `SPI` 类进行 SPI 数据传输——初始化 SPI 总线后，通过 `SPI.transfer()` 发送数据并接收返回值。

- 使用标准 Arduino SPI 接口
- 硬件平台：所有支持 SPI 的开发板

### [masterWriter](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/Wire/examples/masterWriter)

I2C 主机写入示例。本示例演示了如何使用 `Wire` 类作为 I2C 主机向从设备发送数据——初始化 I2C 总线后，周期性地向指定从机地址发送字节数据。

- 使用标准 Arduino Wire 接口：`Wire.beginTransmission()`、`Wire.write()`、`Wire.endTransmission()`
- 硬件平台：所有支持 I2C 的开发板

---

## 文件系统

FSDemo 库提供了 LittleFS 内部文件系统和 SD 卡外部存储的文件操作接口，使用统一的 `VFSFILE` 类进行文件读写、目录管理。

### [LittleFSDemo](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/FSDemo/examples/LittleFSDemo)

LittleFS 文件系统操作示例。本示例演示了 LittleFS 内部文件系统的基本操作，包括文件的创建、写入、读取、定位（seek/position）、文件大小查询、目录的创建与删除、文件重命名，以及跨文件复制。

- 使用 `VFSFILE fs(LITTLEFS)` 初始化 LittleFS
- 支持 `open`、`read`、`write`、`lseek`、`readtillN`、`mkdir`、`rename`、`remove` 等操作
- 硬件平台：所有支持 LittleFS 的开发板

### [SDCardDemo](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/FSDemo/examples/SDCardDemo)

SD 卡文件操作示例。本示例演示了 SD 卡的完整文件操作流程，包括基础操作（创建目录、创建文件、获取文件大小）、文件读写操作（多行写入、全量读取、追加写入、逐行读取）以及目录遍历（列出目录下所有文件及大小）。

- 使用 `VFSFILE fs(SDCARD)` 初始化 SD 卡
- 包含 SD 卡挂载检测和错误处理
- 硬件平台：仅支持 T5AI-Board 开发板（需 SD 卡）

---

## 音频

Audio 库提供了音频录制和播放功能，支持 PCM 原始数据和 MP3 解码播放，适用于语音采集、音频播放等场景。

### [Audio2SDcard](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/Audio/examples/Audio2SDcard)

按键触发录音保存示例。本示例演示了如何通过按键控制麦克风录音，将采集到的 PCM 原始音频数据或 WAV 格式音频保存到 SD 卡，支持通过宏定义切换 PCM / WAV 两种保存格式。

- 使用 `Audio` 类配置采样率、位深度、通道数等音频参数
- 使用 `Button` 类实现按下开始录音、松开停止录音
- WAV 模式会自动生成文件头
- 硬件平台：仅支持 T5AI-Board 开发板（需 SD 卡）

### [AudioRecorder](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/Audio/examples/AudioRecorder)

音频录制与回放示例。本示例演示了如何录制一段音频并立即播放回放——按键触发录制，录制完成后自动播放，音频数据暂存在内存缓冲区中。

- 适用于对讲、语音留言等场景
- 硬件平台：仅支持 TUYA-T5AI 系列

### [AudioSpeaker](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/Audio/examples/AudioSpeaker)

MP3 音频播放示例。本示例演示了三种 MP3 音频播放方式：从 C 语言数组播放（内嵌在固件中）、从 Flash 文件系统播放、从 SD 卡文件播放，支持播放状态回调。

- 使用 `Audio` 类的 `playMp3()` 系列接口
- 支持播放完成回调通知
- 硬件平台：仅支持 TUYA-T5AI 系列

---

## 屏幕显示

Display 库提供了 LCD 屏幕的基本显示功能和 LVGL 图形库集成，支持色块填充、图片显示、旋转以及 LVGL UI 开发。

### [DisplayFill](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/Display/examples/DisplayFill)

屏幕色块填充示例。本示例演示了如何使用 `Display` 类在 LCD 屏幕上进行色块填充——初始化显示屏后，每隔一定时间用随机颜色填充整个屏幕。

- 使用 `display.fill()` 进行全屏或区域填充
- 硬件平台：仅支持 T5AI-Board 开发板

### [DisplayPicture](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/Display/examples/DisplayPicture)

图片显示与旋转示例。本示例演示了如何在 LCD 屏幕上显示图片，并通过 `display.setRotation()` 设置屏幕旋转方向（0°/90°/180°/270°），实现图片在不同方向上的显示。

- 支持从 C 数组加载图片数据
- 硬件平台：仅支持 T5AI-Board 开发板

### [LVGLdemo](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/Display/examples/LVGLdemo)

LVGL 图形库示例。本示例演示了如何在设备上使用 LVGL（Light and Versatile Graphics Library）创建 UI 界面——初始化 LVGL 环境后，创建一个带有 "Hello World" 文本的标签控件。

- 使用 `lv_vendor` 进行 LVGL 初始化和刷新
- 可在此基础上扩展更复杂的 UI 界面
- 硬件平台：仅支持 T5AI-Board 开发板

---

## 摄像头

Camera 库提供了摄像头采集功能，支持 YUV422 实时预览和 JPEG / H264 编码输出，适用于拍照、录像等场景。

### [Camera2Display](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/Camera/examples/Camera2Display)

摄像头实时预览示例。本示例演示了如何初始化摄像头和显示屏，以 YUV422 格式持续采集图像帧并实时显示到 LCD 屏幕上，实现摄像头画面的实时预览。

- 使用 `Camera` 类采集 YUV422 帧，`Display` 类显示
- 硬件平台：仅支持 T5AI-Board 开发板

### [Camera2SDcard](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/Camera/examples/Camera2SDcard)

摄像头拍照/录像示例。本示例演示了如何通过按键控制摄像头拍照或录像，并将数据保存到 SD 卡。支持两种模式（通过宏定义切换）：JPEG 模式下单击按键拍摄一张照片，H264 模式下按住按键持续录像、松开停止。

- 实时 YUV422 预览的同时进行编码输出
- JPEG 照片以时间戳命名，H264 视频按帧写入
- 硬件平台：仅支持 T5AI-Board 开发板（需 SD 卡）

---

## 低功耗蓝牙（BLE）

BLE 库提供了低功耗蓝牙 GATT 服务端功能，支持创建自定义 Service 和 Characteristic，实现与手机或其他 BLE 设备的数据交互。

### [ble_server](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/BLE/examples/ble_server)

BLE GATT 服务器示例。本示例演示了如何创建一个 BLE GATT 服务器——定义自定义 Service UUID 和 Characteristic UUID，设置读写属性和 Notify/Indicate 通知功能，通过回调函数处理客户端的连接、读写和订阅事件。

- 使用 `BLEDEV`、`BLEServer`、`BLEService`、`BLECharacteristic` 类构建 GATT 服务
- 支持 Notify 和 Indicate 两种通知方式
- 硬件平台：支持 BLE 的开发板

---

## WiFi 网络

WiFi 库提供了完整的无线网络功能，包括 STA 模式连接路由器、AP 模式创建热点、网络扫描、事件监听、静态 IP 配置、多 AP 自动切换等。以下示例覆盖了 WiFi 开发中的常见场景。

### [SimpleWiFiServer](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/WiFi/examples/SimpleWiFiServer)

WiFi STA 模式下的 HTTP 服务器示例。本示例演示了如何连接 WiFi 后启动一个简单的 HTTP 服务器，通过浏览器访问设备 IP 地址即可控制 GPIO 引脚上 LED 的亮灭。

- 使用 `WiFiServer` 监听 80 端口，解析 HTTP 请求路径 `/H` 和 `/L` 控制 LED
- 硬件平台：所有支持 WiFi 的开发板

### [WiFiAccessPoint](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/WiFi/examples/WiFiAccessPoint)

WiFi AP（热点）模式示例。本示例演示了如何使用 `WiFi.softAP()` 创建一个无线热点，并在热点上启动 HTTP 服务器，连接热点的设备可通过浏览器控制板载 LED。

- 适用于无路由器环境下的设备直连控制场景
- 硬件平台：所有支持 WiFi 的开发板

### [WiFiClient](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/WiFi/examples/WiFiClient)

WiFi 客户端数据上报示例。本示例演示了如何使用 `WiFiClient` 连接 ThingSpeak 云平台，周期性上报传感器数据并读取历史记录，展示了 HTTP GET 请求的完整读写流程。

- 需替换为您自己的 ThingSpeak Channel ID 和 API Key
- 硬件平台：所有支持 WiFi 的开发板

### [WiFiClientBasic](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/WiFi/examples/WiFiClientBasic)

WiFi TCP 客户端基础示例。本示例演示了如何使用 `WiFiClient` 建立 TCP 连接，向远端服务器发送 HTTP GET 请求并读取响应数据，是最基本的网络通信示例。

- 硬件平台：所有支持 WiFi 的开发板

### [WiFiClientConnect](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/WiFi/examples/WiFiClientConnect)

WiFi 连接状态机示例。本示例演示了如何通过轮询 `WiFi.status()` 返回值实现完整的连接状态管理，包括连接成功、未找到 AP、连接失败等多种状态处理，并支持按键触发断开连接。

- 展示了生产级 WiFi 连接管理的推荐写法
- 硬件平台：所有支持 WiFi 的开发板

### [WiFiClientEvents](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/WiFi/examples/WiFiClientEvents)

WiFi 事件回调示例。本示例演示了如何使用 `WiFi.onEvent()` 注册全局事件回调和特定事件回调（如获取 IP、断开连接），涵盖了 STA、AP、WPS、以太网等全部事件类型的处理。

- 支持函数指针、Lambda 表达式等多种回调注册方式
- 硬件平台：所有支持 WiFi 的开发板

### [WiFiClientStaticIP](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/WiFi/examples/WiFiClientStaticIP)

WiFi 静态 IP 配置示例。本示例演示了如何使用 `WiFi.config()` 设置静态 IP 地址、网关、子网掩码和 DNS 服务器，连接成功后打印完整的网络配置信息并发起 HTTP 请求。

- 适用于需要固定 IP 地址的部署场景
- 硬件平台：所有支持 WiFi 的开发板

### [WiFiMulti](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/WiFi/examples/WiFiMulti)

多 AP 自动切换示例。本示例演示了如何使用 `WiFiMulti` 类添加多个 WiFi 热点，设备将自动选择信号最强的热点进行连接，连接断开后自动切换到其他可用热点。

- 适用于需要在多个 WiFi 环境间无缝漫游的场景
- 硬件平台：所有支持 WiFi 的开发板

### [WiFiScan](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/WiFi/examples/WiFiScan)

WiFi 网络扫描示例。本示例演示了如何使用 `WiFi.scanNetworks()` 扫描周围的 WiFi 网络，并打印每个网络的 SSID、RSSI 信号强度、信道和加密方式。

- 支持 OPEN、WEP、WPA PSK、WPA2 PSK、WPA3 等加密类型识别
- 硬件平台：所有支持 WiFi 的开发板

### [WiFiScanDualAntenna](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/WiFi/examples/WiFiScanDualAntenna)

WiFi 双天线扫描示例。本示例演示了如何使用 `WiFi.setDualAntennaConfig()` 配置双天线的 GPIO 引脚和收发天线模式，启用双天线后执行网络扫描。

- 需要硬件支持双天线功能
- 硬件平台：支持双天线的开发板

### [WiFiTelnetToSerial](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/WiFi/examples/WiFiTelnetToSerial)

WiFi Telnet 串口桥示例。本示例演示了如何将 WiFi Telnet 连接与硬件串口进行桥接——通过 Telnet 客户端连接设备后，Telnet 收发的数据将透传至串口，串口收发的数据也将透传至 Telnet。

- 使用 `WiFiMulti` 支持多 AP，监听 23 端口
- 适用于远程串口调试场景
- 硬件平台：所有支持 WiFi 的开发板

### [WiFiUDPClient](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/WiFi/examples/WiFiUDPClient)

WiFi UDP 通信示例。本示例演示了如何使用 `WiFiUDP` 类进行 UDP 数据收发——监听指定端口，接收到 UDP 数据包后打印来源 IP、端口和内容，并回复确认消息。

- 适用于局域网低延迟通信场景
- 硬件平台：所有支持 WiFi 的开发板

---

## 涂鸦 IoT 云端接入

TuyaIoT 库提供了涂鸦 IoT 平台的设备接入能力，通过 DP（Data Point）模型实现设备与云端、APP 的数据交互，支持设备激活、数据上报、指令下发、天气查询等功能。

### [quickStart](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/TuyaIoT/examples/quickStart)

涂鸦 IoT 快速入门示例。本示例演示了完整的涂鸦 IoT 设备开发流程——配置设备 License，初始化 `TuyaIoT`，通过事件回调处理设备绑定、云端连接、DP 指令下发等事件，实现手机 APP 与板载 LED 的双向控制。

- 按键短按切换 LED 状态并上报，长按移除设备绑定
- 使用 `TuyaIoT.write()` / `TuyaIoT.read()` 进行 DP 数据读写
- 硬件平台：涂鸦兼容的开发板（T2、T3、T5AI、ESP32、LN882H 或 XH_WB5E 系列）
- [如何创建 PID、配置 DP 实现云端与设备通信](https://tuyaopen.ai/zh/docs/cloud/tuya-cloud/creating-new-product)

### [dpType](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/TuyaIoT/examples/dpType)

涂鸦 DP 数据类型示例。本示例演示了涂鸦 IoT 平台支持的所有 DP 数据类型的读写方法，包括 Bool（布尔型）、Enum（枚举型）、Value（数值型）、String（字符串型）和 Raw（透传型），是 DP 开发的完整参考。

- 展示了 `TuyaIoT.read()` 和 `TuyaIoT.write()` 对不同数据类型的使用方法
- 包含 Raw 类型的十六进制数据收发示例
- 硬件平台：涂鸦兼容的开发板（T2、T3、T5AI、ESP32、LN882H 或 XH_WB5E 系列）

### [weatherGet](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/TuyaIoT/examples/weatherGet)

涂鸦天气服务示例。本示例演示了如何通过涂鸦云端获取天气数据，包括当前天气状况（温度、湿度、体感温度、气压、紫外线指数）、风力信息、日出日落时间、空气质量指数（AQI）以及 7 天天气预报。

- 使用 `TuyaIoTWeatherClass` 封装的天气查询接口
- 部分接口（如风力等级、AQI 排名）仅支持中国大陆数据中心
- 设备需完成激活并同步时间后方可查询
- 硬件平台：涂鸦兼容的开发板（T2、T3、T5AI、ESP32、LN882H 或 XH_WB5E 系列）

---

## HTTP 客户端

HTTPClient 库提供了便捷的 HTTP/HTTPS 请求接口，封装了连接管理、请求发送和响应解析。

### [BasicHttpClient](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/HTTPClient/examples/BasicHttpClient)

HTTP GET 请求示例。本示例演示了如何使用 `HTTPClient` 类发起 HTTP GET 请求，连接 WiFi 后访问指定 URL 并打印响应状态码和内容。

- 使用 `http.begin()` 设置 URL，`http.GET()` 发起请求
- 硬件平台：所有支持 WiFi 的开发板

### [BasicHttpsClient](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/HTTPClient/examples/BasicHttpsClient)

HTTPS GET 请求示例。本示例演示了如何使用 `HTTPClient` 类发起 HTTPS 安全请求，通过配置 CA 根证书验证服务器身份，实现加密通信。

- 需提供服务器 CA 证书用于 TLS 验证
- 硬件平台：所有支持 WiFi 的开发板

---

## MQTT 客户端

MQTTClient 库提供了 MQTT 协议的客户端实现，支持消息发布、订阅、认证等功能，适用于 IoT 设备与云端的消息通信。

### [mqtt_basic](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/MQTTClient/examples/mqtt_basic)

MQTT 基础发布/订阅示例。本示例演示了 MQTT 客户端的基本使用流程——连接 WiFi 后配置 MQTT Broker 信息，建立连接并向 `outTopic` 发布消息，同时订阅 `inTopic` 接收消息，通过回调函数打印收到的消息内容。

- 使用公共测试 Broker `broker.emqx.io`
- 在 `loop()` 中调用 `mqtt.loop()` 保持连接
- 硬件平台：所有支持 WiFi 的开发板

### [mqtt_auth](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/MQTTClient/examples/mqtt_auth)

MQTT 认证连接示例。本示例演示了如何使用用户名和密码连接需要认证的 MQTT Broker，展示了 `mqtt_client_config_t` 中 `username` 和 `password` 字段的配置方法。

- 硬件平台：所有支持 WiFi 的开发板

### [mqtt_publish_in_callback](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/MQTTClient/examples/mqtt_publish_in_callback)

MQTT 回调中发布消息示例。本示例演示了如何在消息接收回调函数中重新发布消息——订阅 `inTopic`，收到消息后将其转发到 `outTopic`，实现消息转发功能。

- 展示了回调函数中安全调用 `mqtt.publish()` 的写法
- 包含断线自动重连逻辑
- 硬件平台：所有支持 WiFi 的开发板

---

## DNS 服务器

DNSServer 库提供了轻量级 DNS 服务器功能，常用于 Captive Portal（强制门户）场景。

### [CaptivePortal](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/DNSServer/examples/CaptivePortal)

Captive Portal 强制门户示例。本示例演示了如何创建一个 WiFi 热点并启动 DNS 服务器，将所有域名解析请求重定向到设备自身的 IP 地址，配合 HTTP 服务器实现强制门户页面——用户连接热点后自动弹出配置页面。

- 使用 `WiFi.softAP()` 创建热点，`DNSServer` 劫持 DNS，`WiFiServer` 提供 HTTP 页面
- 适用于设备配网、本地配置等场景
- 硬件平台：所有支持 WiFi 的开发板
