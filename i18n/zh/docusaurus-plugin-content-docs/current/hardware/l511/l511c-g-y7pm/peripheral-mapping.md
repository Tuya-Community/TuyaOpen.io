---
title: L511C/G-Y7PM 外设映射说明
description: L511C/G-Y7PM 模组外设、引脚复用及 TuyaOpen SDK 支持状态。
---

# L511C/G-Y7PM 外设引脚映射

适用于 L511C-Y7PM 和 L511G-Y7PM。GPIO API 使用模组引脚号。IO 默认 1.8V，3.3V 需 SDK 配置支持。已注册仅表示普通 GPIO 接口可识别该引脚。未开放引脚 init 返回 `OPRT_COM_ERROR`，Pin 79 普通 init 返回 `OPRT_NOT_SUPPORTED`；不影响独立外设复用。

## GPIO

| Tuya Pin | 默认/复用功能 | C 普通 GPIO | G 普通 GPIO | 备注 |
|---:|---|---|---|---|
| 5 | GPIO1 | 已注册 | 已注册 | GPIO 配置会处理唤醒 pad。 |
| 6 | GPIO2 | 已注册 | 已注册 | GPIO 配置会处理唤醒 pad。 |
| 16 | NET_STATUS | 已注册 | 已注册 | 网络状态灯占用。 |
| 19 | MAIN_DTR | 已注册 | 已注册 | GPIO 配置会处理唤醒 pad。 |
| 20 | MAIN_RI | 已注册 | 已注册 |  |
| 21 | MAIN_DCD | 已注册 | 已注册 |  |
| 22 | MAIN_CTS | 已注册 | 已注册 |  |
| 25 | STATUS | 已注册 | 已注册 |  |
| 26 | I2S_MCLK | 已注册 | 已注册 |  |
| 28 | AUX_RXD | 已注册 | 已注册 |  |
| 29 | AUX_TXD | 已注册 | 已注册 |  |
| 30 | PCM_CLK | 已注册 | 已注册 |  |
| 31 | PCM_SYNC | 已注册 | 已注册 |  |
| 32 | PCM_DIN | 已注册 | 已注册 | 旧资料记录中断异常。 |
| 33 | PCM_DOUT | 已注册 | 已注册 |  |
| 49 | LCD_RST | 已注册 | 已注册 |  |
| 50 | LCD_SPI_OUT | 已注册 | 已注册 |  |
| 51 | LCD_SPI_RS | 已注册 | 已注册 |  |
| 52 | LCD_SPI_CS | 已注册 | 已注册 |  |
| 53 | LCD_SPI_CLK | 已注册 | 已注册 |  |
| 54 | CAM_MCLK | 已注册 | 已注册 |  |
| 55 | CAM_SPI_DATA0 | 已注册 | 已注册 |  |
| 56 | CAM_SPI_DATA1 | 已注册 | 已注册 |  |
| 57 | CAM_I2C_SCL | 已注册 | 已注册 |  |
| 58 | CAM_I2C_SDA | 已注册 | 已注册 | 旧资料记录中断异常。 |
| 62 | USIM2_CLK | 未开放 | 未开放 |  |
| 63 | USIM2_RST | 未开放 | 未开放 |  |
| 64 | USIM2_DATA | 未开放 | 未开放 |  |
| 66 | I2C1_SDA | 已注册 | 未开放 | C 源码备注 IRQ 异常，输出已注册。 |
| 67 | I2C1_SCL | 已注册 | 未开放 | C 源码备注 IRQ 异常，输出已注册。 |
| 78 | LCD_TE | 已注册 | 未开放 |  |
| 79 | USIM1_DET | 专用/条件使用 | 专用/条件使用 | Pin 79 在两款 SDK 的 `tkl_gpio_init` 均返回 `OPRT_NOT_SUPPORTED`，SIM 检测/唤醒用途；需按平台条件确认。 |
| 80 | CAM_SPI_CLK | 已注册 | 已注册 |  |
| 81 | CAM_PWDN | 已注册 | 已注册 |  |
| 82 | USB_BOOT | 已注册 | 已注册 | USB 启动功能。 |
| 100 | GPIO3 | 未开放 | 已注册 | 参考资料提示内置 GNSS 版本可能占用。 |
| 101 | GPIO4 | 已注册 | 未开放 |  |
| 103 | CAM_RST_N | 已注册 | 未开放 |  |

## ADC

ADC 端口 0、1 支持 `tkl_adc_read_voltage()`；`tkl_adc_read_data()` 和 `tkl_adc_read_single_channel()` 返回 `OPRT_NOT_SUPPORTED`。

## PWM

| Tuya PWM | Tuya Pin | PWM 通道（资料） |
|---:|---:|---|
| 0 | 22 | PWM0 |
| 1 | 23 | PWM1 |
| 2 | 54 | PWM2 |
| 3 | 25 | PWM3 |
| 4 | 20 | PWM4 |

PWM 引脚与其他功能复用，需按所选型号配置。

## I2C

按当前 C/G-Y7PM SDK `tkl_i2c.c` 默认路由：

| SDK I2C 端口 | SCL | SDA | 状态 |
|---:|---:|---:|---|
| I2C0 | Tuya Pin 57 | Tuya Pin 58 | SDK 默认配置；Pin 58 有旧资料中断异常提示 |
| I2C1 | Tuya Pin 67 | Tuya Pin 66 | SDK 默认配置；SDA=66、SCL=67 |

SDK 支持 I2C 主机初始化、发送和接收；IRQ 与从机接口不支持。

## SPI

参考资料中的引脚复用（需配置）：

| SPI 端口 | CS | MOSI | MISO | CLK |
|---:|---:|---:|---:|---:|
| SPI0 | 66 | 67 | 28 | 29 |
| SPI1 | 64 | 63 | 62 | 49 |

## UART

| Tuya UART | 资料状态 |
|---:|---|
| 0 | OK |
| 1 | OK |
| 2 | 待验证 |
| 3（USB UART） | OK |

接口引脚映射未提供。

## I2S

资料列出的 PCM/I2S 引脚为 Pin 30 PCM_CLK、31 PCM_SYNC、32 PCM_DIN、33 PCM_DOUT、26 I2S_MCLK，并提及 ES8311；需配置对应 codec 和时钟。

## 参考资料

- [硬件资料](https://github.com/tuya/tuyaopen-ide-manifests/blob/main/docs/hardware/l511c-g-y7pm.md)
- [L511C-Y7PM SDK 源码](https://github.com/tuya/TuyaOpen-LYNQ/tree/8034a0198880850ca9e579b2f254b592c3132327/tuyaos/tuyaos_adapter/src)
- [L511G-Y7PM SDK 源码](https://github.com/tuya/TuyaOpen-LYNQ/tree/d7ccde744e87659d8dd11bcaa7b246c5b9f856cf/tuyaos/tuyaos_adapter/src)
