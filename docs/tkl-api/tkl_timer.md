---
title: "tkl_timer | Hardware Timer"
description: "tkl_timer reference — TuyaOpen hardware timer TKL API for interrupt-driven timing with once/period modes and microsecond intervals in embedded IoT development."
keywords:
  - tkl_timer
  - tuyaopen timer driver
  - tkl hardware timer api
  - embedded timer driver
---

The `tkl_timer` interface drives an on-chip hardware timer for precise, interrupt-driven timing. You configure a timer with a counting mode and an interrupt service callback, start it with a microsecond interval, and read back its configured interval or current count. It is the kernel abstraction layer (TKL) port each platform implements.

## Types

A timer is selected by `TUYA_TIMER_NUM_E` and configured with `TUYA_TIMER_BASE_CFG_T`:

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

`TUYA_TIMER_MODE_E` values:

| Value | Description |
| --- | --- |
| `TUYA_TIMER_MODE_ONCE` | One-shot timer; fires once. |
| `TUYA_TIMER_MODE_PERIOD` | Periodic timer; fires repeatedly. |

:::warning
`cb` runs in interrupt context. Keep it short and do not call blocking APIs from it.
:::

## tkl_timer_init

```c
OPERATE_RET tkl_timer_init(TUYA_TIMER_NUM_E timer_id, TUYA_TIMER_BASE_CFG_T *cfg);
```

Initializes the specified timer with the given configuration.

| Parameter | Description |
| --- | --- |
| `timer_id` | Timer ID. |
| `cfg` | Basic configuration: counting mode, callback, and callback argument. |

- Return value: `OPRT_OK` on success. Any other value indicates an error; see `tuya_error_code.h`.

## tkl_timer_deinit

```c
OPERATE_RET tkl_timer_deinit(TUYA_TIMER_NUM_E timer_id);
```

Deinitializes the timer. Stops it and releases its software and hardware resources.

| Parameter | Description |
| --- | --- |
| `timer_id` | Timer ID. |

- Return value: `OPRT_OK` on success. Any other value indicates an error; see `tuya_error_code.h`.

## tkl_timer_start

```c
OPERATE_RET tkl_timer_start(TUYA_TIMER_NUM_E timer_id, uint32_t us);
```

Starts the timer with the given interval.

| Parameter | Description |
| --- | --- |
| `timer_id` | Timer ID. |
| `us` | Timing interval, in microseconds. |

- Return value: `OPRT_OK` on success. Any other value indicates an error; see `tuya_error_code.h`.

## tkl_timer_stop

```c
OPERATE_RET tkl_timer_stop(TUYA_TIMER_NUM_E timer_id);
```

Stops the timer.

| Parameter | Description |
| --- | --- |
| `timer_id` | Timer ID. |

- Return value: `OPRT_OK` on success. Any other value indicates an error; see `tuya_error_code.h`.

## tkl_timer_get

```c
OPERATE_RET tkl_timer_get(TUYA_TIMER_NUM_E timer_id, uint32_t *us);
```

Gets the timer's configured interval.

| Parameter | Description |
| --- | --- |
| `timer_id` | Timer ID. |
| `us` | Output parameter. Receives the interval in microseconds, matching the value set by `tkl_timer_start`. |

- Return value: `OPRT_OK` on success. Any other value indicates an error; see `tuya_error_code.h`.

## tkl_timer_get_current_value

```c
OPERATE_RET tkl_timer_get_current_value(TUYA_TIMER_NUM_E timer_id, uint32_t *us);
```

Gets the timer's current count value.

| Parameter | Description |
| --- | --- |
| `timer_id` | Timer ID. |
| `us` | Output parameter. Receives the current count value, in microseconds. |

- Return value: `OPRT_OK` on success. Any other value indicates an error; see `tuya_error_code.h`.

## Example

Configure a periodic timer, run it, read back its interval and current count, then deinitialize it:

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

## See also

- [Thread and Timer Patterns](../peripheral/tutorials/thread-timer-patterns)
