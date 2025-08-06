---
title: 设备配网
---

## 概述

设备配网是将物联网设备连接并注册到云端，使其具备远程通信能力。配网后，智能设备可通过手机应用或其他方式进行远程控制。

本文介绍如何使用 **智能生活** App 进行设备配网。

## 准备工作

在进行设备配网之前，请确保您已经完成了以下准备工作：
 - 手机已安装 **智能生活** App，具体安装方法请参考下文的 **下载 App** 部分。
 - 设备已经成功烧录授权。
 - 设备已处于配网状态。
    :::tip
    `switch_demo` 和 `your_chat_bot` 两个 Demo 可以通过 5s 内重启设备 3 次来进入配网状态。
    :::

## 操作步骤

### 下载 App

在苹果 App Store 和各大安卓应用市场，搜索 **智能生活** 或者扫描以下二维码即可下载此 App。

<img src="https://images.tuyacn.com/fe-static/docs/img/48b9e225-aa49-4e95-9d61-511bb7df27c8.png" alt="smartlife_app" width="200" />

注册登录成功后，即可进行设备配网。

### 添加设备

在通过 App 添加设备之前需要先确保设备已处于配网状态。可以通过日志查看设备是否处于配网状态（下面日志仅适用于 TuyaOpen）：

```
...
[01-01 00:00:01 ty D][tuya_iot.c:774] STATE_START
[01-01 00:00:01 ty I][tuya_iot.c:792] Activation data read fail, go activation mode...
[01-01 00:00:01 ty D][tuya_main.c:143] Tuya Event ID:1(TUYA_EVENT_BIND_START)
...
```

1. 在设备列表页，单击页面中央的 **添加设备** 或单击右上角的 **+** 按钮，即可进入 **添加设备** 页面。

    <img src="https://images.tuyacn.com/fe-static/docs/img/265db6c1-0ce7-44b2-9bce-6a02ca28ea42.png" alt="smartlife_app" width="800" />

2. 添加设备需要允许 App 使用 Wi-Fi 和蓝牙权限。若不开启 Wi-Fi 或蓝牙权限，则无法搜索到附近的设备。

    <img src="https://images.tuyacn.com/fe-static/docs/img/78c18c64-6d9e-4b86-8eb5-074f9d54dd5a.png" alt="smartlife_app" width="240" />

   单击 **打开 Wi-Fi** 或者 **打开蓝牙** 后会出现引导弹窗，可根据界面提示步骤来设置 Wi-Fi 和蓝牙。

    <img src="https://images.tuyacn.com/fe-static/docs/img/3721f789-1aa8-4bd8-8bf5-b0b789dd6680.png" alt="smartlife_app" width="480" />

4. 在正确设置好 Wi-Fi 和蓝牙权限后，进入 **首页** 或者 **添加设备** 页面，即可看到附近待配网的设备。单击 **去添加**，然后按照 App 的指引进行操作即可完成设备配网。

    <img src="https://images.tuyacn.com/fe-static/docs/img/5d030649-9516-4cca-a02b-099848def7fa.png" alt="smartlife_app" width="240" />



:::warning
目前 TuyaOpen 支持的模组仅支持连接路由器的 2.4 GHz 频段。连接 5 GHz 频段的路由器会导致配网失败。
:::

## 常见问题

### 授权信息不正确导致配网失败

当因设备未能正确写入授权信息而导致配网失败时，设备会打印以下日志：

```
[01-01 00:00:00 ty E][tal_kv.c:269] lfs open UUID_TUYAOPEN -2 err
[01-01 00:00:00 ty E][tuya_authorize.c:107] Authorization read failure.
[01-01 00:00:00 ty W][tuya_main.c:288] Replace the TUYA_OPENSDK_UUID and TUYA_OPENSDK_AUTHKEY contents, otherwise the demo cannot work.
                 Visit https://platform.tuya.com/purchase/index?type=6 to get the open-sdk uuid and authkey.
[01-01 00:00:00 ty I][tuya_iot.c:538] tuya_iot_init
[01-01 00:00:00 ty D][tuya_iot.c:555] software_ver:1.0.1
[01-01 00:00:00 ty D][tuya_iot.c:556] productkey:xxxxxxxxxxxxxxxx
[01-01 00:00:00 ty D][tuya_iot.c:557] uuid:uuidxxxxxxxxxxxxxxxx
[01-01 00:00:00 ty D][tuya_iot.c:558] authkey:keyxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

如 `UUID` 和 `AuthKey` 都显示为 `xxxxxxxxxxxxxxxx`，则说明授权信息未正确写入。

可以查看 [tyutool_gui 使用说明](../tos-tools/tools-tyutool.md#设备授权信息写入) 中的 **设备授权信息写入** 部分来写入授权信息。
