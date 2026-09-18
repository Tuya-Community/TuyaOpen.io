---
title: tkl lwip | lwIP 이더넷 인터페이스
description: "tkl lwip 참고 — TuyaOpen lwIP Ethernet TKL API는 포트/플랫폼 적응을 위한 pbuf 형태로 패킷의 인터페이스와 tx/rx를 초기화합니다."
keywords:
  - tkl_lwip
  - tuyaopen lwip driver
  - tkl ethernet api
  - lwip porting
---

`tkl_lwip`lwIP 네트워크 스택을 underlying Ethernet 하드웨어에 적용한다. Ethernet 인터페이스를 초기화하고 lwIP에 패킷을 수신`pbuf`이름 * 구현 생활`tkl_lwip.c`, TuyaOS 생성 및 유지; 자신의 코드를 추가`BEGIN`이름 *`END`Markers 그래서 그것은 재생을 살아.

이 인터페이스를 사용할 필요가 있습니다.`ENABLE_LIBLWIP`지원하다

인터페이스는 두 개의 opaque 핸들 유형을 사용합니다:

|제품정보|이름 *|
| --- | --- |
| `TKL_NETIF_HANDLE` |네트워크 인터페이스(Network interface)`void *`). |
| `TKL_PBUF_HANDLE` |lwIP에서 패킷 버퍼에 핸들`pbuf`양식 (`void *`). |

## 프로젝트
```c
OPERATE_RET tkl_ethernetif_init(TKL_NETIF_HANDLE netif);
```

Ethernet 인터페이스 하드웨어를 초기화합니다.

모수:

|입력/출력|이름 *|이름 *|
| --- | --- | --- |
|[인]| `netif` |네트워크 인터페이스를 초기화합니다.|

반환 값:

lwIP 오류 코드 :`ERR_OK`성공에, 실패에 다른 가치. 이름 *`err_enum_t`내 계정`lwip/err.h`.

## tkl ethernetif 출력
```c
OPERATE_RET tkl_ethernetif_output(TKL_NETIF_HANDLE netif, TKL_PBUF_HANDLE p);
```

Ethernet 인터페이스를 통해 패킷을 전송합니다.

모수:

|입력/출력|이름 *|이름 *|
| --- | --- | --- |
|[인]| `netif` |패킷을 보내는 네트워크 인터페이스.|
|[인]| `p` |전송 패킷, 에서`pbuf`이름 *|

반환 값:

lwIP 오류 코드 :`ERR_OK`성공에, 실패에 다른 가치. 이름 *`err_enum_t`내 계정`lwip/err.h`.

## 프로젝트
```c
OPERATE_RET tkl_ethernetif_recv(TKL_NETIF_HANDLE netif, TKL_PBUF_HANDLE p);
```

Ethernet 인터페이스에서 패킷을 수신합니다.

모수:

|입력/출력|이름 *|이름 *|
| --- | --- | --- |
|[인]| `netif` |패킷을 받은 네트워크 인터페이스.|
|[인]| `p` |수신된 패킷, in`pbuf`이름 *|

반환 값:

lwIP 오류 코드 :`ERR_OK`성공에, 실패에 다른 가치. 이름 *`err_enum_t`내 계정`lwip/err.h`.
