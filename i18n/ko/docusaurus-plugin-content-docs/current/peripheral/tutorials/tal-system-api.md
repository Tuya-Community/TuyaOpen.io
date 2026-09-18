---
title: "TAL 시스템 API 참조"
description: "TuyaOpen의 TAL System API 참조 : tal system.h는 중요한 섹션, 수면, 타이밍, 임의, 재설정 관리 및 PSRAM 할당을 제공합니다."
keywords:
  - tal system
  - tal_system.h
  - critical section
  - psram
  - tuyaopen api
---

TAL 시스템 API`tal_system.h`) 플랫폼에 의존하는 시스템 유틸리티를 제공합니다 : 중요한 섹션, 수면 및 지연, 타이밍, 임의 번호, 재설정 관리 및 PSRAM 할당.

지원하다`#include "tal_system.h"`(주)`#include "tal_api.h"`가득 차있는 TAL 표면을 위해).

## 중요한 단면도
ISR-safe 코드 경로에서 공유 상태를 보호 할 수 없습니다.

```c
uint32_t tal_system_enter_critical(void);
void tal_system_exit_critical(uint32_t irq_mask);
```

복수 매크로:

```c
TAL_ENTER_CRITICAL();
/* critical code -- interrupts disabled */
TAL_EXIT_CRITICAL();
```

## 수면과 지연
### tal system 잠자는
지정된 기간을 위한 현재 실을 수확하십시오. 제품정보`vTaskDelay`RTOS 플랫폼에서.

```c
void tal_system_sleep(uint32_t time_ms);
```

:::note 사이트맵
최소 수면은 10m입니다. 10 미만의 값은 10에 클램핑됩니다.
:::

### tal system delay에 대하여
차단 지연 (다른 스레드에 항복하지 않음). sparingly 사용.

```c
void tal_system_delay(uint32_t time_ms);
```

## 팀링
### tal system get tick count에 대해
시스템 진드기 카운트 (platform-specific resolution)를 가져옵니다.

```c
SYS_TICK_T tal_system_get_tick_count(void);
```

### tal system get millisecond의 경우
부팅 이후 밀리 초를 가져옵니다. 관련 상품`UINT32_MAX`(~49일 32비트)

```c
SYS_TIME_T tal_system_get_millisecond(void);
```

제대로 포장을 처리 할 때 Elapsed 시간의 unsigned subtraction를 사용하십시오:

```c
SYS_TIME_T start = tal_system_get_millisecond();
/* ... work ... */
SYS_TIME_T elapsed = tal_system_get_millisecond() - start;
```

## 무작위 번호
### 프로젝트
범위에서 무작위 정수를 가져옵니다.`[0, range)`.

```c
int tal_system_get_random(uint32_t range);
```

제품정보`esp_random()`Wi-Fi/BT가 활성화될 때 ESP32 (hardware RNG)에.

:::warning
이것은 암호화 RNG가 아닙니다. 보안 감지 작업의 경우, 사용`tal_security_*`API.
:::

## 시스템 재설정
### tal system reset의 설정
소프트웨어 재설정을 수행합니다.

```c
void tal_system_reset(void);
```

이름 *`esp_restart()`ESP32에.

### tal system get reset reason에 대해
마지막 재설정의 이유를 얻으십시오.

```c
TUYA_RESET_REASON_E tal_system_get_reset_reason(char **describe);
```

enum 값을 반환합니다. 더 보기`describe`매개변수는 현재 ** ESP32에 채워지지 않습니다 (pass)`NULL`또는 무시).

재시작 이유:`TUYA_RESET_REASON_POWERON`, `TUYA_RESET_REASON_HW_WDOG`, `TUYA_RESET_REASON_SW_WDOG`, `TUYA_RESET_REASON_SOFTWARE`, `TUYA_RESET_REASON_DEEPSLEEP`, `TUYA_RESET_REASON_FAULT`, `TUYA_RESET_REASON_UNKNOWN`.

## CPU 정보
### tal system get cpu info에 대해
```c
OPERATE_RET tal_system_get_cpu_info(TUYA_CPU_INFO_T **cpu_ary, int32_t *cpu_cnt);
```

:::note
기타 제품`OPRT_NOT_SUPPORTED`ESP32에. 제품 정보`esp_chip_info()`직접 필요하다면.
:::

## PSRAM 할당
만 사용할 때`ENABLE_EXT_RAM=1`(PSRAM을 가진 전형적으로 ESP32-S3).

```c
void *tal_psram_malloc(size_t size);
void  tal_psram_free(void *ptr);
void *tal_psram_calloc(size_t nitems, size_t size);
void *tal_psram_realloc(void *ptr, size_t size);
int   tal_psram_get_free_heap_size(void);
```

ESP32에,`tal_psram_malloc`제품정보`heap_caps_malloc(size, MALLOC_CAP_SPIRAM)`. 기준`tal_malloc`내부 RAM을 기본적으로 사용합니다.

대용량 버퍼(audio, image, AI model data)를 사용하여 내부 RAM을 스택 및 DMA에 보존합니다.

## 사용법 예
```c
#include "tal_system.h"
#include "tal_log.h"

void system_info(void)
{
    TAL_PR_INFO("uptime: %u ms", tal_system_get_millisecond());
    TAL_PR_INFO("random: %d", tal_system_get_random(100));

    TUYA_RESET_REASON_E reason = tal_system_get_reset_reason(NULL);
    TAL_PR_INFO("last reset reason: %d", reason);

#if defined(ENABLE_EXT_RAM) && (ENABLE_EXT_RAM == 1)
    TAL_PR_INFO("PSRAM free: %d bytes", tal_psram_get_free_heap_size());
#endif
}
```

## 이름 *
- [스레드 및 타이머 패턴](thread-timer-patterns)
- [TKL 시스템 API](/docs/tkl-api/tkl_system)
- [TAL 와이파이 API](tal-wifi-api)
