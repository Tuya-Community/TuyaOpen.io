---
title: "Step 2: 固件烧录"
---

烧录将你构建的固件 bin 写入设备，日志则实时输出设备的串口信息，便于观察设备的启动和运行。两者都在应用项目目录下通过 `tos.py` 执行。

## 烧录固件

将设备连接到 PC。若使用虚拟机，请将串口映射到虚拟机中。

:::tip
对于 Linux 用户，执行命令 `sudo usermod -aG dialout $USER` 开启串口使用权限，然后重启系统。
:::

执行命令 `tos.py flash` 烧录固件，并选择正确的烧录口。若有多个串口，可依次尝试。

:::tip
使用该命令的前提是：必须在应用项目路径下（即执行 `tos.py build` 的位置），且项目已成功编译。
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

等待约 1 分钟后重试。映射所需时间因虚拟机和串口芯片型号而异。
</details>

## 日志

执行命令 `tos.py monitor` 查看日志，并选择正确的日志口。

如需查看完整日志，可在执行命令后手动复位设备。

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

如需退出日志查看，按 `Ctrl + C` 后回车。

```bash
^C[INFO]: Press "Entry" ...

[INFO]: Monitor exit.
```

## 常见问题

### 烧录失败

烧录过程中若出现以下情况，通常是缺少串口驱动导致的：

- 烧录在 `write` 阶段卡住或反复失败
- Mac 系统无法识别串口

详情请参考 [安装驱动](../tos-tools/tools-tyutool.md#烧录过程中总是在write时失败)。

### T5 系列虚拟机映射有延时

T5 系列开发板在虚拟机中映射串口时可能出现一定延时。

现象是：映射后使用命令 `ls /dev/tty*` 可以看到设备，但使用时会出现 `device busy` 提示。

约一分钟后即可正常使用。

### 开发板连接电脑会出现两个串口号

T5 系列开发板会出现两个串口号，一个用于烧录，一个用于日志。

在 Windows 中，可在设备管理器列表中查看设备名称，名称中带编号 A 的为下载口，带编号 B 的为日志口。

在 Linux 或 Mac 系统中，一般设备号较小的是烧录口，较大的是日志口。

如果不能确定，可在烧录固件时两个串口都测试一下。

### GUI 版本烧录工具在 Windows 中被识别为病毒

可将 `tyutool_gui` 工具放在非系统盘（如 D 盘）下，并将该目录添加到 **Windows 安全中心 - 病毒和威胁防护** 设置的排除项中。
