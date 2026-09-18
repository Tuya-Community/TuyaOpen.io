---
title: 제품정보
description: "Arduino-TuyaOpen Summary - 오픈 소스 프레임 워크는 T5 지원 Arduino API와 함께 Arduino에서 AIoT 스마트 장치를 구축 할 수 있습니다."
keywords:
  - arduino-tuyaopen
  - t5
  - arduino
  - tuyaopen hardware
  - aiot
---

[Arduino-Tuya오픈](https://github.com/tuya/arduino-TuyaOpen/tree/main)Arduino 플랫폼에서 AIoT 스마트 장치를 구축 할 수있는 오픈 소스 개발 프레임 워크, Tuya Cloud 및 원격 AI 전원 제어에 의해 백업.

Arduino-TuyaOpen는 상단에 내장[카테고리](https://github.com/tuya/TuyaOpen)프레임 워크와 더 빠른 개발을 위한 Arduino-style APIs의 단순화된 세트를 노출합니다. Arduino 일반적인 인터페이스 표준을 중심으로 설계된 Bluetooth, Wi-Fi 및 Ethernet과 같은 통신 프로토콜을 지원하며 네트워크 제공, 활성화, 제어 및 OTA 업그레이드를 포함한 핵심 IoT 기능을 제공합니다. 그것은 보안 및 준수 기능을 수행합니다 - 장치 인증, 데이터 암호화 및 통신 암호화 - 국가 및 지구 전역의 데이터 준수 요구 사항을 충족해야합니다.

TuyaOpen에서 개발 된 AIoT 제품은 Tuya App 및 클라우드 서비스의 생태계 기능을 활용하고 Tuya 장치에 의해 구동되는 상호 작용합니다.

TuyaOpen은 클라우드 플랫폼 통합, 음성, 비디오 및 AI Agent 기능을 확장합니다. Arduino-TuyaOpen는 이러한 새로운 기능을 지원하기 위해 동기화에서 업데이트됩니다.

## T5 및 Arduino 지원 기능
### Arduino 표준 공용영역
익숙한 Arduino API를 사용하여 T5 개발:

- **디지털 I/O**:`pinMode()`, `digitalWrite()`, `digitalRead()`- 제어 LED 및 릴레이, 읽기 버튼 상태.
- ** 아날로그 입력**:`analogRead()`- 12 비트 해상도에서 센서 값 (온도, 습도, 빛, 전위계 등)을 읽으십시오.
- ** PWM 출력**:`analogWrite()`- 제어 모터 속도, LED 밝기 및 서보 각도.
- ** 직렬 통신 **:`Serial`, `Serial1`, `Serial2`- 외부 모듈 (GPS, 지문, 센서)과 통신합니다.
- ** I2C 버스 **:`Wire`— OLED 디스플레이와 센서 모듈을 연결합니다.
- **SPI 버스 **:`SPI`- SD 카드와 고속 센서를 연결합니다.

### 무선 연결
- **Wi-Fi 연결**: AP 프로비저닝 및 Bluetooth 프로비저닝을 지원하고 원격 제어를 위한 Tuya Cloud에 연결합니다.
- ** Bluetooth BLE**: 로컬 컨트롤 및 데이터 전송을 위한 모바일 앱과 통신합니다.
- **OTA upgrade**: 클라우드를 통해 원격으로 펌웨어를 업그레이드, 제품 상승.

### Tuya Cloud 서비스
- **Device 활성화 **: 장치 관리 기능을 위한 Tuya Cloud에 연결하십시오.
- **DP 데이터 포인트**: Tuya App과 원활한 상호 작용을 위한 표준화된 데이터 포인트 모델을 사용합니다.
- ** 원격 제어 **: 언제 어디서나 제어 장치 Tuya App을 통해.
- **Scene linkage**: 스마트 홈 시나리오를 구축하기 위해 Tuya 장치에 의해 구동되는 다른 링크.

### AI 지능 능력
- **Automatic Speech Recognition (ASR)**: 음성 제어를위한 오프라인 및 온라인 음성 인식.
- **Text-to-Speech (TTS)**: 음성 피드백에 대한 텍스트 - 투 - 텍스트 발표.
- **Keyword Wake-up (KWS)**: 사용자 정의 속어에 대한 지원.
- **AI 대화 **: 대형 언어 모델과 통합 (Deepseek, ChatGPT 및 기타) AI 조수 구축.

### 적용 사례
- **Smart sensor node**: 온도와 습도 센서를 읽어 보세요.`analogRead()`, Wi-Fi를 통해 Tuya Cloud에 데이터를 업로드 한 다음 과거 차트를보고 앱에서 경고를받습니다.
- **스마트 스위치 / 조명 제어 ** : 드라이브 릴레이`digitalWrite()`또는 PWM 디밍을 조정하십시오`analogWrite()`, 다음 원격으로 전환, 일정 제어, 및 링크 장면을 통해 Tuya App.
- **Voice Interactive Device**: 음성 제어판과 AI 스피커를 구축하는 T5의 음성 기능을 결합하여 음성을 인식하고 명령을 실행합니다.
- **Display 제품**: SPI 또는 I2C에 드라이브 디스플레이 (OLED, TFT)를 실시간으로 센서 데이터, 날씨 및 장치 상태를 보여줍니다.
- ** 모터 컨트롤 ** : 스마트 커튼, 팬, 로봇 및 유사한 제품에 대한 DC 및 스테퍼 모터를 구동하기 위해 PWM을 사용합니다.

## 더 보기
- [빠른 시작](Quick_start.md)— Arduino IDE를 설치하고 첫 번째 예제를 플래시합니다.
