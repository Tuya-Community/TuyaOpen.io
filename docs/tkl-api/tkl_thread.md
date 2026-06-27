---
title: "tkl_thread | Thread"
---

The `tkl_thread` interface creates, terminates, and inspects operating-system threads (tasks) in a multitasking environment. It is the kernel abstraction layer (TKL) port each platform implements on top of its RTOS; TAL and application code call it for portable task management.

## Types

```c
typedef void *TKL_THREAD_HANDLE;
typedef void (*THREAD_FUNC_T)(void *);
```

| Type | Description |
| --- | --- |
| `TKL_THREAD_HANDLE` | Opaque handle to a thread. |
| `THREAD_FUNC_T` | Thread entry function. Receives the `arg` passed at creation. |

Thread priority is one of the values defined in `tuya_cloud_types.h`, from `TKL_THREAD_PRI_LOWEST` (`0`) through `TKL_THREAD_PRI_NORMAL` (`4`) to `TKL_THREAD_PRI_HIGHEST` (`8`).

## tkl_thread_create

```c
OPERATE_RET tkl_thread_create(TKL_THREAD_HANDLE *thread, const char *name, uint32_t stack_size,
                              uint32_t priority, const THREAD_FUNC_T func, void *const arg);
```

Creates a thread.

| Parameter | Description |
| --- | --- |
| `thread` | Output parameter. Receives the handle of the created thread. |
| `name` | Thread name. |
| `stack_size` | Stack size of the thread, in bytes. |
| `priority` | Thread priority. See the priority values in `tuya_cloud_types.h`. |
| `func` | The main thread function. |
| `arg` | Argument passed to `func`. Can be `NULL`. |

- Return value: `OPRT_OK` on success. Any other value indicates an error; see `tuya_error_code.h`.

## tkl_thread_release

```c
OPERATE_RET tkl_thread_release(const TKL_THREAD_HANDLE thread);
```

Terminates a thread and releases its resources.

| Parameter | Description |
| --- | --- |
| `thread` | Handle of the thread to terminate. |

- Return value: `OPRT_OK` on success. Any other value indicates an error; see `tuya_error_code.h`.

## tkl_thread_get_watermark

```c
OPERATE_RET tkl_thread_get_watermark(const TKL_THREAD_HANDLE thread, uint32_t *watermark);
```

Gets the thread stack watermark (the minimum free stack space observed).

| Parameter | Description |
| --- | --- |
| `thread` | Thread handle. |
| `watermark` | Output parameter. Receives the watermark in bytes. |

- Return value: `OPRT_OK` on success. Any other value indicates an error; see `tuya_error_code.h`.

## tkl_thread_get_id

```c
OPERATE_RET tkl_thread_get_id(TKL_THREAD_HANDLE *thread);
```

Gets the handle of the calling thread.

| Parameter | Description |
| --- | --- |
| `thread` | Output parameter. Receives the current thread handle. |

- Return value: `OPRT_OK` on success. Any other value indicates an error; see `tuya_error_code.h`.

## tkl_thread_set_self_name

```c
OPERATE_RET tkl_thread_set_self_name(const char *name);
```

Sets the name of the calling thread.

| Parameter | Description |
| --- | --- |
| `name` | New name for the thread. |

- Return value: `OPRT_OK` on success. Any other value indicates an error; see `tuya_error_code.h`.

## tkl_thread_is_self

```c
OPERATE_RET tkl_thread_is_self(TKL_THREAD_HANDLE thread, BOOL_T *is_self);
```

Checks whether the specified thread is the calling thread.

| Parameter | Description |
| --- | --- |
| `thread` | Thread handle. |
| `is_self` | Output parameter. Set to `TRUE` if `thread` is the calling thread. |

- Return value: `OPRT_OK` on success. Any other value indicates an error; see `tuya_error_code.h`.

## tkl_thread_get_priority

```c
OPERATE_RET tkl_thread_get_priority(TKL_THREAD_HANDLE thread, int *priority);
```

Gets the priority of a thread.

| Parameter | Description |
| --- | --- |
| `thread` | Thread handle. `NULL` refers to the current thread. |
| `priority` | Output parameter. Receives the thread priority. |

- Return value: `OPRT_OK` on success. Any other value indicates an error; see `tuya_error_code.h`.

## tkl_thread_set_priority

```c
OPERATE_RET tkl_thread_set_priority(TKL_THREAD_HANDLE thread, int priority);
```

Sets the priority of a thread.

| Parameter | Description |
| --- | --- |
| `thread` | Thread handle. `NULL` refers to the current thread. |
| `priority` | New thread priority. |

- Return value: `OPRT_OK` on success. Any other value indicates an error; see `tuya_error_code.h`.

## tkl_thread_diagnose

```c
OPERATE_RET tkl_thread_diagnose(TKL_THREAD_HANDLE thread);
```

Diagnoses a thread, for example by dumping its task stack.

| Parameter | Description |
| --- | --- |
| `thread` | Thread handle. |

- Return value: `OPRT_OK` on success. Any other value indicates an error; see `tuya_error_code.h`.

## See also

- [Thread and Timer Patterns](../peripheral/tutorials/thread-timer-patterns)
