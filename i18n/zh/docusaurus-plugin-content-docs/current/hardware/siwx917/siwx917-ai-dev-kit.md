---
id: siwx917-ai-dev-kit
title: "SiWx917 AI 开发套件"
description: "世强 SK_SIWG917_AI_MB AI 开发套件：基于 SiWG917M111 模组的语音与屏幕交互开发板，ST7789 显示屏、模拟麦克风与喇叭、对话按键与 RGB LED，附排针引出与引脚映射。"
keywords:
  - SIWX917_AI_DEV_KIT
  - SK_SIWG917_AI_MB
  - SiWx917
  - 世强
  - TuyaOpen 硬件
---

SiWx917 AI 开发套件（`SIWX917_AI_DEV_KIT`，世强型号 `SK_SIWG917_AI_MB`）是基于 SiWG917M111 模组的语音与屏幕交互开发板。板载一块 ST7789 SPI 屏、模拟麦克风与喇叭（无外置 codec）、一个对话按键和 RGB LED，是运行 `your_chat_bot` 这类 AI Agent 应用的现成载体。

![SK_SIWG917_AI_MB AI 开发套件实物图](/img/hardware/siwx917/siwx917-ai-dev-kit.png)

## 软件编译配置

板级配置文件定义了外设驱动、引脚映射、BSP 包以及第三方库等核心功能组件的配置参数。通过使用开发板预配置的板级配置文件，可以显著降低硬件适配和驱动开发的工作量，提高开发效率。

:::tip 想要开发新的外设？
**Config 配置特点：**
- **开发者如需新增外设，可直接在应用层编写驱动。** BSP 驱动主要用于板卡内部固化的外围器件。
- 不同应用的外设需求可能存在配置差异，需要根据具体需求调整 Config 文件。
- 不同应用需求可能需要配置不同的第三方库参数。
- **建议** 以初始配置文件作为 **板级基础模板**，在此基础上进行二次开发和功能扩展。
:::

如何使能 Config？请参阅 [CLI - tos.py 开发工具 - 配置选择](/docs/tos-tools/tos-guide#config-choice)。

<table class="hw-config-flag-table">
  <tbody>
    <tr>
      <th>编译标志</th>
      <td><code>SIWX917.config</code></td>
      <td>SiWx917 AI 开发套件板卡配置 - <a href="https://github.com/tuya/TuyaOpen/blob/master/boards/SIWX917/config/SIWX917.config">配置文件</a></td>
    </tr>
    <tr>
      <th>应用配置</th>
      <td><code>SIWX917_AI_DEV_KIT.config</code></td>
      <td>your_chat_bot 示例配置 - <a href="https://github.com/tuya/TuyaOpen/blob/master/apps/tuya.ai/your_chat_bot/config/SIWX917_AI_DEV_KIT.config">配置文件</a></td>
    </tr>
    <tr>
      <th>BSP 驱动源码</th>
      <td colspan="2"><a href="https://github.com/tuya/TuyaOpen/tree/master/boards/SIWX917/SIWX917_AI_DEV_KIT">SiWx917 AI 开发套件 BSP 驱动源码</a></td>
    </tr>
  </tbody>
</table>

选择这块板：

```bash
tos.py config choice -c SIWX917
```

## 硬件概述

开发套件围绕语音与显示交互设计：SiWG917M111 模组提供双核 Wi-Fi 6 + BLE 与 8 MB 封装内 PSRAM；应用代码运行在 Cortex-M4 上，音频直接走片上 I2S，不依赖外置 codec。烧录支持外接 J-Link（SWD）或 ISP 串口，日志从 ULP UART 输出。

## 开发套件亮点

- SiWG917M111 模组（Wi-Fi 6 2.4 GHz + Bluetooth LE）
- ARM Cortex-M4 @ 180 MHz
- 8 MB Flash + 8 MB 封装内 PSRAM
- ST7789 320×240 SPI 显示屏（RGB565）
- 模拟麦克风 + 喇叭（片上 I2S，无外置 codec）
- 对话按键 SW1 与按键 SW2/SW3
- RGB LED
- J-Link（SWD）或 ISP 串口烧录，ULP UART 日志

## 详细规格

| 特性 | 规格 |
|------|------|
| 板载模块 | SiWG917M111MGTBA |
| CPU | ARM Cortex-M4 @ 180 MHz |
| 无线 | Wi-Fi 6（802.11ax，2.4 GHz）+ Bluetooth LE |
| Flash | 8 MB |
| PSRAM | 8 MB 封装内（承载 `.text`/`.bss`/FreeRTOS 堆） |
| 显示 | ST7789 320×240 SPI，RGB565 |
| 音频 | 模拟麦克风 + 喇叭，无外置 codec（走片上 I2S） |
| 交互 | 对话按键 SW1、按键 SW2/SW3、RGB LED |
| 烧录/调试 | J-Link（SWD）或 ISP 串口；日志走 ULP UART |

## 引脚定义

### 排针引出（H2 / H3 / H4 / DEBUG）

开发套件把模组信号引到四组排针上（引脚号以原理图为准）：

| 排针 | 规格 | 用途 |
|------|------|------|
| H2 | 1×18 | 模组排针：调试口（SWDIO/SWO/SWCLK/TDI）、ISP 串口（GPIO_8/9）、ULP GPIO |
| H3 | 1×14 | 扩展排针：ULP/UULP GPIO、POC_IN 复位、GPIO_15/25/27/29/30、VMCU/GND |
| H4 | 1×18 | HP GPIO 扩展排针：GPIO_46-51、GPIO_10-12、GPIO_26/28 |
| DEBUG（H5） | 2×5 | 调试排针：J-Link（SWD）烧录、ULP 日志串口 |

#### H2 模组排针（1×18）

| 引脚 | 信号 | 引脚 | 信号 |
|------|------|------|------|
| 1 | GND | 10 | ULP_GP11（日志 TX） |
| 2 | NC | 11 | ULP_GP7 |
| 3 | NC | 12 | GPIO_8（ISP RX） |
| 4 | NC | 13 | GPIO_7 |
| 5 | UULP_GP0 | 14 | GPIO_9（ISP TX） |
| 6 | SWDIO | 15 | GPIO_6 |
| 7 | SWO | 16 | ULP_GP6 |
| 8 | SWCLK | 17 | ULP_GP10 |
| 9 | DBG_TDI | 18 | ULP_GP9 |

#### H3 扩展排针（1×14）

| 引脚 | 信号 | 引脚 | 信号 |
|------|------|------|------|
| 1 | ULP_GP1 | 8 | GPIO_15 |
| 2 | UULP_GP3 | 9 | GPIO_30 |
| 3 | UULP_GP2 | 10 | GPIO_27 |
| 4 | POC_IN（硬件复位） | 11 | VMCU |
| 5 | UULP_GP1 | 12 | GND |
| 6 | ULP_GP8 | 13 | GPIO_29 |
| 7 | ULP_GP2 | 14 | GPIO_25 |

#### H4 HP GPIO 扩展排针（1×18）

| 引脚 | 信号 | 引脚 | 信号 |
|------|------|------|------|
| 1 | GND | 10 | NC |
| 2 | GPIO_48 | 11 | NC |
| 3 | GPIO_47 | 12 | NC |
| 4 | GPIO_49 | 13 | NC |
| 5 | GPIO_50 | 14 | GPIO_12 |
| 6 | GPIO_51 | 15 | GPIO_11 |
| 7 | GPIO_46 | 16 | GPIO_10 |
| 8 | NC | 17 | GPIO_26 |
| 9 | NC | 18 | GPIO_28 |

#### DEBUG 排针 H5（2×5，俯视）

| 左列 | | 右列 | |
|------|---|------|---|
| 10 GND | | 9 GND | |
| 8 DBG_TDI | | 7 ULP_GP11（日志 TX） | |
| 6 SWO | | 5 ULP_GP9（日志 RX） | |
| 4 SWCLK | | 3 POC_IN（复位） | |
| 2 SWDIO | | 1 VMCU | |

J-Link 烧录、ISP 串口烧录与日志接线的连接图见[快速开始](siwx917-quick-start#5-烧录固件)。

### 板级层引脚（应用可见）

出处 [`SIWX917_AI_DEV_KIT/Kconfig`](https://github.com/tuya/TuyaOpen/blob/master/boards/SIWX917/SIWX917_AI_DEV_KIT/Kconfig) 与 `siwx917_ai_board.c`。

| 功能 | Kconfig 项 | TUYA GPIO | 芯片位置 | 注册名 |
|------|-----------|-----------|----------|--------|
| 按键 1（对话键） | `BOARD_SW1_PIN` | 49 | HP 49 | `ai_chat_button` |
| 按键 2 | `BOARD_SW2_PIN` | 2 | UULP 2 | `SW2` |
| 按键 3 | `BOARD_SW3_PIN` | 3 | UULP 3 | `SW3` |
| LED R | `BOARD_LEDR_PIN` | 50 | HP 50 | `LEDR` |
| LED G | `BOARD_LEDG_PIN` | 51 | HP 51 | —（复用为屏片选占位） |
| LED B | `BOARD_LEDB_PIN` | 15 | HP 15 | `LEDB` |

按键统一 `LEVEL_LOW` + `PULLUP` + `TIMER_SCAN_MODE`；LED 统一 `LEVEL_LOW` + `PUSH_PULL`。

#### 显示屏

| 信号 | TUYA GPIO | 说明 |
|------|-----------|------|
| SPI 端口 | `TUYA_SPI_NUM_3` | = GSPI_MASTER，40 MHz |
| DC | 29 | |
| RST | 26 | |
| CS | 28 | GSPI 硬件自动驱动 |
| 背光 | 30 | GPIO 背光，高有效 |
| 分辨率 | | 320×240 RGB565 |

#### 音频（I2S0）

| 信号 | 芯片位置 | 用途 |
|------|----------|------|
| SCLK | HP 46 | |
| WSCLK | HP 47 | |
| DIN0 | HP 48 | 麦克风输入 |
| DOUT0 | HP 11 | 喇叭输出 |

#### 芯片层编号换算

TUYA GPIO 号到芯片 pad 的换算（`tkl_gpio.c` 的 `SI91X_PIN_MAPPING`）：UULP_VBAT 与 HP 区同号（0–4 / 6–12, 15, 25–34, 46–57）；ULP 区为 TUYA 20–24 → pad 0–4、TUYA 35–41 → pad 5–11。例如日志串口 ULP 11 = TUYA GPIO 41。

:::note[GPIO 8/16 保留]
`TUYA_GPIO_NUM_8` 与 `TUYA_GPIO_NUM_16` 用于 vcom，不要在应用里当普通 GPIO 使用。
:::

## 下载资源

- [SK_SiWx917_AI_MB 原理图 V1.1（PDF）](/docs/hardware/siwx917/SK_SiWx917_AI_MB_Schematic_V1.1.pdf)：完整电路图。
- [SK_SIWG917_AI_MB 购买链接（世强）](https://www.sekorm.com/product/603942256.html)

## 相关技术文档/Demo

- [SiWx917 快速开始 - 环境搭建 + 烧录 + 配网](siwx917-quick-start)
- [Demo 聊天机器人 your_chat_bot](/docs/cloud/device-ai/demo-your-chat-bot)
- [SiWx917 概述](overview-siwx917)
- [BRD2605A 开发套件](brd2605a)
