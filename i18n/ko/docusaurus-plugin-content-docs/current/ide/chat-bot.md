---
title: "your_chat_bot — 클라우드 AI Agent"
description: "예제에서 클래식 AI + IoT 프로젝트를 만들고 빌드, 플래시, 인증 및 페어링까지 수행하는 IDE의 클라우드 IoT / AI Agent 흐름입니다."
sidebar_label: "2 your_chat_bot"
sidebar_position: 4
keywords:
  - TuyaOpen IDE
  - TuyaOpen
  - 임베디드 개발
---

이 실습은 전형적인 TuyaOpen **AI + IoT** 프로젝트입니다. IDE 안에서 클라우드 IoT와 AI Agent를 개발하는 흐름을 다룹니다.

## 두 가지 개발 모드 {/* #modes */}
| 모드 | 대상 | 단계 |
| --- | --- | --- |
| **Basic**(초보자 권장) | TuyaOpen 또는 AI를 처음 사용하는 경우 | 공식 **기본 PID**를 바로 사용합니다(기능과 Agent 구성이 이미 완료됨). |
| **Advanced** | 자체 제품을 빌드하는 경우 | 1. PID 생성 · 2. Agent 생성 · 3. PID에 Agent 바인딩 |

이 실습은 빠르게 세 영역 통합을 경험할 수 있는 **Basic** 모드를 사용합니다.

## 1단계: 예제에서 프로젝트 생성 {/* #step-1 */}
1. IDE 사이드바에서 **Demos**를 클릭하고 **AI voice chatbot**을 선택한 뒤 **Create project**를 클릭합니다.
2. **Tuya T5AI**, **Tuya T5AI-Board** 및 선택적으로 3.5인치 LCD 터치 화면을 선택합니다.
3. 안내에 따라 OEM 예제 PID를 가져옵니다. 브라우저에서 Tuya Developer Platform이 열립니다. PID는 [PID](/docs/quick-start#pid)를 참고하세요.
4. **Copy product**를 클릭하고 제품명과 모델 번호를 입력한 뒤 확인합니다.
5. 왼쪽에서 PID를 복사합니다.
6. TuyaOpen IDE로 돌아와 PID를 붙여넣고 **Next**를 클릭합니다.

:::note
**복사하는 이유:** 기본 PID와 같은 기능을 가진 제품을 빠르게 만들 수 있습니다. AI + IoT 제품에서는 해당 제품에 이미 바인딩된 Agent도 복사됩니다.
:::

## 2단계: 빌드 및 플래시 {/* #step-2 */}
1. **Cloud IoT/Agent Dev**에서 클라우드 제품이 바인딩되었는지 확인합니다.
2. **Project Details**를 열고 빌드와 플래시를 실행합니다. 화면 아래에서 Vibe Coding 하드웨어 보기와 핀 상태를 확인할 수 있습니다.
3. 플래시가 성공하면 터치 화면이 켜집니다.

## 3단계: 디바이스 인증 {/* #step-3 */}
라이선스 키(UUID + AuthKey)는 디바이스가 클라우드에 연결할 때 사용하는 자격 증명이며 [Tuya IoT Platform](https://platform.tuya.com/)에서 발급합니다.

1. 라이선스 키의 개념과 발급 방법은 [TuyaOpen 라이선스 키](/docs/quick-start#tuyaopen-dedicated-license) 및 [인증 가이드](/pricing-guide)를 참고합니다. 이 실습에서는 먼저 무료 라이선스 키 2개를 요청합니다.
2. [Tuya Developer Platform](https://platform.tuya.com/)에서 **AI Products → Product Development**를 열고 1단계에서 만든 OEM 예제 제품을 찾습니다.
3. 오른쪽에서 **Continue development**를 클릭합니다.
4. **Hardware Development** 탭의 클라우드 액세스 하드웨어 영역에서 **Get 2 Free Licenses**를 클릭합니다.
5. 라이선스 키 목록을 다운로드합니다.
6. IDE의 **Licenses** 패널(**Key Management**)에 라이선스 키를 입력하고 AI를 사용하여 디바이스에 기록합니다.

## 4단계: 디바이스 페어링 {/* #step-4 */}
1. 공식 [디바이스 네트워크 설정](/docs/quick-start/device-network-configuration) 절차에 따라 디바이스를 페어링합니다.
2. 페어링 후 미니 앱 패널에서 대화할 AI Agent를 전환할 수 있습니다.
3. 보드의 **KEY** 버튼을 두 번 눌러 대화 모드를 전환합니다. 현재 프로젝트의 호출어는 “你好涂鸦” 및 “Hey Tuya”입니다.

:::info
**다음 단계 — 자체 Agent 빌드(Advanced 모드):** [Agent 개발 가이드](./agent-development.md)를 참고하세요.
:::

## 다음 단계 {/* #next */}
클라우드 연결 디바이스가 완성되었습니다. [실습 3: 미니 앱 패널](./miniapp-panel.md)에서 휴대폰 제어 패널을 빌드하세요.
