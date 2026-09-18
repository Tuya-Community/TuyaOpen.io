---
title: 플랫폼 만들기
description: "tos.py 새로운 플랫폼으로 새로운 TuyaOpen 하드웨어 대상 플랫폼 만들기, 이는 디렉토리 구조 및 어댑터 템플릿 파일을 생성합니다."
keywords:
  - tuyaopen
  - new platform
  - tos.py
  - porting
  - tkl
---

`tos.py new platform`새로운 하드웨어 플랫폼에 대한 포팅 템플릿을 만듭니다. 명령은 완전한 디렉토리 구조를 생성하고 TuyaOpen을 새로운 하드웨어에 적용하기 위해 필요한 기본 코드 파일.

이 명령은 TuyaOS를 하드웨어 칩 또는 보드에 포트하려는 개발자는 아직 공식적으로 지원되지 않습니다.

:::info
더 보기`new platform`명령은 매우 TuyaOS를 새로운 하드웨어로 포팅하는 작업을 감소시킵니다. 당신은 손으로 필요한 모든 파일과 디렉토리를 만들 수 없습니다. 명령을 실행하면 생성 된 템플릿 파일에 하드웨어 별 드라이버 코드를 구현하는 데 초점을 맞추고 있습니다 (`.c`이름 *`.h`).
:::

## 가동 원리
1. 지원하다`tos.py new platform`. 명령은 새 플랫폼의 이름을 알려줍니다. 예를 들어`my_new_chip`.

    ![새로운 플랫폼 이름을 입력하는 Prompt](/img/new-platform/new-platform-input.png)

2. Kconfig 설정 생성:

    - 명령은 최상위 레벨을 만듭니다.`Kconfig`프로젝트의 구성 시스템에 새로운 플랫폼을 통합하는 파일.
    - ·`menuconfig`상호 작용하는 공용영역은, 당신이 기본적인 특징 (WIFI와 같은 BLE, GPIO 및 I2C) 새로운 플랫폼 지원 선정하는 곳에, 엽니다. 당신의 선택은 저장됩니다`default.config`파일.

    ![menuconfig 기능 선택 인터페이스](/img/new-platform/new-platform-menu.png)

3. 플랫폼 디렉토리를 만듭니다. 명령은 입력 후 지정된 폴더를 생성합니다 (예를 들어`platform/my_new_chip`) 아래`platform/`이름 *

    ![플랫폼 디렉토리의 새로운 플랫폼 폴더](/img/new-platform/new-platform-filelist.png)

4. 어댑터 레이어 템플릿을 복사합니다. 선택에 따라 해당 Tuya Kernel Layer(TKL) 인터페이스 템플릿이 복사됩니다.`tools/porting/adapter`본문 바로가기`platform/my_new_chip/tuyaos/`.

예를 들어 WIFI 기능을 선택하면 WIFI 템플릿 파일`tkl_init_wifi.c`이름 *`tkl_init_wifi.h`뚱 베어

    ![Copied TKL 어댑터 템플릿 파일](/img/new-platform/new-platform-generate.png)

5. Board-level 구성을 만듭니다. 같은 이름을 가진 폴더 (예를 들면`boards/my_new_chip`)는 또한 아래에 창조됩니다`boards/`디렉토리와 해당`Kconfig`빌드 시스템에서 새로운 플랫폼을 추가하는 파일.

    ![보드 디렉토리의 새 보드 폴더](/img/new-platform/new-platform-filelist2.png)

6. 빌드를 검증합니다. 지원하다`tos.py new project`새로운 프로젝트를 만들려면, 선택`my_new_chip`플랫폼, 다음 실행`tos.py build`설계 및 검증

    ![새로운 플랫폼으로 새로운 프로젝트 만들기](/img/new-platform/new-platform-build.png)

    ![새로운 플랫폼의 성공적인 빌드](/img/new-platform/new-platform-build2.png)

## 다음 단계
플랫폼 템플릿을 만들기 후 다음을 완료하십시오.

1. 수정하기`platform/my_new_chip/platform_prepare.py`Toolchain 다운로드와 같은 플랫폼 초기화.
2. 수정하기`platform/my_new_chip/toolchain_file.cmake`빌드 도구와 빌드 옵션의 실제 경로를 구성합니다.
3. (선택 사항) 수정`platform/my_new_chip/platform_config.cmake`Application layer에 의해 사용되는 헤더 파일 경로를 구성합니다.
4. 실제 하드웨어 드라이버 코드를 입력`platform/my_new_chip/tuyaos/tuyaos_adapter/src`이름 *
5. 수정하기`platform/my_new_chip/build_example.py`빌드 및 링크 단계를 완료합니다.
6. (선택 사항) 수정`platform/platform_config.yaml`repository git 정보를 구성합니다.

### 플랫폼 초기화
수정하기`platform/my_new_chip/platform_prepare.py`Toolchain 다운로드와 같은 플랫폼 초기화.

이 스크립트는 빌드 과정에서 먼저 실행한다. 필요한 빌드 도구 다운로드를 완료하십시오. Toolchain 다운로드`platform/tools`이름 * 다운로드 논리를 직접 개발하거나 다른 공식 플랫폼을 참조 할 수 있습니다 (`T5AI`, `ESP32`).

다른 작업이 컴파일하기 전에 완료해야 하는 경우, 이 스크립트에서 구현합니다.

![platform prepare.py 파일 내용](/img/new-platform/new-platform-prepare.png)

### Build 도구 구성
수정하기`platform/my_new_chip/toolchain_file.cmake`빌드 도구와 빌드 옵션의 실제 경로를 구성합니다.

이 파일은 실제 빌드 도구의 경로를 지정합니다.`gcc`, `g++`·`ar`, 뿐 아니라 건축 선택권.

![toolchain file.cmake 파일 내용](/img/new-platform/new-platform-toolchain.png)

### 특수 헤더 파일 경로 구성 (옵션)
수정하기`platform/my_new_chip/platform_config.cmake`Application layer에 의해 사용되는 헤더 파일 경로를 구성합니다.

:::info
- 크로스 플랫폼 디자인`TuyaOpen`, 이 파일은 헤더 파일 경로와 관련된`tuyaos_adapter`템플릿이 이미 생성합니다.
- 플랫폼이 응용 프로그램에 다른 헤더 파일을 노출해야하는 경우이 파일에 추가하십시오.
- 더 보기`PLATFORM_PUBINC`변수는 Application layer에 의해 사용되는 헤더 파일 경로를 지정합니다. 헤더 파일 경로를 추가하도록 수정합니다.
:::

![platform config.cmake 파일 내용](/img/new-platform/new-platform-config.png)

### 비밀번호
실제 하드웨어 드라이버 코드를 입력`platform/my_new_chip/tuyaos/tuyaos_adapter/src`이름 *

:::warning
이 단계는 가장 중요한 부분입니다. 특정 하드웨어 플랫폼의 특성에 따라 드라이버 코드를 작성합니다.
:::

템플릿 생성은 필요한 인터페이스 기능 템플릿을 생성합니다. 해당 함수의 특정 논리를 구현`.c`파일.

이름 *`TuyaOpen`정확하게 동일한 underlying 공용영역을 이용합니다`TuyaOS`, 당신은 따를 수 있습니다[TuyaOS Porting 가이드](https://developer.tuya.com/en/docs/iot-device-dev/TuyaOS-translation_linux?id=Kcrwrf72ciez5#title-1-Adapt-RTC)그리고[RTOS 포팅 가이드](https://developer.tuya.com/en/docs/iot-device-dev/TuyaOS-translation_rtos?id=Kcrwraf21847l#title-1-Adapt-entry-point)적용을 위해.

![tuyaos adapter/src 디렉토리 내용](/img/new-platform/new-platform-src.png)

### 건설 및 링크
수정하기`platform/my_new_chip/build_example.py`빌드 및 링크 단계를 완료합니다.

새로운 플랫폼의 빌드 방법에 따라이 스크립트를 조정합니다. 스크립트는 세 단계 완료:

1. 소스 파일을 컴파일`tuyaos_adapter`이름 *
2. 다른 소스 파일을 컴파일하면 플랫폼이 내부적으로 필요합니다.
3. 빌드 제품을 링크`TuyaOpen`상층 제품`libtuyaapp.a libtuyaos.a`실행 가능한 파일로.

스크립트는 두 가지 매개 변수를 허용합니다.`params_path`이름 *`user_cmd`.

- `params_path`build 매개 변수 파일에 경로입니다. 세 가지 형식을 제공합니다 - cmake, config 및 json - 당신이 사용하여 액세스 할 수있는`${BUILD_PARAM_PATH}/build_param.cmake`.

매개 변수 파일은 컴파일에 필요한 매개 변수를 제공합니다.`OPEN_ROOT/OPEN_HEADER_DIR/OPEN_LIBS_DIR/PLATFORM_NEED_LIBS`. 특징 윤곽의 결과는 또한 이 모수 파일에서 입니다.

- `user_cmd`사용자 정의 명령입니다. 가능한 값은`build`플랫폼 코드를 컴파일하고`clean`건축 제품을 청소하기 위하여. 스크립트의 각 명령에 대한 논리를 구현합니다.

### Firmware 번쩍이는 (선택)
새로 적응된 하드웨어 플랫폼은 특정 펌웨어 번쩍이는 방법을 요구할 수 있습니다.`tyutool`플래시 툴`TuyaOpen`use does not provide a universal flashing script.

자주 묻는 질문[tyutool 저장소](https://github.com/tuya/tyutool)공식 지원 요청

### 저장소 정보 (선택 사항)
수정하기`platform/my_new_chip/platform_config.yaml`repository git 정보를 구성합니다.

이 단계는 다른 개발자에게 새로운 플랫폼을 제공할 때 적용됩니다. 로컬로 사용하는 경우, 이 단계를 건너뛸 수 있습니다.
