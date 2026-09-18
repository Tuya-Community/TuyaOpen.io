---
title: 역할 관리
description: "Tuya의 역할 관리는 AI 에이전트가 채택할 수 있는 개인성을 정의합니다. — 이름, 설명, 음성 및 프롬프트 — 공유 역할 라이브러리에서 경계."
keywords:
  - role management
  - tuya ai agent
  - role library
  - voice timbre
  - tuya cloud
---

역할 관리는 당신의 AI 대리인이 채택할 수 있는 개성을 정의합니다 — 이름, 묘사, 음성 및 그것을 어떻게 말하는지 결정하십시오. 공유 라이브러리에서 역할을 만들면 에이전트에 한 개 이상의 역할을 묶어 단일 제품으로 전환할 수 있습니다. AI 인형과 스마트 스토리텔링 로봇과 같은 제품으로 각 역할은 자신의 캐릭터와 채팅 스타일을 운반합니다.

역할은 현재 계정에서 사용되는 모든 것을 다룹니다. 당신은 역할 라이브러리에서 역할을 선택하여 비즈니스 요구에 맞게, 공식 참조 역할과 당신이 자신을 정의하는 것.

## 역할 만들기
[Role Management](https://platform.tuya.com/exp/ai/role) 페이지로 이동하고 **Create Role**를 클릭합니다.

![Role Management page with Create 역할 버튼](https://images.tuyacn.com/content-platform/hestia/1747294735c462e89f833.png)

이 필드를 구성:

- **Role Name**: 역할의 이름.
- **Role 성격 **: 역할의 특색, 배경, 지식 베이스, 관심사 및 전문 기술. 이 필드는 역할의 프롬프트입니다 — 예를 들어, 전문가는 농담이나 이야기를 알려줍니다.
- **Timbre**: 역할에 대한 음성 timbre. 해당 이용 후기에 달린 코멘트가 없습니다. 예를 들어, 미국 시장에 대한 AI 인형은 지역 지원 timbre를 사용해야합니다. 지역 및 언어에 의해 timbre 자원 필터.
- **Language**: 대화에서 지원되는 언어는 text-to-speech (TTS) 및 자동 음성 인식 (ASR)를 모두 덮고 있습니다. 영어를 선택할 때, 두 입력 및 출력 기본값은 영어입니다.
- **Label** : 패널 및 서비스 디스플레이의 그룹 관리에 사용되는 역할의 범주.
- **Avatar**: 패널과 서비스 채널을 통해 업로드 된 이미지. avatar 스타일링을 유지하여 시각적 일관성을 유지하십시오.

![아바타 업로드로 제작 양식](https://images.tuyacn.com/content-platform/hestia/17472922277342b0b3722.png)

## 에이전트에 역할 적용
각 에이전트는 제품 시나리오를 통해 컨텍스트 대화를 전달하기 위해 하나 이상의 역할을 묶을 수 있습니다.

**Path**: **Create Role** > **Variables** > **Role variables** > **Preset 역할 관리**.

이 단계를 따르십시오:

1. [My Agent](https://platform.tuya.com/exp/ai) 페이지에, ** Agent**를 클릭하거나 **Develop**를 **Operation** 컬럼에서 클릭합니다.

![My Agent 목록 개발 작업](https://images.tuyacn.com/content-platform/hestia/1747293990eb1b28e9354.png)

2. **01 Model Configuration** 페이지에서 **Variables**를 찾아 **+**를 클릭하여 **Edit Variables** 페이지를 엽니다.

![Edit 가변 페이지](https://images.tuyacn.com/content-platform/hestia/17472923099c4c4022094.png)

3. Enable **Preset 역할 관리 **. 역할 변수에 맞는 AI 장난감, 스마트 스피커 및 사전 정의된 역할이 필요한 다른 시나리오. 이 기능을 사용하여 제품 제어판을 사용하여 사용자는 역할, timbres 및 개인성을 사용자 정의 할 수 있습니다.

![Preset 역할 관리 토글](https://images.tuyacn.com/content-platform/hestia/17472923608cf39ea0168.png)

4. Click **Preset 역할 관리**, 다음 **Preset 역할 추가 ** 공식 또는 사용자 정의 역할 선택.

![Preset 역할 대화 추가](https://images.tuyacn.com/content-platform/hestia/1747295003c5c81e80474.png)

5. 당신은 변하기 쉬운, 끝 대리인 발달을 가능하게 하고, 장치, AI 장난감의 제어반은 preset 역할 단면도를 보여줍니다. 사용자는 역할 사이에서 전환 할 수 있습니다.

## AI 장난감 패널 작업
AI 장난감 솔루션은 패널과 역할을 사용하는 방법을 보여줍니다. 자세한 내용은 [AI Capabilities Development](https://developer.tuya.com/en/docs/iot/AI-feature?id=Keapy1et1fc63#title-3-Development%20procedure)를 참조하십시오.

1. 당신의 대리인을 가진 제품을 연결하십시오.

![제품에 연결](https://images.tuyacn.com/content-platform/hestia/174729275965bc9c24598.png)

2. 역할 변수 및 preset 역할 구성.

![Role 변수 구성](https://images.tuyacn.com/content-platform/hestia/174729279378111269422.png)

![Preset 역할 구성](https://images.tuyacn.com/content-platform/hestia/1747295003c5c81e80474.png)

3. 공식 패널을 선택하고 패널 상호 작용을 개발하십시오.

![공식 패널 선택](https://images.tuyacn.com/content-platform/hestia/17472931805c7ebbec7fe.png)

4. 패널보기. 사용자는 대리인을 위해 형성된 역할 사이에서 전환할 수 있습니다.

![패널을 보여주는 역할 전환](https://images.tuyacn.com/content-platform/hestia/1747294457a34f739ec88.png)

## 참조
- [Agent Evaluation](agent-evaluation) - 각 역할이 어떻게 반응하는지 테스트
- [Self-control Commands](self-control-commands) - 음성 명령에서 장치 동작을 하자
