---
title: TAL KV Storage Guide
---

## Overview

TAL KV (`tal_kv.h`) provides persistent key–value storage for TuyaOpen applications. Values are opaque bytes; helper APIs can serialize structured fields to JSON. The implementation is backed by LittleFS (`lfs.h`); `tal_lfs_get()` exposes the filesystem handle for advanced use.

**Audience:** Application developers storing configuration, calibration, or small blobs across reboots.

## Prerequisites

- Completed [Environment setup](../../quick-start/enviroment-setup) and a building TuyaOpen project.
- Understanding of when flash wear matters (avoid high-frequency writes to the same key).

## Requirements

- TAL KV enabled for your platform and product (typically via Kconfig / SDK defaults for cloud or local storage).
- Keys and value sizes within limits implied by your partition and LittleFS configuration.

## API summary

| Function | Purpose |
|----------|---------|
| `tal_kv_init(tal_kv_cfg_t *kv_cfg)` | Initialize KV (seed/key strings in `tal_kv_cfg_t`). |
| `tal_kv_set(const char *key, const uint8_t *value, size_t length)` | Write raw bytes for `key`. |
| `tal_kv_get(const char *key, uint8_t **value, size_t *length)` | Read raw bytes; caller must free with `tal_kv_free`. |
| `tal_kv_free(uint8_t *value)` | Free buffer returned by `tal_kv_get`. |
| `tal_kv_del(const char *key)` | Delete a key. |
| `tal_kv_serialize_set(const char *key, kv_db_t *db, size_t dbcnt)` | Serialize a table of typed fields and store under `key`. |
| `tal_kv_serialize_get(const char *key, kv_db_t *db, size_t dbcnt)` | Deserialize into `kv_db_t` rows. |
| `tal_kv_cmd(int argc, char *argv[])` | Internal/debug command hook. |
| `tal_lfs_get(void)` | Return `lfs_t *` for direct LittleFS access. |

Typed serialization uses `kv_db_t` rows with `kv_tp_t`: `KV_CHAR`, `KV_BYTE`, `KV_SHORT`, `KV_USHORT`, `KV_INT`, `KV_BOOL`, `KV_STRING`, `KV_RAW`.

## Steps (raw KV)

1. After system startup, call `tal_kv_init()` with your `tal_kv_cfg_t` (follow product or board examples for seed/key usage).
2. To store data: `tal_kv_set("my_key", data, len)`.
3. To read: allocate nothing upfront; `tal_kv_get` sets `*value` and `*length`; then `tal_kv_free(*value)`.
4. To remove: `tal_kv_del("my_key")`.

**Expected outcome:** Keys persist across reboots until erased or overwritten.

## Platform notes

- Exact flash partition and mount path come from your platform BSP and SDK; align with OTA and factory reset policies before relying on KV for critical data.
- For large blobs or files, consider whether dedicated file APIs or another partition suit you better than many small KV writes.

## References

- Source: `TuyaOpen/src/tal_kv/include/tal_kv.h`
- [TAL System API reference](tal-system-api)
- [Quick Start](../../quick-start/index)
