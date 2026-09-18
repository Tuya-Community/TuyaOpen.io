---
title: "Batch Auth: 개발자 가이드"
sidebar_label: 개발자 가이드
description: "펌웨어 개발자를 위해 - TuyaOpen UART CLI 명령은 펌웨어가 tyutool, self-test checklist에 의해 일괄 사용 가능하도록 구현해야 합니다."
keywords:
  - tyutool batch auth
  - developer guide
  - uart cli protocol
  - authorize contract
  - self-test
  - tuyaopen
---

** firmware 개발자**: tyutool의 펌웨어 배치 사용 가능, TuyaOpen UART CLI 명령 세트를 구현해야 합니다. 아래는 완전한 프로토콜 계약과 ** 자체 테스트 체크리스트**입니다.

:::note[ 잘못된 페이지에?]
연산자는 읽을[회사연혁](./batch-auth-operator.md).
:::

## 프로토콜 본질
인증 프로토콜은 TuyaOpen Interactive Shell의 ** 텍스트 명령 세트입니다 ** (Pure ASCII, 각 종결`\r\n`, 프레임 헤더 / 체크섬 / opcode). Beken BootROM 바이너리 프로토콜에서 완전히 분리 된 것은 번쩍이기에 사용됩니다. 기본 배율은`115200`8N1; 힘 위로 장치에는 선물합니다`tuya>`빠른. 권한은`tuya_authorize.c`.

:::tip[TUYAOpen 기반 펌웨어에서 CLI를 활성화하는 방법]
펌웨어는 적극적으로 등록해야합니다 : 1`tal_cli_init()`( uart0에 과태; 다른 uart 사용을 위해`tal_cli_init_with_uart(uart_num)`); ② `tuya_authorize_init()`(등록)`auth` / `auth-read` / `read_mac`). 자주 묻는 질문`user_main()`. 부호:

```c
void user_main(void)
{
    // ... tal_kv_init / tal_sw_timer_init / tal_workq_init etc.
#if !defined(PLATFORM_UBUNTU) || (PLATFORM_UBUNTU == 0)
    tal_cli_init();          // Initialize the CLI (default uart0)
    tuya_authorize_init();   // Register auth / auth-read / read_mac commands
    tuya_app_cli_init();     // Your app-specific commands (optional)
#endif
    // ... tuya_iot_init(...) etc.
}
```

:::note
TuyaOpen 기반 펌웨어에서 세 줄이 충분합니다. 명령 테이블 및 자체 테스트 체크리스트는 주로 자기 제작 또는 펌웨어를 지정합니다.
:::

## 실행해야 할 명령
|명령 (`\r\n`종료)|제품정보|펌웨어는 echo를 해야 합니다.|
| :-- | :-- | :-- |
| `sys_log_enable off` |기능 조사 + Disable 로깅|새로운:`OK: log disabled`; 이전:`No command`또는 그냥`tuya>` |
| `sys_version` |펌웨어 버전 읽기|1개의 선:`project.version x.y.z` |
| `read_mac` |MAC 읽기| `XX:XX:XX:XX:XX:FF`(6개의 종결 세그먼트; 또는 접두사 상표로`LABEL:XX:...:FF`— 7개의 세그먼트)|
| `auth-read`또는`auth-read <n>` |현재 권한 읽기|허가하는: 2개의 선`<uuid>` / `<authkey>`그 후 프롬프트; 빈 / 권한 :`Authorization read failure.`; 부분적인 에코 placeholder`uuidxxxxxxxxxxxxxxxx`(외국)|
| `auth <uuid> <authkey>`또는`auth <uuid> <authkey> <n>` |관련 기사|나쁜 길이:`uuid length must be 20/16, authkey length must be 32`( 실행되지 않음); KV 성공:`Authorization write succeeds.`(일부 버전은 재부팅에 인쇄하지 않습니다. auth-read를 통해 tyutool re-read); OTP 성공 :`Authorization write to OTP Succeeds.`; OTP 실패:`Authorization write to OTP failure.` |

:::note
펌웨어는 각 명령 줄을 echo해야 합니다. 로그 라인 (Log line)`[MM-DD HH:MM:SS ...]`)와 ANSI 탈출은 tyutool에 의해 자동적으로 벗겨집니다.
:::

## Credential 길이 규칙
- `UUID`정확히 16 또는 20 문자입니다.
- `AuthKey`정확히 32자입니다.
- placeholder UUID는`uuidxxxxxxxxxxxxxxxx`.
- UUID 법률 문자: 알파벳 플러스`- _ .`.
- AuthKey: 어떤 인쇄 가능한 ASCII 특성.

## KV 대 OTP
|주요 특징|읽기 명령|쓰기 명령|
| :-- | :-- | :-- |
|모형: KV| `auth-read` | `auth <uuid> <authkey>` |
|사이트맵| `auth-read 1` | `auth <uuid> <authkey> 1` |

주요 점:

- OTP는 T5AI입니다.
- OTP는 느립니다 (60s 총 타임 아웃 + 30s 침묵 창; 30s 침묵 창을 읽습니다).
- OTP는 대부분의 3배에 실패 retries를 씁니다 (이번 손상하지 않는 자료).
- 빈 OTP 지역을 읽으십시오`Authorization read failure.`(자유).

:::danger
OTP 쓰기가 불가능합니다. 항상 KV와 함께 유효합니다.
:::

## MAC 검증 규칙
`read_mac`유효한 MAC를 반환해야 합니다: 6개의 식민지 격리된 2 손가락 hex 세그먼트 (case-insensitive, uppercased internally); 비 hex 접두사 상표는 허용됩니다 (`LABEL:XX:...:XX`— 7개의 세그먼트); dashes, 동등한 표시 및 공간은 인식되지 않습니다. T5 / T5AI 공장 기본 MAC`C8:47:8C:00:00:18`"개인화되지 않음"- tyutool가 그것을 읽을 경우, 그 장치에 대한 aborts 허가.

## 셀프 테스트 체크리스트
115200 8N1의 직렬 도구로 각 항목을 확인합니다.

1. 더 보기`tuya>`메시지가 표시됩니다.
2. `sys_log_enable off` → `OK: log disabled`(주)`No command`오래된 펌웨어에.
3. `sys_version` → `project.version x.y.z`.
4. `read_mac`→ 유효한 MAC.
5. `auth-read`(자유) →`Authorization read failure.`.
6. `auth <valid uuid+authkey>` → `Authorization write succeeds.`(KV) /`...to OTP Succeeds.`(OTP).
7. 자주 묻는 질문`auth-read`동일한 UUID + AuthKey를 다시 읽으십시오.
8. `auth <too-short uuid> <key>`→ 길이 오류 및 권한은 변경되지 않습니다.
9. (T5AI + OTP 전용)`auth <uuid> <authkey> 1`→ OTP 성공, 및`auth-read 1`다시 읽으십시오.

:::tip
실제와 자기 테스트, 구매 자격 증명; 마지막으로 OTP를 수행.
:::

## 통합 경로
- **Path A (recommended) :** 펌웨어는 자체 허가 기능을 수행합니다 (TuyaOpen 기반 또는 자기 단순화); 일괄 실행 용도`auth-only`모드.
- **Path B : ** 공식 auth-firmware 플래시 (`assets/auth-firmware/`지원하다`.bin`칩 당) 일시적으로 허가를 가져오기 위하여; 대응 배치 형태는 입니다`flash-then-auth`.

## 구성 handoff
작업자의 경우, 라인당 한 항목 : 칩 모델; 작동 모드 (A / B); 펌웨어 파일 이름 + 버전; 두 개의 보드율 (flash / auth); 저장 모드 (KV / OTP - 플래그 OTP가 눈에 띄게); 충돌 정책 (skip / overwrite - OTP는 건너 뛸 수 있습니다); 배선 노트 (**confirm RTS는 칩의 재설정 핀으로 올바르게 유선됩니다 **); MAC 고유 보증 (각 장치의 MAC은 세계적으로 고유하고 특수하지 않은 메모를해야합니다; MAC의 특수 손상은 유효하지 않습니다.

:::note
Handoff 시트는 연산자 "단추 실행"을하자; 나중에 문제 해결을 위해 당신은에 대한 계약을 재구성 할 수 있습니다[배치 아카이브](./batch-auth-operator.md#archiving).
:::
