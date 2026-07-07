---
title: "tkl_semaphore | 信号量"
description: "tkl_semaphore 参考 —— 用于在多任务环境中创建与管理计数信号量以实现任务同步或事件通知的信号量 TKL API。"
keywords:
  - tkl_semaphore
  - TuyaOpen 信号量
  - RTOS 同步
  - 嵌入式驱动
---

`tkl_semaphore` 接口用于在多任务环境中创建和管理计数信号量，以实现任务间同步或事件通知。它是各平台在其 RTOS 之上实现的内核抽象层（TKL）适配。

## 类型

```c
typedef void *TKL_SEM_HANDLE;
#define TKL_SEM_WAIT_FOREVER 0xFFFFffff
```

| 符号 | 说明 |
| --- | --- |
| `TKL_SEM_HANDLE` | 信号量的不透明句柄。 |
| `TKL_SEM_WAIT_FOREVER` | `tkl_semaphore_wait` 的超时取值，表示一直阻塞直到获得信号量。 |

## tkl_semaphore_create_init

```c
OPERATE_RET tkl_semaphore_create_init(TKL_SEM_HANDLE *handle, uint32_t sem_cnt, uint32_t sem_max);
```

创建并初始化一个计数信号量。

| 参数 | 说明 |
| --- | --- |
| `handle` | 输出参数，接收创建的信号量句柄。 |
| `sem_cnt` | 信号量的初始计数。 |
| `sem_max` | 信号量的最大计数。 |

- 返回值：`OPRT_OK` 表示成功，其他值则表示发生错误。详细错误代码请参考 `tuya_error_code.h`。

## tkl_semaphore_wait

```c
OPERATE_RET tkl_semaphore_wait(const TKL_SEM_HANDLE handle, uint32_t timeout);
```

等待一个信号量，获得时其计数减一。

| 参数 | 说明 |
| --- | --- |
| `handle` | 信号量句柄。 |
| `timeout` | 等待超时时间，单位为毫秒。`TKL_SEM_WAIT_FOREVER` 表示一直阻塞直到获得信号量。 |

- 返回值：`OPRT_OK` 表示成功，`OPRT_OS_ADAPTER_SEM_WAIT_TIMEOUT` 表示发生超时，其他值则表示发生错误。详细错误代码请参考 `tuya_error_code.h`。

## tkl_semaphore_post

```c
OPERATE_RET tkl_semaphore_post(const TKL_SEM_HANDLE handle);
```

发送（释放）一个信号量，使其计数加一。

| 参数 | 说明 |
| --- | --- |
| `handle` | 信号量句柄。 |

- 返回值：`OPRT_OK` 表示成功，其他值则表示发生错误。详细错误代码请参考 `tuya_error_code.h`。

## tkl_semaphore_release

```c
OPERATE_RET tkl_semaphore_release(const TKL_SEM_HANDLE handle);
```

释放并删除一个信号量。

| 参数 | 说明 |
| --- | --- |
| `handle` | 信号量句柄。 |

- 返回值：`OPRT_OK` 表示成功，其他值则表示发生错误。详细错误代码请参考 `tuya_error_code.h`。

## 相关文档

- [线程与定时器模式](../peripheral/tutorials/thread-timer-patterns)
