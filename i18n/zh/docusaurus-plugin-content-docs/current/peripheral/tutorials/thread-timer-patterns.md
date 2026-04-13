---
title: "线程与定时器模式"
---

# 线程与定时器模式

TuyaOpen 中使用 TAL OS 抽象的多线程、软件定时器和同步常见模式。

## 创建线程

```c
#include "tal_thread.h"

static void my_task(void *arg)
{
    while (1) {
        /* 周期性工作 */
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

### 线程优先级

| 优先级 | 用途 |
|--------|------|
| `THREAD_PRIO_1` | 最高 -- 音频、实时控制 |
| `THREAD_PRIO_3` | 普通 -- 传感器读取、业务逻辑 |
| `THREAD_PRIO_5` | 低 -- 日志、后台同步 |

### 线程删除

从线程内部删除自身：

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
务必从线程自身内部删除线程。从其他上下文删除可能导致资源状态不一致。
:::

## 软件定时器

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

- `TAL_TIMER_CYCLE` -- 每 N 毫秒重复
- `TAL_TIMER_ONCE` -- 触发一次后停止

## 互斥锁

```c
#include "tal_mutex.h"

MUTEX_HANDLE mutex;
tal_mutex_create_init(&mutex);

tal_mutex_lock(mutex);
/* 访问共享数据 */
tal_mutex_unlock(mutex);
```

## 信号量

```c
#include "tal_semaphore.h"

SEM_HANDLE sem;
tal_semaphore_create_init(&sem, 0, 1);

/* 生产者：*/ tal_semaphore_post(sem);
/* 消费者：*/ tal_semaphore_wait(sem, TIMEOUT_MS);
```

## 消息队列

```c
#include "tal_queue.h"

QUEUE_HANDLE queue;
tal_queue_create_init(&queue, sizeof(sensor_data_t), 10);

/* 生产者：*/ tal_queue_post(queue, &data, 0);
/* 消费者：*/ tal_queue_fetch(queue, &received, TIMEOUT_MS);
```

## 常见模式：传感器 + 云端上报

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

## 平台说明

- **ESP32-S3：** 栈深度内部自动增加 1024 字节。
- **最小休眠：** `tal_system_sleep()` 强制最小 10 ms。
- **`tal_thread_set_self_name()`** 在 ESP32 上为空操作。
- **递归互斥锁：** 在 `configUSE_RECURSIVE_MUTEXES` 启用时可用。

## 参考资料

- [系统线程示例](https://github.com/tuya/TuyaOpen/tree/master/examples/system/os_thread)
- [系统互斥锁示例](https://github.com/tuya/TuyaOpen/tree/master/examples/system/os_mutex)
- [系统定时器示例](https://github.com/tuya/TuyaOpen/tree/master/examples/system/os_sw_timer)
- [TKL System API](/docs/tkl-api/tkl_system)
