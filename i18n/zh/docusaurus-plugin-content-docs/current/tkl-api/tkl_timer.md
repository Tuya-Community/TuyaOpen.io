---
title: "tkl_timer | 硬件定时器"
description: "tkl_timer 参考 —— 用于驱动片上硬件定时器，配置计数模式与中断回调并以微秒间隔启动的硬件定时器 TKL API。"
keywords:
  - tkl_timer
  - TuyaOpen 硬件定时器
  - 中断计时
  - 嵌入式驱动
---

`tkl_timer` 接口用于驱动片上硬件定时器，实现精确的中断驱动计时。你为定时器配置计数模式和中断服务回调，以微秒间隔启动它，并可读回其配置间隔或当前计数值。它是各平台实现的内核抽象层（TKL）适配。

## 类型

定时器通过 `TUYA_TIMER_NUM_E` 选择，并使用 `TUYA_TIMER_BASE_CFG_T` 配置：

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
    TUYA_TIMER_MODE_E mode;  // 计数模式
    TUYA_TIMER_ISR_CB cb;    // 中断服务回调
    void             *args;  // 传递给回调的参数
} TUYA_TIMER_BASE_CFG_T;
```

`TUYA_TIMER_MODE_E` 取值：

| 取值 | 说明 |
| --- | --- |
| `TUYA_TIMER_MODE_ONCE` | 单次定时，触发一次。 |
| `TUYA_TIMER_MODE_PERIOD` | 周期定时，重复触发。 |

:::warning
`cb` 运行在中断上下文中。请保持其简短，且不要在其中调用阻塞 API。
:::

## tkl_timer_init

```c
OPERATE_RET tkl_timer_init(TUYA_TIMER_NUM_E timer_id, TUYA_TIMER_BASE_CFG_T *cfg);
```

使用给定配置初始化指定的定时器。

| 参数 | 说明 |
| --- | --- |
| `timer_id` | 定时器 ID。 |
| `cfg` | 基础配置：计数模式、回调函数及回调参数。 |

- 返回值：`OPRT_OK` 表示成功，其他值则表示发生错误。详细错误代码请参考 `tuya_error_code.h`。

## tkl_timer_deinit

```c
OPERATE_RET tkl_timer_deinit(TUYA_TIMER_NUM_E timer_id);
```

反初始化定时器。该接口会停止定时器，并释放相关的软硬件资源。

| 参数 | 说明 |
| --- | --- |
| `timer_id` | 定时器 ID。 |

- 返回值：`OPRT_OK` 表示成功，其他值则表示发生错误。详细错误代码请参考 `tuya_error_code.h`。

## tkl_timer_start

```c
OPERATE_RET tkl_timer_start(TUYA_TIMER_NUM_E timer_id, uint32_t us);
```

以给定间隔启动定时器。

| 参数 | 说明 |
| --- | --- |
| `timer_id` | 定时器 ID。 |
| `us` | 定时间隔，单位为微秒。 |

- 返回值：`OPRT_OK` 表示成功，其他值则表示发生错误。详细错误代码请参考 `tuya_error_code.h`。

## tkl_timer_stop

```c
OPERATE_RET tkl_timer_stop(TUYA_TIMER_NUM_E timer_id);
```

停止定时器。

| 参数 | 说明 |
| --- | --- |
| `timer_id` | 定时器 ID。 |

- 返回值：`OPRT_OK` 表示成功，其他值则表示发生错误。详细错误代码请参考 `tuya_error_code.h`。

## tkl_timer_get

```c
OPERATE_RET tkl_timer_get(TUYA_TIMER_NUM_E timer_id, uint32_t *us);
```

获取定时器配置的定时间隔。

| 参数 | 说明 |
| --- | --- |
| `timer_id` | 定时器 ID。 |
| `us` | 输出参数，接收定时间隔，单位为微秒，对应 `tkl_timer_start` 设置的值。 |

- 返回值：`OPRT_OK` 表示成功，其他值则表示发生错误。详细错误代码请参考 `tuya_error_code.h`。

## tkl_timer_get_current_value

```c
OPERATE_RET tkl_timer_get_current_value(TUYA_TIMER_NUM_E timer_id, uint32_t *us);
```

获取定时器当前的计数值。

| 参数 | 说明 |
| --- | --- |
| `timer_id` | 定时器 ID。 |
| `us` | 输出参数，接收当前计数值，单位为微秒。 |

- 返回值：`OPRT_OK` 表示成功，其他值则表示发生错误。详细错误代码请参考 `tuya_error_code.h`。

## 示例

配置一个周期定时器、运行它、读回其间隔和当前计数值，然后反初始化：

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

## 相关文档

- [线程与定时器模式](../peripheral/tutorials/thread-timer-patterns)
