---
title: "Raspberry Pi Provisioning Troubleshooting"
slug: /hardware-specific/Linux/raspberry-pi/wifi-bluetooth
---

This document helps you troubleshoot WiFi/Bluetooth issues when running TuyaOpen apps on Raspberry Pi (for example, `apps/tuya.ai/your_chat_bot`). Common cases include: the provisioning QR code is not printed, Bluetooth is unavailable, or WiFi/Bluetooth is blocked by the system.

## Prerequisites

Please read [Quick Start](https://tuyaopen.ai/docs/quick-start) and its sub-sections first, so you understand:

- How to set up the [TuyaOpen development environment](https://tuyaopen.ai/docs/quick-start/enviroment-setup)
- How to obtain the [TuyaOpen dedicated authorization code](https://tuyaopen.ai/docs/quick-start/equipment-authorization). It is recommended to authorize by modifying the header file.
- How to do [device provisioning](https://tuyaopen.ai/docs/quick-start/device-network-configuration)

## Common symptoms

- The program does not enter the provisioning flow, or the terminal does not print the provisioning QR code.
- Bluetooth scan/provisioning fails (BLE does not work, or the device cannot be found).
- WiFi or Bluetooth is disabled by the system (`rfkill` shows blocked).

## Provisioning QR code is not printed to the terminal

On Raspberry Pi, to print the provisioning QR code and related logs directly to the current terminal, it is recommended to enable **fake UART (stdin/UDP)**.

1. Activate the `tos.py` environment and enter the app directory (take `your_chat_bot` as an example):

```bash
cd apps/tuya.ai/your_chat_bot
```

2. Open the configuration menu:

```bash
tos.py config menu
```

3. Navigate to `Choice a board → LINUX → TKL Board Configuration`, then enable:

- `Enable UART`
- `Use fake UART (stdin/UDP) instead of hardware ttyAMA*`

Example UI:

![Raspberry Pi fake UART configuration example](https://images.tuyacn.com/fe-static/docs/img/842c4b01-3d4b-487b-973d-4744e82935e9.png)

After enabling fake UART, during provisioning the app will usually print the QR code to the current terminal. Use the **Smart Life** app to scan it and complete provisioning.

## Check whether WiFi/Bluetooth is blocked by rfkill

1. Check the WiFi and Bluetooth status:

```bash
rfkill list
```

Example output:

```text
0: hci0: Bluetooth
	Soft blocked: no
	Hard blocked: no
1: phy0: Wireless LAN
	Soft blocked: yes
	Hard blocked: no
```

Where:

- `Soft blocked: yes` means the device is disabled at the software level.
- `Hard blocked: yes` means the device is disabled at the hardware level (for example, a physical switch). You must clear the hardware block first.

2. Unblock at the software level:

```bash
sudo rfkill unblock all
```

If you only want to unblock one item:

```bash
sudo rfkill unblock wifi
sudo rfkill unblock bluetooth
```

## Bluetooth service and TuyaOpen config checks

### Confirm TuyaOpen has Bluetooth service enabled

In `tos.py config menu`, check:

```text
configure tuyaopen  --->
  configure tuya cloud service  --->
    [*] ENABLE_BT_SERVICE: enable tuya bt iot function  --->
      [ ] ENABLE_NIMBLE: enable nimble stack instead of ble stack in board
```

In general, it is recommended to:

- Enable the Bluetooth service.
- Keep the `NIMBLE` stack disabled.

After changing the configuration, you must rebuild (for example, run `tos.py build`), otherwise the changes will not take effect.

## Runtime permissions

On Raspberry Pi, when running apps/examples, operations related to WiFi/Bluetooth/peripherals often require access to `/dev/*` or system service interfaces. It is recommended to run the generated executable with `sudo`, for example:

```bash
sudo ./your_chat_bot_*.elf
```
