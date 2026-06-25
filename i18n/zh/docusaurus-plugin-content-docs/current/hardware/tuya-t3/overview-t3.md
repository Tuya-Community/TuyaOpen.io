---
title: T3 模块概述
---

## 概述

**T3** 系列为涂鸦 Wi-Fi 与 Bluetooth LE 组合模组。TuyaOpen 在 `TuyaOpen/boards/T3/` 下提供 **T3 LCD DevKit** 等 BSP 及共享 T3 Kconfig，可用标准 TuyaOpen 流程构建面向 T3 的演示与产品固件。

**读者：** 使用 T3 LCD DevKit 或基于 T3 模组定制硬件的开发者。

## 要求

- T3 LCD DevKit 或与 BSP 引脚假设一致的硬件。
- TuyaOpen SDK 与 `tos.py`，参见 [快速开始](../../quick-start/index)。

## TuyaOpen 中的板级支持

| 路径 | 说明 |
|------|---------|
| `boards/T3/T3_LCD_DEVKIT/` | LCD DevKit BSP 源码与 Kconfig。 |
| `boards/T3/config/T3.config` | 示例固化配置。 |
| `boards/T3/Kconfig`、`boards/T3/TKL_Kconfig` | 板级与 TKL 选项。 |

通过 `tos.py config choice` 选择 T3 配置，或以 `T3.config` 为起点后在 `tos.py config menu` 中细化。

## 功能预期

- 无线、内存及多媒体能力取决于具体 T3 模组版本与已启用组件（显示、音频等）。
- LCD DevKit 默认走线与引脚在 BSP 中定义；使用示例前请与实物硬件核对。

## 参考

- 模组数据手册：[T3-U 模组](https://developer.tuya.com/cn/docs/iot/T3-U-Module-Datasheet?id=Kdd4pzscwf0il)
- [硬件支持列表](../index)
- [显示屏驱动](../../peripheral/display) 与 [显示驱动教程](../../peripheral/tutorials/display-driver-guide)（若使用 DevKit 屏幕）
