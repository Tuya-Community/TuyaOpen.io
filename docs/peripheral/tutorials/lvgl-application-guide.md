---
title: LVGL Application Guide
---

## Overview

This guide explains how to build **LVGL** (Light and Versatile Graphics Library) applications on TuyaOpen: enable the stack in configuration, initialize the display through the **vendor port** (`lv_vendor_*`), create widgets, and run the LVGL task. It complements the [Display Driver Integration Guide](display-driver-guide) (TDL display and panels) and the [Display](display) reference.

## Prerequisites

- [Environment setup](../../quick-start/enviroment-setup)
- [Project compilation](../../quick-start/project-compilation)
- [Display Driver Integration Guide](display-driver-guide) (recommended for new panels)

## Requirements

- Board with a supported display (see examples below).
- `tos.py` / Kconfig access to enable LVGL and display drivers.
- On **T5AI-class targets**, TuyaOpen ships LVGL under `src/liblvgl/` with `lv_vendor` glue. On **ESP32**, LVGL usually comes from the **ESP-IDF component** and a board-specific port (`boards/ESP32/common/display/`); behavior matches the [ESP32 supported features](../../hardware-specific/espressif/esp32-supported-features) notes, not the T5 `lv_vendor` path.

## Steps

1. Start from an LVGL example or app template:
   - `examples/graphics/lvgl_demo` (widgets demo)
   - `examples/graphics/lvgl_label` (minimal label)
   - `examples/graphics/lvgl_gif` (GIF widget)
   - `examples/graphics/lvgl_camera` (camera preview, board-specific)

2. Choose a **board config** that matches your LCD and touch (for example `TUYA_T5AI_BOARD_LCD_3.5.config` or an ESP32 breadboard config for `lvgl_demo`).

3. Open menuconfig and enable **LVGL** and the correct **display / touch** drivers. See [Display](display) for the LVGL option and panel-related macros.

4. Build and flash from the example directory:

   ```bash
   cd examples/graphics/lvgl_demo
   tos.py config choice
   tos.py build
   ```

5. Inspect `user_main` in `src/example_lvgl.c` (or `example_lvgl_label.c`): hardware registration, `lv_vendor_init`, UI setup, `lv_vendor_start`.

**Expected outcome:** The demo draws on screen; the LVGL task keeps `lv_timer_handler` running via the vendor layer.

## Initialize LVGL (T5 / `lv_vendor` path)

Typical sequence (from `examples/graphics/lvgl_demo` and `lvgl_label`):

```c
#include "board_com_api.h"
#include "lvgl.h"
#include "lv_vendor.h"

void user_main(void)
{
    tal_log_init(TAL_LOG_LEVEL_DEBUG, 4096, (TAL_LOG_OUTPUT_CB)tkl_log_output);
    board_register_hardware();

    lv_vendor_init(DISPLAY_NAME);

    lv_vendor_disp_lock();
    /* Create objects, e.g. lv_demo_widgets() or lv_label_create() */
    lv_vendor_disp_unlock();

    lv_vendor_start(5, 1024 * 8);
}
```

| Step | Purpose |
| ---- | ------- |
| `board_register_hardware()` | Registers LCD, touch, and other board devices before graphics. |
| `lv_vendor_init(DISPLAY_NAME)` | Calls `lv_init()`, `lv_port_disp_init`, `lv_port_indev_init`, sets the tick callback, and creates internal sync primitives. `DISPLAY_NAME` is the Kconfig display instance name (string). |
| `lv_vendor_disp_lock()` / `lv_vendor_disp_unlock()` | Mutex around LVGL API calls that run **outside** the dedicated LVGL thread (for example during startup). |
| `lv_vendor_start(priority, stack_size)` | Starts the thread that runs `lv_timer_handler()` in a loop. |

Do not call arbitrary LVGL APIs from ISR context; use TAL workqueues or events to defer UI work.

## Interact with widgets

After `lv_vendor_init` and inside `lv_vendor_disp_lock` / `unlock` (or from code that already runs in a safe context):

- Create objects with `lv_<type>_create`, set text, styles, and alignment.
- Use `lv_screen_active()` as the default root for simple UIs.
- Prefer LVGL APIs documented in the LVGL version bundled under `src/liblvgl/` for your branch.

Example from `lvgl_label`:

```c
lv_vendor_disp_lock();
lv_obj_set_style_bg_color(lv_screen_active(), lv_color_white(), LV_PART_MAIN);
lv_obj_t *label = lv_label_create(lv_screen_active());
lv_label_set_text(label, "Hello World!");
lv_obj_align(label, LV_ALIGN_CENTER, 0, 0);
lv_vendor_disp_unlock();
lv_vendor_start(5, 1024 * 8);
```

For built-in demos, include `demos/lv_demos.h` and call `lv_demo_widgets()` (or other demos) between lock and unlock, as in `lvgl_demo`.

## Build your own LVGL app

1. Copy `examples/graphics/lvgl_demo` (or `lvgl_label`) as a starting CMake project under `apps/` or `examples/`.
2. Keep `ENABLE_LIBLVGL` and display options consistent in `app_default.config` / Kconfig fragments for your board.
3. Implement or reuse `board_register_hardware()` for your PCB (SPI/RGB panel, touch I2C, backlight).
4. Replace demo calls with your UI module; keep `lv_vendor_start` after UI is constructed.
5. If you add dynamic updates (network status, sensor values), refresh widgets from worker threads using `lv_vendor_disp_lock` / `unlock` around LVGL calls, or use `lv_async_call` patterns recommended by LVGL for your version.

## Platform notes

| Platform | LVGL source | Port entry |
| -------- | ----------- | ---------- |
| T5AI (typical) | `src/liblvgl/` | `lv_vendor_init` / `lv_port_disp` / TDL-backed display |
| ESP32 (typical) | ESP-IDF LVGL | Board `board_register_hardware` + IDF LVGL port files |

Always read the **README** in your chosen example for the current **supported board matrix** (for example `lvgl_demo/README.md` lists T3 SPI, T5AI RGB/SPI, and ESP32 status).

## References

- Examples: `examples/graphics/lvgl_demo`, `lvgl_label`, `lvgl_gif`, `lvgl_camera`
- Vendor API: `src/liblvgl/v9/port/lv_vendor.h` (or `v8` on older trees)
- [Display Driver Integration Guide](display-driver-guide)
- [Display](display)
- [Examples index](../../examples/demo-generic-examples)
