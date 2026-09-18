---
title: "5 : Peripherals 및 AI를 가져 오기"
description: "TuyaOpen porting의 5 단계 가져 오기 - GPIO, 버스, 오디오, 디스플레이 및 Bluetooth를 가져 오면, your chat bot과 같은 AI 응용 프로그램을 실행하십시오."
keywords:
  - tuyaopen porting
  - bring-up
  - peripherals
  - ai
  - your_chat_bot
---

최종 단계는 하드웨어를 실제로 사용하는 하드웨어를 가져옵니다 - GPIO, 버스, 오디오, 디스플레이, 블루투스 - 그리고 그 후 지금 고체 기지의 상단에 AI 응용 프로그램을 실행. 마지막으로: 주변 버그는 한 번 시스템, 스토리지, 네트워크, 클라우드 이미 작업을 쉽게 찾을 수 있습니다.

## 이름 *
TuyaOpen을 통해 제품의 주변 작업 및 AI 응용 프로그램`your_chat_bot`end (voice in, cloud reasoning, voice/display out)를 실행합니다.

## 실행 파일
당신의 제품 필요만 실행하십시오.

|파일 형식|이름 *|
|------|---------|
| `tkl_gpio.c` / `tkl_pinmux.c` |GPIO와 핀 다중화|
| `tkl_i2c.c` / `tkl_spi.c` |I2C 및 SPI 버스 (센서, 디스플레이, 코덱)|
| `tkl_pwm.c` / `tkl_adc.c` / `tkl_dac.c` |PWM의 ADC, DAC|
| `tkl_i2s.c` |I2S 오디오 - 마이크 캡처 및 스피커 재생|
| `tkl_disp.c`* (또는`mcu8080` / `rgb` / `qspi`)* |Display Panel 인터페이스|
| `tkl_bluetooth.c` |BLE - 프로비저닝 및 BLE 주변 장치|
| `tkl_kws.c` / `tkl_vad.c` |Wake-word spotting 및 음성 활동 탐지|
| `tkl_ota.c` |OTA 펌웨어 업데이트|

## 이름 *
- **Audio는 AI 필수품입니다. **`your_chat_bot`I2S 캡처 및 재생 작업 필요; 가져 오기`tkl_i2s.c`클라우드 AI 레이어를 추가하기 전에 Mike-to-speaker 루프백을 확인합니다.
- **Display**는 on-device AI UI에만 필요합니다. 패널 용도를 선택하세요 (`mcu8080`, `rgb`, 또는`qspi`).
- ** 단어가 있습니다. **`tkl_kws.c` / `tkl_vad.c`장치가 키워드에 깨어 버리십시오. 플랫폼의 모델 파일을 공급하십시오.
- **Validate 주변 장치 개별적으로 **[주변 예제](../../../peripheral/support_peripheral_list)앱으로 구성하기 전에.
- on-device AI 스택 자체 (모드, 에이전트, UI) 재사용 - 참조[구성 요소 프레임](../../../cloud/device-ai/ai-components/ai-components.md); 당신은 단지 이 접합기를 통해 기계설비를 제공합니다.

## 계정 만들기
관련 주변 예제 (GPIO, I2C, 오디오)를 실행하고 각 작품을 확인합니다. 다음 빌드`apps/tuya.ai/your_chat_bot`, 그리고 전체 음성 왕복을 확인합니다 : → ASR → 클라우드 응답 → TTS 재생 (및 디스플레이, 현재 경우). 즉 플랫폼 포트를 완료합니다.

## 더 보기
- [구성 요소 프레임](../../../cloud/device-ai/ai-components/ai-components.md)— on-device AI 스택 당신은 상단에 실행
- [Multimodal 데이터 흐름](../../../cloud/device-ai/multimodal-data-flow)— 오디오/비전이 클라우드에 도달하는 방법
- [지원되는 주변 장치](../../../peripheral/support_peripheral_list)
- [TuyaOpen에 칩을 가져 오기](../bring-your-chip-to-tuyaopen)
