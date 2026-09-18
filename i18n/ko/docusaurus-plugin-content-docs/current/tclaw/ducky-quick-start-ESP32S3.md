---
title: ESP32-S3를 가진 TClaw
description: "TClaw ESP32-S3 빌드 및 플래시 ESP32-S3 개발 보드에 Wi-Fi와 가장자리 AI 음성 보조 펌웨어."
keywords:
  - duckyclaw
  - tclaw
  - esp32-s3
  - ai model deployment on edge devices
  - quick start
---

import { SyncedTabs, SyncedTabItem } from '@site/src/components/SyncedTabs';

# TClaw 빠른 시작 (ESP32-S3)
이 가이드는 ESP32-S3 개발 보드에서 TClaw (이전 DuckyClaw) 펌웨어를 구축하고 번쩍이는 것을 안내합니다. Wi-Fi와 ESP32-S3에서 TClaw를 실행하려는 개발자입니다.

## 제품 정보
- **ESP32-S3 개발 보드 ** PSRAM 8 MB 및 FLASH 16 MB.
- ** USB 데이터 케이블 ** 보드를 컴퓨터에 연결하십시오.
- **Computer** Windows 10/11, Linux (e.g. Ubuntu 20/22/24 LTS) 또는 macOS를 실행합니다.
- **Tuya Cloud **: 이 데모는 Tuya Cloud 서비스를 사용합니다. 당신은 유효한[라이센스 키 (authorization code)](/docs/quick-start/equipment-authorization)그리고 정확한 PID, UUID, 그리고 AuthKey에`tuya_app_config.h`클라우드 및 LLM 기능

:::note
개발 보드가 마이크와 스피커 지원이있는 경우 ** ASR** (Automatic Speech Recognition)는 기본 입력 방법으로 활성화되며 IM (messaging apps)와 coexist 할 수 있습니다.
:::

## 한국어
### 1. 빌드 도구 설치 (Python, Make, Git)
호스트 기계에 필요한 도구를 설치합니다.

<SyncedTabs
  defaultValue="Linux"
  values={[
    { label: 'Ubuntu and Debian', value: 'Linux' },
    { label: 'Mac', value: 'Mac' },
    { label: 'Windows', value: 'Windows' },
  ]}
>
<SyncedTabItem value="Linux">

:::info
We recommend Ubuntu 20, 22, or 24 LTS.
:::

Install the required packages:

```bash
sudo apt-get install lcov cmake-curses-gui build-essential ninja-build wget git python3 python3-pip python3-venv libc6-i386 libsystemd-dev
```

</SyncedTabItem>
<SyncedTabItem value="Mac">

:::info
We recommend using Homebrew to install the tools.
:::

Mac system tools may be outdated. You can install Homebrew and a newer bash, then install the build tools:

<details>
<summary>Install Homebrew and upgrade bash (optional)</summary>

```bash
# Install Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install bash
brew install bash

# Add bash to allowed shells
echo "/usr/local/bin/bash" | sudo tee -a /etc/shells

# Set default shell for current user
chsh -s /usr/local/bin/bash
```

</details>

Install the required tools:

```bash
brew install python3 git make
```

</SyncedTabItem>
<SyncedTabItem value="Windows">

:::info
Use Windows 10 or 11.
:::

:::warning
Use **CMD** or **PowerShell** only. Do not use Git Bash, MSYS2, or other Linux-like terminals; they are not supported.
:::

Download, install, and add to your PATH (then restart the computer so the commands are available):

- **Python** 3.8 or later: [Download](https://www.python.org/downloads/windows/)
- **Git** 2.0 or later: [Download](https://git-scm.com/downloads/win)
- **Make** 3.0 or later: [Download](https://gnuwin32.sourceforge.net/packages/make.htm)

</SyncedTabItem>
</SyncedTabs>

### 2. 복제
:::info
당신은 큰 clones를 위한 Git 완충기 크기를 증가할 수 있습니다:

```bash
git config --global http.postBuffer 524288000

# Github repo
git clone https://github.com/tuya/DuckyClaw.git

# Gitee repo
git clone https://gitee.com/tuya-open/DuckyClaw.git
```

:::

:::warning
프로젝트 경로 사용 ** 공백 또는 비-ASCII 문자. Windows에서 C를 사용하여 피하십시오. 루트를 구동하십시오.
:::

### 3. 건축 환경을 활성화하십시오
```bash
cd DuckyClaw

# update from github
git submodule update --init

# update from gitee
git config --global url."https://gitee.com/tuya-open/".insteadOf "https://github.com/tuya/"
git submodule update --init
```

:::note
당신이 Github에서 코드를 끌어 다시 전환해야하는 경우, 실행 :

`git config --global url."https://github.com/tuya/".insteadOf "https://gitee.com/tuya/"`
:::

TuyaOpen Build 환경을 활성화하십시오.`tos.py`사용 가능:

:::warning
각 새로운 터미널 세션에서 활성화 명령을 다시 실행해야합니다.
:::

<SyncedTabs
  defaultValue="Linux"
  values={[
    { label: 'Linux', value: 'Linux' },
    { label: 'Mac', value: 'Mac' },
    { label: 'Windows', value: 'Windows' },
  ]}
>
<SyncedTabItem value="Linux">

```bash
. ./TuyaOpen/export.sh
```

</SyncedTabItem>
<SyncedTabItem value="Mac">

```bash
. ./TuyaOpen/export.sh
```

</SyncedTabItem>
<SyncedTabItem value="Windows">

```bash
.\TuyaOpen\export.ps1
```

For PowerShell, you may need to run first: `Set-ExecutionPolicy RemoteSigned -Scope LocalMachine`.

For CMD use: `.\TuyaOpen\export.bat`

</SyncedTabItem>
</SyncedTabs>

환경 검증:

```bash
tos.py version
tos.py check
```

버전 출력(예:`v1.3.0`) 및 도구 목록 (git, cmake, make, ninja) OK 상태. Submodules가 필요하다면 다운로드됩니다.

### 4. 널 윤곽을 선정하십시오
프로젝트 루트에서 config chooser 실행:

```bash
cd ..
tos.py config choice
```

**3**를 입력하여 **ESP32S3 BREAD COMPACT WIFI**:

```text
--------------------
1. ATK_T5AI_MINI_BOARD_2.4LCD_CAMERA.config
2. DshanPi_A1.config
3. ESP32S3_BREAD_COMPACT_WIFI.config
4. RaspberryPi.config
5. TUYA_T5AI_BOARD_LCD_3.5_CAMERA.config
6. WAVESHARE_T5AI_TOUCH_AMOLED_1_75.config
--------------------
Input "q" to exit.
Choice config file: 3
```

### 5. 앱 구성 편집
기타`DuckyClaw/include/tuya_app_config.h`다음을 설정한다.

**LLM / Tuya Cloud** (클라우드 및 AI 필요):

- `TUYA_PRODUCT_ID`- 제품 ID (PID); 이것은 장치와 클라우드 구성 사이의 바인딩 키입니다.
- `TUYA_OPENSDK_UUID`— SDK UUID를 엽니다.
- `TUYA_OPENSDK_AUTHKEY`— SDK AuthKey를 엽니다.

placeholder 값을 대체합니다. 인증:

- ** PID**:[Tuya 제품 / PID](https://pbt.tuya.com/s?p=dd46368ae3840e54f018b2c45dc1550b&u=c38c8fc0a5d14c4f66cae9f0cfcb2a24&t=2).
- ** UUID 및 AuthKey**:[Tuya IoT 플랫폼 – SDK 구매 오픈](https://platform.tuya.com/purchase/index?type=6).

**IM 구성** (선택 사항): TClaw 알림을 수신하거나 메시징 앱을 통해 상호 작용하려면 채널을 설정하십시오.`weixin`, `feishu`, `telegram`, 또는`discord`해당 자격 증명을 작성`tuya_app_config.h`:

```c
// IM configuration
// feishu | telegram | discord | weixin
#define IM_SECRET_CHANNEL_MODE      "feishu"

#define IM_SECRET_FS_APP_ID         ""
#define IM_SECRET_FS_APP_SECRET     ""

#define IM_SECRET_DC_TOKEN          ""
#define IM_SECRET_DC_CHANNEL_ID     ""

#define IM_SECRET_TG_TOKEN          ""
```

- ** Feishu**: 설정`IM_SECRET_CHANNEL_MODE`으로`"feishu"`자주 묻는 질문`IM_SECRET_FS_APP_ID`이름 *`IM_SECRET_FS_APP_SECRET`.
- **Discord**: 설정`IM_SECRET_CHANNEL_MODE`으로`"discord"`자주 묻는 질문`IM_SECRET_DC_TOKEN`이름 *`IM_SECRET_DC_CHANNEL_ID`.
- ** 전보**: 설정`IM_SECRET_CHANNEL_MODE`으로`"telegram"`자주 묻는 질문`IM_SECRET_TG_TOKEN`.
- ** Weixin**: 설정`IM_SECRET_CHANNEL_MODE`으로`"weixin"`. 첫 번째 로그인에서 로그에 인쇄 된 링크를 열고 WeChat과 QR 코드를 바인딩합니다. 리셋 버튼을 눌러 Wi-Fi 프로비저닝 데이터와 Weixin 바인딩을 취소합니다.

```c
[weixin] =========================================================
[weixin]   Weixin QR Login
[weixin]   Open this URL in your PC browser, then scan with WeChat:
[weixin]   https://open.weixin.qq.com/connect/qrconnect?...
[weixin] =========================================================
```

### 6. 구조와 섬광
프로젝트:

```bash
tos.py build
```

성공적인 빌드 후, 펌웨어를 보드에 플래시:

```bash
tos.py flash
```

로그를 볼 직렬 콘솔에 연결:

```bash
tos.py monitor
```

**확장된 결과:** 펌웨어는 오류없이 빌드, ESP32-S3에 플래시, 장치 부츠. 시리얼 모니터를 사용하여 시작을 확인하고, 구성, 클라우드 연결.

### 7. 장치 활성화 및 네트워크 설정
Tuya Cloud 기능을 사용하려면 **Smart Life** 앱에서 장치를 추가하고 Wi-Fi 프로비저닝을 완료하십시오.

#### Smart Life 앱 다운로드
Apple App Store 또는 Android 앱 스토어에서 ** 스마트 라이프 ** ( the生 -)을 설치하거나 QR 코드를 스캔하십시오.[Tuya Smart Life 앱 페이지](https://images.tuyacn.com/fe-static/docs/img/48b9e225-aa49-4e95-9d61-511bb7df27c8.png).

#### 장치 확인은 프로비저닝 모드에서
앱에 디바이스를 추가하기 전에 활성화(provisioning) 모드를 확인합니다. 연속 로그에서 (TuyaOpen)와 비슷한 줄을 볼 수 있어야합니다.

```text
[01-01 00:00:01 ty D][tuya_iot.c:774] STATE_START
[01-01 00:00:01 ty I][tuya_iot.c:792] Activation data read fail, go activation mode...
[01-01 00:00:01 ty D][tuya_main.c:143] Tuya Event ID:1(TUYA_EVENT_BIND_START)
```

#### 앱에 장치를 추가
1. Smart Life 앱에서 add-device Flow를 엽니다.
2. app **Wi-Fi** 및 **블루투스** 권한이 부여됩니다. 그렇지 않으면 앱이 장치를 발견할 수 없습니다.
3. Wi-Fi 네트워크에 장치를 연결하기 위해 앱 단계를 따르십시오.
4. **Home** 또는 **Add device** 화면에서 디바이스가 나타나면, 탭 **Add**를 입력하고 가이드 설정 완료합니다.

:::warning
TuyaOpen 지원 모듈은 **2.4 GHz** Wi-Fi 만 연결됩니다. 5 GHz 네트워크를 사용하여 실패에 대한 규정을 유발합니다.
:::

## 문제 해결
### 잘못된 권한으로 인해 발견되거나 제공되지 않는 장치
인증 데이터가 제대로 작성되지 않은 경우, 장치는 다음과 같은 오류를 로그 할 수 있습니다.

```text
[01-01 00:00:00 ty E][tal_kv.c:269] lfs open UUID_TUYAOPEN -2 err
[01-01 00:00:00 ty E][tuya_authorize.c:107] Authorization read failure.
[01-01 00:00:00 ty W][tuya_main.c:288] Replace the TUYA_OPENSDK_UUID and TUYA_OPENSDK_AUTHKEY contents...
```

로그가 표시되면`uuid`이름 *`authkey`placeholder 값 (예:`uuidxxxxxxxxxxxxxxxx`), 라이센스 (UUID 및 AuthKey)는 제대로 적용되지 않았습니다. TuyaOpen 라이선스 구매[Tuya IoT 플랫폼 – SDK 열기](https://platform.tuya.com/purchase/index?type=6)그리고 세트`TUYA_OPENSDK_UUID`이름 *`TUYA_OPENSDK_AUTHKEY`내 계정`tuya_app_config.h`, 그 후에 재건하고 reflash.

이름 *`productkey`(PID)는 placeholder로 나타납니다, 제품 ID는 놓지 않았습니다. 복사 또는 제품을 만들고 PID를 얻을[Tuya 제품 링크](https://pbt.tuya.com/s?p=dd46368ae3840e54f018b2c45dc1550b&u=c38c8fc0a5d14c4f66cae9f0cfcb2a24&t=2), 그 후에 세트`TUYA_PRODUCT_ID`내 계정`tuya_app_config.h`, 재건 및 재화.


## 이름 *
- [TClaw 개요](/tclaw)
- [빠른 시작 – 환경 설정](/docs/quick-start/enviroment-setup)
- [사용자 정의 장치 MCP (하드웨어 기술)](/docs/tclaw/custom-device-mcp)
- [TClaw 저장소](https://github.com/tuya/DuckyClaw)(외부)
