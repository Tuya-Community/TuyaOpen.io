---
title: T5AI-Board 개발 키트
description: "T5 AI 보드 개발 자습서 - AIoT 용 Tuya T5-E1 모듈의 음성 및 스크린 dev 키트. 빌드, 플래시, 및 TuyaOpen과 함께 가장자리 AI를 배포합니다."
keywords:
  - t5 ai board development tutorial
  - ai development board for edge computing
  - how to flash firmware on t5 ai board
  - tuya t5ai dev kit
  - edge ai development kit
---

T5AI-Board는 Tuya T5-E1-IPEX Wi-Fi 및 Bluetooth combo 모듈에 내장 된 음성 및 스크린 개발 보드입니다. 그것은 음성 상호 작용을 위한 2개의 마이크 및 1 스피커를 나르고, 가득 차있는 단위 핀아웃을 끊습니다 그래서 당신은 LCD와 사진기 더미 단위를 추가하거나 당신의 자신의 주변 장치를 타전할 수 있습니다. 표준 TuyaOpen 워크플로우로 AIoT 음성 및 디스플레이 애플리케이션을 프로토 타입으로 사용합니다.

![T5AI-Board 개발 보드, 전면보기](https://images.tuyacn.com/fe-static/docs/img/83859360-38f6-42c2-9614-99b47f487775.jpg)

## Software 빌드 구성
보드 레벨 구성 파일은 주변 드라이버, 핀 매핑, 보드 지원 패키지 (BSP) 및 타사 라이브러리와 같은 주요 기능 구성 요소를 정의합니다. 개발 보드의 사전 구성 보드 레벨 구성 파일을 사용함으로써 하드웨어 적응 및 드라이버 개발의 워크로드를 크게 줄일 수 있으므로 개발 효율성을 향상시킵니다.


:::tip 새로운 주변을 개발하는 것에 관심이 있습니까?
** 구성 기능:**
- ** 새 주변을 추가하려면 응용 레이어에서 드라이버를 직접 쓸 수 있습니다.** BSP 드라이버는 주로 보드에 통합 된 주변 장치를위한 것입니다.
- Peripheral 필요조건은 신청의 맞은편에 변화할지도 모릅니다. 특정 요구에 따라 구성 파일을 조정할 수 있습니다.
- 애플리케이션 요구 사항에 따라 타사 라이브러리 매개 변수를 구성해야 할 수도 있습니다.
- **recommended**는 board-level configuration**에 대한 **base 템플릿으로 초기 설정 파일을 사용하거나 프로젝트에 필요한대로 수정합니다.
:::

구성을 활성화하는 방법? 더 알아보기[CLI - tos.py 개발 도구 > 설정 선택](/docs/tos-tools/tos-guide#config-choice).

<table class="hw-config-flag-table">
  <tbody>
    <tr>
      <th>Build flag</th>
      <td><code>TUYA_T5AI_BOARD_LCD_3.5.config</code></td>
      <td>T5AI-Board + 3.5-inch screen BSP board configuration - <a href="https://github.com/tuya/TuyaOpen/blob/master/apps/tuya.ai/your_chat_bot/config/TUYA_T5AI_BOARD_LCD_3.5.config">Configuration file</a></td>
    </tr>
    <tr>
      <th>BSP driver source code</th>
      <td colspan="2"><a href="https://github.com/tuya/TuyaOpen/tree/master/boards/T5AI/TUYA_T5AI_BOARD">T5AI-Board BSP driver source code</a></td>
    </tr>
  </tbody>
</table>

---

## Hardware overview
The T5AI-Board is based on the T5-E1-IPEX module, an embedded Wi-Fi and Bluetooth combo module developed by Tuya. The board carries 2 microphones and 1 speaker, supporting voice recognition and playback to enable voice interaction.

Through the I/O connectors on the board, you can stack an LCD display module to add touchscreen and camera capture capabilities. You can also design your own LCD screen using the I2C, SPI, 8080, or RGB interface.

---

## 주요 특징
- Tuya T5 MCU 단위 (Wi-Fi 2.4 GHz + Bluetooth LE 5.4)
- 8 MB 플래시 메모리
- 16MB RAM
- Serial 펌웨어 다운로드 및 디버그 로깅
- 2채널 마이크
- 1채널 스피커
- TF 카드 구멍
- 완전한 단위 핀 breakout
- 내장 2.4 GHz Wi-Fi 안테나
- USB 호스트 인터페이스
- USB 전력 공급
- (선택적인 더미 단위) RGB565 전시 + DVP 사진기 지원

## 상세 사양
|제품 정보|주요 특징|
|---------|---------------|
|Onboard 단위|사이트맵|
|CPU의|ARMv8-M 스타 (M33F) @480 MHz|
|스낵 바|16 KB ITCM 및 16 KB DTCM|
|플래시 메모리|8 MB SiP 플래시 메모리|
|사이트맵|16메가바이트|
|SRAM 소개|640 KB 공유 SRAM|
|오디오 ADC|2 수로 16 비트 48 KHz|
|오디오 DAC|1채널 16비트 48KHz|
|본부|4 밴드 디지털 이퀄라이저|
|제품정보|DVP 공용영역|
|제품정보|RGB 및 8080 인터페이스|
|제품 정보|TF 카드 지원|
|사이트맵|56의 GPIOs|
|지원하다|2x SPI, 2x QSPI, 3x UART, 2x I2C, 1x SDIO, 1x CAN, 12x PWM 및 3x I2S|
|제품 정보|고분고분한 IEEE 802.11b/g/n/ax|
|블루투스|블루투스 LE 5.4|
|USB 유형 C|입력: 5V@1A의 펌웨어 다운로드 및 디버깅|

---

## Pinout
The T5AI-Board provides comprehensive pinout options through its expansion headers. Here is a detailed breakdown of the available pins and their functionalities.

![T5AI-Board pinout](https://images.tuyacn.com/fe-static/docs/img/6b7ab959-0635-4293-991b-b8dda293614b.jpg)

### Download high-resolution pinout diagram
[![Download high-resolution T5AI-Board pinout diagram (PDF)](https://img.shields.io/badge/V102-Download%20PDF%20Illustration-orange?style=for-the-badge)](/docs/hardware/T5-AI-Board-Pinout-v102.pdf)

---

## LCD와 사진기 단위
T5AI-Board는 Baseboard에 겹쳐 쌓이는 선택적인 LCD와 사진기 단위를 지원합니다.

### 전시 명세
- 3.5" 320 × 480 RGB 해결책을 가진 TFT 전시
- TFT 전시 운전사:`ILI9488`
- 터치 패널 드라이버:`GT1151QM`

### 사진기 명세
- 이미지 감지기:`GC2145`
- 해상도: 2 MP (1616 × 1232 픽셀)
- I2C 통신 주소:`0x78`이름 *`0x79`
- [카메라 데이터 시트 보기](https://e2e.ti.com/cfs-file/__key/communityserver-discussions-components-files/968/GC2145-CSP-DataSheet-release-V1.0_5F00_20131201.pdf)

### Pin 윤곽
뒤에 오는 도표는 LCD와 사진기 단위에 의해 이용된 핀 과제를 보여줍니다:

![겹쳐 쌓이는 LCD와 사진기 단위를 위한 Pin 할당](https://images.tuyacn.com/content-platform/hestia/173693668247bb1930ac5.png)

:::info 중요 사항
- 카메라 및 터치 패널은 일반적인 I2C 인터페이스를 공유합니다.
- TF 카드 핀`DATA3`이름 *`DATA2`펌웨어 업데이트를 위한 모듈의 UART 포트와 공유됩니다.
:::


## 지원하다
### T5AI-Board 개발 보드
- [T5AI-Board schematic 도표](https://images.tuyacn.com/content-platform/hestia/174243908480e34e64d08.pdf): 완전한 회로도.
- [T5AI-Board 핀아웃](/docs/hardware/T5-AI-Board-Pinout-v102.pdf): 상세 핀 매핑 및 인터페이스 레이아웃.
- [LCD 및 카메라 모듈의 Schematic 다이어그램](https://images.tuyacn.com/content-platform/hestia/17387200670bcae1561bf.pdf): LCD 및 카메라 모듈 보드의 회로도.
- [T5AI-Board 3D 구조 파일 (LCD+Base-Board) (STEP)](/docs/hardware/t5ai-board/T5-BOARD_V102-3D.zip): 구조 설계 및 통합을위한 3D 모델을 제공합니다.

### T5 MCU 데이터 시트
- [T5-E1-IPEX 모듈 데이터 시트](https://developer.tuya.com/en/docs/iot/T5-E1-IPEX-Module-Datasheet?id=Kdskxvxe835tq#title-12-Pin%20definition): T5-E1-IPEX 모듈의 기술 사양 및 핀 정의.
- [T5 MCU 칩 기술 자료표](https://images.tuyaeu.com/content-platform/hestia/1731549161e5fd8879de6.pdf): T5 시리즈의 종합 기술 사양 및 참조 문서.

### USB-to-serial 칩 드라이버 설치
T5AI-Board는 펌웨어 번쩍이고 디버깅을 위한 내장형 CH343 USB-to-serial 칩을 사용합니다. 운영 체제에 적합한 드라이버를 다운로드:

- [Windows 드라이버](https://www.wch-ic.com/downloads/CH343SER_ZIP.html)
- [리눅스 드라이버](https://github.com/WCHSoftGroup/ch343ser_linux)
- [macOS 드라이버](https://github.com/WCHSoftGroup/ch34xser_macos)

## 기술 문서 및 데모
- [T5AI-Board (환경 설정 및 플래시 데모)로 시작](/docs/quick-start/enviroment-setup)
- [T5AI-Board 데모: Chatbots](/docs/cloud/device-ai/demo-your-chat-bot)
- [T5AI-Board 데모: IoT 스마트 소켓 및 조명](/docs/cloud/iot-client/demo-tuya-iot-light)
- [T5AI-Board 데모: Wi-Fi, Bluetooth 및 기타 주변 장치](/docs/examples/demo-generic-examples)
