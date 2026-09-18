---
title: TAL KV 저장 가이드
description: "TuyaOpen의 TAL KV 스토리지 가이드 : tal kv.h는 LittleFS가 JSON을 직렬화하는 데 도움이되는 지속적인 키 가치 저장을 제공합니다."
keywords:
  - tal kv
  - tal_kv.h
  - key-value storage
  - littlefs
  - tuyaopen api
---

## 제품정보
모델 번호: TAL KV`tal_kv.h`)는 TuyaOpen 신청을 위한 지속적인 열쇠 가치 저장을 제공합니다. 값은 opaque 바이트입니다. helper API는 JSON에 구조화된 필드를 직렬화할 수 있습니다. 구현은 LittleFS (으)로 백업됩니다.`lfs.h`); `tal_lfs_get()`고급 사용을위한 파일 시스템 핸들을 노출합니다.

**오디오:** 응용 프로그램 개발자는 재부팅을 통해 구성, 교정 또는 작은 blobs를 저장합니다.

## 자주 묻는 질문
- 한국어[환경 설정](../../quick-start/enviroment-setup)TuyaOpen 프로젝트
- 플래시 마모가 발생할 때의 이해 (고주파가 동일한 키에 쓰기).

## 제품 정보
- TAL KV는 플랫폼 및 제품(클라우드 또는 로컬 스토리지에 대한 Kconfig / SDK 디폴트를 통해 전적으로)을 지원합니다.
- 파티션과 LittleFS 구성에 의해 임의 제한 내에서 키와 값 크기.

## API 요약
|제품정보|제품정보|
|----------|---------|
| `tal_kv_init(tal_kv_cfg_t *kv_cfg)` |초기화 KV (seed/key strings in`tal_kv_cfg_t`). |
| `tal_kv_set(const char *key, const uint8_t *value, size_t length)` |원시 바이트를 쓰기`key`. |
| `tal_kv_get(const char *key, uint8_t **value, size_t *length)` |원시 바이트를 읽으십시오; 외침은 자유로워야 합니다`tal_kv_free`. |
| `tal_kv_free(uint8_t *value)` |무료 버퍼 반환 by`tal_kv_get`. |
| `tal_kv_del(const char *key)` |키 삭제.|
| `tal_kv_serialize_set(const char *key, kv_db_t *db, size_t dbcnt)` |Typed 필드의 테이블을 직렬화하고 아래에 저장`key`. |
| `tal_kv_serialize_get(const char *key, kv_db_t *db, size_t dbcnt)` |연락처`kv_db_t`이름 *|
| `tal_kv_cmd(int argc, char *argv[])` |내부 / 디버그 명령 후크.|
| `tal_lfs_get(void)` |이름 *`lfs_t *`직접 LittleFS 액세스.|

Typed serialization 사용`kv_db_t`으로 행`kv_tp_t`: `KV_CHAR`, `KV_BYTE`, `KV_SHORT`, `KV_USHORT`, `KV_INT`, `KV_BOOL`, `KV_STRING`, `KV_RAW`.

## 단계 (raw KV)
1. 시스템 시작 후, 호출`tal_kv_init()`너와 함께`tal_kv_cfg_t`(씨/키 사용법을 위한 제품 또는 널 보기).
2. 데이터 저장:`tal_kv_set("my_key", data, len)`.
3. 읽기 위하여: 어떤 upfront를 할당하십시오;`tal_kv_get`세트`*value`이름 *`*length`; 다음`tal_kv_free(*value)`.
4. 제거하기:`tal_kv_del("my_key")`.

**확장된 결과:** 재부팅을 통해 키 persist는 지우거나 과잉을 할 수 있습니다.

## 플랫폼 노트
- Exact 플래시 파티션 및 마운트 경로는 플랫폼 BSP 및 SDK에서 제공됩니다. OTA 및 공장 초기 정책으로 중요한 데이터에 대한 KV에 의존합니다.
- 큰 blobs 또는 파일에 대 한, 전용 파일 API 또는 다른 파티션 소송 보다 더 나은 많은 작은 KV 쓰기.

## 이름 *
- 근원:`TuyaOpen/src/tal_kv/include/tal_kv.h`
- [TAL 시스템 API 참조](tal-system-api)
- [빠른 시작](../../quick-start/index)
