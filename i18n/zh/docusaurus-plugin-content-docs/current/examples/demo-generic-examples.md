---
title: 基础参考示例
---

# 通用基础组件 Demo

TuyaOpen 提供了丰富的示例工程，可帮助开发者快速熟悉并掌握 TuyaOpen 的使用方法，降低上手门槛。

```bash
$ examples
├── ble
│   ├── ble_central
│   └── ble_peripher
├── e-Paper
│   ├── 1.54inch_e-Paper
│   ├── 2.13inch_e-Paper
│   └── 2.9inch_e-Paper
├── get-started
│   ├── cxx
│   └── sample_project
├── graphics
│   ├── lvgl_camera
│   ├── lvgl_demo
│   ├── lvgl_gif
│   ├── lvgl_label
│   ├── u8g2_i2c
│   ├── u8g2_spi
│   └── u8g2_tdl_disp
├── multimedia
│   ├── audio_kws
│   ├── audio_player
│   ├── audio_recorder
│   └── audio_vad
├── peripherals
│   ├── adc
│   ├── audio_codecs
│   ├── button
│   ├── camera
│   ├── display
│   ├── encoder
│   ├── flash
│   ├── gpio
│   ├── i2c
│   ├── imu
│   ├── ir
│   ├── joystick
│   ├── led
│   ├── leds-pixel
│   ├── pwm
│   ├── sd
│   ├── spi
│   ├── timer
│   ├── touch
│   ├── tp
│   ├── uart
│   └── watchdog
├── protocols
│   ├── http_client
│   ├── https_client
│   ├── mqtt_client
│   ├── tcp_client
│   └── tcp_server
├── system
│   ├── os_event
│   ├── os_kv
│   ├── os_mutex
│   ├── os_queue
│   ├── os_semaphore
│   ├── os_sw_timer
│   └── os_thread
├── tflite
│   └── tflite-helloworld
└── wifi
    ├── ap
    ├── low_power
    ├── scan
    └── sta
```

## 示例分类

| 分类 | 内容 | 相关教程 |
|------|------|---------|
| **peripherals/** | GPIO、I2C、SPI、UART、PWM、ADC、显示、音频、按键、摄像头、IMU、LED、红外、触摸 | [GPIO 教程](/zh/docs/peripheral/tutorials/gpio-interrupt-tutorial)、[I2C 指南](/zh/docs/peripheral/tutorials/i2c-guide)、[ADC 指南](/zh/docs/peripheral/tutorials/adc-guide)、[传感器驱动](/zh/docs/peripheral/tutorials/writing-sensor-driver) |
| **wifi/** | Station 连接、AP 模式、扫描、低功耗 | [Wi-Fi 教程](/zh/docs/peripheral/tutorials/wifi-station-tutorial) |
| **system/** | 线程、定时器、互斥锁、信号量、队列、事件、KV 存储 | [线程与定时器模式](/zh/docs/peripheral/tutorials/thread-timer-patterns) |
| **ble/** | BLE 中心设备（扫描+连接）和外设（广播+GATT） | [BLE Central](../peripheral/tutorials/ble-central-tutorial)、[BLE Peripheral](../peripheral/tutorials/ble-peripheral-tutorial) |
| **protocols/** | HTTP/HTTPS 客户端、MQTT 客户端、TCP 客户端/服务器 | [HTTP 与 HTTPS（GET/POST、JSON）](../peripheral/tutorials/http-client-tutorial)、[MQTT 客户端](../peripheral/tutorials/mqtt-client-tutorial)、[TCP 与 UDP 套接字](../peripheral/tutorials/tcp-socket-tutorial) |
| **graphics/** | LVGL 演示、u8g2 I2C/SPI 显示 | [LVGL 应用指南](../peripheral/tutorials/lvgl-application-guide)、[显示驱动指南](../peripheral/tutorials/display-driver-guide) |
| **multimedia/** | 关键词识别 (KWS)、音频播放器、录音、VAD | [音频编解码器指南](/zh/docs/peripheral/tutorials/audio-codec-guide) |
| **e-Paper/** | 电子墨水屏演示（1.54"、2.13"、2.9"） | |
| **tflite/** | TensorFlow Lite Micro hello-world 推理 | |
| **get-started/** | 最小项目模板和 C++ 示例 | |

## 选择要构建的项目

进入所需示例目录：

```bash
cd examples/peripherals/gpio
```

选择开发板配置：

```bash
tos.py config choice
```

:::note
大多数示例默认为 T5AI。对于 ESP32，你可能需要从列表中选择 ESP32 配置，或在示例的 `config/` 目录中创建一个。详见 [ESP32 快速开始](/zh/docs/hardware-specific/espressif/esp32-quick-start)。
:::

## 构建示例

```bash
tos.py build
tos.py flash
tos.py monitor
```

## 参考资料

- [TDD/TDL 驱动架构](/zh/docs/peripheral/driver-architecture)
- [ESP32 快速开始](/zh/docs/hardware-specific/espressif/esp32-quick-start)
- [编译指南](/zh/docs/build-system/compilation-guide)
