---
title: "Vibe Coding 스킬"
description: "TuyaOpen IDE 안에 설치하여 AI Agent가 개발 루프를 실행하도록 하는 스킬입니다. 시나리오별로 정리된 바로 붙여넣을 수 있는 프롬프트를 제공합니다."
sidebar_label: "Vibe Coding 스킬"
sidebar_position: 7
keywords:
  - TuyaOpen IDE
  - TuyaOpen
  - 임베디드 개발
---

[실습](./hello-world.md)의 많은 작업은 TuyaOpen IDE에 직접 설치하는 **스킬**로 수행할 수 있어 효율이 크게 향상됩니다. 아래 프롬프트를 시나리오별로 복사하여 사용하세요.

![Vibe Coding 스킬 개요](https://images.tuyacn.com/fe-static/docs/img/9e4c7436-44d7-49b0-a556-ef0e9a68c16e.png?imageMogr2/format/webp)

## 1. 하드웨어 주변 장치(권장 시작점) {/* #hardware */}
**`hardware-vibe-coding`**을 실행합니다. 보드의 핀 리소스를 먼저 읽고 확인한 뒤 코드를 작성합니다.

```text
보드의 LED를 켜고 호흡등 효과를 만들어 줘.
버튼을 초기화해 줘. 짧게 누르면 켜짐/꺼짐을 전환하고 길게 누르면 리셋해 줘.
보드에 3.5인치 LCD가 있어. 중앙에 "Hello Tuya"를 표시하고 매초 카운터를 갱신해 줘.
PC에서 볼 수 있도록 UART로 매초 "alive"를 출력해 줘.
ADC 핀 전압을 읽고 값을 로그에 출력해 줘.
```

## 2. IoT 제품을 처음부터 끝까지 빌드 {/* #product */}
**`smart-product-dev`**를 실행합니다. 요구 사항에서 플랫폼의 제품 생성, DP 정의 및 펌웨어 생성까지 진행합니다.

```text
"스마트 무드등"을 만들고 싶어. 켜기/끄기, 밝기 조절, 타이머 끄기를 지원하고 아이디어부터 플래시 가능한 결과까지 진행해 줘.
다음에 무엇을 해야 해? (현재 스캐폴드 상태를 읽고 다음 단계를 제안해 줘.)
```

## 3. Tuya Developer Platform 작업(제품 / DP / PID) {/* #platform */}
**`tuya-iot-platform`**을 실행합니다. CLI를 통해 바인딩된 제품을 조작합니다.

```text
바인딩된 제품 sqgdjgvuhuqc7qa2의 데이터 포인트(DP)를 나열해 줘.
이 제품에 bool 타입의 DP를 추가해 줘. 코드는 switch_1이고 이름은 "Switch"야.
플랫폼에 어떤 제품이 있는지 나열해 줘.
```

## 4. 빌드 / 플래시 / 디버그 루프 {/* #dev-loop */}
**`tuyaopen-dev-loop`**, **`tuyaopen-build`**, **`tuyaopen-debug-helper`**를 실행합니다.

```text
펌웨어를 빌드해 줘.
백그라운드에서 디바이스 시리얼 로그를 수집하고 실행 중 ERROR가 있으면 알려 줘.
개발 루프를 시작해 줘: 빌드 → 플래시 → 로그 모니터링, 오류를 분석하고 수정 사항을 반복해 줘.
코딩 스타일을 준수하는지 확인해 줘.
```

## 5. 미니 앱 / 디바이스 패널 {/* #panel */}
**`smart-panel-dev`**를 실행합니다. 조명, 소켓, 로봇 청소기 및 IPC와 같은 범주로 라우팅됩니다.

```text
이 디바이스용 제어 패널 미니 앱을 만들어 줘.
패널에 전력 사용량 차트를 추가해 줘(chart-library / energy-stats 실행).
이 디바이스의 미니 앱 패널을 위한 PRD 요구 사항 문서를 작성해 줘.
```

## 다음 단계 {/* #next */}
클라우드 Agent를 직접 빌드할 준비가 되었다면 [Agent 개발 가이드](./agent-development.md)를 참고하세요.
