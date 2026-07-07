---
title: "Wi-Fi Station Tutorial"
description: "Wi-Fi station tutorial for TuyaOpen: connect to an AP with tal_wifi_station_connect, scan APs, read connection info, and reconnect after drops."
keywords:
  - wifi station
  - tal_wifi
  - access point
  - reconnect
  - tuyaopen peripheral
---

A Wi-Fi station connects to an access point so your device can reach the network. This tutorial shows how to connect a TuyaOpen device to a Wi-Fi network, scan for access points, read connection info, and reconnect after a drop, using the `tal_wifi.h` API.

## Prerequisites

- Completed [Environment Setup](../../quick-start/enviroment-setup)
- Board with Wi-Fi support (`ENABLE_WIFI=y`)

## Requirements

- TuyaOpen development board (any Wi-Fi-capable platform)
- 2.4 GHz Wi-Fi access point with known SSID and password

## Basic connection

Initialize the Wi-Fi subsystem with `tal_wifi_init`, then connect with `tal_wifi_station_connect`. The event callback receives a `WF_EVENT_E` event code; track the station state from there.

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
`tal_wifi_station_connect` starts the connection; it does not block until an IP is assigned. Wait for the station state to reach `WSS_GOT_IP` (see below) before using the network.
:::

## Scanning for networks

`tal_wifi_all_ap_scan` allocates an array of `AP_IF_S` entries. Free it with `tal_wifi_release_ap` when you are done.

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

## Getting connection info

Read the IP configuration with `tal_wifi_get_ip`, the signal strength with `tal_wifi_station_get_conn_ap_rssi`, and the MAC with `tal_wifi_get_mac`.

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

## Reconnection pattern

TuyaOpen's cloud service handles reconnection automatically for cloud-connected devices. For standalone Wi-Fi applications, poll the station status and reconnect when it is not `WSS_GOT_IP`:

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

## Platform-specific notes

- **ESP32:** Power save mode (`WIFI_PS_MIN_MODEM`) is enabled automatically after connection. This saves power but adds latency.
- **ESP32:** ADC2 channels are unavailable while Wi-Fi is active (classic ESP32 only).
- **All platforms:** Call `tal_wifi_station_disconnect()` to cleanly disconnect before switching modes.

## See also

- [TAL Wi-Fi API reference](tal-wifi-api)
- [TAL Network API reference](tal-network-api)
- [TKL Wi-Fi API](/docs/tkl-api/tkl_wifi)
- [Wi-Fi STA example](https://github.com/tuya/TuyaOpen/tree/master/examples/wifi/sta)
- [Device Network Configuration](../../quick-start/device-network-configuration)
