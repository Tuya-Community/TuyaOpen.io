---
title: TCP 与 UDP 套接字教程
---

## 概述

本教程说明如何用 **TAL** 网络接口使用 **TCP** 与 **UDP**。**TCP 客户端**流程与 `examples/protocols/tcp_client` 一致（`PROTOCOL_TCP`、`tal_net_connect`、`tal_net_send`）。**UDP** 部分说明 `PROTOCOL_UDP`、`tal_net_bind`、**`tal_net_send_to`**、**`tal_net_recvfrom`**；仓库中 **UDP 广播** 的完整示例见 `examples/wifi/ap`。

## 前置条件

- [环境搭建](../../quick-start/enviroment-setup)
- [TAL Network API 参考](tal-network-api)

## 要求

- 可构建 `examples/protocols/tcp_client`，且包含 `tal_network` 与（通常）Wi-Fi。
- 可达的 **TCP** 服务。默认源码为 `127.0.0.1` 与端口 7；真实硬件请将 **`TCP_SERVER_IP`** 改为 PC 或服务器局域网 IP，并开放端口。
- 做 **UDP** 实验时需对端 IP/端口，或可使用支持广播的局域网（见 Wi-Fi AP 示例）。

## 步骤（TCP 客户端）

1. 打开 `examples/protocols/tcp_client`。

2. 在 `src/example_tcp_client.c` 中设置 `TCP_SERVER_IP` 与 `TCP_SERVER_PORT`。

3. 若使用 Wi-Fi，填写同文件中的 SSID 与密码。

4. 构建运行：

   ```bash
   cd examples/protocols/tcp_client
   tos.py config choice
   tos.py build
   ```

5. 网络就绪后，任务创建 **`PROTOCOL_TCP`** 套接字，用 `tal_net_str2addr` 解析地址，`tal_net_connect` 连接，再多次 `tal_net_send`，最后 `tal_net_close`。

**预期结果：** 服务端收到重复载荷；设备日志显示连接与发送成功。

## TCP 客户端代码模式

```c
#include "tal_network.h"

int sock_fd = tal_net_socket_create(PROTOCOL_TCP);
TUYA_IP_ADDR_T server_ip = tal_net_str2addr(TCP_SERVER_IP);

if (tal_net_connect(sock_fd, server_ip, TCP_SERVER_PORT) < 0) {
    PR_ERR("connect failed");
    tal_net_close(sock_fd);
    return;
}

const char msg[] = "Hello Tuya\n";
tal_net_send(sock_fd, msg, strlen(msg));
tal_net_close(sock_fd);
```

**TCP 服务端**请参考 `examples/protocols/tcp_server`（`tal_net_bind`、`tal_net_listen`、`tal_net_accept`、`tal_net_recv`）。

## UDP 发送与接收

使用 **`PROTOCOL_UDP`** 创建套接字。下面是一个向已知主机发送并读取一次应答的 **单播** 客户端示例：

```c
#include "tal_network.h"

#define LOCAL_PORT  45000
#define REMOTE_PORT 45001

int udp_fd = tal_net_socket_create(PROTOCOL_UDP);
if (udp_fd < 0) {
    PR_ERR("udp create failed");
    return;
}

TUYA_IP_ADDR_T local_ip = tal_net_str2addr("192.168.1.50"); /* 本机接口地址 */
if (tal_net_bind(udp_fd, local_ip, LOCAL_PORT) < 0) {
    PR_ERR("bind failed");
    tal_net_close(udp_fd);
    return;
}

const char payload[] = "ping";
TUYA_IP_ADDR_T peer_ip = tal_net_str2addr("192.168.1.100");
tal_net_send_to(udp_fd, payload, strlen(payload), peer_ip, REMOTE_PORT);

char rx[256];
TUYA_IP_ADDR_T from_addr = 0;
uint16_t from_port = 0;
TUYA_ERRNO n = tal_net_recvfrom(udp_fd, rx, sizeof(rx), &from_addr, &from_port);
if (n > 0) {
    PR_DEBUG("got %d bytes from port %u", (int)n, (unsigned int)from_port);
}
tal_net_close(udp_fd);
```

将 `local_ip` 换成本机实际 IPv4 地址，具体值取决于 netmgr 或静态网络配置。

## UDP 广播参考

**广播**（在 AP 网段周期性发送）见 **`examples/wifi/ap/src/example_wifi_ap.c`**：`tal_net_socket_create(PROTOCOL_UDP)`、`tal_net_bind`、**`tal_net_set_broadcast`**，以及用地址 **`0xFFFFFFFF`** 与指定端口调用 **`tal_net_send_to`**。

## 实现说明

- 检查 `tal_net_connect`、`tal_net_send`、`tal_net_send_to`、`tal_net_recvfrom` 的返回值；负值表示适配层报错。
- 需要超时或非阻塞时可使用 `tal_net_set_block` 或 `tal_net_select`。
- TCP 面向连接；UDP 为数据报，每次 `tal_net_send_to` 通常对应一个数据报（除非协议栈分片）。

## 参考

- TCP 客户端：`examples/protocols/tcp_client/src/example_tcp_client.c`
- TCP 服务端：`examples/protocols/tcp_server`
- UDP 广播：`examples/wifi/ap/src/example_wifi_ap.c`
- API：`src/tal_network/include/tal_network.h`
- [Wi-Fi Station 教程](wifi-station-tutorial)
- [示例索引](../../examples/demo-generic-examples)
