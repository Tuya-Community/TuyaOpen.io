---
title: tkl flash | 플래시 드라이버
description: "tkl flash reference — TuyaOpen 플래시 드라이버 TKL API 읽기, 쓰기, 지우기, 잠금, 잠금 해제 및 내장된 IoT 개발에서 파티션 레이아웃 쿼리."
keywords:
  - tkl_flash
  - tuyaopen flash driver
  - tkl flash api
  - embedded flash driver
---

더 보기`tkl_flash`API는 on-chip 플래시 스토리지에 대한 커널 레이어 (TKL) 작업을 제공합니다. 읽기, 쓰기, 지우기, 잠금, 잠금 해제 및 파티션 지연 쿼리. 모든 기능 반환`OPRT_OK`성공 또는 오류 코드 정의`tuya_error_code.h`.

더 보기`tkl_flash.c`구현은 porting 도구에 의해 생성됩니다. 플랫폼 별 코드를 추가`BEGIN`이름 *`END`댓글 작성자 그래서 그것은 재생을 살아.

## tkl flash read에
```c
OPERATE_RET tkl_flash_read(uint32_t addr, uint8_t *dst, uint32_t size);
```

플래시에서 데이터를 읽습니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `addr` |내 계정|플래시 주소에서 읽기.|
| `dst` |내 계정|데이터를 수신하는 버퍼에 포인터.|
| `size` |내 계정|읽는 바이트의 수.|

기타 제품`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.

## tkl flash 쓰기
```c
OPERATE_RET tkl_flash_write(uint32_t addr, const uint8_t *src, uint32_t size);
```

Flash로 데이터를 작성합니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `addr` |내 계정|작성하는 플래시 주소.|
| `src` |내 계정|데이터를 작성하는 버퍼에 포인터.|
| `size` |내 계정|쓸 바이트 수.|

기타 제품`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.

:::note
쓰기 전에 대상 지역을 삭제합니다. 플래시 비트는 지우개에 의해만 명확할 수 있습니다, 그래서 지우지 않은 데이터에 쓰기 잘못된 결과.
:::

## tkl flash erase에 대하여
```c
OPERATE_RET tkl_flash_erase(uint32_t addr, uint32_t size);
```

플래시의 지역을 제거.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `addr` |내 계정|삭제할 플래시 주소.|
| `size` |내 계정|플래시 블록의 크기가 지우기.|

기타 제품`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.

## 프로젝트
```c
OPERATE_RET tkl_flash_lock(uint32_t addr, uint32_t size);
```

쓰기와 지우기에 대한 플래시의 지역을 잠금.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `addr` |내 계정|잠금에 지역의 주소를 시작합니다.|
| `size` |내 계정|자물쇠에 지역의 크기.|

기타 제품`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.

## 프로젝트
```c
OPERATE_RET tkl_flash_unlock(uint32_t addr, uint32_t size);
```

Flash의 이전에 잠긴 지역을 자물쇠로 엽니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `addr` |내 계정|잠금 해제 지역의 주소를 시작합니다.|
| `size` |내 계정|자물쇠로 여는 지역의 크기.|

기타 제품`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.

## tkl flash get one type info에 대해
```c
OPERATE_RET tkl_flash_get_one_type_info(TUYA_FLASH_TYPE_E type, TUYA_FLASH_BASE_INFO_T *info);
```

주어진 플래시 유형의 파티션 레이아웃을 쿼리합니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `type` |내 계정|쿼리에 플래시 유형. 이름 *`TUYA_FLASH_TYPE_E`. |
| `info` |내 계정|포인터`TUYA_FLASH_BASE_INFO_T`파티션 레이아웃을받습니다.|

기타 제품`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.

### TUYA FLASH TYPE E의 특징
쿼리에 논리 저장 영역을 식별합니다. 선택된 값:

|회사 소개|이름 *|
| --- | --- |
| `TUYA_FLASH_TYPE_BTL0` |부트 로더 지역 0.|
| `TUYA_FLASH_TYPE_BTL1` |Bootloader 지역 1.|
| `TUYA_FLASH_TYPE_APP` |신청 굳힌모 지역.|
| `TUYA_FLASH_TYPE_OTA` |OTA 다운로드 영역.|
| `TUYA_FLASH_TYPE_KV_DATA` |Key-value 데이터 영역.|
| `TUYA_FLASH_TYPE_UF` |사용자 파일 영역.|
| `TUYA_FLASH_TYPE_ALL` |모든 파티션.|

이름 *`tuya_cloud_types.h`전체 열렬한.

### TUYA FLASH BASE INFO T의 특징
```c
typedef struct {
    uint32_t block_size;
    uint32_t start_addr;
    uint32_t size;
} TUYA_FLASH_PARTITION_T;

typedef struct {
    uint32_t partition_num;
    TUYA_FLASH_PARTITION_T partition[TUYA_FLASH_TYPE_MAX_PARTITION_NUM];
} TUYA_FLASH_BASE_INFO_T;
```

|제품정보|이름 *|
| --- | --- |
| `partition_num` |유효한 항목의 수`partition`. |
| `partition` |분할 descriptors의 배열, 각 보유`block_size`, `start_addr`·`size`. |
