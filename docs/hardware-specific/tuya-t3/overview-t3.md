---
title: T3 Module Overview
---

## Overview

The **T3** series are Tuya Wi-Fi and Bluetooth LE combo modules. TuyaOpen includes BSP entries under `TuyaOpen/boards/T3/` for the **T3 LCD DevKit** and shared T3 Kconfig, so you can build demos and products that target T3 silicon with the standard TuyaOpen workflow.

**Audience:** Developers using T3 LCD DevKit or custom boards derived from T3 modules.

## Requirements

- T3 LCD DevKit or hardware that matches the BSP pin assumptions.
- TuyaOpen SDK and `tos.py`; see [Quick Start](../../quick-start/index).

## Board support in TuyaOpen

| Path | Purpose |
|------|---------|
| `boards/T3/T3_LCD_DEVKIT/` | LCD DevKit BSP sources and Kconfig. |
| `boards/T3/config/T3.config` | Example consolidated config. |
| `boards/T3/Kconfig`, `boards/T3/TKL_Kconfig` | Board and TKL options. |

Select a T3 configuration via `tos.py config choice` or derive from `T3.config`, then refine with `tos.py config menu`.

## Feature expectations

- Wireless, memory, and multimedia capabilities depend on the exact T3 module and your enabled components (display, audio, and so on).
- LCD DevKit wiring and default pins are defined in the BSP; verify against your hardware before relying on examples.

## References

- Module datasheet: [T3-U module](https://developer.tuya.com/en/docs/iot/T3-U-Module-Datasheet?id=Kdd4pzscwf0il)
- [Supported hardware list](../index)
- [Display driver](../../peripheral/display) and [peripheral tutorials](../../peripheral/tutorials/display-driver-guide) if you use the panel on the DevKit
