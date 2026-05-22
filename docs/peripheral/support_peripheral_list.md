---
title: Peripheral Driver List
---

# Peripheral Driver List

TDD (Tuya Device Driver) implementations available in the TuyaOpen SDK. Each driver plugs into the corresponding TDL (Tuya Driver Layer) via the [registration pattern](driver-architecture).

## Input Devices

| Device | Supported Chips | Base Driver | TDD Source |
|--------|----------------|-------------|-----------|
| Button (GPIO) | All platforms | GPIO | `src/peripherals/button/tdd_button/` |
| Joystick | ADC-capable | ADC | `src/peripherals/joystick/tdd_joystick/` |
| Encoder (rotary) | All platforms | GPIO | `src/peripherals/encoder/` |

## Output Devices

| Device | Supported Chips | Base Driver | TDD Source |
|--------|----------------|-------------|-----------|
| LED (GPIO) | All platforms | GPIO | `src/peripherals/led/tdd_led/` |
| WS2812 (addressable LED) | All platforms | SPI/RMT | `src/peripherals/leds_pixel/tdd_leds_pixel/` |
| SM16703P (addressable LED) | All platforms | SPI/RMT | `src/peripherals/leds_pixel/tdd_leds_pixel/` |
| YX1903B (addressable LED) | All platforms | SPI/RMT | `src/peripherals/leds_pixel/tdd_leds_pixel/` |
| IR transmitter/receiver | All platforms | GPIO/Timer | `src/peripherals/ir/tdd_ir_driver/` |

## Display

| Device | Interface | TDD Source |
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
| SSD1306 (OLED) | I2C | `boards/ESP32/common/lcd/` |
| SH8601 (AMOLED) | QSPI | `boards/ESP32/common/lcd/` |

## Touch

| Device | Interface | TDD Source |
|--------|-----------|-----------|
| CST816x | I2C | `src/peripherals/tp/tdd_tp/` |
| CST92xx | I2C | `src/peripherals/tp/tdd_tp/` |
| FT5x06 / FT6336 | I2C | `src/peripherals/tp/tdd_tp/` |
| GT911 | I2C | `src/peripherals/tp/tdd_tp/` |
| GT1151 | I2C | `src/peripherals/tp/tdd_tp/` |

## Audio

| Device | Interface | TDD Source |
|--------|-----------|-----------|
| Platform audio (T5AI) | I2S | `src/peripherals/audio_codecs/tdd_audio/` |
| ALSA (Linux) | ALSA | `src/peripherals/audio_codecs/tdd_audio/` |
| ES8311 | I2S + I2C | `boards/ESP32/common/audio/` |
| ES8388 | I2S + I2C | `boards/ESP32/common/audio/` |
| ES8389 | I2S + I2C | `boards/ESP32/common/audio/` |
| No-codec (DAC) | I2S / DAC | `boards/ESP32/common/audio/` |

## Camera

| Device | Interface | TDD Source |
|--------|-----------|-----------|
| OV2640 | DVP | `src/peripherals/camera/tdd_camera/` |
| GC2145 | DVP | `src/peripherals/camera/tdd_camera/` |

## Other

| Device | Interface | TDD Source |
|--------|-----------|-----------|
| UART transport | UART | `src/peripherals/transport/tdd_transport/` |
| BMI270 (IMU) | I2C | `src/peripherals/imu/bmi270/` (vendor library, not TDL/TDD) |
| AXP2101 (PMIC) | I2C | `src/peripherals/pmic/axp2101/` (vendor library) |
| XL9555 (IO expander) | I2C | `boards/ESP32/common/io_expander/` |
| TCA9554 (IO expander) | I2C | `boards/ESP32/common/io_expander/` |

## References

- [TDD/TDL Driver Architecture](driver-architecture)
- [Writing a New Sensor Driver](tutorials/writing-sensor-driver)
- [Display Driver Guide](tutorials/display-driver-guide)
- [Audio Codec Guide](tutorials/audio-codec-guide)
