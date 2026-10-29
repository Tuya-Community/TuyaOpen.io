---
title: L511C-Y6 外设映射说明
description: L511C-Y6E 外设引脚和当前 SDK 支持状态。
---

# L511C-Y6 外设映射说明

本页适用于 **L511C-Y6E**，SDK 目标为 **L511C_Y6E**。引脚复用和电气限制请结合模组规格与原理图确认。

## GPIO

| Tuya Pin | 默认功能 | GPIO/PAD | 说明 |
|---:|---|---|---|
| 16 | NET_STATUS | GPIO14 | 资料记录网络指示灯接口；0.0.4 及以下版本不支持网络灯控制 |
| 19 | MAIN_DTR | PAD0 | 资料称仅用于低功耗唤醒模组，不支持普通 GPIO |
| 20 | MAIN_RI | GPIO11 / PAD4 | 资料记录可唤醒 MCU |
| 21 | MAIN_DCD | GPIO18 | 资料未注明其他限制 |
| 22 | MAIN_CTS | GPIO19 | 资料中的 I2C1 引脚复用 |
| 23 | MAIN_RTS | GPIO20 | 资料中的 I2C1 复用脚 |
| 25 | STATUS | GPIO12 / PAD5 | 与 PWM2 复用 |

以上仅为资料所列映射；未列出的管脚不据此推定可作 GPIO。实际复用和电气限制请以 Y6E 模组规格及原理图为准。

## ADC

硬件资料列出 Tuya ADC 0 → ADC0、Tuya ADC 1 → ADC1，状态标为 OK；ADC_BAT 列出但未注明验证状态。Y6E SDK `tkl_adc.c` 中部分读取/查询接口返回 `OPRT_NOT_SUPPORTED`，因此不能仅凭旧表判定完整 ADC 能力可用。具体可用读取 API、通道和引脚映射待结合当前平台实现及目标板核验。

## PWM

| Tuya PWM | Tuya Pin | PWM 通道 |
|---:|---:|---|
| 0 | 28 | PWM0 |
| 1 | 29 | PWM1 |
| 2 | 25 | PWM2 |
| 3 | 20 | PWM3 |
| 4 | 16 | PWM4 |

Y6E SDK 的 `tkl_pwm.c` 实现基础通道控制；多通道、极性和捕获接口不支持。使用前请检查板级路由与引脚复用。

## I2C

**当前 Y6E SDK 不支持 I2C 主机收发。** `platform/L511C_Y6E/tuyaos/tuyaos_adapter/src/tkl_i2c.c` 中 `tkl_i2c_master_send()`、`tkl_i2c_master_receive()` 等相关接口返回 `OPRT_NOT_SUPPORTED`，应按不支持处理，不能用于产品设计。

旧硬件资料仍列有 I2C0：Tuya Pin 18/19，以及 I2C1：Tuya Pin 22/23，并标记为 OK。该表与当前 SDK 不一致；保留作历史资料提示，不代表当前软件支持。是否未来版本恢复支持，待 SDK 变更后重新核验。

## SPI

**当前 Y6E SDK 未提供可用 SPI 外设支持；按不支持处理。** 旧硬件资料的 SPI 章节为空，且其“不支持项”明确写有 SPI。不要将 Y7PM 的 SPI 映射或其外部 Flash 建议套用于 Y6E。

## UART

Y6E SDK 包含 `tkl_uart.c` UART 适配实现；旧硬件资料没有给出 UART 编号、Tuya Pin 或验证结果。因此只能确认源码包含 UART 适配，具体可用端口、管脚复用、调试口及板级连线均待核验，不能据此推定某组引脚可直接使用。

## I2S

本页暂不提供 Y6E 的 I2S 接线方案。不要套用 Y7PM 的 PCM 引脚表或 ES8311 说明。

## 参考资料

- [L511C-Y6E 硬件资料](https://github.com/tuya/tuyaopen-ide-manifests/blob/master/docs/hardware/l511c-y6e.md)：GPIO、ADC、I2C、PWM 旧表及“不支持项”。其中 I2C 表标 OK 与末尾“不支持 I2C”自相矛盾。
- [L511C_Y6E SDK 源码](https://github.com/tuya/TuyaOpen-LYNQ/tree/83069e5b60baf4bedd2bf5e6fd21e81472d13428/tuyaos/tuyaos_adapter/src)：`tkl_i2c.c`、`tkl_gpio.c`、`tkl_adc.c`、`tkl_pwm.c`、`tkl_uart.c`。
