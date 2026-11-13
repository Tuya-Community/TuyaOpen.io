---
id: ac792n-develop-board-peripheral-mapping
title: AC792N_Develop_Board 外设映射
description: "AC792N / WL83 开发板的固定管脚、GPIO 编号，以及 TKL 到 SDK 的外设映射。"
keywords:
  - AC792N_Develop_Board
  - AC792N
  - AC7926A
  - WL83
  - JieLi
  - 杰理
  - 外设映射
  - 管脚映射
  - TKL
  - TuyaOpen 硬件
  - MIPI-DSI
---

# AC792N_Develop_Board（AC792N / WL83）外设映射

本文的管脚编号是 TKL 的扁平编号：`16 × 端口序号 + bit`。WL83 引出的焊盘比 WL82 少：只有 PC0-PC13、PF0-PF5 和 USB 焊盘。封装是否引出是硬件问题，表里列出的是 TKL 校验接受的范围。

## 板级固定管脚

| 管脚 | 用途 | 定义位置 |
| --- | --- | --- |
| PD1 / PE11 | 日志 UART0 TX / RX，115200 8N1 | `CONFIG_JIELI_BOARD_LOG_UART_PORT=0`；TX 管脚符号留空时沿用厂商的 PD1 |
| HUSB DPB / DMB | USB 从机：Mass Storage，可选 CDC-ACM | `CONFIG_JIELI_BOARD_USB_ROLE=host` → `TCFG_HUSB_DEVICE` |
| PB0 / PB1 | MIPI-DSI 复位 / 背光（ST7701S 480x800） | `CONFIG_JIELI_BOARD_DISPLAY_RESET_IO` / `_BACKLIGHT_IO` |
| PC7 / PC6 / PC9 | MIC1 ADC0 P / N，偏置 MICBIASA | `audio_config.h` |
| PC11 / PC12 / PC10 | MIC2 ADC1 P / N，偏置 MICBIASB；实际采集的通道 | `audio_config.h` |
| PE15 | 音频 PA 静音，静音值为低电平，释放延时 300 ms | `audio_config.h` |
| PD0 | 按键 K1，ADC0 通道 0，按下范围 0-96 | `board_com_api.c` |

两路麦克风都已配置，但采集通路只映射 ADC1（MIC2）；同时打开两路会让厂商 ADC 驱动报错。

日志输出：`CONFIG_ENABLE_JIELI_USB_CDC_LOG`（默认 `n`）把 `tkl_log_output()` 从 UART 切到 USB CDC-ACM；CDC 串口在上电几秒后才出现。波特率取 `CONFIG_JIELI_UART_LOG_BAUDRATE`（默认 115200）。

## GPIO

| 端口 | TKL 编号 |
| --- | --- |
| PA0-PA15 | `TUYA_GPIO_NUM_0` - `TUYA_GPIO_NUM_15` |
| PB0-PB15 | 16 - 31 |
| PC0-PC13 | 32 - 45（PC14 / PC15 不存在） |
| PD0-PD15 | 48 - 63 |
| PE0-PE15 | 64 - 79 |
| PF0-PF5 | 80 - 85（PF6-PF15 不存在） |
| FUSB DPA / DMA | 96 / 97 |
| HUSB DPB / DMB | 112 / 113 |

| 能力 | 支持情况 |
| --- | --- |
| 输入、输出 | 支持；输出仅推挽 |
| 上拉 / 下拉 | 10 kΩ，可任选其一 |
| 开漏 | 不支持（`OPRT_NOT_SUPPORTED`） |
| 中断 | 仅上升沿 / 下降沿；每个管脚一个 EXTI，不支持 EXTI 的管脚返回 `OPRT_NOT_SUPPORTED` |

端口 G 以及大于 127 的编号会被适配层拒绝。

## UART

| TKL 端口 | SDK 端口 | 管脚 |
| --- | --- | --- |
| `TUYA_UART_NUM_0` | `uart0` | PD1 TX / PE11 RX（日志串口） |
| `TUYA_UART_NUM_1` | `uart2` | PB4 TX / PB5 RX |

| 项目 | 说明 |
| --- | --- |
| 帧格式 | 8 数据位、1 停止位、无校验、无流控 |
| 波特率 | 任意非 0 值 |
| 接收 | 中断驱动：SDK 的 RX 事件唤醒任务后执行 TAL 回调；1 KB 环形缓冲 |
| 改管脚 | 逐管脚调用 `tkl_io_pinmux_config()`，使用扁平编号；请求会在端口打开后重新生效 |
| 日志管脚 | 在生成的厂商 board 中设置，不走 pinmux API |

## IIC

| TKL 端口 | 实现 | 速率 | 默认管脚 |
| --- | --- | --- | --- |
| `TUYA_I2C_NUM_0` | 硬件 | 100 kHz、400 kHz、1 MHz | PA4 SCL / PA5 SDA |
| `TUYA_I2C_NUM_1` | 硬件 | 100 kHz、400 kHz、1 MHz | PA6 SCL / PA7 SDA |
| `TUYA_I2C_NUM_2` | 软件模拟（bit-bang） | 时序固定，请求的速率不生效 | PA2 SCL / PA3 SDA |

不支持 3.4 MHz。两个硬件端口在管脚交叉开关上，运行时请求可以覆盖板级默认；软件端口只能在板级 Kconfig 里改。仅支持主机和 7 位地址；从机模式与寄存器地址类 ioctl 不支持。

## ADC

ADC0，10 位，参考电压 3300 mV，支持扫描和连续采样，单次采样不支持；单次请求最多 8 个通道。

| 通道 | 管脚 | SDK 枚举 |
| --- | --- | --- |
| 0 | PD0 | `ADC_IO_CH_PD00` |
| 1 | PD1 | `ADC_IO_CH_PD01` |
| 2 | PD6 | `ADC_IO_CH_PD06` |
| 3 | PD7 | `ADC_IO_CH_PD07` |
| 4 | PD8 | `ADC_IO_CH_PD08` |
| 5 | PD9 | `ADC_IO_CH_PD09` |
| 6 | PD10 | `ADC_IO_CH_PD10` |
| 7 | PE4 | `ADC_IO_CH_PE04` |
| 8 | PE5 | `ADC_IO_CH_PE05` |
| 9 | PE6 | `ADC_IO_CH_PE06` |
| 10 | PE7 | `ADC_IO_CH_PE07` |
| 11 | PE8 | `ADC_IO_CH_PE08` |
| 12 | PE9 | `ADC_IO_CH_PE09` |
| 13 | PC13 | `ADC_IO_CH_PC13` |
| 14 | FUSB DPA | `ADC_IO_CH_DP` |
| 15 | HUSB DPB | `ADC_IO_CH_DM` |

单次采样不支持；`ch_nums` 必须等于 `ch_list` 中置位的个数。

## SPI

| 控制器 | CLK | DO (MOSI) | DI (MISO) |
| --- | --- | --- | --- |
| SPI0 | PC3 | PC4 | PC5 |
| SPI1 | PC0 | PC1 | PC2 |
| SPI2 | PD2 | PD3 | PD4 |

| 项目 | 说明 |
| --- | --- |
| 模式 | 主机、8 位、模式 0 |
| 速率 | 初始化时通过 `IOCTL_SPI_SET_BAUDRATE` 设置，任意非 0 值 |
| 位序 | 默认 MSB；`TUYA_SPI_ORDER_LSB2MSB` 由软件逐字节翻转实现 |
| 片选 | 由用户当作 GPIO 驱动；控制器没有 CS，TKL 也没有 CS 参数 |
| 改管脚 | 逐管脚的 `tkl_io_pinmux_config()` 只在该端口打开前有效，打开后返回 `OPRT_COM_ERROR` |

## PWM

| 通道 | H 管脚 | L 管脚 |
| --- | --- | --- |
| `TUYA_PWM_NUM_0` | PB8 | PB9 |
| `TUYA_PWM_NUM_1` | PA8 | PA10 |
| `TUYA_PWM_NUM_2` | PB10 | PB11 |
| `TUYA_PWM_NUM_3` | PB12 | PB13 |

| 项目 | 说明 |
| --- | --- |
| 硬件 | MCPWM，每个 TKL 通道对应一对互补的 H / L |
| 占空比 | 以 `cycle` 为基准的计数值；`cycle == 0` 按 10000 处理 |
| 极性 | 正向和反向都支持 |
| 通道 | 通道 1 在设备打开时完成映射；通道 0、2、3 在运行时通过 `IOCTL_PWM_SET_ADD_CHANNEL` 添加 |
| 改管脚 | 只能在板级 Kconfig 里改，pinmux API 没有 PWM 通路 |

## TIMER

| TKL 定时器 | `TUYA_TIMER_NUM_0` - `TUYA_TIMER_NUM_5` |
| --- | --- |
| 硬件 | 共用 SDK 的微秒定时服务，不是 6 个独立硬件定时器 |
| 并发 | 同一时刻只能有 1 个，第二次启动返回 `OPRT_RESOURCE_NOT_READY` |
| 回调 | 在 SDK 定时任务中执行，不是中断上下文 |
| 单位 | 微秒，支持单次和周期 |
