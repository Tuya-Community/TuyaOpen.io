---
title: tkl wakeup | 웨이크업 드라이버
description: "tkl wakeup reference — TuyaOpen Wake-up TKL API for setting/clearing GPIO, timer, RTC 알람 소스 for low-power Wake in Embedded IoT 개발."
keywords:
  - tkl_wakeup
  - tuyaopen wakeup driver
  - tkl wakeup api
  - low power wake
---

더 보기`tkl_wakeup`API는 저전력 상태에서 칩을 깨는 소스를 구성합니다. 웨이브 업 소스는 GPIO 가장자리 또는 레벨, 타이머, 또는 RTC 알람이 될 수 있습니다. 당신은 하나의 소스를 설명`TUYA_WAKEUP_SOURCE_BASE_CFG_T`그리고 그 근원을 놓거나 명확하게 그것을 통과하십시오. 두 함수 반환`OPRT_OK`성공 또는 오류 코드 정의`tuya_error_code.h`.

## tkl wakeup source set에
```c
OPERATE_RET tkl_wakeup_source_set(const TUYA_WAKEUP_SOURCE_BASE_CFG_T *param);
```

웨이크 업 소스를 활성화합니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `param` |내 계정|사용 가능한 Wake-up 소스. 이름 *`TUYA_WAKEUP_SOURCE_BASE_CFG_T`. |

기타 제품`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.

## tkl wakeup source clear의
```c
OPERATE_RET tkl_wakeup_source_clear(const TUYA_WAKEUP_SOURCE_BASE_CFG_T *param);
```

이전에 활성화 된 Wake-up 소스를 비활성화합니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `param` |내 계정|비활성화 할 수있는 Wake-up 소스. 이름 *`TUYA_WAKEUP_SOURCE_BASE_CFG_T`. |

기타 제품`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.

## 제품정보
### TUYA WAKEUP SOURCE BASE CFG T에 대해서
한 가지 모닝 소스를 설명합니다. 더 보기`source`필드는 회원의 선택`wakeup_para`조합은 적용합니다.

```c
typedef struct {
    TUYA_WAKEUP_SOURCE_E source;
    union {
        TUYA_WAKEUP_SOURCE_GPIO_T  gpio_param;
        TUYA_WAKEUP_SOURCE_TIMER_T timer_param;
        TUYA_WAKEUP_SOURCE_RTC_T   rtc_param;
    } wakeup_para;
} TUYA_WAKEUP_SOURCE_BASE_CFG_T;
```

### TUYA WAKEUP SOURCE E에
```c
typedef enum {
    TUYA_WAKEUP_SOURCE_GPIO,
    TUYA_WAKEUP_SOURCE_TIMER,
    TUYA_WAKEUP_SOURCE_RTC,
} TUYA_WAKEUP_SOURCE_E;
```

### TUYA WAKEUP SOURCE GPIO T에 대해서
```c
typedef struct {
    TUYA_GPIO_NUM_E       gpio_num;
    TUYA_GPIO_WAKE_TYPE_E level;
} TUYA_WAKEUP_SOURCE_GPIO_T;
```

|제품정보|이름 *|
| --- | --- |
| `gpio_num` |GPIO 핀을 트리거합니다.|
| `level` |방아쇠 상태. 이름 *`TUYA_GPIO_WAKE_TYPE_E`. |

`TUYA_GPIO_WAKE_TYPE_E`값은`TUYA_GPIO_WAKEUP_LOW`, `TUYA_GPIO_WAKEUP_HIGH`, `TUYA_GPIO_WAKEUP_RISE`·`TUYA_GPIO_WAKEUP_FALL`.

### TUYA WAKEUP SOURCE TIMER T에 대하여
```c
typedef struct {
    TUYA_TIMER_NUM_E  timer_num;
    TUYA_TIMER_MODE_E mode;
    uint32_t          ms;
} TUYA_WAKEUP_SOURCE_TIMER_T;
```

|제품정보|이름 *|
| --- | --- |
| `timer_num` |Timer 인스턴스를 사용합니다.|
| `mode` | `TUYA_TIMER_MODE_ONCE`또는`TUYA_TIMER_MODE_PERIOD`. |
| `ms` |밀리 초에 타임 아웃.|

### TUYA WAKEUP SOURCE RTC T에 대해서
```c
typedef struct {
    TUYA_RTC_NUM_E  RTC_num;
    TUYA_RTC_MODE_E mode;
    uint32_t        ms;
} TUYA_WAKEUP_SOURCE_RTC_T;
```

|제품정보|이름 *|
| --- | --- |
| `RTC_num` |RTC 인스턴스를 사용합니다.|
| `mode` | `TUYA_RTC_MODE_ONCE`또는`TUYA_RTC_MODE_PERIOD`. |
| `ms` |milliseconds의 알람 간격.|

## 이름 *
GPIO 12의 상승 가장자리에 칩을 모십시오:

```c
TUYA_WAKEUP_SOURCE_BASE_CFG_T cfg = {0};
cfg.source = TUYA_WAKEUP_SOURCE_GPIO;
cfg.wakeup_para.gpio_param.gpio_num = TUYA_GPIO_NUM_12;
cfg.wakeup_para.gpio_param.level = TUYA_GPIO_WAKEUP_RISE;

tkl_wakeup_source_set(&cfg);

// Later, to stop waking on this source:
tkl_wakeup_source_clear(&cfg);
```
