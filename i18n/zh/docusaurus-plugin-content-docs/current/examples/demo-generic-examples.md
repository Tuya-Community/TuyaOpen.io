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
├── get-started
│   └── sample_project
├── peripherals
│   ├── adc
│   ├── gpio
│   ├── i2c
│   ├── pwm
│   ├── spi
│   ├── timer
│   └── watchdog
├── protocols
│   ├── http_client
│   ├── https_client
│   ├── mqtt
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
└── wifi
    ├── ap
    ├── low_power
    ├── scan
    └── sta
```

## 选择待编译项目

针对不同型号的芯片，均配套提供了对应的示例工程。

选择待编译项目的 Example，通过命令 `cd ./example/xxx/xxx` 进入示例目录，再通过 `tos.py config choice` 命令设置编译平台。


## 编译示例

1. 运行 `tos.py config choice` 命令，选择当前运行的开发板或 Platform。
2. 如需修改配置，请先运行 `tos.py config menu` 命令修改配置。
3. 运行 `tos.py build` 命令，编译工程。
