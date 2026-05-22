---
title: MQTT 客户端教程
---

## 概述

本教程介绍 **MQTT 客户端**示例：连接公共 Broker、订阅、按 QoS 发布、再取消订阅。代码使用 `mqtt_client_interface.h`（init、connect、`mqtt_client_yield`、subscribe/publish/unsubscribe），并配合 netmgr 与 Wi-Fi 或有线网络。

## 前置条件

- [环境搭建](../../quick-start/enviroment-setup)
- 了解 MQTT 主题与 QoS（0/1）

## 要求

- 可构建 `examples/protocols/mqtt_client` 且含 MQTT 与网络支持的配置。
- 设备可访问 Broker 地址与端口（示例默认 `broker.emqx.io:1883`）。
- 示例内为 EMQX 演示账号，生产环境请替换为自有 Broker 与凭据。

## 步骤

1. 打开 `examples/protocols/mqtt_client`。

2. 编辑 `src/examples_mqtt_client.c`：Wi-Fi 凭据；`mqtt_client_config_t` 中的 `host`、`port`、`clientid`、`username`、`password` 及各回调。

3. 构建并烧录：
   ```bash
   cd examples/protocols/mqtt_client
   tos.py config choice
   tos.py build
   ```

4. 链路上线后依次 `mqtt_client_init`、`mqtt_client_connect`，并周期性调用 **`mqtt_client_yield`** 以处理报文。连接成功回调里订阅；订阅成功回调里发布测试消息；发布确认路径中取消订阅。

**预期结果：** 串口日志依次出现连接、订阅、发布与 PUBACK。

## 实现说明

- 连接期间必须定期 **`mqtt_client_yield`**，否则无法处理 SUBACK/PUBLISH/PUBACK。
- 主题与载荷需与云端或 Broker 约定一致。
- 本示例为通用 MQTT 客户端，与 `tuya_iot` 内置涂鸦云 MQTT 不是同一套路径。

## 参考

- 源码：`examples/protocols/mqtt_client/src/examples_mqtt_client.c`
- [TAL Network API 参考](tal-network-api)
- [示例索引](../../examples/demo-generic-examples)
