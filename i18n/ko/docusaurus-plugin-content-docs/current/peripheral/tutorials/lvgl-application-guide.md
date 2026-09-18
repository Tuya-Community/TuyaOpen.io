---
title: LVGL 소개
description: "TuyaOpen의 LVGL 응용 프로그램 가이드 : LVGL 스택을 활성화하고 lv vendor를 통해 디스플레이를 초기화하고 위젯을 만들고 T5AI 또는 ESP32에서 LVGL 작업을 실행합니다."
keywords:
  - lvgl
  - graphics
  - widgets
  - lv_vendor
  - tuyaopen peripheral
---

## 제품정보
이 가이드는 TuyaOpen의 **LVGL** (Light and Versatile Graphics Library) 응용 프로그램을 구축하는 방법을 설명합니다. 구성에서 스택을 활성화하고 **vendor 포트를 통해 디스플레이 초기화 ** (`lv_vendor_*`), 위젯을 만들고 LVGL 작업을 실행합니다. 그것은 보완[Display Driver 통합 가이드](display-driver-guide)(TDL 디스플레이 및 패널) 및[제품정보](display)참고.

## 자주 묻는 질문
- [환경 설정](../../quick-start/enviroment-setup)
- [프로젝트 컴파일](../../quick-start/project-compilation)
- [Display Driver 통합 가이드](display-driver-guide)(새로운 패널에 대한 권장)

## 제품 정보
- 지원되는 전시를 가진 널 (아래 보기).
- `tos.py`/ LVGL 및 디스플레이 드라이버를 활성화하는 Kconfig 액세스.
- **T5AI-class 대상 **, TuyaOpen 선박 LVGL 아래`src/liblvgl/`이름 *`lv_vendor`접착제. **ESP32**, LVGL은 보통 **ESP-IDF 구성품** 및 보드 별 포트(Board-specific port)에서 제공됩니다.`boards/ESP32/common/display/`); 행동은 일치[ESP32 지원 기능](../../hardware/espressif/esp32-supported-features)노트, T5하지`lv_vendor`경로.

## 한국어
1. LVGL 예제 또는 앱 템플릿에서 시작:
   - `examples/graphics/lvgl_demo`(Widgets 데모)
   - `examples/graphics/lvgl_label`(분자 상표)
   - `examples/graphics/lvgl_gif`(GIF 위젯)
   - `examples/graphics/lvgl_camera`(camera 미리보기, 보드 별)

2. **board config**를 선택하면 LCD와 터치와 일치합니다.`TUYA_T5AI_BOARD_LCD_3.5.config`또는 ESP32 밀가루 구성`lvgl_demo`).

3. 메뉴 구성을 열고 **LVGL ** 및 올바른 ** 디스플레이 / 터치 ** 드라이버를 활성화하십시오. 이름 *[제품정보](display)LVGL 옵션 및 패널 관련 매크로에 대한.

4. example 디렉토리에서 빌드 및 플래시:

   ```bash
   cd examples/graphics/lvgl_demo
   tos.py config choice
   tos.py build
   ```

5. 검사`user_main`내 계정`src/example_lvgl.c`(주)`example_lvgl_label.c`): 기계설비 등록,`lv_vendor_init`, UI 설정,`lv_vendor_start`.

**확장된 결과:** 데모는 화면에 그릴; LVGL 작업은 유지`lv_timer_handler`납품업자 층을 통해 달리기.

## LVGL을 초기화 (T5 / T5)`lv_vendor`경로)
일반적인 순서 (from)`examples/graphics/lvgl_demo`이름 *`lvgl_label`):

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

|한국어|제품정보|
| ---- | ------- |
| `board_register_hardware()` |도표의 앞에 LCD, 접촉 및 다른 널 장치 등록하십시오.|
| `lv_vendor_init(DISPLAY_NAME)` |이름 *`lv_init()`, `lv_port_disp_init`, `lv_port_indev_init`, 틱 콜백을 설정하고 내부 sync primitives를 만듭니다.`DISPLAY_NAME`Kconfig display 인스턴스명(string)입니다.|
| `lv_vendor_disp_lock()` / `lv_vendor_disp_unlock()` |LVGL API 호출 주위에 Mutex ** 아웃사이드 ** 전용 LVGL 스레드 (시작 중 예를 들어).|
| `lv_vendor_start(priority, stack_size)` |실행 스레드를 시작`lv_timer_handler()`루프에서.|

ISR 컨텍스트에서 arbitrary LVGL API를 호출하지 마십시오. TAL workqueues 또는 이벤트를 사용하여 UI 작업을 defer합니다.

## 위젯과 상호 작용
이름 *`lv_vendor_init`그리고 내부`lv_vendor_disp_lock` / `unlock`(또는 이미 안전한 컨텍스트에서 실행되는 코드에서):

- 물체 만들기`lv_<type>_create`, 텍스트, 스타일 및 정렬 설정.
- 제품 정보`lv_screen_active()`간단한 UI의 기본 루트로.
- LVGL 버전에서 문서화 된 Prefer LVGL API`src/liblvgl/`당신의 분지.

예제에서`lvgl_label`:

```c
lv_vendor_disp_lock();
lv_obj_set_style_bg_color(lv_screen_active(), lv_color_white(), LV_PART_MAIN);
lv_obj_t *label = lv_label_create(lv_screen_active());
lv_label_set_text(label, "Hello World!");
lv_obj_align(label, LV_ALIGN_CENTER, 0, 0);
lv_vendor_disp_unlock();
lv_vendor_start(5, 1024 * 8);
```

내장 데모의 경우,`demos/lv_demos.h`관련 기사`lv_demo_widgets()`(또는 다른 데모) 자물쇠와 잠금 해제 사이, 에서`lvgl_demo`.

## LVGL 앱
1. 이름 *`examples/graphics/lvgl_demo`(주)`lvgl_label`) 시작 CMake 프로젝트로`apps/`또는`examples/`.
2. 제품 정보`ENABLE_LIBLVGL`디스플레이 옵션`app_default.config`/ 널을 위한 Kconfig 파편.
3. 실행 또는 재사용`board_register_hardware()`당신의 PCB (SPI/RGB 패널, 접촉 I2C, 역광선)를 위해.
4. UI 모듈을 사용하여 데모 통화를 교체하십시오.`lv_vendor_start`UI가 건설된 후.
5. 동적 업데이트를 추가하면 (network 상태, 센서 값), worker 스레드에서 위젯을 새로 고침`lv_vendor_disp_lock` / `unlock`LVGL 통화의 주위에, 또는 사용`lv_async_call`LVGL에 의해 권장되는 패턴.

## 플랫폼 노트
|회사연혁|LVGL 소스|항구 입장|
| -------- | ----------- | ---------- |
|T5AI (일반)| `src/liblvgl/` | `lv_vendor_init` / `lv_port_disp`/ TDL-backed 디스플레이|
|ESP32 (일반)|ESP-IDF LVGL의 장점|회사연혁`board_register_hardware`+ IDF LVGL 포트 파일|

Always read the **README** 현재 선택된 예에서 **supported board matrix** (예를 들어,)`lvgl_demo/README.md`목록 T3 SPI, T5AI RGB/SPI 및 ESP32 상태).

## 이름 *
- 예제:`examples/graphics/lvgl_demo`, `lvgl_label`, `lvgl_gif`, `lvgl_camera`
- 공급 업체 API:`src/liblvgl/v9/port/lv_vendor.h`(주)`v8`오래된 나무)
- [Display Driver 통합 가이드](display-driver-guide)
- [제품정보](display)
- [예제 인덱스](../../examples/demo-generic-examples)
