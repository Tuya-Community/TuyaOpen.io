---
title: 메모리 및 저장 개요
description: "TuyaOpen의 메모리 및 저장 개요 : MCU SRAM, PSRAM 및 NOR 플래시 병합 Linux DDR 및 블록 스토리지, TAL 패턴 및 헬프 / 플래시 가이드."
keywords:
  - memory
  - storage
  - sram
  - psram
  - tuyaopen peripheral
---

## 제품정보
TuyaOpen는 ** MCU 클래스 보드에서 실행 ** (Tuya T-series, ESP32 및 유사) 및 ** Linux 클래스 대상**. 메모리 및 스토리지는 서로 다릅니다. MCU는 On-chip SRAM, 옵션 ** PSRAM** 및 ** 외부 NOR 플래시 **; Linux 대상은 일반적으로 **DDR** 및 ** 블록 스토리지 ** (eMMC, SD 카드, 또는 어댑터 뒤에 요약 된 동일한 TAL 패턴과 루트 파일 시스템)를 사용합니다.

이 단면도 그룹 3 가이드:

1. **[Heap 할당 및 PSRAM](heap-allocation-and-psram)** — `tal_malloc`, `tal_psram_*`, `ENABLE_EXT_RAM`, 그리고 내부 RAM 대 PSRAM을 사용할 때.
2. **[플래시, 파티션 및 용량](flash-and-partitions)** — **TKL**, 예약된 지역, KV/LittleFS를 통해 원시 플래시 및 ** 플래시 크기** 및 OTA에 대한 레이아웃 리레이트.
3. 이 페이지 —**concepts** and a **platform-centric map** 그래서 당신은 올바른 문서와 API를 선택할 수 있습니다.

**오디오:** T5 / ESP32 / Linux의 펌웨어 개발자는 버퍼, 파티션 또는 포트 스토리지를 튜닝하기 전에 정신 모델을 필요로합니다.

## 자주 묻는 질문
- [환경 설정](../../quick-start/enviroment-setup)건물 프로젝트.
- 스키엠[TAL 시스템 API 참조](../tutorials/tal-system-api)(리셋, 시간, **PSRAM** 도움자`ENABLE_EXT_RAM`사용 가능).

## 제품 정보
- 정의 **태그 칩 플랫폼 ** (T5AI-Core, ESP32-S3, Linux SBC 등). Exact RAM 및 플래시 크기는 ** 보드 ** 및 ** Kconfig**에서 혼자이 개요에서 아닙니다.

## 메모리 클래스 (embedded MCU)
|수업시간|TuyaOpen의 전형적인 역할|APIs / 구성|
|-------|---------------------------|---------------|
|** 내부 SRAM **|더미, 작은 DMA 완충기, 시간 크리티컬 자료| `tal_malloc` / `tal_free` / `tal_calloc` / `tal_realloc` (`tal_memory.h`) |
|**PSRAM** (현재)|큰 오디오, 도표, TLS의 AI 작동 완충기| `tal_psram_malloc`그리고 친구 때 **`ENABLE_EXT_RAM`** 설정; 참조[Heap 할당 및 PSRAM](heap-allocation-and-psram) |
|**외부 NOR 플래시 **|Firmware, OTA 이미지, **KV / LittleFS** 사용자 영역|**TKL **`tkl_flash_*`; persistence 본에[플래시, 파티션 및 용량](flash-and-partitions)이름 *[TAL KV 가이드](../tutorials/tal-kv-guide) |

**DDR** 및 **eMMC**는 MCU에서 TAL “malloc 대상”을 분리하지 않습니다. **Linux**에서는 일반 프로세스 메모리는 커널 할당기를 사용하지만 **flash-like** persistence는 보드의 TKL 레이어에서 구현된 파일 시스템 또는 블록 장치 요약을 통해 이동할 수 있습니다.

## 플랫폼 노트 (T5 / ESP32 / Linux)
### Tuya T-series (예 : RTOS에서 T5AI)
- ** 칩 RAM **, ** 옵션 외부 RAM ** (SoC 및 보드가 지원되는 경우), **SPI NOR** (또는 유사한) 코드 및 데이터.
- 파티션 테이블과 ** 플래시 크기 ** 보드 및 ** 구성 ** 별; 항상 아래 BSP와 정렬`TuyaOpen/boards/`그리고 제품의 ** 플래시 형상**.

### Espressif ESP32 (ESP32, ESP32-S3, ...)
- ** 내부 SRAM** 기본`tal_malloc`.
- **PSRAM** 모듈이 SPIRAM을 노출할 때 **`ENABLE_EXT_RAM=1`** 구성 - Wi-Fi 스택, 옵션 TLS, AI 및 대형 디스플레이 경로에 의해 크게 사용. 이름 *`tal_system.h` / `tal_memory.h`이름 *[Heap 할당 및 PSRAM](heap-allocation-and-psram).
- ** 플래시 ** 크기 및 파티션 레이아웃은 TuyaOpen의 빌드로 합병 된 ESP-IDF-style config에서 나옵니다. ** TKL 플래시 ** 및 응용 프로그램 ** KV**를 통해 여전히 표면 처리됩니다.

### 리눅스 (Raspberry Pi, DshanPi, ...)
- **Heap: ** 표준 OS 가상 메모리 (DDR); 사용`tal_malloc`휴대용 항목으로; 구현 맵을 수행`malloc`/`free`어댑터에서.
- **“Flash” semantics:** 종종 ext4의 ** 또는 단일 글로벌 물리적 인 플래시 오프셋보다 전용 파티션; TKL 맵 읽기 / 쓰기 / 도움말 개념을 공급 업체의 모델. Treat **partition CSVs** on MCUs as **not** 포트를 확인하지 않고 Linux의 리터럴.
- ** eMMC / SD : ** OS에 의해 블록 저장으로 처리; 응용 코드는 여전히 포트가 저장을 노출하는 TAL / TKL, 또는 그 보드에 문서화 될 때 일반 POSIX API를 사용합니다.

## 관련 디스플레이 및 미디어 버퍼
프레임 버퍼는 디스플레이 드라이버 옵션에 따라 **SRAM 또는 PSRAM**에서 할당 될 수 있습니다. 이름 *[제품정보](../display)(프레임 버퍼 및 메모리 타입 토론).

## 현재 위치
**메모리 클래스 ** 및 **퍼런스 레이어 **의 기능 사용 **, 올바른 가이드를 열고 (`heap…`대시보드`flash…`) 또는[사이트맵](../tutorials/tal-kv-guide) / [TKL 플래시](../../tkl-api/tkl_flash)다음 참조.

## 더 보기
- [Heap 할당 및 PSRAM](heap-allocation-and-psram)
- [플래시, 파티션 및 용량](flash-and-partitions)
- [TAL 시스템 API](../tutorials/tal-system-api)
- [TAL KV 가이드](../tutorials/tal-kv-guide)
- [TKL 플래시](../../tkl-api/tkl_flash)
- [Kconfig 및 프로젝트 구성](../tutorials/kconfig-and-project-configuration)
- [Porting 플랫폼](../../hardware/porting/porting-platform) (`ENABLE_FLASH`, 파일 시스템 노트)
