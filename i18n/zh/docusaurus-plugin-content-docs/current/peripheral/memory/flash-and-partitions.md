---
title: Flash、分区与容量
---

## 概述

在 **MCU** 目标上，固件、**OTA**、**授权**与 **应用持久化**（KV、LittleFS 或厂商文件系统）通常共享 **外部 Flash**（多为 NOR）。**TKL** 通过 **`tkl_flash_*`** 提供擦除/写入/读取。**Flash 容量** 与 **分区边界** 由 **开发板** 与 **产品** 决定：来自 **Kconfig**、**分区表** 与 **板级 BSP**，而不是应用代码里某个全局常量。

**读者对象：** 配置 **存储**、**OTA** 或 **KV** 的开发者，以及适配新 **Flash 容量** 的 BSP 作者。

## 先决条件

- [内存与存储概述](overview)
- [Kconfig 与工程配置](../tutorials/kconfig-and-project-configuration)（通过 `tos.py config menu` 切换与 Flash 相关的选项）

## 要求

- 使用原始 **`tkl_flash_*`** 偏移时必须符合板级 **分区方案**；错误范围可能导致 OTA 失败或 KV 损坏。

## TKL Flash API（参考层）

读/写/擦除与元数据见 **[TKL flash](../../tkl-api/tkl_flash)**：

- `tkl_flash_read` / `tkl_flash_write` / `tkl_flash_erase`
- `tkl_flash_get_one_type_info` — 按 **`TUYA_FLASH_TYPE_E`** 查询 **`TUYA_FLASH_BASE_INFO_T`** 中的布局信息

驱动与底层迁移可直接使用上述接口；应用侧 **键值** 持久化通常更简单的方式是使用 **[TAL KV](../tutorials/tal-kv-guide)**（典型端口下底层为 LittleFS）。

## 保留 Flash 与 `ENABLE_FLASH`

**移植**新板时，须为 TuyaOpen 预留 **独立 Flash 区域**（授权、配对数据、文件系统等）。参见 [移植平台](../../new-hardware/porting-platform)：

- **`ENABLE_FLASH`** — 必须打开；选取不与主固件镜像重叠、且满足 **擦除粒度** 的未使用区间。
- **`ENABLE_FILE_SYSTEM`** — 若关闭，TuyaOpen 可能使用片内 **LittleFS**，其基址与大小由适配中的 **`tkl_flash.c`** 提供。

## Flash 容量变更（不同料号 / BOM）

1. **硬件：** 更换 SPI NOR 容量（例如 4 MB → 8 MB）— 更新 **原理图**、必要时 **引脚/Strap**，并核对 **数据手册** 限制。
2. **软件：** 更新 `TuyaOpen/boards/<platform>/<board>/` 下的 **分区表** 与 **Kconfig** 默认值（以及端口使用的 **CSV** 或 **IDF** 风格布局）。
3. **适配：** 实现或扩展 **`tkl_flash_get_one_type_info`**，使上报的 **基址 + 大小** 与新布局一致；若预设配置内嵌容量，需重新执行 **`tos.py config choice`** / **`menu`**。
4. **验证：** OTA 槽、**KV** 分区与 **出厂数据** 仍须放得下；在开发板上跑通 OTA 与 KV 测试。

勿在应用层硬编码 **Flash 末端** 等魔数；应通过 **TKL** 信息或高层 TAL API 推导。

## OTA 与 `tkl_ota`

固件升级流程使用 **TKL OTA** 接口（侧栏 `tkl_ota`）。OTA 镜像须落在该产品定义的 **OTA 分区** 内。参见 [TKL OTA](../../tkl-api/tkl_ota) 及对应平台的 OTA 文档。

## Linux 与块设备

在 **Linux** 上，TKL 层的「Flash」可能实现为：

- 已挂载文件系统上的 **文件**（eMMC、SD、NVMe），或
- 映射到同一读/写/擦除约定的 **mtd** 块设备。

若与 MCU 共用代码路径，仍应优先走 **TAL/TKL**；仅在 **板级指南** 明确说明时使用 POSIX 文件 I/O。**DDR** 存放运行镜像与堆；**eMMC** 不会在没有适配定义映射的情况下，通过 `tkl_flash_write` 按字节随意访问。

## 预期结果

你能区分 **TKL 原始 Flash** 与 **TAL KV** 的使用场景，知道 **Flash 容量** 变化时要改 **Kconfig/分区/适配** 中的哪些部分，并优先用 **`tkl_flash_get_one_type_info`** 获取布局而非魔数。

## 参考

- [内存与存储概述](overview)
- [TKL flash](../../tkl-api/tkl_flash)
- [TKL OTA](../../tkl-api/tkl_ota)
- [TAL KV 指南](../tutorials/tal-kv-guide)
- [移植平台](../../new-hardware/porting-platform)
- [堆分配与 PSRAM](heap-allocation-and-psram)
