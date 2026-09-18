---
title: "1단계: 프로젝트 빌드"
description: "tos.py를 사용하여 TuyaOpen 애플리케이션을 소스에서 플래시 가능한 펌웨어 bin으로 빌드합니다. 프로젝트를 선택하고 보드 구성을 지정한 뒤 빌드하고 정리합니다."
keywords:
  - 프로젝트 컴파일
  - tos.py build
  - 펌웨어 bin
  - TuyaOpen
  - 빌드 시스템
---

프로젝트 빌드는 TuyaOpen 애플리케이션의 소스를 플래시 가능한 펌웨어 bin으로 변환합니다. `tos.py`를 사용하여 프로젝트와 보드 구성을 선택하고 빌드 및 정리를 수행합니다. 이 페이지에서는 `switch_demo` 애플리케이션을 예로 사용합니다.

## 프로젝트 선택
TuyaOpen에서는 `apps` 및 `examples` 디렉터리의 프로젝트를 빌드합니다.

`switch_demo`를 예로 들어 프로젝트 디렉터리로 이동합니다.

```bash
cd apps/tuya_cloud/switch_demo
```

## 프로젝트 구성
`tos.py config choice`를 실행하여 프로젝트를 구성합니다. 이 명령은 검증된 구성 옵션을 표시하므로 하드웨어와 일치하는 항목을 선택하세요.

```bash
❯ tos.py config choice
[INFO]: Running tos.py ...
[INFO]: Fullclean success.
--------------------
1. LN882H.config
2. EWT103-W15.config
3. Ubuntu.config
4. ESP32-C3.config
5. ESP32-S3.config
6. ESP32.config
7. T3.config
8. T5AI.config
9. T2.config
10. BK7231X.config
--------------------
Input "q" to exit.
Choice config file:
```

예를 들어 Tuya T5 시리즈 개발 보드에서는 `T5AI.config`를 선택합니다.

## 출력 빌드
`tos.py build`로 프로젝트를 빌드합니다.

```bash
❯ tos.py build
...
[INFO]: ******************************
[INFO]: /xxx/TuyaOpen/apps/tuya_cloud/switch_demo/.build/bin/switch_demo_QIO_1.0.0.bin
[INFO]: ******************************
[INFO]: ******* Build Success ********
[INFO]: ******************************

```

빌드가 성공하면 펌웨어 bin 경로가 출력되고 `Build Success`로 종료됩니다. 이 bin 파일을 [2단계: 플래시 및 로그](./firmware-burning.md)에서 플래시합니다.

## 출력 정리
빌드 캐시를 지우려면 일반 정리에는 `tos.py clean`, 강제 전체 정리에는 `tos.py clean -f`를 사용합니다.

```bash
❯ tos.py clean -f
[INFO]: Running tos.py ...
[INFO]: Fullclean success.
```

## FAQ
### Windows에서 컴파일이 느립니다
증상: 각 파일 컴파일에 최대 3초가 걸리고, 특정 파일에서 프로세스가 멈추는 경우가 있습니다.

해결 방법:

1. `Ctrl + Shift + Esc`로 작업 관리자를 열고 CPU 프로세스를 확인한 다음 `MSPCManagerService` 프로세스를 찾아 종료합니다.
2. 그래도 해결되지 않으면 전체 `TuyaOpen` 디렉터리를 시스템 드라이브가 아닌 드라이브(예: D 드라이브)로 이동하고, **Windows 보안 - 바이러스 및 위협 방지**의 제외 목록에 디렉터리를 추가합니다.
