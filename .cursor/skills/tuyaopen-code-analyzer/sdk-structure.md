# TuyaOpen SDK Structure Reference

Full directory map of the TuyaOpen SDK at `TuyaOpen/`. Updated as structure changes are discovered.

## Top Level

```
TuyaOpen/
├── CMakeLists.txt          # Root build file
├── README.md / README_zh.md
├── tos.py                  # Build/flash/config CLI tool
├── export.sh               # Environment setup script
├── requirements.txt        # Python deps for tos.py
├── apps/                   # Full application demos
├── boards/                 # Board definitions (BSP)
├── docs/                   # SDK-internal docs (NOT the Docusaurus site)
├── examples/               # Focused examples
├── platform/               # Platform-specific toolchains and OS
├── src/                    # Core SDK source (TAL, services, libs, peripherals)
└── tools/                  # Build tools, porting adapters, templates
```

## apps/ -- Application Demos

```
apps/
├── tuya.ai/
│   ├── ai_components/          # Shared AI component library
│   ├── duo_eye_mood/           # Duo-eye mood display demo
│   ├── your_chat_bot/          # Voice chatbot demo
│   ├── your_desk_emoji/        # Desk emoji display demo
│   ├── your_otto_robot/        # Otto robot demo
│   ├── your_robot_dog/         # Robot dog demo
│   └── your_serial_chat_bot/   # Serial-based chatbot
├── tuya_cloud/
│   ├── camera_demo/            # Cloud camera demo
│   ├── switch_demo/            # Cloud switch demo (common quick-start)
│   └── weather_get_demo/       # Weather API demo
├── games/                      # Game demos
├── micropython/                # MicroPython integration
├── mimiclaw/                   # MimicClaw app
├── tuya_t5_pixel/              # T5 pixel art
└── tuya_t5_pocket/             # T5 pocket device
```

Each app typically contains: `CMakeLists.txt`, `Kconfig`, `config/*.config` (board configs), `src/tuya_main.c`, `include/`, `README.md`.

## examples/ -- Focused Examples

```
examples/
├── ble/                    # Bluetooth examples
├── e-Paper/                # E-paper display
├── get-started/            # Hello-world style
├── graphics/               # Graphics/LVGL demos
├── multimedia/             # Audio/video
├── peripherals/            # Hardware peripheral examples
│   ├── adc/
│   ├── audio_codecs/
│   ├── button/
│   ├── camera/
│   ├── display/
│   ├── encoder/
│   ├── flash/
│   ├── gpio/
│   ├── i2c/
│   ├── imu/
│   ├── ir/
│   ├── joystick/
│   ├── led/
│   ├── leds-pixel/
│   ├── pwm/
│   ├── sd/
│   ├── spi/
│   ├── timer/
│   ├── touch/
│   ├── tp/
│   ├── uart/
│   └── watchdog/
├── protocols/              # Protocol examples (MQTT, HTTP, etc.)
├── system/                 # OS/system examples (threads, timers, memory)
├── tflite/                 # TensorFlow Lite Micro
└── wifi/                   # Wi-Fi examples
```

## src/ -- Core SDK Source

### TAL Modules (Tuya Abstraction Layer)

```
src/
├── tal_bluetooth/          # Bluetooth abstraction
├── tal_cellular/           # Cellular network abstraction
├── tal_cli/                # CLI interface
├── tal_driver/             # Driver management
├── tal_image/              # Image processing
├── tal_kv/                 # Key-value storage (littlefs, FlashDB)
├── tal_network/            # Network abstraction
├── tal_security/           # Security/crypto
├── tal_system/             # System services (threads, timers, memory, mutex)
├── tal_wifi/               # Wi-Fi abstraction
└── tal_wired/              # Wired network abstraction
```

Each TAL module contains: `include/` (public API headers), `src/` (implementation), `CMakeLists.txt`, optional `Kconfig`.

### Services

```
src/
├── tuya_cloud_service/     # Tuya Cloud connectivity (MQTT, device management)
├── tuya_ai_service/        # AI service integration
└── tuya_p2p/               # P2P communication
```

### Libraries (third-party and internal)

```
src/
├── common/                 # Common utilities
├── libhttp/                # HTTP client
├── liblwip/                # lwIP TCP/IP stack
├── libmqtt/                # MQTT client
├── libtls/                 # TLS/SSL (mbedtls)
├── liblvgl/                # LVGL graphics library
└── micropython/            # MicroPython runtime
```

### Peripheral Drivers Library

```
src/peripherals/
├── audio_codecs/           # Audio codec drivers (ES8311, ES7210, etc.)
├── button/                 # Button driver
├── camera/                 # Camera drivers
├── display/                # Display drivers (ST7789, ILI9341, SSD1306, etc.)
├── encoder/                # Rotary encoder
├── imu/                    # IMU sensors
├── ir/                     # IR transmitter/receiver
├── joystick/               # Joystick input
├── led/                    # LED driver
├── leds_pixel/             # Addressable LED strips (WS2812, etc.)
├── pmic/                   # Power management ICs
├── tp/                     # Touch panel
└── transport/              # Transport layer abstractions
```

## tools/porting/adapter/ -- TKL Layer

TKL (Tuya Kernel Layer) adapters that each platform must implement:

```
tools/porting/adapter/
├── adc/                    # ADC adapter
├── bluetooth/              # Bluetooth adapter
├── display/                # Display adapter
├── flash/                  # Flash storage adapter
├── gpio/                   # GPIO adapter
├── i2c/                    # I2C adapter
├── i2s/                    # I2S adapter
├── init/                   # Initialization (tkl_init_*.c)
├── network/                # Network adapter
├── pwm/                    # PWM adapter
├── qspi/                   # QSPI adapter
├── security/               # Security adapter
├── spi/                    # SPI adapter
├── system/                 # System adapter (threads, timers, memory)
├── timer/                  # Hardware timer adapter
├── uart/                   # UART adapter
├── watchdog/               # Watchdog adapter
├── wifi/                   # Wi-Fi adapter
└── wired/                  # Wired network adapter
```

## boards/ -- Board Support Packages

```
boards/
├── Kconfig                 # Board selection Kconfig
├── add_new_board.md        # Guide for adding boards
├── BK7231X/                # Beken BK7231 family
├── ESP32/                  # Espressif ESP32 family
├── LINUX/                  # Generic Linux (Raspberry Pi, DshanPi, etc.)
├── LN882H/                 # Lightning Semi LN882H
├── T2/                     # Tuya T2 module
├── T3/                     # Tuya T3 module
└── T5AI/                   # Tuya T5AI module (primary AI dev board)
```

Each board directory contains: `BOARD_NAME.config`, `CMakeLists.txt`, optional `Kconfig`, board-specific source files.

## platform/ -- Platform Toolchains

```
platform/
├── platform_config.yaml    # Platform registry
├── T5AI/                   # T5AI platform (toolchain, t5_os, tuyaos)
└── tools/                  # Toolchain downloads (GCC ARM, etc.)
```

## Mapping: Source -> Documentation

| SDK Path | Documentation Location |
|----------|----------------------|
| `apps/tuya.ai/*` | `docs/applications/tuya.ai/` |
| `apps/tuya_cloud/*` | `docs/applications/tuya_cloud/` |
| `examples/peripherals/*` | `docs/examples/` + `docs/peripheral/` |
| `examples/{ble,wifi,system,protocols}/*` | `docs/examples/` |
| `src/tal_*` | Needs docs (TAL API reference) |
| `tools/porting/adapter/*` | `docs/tkl-api/` |
| `boards/*` | `docs/hardware-specific/` |
| `src/peripherals/*` | `docs/peripheral/` |
| `src/tuya_cloud_service` | `docs/cloud/tuya-cloud/` |
| `src/tuya_ai_service` | `docs/applications/tuya.ai/ai-components/` |
