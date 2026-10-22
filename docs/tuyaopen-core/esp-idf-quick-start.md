---
title: Quick start on ESP-IDF
description: "Build and flash the TuyaOpen Core ESP32 sample: add the core and port components, configure Wi-Fi and credentials, and activate from a QR code over serial."
keywords:
  - tuyaopen core
  - esp-idf
  - esp32
  - quick start
---

This short guide runs the Core IoT sample on an Espressif chip through the ESP-IDF component flow. The example lives in the examples repository under `esp32/examples/iot_demo`.

:::warning
Use **ESP-IDF v5.x** (v5.4 recommended). v6.2 and later move the mbedTLS low-level crypto headers into private locations that the current component does not support.
:::

## What is different from Linux

The application flow is identical to the [Linux sample](linux-quick-start.md) — same `tuya_iot_init` → `tuya_iot_start` → `tuya_iot_yield` sequence. Two things differ:

- **Wi-Fi is your code.** The core has no Wi-Fi abstraction. The sample brings up the station itself (`main/wifi_sta.c`, native ESP-IDF API with backoff reconnect); once IP is up, the port reports the link and sockets run over lwIP.
- **OTA uses ESP-IDF APIs.** `main/ota_app.c` writes through `esp_ota_*` into the next OTA partition and calls `esp_restart()`.

## Project layout

The top-level `CMakeLists.txt` adds **two** local components:

```cmake
set(EXTRA_COMPONENT_DIRS
    "${TUYAOPEN_CORE_DIR}"
    "${TUYAOPEN_CORE_DIR}/port/esp-idf")
```

The core repository root is the `tuyaopen-core` component; `port/esp-idf` is the port component (ESP-IDF names it after the directory). Nothing is downloaded from the component registry — `idf_component.yml` carries no Tuya dependency.

The sample ships a 4 MB partition table (`partitions.csv`): 64 KB NVS, otadata, two 1.5 MB OTA slots, and 768 KB storage.

## Build and flash

```bash
source <esp-idf>/export.sh
cd esp32/examples/iot_demo
idf.py set-target esp32s3        # or esp32, esp32c3, ...
idf.py menuconfig                # iot_demo menu -> Wi-Fi SSID / password
idf.py build
idf.py -p /dev/ttyUSB0 flash monitor
```

## Configuration

| Item | Where |
|---|---|
| Wi-Fi SSID / password | `menuconfig` → iot_demo (`CONFIG_DEMO_WIFI_SSID`, `CONFIG_DEMO_WIFI_PASSWORD`). An empty SSID skips Wi-Fi entirely and the link stays down. |
| PID / UUID / AuthKey | `main/tuya_config.h`, or a git-ignored `main/tuya_config_secrets.h` (copy the `.example` template) |
| Core switches | `menuconfig` → **tuyaopen-core**, with defaults in `sdkconfig.defaults` |

Notable defaults: `CONFIG_ENABLE_PLATFORM_MBEDTLS=y` (uses ESP-IDF's mbedTLS — never build the bundled copy, it causes symbol conflicts), `CONFIG_LITTLE_END=y`, NimBLE for BLE (peripheral only).

The sample runs `user_main()` on a dedicated thread with an **8 KB stack**; keep this size — TLS handshakes peak close to it.

## Activation

On first boot the sample prints the binding QR code over serial. Scan it with the Tuya app; on success you see `TUYA_EVENT_ACTIVATE_SUCCESSED` followed by `TUYA_EVENT_MQTT_CONNECTED`, and switch commands arrive as `TUYA_EVENT_DP_RECEIVE_OBJ`.

## Next steps

- [Add the library to a project](add-to-project.md) — component integration in your own firmware
- [Using the IoT API](iot-api.md) — events and data points
- [Port to a new platform](port-to-platform.md) — the ops-module contract behind this port
