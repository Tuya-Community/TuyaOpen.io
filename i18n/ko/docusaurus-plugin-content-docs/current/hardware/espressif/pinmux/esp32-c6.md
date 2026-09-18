---
title: "ESP32-C6 주변 Mapping"
description: "ESP32-C6 주변 맵핑 - 단일 코어 RISC-V Wi-Fi 6 칩의 온칩 주변지도 TuyaOpen TKL 소프트웨어 포트에."
keywords:
  - esp32-c6
  - peripheral mapping
  - tuyaopen hardware
  - wi-fi 6
  - pinmux
---

이 문서는 ESP32-C6 (single-core RISC-V, Wi-Fi 6, Thread/Zigbee) on-chip 주변 장치 및 TuyaOpen TKL 층 소프트웨어 포트 사이의 매핑을 설명합니다.

## 사이트맵
- 모든 GPIO 핀 지원 중단.
- `TUYA_GPIO_NUM_E`enum 값 지도 1:1 물리적 ESP32-C6 GPIO 번호.
- 총 31 GPIOs (GPIO0 ~ GPIO30), 갭 없음.

|GPIO 범위|사이트맵 제품정보|지원하다|
|------------|---------------------|-------|
|모델 번호: GPIO0|TUYA GPIO NUM 0 ~ TUYA GPIO NUM 30|범용 IO, 모든 사용 가능|

## 우아트
- 지원되는 2 UART 항구.
- UART0 TX/RX 핀은 Kconfig 선택권에 의해 통제됩니다`UART_NUM0_TX_PIN` / `UART_NUM0_RX_PIN`, GPIO16/GPIO17에 과태.
- UART1에는 GPIO Matrix를 통해 전용 IO MUX 핀과 경로가 없습니다. 과태 핀은 초기화의 앞에 overridden 일 수 있습니다`tkl_io_pinmux_config()`.

:::info[Changing UART0 핀]
지원하다`tos.py config menu`프로젝트 디렉토리에서 보드 구성 메뉴를 입력하고 관련 옵션을 찾아 대상 GPIO 번호를 설정하거나 편집합니다.`default`관련 항목`boards/ESP32/ESP32-C6/Kconfig`직접, 그 후에 재건.
:::

|널 핀|제품정보|소프트웨어 Pin|소프트웨어 포트|
|-----------|----------|--------------|---------------|
|GPIO16 (과태)|사이트맵|사이트맵|사이트맵|
|GPIO17 (과태)|사이트맵|TUYA GPIO NUM 17|사이트맵|
|GPIO6 (과태)|사이트맵|사이트맵|사이트맵|
|GPIO7 (과태)|사이트맵|사이트맵|사이트맵|

## I2C 정보
- 1 하드웨어 I2C 포트 지원 (TUYA I2C NUM 0).
- 과태 핀은 초기화의 앞에 overridden 일 수 있습니다`tkl_io_pinmux_config()`.

|널 Pin (과태)|제품정보|소프트웨어 Pin|소프트웨어 포트|
|--------------------|----------|--------------|---------------|
|사이트맵|사이트맵|사이트맵|TUYA I2C NUM 0|
|사이트맵|사이트맵|사이트맵|TUYA I2C NUM 0|

## PWM의
- ESP-IDF LEDC 드라이버 (LEDC LOW SPEED MODE, 12비트 해상도)를 사용하여 구현되는 6 PWM 채널.
- 과태 핀은 초기화의 앞에 overridden 일 수 있습니다`tkl_io_pinmux_config()`.
- 모든 기본 PWM 핀 (GPIO18–GPIO26)는 C6 GPIO 범위 (0–30) 안에 있습니다.

|널 Pin (과태)|제품정보|소프트웨어 Pin|소프트웨어 포트|
|--------------------|----------|--------------|---------------|
|사이트맵|PWM0의|사이트맵|사이트맵|
|GPIO19의 특징|PWM1의|사이트맵|사이트맵|
|사이트맵|PWM2의|사이트맵|사이트맵|
|GPIO23의 특징|PWM3의|사이트맵|사이트맵|
|모델: GPIO25|PWM4의|사이트맵|사이트맵|
|모델 번호: GPIO26|PWM5의|사이트맵|사이트맵|

## 사이트맵
- ADC1 전용 (TUYA ADC NUM 0), 7 채널.
- bitmask를 통해 채널을 구성합니다 (`ch_list.data`), 어디 비트 N 활성화`ADC_CHANNEL_N`.
- 감쇠는 고정됩니다`ADC_ATTEN_DB_12`(~0–3.3 V 범위). Calibration은 곡선 피팅 계획을 사용합니다.

|널 핀|ADC 채널|소프트웨어 포트|
|-----------|-------------|---------------|
|사이트맵|사이트맵|사이트맵|
|사이트맵|사이트맵|사이트맵|
|사이트맵|사이트맵|사이트맵|
|사이트맵|사이트맵|사이트맵|
|사이트맵|사이트맵|사이트맵|
|사이트맵|사이트맵|사이트맵|
|사이트맵|사이트맵|사이트맵|

## 이름 *
- [ESP32 핀 Mapping -- 개요](../esp32-pin-mapping)
- [ESP32-C6 자료표](https://www.espressif.com.cn/sites/default/files/documentation/esp32-c6_datasheet_en.pdf)
