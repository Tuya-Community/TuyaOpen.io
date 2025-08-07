---
title: Device Debugging
---

## Overview

This document will guide you on how to use serial debugging tools to obtain device logs for problem tracking and troubleshooting. After completing [TuyaOpen](https://github.com/tuya/TuyaOpen) firmware burning, serial debugging is an effective method for troubleshooting device issues.

:::info
**Important Note**: Currently, TuyaOpen supported IoT and AI+IoT chips do not support JLink debugging tools. Serial logging is used uniformly for debugging.
:::

## Prerequisites

Before starting debugging, please ensure you have the following necessary resources:

### Hardware Equipment
- [TuyaOpen supported development boards or modules](../hardware-specific/index.md#hardware-platforms)
- USB data cable or USB-TTL converter

### Debugging Tools
Choose one of the following serial debugging tools:
- **[Tuya Universal Serial Tool](https://www.tuyaopen.ai/zh/tools/tyutool)** - Graphical interface, easy to operate
- **TuyaOpen command line tos tool** - Command line approach, powerful functionality
- **Third-party tools** - SSCOM, MobaXterm, PuTTY, etc.

## Debug Parameter Configuration

### Serial Parameter Reference Table

Before starting debugging, please query the corresponding debugging parameters according to your chip model:

| Chip Model | Debug Serial Port | Baud Rate | Remarks |
|------------|------------------|-----------|---------|
| Ubuntu | - | - | Can run directly on Ubuntu and other Linux hosts |
| T2 | Uart2 | 115200 | |
| T3 | Uart1 | 460800 | |
| T5AI | Uart1 | 460800 | |
| ESP32/ESP32C3/ESP32S3 | Uart0 | 115200 | |
| LN882H | Uart1 | 921600 | |
| BK7231N | Uart2 | 115200 | |

:::tip
**Configuration Key Points**: Ensure you select the correct debug serial port and baud rate, otherwise you may not be able to obtain log information normally.
:::

## Debugging Steps

### Method 1: Using Tuya Universal Serial Tool

Recommended to use the graphical serial debugging tool provided by Tuya, with a friendly interface and comprehensive functionality.

**Detailed Usage Instructions**: Please refer to [Serial Debugging Tool Usage Guide](../tos-tools/tools-tyutool.md)

### Method 2: Using tos Command Line Tool

Suitable for developers familiar with command line, providing more flexible debugging options.

**Detailed Usage Instructions**: Please refer to [tos monitor command](../tos-tools/tos-guide#monitor)

### Method 3: Using Third-party Serial Tools

If you are accustomed to using other serial debugging tools such as SSCOM, MobaXterm, PuTTY, etc., please refer to the corresponding tool's usage instructions for configuration.

## Debugging Tips

1. **Connection Check**: Ensure hardware connections are correct and serial cables are not damaged
2. **Parameter Matching**: Strictly configure serial parameters according to the table above
3. **Log Analysis**: Pay attention to startup logs, error messages, and exception outputs
4. **Problem Recording**: Timely record problems and solutions discovered during the debugging process

:::note
**Troubleshooting**: If you cannot obtain serial output, please check hardware connections, serial parameter settings, and driver installation status.
:::



