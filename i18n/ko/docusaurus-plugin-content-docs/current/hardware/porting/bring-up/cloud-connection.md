---
title: "Get-up 4: 클라우드 연결"
description: "TuyaOpen porting의 4 단계 가져 오기 - 쌍, 활성화 및 MQTT를 통해 Tuya 클라우드에 장치를 연결, Switch demo로 끝나는 확인 된 끝."
keywords:
  - tuyaopen porting
  - bring-up
  - cloud connection
  - mqtt
  - tuya cloud
---

네 번째 단계는 통합 이정표입니다 : 시스템, 스토리지 및 네트워크, 장치 쌍, 활성화 및 MQTT에 Tuya 클라우드에 이야기합니다. 시간 :`switch_demo`끝에 일, 당신의 항구는 기능적으로 완료됩니다.

## 이름 *
장치 쌍 (블루투스 또는 Wi-Fi AP), 제품에 대한 활성화, MQTT 이상의 클라우드에 연결, 및 보고서 / 수신 데이터 포인트 - 확인`switch_demo`.

## 실행 파일
이 단계는 작은 새로운 어댑터 코드를 추가 — 그것은 함께 단계 1–3. 이 지원 조각을 확인하십시오:

|파일 형식|당신이 실행 / 확인|
|------|------------------------------|
| `tkl_rtc.c`* (또는 SNTP)*|실시간 - TLS 인증서 검증 및 클라우드 핸디케이크는 올바른 시계가 필요합니다.|
| `tkl_system.c`사이트맵|강력한 임의 소스 (단계에서 참조 1) TLS 및 키 생성|
| `tkl_bluetooth.c`* (선택) *|**BLE 프로비저닝 **; Wi-Fi AP 페어링은 Bluetooth가 없습니다.|

나머지 — MQTT, TLS, 활성화 — TuyaOpen 라이브러리 코드는 스택에서 이미 포트.

## 이름 *
- ** 필수품: ** a`PID`및 라이센스 (`UUID` + `AuthKey`) 펌웨어로 깜박임. 이름 *[장치 방법–cloud 바인딩 작품](../../../cloud/tuya-cloud/device-cloud-binding)이름 *[장비 인증](../../../quick-start/equipment-authorization).
- **시간 문제.** 잘못된 시계는 TLS 인증서 유효성 검사를 실패 — RTC 또는 SNTP를 통해 클라우드 핸디케이크 전에 동기화.
- **Pairing 경로.** BLE 프로비저닝 필요`tkl_bluetooth.c`; 그렇지 않으면 다음 단계에 Wi-Fi AP 페어링 및 defer Bluetooth를 사용합니다.
- ** 용도`switch_demo`** 참고 앱으로 - 그것은 최소한이며 주변 문제에서 구름 경로를 고립시킵니다.

## 계정 만들기
빌드 및 플래시`apps/tuya_cloud/switch_demo`, Tuya 앱에서 페어링, 활성화 및 연결 확인 (보기`TUYA_EVENT_MQTT_CONNECTED`). 앱에서 스위치를 전환하고 장치에서 데이터 포인트 업데이트를 모두 확인합니다. 선택적으로 OTA를 검증합니다. 이 단계 통과는 플랫폼은 구름 보행입니다.

다음 :[5 : Peripherals 및 AI를 가져 오기](peripherals-and-ai).

## 더 보기
- [장치 방법–cloud 바인딩 작품](../../../cloud/tuya-cloud/device-cloud-binding)
- [Tuya IoT 클라이언트 API](../../../cloud/iot-client/tuya-iot-client-reference)
- [스위치 demo](../../../cloud/iot-client/demo-tuya-iot-light)
