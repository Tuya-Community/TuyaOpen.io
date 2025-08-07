---
slug: /72h-with-tuyaopen
title: '72H Adventure X 活动'
authors: [tuya, hsuanhanlai]
image: /img/home/tuyaopen-logo-social-preview.png
tags: [TuyaOpen, Contest]
---

<!-- truncate -->

# title: '52H 创业森林活动'
<!-- ![event](https://images.tuyacn.com/fe-static/docs/img/6d005a49-7b92-4602-af60-b7acca333eab.png) -->

> **本指南为大赛专用文档，旨在为参赛者提供全面的活动指引。**

<!-- ### 比赛信息 -->
<!-- - 活动时间：6/27 ~ 6/29（共 52 小时） -->

# 重要资源
<!-- - 涂鸦大赛 PPT：[PPT 介绍](https://tuyaopen-pu9rufi.gamma.site/) -->
- TuyaOpen 代码仓库：[GitHub](https://github.com/tuya/TuyaOpen)
- TuyaOpen 文档官网：[文档](https://tuyaopen.ai)

<!-- truncate -->

## TuyaOpen 与 TuyaOS

TuyaOpen 基于行业领先的 TuyaOS 架构开源，已获得全球 130 万开发者实践验证。TuyaOpen 提供了定义清晰的 API，便于开发支持多种 MCU 的 C/C++ 应用程序，深度简化了外设连接、云连接和安全性等复杂的开发流程。该框架能够大幅提升开发效率，助力您快速构建 AI + IoT 智能产品。

:::tip 如何选择？
参赛者可根据需求选择。如果您有 **视频 AI 能力集成** 或 **商业化场景** 的需求，建议优先选用 TuyaOS；如为其他场景或需求，则推荐生态更加开放的 TuyaOpen。
:::

### 主要差异对比

| 功能                  | TuyaOpen                                         | TuyaOS                                                      |
|-----------------------|--------------------------------------------------|-------------------------------------------------------------|
| 目标用户              | 开源开发者                                        | 商业合作开发者                                              |
| 源代码获取            | 完全开源，源码可访问                               | 商用代码部分开源，支持二次开发                               |
| 代码下载              | GitHub、Gitee 免费开源下载                        | VSCode 插件 WindIDE + 邮箱授权获取代码                      |
| 开发环境              | Linux、Windows、Mac                               | 仅支持 Linux，其他平台需用虚拟机                             |
| Tuya 云端AI组件 | ✅                                                | ✅ 最新最快                                                  |
| Tuya 语音 AI ASR 能力 | ✅                                         | ✅                                                          |
| Tuya 视频 AI 能力    | ❌ 暂不支持                                  | ✅                                                          |
| Tuya 云大模型定制化能力 （LLM/Prompt/Workflow/RAG）   | ✅                                  | ✅                                                          |
| 源码定制能力          | 高度源码定制                                      | API 级定制，链接库，商业功能组件更丰富                       |
| 芯片支持              | Tuya T 系列 / ESP 系列（详见支持列表）             | Tuya T 系列                                                 |
| 开发语言              | C/C++                                            | C/C++                                                       |
| 文档支持              | [TuyaOpen 官网](https://TuyaOpen.ai)              | [Tuya 开发者官网](https://developer.tuya.com/cn/docs/iot-device-dev) |
| 贡献源码或二次开源     | ✅                                                | 遵循 Copyright License                                      |
| 硬件生态              | 持续增加芯片、开发板和外设驱动                     | 采用推荐选型方案                                            |


# 嵌入式软件开发 
## TuyaOpen 专区
### 文档
- TuyaOpen 文档：[文档](/docs/about-tuyaopen)
- AI API 代码模块：[代码模块](https://github.com/tuya/TuyaOpen/tree/master/src/tuya_ai_basic)

### 示例总览

善用示例代码，可以减少开发成本，避免 “重复造轮子”。

- your chat bot：[点击前往](https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/your_chat_bot)
    - T5/ESP32 跨平台支持示例
    - 语音 ASR + Tuya 云端大模型
    - 连接 AI Prompt/Agent 能力
    - 情绪感知交互能力
    - 模块组件：`屏幕` + `Mic` + `Speaker` + `Wi-Fi` + `按键`

- your chat bot：[点击前往](https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/your_chat_bot)    
    - T5/ESP32 跨平台支持示例
    - 语音 ASR + Tuya 云端大模型
    - 连接 AI Prompt/Agent 能力
    - 情绪感知交互能力
    - 做种唤醒模式
    - App 控制机器人交互
    - 情感识别 -> 动作的能力
    - 模块组件：`屏幕` + `Mic` + `Speaker` + `Wi-Fi` + `按键` + `舵机`
- Switch Demo：[点击前往](https://github.com/tuya/TuyaOpen/tree/master/apps/tuya_cloud/switch_demo)
    - 基础原生示例演示设备作为 IoT LED 灯可连接至涂鸦云，被 Tuya 云服务/App 控制
    - DP 消息事件处理
    - 基础配网，硬件鉴权过程

- 基础组件 Demo：[点击前往](https://github.com/tuya/TuyaOpen/tree/master/examples)
    - 蓝牙/Wi-Fi
    - SPI I2C ADC 基础接口协议 Demo
    - 协议 Demo
    - 屏幕渲染框架 LVGL 示例
    等....


## TuyaOS 专区

Tuya Wind IDE 是面向基于 TuyaOS EasyGo 的开发者提供的一站式集成开发环境，您可以 [点击前往](https://developer.tuya.com/cn/docs/iot-device-dev/tuyaos-wind-ide)。

### AI 基建 Tuya Wukong AI 嵌入式设备端
- Tuya Wukong AI：[点击前往](https://developer.tuya.com/cn/docs/iot-device-dev/ai-hardware?id=Kectwmx9isrgl)
- 能力地图：[点击前往](https://developer.tuya.com/cn/docs/iot-device-dev/wukong-abi-map?id=Keedxu1netj62)
- 多模态交互：[点击前往](https://developer.tuya.com/cn/docs/iot-device-dev/tuyaos-wukong-capability-multi-media)

---

## Tuya 云平台，零代码云端 AI 开发
- 注册 Tuya Developer 云服务，[点击前往](https://auth.tuya.com/register)
- 参考文档：
    - [智能体开发平台](https://developer.tuya.com/cn/docs/iot/ai-agent-management)
    - [让 AI 直接调函数 - 设备自控指令功能](https://developer.tuya.com/cn/docs/iot/Self-control?id=Kep3yhifdrvah)

---

# 硬件开发板
## 开发板
### 涂鸦 T5AI Board 开发板
![T5-AI Board Pinout](https://images.tuyacn.com/fe-static/docs/img/6b7ab959-0635-4293-991b-b8dda293614b.jpg)

- 资料文档入口：[T5AI Board Overview](/docs/hardware-specific/t5-ai-board/overview-t5-ai-board)
- I/O Pin 脚高清下载：[Pinout](/docs/hardware/T5-AI-Board-Pinout-v102.pdf)
- 如何快速编译项目 + 烧写？：[教程](/docs/quick-start/enviroment-setup)

<!-- ### 涂鸦 T5 mini 开发板（第三方社区开发板）

- 优势是更小尺寸，适合空间要求较高方案。
- 使用方法，您可以参考 [T5AI Board](/blog#%E6%B6%82%E9%B8%A6-t5ai-board-%E5%BC%80%E5%8F%91%E6%9D%BF)，功能较为接近。

### 地瓜机器人 RDK X5

参考文档：[RDK X5 文档](https://developer.d-robotics.cc/information)

#### RDK 如何与 TuyaOpen 整合?

>担心单独 T5 的算力不够吗？让 RDK X5 来支持你的边缘计算需求！使用 RDK + TuyaOpen 方案来实现本地实时模型推理和云大模型的混合架构。
- Tuya App 远程控制 RDK X5 能力。
    - RDK + TuyaOpen 框架方案 Demo：[教程](/docs/rdk/rdk-originbot-with-tuya-dp-control-demo.pdf)
- RDK X5 与 Tuya T5 芯片混合框架
    - 边缘计算 + 云计算的结合：[教程](https://diguazhandian-rdkx5-tuya-t4otm0d.gamma.site/) -->

---

# 涂鸦硬件资源
- 为避免资源滥用，优先支持有明确 Idea 的团队领取/使用，也建议您的团队携带自己熟悉的工具。
- 开发板必须选用大赛指定 T5，其他外设器件/硬件和产品形态，则鼓励您自备携带参赛。

关于现场可用硬件资源的数量，请参考下文：

### 开发板
- [涂鸦 T5-AI 开发板](/docs/hardware-specific/t5-ai-board/overview-t5-ai-board)：15
- 涂鸦 T5 mini 开发板：10
<!-- - 地瓜机器人 RDK X5：20 -->

### 外设配件
- 喇叭（3020，4 欧，3 瓦）：20
- 显示屏（1.54寸，ST7789 ）：10
- 电池包（2000 mAh）：10
- 舵机（MG90S）：40
- 传感器套件（手势、触摸、光敏、空气、温湿度、超声波等 10 余种）：4 
- 杜邦线/数据线：若干

### 工具 

- 正点原子 HP15 智能加热台：2 台
- 正点原子 DM40 数字万用表：2 台
- 正点原子 T80/T80P 智能电烙铁：2 台
- 正点原子逻辑分析仪：2 台
- 可调直流电源（Max 60V/5A）：1 台
- 热风枪：1 台
- 热胶枪：1 台
- 螺丝刀：1 套
- 3D 打印机（拓竹 P1S+AMS）：5 台

---


# 涂鸦技术支持 🛠️📋

活动现场有涂鸦的技术老师和地瓜机器人的老师们，会在活动现场提供适当的技术支持。

:::tip
如果有较为复杂的问题，或是活动当天在现场没有得到及时的支持，可以梳理好问题后在 Github 上面提 Issue 📝，涂鸦会尽快安排人员支持。
:::

Issue Link：https://github.com/tuya/TuyaOpen/issues

### Issue 问题格式

``` shell
### 带上`【52活动】` 帮助工作人员识别活动问题
Issue 标题: 【AdventureX活动】 (bug/question/hardware): {明确清晰的问题描述}
Issue 内容：
- 开发环境：Mac/Win/Linux 💻
- 芯片平台：T5/RDK 
- 问题描述：清晰简洁的表达问题
- 问题现象：有什么规律可循，尝试过那些方法修复过了？
- 期望现象：预期的解决结果
- Log 日志：附上 Log 有助工作人员帮你分析问题 
```

---

# 常见问题

1. 如何开发 ESP32？
tos.py 工具能完成编译和烧写环节。代码项目选对板级 config 配置为 ESPxxx.config, tos.py `build` 和 `flash` 均跨平台支持。
2. TuyaOS 和 TuyaOpen 有什么区别？
本文有详细介绍，请参考上文 **TuyaOpen 与 TuyaOS** 章节。如果您有 **视频 AI 能力集成** 或 **商业化场景** 的需求，建议优先选用 TuyaOS；如为其他场景或需求，则推荐生态更加开放的 TuyaOpen。
3. 什么是 PID？
硬件关联云服务的 Product-ID。与云服务绑定的号码。
4. 什么是授权码？
硬件访问云服务的安全鉴权码确保硬件安全。UUID/Key 为一组授权码。注意，TuyaOS 和 TuyaOpen 的授权码不能混用。即使能力和服务功能相似，授权也互不兼容。
5. 是否可以在 Windows 系统下开发？
可以的，现在 Master 主分支可以体验。
6. 是否可以在 MacOS 下开发？
- 可以的，现在 Master 主分支可以体验。
- 内测功能，可以在 Mac x86/ARM 环境下开发，但是可能有未发现问题。优先建议 Linun 和 Windows。
7. MacOS M-系列 编译 T5 项目时遇到 lwip 编译错误。
Mac gcc版本差异，在T5芯片使用时，需要做如下修改
已解决 Issue
