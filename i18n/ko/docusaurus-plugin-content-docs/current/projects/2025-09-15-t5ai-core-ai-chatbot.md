---
title: "T5AI-Core로 AI 챗봇 만들기"
---

<BackToProjects />

## 개요
이 문서는 T5AI-Core를 사용하여 AI chatbot을 빠르게 구축하는 방법을 소개합니다. 먼저, T5AI-Core에 대한 자세한 정보를 이해하기 위해 [T5AI-Core Development Kit](https://tuyaopen.ai/zh/docs/hardware/t5-ai-core/overview-t5-ai-core)를 참조하십시오.

T5AI-Core와 ST7789 화면 사이의 핀 연결 정의는 다음과 같습니다 (EVB와 동일) :

|T5AI 핵심|ST7789 스크린|
|-----------|------------|
|사이트맵|사이트맵|
|사이트맵|사이트맵|
|사이트맵|LCD 제품|
|사이트맵|사이트맵|
|사이트맵|사이트맵|
|사이트맵|LCD BL ON의 특징|
|사이트맵|사이트맵|

효력 이미지:

<img alt="Effect Image" src="https://images.tuyacn.com/content-platform/hestia/1755847709989bdfd44cf.png" width="650"  />

## menuconfig 구성
1. 먼저, `tos.py`를 활성화하기 위해 [다운로드 및 활성화 TuyaOpen](https://tuyaopen.ai/zh/docs/quick-start/enviroment-setup#%E4%B8%8B%E8%BD%BD%E5%B9%B6%E6%BF%80%E6%B4%BB-tuyaopen)를 참조하십시오.
2. 맨끝에 있는 `cd apps/tuya.ai/your_chat_bot && tos.py config menu`를 입력하고, 그 때 아래에 그림에서 보이는 것과 같이 당신의 실제적인 필요에 따라 부호에 있는 윤곽 정보를 수정하십시오.

- PID를 수정, 채팅 인터페이스 UI를 선택:
![ PID.png](https://images.tuyacn.com/content-platform/hestia/17573217915e251c88271.png)
- 개발 보드 선택 :
![개발 보드 선택](https://images.tuyacn.com/content-platform/hestia/17573218654a1d4b56140.png)
- 유효한 색깔 inversion:
![Enable Color Inversion.png](https://images.tuyacn.com/content-platform/hestia/1757321950f6366371ae1.png)

 
## 코드 수정
### 스크린 글꼴 초기화 공용영역에 있는 T5AI 핵심 정의를 추가하십시오
1. `get_ui_font` 인터페이스를 `apps/tuya.ai/your_chat_bot/src/display/app_display.c` 파일에서 찾습니다.
2. 아래 그림에서 보이는 위치에서 ``을 추가합니다.||BOARD CHOICE TUYA T5AI CORE` 코드.

![ T5AI-Core 정의 추가.png](https://images.tuyacn.com/content-platform/hestia/175584622837b1ee7dcb1.png)

### Authorization Code 작성
`apps/tuya.ai/your_chat_bot/include/tuya_config.h` 파일을 찾아, UUID 및 Authkey의 허가 코드 (UUID 및 Authkey)를 각각 `TUYA_OPENSDK_UUID` 및 `TUYA_OPENSDK_AUTHKEY` 매크로 정의로 채우십시오.

![File.png](https://images.tuyacn.com/content-platform/hestia/1755848465e1986cab78b.png)

### 디스플레이 드라이버 추가
`TuyaOpen/boards/T5AI/TUYA_T5AI_CORE/tuya_t5ai_core.c` 파일에 디스플레이 드라이버 코드를 추가합니다. 아래 코드를 복사하고 완전히 원래 코드를 대체 할 수 있습니다.

```c
/**
 * @file tuya_t5ai_core.c
 * @brief tuya_t5ai_core module is used to
 * @version 0.1
 * @copyright Copyright (c) 2021-2025 Tuya Inc. All Rights Reserved.
 */

#include "tuya_cloud_types.h"

#include "tal_api.h"

#include "tdd_audio.h"
#include "tdd_led_gpio.h"
#include "tdd_button_gpio.h"
#include "tdd_disp_st7789.h"
/***********************************************************
************************macro define************************
***********************************************************/
#define BOARD_SPEAKER_EN_PIN TUYA_GPIO_NUM_39

#define BOARD_BUTTON_PIN       TUYA_GPIO_NUM_29
#define BOARD_BUTTON_ACTIVE_LV TUYA_GPIO_LEVEL_LOW

#define BOARD_LED_PIN       TUYA_GPIO_NUM_9
#define BOARD_LED_ACTIVE_LV TUYA_GPIO_LEVEL_HIGH

#define BOARD_LCD_BL_TYPE            TUYA_DISP_BL_TP_GPIO 
#define BOARD_LCD_BL_PIN             TUYA_GPIO_NUM_5
#define BOARD_LCD_BL_ACTIVE_LV       TUYA_GPIO_LEVEL_HIGH

#define BOARD_LCD_WIDTH              240
#define BOARD_LCD_HEIGHT             240
#define BOARD_LCD_PIXELS_FMT         TUYA_PIXEL_FMT_RGB565
#define BOARD_LCD_ROTATION           TUYA_DISPLAY_ROTATION_0

#define BOARD_LCD_SPI_PORT           TUYA_SPI_NUM_0
#define BOARD_LCD_SPI_CLK            48000000
#define BOARD_LCD_SPI_CS_PIN         TUYA_GPIO_NUM_15
#define BOARD_LCD_SPI_DC_PIN         TUYA_GPIO_NUM_17
#define BOARD_LCD_SPI_RST_PIN        TUYA_GPIO_NUM_6

#define BOARD_LCD_PIXELS_FMT         TUYA_PIXEL_FMT_RGB565

#define BOARD_LCD_POWER_PIN          TUYA_GPIO_NUM_7
#define BOARD_LCD_POWER_ACTIVE_LV    TUYA_GPIO_LEVEL_HIGH

/***********************************************************
***********************typedef define***********************
***********************************************************/

/***********************************************************
********************function declaration********************
***********************************************************/

/***********************************************************
***********************variable define**********************
***********************************************************/

/***********************************************************
***********************function define**********************
***********************************************************/
OPERATE_RET __board_register_audio(void)
{
    OPERATE_RET rt = OPRT_OK;

#if defined(AUDIO_CODEC_NAME)
    TDD_AUDIO_T5AI_T cfg = {0};
    memset(&cfg, 0, sizeof(TDD_AUDIO_T5AI_T));

    cfg.aec_enable = 1;

    cfg.ai_chn = TKL_AI_0;
    cfg.sample_rate = TKL_AUDIO_SAMPLE_16K;
    cfg.data_bits = TKL_AUDIO_DATABITS_16;
    cfg.channel = TKL_AUDIO_CHANNEL_MONO;

    cfg.spk_sample_rate = TKL_AUDIO_SAMPLE_16K;
    cfg.spk_pin = BOARD_SPEAKER_EN_PIN;
    cfg.spk_pin_polarity = TUYA_GPIO_LEVEL_LOW;

    TUYA_CALL_ERR_RETURN(tdd_audio_register(AUDIO_CODEC_NAME, cfg));
#endif
    return rt;
}

static OPERATE_RET __board_register_button(void)
{
    OPERATE_RET rt = OPRT_OK;

#if defined(BUTTON_NAME)
    BUTTON_GPIO_CFG_T button_hw_cfg = {
        .pin = BOARD_BUTTON_PIN,
        .level = BOARD_BUTTON_ACTIVE_LV,
        .mode = BUTTON_TIMER_SCAN_MODE,
        .pin_type.gpio_pull = TUYA_GPIO_PULLUP,
    };

    TUYA_CALL_ERR_RETURN(tdd_gpio_button_register(BUTTON_NAME, &button_hw_cfg));
#endif

    return rt;
}

static OPERATE_RET __board_register_led(void)
{
    OPERATE_RET rt = OPRT_OK;

#if defined(LED_NAME)
    TDD_LED_GPIO_CFG_T led_gpio;

    led_gpio.pin = BOARD_LED_PIN;
    led_gpio.level = BOARD_LED_ACTIVE_LV;
    led_gpio.mode = TUYA_GPIO_PUSH_PULL;

    TUYA_CALL_ERR_RETURN(tdd_led_gpio_register(LED_NAME, &led_gpio));
#endif

    return rt;
}

static OPERATE_RET __board_register_display(void)
{
    OPERATE_RET rt = OPRT_OK;

#if defined(DISPLAY_NAME)
    DISP_SPI_DEVICE_CFG_T display_cfg;

    memset(&display_cfg, 0, sizeof(DISP_RGB_DEVICE_CFG_T));

    display_cfg.bl.type              = BOARD_LCD_BL_TYPE;
    display_cfg.bl.gpio.pin          = BOARD_LCD_BL_PIN;
    display_cfg.bl.gpio.active_level = BOARD_LCD_BL_ACTIVE_LV;

    display_cfg.width     = BOARD_LCD_WIDTH;
    display_cfg.height    = BOARD_LCD_HEIGHT;
    display_cfg.pixel_fmt = BOARD_LCD_PIXELS_FMT;
    display_cfg.rotation  = BOARD_LCD_ROTATION;

    display_cfg.port      = BOARD_LCD_SPI_PORT;
    display_cfg.spi_clk   = BOARD_LCD_SPI_CLK;
    display_cfg.cs_pin    = BOARD_LCD_SPI_CS_PIN;
    display_cfg.dc_pin    = BOARD_LCD_SPI_DC_PIN;
    display_cfg.rst_pin   = BOARD_LCD_SPI_RST_PIN;

    display_cfg.power.pin          = BOARD_LCD_POWER_PIN;
    display_cfg.power.active_level = BOARD_LCD_POWER_ACTIVE_LV;

    TUYA_CALL_ERR_RETURN(tdd_disp_spi_st7789_register(DISPLAY_NAME, &display_cfg));
#endif

    return rt;
}

/**
 * @brief Registers all the hardware peripherals (audio, button, LED) on the board.
 *
 * @return Returns OPERATE_RET_OK on success, or an appropriate error code on failure.
 */
OPERATE_RET board_register_hardware(void)
{
    OPERATE_RET rt = OPRT_OK;

    TUYA_CALL_ERR_LOG(__board_register_audio());

    TUYA_CALL_ERR_LOG(__board_register_button());

    TUYA_CALL_ERR_LOG(__board_register_led());
    TUYA_CALL_ERR_LOG(__board_register_display());

    return rt;
}

```

## Compile와 섬광
터미널에서 `tos.py build && tos.py flash`를 입력하고 실행하십시오.
    
발달 널에는 2개의 직렬 포트, 번쩍이는 굳힌모 및 통나무 인쇄를 위해 하나가 있습니다. 아래 그림에 표시된 것과 같이 시도하고 선택하십시오:

![ 직렬 포트 선택](https://images.tuyacn.com/content-platform/hestia/17573220941673b0347bf.png)

번쩍이고 달리기 후에, 정상적인 달리는 결과는 아래에 그림에서 보입니다:

![플래시 및 실행.png](https://images.tuyacn.com/content-platform/hestia/1755847871aa56562cafc.png)
 
## 로그 모니터링
맨끝에 있는 `tos.py monitor`를 입력하고, 아래 그림에서 보이는 것과 같이 달리십시오:

![로그 모니터링.png](https://images.tuyacn.com/content-platform/hestia/1755848104e5cb481edec.png)