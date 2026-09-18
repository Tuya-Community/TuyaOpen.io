---
title: "2단계: 플래시 및 로그"
description: "tos.py flash 명령으로 TuyaOpen 펌웨어를 디바이스에 플래시하고 시리얼 로그를 스트리밍하여 부팅과 실행 상태를 확인합니다."
keywords:
  - 펌웨어 플래시
  - tos.py
  - 시리얼 로그
  - TuyaOpen
  - 굽기
---

플래시는 빌드한 펌웨어 bin을 디바이스에 기록하고, 로그 기능은 디바이스의 시리얼 출력을 스트리밍합니다. 두 작업 모두 애플리케이션 프로젝트 디렉터리에서 `tos.py`로 수행합니다.

## 펌웨어 플래시
디바이스를 PC에 연결합니다. 가상 머신을 사용하면 시리얼 포트를 가상 머신에 매핑하세요.

:::tip
Linux 사용자는 `sudo usermod -aG dialout $USER`를 실행하여 시리얼 포트 권한을 부여한 다음 시스템을 재부팅하세요.
:::

`tos.py flash`를 실행하고 올바른 플래시 포트를 선택합니다. 포트가 여러 개면 순서대로 시도하세요.

:::tip
이 명령은 `tos.py build`를 실행하는 애플리케이션 프로젝트 경로에 있고 프로젝트 컴파일이 성공한 경우에만 사용할 수 있습니다.
:::

```bash
❯ tos.py flash
[INFO]: Run Tuya Uart Tool.
[INFO]: Use default baudrate: [921600]
[INFO]: Use default start address: [0x00]
--------------------
1. /dev/ttyACM1
2. /dev/ttyACM0
--------------------
Select serial port: 2
[INFO]: Waiting Reset ...
[INFO]: unprotect flash OK.
[INFO]: sync baudrate 921600 success
Erasing: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 5 bytes/s   0:00:07 / 0:00:00
[INFO]: Erase flash success
Writing: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╸ 100% 12 bytes/s ⠸ 0:00:38 / 0:00:01
[INFO]: Write flash success
[INFO]: CRC check success
[INFO]: Reboot done
[INFO]: Flash write success.
```

<details>
<summary>`Port [xxx] may be busy` 메시지가 표시되는 경우</summary>

약 1분 기다린 후 다시 시도하세요. 매핑 시간은 가상 머신과 시리얼 칩 모델에 따라 다릅니다.
</details>

## 로그 확인
`tos.py monitor`를 실행하여 로그를 보고 올바른 로그 포트를 선택합니다. 전체 로그를 수집하려면 명령 실행 후 디바이스를 직접 리셋하세요.

```bash
❯ tos.py monitor
[INFO]: Run Tuya Uart Tool.
--------------------
1. /dev/ttyACM1
2. /dev/ttyACM0
--------------------
Select serial port: 1
[INFO]: Open Monitor. (Quit: Ctrl+c)
[01-01 00:03:25 ty D][tuya_health.c:75] feed watchdog
[01-01 00:03:35 ty D][tuya_health.c:75] feed watchdog
[01-01 00:03:45 ty D][tuya_health.c:75] feed watchdog
[01-01 00:03:55 ty D][tuya_health.c:75] feed watchdog
```

로그 확인을 끝내려면 `Ctrl + C`를 누른 다음 Enter를 누릅니다.

```bash
^C[INFO]: Press "Entry" ...

[INFO]: Monitor exit.
```

## FAQ
### 플래시에 실패합니다
다음 현상은 일반적으로 시리얼 포트 드라이버가 없어서 발생합니다.

- 플래시가 `write` 단계에서 멈추거나 반복적으로 실패함
- Mac에서 시리얼 포트를 검색하지 못함

자세한 내용은 [드라이버 설치](../tos-tools/tools-tyutool.md#always-fails-during-write-in-the-burning-process)를 참고하세요.

### T5 시리즈 가상 머신 포트 매핑이 지연됩니다
T5 시리즈 개발 보드는 가상 머신에서 시리얼 포트를 매핑할 때 지연이 발생할 수 있습니다. `ls /dev/tty*`로 디바이스가 보이지만 사용 시 `device busy`가 표시될 수 있습니다. 약 1분 후 정상적으로 사용할 수 있습니다.

### 컴퓨터에 연결된 보드에 시리얼 포트 번호가 두 개 있습니다
T5 시리즈 개발 보드는 플래시용 포트와 로그용 포트를 각각 하나씩 제공합니다. Windows에서는 장치 관리자에서 확인할 수 있으며, 번호가 A인 포트는 다운로드 포트이고 B인 포트는 로그 포트입니다. Linux 또는 Mac에서는 일반적으로 번호가 작은 포트가 플래시 포트이고 큰 포트가 로그 포트입니다. 확실하지 않으면 펌웨어 플래시 시 두 포트를 모두 시험하세요.

### Windows에서 GUI 플래시 도구가 바이러스로 감지됩니다
`tyutool_gui`를 시스템 드라이브가 아닌 드라이브(예: D 드라이브)에 두고 **Windows 보안 - 바이러스 및 위협 방지** 설정의 제외 목록에 디렉터리를 추가하세요.
