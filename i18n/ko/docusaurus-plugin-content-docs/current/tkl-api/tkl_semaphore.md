---
title: "tkl semaphore | 남성 이동"
description: "tkl semaphore reference — TuyaOpen counting semaphore TKL API for create, wait, post, and release for task sync for porting/platform adaptation."
keywords:
  - tkl_semaphore
  - tuyaopen semaphore api
  - tkl semaphore api
  - rtos synchronization
---

더 보기`tkl_semaphore`인터페이스는 멀티 태스킹 환경에서 작업 동기화 및 이벤트 알림을 위해 semaphores를 계산하고 관리합니다. 커널 요약 레이어 (TKL) 포트는 각 플랫폼은 RTOS의 상단에 구현합니다.

## 제품정보
```c
typedef void *TKL_SEM_HANDLE;
#define TKL_SEM_WAIT_FOREVER 0xFFFFffff
```

|계정 만들기|이름 *|
| --- | --- |
| `TKL_SEM_HANDLE` |Opaque는 semaphore에 손잡이.|
| `TKL_SEM_WAIT_FOREVER` |Timeout 값`tkl_semaphore_wait`semaphore가 취득 될 때까지 그 블록.|

## tkl semaphore create init의
```c
OPERATE_RET tkl_semaphore_create_init(TKL_SEM_HANDLE *handle, uint32_t sem_cnt, uint32_t sem_max);
```

생성 및 초기화 semaphore.

|제품 설명|이름 *|
| --- | --- |
| `handle` |산출 모수. 생성된 semaphore 손잡이를 받으십시오.|
| `sem_cnt` |semaphore의 초기 조사.|
| `sem_max` |semaphore의 최대 수.|

- 반환 값:`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.

## tkl sema 이동 wait
```c
OPERATE_RET tkl_semaphore_wait(const TKL_SEM_HANDLE handle, uint32_t timeout);
```

semaphore에 대기, 하나가 취득 될 때 계산을 감소.

|제품 설명|이름 *|
| --- | --- |
| `handle` |Semaphore 손잡이.|
| `timeout` |밀리 초에 타임 아웃을 기다립니다.`TKL_SEM_WAIT_FOREVER`semaphore가 취득 될 때까지 블록.|

- 반환 값:`OPRT_OK`성공에.`OPRT_OS_ADAPTER_SEM_WAIT_TIMEOUT`타임아웃을 나타냅니다. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.

## tkl sema 이동 post
```c
OPERATE_RET tkl_semaphore_post(const TKL_SEM_HANDLE handle);
```

게시물 (신호) semaphore, 그것의 수를 증가.

|제품 설명|이름 *|
| --- | --- |
| `handle` |Semaphore 손잡이.|

- 반환 값:`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.

## tkl semaphore 출판
```c
OPERATE_RET tkl_semaphore_release(const TKL_SEM_HANDLE handle);
```

semaphore를 릴리즈하고 삭제합니다.

|제품 설명|이름 *|
| --- | --- |
| `handle` |Semaphore 손잡이.|

- 반환 값:`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.

## 더 보기
- [스레드 및 타이머 패턴](../peripheral/tutorials/thread-timer-patterns)
