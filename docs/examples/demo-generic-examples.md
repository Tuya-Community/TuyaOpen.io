---
title: Generic Demos
---

# Generic Demos

TuyaOpen provides a variety of example projects to help you quickly familiarize yourself with and master the usage of TuyaOpen, significantly reducing the learning curve.

```bash
$ examples
├── ble
│   ├── ble_central
│   └── ble_peripher
├── e-Paper
│   ├── 1.54inch_e-Paper
│   ├── 2.13inch_e-Paper
│   └── 2.9inch_e-Paper
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

## Example Categories

| Category | What it covers | Tutorials |
|----------|---------------|-----------|
| **peripherals/** | GPIO, I2C, SPI, UART, PWM, ADC, display, audio, button, camera, IMU, LED, IR, touch | [GPIO Tutorial](/docs/peripheral/tutorials/gpio-interrupt-tutorial), [I2C Guide](/docs/peripheral/tutorials/i2c-guide), [ADC Guide](/docs/peripheral/tutorials/adc-guide), [Sensor Driver](/docs/peripheral/tutorials/writing-sensor-driver) |
| **wifi/** | Station connect, AP mode, scanning, low power | [Wi-Fi Tutorial](/docs/peripheral/tutorials/wifi-station-tutorial) |
| **system/** | Threads, timers, mutex, semaphore, queue, events, KV storage | [Thread & Timer Patterns](/docs/peripheral/tutorials/thread-timer-patterns) |
| **ble/** | BLE central (scan + connect) and peripheral (advertise + GATT) | |
| **protocols/** | HTTP/HTTPS client, MQTT client, TCP client/server | [HTTP and HTTPS (GET/POST, JSON)](../peripheral/tutorials/http-client-tutorial), [MQTT Client](../peripheral/tutorials/mqtt-client-tutorial), [TCP and UDP sockets](../peripheral/tutorials/tcp-socket-tutorial) |
| **graphics/** | LVGL demos, u8g2 I2C/SPI displays | [Display Driver Guide](/docs/peripheral/tutorials/display-driver-guide) |
| **multimedia/** | Keyword spotting (KWS), audio player, recorder, VAD | [Audio Codec Guide](/docs/peripheral/tutorials/audio-codec-guide) |
| **e-Paper/** | E-paper display demos (1.54", 2.13", 2.9") | |
| **tflite/** | TensorFlow Lite Micro hello-world inference | |
| **get-started/** | Minimal project template and C++ example | |

## Select a project to build

Navigate to the desired example:

```bash
cd examples/peripherals/gpio
```

Select the board configuration:

```bash
tos.py config choice
```

:::note
Most examples default to T5AI. For ESP32, you may need to select an ESP32 config from the list, or create one in the example's `config/` directory. See the [ESP32 Quick Start](/docs/hardware-specific/espressif/esp32-quick-start) for details.
:::

## Build the example

```bash
tos.py build
tos.py flash
tos.py monitor
```

## References

- [TDD/TDL Driver Architecture](/docs/peripheral/driver-architecture)
- [ESP32 Quick Start](/docs/hardware-specific/espressif/esp32-quick-start)
- [Project Compilation Guide](/docs/build-system/compilation-guide)
