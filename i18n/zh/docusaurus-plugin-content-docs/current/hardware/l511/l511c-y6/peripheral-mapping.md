---
title: L511C-Y6 外设映射说明
description: L511C-Y6E 引脚映射与 TuyaOpen SDK 外设支持状态。
---

# L511C-Y6 外设映射说明

适用于 **L511C-Y6E**（SDK 目标 **L511C_Y6E**）。使用前请结合模组规格和板卡原理图检查引脚复用。

## GPIO

| Tuya Pin | 默认功能 | GPIO/PAD | 说明 |
|---:|---|---|---|
| 16 | NET_STATUS | GPIO14 | 网络指示灯；参考资料称 0.0.4 及以下版本不支持网络灯控制 |
| 19 | MAIN_DTR | PAD0 | 用于低功耗唤醒模组，不作普通 GPIO |
| 20 | MAIN_RI | GPIO11 / PAD4 | MCU 唤醒 |
| 21 | MAIN_DCD | GPIO18 |  |
| 22 | MAIN_CTS | GPIO19 | 参考资料中的 I2C1 复用脚 |
| 23 | MAIN_RTS | GPIO20 | 参考资料中的 I2C1 复用脚 |
| 25 | STATUS | GPIO12 / PAD5 | 与 PWM2 复用 |

## ADC

ADC 端口 0、1 支持 `tkl_adc_read_voltage()`，读取结果单位为毫伏。`tkl_adc_read_data()` 和 `tkl_adc_read_single_channel()` 不支持。

## PWM

| Tuya PWM | Tuya Pin | PWM 通道 |
|---:|---:|---|
| 0 | 28 | PWM0 |
| 1 | 29 | PWM1 |
| 2 | 25 | PWM2 |
| 3 | 20 | PWM3 |
| 4 | 16 | PWM4 |

支持基础通道控制；多通道、极性和捕获接口不支持。

## I2C

当前 SDK 不支持 I2C 主机收发；相关接口返回 `OPRT_NOT_SUPPORTED`。

## SPI

当前 SDK 不支持 SPI。

## UART

UART 接口管脚映射暂未提供。

## I2S

暂未提供 I2S 接线资料。

## 参考资料

- [L511C-Y6E 硬件资料](https://github.com/tuya/tuyaopen-ide-manifests/blob/main/docs/hardware/l511c-y6e.md)
- [L511C_Y6E SDK 源码](https://github.com/tuya/TuyaOpen-LYNQ/tree/83069e5b60baf4bedd2bf5e6fd21e81472d13428/tuyaos/tuyaos_adapter/src)
