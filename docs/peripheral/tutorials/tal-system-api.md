---
title: "TAL System API Reference"
---

# TAL System API Reference

The TAL System API (`tal_system.h`) provides platform-independent system utilities: critical sections, sleep/delay, timing, random numbers, reset management, and PSRAM allocation.

Header: `#include "tal_system.h"` (or `#include "tal_api.h"` for the full TAL surface)

## Critical Sections

Disable interrupts to protect shared state in ISR-safe code paths.

```c
uint32_t tal_system_enter_critical(void);
void tal_system_exit_critical(uint32_t irq_mask);
```

Convenience macros:

```c
TAL_ENTER_CRITICAL();
/* critical code -- interrupts disabled */
TAL_EXIT_CRITICAL();
```

## Sleep and Delay

### tal_system_sleep

Yield the current thread for the specified duration. Uses `vTaskDelay` on RTOS platforms.

```c
void tal_system_sleep(uint32_t time_ms);
```

:::note ESP32
Minimum sleep is 10 ms. Values below 10 are clamped to 10.
:::

### tal_system_delay

Blocking delay (does not yield to other threads). Use sparingly.

```c
void tal_system_delay(uint32_t time_ms);
```

## Timing

### tal_system_get_tick_count

Get the system tick count (platform-specific resolution).

```c
SYS_TICK_T tal_system_get_tick_count(void);
```

### tal_system_get_millisecond

Get milliseconds since boot. Wraps at `UINT32_MAX` (~49 days for 32-bit).

```c
SYS_TIME_T tal_system_get_millisecond(void);
```

Use unsigned subtraction for elapsed time to handle wrap correctly:

```c
SYS_TIME_T start = tal_system_get_millisecond();
/* ... work ... */
SYS_TIME_T elapsed = tal_system_get_millisecond() - start;
```

## Random Numbers

### tal_system_get_random

Get a random integer in the range `[0, range)`.

```c
int tal_system_get_random(uint32_t range);
```

Uses `esp_random()` on ESP32 (hardware RNG when Wi-Fi/BT is active).

:::warning
This is not a cryptographic RNG. For security-sensitive operations, use `tal_security_*` APIs.
:::

## System Reset

### tal_system_reset

Perform a software reset.

```c
void tal_system_reset(void);
```

Calls `esp_restart()` on ESP32.

### tal_system_get_reset_reason

Get the reason for the last reset.

```c
TUYA_RESET_REASON_E tal_system_get_reset_reason(char **describe);
```

Returns an enum value. The `describe` parameter is currently **not filled** on ESP32 (pass `NULL` or ignore).

Reset reasons: `TUYA_RESET_REASON_POWERON`, `TUYA_RESET_REASON_HW_WDOG`, `TUYA_RESET_REASON_SW_WDOG`, `TUYA_RESET_REASON_SOFTWARE`, `TUYA_RESET_REASON_DEEPSLEEP`, `TUYA_RESET_REASON_FAULT`, `TUYA_RESET_REASON_UNKNOWN`.

## CPU Info

### tal_system_get_cpu_info

```c
OPERATE_RET tal_system_get_cpu_info(TUYA_CPU_INFO_T **cpu_ary, int32_t *cpu_cnt);
```

:::note
Returns `OPRT_NOT_SUPPORTED` on ESP32. Use `esp_chip_info()` directly if needed.
:::

## PSRAM Allocation

Available only when `ENABLE_EXT_RAM=1` (typically ESP32-S3 with PSRAM).

```c
void *tal_psram_malloc(size_t size);
void  tal_psram_free(void *ptr);
void *tal_psram_calloc(size_t nitems, size_t size);
void *tal_psram_realloc(void *ptr, size_t size);
int   tal_psram_get_free_heap_size(void);
```

On ESP32, `tal_psram_malloc` uses `heap_caps_malloc(size, MALLOC_CAP_SPIRAM)`. Standard `tal_malloc` uses internal RAM by default.

Use PSRAM for large buffers (audio, image, AI model data) to preserve internal RAM for stack and DMA.

## Usage Example

```c
#include "tal_system.h"
#include "tal_log.h"

void system_info(void)
{
    TAL_PR_INFO("uptime: %u ms", tal_system_get_millisecond());
    TAL_PR_INFO("random: %d", tal_system_get_random(100));

    TUYA_RESET_REASON_E reason = tal_system_get_reset_reason(NULL);
    TAL_PR_INFO("last reset reason: %d", reason);

#if defined(ENABLE_EXT_RAM) && (ENABLE_EXT_RAM == 1)
    TAL_PR_INFO("PSRAM free: %d bytes", tal_psram_get_free_heap_size());
#endif
}
```

## References

- [Thread and Timer Patterns](thread-timer-patterns)
- [TKL System API](/docs/tkl-api/tkl_system)
- [TAL Wi-Fi API](tal-wifi-api)
