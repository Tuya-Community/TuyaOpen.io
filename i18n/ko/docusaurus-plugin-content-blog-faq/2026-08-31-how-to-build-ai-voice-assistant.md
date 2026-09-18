---
date: 2026-08-31
---

# TuyaOpen과 AI Voice Assistant 구축 방법
클라우드 API 키, 사용자 정의 PCB 및 펌웨어 디버깅의 주가 필요한 스크래치에서 **AI 음성 조수**를 구축하십시오. 2026년에 장벽은 극적으로 떨어졌습니다: 오픈 소스[TuyaOpen SDK 다운로드](https://tuyaopen.ai/docs/about-tuyaopen)음성을 캡처 할 수, 로컬로 키워드 스폿을 실행, 큰 언어 모델에 스트림 연설, 그리고 다시 말한 응답을 재생 - 응용 코드의 500 개 이상의 모든. TuyaOpen는 크로스 플랫폼에서 실행[Tuya T5 칩](https://tuyaopen.ai/t5-tuyaopen), [에스프레소 ESP32](https://tuyaopen.ai/docs/hardware/espressif/overview-esp32), 라즈베리 파이 및 기타 ARM/RISC-V 대상 - 한 번 쓰기, 어디에서 배포. ** "AI 음성 보조를 구축하는 방법"** 또는 실용적인 **DIY 음성 제어 IoT 장치**를 찾고 있다면, 이 가이드는 하드웨어 선택부터 작업 프로토 타입까지 전체 파이프라인을 통해 걸어갑니다.

![TuyaOpen T5 보드](https://images.tuyacn.com/rms-static/c0cff1d0-a4e7-11f1-9a8d-736398ab592b-1788145070445.webp?tyName=Gemini_Generated_Image_wog1iewog1iewog1.webp)

여기에 접근은 대부분의 "talk to ChatGPT" 튜토리얼과 다른 노트북을 통해 오디오를 파이프. 마이크로컨트롤러에서 실행되는 **voice-controlled IoT Device**를 구축하고, Wi-Fi에 연결하고, 장치 관리용 Tuya Cloud와 통합하며, 여러 LLM 백엔드를 지원합니다.[딥스카이](https://tuyaopen.ai/tools), [채팅GPT](https://tuyaopen.ai/tools), [기본 정보](https://tuyaopen.ai/tools), [사이트맵](https://tuyaopen.ai/tools)·[스낵 바](https://tuyaopen.ai/tools)— 단일 통합 API를 통해. 더 보기[TuyaOpen 플랫폼](https://tuyaopen.ai/)무거운 드는 손잡이: 오디오 붙잡음, 음성 활동 탐지 (VAD), 자동적인 음성 승인 (ASR), LLM 격자, 원본에 Speech (TTS) 및 오디오 재생. 애플리케이션 논리에 집중합니다.

** 스마트 홈 음성 허브 **, 착용 가능한 AI 동반자 또는[에이전트 AI 가젯](https://tuyaopen.ai/docs/cloud/tuya-cloud/ai-agent/ai-agent-dev-platform)센서 데이터에 대한 이유와 자율적 조치를 취할 수 있습니다, 이 문서의 건축은 생산에 대한 증거의 합의에서 스케일. TuyaOpen이 Apache 2.0이 라이센스되어 있기 때문에[GitHub 저장소](https://github.com/tuya/TuyaOpen)그것은 1.8k 별과 1.3 백만 개발자 이상 유치, 당신은 상업적으로 배치 된 장치의 수백에 걸쳐 검증 된 인프라에 구축 - 스케일에서 출발 주말 해킹하지.

![AI SDK 투야오픈](https://images.tuyacn.com/rms-static/c0d214b0-a4e7-11f1-82af-d1f3191773d6-1788145070459.webp?tyName=Gemini_Generated_Image_b5l41yb5l41yb5l4.webp)

> ** 튜토리얼을 건너뛰기 위해?** 더 보기[Tuya T5 dev 키트](https://tuyaopen.ai/t5-tuyaopen)TuyaOpen SDK, 마이크 어레이, 스피커 앰프, 카메라 및 USB-C와 함께 선보일 예정입니다.[dev 키트 주문](https://tuyaopen.ai/get-hardware).

## AI Voice Assistant는 무엇인가요?
**AI 음성 조수**는 말한 입력을 받아들이는 소프트웨어이며, 자연적인 언어 처리를 사용하여 사용자의 의도를 해석하고, 전형적으로 음성 출력과 행동을 트리거하여 응답합니다. 용어는 on-device 키워드 탐지기 ( "Hey device, Wake up")의 모든 것을 큰 언어 모델에 의해 구동되는 전체 대화 에이전트에 포함합니다.

**DIY AI 음성 조수 **와 상용 스마트 스피커는 기능이 아닙니다. Alexa 또는 Google Home과 같은 상업용 제품은 클라우드 전용 인섭과 사용자 정의 실리콘에 독점적 인 펌웨어를 실행합니다. LLM을 교환하거나 소스 코드를 검사할 수 없습니다. TuyaOpen 기반 음성 조수, 대비, 당신을 제공합니다:

- **LLM 선택.** DeepSeek, ChatGPT, Gemini, Qwen, 또는 Doubao와 대화를 단일 API 키로 변환합니다. 납품업자 lock-in 없음.
- **Edge + 클라우드 유연성.** 키워드 스폿팅 및 음성 활동 감지 on-device를 실행하십시오. ASR 및 LLM inference 용 클라우드에 실제 연설 세그먼트 만 보냅니다. 이것은 대기 시간을 줄이고 대역폭을 보존하며 프라이버시를 향상시킵니다.
- ** 풀 펌웨어 컨트롤.** 오디오 파이프라인을 수정, 사용자 정의 웨이브 단어를 추가, 추가 센서를 통합, 또는 배치[AI 에이전트](https://tuyaopen.ai/docs/cloud/tuya-cloud/ai-agent/ai-agent-dev-platform)대화형 컨텍스트를 기반으로 IoT 기기를 자율적으로 제어할 수 있습니다.
- **생산 경로.** 프로토타입을 구동하는 동일한 SDK는 Tuya-certified 모듈을 통해 수백만 명의 최종 사용자에게 배송할 수 있습니다. "생산을 위해 읽는"단계가 없습니다.

![AI 음성 조수](https://images.tuyacn.com/rms-static/c0d65a70-a4e7-11f1-82af-d1f3191773d6-1788145070487.webp?tyName=Gemini_Generated_Image_lloisylloisylloi.webp)

개발자는 이미 일하고 있습니다.[Espressif의 ESP32 가족](https://www.espressif.com/en/products/socs)— 가장 인기있는 MCU 플랫폼 중 하나[TinyML 생태계](https://www.tinyml.org/)- TuyaOpen은 직접 업그레이드 경로를 제공합니다 : 같은 음성 보조 응용 코드는 TuyaOpen의 통해 ESP32 하드웨어에서 실행됩니다[ESP32 지원 층](https://tuyaopen.ai/docs/hardware/espressif/overview-esp32), 당신에게 클라우드 AI, 장치 관리, 및 크로스 플랫폼 포트 가능[ESP-IDF 프레임 워크](https://docs.espressif.com/projects/esp-idf/en/stable/esp32/get-started/index.html)당신은 이미 알고. 음성 조수는 이 더미를 탐구하는 이상적인 프로젝트입니다: 그것은 플랫폼의 가득 차있는 기능을 보여주는 단 하나 신청에 있는 오디오 가공, Wi-Fi 연결, 구름 AI 및 기계설비 통제를 결합합니다.

> ** ESP32에서 이미?** TuyaOpen는 ESP-IDF의 상단에 실행됩니다. - 교체가 아닙니다. 기존 ESP-IDF 툴체인은 여전히 저수준 제어를 위해 작동합니다.`tos.py idf`. 참조[ESP32 에 TuyaOpen 개요](https://tuyaopen.ai/docs/hardware/espressif/overview-esp32)완전한 통합 가이드를 위해.

## TuyaOpen Voice Assistant의 하드웨어 요구 사항
음성 조수 파이프라인은 기본적인 감지기 독서 프로젝트를 넘어가는 특정한 기계설비 필요조건이 있습니다. TuyaOpen의 계층화 된 SDK는 하드웨어 차이를 요약하므로 애플리케이션 코드는 선택한 보드에 관계없이 동일하게 유지됩니다. 당신이 필요로하고 왜이다.

### Microcontroller: 당신의 표적 널을 선택
음성 처리는 다중 실시간 스테이지를 포함합니다 - I2S 오디오 캡처, VAD, 옵션 On-device KWS (keyword spotting), Wi-Fi 네트워킹 및 TTS 재생용 오디오 디코딩. TuyaOpen은 여러 하드웨어 대상을 지원합니다. 여기에 주요 옵션이 비교하는 방법입니다.

|칩 칩|시계|사이트맵|I2S 정보|와이파이|제품 정보|
|------|-------|-------|-----|-------|----------|
| [토야 T5](https://tuyaopen.ai/t5-tuyaopen) |480 MHz의 ARMv8-M|제품정보|이름 *|와이파이 6 + BT 5.4 LE|생산 AI 기기 — Agentic AI를 위한 목적 건축|
|모델 번호: ESP32-S3[인기 카테고리](https://www.espressif.com/en/products/socs)) |240 MHz 듀얼 코어 Xtensa|외부(최대 16MB)|이름 *|모델 번호: 802.11 b/g/n|Existing ESP32 프로젝트 - ESP-IDF의 상단에 TuyaOpen 추가|
|ESP32 (원래)|240 MHz 듀얼 코어|외부 (4–8 MB 전형)|이름 *|모델 번호: 802.11 b/g/n|최소 viable - 기본 음성 조수|

더 보기[토야 T5](https://tuyaopen.ai/t5-tuyaopen)새로운 프로젝트의 가장 강력한 옵션은 Edge 장치에서 ** 시약 AI의 배경에서 설계되었습니다. 480 MHz ARMv8-M 코어 DSP 및 FPU, 통합 Wi-Fi 6 및 블루투스 5.4 LE, 기본 카메라 및 오디오 주변 장치 및 22nm 프로세스 기술을 사용하여 16 μA 깊은 수면 전류를 가능하게합니다. 배터리를 배수하지 않고 깨어난 단어를 듣는 데 필요한 항상 목소리 조수. 팀에 이미 ESP32 생태계에 투자, TuyaOpen의[ESP32 지원](https://tuyaopen.ai/docs/hardware/espressif/overview-esp32)TuyaOpen의 클라우드 AI 및 장치 관리 기능을 기존 하드웨어를 포기하지 않고 채택할 수 있습니다.

> **선착할 수 없나요?** 상세한 비교를 읽으십시오:[프로젝트에 적합한 AI 개발 보드를 선택하는 방법](https://tuyaopen.ai/faq/how-to-choose-the-right-ai-development-board-for-your-project).

### 오디오 입력: 마이크
I2S를 통해 연결된 최소 MEMS 마이크가 필요합니다. noisy 환경 (kitchens, 공장)을 위해, 극적으로 광속을 가진 이중 마이크로 전화 배열은 음성 인식 정확도를 개량합니다 — 연구에서[팔의 가장자리 AI 팀](https://developer.arm.com/solutions/edge-computing)빔 형성은 역방향 환경에서 30 ~ 40%의 ASR 정확도를 향상시킬 수 있습니다. Tuya T5 dev 키트에는 내장 마이크 배열이 포함되어 있습니다. ESP32 보드의 경우 일반적으로 INMP441 또는 이와 유사한 I2S MEMS 마이크 모듈을 추가합니다.

### 오디오 산출: 스피커
MAX98357A I2S 증폭기는 3개의 W 스피커를 모는 것은 음성 조수 프로젝트를 위한 표준 선택입니다. 증폭기는 스피커를 위한 아날로그 신호로 TTS 산출에서 디지털 방식으로 I2S 오디오를 개조합니다. Tuya T5를 위해, on-chip 오디오 DAC와 증폭기 지원은 외부 성분 조사를 감소시킵니다.

### 채용 정보
|회사연혁|지원하다|지원하다|
|-----------|-----------|-------|
|MEMS 마이크|I2S (입력)|BCLK, WS, DATA 핀|
|I2S 증폭기 + 스피커|I2S (출력)|BCLK, WS, DATA, 게인|
|와이파이|안테나|대부분의 dev 보드에 내장|
|USB 케이블|UART / 디버그|플래시 및 직렬 모니터링|

> ** 빌드하는 것은? **[Tuya T5 dev 키트 주문](https://tuyaopen.ai/get-hardware)- 마이크, 스피커, 카메라 및 Wi-Fi 6 모든 사전 통합. 요구되는 배선 없음.

## 소프트웨어 아키텍처: TuyaOpen Voice Pipeline
TuyaOpen 음성 조수는 계층화된 파이프라인 구조를 따릅니다. 이 파이프라인을 이해하는 것은 당신이 Tuya T5에 건물인지 또는[실행 TuyaOpen 에 ESP32](https://tuyaopen.ai/docs/hardware/espressif/overview-esp32)동일한 논리 단계가 적용되기 때문에 - 하드웨어 요약 층 변화만. 이것은 TuyaOpen의 핵심 이점입니다[계층화된 SDK 아키텍처](https://tuyaopen.ai/docs/about-tuyaopen): TKL (하드웨어 요약) 및 TAL (OS 요약)은 애플리케이션 코드를 칩에 걸쳐 동일하게 유지할 수 있습니다.

```
┌─────────────┐     ┌─────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│  Mic (I2S)  │────▶│   VAD   │────▶│   ASR    │────▶│   LLM    │────▶│   TTS    │
│  Audio In   │     │  Voice  │     │  Speech  │     │  Language │     │  Text-to │
│             │     │ Activity│     │  to Text │     │   Model   │     │   Speech │
└─────────────┘     └─────────┘     └──────────┘     └──────────┘     └──────────┘
                                        │                                    │
                                        ▼                                    ▼
                                  ┌──────────┐                         ┌──────────┐
                                  │  Intent  │                         │ Speaker  │
                                  │  Parser  │                         │  (I2S)   │
                                  └──────────┘                         └──────────┘
```

### 단계 1: 오디오 캡처 (I2S)
I2S 주변은 지속적으로 16kHz, 16비트 모노에서 마이크를 샘플링합니다. TuyaOpen의 오디오 HAL (Hardware Abstraction Layer)은 모든 지원되는 플랫폼에서 통합 된 API를 제공합니다. Tuya T5, ESP32 및 기타 — 그래서 응용 코드가 칩을 전환 할 때 변경되지 않습니다. ESP32에서 TuyaOpen의 TKL 어댑터 ([카지노사이트](https://tuyaopen.ai/docs/hardware/espressif/overview-esp32)) ESP-IDF I2S 드라이버 함수로 이 호출을 자동으로 번역합니다.

### 단계 2: 음성 활동 탐지 (VAD)
VAD는 On-device를 실행하고 인간이 실제로 versus 배경 소음을 말할 때 감지합니다. 불필요한 클라우드 API 호출을 줄이는 데 중요합니다. 장치만 음성을 포함하는 오디오 세그먼트를 보냅니다. TuyaOpen에는 1KB의 RAM 아래에서 실행되는 경량 VAD 모델이 포함되어 있습니다.

### 단계 3: 자동적인 음성 인식 (ASR)
VAD 트리거가되면 오디오 세그먼트는 Tuya Cloud의 ASR 서비스에 전송됩니다 (또는 오디오 입력 기능이있는 클라우드 LLM). 결과는 사용자의 말한 쿼리의 텍스트 transcription입니다.

### 단계 4: LLM 관련 기사
transcribed 텍스트는 구성 된 LLM 백엔드로 이동합니다. TuyaOpen의 통합 AI API는 API 키를 한 번 구성하고 DeepSeek, ChatGPT, Gemini, Qwen, 및 Doubao 사이의 전환 할 수 있습니다 응용 코드 변경없이. 제품 정보[AI 에이전트](https://tuyaopen.ai/docs/cloud/tuya-cloud/ai-agent/ai-agent-dev-platform)사용 사례, LLM 응답은 도구 통화를 포함 할 수 있습니다 - 제어 조명, 읽기 센서, 또는 다른 IoT 작업을 트리거 할 수있는 명령.

### 5단계: Text-to-Speech (TTS) 및 재생
LLM의 텍스트 응답은 TTS를 통해 연설으로 변환되고 I2S 증폭기와 스피커를 통해 재생을위한 장치로 돌아갑니다. TuyaOpen은 오디오 버퍼링 및 재생 스케줄링을 처리하므로 응용 코드는 오디오 스트림을 수신하고 출력 주변 장치로 작성합니다.

## Step-by-Step: 첫 번째 음성 보조를 구축
여기에는 Zero에서 working **AI 음성 조수** 프로토 타입의 워크플로가 있습니다. 동일한 단계는 Tuya T5 또는 T5를 타겟팅하는지 여부를 적용[TuyaOpen 실행 ESP32 보드](https://tuyaopen.ai/docs/hardware/espressif/overview-esp32).

### 자주 묻는 질문
- 지원되는 발달 널:[Tuya T5 dev 키트](https://tuyaopen.ai/t5-tuyaopen)(추천) 또는 ESP32 보드 (ESP32-S3 선호) - 참조[TuyaOpen 가이드의 ESP32](https://tuyaopen.ai/docs/hardware/espressif/overview-esp32)호환성 세부사항
- I2S 마이크 (INMP441 또는 이와 유사한) 및 I2S 스피커 (MAX98357A + 3 W 스피커) - T5 dev 키트에 사전 통합
- USB-C 케이블
- ·[Tuya IoT 플랫폼](https://tuyaopen.ai/)계정 (무료 계층 가능)
- LLM API 키 (DeepSeek, OpenAI, 또는 모두[지원되는 공급자](https://tuyaopen.ai/tools))

### 1 단계 : 개발 환경 설정
가장 빠른 경로는[카테고리](https://tuyaopen.ai/tuyaopen-ide)— VS Code 및 Cursor 확장으로 사용할 수 있습니다. 도구 체인 설정, 빌드, 플래시, 시리얼 모니터링을 수동 구성 없이 제공합니다. 명령 줄을 선호한다면, 설치[TuyaOpen SDK 다운로드](https://tuyaopen.ai/docs/quick-start/enviroment-setup)직접:

```bash
git clone https://github.com/tuya/TuyaOpen.git
cd TuyaOpen
. ./export.sh
tos.py check
```

### 2단계: Voice Assistant 프로젝트 구성
음성 조수 예제를 탐색하고 대상 보드에 구성 :

```bash
cd apps/tuya_cloud/voice_assistant
tos.py config choice
```

대상 칩 (Tuya T5 또는 ESP32-S3)을 선택한 다음 생성 된 구성 파일에 Wi-Fi 자격 및 Tuya Cloud API 키를 구성하십시오. ESP32를 타겟팅하는 경우 TuyaOpen의 빌드 시스템은 상단에 자동으로 레이어를 배치합니다.[사이트맵](https://docs.espressif.com/projects/esp-idf/en/stable/esp32/get-started/index.html)- ESP-IDF 툴체인을 별도로 관리할 필요가 없습니다.

### 단계 3: 기계설비를 타전하십시오
I2S 마이크와 스피커를 적절한 GPIO 핀에 연결합니다. TuyaOpen SDK는 인기있는 개발 보드에 대한 핀 매핑 문서를 포함합니다. 제품정보[Tuya T5 dev 키트](https://tuyaopen.ai/t5-tuyaopen), 마이크 및 스피커는 이미 내장되어 있습니다 - 배선이 필요하지 않습니다.

### 4 단계 : 빌드 및 플래시
```bash
tos.py build
tos.py flash
```

TuyaOpen 빌드 시스템은 크로스 컴파일, 신뢰성, 펌웨어 포장을 자동으로 처리합니다. ESP32 표적을 위해, 그것은 TuyaOpen의 TKL 접합기를 통해 두건의 밑에 ESP-IDF 공구 사슬을 지시합니다; T5를 위해, 그것은 Tuya 특정한 컴파일러를 사용합니다. 응용 코드는 동일하게 유지 — 이것은 TuyaOpen의 크로스 플랫폼 약속입니다[계층화된 SDK](https://tuyaopen.ai/docs/about-tuyaopen)연습.

### 5 단계 : 음성 보조를 테스트
장치 부팅을 볼 수있는 시리얼 모니터를 엽니 다 :

```bash
tos.py monitor
```

Wi-Fi에 연결되면 깨진 단어를 말하거나 버튼을 눌러 청취를 활성화하십시오. 질문 - 장치는 당신의 연설을 캡처하고 ASR 및 LLM 처리를위한 클라우드로 보내며 스피커를 통해 말한 응답을 다시합니다.

## Beyond Basic Q&A: AI 에이전트 역량 추가
음성 조수는 행동을 취할 수있을 때 더 강력하게, 그냥 질문에 대답하지. 카테고리[AI 에이전트 프레임](https://tuyaopen.ai/docs/cloud/tuya-cloud/ai-agent/ai-agent-dev-platform)LLM을 호출하여 도구를 호출합니다. - 물리적 세계와 상호 작용하는 기능. 이것은 더 넓은 산업 이동으로 정렬 ** 시약 AI ** - 이유, 계획 및 행동 -[McKinsey 식별](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai)적용된 인공 지능에서 가장 중요한 개발 중 하나.

**스마트 홈 음성 허브** 시나리오:

- " 거실 조명을 끄십시오." · LLM은 의도를 인식하고 조명 제어 도구를 호출합니다.
- "침실의 온도는 무엇입니까?" → 에이전트는 센서 데이터를 읽고 동사적으로 응답합니다.
- "7 AM 알람을 설정하고 커피 머신을 켜십시오." → 에이전트 체인 두 개의 도구 호출 및 두 작업을 확인합니다.

이것은 ** 시약 AI ** 패러다임 교대에서 진정한 유용한 장치로 이동합니다. TuyaOpen SDK는 일반적인 IoT 운영 (장치 제어, 현장 활성화, 센서 읽기)에 대한 사전 제작 도구 정의를 제공하며 특정 응용 프로그램에 대한 사용자 정의 도구를 정의 할 수 있습니다. 더 보기[DuckyClaw 프로젝트](https://tuyaopen.ai/docs/cloud/tuya-cloud/ai-agent/ai-agent-dev-platform)Microcontrollers의 AI 에이전트의 네이티브 C SDK 구현을 보여줍니다. 에이전트 AI를 물리적 장치에 배포하기위한 가장 이른 생산 등급 프레임 워크 중 하나입니다.

> **AI 에이전트와 함께 더. ** 더 보기[TuyaOpen AI 에이전트 문서](https://tuyaopen.ai/docs/cloud/tuya-cloud/ai-agent/ai-agent-dev-platform)사용자 정의 도구, 체인 멀티 스텝 작업을 정의하는 방법을 보여 주며, 자율 장치 제어를 배포합니다. - 모든 목소리 조수.

개발자 건물[Arduino 코드를 위한 오픈 소스 AI](https://tuyaopen.ai/docs/hardware/tuya-t5/develop-with-Arduino/Quick_start), 같은 에이전트 아키텍처는 Arduino 호환 API 레이어를 통해 사용할 수 있으며, C SDK의 생산 등급 신뢰성을 유지하면서 대규모 Arduino 커뮤니티에 액세스 할 수 있습니다.

## 일반적인 도전과 TuyaOpen 해결 Them
**voice-controlled IoT Device**는 프레임워크 수준에서 TuyaOpen 주소가 몇 가지 엔지니어링 과제를 포함합니다.

### 오디오 품질 및 소음
실제 환경에서의 원시 마이크 입력은 noisy입니다. TuyaOpen의 오디오 파이프 라인에는 3A 처리 (AEC - 음향 에코 취소, AGC - 자동 이득 제어 및 NS - 노이즈 억제)가 포함되어 스피커가 동시에 오디오를 재생할 때도 깨끗한 연설 캡처를 보장합니다. 이것은 자신의 스피커가 능동적 인 동안 웨이브 단어를 듣는 데 필요한 손없는 음성 조수에 필수적입니다. 오디오 프런트 엔드 처리의 중요성은 잘 문서화되었습니다. — 보기[IEEE 신호 처리 학회 연구](https://signalprocessingsociety.org/)역방향 상태의 강력한 음성 인식.

### 연락처
사용자는 1 ~ 2 초 이내에 음성 보조 응답을 기대합니다. 이름 *[Nielsen Norman Group의 유용성 연구](https://www.nngroup.com/articles/response-times-3-important-limits/), 1 초 초과 지연은 사용자가 흐름의 감각을 잃게됩니다. TuyaOpen는 스트리밍을 통해 대기시간을 최소화합니다. ASR (음성 오디오 펑크를 보면서 전체 utterance를 기다리고 있습니다), 최적화된 Wi-Fi 처리량 (특히 Tuya T5에서 Wi-Fi 6과), 효율적인 오디오 버퍼링.

### 다국어 지원
Tuya Cloud의 ASR 및 TTS 서비스는 상자에서 여러 언어를 지원합니다. GPT-4 및 Qwen과 같은 다국어 LLM과 결합 된 음성 조수는 코드 변경없이 영어, 중국어, 스페인어 및 기타 언어로 이해하고 응답 할 수 있습니다. 구성 업데이트. 글로벌 AI 접근성에 대한 트렌드와 일치[AI 윤리에 대한 유네스코의 추천](https://www.unesco.org/en/artificial-intelligence/recommendation-ethics).

### OTA 업데이트 및 장치 관리
배포되면 현장의 음성 조수는 펌웨어 업데이트가 필요합니다. TuyaOpen과 통합[Tuya 클라우드](https://tuyaopen.ai/)안전한 OTA (Over-The-Air) 업데이트를 위해, 원격 진단 및 장치 함대 관리. 책상과 수천 개의 가정에서 작동하는 제품에서 작동하는 프로토 타입의 차이입니다.[Gartner 연구](https://www.gartner.com/en/internet-of-things/iot-platforms)IoT 상용화의 기본 장벽으로 식별합니다.

> ** 프로토 타입에서 생산.** TuyaOpen의 클라우드 통합은 장치 활성화, 원격 제어, OTA 및 상자에서 데이터 포인트를 제공합니다. - 사용자 정의 클라우드 스택이 필요하지 않습니다.[Tuya Cloud로 건물을 시작](https://tuyaopen.ai/).

## 케이스를 사용: 당신은 무엇을 건설할 수 있습니까?
여기에 설명 된 음성 보조 아키텍처는 다양한 제품에 대한 기초입니다. 더 보기[글로벌 음성인식 시장](https://www.grandviewresearch.com/industry-analysis/voice-recognition-market)스마트 홈, 자동차, 의료, 산업 분야에서 손없는 인터페이스에 대한 수요로 구동되는 2030 억 달러를 초과하는 것으로 예상됩니다.

|사용 사례|이름 *|키 TuyaOpen 기능|
|----------|-------------|---------------------|
|스마트 홈 음성 허브|빛, 가전, 그리고 목소리로|AI 에이전트 도구 + Tuya Cloud|
|AI 동반자 gadget|개인 정보 보호 정책|LLM 통합 + TTS|
|Accessibility 장치|제한된 이동성을 가진 사용자를 위한 Voice-controlled 공용영역|ASR + 맞춤 도구 작업|
|산업 음성 logger|기록 및 transcribe 유지 관리 노트 손없는|VAD + 클라우드 스토리지|
|다국어 번역기|여행 또는 교육을위한 실시간 연설 번역|다 언어 ASR + LLM|
|AI 스마트 안경|영상 Q&A를 위한 사진기를 가진 착용할 수 있는 음성 조수|T5 카메라 + 오디오 파이프|

더 보기[Tuya T5 칩](https://tuyaopen.ai/t5-tuyaopen)특히 마지막 사용 사례에 적합 - 통합 1080p 카메라 인터페이스, 오디오 처리 및 Wi-Fi 6 연결은 단일 컴팩트 장치에서 음성 및 비전을 결합하는 멀티 모달 AI 응용 프로그램을 가능하게합니다. 팀 탐험 가장자리 AI를 위해 더 넓게,[Arm의 Edge AI 생태계](https://developer.arm.com/solutions/edge-computing)TuyaOpen의 소프트웨어 스택과 잘 결합된 참조 디자인을 제공합니다.

> ** 전체 하드웨어 비교를 참조하십시오. ** 어떤 보드가 사용 케이스에 적합합니까? 지원하다[프로젝트에 적합한 AI 개발 보드를 선택하는 방법](https://tuyaopen.ai/faq/how-to-choose-the-right-ai-development-board-for-your-project)상세한 평가 기구를 위해.

## 다음 단계
이제 TuyaOpen과 **AI 음성 조수 **를 구축하기위한 완벽한 로드맵이 있습니다. Tuya T5 또는[실행 TuyaOpen 에 ESP32](https://tuyaopen.ai/docs/hardware/espressif/overview-esp32). 당신의 여행을 계속하는 중요한 자원:

- **[TuyaOpen 빠른 시작](https://tuyaopen.ai/docs/quick-start/enviroment-setup)** — 개발 환경 설정
- **[카테고리](https://tuyaopen.ai/tuyaopen-ide)** — 펌웨어, 클라우드 및 앱 개발을위한 AI 전원 코딩 도구
- **[Tuya T5 Dev 키트](https://tuyaopen.ai/t5-tuyaopen)** - 마이크, 스피커, 카메라 및 Wi-Fi 6 사전 통합
- **[ESP32 에 TuyaOpen](https://tuyaopen.ai/docs/hardware/espressif/overview-esp32)** - 기존 ESP32 하드웨어에서 TuyaOpen 실행
- **[AI 에이전트 문서](https://tuyaopen.ai/docs/cloud/tuya-cloud/ai-agent/ai-agent-dev-platform)** — 당신의 목소리 조수에 도구 호출 기능을 추가
- **[프로젝트](https://github.com/tuya/TuyaOpen)** — 소스 코드, 예제, 및 커뮤니티
- **[Discord 커뮤니티](https://discord.com/invite/yPPShSTttG)** - TuyaOpen에 위치한 1.3 백만 이상의 개발자와 연결

> **오늘 건물 시작.**[Tuya T5 dev 키트 주문](https://tuyaopen.ai/get-hardware)그리고 이번 주말을 실행하는 목소리 보조 프로토 타입이 있습니다 — 또는[clone Tuya GitHub에서 열기](https://github.com/tuya/TuyaOpen)이제 기존 ESP32 보드에서 실행하십시오.

오늘 빌드하는 음성 조수는 시작점입니다. TuyaOpen의 AI 에이전트 프레임 워크 성숙 및 다중 모델 모델이 더 가능하기 때문에 동일한 펌웨어 아키텍처는 더 정교한 상호 작용을 지원할 것입니다. 간단한 Q & A부터 자율 장치 제어, 컨텍스트 소싱 및 유능한 지원. 하드웨어가 준비되고, SDK는 오픈 소스이며, 생태계는 활성화됩니다. 유일한 것은 당신의 프로젝트입니다.
