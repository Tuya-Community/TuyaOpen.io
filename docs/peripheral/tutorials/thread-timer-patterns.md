---
title: "Thread and Timer Patterns"
---

# Thread and Timer Patterns

Common patterns for multithreading, software timers, and synchronization in TuyaOpen using the TAL OS abstraction.

## Prerequisites

- Basic understanding of RTOS concepts (threads, mutexes, semaphores)
- Completed [Environment Setup](../../quick-start/enviroment-setup)

## Creating Threads

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

### Thread Priority

| Priority | Use case |
|----------|----------|
| `THREAD_PRIO_1` | Highest -- audio, real-time control |
| `THREAD_PRIO_3` | Normal -- sensor reading, business logic |
| `THREAD_PRIO_5` | Low -- logging, background sync |

### Thread Deletion

Delete a thread from within itself:

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
Always delete threads from within themselves. Deleting a thread from another context may leave resources in an inconsistent state. The thread is not deleted instantly -- it completes its current execution cycle first.
:::

## Software Timers

For periodic or one-shot callbacks without creating a dedicated thread:

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

Timer types:
- `TAL_TIMER_CYCLE` -- repeats every N ms
- `TAL_TIMER_ONCE` -- fires once then stops

Stop and delete:

```c
tal_sw_timer_stop(my_timer);
tal_sw_timer_delete(my_timer);
```

## Mutex (Mutual Exclusion)

Protect shared data between threads:

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

## Semaphore

Signal between threads or from ISR to thread:

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

## Message Queue

Pass data between threads:

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

## Common Pattern: Sensor + Cloud Reporter

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

## Platform Notes

- **ESP32-S3:** Stack depth is automatically increased by 1024 bytes internally.
- **Minimum sleep:** `tal_system_sleep()` enforces a minimum of 10 ms.
- **`tal_thread_set_self_name()`** is a no-op on ESP32 -- the name is fixed at creation.
- **Recursive mutex:** Available when `configUSE_RECURSIVE_MUTEXES` is enabled (default on most platforms).

## References

- [System Thread example](https://github.com/tuya/TuyaOpen/tree/master/examples/system/os_thread)
- [System Mutex example](https://github.com/tuya/TuyaOpen/tree/master/examples/system/os_mutex)
- [System Timer example](https://github.com/tuya/TuyaOpen/tree/master/examples/system/os_sw_timer)
- [TKL System API](/docs/tkl-api/tkl_system)
