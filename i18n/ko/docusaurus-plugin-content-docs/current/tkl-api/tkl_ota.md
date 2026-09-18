---
title: tkl ota | OTA 펌웨어 업데이트
description: "tkl ota 참고 — TuyaOpen OTA 펌웨어 업데이트 TKL API 기능 쿼리, 시작/처리/엔드 및 내장된 IoT 개발의 이전 확인 정보."
keywords:
  - tkl_ota
  - tuyaopen ota driver
  - tkl ota api
  - firmware update
---

더 보기`tkl_ota`API는 커널 레이어(TKL) 후크를 over-the-air(OTA) 펌웨어 업데이트를 제공합니다. 업데이트는 단계에서 실행합니다: 장치 OTA 기능, 신호 시작, 프로세스 각 데이터 패킷, 그리고 신호 끝. 별도의 호출은 이전의 펌웨어의 정보를 검색합니다. 모든 기능 반환`OPRT_OK`성공 또는 오류 코드 정의`tuya_error_code.h`.

더 보기`tkl_ota.c`구현은 porting 도구에 의해 생성됩니다. 사용자 정의 영역에서 플랫폼 별 코드를 추가하므로 재생을 생존합니다.

## tkl ota get ability에 대해
```c
OPERATE_RET tkl_ota_get_ability(uint32_t *image_size, TUYA_OTA_TYPE_E *type);
```

장치의 OTA 기능 : 최대 펌웨어 이미지 크기를 수신하고 OTA 유형이 지원됩니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `image_size` |내 계정|최대 펌웨어 이미지 크기 장치 허용.|
| `type` |내 계정|지원되는 OTA 유형. 이름 *`TUYA_OTA_TYPE_E`. |

기타 제품`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.

## tkl ota start notify에 대해
```c
OPERATE_RET tkl_ota_start_notify(uint32_t image_size, TUYA_OTA_TYPE_E type, TUYA_OTA_PATH_E path);
```

OTA 업데이트가 시작되는 플랫폼이 아닙니다. 구현은 전송에 필요한 변수와 상태를 초기화합니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `image_size` |내 계정|펌웨어 이미지의 크기가 작성되었습니다.|
| `type` |내 계정|OTA 유형. 이름 *`TUYA_OTA_TYPE_E`. |
| `path` |내 계정|전송 채널 데이터가 도착합니다. 이름 *`TUYA_OTA_PATH_E`. |

기타 제품`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.

## tkl ota data process의 경우
```c
OPERATE_RET tkl_ota_data_process(TUYA_OTA_DATA_T *pack, uint32_t *remain_len);
```

1개의 수신된 OTA 데이터 패킷을 처리하여 페이로드를 Flash로 작성합니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `pack` |내 계정|OTA 데이터 패킷에 포인터. 이름 *`TUYA_OTA_DATA_T`. |
| `remain_len` |내 계정|아직 처리되지 않은 패킷의 바이트 수.|

기타 제품`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.

## tkl ota end notify에 대한 의견
```c
OPERATE_RET tkl_ota_end_notify(BOOL_T reset);
```

OTA 전송이 종료된 플랫폼이 아닙니다. 구현은 수신된 이미지를 검증하고 어떤 포스트 처리, 선택적으로 장치를 재설정합니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `reset` |내 계정|업데이트가 완료된 후 장치를 재설정 할 수 있습니다.|

기타 제품`OPRT_OK`성공에. 인증이 실패하거나 다른 오류가 발생하면 오류 코드가 반환됩니다.`tuya_error_code.h`.

## tkl ota get old firmware info에 대해
```c
OPERATE_RET tkl_ota_get_old_firmware_info(TUYA_OTA_FIRMWARE_INFO_T **info);
```

현재 펌웨어에 대한 정보를 가져옵니다. 이것은 휴식 지점에서 중단 된 전송을 재개하는 데 사용됩니다.

:::note
이 API는 BLE sub-devices에서만 사용됩니다.
:::

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `info` |내 계정|펌웨어 정보 구조에 대한 포인터를 수신합니다. 이름 *`TUYA_OTA_FIRMWARE_INFO_T`. |

기타 제품`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.

## 제품정보
### TUYA OTA TYPE E의 특징
OTA 패키지 유형.

```c
typedef enum {
    TUYA_OTA_FULL = 1, ///< AB area switch, full package upgrade
    TUYA_OTA_DIFF = 2, ///< fixed area, difference package upgrade
} TUYA_OTA_TYPE_E;
```

### TUYA OTA PATH E에
전송 채널 OTA 데이터에 도착합니다.

```c
typedef enum {
    TUYA_OTA_PATH_AIR     = 0,   ///< OTA from Wired/Wi-Fi/Cellular/NBIoT
    TUYA_OTA_PATH_UART    = 1,   ///< OTA from uart for MF
    TUYA_OTA_PATH_BLE     = 2,   ///< OTA from BLE protocol for subdev
    TUYA_OTA_PATH_ZIGBEE  = 3,   ///< OTA from Zigbee protocol for subdev
    TUYA_OTA_PATH_SEC_A   = 4,   ///< OTA from multi-section A
    TUYA_OTA_PATH_SEC_B   = 5,   ///< OTA from multi-section B
    TUYA_OTA_PATH_INVALID = 255  ///< OTA from multi-section invalid
} TUYA_OTA_PATH_E;
```

### TUYA OTA DATA T 정보
1 OTA 패킷. 구현은 Flash로 payload를 작성합니다.`start_addr + offset`.

```c
typedef struct {
    uint32_t total_len;  ///< ota image total len
    uint32_t start_addr; ///< ota flash start addr
    uint32_t offset;     ///< ota image offset
    uint8_t *data;       ///< ota data
    uint32_t len;        ///< ota data len
    void    *pri_data;   ///< private pointer
} TUYA_OTA_DATA_T;
```

### TUYA OTA FIRMWARE INFO T에 대하여
펌웨어 이미지를 설명합니다.

```c
typedef struct {
    uint32_t len;
    uint32_t crc32;
    uint8_t  md5[TUYA_OTA_FILE_MD5_LEN];
} TUYA_OTA_FIRMWARE_INFO_T;
```

`TUYA_OTA_FILE_MD5_LEN`이름 *`16`.
