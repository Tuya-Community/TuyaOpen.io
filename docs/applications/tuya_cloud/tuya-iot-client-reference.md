---
title: Tuya IoT Client API Reference
---

## Overview

`tuya_iot.h` defines the Tuya IoT client: configuration, lifecycle (`init`, `start`, `yield`, `stop`, `destroy`), cloud activation, MQTT, DP reporting, and events. Cloud apps use this layer on top of TAL (Wi-Fi, network, KV).

**Source:** `TuyaOpen/src/tuya_cloud_service/cloud/tuya_iot.h`

**Audience:** Developers extending Tuya Cloud demos such as `switch_demo` or the IoT light sample.

:::note
Tuya Cloud needs a valid license key and product setup. See [Equipment authorization](../../quick-start/equipment-authorization).
:::

## Configuration

| Type | Role |
|------|------|
| `tuya_iot_config_t` | Product key, UUID, auth key, software version, optional modules, `event_handler`, `network_check`, `ota_handler`. |
| `tuya_iot_license_t` | UUID and auth key for license read. |
| `tuya_activated_data_t` | Device ID, keys, schema, timezone after activation. |
| `tuya_event_msg_t` | Event id, type, and value for `event_handle_cb_t`. |

## Lifecycle

| Function | Description |
|----------|-------------|
| `tuya_iot_license_read` | Read license from storage. |
| `tuya_iot_init` | Initialize from config. |
| `tuya_iot_start` | Start cloud service. |
| `tuya_iot_yield` | Pump the client (call regularly). |
| `tuya_iot_stop` | Stop service. |
| `tuya_iot_reset` | Reset client. |
| `tuya_iot_destroy` | Free resources. |
| `tuya_iot_reconnect` | Reconnect MQTT. |

## Data points

| Function | Description |
|----------|-------------|
| `tuya_iot_dp_report_json` | Report DP JSON. |
| `tuya_iot_dp_report_json_with_time` | Report with timestamp JSON. |
| `tuya_iot_dp_report_json_async` | Async with callback and timeout. |
| `tuya_iot_dp_report_json_with_notify` | Sync with notify callback. |

Incoming DPs use events such as `TUYA_EVENT_DP_RECEIVE`, `TUYA_EVENT_DP_RECEIVE_CJSON`, `TUYA_EVENT_DP_RECEIVE_OBJ`, `TUYA_EVENT_DP_RECEIVE_RAW`.

## State and getters

| Function | Description |
|----------|-------------|
| `tuya_iot_activated` | Activation flag. |
| `tuya_iot_activated_data_remove` | Clear activation storage. |
| `tuya_iot_token_get_port_register` | Custom token hook. |
| `tuya_iot_version_update_sync` | Push software version. |
| `tuya_iot_extension_modules_version_update` | Extension module version. |
| `tuya_iot_devid_get`, `tuya_iot_localkey_get`, `tuya_iot_seckey_get`, `tuya_iot_timezone_get` | Activated device fields. |
| `tuya_iot_client_get` | Global client pointer. |
| `tuya_iot_is_connected` | Cloud connected. |
| `tuya_iot_dispatch_event` | Dispatch helper. |

## Selected events

Examples from `tuya_event_id_t`: `TUYA_EVENT_RESET`, `TUYA_EVENT_BIND_START`, `TUYA_EVENT_ACTIVATE_SUCCESSED`, `TUYA_EVENT_MQTT_CONNECTED`, `TUYA_EVENT_MQTT_DISCONNECT`, `TUYA_EVENT_UPGRADE_NOTIFY`, `TUYA_EVENT_TIMESTAMP_SYNC`. See the header for the full list.

`tuya_client_status_t` reports coarse Wi-Fi and MQTT states.

## References

- [Tuya IoT light](demo-tuya-iot-light)
- [TAL Wi-Fi API reference](../../peripheral/tutorials/tal-wifi-api)
- [TAL Network API reference](../../peripheral/tutorials/tal-network-api)
- [Equipment authorization](../../quick-start/equipment-authorization)
