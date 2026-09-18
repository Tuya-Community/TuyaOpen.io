---
title: tos.py idf 명령 레퍼런스
description: "TuyaOpen에서 ESP32 플랫폼 트리의 Espressif idf.py로 인자를 전달하는 tos.py idf를 설명합니다."
keywords:
  - tos.py idf
  - ESP32
  - ESP-IDF
  - idf.py
  - TuyaOpen
---

## 개요
`tos.py idf`는 ESP32 플랫폼 트리 안의 Espressif `idf.py`로 인자를 전달합니다. TuyaOpen 애플리케이션 디렉터리를 유지하면서 menuconfig, fullclean, set-target 및 doctor와 같은 ESP-IDF 워크플로를 사용할 때 이용합니다.

**대상 독자:** TuyaOpen으로 ESP32 대상을 빌드하는 개발자

**요구 사항:** 프로젝트가 **ESP32**로 구성되어야 합니다(`app_default.config`의 `CONFIG_PLATFORM_CHOICE=ESP32`). 먼저 `tos.py config choice` 또는 `tos.py config menu`를 실행하세요.

## 동작
1. `.build/cache/using.config`를 읽고 `CONFIG_PLATFORM_CHOICE`가 ESP32인지 확인합니다.
2. `TuyaOpen/platform/ESP32/` 아래의 ESP32 플랫폼 디렉터리를 찾습니다.
3. `idf.py`, `--idf-flags`, 하위 명령 및 인자로 명령을 구성합니다.
4. ESP-IDF 프로젝트가 있는 `platform/ESP32/tuya_open_sdk/`에서 명령을 실행합니다.

이는 **passthrough**이므로 설치된 ESP-IDF가 지원하는 유효한 `idf.py` 하위 명령과 옵션을 사용할 수 있습니다.

## 문법
```bash
tos.py idf [OPTIONS] IDF_SUBCOMMAND [ARGS...]
```

| 옵션 | 설명 |
|--------|-------------|
| `--idf-flags TEXT` | `idf.py`와 하위 명령 사이에 삽입되는 추가 토큰(따옴표로 묶은 셸 분리 문자열) |

## 예제
```bash
tos.py idf menuconfig
tos.py idf fullclean
tos.py idf --idf-flags="-v" build
tos.py idf flash
```

## 일반적인 오류
- **프로젝트가 구성되지 않음** — 애플리케이션 디렉터리에서 `tos.py config choice` 또는 `tos.py config menu`를 실행합니다.
- **ESP32가 아님** — 다른 플랫폼에서는 `idf`가 거부됩니다. 구성을 변경하거나 일반 `tos.py build` 흐름을 사용하세요.
- **Import 또는 경로 오류** — ESP32 플랫폼 서브모듈과 툴체인이 설치되었는지 `tos.py check`, `tos.py update`로 확인합니다.

## 참고
- [ESP32 빠른 시작](../hardware/espressif/esp32-quick-start)
- [ESP32 개요](../hardware/espressif/overview-esp32)
- [tos.py 가이드](tos-guide)
