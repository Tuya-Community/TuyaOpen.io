---
title: "Tuya 제품 개발"
description: "Tuya IoT Platform에서 제품을 생성하여 고유한 PID를 받은 다음, TuyaOpen 펌웨어에 PID를 기록하여 DP, OTA 및 앱 패널을 제어합니다."
keywords:
  - 제품 ID
  - PID
  - Tuya IoT Platform
  - 데이터 포인트
  - TuyaOpen
---

Tuya Cloud에 연결하는 모든 디바이스에는 Tuya IoT Platform이 할당하는 전역 고유 식별자인 **PID(Product ID)**가 필요합니다. PID는 데이터 포인트(DP) 정의, 앱 제어 패널, OTA 채널 등 디바이스의 기능을 특정 제품에 연결합니다. 이 페이지에서는 제품을 생성하고 PID를 받은 뒤 펌웨어에 기록합니다.

## 자체 제품을 만드는 이유
TuyaOpen 데모 구성에는 하드웨어를 빠르게 온라인으로 연결할 수 있도록 기본 PID가 포함되어 있습니다. 그러나 이 PID는 Tuya 공식 계정에 속하므로 **직접 관리할 수 없습니다**.

| 기능 | 기본 PID | 자체 PID |
|---------|------------|--------------|
| 디바이스를 클라우드에 연결 | ✅ | ✅ |
| DP 기능 추가 또는 수정 | ❌ | ✅ |
| 앱 제어 패널 사용자 지정 | ❌ | ✅ |
| 펌웨어 OTA 구성 | ❌ | ✅ |
| 디바이스 자격 증명 관리 | ❌ | ✅ |
| 대량 생산 및 인증 | ❌ | ✅ |

**권장 사항**: 기본 하드웨어 연결을 확인한 후 Tuya IoT Platform에서 자체 제품을 만들고 PID를 펌웨어에 기록하세요. 이후 개발과 테스트는 자체 제품을 사용해야 합니다.

## 제품 생성
### 사전 요구 사항
- [Tuya IoT Platform](https://iot.tuya.com)에 등록된 계정

### 단계
**1단계 — 제품 생성 페이지 열기**

로그인한 후 콘솔 홈 페이지에서 **Create Product**를 클릭합니다.

![Create Product 클릭](https://images.tuyacn.com/content-platform/hestia/17428135827bbc5093763.png)

**2단계 — 제품 카테고리 선택**

표준 카테고리 트리를 탐색하거나 검색 상자에서 제품에 맞는 카테고리를 찾습니다.

![카테고리 트리 탐색](https://images.tuyacn.com/content-platform/hestia/1742813665c8914847383.png)

![카테고리 검색](https://images.tuyacn.com/content-platform/hestia/17428137261919d4c3cad.png)

**3단계 — 스마트 솔루션 유형 선택**

**Product Development**를 선택합니다.

![스마트 모드 선택](https://images.tuyacn.com/content-platform/hestia/1646129350bfc54f88c02.png)

**4단계 — 제품 솔루션 선택**

**Custom Solution**을 선택합니다. 애플리케이션 로직을 직접 작성하고 최대한의 유연성이 필요한 TuyaOpen에 적합한 선택입니다.

![제품 솔루션 선택](https://images.tuyacn.com/content-platform/hestia/17428138357c2ba3916f6.png)

**5단계 — 제품 정보 입력**

| 필드 | 설명 |
|-------|-------|
| Product Name | 권장 형식: 브랜드 + 제품 + 모듈. 예: `MyBrand Smart Plug T5AI` |
| Communication Protocol | 하드웨어에 맞게 선택합니다(예: Wi-Fi, Ethernet). |
| Power Type | 상용 전원 디바이스에는 **Powered**를 선택합니다. |
| 기타 필드 | 선택 사항이며 나중에 입력할 수 있습니다. |

**Create Product**를 클릭하면 플랫폼이 고유 PID를 생성합니다.

**6단계 — PID 복사**

제품 상세 페이지를 열면 **Hardware Development** 또는 **Basic Information** 섹션에 **Product ID (PID)**가 표시됩니다.

:::tip
PID는 `kh0hig0fdtlzndvg`와 같은 영숫자 문자열입니다.
:::

## 펌웨어에 PID 기록
**방법 1 — menuconfig 사용(권장)**

**애플리케이션 프로젝트 루트 디렉터리**에서 다음 명령을 실행합니다.

```bash
tos.py config menu
```

`TUYA_PRODUCT_ID` 옵션을 찾아 PID를 입력하고 저장합니다.

**방법 2 — 설정 파일 직접 수정**

`your_chat_bot/app_default.config` 또는 애플리케이션에 해당하는 설정 파일을 수정합니다.

```ini
CONFIG_TUYA_PRODUCT_ID="your_pid_here"
```

저장한 후 다시 빌드하고 플래시합니다.

:::note
`.config` 파일을 변경하면 디바이스에 적용하기 전에 클린 빌드가 필요합니다. 먼저 `tos.py clean -f`를 실행한 후 다시 빌드하세요.
:::

## 다음 단계
- **Function Definition** — Tuya IoT Platform에서 제품 DP를 정의합니다([Function Definition](https://developer.tuya.com/en/docs/iot/define-product-features?id=K97vug7wgxpoq)).
- **Device Panel** — 앱 제어 패널을 구성하거나 사용자 지정합니다([Device Panel](https://developer.tuya.com/en/docs/iot/app-ui-design?id=K914jpghswnq0)).
- **Hardware & Embedded Development** — 하드웨어 회로를 설계하고 TuyaOpen으로 펌웨어를 개발합니다.
- **Verify Firmware Upgrade** — 디바이스 OTA 업그레이드를 확인합니다([Verify Firmware Upgrade](firmware-ota)).
- **Product Configuration** — 클라우드 파라미터, 일정, 자동화 및 기타 제품 기능을 설정합니다([Product Configuration](https://developer.tuya.com/en/docs/iot/product-configuration?id=K97vxa8ef6gig)).
- **Product Testing** — Tuya 플랫폼 도구로 연결, 기능 및 안정성을 확인합니다([Product Testing](https://developer.tuya.com/en/docs/iot/test-services?id=Ka5crghsvztpq)).

## 참고
- [Tuya IoT Platform — 플랫폼에서 구성](https://developer.tuya.com/cn/docs/iot/configure-in-platforms?id=Ka5k7v9absls7)
- [Tuya IoT Platform — 제품 생성](https://developer.tuya.com/cn/docs/iot/create-product?id=K914jp1ijtsfe)
