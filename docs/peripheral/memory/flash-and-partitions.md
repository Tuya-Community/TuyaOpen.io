---
title: Flash, partitions, and capacity
---

## Overview

On **MCU** targets, firmware, **OTA**, **authorization**, and **application persistence** (KV, LittleFS, or vendor FS) share **external flash** (typically NOR). **TKL** exposes erase/write/read through **`tkl_flash_*`**. **Flash size** and **partition boundaries** are board- and product-specific: they come from **Kconfig**, **partition tables**, and the **board BSP**, not from a single global constant in application code.

**Audience:** Developers configuring **storage**, **OTA**, or **KV**, and BSP authors adapting a new **flash size**.

## Prerequisites

- [Memory and storage overview](overview)
- [Kconfig and project configuration](../tutorials/kconfig-and-project-configuration) for `tos.py config menu` when toggling flash-related options.

## Requirements

- For **Tuya Cloud** or activation-related storage, follow product **license / authorization** docs where applicable.
- Raw **`tkl_flash_*`** offsets must respect the **partition plan** for your board; wrong ranges brick OTA or corrupt KV.

## TKL flash API (reference layer)

Read/write/erase and metadata are documented under **[TKL flash](../../tkl-api/tkl_flash)**:

- `tkl_flash_read` / `tkl_flash_write` / `tkl_flash_erase`
- `tkl_flash_get_one_type_info` — query layout for a **`TUYA_FLASH_TYPE_E`** entry into **`TUYA_FLASH_BASE_INFO_T`**

Use these from drivers and low-level migration; application **key–value** persistence is usually easier through **[TAL KV](../tutorials/tal-kv-guide)** (LittleFS under the hood on typical ports).

## Reserved flash and `ENABLE_FLASH`

When **porting** a new board, you must reserve a **dedicated flash region** for TuyaOpen (authorization, pairing data, filesystem). See [Porting platform](../../new-hardware/porting-platform):

- **`ENABLE_FLASH`** — must be enabled; pick an unused range that does not overlap the main firmware image and respects **erase granularity**.
- **`ENABLE_FILE_SYSTEM`** — if disabled, TuyaOpen may use internal **LittleFS** whose base/size are supplied by **`tkl_flash.c`** in the adaptation.

## Flash size changes (different parts / BOM)

1. **Hardware:** New SPI NOR density (for example 4 MB → 8 MB) — update **schematics**, **pin strapping** if any, and **datasheet** limits.
2. **Software:** Partition table and **Kconfig** defaults in the **board** tree under `TuyaOpen/boards/<platform>/<board>/` (and any **CSV** or **IDF**-style layout your port uses).
3. **Adapter:** Implement or extend **`tkl_flash_get_one_type_info`** so reported **base + size** match the new layout; re-run **`tos.py config choice`** / **`menu`** if preset configs embed sizes.
4. **Validation:** OTA slot sizes, **KV** partition, and **factory** data must still fit; run OTA and KV tests on a dev unit.

Do not hard-code absolute end-of-flash addresses in application code; derive from **TKL** info or high-level TAL APIs.

## OTA and `tkl_ota`

Firmware upgrade flows use the **TKL OTA** surface (`tkl_ota` in the sidebar). OTA images must fit the **OTA partition** defined for that product. See [TKL OTA](../../tkl-api/tkl_ota) and your platform’s OTA documentation.

## Linux and block storage

On **Linux** targets, “flash” at the TKL level may be implemented as:

- A **file** on a mounted filesystem (eMMC, SD, NVMe), or
- A **mtd** block device mapped to the same read/write/erase contract.

Application code should still go through **TAL/TKL** when sharing code with MCU builds; POSIX file I/O is valid only where the **board guide** documents it. **DDR** holds the running image and heap; **eMMC** is not accessed through `tkl_flash_write` byte-by-byte without an adapter that defines the mapping.

## Expected outcome

You know which **API layer** (TKL raw flash vs TAL KV), which **Kconfig / partition** artifacts to change when **flash size** changes, and when to read **layout** from **`tkl_flash_get_one_type_info`** instead of magic numbers.

## References

- [Memory and storage overview](overview)
- [TKL flash](../../tkl-api/tkl_flash)
- [TKL OTA](../../tkl-api/tkl_ota)
- [TAL KV guide](../tutorials/tal-kv-guide)
- [Porting platform](../../new-hardware/porting-platform)
- [Heap allocation and PSRAM](heap-allocation-and-psram)
