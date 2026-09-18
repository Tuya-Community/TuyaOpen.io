---
title: "LVGL의 사용자 정의 글꼴"
noindex: true
---



T5 보드에서 LVGL UI에서 사용자 정의 글꼴을 설정 - 선언, 빌드로 와이어, 객체 또는 글로벌 기본으로 적용. 현지 파일경쟁력, 글로벌 등록`vendor/T5/t5_os/components/lvgl/lvgl_v8/`, 및 엇바꾸기`LV_FONT_DEFAULT`.

## Declare 및 참조 글꼴

첫째, 추가`LV_FONT_DECLARE(font_name)`.c 파일에서 글꼴을 사용하여 참조 할 수 있습니다. 다음, 사용`lv_obj_set_style_text_font()`LVGL 개체의 글꼴을 설정하거나 사용`lv_style_set_text_font()`본문 바로가기


### File에서 글꼴을 Locally 적용

1. 이름 *`FONT_SY_20.c`디렉토리`apps/tuyaos_demo_ai_toy/src/display/FONT_SY_20.c`, 그때 선언`FONT_SY_20`본문 바로가기`LV_FONT_DECLARE`아래와 같이. 이 후, 선언 된 파일에이 글꼴을 사용할 수 있습니다.

    ![이미지.jpeg](https://images.tuyacn.com/content-platform/hestia/175732547838b3c1207e2.jpeg)

2. 다음과 같이 글꼴을 설정:

    ```c
    lv_obj_set_style_text_font(main_cont, AI_MESSAGE_FONT, 0); // AI_MESSAGE_FONT is a macro, equivalent to &FONT_SY_20
    ```

### 글꼴 적용 Globally

LVGL 시스템 글꼴을 사용하여 전 세계적으로 사용할 수있는 글꼴을 만들기 위해이 단계를 따르십시오.

1. 파일에서`vendor/T5/t5_os/components/lvgl/lvgl_v8/lv_conf.h`, 매크로 정의 수정`LV_FONT_CUSTOM_DECLARE LV_FONT_DECLARE`. 예를 들면, 그것을에 바꾸십시오`#define LV_FONT_CUSTOM_DECLARE LV_FONT_DECLARE(FONT_SY_20)`.

    ![₢ 킹](https://images.tuyacn.com/content-platform/hestia/17566937155d60cad0050.png)

2. 빌드 조건 추가 : in`vendor/T5/t5_os/components/lvgl/CMakeLists.txt`, 항목 추가`lvgl_v8/src/font/FONT_SY_20.c`.

    ![₢ 킹](https://images.tuyacn.com/content-platform/hestia/175669397976e70480889.png)

3. 다음과 같이 글꼴을 설정합니다. 이 후 포함 된 모든 파일에서이 글꼴을 사용할 수 있습니다.`lvgl.h` (`#include "lvgl.h"`):

    ```c
    lv_style_set_text_font(&my_style, LV_STATE_DEFAULT, &FONT_SY_20); /* Set a larger font */
    ```

    :::note
글꼴 이름은 글꼴 파일 이름과 동일하지 않습니다. 이름입니다.`const lv_font_t`아래 그림과 같이 글꼴 파일 내부 정의. 따라서 글꼴 이름을 변경하지 않습니다.
    ![이미지 (16).png](https://images.tuyacn.com/content-platform/hestia/1757325619f8878716df2.png)
    :::

## 사용자 정의 글꼴 만들기

당신은 할 수[LvglFontTool 글꼴 도구 다운로드 및 사용](https://gitcode.com/open-source-toolkit/e8540/?utm_source=tools_gitcode&index=bottom&type=card&&isLogin=1)자신의 글꼴을 만들 수 있습니다. LvglFontTool는 LVGL 글꼴 생성 도구로, 사용자가 프로젝트 필요에 따라 다양한 글꼴 라이브러리 및 크기에서 LVGL 호환 글꼴 파일을 생성 할 수 있습니다.

사용자 정의 글꼴 만들기에 대한 자세한 내용은 참조[LVGL 소개](https://lvgl.io/tools/fontconverter).

## 기본 글꼴 수정

기본 글꼴을 변경하려면 매크로 정의를 추가하십시오.`LV_FONT_DEFAULT`으로`lv_conf.h`파일. 예를 들어, T5 파일에서`vendor/T5/t5_os/components/lvgl/lvgl_v8/lv_conf.h`, 당신은 기본 글꼴을 설정할 수 있습니다`LV_FONT_MONTSERRAT_14`: