---
title: L511C/G-Y7PM 外设映射说明
description: L511C/G-Y7PM 模组外设、引脚复用及 TuyaOpen SDK 支持状态。
---

# L511C/G-Y7PM 外设引脚映射

适用于 L511C-Y7PM 与 L511G-Y7PM。TKL GPIO API 传入的是模组 Tuya Pin 引脚号，不是 SoC GPIO 号。此表仅说明普通 GPIO API 支持；引脚未注册时，`tkl_gpio_init` 返回 `OPRT_COM_ERROR`。GPIO“OK”硬件资料只覆盖输出，不能据此推导输入、中断、唤醒或复用功能已验证。

## GPIO

模组 I/O 默认电压为 **1.8 V**。只有对应型号 SDK 支持且已正确配置时才切换至 3.3 V；接线前确认信号电平、共地及具体板卡原理图。下表状态依据 C/G SDK 的 `pinMap`、`get_pinmap` 和 `tkl_gpio_init`，不代表实机验证。`已注册`表示映射存在且 init 未因专门分支拒绝；`未开放`表示未注册；`专用/条件使用`表示有专用用途或 init 条件限制。未开放普通 GPIO 不代表该 pin 不能由独立 I2C/SPI 驱动复用。

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

当前 C/G-Y7PM SDK 适配层接受 `port_num` 0、1（`ADC_CHN_MAX=2`）；对应 SDK ADC0、ADC1。`tkl_adc_read_voltage()`有读取实现，但 `tkl_adc_read_data()`、`tkl_adc_read_single_channel()`返回 `OPRT_NOT_SUPPORTED`。旧硬件表写 Tuya ADC 1→ADC0、2→ADC1，与当前软件端口编号不一致；旧表还列 ADC_BAT，但没有在此确认对应端口/API。按当前 SDK 应用接口使用 0/1，并以目标平台验证结果为准。

## PWM

| Tuya PWM | Tuya Pin | PWM 通道（资料） |
|---:|---:|---|
| 0 | 22 | PWM0 |
| 1 | 23 | PWM1 |
| 2 | 54 | PWM2 |
| 3 | 25 | PWM3 |
| 4 | 20 | PWM4 |

PWM 端口与模组引脚对应如下；这些引脚与其他功能复用。使用前请按所选 C/G 型号检查板级 pinmux 和可用 API。

## I2C

按当前 C/G-Y7PM SDK `tkl_i2c.c` 默认路由：

| SDK I2C 端口 | SCL | SDA | 状态 |
|---:|---:|---:|---|
| I2C0 | Tuya Pin 57 | Tuya Pin 58 | SDK 默认配置；Pin 58 有旧资料中断异常提示 |
| I2C1 | Tuya Pin 67 | Tuya Pin 66 | SDK 默认配置；SDA=66、SCL=67 |

旧硬件资料还列出 Pin 38/39→I2C0、Pin 57/58→I2C1、Pin 80/81→I2C1 等组合；这些是历史候选记录，**不是当前 SDK 默认路由，不应当作可用映射**。C/G源码中主机初始化、发送、接收有实现；IRQ及从机等接口不支持。具体模组是否引出这些管脚、外设是否占用，需按板级配置和原理图核验。

## SPI

旧硬件资料列出的候选复用为 SPI0：CS=66、MOSI=67、MISO=28、CLK=29；SPI1：CLK=49、MISO=62、MOSI=63、CS=64。它们与 I2C、AUX UART、LCD、USIM 等复用；当前板级是否启用需分别核对 C/G 配置。SDK 有 SPI 适配源码，但不据此宣称候选引脚已验证可用。旧资料的外部 Flash 容量建议不能代替实际器件规格。

## UART

硬件资料列 UART0、UART1、USB UART（Tuya UART 3）为 OK，UART2待验证，但未给出前三者完整的 Tuya Pin 路由；Pin 28/29 名为 AUX_RXD/AUX_TXD，不足以单独确认其对应哪个 TKL UART 端口。请查具体型号 pinmux/配置后接线。GPIO 表的输出验证不证明 UART 或输入/中断工作正常。

## I2S

硬件资料记录 PCM/I2S 候选：Pin 30 PCM_CLK、31 PCM_SYNC、32 PCM_DIN、33 PCM_DOUT、26 I2S_MCLK，并提及 ES8311 模组。Pin 32 有中断异常备注。音频 SDK 适配和资料记录不能证明指定模组上的 codec、时钟、引脚及链路已经实测，使用前需核对电路和型号配置。

## 参考资料

- [L511C/G-Y7PM 硬件资料（manifest main）](https://github.com/tuya/tuyaopen-ide-manifests/blob/main/docs/hardware/l511c-g-y7pm.md)
- [L511C-Y7PM SDK 源码](https://github.com/tuya/TuyaOpen-LYNQ/tree/8034a0198880850ca9e579b2f254b592c3132327/tuyaos/tuyaos_adapter/src)
- [L511G-Y7PM SDK 源码](https://github.com/tuya/TuyaOpen-LYNQ/tree/d7ccde744e87659d8dd11bcaa7b246c5b9f856cf/tuyaos/tuyaos_adapter/src)
