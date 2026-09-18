---
title: "tkl thread | 스레드"
description: "tkl thread reference — TuyaOpen Thread TKL API for create, terminating, 그리고 porting/platform 적응을 위한 스택과 우선 순위를 가진 OS 작업을 검사."
keywords:
  - tkl_thread
  - tuyaopen thread api
  - tkl thread api
  - rtos task management
---

더 보기`tkl_thread`인터페이스는, 종결하고, 멀티 태스킹 환경에서 운영 체제 스레드 (tasks)를 검사합니다. 커널 요약 레이어 (TKL) 포트는 각 플랫폼은 RTOS의 상단에 구현합니다. TAL 및 응용 코드는 휴대용 작업 관리에 대해 호출합니다.

## 제품정보
```c
typedef void *TKL_THREAD_HANDLE;
typedef void (*THREAD_FUNC_T)(void *);
```

|제품정보|이름 *|
| --- | --- |
| `TKL_THREAD_HANDLE` |실에 Opaque 손잡이.|
| `THREAD_FUNC_T` |실 입장 기능. 수상내역`arg`창조에 전달.|

Thread 우선은 정의된 값 중 하나입니다.`tuya_cloud_types.h`, 에서`TKL_THREAD_PRI_LOWEST` (`0`)를 통해`TKL_THREAD_PRI_NORMAL` (`4`)에`TKL_THREAD_PRI_HIGHEST` (`8`).

## 프로젝트
```c
OPERATE_RET tkl_thread_create(TKL_THREAD_HANDLE *thread, const char *name, uint32_t stack_size,
                              uint32_t priority, const THREAD_FUNC_T func, void *const arg);
```

스레드를 만듭니다.

|제품 설명|이름 *|
| --- | --- |
| `thread` |산출 모수. 생성된 실의 손잡이를 받으십시오.|
| `name` |실 이름.|
| `stack_size` |스레드의 스택 크기, 바이트.|
| `priority` |스레드 우선 순위. 우선 값 보기`tuya_cloud_types.h`. |
| `func` |주요 실 기능.|
| `arg` |관련 기사`func`. 일 수 있습니다`NULL`. |

- 반환 값:`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.

## 카지노사이트
```c
OPERATE_RET tkl_thread_release(const TKL_THREAD_HANDLE thread);
```

스레드를 정의하고 리소스를 공개합니다.

|제품 설명|이름 *|
| --- | --- |
| `thread` |종결에 나사의 손잡이.|

- 반환 값:`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.

## tkl thread get watermark로 이동
```c
OPERATE_RET tkl_thread_get_watermark(const TKL_THREAD_HANDLE thread, uint32_t *watermark);
```

스레드 스택 워터 마크 (최소 무료 스택 공간 관찰)를 가져옵니다.

|제품 설명|이름 *|
| --- | --- |
| `thread` |실 손잡이.|
| `watermark` |산출 모수. 바이트의 워터 마크를 수신합니다.|

- 반환 값:`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.

## tkl thread get id에
```c
OPERATE_RET tkl_thread_get_id(TKL_THREAD_HANDLE *thread);
```

호출 스레드의 손잡이를 가져옵니다.

|제품 설명|이름 *|
| --- | --- |
| `thread` |산출 모수. 현재 실 손잡이를 받으십시오.|

- 반환 값:`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.

## tkl thread set self name(으)로
```c
OPERATE_RET tkl_thread_set_self_name(const char *name);
```

호출 스레드의 이름을 설정합니다.

|제품 설명|이름 *|
| --- | --- |
| `name` |스레드의 새로운 이름.|

- 반환 값:`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.

## tkl thread is self의
```c
OPERATE_RET tkl_thread_is_self(TKL_THREAD_HANDLE thread, BOOL_T *is_self);
```

지정된 스레드가 호출 스레드인지 확인하십시오.

|제품 설명|이름 *|
| --- | --- |
| `thread` |실 손잡이.|
| `is_self` |산출 모수. 설정하기`TRUE`이름 *`thread`호출 스레드입니다.|

- 반환 값:`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.

## tkl thread get priority에 대하여
```c
OPERATE_RET tkl_thread_get_priority(TKL_THREAD_HANDLE thread, int *priority);
```

스레드의 우선 순위를 가져옵니다.

|제품 설명|이름 *|
| --- | --- |
| `thread` |실 손잡이.`NULL`현재 스레드를 나타냅니다.|
| `priority` |산출 모수. 스레드 우선권을 받으십시오.|

- 반환 값:`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.

## tkl thread set priority의 경우
```c
OPERATE_RET tkl_thread_set_priority(TKL_THREAD_HANDLE thread, int priority);
```

스레드의 우선 순위를 설정합니다.

|제품 설명|이름 *|
| --- | --- |
| `thread` |실 손잡이.`NULL`현재 스레드를 나타냅니다.|
| `priority` |새로운 스레드 우선 순위.|

- 반환 값:`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.

## 카지노사이트
```c
OPERATE_RET tkl_thread_diagnose(TKL_THREAD_HANDLE thread);
```

스레드를 진단, 예를 들어 작업 스택을 덤프.

|제품 설명|이름 *|
| --- | --- |
| `thread` |실 손잡이.|

- 반환 값:`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.

## 더 보기
- [스레드 및 타이머 패턴](../peripheral/tutorials/thread-timer-patterns)
