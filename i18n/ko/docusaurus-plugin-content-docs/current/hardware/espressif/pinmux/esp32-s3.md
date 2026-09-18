---
title: "ESP32-S3 주변 Mapping"
description: "ESP32-S3 주변 맵핑 - 듀얼 코어 Xtensa LX7 AI / 오디오 칩의 온칩 주변지도 TuyaOpen TKL 소프트웨어 포트."
keywords:
  - esp32-s3
  - peripheral mapping
  - tuyaopen hardware
  - pinmux
  - ai audio
---

이 문서는 ESP32-S3 (dual-core Xtensa LX7, AI/audio) on-chip 주변 장치 및 TuyaOpen TKL 층 소프트웨어 포트 사이의 매핑을 설명합니다. ESP32-S3는 TuyaOpen의 AI 채팅 및 음성 응용 프로그램에 대한 기본 칩입니다.

## 사이트맵
- 모든 사용 가능한 GPIO 핀 지원 중단.
- `TUYA_GPIO_NUM_E`enum 값 지도 1:1 물리적 ESP32-S3 GPIO 번호.
- `TUYA_GPIO_NUM_22` ~ `TUYA_GPIO_NUM_25`지도 보기`GPIO_NUM_NC`그리고 ** 사용할 수 없습니다 **.

|GPIO 범위|사이트맵 제품정보|지원하다|
|------------|---------------------|-------|
|GPIO0 ~ GPIO21의 경우|TUYA GPIO NUM 0 ~ TUYA GPIO NUM 21|범용 IO|
| — |TUYA GPIO NUM 22 ~ TUYA GPIO NUM 25|NC는 사용하지 않습니다|
|GPIO26 ~ GPIO48|TUYA GPIO NUM 26 ~ TUYA GPIO NUM 48|범용 IO|

## 우아트
- 지원되는 2 UART 항구.
- UART0 TX/RX 핀은 Kconfig 선택권에 의해 통제됩니다`UART_NUM0_TX_PIN` / `UART_NUM0_RX_PIN`, GPIO43/GPIO44에 과태.
- UART1에는 전용 IO MUX 핀이 있습니다. 과태 핀은 초기화의 앞에 overridden 일 수 있습니다`tkl_io_pinmux_config()`.
- 널과`ENABLE_ESP32S3_USB_JTAG_ONLY`내부 USB 직렬 JTAG 컨트롤러를 통해 UART0 경로 - GPIO 핀이 필요하지 않습니다.

:::info[Changing UART0 핀]
지원하다`tos.py config menu`프로젝트 디렉토리에서 보드 구성 메뉴를 입력하고 관련 옵션을 찾아 대상 GPIO 번호를 설정하거나 편집합니다.`default`관련 항목`boards/ESP32/ESP32-S3/Kconfig`직접, 그 후에 재건.
:::

|널 핀|제품정보|소프트웨어 Pin|소프트웨어 포트|
|-----------|----------|--------------|---------------|
|GPIO43 (과태)|사이트맵|사이트맵|사이트맵|
|GPIO44 (과태)|사이트맵|사이트맵|사이트맵|
|GPIO17 (과태)|사이트맵|TUYA GPIO NUM 17|사이트맵|
|GPIO18 (과태)|사이트맵|TUYA GPIO NUM 18 는|사이트맵|

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
|모델: GPIO38|PWM2의|사이트맵|사이트맵|
|GPIO39의 특징|PWM3의|사이트맵|사이트맵|
|GPIO40의 특징|PWM4의|사이트맵|사이트맵|
|GPIO41를|PWM5의|사이트맵|사이트맵|

## 사이트맵
- 지원되는 2개의 ADC 단위, 각 10의 수로.
- bitmask를 통해 채널을 구성합니다 (`ch_list.data`), 어디 비트 N 활성화`ADC_CHANNEL_N`.
- 감쇠는 고정됩니다`ADC_ATTEN_DB_12`(~0–3.3 V 범위). Calibration은 곡선 피팅 계획을 사용합니다.
- ADC2는 Wi-Fi RF와 하드웨어를 공유하고 Wi-Fi가 활성화된 동안 사용할 수 없습니다.

### ADC1 (TUYA ADC NUM 0)에 대해
|널 핀|ADC 채널|소프트웨어 포트|
|-----------|-------------|---------------|
|사이트맵|사이트맵|사이트맵|
|사이트맵|사이트맵|사이트맵|
|사이트맵|사이트맵|사이트맵|
|사이트맵|사이트맵|사이트맵|
|사이트맵|사이트맵|사이트맵|
|사이트맵|사이트맵|사이트맵|
|모델 번호: GPIO7|사이트맵|사이트맵|
|사이트맵|사이트맵|사이트맵|
|사이트맵|사이트맵|사이트맵|
|모델 번호: GPIO10|사이트맵|사이트맵|

### ADC2 (TUYA ADC NUM 1)
:::warning[Wi-Fi 접속]
ESP32-S3 ADC2는 Wi-Fi RF를 갖춘 하드웨어 리소스를 공유합니다. ADC2는 Wi-Fi가 활성화되는 동안 Wi-Fi가 실패합니다. 만 사용`TUYA_ADC_NUM_1`Wi-Fi가 비활성화되면
:::

|널 핀|ADC 채널|소프트웨어 포트|
|-----------|-------------|---------------|
|모델 번호: GPIO11|사이트맵|사이트맵|
|사이트맵|사이트맵|사이트맵|
|모델 번호: GPIO13|사이트맵|사이트맵|
|사이트맵|사이트맵|사이트맵|
|GPIO15는|사이트맵|사이트맵|
|GPIO16는|사이트맵|사이트맵|
|GPIO17의 특징|사이트맵|사이트맵|
|사이트맵|사이트맵|사이트맵|
|GPIO19의 특징|사이트맵|사이트맵|
|모델 번호: GPIO20|사이트맵|사이트맵|

## 이름 *
- [ESP32 핀 Mapping -- 개요](../esp32-pin-mapping)
- [ESP32-S3 자료표](https://www.espressif.com.cn/sites/default/files/documentation/esp32-s3_datasheet_en.pdf)
