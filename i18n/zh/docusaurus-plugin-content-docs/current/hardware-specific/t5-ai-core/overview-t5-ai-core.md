---
title: "T5AI-Core 概述"
---

# **T5AI-Core** 开发套件

![T5-AI Core DevKit](https://images.tuyacn.com/fe-static/docs/img/02037ea4-3282-4c8c-b2ec-c9c1894e8064.png)


## 软件编译配置

板级配置文件定义了外设驱动、引脚映射、BSP 包以及第三方库等核心功能组件的配置参数。通过使用开发板预配置的板级配置文件，可以显著降低硬件适配和驱动开发的工作量，提高开发效率。


:::tip 想要开发新的外设？
**Config 配置特点：**
- **如需新增外设，可直接在应用层编写驱动。** BSP 驱动主要用于板卡内部固化的外围器件。
- 不同应用的外设需求可能存在配置差异，需要根据具体需求调整 Config 文件。
- 不同应用需求可能需要配置不同的第三方库参数。
- <span style={{color: 'red'}}><strong>建议</strong>以提供的 Config 初始配置文件作为板级配置基础</span>，在此基础上进行二次开发和功能扩展。
:::

#### 怎么使能板级 Config? 请参阅：[TOS 工具指南 - 配置选择](/docs/tos-tools/tos-guide#config-choice)。

<table class="hw-config-flag-table">
  <tbody>
    <tr>
      <th>编译标志</th>
      <td><code>TUYA_T5AI_CORE.config</code></td>
      <td>T5AI-Core + 板载 Mic/Speaker BSP 板卡配置 - <a href="https://github.com/tuya/TuyaOpen/blob/master/apps/tuya.ai/your_chat_bot/config/TUYA_T5AI_CORE.config">配置文件</a></td>
    </tr>
    <tr>
      <th>BSP驱动源码</th>
      <td colspan="2"><a href="https://github.com/tuya/TuyaOpen/tree/master/boards/T5AI/TUYA_T5AI_CORE">T5AI-Core BSP 驱动源码</a></td>
    </tr>
  </tbody>
</table>

---

## 概述
涂鸦 T5AI-Core 开发套件是一款基于 T5-E1 模组的高集成度语音核心开发板。T5-E1 模组由涂鸦智能自主研发，集成了嵌入式 Wi-Fi 与蓝牙功能，适用于多种智能硬件场景。T5AI-Core 开发板板载 1 个麦克风和 1 个扬声器，支持本地语音识别与音频播放，满足语音交互应用需求。

开发板配备 44 Pin 排针，便于开发者进行快速的 AIoT 项目开发与原型验证。板载锂电池电源管理电路，支持低功耗设计，适合移动和便携式智能设备的开发。

本开发板为开发者提供了丰富的硬件接口和完善的语音功能，是 AIoT 语音交互应用开发的理想选择。

<div align="center">
  <img src="https://images.tuyacn.com/fe-static/docs/img/dd9d442f-bd51-4ce0-bbb5-687058270bff.jpg" alt="" width="500" />
  <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
    <img src="https://images.tuyacn.com/fe-static/docs/img/6a1310df-c48c-4c71-b52e-483ba4b49bc1.jpg" alt="" width="250" />
    <img src="https://images.tuyacn.com/fe-static/docs/img/2475d214-9adf-4aaa-a1fe-67c88b50fbd2.jpg" alt="" width="250" />
  </div>
</div>

---
## 开发套件亮点
- 涂鸦 T5 MCU 模组（Wi-Fi 2.4 GHz + 蓝牙 LE 5.4）
- ARMv8-M Star（M33F）处理器，支持高达 480 MHz
- 8 MB Flash（模组芯片内部）
- 16 MB RAM（模组芯片内部）
- 串行固件下载和调试日志
- 1 通道麦克风
- 1 通道回声采样
- 1 通道扬声器
- 模块引脚引出
- 板载 2.4 GHz Wi-Fi 天线
- USB 供电 + 双路串口芯片
- 板卡尺寸：73 mm × 29 mm × 11 mm（不含排针）/17 mm（含排针）


---
### 硬件架构图
![T5-AI Core Hardware Diagram](https://images.tuyacn.com/fe-static/docs/img/e230929b-39a7-4851-bdb8-d614624a48fc.jpg)

### 设计理念与引脚可用性

T5AI-Core 开发板在设计之初，充分兼顾了便携性与开发灵活性。板载仅集成了如 **电池供电**、**固件烧录与调试**、**音频输入输出** 等核心功能模块，确保开发板开箱即用，能够满足语音交互等主要应用场景的需求。  
  
除上述核心功能外，其余所有功能引脚均通过 44 Pin 排针完整引出，大幅提升了硬件的扩展性与可访问性。开发者可根据实际项目需求，灵活连接各类外部传感器、执行器或其他外设，极大地方便了原型开发与功能验证。这种设计不仅保证了开发板结构的简洁高效，也为后续功能拓展和定制开发提供了坚实的硬件基础。对于更多 I/O 接口的需求，PCB 板面还预留了焊盘测试点，在保持开发板小巧尺寸的同时，赋予其全面的扩展能力。


## 硬件详细说明

### 电源管理系统

#### 电源输入
- **Type-C USB 2.0 接口**: 提供 5 V 主电源输入，同时支持 USB 双路串口的固件烧写和日志调试。
- **JST PH 1.25 mm 电池连接器**: 支持 3.7 V 锂电池供电，实现便携式应用。


  <div style={{ display: 'flex', justifyContent: 'left', gap: '16px', flexWrap: 'wrap' }}>
    <img src="https://images.tuyacn.com/fe-static/docs/img/b1f63d5f-80c7-44c6-9cbc-82e97461c6b2.png" alt="" width="150" />
    <img src="https://images.tuyacn.com/fe-static/docs/img/3911e3dd-680f-48d0-a448-f764bec39d67.png" alt="" width="150" />
  </div>


#### 电源开关
拨动开关作为系统的主电源开关，上游电源来自 **USB** 或 **锂电池** 的供电。

:::warning
请确保在进行固件烧录时已打开电源开关。
:::

<p align="center">
  <img src="https://images.tuyacn.com/fe-static/docs/img/84a7c2b7-020c-4004-aab8-c0cbd6f425a4.png" alt="" width="150" />
</p>



#### 电源管理芯片
**ETA6003 电池管理芯片**: 
- 接收来自 Type-C USB 的 5 V 和电池连接器的 3.7 V 输入。
- 管理电池充电和电源分配。
- 输出 5 V 到电源开关。
- 控制电源指示灯（PW LED）和充电指示灯（Charge LED）。

#### 电源开关和稳压
- **电源开关**：控制主系统电压（System Voltage，VSYS），接收来自 ETA6003 的 5 V 输入。
- **LN2220PAR 升压模块**：将 VSYS 升压至稳定的 5 V 电源域，为音频放大器等大功率组件供电。
- **RY3408 3.3 V 稳压器**：将升压后的 5 V 降压至 3.3 V 电源域，为 T5-E1 模组和数字电路供电。

## 电源特性
- 双电源输入：USB 5 V 和锂电池 3.7 V。
- 智能电源管理，支持电池充电和电源切换。
- 多级稳压，提供稳定的 5 V 和 3.3 V 电源域。
- 低功耗设计，适合便携式应用。


:::warning 电池要求
- **电池类型**：推荐使用 3.7 V 锂电池，放电倍率需达到 1 C，以保证系统稳定供电。
- **容量建议**：根据应用需求选择合适容量，常见容量为 500 mAh ~ 2000 mAh。
- **极性注意**：连接电池时请严格按照正负极标识接线，避免反接导致设备损坏。
- **保护电路**：建议选用带有过充、过放和短路保护功能的锂电池，提升使用安全性。

<p align="center">
  <img src="https://images.tuyacn.com/fe-static/docs/img/9eade1d0-f90d-41ed-b2de-686f3e9a255e.jpg" alt="" width="250" />
</p>

:::


### 充电指示灯逻辑

ETA6003 电池管理芯片负责控制充电指示灯（Charge LED），用于显示当前的充电状态。其工作逻辑如下：

<p align="center">
<img src="https://images.tuyacn.com/fe-static/docs/img/eed5a4d5-8eba-4d6a-87a3-c641cf0facdd.png" alt="" width="150" />
</p>

- 当拨动开关置于 **On** 位置时，Power 指示灯点亮，表示系统已上电。
- **充电中**：当锂电池正在充电时，Charge LED 会点亮，表示系统处于充电状态。
- **充满电**：当锂电池充满后，Charge LED 会自动熄灭，表示充电已完成。
- **未连接电池或无充电**：Charge LED 保持闪烁状态。

:::warning
如需判断充电状态，可观察开发板上的 Charge LED 是否点亮。
:::



## 核心处理单元

#### T5-E1 Wi-Fi + BT 模组
- **处理器**：ARMv8-M Star（M33F）架构，主频高达 480 MHz。
- **存储**：内置 8 MB Flash 和 16 MB RAM。
- **无线通信**：集成 2.4 GHz Wi-Fi 和蓝牙 LE 5.4 功能。
- **供电**：由 3.3 V 电源域供电。
- **功能**：作为开发板的核心处理单元，负责所有计算、通信和控制系统。

<p align="center">
<img src="https://images.tuyacn.com/fe-static/docs/img/28b35dec-a9a0-4543-ba41-b9c3f71a8527.png" alt="" width="250" />
</p>

## 通信接口

#### USB 串口通信
- **CP2105 双通道串口芯片**： 
  - 连接 Type-C USB 的 DP/DN 信号线。
  - 提供双路 UART 下载/调试功能。
  - 支持固件烧录和调试日志输出。
- 驱动安装：请参考 [USB 转串口驱动安装](#usb-转串口驱动安装)。

## 用户交互组件

### 用户输入输出
| 组件         | 引脚    | 功能描述                                   |
| ------------ | ------- | ------------------------------------------ |
| 用户 LED     | P9      | 由 T5-E1 模组控制的用户指示灯，连接至 GPIO 引脚 P9 |
| 用户按钮     | P29     | 用户输入按钮，连接至 T5-E1 模组的 GPIO 引脚 P29   |
| 复位按钮     | RST     | 专用复位按钮，向 T5-E1 模组发送复位信号         |
<div style={{ display: "flex", justifyContent: "center", gap: "24px", alignItems: "center" }}>
  <img src="https://images.tuyacn.com/fe-static/docs/img/2e0043dc-59d8-4900-b5d1-524de845131d.png" alt="" width="250" />
  <img src="https://images.tuyacn.com/fe-static/docs/img/cd0b54a3-d292-4d74-b91d-c474f51c89c1.png" alt="" width="250" />
</div>

## 音频系统
#### 音频采样规格
- **标准采样率**: 16 KHz
- **采样位深**: 16 位

T5-AI Core 的音频系统 **默认采用 16 KHz 采样率和 16 位采样精度**，适用于语音识别、音频处理等应用场景，兼容主流音频算法和协议。

## 音频输入

T5 模组支持两路模拟麦克风输入，方便音频采集和回采。本开发板的音频输入通道分配如下：

| 通道  | 用途说明           |
|-------|--------------------|
| CH1   | 麦克风音频输入     |
| CH2   | 扬声器回采信号输入（支持打断功能） |

- **板载模拟麦克风**：集成式麦克风，提供模拟音频输入到 T5-E1 模组。
<p align="center">
  <img src="https://images.tuyacn.com/fe-static/docs/img/e23b3b2c-f268-4a45-8271-2945a32a094d.png" alt="" width="250" />
</p>
- **回采电路（Loopback）**：音频回采电路，用于音频测试和处理，支持回声消除（Acoustic Echo Cancellation，AEC）和回声抑制功能，连接至 T5-E1 模组。

## 音频输出
- **1 W 音频放大器**：
  - 由 5 V 电源域供电。
  - 接收来自 T5-E1 模组的音频信号。
  - 输出放大后的音频到扬声器连接器。
- **JST PH 1.25 mm 扬声器连接器**：外接扬声器输出接口，支持 **4Ω 3W** 扬声器。
<p align="center">
  <img src="https://images.tuyacn.com/fe-static/docs/img/ebb095cd-be13-472d-99a0-bc4b0ff15242.png" alt="" width="250" />
</p>

:::warning 喇叭选型
推荐使用阻抗为 **4 Ω**、功率为 **1 W ~ 3 W** 的扬声器。请确保所选扬声器具备良好的回声消除和噪声抑制性能，以满足音频系统的需求。
:::

## 扩展接口

### 44 Pin 2.54 mm 排针
- **电源引脚**：提供 5 V 和 3.3 V 电源输出。
- **信号引脚**：引出 T5-E1 模组的各种信号，包括 GPIO、UART、SPI、I2C 等。
- **功能**：便于外部电路连接和功能扩展，支持快速原型验证。

以下为引脚的复用与功能定义说明：
<p align="center">
  <img src="https://images.tuyacn.com/fe-static/docs/img/e902e201-77b8-4c83-aa71-1c0dae77cfb3.png" alt="" width="450" />
</p>
<p align="center">
  <img src="https://images.tuyacn.com/fe-static/docs/img/683ec5fa-9c4e-401a-b645-e8120628ac03.png" alt="" width="400" />
</p>



## USB 主机接口（USB Host 功能扩展）
T5 模组支持一路 USB Host，可连接多种 USB 设备，如 USB 摄像头、USB 串口（CDC）等，满足丰富的外设扩展需求。
<p align="center">
  <img src="https://images.tuyacn.com/fe-static/docs/img/f7b6d377-2a65-4e23-b6f3-d2c50cd42168.png" alt="T5 USB Host 接口示意图" width="200" />
</p>

## 固件下载串口 UART（复用）
T5 的 UART 引脚与板载串口芯片共用。完成固件烧录后，UART 端口可重新分配为其他设备用途，实现灵活的串口资源管理。
<p align="center">
  <img src="https://images.tuyacn.com/fe-static/docs/img/fca1b1a2-e89e-4a85-aa52-b048850843d6.png" alt="T5 UART 接口示意图" width="200" />
</p>


### 天线系统
**板载 2.4 GHz Wi-Fi + 蓝牙 LE 天线**: 集成式天线，为 T5-E1 模组提供无线通信支持。



---
## 下载资源
#### T5AI-Core 开发板
- [T5AI-Core 原理图](/docs/hardware/t5ai-core/T5AI-Core_V101-SCH.pdf)：完整电路图。
- [T5AI-Core 丝印图（ASM）](/docs/hardware/t5ai-core/T5AI-Core_V101-ASM.pdf)：提供 T5AI-Core 开发板的详细丝印标识参考。
- [T5AI-Core 3D 结构文件（STEP）](/docs/hardware/t5ai-core/T5AI-Core_V101-3D.step)：提供 T5AI-Core 开发板的 3D 结构模型，便于结构设计与集成。


#### T5 MCU 数据手册
- [T5-E1 模块数据手册](https://developer.tuya.com/en/docs/iot/T5-E1-Module-Datasheet?id=Kdar6hf0kzmfi)：T5-E1 模块的技术规格和引脚定义。
- [T5 MCU 芯片技术数据手册](https://images.tuyaeu.com/content-platform/hestia/1731549161e5fd8879de6.pdf)：T5 系列的综合技术规格和参考文档。


### USB 转串口驱动安装
T5AI-CORE 使用板载 CH343 USB 转串口芯片进行固件烧录和调试。下载适合您操作系统的驱动程序：

- [Windows 驱动](https://www.wch-ic.com/downloads/CH343SER_ZIP.html)
- [Linux 驱动](https://github.com/WCHSoftGroup/ch343ser_linux)
- [macOS 驱动](https://github.com/WCHSoftGroup/ch34xser_macos)


## 相关技术文档/Demo
- [T5AI 入门指南 -（环境搭建 + 烧录 Demo）](/docs/quick-start/enviroment-setup)
- [T5AI Demo 聊天机器人](/docs/applications/tuya.ai/demo-your-chat-bot)
- [T5AI Demo IoT 智能插座/灯](/docs/applications/tuya_cloud/demo-tuya-iot-light)
- [T5AI Demo Wi-Fi/BT 和其他外设](/docs/examples/demo-generic-examples)
