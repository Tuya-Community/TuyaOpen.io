---
title: Unboxing Use
---

import ChipRow from '@site/src/components/ChipRow';

## Overview

This document is intended to help developers quickly get started with the [TuyaOpen](https://github.com/tuya/TuyaOpen) project, using pre-compiled bin files to complete firmware download, flashing, device authorization, device network configuration, connect to Tuya Cloud, and quickly experience various services provided by Tuya Cloud.

If you need to develop and compile [TuyaOpen](https://github.com/tuya/TuyaOpen) by yourself, you can skip this section and start directly from [Environment Setup](./enviroment-setup.md).

## Preparation

Before you start, please prepare the following resources:
 - [TuyaOpen supported development board or module](../hardware-specific/index.md#hardware-platforms)
 - USB data cable
 - Computer (supports Windows/Linux/macOS)

## Download Firmware

Download the firmware for flashing and testing from the **[TuyaOpen Release Page](https://github.com/tuya/TuyaOpen/releases)**.

You can select the appropriate chip and application from the [TuyaOpen Application List](../applications/index.md#tuyaopen-application-list) and download the pre-compiled bin file.

## Flash Firmware

You can use the graphical tool [Tuya Universal Serial Tool](https://www.tuyaopen.ai/tools/tyutool) `tyutool_gui` for firmware flashing. For detailed instructions, please refer to [tyutool_gui User Guide](../tos-tools/tools-tyutool.md#firmware-flashing).

## Device Authorization

If you need to connect the device to Tuya Cloud, you must authorize the device first. You can use the `tyutool_gui` tool for [device authorization](./equipment-authorization.md).

## Device Network Configuration

Device network configuration refers to connecting the device to a Wi-Fi router, activating it on Tuya Cloud, and binding it to the user. This process requires the **Smart Life** App on your mobile phone. For detailed steps, please refer to [Device Network Configuration](./device-network-configuration.md).

