---
title: BLE 중앙 자습서
description: "TuyaOpen의 BLE 중앙 자습서 : tal ble bt init과 중앙으로 초기화하고 tal ble scan start를 통해 광고주를 스캔하고 ADV REPORT 이벤트를 처리하십시오."
keywords:
  - ble central
  - bluetooth
  - tal_ble
  - advertising
  - tuyaopen peripheral
---

BLE 중앙 장치는 주변 장치를 광고하고 광고 자료를 읽습니다. 이 튜토리얼은 BLE Central 예제를 통해 걸어갑니다. 중앙 장치로 스택을 초기화하고 광고주를 스캔하고 핸들을 처리하십시오.`TAL_BLE_EVT_ADV_REPORT`행사일정 당신은`tal_ble_bt_init`이름 *`TAL_BLE_ROLE_CENTRAL`, `tal_ble_scan_start`, 그리고 콜백은 피어 주소, 주소 유형, RSSI 및 원시 광고 페이로드를 인쇄합니다. 예는 아래와 같습니다.`examples/ble/ble_central`TuyaOpen repo에서.

## 자주 묻는 질문
- [환경 설정](../../quick-start/enviroment-setup)
- [TAL Bluetooth API 참조](tal-bluetooth-api)

## 제품 정보
- BLE 및 빌드를 포함하는 대상 칩 및 보드 구성`examples/ble/ble_central`.
- 가까운 BLE 주변 장치 (NRF Connect, 다른 보드 또는 BLE Peripheral 튜토리얼 장치가있는 전화).
- 스캔 출력을 확인합니다.

## 한국어
1. 예제를 엽니다:`examples/ble/ble_central`TuyaOpen 나무에서.

2. BLE 중앙을 지원하는 보드 선택`tos.py config choice`.

3. 구조와 섬광:

   ```bash
   cd examples/ble/ble_central
   tos.py config choice
   tos.py build
   ```

4. 부팅 후, 앱 호출`tal_ble_bt_init(TAL_BLE_ROLE_CENTRAL, __ble_central_event_callback)`스캔 시작`TAL_BLE_SCAN_PARAMS_T`(액티브 스캔, 간격 및 창`0x400`, 표본에 있는 장시간.

5. 광고가 보고될 때, 콜백 로그 주소 바이트, 공공 대 임의 주소 유형, ADV 페이로드 유형, RSSI 및 hex 덤프`p_data`이름 *`data_len`, 다음 호출`tal_ble_scan_stop()`(문서 취급 후에 표본 정지).

**확장된 결과:** 로그 쇼`TAL_BLE_EVT_ADV_REPORT`피어 주소, RSSI 및 주변 장치가 범위에있을 때 광고 바이트.

## 구현 노트
- 중앙 역할은 스캔을 시작; 주변 광고. 쌍과 함께`examples/ble/ble_peripher`2개의 널에 시험하기 위하여.
- 지원하다`scan_cfg`(유형, 간격, 창, 타임아웃,`filter_dup`) 당신의 제품을 위해. 이름 *`TAL_BLE_SCAN_PARAMS_T`내 계정`tal_bluetooth.h`.
- 샘플은 이벤트 콜백 내부 스캔을 중지합니다. 연속 스캔의 경우, 모든 보고서에 중지하거나 필요한 스캔을 다시 시작합니다.
- 주소 및 AD 구조에 대한 더 긴 배경은`examples/ble/ble_central/README.md`.

## 이름 *
- 근원:`examples/ble/ble_central/src/example_ble_central.c`
- [BLE Peripheral 튜토리얼](ble-peripheral-tutorial)
- [TAL Bluetooth API 참조](tal-bluetooth-api)
- [예제 인덱스](../../examples/demo-generic-examples)
