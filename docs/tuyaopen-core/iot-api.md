---
title: Using the IoT API
description: "The TuyaOpen Core IoT API: client lifecycle on a manual yield loop, event handling, object and raw data points, LAN service, and OTA callbacks."
keywords:
  - tuyaopen core
  - iot api
  - data points
  - ota
  - mqtt
---

The IoT API is the base capability of TuyaOpen Core: it activates the device, maintains the MQTT connection, delivers data points (DPs), and runs OTA. It lives in one header, `tuya_iot.h`, and is always compiled.

## Lifecycle: one struct, one loop

You embed a `tuya_iot_client_t` client in your application, fill a `tuya_iot_config_t`, and drive the SDK by repeatedly calling `tuya_iot_yield()` on your own thread. The SDK creates no cloud worker thread — MQTT receive, activation, keepalive, and OTA data pumping all run inline in the yield state machine.

```c
tuya_iot_client_t client;

tuya_iot_init(&client, &(const tuya_iot_config_t){
    .software_ver  = "1.0.0",
    .productkey    = TUYA_PRODUCT_ID,
    .uuid          = uuid,
    .authkey       = authkey,
    .event_handler = user_event_handler,
    .network_check = user_network_check,
});
tuya_iot_start(&client);

for (;;) {
    tuya_iot_yield(&client);
}
```

Key config fields:

| Field | Purpose |
|---|---|
| `productkey`, `uuid`, `authkey` | Device triplet for activation |
| `software_ver` | Version reported to the cloud and used for OTA matching |
| `event_handler` | Receives every lifecycle and DP event |
| `network_check` | Returns whether IP connectivity is available |
| `skill_param` | Extra capability JSON reported at activation (used by the P2P sample) |
| `storage_namespace`, `firmware_key` | KV namespace and firmware identifier |

Other lifecycle calls: `tuya_iot_stop`, `tuya_iot_reconnect`, `tuya_iot_reset` (factory reset), and `tuya_iot_destroy`. Status helpers include `tuya_iot_activated`, `tuya_iot_is_connected`, and `tuya_iot_devid_get`.

## Events

All notifications arrive at one callback:

```c
static void user_event_handler(tuya_iot_client_t *client, tuya_event_msg_t *event)
{
    switch (event->id) {
    case TUYA_EVENT_MQTT_CONNECTED:
        tuya_lan_enable();
        break;
    case TUYA_EVENT_DP_RECEIVE_OBJ:
        /* event->value.dpobj points to dp_obj_recv_t */
        break;
    case TUYA_EVENT_DP_RECEIVE_RAW:
        /* event->value.dpraw points to dp_raw_recv_t */
        break;
    default:
        break;
    }
}
```

Common event IDs:

| Event | Meaning |
|---|---|
| `TUYA_EVENT_ACTIVATE_SUCCESSED` | Device activated against the cloud |
| `TUYA_EVENT_MQTT_CONNECTED` / `TUYA_EVENT_MQTT_DISCONNECT` | Cloud link state |
| `TUYA_EVENT_DIRECT_MQTT_CONNECTED` | Direct connection up (binding mode prints the QR code here) |
| `TUYA_EVENT_DP_RECEIVE_OBJ` | Object-format DPs received |
| `TUYA_EVENT_DP_RECEIVE_RAW` | Raw-format DP received |
| `TUYA_EVENT_BINDED_NOTIFY` | Device bound to a user account |
| `TUYA_EVENT_UPGRADE_NOTIFY` | Cloud upgrade notice (raw JSON in `value.asJSON`) |
| `TUYA_EVENT_TIMESTAMP_SYNC` | Cloud time synchronized |
| `TUYA_EVENT_RTC_REQ` | Cloud RTC signaling for a P2P session |

## Reporting and receiving data points

Received object DPs arrive as a `dp_obj_recv_t` containing an array of `dp_obj_t`:

```c
case TUYA_EVENT_DP_RECEIVE_OBJ: {
    dp_obj_recv_t *obj = event->value.dpobj;
    for (int i = 0; i < obj->dpscnt; i++) {
        switch (obj->dps[i].type) {
        case PROP_BOOL:   /* obj->dps[i].value.dp_bool */  break;
        case PROP_VALUE:  /* obj->dps[i].value.dp_value */ break;
        case PROP_STR:    /* obj->dps[i].value.dp_str */   break;
        case PROP_ENUM:   /* obj->dps[i].value.dp_enum */  break;
        case PROP_BITMAP: /* obj->dps[i].value.dp_bitmap */ break;
        }
    }
    /* Echo the received DPs back to the cloud */
    tuya_iot_dp_obj_report(client, obj->devid, obj->dps, obj->dpscnt, 0);
    break;
}
```

DP property types are `PROP_BOOL`, `PROP_VALUE`, `PROP_STR`, `PROP_ENUM`, and `PROP_BITMAP`. A command's origin is recorded in `dp_cmd_type_t`: `DP_CMD_MQ` (cloud), `DP_CMD_LAN`, `DP_CMD_BT` (Bluetooth), `DP_CMD_TIMER`, or `DP_CMD_AI_SKILL`.

You can also report DPs as a JSON string — convenient when you already build JSON:

```c
tuya_iot_dp_report_json(client, "{\"101\":true}");
```

Raw DPs (a byte payload for streaming-style points) use a separate pair:

```c
tuya_iot_dp_raw_report(client, devid, &(dp_raw_t){ .id = id }, timeout_ms);
/* incoming: TUYA_EVENT_DP_RECEIVE_RAW, value.dpraw->dp */
```

The conceptual model behind DPs — types, read/write modes, and the cloud schema — is shared with the full TuyaOpen framework: each product function becomes a data point, see [Create Your Product & Agent](../cloud/tuya-cloud/creating-new-product.md).

## LAN service

After MQTT connects, a single call starts a local-network TCP/UDP service so the Tuya app can discover and control the device without going through the cloud:

```c
int tuya_lan_enable(void);
```

It requires an activated device and resolves the client internally; never call the internal `tuya_lan_init` yourself. LAN commands run through the same DP pipeline and surface as `TUYA_EVENT_DP_RECEIVE_OBJ` with origin `DP_CMD_LAN`. Disable it with `tuya_lan_disable()`; related calls include `tuya_lan_dp_report` and `tuya_lan_get_client_num`.

## OTA

OTA is not an ops module. The sample uses the callback-injection style: register a static, constant `CORE_OTA_CBS_T` before connecting, and the core download flow drives your writer:

```c
static const CORE_OTA_CBS_T s_ota_cbs = {
    .start_notify = ota_start_notify,   /* prepare the target: image size, type, path */
    .data_process = ota_data_process,   /* write TUYA_OTA_DATA_T chunks; report remain_len */
    .end_notify   = ota_end_notify,     /* finalize and, when reset is TRUE, reboot */
};
core_ota_register_cbs(&s_ota_cbs);
```

Without registration, OTA entry points return `OPRT_NOT_SUPPORTED`; the structure must have static storage lifetime. The type field distinguishes `TUYA_OTA_FULL` and `TUYA_OTA_DIFF`, and the path field reports the channel (`TUYA_OTA_PATH_AIR`, `_UART`, `_BLE`, and others). On the device you write firmware using your platform's own update mechanism — for example, the ESP-IDF sample writes through `esp_ota_*` and restarts.

:::tip
You can instead handle OTA purely as events by setting `ota_handler` in `tuya_iot_config_t`; your callback receives `TUYA_OTA_EVENT_START`, `TUYA_OTA_EVENT_ON_DATA`, `TUYA_OTA_EVENT_FINISH`, and `TUYA_OTA_EVENT_FAULT`.
:::

## Threading notes

- Keep the yield thread stack sized for TLS peaks: the ESP-IDF sample gives it 8 KB.
- DP parsing is deferred to a work queue, so initialize one with `core_workq_init()`; software timers need `core_sw_timer_init()`.
- Report link state from your platform through `core_netif_set_link_cb` — the core has no Wi-Fi abstraction, it only sees link status and an active IP.

## Next steps

- [AI Agent API](agent-api.md) — conversational AI over the same cloud connection
- [P2P API](p2p-api.md) — low-latency media sessions
- [Port to a new platform](port-to-platform.md) — the services behind the work queue, timers, and link callback
