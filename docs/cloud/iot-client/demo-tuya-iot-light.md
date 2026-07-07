---
title: switch_demo
description: "switch_demo is a Tuya IoT client open source sample app: a cross-platform switch with cloud MQTT, LAN TCP, Bluetooth, and OTA control."
keywords:
  - iot smart light open source demo
  - switch_demo
  - tuya iot client
  - tuya cloud
  - ota
---

The `switch_demo` application is a minimal-functionality application demo provided by the Tuya AI + IoT platform. It is a simple, cross-platform, cross-OS switch example that supports multiple connections. Using the Tuya app and Tuya's cloud services, you can control the switch remotely (when away from home), over the LAN (on the same LAN), and via Bluetooth (when no network is available).

`switch_demo` demonstrates the following features:

- Supports Bluetooth pairing.
- Supports pairing in Wi-Fi access point (AP) mode.
- Receives MQTT control data from the cloud and automatically replies.
- Receives LAN TCP control data from the app and automatically replies.
- Supports the over-the-air (OTA) update feature.

Currently, `switch_demo` does not control physical hardware and can run on [all supported platforms](../../about-tuyaopen.md#supported-platforms).

Before using `switch_demo`, you need to understand the following terms:

- [TuyaOpen dedicated license](../../quick-start/index.md#tuyaopen-dedicated-license)
- [Product ID (PID)](../../quick-start/index.md#pid)
- [Pairing](../../quick-start/device-network-configuration.md)
- [Data point (DP)](../overview#dp)

## Default app control panel

![](https://images.tuyacn.com/content-platform/hestia/1756435281b95ab053f77.png)


## Directory

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

- `cli_cmd.c`: Command-line operations for viewing and operating `switch_demo` information and status.
- `tuya_main.c`: Core functionalities of `switch_demo`.
- `tuya_config.h`: Tuya PID and authorization information, obtained from the Tuya Developer Platform. For more information, see [TuyaOS > Create Product](https://developer.tuya.com/en/docs/iot-device-dev/application-creation?id=Kbxw7ket3aujc).

## Hardware support

This project can run on all currently supported chips and development boards.

## Build the project

1. Run `tos.py config choice` to select your development board or platform.
2. To change the configuration first, run `tos.py config menu`.
3. Run `tos.py build` to build the project, then `tos.py flash` to flash it.

To bind the device to the cloud, give it a `PID` and a license first — see [How device–cloud binding works](../tuya-cloud/device-cloud-binding) and [Create your product & agent](../tuya-cloud/creating-new-product).
