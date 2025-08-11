---
title: Device Pairing
---

## Overview

The device pairing process connects and registers IoT devices to the cloud, enabling remote communication capabilities. After paired, smart devices can be remotely controlled via mobile apps or other methods.

This topic describes how to pair devices using the **SmartLife** app.

## Preparation

Before pairing, ensure the following:
- The **SmartLife** app is installed on your phone. For more information, see **Download app**.
- The device has been successfully flashed with firmware and authorized.
- The device is in pairing mode.

   :::tip
   For the `switch_demo` and `your_chat_bot` demos, you can restart the device 3 times within 5 seconds to put the device in pairing mode.
   :::

## Procedure

### Download app

Search for **SmartLife** in Apple's App Store and other major app stores, or scan the following QR code to download the app.

<img src="https://images.tuyacn.com/fe-static/docs/img/48b9e225-aa49-4e95-9d61-511bb7df27c8.png" alt="smartlife_app" width="200" />

After successful registration and login, you can proceed with device pairing.

### Add device

Before adding a device via the app, make sure the device is in pairing mode. You can check the device logs to see if it is in pairing mode (the following log is only applicable to TuyaOpen):


```
...
[01-01 00:00:01 ty D][tuya_iot.c:774] STATE_START
[01-01 00:00:01 ty I][tuya_iot.c:792] Activation data read fail, go activation mode...
[01-01 00:00:01 ty D][tuya_main.c:143] Tuya Event ID:1(TUYA_EVENT_BIND_START)
...
```

1. On the **All Devices** page, tap **Add Device** or the plus icon (**+**) in the top right corner to go to the **Add Device** page.

   <img src="https://images.tuyacn.com/fe-static/docs/img/8e8b4e0a-d6e4-4941-a078-717c96baf262.png" alt="smartlife_app" width="800" />

2. To add devices, the app must be granted Wi-Fi and Bluetooth permissions. If Wi-Fi or Bluetooth permissions are not turned on, nearby devices cannot be discovered.

   <img src="https://images.tuyacn.com/fe-static/docs/img/3b8fc40f-2662-435e-a955-301948cb797b.png" alt="smartlife_app" width="240" />

   Tap **Turn on Wi-Fi** or **Turn on Bluetooth** to enable Wi-Fi or Bluetooth as instructed.

   <img src="https://images.tuyacn.com/fe-static/docs/img/a6784328-c0d3-45ac-9730-8eabef788b1a.png" alt="smartlife_app" width="480" />

3. After properly configuring Wi-Fi and Bluetooth permissions, you can see nearby devices in pairing mode on the **Home** or **Add Device** page. Tap **Go to add**, and then follow the prompts on the app to complete device pairing.

   <img src="https://images.tuyacn.com/fe-static/docs/img/bc243e3a-32f1-418f-ab07-fd70e68af857.png" alt="smartlife_app" width="240" />



:::warning
Currently, TuyaOpen-supported modules can only connect to the 2.4 GHz band of routers. Attempting to pair with a 5 GHz band router will result in failure.
:::

## FAQs

### Pairing failed due to incorrect authorization information

When pairing failed because the device's authorization information was not written correctly, the device will output the following logs:


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


If both `UUID` and `AuthKey` display as `xxxxxxxxxxxxxxxx`, it indicates the authorization information was not properly written.

For more information, see the section **Write device authorization information** in the [tyutool_gui User Guide](../tos-tools/tools-tyutool.md#device-authorization-information-writing).
