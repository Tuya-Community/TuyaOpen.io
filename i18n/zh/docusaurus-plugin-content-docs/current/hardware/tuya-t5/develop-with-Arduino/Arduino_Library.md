# Arduino 生态库适配

Arduino 提供了极其丰富的扩展库，所有人可以借助扩展库快速实现想法。本示例演示了如何为 TUYA-T5AI 系列开发板适配 Arduino 扩展库。

## 显示库：TFT_eSPI

TFT_eSPI 库是一个用于通过 SPI 方式驱动 LCD 屏幕的 Arduino 库，它提供了丰富的 API 来控制屏幕显示，包括初始化、文字显示、图形绘制等功能。现在已经适配了 TFT_eSPI 库，使开发者可以在 TUYA-T5AI 系列开发板上轻松使用该库进行屏幕显示开发。

### 添加库

1. 下载仓库：[TFT_eSPI 仓库](https://github.com/maidang-xing/TFT_eSPI)
   
2. 复制仓库到 Arduino 库目录，目录位置根据 `Arduino IDE` -> `文件` -> `首选项` -> `项目文件夹地址`确定。
   
3. 重启 Arduino IDE，打开 `文件 > 示例 > TFT_eSPI > Generic > Gradient_Fill` 示例，选择对应的开发板型号进行编译和上传。

#### 硬件信息

| 项目       | 参数                  |
| -------- | ------------------- |
| 开发板      | TUYA T5AI 系列          |
| 屏幕       | 1.54 寸 TFT LCD     |
| 驱动芯片     | ST7789              |
| 分辨率      | 240 × 240           |
| 接口       | SPI                 |
| 像素格式     | RGB565              |
| 平台标识宏    | `ARDUINO_TUYA_T5AI_CORE` `ARDUINO_TUYA_T5AI_BOARD` |

**LCD 引脚定义：**

| 功能     | GPIO | 说明                |
| ------ | ---- | ----------------- |
| SPI SCLK | 14   | SPI 时钟             |
| SPI MOSI | 16   | SPI 数据输出           |
| SPI MISO | 17   | SPI 数据输入（本场景未使用）   |
| SPI CS    | 15   | SPI 片选           |
| DC     | 18   | 数据/命令选择           |
| RST    | 6    | 屏幕复位              |
| BL     | 5    | 背光控制（HIGH 有效）     |

> LCD 屏幕驱动、屏幕尺寸、设备管脚、字体等配置信息根据 `User_Setups/Setup_TUYA_T5AI_ST7789.h` 文件进行定义，开发者也可以根据实际需求修改该文件进行适配。

#### 编译验证

在 Arduino IDE 中：

1. 选择开发板：**TUYA-T5AI 系列**，正确连接线路。
2. 打开任意 TFT_eSPI 示例（如 `File > Examples > TFT_eSPI > Generic > Gradient_Fill`）
3. 点击 **Verify/Compile**
4. 确认编译通过（无 error，warning 可忽略）
5. 点击上传固件

---
