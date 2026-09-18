---
title: "라즈베리 파이 5 GPIO 참조"
description: "라즈베리 파이 5 GPIO 참조 40 핀 헤더 핀 아웃과 RP1 기능 mux 테이블 레이팅 SPI, I2C, PWM, UART 및 오디오 신호를."
keywords:
  - raspberry pi 5
  - gpio pinout
  - tuyaopen hardware
  - rp1
  - pin mapping
---

40 핀 헤더 핀 아웃과 RP1 기능 - 마우스 테이블 라즈베리 파이 5. GPIO 라인은 SPI, I2C, PWM, UART, 또는 TuyaOpen 주변 예제를 배선 할 때 필요한 오디오 신호를 제공합니다.

## Pinout 도표
![라즈베리 파이 40 핀 GPIO 헤더 핀 아웃, 파워, 접지 및 핀 당 신호 기능 표시](https://images.tuyacn.com/fe-static/docs/img/4154ba76-67b8-4330-a824-585c7467e30d.png)

- ** 이미지 소스 **:[무작위 Nerd 자습서](https://randomnerdtutorials.com/raspberry-pi-pinout-gpios/)
- **License**: 공식 자료에 근거하여[라즈베리 파이](https://www.raspberrypi.com/), 밑에 허가하는[CC BY-SA 4.0에](https://creativecommons.org/licenses/by-sa/4.0/)
- **Applicable 모델 ** : 40 핀 라즈베리 파이 모델과 같은 라즈베리 파이 4B 및 5

## RP1 기능 mux 테이블
RP1는 라즈베리 파이 5 I / O 컨트롤러입니다. 그것의 기능 구획 및 그들의 GPIO 배치는 라즈베리 파이 4 모형 B의 40 핀 우두머리에 사용자 직면 기능을 일치하기 위하여 디자인됩니다.

|사이트맵|· 1|F2를|F3의|F4의|F5를|공장 투어|사이트맵|사이트맵|F9를|
|:----:|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| 0 |SPI0 SIO[3]|사이트맵|사이트맵|사이트맵|SYS RIO[0]에 대하여|[0]|한국어 [KR]한국어|사이트 맵| |
| 1 |SPI0 SIO[2]에 대하여|사이트맵|사이트맵|사이트맵|SYS RIO[1]|PROC RIO[1]|한국어[1]|SPI2 SIO[1]| |
| 2 |SPI0 CSn[3]|사이트맵|사이트맵|사이트맵|UART0 IR RX의 특징|SYS RIO[2]에 대하여|[2]|한국어 [KR]한국어|SPI2 SIO[0]|
| 3 |SPI0 CSn[2]|사이트맵|사이트맵|I2C1 스클|다운로드|SYS RIO[3]에 대하여|[3]|한국어 [KR]한국어|사이트맵|
| 4 |GPCLK[0]|사이트맵|사이트맵|사이트맵|사이트맵|SYS RIO[4]에 대하여|[4]|한국어 [KR]한국어|SPI3 CSn[0]|
| 5 |GPCLK[1]|사이트맵|사이트맵|I2C2 스클|사이트맵|사이트맵|사이트맵|한국어 [KR]한국어|SPI3 SIO[1]|
| 6 |GPCLK[2]|사이트맵|사이트맵|사이트맵|사이트맵|SYS RIO[6]에 대하여|[6]|한국어 [KR]한국어|SPI3 SIO[0]|
| 7 |SPI0 CSn[1]|사이트맵|다운로드|I2C3 스클|사이트맵|SYS RIO[7]에 대하여|PROC RIO[7]에 대하여|한국어 [KR]한국어|스파이3 SCLK|
| 8 |사이트 맵|사이트맵|사이트맵|사이트맵|SYS RIO[8]에 대하여|[8]|한국어 [KR]한국어|사이트 맵| |
| 9 |SPI0 SIO[1]|사이트맵|사이트맵|사이트맵|한국어 [KR]한국어|사이트맵|여관[9]|SPI4 SIO[0]에 대하여| |
| 10 |SPI0 SIO[0]에 대하여|사이트맵|사이트맵|사이트맵|SYS RIO[10]에 대하여|사이트맵|한국어 [KR]한국어|SPI4 SIO[1]| |
| 11 |사이트맵|사이트맵|다운로드|I2C1 스클|SYS RIO[11]   한국어|[11]|한국어 [KR]한국어|스파이크| |
| 12 |PWM0[0]|사이트맵|사이트맵|사이트맵|오디오 OUT L|[12]|[12]|한국어 [KR]한국어|SPI5 CSn[0]|
| 13 |PWM0[1]|사이트맵|사이트맵|I2C2 스클|오디오 OUT R|SYS RIO[13]   한국어|PROC RIO[13]에 대하여|한국어 [KR]한국어|SPI5 SIO[1]|
| 14 |PWM0[2]|사이트맵|사이트맵|사이트맵|사이트맵|SYS RIO[14]에 대하여|PROC RIO[14]에 대하여|한국어 [KR]한국어|SPI5 SIO[0]|
| 15 |PWM0[3]|사이트맵|사이트맵|I2C3 스클|사이트맵|SYS RIO[15]   한국어|PROC RIO[15]에 대하여|한국어 [KR]한국어|사이트맵|
| 16 |SPI1 CSn[2]|사이트맵|사이트맵|사이트맵|SYS RIO[16]   한국어|[16]|한국어 [KR]한국어| | |
| 17 |SPI1 CSn[1]|사이트맵|사이트맵|사이트맵|[17]|[17]|한국어 [KR]한국어| | |
| 18 |SPI1 CSn[0]|사이트맵|I2S0 클립|PWM0[2]|I2S1 클립|SYS RIO[18]에 대하여|[18]|한국어 [KR]한국어|GPCLK[1]|
| 19 |SPI1 SIO[1]|사이트맵|사이트맵|PWM0[3]|사이트맵|SYS RIO[19]에 대하여|PROC RIO(19년)|한국어 [KR]한국어| |
| 20 |SPI1 SIO[0]에 대하여|사이트맵|I2S0 SDI[0]에 대하여|GPCLK[0]|I2S1 SDI[0]에 대하여|SYS RIO[20]   한국어|PROC RIO(20년)|한국어 [KR]한국어| |
| 21 |스파이크|사이트맵|I2S0 SDO[0]에 대하여|GPCLK[1]|I2S1 스도[0]|SYS RIO[21]에 대하여|[21]|한국어 [KR]한국어| |
| 22 |사이트맵|사이트맵|I2S0 SDI[1]|사이트맵|I2S1 SDI[1]|SYS RIO(22년)|PROC RIO(22년)|한국어 [KR]한국어| |
| 23 |사이트맵|사이트맵|I2S0 SDO[1]|I2C3 스클|I2S1 SDO[1]|SYS RIO[23]에 대하여|PROC RIO[23]에 대하여|한국어 [KR]한국어| |
| 24 |사이트 맵|사이트맵|I2S0 SDI[2]에 대하여|I2S1 SDI[2]에 대하여|SYS RIO[24]|PROC RIO(24년)|한국어 [KR]한국어|SPI2 CSn[1]| |
| 25 |SDIO0 DAT[1]|사이트맵|I2S0 SDO[2]에 대하여|사이트맵|I2S1 스도[2]|SYS RIO[25]에 대해|PROC RIO(25년)|한국어 [KR]한국어|SPI3 CSn[1]|
| 26 |사이트 맵|사이트맵|I2S0 SDI[3]에 대하여|오디오 IN DAT0|I2S1 SDI[3]에 대하여|SYS RIO[26]   한국어|PROC RIO(26년)|한국어 [KR]한국어|SPI5 CSn[1]|
| 27 |사이트 맵|사이트맵|I2S0 SDO[3]|오디오 IN DAT1|I2S1 스도[3]|SYS RIO[27]에 대하여|[27]|피오[27]|SPI1 CSn[1]|

:::note
리눅스에서,`TUYA_GPIO_NUM_E`gpiochip 선 상쇄로 해석됩니다. Raspberry Pi에서는 보통이 테이블에서 BCM GPIO 번호를 일치하지만, 디트로 또는 커널 구성에 따라 다를 수 있습니다. 계정 만들기`gpioinfo`또는`pinctrl`.
:::

## 더 보기
- [라즈베리 파이 Peripherals](/docs/hardware/Linux/raspberry-pi/Examples/peripherals-raspberry-pi)— GPIO, I2C, SPI, PWM 및 UART 예제를 실행합니다.
