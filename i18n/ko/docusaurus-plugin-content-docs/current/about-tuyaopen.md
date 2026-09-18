---
title: TuyaOpen 소개
description: "TuyaOpen이란 무엇인가요? 크로스 플랫폼 C/C++ SDK, 오픈 소스 OS, AIoT 하드웨어 구축을 위한 AI Agent 도구를 제공하는 오픈 소스 IoT 플랫폼을 알아보세요."
keywords:
  - TuyaOpen 플랫폼 소개
  - TuyaOpen이란
  - 오픈 소스 IoT 플랫폼
  - 오픈 소스 AIoT 플랫폼
  - TuyaOpen SDK
---

![TuyaOpen — 오픈 소스 IoT 및 AI 개발 플랫폼](https://images.tuyacn.com/fe-static/docs/img/c128362b-eb25-4512-b5f2-ad14aae2395c.jpg)


## 개요
TuyaOpen은 차세대 AI Agent 하드웨어를 구축하기 위한 유연한 크로스 플랫폼 C/C++ SDK입니다. Tuya T 시리즈 WIFI/BT MCU, Raspberry Pi, ESP32를 지원하고, Tuya Cloud의 낮은 지연 시간 멀티모달 AI(드래그 앤 드롭 워크플로)와 연동하며, 주요 모델(ChatGPT, Gemini, Qwen, Doubao 등)을 통합해 개방형 AIoT 생태계 구축을 간소화합니다.

![TuyaOpen 한 페이지 소개](https://images.tuyacn.com/fe-static/docs/img/2eed8b23-0459-4db4-8f17-e7cce8b36b8a.png)

### 구축할 수 있는 것
TuyaOpen을 사용하면 다음과 같은 작업을 할 수 있습니다.

- `ASR`(Automatic Speech Recognition), `KWS`(Keyword Spotting), `TTS`(Text-to-Speech), `STT`(Speech-to-Text)와 같은 음성 기술을 탑재한 하드웨어 제품을 개발합니다.
- `Deepseek`, `ChatGPT`, `Claude`, `Gemini`를 비롯한 주요 LLM 및 AI 플랫폼을 통합합니다.
- 음성, 비전, 센서 기반 기능을 포함한 고급 멀티모달 AI 기능을 갖춘 스마트 디바이스를 구축합니다.
- 맞춤형 제품을 만들고 Tuya Cloud에 연결해 원격 제어, 모니터링, OTA 업데이트를 구현합니다.
- `Google Home` 및 `Amazon Alexa`와 호환되는 디바이스를 개발합니다.
- `Powered by Tuya` 하드웨어를 설계합니다.
- `Bluetooth`, `Wi-Fi`, `Ethernet` 등 다양한 연결 방식을 활용하는 하드웨어 애플리케이션을 개발합니다.
- 내장 보안, 디바이스 인증, 데이터 암호화의 이점을 활용합니다.

스마트 홈 제품, 산업용 IoT 솔루션 또는 맞춤형 AI 애플리케이션을 만들 때 TuyaOpen은 빠른 시작과 플랫폼 간 확장을 위한 도구와 예제를 제공합니다.

---

### TuyaOpen SDK 프레임워크
![TuyaOpen SDK 프레임워크](https://images.tuyacn.com/fe-static/docs/img/25713212-9840-4cf5-889c-6f55476a59f9.jpg)

TuyaOpen SDK는 다음 다섯 개의 주요 계층으로 구성된 계층형 아키텍처를 사용합니다.

#### 1. TKL Kernel Layer
- **역할**: 아키텍처의 가장 아래 계층으로, 기본 하드웨어 플랫폼 적응을 담당합니다. 상위 계층에 하드웨어 및 OS를 아우르는 드라이버 지원을 제공하며 전체 프레임워크의 "하드웨어 기반" 역할을 합니다.
- **주요 구성 요소**:
  - **하드웨어 플랫폼 SDK**: Tuya T 시리즈 MCU Core-SDK(Tuya가 자체 개발한 MCU 시리즈), ESP32 시리즈 IDF SDK(Espressif ESP32 시리즈), 향후 지원 예정인 Raspberry Pi Pico 등 다양한 칩/플랫폼의 핵심 SDK를 지원합니다.
  - **범용 하드웨어 드라이버**: PWM, ADC, DAC, GPIO, I2C와 같은 공통 주변 장치용 TKL 드라이버를 제공해 하드웨어 차이를 추상화하므로 상위 계층이 하드웨어별 세부 사항을 직접 처리하지 않아도 됩니다.
  - **이기종 플랫폼 적응**: ARM SoC 및 Linux/Ubuntu처럼 BSP(Board Support Packages)가 필요한 플랫폼을 지원해 다양한 하드웨어에서 아키텍처를 실행할 수 있습니다.

:::note
개발자가 일반적으로 이 계층의 구현 세부 사항을 직접 확인할 필요는 없습니다. TKL은 주로 칩의 기능을 매핑하고 연결합니다.
:::

#### 2. TAL Abstract Layer
- **역할**: TKL 위에 위치하며 하드웨어와 시스템의 차이를 추상화해 상위 계층에 통합 인터페이스와 기본 기능을 제공합니다. "하위 하드웨어"와 "상위 소프트웨어"를 연결하는 다리 역할을 합니다.
- **주요 구성 요소**:
  - **TuyaOpen API(OS+Device) 기능 모듈**: 메모리 관리, 로깅, 이벤트/메시지/스케줄링 큐, 시간/시간대 관리, 스레드 관리, 보안 저장소, TAL 드라이버 등 핵심 시스템 인터페이스를 제공해 상위 계층의 동시성, 저장소, 스케줄링을 지원합니다.
  - **연결성**: Wi-Fi, Ethernet, LTE Cat.1, Bluetooth 등을 지원하는 디바이스 네트워킹을 담당해 유연한 네트워크 접속을 제공합니다.
  - **보안**: 암호화/복호화 등의 보안 알고리즘과 하드웨어/소프트웨어 기반 보안 엔진을 제공해 디바이스와 데이터를 보호합니다.

#### 3. Libraries Layer
- **역할**: TAL의 통합 인터페이스를 기반으로 다양한 범용 라이브러리와 프로토콜을 캡슐화해 상위의 Services 및 Applications 계층에 바로 사용할 수 있는 기능 구성 요소를 제공합니다.
- **주요 구성 요소**:
  - **네트워킹 프로토콜**: MQTT(주요 IoT 프로토콜), mbedTLS(보안 전송), HTTP, WebSocket을 지원해 디바이스 네트워킹과 데이터 전송 요구 사항을 충족합니다.
  - **리소스 관리자**: AI Service Manager/API, Display Manager, Audio Manager 등 핵심 리소스를 관리합니다.
  - **멀티미디어 프로토콜**: P2P(peer-to-peer), RTSP/RTP(streaming media) 등을 지원해 오디오 및 비디오 애플리케이션을 강화합니다.
  - **기타 도구**: LVGL GUI(임베디드 그래픽 인터페이스), cJSON(JSON 파싱), QR Code 처리 등을 제공해 다양한 시나리오를 지원합니다.

#### 4. Services Layer
- **역할**: Libraries 계층의 기능을 기반으로 상위 수준의 서비스와 개발 도구를 캡슐화해 애플리케이션 개발 복잡도를 줄입니다. "애플리케이션 혁신"을 직접 지원하는 계층입니다.
- **주요 구성 요소**:
  - **크로스 플랫폼 개발 도구**: TuyaOpen SDK(C/C++), `tos.py` 도우미 도구, Arduino IDE, Lua, MicroPython 등 다양한 기술 스택의 개발을 지원합니다.
  - **Tuya Cloud 서비스**: AI Agent, Multi-Model(Audio/Video), Cloud ASR/VAD(클라우드 음성 처리), IoT PaaS(IoT 플랫폼 서비스), LLM Model(대규모 언어 모델), RAG(retrieval-augmented generation), Tuya AI+IoT Cloud(AI와 IoT를 통합한 클라우드) 등 Tuya의 핵심 클라우드 기능을 제공합니다.
  - **주변 장치 드라이버**: Tuya Device Drivers(TDD)라고도 하며 버튼, LED, 디스플레이, 오디오 코덱, ADC, SPI 및 기타 하드웨어 인터페이스를 지원합니다.
  - **오디오 ASR**: VAD(voice activity detection), DOA(direction of arrival, 예정), AEC(echo cancellation), Beam-forming(예정), Wake-Word detection 등을 포함한 음성 처리를 담당합니다.

#### 5. Applications Layer(사용자 애플리케이션)
- **역할**: 아키텍처의 최상위 계층으로 비즈니스 시나리오와 최종 애플리케이션을 직접 대상으로 합니다. 하위 계층의 모든 기능을 통합해 다양한 영역의 제품 구현을 지원합니다.
- **대표 시나리오**:
  - 산업
  - 실외
  - 비전
  - 오디오
  - AI Agent
  - 로봇
  - 운동 및 건강
  - 보안 및 영상 감시
  - 스마트 홈
  - 엔터테인먼트
  - 기타

:::tip 계층형 설계의 핵심 장점
하위 계층은 하드웨어에 유연하게 적응하고, 중간 계층은 재사용 가능한 기능을 제공하며, 상위 계층은 표준화된 서비스를 빠르게 개발합니다. 이를 통해 "한 번 개발하고 어디서나 배포"할 수 있으며 IoT 및 AI 애플리케이션의 구현을 가속합니다.
:::

---

## 지원 플랫폼
| 플랫폼 | Windows | Linux | macOS |
| :------: | :-----: | :---: | :---: |
| BK7231X | ⌛️ | ✅ | ⌛️ |
| ESP32 | ✅ | ✅ | ✅️ |
| ESP32-C3 | ✅ | ✅ | ✅️ |
| ESP32-S3 | ✅ | ✅ | ✅️ |
| LN882H | ⌛️ | ✅ | ⌛️ |
| T2 | ⌛️ | ✅ | ⌛️ |
| T3 | ⌛️ | ✅ | ⌛️ |
| T5AI | ✅ | ✅ | ✅ |
| Ubuntu | ➖ | ✅ | ➖ |

- ✅: 이미 지원됩니다.
- ⌛️: 곧 지원될 예정입니다.
- ➖: 지원되지 않습니다.

## 코드 기여
TuyaOpen에 관심이 있고 코드 기여자로 개발에 참여하려면 먼저 [기여 가이드](./contribute/contribute-guide.md)를 확인하세요.

## 관련 링크
- [C용 TuyaOpen](https://github.com/tuya/TuyaOpen)
- [Arduino용 TuyaOpen](https://github.com/tuya/arduino-TuyaOpen)
- [LuaNode용 TuyaOpen](https://github.com/tuya/luanode-TuyaOpen)

### Gitee 미러
- TuyaOpen C: [https://gitee.com/tuya-open/TuyaOpen](https://gitee.com/tuya-open/TuyaOpen)
- TuyaOpen Arduino: [https://gitee.com/tuya-open/arduino-TuyaOpen](https://gitee.com/tuya-open/arduino-TuyaOpen)
- TuyaOpen Luanode: [https://gitee.com/tuya-open/luanode-TuyaOpen](https://gitee.com/tuya-open/luanode-TuyaOpen)


## 업데이트 및 릴리스
TuyaOpen은 빠르게 개발되고 있으며 다음 릴리스 전략을 따릅니다.

### 버전 브랜치
- **release**: 안정 버전으로, 프로덕션 환경에 권장됩니다.
- **master**: 베타 버전으로, 최신 기능을 먼저 사용하려는 개발자에게 적합합니다.
- **dev**: 최신 기능을 포함하지만 불안정할 수 있는 개발 버전입니다.

### 릴리스 주기
- **안정 버전**: 1~2개월마다 안정 버전을 릴리스합니다.
- **베타 버전**: 충분한 테스트 후 매주 수요일 `dev` 브랜치를 `master` 브랜치에 병합합니다.

### 버전 선택 권장 사항
- **프로덕션 환경**: 안정성을 위해 `release` 버전을 사용하세요.
- **개발 및 테스트**: 최신 기능을 사용하려면 `master` 버전을 사용할 수 있습니다.
- **기능 미리보기**: `dev` 버전을 선택할 수 있지만 불안정할 수 있다는 점에 유의하세요.

최신 릴리스 정보는 [TuyaOpen 릴리스 로드맵](/docs/maintenance-and-releases)을 확인하세요.
