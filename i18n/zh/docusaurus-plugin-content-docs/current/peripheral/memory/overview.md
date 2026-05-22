---
title: 内存与存储概述
---

## 概述

TuyaOpen 可运行在 **MCU 类开发板**（涂鸦 T 系列、ESP32 等）以及 **Linux 类目标机**上。两类平台的内存与存储形态不同：MCU 通常具备片上 **SRAM**、可选 **PSRAM**，以及 **外部 NOR Flash**；Linux 目标机一般使用 **DDR** 与 **块设备存储**（eMMC、SD 卡或根文件系统），由适配层将相同 TAL 抽象映射到具体实现。

本小节包含三篇指南：

1. **[堆分配与 PSRAM](heap-allocation-and-psram)** — `tal_malloc`、`tal_psram_*`、`ENABLE_EXT_RAM`，以及何时使用片上 RAM 与 PSRAM。
2. **[Flash、分区与容量](flash-and-partitions)** — 通过 **TKL** 访问原始 Flash、保留区、KV/LittleFS，以及 **Flash 容量** 与 **分区布局** 的关系。
3. 本文 — **概念**与**按平台对照**，便于在调缓冲区、分区或移植存储前建立整体认识。

**读者对象：** 在 T5 / ESP32 / Linux 上做固件开发、需要理解存储层次再动手调参的开发者。

## 先决条件

- 已完成 [环境搭建](../../quick-start/enviroment-setup)，并能成功编译工程。
- 建议浏览 [TAL 系统 API 参考](../tutorials/tal-system-api)（复位、时间，以及在启用 `ENABLE_EXT_RAM` 时的 **PSRAM** 相关说明）。

## 要求

- 明确 **目标硬件**（如 T5AI-Core、ESP32-S3、Linux SBC 等）。具体 RAM、Flash 容量以 **开发板** 与 **Kconfig** 为准，本文不替代数据手册。

## 内存类型（嵌入式 MCU）

| 类型 | 在 TuyaOpen 中的典型用途 | API / 配置 |
|------|--------------------------|------------|
| **片上 SRAM** | 栈、小型 DMA 缓冲区、对延迟敏感的数据 | `tal_malloc` / `tal_free` / `tal_calloc` / `tal_realloc`（`tal_memory.h`） |
| **PSRAM**（若硬件具备） | 大块音频、图形、TLS、AI 工作缓冲 | 在 **`ENABLE_EXT_RAM`** 打开时使用 `tal_psram_malloc` 等；见 [堆分配与 PSRAM](heap-allocation-and-psram) |
| **外部 NOR Flash** | 固件、OTA 镜像、**KV / LittleFS** 用户区 | **TKL** `tkl_flash_*`；持久化模式见 [Flash、分区与容量](flash-and-partitions) 与 [TAL KV 指南](../tutorials/tal-kv-guide) |

在 MCU 上，**DDR** 与 **eMMC** 通常不是 TAL 中单独的「malloc 目标」；在 **Linux** 上，进程堆由内核分配器管理，而类似 **Flash** 的持久化可能通过文件系统或块设备在 TKL 中实现。

## 平台说明（T5 / ESP32 / Linux）

### 涂鸦 T 系列（例如 T5AI 上 RTOS）

- **片上 RAM**、**可选外扩 RAM**（取决于 SoC 与硬件）与 **SPI NOR**（或同类）用于代码与数据紧密协同。
- 分区表与 **Flash 容量** 因板级与 **Kconfig** 而异；须与 `TuyaOpen/boards/` 下 BSP 及产品 **Flash 几何信息** 一致。

### 乐鑫 ESP32（ESP32、ESP32-S3 等）

- 默认 `tal_malloc` 使用 **片上 SRAM**。
- 模组暴露 SPIRAM 且配置 **`ENABLE_EXT_RAM=1`** 时使用 **PSRAM** — Wi-Fi 协议栈、可选 TLS、AI、大块显示路径等常走该通道。详见 `tal_system.h` / `tal_memory.h` 与 [堆分配与 PSRAM](heap-allocation-and-psram)。
- **Flash** 容量与分区布局来自与 ESP-IDF 风格融合的配置；仍通过 **TKL Flash** 与应用层 **KV** 呈现。

### Linux（树莓派、DshanPi 等）

- **堆：** 操作系统虚拟内存（DDR）；应用侧继续使用 `tal_malloc` 作为可移植入口，底层在适配中映射为 `malloc`/`free`。
- **「Flash」语义：** 常为 **ext4 等文件系统上的文件** 或专用分区，而非 MCU 上单一物理偏移；TKL 将读/写/擦除语义映射到厂商实现。除非板级文档说明，否则勿将 MCU 上的 **分区 CSV** 直接套用到 Linux 端口。
- **eMMC / SD：** 由操作系统作为块设备管理；应用若与 MCU 共用代码路径，应优先使用文档中约定的 **TAL/TKL**；仅在板级指南允许时使用 POSIX 文件 API。

## 显示与多媒体缓冲区

帧缓冲可能按显示驱动配置从 **SRAM 或 PSRAM** 分配。参见 [显示](../display) 中关于帧缓冲与内存类型的说明。

## 预期结果

你能说明当前功能在 **目标平台** 上使用的是哪一类 **内存** 与哪一层 **持久化**，并正确打开 [堆…](heap-allocation-and-psram) 或 [Flash…](flash-and-partitions)，或继续查阅 [TAL KV](../tutorials/tal-kv-guide) / [TKL flash](../../tkl-api/tkl_flash)。

## 参考

- [堆分配与 PSRAM](heap-allocation-and-psram)
- [Flash、分区与容量](flash-and-partitions)
- [TAL 系统 API](../tutorials/tal-system-api)
- [TAL KV 指南](../tutorials/tal-kv-guide)
- [TKL flash](../../tkl-api/tkl_flash)
- [Kconfig 与工程配置](../tutorials/kconfig-and-project-configuration)
- [移植平台](../../new-hardware/porting-platform)（`ENABLE_FLASH`、文件系统说明）
