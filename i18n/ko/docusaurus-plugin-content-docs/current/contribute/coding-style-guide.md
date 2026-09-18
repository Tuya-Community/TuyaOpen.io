---
title: 코딩 스타일 가이드
description: "파일 이름, 헤더 가드, 서식 및 C 기여의 가독성을 다루는 Linux 커널 스타일 기반 TuyaOpen 코딩 규칙입니다."
keywords:
  - 코딩 스타일
  - 규칙
  - C 언어
  - Linux 커널 스타일
  - TuyaOpen
---

이 가이드는 TuyaOpen 개발자가 통일된 코딩 규칙을 적용하여 코드의 가독성과 유지 관리성을 높이도록 안내합니다. TuyaOpen의 스타일은 일부 수정 및 단순화를 적용한 [Linux 커널 코딩 스타일](https://www.kernel.org/doc/html/latest/process/coding-style.html)을 기반으로 합니다.

## 디렉터리 및 파일

디렉터리와 파일은 소문자로 작성하고 내용을 나타내는 이름을 사용합니다. 여러 의미를 결합하는 명령은 밑줄 `_`로 연결하며 이름은 세 구성 요소를 넘지 않도록 합니다.

### 헤더 파일

C 헤더는 여러 번 포함되는 것을 막는 심볼을 정의해야 합니다. 매크로 이름은 파일 이름과 일치시키고 대문자와 이중 밑줄을 사용합니다.

```c
#ifndef __TCP_TRANSPORTER_H__
#define __TCP_TRANSPORTER_H__

#ifdef __cplusplus
extern "C" {
#endif

...

#ifdef __cplusplus
} // extern "C"
#endif

#endif /* __TCP_TRANSPORTER_H__ */
```

C++ 환경에서도 C 함수가 올바르게 동작하도록 헤더에서 `extern "C"`를 사용합니다. 헤더의 모든 내용은 매크로 보호 영역 안에 두세요.

### 파일 헤더 설명

파일 헤더에는 파일 설명, 버전 및 저작권 주석을 포함합니다.

```c
/**
 * @file tcp_transporter.h
 * @brief Header file for TCP transporter functions.
 *
 * This file declares the interface for creating and destroying TCP transporters.
 *
 * @copyright Copyright (c) 2021-2024 Tuya Inc. All Rights Reserved.
 */
```

## 함수

### 함수 이름

함수 이름은 소문자와 밑줄로 구성하고 `set_xxx`, `get_xxx`처럼 주어-동사 구조를 따릅니다. 모듈 내부 함수는 이중 밑줄로 시작하고 `static`으로 선언하는 것이 좋습니다.

```c
static void __function(void)
{
    ...
}
```

### 입력 및 반환 값

입력 파라미터가 없으면 `void`를 사용합니다. 함수는 반환 값을 명시하고 호출된 함수의 반환 값을 확인하며 예외를 처리해야 합니다.

```c
static OPERATE_RET function(void)
{
    char *out = NULL;
    out = tal_malloc(128);
    if (NULL == out) {
        PR_ERR("tal_malloc Fails %d", len);
        return OPRT_MALLOC_FAILED;
    }
    return OPRT_OK;
}
```

### 함수 선언 및 주석

외부 API는 해당 헤더 파일에 선언합니다. 함수의 목적, 파라미터, 반환 값 및 주의 사항을 설명하는 주석을 추가합니다.

```c
/**
 * @brief Controls the TLS transporter.
 *
 * This function is used to control the TLS transporter by sending different
 * commands.
 *
 * @param t The TLS transporter to control.
 * @param cmd The command to send.
 * @param args The arguments for the command.
 *
 * @return The result of the operation.
 */
```

`@brief`에는 목적을 간결하게, `@param`에는 파라미터의 의미를, `@return`에는 반환 값의 의미를, `@warning`에는 사용 시 주의 사항을 작성합니다.

## 들여쓰기와 괄호

K&R 스타일을 사용하고 각 수준을 4칸 공백으로 들여씁니다. 키워드 뒤에는 공백을 두고 괄호 안쪽에는 불필요한 공백을 두지 않습니다. 반복문, do-while, 조건문 및 switch-case에도 같은 규칙을 적용하고 case 본문은 중괄호로 보호합니다.

```c
if (condition) {
    action();
}
```

## 매크로 및 열거형

매크로 이름과 enum 레이블은 대문자와 밑줄을 사용합니다. 관련 상수는 enum으로 그룹화하세요.

```c
#define CONSTANT 0x12345
```

## 코드 서식

clang-format 14 이상을 설치하고 현재 수정한 코드를 포맷합니다.

```bash
$ clang-format -style=file -i <file>
```

컴파일 중 `tools/hooks/pre-commit`이 `.git/hooks`에 복사됩니다. 커밋할 때 pre-commit이 `git add`로 추가된 파일에 clang-format을 자동 적용합니다.
