---
title: "3 : Wi-Fi 및 네트워크"
description: "TuyaOpen porting을위한 3 단계 가져 오기 - Wi-Fi AP와 동료는 IP를 얻고 칩에 TCP 및 TLS를 통해 인터넷에 도달합니다."
keywords:
  - tuyaopen porting
  - bring-up
  - wi-fi
  - network
  - tls
---

세 번째 단계는 네트워크에 칩을 연결 : AP와 동료, IP를 얻을, TCP 및 TLS를 통해 인터넷에 도달. 이것은 클라우드 연결을 기반으로합니다.

## 이름 *
TuyaOpen은 Wi-Fi AP를 스캔하고 가입 할 수 있으며 IP 주소를 확인하고 DNS를 해결하고 인터넷 호스트에 TLS 소켓을 엽니 다.

## 실행 파일
|파일 형식|당신이 구현하는 것|
|------|--------------------|
| `tkl_wifi.c` |검사, 연결/disconnect, 역/AP/mode 스위치, MAC get/set, RF 구경측정, 국가 부호|
| `tkl_network.c`** 또는 **`tkl_lwip.c` |소켓 층 - 구현 ** 하나 **, 그 lwIP에 따라 사용 (아래)|
| `tkl_hash.c` / `tkl_symmetry.c`* (선택) *|TuyaOpen의 Mbed TLS 대신 SDK의 암호화를 사용하는 경우에만|

## 이름 *
- ** 1개의 네트워크 어댑터: **
  - **Vendor lwIP** - SDK의 lwIP를 유지하고 적응`tkl_network.c`. 모형:[TuyaOpen-esp32 `tkl network.c`를 실행합니다.](https://github.com/tuya/TuyaOpen-esp32/blob/master/tuya_open_sdk/tuyaos_adapter/src/drivers/tkl_network.c).
  - **TuyaOpen lwIP ** - TuyaOpen의 lwIP 사용 및 적응`tkl_lwip.c`. 모형:[토토사이트추천](https://github.com/tuya/TuyaOpen-T2/blob/master/tuyaos/tuyaos_adapter/src/tkl_lwip.c).

Adapt 만 하나. 제품정보`tos.py config menu` → `configure tuyaopen` → `configure enable/disable liblwip`.
- **TLS / 암호화.** SDK의 Mbed TLS 또는 TuyaOpen의 사용 (`configure mbedtls` → `Enable user custom`). 어느 방법, 좋은 하드웨어 ** 랜덤 번호 생성기 **는 필수입니다 - 약한 entropy는 TLS Handhake를 깰.
- **Wi-Fi 이벤트.** 드라이브`WIFI_EVENT_CB`그래서 TuyaOpen는 연결/disconnect/got-IP 전환을 볼 수 있습니다; 역 국가 기계 및 재연결 논리는 이것에 달려 있습니다.

## 계정 만들기
테스트 앱에서 AP를 스캔하고 가입하면 로그를 통해 IP를 확인하고 호스트명(DNS)을 해결하고 인터넷 엔드포인트에 TLS 연결을 엽니다. TLS 소켓이 안정적으로 연결하고 교환할 때 성공합니다.

다음 :[Get-up 4: 클라우드 연결](cloud-connection).

## 더 보기
- [tkl wifi 참조](../../../tkl-api/tkl_wifi) · [프로젝트](../../../tkl-api/tkl_network) · [사이트맵](../../../tkl-api/tkl_lwip)
- [TAL Wi-Fi 튜토리얼](../../../peripheral/tutorials/tal-wifi-api)
