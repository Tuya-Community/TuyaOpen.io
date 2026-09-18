---
title: "Raspberry Pi Provisioning 문제 해결"
slug: /hardware/Linux/raspberry-pi/wifi-bluetooth
description: "Raspberry Pi 프로비저닝 문제 해결 - 보드에 TuyaOpen 앱 페어링 및 재 프로비저닝을 차단하는 Wi-Fi 및 Bluetooth 문제를 해결합니다."
keywords:
  - raspberry pi
  - wifi
  - bluetooth
  - tuyaopen hardware
  - troubleshooting
---

Raspberry Pi에서 TuyaOpen 앱을 실행할 때 Wi-Fi 및 Bluetooth 문제를 수정하십시오 (예를 들어,`apps/tuya.ai/your_chat_bot`). 아래 각 섹션은 symptom, 원인 및 수정.

## 자주 묻는 질문
자세히보기[빠른 시작](https://tuyaopen.ai/docs/quick-start)그리고 그 하위 섹션은:

- 설정하기[TuyaOpen 개발 환경](https://tuyaopen.ai/docs/quick-start/enviroment-setup).
- 제품정보[TuyaOpen 인증 코드](https://tuyaopen.ai/docs/quick-start/equipment-authorization). header-file 메소드가 권장됩니다.
- 이름 *[장치 네트워크 제공](https://tuyaopen.ai/docs/quick-start/device-network-configuration).

## Provisioning 실패 또는 장치는 재 쌍이 아닙니다
** 찬성 ** 먼저 앱을 실행하면 프로비저닝 플로우를 입력하거나 이전에 페어링 장치는 네트워크에 연결하지 못합니다.

** 원인.** 앱 스토어 장치 데이터 (쌍칭 상태 포함)`tuyadb`작업 디렉토리에 폴더. Stale 자료는 재 감독을 막을 수 있습니다.

**픽스 ** 장치 데이터를 정리하고 다시 실행하십시오:

1. 실행 프로그램을 중지합니다.
2. 더 알아보기`tuyadb`프로그램의 작업 디렉토리에 폴더:

   ```bash
   rm -rf tuyadb
   ```

3. 다시 프로그램을 실행하고 프로비저닝 흐름을 다시 입력합니다.

## 터미널에서 QR 코드를 제공하지 않음
** 찬성 ** 앱이 시작되지만 터미널은 QR 코드를 인쇄하지 않으므로 스캔할 수 없습니다.

** 원인.** 기본적으로 QR 코드가 UART0에 전송됩니다. Raspberry Pi에서 UART0은 터미널 대신 하드웨어 직렬 라인에 갈 수 있습니다. UART를 표준 출력으로 변환하면 QR 코드를 볼 수 있습니다.

**Fix.** UART 리디렉션 활성화 ( "Dummy UART" stdin/stdout/UDP 모드):

1. 이름 *`tos.py`환경 및 앱 디렉토리 입력 (using`your_chat_bot`예):

   ```bash
   cd apps/tuya.ai/your_chat_bot
   ```

2. 설정 메뉴 열기:

   ```bash
   tos.py config menu
   ```

3. 바로가기`Choice a board → LINUX → TKL Board Configuration`그리고 활성화:

   - `Enable UART`
   - `UART redirection (stdin/stdout/UDP) instead of hardware ttyAMA*`

![TKL Board Configuration 메뉴에서 UART 리디렉션 구성 보기](https://images.tuyacn.com/fe-static/docs/img/842c4b01-3d4b-487b-973d-4744e82935e9.png)

UART 리디렉션을 활성화한 후, 앱은 프로비저닝 중에 현재 터미널에 QR 코드를 인쇄합니다. Tuya Smart 앱을 사용하여 장치를 제공 할 수 있습니다.

## Wi-Fi 또는 Bluetooth는 OS에 의해 비활성화됩니다
** 찬성 ** Bluetooth 스캐닝 또는 프로비저닝 실패 — BLE는 작동하지 않습니다, 또는 장치는 발견 할 수 없습니다 - Wi-Fi도 사용할 수 없습니다.

** 원인.** OS는 라디오를 비활성화 할 수 있습니다`rfkill`, 소프트웨어 중 하나 (`Soft blocked`) 또는 기계설비 (`Hard blocked`, 예를 들면 물리적 스위치).

**픽스 **

1. Wi-Fi 및 Bluetooth 상태를 확인하십시오.

   ```bash
   rfkill list
   ```

출력되는 예:

   ```text
   0: hci0: Bluetooth
           Soft blocked: no
           Hard blocked: no
   1: phy0: Wireless LAN
           Soft blocked: yes
           Hard blocked: no
   ```

   - `Soft blocked: yes`장치는 소프트웨어에서 비활성화됩니다.
   - `Hard blocked: yes`장치가 하드웨어에서 비활성화됩니다 (예 : 물리적 스위치). 하드웨어 블록을 먼저 제거하십시오.

2. 소프트웨어에서 차단:

   ```bash
   sudo rfkill unblock all
   ```

특정 항목 차단:

   ```bash
   sudo rfkill unblock wifi
   sudo rfkill unblock bluetooth
   ```

## Bluetooth는 아직도 막기 후에 실패합니다
** 찬성 ** 라디오는 차단되지 않지만 Bluetooth는 여전히 작동하지 않습니다.

** 원인.** TuyaOpen Bluetooth 서비스는 빌드 구성에서 비활성화되거나 구성 변경이 재건되지 않았습니다.

**픽스 ** 내 계정`tos.py config menu`, Bluetooth 서비스를 확인하는 것은 활성화됩니다:

```text
configure tuyaopen  --->
  configure tuya cloud service  --->
    [*] ENABLE_BT_SERVICE: enable tuya bt iot function  --->
      [ ] ENABLE_NIMBLE: enable nimble stack instead of ble stack in board
```

권장 설정:

- Bluetooth 서비스를 가능하게 합니다.
- 제품 정보`NIMBLE`이용안내

구성을 변경한 후 재건축 (예를 들어, 실행`tos.py build`). 그렇지 않으면 변화가 영향을 미치지 않습니다.

## 라디오에 액세스 할 때 권한 오류
** 찬성 ** 앱이 열릴 수 없습니다.`/dev/*`runtime에 노드 또는 시스템 서비스 인터페이스.

** 원인.** Wi-Fi, Bluetooth 및 Raspberry Pi의 주변 작업은 일반적으로 높은 권한을 요구합니다.

**픽스 ** 생성 된 실행을 실행`sudo`:

```bash
sudo ./your_chat_bot_*.elf
```
