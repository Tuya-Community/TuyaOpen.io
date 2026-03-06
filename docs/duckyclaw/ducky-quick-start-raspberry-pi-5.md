---
title: DuckyClaw with Raspberry Pi 4/5
---

import { SyncedTabs, SyncedTabItem } from '@site/src/components/SyncedTabs';

# DuckyClaw Quick Start (Raspberry Pi 5)

This guide walks you through building and running DuckyClaw on a Raspberry Pi 5. The Pi is a Linux host target: you build an executable (no firmware flashing). It is for developers who want to run DuckyClaw on Raspberry Pi 5 and connect the device to Tuya Cloud via the Smart Life app.

## Prerequisites

- None beyond the [Quick Start](/docs/quick-start/index) overview. Basic familiarity with a terminal and Git is helpful.

## Requirements

- **Raspberry Pi 5** and power adapter.
- **Computer** running Windows 10/11, Linux (e.g. Ubuntu 20/22/24 LTS), or macOS (for building; cross-compile is Linux-only).
- **Tuya Cloud**: This demo uses Tuya Cloud services. You need a valid [license key (authorization code)](/docs/quick-start/equipment-authorization) and correct PID, UUID, and AuthKey in `tuya_app_config.h` for cloud and LLM features.

:::note
If your Raspberry Pi has microphone and speaker support (e.g. USB mic/speaker), **ASR** (Automatic Speech Recognition) is enabled as the default input method and can coexist with IM (messaging apps).
:::

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

You should see version output and a list of tools (git, cmake, make, ninja) with OK status. Submodules will be downloaded if needed.

### 3. Select the board configuration

Run the config chooser from the project root:

```bash
cd ..
tos.py config choice
```

Enter **2** to select **RaspberryPi.config**:

```text
--------------------
1. ESP32S3_BREAD_COMPACT_WIFI.config
2. RaspberryPi.config
3. TUYA_T5AI_BOARD_LCD_3.5_CAMERA.config
--------------------
Input "q" to exit.
Choice config file: 2
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

**IM configuration** (optional): To receive DuckyClaw notifications or interact via a messaging app, set the channel to `feishu`, `telegram`, or `discord` and fill in the corresponding credentials in `tuya_app_config.h`:

```c
// IM configuration
// feishu | telegram | discord
#define IM_SECRET_CHANNEL_MODE      "feishu"

#define IM_SECRET_FS_APP_ID         ""
#define IM_SECRET_FS_APP_SECRET     ""

#define IM_SECRET_DC_TOKEN          ""
#define IM_SECRET_DC_CHANNEL_ID     ""

#define IM_SECRET_TG_TOKEN          ""
```

- For **Feishu**: set `IM_SECRET_CHANNEL_MODE` to `"feishu"` and fill `IM_SECRET_FS_APP_ID` and `IM_SECRET_FS_APP_SECRET`.
- For **Discord**: set `IM_SECRET_CHANNEL_MODE` to `"discord"` and fill `IM_SECRET_DC_TOKEN` and `IM_SECRET_DC_CHANNEL_ID`.
- For **Telegram**: set `IM_SECRET_CHANNEL_MODE` to `"telegram"` and fill `IM_SECRET_TG_TOKEN`.

:::tip
**Configure IM at runtime via CLI**  
You can also configure IM without editing the header: after the program is running, press Enter to enter the `tuya>` shell, then use the IM commands (run `im_help` for usage):

```text
tuya> im_help
tuya> im_set_channel_mode <telegram|discord|feishu>
tuya> im_set_fs_appid <app_id>
tuya> im_set_fs_appsecret <app_secret>
tuya> im_set_dc_token <token>
tuya> im_set_dc_channel <channel_id>
tuya> im_set_tg_token <token>
```
:::

### 5. Build and run

Raspberry Pi is a Linux host target: there is **no flashing**. The build produces an executable in `dist/`. You can build locally on the Pi or cross-compile on a Linux PC.

:::info
**Build options:** **Local build** — build and run directly on the Raspberry Pi (recommended). **Cross-compile** — build on a Linux PC, then copy the binary to the Pi. macOS does not support cross-compile; use a Linux host or build on the Pi.
:::

Build (with `RaspberryPi.config` selected):

```bash
tos.py build
```

**If you built on the Pi:** go to the next step. **If you cross-compiled on a PC:** copy the built artifact to the Pi. The exact path under `dist/` depends on your project version (e.g. `dist/DuckyClaw_1.0.1/DuckyClaw_1.0.1.elf`). Example:

```bash
scp -r dist/DuckyClaw_* username@<pi-ip>:~/
```

Replace `username` with your Pi user and `<pi-ip>` with the Pi’s IP address.

**Run on the Raspberry Pi:**

```bash
./DuckyClaw_1.0.1.elf
```

(Use the actual binary name from your `dist/` folder.)

**Expected outcome:** The build succeeds, the executable runs on the Pi, and the device enters activation mode so you can add it in the Smart Life app.

### 6. Device activation and network setup

To use Tuya Cloud features, add the device in the **Smart Life** app.

#### Download the Smart Life app

Install **Smart Life** (智能生活) from the Apple App Store or your Android app store, or scan the QR code on the [Tuya Smart Life app page](https://images.tuyacn.com/fe-static/docs/img/48b9e225-aa49-4e95-9d61-511bb7df27c8.png).

#### Confirm device is in provisioning mode

Before adding the device, ensure it is in activation (provisioning) mode. In the terminal or log you should see lines similar to:

```text
[01-01 00:00:01 ty D][tuya_iot.c:774] STATE_START
[01-01 00:00:01 ty I][tuya_iot.c:792] Activation data read fail, go activation mode...
[01-01 00:00:01 ty D][tuya_main.c:143] Tuya Event ID:1(TUYA_EVENT_BIND_START)
```

#### Add the device: QR code (Linux / Raspberry Pi)

Many TuyaOpen Linux targets (including Raspberry Pi) support **scan-to-provision**: the device shows a QR code in the terminal, and you scan it with the Smart Life app.

1. Ensure the device is in provisioning mode and the QR code is visible in the terminal/log.
2. Open the **Smart Life** app and tap the **+** (Add device) on the home screen.
3. Choose **Scan** and scan the QR code shown by the device.
4. Follow the in-app steps to complete binding and network setup.

![Smart Life app scan to add device](https://images.tuyacn.com/fe-static/docs/img/5971b072-a264-4324-ba3f-a90f8b899ddd.png)

Alternatively, add the device via the normal add-device flow (grant Wi‑Fi and Bluetooth permissions, then discover and add the device). TuyaOpen-supported modules connect only to **2.4 GHz** Wi‑Fi.

## Troubleshooting

### Device not discovered or provisioning fails due to invalid authorization

If authorization data was not written correctly, the device may log errors such as:

```text
[01-01 00:00:00 ty E][tal_kv.c:269] lfs open UUID_TUYAOPEN -2 err
[01-01 00:00:00 ty E][tuya_authorize.c:107] Authorization read failure.
[01-01 00:00:00 ty W][tuya_main.c:288] Replace the TUYA_OPENSDK_UUID and TUYA_OPENSDK_AUTHKEY contents...
```

If the log shows `uuid` and `authkey` as placeholder values, the license (UUID and AuthKey) was not applied correctly. Obtain or purchase a TuyaOpen license at [Tuya IoT Platform – Open SDK](https://platform.tuya.com/purchase/index?type=6) and set `TUYA_OPENSDK_UUID` and `TUYA_OPENSDK_AUTHKEY` in `tuya_app_config.h`, then rebuild and rerun.

If `productkey` (PID) appears as placeholders, the product ID was not set. Copy or create a product and get your PID from the [Tuya product link](https://pbt.tuya.com/s?p=dd46368ae3840e54f018b2c45dc1550b&u=c38c8fc0a5d14c4f66cae9f0cfcb2a24&t=2), then set `TUYA_PRODUCT_ID` in `tuya_app_config.h`, rebuild, and rerun.

## References

- [DuckyClaw Overview](/duckyclaw)
- [Quick Start – Environment setup](/docs/quick-start/enviroment-setup)
- [Quick Start – Equipment authorization](/docs/quick-start/equipment-authorization)
- [Custom Device MCP (hardware skills)](/docs/duckyclaw/custom-device-mcp)
- [DuckyClaw repository](https://github.com/tuya/DuckyClaw) (external)
