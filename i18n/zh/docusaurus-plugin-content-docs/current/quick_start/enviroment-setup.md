---
title: 环境搭建
---

import { SyncedTabs, SyncedTabItem } from '@site/src/components/SyncedTabs';

# 环境搭建

## 概述

完成在不同系统（Linux、Windows、macOS）中的必要工具准备。

## 硬件准备

开始前，请准备以下资源：
 - **TuyaOpen** [支持的开发板或模组](../hardware-specific/index.md#硬件平台)
 - USB 数据线
 - 电脑（支持 Windows/Linux/macOS 系统）

## 环境准备

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
    推荐使用 Ubuntu24/22/20 的 LTS 版本。
    :::

    安装必要的工具：

    ```bash
    sudo apt-get install lcov cmake-curses-gui build-essential ninja-build wget git python3 python3-pip python3-venv libc6-i386 libsystemd-dev
    ```
  </SyncedTabItem>
  <SyncedTabItem value="Mac">
    :::info
    推荐使用 Homebrew 包管理器进行安装。
    :::

    一般 Mac 终端使用的工具版本较低，推荐安装 Homebrew 并升级 bash。

    <details>
    <summary>安装 Homebrew，升级 bash。</summary>

    ```bash
    # 安装 Homebrew
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

    # 安装最新版 bash
    brew install bash

    # 将新安装的 bash 添加到可用 shell 列表
    echo "/usr/local/bin/bash" | sudo tee -a /etc/shells

    # 更改当前用户的 shell 为新 bash
    chsh -s /usr/local/bin/bash
    ```
    </details>

    安装必要的工具

    ```bash
    # 安装 python3
    brew install python3

    # 安装 git
    brew install git

    # 安装 make
    brew install make
    ```
  </SyncedTabItem>
  <SyncedTabItem value="Windows">
    :::info
    请使用 Windows10/11 系统。
    :::

    :::warning
    不兼容 Windows 中的仿 Linux 终端环境（如 GitBash、Msys2 等），请使用 CMD 或 PowerShell。
    :::

    下载并安装以下工具：
        > Python v3.8.0 或更高版本：[下载地址](https://www.python.org/downloads/windows/)
        >
        > Git v2.0.0 或更高版本：[下载地址](https://git-scm.com/downloads/win)
        >
        > Make v3.0 或更高版本：[下载地址](https://gnuwin32.sourceforge.net/packages/make.htm)
  </SyncedTabItem>
</SyncedTabs>

## 下载并激活 TuyaOpen

下载 `TuyaOpen` 仓库：

```bash
# 使用 github
git clone https://github.com/tuya/TuyaOpen.git

# 或者使用 gitee
git clone https://gitee.com/tuya-open/TuyaOpen.git

cd TuyaOpen
```

激活 `tos.py`：

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
    .\export.ps1  # powershell 需要先执行 `Set-ExecutionPolicy RemoteSigned -Scope LocalMachine`

    .\export.bat  # cmd
    ```
  </SyncedTabItem>
</SyncedTabs>

验证，使用命令 `tos.py version` 以及 `tos.py check`，会出现如下信息：

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
<summary>若 check 命令失败：</summary>
```bash
# 工具校验不合格，请安装或升级对应工具

# submodules 下载失败，手动执行 git 命令
git submodule update --init
```
</details>

使用如下命令退出激活 `tos.py`：

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

关于 `tos.py` 更详细的说明方法，可使用命令 `tos.py --help` 进行查看，或参考 [tos.py工具使用](../advanced_use/tos-guide.md)。

## 常见问题

1. `tos.py`激活失败

    若激活失败，可能是因为没有安装`python3-venv`，请安装后重试

    ```bash
    sudo apt-get install python3-venv
    ```

    删除`./.venv`目录，重新激活
