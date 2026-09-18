---
title: 프로젝트
description: "TuyaOpen의 프로젝트 만들기 tos.py 새로운 프로젝트, 이는 응용 프로그램에 대한 predefined 템플릿에서 기본 프로젝트 구조를 초기화."
keywords:
  - tuyaopen
  - new project
  - tos.py
  - project structure
  - build
---

`tos.py new project`TuyaOpen 개발 환경에서 새로운 프로젝트를 만듭니다. 명령은 predefined에서 프로젝트의 기본 구조를 초기화합니다.

## 프로젝트
지원하다`tos.py new project`. 명령은 프로젝트 이름과 플랫폼에 대해 알려줍니다.

```bash
❯ tos.py new project
[INFO]: Running tos.py ...
[NOTE]: Input new project name.
input: new-project
```

명령은 이름으로 폴더를 만듭니다.`new-project`기본 프로젝트 구조를 포함하는 현재 디렉토리에.

### 관련 기사
```
new-project
├── app_default.config  # Default configuration file
├── CMakeLists.txt      # CMake build configuration
└── src
    └── hello_world.c   # Sample code file
```

### 이름 *
`-f, --framework [base|arduino]`: 프레임 워크 타입의 프로젝트 사용

- `base`(default): 기본 프레임 워크 프로젝트를 만듭니다.
- `arduino`: Arduino 프레임 워크 프로젝트를 만듭니다.

## 다음 단계
프로젝트 작성 후, 빌드 및 확인, 코드를 작성, 기능을 확인하기 위해 구성을 조정하고 다른 개발자의 기본 구성을 저장합니다.

### 구축 및 검증
1. 지원하다`tos.py config choice`칩 플랫폼 구성을 선택합니다.
2. 지원하다`tos.py build`편집을 확인합니다.

### 비밀번호
1. 코드의 디렉토리 구조를 결정한 다음 소스와 헤더 파일 경로를 구성`add_library(${EXAMPLE_LIB})`내 계정`CMakeLists.txt`.

    - `${EXAMPLE_LIB}`library name 변수입니다. 메인 프레임 워크는 그것을 정의하므로 수동으로 수정하지 않습니다.
    - 설정하기`APP_SRC`이름 *`APP_INC`표준을 사용하여 변수`CMake`구문.

2. 코드를 개발합니다. 인터페이스를 사용하여`${tuyaopen_root}/src`이름 *`${tuyaopen_root}/platform/.../tuyaos_adapter`. 아래에 공식 표본 부호에 Refer`apps`이름 *`examples`.

3. 설정 변경. 지원하다`tos.py config menu`구성 인터페이스를 열고 TuyaOpen 구성 옵션을 조정합니다.

### Verify 기능
펌웨어를 플래시하고 코드의 기능을 확인합니다.

### 기본 설정 저장
지원하다`tos.py config save`기본 설정 파일로 현재 구성을 저장합니다.
