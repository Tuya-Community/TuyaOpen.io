---
title: "Hello World — IDE 기본"
description: "코드 없이 공식 예제를 실행하고 보드 선택, 빌드, 플래시 및 로그 확인으로 이어지는 TuyaOpen IDE의 핵심 흐름을 익힙니다."
sidebar_label: "1 Hello World"
sidebar_position: 3
keywords:
  - TuyaOpen IDE
  - TuyaOpen
  - 임베디드 개발
---

이 실습은 **가장 작은 폐쇄 루프**입니다. 코드를 작성하지 않고 IDE에서 공식 예제를 실행합니다. 완료하면 **보드 선택 → 빌드 → 플래시 → 로그 확인**의 핵심 흐름을 익힐 수 있습니다.

## 사전 요구 사항 {/* #prereq */}
- [TuyaOpen IDE 설치](./install.md)를 완료합니다.
- USB 케이블로 컴퓨터에 연결한 **T5 AI Board**(`T5AI_Board`)

## 1단계: 보드 카탈로그에서 시작 {/* #step-1 */}
1. VS Code 또는 Cursor를 열고 TuyaOpen IDE 확장이 활성화되어 있는지 확인합니다.
2. 왼쪽 활동 표시줄의 **Boards** 아이콘을 클릭하여 지원 보드, 칩 및 SoC 플랫폼의 사양을 확인합니다.

   ![IDE 활동 표시줄의 Boards 아이콘](https://images.tuyacn.com/fe-static/docs/img/d2e8dea1-4aad-4a62-b882-0ec1494c4f25.png?imageMogr2/format/webp)

3. 목록에서 **T5AI_Board**를 찾아 상세 페이지를 엽니다. 구매 링크, 회로도, 데이터시트, 소스 코드 및 3D 모델을 확인할 수 있습니다.

   ![보드 카탈로그의 T5AI_Board 상세 페이지](https://images.tuyacn.com/fe-static/docs/img/bec0e87d-2701-4846-81d6-7bd420f5a9b7.png?imageMogr2/format/webp)

## 2단계: 예제 프로젝트 생성 {/* #step-2 */}
1. T5AI_Board 상세 페이지에서 **New Project with This Board**를 클릭합니다.
2. 프로젝트 이름과 위치를 입력하고 **Create project**를 클릭합니다.
3. IDE가 워크스페이스에 프로젝트를 만들고 T5AI_Board 보드 정보를 자동 구성합니다.

## 3단계: 빌드 {/* #step-3 */}
IDE 사이드바에서 **Project Details**를 열고 **Firmware Operations**의 **Compile**을 클릭합니다. 빌드가 끝나면 프로젝트 상세 화면에서 상태를 확인합니다.

```text
[NOTE]:
====================[ BUILD SUCCESS ]===================
 Target    : T5Board_project1_QIO_1.0.0.bin
 Output    : .../dist/T5Board_project1_1.0.0
 Platform  : T5AI
 Chip      : T5AI
 Board     : TUYA_T5AI_BOARD
 Framework : base
========================================================
```

## 4단계: 플래시 {/* #step-4 */}
1. USB로 보드를 연결합니다. T5AI_Board에는 플래시용과 로그용 시리얼 포트가 각각 있습니다. USB 케이블이 전원 전용이 아닌 데이터 케이블인지 확인하세요.
2. **Flash**를 클릭하고 플래시 포트를 선택합니다. 확실하지 않으면 두 포트를 차례로 시도하세요.

```text
write  T5AI  COM4  921600
  File   .../bin/T5Board_project1_QIO_1.0.0.bin  2.0 MiB
  Range  0x00000000 -> 0x001FF1E0

Handshake         OK
Flash ID          OK
Unprotect         OK
Write [1/1]       OK
...
Flash OK  38.9s
```

## 5단계: 시리얼 로그 모니터링 {/* #step-5 */}
**Monitor**를 클릭하고 로그 포트를 선택합니다. `hello world`가 표시되면 첫 TuyaOpen 프로젝트가 실행 중인 것입니다.

```text
[01-01 00:00:00 ty D][tuya_app_main.c:8] hello world
```

:::note
`hello world`가 보이지 않으면 플래시가 끝난 뒤 모니터를 너무 늦게 열었을 가능성이 큽니다. 모니터 터미널을 닫지 말고 다시 플래시하세요.
:::

## 다음 단계 {/* #next */}
IDE 기본을 익혔습니다. [실습 2: your_chat_bot](./chat-bot.md)에서 클라우드 연결 AI 채팅 디바이스를 끝까지 빌드해 보세요.
