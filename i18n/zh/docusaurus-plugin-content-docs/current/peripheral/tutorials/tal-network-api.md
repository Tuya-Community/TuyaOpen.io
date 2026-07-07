---
title: TAL Network API 参考
description: "tal_network.h 封装 TCP/UDP 套接字、select 与常用套接字选项为可移植 API，流程类似 BSD：创建、connect/listen/accept，再 send/recv。"
keywords:
  - TAL Network
  - tal_network
  - TCP
  - UDP
  - TuyaOpen API
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
| `tal_net_get_errno` | 最近一次网络错误（`TUYA_ERRNO`）。 |
| `tal_net_select` | 等待可读/可写/异常集，超时单位为毫秒。 |
| `tal_net_fd_set`、`tal_net_fd_clear`、`tal_net_fd_isset`、`tal_net_fd_zero` | 描述符集辅助函数。宏：`TAL_FD_SET`、`TAL_FD_CLR`、`TAL_FD_ISSET`、`TAL_FD_ZERO`。 |
| `tal_net_get_nonblock` | 查询非阻塞模式。 |
| `tal_net_set_block` | 设置阻塞或非阻塞。 |
| `tal_net_close` | 关闭套接字 fd。 |

## 套接字生命周期

| 函数 | 说明 |
|----------|-------------|
| `tal_net_socket_create` | 创建 TCP 或 UDP 套接字（`TUYA_PROTOCOL_TYPE_E`）。返回 fd。 |
| `tal_net_connect` | TCP 连接到地址与端口。 |
| `tal_net_connect_raw` | 用原始套接字地址缓冲连接。 |
| `tal_net_bind` | 绑定本地地址与端口。 |
| `tal_net_listen` | 按 backlog 监听。 |
| `tal_net_accept` | 接受连接；可选输出对端地址与端口。 |

## 数据传输

| 函数 | 说明 |
|----------|-------------|
| `tal_net_send`、`tal_net_recv` | 流式收发。 |
| `tal_net_send_to`、`tal_net_recvfrom` | 带对端地址的 UDP 收发。 |
| `tal_net_recv_nd_size` | 收满 `nd_size` 字节或出错为止。 |

## 选项与 DNS

| 函数 | 说明 |
|----------|-------------|
| `tal_net_set_timeout` | 发送或接收超时（`TUYA_TRANS_TYPE_E`）。 |
| `tal_net_set_bufsize` | 缓冲区大小。 |
| `tal_net_set_reuse` | SO_REUSEADDR 风格的端口复用。 |
| `tal_net_disable_nagle` | TCP_NODELAY。 |
| `tal_net_set_broadcast` | UDP 广播。 |
| `tal_net_set_keepalive` | TCP 保活。 |
| `tal_net_gethostbyname` | 将域名解析为 `TUYA_IP_ADDR_T`。 |
| `tal_net_get_socket_ip` | 本地已绑定地址。 |
| `tal_net_str2addr`、`tal_net_addr2str` | 字符串与地址互转。 |
| `tal_net_setsockopt`、`tal_net_getsockopt` | 原始选项（`TUYA_OPT_LEVEL`、`TUYA_OPT_NAME`）。 |

## 典型 TCP 客户端

1. Wi-Fi 就绪（[Wi-Fi Station 教程](wifi-station-tutorial)）。
2. 用 `tal_net_socket_create` 创建套接字，TCP 枚举见 `tuya_cloud_types.h`。
3. 可选：使用非阻塞模式与 `tal_net_select` 实现超时。
4. 用 `tal_net_gethostbyname` 解析域名，再 `tal_net_connect`。
5. 循环调用 `tal_net_send` 与 `tal_net_recv`。
6. `tal_net_close`。

## 平台说明

返回类型混用 `OPERATE_RET`、`TUYA_ERRNO` 与字节计数，请阅读头文件中每个函数的注释。适配层最终映射到移植的协议栈（例如 lwIP）。

## 参考

- [TAL Wi-Fi API 参考](tal-wifi-api)
- [TKL lwIP](../../tkl-api/tkl_lwip)
- `TuyaOpen/src/tal_network/include/tal_network.h`
