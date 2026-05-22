---
title: 外设驱动列表
---

# 外设驱动列表

TuyaOpen SDK 中的 TDD（Tuya Device Driver）实现。各驱动通过 [注册模式](driver-architecture) 挂接到对应 TDL（Tuya Driver Layer）。

## 输入设备

| 设备 | 适用芯片 | 基础驱动 | TDD 源码路径 |
|--------|----------------|-------------|-----------|
| 按键（GPIO） | 各平台 | GPIO | `src/peripherals/button/tdd_button/` |
| 摇杆 | 支持 ADC 的平台 | ADC | `src/peripherals/joystick/tdd_joystick/` |
| 旋转编码器 | 各平台 | GPIO | `src/peripherals/encoder/` |

## 输出设备

| 设备 | 适用芯片 | 基础驱动 | TDD 源码路径 |
|--------|----------------|-------------|-----------|
| LED（GPIO） | 各平台 | GPIO | `src/peripherals/led/tdd_led/` |
| WS2812（可寻址灯） | 各平台 | SPI/RMT | `src/peripherals/leds_pixel/tdd_leds_pixel/` |
| SM16703P（可寻址灯） | 各平台 | SPI/RMT | `src/peripherals/leds_pixel/tdd_leds_pixel/` |
| YX1903B（可寻址灯） | 各平台 | SPI/RMT | `src/peripherals/leds_pixel/tdd_leds_pixel/` |
| 红外收发 | 各平台 | GPIO/Timer | `src/peripherals/ir/tdd_ir_driver/` |

## 显示

| 设备 | 接口 | TDD 源码路径 |
|--------|-----------|-----------|
| ILI9341 | SPI | `src/peripherals/display/tdd_display/` |
| ILI9488 | RGB | `src/peripherals/display/tdd_display/` |
| ST7789 | SPI / MCU 8080 | `src/peripherals/display/tdd_display/` |
| ST7735S | SPI / QSPI | `src/peripherals/display/tdd_display/` |
| ST7796S | MCU 8080 | `src/peripherals/display/tdd_display/` |
| ST7701S / ST7701SN | RGB | `src/peripherals/display/tdd_display/` |
| ST7305 / ST7306 | SPI | `src/peripherals/display/tdd_display/` |
| GC9A01 | SPI | `src/peripherals/display/tdd_display/` |
| GC9D01 | SPI | `src/peripherals/display/tdd_display/` |
| CO5300 | QSPI | `src/peripherals/display/tdd_display/` |
| NV3041 | QSPI | `src/peripherals/display/tdd_display/` |
| UC8276 | SPI | `src/peripherals/display/tdd_display/` |
| SSD1306（OLED） | I2C | `boards/ESP32/common/lcd/` |
| SH8601（AMOLED） | QSPI | `boards/ESP32/common/lcd/` |

## 触摸

| 设备 | 接口 | TDD 源码路径 |
|--------|-----------|-----------|
| CST816x | I2C | `src/peripherals/tp/tdd_tp/` |
| CST92xx | I2C | `src/peripherals/tp/tdd_tp/` |
| FT5x06 / FT6336 | I2C | `src/peripherals/tp/tdd_tp/` |
| GT911 | I2C | `src/peripherals/tp/tdd_tp/` |
| GT1151 | I2C | `src/peripherals/tp/tdd_tp/` |

## 音频

| 设备 | 接口 | TDD 源码路径 |
|--------|-----------|-----------|
| 平台音频（T5AI） | I2S | `src/peripherals/audio_codecs/tdd_audio/` |
| ALSA（Linux） | ALSA | `src/peripherals/audio_codecs/tdd_audio/` |
| ES8311 | I2S + I2C | `boards/ESP32/common/audio/` |
| ES8388 | I2S + I2C | `boards/ESP32/common/audio/` |
| ES8389 | I2S + I2C | `boards/ESP32/common/audio/` |
| No-codec（DAC） | I2S / DAC | `boards/ESP32/common/audio/` |

## 摄像头

| 设备 | 接口 | TDD 源码路径 |
|--------|-----------|-----------|
| OV2640 | DVP | `src/peripherals/camera/tdd_camera/` |
| GC2145 | DVP | `src/peripherals/camera/tdd_camera/` |

## 其他

| 设备 | 接口 | TDD 源码路径 |
|--------|-----------|-----------|
| UART 传输 | UART | `src/peripherals/transport/tdd_transport/` |
| BMI270（IMU） | I2C | `src/peripherals/imu/bmi270/`（厂商库，非标准 TDL/TDD） |
| AXP2101（PMIC） | I2C | `src/peripherals/pmic/axp2101/`（厂商库） |
| XL9555（IO 扩展） | I2C | `boards/ESP32/common/io_expander/` |
| TCA9554（IO 扩展） | I2C | `boards/ESP32/common/io_expander/` |

## 参考

- [TDD/TDL 驱动架构](driver-architecture)
- [编写新传感器驱动](tutorials/writing-sensor-driver)
- [显示驱动指南](tutorials/display-driver-guide)
- [音频 Codec 指南](tutorials/audio-codec-guide)
