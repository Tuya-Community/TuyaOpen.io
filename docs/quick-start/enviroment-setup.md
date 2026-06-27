---
title: "Step 0: Environment Setup"
---

import { SyncedTabs, SyncedTabItem } from '@site/src/components/SyncedTabs';

Set up the toolchain TuyaOpen needs on your computer, download the repository, and activate `tos.py` — the command-line tool you use to configure, build, and flash every project.

## Prepare hardware

Before you start, prepare the following:

- A [TuyaOpen-compatible development board or module](../hardware/index.md#development-boards)
- A USB data cable
- A computer running Windows, Linux, or macOS

## Install the toolchain

Select your operating system and install the required tools.

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

    Download and install the following tools, add them to environment variables, restart your computer, and ensure the corresponding commands work correctly in the terminal:
     - Python v3.8.0 or later: [Download](https://www.python.org/downloads/windows/)
     - Git v2.0.0 or later: [Download](https://git-scm.com/downloads/win)
     - Make v3.0 or later: [Download](https://gnuwin32.sourceforge.net/packages/make.htm)
  </SyncedTabItem>
</SyncedTabs>

## Download and activate TuyaOpen

Clone the TuyaOpen repository.

:::tip
You can adjust the git configuration to improve clone performance:

```bash
git config --global http.postBuffer 524288000
```
:::

:::warning
Do not use Chinese characters or special characters such as spaces in the project path. On Windows, do not place the project on the C drive.
:::

```bash
# Use GitHub
git clone https://github.com/tuya/TuyaOpen.git

# Or use Gitee
git clone https://gitee.com/tuya-open/TuyaOpen.git

# Enter the project
cd TuyaOpen
```

Activate `tos.py`.

:::warning
You must reactivate `tos.py` each time you reopen the terminal.
:::

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

Verify the activation by running `tos.py version` and `tos.py check`. You should see output similar to the following:

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
[INFO]: Downloading submodules...
[INFO]: [do subprocess]: cd /home/huatuo/work/open/TuyaOpen && git submodule update --init
[INFO]: Download submodules successfully.
```

<details>
<summary>If the check command fails:</summary>
```bash
# Tool validation failed. Please install or upgrade the required tools.
# Submodules download failed. Manually execute the git command.
git submodule update --init
```
</details>

When you are done, deactivate `tos.py`.

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

For a full description of `tos.py`, run `tos.py --help` or see [CLI - tos.py Development Tool](../tos-tools/tos-guide.md).

## FAQs

### Activation of `tos.py` fails

- Activation can fail because `python3-venv` is not installed. Install it and try again.

  ```bash
  sudo apt-get install python3-venv
  ```

- Activating `tos.py` creates the `./.venv` directory automatically. If activation fails, delete the `./.venv` directory and activate again.
