---
title: "在 Raspberry Pi 上运行 your_chat_bot"
---

本文档介绍如何在树莓派上运行 tuyaopen 的 [your_chat_bot](https://tuyaopen.ai/zh/docs/applications/tuya.ai/demo-your-chat-bot) 项目。

## 前置准备

请先阅读 [快速开始](https://tuyaopen.ai/zh/docs/quick-start) 及其子章节，了解以下内容：
- 如何搭建 [TuyaOpen 开发环境](https://tuyaopen.ai/zh/docs/quick-start/enviroment-setup)
- 如何获取 [TuyaOpen 专用授权码](https://tuyaopen.ai/zh/docs/quick-start/equipment-authorization)，推荐使用修改头文件的方式进行授权
- 如何进行[设备配网](https://tuyaopen.ai/zh/docs/quick-start/device-network-configuration)

## 编译方式说明

在 tuyaopen 上，树莓派支持两种编译方式：
- **交叉编译**：在 PC 上编译，然后传输到树莓派运行
- **本地编译**：直接在树莓派上编译

> **注意**：macOS 系统不支持交叉编译，请使用 Linux 或在开发板上直接编译。

## 外置声卡

树莓派默认没有内置麦克风和扬声器，因此需要使用外置 USB 声卡。推荐使用以下型号：

- **USB 音频模块 YD1076**，[淘宝链接](https://e.tb.cn/h.77Vo2K5tJIaL86g?tk=lnBAUbwVNB9)
- **waveshare USB 声卡**，[链接](https://www.waveshare.com/wiki/USB_TO_AUDIO?srsltid=AfmBOoqQpLSG-qO8REhn6lDsAIOOjskHyjkyJv0_4BKBo3_vqFqoTisL)

也可以自行选择其他兼容的 USB 声卡。需要注意的是，麦克风应支持输出原始音频数据，不要自带降噪、回声消除等处理功能。

## 模型路径配置

### 获取唤醒模型

KWS 唤醒模型有两种获取方式：

**方式一：自动下载**

选择树莓派平台并编译成功后，模型会自动下载到 `platform/LINUX/tuyaos_adapter/src/tkl_audio/models` 目录。

**方式二：手动下载**

使用下面的命令下载 `mdtc_chunk_300ms.mnn` 和 `tokens.txt` 文件到 `~/tuyaopen_models` 目录下：

```bash
wget -P ~/tuyaopen_models https://github.com/tuya/TuyaOpen-ubuntu/raw/platform_ubuntu/tuyaos_adapter/src/tkl_audio/models/mdtc_chunk_300ms.mnn
wget -P ~/tuyaopen_models https://github.com/tuya/TuyaOpen-ubuntu/raw/platform_ubuntu/tuyaos_adapter/src/tkl_audio/models/tokens.txt
```

### 配置唤醒模型

代码中默认配置为`~/tuyaopen_models`，如果你需要修改模型路径，可以按照下面步骤进行配置。

获取模型后，按以下步骤配置路径：

1. 激活 tos.py 环境，进入 `apps/tuya.ai/your_chat_bot` 目录
2. 执行 `tos.py config choice` 命令，选择 `RaspberryPi.config` 配置
3. 执行 `tos.py config menu` 命令，依次进入：`(Top) → Choice a board → LINUX → TKL Board Configuration`
4. 根据 `mdtc_chunk_300ms.mnn` 和 `tokens.txt` 的实际存放路径，修改以下配置项：
   - `KWS model file path`
   - `KWS model token file path`

> **注意**：请确保模型文件已放置在树莓派的文件系统中，且路径配置正确，否则唤醒功能无法正常工作。

### 配置示例

例如，将模型文件存放在 `~/tuyaopen_models` 目录下时，路径配置如下：

![models_path_config](https://images.tuyacn.com/fe-static/docs/img/4e3897a7-6d32-40e2-b2bd-6d2a6497076e.png)

> **重要提示**：路径必须填写正确，否则语音唤醒功能无法正常工作。

## 补充说明

### 使用交叉编译时的文件传输

如果您使用的是交叉编译方式，可以借助于 scp 命令将编译得到的可执行文件从编译主机传输到树莓派。例如：

```bash
scp ./dist/your_chat_bot_1.0.1/your_chat_bot_QIO_1.0.1.bin username@192.168.1.xxx:~/
```

**命令说明：**
- `username` - 开发板的用户名
- `192.168.1.xxx` - 开发板的 IP 地址
- `~/` - 开发板上的目标目录

### 如何执行可执行文件

```bash
./your_chat_bot_QIO_1.0.1.bin
```

**命令说明：**
- `your_chat_bot_QIO_1.0.1.bin` - 可执行文件名

首次运行需要进行扫描配网。如果扫描配网或联网失败可以尝试删除 `tuyadb` 文件夹后重新运行。

## 常见问题

**Q: 语音唤醒不工作怎么办？**  
A: 请检查模型文件路径是否正确，文件是否完整。可以使用 `ls -lh` 命令查看文件是否存在及大小是否正常。

**Q: 无法执行可执行文件怎么办？**  
A: 请检查可执行文件是否有执行权限。可以使用 `chmod +x your_chat_bot_QIO_1.0.1.bin` 命令赋予执行权限。
