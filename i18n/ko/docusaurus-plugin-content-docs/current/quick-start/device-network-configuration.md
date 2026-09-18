---
title: "4단계: 스마트폰으로 디바이스 페어링"
description: "SmartLife 모바일 앱을 사용하여 플래시 및 인증이 완료된 TuyaOpen 디바이스를 Tuya IoT Cloud에 등록하고 페어링하여 원격으로 제어하고 모니터링합니다."
keywords:
  - 디바이스 페어링
  - SmartLife 앱
  - Tuya IoT Cloud
  - 원격 제어
  - TuyaOpen
---

디바이스 페어링은 디바이스를 Tuya IoT Cloud에 연결하고 등록하여 모바일 앱에서 원격으로 제어할 수 있게 합니다. 이 페이지에서는 플래시와 인증이 완료된 디바이스를 **SmartLife** 앱으로 페어링합니다.

## 사전 요구 사항
페어링하기 전에 다음을 확인하세요.

- 휴대폰에 **SmartLife** 앱이 설치되어 있어야 합니다. 설치 방법은 [앱 다운로드](#download-the-app)를 참고하세요.
- 펌웨어 플래시와 인증이 완료된 디바이스
- 페어링 모드인 디바이스

:::tip
`switch_demo` 및 `your_chat_bot` 데모에서는 5초 이내에 디바이스를 3번 재시작하면 페어링 모드로 진입합니다.
:::

## 디바이스 페어링
### 앱 다운로드
Apple App Store 및 주요 앱 스토어에서 **SmartLife**를 검색하거나 다음 QR 코드를 스캔하여 앱을 다운로드하세요.

<img src="https://images.tuyacn.com/fe-static/docs/img/48b9e225-aa49-4e95-9d61-511bb7df27c8.png" alt="smartlife_app" width="200" />

등록과 로그인이 완료되면 디바이스 페어링을 진행할 수 있습니다.

### 디바이스 추가
앱에서 디바이스를 추가하기 전에 디바이스가 페어링 모드인지 확인하세요. TuyaOpen에 적용되는 다음 로그가 출력되는지 확인합니다.

```text
...
[01-01 00:00:01 ty D][tuya_iot.c:774] STATE_START
[01-01 00:00:01 ty I][tuya_iot.c:792] Activation data read fail, go activation mode...
[01-01 00:00:01 ty D][tuya_main.c:143] Tuya Event ID:1(TUYA_EVENT_BIND_START)
...
```

1. **All Devices** 페이지에서 **Add Device** 또는 오른쪽 위의 더하기 아이콘(**+**)을 눌러 **Add Device** 페이지로 이동합니다.

   <img src="https://images.tuyacn.com/fe-static/docs/img/8e8b4e0a-d6e4-4941-a078-717c96baf262.png" alt="smartlife_app" width="800" />

2. 디바이스를 추가하려면 앱에 Wi-Fi 및 Bluetooth 권한을 부여해야 합니다. 권한이 켜져 있지 않으면 주변 디바이스를 검색할 수 없습니다.

   <img src="https://images.tuyacn.com/fe-static/docs/img/3b8fc40f-2662-435e-a955-301948cb797b.png" alt="smartlife_app" width="240" />

   안내에 따라 **Turn on Wi-Fi** 또는 **Turn on Bluetooth**를 눌러 Wi-Fi 또는 Bluetooth를 활성화합니다.

   <img src="https://images.tuyacn.com/fe-static/docs/img/a6784328-c0d3-45ac-9730-8eabef788b1a.png" alt="smartlife_app" width="480" />

3. Wi-Fi 및 Bluetooth 권한을 올바르게 설정하면 **Home** 또는 **Add Device** 페이지에서 페어링 모드인 주변 디바이스를 볼 수 있습니다. **Go to add**를 누르고 앱의 안내에 따라 페어링을 완료합니다.

   <img src="https://images.tuyacn.com/fe-static/docs/img/bc243e3a-32f1-418f-ab07-fd70e68af857.png" alt="smartlife_app" width="240" />

:::warning
현재 TuyaOpen이 지원하는 모듈은 라우터의 2.4 GHz 대역에만 연결할 수 있습니다. 5 GHz 대역 라우터와 페어링하면 실패합니다.
:::

### 스캔으로 페어링
일부 TuyaOpen 디바이스는 **SmartLife** 앱에서 QR 코드를 스캔하여 페어링할 수 있습니다. 이 방법은 Raspberry Pi와 같은 Linux 디바이스에서 주로 사용하며, 디바이스가 QR 코드를 터미널에 직접 출력합니다.

1. 디바이스가 페어링 모드이고 터미널 또는 로그에 QR 코드가 표시되는지 확인합니다.
2. **SmartLife** 앱을 열고 오른쪽 위의 **+**를 누릅니다.
3. **Scan**을 선택하고 카메라를 디바이스에 표시된 QR 코드로 향합니다.
4. 화면의 안내에 따라 페어링을 완료합니다.

<img src="https://images.tuyacn.com/fe-static/docs/img/5971b072-a264-4324-ba3f-a90f8b899ddd.png" alt="smartlife_app" width="240" />

## FAQ
### 인증 정보가 올바르지 않아 페어링에 실패하는 경우
디바이스의 인증 정보가 올바르게 기록되지 않아 페어링이 실패하면 다음 로그가 출력됩니다.

```text
[01-01 00:00:00 ty E][tal_kv.c:269] lfs open UUID_TUYAOPEN -2 err
[01-01 00:00:00 ty E][tuya_authorize.c:107] Authorization read failure.
[01-01 00:00:00 ty W][tuya_main.c:288] Replace the TUYA_OPENSDK_UUID and TUYA_OPENSDK_AUTHKEY contents, otherwise the demo cannot work.
                 Visit https://platform.tuya.com/purchase/index?type=6 to get the open-sdk uuid and authkey.
[01-01 00:00:00 ty I][tuya_iot.c:538] tuya_iot_init
[01-01 00:00:00 ty D][tuya_iot.c:555] software_ver:1.0.1
[01-01 00:00:00 ty D][tuya_iot.c:556] productkey:xxxxxxxxxxxxxxxx
[01-01 00:00:00 ty D][tuya_iot.c:557] uuid:uuidxxxxxxxxxxxxxxxx
[01-01 00:00:00 ty D][tuya_iot.c:558] authkey:keyxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

`UUID`와 `AuthKey`가 모두 `xxxxxxxxxxxxxxxx`로 표시되면 인증 정보가 올바르게 기록되지 않았다는 뜻입니다.

자세한 내용은 [GUI - tyutool 그래픽 도구](../tos-tools/tools-tyutool.md#device-authorization-information-writing)의 **디바이스 인증 정보 쓰기** 섹션을 참고하세요.
