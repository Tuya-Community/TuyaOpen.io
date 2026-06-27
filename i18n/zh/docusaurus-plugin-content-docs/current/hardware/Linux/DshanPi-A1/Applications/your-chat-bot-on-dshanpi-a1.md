---
title: "在 DshanPi-A1 上运行 your_chat_bot"
---

在 [DshanPi-A1](https://rockchip.100ask.net/en/docs/DshanPi-A1/intro/) 开发板上运行 TuyaOpen 的 [your_chat_bot](https://tuyaopen.ai/zh/docs/cloud/device-ai/demo-your-chat-bot) 语音助手。与树莓派不同，DshanPi-A1 自带麦克风和扬声器，因此两个板级专属步骤是配置板载声卡和让固件指向唤醒模型。

## 前置准备

请先阅读 [快速开始](https://tuyaopen.ai/zh/docs/quick-start) 及其子章节：

- 搭建 [TuyaOpen 开发环境](https://tuyaopen.ai/zh/docs/quick-start/enviroment-setup)。
- 获取 [TuyaOpen 专用授权码](https://tuyaopen.ai/zh/docs/quick-start/equipment-authorization)，推荐使用修改头文件的方式进行授权。
- 了解[设备配网](https://tuyaopen.ai/zh/docs/quick-start/device-network-configuration)。

:::note
`your_chat_bot` 是一个依赖云端配对的 AI 应用。设备需要先有有效的授权码（授权码）才能连接并响应。
:::

## 编译方式

DshanPi-A1 支持两种编译方式：

- **交叉编译**：在 PC 上编译，然后将产物传输到开发板运行。
- **本地编译**：直接在开发板上编译。

构建系统会自动检测当前平台并选择合适的编译方式。

:::note
macOS 系统不支持交叉编译，请使用 Linux 或在开发板上直接编译。
:::

## 第一步：配置板载声卡

DshanPi-A1 自带麦克风和扬声器，但使用前需要进行配置。

### 安装音频库

安装 ALSA 音频库（用于音频输入输出）：

```bash
sudo apt-get install libasound2-dev
```

### 配置扬声器输出

DshanPi-A1 有两个音频输出设备：耳机接口和板载喇叭。如需将板载喇叭设为默认输出，编辑音频配置文件：

```bash
sudo vi /etc/asound.conf
```

添加以下内容：

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

保存并退出（按 `ESC`，输入 `:wq`，按 `Enter`）。

## 第二步：配置唤醒模型

KWS（关键词唤醒）模型让设备能够识别唤醒词“你好涂鸦”。先获取模型文件，再让固件指向它们。

### 获取模型文件

**方式一：自动下载**

为 DshanPi-A1 平台编译时，模型会自动下载到：

```text
platform/LINUX/tuyaos_adapter/src/tkl_audio/models
```

**方式二：手动下载**

使用以下命令将 `mdtc_chunk_300ms.mnn` 和 `tokens.txt` 下载到 `~/tuyaopen_models`：

```bash
wget -P ~/tuyaopen_models https://github.com/tuya/TuyaOpen-ubuntu/raw/platform_ubuntu/tuyaos_adapter/src/tkl_audio/models/mdtc_chunk_300ms.mnn
wget -P ~/tuyaopen_models https://github.com/tuya/TuyaOpen-ubuntu/raw/platform_ubuntu/tuyaos_adapter/src/tkl_audio/models/tokens.txt
```

代码中默认路径为 `~/tuyaopen_models`。如需使用其他路径，请按下面步骤配置。

### 设置模型路径

1. 进入项目目录：

   ```bash
   cd apps/tuya.ai/your_chat_bot
   ```

2. 选择 DshanPi-A1 配置：

   ```bash
   tos.py config choice
   ```

   在菜单中选择 `DshanPi_A1.config`。

3. 打开配置菜单：

   ```bash
   tos.py config menu
   ```

4. 依次进入 `(Top) → Choice a board → LINUX → TKL Board Configuration`。

5. 将以下两个配置项设置为模型文件的实际路径：
   - `KWS model file path` — 填入 `mdtc_chunk_300ms.mnn` 的完整路径
   - `KWS model token file path` — 填入 `tokens.txt` 的完整路径

### 配置示例

将模型文件放在 `~/tuyaopen_models` 目录时，路径配置如下：

![TKL Board Configuration 菜单中 KWS 模型路径的配置示例](https://images.tuyacn.com/fe-static/docs/img/4e3897a7-6d32-40e2-b2bd-6d2a6497076e.png)

:::warning
路径必须填写正确，否则唤醒功能无法正常工作。
:::

## 传输产物（仅交叉编译）

如果你在 PC 上交叉编译，使用 `scp` 将编译得到的可执行文件传输到开发板：

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
