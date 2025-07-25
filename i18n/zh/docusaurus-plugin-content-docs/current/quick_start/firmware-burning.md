---
title: 固件烧录
---

# 烧录和日志

## 烧录

将设备与 PC 连接，若使用虚拟机，请将串口映射到虚拟机中。

:::tip
对于 Linux/Mac 用户，需要执行命令 `sudo usermod -aG dialout $USER` 开启串口使用权限，并重启系统。
:::

使用命令 `tos.py flash` 烧录固件，并选择烧录口。若有多个串口可以依次尝试。

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
<summary>若出现 `Port [xxx] may be busy` 提示：</summary>

可等待 1 分钟左右后再次尝试。对于不同的虚拟机和串口芯片，映射过程所需时间不同。
</details>


## 日志

使用命令 `tos.py monitor` 查看日志，并选择日志口。

如需查看完整日志，可在命令后，手动复位设备。

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

如需退出日志查看，按键 `Ctrl + C` 并回车。

```bash
^C[INFO]: Press "Entry" ...

[INFO]: Monitor exit.
```
## 常见问题

### 烧录失败

请参考 [安装对应驱动](../advanced_use/tools-tyutool.md#烧录过程中总是在write时失败)。 
