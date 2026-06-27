---
title: tkl_watchdog | Watchdog 驱动
---

## 概述

看门狗是一个倒计时定时器，当程序跑飞或硬件停滞时复位处理器，使程序从头开始执行。

看门狗计数器从重装载值开始递减。程序正常运行时，会定期重装载计数器，这一操作称为喂狗（`tkl_watchdog_refresh`）。如果程序停止喂狗，计数器递减到 0，看门狗便触发复位。喂狗间隔应明显短于看门狗间隔，避免正常运行的程序触发误复位。

本驱动提供三个函数：按指定间隔初始化看门狗、喂狗，以及反初始化看门狗。

## tkl_watchdog_init

```c
uint32_t tkl_watchdog_init(TUYA_WDOG_BASE_CFG_T *cfg);
```

根据配置初始化看门狗，并返回硬件实际应用的间隔。

参数：

- `cfg`：看门狗配置。

  ```c
  typedef struct {
      uint32_t interval_ms; // 看门狗间隔，单位毫秒
  } TUYA_WDOG_BASE_CFG_T;
  ```

返回值：

- 返回 `0` 表示出错。大于 `0` 的值为硬件实际应用的看门狗间隔，可能与请求的 `interval_ms` 不同。

## tkl_watchdog_deinit

```c
OPERATE_RET tkl_watchdog_deinit(void);
```

反初始化看门狗并停止看门狗。

参数：

- 无。

返回值：

- 成功返回 `OPRT_OK`，其他值请参考 `tuya_error_code.h`。

## tkl_watchdog_refresh

```c
OPERATE_RET tkl_watchdog_refresh(void);
```

喂狗，重装载看门狗计数器。

参数：

- 无。

返回值：

- 成功返回 `OPRT_OK`，其他值请参考 `tuya_error_code.h`。

## 示例

```c
/* 初始化看门狗 */
TUYA_WDOG_BASE_CFG_T cfg;
uint32_t actual_interval_ms = 0;
cfg.interval_ms = 100;
actual_interval_ms = tkl_watchdog_init(&cfg);

if (actual_interval_ms) {
    /* 硬件实际应用的看门狗间隔为 actual_interval_ms */
} else {
    /* 初始化失败 */
}

/* 喂狗 */
tkl_watchdog_refresh();

/* 反初始化看门狗 */
tkl_watchdog_deinit();
```
