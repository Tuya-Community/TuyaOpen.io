---
title: "ESP32 支持功能"
---

# ESP32 支持功能

TuyaOpen 中各 ESP32 芯片型号的详细功能矩阵。

## 芯片对比矩阵

### 芯片特性
| 特性 | ESP32 | ESP32-S3 | ESP32-C3 | ESP32-C6 |
|------|-------|----------|----------|----------|
| **CPU** | 双核 Xtensa LX6 | 双核 Xtensa LX7 | 单核 RISC-V | 单核 RISC-V |
| **Wi-Fi** | 802.11 b/g/n | 802.11 b/g/n | 802.11 b/g/n | 802.11 ax (Wi-Fi 6) |
| **蓝牙** | 经典 + BLE 4.2 | BLE 5.0 | BLE 5.0 | BLE 5.0 |
| **USB** | 无 | 支持 (OTG) | 无 | 无 |

### 芯片的片上外设适配

下表列出各芯片在 TuyaOpen 中适配的片上外设。

| 外设 | ESP32 | ESP32-S3 | ESP32-C3 | ESP32-C6 |
|------|-------|----------|----------|----------|
| Wi-Fi | 支持 | 支持 | 支持 | 支持 |
| BLE | 支持 | 支持 | 支持 | 支持 |
| GPIO | 支持 | 支持 | 支持 | 支持 |
| UART | 支持 | 支持 | 支持 | 支持 |
| PWM | 支持 | 支持 | 支持 | 支持 |
| ADC | 支持 | 支持 | 支持 | 支持 |
| I2C | 支持 | 支持 | 支持 | 支持 |
| SPI | 未实现 | 未实现 | 未实现 | 未实现 |
| Flash | 支持 | 支持 | 支持 | 支持 |
| Timer | 支持 | 支持 | 支持 | 支持 |
| WathchDog | 支持 | 支持 | 支持 | 支持 |
| RTC | 支持 | 支持 | 支持 | 支持 |

## 支持的板载器件

### 音频编解码器

| 驱动 | 编解码器 | 说明 |
|------|---------|------|
| `tdd_audio_8311_codec` | ES8311 | I2S，S3 开发板常用 |
| `tdd_audio_es8388_codec` | ES8388 | I2S，备选编解码器 |
| `tdd_audio_es8389_codec` | ES8389 | I2S |
| `tdd_audio_no_codec` | 无（DAC） | 直接 DAC 输出 |
| `tdd_audio_atk_no_codec` | ATK（无编解码器） | 备选无编解码器方案 |

:::info
目前音频驱动统一规格：采样率 16000 Hz，I2S 接口，DMA 描述符 6 个，帧大小 240
:::

### LCD 驱动

| 驱动 | 显示屏 | 接口 |
|------|--------|------|
| `lcd_st7789_spi` | ST7789 SPI | SPI |
| `lcd_st7789_80` | ST7789 8080 | 并行 8-bit |
| `oled_ssd1306` | SSD1306 OLED | I2C |
| `lcd_sh8601` | SH8601 AMOLED | QSPI |

:::info
ESP32 使用自己的 LVGL 集成（通过 ESP-IDF LVGL 组件），而非 TuyaOpen 通用 LVGL 移植。
:::

### 触摸

| 驱动 | 控制器 |
|------|--------|
| `touch_ft5x06` | FT5x06 电容触摸 |

### IO 扩展器

| 驱动 | 芯片 |
|------|------|
| `xl9555` | XL9555 I2C GPIO 扩展器 |
| `tca9554` | TCA9554 I2C GPIO 扩展器 |

### LED

| 驱动 | 类型 |
|------|------|
| `tdd_led_esp_ws1280` | WS2812 兼容可寻址 LED（通过 RMT） |

## 支持的开发板

ESP 平台目前在 TuyaOpen 内支持的开发板列表（`boards/ESP32/`）：

| 板子名称 | 芯片 | 说明 |
|---------|------|------|
| `ESP32` | ESP32 | 基础 ESP32 模块 |
| `ESP32-C3` | ESP32-C3 | 基础 ESP32-C3 模块 |
| `ESP32-C6` | ESP32-C6 | 基础 ESP32-C6 模块 |
| `ESP32-S3` | ESP32-S3 | 基础 ESP32-S3 模块 |
| `ESP32S3_BREAD_COMPACT_WIFI` | ESP32-S3 | 乐鑫 ESP32-S3 面包板 |
| `XINGZHI_ESP32S3_CUDE_0.96_OLED_WIFI` | ESP32-S3 | 星智 ESP-S3 开发板，带 0.96" OLED 屏 |
| `WAVESHARE_ESP32S3_Touch_AMOLED_1.8` | ESP32-S3 | 微雪 ESP-S3 开发板, 带 1.8" 触摸 AMOLED 屏 |
| `DNESP32S3` | ESP32-S3 | 正点 ESP32-S3 基础版开发板 |
| `DNESP32S3_BOX` | ESP32-S3 | 正点 ESP32-S3 BOX 开发板 |
| `DNESP32S3_BOX2_WIFI` | ESP32-S3 | 正点 ESP32-S3 BOX2（含4G/充电）开发板|
| `WAVESHARE_ESP32C6_DEV_KIT_N16` | ESP32-C6 | 微雪 ESP-C6 开发套件|

## 板子与器件对应关系

下表列出每块开发板搭载的板载器件：

| 板子 | 显示屏 | 触摸 | 音频编解码器 | IO 扩展器 | 按钮 | LED | 其他 |
|------|--------|------|------------|---------|------|-----|------|
| `ESP32` | ST7789 SPI 320×240 | — | ES8388 | XL9555 | — | — | 扬声器使能 |
| `ESP32-C3` | — | — | — | — | — | — | 仅 UART |
| `ESP32-C6` | — | — | — | — | — | — | 仅 UART |
| `ESP32-S3` | — | — | — | — | — | — | 仅 UART |
| `ESP32S3_BREAD_COMPACT_WIFI` | SSD1306 I2C 128×32 | — | — | — | GPIO0 | — | I2C/I2S |
| `XINGZHI_ESP32S3_CUDE_0.96_OLED_WIFI` | SSD1306 I2C 128×64 | — | — | — | GPIO0 | — | I2C/I2S |
| `WAVESHARE_ESP32S3_Touch_AMOLED_1.8` | SH8601 SPI 368×448 | FT5X06 I2C | ES8311 (0x30) | TCA9554 | — | — | — |
| `DNESP32S3` | ST7789 SPI 320×240 | — | ES8388 (0x20) | XL9555 | — | — | 扬声器使能 |
| `DNESP32S3_BOX` | ST7789 I80 320×240 | — | ES8311/NS4168 (0x30) | XL9555 | XL9555 扩展键 | 红色 LED | 蜂鸣器 |
| `DNESP32S3_BOX2_WIFI` | ST7789 I80 320×240 | — | ES8389 (0x20) | XL9555 | — | — | 4G模组、USB切换、充电管理 |
| `WAVESHARE_ESP32C6_DEV_KIT_N16` | — | — | — | — | GPIO9 | WS1280 GPIO8 | — |

## 已适配的 TuyaOpen 的应用

以下 TuyaOpen 应用已有预构建的 ESP32 配置：

:::tip[说明]
应用分为两类：
- **板子专属配置**：有 `config/` 子目录，针对特定开发板（通常带显示屏、音频等外设），每个开发板有对应的配置文件。
- **通用基础配置**：没有 `config/` 子目录，支持所有基础 ESP32 模块（`ESP32` / `ESP32-C3` / `ESP32-S3` / `ESP32-C6`），不依赖特定板载外设。
:::

### 板子专属配置的应用

#### your_chat_bot（AI 聊天机器人）

| 开发板 | 配置文件 |
|--------|---------|
| `DNESP32S3` | `DNESP32S3.config` |
| `DNESP32S3_BOX` | `DNESP32S3_BOX.config` |
| `DNESP32S3_BOX2_WIFI` | `DNESP32S3_BOX2_WIFI.config` |
| `ESP32S3_BREAD_COMPACT_WIFI` | `ESP32S3_BREAD_COMPACT_WIFI.config` |
| `WAVESHARE_ESP32S3_Touch_AMOLED_1.8` | `WAVESHARE_ESP32S3_TOUCH_AMOLED_1_8.config` |
| `XINGZHI_ESP32S3_CUDE_0.96_OLED_WIFI` | `XINGZHI_ESP32S3_Cube_0_96OLED_WIFI.config` |

#### your_serial_chat_bot（串口 AI 聊天机器人）

| 开发板 | 配置文件 |
|--------|---------|
| `WAVESHARE_ESP32S3_Touch_AMOLED_1.8` | `WAVESHARE_ESP32S3_TOUCH_AMOLED_1_8.config` |
| `XINGZHI_ESP32S3_CUDE_0.96_OLED_WIFI` | `XINGZHI_ESP32S3_Cube_0_96OLED_WIFI.config` |

### 通用基础配置的应用

以下应用支持所有基础 ESP32 模块，无需特定板载外设：

| 应用 | 说明 |
|------|------|
| `tuya_cloud/switch_demo` | Tuya 云端开关示例 |
| `tuya_cloud/weather_get_demo` | 天气数据获取示例 |

## 参考资料

- [ESP32 与 TuyaOpen -- 概述](overview-esp32)
- [添加新的 ESP32 开发板](esp32-new-board)
- [TuyaOpen-esp32 仓库](https://github.com/tuya/TuyaOpen-esp32)
