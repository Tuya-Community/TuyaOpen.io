---
title: 개발자 라이센스 받기 (Authorization Code)
description: "TuyaOpen 제품 개발 및 클라우드 연결 디버깅을 위한 Tuya Developer Platform의 UUID 및 AuthKey"
keywords:
  - developer license
  - authorization code
  - uuid
  - authkey
  - tuya developer platform
---

이 가이드는 Tuya Developer Platform의 무료 개발자 라이센스 (authorization codes)를 제품 개발 및 디버깅에 대해 설명합니다. TuyaOpen-specific UUID 및 AuthKey가 필요한 개발자는 Tuya Cloud에 장치를 연결하거나 클라우드 의존 기능을 사용합니다.

## 제품정보
제품 개발 단계에서 Tuya Developer Platform에서 2 개의 무료 장치 라이센스를 주장 할 수 있습니다. 애플리케이션이 Tuya Cloud 서비스(예: IoT 연결, AI 기능)을 사용할 때 이러한 라이선스가 필요합니다. 이 가이드는 플랫폼에 제품을 만들고 무료 라이센스를 주장하는 것을 통해 걸어 갑니다.

## 자주 묻는 질문
- Tuya Developer Platform 계정. 하나 만들기[Tuya IoT 플랫폼](https://platform.tuya.com/)필요한 경우.

## 제품 정보
- Tuya Developer Platform 액세스 (웹).
- 제품을 만들 때 (단계 1), 선택 ** 목록에서 어떤 카테고리 ** 당신의 이상적인 제품에 가장 가깝습니다. 선택하기에 너무 많은 것을 걱정하지 마십시오. 빠른 시작을위한 시작 템플릿뿐이며 모든 기능은 나중에 사용자 정의 및 재구성 할 수 있습니다. **AI-Agent** 기능을 원한다면, **AI-TAG** 제품 템플릿을 리스트에서 선택하세요.

## 한국어
### 1. Tuya Developer Platform의 제품 만들기
로그인하기[Tuya 개발자 플랫폼](https://platform.tuya.com/)목록에서 범주를 선택하여 제품을 만듭니다 (위의 요구 사항을 참조).

![Tuya Developer Platform은 제품 페이지를 만듭니다.](https://images.tuyacn.com/fe-static/docs/img/4e078c3c-5f58-4d88-a3ff-1cd45992aa68.png)

### 2. T5 모듈을 선택하고 placeholder 더미 펌웨어를 추가하십시오.
제품을 만들기 후, T5 모듈을 선택 한 다음 ** 사용자 지정 펌웨어 추가 **. 계속 진행하고 라이센스를 주장하려면, 당신은 ** 어떤 더미 파일 또는 이미지 ** 펌웨어 슬롯의 위주자로 업로드 할 수 있습니다; 플랫폼은 파일에 뭔가를 필요로. 당신은 당신이 생산을 준비할 때 항상 당신의 진짜 QIO (생산) 및 UG (업그레이드) 펌웨어로 대체하기 위하여 나중에 돌려보낼 수 있습니다.

![T5 모듈 선택 및 펌웨어 업로드](https://images.tuyacn.com/fe-static/docs/img/117897a8-614e-47e0-b74f-d57b39bed964.png)

### 3. 클레임 2 무료 인증 코드
제품 페이지에서 2 무료 인증 코드 (라이센스)를 주장 할 수있는 옵션을 클릭하십시오.

![Claim 무료 인증 코드](https://images.tuyacn.com/fe-static/docs/img/2a7a0512-79a7-4cc8-874a-ba9c659babfd.png)

### 4. 라이센스 목록에서 확인
라이센스 목록 열기. 제품 개발 단계에서 개발 및 디버깅을 위해 2 개의 무료 장치 라이센스 (20.00 엔)를 청구 할 수 있습니다. **Claim**를 클릭한 후, 2개의 라이선스가 발급됩니다.

![인증 목록](https://images.tuyacn.com/fe-static/docs/img/2e355e9f-c09e-44c5-9786-adf1663a8fa6.png)

## 장치에 대한 라이센스를 작성
라이센스 (UUID 및 AuthKey)가 있으면 하드웨어에 따라 어떻게 쓸 수 있습니다.

** 시리얼 장치가있는 MCU ** -이 방법 중 하나를 사용합니다.

:::note MCU: 한 번 쓰기, 펌웨어 업데이트를 통해 persists
MCU에서 한 번 라이센스를 작성하면 충분합니다. **non-application K-V persistent area**에 저장됩니다. 플래시 새로운 펌웨어는 라이센스를 보존합니다. **완전 플래시 지우개 **를 실행하거나 **새로운 키**를 writting하면 손실됩니다.
:::

### Tyutool GUI를
tyutool 데스크탑 GUI를 사용하여 장치에 연결하고 권한 부여를 작성합니다.

![Tyutool GUI를](https://images.tuyacn.com/fe-static/docs/img/f1f18bee-808e-4368-97ff-9564eed0c4bc.png)

### TuyaOpen 직렬 웹 도구
크롬 기반 브라우저에서, 열다[TuyaOpen 직렬 도구](https://tuyaopen.ai/tools/), 허가 포트에 연결하고 **TuyaOpen (authorization write) ** 탭을 사용하여 UUID 및 AuthKey를 입력하고 장치에 쓰기.

![TuyaOpen 직렬 웹 도구](https://images.tuyacn.com/fe-static/docs/img/4f8aa20c-5f2c-4072-9464-1b7934b40968.png)

### 연속 CLI
직렬 모니터를 사용 하 고 실행`auth`로그인[장비 인증](/docs/quick-start/equipment-authorization).

### 펌웨어에 라이센스를 저장 (MCU)
편집하기`tuya_config.h`헤더: 설정`TUYA_OPENSDK_UUID`이름 *`TUYA_OPENSDK_AUTHKEY`매크로, 다시 빌드 및 플래시. 영구적으로, per-build 구성에 대 한 유용한. 결과 펌웨어 바이너리는 ** 하나의 장치** (클라우드 연결용 장치당 1 UUID)에서만 사용할 수 있습니다.

### 파일 시스템 (예 : Linux, Raspberry Pi)
이 라이선스는 header** 및 compiled에 *hardcoded, 또는 **file**에 유지되거나 runtime에 사용됨.

:::note 1개의 UUID의 1개의 온라인 장치
각 UUID는 클라우드 연결을위한 단일 장치에 바인딩됩니다. UUID (및 그 AuthKey)를 사용하여 만 ** 장치는 Tuya Cloud에서 온라인으로 할 수 있습니다. AuthKey는 ** 대신 원래 장치가 ** Tuya Smart Life 앱 (또는 Tuya 계정)에서 ** 만 다른 장치에서 사용할 수 있습니다. 다른 보드에 동일한 라이센스를 재사용하기 전에 앱에서 장치를 설정.
:::

:::tip 라이선스가 필요한 경우?
라이선스 키(UUID + AuthKey)는 **만 사용할 경우 **Tuya Cloud 서비스 **(예: IoT 연결, AI 기능, 장치 활성화). 로컬 또는 오프라인 애플리케이션은 라이센스가 필요하지 않습니다.
:::

## 이름 *
- [Tuya 개발자 플랫폼](https://platform.tuya.com/)– 제품 생성 및 라이센스 관리
- [장비 인증](/docs/quick-start/equipment-authorization)– UUID와 AuthKey를 쓰는 Serial CLI 방법
- [TuyaOpen 직렬 도구](https://tuyaopen.ai/tools/)– 웹 기반 직렬 및 인증 도구 (Chrome 필요)
- [인증 및 라이센스 문제](/docs/faqs#authorization-and-license-issues)– TuyaOpen 라이센스 및 허가에 대한 FAQ
