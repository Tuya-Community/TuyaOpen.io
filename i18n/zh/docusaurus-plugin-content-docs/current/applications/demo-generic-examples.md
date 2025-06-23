---
title: 基础参考示例
---

# 通用基础组件Demo

TuyaOpen 提供了丰富的示例工程，方便开发者快速上手，了解 TuyaOpen 的使用。

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

不同的芯片都会对应的示例，需在 TuyaOpen 根目录下通过 `tos set_example` 命令设置示例工程。

选择待编译 example，可使用命令 `tos set_example`，根据平台完成选择，目录 `examples` 会修改为对应平台的示例。

```bash
$ tos set_example
Now used: None
========================
Platforms
1. T2
2. T3
3. Ubuntu
4. T5AI
5. ESP32
6. LN882H
7. BK7231X
------------------------
Please select: 4
------------------------
Set [T5AI] example success.
```

注：通过 `tos set_example` 命令设置后的 examples 目录为软链接，指向 platform 对应目录下的芯片。

每个示例工程下对应有 README.md 文件，详细介绍了示例工程的配置、编译、运行等操作。

## 编译示例

1. 运行 `tos config_choice` 命令， 选择当前运行的开发板或 platform。
2. 如需修改配置，请先运行 `tos menuconfig` 命令修改配置。
3. 运行 `tos build` 命令，编译工程。
