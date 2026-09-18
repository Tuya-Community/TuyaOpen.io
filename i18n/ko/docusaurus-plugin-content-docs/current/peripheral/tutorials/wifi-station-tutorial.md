---
title: "Wi-Fi 스테이션 자습서"
description: "TuyaOpen의 Wi-Fi 스테이션 튜토리얼: tal wifi station connect와 AP에 연결하고 AP를 스캔하고 연결을 읽습니다."
keywords:
  - wifi station
  - tal_wifi
  - access point
  - reconnect
  - tuyaopen peripheral
---

Wi-Fi 스테이션은 액세스 포인트에 연결되므로 장치가 네트워크에 도달 할 수 있습니다. 이 튜토리얼은 TuyaOpen 장치를 Wi-Fi 네트워크에 연결하는 방법을 보여줍니다, 액세스 포인트에 대한 스캔, 연결 정보를 읽고, 드롭을 사용하여 다시 연결`tal_wifi.h`API.

## 자주 묻는 질문
- 한국어[환경 설정](../../quick-start/enviroment-setup)
- Wi-Fi 지원 보드 (Wi-Fi 지원)`ENABLE_WIFI=y`)

## 제품 정보
- TuyaOpen 개발 보드 (Wi-Fi-capable 플랫폼)
- 2.4 GHz Wi-Fi 액세스 포인트 알려진 SSID 및 암호

## 기본 연결
Wi-Fi 서브 시스템 초기화`tal_wifi_init`, 다음과 연결`tal_wifi_station_connect`. 이벤트 콜백은`WF_EVENT_E`이벤트 코드; 거기에서 역 상태를 추적.

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
`tal_wifi_station_connect`연결 시작; 그것은 IP가 할당 될 때까지 차단하지 않습니다. 역 상태에 대한 대기`WSS_GOT_IP`(아래 참조) 네트워크를 사용하기 전에.
:::

## 네트워크 스캔
`tal_wifi_all_ap_scan`배열을 할당`AP_IF_S`이름 * 무료 그것`tal_wifi_release_ap`당신이 할 때.

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

## 연결 정보 얻기
IP 설정 읽기`tal_wifi_get_ip`, 신호 힘`tal_wifi_station_get_conn_ap_rssi`, MAC 와`tal_wifi_get_mac`.

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

## Reconnection 패턴
TuyaOpen의 클라우드 서비스는 클라우드 연결 장치에 자동으로 연결됩니다. 독립 Wi-Fi 신청을 위해, 역 상태를 poll하고 그것이 아닙니다 때 재연결`WSS_GOT_IP`:

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

## 플랫폼 별 노트
- **ESP32: ** 힘 득점 형태 (`WIFI_PS_MIN_MODEM`)는 연결 후에 자동적으로 활성화됩니다. 이것은 힘을 절약하지만 대기 시간을 추가합니다.
- **ESP32: ** ADC2 채널은 Wi-Fi가 활성화된 동안 사용할 수 없습니다 (클래식 ESP32 전용).
- ** 모든 플랫폼:** 이름 *`tal_wifi_station_disconnect()`전환 모드의 앞에 깨끗하게 차단합니다.

## 더 보기
- [TAL Wi-Fi API 참조](tal-wifi-api)
- [TAL 네트워크 API 참조](tal-network-api)
- [TKL 와이파이 API](/docs/tkl-api/tkl_wifi)
- [Wi-Fi STA 예제](https://github.com/tuya/TuyaOpen/tree/master/examples/wifi/sta)
- [Device Network 구성](../../quick-start/device-network-configuration)
