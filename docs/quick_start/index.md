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

When you need to use the functions of the Tuya IoT platform, you must first authorize the device. You can use the tyutool_gui tool for [device authorization](./tools-tyutool.md#device-authorization-information-writing).

## Device Network Configuration

Device network configuration refers to connecting the device to a Wi-Fi router and binding it to the Tuya IoT platform. You need to use the **Smart Life** app for this operation. For detailed steps, please refer to the [Device Network Configuration](./device-network-configuration.md) document.

