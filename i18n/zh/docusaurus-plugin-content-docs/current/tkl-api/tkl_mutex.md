---
title: "tkl_mutex | 互斥锁"
description: "tkl_mutex 参考 —— 用于在多任务环境中创建与管理递归互斥锁，支持持有线程多次加锁与配对解锁以同步共享资源访问的 TKL API。"
keywords:
  - tkl_mutex
  - TuyaOpen 互斥锁
  - RTOS 同步
  - 嵌入式驱动
---

`tkl_mutex` 接口用于在多任务环境中创建和管理递归互斥锁，以实现对共享资源的同步访问。它是各平台在其 RTOS 之上实现的内核抽象层（TKL）适配。这些函数创建的互斥锁均为递归锁：持有线程可多次加锁，并须对应解锁相同次数。

## 类型

```c
typedef void *TKL_MUTEX_HANDLE;
```

`TKL_MUTEX_HANDLE` 是互斥锁的不透明句柄。

## tkl_mutex_create_init

```c
OPERATE_RET tkl_mutex_create_init(TKL_MUTEX_HANDLE *pMutexHandle);
```

创建并初始化一个递归互斥锁。

| 参数 | 说明 |
| --- | --- |
| `pMutexHandle` | 输出参数，接收创建的互斥锁句柄。 |

- 返回值：`OPRT_OK` 表示成功，其他值则表示发生错误。详细错误代码请参考 `tuya_error_code.h`。

## tkl_mutex_lock

```c
OPERATE_RET tkl_mutex_lock(const TKL_MUTEX_HANDLE mutexHandle);
```

锁定一个递归互斥锁。若该互斥锁已被其他线程持有，调用线程将阻塞，直到其可用。

| 参数 | 说明 |
| --- | --- |
| `mutexHandle` | 互斥锁句柄。 |

- 返回值：`OPRT_OK` 表示成功，其他值则表示发生错误。详细错误代码请参考 `tuya_error_code.h`。

## tkl_mutex_trylock

```c
OPERATE_RET tkl_mutex_trylock(const TKL_MUTEX_HANDLE mutexHandle);
```

尝试锁定一个递归互斥锁，不会阻塞。无论是否获得锁都立即返回。

| 参数 | 说明 |
| --- | --- |
| `mutexHandle` | 互斥锁句柄。 |

- 返回值：`OPRT_OK` 表示成功，其他值则表示发生错误。详细错误代码请参考 `tuya_error_code.h`。

## tkl_mutex_unlock

```c
OPERATE_RET tkl_mutex_unlock(const TKL_MUTEX_HANDLE mutexHandle);
```

解锁调用线程先前锁定的递归互斥锁。

| 参数 | 说明 |
| --- | --- |
| `mutexHandle` | 互斥锁句柄。 |

- 返回值：`OPRT_OK` 表示成功，其他值则表示发生错误。详细错误代码请参考 `tuya_error_code.h`。

## tkl_mutex_release

```c
OPERATE_RET tkl_mutex_release(const TKL_MUTEX_HANDLE mutexHandle);
```

释放并删除一个递归互斥锁。

| 参数 | 说明 |
| --- | --- |
| `mutexHandle` | 互斥锁句柄。 |

- 返回值：`OPRT_OK` 表示成功，其他值则表示发生错误。详细错误代码请参考 `tuya_error_code.h`。

## 相关文档

- [线程与定时器模式](../peripheral/tutorials/thread-timer-patterns)
