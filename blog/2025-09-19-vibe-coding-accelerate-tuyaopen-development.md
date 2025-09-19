---
title: "AI Coding 助力 TuyaOpen 开发"
date: 2025-09-19
authors: [tuya]
tags: ["AI", "TuyaOpen", "Development", "Tutorial"]
lang: "zh"
---

# AI Coding 助力 TuyaOpen 开发

## 概述

在 AI 技术爆火的当下，人们身边的寻常物件都可以被重新定义并赋予智能。今天，我们就来解锁一个有趣的玩法：用 Tuya T5AI-Board 开发板打造 **专属的智能桌面聊天机器人**。

依托 TuyaOpen 框架与 Tuya  智能体的强大支撑，哪怕是零基础的新手，也能借助 AI Coding 工具轻松实现 "0 代码" 开发：它不仅能敏锐捕捉对话中的情绪波动，实时展示对应图片传递情绪张力。更让人惊喜的是，短时间内就能让开发板摇身一变，成为一台能畅玩的游戏机，轻松实现从聊天助手到娱乐设备的跨界变身。

### 效果图

| 初始效果 | 最终效果 |
| --- | --- |
| <img alt="初始效果" src="https://images.tuyacn.com/content-platform/hestia/175609316343564ed226c.png" width="640"  /> |<img alt="最终效果" src="https://images.tuyacn.com/content-platform/hestia/1756101670562a63c3c0a.png" width="700"  />|

### 关于 TuyaOpen

TuyaOpen 是一个面向 AIoT 行业的开源、开放的开发框架，基于成熟的商业级 IoT 系统 TuyaOS 构建而成。它继承了跨平台、跨系统、组件化和安全合规等核心特性，已通过全球亿级设备和百万级用户的实践验证。

TuyaOpen 集成了端侧 AI 推理引擎，支持涂鸦云智能体中枢，支持端云融合的多模态 AI 能力。您可以无缝调用国内合规的大模型（如 DeepSeek、通义千问、豆包）或灵活对接全球顶尖的 AI 服务（如 ChatGPT、Claude、Gemini）。通过多样化的工具生态，能够实现文字和语音对话、图片生成、视频生成等多种 AI 功能。

## 硬件介绍

首先，请了解 [T5AI-Board 开发板](https://developer.tuya.com/cn/docs/iot-device-dev/T5-E1-IPEX-development-board?id=Ke9xehig1cabj) 相关信息。

关于开发板的详细参数，请参考下表：

| 设备 | 参数 |
|----------|---------------------|
| T5AI-Board | 主控模组：<ul><li>T5-E1-IPEX 模组 ARMv8-M Star (M33F) @480MHz</li><li>16 KB ITCM + 16 KB DTCM</li><li>8 MB SiP Flash</li><li>16 MB SiP PSRAM</li><li>640 KB Share SRAM |
| 屏幕 | <ul><li>RGB565 触摸屏</li><li>480 x 320 像素</li><li>显示驱动芯片：ILI9488</li><li>触摸驱动芯片：GT1151</li></ul>  |

![T5AI-Board 开发板.png](https://images.tuyacn.com/content-platform/hestia/17561085897400828f8e3.png)

## 克隆仓库和编译烧录

在浏览器中搜索 **TuyaOpen.ai** 进入 TuyaOpen 的 Git 仓库，并复制如下所示的仓库链接。将 TuyaOpen 的 SDK 克隆到本地，然后将 AI chatbot 项目 `your_chat_bot` 添加到对话中，让 AI Coding 工具自动执行编译和烧录。

- Github 仓库：https://github.com/tuya/TuyaOpen
- Gitee 仓库：https://gitee.com/tuya-open/TuyaOpen

### 提示词模板

您可以参考以下模板编写提示词为 AI Coding 工具下指令，指导其执行编译和烧录工程：

```
帮我编译和烧录这个工程
编译环境搭建
帮我编译和烧录这个工程，编译和烧录方法参考 readme 文档和下方的链接
环境搭建
https://tuyaopen.ai/zh/docs/quick-start/enviroment-setup
编译：
https://tuyaopen.ai/zh/docs/quick-start/project-compilation
烧录：
https://tuyaopen.ai/zh/docs/quick-start/firmware-burning
```

![提示词模板.png](https://images.tuyacn.com/content-platform/hestia/1756191238cfcb3b4eb39.png)


## 授权开发板

如果烧录完成后在 **涂鸦** App 中仍无法发现设备，则需要对开发板进行授权。

打开 `your_chat_bot` 项目，在 `apps/tuya.ai/your_chat_bot/include/tuya_config.h` 文件中设置以下参数：
- `TUYA_OPENSDK_UUID`：UUID 可免费获取，请扫描下方二维码进群，并联系涂鸦工作人员领取。
- `TUYA_OPENSDK_AUTHKEY`：Authkey 可免费获取，请扫描下方二维码进群，并联系涂鸦工作人员领取。

<img alt="群二维码" src="https://images.tuyacn.com/content-platform/hestia/1756115540e394937a07f.png" width="300"  />

![UUID.png](https://images.tuyacn.com/content-platform/hestia/17561097834516e414c77.png)

详细的授权操作，请参考 [设备授权](https://tuyaopen.ai/zh/docs/quick-start/equipment-authorization)。

:::info
如果您购买的 T5 模组已烧录了 TuyaOpen 的授权码，则无需填写 UUID 和 Authkey。
:::

## 准备图片

在图片生成网站，生成 "开心、愤怒、悲伤、震惊、困惑、喜欢、思考" 7 种情绪所对应的图片，然后将图片的像素修改为 **240 x 240**（因为 T5 开发板 Flash 空间有限，图片越大占用的 Flash 空间越大，所以需要缩减图片大小）。

目前涂鸦 Agent 会根据对话返回最多 21 种情绪值，如下表所示：

| Emoji | Expression | Emoji | Expression | Emoji | Expression |
|-------|------------|-------|------------|-------|------------|
| 😶 | Neutral | 😳 | Embarrassed | 😌 | Relaxed |
| 🙂 | Happy | 😯 | Surprise | 🤤 | Delicious |
| 😆 | Laughing | 😱 | Shocked | 😘 | Kissy |
| 😂 | Funny | 🤔 | Thinking | 😏 | Confident |
| 😔 | Sad | 😉 | Winking | 😴 | Sleepy |
| 😠 | Angry | 😎 | Cool | 😜 | Silly |
| 😭 | Crying | 🙄 | Confused | 😍 | Loving |

## 在项目中添加图片

在嵌入式开发中，要实现在屏幕上显示图片通常较为复杂。日常手写代码时，需要将图片裁切成固定大小，然后再转换为 C 数组的形式，同时需要考虑屏幕尺寸、图片存放位置等细节要素。

因此，在使用 AI Coding 工具时，提示词的描述越详尽具体，最终实现的效果往往越精准理想。若存在可参考的案例、代码片段或需求文档，建议尽量提供给工具作为参考；若能提前明确开发所需的技术细节，更能进一步提升工具输出结果的贴合度，减少后续调整成本。

例如，在让 AI 实现图像屏幕显示功能时，需明确指令其先将图像转换为 C 数组格式；否则，AI 可能会默认采用文件路径调用方式，直接尝试打开 PNG 或 JPG 等格式的图像文件。此外，图像编码格式多样（如 RGB565、RGB888 等），若未预先指定，即便最终能通过多次调试编译实现显示效果，也会显著增加调试迭代的次数与成本。

### 典型图片编码格式

下表列举了常见的 PNG 图片的编码格式：

|        场景        |      典型编码格式及说明             |
|-----------------|----------------------|
|   电脑桌面显示 PNG  |  <ul><li>RGB24：标准真彩色</li><li>ARGB32：支持透明度</li></ul>    |
| 嵌入式 UI（如 LVGL） | RGB565/Indexed Color：为节省资源使用 16 位色或索引色 |
|    游戏/视频渲染   |        RGBA8888：高性能 GPU 通常使用 32 位格式  |

### 提示词模板

为使 AI Coding 工具更精准地理解需求，需对目标设备支持的图片格式、尺寸规格、图片存放位置等参数进行明确限定。此举可有效减少编译调试次数，提升开发效率，具体可参考如下模板进行配置。

```
目标：帮我把 image 这个文件夹里的图片，添加到 your_chat_bot 项目中。替换当前项目 src/display/ui/ui_chatbot.c 中 emotion 显示的文本表情，更改为根据 emotion 值显示 image 文件夹中的图片。图片格式使用 LVGL RGB565 格式，图片需要转换为 C 数组的形式。
约束：如果 ROM 溢出，减少到 4 个主要图片（Happy、Sad、Angry、Love）
技术：当前项目中使用的屏幕大小是 H 480、W 320 像素，使用 LVGL V8 版本 GUI 库
验证：编译成功且无 ROM 溢出，烧录后图片正常显示
备选：如果 240x240 失败，尝试 120x120 或进一步减少图片数量
```

![提示词模板.png](https://images.tuyacn.com/content-platform/hestia/1756114763298dd9e9663.png)

AI Coding 工具在精准识别到您的核心意图后，能够在目标项目中自动生成基于 Python 开发的图片转换工具。

![生成工具.png](https://images.tuyacn.com/content-platform/hestia/1756115044f42f98b5006.png)

## 增加 2048 游戏界面

在 2048 游戏界面开发前，需先通过 AI Coding 工具规划界面设计方案。将控制器芯片性能的限制、屏幕像素尺寸等信息提供给 AI Coding 工具后，工具会规划出 4 × 4 棋盘的游戏界面；若实际运行性能达标，后续可考虑采用 5 × 5 棋盘布局。

<img alt="示例图" src="https://images.tuyacn.com/content-platform/hestia/17561158982c6d7812f26.png" width="500"  />

这一步骤的目的是在下达功能实现指令前，预先确认 AI Coding 工具的最终输出效果是否与预期一致；若存在偏差，可在提示词中补充限定条件以修正。

### 提示词模板

检查 AI Coding 工具规划的 2048 游戏界面方案后，下达指令要求其创建 2048 游戏界面：需在屏幕中设置切换按钮，实现聊天界面与游戏界面的交互切换；同时，2048 游戏界面需单独以 UI 文件格式保存，方便进行项目管理。


```
目标：帮我在 your_chat_bot 项目中添加一个 2048 游戏界面，只需要实现 2048 游戏基础功能，有分数统计。能够通过一个按钮在聊天界面和游戏界面来回切换。
约束：当前项目中的屏幕分辨率大小 H 480，W 320 像素，游戏界面是 4*4 的棋盘。
验证：编译成功且无 ROM 溢出，烧录后图片正常显示

```

![提示词.png](https://images.tuyacn.com/content-platform/hestia/1756116811b2d24299207.png)

## 效果体验

至此，基于 TuyaOpen 开源对话项目 `your_chat_bot` 开发的桌面聊天机器人已开发完成，该机器人支持表情图片替换功能，以及与 2048 游戏界面集成。

此处附上最终生成的示例固件文件：[your_chat_bot_QIO_1.0.1.bin](https://drive.weixin.qq.com/s?k=AGQAugfWAAkS4ye03BAbQAqAb1AFU)，您可以获取固件并完成烧录，来体验最终的效果。

## 提示词经验总结

- 在项目或 Demo 开发过程中，建议先通过 AI 工具梳理并总结整体功能架构，再依据架构下达开发指令，可提升效果。

- 前置提示越详尽，最终实现的效果越好。若存在参考资料，应尽量提供给 AI 工具；若能预先明确技术细节则更佳。例如，在实现图像屏幕显示功能时，需指定图像需转换为 C 数组格式，且需明确具体编码格式（如RGB565、RGB888等）；若未指定编码格式，将显著增加调试次数。

- 关于提示词，您可以参考以下模板：
    
    ```
    目标：[具体要实现什么]
    约束：[有什么限制条件]
    技术：[使用什么工具/方法]
    验证：[如何确认成功]
    备选：[如果失败怎么办]
    ```
    例如：
    ```
    目标：将情绪图片从 64x64 改为 240x240 像素
    约束：如果 ROM 溢出，减少到 4 个主要图片（Happy、Sad、Angry、Love）
    技术：使用 png_to_c_array.py 工具重新生成，更新 CMakeLists.txt
    验证：编译成功且无 ROM 溢出，烧录后图片正常显示
    备选：如果 240x240 失败，尝试 120x120 或进一步减少图片数量。
    ```

## 快速上手项目推荐

创意始于构想，T5 开发板助您落地！即刻动手，仅需一个周末即可完成首个项目，[官方教程](https://tuyaopen.ai/zh) 为您提供全程技术支持。

### 智能语音管家

如果您初次接触 AI 开发，为您推荐智能语音管家项目，该项目可以实现三大核心功能：
- 通过语音指令控制家居设备，如灯光、空调。
- 响应语音指令执行音乐播放、提醒设置等操作。
- 支持自定义专属语音唤醒词。


### 宠物小助手

如果您是热爱宠物的开发者，宠物小助手项目可以帮助实现：
- 自动喂食：实现宠物喂食自动化，解决用户出差期间的宠物喂养需求。
- 远程逗猫、遛狗功能：支持远程互动，满足用户不在场时与宠物的互动需求。


### 创意灯光艺术

该方案尤其适合计划开发炫酷风格作品的创客群体，适用于开发以下两类产品：
- 声控变色灯
- 音乐律动灯带
