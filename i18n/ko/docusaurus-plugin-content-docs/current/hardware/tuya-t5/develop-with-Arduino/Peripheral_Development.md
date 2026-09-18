---
title: Arduino 주변 개발
description: "TuyaOpen의 Arduino 주변 개발 - WiFi, Bluetooth, 오디오, 디스플레이, 카메라, 파일 시스템, 클라우드 및 T5 보드에 대한 네트워크 라이브러리."
keywords:
  - arduino peripherals
  - tuyaopen hardware
  - t5
  - wifi
  - bluetooth
---

Arduino-TuyaOpen Framework는 주변 드라이버 및 통신 라이브러리의 풍부한 세트를 제공하여 WiFi 연결, Bluetooth 통신, 오디오 / 비디오 캡처, 디스플레이 렌더링, 파일 저장, 클라우드 액세스 및 Arduino IDE에서 더 많은 것을 구현합니다. 아래 예제는 기능 범주에 의해 구성되므로 각 주변 라이브러리 단계를 단계별로 마스터 할 수 있습니다.

```
Peripheral & Networking Libraries
├── Log           - Log Output
├── Ticker        - Software Timer
├── Peripherals   - Button Driver
├── SPI           - SPI Bus Communication
├── Wire          - I2C Bus Communication
├── FS / FSDemo   - LittleFS / SD Card File System
├── Audio         - Audio Recording & Playback
├── Display       - LCD Display & LVGL
├── Camera        - Camera Capture & Preview
├── BLE           - BLE GATT Service
├── WiFi          - WiFi STA/AP/Scan/Events
├── TuyaIoT       - Tuya IoT Cloud Access
├── HTTPClient    - HTTP/HTTPS Client
├── MQTTClient    - MQTT Messaging
└── DNSServer     - DNS Server (Captive Portal)
```

## 로그 출력
Log 라이브러리는 다른 로그 레벨을 제어하는 통합 로그 출력을 제공합니다.

### [로그아웃](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/Log/examples/logOutput)
기본 로그 출력 예. 그것은 사용`Log`클래스와`PR_DEBUG`debug 로그 정보를 출력하는 매크로 — 모든 프로젝트에 대한 기본 로깅 사용.

- 제품정보`Log.begin()`로그 시스템을 초기화합니다.
- 로그 레벨 지원`PR_DEBUG`, `PR_NOTICE`, `PR_ERR`, 그리고 더.
- 하드웨어 플랫폼: 모든 개발 보드

## 소프트웨어 타이머
Ticker 라이브러리는 정기적인 작업에 적합한 일정에 콜백을 실행하는 경량 소프트웨어 타이머를 제공합니다.

### [Blinker, 영국](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/Ticker/examples/Blinker)
타이머 기반 LED blink 예제. 그것은 사용`Ticker`고정 간격에서 LED 상태를 견인하는 타이머를 만드는 클래스는 깜박입니다.

- 제품정보`ticker.attach()`기간과 콜백 기능을 설정하기 위해.
- 하드웨어 플랫폼: 모든 개발 보드

### [증권 시세 표시기](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/Ticker/examples/TickerParameter)
Parameterized 타이머 콜백 예제. 그것은 사용`Ticker`class's Parameterized callback to pass custom Parameter to the timer callback, 더 유연한 timed 작업을 가능하게.

- 매개변수화된 하중을 사용합니다.`ticker.attach()`.
- 하드웨어 플랫폼: 모든 개발 보드

## Peripheral 공용영역
### [이름 *](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/Peripherals/examples/Button)
멀티 버튼 이벤트 구동 예. 그것은 사용`Button`여러 버튼, 구성 GPIO 핀, 활성 레벨 및 풀 업 모드를 관리하고 단일 클릭, 더블 클릭 및 긴 압박과 같은 이벤트에 대한 콜백을 등록합니다.

- 제품정보`ButtonConfig_t` / `PinConfig_t`버튼 매개 변수를 구성합니다.
- 이벤트 유형 지원`BUTTON_EVENT_SINGLE_CLICK`, `BUTTON_EVENT_DOUBLE_CLICK`, `BUTTON_EVENT_LONG_PRESS`, 그리고 더.
- 하드웨어 플랫폼: 모든 개발 보드

### [기본 정보](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/SPI/examples/spiDemo)
SPI 버스 통신 예. 그것은 사용`SPI`SPI 데이터 전송을위한 클래스 - SPI 버스를 초기화 한 후 데이터가 전송되고 반환 값은`SPI.transfer()`.

- 표준 Arduino SPI 인터페이스를 사용합니다.
- 하드웨어 플랫폼 : SPI를 지원하는 모든 개발 보드

### [마스터Writer](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/Wire/examples/masterWriter)
I2C 마스터 쓰기 예제. 그것은 사용`Wire`I2C 마스터로 클래스는 I2C 버스를 초기화한 후, byte 데이터를 지정된 노예 주소로 전송합니다.

- 표준 Arduino 철사 공용영역을 사용하십시오:`Wire.beginTransmission()`, `Wire.write()`, `Wire.endTransmission()`.
- 하드웨어 플랫폼 : I2C를 지원하는 모든 개발 보드

## 파일 시스템
FSDemo 라이브러리는 별도의 통합을 사용하여 LittleFS 내부 파일 시스템 및 SD 카드 외부 저장소의 파일 작동 인터페이스를 제공합니다.`VFSFILE`파일 읽기 / 쓰기 및 디렉토리 관리를위한 클래스.

### [프로젝트](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/FSDemo/examples/LittleFSDemo)
LittleFS 파일 시스템 작업 예제. 파일 생성, 쓰기, 읽기, 찾고 (seek/position), 파일 크기 쿼리, 디렉토리 생성 및 삭제, 파일 이름 바꾸기 및 크로스 파일 복사를 포함하여 기본 LittleFS 작업을 보여줍니다.

- 제품정보`VFSFILE fs(LITTLEFS)`LittleFS를 초기화합니다.
- 지원 작업과 같은`open`, `read`, `write`, `lseek`, `readtillN`, `mkdir`, `rename`·`remove`.
- 하드웨어 플랫폼 : LittleFS를 지원하는 모든 개발 보드

### [SDCard디모](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/FSDemo/examples/SDCardDemo)
SD 카드 파일 작업 예. 그것은 기본 작업을 포함하여 완전한 SD 카드 워크플로우를 보여줍니다 (폴더를 생성, 파일을 얻을, 파일 크기를 얻을), 파일 읽기 / 쓰기 작업 (멀티 라인 쓰기, 전체 읽기, append 쓰기, 라인-by-line 읽기), 및 디렉토리 트레이널 ( 디렉토리의 모든 파일 및 크기를 나열).

- 제품정보`VFSFILE fs(SDCARD)`SD 카드를 초기화합니다.
- SD 카드 산 탐지와 과실 취급을 포함합니다.
- 하드웨어 플랫폼 : T5AI-Board 개발 보드 만 (SD 카드 필요)

## 언어: 영어
오디오 라이브러리는 음성 캡처, 오디오 재생 및 유사한 시나리오에 적합한 오디오 레코딩 및 재생을 제공합니다.

### [오디오2SDcard](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/Audio/examples/Audio2SDcard)
버튼 트리거 녹음-to-SD-card 예제. 캡처 된 PCM 원시 오디오 데이터 또는 WAV 포맷 된 오디오를 SD 카드로 저장 한 버튼을 통해 마이크 레코딩을 제어합니다. PCM과 WAV 사이의 전환을 지원합니다.

- 사용 방법`Audio`표본 비율, 조금 깊이, 수로 조사 및 다른 오디오 모수를 구성하는 종류.
- 사용 방법`Button`보도에 기록 및 해제를 시작합니다.
- WAV 모드는 자동으로 파일 헤더를 생성합니다.
- 하드웨어 플랫폼 : T5AI-Board 개발 보드 만 (SD 카드 필요)

### [오디오Recorder](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/Audio/examples/AudioRecorder)
오디오 녹음 및 재생 예제. 오디오 클립을 기록하고 즉시 재생 - 녹화는 버튼 프레스에 의해 트리거되고 재생은 완료시 자동으로 시작합니다. 오디오 데이터는 메모리 버퍼에 일시적으로 저장됩니다.

- intercom, 음성 메시지 및 유사한 시나리오에 적합.
- 하드웨어 플랫폼: TUYA-T5AI 시리즈 전용

### [오디오 스피커](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/Audio/examples/AudioSpeaker)
MP3 오디오 재생 예제. 그것은 MP3 오디오를 재생하는 3가지 방법을 보여줍니다: C 배열에서 (펌웨어에서 조립되는), 플래시 파일 시스템에서, 그리고 SD 카드 파일에서, 재생 상태 콜백 지원과 더불어.

- 사용 방법`Audio`수업시간`playMp3()`공용영역의 시리즈.
- 재생 완료 콜백 알림 지원.
- 하드웨어 플랫폼: TUYA-T5AI 시리즈 전용

## 제품정보
디스플레이 라이브러리는 기본 LCD 렌더링 기능 및 LVGL 그래픽 라이브러리 통합을 제공하며 색상 블록 충전, 이미지 디스플레이, 회전 및 LVGL UI 개발을 지원합니다.

### [디스플레이Fill](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/Display/examples/DisplayFill)
스크린 색깔 충분한 양 예. 그것은 사용`Display`LCD 화면에 색상 블록을 채우기 위해 클래스 - 디스플레이를 초기화 한 후 전체 화면은 일반 간격에서 무작위 색상으로 채워집니다.

- 제품정보`display.fill()`풀 스크린 또는 지역 색깔 충전물을 위해.
- 하드웨어 플랫폼 : T5AI-Board 개발 보드 만

### [디스플레이Picture](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/Display/examples/DisplayPicture)
이미지 표시 및 교체 예. 그것은 LCD 스크린에 이미지를 표시하고 스크린 교체 방향 (0°/90°/180°/270°)를 사용하여 놓습니다`display.setRotation()`다른 오리엔테이션에 있는 이미지를 보여주기.

- C 배열에서 로드 이미지 데이터를 지원합니다.
- 하드웨어 플랫폼 : T5AI-Board 개발 보드 만

### [LVGLdemo의 장점](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/Display/examples/LVGLdemo)
LVGL 그래픽 라이브러리 예. LVGL (Light and Versatile Graphics Library)를 사용하여 장치에서 UI를 만들 수 있습니다. LVGL 환경을 초기화 한 후 "Hello World"텍스트가 생성됩니다.

- 제품정보`lv_vendor`LVGL 초기화 및 새로 고침
- 더 복잡한 UI 인터페이스를 구축할 수 있습니다.
- 하드웨어 플랫폼 : T5AI-Board 개발 보드 만

## 제품정보
카메라 라이브러리는 카메라 캡처 기능을 제공하며 YUV422 실시간 미리보기 및 JPEG / H264 인코딩 출력, 사진 캡처, 비디오 레코딩 및 유사한 시나리오에 적합합니다.

### [카메라2Display](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/Camera/examples/Camera2Display)
카메라 실시간 미리보기 예제. 그것은 카메라와 디스플레이를 초기화, 지속적으로 YUV422 형식으로 이미지 프레임을 캡처하고 라이브 카메라 미리보기를 실시간으로 LCD 화면에 표시합니다.

- 사용 방법`Camera`YUV422 프레임 및`Display`그들을 렌더링하는 클래스.
- 하드웨어 플랫폼 : T5AI-Board 개발 보드 만

### [카메라2SDcard](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/Camera/examples/Camera2SDcard)
카메라 사진 / 비디오 캡처 예. 그것은 사진을 찍는 단추를 통해 사진기를 통제하거나 영상을 기록하고, SD 카드에 자료를 저장하. 그것은 두 가지 모드를 지원합니다 (로그 정의를 통해 전환 가능): JPEG 모드에서, 단일 버튼 클릭 캡처 한 사진; H264 모드에서, 버튼을 지속적으로 유지하고 중지 기록을 해제.

- 실시간 YUV422 미리보기는 인코딩 출력과 동시에 작동합니다.
- JPEG 사진은 타임스탬프로 명명; H264 비디오는 프레임에 의해 작성된 프레임입니다.
- 하드웨어 플랫폼 : T5AI-Board 개발 보드 만 (SD 카드 필요)

## Bluetooth 저에너지 (BLE)
BLE 라이브러리는 BLE GATT 서버 기능을 제공하며, 휴대폰 또는 기타 BLE 장치와 데이터 상호 작용에 대한 사용자 정의 서비스 및 특성을 지원합니다.

### [ble 서버](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/BLE/examples/ble_server)
BLE GATT 서버 예제. 그것은 BLE GATT 서버를 만듭니다 - 사용자 정의 서비스 UUID 및 특성 UUID를 정의하고, 읽기 / 쓰기 속성 및 알림 / 표시 알림 기능을 설정하고, 클라이언트 연결, 읽기 / 쓰기 및 콜백 기능을 통해 구독 이벤트를 처리하십시오.

- 제품정보`BLEDEV`, `BLEServer`, `BLEService`·`BLECharacteristic`GATT 서비스를 구축하는 클래스.
- 알림 및 표시 방법 모두 지원.
- 하드웨어 플랫폼: BLE 지원을 가진 발달 널

## WiFi 네트워킹
WiFi 라이브러리는 STA 모드를 포함하여 포괄적인 무선 네트워킹을 제공하며, 핫스팟, 네트워크 스캐닝, 이벤트 청취, 정적 IP 구성, 멀티-AP 자동 스위칭 등을 만들 수 있습니다. 다음 예제는 일반적인 WiFi 개발 시나리오를 다룹니다.

### [간단한WiFiServer](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/WiFi/examples/SimpleWiFiServer)
WiFi STA 모드의 HTTP 서버 예. Wi-Fi 연결 후 간단한 HTTP 서버를 시작하고 브라우저에서 장치의 IP 주소를 방문함으로써 GPIO 핀에 LED를 제어 할 수 있습니다.

- 제품정보`WiFiServer`포트 80을 듣고; HTTP 요청 경로`/H`이름 *`/L`LED를 통제하기 위하여.
- 하드웨어 플랫폼: 모든 WiFi-capable 개발 보드

### [WiFiAccess포인트](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/WiFi/examples/WiFiAccessPoint)
WiFi AP (핫스팟) 모드 예. 그것은 사용`WiFi.softAP()`무선 핫스팟을 만들고 HTTP 서버를 시작하려면 브라우저를 통해 온보드 LED를 제어하기 위해 핫스팟에 연결된 장치를 활성화하십시오.

- 라우터없이 직접 장치 제어 시나리오에 적합합니다.
- 하드웨어 플랫폼: 모든 WiFi-capable 개발 보드

### [WiFi 클라이언트](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/WiFi/examples/WiFiClient)
WiFi 클라이언트 데이터 보고 예. 그것은 사용`WiFiClient`ThingSpeak 클라우드 플랫폼에 연결하기 위해 정기적으로 센서 데이터를 업로드하고 역사적인 기록을 읽고 HTTP GET 요청의 전체 읽기 / 쓰기 흐름을 표시합니다.

- ThingSpeak 채널 ID 및 API 키로 교체하십시오.
- 하드웨어 플랫폼: 모든 WiFi-capable 개발 보드

### [WiFiClient기본](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/WiFi/examples/WiFiClientBasic)
기본 WiFi TCP 클라이언트 예. 그것은 사용`WiFiClient`TCP 연결을 설정하려면 원격 서버에 HTTP GET 요청을 보내고 응답 데이터를 읽습니다. - 가장 기본적인 네트워크 통신 예제.

- 하드웨어 플랫폼: 모든 WiFi-capable 개발 보드

### [WiFi클라이언트](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/WiFi/examples/WiFiClientConnect)
WiFi 연결 상태 기계 예. 완전한 연결 상태 관리 구현`WiFi.status()`반환 값, 연결과 같은 취급 상태, AP 찾을 수 없습니다, 연결 실패, 버튼 트리거 된 단선에 대한 지원.

- 생산 등급 WiFi 연결 관리에 대한 권장 접근 방식을 결정합니다.
- 하드웨어 플랫폼: 모든 WiFi-capable 개발 보드

### [WiFiClient이벤트](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/WiFi/examples/WiFiClientEvents)
WiFi 이벤트 콜백 예제. 그것은 사용`WiFi.onEvent()`글로벌 이벤트 콜백 및 특정 이벤트 콜백 (예를 들어, IP 취득 또는 차단)을 등록하려면 STA, AP, WPS 및 이더넷을 포함한 모든 이벤트 유형에 대한 이벤트 핸들링을 포함합니다.

- 기능 포인터와 lambda 표현을 포함한 여러 콜백 등록 방법을 지원합니다.
- 하드웨어 플랫폼: 모든 WiFi-capable 개발 보드

### [WiFi클라이언트](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/WiFi/examples/WiFiClientStaticIP)
WiFi 정적 IP 구성 예. 그것은 사용`WiFi.config()`정적 IP 주소, 게이트웨이, 서브넷 마스크 및 DNS 서버를 설정합니다. 성공적인 연결 후에, 가득 차있는 네트워크 윤곽은 인쇄되고 HTTP 요구는 개시됩니다.

- 고정 IP 주소를 요구하는 배포 시나리오에 적합합니다.
- 하드웨어 플랫폼: 모든 WiFi-capable 개발 보드

### [와이파이Multi](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/WiFi/examples/WiFiMulti)
멀티 AP 자동 전환 예. 그것은 사용`WiFiMulti`여러 WiFi 핫스팟을 추가하는 클래스. 장치는 자동으로 가장 강한 신호와 스위치를 다른 사용 가능한 핫스팟으로 선택할 수 있습니다.

- 다중 와이파이 환경 사이에서 이음새가 없는 roaming 요구하는 시나리오를 위해 적당한.
- 하드웨어 플랫폼: 모든 WiFi-capable 개발 보드

### [와이파이](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/WiFi/examples/WiFiScan)
WiFi 네트워크 스캔 예제. 그것은 사용`WiFi.scanNetworks()`Wi-Fi 네트워크를 스캔하고 각 네트워크의 SSID, RSSI 신호 강도, 채널 및 암호화 유형을 인쇄합니다.

- OPEN, WEP, WPA PSK, WPA2 PSK, WPA3 및 기타 암호화 유형의 식별을 지원합니다.
- 하드웨어 플랫폼: 모든 WiFi-capable 개발 보드

### [와이파이ScanDualAntenna](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/WiFi/examples/WiFiScanDualAntenna)
WiFi 듀얼 안테나 스캔 예제. 그것은 사용`WiFi.setDualAntennaConfig()`이중 안테나 GPIO 핀 및 TX / RX 안테나 모드를 구성하려면 이중 안테나가 활성화 된 네트워크 스캔을 수행합니다.

- Dual-antenna 기능에 대한 하드웨어 지원이 필요합니다.
- 하드웨어 플랫폼: Dual-antenna 지원을 가진 발달 널

### [와이파이TelnetToSerial](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/WiFi/examples/WiFiTelnetToSerial)
WiFi Telnet-to-Serial 브리지 예제. 그것은 하드웨어 직렬 포트와 WiFi Telnet 연결을 교량 — Telnet 클라이언트를 통해 장치에 연결 한 후, Telnet을 통해 전송 및 수신 된 데이터는 직렬 포트에 투명하게 전달, 및 부사장.

- 제품정보`WiFiMulti`멀티-AP 지원, 포트 23을 듣고.
- 먼 serial debugging 시나리오를 위해 적당한.
- 하드웨어 플랫폼: 모든 WiFi-capable 개발 보드

### [WiFiUDP 계정](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/WiFi/examples/WiFiUDPClient)
WiFi UDP 통신 예. 그것은 사용`WiFiUDP`UDP 데이터 교환 클래스 - 지정된 포트에 청취, 소스 IP를 인쇄, 포트 및 UDP 패킷이 수신 될 때 콘텐츠, 확인 메시지와 회신.

- 저렴한 LAN 통신 시나리오에 적합합니다.
- 하드웨어 플랫폼: 모든 WiFi-capable 개발 보드

## Tuya IoT 클라우드 액세스
TuyaIoT 라이브러리는 Tuya IoT 플랫폼에 대한 장치 액세스를 제공합니다. DP (Data Point) 모델을 통해 장치, 클라우드, 모바일 앱과 장치 활성화, 데이터 보고, 명령 수신, 날씨 쿼리 등을 지원하는 데이터 상호 작용이 가능합니다.

### [빠른 시작](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/TuyaIoT/examples/quickStart)
Tuya IoT 빠른 시작 예제. 완전한 Tuya IoT 장치 개발 워크플로우를 보여줍니다. 장치 라이선스 구성, 초기화`TuyaIoT`, 처리 장치 바인딩, 클라우드 연결, 및 DP 명령 수신 이벤트 콜백, 그리고 전화 앱과 온보드 LED 사이 두 방향 제어 달성.

- 짧은 단추 압박은 LED 국가를 견인하고 그것을 보고합니다; 긴 압박은 장치 바인딩을 제거합니다.
- 제품정보`TuyaIoT.write()` / `TuyaIoT.read()`DP 데이터 읽기/쓰기.
- 하드웨어 플랫폼 : Tuya 호환 개발 보드 (T2, T3, T5AI, ESP32, LN882H 또는 XH WB5E 시리즈)
- [PID를 만들고 클라우드 장치 통신을 위한 DP를 구성하는 방법](https://tuyaopen.ai/docs/cloud/tuya-cloud/creating-new-product)

### [dp유형](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/TuyaIoT/examples/dpType)
Tuya DP 데이터 유형 예. Bool, Enum, Value (integer), String 및 Raw (pass-through)를 포함한 Tuya IoT 플랫폼에서 지원하는 모든 DP 데이터 유형에 대한 읽기 / 쓰기 방법을 보여줍니다. 종합 DP 개발 참조 역할을 합니다.

- 데모`TuyaIoT.read()`이름 *`TuyaIoT.write()`다른 자료 유형을 위해.
- raw type의 hexadecimal data send/receive 예제를 포함합니다.
- 하드웨어 플랫폼 : Tuya 호환 개발 보드 (T2, T3, T5AI, ESP32, LN882H 또는 XH WB5E 시리즈)

### [날씨Get](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/TuyaIoT/examples/weatherGet)
Tuya 기상 서비스 예. 현재 기상 조건 (온도, 습도, 겉보기 온도, 압력, UV 지수), 바람 정보, 일출 / 일출 시간, 공기 품질 지수 (AQI) 및 7 일 일기 예보를 포함하여 Tuya Cloud를 통해 기상 데이터를 검색합니다.

- 사용 방법`TuyaIoTWeatherClass`밀폐된 날씨 쿼리 인터페이스.
- 몇몇 공용영역 (예를 들면, 바람 가늠자 및 AQI 순위를 위해)는 중국 본토 자료 센터에서만 지원됩니다.
- 이 장치는 쿼리하기 전에 활성화 및 시간 동기화해야합니다.
- 하드웨어 플랫폼 : Tuya 호환 개발 보드 (T2, T3, T5AI, ESP32, LN882H 또는 XH WB5E 시리즈)

## HTTP 클라이언트
HTTPClient 라이브러리는 편리한 HTTP/HTTPS 요청 인터페이스, 인코딩 연결 관리, 요청 전송 및 응답 패싱을 제공합니다.

### [BasicHttp 계정](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/HTTPClient/examples/BasicHttpClient)
HTTP 요청 예. 그것은 사용`HTTPClient`HTTP GET 요청을 시작하려면 WiFi에 연결 한 다음 응답 상태 코드와 콘텐츠를 인쇄 할 지정된 URL에 액세스하십시오.

- 제품정보`http.begin()`URL을 설정하고`http.GET()`자주 묻는 질문
- 하드웨어 플랫폼: 모든 WiFi-capable 개발 보드

### [BasicHttps 클라이언트](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/HTTPClient/examples/BasicHttpsClient)
HTTPS 요청 예. 그것은 사용`HTTPClient`보안 HTTPS 요청을 시작하려면 서버 정체성을 확인하고 암호화 된 통신을 활성화하기 위해 CA 루트 인증서를 구성하십시오.

- TLS 검증을 위한 서버 CA 인증서 제공
- 하드웨어 플랫폼: 모든 WiFi-capable 개발 보드

## MQTT 클라이언트
MQTTClient 라이브러리는 MQTT 프로토콜 클라이언트 구현을 제공하여 메시지 게시, 서브스크립팅, 인증 등을 지원합니다. IoT 기기와 클라우드 간의 메시지 통신에 이상적입니다.

### [사이트맵](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/MQTTClient/examples/mqtt_basic)
기본 MQTT 출판/보통 예. WiFi 연결 후 MQTT 브로커 정보를 구성하고 연결 설정, 메시지 게시`outTopic`, 가입`inTopic`수신된 메시지 콘텐츠를 인쇄하는 콜백 함수와 함께 메시지를 수신합니다.

- 공공 시험 브로커 사용`broker.emqx.io`.
- 이름 *`mqtt.loop()`내 계정`loop()`연결 유지.
- 하드웨어 플랫폼: 모든 WiFi-capable 개발 보드

### [사이트맵](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/MQTTClient/examples/mqtt_auth)
MQTT 인증 연결 예제. MQTT 브로커에 연결하여 사용자 이름과 암호를 사용하여 인증해야하며 구성 방법을 보여주는`username`이름 *`password`관련 기사`mqtt_client_config_t`.

- 하드웨어 플랫폼: 모든 WiFi-capable 개발 보드

### [mqtt publish in callback의 경우](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/MQTTClient/examples/mqtt_publish_in_callback)
MQTT 콜백 예제 내 메시지. 메시지 내 메시지가 콜백 받기 — subscribing to`inTopic`수신된 메시지`outTopic`, 메시지 릴레이 기능을 실행.

- 안전하게 호출하는 방법`mqtt.publish()`콜백 함수 안에.
- 자동 연결 로직을 분리합니다.
- 하드웨어 플랫폼: 모든 WiFi-capable 개발 보드

## DNS 서버
DNSServer 라이브러리는 Captive Portal 시나리오에서 일반적으로 사용되는 경량 DNS 서버 기능을 제공합니다.

### [회사소개](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/DNSServer/examples/CaptivePortal)
Captive Portal 예제. 그것은 WiFi 핫스팟을 생성하고 장치의 자신의 IP 주소에 모든 도메인 이름 해상도 요청을 리디렉션 DNS 서버를 시작합니다. HTTP 서버와 결합하여 캡티브 포털 페이지를 구현합니다. 사용자는 핫스팟에 연결하여 구성 페이지를 자동으로 볼 수 있습니다.

- 제품정보`WiFi.softAP()`핫스팟을 만들려면,`DNSServer`납치 DNS 및`WiFiServer`HTTP 페이지를 제공합니다.
- 장치 제공, 로컬 구성 및 유사한 시나리오에 적합.
- 하드웨어 플랫폼: 모든 WiFi-capable 개발 보드
