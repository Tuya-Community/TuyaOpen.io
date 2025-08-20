---
title: Device Debugging
---

## Overview

This topic describes how to use serial port debugging tools to capture device logs for issue tracking and troubleshooting. After completing [TuyaOpen](https://github.com/tuya/TuyaOpen) firmware flashing, serial debugging serves as an effective method for troubleshooting device issues.

:::info
**Currently, the IoT and AI+IoT chips supported by TuyaOpen do not support J-Link debugging tools. Instead, they use serial port logging for debugging.**
:::

## Preparation

Before you begin debugging, make sure you have the following resources ready:

### Hardware devices

- [TuyaOpen-compatible development boards or modules](../hardware-specific/index.md#hardware-platforms)
- USB data line or USB-to-TTL converter

### Debugging tools

Choose one of the following serial debugging tools:

- **[Tuya's universal serial tool](https://www.tuyaopen.ai/zh/tools/tyutool)**: Graphical interface, easy to operate.
- **TuyaOpen command line tos tool**: Command-line based, powerful functionality.
- **Third-party tools**: SSCOM, MobaXterm, PuTTY, and more.

## Configure debugging parameters

### Serial parameter reference table

Before starting debugging, look up the debugging parameters based on your chip model.

| Chip model | Serial port | Baud rate | Remarks |
|---------|---------|--------|------|
| Ubuntu | - | - | Run directly on Ubuntu and other Linux hosts |
| T2 | Uart2 | 115200 | - |
| T3 | Uart1 | 460800 | - |
| T5AI | Uart1 | 460800 | - |
| ESP32/ESP32C3/ESP32S3 | Uart0 | 115200 | - |
| LN882H | Uart1 | 921600 | - |
| BK7231N | Uart2 | 115200 | - |

:::tip
**Select the correct serial port and baud rate. Otherwise, you may not be able to obtain log information as expected.**
:::

## Debugging process

### Method 1: Use Tuya's universal serial tool

You are recommended to use the graphical serial port debugging tool provided by Tuya, which features a user-friendly interface and complete functionalities.

For more information, see [Serial Debugging Tool User Guide](../tos-tools/tools-tyutool.md).

### Method 2: Use the `tos` command-line tool

This method is suitable for developers familiar with the command line, offering more flexible debugging options.

For more information, see the [tos monitor command](../tos-tools/tos-guide#monitor).

### Method 3: Use a third-party serial port tool

If you prefer using other serial port debugging tools such as SSCOM, MobaXterm, and PuTTY, refer to the respective tool's documentation for configuration.

## Debugging tips

- **Check connection**: Ensure hardware connections are correct and serial cables are undamaged.
- **Match parameters**: Configure serial port parameters strictly according to the specifications in the table above.
- **Analyze logs**: Focus on startup logs, error messages, and exceptional outputs.
- **Record problems**: Promptly record problems identified and solutions implemented during the debugging process.

:::note
**Troubleshooting**: If you cannot get serial port output, please check hardware connections, serial port parameter settings, and driver installation.
:::
