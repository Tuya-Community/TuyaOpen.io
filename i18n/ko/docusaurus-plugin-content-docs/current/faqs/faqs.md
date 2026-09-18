---
title: 제품 정보
description: "설정, 건물, 번쩍이는 및 페어링에 걸쳐 일반적인 TuyaOpen 문제에 대한 답변, 각 항목은 증상, 원인 및 수정."
keywords:
  - faqs
  - troubleshooting
  - tuyaopen
  - tos.py
  - common issues
---

설정, 건물, 번쩍이는 및 TuyaOpen 장치를 결합하면서 가장 일반적인 문제에 대한 답변. 각 항목은 동일한 모양을 따릅니다: symptom, 왜 일어나고, 그것을 고치는 방법. 브라우저의 찾기 사용 (`Ctrl + F`) 키워드로 점프하거나 아래 섹션을 엽니 다.

:::tip
답변이 문제가 해결되지 않는 경우, 요청[GitHub 문제](https://github.com/tuya/TuyaOpen/issues)또는[공지사항](https://discord.com/invite/yPPShSTttG)전체 장치 로그를 첨부합니다.
:::

## 환경 설정 및 활성화
<details>
<summary><strong>Q1: 나는 어떻게 활성화합니까`tos.py`, 그리고 왜 나는 그것을 재 활성화해야 합니까?</strong></summary>

지원하다`tos.py`, TuyaOpen 루트 디렉토리의 활성화 스크립트를 실행:
- **리눅스/맥:**`. ./export.sh`
- **윈도우 (PowerShell):**`.\export.ps1`(필수)`Set-ExecutionPolicy RemoteSigned -Scope LocalMachine`처음)
- **윈도우 (CMD):**`.\export.bat`

다시 활성화해야합니다.`tos.py`모든 새 터미널 세션에서. 파이썬 가상 환경을 설정하고`PATH`빌드 시스템의 요구사항을 가변한다.

</details>

<details>
<summary><strong>Q2: 나는 어떻게 해야 합니까`tos.py`활성화 실패?</strong></summary>

활성화가 실패한 경우:
- **Linux:** 설치`python3-venv`포장:`sudo apt-get install python3-venv`
- **venv:** 제거`./.venv`디렉토리 및 활성화 스크립트 다시 실행
- ** Python 버전 확인:** Python 3.8 이상 설치
- ** Windows: ** CMD 또는 PowerShell, Git Bash 또는 MSYS2 (모두 호환) 사용

</details>

<details>
<summary><strong>Q3: 왜 Windows에 Git Bash 또는 MSYS2를 사용할 수 없습니까?</strong></summary>

TuyaOpen 빌드 시스템은 Windows (Git Bash, MSYS2)의 Linux-like 터미널 환경과 호환됩니다. 사용 :
- **윈도우 CMD ** (컴 프롬프트)
- **PowerShell **

빌드 스크립트는 Windows-native 경로 처리 및 명령 실행에서 이러한 Linux-like 환경이 제대로 지원하지 않는지.

</details>

<details>
<summary><strong>Q4: TuyaOpen를 위한 체계 필요조건은 무엇입니까?</strong></summary>

공급 능력:
- ** 운영 체제 : ** Windows 10/11, Ubuntu 20.04/22.04/24.04 LTS (권장), macOS (집중 포함)
- ** 도구:** Git >= 2.0.0, CMake >= 3.28.0, >= 3.0.0, Ninja >= 1.6.0, Python >= 3.8.0
- **리눅스 패키지:**`build-essential`, `ninja-build`, `cmake-curses-gui`, `python3-pip`, `python3-venv`
- ** 하드웨어: ** USB 데이터 케이블 및 호환 개발 보드

</details>

<details>
<summary><strong>Q5: 나는 어떻게 나의 환경을 정확하게 설치하고 있습니까?</strong></summary>

활성화 후, 이러한 명령을 실행하여 확인:

```bash
tos.py version    # Should show a version number
tos.py check      # Should verify all tools and download submodules
```

이름 *`tos.py version`(주)`[Unknown version]`, 저장소는 태그가 없습니다 (포크에서 데모). 이것은 기능에 영향을 미치지 않습니다.

</details>

## 문제 해결
<details>
<summary><strong>Q1 : 내 빌드가 누락 된 종점과 실패하면 어떻게해야합니까?</strong></summary>

빌드가 누락된 패키지 또는 모듈에 대한 오류로 실패하면:
- 지원하다`tos.py check`필요한 의존도를 자동으로 설치합니다.
- 파이썬 환경을 확인하고`PATH`설정은 정확합니다.

</details>

<details>
<summary><strong>Q2: 나의 널은 건축 체계에 의해 검출되지 않습니까?</strong></summary>

빌드 스크립트가 보드를 감지하거나 undefined 보드를 보고할 수 없는 경우:
- 올바른 타겟 보드를 선택`tos.py config choice`.
- 탑승구 설정파일 확인`{PATH_TO_APP_PROJECT_ROOT}/config/your_t5_custom_board.config`.
- 더 보기`config`디렉토리는 각 보드의 Kconfig 오버레이 파일을 포함해야 합니다.
- 모든 앱 또는 데모는 모든 보드와 호환되지 않습니다. 앱 문서를 검토하십시오.
- 빌드 시스템은 여러 칩, 보드 버전, 플랫폼 (Linux/MCU)을 지원할 때 코드를 지원합니다.

</details>

<details>
<summary><strong>Q3: 나는 새로운 널 BSP를 창조해야 할 때?</strong></summary>

하드웨어 또는 PCB가 사용자 정의되면 (그는 기존 보드와 일치하지 않습니다) :
- 제품 정보`tos.py new board`BSP 구조 및 구성 파일을 생성하기 위해.
- BSP에서 하드웨어 초기화 및 보드 드라이버를 구분합니다.
- 더 쉬운 정비를 위한 프로젝트의 BSP를 재사용하고 기계설비와 신청 논리 사이에서 청결한 균열.

</details>

<details>
<summary><strong>Q4: 나는 어떻게 편집 오류를 해결합니까?</strong></summary>

빌드가 오류 또는 경고로 실패하거나 중간 컴파일을 중지합니다.
- 문제 해결 단계에 대한 문서 검토.
- 발행이 허가되면, 티켓 열기[GitHub 문제](https://github.com/tuya/TuyaOpen/issues)자주 묻는 질문[공지사항](https://discord.com/invite/yPPShSTttG).
- AI-powered 코딩 도구는 유용한 제안을 제공 할 수 있습니다.

</details>

<details>
<summary><strong>Q5: 왜 컴파일은 Windows에서 느립니다?</strong></summary>

각 파일이 컴파일하는 데 최대 3 초가 걸리는 경우, 또는 프로세스가 갇혀집니다.
- 열린 작업 관리자 (Open Task Manager)`Ctrl + Shift + Esc`), 그 후에 찾아내고 닫습니다`MSPCManagerService`회사연혁
- 도움이되지 않는 경우, 전체 이동`TuyaOpen`비 시스템 드라이브에 디렉토리 (예를 들어, D 드라이브).
- **Windows Security - Virus & Threat Protection**에서 제외 목록으로 디렉토리를 추가하십시오.

</details>

<details>
<summary><strong>Q6: 나는 어떻게 해야 합니까`tos.py check`실패?</strong></summary>

체크 명령이 오류를 보고하는 경우:
- **도구가 설치되어 있지 않거나 버전이 적습니다. ** 해당 도구 설치 또는 업그레이드 (git >= 2.0.0, cmake >= 3.28.0, make >= 3.0.0, ninja >= 1.6.0).
- **Submodule 다운로드 실패:** 실행`git submodule update --init`TuyaOpen 루트 디렉토리에.
- **Python venv 문제:** 활성화가 실패한 경우, 삭제`./.venv`디렉토리 및 reactivate. 확인하기`python3-venv`설치 (`sudo apt-get install python3-venv`Linux에서.

</details>

## 제품정보
<details>
<summary><strong>Q1: 나는 어떻게 쌍 정보를 재설정하고 네트워크 구성?</strong></summary>

장치의 페어링 정보 및 네트워크 구성을 재설정하려면:

- ** 표준 리셋 (최대 MCU 장치):**
  - 나머지 (RESET) 장치는 5 초 이내에 세 번.
  - 네 번째 부팅에서 네트워크 및 페어링 상태는 자동으로 삭제됩니다.
  - 모든 모델별 리셋 절차에 대한 장치의 문서에 대한 참조.

- **리눅스 런타임:**
Linux에서 개발 또는 테스트 할 때, 페어링 및 네트워크 상태에 대한 지속적인 키 가치 데이터를 삭제하여`tuyadb`폴더. 이 폴더는 네트워크와 페어링 정보를 캐시합니다. 예를 들면:

  ```bash
  rm -rf tuyadb/*
  ```

</details>

## 구성 및 Kconfig 문제
<details>
<summary><strong>Q1: 나는 어떻게 정확한 널 윤곽을 선정합니까?</strong></summary>

제품 정보`tos.py config choice`pre-validated 윤곽에서 선택하기 위하여:
- 명령은 프로젝트의 모든 사용 가능한 보드 구성을 나열합니다.
- 구성은 두 소스에서, 우선순위:
  1. 프로젝트 별`config/`이름 *
  2. 글로벌`boards/`이름 *
- 선택 후 구성이 저장됩니다.`app_default.config`프로젝트 디렉토리에.

</details>

<details>
<summary><strong>Q2 : 차이점은 무엇입니까?`config choice`이름 *`config menu`?</strong></summary>

- **`tos.py config choice`:** 가능한 옵션에서 사전 설정된 보드 설정을 선택합니다. 이것은 신속하게 시작하는 것이 좋습니다.
- **`tos.py config menu`:**는 모든 Kconfig 옵션을 수동으로 구성하는 대화형 메뉴(menuconfig)를 엽니다. 고급 사용자 정의에 대 한 이것을 사용 합니다.

둘 다 가동은 도구 체인을 변경할 수 있기 때문에, 실행하기 전에 깊은 청소를 실행합니다.

</details>

<details>
<summary><strong>Q3: 나는 왜 menuconfig에 있는 특정 Kconfig 선택권을 선택하거나 deselect 할 수 없습니까?</strong></summary>

옵션이 밖으로 회색 또는 변경할 수 없는 경우:
- 옵션이 강제 될 수 있습니다.`select`이사회의 성명`Kconfig`파일 (예를 들면,`boards/T5AI/TUYA_T5AI_EVB/Kconfig`).
- 아래 옵션`select ENABLE_XXX`자동으로 활성화되어 수동으로 비활성화 할 수 없습니다.
- 이 변경하려면 보드의 Kconfig 파일을 직접 수정합니다.

</details>

<details>
<summary><strong>Q4: 나는 어떻게 재사용을 위한 나의 주문 윤곽을 저장합니까?</strong></summary>

설정 수정 후`tos.py config menu`:
- 지원하다`tos.py config save`현재 구성을 저장합니다.
- (예를 들어,)`my_custom_board.config`).
- 구성은 프로젝트에 저장됩니다.`config/`이름 *
- 나중에 선택할 수 있습니다.`tos.py config choice`.

</details>

<details>
<summary><strong>Q5: 화살표 열쇠는 안으로 작동하지 않습니다`config menu`Windows에서. 나는 무엇을해야합니까?</strong></summary>

단말 호환성 문제입니다. 태그 :
- 대안 키: ** (왼쪽), **j** (아래), **k** (위), **l** (오른쪽).
- CMD와 PowerShell 사이의 전환은 더 나은 작동을 찾을 수 있습니다.
- spacebar to to to toggle 옵션 및 확인을 입력합니다.

</details>

## 인증 및 라이센스 문제
<details>
<summary><strong>Q1: TuyaOpen 라이센스와 TuyaOS 라이센스의 차이점은 무엇입니까?</strong></summary>

- **TuyaOpen 라이센스:**는 TuyaOpen Framework에 대한 UUID 및 AuthKey 특성으로 구성됩니다. 다음은 TuyaOS 라이센스와 교환할 수 없습니다.
- **TuyaOS 라이센스: ** TuyaOS 프로젝트에만 사용; 그것은 TuyaOpen Framework와 함께 사용할 수 없습니다.
- 항상 TuyaOpen 프로젝트의 TuyaOpen-specific UUID와 AuthKey를 사용합니다.

</details>

<details>
<summary><strong>Q2 : TuyaOpen 라이센스 (UUID 및 AuthKey)를 얻는 방법은 무엇입니까?</strong></summary>

TuyaOpen 라이센스를 세 가지 방법으로 얻을 수 있습니다:
- **Method 1 : ** 2 무료 라이센스를 주장[Tuya 개발자 플랫폼](https://platform.tuya.com/). 보기[개발자 라이센스 받기](./get-developer-license.md).
- **Method 2 : ** TuyaOpen 라이센스를 사용하여 모듈을 미리 flashed 구매[Tuya IoT 플랫폼](https://platform.tuya.com/purchase/index?type=6).
- **Method 3 : **에서 구매[Tuya의 공식 Taobao 상점](https://item.taobao.com/item.htm?ft=t&id=911596682625).

</details>

<details>
<summary><strong>Q3: 나는 어떻게 나의 장치에 허가 정보를 쓰고 있습니까?</strong></summary>

두 가지 방법 :
- **만드 라인:** 실행`tos.py monitor -b 115200`, 다음 입력`auth uuidxxxxxxxxxxxxxxxx keyxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`대화 형 프롬프트에서.
- ** 코드:** 편집`tuya_config.h`프로젝트에서, 설정`TUYA_OPENSDK_UUID`이름 *`TUYA_OPENSDK_AUTHKEY`매크로, 다시 빌드 및 플래시.

인증 명령을 위해 (로그 포트가 아닌) 플래시를 직렬 포트를 사용합니다.

</details>

<details>
<summary><strong>Q4: 나는 어떻게 나의 허가를 정확하게 쓰고 있었습니까?</strong></summary>

쓰기 허가 후에:
- 지원하다`tos.py monitor`장치에 연결하기.
- 이름 *`auth-read`대화 형 프롬프트에서 명령.
- UUID와 AuthKey를 볼 수 있습니다.
- 자주 묻는 질문`xxxxxxxxxxxxxxxx`실제 값 대신, 권한은 올바르게 작성되지 않았습니다.

</details>

<details>
<summary><strong>Q5: “Authorization 읽기 실패”는 장치 기록에서 의미합니까?</strong></summary>

오류가 발생하면:

```
[ty E][tal_kv.c:269] lfs open UUID_TUYAOPEN -2 err
[ty E][tuya_authorize.c:107] Authorization read failure.
```

이 장치는 저장에서 허가 정보를 읽을 수 없습니다, 허가가 제대로 작성되지 않았기 때문에 또는 손상되었습니다. 위의 방법 중 하나와 허가를 다시 작성하고 장치를 재부팅합니다.

</details>

## 플래시 및 장치 부팅
<details>
<summary><strong>Q1: 왜 번쩍이는 실패, 또는 왜 나의 장치가 검출되지 않습니까?</strong></summary>

플래시 명령이 실패하거나 장치가 감지되지 않은 경우:
- 데이터 USB 케이블을 사용하여 충전 전용 케이블이 아닙니다.
- 플랫폼을위한 직렬 포트 드라이버를 설치합니다.
- 다른 USB 항구 또는 다른 케이블을 시도하십시오.
- 항구를 직접 지정하십시오 (예를 들면,`tos.py flash --port /dev/ttyUSB0`); 자세한 내용은 번쩍이는 가이드를 참조하십시오.
- 다운로드 모드 또는 부팅 모드에서 장치를 넣어 필요한 경우.
- 장치 연결 확인`lsusb`(Linux) 또는 장치 관리자 (Windows).

</details>

<details>
<summary><strong>Q2: 나의 장치가 부팅하지 않는 경우에 나는 무엇을 해야 합니까?</strong></summary>

장치가 표시가 없는 경우에, 응답 없음, 또는 힘에 후에 serial 산출 없음:
- USB 케이블과 항구를 검사하십시오.
- 전력 공급을 검열하십시오; 다른 항구 또는 접합기를 시도하십시오.
- 단락을 찾습니다.
- 펌웨어를 제거.
- 부팅 중에 직렬 출력의 오류 메시지가 표시됩니다.

</details>

<details>
<summary><strong>Q3: 나는 왜 “Port [xxx]가 번쩍일 때 바쁠지도 모른다는 것을 봅니까?</strong></summary>

이 메시지를 보시려면:
- 대략 1 분 및 재기.
- 지연은 가상 기계 및 직렬 칩 모델과 다릅니다.
- 사실상 기계에 있는 T5 시리즈 널을 위해, 항구가 유효하기 전에 알려진 지연이 있습니다.
- 포트가 존재하는 것을 확인할 수 있습니다.`ls /dev/tty*`(리눅스), 그러나 당신은 사용 가능하기 전에 기다릴 필요가 있습니다.

</details>

<details>
<summary><strong>Q4: 나의 T5 널 쇼는 왜 2개의 직렬 포트입니까?</strong></summary>

T5 시리즈 발달 널에는 2개의 분리되는 직렬 포트가 있습니다:
- ** 다운로드 / 플래시 포트 :** 펌웨어 번쩍이고 권한화에 사용됩니다.
- **로그 포트:** 장치 로그 및 모니터링에 사용됩니다.

포트를 식별하려면:
- **Windows:** 장치 관리자 확인. Letter A를 가진 항구는 다운로드 항구입니다; 편지 B는 통나무 항구입니다.
- **Linux/Mac:** 일반적으로, 더 작은 숫자를 가진 장치는 플래시 포트이고, 더 큰 수는 로그 포트입니다.
- 당신이 불확실한 경우에, 번쩍일 때 항구를 시험하십시오.

</details>

<details>
<summary><strong>Q5 : Linux에서 직렬 포트 권한 오류를 어떻게 수정합니까?</strong></summary>

직렬 포트에 액세스 할 때 권한이 종료 된 오류를 얻는 경우 :

```bash
sudo usermod -aG dialout $USER
```

그럼 **reboot your system** for the changes to take effect. 재부팅 후, sudo없이 직렬 포트에 액세스 할 수 있습니다.

</details>

<details>
<summary><strong>Q6: 왜 tyutool gui는 Windows에서 바이러스로 떠납니다?</strong></summary>

이것은 Windows Defender에서 거짓 긍정적입니다. 해결하기:
- 이름 *`tyutool_gui`비 시스템 드라이브에 도구 (예를 들어, D : 드라이브).
- **Windows Security - Virus & Threat Protection**에서 제외 목록으로 디렉토리를 추가하십시오.

도구는 안전하고 TuyaOpen 프로젝트에서 제공됩니다.

</details>

## 연결 문제
<details>
<summary><strong>Q1: 나의 장치가 Wi-Fi에 연결할 수 없는 경우에?</strong></summary>

장치가 Wi-Fi에 연결되지 않으면 페어링:
- 2.4 GHz Wi-Fi 네트워크 사용; 5 GHz는 지원되지 않습니다.
- Wi-Fi SSID와 비밀번호가 올바른지 확인합니다.
- 라우터에 가까운 장치를 이동합니다.
- MAC 필터링과 같은 라우터 설정을 확인합니다.
- 장치를 재설정하고 다시 페어링 시도.

문제가 발생하면 묻습니다.[GitHub 문제](https://github.com/tuya/TuyaOpen/issues)전체 장치 로그를 첨부합니다.

</details>

<details>
<summary><strong>Q2: 나는 어떻게 구름 연결 문제를 해결합니까?</strong></summary>

장치가 앱에 나타나지 않으면 클라우드에 연결할 수 없습니다.
- UUID와 AuthKey가 정확하고 TuyaOpen-specific을 확인합니다.
- 장치를 온라인으로 확인하고 인터넷 연결을 가지고 있는지 확인하십시오.
- Tuya Cloud 서비스 상태를 확인하십시오.
- 연결 오류에 대한 장치 로그를 검토합니다.
- 문제가 발생할 경우 장치를 재설정하고 다시 설정하십시오.

문제가 발생하면 묻습니다.[GitHub 문제](https://github.com/tuya/TuyaOpen/issues)전체 장치 로그를 첨부합니다.

</details>

## Peripheral 및 기능 문제
<details>
<summary><strong>Q1: 나의 스크린이 공백 또는 표시하지 않는 경우에 나는 무엇을 합니까?</strong></summary>

빈 화면이나 표시 오류를 볼 경우:
- 올바른 디스플레이 대상 보드를 선택했는지 확인하십시오.
- menuconfig의 표시 설정 확인.
- LVGL을 확인해보세요.
- serial monitor에 있는 표시 초기화 메시지를 찾습니다.
- 데모 앱이 화면 출력을 지원합니다.

</details>

<details>
<summary><strong>Q2: 왜 AI 대리인이 반응하지 않습니까?</strong></summary>

음성 또는 AI 명령에 대한 응답이 없을 경우:
- 장치의 네트워크 연결을 확인합니다.
- AI 서비스 오류를 위한 serial monitor를 검토합니다.
- 마이크가 연결 및 작업 확인.
- 깨진 검 탐지가 활성화되고 기능합니다.
- 장치가 결합되어 Tuya Cloud에 연결됩니다.
- AI Agent 서비스는 프로젝트 구성에서 활성화됩니다.

</details>

<details>
<summary><strong>Q3: 오디오 코덱 드라이버(마이크로폰/스피커)를 어떻게 활성화하나요?</strong></summary>

오디오 기능을 활성화하려면:
- **First는 오디오 코덱과 하드웨어가 지원됩니다. ** 사용하려는 오디오 코덱 하드웨어 (microphone/speaker)를 지원하기 위해 보드의 문서 및 Kconfig 파일을 확인하십시오.
- 지원하다`tos.py config menu`프로젝트 디렉토리에.
- 오디오 코덱 구성 옵션에 Navigate.
- 보드에 적합한 오디오 코덱을 사용할 수 있습니다.
- 널의 Kconfig 파일이 포함되어 있는지 확인하십시오.`select ENABLE_AUDIO_CODECS`오디오가 사전 설정되면.
- 사전 등록 된 오디오 장치가 없다면 오디오 드라이버를 직접 구현하십시오.
- 구성 변경 후 프로젝트를 다시 합니다.

</details>

<details>
<summary><strong>Q4: 왜 나의 주변 운전사 (버튼, 전시, 등) 일하지 않습니까?</strong></summary>

주변 장치가 작동하지 않는 경우:
- 주변을 검증하는 것은 Kconfig에서 활성화됩니다 (`tos.py config menu`).
- 모두 보기`src/peripherals/<peripheral>/Kconfig`이름 *`boards/<platform>/<board>/Kconfig`필수 구성이 있습니다.
- 보드의 하드웨어 초기화 코드가 주변을 등록했는지 확인하십시오.
- 드라이버 초기화 오류에 대한 serial logs를 검토합니다.
- 하드웨어 연결 및 핀 구성이 보드 설정과 일치하도록 검증합니다.

</details>

### Tuya Cloud / Tuya Smart Life 앱과 페어링 문제
<details>
<summary><strong>Q1: 왜 제 장치가 쌍 도중 앱에서 검출되지 않습니까?</strong></summary>

장치가 페어링 중에 앱에 나타나지 않는 경우:
- UUID 및 인증 라이센스 코드를 올바르게 구성합니다.
- 네트워크 설정 재설정:
  - **MCU: ** 재시작 (RESET) 5 초 이내에 세 번 장치.
  - **Linux/Ubuntu:** 제거`tuyadb`캐시 폴더를 다시 시도.

</details>

<details>
<summary><strong>Q2: 나는 페어링 도중 Wi-Fi에 연결할 수 없는 경우에?</strong></summary>

연결이 앱에서 Wi-Fi 설정 중에 실패하면:
- 네트워크가 2.4 GHz인지 확인하십시오. 대부분의 Wi-Fi MCU는 5 GHz를 지원하지 않습니다.
  - ** MCU: ** 라우터가 2.4 GHz를 지원합니다.
  - **Linux:** 네트워크 도구 사용 (`ipconfig`그리고 이와 유사한) 연결성을 확인하고 하드웨어 인터페이스를 확인합니다.
- Wi-Fi 비밀번호가 올바르게 입력되도록하십시오.
- 라우터에 가까운 장치를 이동합니다.

</details>

<details>
<summary><strong>Q3: 나의 장치가 앱에 나타나는 경우에 무엇 그러나 페어링 후에 반응하지 않습니까?</strong></summary>

장치가 앱에서 보여지면 페어링 후 응답되지 않습니다.
- 오류 메시지의 시리얼 모니터를 확인합니다.
- 클라우드 연결 정보의 장치 로그를 검토합니다.
- 필요한 DP(Data Points)가 펌웨어에서 구현되도록 합니다.
- 장치를 검증하는 것은 실제로 온라인입니다 (로그에서 클라우드 연결 상태를 확인).
- 펌웨어가 클라우드에서 DP 명령을 올바르게 처리했는지 확인하십시오.

</details>

<details>
<summary><strong>Q4: 나는 페어링 모드로 장치를 넣는 방법?</strong></summary>

대부분의 TuyaOpen 데모 (예 :`switch_demo`이름 *`your_chat_bot`):
- **Quick 재설정 방법 : ** 다시 시작 (RESET) 장치 5 초 이내에 세 번.
- 장치는 네 번째 부팅에 페어링 모드를 입력합니다.
- 페어링 모드 표시기(예를 들어,`STATE_START`, `TUYA_EVENT_BIND_START`).
- 일부 장치에는 물리적 버튼이나 다른 방법이 있습니다. 장치의 문서를 참조하십시오.

</details>

<details>
<summary><strong>Q5: 나는 어떻게 정당한 허가 때문에 쌍이 실패하면 합니까?</strong></summary>

장치 로그가 승인 오류를 표시하는 경우:
- UUID와 AuthKey를 올바르게 작성합니다 (사용`auth-read`명령).
- TuyaOpen-specific licenses API 웹 사이트
- 인증 값이 표시되지 않음을 확인`xxxxxxxxxxxxxxxx`로그에.
- 권한 정보를 다시 작성하고 장치를 재부팅합니다.
- 자세한 내용은[회사소개](../quick-start/equipment-authorization.md).

</details>

## 프로젝트 생성 및 구조
<details>
<summary><strong>Q1: 나는 어떻게 새로운 프로젝트를 창조합니까?</strong></summary>

제품 정보`tos.py new project`새로운 응용 프로그램을 만들려면:
- 프로젝트 이름의 명령 프롬프트.
- 프레임 워크 템플릿 지정`--framework`매개변수 (기본값은`base`; `arduino`또한 지원됩니다.
- 템플릿은에서 복사됩니다`tools/app_template/`이름 *
- 창조 후, 실행`tos.py config choice`보드 구성을 선택합니다.
- 그런 다음`tos.py build`.

</details>

<details>
<summary><strong>Q2: 나는 어디에서 실행해야 합니까`tos.py`명령?</strong></summary>

항상 실행`tos.py`**application 프로젝트 디렉토리에서 명령 **, TuyaOpen 루트에서:
- 정확한:`cd apps/tuya_cloud/switch_demo && tos.py build`
- Wrong: TuyaOpen root 디렉토리에서 실행하는 오류가 발생합니다.

프로젝트 디렉토리는 어디에 있습니다`CMakeLists.txt`이름 *`app_default.config`파일이 있습니다.

</details>

<details>
<summary><strong>Q3 : 차이점은 무엇입니까?`apps/`이름 *`examples/`감독?</strong></summary>

- **`apps/`:** 전체 기능 응용 및 데모 (예를 들면,`tuya_cloud/switch_demo`, `tuya.ai/your_chat_bot`).
- **`examples/`:** 작은 코드 예제는 특정 기능 또는 API를 보여줍니다.
- 두 가지 모두`tos.py build`널 윤곽을 선정한 후에.
- 학습 또는 개발 요구 사항에 따라 선택하십시오.

</details>

<details>
<summary><strong>Q4: 나는 어떻게 artifacts를 건설합니까?</strong></summary>

2개의 정리 선택권:
- ** 표준 청소 : **`tos.py clean`빌드 캐시를 제거하고 구성을 유지하십시오.
- **Force 청소 : **`tos.py clean -f`깊은 청소를 수행하고 전체 삭제`.build`이름 *

board 구성을 전환하거나 문제를 해결할 때 힘이 깨끗합니다.

</details>

## Git 및 하위 모듈 문제
<details>
<summary><strong>Q1: 나는 어떻게 TuyaOpen 의존도를 새롭게 합니까?</strong></summary>

주요 TuyaOpen 저장소를 업데이트 한 후 (`git pull`또는`git checkout`):
- 지원하다`tos.py update`관련 의존도를 자동으로 업데이트합니다.
- 이 명령 업데이트 툴체인 의존성`platform/platform_config.yaml`.
- Dependencies는 그 구성에서 지정된 커밋으로 전환됩니다.

</details>

## Linux 런타임 지원
TuyaOpen은 주로 MCU 장치를 위해 설계되었지만, Linux 런타임 환경을 지원합니다 (예를 들어, ARM/x86/x64). 다양한 하드웨어 플랫폼에서 Tuya의 프레임 워크를 개발할 수 있도록 필요한 하드웨어 통합을 처리할 수 있습니다.

<details>
<summary><strong>Q1: Linux 플랫폼과 아키텍처가 지원됩니까?</strong></summary>

TuyaOpen Framework는 다음과 같은 일반적인 Linux 아키텍처를 컴파일합니다.
- x86 (32 비트)
- x64 (64 비트)
- ARM (32 비트 및 64 비트, 예를 들어 라즈베리 파이와 유사한 SBCs)

툴체인을 구성해야 할 수도 있습니다.

</details>

<details>
<summary><strong>Q2 : Linux에서 하드웨어 지원 (GPIO, SPI, I2C, PWM 등)을 어떻게 구현합니까?</strong></summary>

하드웨어 액세스가 직접되는 MCU 환경과 달리 Linux 시스템은 커널 및 보드 지원 패키지 (BSP)를 통해 하드웨어를 관리합니다. TuyaOpen 하드웨어와 상호 작용:
- **Implement Linux 드라이버 : ** 하드웨어가 Linux 장치 드라이버 또는 표준 sysfs 인터페이스를 통해 액세스 할 수 있는지 확인하십시오.
- ** TuyaOpen codebase의 브리지를 지정합니다. ** TuyaOpen 드라이버 인터페이스에 따라 하드웨어 인터페이스 코드 (GPIO, SPI, PWM, QSPI, 카메라 등)를 작성 또는 어댑터에 대한 책임이 있습니다.
- ** 기존 인터페이스:** 참조 Linux 라이브러리와 같은`wiringPi`이름 *`libgpiod`, 또는 커널`/dev/*`노드, 일반적인 주변 장치.

</details>

<details>
<summary><strong>Q3: TuyaOpen는 리눅스 하드웨어 요약을 제공합니까?</strong></summary>

TuyaOpen은 클라우드 연결성, 장치 페어링 및 AI Agent 기능을 위한 프레임 워크 및 요약을 제공합니다. 하드웨어 주변 지원 (GPIO, SPI, PWM, Camera, QSPI 등) ** 플랫폼의 커널과 BSP 기능을 사용하여 개발자**에 의해 구현됩니다.

</details>

<details>
<summary><strong>Q4: 나는 어떻게 나의 리눅스 플랫폼을 위한 TuyaOpen를 교차하?</strong></summary>

- 올바른 크로스 컴파일러 툴체인을 사용하여 대상(예를 들어,`arm-linux-gnueabihf-gcc`ARM의 경우
- TuyaOpen 빌드 구성 (보통 CMake 또는 Makefile을 통해)을 수정하여 대상 아키텍처와 sysroot에 맞게합니다.
- 하드웨어 및 문제 해결 의존성에 대한 바이너리를 테스트 (예 : 누락`libc`버전 또는 장치 드라이버).

</details>

<details>
<summary><strong>Q5: 나는 나의 장치가 enumerated 또는 기계설비가 열릴 경우에 해야 합니까?</strong></summary>

- 커널 또는 BSP를 활성화하고 필요한 장치 파일 내보내기 (예를 들어,`/dev/spidev*`, `/dev/video*`, `/sys/class/gpio/*`).
- 권한 확인 : 충분한 특전으로 앱을 실행하거나 udev 규칙을 조정할 수 있습니다.
- 표준 Linux 도구와 디버그`dmesg`, `lsmod`·`ls /dev`.

</details>

<details>
<summary><strong>Q6: 나는 리눅스에 Tuya 구름과 AI 대리인 특징을 이용할 수 있습니까?</strong></summary>

예. TuyaOpen은 플랫폼 전체에 클라우드 연결 및 AI 에이전트 기능을 처리합니다. 하드웨어 브리지 구현을 제공 할 때, 장치 논리의 나머지, 페어링, 클라우드 통합, OTA 및 AI 기능은 MCU 배포와 동일하게 작동합니다.

</details>

## 더 보기
- [개발자 라이센스 받기](./get-developer-license.md)– 클라우드 기능을 위한 Claim 무료 인증 코드.
- [회사소개](../quick-start/equipment-authorization.md)– UUID와 AuthKey를 직렬 CLI에 쓰기.
