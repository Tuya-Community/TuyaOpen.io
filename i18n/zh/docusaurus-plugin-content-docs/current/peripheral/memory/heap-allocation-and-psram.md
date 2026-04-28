---
title: 堆分配与 PSRAM
---

## 概述

TuyaOpen 应用通过 **TAL**（`tal_memory.h` / `tal_api.h`）进行动态内存分配。在带 **外部 PSRAM** 的芯片上，Kconfig 可打开 **`ENABLE_EXT_RAM`**，部分子系统与便捷宏会切换到 **`tal_psram_*`**，避免大块缓冲挤占稀缺的 **片上 SRAM**。

**读者对象：** 在 **带 SPIRAM 的 ESP32** 等支持 `ENABLE_EXT_RAM` 的目标上开发应用与中间件；Linux 开发者可将本文视为可移植 API 说明（底层映射为端口的 `malloc`）。

## 先决条件

- [内存与存储概述](overview)
- [TAL 系统 API 参考](../tutorials/tal-system-api)（与同族头文件中的 PSRAM 辅助说明）

## 要求

- 头文件：`#include "tal_memory.h"` 或按工程惯例 `#include "tal_api.h"`。
- 使用 **PSRAM** 系列 API：在解析后的 Kconfig / `app_default.config` 路径中 **`ENABLE_EXT_RAM`** 须为 **1**，且硬件须具备 PSRAM（常见于带 SPIRAM 的 **ESP32-S3** 模组）。

## 片上堆（`tal_malloc` 族）

```c
void *tal_malloc(size_t size);
void  tal_free(void *ptr);
void *tal_calloc(size_t nitems, size_t size);
void *tal_realloc(void *ptr, size_t size);
int   tal_system_get_free_heap_size(void);
```

一般对象、小型队列以及应留在 **快速片上 RAM** 的数据（DMA 约束、Wi-Fi/蓝牙底层等仍由端口定义）使用 **`tal_malloc` / `tal_free`**。

`tal_system_get_free_heap_size()` 在典型 RTOS 端口上报告 **片上** 剩余堆（见 [TAL 系统 API](../tutorials/tal-system-api)）。

## PSRAM 堆（`tal_psram_*`、`ENABLE_EXT_RAM`）

当 **`ENABLE_EXT_RAM`** 为 **1** 时，以下 API 可用（见 `TuyaOpen/src/tal_system/include/tal_memory.h`）：

```c
void *tal_psram_malloc(size_t size);
void  tal_psram_free(void *ptr);
void *tal_psram_calloc(size_t nitems, size_t size);
void *tal_psram_realloc(void *ptr, size_t size);
```

在 **ESP32** 上，`tal_psram_malloc` 在适配层中映射为 **`heap_caps_malloc(..., MALLOC_CAP_SPIRAM)`** — 大块 TLS 会话结构、音频环形区、AI 流水线等在启用时常走该路径。

同一头文件中，便捷宏 **`Malloc` / `Calloc` / `Free`** 在 `ENABLE_EXT_RAM` 为 1 时展开为 **`tal_psram_*`**，否则为 **`tal_malloc`** / **`tal_calloc`** / **`tal_free`**。SDK 内部分模块（如 TLS、部分 AI 服务）会显式判断 **`ENABLE_EXT_RAM`**；新增大块分配时请沿用相同模式。

:::note
若端口提供 `tal_psram_get_free_heap_size()`，可与片上堆查询配合使用 — 见 [TAL 系统 API](../tutorials/tal-system-api)。
:::

## SRAM 与 PSRAM 的选择

| 优先使用片上 `tal_malloc` | 在启用时优先 `tal_psram_*` |
|---------------------------|----------------------------|
| 小而频繁的分配 | 大且长期存在的缓冲（音频、图像、模型临时区） |
| 对延迟敏感的路径 | 可接受 SPIRAM 延迟的批量数据 |
| **仅支持从片上 RAM DMA** 的外设驱动 | SDK 示例中已迁移到 PSRAM 的 TLS / AI 缓冲 |

务必核对芯片 **DMA 能力**：并非所有外设都能从 PSRAM 做 DMA。

## 显示与多媒体

显示栈可能按配置在 **SRAM 或 PSRAM** 中申请帧缓冲。参见 [显示](../display) 中 `tal_display_framebuffer_create` 与内存类型参数。

## 预期结果

你能根据 **`ENABLE_EXT_RAM`** 与板级能力在 **`tal_malloc`** 与 **`tal_psram_malloc`** 之间一致地选型，并知道在有无 PSRAM 的板子间切换时应检查哪些 Kconfig。

## 参考

- [内存与存储概述](overview)
- [TAL 系统 API](../tutorials/tal-system-api)
- [Flash、分区与容量](flash-and-partitions)（持久化；与堆分离）
- 源码：`TuyaOpen/src/tal_system/include/tal_memory.h`
