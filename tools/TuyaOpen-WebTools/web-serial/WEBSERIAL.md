# TuyaOpen-WebSerial

[Back to Home](README.md) | [中文版](WEBSERIAL_zh.md)

**One-stop Serial Development Tool Based on Chrome Web Serial API**

## Overview

TuyaOpen-WebSerial is a powerful modern web serial tool that supports serial debugging, firmware flashing, and TuyaOpen authorization. No software installation required - complete all operations directly in your browser.

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![Chrome](https://img.shields.io/badge/Chrome-89%2B-green.svg)](https://www.google.com/chrome/)
[![Web Serial API](https://img.shields.io/badge/Web%20Serial%20API-supported-brightgreen.svg)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API)

## Key Features

### Serial Debugging
- **Real-time Serial Communication**: Support for multiple baud rates and serial parameter configurations
- **Smart Data Display**: Automatic timestamps, HEX/ASCII mode switching
- **Error Log Analysis**: Automatic detection and analysis of common error patterns
- **Quick Commands**: Customizable quick send buttons
- **Data Export**: Support for log saving and export functionality
- **Fullscreen Mode**: Focused debugging experience

### Firmware Flashing
- **Multi-chip Support**: 
  - **T5AI/T3**: TuyaOpen series chips
  - **ESP32 Series**: Based on esptool-js, supports automatic detection of all ESP32 chips
- **Smart Flashing**: Automatic chip detection and parameter configuration
- **Progress Monitoring**: Real-time display of flashing progress and speed
- **Debug Mode**: Detailed flashing logs and error diagnostics
- **Resume Support**: Support for recovery after flashing interruption

### TuyaOpen Authorization
- **Authorization Code Writing**: Support for UUID and AUTH_KEY writing for TuyaOpen projects
- **Device Authorization**: One-click device authorization configuration
- **Security Verification**: Ensure correctness and security of authorization information

### Internationalization Support
- **Multi-language Interface**: Support for 10 languages including Chinese, English, Japanese, Korean
- **Dynamic Switching**: Switch languages without page refresh
- **Localization Adaptation**: Complete UI text localization

## Technical Architecture

### Core Technology Stack
- **Frontend Framework**: Native JavaScript + Modular Architecture
- **Serial Communication**: Chrome Web Serial API
- **Firmware Flashing**: Integrated esptool-js and custom downloaders
- **UI Framework**: Responsive CSS + Modern Design
- **Internationalization**: Custom i18n System

### Modular Architecture
```
modules/
├── config/           # Configuration module
│   └── Constants.js     # Global configuration constants
├── core/             # Core module
│   ├── EventBus.js      # Event bus (inter-module communication)
│   └── SerialTerminal.js # Main controller
├── utils/            # Utility module
│   ├── Logger.js        # Unified logging system
│   └── FileUtils.js     # File operation utilities
├── serial/           # Serial module
│   ├── SerialManager.js  # Serial connection management
│   └── DataProcessor.js # Data processing and display
├── firmware/         # Firmware module
│   ├── FlashManager.js   # Firmware flashing management
│   └── ProgressTracker.js # Progress tracking
├── ui/               # UI module
│   ├── UIManager.js      # DOM management and basic interaction
│   ├── ModalManager.js   # Modal management
│   ├── TabManager.js     # Tab management
│   └── FullscreenManager.js # Fullscreen management
└── i18n/             # Internationalization module
    ├── LanguageManager.js # Language management
    └── TextUpdater.js    # Text updating
```

### Downloader Architecture
```
downloaders/
├── base-downloader.js      # Base downloader abstract class
├── downloader-manager.js   # Downloader manager
├── t5ai/
│   └── t5ai-downloader.js  # T5AI series downloader
├── esp32/
    └── esp32-esptool-js-wrapper.js # ESP32 downloader wrapper
```

## Usage

### System Requirements
- **Browser**: Chrome 89+ / Edge 89+ / Other Chromium-based browsers
- **Operating System**: Windows / macOS / Linux
- **Hardware**: Devices with USB serial port support

### Quick Start

1. **Open Tool**
   ```
   Direct access: https://your-domain.com/
   Or run locally: Open index.html
   ```

2. **Serial Debugging**
   - Click "Serial Debug" tab
   - Configure serial parameters (baud rate, data bits, etc.)
   - Click "Connect Serial" to select device
   - Start sending and receiving data

3. **Firmware Flashing**
   - Click "Firmware Flash" tab
   - Select target device type
   - Select firmware file (.bin)
   - Connect serial port and start flashing

4. **TuyaOpen Authorization**
   - Click "TuyaOpen Auth" tab
   - Enter UUID and AUTH_KEY
   - Connect device and write authorization information

### Supported Device Types

| Device Type | Status | Description |
|-------------|--------|-------------|
| T5AI | Fully Supported |  |
| T3 | Fully Supported |  |
| ESP32 Series | Fully Supported | Supports all ESP32/ESP32-S2/S3/C3 series |

## Troubleshooting

If serial connection fails, please check:
- Whether the browser supports Web Serial API
- Whether device drivers are correctly installed
- Whether the serial port is occupied by other programs

Detailed troubleshooting guide: [troubleshooting.html](troubleshooting.html)

## Acknowledgments

This project has referenced and learned from the following excellent open-source projects during development. We express our sincere gratitude:

- **[tyutool](https://github.com/tuya/tyutool)** - Official Tuya serial tool that provided important reference for our project's feature design and user experience
- **[esptool-js](https://github.com/espressif/esptool-js)** - Official Espressif JavaScript flashing tool that provides core technical support for ESP32 series chip firmware flashing functionality
