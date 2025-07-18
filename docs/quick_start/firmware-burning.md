---
title: Firmware Burning
---

# Flashing and Logging

## Flashing

Connect the device to PC, if using virtual machine, please map the serial port to the virtual machine

:::tip
For Linux / Mac users, you need to enable serial port usage permissions, execute command

`sudo usermod -aG dialout $USER`

and restart the system
:::

Flash the firmware using command `tos.py flash`, and select the flashing port

If there are multiple serial ports, you can try them one by one

```bash
❯ tos.py flash
[INFO]: Run Tuya Uart Tool.
[INFO]: Use default baudrate: [921600]
[INFO]: Use default start address: [0x00]
--------------------
1. /dev/ttyACM1
2. /dev/ttyACM0
--------------------
Select serial port: 2
[INFO]: Waiting Reset ...
[INFO]: unprotect flash OK.
[INFO]: sync baudrate 921600 success
Erasing: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 5 bytes/s   0:00:07 / 0:00:00
[INFO]: Erase flash success
Writing: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╸ 100% 12 bytes/s ⠸ 0:00:38 / 0:00:01
[INFO]: Write flash success
[INFO]: CRC check success
[INFO]: Reboot done
[INFO]: Flash write success.
```

<details>
<summary>If you see `Port [xxx] may be busy` prompt</summary>

You can wait for about 1 minute and try again

For different virtual machines and serial port chips, the mapping process takes different time
</details>

## Logging

View logs using command `tos.py monitor`, and select the log port

If you want to view complete logs, you can manually reset the device after the command

```bash
❯ tos.py monitor
[INFO]: Run Tuya Uart Tool.
--------------------
1. /dev/ttyACM1
2. /dev/ttyACM0
--------------------
Select serial port: 1
[INFO]: Open Monitor. (Quit: Ctrl+c)
[01-01 00:03:25 ty D][tuya_health.c:75] feed watchdog
[01-01 00:03:35 ty D][tuya_health.c:75] feed watchdog
[01-01 00:03:45 ty D][tuya_health.c:75] feed watchdog
[01-01 00:03:55 ty D][tuya_health.c:75] feed watchdog
```

Exit log viewing by pressing `Ctrl+c`, then press Enter

```bash
^C[INFO]: Press "Entry" ...

[INFO]: Monitor exit.
```
## Common Issues

1. Flashing fails

    Refer to [Install the corresponding driver.](../advanced_use/tools-tyutool.md#always-fails-during-write-in-the-burning-process)
