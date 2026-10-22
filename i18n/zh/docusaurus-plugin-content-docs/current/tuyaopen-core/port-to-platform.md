---
title: 适配新平台
description: "TuyaOpen Core 完整的平台适配契约：系统、KV、网络接口、套接字、蓝牙与文件系统 ops module 的全部成员，含全部精确函数原型与分层规则。"
keywords:
  - tuyaopen core
  - 移植
  - 平台适配
  - hal
  - ops module
---

TuyaOpen Core 通过 **ops module**（存放函数指针的结构体）调用所有系统服务，这些 module 由平台填充。本页是完整契约，列出**你可能需要实现的每一个成员**及其精确函数原型。移植就是创建一个目录，定义这些 module，并构建一个名为 `tuyaopen-port` 的静态库。

## 需要实现多少

| module | 头文件 | 成员数 | 适用场景 |
|---|---|---|---|
| 系统 ops | `core_api_ops.h` | 24 | 始终需要 |
| KV ops | `core_kv_ops.h` | 4 | 始终需要 |
| 网络接口 ops | `core_netif_ops.h` | 2 | 始终需要 |
| 套接字（胶水或 module） | `core_network_platform.h` / `core_network_ops.h` | 胶水 0 · module 35 | 始终需要 |
| 蓝牙 ops | `core_bluetooth_ops.h` | 18 | 仅 BLE（`CONFIG_ENABLE_BLUETOOTH`） |
| 文件系统 ops | `core_fs_ops.h` | 18 | 仅 P2P 本地存储（`CONFIG_ENABLE_LOCAL_STORE`） |

**在 POSIX/LWIP 风格协议栈上建立云端连接的最小集合：30 个函数**（24 + 4 + 2，套接字使用胶水而非 module）。BLE 再加 18 个，本地存储再加 18 个。在非 POSIX 套接字栈上，则实现 35 个成员的套接字 module 而非胶水。

OTA 刻意**不是** module——它由应用代码以回调注入方式提供（见 [使用 IoT API](iot-api.md)）。

## 前提条件

- 熟悉目标平台的线程、网络与存储接口。
- 以 TuyaOpen Core 源码为参考。自带移植层包括：
  - `port/linux` —— POSIX 参考移植（也用于构建 Linux 示例）
  - `port/esp-idf` —— ESP-IDF v5.x 移植
  - `port/tuyaopen` —— 面向旧版 TuyaOpen/TuyaOS 树的源码接入，把 module 绑定到既有 TKL 头文件（没有 CMake 文件，直接复制进框架树）。见 [从基于 TKL 的工程迁移](migrate-from-tkl.md)。

TuyaOpen 框架的上手指南从框架角度讲解同样的工作：[把芯片接入 TuyaOpen](../hardware/porting/bring-your-chip-to-tuyaopen.md) 与各 [bring-up 阶段](../hardware/porting/bring-up/system-and-logs.md)。

## 分层规则

移植层不依赖核心中的任何内容：不链接 `core_system`，也不 include 核心头文件（唯一例外是由核心发布的文件系统 module 头文件）。依赖方向严格为**核心 → 移植层**，通过移植层 `interface/` 目录中的 module 头文件完成。两个自带移植层都强制了这一点：移植层若误 include 核心头文件，会在编译期失败。

每个 module 都是固定命名的全局实例——`core_api_ops_platform`、`core_kv_ops_platform`、`core_netif_ops_platform`、`core_bluetooth_ops_platform`、`core_network_ops_platform`——核心通过 getter 获取（`core_api_get_ops()`、`core_bluetooth_get_ops()`、`core_fs_get_ops()` 等）。文件与结构体命名请与自带移植层保持一致。句柄类型（`SEM_HANDLE`、`MUTEX_HANDLE`、`THREAD_HANDLE`、`QUEUE_HANDLE`、`TUYA_FILE`、`TUYA_DIR`、`TUYA_FILEINFO`）均为 `void *`。

:::note 虚函数需实现
下列各表中的每个成员都是 module 结构体中的函数指针——即**需要你提供实现**的虚函数。表中给出函数必须匹配的精确 C prototype，保持英文原文，不作翻译。
:::

## 系统 ops —— `CORE_API_OPS_T`（24）

在移植层中定义 `CORE_API_OPS_T core_api_ops_platform`，核心通过 `core_api_get_ops()` 获取。

### 基础（7）

| 成员 | Prototype |
|---|---|
| `log_output` | `void (*)(const char *format, ...)` |
| `malloc` | `void *(*)(size_t size)` |
| `free` | `void (*)(void *ptr)` |
| `sleep` | `void (*)(uint32_t num_ms)` |
| `reset` | `void (*)(void)` |
| `get_millisecond` | `SYS_TIME_T (*)(void)` |
| `get_random` | `int (*)(uint32_t range)` |

`log_output` 从早期启动阶段就会被使用（包括二维码输出），必须最先可用。

### 信号量（4）

| 成员 | Prototype |
|---|---|
| `semaphore_create_init` | `OPERATE_RET (*)(SEM_HANDLE *handle, uint32_t sem_cnt, uint32_t sem_max)` |
| `semaphore_wait` | `OPERATE_RET (*)(const SEM_HANDLE handle, uint32_t timeout)` |
| `semaphore_post` | `OPERATE_RET (*)(const SEM_HANDLE handle)` |
| `semaphore_release` | `OPERATE_RET (*)(const SEM_HANDLE handle)` |

### 互斥锁（4）

| 成员 | Prototype |
|---|---|
| `mutex_create_init` | `OPERATE_RET (*)(MUTEX_HANDLE *handle)` |
| `mutex_lock` | `OPERATE_RET (*)(const MUTEX_HANDLE handle)` |
| `mutex_unlock` | `OPERATE_RET (*)(const MUTEX_HANDLE handle)` |
| `mutex_release` | `OPERATE_RET (*)(const MUTEX_HANDLE handle)` |

### 线程（5）

| 成员 | Prototype |
|---|---|
| `thread_create` | `OPERATE_RET (*)(THREAD_HANDLE *thread, const char *name, uint32_t stack_size, uint32_t priority, THREAD_FUNC_CB func, void *const arg)` |
| `thread_release` | `OPERATE_RET (*)(const THREAD_HANDLE thread)` |
| `thread_set_self_name` | `OPERATE_RET (*)(const char *name)` |
| `thread_is_self` | `OPERATE_RET (*)(const THREAD_HANDLE thread, BOOL_T *is_self)` |
| `thread_get_id` | `OPERATE_RET (*)(THREAD_HANDLE *thread)` |

`THREAD_FUNC_CB` 为 `void (*)(void *args)`。线程回调返回后应调用 `thread_release`；示例的约定是在线程自己的回调内部删除线程。

### 队列（4）

| 成员 | Prototype |
|---|---|
| `queue_create_init` | `OPERATE_RET (*)(QUEUE_HANDLE *queue, int msgsize, int msgcount)` |
| `queue_post` | `OPERATE_RET (*)(const QUEUE_HANDLE queue, void *data, uint32_t timeout)` |
| `queue_fetch` | `OPERATE_RET (*)(const QUEUE_HANDLE queue, void *msg, uint32_t timeout)` |
| `queue_free` | `void (*)(const QUEUE_HANDLE queue)` |

## KV ops —— `CORE_KV_OPS_T`（4）

定义 `CORE_KV_OPS_T core_kv_ops_platform`：

| 成员 | Prototype |
|---|---|
| `init` | `OPERATE_RET (*)(core_kv_cfg_t *kv_cfg)` |
| `set` | `OPERATE_RET (*)(const char *key, const uint8_t *value, size_t length)` |
| `get` | `OPERATE_RET (*)(const char *key, uint8_t **value, size_t *length)` |
| `del` | `OPERATE_RET (*)(const char *key)` |

键值存储保存设备身份与激活数据，**必须断电不丢失**。`get` 成功时 `*value` 是堆内存，调用方使用 `core_free` 释放。`core_kv_cfg_t` 带 `seed[17]` 与 `key[17]`（各 16 个字符），用于平铺文件后端的加密——Linux 移植通过 SHA256 派生 AES-128 IV/密钥；NVS 类后端可忽略。

## 网络接口 ops —— `CORE_NETIF_OPS_T`（2）

定义 `CORE_NETIF_OPS_T core_netif_ops_platform`：

| 成员 | Prototype | 用途 |
|---|---|---|
| `get_ip` | `OPERATE_RET (*)(NW_IP_S *ip)` | 返回当前本地 IP 地址。 |
| `set_link_cb` | `OPERATE_RET (*)(CORE_NETIF_LINK_CHANGE_CB cb)` | 注册连接变化时触发的回调。 |

回调类型为 `void (*)(CORE_NETIF_LINK_STAT_E status)`；至少一个非环回接口 up 时上报 `CORE_NETIF_LINK_UP`，否则上报 `CORE_NETIF_LINK_DOWN`。应用也会从平台侧驱动它（示例在 Wi-Fi 或有线 IP 就绪后调用 `core_netif_set_link_cb` 与 `core_network_set_active_ip`）。

## 套接字 —— 两种移植方式

### 方式 A：直接 include 平台头文件（POSIX / lwIP）—— 0 个函数

`core_network_platform.h` 由移植层提供，它不是 ops module，只负责引入目标套接字栈并桥接描述符集合类型：

```c
#include <sys/socket.h>   /* 或 lwip/sockets.h */
#define CORE_NET_NATIVE_FD_SET(fds) ((fd_set *)(fds))
```

编译期会有尺寸检查验证 `fd_set` 布局。Linux 移植 include POSIX 套接字头文件（`sys/socket.h`、`netinet/in.h`、`netdb.h` 等），并额外内联定义 `core_net_platform_bind_interface(int fd, TUYA_IP_ADDR_T addr)` 用于网卡绑定；ESP-IDF 移植 include `lwip/sockets.h`。之后核心直接调用原生 BSD 套接字 API。

### 方式 B：套接字 ops module（非 POSIX 栈）—— 35 个函数

对于没有 BSD 兼容套接字头文件的栈（例如既有的 TKL/TuyaOS 树），在 `interface/core_network_ops.h` 中定义 `CORE_NETWORK_OPS_T core_network_ops_platform`。与其他 module 不同，它是直接的全局符号（没有 getter）。

| 成员 | Prototype |
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

## 蓝牙 ops —— `CORE_BLUETOOTH_OPS_T`（18，可选）

仅当平台提供 BLE 且以 `CONFIG_ENABLE_BLUETOOTH` 构建时需要。支持的角色**仅限外设/从角色**（没有中心、扫描或发起连接）。定义 `CORE_BLUETOOTH_OPS_T core_bluetooth_ops_platform`，核心通过 `core_bluetooth_get_ops()` 获取。共用的事件与参数类型位于 `core_bluetooth_def.h` 与 module 头文件中（`CORE_BLE_DATA_T`、`CORE_BLE_GAP_*`、`CORE_BLE_GATTS_PARAMS_T` 等）。

### 协议栈（3）

| 成员 | Prototype |
|---|---|
| `stack_init` | `OPERATE_RET (*)(uint8_t role)` |
| `stack_deinit` | `OPERATE_RET (*)(uint8_t role)` |
| `stack_gatt_link` | `OPERATE_RET (*)(uint16_t *p_link)` |

### 事件注册（2）—— 必须先于 `stack_init`

| 成员 | Prototype |
|---|---|
| `gap_callback_register` | `OPERATE_RET (*)(const CORE_BLE_GAP_EVT_FUNC_CB gap_evt)` |
| `gatt_callback_register` | `OPERATE_RET (*)(const CORE_BLE_GATT_EVT_FUNC_CB gatt_evt)` |

回调类型为 `void (*)(CORE_BLE_GAP_PARAMS_EVT_T *)` 与 `void (*)(CORE_BLE_GATT_PARAMS_EVT_T *)`。必须在 `stack_init` 之前注册，因为平台层会在首次使用时锁定这些指针。

### GAP（9）

| 成员 | Prototype |
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

### GATT 服务端（4）

| 成员 | Prototype |
|---|---|
| `gatts_service_add` | `OPERATE_RET (*)(CORE_BLE_GATTS_PARAMS_T *p_service)` |
| `gatts_value_set` | `OPERATE_RET (*)(uint16_t conn_handle, uint16_t char_handle, uint8_t *p_data, uint16_t length)` |
| `gatts_value_notify` | `OPERATE_RET (*)(uint16_t conn_handle, uint16_t char_handle, uint8_t *p_data, uint16_t length)` |
| `gatts_exchange_mtu_reply` | `OPERATE_RET (*)(uint16_t conn_handle, uint16_t server_rx_mtu)` |

`gatts_service_add` 的参数**不是 const**，因为移植层要把分配到的服务/特征句柄写回。没有蓝牙的平台把 module 所有成员置为 NULL，核心在 BLE 入口返回 `OPRT_NOT_SUPPORTED`。

## 文件系统 ops —— `CORE_FS_OPS_T`（18，可选）

仅 P2P 本地存储（`CONFIG_ENABLE_LOCAL_STORE`）需要。与其他 module 头文件不同，它由核心发布于 `iot-core/core_system/include/core_fs_ops.h`；定义 `CORE_FS_OPS_T core_fs_ops_platform`，通过 `core_fs_get_ops()` 获取。`TUYA_FILE`、`TUYA_DIR`、`TUYA_FILEINFO` 均为 `void *`。返回值约定：句柄失败返回 `NULL`；读写返回字节数；`fileno` 返回 fd；其他接口成功返回 0、失败返回非 0。

### 文件（9）

| 成员 | Prototype |
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

### 路径（4）

| 成员 | Prototype |
|---|---|
| `fs_is_exist` | `int (*)(const char *path, BOOL_T *is_exist)` |
| `fs_mkdir` | `int (*)(const char *path)` |
| `fs_remove` | `int (*)(const char *path)` |
| `fs_rename` | `int (*)(const char *path_old, const char *path_new)` |

### 目录（5）

| 成员 | Prototype |
|---|---|
| `dir_open` | `int (*)(const char *path, TUYA_DIR *dir)` |
| `dir_close` | `int (*)(TUYA_DIR dir)` |
| `dir_read` | `int (*)(TUYA_DIR dir, TUYA_FILEINFO *info)` |
| `dir_name` | `int (*)(TUYA_FILEINFO info, const char **name)` |
| `dir_is_directory` | `int (*)(TUYA_FILEINFO info, BOOL_T *is_dir)` |

Linux 示例提供了 POSIX 实现（`src/adapt/fs_card.c`）；ESP-IDF 移植目前尚未提供该 module。

## 构建移植层

1. 为移植层创建 CMakeLists，构建名为 `tuyaopen-port` 的静态库，并把 include 目录注入接口目标：

   ```cmake
   target_include_directories(tuyaopen-headers INTERFACE ${CMAKE_CURRENT_SOURCE_DIR}/include)
   ```

2. 在主机工程中 include 核心，并把移植层作为子目录加入（见 [把库加入工程](add-to-project.md)）：

   ```cmake
   include(${TUYAOPEN_CORE_DIR}/tuyaopen-core.cmake)
   add_subdirectory(your_port_dir tuyaopen-port)
   ```

3. 在 ESP-IDF 上，移植目录本身就是一个组件；把核心根目录与移植目录都加入 `EXTRA_COMPONENT_DIRS`。

## Bring-up 顺序

先实现能建立云端连接的最小集合，再按功能需要逐步添加：

1. 系统 ops（24）+ KV ops（4）+ 套接字 + 网络接口（2）——足以让 IoT 运行在已有 IP 链路上。
2. 云端连接与设备激活。该阶段的框架说明见 [云端连接 bring-up](../hardware/porting/bring-up/cloud-connection.md)。
3. 蓝牙 ops（18），用于 BLE 配网与 BLE DP 通道。
4. 文件系统 ops（18），用于 P2P 本地存储。

Bring-up 时在 `tuya_iot_start` 之前初始化配套服务：`core_log_init`、`core_time_service_init`、`core_kv_init`、`core_sw_timer_init`、`core_workq_init`。栈空间建议：yield/IoT 线程至少 8 KB（TLS 握手峰值）；P2P/ICE 线程约 20 KB。

## 下一步

- [把库加入工程](add-to-project.md) —— CMake 选项与链接方式
- [从基于 TKL 的工程迁移](migrate-from-tkl.md) —— 既有 TKL 树使用源码接入移植
- [使用 IoT API](iot-api.md) —— 最小移植完成后即可使用的能力
