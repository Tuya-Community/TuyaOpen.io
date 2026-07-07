---
title: "在 Raspberry Pi 上运行 your_chat_bot"
description: "在树莓派上运行 TuyaOpen your_chat_bot 语音助手：介绍交叉/本地两种编译方式、所需外置声卡与唤醒模型指向配置。"
keywords:
  - Raspberry Pi
  - your_chat_bot
  - 语音助手
  - 交叉编译
  - TuyaOpen 硬件
---

在树莓派上运行 TuyaOpen 的 [your_chat_bot](https://tuyaopen.ai/zh/docs/cloud/device-ai/demo-your-chat-bot) 语音助手。本文介绍两种受支持的编译方式、开发板所需的外置声卡，以及如何让固件指向唤醒模型。

## 前置准备

请先阅读 [快速开始](https://tuyaopen.ai/zh/docs/quick-start) 及其子章节：

- 搭建 [TuyaOpen 开发环境](https://tuyaopen.ai/zh/docs/quick-start/enviroment-setup)。
- 获取 [TuyaOpen 专用授权码](https://tuyaopen.ai/zh/docs/quick-start/equipment-authorization)，推荐使用修改头文件的方式进行授权。
- 了解[设备配网](https://tuyaopen.ai/zh/docs/quick-start/device-network-configuration)。

:::note
`your_chat_bot` 是一个依赖云端配对的 AI 应用。设备需要先有有效的授权码（授权码）才能连接并响应。
:::

## 编译方式

树莓派支持两种编译方式：

- **交叉编译**：在 PC 上编译，然后将产物传输到树莓派运行。
- **本地编译**：直接在树莓派上编译。

:::note
macOS 系统不支持交叉编译，请使用 Linux 或在开发板上直接编译。
:::

## 外置声卡

树莓派默认没有内置麦克风和扬声器，因此需要使用外置 USB 声卡。推荐型号：

- **USB 音频模块 YD1076** — [淘宝链接](https://e.tb.cn/h.77Vo2K5tJIaL86g?tk=lnBAUbwVNB9)
- **Waveshare USB 声卡** — [链接](https://www.waveshare.com/wiki/USB_TO_AUDIO?srsltid=AfmBOoqQpLSG-qO8REhn6lDsAIOOjskHyjkyJv0_4BKBo3_vqFqoTisL)

也可以自行选择其他兼容的 USB 声卡。麦克风应支持输出原始音频数据，不要自带降噪、回声消除等处理功能。

## 配置唤醒模型

KWS（关键词唤醒）模型让设备能够识别唤醒词。先获取模型文件，再让固件指向它们。

### 获取模型文件

**方式一：自动下载**

选择树莓派平台并编译成功后，模型会自动下载到 `platform/LINUX/tuyaos_adapter/src/tkl_audio/models` 目录。

**方式二：手动下载**

使用以下命令将 `mdtc_chunk_300ms.mnn` 和 `tokens.txt` 下载到 `~/tuyaopen_models` 目录：

```bash
wget -P ~/tuyaopen_models https://github.com/tuya/TuyaOpen-ubuntu/raw/platform_ubuntu/tuyaos_adapter/src/tkl_audio/models/mdtc_chunk_300ms.mnn
wget -P ~/tuyaopen_models https://github.com/tuya/TuyaOpen-ubuntu/raw/platform_ubuntu/tuyaos_adapter/src/tkl_audio/models/tokens.txt
```

代码中默认路径为 `~/tuyaopen_models`。如需使用其他路径，请按下面步骤配置。

### 设置模型路径

1. 激活 `tos.py` 环境，进入 `apps/tuya.ai/your_chat_bot` 目录。
2. 执行 `tos.py config choice`，选择 `RaspberryPi.config` 配置。
3. 执行 `tos.py config menu`，依次进入 `(Top) → Choice a board → LINUX → TKL Board Configuration`。
4. 根据 `mdtc_chunk_300ms.mnn` 和 `tokens.txt` 的实际存放路径，设置以下配置项：
   - `KWS model file path`
   - `KWS model token file path`

:::warning
请将模型文件放在树莓派的文件系统中，并正确填写路径，否则唤醒功能无法正常工作。
:::

### 配置示例

将模型文件存放在 `~/tuyaopen_models` 目录时，路径配置如下：

![TKL Board Configuration 菜单中 KWS 模型路径的配置示例](https://images.tuyacn.com/fe-static/docs/img/4e3897a7-6d32-40e2-b2bd-6d2a6497076e.png)

## 传输产物（仅交叉编译）

如果你在 PC 上交叉编译，使用 `scp` 将编译得到的可执行文件传输到树莓派：

```bash
scp ./dist/your_chat_bot_1.0.1/your_chat_bot_QIO_1.0.1.bin username@192.168.1.xxx:~/
```

参数说明：

- `username` — 开发板的用户名
- `192.168.1.xxx` — 开发板的 IP 地址
- `~/` — 开发板上的目标目录

## 运行可执行文件

```bash
./your_chat_bot_QIO_1.0.1.bin
```

`your_chat_bot_QIO_1.0.1.bin` 为可执行文件名。

首次运行需要进行设备配网（配对）。如果配网或联网失败，可删除 `tuyadb` 文件夹后重新运行程序。

## 常见问题

**语音唤醒不工作怎么办？**

请检查模型文件路径是否正确、文件是否完整。可使用 `ls -lh` 查看文件是否存在以及大小是否正常。

**无法执行可执行文件怎么办？**

请检查可执行文件是否有执行权限。可使用 `chmod +x your_chat_bot_QIO_1.0.1.bin` 赋予执行权限。

## 相关文档

- [Raspberry Pi 配网失败排障](/zh/docs/hardware/Linux/raspberry-pi/wifi-bluetooth) — 排查配网、Wi-Fi 与蓝牙问题。
- [Raspberry Pi 外设](/zh/docs/hardware/Linux/raspberry-pi/Examples/peripherals-raspberry-pi) — 运行 GPIO、I2C、SPI、PWM、UART 示例。
