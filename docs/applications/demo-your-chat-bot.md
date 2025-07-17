---
title: Your Chat Bot Application
---

 [your_chat_bot](https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/your_chat_bot) is an open-source large-model intelligent chat bot based on tuya.ai. It collects voice through a microphone, performs speech recognition, enables conversation, interaction, and banter, and allows you to see real-time chat content on the screen.

## Features

- Supports Tuya voice AI agent and four chat modes:
  - **Long-press talk mode**: The user must keep pressing the button to input voice; releasing the button ends the voice input.
  - **Button talk mode**: The device enters standby by default after powering on. The user short-presses the button to enter listening mode, then can input voice and interact with the AI agent.
  - **Wakeup talk mode**: The user must say the wake word before each conversation to wake up the device, then can have a single conversation, similar to a smart speaker.
  - **Free talk mode**: After waking up the device with the wake word, the user can have continuous conversations. If there is no conversation after wakeup, the device will return to standby after 30 seconds and needs to be woken up again for the next conversation.
- Supports interrupting the conversation locally by pressing the button.
- Supports various status prompt sounds, such as network configuration, offline, wakeup, etc.
- Supports various displays and multiple UI styles:
  - **WeChat style**
  - **Chat bot**
  - **Scrolling subtitles, suitable for small OLED screens**
- Supports adjusting device volume via App.
- Power cycling the device 3 times in a row will enter network configuration mode.
- Supports real-time switching of AI agent roles via App.

## Hardware Support List

| Board                                                        | Config File                                  | UI         | PID              |
| ------------------------------------------------------------ | -------------------------------------------- | ---------- | ---------------- |
| T5AI_BOARD dev board + 3.5" rgb565 LCD (touch, lcd:ili9488, tp:gt1151) | TUYA_T5AI_BOARD_LCD_3.5.config               | WeChat     | alon7qgyjj8yus74 |
| T5AI_EVB dev board (white box, built-in 2.4" spi565 st7789)  | TUYA_T5AI_EVB.config                         | Chat bot   | r3ulobrs5nwreguj |
| T5AI_MOJI_1_28 dev board (built-in 1.28" spi565 gc9a01 round) | T5AI_MOJI_1.28.config                        | Chat bot   | kf8wauubey0doaiz |
| T5AI_MINI dev board + 1.3" spi565 st7789 LCD                 | TUYA_T5AI_MINI_LCD_1.3.config                | Chat bot   | 8btswykdiium7t8k |
| DNESP32S3_BOX dev board (built-in 320*340 mcu8080 st7789 lcd) | DNESP32S3_BOX.config                         | Chat bot   | znw8prbujidtzavd |
| DNESP32S3 dev board (built-in 320*340 spi st7789 lcd)        | DNESP32S3.config                             | WeChat     | scig7pauzzid3w4b |
| ESP32S3 Breadboard (built-in 128*32 i2c ssd1306 oled)        | ESP32S3_BREAD_COMPACT_WIFI.config            | Scrolling  | j1y437proohznfbs |
| Waveshare ESP32S3 dev board (built-in 364*448 spi sh8601 lcd)| WAVESHARE_ESP32S3_TOUCH_AMOLED_1_8.config    | WeChat     | lased5audtah8wcp |
| XINGXZHI_ESP32S3_CUBE dev board (built-in 128*64 i2c ssd1306 oled) | XINGZHI_ESP32S3_CUBE_0_96OLED_WIFI.config    | Scrolling  | uyidyzglm2m1bpcl |


## File Structure

### Project Root Directory

```shell
.
├── app_default.config    # Default application config file
├── assets                # Static resources directory
├── CMakeLists.txt        # CMake build script
├── config                # Hardware config directory
├── include               # Header files directory
├── Kconfig               # Project config file
├── README_zh.md          # Chinese documentation
├── README.md             # English documentation
├── script                # Scripts directory
└── src                   # Source code directory
```

### Assets Directory

```shell
├── assets                 # Static resources directory
│   ├── lang_config.h      # Multi-language config header
│   └── zh-CN              # Chinese language pack
│       └── language.json  # Chinese text resources
```

### Hardware Config Directory

The `config` directory contains configuration files for various boards. If you adapt a new board based on this application, you can add the config file here.

```shell
├── config                 # Hardware config directory
│   ├── DNESP32S3_BOX.config
│   ├── DNESP32S3.config
│   ├── ESP32S3_BREAD_COMPACT_WIFI.config
│   ├── T5AI_MOJI_1.28.config
│   ├── TUYA_T5AI_BOARD_EYES.config
│   ├── TUYA_T5AI_BOARD_LCD_3.5.config
│   ├── TUYA_T5AI_EVB.config
│   ├── TUYA_T5AI_MINI_LCD_1.3.config
│   ├── WAVESHARE_ESP32S3_TOUCH_AMOLED_1_8.config
│   └── XINGZHI_ESP32S3_CUBE_0_96OLED_WIFI.config
```

### Scripts Directory

```shell
├── script                      # Scripts directory
│   └── gen_lang.py             # Multi-language resource generation script
```

### Include Directory

```shell
├── include
│   ├── app_chat_bot.h       # Chat bot feature header
│   ├── app_display.h        # Display module header
│   ├── app_system_info.h    # System info (network status, memory, etc.)
│   ├── reset_netcfg.h       # Power cycle reset feature header
│   └── tuya_config.h        # Device license and info config
```

### Source Code Directory

```shell
└── src
    ├── app_chat_bot.c      # Chat bot feature implementation
    ├── app_system_info.c   # System info features
    ├── display             # Display module
    ├── reset_netcfg.c      # Power cycle reset feature
    └── tuya_main.c         # Application entry
```

#### Display Module

```shell
├── display                 # Display module
│   ├── app_display.c       # Main display control file
│   ├── CMakeLists.txt      # Display module CMake config
│   ├── font                # Font resources
│   ├── image               # Image resources
│   ├── Kconfig             # Display config options
│   ├── tuya_lvgl.c         # LVGL adaptation file
│   ├── tuya_lvgl.h         # LVGL adaptation header
│   └── ui                  # UI implementation
│       ├── ui_chatbot.c    # Chat bot UI
│       ├── ui_display.h    # UI module common header
│       ├── ui_oled.c       # OLED scrolling subtitle UI
│       └── ui_wechat.c     # WeChat style UI
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

This project depends on the [ai_audio](../applications/ai-components/ai-audio-asr-impl.md) application component, which mainly implements audio collection, playback, cloud AI session creation, and other functions.

- **Long-press talk mode**

  ![](/img/applications/your_chat_bot/en/long_talk.svg)

- **Button talk mode**

  ![](/img/applications/your_chat_bot/en/button_talk.svg)	

- **Wakeup talk mode**

  ![](/img/applications/your_chat_bot/en/wakeup_talk.svg)

- **Free talk mode**

  ![](/img/applications/your_chat_bot/en/free_talk.svg)

## Build Project

1. For environment setup and configuration, please refer to [Quick Start](../quick_start/index.md).

2. Change directory from the TuyaOpen root to the application directory

   ```shell
   cd apps/tuya.ai/your_chat_bot
   ```

3. Select the corresponding dev board config

   ```shell
   tos.py config choice
   ```

4. Build the project

   ```
   tos.py

## Adapting New Boards
### Peripheral Requirements List
For the list of peripherals supported by tuyaopen, please refer to [Peripheral Driver List](../peripheral/support_peripheral_list.md). Any new board must have the **required** peripheral drivers listed below.

| Peripheral      | Peripheral Component | Description                                                                 | Required |
| --------------- | ------------------- | --------------------------------------------------------------------------- | -------- |
| Audio Driver    | audio_codecs         | Can collect audio data in PCM format. Can play voice in MP3 format, 16bit, 16KHz, mono. | Yes      |
| Display Driver  | display              | LCD screen / OLED screen                                                    | Yes      |
| LED Driver      | led                  | Indicates whether the device is listening, etc.                             | No       |
| Button Driver   | button               | Interrupts conversation, starts conversation in button talk mode.            | No       |

### Board Adaptation
:::tip
The unified entry for board peripheral driver registration is `board_register_hardware`, and the implementation of this interface is placed in the board-level folder.

If developers want to modify the hardware configuration of the driver (such as changing pins, chip types, etc.), please make changes in the target board's folder (boards/target environment/target board, such as `boards/T5AI/TUYA_T5AI_BOARD`).
::::

Please refer to [Adding New Board Support](../new_hardware/adding-new-board-support.md) for the steps to add and adapt new boards.