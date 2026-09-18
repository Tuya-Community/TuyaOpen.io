---
title: MQTT 클라이언트 자습서
description: "TuyaOpen의 MQTT 클라이언트 자습서 : 브로커에 연결, 가입, QoS와 게시, netmgr 네트워킹에 mqtt client interface.h를 사용하여 구독."
keywords:
  - mqtt
  - mqtt client
  - subscribe
  - publish
  - tuyaopen peripheral
---

## 제품정보
이 튜토리얼은 MQTT 클라이언트 예제를 다룹니다: 공공 브로커에 연결, 구독, QoS와 게시, 다음 취소. 비밀번호`mqtt_client_interface.h`(init, 연결,`mqtt_client_yield`netmgr 및 Wi-Fi 또는 유선 네트워킹의 상단에 , 가입 / 게시 / 취소).

## 자주 묻는 질문
- [환경 설정](../../quick-start/enviroment-setup)
- MQTT 주제와 QoS와 Familiarity (0/1)

## 제품 정보
- MQTT 클라이언트와 네트워크 지원을 가진 널 구성`examples/protocols/mqtt_client`.
- 브로커 호스트 및 포트에 아웃바운드 액세스 (기본 샘플 사용`broker.emqx.io:1883`).
- 브로커 자격 : 주식 예는 EMQX 데모 사용자 이름 / 패스워드를 사용합니다. 생산 또는 개인 브로커를 대체합니다.

## 한국어
1. 기타[`examples/protocols/mqtt client`를 호출합니다.](https://github.com/tuya/TuyaOpen/tree/master/examples/protocols/mqtt_client).

2. 제품정보`src/examples_mqtt_client.c`:
   - Wi-Fi를 사용하는 경우 Wi-Fi SSID/password.
   - `mqtt_client_config_t`: `host`, `port`, `clientid`, `username`, `password`, 그리고 콜백 걸이 (`on_connected`, `on_message`, 등).

3. example 디렉토리에서 빌드 및 플래시:
   ```bash
   cd examples/protocols/mqtt_client
   tos.py config choice
   tos.py build
   ```

4. 연결 후에, 표본 호출`mqtt_client_init`, `mqtt_client_connect`, 다음`mqtt_client_yield`그래서 스택 프로세스가 들어오는 패킷. 연결된 콜백 구독; 구독 콜백은 테스트 메시지를 게시합니다. 발행 가능한 경로는 구독하지 않습니다.

**확장된 결과:** 직렬 로그는 연결, 구독, 게시, 및 PUBACK, 소스에서 콜백 주문 일치.

## 구현 노트
- 자주 묻는 질문`mqtt_client_yield`(또는 해당 펌프)는 정기적으로 연결되거나 클라이언트는 SUBACK/PUBLISH/PUBACK를 처리하지 않습니다.
- 주제 이름 및 페이로드 인코딩은 클라우드 또는 브로커 계약을 일치해야합니다.
- 이 예제는 Tuya Cloud MQTT와 동일하지 않습니다.`tuya_iot`; 그것은 사용자 정의 브로커에 대 한 일반적인 MQTT 클라이언트입니다.

## 이름 *
- 예제 소스:`examples/protocols/mqtt_client/src/examples_mqtt_client.c`
- [TAL 네트워크 API 참조](tal-network-api)
- [예제 인덱스](../../examples/demo-generic-examples)
