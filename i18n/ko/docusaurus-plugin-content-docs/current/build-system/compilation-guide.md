---
title: 컴파일 가이드
description: "환경 확인, 구성 데이터, 플랫폼 다운로드, CMake 구성, Ninja 빌드 및 출력 검증으로 이어지는 tos.py 빌드 파이프라인을 설명합니다."
keywords:
  - 컴파일 가이드
  - tos.py build
  - CMake
  - Ninja
  - 빌드 파이프라인
---

## 개요
이 가이드는 프로젝트를 구성한 후 실행되는 **`tos.py build`** 파이프라인을 설명합니다. `TuyaOpen/tools/cli_command/`의 Python 코드가 CMake/Ninja를 구동하는 방식과 산출물 위치를 `cli_build.py`의 구현 순서에 맞춰 설명합니다.

구성(`choice`, `menu`, `app_default.config`)을 변경하려면 [Kconfig 및 프로젝트 구성](../peripheral/tutorials/kconfig-and-project-configuration)을, SDK CMake 그래프와 Kconfig의 연결(`libtuyaos.a`, 컴포넌트, 앱 대상)은 [CMake, Kconfig 및 컴포넌트 모델](cmake-kconfig-and-components)을 참고하세요.

## 빌드 파이프라인(상위 수준)
```
tos.py build
    │
    ├── 환경 확인(서브모듈)
    ├── 구성 데이터(.build/cache/using.config)
    ├── 플랫폼 다운로드(platform_config.yaml에서 가져옴)
    ├── 플랫폼 훅(prepare / build_setup 스크립트)
    ├── CMake 구성(Ninja 생성기, 프로젝트 .build/)
    ├── Ninja 빌드(예: ninja example)
    └── 출력 검증(.build/bin/의 bin)
```

## 1. 구성 단계(`cli_config.py`)
**`tos.py config choice`**, **`tos.py config menu`** 또는 해당 명령을 실행하면 `TuyaOpen/tools/cli_command/cli_config.py`의 흐름이 다음 작업을 수행합니다.

1. 프로젝트에 **`app_default.config`**를 기록합니다(프리셋 교체 또는 메뉴 저장).
2. 프로젝트, **`TuyaOpen/src`**, **`TuyaOpen/boards`**의 Kconfig를 병합하고 **`<project>/.build/cache/`**에 생성 파일을 기록합니다. 여기에는 Kconfig 입력 목록과 빌드에 사용되는 확인된 **`using.config`**가 포함됩니다.

사용자 관점의 절차와 복구 방법은 [Kconfig 및 프로젝트 구성](../peripheral/tutorials/kconfig-and-project-configuration)을 참고하세요.

## 2. 빌드 단계(`cli_build.py`)
구현 참고: **`TuyaOpen/tools/cli_command/cli_build.py`**. 아래 순서는 일반적인 실행 순서이며 릴리스에 따라 이름이 조금 달라질 수 있습니다.

### 2.1 환경 확인
SDK 서브모듈이 있는지 확인합니다.

```bash
git submodule update --init
```

### 2.2 구성 초기화
**`<project>/.build/cache/using.config`**가 현재 Kconfig 해석 결과를 반영하는지 확인합니다. 이후 단계에서 사용하는 주요 심볼은 다음과 같습니다.

- `CONFIG_PROJECT_NAME` — 프로젝트 이름
- `CONFIG_PLATFORM_CHOICE` — 플랫폼
- `CONFIG_CHIP_CHOICE` — 칩
- `CONFIG_BOARD_CHOICE` — 보드
- `CONFIG_FRAMEWORK_CHOICE` — 프레임워크

### 2.3 플랫폼 다운로드
**`TuyaOpen/platform/platform_config.yaml`** 및 git 메타데이터를 사용하여 선택한 플랫폼 저장소를 고정된 리비전으로 `TuyaOpen/platform/<platform_name>/`에 복제하거나 업데이트합니다.

```bash
git clone <repository_url> <tuyaopen_root>/platform/<platform_name>
cd <tuyaopen_root>/platform/<platform_name>
git checkout <commit_hash>
```

### 2.4 플랫폼 훅(`platform_prepare` / `build_setup`)
플랫폼 트리에 있으면 `platform_prepare.py` 및/또는 `build_setup.py`가 실행되어 툴체인과 추가 구성을 준비합니다.

```bash
python <tuyaopen_root>/platform/<platform_name>/platform_prepare.py $CHIP
python <tuyaopen_root>/platform/<platform_name>/build_setup.py $PROJ_NAME $PLATFORM $FRAMEWORK $CHIP
```

### 2.5 CMake 및 Ninja
CMake는 Ninja를 생성기로 사용하여 **`<project>/.build/`**에서 구성됩니다.

```bash
mkdir -p <project_root>/.build
cd <project_root>/.build
cmake -G Ninja $CMAKE_VERBOSE $OPEN_SDK_ROOT \
  -DTOS_PROJECT_NAME=$PROJ \
  -DTOS_PROJECT_ROOT=$PROJECT_ROOT \
  -DTOS_PROJECT_PLATFORM=$PROJECT_PLATFORM \
  -DTOS_FRAMEWORK=$PROJECT_FRAMEWORK \
  -DTOS_PROJECT_CHIP=$PROJECT_CHIP \
  -DTOS_PROJECT_BOARD=$PROJECT_BOARD
ninja example
```

CMake 구조는 [CMake, Kconfig 및 컴포넌트 모델](cmake-kconfig-and-components)을 참고하세요.

### 2.6 출력 검증
빌드는 **`.build/bin/`**에 예상 바이너리가 있는지 확인합니다(`cli_build.py`의 `check_bin_file`).

## 프로젝트 및 SDK 구조
```
TuyaOpen/                          # CMake의 SDK 루트(OPEN_SDK_ROOT)
├── tos.py
├── tools/cli_command/             # cli_build.py, cli_config.py, …
├── platform/                      # 다운로드된 플랫폼 트리
├── src/                           # SDK 컴포넌트(모듈별 CMake)
├── boards/                        # 보드 BSP
└── …

<project>/                         # 앱 또는 예제(tos.py 실행 위치)
├── CMakeLists.txt
├── app_default.config
├── Kconfig
└── .build/
    ├── bin/                       # 펌웨어 출력
    ├── lib/
    ├── cache/                     # 생성된 Kconfig/구성 캐시
    └── build/build_param          # 빌드 메타데이터(생성되는 경우)
```

## 컴파일 출력
빌드가 성공하면 다음 항목을 확인할 수 있습니다.

- **바이너리:** `.build/bin/{app_name}_QIO_{version}.bin`(플랫폼에 따라 패턴이 다를 수 있음)
- **라이브러리:** `.build/lib/`
- **파라미터:** `.build/build/build_param`(생성되는 경우)

```
====================[ BUILD SUCCESS ]===================
 Target    : example_QIO_1.0.0.bin
 Output    : /path/to/project/.build/bin
 Platform  : T2
 Chip      : T2-U
 Board     : t2_evb
 Framework : base
========================================================
```

## 요약
- **구성**: `tos.py config` → [Kconfig 및 프로젝트 구성](../peripheral/tutorials/kconfig-and-project-configuration)
- **빌드**: `tos.py build` → 환경, 플랫폼, CMake/Ninja 및 검증
- **CMake 구조**: [CMake, Kconfig 및 컴포넌트 모델](cmake-kconfig-and-components)
