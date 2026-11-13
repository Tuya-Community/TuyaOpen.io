---
id: ac79-devkitboard-peripheral-mapping
title: AC79_DevKitBoard 外设映射
description: "AC791 / WL82 开发板的固定管脚、GPIO 编号，以及 TKL 到 SDK 的外设映射。"
keywords:
  - AC79_DevKitBoard
  - AC791
  - WL82
  - JieLi
  - 杰理
  - 外设映射
  - 管脚映射
  - TKL
  - TuyaOpen 硬件
---

# AC79_DevKitBoard（AC791 / WL82）外设映射

本文的管脚编号是 TKL 的扁平编号：`16 × 端口序号 + bit`（PA0-PA15 = 0-15，…，PH0-PH15 = 112-127）。封装是否引出是硬件问题，表里列出的是 TKL 校验接受的范围。

## 板级固定管脚

| 管脚 | 用途 | 定义位置 |
| --- | --- | --- |
| PB3 | 日志 UART1 TX，115200 8N1（不使用 RX） | `CONFIG_JIELI_BOARD_LOG_UART_TX_PIN` |
| PA5 / PA6 | 服务 UART0 TX / RX，TAL CLI | `CONFIG_JIELI_BOARD_SERVICE_UART_TX_PIN` / `_RX_PIN` |
| USB DPA / DMA | USB 从机：Mass Storage，可选 CDC-ACM | `CONFIG_JIELI_BOARD_USB_ROLE=device` |
| PC9 / PB0 | 屏 DC / 屏复位（ILI9488 320x480，MCU8080） | 写死在 `tkl_8080.c`，无 Kconfig 符号 |
| PB2 | 音频 PA 静音，低电平有效，释放延时 200 ms | `audio_config.h` |
| PB1 | 按键 K1，ADC0 通道 3，按下范围 824-1007 | `board_com_api.c` |
| - | 麦克风 `LADC_CH_MIC1_P_N`，DAC 通道 0x05 | `audio_config.h` |

日志输出：`CONFIG_ENABLE_JIELI_USB_CDC_LOG`（默认 `n`）把 `tkl_log_output()` 从 PB3 的 `vprintf()` 切到 USB CDC-ACM；CDC 串口在上电几秒后才出现，启动早期的日志会丢失。波特率取 `CONFIG_JIELI_UART_LOG_BAUDRATE`（默认 115200）。

## GPIO

| 端口 | TKL 编号 |
| --- | --- |
| PA0-PA15 | `TUYA_GPIO_NUM_0` - `TUYA_GPIO_NUM_15` |
| PB0-PB15 | 16 - 31 |
| PC0-PC15 | 32 - 47 |
| PD0-PD15 | 48 - 63 |
| PE0-PE15 | 64 - 79 |
| PF0-PF15 | 80 - 95 |
| PG0-PG15 | 96 - 111 |
| PH0-PH15 | 112 - 127 |

| 能力 | 支持情况 |
| --- | --- |
| 输入、输出 | 支持；输出仅推挽 |
| 上拉 / 下拉 | 10 kΩ，可任选其一 |
| 开漏 | 不支持（`OPRT_NOT_SUPPORTED`） |
| 中断 | 仅上升沿 / 下降沿；同时最多 2 个管脚，且只能在厂商重映射表内的管脚上使用 |

PI、PR 以及 USB 焊盘不在 0-127 范围内，适配层会拒绝。

## UART

| TKL 端口 | SDK 端口 | 管脚 |
| --- | --- | --- |
| `TUYA_UART_NUM_0` | `uart0` | 下表中四组之一 |
| `TUYA_UART_NUM_1` | `uart2` | PH2 TX / PH3 RX，固定 |

| UART0 组 | TX | RX |
| --- | --- | --- |
| 0（服务串口默认） | PA5 | PA6 |
| 1 | PB1 | PB2 |
| 2 | PA3 | PA4 |
| 3 | PH0 | PH1 |

| 项目 | 说明 |
| --- | --- |
| 帧格式 | 8 数据位、1 停止位、无校验、无流控 |
| 波特率 | UART0 由 TKL 配置决定；UART1 固定 115200 |
| 接收 | 由任务每 10 ms 轮询一次（WL82 无 RX 中断事件），1 KB 环形缓冲 |
| UART1 开关 | `CONFIG_JIELI_BOARD_UART1_ENABLE`（默认 `n`）；除 PH2/PH3 之外的组合会编译报错 |
| UART0 改管脚 | 同一组的两个管脚各调用一次 `tkl_io_pinmux_config()`；跨组或只配一个管脚返回 `OPRT_NOT_SUPPORTED` |

打开 UART1 会停掉 PB3 上的厂商调试台输出，且 PH2 同时是 PWM0 输出，二者只能选其一。

## IIC

| TKL 端口 | 实现 | 速率 |
| --- | --- | --- |
| `TUYA_I2C_NUM_0` | 软件模拟（bit-bang） | 时序固定，请求的速率不生效 |
| `TUYA_I2C_NUM_1` | 硬件 | 仅 400 kHz |

| IIC1 组 | SCL | SDA |
| --- | --- | --- |
| 0 | USB DPA | USB DMA |
| 1（默认） | PA7 | PA8 |
| 2 | PC1 | PC2 |
| 3 | PH0 | PH1 |

IIC0 默认 PA0 SCL / PA1 SDA，只能在板级 Kconfig 里修改。两个端口都仅支持主机和 7 位地址；从机模式与寄存器地址类 ioctl 不支持。

## ADC

ADC0，10 位，参考电压 3300 mV，支持扫描和连续采样，单次采样不支持；单次请求最多 10 个通道。

| 通道 | 管脚 | SDK 枚举 |
| --- | --- | --- |
| 0 | PA7 | `AD_CH_PA07` |
| 1 | PA8 | `AD_CH_PA08` |
| 2 | PA10 | `AD_CH_PA10` |
| 3 | PB1 | `AD_CH_PB01` |
| 4 | PB6 | `AD_CH_PB06` |
| 5 | PB7 | `AD_CH_PB07` |
| 6 | PC0 | `AD_CH_PC00` |
| 7 | PC1 | `AD_CH_PC01` |
| 8 | PC9 | `AD_CH_PC09` |
| 9 | PC10 | `AD_CH_PC10` |
| 10 | PH0 | `AD_CH_PH00` |
| 11 | PH3 | `AD_CH_PH03` |
| 12 | USB DMA | `AD_CH_DM` |
| 13 | USB DPA | `AD_CH_DP` |

先用 `tkl_io_pinmux_config(pin, TUYA_ADC0)` 配置焊盘，再按上表通道号读取。

## SPI

| 控制器 | 组 | CLK | DO (MOSI) | DI (MISO) | 适配层 |
| --- | --- | --- | --- | --- | --- |
| SPI0 | A | PD4 | PD5 | PD1 | 拒绝 |
| SPI0 | B（默认） | PC3 | PC4 | PC0 | 可选 |
| SPI1 | A | PB6 | PB7 | PB5 | 可选 |
| SPI1 | B（默认） | PC9 | PC10 | PC8 | 可选 |
| SPI2 | A（默认） | PH0 | PH1 | PH2 | 可选 |
| SPI2 | B | USB DPA | USB DMA | PG15 | 拒绝 |
| SPI2 | C | PA3 | PA4 | PA2 | 可选 |

| 项目 | 说明 |
| --- | --- |
| 模式 | 主机、8 位、模式 0 |
| 速率 | 固定 1 MHz，其他速率返回 `OPRT_NOT_SUPPORTED` |
| 位序 | 默认 MSB；`TUYA_SPI_ORDER_LSB2MSB` 由软件逐字节翻转实现 |
| 片选 | 由用户当作 GPIO 驱动；控制器没有 CS 寄存器，TKL 也没有 CS 参数 |
| 改管脚 | 逐管脚的 `tkl_io_pinmux_config(pin, TUYA_SPIn_*)` 会被拒绝；分组由平台数据里的 `.port` 字母决定（`jieli_wl82_spi_pinmux_select()`），在控制器打开时生效 |

## PWM

| 通道 | 管脚 | 硬件 |
| --- | --- | --- |
| `TUYA_PWM_NUM_0` | 默认 PH2（`CONFIG_JIELI_BOARD_PWM0_PIN`） | TIMER2 输出通道 2 |

| 项目 | 说明 |
| --- | --- |
| 占空比 | 以 `cycle` 为基准的计数值；`cycle == 0` 按 10000 处理 |
| 极性 | 仅正向 |
| 通道数 | 只有 PWM0；`TUYA_PWM_NUM_1` 到 `_3` 以及多通道启停返回 `OPRT_NOT_SUPPORTED` |
| 改管脚 | 只能在板级 Kconfig 里改，WL82 没有 PWM 的 pinmux 通路 |

## TIMER

| TKL 定时器 | `TUYA_TIMER_NUM_0` - `TUYA_TIMER_NUM_5` |
| --- | --- |
| 硬件 | 共用 SDK 的微秒定时服务，不是 6 个独立硬件定时器 |
| 并发 | 同一时刻只能有 1 个，第二次启动返回 `OPRT_RESOURCE_NOT_READY` |
| 回调 | 在 SDK 定时任务中执行，不是中断上下文 |
| 单位 | 微秒，支持单次和周期 |
