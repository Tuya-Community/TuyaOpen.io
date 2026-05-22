---
title: "Raspberry Pi Provisioning Troubleshooting"
slug: /hardware-specific/Linux/raspberry-pi/wifi-bluetooth
---

This document helps troubleshoot Wi‑Fi/Bluetooth-related issues when running TuyaOpen apps on Raspberry Pi (for example, `apps/tuya.ai/your_chat_bot`), including: provisioning QR code not shown, Bluetooth unavailable, or Wi‑Fi/Bluetooth being disabled by the OS.

## Prerequisites

Read the [Quick Start](https://tuyaopen.ai/docs/quick-start) and its subsections to understand:

- How to set up the [TuyaOpen development environment](https://tuyaopen.ai/docs/quick-start/enviroment-setup)
- How to obtain a [TuyaOpen authorization code](https://tuyaopen.ai/docs/quick-start/equipment-authorization) (the header-file method is recommended)
- How to perform [device network provisioning](https://tuyaopen.ai/docs/quick-start/device-network-configuration)

## Common Symptoms

- The program cannot enter the provisioning flow, or the terminal does not print a provisioning QR code.
- Bluetooth scan/provisioning fails (BLE not working, device not discoverable).
- Wi‑Fi or Bluetooth is disabled by the OS (`rfkill` shows blocked).

## First Run Requires Provisioning Scan

On the first run, the app typically requires QR code provisioning (for example, scanning the QR code output in the terminal).

If provisioning or network connection fails, try clearing device data and running again:

1. Stop the running program.
2. Delete the `tuyadb` folder in the program's working directory:

```bash
rm -rf tuyadb
```

3. Run the program again and re-enter the provisioning flow.

## Provisioning QR Code Not Printed in Terminal

On Raspberry Pi, to print the provisioning QR code (and related content) directly to the current terminal, it is recommended to enable "fake UART (stdin/UDP)".

1. Activate the `tos.py` environment and enter the app directory (taking `your_chat_bot` as an example):

```bash
cd apps/tuya.ai/your_chat_bot
```

2. Open the configuration menu:

```bash
tos.py config menu
```

3. Go to `Choice a board → LINUX → TKL Board Configuration` and enable:

- `Enable UART`
- `Use fake UART (stdin/UDP) instead of hardware ttyAMA*`

Example screenshot:

![Raspberry Pi fake UART configuration example](https://images.tuyacn.com/fe-static/docs/img/842c4b01-3d4b-487b-973d-4744e82935e9.png)

After enabling fake UART, the app usually prints the QR code to the current terminal during provisioning. Then use the Tuya Smart app to scan the QR code and provision the device.

## Check Whether Wi‑Fi/Bluetooth Is Disabled by rfkill

1. Check Wi‑Fi and Bluetooth status:

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

- `Soft blocked: yes` means the device is disabled in software.
- `Hard blocked: yes` means the device is disabled in hardware (for example, a physical switch); remove the hardware block first.

2. Unblock in software:

```bash
sudo rfkill unblock all
```

To unblock a specific item:

```bash
sudo rfkill unblock wifi
sudo rfkill unblock bluetooth
```

## Bluetooth Service and TuyaOpen Config Checks

### Confirm TuyaOpen Bluetooth service is enabled

In `tos.py config menu`, verify:

```text
configure tuyaopen  --->
  configure tuya cloud service  --->
    [*] ENABLE_BT_SERVICE: enable tuya bt iot function  --->
      [ ] ENABLE_NIMBLE: enable nimble stack instead of ble stack in board
```

In general, it is recommended to:

- Enable the Bluetooth service
- Keep `NIMBLE` disabled

After changing configuration, rebuild (for example, run `tos.py build`), otherwise the config change will not take effect.

## Runtime Permissions

On Raspberry Pi, Wi‑Fi/Bluetooth/peripheral operations often require access to `/dev/*` or system service interfaces. It is recommended to run the generated executable with `sudo`, for example:

```bash
sudo ./your_chat_bot_*.elf
```
