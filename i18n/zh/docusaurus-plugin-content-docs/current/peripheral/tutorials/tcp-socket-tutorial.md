---
title: TCP 套接字客户端教程
---

## 概述

本教程说明 **TCP 客户端**示例：使用 TAL 的 `tal_net_socket_create` 创建 TCP 套接字，`tal_net_connect` 连接，循环 `tal_net_send`，最后 `tal_net_close`。与 [TAL Network API 参考](tal-network-api) 配套，展示 netmgr + Wi-Fi 的完整流程。

## 前置条件

- [环境搭建](../../quick-start/enviroment-setup)
- [TAL Network API 参考](tal-network-api)

## 要求

- 可构建 `examples/protocols/tcp_client` 且包含 `tal_network` 与（通常）Wi-Fi。
- 可达的 TCP 服务。默认源码为 `127.0.0.1` 与端口 7；真实硬件上请将 **`TCP_SERVER_IP`** 改为 PC 或服务器局域网 IP，并开放对应端口。

## 步骤

1. 打开 `examples/protocols/tcp_client`。

2. 在 `src/example_tcp_client.c` 中设置 `TCP_SERVER_IP` 与 `TCP_SERVER_PORT`。

3. 若使用 Wi-Fi，填写同文件中的 SSID 与密码。

4. 构建运行：
   ```bash
   cd examples/protocols/tcp_client
   tos.py config choice
   tos.py build
   ```

5. 网络就绪后创建 `PROTOCOL_TCP` 套接字，`tal_net_str2addr` 与 `tal_net_connect`，再多次 `tal_net_send`，间隔休眠，最后关闭套接字。

**预期结果：** 服务端收到重复载荷；设备日志显示连接与发送成功。

## 实现说明

- 检查 `tal_net_connect`、`tal_net_send` 返回值；负数表示适配层报错。
- 服务端可参考同级示例 `examples/protocols/tcp_server`。
- 需要超时或非阻塞时可使用 `tal_net_set_block` 或 `tal_net_select`。

## 参考

- 客户端：`examples/protocols/tcp_client/src/example_tcp_client.c`
- 服务端：`examples/protocols/tcp_server`
- [Wi-Fi Station 教程](wifi-station-tutorial)
- [示例索引](../../examples/demo-generic-examples)
