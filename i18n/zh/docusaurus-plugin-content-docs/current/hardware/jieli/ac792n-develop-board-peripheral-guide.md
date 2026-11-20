---
id: ac792n-develop-board-peripheral-guide
title: AC792N_Develop_Board 外设映射与开发指南
description: "AC792N / WL83 开发板的固定管脚、GPIO 编号与 TKL 到 SDK 的外设映射，以及每个外设的使用方法。"
keywords:
  - AC792N_Develop_Board
  - AC792N
  - AC7926A
  - WL83
  - JieLi
  - 杰理
  - 外设映射
  - 管脚映射
  - 开发指南
  - TKL
  - TuyaOpen 硬件
  - MIPI-DSI
---

# AC792N_Develop_Board（AC792N / WL83）外设映射与开发指南

AC792N，WL83 内核上的 AC7926A 参考配置。板级目录：`boards/JIELI/AC792N_Develop_Board/`；编译配置：`boards/JIELI/config/AC792N_Develop_Board.config`。

本文的管脚编号是 TKL 的扁平编号：`16 × 端口序号 + bit`。WL83 引出的焊盘比 WL82 少：只有 PC0-PC13、PF0-PF5 和 USB 焊盘。封装是否引出是硬件问题，表里列出的是 TKL 校验接受的范围。

下面每个外设分两部分：**映射**（TKL 接受的管脚、端口和限制）和**使用**（应用调用什么、需要先配置什么）。

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

## 管脚如何到达驱动

外设管脚只有一个来源：板级 Kconfig。配置值在编译时变成 `TUYA_BOARD_*` 宏并被强制包含进整个工程，适配层据此填充厂商平台数据。

1. 在 `boards/JIELI/AC792N_Develop_Board/Kconfig` 里定义符号：

   ```kconfig
   config JIELI_BOARD_SPI0_CLK_PIN
       int "SPI0 CLK pin (flat GPIO number)"
       range 0 127
       default 35
   ```

2. 编译时落盘：`tools/jieli_build/board_config.py` 把 `CONFIG_JIELI_BOARD_SPI0_CLK_PIN` 映射成 `TUYA_BOARD_SPI0_CLK_PIN`，写进与厂商 board 文件同目录的 `tuya_board_periph_config.h`，再由 `sdk_overlay.py` 把这个头文件设为强制包含。新增符号需要在映射表里补一行。

3. 适配层在拼平台数据的地方读这个宏 —— SPI 对应 `tuyaos/tuyaos_adapter/src/driver/tkl_spi.c`。

4. 重新配置并编译。这个头文件是编译过程中生成的，增量编译可能继续用旧管脚：

   ```bash
   export JIELI_TOOL_DIR=platform/JIELI/tools/toolchains/<os>/pi32/bin
   tos.py config choice -d -c AC792N_Develop_Board.config
   tos.py build
   ```

5. 应用侧仍然只调用 `tkl_<periph>_init()`，管脚不出现在应用代码里。

## GPIO

### 映射

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

### 使用

GPIO 不需要板级配置，运行时选扁平编号即可：

```c
#include "tkl_gpio.h"

#define EXAMPLE_GPIO ((TUYA_GPIO_NUM_E)44) /* PC12 = 16 x 2 + 12 */

void example_gpio(void)
{
    TUYA_GPIO_BASE_CFG_T cfg = {.mode = TUYA_GPIO_PUSH_PULL,
                                .direct = TUYA_GPIO_OUTPUT,
                                .level = TUYA_GPIO_LEVEL_LOW};

    tkl_gpio_init(EXAMPLE_GPIO, &cfg);
    tkl_gpio_write(EXAMPLE_GPIO, TUYA_GPIO_LEVEL_HIGH);
}
```

## UART

### 映射

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

### 使用

UART0 是日志串口。UART1 是厂商的 `uart2`，和其他 TKL 控制器一样直接用：

```c
#include "tkl_uart.h"

void example_uart1(void)
{
    TUYA_UART_BASE_CFG_T cfg = {.baudrate = 115200, .parity = TUYA_UART_PARITY_TYPE_NONE,
                                .databits = TUYA_UART_DATA_LEN_8BIT,
                                .stopbits = TUYA_UART_STOP_LEN_1BIT};

    tkl_uart_init(TUYA_UART_NUM_1, &cfg);
    tkl_uart_write(TUYA_UART_NUM_1, (uint8_t *)"hello\r\n", 7);
}
```

如果要离开 PB4/PB5，在 `tkl_uart_init()` 之前把两路信号都复用出去：

```c
tkl_io_pinmux_config(new_tx_pin, TUYA_UART1_TX);
tkl_io_pinmux_config(new_rx_pin, TUYA_UART1_RX);
```

## IIC

### 映射

| TKL 端口 | 实现 | 速率 | 默认管脚 |
| --- | --- | --- | --- |
| `TUYA_I2C_NUM_0` | 硬件 | 100 kHz、400 kHz、1 MHz | PA4 SCL / PA5 SDA |
| `TUYA_I2C_NUM_1` | 硬件 | 100 kHz、400 kHz、1 MHz | PA6 SCL / PA7 SDA |
| `TUYA_I2C_NUM_2` | 软件模拟（bit-bang） | 时序固定，请求的速率不生效 | PA2 SCL / PA3 SDA |

不支持 3.4 MHz。两个硬件端口在管脚交叉开关上，运行时请求可以覆盖板级默认；软件端口只能在板级 Kconfig 里改。仅支持主机和 7 位地址；从机模式与寄存器地址类 ioctl 不支持。

### 使用

1. 默认管脚和接线不一致时，在板级 Kconfig 里改 `JIELI_BOARD_IIC{0,1,2}_{SCL,SDA}_PIN`。
2. 按[管脚流程](#管脚如何到达驱动)重新编译。
3. 硬件端口还可以在第一次 `tkl_i2c_init()` 之前运行时改管脚：

   ```c
   #include "tkl_pinmux.h"

   tkl_io_pinmux_config(4, TUYA_IIC0_SCL);  /* PA4 */
   tkl_io_pinmux_config(5, TUYA_IIC0_SDA);  /* PA5 */
   ```

4. 软件端口（IIC2）只能用编译期的平台数据，没有运行时重映射。

两种情况下应用调用都一样：

```c
#include "tkl_i2c.h"

#define EXAMPLE_I2C_ADDR 0x44 /* SHT3x，ADDR 接地 */

void example_i2c(void)
{
    TUYA_IIC_BASE_CFG_T cfg = {.role = TUYA_IIC_MODE_MASTER,
                               .speed = TUYA_IIC_BUS_SPEED_100K,
                               .addr_width = TUYA_IIC_ADDRESS_7BIT};
    uint8_t cmd[2] = {0xE0, 0x00}; /* SHT3x FETCH_DATA */
    uint8_t rx[6] = {0};

    tkl_i2c_init(TUYA_I2C_NUM_0, &cfg);
    tkl_i2c_master_send(TUYA_I2C_NUM_0, EXAMPLE_I2C_ADDR, cmd, sizeof(cmd), FALSE);
    tkl_i2c_master_receive(TUYA_I2C_NUM_0, EXAMPLE_I2C_ADDR, rx, sizeof(rx), FALSE);
}
```

## ADC

### 映射

ADC0，10 位，参考电压 3300 mV，支持扫描和连续采样，单次请求最多 8 个通道。

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

### 使用

单次采样不支持，`ch_nums` 必须等于 `ch_list` 中置位的个数。第一次读取前要先把焊盘复用到转换器：

```c
#include "tkl_adc.h"
#include "tkl_pinmux.h"

#define EXAMPLE_ADC_PIN ((TUYA_PIN_NAME_E)68) /* PE4 = 16 x 4 + 4 */

void example_adc(void)
{
    TUYA_ADC_BASE_CFG_T cfg = {.ch_list.data = 1u << 7, /* 通道 7 = PE4 */
                               .ch_nums = 1, .width = 10,
                               .type = TUYA_ADC_EXTERNAL_SAMPLE_VOL,
                               .mode = TUYA_ADC_CONTINUOUS, .conv_cnt = 1};
    int32_t mv = 0;

    tkl_io_pinmux_config(EXAMPLE_ADC_PIN, TUYA_ADC0);
    tkl_adc_init(TUYA_ADC_NUM_0, &cfg);
    tkl_adc_read_voltage(TUYA_ADC_NUM_0, &mv, 1);
}
```

## SPI

### 映射

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

### 使用

WL83 接受逐管脚的 SPI 请求。请求先记下来，由 `tkl_spi_init()` 交给厂商驱动，所以顺序有讲究：先复用、再初始化、最后传输。

```c
#include "tkl_pinmux.h"
#include "tkl_spi.h"

void example_spi_move(void)
{
    tkl_io_pinmux_config(35, TUYA_SPI0_CLK);   /* PB3  */
    tkl_io_pinmux_config(36, TUYA_SPI0_MOSI);  /* PB4  */
    tkl_io_pinmux_config(37, TUYA_SPI0_MISO);  /* PB5  */

    TUYA_SPI_BASE_CFG_T cfg = {.role = TUYA_SPI_ROLE_MASTER, .mode = TUYA_SPI_MODE0,
                               .freq_hz = 1000000, .databits = TUYA_SPI_DATA_BIT8};
    tkl_spi_init(TUYA_SPI_NUM_0, &cfg);
}
```

不调用 pinmux 时，端口使用板级 Kconfig 落盘的管脚（`JIELI_BOARD_SPI0_*_PIN` 等）。已经属于另一个 SPI 端口、或者已打开并锁定管脚的端口，请求会被拒绝。

## PWM

### 映射

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

### 使用

每个通道驱动一对互补管脚，`JIELI_BOARD_PWM{n}_H_PIN` 和 `_L_PIN`（通道 0 默认 `24`/`25` = PB8/PB9）。两根管脚都属于这个通道，没有单管脚输出。

1. 在板级 Kconfig 里把两根管脚都设好。
2. 按[管脚流程](#管脚如何到达驱动)重新编译。互补管脚在编译期固定 —— WL83 不做 PWM 的运行时重映射。
3. 应用侧使用该通道：

   ```c
   #include "tkl_pwm.h"

   void example_pwm(void)
   {
       TUYA_PWM_BASE_CFG_T cfg = {
           .duty = 5000, .cycle = 10000, .frequency = 1000,
           .polarity = TUYA_PWM_POSITIVE};

       tkl_pwm_init(TUYA_PWM_NUM_0, &cfg);
       tkl_pwm_start(TUYA_PWM_NUM_0);
       tkl_pwm_duty_set(TUYA_PWM_NUM_0, 2500); /* 25 % */
   }
   ```

## TIMER

### 映射

| TKL 定时器 | `TUYA_TIMER_NUM_0` - `TUYA_TIMER_NUM_5` |
| --- | --- |
| 硬件 | 共用 SDK 的微秒定时服务，不是 6 个独立硬件定时器 |
| 并发 | 同一时刻只能有 1 个，第二次启动返回 `OPRT_RESOURCE_NOT_READY` |
| 回调 | 在 SDK 定时任务中执行，不是中断上下文 |
| 单位 | 微秒，支持单次和周期 |

### 使用

没有管脚也没有板级符号，直接调用 `tkl_timer_init()` / `tkl_timer_start()`。

## Display

### 映射

| 项目 | 说明 |
| --- | --- |
| 屏 | MIPI-DSI，ST7701S，480 x 800 |
| 复位 / 背光 | PB0 / PB1 |
| 使能 | 板级定义直接选中 `ENABLE_DISPLAY` 和 `ENABLE_MIPI_DSI`；屏参在 `JIELI_BOARD_DISPLAY_PANEL` / `_RESET_IO` / `_BACKLIGHT_IO` |

### 使用

显示栈是板级的一部分，不是应用的选择，用之前不需要额外配置：

```c
TDL_DISP_HANDLE_T disp = tdl_disp_find_dev("display");
tdl_disp_dev_open(disp);
```

## Camera

TKL DVP 只支持 WL82，WL83 适配层不注册摄像头设备。要在 WL83 板子上接摄像头，需要先有一套自己的 TKL 实现。

## 编译

```bash
export JIELI_TOOL_DIR=platform/JIELI/tools/toolchains/<os>/pi32/bin
tos.py config choice -d -c AC792N_Develop_Board.config
tos.py build
```
