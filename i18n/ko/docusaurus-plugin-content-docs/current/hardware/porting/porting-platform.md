---
title: 플랫폼에 적응
description: "Adapt the platform to add new chipet to TuyaOpen — 필수 읽기, 빌드 흐름, 어댑터 단계, 전체 포트에 대한 검증 절차."
keywords:
  - tuyaopen porting
  - adapt platform
  - chipset
  - tkl
  - build
---

새로운 플랫폼에 적응하는 것은 TuyaOpen에 새로운 칩셋을 지원합니다. 이 가이드는 필요한 독서, 단계 및 검증 절차를 다룹니다.

TuyaOpen에 새로운 경우, 첫 번째 읽기[시작하기](../../quick-start/index.md). 설정하고 테스트하는 튜토리얼을 따르십시오`switch_demo`응용 프로그램 ( 우분투 환경 권장) Tuya IoT의 페어링 및 운영 논리를 이해. 다음 읽기[CLI - tos.py 개발 도구](../../tos-tools/tos-guide.md)사용 및 기능 학습`tos.py`명령.

## 회사연혁
새로운 칩셋을 적응하기 전에 TuyaOpen 빌드 흐름을 이해하십시오.

1. 빌드는 먼저 응용 프로그램을 컴파일 (using`switch_demo`예를 들어, 아래 위치`TuyaOpen/apps/tuya_cloud/switch_demo`) 및 TuyaOpen 소스 코드 (in`TuyaOpen/src`). 이 응용 static 라이브러리 생성 (`libtuyaapp.a`) 및 SDK 정적 라이브러리 (`libtuyaos.a`).

2. 다음 빌드를 호출`platform/Ubuntu/build_example.py`펌웨어의 세 가지 유형을 생산하는 공급 업체의 빌드 및 링크 명령을 호출하는 스크립트 : QIO, UA 및 UG.

   |Firmware 이름|Firmware 유형|
   | :----------------: | :-------------------: |
   |앱 name QIO 1.0.0|Bootloader + 사용자 영역 펌웨어|
   |앱 name UA 1.0.0|사용자 영역 펌웨어|
   |앱 name UG 1.0.0|펌웨어 업데이트|

더 상세한 흐름을 위해, 참조[편집 가이드](../../build-system/compilation-guide).

TuyaOpen의 새로운 칩셋에 대한 적응은 일반적으로이 단계를 포함한다 :

1. 새로운 플랫폼을 만들고 도구 체인을 다운로드하고 빌드 및 링크를 처리하는 스크립트를 개발합니다.
2. TKL 적응 완료.
3. 새 보드 만들기.
4. 구성 및 테스트 기능 정의`apps/tuya_cloud/switch_demo`적응을 검증하는 프로젝트.

## 플랫폼 만들기
상세한 절차는, 참고합니다[플랫폼 만들기](./new-platform.md).

내 계정`menuconfig`인터페이스, 다음 두 항목에주의를 기울입니다. 특정 하드웨어를 기반으로 다른 항목을 선택하십시오.

- `ENABLE_FLASH`: ** 사용할 수 있습니다. ** TuyaOpen의 플래시 메모리의 사용하지 않는 부분을 예약하십시오. 펌웨어 영역을 피하고 플래시 지우기/쓰기 granularity와 일치합니다.
- `ENABLE_FILE_SYSTEM`: 납품업자 SDK의 파일 시스템을 사용하려는 경우, 적응`tkl_fs.c`파일. 이 항목이 비활성화되면 TuyaOpen는 내부 LittleFS 파일 시스템을 사용하여 주소와 크기가 구성되고 제공됩니다.`tkl_flash.c`.

:::tip
왜 플래시 메모리의 사용하지 않는 부분을 예약합니까?

TuyaOpen 및 TuyaOS는 장치 권한 정보를 저장 공간을 요구합니다. 장치가 성공적으로 결합되고 활성화된 후에, 특정 장치 정보, 열쇠 및 다른 자료는 플래시 메모리에 저장되어야 합니다. 파일 시스템의 전력 손실 안전을 보장하기 위해 TuyaOpen는 AES128 CBC 암호화를 사용하여 오픈 소스 LittleFS를 사용하고 TuyaOS는 자체 개발 KV (key-value) 파일 시스템을 사용합니다. 두 시스템은 안전하고 신뢰할 수 있습니다. TuyaOpen 및 TuyaOS SDK(이하 TKL 적응 레이어 인터페이스는 일관성) 사이에서 신속하게 전환할 수 있도록 보안 및 안정성을 유지하면서 TuyaOpen의 전용 플래시 지역을 예약합니다.
:::

## TKL 층 적응
TKL 층 적응을 위해, 참조[비밀번호](./new-platform.md#fill-in-the-code)이름 *[포트 TuyaOS에 RTOS 플랫폼](https://developer.tuya.com/en/docs/iot-device-dev/TuyaOS-translation_rtos?id=Kcrwraf21847l). 납품업자 SDK는 이미 lwIP와 Mbed TLS를 통합할지도 모릅니다. 당신은 당신의 상황에 따라 공급 업체의 버전 또는 TuyaOpen의 버전을 사용할 수 있습니다.

선택하려면 실행하여 시각 설정 인터페이스를 엽니다.`tos.py config menu`Application project 디렉토리에`apps/tuya_cloud/switch_demo`.

- 바로가기`configure tuyaopen` > `configure enable/disable liblwip`lwIP 기능 활성화 또는 비활성화.

    - 장애가 있을 때 (공급 업체의 lwIP 사용), 적응`tkl_network.c`파일. 적응에 기여[투야Open-ESP32](https://github.com/tuya/TuyaOpen-esp32/blob/master/tuya_open_sdk/tuyaos_adapter/src/drivers/tkl_network.c)납품업자의 lwIP를 사용하는 .
    - 사용할 때 (toyaOpen의 lwIP 사용), 적응`tkl_lwip.c`파일. 적응에 기여[투야Open-T2](https://github.com/tuya/TuyaOpen-T2/blob/master/tuyaos/tuyaos_adapter/src/tkl_lwip.c)TuyaOpen의 lwIP를 사용하는 ,.

이 두 파일 중 하나만 적응하여 구성을 기반으로 합니다. 더 많은 정보를 원하시면,[Adapt 네트워크 인터페이스](https://developer.tuya.com/en/docs/iot-device-dev/TuyaOS-translation_rtos?id=Kcrwraf21847l#title-16-Adapt%20the%20network%20interface).

- 바로가기`configure tuyaopen` > `configure mbedtls` > `Enable user custom`TuyaOpen Mbed TLS 기능을 활성화하거나 비활성화 할 수 있습니다.

### Adapt TKL 인터페이스
이 기능을 지원하려면`ENABLE_CELLULAR`플랫폼 템플릿을 만들 때 옵션. 셀룰러 네트워크의 최소 필요한 적응 파일은 다음과 같습니다.

- `tkl_cellular_base.c`
- `tkl_cellular_comm.c`
- `tkl_cellular_mds.c`

세포 네트워크 칩을 위해, TuyaOpen는 이미 L511C 단위를 적응시켰습니다. 다운로드 할 수 있습니다[dev-cell 지점](https://github.com/tuya/TuyaOpen/tree/dev-cellular)참고를 위해, 또는 직접 L511C 단위를 사용하십시오. 더 알아보기[L511C를 위한 플랫폼 저장소](https://github.com/shiliu-yang/TuyaOpen-L511C/tree/dev).

TuyaOpen 중 하나에 따라 셀룰러 네트워크 칩을 조정할 수 있습니다.`dev-cellular`지점 또는`dev`제품정보

## 공지사항
특정 단계의 경우, 참조[공지사항](./new-board.md).

널을 만들고 가지고 있는 후에[정격 출력](./new-board.md#adjust-configuration)이름 *[제품 정보](./new-board.md#save-configuration)구성, 보드를 선택`apps/tuya_cloud/switch_demo`본문 바로가기`tos.py config choice`. 그런 다음 기능을 확인합니다.

## Verify 기능
시작하기 전에`tos.py build`컴파일하기`switch_demo`코드, 다음을 보장합니다:

- 더 보기`tuya_app_main()`기능에`apps/tuya_cloud/switch_demo/src/tuya_main.c`공급업체 SDK에 의해 호출됩니다.

- 인증 정보 매크로`TUYA_OPENSDK_UUID`이름 *`TUYA_OPENSDK_AUTHKEY`내 계정`apps/tuya_cloud/switch_demo/src/tuya_config.h`업데이트 인증 정보를 얻기 위해, 참조[TuyaOpen 라이센스](../../quick-start/index.md#get-tuyaopen-license).

- 셀룰러 또는 유선 네트워크와 호환되는 플랫폼은 **SmartLife** 또는 **Tuya** 앱으로 QR 코드를 스캔해야 합니다. 참조[앱 다운로드 및 운영 방법](../../quick-start/device-network-configuration.md#download-the-app). 다음 코드와 QR 코드 URL을 인쇄, at`apps/tuya_cloud/switch_demo/src/tuya_main.c:107`:

  ```c
  char buffer[255];
  snprintf(buffer, sizeof(buffer), "https://smartapp.tuya.com/s/p?p=%s&uuid=%s&v=2.0", TUYA_PRODUCT_ID,
           license.uuid);
  PR_INFO("QR link: %s", buffer);
  ```
