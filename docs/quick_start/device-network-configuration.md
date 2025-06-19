---
title: Device Network Configuration
---

## Overview

Device network configuration refers to connecting and registering IoT devices to the cloud, enabling remote communication capabilities. After configuration, smart devices can be remotely controlled via mobile apps or other means.

The following describes how to use the **Smart Life** app for device network configuration.

## Preparation

Before configuring the device network, please make sure you have completed the following preparations:
 - The **Smart Life** app has been installed on your phone. For installation instructions, see the **Download App** section below.
 - The device has been successfully flashed and authorized.
 - The device is in network configuration mode.
    :::tip
    For the switch_demo and your_chat_bot demos, you can enter network configuration mode by restarting the device 3 times within 5 seconds.
    :::

## Steps

### Download the App

Search for **Smart Life** in the Apple App Store or major Android app stores, or scan the QR code below to download the app.

<img src="https://images.tuyacn.com/fe-static/docs/img/48b9e225-aa49-4e95-9d61-511bb7df27c8.png" alt="smartlife_app" width="200" />

After successful registration and login, you can proceed with device network configuration.

### Add Device

Before adding a device via the app, make sure the device is in network configuration mode. You can check the device logs to see if it is in configuration mode (the following log is only applicable to TuyaOpen):

```
...
[01-01 00:00:01 ty D][tuya_iot.c:774] STATE_START
[01-01 00:00:01 ty I][tuya_iot.c:792] Activation data read fail, go activation mode...
[01-01 00:00:01 ty D][tuya_main.c:143] Tuya Event ID:1(TUYA_EVENT_BIND_START)
...
```

On the device list page, click the central **Add Device** button or the + button in the upper right corner to enter the **Add Device** page.

<img src="https://images.tuyacn.com/fe-static/docs/img/8e8b4e0a-d6e4-4941-a078-717c96baf262.png" alt="smartlife_app" width="800" />

Adding a device requires the app to have Wi-Fi and Bluetooth permissions. If Wi-Fi or Bluetooth permissions are not enabled, nearby devices cannot be discovered.

<img src="https://images.tuyacn.com/fe-static/docs/img/3b8fc40f-2662-435e-a955-301948cb797b.png" alt="smartlife_app" width="240" />

Clicking "Turn on Wi-Fi" or "Turn on Bluetooth" will bring up a guide popup. Follow the steps to set up Wi-Fi and Bluetooth.

<img src="https://images.tuyacn.com/fe-static/docs/img/a6784328-c0d3-45ac-9730-8eabef788b1a.png" alt="smartlife_app" width="480" />

After correctly setting up Wi-Fi and Bluetooth permissions, you can see nearby devices waiting for network configuration on the **Home** page or the **Add Device** page.

<img src="https://images.tuyacn.com/fe-static/docs/img/bc243e3a-32f1-418f-ab07-fd70e68af857.png" alt="smartlife_app" width="240" />

Click the **Go To Add** button, then follow the app prompts to complete the device network configuration.

:::warning
Currently, the modules supported by TuyaOpen only support connection to 2.4GHz Wi-Fi bands. Connecting to a 5GHz router will cause network configuration to fail.
:::

## FAQ

### 1. Network configuration fails due to incorrect authorization information

If the device fails to write the authorization information correctly, network configuration will fail. The device will print the following log:

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

You can see that both UUID and AuthKey are `xxxxxxxxxxxxxxxx`, indicating that the authorization information was not written correctly.

See the **Device Authorization Information Writing** section in the [tyutool_gui User Guide](./tools-tyutool.md#device-authorization-information-writing) for instructions on writing authorization information.
