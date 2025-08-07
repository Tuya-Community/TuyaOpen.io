---
title: Environment Setup
---

import { SyncedTabs, SyncedTabItem } from '@site/src/components/SyncedTabs';

# Environment Setup

## Overview

Prepare necessary tools on different systems, such as Linux, Windows, and macOS.

## Prepare hardware

Before getting started, prepare the following resources:
- [TuyaOpen-compatible development boards or modules](../hardware-specific/index.md#hardware-platforms)
- USB data cable
- Computer (Windows, Linux, or macOS supported)

## Set up environment

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
    It is recommended to use the LTS versions of Ubuntu 24, 22, and 20.
    :::

    Install the necessary tools:

    ```bash
    sudo apt-get install lcov cmake-curses-gui build-essential ninja-build wget git python3 python3-pip python3-venv libc6-i386 libsystemd-dev
    ```
  </SyncedTabItem>
  <SyncedTabItem value="Mac">
    :::info
    Homebrew package manager is recommended for installation.
    :::

    The default tool versions on macOS are often outdated. It is recommended to install Homebrew and update bash.

    <details>
    <summary>Install Homebrew and update bash:</summary>

    ```bash
    # Install Homebrew
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

    # Install the latest bash
    brew install bash

    # Add the newly installed bash to the list of available shells
    echo "/usr/local/bin/bash" | sudo tee -a /etc/shells

    # Change the current user's shell to the new bash
    chsh -s /usr/local/bin/bash
    ```
    </details>

    Install the necessary tools:

    ```bash
    # Install python3
    brew install python3

    # Install Git
    brew install git

    # Install make
    brew install make
    ```
  </SyncedTabItem>
  <SyncedTabItem value="Windows">
    :::info
    Use Windows 10 and 11 systems.
    :::

    :::warning
    It is incompatible with Linux-like terminal environments on Windows (such as Git Bash and MSYS2). Please use CMD or PowerShell.
    :::

    Download and install the following tools:
     - Python v3.8.0 or later: [Download](https://www.python.org/downloads/windows/)
     - Git v2.0.0 or later: [Download](https://git-scm.com/downloads/win)
     - Make v3.0 or later: [Download](https://gnuwin32.sourceforge.net/packages/make.htm)
  </SyncedTabItem>
</SyncedTabs>

## Download and activate TuyaOpen

Download the TuyaOpen repository:``

```bash
# Use GitHub
git clone https://github.com/tuya/TuyaOpen.git

# Or use Gitee
git clone https://gitee.com/tuya-open/TuyaOpen.git

cd TuyaOpen
```

Activate `tos.py`:

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
    .\export.ps1  # # powershell needs to execute `Set-ExecutionPolicy RemoteSigned -Scope LocalMachine` first

    .\export.bat  # cmd
    ```
  </SyncedTabItem>
</SyncedTabs>

Run the commands `tos.py version` and `tos.py check` to verify. You will see the following information:

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
<summary>If the check command fails:</summary>
```bash
# Tool validation failed. Please install or upgrade the required tools.

# Submodules download failed. Manually execute the git command.
git submodule update --init
```
</details>

Run the following command to deactivate `tos.py`:

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

You can run the command `tos.py --help` to view a more detailed description of `tos.py`, or refer to the [tos.py Guide](../tos-tools/tos-guide.md).

Or check [tos.py Tool Usage](../tos-tools/tos-guide.md)

## FAQs

### Failed to activate `tos.py`

- If activation failed, it may be because `python3-venv` is not installed. Install it and try again.

  ```bash
  sudo apt-get install python3-venv
  ```

- When `tos.py` is activated, the `./.venv` directory will be created automatically. If activation failed, you need to delete the `./.venv` directory and re-activate it.
