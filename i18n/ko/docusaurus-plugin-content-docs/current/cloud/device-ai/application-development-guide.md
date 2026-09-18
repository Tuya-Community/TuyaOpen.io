---
title: 애플리케이션 개발
description: "TUYA PRODUCT KEY를 대체하는 Tuya 제품 PID를 생성하고 TuyaOpen 라이센스를 연소하여 IoT Cloud에 연결할 수 있습니다."
keywords:
  - application development
  - tuyaopen license
  - product pid
  - device ai
  - tuya cloud
---

# 앱 개발
## 제품을 만들고 PID를 얻으십시오
먼저 [Tuya Developer Platform](https://platform.tuya.com/)에 제품을 만들고 제품 ID (PID)를 얻습니다. 자세한 내용은 [TuyaOS > 제품 만들기](https://developer.tuya.com/en/docs/iot-device-dev/application-creation?id=Kbxw7ket3aujc)를 참조하십시오.

그런 다음 특정 PID와 프로젝트 디렉토리에서 `TUYA_PRODUCT_KEY` 매크로를 대체합니다.

## TuyaOpen 라이센스
TuyaOpen 프레임 워크 포함:

- [C용 TuyaOpen] (https://github.com/tuya/TuyaOpen)

- [TuyaOpen] (https://github.com/tuya/arduino-TuyaOpen)

- LuaNode 용 [TuyaOpen] (https://github.com/tuya/luanode-TuyaOpen)

:::대여
Tuya IoT Cloud에 연결하려면 TuyaOpen 라이센스가 필요합니다. 다른 소스의 라이센스는 Tuya IoT Cloud에 연결하지 않습니다.
:::

```bash
[tuya_main.c:220] Replace the TUYA_DEVICE_UUID and TUYA_DEVICE_AUTHKEY contents, otherwise the demo cannot work
[tuya_main.c:220] uuid uuidxxxxxxxxxxxxxxxx, authkey keyxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```


다음 방법을 통해 전용 라이센스를 얻을 수 있습니다:

- 방법 1 : 사전 플래시 라이센스가있는 모듈을 구입하십시오. 이 라이센스는 제조 중에 모듈에 영구적으로 작성되며 손실 될 수 없습니다. TuyaOpen는 자동적으로 시작 도중 `tuya_iot_license_read()` 공용영역을 통해 면허를 읽습니다. 구매한 모듈이 이미 TuyaOpen 라이선스를 포함했는지 확인합니다.

- 방법 2 : 모듈이 선명한 라이센스가없는 경우, [**Production**](https://platform.tuya.com/purchase/index?type=6) 페이지 또는 [**license purchase**](https://item.taobao.com/item.htm?ft=t&id=911596682625&spm=a21dvs.23580594.0.0.621e2c1bzX1OIP) 페이지에 TuyaOpen 라이센스를 구입하십시오. 그런 다음 `TUYA_DEVICE_UUID` 및 `TUYA_DEVICE_AUTHKEY` 값을 [apps/tuya_cloud/switch_demo/src/tuya_config.h](https://github.com/tuya/TuyaOpen/blob/master/apps/tuya_cloud/switch_demo/src/tuya_config.h) 파일로 `UUID` 및 `AuthKey`로 대체합니다. Make 컴파일된 실제 프로젝트에 기반한 올바른 `tuya_config.h` 파일을 선택하십시오.


![라이센스](/images/en/authorization_code.png)

```c
tuya_iot_license_t license;
if (OPRT_OK != tuya_iot_license_read(&license)) {   license.uuid = TUYA_DEVICE_UUID;
   license.authkey = TUYA_DEVICE_AUTHKEY;
   PR_WARN("Replace the TUYA_DEVICE_UUID and TUYA_DEVICE_AUTHKEY contents, otherwise the demo cannot work");
}
```

`tuya_iot_license_read()` 인터페이스가 `OPRT_OK`를 반환하면 현재 장치가 TuyaOpen 라이센스로 전염되어 있음을 나타냅니다. 그렇지 않으면 현재 모듈이 pre-flashed TuyaOpen 라이센스를 포함하지 않습니다.

## 빌드 및 플래시
1. `tos config_choice` 명령을 실행하여 대상 개발 보드 또는 플랫폼을 선택하십시오.
2. 구성을 수정하려면 먼저 `tos menuconfig` 명령을 실행하십시오.
3. 프로젝트를 건설하기 위해 `tos build`를 실행하십시오.
4. 번쩍이기를 위한 `tos flash` 명령을 실행하십시오.

자세한 내용은 [CLI - tos.py 개발 도구](/docs/tos-tools/tos-guide)를 참조하십시오.

## 쌍과 장치를 활성화
**Tuya** 앱에서 Bluetooth 또는 Wi-Fi 액세스 포인트 모드에서 장치를 활성화하십시오.
