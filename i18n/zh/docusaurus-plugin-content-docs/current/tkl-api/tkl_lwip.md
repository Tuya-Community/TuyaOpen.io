---
title: tkl_lwip | lwIP 以太网接口
description: "tkl_lwip 参考 —— 将 lwIP 协议栈适配到底层以太网硬件，初始化接口并以 pbuf 形式收发数据包的 lwIP 接口 TKL API。"
keywords:
  - tkl_lwip
  - TuyaOpen lwIP 接口
  - 以太网
  - 嵌入式驱动
---

`tkl_lwip` 将 lwIP 网络协议栈适配到底层以太网硬件，负责初始化以太网接口并以 lwIP `pbuf` 形式收发数据包。其实现位于 `tkl_lwip.c`，由 TuyaOS 自动生成和维护；请将自定义代码写在 `BEGIN` 与 `END` 标记之间，以便在重新生成时得到保留。

仅当启用 `ENABLE_LIBLWIP` 时，才需要适配这些接口。

接口使用两种不透明句柄类型：

| 类型 | 描述 |
| --- | --- |
| `TKL_NETIF_HANDLE` | 网络接口句柄（`void *`）。 |
| `TKL_PBUF_HANDLE` | lwIP `pbuf` 形式的数据包缓冲区句柄（`void *`）。 |

## tkl_ethernetif_init

```c
OPERATE_RET tkl_ethernetif_init(TKL_NETIF_HANDLE netif);
```

初始化以太网接口硬件。

参数：

| 输入/输出 | 参数名 | 描述 |
| --- | --- | --- |
| [in] | `netif` | 要初始化的网络接口。 |

返回值：

lwIP 错误码：成功时返回 `ERR_OK`，失败时返回其他值。参见 `lwip/err.h` 中的 `err_enum_t`。

## tkl_ethernetif_output

```c
OPERATE_RET tkl_ethernetif_output(TKL_NETIF_HANDLE netif, TKL_PBUF_HANDLE p);
```

通过以太网接口发送数据包。

参数：

| 输入/输出 | 参数名 | 描述 |
| --- | --- | --- |
| [in] | `netif` | 用于发送数据包的网络接口。 |
| [in] | `p` | 以 `pbuf` 形式表示的待发送数据包。 |

返回值：

lwIP 错误码：成功时返回 `ERR_OK`，失败时返回其他值。参见 `lwip/err.h` 中的 `err_enum_t`。

## tkl_ethernetif_recv

```c
OPERATE_RET tkl_ethernetif_recv(TKL_NETIF_HANDLE netif, TKL_PBUF_HANDLE p);
```

接收来自以太网接口的数据包。

参数：

| 输入/输出 | 参数名 | 描述 |
| --- | --- | --- |
| [in] | `netif` | 接收到数据包的网络接口。 |
| [in] | `p` | 以 `pbuf` 形式表示的接收数据包。 |

返回值：

lwIP 错误码：成功时返回 `ERR_OK`，失败时返回其他值。参见 `lwip/err.h` 中的 `err_enum_t`。
