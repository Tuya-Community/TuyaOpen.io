---
title: 极速体验
---

import ChipRow from '@site/src/components/ChipRow';

## 概述

本文档旨在帮助开发者快速上手 [TuyaOpen](https://github.com/tuya/TuyaOpen) 项目，使用已预编译的 bin 文件，完成固件下载、烧录、设备授权、设备配网等流程，连接涂鸦云，快速体验涂鸦云提供的各种服务。

如需要自行开发与编译 [TuyaOpen](https://github.com/tuya/TuyaOpen)，可略过当前环节直接从 [环境搭建](./enviroment-setup.md) 开始。

## 准备工作

开始前，请准备以下资源：
 - [TuyaOpen 支持的开发板或模组](../hardware-specific/index.md#硬件平台)
 - USB 数据线
 - 电脑（支持 Windows/Linux/macOS 系统）

## 下载固件

从 TuyaOpen 的 **[发布页面](https://github.com/tuya/TuyaOpen/releases)** 下载固件进行烧录和测试。

可通过 [TuyaOpen 应用列表](../applications/index.md#tuyaopen-应用列表) 选择适合当前芯片和应用，下载已预编译的 bin 文件。

## 固件烧录

可以通过 [涂鸦通用串口工具](https://www.tuyaopen.ai/zh/tools/tyutool) 图形化工具 `tyutool_gui` 进行固件烧录，具体使用说明请参考 [tyutool_gui 使用说明](../tos-tools/tools-tyutool.md#固件烧录)。

## 设备授权

如需要将设备连接至涂鸦云，必须先对设备进行授权。可以通过 `tyutool_gui` 工具进行 [设备授权](./equipment-authorization.md)。

## 设备配网

设备配网是指将设备连接到 Wi-Fi 路由器，并在涂鸦云激活，与用户绑定的过程，需要借助手机中的 **智能生活** App 进行操作。具体操作步骤请参考 [设备配网](./device-network-configuration.md) 。

