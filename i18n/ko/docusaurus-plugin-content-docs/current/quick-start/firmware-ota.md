---
title: "펌웨어 업그레이드"
description: "Tuya IoT Platform을 통해 배포된 TuyaOpen 디바이스에 원격으로 펌웨어 OTA 업그레이드를 적용합니다. 키 생성, 업로드, 게시, 규칙 설정, 검증 및 릴리스를 안내합니다."
keywords:
  - 펌웨어 OTA
  - 무선 업그레이드
  - Tuya IoT Platform
  - 디바이스 펌웨어
  - TuyaOpen
---

펌웨어 OTA(over-the-air) 업그레이드는 Tuya IoT Platform을 통해 배포된 디바이스에 새 펌웨어 버전을 원격으로 배포합니다. 이 가이드는 펌웨어 키 생성, 펌웨어에 키 기록, 새 버전 업로드, 게시, 업그레이드 규칙 설정, 검증 및 릴리스의 7단계를 설명합니다.

## 사전 요구 사항
- PID가 있는 [Tuya IoT Platform](https://iot.tuya.com) 제품
- Tuya Cloud에 연결된 디바이스(UUID/AuthKey 구성 완료)

## 1단계: 펌웨어 키 생성
펌웨어 키는 플랫폼에서 펌웨어를 고유하게 식별합니다. 하나의 제품(PID)에 여러 펌웨어 키를 만들 수 있으며, 각 키는 하드웨어 변형 또는 펌웨어 브랜치에 대응합니다.

1. [Tuya IoT Platform](https://iot.tuya.com)에 로그인하고 **Product Development > Hardware Development**로 이동합니다.
2. 클라우드 연결 유형과 하드웨어 모듈을 선택합니다.

![클라우드 연결 유형 및 하드웨어 모듈 선택](https://images.tuyacn.com/fe-static/docs/img/b67f5e64-7976-4e44-8843-6ce4ecd321a1.png)

   - **Cloud connection type**: **TuyaOS** 또는 **TuyaOS AI**를 선택합니다.
   - **Hardware module**: Tuya 모듈을 사용하면 목록에서 해당 모듈 솔루션을 선택합니다. 사용자 지정 모듈이면 선택하지 않아도 됩니다.
3. 선택한 모듈 솔루션 행 또는 사용자 지정 펌웨어 행에서 **Add Custom Firmware**를 클릭합니다.
4. 펌웨어 기본 정보를 입력하고 **Confirm**을 클릭하면 플랫폼이 **firmware key**를 생성합니다.

![펌웨어 정보 입력](https://images.tuyacn.com/fe-static/docs/img/df14b972-b7f6-45dc-a07e-f52a1023b309.png)

   - **Firmware name**: 자유롭게 지정할 수 있습니다.
   - **Firmware type**: **Module Firmware (Direct Connect)**를 선택합니다.
   - **Network type**: 모듈 연결 방식에 맞게 선택합니다.
   - 사용자 지정 하드웨어는 Tuya 생산 솔루션을 지원하지 않습니다.
5. 생성된 펌웨어 키를 복사합니다. 이 키를 펌웨어 코드에 포함해야 합니다.

## 2단계: 펌웨어에 키 기록
:::info
`firmware_key` 설정은 선택 사항입니다. 생략하면 플랫폼은 PID당 펌웨어가 하나뿐이며 OTA에서 키 구분이 필요하지 않다고 간주합니다. T5, T3 등 여러 하드웨어 플랫폼에 서로 다른 키를 사용하는 경우에는 반드시 설정해야 합니다.
:::

1. `tuya_config.h` 또는 앱에 해당하는 설정 헤더에 키를 정의합니다.

```c
#define TUYA_DEVICE_FIRMWAREKEY   "your_firmware_key_here"
```

2. `tuya_main.c`에서 `tuya_iot_init` 호출을 찾고 `firmware_key` 필드를 추가합니다.

```c
ret = tuya_iot_init(&ai_client, &(const tuya_iot_config_t){
    .software_ver = PROJECT_VERSION,
    .productkey   = TUYA_PRODUCT_ID,
    .uuid         = license.uuid,
    .authkey      = license.authkey,
    .firmware_key = TUYA_DEVICE_FIRMWAREKEY,   // ← add this line
    .event_handler = user_event_handler_on,
    .network_check = user_network_check,
});
```

3. 펌웨어 버전 번호를 높입니다. OTA는 낮은 버전에서 높은 버전으로만 업그레이드하므로 실행 중인 버전보다 높아야 합니다. `tos.py config menu`를 실행하고 **Configure Project**에서 `PROJECT_VERSION`을 찾아 `"xx.xx.xx"` 형식(예: `"1.0.1"`)으로 설정합니다.
4. `tos.py clean -f`를 실행한 뒤 펌웨어를 다시 빌드하고 플래시합니다.

## 3단계: 새 펌웨어 버전 업로드
1. 왼쪽 메뉴에서 **Product > Device > Firmware Management**로 이동합니다.
2. 해당 펌웨어 키를 찾아 **Add Firmware Version**을 클릭합니다.

![펌웨어 버전 추가](https://images.tuyacn.com/content-platform/hestia/16608056095d8ab7fad88.png)

3. 버전 번호와 릴리스 노트를 입력하고 컴파일된 펌웨어 파일을 하나씩 업로드합니다.

   | 펌웨어 유형 | 파일명 패턴 | 설명 |
   |---------------|-----------------|-------------|
   | Production firmware | `QIO` 포함 | 전체 칩 공장 플래시용 |
   | User-partition firmware | `UA` 포함 | 파티션 기반 공장 플래시용 |
   | Upgrade firmware | `UG` 포함 | 원격 OTA 업그레이드용 |

   :::info
   현재 TuyaOpen 펌웨어는 차분(delta) 업그레이드를 지원하지 않습니다. 항상 전체 펌웨어 패키지를 업로드하세요.
   :::

![펌웨어 버전 정보 입력](https://images.tuyacn.com/content-platform/hestia/1625197826c5068297e7a.png)

4. **Save**를 클릭합니다. 버전이 **Unpublished** 상태로 생성됩니다.

## 4단계: 펌웨어 버전 게시
OTA에 사용하려면 기본적으로 게시되지 않은 펌웨어 버전을 먼저 게시해야 합니다.

1. 펌웨어 버전 목록에서 새 버전을 찾아 **Publish Firmware**를 클릭합니다.
2. 게시 내용으로 **Upgrade Firmware**를 선택하고 사용 범위를 설정합니다(기본값: 제한 없음).
3. 확인합니다. 상태가 **Published**로 변경됩니다.

![펌웨어 버전 게시](https://images.tuyacn.com/content-platform/hestia/1660805709098031c1697.png)

## 5단계: 업그레이드 규칙 설정
1. 왼쪽 메뉴에서 **Product > Device > Firmware OTA**로 이동합니다.
2. **Firmware Source**에서 **Custom Upload** 속성이 있는 펌웨어를 선택합니다.
3. **New Firmware Upgrade**를 클릭하고 다음을 입력합니다.

![새 펌웨어 업그레이드](https://images.tuyacn.com/content-platform/hestia/1660805737c0024a7a1a6.png)

| 파라미터 | 설명 |
|-----------|-------------|
| Firmware Version | 새로 게시한 버전 선택 |
| Upgrade Method | App-prompted / App-forced / App-detected |
| Versions to Upgrade | 업그레이드할 이전 버전 선택(기본값은 모든 하위 버전) |
| Regions | 대상 지역 선택(기본값은 모든 지역) |

![업그레이드 규칙 설정](https://images.tuyacn.com/content-platform/hestia/166080576438794904dd9.png)

4. **Confirm**을 클릭합니다. 업그레이드 기록이 생성됩니다.

## 6단계: 검증
모든 사용자에게 릴리스하기 전에 테스트 디바이스에서 OTA 흐름을 검증하는 것이 좋습니다.

1. **Common Verification Devices**에서 앱 계정 또는 디바이스 ID로 테스트 디바이스를 화이트리스트에 추가합니다.
2. **Verify**를 클릭하여 테스트 디바이스에 펌웨어를 배포합니다.
3. **Check Upgrade Completion**을 클릭하여 새 버전으로 업그레이드되었는지 확인합니다.

![펌웨어 업그레이드 검증](https://images.tuyacn.com/content-platform/hestia/16569450854881eb8d1ca.png)

## 7단계: 릴리스
검증을 통과하면 **Release**를 클릭하여 업그레이드를 배포합니다.

- **점진적 배포**: 먼저 소수의 디바이스(권장 5%)에 배포하고 데이터를 모니터링한 후 100%까지 단계적으로 늘립니다.
- **전체 배포**: 대상이 되는 모든 디바이스에 즉시 배포합니다.

![펌웨어 업그레이드 릴리스](https://images.tuyacn.com/content-platform/hestia/1660805709098031c1697.png)

:::warning
점진적 배포를 강력히 권장합니다. 릴리스 후 펌웨어 문제가 발견되면 언제든지 배포를 일시 중지하고 문제가 해결된 후 재개할 수 있습니다.
:::

릴리스 후 **Upgrade Device Details**에서 디바이스별 업그레이드 상태를 확인하세요.

## 참고
- [디바이스 인증](equipment-authorization)
- [Tuya IoT Platform 펌웨어 업그레이드 가이드](https://developer.tuya.com/en/docs/iot/firmware-upgrade-operation-guide?id=K93ixsft1w3to)
