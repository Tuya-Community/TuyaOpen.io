---
title: Migrate from a TKL-based project
description: "Use TuyaOpen Core inside an existing TuyaOpen or TuyaOS project: the source-drop port that binds the ops modules directly to the TKL headers, and what application code changes."
keywords:
  - tuyaopen core
  - migration
  - tkl
  - tuyaos
  - porting
---

If you already have a TuyaOpen- or TuyaOS-based firmware with a working TKL layer, you do not write a port from scratch. The SDK ships a **source-drop port** at `port/tuyaopen` that binds every ops-module member straight to the existing `tkl_*` headers.

:::note
This path is for legacy or existing TuyaOpen/TuyaOS trees. New projects built directly on an RTOS or Linux use the [CMake integration](add-to-project.md) with the Linux or ESP-IDF port instead.
:::

## What the drop contains

```text
port/tuyaopen/
  interface/                  # module headers (same contract as other ports)
  tuyaopen-core_ops.c         # module instances bound to tkl_* functions
```

There is **no CMakeLists** on purpose: you copy these files into your framework tree and compile them with your existing build. The single C file defines the platform module instances by mapping members to TKL calls, for example:

| Core module member | Bound to |
|---|---|
| `log_output` | `tkl_log_output` (`tkl_output.h`) |
| `malloc` / `free` | `tkl_system_malloc` / `tkl_system_free` (`tkl_memory.h`) |
| sleep / reset / time / random | `tkl_system.h` |
| semaphore / mutex / thread / queue | `tkl_semaphore.h`, `tkl_mutex.h`, `tkl_thread.h`, `tkl_queue.h` |
| network interface | `tkl_wired.h` / `netif_esp.h` |
| Bluetooth (conditional) | `tkl_bluetooth.h`, gated by `ENABLE_BLUETOOTH` and `TUYAOPEN_HAS_TKL_BLE` |
| file system (conditional) | `tkl_fs.h` |

## Sockets on this port

TKL trees do not expose a POSIX socket stack, so this port uses the **socket ops module** `core_network_ops.h` (`CORE_NETWORK_OPS_T`, 35 members) instead of the directly-included socket header used by Linux and ESP-IDF. It covers the BSD socket surface one-to-one — `socket_create`, `connect`, `bind`, `listen`, `accept`, `send`/`recv` and `_to` variants, `select` plus the four `fd_set` helpers, blocking mode, timeouts, buffer sizes, keepalive, Nagle, broadcast, host lookup, socket names, options, and address conversion. Bind it to your `tkl_network.h` implementation.

## Steps

1. Copy `port/tuyaopen/` into your firmware source tree and add `tuyaopen-core_ops.c` to your build.
2. Add the core library archives or sources and the module headers' directory to your include path.
3. Compile in the capability modules you need (IoT is always present; AI Agent and P2P are build switches).
4. Initialize the core services your existing tree does not already provide, then drive the client with the same sequence as every sample: `tuya_iot_init` → `tuya_iot_start` → `tuya_iot_yield` on a loop.
5. Bind the BLE and FS modules only if the TKL build actually provides `tkl_bluetooth.h` / `tkl_fs.h`; otherwise leave them out and those features return unsupported.

## What changes in application code

- **Keep:** your BSP, drivers, RTOS configuration, and the entire TKL layer — nothing below the modules changes.
- **Add:** a Core client with its event handler; object/raw DPs arrive as `TUYA_EVENT_DP_RECEIVE_OBJ/RAW` (see [Using the IoT API](iot-api.md)).
- **Replace:** any framework-specific cloud-facing code. Core does not expose `tal_*` service APIs — cloud connection, DP reporting, and OTA go through `tuya_iot_*` and the OTA callbacks.
- **OTA:** register `CORE_OTA_CBS_T` and keep your existing firmware-update mechanism inside the callbacks; no OTA ops module is needed.

## Next steps

- [Port to a new platform](port-to-platform.md) — every module contract in full
- [Using the IoT API](iot-api.md) — the application side after migration
