---
title: tkl_wakeup | 唤醒驱动
description: "tkl_wakeup 参考 —— 用于配置 GPIO 边沿电平、定时器或 RTC 闹钟等唤醒源以从低功耗状态唤醒芯片的唤醒驱动 TKL API。"
keywords:
  - tkl_wakeup
  - TuyaOpen 唤醒驱动
  - 低功耗
  - 嵌入式驱动
---

`tkl_wakeup` API 用于配置将芯片从低功耗状态唤醒的唤醒源。唤醒源可以是 GPIO 的边沿或电平、定时器，或 RTC 闹钟。你在 `TUYA_WAKEUP_SOURCE_BASE_CFG_T` 中描述一个唤醒源，再将其传入设置或清除接口。两个函数成功时返回 `OPRT_OK`，失败时返回 `tuya_error_code.h` 中定义的错误码。

## tkl_wakeup_source_set

```c
OPERATE_RET tkl_wakeup_source_set(const TUYA_WAKEUP_SOURCE_BASE_CFG_T *param);
```

启用一个唤醒源。

| 参数 | 方向 | 说明 |
| --- | --- | --- |
| `param` | 输入 | 要启用的唤醒源，参见 `TUYA_WAKEUP_SOURCE_BASE_CFG_T`。 |

成功时返回 `OPRT_OK`，其他值表示发生错误，详见 `tuya_error_code.h`。

## tkl_wakeup_source_clear

```c
OPERATE_RET tkl_wakeup_source_clear(const TUYA_WAKEUP_SOURCE_BASE_CFG_T *param);
```

禁用之前已启用的唤醒源。

| 参数 | 方向 | 说明 |
| --- | --- | --- |
| `param` | 输入 | 要禁用的唤醒源，参见 `TUYA_WAKEUP_SOURCE_BASE_CFG_T`。 |

成功时返回 `OPRT_OK`，其他值表示发生错误，详见 `tuya_error_code.h`。

## 类型

### TUYA_WAKEUP_SOURCE_BASE_CFG_T

描述一个唤醒源。`source` 字段决定 `wakeup_para` 联合体中哪个成员生效。

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

| 字段 | 说明 |
| --- | --- |
| `gpio_num` | 触发唤醒的 GPIO 引脚。 |
| `level` | 触发条件，参见 `TUYA_GPIO_WAKE_TYPE_E`。 |

`TUYA_GPIO_WAKE_TYPE_E` 的取值为 `TUYA_GPIO_WAKEUP_LOW`、`TUYA_GPIO_WAKEUP_HIGH`、`TUYA_GPIO_WAKEUP_RISE` 和 `TUYA_GPIO_WAKEUP_FALL`。

### TUYA_WAKEUP_SOURCE_TIMER_T

```c
typedef struct {
    TUYA_TIMER_NUM_E  timer_num;
    TUYA_TIMER_MODE_E mode;
    uint32_t          ms;
} TUYA_WAKEUP_SOURCE_TIMER_T;
```

| 字段 | 说明 |
| --- | --- |
| `timer_num` | 使用的定时器实例。 |
| `mode` | `TUYA_TIMER_MODE_ONCE` 或 `TUYA_TIMER_MODE_PERIOD`。 |
| `ms` | 超时时间，单位为毫秒。 |

### TUYA_WAKEUP_SOURCE_RTC_T

```c
typedef struct {
    TUYA_RTC_NUM_E  RTC_num;
    TUYA_RTC_MODE_E mode;
    uint32_t        ms;
} TUYA_WAKEUP_SOURCE_RTC_T;
```

| 字段 | 说明 |
| --- | --- |
| `RTC_num` | 使用的 RTC 实例。 |
| `mode` | `TUYA_RTC_MODE_ONCE` 或 `TUYA_RTC_MODE_PERIOD`。 |
| `ms` | 闹钟间隔，单位为毫秒。 |

## 示例

在 GPIO 12 上的上升沿唤醒芯片：

```c
TUYA_WAKEUP_SOURCE_BASE_CFG_T cfg = {0};
cfg.source = TUYA_WAKEUP_SOURCE_GPIO;
cfg.wakeup_para.gpio_param.gpio_num = TUYA_GPIO_NUM_12;
cfg.wakeup_para.gpio_param.level = TUYA_GPIO_WAKEUP_RISE;

tkl_wakeup_source_set(&cfg);

// 之后若要停止该唤醒源：
tkl_wakeup_source_clear(&cfg);
```
