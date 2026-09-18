---
title: "tkl output | 로그 출력"
description: "tkl output reference — TuyaOpen log output TKL API for write formatted log message and opening/closing platform log port for porting/platform adaptation."
keywords:
  - tkl_output
  - tuyaopen log output
  - tkl log api
  - embedded logging
---

더 보기`tkl_output`interface writes formatted log output to the platform's log port and opens or closes that port. 커널 요약 레이어 (TKL) 포트는 각 플랫폼이 구현됩니다. TAL 로깅 레이어는 메시지를 통해 전달합니다.

## tkl log 출력
```c
void tkl_log_output(const char *format, ...);
```

로그 포트에 지정된 로그 정보를 출력합니다.

|제품 설명|이름 *|
| --- | --- |
| `format` | `printf`-style 형식 문자열, 다음과 같은 변수 수의 인수.|

- 반환 값: 없음.

## tkl log 닫기
```c
OPERATE_RET tkl_log_close(void);
```

로그 포트를 닫습니다.

- 매개 변수: 없음.
- 반환 값:`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.

## tkl log 오픈
```c
OPERATE_RET tkl_log_open(void);
```

로그 포트를 엽니다.

- 매개 변수: 없음.
- 반환 값:`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.
