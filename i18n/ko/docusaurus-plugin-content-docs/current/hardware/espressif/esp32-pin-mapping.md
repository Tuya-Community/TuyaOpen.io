---
title: "ESP32 핀 Mapping -- 개요"
description: "ESP32 핀 매핑 개요 - TuyaOpen TKL 소프트웨어 포트 및 핀이 핀 매스 인터페이스를 통해 ESP32 온 칩 주변 장치와 어떻게 호환되는지."
keywords:
  - esp32
  - pin mapping
  - pinmux
  - tuyaopen hardware
  - tkl
---

ESP32 핀 매핑은 TuyaOpen의 TKL 소프트웨어 포트와 핀과 ESP32의 온칩 주변 장치 사이의 대응입니다.`TUYA_GPIO_NUM_E`물리적 GPIO 번호에 대한 enum 값 지도, 그리고 pinmux 인터페이스를 통해 특정 핀에 주변을 경로를 어떻게 경로.

## 일반적인 핀 mapping 기계
이 메커니즘은 모든 ESP32 칩 변형에 적용됩니다.

### GPIO 번호 매핑
TuyaOpen는 ESP32의 1 % mapping**을 사용합니다.`TUYA_GPIO_NUM_E`물리적 ESP32 GPIO 번호로 직접 값을 매깁니다.`TUYA_GPIO_NUM_18`본문 바로가기`GPIO18`, `TUYA_GPIO_NUM_5`본문 바로가기`GPIO5`, 등.

이 매핑은 정의된다`pinmap[]`지원하다[카지노사이트](https://github.com/tuya/TuyaOpen-esp32/blob/master/tuya_open_sdk/tuyaos_adapter/src/drivers/tkl_pin.c). 유효한 GPIO 범위는 칩 변종에 의해 변화합니다.

칩 당 유효한 GPIO 범위를 위해, 보십시오[Per-Platform 핀 Mapping Docs](#per-platform-pin-mapping-docs)이름 *

### Pinmux (핀 다중화)
** 무엇: ** ESP32 온칩 주변 장치 (I2C, PWM, UART, 등) 고정 핀에 hardwired되지 않습니다 - 그들은 다른 GPIOs로 옮길 수 있습니다. TKL 소개`tkl_io_pinmux_config()`함수는 이 기능을 감싸고, 개발자는 초기화의 앞에 특정한 핀에 주변 기능을 할당합니다.

**사용할 때:**
- 하드웨어 디자인과 보드의 기본 핀 충돌 (예 : 핀은 다른 주변 장치로 점유)
- 사용자 정의 보드는 TuyaOpen의 기본 핀 할당을 따르지 않습니다.
- 귀하의 응용 프로그램은 동일한 주변 유형 (예를 들어, 두 I2C 버스)의 여러 인스턴스를 사용하여 별도의 핀이 필요합니다.

**사용 방법:** 이름 *`tkl_io_pinmux_config()`**before ** 대응`tkl_xxx_init()`:

```c
// Route I2C0 to GPIO42 (SCL) and GPIO41 (SDA)
tkl_io_pinmux_config(TUYA_GPIO_NUM_42, TUYA_IIC0_SCL);
tkl_io_pinmux_config(TUYA_GPIO_NUM_41, TUYA_IIC0_SDA);
tkl_i2c_init(TUYA_I2C_NUM_0, &cfg);   // picks up the pin assignment above

// Route PWM0 to GPIO5
tkl_io_pinmux_config(TUYA_GPIO_NUM_5, TUYA_PWM0);
tkl_pwm_init(TUYA_PWM_NUM_0, &pwm_cfg);
```

:::info[주의]
`tkl_io_pinmux_config()`대응하기 전에 호출해야합니다.`tkl_xxx_init()`. 초기화 후에 그것을 부르는 것은 아무 효력도 없습니다.
:::

## Per-platform 핀 매핑 docs
각 ESP32 칩 변종에는 GPIO 범위, UART 기본 및 보드 구성을 포함하는 전용 핀 매핑 문서가 있습니다.

- [ESP32 (클래식)](pinmux/esp32-classic)-- 듀얼 코어 Xtensa LX6, GPIO 0–39
- [사이트맵](pinmux/esp32-s3)-- 듀얼 코어 Xtensa LX7, GPIO 0-48, AI / 오디오 가능
- [모델 번호: ESP32-C3](pinmux/esp32-c3)-- 단일 RISC-V 코어, GPIO 0–21, 비용 최적화
- [사이트맵](pinmux/esp32-c6)-- 단일 RISC-V 코어, GPIO 0–30, Wi-Fi 6

## ADC 매핑
ESP32의 ADC는 ** 포트 + 채널 bitmask** 모델을 사용합니다.[카지노사이트 ₢ 킹](https://github.com/tuya/TuyaOpen-esp32/blob/master/tuya_open_sdk/tuyaos_adapter/src/drivers/tkl_adc.c):

|TuyaOpen 포트|ESP-IDF 단위|지원하다|
|--------------|-------------|-------|
| `TUYA_ADC_NUM_0` | `ADC_UNIT_1` |현재 위치|
| `TUYA_ADC_NUM_1` | `ADC_UNIT_2` |고전적인 ESP32에 Wi-Fi 중 사용 가능|

**채널 선택:**`cfg->ch_list.data`비트 N이 가능한 비트 마스크입니다.`ADC_CHANNEL_N`.

** 고정 설정:** 주의사항`ADC_ATTEN_DB_12`(~0–3.3 V 범위).`tkl_adc_ref_voltage_get()`3300 mV를 반환합니다. 교정은 곡선 피팅 (S2/S3/C3/C6) 또는 라인 피팅 (classic ESP32)을 사용합니다.

** 지원되지 않음: **`tkl_adc_temperature_get()`이름 *`OPRT_NOT_SUPPORTED`. 대신 ESP-IDF 온도 센서 드라이버를 사용하십시오.

## 더 보기
- [TuyaOpen의 ESP32 -- 개요](overview-esp32)
- [ESP32 지원 기능](esp32-supported-features)
- [새로운 ESP32 보드 추가](esp32-new-board)
