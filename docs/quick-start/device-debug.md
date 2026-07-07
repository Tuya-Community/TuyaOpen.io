---
title: Device Debugging
description: "Device debugging captures TuyaOpen serial port logs so you can track device behavior and troubleshoot issues after flashing new firmware."
keywords:
  - device debugging
  - serial log
  - troubleshooting
  - tuyaopen
  - uart
---

Device debugging captures device logs over a serial port so you can track issues and troubleshoot behavior. After you flash [TuyaOpen](https://github.com/tuya/TuyaOpen) firmware, the serial log is the primary way to see what the device is doing.

:::info
The IoT and AI+IoT chips supported by TuyaOpen do not support J-Link debugging tools. Use serial port logging instead.
:::

## What you need

Before you begin, get the following ready.

### Hardware

- A [TuyaOpen-compatible development board or module](../hardware/index.md#hardware-platforms)
- A USB data cable or a USB-to-TTL converter

### Debugging tool

Choose one of the following serial debugging tools:

- [Tuya's universal serial tool](https://www.tuyaopen.ai/zh/tyutool): graphical interface, easy to operate.
- TuyaOpen `tos` command-line tool: command-line based, flexible options.
- Third-party tools: SSCOM, MobaXterm, PuTTY, and more.

## Configure the serial parameters

Look up the serial port and baud rate for your chip before you connect. Using the wrong values means you get no readable log output.

| Chip model | Serial port | Baud rate | Remarks |
|---------|---------|--------|------|
| Ubuntu | - | - | Runs directly on Ubuntu and other Linux hosts |
| T2 | Uart2 | 115200 | - |
| T3 | Uart1 | 460800 | - |
| T5AI | Uart1 | 460800 | - |
| ESP32/ESP32C3/ESP32S3 | Uart0 | 115200 | - |
| LN882H | Uart1 | 921600 | - |
| BK7231N | Uart2 | 115200 | - |

:::tip
Select the correct serial port and baud rate. Otherwise, you may not get log output.
:::

## Capture logs

Pick the tool that matches your workflow.

### Method 1: Tuya's universal serial tool

The graphical tool is recommended for most users — it has a friendly interface and complete functionality. See [GUI - tyutool Graphical Tool](../tos-tools/tools-tyutool.md).

### Method 2: The `tos` command-line tool

Use this method if you are comfortable on the command line and want more flexible options. See the [tos monitor command](../tos-tools/tos-guide.md#monitor).

### Method 3: A third-party serial tool

If you prefer another serial tool such as SSCOM, MobaXterm, or PuTTY, configure it using the serial parameters above and follow that tool's documentation.

## Debugging tips

- **Check the connection**: confirm the hardware connections are correct and the serial cable is undamaged.
- **Match the parameters**: set the serial port and baud rate exactly as listed in the table above.
- **Analyze the logs**: focus on startup logs, error messages, and unexpected output.
- **Record problems**: note the issues you find and the fixes you apply as you go.

:::note
If you get no serial output, check the hardware connections, the serial parameter settings, and the driver installation.
:::
