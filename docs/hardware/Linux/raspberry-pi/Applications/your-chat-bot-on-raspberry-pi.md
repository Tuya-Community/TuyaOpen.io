---
title: "Run your_chat_bot on Raspberry Pi"
---

Run the TuyaOpen [your_chat_bot](https://tuyaopen.ai/docs/cloud/device-ai/demo-your-chat-bot) voice assistant on a Raspberry Pi. This guide covers the two supported build methods, the external sound card the board needs, and how to point the firmware at the wake-word model.

## Prerequisites

Read the [Quick Start](https://tuyaopen.ai/docs/quick-start) and its sub-sections first:

- Set up the [TuyaOpen development environment](https://tuyaopen.ai/docs/quick-start/enviroment-setup).
- Obtain a [TuyaOpen authorization code](https://tuyaopen.ai/docs/quick-start/equipment-authorization). The header-file method is recommended.
- Understand [device network configuration](https://tuyaopen.ai/docs/quick-start/device-network-configuration).

:::note
`your_chat_bot` is a cloud-paired AI application. You need a valid authorization code (授权码) before the device can connect and respond.
:::

## Build methods

Raspberry Pi supports two build methods:

- **Cross-compilation**: build on a PC, then transfer the binary to the Raspberry Pi and run it.
- **Native build**: build directly on the Raspberry Pi.

:::note
Cross-compilation is not supported on macOS. Use Linux, or build directly on the board.
:::

## External sound card

The Raspberry Pi has no built-in microphone or speaker, so an external USB sound card is required. Recommended models:

- **USB Audio Module YD1076** — [Taobao link](https://e.tb.cn/h.77Vo2K5tJIaL86g?tk=lnBAUbwVNB9)
- **Waveshare USB Sound Card** — [link](https://www.waveshare.com/wiki/USB_TO_AUDIO?srsltid=AfmBOoqQpLSG-qO8REhn6lDsAIOOjskHyjkyJv0_4BKBo3_vqFqoTisL)

Other compatible USB sound cards also work. The microphone must output raw audio data — it must not apply built-in noise reduction, echo cancellation, or similar processing.

## Configure the wake-word model

The KWS (Keyword Spotting) wake-word model lets the device recognize the wake word. Obtain the model files, then point the firmware at them.

### Obtain the model files

**Option 1: Automatic download**

After you select the Raspberry Pi platform and build successfully, the model is downloaded automatically to `platform/LINUX/tuyaos_adapter/src/tkl_audio/models`.

**Option 2: Manual download**

Download `mdtc_chunk_300ms.mnn` and `tokens.txt` to the `~/tuyaopen_models` directory:

```bash
wget -P ~/tuyaopen_models https://github.com/tuya/TuyaOpen-ubuntu/raw/platform_ubuntu/tuyaos_adapter/src/tkl_audio/models/mdtc_chunk_300ms.mnn
wget -P ~/tuyaopen_models https://github.com/tuya/TuyaOpen-ubuntu/raw/platform_ubuntu/tuyaos_adapter/src/tkl_audio/models/tokens.txt
```

The default path in the code is `~/tuyaopen_models`. To use a different path, configure it as shown below.

### Set the model path

1. Activate the `tos.py` environment and go to the `apps/tuya.ai/your_chat_bot` directory.
2. Run `tos.py config choice` and select the `RaspberryPi.config` configuration.
3. Run `tos.py config menu` and navigate to `(Top) → Choice a board → LINUX → TKL Board Configuration`.
4. Set the following options to the actual locations of `mdtc_chunk_300ms.mnn` and `tokens.txt`:
   - `KWS model file path`
   - `KWS model token file path`

:::warning
Place the model files on the Raspberry Pi filesystem and set the paths correctly. Otherwise the wake-word feature does not work.
:::

### Configuration example

When the model files are stored in `~/tuyaopen_models`, configure the paths like this:

![Example KWS model path configuration in the TKL Board Configuration menu](https://images.tuyacn.com/fe-static/docs/img/4e3897a7-6d32-40e2-b2bd-6d2a6497076e.png)

## Transfer the binary (cross-compilation only)

If you cross-compile on a PC, copy the built executable to the Raspberry Pi with `scp`:

```bash
scp ./dist/your_chat_bot_1.0.1/your_chat_bot_QIO_1.0.1.bin username@192.168.1.xxx:~/
```

Parameters:

- `username` — username on the board
- `192.168.1.xxx` — IP address of the board
- `~/` — target directory on the board

## Run the executable

```bash
./your_chat_bot_QIO_1.0.1.bin
```

`your_chat_bot_QIO_1.0.1.bin` is the executable file name.

On the first run, you must perform device network configuration (pairing). If pairing or network connection fails, delete the `tuyadb` folder and run the program again.

## FAQ

**The voice wake word does not work.**

Check that the model file paths are correct and the files are complete. Run `ls -lh` to confirm the files exist and their sizes are as expected.

**The executable does not run.**

Check that the executable has execute permission. Run `chmod +x your_chat_bot_QIO_1.0.1.bin` to grant it.

## See also

- [Raspberry Pi Provisioning Troubleshooting](/docs/hardware/Linux/raspberry-pi/wifi-bluetooth) — fix provisioning, Wi-Fi, and Bluetooth issues.
- [Raspberry Pi Peripherals](/docs/hardware/Linux/raspberry-pi/Examples/peripherals-raspberry-pi) — run GPIO, I2C, SPI, PWM, and UART examples.
