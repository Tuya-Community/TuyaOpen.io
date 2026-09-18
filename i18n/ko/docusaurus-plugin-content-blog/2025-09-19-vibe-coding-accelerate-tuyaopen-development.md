---
title: "AI 코딩으로 TuyaOpen 개발 가속하기"
authors: [tuya]
tags: ["AI", "TuyaOpen", "Development", "Tutorial"]
---

# AI 코딩으로 TuyaOpen 개발 가속하기

## 개요

AI 기술이 빠르게 발전하는 오늘날, 우리 주변의 평범한 물건도 새롭게 정의하고 지능을 부여할 수 있습니다. 오늘은 Tuya T5AI-Board 개발 보드를 사용해 **맞춤형 스마트 데스크톱 챗봇**을 만드는 흥미로운 방법을 살펴봅니다.

{/* truncate */}

강력한 TuyaOpen 프레임워크와 Tuya 지능형 Agent의 지원을 받으면 개발 경험이 전혀 없는 초보자도 AI Coding 도구로 "제로 코드" 개발을 쉽게 실현할 수 있습니다. 대화의 감정 변화를 민감하게 포착할 뿐 아니라 실시간으로 해당 이미지를 표시해 감정의 긴장감을 전달할 수 있습니다. 더 놀라운 점은 짧은 시간 안에 개발 보드를 완전히 플레이 가능한 게임 콘솔로 바꿔 채팅 보조 도구에서 엔터테인먼트 디바이스로 쉽게 전환할 수 있다는 것입니다.

### 효과 이미지

| 초기 효과 | 최종 효과 |
| --- | --- |
| <img alt="초기 효과" src="https://images.tuyacn.com/content-platform/hestia/175609316343564ed226c.png" width="640"  /> |<img alt="최종 효과" src="https://images.tuyacn.com/content-platform/hestia/1756101670562a63c3c0a.png" width="700"  />|

### TuyaOpen 소개

TuyaOpen은 성숙한 상용 IoT 시스템인 TuyaOS를 기반으로 구축된 AIoT 산업용 오픈 소스 개방형 개발 프레임워크입니다. 크로스 플랫폼 호환성, 크로스 시스템 지원, 모듈성, 강력한 보안 준수 등 핵심 기능을 계승했으며, 전 세계 1억 대가 넘는 디바이스 배포와 수백만 명의 사용자로 검증되었습니다.

TuyaOpen은 엣지 측 AI 추론 엔진과 Tuya 클라우드 지능형 Agent Hub를 통합하고 엣지-클라우드 융합 멀티모달 AI 기능을 지원합니다. 국내 규정을 준수하는 대규모 모델(DeepSeek, Tongyi Qianwen, Doubao 등)을 원활하게 호출하거나 세계적인 AI 서비스(ChatGPT, Claude, Gemini 등)에 유연하게 연결할 수 있습니다. 다양한 도구 생태계를 통해 텍스트 및 음성 대화, 이미지 생성, 비디오 생성 등 여러 AI 기능을 구현할 수 있습니다.

## 하드웨어 소개

먼저 [T5AI-Board 개발 보드](https://developer.tuya.com/cn/docs/iot-device-dev/T5-E1-IPEX-development-board?id=Ke9xehig1cabj)의 관련 정보를 확인하세요.

개발 보드의 상세 사양은 다음 표를 참조하세요.

| 디바이스 | 매개변수 |
|----------|---------------------|
| T5AI-Board | 메인 제어 모듈: T5-E1-IPEX 모듈 ARMv8-M Star(M33F) @480MHz, 16 KB ITCM + 16 KB DTCM, 8 MB SiP Flash, 16 MB SiP PSRAM, 640 KB Share SRAM |
| 화면 | RGB565 터치스크린, 480 x 320 픽셀, 디스플레이 드라이버 칩: ILI9488, 터치 드라이버 칩: GT1151 |

![T5AI-Board 개발 보드.png](https://images.tuyacn.com/content-platform/hestia/17561085897400828f8e3.png)

## 저장소 클론 및 컴파일/플래싱

브라우저에서 **TuyaOpen.ai**를 검색해 TuyaOpen Git 저장소에 접속하고 아래와 같이 저장소 링크를 복사하세요. TuyaOpen SDK를 로컬 컴퓨터에 클론한 다음 AI 챗봇 프로젝트 `your_chat_bot`을 대화에 추가하면 AI Coding 도구가 컴파일과 플래싱을 자동으로 실행합니다.

- GitHub 저장소: https://github.com/tuya/TuyaOpen
- Gitee 저장소: https://gitee.com/tuya-open/TuyaOpen

### 프롬프트 템플릿

다음 템플릿을 참고해 AI Coding 도구가 컴파일 및 플래싱을 실행하도록 안내하는 프롬프트를 작성할 수 있습니다.

```
Help me compile and flash this project
Set up compilation environment
Help me compile and flash this project, compilation and flashing methods refer to readme documentation and the links below
Environment setup
https://tuyaopen.ai/zh/docs/quick-start/enviroment-setup
Compilation:
https://tuyaopen.ai/zh/docs/quick-start/project-compilation
Flashing:
https://tuyaopen.ai/zh/docs/quick-start/firmware-burning
```

![프롬프트 템플릿.png](https://images.tuyacn.com/content-platform/hestia/1756191238cfcb3b4eb39.png)


## 개발 보드 인증

플래싱을 완료한 후에도 **Tuya** 앱에서 디바이스를 찾을 수 없다면 개발 보드를 인증해야 합니다.

`your_chat_bot` 프로젝트를 열고 `apps/tuya.ai/your_chat_bot/include/tuya_config.h` 파일에서 다음 매개변수를 설정하세요.
- `TUYA_OPENSDK_UUID`: UUID는 무료로 발급받을 수 있습니다. 아래 QR 코드를 스캔해 그룹에 참여하고 Tuya 직원에게 문의하세요.
- `TUYA_OPENSDK_AUTHKEY`: Authkey는 무료로 발급받을 수 있습니다. 아래 QR 코드를 스캔해 그룹에 참여하고 Tuya 직원에게 문의하세요.

<img alt="그룹 QR 코드" src="https://images.tuyacn.com/content-platform/hestia/1756115540e394937a07f.png" width="300"  />

![UUID.png](https://images.tuyacn.com/content-platform/hestia/17561097834516e414c77.png)

상세한 인증 절차는 [디바이스 인증](https://tuyaopen.ai/zh/docs/quick-start/equipment-authorization)을 참조하세요.

:::info
구매한 T5 모듈에 TuyaOpen 인증 코드가 이미 플래싱되어 있다면 UUID와 Authkey를 입력할 필요가 없습니다.
:::

## 이미지 준비

이미지 생성 웹사이트에서 7가지 감정인 "happy, angry, sad, shocked, confused, like, thinking"에 해당하는 이미지를 생성한 후 이미지 픽셀을 **240 x 240**으로 변경하세요. T5 개발 보드의 Flash 공간이 제한되어 있어 큰 이미지는 더 많은 Flash 공간을 차지하므로 이미지 크기를 줄여야 합니다.

현재 Tuya Agent는 대화에 따라 최대 21개의 감정 값을 반환합니다. 다음 표를 참조하세요.

| 이모지 | 표현 | 이모지 | 표현 | 이모지 | 표현 |
|-------|------------|-------|------------|-------|------------|
| 😶 | 중립 | 😳 | 당황 | 😌 | 편안함 |
| 🙂 | 행복 | 😯 | 놀람 | 🤤 | 맛있음 |
| 😆 | 웃음 | 😱 | 충격 | 😘 | 키스 |
| 😂 | 재미있음 | 🤔 | 생각 중 | 😏 | 자신감 |
| 😔 | 슬픔 | 😉 | 윙크 | 😴 | 졸림 |
| 😠 | 화남 | 😎 | 멋짐 | 😜 | 장난스러움 |
| 😭 | 울음 | 🙄 | 혼란 | 😍 | 사랑스러움 |

## 프로젝트에 이미지 추가

임베디드 개발에서 화면에 이미지를 표시하는 작업은 일반적으로 매우 복잡합니다. 코드를 직접 작성할 때는 이미지를 고정 크기로 자르고 C 배열 형식으로 변환해야 하며 화면 크기와 이미지 저장 위치 등 세부 사항도 고려해야 합니다.

따라서 AI Coding 도구를 사용할 때는 프롬프트 설명이 구체적이고 자세할수록 최종 결과가 정확하고 기대에 가까워집니다. 참고 사례, 코드 스니펫, 요구 사항 문서가 있다면 도구에 함께 제공하세요. 개발에 필요한 기술 세부 사항을 미리 명확히 하면 도구 출력의 적합성을 높이고 이후 조정 비용을 줄일 수 있습니다.

예를 들어 AI에 화면 이미지 표시 기능을 구현하도록 요청할 때는 먼저 이미지를 C 배열 형식으로 변환하도록 명시해야 합니다. 그렇지 않으면 AI가 파일 경로 호출을 사용해 PNG 또는 JPG 이미지 파일을 직접 열려고 할 수 있습니다. 또한 이미지 인코딩 형식은 RGB565, RGB888 등 다양합니다. 미리 지정하지 않으면 여러 번의 디버깅 컴파일로 표시 효과를 구현할 수 있더라도 디버깅 횟수와 비용이 크게 늘어납니다.

### 일반적인 이미지 인코딩 형식

다음 표에는 일반적인 PNG 이미지 인코딩 형식이 정리되어 있습니다.

| 시나리오 | 일반적인 인코딩 형식 및 설명 |
|-----------------|----------------------|
| 데스크톱 표시 PNG | RGB24: 표준 트루 컬러, ARGB32: 투명도 지원 |
| 임베디드 UI(예: LVGL) | RGB565/Indexed Color: 16비트 색상 또는 인덱스 색상을 사용해 리소스를 절약 |
| 게임/비디오 렌더링 | RGBA8888: 고성능 GPU는 일반적으로 32비트 형식을 사용 |

### 프롬프트 템플릿

AI Coding 도구가 요구 사항을 더 정확하게 이해하도록 하려면 대상 디바이스가 지원하는 이미지 형식, 크기 사양, 이미지 저장 위치 등의 매개변수를 명확하게 정의해야 합니다. 이렇게 하면 컴파일 디버깅 횟수를 효과적으로 줄이고 개발 효율을 높일 수 있습니다. 다음 템플릿을 참고하세요.

```
Goal: Help me add images from the image folder to the your_chat_bot project. Replace the text emoji displayed for emotion in the current project src/display/ui/ui_chatbot.c, change to display images from the image folder based on emotion values. Use LVGL RGB565 format for images, images need to be converted to C array format.
Constraints: If ROM overflows, reduce to 4 main images (Happy, Sad, Angry, Love)
Technology: The screen size used in the current project is H 480, W 320 pixels, using LVGL V8 version GUI library
Verification: Compilation succeeds with no ROM overflow, images display normally after flashing
Alternative: If 240x240 fails, try 120x120 or further reduce the number of images
```

![프롬프트 템플릿.png](https://images.tuyacn.com/content-platform/hestia/1756114763298dd9e9663.png)

핵심 의도를 정확히 파악하면 AI Coding 도구가 대상 프로젝트에서 Python 기반 이미지 변환 도구를 자동으로 생성할 수 있습니다.

![생성된 도구.png](https://images.tuyacn.com/content-platform/hestia/1756115044f42f98b5006.png)

## 2048 게임 인터페이스 추가

2048 게임 인터페이스를 개발하기 전에 AI Coding 도구를 통해 인터페이스 디자인을 계획해야 합니다. 컨트롤러 칩의 성능 제한과 화면 픽셀 크기 등의 정보를 AI Coding 도구에 제공하면 4 × 4 보드 게임 인터페이스를 계획합니다. 실제 성능이 기준을 충족하면 이후 5 × 5 보드 레이아웃을 고려할 수 있습니다.

<img alt="예시 이미지" src="https://images.tuyacn.com/content-platform/hestia/17561158982c6d7812f26.png" width="500"  />

이 단계의 목적은 기능 구현 명령을 내리기 전에 AI Coding 도구의 최종 출력이 기대에 부합하는지 미리 확인하는 것입니다. 차이가 있다면 프롬프트에 제약 조건을 추가해 수정할 수 있습니다.

### 프롬프트 템플릿

AI Coding 도구가 계획한 2048 게임 인터페이스를 확인한 후 2048 게임 인터페이스를 생성하도록 지시하세요. 화면에 토글 버튼을 설정해 채팅 인터페이스와 게임 인터페이스 사이를 전환하고, 프로젝트 관리를 편리하게 하도록 2048 게임 인터페이스를 별도의 UI 파일 형식으로 저장해야 합니다.

```
Goal: Help me add a 2048 game interface to the your_chat_bot project, only need to implement basic 2048 game functionality with score statistics. Can switch back and forth between chat interface and game interface through a button.
Constraints: The screen resolution size in the current project is H 480, W 320 pixels, game interface is a 4*4 board.
Verification: Compilation succeeds with no ROM overflow, images display normally after flashing

```

![프롬프트.png](https://images.tuyacn.com/content-platform/hestia/1756116811b2d24299207.png)

## 효과 확인

이제 TuyaOpen 오픈 소스 대화 프로젝트 `your_chat_bot`을 기반으로 개발한 데스크톱 챗봇이 완성되었습니다. 이 로봇은 이모지 이미지 교체 기능과 2048 게임 인터페이스 통합을 지원합니다.

최종 생성 펌웨어 파일은 다음과 같습니다: [your_chat_bot_QIO_1.0.1.bin](https://drive.weixin.qq.com/s?k=AGQAugfWAAkS4ye03BAbQAqAb1AFU). 펌웨어를 받아 플래싱한 후 최종 효과를 확인할 수 있습니다.

## 프롬프트 사용 경험 요약

- 프로젝트 또는 데모를 개발할 때는 먼저 AI 도구로 전체 기능 아키텍처를 정리하고 요약한 다음, 아키텍처에 기반해 개발 지시를 내리면 효과를 높일 수 있습니다.

- 시작할 때 제공하는 프롬프트가 자세할수록 최종 결과가 좋아집니다. 참고 자료가 있다면 가능한 한 AI 도구에 제공하세요. 기술 세부 사항을 미리 명확히 하면 더 좋습니다. 예를 들어 화면 이미지 표시 기능을 구현할 때 이미지가 C 배열 형식으로 변환되어야 한다고 지정하고 RGB565, RGB888 등 구체적인 인코딩 형식을 명시해야 합니다. 인코딩 형식을 지정하지 않으면 디버깅 횟수가 크게 늘어납니다.

- 프롬프트는 다음 템플릿을 참고할 수 있습니다.
    
    ```
    Goal: [What specifically to achieve]
    Constraints: [What are the limiting conditions]
    Technology: [What tools/methods to use]
    Verification: [How to confirm success]
    Alternative: [What to do if it fails]
    ```
    예:
    ```
    Goal: Change emotion images from 64x64 to 240x240 pixels
    Constraints: If ROM overflows, reduce to 4 main images (Happy, Sad, Angry, Love)
    Technology: Use png_to_c_array.py tool to regenerate, update CMakeLists.txt
    Verification: Compilation succeeds with no ROM overflow, images display normally after flashing
    Alternative: If 240x240 fails, try 120x120 or further reduce the number of images.
    ```

## 빠른 시작 프로젝트 추천

아이디어가 창의성을 시작하게 하고 T5 개발 보드가 이를 실현하도록 도와줍니다! 지금 시작해 단 한 주말 만에 첫 프로젝트를 완성하세요. [공식 튜토리얼](https://tuyaopen.ai/zh)은 전체 기술 지원을 제공합니다.

### 스마트 음성 비서

AI 개발이 처음이라면 다음 세 가지 핵심 기능을 구현할 수 있는 스마트 음성 비서 프로젝트를 추천합니다.
- 음성 명령으로 조명과 에어컨 등 홈 디바이스를 제어합니다.
- 음성 명령에 응답해 음악 재생, 알림 설정 등의 작업을 실행합니다.
- 사용자 지정 전용 음성 웨이크 워드를 지원합니다.

### 반려동물 비서

반려동물을 좋아하는 개발자라면 반려동물 비서 프로젝트로 다음 기능을 구현할 수 있습니다.
- 자동 급식: 반려동물의 급식 요구를 해결하고 사용자가 출장 중일 때도 자동으로 먹이를 줍니다.
- 원격 고양이 놀아 주기 및 산책: 원격 상호 작용을 지원해 집에 없을 때도 반려동물과 상호 작용할 수 있습니다.


### 창의적인 조명 아트

이 솔루션은 멋진 스타일의 작품을 개발하려는 메이커에게 특히 적합하며 다음 두 종류의 제품을 개발할 수 있습니다.
- 음성 제어 색상 변경 조명
- 음악 리듬 라이트 스트립
