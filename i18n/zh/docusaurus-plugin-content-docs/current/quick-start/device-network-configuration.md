---
title: "Step 4: 设备手机配网"
---

设备配网是将设备连接并注册到涂鸦 IoT 云，使其具备远程通信能力，配网后即可通过手机 App 远程控制设备。本文使用 **智能生活** App，为已烧录固件并完成授权的设备配网。

## 前提条件

配网前，请确保已满足以下条件：

- 手机已安装 **智能生活** App。安装方法见 [下载 App](#下载-app)。
- 设备已成功烧录固件并完成授权。
- 设备已处于配网状态。

:::tip
`switch_demo` 和 `your_chat_bot` 两个 Demo 可以在 5 秒内重启设备 3 次来进入配网状态。
:::

## 设备配网

### 下载 App

在苹果 App Store 和各大安卓应用市场搜索 **智能生活**，或扫描以下二维码下载该 App。

<img src="https://images.tuyacn.com/fe-static/docs/img/48b9e225-aa49-4e95-9d61-511bb7df27c8.png" alt="smartlife_app" width="200" />

注册并登录成功后，即可进行设备配网。

### 添加设备

通过 App 添加设备前，请先确认设备已处于配网状态。可通过日志查看设备是否处于配网状态（以下日志仅适用于 TuyaOpen）：

```text
...
[01-01 00:00:01 ty D][tuya_iot.c:774] STATE_START
[01-01 00:00:01 ty I][tuya_iot.c:792] Activation data read fail, go activation mode...
[01-01 00:00:01 ty D][tuya_main.c:143] Tuya Event ID:1(TUYA_EVENT_BIND_START)
...
```

1. 在 **全部设备** 页，点击 **添加设备** 或右上角的加号（**+**），进入 **添加设备** 页面。

    <img src="https://images.tuyacn.com/fe-static/docs/img/265db6c1-0ce7-44b2-9bce-6a02ca28ea42.png" alt="smartlife_app" width="800" />

2. 添加设备需要授予 App Wi-Fi 和蓝牙权限。若未开启 Wi-Fi 或蓝牙权限，将无法搜索到附近的设备。

    <img src="https://images.tuyacn.com/fe-static/docs/img/78c18c64-6d9e-4b86-8eb5-074f9d54dd5a.png" alt="smartlife_app" width="240" />

   点击 **打开 Wi-Fi** 或 **打开蓝牙**，按界面提示开启 Wi-Fi 或蓝牙。

    <img src="https://images.tuyacn.com/fe-static/docs/img/3721f789-1aa8-4bd8-8bf5-b0b789dd6680.png" alt="smartlife_app" width="480" />

3. 正确设置 Wi-Fi 和蓝牙权限后，进入 **首页** 或 **添加设备** 页面，即可看到附近待配网的设备。点击 **去添加**，按 App 提示完成设备配网。

    <img src="https://images.tuyacn.com/fe-static/docs/img/5d030649-9516-4cca-a02b-099848def7fa.png" alt="smartlife_app" width="240" />

:::warning
目前 TuyaOpen 支持的模组仅支持连接路由器的 2.4 GHz 频段。连接 5 GHz 频段的路由器会导致配网失败。
:::

### 扫码配网

部分 TuyaOpen 设备支持通过 **智能生活** App 扫码完成配网。该方式常见于 Linux 设备（如树莓派），设备会直接在终端输出二维码。

1. 确认设备已进入配网状态，且终端/日志中显示二维码。
2. 打开 **智能生活** App，点击右上角的 **+**。
3. 选择 **扫一扫**，对准设备输出的二维码。
4. 按界面提示完成配网。

<img src="https://images.tuyacn.com/fe-static/docs/img/5971b072-a264-4324-ba3f-a90f8b899ddd.png" alt="smartlife_app" width="240" />

## 常见问题

### 授权信息不正确导致配网失败

当因设备未正确写入授权信息而导致配网失败时，设备会输出以下日志：

```text
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

若 `UUID` 和 `AuthKey` 都显示为 `xxxxxxxxxxxxxxxx`，则说明授权信息未正确写入。

详情请参考 [GUI - tyutool 图形化工具](../tos-tools/tools-tyutool.md#设备授权信息写入) 中的 **设备授权信息写入** 部分。
