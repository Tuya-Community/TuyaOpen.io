---
title: 环境搭建
---

import { SyncedTabs, SyncedTabItem } from '@site/src/components/SyncedTabs';

# 环境搭建

## 概述

首先，完成在不同系统（Linux、Windows、macOS）中的必要工具准备。

然后，使用 `tos.py` 工具对项目进行配置、编译、烧录等操作。

最后，对设备授权并使用 **涂鸦** App 进行配网。

## 环境准备

<SyncedTabs
  defaultValue="Linux"
  values={[
    { label: '🐧 Ubuntu and Debian', value: 'Linux' },
    { label: '⌘ Mac', value: 'Mac' },
    { label: '🖥️ Windows', value: 'Windows' },
  ]}
>
  <SyncedTabItem value="Linux">
    :::info
    推荐使用 Ubuntu24/22/20 的 LTS 版本。
    :::

    安装必要的工具：

    ```bash
    sudo apt-get install lcov cmake-curses-gui build-essential ninja-build wget git python3 python3-pip python3-venv libc6-i386 libsystemd-dev
    ```
  </SyncedTabItem>
  <SyncedTabItem value="Mac">
    :::info
    推荐使用 Homebrew 包管理器进行安装。
    :::

    一般 Mac 终端使用的工具版本较低，推荐安装 Homebrew 并升级 bash。

    <details>
    <summary>安装 Homebrew，升级 bash。</summary>

    ```bash
    # 安装 Homebrew
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

    # 安装最新版 bash
    brew install bash

    # 将新安装的 bash 添加到可用 shell 列表
    echo "/usr/local/bin/bash" | sudo tee -a /etc/shells

    # 更改当前用户的 shell 为新 bash
    chsh -s /usr/local/bin/bash
    ```
    </details>

    安装必要的工具

    ```bash
    # 安装 python3
    brew install python3

    # 安装 git
    brew install git

    # 安装 make
    brew install make
    ```
  </SyncedTabItem>
  <SyncedTabItem value="Windows">
    :::info
    请使用 Windows10/11 系统。
    :::

    :::warning
    不兼容 Windows 中的仿 Linux 终端环境（如 GitBash、Msys2 等），请使用 CMD 或 PowerShell。
    :::

    下载并安装以下工具：
        > Python v3.8.0 或更高版本：[下载地址](https://www.python.org/downloads/windows/)
        >
        > Git v2.0.0 或更高版本：[下载地址](https://git-scm.com/downloads/win)
        >
        > Make v3.0 或更高版本：[下载地址](https://gnuwin32.sourceforge.net/packages/make.htm)
  </SyncedTabItem>
</SyncedTabs>

## 下载并激活 TuyaOpen

下载 `TuyaOpen` 仓库：

```bash
# 使用 github
git clone https://github.com/tuya/TuyaOpen.git

# 或者使用 gitee
git clone https://gitee.com/tuya-open/TuyaOpen.git

cd TuyaOpen
```

激活 `tos.py`：

<SyncedTabs
  defaultValue="Linux"
  values={[
    { label: '🐧 Linux', value: 'Linux' },
    { label: '⌘ Mac', value: 'Mac' },
    { label: '🖥️ Windows', value: 'Windows' },
  ]}
>
  <SyncedTabItem value="Linux">
    ```bash
    . ./export.sh
    ```
  </SyncedTabItem>
  <SyncedTabItem value="Mac">
    ```bash
    . ./export.sh
    ```
  </SyncedTabItem>
  <SyncedTabItem value="Windows">
    ```bash
    .\export.ps1  # powershell 需要先执行 `Set-ExecutionPolicy RemoteSigned -Scope LocalMachine`

    .\export.bat  # cmd
    ```
  </SyncedTabItem>
</SyncedTabs>

验证，使用命令 `tos.py version` 以及 `tos.py check`，会出现如下信息：

```bash
❯ tos.py version
[INFO]: Running tos.py ...
[INFO]: v1.3.0

❯ tos.py check
[INFO]: Running tos.py ...
[INFO]: [git] (2.43.0 >= 2.0.0) is ok.
[INFO]: [cmake] (4.0.2 >= 3.28.0) is ok.
[INFO]: [make] (4.3 >= 3.0.0) is ok.
[INFO]: [ninja] (1.11.1 >= 1.6.0) is ok.
[INFO]: Downloading submoudules ...
[INFO]: [do subprocess]: cd /home/huatuo/work/open/TuyaOpen && git submodule update --init
[INFO]: Download submoudules successfully.
```

<details>
<summary>若 check 命令失败：</summary>
```bash
# 工具校验不合格，请安装或升级对应工具

# submodules 下载失败，手动执行 git 命令
git submodule update --init
```
</details>

使用如下命令退出激活 `tos.py`：

<SyncedTabs
  defaultValue="Linux"
  values={[
    { label: '🐧 Linux', value: 'Linux' },
    { label: '⌘ Mac', value: 'Mac' },
    { label: '🖥️ Windows', value: 'Windows' },
  ]}
>
  <SyncedTabItem value="Linux">
    ```bash
    deactivate
    ```
  </SyncedTabItem>
  <SyncedTabItem value="Mac">
    ```bash
    deactivate
    ```
  </SyncedTabItem>
  <SyncedTabItem value="Windows">
    ```bash
    exit
    ```
  </SyncedTabItem>
</SyncedTabs>

关于 `tos.py` 更详细的说明方法，可使用命令 `tos.py --help` 进行查看，或参考 [tos.py工具使用](./tos-guide.md)。

## 项目操作

### 选择项目

TuyaOpen 中，可编译项目可在 `apps`、`example` 中进行选择。

这里以`switch_demo`为例。首先，进入项目目录。

```bash
cd apps/tuya_cloud/switch_demo
```

### 配置项目

使用命令 `tos.py config choice`，对项目进行配置。

该命令会提供已经验证过的配置选项，用户可根据自己的硬件设备进行选择。

```bash
❯ tos.py config choice
[INFO]: Running tos.py ...
[INFO]: Fullclean success.
--------------------
1. LN882H.config
2. EWT103-W15.config
3. Ubuntu.config
4. ESP32-C3.config
5. ESP32-S3.config
6. ESP32.config
7. T3.config
8. T5AI.config
9. T2.config
10. BK7231X.config
--------------------
Input "q" to exit.
Choice config file:
```

这里以涂鸦 T5 系列开发板为例，需要选择 `T5AI.config`。

### 编译产物

编译项目，使用命令 `tos.py build`。

```bash
❯ tos.py build
...
[INFO]: ******************************
[INFO]: /xxx/TuyaOpen/apps/tuya_cloud/switch_demo/.build/bin/switch_demo_QIO_1.0.0.bin
[INFO]: ******************************
[INFO]: ******* Build Success ********
[INFO]: ******************************

```

### 清理产物

清理编译缓存，使用命令 `tos.py clean` 或 `tos.py clean -f`（深度清理）。

```bash
❯ tos.py clean -f
[INFO]: Running tos.py ...
[INFO]: Fullclean success.
```

## 烧录、日志和授权

### 烧录

将设备与 PC 连接，若使用虚拟机，请将串口映射到虚拟机中。

:::tip
对于 Linux/Mac 用户，需要开启串口使用权限，执行命令 `sudo usermod -aG dialout $USER`，并重启系统。
:::

烧录固件，使用命令 `tos.py flash`，并选择烧录口。若有多个串口可以依次尝试。

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
<summary>若出现`Port [xxx] may be busy`提示：</summary>

可等待 1 分钟左右，再次尝试。对于不同的虚拟机和串口芯片，映射过程所需时间不同。
</details>


### 日志

查看日志，使用命令 `tos.py monitor`，并选择日志口。

若想查看完整日志，可在命令后，手动复位设备。

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

退出日志查看，按键 `Ctrl+c` 并回车。

```bash
^C[INFO]: Press "Entry" ...

[INFO]: Monitor exit.
```

### 授权

关于授权码的概念，请查看 [授权码说明](./index.md#授权码)。

您可以使用以下两种授权方式：

- 授权命令

    使用命令 `tos.py monitor -b 115200`。

    :::tip
    这里选择烧录时使用的串口号。
    :::

    输入交互命令，使用 `auth`，回车，得到如下信息：

    ```bash
    [INFO]: Run Tuya Uart Tool.
    --------------------
    1. /dev/ttyACM1
    2. /dev/ttyACM0
    --------------------
    Select serial port: 2
    [INFO]: Open Monitor. (Quit: Ctrl+c)
    auth
    auth
    Use like: auth uuidxxxxxxxxxxxxxxxx keyxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    tuya>
    ```

    根据提示使用 `auth`，写入 `uuid `和 `authkey`。

    ```bash
    tuya>
    auth uuid9f6a6xxxxxxxxxxx cGuDnU2YxjHJldjxxxxxxxxxxxxxxxxx
    auth uuid9f6a6xxxxxxxxxxx cGuDnU2YxjHJldjxxxxxxxxxxxxxxxxx
    Authorization write succeeds.
    ```

    若设备不支持授权命令，请使用下文的方式，通过修改头文件来配置授权信息。

- 修改头文件

    在项目路径中找到 `tuya_config.h` 文件。所选的项目不同，文件所在目录可能有差异（`src` 或 `include`）。

    修改文件中授权信息的配置，如下：

    ```c++
    #define TUYA_OPENSDK_UUID      "uuidxxxxxxxxxxxxxxxx"                    // Please change the correct uuid
    #define TUYA_OPENSDK_AUTHKEY   "keyxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"        // Please change the correct authkey
    ```

    重新编译、烧录，然后启动设备。

## 设备配网

请参考 [设备配网指导](./device-network-configuration.md)。

## 常见问题

1. 烧录失败

    参考[安装对应驱动](./tools-tyutool.md#烧录过程中总是在write时失败)

2. `tos.py`激活失败

    若激活失败，可能是因为没有安装`python3-venv`，请安装后重试

    ```bash
    sudo apt-get install python3-venv
    ```

    删除`./.venv`目录，重新激活
