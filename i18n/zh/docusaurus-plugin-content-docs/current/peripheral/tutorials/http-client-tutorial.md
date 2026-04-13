---
title: HTTP 客户端教程
---

## 概述

本教程说明 TuyaOpen 仓库中的 HTTP 客户端示例：链路就绪后使用 `http_client_interface` 的 `http_client_request` 与 `http_client_free` 发送 GET。示例基于 netmgr 与 Wi-Fi 或有线。

## 前置条件

- [环境搭建](../../quick-start/enviroment-setup)
- [Wi-Fi Station 教程](wifi-station-tutorial)

## 要求

- 板级配置支持 Wi-Fi 或有线及 HTTP 客户端。
- 网络可访问测试主机（示例默认 httpbin.org）。

## 步骤

1. 打开 `examples/protocols/http_client`。

2. 开启 Wi-Fi 时在 `src/example_http_client.c` 填写 SSID 与密码。

3. 构建：
   ```bash
   cd examples/protocols/http_client
   tos.py config choice
   tos.py build
   ```

4. 烧录并查看串口。链路上线后调用 `http_client_request`，再 `http_client_free`。

5. HTTPS 请用 `examples/protocols/https_client`。

**预期结果：** 日志含 DNS、TCP 与响应正文。

## 实现说明

- 在 NETMGR_LINK_UP 之后再发请求（示例用 `__link_status_cb`）。
- `http_client_request` 后必须 `http_client_free`。

## 参考

- `examples/protocols/http_client/src/example_http_client.c`
- [示例索引](../../examples/demo-generic-examples)
- [TAL Network API 参考](tal-network-api)
