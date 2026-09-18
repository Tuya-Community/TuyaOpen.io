---
title: Heap 할당 및 PSRAM
description: "TuyaOpen의 Heap 할당 및 PSRAM: tal malloc/tal free from tal memory.h and tal psram * allocators가 ESP32 SPIRAM에 ENABLE EXT RAM에 의해 활성화되었습니다."
keywords:
  - heap allocation
  - psram
  - tal_malloc
  - esp32 spiram
  - tuyaopen peripheral
---

## 제품정보
TuyaOpen 애플리케이션은 **TAL** (을)를 통해 동적 메모리를 할당합니다.`tal_memory.h` / `tal_api.h`). **외부 PSRAM **를 가진 칩에, Kconfig는 **를 가능하게 할 수 있습니다`ENABLE_EXT_RAM`** 일부 하위 시스템 및 편의 매크로를 **,`tal_psram_*`** allocators so large buffers는 scarce ** 내부 SRAM **를 사용하지 않습니다.

**Audience: ** 신청 및 Midware 개발자 **ESP32 ( SPIRAM) ** 및 기타 대상`ENABLE_EXT_RAM`지원됩니다; Linux 개발자는 휴대용 API를 문서화 할 수 있습니다 (에 의해 백업 됨)`malloc`항구에서).

## 자주 묻는 질문
- [메모리 및 저장 개요](overview)
- [TAL 시스템 API 참조](../tutorials/tal-system-api)(와 같은 헤더 가족의 PSRAM 도우미 포함)

## 제품 정보
- 머리:`#include "tal_memory.h"`또는`#include "tal_api.h"`나무에서 사용.
- **PSRAM** APIs: **`ENABLE_EXT_RAM`**1**는 해결된 Kconfig/에서`app_default.config`경로 및 보드는 실제로 PSRAM을 노출해야합니다 ( ** ESP32-S3 ** SPIRAM 모듈).

## 내부 heap (`tal_malloc`가족)
```c
void *tal_malloc(size_t size);
void  tal_free(void *ptr);
void *tal_calloc(size_t nitems, size_t size);
void *tal_realloc(void *ptr, size_t size);
int   tal_system_get_free_heap_size(void);
```

이용하기`tal_malloc` / `tal_free`** 일반 객체, 작은 큐 및 ** 빠른 내부 RAM ** (DMA 제약, Wi-Fi / Bluetooth 낮은 층 및 스택은 포트에 의해 정의 된 칩에 남아).

`tal_system_get_free_heap_size()`** 내부 ** 전형적인 RTOS 포트에 무료 헬리콥터 (see)[TAL 시스템 API](../tutorials/tal-system-api)).

## PSRAM 헬리콥터 (`tal_psram_*`, `ENABLE_EXT_RAM`)
기타`ENABLE_EXT_RAM`** 1 **, 이 API를 사용할 수 있습니다 (보기`TuyaOpen/src/tal_system/include/tal_memory.h`):

```c
void *tal_psram_malloc(size_t size);
void  tal_psram_free(void *ptr);
void *tal_psram_calloc(size_t nitems, size_t size);
void *tal_psram_realloc(void *ptr, size_t size);
```

**ESP32**,`tal_psram_malloc`지도에서 **`heap_caps_malloc(..., MALLOC_CAP_SPIRAM)`** 어댑터에서 - 큰 TLS 세션 구조, 오디오 링 및 AI 파이프라인은 종종 활성화 될 때이 경로를 사용합니다.

동일한 헤더는 편의 매크로를 정의합니다. **`Malloc` / `Calloc` / `Free`** 그것은 **`tal_psram_*`** 언제`ENABLE_EXT_RAM`1, 그리고 **`tal_malloc`** / **`tal_calloc`** / **`tal_free`** 그렇지 않으면. SDK의 제 3자 코드 (예: TLS 및 일부 AI 서비스) **`ENABLE_EXT_RAM`** 명시적으로; 새로운 큰 할당에 대한 동일한 패턴을 따르십시오.

:::note
`tal_psram_get_free_heap_size()`(항구에 대한 문서화) 내부 헬프 쿼리를 보완 — see[TAL 시스템 API](../tutorials/tal-system-api).
:::

## PSRAM 대 선택
|Prefer 내부`tal_malloc` |공지사항`tal_psram_*`현재 위치|
|------------------------------|-------------------------------------|
|작은, 빈번한 할당|대형, 긴 수명 버퍼 (오디오, 이미지, 모델 스크래치)|
|단단한 latency를 가진 부호 경로|SPIRAM 대기 시간이 허용되는 대량 데이터|
|내부 RAM에서 **DMA 드라이버 ** 만|TLS / AI 버퍼는 이미 SDK 예제에서 마이그레이션|

항상 **DMA 기능** for your chip: 모든 주변 장치가 PSRAM에서 DMA 할 수 없습니다.

## 전시와 멀티미디어
디스플레이 스택은 구성에 따라 **SRAM 또는 PSRAM**에서 프레임 버퍼를 요청할 수 있습니다. 이름 *[제품정보](../display)제품정보`tal_display_framebuffer_create`그리고 기억 유형 모수.

## 현재 위치
예약 가능`tal_malloc`** 대 **`tal_psram_malloc`** 일관적으로 **`ENABLE_EXT_RAM`**, 그리고 당신은 PSRAM 없이 널 사이 이동할 때 Kconfig를 조정하는 것을 알고 있습니다.

## 이름 *
- [메모리 및 저장 개요](overview)
- [TAL 시스템 API](../tutorials/tal-system-api)
- [플래시, 파티션 및 용량](flash-and-partitions)(출시; 힙에서 분리)
- 근원:`TuyaOpen/src/tal_system/include/tal_memory.h`
