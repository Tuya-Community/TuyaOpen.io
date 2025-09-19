---
title: "LVGL 字体变更"
date: 2025-09-19
---

<BackToProjects />


本文为您介绍如何设置 LVGL 字体。

## 声明并引用字体

首先在需要使用字体的 .c 文件中添加 `LV_FONT_DECLARE(字体名称)` 字段以引用到字体，然后使用 `lv_obj_set_style_text_font()` 为一个 LVGL 对象设置字体，或者使用 `lv_style_set_text_font()` 为一种样式设置对象。


### 设置字体在局部文件中生效

1. 将 `FONT_SY_20.c` 放置于文件 `apps/tuyaos_demo_ai_toy/src/display/FONT_SY_20.c` 下，然后通过 `LV_FONT_DECLARE` 声明 `FONT_SY_20` 字体，如下图所示，即可在该声明所在的文件中使用此字体。

    ![image.jpeg](https://images.tuyacn.com/content-platform/hestia/175732547838b3c1207e2.jpeg)


2. 设置字体，如下所示：    
   
    ```c
    lv_obj_set_style_text_font(main_cont, AI_MESSAGE_FONT, 0); //AI_MESSAGE_FONT 是宏定义，等价于 &FONT_SY_20
    ```

### 设置字体在全局文件中生效

字体在全局文件中生效与使用 LVGL 系统字体的效果相同，操作如下：

1. 在 `vendor/T5/t5_os/components/lvgl/lvgl_v8/lv_conf.h` 文件中修改宏定义 `LV_FONT_CUSTOM_DECLARE LV_FONT_DECLARE`。例如，修改为 `#define LV_FONT_CUSTOM_DECLARE LV_FONT_DECLARE(FONT_SY_20)`。

     ![添加T5路径.png](https://images.tuyacn.com/content-platform/hestia/17566937155d60cad0050.png)

2. 添加编译条件：在 `vendor/T5/t5_os/components/lvgl/CMakeLists.txt` 文件中添加 `lvgl_v8/src/font/FONT_SY_20.c` 字段。

    ![添加编译条件.png](https://images.tuyacn.com/content-platform/hestia/175669397976e70480889.png)

3. 设置字体，如下所示。设置完成后，在包含了 `lvgl.h（#include "lvgl.h"）` 的任何文件中都可以使用这款字体。 
    
    ```c
    lv_style_set_text_font(&my_style, LV_STATE_DEFAULT, &FONT_SY_20); /* 设置较大的字体 */
    ```

    :::important
    字体名称并不是字体文件的名称，而是字体文件中的 `const lv_font_t` 设置的名称，如下图所示。因此修改字体文件的文件名，无法同步更改字体名称。
    ![image (16).png](https://images.tuyacn.com/content-platform/hestia/1757325619f8878716df2.png)
    :::


## 自主制作字体

您可以 [下载并使用 LvglFontTool 字体工具](https://gitcode.com/open-source-toolkit/e8540/?utm_source=tools_gitcode&index=bottom&type=card&&isLogin=1) 自主制作字体。LvglFontTool 是一款广受欢迎的 LVGL 字体取模软件，用户能够根据实际项目需求，按照指定的字体大小，从多种字体库中生成 LVGL 可使用的字体文件。

关于如何自主制作字体，请参考 [Font Converter - LVGL](https://lvgl.io/tools/fontconverter)。


## 修改默认字体

如需修改默认字体，可以在 `lv_conf.h` 文件中添加 `LV_FONT_DEFAULT` 的宏定义。例如，可以在 T5 的文件 `vendor/T5/t5_os/components/lvgl/lvgl_v8/lv_conf.h` 中将默认字体设置为 `LV_FONT_MONTSERRAT_14`。

```
#define LV_FONT_DEFAULT &lv_font_montserrat_14
```

## 添加自定义图标（Symbol）

由于嵌入式设备的空间有限，使用字库图标能够极大地丰富界面，又能控制 ROM 的占用。LVGL 自带了一些图标，但在实际的使用过程中可能无法满足项目的使用，需要在 LVGL 中根据实际需求添加自定义图标。

LVGL 内置字库自带图标如下所示：

![Symbol.png](https://images.tuyacn.com/content-platform/hestia/1756709441cb3161c959e.png)

例如，您想要在 Label 中显示一个音量的图标，可参考以下代码。（在使用 LVGL 内置图标时需要确保当前对象使用的字体是 LVGL 内置字体，否则可能显示失败。）

```
lv_obj_set_style_text_font(label_valume, &lv_font_montserrat_16, 0);//确保使用 LVGL 内部字体
lv_label_set_text(label_valume, LV_SYMBOL_VOLUME_MAX);
```

[Font Awesome](https://fontawesome.com/) 提供了多达上千种图标，您可以在其中找到需要的图标。

以 Accusoft 图标为例，首先，点击进入其 [详情页面](https://fontawesome.com/icons/accusoft?f=brands&s=solid) 找到图标的 Unicode 码。详细教程请参考 [使用 LVGL 增加自定义的 Symbol](https://forums.100ask.net/t/topic/1013)。