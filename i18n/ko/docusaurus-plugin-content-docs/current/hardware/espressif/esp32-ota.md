---
title: "ESP32 OTA 업데이트"
description: "ESP32 OTA 업데이트는 Tuya IoT 플랫폼을 통해 TuyaOpen 장치를 배포하기 위해 새로운 펌웨어를 푸시합니다. 키, 업로드, 게시 및 릴리스를 만듭니다."
keywords:
  - esp32
  - ota
  - firmware update
  - tuyaopen hardware
  - tuya cloud
---

OTA(over-the-air) 업데이트는 Tuya Open ESP32 장치가 원격으로 Tuya IoT 플랫폼을 통해 새 펌웨어를 푸시합니다. 이 가이드는 7 단계로 당신을 걸립니다: 굳힌모 열쇠를 창조하고, 열쇠를 굳힌모로 쓰고, 새 버전을 업로드하고, 그것을 출판하고, 격상 규칙을, 확인하고, 풀어 놓습니다.

## 자주 묻는 질문
- 한국어[ESP32 빠른 시작](esp32-quick-start)
- Tuya Cloud (UUID / AuthKey 구성)에 연결된 장치

## 단계 1: 펌웨어 키 만들기
펌웨어 키는 고유하게 플랫폼에 펌웨어를 식별합니다. 단 하나 제품 (PID)에는 다른 기계설비 변종 또는 굳힌모에 대응하는 다수 굳힌모가 있을 수 있습니다.

1. 로그인하기[Tuya IoT 플랫폼](https://iot.tuya.com)그리고 제품의 **제품 개발 > 하드웨어 개발** 페이지로 이동합니다.
2. 클라우드 연결 유형 및 하드웨어 모듈을 선택하십시오.

![클라우드 연결 유형 및 하드웨어 모듈 선택](https://images.tuyacn.com/fe-static/docs/img/b67f5e64-7976-4e44-8843-6ce4ecd321a1.png)

   - **클라우드 연결 유형**: **TuyaOS** 또는 **TuyaOS AI**를 선택하십시오.
   - ** 기계설비 단위 **: Tuya ESP32 모듈을 사용하는 경우 하드웨어 목록에서 해당 모듈을 선택하십시오. 사용자 정의 모듈을 사용하는 경우이 필드는 선택되지 않을 수 있습니다.

   :::info
Tuya에서 ESP32 모듈을 주문하려면 ESP32 옵션이 아직 하드웨어 목록에서 볼 수없는 경우 Tuya 비즈니스 관리자에게 흰색 목록에 추가 된 계정이 있어야합니다. 백리스트가되면 ESP32 모듈 옵션이 목록에 표시됩니다.
   :::

3. ** 사용자 지정 펌웨어 추가 **.

   - Tuya ESP32 모듈을 선택한 경우, 선택한 모듈 솔루션의 행에 Custom Firmware**를 추가하십시오.
   - 사용자 지정 ESP32 모듈을 사용 하는 경우, 클릭 **사용자 지정 펌웨어 ** 사용자 지정 펌웨어 행에.

4. 펌웨어 기본 정보를 입력하고 **Confirm**을 클릭합니다. 플랫폼은 ** 확인 키**를 생성합니다.

![펌웨어 정보를 입력하여 펌웨어 키 생성](https://images.tuyacn.com/fe-static/docs/img/df14b972-b7f6-45dc-a07e-f52a1023b309.png)

   - ** 파일 이름 **: 주문을 받아서 만들어질 수 있습니다.
   - **Firmware type**: **Module Firmware (Direct Connect)**를 선택하십시오.
   - **네트워크 유형**: **Wi-Fi**.
   - 사용자 정의 하드웨어는 Tuya 생산 솔루션을 지원하지 않습니다.

5. 생성 된 펌웨어 키를 복사 — 당신은 당신의 펌웨어 코드에 그것을 embed해야합니다.

## 2 단계 : 펌웨어 키를 펌웨어로 작성
:::info
설치하기`firmware_key`옵션입니다. omitted 경우, 플랫폼은 PID 당 하나의 펌웨어와 OTA 중 아무 키 구별이 필요하지 않습니다.

동일한 PID에는 다른 열쇠를 가진 다수 굳힌모가 있습니다 (예를 들면, ESP32-S3와 같은 다수 기계설비 플래트홈을 가진 제품, ESP32-C3, 등), 당신은 놓아야 합니다`firmware_key`그래서 장치는 플랫폼에 그것의 열쇠를 보고합니다. 이없이 플랫폼은 기기를 밀어 펌웨어를 결정할 수 없으며 OTA 업그레이드는 제대로 작동하지 않습니다.
:::

1. 펌웨어 키 정의`tuya_config.h`(또는 해당 구성 헤더에 대한 앱):

```c
#define TUYA_DEVICE_FIRMWAREKEY   "your_firmware_key_here"
```

2. 내 계정`tuya_main.c`, 찾기`tuya_iot_init`전화 및 추가`firmware_key`유형:

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

3. 펌웨어 버전 번호를 업데이트합니다.

OTA upgrades follow a "lower to high version" rule — 새로운 펌웨어 버전은 현재 장치에서 실행중인 버전보다 높아야, 그렇지 않으면 플랫폼은 업그레이드를 밀어하지 않습니다.

설정 메뉴를 열려면 다음 명령을 실행하십시오.

   ```bash
   tos.py config menu
   ```

**Configure Project** 하위메뉴로 이동`PROJECT_VERSION`, 더 높은 버전 번호로 설정. 형식은`"xx.xx.xx"`(예:`"1.0.1"`).

4. 지원하다`tos.py clean -f`, 그 후에 굳힌모를 재건하고 재 flash.

## Step 3: 새로운 펌웨어 버전을 업로드
1. 왼쪽 내비게이션에서 **Product > Device > Firmware Management**로 이동합니다.
2. 해당 펌웨어 키를 찾아 클릭 **펌웨어 버전 추가 **.

![펌웨어 버전 항목 추가](https://images.tuyacn.com/content-platform/hestia/16608056095d8ab7fad88.png)

3. 버전 번호에 채우고 메모를 해제 한 다음 컴파일 된 펌웨어 파일을 하나씩 업로드하십시오. TuyaOpen ESP32는 파일 이름에 의해 3개의 펌웨어 유형을, 식별합니다 생성합니다:

   |Firmware 유형|파일 이름 패턴|이름 *|
   |---------------|-----------------|-------------|
   |생산 펌웨어|제품정보`QIO` |풀 칩 공장 번쩍기를 위해|
   |사용자 부품 펌웨어|제품정보`UA` |파티션 기반 공장 깜박임|
   |업그레이드 펌웨어|제품정보`UG` |리모트 OTA 향상을 위해|

   :::info
TuyaOpen 펌웨어는 현재 차이를 지원하지 않습니다 (delta) 업그레이드. 항상 전체 펌웨어 패키지를 업로드합니다.
   :::

![회사 소개](https://images.tuyacn.com/content-platform/hestia/1625197826c5068297e7a.png)

4. ** 저장 **. 버전은 status**Unpublished**로 생성됩니다.

## 4 단계 : 펌웨어 버전 게시
Firmware 버전은 기본적으로 공개되지 않으며 OTA에 사용되기 전에 공개해야합니다.

1. 펌웨어 버전 목록에서 새로 업로드된 버전을 찾아**Publish Firmware**를 클릭합니다.
2. Check**Upgrade Firmware** 게시 내용으로 허용된 사용 범위(기본값: 제한되지 않음)을 설정합니다.
3. 이름 * **Published**의 버전 상태 변경.

![펌웨어 버전 게시](https://images.tuyacn.com/content-platform/hestia/1660805709098031c1697.png)

## 5 단계 : 업그레이드 규칙 구성
1. 왼쪽 내비게이션에서 **제품 > 장치 > Firmware OTA**로 이동합니다.
2. **Firmware Source**에서, **Custom Upload** 속성으로 펌웨어를 선택합니다.
3. Click **새로운 펌웨어 업그레이드** 및 구성 입력:

![새로운 펌웨어 업그레이드](https://images.tuyacn.com/content-platform/hestia/1660805737c0024a7a1a6.png)

|제품 설명|이름 *|
|-----------|-------------|
|Firmware 버전|새로 출판된 버전 선택|
|업그레이드 방법|App-prompted / 앱 강화 / 앱 탐지|
|버전 업그레이드|이전 버전을 선택하여 업그레이드 (기본적으로 선택한 모든 낮은 버전)|
|지역 정보|대상 지역을 선택하십시오 (기본적으로 선택된 모든 지역)|

![업그레이드 규칙 구성](https://images.tuyacn.com/content-platform/hestia/166080576438794904dd9.png)

4. **확인**. 업그레이드 기록이 생성됩니다.

## 6 단계 : 검증
모든 사용자에게 공개하기 전에 테스트 장치에 OTA 흐름을 확인하는 것이 좋습니다.

1. Click**Common Verification Devices** 앱 계정 또는 장치 ID를 통해 백리스트에 테스트 장치를 추가합니다.
2. **Verify**를 클릭하여 펌웨어를 테스트 장치에 푸시하십시오.
3. Click**Check Upgrade Completion** 기기가 새 버전으로 업그레이드되었습니다.

![펌웨어 업그레이드](https://images.tuyacn.com/content-platform/hestia/16569450854881eb8d1ca.png)

## 단계 7: 출시
인증 패스 후, click **Release** 업그레이드를 밀어.

- ** 일반 롤아웃 **: 장치의 작은 비율로 첫째로 밀어 (5%는 추천됩니다), 향상 자료를 감시하고, 100%에 점차적으로 증가합니다.
- ** 풀 롤아웃 **: 즉시 모든 자격이 된 장치에 푸시.

![펌웨어 업그레이드](https://images.tuyacn.com/content-platform/hestia/16569450850be8d138069.png)

:::warning
Gradual rollout는 강력하게 추천합니다. 펌웨어 문제가 릴리스 후 발견되면, 문제가 해결 된 후 언제든지 롤아웃을 일시 중지하고 재시작 할 수 있습니다.
:::

릴리스 후, ** 고급 장치 세부 ** 섹션을 확인하여 장치 당 업그레이드 상태를 모니터링합니다.

## 더 보기
- [Firmware 업그레이드](../../quick-start/firmware-ota)
- [장치 인증](../../quick-start/equipment-authorization)
- [ESP32 빠른 시작](esp32-quick-start)
- [Tuya IoT 플랫폼 펌웨어 업그레이드 가이드](https://developer.tuya.com/en/docs/iot/firmware-upgrade-operation-guide?id=K93ixsft1w3to)
