---
title: Tuya IoT 客户端 API 参考
---

## 概述

`tuya_iot.h` 定义 **Tuya IoT 客户端**：配置、生命周期（`init` / `start` / `yield` / `stop` / `destroy`）、云端激活、MQTT 连接、DP（数据点）上报与事件分发。依赖云服务的应用在 TAL（Wi-Fi、网络、KV 等）之上链接该层。

**源码：** `TuyaOpen/src/tuya_cloud_service/cloud/tuya_iot.h`

**读者：** 维护或扩展涂鸦云相关 Demo（如 `switch_demo`、IoT light）的开发者。

:::note
使用涂鸦云服务需要有效的 **授权码（license key）** 与产品配置。若应用连接涂鸦云，请参阅 [设备授权](../../quick-start/equipment-authorization)。
:::

## 配置结构体

| 类型 | 作用 |
|------|------|
| `tuya_iot_config_t` | Product key、UUID、授权码、软件版本，以及可选 modules/skill/storage/OTA 字段、`event_handler`、`network_check`、`ota_handler`。 |
| `tuya_iot_license_t` | 授权读取用的 `uuid` / `authkey`。 |
| `tuya_activated_data_t` | 激活后的设备 ID、密钥、schema、时区等。 |
| `tuya_event_msg_t` | 事件 ID、数据类型与值，交给 `event_handle_cb_t`。 |

## 客户端生命周期

| 函数 | 说明 |
|----------|-------------|
| `tuya_iot_license_read` | 从存储读取激活授权信息。 |
| `tuya_iot_init` | 根据 `tuya_iot_config_t` 初始化客户端。 |
| `tuya_iot_start` | 启动云服务（网络与协议栈）。 |
| `tuya_iot_yield` | 驱动客户端状态机（需在线程或主循环中周期性调用）。 |
| `tuya_iot_stop` | 停止云服务。 |
| `tuya_iot_reset` | 重置客户端状态。 |
| `tuya_iot_destroy` | 销毁并释放资源。 |
| `tuya_iot_reconnect` | 重连 MQTT。 |

## 数据点（DP）

| 函数 | 说明 |
|----------|-------------|
| `tuya_iot_dp_report_json` | 以 JSON 字符串上报 DP。 |
| `tuya_iot_dp_report_json_with_time` | 带各 DP 时间戳 JSON 的上报。 |
| `tuya_iot_dp_report_json_async` | 异步上报，带回调与超时。 |
| `tuya_iot_dp_report_json_with_notify` | 同步上报并带结果回调。 |

下行 DP 通过 **事件回调** 以 `TUYA_EVENT_DP_RECEIVE`、`TUYA_EVENT_DP_RECEIVE_CJSON`、`TUYA_EVENT_DP_RECEIVE_OBJ`、`TUYA_EVENT_DP_RECEIVE_RAW` 等形式送达（见 `tuya_event_id_t`）。

## 状态、身份与工具

| 函数 | 说明 |
|----------|-------------|
| `tuya_iot_activated` | 是否已完成激活。 |
| `tuya_iot_activated_data_remove` | 清除已存储的激活数据。 |
| `tuya_iot_token_get_port_register` | 注册自定义获取 token 的接口。 |
| `tuya_iot_version_update_sync` | 同步软件版本到云端。 |
| `tuya_iot_extension_modules_version_update` | 更新扩展模块版本字符串。 |
| `tuya_iot_devid_get` / `tuya_iot_localkey_get` / `tuya_iot_seckey_get` / `tuya_iot_timezone_get` | 读取激活后设备字段。 |
| `tuya_iot_client_get` | 全局客户端指针（如适用）。 |
| `tuya_iot_is_connected` | 云/MQTT 是否已连接。 |
| `tuya_iot_dispatch_event` | 内部事件分发。 |

## 事件 ID（节选）

| 事件 | 含义 |
|-------|---------|
| `TUYA_EVENT_RESET` / `TUYA_EVENT_RESET_COMPLETE` | 重置流程。 |
| `TUYA_EVENT_BIND_START` / `TUYA_EVENT_BIND_TOKEN_ON` / `TUYA_EVENT_BINDED_NOTIFY` | 绑定与 token。 |
| `TUYA_EVENT_ACTIVATE_SUCCESSED` | 激活成功。 |
| `TUYA_EVENT_MQTT_CONNECTED` / `TUYA_EVENT_MQTT_DISCONNECT` / `TUYA_EVENT_DIRECT_MQTT_CONNECTED` | MQTT 状态。 |
| `TUYA_EVENT_DP_RECEIVE*` | 下行 DP。 |
| `TUYA_EVENT_UPGRADE_NOTIFY` | OTA 通知。 |
| `TUYA_EVENT_TIMESTAMP_SYNC` | 时间同步。 |
| `TUYA_EVENT_DPCACHE_NOTIFY` | DP 缓存。 |
| `TUYA_EVENT_RTC_REQ` | RTC 相关。 |

`tuya_client_status_t` 提供 Wi-Fi/MQTT 等粗粒度状态，可用于界面或逻辑。

## 参考

- Demo：[涂鸦 IoT light](demo-tuya-iot-light)
- [TAL Wi-Fi API 参考](../../peripheral/tutorials/tal-wifi-api)
- [TAL Network API 参考](../../peripheral/tutorials/tal-network-api)
- [设备授权](../../quick-start/equipment-authorization)
