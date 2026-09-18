---
title: 명령 선
description: "완전한 tyutool 명령 선 참고 — 임명, 세계적인 선택권, 11 subcommands (쓰기, 읽기, 지우기, 명부 항구, 재시동, 감시자, 허가, 갱신, 봉사, 완료, usb 포트 생존), 지원된 칩 및 산출 형태."
keywords:
  - tyutool cli
  - command line
  - write firmware
  - authorize
  - monitor
  - tuyaopen
---


`tyutool`명령줄 도구입니다. 이 페이지는 완전한 CLI 참조를 docs에 포트합니다.

## CLI를 사용할 때
scripting / CI / headless 서버 / 터미널을 선호할 때. 그것은 동일을 공유`tyutool-core`데스크톱 앱으로 번쩍이는 논리.

## 설치하기
다운로드[GitHub 출시](https://github.com/tuya/tyutool/releases). 릴리스 자산 (five platform; 각 릴리스는 또한 선박`latest.json`이름 *`cli.<platform>.sha256`):

|회사연혁|투자정보|
| :-- | :-- |
|리눅스 x86 64| `tyutool-cli_linux_x86_64_*.tar.gz` |
|리눅스 aarch64| `tyutool-cli_linux_aarch64_*.tar.gz` |
|맥 OS X86 64| `tyutool-cli_macos_x86_64_*.tar.gz` |
|맥 OS aarch64| `tyutool-cli_macos_aarch64_*.tar.gz` |
|윈도우 x86 64| `tyutool-cli_windows_x86_64_*.zip` |

설치 :

```bash
# Linux / macOS (tar.gz)
tar -xzf tyutool-cli_linux_x86_64_*.tar.gz
sudo mv tyutool_cli /usr/local/bin/tyutool
chmod +x /usr/local/bin/tyutool

# Windows (.zip): extract tyutool_cli.exe and add its folder to PATH
```

인증:

```bash
tyutool --version
tyutool list-ports
```

:::note
CLI는 자체 업데이트를 지원합니다:`tyutool update`.
:::

## 글로벌 옵션
|옵션 정보|이름 *|
| :-- | :-- |
| `--verbose` |stderr에 Emit 진단 로그|
| `--plain` |일반 ASCII, 스피너 없음|

로그 파일: 세션 당 하나,`tyutool-<timestamp>.log`, 10 MB에서 회전, 시작에 청소. 위치:

- 리눅스:`~/.local/share/tyutool/`
- macOS:`~/Library/Application Support/tyutool/`
- 윈도우:`%APPDATA%\tyutool\`

:::note
압연된 파일 naming 이다`tyutool-<timestamp>.log` → `-1.log` → `-2.log`.
:::

항구 선택: 만약에`-p`omitted이고 단 하나 항구가 있습니다, 그것은 자동적으로 사용됩니다; 다수 항구로, 당신은 상호 작용하게 (CI에서 이 과실에서)를 선택합니다.

## 서브콤맨드
### 쓰기 - 플래시 펌웨어
```bash
tyutool write -d <chip> -f <firmware> [-p <port> -b <baud> -s <start> --end <end>]
```

예:

```bash
tyutool write -d bk7231n -f firmware.bin -p /dev/ttyUSB0
```

### 읽기 - 플래시를 읽으십시오
```bash
tyutool read -d <chip> -f <out> [-p <port> -b <baud> -s <start> -l <length>]
```

`length`기본값으로`0x200000`.

### 지우기 — 지우기
```bash
tyutool erase -d <chip> [-p <port> -b <baud> -s <start> -l <length>]
```

이 지역`start … start+length`; 몇몇 칩은 분야 줄맞춤을 요구합니다.

### list-ports - 목록 직렬 포트
```bash
tyutool list-ports [--json]
```

과태 산출: 탭 격리된 란`path / vid:pid / usb_interface / port_role / display_name`.

### 리셋 — DTR/RTS 하드웨어 리셋
```bash
tyutool reset [-p <port> -d <device>]
```

`device`기본값으로`bk7231n`.

### 모니터 - 실시간 시리얼 모니터
```bash
tyutool monitor [-p <port> -b <baud> -d <device> -l]
```

Streams to stdout, forwards keypresses interactively; 출구로`Ctrl+]`또는`Ctrl+C`. 비 TTY에서는 라인으로 선을 전달합니다. 제품 정보`t5ai`기본 모니터 baud는 460800입니다. 다른 사람들을 위해 115200 (참고: 이것은 플래시 배드와 다릅니다).

예제:

```bash
tyutool monitor -p /dev/ttyUSB0
tyutool monitor -d bk7231n -b 115200
tyutool monitor -d t5ai
```

### 인증 (alias)`auth`) — TuyaOpen 허가
```bash
tyutool authorize [-p <port> -d <device> --uuid <uuid> --authkey <authkey>]
```

쓰기는 모두 통과해야합니다`uuid`이름 *`authkey`; auth-read에 대 한 통행. Credentials는 KV 저장에 기록되고 OTP/eFuse를 점화하지 않습니다 (OTP는 GUI 배치 전용입니다).

예제 읽기 :

```bash
tyutool authorize -p /dev/ttyUSB0
```

예제 쓰기:

```bash
tyutool authorize -p /dev/ttyUSB0 --uuid <uuid> --authkey <authkey>
```

### 업데이트 — 자동 업데이트
```bash
tyutool update [--check] [--source github|tuya]
```

### 서비스 - WebSocket 서버
```bash
tyutool serve
```

Dev/IDE 모드; 기본 포트`9527`; tuyaopen-ide를 봉사합니다.

### 완료 — Shell 완료 생성
```bash
tyutool completions bash
tyutool completions zsh
tyutool completions fish
```

(또한:`powershell`, `elvish`.)

### USB-port-survey - USB/serial 메타데이터 덤프
```bash
tyutool usb-port-survey
```

Cross-system 디버깅을 위한 JSON으로 Raw USB/serial metadata를 출력합니다.

## 지원된 칩
|칩 칩|기본 배드|
| :-- | :-- |
| `bk7231n` | 921600 |
| `t2` | 921600 |
| `t3` | 921600 |
| `t1` | 921600 |
| `t5ai` | 921600 |
| `ln882h` | 115200 |
| `esp32` | 460800 |
| `esp32c3` | 460800 |
| `esp32c6` | 460800 |
| `esp32p4` | 460800 |
| `esp32s3` | 460800 |

칩 이름은 case-insensitive입니다;`-b`배를 덮습니다.

## 출력 모드
- ** 리치 모드 ** (TTY) : 스피너 / ANSI 진행 막대 /`✓`.
- ** Plain 모드 ** (CI) : 고정 폭 단계 라벨, 긴 단계는 각 10 %를 틱합니다.

일반 모드 샘플 출력 (a)`write`BK7231N에:

```text
tyutool v3.2.7  linux/x86_64
[scan ] scanning serial ports
[conn ] connecting /dev/ttyUSB0 @ 921600
[write] 0%   10%  20%  30%  40%  50%  60%  70%  80%  90%  100%
[ok   ] write complete
```

성공 종료 코드는 0입니다.

:::note[캔셀]
기간 중`write` / `read` / `erase` / `authorize`, `Ctrl+C`우아하게 출구 (항구를 닫고 보고`Cancelled`); `monitor`코드와 출구 0 에`Ctrl+]` / `Ctrl+C`.
:::

## 개발자 참조
:::note[Authoritative markdown 소스]
해당 마크다운은 저장소에 살고 있습니다.[`docs/cli.md```를 호출합니다.](https://github.com/tuya/tyutool/blob/refactor/v3/docs/cli.md). 모든 CLI 변경은 업데이트해야 합니다.`docs/cli.md`첫 번째 (Repo의 경우)`AGENTS.md`). 이 페이지는 거울입니다; markdown는 권한입니다.
:::
