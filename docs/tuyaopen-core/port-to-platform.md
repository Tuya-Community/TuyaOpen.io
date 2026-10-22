---
title: Port to a new platform
description: "The complete TuyaOpen Core platform adaptation contract: every member of the system, KV, netif, socket, Bluetooth, and file-system ops modules, with exact signatures and the layering rule."
keywords:
  - tuyaopen core
  - porting
  - platform adaptation
  - hal
  - ops module
---

TuyaOpen Core reaches every system service through **ops modules** — structs of function pointers that the platform fills in. This page is the complete contract: **every member you may have to implement**, with exact signatures. A port is a directory that defines these modules and builds one static library, `tuyaopen-port`.

## How much you must implement

| Module | Header | Members | Needed for |
|---|---|---|---|
| System ops | `core_api_ops.h` | 24 | Always |
| KV ops | `core_kv_ops.h` | 4 | Always |
| Netif ops | `core_netif_ops.h` | 2 | Always |
| Sockets (glue or module) | `core_network_platform.h` / `core_network_ops.h` | 0 glue · 35 members | Always |
| Bluetooth ops | `core_bluetooth_ops.h` | 18 | BLE only (`CONFIG_ENABLE_BLUETOOTH`) |
| File-system ops | `core_fs_ops.h` | 18 | P2P local store only (`CONFIG_ENABLE_LOCAL_STORE`) |

**Minimum for a cloud link on a POSIX/LWIP-style stack: 30 functions** (24 + 4 + 2, with socket glue instead of the socket module). Add 18 for BLE and 18 for local storage. On a non-POSIX socket stack, implement the 35-member socket module instead of the glue.

OTA is deliberately **not** a module — it is callback-injected from application code (see [Using the IoT API](iot-api.md)).

## Prerequisites

- Familiarity with the target's threading, networking, and storage APIs.
- The TuyaOpen Core source as a reference. The shipped ports are:
  - `port/linux` — POSIX reference port (also builds the Linux examples)
  - `port/esp-idf` — ESP-IDF v5.x port
  - `port/tuyaopen` — a source drop for legacy TuyaOpen/TuyaOS trees, binding the modules to the existing TKL headers (no CMake file; copy it into the framework tree). See [Migrate from a TKL project](migrate-from-tkl.md).

The TuyaOpen framework's bring-up guide covers the same hardware work in framework terms: [Bring your chip to TuyaOpen](../hardware/porting/bring-your-chip-to-tuyaopen.md) and the [bring-up stages](../hardware/porting/bring-up/system-and-logs.md).

## The layering rule

The port depends on nothing inside the core: it does not link `core_system` and does not include core headers (the one exception is the file-system module header, which the core publishes). The dependency direction is strictly **core → port**, through the module headers in the port's `interface/` directory. Both shipped ports enforce this: an accidental include of a core header from the port fails at compile time.

Each module is a global instance with a fixed name — `core_api_ops_platform`, `core_kv_ops_platform`, `core_netif_ops_platform`, `core_bluetooth_ops_platform`, `core_network_ops_platform` — and the core fetches it through a getter (`core_api_get_ops()`, `core_bluetooth_get_ops()`, `core_fs_get_ops()`, …). Use the exact file and struct names from the shipped ports. Handle types (`SEM_HANDLE`, `MUTEX_HANDLE`, `THREAD_HANDLE`, `QUEUE_HANDLE`, `TUYA_FILE`, `TUYA_DIR`, `TUYA_FILEINFO`) are all `void *`.

:::note Virtual functions you must implement
Every member listed below is a function pointer in the module's struct — a virtual function **you** provide the implementation for. The tables give the exact C prototype (kept in English) your function must match.
:::

## System ops — `CORE_API_OPS_T` (24)

Define `CORE_API_OPS_T core_api_ops_platform` in your port; core reaches it through `core_api_get_ops()`.

### Basic (7)

| Member | Prototype |
|---|---|
| `log_output` | `void (*)(const char *format, ...)` |
| `malloc` | `void *(*)(size_t size)` |
| `free` | `void (*)(void *ptr)` |
| `sleep` | `void (*)(uint32_t num_ms)` |
| `reset` | `void (*)(void)` |
| `get_millisecond` | `SYS_TIME_T (*)(void)` |
| `get_random` | `int (*)(uint32_t range)` |

`log_output` is used from early boot (including QR output), so it must work before anything else.

### Semaphore (4)

| Member | Prototype |
|---|---|
| `semaphore_create_init` | `OPERATE_RET (*)(SEM_HANDLE *handle, uint32_t sem_cnt, uint32_t sem_max)` |
| `semaphore_wait` | `OPERATE_RET (*)(const SEM_HANDLE handle, uint32_t timeout)` |
| `semaphore_post` | `OPERATE_RET (*)(const SEM_HANDLE handle)` |
| `semaphore_release` | `OPERATE_RET (*)(const SEM_HANDLE handle)` |

### Mutex (4)

| Member | Prototype |
|---|---|
| `mutex_create_init` | `OPERATE_RET (*)(MUTEX_HANDLE *handle)` |
| `mutex_lock` | `OPERATE_RET (*)(const MUTEX_HANDLE handle)` |
| `mutex_unlock` | `OPERATE_RET (*)(const MUTEX_HANDLE handle)` |
| `mutex_release` | `OPERATE_RET (*)(const MUTEX_HANDLE handle)` |

### Thread (5)

| Member | Prototype |
|---|---|
| `thread_create` | `OPERATE_RET (*)(THREAD_HANDLE *thread, const char *name, uint32_t stack_size, uint32_t priority, THREAD_FUNC_CB func, void *const arg)` |
| `thread_release` | `OPERATE_RET (*)(const THREAD_HANDLE thread)` |
| `thread_set_self_name` | `OPERATE_RET (*)(const char *name)` |
| `thread_is_self` | `OPERATE_RET (*)(const THREAD_HANDLE thread, BOOL_T *is_self)` |
| `thread_get_id` | `OPERATE_RET (*)(THREAD_HANDLE *thread)` |

`THREAD_FUNC_CB` is `void (*)(void *args)`. A returning thread routine must be followed by `thread_release`; the examples delete the thread from within its own callback.

### Queue (4)

| Member | Prototype |
|---|---|
| `queue_create_init` | `OPERATE_RET (*)(QUEUE_HANDLE *queue, int msgsize, int msgcount)` |
| `queue_post` | `OPERATE_RET (*)(const QUEUE_HANDLE queue, void *data, uint32_t timeout)` |
| `queue_fetch` | `OPERATE_RET (*)(const QUEUE_HANDLE queue, void *msg, uint32_t timeout)` |
| `queue_free` | `void (*)(const QUEUE_HANDLE queue)` |

## KV ops — `CORE_KV_OPS_T` (4)

Define `CORE_KV_OPS_T core_kv_ops_platform` with:

| Member | Prototype |
|---|---|
| `init` | `OPERATE_RET (*)(core_kv_cfg_t *kv_cfg)` |
| `set` | `OPERATE_RET (*)(const char *key, const uint8_t *value, size_t length)` |
| `get` | `OPERATE_RET (*)(const char *key, uint8_t **value, size_t *length)` |
| `del` | `OPERATE_RET (*)(const char *key)` |

Key-value storage holds the device identity and activation data, so it **must survive power loss**. On a successful `get`, `*value` is heap memory the caller frees with `core_free`. `core_kv_cfg_t` carries `seed[17]` and `key[17]` (16 chars each) for encryption of flat-file backends — the Linux port derives an AES-128 IV/key through SHA-256; an NVS-style port may ignore them.

## Network interface ops — `CORE_NETIF_OPS_T` (2)

Define `CORE_NETIF_OPS_T core_netif_ops_platform` with:

| Member | Prototype | Purpose |
|---|---|---|
| `get_ip` | `OPERATE_RET (*)(NW_IP_S *ip)` | Report the current local IP address. |
| `set_link_cb` | `OPERATE_RET (*)(CORE_NETIF_LINK_CHANGE_CB cb)` | Register the callback invoked when connectivity changes. |

The callback type is `void (*)(CORE_NETIF_LINK_STAT_E status)`; report `CORE_NETIF_LINK_UP` when at least one non-loopback interface is up, and `CORE_NETIF_LINK_DOWN` otherwise. The app also drives this from its platform side (the samples call `core_netif_set_link_cb` and `core_network_set_active_ip` once Wi‑Fi or wired IP is up).

## Sockets — two porting styles

### Style A: directly-included platform header (POSIX / lwIP) — 0 functions

`core_network_platform.h` is a header your port provides, not an ops module. It pulls in the target's socket stack and bridges its descriptor-set type:

```c
#include <sys/socket.h>   /* or lwip/sockets.h */
#define CORE_NET_NATIVE_FD_SET(fds) ((fd_set *)(fds))
```

A compile-time size check validates the `fd_set` layout. The Linux port includes the POSIX socket headers (`sys/socket.h`, `netinet/in.h`, `netdb.h`, …) and additionally defines an inline `core_net_platform_bind_interface(int fd, TUYA_IP_ADDR_T addr)` for interface binding; the ESP-IDF port includes `lwip/sockets.h`. Core then calls the native BSD socket API directly.

### Style B: socket ops module (non-POSIX stacks) — 35 functions

For stacks without a BSD-compatible socket header (for example an existing TKL/TuyaOS tree), define `CORE_NETWORK_OPS_T core_network_ops_platform` in `interface/core_network_ops.h`. Unlike the other modules, this is a direct global symbol (no getter).

| Member | Prototype |
|---|---|
| `get_errno` | `TUYA_ERRNO (*)(void)` |
| `fd_set` | `OPERATE_RET (*)(int fd, TUYA_FD_SET_T *fds)` |
| `fd_clear` | `OPERATE_RET (*)(int fd, TUYA_FD_SET_T *fds)` |
| `fd_isset` | `OPERATE_RET (*)(int fd, TUYA_FD_SET_T *fds)` |
| `fd_zero` | `OPERATE_RET (*)(TUYA_FD_SET_T *fds)` |
| `select` | `int (*)(const int maxfd, TUYA_FD_SET_T *readfds, TUYA_FD_SET_T *writefds, TUYA_FD_SET_T *errorfds, const uint32_t ms_timeout)` |
| `get_nonblock` | `int (*)(const int fd)` |
| `set_block` | `OPERATE_RET (*)(const int fd, const BOOL_T block)` |
| `close` | `TUYA_ERRNO (*)(const int fd)` |
| `shutdown` | `TUYA_ERRNO (*)(const int fd, const int how)` |
| `socket_create` | `int (*)(const TUYA_PROTOCOL_TYPE_E type)` |
| `connect` | `TUYA_ERRNO (*)(const int fd, const TUYA_IP_ADDR_T addr, const uint16_t port)` |
| `connect_raw` | `TUYA_ERRNO (*)(const int fd, void *p_socket, const int len)` |
| `bind` | `TUYA_ERRNO (*)(const int fd, const TUYA_IP_ADDR_T addr, const uint16_t port)` |
| `listen` | `TUYA_ERRNO (*)(const int fd, const int backlog)` |
| `send` | `TUYA_ERRNO (*)(const int fd, const void *buf, const uint32_t nbytes)` |
| `send_to` | `TUYA_ERRNO (*)(const int fd, const void *buf, const uint32_t nbytes, const TUYA_IP_ADDR_T addr, const uint16_t port)` |
| `accept` | `int (*)(const int fd, TUYA_IP_ADDR_T *addr, uint16_t *port)` |
| `recv` | `TUYA_ERRNO (*)(const int fd, void *buf, const uint32_t nbytes)` |
| `recv_nd_size` | `int (*)(const int fd, void *buf, const uint32_t buf_size, const uint32_t nd_size)` |
| `recvfrom` | `TUYA_ERRNO (*)(const int fd, void *buf, const uint32_t nbytes, TUYA_IP_ADDR_T *addr, uint16_t *port)` |
| `set_timeout` | `OPERATE_RET (*)(const int fd, const int ms_timeout, const TUYA_TRANS_TYPE_E type)` |
| `set_bufsize` | `OPERATE_RET (*)(const int fd, const int buf_size, const TUYA_TRANS_TYPE_E type)` |
| `set_reuse` | `OPERATE_RET (*)(const int fd)` |
| `disable_nagle` | `OPERATE_RET (*)(const int fd)` |
| `set_broadcast` | `OPERATE_RET (*)(const int fd)` |
| `gethostbyname` | `OPERATE_RET (*)(const char *domain, TUYA_IP_ADDR_T *addr)` |
| `set_keepalive` | `OPERATE_RET (*)(int fd, const BOOL_T alive, const uint32_t idle, const uint32_t intr, const uint32_t cnt)` |
| `get_socket_ip` | `OPERATE_RET (*)(int fd, TUYA_IP_ADDR_T *addr)` |
| `getsockname` | `OPERATE_RET (*)(int fd, TUYA_IP_ADDR_T *addr, uint16_t *port)` |
| `getpeername` | `OPERATE_RET (*)(int fd, TUYA_IP_ADDR_T *addr, uint16_t *port)` |
| `str2addr` | `TUYA_IP_ADDR_T (*)(const char *ip_str)` |
| `addr2str` | `char *(*)(TUYA_IP_ADDR_T ipaddr)` |
| `setsockopt` | `OPERATE_RET (*)(const int fd, const TUYA_OPT_LEVEL level, const TUYA_OPT_NAME optname, const void *optval, const int optlen)` |
| `getsockopt` | `OPERATE_RET (*)(const int fd, const TUYA_OPT_LEVEL level, const TUYA_OPT_NAME optname, void *optval, int *optlen)` |

## Bluetooth ops — `CORE_BLUETOOTH_OPS_T` (18, optional)

Required only when the platform exposes BLE and you build with `CONFIG_ENABLE_BLUETOOTH`. The supported role is **peripheral/slave only** (no central, scanning, or initiating). Define `CORE_BLUETOOTH_OPS_T core_bluetooth_ops_platform`; core reaches it through `core_bluetooth_get_ops()`. The shared event and parameter types live in `core_bluetooth_def.h` and the module header (`CORE_BLE_DATA_T`, `CORE_BLE_GAP_*`, `CORE_BLE_GATTS_PARAMS_T`, …).

### Stack (3)

| Member | Prototype |
|---|---|
| `stack_init` | `OPERATE_RET (*)(uint8_t role)` |
| `stack_deinit` | `OPERATE_RET (*)(uint8_t role)` |
| `stack_gatt_link` | `OPERATE_RET (*)(uint16_t *p_link)` |

### Event registration (2) — must precede `stack_init`

| Member | Prototype |
|---|---|
| `gap_callback_register` | `OPERATE_RET (*)(const CORE_BLE_GAP_EVT_FUNC_CB gap_evt)` |
| `gatt_callback_register` | `OPERATE_RET (*)(const CORE_BLE_GATT_EVT_FUNC_CB gatt_evt)` |

The callbacks are `void (*)(CORE_BLE_GAP_PARAMS_EVT_T *)` and `void (*)(CORE_BLE_GATT_PARAMS_EVT_T *)`. They must be registered before `stack_init`, because the platform layer latches the pointers on first use.

### GAP (9)

| Member | Prototype |
|---|---|
| `gap_addr_set` | `OPERATE_RET (*)(CORE_BLE_GAP_ADDR_T const *p_peer_addr)` |
| `gap_address_get` | `OPERATE_RET (*)(CORE_BLE_GAP_ADDR_T *p_peer_addr)` |
| `gap_adv_start` | `OPERATE_RET (*)(CORE_BLE_GAP_ADV_PARAMS_T const *p_adv_params)` |
| `gap_adv_stop` | `OPERATE_RET (*)(void)` |
| `gap_adv_rsp_data_set` | `OPERATE_RET (*)(CORE_BLE_DATA_T const *p_adv, CORE_BLE_DATA_T const *p_scan_rsp)` |
| `gap_adv_rsp_data_update` | `OPERATE_RET (*)(CORE_BLE_DATA_T const *p_adv, CORE_BLE_DATA_T const *p_scan_rsp)` |
| `gap_disconnect` | `OPERATE_RET (*)(uint16_t conn_handle, uint8_t hci_reason)` |
| `gap_conn_param_update` | `OPERATE_RET (*)(uint16_t conn_handle, CORE_BLE_GAP_CONN_PARAMS_T const *p_conn_params)` |
| `gap_rssi_get` | `OPERATE_RET (*)(uint16_t conn_handle)` |

### GATT server (4)

| Member | Prototype |
|---|---|
| `gatts_service_add` | `OPERATE_RET (*)(CORE_BLE_GATTS_PARAMS_T *p_service)` |
| `gatts_value_set` | `OPERATE_RET (*)(uint16_t conn_handle, uint16_t char_handle, uint8_t *p_data, uint16_t length)` |
| `gatts_value_notify` | `OPERATE_RET (*)(uint16_t conn_handle, uint16_t char_handle, uint8_t *p_data, uint16_t length)` |
| `gatts_exchange_mtu_reply` | `OPERATE_RET (*)(uint16_t conn_handle, uint16_t server_rx_mtu)` |

`gatts_service_add` takes a **non-const** argument because the port writes the allocated service/characteristic handles back into it. Platforms without Bluetooth provide the module with all members NULL; the core then returns `OPRT_NOT_SUPPORTED` from BLE entry points.

## File-system ops — `CORE_FS_OPS_T` (18, optional)

Required only for P2P local storage (`CONFIG_ENABLE_LOCAL_STORE`). Unlike the other module headers, this one is published by the core at `iot-core/core_system/include/core_fs_ops.h`; define `CORE_FS_OPS_T core_fs_ops_platform`, reached through `core_fs_get_ops()`. `TUYA_FILE`, `TUYA_DIR`, and `TUYA_FILEINFO` are `void *`. Return conventions: handles return `NULL` on failure; read/write return byte counts; `fileno` returns the fd; everything else returns 0 on success and non-zero on failure.

### File (9)

| Member | Prototype |
|---|---|
| `fopen` | `TUYA_FILE (*)(const char *path, const char *mode)` |
| `fclose` | `int (*)(TUYA_FILE file)` |
| `fwrite` | `int (*)(void *buf, int bytes, TUYA_FILE file)` |
| `fread` | `int (*)(void *buf, int bytes, TUYA_FILE file)` |
| `fseek` | `int (*)(TUYA_FILE file, int64_t offs, int whence)` |
| `fflush` | `int (*)(TUYA_FILE file)` |
| `fsync` | `int (*)(int fd)` |
| `fileno` | `int (*)(TUYA_FILE file)` |
| `fgets` | `char *(*)(char *buf, int len, TUYA_FILE file)` |

### Path (4)

| Member | Prototype |
|---|---|
| `fs_is_exist` | `int (*)(const char *path, BOOL_T *is_exist)` |
| `fs_mkdir` | `int (*)(const char *path)` |
| `fs_remove` | `int (*)(const char *path)` |
| `fs_rename` | `int (*)(const char *path_old, const char *path_new)` |

### Directory (5)

| Member | Prototype |
|---|---|
| `dir_open` | `int (*)(const char *path, TUYA_DIR *dir)` |
| `dir_close` | `int (*)(TUYA_DIR dir)` |
| `dir_read` | `int (*)(TUYA_DIR dir, TUYA_FILEINFO *info)` |
| `dir_name` | `int (*)(TUYA_FILEINFO info, const char **name)` |
| `dir_is_directory` | `int (*)(TUYA_FILEINFO info, BOOL_T *is_dir)` |

The Linux sample supplies a POSIX implementation (`src/adapt/fs_card.c`); the ESP-IDF port does not yet provide this module.

## Build the port

1. Create a CMakeLists for the port that builds a static library named `tuyaopen-port` and injects its include directories onto the interface target:

   ```cmake
   target_include_directories(tuyaopen-headers INTERFACE ${CMAKE_CURRENT_SOURCE_DIR}/include)
   ```

2. From the host project, include the core and add the port as a subdirectory (see [Add the library to a project](add-to-project.md)):

   ```cmake
   include(${TUYAOPEN_CORE_DIR}/tuyaopen-core.cmake)
   add_subdirectory(your_port_dir tuyaopen-port)
   ```

3. For ESP-IDF, a port directory is itself a component; add both the core root and the port to `EXTRA_COMPONENT_DIRS`.

## Bring-up order

Start with the minimal set that yields a cloud connection, then add modules as features need them:

1. System ops (24) + KV ops (4) + sockets + network interface (2) — enough for IoT over an existing IP link.
2. Cloud connection and device activation. The framework walkthrough for this stage: [Cloud connection bring-up](../hardware/porting/bring-up/cloud-connection.md).
3. Bluetooth ops (18) for BLE provisioning and BLE DP channels.
4. File-system ops (18) for P2P local storage.

When bringing the port up, initialize the supporting services before `tuya_iot_start`: `core_log_init`, `core_time_service_init`, `core_kv_init`, `core_sw_timer_init`, `core_workq_init`. Stack guidance: give the yield/IoT thread at least 8 KB (TLS handshake peaks); P2P/ICE threads need about 20 KB.

## Next steps

- [Add the library to a project](add-to-project.md) — CMake options and link recipes
- [Migrate from a TKL project](migrate-from-tkl.md) — use the source-drop port for an existing TKL tree
- [Using the IoT API](iot-api.md) — what becomes available after the minimal port
