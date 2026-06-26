---
title: T2 Module Overview
---

## Overview

The **T2** series are Tuya Wi-Fi and Bluetooth LE combo modules used in TuyaOpen for IoT devices that need wireless connectivity with a compact module form factor. TuyaOpen provides board support under `TuyaOpen/boards/T2/` so you can select a T2-based configuration and build applications the same way as for other Tuya chips.

**Audience:** Developers evaluating or bringing up firmware on T2-U or compatible hardware.

## Requirements

- T2-U development board or a product module based on T2.
- TuyaOpen SDK with `tos.py` environment; see [Quick Start](../../quick-start/index).

## Board support in TuyaOpen

| Path | Purpose |
|------|---------|
| `boards/T2/T2-U/` | Reference board BSP (registration, CMake, Kconfig). |
| `boards/T2/config/T2.config` | Example consolidated config entry point. |
| `boards/T2/Kconfig`, `boards/T2/TKL_Kconfig` | Board and TKL feature selection. |

Use `tos.py config choice` from your application and pick a config that targets T2, or start from `T2.config` and customize in `tos.py config menu`.

## Feature expectations

- Wi-Fi and BLE capabilities follow the module datasheet and the enabled TKL/TAL options in your build.
- Peripheral and pin details are board-specific; compare with your schematic and the board `board_com_api.h` / registration code under `T2-U`.

## References

- Module datasheet: [T2-U module](https://developer.tuya.com/en/docs/iot/T2-U-module-datasheet?id=Kce1tncb80ldq)
- T2-U dev board: [T2-U development board](https://developer.tuya.com/en/docs/iot-device-dev/T2-U-development-board?id=Kckeahvfhu7v0)
- [Supported hardware list](../index)
- [T5AI Core overview](../tuya-t5/t5-ai-core/overview-t5-ai-core) (richer T-series documentation pattern)
