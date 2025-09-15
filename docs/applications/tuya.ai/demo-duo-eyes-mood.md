---
title: Duo-Eyes Mood Robot
---

[duo_eye_mood](https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/duo_eye_mood) is an intelligent chatbot based on Tuya AI's open-source large language model. It captures voice input by using a microphone, processes it with speech recognition, and enables conversational interaction, responsive replies, and humorous banter. The chat content is displayed in real-time on the screen.

## Features

- Supports Tuya voice agent with four modes:

   - **Hold-to-talk mode**: Users press and hold a button to start voice input, and release to end.

   - **Press-to-talk mode**: The device enters standby mode upon power-on. A short button press switches it to the listening state for voice input and interaction with the agent.

   - **Wake word mode**: Users wake the device with a wake word for a single interaction, similar to talking to a smart speaker.

   - **Free talk mode**: After waking the device with a wake word, users can engage in continuous conversation. If no speech is detected within 30 seconds, the device returns to standby and requires rewaking for the next interaction.

- Supports local interruption of ongoing chats via button operation.

- Provides various status prompt tones, such as pairing, going offline, and wake-up.

- Shows various eye GIFs to reflect the current emotion of the chatbot, such as angry, surprised, scared, confused, and other expressive eye animations, enhancing interactivity and fun.

   Supported emotions: **Neutral**, **surprised**, **angry**, **crying**, **touched**, **sad**, **thinking**, **happy**, **rejecting**, and **disappointed**.

- Allows device volume adjustment on the app.

- Enter pairing mode by power cycling the device three times consecutively.

- Supports real-time switching of AI agent roles on the app.

## Hardware support

| Board | Configuration file | PID |
| ------------------------------------------------------------ | --------------------------- | ---------------- |
| T5AI_BOARD development board + dual-screen accessory <br />(two 1.28-inch SPI565 ST7735S round displays) | TUYA_T5AI_BOARD_EYES.config | 8ixyalzpn0jrun9y |

## File structure

### Root directory

```shell
.
├── app_default.config    # Default application configuration file
├── CMakeLists.txt        # CMake build script
├── config                # Hardware configuration
├── include               # Header files
├── Kconfig               # Project configuration file
├── README.md             # Documentation in English
├── README_zh.md          # Documentation in Chinese
└── src                   # Source code
```

### Hardware configuration

The files in the `config` directory are configuration files adapted for various development boards. If you have completed adaptation for a new board based on this project, you can add the corresponding configuration file in this directory.

```shell
├── config       
│   └── TUYA_T5AI_BOARD_EYES.config    # T5AI_BOARD development board + dual-screen accessory
```

### Header files

```shell
├── include
│   ├── app_chat_bot.h       # Chatbot functionality
│   ├── app_display.h        # Display module
│   ├── reset_netcfg.h       # Power cycle reset functionality
│   └── tuya_config.h        # Device license configuration and related information
```

### Source file

```shell
└── src
    ├── app_chat_bot.c      # Chatbot functionality implementation
    ├── display             # Display module
    ├── reset_netcfg.c      # Power cycle reset functionality
    └── tuya_main.c         # Application entry
```

#### Display module

```shell
├── display                 # Display module
│   ├── app_display.c       # Main control file of the display module
│   ├── CMakeLists.txt      # CMake configuration of the display module
│   ├── image               # Image resources
│   ├── tuya_lvgl.c         # LVGL adaptation file for the application
│   ├── tuya_lvgl.h         # LVGL adaptation header file
│   └── ui                  # UI implementation
│       ├── ui_display.h    # Common header file of the UI module
│   └── ui_eyes.c           # Dual-screen emotion display interface
```

## Application configuration

- **Product ID (PID)**

   | Macro | Type | Description |
   | ---------------- | ------ | -------------- |
   | TUYA_PRODUCT_KEY | String | The product ID, which is bound to the Tuya AI agent. |

- **Select chat mode**

   | Macro | Type | Description |
   | -------------------------------------- | ---- | ------------ |
   | ENABLE_CHAT_MODE_KEY_PRESS_HOLD_SINGEL | Boolean | Hold-to-talk mode |
   | ENABLE_CHAT_MODE_KEY_TRIG_VAD_FREE | Boolean | Press-to-talk mode |
   | ENABLE_CHAT_MODE_ASR_WAKEUP_SINGEL | Boolean | Wake word mode |
   | ENABLE_CHAT_MODE_ASR_WAKEUP_FREE | Boolean | Free talk mode |

- **Select wake word**

   This configuration is only available when the chat mode is set to **wake word mode** and **free talk mode**.

   | Macro | Type | Description |
   | ------------------------------------- | ---- | ------------------- |
   | ENABLE_WAKEUP_KEYWORD_NIHAO_TUYA | Boolean | The wake word is "Hey Tuya". |
   | ENABLE_WAKEUP_KEYWORD_NIHAO_XIAOZHI | Boolean | The wake word is "Hey Xiaozhi". |
   | ENABLE_WAKEUP_KEYWORD_XIAOZHI_TONGXUE | Boolean | The wake word is "Xiaozhi Tongxue". |
   | ENABLE_WAKEUP_KEYWORD_XIAOZHI_GUANJIA | Boolean | The wake word is "Xiaozhi Guanjia". |

## Process

This project depends on the application component [ai_audio](./ai-components/ai-audio-asr-impl.md). This component implements various features, including audio capture, audio playback, and creating cloud-based AI sessions.

- **Hold-to-talk mode**

   ![](/img/applications/your_chat_bot/en/long_talk.svg)

- **Press-to-talk mode**

   ![](/img/applications/your_chat_bot/en/button_talk.svg)

- **Wake word mode**

   ![](/img/applications/your_chat_bot/en/wakeup_talk.svg)

- **Free talk mode**

   ![](/img/applications/your_chat_bot/en/free_talk.svg)

## Build project

1. Install and configure the prerequisite environment. For more information, see [Set up Environment](../../quick-start/enviroment-setup.md).

2. Change from the TuyaOpen root directory to the application directory.

   ```shell
   cd apps/tuya.ai/duo_eye_mood
   ```

3. Select the specified development board configuration.

   ```shell
   tos.py config choice
   ```

4. Build the project.

   ```
   tos.py build
   ```

## Adapt to new development boards
### Peripheral requirements

For a list of peripherals supported by TuyaOpen, refer to the [Peripheral driver list](../../peripheral/support_peripheral_list.md). New development boards must include all **required** peripheral drivers listed.

| Peripheral | Peripheral component | Description | Required or not |
| ---- | ------- | ---- | ------- |
| Audio driver | audio_codecs | Capture PCM audio data and play MP3 audio (parameters: 16-bit depth, 16 KHz sample rate, mono). | Yes |
| Display driver | Display | Features two 1.28-inch round screens, representing a pair of eyes. Both round screens are controlled by the same driver interface, meaning they display identical animations. | Yes |
| Indicator driver | LED | Indicates whether the device is currently in the listening state. | No |
| Button driver | Button | Interrupts the chat and starts a chat in press-to-talk mode. | No |

### Adapt to development boards

For more information on how to add and adapt to a new development board, refer to [Adapt to new board-level drivers (board)](../../new-hardware/new-board.md).

:::tip
You can register the peripheral driver hardware on the development board through `board_register_hardware`. The implementation of this interface is placed in the board-level folder.

In the target development board's folder (`boards/target development environment/target development board`, for example, `boards/T5AI/TUYA_T5AI_BOARD`), you can modify the driver's hardware configuration (such as changing the pins or chip type).
:::
