---
title: Duo-Eyes Mood Robot
---

 [duo_eye_mood](https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/duo_eye_mood) is an open-source large-model intelligent chat robot based on tuya.ai. It collects voice through a microphone, performs speech recognition, enables conversation, interaction, and banter, and can display the current emotional state through the dual-eye screens.

## Features

- Supports Tuya voice AI agent and four chat modes:

  - **Long-press talk mode**: The user must keep pressing the button to input voice; releasing the button ends the voice input.

  - **Button talk mode**: The device enters standby by default after powering on. The user short-presses the button to enter listening mode, then can input voice and interact with the AI agent.

  - **Wakeup talk mode**: The user must say the wake word before each conversation to wake up the device, then can have a single conversation, similar to a smart speaker.

  - **Free talk mode**: After waking up the device with the wake word, the user can have continuous conversations. If there is no conversation after wakeup, the device will return to standby after 30 seconds and needs to be woken up again for the next conversation.

- Supports interrupting the conversation locally by pressing the button.

- Supports various status prompt sounds, such as network configuration, offline, wakeup, etc.

- Supports displaying the current emotion of the chatbot through various GIFs on the eyes, such as angry, surprised, scared, confused, etc., making it more fun.

  Supported emotions: Neutral / Surprise / Angry / Crying / Moved / Sad / Thinking / Happy / Reject / Disappointed.

- Supports adjusting device volume via App.

- Power cycling the device 3 times in a row will enter network configuration mode.

- Supports real-time switching of AI agent roles via App.

## Hardware Support List

| Board                                                        | Config File                    | PID              |
| ------------------------------------------------------------ | ------------------------------ | ---------------- |
| T5AI_BOARD dev board + Duo-Eyes accessory<br />(2 x 1.28" spi565 st7735S round screens) | TUYA_T5AI_BOARD_EYES.config    | 8ixyalzpn0jrun9y |

## File Structure

### Root Directory Structure

```shell
.
├── app_default.config       # Default application config file
├── CMakeLists.txt           # CMake build script
├── config                   # Hardware config directory
├── include                  # Header files directory
├── Kconfig                  # Project config file
├── README.md                # English documentation
├── README_zh.md             # Chinese documentation
└── src                      # Source code directory
```

### Hardware Config Directory

The files in the `config` directory are configuration files for various boards. If you adapt a new board based on this application, you can add the config file here.

```shell
├── config       
│   └── TUYA_T5AI_BOARD_EYES.config    # T5AI_BOARD dev board + Duo-Eyes accessory
```

### Header Files Directory

```shell
├── include
│   ├── app_chat_bot.h       # Chat bot feature header
│   ├── app_display.h        # Display module header
│   ├── reset_netcfg.h       # Power cycle reset feature header
│   └── tuya_config.h        # Device license and info config
```

### Source Code Directory

```shell
└── src
    ├── app_chat_bot.c       # Chat bot feature implementation
    ├── display              # Display module
    ├── reset_netcfg.c       # Power cycle reset feature
    └── tuya_main.c          # Application entry
```

#### Display Module

```shell
├── display                  # Display module
│   ├── app_display.c        # Main display control file
│   ├── CMakeLists.txt       # Display module CMake config
│   ├── image                # Image resources directory
│   ├── tuya_lvgl.c          # LVGL adaptation file
│   ├── tuya_lvgl.h          # LVGL adaptation header
│   └── ui                   # UI implementation
│       ├── ui_display.h     # UI module common header
│       └── ui_eyes.c        # Duo-Eyes emotion display UI
```

## Application Configuration

- **Product PID**

  | Macro               | Type   | Description                                 |
  | ------------------- | ------ | ------------------------------------------- |
  | TUYA_PRODUCT_KEY    | String | Product ID, bound to Tuya AI agent          |

- **Select Chat Mode**

  | Macro                                 | Type  | Description             |
  | -------------------------------------- | ----- | ---------------------- |
  | ENABLE_CHAT_MODE_KEY_PRESS_HOLD_SINGEL | Bool  | Long-press talk mode   |
  | ENABLE_CHAT_MODE_KEY_TRIG_VAD_FREE     | Bool  | Button talk mode       |
  | ENABLE_CHAT_MODE_ASR_WAKEUP_SINGEL     | Bool  | Wakeup talk mode       |
  | ENABLE_CHAT_MODE_ASR_WAKEUP_FREE       | Bool  | Free talk mode         |

- **Select Wake Word**

  This config only appears when selecting ***Wakeup Talk*** or ***Free Talk*** mode.

  | Macro                                | Type  | Description                    |
  | ------------------------------------- | ----- | ------------------------------ |
  | ENABLE_WAKEUP_KEYWORD_NIHAO_TUYA      | Bool  | Wake word is "Nihao Tuya"      |
  | ENABLE_WAKEUP_KEYWORD_NIHAO_XIAOZHI   | Bool  | Wake word is "Nihao Xiaozhi"   |
  | ENABLE_WAKEUP_KEYWORD_XIAOZHI_TONGXUE | Bool  | Wake word is "Xiaozhi Tongxue" |
  | ENABLE_WAKEUP_KEYWORD_XIAOZHI_GUANJIA | Bool  | Wake word is "Xiaozhi Guanjia" |

## Workflow

This project depends on the [ai_audio](./ai-components/ai-audio-asr-impl.md) application component, which mainly implements audio collection, playback, cloud AI session creation, and other functions.

- **Long-press talk mode**

  ![](/img/applications/your_chat_bot/zh/long_talk.svg)

- **Button talk mode**

  ![](/img/applications/your_chat_bot/zh/button_talk.svg)	

- **Wakeup talk mode**

  ![](/img/applications/your_chat_bot/zh/wakeup_talk.svg)

- **Free talk mode**

  ![](/img/applications/your_chat_bot/zh/free_talk.svg)

## Build Project

1. For environment setup and configuration, please refer to [Quick Start](../../quick-start/index.md).

2. Change directory from the TuyaOpen root to the application directory

   ```shell
   cd apps/tuya.ai/duo_eye_mood
   ```

3. Select the corresponding dev board config

   ```shell
   tos.py config choice
   ```

4. Build the project

   ```
   tos.py build
   ```

## Adapting New Boards
### Peripheral Requirements List
For the list of peripherals supported by tuyaopen, please refer to [Peripheral Driver List](../../peripheral/support_peripheral_list.md). Any new board must have the **required** peripheral drivers listed.

  | Peripheral      | Peripheral Component | Description | Required |
  | --------------  | ------------------- | ----------- | -------- |
  | Audio Driver    | audio_codecs         | Can collect audio data, format PCM.<br/>Can play voice, format MP3, 16bit, 16KHz, mono. | Yes      |
  | Display Driver  | display              | Has two 1.28" round screens, two eyes.<br/>Both round screens are controlled by the same driver interface, i.e., the animation displayed on both screens is identical. | Yes      |
  | LED Driver      | led                  | Indicates whether the device is listening, etc. | No       |
  | Button Driver   | button               | Interrupts conversation, starts conversation in button talk mode. | No       |

### Board Adaptation
:::tip
The unified entry for board peripheral driver registration is `board_register_hardware`, and the implementation of this interface is placed in the board-level folder.

If developers want to modify the hardware configuration of the driver (such as changing pins, chip types, etc.), please make changes in the target board's folder (boards/target environment/target board, such as `boards/T5AI/TUYA_T5AI_BOARD`).
::::

Please refer to [Adding New Board Support](../../new-hardware/new-board.md) for the steps to add and adapt new boards.