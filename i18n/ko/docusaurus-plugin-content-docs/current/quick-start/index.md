---
title: 시작하기
description: "TuyaOpen 온보딩 가이드입니다. 디바이스를 활성화 상태에서 Tuya IoT Cloud에 연결하는 데 필요한 라이선스, UUID/AuthKey 및 시리얼 도구 설정을 안내합니다."
keywords:
  - TuyaOpen
  - 라이선스
  - UUID AuthKey
  - 온보딩
  - IoT Cloud
---

시작하기에서는 TuyaOpen 라이선스를 준비하고 Tuya IoT Cloud와 통신하는 디바이스를 만드는 과정을 안내합니다. 먼저 아래 용어를 확인한 후 모든 다음 단계에 필요한 라이선스와 시리얼 도구를 준비하세요.

## 용어 및 정의
TuyaOpen을 시작하기 전에 다음 핵심 용어를 확인하세요.

### TuyaOpen 전용 라이선스
**라이선스**는 디바이스가 Tuya IoT 운영 체제에 연결할 수 있도록 Tuya가 발급하는 암호화 인증서입니다. 각 디바이스에는 인증을 위한 고유 라이선스가 할당되어야 하며, 이 라이선스는 하나의 디바이스가 클라우드에 연결하고 액세스할 권한을 부여합니다.

라이선스는 `UUID`와 `AuthKey`로 구성됩니다.

TuyaOpen 전용 라이선스는 모든 TuyaOpen Framework 구성 요소에 적용됩니다.

- [C용 TuyaOpen](https://github.com/tuya/TuyaOpen)
- [Arduino용 TuyaOpen](https://github.com/tuya/arduino-TuyaOpen)
- [LuaNode용 TuyaOpen](https://github.com/tuya/luanode-TuyaOpen)

:::danger
TuyaOpen Framework에는 TuyaOpen 전용 라이선스가 필요합니다. TuyaOS 라이선스를 포함한 다른 출처의 라이선스는 TuyaOpen Framework에서 Tuya IoT Cloud에 연결할 수 없습니다.
:::

#### UUID
범용 고유 식별자인 `UUID`는 여러 알고리즘으로 생성되어 각 디바이스를 식별하는 고유 번호입니다. `UUID`는 20자 문자열이며 반복 활성화나 페어링과 같은 작업을 수행해도 변경되지 않습니다.

#### AuthKey
`AuthKey`는 플랫폼이 발급하는 디바이스 인증 키입니다. 32자 문자열이며 `UUID`와 일대일로 매핑되고 `PID`와 `UUID`에 강하게 결합됩니다.

:::warning
`AuthKey`는 디바이스 인증에 사용됩니다. 값을 안전하게 보관하고 공개하지 마세요.
:::

### PID
`PID`는 product ID를 의미합니다. 플랫폼에서 생성한 각 제품에는 고유한 `PID`가 할당됩니다. `PID`는 데이터 포인트(DP), 앱 제어 패널, 구매 정보 등 특정 제품의 세부 정보와 연결됩니다.

:::info
`PID`, `UUID`, `AuthKey`를 함께 디바이스 트리플렛이라고 합니다.
:::

### 디바이스 ID
클라우드는 디바이스가 활성화되고 페어링될 때마다 디바이스 ID를 할당합니다. 성공적인 페어링 후 계정과 앱에 연결된 실제 디바이스 데이터와 매핑됩니다. 재페어링 및 재활성화 후에는 디바이스 ID가 변경될 수 있습니다. 예를 들어 앱에서 디바이스 패널을 열고 오른쪽 위의 디바이스 속성으로 이동한 다음 **바인딩 해제 및 데이터 삭제**를 누릅니다.

## TuyaOpen 라이선스 받기
다음 방법 중 하나를 선택하세요.

- 방법 1 — 라이선스가 미리 플래시된 모듈 구매: [Production](https://platform.tuya.com/purchase/index?type=6) 페이지에서 구매합니다. 제조 중 라이선스가 모듈에 영구 기록되므로 분실되지 않으며, 시작 시 `tuya_iot_license_read()` 인터페이스로 자동으로 읽습니다. 구매한 모듈에 TuyaOpen 라이선스가 포함되어 있는지 확인하세요.
- 방법 2 — 라이선스가 없는 모듈에 라이선스 구매: [Production](https://platform.tuya.com/purchase/index?type=6) 또는 [Purchase](https://item.taobao.com/item.htm?ft=t&id=911596682625&spm=a21dvs.23580594.0.0.621e2c1bzX1OIP) 페이지에서 구매합니다.

![TuyaOpen 인증 코드 구매 페이지](/images/en/authorization_code.png)

## 준비
- [TuyaOpen 라이선스](#get-tuyaopen-license)를 준비합니다.
- 펌웨어 플래시, 라이선스 기록, 시리얼 디버깅에 사용할 [Tuya 범용 시리얼 도구](https://www.tuyaopen.ai/tyutool)를 준비합니다.

## 동영상 안내
- Linux/Mac — [Linux 가상 머신 설치](https://www.bilibili.com/video/BV1vHaPziErs/?spm_id_from=333.1387.collection.video_card.click), [SSH 설정](https://www.bilibili.com/video/BV1vHaPziEQz/?spm_id_from=333.788.videopod.sections), [데모 개발](https://www.bilibili.com/video/BV1RHaPziE91/?spm_id_from=333.1387.collection.video_card.click)
- Windows — [환경 설정](https://www.bilibili.com/video/BV1cXaPzjEaB/?spm_id_from=333.1387.collection.video_card.click), [데모 개발](https://www.bilibili.com/video/BV1rDaPz2EXa/?spm_id_from=333.1387.collection.video_card.click), [플래시 로그](https://www.bilibili.com/video/BV1rDaPz2Ero/?spm_id_from=333.1387.collection.video_card.click)
- 디바이스 네트워킹 — [완료 결과](https://www.bilibili.com/video/BV1vHaPziEH5/?spm_id_from=333.1387.collection.video_card.click)
