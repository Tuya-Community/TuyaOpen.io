---
title: "Running your_chat_bot on DshanPi-A1"
---

This document walks you through running the TuyaOpen [your_chat_bot](https://tuyaopen.ai/docs/applications/tuya.ai/demo-your-chat-bot) chat bot project on the [DshanPi-A1](https://rockchip.100ask.net/en/docs/DshanPi-A1/intro/) board.

## Prerequisites

Read the [Quick Start](https://tuyaopen.ai/docs/quick-start) and its sub-sections to understand:

- How to set up the [TuyaOpen development environment](https://tuyaopen.ai/docs/quick-start/enviroment-setup)
- How to obtain a [TuyaOpen authorization code](https://tuyaopen.ai/docs/quick-start/equipment-authorization); using the header-file method is recommended
- How to perform [device network configuration](https://tuyaopen.ai/docs/quick-start/device-network-configuration)

## Build Methods

DshanPi-A1 supports two build methods:

- **Cross-compilation**: Build on a PC, then transfer and run on the board
- **Native build**: Build directly on the board

The system automatically detects the current platform and selects the appropriate build method.

> **Note**: Cross-compilation is not supported on macOS. Use Linux or build directly on the board.

## Quick Start Guide

To run on DshanPi-A1, you need to complete two extra steps:

1. Configure the onboard sound card (so the board can record and play audio)
2. Configure the voice wake word model path

## Step 1: Configure the Onboard Sound Card

The DshanPi-A1 has a built-in microphone and speaker, but they must be configured before use.

### 1.1 Install Audio Libraries

Install the ALSA library (for audio input and output):

```bash
sudo apt-get install libasound2-dev
```

### 1.2 Configure Speaker Output

The DshanPi-A1 has two audio outputs: the headphone jack and the onboard speaker. For convenience, we configure the onboard speaker as the default output.

Edit the audio configuration file:

```bash
sudo vi /etc/asound.conf
```

Add the following content:

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

Save and exit (press `ESC`, type `:wq`, then press `Enter`).

## Step 2: Configure the Voice Wake Word Model

Voice wake word uses a KWS (Keyword Spotting) model so the device can recognize “你好涂鸦” (Hello Tuya).

### 2.1 Obtain the Model Files

You can get the wake word model in two ways:

**Option 1: Automatic download**

- When building for the DshanPi-A1 platform, the model is automatically downloaded to:
  ```
  platform/LINUX/tuyaos_adapter/src/tkl_audio/models
  ```

**Option 2: Manual download**

Use the following commands to download `mdtc_chunk_300ms.mnn` and `tokens.txt` to `~/tuyaopen_models`:

```bash
wget -P ~/tuyaopen_models https://github.com/tuya/TuyaOpen-ubuntu/raw/platform_ubuntu/tuyaos_adapter/src/tkl_audio/models/mdtc_chunk_300ms.mnn
wget -P ~/tuyaopen_models https://github.com/tuya/TuyaOpen-ubuntu/raw/platform_ubuntu/tuyaos_adapter/src/tkl_audio/models/tokens.txt
```

The default path in the code is `~/tuyaopen_models`. If you need to change it, follow the steps below.

### 2.2 Configure the Model Path

Set the model file paths in the project:

1. Go to the project directory:
   ```bash
   cd apps/tuya.ai/your_chat_bot
   ```

2. Select the DshanPi-A1 configuration:
   ```bash
   tos.py config choice
   ```
   In the menu, choose `DshanPi_A1.config`

3. Open the config menu:
   ```bash
   tos.py config menu
   ```

4. Navigate to the options:
   ```
   (Top) → Choice a board → LINUX → TKL Board Configuration
   ```

5. Set these two options to the actual paths of the model files:
   - `KWS model file path` → full path to `mdtc_chunk_300ms.mnn`
   - `KWS model token file path` → full path to `tokens.txt`

### 2.3 Configuration Example

If the model files are in `~/tuyaopen_models`, the configuration should look like this:

![models_path_config](https://images.tuyacn.com/fe-static/docs/img/4e3897a7-6d32-40e2-b2bd-6d2a6497076e.png)

> **Important**: The paths must be correct, or the voice wake word feature will not work.

## Additional Notes

### Transferring Files When Using Cross-Compilation

If you cross-compile on a PC, you need to copy the built executable to the board. Use `scp`:

```bash
scp ./dist/your_chat_bot_1.0.1/your_chat_bot_QIO_1.0.1.bin username@192.168.1.xxx:~/
```

**Command parameters:**
- `username` — Username on the board
- `192.168.1.xxx` — IP address of the board
- `~/` — Target directory on the board

### Running the Executable

```bash
./your_chat_bot_QIO_1.0.1.bin
```

**Command parameters:**
- `your_chat_bot_QIO_1.0.1.bin` — Executable file name

On the first run, you need to perform device network configuration (pairing). If pairing or network connection fails, try deleting the `tuyadb` folder and running the program again.

## FAQ

**Q: Voice wake word is not working. What should I do?**  
A: Check that the model file paths are correct and that the files are complete. You can use `ls -lh` to verify that the files exist and that their sizes are as expected.

**Q: The executable cannot be run. What should I do?**  
A: Check that the executable has execute permission. You can run `chmod +x your_chat_bot_QIO_1.0.1.bin` to grant execute permission.
