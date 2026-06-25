---
title: T2 模块概述
---

## 概述

**T2** 系列为涂鸦 Wi-Fi 与 Bluetooth LE 组合模组，在 TuyaOpen 中用于需要无线连接、模组化形态的 IoT 设备。工程在 `TuyaOpen/boards/T2/` 下提供板级支持，可选择 T2 相关配置并按与其他涂鸦芯片相同的方式构建应用。

**读者：** 在 T2-U 或兼容硬件上做方案评估与固件 bring-up 的开发者。

## 要求

- T2-U 开发板或基于 T2 模组的产品硬件。
- 已安装 TuyaOpen SDK 与 `tos.py` 环境，参见 [快速开始](../../quick-start/index)。

## TuyaOpen 中的板级支持

| 路径 | 说明 |
|------|---------|
| `boards/T2/T2-U/` | 参考开发板 BSP（注册、CMake、Kconfig）。 |
| `boards/T2/config/T2.config` | 示例固化配置入口。 |
| `boards/T2/Kconfig`、`boards/T2/TKL_Kconfig` | 板级与 TKL 功能选择。 |

在应用目录执行 `tos.py config choice` 选择面向 T2 的配置，或以 `T2.config` 为起点后在 `tos.py config menu` 中调整。

## 功能预期

- Wi-Fi、BLE 能力以模组数据手册及当前构建中启用的 TKL/TAL 选项为准。
- 外设与引脚以具体板卡为准；请对照原理图与 `T2-U` 下 `board_com_api.h` 及注册代码。

## 参考

- 模组数据手册：[T2-U 模组](https://developer.tuya.com/cn/docs/iot/T2-U-module-datasheet?id=Kce1tncb80ldq)
- 开发板：[T2-U 开发板](https://developer.tuya.com/cn/docs/iot-device-dev/T2-U-development-board?id=Kckeahvfhu7v0)
- [硬件支持列表](../index)
- [T5AI-Core 概述](../tuya-t5/t5-ai-core/overview-t5-ai-core)（T 系列更完整文档可参考此结构）
