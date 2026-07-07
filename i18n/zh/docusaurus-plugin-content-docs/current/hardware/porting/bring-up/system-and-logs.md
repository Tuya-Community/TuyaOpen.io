---
title: "Bring-up 1：系统与日志"
description: "移植 bring-up 第一阶段：把芯片 RTOS 与一路 UART 映射到 TuyaOpen OS 抽象层，使系统能启动、运行线程定时器并打印日志。"
keywords:
  - 移植
  - 系统适配
  - RTOS
  - UART 日志
  - TuyaOpen 硬件
---

第一个 bring-up 阶段把你的芯片 RTOS 和一路 UART 映射到 TuyaOpen 的 OS 抽象层，使系统能够启动并打印日志。之后的所有工作都依赖于此——如果线程、定时器和控制台无法正常工作，你就无法调试后续各个阶段。

## 目标

TuyaOpen 在你的芯片上启动，其 OS 原语（线程、互斥锁、信号量、队列、定时器、堆）运行在你的 RTOS 之上，并且 TuyaOpen 的日志输出能够通过一路 UART 显示。

## 需要实现的文件

当你运行 `tos.py new platform` 时，这些适配文件会在 `platform/<your_chip>/tuyaos/` 目录下生成。请通过调用你的芯片 SDK / RTOS 来实现每一个文件。

| 文件 | 你需要实现的内容 |
|------|--------------------|
| `tkl_system.c` | 复位、毫秒/tick 时间、随机数种子、临界区进入/退出、CPU 信息 |
| `tkl_memory.c` | 基于你的堆实现 `malloc` / `free` / `realloc` |
| `tkl_thread.c` | 在你的 RTOS 上创建/销毁线程，优先级映射 |
| `tkl_mutex.c` | 互斥锁的创建 / 加锁 / 解锁（递归） |
| `tkl_semaphore.c` | 信号量的创建 / 等待 / 释放 |
| `tkl_queue.c` | 消息队列的创建 / 发送 / 接收 |
| `tkl_timer.c` | 带 ISR 回调的硬件或软件定时器 |
| `tkl_output.c` | 将 TuyaOpen 日志路由到你的控制台（通常是 UART `printf`） |
| `tkl_uart.c` | UART 初始化 / 读 / 写——现在承载日志，后续承载调试信息 |

## 细节

- **先搞定时间基准。** `tkl_system_get_millisecond` / tick 必须准确——定时器、超时和云端心跳都依赖于它。
- **临界区**（`tkl_system_enter_critical`）必须真正禁用抢占/中断；许多后续出现的竞态问题都可以追溯到这里的空实现。
- **`tkl_output` 是最小且有用的里程碑。** 尽早把它接到你的 UART `printf`，这样后续整个 bring-up 过程都是可观测的。
- **线程优先级映射。** TuyaOpen 使用 `TKL_THREAD_PRI_LOWEST … HIGHEST`；请把这些映射到你的 RTOS 优先级体系上。
- 从最接近你的 RTOS 的[参考移植](../bring-your-chip-to-tuyaopen)文件入手，替换其中的 SDK 调用。

## 验证

构建 `apps/tuya_cloud/switch_demo`（关闭连接功能也可以），烧录并启动。当 TuyaOpen 启动横幅和周期性日志能够通过你的 UART 干净地打印出来，并且设备不崩溃、不卡死时，即为成功。

下一步：[Bring-up 2：Flash 与存储](flash-and-storage)。

## 参见

- [系统 API 参考](../../../tkl-api/tkl_system)
- [将你的芯片接入 TuyaOpen](../bring-your-chip-to-tuyaopen)
