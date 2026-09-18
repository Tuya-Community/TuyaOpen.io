---
title: Tuya IoT Client API 레퍼런스
description: "Tuya IoT 클라이언트 API 참고 - tuya iot.h는 구성, 수명주기, 활성화, MQTT, DP보고 및 클라우드 앱 개발을 위한 이벤트를 포함합니다."
keywords:
  - tuya iot client api
  - tuya_cloud_service
  - mqtt
  - dp reporting
  - iot client reference
---

## 개요
`tuya_iot.h`는 Tuya IoT 클라이언트를 정의합니다: 구성, 수명주기 (`init`, `start`, `yield`, `stop`, `destroy`), 클라우드 활성화, MQTT, DP보고, 이벤트. 클라우드 앱은 TAL(Wi-Fi, 네트워크, KV)의 상단에 레이어를 사용합니다.

**출처:** `TuyaOpen/src/tuya_cloud_service/cloud/tuya_iot.h`

**오디오:** `switch_demo` 또는 IoT등의 Tuya Cloud 데모를 확장하는 개발자.

:::기사
Tuya Cloud는 유효한 면허 열쇠 및 제품 체제를 필요로 합니다. [Equipment authorization](../../quick-start/equipment-authorization)를 참조하십시오.
:::

## 구성
|제품정보|제품정보|
|------|------|
|`tuya_iot_config_t`를|제품 키, UUID, auth 키, 소프트웨어 버전, 옵션 모듈, `event_handler`, `network_check`, `ota_handler`.|
|`tuya_iot_license_t`를|UUID 및 라이센스에 대한 오스틴 키 읽기.|
|`tuya_activated_data_t`를|장치 ID, 열쇠, schema, 활성화 후에 timezone.|
|`tuya_event_msg_t`를|이벤트 ID, 유형 및 `event_handle_cb_t`의 가치.|

## 라이프사이클
|제품정보|이름 *|
|----------|-------------|
|`tuya_iot_license_read`를|저장에서 라이센스를 읽으십시오.|
|`tuya_iot_init`를|config에서 초기화합니다.|
|`tuya_iot_start`를|클라우드 서비스 시작|
|`tuya_iot_yield`를|클라이언트를 펌프 (통제).|
|`tuya_iot_stop`를|정지 서비스.|
|`tuya_iot_reset`를|클라이언트 재설정.|
|`tuya_iot_destroy`를|무료 자원.|
|`tuya_iot_reconnect`를|연결 MQTT.|

## 데이터 포인트
|제품정보|이름 *|
|----------|-------------|
|`tuya_iot_dp_report_json`를|DP JSON를 보고하십시오.|
|`tuya_iot_dp_report_json_with_time`를|타임스탬프 JSON와 보고서.|
|`tuya_iot_dp_report_json_async`를|콜백과 타임아웃과 동기화.|
|`tuya_iot_dp_report_json_with_notify`를|콜백을 알리는 동기화.|

들어오는 DPs는 `TUYA_EVENT_DP_RECEIVE`, `TUYA_EVENT_DP_RECEIVE_CJSON`, `TUYA_EVENT_DP_RECEIVE_OBJ`, `TUYA_EVENT_DP_RECEIVE_RAW`와 같은 사건을 이용합니다.

## 국가 및 겟터
|제품정보|이름 *|
|----------|-------------|
|`tuya_iot_activated`를|활성화 깃발.|
|`tuya_iot_activated_data_remove`를|명확한 활성화 저장.|
|`tuya_iot_token_get_port_register`를|주문 토큰 걸이.|
|`tuya_iot_version_update_sync`를|푸시 소프트웨어 버전.|
|`tuya_iot_extension_modules_version_update`를|연장 단위 버전.|
|`tuya_iot_devid_get`, `tuya_iot_localkey_get`, `tuya_iot_seckey_get`, `tuya_iot_timezone_get`|활성화된 장치 분야.|
|`tuya_iot_client_get`를|글로벌 고객 포인터.|
|`tuya_iot_is_connected`를|Cloud 연결.|
|`tuya_iot_dispatch_event`를|Dispatch 도움자.|

## 선정된 행사
`tuya_event_id_t`의 예: `TUYA_EVENT_RESET`, `TUYA_EVENT_BIND_START`, `TUYA_EVENT_ACTIVATE_SUCCESSED`, `TUYA_EVENT_MQTT_CONNECTED`, `TUYA_EVENT_MQTT_DISCONNECT`, `TUYA_EVENT_UPGRADE_NOTIFY`, `TUYA_EVENT_TIMESTAMP_SYNC`. 전체 목록의 헤더를 참조하십시오.

`tuya_client_status_t`는 Wi-Fi와 MQTT 상태를 보고합니다.

## 참조
- [Tuya IoT 빛] (demo-tuya-iot-light)
- [TAL Wi-Fi API 참조](../../peripheral/tutorials/tal-wifi-api)
- [TAL 네트워크 API 참조](../../peripheral/tutorials/tal-network-api)
- [Equipment 인증] (../../quick-start/equipment-authorization)
