---
title: tkl watchdog | 워치도 드라이버
description: "tkl watchdog 참고 — TuyaOpen watchdog TKL API for init with interval, feed, and deinit to reset on hang in Embedded IoT 개발."
keywords:
  - tkl_watchdog
  - tuyaopen watchdog driver
  - tkl watchdog api
  - embedded watchdog
---

## 제품정보
watchdog는 프로그램이 실행될 때 프로세서를 재설정하는 카운트다운 타이머입니다.

reload 값에서 watchdog 카운터 decrements. 이 프로그램은 건강하지만, 주기적으로 카운터를 다시로드 - watchdog을 먹이는 작업 (`tkl_watchdog_refresh`). 프로그램이 watchdog을 먹이고 카운터가 0에 도달하면 watchdog은 재설정을 주장합니다. watchdog 간격보다 짧게 먹이 간격을 선택하여 건강한 프로그램은 결코 가짜 재설정을 유발하지 않습니다.

이 드라이버는 세 가지 기능을 노출합니다. 시계 독을 간격으로 초기화하고, 그것을 먹이고, 그것을 분리합니다.

## tkl watchdog init의
```c
uint32_t tkl_watchdog_init(TUYA_WDOG_BASE_CFG_T *cfg);
```

구성에서 watchdog을 초기화하고 하드웨어가 실제로 적용된 간격을 반환합니다.

모수:

- `cfg`: Watchdog 구성.

  ```c
  typedef struct {
      uint32_t interval_ms; // Watchdog interval, in milliseconds
  } TUYA_WDOG_BASE_CFG_T;
  ```

반환:

- `0`오류에. 더 큰 가치`0`요구되는 하드웨어에 의해 적용된 실제 watchdog 간격입니다,`interval_ms`.

## tkl watchdog deinit의
```c
OPERATE_RET tkl_watchdog_deinit(void);
```

watchdog을 분리하고 그것을 중지합니다.

모수:

- 없음.

반환:

- `OPRT_OK`성공에. 다른 값의 경우, 참조`tuya_error_code.h`.

## tkl watchdog refresh의
```c
OPERATE_RET tkl_watchdog_refresh(void);
```

watchdog을 피드, 카운터를 다시로드.

모수:

- 없음.

반환:

- `OPRT_OK`성공에. 다른 값의 경우, 참조`tuya_error_code.h`.

## 이름 *
```c
/* Initialize the watchdog */
TUYA_WDOG_BASE_CFG_T cfg;
uint32_t actual_interval_ms = 0;
cfg.interval_ms = 100;
actual_interval_ms = tkl_watchdog_init(&cfg);

if (actual_interval_ms) {
    /* The hardware applied actual_interval_ms */
} else {
    /* Initialization failed */
}

/* Feed the watchdog */
tkl_watchdog_refresh();

/* Deinitialize the watchdog */
tkl_watchdog_deinit();
```
