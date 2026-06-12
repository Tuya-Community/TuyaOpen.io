---
title: GUI - tyutool 图形化工具
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 概述

tyutool 是为 TuyaOpen 项目提供的一个烧录授权工具。tyutool 工具分为 GUI 和 CLI 两种版本，GUI 版本提供了图形化界面，CLI 版本提供了命令行界面。

:::danger
tyutool 的授权功能仅适用于 TuyaOpen 项目，不支持 TuyaOS 项目。TuyaOpen 项目的授权码仅适用于 TuyaOpen 项目，TuyaOS 项目的授权码仅适用于 TuyaOS 项目，两者不可混用。
:::

tyutool 工具支持 Windows、Linux 和 macOS 三大操作系统，开发者可以根据自己的操作系统选择对应的版本。

tyutool 目前分为 **V2** 和 **V3** 两个版本，主要差异如下：

- **V3**（当前最新版本）：基于 **Rust（Tauri 2）+ Vue 3** 全新架构重写，跨平台兼容性更好，**推荐 Mac 用户使用**；暂不支持音频调试和批量烧录功能
- **V2**：原有架构，功能更为完整，支持音频调试、批量烧录等高级功能

:::note
V3 版本暂不支持 V2 中的音频调试和批量烧录功能，如需使用这些功能请下载 V2 版本。
:::

| 平台 | 源码使用(推荐) |
| :------: | :------: |
| Github | [github-source](https://github.com/tuya/tyutool) |
| Gitee | [gitee-source](https://gitee.com/tuya-open/tyutool) |

各版本发布包下载地址：

| 版本 | Github |
| :--: | :--: |
| V3（推荐 Mac） | [v3.0.8](https://github.com/tuya/tyutool/releases/tag/v3.0.8) |
| V2 | [v2.3.2](https://github.com/tuya/tyutool/releases/tag/v2.3.2) |

**V3 各平台推荐下载**（文件名中 `x.x.x` 为版本号，请从 [Releases](https://github.com/tuya/tyutool/releases/latest) 获取最新版本）

| 平台 | 推荐文件 | 自动更新 | 说明 |
| :-- | :-- | :--: | :-- |
| Windows x86_64 | ★ `tyutool-gui_windows_x86_64_nsis_x.x.x.exe` | ✅ | NSIS 安装包 |
| Windows x86_64 | `tyutool-gui_windows_x86_64_portable_x.x.x.zip` | ❌ | 免安装便携版 |
| macOS Universal | ★ `tyutool-gui_macos_universal_dmg_x.x.x.dmg` | ✅ | DMG 安装包 |
| macOS Universal | `tyutool-gui_macos_universal_portable_x.x.x.tar.gz` | ❌ | 解压即用 |
| Linux x86_64 | ★ `tyutool-gui_linux_x86_64_appimage_x.x.x.AppImage` | ✅ | `chmod +x` 后运行，跨发行版 |
| Linux aarch64 | ★ `tyutool-gui_linux_aarch64_appimage_x.x.x.AppImage` | ✅ | `chmod +x` 后运行，跨发行版 |
| Linux x86_64 | `tyutool-gui_linux_x86_64_deb_x.x.x.deb` / `_rpm_x.x.x.rpm` | ❌ | Debian 系 / Fedora·RHEL 系 |
| Linux aarch64 | `tyutool-gui_linux_aarch64_deb_x.x.x.deb` | ❌ | Debian 系 |
| Linux x86_64 / aarch64 | `tyutool-gui_linux_*_portable_x.x.x.tar.gz` | ❌ | 解压即用 |

:::note
`tos.py flash` 命令最终调用的也是 tyutool_cli 工具，tyutool_gui 工具是基于 tyutool_cli 添加了图形化界面。
:::

接下来将会为大家介绍 tyutool_gui 工具的烧录和授权使用说明。

## 固件烧录

tyutool_gui 打开后界面如下显示：

<img src="https://images.tuyacn.com/fe-static/docs/img/f7228dbc-4e98-49c7-b292-943d5581b2af.png" alt="tyutools_flash" width="550" />

 + ① 选择要烧录的芯片
 + ② 点击 `浏览` 选择要烧录的固件文件（包含 `_QIO` 字样的 bin 文件）
 + ③ 选择设备烧录端口（涂鸦官方开发板和部分生态伙伴开发板鼠标放到串口上可以给出烧录授权串口或者日志串口的提示）
 + ④ 点击 `开始烧录`

:::tip
烧录波特率默认使用 921600，如果您感觉烧录速度过慢，可以适当调高波特率，但是调高波特率可能会导致固件烧录失败。
:::

## 设备授权信息写入

当需要使用到 Tuya IoT 平台的功能时，需要先对设备进行授权。可以通过 tyutool_gui 工具进行设备授权，接下来将为大家介绍具体操作步骤。

打开 tyutool_gui 工具后，点击 授权 选项卡，界面如下所示：

<img src="https://images.tuyacn.com/fe-static/docs/img/4ab4ec31-811b-4a39-a33c-e35bf6154038.png" alt="tyutools_auth" width="550" />

 + ① 点击 `授权` 选项卡
 + ② 选择授权串口
 + ③ 选择授权波特率
 + ④ 填入 `UUID` 和 `AuthKey`
 + ⑤ 点击 `开始授权`

:::tip
授权 UART 和烧录 UART 为同一个，UART 保持默认配置即可（波特率：115200，数据位：8，停止位：1，校验位：无）。
:::

:::info
TuyaOpen `UUID` 和 `AuthKey` 可以在 [Tuya IoT 平台](https://platform.tuya.com/purchase/index?type=6) 或在 [淘宝浙江涂鸦智能的小店](https://item.taobao.com/item.htm?ft=t&id=911596682625&spm=a21dvs.23580594.0.0.621e2c1bzX1OIP) 购买获取。
:::

## 常见问题

### 烧录过程中总是在`write`时失败

对于 CH34x 系列可以尝试安装或更新驱动

**Windows**：https://www.wch.cn/downloads/ch343ser_exe.html

**Mac**：https://www.wch.cn/downloads/CH34XSER_MAC_ZIP.html

在`Mac`中安装驱动后，需要在**安全设置**中`允许驱动加载`

若驱动安装成功，CH34x 被识别到的名称会以 `cu.wchusb` 开头，否则驱动未安装成功

<Tabs>
  <TabItem value="13" label="MacOS 13" default>

在**MacOS 13**中在`隐私与安全性`中操作

![MacOS 13](/img/tyutool/macos13.png)

  </TabItem>
  <TabItem value="15" label="MacOS 15">

在**MacOS 15**中`设置`中搜索`login`，操作

![MacOS 15](/img/tyutool/macos15.png)
  </TabItem>
</Tabs>