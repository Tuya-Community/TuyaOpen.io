---
title: tkl_watchdog | Watchdog Driver
description: "tkl_watchdog reference — TuyaOpen watchdog TKL API for init with interval, feeding, and deinit to reset on hang in embedded IoT development."
keywords:
  - tkl_watchdog
  - tuyaopen watchdog driver
  - tkl watchdog api
  - embedded watchdog
---

## Overview

A watchdog is a countdown timer that resets the processor when the program hangs or runs out of control, so execution restarts from the beginning.

The watchdog counter decrements from a reload value. While the program is healthy, it periodically reloads the counter — an operation called feeding the watchdog (`tkl_watchdog_refresh`). If the program stops feeding the watchdog and the counter reaches 0, the watchdog asserts a reset. Choose a feed interval comfortably shorter than the watchdog interval so a healthy program never triggers a false reset.

This driver exposes three functions: initialize the watchdog with an interval, feed it, and deinitialize it.

## tkl_watchdog_init

```c
uint32_t tkl_watchdog_init(TUYA_WDOG_BASE_CFG_T *cfg);
```

Initializes the watchdog from the configuration and returns the interval the hardware actually applied.

Parameters:

- `cfg`: Watchdog configuration.

  ```c
  typedef struct {
      uint32_t interval_ms; // Watchdog interval, in milliseconds
  } TUYA_WDOG_BASE_CFG_T;
  ```

Returns:

- `0` on error. A value greater than `0` is the actual watchdog interval applied by the hardware, which may differ from the requested `interval_ms`.

## tkl_watchdog_deinit

```c
OPERATE_RET tkl_watchdog_deinit(void);
```

Deinitializes the watchdog and stops it.

Parameters:

- None.

Returns:

- `OPRT_OK` on success. For other values, see `tuya_error_code.h`.

## tkl_watchdog_refresh

```c
OPERATE_RET tkl_watchdog_refresh(void);
```

Feeds the watchdog, reloading its counter.

Parameters:

- None.

Returns:

- `OPRT_OK` on success. For other values, see `tuya_error_code.h`.

## Example

```c
/* Initialize the watchdog */
TUYA_WDOG_BASE_CFG_T cfg;
uint32_t actual_interval_ms = 0;
cfg.interval_ms = 100;
actual_interval_ms = tkl_watchdog_init(&cfg);

if (actual_interval_ms) {
    /* The hardware applied actual_interval_ms */
} else {
    /* Initialization failed */
}

/* Feed the watchdog */
tkl_watchdog_refresh();

/* Deinitialize the watchdog */
tkl_watchdog_deinit();
```
