---
title: TAL Network API 参考
---

## 概述

`tal_network.h` 将 TCP/UDP 套接字、`select` 及常用套接字选项封装为可移植 API，流程类似 BSD：创建套接字、connect 或 bind/listen/accept，再 send/recv；UDP 使用 `send_to` / `recvfrom`。提供字符串与 `TUYA_IP_ADDR_T`（主机序 IPv4）互转。

**源码：** `TuyaOpen/src/tal_network/include/tal_network.h`

**读者：** 需要实现 HTTP 客户端、自定义 TCP/UDP 协议或与 `tal_wifi` 联调的开发者。

## IP 地址常量

| 宏 | 含义 |
|-------|---------|
| `TY_IPADDR_LOOPBACK` | 127.0.0.1 |
| `TY_IPADDR_ANY` | 0.0.0.0 |
| `TY_IPADDR_BROADCAST` | 255.255.255.255 |

## 错误与多路复用

| 函数 | 说明 |
|----------|-------------|
| `tal_net_get_errno` | 最近错误 `TUYA_ERRNO`。 |
| `tal_net_select` | 等待可读/可写/异常，超时毫秒。 |
| `tal_net_fd_set` 等 | 描述集；宏 `TAL_FD_SET`、`TAL_FD_CLR`、`TAL_FD_ISSET`、`TAL_FD_ZERO`。 |
| `tal_net_get_nonblock` / `tal_net_set_block` | 非阻塞模式。 |
| `tal_net_close` | 关闭 fd。 |

## 套接字生命周期

| 函数 | 说明 |
|----------|-------------|
| `tal_net_socket_create` | 创建 TCP/UDP（`TUYA_PROTOCOL_TYPE_E`）。 |
| `tal_net_connect` / `tal_net_connect_raw` | 连接。 |
| `tal_net_bind` / `tal_net_listen` / `tal_net_accept` | 服务端流程。 |

## 数据传输

`tal_net_send` / `tal_net_recv`；UDP 用 `tal_net_send_to` / `tal_net_recvfrom`；`tal_net_recv_nd_size` 按固定长度收满。

## 选项与 DNS

超时、缓冲区、reuse、Nagle、broadcast、keepalive、`tal_net_gethostbyname`、本地 IP、`str2addr` / `addr2str`、`setsockopt` / `getsockopt`。详见头文件注释。

## 典型 TCP 客户端

1. Wi-Fi 就绪（[Wi-Fi Station 教程](wifi-station-tutorial)）。
2. `tal_net_socket_create`（TCP 枚举见 `tuya_cloud_types.h`）。
3. 可选非阻塞 + `tal_net_select`。
4. `tal_net_gethostbyname` 后 `tal_net_connect`。
5. 循环 send/recv。
6. `tal_net_close`。

## 参考

- [TAL Wi-Fi API 参考](tal-wifi-api)
- [TKL lwIP](../../tkl-api/tkl_lwip)
