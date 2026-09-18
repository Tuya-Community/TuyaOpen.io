---
title: Kconfig 및 프로젝트 구성
description: "TuyaOpen의 Kconfig 및 프로젝트 구성 : tos.py config 명령 및 app default를 사용합니다. 메뉴를 통해 board preset 및 toggle 기능을 선택합니다."
keywords:
  - kconfig
  - project configuration
  - tos.py
  - app_default.config
  - tuyaopen
---

## 제품정보
TuyaOpen 프로젝트는 **Kconfig** (menu-driven options)과 작은 저장 파일로 구성되어 있습니다. **`app_default.config`**, 각 응용 프로그램 또는 예제 디렉토리. 더 보기`tos.py config`명령은 두 가지를 연결 : 당신은 보드를 미리 설정, 선택적으로 그래픽 메뉴를 열고, 결과는 다시 작성됩니다`app_default.config`.

이 페이지에는 두 개의 부분이 있습니다.

1. **모든 사용 ** — 보드를 선택하기에 충분, toggle 일반 기능, 실수에서 복구.
2. **Deeper dive** - Kconfig 파일이 어떻게 함께 유선되고 구성이 컴파일러에 도달하는 방법 (BSP, 드라이버 또는 빌드 작업).

**오디오:** 응용 프로그램 개발자 (첫 번째 섹션) 및 BSP / 드라이버 개발자 (deeper section).

## 자주 묻는 질문
- 한국어[환경 설정](../../quick-start/enviroment-setup)실행할 수 있습니다.`tos.py`프로젝트 폴더에서 (see)[tos.py 도구 가이드](../../tos-tools/tos-guide)).
- 의 클론[카테고리](https://github.com/tuya/TuyaOpen)작업 흐름 옆에 나무 (아래 사용 경로)`TuyaOpen/`SDK 루트로)

## 제품 정보
- Shell in the **프로젝트 디렉토리 ** (예를 들어`TuyaOpen/apps/tuya_cloud/switch_demo`또는`TuyaOpen/examples/peripherals/gpio`).

## 매일 사용
### 이름 *`app_default.config`이름 *
각 앱 또는 예는 ** 유지`app_default.config`** 프로젝트 루트에 파일. **non-default** Kconfig 선택(최소 디퓨트)만 저장합니다. SDK 아래 Kconfig 나무와 함께 플랫폼, 보드, 활성화 구성 요소 및 많은 기능 토글을 정의합니다.

구조적인 개요를 위해, 보기[TuyaOpen 디렉토리 walkthrough — `app default.config`](../../project-walkthrough#app_defaultconfig).

### 단계 1: 널 또는 미리 설치를 선택하십시오 (`tos.py config choice`)
**project** 디렉토리에서:

```bash
tos.py config choice
```

**preset**의 번호 목록이 있습니다.`.config`파일. 1개의 ** 장소 선택**`app_default.config`그것으로 preset. 미리 설정은:

1. ·`config/`프로젝트 ** (이 경우), 또는
2. 그렇지 않으면, 밑에 널 뭉치`TuyaOpen/boards/`(예를 들면 예시)`examples/`).

** 만 ** 목록 보드 사전 설정`boards/`(참조)`config/`폴더), 사용:

```bash
tos.py config -d choice
```

:::note
`choice`이름 *`menu`도구 체인 또는 플랫폼이 변경 될 수 있기 때문에 ** deep clean**를 먼저 실행하십시오.
:::

### 단계 2: 선택권을 조정하십시오 (`tos.py config menu`)
**menuconfig** UI를 열고 대화식 옵션 변경하기:

```bash
tos.py config menu
```

수행 할 때 메뉴에서 저장 및 출구; 도구 업데이트 **`app_default.config`** 기준. 자습서가 드라이버, LVGL, Bluetooth 역할 및 유사한 옵션을 활성화하도록 요청할 때 이것을 사용하십시오.

스크린 샷 및 명령 도움 :[tos.py - 구성](../../tos-tools/tos-guide#config).

### 단계 3 (선택 사항): 자신의 미리 설정 저장 (`tos.py config save`)
작업 후`app_default.config`(사용 후의`menu`), 당신은 프로젝트의 밑에 지명된 미리 설치로 그것을 스냅할 수 있습니다`config/`디렉토리:

```bash
tos.py config save
```

표시된 이름 입력 그 파일은 나중에 선택될 수 있습니다`tos.py config choice`. 이것은 팀을 위해 유용합니다 또는 debug 대 방출 단면도를 지키기를 위해.

### 구성이 빌드를 깰 경우
- 공유하기`tos.py config choice`** 다시 확인하고 알려진 좋은 미리 설정.
- 관련 상품`app_default.config`버전 제어에서 작업 버전을 투입하면.
- 메뉴가 호환되는 조합으로 끌어 들인 경우 지원 채널에 문의하십시오. 경고를 참조하십시오.[tos.py 설정 메뉴](../../tos-tools/tos-guide#config-menu).

## Deeper dive ( 개발자용)
### Kconfig 정의가 사는 곳
구성 옵션은 SDK와 프로젝트 전반에 걸쳐 확산됩니다:

- **프로젝트 ** —`Kconfig`app/example root에서 (app-specific options).
- **SDK ** —`TuyaOpen/src/Kconfig`구성 요소 (Wi-Fi, Bluetooth, 디스플레이 등)에 대한 하위 트리.
- ** 보드 ** —`TuyaOpen/boards/<platform>/...`공급 널과 칩 선택.

`tos.py config`이러한 카탈로그로 구성하여 선택의 해결`app_default.config`.

### 당신이 검사할 수 있는 생성됨
이름 *`config`또는`build`, 프로젝트 **`.build/cache/`** 디렉토리 (프로젝트의 밑에, SDK 루트가 아닌) 일반적으로 생성 된 구성 artifacts를 보유, 선택한 기호와 metadata의 병합 된보기를 포함하여 빌드 필요. 정확한 이름은 도구 버전에 따라 다를 수 있습니다. 이 디렉토리를 ** 생성 ** - 편집`app_default.config`또는 사용`menu`, 이 캐시 파일이 손으로.

Kconfig가 해결한 후, 빌드는 읽습니다 **`<project>/.build/cache/using.config`** 플랫폼 fetch 및 CMake와 계속; 참조[편집 가이드](../../build-system/compilation-guide). 방법 **`libtuyaos.a`**, **`tuyaapp`** 및 보드`CMakeLists.txt`자주 묻는 질문[CMake, Kconfig 및 구성 요소 모델](../../build-system/cmake-kconfig-and-components).

### `CONFIG_*`C 코드의 상징
Enabled 옵션은 preprocessor 매크로가 됩니다 (이름은 일반적으로 prefixed with`CONFIG_`) 컴파일 중 사용 된 생성 된 헤더를 통해 포함. 당신은`select`또는`depends on`Kconfig의 옵션은 소스를 제어하고 링크에 참여하는 것을 정의합니다.

### ESP32 및 IDF 메뉴 구성
ESP32 대상에서, ESP-IDF 구성을 통해 사용할 수 있습니다.`tos.py idf menuconfig`프로젝트가 이미 ESP32에 구성될 때. 이름 *[tos.py IDF 참조](../../tos-tools/tos-idf-reference).

## 현재 위치
이름 *`choice`또는`menu`, `app_default.config`당신의 널 및 특징을 반영하고,`tos.py build`다음 컴파일에 구성을 사용한다.

## 이름 *
- [tos.py 도구 가이드](../../tos-tools/tos-guide)(설정 선택, 메뉴, 저장)
- [TuyaOpen 디렉토리 walkthrough — `app default.config`](../../project-walkthrough#app_defaultconfig)
- [편집 가이드](../../build-system/compilation-guide) (`tos.py build`설정 후)
- [CMake, Kconfig 및 구성 요소 모델](../../build-system/cmake-kconfig-and-components)
- [제품정보](../display)(디스플레이 옵션의 Kconfig 구성 섹션 참조)
