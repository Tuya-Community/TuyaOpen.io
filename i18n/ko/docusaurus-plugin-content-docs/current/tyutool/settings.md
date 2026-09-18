---
title: 지원하다
description: "tyutool 설정 페이지에 대한 전체 참조 - 업데이트 센터, 외관 및 언어, 진단 및 로그, 시리얼 로그, 약, 및 설정이 지속되는 방법."
keywords:
  - tyutool settings
  - update center
  - appearance
  - diagnostics
  - log files
  - tuyaopen
---

이 페이지는 **Settings** 페이지에 대한 완전한 참조입니다. 업데이트 센터, 외관 및 언어, 진단 및 로그, 시리얼 로그, 약 및 설정 persist.

## 공지사항
- **Installed build** - 현재 버전.
- ** 업데이트 확인 ** - 데스크탑 (태리) 만; 업데이트 대화 상자를 열고 간격으로 바인딩되지 않습니다.
- ** 자동 검사 간격 ** - 자동 검사 간격은 한 번 시작 및 단지 불에 멈춰. 옵션 :`Off` / `1h` / `6h` / `12h` / `24h`.

<img src="https://images.tuyacn.com/fe-static/docs/img/97046dd3-2b11-4643-9014-e7441daab128.png" alt="Update center — installed version, check-for-updates, auto-check interval" width="800" />

*Update center - 설치된 버전, 체크-for-updates, 자동 검사 간격.*

:::note
웹 빌드에는 자동 업데이트가 없습니다 (타우리 업데이트 플러그인에 따라 다릅니다).
:::

## 외관 및 언어
- ** 테마 ** —`Light` / `Dark` / `System`( 즉시 신청; 체계는 OS를 따릅니다).
- ** 언어** —`Auto` / `简体中文` / `English`(Auto: 중국을 사용`zh`-prefixed 로컬).
- ** 직렬 표시 ** toggle.

<img src="https://images.tuyacn.com/fe-static/docs/img/07891ac3-0fa9-4b40-8bfa-5d769a316379.png" alt="Appearance and language — theme, language, serial-indicator toggle" width="800" />

*Appearance 및 언어 - 테마, 언어, 직렬 인디케이터 toggle. *

:::info
고급 UART 매개 변수는 직렬 디버그 페이지에 살고 (see[직렬 디버그](./serial-debug.md#connection-and-serial-config)).
:::

## 진단 및 로그
- **Debug log toggle** - 마스터 스위치; 꺼낼 때, 백엔드 로그 레벨이 설정됩니다.`off`.
- **로그 레벨 ** — 오류 / Warn / Info / Debug / Trace, Rust 백엔드에 적용`log::set_max_level`.
- ** 로그 폴더를 엽니다.**
- ** 로그보기** — Log Viewer 대화 상자를 엽니다.
- **Export 로그 및 문제가 보고 ** — zips 로그 및 사전 채워진 GitHub 문제 (version/OS 포함); 데스크탑 전용.

<img src="https://images.tuyacn.com/fe-static/docs/img/ddcab093-4b02-4b75-8898-fd18d8a9e706.png" alt="Diagnostics and logs — log toggle, level, open/view/export actions" width="800" />

*Diagnostics 및 로그 - 로그 토글, 레벨, 오픈 / 뷰 / 수출 작업. *

### 로그 파일 토지
로그인`tauri-plugin-log`. 각 세션은`tyutool-<timestamp>.log`; 10 MB 이상 파일 롤`-1.log`, `-2.log`, 오래된 파일은 시작에 정리됩니다. 로그 디렉토리:

- 리눅스:`~/.local/share/tyutool/`
- macOS:`~/Library/Application Support/tyutool/`
- 윈도우:`%APPDATA%\tyutool\`

:::note
레벨은 Rust 백엔드에 적용됩니다.
:::

## 연속 로그
Serial Debug의 자동 저장용 미러 항목: 자동 저장 toggle, 저장 디렉토리 및 타임스탬프 형식.

:::note
이것은 직렬 디버그 페이지와 같은 상점입니다.
:::

## 제품정보
- ** 신청 버전.**
- **Open-source license** - 라이센스 페이지를 엽니다.

## 회사연혁
- **Desktop** 쓰기`settings.json` (`tauri-plugin-store`).
- **웹** 쓰기`localStorage`.
- 테마는 DOM에 적용됩니다 (시스템 모드는 OS 색 구성표를 볼 수 있습니다).

:::note
데스크탑에서,`settings.json`키 이름은 웹과 함께 하나에`localStorage`키.
:::
