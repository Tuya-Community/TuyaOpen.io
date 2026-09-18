---
title: "TAL Wi-Fi API 참조"
description: "TuyaOpen의 TAL Wi-Fi API 참조 : tal wifi.h는 휴대용 역 및 AP 운영을 제공하며, tal wifi init을 통해 TKL Wi-Fi 어댑터를 감싸고 있습니다."
keywords:
  - tal wifi
  - tal_wifi.h
  - wifi station
  - wifi ap
  - tuyaopen api
---

TAL Wi-Fi API(TAL Wi-Fi API)는`tal_wifi.h`)는 Wi-Fi 역과 AP 가동을 위한 플랫폼 독립적인 공용영역을 제공합니다. 그것은 플랫폼의 Wi-Fi 드라이버 (ESP-IDF, T5AI SDK, Linux 및 기타)를 호출하는 TKL Wi-Fi 어댑터를 포장합니다.

머리:`#include "tal_wifi.h"`. 기능 반환`OPERATE_RET` (`OPRT_OK`성공에) 그렇지 않으면.

## 초기화
### 다운로드
Wi-Fi 서브시스템을 초기화하고 이벤트 콜백을 등록합니다.

```c
OPERATE_RET tal_wifi_init(WIFI_EVENT_CB cb);
```

|제품 설명|제품정보|제품정보|이름 *|
|-----------|-----------|------|-------------|
|사이트맵|내 계정| `WIFI_EVENT_CB` |Wi-Fi 이벤트에 호출된 Callback (연결, 연결, IP 획득)|

**리턴:**`OPRT_OK`성공에.

다른 Wi-Fi 가동의 앞에 시작에서 이것을 한 번 부르십시오.

## 검색하기
### tal wifi all ap scan의 경우
모든 눈에 보이는 접근 점을 검사하십시오.

```c
OPERATE_RET tal_wifi_all_ap_scan(AP_IF_S **ap_ary, uint32_t *num);
```

|제품 설명|제품정보|제품정보|이름 *|
|-----------|-----------|------|-------------|
|사이트맵|내 계정| `AP_IF_S **` |AP 정보 배열에 Pointer (기능에 의해 할당 됨)|
|·|내 계정| `uint32_t *` |찾을 수 없음|

**리턴:**`OPRT_OK`성공에. Caller는 결과를 무료로해야합니다.`tal_wifi_release_ap()`.

### tal wifi assign ap scan의 경우
특정 SSID 검사.

```c
OPERATE_RET tal_wifi_assign_ap_scan(int8_t *ssid, AP_IF_S **ap);
```

### 다운로드
스캔 기능에 의해 할당 된 메모리 무료.

```c
OPERATE_RET tal_wifi_release_ap(AP_IF_S *ap);
```

## 역 연결
### 네트워크
액세스 포인트에 연결.

```c
OPERATE_RET tal_wifi_station_connect(int8_t *ssid, int8_t *passwd);
```

|제품 설명|제품정보|제품정보|이름 *|
|-----------|-----------|------|-------------|
|사이트맵|내 계정| `int8_t *` |SSID 연결|
|패스워드|내 계정| `int8_t *` |비밀번호 (NULL 또는 오픈 네트워크에 빈)|

### 파일 형식
현재 접속점에서 분리.

```c
OPERATE_RET tal_wifi_station_disconnect(void);
```

### tal fast station connect   연락처
스캔을 건너뛰기 위해 캐시 AP 정보 (채널, BSSID)를 사용하여 다시 연결하십시오.

```c
OPERATE_RET tal_fast_station_connect(FAST_WF_CONNECTED_AP_INFO_T *fast_ap_info);
```

### tal wifi get connected ap info에 대해
이후 빠른 연결에 대한 캐시 AP 정보를 가져옵니다.

```c
OPERATE_RET tal_wifi_get_connected_ap_info(FAST_WF_CONNECTED_AP_INFO_T **fast_ap_info);
```

### tal wifi station get status의 경우
현재 역 연결 상태를 가져옵니다.

```c
OPERATE_RET tal_wifi_station_get_status(WF_STATION_STAT_E *stat);
```

상태 값은 다음과 같습니다:`WSS_IDLE`, `WSS_CONNECTING`, `WSS_PASSWD_WRONG`, `WSS_NO_AP_FOUND`, `WSS_CONN_FAIL`, `WSS_CONN_SUCCESS`, `WSS_GOT_IP`.

### tal wifi station get conn ap rssi 의 확장 파일
연결된 AP의 신호 강도를 얻으십시오.

```c
OPERATE_RET tal_wifi_station_get_conn_ap_rssi(int8_t *rssi);
```

dBm의 RSSI를 반환 (신호 값; 예를 들어, -45는 강한, -80은 약합니다).

### tal wifi station get err stat의 경우
실패한 연결 시도 후 오류 상태를 가져옵니다.

```c
OPERATE_RET tal_wifi_station_get_err_stat(WF_STATION_STAT_E *stat);
```

## 소프트 AP
### 다운로드
소프트 액세스 포인트를 시작합니다.

```c
OPERATE_RET tal_wifi_ap_start(WF_AP_CFG_IF_S *cfg);
```

구성 구조에는 SSID, 암호, 채널, 암호화 유형 및 최대 역이 포함됩니다.

:::note ESP32 제한
`tal_wifi_ap_stop()`에 ESP32 현재 불완전 (returns)`OPRT_OK`그러나 완전히 AP를 찢지 않습니다. AP에서 STA 모드로 전환하면 장치 재시작이 필요할 수 있습니다.
:::

### 다운로드
소프트 액세스 포인트를 중지합니다.

```c
OPERATE_RET tal_wifi_ap_stop(void);
```

## Network 구성
### tal wifi get ip / tal wifi set ip에 대해
역 또는 AP 공용영역을 위한 IP 윤곽을 얻으십시오.

```c
OPERATE_RET tal_wifi_get_ip(WF_IF_E wf, NW_IP_S *ip);
OPERATE_RET tal_wifi_set_ip(WF_IF_E wf, NW_IP_S *ip);
```

`WF_IF_E`이름 *`WF_STATION`또는`WF_AP`. `NW_IP_S`이름 *`ip`, `mask`, `gw`문자열로.

### tal wifi get mac / tal wifi set mac의 경우
MAC 주소를 가져옵니다.

```c
OPERATE_RET tal_wifi_get_mac(WF_IF_E wf, NW_MAC_S *mac);
OPERATE_RET tal_wifi_set_mac(WF_IF_E wf, NW_MAC_S *mac);
```

### 다운로드
연결된 AP의 BSSID를 가져옵니다.

```c
OPERATE_RET tal_wifi_get_bssid(uint8_t *mac);
```

:::warning 사이트맵
ESP32에서, 이 기능은 돌려보낼 수 있습니다`OPRT_OK`버퍼를 채우지 않고. 출력을 검증합니다.
:::

## 채널 및 모드
### tal wifi set cur channel / tal wifi get cur channel   채널
```c
OPERATE_RET tal_wifi_set_cur_channel(uint8_t chan);
OPERATE_RET tal_wifi_get_cur_channel(uint8_t *chan);
```

### tal wifi set work mode / tal wifi get work mode에 대해
```c
OPERATE_RET tal_wifi_set_work_mode(WF_WK_MD_E mode);
OPERATE_RET tal_wifi_get_work_mode(WF_WK_MD_E *mode);
```

형태:`WWM_STATION`, `WWM_SOFTAP`, `WWM_STATIONAP`.

### tal wifi set country code의 경우
Wi-Fi 규제 국가 코드를 설정합니다.

```c
OPERATE_RET tal_wifi_set_country_code(char *country_code);
```

지원되는:`"CN"`, `"US"`, `"JP"`, `"EU"`.

## Sniffer 형태
### 다운로드
promiscuous (sniffer) 모드를 활성화하거나 비활성화합니다.

```c
OPERATE_RET tal_wifi_sniffer_set(BOOL_T en, SNIFFER_CALLBACK cb);
```

활성화되면, Raw 802.11 프레임은 콜백에 전달됩니다. Tuya의 SmartConfig 프로비저닝에 사용됩니다.

## 관리 프레임
### 사이트맵
원료 관리 구조를 보내십시오.

```c
OPERATE_RET tal_wifi_send_mgnt(uint8_t *buf, uint32_t len);
```

### tal wifi register recv mgnt callback의 경우
수신 관리 프레임에 대한 콜백 등록.

```c
OPERATE_RET tal_wifi_register_recv_mgnt_callback(BOOL_T enable, WIFI_REV_MGNT_CB recv_cb);
```

## 전력 관리
### tal wifi lp enable / tal wifi lp disable의 경우
사용 가능한 Wi-Fi 저전력 모드.

```c
OPERATE_RET tal_wifi_lp_enable(void);
OPERATE_RET tal_wifi_lp_disable(void);
```

### tal wifi set lps dtim의 경우
낮은 힘 형태를 위한 DTIM 간격을 놓으십시오.

```c
void tal_wifi_set_lps_dtim(uint32_t dtim);
```

저전력 모드를 입력하기 전에 호출합니다.

## 이름 *
### tal wifi rf calibrated에 대해
Wi-Fi RF 캘리브레이션이 수행되었는지 확인하십시오.

```c
BOOL_T tal_wifi_rf_calibrated(void);
```

### 다운로드
플랫폼 별 Wi-Fi 제어.

```c
OPERATE_RET tal_wifi_ioctl(WF_IOCTL_CMD_E cmd, void *args);
```

:::note
기타 제품`OPRT_NOT_SUPPORTED`ESP32에.
:::

## 사용법 예
```c
#include "tal_wifi.h"
#include "tal_log.h"

static void wifi_event_cb(WF_EVENT_E event, void *arg)
{
    WF_STATION_STAT_E stat;
    tal_wifi_station_get_status(&stat);
    if (stat == WSS_GOT_IP) {
        NW_IP_S ip;
        tal_wifi_get_ip(WF_STATION, &ip);
        TAL_PR_INFO("connected, IP: %s", ip.ip);
    }
}

void connect(void)
{
    tal_wifi_init(wifi_event_cb);
    tal_wifi_station_connect((int8_t *)"MySSID", (int8_t *)"MyPassword");
}
```

## 더 보기
- [Wi-Fi 스테이션 자습서](wifi-station-tutorial)
- [TAL 네트워크 API 참조](tal-network-api)
- [TKL 와이파이 API](/docs/tkl-api/tkl_wifi)
- [Wi-Fi 예제](https://github.com/tuya/TuyaOpen/tree/master/examples/wifi)
- [ESP32 Wi-Fi 노트](../../hardware/espressif/overview-esp32)
