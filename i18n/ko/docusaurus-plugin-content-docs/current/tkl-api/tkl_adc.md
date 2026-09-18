---
title: "tkl adc | ADC 드라이버"
description: "tkl adc 참고 — TuyaOpen ADC 드라이버 TKL API for sampling 아날로그 전압, 읽기 원시 카운트, 밀리 볼트, 내장 된 IoT 개발의 칩 온도."
keywords:
  - tkl_adc
  - tuyaopen adc driver
  - tkl adc api
  - embedded adc driver
---

TKL ADC 공용영역은 아날로그에 디지털 방식으로 변환기로 그(것)들을 표본으로 아날로그 전압을 읽습니다. ADC 단위를 구성합니다 (`TUYA_ADC_NUM_E`) 수로 명부, 해결책 및 표본 추출 형태로, 그 후에 익지않는 조사를 읽고, 밀리볼트로 변환하고, 또는 칩 온도를 쿼리하십시오. 각 ADC 단위는 보통 bitmask를 통해 선택된 몇몇 수로를 노출합니다.

ADC는 샘플링, 보유, 정량화 및 인코딩을 통해 개별 디지털 샘플로 연속 아날로그 신호를 변환합니다. 중요한 재산은 해결책 (8, 10, 12, 또는 16 조금과 같은 비트 폭), 정확도, 변환 시간 및 measurable 범위를 놓는 참고 전압입니다.

## 프로젝트
```c
OPERATE_RET tkl_adc_init(TUYA_ADC_NUM_E port_num, TUYA_ADC_BASE_CFG_T *cfg);
```

주어진 수로 명부, 해결책 및 표본 추출 형태를 가진 ADC 단위를 초기화하십시오.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `port_num` | `TUYA_ADC_NUM_E` |ADC 단위 색인 (`TUYA_ADC_NUM_0`으로`TUYA_ADC_NUM_6`). 각 단위는 다수 수로에 1개의 육체적인 ADC, 보통입니다.|
| `cfg` | `TUYA_ADC_BASE_CFG_T *` |ADC 구성.|

구성 구조는:

```c
typedef struct {
    TUYA_AD_DA_CH_LIST_U ch_list;  // channel list
    uint8_t              ch_nums;  // number of channels to convert
    uint8_t              width;    // sampling resolution (bit width)
    uint32_t             freq;     // sampling frequency
    TUYA_ADC_TYPE_E      type;     // sampling type
    TUYA_ADC_MODE_E      mode;     // sampling mode
    uint16_t             conv_cnt; // number of samples
    uint32_t             ref_vol;  // reference voltage in mV (ignored if not supported)
} TUYA_ADC_BASE_CFG_T;
```

`ch_list`채널을 변환합니다. 개별 비트를 설정하거나 전체 단어를 할당 할 수 있습니다.`data`:

```c
typedef union {
    TUYA_AD_DA_CH_LIST_BIT_T bits;
    uint32_t                 data;
} TUYA_AD_DA_CH_LIST_U;

typedef struct {
    uint32_t ch_0  : 1;
    uint32_t ch_1  : 1;
    uint32_t ch_2  : 1;
    uint32_t ch_3  : 1;
    uint32_t ch_4  : 1;
    uint32_t ch_5  : 1;
    uint32_t ch_6  : 1;
    uint32_t ch_7  : 1;
    uint32_t ch_8  : 1;
    uint32_t ch_9  : 1;
    uint32_t ch_10 : 1;
    uint32_t ch_11 : 1;
    uint32_t ch_12 : 1;
    uint32_t ch_13 : 1;
    uint32_t ch_14 : 1;
    uint32_t ch_15 : 1;
    uint32_t rsv   : 16;
} TUYA_AD_DA_CH_LIST_BIT_T;
```

`ch_nums`채널의 수입니다`ch_list`변환하기.`type`샘플링 소스 선택:

|주요 특징|이름 *|
| --- | --- |
| `TUYA_ADC_INNER_SAMPLE_VOL` |내부 전압을 공급 전압과 같은 샘플|
| `TUYA_ADC_EXTERNAL_SAMPLE_VOL` |외부 전압을 핀 전압과 같은 샘플|

`mode`변환 모드 선택:

|주요 특징|이름 *|
| --- | --- |
| `TUYA_ADC_SINGLE` |단일 변환 — 한 번에 한 채널|
| `TUYA_ADC_CONTINUOUS` |연속 변환 - 한 채널의 설정 번호|
| `TUYA_ADC_SCAN` |스캔 모드 — 하나의 패스에서 채널의 그룹|

`conv_cnt`몇 가지 샘플 모드가 걸립니다.

**리턴 **`OPRT_OK`성공에. 다른 값의 경우,`OS_ADAPTER_ADC`이름 *`tuya_error_code.h`.

## 프로젝트
```c
OPERATE_RET tkl_adc_deinit(TUYA_ADC_NUM_E port_num);
```

ADC 단위를 분리하고 리소스를 공개합니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `port_num` | `TUYA_ADC_NUM_E` |ADC 단위 색인.|

**리턴 **`OPRT_OK`성공에. 다른 값의 경우,`OS_ADAPTER_ADC`이름 *`tuya_error_code.h`.

## tkl adc width get의
```c
uint8_t tkl_adc_width_get(TUYA_ADC_NUM_E port_num);
```

ADC 단위의 해결책 (bit 폭)를 읽으십시오.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `port_num` | `TUYA_ADC_NUM_E` |ADC 단위 색인.|

**리턴 ** 비트의 ADC 해상도.

## tkl adc ref voltage get에
```c
uint32_t tkl_adc_ref_voltage_get(TUYA_ADC_NUM_E port_num);
```

ADC 단위의 참고 전압을 읽으십시오.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `port_num` | `TUYA_ADC_NUM_E` |ADC 단위 색인.|

** 리턴 ** mV의 참조 전압.

## tkl adc temperature get의
```c
int32_t tkl_adc_temperature_get(void);
```

칩 온도를 읽으십시오.

**리턴 ** 섭씨 온도의 온도.

## tkl adc read data에 대해
```c
OPERATE_RET tkl_adc_read_data(TUYA_ADC_NUM_E port_num, int32_t *buff, uint16_t len);
```

ADC 레지스터의 원시 변환 데이터를 버퍼로 읽습니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `port_num` | `TUYA_ADC_NUM_E` |ADC 단위 색인.|
| `buff` | `int32_t *` |산출: 읽힌 자료를 위한 완충기.|
| `len` | `uint16_t` |완충기 길이.|

**리턴 **`OPRT_OK`성공에. 다른 값의 경우,`OS_ADAPTER_ADC`이름 *`tuya_error_code.h`.

## tkl adc read single channel에
```c
OPERATE_RET tkl_adc_read_single_channel(TUYA_ADC_NUM_E port_num, uint8_t ch_id, int32_t *data);
```

단일 채널의 변환 결과를 읽습니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `port_num` | `TUYA_ADC_NUM_E` |ADC 단위 색인.|
| `ch_id` | `uint8_t` |ADC 단위 내의 채널 인덱스.|
| `data` | `int32_t *` |산출: 변환 결과.|

**리턴 **`OPRT_OK`성공에. 다른 값의 경우,`OS_ADAPTER_ADC`이름 *`tuya_error_code.h`.

## tkl adc read voltage에 대 한
```c
OPERATE_RET tkl_adc_read_voltage(TUYA_ADC_NUM_E port_num, int32_t *buff, uint16_t len);
```

변환 데이터를 읽고 계산된 전압으로 반환합니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `port_num` | `TUYA_ADC_NUM_E` |ADC 단위 색인.|
| `buff` | `int32_t *` |산출: mV에서 전압을 위한 완충기.|
| `len` | `uint16_t` |완충기 길이.|

**리턴 **`OPRT_OK`성공에. 다른 값의 경우,`OS_ADAPTER_ADC`이름 *`tuya_error_code.h`.

## 이름 *
단일 채널 읽기 :

```c
void tuya_adc_single_channel_test(void)
{
    OPERATE_RET ret;
    TUYA_ADC_BASE_CFG_T adc_cfg;
    int32_t adc_value = 0;
    uint8_t channel = 0;

    adc_cfg.ch_list.data = 1; // or adc_cfg.ch_list.bits.ch_0 = 1;
    adc_cfg.ch_nums = 1;
    adc_cfg.type = TUYA_ADC_INNER_SAMPLE_VOL;
    adc_cfg.mode = TUYA_ADC_SINGLE;
    adc_cfg.width = 10;
    adc_cfg.conv_cnt = 1;

    ret = tkl_adc_init(TUYA_ADC_NUM_0, &adc_cfg);
    if (ret != OPRT_OK) {
        return;
    }

    ret = tkl_adc_read_single_channel(TUYA_ADC_NUM_0, channel, &adc_value);
    if (ret != OPRT_OK) {
        return;
    }

    // use adc_value

    tkl_adc_deinit(TUYA_ADC_NUM_0);
}
```

1개의 통행에 있는 다수 수로 검사:

```c
#define ADC_CHANNEL_NUM 3

void tuya_adc_multi_channel_test(void)
{
    OPERATE_RET ret;
    TUYA_ADC_BASE_CFG_T adc_cfg;
    int32_t adc_value[ADC_CHANNEL_NUM] = {0};

    adc_cfg.ch_list.bits.ch_0 = 1;
    adc_cfg.ch_list.bits.ch_1 = 1;
    adc_cfg.ch_list.bits.ch_2 = 1;
    adc_cfg.ch_nums = ADC_CHANNEL_NUM;
    adc_cfg.type = TUYA_ADC_INNER_SAMPLE_VOL;
    adc_cfg.mode = TUYA_ADC_SCAN;
    adc_cfg.width = 10;
    adc_cfg.conv_cnt = 1;

    ret = tkl_adc_init(TUYA_ADC_NUM_0, &adc_cfg);
    if (ret != OPRT_OK) {
        return;
    }

    ret = tkl_adc_read_data(TUYA_ADC_NUM_0, adc_value, ADC_CHANNEL_NUM);
    if (ret != OPRT_OK) {
        return;
    }

    // use adc_value[0..ADC_CHANNEL_NUM-1]

    tkl_adc_deinit(TUYA_ADC_NUM_0);
}
```

## 더 보기
- [ADC 주변 가이드](../peripheral/tutorials/adc-guide)
