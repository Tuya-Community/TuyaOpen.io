---
title: 에이전트 트리거
description: "Agent는 장치 이벤트 화재가 발생했을 때 Tuya Auto-invoke에 트리거합니다. 경고, 제어 및 크로스 시스템 자동화에 대한 DP 조건을 경계하십시오."
keywords:
  - agent trigger
  - tuya ai agent
  - device event
  - dp condition
  - tuya cloud
---

에이전트 트리거는 장치가 특정 이벤트 조건을 충족 할 때 작업을 실행하는 에이전트를 자동으로 호출합니다. 예를 들어, 사용자를 식별, 장치 제어, 또는 시스템 전체에 자동 조정. 장치 이벤트에 방아쇠를 묶습니다. 에이전트는 그 이벤트 화재를 할 때마다 구성 된 목소리에 응답합니다.

## 일반적인 시나리오
- ** 전원 관리**: 장치 배터리가 중요하게 낮을 때 사용자에게 경고하십시오.
- ** 환경 감시 **: 실시간 온도와 습도를 기반으로 에어컨 또는 제습기를 조정하는 사용자를 통지합니다.
- **: 장치 고장 및 운영 예외의 즉시 사용자를 따르십시오.

## 푸시 알림과는 다릅니다.
- **Flexible Rule**: granular data point(DP) 조건 매칭으로 이벤트를 구성합니다.
- ** 간단한 설정**: 기존 이벤트에 바인딩을 클릭하면 중복 구성을 제거합니다.
- **Smart 응답 **: Prompt 템플릿은 AI 대화를 자동으로 생성합니다.
- **Natural experience**: 역할 인식 상호 작용은 인간화, 개인화 된 표현을 제공합니다.

## 필수품
-**Device**: [Wukong SDK v3.12.14 이상](https://developer.tuya.com/en/docs/iot-device-dev/wukongai_version_release?id=Kegae21edhfyb)로 디바이스 펌웨어 개발
- **플랫폼 구성**:
- 에이전트는 구성 된 트리거, 제품의 이벤트 규칙이 활성화됩니다.
- 제품은 대리인과 연결됩니다. 자세한 내용은 [AI Capabilities Development](https://developer.tuya.com/en/docs/iot/AI-feature?id=Keapy1et1fc63)를 참조하십시오.

## 프로세스 개요
1. [Create device rule event](https://developer.tuya.com/en/docs/iot/agent_trigger?id=Keoimoadosdoi#DP): DP 조건의 장치 이벤트를 Low-battery, 과도한 노이즈, 고온 규칙으로 구성합니다.
2. [Configure Agent 트리거](https://developer.tuya.com/en/docs/iot/agent_trigger?id=Keoimoadosdoi#Trigger): 기존 이벤트에 트리거를 연결하고 프롬프트를 전송하는 것과 같은 작업 실행 논리를 설정합니다.
3. 장치는 런타임에 방아쇠 상태를 만날 때, 방아쇠 불 및 사용자는 똑똑한 통보 또는 활동 결과를 받습니다.

## 디바이스 규칙 이벤트 만들기
**장치 PID** 및 **DP 조건**에서 장치 이벤트를 구성합니다.

1. [Tuya Developer Platform](https://platform.tuya.com/)로 이동합니다. 왼쪽 내비게이션에서 **AI Agent** > **Agent Configuration** > **Device Event Management**를 선택하십시오.
2. **Create**를 오른쪽 상단 모서리에 클릭. **장치 이벤트 트리거 ** 타입은 현재 지원됩니다.

![플랫폼의 장치 이벤트](https://images.tuyacn.com/content-platform/hestia/1751617329bfabde58072.png)

3. 장치 이벤트 이름을 입력하고 대상 제품의 PID를 선택하십시오. PID를 선택한 후, PID의 DP에서 트리거 상태를 설정합니다. 규칙은 선택한 PID의 기기에만 적용됩니다.
4. 방아쇠 상태를 정의하십시오. **Generic 유형 방아쇠 상태 ** 또는 ** 데이터 포인트 (DP) 방아쇠 상태 **를 선택하고 DP 조건 규칙을 추가하십시오.

예를 들어, AI 인형의 낮은 배터리 상태를 설정합니다. `dp2 (Battery) < 20` 및 `dp3 (Charge Status) = none`.

![DP 저배터리 규칙에 대한 트리거 조건](https://images.tuyacn.com/content-platform/hestia/1751618910f6bedff7ad9.png)

5. (선택) 방아쇠 기간을 놓으십시오. ** 방아쇠 모드**는 **Level Triggering** 또는 **Edge Triggering**일 수 있습니다. 예를 들어, 사용자가 방해하는 것을 방지하기 위해 특정 창 (케터M0X와 같은)에 이벤트를 제한합니다.

![Trigger 모드 및 시간 설정](https://images.tuyacn.com/content-platform/hestia/1751619186f16dd57e370.png)

6. 저장하고 사건을 가능하게 합니다.

![장애국에서의 이벤트](https://images.tuyacn.com/content-platform/hestia/1751619282c5742d45d14.png)

:::기사
저장된 이벤트 기본값은**Disabled**입니다. 수동으로 연결하고 트리거에 연결하여 실행시에 화재 할 수 있습니다. 일단 활성화되면, 이벤트는 트리거 구성에서 선택 가능한 옵션으로 나타납니다.
    :::

## 에이전트 트리거 구성
1. [My Agent](https://platform.tuya.com/exp/ai)로 이동, **Operation** 열에서 ** 개발, 다음 **Trigger** 아래 **01 모델 구성** > **Skills 구성**. 트리거를 구성하려면 **+**를 클릭하십시오.

![Skills 구성 아래 트리거 항목](https://images.tuyacn.com/content-platform/hestia/17549057417c6f1e5d202.png)

2. 트리거를 추가하십시오.

![ 트리거 대화 추가](https://images.tuyacn.com/content-platform/hestia/1751619429cbbbca34c46.png)

-**Trigger Name**: 트리거의 이름을 입력합니다.
-**Trigger Type**: **Device 이벤트 트리거**.

3. ** 트리거 이벤트 **를 선택하십시오 - ** 낮은 배터리 **와 같은 계정에서 장치 이벤트.
- 이벤트가 유효하지 않은 경우, click **Event Configuration** 를 클릭하여 규칙을 만들 수 있습니다.
- 이벤트는 기본적으로 비활성화됩니다. 트리거하기 전에 활성화하십시오.
4. **Task Execution** 논리를 정의합니다. 기본 작업은 **Agent 푸시 메시지**입니다.

푸시 메시지는 오늘 지원됩니다. 플러그인 및 워크플로우 작업은 아직 사용할 수 없습니다.

5. 신속한 편집은 대리인에 내용을 보내.
- 사용 케이스에 필요한 응답 형식 및 키 요소를 지정합니다.
- 현재 배터리 값에 대한 `{{sys.dp2}}`와 같은 동적 변수를 삽입합니다.
- 신속한 concise 유지; 동적 변수와 결합하여 경험을 개인화합니다.
- 장치 특성 및 사용 상황에 따라 음과 표현 스타일을 사용자 정의합니다.

![무선 작업에 대한 프롬프트 편집기](https://images.tuyacn.com/content-platform/hestia/1751620128e37c124eb57.png)

더 많은 지도를 위해, [Prompts 쓰기 방법] (12.1-how-to-write-promts)를 보십시오.

    |Trigger 시나리오|샘플 프롬프트|Prompt 템플릿|
    | --- | --- | --- |
    |낮은 배터리 경고|나는 힘에서 달리고, 저를 위탁하십시오.|현재 배터리 레벨은 `{{dp2}}%`입니다. 한 문장에서 배터리를 충전하십시오. 다른 관련 replies는 허용되지 않습니다.|
    |Overtemperature 경고|방에서 너무 뜨겁습니다. 에어컨을 켜실 수 있습니까?|현재 실내 온도는 `{{dp4}}°C`입니다. 해당 이용 후기에 달린 코멘트가 없습니다. 다른 관련 replies는 허용되지 않습니다.|
    |Poor 공기 질|공기는 너무 나쁘다. 창문을 열려면?|현재 공기 질은 `{{dp5}}`입니다. 환기의 주인을 상기시키기 위해 무언가를 말하십시오. 다른 관련 replies는 허용되지 않습니다.|
    |장치 오프라인 알림|장치 연결 오류. 네트워크 확인|현재 위치 네트워크 확인을 위해 사용자를 알림하기 위해 concise prompt를 생성합니다. 다른 관련 replies는 허용되지 않습니다.|

6. 클릭 ** OK**.
7. 실행 결과를 테스트합니다.
1. 이벤트에 대한**Execute**를 클릭합니다.

![이벤트에 급성 버튼](https://images.tuyacn.com/content-platform/hestia/1751620205191373e1c64.png)

2. ** 방아쇠 테스트 ** 대화 상자에서 가상 장치 ID를 입력하고 응답을 볼 가상 장치 패널을 사용합니다. AI의 대답을 볼 수도 있습니다.

![더 방아쇠 테스트 대화](https://images.tuyacn.com/content-platform/hestia/1751620241fa6e1224f14.png)

:::기사
가상 장치 테스트는 오늘 지원됩니다; 진짜 장치 테스트는 아직 유효하지 않습니다.
        :::

## 곧 출시
다음 계획:

- 작업 흐름을 실행합니다.
- 플러그인 및 기타 방법을 통해 작업을 실행합니다.

## 참조
- [Prompts 쓰기 방법](12.1-how-to-write-promts) - 트리거 메시지에 대한 샘플 프롬프트 및 가변 참조.
- [MCP Management](13-mcp-management) - 외부 도구 및 서비스로 에이전트를 확장합니다.
