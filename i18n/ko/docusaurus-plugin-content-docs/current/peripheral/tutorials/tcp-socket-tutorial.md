---
title: TCP 및 UDP 소켓 자습서
description: "TuyaOpen의 TCP 및 UDP 소켓 자습서 : tal net connect 및 tal net send와 TCP 클라이언트를 구축하고 tal net bind, send to 및 recvfrom을 통해 UDP를 사용합니다."
keywords:
  - tcp socket
  - udp
  - tal_network
  - tal_net_connect
  - tuyaopen peripheral
---

## 제품정보
이 튜토리얼은 TCP 및 UDP의 TAL 네트워크 소켓을 사용하는 방법을 설명합니다. TCP 클라이언트 walkthrough 경기`examples/protocols/tcp_client` (`PROTOCOL_TCP`, `tal_net_connect`, `tal_net_send`). UDP는 다음과 같이 설명됩니다.`PROTOCOL_UDP`, `tal_net_bind`, `tal_net_send_to`·`tal_net_recvfrom`; 콘크리트 UDP 방송 샘플 생활`examples/wifi/ap`.

## 자주 묻는 질문
- [환경 설정](../../quick-start/enviroment-setup)
- [TAL 네트워크 API 참조](tal-network-api)

## 제품 정보
- 건설 대상`examples/protocols/tcp_client`이름 *`tal_network`(일반적으로) Wi-Fi.
- 도달 가능한 TCP 서버. 기본 샘플 사용`127.0.0.1`그리고 항구`7`; 기계설비 세트에`TCP_SERVER_IP`PC 또는 서버 LAN 주소로 포트를 엽니다.
- UDP 실험, 피어 IP/포트 또는 방송 가능한 LAN (Wi-Fi AP 예제 참조).

## 단계 (TCP 클라이언트)
1. 기타[`examples/protocols/tcp client`를 호출합니다.](https://github.com/tuya/TuyaOpen/tree/master/examples/protocols/tcp_client).

2. 설치하기`TCP_SERVER_IP`이름 *`TCP_SERVER_PORT`내 계정`src/example_tcp_client.c`.

3. 같은 파일에서 Wi-Fi 자격 구성`ENABLE_WIFI`정의된다.

4. 빌드 및 실행 :
   ```bash
   cd examples/protocols/tcp_client
   tos.py config choice
   tos.py build
   ```

5. 네트워크가 끝나면 작업이 생성됩니다.`PROTOCOL_TCP`소켓, 주소가 해결`tal_net_str2addr`, 통화`tal_net_connect`, 작은 완충기를 가진 몇몇 시간을 보냅니다`tal_net_send`, 다음`tal_net_close`.

**확장된 결과:** 서버는 반복된 페이로드를받습니다; 장치 로그는 연결하고 성공을 보냅니다.

## TCP 클라이언트 코드 패턴
```c
#include "tal_network.h"

int sock_fd = tal_net_socket_create(PROTOCOL_TCP);
TUYA_IP_ADDR_T server_ip = tal_net_str2addr(TCP_SERVER_IP);

if (tal_net_connect(sock_fd, server_ip, TCP_SERVER_PORT) < 0) {
    PR_ERR("connect failed");
    tal_net_close(sock_fd);
    return;
}

const char msg[] = "Hello Tuya\n";
tal_net_send(sock_fd, msg, strlen(msg));
tal_net_close(sock_fd);
```

TCP 서버를 위해, 사용`examples/protocols/tcp_server` (`tal_net_bind`, `tal_net_listen`, `tal_net_accept`, `tal_net_recv`).

## UDP 전송 및 수신
UDP 소켓 만들기`PROTOCOL_UDP`. 알려진 호스트에 보내는 간단한 unicast 클라이언트를 위해 한 답변을 읽습니다.

```c
#include "tal_network.h"

#define LOCAL_PORT  45000
#define REMOTE_PORT 45001

int udp_fd = tal_net_socket_create(PROTOCOL_UDP);
if (udp_fd < 0) {
    PR_ERR("udp create failed");
    return;
}

TUYA_IP_ADDR_T local_ip = tal_net_str2addr("192.168.1.50"); /* your interface address */
if (tal_net_bind(udp_fd, local_ip, LOCAL_PORT) < 0) {
    PR_ERR("bind failed");
    tal_net_close(udp_fd);
    return;
}

const char payload[] = "ping";
TUYA_IP_ADDR_T peer_ip = tal_net_str2addr("192.168.1.100");
tal_net_send_to(udp_fd, payload, strlen(payload), peer_ip, REMOTE_PORT);

char rx[256];
TUYA_IP_ADDR_T from_addr = 0;
uint16_t from_port = 0;
TUYA_ERRNO n = tal_net_recvfrom(udp_fd, rx, sizeof(rx), &from_addr, &from_port);
if (n > 0) {
    PR_DEBUG("got %d bytes from port %u", (int)n, (unsigned)from_port);
}
tal_net_close(udp_fd);
```

기타 제품`local_ip`바인딩하려는 인터페이스의 IPv4 주소로; 정확한 값은 netmgr 또는 정적 구성에 따라 달라집니다.

## UDP 방송 참조
방송 (AP 서브넷에서 주기적인 beacon)는 구현`examples/wifi/ap/src/example_wifi_ap.c`: `tal_net_socket_create(PROTOCOL_UDP)`, `tal_net_bind`, `tal_net_set_broadcast`·`tal_net_send_to`이름 *`0xFFFFFFFF`그리고 선택된 항구.

## 구현 노트
- 반환 값`tal_net_connect`, `tal_net_send`, `tal_net_send_to`·`tal_net_recvfrom`; 부정적인 값은 접합기 당 과실을 나타냅니다.
- 제품 정보`tal_net_set_block`또는`tal_net_select`timeouts 또는 non-blocking I/O를 필요로 하는 경우에.
- TCP는 연결 지향; UDP는 datagram 기반입니다 — 각각`tal_net_send_to`스택 파편이 없는 한 패킷입니다.

## 이름 *
- TCP 클라이언트:`examples/protocols/tcp_client/src/example_tcp_client.c`
- TCP 서버:`examples/protocols/tcp_server`
- UDP 방송:`examples/wifi/ap/src/example_wifi_ap.c`
- API:`src/tal_network/include/tal_network.h`
- [Wi-Fi 스테이션 튜토리얼](wifi-station-tutorial)
- [예제 인덱스](../../examples/demo-generic-examples)
