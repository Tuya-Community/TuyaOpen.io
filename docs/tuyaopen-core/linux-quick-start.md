---
title: Quick start on Linux
description: "Build and run a TuyaOpen Core sample on a Linux host: clone the SDK and examples, activate a device with the Tuya app, and watch the cloud link come up."
keywords:
  - tuyaopen core
  - linux
  - quick start
  - build
  - example
---

This tutorial builds and runs a TuyaOpen Core sample on a Linux host (a PC, Raspberry Pi, or any POSIX system). The Linux port uses plain CMake, so no cross-toolchain is needed.

## Prerequisites

- A Linux host with `git`, `cmake` (3.16 or later), and a C toolchain (`build-essential` on Debian/Ubuntu).
- The TuyaOpen Core **SDK** repository and the **TuyaOpen Core examples** repository.
- A device triplet — **PID**, **UUID**, and **AuthKey** — created on the Tuya AI+IoT platform. For license terms see [Get Started](../quick-start/index.md); for creating the product see [Create Your Product & Agent](../cloud/tuya-cloud/creating-new-product.md).

The examples expect the SDK checkout at the repository root under the name `tuyaopen-core`:

```bash
cd TuyaOpen-Core-examples
git clone <TuyaOpen Core SDK repository URL> tuyaopen-core
cd tuyaopen-core && git submodule update --init && cd ..
```

The `submodule` step fetches the SDK's third-party dependencies (mbedTLS, cJSON, coreMQTT, coreHTTP, backoffAlgorithm). If you place the SDK elsewhere, point every build at it with `-DTUYAOPEN_CORE_DIR=/path/to/sdk`.

## Build and run the IoT sample

```bash
cd linux/examples/iot_demo
cmake -B build
cmake --build build -j$(nproc)
./build/iot_demo
```

By default the sample uses the PID/UUID/AuthKey compiled into `src/tuya_config.h`. **Replace these with your own triplet**, either in a local git-ignored `src/tuya_config_secrets.h` (see `tuya_config_secrets.h.example`) or at configure time:

```bash
cmake -B build \
  -DTUYA_PRODUCT_ID=your_pid \
  -DTUYA_OPENSDK_UUID=your_uuid \
  -DTUYA_OPENSDK_AUTHKEY=your_authkey
```

## Activate the device

On first run the device is unactivated, so it enters binding mode and prints a QR code in the terminal.

1. Open the Tuya app and scan the QR code to bind the device.
2. The sample activates, then prints `TUYA_EVENT_MQTT_CONNECTED` when the cloud link is up.
3. Toggle the switch from the app. Each command arrives as a `TUYA_EVENT_DP_RECEIVE_OBJ` event, and the sample echoes the data point (DP) back to the cloud.

What data points are and how the cloud models them is shared with the full TuyaOpen experience — each product function becomes a DP, see [Create Your Product & Agent](../cloud/tuya-cloud/creating-new-product.md).

## Other samples

The same build commands apply to the other two Linux samples, which enable additional capability modules:

| Sample | Enables | Demonstrates |
|---|---|---|
| `linux/examples/agent_demo` | `CONFIG_ENABLE_AI_COMPONENTS` | Uploads a preset voice sample, prints the cloud ASR result and AI agent reply (`[AGENT][ASR]` / `[AGENT][NLG]`). See [AI Agent API](agent-api.md). |
| `linux/examples/p2p_demo` | `CONFIG_ENABLE_TUYA_P2P` | Streams a bundled H.264 file as a virtual camera to the app over a P2P session. Requires an IPC-category product. See [P2P API](p2p-api.md). |

Run the agent sample from its `build` directory; on a desktop or VM start it with `env -u DISPLAY ./agent_demo` so ALSA initialization cannot block on an unreachable X server:

```bash
cd linux/examples/agent_demo
cmake -B build
cmake --build build -j$(nproc)
cd build && env -u DISPLAY ./agent_demo
```

## Notes

- **OTA on Linux**: the sample writes downloaded firmware to `./tuyadb/ota` and exits when the transfer finishes. Create the `tuyadb/` directory before triggering an upgrade.
- **Factory reset**: three quick restarts (within 5 seconds) clear the activation data, so the device must be re-bound. You can also call `tuya_iot_reset()` from application code.
- **Local control**: the samples enable the LAN service (`tuya_lan_enable()`) after MQTT connects, so the app on the same network can control the device without going through the cloud.

## Next steps

- [Using the IoT API](iot-api.md) — events, data points, OTA
- [Add the library to a project](add-to-project.md) — use it outside the samples
- [Port to a new platform](port-to-platform.md) — when Linux or ESP-IDF is not your target
