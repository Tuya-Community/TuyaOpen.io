---
title: Generic 데모
description: "TuyaOpen generic 데모 예제 - 항목 (peripherals, Wi-Fi, BLE, 프로토콜, 그래픽)에 의해 준비 된 샘플 프로젝트. 빌드, 플래시, 각을 실행하여 API를 학습합니다."
keywords:
  - tuyaopen examples
  - iot sample projects
  - embedded demo projects
  - tuyaopen api examples
  - ble wifi demos
---

더 보기`examples/`나무는 주제 (peripherals, Wi-Fi, BLE, 프로토콜, 그래픽, 멀티미디어, 시스템 등)에 의해 그룹화 된 샘플 프로젝트를 준비합니다. 각은 구성, 빌드, 플래시, 실행할 수 있는 완전한 TuyaOpen 프로젝트입니다.

```bash
$ examples
├── ble
│   ├── ble_central
│   └── ble_peripher
├── e-Paper
│   ├── 1.54inch_e-Paper
│   ├── 2.13inch_e-Paper_Touch
│   └── 4.26inch_e-Paper
├── get-started
│   ├── cxx
│   └── sample_project
├── graphics
│   ├── lvgl_camera
│   ├── lvgl_demo
│   ├── lvgl_gif
│   ├── lvgl_label
│   ├── u8g2_i2c
│   ├── u8g2_spi
│   └── u8g2_tdl_disp
├── multimedia
│   ├── audio_kws
│   ├── audio_player
│   ├── audio_recorder
│   └── audio_vad
├── peripherals
│   ├── adc
│   ├── audio_codecs
│   ├── button
│   ├── camera
│   ├── display
│   ├── encoder
│   ├── flash
│   ├── gpio
│   ├── i2c
│   ├── imu
│   ├── ir
│   ├── joystick
│   ├── led
│   ├── leds-pixel
│   ├── pwm
│   ├── sd
│   ├── spi
│   ├── timer
│   ├── touch
│   ├── tp
│   ├── uart
│   └── watchdog
├── protocols
│   ├── http_client
│   ├── https_client
│   ├── mqtt_client
│   ├── tcp_client
│   └── tcp_server
├── system
│   ├── os_event
│   ├── os_kv
│   ├── os_mutex
│   ├── os_queue
│   ├── os_semaphore
│   ├── os_sw_timer
│   └── os_thread
├── tflite
│   └── tflite-helloworld
└── wifi
    ├── ap
    ├── low_power
    ├── scan
    └── sta
```

## 예제 카테고리
|(주)|어떤 것|한국어|
|----------|---------------|-----------|
|** 주변/**|GPIO, I2C, SPI, UART, PWM, ADC, 디스플레이, 오디오, 버튼, 카메라, IMU, LED, IR, 터치| [GPIO 자습서](/docs/peripheral/tutorials/gpio-interrupt-tutorial), [I2C 가이드](/docs/peripheral/tutorials/i2c-guide), [ADC 가이드](/docs/peripheral/tutorials/adc-guide), [센서 드라이버](/docs/peripheral/tutorials/writing-sensor-driver) |
|** 와이파이/**|역은, AP 형태, 스캐닝, 저출력 연결합니다| [Wi-Fi 튜토리얼](/docs/peripheral/tutorials/wifi-station-tutorial) |
|**시스템/**|실, 타이머, mutex, semaphore, 큐, 이벤트, KV 저장| [실 & 타이머 본](/docs/peripheral/tutorials/thread-timer-patterns) |
|**블/**|BLE 중앙 (scan + 연결) 및 주변 (광고 + GATT)| [BLE 센트럴](../peripheral/tutorials/ble-central-tutorial), [BLE 주변 명소 보기](../peripheral/tutorials/ble-peripheral-tutorial) |
|**프로토콜/**|HTTP/HTTPS 클라이언트, MQTT 클라이언트, TCP 클라이언트/서버| [HTTP 및 HTTPS (GET/POST, JSON)](../peripheral/tutorials/http-client-tutorial), [MQTT 클라이언트](../peripheral/tutorials/mqtt-client-tutorial), [TCP 및 UDP 소켓](../peripheral/tutorials/tcp-socket-tutorial) |
|** 그래픽/**|LVGL 데모, u8g2 I2C/SPI 디스플레이| [LVGL 소개](../peripheral/tutorials/lvgl-application-guide), [표시 드라이버 가이드](../peripheral/tutorials/display-driver-guide) |
|** 멀티미디어 **|키워드 스폿팅 (KWS), 오디오 플레이어, 레코더, VAD| [Audio Codec 가이드](/docs/peripheral/tutorials/audio-codec-guide) |
|**e-Paper/ **|E-paper 디스플레이 데모 (1.54", 2.13" 터치, 4.26")| |
|** 엘리트 / **|TensorFlow 라이트 마이크로 hello-world inference| |
|**get-started/**|Minimal 프로젝트 템플릿 및 C++ 예| |

## 프로젝트 선택
원하는 예로 이동:

```bash
cd examples/peripherals/gpio
```

널 윤곽을 선택하십시오:

```bash
tos.py config choice
```

:::note
대부분의 예는 기본적으로 T5AI입니다. ESP32의 경우, 목록에서 ESP32 config를 선택해야 할 수도 있고, 예를 들어`config/`이름 * 이름 *[ESP32 빠른 시작](/docs/hardware/espressif/esp32-quick-start)상세 정보
:::

## 예를 들어
```bash
tos.py build
tos.py flash
tos.py monitor
```

## 이름 *
- [TDD/TDL 드라이버 아키텍처](/docs/peripheral/driver-architecture)
- [ESP32 빠른 시작](/docs/hardware/espressif/esp32-quick-start)
- [Project 편집 가이드](/docs/build-system/compilation-guide)
