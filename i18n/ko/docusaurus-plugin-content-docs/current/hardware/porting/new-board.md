---
title: 새 보드 추가
description: "tos.py 새로운 보드를 사용하여 TuyaOpen-supported 칩 플랫폼에 새로운 보드를 추가하여 대화 형 프롬프트를 통해 보드 구성을 생성합니다."
keywords:
  - tuyaopen
  - new board
  - bsp
  - tos.py
  - porting
---

`tos.py new board`TuyaOpen이 이미 지원하는 칩 플랫폼을위한 새로운 보드 지원 패키지를 만듭니다. 대화 형 프롬프트와 템플릿 시스템을 통해, 명령은 하드웨어 포팅 및 적응을 단순화하는 기존 칩 플랫폼에 새로운 보드 구성을 추가합니다.

이 가이드는 자체 하드웨어 보드를 설계하고 그 보드에 대한 드라이버 초기화 흐름을 적응시키는 개발자입니다.

## 보드 naming
널 이름은 요구되고 선택적인 분야를 결합합니다.

### 관련 분야
- 제조자 이름: 널의 제조자. Tuya가 시작된 보드 **TUYA**.
- 칩 이름: ** T2** 또는 ** T5AI**와 같은 플랫폼 이름.

### 선택 영역
- 주요 기능: 기능적인 단위 또는 특성은 ** LCD ** 또는 ** CAM**와 같은 널의 주요 특징을 반영합니다.
- 시리즈 이름 및 버전 : 일부 제조업체는 버전 번호와 함께 이름을 반영 할 수있는 제품 시리즈를 유지합니다.
- 기타: 추가 하드웨어 식별자.

### 남링 규칙
- 상부 영어 문자를 사용하십시오.
- underscores를 가진 연결 분야 (`_`).
- 주문 필드 ** 제조업체 name Board name Optional 필드**.
- 특수 문자를 피하십시오.

예를 들면:`TUYA_T5AI_BOARD`.

## 게시판 만들기
1. 지원하다`tos.py new board`대상 플랫폼을 선택하십시오. 명령은 모든 사용 가능한 하드웨어 플랫폼을 나열합니다.

    ```
    [INFO]: Running tos.py ...
    --------------------
    1. BK7231X
    2. ESP32
    3. LN882H
    4. T2
    5. T3
    6. T5AI
    7. Ubuntu
    --------------------
    Input "q" to exit.
    Choice platform: 6
    ```

플랫폼 (T5AI 여기)를 선택하려면 화살표 키를 사용하여 Enter 키를 눌러 확인해야합니다.

2. 이름 입력

    ```
    [NOTE] Input new board name.
    input: MY_CUSTOM_BOARD
    ```

    :::tip
위의 naming 규칙을 따르십시오.
    :::

3. 명령은 다음과 같은 파일 구조를 생성합니다.

    ```
    boards/<platform>/<board_name>/
    ├── Kconfig           # Board-level configuration file
    ├── CMakeLists.txt    # CMake build configuration
    ├── board_com_api.h   # Board-level API declarations
    └── board_com_api.c   # Board-level API implementations
    ```

명령도 업데이트`boards/<platform>/Kconfig`새 보드의 구성 옵션이 포함되어 있습니다.

    ```
    config BOARD_CHOICE_MY_CUSTOM_BOARD
    bool "MY_CUSTOM_BOARD"
    if (BOARD_CHOICE_MY_CUSTOM_BOARD)
        rsource "./MY_CUSTOM_BOARD/Kconfig"
    endif
    ```

## 다음 단계
보드를 만들고 컴파일을 확인한 후, 보드 API를 조정하고 구성을 조정하고, 보드 레벨 기본 구성을 저장합니다.

### 컴파일을 검증
1. 지원하다`tos.py new project`새 프로젝트를 만들려면 프로젝트 디렉토리를 입력하십시오.

2. 지원하다`tos.py config choice`동일한 칩 플랫폼에 대한 기존 구성을 선택합니다. 설정 시간을 절약합니다.

3. 지원하다`tos.py config menu`새 보드를 선택합니다.

4. 지원하다`tos.py build`편집을 확인합니다.

### Adapt 널
수정하기`boards/<platform>/<board_name>/board_com_api.c`새로운 널을 적응시키기 위하여.

오시는 길`OPERATE_RET board_register_hardware(void)`파일에 있는 함수는 보드의 하드웨어 정보를 기반으로 수정합니다. 예를 들어, KEY, LED 및 I2C와 같은 주변기기용 초기화 코드를 추가합니다. 구현을위한 기존 보드에 Refer.

다른 소스 파일 또는 헤더 디렉토리를 추가하려면 수정`CMakeLists.txt`그리고 구성`LIB_SRCS`이름 *`LIB_PUBLIC_INC`변수.

### 설정 조정
지원하다`tos.py config menu`구성 메뉴를 열고 기능 옵션과 매개 변수를 조정합니다. 그런 다음 이전 단계와 함께 기능을 확인합니다.

### 설정 저장
제출하기`app_default.config`프로젝트 디렉토리의 파일`boards/<platform>/config`디렉토리 및 이름을 입력`<board_name>.config`그래서 다른 개발자는 그것을 재사용 할 수 있습니다.

## 제품 정보
### 어떻게 생성 된 보드를 삭제합니까?
더 알아보기`boards/<platform>/<board_name>`디렉토리는 수동으로 관련 구성을 제거합니다.`boards/<platform>/Kconfig`.

### 어떻게 생성 된 보드 이름을 변경합니까?
널을 수동으로 바꾸십시오:

1. Board 디렉토리를 이름을 지정합니다.
2. 플랫폼의 참조를 업데이트`Kconfig`.
3. 내부의 기본값을 업데이트하십시오.`Kconfig`.
