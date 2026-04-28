---
title: Memory and storage overview
---

## Overview

TuyaOpen runs on **MCU-class boards** (Tuya T-series, ESP32, and similar) and on **Linux-class targets**. Memory and storage look different on each: MCUs have on-chip SRAM, optional **PSRAM**, and **external NOR flash**; Linux targets typically use **DDR** and **block storage** (eMMC, SD card, or a root filesystem) with the same TAL patterns abstracted behind adapters.

This section groups three guides:

1. **[Heap allocation and PSRAM](heap-allocation-and-psram)** — `tal_malloc`, `tal_psram_*`, `ENABLE_EXT_RAM`, and when to use internal RAM vs PSRAM.
2. **[Flash, partitions, and capacity](flash-and-partitions)** — raw flash via **TKL**, reserved regions, KV/LittleFS, and how layout relates to **flash size** and OTA.
3. This page — **concepts** and a **platform-oriented map** so you can choose the right doc and APIs.

**Audience:** Firmware developers on T5 / ESP32 / Linux who need a mental model before tuning buffers, partitions, or porting storage.

## Prerequisites

- [Environment setup](../../quick-start/enviroment-setup) and a building project.
- Skim [TAL system API reference](../tutorials/tal-system-api) (reset, time, and **PSRAM** helpers when `ENABLE_EXT_RAM` is enabled).

## Requirements

- A defined **Target Chip Platform** (T5AI-Core, ESP32-S3, Linux SBC, and so on). Exact RAM and flash sizes come from the **board** and **Kconfig**, not from this overview alone.

## Memory classes (embedded MCU)

| Class | Typical role in TuyaOpen | APIs / config |
|-------|---------------------------|---------------|
| **Internal SRAM** | Stack, small DMA buffers, time-critical data | `tal_malloc` / `tal_free` / `tal_calloc` / `tal_realloc` (`tal_memory.h`) |
| **PSRAM** (when present) | Large audio, graphics, TLS, AI working buffers | `tal_psram_malloc` and friends when **`ENABLE_EXT_RAM`** is set; see [Heap allocation and PSRAM](heap-allocation-and-psram) |
| **External NOR flash** | Firmware, OTA image, **KV / LittleFS** user area | **TKL** `tkl_flash_*`; persistence patterns in [Flash, partitions, and capacity](flash-and-partitions) and [TAL KV guide](../tutorials/tal-kv-guide) |

**DDR** and **eMMC** are not separate TAL “malloc targets” on MCUs; on **Linux**, normal process memory uses the kernel allocator, while **flash-like** persistence may go through filesystem or block-device abstractions implemented in the board’s TKL layer.

## Platform notes (T5 / ESP32 / Linux)

### Tuya T-series (example: T5AI on RTOS)

- Tight coupling between **chip RAM**, **optional external RAM** (if the SoC and board support it), and **SPI NOR** (or similar) for code and data.
- Partition tables and **flash size** are board- and **Kconfig**-specific; always align with the BSP under `TuyaOpen/boards/` and your product’s **flash geometry**.

### Espressif ESP32 (ESP32, ESP32-S3, …)

- **Internal SRAM** for default `tal_malloc`.
- **PSRAM** when the module exposes SPIRAM and **`ENABLE_EXT_RAM=1`** in configuration — used heavily by Wi-Fi stack, optional TLS, AI, and large display paths. See `tal_system.h` / `tal_memory.h` and [Heap allocation and PSRAM](heap-allocation-and-psram).
- **Flash** size and partition layout come from ESP-IDF–style config merged into TuyaOpen’s build; still surfaced through **TKL flash** and application **KV**.

### Linux (Raspberry Pi, DshanPi, …)

- **Heap:** standard OS virtual memory (DDR); use `tal_malloc` as the portable entry; underlying implementation maps to `malloc`/`free` in the adapter.
- **“Flash” semantics:** often a **file** on ext4 or a dedicated partition rather than a single global physical flash offset; TKL maps read/write/erase concepts to the vendor’s model. Treat **partition CSVs** on MCUs as **not** literal on Linux without checking the port.
- **eMMC / SD:** treated as block storage by the OS; application code still uses TAL/TKL where the port exposes storage, or normal POSIX APIs when documented for that board.

## Related display and media buffers

Frame buffers may be allocated from **SRAM or PSRAM** depending on display driver options. See [Display](../display) (frame buffer and memory type discussion).

## Expected outcome

You can name which **memory class** and **persistence layer** your feature uses on your **target**, and open the correct guide (`heap…` vs `flash…`) or [TAL KV](../tutorials/tal-kv-guide) / [TKL flash](../../tkl-api/tkl_flash) reference next.

## References

- [Heap allocation and PSRAM](heap-allocation-and-psram)
- [Flash, partitions, and capacity](flash-and-partitions)
- [TAL system API](../tutorials/tal-system-api)
- [TAL KV guide](../tutorials/tal-kv-guide)
- [TKL flash](../../tkl-api/tkl_flash)
- [Kconfig and project configuration](../tutorials/kconfig-and-project-configuration)
- [Porting platform](../../new-hardware/porting-platform) (`ENABLE_FLASH`, filesystem notes)
