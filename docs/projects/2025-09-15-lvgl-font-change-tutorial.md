---
title: "Custom Fonts in LVGL"
date: 2025-09-19
---

<BackToProjects />


This article introduces how to set up custom fonts in LVGL.

## Declare and Reference Fonts

First, add `LV_FONT_DECLARE(font_name)` in the .c file where you want to use the font to reference it. Then, use `lv_obj_set_style_text_font()` to set the font for an LVGL object, or use `lv_style_set_text_font()` to set the font for a style.


### Applying Fonts Locally in a File

1. Place `FONT_SY_20.c` in the directory `apps/tuyaos_demo_ai_toy/src/display/FONT_SY_20.c`, then declare the `FONT_SY_20` font using `LV_FONT_DECLARE` as shown below. After this, you can use this font in the file where it is declared.

    ![image.jpeg](https://images.tuyacn.com/content-platform/hestia/175732547838b3c1207e2.jpeg)

2. Set the font as follows:

    ```c
    lv_obj_set_style_text_font(main_cont, AI_MESSAGE_FONT, 0); // AI_MESSAGE_FONT is a macro, equivalent to &FONT_SY_20
    ```

### Applying Fonts Globally

To make a font available globally, similar to using an LVGL system font, follow these steps:

1. In the file `vendor/T5/t5_os/components/lvgl/lvgl_v8/lv_conf.h`, modify the macro definition `LV_FONT_CUSTOM_DECLARE LV_FONT_DECLARE`. For example, change it to `#define LV_FONT_CUSTOM_DECLARE LV_FONT_DECLARE(FONT_SY_20)`.

    ![添加T5路径.png](https://images.tuyacn.com/content-platform/hestia/17566937155d60cad0050.png)

2. Add a build condition: in `vendor/T5/t5_os/components/lvgl/CMakeLists.txt`, add the entry `lvgl_v8/src/font/FONT_SY_20.c`.

    ![添加编译条件.png](https://images.tuyacn.com/content-platform/hestia/175669397976e70480889.png)

3. Set the font as follows. After this, you can use this font in any file that includes `lvgl.h` (`#include "lvgl.h"`):

    ```c
    lv_style_set_text_font(&my_style, LV_STATE_DEFAULT, &FONT_SY_20); /* Set a larger font */
    ```

    :::important
    The font name is not the same as the font file name. It is the name of the `const lv_font_t` defined inside the font file, as shown below. Therefore, renaming the font file does not change the font name.
    ![image (16).png](https://images.tuyacn.com/content-platform/hestia/1757325619f8878716df2.png)
    :::

## Creating Custom Fonts

You can [download and use the LvglFontTool font tool](https://gitcode.com/open-source-toolkit/e8540/?utm_source=tools_gitcode&index=bottom&type=card&&isLogin=1) to create your own fonts. LvglFontTool is a popular LVGL font generation tool that allows users to generate LVGL-compatible font files from various font libraries and sizes according to project needs.

For more information on creating custom fonts, refer to [Font Converter - LVGL](https://lvgl.io/tools/fontconverter).

## Modifying the Default Font

To change the default font, add the macro definition `LV_FONT_DEFAULT` in the `lv_conf.h` file. For example, in the T5 file `vendor/T5/t5_os/components/lvgl/lvgl_v8/lv_conf.h`, you can set the default font to `LV_FONT_MONTSERRAT_14`: