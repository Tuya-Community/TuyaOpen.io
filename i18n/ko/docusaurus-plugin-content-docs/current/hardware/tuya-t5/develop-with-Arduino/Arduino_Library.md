---
title: Arduino Ecosystem 도서관 적응
description: "TUYA-T5AI 보드에 대한 Arduino 생태계 라이브러리 적응 - SPI LCD 디스플레이 개발을위한 TFT eSPI와 같은 Arduino 확장 라이브러리를 적합합니다."
keywords:
  - arduino library
  - tft_espi
  - t5ai
  - tuyaopen hardware
  - display
---

Arduino 생태계는 확장 라이브러리의 풍부한 컬렉션을 제공합니다. 이 가이드는 TFT eSPI 디스플레이 라이브러리를 사용하여 TUYA-T5AI 시리즈 개발 보드에 대한 Arduino 확장 라이브러리를 작업하는 방법을 보여줍니다.

## 디스플레이 라이브러리: TFT eSPI
더 보기`TFT_eSPI`라이브러리는 SPI를 통해 LCD 화면을 구동하는 Arduino 라이브러리입니다. 초기화, 텍스트 렌더링 및 그래픽 도면을 포함하여 디스플레이를 제어하기위한 API의 풍부한 세트를 제공합니다.`TFT_eSPI`지금 TUYA-T5AI 시리즈를 위해 적응됩니다, 그래서 당신은 이 널에 스크린 전시 발달을 위해 그것을 사용할 수 있습니다.

### 도서관 추가
1. 저장소 다운로드:[TFT eSPI 저장소](https://github.com/maidang-xing/TFT_eSPI).

2. Arduino 라이브러리 디렉토리에 저장소를 복사합니다. ** Arduino IDE ** -> ** 파일** -> ** 설정** -> ** 스케치북 위치 **.

3. Arduino IDE를 재시작하고 예제를 엽니다.`File > Examples > TFT_eSPI > Generic > Gradient_Fill`, 일치 보드 모델을 선택, 다음 컴파일 및 업로드.

#### 하드웨어 정보
|제품 정보|제품 설명|
| ---- | --------- |
|회사연혁|TUYA T5AI 시리즈|
|제품정보|1.54-인치 TFT LCD|
|운전사 IC|사이트맵|
|제품 설명| 240 × 240 |
|지원하다|·|
|화소 체재|사이트맵|
|플랫폼 매크로| `ARDUINO_TUYA_T5AI_CORE` `ARDUINO_TUYA_T5AI_BOARD` |

** LCD 핀 정의: **

|제품정보|사이트맵|이름 *|
| -------- | ---- | ----------- |
|스파이 SCLK| 14 |SPI 시계|
|SPI 모시| 16 |SPI 데이터 출력|
|스파이 MISO| 17 |SPI 데이터 입력 (이 경우 사용하지 않음)|
|스파이 CS| 15 |SPI 칩 선택|
|DC 전원| 18 |Data/Command 선택|
|사이트맵| 6 |스크린 리셋|
|제품정보| 5 |역광선 통제 (활동적인 높은)|

:::note
LCD 드라이버, 화면 크기, 장치 핀 매핑, 글꼴 및 기타 구성 세부 사항 정의`User_Setups/Setup_TUYA_T5AI_ST7789.h`. 이 파일을 수정하여 라이브러리를 자신의 요구 사항에 맞게 수정합니다.
:::

#### 인증 및 인증
Arduino IDE에서:

1. Board **TUYA-T5AI 시리즈**를 선택하고 하드웨어를 올바르게 연결하십시오.
2. 어떤 TFT eSPI 예제를 엽니 다 (예를 들어,`File > Examples > TFT_eSPI > Generic > Gradient_Fill`).
3. 클릭 **Verify/Compile**.
4. 빌드 성공 확인 (오류 없음; 경고 무시 될 수 있습니다).
5. Click**Upload** 펌웨어를 플래시합니다.
