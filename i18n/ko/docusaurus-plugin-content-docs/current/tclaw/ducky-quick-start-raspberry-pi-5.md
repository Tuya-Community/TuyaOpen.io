---
title: TClaw 와 라즈베리 파이 5
description: "TClaw 라즈베리 파이 5 빌드에 대한 빠른 시작을 실행하고 Pi에 실행 가능한 리눅스와 Tuya Cloud에 연결."
keywords:
  - duckyclaw
  - tclaw
  - raspberry pi 5
  - ai model deployment on edge devices
  - quick start
---

import { SyncedTabs, SyncedTabItem } from '@site/src/components/SyncedTabs';

# TClaw 빠른 시작 (Raspberry Pi 5)
이 가이드는 라즈베리 파이 5에서 TClaw (이전 DuckyClaw)를 구축하고 실행합니다. Pi는 Linux 호스트 대상입니다. 실행할 수 없습니다 (펌웨어 번쩍이지 않음). Raspberry Pi 5에서 TClaw를 실행하고 스마트 라이프 앱을 통해 Tuya Cloud에 장치를 연결합니다.

## 자주 묻는 질문
- 더 이상[빠른 시작](/docs/quick-start/index)관련 기사 맨끝과 Git를 가진 기본적인 친밀은 도움이 됩니다.

## 제품 정보
- **Raspberry Pi 5** 및 전원 어댑터.
- **Computer** Windows 10/11, Linux(e.g. Ubuntu 20/22/24 LTS), 또는 macOS(Building; cross-compile is Linux-only)를 실행합니다.
- **Tuya Cloud **: 이 데모는 Tuya Cloud 서비스를 사용합니다. 당신은 유효한[라이센스 키 (authorization code)](/docs/quick-start/equipment-authorization)그리고 정확한 PID, UUID, 그리고 AuthKey에`tuya_app_config.h`클라우드 및 LLM 기능

:::note
Raspberry Pi에는 마이크와 스피커 지원(예: USB mic/speaker)가 있는 경우, **ASR**(Automatic Speech Recognition)는 기본 입력 방법으로 활성화되며 IM(messaging apps)와 coexist 할 수 있습니다.
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

버전 출력 및 도구 목록 (git, cmake, make, ninja)을 확인해야합니다. Submodules가 필요하다면 다운로드됩니다.

### 4. 널 윤곽을 선정하십시오
프로젝트 루트에서 config chooser 실행:

```bash
cd ..
tos.py config choice
```

**4**를 입력하여 **RaspberryPi.config**:

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
Choice config file: 4
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

:::tip
** CLI를 통해 런타임에서 IM 구성**
헤더를 편집하지 않고도 IM을 구성할 수 있습니다. 프로그램 실행 후 Enter 키를 눌러 입력`tuya>`포탄, 그 후에 IM 명령을 사용하십시오 (run`im_help`사용법)를 위해:

```text
tuya> im_help
tuya> im_set_channel_mode <telegram|discord|feishu>
tuya> im_set_fs_appid <app_id>
tuya> im_set_fs_appsecret <app_secret>
tuya> im_set_dc_token <token>
tuya> im_set_dc_channel <channel_id>
tuya> im_set_tg_token <token>
```
:::

### 6. 빌드 및 실행
라즈베리 파이는 리눅스 호스트 대상입니다. ** 번쩍이는 것은 없습니다 **. 빌드는 실행할 수 있습니다.`dist/`. 리눅스 PC에서 Pi 또는 cross-compile에서 로컬로 빌드할 수 있습니다.

:::info
**Build 옵션 : ** ** Local build** - Raspberry Pi (권장)에서 직접 빌드 및 실행하십시오. **Cross-compile** — Linux PC에서 빌드한 다음 Pi로 이진을 복사합니다. macOS는 cross-compile을 지원하지 않습니다. Linux 호스트를 사용하거나 Pi에서 빌드하십시오.
:::

빌드 (with)`RaspberryPi.config`선택):

```bash
tos.py build
```

** Pi에 내장 된 경우 : ** 다음 단계로 이동합니다. **PC에서 횡단한 경우:** Pi에 내장된 artifact를 복사합니다. 아래 정확한 경로`dist/`프로젝트 버전에 따라 달라집니다 (예:`dist/DuckyClaw_1.0.1/DuckyClaw_1.0.1.elf`). 예:

```bash
scp -r dist/DuckyClaw_* username@<pi-ip>:~/
```

기타 제품`username`당신의 Pi 사용자와`<pi-ip>`Pi의 IP 주소로.

**Run on the Raspberry Pi:**

```bash
./DuckyClaw_1.0.1.elf
```

(실제 바이너리 이름을 사용하여`dist/`파일 형식

**확장된 결과:** 빌드는 파이에서 실행 가능한 실행, 그리고 장치는 활성화 모드를 입력하므로 스마트 라이프 앱에 추가 할 수 있습니다.

### 7. 장치 활성화 및 네트워크 설정
Tuya Cloud 기능을 사용하려면 **Smart Life** 앱에서 장치를 추가하십시오.

#### Smart Life 앱 다운로드
Apple App Store 또는 Android 앱 스토어에서 ** 스마트 라이프 ** ( the生 -)을 설치하거나 QR 코드를 스캔하십시오.[Tuya Smart Life 앱 페이지](https://images.tuyacn.com/fe-static/docs/img/48b9e225-aa49-4e95-9d61-511bb7df27c8.png).

#### 장치 확인은 프로비저닝 모드에서
장치를 추가하기 전에 활성화 (provisioning) 모드에 있습니다. 터미널에서 또는 로그인하면 다음과 같은 줄을 볼 수 있습니다.

```text
[01-01 00:00:01 ty D][tuya_iot.c:774] STATE_START
[01-01 00:00:01 ty I][tuya_iot.c:792] Activation data read fail, go activation mode...
[01-01 00:00:01 ty D][tuya_main.c:143] Tuya Event ID:1(TUYA_EVENT_BIND_START)
```

#### 장치 추가: QR 코드 (Linux / Raspberry Pi)
많은 TuyaOpen Linux 대상 (Raspberry Pi 포함) 지원**scan-to-provision** : 장치는 터미널의 QR 코드를 보여줍니다. Smart Life 앱으로 스캔하십시오.

1. 장치가 프로비저닝 모드에 있으며, QR 코드는 터미널/로그에서 볼 수 있습니다.
2. **Smart Life** 앱을 열고 **+**(Add device)를 홈 화면에 탭합니다.
3. **Scan**를 선택하고 장치에 의해 표시된 QR 코드를 스캔합니다.
4. in-app 단계에 따라 바인딩 및 네트워크 설정 완료.

![Smart Life 앱을 스캔하여 장치 추가](https://images.tuyacn.com/fe-static/docs/img/5971b072-a264-4324-ba3f-a90f8b899ddd.png)

대체적으로, 정상적인 add-device 교류를 통해 장치를 추가하십시오 (grant Wi-Fi와 Bluetooth 허가, 그 후에 발견하고 장치를 추가하십시오). TuyaOpen 지원 모듈은 **2.4 GHz** Wi-Fi 만 연결됩니다.

## 문제 해결
### 잘못된 권한으로 인해 발견되거나 제공되지 않는 장치
인증 데이터가 제대로 작성되지 않은 경우, 장치는 다음과 같은 오류를 로그 할 수 있습니다.

```text
[01-01 00:00:00 ty E][tal_kv.c:269] lfs open UUID_TUYAOPEN -2 err
[01-01 00:00:00 ty E][tuya_authorize.c:107] Authorization read failure.
[01-01 00:00:00 ty W][tuya_main.c:288] Replace the TUYA_OPENSDK_UUID and TUYA_OPENSDK_AUTHKEY contents...
```

로그가 표시되면`uuid`이름 *`authkey`placeholder 값으로, 라이센스 (UUID 및 AuthKey)는 올바르게 적용되지 않았습니다. TuyaOpen 라이선스 구매[Tuya IoT 플랫폼 – SDK 열기](https://platform.tuya.com/purchase/index?type=6)그리고 세트`TUYA_OPENSDK_UUID`이름 *`TUYA_OPENSDK_AUTHKEY`내 계정`tuya_app_config.h`, 다음 재건 및 재 실행.

이름 *`productkey`(PID)는 placeholder로 나타납니다, 제품 ID는 놓지 않았습니다. 복사 또는 제품을 만들고 PID를 얻을[Tuya 제품 링크](https://pbt.tuya.com/s?p=dd46368ae3840e54f018b2c45dc1550b&u=c38c8fc0a5d14c4f66cae9f0cfcb2a24&t=2), 그 후에 세트`TUYA_PRODUCT_ID`내 계정`tuya_app_config.h`, 재건 및 재 실행.

## 이름 *
- [TClaw 개요](/tclaw)
- [빠른 시작 – 환경 설정](/docs/quick-start/enviroment-setup)
- [빠른 시작 – 장비 승인](/docs/quick-start/equipment-authorization)
- [사용자 정의 장치 MCP (하드웨어 기술)](/docs/tclaw/custom-device-mcp)
- [TClaw 저장소](https://github.com/tuya/DuckyClaw)(외부)
