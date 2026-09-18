---
title: 직렬 디버그
description: "tyutool Serial Debug 페이지에 대한 전체 참조 - 직렬 터미널 및 로그 모니터 연결, UART 설정, 재설정, ASCII / HF보기, 전송 바, 키워드 필터 탭 및 자동 릴리스 / 자동 저장."
keywords:
  - tyutool serial debug
  - uart config
  - hex view
  - filter tabs
  - log monitor
  - tuyaopen
---


이 페이지는 **Serial Debug** 페이지에 대한 완전한 참조입니다: 직렬 터미널 및 로그 모니터 연결 및 UART 구성, 장치 재설정, ASCII/Hex 로그 조회, 보낸 바, 헥스 팝업, 키워드 필터 탭, 자동 릴리스 및 자동 저장.

## 제품정보
가득 차있는 serial 맨끝. Keep-alive: 다른 페이지로 이동하고 다시 와서, 배경 RX 스트림은 중단되지 않습니다.

<img src="https://images.tuyacn.com/fe-static/docs/img/5f579be0-52ec-478e-9447-29a2bf79b125.png" alt="Serial Debug overview — terminal workspace with log view and send bar" width="800" />

*Serial Debug 개요 - 로그보기를 가진 터미널 워크스페이스 및 보내 bar.*

:::note
여기에서 직렬 포트는 공유됩니다[회사 소개](./flash.md)사이트 맵
:::

## 연결 및 직렬 구성
직렬 선택 (rescan) / 연결 연결 / 상태 표시기. 고급 UART 설정은 직렬 설정 대화 상자에서 라이브 :

|제품 설명|제품 설명|지원하다|
| :-- | :-- | :-- |
|Baud 비율| `9600`–`921600`+ 사용자 정의|설정할 때, 기본값은 현재 플래시 칩의 로그 배율|
|데이터 비트| `5` / `6` / `7` / `8` |프레임 당 데이터 비트|
|이름 *| `none` / `odd` / `even` |없음 / 확률 / 심지어|
|비트를 중지| `1` / `1.5` / `2` |프레임 당 비트를 중지|

:::tip[Baud는 칩을 따릅니다]
플래시 페이지에 칩을 먼저 선택하고 직렬 디버깅 속도를 자동으로 정렬합니다.
:::

## 장치 재설정
DTR/RTS를 통해 재설정. 현재 세션 포트를 재설정하거나 다른 제어 포트를 재설정 (다른 포트를 대상으로 실행 시간 칩 ID를 사용).

:::note
재설정은 연결과 동일하지 않습니다.
:::

## 공지사항
ASCII 전망/헥사 전망 (8/16/32 바이트 행); ANSI 착색 toggle; 글꼴 크기 10-18px; 타임스탬프 도글; 방향 배지 (TX/RX/SYS); 명확한; 수출.

<img src="https://images.tuyacn.com/fe-static/docs/img/d8590f95-79d6-4c7b-8d54-b9f329bb499c.png" alt="Log rows with RX badges and timestamps, with the Serial Settings dialog open — data bits, parity, stop bits, auto-release for flash, hex view, and ANSI color parsing" width="800" />

*Log는 RX 배지 및 타임 스탬프와 함께 연속 설정 대화 상자가 열립니다. 데이터 비트, 패리티, 스톱 비트, 플래시 용 자동 해제, 육각보기 및 ANSI 색상 패싱. *

:::warning[3000 라인 가시 창 캡]
더 오래된 줄은 눈에 보이는 창이 3000 줄을 초과하면 제거됩니다. 자동 저장 또는 수출을 즉시 사용하십시오.
:::

## 회사 소개
ASCII 또는 육 형태; 선택`\r\n`; 압박`Enter`보내; 역사는 20까지 입장, 주기를 가진 붙듭니다`↑` / `↓`.

<img src="https://images.tuyacn.com/fe-static/docs/img/130eb3bf-cd00-40fb-87b3-82deb276f568.png" alt="Send bar with a command list open above the input, and live log rows with RX badges in the background" width="800" />

* 입력 위의 명령 목록이 열리고, 배경의 RX 배지와 라이브 로그 행을 보냅니다.*

## 육 팝업
RX 데이터의 스팬을 선택하고 팝업은 hex + ASCII 측면을 보여줍니다.

:::tip
구조 바이너리 검사에 유용한 (protocol 프레임, 권한 replies).
:::

## 필터 탭
각 키워드를 자신의 탭합니다. 키워드는 일반 텍스트 또는 정규 표현식이 될 수 있습니다. 탭은 6 색상을 통해 사이클을 설정하고, 탭은 일치 행만 보여줍니다. "All"는 전체보기와 "로드 이전"페이지를 다시 복원합니다. 필터링은 전체 세션에 대해 서버 측을 실행합니다.

<img src="https://images.tuyacn.com/fe-static/docs/img/c4ab9e3e-91da-4df8-a3de-0bd38433c5c8.png" alt="Filter tabs — keyword tabs with live match counts and color coding" width="800" />

*Filter 탭 - 라이브 매치 카운트 및 컬러 코딩이있는 키워드 탭. *

## 자동 해제 / 자동 저장
- **Auto-release**는 포트 컨텐츠를 해결합니다. 플래시 페이지가 포트를 필요로 할 때, 직렬 디버그가 자동으로 해제됩니다 (옵션 확인 프롬프트가 켜질 수 있음). 번쩍이는 끝, 연결은 자동으로 복원됩니다.
- **Auto-save** 전체 세션 로그 유지 (또한 아래 설정 가능)[지원하다](./settings.md#serial-logs)). 저장 디렉토리를 설정; 파일 이름은 타임스탬프; 쓰기는 chunked (최대 128 KiB).

:::note
수동 수출 = 현재 눈에 보이는 창; 자동 득점 = 전체 세션.
:::
