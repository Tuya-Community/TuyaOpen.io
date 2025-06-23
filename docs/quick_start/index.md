---
title: Getting Started
---

import ChipRow from '@site/src/components/ChipRow';

## Overview

This document is intended to help developers quickly get started with the [TuyaOpen](https://github.com/tuya/TuyaOpen) project, including setting up the development environment, firmware compilation, flashing, and authorization.

## Preparation

 - **TuyaOpen** [Supported development boards or modules](../hardware-specific/index.md#hardware-platforms)
 - USB data cable
 - Computer (Windows / Linux / macOS)

## Setting Up the Development Environment

Currently, TuyaOpen supports development and compilation on Windows, Linux, and macOS. For specific chip support, please refer to the **[Supported Platform List](../about-tuyaopen.md#supported-platform-list)**. Developers can choose the appropriate operating system for **[environment setup](./enviroment-setup.md)** and development according to their hardware.

:::tip
If you want to quickly experience TuyaOpen or verify your hardware, you can skip the environment setup and download the firmware for flashing and testing from the **[TuyaOpen Releases page](https://github.com/tuya/TuyaOpen/releases)**.
:::

:::info
Currently, TuyaOpen provides two types of firmware: switch_demo and your_chat_bot. switch_demo is IoT device firmware and supports all chips; your_chat_bot is AI device firmware and currently only supports T5AI and ESP32-S3.
:::

After successfully compiling TuyaOpen to generate the firmware or downloading the firmware from the TuyaOpen Releases page, you can proceed to flash the firmware.

## Firmware Flashing

You can use the tyutool_gui tool for firmware flashing. For detailed instructions, please refer to [tyutool_gui User Guide](./tools-tyutool.md).

## Device Authorization

### License Key

A **License Key** is a security certificate issued by Tuya for devices, serving as the legal credential for smart devices to operate on the Tuya IoT OS. Each device has a unique license key, meaning one key represents one device access permit and can only be used for a single device to connect to and access the cloud.

TuyaOpen Framework includes:
- **C Version TuyaOpen**: [https://github.com/tuya/TuyaOpen](https://github.com/tuya/TuyaOpen)
- **Arduino Version TuyaOpen**: [https://github.com/tuya/arduino-TuyaOpen](https://github.com/tuya/arduino-TuyaOpen)
- **LuaNode Version TuyaOpen**: [https://github.com/tuya/luanode-TuyaOpen](https://github.com/tuya/luanode-TuyaOpen)

All versions require a **dedicated TuyaOpen License Key**. Other license keys will not work for connecting to the Tuya Cloud.

### Obtaining a License Key

1. **Option 1**: Purchase a pre-programmed TuyaOpen License Key module from [https://platform.tuya.com/purchase/index?type=6](https://platform.tuya.com/purchase/index?type=6). The license key is pre-burned into the module during manufacturing and cannot be lost. TuyaOpen reads the key at startup via the `tuya_iot_license_read()` interface. Ensure your device has a **TuyaOpen License Key** pre-installed.

2. **Option 2**: If your module does not have a pre-burned TuyaOpen License Key, purchase one from [https://platform.tuya.com/purchase/index?type=6](https://platform.tuya.com/purchase/index?type=6).

3. **Option 3**: Alternatively, purchase a **TuyaOpen License Key** from Taobao: [https://item.taobao.com/item.htm?ft=t&id=911596682625&spm=a21dvs.23580594.0.0.621e2c1bzX1OIP](https://item.taobao.com/item.htm?ft=t&id=911596682625&spm=a21dvs.23580594.0.0.621e2c1bzX1OIP).

### Writing the License Key

When you need to use the functions of the Tuya IoT platform, you must first authorize the device. You can use the tyutool_gui tool for [device authorization](./tools-tyutool.md#device-authorization-information-writing).

## Device Network Configuration

Device network configuration refers to connecting the device to a Wi-Fi router and binding it to the Tuya IoT platform. You need to use the **Smart Life** app for this operation. For detailed steps, please refer to the [Device Network Configuration](./device-network-configuration.md) document.

