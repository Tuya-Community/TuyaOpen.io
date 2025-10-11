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

:::tip
使用该命令的前提是，必须在应用项目路径中（执行`tos.py build`的位置），并且项目已经编译成功。
:::

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

请参考 [安装对应驱动](../tos-tools/tools-tyutool.md#烧录过程中总是在write时失败)。 

### T5系列映射虚拟机有延时

T5系列的开发板在虚拟机中映射串口时，可能会出现一定的延时。

现象是，映射后，使用命令`ls /dev/tty*`，可以看到设备，但是使用时会有`device busy`的提示，

一分钟左右可正常使用。

### 板子链接电脑会有两个串口号

T5系列的开发板会有两个串口号，一个是烧录用的，一个是日志用的。

在Windows中，可在设备管理列表中查看设备名称，名称中带有编号A的为下载口，带有编号B的为日志口。

在Linux或Mac系统中，一般设备号较小的是烧录口，较大的为日志口。

如果不能确定，可以在烧录固件时，两个串口都测试一下。

### GUI版本的烧录工具在Windows中被识别为病毒软件

可将`tyutool_gui`工具放在非系统盘（如D盘）下，并将目录添加到`Windows安中心-病毒和防护`设置中的`排除项`中。
