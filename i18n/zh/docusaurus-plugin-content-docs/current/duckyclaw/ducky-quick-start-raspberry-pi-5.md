---
title: DuckyClaw 与 Raspberry Pi 5
---

import { SyncedTabs, SyncedTabItem } from '@site/src/components/SyncedTabs';

# DuckyClaw 快速开始（Raspberry Pi 5）

本文介绍如何在 Raspberry Pi 5 上构建并运行 DuckyClaw。树莓派属于 Linux 主机目标，无需烧录固件，构建产物为可执行文件。面向希望在 Raspberry Pi 5 上运行 DuckyClaw 并通过智能生活 App 连接 Tuya Cloud 的开发者。

## 前置条件

- 无额外要求，了解 [快速开始](/docs/quick-start/index) 即可。具备终端与 Git 的基本使用经验更佳。

## 硬件与软件要求

- **Raspberry Pi 5** 及电源适配器。
- **电脑**：Windows 10/11、Linux（如 Ubuntu 20/22/24 LTS）或 macOS（用于构建；交叉编译仅支持 Linux）。
- **Tuya Cloud**：本示例使用 Tuya 云服务。需具备有效的[授权码](/docs/quick-start/equipment-authorization)，并在 `tuya_app_config.h` 中填写正确的 PID、UUID、AuthKey，以使用云与 LLM 功能。

:::note
若 Raspberry Pi 支持麦克风与扬声器（如 USB 麦克风/扬声器），则 **ASR**（语音识别）为默认启用的输入方式，并且能与消息软件 IM 共存。
:::

## 操作步骤

### 1. 安装构建工具（Python、Make、Git）

在主机上安装所需工具。

<SyncedTabs
  defaultValue="Linux"
  values={[
    { label: 'Ubuntu 与 Debian', value: 'Linux' },
    { label: 'Mac', value: 'Mac' },
    { label: 'Windows', value: 'Windows' },
  ]}
>
<SyncedTabItem value="Linux">

:::info
推荐使用 Ubuntu 20/22/24 LTS。
:::

安装依赖包：

```bash
sudo apt-get install lcov cmake-curses-gui build-essential ninja-build wget git python3 python3-pip python3-venv libc6-i386 libsystemd-dev
```

</SyncedTabItem>
<SyncedTabItem value="Mac">

:::info
推荐使用 Homebrew 安装上述工具。
:::

Mac 自带工具可能较旧。可先安装 Homebrew 并升级 bash，再安装构建工具：

<details>
<summary>安装 Homebrew 并升级 bash（可选）</summary>

```bash
# 安装 Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装 bash
brew install bash

# 将 bash 加入可用 shell 列表
echo "/usr/local/bin/bash" | sudo tee -a /etc/shells

# 将当前用户默认 shell 设为新 bash
chsh -s /usr/local/bin/bash
```

</details>

安装所需工具：

```bash
brew install python3 git make
```

</SyncedTabItem>
<SyncedTabItem value="Windows">

:::info
请使用 Windows 10 或 11。
:::

:::warning
请仅使用 **CMD** 或 **PowerShell**。不要使用 Git Bash、MSYS2 等仿 Linux 终端，当前不支持。
:::

下载并安装下列工具，加入系统 PATH，并重启电脑以使命令生效：

- **Python** 3.8 或更高：[下载](https://www.python.org/downloads/windows/)
- **Git** 2.0 或更高：[下载](https://git-scm.com/downloads/win)
- **Make** 3.0 或更高：[下载](https://gnuwin32.sourceforge.net/packages/make.htm)

</SyncedTabItem>
</SyncedTabs>

### 2. 克隆仓库

:::info
可适当增大 Git 缓冲区以加速克隆：

```bash
git config --global http.postBuffer 524288000
git clone https://github.com/tuya/DuckyClaw.git
```

:::

:::warning
项目路径请勿包含空格或非 ASCII 字符；Windows 下请勿放在 C 盘根目录。
:::

### 3. 激活构建环境

```bash
cd DuckyClaw
git submodule update --init
```

激活 TuyaOpen 构建环境，使 `tos.py` 可用：

:::warning
每次新开终端后均需重新执行激活命令。
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

PowerShell 下如需先执行：`Set-ExecutionPolicy RemoteSigned -Scope LocalMachine`。

CMD 下使用：`.\TuyaOpen\export.bat`

</SyncedTabItem>
</SyncedTabs>

验证环境：

```bash
tos.py version
tos.py check
```

应能看到版本号以及各工具（git、cmake、make、ninja）检查通过。如有需要会自动拉取子模块。

### 4. 选择开发板配置

在项目根目录执行配置选择：

```bash
cd ..
tos.py config choice
```

输入 **2** 选择 **RaspberryPi.config**：

```text
--------------------
1. ESP32S3_BREAD_COMPACT_WIFI.config
2. RaspberryPi.config
3. TUYA_T5AI_BOARD_LCD_3.5_CAMERA.config
--------------------
Input "q" to exit.
Choice config file: 2
```

### 5. 修改应用配置

打开 `DuckyClaw/include/tuya_app_config.h`，设置以下项。

**LLM / Tuya Cloud**（使用云与 AI 必填）：

- `TUYA_PRODUCT_ID`：产品 ID（PID），为设备与云平台配置的绑定键。
- `TUYA_OPENSDK_UUID`：Open SDK UUID。
- `TUYA_OPENSDK_AUTHKEY`：Open SDK AuthKey。

将占位符替换为真实值。获取方式：

- **PID**：[Tuya 产品 / PID](https://pbt.tuya.com/s?p=dd46368ae3840e54f018b2c45dc1550b&u=c38c8fc0a5d14c4f66cae9f0cfcb2a24&t=2)。
- **UUID 与 AuthKey**：[Tuya IoT 平台 – Open SDK 采购](https://platform.tuya.com/purchase/index?type=6)。

**IM 配置**（可选）：若需通过即时通讯应用接收 DuckyClaw 通知或与设备交互，请在 `tuya_app_config.h` 中将通道设为 `feishu`、`telegram` 或 `discord`，并填写对应凭证：

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

- **Feishu**：将 `IM_SECRET_CHANNEL_MODE` 设为 `"feishu"`，并填写 `IM_SECRET_FS_APP_ID`、`IM_SECRET_FS_APP_SECRET`。
- **Discord**：将 `IM_SECRET_CHANNEL_MODE` 设为 `"discord"`，并填写 `IM_SECRET_DC_TOKEN`、`IM_SECRET_DC_CHANNEL_ID`。
- **Telegram**：将 `IM_SECRET_CHANNEL_MODE` 设为 `"telegram"`，并填写 `IM_SECRET_TG_TOKEN`。

:::tip
**运行时通过 CLI 配置 IM**  
若不想修改头文件，可在程序运行后按回车进入 `tuya>` 交互界面，使用 IM 相关命令（`im_help` 查看用法）：

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

### 6. 编译与运行

树莓派属于 Linux 主机平台，**无需烧录**。编译成功后会在 `dist/` 目录生成可执行文件，可本地在树莓派上编译运行，或在 PC（Linux）上交叉编译后传到树莓派运行。

:::info
**编译方式**：**本地编译** — 直接在树莓派上编译并运行（推荐）。**交叉编译** — 在 PC（Linux）上编译，再将产物传到树莓派运行。macOS 不支持交叉编译，请使用 Linux 主机或在树莓派上本地编译。
:::

在已选择 `RaspberryPi.config` 的前提下编译：

```bash
tos.py build
```

**若在树莓派上构建**：直接在树莓派上执行下一步。**若在 PC 上交叉编译**：将 `dist/` 下生成的产物复制到树莓派，例如：

```bash
scp -r dist/DuckyClaw_* username@<树莓派 IP>:~/
```

将 `username` 换为树莓派用户名，`<树莓派 IP>` 换为树莓派 IP 地址。

**在树莓派上运行：**

```bash
./DuckyClaw_1.0.1.elf
```

（请根据 `dist/` 下实际生成的二进制名称执行。）

**预期结果**：编译通过，在树莓派上运行可执行文件后设备进入配网状态，可在智能生活 App 中添加设备。

### 7. 设备激活与配网

使用 Tuya Cloud 功能前，需在 **智能生活** App 中添加设备。

#### 下载智能生活 App

从苹果 App Store 或各大安卓应用市场搜索 **智能生活** 下载，或扫描 [Tuya 智能生活 App 页面](https://images.tuyacn.com/fe-static/docs/img/48b9e225-aa49-4e95-9d61-511bb7df27c8.png) 上的二维码。

#### 确认设备处于配网状态

在 App 中添加设备前，请确认设备已进入配网（激活）模式。终端或日志中可见类似输出：

```text
[01-01 00:00:01 ty D][tuya_iot.c:774] STATE_START
[01-01 00:00:01 ty I][tuya_iot.c:792] Activation data read fail, go activation mode...
[01-01 00:00:01 ty D][tuya_main.c:143] Tuya Event ID:1(TUYA_EVENT_BIND_START)
```

#### 扫码配网（Linux / 树莓派）

部分 TuyaOpen Linux 设备（如树莓派）支持 **扫码配网**：设备在终端输出二维码，使用智能生活 App 扫码即可添加。

1. 确保设备已进入配网状态，并在终端/日志中显示二维码。
2. 打开 **智能生活** App，在首页点击右上角 **+**。
3. 选择 **扫一扫**，对准设备输出的二维码。
4. 按 App 页面引导完成绑定与配网。

![智能生活 App 扫码添加设备](https://images.tuyacn.com/fe-static/docs/img/5971b072-a264-4324-ba3f-a90f8b899ddd.png)

也可通过常规添加设备流程（授予 Wi‑Fi、蓝牙权限后发现并添加设备）完成。当前 TuyaOpen 支持的模组仅支持 **2.4 GHz** Wi‑Fi。

## 常见问题

### 授权信息错误导致无法发现设备或配网失败

若授权数据未正确写入，设备可能打印类似日志：

  ```
  [01-01 00:00:00 ty E][tal_kv.c:269] lfs open UUID_TUYAOPEN -2 err
  [01-01 00:00:00 ty E][tuya_authorize.c:107] Authorization read failure.
  [01-01 00:00:00 ty W][tuya_main.c:288] Replace the TUYA_OPENSDK_UUID and TUYA_OPENSDK_AUTHKEY contents, otherwise the demo cannot work.
                  Visit https://platform.tuya.com/purchase/index?type=6 to get the open-sdk uuid and authkey.
  [01-01 00:00:00 ty I][tuya_iot.c:538] tuya_iot_init
  [01-01 00:00:00 ty D][tuya_iot.c:555] software_ver:1.0.1
  [01-01 00:00:00 ty D][tuya_iot.c:556] productkey:xxxxxxxxxxxxxxxx
  [01-01 00:00:00 ty D][tuya_iot.c:557] uuid:uuidxxxxxxxxxxxxxxxx
  [01-01 00:00:00 ty D][tuya_iot.c:558] authkey:keyxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  ```

若日志中 `uuid`、`authkey` 仍为占位符，说明授权码未正确写入。请前往 [Tuya IoT 平台 – Open SDK](https://platform.tuya.com/purchase/index?type=6) 获取或购买 TuyaOpen 授权码，在 `tuya_app_config.h` 中正确设置 `TUYA_OPENSDK_UUID` 与 `TUYA_OPENSDK_AUTHKEY`，重新编译并运行。

若 `productkey`（PID）为占位符，说明产品 ID 未正确设置。请通过 [该链接](https://pbt.tuya.com/s?p=dd46368ae3840e54f018b2c45dc1550b&u=c38c8fc0a5d14c4f66cae9f0cfcb2a24&t=2) 复制或创建产品并获取 PID，在 `tuya_app_config.h` 中设置 `TUYA_PRODUCT_ID`，重新编译并运行。

## 参考资料

- [DuckyClaw 概述](/duckyclaw)
- [快速开始 – 环境搭建](/docs/quick-start/enviroment-setup)
- [快速开始 – 设备授权](/docs/quick-start/equipment-authorization)
- [自定义设备 MCP（硬件技能）](/docs/duckyclaw/custom-device-mcp)
- [DuckyClaw 仓库](https://github.com/tuya/DuckyClaw)（外部链接）
