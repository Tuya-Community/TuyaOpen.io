---
title: CMake, Kconfig 및 컴포넌트 모델
description: "TuyaOpen의 CMake 및 Ninja 빌드와 Kconfig 계층이 SDK 루트, 프로젝트 CMakeLists, 라이브러리, 보드 BSP 및 컴포넌트 모델을 연결하는 방식을 설명합니다."
keywords:
  - CMake
  - Kconfig
  - 컴포넌트 모델
  - 빌드 시스템
  - Ninja
---

## 개요
TuyaOpen은 실제 컴파일에 **CMake**와 **Ninja**를 사용하고, **Kconfig**(`tos.py config`)로 빌드할 항목을 결정합니다. 이 페이지에서는 라이브러리의 위치, SDK 루트와 프로젝트 `CMakeLists.txt`의 관계, 보드 또는 컴포넌트를 확장할 때 확인할 위치를 설명합니다.

**대상 독자:** 보드를 포팅하거나 컴포넌트를 추가하거나 링크 오류를 디버깅하는 개발자

## 사전 요구 사항
- [컴파일 가이드](compilation-guide) — 환경 확인 → 플랫폼 → CMake/Ninja → 출력 순서로 진행되는 **`tos.py build`** 파이프라인
- [Kconfig 및 프로젝트 구성](../peripheral/tutorials/kconfig-and-project-configuration) — `app_default.config`, `tos.py config choice` / `menu`, `.build/cache/`의 생성 캐시

## 요구 사항
- CMake 개념(`add_subdirectory`, `target_link_libraries`, 정적 라이브러리)에 대한 이해
- 경로 확인에 사용할 로컬 [TuyaOpen](https://github.com/tuya/TuyaOpen) 트리(`TuyaOpen/`은 SDK 루트, `<project>/`는 앱 또는 예제 디렉터리)

## 구성에서 CMake까지의 흐름
1. 프로젝트의 **`app_default.config`**가 Kconfig 선택 사항을 기록합니다.
2. **`tos.py config`** / **`tos.py build`**가 해당 선택 사항을 `TuyaOpen/src`, `TuyaOpen/boards` 및 프로젝트의 `Kconfig` 트리와 병합하여 **`<project>/.build/cache/`**에 데이터를 생성합니다.
3. CMake가 프로젝트 이름, 플랫폼, 보드 및 칩 변수를 받아 올바른 툴체인, 보드 BSP 및 컴포넌트를 선택합니다.
4. Kconfig 출력이 CMake 계층에서 사용되어 `CONFIG_*` 옵션이 컴파일된 소스 및 정의와 일치하도록 합니다.

이 페이지는 구조와 책임에 집중합니다. 빌드 단계와 스크립트 진입점은 [컴파일 가이드](compilation-guide)를 참고하세요.

## SDK 최상위 CMake 구조
SDK 루트의 **`TuyaOpen/CMakeLists.txt`**가 다음을 조정합니다.

- `TuyaOpen/platform/<platform>/`의 툴체인 및 플랫폼 CMake 조각
- `TuyaOpen/src/<component>/`의 **컴포넌트**(일반적으로 각 컴포넌트에 `CMakeLists.txt`가 있음)
- `TuyaOpen/boards/<platform>/<board>/`의 **보드 지원**
- 프로젝트의 **`CMakeLists.txt`**: 앱 정적 라이브러리를 빌드하고 통합 SDK 라이브러리에 링크

요약하면 `src/` 컴포넌트를 순회하고 필요하면 `boards/<platform>/<board>/`를 추가한 뒤 `libtuyaos.a`를 생성합니다. 이후 `include(${TOS_PROJECT_ROOT}/CMakeLists.txt)`로 프로젝트를 포함하고 대상 `tuyaapp`을 해당 라이브러리에 연결합니다.

## 링크되는 항목
| 산출물 | 일반적인 역할 |
|----------|----------------|
| **`libtuyaos.a`** | `src/`의 활성화된 SDK 컴포넌트와 설정된 보드 연결 코드로 생성되는 정적 라이브러리 |
| **`libtuyaapp.a`** (대상 `tuyaapp`) | 프로젝트 `CMakeLists.txt`에 지정한 애플리케이션 소스 |
| **플랫폼 스크립트** | CMake/Ninja 후 플랫폼별 패키징 또는 플래시 레이아웃을 수행하는 `platform/<platform>/build_example.py` |

정확한 대상 이름과 플래그는 플랫폼에 따라 조금 다를 수 있습니다. 해당 플랫폼의 CMake와 [컴파일 가이드](compilation-guide)를 기준으로 판단하세요.

## 프로젝트 디렉터리와 SDK 루트
| 위치 | 역할 |
|------|------|
| **`TuyaOpen/`** | SDK: `src/`, `boards/`, `platform/`, 루트 `CMakeLists.txt`, `tos.py` |
| **`<project>/`** (예: `apps/...` 또는 `examples/...`) | 앱: `CMakeLists.txt`, `app_default.config`, `Kconfig`, 선택적 `config/*.config`, 빌드 출력 `.build/` |

일반적인 앱 빌드에서 `tos.py`는 `TuyaOpen/` 단독이 아니라 항상 **`<project>/`**에서 실행합니다.

## Ninja 및 `.build`
CMake는 Ninja를 생성기로 사용합니다. 빌드 트리는 **`<project>/.build/`**에 있으며 바이너리는 `.build/bin/`, 라이브러리는 `.build/lib/`, 캐시는 `.build/cache/`에 있습니다. `.build/`를 커밋하지 마세요.

## 시스템 확장
- **새 SDK 컴포넌트** — `TuyaOpen/src/<name>/`에 `CMakeLists.txt`와 Kconfig 연결을 추가하고 기존 작은 컴포넌트를 템플릿으로 사용합니다.
- **새 보드 또는 사용자 지정 보드** — `TuyaOpen/boards/<platform>/<board>/`에 CMake와 Kconfig를 포함한 BSP를 추가합니다. [새 보드](../hardware/porting/new-board)와 [컴파일 가이드](compilation-guide)를 참고하세요.
- **앱만 변경** — 일반적으로 앱 트리의 프로젝트 `CMakeLists.txt`, `app_default.config` 또는 Kconfig만 수정합니다. `.build/cache/`의 생성 파일은 수정하지 마세요.

## 기대 결과
**Kconfig 심볼** → **포함된 소스** → **CMake 대상** → **최종 펌웨어**의 경로를 추적하고 각 계층을 변경해야 할 트리(`src`, `boards` 또는 프로젝트)를 판단할 수 있습니다.

## 참고
- [컴파일 가이드](compilation-guide)
- [Kconfig 및 프로젝트 구성](../peripheral/tutorials/kconfig-and-project-configuration)
- [새 플랫폼](../hardware/porting/new-platform), [새 보드](../hardware/porting/new-board)
- [tos.py 도구 가이드](../tos-tools/tos-guide)
