---
title: 응용 프로그램 개발 - AI Chatbot
description: "Arduino-TuyaOpen의 AI chatbot에 대한 응용 개발 - 목소리, 텍스트 및 MCP 도구와 함께 TUYA-T5AI 보드에서 YourChatBot 샘플을 구축하십시오."
keywords:
  - ai chatbot
  - arduino
  - t5ai
  - yourchatbot
  - tuyaopen hardware
---

Arduino-TuyaOpen는 완전한 AI chatbot 응용 프로그램을 예 발송합니다. 사용 방법`YourChatBot`TUYA-T5AI 시리즈 발달 널을 가진 표본 부호, 당신은 음성 상호 작용, 원본 대화, MCP 공구 invocation 및 더 많은 것을 지원하는 똑똑한 chatbot를 건설합니다.

## Project 파일 구조
```
YourChatBot/
├── YourChatBot.ino       # Main program entry; includes setup/loop, AI event callback, IoT event callback
├── appButton.cpp/.h      # Button interaction module; handles single click, double click, long press, etc.
├── appDisplay.cpp/.h     # UI display module; supports built-in WeChat-style UI and custom LVGL UI
├── appMCP.cpp/.h         # MCP tool registration module; demonstrates photo capture, volume, mode switch, device info tools
├── appStatus.cpp/.h      # Status monitoring module; periodically updates WiFi signal and system heap memory info
└── appAudioRecord.cpp/.h # Audio recording module; supports saving MIC and TTS data to SD card
```

## 공급 업체
시작하기 전에 개발 환경 설정이 설명되었습니다.[빠른 시작](Quick_start.md).

1. 컴퓨터에 T5AI 개발 보드를 연결, Arduino IDE를 열고,`TUYA_T5AI`보드, 올바른 업로드 포트를 선택합니다.

    :::note
T5AI 시리즈 발달 널은 이중 직렬 포트 커뮤니케이션을 제공합니다. 컴퓨터에 연결될 때, 2개의 직렬 포트 수는 검출됩니다. UART0은 펌웨어 번쩍기를 위해 사용됩니다. Arduino IDE에서 올바른 업로드 포트를 선택하십시오.
    :::

2. Arduino IDE에서 클릭`File` -> `Examples` -> `AI components` -> `YourChatBot`예제 코드를 엽니다.

3. 인증 코드 및 제품 PID를 자신의 자격 증명을 가진 예 파일로 대체하십시오.

    - [인증 코드는 무엇입니까?](https://tuyaopen.ai/docs/quick-start#tuyaopen-authorization-code)
    - [인증 코드를 얻는 방법](https://tuyaopen.ai/docs/quick-start#obtaining-tuyaopen-authorization-code)

    ```cpp
    // Device authorization code (replace with your own)
    #define TUYA_DEVICE_UUID    "uuidxxxxxxxxxxxxxxxx"
    #define TUYA_DEVICE_AUTHKEY "keyxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    // Product PID (replace with the PID created on the Tuya IoT platform)
    #define TUYA_PRODUCT_ID     "xxxxxxxxxxxxxxxx"
    ```

4. (선택) 오디오 레코딩 기능을 활성화하기 위해 (MIC 및 TTS 오디오 데이터를 SD 카드에 저장), 설정`ENABLE_AUDIO_RECORDING`으로`1`:

    ```cpp
    #define ENABLE_AUDIO_RECORDING  1   // Default is 0 (off); set to 1 to enable audio recording
    ```

5. Arduino IDE의 왼쪽 상단 모서리에서 업로드 버튼을 클릭하여 코드를 플래시합니다. 터미널의 다음 메시지는 성공적인 플래시를 나타냅니다.

    ```bash
    [INFO]: Write flash success
    [INFO]: CRC check success
    [INFO]: Reboot done
    [INFO]: Flash write success.
    ```

## 장치 연결 및 상호 작용
### 장치 연결
펌웨어를 깜박임 후, 개발 보드는 네트워크에 연결하고 원격 통신을 활성화하기 위해 클라우드로 등록합니다. 일단 제공되면, 3방향 통신`Phone`, `Tuya Cloud`·`Device`설치

장치 제공 가이드의 경우, 참조[Device Network 구성](https://tuyaopen.ai/docs/quick-start/device-network-configuration).

:::tip 빠른 재제작
Quick Succession에서 리셋 버튼을 3번 누르면 저장된 네트워크 구성을 제거하고 프로비저닝 상태를 다시 입력합니다.
:::

### 장치 상호 작용
전화 앱을 통해 성공한 후 다음 두 가지 방법으로 AI Agent와 상호 작용할 수 있습니다.

#### 텍스트 상호 작용
Arduino IDE 내장 직렬 모니터 (보통 속도 115200), 입력 상자에 입력 텍스트를 열고 Enter를 눌러 보내주세요. 직렬 포트에 AI 에이전트와 텍스트 대화를 할 수 있습니다. 예제 코드는 직렬 포트에서 클라우드 기반 대형 언어 모델로 받은 텍스트를 보냅니다.`TuyaAI.sendText()`, 그리고 AI의 응답은 직렬 감시자와 스크린 둘 다에 표시됩니다.

#### 음성 상호 작용
Voice Interactive는 기본 설정과 함께 4개의 대화 모드를 지원합니다.`Wakeup`모드. 버튼의 더블 클릭으로 모드를 통해 사이클**.

**Wake word**: H (Hey Tuya)

|모드 ID|형태 이름|이름 *|
| :---: | :---: | --- |
| 0 |홀 (HOLD)|음성 입력을 시작하려면 버튼을 누르고 유지하십시오. 버튼 끝 음성 입력|
| 1 |1열 (ONE SHOT)|장치는 힘 위로에 대기를 입력합니다; 짧은 압박은 단 하나 음성 대화를 위한 듣는 국가로 장치를 끼워넣습니다|
| 2 |웨이크업 (WAKEUP)|Wake the device with the Wake word, 그 후 하나의 대화를 수행 — 스마트 스피커 상호 작용과 유사|
| 3 |무료 (FREE)|깨진 단어로 장치를 waking 한 후 연속 대화가 활성화됩니다. 대화가 깨진 후 30 초 이내에 발생하면 장치가 대기로 돌아갑니다.|

## 신청 예 walkthrough
전체 기능 데모로 더 많은 간결을 시작할 수 있습니다.[AI 예제](AI_API_Development.md)AI 개발 워크플로우에 익숙한 것.

### AI 개발
#### AI 모듈의 초기화
```cpp
// 1. Configure and initialize AI core
AIConfig_t aiConfig = {AI_CHAT_MODE_WAKEUP, 70, aiEventCallback, aiStateCallback, NULL};
TuyaAI.begin(aiConfig);

// 2. Initialize audio subsystem
TuyaAI.Audio.begin();

// 3. Initialize UI subsystem
appDisplayInit(UI_TYPE);
```

** 모수 묘사: **

|제품 설명|이름 *|
| --- | --- |
| `AI_CHAT_MODE_WAKEUP` |초기 대화 모드, 옵션:`AI_CHAT_MODE_HOLD`(0) / `AI_CHAT_MODE_ONE_SHOT`(1) / `AI_CHAT_MODE_WAKEUP`(2) / `AI_CHAT_MODE_FREE`(3) |
| `70` |초기 볼륨 (범위 0-100)|
| `aiEventCallback` |AI 이벤트 콜백 기능 ASR, TTS, 텍스트 스트림 등 모든 AI 이벤트 데이터를 수신|
| `aiStateCallback` |장치 상태 변경 알림 받기를 위한 AI 국가 콜백 기능|
| `NULL` |사용자 정의 데이터 포인터, 일반적으로 설정`NULL` |

`TuyaAI.Audio.begin()`장치의 오디오 시스템을 초기화하여 마이크, 스피커 및 오디오 코덱을 가능하게 합니다.

UI 초기화는`UI_TYPE`로그인`appDisplay.h`:

```c
#define UI_TYPE             BOT_UI_WECHAT   // Modify in appDisplay.h
```

- `BOT_UI_WECHAT`: 내장 WeChat-style UI, 상자에서 사용할 준비가되었습니다.
- `BOT_UI_USER`: LVGL을 초기화; LVGL API를 통해 UI를 직접 디자인합니다.

#### AI 이벤트 콜백
```cpp
static void aiEventCallback(AI_USER_EVT_TYPE_E event, uint8_t *data, uint32_t len, void *arg);
```

AI 작업 중, 이벤트 및 데이터의 풍부한 세트가 생성됩니다. 모든 AI 사건은 파견되고 획일하게 취급됩니다`aiEventCallback`. 주요 행사 유형은 다음과 같습니다.

|(주)|이름 *|Callback 데이터|
| --- | --- | --- |
| `AI_USER_EVT_ASR_OK` |ASR 음성 인식 성공|본문내용 바로가기|
| `AI_USER_EVT_ASR_EMPTY` |ASR 결과가 비어 있습니다 (사용자가 말하지 않았다)|이름 *|
| `AI_USER_EVT_ASR_ERROR` |ASR 인식 실패|이름 *|
| `AI_USER_EVT_MIC_DATA` |마이크 원시 PCM 오디오 데이터|PCM 오디오 바이트 스트림|
| `AI_USER_EVT_TTS_PRE` |TTS는 놀기 시작에 관하여 입니다|이름 *|
| `AI_USER_EVT_TTS_START` |TTS 시작|이름 *|
| `AI_USER_EVT_TTS_DATA` |TTS 오디오 데이터 펑크 (MP3 형식)|MP3 오디오 바이트 스트림|
| `AI_USER_EVT_TTS_STOP` |TTS 재생 완료 일반적으로|이름 *|
| `AI_USER_EVT_TTS_ABORT` |TTS가 중단되었습니다.|이름 *|
| `AI_USER_EVT_TEXT_STREAM_START` |LLM 텍스트 응답 스트림 시작|텍스트 데이터의 첫 번째 세그먼트|
| `AI_USER_EVT_TEXT_STREAM_DATA` |LLM 텍스트 응답 스트림 데이터|텍스트 데이터 chunk|
| `AI_USER_EVT_TEXT_STREAM_STOP` |LLM 텍스트 응답 스트림 끝|이름 *|
| `AI_USER_EVT_SKILL` |Skill data (예를 들어, 음악 재생)|cJSON* 기술 자료|
| `AI_USER_EVT_EMOTION` |Emotion는 텍스트 태그에서 패| `AI_AGENT_EMO_T*`감정 struct|
| `AI_USER_EVT_LLM_EMOTION` |LLM의 사용자 감정| `AI_AGENT_EMO_T*`감정 struct|
| `AI_USER_EVT_SERVER_VAD` |Server-side 음성 활동 탐지 종료|이름 *|
| `AI_USER_EVT_MODE_SWITCH` |대화 모드 전환|새로운 모드 번호 (int)|
| `AI_USER_EVT_CHAT_BREAK` |대화가 중단되었습니다.|이름 *|

#### AI 상태 콜백
```cpp
static void aiStateCallback(AI_MODE_STATE_E state);
```

AI 장치가 작동 중에 상태를 전환합니다.`aiStateCallback`상태 변경 알림을 수신하므로 UI를 업데이트하거나 비즈니스 로직을 실행할 수 있습니다. 국가 목록은 다음과 같습니다 :

|(주)|이름 *|
| --- | --- |
| `AI_MODE_STATE_IDLE` |Idle 상태|
| `AI_MODE_STATE_INIT` |초기화|
| `AI_MODE_STATE_LISTEN` |듣기 (듣기)|
| `AI_MODE_STATE_UPLOAD` |업로드 (랜스 데이터 업로드)|
| `AI_MODE_STATE_THINK` |Thinking (LLM 응답을 위해 와이팅)|
| `AI_MODE_STATE_SPEAK` |말하기 (TTS는 재생)|

### IoT 개발
#### IoT 초기화
```cpp
// Press the reset button 3 times in quick succession to trigger device re-provisioning
TuyaIoT.resetNetcfg();
// Set IoT event callback function
TuyaIoT.setEventCallback(tuyaIoTEventCallback);
// Set device authorization code
TuyaIoT.setLicense(TUYA_DEVICE_UUID, TUYA_DEVICE_AUTHKEY);
// Start IoT service with product PID and firmware version
TuyaIoT.begin(TUYA_PRODUCT_ID, PROJECT_VERSION);
```

`TuyaIoT.resetNetcfg()`빠른 리셋 버튼 리프로비저닝 기능을 제공합니다. Quick Succession에서 리셋 버튼을 3 번 누르면 저장된 네트워크 구성을 명확하게하고 프로비저닝 상태를 다시 입력합니다.

#### IoT 이벤트 처리
```cpp
static void tuyaIoTEventCallback(tuya_event_msg_t *event);
```

모든 IoT 플랫폼 이벤트는 획일하게 처리됩니다.`tuyaIoTEventCallback`. 주요 사건은 다음을 포함합니다:

|(주)|이름 *|
| --- | --- |
| `TUYA_EVENT_BIND_START` |장치 시작 네트워크 제공; 제공 신속한 톤|
| `TUYA_EVENT_MQTT_CONNECTED` |MQTT 연결 성공; 이 시점에서 MCP 도구 및 보고서 장치 상태를 초기화 할 수 있습니다.|
| `TUYA_EVENT_MQTT_DISCONNECT` |MQTT 연결 손실|
| `TUYA_EVENT_TIMESTAMP_SYNC` |Cloud Time 동기화|
| `TUYA_EVENT_RESET` |장치가 재설정되었습니다.|
| `TUYA_EVENT_UPGRADE_NOTIFY` |OTA 업그레이드 알림 수신|
| `TUYA_EVENT_DP_RECEIVE_OBJ` |Object-type DP data 수신(예, 볼륨 컨트롤)|
| `TUYA_EVENT_DP_RECEIVE_RAW` |주어진 원료 유형 DP 자료|

#### DP 데이터 상호 작용
이 예제는 DP (Data Point)를 통해 클라우드 기반 볼륨 제어를 구현합니다.

```cpp
#define DPID_VOLUME  3  // Volume DP ID

// Handle volume setting in DP receive callback
case DPID_VOLUME:
    uint8_t volume = dp->value.dp_value;
    TuyaAI.setVolume(volume);
    break;
```

Tuya Cloud를 IoT 개발을 통해 제어할 수 있습니다.`powered by Tuya`장치. 더 많은 DP 작업을 위해,`00_IoT_SimpleExample`예.

### 오디오 개발
모든 오디오 관련 데이터는 얻고 있습니다.`aiEventCallback`callback, 구분`AI_USER_EVT_TYPE_E`이벤트 유형:

|(주)|데이터 형식|이름 *|
| --- | --- | --- |
| `AI_USER_EVT_ASR_OK` |UTF-8 텍스트|Cloud ASR 음성 인식 결과|
| `AI_USER_EVT_MIC_DATA` |PCM (16kHz, 16비트, 모노)|Raw 마이크 레코딩 데이터|
| `AI_USER_EVT_TTS_DATA` |MP3 데이터 펑크|LLM의 TTS 오디오 데이터 스트림|
| `AI_USER_EVT_TTS_PRE/START/STOP` |이름 *|TTS 재생 수명주기 이벤트|
| `AI_USER_EVT_TEXT_STREAM_START/DATA/STOP` |UTF-8 텍스트|LLM의 텍스트 데이터 스트림|
| `AI_USER_EVT_SERVER_VAD` |이름 *|Server-side 음성 활동 탐지 (사용자가 말하는 중지 때 탐지)|

#### SD 카드에 오디오 녹음
더 보기`appAudioRecord.cpp/.h`파일은 MIC 및 TTS 오디오 데이터를 SD 카드에 저장합니다. 설정하기`ENABLE_AUDIO_RECORDING`매크로로`1`사용하기 전에.

- ** MIC 레코딩 **: 저장`.pcm`SD 카드 쓰기 주파수를 줄이기 위해 in-memory 버퍼 (기본 16KB)와 형식. 녹화가 자동으로 시작될 때`AI_MODE_STATE_LISTEN`청취 국가를 떠날 때의 중지.
- **TTS 레코딩 **: 저장`.mp3`형식; 시작`AI_USER_EVT_TTS_START`그리고 끝에서`AI_USER_EVT_TTS_STOP`또는`AI_USER_EVT_TTS_ABORT`.
- 기록 파일은 저장됩니다`/ai_recordings`SD 카드에 디렉토리, 자동 증가 순차적 naming (예를 들어,`mic_001.pcm`, `tts_001.mp3`).

### 버튼 상호 작용
더 보기`appButton.cpp/.h`파일 사용`Button`통합 버튼 기능을 제공하는 구성 요소. 기본적으로, 그것은 GPIO 12를 사용, 낮은 수준에 트리거, 내부 풀 업.

다음 버튼 이벤트가 지원됩니다:

|(주)|채용 정보|
| --- | --- |
|단일 클릭 (`BUTTON_EVENT_SINGLE_CLICK`) |자주 묻는 질문`TuyaAI.modeKeyHandle()`— 현재 모드에 대한 대화 작업을 트리거|
|더블 클릭 (`BUTTON_EVENT_DOUBLE_CLICK`) |오디오 재생 중지 → 현재 대화 중지 → 다음 대화 모드로 전환 → 모드 프롬프트 톤|
|긴 압박 (Long Press)`BUTTON_EVENT_LONG_PRESS_START`) |자주 묻는 질문`TuyaAI.modeKeyHandle()`(잠금 모드에서 기록)|
|보도자료|자주 묻는 질문`TuyaAI.modeKeyHandle()`관련 제품|

두 배 누르기 형태 엇바꾸기를 위한 핵심 논리:

```cpp
if (event == BUTTON_EVENT_DOUBLE_CLICK) {
    TuyaAI.Audio.stop();           // Stop current audio playback
    TuyaAI.interruptChat();        // Interrupt current conversation
    AI_CHAT_MODE_E nextMode = TuyaAI.nextChatMode();  // Get next mode
    TuyaAI.saveModeConfig(nextMode, volume);           // Save mode configuration
    // Play the prompt tone for the corresponding mode
}
```

:::note
더 많은 사용법`Button`구성 요소는 아래 예제를 참조하십시오.`Peripheral/Button`이름 *
:::

### UI 개발
더 보기`appDisplay.cpp/.h`파일은 장치의 UI 기능의 통합 캡슐화를 제공합니다. UI 방식의 전환`UI_TYPE`로그인`appDisplay.h`.

#### 프로젝트
내장 된 WeChat 스타일 UI 페이지, 상자에서 사용할 준비가되었습니다. 글꼴을 얻을 수 있습니다 (`getTextFont`), 아이콘 (`getIconFont` / `getWifiIcon`), 이모티콘 및 기타 UI 리소스를 통해`TuyaAI.UI`클래스 인터페이스 및 내장 UI 구성 요소의 디스플레이 콘텐츠를 제어합니다.

#### 비밀번호
이 매개 변수는 LVGL 그래픽 엔진 만 시작하면 UI를 완전히 디자인 할 수 있습니다. 더 보기`_createUI()`기능에`appDisplay.cpp`다음과 같은 레이아웃을 가진 최소 어두운 테마 UI 참조 구현을 제공합니다:

```
┌──────────────────────────┐
│ [Chat Mode]      [WiFi]  │ ← Top status bar (30px)
├──────────────────────────┤
│       [Device Status]    │ ← Status indicator area (36px)
├──────────────────────────┤
│ ┌────────────────────┐   │
│ │ User message...    │◀──│ ← User bubble (right-aligned, green)
│ └────────────────────┘   │
│   ┌────────────────────┐ │
│ ──▶ AI response...    │ │ ← AI bubble (left-aligned, gray)
│   └────────────────────┘ │
└──────────────────────────┘
```

예를 들어 콜백에서 편리한 UI 업데이트에 대한 다음 디스플레이 인터페이스를 캡슐화합니다.

|지원하다|이름 *|
| --- | --- |
| `appDisplaySetUserText()` |본문 바로가기|
| `appDisplaySetAIText()` |표시 AI 응답 텍스트|
| `appDisplayStreamStart/Append/End()` |Stream-display AI 응답|
| `appDisplaySetStatus()` |업데이트 장치 상태 텍스트|
| `appDisplaySetMode()` |업데이트 대화 모드 표시|
| `appDisplaySetWifi()` |업데이트 WiFi 상태 아이콘|

#### Display 부품
직접 TUYA-T5AI-BOARD 개발 보드에 화면을 구동하는이 구성 요소를 사용합니다. 구성 요소는 기본 화면 렌더링 기능 및 ** 카메라 데이터 직접 디스플레이 ** 기능을 제공합니다.

:::note
디스플레이 구성 요소의 더 많은 사용은 아래 예제를 참조하십시오.`Display`이름 *`Camera`감독.
:::

### AI 고급 기능
#### 사이트맵
[MCP는 무엇입니까?](https://tuyaopen.ai/docs/cloud/tuya-cloud/ai-agent/mcp-management): MCP(Model Context Protocol)는 AI Agent invoke Device-side 로컬 툴을 제공하는 범용 프로토콜 인터페이스입니다.

더 보기`appMCP.cpp/.h`File register 로컬 MCP 도구 AI Agent invocation.

:::note
MCP 공구는 MQTT 연결이 설치된 후에 등록되어야 합니다. 예를 들어 구독`EVENT_MQTT_CONNECTED`등록 타이밍을 보장하기 위해 이벤트.
:::

**2 등록 방법:**

1. ** 간단한 등록** (parameterless tool): 사용`TUYA_MCP_TOOL_ADD_SIMPLE`매크로.

    ```cpp
    // Register a parameterless tool
    TUYA_MCP_TOOL_ADD_SIMPLE(
        "device_info_get",          // Tool name
        "Get device information.",  // Tool description (for AI to understand purpose)
        onGetDeviceInfo,            // Callback function
        nullptr                     // User data
    );
    ```

2. ** 매개변수로 등록 **: 사용`TUYA_MCP_TOOL_REGISTER`매크로와 속성 정의.

    ```cpp
    // Define tool parameters
    TuyaMCPPropDef volumeProps[] = {
        TuyaMCPPropIntRange("volume", "The volume level (0-100).", 0, 100)
    };
    // Register tool with parameters
    TUYA_MCP_TOOL_REGISTER(
        "device_audio_volume_set",  // Tool name
        "Sets the device volume.",  // Tool description
        onSetVolume,                // Callback function
        nullptr,                    // User data
        volumeProps, 1              // Parameter definitions and count
    );
    ```

** 매개 변수 유형 매크로:**

|제품정보|이름 *|
| --- | --- |
| `TuyaMCPPropStr(name, desc)` |String type 매개 변수|
| `TuyaMCPPropIntRange(name, desc, min, max)` |Integer 유형 모수 (범위 constraint에)|
| `TuyaMCPPropIntDefRange(name, desc, def, min, max)` |Integer 유형 매개변수 (기본값과 범위)|

** 콜백 기능의 일반적인 방법 : **

|제품 설명|이름 *|
| --- | --- |
| `TuyaAI.MCP.getPropertyInt(props, name, def)` |integer 매개 변수 값|
| `TuyaAI.MCP.setReturnBool(retVal, value)` |boolean 값 반환|
| `TuyaAI.MCP.setReturnJson(retVal, json)` |JSON 객체를 반환|
| `TuyaAI.MCP.setReturnImage(retVal, mime, data, len)` |이미지 데이터를 반환 (예를 들면, 사진 캡처 결과)|

이 예제는 4개의 MCP 도구를 제공합니다:

|공구 이름|Trigger 명령|제품정보|
| --- | --- | --- |
| `device_info_get` |"장치 정보 받기"|장치 모델, 일련 번호, 펌웨어 버전 및 기타 JSON 정보를 반환|
| `device_camera_take_photo` |"사진"|카메라로 사진을 캡처하고 콘텐츠 인식을위한 AI에 JPEG 이미지를 반환|
| `device_audio_volume_set` |"50에 볼륨 설정"|장치 볼륨 설정 (0–100)|
| `device_audio_mode_set` |"무료 대화 모드로 전환"|전환 대화 모드 (0=Hold, 1=One-Shot, 2=Wakeup, 3=Free)|

#### (주)
기술 자료는 에서 파`AI_USER_EVT_SKILL`행사일정`aiEventCallback`. 사용`TuyaAI.Skill.parse()`파싱 방법, 여러 기술 유형을 지원:

```cpp
case AI_USER_EVT_SKILL:
    SkillData_t skill;
    if (OPRT_OK == TuyaAI.Skill.parse(data, skill)) {
        switch (skill.type) {
            case SKILL_TYPE_MUSIC:          // Music playback
            case SKILL_TYPE_STORY:          // Story playback
                // Get music/story URL, name, and other information
                // skill.music->src_array[0].url
                TuyaAI.Skill.dumpMusic(skill);   // Print debug info
                TuyaAI.Skill.freeMusic(skill);   // Release resources (must be called)
                break;
            case SKILL_TYPE_PLAY_CONTROL:   // Playback control (previous/next/pause, etc.)
                // skill.playControl.action
                break;
            case SKILL_TYPE_EMOTION:        // Emotion skill
                break;
        }
    }
    break;
```

#### 팟캐스트
AI 채팅 중 감정 인식은 두 소스에서 온다 :

- `AI_USER_EVT_EMOTION`: 텍스트 태그에서 감정.
- `AI_USER_EVT_LLM_EMOTION`: 큰 언어 모델에 의한 사용자 감정.

두 반환 데이터를 통해`AI_AGENT_EMO_T`**emotion name**를 포함하는 구조`name`)와 **응용 이모티콘 ** (`emoji`, 유니코드 인코딩). 제품 정보`TuyaAI.Skill.unicodeToUtf8()`emoji의 Unicode 인코딩을 UTF-8 문자열로 변환합니다.

```cpp
case AI_USER_EVT_LLM_EMOTION:
    AI_AGENT_EMO_T *emo = (AI_AGENT_EMO_T *)data;
    Serial.print("Emotion: "); Serial.println(emo->name);
    if (emo->emoji) {
        char utf8[8];
        TuyaAI.Skill.unicodeToUtf8(emo->emoji, utf8, sizeof(utf8));
        Serial.print("Emoji: "); Serial.println(utf8);
    }
    break;
```

### 상태 모니터링
더 보기`appStatus.cpp/.h`file periodically monitor device runtime status, including:

- **WiFi 신호 상태**: 1초마다 WiFi 연결 상태를 확인합니다. 상태 변경 시 화면의 WiFi 아이콘을 자동으로 업데이트합니다.
- **Heap Memory Monitoring**: 개발 디버깅을 위한 5초마다 무료 힙 메모리 크기를 출력합니다.
- ** 대화 모드 표시**: 실시간 화면의 현재 대화 모드 이름을 보여줍니다.

## 더 보기
- [AI API 개발](AI_API_Development.md)
- [주변관광](Peripheral_Development.md)
