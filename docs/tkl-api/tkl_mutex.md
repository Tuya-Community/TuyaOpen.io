---
title: "tkl_mutex | Mutex"
---

The `tkl_mutex` interface creates and manages recursive mutexes for synchronized access to shared resources in a multitasking environment. It is the kernel abstraction layer (TKL) port each platform implements on top of its RTOS. Every mutex created by these functions is recursive: the owning thread can lock it more than once and must unlock it the same number of times.

## Types

```c
typedef void *TKL_MUTEX_HANDLE;
```

`TKL_MUTEX_HANDLE` is an opaque handle to a mutex.

## tkl_mutex_create_init

```c
OPERATE_RET tkl_mutex_create_init(TKL_MUTEX_HANDLE *pMutexHandle);
```

Creates and initializes a recursive mutex.

| Parameter | Description |
| --- | --- |
| `pMutexHandle` | Output parameter. Receives the created mutex handle. |

- Return value: `OPRT_OK` on success. Any other value indicates an error; see `tuya_error_code.h`.

## tkl_mutex_lock

```c
OPERATE_RET tkl_mutex_lock(const TKL_MUTEX_HANDLE mutexHandle);
```

Locks a recursive mutex. If the mutex is held by another thread, the calling thread blocks until it becomes available.

| Parameter | Description |
| --- | --- |
| `mutexHandle` | Mutex handle. |

- Return value: `OPRT_OK` on success. Any other value indicates an error; see `tuya_error_code.h`.

## tkl_mutex_trylock

```c
OPERATE_RET tkl_mutex_trylock(const TKL_MUTEX_HANDLE mutexHandle);
```

Tries to lock a recursive mutex without blocking. Returns immediately whether or not the lock was acquired.

| Parameter | Description |
| --- | --- |
| `mutexHandle` | Mutex handle. |

- Return value: `OPRT_OK` on success. Any other value indicates an error; see `tuya_error_code.h`.

## tkl_mutex_unlock

```c
OPERATE_RET tkl_mutex_unlock(const TKL_MUTEX_HANDLE mutexHandle);
```

Unlocks a recursive mutex previously locked by the calling thread.

| Parameter | Description |
| --- | --- |
| `mutexHandle` | Mutex handle. |

- Return value: `OPRT_OK` on success. Any other value indicates an error; see `tuya_error_code.h`.

## tkl_mutex_release

```c
OPERATE_RET tkl_mutex_release(const TKL_MUTEX_HANDLE mutexHandle);
```

Releases and deletes a recursive mutex.

| Parameter | Description |
| --- | --- |
| `mutexHandle` | Mutex handle. |

- Return value: `OPRT_OK` on success. Any other value indicates an error; see `tuya_error_code.h`.

## See also

- [Thread and Timer Patterns](../peripheral/tutorials/thread-timer-patterns)
