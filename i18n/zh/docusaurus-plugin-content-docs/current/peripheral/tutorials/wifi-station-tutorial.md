---
title: "Wi-Fi Station 教程"
---

# Wi-Fi Station 教程

将 TuyaOpen 设备连接到 Wi-Fi 网络，处理断连，并监控连接状态。

## 基本连接

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
    }
}
```

## 扫描网络

```c
AP_IF_S *ap_list = NULL;
UINT32_T ap_count = 0;

tal_wifi_all_ap_scan(&ap_list, &ap_count);

for (UINT32_T i = 0; i < ap_count; i++) {
    TAL_PR_INFO("SSID: %s, RSSI: %d", ap_list[i].ssid, ap_list[i].rssi);
}

tal_wifi_release_ap(ap_list);
```

## 重连模式

TuyaOpen 云服务会自动处理云端设备的重连。对于独立 Wi-Fi 应用，实现重试循环：

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

## 平台说明

- **ESP32：** 连接后自动启用省电模式 (`WIFI_PS_MIN_MODEM`)，节省功耗但增加延迟。
- **ESP32：** Wi-Fi 激活时 ADC2 通道不可用（仅经典 ESP32）。

## 参考资料

- [TKL Wi-Fi API](/docs/tkl-api/tkl_wifi)
- [Wi-Fi STA 示例](https://github.com/tuya/TuyaOpen/tree/master/examples/wifi/sta)
- [设备配网](../../quick-start/device-network-configuration)
