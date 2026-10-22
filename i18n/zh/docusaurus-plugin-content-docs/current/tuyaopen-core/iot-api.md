---
title: 使用 IoT API
description: "TuyaOpen Core IoT API：手动 yield 循环上的客户端生命周期、事件处理、对象与原始数据点、局域网服务以及 OTA 回调。"
keywords:
  - tuyaopen core
  - iot api
  - 数据点
  - ota
  - mqtt
---

IoT API 是 TuyaOpen Core 的基础能力：负责设备激活、MQTT 连接维护、数据点（DP）下发与 OTA。它集中在一个头文件 `tuya_iot.h` 中，且始终参与编译。

## 生命周期：一个结构体，一个循环

在应用中内嵌一个 `tuya_iot_client_t` 客户端，填写 `tuya_iot_config_t`，然后在自己的线程中反复调用 `tuya_iot_yield()` 驱动 SDK。SDK 不会创建云端工作线程——MQTT 接收、激活、保活与 OTA 数据泵都在 yield 状态机内同步执行。

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

常用配置字段：

| 字段 | 用途 |
|---|---|
| `productkey`、`uuid`、`authkey` | 设备激活三元组 |
| `software_ver` | 上报云端、用于 OTA 匹配的版本号 |
| `event_handler` | 接收所有生命周期与 DP 事件 |
| `network_check` | 返回当前是否具备 IP 连通性 |
| `skill_param` | 激活时上报的附加能力 JSON（P2P 示例使用） |
| `storage_namespace`、`firmware_key` | KV 命名空间与固件标识 |

其他生命周期接口：`tuya_iot_stop`、`tuya_iot_reconnect`、`tuya_iot_reset`（恢复出厂）、`tuya_iot_destroy`。状态查询接口包括 `tuya_iot_activated`、`tuya_iot_is_connected`、`tuya_iot_devid_get`。

## 事件

所有通知都到达同一个回调：

```c
static void user_event_handler(tuya_iot_client_t *client, tuya_event_msg_t *event)
{
    switch (event->id) {
    case TUYA_EVENT_MQTT_CONNECTED:
        tuya_lan_enable();
        break;
    case TUYA_EVENT_DP_RECEIVE_OBJ:
        /* event->value.dpobj 指向 dp_obj_recv_t */
        break;
    case TUYA_EVENT_DP_RECEIVE_RAW:
        /* event->value.dpraw 指向 dp_raw_recv_t */
        break;
    default:
        break;
    }
}
```

常用事件 ID：

| 事件 | 含义 |
|---|---|
| `TUYA_EVENT_ACTIVATE_SUCCESSED` | 设备已在云端激活 |
| `TUYA_EVENT_MQTT_CONNECTED` / `TUYA_EVENT_MQTT_DISCONNECT` | 云端连接状态 |
| `TUYA_EVENT_DIRECT_MQTT_CONNECTED` | 直连建立（绑定模式在此事件打印二维码） |
| `TUYA_EVENT_DP_RECEIVE_OBJ` | 收到对象格式 DP |
| `TUYA_EVENT_DP_RECEIVE_RAW` | 收到原始格式 DP |
| `TUYA_EVENT_BINDED_NOTIFY` | 设备已绑定到用户账号 |
| `TUYA_EVENT_UPGRADE_NOTIFY` | 云端升级通知（原始 JSON 在 `value.asJSON`） |
| `TUYA_EVENT_TIMESTAMP_SYNC` | 云端时间已同步 |
| `TUYA_EVENT_RTC_REQ` | P2P 会话的云端 RTC 信令 |

## 数据点的上报与接收

收到的对象 DP 以 `dp_obj_recv_t` 形式到达，内含 `dp_obj_t` 数组：

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
    /* 把收到的 DP 回传给云端 */
    tuya_iot_dp_obj_report(client, obj->devid, obj->dps, obj->dpscnt, 0);
    break;
}
```

DP 属性类型包括 `PROP_BOOL`、`PROP_VALUE`、`PROP_STR`、`PROP_ENUM`、`PROP_BITMAP`。指令来源记录在 `dp_cmd_type_t` 中：`DP_CMD_MQ`（云端）、`DP_CMD_LAN`、`DP_CMD_BT`（蓝牙）、`DP_CMD_TIMER`、`DP_CMD_AI_SKILL`。

如果你本来就在组装 JSON，也可以直接以 JSON 字符串上报：

```c
tuya_iot_dp_report_json(client, "{\"101\":true}");
```

原始 DP（透传字节负载，用于流式数据点）使用另一组接口：

```c
tuya_iot_dp_raw_report(client, devid, &(dp_raw_t){ .id = id }, timeout_ms);
/* 接收：TUYA_EVENT_DP_RECEIVE_RAW，value.dpraw->dp */
```

DP 背后的概念——类型、读写模式与云端物模型——与完整 TuyaOpen 框架完全一致：每个产品功能都会成为一个数据点，见 [创建产品与 Agent](../cloud/tuya-cloud/creating-new-product.md)。

## 局域网服务

MQTT 连接后，一次调用即可启动本地 TCP/UDP 服务，让涂鸦 App 不经云端即可发现并控制设备：

```c
int tuya_lan_enable(void);
```

它要求设备已激活，并会在内部自行获取客户端；不要直接调用内部的 `tuya_lan_init`。局域网指令走同一条 DP 处理管线，以来源 `DP_CMD_LAN` 的 `TUYA_EVENT_DP_RECEIVE_OBJ` 事件到达。停止服务用 `tuya_lan_disable()`；其他相关接口包括 `tuya_lan_dp_report`、`tuya_lan_get_client_num`。

## OTA

OTA 不是 ops module。示例采用回调注入方式：连接前注册一个静态常量 `CORE_OTA_CBS_T`，核心下载流程会驱动你的写入实现：

```c
static const CORE_OTA_CBS_T s_ota_cbs = {
    .start_notify = ota_start_notify,   /* 准备目标分区：镜像大小、类型、通道 */
    .data_process = ota_data_process,   /* 写入 TUYA_OTA_DATA_T 分片；上报 remain_len */
    .end_notify   = ota_end_notify,     /* 收尾；reset 为 TRUE 时重启 */
};
core_ota_register_cbs(&s_ota_cbs);
```

未注册时 OTA 入口返回 `OPRT_NOT_SUPPORTED`；该结构体必须具有静态存储期。类型字段区分 `TUYA_OTA_FULL`（整包）与 `TUYA_OTA_DIFF`（差分包），通道字段标识来源（`TUYA_OTA_PATH_AIR`、`_UART`、`_BLE` 等）。设备侧请使用平台自有的升级机制写入固件——例如 ESP-IDF 示例通过 `esp_ota_*` 写入并重启。

:::tip
也可以在 `tuya_iot_config_t` 中设置 `ota_handler`，完全以事件方式处理 OTA；回调会收到 `TUYA_OTA_EVENT_START`、`TUYA_OTA_EVENT_ON_DATA`、`TUYA_OTA_EVENT_FINISH`、`TUYA_OTA_EVENT_FAULT`。
:::

## 线程注意事项

- yield 线程栈要按 TLS 峰值预留：ESP-IDF 示例为 8 KB。
- DP 解析会延迟到工作队列执行，因此需要用 `core_workq_init()` 初始化工作队列；软件定时器需要 `core_sw_timer_init()`。
- 平台通过 `core_netif_set_link_cb` 上报连接状态——核心没有 Wi-Fi 抽象，只感知链路状态与活动 IP。

## 下一步

- [AI Agent API](agent-api.md) —— 在同一条云端连接上做对话式 AI
- [P2P API](p2p-api.md) —— 低延迟媒体会话
- [适配新平台](port-to-platform.md) —— 工作队列、定时器与链路回调背后的服务
