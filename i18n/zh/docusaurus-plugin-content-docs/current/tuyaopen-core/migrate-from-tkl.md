---
title: 从基于 TKL 的工程迁移
description: "在既有 TuyaOpen 或 TuyaOS 工程中使用 TuyaOpen Core：把 ops module 直接绑定到 TKL 头文件的源码接入移植，以及应用代码的变化。"
keywords:
  - tuyaopen core
  - 迁移
  - tkl
  - tuyaos
  - 移植
---

如果你已有基于 TuyaOpen 或 TuyaOS、且 TKL 层可用的固件，无需从零编写移植。SDK 在 `port/tuyaopen` 提供了**源码接入移植**，把每个 ops module 成员直接绑定到既有的 `tkl_*` 头文件。

:::note
这条路径面向旧有或既有的 TuyaOpen/TuyaOS 工程树。直接基于 RTOS 或 Linux 的新项目请使用 [CMake 集成](add-to-project.md) 搭配 Linux 或 ESP-IDF 移植。
:::

## 接入内容

```text
port/tuyaopen/
  interface/                  # module 头文件（契约与其他移植相同）
  tuyaopen-core_ops.c         # 绑定到 tkl_* 函数的 module 实例
```

这里**刻意没有 CMakeLists**：把这些文件复制进你的框架树，用既有构建系统编译即可。单个 C 文件通过成员映射定义平台 module 实例，例如：

| Core module 成员 | 绑定到 |
|---|---|
| `log_output` | `tkl_log_output`（`tkl_output.h`） |
| `malloc` / `free` | `tkl_system_malloc` / `tkl_system_free`（`tkl_memory.h`） |
| sleep / reset / time / random | `tkl_system.h` |
| 信号量 / 互斥锁 / 线程 / 队列 | `tkl_semaphore.h`、`tkl_mutex.h`、`tkl_thread.h`、`tkl_queue.h` |
| 网络接口 | `tkl_wired.h` / `netif_esp.h` |
| 蓝牙（条件编译） | `tkl_bluetooth.h`，由 `ENABLE_BLUETOOTH` 与 `TUYAOPEN_HAS_TKL_BLE` 控制 |
| 文件系统（条件编译） | `tkl_fs.h` |

## 该移植的套接字

TKL 工程树不暴露 POSIX 套接字栈，因此该移植使用**套接字 ops module** `core_network_ops.h`（`CORE_NETWORK_OPS_T`，35 个成员），而不是 Linux/ESP-IDF 那种直接 include 套接字头文件的方式。它一对一覆盖 BSD 套接字接口——`socket_create`、`connect`、`bind`、`listen`、`accept`、`send`/`recv` 及 `_to` 变体、`select` 与四个 `fd_set` 辅助函数、阻塞模式、超时、缓冲区大小、keepalive、Nagle、广播、域名解析、套接字取名、选项与地址转换。把它绑定到你的 `tkl_network.h` 实现。

## 步骤

1. 把 `port/tuyaopen/` 复制进固件源码树，并把 `tuyaopen-core_ops.c` 加入构建。
2. 加入核心库的归档或源码，并把 module 头文件目录加入 include 路径。
3. 按需编译能力模块（IoT 始终包含；AI Agent 与 P2P 为编译开关）。
4. 初始化既有工程树未提供的核心服务，然后按与所有示例相同的顺序驱动客户端：`tuya_iot_init` → `tuya_iot_start` → 循环调用 `tuya_iot_yield`。
5. 仅当 TKL 构建确实提供 `tkl_bluetooth.h` / `tkl_fs.h` 时绑定蓝牙与文件系统 module；否则不接入，对应功能返回不支持。

## 应用代码的变化

- **保留：** BSP、驱动、RTOS 配置与整个 TKL 层——module 之下无需任何改动。
- **新增：** 一个带事件回调的 Core 客户端；对象/原始 DP 以 `TUYA_EVENT_DP_RECEIVE_OBJ/RAW` 到达（见 [使用 IoT API](iot-api.md)）。
- **替换：** 任何框架特有的云端代码。Core 不提供 `tal_*` 服务 API——云端连接、DP 上报与 OTA 都通过 `tuya_iot_*` 与 OTA 回调完成。
- **OTA：** 注册 `CORE_OTA_CBS_T`，在回调中沿用你既有的固件升级机制；不需要 OTA ops module。

## 下一步

- [适配新平台](port-to-platform.md) —— 全部 module 契约
- [使用 IoT API](iot-api.md) —— 迁移后的应用侧接口
