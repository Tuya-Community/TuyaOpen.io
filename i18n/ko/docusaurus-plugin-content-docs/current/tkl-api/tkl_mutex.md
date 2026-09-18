---
title: "tkl mutex | 무텍스"
description: "tkl mutex 참고 — TuyaOpen recursive mutex TKL API for create, lock, Unlock, and release of synchronization primitives for porting/platform adaptation."
keywords:
  - tkl_mutex
  - tuyaopen mutex driver
  - tkl mutex api
  - rtos synchronization
---

더 보기`tkl_mutex`인터페이스는 멀티 태스킹 환경에서 공유 리소스에 동기화 된 액세스를위한 재큐브 뮤텍스를 만들고 관리합니다. 커널 요약 레이어 (TKL) 포트는 각 플랫폼은 RTOS의 상단에 구현합니다. 이 기능에 의해 창조된 각 mutex는 recursive입니다: 자신의 실은 그것을 한 번 잠그고 그것의 동일한 수를 자물쇠로 여야합니다.

## 제품정보
```c
typedef void *TKL_MUTEX_HANDLE;
```

`TKL_MUTEX_HANDLE`뮤텍스에 opaque 핸들입니다.

## tkl mutex create init의
```c
OPERATE_RET tkl_mutex_create_init(TKL_MUTEX_HANDLE *pMutexHandle);
```

recursive mutex를 생성하고 초기화합니다.

|제품 설명|이름 *|
| --- | --- |
| `pMutexHandle` |산출 모수. 생성된 mutex 손잡이를 받으십시오.|

- 반환 값:`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.

## 프로젝트
```c
OPERATE_RET tkl_mutex_lock(const TKL_MUTEX_HANDLE mutexHandle);
```

반복적인 mutex를 잠그십시오. mutex가 다른 스레드에 의해 개최되면, 호출 스레드 블록을 사용할 수 때까지.

|제품 설명|이름 *|
| --- | --- |
| `mutexHandle` |Mutex 손잡이.|

- 반환 값:`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.

## tkl mutex trylock의
```c
OPERATE_RET tkl_mutex_trylock(const TKL_MUTEX_HANDLE mutexHandle);
```

차단하지 않고 recursive mutex를 잠그는 트리. 자물쇠가 취득되지 않았던지 즉시 반환합니다.

|제품 설명|이름 *|
| --- | --- |
| `mutexHandle` |Mutex 손잡이.|

- 반환 값:`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.

## 프로젝트
```c
OPERATE_RET tkl_mutex_unlock(const TKL_MUTEX_HANDLE mutexHandle);
```

호출 스레드에 의해 다시 잠겨 recursive mutex를 잠금 해제.

|제품 설명|이름 *|
| --- | --- |
| `mutexHandle` |Mutex 손잡이.|

- 반환 값:`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.

## tkl mutex 출판
```c
OPERATE_RET tkl_mutex_release(const TKL_MUTEX_HANDLE mutexHandle);
```

recursive mutex를 릴리즈하고 삭제합니다.

|제품 설명|이름 *|
| --- | --- |
| `mutexHandle` |Mutex 손잡이.|

- 반환 값:`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.

## 더 보기
- [스레드 및 타이머 패턴](../peripheral/tutorials/thread-timer-patterns)
