---
title: switch_demo
description: "switch demo는 Tuya IoT 클라이언트 오픈 소스 샘플 앱입니다. 클라우드 MQTT, LAN TCP, Bluetooth 및 OTA 컨트롤이 있는 크로스 플랫폼 스위치입니다."
keywords:
  - iot smart light open source demo
  - switch_demo
  - tuya iot client
  - tuya cloud
  - ota
---

`switch_demo` 응용 프로그램은 Tuya AI + IoT 플랫폼에서 제공하는 최소 기능 응용 프로그램입니다. 다중 연결을 지원하는 간단하고 크로스 플랫폼, 크로스 OS 스위치 예입니다. Tuya 앱과 Tuya의 클라우드 서비스를 사용하여 원격으로 스위치를 제어 할 수 있습니다 (집에서 멀리), LAN에 (같은 LAN에), 그리고 Bluetooth를 통해 (네트워크를 사용할 수 없음).

`switch_demo`는 다음과 같은 기능을 보여줍니다.

- Bluetooth 페어링 지원
- Wi-Fi 액세스 포인트 (AP) 모드에서 페어링 지원.
- 클라우드에서 MQTT 제어 데이터를 수신하고 자동으로 응답합니다.
- 앱에서 LAN TCP 제어 데이터를 수신하고 자동으로 응답합니다.
- over-the-air (OTA) 업데이트 기능을 지원합니다.

현재 `switch_demo`는 물리적 하드웨어를 제어하지 않으며 [모든 지원 플랫폼](../../about-tuyaopen.md#supported-platforms)에서 실행할 수 있습니다.

`switch_demo`를 사용하기 전에 다음 용어를 이해해야합니다.

- [TuyaOpen 전용 라이센스](../../quick-start/index.md#tuyaopen-dedicated-license)
- [제품 ID (PID)] (../../quick-start/index.md#pid)
- [피어링] (../../quick-start/device-network-configuration.md)
- [데이터 포인트 (DP)] (../overview#dp)

## 기본 앱 컨트롤 패널
![ Tuya IoT Light 데모의 기본 앱 제어 패널](https://images.tuyacn.com/content-platform/hestia/1756435281b95ab053f77.png)


## 디렉토리
```sh
+- switch_demo
    +- src
        -- cli_cmd.c
        -- tuya_main.c
        -- tuya_config.h
    -- CMakeLists.txt
    -- README_CN.md
    -- README.md
```

- `cli_cmd.c`: `switch_demo` 정보와 상태를 보고 운영하기 위한 명령행 가동.
- `tuya_main.c`: `switch_demo`의 핵심 기능.
- `tuya_config.h` : Tuya PID 및 권한 정보, Tuya Developer Platform에서 획득. 자세한 내용은 [TuyaOS > 제품 만들기](https://developer.tuya.com/en/docs/iot-device-dev/application-creation?id=Kbxw7ket3aujc)를 참조하십시오.

## 하드웨어 지원
이 프로젝트는 현재 지원된 칩과 발달 널에 달할 수 있습니다.

## 프로젝트 구축
1. `tos.py config choice`를 실행하여 개발 보드 또는 플랫폼을 선택하십시오.
2. 먼저 구성을 변경하려면 `tos.py config menu`를 실행하십시오.
3. 프로젝트를 건설하기 위해 `tos.py build`를 실행하면 `tos.py flash`가 깜박입니다.

클라우드에 장치를 바인딩하려면 먼저 `PID` 및 라이센스를 부여하십시오. [장치 - 클라우드 바인딩 작품] (../tuya-cloud/device-cloud-binding) 및 [제품 및 에이전트] (../tuya-cloud/creating-new-product)를 참조하십시오.
