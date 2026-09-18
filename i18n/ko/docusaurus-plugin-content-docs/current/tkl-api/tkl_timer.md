---
title: "tkl timer | 하드웨어 타이머"
description: "tkl timer reference — TuyaOpen 하드웨어 타이머 TKL API는 임베디드 IoT 개발에서 한 번 / 기간 모드 및 마이크로 초 간격으로 구동되는 중단 타이밍을 위해."
keywords:
  - tkl_timer
  - tuyaopen timer driver
  - tkl hardware timer api
  - embedded timer driver
---

더 보기`tkl_timer`공용영역은 정확한, 중단 몬 타이밍을 위한 on-chip 기계설비 타이머를 몰습니다. 계산 모드와 중단 서비스 콜백을 가진 타이머를 구성하고, microsecond 간격으로 시작하고, 형성된 간격 또는 현재 조사를 다시 읽으십시오. 커널 요약 레이어 (TKL) 포트는 각 플랫폼이 구현됩니다.

## 제품정보
타이머 선택`TUYA_TIMER_NUM_E`설정하기`TUYA_TIMER_BASE_CFG_T`:

```c
typedef enum {
    TUYA_TIMER_NUM_0,
    TUYA_TIMER_NUM_1,
    TUYA_TIMER_NUM_2,
    TUYA_TIMER_NUM_3,
    TUYA_TIMER_NUM_4,
    TUYA_TIMER_NUM_5,
    TUYA_TIMER_NUM_MAX,
} TUYA_TIMER_NUM_E;

typedef enum {
    TUYA_TIMER_MODE_ONCE = 0,
    TUYA_TIMER_MODE_PERIOD,
} TUYA_TIMER_MODE_E;

typedef void (*TUYA_TIMER_ISR_CB)(void *args);

typedef struct {
    TUYA_TIMER_MODE_E mode;  // counting mode
    TUYA_TIMER_ISR_CB cb;    // interrupt service callback
    void             *args;  // argument passed to the callback
} TUYA_TIMER_BASE_CFG_T;
```

`TUYA_TIMER_MODE_E`값:

|주요 특징|이름 *|
| --- | --- |
| `TUYA_TIMER_MODE_ONCE` |원샷 타이머; 한번 불기.|
| `TUYA_TIMER_MODE_PERIOD` |정기적인 타이머; 반복적으로 불.|

:::warning
`cb`중단 상황에 실행. 짧게 유지하고 API를 차단하지 마십시오.
:::

## 프로젝트
```c
OPERATE_RET tkl_timer_init(TUYA_TIMER_NUM_E timer_id, TUYA_TIMER_BASE_CFG_T *cfg);
```

지정된 타이머를 지정합니다.

|제품 설명|이름 *|
| --- | --- |
| `timer_id` |타이머 ID.|
| `cfg` |기본 구성: 계산 모드, 콜백, 콜백 인수.|

- 반환 값:`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.

## 프로젝트
```c
OPERATE_RET tkl_timer_deinit(TUYA_TIMER_NUM_E timer_id);
```

타이머를 분리합니다. 소프트웨어 및 하드웨어 리소스를 중지합니다.

|제품 설명|이름 *|
| --- | --- |
| `timer_id` |타이머 ID.|

- 반환 값:`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.

## tkl timer 스타트
```c
OPERATE_RET tkl_timer_start(TUYA_TIMER_NUM_E timer_id, uint32_t us);
```

주어진 간격으로 타이머를 시작합니다.

|제품 설명|이름 *|
| --- | --- |
| `timer_id` |타이머 ID.|
| `us` |microseconds에서 타이밍 간격.|

- 반환 값:`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.

## tkl timer 스톱
```c
OPERATE_RET tkl_timer_stop(TUYA_TIMER_NUM_E timer_id);
```

타이머를 중지합니다.

|제품 설명|이름 *|
| --- | --- |
| `timer_id` |타이머 ID.|

- 반환 값:`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.

## 프로젝트
```c
OPERATE_RET tkl_timer_get(TUYA_TIMER_NUM_E timer_id, uint32_t *us);
```

타이머의 구성 간격을 가져옵니다.

|제품 설명|이름 *|
| --- | --- |
| `timer_id` |타이머 ID.|
| `us` |산출 모수. microseconds의 간격을, 일치하여 놓는 가치`tkl_timer_start`. |

- 반환 값:`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.

## tkl timer get current value의 값
```c
OPERATE_RET tkl_timer_get_current_value(TUYA_TIMER_NUM_E timer_id, uint32_t *us);
```

타이머의 현재 카운트 값을 가져옵니다.

|제품 설명|이름 *|
| --- | --- |
| `timer_id` |타이머 ID.|
| `us` |산출 모수. microseconds에서 현재 카운트 값을 수신합니다.|

- 반환 값:`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.

## 이름 *
주기적인 타이머를 구성하고, 그것을 실행하고, 그 간격과 현재 조사를 읽고, 그 후에 그것을 deinitialize:

```c
static void tkl_timer_isr_cb_fun(void *args)
{
    PR_NOTICE("hw_timer test");
}

void tuya_timer_test(void)
{
    OPERATE_RET ret;
    TUYA_TIMER_BASE_CFG_T cfg;
    uint32_t interval_us;
    uint32_t get_us;

    cfg.mode = TUYA_TIMER_MODE_PERIOD;
    cfg.cb = tkl_timer_isr_cb_fun;
    cfg.args = NULL;

    ret = tkl_timer_init(TUYA_TIMER_NUM_0, &cfg);
    if (ret != OPRT_OK) {
        return;
    }
    ret = tkl_timer_start(TUYA_TIMER_NUM_0, 1000);
    if (ret != OPRT_OK) {
        return;
    }
    tkl_system_delay(5000);
    ret = tkl_timer_stop(TUYA_TIMER_NUM_0);
    if (ret != OPRT_OK) {
        return;
    }
    ret = tkl_timer_get(TUYA_TIMER_NUM_0, &interval_us);
    if (ret != OPRT_OK) {
        return;
    }
    if (interval_us != 2000) {
        interval_us = 2000;
    }
    ret = tkl_timer_start(TUYA_TIMER_NUM_0, interval_us);
    if (ret != OPRT_OK) {
        return;
    }
    tkl_system_delay(1000);
    ret = tkl_timer_get_current_value(TUYA_TIMER_NUM_0, &get_us);
    if (ret != OPRT_OK) {
        return;
    }
    PR_DEBUG("current run time:%d us", get_us);
    tkl_system_delay(5000);
    ret = tkl_timer_deinit(TUYA_TIMER_NUM_0);
    if (ret != OPRT_OK) {
        // failed
    }
}
```

## 더 보기
- [스레드 및 타이머 패턴](../peripheral/tutorials/thread-timer-patterns)
