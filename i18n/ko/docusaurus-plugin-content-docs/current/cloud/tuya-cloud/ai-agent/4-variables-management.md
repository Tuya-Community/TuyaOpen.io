---
title: 변수 관리
description: "Tuya 상점 사용자 특성에 대한 변수 관리는 핵심 가치 쌍으로 그래서 에이전트는 선호도를 기억하고 개인화 된 응답을 생성합니다."
keywords:
  - variables management
  - tuya ai agent
  - system variables
  - custom variables
  - tuya cloud
---

Variables는 언어 선호도 및 습관과 같은 사용자 특성을 저장합니다. 변수 관리를 통해 에이전트는 사용자 정보를 동적으로 기억하고 개인화된 응답을 생성합니다.

- **Core 메커니즘 ** - `key-value` 쌍으로 변수 저장 데이터.
- **Assignment logic** - 큰 언어 모델은 사용자 입력의 semantics를 분석하고, 관련 변수를 일치하고, 그 값을 동적으로 할당합니다.
- **Application 시나리오** - 신속한 변수의 사용을 선언합니다. 예를 들어, 사용자의 언어 설정에 따라 응답 언어 변경.

## 변수 유형
**시스템 변수** 및 **user variables**를 사용하여 다른 비즈니스 요구를 충족할 수 있습니다. 그들은 다음과 같이 다릅니다:

|제품정보|제품 정보|데이터 소스|읽기/쓰기|
| --- | --- | --- | --- |
|**시스템 사전 설정 변수**|  |  |  |
|• 앱 사용자 변수|플랫폼에 의해 미리 설정|사용자 행동 / 장치 환경|시스템만 작성|
|• 메모리 변수|플랫폼에 의해 미리 설정|장기 사용자 상호 작용 데이터|시스템만 작성|
|• 역할 변수|플랫폼에 의해 미리 설정|Panel 설정|시스템만 작성|
|** 사용자 정의 변수 **|개발자에 의해 정의|사용자가 제공하거나 세션에서 생성|모든 채널에 읽기 / 쓰기|

## App 사용자 변수
스마트 기기에 연결된 앱 사용자의 정적 정보를 저장하고, 홈 시나리오에서 에이전트의 서비스를 개선합니다.

- **일반적인 시나리오**
- 날씨 보고서 - ** 홈 위도 ** 및 ** 홈 경도 ** 변수에서 로컬 실시간 날씨를 얻을.
- 장치 제어 - 장치를 찾아 ** 룸 정보 **, ** 홈 장치 카테고리** 및 ** 장치 AI 명령 속성**와 같은 변수에서 속성을 조정할 수 있습니다. 예를 들어, 침실 조명 밝기를 조정합니다.
- **Available 변수**

    |변수 이름|이름 *|기본 값|관련 채널|이름 *|
    | --- | --- | --- | --- | --- |
    |`sys.categories`를|홈 장치 카테고리|시스템에 의해 생성|Tuya, SmartLife 및 OEM 앱|더 읽기|
    |`sys.homeLatitude`를|홈 위도 좌표|시스템에 의해 생성|Tuya, SmartLife 및 OEM 앱|더 읽기|
    |`sys.rooms`를|집에서 방|시스템에 의해 생성|Tuya, SmartLife 및 OEM 앱|더 읽기|
    |`sys.currentTime`를|홈 시간대의 현재 시간|시스템에 의해 생성|Tuya, SmartLife 및 OEM 앱|더 읽기|
    |`sys.homeLongitude`를|홈 경도 좌표|시스템에 의해 생성|Tuya, SmartLife 및 OEM 앱|더 읽기|
    |`sys.deviceNames`를|장치 이름 목록|시스템에 의해 생성|Tuya, SmartLife 및 OEM 앱|더 읽기|
    |`sys.attributes`를|AI 명령 속성|시스템에 의해 생성|Tuya, SmartLife 및 OEM 앱|더 읽기|
- ** 규칙**
- **이 변수는 기본적으로 비활성화됩니다. 개발자 플랫폼에서 수동으로 사용 가능
- ** 데이터 권한** — 데이터는 **SmartLife** 앱, **Tuya** 앱 및 OEM 앱에서만 제공됩니다. 시스템은 자동으로 생성하고 ** 손으로 편집 할 수 없습니다 **. 예를 들어, 사용자가 이동하고 좌표가 변경 될 때 위치 요청은 리 트리거해야합니다.

## 역할 변수
역할 변수는 ** 비즈니스 패널 시나리오 ** AI 인형과 스마트 스피커와 같은. 사용자는 상호 작용을 더 현실로 만드는 역할 속성을 사용자 정의합니다.

- **일반적인 시나리오**
- 어린이 동반자 로봇 - 사용자는 `role_name` 가변을 통해 역할 이름(Little Helper Lele)을 설정합니다.
- **기본 변수**

    |변수 이름|이름 *|관련 채널|이름 *|
    | --- | --- | --- | --- |
    |`sys.roleName`를|역할 이름|AI 장난감 패널|더 읽기|
    |`sys.roleIntroduce`를|역할 설명|AI 장난감 패널|더 읽기|
    |`sys.roleSupplementDesc`를|Supplemental 역할 설명|AI 장난감 패널|더 읽기|
- ** 규칙**
- 개발자 플랫폼의 변수를 사용하기 전에 사용.
- 최종 사용자는 역할 변수의 값을 변경할 수 있습니다. 변화는 즉시 효력을, 대리인을 redeploy 없이 가지고 갑니다.

자세한 내용은 [사용 변수](https://developer.tuya.com/en/docs/iot/agent-variable?id=Kegaaiqwlwpws#usevariables)를 참조하십시오.

## 메모리 변수
사용자의 상호 작용을 통해 장기**를 위한 **persist에 필요한 개인 데이터 저장. Memory variables 지원 persistent 읽기 및 세션에 쓰기.

- **일반적인 시나리오**
- 관심에 의해 일치하는 내용 - `sys.memoryInterests` 가변은 사용자의 취미 및 선호도를 기록하므로 시스템은 관련 내용과 tailors 응답을 권장합니다.
- 메모리를 통해 이해 된 습관 - `sys.memoryHistoryChatSummary` 변수는 과거 대화의 요약을 저장하고 더 많은 관련 응답을 전달합니다.
- **기본 변수**

    |변수 이름|이름 *|관련 채널|이름 *|
    | --- | --- | --- | --- |
    |`sys.memoryUserFullName`를|이름. 사용자의 개인화 통신에 대한 사용자의 이름을 요약합니다.|모든 채널|각 세션 요약|
    |`sys.memoryInterests`를|취미 및 관심사. 개인 정보 보호 정책|모든 채널|위와 같|
    |`sys.memoryAge`를|이름 * 사용자의 연령을 기록하여 상호 작용을 최적화합니다.|모든 채널|위와 같|
    |`sys.memoryBirthday`를|생일. 알림이나 인사에 대한 기록.|모든 채널|위와 같|
    |`sys.memoryProfession`를|직업. 사용자의 요구를 잘 이해하기 위해 기록합니다.|모든 채널|위와 같|
    |`sys.memoryGoalsAndWishes`를|목표와 소원. 개인화된 지원을 위해 그들을 기록합니다.|모든 채널|위와 같|
    |`sys.memoryPetsKeptAtHome`를|개인화 된 상호 작용을 위해 사용자의 가정에서 애완 동물을 기록합니다.|모든 채널|위와 같|
    |`sys.memoryHistoryChatSummary`를|UXPA(사용자경험전문가협회)는 제품 및 서비스 UX를 리서치, 디자인, 평가한다.|모든 채널|위와 같|
- ** 규칙**
- **이 변수는 기본적으로 비활성화됩니다. 개발자 플랫폼에서 수동으로 사용 가능
-**Data permissions** — 데이터는 모든 에이전트의 배포 채널에서 사용할 수 있습니다. 시스템은 자동으로 생성하고 ** 손으로 편집 할 수 없습니다 **.

### 사용자 정의 변수
변수 유형의 정의 ** 임시주의를 캡처하거나 사용자 역할 또는 실시간 감정과 같은 동적 사용자 시약 상호 작용에서 비즈니스 요구를 확장하기 위해 **.

- **일반적인 시나리오**
- 감정 인식 - `current_mood` 변수와 응답 톤을 조정, 0에서 10의 스케일에.
- Identity 적응 - "parent"또는 "guest"와 같은 `user_role` 변수와 에이전트의 응답 전략을 전환합니다.

정확한 변수 이름과 설명을 사용하여 에이전트가 사용자 데이터를 더 정확하게 일치합니다. 예제:

|변수 이름|이름 *|채용정보|
| --- | --- | --- |
|`custom_moodLevel`를|사용자의 실시간 전송 값 (0–10 스케일)|침전 값이 ≥ 7일 때 더 긍정적 인 톤에 응답합니다.|
|`custom_interactionFrequency`를|오늘의 사용자의 상호 작용|매일의 상호 작용이 ≥ 5에 도달하면, 배려 알림을 밀어 : ** "당신은 휴식을 취하고 싶습니다?"**|
|`custom_preferredTopic`를|hashtags 사용자는 가장 최근에 따릅니다|`custom_preferredTopic=#cooking`로, 레시피 관련 내용의 우선순위.|

## 변수 사용
1. [Tuya Developer Platform] (https://platform.tuya.com/)에 로그인하십시오.
2. **AI Agent** > **Agent Dev** > [My Agent](https://platform.tuya.com/exp/ai)를 선택하고 ** Agent** 또는 **Agent Management**를 클릭하여 에이전트의 개발 페이지를 엽니다.

![Agent 개발 페이지](https://images.tuyacn.com/content-platform/hestia/1743563585b3e0b64fb8a.png)

3.**Variables** 섹션으로 스크롤하고 **+**를 오른쪽으로 클릭합니다.

![Variables 섹션](https://images.tuyacn.com/content-platform/hestia/174356364020fa500f4ed.png)

4. 변수 관리. **Edit Variables** 페이지에서는 시스템 변수를 생성하거나, 역할 변수 관리를 활성화할 수 있습니다.
- ** 사용자 정의 변수** — in the**Custom variables** section, click **Add**, 변수 이름, 설명 및 기본값을 입력한 후 **Save**를 클릭합니다. 정확한 이름과 묘사는 대리인 경기 사용자 자료 더 정확하게 돕습니다.

![주문 변수](https://images.tuyacn.com/content-platform/hestia/17435637004bd659b7506.png)

- **Enable system variables** - 앱 사용자 변수 및 메모리 변수를 활성화하기 위해 스위치를 켜십시오. 일단 활성화되면, 변수 정보는 시스템 프롬프트에 의해 자동으로 참조됩니다. 특별한 메모를 추가하려면 변수의 사용 시나리오를 프롬프트에 설명합니다.

![시스템 변수 사용](https://images.tuyacn.com/content-platform/hestia/17435638518f538eb4cd5.png)

- ** 가능한 역할 변수 관리 ** - 역할 변수는 AI 장난감 및 스마트 스피커와 같은 사전 정의 된 역할을 필요로하는 시나리오에 대한 것이며 일치하는 제품 범주의 패널과 함께 사용해야합니다. 이것은 최종 사용자가 에이전트의 역할, 음성, 성격 및 기타 기능을 사용자 정의 할 수 있습니다.
1. 스위치에서 역할 변수 그룹을 활성화합니다.

![가능 역할 변수 그룹](https://images.tuyacn.com/content-platform/hestia/174356393536281d9f07e.png)

2. **Preset 역할 관리** 페이지에, click **Preset 역할 추가 ** 공식 역할 또는 사용자 정의 역할 추가.

![이전 역할 추가](https://images.tuyacn.com/content-platform/hestia/1743563992044e8f914f7.png)

3. 변수가 활성화되고 에이전트 개발 및 장치 링크가 완료되면, 사전 설정된 역할 정보는 그 패널과 함께 사용될 때 AI 장난감 패널에 나타납니다.

## 참조
- [AI Agent Dev Platform] (ai-agent-dev-platform) - 활성화 및 참조 변수
- [Role Management](role-management) - 역할 변수 노출 관리
- [Workflow Management](workflow-management) - 워크플로우 노드 내부의 참조 변수
