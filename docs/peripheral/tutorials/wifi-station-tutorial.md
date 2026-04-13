---
title: "Wi-Fi Station Tutorial"
---

# Wi-Fi Station Tutorial

Connect your TuyaOpen device to a Wi-Fi network, handle disconnections, and monitor connection status.

## Prerequisites

- Completed [Environment Setup](../../quick-start/enviroment-setup)
- Board with Wi-Fi support (`ENABLE_WIFI=y`)

## Requirements

- TuyaOpen development board (any Wi-Fi-capable platform)
- 2.4 GHz Wi-Fi access point with known SSID and password

## Basic Connection

```c
#include "tal_wifi.h"
#include "tal_log.h"

static void wifi_event_cb(void *arg)
{
    TAL_PR_INFO("Wi-Fi event received");
}

void connect_wifi(void)
{
    tal_wifi_init(TUYA_WIFI_WORK_MODE_STATION, wifi_event_cb);

    NW_IP_S ip = {0};
    OPERATE_RET rt = tal_wifi_station_connect("MySSID", "MyPassword", &ip);
    if (rt == OPRT_OK) {
        TAL_PR_INFO("connected, IP: %s", ip.ip);
    } else {
        TAL_PR_ERR("connection failed: %d", rt);
    }
}
```

## Scanning for Networks

```c
AP_IF_S *ap_list = NULL;
UINT32_T ap_count = 0;

tal_wifi_all_ap_scan(&ap_list, &ap_count);

for (UINT32_T i = 0; i < ap_count; i++) {
    TAL_PR_INFO("SSID: %s, RSSI: %d, Channel: %d",
                ap_list[i].ssid, ap_list[i].rssi, ap_list[i].channel);
}

tal_wifi_release_ap(ap_list);
```

## Getting Connection Info

```c
NW_IP_S ip;
tal_wifi_get_ip(WF_STATION, &ip);
TAL_PR_INFO("IP: %s, mask: %s, gw: %s", ip.ip, ip.mask, ip.gw);

SCHAR_T rssi;
tal_wifi_station_get_conn_ap_rssi(&rssi);
TAL_PR_INFO("signal: %d dBm", rssi);

NW_MAC_S mac;
tal_wifi_get_mac(WF_STATION, &mac);
```

## Reconnection Pattern

TuyaOpen's cloud service handles reconnection automatically for cloud-connected devices. For standalone Wi-Fi applications, implement a retry loop:

```c
static void wifi_monitor_task(void *arg)
{
    while (1) {
        TUYA_WIFI_STATION_STAT_E stat;
        tal_wifi_station_get_status(&stat);

        if (stat != WSS_GOT_IP) {
            TAL_PR_WARN("Wi-Fi disconnected, reconnecting...");
            NW_IP_S ip;
            tal_wifi_station_connect("MySSID", "MyPassword", &ip);
        }

        tal_system_sleep(10000);
    }
}
```

## Platform-Specific Notes

- **ESP32:** Power save mode (`WIFI_PS_MIN_MODEM`) is enabled automatically after connection. This saves power but adds latency.
- **ESP32:** ADC2 channels are unavailable while Wi-Fi is active (classic ESP32 only).
- **All platforms:** `tal_wifi_station_disconnect()` to cleanly disconnect before switching modes.

## References

- [TKL Wi-Fi API](/docs/tkl-api/tkl_wifi)
- [Wi-Fi STA example](https://github.com/tuya/TuyaOpen/tree/master/examples/wifi/sta)
- [Device Network Configuration](../../quick-start/device-network-configuration)
