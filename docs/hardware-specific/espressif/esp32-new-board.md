---
title: "Adding a New ESP32 Board"
---

# Adding a New ESP32 Board

Create a TuyaOpen Board Support Package (BSP) for custom ESP32 hardware. This enables your board to be selected via `tos.py config choice` and built alongside any TuyaOpen application.

## Prerequisites

- Completed [ESP32 Quick Start](esp32-quick-start)
- Understanding of your board's hardware (chip variant, pin assignments, peripherals)
- Familiarity with Kconfig and CMake basics

## Requirements

- TuyaOpen SDK cloned and environment set up
- Your custom ESP32 board (physical hardware for testing)
- Schematic or pinout reference for your board

## Board File Structure

Each board lives under `boards/ESP32/{BOARD_NAME}/`:

```
boards/ESP32/MY_CUSTOM_BOARD/
├── Kconfig                 # Board-specific Kconfig (chip, pins, features)
├── CMakeLists.txt          # Build configuration
├── my_custom_board.c       # Board initialization and hardware registration
├── board_config.h          # Pin definitions and hardware constants
└── board_com_api.h         # Board common API declarations
```

## Steps

### 1. Copy an existing board as a template

Choose the closest existing board to your hardware:

```bash
cd TuyaOpen/boards/ESP32
cp -r ESP32-S3 MY_CUSTOM_BOARD
```

### 2. Edit Kconfig

Update `MY_CUSTOM_BOARD/Kconfig`:

```kconfig
config BOARD_CHOICE_MY_CUSTOM_BOARD
    bool "MY_CUSTOM_BOARD"
    select ENABLE_WIFI
    select ENABLE_BLUETOOTH
    select ENABLE_GPIO
    select ENABLE_UART

config CHIP_CHOICE
    string
    default "esp32s3"

config BOARD_CHOICE
    string
    default "MY_CUSTOM_BOARD"

config UART_NUM_0_TXD_PIN
    int
    default 43

config UART_NUM_0_RXD_PIN
    int
    default 44
```

Adjust `CHIP_CHOICE` to match your chip (`esp32`, `esp32s3`, `esp32c3`, `esp32c6`). Set UART pins to match your board's serial output.

Enable additional features as needed:

```kconfig
select ENABLE_AUDIO           # If board has audio codec
select ENABLE_ESP_DISPLAY     # If board has display
select ENABLE_LED             # If board has addressable LEDs
select ENABLE_BUTTON          # If board has buttons
```

### 3. Register the board in the parent Kconfig

Edit `boards/ESP32/Kconfig` and add your board to the `choice` block:

```kconfig
config BOARD_CHOICE_MY_CUSTOM_BOARD
    bool "MY_CUSTOM_BOARD"
    depends on BOARD_ENABLE_ESP32
```

Add the `rsource` directive to load your board's Kconfig when selected:

```kconfig
if BOARD_CHOICE_MY_CUSTOM_BOARD
rsource "./MY_CUSTOM_BOARD/Kconfig"
endif
```

### 4. Configure pin mappings in board_config.h

Define your board's hardware connections:

```c
#ifndef __BOARD_CONFIG_H__
#define __BOARD_CONFIG_H__

/* UART */
#define BOARD_UART0_TX_PIN      43
#define BOARD_UART0_RX_PIN      44

/* I2C (if used) */
#define BOARD_I2C_SDA_PIN       8
#define BOARD_I2C_SCL_PIN       9

/* SPI Display (if used) */
#define BOARD_LCD_SPI_HOST      SPI2_HOST
#define BOARD_LCD_PIN_CS        10
#define BOARD_LCD_PIN_DC        11
#define BOARD_LCD_PIN_RST       12
#define BOARD_LCD_PIN_BL        13

/* Audio (if used) */
#define BOARD_I2S_BCK_PIN       15
#define BOARD_I2S_WS_PIN        16
#define BOARD_I2S_DOUT_PIN      17
#define BOARD_I2S_DIN_PIN       18

#endif /* __BOARD_CONFIG_H__ */
```

### 5. Implement board initialization

Edit `my_custom_board.c`:

```c
#include "board_config.h"
#include "board_com_api.h"
#include "tkl_gpio.h"

void board_register_hardware(void)
{
    /* Register display, audio, or other board-specific hardware.
       See boards/ESP32/common/ for shared ESP32 BSP drivers
       (LCD, audio codecs, touch, IO expander, LED). */
}
```

If your board uses a display, audio codec, or other common ESP32 peripheral, use the shared drivers from `boards/ESP32/common/`:

```c
#include "lcd_st7789_spi.h"    /* SPI display */
#include "tdd_audio_8311_codec.h"  /* ES8311 codec */
```

### 6. Update CMakeLists.txt

```cmake
aux_source_directory(${CMAKE_CURRENT_SOURCE_DIR} MODULE_SRC)
set(MODULE_NAME my_custom_board)
add_library(${MODULE_NAME} ${MODULE_SRC})
target_include_directories(${MODULE_NAME} PUBLIC ${CMAKE_CURRENT_SOURCE_DIR})

set(COMPONENT_LIBS ${COMPONENT_LIBS} ${MODULE_NAME} PARENT_SCOPE)
set(COMPONENT_PUBINC ${COMPONENT_PUBINC} ${CMAKE_CURRENT_SOURCE_DIR} PARENT_SCOPE)
```

### 7. Create a config preset

Create a config file for your board in your application:

```bash
mkdir -p apps/my_app/config
```

Write `apps/my_app/config/MY_CUSTOM_BOARD.config`:

```
CONFIG_BOARD_CHOICE_ESP32=y
CONFIG_BOARD_CHOICE_MY_CUSTOM_BOARD=y
CONFIG_ENABLE_WIFI=y
CONFIG_ENABLE_GPIO=y
```

### 8. Build and test

```bash
cd apps/my_app
tos.py config choice        # Select MY_CUSTOM_BOARD
tos.py build
tos.py flash
tos.py monitor
```

## Architecture Rules

Follow these dependency rules when writing board code:

| Layer | Can call | Cannot call |
|-------|---------|-------------|
| `boards/ESP32/MY_BOARD/` | TKL APIs, `boards/ESP32/common/`, ESP-IDF vendor APIs | TuyaOpen `src/` directly |
| `boards/ESP32/common/` | TKL APIs, ESP-IDF vendor APIs | App code |
| Your app code | TAL/TKL APIs, TuyaOpen `src/` | ESP-IDF vendor APIs (not portable) |

:::warning
If your board code calls ESP-IDF APIs directly (e.g., `esp_lcd_*`, `i2s_channel_*`), that code is ESP32-specific. Place it in `boards/ESP32/` only, not in your application `src/`.
:::

## References

- [ESP32 on TuyaOpen -- Overview](overview-esp32)
- [ESP32 Supported Features](esp32-supported-features)
- [Porting a New Platform](../../new-hardware/porting-platform)
- [boards/add_new_board.md in the SDK](https://github.com/tuya/TuyaOpen/blob/master/boards/add_new_board.md)
