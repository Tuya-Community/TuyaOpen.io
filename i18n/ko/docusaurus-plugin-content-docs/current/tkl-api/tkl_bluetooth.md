---
title: tkl bluetooth | 블루투스 드라이버
description: "tkl bluetooth reference — TuyaOpen BLE 드라이버 TKL API GAP, GATT 서버/클라이언트, 포트/플랫폼 적응을 위한 TuyaOS에 납품업자 통제."
keywords:
  - tkl_bluetooth
  - tuyaopen ble driver
  - tkl bluetooth api
  - embedded ble stack
---

`tkl_bluetooth`플랫폼의 BLE 스택을 TuyaOS에 적용한다. 그것은 BLE 스택 수명주기, GAP 작업 (광고, 스캔, 연결, 주소, 전력, RSSI), GATT 서버 (서비스, 속성 값, 알림 및 표시, MTU), GATT 클라이언트 (서비스 및 특성 발견, 읽기 및 쓰기, MTU) 및 공급 업체 별 컨트롤을 노출. 구현 생활`tkl_bluetooth.c`, 지원 유형은 선언됩니다`tkl_bluetooth_def.h`.

그렇지 않으면, 각 함수 반환`OPRT_OK`성공과 오류에 또 다른 가치.

스택은 역할 당 구성:

|제품정보|주요 특징|이름 *|
| --- | --- | --- |
| `TKL_BLE_ROLE_SERVER` | 1 |BLE 주변 장치 (서버).|
| `TKL_BLE_ROLE_CLIENT` | 2 |BLE 중앙 (클라이언트).|

## 프로젝트
```c
OPERATE_RET tkl_ble_stack_init(uint8_t role);
```

- 기능 묘사:

BLE 프로토콜 스택 초기화

- 모수:

  |입력/출력|모수 이름|이름 *|
  | ------------ | -------------- | ---------------------- |
  |[인]|이름 *|BLE 역할 구성|

  |이름 *|이름 *|이름 *|
  | :------------------ | :--------- | :------ |
  |TKL BLE ROLE 서비스|BLE 서버|         |
  |TKL BLE ROLE 액티브|BLE 클라이언트|         |

- 반환 값:

  - OPRT OK : 성공
  - 기타 : 실패

## 프로젝트
```c
OPERATE_RET tkl_ble_stack_deinit(uint8_t role);
```

- 기능 묘사:

BLE 프로토콜 스택 분리

- 모수:

  |입력/출력|모수 이름|이름 *|
  | ------------ | -------------- | ------------------------ |
  |[인]|이름 *|BLE 역할, 아래와 같이|

  |이름 *|이름 *|이름 *|
  | :------------------ | :--------- | :------ |
  |TKL BLE ROLE 서비스|BLE 서버|         |
  |TKL BLE ROLE 액티브|BLE 클라이언트|         |

- 반환 값:

  - OPRT OK : 성공
  - 기타 : 실패

## tkl ble stack gatt link의 경우
```c
OPERATE_RET tkl_ble_stack_gatt_link(uint16_t *p_link);
```

- 기능 묘사:

스택이 GATT 링크를 지원하는지 Query.

- 모수:

  |입력/출력|모수 이름|이름 *|
  | ------------ | -------------- | ----------------- |
  |[아웃]|p 링크|GATT 링크.|

- 반환 값:

  - OPRT OK : GATT 링크 지원
  - 기타 : 비콘 또는 메쉬 비콘 만; GATT 링크는 지원되지 않습니다.

## tkl ble gap callback register를 호출합니다.
```c
OPERATE_RET tkl_ble_gap_callback_register(const TKL_BLE_GAP_EVT_FUNC_CB gap_evt);
```

- 기능 묘사:

GAP 콜백 함수 등록

- 모수:

  |입력/출력|모수 이름|이름 *|
  | ------------ | -------------- | ---------------------------------------------------- |
  |[인]|뚱 베어|아래 정의된 GAP 콜백 함수를 등록하십시오.|

  ```c
  typedef void(*TKL_BLE_GAP_EVT_FUNC_CB)(TKL_BLE_GAP_PARAMS_EVT_T *p_event);
  ```

**TKL BLE GAP PARAMS EVT T**

  ```c
  typedef struct {
        TKL_BLE_GAP_EVT_TYPE_E          type;           /**< Gap Event */
        uint16_t                        conn_handle;    /**< Connection Handle */
        int                           result;         /**< Will Refer to HOST STACK Error Code */

        union {
            TKL_BLE_GAP_CONNECT_EVT_T       connect;        /**< Receive connect callback, This value can be used with TKL_BLE_EVT_PERIPHERAL_CONNECT and TKL_BLE_EVT_CENTRAL_CONNECT_DISCOVERY*/
            TKL_BLE_GAP_DISCONNECT_EVT_T    disconnect;     /**< Receive disconnect callback*/
            TKL_BLE_GAP_ADV_REPORT_T        adv_report;     /**< Receive Adv and Respond report*/
            TKL_BLE_GAP_CONN_PARAMS_T       conn_param;     /**< We will update connect parameters.This value can be used with TKL_BLE_EVT_CONN_PARAM_REQ and TKL_BLE_EVT_CONN_PARAM_UPDATE*/
            char                          link_rssi;      /**< Peer device RSSI value */
        }gap_event;

    } TKL_BLE_GAP_PARAMS_EVT_T;
  ```

- 반환 값:

  - OPRT OK : 성공
  - 기타 : 실패

## tkl ble gatt callback register를 호출합니다.
```c
OPERATE_RET tkl_ble_gatt_callback_register(const TKL_BLE_GATT_EVT_FUNC_CB gatt_evt);
```

- 기능 묘사:

GATT 콜백 함수 등록

- 모수:

  |입력/출력|모수 이름|이름 *|
  | ------------ | -------------- | ---------------------- |
  |[인]|사이트 맵|GATT 콜백 기능|

  ```c
  typedef void(*TKL_BLE_GATT_EVT_FUNC_CB)(TKL_BLE_GATT_PARAMS_EVT_T *p_event);
  ```

**TKL BLE GATT PARAMS EVT T**

다음과 같이 GATT 사건 정의:

  ```c
  typedef struct {
      TKL_BLE_GATT_EVT_TYPE_E             type;           /**< Gatt Event */
      uint16_t                            conn_handle;    /**< Connection Handle */
      int                               result;         /**< Will Refer to HOST STACK Error Code */

      union {
          uint16_t                        exchange_mtu;   /**< This value can be used with TKL_BLE_GATT_EVT_MTU_REQUEST and TKL_BLE_GATT_EVT_MTU_RSP*/
          TKL_BLE_GATT_SVC_DISC_TYPE_T    svc_disc;       /**< Discovery All Service */
          TKL_BLE_GATT_CHAR_DISC_TYPE_T   char_disc;      /**< Discovery Specific Characteristic */
          TKL_BLE_GATT_DESC_DISC_TYPE_T   desc_disc;      /**< Discovery Specific Descriptors*/
          TKL_BLE_NOTIFY_RESULT_EVT_T     notify_result;  /**< This value can be used with TKL_BLE_GATT_EVT_NOTIFY_TX*/
          TKL_BLE_DATA_REPORT_T           write_report;   /**< This value can be used with TKL_BLE_GATT_EVT_WRITE_REQ*/
          TKL_BLE_DATA_REPORT_T           data_report;    /**< This value can be used with TKL_BLE_GATT_EVT_NOTIFY_INDICATE_RX*/
          TKL_BLE_DATA_REPORT_T           data_read;      /**< After we do read attr in central mode, we will get the callback*/
          TKL_BLE_SUBSCRBE_EVT_T          subscribe;      /**< ccc callback event, used with TKL_BLE_GATT_EVT_SUBSCRIBE*/
          TKL_BLE_READ_CHAR_EVT_T         char_read;      /**< read char event, used with TKL_BLE_GATT_EVT_READ_CHAR_VALUE*/
      } gatt_event;
  } TKL_BLE_GATT_PARAMS_EVT_T;
  ```

- 반환 값:

  - OPRT OK : 성공
  - 기타 : 실패

## 프로젝트
```c
OPERATE_RET tkl_ble_gap_addr_set(TKL_BLE_GAP_ADDR_T const *p_peer_addr);
```

- 기능 묘사:

BLE MAC 주소 설정

- 모수:

  |입력/출력|모수 이름|이름 *|
  | ------------ | -------------- | ----------------------------------- |
  |[인]|파일 형식|MAC 주소, 옵션 공개 / 무작위|

- 반환 값:

  - OPRT OK : 성공
  - 기타 : 실패

- ** 알림 **

일반적으로, 단위는 생산 후에 MAC 주소를 비치하고 형성될 필요가 없습니다.

## 바카라사이트
```c
OPERATE_RET tkl_ble_gap_address_get(TKL_BLE_GAP_ADDR_T *p_peer_addr);
```

- 기능 묘사:

BLE 장치 MAC 주소를 읽으십시오

- 모수:

  |입력/출력|모수 이름|이름 *|
  | ------------ | -------------- | ------------------ |
  |[아웃]|파일 형식|장치 MAC 주소|

- 반환 값:

  - OPRT OK : 성공
  - 기타 : 실패

- ** 알림 **

자주 묻는 질문

## tkl ble gap adv 스타트
```c
OPERATE_RET tkl_ble_gap_adv_start(TKL_BLE_GAP_ADV_PARAMS_T const *p_adv_params);
```

- 기능 묘사:

BLE 광고 시작

- 모수:

  |입력/출력|모수 이름|이름 *|
  | ------------ | -------------- | -------------------------------------- |
  |[인]|프로젝트|광고 모수, 아래와 같이|

**TKL BLE GAP ADV PARAMS T **

  ```c
  typedef struct {
      uint8_t                 adv_type;                   /**< Adv Type. Refer to TKL_BLE_GAP_ADV_TYPE_CONN_SCANNABLE_UNDIRECTED etc. */
      TKL_BLE_GAP_ADDR_T      direct_addr;                /**< For Directed Advertising, you can fill in direct address */

      uint16_t                adv_interval_min;           /**< Range: 0x0020 to 0x4000  Time = N * 0.625 msec Time Range: 20 ms to 10.24 sec */
      uint16_t                adv_interval_max;           /**< Range: 0x0020 to 0x4000  Time = N * 0.625 msec Time Range: 20 ms to 10.24 sec */
      uint8_t                 adv_channel_map;            /**< Advertising Channel Map, 0x01 = adv channel index 37,  0x02 = adv channel index 38,
                                                                  0x04 = adv channel index 39. Default Value: 0x07 */
  } TKL_BLE_GAP_ADV_PARAMS_T;
  ```

- 반환 값:

  - OPRT OK : 성공
  - 기타 : 실패

## tkl ble gap adv 스톱
```c
OPERATE_RET tkl_ble_gap_adv_stop(void);
```

- 기능 묘사:

BLE 광고

- 모수:

이름 *

- 반환 값:

  - OPRT OK : 성공
  - 기타 : 실패

## tkl ble gap adv rsp data set의 경우
```c
OPERATE_RET tkl_ble_gap_adv_rsp_data_set(TKL_BLE_DATA_T const *p_adv, TKL_BLE_DATA_T const *p_scan_rsp);
```

- 기능 묘사:

광고 자료

- 모수:

  |입력/출력|모수 이름|이름 *|
  | ------------ | -------------- | ------------------ |
  |[인]|사이트맵|광고 자료|
  |[인]|사이트맵|검사 응답 자료|

- 반환 값:

  - OPRT OK : 성공
  - 기타 : 실패

## tkl ble gap adv rsp data update를 실행합니다.
```c
OPERATE_RET tkl_ble_gap_adv_rsp_data_update(TKL_BLE_DATA_T const *p_adv, TKL_BLE_DATA_T const *p_scan_rsp);
```

- 기능 묘사:

광고 자료

- 모수:

  |입력/출력|모수 이름|이름 *|
  | ------------ | -------------- | ------------------ |
  |[인]|사이트맵|광고 자료|
  |[인]|사이트맵|검사 응답 자료|

- 반환 값:

  - OPRT OK : 성공
  - 기타 : 실패

## 프로젝트
```c
OPERATE_RET tkl_ble_gap_scan_start(TKL_BLE_GAP_SCAN_PARAMS_T const *p_scan_params);
```

- 기능 묘사:

스캔 시작

- 모수:

  |입력/출력|모수 이름|이름 *|
  | ------------ | -------------- | ------------------------------- |
  |[인]|사이트맵|검사 모수, 아래와 같이|

**TKL BLE GAP SCAN PARAMS T **

  ```c
  typedef struct {
      uint8_t                 extended;                   /**< If 1, the scanner will accept extended advertising packets.
                                                              If set to 0, the scanner will not receive advertising packets
                                                              on secondary advertising channels, and will not be able
                                                              to receive long advertising PDUs. */
      uint8_t                 active : 1;                 /**< [Tuya Need]!!!! If 1, perform active scanning by sending scan requests.
                                                              This parameter is ignored when used with @ref tkl_ble_gap_connect. */
      uint8_t                 scan_phys;                  /**< Refer to @TKL_BLE_GAP_PHY_1MBPS. TKL_BLE_GAP_PHY_2MBPS */
      uint16_t                interval;                   /**< Scan interval in 625 us units. */
      uint16_t                window;                     /**< Scan window in 625 us units. */
      uint16_t                timeout;                    /**< Scan timeout in 10 ms units. */
      uint8_t                 scan_channel_map;           /**< Scan Channel Index, refer to @TKL_BLE_GAP_ADV_PARAMS_T */
  } TKL_BLE_GAP_SCAN_PARAMS_T;
  ```

- 반환 값:

  - OPRT OK : 성공
  - 기타 : 실패

- 이름 *

tkl ble gap scan start는 컨트롤러를 활성화하거나 중앙 모드를 지원할 때 사용됩니다.

## 프로젝트
```c
OPERATE_RET tkl_ble_gap_scan_stop(void);
```

- 기능 묘사:

Bluetooth 검사

- 모수:

이름 *

- 반환 값:

  - OPRT OK : 성공
  - 기타 : 실패

## tkl ble gap connect에 대해
```c
OPERATE_RET tkl_ble_gap_connect(TKL_BLE_GAP_ADDR_T const *p_peer_addr, TKL_BLE_GAP_SCAN_PARAMS_T const *p_scan_params, TKL_BLE_GAP_CONN_PARAMS_T const *p_conn_params);
```

- 기능 묘사:

클라이언트로, 연결을 시작.

- 모수:

  |입력/출력|모수 이름|이름 *|
  | ------------ | -------------- | --------------------- |
  |[인]|파일 형식|Peer 주소|
  |[인]|사이트맵|검사 모수|
  |[인]|프로젝트|연결 모수|

- 반환 값:

  - OPRT OK : 성공
  - 기타 : 실패

- **계획**

중앙으로 적응할 때만 필요하다.

## tkl ble gap disconnect에 대해
```c
OPERATE_RET tkl_ble_gap_disconnect(uint16_t conn_handle, uint8_t hci_reason);
```

- 기능 묘사:

BLE 연결 차단

- 모수:

  |입력/출력|모수 이름|이름 *|
  | ------------ | -------------- | --------------------------------------------------------------------- |
  |[인]|사이트맵|연결 손잡이|
  |[인]|프로젝트|정상적인 경우에는 0x13를 사용합니다.|

- 반환 값:

  - OPRT OK : 성공
  - 기타 : 실패

- ** 알림 **

클라이언트와 서버 모두에 의해 사용하는.

## tkl ble gap conn param 업데이트
```c
OPERATE_RET tkl_ble_gap_conn_param_update(uint16_t conn_handle, TKL_BLE_GAP_CONN_PARAMS_T const *p_conn_params);
```

- 기능 묘사:

GAP 연결 매개 변수 업데이트

- 모수:

  |입력/출력|모수 이름|이름 *|
  | ------------ | -------------- | --------------------- |
  |[인]|사이트맵|연결 손잡이|
  |[인]|프로젝트|연결 모수|

- 반환 값:

  - OPRT OK : 성공
  - 기타 : 실패

## tkl ble gap tx power set의 경우
```c
OPERATE_RET tkl_ble_gap_tx_power_set(uint8_t role, int tx_power);
```

- 기능 묘사:

라디오 전송 힘을 설정합니다.

- 모수:

  |입력/출력|모수 이름|이름 *|
  | ------------ | -------------- | --------------------------------------------------------------------------- |
  |[인]|이름 *|0: 광고 Tx 힘; 1: 검사 Tx 힘; 2: 연결 Tx 힘.|
  |[인]|사이트맵|Tx 힘은, 10배 확대했습니다 (예를 들면, -75는 -7.5 dB, 40 4 dB를 의미합니다).|

- 반환 값:

  - OPRT OK : 성공
  - 기타 : 실패

## 프로젝트
```c
OPERATE_RET tkl_ble_gap_rssi_get(uint16_t conn_handle);
```

- 기능 묘사:

마지막 연결 사건의 수신된 감도를 얻으십시오.

- 모수:

  |입력/출력|모수 이름|이름 *|
  | ------------ | -------------- | ----------------- |
  |[인]|사이트맵|연결 손잡이|

- 반환 값:

  - OPRT OK : RSSI는 성공적으로 읽었습니다.
  - 다른 사람: 유효한 표본 없음.

## tkl ble gap name set의 경우
```c
OPERATE_RET tkl_ble_gap_name_set(char *p_name);
```

- 기능 묘사:

Bluetooth용 GAP 장치 이름을 설정합니다.

- 모수:

  |입력/출력|모수 이름|이름 *|
  | ------------ | -------------- | -------------- |
  |[인]|p 이름|GAP 이름 문자열|

- 반환 값:

  - OPRT OK : 성공
  - 기타 : 실패

## tkl ble gatts service add에 대해
```c
OPERATE_RET tkl_ble_gatts_service_add(TKL_BLE_GATTS_PARAMS_T *p_service);
```

- 기능 묘사:

GATT는 서버에서 사용되는 서비스를 추가합니다.

- 모수:

  |입력/출력|모수 이름|이름 *|
  | ------------ | -------------- | ------------ |
  |[인/아웃]|p 서비스|GATT 서비스|

**TKL BLE GATTS PARAMS T **

  ```c
  typedef struct {
      uint8_t                     svc_num;                /**< If we only use service(0xFD50), the svc_num will be set into 1 */
      TKL_BLE_SERVICE_PARAMS_T    *p_service;
  } TKL_BLE_GATTS_PARAMS_T;
  ```

**TKL BLE SERVICE PARAMS T**

핸들은 기본적으로 0xFF로 발행되며, 해당 핸들 값은 서비스가 추가된 후 업데이트됩니다.

  ```c
  typedef struct {
      uint16_t                    handle;                 /**< After init the service, we will get the svc-handle */

      TKL_BLE_UUID_T              svc_uuid;               /**< Service UUID */
      TKL_BLE_SERVICE_TYPE_E      type;                   /**< Service Type */

      uint8_t                     char_num;               /**< Number of characteristic */
      TKL_BLE_CHAR_PARAMS_T       *p_char;                /**< Pointer of characteristic */
  } TKL_BLE_SERVICE_PARAMS_T;
  ```

- 반환 값:

  - OPRT OK : 성공
  - 기타 : 실패

## tkl ble gatts service change의 변경
```c
OPERATE_RET tkl_ble_gatts_service_change(uint16_t conn_handle, uint16_t start_handle, uint16_t end_handle);
```

- 기능 묘사:

구독한 동료에게 속성 할당의 변화를 나타냅니다. 옵션.

- 모수:

  |입력/출력|모수 이름|이름 *|
  | ------------ | -------------- | ---------------------------------------- |
  |[인]|사이트맵|연결 손잡이|
  |[인]|시작 handle|영향을받는 핸들 범위의 시작|
  |[인]|끝 handle|영향을받는 핸들 범위의 끝|

- 반환 값:

  - OPRT OK : 성공
  - 기타 : 실패

## tkl ble gatts value set의 값
```c
OPERATE_RET tkl_ble_gatts_value_set(uint16_t conn_handle, uint16_t char_handle, uint8_t *p_data, uint16_t length);
```

- 기능 묘사:

읽힌 특성의 구성과 같은 GATT 갱신 속성 값은, 이 기능을 업데이트하기 위하여 사용할 수 있습니다

- 모수:

  |입력/출력|모수 이름|이름 *|
  | ------------ | -------------- | --------------------- |
  |[인]|사이트맵|연결 손잡이|
  |[인]|사이트맵|특성 손잡이|
  |[인]|사이트맵|자료실|
  |[인]|제품정보|데이터 길이|

- 반환 값:

  - OPRT OK : 성공
  - 기타 : 실패

## 프로젝트
```c
OPERATE_RET tkl_ble_gatts_value_get(uint16_t conn_handle, uint16_t char_handle, uint8_t *p_data, uint16_t length);
```

- 기능 묘사:

GATT read 속성 값, 아직 사용되지 않음

- 모수:

  |입력/출력|모수 이름|이름 *|
  | ------------ | -------------- | --------------------- |
  |[인]|사이트맵|연결 손잡이|
  |[인]|사이트맵|특성 손잡이|
  |[아웃]|사이트맵|데이터 읽기|
  |[인]|제품정보|자세히보기|

- 반환 값:

  - OPRT OK : 성공
  - 기타 : 실패

## tkl ble gatts value notify에 대해
```c
OPERATE_RET tkl_ble_gatts_value_notify(uint16_t conn_handle, uint16_t char_handle, uint8_t *p_data, uint16_t length);
```

- 기능 묘사:

Server는 알림 데이터를 보냅니다.

- 모수:

  |입력/출력|모수 이름|이름 *|
  | ------------ | -------------- | ------------------------ |
  |[인]|사이트맵|연결 손잡이|
  |[인]|사이트맵|특성 손잡이|
  |[인]|사이트맵|공지사항|
  |[인]|제품정보|알림 데이터 길이|

- 반환 값:

  - OPRT OK : 성공
  - 기타 : 실패

## tkl ble gatts value indicate의 정의
```c
OPERATE_RET tkl_ble_gatts_value_indicate(uint16_t conn_handle, uint16_t char_handle, uint8_t *p_data, uint16_t length);
```

- 기능 묘사:

서버는 표시 자료를 보냅니다.

- 모수:

  |입력/출력|모수 이름|이름 *|
  | ------------ | -------------- | ---------------------- |
  |[인]|사이트맵|연결 손잡이|
  |[인]|사이트맵|특성 손잡이|
  |[인]|사이트맵|표시 데이터|
  |[인]|제품정보|표시 데이터 길이|

- 반환 값:

  - OPRT OK : 성공
  - 기타 : 실패

## tkl ble gatts exchange mtu reply의 경우
```c
OPERATE_RET tkl_ble_gatts_exchange_mtu_reply(uint16_t conn_handle, uint16_t server_rx_mtu);
```

- 기능 묘사:

서버는 MTU, 즉, 클라이언트의 MTU 교환 요청에 응답하여 클라이언트의 MTU 교환 요청에 응답합니다.

- 모수:

  |입력/출력|모수 이름|이름 *|
  | ------------ | -------------- | ---------------------------- |
  |[인]|사이트맵|연결 손잡이|
  |[인]|서버 rx mtu|서버 측은 MTU 크기를 받습니다|

- 반환 값:

  - OPRT OK : 성공
  - 기타 : 실패

## tkl ble gattc all service discovery에 대해
```c
OPERATE_RET tkl_ble_gattc_all_service_discovery(uint16_t conn_handle);
```

- 기능 묘사:

중앙으로, 동료의 모든 서비스를 발견.

- 모수:

  |입력/출력|모수 이름|이름 *|
  | ------------ | -------------- | ----------------- |
  |[인]|사이트맵|연결 손잡이|

- 반환 값:

  - OPRT OK : 성공
  - 기타 : 실패

## tkl ble gattc all char 디스커버리
```c
OPERATE_RET tkl_ble_gattc_all_char_discovery(uint16_t conn_handle, uint16_t start_handle, uint16_t end_handle);
```

- 기능 묘사:

중앙으로, 주어진 손잡이 범위에 있는 모든 특성을 발견하십시오.

- 모수:

  |입력/출력|모수 이름|이름 *|
  | ------------ | -------------- | --------------------- |
  |[인]|사이트맵|연결 손잡이|
  |[인]|시작 handle|시작 핸들|
  |[인]|끝 handle|끝 손잡이|

- 반환 값:

  - OPRT OK : 성공
  - 기타 : 실패

## tkl ble gattc char desc discovery에 대 한
```c
OPERATE_RET tkl_ble_gattc_char_desc_discovery(uint16_t conn_handle, uint16_t start_handle, uint16_t end_handle);
```

- 기능 묘사:

중앙으로, 주어진 손잡이 범위에 있는 특성의 모든 descriptors를 발견하십시오.

- 모수:

  |입력/출력|모수 이름|이름 *|
  | ------------ | -------------- | --------------------- |
  |[인]|사이트맵|연결 손잡이|
  |[인]|시작 handle|시작 핸들|
  |[인]|끝 handle|끝 손잡이|

- 반환 값:

  - OPRT OK : 성공
  - 기타 : 실패

## tkl ble gattc write without rsp의
```c
OPERATE_RET tkl_ble_gattc_write_without_rsp(uint16_t conn_handle, uint16_t char_handle, uint8_t *p_data, uint16_t length);
```

- 기능 묘사:

중앙으로, 응답없이 특성을 씁니다.

- 모수:

  |입력/출력|모수 이름|이름 *|
  | ------------ | -------------- | --------------------- |
  |[인]|사이트맵|연결 손잡이|
  |[인]|사이트맵|특성 손잡이|
  |[인]|사이트맵|데이터 쓰기|
  |[인]|제품정보|데이터 길이|

- 반환 값:

  - OPRT OK : 성공
  - 기타 : 실패

## tkl ble gattc 쓰기
```c
OPERATE_RET tkl_ble_gattc_write(uint16_t conn_handle, uint16_t char_handle, uint8_t *p_data, uint16_t length);
```

- 기능 묘사:

중앙으로, 응답을 가진 특성에 자료를 씁니다.

- 모수:

  |입력/출력|모수 이름|이름 *|
  | ------------ | -------------- | --------------------- |
  |[인]|사이트맵|연결 손잡이|
  |[인]|사이트맵|특성 손잡이|
  |[인]|사이트맵|데이터 쓰기|
  |[인]|제품정보|데이터 길이|

- 반환 값:

  - OPRT OK : 성공
  - 기타 : 실패

## tkl ble gattc 읽기
```c
OPERATE_RET tkl_ble_gattc_read(uint16_t conn_handle, uint16_t char_handle);
```

- 기능 묘사:

중앙으로, 특성의 가치를 읽으십시오.

- 모수:

  |입력/출력|모수 이름|이름 *|
  | ------------ | -------------- | --------------------- |
  |[인]|사이트맵|연결 손잡이|
  |[인]|사이트맵|특성 손잡이|

- 반환 값:

  - OPRT OK : 성공
  - 기타 : 실패

## tkl ble gattc exchange mtu request에 대해
```c
OPERATE_RET tkl_ble_gattc_exchange_mtu_request(uint16_t conn_handle, uint16_t client_rx_mtu);
```

- 기능 묘사:

Exchange MTU 요청을 서버에 전송하여 MTU 교환을 시작합니다.

- 모수:

  |입력/출력|모수 이름|이름 *|
  | ------------ | -------------- | --------------------- |
  |[인]|사이트맵|연결 손잡이|
  |[인]|클라이언트 rx mtu|클라이언트 측은 MTU 크기를 받습니다|

- 반환 값:

  - OPRT OK : 성공
  - 기타 : 실패

## tkl ble vendor command  통제
```c
OPERATE_RET tkl_ble_vendor_command_control(uint16_t opcode, void *user_data, uint16_t data_len);
```

- 기능 묘사:

Bluetooth에 대한 정보를 교환하는 공급업체별 명령을 실행합니다.

- 모수:

  |입력/출력|모수 이름|이름 *|
  | ------------ | -------------- | ------------------------ |
  |[인]|파일 형식|운영 opcode|
  |[인]|사용자 data|명령 데이터|
  |[인]|데이터 len|명령 데이터의 길이|

- 반환 값:

  - OPRT OK : 성공
  - 기타 : 실패

## tkl ble set mode의 정의
```c
OPERATE_RET tkl_ble_set_mode(const BOOL_T enable, const uint8_t mode);
```

- 기능 묘사:

Wi-Fi/BLE coexistence에서 사용되는 BLE 모드를 설정합니다.

- 모수:

  |입력/출력|모수 이름|이름 *|
  | ------------ | -------------- | ----------------------------- |
  |[인]|지원하다| `TRUE`모드를 활성화|
  |[인]|지원하다|BLE 모드|

- 반환 값:

  - OPRT OK : 성공
  - 기타 : 실패
