---
title: tkl_rtc | RTC 驱动
---

## 概述

`tkl_rtc` 是 TKL 的实时时钟（RTC）接口。RTC 维持一秒的时基，并以 UTC 秒数的形式跟踪时钟时间，与主程序流程相互独立。

大多数 SoC 内置 RTC 硬件单元，可直接操作其寄存器来设置和读取 RTC 时间。部分 SoC 也可以通过 I2C 或 SPI 接口外扩 RTC 外设。

本驱动提供四个函数：初始化与反初始化 RTC，以及设置与获取当前时间。

## tkl_rtc_init

```c
OPERATE_RET tkl_rtc_init(void);
```

初始化 RTC 并返回结果。

参数：

- 无。

返回值：

- 成功返回 `OPRT_OK`，其他值请参考 `tuya_error_code.h`。

## tkl_rtc_deinit

```c
OPERATE_RET tkl_rtc_deinit(void);
```

反初始化 RTC 并停止 RTC。

参数：

- 无。

返回值：

- 成功返回 `OPRT_OK`，其他值请参考 `tuya_error_code.h`。

## tkl_rtc_time_set

```c
OPERATE_RET tkl_rtc_time_set(TIME_T time_sec);
```

设置 RTC 时间。

参数：

- `time_sec`：以秒为单位的 UTC 时间。`TIME_T` 定义如下：

  ```c
  typedef unsigned int TIME_T;
  ```

返回值：

- 成功返回 `OPRT_OK`，其他值请参考 `tuya_error_code.h`。

## tkl_rtc_time_get

```c
OPERATE_RET tkl_rtc_time_get(TIME_T *time_sec);
```

获取当前 RTC 时间。

参数：

- `time_sec`：接收 UTC 时间（秒）的指针。`TIME_T` 定义如下：

  ```c
  typedef unsigned int TIME_T;
  ```

返回值：

- 成功返回 `OPRT_OK`，其他值请参考 `tuya_error_code.h`。

## 示例

```c
/* 初始化 RTC */
tkl_rtc_init();

/* 设置 RTC 时间 */
TIME_T time_sec_set = 0x1000000;
tkl_rtc_time_set(time_sec_set);

/* 获取 RTC 时间 */
TIME_T time_sec_get = 0;
tkl_rtc_time_get(&time_sec_get);

/* 反初始化 RTC */
tkl_rtc_deinit();
```
