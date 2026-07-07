---
title: "Wi-Fi Station 教程"
description: "Wi-Fi Station 教程基于 tal_wifi.h 接口，介绍如何将 TuyaOpen 设备连接到 Wi-Fi、扫描接入点、读取连接信息，并在断连后重连。"
keywords:
  - Wi-Fi Station
  - tal_wifi
  - 扫描接入点
  - TuyaOpen 教程
  - 网络协议
---

Wi-Fi Station（station 模式）连接到接入点，使设备接入网络。本教程基于 `tal_wifi.h` 接口，介绍如何将 TuyaOpen 设备连接到 Wi-Fi 网络、扫描接入点、读取连接信息，以及在断连后重连。

## 前置条件

- 已完成[环境搭建](../../quick-start/enviroment-setup)
- 支持 Wi-Fi 的板型（`ENABLE_WIFI=y`）

## 要求

- TuyaOpen 开发板（任意支持 Wi-Fi 的平台）
- 已知 SSID 与密码的 2.4 GHz Wi-Fi 接入点

## 基本连接

先用 `tal_wifi_init` 初始化 Wi-Fi 子系统，再用 `tal_wifi_station_connect` 发起连接。事件回调接收 `WF_EVENT_E` 事件码，可据此跟踪 station 状态。

```c
#include "tal_wifi.h"
#include "tal_log.h"

static void wifi_event_cb(WF_EVENT_E event, void *arg)
{
    TAL_PR_INFO("Wi-Fi event: %d", event);
}

void connect_wifi(void)
{
    tal_wifi_init(wifi_event_cb);

    OPERATE_RET rt = tal_wifi_station_connect((int8_t *)"MySSID", (int8_t *)"MyPassword");
    if (rt == OPRT_OK) {
        TAL_PR_INFO("connect request accepted");
    } else {
        TAL_PR_ERR("connect failed: %d", rt);
    }
}
```

:::note
`tal_wifi_station_connect` 仅发起连接，不会阻塞到分配 IP。请等待 station 状态变为 `WSS_GOT_IP`（见下文）后再使用网络。
:::

## 扫描网络

`tal_wifi_all_ap_scan` 会分配一个 `AP_IF_S` 数组，使用完毕后须用 `tal_wifi_release_ap` 释放。

```c
AP_IF_S *ap_list = NULL;
uint32_t ap_count = 0;

tal_wifi_all_ap_scan(&ap_list, &ap_count);

for (uint32_t i = 0; i < ap_count; i++) {
    TAL_PR_INFO("SSID: %s, RSSI: %d, Channel: %d",
                ap_list[i].ssid, ap_list[i].rssi, ap_list[i].channel);
}

tal_wifi_release_ap(ap_list);
```

## 获取连接信息

用 `tal_wifi_get_ip` 读取 IP 配置，用 `tal_wifi_station_get_conn_ap_rssi` 读取信号强度，用 `tal_wifi_get_mac` 读取 MAC。

```c
NW_IP_S ip;
tal_wifi_get_ip(WF_STATION, &ip);
TAL_PR_INFO("IP: %s, mask: %s, gw: %s", ip.ip, ip.mask, ip.gw);

int8_t rssi;
tal_wifi_station_get_conn_ap_rssi(&rssi);
TAL_PR_INFO("signal: %d dBm", rssi);

NW_MAC_S mac;
tal_wifi_get_mac(WF_STATION, &mac);
```

## 重连模式

TuyaOpen 云服务会自动处理云端设备的重连。对于独立 Wi-Fi 应用，轮询 station 状态，当状态不是 `WSS_GOT_IP` 时重连：

```c
static void wifi_monitor_task(void *arg)
{
    while (1) {
        WF_STATION_STAT_E stat;
        tal_wifi_station_get_status(&stat);

        if (stat != WSS_GOT_IP) {
            TAL_PR_WARN("Wi-Fi disconnected, reconnecting...");
            tal_wifi_station_connect((int8_t *)"MySSID", (int8_t *)"MyPassword");
        }

        tal_system_sleep(10000);
    }
}
```

## 平台说明

- **ESP32：** 连接后自动启用省电模式（`WIFI_PS_MIN_MODEM`），节省功耗但增加延迟。
- **ESP32：** Wi-Fi 激活时 ADC2 通道不可用（仅经典 ESP32）。
- **所有平台：** 切换工作模式前，调用 `tal_wifi_station_disconnect()` 干净断开。

## 相关文档

- [TAL Wi-Fi API 参考](tal-wifi-api)
- [TAL Network API 参考](tal-network-api)
- [TKL Wi-Fi API](/docs/tkl-api/tkl_wifi)
- [Wi-Fi STA 示例](https://github.com/tuya/TuyaOpen/tree/master/examples/wifi/sta)
- [设备配网](../../quick-start/device-network-configuration)
