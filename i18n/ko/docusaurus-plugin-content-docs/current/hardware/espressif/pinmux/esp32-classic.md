---
title: "ESP32 (클래식) 주변기기"
description: "ESP32 (Classic) 주변 맵핑 - 듀얼 코어 Xtensa LX6 칩의 온칩 주변지도 TuyaOpen TKL 소프트웨어 포트에."
keywords:
  - esp32
  - peripheral mapping
  - tuyaopen hardware
  - pinmux
  - gpio
---

이 문서는 ESP32 (dual-core Xtensa LX6) 주변 장치와 TuyaOpen TKL 레이어 소프트웨어 포트 사이의 매핑을 설명합니다.

## 사이트맵
- 모든 GPIO 핀 지원 중단.
- `TUYA_GPIO_NUM_E`enum 값 지도 1:1 물리적 ESP32 GPIO 번호.
- `TUYA_GPIO_NUM_24`지도에서`GPIO_NUM_NC`그리고 ** 사용할 수 없습니다 **.
- GPIO34 ~ GPIO39는 ** 입력 전용 ** 핀 - 출력 모드 및 풀 업 / 풀 다운 구성이 지원되지 않습니다.

|GPIO 범위|사이트맵 제품정보|지원하다|
|------------|---------------------|-------|
|GPIO0 ~ GPIO23의 경우|TUYA GPIO NUM 0 ~ TUYA GPIO NUM 23|범용 IO|
| — |TUYA GPIO NUM 24의|NC는 사용하지 않습니다|
|모델: GPIO25|TUYA GPIO NUM 25 ~ TUYA GPIO NUM 33|범용 IO|
|GPIO34 ~ GPIO39|TUYA GPIO NUM 34 ~ TUYA GPIO NUM 39|입력 만, 산출/풀 없음|

## 우아트
- 지원되는 2 UART 항구.
- UART0 TX/RX 핀은 Kconfig 선택권에 의해 통제됩니다`UART_NUM0_TX_PIN` / `UART_NUM0_RX_PIN`, GPIO1 / GPIO3에 과태.
- UART1에는 전용 IO MUX 핀이 있습니다. 과태 핀은 초기화의 앞에 overridden 일 수 있습니다`tkl_io_pinmux_config()`.

:::info[Changing UART0 핀]
지원하다`tos.py config menu`프로젝트 디렉토리에서 보드 구성 메뉴를 입력하고 관련 옵션을 찾아 대상 GPIO 번호를 설정하거나 편집합니다.`default`관련 항목`boards/ESP32/ESP32/Kconfig`직접, 그 후에 재건.
:::

|널 핀|제품정보|소프트웨어 Pin|소프트웨어 포트|
|-----------|----------|--------------|---------------|
|GPIO1 (과태)|사이트맵|사이트맵|사이트맵|
|GPIO3 (과태)|사이트맵|사이트맵|사이트맵|
|GPIO10 (과태)|사이트맵|사이트맵|사이트맵|
|GPIO9 (과태)|사이트맵|사이트맵|사이트맵|

## I2C 정보
- 지원되는 2개의 I2C 항구.
- 과태 핀은 초기화의 앞에 overridden 일 수 있습니다`tkl_io_pinmux_config()`.

|널 Pin (과태)|제품정보|소프트웨어 Pin|소프트웨어 포트|
|--------------------|----------|--------------|---------------|
|사이트맵|사이트맵|사이트맵|TUYA I2C NUM 0|
|사이트맵|사이트맵|사이트맵|TUYA I2C NUM 0|
|사이트맵|I2C1 스클|사이트맵|사이트맵|
|사이트맵|사이트맵|TUYA IIC1 스다|사이트맵|

## PWM의
- ESP-IDF LEDC 드라이버 (LEDC LOW SPEED MODE, 12비트 해상도)를 사용하여 구현되는 6 PWM 채널.
- 과태 핀은 초기화의 앞에 overridden 일 수 있습니다`tkl_io_pinmux_config()`.

|널 Pin (과태)|제품정보|소프트웨어 Pin|소프트웨어 포트|
|--------------------|----------|--------------|---------------|
|사이트맵|PWM0의|사이트맵|사이트맵|
|GPIO19의 특징|PWM1의|사이트맵|사이트맵|
|사이트맵|PWM2의|사이트맵|사이트맵|
|GPIO23의 특징|PWM3의|사이트맵|사이트맵|
|모델: GPIO25|PWM4의|사이트맵|사이트맵|
|모델 번호: GPIO26|PWM5의|사이트맵|사이트맵|

## 사이트맵
- 지원되는 2개의 ADC 단위. bitmask를 통해 채널을 구성합니다 (`ch_list.data`), 어디 비트 N 활성화`ADC_CHANNEL_N`.
- 감쇠는 고정됩니다`ADC_ATTEN_DB_12`(~0–3.3 V 범위). Calibration은 라인 피팅 계획을 사용합니다.
- ADC2는 Wi-Fi RF와 하드웨어를 공유하고 Wi-Fi가 활성화된 동안 사용할 수 없습니다.

### ADC1 (TUYA ADC NUM 0)에 대해
|널 핀|ADC 채널|소프트웨어 포트|
|-----------|-------------|---------------|
|모델: GPIO36|사이트맵|사이트맵|
|모델 번호: GPIO37|사이트맵|사이트맵|
|모델: GPIO38|사이트맵|사이트맵|
|GPIO39 (VN)|사이트맵|사이트맵|
|GPIO32의 특징|사이트맵|사이트맵|
|GPIO33의 특징|사이트맵|사이트맵|
|GPIO34의 특징|사이트맵|사이트맵|
|모델: GPIO35|사이트맵|사이트맵|

### ADC2 (TUYA ADC NUM 1)
:::warning[Wi-Fi 접속]
ESP32 ADC2는 Wi-Fi RF를 갖춘 하드웨어 리소스를 공유합니다. ADC2는 Wi-Fi가 활성화되는 동안 Wi-Fi가 실패합니다. 만 사용`TUYA_ADC_NUM_1`Wi-Fi가 비활성화되면
:::

|널 핀|ADC 채널|소프트웨어 포트|
|-----------|-------------|---------------|
|사이트맵|사이트맵|사이트맵|
|사이트맵|사이트맵|사이트맵|
|사이트맵|사이트맵|사이트맵|
|GPIO15는|사이트맵|사이트맵|
|모델 번호: GPIO13|사이트맵|사이트맵|
|사이트맵|사이트맵|사이트맵|
|사이트맵|사이트맵|사이트맵|
|모델: GPIO27|사이트맵|사이트맵|
|모델: GPIO25|사이트맵|사이트맵|
|모델 번호: GPIO26|사이트맵|사이트맵|

## 이름 *
- [ESP32 핀 Mapping -- 개요](../esp32-pin-mapping)
- [ESP32 자료표](https://www.espressif.com.cn/sites/default/files/documentation/esp32_datasheet_en.pdf)
