---
title: "TAL System API 参考"
description: "TAL System API（tal_system.h）提供与平台无关的系统工具：临界区、休眠与延时、计时、随机数、复位管理以及 PSRAM 分配接口。"
keywords:
  - TAL System
  - tal_system
  - 临界区
  - PSRAM
  - TuyaOpen API
---

TAL System API（`tal_system.h`）提供与平台无关的系统工具：临界区、休眠与延时、计时、随机数、复位管理以及 PSRAM 分配。

引入 `#include "tal_system.h"`（或 `#include "tal_api.h"` 以获得完整 TAL 接口）。

## 临界区

在 ISR 安全的代码路径中关闭中断以保护共享状态。

```c
uint32_t tal_system_enter_critical(void);
void tal_system_exit_critical(uint32_t irq_mask);
```

便捷宏：

```c
TAL_ENTER_CRITICAL();
/* 临界代码 —— 中断已关闭 */
TAL_EXIT_CRITICAL();
```

## 休眠与延时

### tal_system_sleep

让当前线程让出指定时长。在 RTOS 平台上使用 `vTaskDelay`。

```c
void tal_system_sleep(uint32_t time_ms);
```

:::note ESP32
最小休眠为 10 ms，低于 10 的值会被钳制为 10。
:::

### tal_system_delay

阻塞延时（不让出给其他线程）。请谨慎使用。

```c
void tal_system_delay(uint32_t time_ms);
```

## 计时

### tal_system_get_tick_count

获取系统 tick 计数（分辨率与平台相关）。

```c
SYS_TICK_T tal_system_get_tick_count(void);
```

### tal_system_get_millisecond

获取自启动以来的毫秒数。在 `UINT32_MAX` 处回绕（32 位约 49 天）。

```c
SYS_TIME_T tal_system_get_millisecond(void);
```

用无符号减法计算经过时间以正确处理回绕：

```c
SYS_TIME_T start = tal_system_get_millisecond();
/* ... 工作 ... */
SYS_TIME_T elapsed = tal_system_get_millisecond() - start;
```

## 随机数

### tal_system_get_random

获取范围 `[0, range)` 内的随机整数。

```c
int tal_system_get_random(uint32_t range);
```

在 ESP32 上使用 `esp_random()`（Wi-Fi/BT 激活时为硬件 RNG）。

:::warning
这不是加密级 RNG。对安全敏感的操作，请使用 `tal_security_*` 接口。
:::

## 系统复位

### tal_system_reset

执行软件复位。

```c
void tal_system_reset(void);
```

在 ESP32 上调用 `esp_restart()`。

### tal_system_get_reset_reason

获取上次复位的原因。

```c
TUYA_RESET_REASON_E tal_system_get_reset_reason(char **describe);
```

返回一个枚举值。`describe` 参数在 ESP32 上当前**未填充**（传入 `NULL` 或忽略）。

复位原因：`TUYA_RESET_REASON_POWERON`、`TUYA_RESET_REASON_HW_WDOG`、`TUYA_RESET_REASON_SW_WDOG`、`TUYA_RESET_REASON_SOFTWARE`、`TUYA_RESET_REASON_DEEPSLEEP`、`TUYA_RESET_REASON_FAULT`、`TUYA_RESET_REASON_UNKNOWN`。

## CPU 信息

### tal_system_get_cpu_info

```c
OPERATE_RET tal_system_get_cpu_info(TUYA_CPU_INFO_T **cpu_ary, int32_t *cpu_cnt);
```

:::note
在 ESP32 上返回 `OPRT_NOT_SUPPORTED`。如有需要请直接使用 `esp_chip_info()`。
:::

## PSRAM 分配

仅在 `ENABLE_EXT_RAM=1` 时可用（通常为带 PSRAM 的 ESP32-S3）。

```c
void *tal_psram_malloc(size_t size);
void  tal_psram_free(void *ptr);
void *tal_psram_calloc(size_t nitems, size_t size);
void *tal_psram_realloc(void *ptr, size_t size);
int   tal_psram_get_free_heap_size(void);
```

在 ESP32 上，`tal_psram_malloc` 使用 `heap_caps_malloc(size, MALLOC_CAP_SPIRAM)`。标准 `tal_malloc` 默认使用内部 RAM。

将 PSRAM 用于大缓冲区（音频、图像、AI 模型数据），以便为栈和 DMA 保留内部 RAM。

## 使用示例

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

## 参考资料

- [线程与定时器模式](thread-timer-patterns)
- [TKL System API](/docs/tkl-api/tkl_system)
- [TAL Wi-Fi API](tal-wifi-api)
