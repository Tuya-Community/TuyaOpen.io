---
title: 워크플로 관리
description: "Tuya의 워크 플로우 관리 - 시각적 드래그 앤 드롭 워크 벤치를 구축, 자동화, 에이전트의 비즈니스 논리를 최적화하고 복도 감소."
keywords:
  - workflow management
  - tuya ai agent
  - visual workbench
  - agent logic
  - tuya cloud
---

워크플로우는 에이전트의 비즈니스 로직을 단순화하고 자동화하는 시각적 작업입니다. 드래그 앤 드롭 인터페이스에서 워크플로를 만들고 관리하고 최적화하여 에이전트의 효율성을 향상시키고 홀로그램을 줄일 수 있습니다.

## 워크플로우 만들기
[Workflow](https://platform.tuya.com/exp/workflow) 페이지에, **Create Workflow**를 상단에 입력한 후 **Workflow Name** 및 **Workflow Description**를 입력하고 워크플로우 프로젝트가 생성됩니다.

![작업 대화 상자](https://images.tuyacn.com/content-platform/hestia/1738741167d3cf2421e0a.png)

## 작업 흐름 구성
### 시각적인 workbench
드래그 및 드롭핑 노드에 의해 워크플로를 구축합니다. 각 노드는 읽을 수있는 전체 프로세스를 만드는 명백한 작업 또는 결정을 정의합니다.

![Visual workbench](https://images.tuyacn.com/content-platform/hestia/175551024951299d2e04e.png)

## 시작 노드
start 노드는 워크플로우를 실행하는 데 필요한 정보를 정의합니다. 기본 입력 변수는 `USER_TEXT`입니다.

![시작 노드](https://images.tuyacn.com/content-platform/hestia/175550791955841ddd280.png)

click **Add Node** 다음 노드를 추가하고 워크플로우를 구축하십시오:

- [인터뷰 노드](https://developer.tuya.com/en/docs/iot/ai-agent-workflow?id=Keak4gh7rdhd2#recognition)
- [대 언어 모델 노드](https://developer.tuya.com/en/docs/iot/ai-agent-workflow?id=Keak4gh7rdhd2#llm)
- [출력 노드](https://developer.tuya.com/en/docs/iot/ai-agent-workflow?id=Keak4gh7rdhd2#output)

### Intent 승인 노드
intent 승인 노드는 사용자 입력 뒤에 intent를 식별하고 분류합니다. 인식 모델을 설정하면 시스템은 사용자의 입력을 읽고 따라 분류합니다.

![Intent 인식 노드](https://images.tuyacn.com/content-platform/hestia/1755508032eeeceece2a7.png)

** 간단한 모드** 또는 ** 풀 모드**를 선택하십시오.

** 간단한 모드**:

- ** Model** - 적합한 모델을 선택하십시오.
- **Input** — intent를 결정하는 데 사용되는 매개 변수를 설정합니다. 일반적인 입력은 `USER_TEXT`입니다.
-**Intent Recognition** - 사용자 입력과 일치할 수 있는 intents를 설정한다.
-**Exception Handling** - 타임아웃, 리트리 논리 및 예외 처리 방법을 설정합니다.

**Full mode**는 간단한 모드의 상단에 변수 지원으로 **System Prompt**를 추가합니다. 시스템 프롬프트는 사용자 의도의 깊은 읽기에 대한 입력을 해석합니다.

## # 큰 언어 모델 노드
큰 언어 모델 노드는 큰 모델에 내장 된 대화 노드입니다. 그것은 당신이 구성하는 변수와 프롬프트에서 고품질의 응답을 생성합니다.

![대 언어 모델 노드](https://images.tuyacn.com/content-platform/hestia/17555093599e33ff38d9a.png)

- **Session history** — 활성화될 때 노드는 모델에 세션 컨텍스트를 보냅니다. 그래서 사용자 입력은 컨텍스트로 일관성 있게 유지됩니다.
- **Input** - 프롬프트에 추가하는 정보. 동적 변수 참조를 지원합니다.
- ** Model** - 원하는 모델을 선택하십시오.
- ** 시스템 프롬프트 ** - 역할 설명, 예, 출력 제약과 같은 모델의 기본 동작을 설정합니다. 변수 설정 문법을 지원합니다.
- **User prompt** - 쿼리 또는 텍스트 요청과 같은 모델 프로세스를 지시합니다. 일반적으로 사용자 입력 변수 `USER_TEXT` 참조.
- **Output** - downstream 노드의 변수 값으로 모델의 생성된 내용을 저장합니다.
-**Exception Handling** - 타임아웃, 리트리 논리 및 예외 처리 방법을 설정합니다.

## 출력 노드
출력 노드는 중간 처리 및 메시지 출력을 지원합니다. 유연한 데이터 출력을 위해 2개의 출력 모드, 스트리밍 및 비스트링을 제공합니다.

![출력 노드](https://images.tuyacn.com/content-platform/hestia/17555081638b32d07d729.png)

- **Input variable** - 신속한 동적 변수 참조를 지원합니다.
-**Output content** — 변수 설정 문법을 지원합니다. **streamed output**를 사용하여, 모델은 실시간으로 단어로 콘텐츠를 생성합니다.

### 엔드 노드
엔드 노드는 논리 지점을 닫습니다. 출력 노드와 같은 방법을 구성합니다.

![End 노드](https://images.tuyacn.com/content-platform/hestia/1755508207ac49aeb4ca7.png)

:::대여
작업 흐름은 논리 지점이 엔드 노드에 통합되지 않는 경우 실행되지 않습니다.
:::

## 테스트 실행
작업 흐름에 큰 모델 세트와 일치하는 데이터 센터를 선택하면 `USER_TEXT`의 샘플 입력을 입력하고, 테스트를 실행하여 출력을 얻을 수 있습니다.

![테스트 실행](https://images.tuyacn.com/content-platform/hestia/1755509087d0b8bd57ed9.png)

## 워크플로우 게시
구성이 완료되면 workbench의 오른쪽 상단 모서리에 **를 클릭하십시오. Tuya는 작업 흐름에 논리 검사를 실행하여 완료됩니다. 한 번 체크 패스, 워크플로가 게시됩니다.

![Publish 워크](https://images.tuyacn.com/content-platform/hestia/17387367985ed6a35665b.png)

게시 후, 에이전트에서 워크플로를 선택하고 ** Workflow 추가 ** 그것을 첨부합니다.

![제휴 작업 추가](https://images.tuyacn.com/content-platform/hestia/1755508599f5290cbef54.png)

## 참조
- [AI Agent Dev Platform](ai-agent-dev-platform) - 에이전트를 만들고 워크플로우를 부착
- [Variables Management](variables-management) - 워크플로우 읽기 및 쓰기
