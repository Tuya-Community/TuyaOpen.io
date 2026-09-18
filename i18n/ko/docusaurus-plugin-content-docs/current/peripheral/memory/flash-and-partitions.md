---
title: 플래시, 파티션 및 용량
description: "TuyaOpen MCU 대상의 플래시 및 파티션 : 펌웨어, OTA, 권한 부여 및 KV / LittleFS는 tkl flash * 및 Kconfig를 통해 외부 NOR 플래시를 공유합니다."
keywords:
  - flash
  - partitions
  - ota
  - tkl_flash
  - tuyaopen peripheral
---

## 제품정보
**MCU** 대상, 펌웨어, **OTA**, **authorization**, **application persistence** (KV, LittleFS, 또는 공급업체 FS) 공유 **external Flash** (일반적으로 NOR). **TKL**를 통해 지우기/쓰기/읽기 **`tkl_flash_*`**. ** Flash size** 및 **partition boundaries**는 Board- 및 product-specific: 그들은 **Kconfig**, **partition table**, 그리고 **board BSP**, 애플리케이션 코드의 단일 글로벌 상수도에서 나온다.

**오디오:** 개발자 구성 **, **OTA**, 또는 **KV**, BSP 저자는 새로운 ** 플래시 사이즈**를 적용했습니다.

## 자주 묻는 질문
- [메모리 및 저장 개요](overview)
- [Kconfig 및 프로젝트 구성](../tutorials/kconfig-and-project-configuration)제품정보`tos.py config menu`toggling 플래시 관련 옵션.

## 제품 정보
- 호텔 **`tkl_flash_*`** 상쇄는 **partition 계획 ** 당신의 널을 위해; 잘못된 범위 벽돌 OTA 또는 손상 KV.

## TKL 플래시 API (기본 레이어)
Read/write/erase 및 metadata는 아래에 문서화됩니다.[TKL 플래시](../../tkl-api/tkl_flash)**:

- `tkl_flash_read` / `tkl_flash_write` / `tkl_flash_erase`
- `tkl_flash_get_one_type_info`- **에 대한 쿼리 레이아웃`TUYA_FLASH_TYPE_E`** 입력 **`TUYA_FLASH_BASE_INFO_T`**

드라이버 및 저수준 마이그레이션에서 이러한 사용; application **key–value** persistence is usually easy through **[사이트맵](../tutorials/tal-kv-guide)** (일반 포트의 후드 아래 LittleFS).

## 비밀번호`ENABLE_FLASH`
**porting** 새 보드를 사용하면 TuyaOpen (authorization, Pairing data, filesystem)에 대한 ** 전용 플래시 지역**을 예약해야합니다. 이름 *[Porting 플랫폼](../../hardware/porting/porting-platform):

- **`ENABLE_FLASH`** — 활성화되어야 합니다; 주요 펌웨어 이미지와 존경을 덮지 않는 사용되지 않는 범위를 선택 **.
- **`ENABLE_FILE_SYSTEM`** — 비활성화되면 TuyaOpen은 내부 ** LittleFS**를 사용할 수 있습니다.`tkl_flash.c`** 적응.

## 플래시 크기 변경 (다른 부품 / BOM)
1. ** 하드웨어 : ** 새로운 SPI NOR 밀도 (예 : 4 MB → 8 MB) - 업데이트 ** 통계 **, ** 핀 스트랩 ** 어떤 경우, ** 데이터 시트 ** 제한.
2. **소프트웨어:** 파티션 테이블과 **Kconfig ** ** ** ** ** 트리 아래`TuyaOpen/boards/<platform>/<board>/`(및 **CSV** 또는 **IDF**-style 배치 포트 사용).
3. ** 어댑터:** 구현 또는 확장 **`tkl_flash_get_one_type_info`** 이렇게 보고 **베이스 + 크기** 새로운 레이아웃 일치; 재 실행 **`tos.py config choice`** / **`menu`** preset configs embed 크기가 있다면.
4. **Validation: ** OTA 슬롯 크기, ** KV ** 파티션 및 ** 공장 ** 데이터는 여전히 적합해야합니다. OTA 및 KV 테스트를 dev 단위로 실행하십시오.

애플리케이션 코드의 절대 end-of-flash 주소를 하드 코드하지 마십시오; ** TKL** 정보 또는 고급 TAL API에서 파생.

## OTA 및`tkl_ota`
펌웨어 업그레이드는 **TKL OTA** 표면을 사용합니다.`tkl_ota`사이드바에서). OTA 이미지는 해당 제품에 정의된 **OTA 파티션**에 적합해야 합니다. 이름 *[TKL 소개](../../tkl-api/tkl_ota)플랫폼의 OTA 문서.

## Linux 및 블록 스토리지
**Linux** 대상에서 TKL 레벨에서 “flash”는 다음과 같이 구현될 수 있습니다.

- A ** 파일 시스템의 ** (eMMC, SD, NVMe), 또는
- A ** mtd ** 같은 read/write/erase 계약에 맵핑된 블록 장치.

애플리케이션 코드는 여전히 MCU 빌드와 코드를 공유 할 때 ** TAL / TKL **를 통해 이동해야합니다. POSIX 파일 I / O는 ** 보드 가이드 ** 문서 만 유효합니다. **DDR**는 실행 이미지와 힙을 보유하고 있습니다. **eMMC**는 통해 액세스되지 않습니다.`tkl_flash_write`맵핑을 정의하는 어댑터없이 바이트 바이트 바이트.

## 현재 위치
**API 레이어 ** (TKL 원시 플래시 vs TAL KV), **Kconfig / 파티션 ** ** 크기** 변경을 변경할 수 있는 artifact, and when to read **layout** from **`tkl_flash_get_one_type_info`** 마술 숫자 대신.

## 이름 *
- [메모리 및 저장 개요](overview)
- [TKL 플래시](../../tkl-api/tkl_flash)
- [TKL 소개](../../tkl-api/tkl_ota)
- [TAL KV 가이드](../tutorials/tal-kv-guide)
- [Porting 플랫폼](../../hardware/porting/porting-platform)
- [Heap 할당 및 PSRAM](heap-allocation-and-psram)
