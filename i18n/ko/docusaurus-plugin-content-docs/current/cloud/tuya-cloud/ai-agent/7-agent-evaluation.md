---
title: 에이전트 평가
description: "Tuya의 Agent 평가는 일괄 데이터 세트, AI 보조 분석 및 워크플로우를 조정하는 다차원 비교와 관현을 테스트합니다."
keywords:
  - agent evaluation
  - tuya ai agent
  - batch testing
  - quality metrics
  - tuya cloud
---

Agent 평가는 에이전트의 관현이 어떻게 작동하고 예상된 기능과 성능을 충족하는지 테스트합니다. 테스트 데이터 세트를 가져오고, 일괄 처리에서 에이전트를 실행하고, 객관적인 품질 메트릭을 얻기 위해 출력을 분석합니다. 그래서 당신은 디버그로 워크플로우를 조정할 수 있습니다.

## 특징
- ** 배치 데이터 테스트**: 사용자 대화를 시뮬레이션 할 수있는 시나리오 기반 데이터 세트를 가져 와서 배치에서 실행하고 응답 품질의 전체 평가에 대한 출력을 수집합니다.
- **AI 모델 분석 ** : AI 모델은 결과를 자동으로 평가하고 분석 속도를 높일 수있는 품질 판단 및 성능 점수를 돌려줍니다.
- ** 다차원 비교 **: 비교 및 결과 온라인, 버전의 벤치 마크, 그리고 상세한 진단에 대한 추적 지식베이스 검색.

## 배치 테스트
[My Agent](https://platform.tuya.com/exp/ai) 목록으로 이동하여 에이전트를 선택한 다음 **...** > ** 배치 테스트 ** ** 작동 ** 열.

![내 Agent 목록 배치 테스트 액션](https://images.tuyacn.com/content-platform/hestia/1749780996a0816f98275.png)

대안으로, ** 조작 ** 열에 ** 에이전트 세부 페이지를 열고, 다음을 클릭합니다 ** 배치 테스트** 오른쪽 상단 모서리에.

![Agent 뷰어 테스트 버튼](https://images.tuyacn.com/content-platform/hestia/1749781122dce852a1e1a.png)

:::기사
공식적으로 출시 된 버전 만 에이전트는 일괄 테스트 할 수 있습니다.
:::

## AI 평가 구성
이 플랫폼은 AI 평가 모델을 사용하여 테스트 결과를 자동으로 분석할 수 있습니다. [평가 작업을 생성](https://developer.tuya.com/en/docs/iot/ai-agent-evaluation?id=Kenth7s0bxavo#test) 와 **AI Evaluation** 디버그 타입, 이 시스템은 에이전트의 출력을 분석하고 보고서를 생성합니다.

1. 왼쪽 상단의 **AI Evaluation Configuration**을 클릭합니다. 이 구성은 현재 에이전트에만 적용됩니다. 모든 **AI 평가 ** 이 에이전트가 그것을 재사용 할 작업.

![AI 평가 구성 항목](https://images.tuyacn.com/content-platform/hestia/1749781186ac5a9bab699.png)

2.**Evaluation Model**와 **Evaluation Prompt**를 모두 구성합니다.

![Evaluation 모델 및 프롬프트 필드](https://images.tuyacn.com/content-platform/hestia/17497813352424e98512f.png)

수동으로 프롬프트를 입력하거나, **Prompt Template** 를 클릭하여 템플릿을 미리보기하고 **Use** 를 클릭합니다. Click**Switch to English** 또는**Switch to Chinese** 템플릿 언어 변경. 중국어 및 영어가 지원됩니다.

![Prompt 템플릿 선택](https://images.tuyacn.com/content-platform/hestia/174978140455c5220fa9e.png)

할 때, 클릭 ** OK**.

3. 각 득점방해는 윤곽의 역사적인 버전을 창조합니다. ** History** 섹션에서 오른쪽에, click **Details** 버전을 볼 수, 또는 클릭 **이 버전을 복원 ** 그것은 다시 롤.

![Configuration history list](https://images.tuyacn.com/content-platform/hestia/1749781466e17d8668a59.png)

![Historical version details](https://images.tuyacn.com/content-platform/hestia/17497815144467da430f8.png)

## 작업 만들기
일괄 테스트 작업 목록에서, click **Create Task** 상단 오른쪽 모서리. 에이전트의 출시 된 버전을 평가할 수 있습니다.

![작업 항목](https://images.tuyacn.com/content-platform/hestia/17497815658cfe2625162.png)

![작업 양식](https://images.tuyacn.com/content-platform/hestia/174978162146ca025095e.png)

|제품정보|이름 *|
| --- | --- |
|데이터 영역|에이전트가 배포되는 데이터 센터. 작업 데이터도 여기에 저장됩니다.|
|Agent를|에이전트의 이름.|
|버전 선택|현재 에이전트의 역사적인 버전.|
|시험 작업 이름|평가 작업의 이름.|
|Debug 유형|**Agent Execution**는 테스트 데이터와 출력 결과를 실행합니다. **AI Evaluation**는 에이전트를 실행하고, AI 평가 모델은 출력 및 반환 결과를 분석합니다.|
|수입 데이터|스프레드 시트에서 테스트 데이터를 가져옵니다, 한 번에 하나의 파일. Click**Download Test Set Template** 을 클릭하고 손상을 피하기 위해 템플릿에 데이터를 포맷합니다.|

수행 할 때, 클릭 ** 즉시 실행 ** 작업을 실행.

## 평가 결과
작업 종료 후, 클릭 **Details** 온라인 결과를 볼 수 있습니다, 또는 클릭 ** 결과를 다운로드하려면 파일.

![Evaluation 결과보기](https://images.tuyacn.com/content-platform/hestia/17497816824baba2eed77.png)

에이전트가 지식베이스에 연결되면, 클릭 **Retrieval** 결과에서 검색 세부 정보를 볼 수 있습니다.

![Knowledge base retrieval details](https://images.tuyacn.com/content-platform/hestia/174978174609e881426ae.png)

|제품정보|이름 *|
| --- | --- |
|이름 *|업로드 된 테스트 케이스 데이터.|
|예상된 산출|입력을 기대하는 응답.|
|실제 출력|결과가 생성되었습니다.|
|평가 결과|수동 표기. 각 결과를 표시하거나 실패하고 코멘트를 추가합니다.|
|평가 Description|**AI 평가 **, 모델의 의견. ** 시약 실행 **, 그것을 할당 할 때까지 빈.|
|자주 묻는 질문|remarks를 필요에 추가하십시오.|
|지식재산권|에이전트가 지식베이스에 연결되면, 이 입력에 대한 retrieval 세부 사항. Retrieval 세부사항은 수출될 수 없습니다.|

## 결과 비교
온라인 에이전트의 두 가지 작업을 비교할 수 있습니다. ** 배치 테스트** 작업 목록에서, click ** 결과 비교 **, 두 가지 역사적인 작업을 선택, 다음을 클릭합니다 ** 결과 비교** 세부 사항을 볼 수 있습니다.

![결과 비교 선택](https://images.tuyacn.com/content-platform/hestia/174978178451339a8dad4.png)

![결과 비교](https://images.tuyacn.com/content-platform/hestia/17497819046785b875f5f.png)

결과 파일을 다운로드하고 현지에서 비교할 수 있습니다.

## 빌링
Agent 평가는 무료입니다. 평가 작업을 실행하여 소비 된 토큰은 표준 비율로 청구됩니다.

상세한 토큰 소비를 위한 [Resource Consume](https://platform.tuya.com/exp/ai/tokenUsage) 페이지로 이동하십시오. 또한 에이전트를 선택 할 수 있습니다, ** 배치 테스트 ** 목록, 그리고 체크 ** 토큰 소비 ** 각 작업에 대한 열.

![토큰 소비보기](https://images.tuyacn.com/content-platform/hestia/174978194822bc66d1466.png)

## 참조
- [Agent 계량 및 빌링] (agent-metering-and-billing) - 모델 및 음성 단위 가격
- [Role Management](role-management) - 테스트의 역할 정의
