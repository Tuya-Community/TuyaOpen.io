---
title: "tkl_semaphore | Semaphore"
---

The `tkl_semaphore` interface creates and manages counting semaphores for task synchronization and event notification in a multitasking environment. It is the kernel abstraction layer (TKL) port each platform implements on top of its RTOS.

## Types

```c
typedef void *TKL_SEM_HANDLE;
#define TKL_SEM_WAIT_FOREVER 0xFFFFffff
```

| Symbol | Description |
| --- | --- |
| `TKL_SEM_HANDLE` | Opaque handle to a semaphore. |
| `TKL_SEM_WAIT_FOREVER` | Timeout value for `tkl_semaphore_wait` that blocks until the semaphore is acquired. |

## tkl_semaphore_create_init

```c
OPERATE_RET tkl_semaphore_create_init(TKL_SEM_HANDLE *handle, uint32_t sem_cnt, uint32_t sem_max);
```

Creates and initializes a counting semaphore.

| Parameter | Description |
| --- | --- |
| `handle` | Output parameter. Receives the created semaphore handle. |
| `sem_cnt` | Initial count of the semaphore. |
| `sem_max` | Maximum count of the semaphore. |

- Return value: `OPRT_OK` on success. Any other value indicates an error; see `tuya_error_code.h`.

## tkl_semaphore_wait

```c
OPERATE_RET tkl_semaphore_wait(const TKL_SEM_HANDLE handle, uint32_t timeout);
```

Waits on a semaphore, decrementing its count when one is acquired.

| Parameter | Description |
| --- | --- |
| `handle` | Semaphore handle. |
| `timeout` | Wait timeout in milliseconds. `TKL_SEM_WAIT_FOREVER` blocks until the semaphore is acquired. |

- Return value: `OPRT_OK` on success. `OPRT_OS_ADAPTER_SEM_WAIT_TIMEOUT` indicates a timeout. Any other value indicates an error; see `tuya_error_code.h`.

## tkl_semaphore_post

```c
OPERATE_RET tkl_semaphore_post(const TKL_SEM_HANDLE handle);
```

Posts (signals) a semaphore, incrementing its count.

| Parameter | Description |
| --- | --- |
| `handle` | Semaphore handle. |

- Return value: `OPRT_OK` on success. Any other value indicates an error; see `tuya_error_code.h`.

## tkl_semaphore_release

```c
OPERATE_RET tkl_semaphore_release(const TKL_SEM_HANDLE handle);
```

Releases and deletes a semaphore.

| Parameter | Description |
| --- | --- |
| `handle` | Semaphore handle. |

- Return value: `OPRT_OK` on success. Any other value indicates an error; see `tuya_error_code.h`.

## See also

- [Thread and Timer Patterns](../peripheral/tutorials/thread-timer-patterns)
