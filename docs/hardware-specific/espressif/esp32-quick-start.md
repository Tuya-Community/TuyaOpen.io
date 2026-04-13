---
title: "ESP32 Quick Start"
---

# Quick Start with ESP32

Build, flash, and run your first TuyaOpen application on an ESP32 board.

## Prerequisites

- Completed [Environment Setup](../../quick-start/enviroment-setup)
- Basic familiarity with C development and serial terminals

## Requirements

- An ESP32 development board (ESP32, ESP32-S3, ESP32-C3, or ESP32-C6)
- USB cable (USB-C or Micro-USB, depending on your board)
- Computer running Linux, macOS, or Windows (WSL recommended)
- Wi-Fi network (2.4 GHz)

:::note
If your application uses Tuya Cloud features (remote control, AI Agent, OTA), you also need a [Tuya Cloud license key](../../quick-start/equipment-authorization). Local-only projects (GPIO, UART, display demos) do not require a license.
:::

## Steps

### 1. Clone TuyaOpen and set up the environment

```bash
git clone https://github.com/tuya/TuyaOpen.git
cd TuyaOpen
git submodule update --init
```

Activate the TuyaOpen environment:

```bash
source export.sh
```

Verify the tools are working:

```bash
tos.py version
tos.py check
```

### 2. Choose a project to build

For your first build, use the **switch demo** (a simple cloud-connected switch):

```bash
cd apps/tuya_cloud/switch_demo
```

Or for a local-only test without Tuya Cloud, use the **GPIO example**:

```bash
cd examples/peripherals/gpio
```

### 3. Select your ESP32 board configuration

```bash
tos.py config choice
```

You will see a list of available configurations. Select the one matching your board:

```
1. ESP32.config
2. ESP32-C3.config
3. ESP32-C6.config
4. ESP32-S3.config
5. DNESP32S3.config
...
```

Enter the number for your board. If you have a generic ESP32-S3 board, select `ESP32-S3.config`.

### 4. Build the firmware

```bash
tos.py build
```

The build compiles the TuyaOpen SDK, your application code, and the ESP-IDF platform layer. First build takes several minutes as the ESP-IDF toolchain and dependencies are downloaded.

### 5. Flash the firmware

Connect your ESP32 board via USB, then:

```bash
tos.py flash
```

If the serial port is not detected automatically, specify it:

```bash
tos.py flash --port /dev/ttyUSB0
```

:::tip Linux serial permissions
If you get a "permission denied" error on Linux:
```bash
sudo usermod -aG dialout $USER
```
Log out and back in for the change to take effect.
:::

### 6. Monitor serial output

```bash
tos.py monitor
```

Or use the ESP-IDF monitor directly:

```bash
tos.py idf monitor
```

Press `Ctrl+]` to exit the monitor.

### 7. (Cloud projects only) Pair the device

For projects using Tuya Cloud (e.g., switch_demo):

1. Open the **Tuya Smart** or **Smart Life** app on your phone.
2. Tap **Add Device** > **Auto Scan**.
3. Ensure your phone is on the same 2.4 GHz Wi-Fi network.
4. Follow the app instructions to pair the device.

The device should appear in the app and respond to remote commands.

## Expected Outcome

- **GPIO example**: The serial output shows GPIO toggling. You can verify with an LED or multimeter.
- **Switch demo**: The device connects to Tuya Cloud and appears in the Tuya Smart app as a controllable switch.

## Using ESP-IDF Commands

TuyaOpen wraps ESP-IDF, but you can access IDF commands directly:

```bash
# Open ESP-IDF menuconfig
tos.py idf menuconfig

# Run IDF monitor
tos.py idf monitor

# Clean IDF build
tos.py idf fullclean
```

This is useful for advanced configuration (partition tables, IDF component settings, etc.).

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `tos.py check` fails | Run `source export.sh` again. Ensure Python 3.8+ is installed. |
| Build error "IDF not found" | The ESP-IDF toolchain downloads on first build. Ensure internet access. |
| Flash fails "port not found" | Check USB connection. On Linux, verify `/dev/ttyUSB*` or `/dev/ttyACM*` exists. |
| Device does not pair | Confirm 2.4 GHz Wi-Fi. Check license key in `tuya_app_config.h`. |
| Serial output shows "auth error" | Flash the license key. See [Equipment Authorization](../../quick-start/equipment-authorization). |

## References

- [ESP32 on TuyaOpen -- Overview](overview-esp32)
- [Environment Setup](../../quick-start/enviroment-setup)
- [Project Compilation Guide](../../build-system/compilation-guide)
- [Equipment Authorization](../../quick-start/equipment-authorization)
- [tos.py User Guide](../../tos-tools/tos-guide)
