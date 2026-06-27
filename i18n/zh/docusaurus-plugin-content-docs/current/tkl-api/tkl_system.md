---
title: "tkl_system | 系统接口"
---

`tkl_system` 接口提供核心系统服务：重启、滴答与毫秒时间基准、随机数、休眠与忙等待延时、复位原因上报以及 CPU 信息。它们是各平台实现的内核抽象层（TKL）入口，上层 TAL 与应用代码通过它们实现可移植的计时与生命周期控制。

## tkl_system_enter_critical

```c
uint32_t tkl_system_enter_critical(void);
```

进入临界区，屏蔽中断，并返回进入前的中断掩码，以便后续 `tkl_system_exit_critical` 调用恢复。

- 参数：无。
- 返回值：`uint32_t`，进入临界区前捕获的中断掩码。

:::tip
推荐使用 `TKL_ENTER_CRITICAL()` 与 `TKL_EXIT_CRITICAL()` 宏自动配对调用：`TKL_ENTER_CRITICAL()` 声明局部变量 `__irq_mask`，由 `TKL_EXIT_CRITICAL()` 恢复。
:::

## tkl_system_exit_critical

```c
void tkl_system_exit_critical(uint32_t irq_mask);
```

退出临界区，恢复 `tkl_system_enter_critical` 返回的中断掩码。

| 参数 | 说明 |
| --- | --- |
| `irq_mask` | 配对的 `tkl_system_enter_critical` 调用返回的中断掩码。 |

- 返回值：无。

## tkl_system_reset

```c
void tkl_system_reset(void);
```

执行系统重启。

- 参数：无。
- 返回值：无。

:::warning
该函数会立即重启设备，且不会返回。
:::

## tkl_system_get_tick_count

```c
SYS_TICK_T tkl_system_get_tick_count(void);
```

获取系统的滴答计数。

- 参数：无。
- 返回值：`SYS_TICK_T`，系统滴答计数的当前值。

## tkl_system_get_millisecond

```c
SYS_TIME_T tkl_system_get_millisecond(void);
```

获取从系统启动开始经过的毫秒数。

- 参数：无。
- 返回值：`SYS_TIME_T`，从系统启动到当前时刻的总毫秒数。

## tkl_system_get_random

```c
int tkl_system_get_random(uint32_t range);
```

获取指定范围内的随机数。

| 参数 | 说明 |
| --- | --- |
| `range` | 随机值的上界，结果取值范围为 `0` 到 `range`。 |

- 返回值：`int`，生成的随机数。

:::tip
随机数生成器在初次调用时会被初始化。
:::

## tkl_system_get_reset_reason

```c
TUYA_RESET_REASON_E tkl_system_get_reset_reason(char **describe);
```

获取最近一次系统复位的原因。

| 参数 | 说明 |
| --- | --- |
| `describe` | 输出参数，接收指向复位原因描述字符串的指针。 |

- 返回值：`TUYA_RESET_REASON_E`，标识复位原因的枚举值。

```c
typedef enum {
    TUYA_RESET_REASON_POWERON    = 0,  ///< Power-on reset, supply voltage < power-on threshold (TY_RST_POWER_OFF)
    TUYA_RESET_REASON_HW_WDOG    = 1,  ///< Hardware watchdog reset occurred (TY_RST_HARDWARE_WATCHDOG)
    TUYA_RESET_REASON_FAULT      = 2,  ///< An access fault occurred (TY_RST_FATAL_EXCEPTION)
    TUYA_RESET_REASON_SW_WDOG    = 3,  ///< Software watchdog reset occurred (TY_RST_SOFTWARE_WATCHDOG)
    TUYA_RESET_REASON_SOFTWARE   = 4,  ///< Software triggered reset (TY_RST_SOFTWARE)
    TUYA_RESET_REASON_DEEPSLEEP  = 5,  ///< Reset caused by entering deep sleep (TY_RST_DEEPSLEEP)
    TUYA_RESET_REASON_EXTERNAL   = 6,  ///< External reset trigger (TY_RST_HARDWARE)
    TUYA_RESET_REASON_UNKNOWN    = 7,  ///< Undeterminable cause
    TUYA_RESET_REASON_FIB        = 8,  ///< Reset originated from the FIB bootloader
    TUYA_RESET_REASON_BOOTLOADER = 8,  ///< Reset relates to a bootloader
    TUYA_RESET_REASON_CRASH      = 10, ///< Software crash
    TUYA_RESET_REASON_FLASH      = 11, ///< Flash failure caused reset
    TUYA_RESET_REASON_FATAL      = 12, ///< A non-recoverable fatal error occurred
    TUYA_RESET_REASON_BROWNOUT   = 13, ///< Brownout
    TUYA_RESET_REASON_UNSUPPORT  = 0xFF,
} TUYA_RESET_REASON_E;
```

## tkl_system_sleep

```c
void tkl_system_sleep(uint32_t num_ms);
```

使系统进入低功耗休眠状态，持续指定时长。

| 参数 | 说明 |
| --- | --- |
| `num_ms` | 休眠时长，单位为毫秒。 |

- 返回值：无。

## tkl_system_delay

```c
void tkl_system_delay(uint32_t num_ms);
```

延时指定时长。

| 参数 | 说明 |
| --- | --- |
| `num_ms` | 延时时长，单位为毫秒。 |

- 返回值：无。

## tkl_system_get_cpu_info

```c
OPERATE_RET tkl_system_get_cpu_info(TUYA_CPU_INFO_T **cpu_ary, int *cpu_cnt);
```

获取系统 CPU 信息。

| 参数 | 说明 |
| --- | --- |
| `cpu_ary` | 输出参数，接收指向 `TUYA_CPU_INFO_T` 数组的指针。 |
| `cpu_cnt` | 输出参数，接收 CPU 数量。 |

- 返回值：`OPRT_OK` 表示成功，其他值则表示发生错误。详细错误代码请参考 `tuya_error_code.h`。

`TUYA_CPU_INFO_T` 结构体上报每个 CPU 的使用率与芯片标识：

```c
typedef struct {
    uint32_t use_ratio;     // CPU 使用率
    uint8_t  chipid[32+1];  // 芯片 ID，最大长度 32
    uint8_t  chipidlen;     // 芯片 ID 长度
} TUYA_CPU_INFO_T;
```

## 相关文档

- [线程与定时器模式](../peripheral/tutorials/thread-timer-patterns)
