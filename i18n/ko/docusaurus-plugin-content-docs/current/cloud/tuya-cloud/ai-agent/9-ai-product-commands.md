---
title: AI 제품 명령
description: "AI 제품 명령은 Tuya 맵의 자연적인 언어 구문에서 장치 작업에 따라서 AI 대리인은 빛과 소켓 같이 가정 장치를 통제할 수 있습니다."
keywords:
  - ai product commands
  - tuya ai agent
  - device control
  - natural language
  - tuya cloud
---

AI 제품 명령 지도 자연적인 언어 구문 (같은 "빛을 켜십시오") 장치 행동에, 그래서 AI 대리인은 빛과 소켓 같이 가정 장치를 통제할 수 있습니다. Tuya Developer Platform에서 설정한 다음 명령 솔루션을 게시하여 라이브를 만들 수 있습니다.

## 필수품
대리인 통제 가정 장치를 시키려면, 모든 3개의 요구에 응하십시오:

- **Extend 에이전트 기능**: 장치 제어 도구를 에이전트에 추가하므로 하드웨어와 상호 작용할 수 있습니다.
-**Bind 장치 AI 명령**: 대상 장치에 대한 표준화 된 AI 명령을 구성 (똑똑한 빛 또는 소켓과 같은) 장치 동작에 각 명령을 매 - 예를 들어, "빛을 켜기"에 힘을 방아쇠.
- ** 생태계와 링크 **: **Tuya** 앱 또는 **SmartLife** 앱에 디바이스를 추가하여 온보드 및 계정 바인딩을 완료할 수 있으므로 에이전트가 제어할 수 있습니다.

장치의 제품 ID (PID)가 AI 명령으로 구성되고 에이전트는 **Device Control** 플러그인을 사용했으며, AI와의 채팅은 세심한 이해와 장치 제어를 달성합니다. 홈 조명 제어 (빛 온/오프, 온도) 및 보온장치 제어 (온도 설정)와 같은 시나리오에 적용됩니다.

## AI 제품 명령 구성
[Tuya Developer Platform] (https://platform.tuya.com/)에 로그인하십시오. 왼쪽 네비게이션에서 **AI Agent** > **Agent Configuration** > **AI Control Command Configuration**를 선택하여 [AI Product Command](https://platform.tuya.com/exp/voice/ai) 페이지를 엽니다.

제품 이름의 오른쪽으로, click **Change Product** 를 클릭하여 제품을 선택하거나 검색하십시오. 첫번째 20개의 제품은 기본적으로 나타납니다; 너의것은 목록이 없는 경우에, 제품 이름 또는 PID에 의하여 검색.

![AI 제품 명령](https://images.tuyacn.com/content-platform/hestia/174433677295d059d572e.png)

제품이 사전 설정된 명령을 가지고 있다면, 페이지는 이미 해당 제품 범주에 설정된 기능 명령을 보여줍니다. click**Modify command solution** 페이지 하단에서 기존 버전의 변경을 확인한 후 **OK**를 클릭합니다.

:::기사
명령 솔루션을 수정한 후, 변경 사항에 대해 다시 릴리스해야 합니다.
:::

![AI 제품 명령](https://images.tuyacn.com/content-platform/hestia/1744336818df5433a91e3.png)

### 단계 1: 명령을 구성
**제품 카테고리 선택**

제품 카테고리는 음성 플랫폼 앱에서 표시된 장치 유형을 결정합니다. 가장 밀접한 장치와 일치하는 범주를 선택하십시오.

카테고리가 설정되지 않은 경우, click **Set Category**. 기존 범주를 변경하려면 **Modify**를 클릭하십시오. 음성 플랫폼에 맵을 입력한 다음 **OK**를 클릭합니다.

![AI 제품 명령](https://images.tuyacn.com/content-platform/hestia/1744337049397de1730d2.png)

** 기존 명령**

**Edit** in the**Operation** 칼럼에서, **Edit Command** 페이지에서 명령을 수정한 후 **OK**를 클릭합니다.

![AI 제품 명령](https://images.tuyacn.com/content-platform/hestia/1744337125a2b4e1bae83.png)

![AI 제품 명령](https://images.tuyacn.com/content-platform/hestia/1744337150a43f96d97ee.png)

**사용자 지정 명령 추가 **

사용자 정의 토글, 모드, 범위는 제품을 맞게 명령합니다. ** 사용자 지정 명령**을 클릭한 다음 **Add Function Command** 페이지에 다음을 구성합니다.

-**Custom Command Language**: 지원되는 언어 선택.
-**Function Command Name**: 명령어 이름을 입력, example **fan switch**.
- **Capability Type**: 구현할 수 있는 기능 유형을 선택하여 구성을 완료합니다. 예를 들어, **Toggle**를 선택하면 적용된 데이터 포인트(DP)와 친절한 이름을 구성하고 음성 기능 설명을 입력합니다.

![AI 제품 명령](https://images.tuyacn.com/content-platform/hestia/174433717487f3127bfcf.png)

![AI 제품 명령](https://images.tuyacn.com/content-platform/hestia/1744337199ee0eca085f3.png)

구성이 완료되면, 클릭 **OK**.

사용자 정의 음성 기능 구성에 대한 자세한 내용은 [Set Custom Capability](https://developer.tuya.com/en/docs/iot/voice-advanced-custom-language?id=Kb4xiveclrg9k) 또는 [서비스 티켓](https://service.console.tuya.com/8/3/create?step=2&id=010306)를 참조하십시오.

**기능 명령 추가 **

명령을 추가하려면, click **Add Command**를 추가하고 다음을 완료하십시오:

![AI 제품 명령](https://images.tuyacn.com/content-platform/hestia/174433722459999d4845b.png)

1.**Select Command**: 리스트에서, 추가할 명령을 선택하거나 검색한 후, **Configure** 를 클릭합니다.

![AI 제품 명령](https://images.tuyacn.com/content-platform/hestia/17443373042a60017f9df.png)

2.**Configure Command**: 함수 매개변수와 DP 매개변수 사이의 관계를 편집합니다.**recommended commands**, **custom commands**, 또는 **general commands**, click **OK**.

**power switch**를 예로 가져가면 DP를 선택하고 기능 속성을 구성하고, 전원 상태를 쿼리합니다.

![AI 제품 명령](https://images.tuyacn.com/content-platform/hestia/17443373382489868e48b.png)

3. (선택) 필요한 기능을 찾을 수없는 경우, 클릭 ** 사용자 정의 명령 **. 자세한 내용은 [Set Custom Capability](https://developer.tuya.com/en/docs/iot/voice-advanced-custom-language?id=Kb4xiveclrg9k)를 참조하십시오.

![AI 제품 명령](https://images.tuyacn.com/content-platform/hestia/1744337381f7320ea3ccd.png)

명령 솔루션을 구성한 후, **Confirm 및 Test**를 클릭합니다.

### 단계 2: 경험 구성
명령을 시도하려면 다음 단계를 따르십시오.

1. 수당 계정 구성. **Allowlist 계정** 섹션에서, **지금 구성 **. **Allowlist Configuration** 페이지에서 모바일 앱을 선택하고 수당 계정을 추가하십시오. 3개까지 추가할 수 있습니다.

![AI 제품 명령](https://images.tuyacn.com/content-platform/hestia/17443374193d0040288cf.png)

![AI 제품 명령](https://images.tuyacn.com/content-platform/hestia/1744337442ef57508c96c.png)

2. 가상 장치를 추가하십시오. OEM 앱 또는 **SmartLife** 앱을 사용하여 QR 코드를 스캔하고 가상 장치를 추가하십시오.
3. 검사와 시험. AI Smart Assistant를 입력하고 명령을 테스트하는 QR 코드를 스캔합니다.

![AI 제품 명령](https://images.tuyacn.com/content-platform/hestia/1744337511cf683b0dcab.png)

### 단계 3: 명령을 게시
**Next Step: Publish Effect**를 클릭하여 명령을 게시합니다. 설정 확인 및 클릭 ** OK**.

:::대여
지정된 명령은 수정할 수 없습니다. 게시하기 전에 설정을 확인합니다.
:::

![AI 제품 명령](https://images.tuyacn.com/content-platform/hestia/1744337567cc1f814af8b.png)

그 페이지는 **Released**를 보여줍니다.

![AI 제품 명령](https://images.tuyacn.com/content-platform/hestia/174433766391d696f3afc.png)

## 버전 관리
Click**Manage Versions** 를 클릭하고 편집합니다.

![AI 제품 명령](https://images.tuyacn.com/content-platform/hestia/174433770610240db31a7.png)

![AI 제품 명령](https://images.tuyacn.com/content-platform/hestia/1744337747a73a45b17a8.png)

구성을 시도하고 새로운 버전을 해제하려면, click **Add Version**.

![AI 제품 명령](https://images.tuyacn.com/content-platform/hestia/174433776788e91cf8cf9.png)

## 참조
- [지원 언어 및 음성 배리어](10-supported-languages-and-voice-variants)
- [Custom Voice 추가](10.1-add-custom-voice)
- [데이터베이스] (11-database)
