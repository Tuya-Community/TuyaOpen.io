---
title: "ESP32 Production and OTA Guide"
---

# ESP32 Production and OTA Guide

Take your ESP32 TuyaOpen project from prototype to production: device authorization, firmware management, and over-the-air updates.

## Prerequisites

- Completed [ESP32 Quick Start](esp32-quick-start)
- A working TuyaOpen project that connects to Tuya Cloud
- A [Tuya IoT Platform](https://iot.tuya.com) account with a product created

## Requirements

- ESP32 board with working firmware
- Tuya Cloud license key (PID, UUID, AuthKey)
- Internet-connected computer
- USB cable for initial flashing

## Device Authorization

Every device that connects to Tuya Cloud needs a unique identity (UUID + AuthKey) paired with a Product ID (PID).

### Single-device authorization (development)

For development and testing, configure credentials directly in your firmware:

Edit `include/tuya_app_config.h`:

```c
#define TUYA_PRODUCT_ID     "your_pid_here"
#define TUYA_UUID           "your_uuid_here"
#define TUYA_AUTHKEY        "your_authkey_here"
```

Build and flash as usual:

```bash
tos.py build
tos.py flash
```

See [Equipment Authorization](../../quick-start/equipment-authorization) for how to obtain these credentials.

### Batch authorization (production)

For mass production, you do not hardcode credentials into firmware. Instead:

1. **Build a single firmware image** without embedded credentials.
2. **Use the Tuya production tools** to flash both firmware and unique credentials (UUID + AuthKey) per device on the production line.
3. **License keys** are purchased in bulk through the Tuya IoT Platform.

:::note
Batch production tooling and license procurement are managed through the [Tuya IoT Platform](https://iot.tuya.com). Contact Tuya support for production-scale licensing.
:::

## Over-the-Air (OTA) Updates

TuyaOpen provides built-in OTA support for ESP32 through the Tuya Cloud platform.

### How OTA works

1. You upload a new firmware binary to the Tuya IoT Platform.
2. The platform distributes the update to target devices.
3. Devices download the firmware, verify integrity, and apply the update.
4. The device reboots into the new firmware.

The TKL OTA adapter (`tkl_ota.c`) handles the ESP32 partition management and flash operations.

### Building an OTA firmware

Build your firmware normally:

```bash
tos.py build
```

The build output includes the OTA binary. The output path depends on your project, typically under the build output directory.

### Uploading firmware to Tuya Cloud

1. Log in to the [Tuya IoT Platform](https://iot.tuya.com).
2. Navigate to your product > **Device Management** > **Firmware**.
3. Upload the firmware binary.
4. Set the target version and update strategy (silent, user-confirmed, or forced).
5. Select target devices or device groups.

### OTA best practices

- **Test on a few devices first.** Use the staged rollout feature to push to a small percentage of devices before full deployment.
- **Version your firmware.** Use semantic versioning in your build configuration so devices and the cloud can track firmware versions.
- **Handle OTA failures gracefully.** TuyaOpen maintains a rollback partition. If the new firmware fails to boot, the device reverts to the previous version.
- **Do not change the partition table** between OTA versions unless you have a migration plan. Partition layout mismatches can brick devices.

## Flash and Serial Configuration

### Flash size

ESP32 boards in TuyaOpen default to 4 MB flash. Some boards (especially S3-based) use 16 MB:

```kconfig
# In your board Kconfig
config PLATFORM_FLASHSIZE_16M
    bool
    default y
```

### Serial port baud rate

Default serial output configuration for ESP32 in TuyaOpen:

| Chip | UART | Baud Rate | TX Pin | RX Pin |
|------|------|-----------|--------|--------|
| ESP32 | UART0 | 115200 | Default | Default |
| ESP32-C3 | UART0 | 115200 | 21 | 20 |
| ESP32-C6 | UART0 | 115200 | 16 | 17 |
| ESP32-S3 | UART0 | 115200 | 43 | 44 |

### USB JTAG (ESP32-S3)

Some ESP32-S3 boards route the USB port to the internal USB-JTAG controller instead of a UART bridge. If your board uses USB JTAG for serial output:

```kconfig
config ENABLE_ESP32S3_USB_JTAG_ONLY
    bool
    default y
```

## Firmware Security

### Secure Boot

ESP-IDF supports Secure Boot v2 on ESP32-S3, ESP32-C3, and ESP32-C6. This can be configured through:

```bash
tos.py idf menuconfig
```

Navigate to **Security features** > **Enable hardware Secure Boot**.

:::warning
Enabling Secure Boot is a one-time, irreversible operation on the chip. Test thoroughly on development devices before enabling on production hardware.
:::

### Flash Encryption

ESP-IDF flash encryption protects firmware from being read off the chip. Configure through `menuconfig`:

Navigate to **Security features** > **Enable flash encryption on boot**.

## Production Checklist

Before shipping devices:

- [ ] Firmware builds and runs correctly on target hardware
- [ ] Tuya Cloud connectivity tested (device pairs, DPs work, commands received)
- [ ] OTA tested (upload new firmware, verify device updates and reboots)
- [ ] Unique license credentials per device (not hardcoded dev credentials)
- [ ] Serial output disabled or set to production logging level
- [ ] Flash encryption and Secure Boot evaluated for your security requirements
- [ ] Regulatory compliance verified for your target markets (FCC, CE, etc.)

## References

- [Equipment Authorization](../../quick-start/equipment-authorization)
- [ESP32 on TuyaOpen -- Overview](overview-esp32)
- [ESP32 Quick Start](esp32-quick-start)
- [Creating a New Product on Tuya Cloud](../../cloud/tuya-cloud/creating-new-product)
- [Tuya IoT Platform](https://iot.tuya.com)
