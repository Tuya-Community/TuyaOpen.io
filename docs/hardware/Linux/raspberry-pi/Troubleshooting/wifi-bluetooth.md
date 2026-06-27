---
title: "Raspberry Pi Provisioning Troubleshooting"
slug: /hardware/Linux/raspberry-pi/wifi-bluetooth
---

Fix Wi-Fi and Bluetooth problems that block provisioning when you run a TuyaOpen app on Raspberry Pi (for example, `apps/tuya.ai/your_chat_bot`). Each section below states the symptom, the cause, and the fix.

## Prerequisites

Read the [Quick Start](https://tuyaopen.ai/docs/quick-start) and its sub-sections first:

- Set up the [TuyaOpen development environment](https://tuyaopen.ai/docs/quick-start/enviroment-setup).
- Obtain a [TuyaOpen authorization code](https://tuyaopen.ai/docs/quick-start/equipment-authorization). The header-file method is recommended.
- Understand [device network provisioning](https://tuyaopen.ai/docs/quick-start/device-network-configuration).

## Provisioning fails or the device will not re-pair

**Problem.** On the first run the app cannot enter the provisioning flow, or a previously paired device fails to connect to the network.

**Cause.** The app stores device data (including pairing state) in a `tuyadb` folder in its working directory. Stale data can block re-provisioning.

**Fix.** Clear the device data and run again:

1. Stop the running program.
2. Delete the `tuyadb` folder in the program's working directory:

   ```bash
   rm -rf tuyadb
   ```

3. Run the program again and re-enter the provisioning flow.

## No provisioning QR code in the terminal

**Problem.** The app starts but the terminal never prints the provisioning QR code, so you cannot scan it.

**Cause.** By default the QR code is sent over UART0. On Raspberry Pi, UART0 may go to a hardware serial line instead of your terminal. Redirecting UART to standard output prints the QR code where you can see it.

**Fix.** Enable UART redirection (the "Dummy UART" stdin/stdout/UDP mode):

1. Activate the `tos.py` environment and enter the app directory (using `your_chat_bot` as an example):

   ```bash
   cd apps/tuya.ai/your_chat_bot
   ```

2. Open the configuration menu:

   ```bash
   tos.py config menu
   ```

3. Go to `Choice a board → LINUX → TKL Board Configuration` and enable:

   - `Enable UART`
   - `UART redirection (stdin/stdout/UDP) instead of hardware ttyAMA*`

![Example UART redirection configuration in the TKL Board Configuration menu](https://images.tuyacn.com/fe-static/docs/img/842c4b01-3d4b-487b-973d-4744e82935e9.png)

After you enable UART redirection, the app prints the QR code to the current terminal during provisioning. Scan it with the Tuya Smart app to provision the device.

## Wi-Fi or Bluetooth is disabled by the OS

**Problem.** Bluetooth scanning or provisioning fails — BLE does not work, or the device is not discoverable — and Wi-Fi may also be unavailable.

**Cause.** The OS can disable the radios with `rfkill`, either in software (`Soft blocked`) or hardware (`Hard blocked`, for example a physical switch).

**Fix.**

1. Check the Wi-Fi and Bluetooth status:

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

   - `Soft blocked: yes` means the device is disabled in software.
   - `Hard blocked: yes` means the device is disabled in hardware (for example, a physical switch). Remove the hardware block first.

2. Unblock in software:

   ```bash
   sudo rfkill unblock all
   ```

   To unblock a specific item:

   ```bash
   sudo rfkill unblock wifi
   sudo rfkill unblock bluetooth
   ```

## Bluetooth provisioning still fails after unblocking

**Problem.** The radios are not blocked, but Bluetooth provisioning still does not work.

**Cause.** The TuyaOpen Bluetooth service may be disabled in the build configuration, or a configuration change was not rebuilt.

**Fix.** In `tos.py config menu`, verify the Bluetooth service is enabled:

```text
configure tuyaopen  --->
  configure tuya cloud service  --->
    [*] ENABLE_BT_SERVICE: enable tuya bt iot function  --->
      [ ] ENABLE_NIMBLE: enable nimble stack instead of ble stack in board
```

Recommended settings:

- Enable the Bluetooth service.
- Keep `NIMBLE` disabled.

After changing the configuration, rebuild (for example, run `tos.py build`). Otherwise the change does not take effect.

## Permission errors when accessing the radios

**Problem.** The app fails to open `/dev/*` nodes or system service interfaces at runtime.

**Cause.** Wi-Fi, Bluetooth, and peripheral operations on Raspberry Pi usually require elevated permissions.

**Fix.** Run the generated executable with `sudo`:

```bash
sudo ./your_chat_bot_*.elf
```
