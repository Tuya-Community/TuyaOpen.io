---
title: Introduction to tyutool Tool
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview

tyutool is a flashing and authorization tool provided for the TuyaOpen project. The tyutool tool comes in two versions: GUI and CLI. The GUI version provides a graphical interface, while the CLI version provides a command-line interface.

:::danger
The authorization function of tyutool is only applicable to the TuyaOpen project and does not support the TuyaOS project. The authorization code for the TuyaOpen project is only valid for TuyaOpen, and the authorization code for the TuyaOS project is only valid for TuyaOS. The two are not interchangeable.
:::

the tyutool tool supports Windows, Linux, and macOS. Developers can choose the appropriate version according to their operating system.

tyutool is currently available in two versions, **V2** and **V3**, with the following key differences:

- **V3** (latest): Completely rewritten with a **Rust (Tauri 2) + Vue 3** architecture for better cross-platform compatibility. **Recommended for Mac users.** Audio debugging and batch flashing are not yet supported.
- **V2**: Original architecture with full feature support, including audio debugging and batch flashing.

:::note
V3 does not yet support audio debugging and batch flashing from V2. If you need these features, please download V2.
:::

| Platform | Source (Recommended) |
| :------: | :------: |
| Github | [github-source](https://github.com/tuya/tyutool) |
| Gitee | [gitee-source](https://gitee.com/tuya-open/tyutool) |

Release download links by version:

| Version | Github |
| :--: | :--: |
| V3 (Recommended for Mac) | [v3.0.8](https://github.com/tuya/tyutool/releases/tag/v3.0.8) |
| V2 | [v2.3.2](https://github.com/tuya/tyutool/releases/tag/v2.3.2) |

**V3 recommended downloads by platform** (`x.x.x` in filenames is the version number — check [Releases](https://github.com/tuya/tyutool/releases/latest) for the latest version)

| Platform | Recommended File | Auto-update | Notes |
| :-- | :-- | :--: | :-- |
| Windows x86_64 | ★ `tyutool-gui_windows_x86_64_nsis_x.x.x.exe` | ✅ | NSIS installer |
| Windows x86_64 | `tyutool-gui_windows_x86_64_portable_x.x.x.zip` | ❌ | Portable, no install needed |
| macOS Universal | ★ `tyutool-gui_macos_universal_dmg_x.x.x.dmg` | ✅ | DMG installer |
| macOS Universal | `tyutool-gui_macos_universal_portable_x.x.x.tar.gz` | ❌ | Extract and run |
| Linux x86_64 | ★ `tyutool-gui_linux_x86_64_appimage_x.x.x.AppImage` | ✅ | Run after `chmod +x`, cross-distro |
| Linux aarch64 | ★ `tyutool-gui_linux_aarch64_appimage_x.x.x.AppImage` | ✅ | Run after `chmod +x`, cross-distro |
| Linux x86_64 | `tyutool-gui_linux_x86_64_deb_x.x.x.deb` / `_rpm_x.x.x.rpm` | ❌ | Debian / Fedora·RHEL |
| Linux aarch64 | `tyutool-gui_linux_aarch64_deb_x.x.x.deb` | ❌ | Debian-based |
| Linux x86_64 / aarch64 | `tyutool-gui_linux_*_portable_x.x.x.tar.gz` | ❌ | Extract and run |

:::note
The `tos.py flash` command ultimately calls the tyutool_cli tool. The tyutool_gui tool is a graphical interface built on top of tyutool_cli.
:::

The following will introduce the usage instructions for flashing and authorization with the tyutool_gui tool.

## Firmware Flashing

After opening tyutool_gui, the interface is displayed as follows:

<img src="https://images.tuyacn.com/fe-static/docs/img/2435baae-cdd9-4261-9d68-2813cea93105.png" alt="tyutools_flash" width="550" />

 + ① Select the chip/module model to be flashed
 + ② Click Browse to select the firmware file to be flashed (the bin file containing `_QIO`)
 + ③ Click Rescan to scan device ports, then select the device port to be flashed
 + ④ Click Start to begin flashing the firmware

After the firmware is successfully flashed, the following log output will appear:

```
[INFO]: Write Start.
[INFO]: Waiting Reset ...
[INFO]: unprotect flash OK.
[INFO]: sync baudrate 921600 success
[INFO]: Erase flash success
[INFO]: Write flash success
[INFO]: CRC check success
[INFO]: Reboot done
```

:::tip
The default baud rate for flashing is 921600. If you find the flashing speed too slow, you can increase the baud rate appropriately. However, increasing the baud rate may cause the firmware flashing to fail.
:::

## Device Authorization Information Writing

When you need to use the functions of the Tuya IoT platform, you must first authorize the device. You can use the tyutool_gui tool for device authorization. The following are the specific operation steps.

After opening the tyutool_gui tool, click the `Serial` tab. The interface is as follows:

<img src="https://images.tuyacn.com/fe-static/docs/img/563acc7d-28b2-495c-9dcb-4dfefa1e6c39.png" alt="tyutools_serial" width="550" />

 + ① Click the `Serial` tab
 + ② Click `COM` to scan device ports
 + ③ Select the device port to be authorized
 + ④ Click `Start` to connect the device

:::tip
The authorization UART and the flashing UART are the same. Keep the UART default configuration (baud rate: 115200, data bits: 8, stop bits: 1, parity: none).
:::

After the device serial port is successfully connected, the `Authorize` button will become available. Click the `Authorize` button to pop up the following interface:

<img src="https://images.tuyacn.com/fe-static/docs/img/f1f18bee-808e-4368-97ff-9564eed0c4bc.png" alt="tyutools_authorize" width="550" />

 + ② Enter the `UUID` in the authorization information
 + ③ Enter the `AuthKey` in the authorization information
 + ④ Click the `Authorize` button to authorize the device

:::info
The TuyaOpen `UUID` and `AuthKey` can be obtained from the [Tuya IoT Platform](https://platform.tuya.com/purchase/index?type=6) or purchased from [Tuya's official Taobao store](https://item.taobao.com/item.htm?ft=t&id=911596682625&spm=a21dvs.23580594.0.0.621e2c1bzX1OIP).
:::

After successful authorization, you can use the `auth-read` command to verify:

![auth-read](/img/tyutool/auth-read.png)

## Frequently Asked Questions

### Always fails during `write` in the burning process

For the CH34x series, you can try installing or updating the driver.

**Windows**: https://www.wch.cn/downloads/ch343ser_exe.html

**Mac**: https://www.wch.cn/downloads/CH34XSER_MAC_ZIP.html

After installing the driver on Mac, you need to allow the driver to load in **Security Settings**.

If the driver is installed successfully, the CH34x device will be recognized with a name starting with `cu.wchusb`. Otherwise, the driver installation was not successful.

<Tabs>
  <TabItem value="13" label="MacOS 13" default>

On **MacOS 13**, operate in "Privacy & Security".

![MacOS 13](/img/tyutool/macos13.png)

  </TabItem>
  <TabItem value="15" label="MacOS 15">

On **MacOS 15**, search for "login" in "Settings" to proceed.

![MacOS 15](/img/tyutool/macos15.png)
  </TabItem>
</Tabs>