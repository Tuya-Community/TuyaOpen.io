---
title: "使用 T5AI-Core 快速搭建 AI 聊天机器人"
---

<BackToProjects />


# 使用 T5AI-Core 快速搭建 AI 聊天机器人

## 概述

本文为您介绍如何使用 T5AI-Core 快速搭建 AI 聊天机器人。首先，请参考 [T5AI-Core 开发套件](https://tuyaopen.ai/zh/docs/hardware-specific/t5-ai-core/overview-t5-ai-core) 了解  T5AI-Core 的详细信息。

其中，T5AI-Core 和 ST7789 屏幕的引脚接线定义如下（和 EVB 相同）：

| T5AI-Core  | ST7789 屏幕 |
|-----------|------------|
| P14       | SPI0_SCK   |
| P16       | SPI0_MOSI  |
| P6        | LCD_RES    |
| P17       | LCD_DC     |
| P15       | LCD_CSN    |
| P5        | LCD_BL_ON  |
| P7        | LCD_PWR_ON |

效果图：

<img alt="效果图" src="https://images.tuyacn.com/content-platform/hestia/1755847709989bdfd44cf.png" width="650" />

## 配置 menuconfig

1. 首先，请参考 [下载并激活 TuyaOpen](https://tuyaopen.ai/zh/docs/quick-start/enviroment-setup#%E4%B8%8B%E8%BD%BD%E5%B9%B6%E6%BF%80%E6%B4%BB-tuyaopen)  激活 `tos.py`。
2. 在终端中输入 `cd apps/tuya.ai/your_chat_bot && tos.py config menu` 并运行，然后按照下图所示，根据您的实际需求在代码中修改配置信息。

    - 修改 PID，选择聊天界面 UI：
       ![修改 PID.png](https://images.tuyacn.com/content-platform/hestia/17573217915e251c88271.png)
    - 选择开发板：
       ![选择开发板.png](https://images.tuyacn.com/content-platform/hestia/17573218654a1d4b56140.png)
    - 开启颜色反转：
        ![开启颜色反转.png](https://images.tuyacn.com/content-platform/hestia/1757321950f6366371ae1.png)

 
## 代码修改

### 在屏幕字体初始化接口中增加 T5AI-Core 定义

1. 找到 `apps/tuya.ai/your_chat_bot/src/display/app_display.c` 文件中的 `get_ui_font` 接口。
2. 在如下图所示的位置，增加 `|| BOARD_CHOICE_TUYA_T5AI_CORE` 代码。

    ![增加 T5AI-Core 定义.png](https://images.tuyacn.com/content-platform/hestia/175584622837b1ee7dcb1.png)

### 填写授权码

找到 `apps/tuya.ai/your_chat_bot/include/tuya_config.h` 文件，将授权码（UUID 和 Authkey）分别填写到 `TUYA_OPENSDK_UUID` 和 `TUYA_OPENSDK_AUTHKEY` 两个宏定义中，如下图所示：

![填写授权码.png](https://images.tuyacn.com/content-platform/hestia/1755848465e1986cab78b.png)

### 添加显示屏驱动

在 `TuyaOpen/boards/T5AI/TUYA_T5AI_CORE/tuya_t5ai_core.c` 文件中添加显示屏驱动的代码，可以复制下方代码并完全替换您的原代码。

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

## 编译烧录

在终端中输入 `tos.py build && tos.py flash` 并运行。  
    
开发板有两路串口，一路用于烧录固件，一路用于日志打印，请尝试并按需选择，如下图所示：

![选择串口.png](https://images.tuyacn.com/content-platform/hestia/17573220941673b0347bf.png)

烧录运行，正常运行结果如下图所示：

![烧录运行.png](https://images.tuyacn.com/content-platform/hestia/1755847871aa56562cafc.png)
 
## 日志监控

在终端中输入 `tos.py monitor` 并运行，如下图所示：

![日志监控.png](https://images.tuyacn.com/content-platform/hestia/1755848104e5cb481edec.png)