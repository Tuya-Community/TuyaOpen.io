---
title: "tkl dac | DAC 드라이버"
description: "tkl dac 참고 — TuyaOpen DAC 드라이버 TKL API는 FIFO 및 임베디드 IoT 개발 채널을 통해 아날로그 출력으로 디지털 값을 변환합니다."
keywords:
  - tkl_dac
  - tuyaopen dac driver
  - tkl dac api
  - embedded dac driver
---

TKL DAC 공용영역은 아날로그 산출 전압으로 디지털 방식으로 가치를 개조합니다 — ADC의 반전. 당신은 DAC 단위를 초기화 (`TUYA_DAC_NUM_E`), 그것의 수로 및 산출 폭을 구성하고, 그 후에 FIFO를 통해서 표본 자료를 밀고 변환을 시작합니다. 일반적인 사용은 이전에 ADC에 의해 캡처 된 오디오 파형을 복원합니다.

## 프로젝트
```c
OPERATE_RET tkl_dac_init(TUYA_DAC_NUM_E port_num);
```

DAC 단위를 초기화합니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `port_num` | `TUYA_DAC_NUM_E` |DAC 단위 색인 (`TUYA_DAC_NUM_0`으로`TUYA_DAC_NUM_6`). |

**리턴 **`OPRT_OK`성공에. 다른 값의 경우 정의를 참조하십시오.`tuya_error_code.h`.

## 프로젝트
```c
OPERATE_RET tkl_dac_deinit(TUYA_DAC_NUM_E port_num);
```

DAC 단위를 분리하고 변환을 중지합니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `port_num` | `TUYA_DAC_NUM_E` |DAC 단위 색인.|

**리턴 **`OPRT_OK`성공에. 다른 값의 경우 정의를 참조하십시오.`tuya_error_code.h`.

## tkl dac controller config 설정
```c
OPERATE_RET tkl_dac_controller_config(TUYA_DAC_NUM_E port_num, TUYA_DAC_CMD_E cmd, void *argu);
```

명령으로 DAC 단위를 구성합니다. 기본 구성을 설정하거나 FIFO로 데이터를 작성합니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `port_num` | `TUYA_DAC_NUM_E` |DAC 단위 색인.|
| `cmd` | `TUYA_DAC_CMD_E` |명령 단어 (아래 참조).|
| `argu` | `void *` |명령의 집합.|

`cmd`작업 선택 및`argu`일치하는 구조에 점:

|이름 *|이름 *| `argu`제품정보|
| --- | --- | --- |
| `TUYA_DAC_WRITE_FIFO` |DAC FIFO로 데이터 쓰기| `TUYA_DAC_DATA_T *` |
| `TUYA_DAC_SET_BASE_CFG` |DAC 기본 설정 설정| `TUYA_DAC_BASE_CFG_T *` |

```c
typedef struct {
    uint8_t *data; // data buffer
    uint32_t len;  // data length
} TUYA_DAC_DATA_T;

typedef struct {
    TUYA_AD_DA_CH_LIST_U ch_list; // channel list
    uint8_t              ch_nums; // channel number
    uint8_t              width;   // output width
    uint32_t             freq;    // conversion frequency
} TUYA_DAC_BASE_CFG_T;
```

**리턴 **`OPRT_OK`성공에. 다른 값의 경우 정의를 참조하십시오.`tuya_error_code.h`.

## tkl dac base cfg get에
```c
OPERATE_RET tkl_dac_base_cfg_get(TUYA_DAC_NUM_E port_num, TUYA_DAC_BASE_CFG_T *cfg);
```

DAC 단위의 기본 구성을 읽으십시오.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `port_num` | `TUYA_DAC_NUM_E` |DAC 단위 색인.|
| `cfg` | `TUYA_DAC_BASE_CFG_T *` |산출: 기본적인 윤곽.|

구성 구조는:

```c
typedef struct {
    TUYA_AD_DA_CH_LIST_U ch_list; // channel list
    uint8_t              ch_nums; // channel number
    uint8_t              width;   // output width
    uint32_t             freq;    // conversion frequency
} TUYA_DAC_BASE_CFG_T;
```

**리턴 **`OPRT_OK`성공에. 다른 값의 경우 정의를 참조하십시오.`tuya_error_code.h`.

## tkl dac 스타트
```c
OPERATE_RET tkl_dac_start(TUYA_DAC_NUM_E port_num);
```

DAC 단위로 변환을 시작합니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `port_num` | `TUYA_DAC_NUM_E` |DAC 단위 색인.|

**리턴 **`OPRT_OK`성공에. 다른 값의 경우 정의를 참조하십시오.`tuya_error_code.h`.

## tkl dac 스톱
```c
OPERATE_RET tkl_dac_stop(TUYA_DAC_NUM_E port_num);
```

DAC 단위로 변환을 중지합니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `port_num` | `TUYA_DAC_NUM_E` |DAC 단위 색인.|

**리턴 **`OPRT_OK`성공에. 다른 값의 경우 정의를 참조하십시오.`tuya_error_code.h`.

## tkl dac fifo reset의 경우
```c
OPERATE_RET tkl_dac_fifo_reset(TUYA_DAC_NUM_E port_num);
```

DAC 단위의 FIFO를 재설정합니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `port_num` | `TUYA_DAC_NUM_E` |DAC 단위 색인.|

**리턴 **`OPRT_OK`성공에. 다른 값의 경우 정의를 참조하십시오.`tuya_error_code.h`.

## 이름 *
DAC 단위를 초기화, 기본 구성을 설정, 다음 FIFO를 통해 데이터를 스트림:

```c
// Initialize DAC unit 0
tkl_dac_init(TUYA_DAC_NUM_0);

// Set the base configuration
TUYA_DAC_BASE_CFG_T dac_base_cfg;
dac_base_cfg.freq = 8000;          // 8000 conversions per second
dac_base_cfg.width = 16;           // 16-bit output
dac_base_cfg.ch_nums = 1;          // single channel
dac_base_cfg.ch_list.bits.ch_2 = 1;
tkl_dac_controller_config(TUYA_DAC_NUM_0, TUYA_DAC_SET_BASE_CFG, &dac_base_cfg);

// Write the initial data into the FIFO
TUYA_DAC_DATA_T data_fifo;
uint8_t dac_data[1024];
data_fifo.len = sizeof(dac_data);
data_fifo.data = dac_data;
tkl_dac_controller_config(TUYA_DAC_NUM_0, TUYA_DAC_WRITE_FIFO, &data_fifo);

// Start conversion
tkl_dac_start(TUYA_DAC_NUM_0);

// Keep feeding data into the FIFO
while (1) {
    data_fifo.len = sizeof(dac_data);
    data_fifo.data = dac_data;
    tkl_dac_controller_config(TUYA_DAC_NUM_0, TUYA_DAC_WRITE_FIFO, &data_fifo);
}

// Stop and deinitialize
tkl_dac_stop(TUYA_DAC_NUM_0);
tkl_dac_deinit(TUYA_DAC_NUM_0);
```
