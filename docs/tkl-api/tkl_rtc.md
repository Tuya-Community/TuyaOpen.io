---
title: tkl_rtc | RTC Driver
description: "tkl_rtc reference — TuyaOpen real-time clock (RTC) driver TKL API for init, deinit, and setting/getting the UTC time in embedded IoT development."
keywords:
  - tkl_rtc
  - tuyaopen rtc driver
  - tkl rtc api
  - embedded rtc driver
---

## Overview

`tkl_rtc` is the TKL real-time clock (RTC) interface. An RTC keeps a one-second time base and tracks wall-clock time as a UTC timestamp in seconds, independent of the main program flow.

Most SoCs include an internal RTC hardware unit whose registers you set and read directly. Some SoCs extend the RTC through an external peripheral over I2C or SPI.

This driver exposes four functions: initialize and deinitialize the RTC, and set and get the current time.

## tkl_rtc_init

```c
OPERATE_RET tkl_rtc_init(void);
```

Initializes the RTC and returns the result.

Parameters:

- None.

Returns:

- `OPRT_OK` on success. For other values, see `tuya_error_code.h`.

## tkl_rtc_deinit

```c
OPERATE_RET tkl_rtc_deinit(void);
```

Deinitializes the RTC and stops it.

Parameters:

- None.

Returns:

- `OPRT_OK` on success. For other values, see `tuya_error_code.h`.

## tkl_rtc_time_set

```c
OPERATE_RET tkl_rtc_time_set(TIME_T time_sec);
```

Sets the RTC time.

Parameters:

- `time_sec`: A UTC time in seconds. `TIME_T` is defined as:

  ```c
  typedef unsigned int TIME_T;
  ```

Returns:

- `OPRT_OK` on success. For other values, see `tuya_error_code.h`.

## tkl_rtc_time_get

```c
OPERATE_RET tkl_rtc_time_get(TIME_T *time_sec);
```

Gets the current RTC time.

Parameters:

- `time_sec`: Pointer that receives the UTC time in seconds. `TIME_T` is defined as:

  ```c
  typedef unsigned int TIME_T;
  ```

Returns:

- `OPRT_OK` on success. For other values, see `tuya_error_code.h`.

## Example

```c
/* Initialize the RTC */
tkl_rtc_init();

/* Set the RTC time */
TIME_T time_sec_set = 0x1000000;
tkl_rtc_time_set(time_sec_set);

/* Get the RTC time */
TIME_T time_sec_get = 0;
tkl_rtc_time_get(&time_sec_get);

/* Deinitialize the RTC */
tkl_rtc_deinit();
```
