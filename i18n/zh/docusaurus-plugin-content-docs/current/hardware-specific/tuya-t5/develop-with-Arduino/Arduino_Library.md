# Arduino 生态库适配

Arduino 提供了极其丰富的扩展库，所有人可以借助扩展库快速实现想法。本示例演示了如何为 TUYA-T5AI 系列开发板适配 Arduino 扩展库。

## 显示库：TFT_eSPI

TFT_eSPI库是一个用于通过SPI方式驱动LCD屏幕的Arduino库，它提供了丰富的API来控制屏幕显示，包括初始化、文字显示、图形绘制等功能。可以在 Arduino IDE 的库管理器中搜索 `TFT_eSPI` 下载。库的下载位置根据 `Arduino IDE` -> `文件` -> `首选项` -> `项目文件夹地址`确定。

本文档详细记录了在 Arduino IDE 上将 [TFT_eSPI](https://github.com/Bodmer/TFT_eSPI) 图形库适配到 **TUYA T5AI** 开发板的完整流程。

---

## 硬件信息

| 项目       | 参数                  |
| -------- | ------------------- |
| 开发板      | TUYA T5AI           |
| 屏幕       | 1.54 寸 TFT LCD     |
| 驱动芯片     | ST7789              |
| 分辨率      | 240 × 240           |
| 接口       | SPI                 |
| 像素格式     | RGB565              |
| 平台标识宏    | `ARDUINO_TUYA_T5AI` |

**LCD 引脚定义：**

| 功能     | GPIO | 说明                |
| ------ | ---- | ----------------- |
| SPI SCLK | 14   | SPI 时钟             |
| SPI MOSI | 16   | SPI 数据输出           |
| SPI MISO | 17   | SPI 数据输入（本场景未使用）   |
| DC     | 18   | 数据/命令选择           |
| RST    | 6    | 屏幕复位              |
| BL     | 5    | 背光控制（HIGH 有效）     |

---

## 适配原理

> TFT_eSPI 库通过**编译时配置**来适配不同硬件，核心机制是条件编译（`#if defined`）。适配一个新平台需要修改三个层面：

```
┌─────────────────────────────────────────────────┐
│  User_Setups/Setup_TUYA_T5AI_ST7789.h          │  ← 屏幕配置（引脚、驱动、频率）
├─────────────────────────────────────────────────┤
│  User_Setup_Select.h                            │  ← 选择启用哪个配置文件
├─────────────────────────────────────────────────┤
│  TFT_eSPI.h / TFT_eSPI.cpp                     │  ← 注册处理器驱动（条件编译入口）
├─────────────────────────────────────────────────┤
│  Processors/TFT_eSPI_TuyaOpen.h                 │  ← 处理器驱动头文件（引脚宏、兼容修补）
│  Processors/TFT_eSPI_TuyaOpen.c                 │  ← 处理器驱动实现（SPI 读写函数）
└─────────────────────────────────────────────────┘
```

---

## Step 1：创建处理器驱动文件

#### 1.1 创建 `Processors/TFT_eSPI_TuyaOpen.h`

此文件定义了平台相关的 **引脚控制宏** 和 **兼容性修补**。

在 `Processors/` 目录下创建 `TFT_eSPI_TuyaOpen.h`，完整内容如下：

```c
////////////////////////////////////////////////////
//       TFT_eSPI TuyaOpen driver functions       //
////////////////////////////////////////////////////

#ifndef _TFT_eSPI_TUYAOPEN_
#define _TFT_eSPI_TUYAOPEN_

// Processor ID reported by getSetup()
#define PROCESSOR_ID 0x6602

// 平台标识
#ifndef ARDUINO_TUYA_T5AI
  #define ARDUINO_TUYA_T5AI 1
#endif

// 启用 Tuya 绘图缓冲区（批量 SPI 传输，提升性能）
#define ENABLE_TUYA_DRAW_BUF

#ifdef ENABLE_TUYA_DRAW_BUF
#define TUYA_DRAW_BUF_SIZE (128*2)  // 缓冲区大小（字节）
#endif

#include <api/itoa.h>

// ======================== 兼容性修补 ========================
// TuyaOpen 平台缺少 digitalPinToBitMask，提供替代实现
#ifndef digitalPinToBitMask
  #define digitalPinToBitMask(pin) (1UL << (pin))
#endif

// TuyaOpen 平台缺少 ltoa，映射到 itoa
#ifndef ltoa
  #define ltoa(val, buf, base) itoa((int)(val), buf, base)
#endif

// ======================== SPI 总线控制 ========================
#define SET_BUS_WRITE_MODE
#define SET_BUS_READ_MODE
#define DMA_BUSY_CHECK

#if !defined (SUPPORT_TRANSACTIONS)
  #define SUPPORT_TRANSACTIONS
#endif

#define INIT_TFT_DATA_BUS

#ifdef SMOOTH_FONT
  // TODO: 文件系统支持（如需加载平滑字体文件）
#endif

// ======================== DC 引脚控制 ========================
#ifndef TFT_DC
  #define DC_C
  #define DC_D
#else
  #define DC_C digitalWrite(TFT_DC, LOW)
  #define DC_D digitalWrite(TFT_DC, HIGH)
#endif

// ======================== CS 引脚控制 ========================
#ifndef TFT_CS
  #define CS_L
  #define CS_H
#else
  #define CS_L digitalWrite(TFT_CS, LOW)
  #define CS_H digitalWrite(TFT_CS, HIGH)
#endif

// ======================== 其他引脚 ========================
#ifndef TFT_RD
  #define TFT_RD -1
#endif

#if !defined TOUCH_CS || (TOUCH_CS < 0)
  #define T_CS_L
  #define T_CS_H
#else
  #define T_CS_L digitalWrite(TOUCH_CS, LOW)
  #define T_CS_H digitalWrite(TOUCH_CS, HIGH)
#endif

#ifndef TFT_MISO
  #define TFT_MISO -1
#endif

// ======================== SPI 写入函数声明 ========================
void tft_Write_8(uint8_t C);
void tft_Write_16(uint16_t C);
void tft_Write_16S(uint16_t C);
void tft_Write_32(uint32_t C);
void tft_Write_32C(uint16_t C, uint16_t D);
void tft_Write_32D(uint16_t C);

#ifndef tft_Write_16N
  #define tft_Write_16N tft_Write_16
#endif

#define tft_Read_8() spi.transfer(0)

#endif // _TFT_eSPI_TUYAOPEN_
```

**关键点说明：**

| 内容                    | 作用                                 |
| --------------------- | ---------------------------------- |
| `ARDUINO_TUYA_T5AI`   | 平台标识宏，用于条件编译分支                     |
| `digitalPinToBitMask` | TuyaOpen 平台缺少此函数，提供宏定义替代           |
| `ltoa`                | TuyaOpen 平台缺少此函数，映射到 `itoa`        |
| `DC_C / DC_D`         | 控制 DC 引脚高低电平，区分发送的是命令还是数据          |
| `CS_L / CS_H`         | 控制 CS 引脚，SPI 通信前拉低，通信后拉高           |
| `ENABLE_TUYA_DRAW_BUF` | 启用缓冲批量传输，避免逐像素 SPI 调用导致性能极差       |

#### 1.2 创建 `Processors/TFT_eSPI_TuyaOpen.c`

此文件实现 SPI 读写的底层函数。在 `Processors/` 目录下创建 `TFT_eSPI_TuyaOpen.c`：

```c
////////////////////////////////////////////////////
//       TFT_eSPI TuyaOpen driver functions       //
////////////////////////////////////////////////////
#include "SPI.h"
#include "TFT_eSPI_TuyaOpen.h"
#include "tal_memory.h"

// Select the SPI port to use
SPIClass& spi = SPI;

/***************************************************************************************
** Function name:           readByte
** Description:             Dummy function - not used on this platform
***************************************************************************************/
uint8_t TFT_eSPI::readByte(void)
{
  uint8_t b = 0xAA;
  return b;
}

// Standard SPI 16-bit colour TFT
#if !defined(TFT_PARALLEL_8_BIT) && !defined(SPI_18BIT_DRIVER)

/***************************************************************************************
** Function name:           pushBlock
** Description:             Write a block of pixels of the same colour
***************************************************************************************/
void TFT_eSPI::pushBlock(uint16_t color, uint32_t len){
#ifdef ENABLE_TUYA_DRAW_BUF
  uint8_t *data = (uint8_t*)tal_malloc(TUYA_DRAW_BUF_SIZE);
  if (data == NULL) {
    while ( len-- ) { tft_Write_16(color); }
    return;
  }
  memset(data, 0, TUYA_DRAW_BUF_SIZE);
  uint32_t remainLen = len * 2;
  while (remainLen > 0) {
    uint32_t l = remainLen;
    if (l > TUYA_DRAW_BUF_SIZE) l = TUYA_DRAW_BUF_SIZE;
    for (uint32_t j = 0; j < l / 2; j++) {
      data[j * 2]     = (uint8_t)(color >> 8);
      data[j * 2 + 1] = (uint8_t)(color & 0xFF);
    }
    spi.transfer((uint8_t *)data, l);
    remainLen -= l;
  }
  tal_free(data);
#else
  while ( len-- ) { tft_Write_16(color); }
#endif
}

/***************************************************************************************
** Function name:           pushPixels
** Description:             Write a sequence of pixels
***************************************************************************************/
void TFT_eSPI::pushPixels(const void* data_in, uint32_t len) {
  uint16_t *data = (uint16_t*)data_in;
  if (_swapBytes) {
#ifdef ENABLE_TUYA_DRAW_BUF
    uint8_t *swapData = (uint8_t*)tal_malloc(TUYA_DRAW_BUF_SIZE);
    if (swapData == NULL) {
      while ( len-- ) { tft_Write_16(*data); data++; }
      return;
    }
    memset(swapData, 0, TUYA_DRAW_BUF_SIZE);
    uint32_t remainLen = len * 2;
    while (remainLen > 0) {
      uint32_t l = remainLen;
      if (l > TUYA_DRAW_BUF_SIZE) l = TUYA_DRAW_BUF_SIZE;
      for (uint32_t j = 0; j < l / 2; j++) {
        swapData[j * 2]     = (uint8_t)(data[j] >> 8);
        swapData[j * 2 + 1] = (uint8_t)(data[j] & 0xFF);
      }
      spi.transfer((uint8_t *)swapData, l);
      remainLen -= l;
    }
    tal_free(swapData);
#else
    while ( len-- ) { tft_Write_16(*data); data++; }
#endif
  } else {
    spi.transfer((uint8_t *)data_in, len * 2);
  }
}

// ======================== 基础 SPI 写入函数 ========================

void tft_Write_8(uint8_t C) {
  spi.transfer((void *)&C, 1);
}

void tft_Write_16(uint16_t C) {
  uint8_t data[2] = {(uint8_t)(C >> 8), (uint8_t)(C >> 0)};
  spi.transfer(data, 2);
}

void tft_Write_16S(uint16_t C) {
  uint8_t data[2] = {(uint8_t)(C >> 0), (uint8_t)(C >> 8)};
  spi.transfer(data, 2);
}

void tft_Write_32(uint32_t C) {
  uint8_t data[4] = {(uint8_t)(C >> 24), (uint8_t)(C >> 16), (uint8_t)(C >> 8), (uint8_t)(C >> 0)};
  spi.transfer(data, 4);
}

void tft_Write_32C(uint16_t C, uint16_t D) {
  uint8_t data[4] = {(uint8_t)(C >> 8), (uint8_t)(C >> 0), (uint8_t)(D >> 8), (uint8_t)(D >> 0)};
  spi.transfer(data, 4);
}

void tft_Write_32D(uint16_t C) {
  uint8_t data[4] = {(uint8_t)(C >> 8), (uint8_t)(C >> 0), (uint8_t)(C >> 8), (uint8_t)(C >> 0)};
  spi.transfer(data, 4);
}

#endif
```

---

## Step 2：创建屏幕配置文件

在 `User_Setups/` 目录下创建 `Setup_TUYA_T5AI_ST7789.h`。

此文件定义了屏幕驱动类型、分辨率、SPI 引脚和频率等所有硬件参数：

```c
#define USER_SETUP_ID 303

// ==================== 驱动设置 ====================
#define ST7789_DRIVER       // ST7789 驱动芯片
#define CGRAM_OFFSET        // 某些 ST7789 面板需要此偏移

// ==================== 屏幕尺寸 ====================
#define TFT_WIDTH  240
#define TFT_HEIGHT 240

// ==================== 颜色顺序 ====================
#define TFT_RGB_ORDER TFT_BGR  // 蓝-绿-红

// ==================== SPI 引脚 ====================
#define TFT_SCLK  14   // SPI 时钟
#define TFT_MOSI  16   // SPI 数据输出
#define TFT_MISO  17   // SPI 数据输入（本场景未使用，但需定义）

#define TFT_DC    18   // 数据/命令选择
#define TFT_RST   6    // 屏幕复位

// ==================== 背光 ====================
#define TFT_BL    5             // 背光引脚
#define TFT_BACKLIGHT_ON HIGH   // 背光有效电平

// ==================== 触摸（未使用） ====================
#define TOUCH_CS  (-1)

// ==================== 字体 ====================
#define SMOOTH_FONT

// ==================== SPI 频率 ====================
#define SPI_FREQUENCY  25000000  // 25MHz

// ==================== 其他 ====================
#define SUPPORT_TRANSACTIONS
#define TFT_SPI_MODE SPI_MODE0
```

> **注意：** LCD 电源引脚 (GPIO 7) 无法通过库配置自动控制，需要在用户代码中手动开启，见 [Step 6](#step-6烧录与验证)。

---

## Step 3：注册处理器驱动到库主文件

需要修改两个核心文件，让库在编译时能识别并加载 TuyaOpen 平台的驱动。

#### 3.1 修改 `TFT_eSPI.h` — 注册处理器头文件

找到处理器驱动的 `#if` / `#elif` 链（约第 95 行），在 `#else` 之前插入 TuyaOpen 分支：

```c
// Include the processor specific drivers
#if defined(CONFIG_IDF_TARGET_ESP32S3)
  #include "Processors/TFT_eSPI_ESP32_S3.h"
#elif defined(CONFIG_IDF_TARGET_ESP32C3)
  #include "Processors/TFT_eSPI_ESP32_C3.h"
#elif defined (ESP32)
  #include "Processors/TFT_eSPI_ESP32.h"
#elif defined (ARDUINO_ARCH_ESP8266)
  #include "Processors/TFT_eSPI_ESP8266.h"
#elif defined (STM32)
  #include "Processors/TFT_eSPI_STM32.h"
#elif defined(ARDUINO_ARCH_RP2040)
  #include "Processors/TFT_eSPI_RP2040.h"
#elif defined(ARDUINO_TUYA_T5AI)                   // ← 新增
  #include "Processors/TFT_eSPI_TuyaOpen.h"        // ← 新增
#else
  #include "Processors/TFT_eSPI_Generic.h"
  #define GENERIC_PROCESSOR
#endif
```

#### 3.2 修改 `TFT_eSPI.cpp` — 注册处理器实现文件

找到处理器 `.c` 文件的 `#if` / `#elif` 链（约第 18 行），在 `#else` 之前插入：

```c
#elif defined (ARDUINO_ARCH_RP2040)  || defined (ARDUINO_ARCH_MBED)
  #include "Processors/TFT_eSPI_RP2040.c"
#elif defined (ARDUINO_TUYA_T5AI)                   // ← 新增
  #include "Processors/TFT_eSPI_TuyaOpen.c"         // ← 新增
#else
  #include "Processors/TFT_eSPI_Generic.c"
#endif
```

#### 3.3 修改 `TFT_eSPI.cpp` — 排除不兼容的 API 调用

TuyaOpen 平台的 SPI 库只支持无参数的 `spi.begin()`，且不支持 `digitalPinToBitMask`，需要在两处条件编译中添加排除：

**位置 1**（约第 619 行）— `digitalPinToBitMask` 区域：

```cpp
// 修改前：
#if !defined (ESP32) && !defined(TFT_PARALLEL_8_BIT) && !defined(ARDUINO_ARCH_RP2040) && !defined (ARDUINO_ARCH_MBED)

// 修改后：
#if !defined (ESP32) && !defined(TFT_PARALLEL_8_BIT) && !defined(ARDUINO_ARCH_RP2040) && !defined (ARDUINO_ARCH_MBED) && !defined(ARDUINO_TUYA_T5AI)
```

**位置 2**（约第 649 行）— `spi.begin()` 带参数调用：

```cpp
// 修改前：
#if defined (TFT_MOSI) && !defined (TFT_SPI_OVERLAP) && !defined(ARDUINO_ARCH_RP2040) && !defined (ARDUINO_ARCH_MBED)
      spi.begin(TFT_SCLK, TFT_MISO, TFT_MOSI, -1);

// 修改后：
#if defined (TFT_MOSI) && !defined (TFT_SPI_OVERLAP) && !defined(ARDUINO_ARCH_RP2040) && !defined (ARDUINO_ARCH_MBED) && !defined(ARDUINO_TUYA_T5AI)
      spi.begin(TFT_SCLK, TFT_MISO, TFT_MOSI, -1);
```

这样 TuyaOpen 平台会走到 `spi.begin()`（无参数版本）分支。

---

## Step 4：启用配置文件

编辑 `User_Setup_Select.h`，**注释掉所有其他配置**，只启用 TUYA T5AI 的配置：

```cpp
// Only ONE line below should be uncommented to define your setup.

//#include <User_Setup.h>           // ← 注释掉默认配置

// ... (中间所有其他配置保持注释状态) ...

#include <User_Setups/Setup_TUYA_T5AI_ST7789.h>    // ← 启用此行

#endif // USER_SETUP_LOADED
```

> ⚠️ **重要：** 同时只能启用一个配置文件。确保其他所有 `#include` 行都被 `//` 注释掉。

---

## Step 5：编译验证

在 Arduino IDE 中：

1. 选择开发板：**TUYA-T5AI**
2. 打开任意 TFT_eSPI 示例（如 `File > Examples > TFT_eSPI > Generic > Gradient_Fill`）
3. 点击 **Verify/Compile**
4. 确认编译通过（无 error，warning 可忽略）
5. 点击上传固件

---

## 常见问题排查

| 问题 | 可能原因 | 解决方案 |
|------|---------|---------|
| 编译报 `digitalPinToBitMask` 错误 | 未在 `TFT_eSPI.cpp` 中排除 TuyaOpen | 添加 `&& !defined(ARDUINO_TUYA_T5AI)` |
| 编译报 `ltoa` 错误 | `TFT_eSPI_TuyaOpen.h` 缺少 ltoa 定义 | 添加 `#define ltoa(val, buf, base) itoa(...)` |
| 编译报 `spi.begin(int,int,int,int)` 错误 | TuyaOpen SPI 不支持带参数 begin | 在 `spi.begin` 条件中排除 TuyaOpen |
| 屏幕无显示（黑屏） | LCD 电源未开启 | 在 `tft.init()` 前添加 `digitalWrite(7, HIGH)` |
| 只有背光没有内容 | CS 引脚未定义或 SPI 引脚错误 | 检查 Setup 文件中的引脚定义 |
| 颜色反了（红蓝互换） | 颜色顺序错误 | 切换 `TFT_RGB_ORDER` 为 `TFT_RGB` 或 `TFT_BGR` |
| 颜色反色（负片效果） | 缺少反转设置 | 尝试添加 `#define TFT_INVERSION_ON` |
| 刷新慢 | SPI 频率过低 | 逐步提高 `SPI_FREQUENCY`（25MHz → 48MHz） |

---

## 修改文件汇总

| 文件 | 操作 | 说明 |
|------|------|------|
| `Processors/TFT_eSPI_TuyaOpen.h` | **新建** | 处理器驱动头文件 |
| `Processors/TFT_eSPI_TuyaOpen.c` | **新建** | 处理器驱动实现 |
| `User_Setups/Setup_TUYA_T5AI_ST7789.h` | **新建** | 屏幕硬件配置 |
| `TFT_eSPI.h` | **修改** | 添加 TuyaOpen 处理器头文件包含 |
| `TFT_eSPI.cpp` | **修改** | 添加 TuyaOpen 处理器实现包含 + 排除不兼容 API |
| `User_Setup_Select.h` | **修改** | 启用 TUYA T5AI 配置文件 |
