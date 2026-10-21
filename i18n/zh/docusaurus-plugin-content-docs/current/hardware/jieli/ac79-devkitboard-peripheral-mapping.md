---
id: ac79-devkitboard-peripheral-mapping
title: AC79_DevKitBoard 外设映射说明
description: "阐明 AC79_DevKitBoard（AC791 / WL82）硬件外设与涂鸦 TKL 层软件外设端口的映射关系：覆盖 GPIO、ADC、UART、IIC、PWM、TIMER、SPI 的板级引脚与软件端口，并标明当前 TuyaOpen 的支持状态。"
keywords:
  - AC79_DevKitBoard
  - AC791
  - WL82
  - JieLi
  - 杰理
  - 外设映射
  - TKL
  - TuyaOpen 硬件
---

本文说明 AC79_DevKitBoard（AC791 / WL82）的硬件外设与涂鸦 TKL 层软件外设端口的映射关系。

> 本文的引脚数据来自厂商 SDK 的板级文件与头文件，**不是原理图**。原理图未随仓库提供，因此"某个引脚在封装上是否引出、板子上是否已被其他功能占用"仍需对照对应版本的原理图确认。文中标注为"未注册"或"未验证"的项，不能当作可用能力。

## 引脚命名与编号

杰理用 `IO_PORT<端口字母>_<序号>` 命名引脚，并且**这个名字本身就是一个数字**：

```c
#define IO_GROUP_NUM  16
#define IO_PORTA_07   (IO_GROUP_NUM * 0 + 7)    /* = 7  */
#define IO_PORTD_07   (IO_GROUP_NUM * 3 + 7)    /* = 55 */
```

端口 A 占 0–15、B 占 16–31，以此类推。这与涂鸦 `TUYA_GPIO_NUM_E` 的扁平编号完全一致，因此 **`PA7` 就是软件引脚 `7`**，无需查表：

| 板级引脚 | 厂商宏 | 软件引脚 |
| -------- | ------ | -------- |
| PA7 | `IO_PORTA_07` | 7 |
| PB1（K1 按键） | `IO_PORTB_01` | 17 |
| PB3（日志 TX） | `IO_PORTB_03` | 19 |
| PD7 | `IO_PORTD_07` | 55 |

**注意：ADC 通道号是另一套命名空间**，与引脚号无关——`AD_CH_PB01` 是通道 3，而 `IO_PORTB_01` 是引脚 17。

## GPIO

- 芯片的 GPIO 端口为 A–H，每个端口 16 位，编号 0–127。
- 厂商头文件还定义了 `IO_PORTI_00`–`IO_PORTI_15` 并把 `IO_MAX_NUM` 算作 144，但 `WL82.h` 中**没有 `JL_PORTI` 寄存器块**，端口 I 只有名字没有实现，不可使用。
- 涂鸦 TKL 的 GPIO 编号上限是 `TUYA_GPIO_NUM_MAX`（64），因此**只能访问 A–D 端口（0–63）**。

| 板级引脚 | 功能 | 软件引脚 | 软件端口 |
| -------- | ---- | -------- | -------- |
| PA0 – PD15 | GPIO | `TUYA_GPIO_NUM_0` – `TUYA_GPIO_NUM_63` | / |

### 中断

- **任意引脚的外部中断最多同时使用 2 个**。芯片只有 `EVENT_IO_0`、`EVENT_IO_1` 两个可重映射事件，各自只有一个重映射字段。
- 厂商的重映射表**不包含端口 D 和端口 F**，这些引脚无法用作外部中断（作普通 GPIO 可以）。
- 触发方式仅支持**上升沿**与**下降沿**，不支持双边沿或电平触发。
- 使用某个引脚作中断后，厂商驱动会按触发边沿自动设置上/下拉，会覆盖 `tkl_gpio_init` 中请求的上下拉。

### 电气模式

- 上拉 / 下拉：固定 10K，可用。
- 开漏输出：芯片无此模式，`tkl_gpio_init` 会返回 `OPRT_NOT_SUPPORTED`。

## ADC

- 模块支持 1 路 ADC（`TUYA_ADC_NUM_0`），**10 bit**，参考电压 3.3V。
- 外部通道共 14 个（通道 0–13）。另有 RTC / PMU 内部通道（0xe / 0xf），不属于 TKL 的外部采样范围。

| 板级引脚 | 功能 | 软件通道 | 软件端口 |
| -------- | ---- | -------- | -------- |
| PA7 | ADC ch0 | `ch_0` | `TUYA_ADC_NUM_0` |
| PA8 | ADC ch1 | `ch_1` | `TUYA_ADC_NUM_0` |
| PA10 | ADC ch2 | `ch_2` | `TUYA_ADC_NUM_0` |
| **PB1** | **ADC ch3（K1 按键）** | `ch_3` | `TUYA_ADC_NUM_0` |
| PB6 | ADC ch4 | `ch_4` | `TUYA_ADC_NUM_0` |
| PB7 | ADC ch5 | `ch_5` | `TUYA_ADC_NUM_0` |
| PC0 | ADC ch6 | `ch_6` | `TUYA_ADC_NUM_0` |
| PC1 | ADC ch7 | `ch_7` | `TUYA_ADC_NUM_0` |
| PC9 | ADC ch8 | `ch_8` | `TUYA_ADC_NUM_0` |
| PC10 | ADC ch9 | `ch_9` | `TUYA_ADC_NUM_0` |
| PH0 | ADC ch10 | `ch_10` | `TUYA_ADC_NUM_0` |
| PH3 | ADC ch11 | `ch_11` | `TUYA_ADC_NUM_0` |
| DM | ADC ch12 | `ch_12` | `TUYA_ADC_NUM_0` |
| DP | ADC ch13 | `ch_13` | `TUYA_ADC_NUM_0` |

- 板载 K1 按键接在 **PB1（ADC 通道 3）** 的电阻梯上，按键范围 824–1007（原始值）。
- 单次采样请使用 `tkl_adc_read_single_channel`；`tkl_adc_read_data` 按已注册通道的升序返回。
- 温度读取（`tkl_adc_temperature_get`）与 `tkl_adc_ioctl` 未实现，返回 `OPRT_NOT_SUPPORTED`。

## UART

- 模块有 3 路硬件串口（UART0/1/2）。
- **日志口是 SDK UART1（PB3）**，板级配置中其 RX 为 `-1`（仅发送）。
- **服务串口（TAL CLI）是 SDK UART0（PA5 / PA6）**，与日志口物理分开。
- 涂鸦 TKL 逻辑 `TUYA_UART_NUM_0` 映射到 SDK `uart0`；**逻辑 UART1 在本芯片上不支持**（返回 `OPRT_NOT_SUPPORTED`）。

| 板级引脚 | 功能 | 软件引脚 | 软件端口 |
| -------- | ---- | -------- | -------- |
| PB3 | UART1_TX（日志） | / | / |
| PA5 | UART0_TX（服务 / CLI） | `TUYA_UART0_TX` | `TUYA_UART_NUM_0` |
| PA6 | UART0_RX（服务 / CLI） | `TUYA_UART0_RX` | `TUYA_UART_NUM_0` |

- 波特率由 `CONFIG_JIELI_UART_LOG_BAUDRATE` / `CONFIG_JIELI_UART_LOG_PORT` 决定，默认 115200。
- **接收**：本芯片的 SDK 没有"串口中断事件回调"这一 ioctl，TAL 的接收环无法靠中断填充。适配层改为在任务中每 10ms 轮询 `UART_GET_RECV_CNT`，因此接收有最多一个轮询周期的延迟。
- TX 中断、硬件流控、`tkl_uart_wait_for_data`、`tkl_uart_ioctl` 未实现。

## IIC

- 芯片有硬件 IIC 与软件模拟 IIC 两种设备。
- 厂商的 `demo_DevKitBoard` 板级文件（`CONFIG_IIC_ENABLE`）定义了：`iic1` 为硬件 IIC、`iic0` 为软件 IIC，**均使用 PH0 / PH1**。

| 板级引脚 | 功能 | 软件端口（规划） |
| -------- | ---- | ---------------- |
| PH0 | IIC SCL | `TUYA_I2C_NUM_1`（硬件） |
| PH1 | IIC SDA | `TUYA_I2C_NUM_1`（硬件） |

> **当前状态：未注册。** TuyaOpen 的构建使用 `demo_hello` 板级配置，其中没有注册任何 IIC 设备，因此 `tkl_i2c_init` 在运行时会返回 `OPRT_NOT_SUPPORTED`。`ENABLE_I2C` 也因此未声明。要启用需按原理图确认空闲引脚后在板级配置中注册设备。
>
> 注意 PH0 同时是 ADC 通道 10 的引脚，复用前需确认。

## PWM

- 厂商的 `demo_DevKitBoard` 板级文件（`CONFIG_PWM_ENABLE`）定义了 `pwm1`：使用 **PH2**，通道为 `PWM_TIMER2_OPCH2`。厂商注释说明该配置**只支持 2 路 PWM**（占用 output_channel 2/3）。

> **当前状态：未注册**，同 IIC。`ENABLE_PWM` 未声明。
>
> **wl82 的 PWM 打开后只支持单个通道组**（厂商示例原文："初始化之后，只支持单通道选择"），因此 `tkl_pwm_multichannel_start` 在本芯片上返回 `OPRT_NOT_SUPPORTED`，不会静默地只配置最后一个通道。

## TIMER

- TKL 定时器基于厂商的微秒级定时器服务实现，**不需要板级注册，也不需要占用引脚**。
- 回调运行在 SDK 的定时器**任务**中，而不是中断里（`call_in_irq = 0`），因此回调内可以安全地 `tkl_timer_stop` / `tkl_timer_deinit` 自身。代价是回调延迟为一个调度 tick。
- `tkl_timer_get` 返回自启动以来经过的微秒数（厂商无独立捕获寄存器）。

## SPI

- 芯片有 3 个 SPI 控制器。厂商 `demo_DevKitBoard` 板级文件注册了 `spi0` / `spi1` / `spi2`，分别选用端口组 `A` / `B` / `C`。

| 控制器 | 板级端口组 | 引脚组（该端口组） |
| ------ | ---------- | ------------------ |
| spi0 | `A` | CS PD0、DI PD1、DO PD5、CLK PD4、D2 PD2、D3 PD3 |
| spi1 | `B` | DI PB5、DO PB7、CLK PB6（CS = -1，由软件控制） |
| spi2 | `C` | DI PH2、DO PH1、CLK PH0（CS = -1，由软件控制） |

> **当前状态：未注册**，同 IIC。`ENABLE_SPI` 未声明。
>
> 适配层实现的是**同步**主模式收发（8 bit、MSB first）；从机、中断完成回调、状态查询与 ioctl 均返回 `OPRT_NOT_SUPPORTED`。

## 本板已占用的资源

新增外设前请避开以下已登记用途：

| 引脚 | 用途 |
| ---- | ---- |
| PB3 | 日志输出（SDK UART1 TX） |
| PA5 / PA6 | 服务串口 / TAL CLI（SDK UART0） |
| PB1 | K1 按键（ADC 通道 3） |
| PH0 / PH1 | 厂商板级文件中定义为 IIC（当前未注册） |
| PH2 | 厂商板级文件中定义为 PWM（当前未注册） |

## 当前 TuyaOpen 支持状态

| 外设 | TKL 实现 | capability 声明 | 运行时可用 |
| ---- | -------- | --------------- | ---------- |
| GPIO（含中断、上下拉） | 有 | `ENABLE_GPIO` | 可用（0–63，中断最多 2 个任意引脚） |
| ADC | 有 | `ENABLE_ADC` | 可用（ADC0，10 bit，14 通道） |
| UART | 有 | `ENABLE_UART` | 可用（日志 UART1/PB3，服务 UART0/PA5-PA6） |
| TIMER | 有 | `ENABLE_TIMER` | 可用 |
| IIC | 有 | 未声明 | **不可用**：板级未注册设备 |
| PWM | 有 | 未声明 | **不可用**：板级未注册设备 |
| SPI | 有 | 未声明 | **不可用**：板级未注册设备 |
| pinmux | 无（wl82 无通用引脚复用 API） | 未声明 | 不可用 |
