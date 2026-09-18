---
title: "Agent 개발 가이드"
description: "TuyaOpen IDE를 사용하여 장치 및 클라우드에서 TuyaOpen IoT Agents 개발, 배포 및 바인딩을 위한 엔드 투 엔드 워크."
sidebar_label: "에이전트 개발"
sidebar_position: 8
keywords:
  - TuyaOpen IDE
  - TuyaOpen
  - AI Agent
  - data points
---

## 제품정보{/* #overview */}
TuyaOpen IDE는 Tuya IoT 하드웨어를 클라우드 기반 AI 기능을 연결합니다. 한 번 에이전트를 개발 및 배포, 그 다음 고유 한 제품 ID (PID)를 통해 하나 이상의 장치에 바인딩. 장치는 표준 데이터 포인트 (DP)를 사용하여 원격 측정을 보내고 에이전트에서 제어 명령을받습니다.

이 가이드 덮개:

- device-cloud-Agent 아키텍처는 어떻게 작동합니까?
- IDE에서 제품을 만들고 정의
- AI 지원과 DP 정의 관리
- 에이전트 개발 및 출판
- 에이전트를 제품에 바인딩

:::tip

TuyaOpen IDE는 모든 지원되는 하드웨어 플랫폼 (T5AI-Core, ESP32S3, BK7231X, Raspberry Pi 등)에서 작동합니다. IDE의 에이전트 개발 작업 흐름은 platform-agnostic입니다.

:::

## 어떻게 작동합니까?{/* #architecture */}
TuyaOpen IDE 시스템은 3 층 바인딩 모델을 따릅니다. 이 아키텍처를 통해 데이터의 각 조각은 일관적으로 흐릅니다.

```text
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│   Device PID    │◄───────►│   Tuya Cloud    │◄───────►│    AI Agent     │
│  Hardware Code  │ DP API  │ Product + DPs   │ LLM     │ Skills / MCP    │
│                 │  Sync   │                 │ Call    │   Workflows     │
└─────────────────┘         └─────────────────┘         └─────────────────┘
```

### 의무 원리
**Product ID (PID)**는 3개의 층의 단일 바인딩 식별자입니다. 모든 장치에는 하드웨어 PID가 있습니다. 모든 클라우드 제품에는 PID가 있습니다. 모든 에이전트는 PID에 바인딩됩니다. 모두 같은 PID를 공유하면 자동으로 상호 운용합니다.

**DP (Data Point)**는 데이터 계약입니다. DPs는 장치와 구름 사이 교류하는 자료의 각 조각을 정의합니다 - 감지기 독서, 스위치 국가, 익지않는 이진 탑재량 및 더 많은 것. 대리인은 DP를 읽고 장치를 통제하기 위하여 씁니다.

![End-to-end Agent 바인딩 아키텍처](https://images.tuyacn.com/fe-static/docs/img/c3422cc7-27e6-4f25-a726-e2d36b87322f.png?imageMogr2/format/webp)

## 1. Enable Agent 개발{/* #enable */}
IDE에서 새로운 TuyaOpen 프로젝트를 만들 때, 선택적으로 클라우드 에이전트 개발을 활성화 할 수 있습니다. 모든 프로젝트는 클라우드 기능을 필요로 합니다 — 로컬 전용 펌웨어를 위해 이것을 건너.

1. TuyaOpen 프로젝트를 만들거나 엽니다.
2. 프로젝트 착륙 페이지에, 선택 **Agent** 탐색 바에서.
3. Cloud IoT Agent 기능 활성화를 원합니다.

![IDE Agent 개발 페이지](https://images.tuyacn.com/fe-static/docs/img/00e11062-4ecf-4096-8529-df9796344448.png?imageMogr2/format/webp)

일단 활성화되면 에이전트 개발 페이지는 4 개의 메인 패널을 보여줍니다 :

|제품정보|제품정보|
| --- | --- |
|**제품 PID**|이 프로젝트에 따라 제품보기 또는 변경|
|**출시 상태**|Agent 게시 및 배포 상태 확인|
|**DP 데이터 포인트 **|장치 클라우드 데이터 컨트랙트 정의 및 관리|
|**Agent 편집기 **|생성, 구성 및 에이전트 개발|

![페이지 구성 요소 개요](https://images.tuyacn.com/fe-static/docs/img/a515f50b-98a2-497f-9e08-2a6c43fb913f.png?imageMogr2/format/webp)

## 2. 제품 만들기{/* #product */}
에이전트를 개발하기 전에 클라우드 제품이 필요합니다. 이 제품은 두 장치 펌웨어 및 에이전트 코드 공유를 수행하는 DP 모델을 보유하고 있습니다. 두 가지 방법으로 하나를 만들 수 있습니다.

### AI 보조 (추천)
IDE AI Assistant에 제품을 설명합니다. 제품을 만들고 적절한 DP 정의를 자동으로 생성합니다.

1. **Agent** 페이지를 프로젝트에서 엽니다.
2. IDE 채팅에서, 유형:`Create a smart temperature sensor product for me`.
3. 조수는 제품을 만들고 관련 DP를 정의하고 프로젝트에 동기화합니다.

### 제품정보
클라우드 콘솔의 제품 구성을 통해 단계.

1. **Agent** 페이지에, **Create Product**를 클릭합니다.
2. 제품 카테고리 선택 (예를 들면, **스마트 홈 > 센서**).
3. 제품 이름과 설명을 입력합니다.
4. 연결 프로토콜을 선택하십시오.
5. PID 생성을 저장합니다.

![제품소개 UI](https://images.tuyacn.com/fe-static/docs/img/46ff66c9-ba75-49ad-9b6c-4dfbade62fc2.png?imageMogr2/format/webp)

:::info

생성 후, PID는 **제품 PID** 패널에 나타납니다.

:::

## 3. DP 데이터 포인트 정의{/* #dp */}
DPs (Data Points)는 장치 펌웨어와 클라우드 간의 데이터 계약입니다. 모든 값은 장치 보고서이며, 모든 명령은 장치가 DP를 통해 여행합니다.

각 DP는 있습니다:

|제품정보|이름 *|
| --- | --- |
|**DPID **|숫자 식별자 (1-255)|
|**DPCode **|Human-readable 이름 (예를 들면,`switch_1`, `temp_current`) |
|**형**|Boolean, 값, enum, 문자열, 원시, 오류|
|**통상 **|Min/max 가치, 단계 크기, enum 선택권|

:::warning

DP는 장치 펌웨어, Tuya Cloud 및 Agent를 통해 공유됩니다. 모든 3개의 휴식 통신을 업데이트하지 않고 DP 정의를 변경합니다. 항상 DP 변경을위한 AI 워크플로우를 사용합니다. 동기화의 모든 3 층을 유지합니다.

:::

### AI 보조 DP 관리
IDE AI Assistant를 사용하여 DP 정의를 만들고 수정하거나 확장합니다. 이것은 DP 형식과 제약을 자동으로 검증하기 때문에 권장된 방법입니다, 클라우드 제품 모델을 업데이트, 일치 장치 펌웨어 코드를 생성, 및 업데이트 패널 / 앱 정의.

예제 프롬프트:

```text
1. Add a boolean DP for a relay switch on channel 1
2. Create a temperature reporting DP with range -40 to 125°C and 0.1°C precision
3. Add a raw data DP for RGB LED strip control — 3 bytes, R G B
4. Create a 3-gang switch with three boolean DPs
```

:::info

조수는 클라우드에서 DP 정의를 생성하고 프로젝트 구성을 업데이트하고 장치 펌웨어의 C 코드를 생성합니다.

:::

### 보기 DP
**Agent** 페이지에서 **DP Data Points** 패널은 제품 PID에 정의된 모든 DP를 보여줍니다. DPID, 유형, 이름 및 현재 제약을 볼 수 있습니다.

![DP 목록 예](https://images.tuyacn.com/fe-static/docs/img/3cdc22e9-38bd-423d-bc52-c44a1afd9af4.png?imageMogr2/format/webp)

### DPs as a 에이전트 제어 인터페이스
에이전트는 DP를 모두 읽고 장치를 제어합니다. Inference time: Agent는 디바이스의 모든 현재 DP 값을 수신하며, 해당 값을 사용하여 디바이스 상태에 대한 LLM 이유와 Agent는 DP 값을 백업하여 작업을 실행할 수 있습니다. 이 에이전트가 장치 제어를 수행하는 방법 - 읽기 및 DP 계약을 작성하여.

## 4. 에이전트 개발{/* #develop */}
두 가지 모드 중 하나에 에이전트를 만듭니다.

|주요 특징|사용 사례|
| --- | --- |
|** 일관된 모드 **|단일 LLM 도구. Straightforward 신속한 기반 개발. 대부분의 장치 통제 사용 케이스를 위해 베스트.|
|**Workflow 모드**|다중 모델, 의도적 인 인식 및 상태 논리와 멀티 단계 관현. 복잡한 음성 조수 또는 다중 시약 시스템에 가장 적합합니다.|

### 새로운 에이전트 만들기
1. **Agent** 페이지에서 **Agent** 패널로 이동합니다.
2. **Create New Agent**를 클릭합니다.
3. 에이전트에 대한 이름과 설명을 입력합니다.
4. 모드를 선택하세요: ****** 또는 **Workflow**.

![새로운 에이전트 UI 만들기](https://images.tuyacn.com/fe-static/docs/img/e057081c-54c3-4442-b9a0-04883a7e87b1.png?imageMogr2/format/webp)

### 기존 에이전트를 재사용
이전에 출판된 에이전트를 제품에 바인딩할 수 있습니다. 여러 장치 유형에서 동일한 에이전트 로직을 원할 때 유용합니다.

1. **Agent** 페이지에서 **Agent** 패널로 이동합니다.
2. 클릭 **Existing Agent 선택 **.
3. 출판된 에이전트의 목록에서 선택하십시오.

![기존 에이전트 UI](https://images.tuyacn.com/fe-static/docs/img/fb45626e-26ba-4eaf-bc03-95984ae00fa0.png?imageMogr2/format/webp)

:::note

선택한 에이전트는 제품에 바인딩 될 수 전에 게시해야합니다. Reuse는 DPCodes가 호환될 때 가장 잘 작동합니다. 단일 스위치에 기록된 에이전트는 DPCodes를 일치하는지 않는 한 3-gang 스위치에서 제대로 작동하지 않을 수 있습니다.

:::

![에이전트 경계 성공적으로](https://images.tuyacn.com/fe-static/docs/img/019529fc-eddc-4f6b-bb07-10e3062037fe.png?imageMogr2/format/webp)

:::info

생성 또는 선택 후, 에이전트는 제품 PID에 바인딩됩니다. **Agent** 패널에서 바인딩 확인을 참조하십시오.

:::

## 5. 대리인 형태{/* #agent-mode */}
에이전트 모드는 기본적으로 간단한 개발 모델입니다. 시스템 프롬프트, 도구 및 기능으로 단일 LLM을 구성합니다.

1. **Agent** 페이지에, **Develop Agent**를 클릭합니다.
2. 에이전트 편집기가 열립니다.

![에이전트 편집기 UI](https://images.tuyacn.com/fe-static/docs/img/ed89d187-2949-4318-b385-f6b4b6431b92.png?imageMogr2/format/webp)

에이전트 모드에서 구성:

|사이트맵|이름 *|
| --- | --- |
|**시스템 프롬프트 **|에이전트의 사람, 행동 및 지식|
|** 모델 선택 **|아래 LLM을 선택하십시오.|
|**도구**|Enable MCP 연결관, 기술, RAG 및 장치 통제|
|**자본 **|음성 (ASR/TTS), 시각 및 더 많은 것|

![Agent 모드 구성](https://images.tuyacn.com/fe-static/docs/img/85b7cf0c-10ed-47cf-b514-38eb92c3fbc6.png?imageMogr2/format/webp)

thermostat 대리인을 위한 예 체계 신속한:

```text
You are a thermostat control Agent. Monitor room temperature and humidity.
When temperature exceeds 26°C, turn on the cooler (switch_2 = true).
When temperature drops below 20°C, turn on the heater (switch_1 = true).
Always report the current temperature and humidity when asked.
Keep responses concise and helpful.
```

:::note

DP 읽기 / 쓰기 도구는 모든 바인딩 에이전트에 자동으로 사용할 수 있습니다 - 당신은 그것을 명시적으로 추가 할 필요가 없습니다.

:::

## 6. 워크 플로우 모드{/* #workflow-mode */}
Workflow 모드는 복잡한 멀티 스텝 에이전트 시스템을 구축 할 수 있습니다. 당신이 intent 승인, 모형 chaining, 상태 논리, 또는 평행한 실행을 필요로 할 때 그것을 사용하십시오.

Workflow 형태 기능:

- **Intentcogni** - intent를 기반으로 다른 핸들러에 대한 경로 사용자 쿼리.
- **Multi-model Orchestration** - 다른 작업을 위한 다른 모델을 호출합니다.
- **Conditional branch** - 중간 결과를 기준으로 논리 게이트.
- ** 동기화 및 병렬 실행 ** - 제어 실행 흐름.

![Workflow 편집기 UI](https://images.tuyacn.com/fe-static/docs/img/34af0b69-5333-4a36-a30a-da744b5edd80.png?imageMogr2/format/webp)

:::info

풀 워크 플로우 개발 참조의 경우 Workflow Management를 참조하십시오.

:::

## 7. 출판 및 바인딩{/* #publish */}
에이전트 개발 후:

1. **Publish ** 에이전트 편집기에서.
2. 버전 태그를 선택하거나 자동 변환을 사용합니다.
3. 설치를 완료합니다.

:::tip

게시되면 에이전트가 자동으로 제품 PID에 바인딩됩니다. PID가 에이전트에 연결되는 모든 장치.

:::

## 모범 사례: 좋은 에이전트 지원 장치 설계{/* #best-practices */}
가장 성공적인 Agent-hardware 제품은 이러한 원칙을 따릅니다.

#### DP-First 디자인
semantic 장치 기능에 지도하는 DP를 정의하고, raw register 값이 아닙니다. 에이전트 이해`target_temp`더 나은`register_0x12_value`.

#### 인간 읽기 쉬운 DPCodes
descriptive 이름 사용 (`hvac_mode`, 아니`dp5`). LLM은 DPCode 이름을 사용하여 각 DP가 무엇인지 이해합니다.

#### 활동의 앞에 국가
좋은 결정을 내릴 수있는 충분한 읽을 수있는 상태를 제공합니다. thermostat 대리인은 열 또는 차가운 결정하기 전에 현재 온도를 알고 있어야 합니다.

#### Idempotent 활동
장치 제어 DPs는 여러 번 쓸 안전해야합니다. 대리인은 DP가 네트워크 실패에 씁니다.

#### modality에 대해 생각
이 장치가 음성을 필요로 합니까? 비전? 모두? 에이전트 모드 및 하드웨어 기능을 사용 케이스에 일치합니다.

:::info

더 깊은 제품 디자인 지도를 위해, Agent-First 기계설비 개념을 보십시오.

:::

## 더 보기{/* #see-also */}
- [TClaw 빠른 시작 (T5-AI)](/docs/tclaw/ducky-quick-start-T5AI)
- [하드웨어 기술 개발](/docs/tclaw/hardware-skill)
- [주문 장치 MCP](/docs/tclaw/custom-device-mcp)
