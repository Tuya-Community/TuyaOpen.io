---
title: "3단계: 디바이스 인증"
description: "시리얼 모니터 또는 설정 헤더를 통해 TuyaOpen 라이선스(UUID 및 AuthKey)를 디바이스에 기록하여 Tuya IoT Cloud에 연결합니다."
keywords:
  - 디바이스 인증
  - UUID
  - AuthKey
  - 라이선스
  - TuyaOpen
---

디바이스 인증은 TuyaOpen 라이선스인 `UUID`와 `AuthKey`를 디바이스에 기록하여 Tuya IoT Cloud에 연결할 수 있게 합니다. 페어링하고 온라인 상태가 되려면 각 디바이스에 고유한 라이선스가 필요합니다.

라이선스의 의미와 발급 방법은 [TuyaOpen 전용 라이선스](index.md#tuyaopen-dedicated-license)를 참고하세요.

다음 두 가지 방법으로 디바이스를 인증할 수 있습니다.

- 시리얼 모니터에서 인증 명령 실행
- 설정 헤더 파일 수정

펌웨어가 `auth` CLI를 지원하면 명령 방법을 사용하세요. 지원하지 않거나 라이선스를 빌드에 포함하려면 헤더 파일 방법을 사용하세요.

## 인증 명령 실행
1. 시리얼 모니터를 시작합니다.

   ```bash
   tos.py monitor -b 115200
   ```

   :::tip
   플래시에 사용한 시리얼 포트를 선택하세요.
   :::

   :::tip
   `tos.py build`를 실행하는 애플리케이션 프로젝트 경로에서, 프로젝트 컴파일이 성공한 후에만 이 명령을 실행하세요.
   :::

2. `auth`를 입력하고 Enter를 누릅니다.

   ```bash
   [INFO]: Run Tuya Uart Tool.
   --------------------
   1. /dev/ttyACM1
   2. /dev/ttyACM0
   --------------------
   Select serial port: 2
   [INFO]: Open Monitor. (Quit: Ctrl+c)
   auth
   auth
   Use like: auth uuidxxxxxxxxxxxxxxxx keyxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   tuya>
   ```

3. `auth` 명령으로 `uuid`와 `authkey`를 기록합니다. 성공하면 `Authorization write succeeds.`가 출력됩니다.

   ```bash
   tuya>
   auth uuid9f6a6xxxxxxxxxxx cGuDnU2YxjHJldjxxxxxxxxxxxxxxxxx
   auth uuid9f6a6xxxxxxxxxxx cGuDnU2YxjHJldjxxxxxxxxxxxxxxxxx
   Authorization write succeeds.
   ```

4. `auth-read` 명령으로 기록 결과를 확인합니다.

   ```bash
   tuya>
   auth-read
   auth-read
   uuid9f6a6xxxxxxxxxxx
   cGuDnU2YxjHJldjxxxxxxxxxxxxxxxxx
   ```

5. 인증이 적용되도록 디바이스를 재부팅합니다.

:::note
디바이스가 `auth` 명령을 지원하지 않으면 아래의 헤더 파일 방법을 사용하세요.
:::

## 헤더 파일 수정
1. 프로젝트 디렉터리에서 `tuya_config.h`를 찾습니다. 정확한 경로는 프로젝트에 따라 다르므로 `src` 또는 `include` 디렉터리를 확인하세요.
2. 인증 필드를 설정합니다.

   ```c
   #define TUYA_OPENSDK_UUID      "uuidxxxxxxxxxxxxxxxx"             // 올바른 uuid로 변경
   #define TUYA_OPENSDK_AUTHKEY   "keyxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"  // 올바른 authkey로 변경
   ```

3. 펌웨어를 다시 빌드하고 디바이스에 플래시한 뒤 전원을 켭니다.

## 참고
- [TuyaOpen 전용 라이선스](index.md#tuyaopen-dedicated-license)
- [GUI - tyutool 그래픽 도구](../tos-tools/tools-tyutool.md#device-authorization-information-writing)
