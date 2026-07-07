---
title: Arduino 生态库适配
description: "以 TFT_eSPI 显示库为例，介绍如何为 TUYA-T5AI 系列开发板适配 Arduino 生态扩展库，含库添加步骤与硬件参数。"
keywords:
  - Arduino 库
  - TFT_eSPI
  - T5AI
  - 显示库
  - TuyaOpen 硬件
---

Arduino 生态提供了极其丰富的扩展库。本文档以 TFT_eSPI 显示库为示例，介绍如何为 TUYA-T5AI 系列开发板适配 Arduino 扩展库。

## 显示库：TFT_eSPI

`TFT_eSPI` 库是一个通过 SPI 驱动 LCD 屏幕的 Arduino 库，提供了丰富的 API 来控制屏幕显示，包括初始化、文字显示、图形绘制等。`TFT_eSPI` 现已适配 TUYA-T5AI 系列开发板，你可以在这些开发板上使用它进行屏幕显示开发。

### 添加库

1. 下载仓库：[TFT_eSPI 仓库](https://github.com/maidang-xing/TFT_eSPI)。

2. 将仓库复制到 Arduino 库目录，目录位置可通过 **Arduino IDE** -> **文件** -> **首选项** -> **项目文件夹地址** 查看。

3. 重启 Arduino IDE，打开示例 `File > Examples > TFT_eSPI > Generic > Gradient_Fill`，选择对应的开发板型号，然后编译并上传。

#### 硬件信息

| 项目 | 参数 |
| ---- | ---- |
| 开发板 | TUYA T5AI 系列 |
| 屏幕 | 1.54 寸 TFT LCD |
| 驱动芯片 | ST7789 |
| 分辨率 | 240 × 240 |
| 接口 | SPI |
| 像素格式 | RGB565 |
| 平台标识宏 | `ARDUINO_TUYA_T5AI_CORE` `ARDUINO_TUYA_T5AI_BOARD` |

**LCD 引脚定义：**

| 功能 | GPIO | 说明 |
| ---- | ---- | ---- |
| SPI SCLK | 14 | SPI 时钟 |
| SPI MOSI | 16 | SPI 数据输出 |
| SPI MISO | 17 | SPI 数据输入（本场景未使用） |
| SPI CS | 15 | SPI 片选 |
| DC | 18 | 数据/命令选择 |
| RST | 6 | 屏幕复位 |
| BL | 5 | 背光控制（HIGH 有效） |

:::note
LCD 驱动、屏幕尺寸、设备引脚映射、字体等配置信息定义在 `User_Setups/Setup_TUYA_T5AI_ST7789.h` 文件中。你可以根据实际需求修改该文件进行适配。
:::

#### 编译验证

在 Arduino IDE 中：

1. 选择开发板 **TUYA-T5AI 系列**，并正确连接线路。
2. 打开任意 TFT_eSPI 示例（例如 `File > Examples > TFT_eSPI > Generic > Gradient_Fill`）。
3. 点击 **Verify/Compile**。
4. 确认编译通过（无 error，warning 可忽略）。
5. 点击 **Upload** 烧录固件。
