---
title: tkl network | 네트워킹 API
description: "tkl network reference — TuyaOpen 네트워킹 TKL API 소켓, 연결, 바인드, 듣기, send/recv, 내장된 IoT 개발 소켓 옵션."
keywords:
  - tkl_network
  - tuyaopen network api
  - tkl socket api
  - embedded networking
---

더 보기`tkl_network.c`파일은 네트워크 통신 프로세스에 필요한 일련의 API를 제공합니다. 이 API는 소켓, 연결, 연결, 바인딩, 듣는, 자료, 받기 자료, 조정 및 소켓 선택권 및 다른 네트워크 가동을 창조합니다. 이 파일은 네트워크 API의 일반적인 취급을 정의하고 이러한 캡슐화 된 기능을 통해 크로스 플랫폼 네트워크 통신을 허용합니다.

## API 설명
### 프로젝트
```c
TUYA_ERRNO tkl_net_get_errno(void);
```

#### 제품정보
네트워크 오류 코드를 검색합니다.

#### 이름 *
모수 없음.

#### 반환 값
반환 0 성공에, 그렇지 않으면 대상 시스템에 특정 오류 코드를 반환.

### 프로젝트
```c
OPERATE_RET tkl_net_fd_set(const int fd, TUYA_FD_SET_T* fds);
```

#### 제품정보
설정에 파일 descriptor를 추가합니다.

#### 이름 *
- `fd`: 추가될 파일 descriptor.
- `fds`: 파일 descriptor 설정에 포인터.

#### 반환 값
기타 제품`OPRT_OK`성공에, 그렇지 않으면 오류 코드를 참조`tuya_error_code.h`.

### tkl net fd clear의
```c
OPERATE_RET tkl_net_fd_clear(const int fd, TUYA_FD_SET_T* fds);
```

#### 제품정보
설정에서 파일 descriptor 제거.

#### 이름 *
- `fd`: 파일을 명확하게합니다.
- `fds`: 파일 descriptor 설정에 포인터.

#### 반환 값
기타 제품`OPRT_OK`성공에, 그렇지 않으면 오류 코드를 참조`tuya_error_code.h`.

### 프로젝트
```c
OPERATE_RET tkl_net_fd_isset(const int fd, TUYA_FD_SET_T* fds);
```

#### 제품정보
file descriptor가 설정된 경우 체크 합니다.

#### 이름 *
- `fd`: 확인되는 파일 descriptor.
- `fds`: 파일 descriptor 설정에 포인터.

#### 반환 값
기타 제품`TRUE`file descriptor가 설정된 경우, 그렇지 않으면 반환`FALSE`.

### 프로젝트
```c
OPERATE_RET tkl_net_fd_zero(TUYA_FD_SET_T* fds);
```

#### 제품정보
파일 descriptor 설정에서 모든 파일 descriptors를 삭제합니다.

#### 이름 *
- `fds`: 파일 descriptor 설정에 포인터.

#### 반환 값
기타 제품`OPRT_OK`성공에, 그렇지 않으면 오류 코드를 참조`tuya_error_code.h`.

### tkl net 선택
```c
int tkl_net_select(const int maxfd, TUYA_FD_SET_T *readfds, TUYA_FD_SET_T *writefds, TUYA_FD_SET_T *errorfds, const uint32_t ms_timeout);
```

#### 제품정보
사용 가능한 파일 descriptors 세트를 검색합니다.

#### 이름 *
- `maxfd`: 최대 수 이상의 파일 descriptors를 검사합니다.
- `readfds`: 읽기 쉬운 파일 descriptors의 세트에 포인터.
- `writefds`: writable file descriptors의 집합에 포인터.
- `errorfds`: erroneous 파일 descriptors의 집합에 포인터.
- `ms_timeout`: 밀리초의 타임아웃 기간.

#### 반환 값
사용 가능한 파일 descriptors 수를 반환합니다. 오류에 0 미만 또는 동일 값을 반환합니다.

### tkl net get nonblock에 대 한
```c
int tkl_net_get_nonblock(const int fd);
```

#### 제품정보
비 차단 파일 descriptor를 검색합니다.

#### 이름 *
- `fd`: 파일 설명자.

#### 반환 값
성공에 비블록 파일 descriptors의 수를 반환합니다; 오류에 0 이하 값을 반환합니다.

### 네트워크
```c
OPERATE_RET tkl_net_set_block(const int fd, const BOOL_T block);
```

#### 제품정보
file descriptor에 대한 blocking flag를 설정합니다.

#### 이름 *
- `fd`: 파일 설명자.
- `block`: 만약`TRUE`, 형태를 막는 세트; 만약에`FALSE`, non-blocking 형태에 세트.

#### 반환 값
기타 제품`OPRT_OK`성공에, 그렇지 않으면 오류 코드를 참조`tuya_error_code.h`.

### tkl net 닫기
```c
TUYA_ERRNO tkl_net_close(const int fd);
```

#### 제품정보
파일 descriptor를 닫습니다.

#### 이름 *
- `fd`: 파일 설명자.

#### 반환 값
반환 0 성공에, 그렇지 않으면 대상 시스템에 특정 오류 코드를 반환.

### tkl net 슈다운
```c
TUYA_ERRNO tkl_net_shutdown(const int fd, const int how);
```

#### 제품정보
file descriptor에서 읽기/쓰기 작업을 종료합니다.

#### 이름 *
- `fd`: 파일 설명자.
- `how`: 폐쇄의 유형.

#### 반환 값
반환 0 성공에, 그렇지 않으면 대상 시스템에 특정 오류 코드를 반환.

### tkl net socket create로
```c
int tkl_net_socket_create(const TUYA_PROTOCOL_TYPE_E type);
```

#### 제품정보
TCP 또는 UDP 소켓을 만듭니다.

#### 이름 *
- `type`: 프로토콜 유형, TCP 또는 UDP.

#### 반환 값
파일 descriptor를 반환합니다.

### 네트워크
```c
TUYA_ERRNO tkl_net_connect(const int fd, const TUYA_IP_ADDR_T addr, const uint16_t port);
```

#### 제품정보
네트워크에 연결.

#### 이름 *
- `fd`: 파일 설명자.
- `addr`: 서버 주소 정보.
- `port`: 서버 포트 정보.

#### 반환 값
반환 0 성공에, 그렇지 않으면 대상 시스템에 특정 오류 코드를 반환.

### tkl net connect raw로
```c
TUYA_ERRNO tkl_net_connect_raw(const int fd, void *p_socket_addr, const int len);
```

#### 제품정보
raw data를 사용하여 네트워크에 연결합니다.

#### 이름 *
- `fd`: 파일 설명자.
- `p_socket_addr`: 원시 소켓 데이터.
- `len`: 데이터의 길이.

#### 반환 값
반환 0 성공에, 그렇지 않으면 대상 시스템에 특정 오류 코드를 반환.

### tkl net 빈드
```c
TUYA_ERRNO tkl_net_bind(const int fd, const TUYA_IP_ADDR_T addr, const uint16_t port);
```

#### 제품정보
네트워크에 소켓을 삽입합니다.

#### 이름 *
- `fd`: 파일 설명자.
- `addr`: 서버 주소 정보.
- `port`: 서버 포트 정보.

#### 반환 값
반환 0 성공에, 그렇지 않으면 대상 시스템에 특정 오류 코드를 반환.

### 프로젝트
```c
TUYA_ERRNO tkl_net_listen(const int fd, const int backlog);
```

#### 제품정보
네트워크 연결 요청을 듣습니다.

#### 이름 *
- `fd`: 파일 descriptor
- `backlog`: 커넥션의 최대 수는 커넥션을 할 수 있습니다.

#### 반환 값
반환 0 성공에, 그렇지 않으면 대상 시스템에 특정 오류 코드를 반환.

### 프로젝트
```c
TUYA_ERRNO tkl_net_accept(const int fd, TUYA_IP_ADDR_T *addr, uint16_t *port);
```

#### 제품정보
네트워크 연결 요청을 수락합니다.

#### 이름 *
- `fd`: 파일 descriptor
- `addr`: 수신기의 IP 주소.
- `port`: 수신기의 포트 번호.

#### 반환 값
반환 0 성공에, 그렇지 않으면 대상 시스템에 특정 오류 코드를 반환.

### 프로젝트
```c
TUYA_ERRNO tkl_net_send(const int fd, const void *buf, const uint32_t nbytes);
```

#### 제품정보
네트워크에 데이터를 보냅니다.

#### 이름 *
- `fd`: 파일 descriptor
- `buf`: 데이터가 전송되는 버퍼.
- `nbytes`: 버퍼의 길이

#### 반환 값
전송된 바이트 수; 오류에 부정적인 값을 반환합니다.

### tkl net send to에
```c
TUYA_ERRNO tkl_net_send_to(const int fd, const void *buf, const uint32_t nbytes, const TUYA_IP_ADDR_T addr, const uint16_t port);
```

#### 제품정보
지정된 서버에 데이터를 보냅니다.

#### 이름 *
- `fd`: 파일 descriptor
- `buf`: 데이터가 전송되는 버퍼.
- `nbytes`: 버퍼의 길이
- `addr`: 서버 주소 정보.
- `port`: 서버 포트 정보.

#### 반환 값
전송된 바이트 수; 오류에 부정적인 값을 반환합니다.

### 프로젝트
```c
TUYA_ERRNO tkl_net_recv(const int fd, void *buf, const uint32_t nbytes);
```

#### 제품정보
네트워크에서 데이터를 수신합니다.

#### 이름 *
- `fd`: 파일 descriptor
- `buf`: 수신된 데이터를 저장하는 버퍼.
- `nbytes`: 버퍼의 길이

#### 반환 값
주어진 바이트 수; 오류에 부정적인 값을 반환합니다.

### tkl net recv nd size의 크기
```c
int tkl_net_recv_nd_size(const int fd, void *buf, const uint32_t buf_size, const uint32_t nd_size);
```

#### 제품정보
네트워크에서 지정된 크기의 데이터를 수신합니다.

#### 이름 *
- `fd`: 파일 descriptor
- `buf`: 수신된 데이터를 저장하는 버퍼.
- `buf_size`: 버퍼의 크기.
- `nd_size`: 수신되는 데이터의 예상 크기.

#### 반환 값
성공에 수신된 데이터의 실제 금액, 또는 오류에 부정적인 값.

### 프로젝트
```c
TUYA_ERRNO tkl_net_recvfrom(const int fd, void *buf, const uint32_t nbytes, TUYA_IP_ADDR_T *addr, uint16_t *port);
```

#### 제품정보
지정된 서버에서 데이터를 수신합니다.

#### 이름 *
- `fd`: 파일 descriptor
- `buf`: 수신된 데이터를 저장하는 버퍼.
- `nbytes`: 버퍼의 길이
- `addr`[OUT]: 서버 주소 정보.
- `port`[OUT]: 서버 포트 정보.

#### 반환 값
주어진 바이트 수; 오류에 부정적인 값을 반환합니다.

### tkl net gethostbyname에 대 한
```c
OPERATE_RET tkl_net_gethostbyname(const char *domain, TUYA_IP_ADDR_T *addr);
```

#### 제품정보
도메인 이름의 주소 정보를 가져옵니다.

#### 이름 *
- `domain`: 도메인 이름 정보.
- `addr`: 주소 정보를 저장하는 포인터.

#### 반환 값
기타 제품`OPRT_OK`성공에, 그렇지 않으면 오류 코드를 참조`tuya_error_code.h`.

### tkl net socket bind의
```c
OPERATE_RET tkl_net_socket_bind(const int fd, const char *ip);
```

#### 제품정보
지정된 IP로 네트워크에 소켓을 삽입합니다.

#### 이름 *
- `fd`: 파일 descriptor
- `ip`: IP 주소

#### 반환 값
기타 제품`OPRT_OK`성공에, 그렇지 않으면 오류 코드를 참조`tuya_error_code.h`.

### tkl net set cloexec의
```c
OPERATE_RET tkl_net_set_cloexec(const int fd);
```

#### 제품정보
소켓을 설정하여 아이 프로세스에서 열 수 있습니다.`fork`전화.

#### 이름 *
- `fd`: 파일 descriptor

#### 반환 값
기타 제품`OPRT_OK`성공에, 그렇지 않으면 오류 코드를 참조`tuya_error_code.h`.

### tkl net get socket ip에
```c
OPERATE_RET tkl_net_get_socket_ip(const int fd, TUYA_IP_ADDR_T *addr);
```

#### 제품정보
소켓 descriptor를 통해 IP 주소를 얻습니다.

#### 이름 *
- `fd`: 파일 descriptor
- `addr`: IP 주소를 저장하는 포인터.

#### 반환 값
기타 제품`OPRT_OK`성공에, 그렇지 않으면 오류 코드를 참조`tuya_error_code.h`.

### tkl net str2 추가
```c
TUYA_IP_ADDR_T tkl_net_str2addr(const char *ip_str);
```

#### 제품정보
IP 문자열을 주소로 변환합니다.

#### 이름 *
- `ip_str`: IP 문자열.

#### 반환 값
변환 된 IP 주소를 반환합니다.

### 프로젝트
```c
char *tkl_net_addr2str(const TUYA_IP_ADDR_T ipaddr);
```

#### 제품정보
IPv4 dotted-decimal 표기의 문자열로 IP 주소(호스트 바이트 순서)를 변환합니다.`xx.xx.xx.xx`).

#### 이름 *
- `ipaddr`: IP 주소

#### 반환 값
결과를 반환 IP 문자열.

### tkl net setsockopt의 장점
```c
OPERATE_RET tkl_net_setsockopt(const int fd, const TUYA_OPT_LEVEL level, const TUYA_OPT_NAME optname, const void *optval, const int optlen);
```

#### 제품정보
소켓 옵션 설정.

#### 이름 *
- `fd`: 파일 descriptor
- `level`: 옵션이 정의된 수준.
- `optname`: 옵션 이름.
- `optval`: 옵션 값에 포인터.
- `optlen`: 옵션 값의 길이.

#### 반환 값
기타 제품`OPRT_OK`성공에, 그렇지 않으면 오류 코드를 참조`tuya_error_code.h`.

### tkl net getsockopt에 대 한
```c
OPERATE_RET tkl_net_getsockopt(const int fd, const TUYA_OPT_LEVEL level, const TUYA_OPT_NAME optname, void *optval, int *optlen);
```

#### 제품정보
소켓 옵션 값을 가져옵니다.

#### 이름 *
- `fd`: 파일 descriptor
- `level`: 옵션이 정의된 수준.
- `optname`: 옵션 이름.
- `optval`: 옵션 값이 저장되는 점퍼.
- `optlen`: 옵션 값의 길이가 저장됩니다.

#### 반환 값
기타 제품`OPRT_OK`성공에, 그렇지 않으면 오류 코드를 참조`tuya_error_code.h`.

### tkl net set timeout에 대한 정보
```c
OPERATE_RET tkl_net_set_timeout(const int fd, const int ms_timeout, const TUYA_TRANS_TYPE_E type);
```

#### 제품정보
소켓 timeout 옵션을 설정합니다.

#### 이름 *
- `fd`: 파일 descriptor
- `ms_timeout`: 밀리초의 타임아웃 기간.
- `type`: 전송 유형, 수신 또는 전송 중.

#### 반환 값
기타 제품`OPRT_OK`성공에, 그렇지 않으면 오류 코드를 참조`tuya_error_code.h`.

### tkl net set 부 크기
```c
OPERATE_RET tkl_net_set_bufsize(const int fd, const int buf_size, const TUYA_TRANS_TYPE_E type);
```

#### 제품정보
소켓 버퍼 크기 옵션을 설정합니다.

#### 이름 *
- `fd`: 파일 descriptor
- `buf_size`: 바이트의 버퍼 크기.
- `type`: 전송 유형, 수신 또는 전송 중.

#### 반환 값
기타 제품`OPRT_OK`성공에, 그렇지 않으면 오류 코드를 참조`tuya_error_code.h`.

### tkl net
```c
OPERATE_RET tkl_net_set_reuse(const int fd);
```

#### 제품정보
소켓 재사용 옵션을 사용할 수 있습니다.

#### 이름 *
- `fd`: 파일 descriptor

#### 반환 값
기타 제품`OPRT_OK`성공에, 그렇지 않으면 오류 코드를 참조`tuya_error_code.h`.

### tkl net disable nagle의 경우
```c
OPERATE_RET tkl_net_disable_nagle(const int fd);
```

#### 제품정보
소켓의 Nagle 알고리즘을 비활성화합니다.

#### 이름 *
- `fd`: 파일 descriptor

#### 반환 값
기타 제품`OPRT_OK`성공에, 그렇지 않으면 오류 코드를 참조`tuya_error_code.h`.

### 프로젝트
```c
OPERATE_RET tkl_net_set_broadcast(const int fd);
```

#### 제품정보
소켓 방송 옵션을 활성화합니다.

#### 이름 *
- `fd`: 파일 descriptor

#### 반환 값
기타 제품`OPRT_OK`성공에, 그렇지 않으면 오류 코드를 참조`tuya_error_code.h`.

### tkl net set keepalive의 경우
```c
OPERATE_RET tkl_net_set_keepalive(int fd, const BOOL_T alive, const uint32_t idle, const uint32_t intr, const uint32_t cnt);
```

#### 제품정보
설정하기`keepalive`소켓을 위한 선택권은 연결을 감시합니다.

#### 이름 *
- `fd`: 파일 descriptor
- `alive`: `keepalive`옵션, 활성화 또는 비활성화.
- `idle`: `keep idle`옵션, 유휴 시간 (둘째); 이 시간에 데이터 교환이 없다면, 프로브가 시작됩니다.
- `intr`: `keep interval`선택권, 조사 간격.
- `cnt`: `keep count`선택권, 조사의 수.

#### 반환 값
기타 제품`OPRT_OK`성공에, 그렇지 않으면 오류 코드를 참조`tuya_error_code.h`.

### tkl net getsockname에 대 한
```c
OPERATE_RET tkl_net_getsockname(int fd, TUYA_IP_ADDR_T *addr, uint16_t *port);
```

#### 제품정보
특정 소켓에 대한 정보를 가져옵니다.

#### 이름 *
- `fd`: 파일 descriptor
- `addr`: 소스 IP 주소.
- `port`: 소스 포트.

#### 반환 값
기타 제품`OPRT_OK`성공에, 그렇지 않으면 오류 코드를 참조`tuya_error_code.h`.

### tkl net getpeer이름
```c
OPERATE_RET tkl_net_getpeername(int fd, TUYA_IP_ADDR_T *addr, uint16_t *port);
```

#### 제품정보
특정 소켓의 대상 정보를 가져옵니다.

#### 이름 *
- `fd`: 파일 descriptor
- `addr`: 목적지 IP 주소.
- `port`: 목적지 항구.

#### 반환 값
기타 제품`OPRT_OK`성공에, 그렇지 않으면 오류 코드를 참조`tuya_error_code.h`.

### tkl net sethostname의 경우
```c
OPERATE_RET tkl_net_sethostname(const char *hostname);
```

#### 제품정보
라우터에 표시되는 시스템 호스트명을 설정합니다.

#### 이름 *
- `hostname`: 호스트명

#### 반환 값
기타 제품`OPRT_OK`성공에, 그렇지 않으면 오류 코드를 참조`tuya_error_code.h`.
