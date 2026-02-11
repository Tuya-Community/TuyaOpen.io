# Arduino Ecosystem Library Adaptation

Arduino offers an extremely rich collection of extension libraries, allowing everyone to quickly bring their ideas to life. This example demonstrates how to adapt Arduino extension libraries for the TUYA-T5AI series development boards.

## Display Library: TFT_eSPI

The TFT_eSPI library is an Arduino library for driving LCD screens via SPI. It provides a rich set of APIs for controlling screen display, including initialization, text rendering, and graphics drawing. You can search for `TFT_eSPI` in the Arduino IDE Library Manager to download it. The download location is determined by `Arduino IDE` -> `File` -> `Preferences` -> `Sketchbook location`.

This document provides a detailed record of the complete process of adapting the [TFT_eSPI](https://github.com/Bodmer/TFT_eSPI) graphics library to the **TUYA T5AI** development board in the Arduino IDE.

---

## Hardware Information

| Item | Parameter |
| ---- | --------- |
| Development Board | TUYA T5AI |
| Display | 1.54-inch TFT LCD |
| Driver IC | ST7789 |
| Resolution | 240 × 240 |
| Interface | SPI |
| Pixel Format | RGB565 |
| Platform Macro | `ARDUINO_TUYA_T5AI` |

**LCD Pin Definitions:**

| Function | GPIO | Description |
| -------- | ---- | ----------- |
| SPI SCLK | 14 | SPI clock |
| SPI MOSI | 16 | SPI data output |
| SPI MISO | 17 | SPI data input (not used in this case) |
| DC | 18 | Data/Command select |
| RST | 6 | Screen reset |
| BL | 5 | Backlight control (active HIGH) |

---

## Adaptation Principle

> The TFT_eSPI library adapts to different hardware through **compile-time configuration**, with conditional compilation (`#if defined`) as the core mechanism. Adapting a new platform requires modifications at three levels:

```
┌─────────────────────────────────────────────────┐
│  User_Setups/Setup_TUYA_T5AI_ST7789.h          │  ← Screen config (pins, driver, frequency)
├─────────────────────────────────────────────────┤
│  User_Setup_Select.h                            │  ← Selects which config file to enable
├─────────────────────────────────────────────────┤
│  TFT_eSPI.h / TFT_eSPI.cpp                     │  ← Registers processor driver (conditional compilation entry)
├─────────────────────────────────────────────────┤
│  Processors/TFT_eSPI_TuyaOpen.h                 │  ← Processor driver header (pin macros, compatibility patches)
│  Processors/TFT_eSPI_TuyaOpen.c                 │  ← Processor driver implementation (SPI read/write functions)
└─────────────────────────────────────────────────┘
```

---

## Step 1: Create Processor Driver Files

#### 1.1 Create `Processors/TFT_eSPI_TuyaOpen.h`

This file defines the platform-specific **pin control macros** and **compatibility patches**.

Create `TFT_eSPI_TuyaOpen.h` in the `Processors/` directory with the following complete content:

```c
////////////////////////////////////////////////////
//       TFT_eSPI TuyaOpen driver functions       //
////////////////////////////////////////////////////

#ifndef _TFT_eSPI_TUYAOPEN_
#define _TFT_eSPI_TUYAOPEN_

// Processor ID reported by getSetup()
#define PROCESSOR_ID 0x6602

// Platform identifier
#ifndef ARDUINO_TUYA_T5AI
  #define ARDUINO_TUYA_T5AI 1
#endif

// Enable Tuya draw buffer (batch SPI transfer for better performance)
#define ENABLE_TUYA_DRAW_BUF

#ifdef ENABLE_TUYA_DRAW_BUF
#define TUYA_DRAW_BUF_SIZE (128*2)  // Buffer size (bytes)
#endif

#include <api/itoa.h>

// ======================== Compatibility Patches ========================
// TuyaOpen platform lacks digitalPinToBitMask, provide a substitute
#ifndef digitalPinToBitMask
  #define digitalPinToBitMask(pin) (1UL << (pin))
#endif

// TuyaOpen platform lacks ltoa, map to itoa
#ifndef ltoa
  #define ltoa(val, buf, base) itoa((int)(val), buf, base)
#endif

// ======================== SPI Bus Control ========================
#define SET_BUS_WRITE_MODE
#define SET_BUS_READ_MODE
#define DMA_BUSY_CHECK

#if !defined (SUPPORT_TRANSACTIONS)
  #define SUPPORT_TRANSACTIONS
#endif

#define INIT_TFT_DATA_BUS

#ifdef SMOOTH_FONT
  // TODO: File system support (for loading smooth font files if needed)
#endif

// ======================== DC Pin Control ========================
#ifndef TFT_DC
  #define DC_C
  #define DC_D
#else
  #define DC_C digitalWrite(TFT_DC, LOW)
  #define DC_D digitalWrite(TFT_DC, HIGH)
#endif

// ======================== CS Pin Control ========================
#ifndef TFT_CS
  #define CS_L
  #define CS_H
#else
  #define CS_L digitalWrite(TFT_CS, LOW)
  #define CS_H digitalWrite(TFT_CS, HIGH)
#endif

// ======================== Other Pins ========================
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

// ======================== SPI Write Function Declarations ========================
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

**Key points:**

| Content | Purpose |
| ------- | ------- |
| `ARDUINO_TUYA_T5AI` | Platform identifier macro used for conditional compilation branches |
| `digitalPinToBitMask` | TuyaOpen platform lacks this function; a macro definition is provided as substitute |
| `ltoa` | TuyaOpen platform lacks this function; mapped to `itoa` |
| `DC_C / DC_D` | Controls the DC pin high/low level to distinguish between commands and data |
| `CS_L / CS_H` | Controls the CS pin — pulled low before SPI communication, pulled high after |
| `ENABLE_TUYA_DRAW_BUF` | Enables buffered batch transfer to avoid extremely poor performance from per-pixel SPI calls |

#### 1.2 Create `Processors/TFT_eSPI_TuyaOpen.c`

This file implements the low-level SPI read/write functions. Create `TFT_eSPI_TuyaOpen.c` in the `Processors/` directory:

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

// ======================== Basic SPI Write Functions ========================

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

## Step 2: Create Screen Configuration File

Create `Setup_TUYA_T5AI_ST7789.h` in the `User_Setups/` directory.

This file defines all hardware parameters including the screen driver type, resolution, SPI pins, and frequency:

```c
#define USER_SETUP_ID 303

// ==================== Driver Settings ====================
#define ST7789_DRIVER       // ST7789 driver IC
#define CGRAM_OFFSET        // Some ST7789 panels require this offset

// ==================== Screen Size ====================
#define TFT_WIDTH  240
#define TFT_HEIGHT 240

// ==================== Color Order ====================
#define TFT_RGB_ORDER TFT_BGR  // Blue-Green-Red

// ==================== SPI Pins ====================
#define TFT_SCLK  14   // SPI clock
#define TFT_MOSI  16   // SPI data output
#define TFT_MISO  17   // SPI data input (not used here, but must be defined)

#define TFT_DC    18   // Data/Command select
#define TFT_RST   6    // Screen reset

// ==================== Backlight ====================
#define TFT_BL    5             // Backlight pin
#define TFT_BACKLIGHT_ON HIGH   // Backlight active level

// ==================== Touch (Not Used) ====================
#define TOUCH_CS  (-1)

// ==================== Fonts ====================
#define SMOOTH_FONT

// ==================== SPI Frequency ====================
#define SPI_FREQUENCY  25000000  // 25MHz

// ==================== Other ====================
#define SUPPORT_TRANSACTIONS
#define TFT_SPI_MODE SPI_MODE0
```

> **Note:** The LCD power pin (GPIO 7) cannot be controlled automatically through library configuration. It must be manually enabled in user code — see [Step 6](#step-5-compile-and-verify).

---

## Step 3: Register Processor Driver in Library Main Files

Two core files need to be modified so the library can recognize and load the TuyaOpen platform driver during compilation.

#### 3.1 Modify `TFT_eSPI.h` — Register the Processor Header File

Locate the `#if` / `#elif` chain for processor drivers (around line 95) and insert the TuyaOpen branch before `#else`:

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
#elif defined(ARDUINO_TUYA_T5AI)                   // ← New addition
  #include "Processors/TFT_eSPI_TuyaOpen.h"        // ← New addition
#else
  #include "Processors/TFT_eSPI_Generic.h"
  #define GENERIC_PROCESSOR
#endif
```

#### 3.2 Modify `TFT_eSPI.cpp` — Register the Processor Implementation File

Locate the `#if` / `#elif` chain for processor `.c` files (around line 18) and insert before `#else`:

```c
#elif defined (ARDUINO_ARCH_RP2040)  || defined (ARDUINO_ARCH_MBED)
  #include "Processors/TFT_eSPI_RP2040.c"
#elif defined (ARDUINO_TUYA_T5AI)                   // ← New addition
  #include "Processors/TFT_eSPI_TuyaOpen.c"         // ← New addition
#else
  #include "Processors/TFT_eSPI_Generic.c"
#endif
```

#### 3.3 Modify `TFT_eSPI.cpp` — Exclude Incompatible API Calls

The TuyaOpen platform's SPI library only supports the parameterless `spi.begin()` and does not support `digitalPinToBitMask`. Exclusions need to be added in two conditional compilation sections:

**Location 1** (around line 619) — `digitalPinToBitMask` section:

```cpp
// Before:
#if !defined (ESP32) && !defined(TFT_PARALLEL_8_BIT) && !defined(ARDUINO_ARCH_RP2040) && !defined (ARDUINO_ARCH_MBED)

// After:
#if !defined (ESP32) && !defined(TFT_PARALLEL_8_BIT) && !defined(ARDUINO_ARCH_RP2040) && !defined (ARDUINO_ARCH_MBED) && !defined(ARDUINO_TUYA_T5AI)
```

**Location 2** (around line 649) — `spi.begin()` with parameters:

```cpp
// Before:
#if defined (TFT_MOSI) && !defined (TFT_SPI_OVERLAP) && !defined(ARDUINO_ARCH_RP2040) && !defined (ARDUINO_ARCH_MBED)
      spi.begin(TFT_SCLK, TFT_MISO, TFT_MOSI, -1);

// After:
#if defined (TFT_MOSI) && !defined (TFT_SPI_OVERLAP) && !defined(ARDUINO_ARCH_RP2040) && !defined (ARDUINO_ARCH_MBED) && !defined(ARDUINO_TUYA_T5AI)
      spi.begin(TFT_SCLK, TFT_MISO, TFT_MOSI, -1);
```

This ensures the TuyaOpen platform falls through to the `spi.begin()` (parameterless version) branch.

---

## Step 4: Enable the Configuration File

Edit `User_Setup_Select.h`, **comment out all other configurations**, and only enable the TUYA T5AI configuration:

```cpp
// Only ONE line below should be uncommented to define your setup.

//#include <User_Setup.h>           // ← Comment out the default config

// ... (keep all other configurations commented) ...

#include <User_Setups/Setup_TUYA_T5AI_ST7789.h>    // ← Enable this line

#endif // USER_SETUP_LOADED
```

> ⚠️ **Important:** Only one configuration file can be enabled at a time. Make sure all other `#include` lines are commented out with `//`.

---

## Step 5: Compile and Verify

In the Arduino IDE:

1. Select the board: **TUYA-T5AI**
2. Open any TFT_eSPI example (e.g., `File > Examples > TFT_eSPI > Generic > Gradient_Fill`)
3. Click **Verify/Compile**
4. Confirm successful compilation (no errors; warnings can be ignored)
5. Click Upload to flash the firmware

---

## Troubleshooting

| Issue | Possible Cause | Solution |
|-------|---------------|----------|
| Compilation error: `digitalPinToBitMask` | TuyaOpen not excluded in `TFT_eSPI.cpp` | Add `&& !defined(ARDUINO_TUYA_T5AI)` |
| Compilation error: `ltoa` | `TFT_eSPI_TuyaOpen.h` missing ltoa definition | Add `#define ltoa(val, buf, base) itoa(...)` |
| Compilation error: `spi.begin(int,int,int,int)` | TuyaOpen SPI does not support parameterized begin | Exclude TuyaOpen in the `spi.begin` condition |
| No display (black screen) | LCD power not enabled | Add `digitalWrite(7, HIGH)` before `tft.init()` |
| Backlight on but no content | CS pin undefined or SPI pin misconfiguration | Check pin definitions in the Setup file |
| Inverted colors (red and blue swapped) | Incorrect color order | Toggle `TFT_RGB_ORDER` between `TFT_RGB` and `TFT_BGR` |
| Inverted colors (negative image effect) | Missing inversion setting | Try adding `#define TFT_INVERSION_ON` |
| Slow refresh rate | SPI frequency too low | Gradually increase `SPI_FREQUENCY` (25MHz → 48MHz) |

---

## Modified Files Summary

| File | Operation | Description |
|------|-----------|-------------|
| `Processors/TFT_eSPI_TuyaOpen.h` | **New** | Processor driver header file |
| `Processors/TFT_eSPI_TuyaOpen.c` | **New** | Processor driver implementation |
| `User_Setups/Setup_TUYA_T5AI_ST7789.h` | **New** | Screen hardware configuration |
| `TFT_eSPI.h` | **Modified** | Added TuyaOpen processor header include |
| `TFT_eSPI.cpp` | **Modified** | Added TuyaOpen processor implementation include + excluded incompatible APIs |
| `User_Setup_Select.h` | **Modified** | Enabled the TUYA T5AI configuration file |
