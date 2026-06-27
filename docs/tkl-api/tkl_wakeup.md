---
title: tkl_wakeup | Wake-up Driver
---

The `tkl_wakeup` API configures the source that wakes the chip from a low-power state. A wake-up source can be a GPIO edge or level, a timer, or an RTC alarm. You describe one source in a `TUYA_WAKEUP_SOURCE_BASE_CFG_T` and pass it to set or clear that source. Both functions return `OPRT_OK` on success or an error code defined in `tuya_error_code.h`.

## tkl_wakeup_source_set

```c
OPERATE_RET tkl_wakeup_source_set(const TUYA_WAKEUP_SOURCE_BASE_CFG_T *param);
```

Enables a wake-up source.

| Parameter | Direction | Description |
| --- | --- | --- |
| `param` | in | Wake-up source to enable. See `TUYA_WAKEUP_SOURCE_BASE_CFG_T`. |

Returns `OPRT_OK` on success. Other values indicate an error; see `tuya_error_code.h`.

## tkl_wakeup_source_clear

```c
OPERATE_RET tkl_wakeup_source_clear(const TUYA_WAKEUP_SOURCE_BASE_CFG_T *param);
```

Disables a previously enabled wake-up source.

| Parameter | Direction | Description |
| --- | --- | --- |
| `param` | in | Wake-up source to disable. See `TUYA_WAKEUP_SOURCE_BASE_CFG_T`. |

Returns `OPRT_OK` on success. Other values indicate an error; see `tuya_error_code.h`.

## Types

### TUYA_WAKEUP_SOURCE_BASE_CFG_T

Describes one wake-up source. The `source` field selects which member of the `wakeup_para` union applies.

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

### TUYA_WAKEUP_SOURCE_E

```c
typedef enum {
    TUYA_WAKEUP_SOURCE_GPIO,
    TUYA_WAKEUP_SOURCE_TIMER,
    TUYA_WAKEUP_SOURCE_RTC,
} TUYA_WAKEUP_SOURCE_E;
```

### TUYA_WAKEUP_SOURCE_GPIO_T

```c
typedef struct {
    TUYA_GPIO_NUM_E       gpio_num;
    TUYA_GPIO_WAKE_TYPE_E level;
} TUYA_WAKEUP_SOURCE_GPIO_T;
```

| Field | Description |
| --- | --- |
| `gpio_num` | GPIO pin that triggers the wake-up. |
| `level` | Trigger condition. See `TUYA_GPIO_WAKE_TYPE_E`. |

`TUYA_GPIO_WAKE_TYPE_E` values are `TUYA_GPIO_WAKEUP_LOW`, `TUYA_GPIO_WAKEUP_HIGH`, `TUYA_GPIO_WAKEUP_RISE`, and `TUYA_GPIO_WAKEUP_FALL`.

### TUYA_WAKEUP_SOURCE_TIMER_T

```c
typedef struct {
    TUYA_TIMER_NUM_E  timer_num;
    TUYA_TIMER_MODE_E mode;
    uint32_t          ms;
} TUYA_WAKEUP_SOURCE_TIMER_T;
```

| Field | Description |
| --- | --- |
| `timer_num` | Timer instance to use. |
| `mode` | `TUYA_TIMER_MODE_ONCE` or `TUYA_TIMER_MODE_PERIOD`. |
| `ms` | Timeout in milliseconds. |

### TUYA_WAKEUP_SOURCE_RTC_T

```c
typedef struct {
    TUYA_RTC_NUM_E  RTC_num;
    TUYA_RTC_MODE_E mode;
    uint32_t        ms;
} TUYA_WAKEUP_SOURCE_RTC_T;
```

| Field | Description |
| --- | --- |
| `RTC_num` | RTC instance to use. |
| `mode` | `TUYA_RTC_MODE_ONCE` or `TUYA_RTC_MODE_PERIOD`. |
| `ms` | Alarm interval in milliseconds. |

## Example

Wake the chip on a rising edge on GPIO 12:

```c
TUYA_WAKEUP_SOURCE_BASE_CFG_T cfg = {0};
cfg.source = TUYA_WAKEUP_SOURCE_GPIO;
cfg.wakeup_para.gpio_param.gpio_num = TUYA_GPIO_NUM_12;
cfg.wakeup_para.gpio_param.level = TUYA_GPIO_WAKEUP_RISE;

tkl_wakeup_source_set(&cfg);

// Later, to stop waking on this source:
tkl_wakeup_source_clear(&cfg);
```
