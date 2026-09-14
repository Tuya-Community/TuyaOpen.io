---
title: "SiWx917 快速开始"
description: "在 SiWx917 开发板上构建、烧录并配网你的第一个 TuyaOpen 应用:覆盖 SLC 代码生成注意事项、TA 固件检查、日志串口接线与 BLE 配网。"
keywords:
  - SiWx917
  - 快速开始
  - 烧录
  - 配网
  - TuyaOpen 硬件
---

在 SiWx917 开发板上构建、烧录并运行你的第一个 TuyaOpen 应用。

## 前提条件

- 已完成[环境搭建](../../quick-start/enviroment-setup)
- 了解基本的 C 语言开发和串口终端使用

## 准备硬件

- 一块 SiWx917 开发板(`SIWX917_AI_DEV_KIT` 或 `BRD2605A`)
- 一个 J-Link 调试器(SWD 烧录),**或**一个 USB 串口适配器(ISP 串口烧录)
- 调试器 / 串口适配器对应的 USB 数据线
- 约 5 GB 空闲磁盘(首次构建要拉 Simplicity SDK 和 SLC)
- Wi-Fi 网络(2.4 GHz)

:::info
如果你的应用使用 Tuya Cloud 功能(远程控制、AI Agent、OTA),还需要一个 [Tuya Cloud 授权码](../../quick-start/equipment-authorization)。仅本地运行的项目(GPIO、UART、显示示例)不需要授权码。
:::

## 步骤

### 1. 克隆 TuyaOpen 并配置环境

```bash
git clone https://github.com/tuya/TuyaOpen.git
cd TuyaOpen
git submodule update --init
```

激活 TuyaOpen 环境:

```bash
. ./export.sh
```

SiWx917 是 TuyaOpen 官方支持的平台:它已列在 `platform/platform_config.yaml` 中,板级支持位于 `boards/SIWX917/`。第一次构建 SiWx917 会把 Silicon Labs SLC 和 Simplicity Commander 下载到 `platform/SIWX917/tools/`。

### 2. 选择要构建的工程

第一次构建建议用 **switch demo**(一个简单的云连接开关):

```bash
cd apps/tuya_cloud/switch_demo
```

### 3. 选择板级配置

```bash
tos.py config choice
```

选择`SIWX917_AI_DEV_KIT` 或 `BRD2605A`。
此前编译过其他开发板或修改过外设 Kconfig,先 `tos.py clean`,否则 SLC 会跳过生成,见[构建](#4-构建)。

### 4. 构建

```bash
tos.py build
```

固件产物在应用的 `dist/` 和 `.build/` 目录下。首次构建还会拉取 Silicon Labs 的 SDK 和工具,见[概述](overview-siwx917#平台层目录与首次构建)。

### 5. 烧录固件

```bash
tos.py flash
```

会依次出现两个提示:

- **通道**:`swd`(J-Link 调试器)或 `serial`(ISP 串口)。
- **目标**:`M4 ONLY`(你的应用)、`TA ONLY`(NWP 无线固件)或 `TA + M4`(两者都写)。

两种通道的接线:

![AI 开发套件 J-Link(SWD)烧录接线](/img/hardware/siwx917/wiring-ai-jlink-swd.png)

AI 开发套件:外接 J-Link 接 DEBUG 排针(H5);选 `serial`(ISP 串口)通道时,见下文[用串口适配器进行 ISP 烧录](#用-串口适配器-进行-isp-烧录)。

#### 用 串口适配器 进行 ISP 烧录

选 `serial` 通道烧录时,把 USB 串口适配器接到**模组排针 H2**:

![AI 开发套件 ISP 串口烧录接线](/img/hardware/siwx917/wiring-ai-isp-uart.png)

烧录前先把芯片引导进 ISP 模式:按住板上 **ISP** 键不放,点按一下 **RESET** 键,再松开 ISP 键——芯片在复位释放的瞬间采样 GPIO_34(即 SWO,H5-6 / H2-7),采到低电平即进入 ROM bootloader。进入后串口 115200 8N1,发 `Ctrl+\` 唤醒、按 `U` 打印烧录菜单。

这组 ISP UART 与日志用的 ULP UART 不是同一对,不能共线。

:::warning[TA 固件——先检查再烧写]
射频核心运行着自己的固件(TA),与应用固件相互独立,应用没有它就无法启动。烧写 TA 会先擦掉射频的 flash,中途断电可能让设备进入需要救援的状态——所以只在设备确实报告没有 TA 时才烧写。`tos.py flash` 会读取设备的 TA 版本,并在缺失时提示你。
:::

![BRD2605A 单 USB 连接(烧录 + 日志)](/img/hardware/siwx917/wiring-brd2605a-usb.png)

BRD2605A:一根 USB Type-C 线完成烧录与日志,无需接线。


### 6. 查看日志

应用日志从 **ULP UART** 输出。

- **BRD2605A**:日志输出至板载 J-Link VCOM,`tos.py monitor` 无需任何接线即可识别。
- **外部调试器**(AI 开发板):把 USB 串口适配器接到同一排 DEBUG 排针(H5):

![AI 开发套件日志口(ULP UART)接线](/img/hardware/siwx917/wiring-ai-log-uart.png)

只接 RX 和 GND 即可查看日志。这组 UART 与串口烧录用的 ISP UART **不是同一对**,两者不能共线。

```bash
tos.py monitor
```

### 7. 配网并验证

用涂鸦智能 App 通过 **BLE** 配网——在 SiWx917 上 BLE 是唯一可用的配网方式。详细步骤见[设备配网](../../quick-start/device-network-configuration)。

## 预期结果

Wi-Fi 连接成功后,switch demo 开始向云端上报状态:在涂鸦智能 App 的设备面板中可以远程控制开关,`tos.py monitor` 日志里能看到对应的 DP 上报与下发。

## 相关文档

- [SiWx917 概述](overview-siwx917)
- [设备授权](../../quick-start/equipment-authorization):连接涂鸦云前先烧录 license。
- [设备配网](../../quick-start/device-network-configuration):BLE 配网详解。
