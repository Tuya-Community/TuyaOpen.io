---
slug: /72h-with-tuyaopen
title: '72시간 Adventure X 이벤트'
authors: [tuya, hsuanhanlai]
image: /img/home/tuyaopen-logo-social-preview.png
tags: [TuyaOpen, Contest]
---

{/* truncate */}

# title: '52시간 Startup Forest 이벤트'
{/* ![event](https://images.tuyacn.com/fe-static/docs/img/6d005a49-7b92-4602-af60-b7acca333eab.png) */}

> **이 가이드는 대회 참가자를 위한 전용 문서로, 행사에 필요한 종합적인 안내를 제공합니다.**

{/* ### 대회 정보 */}
{/* - 행사 기간: 6/27 ~ 6/29(총 52시간) */}

# 주요 리소스
{/* - Tuya 대회 PPT: [PPT 소개](https://tuyaopen-pu9rufi.gamma.site/) */}
- TuyaOpen 코드 저장소: [GitHub](https://github.com/tuya/TuyaOpen)
- TuyaOpen 문서 웹사이트: [문서](https://tuyaopen.ai)

{/* truncate */}

## TuyaOpen과 TuyaOS 비교

TuyaOpen은 업계 선도적인 TuyaOS 아키텍처를 기반으로 한 오픈 소스 프로젝트이며 전 세계 130만 명의 개발자가 검증했습니다. TuyaOpen은 여러 MCU를 지원하는 C/C++ 애플리케이션 개발을 위해 명확하게 정의된 API를 제공해 주변 장치 연결, 클라우드 연결, 보안 등 복잡한 개발 프로세스를 크게 간소화합니다. 이 프레임워크는 개발 효율을 크게 높이고 AI + IoT 스마트 제품을 빠르게 구축할 수 있도록 합니다.

:::tip 어떻게 선택하나요?
참가자는 필요에 따라 선택할 수 있습니다. **비디오 AI 기능 통합** 또는 **상용화 시나리오**가 필요하다면 TuyaOS를 권장하고, 그 외의 시나리오나 요구 사항에는 더 개방적인 **TuyaOpen** 생태계를 권장합니다.
:::

### 주요 차이점 비교

| 기능 | TuyaOpen | TuyaOS |
|-----------------------|--------------------------------------------------|-------------------------------------------------------------|
| 대상 사용자 | 오픈 소스 개발자 | 상용 협력 개발자 |
| 소스 코드 접근 | 완전한 오픈 소스, 소스 코드 접근 가능 | 상용 코드는 부분 오픈 소스이며 2차 개발 지원 |
| 코드 다운로드 | GitHub, Gitee에서 무료 오픈 소스 다운로드 | VSCode 플러그인 WindIDE 및 이메일 인증으로 코드 획득 |
| 개발 환경 | Linux, Windows, Mac | Linux 전용, 다른 플랫폼은 가상 머신 필요 |
| Tuya Cloud AI 구성 요소 | ✅ | ✅ 최신 및 최고 속도 |
| Tuya Voice AI ASR 기능 | ✅ | ✅ |
| Tuya Video AI 기능 | ❌ 현재 지원되지 않음 | ✅ |
| Tuya Cloud 대규모 모델 맞춤 설정(LLM/Prompt/Workflow/RAG) | ✅ | ✅ |
| 소스 코드 맞춤 설정 기능 | 소스 코드 수준의 높은 맞춤 설정 | API 수준의 맞춤 설정, 연결된 라이브러리, 더 풍부한 상용 기능 구성 요소 |
| 칩 지원 | Tuya T 시리즈/ESP 시리즈(지원 목록 참조) | Tuya T 시리즈 |
| 개발 언어 | C/C++ | C/C++ |
| 문서 지원 | [TuyaOpen 공식 웹사이트](https://TuyaOpen.ai) | [Tuya Developer 공식 웹사이트](https://developer.tuya.com/cn/docs/iot-device-dev) |
| 소스 코드 기여 또는 2차 오픈 소스 | ✅ | Copyright License 준수 |
| 하드웨어 생태계 | 칩, 개발 보드, 주변 장치 드라이버를 지속적으로 추가 | 권장 선택 솔루션 사용 |


# 임베디드 소프트웨어 개발
## TuyaOpen 섹션
### 문서
- TuyaOpen 문서: [문서](/docs/about-tuyaopen)
- AI API 코드 모듈: [코드 모듈](https://github.com/tuya/TuyaOpen/tree/master/src/tuya_ai_basic)

### 예제 개요
예제 코드를 잘 활용하면 개발 비용을 줄이고 "바퀴를 다시 발명하는 일"을 피할 수 있습니다.

- your chat bot: [이동](https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/your_chat_bot)
    - T5/ESP32 크로스 플랫폼 지원 예제
    - 음성 ASR + Tuya Cloud 대규모 모델
    - AI Prompt/Agent 기능 연결
    - 감정 인식 상호 작용 기능
    - 모듈 구성 요소: `Screen` + `Mic` + `Speaker` + `Wi-Fi` + `Button`

- your chat bot: [이동](https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/your_chat_bot)    
    - T5/ESP32 크로스 플랫폼 지원 예제
    - 음성 ASR + Tuya Cloud 대규모 모델
    - AI Prompt/Agent 기능 연결
    - 감정 인식 상호 작용 기능
    - 여러 웨이크 모드
    - 앱 제어 로봇 상호 작용
    - 감정 인식 → 동작 기능
    - 모듈 구성 요소: `Screen` + `Mic` + `Speaker` + `Wi-Fi` + `Button` + `Servo`
- Switch Demo: [이동](https://github.com/tuya/TuyaOpen/tree/master/apps/tuya_cloud/switch_demo)
     - 디바이스를 Tuya Cloud에 연결하고 Tuya Cloud Service/App에서 제어할 수 있는 IoT LED 조명의 기본 네이티브 예제
     - DP 메시지 이벤트 처리
     - 기본 네트워크 구성 및 하드웨어 인증 프로세스

- Basic Component Demo: [이동](https://github.com/tuya/TuyaOpen/tree/master/examples)
     - Bluetooth/Wi-Fi
     - SPI I2C ADC 기본 인터페이스 프로토콜 데모
     - 프로토콜 데모
     - 화면 렌더링 프레임워크 LVGL 예제
     기타...


## TuyaOS 섹션

Tuya Wind IDE는 TuyaOS EasyGo를 사용하는 개발자를 위한 원스톱 통합 개발 환경입니다. [이동](https://developer.tuya.com/cn/docs/iot-device-dev/tuyaos-wind-ide)할 수 있습니다.

### AI 인프라 Tuya Wukong AI 임베디드 디바이스 측
- Tuya Wukong AI: [이동](https://developer.tuya.com/cn/docs/iot-device-dev/ai-hardware?id=Kectwmx9isrgl)
- 기능 맵: [이동](https://developer.tuya.com/cn/docs/iot-device-dev/wukong-abi-map?id=Keedxu1netj62)
- 멀티모달 상호 작용: [이동](https://developer.tuya.com/cn/docs/iot-device-dev/tuyaos-wukong-capability-multi-media)

---

## Tuya Cloud 플랫폼, 제로 코드 클라우드 AI 개발
- Tuya Developer Cloud Service 등록: [이동](https://auth.tuya.com/register)
- 참고 문서:
    - [지능형 Agent 개발 플랫폼](https://developer.tuya.com/cn/docs/iot/ai-agent-management)
    - [AI가 직접 함수를 호출하도록 하기 - 디바이스 자체 제어 명령 함수](https://developer.tuya.com/cn/docs/iot/Self-control?id=Kep3yhifdrvah)

---

# 하드웨어 개발 보드
## 개발 보드
### Tuya T5AI Board 개발 보드
![T5-AI Board 핀 배치](https://images.tuyacn.com/fe-static/docs/img/6b7ab959-0635-4293-991b-b8dda293614b.jpg)

- 문서 입구: [T5AI Board 개요](/docs/hardware/t5-ai-board/overview-t5-ai-board)
- I/O 핀 고해상도 다운로드: [핀 배치](/docs/hardware/T5-AI-Board-Pinout-v102.pdf)
- 프로젝트를 빠르게 컴파일하고 플래싱하는 방법: [튜토리얼](/docs/quick-start/enviroment-setup)

{/* ### Tuya T5 mini 개발 보드(서드파티 커뮤니티 개발 보드)

- 크기가 작아 공간 요구 사항이 높은 솔루션에 적합합니다.
- 사용 방법은 [T5AI Board](/blog#%E6%B6%82%E9%B8%A6-t5ai-board-%E5%BC%80%E5%8F%91%E6%9D%BF)를 참조할 수 있으며 기능은 비교적 유사합니다.

### Digua Robot RDK X5

참고 문서: [RDK X5 문서](https://developer.d-robotics.cc/information)

#### RDK는 TuyaOpen과 어떻게 통합되나요?

> T5의 연산 성능만으로 충분하지 않을까 걱정되나요? RDK X5가 엣지 컴퓨팅 요구를 지원하도록 하세요! RDK + TuyaOpen 솔루션으로 로컬 실시간 모델 추론과 클라우드 대규모 모델을 결합한 하이브리드 아키텍처를 구현할 수 있습니다.
- Tuya 앱으로 RDK X5 기능을 원격 제어합니다.
    - RDK + TuyaOpen 프레임워크 솔루션 데모: [튜토리얼](/docs/rdk/rdk-originbot-with-tuya-dp-control-demo.pdf)
- RDK X5와 Tuya T5 칩 하이브리드 프레임워크
    - 엣지 컴퓨팅 + 클라우드 컴퓨팅 결합: [튜토리얼](https://diguazhandian-rdkx5-tuya-t4otm0d.gamma.site/) */}

---

# Tuya 하드웨어 리소스
- 리소스 남용을 방지하기 위해 리소스를 수령하거나 사용할 명확한 아이디어가 있는 팀을 우선 지원합니다. 팀이 익숙한 도구를 직접 준비하는 것도 권장합니다.
- 개발 보드는 대회에서 지정한 T5를 사용해야 합니다. 그 밖의 주변 장치, 하드웨어 및 제품 형태는 참가자가 자유롭게 준비할 수 있습니다.

현장에서 제공되는 하드웨어 리소스의 수량은 다음을 참조하세요.

### 개발 보드
- [Tuya T5-AI 개발 보드](/docs/hardware/t5-ai-board/overview-t5-ai-board): 15개
- Tuya T5 mini 개발 보드: 10개
{/* - Digua Robot RDK X5: 20개 */}

### 주변 장치 액세서리
- 스피커(3020, 4Ω, 3W): 20개
- 디스플레이(1.54인치, ST7789): 10개
- 배터리 팩(2000mAh): 10개
- 서보(MG90S): 40개
- 센서 키트(제스처, 터치, 조도, 공기, 온습도, 초음파 등 10종 이상): 4개
- 듀퐁 와이어/데이터 케이블: 여러 개

### 도구

- Zhengdian Atom HP15 스마트 가열 플랫폼: 2대
- Zhengdian Atom DM40 디지털 멀티미터: 2대
- Zhengdian Atom T80/T80P 스마트 납땜 인두: 2대
- Zhengdian Atom 로직 분석기: 2대
- 조정식 DC 전원 공급 장치(최대 60V/5A): 1대
- 히트건: 1대
- 핫 글루건: 1대
- 드라이버 세트: 1세트
- 3D 프린터(Bambu Lab P1S+AMS): 5대

---


# Tuya 기술 지원 🛠️📋

행사 현장에는 Tuya 기술 강사와 Digua Robot 강사가 상주해 행사 기간에 적절한 기술 지원을 제공합니다.

:::tip
더 복잡한 문제가 있거나 행사 당일 현장에서 제때 지원을 받지 못한 경우 질문을 정리해 Github에 Issue를 등록하세요 📝. Tuya가 가능한 한 빨리 담당자를 배정합니다.
:::

Issue 링크: https://github.com/tuya/TuyaOpen/issues

### Issue 형식

``` shell
### Include `【52Event】` to help staff identify event issues
Issue Title: 【AdventureX Event】 (bug/question/hardware): {Clear and concise problem description}
Issue Content:
- Development Environment: Mac/Win/Linux 💻
- Chip Platform: T5/RDK 
- Problem Description: Clear and concise expression of the problem
- Problem Phenomenon: What patterns can be found, what methods have been tried to fix it?
- Expected Phenomenon: Expected resolution result
- Log Logs: Attaching logs helps staff analyze your problem 
```

---

# 자주 묻는 질문

1. ESP32는 어떻게 개발하나요?
`tos.py` 도구로 컴파일 및 플래싱 단계를 완료할 수 있습니다. 코드 프로젝트에 올바른 보드 수준 구성인 ESPxxx.config를 선택하세요. `tos.py`의 `build`와 `flash`는 모두 크로스 플랫폼을 지원합니다.
2. TuyaOS와 TuyaOpen의 차이는 무엇인가요?
위의 **TuyaOpen과 TuyaOS 비교** 섹션에 자세한 설명이 있습니다. **비디오 AI 기능 통합** 또는 **상용화 시나리오**가 필요하다면 TuyaOS를 권장하고, 그 외에는 더 개방적인 **TuyaOpen** 생태계를 권장합니다.
3. PID란 무엇인가요?
하드웨어용 클라우드 서비스와 연결된 Product-ID입니다. 클라우드 서비스에 바인딩된 번호입니다.
4. 인증 코드란 무엇인가요?
하드웨어가 클라우드 서비스에 접근할 때 하드웨어 보안을 보장하는 보안 인증 코드입니다. UUID/Key는 인증 코드 한 세트입니다. TuyaOS와 TuyaOpen의 인증 코드는 서로 혼용할 수 없습니다. 기능과 서비스가 비슷하더라도 인증은 호환되지 않습니다.
5. Windows 시스템에서 개발할 수 있나요?
예. 현재 Master 메인 브랜치를 사용할 수 있습니다.
6. MacOS에서 개발할 수 있나요?
- 예. 현재 Master 메인 브랜치를 사용할 수 있습니다.
- 베타 기능입니다. Mac x86/ARM 환경에서 개발할 수 있지만 아직 발견되지 않은 문제가 있을 수 있습니다. 먼저 Linux와 Windows를 사용하는 것이 좋습니다.
7. MacOS M 시리즈에서 T5 프로젝트를 컴파일할 때 lwip 컴파일 오류가 발생합니다.
Mac gcc 버전 차이로 인해 T5 칩을 사용할 때 다음 수정이 필요합니다.
문제가 해결되었습니다.
