---
title: "Bring-up 2: Flash and storage"
---

The second stage gives TuyaOpen a place to persist data on your chip's flash. Device authorization, keys, and pairing state must survive a reboot — so this stage must work before the device can stay activated against the cloud.

## Goal

TuyaOpen can read, write, and erase a reserved flash region, and its key-value store keeps data across power cycles.

## Files to implement

| File | What you implement |
|------|--------------------|
| `tkl_flash.c` | Flash read / write / erase, and the partition info (base address + size) for the region you reserve for TuyaOpen |
| `tkl_fs.c` *(optional)* | Only if you use the **vendor SDK's** file system instead of TuyaOpen's built-in LittleFS |

## Details

- **Reserve an unused flash region.** Pick a region outside the firmware area, aligned to your flash erase granularity, and return it from `tkl_flash.c`. Both TuyaOpen and TuyaOS store authorization data here.
- **Enable `ENABLE_FLASH`** in `tos.py config menu` — this is mandatory.
- **File system choice** (`ENABLE_FILE_SYSTEM`):
  - **Disabled (recommended to start):** TuyaOpen uses its built-in **LittleFS** with AES128-CBC encryption, addressed and sized by `tkl_flash.c`. You implement only `tkl_flash.c`.
  - **Enabled:** TuyaOpen uses the vendor file system — you also adapt `tkl_fs.c`.
- **Power-loss safety.** Honor erase-before-write and alignment; a flash adapter that ignores granularity corrupts the KV store on unexpected resets.

:::tip
Why a dedicated region? After pairing, the device saves its identity and keys to flash. A reserved, correctly-sized region lets TuyaOpen (LittleFS) and TuyaOS (KV) store this safely and lets you switch between the two SDKs without reflashing layout.
:::

## Verify

Write a value through the KV/storage API, reboot, and read it back unchanged. End-to-end: once [cloud connection](cloud-connection) works, pair the device once and confirm it remains activated after a power cycle (no re-pairing) — that proves the flash region and KV are solid.

Next: [Bring-up 3: Wi-Fi and network](wifi-and-network).

## See also

- [tkl_flash reference](../../../tkl-api/tkl_flash)
- [Adapt to new platforms](../porting-platform) — flash reservation rationale
