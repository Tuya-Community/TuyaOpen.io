---
title: Environment Setup
---

import { SyncedTabs, SyncedTabItem } from '@site/src/components/SyncedTabs';

# Development Environment Setup and Verification

## Overview

Complete the necessary tool preparation on different systems (Linux, Windows, Mac)

## Hardware Preparation

 - **TuyaOpen** [Supported development boards or modules](../hardware-specific/index.md#hardware-platforms)
 - USB data cable
 - Computer (Windows / Linux / macOS)

## Environment Preparation

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
    Recommended to use Ubuntu 24, 22, 20 LTS versions.
    :::

    Install necessary tools

    ```bash
    sudo apt-get install lcov cmake-curses-gui build-essential ninja-build wget git python3 python3-pip python3-venv libc6-i386 libsystemd-dev
    ```
  </SyncedTabItem>
  <SyncedTabItem value="Mac">
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
  </SyncedTabItem>
  <SyncedTabItem value="Windows">
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
  </SyncedTabItem>
</SyncedTabs>

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
    .\export.ps1  # powershell need to use command first `Set-ExecutionPolicy RemoteSigned -Scope LocalMachine`

    .\export.bat  # cmd
    ```
  </SyncedTabItem>
</SyncedTabs>

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

For more detailed information about `tos.py`, you can use the command `tos.py --help` to view

Or check [tos.py Tool Usage](../advanced_use/tos-guide.md)


## Common Issues

1. `tos.py` activation fails

    If activation fails, it may be because `python3-venv` is not installed. Please install it and try again

    ```bash
    sudo apt-get install python3-venv
    ```

    Delete the `./.venv` directory and reactivate
