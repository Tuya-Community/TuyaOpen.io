---
title: 챗봇
description: "Chatbot (your chat bot)은 음성 입력, 4 채팅 모드, 상태 톤, 여러 UI 테마 및 라이브 에이전트 역할 전환과 Tuya AI 데모입니다."
keywords:
  - chatbot demo
  - physical ai agent
  - device ai demo
  - tuyaopen
  - voice assistant
---

[your chat bot](https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/your_chat_bot)는 Tuya AI 오픈 소스 대형 언어 모델에 기반한 지능형 채팅봇입니다. 마이크를 사용하여 음성 입력을 캡처하고 음성 인식을 처리하고 대화형 상호 작용, 반응형 답글 및 유머러스 banter를 활성화합니다. 채팅 콘텐츠는 화면에서 실시간에 표시됩니다.

## 특징
- 4개의 형태를 가진 Tuya 음성 대리인을 지원합니다:

- **Hold-to-talk 모드**: 사용자는 음성 입력을 시작하려면 버튼을 누르고, 종료합니다.

- **Press-to-talk 모드**: 장치는 전원에 대기 모드를 입력합니다. 짧은 단추 압박은 음성 입력과 대리인과 상호 작용을 위한 듣는 국가에 그것을 전환합니다.

- **어떻게 모드**: 사용자는 스마트 스피커와 이야기와 같은 단일 상호 작용을위한 깨진 단어와 장치를 깨.

- ** 무료 대화 모드**: 깨진 단어를 가진 장치를 waking 후에, 사용자는 지속적인 대화에 참여할 수 있습니다. 30 초 이내에 음성이 감지되지 않은 경우 장치가 대기로 돌아와 다음 상호 작용을 위해 재난해야합니다.
- 버튼 작동을 통해 지속적인 채팅의 로컬 중단을 지원합니다.
- 페어링, 오프라인, 웨이크업 등 다양한 상태의 신속한 톤을 제공합니다.
- 각종 전시 및 다수 UI 테마와 호환이 되는:

- **WeChat-style 인터페이스 **

- **Chatbot 인터페이스 **

- **Scrolling 자막 ** (소형 OLED 화면에 적합)

- 앱에서 장치 볼륨 조정을 허용한다.
- 전원으로 페어링 모드를 입력하여 3번 연속 장치를 순환합니다.
- 앱에서 AI 에이전트 역할의 실시간 전환 지원

## 하드웨어 지원
|회사연혁|구성 파일|UI를|PID를|
| ------------------------------------------------------------ | ----------------------------------------- | ---------- | ---------------- |
|T5AI BOARD 개발 보드 + 3.5 인치 RGB565 LCD 평방 화면 (터치 스크린, LCD 모델 : ILI9488, 터치 패널 : GT115)|TUYA T5AI BOARD LCD 3.5.config 설정|WeChat 스타일 인터페이스|아론7qgyjj8yus74|
|DNESP32S3 개발 보드 (320 × 240 SPI ST7789 LCD 광장 스크린 내장)|DNESP32S3.config 설정|WeChat 스타일 인터페이스|scig7pauzzid3w4b의|
|Waveshare ESP32S3 개발 보드 ( 내장 364 × 448 SPI sh8601 LCD 평방 화면)|WAVESHARE ESP32S3 TOUCH AMOLED 1 8.config 설정|WeChat 스타일 인터페이스|라즈드5audtah8wcp|
|T5AI EVB 개발 보드 (모든 흰색 상자 내장 2.4 인치 SPI565 ST7789 평방 화면)|TUYA T5AI EVB.config 설정|Chatbot 인터페이스|r3ulobrs5nwreguj의|
|T5AI MOJI 1 28 개발 보드 ( 내장 1.28 인치 SPI565 GC9a01 둥근 스크린)|T5AI MOJI 1.28.config 설정|Chatbot 인터페이스|인기 카테고리|
|T5AI MINI 발달 널 + 1.3 인치 SPI565 ST7789 LCD 정연한 스크린|TUYA T5AI MINI LCD 1.3.config 설정|Chatbot 인터페이스|8btswykdiium7t8k의|
|DNESP32S3 BOX 개발 보드 (320 × 240 MCU8080 ST7789 LCD 광장 스크린 내장)|DNESP32S3 BOX.config 설정|Chatbot 인터페이스|znw8prbujidtzavd의|
|ESP32S3 밀가루 반죽대 (128 × 32 I2C SSD1306 OLED 스크린 내장)|ESP32S3 BREAD COMPACT WIFI.config를 설치|관련 상품|j1y437proohznfbs, 영국|
|XINGXZHI ESP32S3 CUBE 개발 보드 (128 × 64 I2C SSD1306 OLED 화면 내장)|XINGZHI ESP32S3 CUBE 0 96OLED WIFI.config 설정|관련 상품|uyidyzglm2m1bpcl을|


## 파일 구조
## 프로젝트 루트 디렉토리
```shell
.
├── app_default.config    # Default application configuration file
├── assets                # Static resources
├── CMakeLists.txt        # CMake build script
├── config                # Hardware configuration
├── include               # Header files
├── Kconfig               # Project configuration file
├── README_zh.md          # Documentation in Chinese
├── README.md             # Documentation in English
├── script                # Scripts
└── src                   # Source code
```

### 자원
```shell
├── assets                 # Static resources
│   ├── lang_config.h      # Multilingual configuration header file
│   └── zh-CN              # Chinese language pack
│       └── language.json  # Chinese text resources
```

## 하드웨어 구성
`config` 디렉토리의 파일은 다양한 개발 보드에 적합한 구성 파일입니다. 이 프로젝트에 따라 새로운 보드에 대한 적응을 완료하면 해당 구성 파일을이 디렉토리에 추가 할 수 있습니다.

```shell
├── config                 # Hardware configuration
│   ├── DNESP32S3_BOX.config
│   ├── DNESP32S3.config
│   ├── ESP32S3_BREAD_COMPACT_WIFI.config
│   ├── T5AI_MOJI_1.28.config
│   ├── TUYA_T5AI_BOARD_EYES.config
│   ├── TUYA_T5AI_BOARD_LCD_3.5.config
│   ├── TUYA_T5AI_EVB.config
│   ├── TUYA_T5AI_MINI_LCD_1.3.config
│   ├── WAVESHARE_ESP32S3_TOUCH_AMOLED_1_8.config
│   └── XINGZHI_ESP32S3_CUBE_0_96OLED_WIFI.config
```

### 보조 도구 및 스크립트
```shell
├── script                      # Script
│   └── gen_lang.py             # Script for generating multilingual resources
```

### 헤더 파일
```shell
├── include
│   ├── app_chat_bot.h       # Chatbot functionality
│   ├── app_display.h        # Display module
│   ├── app_system_info.h    # System information (such as network status and memory)
│   ├── reset_netcfg.h       # Power cycle reset functionality
│   └── tuya_config.h        # Device license configuration and related information
```

### 소스 코드
```shell
└── src
    ├── app_chat_bot.c      # Chatbot functionality implementation
    ├── app_system_info.c   # System information
    ├── display             # Display module
    ├── reset_netcfg.c      # Power cycle reset functionality
    └── tuya_main.c         # Application entry
```

### 전시 단위
```shell
├── display                 # Display module
│   ├── app_display.c       # Main control file of the display module
│   ├── CMakeLists.txt      # CMake configuration of the display module
│   ├── font                # Font resources
│   ├── image               # Image resources
│   ├── Kconfig             # Display config options
│   ├── tuya_lvgl.c         # LVGL adaptation file for the application
│   ├── tuya_lvgl.h         # LVGL adaptation header file
│   └── ui                  # UI implementation
│       ├── ui_chatbot.c    # Chatbot interface
│       ├── ui_display.h    # Common header file of the UI module
│       ├── ui_oled.c       # OLED scrolling subtitle interface
│       └── ui_wechat.c     # WeChat-style chat interface
```



## 신청 윤곽
-**제품 ID(PID)**

   |제품정보|제품정보|이름 *|
   | ---------------- | ------ | ---------------------------------- |
   |TUYA PRODUCT 키|팟캐스트|Tuya AI 에이전트에 바인딩되는 제품 ID.|

- **채팅 모드 선택 **

   |제품정보|제품정보|이름 *|
   | -------------------------------------- | ---- | ------------ |
   |ENABLE CHAT MODE KEY PRESS HOLD SINGEL에 대하여|스낵 바|Hold-to-talk 모드|
   |ENABLE CHAT MODE KEY TRIG VAD FREE 한국어|스낵 바|Press-to-talk 모드|
   |ENABLE CHAT MODE ASR WAKEUP SINGEL에 대하여|스낵 바|Wake 단어 모드|
   |ENABLE CHAT MODE ASR WAKEUP FREE의 경우|스낵 바|무료 대화 모드|

- **모닝 단어 선택 **

이 구성은 채팅 모드가 ** 쓰기 단어 모드** 및 ** 무료 대화 모드**로 설정될 때만 사용할 수 있습니다.

   |제품정보|제품정보|이름 *|
   | ------------------------------------- | ---- | ------------------- |
   |ENABLE WAKEUP 키워드 NIHAO TUYA|스낵 바|웨이브 단어는 "Hey Tuya"입니다.|
   |ENABLE WAKEUP KEYWORD NIHAO XIAOZHI에 대하여|스낵 바|웨이브 단어는 "Hey Xiaozhi"입니다.|
   |ENABLE WAKEUP KEYWORD XIAOZHI TONGXUE|스낵 바|웨이브 단어는 "Xiaozhi Tongxue"입니다.|
   |ENABLE WAKEUP KEYWORD XIAOZHI GUANJIA|스낵 바|웨이브 단어는 "Xiaozhi Guanjia"입니다.|

## 과정
이 프로젝트는 애플리케이션 구성 요소에 따라 다릅니다 [ai audio](./ai-components/ai-audio-asr-impl.md). 이 구성 요소는 오디오 캡처, 오디오 재생, 클라우드 기반 AI 세션을 생성하는 기능을 구현합니다.

- **Hold-to-talk 모드**

![Hold-to-talk 모드 다이어그램](/img/applications/your_chat_bot/en/long_talk.svg)

-**Press-to-talk 모드**

![Press-to-talk 모드 다이어그램](/img/applications/your_chat_bot/en/button_talk.svg)

- **어떻게 모드**

![말 모드 다이어그램](/img/applications/your_chat_bot/en/wakeup_talk.svg)

- ** 무료 대화 모드**

![무료 대화 모드 다이어그램](/img/applications/your_chat_bot/en/free_talk.svg)

## 프로젝트 구축
1. prerequisite 환경을 설치하고 구성하십시오. 자세한 내용은 [Quick Start](../../quick-start/enviroment-setup.md)를 참조하십시오.

2. 애플리케이션 디렉토리에 TuyaOpen 루트 디렉토리에서 변경.

   ```shell
   cd apps/tuya.ai/your_chat_bot
   ```

3. 지정된 개발 보드 구성을 선택하십시오.

   ```shell
   tos.py config choice
   ```

4. 프로젝트 구축.

   ```
   tos.py build
   ```

## 새로운 개발 보드에 적응
### Peripheral 필요조건
TuyaOpen가 지원하는 주변기기 목록은 [Peripheral driver list](../../peripheral/support_peripheral_list.md)를 참조합니다. 새로운 개발 보드는 나열된 모든 ** 필요 ** 주변 드라이버를 포함해야합니다.

|회사 소개|Peripheral 성분|이름 *|견적 요청|
| ---- | ------- | ---- | ------- |
|오디오 드라이버|오디오 codecs|캡처 PCM 오디오 데이터 및 재생 MP3 오디오 (parameters : 16 비트 깊이, 16 KHz 샘플 속도, 모노).|이름 *|
|전시 운전사|제품정보|LCD 스크린/OLED 스크린|이름 *|
|표시 드라이버|주도하는|기기가 현재 청취 상태에 있는지 나타냅니다.|이름 *|
|버튼 드라이버|이름 *|Press-to-talk 모드에서는 현재 채팅을 중단하고 새로운 것을 시작합니다.|이름 *|

### 개발 보드에 적응
새로운 개발 보드에 추가하고 적응하는 방법에 대한 자세한 내용은 [새로운 보드 레벨 드라이버에 적응 (보드)] (../../hardware/porting/new-board.md).

:::가격
당신은 `board_register_hardware`를 통해 개발 보드에 주변 드라이버 하드웨어를 등록 할 수 있습니다. 이 인터페이스의 구현은 보드 레벨 폴더에 배치됩니다.

대상 개발 보드의 폴더 (`boards/target development environment/target development board`, 예를 들어, `boards/T5AI/TUYA_T5AI_BOARD`)에서 드라이버의 하드웨어 구성을 수정할 수 있습니다 (핀 또는 칩 유형 변경 등).
:::
