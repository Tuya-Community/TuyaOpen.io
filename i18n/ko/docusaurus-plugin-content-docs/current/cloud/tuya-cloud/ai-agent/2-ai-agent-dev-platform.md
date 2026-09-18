---
title: AI 에이전트 개발 플랫폼
description: "AI 에이전트 개발 플랫폼 - 빌드, 구성, 및 AI 에이전트를 실행 TuyaOpen. 여러 LLM을 통합하고 IoT의 물리적 AI 에이전트를 배포합니다."
keywords:
  - ai agent development platform open source
  - physical ai agent development
  - ai agent for iot devices tutorial
  - free ai agent development platform
  - tuya ai agent platform
---

AI Agent Dev Platform은 여러 언어 모델을 통합하고 AI 에이전트를 구축하고 구성하고 실행하는 한 곳을 제공합니다. 플랫폼 구성을 통해 에이전트 애플리케이션을 배포하고 디버그합니다.

## 에이전트 만들기
1. [Tuya Developer Platform] (https://platform.tuya.com/)에 로그인하십시오.
2. 홈페이지에서 **Enter AI Agent 개발 ** ** 개발 콘솔 ** > **AI Agent**, 또는 **AI Agent** > **Agent Dev** > **내 Agent** 왼쪽 네비게이션 메뉴에서. 어느 경로가 [AI Agent Dev Platform](https://platform.tuya.com/exp/ai)를 엽니다.

![AI Agent Dev Platform 홈페이지](https://images.tuyacn.com/content-platform/hestia/1748342890a8b8be58abb.png)

![AI Agent Dev Platform 내 Agent 목록](https://images.tuyacn.com/content-platform/hestia/174834291029509b68bd4.png)

3. ** 위쪽 코너에서 Agent**를 클릭합니다. ** 내 AI Project** 창을 아래에 표시한 후 **OK**를 클릭합니다.

![내 AI 프로젝트 창](https://images.tuyacn.com/content-platform/hestia/1744264784100afa2969d.png)

4. 에이전트의 개발 페이지가 열립니다. 아래 섹션에 설명된대로 모델 기능, 프롬프트 및 기타 설정을 구성합니다.

![Agent 개발 페이지](https://images.tuyacn.com/content-platform/hestia/1744265039409b61af6dd.png)

## 모델 기능 구성
![모델 기능 기본 구성](https://images.tuyacn.com/content-platform/hestia/173338351439345743089.png)

### LLM 모델
큰 언어 모델을 선택 에이전트 사용. 유효한 모형은 수락 이유를 위한 자료 센터에 의해 다릅니다, 각 모형은 다른 토큰 비용을 나릅니다.

## 최대 컨텍스트 메시지
많은 이전이 에이전트를 기억하고 프로세스를 설정. 더 많은 역사는 대화를 지속적으로 유지하고 응답을 개선, 또한 각 차례의 compute 비용을 제기. 당신의 시나리오에 이 값.

### Skills 구성
![Skills 구성](https://images.tuyacn.com/content-platform/hestia/1733383542a33fb6a2061.png)

#### 플러그인
플러그인은 에이전트에 추가하는 독립적 인 기능입니다. 플러그인을 통해 에이전트는 도구 또는 API를 호출 할 수 있습니다. 예를 들어, 장치 쿼리, 장치 제어 및 현장 제어 - 에이전트가 더 다양하고 복잡한 작업을 처리 할 수 있습니다.

#### 지식 베이스
지식 베이스 매장과 정보를 관리, 데이터, 그리고 에이전트가 질문에 대답하거나 완전한 작업을 수행 할 수 있는 지식. 텍스트, 문서, 이미지 및 비디오를 저장할 수 있습니다.

지식 베이스는 retrieval-augmented Generation (RAG)을 사용하여 답을 개선합니다. RAG는 두 단계에서 작동합니다:

1.**Information retrieval** — retrieval model 또는 알고리즘을 사용하여, 에이전트는 사용자 쿼리에 관련한 지식 베이스의 문서 또는 스니펫을 찾습니다.
2.**Answer Generation** — 그 문서, 사용자 쿼리 및 컨텍스트에서, 에이전트는 자연, 일관성 응답을 생성합니다.

### 작업 흐름
시나리오가 특정 논리를 따르는 에이전트가 작업을 완료하거나 응답을 완료하면 워크플로를 구성하고 에이전트가 실행됩니다.

## 신속한 개발
![Prompt 개발](https://images.tuyacn.com/content-platform/hestia/1733383701fdfe72e0ada.png)

**Prompt** 상자에 있는 프롬프트를 입력하여 대화를 생성하거나 작업을 수행하는 모델을 안내합니다. 에이전트가 더 안정적으로 비즈니스 작업을 수행하는 데 도움이 될 수 있습니다.

:::가격
프롬프트를 작성하기 전에 [prompt document](https://www.tuyaos.com/viewtopic.php?t=3725)를 읽어 프롬프트 원리를 이해합니다.
:::

## 디버그 및 출시
## 디버그
![ QR코드 디버그](https://images.tuyacn.com/content-platform/hestia/1742353613e7158505d05.png)

1. 설정을 저장 한 다음 ** QR Code**를 클릭합니다.
2. **SmartLife** 앱을 사용하여 QR 코드를 스캔하여 에이전트를 테스트하고 구성을 정확하고 기능 작업을 확인합니다.

:::기사
에이전트의 기능을 기대하기 전에 완전히 시험하십시오.
:::

### 출시
디버깅이 완료되면 **Release** 를 클릭하여 구성을 온라인 환경에 밀어넣고 효과적입니다.

릴리즈 레코드는 이전 버전마다 나열되므로 구성 기록을 추적하고 관리할 수 있습니다.

## 신청 구성
1. 상단 오른쪽 코너에서 ** Application Management**를 클릭합니다.

![신청 관리 항목](https://images.tuyacn.com/content-platform/hestia/174235372113c8558a10b.png)

2. 열린 페이지에 에이전트가 어떻게 나타나고 응용 프로그램에 상호 작용하는지 구성하십시오.

![신청 설정 페이지](https://images.tuyacn.com/content-platform/hestia/172629526303ca7a3210b.png)

### 신청 선택
애플리케이션 유형 선택: 앱, 클라우드 통합, 스피커, SaaS 또는 제어반.

### AI 대리인 이름
신청에 있는 대리인의 전시 이름을 놓으십시오.

## 환영 메시지
사용자가 응용 프로그램을 열 때 표시 할 수있는 맞춤 환영 메시지를 입력하십시오.

### 가벼운 형태
- **Theme Color** - 조명 모드의 테마 색상.
- ** 배경 색상** - 조명 모드의 배경 색상.
- ** 대화 상자 배경 색상 ** - 빛 모드에서 대화 상자 배경.

### 다크 모드
- ** 어두운 테마 색상 ** - 어두운 모드의 테마 색상.
- ** 어두운 배경 색상 ** - 어두운 모드의 배경 색상.
- **Dark 대화 상자 배경 색상 ** - 어두운 모드에서 대화 상자 배경.

### 배경 이미지
JPG, JPEG, 또는 PNG 형식의 사용자 정의 배경 이미지를 업로드하면 3 MB보다 크지 않습니다.

### 저장
애플리케이션 캐리어가 앱이면 위의 구성에서 AI 에이전트 대화 mini-app을 생성합니다. QR 코드 디버깅도 구성 된 상호 작용을 반영합니다.

## 제품을 가진 대리인
제품의 AI를 개발하기 위하여는, 대리인을 가진 제품을 동료합니다. 자세한 내용은 [AI Capabilities Development](https://developer.tuya.com/en/docs/iot/AI-feature?id=Keapy1et1fc63)를 참조하십시오.

## 참조
- [Workflow Management](workflow-management) - 시각적 작업대에 관현된 에이전트 논리
- [Variables Management](variables-management) - 에이전트 메모리 및 개인화
- [Role Management](role-management) - 패널 시나리오에 대한 에이전트 역할을 정의
