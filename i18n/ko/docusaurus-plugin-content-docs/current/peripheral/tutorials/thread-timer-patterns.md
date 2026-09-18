---
title: "스레드 및 타이머 패턴"
description: "TuyaOpen의 스레드 및 타이머 패턴 : 휴대용 스레드, 소프트웨어 타이머, mutexes, semaphores 및 큐에 대한 TAL OS 요약을 사용합니다."
keywords:
  - thread
  - timer
  - mutex
  - semaphore
  - tuyaopen peripheral
---

TAL OS 요약은 휴대용 스레드, 소프트웨어 타이머, 뮤텍스, semaphores 및 모든 TuyaOpen 플랫폼에서 큐를 제공합니다. 이 페이지는 multithreading, periodic work 및 동기화를 위한 일반적인 본을 수집합니다.

## 자주 묻는 질문
- RTOS 개념의 기본 이해 (읽기, 뮤텍스, semaphores)
- 한국어[환경 설정](../../quick-start/enviroment-setup)

## 스레드 만들기
```c
#include "tal_thread.h"

static void my_task(void *arg)
{
    while (1) {
        /* periodic work */
        tal_system_sleep(1000);
    }
}

THREAD_HANDLE handle;
THREAD_CFG_T cfg = {
    .thrdname = "my_task",
    .stackDepth = 4096,
    .priority = THREAD_PRIO_3,
};
tal_thread_create_and_start(&handle, NULL, NULL, my_task, NULL, &cfg);
```

### 스레드 우선 순위
|회사연혁|사용 사례|
|----------|----------|
| `THREAD_PRIO_1` |Highest -- 오디오, 실시간 제어|
| `THREAD_PRIO_3` |Normal -- 감지기 독서, 사업 논리|
| `THREAD_PRIO_5` |낮은 -- 로깅, 배경 동기화|

### 스레드 삭제
자체 내에서 스레드를 삭제:

```c
static void self_terminating_task(void *arg)
{
    for (int i = 0; i < 10; i++) {
        tal_system_sleep(1000);
    }
    tal_thread_delete(NULL);
}
```

:::warning
항상 스스로 스레드를 삭제합니다. 다른 컨텍스트에서 스레드를 삭제하면 의도한 상태에 리소스를 남길 수 있습니다. 스레드는 즉시 삭제되지 않습니다 -- 그것은 그것의 현재 실행 주기를 첫째로 완료합니다.
:::

## 소프트웨어 타이머
전용 스레드를 만들지 않고 주기적 또는 원샷 콜백을 위해:

```c
#include "tal_sw_timer.h"

static void timer_callback(TIMER_ID timer_id, void *arg)
{
    TAL_PR_INFO("timer fired");
}

TIMER_ID my_timer;
tal_sw_timer_create(timer_callback, NULL, &my_timer);
tal_sw_timer_start(my_timer, 5000, TAL_TIMER_CYCLE);
```

타이머 유형:
- `TAL_TIMER_CYCLE`-- 각 N ms를 반복
- `TAL_TIMER_ONCE`-- 한번 불기

중지 및 삭제:

```c
tal_sw_timer_stop(my_timer);
tal_sw_timer_delete(my_timer);
```

## Mutex (보통 제외)
실 사이 공유된 자료를 보호하십시오:

```c
#include "tal_mutex.h"

MUTEX_HANDLE mutex;
tal_mutex_create_init(&mutex);

/* In thread A and B: */
tal_mutex_lock(mutex);
/* access shared data */
tal_mutex_unlock(mutex);

/* Cleanup: */
tal_mutex_release(mutex);
```

## Sema 이동
실 사이 신호 또는 ISR에서 실에:

```c
#include "tal_semaphore.h"

SEM_HANDLE sem;
tal_semaphore_create_init(&sem, 0, 1);

/* Producer (or ISR): */
tal_semaphore_post(sem);

/* Consumer thread: */
tal_semaphore_wait(sem, TIMEOUT_MS);

tal_semaphore_release(sem);
```

## 메시지 Queue
실 사이 자료를 통과하십시오:

```c
#include "tal_queue.h"

QUEUE_HANDLE queue;
tal_queue_create_init(&queue, sizeof(sensor_data_t), 10);

/* Producer: */
sensor_data_t data = { .temp = 25.0 };
tal_queue_post(queue, &data, 0);

/* Consumer: */
sensor_data_t received;
tal_queue_fetch(queue, &received, TIMEOUT_MS);
```

## 일반적인 본: 감지기 + 구름 Reporter
```c
static QUEUE_HANDLE s_data_queue;

static void sensor_thread(void *arg)
{
    while (1) {
        float temp, humi;
        sht3x_read(&temp, &humi);
        sensor_data_t data = { .temp = temp, .humi = humi };
        tal_queue_post(s_data_queue, &data, 0);
        tal_system_sleep(5000);
    }
}

static void cloud_thread(void *arg)
{
    sensor_data_t data;
    while (1) {
        if (tal_queue_fetch(s_data_queue, &data, 10000) == OPRT_OK) {
            report_to_cloud(data.temp, data.humi);
        }
    }
}
```

## 플랫폼 노트
- **ESP32-S3:** 스택 깊이는 내부적으로 1024 바이트로 자동으로 증가했습니다.
- **최소 수면:**`tal_system_sleep()`최소 10m의 시행
- **`tal_thread_set_self_name()`** ESP32 -- 이름은 생성에 고정되어 있습니다.
- **수동:** 사용할 때`configUSE_RECURSIVE_MUTEXES`(기본적으로 대부분의 플랫폼).

## 이름 *
- [시스템 스레드 예](https://github.com/tuya/TuyaOpen/tree/master/examples/system/os_thread)
- [시스템 Mutex 예제](https://github.com/tuya/TuyaOpen/tree/master/examples/system/os_mutex)
- [시스템 타이머 예](https://github.com/tuya/TuyaOpen/tree/master/examples/system/os_sw_timer)
- [TKL 시스템 API](/docs/tkl-api/tkl_system)
