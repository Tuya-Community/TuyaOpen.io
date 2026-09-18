---
title: "tkl system | 시스템"
description: "tkl system 참고 - 재부팅, 진드기 / ms 시간베이스, 임의, 수면, 지연, 재설정 이유 및 포팅 / 플랫폼 적응을위한 CPU 정보."
keywords:
  - tkl_system
  - tuyaopen system api
  - tkl system api
  - embedded system services
---

더 보기`tkl_system`공용영역은 핵심 체계 서비스를 제공합니다: 재부팅, 진드기 및 millisecond 시간 기초, 무작위 수, 잠 및 바쁜 지연, 리셋 엘리슨 보고, 및 CPU 정보. 이 커널 추상 레이어 (TKL) 항목 포인트는 각 플랫폼이 구현됩니다. 고급 TAL 및 응용 코드는 휴대용 타이밍 및 수명주기 제어를 호출합니다.

## tkl system enter critical의 경우
```c
uint32_t tkl_system_enter_critical(void);
```

이 페이지는 자동으로 번역 되었다. 원문 언어: Masking interrupts, and Return the same interrupt mask so a later`tkl_system_exit_critical`호출은 복원 할 수 있습니다.

- 매개 변수: 없음.
- 반환 값:`uint32_t`, 중요한 부분을 입력하기 전에 캡처 된 중단 마스크.

:::tip
사용 방법`TKL_ENTER_CRITICAL()`이름 *`TKL_EXIT_CRITICAL()`호출을 자동적으로 설정하는 매크로;`TKL_ENTER_CRITICAL()`지역 선언`__irq_mask`이름 *`TKL_EXIT_CRITICAL()`로그아웃
:::

## tkl system exit critical의 경우
```c
void tkl_system_exit_critical(uint32_t irq_mask);
```

이 페이지는 자동으로 번역 되었다. 원문 언어: How to Stop Mask`tkl_system_enter_critical`.

|제품 설명|이름 *|
| --- | --- |
| `irq_mask` |일치하는 중단 가면`tkl_system_enter_critical`전화.|

- 반환 값: 없음.

## tkl system reset의 경우
```c
void tkl_system_reset(void);
```

시스템 재부팅을 수행합니다.

- 매개 변수: 없음.
- 반환 값: 없음.

:::warning
이 기능은 장치를 즉각 재부팅하고 반환하지 않습니다.
:::

## tkl system get tick count에 대해
```c
SYS_TICK_T tkl_system_get_tick_count(void);
```

시스템 진드기를 가져옵니다.

- 매개 변수: 없음.
- 반환 값:`SYS_TICK_T`, 체계 진드기 카운터의 현재 가치.

## tkl system get millisecond의 경우
```c
SYS_TIME_T tkl_system_get_millisecond(void);
```

시스템 시작부터 밀리 초의 수를 가져옵니다.

- 매개 변수: 없음.
- 반환 값:`SYS_TIME_T`, 체계 시작에서 현재 순간에 밀리 초의 총 수.

## 프로젝트
```c
int tkl_system_get_random(uint32_t range);
```

지정된 범위 내에서 임의 번호를 가져옵니다.

|제품 설명|이름 *|
| --- | --- |
| `range` |임의 값의 위 경계. 결과는 범위에 있습니다.`0`으로`range`. |

- 반환 값:`int`, 생성 된 임의 번호.

:::tip
임의 번호 생성기는 첫 번째 호출에 초기화됩니다.
:::

## tkl system get reset reason에 대해
```c
TUYA_RESET_REASON_E tkl_system_get_reset_reason(char **describe);
```

가장 최근의 시스템 리셋에 대한 이유를 가져옵니다.

|제품 설명|이름 *|
| --- | --- |
| `describe` |산출 모수. 재설정 이유를 설명하는 문자열로 포인터를 수신합니다.|

- 반환 값:`TUYA_RESET_REASON_E`, 재시동 값을 식별합니다.

```c
typedef enum {
    TUYA_RESET_REASON_POWERON    = 0,  ///< Power-on reset, supply voltage < power-on threshold (TY_RST_POWER_OFF)
    TUYA_RESET_REASON_HW_WDOG    = 1,  ///< Hardware watchdog reset occurred (TY_RST_HARDWARE_WATCHDOG)
    TUYA_RESET_REASON_FAULT      = 2,  ///< An access fault occurred (TY_RST_FATAL_EXCEPTION)
    TUYA_RESET_REASON_SW_WDOG    = 3,  ///< Software watchdog reset occurred (TY_RST_SOFTWARE_WATCHDOG)
    TUYA_RESET_REASON_SOFTWARE   = 4,  ///< Software triggered reset (TY_RST_SOFTWARE)
    TUYA_RESET_REASON_DEEPSLEEP  = 5,  ///< Reset caused by entering deep sleep (TY_RST_DEEPSLEEP)
    TUYA_RESET_REASON_EXTERNAL   = 6,  ///< External reset trigger (TY_RST_HARDWARE)
    TUYA_RESET_REASON_UNKNOWN    = 7,  ///< Undeterminable cause
    TUYA_RESET_REASON_FIB        = 8,  ///< Reset originated from the FIB bootloader
    TUYA_RESET_REASON_BOOTLOADER = 8,  ///< Reset relates to a bootloader
    TUYA_RESET_REASON_CRASH      = 10, ///< Software crash
    TUYA_RESET_REASON_FLASH      = 11, ///< Flash failure caused reset
    TUYA_RESET_REASON_FATAL      = 12, ///< A non-recoverable fatal error occurred
    TUYA_RESET_REASON_BROWNOUT   = 13, ///< Brownout
    TUYA_RESET_REASON_UNSUPPORT  = 0xFF,
} TUYA_RESET_REASON_E;
```

## tkl system 잠자는
```c
void tkl_system_sleep(uint32_t num_ms);
```

지정된 기간 동안 저전력 수면 상태로 시스템을 넣으십시오.

|제품 설명|이름 *|
| --- | --- |
| `num_ms` |milliseconds의 수면 내구.|

- 반환 값: 없음.

## tkl system delay에 대하여
```c
void tkl_system_delay(uint32_t num_ms);
```

지정된 기간에 대한 지연 실행.

|제품 설명|이름 *|
| --- | --- |
| `num_ms` |밀리 초의 지연 시간.|

- 반환 값: 없음.

## tkl system get cpu info에 대해
```c
OPERATE_RET tkl_system_get_cpu_info(TUYA_CPU_INFO_T **cpu_ary, int *cpu_cnt);
```

시스템 CPU에 대한 정보를 가져옵니다.

|제품 설명|이름 *|
| --- | --- |
| `cpu_ary` |산출 모수. 포인터를 배열로 수신`TUYA_CPU_INFO_T`. |
| `cpu_cnt` |산출 모수. CPU의 수를 수신합니다.|

- 반환 값:`OPRT_OK`성공에. 다른 값은 오류를 나타냅니다.`tuya_error_code.h`.

더 보기`TUYA_CPU_INFO_T`구조 보고 per-CPU 사용법과 칩 ID:

```c
typedef struct {
    uint32_t use_ratio;     // CPU used ratio
    uint8_t  chipid[32+1];  // chip id, max length 32
    uint8_t  chipidlen;     // chip id length
} TUYA_CPU_INFO_T;
```

## 더 보기
- [스레드 및 타이머 패턴](../peripheral/tutorials/thread-timer-patterns)
