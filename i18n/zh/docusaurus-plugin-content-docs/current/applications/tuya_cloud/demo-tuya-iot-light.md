---
title: switch_demo
---


`switch_demo` 涂鸦 IoT 应用是涂鸦 AI + IoT 平台提供的一种最小功能应用演示。作为一个简单的、跨平台、跨系统、支持多种连接的开关示例，可以通过涂鸦 App、涂鸦云服务对这个开关进行远程控制（外出）、局域网控制（同一局域网）和蓝牙控制（没有可用网络）。

`switch_demo` 演示了如下功能：
- 支持蓝牙配网。
- 支持 Wi-Fi 热点模式配网。
- 接收来自云端的 MQTT 控制数据，并自动回复。
- 接收来自 App 的局域网 TCP 控制数据，并自动回复。
- OTA 功能。

当前 `switch_demo` 未控制真实的硬件，所以可以在当前所有 [支持的 Platform](../../about-tuyaopen.md#支持-platform) 上运行。

使用 `switch_demo` 之前，你需要先了解以下名词：
- [TuyaOpen 专用授权码](../../quick-start/index.md#tuyaopen-专用授权码)
- [PID](../../quick-start/index.md#pid)
- [配网](../../quick-start/device-network-configuration.md)
- [DP](../../applications/index.md#dp)

## 默认 App 控制面板

![](https://images.tuyacn.com/fe-static/docs/img/0e155d73-1042-4d9f-8886-024d89ad16b2.png) 


## 目录结构

```sh
+- switch_demo
    +- src
        -- cli_cmd.c
        -- tuya_main.c
        -- tuya_config.h
    -- CMakeLists.txt
    -- README_CN.md
    -- README.md
```

- `cli_cmd.c`：`switch_demo` 的一些命令行操作，用于查看、操作 `switch_demo` 的信息和状态。
- `tuya_main.c`：`switch_demo` 的主要功能。
- `tuya_config.h`：涂鸦 PID 和授权信息，在涂鸦开发者平台上创建并获取，请参考文档 [TuyaOS > 创建产品](https://developer.tuya.com/cn/docs/iot-device-dev/application-creation?id=Kbxw7ket3aujc)。

## 支持硬件

当前工程可在所有当前已支持的芯片和开发板上运行。

## 编译

1. 运行 `tos config_choice` 命令，选择当前运行的开发板或 Platform。
2. 如需修改配置，请先运行 `tos menuconfig` 命令修改配置。
3. 运行 `tos build` 命令，编译工程。
