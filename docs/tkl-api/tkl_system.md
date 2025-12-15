# tkl_system | System Interfaces

## Overview

This topic describes the interfaces related to system functions.

## API description

### tkl_system_reset

```c
void tkl_system_reset(void)
```

- Feature: Performs a system reboot.

- Parameter: None.

- Return value: None.

:::tip
Calling this function will cause the system to reboot.
:::

### tkl_system_get_tick_count

```c
SYS_TICK_T tkl_system_get_tick_count(void)
```

- Feature: Gets the system tick count.

- Parameter: None.

- Return value: `SYS_TICK_T`, the current value of the system tick count.

### tkl_system_get_millisecond

```c
SYS_TIME_T tkl_system_get_millisecond(void)
```

- Feature: Gets the number of milliseconds elapsed since system startup.

- Parameter: None.

- Return value: `SYS_TIME_T`, the total number of milliseconds from system startup to the current moment.

### tkl_system_get_random

```c
int tkl_system_get_random(uint32_t range)
```

- Feature: Gets a random number within a specified range.

- Parameter: `range` indicates the range of the random number, from `0` to `range` (excluding `range` itself).

- Return value: `int`, the generated random number.

:::tip
The random number generator is initialized upon its first call.
:::

### tkl_system_get_reset_reason

```c
TUYA_RESET_REASON_E tkl_system_get_reset_reason(char** describe)
```

- Feature: Gets the reason for the system reset.

- Parameter: `describe`, a pointer to a string describing the system reset reason.

- Return value: `TUYA_RESET_REASON_E`, an enumeration value indicating the reset reason.


```c
    typedef enum {
        TUYA_RESET_REASON_POWERON    = 0,  ///< Power-on reset type, supply voltage < power-on threshold (TY_RST_POWER_OFF)
        TUYA_RESET_REASON_HW_WDOG    = 1,  ///< Hardware watchdog reset occurred (TY_RST_HARDWARE_WATCHDOG)
        TUYA_RESET_REASON_FAULT      = 2,  ///< An access fault occurred (TY_RST_FATAL_EXCEPTION)
        TUYA_RESET_REASON_SW_WDOG    = 3,  ///< Software watchdog reset occurred (TY_RST_SOFTWARE_WATCHDOG)
        TUYA_RESET_REASON_SOFTWARE   = 4,  ///< Software triggered reset (TY_RST_SOFTWARE)
        TUYA_RESET_REASON_DEEPSLEEP  = 5,  ///< Reset caused by entering deep sleep (TY_RST_DEEPSLEEP)
        TUYA_RESET_REASON_EXTERNAL   = 6,  ///< External reset trigger        (TY_RST_HARDWARE)
        TUYA_RESET_REASON_UNKNOWN    = 7,  ///< Underterminable cause
        TUYA_RESET_REASON_FIB        = 8,  ///< Reset originated from the FIB bootloader
        TUYA_RESET_REASON_BOOTLOADER = 8,  ///< Reset relates to an bootloader
        TUYA_RESET_REASON_CRASH      = 10, ///< Software crash
        TUYA_RESET_REASON_FLASH      = 11, ///< Flash failure caused reset
        TUYA_RESET_REASON_FATAL      = 12, ///< A non-recoverable fatal error occurred
        TUYA_RESET_REASON_BROWNOUT   = 13, ///< Brown out
        TUYA_RESET_REASON_UNSUPPORT  = 0xFF,
    } TUYA_RESET_REASON_E;
```

:::tip
Different reset sources are mapped to specific enumeration values.
:::

### tkl_system_sleep

```c
void tkl_system_sleep(uint32_t num_ms)
```

- Feature: Puts the system into a sleep state for a specified duration.

- Parameter: `num_ms`, the sleep duration in milliseconds.

- Return value: None.

:::tip
Calling this function will pause the task scheduler for the current task for a specified duration.
:::

### tkl_system_delay

```c
void tkl_system_delay(uint32_t num_ms)
```

- Feature: Delays the system for a specified duration.

- Parameter: `num_ms`, the delay duration in milliseconds.

- Return value: None.

### tkl_system_get_cpu_info

```c
OPERATE_RET tkl_system_get_cpu_info(TUYA_CPU_INFO_T **cpu_ary, int *cpu_cnt)
```

- Feature: Gets the system CPU information.

- Parameters:
   - `cpu_ary`: Pointer to an array of type `TUYA_CPU_INFO_T`, used to receive CPU information.
   - `cpu_cnt`: Pointer used to receive the number of CPUs.

- Return value: `OPERATE_RET` indicates the operation result. `OPRT_OK` indicates success, while any other value indicates an error. For detailed error codes, refer to `tuya_error_code.h`.

:::tip
This function is not supported in the current implementation. Calling it will return `OPRT_NOT_SUPPORTED`.
:::
