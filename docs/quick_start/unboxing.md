---
title: Quick Start
---

import ChipRow from '@site/src/components/ChipRow';

## Overview

This topic aims to help you quickly get started with the [TuyaOpen](https://github.com/tuya/TuyaOpen) project, covering development environment setup, firmware compilation, flashing, and authorization.

## Preparation

Before getting started, prepare the following resources:
- [TuyaOpen-compatible development boards or modules](../hardware-specific/index.md#hardware-platforms)
- USB data cable
- Computer (Windows, Linux, or macOS supported)

## Download firmware

To quickly try out TuyaOpen or validate hardware, you can skip the development environment setup and download firmware from the **[Releases page](https://github.com/tuya/TuyaOpen/releases)** for flashing and testing.

:::info
TuyaOpen currently provides two firmware types:
- `switch_demo`: IoT device firmware, compatible with all chips.
- `your_chat_bot`: AI device firmware, currently only supporting T5AI and ESP32-S3.
:::

After you successfully compile TuyaOpen to generate the firmware or download the firmware from the Releases page, you can proceed to flash the firmware.

## Flash firmware

Use the `tyutool_gui` tool for firmware flashing. For more information, see [tyutool_gui User Guide](../advanced_use/tools-tyutool.md).

## Device authorization

### License

The **license** is an encryption certificate issued by Tuya to allow a device to connect to the Tuya IoT operating system. Each device must be assigned a unique license for authentication. A license grants permission for a single device to connect to and access the cloud.

TuyaOpen Framework includes:
- [TuyaOpen for C](https://github.com/tuya/TuyaOpen)
- [TuyaOpen for Arduino](https://github.com/tuya/arduino-TuyaOpen)
- [TuyaOpen for LuaNode](https://github.com/tuya/luanode-TuyaOpen)

All editions require dedicated TuyaOpen licenses. Licenses from other sources will not work for connecting to the Tuya IoT Cloud.

### Get license

- Option 1: Go to [Tuya Developer Platform](https://platform.tuya.com/), choose **Purchase** > [Production](https://platform.tuya.com/purchase/index?type=6), and then purchase a module that is flashed with a TuyaOpen license. This license is permanently written into the module during manufacturing and cannot be lost. TuyaOpen automatically reads the license via the `tuya_iot_license_read()` interface during startup. Verify whether your purchased modules already contain TuyaOpen licenses.

- Option 2: If your module does not have a pre-flashed TuyaOpen license, you can purchase a license on the [Production](https://platform.tuya.com/purchase/index?type=6) page.

- Option 3: If your module does not have a pre-flashed TuyaOpen license, you can purchase a license on the [Purchase](https://item.taobao.com/item.htm?ft=t&id=911596682625&spm=a21dvs.23580594.0.0.621e2c1bzX1OIP) page.

### Write license to device

To enable [Tuya Developer Platform](https://platform.tuya.com/) functionalities, devices must first be authorized. Use the `tyutool_gui` tool to perform [device authorization](./equipment-authorization.md).

## Device pairing

Device pairing refers to the process of connecting a device to a Wi-Fi router and binding it to the Tuya Developer Platform. You need to use the **SmartLife** app for this operation. For more information, see [Device Pairing](./device-network-configuration.md).
