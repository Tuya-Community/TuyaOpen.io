# TuyaOpen Tools

[English] | [中文](README_zh.md)

## Available Tools

- TuyaOpen-WebSerial

A powerful serial port tool based on Chrome Web Serial API. No software installation required, directly complete TuyaOpen firmware flashing, authorization code authorization, debug log viewing, and automatic log analysis functions in the browser.

[Learn more about TuyaOpen-WebSerial](WEBSERIAL.md)

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

## Quick Start

### System Requirements
- **Browser**: Chrome 89+ / Edge 89+ / Other Chromium-based browsers
- **Operating System**: Windows / macOS / Linux
- **Hardware**: Devices with USB serial port support

### Usage

1. **Open Tool**
   ```
   Direct access: https://www.tuyaopen.ai/tools/web-serial
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


## Detailed Documentation

### Troubleshooting
- If serial connection fails, please check:
  - Whether the browser supports Web Serial API
  - Whether device drivers are correctly installed
  - Whether the serial port is occupied by other programs
- Detailed troubleshooting guide: [troubleshooting.html](troubleshooting.html)

### Development Guide
- Modular architecture documentation: [modules/README.md](modules/README.md)
- Downloader development guide: [downloaders/README.md](downloaders/README.md)
- Internationalization development: [i18n/README.md](i18n/README.md)

## Contributing

Welcome to submit Issues and Pull Requests!

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

This project has referenced and learned from the following excellent open-source projects during development. We express our sincere gratitude:

- **[tyutool](https://github.com/tuya/tyutool)** - Official Tuya serial tool that provided important reference for our project's feature design and user experience
- **[esptool-js](https://github.com/espressif/esptool-js)** - Official Espressif JavaScript flashing tool that provides core technical support for ESP32 series chip firmware flashing functionality

Thanks to the developers of these projects for their contributions to the open-source community!

## Related Projects

- [TuyaOpen](https://github.com/tuya/TuyaOpen)
- [Arduino-TuyaOpen](https://github.com/tuya/arduino-Tuyaopen)
- [Luanode-TuyaOpen](https://github.com/tuya/luanode-Tuyaopen)

## Support

- **Bug Reports**: [GitHub Issues](https://github.com/Tuya/TuyaOpen-WebTools/issues)
- **Feature Requests**: [GitHub Discussions](https://github.com/Tuya/TuyaOpen-WebTools/discussions)

