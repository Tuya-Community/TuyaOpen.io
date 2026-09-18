---
title: TuyaAI API 개발
description: "Arduino의 TuyaAI API 개발 - IoT 스위치에서 음성 채팅, MCP 도구 및 T5 보드에 사용자 정의 UI에 AI 기능을 추가합니다."
keywords:
  - tuyaai api
  - arduino
  - t5
  - ai development
  - mcp
---

더 보기`TuyaAI`API는 Arduino IDE의 장치 응용 프로그램에 AI 기능을 추가하기위한 인터페이스 세트를 제공합니다. 아래 예제는 기본적으로 고급으로 진행되며, 간단한 IoT 스위치에서 음성 채팅, MCP 도구 및 Arduino의 사용자 정의 UI로 이동합니다.

```
TuyaAI (Main Class)
├── TuyaAI.UI      - UI display management
├── TuyaAI.Audio   - Audio input/output
├── TuyaAI.MCP     - Model Context Protocol tool extension
└── TuyaAI.Skill   - Music, stories, emotion recognition, and other skills
```

## 예제 개요
### [00 IoT SimpleExample에 대하여](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/AIcomponents/examples/00_IoT_SimpleExample)
Tuya Cloud를 기반으로 한 IoT 스위치 예. 그것은 Tuya DP (Data Point)를 사용하여 3방향 통신을 구현합니다.`Device`, `Cloud`·`APP`, 온보드 LED를 통제하고 전화 앱에서 떨어져.

- 하드웨어 플랫폼 : Tuya 호환 개발 보드 (T2, T3, T5AI, ESP32, LN882H 또는 XH WB5E 시리즈)
- [PID를 만들고 클라우드 장치 통신을 위한 DP를 구성하는 방법](https://tuyaopen.ai/docs/cloud/tuya-cloud/creating-new-product)

### [01 AI 텍스트](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/AIcomponents/examples/01_AI_TextChat)
Tuya Cloud를 기반으로 한 AI Agent 텍스트 채팅 예. 그것은 직렬 텍스트에 AI 에이전트와 상호 작용 — 프로비저닝 후, Arduino IDE 시리얼 모니터에서 텍스트를 AI와 채팅, 그리고 AI의 응답은 실시간 텍스트로 다시 스트림.

- 하드웨어 플랫폼: TUYA-T5AI 시리즈, ESP32 시리즈

### [02 AI 오디오 채팅](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/AIcomponents/examples/02_AI_AudioChat)
Tuya Cloud를 기반으로 한 AI Agent 음성 채팅 예. 그것은 마이크와 스피커를 통해 AI 에이전트와 상호 작용합니다 - 프로비저닝 후, 프롬프트 톤 재생, 당신은 대화를 시작 하는 깨진 단어와 장치를 깨.

- 기본 모드는 Wakeup입니다. 버튼을 더블 클릭하거나 수정하여 대화 모드를 전환합니다.`TuyaAI.begin`모수.
- 모닝콜 서비스
- 직렬 텍스트 채팅도 지원됩니다.
- 하드웨어 플랫폼: TUYA-T5AI 시리즈 전용

### [03 AI 오디오세이브](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/AIcomponents/examples/03_AI_AudioSave)
AIoT 장치 오디오 녹음 예제. 그것은 음성 데이터 수집 및 오프라인 분석을위한 SD 카드에 원시 마이크 오디오 (PCM 형식) 및 클라우드 TTS 합성 오디오 (MP3 형식)를 저장합니다.

- 하드웨어 플랫폼 : SD 카드 기능은 T5AI-Board 개발 보드에서만 지원됩니다.

### [04 AI 맥](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/AIcomponents/examples/04_AI_Mcp)
MCP (Model Context Protocol) 예제, AI 에이전트. 장치에서 MCP 도구를 등록하므로 AI Agent는 대화 중에 장치 측 로컬 도구를 호출 할 수 있습니다. 예제는 볼륨 제어 도구를 등록하고 음성 또는 텍스트 명령을 통해 장치 볼륨을 조정할 수 있습니다.

- 하드웨어 플랫폼: TUYA-T5AI 시리즈 전용

:::note
Tuya의 MCP 기능은 현재 두 가지 구성 방법을 지원합니다.

- **Device MCP**: 코드에서 API를 호출하여 MCP 도구를 등록하십시오. 대화 중 AI Agent는 장치 측 등록 도구 (예를 들어 사진 또는 조정 볼륨)를 호출 할 수 있습니다.
- ** 사용자 정의 MCP 서비스 ** : Tuya의 다운로드[MCP SDK 저장소](https://github.com/tuya/tuya-mcp-sdk.git), PC 측에 MCP 공구를 주문을 받아서 만들고, 서비스를 시작합니다. 대화 중, AI Agent는 PC 측 도구를 호출 할 수 있습니다. 자세한 내용은[주문 MCP 서비스 문서](https://tuyaopen.ai/docs/cloud/tuya-cloud/ai-agent/13.1-custom-mcp-services).
:::

### [05 AI 스킬](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/AIcomponents/examples/05_AI_Skill)
AI Agent에 대한 기술 예제. 음악과 이야기 재생과 감정 인식을 포함하여 에이전트에 의해 파견 된 기술 이벤트를 파고 처리합니다. 대화를 통해 음악이나 이야기 재생을 트리거하고 감정 데이터를 얻을 수 있습니다 에이전트 인식 (emotion name and emoji). 에이전트 기술 구성에 대 한, 참조[AI Agent 개발 플랫폼 문서](https://tuyaopen.ai/docs/cloud/tuya-cloud/ai-agent/ai-agent-dev-platform).

- 음악 도구는 서비스 제공 업체에 따라 다른 가격 모델을 가질 수 있습니다.
- NetEase Cloud Music은 중국 데이터 센터에서만 사용할 수 있습니다. 비 중국 지역은 미리보기 콘텐츠를 만 재생할 수 있습니다.
- 음악과 이야기 기술 지원 장치 측 재생 단지.
- 하드웨어 플랫폼: TUYA-T5AI 시리즈 전용

### [06 AI 두야이](https://github.com/tuya/arduino-TuyaOpen/tree/main/libraries/AIcomponents/examples/06_AI_TuyaUI)
AI 사용자 정의 UI 디스플레이 예. 그것은 내장 글꼴, 이모티콘, 아이콘 및 기타 UI 리소스에 액세스하고 사용자 정의 채팅 인터페이스 디자인, 실시간 ASR 텍스트 및 AI 응답을 표시하는 LVGL을 사용합니다.

- 하드웨어 플랫폼: LVGL 디스플레이 기능은 T5AI-Board 개발 보드에서만 지원됩니다.

## 더 보기
- [Application 개발](Application.md)- 전체`YourChatBot`이러한 기능을 결합한 예.
- [주변관광](Peripheral_Development.md)- 주변 및 네트워킹 라이브러리 예.
