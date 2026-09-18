---
title: "tkl pwm | PWM 드라이버"
description: "tkl pwm 참고 - 극성, 의무주기, 주파수, 시작 / 정지 및 입력 캡처 펄스 타이밍을위한 TuyaOpen PWM 드라이버 TKL API."
keywords:
  - tkl_pwm
  - tuyaopen pwm driver
  - tkl pwm api
  - embedded pwm driver
---

TKL PWM 공용영역은 하드웨어 수로에 맥박 폭 산출한 신호를 생성하고 입력 붙잡음을 통해서 맥박 타이밍 뒤를 읽습니다. 수로의 극성, 의무 주기 및 빈도를 구성하고, 그 후에 시작, 조정하고, 또는 런타임에 산출을 멈추십시오. 채널에 의해 주소`TUYA_PWM_NUM_E`, 시작`TUYA_PWM_NUM_0`.

PWM 신호는 높은 시간의 비율로 아날로그 가치를 ( 의무 주기) 암호로 합니다. 예를 들어, 10 ms 기간과 함께, 7 ms 높은 시간은 70% 듀티 사이클이며 4 ms 높은 시간은 40 % 듀티 사이클입니다. 의무 주기 조정은 효과적인 아날로그 산출을 변화합니다.

## 프로젝트
```c
OPERATE_RET tkl_pwm_init(TUYA_PWM_NUM_E ch_id, const TUYA_PWM_BASE_CFG_T *cfg);
```

주어진 극성, 의무 주기 및 빈도를 가진 PWM 수로를 초기화하십시오.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `ch_id` | `TUYA_PWM_NUM_E` |PWM 채널 인덱스, 시작`TUYA_PWM_NUM_0`. |
| `cfg` | `const TUYA_PWM_BASE_CFG_T *` |채널 구성.|

구성 구조는:

```c
typedef struct {
    TUYA_PWM_POLARITY_E polarity;
    TUYA_PWM_COUNT_E    count_mode;
    // pulse duty cycle = duty / cycle; e.g. duty = 5000, cycle = 10000 -> 50%
    uint32_t            duty;
    uint32_t            cycle;
    uint32_t            frequency; // Hz
} TUYA_PWM_BASE_CFG_T;
```

`polarity`활성 수준 선택:

|주요 특징|이름 *|
| --- | --- |
| `TUYA_PWM_NEGATIVE` |낮은 수준 산출|
| `TUYA_PWM_POSITIVE` |높은 수준의 출력|

`count_mode`카운터 모드 선택:

|주요 특징|이름 *|
| --- | --- |
| `TUYA_PWM_CNT_UP` |계산 (과태)|
| `TUYA_PWM_CNT_UP_AND_DOWN` |Up-and-down 계산, 보완 이중 모드|

`duty`이름 *`cycle`의무 비율을 것과 같이 놓으십시오`duty / cycle`. `frequency`Hz에서 출력 주파수입니다.

**리턴 **`OPRT_OK`성공에. 다른 값의 경우, 참조`tuya_error_code.h`.

## 프로젝트
```c
OPERATE_RET tkl_pwm_deinit(TUYA_PWM_NUM_E ch_id);
```

PWM 채널을 분리합니다. 지속적인 출력을 중지하고 채널의 소프트웨어 및 하드웨어 리소스를 릴리스합니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `ch_id` | `TUYA_PWM_NUM_E` |PWM 수로 색인.|

**리턴 **`OPRT_OK`성공에. 다른 값의 경우, 참조`tuya_error_code.h`.

## tkl pwm 스타트
```c
OPERATE_RET tkl_pwm_start(TUYA_PWM_NUM_E ch_id);
```

PWM 채널에서 출력을 시작합니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `ch_id` | `TUYA_PWM_NUM_E` |PWM 수로 색인.|

**리턴 **`OPRT_OK`성공에. 다른 값의 경우, 참조`tuya_error_code.h`.

## tkl pwm 스톱
```c
OPERATE_RET tkl_pwm_stop(TUYA_PWM_NUM_E ch_id);
```

PWM 채널에 출력을 중지합니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `ch_id` | `TUYA_PWM_NUM_E` |PWM 수로 색인.|

**리턴 **`OPRT_OK`성공에. 다른 값의 경우, 참조`tuya_error_code.h`.

## tkl pwm multichannel start의
```c
OPERATE_RET tkl_pwm_multichannel_start(TUYA_PWM_NUM_E *ch_id, uint8_t num);
```

동기화된 결합된 산출을 위해 몇몇 PWM 수로를, 엄격한 타이밍 필요조건을 가진 케이스를 위해 시작하십시오.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `ch_id` | `TUYA_PWM_NUM_E *` |시작하려면 채널 인덱스의 배열.|
| `num` | `uint8_t` |배열의 수로.|

**리턴 **`OPRT_OK`성공에. 다른 값의 경우, 참조`tuya_error_code.h`.

## tkl pwm multichannel stop에
```c
OPERATE_RET tkl_pwm_multichannel_stop(TUYA_PWM_NUM_E *ch_id, uint8_t num);
```

몇몇 PWM 수로를 함께 멈추십시오.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `ch_id` | `TUYA_PWM_NUM_E *` |채널 인덱스의 배열을 중지합니다.|
| `num` | `uint8_t` |배열의 수로.|

**리턴 **`OPRT_OK`성공에. 다른 값의 경우, 참조`tuya_error_code.h`.

## 프로젝트
```c
OPERATE_RET tkl_pwm_duty_set(TUYA_PWM_NUM_E ch_id, uint32_t duty);
```

채널의 의무 주기를 설정합니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `ch_id` | `TUYA_PWM_NUM_E` |PWM 수로 색인.|
| `duty` | `uint32_t` |의무 주기, 사용`duty / cycle`. |

**리턴 **`OPRT_OK`성공에. 다른 값의 경우, 참조`tuya_error_code.h`.

## tkl pwm frequency set에
```c
OPERATE_RET tkl_pwm_frequency_set(TUYA_PWM_NUM_E ch_id, uint32_t frequency);
```

채널의 출력 주파수를 설정합니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `ch_id` | `TUYA_PWM_NUM_E` |PWM 수로 색인.|
| `frequency` | `uint32_t` |Hz에서 출력 주파수.|

**리턴 **`OPRT_OK`성공에. 다른 값의 경우, 참조`tuya_error_code.h`.

## tkl pwm polarity set의 경우
```c
OPERATE_RET tkl_pwm_polarity_set(TUYA_PWM_NUM_E ch_id, TUYA_PWM_POLARITY_E polarity);
```

채널의 출력 극성을 설정합니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `ch_id` | `TUYA_PWM_NUM_E` |PWM 수로 색인.|
| `polarity` | `TUYA_PWM_POLARITY_E` | `TUYA_PWM_NEGATIVE`또는`TUYA_PWM_POSITIVE`. |

**리턴 **`OPRT_OK`성공에. 다른 값의 경우, 참조`tuya_error_code.h`.

## tkl pwm info set의 설정
```c
OPERATE_RET tkl_pwm_info_set(TUYA_PWM_NUM_E ch_id, const TUYA_PWM_BASE_CFG_T *info);
```

채널의 전체 구성을 대체, 그래서 당신은 극성, 의무 주기를 변경할 수 있습니다, 런타임에 주파수 및 채널을 다시 시작.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `ch_id` | `TUYA_PWM_NUM_E` |PWM 수로 색인.|
| `info` | `const TUYA_PWM_BASE_CFG_T *` |새로운 채널 구성 (see)`tkl_pwm_init`). |

**리턴 **`OPRT_OK`성공에. 다른 값의 경우, 참조`tuya_error_code.h`.

## tkl pwm info get의 경우
```c
OPERATE_RET tkl_pwm_info_get(TUYA_PWM_NUM_E ch_id, TUYA_PWM_BASE_CFG_T *info);
```

채널의 현재 구성을 읽습니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `ch_id` | `TUYA_PWM_NUM_E` |PWM 수로 색인.|
| `info` | `TUYA_PWM_BASE_CFG_T *` |산출: 수로 윤곽.|

**리턴 **`OPRT_OK`성공에. 다른 값의 경우, 참조`tuya_error_code.h`.

## tkl pwm cap 스타트
```c
OPERATE_RET tkl_pwm_cap_start(TUYA_PWM_NUM_E ch_id, const TUYA_PWM_CAP_IRQ_T *cfg);
```

채널에 PWM 입력 캡처 모드를 시작, 입력 신호에 펄스 타이밍 측정.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `ch_id` | `TUYA_PWM_NUM_E` |PWM 수로 색인.|
| `cfg` | `const TUYA_PWM_CAP_IRQ_T *` |캡처 구성.|

캡처 구성 구조는:

```c
typedef struct {
    TUYA_PWM_CAPTURE_MODE_E cap_mode;      // capture mode
    TUYA_PWM_POLARITY_E     trigger_level; // trigger edge
    uint32_t                clk;           // sampling rate of the capture signal
    TUYA_PWM_IRQ_CB         cb;            // capture callback
    void                   *arg;           // argument passed to the callback
} TUYA_PWM_CAP_IRQ_T;
```

`cap_mode`캡처 모드 선택:

|주요 특징|이름 *|
| --- | --- |
| `TUYA_PWM_CAPTURE_MODE_ONCE` |단일 트리거|
| `TUYA_PWM_CAPTURE_MODE_PERIOD` |공급 업체|

`trigger_level`트리거 가장자리를 선택합니다:

|주요 특징|이름 *|
| --- | --- |
| `TUYA_PWM_NEGATIVE` |연락처|
| `TUYA_PWM_POSITIVE` |연락처|

`clk`캡처된 신호를 위한 샘플링 시계입니다.`cb`캡처 콜백이며,`arg`그것을 통과:

```c
typedef void (*TUYA_PWM_IRQ_CB)(TUYA_PWM_NUM_E port, TUYA_PWM_CAPTURE_DATA_T data, void *arg);

typedef struct {
    uint32_t            cap_value; // captured data
    TUYA_PWM_POLARITY_E cap_edge;  // capture edge: TUYA_PWM_NEGATIVE = falling, TUYA_PWM_POSITIVE = rising
} TUYA_PWM_CAPTURE_DATA_T;
```

**리턴 **`OPRT_OK`성공에. 다른 값의 경우, 참조`tuya_error_code.h`.

## tkl pwm cap 스톱
```c
OPERATE_RET tkl_pwm_cap_stop(TUYA_PWM_NUM_E ch_id);
```

채널에서 PWM 입력 캡처 모드를 중지합니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `ch_id` | `TUYA_PWM_NUM_E` |PWM 수로 색인.|

**리턴 **`OPRT_OK`성공에. 다른 값의 경우, 참조`tuya_error_code.h`.

## 이름 *
50% 의무 주기 산출을 시작하십시오, 런타임에 의무 주기를 조정하고, 그 때 정지하고 수로를 deinitialize:

```c
void tuya_pwm_test(void)
{
    OPERATE_RET ret;
    TUYA_PWM_BASE_CFG_T cfg = {
        .polarity = TUYA_PWM_POSITIVE,
        .duty = 1000,
        .cycle = 10000,
        .frequency = 1000,
    };

    ret = tkl_pwm_init(TUYA_PWM_NUM_0, &cfg);
    if (ret != OPRT_OK) {
        return;
    }

    ret = tkl_pwm_start(TUYA_PWM_NUM_0);
    if (ret != OPRT_OK) {
        return;
    }
    tkl_system_delay(5000);

    ret = tkl_pwm_info_get(TUYA_PWM_NUM_0, &cfg);
    if (ret != OPRT_OK) {
        return;
    }
    if (cfg.duty != 5000) {
        cfg.duty = 5000;
    }
    ret = tkl_pwm_info_set(TUYA_PWM_NUM_0, &cfg);
    tkl_system_delay(5000);

    ret = tkl_pwm_stop(TUYA_PWM_NUM_0);
    if (ret != OPRT_OK) {
        return;
    }
    ret = tkl_pwm_deinit(TUYA_PWM_NUM_0);
    if (ret != OPRT_OK) {
        return;
    }
}
```
