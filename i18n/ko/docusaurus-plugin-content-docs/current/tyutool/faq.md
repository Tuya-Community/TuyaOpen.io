---
title: 제품 정보
description: "tyutool - 포트 및 연결, 번쩍이는 실패, 허가 및 플랫폼 문제 (리눅스 공백 창, Windows WebView2), 및 로그와 버그를보고하는 방법."
keywords:
  - tyutool faq
  - troubleshooting
  - flashing fails
  - authorize fails
  - linux blank window
  - webview2
  - tuyaopen
---


이 페이지는 problem-first: 그것은 **symptom**를 나열하고, 진단하고 수정하는 가장 짧은 경로를 제공합니다. CLI 스니펫과 GUI 동작 모두 포함되어 있습니다.

## 연결 / 포트
### 장치 / 직렬 포트 드롭다운에서
**Symptom : ** 포트 선택기는 빈 또는`tyutool list-ports`아무것도 인쇄.

1. 플러그 / 플러그, 스왑 케이블, 스왑 포트.
2. 드라이버 설치 (CH340/CP2102/FT232).
3. CLI로 재 검사:

```bash
tyutool list-ports
tyutool usb-port-survey   # raw USB metadata for cross-system debugging
```

4. macOS에서 보기[macOS 직렬 권한](#macos-serial-permission).
5. 리눅스에서, 당신은 확인`dialout` / `tty`그룹 및 로그 아웃 및 뒤로.

:::tip
새로 고침하거나 앱을 엽니다.
:::

### macOS 직렬 권한
**Symptom:** 포트가 보이지만 권한 오류가 발생합니다.

```bash
sudo dseditgroup -o edit -a $USER -t user dialout
```

다음 로그인 및 뒤로. 새로운 macOS에서 **Privacy & Security → Accessories**를 허용하십시오. 프로젝트 보기[README 문제 해결](https://github.com/tuya/tyutool#readme).

### 항구 바쁜
**일반:**`Permission denied` / `Device or resource busy`.

다른 프로그램을 닫으십시오 (Serial Debug, Arduino IDE, minicom, picocom); 같은 시간에 GUI와 CLI를 실행하십시오; 당신은 자동 릴리스에 돌릴 수 있습니다.

## 관련 기사
### 플래시 실패/손잡이 실패
**일반:** Handshake 실패 / 동기화 실패.

원인: 잘못된 칩 모형 (`-d bk7231n` / `-d esp32` / `-d t5ai`); 잘못된 baud (첫번째 115200에 하락); 다운로드 모드에서는 장치 (`tyutool reset`); 배선/힘.

:::warning
첫 번째는 최소한의 재개발을 수행합니다.`tyutool read -d <chip> -p <port> -l 0x1000`.
:::

### Erase 보고서 "unaligned"
**일반:**`unaligned` / `address not aligned` / `sector boundary`.

Erase는 4 KiB 정렬을 요구합니다:

```bash
# Correct: both start and length aligned to 4 KiB
tyutool erase -d bk7231n -s 0x0000 -l 0x200000
tyutool erase -d bk7231n -s 0x8000 -l 0x4000

# Wrong: 0x9000 is not a multiple of 4 KiB
tyutool erase -d bk7231n -s 0x9000 -l 0x1000   # ❌ reports unaligned
```

:::tip
GUI의 정렬 동작을 사용, 또는 여러 라운드`0x1000`.
:::

### 회사 소개
**Symptom: ** 단계는 장시간 동안 0%, 또는 반복적으로 앉아.

버드 (921600 → 460800 → 115200); 스왑 케이블 / 파워; 디버그 로그 또는 CLI에 회전`--verbose`debug/trace (위치 설정[CLI · 글로벌 옵션](./cli.md#output-modes)); 우아하게 취소`Ctrl+C`.

## 이름 *
### 인증 실패
**Symptom :**는 실패 / UUID / AuthKey가 유효하지 않습니다.

Credentials는 one-device-once입니다 (사용한 것은 보류됩니다); 첫번째는 auth-read를 합니다`tyutool authorize -p <port>`; `--uuid` / `--authkey`자주 묻는 질문`-d`타이밍.

:::note
Credentials는 Tuya 개발자 플랫폼에서 와서 칩 / 제품에 바인딩됩니다.
:::

### Credential 디스플레이 문제
**Symptom:** 전체 값을 볼 수 없거나, 수율 복사`****`.

기본적으로 GUI 마스크 — Show 또는 복사 버튼을 클릭합니다. CLI로, auth-read:

```bash
tyutool authorize -p <port>
tyutool authorize -p <port> -d esp32   # read with chip-specific timing
```

복사 후 클립보드를 신속하게 지우십시오.

## 회사연혁
### 리눅스 빈 창 (WebKit compositing failure)
```bash
export WEBKIT_DISABLE_COMPOSITING_MODE=1
```

그런 다음 AppImage를 실행하십시오.`~/.bashrc`. 프로젝트 보기 README.

### Windows 누락 된 WebView2
Edge WebView2 Runtime Evergreen를 설치하십시오. 다운로드 페이지 → Evergreen Standalone Installer → 실행 및 재시작.

:::note
기업/오프라인을 위해, 조정 버전 따로따로 포장은 역시 작동합니다.
:::

## 로그 및 피드백
### 버그를보고하는 방법 (로그에)
1. **Export / 오픈 로그.** GUI: Settings → Diagnostics → View logs → "Export logs and report the problem" = zip + 사전 채워진 문제. CLI: 읽기`log:`배너의 선;`--verbose`stderr에 인쇄.
2. ** 문제 템플릿을 사용하십시오.**[문제 → 새로운 문제](https://github.com/tuya/tyutool/issues/new/choose), 선택 버그 보고서.
3. **키 필드에 Fill :** 버전 / OS / 칩 / 플랫폼 / 보드 / 단계 / 실제 대 기대.
4. ** 세션 로그.** zip을 문제로 드래그하거나 CLI 붙여넣기`tyutool-<timestamp>.log`.

:::warning
로그는 민감한 정보 (UUID/AuthKey)를 포함할 수 있습니다. — 마스크를 먼저.
:::
