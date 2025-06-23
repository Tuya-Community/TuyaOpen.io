---
title: 开始上手
---

import ChipRow from '@site/src/components/ChipRow';

## 概述

本文档旨在帮助开发者快速上手 [TuyaOpen](https://github.com/tuya/TuyaOpen) 项目，完成开发环境搭建、固件编译、烧录、授权。

## 准备工作

 - **TuyaOpen** [支持的开发板或模组](../hardware-specific/index.md#硬件平台)
 - USB 数据线
 - 电脑（Windows / Linux / macOS）

## 开发环境搭建

目前 TuyaOpen 支持 Windows、Linux 和 macOS 三大操作系统上进行开发和编译工作，具体芯片的支持情况请参考 **[支持 Platform 列表](../about-tuyaopen.md#支持-platform-列表)** 。开发者可以根据自己手上的硬件选择对应的操作系统进行 **[环境搭建](./enviroment-setup.md)** 和开发。

:::tip
如果您想要快速体验 TuyaOpen 或验证手上硬件，可以先跳过开发环境搭建，从 TuyaOpen 的 **[发布页面](https://github.com/tuya/TuyaOpen/releases)** 下载固件进行烧录和测试。
:::

:::info
目前 TuyaOpen 上提供有 switch_demo 和 your_chat_bot 两种固件，switch_demo 是 IoT 设备固件，支持所有芯片；your_chat_bot 是 AI 设备固件，目前仅支持 T5AI 和 ESP32-S3。
:::

当通过编译 TuyaOpen 成功生成固件或从 TuyaOpen 发布页面下载得到固件后，接下来就可以进行固件烧录。

## 固件烧录

您可以通过 tyutool_gui 工具进行固件烧录。具体使用说明请参考 [tyutool_gui 使用说明](./tools-tyutool.md)。

## 设备授权

### 授权码

**授权码**（License）是涂鸦统一为设备颁发的安全加密证书，是智能设备运行涂鸦 IoT 操作系统的合法凭证，每台设备都具有唯一的授权码。也就是说，一个授权码代表一个设备接入许可，仅用于一台设备连接和访问云端。

Tuyaopen Framework 包括：
	- C 版 TuyaOpen：[https://github.com/tuya/TuyaOpen](https://github.com/tuya/TuyaOpen)
	- Arduino 版 TuyaOpen：[https://github.com/tuya/arduino-TuyaOpen](https://github.com/tuya/arduino-TuyaOpen)
	- Luanode 版 TuyaOpen：[https://github.com/tuya/luanode-TuyaOpen](https://github.com/tuya/luanode-TuyaOpen)

均采用 TuyaOpen 专用授权码，使用其他授权码无法正常连接涂鸦云。

### 获取授权码

- 方式1：通过 [https://platform.tuya.com/purchase/index?type=6](https://platform.tuya.com/purchase/index?type=6) 购买已烧录 TuyaOpen 授权码模块。该授权码已经在出厂时烧录在对应模组中，且不会丢失。TuyaOpen 在启动时通过 `tuya_iot_license_read()` 接口读取授权码。请确认当前设备是否为烧录了 **TuyaOpen 授权码**。

- 方式2：如当前模组未烧录 TuyaOpen 授权码，可通过 [https://platform.tuya.com/purchase/index?type=6](https://platform.tuya.com/purchase/index?type=6) 页面购买 **TuyaOpen 授权码**。

- 方式3： 如当前模组未烧录 TuyaOpen 授权码，可通过 [https://item.taobao.com/item.htm?ft=t&id=911596682625&spm=a21dvs.23580594.0.0.621e2c1bzX1OIP](https://item.taobao.com/item.htm?ft=t&id=911596682625&spm=a21dvs.23580594.0.0.621e2c1bzX1OIP) 页面购买 **TuyaOpen 授权码**。

### 写入授权码
当我们需要使用到 Tuya IoT 平台的功能时，需要先对设备进行授权。可以通过 tyutool_gui 工具进行 [设备授权](./tools-tyutool.md#设备授权信息写入)。

## 设备配网

设备配网是指将设备连接到 Wi-Fi 路由器，和在 Tuya IoT 平台进行绑定的过程。需要借助 **智能生活** APP 进行操作。具体操作步骤可以参考 [设备配网](./device-network-configuration.md) 文档进行操作。

