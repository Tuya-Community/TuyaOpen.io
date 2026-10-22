---
id: ac792n-develop-board-peripheral-mapping
title: AC792N_Develop_Board 外设映射说明
description: "阐明 AC792N_Develop_Board（AC792N / WL83）硬件外设与涂鸦 TKL 层软件外设端口的映射关系：覆盖 GPIO、ADC、UART、IIC、PWM、TIMER、SPI、MIPI-DSI 的板级引脚与软件端口，并标明当前 TuyaOpen 的支持状态。"
keywords:
  - AC792N_Develop_Board
  - AC792N
  - AC7926A
  - WL83
  - JieLi
  - 杰理
  - 外设映射
  - TKL
  - TuyaOpen 硬件
---

本文说明 AC792N_Develop_Board（AC792N / WL83）的硬件外设与涂鸦 TKL 层软件外设端口的映射关系。

> 本文的引脚数据来自厂商 SDK 的板级文件与头文件，**不是原理图**。原理图未随仓库提供，因此"某个引脚在封装上是否引出、板子上是否已被其他功能占用"仍需对照对应版本的原理图确认。文中标注为"未注册"或"未验证"的项，不能当作可用能力。

## 引脚命名与编号

杰理用 `IO_PORT<端口字母>_<序号>` 命名引脚，并且**这个名字本身就是一个数字**：

```c
#define IO_GROUP_NUM  16
#define IO_PORTA_07   (IO_GROUP_NUM * 0 + 7)    /* = 7  */
#define IO_PORTD_07   (IO_GROUP_NUM * 3 + 7)    /* = 55 */
```

端口 A 占 0–15、B 占 16–31，以此类推。这与涂鸦 `TUYA_GPIO_NUM_E` 的扁平编号一致，因此 **`PA7` 就是软件引脚 `7`**。

**注意：ADC 通道号是另一套命名空间**，与引脚号无关——`ADC_IO_CH_PD00` 是通道 0，与 GPIO 的 PD0 不是同一个编号体系。

## GPIO

- 各端口宽度**不一致**（取自 `asm/gpio.h` 的端口掩码）：

  | 端口 | 宽度 | 引脚范围 |
  | ---- | ---- | -------- |
  | A | 16 | 0–15 |
  | B | 16 | 16–31 |
  | C | **14** | 32–45（PC14 / PC15 不存在） |
  | D | 16 | 48–63 |
  | E | 16 | 64–79 |
  | F | **6** | 80–85 |
  | FUSB | 2 | 96（DPA）、97（DMA） |
  | HUSB | 2 | 112（DPB）、113（DMB） |

  因此 46、47、86–95、98–111 不是有效引脚；R（128/129）与 V（144/145）超出 `IO_MAX_NUM`，不在上述编号内。
- 涂鸦 TKL 的 GPIO 编号上限是 `TUYA_GPIO_NUM_MAX`（64），因此**只能访问 A–D 端口（0–63）**。

| 板级引脚 | 功能 | 软件引脚 | 软件端口 |
| -------- | ---- | -------- | -------- |
| PA0 – PD15 | GPIO | `TUYA_GPIO_NUM_0` – `TUYA_GPIO_NUM_63` | / |

### 中断

- 本芯片使用真正的**每引脚外部中断**（`exti_init`），引脚数量不受事件表限制。
- 触发方式仅支持**上升沿**与**下降沿**，不支持双边沿或电平触发。
- 仍受 TKL 上限约束：只能对 0–63 的引脚注册中断。

### 电气模式

- 上拉 / 下拉：仅 10K 档可用（厂商头文件标注 100K / 1M 本芯片不支持）。
- 开漏输出：芯片无此模式，`tkl_gpio_init` 会返回 `OPRT_NOT_SUPPORTED`。

## ADC

- 模块支持 1 路 ADC（`TUYA_ADC_NUM_0`），**10 bit**，参考电压 3.3V。
- 外部模拟通道共 16 个：

| 板级引脚 | 软件通道 | 软件端口 |
| -------- | -------- | -------- |
| **PD0** | `ch_0`（**K1 按键**） | `TUYA_ADC_NUM_0` |
| PD1 | `ch_1` | `TUYA_ADC_NUM_0` |
| PD6 | `ch_2` | `TUYA_ADC_NUM_0` |
| PD7 | `ch_3` | `TUYA_ADC_NUM_0` |
| PD8 | `ch_4` | `TUYA_ADC_NUM_0` |
| PD9 | `ch_5` | `TUYA_ADC_NUM_0` |
| PD10 | `ch_6` | `TUYA_ADC_NUM_0` |
| PE4 | `ch_7` | `TUYA_ADC_NUM_0` |
| PE5 | `ch_8` | `TUYA_ADC_NUM_0` |
| PE6 | `ch_9` | `TUYA_ADC_NUM_0` |
| PE7 | `ch_10` | `TUYA_ADC_NUM_0` |
| PE8 | `ch_11` | `TUYA_ADC_NUM_0` |
| PE9 | `ch_12` | `TUYA_ADC_NUM_0` |
| PC13 | `ch_13` | `TUYA_ADC_NUM_0` |
| DP | `ch_14` | `TUYA_ADC_NUM_0` |
| DM | `ch_15` | `TUYA_ADC_NUM_0` |

- 板载 K1 按键接在 **PD0（ADC 通道 0）** 的电阻梯上，按键范围 0–96（原始值）。
- 注意 PD1 同时是日志串口的 TX 引脚，PD0/PD1 不宜挪作普通 GPIO。
- 温度读取与 `tkl_adc_ioctl` 未实现，返回 `OPRT_NOT_SUPPORTED`。

## UART

- 模块的日志口是 **SDK UART0：TX = PD1，RX = PE11**。
- **本板没有独立的服务串口**（`JIELI_BOARD_HAS_SERVICE_UART = n`），因此 **TAL CLI 与日志共用同一个 `uart0`**，控制台输出和 CLI 输入共享同一物理串口。
- 波特率由 `CONFIG_JIELI_UART_LOG_BAUDRATE` 决定，默认 **115200**（厂商头文件中的 1000000 会被平台在 staging 阶段改写）。
- TKL 逻辑 `TUYA_UART_NUM_0` 映射到 SDK `uart0`；逻辑 `TUYA_UART_NUM_1` 映射到 SDK `uart2`，但 **`uart2` 在当前板级配置中未注册**（`TCFG_UART2_ENABLE` 只在使用 `USE_UART_DEVICE_TEST_DEMO` 时定义），因此逻辑 UART1 运行时不可用。

| 板级引脚 | 功能 | 软件引脚 | 软件端口 |
| -------- | ---- | -------- | -------- |
| PD1 | UART0_TX（日志 + CLI） | `TUYA_UART0_TX` | `TUYA_UART_NUM_0` |
| PE11 | UART0_RX（日志 + CLI） | `TUYA_UART0_RX` | `TUYA_UART_NUM_0` |

- **PE11 = 75，超出 TKL GPIO 的 0–63 范围**，只能在厂商侧配置，不能通过 `tkl_gpio_*` 访问。
- 接收通过厂商的中断事件回调实现：ISR 只投递信号量，由任务调用 `dev_read`。
- TX 中断、硬件流控、`tkl_uart_wait_for_data`、`tkl_uart_ioctl` 未实现。

## IIC

- 芯片有硬件 IIC 与软件模拟 IIC。厂商的 `demo_hello` 板级文件定义了 3 路，**全部位于 `USE_IIC_TEST_DEMO` 开关之后，当前未启用**：

| 设备 | 类型 | 板级引脚 |
| ---- | ---- | -------- |
| `iic0` | 硬件 IIC | SCL PA4、SDA PA5 |
| `iic1` | 硬件 IIC | SCL PA6、SDA PA7 |
| `iic2` | 软件 IIC | SCL PA6、SDA PA7 |

> **当前状态：未注册**，因此 `tkl_i2c_init` 运行时会返回 `OPRT_NOT_SUPPORTED`，`ENABLE_I2C` 未声明。要启用需按原理图确认空闲引脚后在板级配置中注册设备。

## PWM

- 厂商板级文件定义了 `pwm1`，**位于 `USE_PWM_TEST_DEMO` 开关之后，当前未启用**：
  - 定时器 PWM 重映射引脚：PA4（对应 TIMER2）
  - MCPWM 通道：全部为 `-1`（未使用）
- 本芯片支持**多通道** PWM（每个通道的引脚在板级重映射表中固定）。

> **当前状态：未注册**，`ENABLE_PWM` 未声明。

## TIMER

- TKL 定时器基于厂商的微秒级定时器服务实现，**不需要板级注册，也不需要占用引脚**。
- 回调运行在 SDK 的定时器**任务**中，而不是中断里（`call_in_irq = 0`），因此回调内可以安全地 `tkl_timer_stop` / `tkl_timer_deinit` 自身。代价是回调延迟为一个调度 tick。
- `tkl_timer_get` 返回自启动以来经过的微秒数。

## SPI

- 芯片有 3 个 SPI 控制器。厂商板级文件定义了 `spi1` / `spi2`，**均位于对应的 `USE_SPI_*_TEST_DEMO` 开关之后，当前未启用**。
- `spi1`（主模式示例）：CLK PA4、DO PA5、DI PA6、CS `-1`（由软件控制）。

> **当前状态：未注册**，`ENABLE_SPI` 未声明。
>
> 适配层实现的是**同步**主模式收发（8 bit、MSB first）；从机、中断完成回调、状态查询与 ioctl 均返回 `OPRT_NOT_SUPPORTED`。

## MIPI-DSI 显示

- 板载 MIPI-DSI 屏幕，面板型号 `MIPI_480x800_ST7701S`。
- 板级控制引脚：复位 `PB0`，背光 `PB1`（来自板级 facts）。
- 该路径由显示 TDD 使用，**不经过 GPIO/SPI 的 TKL 接口**。

## 本板已占用的资源

新增外设前请避开以下已登记用途：

| 引脚 | 用途 |
| ---- | ---- |
| PD1 | 日志输出（SDK UART0 TX） |
| PE11 | 日志 / CLI 输入（SDK UART0 RX） |
| PD0 | K1 按键（ADC 通道 0） |
| PB0 | 显示复位 |
| PB1 | 显示背光 |
| PA4 / PA5 / PA6 / PA7 | 厂商示例中定义为 IIC / PWM / SPI（当前未注册，未核对原理图） |

## 当前 TuyaOpen 支持状态

| 外设 | TKL 实现 | capability 声明 | 运行时可用 |
| ---- | -------- | --------------- | ---------- |
| GPIO（含中断、上下拉） | 有 | `ENABLE_GPIO` | 可用（0–63；PC14/PC15 不存在） |
| ADC | 有 | `ENABLE_ADC` | 可用（ADC0，10 bit，16 通道） |
| UART | 有 | `ENABLE_UART` | 可用（逻辑 UART0 = uart0，PD1 / PE11；逻辑 UART1 未注册） |
| TIMER | 有 | `ENABLE_TIMER` | 可用 |
| IIC | 有 | 未声明 | **不可用**：板级未注册设备 |
| PWM | 有 | 未声明 | **不可用**：板级未注册设备 |
| SPI | 有 | 未声明 | **不可用**：板级未注册设备 |
| MIPI-DSI | 有（仅本芯片） | 由板级显示 facts 声明 | 可用（不由 TKL 外设接口暴露） |
| pinmux | 有（仅本芯片） | 未声明 | 可用但未声明：`ENABLE_PINMUX` 无芯片维度，声明会误导 wl82 |
