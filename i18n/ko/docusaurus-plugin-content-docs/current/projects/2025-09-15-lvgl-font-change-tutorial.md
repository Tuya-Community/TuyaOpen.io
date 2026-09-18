---
title: "LVGL 사용자 지정 글꼴"
date: 2025-09-19
---

<BackToProjects />


이 문서는 LVGL에서 사용자 정의 글꼴을 설정하는 방법을 소개합니다.

## Declare 및 참조 글꼴
먼저, .c 파일에 `LV_FONT_DECLARE(font_name)`를 추가하면 폰트를 참조 할 수 있습니다. 그런 다음 `lv_obj_set_style_text_font()`를 사용하여 LVGL 객체의 글꼴을 설정하거나 `lv_style_set_text_font()`를 사용하여 스타일을 위해 글꼴을 설정합니다.


## # File에서 Locally 글꼴 적용
1. 디렉토리 `apps/tuyaos_demo_ai_toy/src/display/FONT_SY_20.c`에서 `FONT_SY_20.c`를 배치 한 다음 `FONT_SY_20` 글꼴을 `LV_FONT_DECLARE` 아래에서 선언합니다. 이 후, 선언 된 파일에이 글꼴을 사용할 수 있습니다.

![image.jpeg](https://images.tuyacn.com/content-platform/hestia/175732547838b3c1207e2.jpeg)

2. 다음과 같이 글꼴을 설정합니다:

    ```c
    lv_obj_set_style_text_font(main_cont, AI_MESSAGE_FONT, 0); // AI_MESSAGE_FONT is a macro, equivalent to &FONT_SY_20
    ```

## 전 세계 글꼴 적용
전 세계적으로 글꼴을 만들려면 LVGL 시스템 글꼴을 사용하여 유사한 다음 단계를 따르십시오.

1. 파일에서 `vendor/T5/t5_os/components/lvgl/lvgl_v8/lv_conf.h`는, 매크로 정의 `LV_FONT_CUSTOM_DECLARE LV_FONT_DECLARE`를 수정합니다. 예를 들어, `#define LV_FONT_CUSTOM_DECLARE LV_FONT_DECLARE(FONT_SY_20)`로 변경하십시오.

![ 加工T5 路鶏.png](https://images.tuyacn.com/content-platform/hestia/17566937155d60cad0050.png)

2. 빌드 조건을 추가하십시오: `vendor/T5/t5_os/components/lvgl/CMakeLists.txt`에서, 항목 `lvgl_v8/src/font/FONT_SY_20.c`를 추가하십시오.

![ 件.png](https://images.tuyacn.com/content-platform/hestia/175669397976e70480889.png)

3. 다음과 같이 글꼴을 설정합니다. 이 후 `lvgl.h` (`#include "lvgl.h"`)를 포함하는 모든 파일에서이 글꼴을 사용할 수 있습니다.

    ```c
    lv_style_set_text_font(&my_style, LV_STATE_DEFAULT, &FONT_SY_20); /* Set a larger font */
    ```

:::기사
글꼴 이름은 글꼴 파일 이름과 동일하지 않습니다. `const lv_font_t`의 이름은 아래 그림과 같이 글꼴 파일 안에 정의됩니다. 따라서 글꼴 이름을 변경하지 않습니다.
![이미지 (16).png](https://images.tuyacn.com/content-platform/hestia/1757325619f8878716df2.png)
    :::

## 사용자 정의 글꼴 만들기
LvglFontTool 글꼴 도구를 다운로드하고 사용할 수 있습니다 (https://gitcode.com/open-source-toolkit/e8540/?utm_source=tools_gitcode&index=bottom&type=card&&isLogin=1) 자신의 글꼴을 만들 수 있습니다. LvglFontTool는 사용자가 프로젝트에 따라 다양한 글꼴 라이브러리 및 크기에서 LVGL 호환 글꼴 파일을 생성 할 수있는 인기있는 LVGL 글꼴 생성 도구입니다.

사용자 정의 글꼴 만들기에 대한 자세한 내용은 [Font Converter - LVGL] (https://lvgl.io/tools/fontconverter)를 참조하십시오.

## 기본 글꼴 수정
기본 글꼴을 변경하려면 `lv_conf.h` 파일에서 매크로 정의 `LV_FONT_DEFAULT`를 추가하십시오. 예를 들어, T5 파일 `vendor/T5/t5_os/components/lvgl/lvgl_v8/lv_conf.h`에서 기본 글꼴을 `LV_FONT_MONTSERRAT_14`로 설정할 수 있습니다.