---
title: "tkl_thread | 线程"
---

`tkl_thread` 接口用于在多任务环境中创建、终止和查询操作系统线程（任务）。它是各平台在其 RTOS 之上实现的内核抽象层（TKL）适配，TAL 与应用代码通过它实现可移植的任务管理。

## 类型

```c
typedef void *TKL_THREAD_HANDLE;
typedef void (*THREAD_FUNC_T)(void *);
```

| 类型 | 说明 |
| --- | --- |
| `TKL_THREAD_HANDLE` | 线程的不透明句柄。 |
| `THREAD_FUNC_T` | 线程入口函数，接收创建时传入的 `arg`。 |

线程优先级取自 `tuya_cloud_types.h` 中定义的值，从 `TKL_THREAD_PRI_LOWEST`（`0`）经 `TKL_THREAD_PRI_NORMAL`（`4`）到 `TKL_THREAD_PRI_HIGHEST`（`8`）。

## tkl_thread_create

```c
OPERATE_RET tkl_thread_create(TKL_THREAD_HANDLE *thread, const char *name, uint32_t stack_size,
                              uint32_t priority, const THREAD_FUNC_T func, void *const arg);
```

创建一个线程。

| 参数 | 说明 |
| --- | --- |
| `thread` | 输出参数，接收创建的线程句柄。 |
| `name` | 线程名称。 |
| `stack_size` | 线程栈大小，单位为字节。 |
| `priority` | 线程优先级，参见 `tuya_cloud_types.h` 中的优先级取值。 |
| `func` | 线程主函数。 |
| `arg` | 传递给 `func` 的参数，可为 `NULL`。 |

- 返回值：`OPRT_OK` 表示成功，其他值则表示发生错误。详细错误代码请参考 `tuya_error_code.h`。

## tkl_thread_release

```c
OPERATE_RET tkl_thread_release(const TKL_THREAD_HANDLE thread);
```

终止一个线程并释放其资源。

| 参数 | 说明 |
| --- | --- |
| `thread` | 待终止的线程句柄。 |

- 返回值：`OPRT_OK` 表示成功，其他值则表示发生错误。详细错误代码请参考 `tuya_error_code.h`。

## tkl_thread_get_watermark

```c
OPERATE_RET tkl_thread_get_watermark(const TKL_THREAD_HANDLE thread, uint32_t *watermark);
```

获取线程栈的水位（观测到的最小剩余栈空间）。

| 参数 | 说明 |
| --- | --- |
| `thread` | 线程句柄。 |
| `watermark` | 输出参数，接收水位值，单位为字节。 |

- 返回值：`OPRT_OK` 表示成功，其他值则表示发生错误。详细错误代码请参考 `tuya_error_code.h`。

## tkl_thread_get_id

```c
OPERATE_RET tkl_thread_get_id(TKL_THREAD_HANDLE *thread);
```

获取调用线程的句柄。

| 参数 | 说明 |
| --- | --- |
| `thread` | 输出参数，接收当前线程句柄。 |

- 返回值：`OPRT_OK` 表示成功，其他值则表示发生错误。详细错误代码请参考 `tuya_error_code.h`。

## tkl_thread_set_self_name

```c
OPERATE_RET tkl_thread_set_self_name(const char *name);
```

设置调用线程的名称。

| 参数 | 说明 |
| --- | --- |
| `name` | 线程的新名称。 |

- 返回值：`OPRT_OK` 表示成功，其他值则表示发生错误。详细错误代码请参考 `tuya_error_code.h`。

## tkl_thread_is_self

```c
OPERATE_RET tkl_thread_is_self(TKL_THREAD_HANDLE thread, BOOL_T *is_self);
```

判断指定线程是否为调用线程。

| 参数 | 说明 |
| --- | --- |
| `thread` | 线程句柄。 |
| `is_self` | 输出参数，若 `thread` 为调用线程则置为 `TRUE`。 |

- 返回值：`OPRT_OK` 表示成功，其他值则表示发生错误。详细错误代码请参考 `tuya_error_code.h`。

## tkl_thread_get_priority

```c
OPERATE_RET tkl_thread_get_priority(TKL_THREAD_HANDLE thread, int *priority);
```

获取线程的优先级。

| 参数 | 说明 |
| --- | --- |
| `thread` | 线程句柄，`NULL` 表示当前线程。 |
| `priority` | 输出参数，接收线程优先级。 |

- 返回值：`OPRT_OK` 表示成功，其他值则表示发生错误。详细错误代码请参考 `tuya_error_code.h`。

## tkl_thread_set_priority

```c
OPERATE_RET tkl_thread_set_priority(TKL_THREAD_HANDLE thread, int priority);
```

设置线程的优先级。

| 参数 | 说明 |
| --- | --- |
| `thread` | 线程句柄，`NULL` 表示当前线程。 |
| `priority` | 新的线程优先级。 |

- 返回值：`OPRT_OK` 表示成功，其他值则表示发生错误。详细错误代码请参考 `tuya_error_code.h`。

## tkl_thread_diagnose

```c
OPERATE_RET tkl_thread_diagnose(TKL_THREAD_HANDLE thread);
```

诊断线程，例如转储其任务栈。

| 参数 | 说明 |
| --- | --- |
| `thread` | 线程句柄。 |

- 返回值：`OPRT_OK` 表示成功，其他值则表示发生错误。详细错误代码请参考 `tuya_error_code.h`。

## 相关文档

- [线程与定时器模式](../peripheral/tutorials/thread-timer-patterns)
