---
title: tkl wired | 유선 이더넷 드라이버
description: "tkl wired reference — TuyaOpen 유선 이더넷 TKL API 링크 상태, IPv4/IPv6 및 MAC 주소 및 포트링/플랫폼 적응에 대한 링크 교환 콜백."
keywords:
  - tkl_wired
  - tuyaopen ethernet driver
  - tkl wired api
  - embedded ethernet
---

`tkl_wired`TuyaOS에 유선 이더넷 링크를 연결합니다. 그것은 링크 상태, IPv4 및 IPv6 주소 및 유선 인터페이스의 MAC 주소를보고 링크 상태 변경 될 때 불 콜백을 등록 할 수 있습니다. 구현 생활`tkl_wired.c`TuyaOS는 플랫폼 코드를 위한 표시된 지구로 생성합니다.

## 링크 상태
`tkl_wired_get_status`그리고 상태 변경 콜백 보고서 두 주 중 하나:

|뚱 베어|이름 *|
| --- | --- |
| `TKL_WIRED_LINK_DOWN` |네트워크 케이블은 unplugged입니다.|
| `TKL_WIRED_LINK_UP` |네트워크 케이블은 플러그 앤 IP 주소가 인수됩니다.|

## tkl wired get status의 경우
```c
OPERATE_RET tkl_wired_get_status(TKL_WIRED_STAT_E *status);
```

유선 연결의 현재 연결 상태를 가져옵니다.

모수:

|입력/출력|이름 *|이름 *|
| --- | --- | --- |
|[아웃]| `status` |링크 상태,`TKL_WIRED_STAT_E`. |

반환 값:

`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.

## tkl wired set status cb에
```c
OPERATE_RET tkl_wired_set_status_cb(TKL_WIRED_STATUS_CHANGE_CB cb);
```

유선 연결 상태가 변경될 때 불이 불이익을 기록합니다.

모수:

|입력/출력|이름 *|이름 *|
| --- | --- | --- |
|[인]| `cb` |상태 변경에 호출합니다.|

콜백에는 다음과 같은 서명이 있습니다.

```c
typedef void (*TKL_WIRED_STATUS_CHANGE_CB)(TKL_WIRED_STAT_E status);
```

반환 값:

`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.

## tkl wired get ip에 대해
```c
OPERATE_RET tkl_wired_get_ip(NW_IP_S *ip);
```

유선 링크의 IPv4 주소, 게이트웨이 및 서브넷 마스크를 가져옵니다.

모수:

|입력/출력|이름 *|이름 *|
| --- | --- | --- |
|[아웃]| `ip` |IP 정보,`NW_IP_S`. |

반환 값:

`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.

## tkl wired get ipv6에 대해
```c
OPERATE_RET tkl_wired_get_ipv6(NW_IP_TYPE type, NW_IP_S *ip);
```

유선 링크의 IPv6 주소를 가져옵니다.

모수:

|입력/출력|이름 *|이름 *|
| --- | --- | --- |
|[인]| `type` |읽는 IPv6 주소 유형,`NW_IP_TYPE`. |
|[아웃]| `ip` |IP 정보,`NW_IP_S`. |

반환 값:

`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.

## tkl wired get mac의 경우
```c
OPERATE_RET tkl_wired_get_mac(NW_MAC_S *mac);
```

유선 링크의 MAC 주소를 가져옵니다.

모수:

|입력/출력|이름 *|이름 *|
| --- | --- | --- |
|[아웃]| `mac` |MAC 주소,`NW_MAC_S`. |

반환 값:

`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.

## tkl wired set mac의 경우
```c
OPERATE_RET tkl_wired_set_mac(const NW_MAC_S *mac);
```

유선 링크의 MAC 주소를 설정합니다.

모수:

|입력/출력|이름 *|이름 *|
| --- | --- | --- |
|[인]| `mac` |설정하는 MAC 주소,`NW_MAC_S`. |

반환 값:

`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.
