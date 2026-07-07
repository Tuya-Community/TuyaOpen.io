---
title: "tkl_system | System"
description: "tkl_system reference — TuyaOpen system TKL API for reboot, tick/ms time bases, random, sleep, delay, reset reason, and CPU info for porting/platform adaptation."
keywords:
  - tkl_system
  - tuyaopen system api
  - tkl system api
  - embedded system services
---

The `tkl_system` interface provides core system services: reboot, tick and millisecond time bases, random numbers, sleep and busy delay, reset-reason reporting, and CPU information. These are the kernel abstraction layer (TKL) entry points each platform implements; higher-level TAL and application code call them for portable timing and lifecycle control.

## tkl_system_enter_critical

```c
uint32_t tkl_system_enter_critical(void);
```

Enters a critical section by masking interrupts, and returns the previous interrupt mask so a later `tkl_system_exit_critical` call can restore it.

- Parameters: none.
- Return value: `uint32_t`, the interrupt mask captured before entering the critical section.

:::tip
Use the `TKL_ENTER_CRITICAL()` and `TKL_EXIT_CRITICAL()` macros to pair the calls automatically; `TKL_ENTER_CRITICAL()` declares a local `__irq_mask` that `TKL_EXIT_CRITICAL()` restores.
:::

## tkl_system_exit_critical

```c
void tkl_system_exit_critical(uint32_t irq_mask);
```

Exits a critical section by restoring the interrupt mask returned from `tkl_system_enter_critical`.

| Parameter | Description |
| --- | --- |
| `irq_mask` | The interrupt mask returned by the matching `tkl_system_enter_critical` call. |

- Return value: none.

## tkl_system_reset

```c
void tkl_system_reset(void);
```

Performs a system reboot.

- Parameters: none.
- Return value: none.

:::warning
This function reboots the device immediately and does not return.
:::

## tkl_system_get_tick_count

```c
SYS_TICK_T tkl_system_get_tick_count(void);
```

Gets the system tick count.

- Parameters: none.
- Return value: `SYS_TICK_T`, the current value of the system tick counter.

## tkl_system_get_millisecond

```c
SYS_TIME_T tkl_system_get_millisecond(void);
```

Gets the number of milliseconds elapsed since system startup.

- Parameters: none.
- Return value: `SYS_TIME_T`, the total number of milliseconds from system startup to the current moment.

## tkl_system_get_random

```c
int tkl_system_get_random(uint32_t range);
```

Gets a random number within a specified range.

| Parameter | Description |
| --- | --- |
| `range` | Upper bound of the random value. The result is in the range `0` to `range`. |

- Return value: `int`, the generated random number.

:::tip
The random number generator is initialized on its first call.
:::

## tkl_system_get_reset_reason

```c
TUYA_RESET_REASON_E tkl_system_get_reset_reason(char **describe);
```

Gets the reason for the most recent system reset.

| Parameter | Description |
| --- | --- |
| `describe` | Output parameter. Receives a pointer to a string describing the reset reason. |

- Return value: `TUYA_RESET_REASON_E`, an enumeration value identifying the reset reason.

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

Puts the system into a low-power sleep state for the specified duration.

| Parameter | Description |
| --- | --- |
| `num_ms` | Sleep duration in milliseconds. |

- Return value: none.

## tkl_system_delay

```c
void tkl_system_delay(uint32_t num_ms);
```

Delays execution for the specified duration.

| Parameter | Description |
| --- | --- |
| `num_ms` | Delay duration in milliseconds. |

- Return value: none.

## tkl_system_get_cpu_info

```c
OPERATE_RET tkl_system_get_cpu_info(TUYA_CPU_INFO_T **cpu_ary, int *cpu_cnt);
```

Gets information about the system CPUs.

| Parameter | Description |
| --- | --- |
| `cpu_ary` | Output parameter. Receives a pointer to an array of `TUYA_CPU_INFO_T`. |
| `cpu_cnt` | Output parameter. Receives the number of CPUs. |

- Return value: `OPRT_OK` on success. Any other value indicates an error; see `tuya_error_code.h`.

The `TUYA_CPU_INFO_T` structure reports per-CPU usage and chip identity:

```c
typedef struct {
    uint32_t use_ratio;     // CPU used ratio
    uint8_t  chipid[32+1];  // chip id, max length 32
    uint8_t  chipidlen;     // chip id length
} TUYA_CPU_INFO_T;
```

## See also

- [Thread and Timer Patterns](../peripheral/tutorials/thread-timer-patterns)
