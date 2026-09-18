---
title: 자율 제어 명령
description: "Tuya의 자체 제어 명령은 자체 사용자의 목소리에 대한 장치 역할을 할 수 있습니다. 명령을 정의하고 클라우드 일치를 표현하고 장치가 실행됩니다."
keywords:
  - self-control commands
  - tuya ai agent
  - voice commands
  - natural language
  - tuya cloud
---

자체 제어 명령은 장치가 자신의 사용자가 말하는 것에 행동 할 수 있습니다 — "모ve forward", "lower the volume", "what's battery level?"- 루프에 다른 장치없이. 플랫폼에서 명령과 자연적인 언어 표현을 정의하고, 구름은 semantic 승인 후에 명령에 사용자 utterance를 일치하고, 장치는 그것을 실행합니다. AI 인형, AI 로봇, 스마트 물 분배기와 같은 음성 또는 텍스트 상호 작용을 가진 스마트 장치에 적합합니다.

## 개념
## 셀프 제어 명령
자체 제어 명령은 장치 자체와 상호 작용하여 직접 설정된 명령입니다. 자연적인 언어를 기기가 실행할 수 있는 무언가로 바꾸려면, 장치와 클라우드 모두에서 이러한 명령을 미리 설정할 수 있습니다. 클라우드는 사용자의 의도를 인식한 후 올바른 명령을 제공합니다.

### 표현
표현식은 사용자의 자연 언어 입력과 일치하는 많은 phrasings 중 하나입니다. 각 표현은 특정한 자기 통제 명령에 지도를 나타내며, 인식 정확도와 타격률을 높입니다.

예를 들어, 명령 "빛을 켜"등의 표현을 수행 할 수 있습니다 "빛을 켜십시오", "빛을 켜십시오", "빛을 활성화", "방을 켜십시오". 풍부한 표현식 라이브러리는 시스템 해석이 다양한 phrasing을 컨텍스트를 통해 전달하고 올바른 동작을 트리거합니다.

## 셀프 제어 명령 대. 수동 명령
|제품정보|이름 *|일반적인 시나리오 및 표현|설정하기|연락처|
| --- | --- | --- | --- | --- |
|**Self-control 명령**|device**recognizes voice commands and act on its own**, 그래서 사용자는 장치의 자체 함수를 직접 제어합니다.|• AI 인형 : 볼륨을 켜고 배터리 레벨을 확인하십시오. <br/>• 로봇: 앞으로 이동, 뒤로 이동, 춤.|장치 자체.|사용자는 장치 (voice/text)에 말합니다.|
|** 수동 명령**|장치는 ** 다른 장치로 제어 ** 단속 자동화 용 **, 스피커 제어 에어 컨디셔너와 같은.|• 똑똑한 스피커는 에어 컨디셔너를 통제합니다: 온도를 더 높이 놓으십시오. <br/>• 조명: 빛을 켭니다. **주의: 대상 장치는 명시적으로 지정되어야 합니다.**|통제되는 장치. 스피커 제어 조명과 같은 단부 제어를 위해, 대상 장치 (빛)는 수동 명령을 구성해야하므로 외부 명령을 수용 할 수 있습니다.|user issues voice/text commands to the main control device.|

### 자기 제어 명령을 사용할 때
자기 제어 명령을 구성하면 장치가 **를 견딜 수 있고 사용자 목소리 또는 문자 명령에 응답 **. 이 지원:

- 직접 사용자 장치 실행을위한 내장 음성 상호 작용 장치 - AI 인형, 로봇, 물 분배기. 예: "낮은 볼륨", "체크 배터리 레벨".
- 많은 phrasings에서 사용자 정의 semantic 취급이 필요한 기본 하드웨어 제어 장치. 예: "놀이", "춤" "물"
- 플랫폼에 정의된 Custom expressions, intents 및 슬롯 구성.

### 사용 사례
**홈 조명 제어 **

![홈 조명 제어 예](https://images.tuyacn.com/content-platform/hestia/1743404357232c546097c.png)

** Thermostat 제어 **

장치의 PID가 AI 명령을 구성할 때 (온도 온도 설정과 같은) 에이전트는 ** 장치 제어 ** 플러그인 활성화, AI로 채팅 장치.

![Thermostat 제어 예](https://images.tuyacn.com/content-platform/hestia/1743404481a00087a879c.png)

## # 필수품
- [Wukong SDK v3.12.12 이상 펌웨어 개발](https://developer.tuya.com/en/docs/iot-device-dev/wukongai_version_release?id=Kegae21edhfyb) 자체 제어 기술은 v3.12.12 이전에 사용할 수 없습니다.
- App v6.7.0 이상은 miniapp 또는 panel 기반 장치 제어에 필요합니다.
- 플랫폼 구성:
- 제품의 AI 기능에 있는 AI 대리인을 비우고 그 대리인을 위한 **Device Control** 기술을 가능하게 합니다.

![제용장치 제어 기술](https://images.tuyacn.com/content-platform/hestia/1750925532345f7965ffd.png)

-** 및 release** 제품 자체 제어 명령.

:::기사
구성은 릴리스 후 약 20 분 정도 걸립니다.
:::

## 단계 1: DP 명령 구성
DP 명령 구성은 장치 자체 제어의 기초입니다.

1. [Tuya Developer Platform] (https://platform.tuya.com/)에 로그인하십시오.
2. 왼쪽 내비게이션 바에서 **AI Agent** > **Agent Configuration** > **AI Control Command Configuration**를 클릭하여 [**AI Product Command**](https://platform.tuya.com/exp/voice/ai) 페이지를 엽니다.
3. **Self-control 명령** 탭을 클릭합니다.

![자기 제어 명령 탭](https://images.tuyacn.com/content-platform/hestia/1750925148af09e125d33.png)

제품이 사전 설정된 명령을 가지고 있다면, 페이지는 이미 해당 제품 범주에 설정된 기능 명령을 보여줍니다. 을 클릭합니다 ** 명령 솔루션** 아래에서 기존 버전의 변경을 확인한 다음 **OK**를 클릭합니다.

:::기사
수정한 후 명령어를 다시 실행합니다.
:::

![명령 솔루션](https://images.tuyacn.com/content-platform/hestia/1750925090e58e002db34.png)

그런 다음 DP 명령 또는 비 DP 명령을 추가하십시오. 상세한 단계를 위해, 보기:

- [https://developer.tuya.com/en/docs/iot/Self-control?id=Kep3yhifdrvah#DP 추가]
- [Non-DP 명령 추가](https://developer.tuya.com/en/docs/iot/Self-control?id=Kep3yhifdrvah#NonDP)

![ 명령 옵션 추가](https://images.tuyacn.com/content-platform/hestia/17509241229d984be8d96.png)

### DP 명령어 추가
DP 명령은 장치의 전원 On/off, 밝기, 모드를 제어하는 데이터 포인트입니다. DP 구조와 유형을 정의하면 플랫폼은 의도하고 명령을 자동으로 전달합니다.

Click**Add Command**, select **DP 명령어**, **Create Self-Control Command** 페이지에 구성을 완료:

- [언어 선택](https://developer.tuya.com/en/docs/iot/Self-control?id=Kep3yhifdrvah#language)
- [DP 선택] (https://developer.tuya.com/en/docs/iot/Self-control?id=Kep3yhifdrvah#dp)
- [명령 입력](https://developer.tuya.com/en/docs/iot/Self-control?id=Kep3yhifdrvah#type)
- [설정 동의](https://developer.tuya.com/en/docs/iot/Self-control?id=Kep3yhifdrvah#synonym)
- [설정 표현](https://developer.tuya.com/en/docs/iot/Self-control?id=Kep3yhifdrvah#expression)
- [익스프레스 예](https://developer.tuya.com/en/docs/iot/Self-control?id=Kep3yhifdrvah#example)
- [Save 구성](https://developer.tuya.com/en/docs/iot/Self-control?id=Kep3yhifdrvah#save)

![자체 제어 명령 페이지](https://images.tuyacn.com/content-platform/hestia/1750924190f79f5909d11.png)

#### 언어 선택
이 명령의 언어를 선택하여, 로컬의 표현에 사용:

- 중국 상호 작용을 위해, **Chinese**를 선택하고 중국어 표현을 제공합니다.
- 다국어 제어를 위해 여러 언어를 추가하고 각 표현을 구성합니다.

언어 선택은 일치 정확도에 영향을 미칩니다. 사용자의 실제 언어에 대한 구성.

#### 선택 DP
장치 기능 정의에서 제어하는 DP를 선택하십시오. 플랫폼은 이 DP 유형을 지원합니다:

- `Bool`: 볼란
- `Enum` : 오염
- `Value`: 숫자 값
- `String` : 문자열

`Raw` 타입은 아직 지원되지 않습니다.

#### 명령어 유형 선택
DP 유형에 따라 구성할 수 있는 명령 유형:

|DP 유형|Configurable 명령 유형|
| --- | --- |
|뚱 베어|설정. 예를 들면, on/off.|
|뚱 베어|설정. 예를 들어, 특정 모드로 전환합니다.|
|주요 특징|설정, 상승, 낮은. 예를 들어, 밝기를 80 %로 설정하면 온도를 높이십시오.|
|팟캐스트|설정. 예를 들어, 특정 곡을 재생합니다.|

#### 세트 synonyms
DP 값에 대한 synonyms를 설정하여 다양한 phrasing을 정상화하여 올바른 명령이 트리거됩니다.

예:

- DP 값 `on` - 익명 : `start`, `activate`, `enable`.
- DP 값 `off` - 익명 : `shut down`, `sleep`, `stop`.

구성 방법:

- 유연한 일치를 위한 각 DP 가치의 밑에 다수 synonyms를 추가하십시오.
- `#dpValue#` placeholder 를 사용하여 동적으로 일치한 synonym 를 참조합니다.

Boolean과 enumeration DPs만 동시 설정할 수 있습니다.

### 설정 표현
Expressions match user' natural-language 입력과 일치하는 명령을 트리거합니다. 가이드라인:

- 각 표현은 전형적인 phrasing을 나타냅니다. 예:
- 침실 빛 켜기
- 팬을 3 레벨로 설정
- 재사용을 위한 placeholder를 사용합니다. 예:
- `#percentValue#` : 수치 DP의 비율 값.
- `#dpValue#`: DP 가치 동의.

### Expression 예제
|장치 유형|명령 유형|DP 유형|Expression 예제|값 설명|
| --- | --- | --- | --- | --- |
|AI 인형|DP를|주요 특징|#dpValue#에 볼륨 설정|DP: 볼륨 (케터 M1X ID: 101), 값 = #number#|
|  |DP를|주요 특징|볼륨을 조금 증가|DP: 볼륨, 값 = 현재 값 + 10 (example)|
|  |DP를|주요 특징|더 낮은 볼륨|DP: 볼륨, 값 = 현재 값 - 10 (example)|
|로봇 로봇|비 DP| - |이동하기|사용자 정의 값: 앞으로 (example)|
|  |비 DP| - |뒤로 이동|사용자 정의 값: backward (example)|
|  |비 DP| - |나를 위한 춤|사용자 정의 값 : 댄스 (example)|
|  |비 DP| - |왼쪽으로|사용자 지정 값: 왼쪽 (example)|
|  |비 DP| - |오른쪽으로 몇 단계 걸어|사용자 정의 값 : 산책 (example)|

- DP 기반 장치 (케터M3X 인형과 같은) : 플랫폼은 특정 DP (양과 같은)을 보내고 `#dpValue#` 플레이스홀더를 사용하여 역동적으로 값을 할당합니다.
- Non-DP 장치 (로봇과 같은) : 사용자 정의 동작 명령을 정의합니다 (케터M1X 및 `dance`와 같은), 패싱 및 장치에서 실행.

#### 설정 저장
설정 완료 후, 솔루션 목록에서 명령을 볼 수 있습니다.

### 비-DP 명령 추가
Non-DP 명령은 장치가 플랫폼 정의 DP에 의존하지 않을 때 적용되지만 사용자 정의 컨트롤 명령을 대신 사용합니다. 사용자 정의 프로토콜 파싱 장치 - 로봇, 로봇 팔 - non-DP 명령을 사용하십시오.

클릭 ** 명령 추가 ** 및 선택 **Non-DP 명령**. ** 자동 제어 명령 ** 페이지, 완료:

- [언어 선택](https://developer.tuya.com/en/docs/iot/Self-control?id=Kep3yhifdrvah#nondplanguage)
- [사용자 지정 명령 코드 설정](https://developer.tuya.com/en/docs/iot/Self-control?id=Kep3yhifdrvah#nondpcode)
- [설정 표현](https://developer.tuya.com/en/docs/iot/Self-control?id=Kep3yhifdrvah#nondpexpression)
- [값 설정](https://developer.tuya.com/en/docs/iot/Self-control?id=Kep3yhifdrvah#nondpvalue)

![Non-DP 명령 페이지](https://images.tuyacn.com/content-platform/hestia/1750924392af79a812329.png)

#### 언어 선택
언어 선택 명령은 다국어 상호 작용을 가능하게 합니다. 각 언어는 자신의 표현이 필요합니다.

예:

- 중국식 시장의 기기는 중국식 표현을 포함해야 합니다.
- 영어 통제를 위해, 중국어와 함께 영어 표현을 구성하십시오.

#### 사용자 정의 명령 코드 설정
각 Non-DP 명령에 대한 사용자 정의 코드를 구성하여 장치 실행을 식별합니다.

** command code**는 고유의 식별자입니다. 계속하고 명확하게.

### 설정 표현
명령 당 여러 표현을 구성하므로 사용자는 같은 명령을 위해 다양한 음성 또는 텍스트 입력을 사용할 수 있습니다.

`#dpValue#`와 같은 위주들은 더 다용도 및 확장성을 표현합니다.

### 값 설정
디바이스는 non-DP 명령을 통해 사용자 지정값을 수신하고 파싱합니다.

- 사용자 정의 JSON, 문자열 또는 프로토콜 별 형식으로 값을 보낼 수 있습니다.
- 디바이스 개발자는 값의 형식과 논리를 완전히 정의합니다.

예:

|명령 코드|Payload (예)|이름 *|
| --- | --- | --- |
|제품정보|`{ "action": "move", "dir": "fwd" }`를|이동하기|
|▪ 댄스|`"action_dance"`를|댄스 (string 기반)|
|턴 왼|`{ "cmd": "turn", "value": "left" }`를|왼쪽으로|

- 플랫폼은 장치에 가치를 전달합니다. 논리 실행은 장치에서 실행됩니다.
- Non-DP 명령은 사용자 정의프로토콜 장치보다 제어 유연성을 제공합니다. 사용자 정의 표현, 명령 코드 및 다양한 인간 기계 상호 작용을 구축하는 값을 결합합니다.

명령 솔루션을 구성한 후, **Confirm 및 Test**를 클릭합니다.

## 단계 2: 윤곽을 시험하십시오
![테스트 항목](https://images.tuyacn.com/content-platform/hestia/17509245056f49d02e837.png)

클릭 **테스트로 이동** 단계에 따라:

![테스트 흐름](https://images.tuyacn.com/content-platform/hestia/1750924581c001bb70e97.png)

1. 수당 계정 구성. **Allowlist 계정**, 클릭 **Add Account**. 모바일 앱을 선택하고 계정을 추가한 다음 **Save**를 클릭합니다. 최대 3개의 계정을 추가할 수 있습니다.
2. 가상 장치를 추가하십시오. OEM 앱 또는 **SmartLife** 앱을 사용하여 QR 코드를 스캔하고 가상 장치를 추가하십시오.
3. 검사와 시험. AI Smart Assistant 및 테스트를 입력하는 QR 코드를 스캔합니다.

## 단계 3: 출판
**Next Step: Publish Effect**를 클릭하여 명령을 게시합니다. 설정 확인 및 클릭 ** OK**.

:::대여
지정된 명령은 수정할 수 없습니다.
:::

![출발확인](https://images.tuyacn.com/content-platform/hestia/17509246583441235f025.png)

그 페이지는 **Released**를 보여줍니다.

![최근 상태](https://images.tuyacn.com/content-platform/hestia/1750924702b6f29a4e09f.png)

## 버전 관리
Click**Manage Versions** 을 클릭하여 편집합니다.

![관리 버전](https://images.tuyacn.com/content-platform/hestia/175092482725e584e7b1d.png)

![역사 버전 페이지](https://images.tuyacn.com/content-platform/hestia/175092491823104692d04.png)

click **Add Version** 구성을 테스트하고 새로운 버전을 출시합니다.

![버전 추가](https://images.tuyacn.com/content-platform/hestia/1750924947826266922d9.png)

## 참조
- [AI 제품 명령] (ai-product-commands) - 동반자 명령 설정
- [Role Management](role-management) - 디바이스를 1인에게 전달합니다.
