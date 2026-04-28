---
title: LVGL 应用指南
---

## 概述

本指南说明如何在 TuyaOpen 上开发 **LVGL**（Light and Versatile Graphics Library）应用：在配置中打开协议栈、通过 **`lv_vendor_*` 厂商移植层** 初始化显示、创建控件并启动 LVGL 任务。内容与 [显示驱动集成指南](display-driver-guide)（TDL 显示与面板）及 [Display](display) 参考文档互补。

## 前置条件

- [环境搭建](../../quick-start/enviroment-setup)
- [工程编译](../../quick-start/project-compilation)
- 建议先阅读 [显示驱动集成指南](display-driver-guide)

## 要求

- 具备支持的显示屏的开发板（见下文示例）。
- 可通过 `tos.py` / Kconfig 打开 LVGL 与显示驱动。
- **T5AI 类**目标：LVGL 位于 `src/liblvgl/`，使用 `lv_vendor` 衔接。**ESP32** 通常使用 **ESP-IDF 的 LVGL 组件** 及板级移植（`boards/ESP32/common/display/`），行为以 [ESP32 功能支持](../../hardware-specific/espressif/esp32-supported-features) 为准，而非 T5 的 `lv_vendor` 单一路径。

## 步骤

1. 以 LVGL 示例或应用模板为起点：
   - `examples/graphics/lvgl_demo`（控件 Demo）
   - `examples/graphics/lvgl_label`（最小标签示例）
   - `examples/graphics/lvgl_gif`
   - `examples/graphics/lvgl_camera`（依赖板型）

2. 选择与实际 **LCD/触摸** 匹配的 **board 配置**（如 `TUYA_T5AI_BOARD_LCD_3.5.config` 或 ESP32 面包板配置）。

3. 在 menuconfig 中启用 **LVGL** 及对应 **显示/触摸** 驱动。选项说明见 [Display](display)。

4. 在示例目录编译烧录：

   ```bash
   cd examples/graphics/lvgl_demo
   tos.py config choice
   tos.py build
   ```

5. 阅读 `src/example_lvgl.c` 或 `example_lvgl_label.c` 中的 `user_main`：硬件注册、`lv_vendor_init`、界面搭建、`lv_vendor_start`。

**预期结果：** 屏幕显示 Demo；LVGL 任务通过 vendor 层持续调用 `lv_timer_handler`。

## 初始化 LVGL（T5 / `lv_vendor` 路径）

典型流程（与 `lvgl_demo`、`lvgl_label` 一致）：

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
    /* 创建控件，如 lv_demo_widgets() 或 lv_label_create() */
    lv_vendor_disp_unlock();

    lv_vendor_start(5, 1024 * 8);
}
```

| 步骤 | 作用 |
| ---- | ---- |
| `board_register_hardware()` | 注册 LCD、触摸等板级外设。 |
| `lv_vendor_init(DISPLAY_NAME)` | 调用 `lv_init()`、`lv_port_disp_init`、`lv_port_indev_init`，设置 tick 回调并创建同步对象。`DISPLAY_NAME` 为 Kconfig 中的显示实例名（字符串）。 |
| `lv_vendor_disp_lock()` / `unlock()` | 在 **专用 LVGL 线程外** 调用 LVGL API 时加锁（如启动阶段建 UI）。 |
| `lv_vendor_start(priority, stack_size)` | 启动循环执行 `lv_timer_handler()` 的线程。 |

请勿在中断服务程序中直接调用 LVGL API；请用 TAL 工作队列或事件将 UI 更新延后到任务上下文。

## 与控件交互

在 `lv_vendor_init` 之后，于 `lv_vendor_disp_lock` 与 `unlock` 之间（或已保证线程安全的上下文）：

- 使用 `lv_<类型>_create` 创建对象，设置文本、样式、对齐。
- 简单界面可将 `lv_screen_active()` 作为根。
- 具体 API 以当前分支下 `src/liblvgl/` 所带 LVGL 版本文档为准。

`lvgl_label` 示例片段：

```c
lv_vendor_disp_lock();
lv_obj_set_style_bg_color(lv_screen_active(), lv_color_white(), LV_PART_MAIN);
lv_obj_t *label = lv_label_create(lv_screen_active());
lv_label_set_text(label, "Hello World!");
lv_obj_align(label, LV_ALIGN_CENTER, 0, 0);
lv_vendor_disp_unlock();
lv_vendor_start(5, 1024 * 8);
```

使用内置 Demo 时需包含 `demos/lv_demos.h`，并在 lock 区间内调用 `lv_demo_widgets()` 等，与 `lvgl_demo` 一致。

## 构建自有 LVGL 应用

1. 复制 `examples/graphics/lvgl_demo`（或 `lvgl_label`）到 `apps/` 或 `examples/` 下作为 CMake 工程模板。
2. 在 `app_default.config` / Kconfig 片段中保持 `ENABLE_LIBLVGL` 与显示选项与板型一致。
3. 为 PCB 实现或复用 `board_register_hardware()`（SPI/RGB 屏、触摸 I2C、背光等）。
4. 将 Demo 调用替换为你的 UI 模块；界面搭建完成后再 `lv_vendor_start`。
5. 若从其他线程更新界面（网络、传感器），在调用 LVGL API 前后使用 `lv_vendor_disp_lock` / `unlock`，或按所使用 LVGL 版本建议使用 `lv_async_call` 等模式。

## 平台说明

| 平台 | LVGL 来源 | 入口 |
| ---- | --------- | ---- |
| T5AI（常见） | `src/liblvgl/` | `lv_vendor_init`、`lv_port_disp`、TDL 显示 |
| ESP32（常见） | ESP-IDF LVGL | `board_register_hardware` + IDF LVGL 移植文件 |

务必阅读所选示例目录下的 **README**，确认当前 **支持板卡矩阵**（如 `lvgl_demo/README.md` 中 T3 SPI、T5AI RGB/SPI、ESP32 等说明）。

## 参考

- 示例：`examples/graphics/lvgl_demo`、`lvgl_label`、`lvgl_gif`、`lvgl_camera`
- 接口头文件：`src/liblvgl/v9/port/lv_vendor.h`（旧树可能为 `v8`）
- [显示驱动集成指南](display-driver-guide)
- [Display](display)
- [示例索引](../../examples/demo-generic-examples)
