---
title: "在 DshanPi-A1 上运行 your_chat_bot"
---

本文档将指导你在 [DshanPi-A1](https://rockchip.100ask.net/en/docs/DshanPi-A1/intro/) 开发板上运行 TuyaOpen 的 [your_chat_bot](https://tuyaopen.ai/zh/docs/applications/tuya.ai/demo-your-chat-bot) 聊天机器人项目。

## 前置准备

请先阅读 [快速开始](https://tuyaopen.ai/zh/docs/quick-start) 及其子章节，了解以下内容：
- 如何搭建 [TuyaOpen 开发环境](https://tuyaopen.ai/zh/docs/quick-start/enviroment-setup)
- 如何获取 [TuyaOpen 专用授权码](https://tuyaopen.ai/zh/docs/quick-start/equipment-authorization)，推荐使用修改头文件的方式进行授权
- 如何进行[设备配网](https://tuyaopen.ai/zh/docs/quick-start/device-network-configuration)

## 编译方式说明

DshanPi-A1 支持两种编译方式：
- **交叉编译**：在 PC 上编译，然后传输到开发板运行
- **本地编译**：直接在开发板上编译

系统会自动检测当前平台并选择合适的编译方式。

> **注意**：macOS 系统不支持交叉编译，请使用 Linux 或在开发板上直接编译。

## 快速上手指南

在 DshanPi-A1 上运行需要完成以下两个额外配置：

1. 配置板载声卡（让开发板能够录音和播放声音）
2. 配置语音唤醒模型路径

## 第一步：配置板载声卡

DshanPi-A1 开发板自带麦克风和扬声器，但需要进行配置才能正常使用。

### 1.1 安装音频支持库

首先安装 ALSA 音频库（用于处理音频输入输出）：

```bash
sudo apt-get install libasound2-dev
```

### 1.2 配置扬声器输出

DshanPi-A1 有两个音频输出设备：耳机接口和板载喇叭。为了使用更方便，我们配置板载喇叭作为默认输出设备。

编辑音频配置文件：

```bash
sudo vi /etc/asound.conf
```

将以下内容添加到文件中：

```plaintext
pcm.speaker_r {
  type route
  slave.pcm "hw:0,0"
  slave.channels 2
  ttable.0.1 1
  ttable.1.1 0
  ttable.0.0 0
  ttable.1.0 0
}
```

保存并退出编辑器（按 `ESC`，输入 `:wq`，按 `Enter`）。

## 第二步：配置语音唤醒模型

语音唤醒功能需要使用 KWS（关键词唤醒）模型，让设备能够识别"你好涂鸦"。

### 2.1 获取模型文件

有两种方式获取唤醒模型：

**方式一：自动下载**
- 选择 DshanPi-A1 平台编译时，模型会自动下载到项目目录：
  ```
  platform/LINUX/tuyaos_adapter/src/tkl_audio/models
  ```

**方式二：手动下载**

使用下面的命令下载 `mdtc_chunk_300ms.mnn` 和 `tokens.txt` 文件到 `~/tuyaopen_models` 目录下：

```bash
wget -P ~/tuyaopen_models https://github.com/tuya/TuyaOpen-ubuntu/raw/platform_ubuntu/tuyaos_adapter/src/tkl_audio/models/mdtc_chunk_300ms.mnn
wget -P ~/tuyaopen_models https://github.com/tuya/TuyaOpen-ubuntu/raw/platform_ubuntu/tuyaos_adapter/src/tkl_audio/models/tokens.txt
```

代码中默认配置为`~/tuyaopen_models`，如果你需要修改模型路径，可以按照下面步骤进行配置。

### 2.2 配置模型路径

在项目中配置模型文件的路径：

1. 进入项目目录：
   ```bash
   cd apps/tuya.ai/your_chat_bot
   ```

2. 选择 DshanPi-A1 配置：
   ```bash
   tos.py config choice
   ```
   在弹出的菜单中选择 `DshanPi_A1.config`

3. 打开配置菜单：
   ```bash
   tos.py config menu
   ```

4. 按以下路径进入配置项：
   ```
   (Top) → Choice a board → LINUX → TKL Board Configuration
   ```

5. 修改以下两个配置项为模型文件的实际路径：
   - `KWS model file path` → 填入 `mdtc_chunk_300ms.mnn` 的完整路径
   - `KWS model token file path` → 填入 `tokens.txt` 的完整路径

### 2.3 配置示例

假设你将模型文件放在 `~/tuyaopen_models` 目录下，配置应该如下图所示：

![models_path_config](https://images.tuyacn.com/fe-static/docs/img/4e3897a7-6d32-40e2-b2bd-6d2a6497076e.png)

> **重要提示**：路径必须填写正确，否则语音唤醒功能无法正常工作。

## 补充说明

### 使用交叉编译时的文件传输

如果你在 PC 上进行交叉编译，需要将编译好的可执行文件传输到开发板。可以使用 `scp` 命令：

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
