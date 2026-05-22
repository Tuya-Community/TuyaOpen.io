---
title: Heap allocation and PSRAM
---

## Overview

TuyaOpen applications allocate dynamic memory through **TAL** (`tal_memory.h` / `tal_api.h`). On chips with **external PSRAM**, Kconfig can enable **`ENABLE_EXT_RAM`**, which switches some subsystems and convenience macros to **`tal_psram_*`** allocators so large buffers do not consume scarce **internal SRAM**.

**Audience:** Application and middleware developers on **ESP32 (with SPIRAM)** and other targets where `ENABLE_EXT_RAM` is supported; Linux developers can treat this as documenting the portable API (backed by `malloc` in the port).

## Prerequisites

- [Memory and storage overview](overview)
- [TAL system API reference](../tutorials/tal-system-api) (includes PSRAM helpers in the same header family)

## Requirements

- Headers: `#include "tal_memory.h"` or `#include "tal_api.h"` as used in your tree.
- For **PSRAM** APIs: **`ENABLE_EXT_RAM`** must be **1** in your resolved Kconfig / `app_default.config` path, and the board must actually expose PSRAM (typical on **ESP32-S3** modules with SPIRAM).

## Internal heap (`tal_malloc` family)

```c
void *tal_malloc(size_t size);
void  tal_free(void *ptr);
void *tal_calloc(size_t nitems, size_t size);
void *tal_realloc(void *ptr, size_t size);
int   tal_system_get_free_heap_size(void);
```

Use **`tal_malloc` / `tal_free`** for ordinary objects, small queues, and anything that should stay in **fast internal RAM** (DMA constraints, Wi-Fi/Bluetooth lower layers, and stack remain on-chip as defined by the port).

`tal_system_get_free_heap_size()` reports **internal** free heap on typical RTOS ports (see [TAL system API](../tutorials/tal-system-api)).

## PSRAM heap (`tal_psram_*`, `ENABLE_EXT_RAM`)

When **`ENABLE_EXT_RAM`** is **1**, these APIs are available (see `TuyaOpen/src/tal_system/include/tal_memory.h`):

```c
void *tal_psram_malloc(size_t size);
void  tal_psram_free(void *ptr);
void *tal_psram_calloc(size_t nitems, size_t size);
void *tal_psram_realloc(void *ptr, size_t size);
```

On **ESP32**, `tal_psram_malloc` maps to **`heap_caps_malloc(..., MALLOC_CAP_SPIRAM)`** in the adapter — large TLS session structures, audio rings, and AI pipelines often use this path when enabled.

The same header defines convenience macros **`Malloc` / `Calloc` / `Free`** that expand to **`tal_psram_*`** when `ENABLE_EXT_RAM` is 1, and to **`tal_malloc`** / **`tal_calloc`** / **`tal_free`** otherwise. Third-party code in the SDK (for example TLS and some AI services) branches on **`ENABLE_EXT_RAM`** explicitly; follow the same pattern for new large allocations.

:::note
`tal_psram_get_free_heap_size()` (when documented for your port) complements internal heap queries — see [TAL system API](../tutorials/tal-system-api).
:::

## Choosing SRAM vs PSRAM

| Prefer internal `tal_malloc` | Prefer `tal_psram_*` when enabled |
|------------------------------|-------------------------------------|
| Small, frequent allocations | Large, long-lived buffers (audio, images, model scratch) |
| Code paths with tight latency | Bulk data where SPIRAM latency is acceptable |
| Drivers with **DMA from internal RAM** only | TLS / AI buffers already migrated in SDK examples |

Always verify **DMA capability** for your chip: not every peripheral can DMA from PSRAM.

## Display and multimedia

Display stack may request frame buffers in **SRAM or PSRAM** depending on configuration. See [Display](../display) for `tal_display_framebuffer_create` and memory type parameters.

## Expected outcome

You can pick **`tal_malloc`** vs **`tal_psram_malloc`** consistently with **`ENABLE_EXT_RAM`**, and you know where to adjust Kconfig when moving between boards with and without PSRAM.

## References

- [Memory and storage overview](overview)
- [TAL system API](../tutorials/tal-system-api)
- [Flash, partitions, and capacity](flash-and-partitions) (persistence; separate from heap)
- Source: `TuyaOpen/src/tal_system/include/tal_memory.h`
