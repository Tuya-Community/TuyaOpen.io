---
title: BLE Peripheral 자습서
description: "TuyaOpen의 BLE 주변 튜토리얼 : 광고, 중앙 연결, 교환 GATT 데이터를 받아 읽고, 쓰기, 알림 및 MTU 이벤트를 처리합니다."
keywords:
  - ble peripheral
  - gatt
  - bluetooth
  - advertising
  - tuyaopen peripheral
---

BLE 주변 광고 자체를 광고하고 중앙에서 연결을 받아 GATT에 데이터를 교환합니다. 이 튜토리얼은 BLE Peripheral 예제를 다룹니다. 주변으로 초기화, 광고 및 스캔 응답 페이로드를 등록, 광고, 중앙에서 연결을 허용 (예를 들면 전화 실행 nRF 연결), 그리고 GATT 관련 이벤트를 처리 (읽는 업데이트, 쓰기, 구독 / 알림, 연결 매개 변수 업데이트, MTU). 예제 경로는`examples/ble/ble_peripher`(폴더 이름`ble_peripher`repo에서).

## 자주 묻는 질문
- [환경 설정](../../quick-start/enviroment-setup)
- [TAL Bluetooth API 참조](tal-bluetooth-api)

## 제품 정보
- 빌드 대상 **`examples/ble/ble_peripher`** BLE 주변 지원.
- ** BLE 중앙 ** (nRF 연결, USB 동글, 또는 전화[BLE 중앙 튜토리얼](ble-central-tutorial)펌웨어) 스캔 및 연결.
- 이벤트 추적을위한 직렬 로그.

## 한국어
1. 기타`examples/ble/ble_peripher`TuyaOpen 나무에서.

2. BLE-capable 보드를 선택하십시오.`tos.py config choice`.

3. 구조와 섬광:
   ```bash
   cd examples/ble/ble_peripher
   tos.py config choice
   tos.py build
   ```

4. 에 boot,`tal_ble_bt_init`공유하기`TAL_BLE_ROLE_PERIPERAL`** (현재 SDK 소스에 사용되는 식별자입니다) 및 이벤트 콜백.

5. 더 알아보기`TAL_BLE_STACK_INIT`**, 언제`init == 0`, 표본 세트 광고와 검사 응답`tal_ble_advertising_data_set`, 다음 **`tal_ble_advertising_start(TUYAOS_BLE_DEFAULT_ADV_PARAM)`**. 스캔 응답에는 **Complete Local Name**이 포함되어 있습니다.`TY`(바이트)`0x09`, `'T'`, `'Y'`) nRF Connect에서 쉽게 찾을 수 있습니다.

6. 중앙에서 연결. 표본에 있는 전형적인 사건: **`TAL_BLE_EVT_PERIPHERAL_CONNECT`** (일)`tal_ble_server_common_read_update`결합 버퍼로 **`TAL_BLE_EVT_CONN_PARAM_UPDATE`**, **`TAL_BLE_EVT_MTU_REQUEST`**, **`TAL_BLE_EVT_SUBSCRIBE`** (선택적인 통보`NOTIFY ENABLED`), **`TAL_BLE_EVT_WRITE_REQ`** 클라이언트 쓰기, **`TAL_BLE_EVT_DISCONNECT`** 다음 **`tal_ble_advertising_start`** 다시.

**확장된 결과:** 장치 광고 ** TY**, 연결, 교환 연결 매개 변수 및 MTU, 그리고 쓰기를받을 수 있습니다; 차단 후 다시 광고합니다.

## 구현 노트
- 광고 페이로드는 ** 31 바이트 ** 예에서 배열 (`adv_data_const`, `scan_rsp_data_const`). 생산 장치는 AD 구조 (길이, 유형, 가치)를 위한 ** Bluetooth SIG** GAP 규칙을 따릅니다.
- 주변 튜토리얼은 중앙 튜토리얼을 보완합니다. 두 개의 보드 또는 전화 플러스 장치를 End-to-end 테스트를 사용합니다.
- API 세부사항 및 과실 취급 본을 위해, 보십시오[TAL Bluetooth API 참조](tal-bluetooth-api).
- 추가 다이어그램 및 로그 연습 :`examples/ble/ble_peripher/README.md`.

## 이름 *
- 근원:`examples/ble/ble_peripher/src/example_ble_peripheral.c`
- [BLE 중앙 튜토리얼](ble-central-tutorial)
- [TAL Bluetooth API 참조](tal-bluetooth-api)
- [예제 인덱스](../../examples/demo-generic-examples)
