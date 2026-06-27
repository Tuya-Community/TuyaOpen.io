---
title: Unboxing Use
---

Unboxing use flashes a pre-compiled firmware onto a supported board so you can connect it to the Tuya IoT Cloud and try Tuya Cloud services without building anything yourself. Use this path to evaluate a board quickly; if you want to build and compile [TuyaOpen](https://github.com/tuya/TuyaOpen) from source, skip this page and start at [Environment Setup](./enviroment-setup.md).

## Preparation

Before you start, prepare the following:

- A [TuyaOpen-supported development board or module](../hardware/index.md#development-boards)
- A USB data cable
- A computer running Windows, Linux, or macOS

## Download firmware

Download a firmware to flash and test from the **[TuyaOpen release page](https://github.com/tuya/TuyaOpen/releases)**.

Select the chip and application that match your board from the [TuyaOpen application list](../cloud/overview#tuyaopen-application-list), then download the matching pre-compiled bin file.

## Flash firmware

Flash the firmware with the graphical [Tuya universal serial tool](https://www.tuyaopen.ai/tools/tyutool), `tyutool_gui`. For step-by-step instructions, see [GUI - tyutool Graphical Tool](../tos-tools/tools-tyutool.md#firmware-flashing).

## Authorize the device

To connect the device to the Tuya IoT Cloud, you must authorize it first. Use `tyutool_gui` to perform [device authorization](./equipment-authorization.md).

## Configure the network

Network configuration connects the device to a Wi-Fi router, activates it on the Tuya IoT Cloud, and binds it to your account. This requires the **Smart Life** app on your phone. For the full procedure, see [Device Network Configuration](./device-network-configuration.md).
