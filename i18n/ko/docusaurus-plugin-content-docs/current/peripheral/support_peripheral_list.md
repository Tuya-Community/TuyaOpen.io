---
title: 주변 드라이버 목록
description: "TuyaOpen의 TDD 구현의 Peripheral 드라이버 목록 : 버튼, 조이스틱, 인코딩, LED, 주소 LED, IR 및 디스플레이 드라이버."
keywords:
  - peripheral driver list
  - tdd
  - led
  - display
  - tuyaopen peripheral
---

이 페이지는 TuyaOpen SDK에서 TDD (Tuya Device Driver) 구현을 나열합니다. 해당 TDL(Tuya Driver Layer)에 각 드라이버 플러그[등록 패턴](driver-architecture).

## 입력 장치
|제품정보|지원된 칩|기본 드라이버|TDD 소스|
|--------|----------------|-------------|-----------|
|버튼 (GPIO)|모든 플랫폼|사이트맵| `src/peripherals/button/tdd_button/` |
|조이스틱|ADC 충전|사이트맵| `src/peripherals/joystick/tdd_joystick/` |
|인코더 (rotary)|모든 플랫폼|사이트맵| `src/peripherals/encoder/` |

## 출력 장치
|제품정보|지원된 칩|기본 드라이버|TDD 소스|
|--------|----------------|-------------|-----------|
|LED (GPIO)|모든 플랫폼|사이트맵| `src/peripherals/led/tdd_led/` |
|WS2812 (접촉식 LED)|모든 플랫폼|SPI/RMT의 장점| `src/peripherals/leds_pixel/tdd_leds_pixel/` |
|SM16703P (접촉 가능한 LED)|모든 플랫폼|SPI/RMT의 장점| `src/peripherals/leds_pixel/tdd_leds_pixel/` |
|YX1903B (접촉식 LED)|모든 플랫폼|SPI/RMT의 장점| `src/peripherals/leds_pixel/tdd_leds_pixel/` |
|IR 송신기 / 수신기|모든 플랫폼|GPIO/시간| `src/peripherals/ir/tdd_ir_driver/` |

## 제품정보
|제품정보|지원하다|TDD 소스|
|--------|-----------|-----------|
|ILI9341의|·| `src/peripherals/display/tdd_display/` |
|모델 번호: ILI9488|RGB RGB| `src/peripherals/display/tdd_display/` |
|사이트맵|SPI/MCU 8080년| `src/peripherals/display/tdd_display/` |
|사이트맵|SPI 및 QSPI| `src/peripherals/display/tdd_display/` |
|사이트맵|MCU 8080년| `src/peripherals/display/tdd_display/` |
|ST7701S / ST7701SN의|RGB RGB| `src/peripherals/display/tdd_display/` |
|모델 번호: ST7305|·| `src/peripherals/display/tdd_display/` |
|사이트맵|·| `src/peripherals/display/tdd_display/` |
|사이트맵|·| `src/peripherals/display/tdd_display/` |
|사이트맵|사이트맵| `src/peripherals/display/tdd_display/` |
|사이트맵|사이트맵| `src/peripherals/display/tdd_display/` |
|모델 번호: UC8276|·| `src/peripherals/display/tdd_display/` |
|SSD1306 (OLED)|I2C 정보| `boards/ESP32/common/lcd/` |
|SH8601 (아모 LED)|사이트맵| `boards/ESP32/common/lcd/` |

## 제품정보
|제품정보|지원하다|TDD 소스|
|--------|-----------|-----------|
|사이트맵|I2C 정보| `src/peripherals/tp/tdd_tp/` |
|사이트맵|I2C 정보| `src/peripherals/tp/tdd_tp/` |
|피트5x06 / FT6336|I2C 정보| `src/peripherals/tp/tdd_tp/` |
|사이트맵|I2C 정보| `src/peripherals/tp/tdd_tp/` |
|사이트맵|I2C 정보| `src/peripherals/tp/tdd_tp/` |

## 언어: 영어
|제품정보|지원하다|TDD 소스|
|--------|-----------|-----------|
|플랫폼 오디오 (T5AI)|I2S 정보| `src/peripherals/audio_codecs/tdd_audio/` |
|ALSA (리눅스)|사이트맵| `src/peripherals/audio_codecs/tdd_audio/` |
|사이트맵|I2S + I2C의 특징| `boards/ESP32/common/audio/` |
|사이트맵|I2S + I2C의 특징| `boards/ESP32/common/audio/` |
|사이트맵|I2S + I2C의 특징| `boards/ESP32/common/audio/` |
|코드 없음 (DAC)|모델 번호: I2S| `boards/ESP32/common/audio/` |

## 제품정보
|제품정보|지원하다|TDD 소스|
|--------|-----------|-----------|
|사이트맵|사이트맵| `src/peripherals/camera/tdd_camera/` |
|사이트맵|사이트맵| `src/peripherals/camera/tdd_camera/` |

## 이름 *
|제품정보|지원하다|TDD 소스|
|--------|-----------|-----------|
|UART 수송|우아트| `src/peripherals/transport/tdd_transport/` |
|BMI270 (마이우)|I2C 정보| `src/peripherals/imu/bmi270/`(벤더 라이브러리, TDL/TDD)|
|AXP2101 (주)|I2C 정보| `src/peripherals/pmic/axp2101/`(벤더 라이브러리)|
|XL9555 (IO 확장자)|I2C 정보| `boards/ESP32/common/io_expander/` |
|TCA9554 (IO 확장자)|I2C 정보| `boards/ESP32/common/io_expander/` |

## 더 보기
- [TDD/TDL 드라이버 아키텍처](driver-architecture)
- [새로운 센서 드라이버 작성](tutorials/writing-sensor-driver)
- [표시 드라이버 가이드](tutorials/display-driver-guide)
- [Audio Codec 가이드](tutorials/audio-codec-guide)
