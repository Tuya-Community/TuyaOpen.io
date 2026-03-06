---
title: DuckyClaw 与 ESP32-S3
---

import { SyncedTabs, SyncedTabItem } from '@site/src/components/SyncedTabs';

# DuckyClaw 快速开始（ESP32-S3）

本文介绍如何在 ESP32-S3 开发板上构建并烧录 DuckyClaw 固件，面向希望在 ESP32-S3 + Wi‑Fi 上运行 DuckyClaw 的开发者。

## 前置条件

- 无额外要求，了解 [快速开始](quick-start/index) 即可。具备终端与 Git 的基本使用经验更佳。

## 硬件与软件要求

- **ESP32-S3 开发板**：PSRAM 8 MB，FLASH 16 MB。
- **USB 数据线**：用于连接开发板与电脑。
- **电脑**：Windows 10/11、Linux（如 Ubuntu 20/22/24 LTS）或 macOS。
- **Tuya Cloud**：本示例使用 Tuya 云服务。需具备有效的[授权码](quick-start/equipment-authorization)，并在 `tuya_app_config.h` 中填写正确的 PID、UUID、AuthKey，以使用云与 LLM 功能。

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

### 2. 克隆仓库并激活构建环境

:::info
可适当增大 Git 缓冲区以加速克隆：

```bash
git config --global http.postBuffer 524288000
```

:::

:::warning
项目路径请勿包含空格或非 ASCII 字符；Windows 下请勿放在 C 盘根目录。
:::

```bash
git clone https://github.com/tuya/DuckyClaw.git
cd DuckyClaw
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

应能看到版本号（如 `v1.3.0`）以及各工具（git、cmake、make、ninja）检查通过。如有需要会自动拉取子模块。

### 3. 选择开发板配置

在项目根目录执行配置选择：

```bash
cd ..
tos.py config choice
```

输入 **1** 选择 **ESP32S3_BREAD_COMPACT_WIFI**：

```text
--------------------
1. ESP32S3_BREAD_COMPACT_WIFI.config
2. RaspberryPi.config
3. TUYA_T5AI_BOARD_LCD_3.5_CAMERA.config
--------------------
Input "q" to exit.
Choice config file: 1
```

### 4. 修改应用配置

打开 `DuckyClaw/include/tuya_app_config.h`，设置以下项。

**LLM / Tuya Cloud**（使用云与 AI 必填）：

- `TUYA_PRODUCT_ID`：产品 ID（PID），为设备与云平台配置的绑定键。
- `TUYA_OPENSDK_UUID`：Open SDK UUID。
- `TUYA_OPENSDK_AUTHKEY`：Open SDK AuthKey。

将占位符替换为真实值。获取方式：

- **PID**：[Tuya 产品 / PID](https://pbt.tuya.com/s?p=dd46368ae3840e54f018b2c45dc1550b&u=c38c8fc0a5d14c4f66cae9f0cfcb2a24&t=2)。
- **UUID 与 AuthKey**：[Tuya IoT 平台 – Open SDK 采购](https://platform.tuya.com/purchase/index?type=6)。

**IM / 应用通道**（可选）：按需在同一文件中配置 Feishu、Telegram 或 Discord 等通道及凭证。

### 5. 编译与烧录

编译工程：

```bash
tos.py build
```

编译成功后烧录固件：

```bash
tos.py flash
```

连接串口查看日志：

```bash
tos.py monitor
```

**预期结果**：工程编译通过，固件烧录到 ESP32-S3 后设备正常启动。可通过串口监控确认启动及云连接状态（若已配置）。

## 参考资料

- [DuckyClaw 概述](/duckyclaw)
- [快速开始 – 环境搭建](/docs/quick-start/enviroment-setup)
- [自定义设备 MCP（硬件技能）](/docs/duckyclaw/custom-device-mcp)
- [DuckyClaw 仓库](https://github.com/tuya/DuckyClaw)（外部链接）
