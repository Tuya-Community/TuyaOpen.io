---
title: T5AI-Core 개발 키트
description: "T5AI-Core 개발 키트 - Tuya T5-E1 Wi-Fi 및 Bluetooth 모듈의 소형 음성 코어 보드, 내장 마이크 및 44 핀 헤더."
keywords:
  - t5ai-core
  - tuyaopen hardware
  - t5-e1
  - voice
  - dev kit
---

T5AI-Core는 Tuya T5-E1 Wi-Fi 및 Bluetooth combo 모듈에 내장 된 컴팩트 한 음성 코어 개발 보드입니다. 내장 마이크, 스피커, 리튬 배터리 전원 관리 및 모듈의 GPIO, UART, SPI 및 I2C 신호를 차단하는 44 핀 헤더를 통합합니다. 표준 TuyaOpen 워크플로우와 함께 휴대용 AIoT 음성 인터페이스 애플리케이션을 프로토 타입으로 사용합니다.

![T5AI-Core 개발 보드, 전면보기](https://images.tuyacn.com/fe-static/docs/img/02037ea4-3282-4c8c-b2ec-c9c1894e8064.png)

## Software 빌드 구성
보드 레벨 구성 파일은 주변 드라이버, 핀 매핑, 보드 지원 패키지 (BSP) 및 타사 라이브러리와 같은 주요 기능 구성 요소를 정의합니다. 개발 보드의 사전 구성 보드 레벨 구성 파일을 사용함으로써 하드웨어 적응 및 드라이버 개발의 워크로드를 크게 줄일 수 있으므로 개발 효율성을 향상시킵니다.


:::tip 새로운 주변을 개발하는 것에 관심이 있습니까?
** 구성 기능:**
- ** 새 주변을 추가하려면 응용 레이어에서 드라이버를 직접 쓸 수 있습니다.** BSP 드라이버는 주로 보드에 통합 된 주변 장치를위한 것입니다.
- Peripheral 필요조건은 신청의 맞은편에 변화할지도 모릅니다. 특정 요구에 따라 구성 파일을 조정할 수 있습니다.
- 애플리케이션 요구 사항에 따라 타사 라이브러리 매개 변수를 구성해야 할 수도 있습니다.
- <span style={{color: 'red'}}><strong>자주 묻는 질문</strong>제공된 초기 설정 파일의 상단에 board-level 구성 만들기</span>, 및 실행 사용자 정의 개발 및 기능 확장.
:::

보드 레벨 구성을 활성화하는 방법? 더 알아보기[CLI - tos.py 개발 도구 > 설정 선택](/docs/tos-tools/tos-guide#config-choice).

<table class="hw-config-flag-table">
  <tbody>
    <tr>
      <th>Build flag</th>
      <td><code>TUYA_T5AI_CORE.config</code></td>
      <td>T5AI-Core + Onboard mic/speaker BSP board configuration - <a href="https://github.com/tuya/TuyaOpen/blob/master/apps/tuya.ai/your_chat_bot/config/TUYA_T5AI_CORE.config">Configuration file</a></td>
    </tr>
    <tr>
      <th>BSP driver source code</th>
      <td colspan="2"><a href="https://github.com/tuya/TuyaOpen/tree/master/boards/T5AI/TUYA_T5AI_CORE">T5AI-Core BSP driver source code</a></td>
    </tr>
  </tbody>
</table>



## 하드웨어 개요
T5AI-Core는 T5-E1 모듈을 기반으로 하는 매우 통합된 음성 코어 개발 보드입니다. T5-E1 모듈은 독립적으로 Tuya에 의해 개발되었으며 내장 된 Wi-Fi 및 Bluetooth를 통합하여 다양한 스마트 하드웨어 시나리오에 적합합니다. 보드는 음성 상호 작용 요구 사항을 충족하기 위해 로컬 음성 인식 및 오디오 재생을 지원하는 내장 마이크 및 스피커를 갖추고 있습니다.

보드에는 44 핀 헤더가 포함되어 있으므로 신속하게 개발 및 프로토 타입 AIoT 프로젝트를 수행할 수 있습니다. 온보드 리튬 배터리 전원 관리 회로는 모바일 및 휴대용 스마트 장치에 적합한 저전력 디자인을 지원합니다.

광범위한 하드웨어 인터페이스 및 포괄적인 음성 기능으로 보드는 AIoT 음성 상호 작용 개발에 잘 적합합니다.

<div align="center">
  <img src="https://images.tuyacn.com/fe-static/docs/img/dd9d442f-bd51-4ce0-bbb5-687058270bff.jpg" alt="T5AI-Core board top view" width="400" />
  <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
    <img src="https://images.tuyacn.com/fe-static/docs/img/6a1310df-c48c-4c71-b52e-483ba4b49bc1.jpg" alt="T5AI-Core board angled view" width="250" />
    <img src="https://images.tuyacn.com/fe-static/docs/img/2475d214-9adf-4aaa-a1fe-67c88b50fbd2.jpg" alt="T5AI-Core board side view" width="250" />
  </div>
</div>

## 주요 특징
- Tuya T5 MCU 단위 (Wi-Fi 2.4 GHz + Bluetooth LE 5.4)
- ARMv8-M 스타 (M33F) 프로세서, 최대 480 MHz
- 8 MB 플래시 메모리 (모듈 칩 내부)
- 16 MB RAM (모듈 칩 내부)
- Serial 펌웨어 다운로드 및 디버그 로깅
- 1채널 마이크
- 1채널 echo 샘플링
- 1채널 스피커
- 단위 핀 breakout
- 내장 2.4 GHz Wi-Fi 안테나
- USB 전력 공급 + 이중 직렬 포트 칩
- 널 차원: 73 mm × 29 mm × 11 mm (핀 헤더 제외)/17 mm (핀 헤더 포함)

## 하드웨어 아키텍처
![T5AI-Core 하드웨어 아키텍처 블록 다이어그램](https://images.tuyacn.com/fe-static/docs/img/e230929b-39a7-4851-bdb8-d614624a48fc.jpg)

### 디자인 철학과 핀 가용성
이 널은 portability와 발달 융통성 둘 다에 초점으로 디자인되었습니다. ** 배터리 전원 공급**, ** firmware 번쩍이고 디버깅**, **audio 입력/출력**와 같은 핵심 기능 모듈을 통합합니다. 따라서 보드는 상자에서 사용할 준비가되어 있으며 음성 상호 작용과 같은 주요 응용 시나리오를 만족시킬 수 있습니다.

위에서 언급 한 핵심 기능 외에도 다른 모든 핀은 44 핀 헤더를 통해 완전히 액세스 할 수 있으며 하드웨어 확장성 및 접근성을 강화합니다. 다양한 외부 센서, 액추에이터, 또는 실제 프로젝트 요구 사항에 따라 다른 주변 장치를 연결할 수 있습니다. 초경화 및 기능 검증. 이 디자인은 concise와 능률적인 널 배치를 달성하고 또한 미래 특징 연장과 주문 발달을 위한 단단한 기계설비 기초를 제공합니다.

추가 I/O 인터페이스를 수용하기 위해, 패드 테스트 포인트는 PCB 표면에 예약되며, 컴팩트한 폼 팩터를 유지하면서 종합적인 확장성을 제공합니다.


## Hardware 세부사항
### 전력 관리 체계
#### 힘 입력
- ** Type-C USB 2.0 포트**: 5V 메인 전원 입력을 제공 하 고 이중 채널 직렬 포트를 통해 펌웨어 번쩍이는 로그를 지원 합니다.
- ** JST PH 1.25 mm 배터리 커넥터 **: 휴대용 신청을 위한 3.7V 리튬 전지 전력 공급을 지원합니다.


  <div style={{ display: 'flex', justifyContent: 'left', gap: '16px', flexWrap: 'wrap' }}>
    <img src="https://images.tuyacn.com/fe-static/docs/img/b1f63d5f-80c7-44c6-9cbc-82e97461c6b2.png" alt="Type-C USB power input port" width="150" />
    <img src="https://images.tuyacn.com/fe-static/docs/img/3911e3dd-680f-48d0-a448-f764bec39d67.png" alt="JST PH 1.25 mm battery connector" width="150" />
  </div>


#### 힘 스위치
toggle 스위치는 시스템의 주요 전원 스위치로 제공되며, ** USB 포트 ** 또는 ** 리튬 배터리**에서 공급되는 업스트림 파워가 있습니다.

:::warning
전원 스위치가 펌웨어를 깜박일 때 켜져 있는지 확인합니다.
:::

<p align="center">
  <img src="https://images.tuyacn.com/fe-static/docs/img/84a7c2b7-020c-4004-aab8-c0cbd6f425a4.png" alt="Main power toggle switch" width="150" />
</p>



#### 힘 관리 칩
**ETA6003 배터리 관리 칩 **:

- 배터리 커넥터에서 Type-C USB 포트 및 3.7V 입력에서 5V 입력을 허용합니다.
- 배터리 충전 및 전원 분배 관리.
- 출력 전력 스위치에 5V.
- 전원 표시기 (PW LED) 및 충전 표시기 (Charge LED)를 제어합니다.

#### 힘 스위치와 규칙
- ** 전원 스위치 **: 주요 시스템 전압을 제어 (`VSYS`)는 ETA6003 칩에서 5V 입력을 받습니다.
- ** LN2220PAR 부스트 컨버터 ** : 단계`VSYS`안정적인 5V 전원 도메인으로 오디오 증폭기와 같은 고출력 부품을 공급합니다.
- **RY3408 3.3V 레귤레이터 ** : T5-E1 모듈 및 디지털 회로를 공급하기 위해 3.3V 전원 도메인에 5V를 밀어줍니다.

## 전력 공급 특징
- 이중 전원 입력: USB 항구에서 5V 및 리튬 전지에서 3.7V.
- 스마트 파워 관리 지원 배터리 충전 및 전원 전환.
- 안정되어 있는 5V 및 3.3V 힘 도메인을 제공하는 다단식 전압 규칙.
- 휴대용 애플리케이션에 최적화된 저전력 디자인.


:::warning 배터리 요구 사항
- ** 배터리 유형 ** : 3.7V 리튬 배터리 적어도 1C의 출력 속도가 안정적인 시스템 전력 공급을 보장하는 것이 좋습니다.
- ** 수용량 추천 **: 응용 프로그램에 따라 적합한 용량을 선택, 일반적으로 500 mAh에서 2000 mAh에 이르기까지.
- **가상 고려 **: Strictly는 반전 연결과 장치 손상을 피하기 위하여 건전지를 연결할 때 긍정과 부정적인 표하기를 따릅니다.
- ** 보호 회로 **: 과충전, 과충전, 단락 보호 기능을 사용하여 리튬 배터리를 사용하는 것이 좋습니다.

<p align="center">
  <img src="https://images.tuyacn.com/fe-static/docs/img/9eade1d0-f90d-41ed-b2de-686f3e9a255e.jpg" alt="Recommended 3.7V lithium battery for the T5AI-Core" width="250" />
</p>

:::


### 책임 LED
ETA6003 건전지 관리 칩은 현재 위탁 상태를 보여주기 위하여 책임 LED를 통제합니다. 논리는 다음과 같습니다:

<p align="center">
<img src="https://images.tuyacn.com/fe-static/docs/img/eed5a4d5-8eba-4d6a-87a3-c641cf0facdd.png" alt="Charge LED indicator on the board" width="150" />
</p>

- toggle 스위치가 **에있을 때 ** 위치, 시스템을 나타내는 전원 LED 조명이 켜집니다.
- **요금**: 리튬 배터리가 충전되면 충전 LED가 정상화되어 충전이 진행 중입니다.
- ** 완전 충전 ** : 리튬 배터리가 완전히 충전되면 충전 LED가 자동으로 꺼져 충전이 완료됩니다.
- ** 배터리 또는 충전 없음 ** : 책임 LED blinks 지속적으로.

:::warning
충전 상태를 확인하려면 개발 보드에 충전 LED가 켜져 있는지 확인하십시오.
:::



## 핵심 처리 단위
### T5-E1 Wi-Fi 및 블루투스 모듈
- **Processor**: ARMv8-M Star (M33F) 아키텍처, 최대 시계 속도 480 MHz.
- **저장**: 내장 8 MB 플래시 메모리 및 16 MB RAM.
- ** 무선 통신 ** : 통합 2.4 GHz Wi-Fi 및 Bluetooth 저 에너지 (LE) 5.4 기능.
- ** 전력 공급 **: 3.3V 전원 도메인 내에서 작동합니다.
- **Feature**: 핵심 처리 장치로서의 행위, 모든 계산, 통신 및 제어 작업을 처리.

<p align="center">
<img src="https://images.tuyacn.com/fe-static/docs/img/28b35dec-a9a0-4543-ba41-b9c3f71a8527.png" alt="T5-E1 Wi-Fi and Bluetooth module on the board" width="250" />
</p>

## 통신 인터페이스
### USB 직렬 통신
- ** CP2105 듀얼 채널 직렬 칩 **:

   - 유형 C USB 공용영역의 DP/DN 신호 선에 연결합니다.
   - 듀얼 UART 다운로드 및 디버깅 기능을 제공합니다.
   - 펌웨어 번쩍이고 debugging 로그 출력을 지원합니다.
- 운전사 임명: Refer에[USB-to-serial 드라이버 설치](#USB-to-serial-chip-driver-installation).

## 사용자 상호 작용 성분
### 사용자 입력 및 출력
|회사연혁|핀 핀|이름 *|
| ------------ | ------- | ------------------------------------------ |
|사용자 LED|사이트맵|T5-E1 단위에 의해 통제되는 사용자 지시자 빛은 GPIO 핀 P9에, 연결했습니다.|
|사용자 버튼|사이트맵|T5-E1 모듈의 GPIO 핀 P29에 연결되는 사용자 입력 단추.|
|재설정 버튼|사이트맵|T5-E1 모듈에 리셋 신호를 보내는 전용 리셋 버튼.|

<div style={{ display: "flex", justifyContent: "center", gap: "24px", alignItems: "center" }}>
  <img src="https://images.tuyacn.com/fe-static/docs/img/2e0043dc-59d8-4900-b5d1-524de845131d.png" alt="User LED and user button on the board" width="250" />
  <img src="https://images.tuyacn.com/fe-static/docs/img/cd0b54a3-d292-4d74-b91d-c474f51c89c1.png" alt="Reset button on the board" width="250" />
</div>

## 오디오 시스템
### 오디오 샘플링 사양
- ** 표준 샘플링 속도**: 16 KHz
- ** 샘플링 비트 깊이 ** : 16 비트

T5AI-Core 오디오 시스템 ** 음성 인식 및 오디오 처리와 같은 응용 프로그램에 적합한 16 KHz 및 16 비트 샘플링 정밀도 **의 기본 샘플링 비율을 채택한다. 인기있는 오디오 알고리즘 및 프로토콜과 호환됩니다.

## 오디오 입력
T5 모듈은 아날로그 마이크 입력의 두 채널을 지원하며 오디오 캡처 및 루프백을 촉진합니다. 이 널에 오디오 입력 채널은 다음과 같이 할당됩니다:

|채널:|Purpose 설명|
|-------|--------------------|
|사이트맵|마이크 오디오 입력|
|사이트맵|스피커 루프백 신호 입력 (지원 중단 기능)|

- ** 내장 아날로그 마이크 **: T5-E1 모듈에 아날로그 오디오 입력을 제공하는 통합 마이크.

<p align="center">
  <img src="https://images.tuyacn.com/fe-static/docs/img/e23b3b2c-f268-4a45-8271-2945a32a094d.png" alt="Onboard analog microphone" width="250" />
</p>

- ** 루프백 회로 **: 오디오 테스트 및 처리를 위해 디자인된 오디오 루프백 회로. Acoustic Echo cancel (AEC) 및 echo 억제 기능을 지원하며 T5-E1 모듈에 연결됩니다.

## 오디오 출력
- ** 1W 오디오 증폭기 **:
  - 5V 전원 도메인에 의해 구동.
  - T5-E1 모듈에서 오디오 신호를 수신합니다.
  - 출력 스피커 커넥터에 증폭 된 오디오.
- ** JST PH 1.25 mm 스피커 연결관 **: 외부 스피커 출력 인터페이스, **4Ω 3W** 스피커와 호환.

<p align="center">
  <img src="https://images.tuyacn.com/fe-static/docs/img/ebb095cd-be13-472d-99a0-bc4b0ff15242.png" alt="Audio amplifier and JST PH speaker connector" width="250" />
</p>

:::warning 스피커 선택
**4Ω** 임피던스와 **1W에서 3W** 전원으로 스피커를 사용하는 것이 좋습니다. 선택한 스피커가 오디오 시스템 요구 사항을 충족하기 위해 좋은 에코 취소 및 소음 억제 성능을 확인합니다.
:::

## 확장 인터페이스
### 44 핀 2.54 mm 헤더
- ** 전원 핀 ** : 5V 및 3.3V 전원 출력을 제공합니다.
- ** 신호 핀 **: GPIO, UART, SPI 및 I2C를 포함한 T5-E1 모듈에서 다양한 신호를 노출합니다.
- ** 기능 **: 외부 회로 연결 및 기능 확장을 촉진하여 신속한 프로토 타입 검증을 지원합니다.

뒤에 오는 단면도 세부사항 핀 다중화 및 기능적인 정의:

<p align="center">
  <img src="https://images.tuyacn.com/fe-static/docs/img/e902e201-77b8-4c83-aa71-1c0dae77cfb3.png" alt="44-pin header layout, part 1" width="450" />
</p>
<p align="center">
  <img src="https://images.tuyacn.com/fe-static/docs/img/683ec5fa-9c4e-401a-b645-e8120628ac03.png" alt="44-pin header pin multiplexing and functions, part 2" width="400" />
</p>



## USB 호스트 인터페이스 (기능 확장)
T5 모듈은 USB 카메라 및 USB 직렬 포트와 같은 다양한 USB 장치에 연결할 수 있는 하나의 USB 호스트 채널을 지원합니다. 따라서, 단위는 다양한 주변 연장 요구에 응할 수 있습니다.

<p align="center">
  <img src="https://images.tuyacn.com/fe-static/docs/img/f7b6d377-2a65-4e23-b6f3-d2c50cd42168.png" alt="T5 USB host diagram" width="200" />
</p>

## 펌웨어 다운로드 UART (Multiplexed)
T5 모듈의 UART 핀은 내장 직렬 칩과 공유됩니다. 굳힌모가 완료된 후, UART 포트는 다른 장치 신청을 위해 할당될 수 있고, serial 자원의 가동 가능한 관리를 가능하게 합니다.

<p align="center">
  <img src="https://images.tuyacn.com/fe-static/docs/img/fca1b1a2-e89e-4a85-aa52-b048850843d6.png" alt="T5 UART diagram" width="200" />
</p>


### 안테나 시스템
** 내장 2.4 GHz Wi-Fi 및 Bluetooth LE 안테나 **: T5-E1 모듈에 무선 통신 지원을 제공하는 통합 안테나.


## 지원하다
### T5AI-Core 개발 보드
- [T5AI 핵심 schematic 도표](/docs/hardware/t5ai-core/T5AI-Core_V101-SCH.pdf): 완전한 회로도.
- [T5AI 핵심 실크스크린 (ASM)](/docs/hardware/t5ai-core/T5AI-Core_V101-ASM.pdf): 이 널을 위한 상세한 실크스크린 참고를 제공합니다.
- [T5AI-Core 3D 구조 파일 (STEP)](/docs/hardware/t5ai-core/T5AI-Core_V101-3D.step): 구조 설계 및 통합을위한 3D 모델을 제공합니다.

### T5 MCU 데이터 시트
- [T5-E1 모듈 데이터 시트](https://developer.tuya.com/en/docs/iot/T5-E1-Module-Datasheet?id=Kdar6hf0kzmfi): T5-E1 모듈의 기술 사양 및 핀 정의.
- [T5 MCU 칩 기술 자료표](https://images.tuyaeu.com/content-platform/hestia/1731549161e5fd8879de6.pdf): T5 시리즈의 종합 기술 사양 및 참조 문서.

### USB-to-serial 칩 드라이버 설치
T5AI-Core는 펌웨어 번쩍이고 디버깅을 위한 내장형 CH343 USB-to-serial 칩을 사용합니다. 운영 체제에 적합한 드라이버를 다운로드:

- [Windows 드라이버](https://www.wch-ic.com/downloads/CH343SER_ZIP.html)
- [리눅스 드라이버](https://github.com/WCHSoftGroup/ch343ser_linux)
- [macOS 드라이버](https://github.com/WCHSoftGroup/ch34xser_macos)


## 기술 문서 및 데모
- [T5AI (Environment 설정 및 플래시 데모)로 시작](/docs/quick-start/enviroment-setup)
- [T5AI 데모: Chatbots](/docs/cloud/device-ai/demo-your-chat-bot)
- [T5AI 데모: IoT 스마트 소켓 및 조명](/docs/cloud/iot-client/demo-tuya-iot-light)
- [T5AI 데모: Wi-Fi, Bluetooth 및 기타 주변 장치](/docs/examples/demo-generic-examples)
