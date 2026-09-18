---
title: tkl wifi | Wi-Fi 드라이버
description: "tkl wifi 참고 — TuyaOpen Wi-Fi 드라이버 TKL API for station/soft-AP, scan, connect, channel, MAC/IP, sniffer 및 포트링/platform 적응을 위한 저전력."
keywords:
  - tkl_wifi
  - tuyaopen wifi driver
  - tkl wifi api
  - embedded wifi driver
---

`tkl_wifi`플랫폼의 Wi-Fi 드라이버를 TuyaOS에 적용하십시오. 그것은 역과 연약한 AP 가동을 포함합니다: 초기화, 스캐닝, 연결, 수로 및 국가 부호 통제, MAC 및 IP 관리, sniffer 및 관리 구조 붙잡음, 저전력 형태 및 빠른 연결. 구현 생활`tkl_wifi.c`TuyaOS는 플랫폼 코드를 위한 표시된 지구로 생성합니다.

그렇지 않으면, 각 함수 반환`OPRT_OK`성공과 오류에 또 다른 값; 참조`tuya_error_code.h`오류 코드.

## 주요 유형
인터페이스 모드는 논리 Wi-Fi 인터페이스를 선택하여 API가 동작합니다.

| `WF_IF_E` |이름 *|
| --- | --- |
| `WF_STATION` |역 (클라이언트) 공용영역.|
| `WF_AP` |Soft-AP 인터페이스.|

작업 모드는 Wi-Fi 서브 시스템 실행 방법을 선택:

| `WF_WK_MD_E` |이름 *|
| --- | --- |
| `WWM_POWERDOWN` |아래로 구동 (Wi-Fi 모듈 오프).|
| `WWM_SNIFFER` |Sniffer (monitor) 모드.|
| `WWM_STATION` |역 형태.|
| `WWM_SOFTAP` |Soft-AP 모드.|
| `WWM_STATIONAP` |Concurrent 역과 soft-AP.|
| `WWM_UNKNOWN` |알려진 모드.|

역 상태는 연결 진행 상황을 보고합니다:

| `WF_STATION_STAT_E` |이름 *|
| --- | --- |
| `WSS_IDLE` |연결되지 않음.|
| `WSS_CONNECTING` |연결.|
| `WSS_PASSWD_WRONG` |비밀번호는 일치하지 않습니다.|
| `WSS_NO_AP_FOUND` |AP를 찾을 수 없습니다.|
| `WSS_CONN_FAIL` |연결 실패.|
| `WSS_CONN_SUCCESS` |AP에 연결.|
| `WSS_GOT_IP` |IP 주소 취득.|
| `WSS_DHCP_FAIL` |DHCP가 실패했습니다.|

## 프로젝트
```c
OPERATE_RET tkl_wifi_init(WIFI_EVENT_CB cb);
```

Wi-Fi 서브시스템을 초기화하고 이벤트 콜백을 등록합니다.

모수:

|입력/출력|이름 *|이름 *|
| --- | --- | --- |
|[인]| `cb` |Wi-Fi 이벤트 콜백,`WIFI_EVENT_CB`. |

콜백은 다음과 같은 서명을 가지고 있습니다.`event`·`WF_EVENT_E` (`WFE_CONNECTED`, `WFE_CONNECT_FAILED`, `WFE_DISCONNECTED`):

```c
typedef void (*WIFI_EVENT_CB)(WF_EVENT_E event, void *arg);
```

## tkl wifi scan ap에 대해
```c
OPERATE_RET tkl_wifi_scan_ap(const int8_t *ssid, AP_IF_S **ap_ary, uint32_t *num);
```

환경을 검사하고 AP를 발견했습니다.

모수:

|입력/출력|이름 *|이름 *|
| --- | --- | --- |
|[인]| `ssid` |스캔 SSID. 이름 *`NULL`, 모든 AP를 검사하십시오; 그렇지 않으면 지정된 SSID를 검사하십시오.|
|[아웃]| `ap_ary` |스캔 된 AP 정보의 배열,`AP_IF_S`. |
|[아웃]| `num` |AP의 수`ap_ary`. |

:::note
이 기능은 결과 기억을 할당하고 차단됩니다. 결과 발표`tkl_wifi_release_ap`더 이상 필요로 할 때. 현재 국가 코드의 채널만 스캔합니다.
:::

## tkl wifi release ap의
```c
OPERATE_RET tkl_wifi_release_ap(AP_IF_S *ap);
```

AP 정보 공개`tkl_wifi_scan_ap`.

모수:

|입력/출력|이름 *|이름 *|
| --- | --- | --- |
|[인]| `ap` |AP 정보 공개.|

## 프로젝트
```c
OPERATE_RET tkl_wifi_start_ap(const WF_AP_CFG_IF_S *cfg);
```

주어진 구성으로 soft-AP 모드를 시작합니다.

모수:

|입력/출력|이름 *|이름 *|
| --- | --- | --- |
|[인]| `cfg` |soft-AP 구성,`WF_AP_CFG_IF_S`. |

`WF_AP_CFG_IF_S`SSID, 암호, 채널, 암호화 모드를 운반합니다 (`md`·`WF_AP_AUTH_MODE_E`), 숨겨지은 깃발, 최대 연결 (`max_conn`), 방송 간격 및 AP 형태 IP 정보:

```c
typedef struct {
    uint8_t ssid[WIFI_SSID_LEN + 1];     // ssid
    uint8_t s_len;                       // len of ssid
    uint8_t passwd[WIFI_PASSWD_LEN + 1]; // passwd
    uint8_t p_len;                       // len of passwd
    uint8_t chan;                        // channel, default: 6
    WF_AP_AUTH_MODE_E md;                // encryption type
    uint8_t ssid_hidden;                 // ssid hidden, default: 0
    uint8_t max_conn;                    // max sta connect nums, default: 1
    uint16_t ms_interval;                // broadcast interval, default: 100
    NW_IP_S ip;                          // ip info for ap mode
} WF_AP_CFG_IF_S;
```

## tkl wifi stop ap에 대하여
```c
OPERATE_RET tkl_wifi_stop_ap(void);
```

soft-AP 모드를 중지합니다.

## tkl wifi set cur channel   채널
```c
OPERATE_RET tkl_wifi_set_cur_channel(const uint8_t chan);
```

Wi-Fi 인터페이스의 작동 채널을 설정합니다.

모수:

|입력/출력|이름 *|이름 *|
| --- | --- | --- |
|[인]| `chan` |설정할 수 있습니다.|

:::note
현재 국가 코드 채널 범위 이외의 채널 설정 실패. sniffer 콜백 내부의 채널 설정이 지원됩니다.
:::

## tkl wifi get cur channel   채널
```c
OPERATE_RET tkl_wifi_get_cur_channel(uint8_t *chan);
```

현재 작업 채널을 가져옵니다.

모수:

|입력/출력|이름 *|이름 *|
| --- | --- | --- |
|[아웃]| `chan` |현재 채널.|

## tkl wifi set sniffer의
```c
OPERATE_RET tkl_wifi_set_sniffer(const BOOL_T en, const SNIFFER_CALLBACK cb);
```

Enables 또는 disables sniffer 형태. 활성화된 동안 운전자는 각 캡처 프레임을 전달합니다.`cb`.

모수:

|입력/출력|이름 *|이름 *|
| --- | --- | --- |
|[인]| `en` | `TRUE`sniffer 모드를 활성화하려면`FALSE`그것을 비활성화합니다.|
|[인]| `cb` |캡처 콜백,`SNIFFER_CALLBACK`. |

콜백에는 다음과 같은 서명이 있습니다.

```c
typedef void (*SNIFFER_CALLBACK)(const uint8_t *buf, const uint16_t len, const int8_t rssi);
```

## 프로젝트
```c
OPERATE_RET tkl_wifi_get_ip(const WF_IF_E wf, NW_IP_S *ip);
```

주어진 인터페이스의 IPv4 주소, 게이트웨이 및 하위넷 마스크를 가져옵니다.

모수:

|입력/출력|이름 *|이름 *|
| --- | --- | --- |
|[인]| `wf` |Wi-Fi 인터페이스,`WF_IF_E`. |
|[아웃]| `ip` |IP 정보,`NW_IP_S`. |

:::note
역 + AP 모드 장치에는 2개의 IP가 있습니다; 통행`wf`읽을 수있는 인터페이스를 선택합니다.
:::

## tkl wifi get ipv6에 대해
```c
OPERATE_RET tkl_wifi_get_ipv6(const WF_IF_E wf, NW_IP_TYPE type, NW_IP_S *ip);
```

주어진 인터페이스의 IPv6 주소를 가져옵니다.

모수:

|입력/출력|이름 *|이름 *|
| --- | --- | --- |
|[인]| `wf` |Wi-Fi 인터페이스,`WF_IF_E`. |
|[인]| `type` |읽는 IPv6 주소 유형,`NW_IP_TYPE`. |
|[아웃]| `ip` |IP 정보,`NW_IP_S`. |

## tkl wifi set ip에 대해
```c
OPERATE_RET tkl_wifi_set_ip(const WF_IF_E wf, NW_IP_S *ip);
```

정적 IPv4 주소, 게이트웨이 및 하위넷 마스크를 지정합니다.

모수:

|입력/출력|이름 *|이름 *|
| --- | --- | --- |
|[인]| `wf` |Wi-Fi 인터페이스,`WF_IF_E`. |
|[인]| `ip` |설정할 IP 정보,`NW_IP_S`. |

## tkl wifi set mac의 경우
```c
OPERATE_RET tkl_wifi_set_mac(const WF_IF_E wf, const NW_MAC_S *mac);
```

주어진 인터페이스의 MAC 주소를 설정합니다.

모수:

|입력/출력|이름 *|이름 *|
| --- | --- | --- |
|[인]| `wf` |Wi-Fi 인터페이스,`WF_IF_E`. |
|[인]| `mac` |설정하는 MAC 주소,`NW_MAC_S`. |

## tkl wifi get mac에 대해
```c
OPERATE_RET tkl_wifi_get_mac(const WF_IF_E wf, NW_MAC_S *mac);
```

주어진 인터페이스의 MAC 주소를 가져옵니다.

모수:

|입력/출력|이름 *|이름 *|
| --- | --- | --- |
|[인]| `wf` |Wi-Fi 인터페이스,`WF_IF_E`. |
|[아웃]| `mac` |MAC 주소,`NW_MAC_S`. |

## tkl wifi set work mode의 정의
```c
OPERATE_RET tkl_wifi_set_work_mode(const WF_WK_MD_E mode);
```

Wi-Fi 작업 모드를 설정합니다.

모수:

|입력/출력|이름 *|이름 *|
| --- | --- | --- |
|[인]| `mode` |작업 모드,`WF_WK_MD_E`. |

## tkl wifi get work mode의 정의
```c
OPERATE_RET tkl_wifi_get_work_mode(WF_WK_MD_E *mode);
```

현재 Wi-Fi 작업 모드를 가져옵니다.

모수:

|입력/출력|이름 *|이름 *|
| --- | --- | --- |
|[아웃]| `mode` |작업 모드,`WF_WK_MD_E`. |

## tkl wifi get connected ap info에 대해
```c
OPERATE_RET tkl_wifi_get_connected_ap_info(FAST_WF_CONNECTED_AP_INFO_T **fast_ap_info);
```

현재 연결된 AP의 정보를 빠른 연결 기능으로 사용할 수 있습니다.

모수:

|입력/출력|이름 *|이름 *|
| --- | --- | --- |
|[아웃]| `fast_ap_info` |연결된 AP 정보,`FAST_WF_CONNECTED_AP_INFO_T`. |

:::note
이 기능 할당`fast_ap_info`. 쌍 그것으로`tkl_wifi_station_fast_connect`재시작 후 재연결을 가속화합니다.
:::

## 프로젝트
```c
OPERATE_RET tkl_wifi_get_bssid(uint8_t *mac);
```

연결된 AP의 BSSID (MAC 주소)를 가져옵니다.

모수:

|입력/출력|이름 *|이름 *|
| --- | --- | --- |
|[아웃]| `mac` |BSSID를 받는 6 바이트 버퍼.|

## tkl wifi set country code의 경우
```c
OPERATE_RET tkl_wifi_set_country_code(const COUNTRY_CODE_E ccode);
```

허용된 채널 목록을 결정하는 규제 국가 코드를 설정합니다.

모수:

|입력/출력|이름 *|이름 *|
| --- | --- | --- |
|[인]| `ccode` |국가 코드,`COUNTRY_CODE_E`. |

| `COUNTRY_CODE_E` |이름 *|채널 :|
| --- | --- | --- |
| `COUNTRY_CODE_CN` |주요 시장| 1–13 |
| `COUNTRY_CODE_US` |대한민국| 1–11 |
| `COUNTRY_CODE_JP` |(주)| 1–14 |
| `COUNTRY_CODE_EU` |·| 1–13 |

## tkl wifi set rf calibrated의 경우
```c
OPERATE_RET tkl_wifi_set_rf_calibrated(void);
```

Wi-Fi RF 보정을 수행합니다. Wi-Fi 생산 테스트 중 통화.

반환 값:

`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.

## tkl wifi set lp mode의 경우
```c
OPERATE_RET tkl_wifi_set_lp_mode(const BOOL_T enable, const uint8_t dtim);
```

Wi-Fi 저전력 모드를 활성화하거나 비활성화합니다.

모수:

|입력/출력|이름 *|이름 *|
| --- | --- | --- |
|[인]| `enable` | `TRUE`낮은 힘 형태를 가능하게 하기 위하여,`FALSE`그것을 비활성화합니다.|
|[인]| `dtim` |DTIM 간격.|

## tkl wifi station fast connect에
```c
OPERATE_RET tkl_wifi_station_fast_connect(const FAST_WF_CONNECTED_AP_INFO_T *fast_ap_info);
```

빠른 연결에 대한 캐시 AP 정보를 사용하여 라우터에 연결합니다.

모수:

|입력/출력|이름 *|이름 *|
| --- | --- | --- |
|[인]| `fast_ap_info` |캐시 된 AP 정보에서`tkl_wifi_get_connected_ap_info`. |

:::note
페어링 및 장치 재시작 후 첫 번째 연결에 사용됩니다.
:::

## 네트워크
```c
OPERATE_RET tkl_wifi_station_connect(const int8_t *ssid, const int8_t *passwd);
```

역을 라우터에 연결합니다.

모수:

|입력/출력|이름 *|이름 *|
| --- | --- | --- |
|[인]| `ssid` |SSID 연결.|
|[인]| `passwd` |비밀번호|

:::note
비 차단. 연결 시작 후, poll`tkl_wifi_station_get_status`계속하기
:::

## tkl wifi station disconnect는
```c
OPERATE_RET tkl_wifi_station_disconnect(void);
```

라우터에서 역을 분리합니다.

## tkl wifi station get conn ap rssi에
```c
OPERATE_RET tkl_wifi_station_get_conn_ap_rssi(int8_t *rssi);
```

연결된 AP의 신호 강도 (RSSI)를 가져옵니다.

모수:

|입력/출력|이름 *|이름 *|
| --- | --- | --- |
|[아웃]| `rssi` |RSSI 값.|

## tkl wifi station get status의 경우
```c
OPERATE_RET tkl_wifi_station_get_status(WF_STATION_STAT_E *stat);
```

현재 역 연결 상태를 가져옵니다.

모수:

|입력/출력|이름 *|이름 *|
| --- | --- | --- |
|[아웃]| `stat` |역 상태,`WF_STATION_STAT_E`. |

## tkl wifi send mgnt의 경우
```c
OPERATE_RET tkl_wifi_send_mgnt(const uint8_t *buf, const uint32_t len);
```

Wi-Fi 관리 프레임을 전송합니다.

모수:

|입력/출력|이름 *|이름 *|
| --- | --- | --- |
|[인]| `buf` |관리 프레임 버퍼.|
|[인]| `len` |버퍼 길이.|

## tkl wifi register recv mgnt callback
```c
OPERATE_RET tkl_wifi_register_recv_mgnt_callback(const BOOL_T enable, const WIFI_REV_MGNT_CB recv_cb);
```

콜백에 수신된 관리 프레임의 납품을 활성화하거나 비활성화합니다.

모수:

|입력/출력|이름 *|이름 *|
| --- | --- | --- |
|[인]| `enable` | `TRUE`관리 프레임 리셉션을 활성화`FALSE`그것을 비활성화합니다.|
|[인]| `recv_cb` |수신 콜백,`WIFI_REV_MGNT_CB`. |

콜백에는 다음과 같은 서명이 있습니다.

```c
typedef void (*WIFI_REV_MGNT_CB)(uint8_t *buf, uint32_t len);
```

## 프로젝트
```c
OPERATE_RET tkl_wifi_ioctl(WF_IOCTL_CMD_E cmd, void *args);
```

드라이버 별 컨트롤 명령을 발급합니다.

모수:

|입력/출력|이름 *|이름 *|
| --- | --- | --- |
|[인]| `cmd` |명령,`WF_IOCTL_CMD_E`. |
|[인]| `args` |명령과 관련된 인수.|

| `WF_IOCTL_CMD_E` |이름 *|
| --- | --- |
| `WFI_BEACON_CMD` |beacon 납품업자 특정한 정보 성분을 형성하십시오.|
| `WFI_GET_LAST_DISCONN_REASON` |마지막 단식 이유를 얻으십시오.`WF_DISCONN_REASON_E`. |
| `WFI_AP_GET_STALIST_CMD` |soft-AP 역 목록 받기,`WF_STA_LIST_S`. |
| `WFI_CONNECT_CMD` |연결하기`WF_IOCTL_CONN_T`. |
