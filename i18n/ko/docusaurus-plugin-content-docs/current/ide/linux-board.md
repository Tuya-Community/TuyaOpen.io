---
title: "Linux 보드 Hello World"
description: "IDE에서 Raspberry Pi와 같은 Linux 보드에 가장 간단한 Hello World를 배포합니다. 빌드, SSH 배포 및 실행으로 이어지는 Linux 대상 크로스 배포 흐름을 설명합니다."
sidebar_label: "4 Linux 보드"
sidebar_position: 6
keywords:
  - TuyaOpen IDE
  - TuyaOpen
  - 임베디드 개발
---

이 실습은 Linux 보드용 실습 1입니다. IDE에서 한 번의 흐름으로 Raspberry Pi와 같은 Linux 보드에 **Hello World**를 배포합니다.

## 사전 요구 사항 {/* #prereq */}
- OS가 설치되고 인터넷과 **SSH**가 활성화된 **Raspberry Pi 4B / 5** 또는 다른 Linux 보드
- 컴퓨터와 보드가 같은 LAN에 있고 보드 IP로 `ping`할 수 있어야 함
- 확장 설치 및 SDK 초기화 완료([TuyaOpen IDE 설치](./install.md))

:::note
Linux 보드에서는 IDE가 **크로스 배포**를 사용합니다. 컴퓨터에서 실행 파일을 컴파일한 후 SSH로 보드에 전송하고 실행합니다. USB 연결은 필요하지 않습니다.
:::

## Linux 보드와 MCU 보드의 차이 {/* #diff */}
T5AI_Board는 시리얼로 플래시하지만 Linux 보드에는 시리얼 플래시 단계가 없습니다.

| 상단 버튼 | MCU 보드(T5AI_Board) | Linux 보드(Raspberry Pi) |
| --- | --- | --- |
| **Build** | 펌웨어 빌드 | Linux 실행 파일 빌드 |
| **Flash** | 시리얼로 펌웨어 플래시 | **Deploy**: SCP로 실행 파일 전송 |
| **Monitor** | 시리얼 로그 읽기 | **Run**: SSH로 로그인하여 앱 실행 |
| **Clean** | 빌드 캐시 삭제 | 빌드 캐시 삭제 |

Linux 보드의 Project Details에는 SSH 정보를 입력하는 **Board connection** 섹션도 표시됩니다.

## 1단계: Linux 보드 프로젝트 생성 {/* #step-1 */}
1. 왼쪽 활동 표시줄에서 보드 카탈로그 아이콘을 클릭합니다.
2. 목록에서 **Raspberry Pi** 또는 실제 Linux 보드를 찾고 `Create project from this board`를 클릭합니다.
3. **Project Details**에서 **Flash**가 **Deploy**, **Monitor**가 **Run**으로 바뀌고 **Board connection** 양식이 표시되는지 확인합니다.

## 2단계: SSH 연결 구성 {/* #step-2 */}
보드가 켜져 있고 같은 LAN에 있으며 SSH가 실행 중인지 확인합니다. 사용자 이름과 비밀번호는 OS를 플래시할 때 설정한 값이고 IP는 보드에서 `hostname -I`로 확인합니다.

| 필드 | 입력 값 |
| --- | --- |
| **Username** | OS 설정 시 지정한 사용자 이름(예: `pi`) |
| **IP address** | 보드의 LAN IP(예: `192.168.1.50`) |
| **SSH port** | 기본값 `22`; 변경하지 않았다면 비워 둠 |
| **Login method** | `Password`(권장) 또는 고급 사용자의 `Private key` |
| **Password** | 해당 비밀번호 |
| **Remote directory** | 보드에서 앱이 실행될 위치(기본 `~/tuyaopen-apps/<project name>`) |

입력 후 **Save connection**, **Test SSH**를 클릭합니다.

```bash
SSH OK
Linux raspberrypi 6.x.x ... aarch64 GNU/Linux
pi
```

:::note
비밀번호는 편집기의 보안 자격 증명 저장소에 보관되고, 나머지 연결 정보는 프로젝트의 `.tuyaopen/ide/deploy.json`에 저장됩니다. 명령 팔레트의 `TuyaOpen: Configure Board SSH / Deploy`로도 구성할 수 있습니다.
:::

## 3단계: 빌드 {/* #step-3 */}
상단의 **Build**를 클릭합니다. 성공하면 Linux 실행 파일(`.elf`)이 생성됩니다.

```text
[NOTE]:
====================[ BUILD SUCCESS ]===================
 Target    : <project name>_QIO_1.0.0.bin
 Output    : /home/<your-username>/TuyaOpenIDE/projects/<project name>/source/embedded/dist/<project name>_1.0.0
 Platform  : LINUX
 Chip      : Raspberry_Pi
 Board     : Raspberry_Pi
 Framework : base
========================================================
```

## 4단계: 배포 {/* #step-4 */}
상단의 **Deploy**를 클릭합니다. IDE가 **SSH 채널**을 통해 원격 보드로 ELF를 전송합니다.

```text
>>> Uploading ELF…
>>> Deploy complete.
>>> Remote path: /home/pi/tuyaopen-apps/<project name>/<project name>_1.0.0.elf
>>> Local path: /home/<your-username>/TuyaOpenIDE/projects/<project name>/source/embedded/dist/<project name>_1.0.0/<project name>_1.0.0.elf (<size> bytes)
```

:::tip
`.elf file not found — build the project first`가 표시되면 3단계로 돌아가 다시 빌드하세요.
:::

## 5단계: 실행 {/* #step-5 */}
상단의 **Run**을 클릭합니다. IDE가 전용 터미널에서 `ssh -t`로 보드에 로그인하고 실행 파일을 포그라운드로 실행합니다.

```text
[01-01 00:00:00 ty N][sample_project.c:38] Application information:
...
[01-01 00:00:00 ty D][sample_project.c:48] hello world
```

끝에 **`hello world`**가 표시되면 완료입니다. 중지하려면 `Ctrl + C`를 누르거나 터미널을 닫습니다.

## 리소스 파일을 보드로 전송 {/* #resources */}
1. 프로젝트의 `source/embedded/resources/`에 이미지, 동영상 및 3D 모델을 넣습니다.
2. 명령 팔레트(`Ctrl+Shift+P`)에서 **`TuyaOpen: Upload Resources to Board`**를 실행하거나 **`Upload Resources`** 버튼을 클릭합니다.

리소스는 보드의 `<remote directory>/resources/`에 저장됩니다. 이 기능은 Linux 보드의 크로스 배포에서만 사용할 수 있습니다.

## Ubuntu(X86)로 디버깅 {/* #ubuntu */}
Raspberry Pi 외에도 IDE는 X86_64 Linux 대상인 **Ubuntu**를 지원합니다. ELF 빌드 → SSH 배포 → 실행 흐름은 동일합니다. 프로젝트 생성 시 Ubuntu 보드 유형을 선택하세요.

## FAQ {/* #faq */}
- **비밀번호 없이 로그인하거나 sshpass가 없음** — Password 방식의 비대화형 사용에는 컴퓨터에 `sshpass`를 설치합니다.
- **Deploy에서 `.elf file not found` 표시** — 먼저 3단계에서 빌드하고 산출물이 생성되었는지 확인합니다.
- **코드를 변경한 후 재배포** — Build → Deploy → Run 순서로 수행합니다.

## 다음 단계 {/* #next */}
| 원하는 작업 | 이동 위치 |
| --- | --- |
| Raspberry Pi GPIO / I2C / SPI / UART 사용 | [Raspberry Pi 주변 장치 예제](/docs/hardware/Linux/raspberry-pi/Examples/peripherals-raspberry-pi) |
| 다른 Linux 보드로 전환 | 프로젝트 생성 시 해당 보드 유형 선택 |
| Raspberry Pi 40핀 핀아웃 | [Raspberry Pi 5 GPIO 레퍼런스](/docs/hardware/Linux/raspberry-pi/Examples/raspberry-pi) |
| 클라우드 연결 AI 음성 앱 배포 | [실습 2: your_chat_bot](./chat-bot.md) |
