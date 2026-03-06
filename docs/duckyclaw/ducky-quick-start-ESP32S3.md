---
title: DuckyClaw with ESP32-S3
---

import { SyncedTabs, SyncedTabItem } from '@site/src/components/SyncedTabs';

# DuckyClaw Quick Start (ESP32-S3)

This guide walks you through building and flashing the DuckyClaw firmware on an ESP32-S3 development board. It is for developers who want to run DuckyClaw on ESP32-S3 with Wi‑Fi.

## Prerequisites

- None beyond the [Quick Start](quick-start/index) overview. Basic familiarity with a terminal and Git is helpful.

## Requirements

- **ESP32-S3 development board** with PSRAM 8 MB and FLASH 16 MB.
- **USB data cable** to connect the board to your computer.
- **Computer** running Windows 10/11, Linux (e.g. Ubuntu 20/22/24 LTS), or macOS.
- **Tuya Cloud**: This demo uses Tuya Cloud services. You need a valid [license key (authorization code)](quick-start/equipment-authorization) and correct PID, UUID, and AuthKey in `tuya_app_config.h` for cloud and LLM features.

## Steps

### 1. Install build tools (Python, Make, Git)

Install the required tools on your host machine.

<SyncedTabs
  defaultValue="Linux"
  values={[
    { label: 'Ubuntu and Debian', value: 'Linux' },
    { label: 'Mac', value: 'Mac' },
    { label: 'Windows', value: 'Windows' },
  ]}
>
<SyncedTabItem value="Linux">

:::info
We recommend Ubuntu 20, 22, or 24 LTS.
:::

Install the required packages:

```bash
sudo apt-get install lcov cmake-curses-gui build-essential ninja-build wget git python3 python3-pip python3-venv libc6-i386 libsystemd-dev
```

</SyncedTabItem>
<SyncedTabItem value="Mac">

:::info
We recommend using Homebrew to install the tools.
:::

Mac system tools may be outdated. You can install Homebrew and a newer bash, then install the build tools:

<details>
<summary>Install Homebrew and upgrade bash (optional)</summary>

```bash
# Install Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install bash
brew install bash

# Add bash to allowed shells
echo "/usr/local/bin/bash" | sudo tee -a /etc/shells

# Set default shell for current user
chsh -s /usr/local/bin/bash
```

</details>

Install the required tools:

```bash
brew install python3 git make
```

</SyncedTabItem>
<SyncedTabItem value="Windows">

:::info
Use Windows 10 or 11.
:::

:::warning
Use **CMD** or **PowerShell** only. Do not use Git Bash, MSYS2, or other Linux-like terminals; they are not supported.
:::

Download, install, and add to your PATH (then restart the computer so the commands are available):

- **Python** 3.8 or later: [Download](https://www.python.org/downloads/windows/)
- **Git** 2.0 or later: [Download](https://git-scm.com/downloads/win)
- **Make** 3.0 or later: [Download](https://gnuwin32.sourceforge.net/packages/make.htm)

</SyncedTabItem>
</SyncedTabs>

### 2. Clone the repo and activate the build environment

:::info
You can increase Git buffer size for large clones:

```bash
git config --global http.postBuffer 524288000
```

:::

:::warning
Use a project path **without** spaces or non-ASCII characters. On Windows, avoid using the C: drive root.
:::

```bash
git clone https://github.com/tuya/DuckyClaw.git
cd DuckyClaw
git submodule update --init
```

Activate the TuyaOpen build environment so `tos.py` is available:

:::warning
You must run the activation command again in each new terminal session.
:::

<SyncedTabs
  defaultValue="Linux"
  values={[
    { label: 'Linux', value: 'Linux' },
    { label: 'Mac', value: 'Mac' },
    { label: 'Windows', value: 'Windows' },
  ]}
>
<SyncedTabItem value="Linux">

```bash
. ./TuyaOpen/export.sh
```

</SyncedTabItem>
<SyncedTabItem value="Mac">

```bash
. ./TuyaOpen/export.sh
```

</SyncedTabItem>
<SyncedTabItem value="Windows">

```bash
.\TuyaOpen\export.ps1
```

For PowerShell, you may need to run first: `Set-ExecutionPolicy RemoteSigned -Scope LocalMachine`.

For CMD use: `.\TuyaOpen\export.bat`

</SyncedTabItem>
</SyncedTabs>

Verify the environment:

```bash
tos.py version
tos.py check
```

You should see version output (e.g. `v1.3.0`) and a list of tools (git, cmake, make, ninja) with OK status. Submodules will be downloaded if needed.

### 3. Select the board configuration

Run the config chooser from the project root:

```bash
cd ..
tos.py config choice
```

Enter **1** to select **ESP32S3_BREAD_COMPACT_WIFI**:

```text
--------------------
1. ESP32S3_BREAD_COMPACT_WIFI.config
2. RaspberryPi.config
3. TUYA_T5AI_BOARD_LCD_3.5_CAMERA.config
--------------------
Input "q" to exit.
Choice config file: 1
```

### 4. Edit application configuration

Open `DuckyClaw/include/tuya_app_config.h` and set the following.

**LLM / Tuya Cloud** (required for cloud and AI):

- `TUYA_PRODUCT_ID` — your product ID (PID); this is the binding key between the device and cloud configurations.
- `TUYA_OPENSDK_UUID` — Open SDK UUID.
- `TUYA_OPENSDK_AUTHKEY` — Open SDK AuthKey.

Replace the placeholder values. Obtain:

- **PID**: [Tuya product / PID](https://pbt.tuya.com/s?p=dd46368ae3840e54f018b2c45dc1550b&u=c38c8fc0a5d14c4f66cae9f0cfcb2a24&t=2).
- **UUID and AuthKey**: [Tuya IoT Platform – Open SDK purchase](https://platform.tuya.com/purchase/index?type=6).

**IM / app channel** (optional): Set your messaging channel and credentials (Feishu, Telegram, or Discord) in the same file as needed.

### 5. Build and flash

Build the project:

```bash
tos.py build
```

After a successful build, flash the firmware to the board:

```bash
tos.py flash
```

Connect to the serial console to view logs:

```bash
tos.py monitor
```
du
**Expected outcome:** The firmware builds without errors, flashes to the ESP32-S3, and the device boots. Use the serial monitor to confirm startup and, if configured, cloud connectivity.

### 6. Device activation and network setup

To use Tuya Cloud features, add the device in the **Smart Life** app and complete Wi‑Fi provisioning.

#### Download the Smart Life app

Install **Smart Life** (智能生活) from the Apple App Store or your Android app store, or scan the QR code on the [Tuya Smart Life app page](https://images.tuyacn.com/fe-static/docs/img/48b9e225-aa49-4e95-9d61-511bb7df27c8.png).

#### Confirm device is in provisioning mode

Before adding the device in the app, ensure it is in activation (provisioning) mode. In the serial log you should see lines similar to (TuyaOpen):

```text
[01-01 00:00:01 ty D][tuya_iot.c:774] STATE_START
[01-01 00:00:01 ty I][tuya_iot.c:792] Activation data read fail, go activation mode...
[01-01 00:00:01 ty D][tuya_main.c:143] Tuya Event ID:1(TUYA_EVENT_BIND_START)
```

#### Add the device in the app

1. In the Smart Life app, tap **Add device** (or the **+** button) to open the add-device flow.
2. Grant the app **Wi‑Fi** and **Bluetooth** permissions when prompted; otherwise the app cannot discover the device.
3. Follow the in-app steps to connect the device to your Wi‑Fi network.
4. On the **Home** or **Add device** screen, when the device appears, tap **Add** and complete the guided setup.

:::warning
TuyaOpen-supported modules connect only to **2.4 GHz** Wi‑Fi. Using a 5 GHz network will cause provisioning to fail.
:::

## Troubleshooting

### Device not discovered or provisioning fails due to invalid authorization

If authorization data was not written correctly, the device may log errors such as:

```text
[01-01 00:00:00 ty E][tal_kv.c:269] lfs open UUID_TUYAOPEN -2 err
[01-01 00:00:00 ty E][tuya_authorize.c:107] Authorization read failure.
[01-01 00:00:00 ty W][tuya_main.c:288] Replace the TUYA_OPENSDK_UUID and TUYA_OPENSDK_AUTHKEY contents...
```

If the log shows `uuid` and `authkey` as placeholder values (e.g. `uuidxxxxxxxxxxxxxxxx`), the license (UUID and AuthKey) was not applied correctly. Obtain or purchase a TuyaOpen license at [Tuya IoT Platform – Open SDK](https://platform.tuya.com/purchase/index?type=6) and set `TUYA_OPENSDK_UUID` and `TUYA_OPENSDK_AUTHKEY` in `tuya_app_config.h`, then rebuild and reflash.

If `productkey` (PID) appears as placeholders, the product ID was not set. Copy or create a product and get your PID from the [Tuya product link](https://pbt.tuya.com/s?p=dd46368ae3840e54f018b2c45dc1550b&u=c38c8fc0a5d14c4f66cae9f0cfcb2a24&t=2), then set `TUYA_PRODUCT_ID` in `tuya_app_config.h`, rebuild, and reflash.


## References

- [DuckyClaw Overview](/duckyclaw)
- [Quick Start – Environment setup](quick-start/enviroment-setup)
- [Custom Device MCP (hardware skills)](custom-device-mcp)
- [DuckyClaw repository](https://github.com/tuya/DuckyClaw) (external)
