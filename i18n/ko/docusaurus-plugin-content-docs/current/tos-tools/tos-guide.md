---
title: CLI - tos.py 개발 도구
description: "tos.py는 프로젝트 구성, 컴파일, 펌웨어 플래시, 디버깅 및 모니터링에 사용하는 TuyaOpen 명령줄 인터페이스입니다."
keywords:
  - tos.py
  - CLI 도구
  - TuyaOpen
  - 프로젝트 구성
  - 명령줄
---

## 개요

`tos.py`는 TuyaOpen의 명령줄 인터페이스(CLI) 개발 도구입니다. 프로젝트 구성, 컴파일, 펌웨어 플래시 및 디버깅에 사용합니다.

```bash
❯ tos.py --help
Usage: tos.py [OPTIONS] COMMAND [ARGS]...

  Tuya Uart Tool.

Options:
  -d, --debug  Show debug message
  -h, --help   Show this message and exit.

Commands:
  version  Show version.
  check    Check the dependent tools.
  config   Configuration file operation.
  build    Build the project.
  clean    Clean the project.
  flash    Flash the firmware.
  monitor  Display the device log.
  update   Update TuyaOpen dependencies.
  new      Create project or platform templates.
  dev      Development utilities (for example build-all-config).
  idf      Run idf.py passthrough (ESP32 only).
```

`-d` 또는 `--debug`를 사용하면 상세 로그를 표시합니다.

## version

`tos.py version`은 저장소의 `tag-commit`을 출력합니다. `v1.3.0`, `23`, `g6bcb5aa`는 각각 최신 릴리스, 추가 커밋 수, 현재 커밋의 축약 해시를 의미합니다.

```bash
❯ tos.py version
[INFO]: Running tos.py ...
[INFO]: v1.3.0-23-g6bcb5aa
```

:::note
`[Unknown version]`이 표시되면 저장소에 태그가 없는 것입니다. Fork 저장소에서 일반적으로 발생합니다.
:::

## check

`check`는 필요한 도구의 존재와 버전을 확인하고 서브모듈을 다운로드합니다.

```bash
❯ tos.py check
[INFO]: Running tos.py ...
[INFO]: [git] (2.43.0 >= 2.0.0) is ok.
[INFO]: [cmake] (4.0.2 >= 3.28.0) is ok.
[INFO]: [make] (4.3 >= 3.0.0) is ok.
[INFO]: [ninja] (1.11.1 >= 1.6.0) is ok.
[INFO]: Downloading submoudules ...
```

오류가 발생하면 누락되거나 오래된 도구를 설치하고 `TuyaOpen` 루트에서 `git submodule update --init`를 실행하세요.

## config

```bash
❯ tos.py config -h
Usage: tos.py config [OPTIONS] COMMAND [ARGS]...

Commands:
  choice  Choice config file.
  menu    Menuconfig.
  save    Save minimal config.
```

### config choice

프로젝트 디렉터리에서 `tos.py config choice`를 실행하면 현재 프로젝트가 지원하는 구성 파일을 표시하고 선택한 값을 `app_default.config`에 동기화합니다. `config` 디렉터리가 없으면 `TuyaOpen/boards`의 구성을 사용합니다. `config -d`는 보드 구성을 직접 표시합니다.

### config menu

`tos.py config menu`는 시각적 구성 화면을 엽니다. 저장하면 `app_default.config`가 변경됩니다. 툴체인이 변경될 수 있으므로 먼저 딥 클린을 수행합니다.

:::warning
구성을 잘못 변경하면 기능이 바뀌거나 컴파일에 실패할 수 있습니다. 필요하면 `choice`로 구성을 다시 선택하세요.
:::

### config save

`tos.py config save`는 현재 구성을 `config` 디렉터리에 저장합니다.

## build

프로젝트를 컴파일하고 실행 파일을 생성합니다. 주요 단계는 플랫폼 다운로드, 툴체인 준비, `.build` 생성, `ninja example` 실행 및 `.build/bin`에 산출물 저장입니다.

```bash
❯ tos.py build
...
[INFO]: ******* Build Success ********
```

상세 로그는 `tos.py build -v`를 사용하세요.

## clean

컴파일 캐시를 정리합니다. `tos.py clean -f`는 `ninja clean` 후 `.build` 디렉터리도 삭제합니다.

## flash

`tyutool_cli`로 실행 파일을 디바이스에 플래시합니다. 없으면 자동으로 다운로드합니다.

```bash
❯ tos.py flash -h
Usage: tos.py flash [OPTIONS]

Options:
  -d, --debug         Show flash debug message.
  -p, --port TEXT     Target port.
  -b, --baud INTEGER  Uart baud rate.
  -h, --help          Show this message and exit.
```

Linux/Mac에서는 `sudo usermod -aG dialout $USER` 실행 후 재시작하여 시리얼 포트 권한을 부여하세요.

## monitor

`tyutool_cli`로 시리얼 로그를 표시합니다.

```bash
❯ tos.py monitor -h
Usage: tos.py monitor [OPTIONS]

Options:
  -p, --port TEXT     Target port.
  -b, --baud INTEGER  Uart baud rate.
  -h, --help          Show this message and exit.
```

`monitor`에서 인증 코드를 기록할 수도 있습니다. 로그를 종료하려면 `Ctrl+c`를 누른 뒤 Enter를 누릅니다.

## update

`TuyaOpen/platform/platform_config.yaml`의 의존성 설정에 따라 관련 의존성을 지정된 `commit`으로 전환합니다.

## idf 및 dev

ESP32 프로젝트에서는 `tos.py idf menuconfig`, `tos.py idf build`와 같은 ESP-IDF 명령을 사용할 수 있습니다. `dev bac`는 앱의 모든 구성으로 빌드를 반복하고 선택적으로 배포 폴더에 바이너리를 복사합니다.

## new

`tos.py new project`는 `base` 또는 `arduino` 템플릿에서 새 애플리케이션 프로젝트를 생성합니다. `new platform`의 자세한 사용법은 [new platform](/docs/hardware/porting/new-platform)을 참고하세요.

## 일반적인 문제

### Windows에서 `config menu`의 화살표 키가 작동하지 않습니다

CMD 또는 PowerShell에서 사용하고 `h`, `j`, `k`, `l` 키로 이동해 보세요.

### `check` 오류

필요한 도구를 설치 또는 업그레이드하고 `git submodule update --init`를 실행하세요.

### config 파일을 잠글 수 없습니다

`~/.gitconfig.lock`이 남아 있으면 해당 파일을 수동으로 삭제한 후 다시 실행하세요.
