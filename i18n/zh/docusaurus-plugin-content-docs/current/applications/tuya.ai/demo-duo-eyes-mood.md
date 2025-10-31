---
title: 双眼屏情绪机器人
---

## 概述

[duo_eye_mood](https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/duo_eye_mood) 是基于 Tuya.AI 开源的大模型智能聊天机器人。通过麦克风采集语音，经语音识别处理后，实现对话交流、互动响应及调侃功能，同时可在屏幕上实时显示聊天内容。

## 功能介绍

- 支持涂鸦语音智能体，支持四种聊天模式：

  - **长按对话模式**：用户需长按按键以启动语音输入，松开按键即结束语音输入。

  - **按键对话模式**：设备上电默认进入待机状态，用户短按一下按键后设备进入聆听状态，此时用户可进行语音输入，与智能体对话。

  - **唤醒对话模式**：用户通过唤醒词将设备唤醒后，可进行单次对话，类似与音箱对话。

  - **随意对话模式**：用户通过唤醒词将设备唤醒后，可进行连续对话。若唤醒后没有对话，30 秒后设备会再次进入待机状态，下次对话前需要再次唤醒。

- 支持通过按键操作在本地打断当前对话。

- 支持各种状态提示音，如配网、离线、唤醒等。

- 支持显示通过眼睛的各种 GIF 来显示聊天者当前的情绪，比如生气、惊喜、害怕、困惑等眼神，更有趣味性。

  支持的情绪：**自然**、**惊喜**、**生气**、**哭泣**、**感动**、**悲伤**、**思考**、**高兴**、**拒绝**、**失望**。

- 支持 App 调节设备音量。

- 连续进行三次上下电操作，可使设备进入配网模式。

- 支持 App 端实时切换 AI 智能体角色。

## 硬件支持列表

| Board                                                        | 配置文件                    | PID              |
| ------------------------------------------------------------ | --------------------------- | ---------------- |
| T5AI_BOARD 开发板 + 双眼屏配件<br />（2 个 1.28 寸 SPI565 ST7735S 圆屏） | TUYA_T5AI_BOARD_EYES.config | 8ixyalzpn0jrun9y |

## 文件结构

### 根目录结构

```shell
.
├── app_default.config       # 应用默认配置文件
├── CMakeLists.txt           # CMake 构建脚本
├── config                   # 硬件配置目录
├── include                  # 头文件存放目录
├── Kconfig                  # 项目配置文件
├── README.md                # 英文说明文档
├── README_zh.md             # 中文说明文档
└── src                      # 源码目录
```

### 硬件配置目录

`config` 目录下的文件为适配各类开发板的配置文件。若您已基于本应用工程完成了新板的适配，可在该目录下新增相应的适配配置文件。

```shell
├── config       
│   └── TUYA_T5AI_BOARD_EYES.config    # T5AI_BOARD 开发板 + 双眼屏配件
```

### 头文件目录

```shell
├── include
│   ├── app_chat_bot.h       # 聊天机器人功能头文件
│   ├── app_display.h        # 显示模块头文件
│   ├── reset_netcfg.h       # 设备上下电重置功能头文件
│   └── tuya_config.h        # 设备授权码等信息配置
```

### 源文件目录

```shell
└── src
    ├── app_chat_bot.c       # 聊天机器人功能实现
    ├── display              # 显示界面模块
    ├── reset_netcfg.c       # 设备上下电重置功能
    └── tuya_main.c          # 应用入口
```

#### 显示模块

```shell
├── display                  # 显示界面模块
│   ├── app_display.c        # 显示模块主控制文件
│   ├── CMakeLists.txt       # 显示模块的 CMake 配置
│   ├── image                # 图片资源目录
│   ├── tuya_lvgl.c          # LVGL 与应用的适配文件
│   ├── tuya_lvgl.h          # LVGL 与应用的适配头文件
│   └── ui                   # UI 界面实现
│       ├── ui_display.h     # UI 模块公共头文件
│       └── ui_eyes.c        # 双眼情绪展示界面
```

## 应用配置

- **产品 PID**

  | 配置宏           | 类型   | 说明                               |
  | ---------------- | ------ | ---------------------------------- |
  | TUYA_PRODUCT_KEY | 字符串 | 产品的标识 ID，绑定了涂鸦 AI 智能体 |

- **选择对话模式**

  | 配置宏                                 | 类型 | 说明         |
  | -------------------------------------- | ---- | ------------ |
  | ENABLE_CHAT_MODE_KEY_PRESS_HOLD_SINGEL | 布尔 | 长按对话模式 |
  | ENABLE_CHAT_MODE_KEY_TRIG_VAD_FREE     | 布尔 | 按键对话模式 |
  | ENABLE_CHAT_MODE_ASR_WAKEUP_SINGEL     | 布尔 | 唤醒对话模式 |
  | ENABLE_CHAT_MODE_ASR_WAKEUP_FREE       | 布尔 | 随意对话模式 |

- **选择唤醒词**

  该配置只会在对话模式选择 **唤醒对话** 和 **随意对话** 两种模式下才会出现。

  | 配置宏                                | 类型 | 说明                |
  | ------------------------------------- | ---- | ------------------- |
  | ENABLE_WAKEUP_KEYWORD_NIHAO_TUYA      | 布尔 | 唤醒词为 “你好涂鸦” |
  | ENABLE_WAKEUP_KEYWORD_NIHAO_XIAOZHI   | 布尔 | 唤醒词为 “你好小智” |
  | ENABLE_WAKEUP_KEYWORD_XIAOZHI_TONGXUE | 布尔 | 唤醒词为 “小智同学” |
  | ENABLE_WAKEUP_KEYWORD_XIAOZHI_GUANJIA | 布尔 | 唤醒词为 “小智管家” |

## 工作流程

该工程依赖应用组件 [ai_audio](./ai-components/ai-audio-asr-impl.md)，该组件主要实现了采集音频、播放音频、创建云端 AI 会话等功能。

- **长按对话模式**

  ![](/img/applications/your_chat_bot/zh/long_talk.svg)

- **按键对话模式**

  ![](/img/applications/your_chat_bot/zh/button_talk.svg)	

- **唤醒对话模式**

  ![](/img/applications/your_chat_bot/zh/wakeup_talk.svg)

- **随意对话模式**

  ![](/img/applications/your_chat_bot/zh/free_talk.svg)

## 编译工程

1. 安装与配置前置环境，详细请参考 [环境搭建](../../quick-start/enviroment-setup.md)。

2. 从 TuyaOpen 的根目录切换至应用目录。

   ```shell
   cd apps/tuya.ai/duo_eye_mood
   ```

3. 选择对应的开发板配置。

   ```shell
   tos.py config choice
   ```

4. 编译工程。

   ```
   tos.py build
   ```

## 适配新开发板
### 外设要求列表
TuyaOpen 支持的外设列表可参考 [外设驱动列表](../../peripheral/support_peripheral_list.md)。新增的开发板必须具备列表中所列的 **必要** 外设驱动。

  | 外设 | 外设组件 | 说明 | 是否必要 |
  | ---- | ------- | ---- | ------- |
  | 音频驱动 | audio_codecs | 支持采集 PCM 格式的音频数据，以及播放 MP3 格式的语音（参数为：16 位位宽、16 KHz 采样率、单声道） | 必要 |
  | 显示驱动 | Display | 带有两个 1.28 寸圆屏，两只眼睛。两个圆屏由同一个驱动接口控制，即两个圆屏展示的动画完全相同 | 必要 |
  | 指示灯驱动 | LED | 指示设备当前是否处于监听等状态 | 非必要 |
  | 按键驱动 | Button | 打断对话，按键对话模式下开启对话 | 非必要 |

### 适配开发板

关于如何新增和适配开发板，请参考 [适配新的板级驱动 Board](../../new-hardware/new-board.md)。

:::tip
开发板注册外设驱动硬件的统一入口是 `board_register_hardware`，该接口的实现是放在板级的文件夹中。

如需修改驱动的硬件配置（如修改引脚、芯片类型等），请在目标开发板的文件夹（`boards/目标开发环境/目标开发板`，如 `boards/T5AI/TUYA_T5AI_BOARD`）中进行修改。
::::

