---
title: TAL 블루투스 API 참조
description: "TuyaOpen의 TAL Bluetooth API 참조 : tal bluetooth.h는 이벤트 콜백을 통해 init, 광고, 스캔, 연결, GATT 교환 및 MTU를 포함합니다."
keywords:
  - tal bluetooth
  - tal_bluetooth.h
  - ble
  - gatt
  - tuyaopen api
---

## 제품정보
헤드러`tal_bluetooth.h`TuyaOpen TAL Bluetooth API: 스택 초기화, 광고, 스캔, 연결, GATT-style 데이터 교환 및 MTU 협상. 이벤트는 콜백 등록을 통해 전달됩니다.`tal_ble_bt_init`. 유형과 같은`TAL_BLE_ADV_PARAMS_T`정의 된`tal_bluetooth_def.h`.

**오디오:** 개발자는 지원된 플랫폼에서 BLE 중앙 또는 주변 행동을 통합합니다.

## 반환 값
기능 반환`OPERATE_RET` (`OPRT_OK`성공에). 여러 APIs는 RSSI, 연결 매개 변수 업데이트 및 이와 유사한 결과도 BLE 이벤트를 통해 비동기적으로보고.

## 초기화 및 정체성
|제품정보|이름 *|
|----------|-------------|
| `tal_ble_bt_init` |주어진 역할을 위해 Bluetooth를 초기화; 이벤트 콜백을 등록하십시오.|
| `tal_ble_bt_deinit` |Bluetooth (또는 1개의 역할)를 분리하십시오.|
| `tal_ble_address_set` |로컬 ID 주소를 설정합니다.|
| `tal_ble_address_get` |로컬 ID 주소를 읽으십시오.|
| `tal_ble_bt_link_max` |플랫폼 당 최대 링크 수 또는 MTU 관련 제한을 얻으십시오.|

## 광고 (peripheral)
|제품정보|이름 *|
|----------|-------------|
| `tal_ble_advertising_start` |광고 시작.|
| `tal_ble_advertising_data_set` |광고 및 검사 응답 payload를 놓으십시오.|
| `tal_ble_advertising_stop` |광고 중지.|
| `tal_ble_advertising_data_update` |Update payloads; 행동은 광고가 활성 여부에 따라 달라집니다.|

## 스캔 (central)
|제품정보|이름 *|
|----------|-------------|
| `tal_ble_scan_start` |스캔 시작; 조언 및 스캔 응답 데이터는 통해 도착`TAL_BLE_EVT_ADV_REPORT`. |
| `tal_ble_scan_stop` |스캔 중지.|

## 연결 관리
|제품정보|이름 *|
|----------|-------------|
| `tal_ble_connect_and_discovery` |연결 시작; 완료 via`TAL_BLE_EVT_CENTRAL_CONNECT_DISCOVERY`. |
| `tal_ble_disconnect` |차단; 중앙 또는 주변을 위해 작동 (작동 당 채우는 손잡이 및 주소).|
| `tal_ble_conn_param_update` |연결 모수 갱신을 요구하십시오; 결과를 통해`TAL_BLE_EVT_CONN_PARAM_UPDATE`. |
| `tal_ble_rssi_get` |RSSI 요청; 샘플을 통해 제공`TAL_BLE_EVT_LINK_RSSI`. |

## 데이터 경로(GATT-style Helpers)
|제품정보|이름 *|
|----------|-------------|
| `tal_ble_server_common_send` |Peripheral: notify 또는 일반적인 채널에 표시.|
| `tal_ble_server_common_notify` |Peripheral: 특성 색인에 의해 통지.|
| `tal_ble_server_common_read_update` |Peripheral: 갱신 읽기 쉬운 가치.|
| `tal_ble_server_common_read_update_ext` |Peripheral: 특성 색인에 의하여 갱신.|
| `tal_ble_client_common_send` |Central: 동료에게 쓰기.|
| `tal_ble_client_common_read` |Central: 피어에서 읽기.|

## MTU 교환
|제품정보|이름 *|
|----------|-------------|
| `tal_ble_server_exchange_mtu_reply` |Peripheral: MTU 교환에 대답.|
| `tal_ble_client_exchange_mtu_request` |중앙: 요청 MTU 교환.|

## 플랫폼 노트
- 기능 가용성은 칩, SDK 윤곽 및 TKL 접합기에 달려 있습니다 (예를 들면 고전적인 BT versus BLE 전용 부속).
- 항상 이벤트 콜백을 구현`tal_ble_bt_init`; 많은 APIs는 사건을 통해서 비동기적으로 일합니다.

## 이름 *
- 근원:`TuyaOpen/src/tal_bluetooth/include/tal_bluetooth.h`이름 *`tal_bluetooth_def.h`
- [Wi-Fi 스테이션 튜토리얼](wifi-station-tutorial)
- [TKL 블루투스](../../tkl-api/tkl_bluetooth)
