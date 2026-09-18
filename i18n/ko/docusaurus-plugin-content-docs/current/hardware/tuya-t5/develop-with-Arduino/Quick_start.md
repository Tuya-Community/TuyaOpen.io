---
title: 빠른 시작
description: "Arduino는 TuyaOpen에서 T5를 위한 빠른 시작 — Arduino IDE를 설치하고, Tuya board Manager를 추가하고, 개발 보드를 선택하고, 장치를 제공합니다."
keywords:
  - arduino
  - t5
  - quick start
  - tuyaopen hardware
  - board manager
---

이 가이드는 깨끗한 Arduino IDE에서 플래시 T5 예제로 가져옵니다. IDE를 설치하고 Tuya 보드 관리자를 추가하고 개발 보드를 선택하고 앱을 통해 장치를 제공하십시오.

## 다운로드 Arduino IDE
Arduino IDE의 최신 버전을 설치합니다. 자주 묻는 질문[Arduino 공식 웹 사이트](https://www.arduino.cc/)당신의 운영 체계를 위한 구조를 다운로드하기 위하여. 이 프로젝트에 대한 모든 컴파일 및 번쩍이는 테스트는 Arduino IDE 2에서 수행되었습니다.

## 게시판 관리자 설치
1. 아래 이사회 관리자 URL 중 하나를 복사합니다.

    - GitHub URL:

    ```
    https://github.com/tuya/arduino-tuyaopen/releases/download/global/package_tuya_open_index.json
    ```

    - Gitee URL:

    ```
    https://gitee.com/tuya-open/arduino-tuyaopen/releases/download/global/package_tuya_open_index_cn.json
    ```

2. Arduino IDE 2를 실행하면 **File** -> **Preferences** 설정 창을 엽니다.

    ![아두이노 IDE 설정 창](https://images.tuyacn.com/fe-static/docs/img/581335e7-e012-4895-aece-7af21d00bbf5.png)

3. **Additional boards manager URLs** 필드에 이사회 관리자 URL을 입력하십시오.

    ![추가 보드 관리자 URL 필드](https://images.tuyacn.com/fe-static/docs/img/cc3f4fa3-3fd6-458a-af90-a04b49225714.png)

4. ** Boards Manager** 패널을 왼쪽으로 열고 검색`Tuya Open`, 다음 최신 버전을 설치. 설치 후, TUYA 시리즈 개발 보드를 선택할 수 있습니다.

    ![Tuya Open을 가진 Boards Manager panel 설치](https://images.tuyacn.com/fe-static/docs/img/536f4f4a-4816-4371-85f1-5c6b1e9360ee.png)

## 하드웨어 선택
개발과[T5AI 보드 Devkit](https://tuyaopen.ai/docs/hardware/tuya-t5/t5-ai-board/overview-t5-ai-board)그리고[T5AI 핵심 Devkit](https://tuyaopen.ai/docs/hardware/tuya-t5/t5-ai-core/overview-t5-ai-core).

- **T5AI-Board Devkit **: LCD 화면, 카메라, 마이크, 스피커, SD 카드 등을 포함한 풍부한 주변 확장.
- **T5AI-Core Devkit**: 저전력 및 휴대용 AIoT 음성 상호작용 개발에 이상적입니다.

## 앱으로 장치를 Provision
모든 Tuya AIoT 장치 사용`Smart Life APP`네트워크 제공. 앱 다운로드 및 상세 프로비저닝 단계에 대한 자세한 내용은[Device Provisioning 문서](https://tuyaopen.ai/docs/quick-start/device-network-configuration).

## 클라우드 서비스 및 AIoT 기능
모든 Tuya AIoT 기능은 장치의 PID에 바인딩됩니다. 예제 코드의 기본 PID는 현재 예제에서 사용되는 AIoT 기능을 지원합니다. 추가 기능을 확장하려면 (ROle 관리, 장치 자체 제어, 장치 원격 제어, 데이터베이스, 트리거, AI 에이전트, MCP 서버), 참조[새 문서 작성](https://tuyaopen.ai/docs/cloud/tuya-cloud/creating-new-product).

:::tip
기본적으로 PID 구성으로 시작하여 장치 기능에 익숙해지며 더 많은 AI 기능을 추가합니다.
:::

```c
#define TUYA_PRODUCT_ID     "xxxxxxxxxxxxxxxx"
```

## 예제 개요
Arduino-TuyaOpen는 커버의 풍부한 세트를 배`AI Agent`, `WiFi`, `BLE`, `IoT`, `Audio/Video`, `Camera`, `UART/I2C/SPI`, 그리고 다른 주변 장치, 더 빠른 손에 발달을 위한 최신 AI 기능.

- ** 빠른 경험**:`AIcomponents/examples/YourChatBot`완전한 chatbot 예제입니다. 이름 *[Application 개발 문서](Application.md)모든 AI 기능을 빠르게 경험할 수 있습니다.
- **단계 학습 **:[AI API 개발 문서](AI_API_Development.md)프로그레시브 AI 예제, 텍스트, 오디오, MCP, 스킬 등을 제공합니다. 각 주변 라이브러리 디렉토리에는 하드웨어 예제(serial, I2C, 마이크, 스피커, 카메라, 디스플레이, SD 카드 및 기타)가 포함되어 있습니다.

example code 디렉토리 구조는 다음과 같습니다:

```
AIcomponents        // AI components
└─examples
    ├─00_IoT_SimpleExample
    ├─01_AI_TextChat
    ├─02_AI_AudioChat
    ├─03_AI_AudioSave
    ├─04_AI_Mcp
    ├─05_AI_Skill
    ├─06_AI_TuyaUI
    └─YourChatBot
Audio               // Audio
└─examples
    ├─Audio2SDcard
    ├─AudioRecorder
    └─AudioSpeaker
BLE                 // BLE
└─examples
    └─ble_server
Camera              // Camera
└─examples
    ├─Camera2Display
    └─Camera2SDcard
Display             // Display
└─examples
    ├─DisplayFill
    ├─DisplayPicture
    └─LVGLdemo
DNSServer           // DNS Server
└─examples
    └─CaptivePortal
FSDemo              // File System Demo
└─examples
    ├─LittleFSDemo
    └─SDCardDemo
HTTPClient          // HTTP Client
└─examples
    ├─BasicHttpClient
    └─BasicHttpsClient
Log                 // Log
└─examples
    └─logOutput
MQTTClient          // MQTT Client
└─examples
    ├─mqtt_auth
    ├─mqtt_basic
    └─mqtt_publish_in_callback
Peripherals         // Peripherals
└─examples
    └─Button
SPI                 // SPI
└─examples
    └─spiDemo
Ticker              // Ticker
└─examples
    ├─Blinker
    └─TickerParameter
TuyaIoT             // IoT
└─examples
    ├─dpType
    ├─quickStart
    └─weatherGet
WiFi                // WiFi
└─examples
    ├─SimpleWiFiServer
    ├─WiFiAccessPoint
    ├─WiFiClient
    ├─WiFiClientBasic
    ├─WiFiClientConnect
    ├─WiFiClientEvents
    ├─WiFiClientStaticIP
    ├─WiFiMulti
    ├─WiFiScan
    ├─WiFiScanDualAntenna
    ├─WiFiTelnetToSerial
    └─WiFiUDPClient
Wire                // I2C
└─examples
    └─masterWriter
```

## 더 보기
- [Application 개발](Application.md)— 플래시 전체`YourChatBot`예.
- [AI API 개발](AI_API_Development.md)- 진보적인 AI 예제를 통해 작업.
