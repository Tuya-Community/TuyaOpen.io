---
id: siwx917-ai-dev-kit
title: "SiWx917 AI 开发套件"
description: "世强 SK_SIWG917_AI_MB AI 开发套件：基于 SiWG917M111 模组的语音与屏幕交互开发板，ST7789 显示屏、模拟麦克风与喇叭、对话按键与 RGB LED，附完整引脚映射与外设占用说明。"
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

### 排针引出（H1 / H2 / H3 / DEBUG）

开发套件把模组信号引到四组排针上（引脚号均以原理图为准）：

| 排针 | 规格 | 用途 |
|------|------|------|
| H1 | 1×2 | VMCU 功耗测量跳线——串入电流表即可测整机功耗 |
| H2 | 1×18 | 模组排针：调试口（SWDIO/SWO/SWCLK/TDI）、ISP 串口（GPIO_8/9）、ULP GPIO |
| H3 | 1×14 | 扩展排针：ULP/UULP GPIO、POC_IN 复位、GPIO_15/25/27/29/30、VMCU/GND |
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

出处 [`SIWX917_AI_DEV_KIT/Kconfig`](https://github.com/tuya/TuyaOpen/blob/master/boards/SIWX917/SIWX917_AI_DEV_KIT/Kconfig) 与 `siwx917_ai_board.c`。TUYA GPIO 号到芯片 pad 的换算见 [芯片层编号换算](#芯片层编号换算两块板通用)。

| 功能 | Kconfig 项 | TUYA GPIO | 芯片位置 | 注册名 | 是否注册 |
|------|-----------|-----------|----------|--------|----------|
| 按键 1 | `BOARD_SW1_PIN` | 49 | HP 49 | `ai_chat_button` | 是 |
| 按键 2 | `BOARD_SW2_PIN` | 2 | UULP 2 | `SW2` | 是 |
| 按键 3 | `BOARD_SW3_PIN` | 3 | UULP 3 | `SW3` | 否（Kconfig 有，板级 .c 未注册） |
| LED R | `BOARD_LEDR_PIN` | 50 | HP 50 | `LEDR` | 是 |
| LED G | `BOARD_LEDG_PIN` | 51 | HP 51 | `LEDG` | 否（被拿去当屏 CS 的占位脚，见下） |
| LED B | `BOARD_LEDB_PIN` | 15 | HP 15 | `LEDB` | 是 |

按键统一 `LEVEL_LOW` + `PULLUP` + `TIMER_SCAN_MODE`；LED 统一 `LEVEL_LOW` + `PUSH_PULL`。

#### 显示屏（只有这块板有）

出处 `siwx917_ai_board.c` 里写死的宏，**没有进 Kconfig**：

| 信号 | 宏 | TUYA GPIO | 备注 |
|------|----|-----------|------|
| SPI 端口 | `BOARD_LCD_SPI_PORT` | `TUYA_SPI_NUM_3` | = GSPI_MASTER |
| SPI 时钟 | `BOARD_LCD_SPI_CLK` | 40 MHz | |
| DC | `BOARD_LCD_SPI_DC_PIN` | 29 | |
| RST | `BOARD_LCD_SPI_RST_PIN` | 26 | 与 GSPI_MASTER MISO 同脚，见占用表 |
| CS | `BOARD_LCD_SPI_CS_PIN`（28） | 未使用 | 实际传入的是 `BOARD_LEDG_PIN`（51）顶位；CS0（28）由 GSPI 硬件自动驱动 |
| 背光 | `BOARD_LCD_BL_PIN` | 30 | GPIO 背光，高有效 |
| 电源 | `BOARD_LCD_POWER_PIN` | `TUYA_GPIO_NUM_MAX` | 不使用 |
| 分辨率 | | 320×240 RGB565 | |

`cs_pin` 字段填 51 而非 28，是因为 GSPI 硬件已自动在 CS0（28）上驱动片选，填个不用的脚顶位；定义好的 `BOARD_LCD_SPI_CS_PIN`（28）是死代码。

### SLC / SDK 层引脚（外设走线）

SiWx917 的外设引脚有两套独立来源：上面的 Tuya 板级 Kconfig，以及厂商 SDK 的 RTE / pin_config。二者之间没有交叉校验。SDK 层的生效机制是：`RTE_Device_917.h` 里每个信号先看 `pin_config.h` 有没有覆盖（`#ifndef <SIG>_LOC`），没覆盖就走 `PORT_ID` 默认值。

**这块板的 `pin_config.h` 只覆盖了 I2S0 一组信号**，其余外设（GSPI、I2C、USART…）全走 RTE 默认值。

#### I2S0 — 音频（被 pin_config.h 覆盖）

| 信号 | TUYA GPIO / 芯片 | 用途 |
|------|------------------|------|
| SCLK | HP 46 | |
| WSCLK | HP 47 | |
| DOUT0 | HP 11 | 喇叭输出 |
| DIN0 | HP 48 | 麦克风输入 |

:::warning[SDK 里有一份错注释]
`sl_si91x_i2s_init_i2s0_config.h` 中同一组值的注释写着 `GPIO_25/26/28/27`，而 `#define` 的值是 `46/47/11/48`。注释里的号正好是 RTE 默认值，是改脚时留下的旧注释，**以 `#define` 的值为准**。同目录 `pin_config.h` 的注释是对的。
:::

#### GSPI_MASTER — 屏的 SPI 总线（RTE 默认值）

| 信号 | TUYA GPIO / 芯片 |
|------|------------------|
| CLK | HP 25 |
| MISO | HP 26 |
| MOSI | HP 27 |
| CS0 | HP 28 |
| CS1 / CS2 | HP 29 / HP 30 |

#### 其余外设（RTE 默认值）

`tkl_spi.c` 的 SPI 端口映射：`SPI_NUM_0`→SSI_ULP_MASTER、`SPI_NUM_1`→SSI_MASTER、`SPI_NUM_2`→SSI_SLAVE、`SPI_NUM_3`→GSPI_MASTER。

| 项 | 值 |
|----|----|
| 日志串口 | ULP_UART，TX = ULP 11 = **TUYA 41**，RX = ULP 9 = **TUYA 39**，115200 8N1 |
| SSI_MASTER | SCK 25 / MOSI 26 / MISO 12 / CS0 28 |
| I2C0 | SCL pad 65（ULP 区）/ SDA HP 6 |
| I2C1 | SCL HP 50 / SDA HP 51 |
| USART0 | TX HP 15 / RX HP 10 |
| PSRAM | **HP 52 – 57**（6 脚全占） |

### 引脚占用汇总

只列真正生效的。同一脚出现多次即为潜在冲突。

| TUYA GPIO | 芯片 | 占用方 | 状态 |
|-----------|------|--------|------|
| 2 | UULP 2 | 按键 SW2 | 生效 |
| 3 | UULP 3 | 按键 SW3（Kconfig 有，未注册） | 未生效 |
| 11 | HP 11 | I2S0 DOUT0（喇叭输出） | 生效 |
| 15 | HP 15 | LED B | 生效 |
| 25 | HP 25 | GSPI CLK（屏时钟） | 屏在用 |
| 26 | HP 26 | GSPI MISO **＋ 屏 RST** | ⚠️ 同脚两用 |
| 27 | HP 27 | GSPI MOSI（屏数据） | 屏在用 |
| 28 | HP 28 | GSPI CS0（硬件自动 CS） | 屏在用 |
| 29 | HP 29 | 屏 DC（也是 GSPI CS1，未用） | 生效 |
| 30 | HP 30 | 屏背光（也是 GSPI CS2，未用） | 生效 |
| 39 | ULP 9 | 日志串口 RX | 生效 |
| 41 | ULP 11 | 日志串口 TX | 生效 |
| 46 | HP 46 | I2S0 SCLK | 生效 |
| 47 | HP 47 | I2S0 WSCLK | 生效 |
| 48 | HP 48 | I2S0 DIN0（麦克风） | 生效 |
| 49 | HP 49 | 按键 SW1（`ai_chat_button`） | 生效 |
| 50 | HP 50 | LED R（也是 I2C1 SCL / SSI CS2，未用） | 生效 |
| 51 | HP 51 | 屏 CS 顶位脚（名义 LEDG；也是 I2C1 SDA） | ⚠️ 名不符实 |
| 52 – 57 | HP 52-57 | PSRAM（6 脚） | 生效 |

#### 需要注意的点

1. **GPIO 26 同时是 GSPI MISO 和屏 RST**。屏是只写设备不需要 MISO，所以能跑，但代码里没有一处说明这是有意为之。
2. **GPIO 51 名义 LEDG、实际当屏 CS 占位**，真正的片选由 GSPI 硬件在 28 上驱动，所以 `boards` 配置里的 LEDG 注册被略过。
3. **PSRAM 吃掉 52–57**，但 `tkl_gpio.c` 的引脚表仍把 52–57 当普通可用 GPIO 暴露给应用，没有保护。
4. `Kconfig` 里的引脚和 SLC/RTE 里的引脚是**两套独立来源**，构建时不会交叉校验，上面这些重叠都是人工比对得出的。

### 芯片层编号换算（两块板通用）

`tkl_gpio.c` 的 `SI91X_PIN_MAPPING`：

| TUYA GPIO 号 | 芯片端口 | pad 号 |
|--------------|----------|--------|
| 0 – 4 | UULP_VBAT | 同号 0 – 4 |
| 6 – 12, 15, 25 – 34, 46 – 57 | HP | 同号 |
| 20 – 24 | ULP | 0 – 4 |
| 35 – 41 | ULP | 5 – 11 |

SLC / RTE 里写的 `PIN` 是**端口内的 pad 号**，所以 `HP 46` = TUYA GPIO 46，`ULP 11` = TUYA GPIO 41。

:::note[GPIO 8/16 保留]
`tkl_gpio.c` 注明 `TUYA_GPIO_NUM_8` 和 `TUYA_GPIO_NUM_16` 用于 vcom，不要在应用里当普通 GPIO 用。
:::

## 下载资源

- [SK_SiWx917_AI_MB 原理图 V1.1（PDF）](/docs/hardware/siwx917/SK_SiWx917_AI_MB_Schematic_V1.1.pdf)：完整电路图。
- [SK_SIWG917_AI_MB 购买链接（世强）](https://www.sekorm.com/product/603942256.html)

## 相关技术文档/Demo

- [SiWx917 快速开始 - 环境搭建 + 烧录 + 配网](siwx917-quick-start)
- [Demo 聊天机器人 your_chat_bot](/docs/cloud/device-ai/demo-your-chat-bot)
- [SiWx917 概述](overview-siwx917)
- [BRD2605A 开发套件](brd2605a)
