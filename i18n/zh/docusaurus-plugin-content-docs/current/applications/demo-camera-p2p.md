---
title: 涂鸦 P2P 示例
---

# 涂鸦 P2P 示例

涂鸦 P2P 应用是涂鸦 AI+IoT 平台提供的一种应用，通过涂鸦 P2P 应用，开发者可以快速实现跨网推拉流等功能。

`camera_demo` 演示一个简单的，在Ubuntu平台下推视频流示例，通过涂鸦 APP、涂鸦云服务，可以对这个Camera进行远程拉视频流观看（外出）、局域网拉视频流观看（同一局域网）。

![](https://images.tuyacn.com/fe-static/docs/img/74af5009-43f6-439e-8089-fca2b0edbe96.jpg)

## 目录结构

```sh
+- camera_demo
    +- libqrencode
    +- src
        -- cli_cmd.c
        -- qrencode_print.c
        -- tuya_main.c
        -- tuya_config.h
    -- CMakeLists.txt
    -- README_CN.md
    -- README.md
```

- libqrencode: 一个二维码工具库，用于有线网络连接涂鸦云服务时生成二维码，并使用涂鸦 APP 扫描二维码进行绑定
- qrencode_print.c: 用于在屏幕、串口工具上展示二维码
- cli_cmd.c: camera_demo 的一些命令行操作，用于查看、操作 camera_demo 的信息和状态
- tuya_main.c: camera_demo 的主要功能
- tuya_config.h: 涂鸦PID和授权信息，在涂鸦IoT平台上创建并获取，可以参考文档 [TuyaOS quickstart](https://developer.tuya.com/en/docs/iot-device-dev/application-creation?id=Kbxw7ket3aujc)

## 支持硬件

当前工程只在Ubuntu平台运行，没在其它芯片和开发板上验证。

## 编译

1. 运行 `tos config_choice` 命令， 选择当前运行的开发板或 platform。
2. 如需修改配置，请先运行 `tos menuconfig` 命令修改配置。
3. 运行 `tos build` 命令，编译工程。
