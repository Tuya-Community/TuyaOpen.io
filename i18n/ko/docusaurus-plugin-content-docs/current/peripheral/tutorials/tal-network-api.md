---
title: TAL 네트워크 API 참조
description: "TuyaOpen의 TAL Network API 참조 : tal network.h는 TCP 및 UDP 소켓을 포장하고 휴대용 BSD 스타일 인터페이스 뒤에 소켓 옵션을 선택하십시오."
keywords:
  - tal network
  - tal_network.h
  - tcp socket
  - udp
  - tuyaopen api
---

## 제품정보
`tal_network.h`TCP 및 UDP 소켓을 포장,`select`, 그리고 1개의 휴대용 API 뒤에 일반적인 소켓 선택권. 그것은 BSD 작풍 교류를 따릅니다: 소켓을 창조하고, 연결하거나 묶고, 듣기, 받아들이고, 그 후에 보내고 recv. UDP 사용`send_to`이름 *`recvfrom`. 도우미는 문자열과`TUYA_IP_ADDR_T`호스트 주문 IPv4.

**출처:**`TuyaOpen/src/tal_network/include/tal_network.h`

**오디오:** HTTP 클라이언트, 사용자 정의 TCP 또는 UDP 프로토콜을 구현하거나 연결을 디버깅`tal_wifi`.

## IP 주소 상수
|제품정보|이름 *|
|-------|---------|
| `TY_IPADDR_LOOPBACK` | 127.0.0.1 |
| `TY_IPADDR_ANY` | 0.0.0.0 |
| `TY_IPADDR_BROADCAST` | 255.255.255.255 |

## 오류 및 다중화
|제품정보|이름 *|
|----------|-------------|
| `tal_net_get_errno` |마지막 네트워크 오류로`TUYA_ERRNO`. |
| `tal_net_select` |읽기, 쓰기, 세트를 제외하고. ms에서 타임 아웃.|
| `tal_net_fd_set`, `tal_net_fd_clear`, `tal_net_fd_isset`, `tal_net_fd_zero` |FD 세트 도우미. 상표:`TAL_FD_SET`, `TAL_FD_CLR`, `TAL_FD_ISSET`, `TAL_FD_ZERO`. |
| `tal_net_get_nonblock` |Query 비 차단 모드.|
| `tal_net_set_block` |차단 또는 비 차단 설정.|
| `tal_net_close` |닫기 소켓 fd.|

## 소켓 수명주기
|제품정보|이름 *|
|----------|-------------|
| `tal_net_socket_create` |TCP 또는 UDP 생성 (`TUYA_PROTOCOL_TYPE_E`). 반환 fd.|
| `tal_net_connect` |TCP는 주소와 항구에 연결합니다.|
| `tal_net_connect_raw` |원료 소켓 주소 버퍼를 사용하여 연결하십시오.|
| `tal_net_bind` |Bind 로컬 주소와 포트.|
| `tal_net_listen` |backlog와 듣기.|
| `tal_net_accept` |수락; 선택적인 동료 주소 및 항구.|

## 데이터 전송
|제품정보|이름 *|
|----------|-------------|
| `tal_net_send`, `tal_net_recv` |스트림 I / O.|
| `tal_net_send_to`, `tal_net_recvfrom` |UDP 주소.|
| `tal_net_recv_nd_size` |까지 Recv`nd_size`바이트 또는 오류.|

## 옵션 및 DNS
|제품정보|이름 *|
|----------|-------------|
| `tal_net_set_timeout` |전송 또는 recv 타임 아웃 (`TUYA_TRANS_TYPE_E`). |
| `tal_net_set_bufsize` |버퍼 크기.|
| `tal_net_set_reuse` |SO REUSEADDR 스타일 재사용.|
| `tal_net_disable_nagle` |TCP NODELAY의 특징|
| `tal_net_set_broadcast` |UDP 방송.|
| `tal_net_set_keepalive` |TCP 유지.|
| `tal_net_gethostbyname` |이름 수정`TUYA_IP_ADDR_T`. |
| `tal_net_get_socket_ip` |지역 경계 주소.|
| `tal_net_str2addr`, `tal_net_addr2str` |문자열 및 주소 변환.|
| `tal_net_setsockopt`, `tal_net_getsockopt` |익지않는 선택권 (`TUYA_OPT_LEVEL`, `TUYA_OPT_NAME`). |

## 일반 TCP 클라이언트
1. Wi-Fi 제공 ([Wi-Fi 스테이션 튜토리얼](wifi-station-tutorial)).
2. 소켓 만들기`tal_net_socket_create`TCP enum 사용`tuya_cloud_types.h`.
3. 선택적으로 non-blocking 형태 및`tal_net_select`timeouts를 위해.
4. 호스트를 해결`tal_net_gethostbyname`, 다음`tal_net_connect`.
5. 오시는 길`tal_net_send`이름 *`tal_net_recv`.
6. `tal_net_close`.

## 플랫폼 노트
반환 유형 혼합`OPERATE_RET`, `TUYA_ERRNO`, 바이트 수. 헤더에 각 함수의 의견 읽기. 포트 스택에 어댑터 맵 (예 : lwIP).

## 이름 *
- [TAL Wi-Fi API 참조](tal-wifi-api)
- [카테고리](../../tkl-api/tkl_lwip)
- `TuyaOpen/src/tal_network/include/tal_network.h`
