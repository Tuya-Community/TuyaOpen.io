---
title: "ESP32 빠른 시작"
description: "ESP32 빠른 시작 TuyaOpen — 빌드, 플래시, 그리고 ESP32, ESP32-S3, ESP32-C3 또는 ESP32-C6 개발 보드에 첫 번째 응용 프로그램을 실행."
keywords:
  - esp32
  - quick start
  - tuyaopen hardware
  - flashing
  - esp32-s3
---

빌드, 플래시, ESP32 보드에서 첫 번째 TuyaOpen 응용 프로그램을 실행합니다.

## 자주 묻는 질문
- 한국어[환경 설정](../../quick-start/enviroment-setup)
- C 개발 및 직렬 터미널과의 기본 친숙성

## 제품 정보
- ESP32 개발 보드 (ESP32, ESP32-S3, ESP32-C3 또는 ESP32-C6)
- USB 케이블 (당신의 널에 따라서 USB-C 또는 마이크로 USB,)
- Linux, macOS 또는 Windows를 실행하는 컴퓨터 (WSL 권장)
- Wi-Fi 네트워크 (2.4 GHz)

:::info
응용 프로그램이 Tuya Cloud 기능을 사용하는 경우 (원격 제어, AI Agent, OTA), 당신은 또한 필요[Tuya Cloud 라이센스 키](../../quick-start/equipment-authorization). 로컬 전용 프로젝트 (GPIO, UART, 디스플레이 데모)는 라이센스가 필요하지 않습니다.
:::

## 한국어
### 1. Clone TuyaOpen는 환경을 설치합니다
```bash
git clone https://github.com/tuya/TuyaOpen.git
cd TuyaOpen
git submodule update --init
```

TuyaOpen 환경을 활성화하십시오:

```bash
source export.sh
```

도구는 작업 증명:

```bash
tos.py version
tos.py check
```

### 2. 프로젝트 선택
첫 번째 빌드의 경우 ** 스위치 데모 ** ( 간단한 클라우드 연결 스위치)를 사용하십시오.

```bash
cd apps/tuya_cloud/switch_demo
```

또는 Tuya Cloud없이 로컬 전용 테스트의 경우 ** GPIO 예제**:

```bash
cd examples/peripherals/gpio
```

:::warning
대부분의 주변 예는 T5AI를 기본 설정으로 발송합니다. 당신이 실행할 때`tos.py config choice`, 미리 구축 된 ESP32 구성을 볼 수 없습니다. ESP32 칩을 수동으로 선택하거나 만듭니다.`.config`예제의 파일`config/`디렉토리 (see)[새로운 ESP32 보드 추가](esp32-new-board)형식의 경우).
:::

### 3. ESP32 널 윤곽을 선정하십시오
```bash
tos.py config choice
```

사용 가능한 구성 목록을 볼 수 있습니다. 당신의 널을 일치하는 것을 선택하십시오:

```
1. ESP32.config
2. ESP32-C3.config
3. ESP32-C6.config
4. ESP32-S3.config
5. DNESP32S3.config
...
```

탑승 수속 일반 ESP32-S3 보드가있는 경우, 선택`ESP32-S3.config`.

### 4. 펌웨어 구축
```bash
tos.py build
```

빌드는 TuyaOpen SDK, 애플리케이션 코드 및 ESP-IDF 플랫폼 레이어를 컴파일합니다. 첫 번째 빌드는 ESP-IDF 툴체인으로 몇 분이 걸립니다.

### 5. 섬광 굳힌모
USB를 통해 ESP32 보드를 연결 한 다음:

```bash
tos.py flash
```

직렬 포트가 자동으로 감지되지 않은 경우, 지정:

```bash
tos.py flash --port /dev/ttyUSB0
```

:::tip[Linux 직렬 권한]
Linux에서 "permission denied" 오류를 얻는 경우:
```bash
sudo usermod -aG dialout $USER
```
변화에 대한 변화에 대해 알아보세요.
:::

### 6. 감시자 serial 산출
```bash
tos.py monitor
```

또는 ESP-IDF 감시자를 직접 사용하십시오:

```bash
tos.py idf monitor
```

제품정보`Ctrl+]`모니터를 종료합니다.

### 7. (클라우드 프로젝트 만) 장치 쌍
Tuya Cloud (e.g., switch demo)를 사용하는 프로젝트:

1. **Tuya Smart** 또는 **Smart Life** 앱을 휴대폰에 엽니다.
2. 탭 ** 장치 추가 ** > ** 자동 스캔 **.
3. 휴대 전화가 동일한 2.4 GHz Wi-Fi 네트워크에 있습니다.
4. 앱 지침을 따르십시오.

장치는 앱에 나타나고 원격 명령에 응답해야합니다.

## 현재 위치
- **GPIO 예**: 직렬 출력은 GPIO toggling을 보여줍니다. LED 또는 멀티미터로 확인할 수 있습니다.
- ** 스위치 데모 **: 장치는 Tuya Cloud에 연결하고 제어 가능한 스위치로 Tuya Smart 앱에 나타납니다.

## ESP-IDF 명령어 사용
`tos.py idf`패스트로`idf.py`: 패스가 전달되는 모든 인자. ESP32에 대한 프로젝트를 먼저 구성`tos.py config choice`.

```bash
# Any idf.py command works
tos.py idf menuconfig
tos.py idf monitor
tos.py idf fullclean
tos.py idf flash -p /dev/ttyUSB0
tos.py idf set-target esp32s3
tos.py idf size

# Pass IDF-specific flags
tos.py idf --idf-flags="-v" build
```

고급 구성에 유용합니다 (부품, IDF 구성 요소 설정, 동위 빌드 등). 이름 *[카지노사이트](https://github.com/tuya/TuyaOpen/blob/master/tools/cli_command/cli_idf.py)구현을 위해.

## 문제 해결
|이름 *|제품정보|
|---------|----------|
| `tos.py check`실패하다|지원하다`source export.sh`다시. Python 3.8+를 설치합니다.|
|오류 "IDF 찾을 수 없습니다"|ESP-IDF 툴체인은 첫 번째 빌드에서 다운로드합니다. 인터넷 접속을 보장합니다.|
|플래시는 "찾지 못했습니다"|USB 연결을 확인합니다. Linux에서 확인`/dev/ttyUSB*`또는`/dev/ttyACM*`이름 *|
|장치 쌍이 없습니다|2.4 GHz Wi-Fi를 확인하십시오. 인증 키 확인`tuya_app_config.h`. |
|연속 출력 쇼 "auth error"|라이센스 키를 플래시. 이름 *[장비 인증](../../quick-start/equipment-authorization). |

## 더 보기
- [TuyaOpen의 ESP32 -- 개요](overview-esp32)
- [ESP32 핀 Mapping](esp32-pin-mapping)
- [ESP32 OTA 업데이트](esp32-ota)
- [환경 설정](../../quick-start/enviroment-setup)
- [Project 편집 가이드](../../build-system/compilation-guide)
- [장비 인증](../../quick-start/equipment-authorization)
- [tos.py 사용자 가이드](../../tos-tools/tos-guide)
