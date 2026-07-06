---
title: 极速体验
---

极速体验将预编译固件烧录到支持的开发板上，让你无需自行构建即可将设备接入涂鸦 IoT 云、体验涂鸦云服务。如果你想快速评估一块开发板，请走这条路径；如果你想从源码构建并编译 [TuyaOpen](https://github.com/tuya/TuyaOpen)，可跳过本页，直接从 [环境搭建](./enviroment-setup.md) 开始。

## 准备工作

开始前，请准备以下资源：

- 一块 [TuyaOpen 支持的开发板或模组](../hardware/index.md#硬件平台)
- 一根 USB 数据线
- 一台运行 Windows、Linux 或 macOS 的电脑

## 下载固件

从 **[TuyaOpen 发布页面](https://github.com/tuya/TuyaOpen/releases)** 下载用于烧录和测试的固件。

在 [TuyaOpen 应用列表](../cloud/overview#tuyaopen-应用列表) 中选择与你开发板匹配的芯片和应用，下载对应的预编译 bin 文件。

## 固件烧录

使用图形化的 [涂鸦通用串口工具](https://www.tuyaopen.ai/zh/tyutool) `tyutool_gui` 烧录固件。具体步骤请参考 [GUI - tyutool 图形化工具](../tos-tools/tools-tyutool.md#固件烧录)。

## 设备授权

要将设备接入涂鸦 IoT 云，必须先对其授权。使用 `tyutool_gui` 进行 [设备授权](./equipment-authorization.md)。

## 设备配网

设备配网将设备连接到 Wi-Fi 路由器、在涂鸦 IoT 云上激活并绑定到你的账号。该过程需要手机上的 **智能生活** App。完整步骤请参考 [设备配网](./device-network-configuration.md)。
