---
title: "ESP32 지원 기능"
description: "ESP32 지원되는 특징 참고 — 칩 특징, 주변 장치, 널 및 신청 TuyaOpen는 ESP32, S3, C3 및 C6의 맞은편에 지원합니다."
keywords:
  - esp32
  - supported features
  - tuyaopen hardware
  - esp32-s3
  - esp32-c3
---

이 참조 목록은 칩 기능, 내장형 주변 장치, 보드 및 응용 프로그램 TuyaOpen은 ESP32 칩 변형을 지원합니다.

## 칩 비교 matrix
### 칩 특징
|제품 정보|사이트맵|사이트맵|모델 번호: ESP32-C3|사이트맵|
|---------|-------|----------|----------|----------|
|** CPU **|이중 Xtensa LX6|이중 Xtensa LX7|단일 RISC- ₢ 킹|단일 RISC- ₢ 킹|
|**Wi-Fi **|모델 번호: 802.11 b/g/n|모델 번호: 802.11 b/g/n|모델 번호: 802.11 b/g/n|802.11 ax (Wi-Fi 6)|
|**블루투스 **|클래식 + BLE 4.2|비트 5.0|비트 5.0|비트 5.0|
|** USB **|이름 *|예 (OTG)|이름 *|이름 *|

### 칩의 Peripheral 지원
다음 표는 각 칩을 위해 TuyaOpen에서 적응시킨 주변 장치 목록입니다.

|회사 소개|사이트맵|사이트맵|모델 번호: ESP32-C3|사이트맵|
|------------|-------|----------|----------|----------|
|와이파이|이름 *|이름 *|이름 *|이름 *|
|사이트맵|이름 *|이름 *|이름 *|이름 *|
|사이트맵|이름 *|이름 *|이름 *|이름 *|
|우아트|이름 *|이름 *|이름 *|이름 *|
|PWM의|이름 *|이름 *|이름 *|이름 *|
|사이트맵|이름 *|이름 *|이름 *|이름 *|
|I2C 정보|이름 *|이름 *|이름 *|이름 *|
|·|이름 *|이름 *|이름 *|이름 *|
|I2S 정보|이름 *|이름 *|사이트맵|사이트맵|
|플래시 스토리지|이름 *|이름 *|이름 *|이름 *|
|하드웨어 타이머|이름 *|이름 *|이름 *|이름 *|
|워치독|이름 *|이름 *|이름 *|이름 *|
|사이트맵|이름 *|이름 *|이름 *|이름 *|

## 지원되는 온보드 주변 장치
### 오디오 코덱
|관련 기사|비밀번호|지원하다|
|--------|-------|-------|
| `tdd_audio_8311_codec` |사이트맵|I2S의 S3 널에 일반적인|
| `tdd_audio_es8388_codec` |사이트맵|I2S, 교체 코덱|
| `tdd_audio_es8389_codec` |사이트맵|I2S 정보|
| `tdd_audio_no_codec` |없음 (DAC)|직접 DAC 산출|
| `tdd_audio_atk_no_codec` |ATK (코덱 없음)|Alternate no-codec 경로|

:::note
오디오 드라이버 통합 사양 : 16000 Hz 표본 비율, I2S 공용영역, 6 DMA descriptors, 구조 크기 240.
:::

### LCD 드라이버
|관련 기사|제품정보|지원하다|
|--------|---------|-----------|
| `lcd_st7789_spi` |SPI를 통해 ST7789|·|
| `lcd_st7789_80` |8080를 통해 ST7789|평행한 8 비트|
| `oled_ssd1306` |SSD1306의 OLED|I2C 정보|
| `lcd_sh8601` |SH8601 AMOLED 제품|사이트맵|

:::note
ESP32는 자체 LVGL 통합을 사용합니다 (ESP-IDF LVGL 구성 요소), TuyaOpen 일반적인 LVGL 포트가 아닙니다.
:::

### 제품정보
|관련 기사|제품정보|
|--------|-----------|
| `touch_ft5x06` |FT5x06 전기 용량 접촉|

### IO 확장자
|관련 기사|칩 칩|
|--------|------|
| `xl9555` |XL9555 I2C GPIO 확장기|
| `tca9554` |TCA9554 I2C GPIO 확장기|

### 주도하는
|관련 기사|제품정보|
|--------|------|
| `tdd_led_esp_ws1280` |WS2812 호환 가능한 LED를 통해 RMT|

## 지원된 널
현재 지원되는 모든 널`boards/ESP32/`:

|회사연혁|칩 칩|이름 *|
|-------|------|-------------|
| `ESP32` |사이트맵|기본적인 ESP32 단위|
| `ESP32-C3` |모델 번호: ESP32-C3|기본적인 ESP32-C3 단위|
| `ESP32-C6` |사이트맵|기본적인 ESP32-C6 단위|
| `ESP32-S3` |사이트맵|기본적인 ESP32-S3 단위|
| `ESP32S3_BREAD_COMPACT_WIFI` |사이트맵|Espressif ESP32-S3 보드|
| `XINGZHI_ESP32S3_CUDE_0.96_OLED_WIFI` |사이트맵|XingZhi ESP32-S3 보드 0.96" OLED|
| `WAVESHARE_ESP32S3_Touch_AMOLED_1.8` |사이트맵|1.8"를 가진 Waveshare ESP32-S3 널 접촉 AMOLED|
| `DNESP32S3` |사이트맵|Zhengdian ESP32-S3 기본 보드|
| `DNESP32S3_BOX` |사이트맵|Zhengdian ESP32-S3 상자 널|
| `DNESP32S3_BOX2_WIFI` |사이트맵|Zhengdian ESP32-S3 BOX2 (4G/charging에)|
| `WAVESHARE_ESP32C6_DEV_KIT_N16` |사이트맵|Waveshare ESP32-C6 dev 키트|

## Board-to-peripheral 매핑
|회사연혁|제품정보|제품정보|오디오 Codec|IO 확장자|이름 *|주도하는|이름 *|
|-------|---------|-------|-------------|-------------|--------|-----|-------|
| `ESP32` |ST7789 SPI 320 × 240| — |사이트맵|사이트맵| — | — |스피커 활성화|
| `ESP32-C3` | — | — | — | — | — | — |UART 전용|
| `ESP32-C6` | — | — | — | — | — | — |UART 전용|
| `ESP32-S3` | — | — | — | — | — | — |UART 전용|
| `ESP32S3_BREAD_COMPACT_WIFI` |SSD1306 I2C 128 × 32| — | — | — |사이트맵| — |I2C/I2S의 특징|
| `XINGZHI_ESP32S3_CUDE_0.96_OLED_WIFI` |SSD1306 I2C 128 × 64| — | — | — |사이트맵| — |I2C/I2S의 특징|
| `WAVESHARE_ESP32S3_Touch_AMOLED_1.8` |SH8601 SPI 368 × 448|사이트맵|ES8311 (0x30)|사이트맵| — | — | — |
| `DNESP32S3` |ST7789 SPI 320 × 240| — |ES8388 (0x20)에|사이트맵| — | — |스피커 활성화|
| `DNESP32S3_BOX` |모델 번호: ST7789 I80 320×240| — |ES8311/NS4168 (0x30)|사이트맵|XL9555 열쇠|빨간 LED|레지스터|
| `DNESP32S3_BOX2_WIFI` |모델 번호: ST7789 I80 320×240| — |ES8389 (0x20)에|사이트맵| — | — |4G 단위, USB 스위치, 위탁|
| `WAVESHARE_ESP32C6_DEV_KIT_N16` | — | — | — | — |사이트맵|사이트맵| — |

## ESP32에 시험되는 신청
이 TuyaOpen 응용 프로그램은 사전 제작 된 ESP32 구성이 있습니다.

:::tip[주의]
신청은 2개의 종류로 떨어졌습니다:
- ** 널 별 **: 더 보기`config/`표시 또는 오디오 코덱과 같은 특정 주변 장치와 함께 보드 당 하나의 구성과 하위 디렉토리.
- **Generic **: 없음`config/`subdirectory — 어떤 기본적인 ESP32 단위에 작동 (`ESP32` / `ESP32-C3` / `ESP32-S3` / `ESP32-C6`) board-specific 기계설비를 요구하는 없이.
:::

### Board-specific 신청
#### your chat bot (AI 채팅봇)
|회사연혁|Config 파일|
|-------|-------------|
| `DNESP32S3` | `DNESP32S3.config` |
| `DNESP32S3_BOX` | `DNESP32S3_BOX.config` |
| `DNESP32S3_BOX2_WIFI` | `DNESP32S3_BOX2_WIFI.config` |
| `ESP32S3_BREAD_COMPACT_WIFI` | `ESP32S3_BREAD_COMPACT_WIFI.config` |
| `WAVESHARE_ESP32S3_Touch_AMOLED_1.8` | `WAVESHARE_ESP32S3_TOUCH_AMOLED_1_8.config` |
| `XINGZHI_ESP32S3_CUDE_0.96_OLED_WIFI` | `XINGZHI_ESP32S3_Cube_0_96OLED_WIFI.config` |

#### your serial chat bot (스리얼 AI 채팅봇)
|회사연혁|Config 파일|
|-------|-------------|
| `WAVESHARE_ESP32S3_Touch_AMOLED_1.8` | `WAVESHARE_ESP32S3_TOUCH_AMOLED_1_8.config` |
| `XINGZHI_ESP32S3_CUDE_0.96_OLED_WIFI` | `XINGZHI_ESP32S3_Cube_0_96OLED_WIFI.config` |

### Generic 응용
다음과 같은 앱은 모든 기본 ESP32 모듈을 지원하며 보드 별 주변 장치가 필요하지 않습니다.

|제품 설명|이름 *|
|-------------|-------------|
| `tuya_cloud/switch_demo` |Tuya 클라우드 연결 스위치 데모|
| `tuya_cloud/weather_get_demo` |날씨 데이터 fetch 데모|

## 더 보기
- [TuyaOpen의 ESP32 -- 개요](overview-esp32)
- [새로운 ESP32 보드 추가](esp32-new-board)
- [TuyaOpen-esp32 저장소](https://github.com/tuya/TuyaOpen-esp32)
