---
title: Development Environment Setup and Verification
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Development Environment Setup and Verification

## Overview

First, complete the necessary tool preparation on different systems (Linux, Windows, Mac)

Then use the `tos.py` tool to configure, compile, flash, and perform other operations on the project

Finally, authorize the device and use the Tuya APP for network configuration

## Environment Preparation

<Tabs>
  <TabItem value="Linux" label="🐧 Ubuntu and Debian" default>
    :::info
    Recommended to use Ubuntu 24, 22, 20, 18 LTS versions.
    :::

    Install necessary tools

    ```bash
    sudo apt-get install lcov cmake-curses-gui build-essential ninja-build wget git python3 python3-pip python3-venv libc6-i386 libsystemd-dev
    ```
  </TabItem>
  <TabItem value="Mac" label="⌘ Mac" default>
    :::info
    Recommended to use Homebrew package manager for installation
    :::

    Generally, Mac terminal uses older tool versions, recommended to install Homebrew and upgrade bash

    <details>
    <summary>Install Homebrew and upgrade bash</summary>
    ```bash
    # Install Homebrew
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

    # Install latest bash
    brew install bash

    # Add newly installed bash to available shells list
    echo "/usr/local/bin/bash" | sudo tee -a /etc/shells

    # Change current user's shell to new bash
    chsh -s /usr/local/bin/bash
    ```
    </details>

    Install necessary tools

    ```bash
    # Install python3
    brew install python3

    # Install git
    brew install git

    # Install make
    brew install make
    ```
  </TabItem>
  <TabItem value="Windows" label="🖥️ Windows">
    :::info
    Please use Windows 10/11 system.
    :::

    :::warning
    Not compatible with Linux-like terminal environments in Windows (such as GitBash, Msys2, etc.), please use CMD or PowerShell
    :::

    Download and install the following tools:
        > Python: 3.8.0 or higher version [https://www.python.org/downloads/windows/]
        >
        > Git: 2.0.0 or higher version [https://git-scm.com/downloads/win]
        >
        > Make: 3.0 or higher version [https://gnuwin32.sourceforge.net/packages/make.htm]
  </TabItem>
</Tabs>

## Download & Activate TuyaOpen

Download the `TuyaOpen` repository

```bash
# Using github
git clone https://github.com/tuya/TuyaOpen.git

# Or using gitee
git clone https://gitee.com/tuya-open/TuyaOpen.git

cd TuyaOpen
```

Activate `tos.py`

<Tabs>
  <TabItem value="Linux" label="🐧 Linux" default>
    ```bash
    . ./export.sh
    ```
  </TabItem>
  <TabItem value="Mac" label="⌘ Mac" default>
    ```bash
    . ./export.sh
    ```
  </TabItem>
  <TabItem value="Windows" label="🖥️ Windows">
    ```bash
    .\export.bat
    ```
  </TabItem>
</Tabs>

Verify by using commands `tos.py version` and `tos.py check`, you should see the following information

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
<summary>If check command fails</summary>
```bash
# Tool validation fails, please install or upgrade corresponding tools

# Submodules download fails, manually execute git command
git submodule update --init
```
</details>

Use the following command to deactivate `tos.py`

<Tabs>
  <TabItem value="Linux" label="🐧 Linux" default>
    ```bash
    deactivate
    ```
  </TabItem>
  <TabItem value="Mac" label="⌘ Mac" default>
    ```bash
    deactivate
    ```
  </TabItem>
  <TabItem value="Windows" label="🖥️ Windows">
    ```bash
    exit
    ```
  </TabItem>
</Tabs>

For more detailed information about `tos.py`, you can use the command `tos.py --help` to view

Or check [tos.py Tool Usage](https://tuyaopen.ai)

## Project Operations

### Select Project

In TuyaOpen, compilable projects can be selected from `apps` and `example` directories

Here we use `switch_demo` as an example

Enter the project directory

```bash
cd apps/tuya_cloud/switch_demo
```

### Configure Project

Use command `tos.py config choice` to configure the project

This command will provide verified configuration options, users can select based on their hardware devices

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

Here we use Tuya T5 series development board as an example, select `T5AI.config`

### Build Artifacts

Build the project using command `tos.py build`

```bash
❯ tos.py build
...
[INFO]: ******************************
[INFO]: /xxx/TuyaOpen/apps/tuya_cloud/switch_demo/.build/bin/switch_demo_QIO_1.0.0.bin
[INFO]: ******************************
[INFO]: ******* Build Success ********
[INFO]: ******************************

```

### Clean Artifacts

Clean compilation cache using command `tos.py clen` or `tos.py clean -f` (deep clean)

```bash
❯ tos.py clean -f
[INFO]: Running tos.py ...
[INFO]: Fullclean success.
```

## Flashing, Logging and Authorization

### Flashing

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

### Logging

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

### Authorization

For information about authorization codes, please check [Authorization Code Description](https://tuyaopen.ai)

Two authorization methods are provided

1. Authorization Command

    Use command `tos.py monitor -b 115200`

    :::tip
    Here select the serial port used during flashing
    :::

    Input interactive command, `auth`, press Enter

    You will get the following information

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

    According to the prompt, use `auth` to write `uuid` and `authkey`

    ```bash
    tuya>
    auth uuid9f6a6xxxxxxxxxxx cGuDnU2YxjHJldjxxxxxxxxxxxxxxxxx
    auth uuid9f6a6xxxxxxxxxxx cGuDnU2YxjHJldjxxxxxxxxxxxxxxxxx
    Authorization write succeeds.
    ```

    If the device doesn't support authorization command, use method 2 to configure authorization information

2. Modify Header File

    Find the `tuya_config.h` file in the project path

    The file location may vary depending on the selected project, in `src` or `include` directory

    Modify the authorization information configuration in the file, such as

    ```c++
    #define TUYA_OPENSDK_UUID      "uuidxxxxxxxxxxxxxxxx"                    // Please change the correct uuid
    #define TUYA_OPENSDK_AUTHKEY   "keyxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"        // Please change the correct authkey
    ```

    Recompile, flash, and start the device

## Device Network Configuration

[Device Network Configuration Guide](https://tuyaopen.ai)

## Common Issues

- Flashing always fails on Mac system

    Refer to [MAC CH34X Installation](https://tuyaopen.ai)
