---
title: MCP 관리
description: "Tuya의 MCP 관리 - Model Context Protocol 서버를 통합하여 AI Agent는 외부 데이터 소스, 도구 및 서비스를 하나의 표준으로 제공합니다."
keywords:
  - mcp management
  - model context protocol
  - tuya ai agent
  - mcp server
  - tuya cloud
---

Model Context Protocol (MCP)는 2024년 Anthropic의 오픈 표준이며, 대형 언어 모델(LLMs) 및 AI 에이전트가 외부 데이터 소스, 도구 및 서비스에 안전하게 상호 작용하는 방법을 표준화합니다.

MCP는 AI 시스템의 일반적인 인터페이스로 작동합니다. 모델은 외부 데이터 소스, 도구 및 서비스를 하나의 프로토콜을 통해 전달하여 모델의 기능과 실용적인 유틸리티를 확장하는 다양한 리소스를 통합합니다.

## 기술적인 건축
MCP는 3개의 부품을 가진 클라이언트 서버 구조를 이용합니다:

- **MCP 호스트 **: LLM를 실행하는 응용 프로그램입니다. 상호 작용을 조정하고 하나 이상의 MCP 클라이언트를 관리합니다.
- **MCP 클라이언트**: 호스트와 서버 사이의 교량. 각 클라이언트는 MCP 서버와 하나의 연결을 유지하고 요청 및 응답 전송을 처리합니다.
- **MCP 서버 **: 실제로 데이터 또는 서비스를 제공하는 백업 - 파일 시스템, 데이터베이스, API, 또는 사용자 정의 도구. 클라이언트 요청에 응답합니다.

MCP는 표준화된 의정서에 양방향으로 자료를 교환합니다. 자체 MCP 서버를 개발 및 배포하여 호스트 응용 프로그램을 수정하지 않고 에이전트의 기능을 확장 할 수 있습니다. 이는 외부 도구 및 데이터 소스를 통합하는 비용을 크게 낮출 수 있습니다. 통신이 양방향이기 때문에 서버는 정보 또는 요청 작업을 푸시 할 수 있으므로 더 복잡한 자동화 워크플로우를 지원합니다. 대화 도구에서 LLM를 작업 수행 할 수있는 보조로 전환합니다.

자세한 내용은 [MCP 웹 사이트](https://modelcontextprotocol.io/docs/getting-started/intro)를 참조하십시오.

## Tuya 플랫폼과 MCP 통합
Tuya AI Agent 개발 플랫폼은 완전히 MCP 서버 통합을 지원합니다. 공식 MCP 서버를 통합하거나 사용자 정의를 연결하면 제3자 서비스와 IoT 장치와 상호 작용하는 에이전트의 능력을 확장합니다.

이 LLM는 "눈, 팔, 다리"를 제공하여 텍스트 대화를 넘어 물리적 세상에서 행동합니다. LLM의 상단에 지능적인 결정을 내리고 실제 장치 및 서비스와 효율적인 보안 상호 작용을 수립합니다.

## 플랫폼 이점
- ** IoT 장치 생태계에 대한 오류 **: Tuya-enabled 장치는 플러그 앤 플레이를 통합합니다. MCP 서버를 에이전트에 추가하고, 기기는 IoT 시나리오에서 즉시 사용할 수 있습니다.
-**Diverse MCP 서비스**: 공식 preconfigured MCP 서버를 넘어 강력한 생태계와 개인화 된 확장을 위해 사용자 정의 MCP 서비스를 만들 수 있습니다.
- ** 개발 및 통합**: 플랫폼에서 한 번 서비스를 등록하고 여러 데이터 센터를 통해 MCP 서버 액세스 및 배포를 가능하게하는 경량 SDK를 통합합니다.
- **글로벌 배포**: 전 세계 5개의 데이터 센터에 대한 적용으로, 플랫폼은 가장 가까운 데이터 센터, 지역 배치 및 규정 준수 요구 사항을 충족하는 저지속 연결을 지원합니다.
- **저장 영구 연결 **: 여러 데이터 센터의 Persistent 연결은 WebSocket 프로토콜을 통해 실행되며 데이터 전송은 기밀, 완전하고 사용할 수 있습니다.

플랫폼의 MCP 기능 및 공식 MCP 도구 확장 유지. 최신 업데이트에 대한 플랫폼의 오픈 문서를 참조하십시오.

## 빠른 시작
## 관리 MCP
[Tuya Developer Platform > MCP Management](https://platform.tuya.com/exp/ai/mcp) 페이지로 이동하십시오.

**공식 MCP 서비스** 및 관리 **주문 MCP 서비스**. 탭을 전환하여 공식 서비스와 등록 된 사용자 정의 서비스를 볼 수 있습니다.

![MCP 관리 공식 서비스 목록](https://images.tuyacn.com/content-platform/hestia/1756196346d211a71d946.png)

![MCP 관리 맞춤 서비스 목록](https://images.tuyacn.com/content-platform/hestia/1756196418170a52c579d.png)

아직 MCP 서비스를 등록하지 않은 경우, **사용자 지정 MCP** **사용자 지정 MCP 서비스**를 클릭하여 자신의 서비스를 등록하십시오. 등록 후, 목록의 서비스 정보 및 구성을 볼 수 있습니다.

사용자 정의 MCP 서버를 개발하려면 [Custom MCP Services](13.1-custom-mcp-services)를 참조하십시오.

### 공식 MCP 서비스 보기
**Official MCP Service ** 페이지에 서비스 및 도구 세부 정보를 보려면 서비스를 클릭하십시오.

![Official MCP 서비스 정보](https://images.tuyacn.com/content-platform/hestia/17561964644c74ea60a86.png)

### 사용자 정의 MCP 서비스 편집
**Custom MCP Service** 탭에서 서비스를 클릭합니다. **Service Details** 페이지에, 소개, 구성 및 도구 세부 사항을 볼 수 있습니다. **Edit** 을 클릭하여 서비스 정보를 수정하고 구성을 유지합니다.

자세한 내용은 [Custom MCP Services](13.1-custom-mcp-services)를 참조하십시오.

![Custom MCP 서비스 정보](https://images.tuyacn.com/content-platform/hestia/1756196692fc6657283e7.png)

데이터 센터를 추가 할 수 있습니다.

![사용자 지정 MCP 서비스에 데이터 센터 추가](https://images.tuyacn.com/content-platform/hestia/1756196797b81df8bf389.png)

## # Debug MCP 도구
플랫폼에서 MCP 도구를 디버깅 할 수 있습니다.

공식 MCP 서비스를 선택하면 **Tool** 탭을 클릭하고 **Available tools** 목록을 확장하고 **Test Run**를 클릭합니다.

:::기사
**China Data Center**에 배포된 MCP 서버 툴만 디버그할 수 있습니다.
:::

![MCP 도구 테스트 실행](https://images.tuyacn.com/content-platform/hestia/1756197024a6d98c59d7f.png)

벌레 관례 MCP 서비스는 공식적인 것과 동일한 방법을 서비스합니다. 자세한 내용은 [Run 및 MCP 서버 디버그](13.1-custom-mcp-services)를 참조하십시오.

### 에이전트에 MCP 서버를 추가
1. [My Agent](https://platform.tuya.com/exp/ai) 페이지에서 에이전트를 선택하고 ****Operation** 칼럼에서 ** 개발**를 클릭합니다.

![내 Agent 항목 개발](https://images.tuyacn.com/content-platform/hestia/175619768816e5db9864d.png)

2. **01 모델 구성** > **Skills 구성**, **Plugin**의 오른쪽으로 **+**을 클릭합니다.

![Plugin은 Skills 구성 아래 버튼 추가](https://images.tuyacn.com/content-platform/hestia/1758786306b13f4741864.png)

3.**Add Tool** 페이지에, 당신의 대리인에 공식 또는 주문 MCP 서비스 도구를 추가하십시오.

더 많은 정보를 보려면 [클라이언트에 서버를 추가](13.1-custom-mcp-services)를 참조하십시오.

![도구 페이지 추가](https://images.tuyacn.com/content-platform/hestia/1758786389a78afa0ad82.png)

## 빌링
MCP 도구는 에이전트의 사용으로 계산하고, 모든 장치에는 매일의 무료 허용이 있습니다. 매일의 수당이 청구됩니다.

현재 수당 및 단가의 경우 [AI 청구 규칙](https://developer.tuya.com/en/docs/iot/ai-agent-price?id=Kegb2s2shaj4d)를 참조하십시오.

## 참조
- [Custom MCP Services](13.1-custom-mcp-services) - 생성, 구성 및 자체 MCP 서버를 디버깅합니다.
- [Agent OpenAPIs](14-agent-openapis) - 자체 플랫폼과 Tuya-powered Agent를 통합합니다.
