---
id: ac79-devkitboard-peripheral-guide
title: AC79_DevKitBoard 外设映射与开发指南
description: "AC791 / WL82 开发板的固定管脚、GPIO 编号与 TKL 到 SDK 的外设映射，以及每个外设的使用方法。"
keywords:
  - AC79_DevKitBoard
  - AC791
  - WL82
  - JieLi
  - 杰理
  - 外设映射
  - 管脚映射
  - 开发指南
  - TKL
  - TuyaOpen 硬件
---

# AC79_DevKitBoard（AC791 / WL82）外设映射与开发指南

AC791，WL82 内核。板级目录：`boards/JIELI/AC79_DevKitBoard/`；编译配置：`boards/JIELI/config/AC79_DevKitBoard.config`。

本文的管脚编号是 TKL 的扁平编号：`16 × 端口序号 + bit`（PA0-PA15 = 0-15，…，PH0-PH15 = 112-127）。封装是否引出是硬件问题，表里列出的是 TKL 校验接受的范围。

下面每个外设分两部分：**映射**（TKL 接受的管脚、端口和限制）和**使用**（应用调用什么、需要先配置什么）。

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

## 管脚如何到达驱动

外设管脚只有一个来源：板级 Kconfig。配置值在编译时变成 `TUYA_BOARD_*` 宏并被强制包含进整个工程，适配层据此填充厂商平台数据。

1. 在 `boards/JIELI/AC79_DevKitBoard/Kconfig` 里定义符号：

   ```kconfig
   config JIELI_BOARD_PWM0_PIN
       int "PWM0 (TIMER2 output) pin (flat GPIO number)"
       range 0 127
       default 114
   ```

2. 编译时落盘：`tools/jieli_build/board_config.py` 把 `CONFIG_JIELI_BOARD_PWM0_PIN` 映射成 `TUYA_BOARD_PWM0_PIN`，写进与厂商 board 文件同目录的 `tuya_board_periph_config.h`，再由 `sdk_overlay.py` 把这个头文件设为强制包含。新增符号需要在映射表里补一行。

3. 适配层在拼平台数据的地方读这个宏 —— PWM 对应 `tuyaos/tuyaos_adapter/src/driver/tkl_pwm.c`。

4. 重新配置并编译。这个头文件是编译过程中生成的，增量编译可能继续用旧管脚：

   ```bash
   export JIELI_TOOL_DIR=platform/JIELI/tools/toolchains/<os>/pi32/bin
   tos.py config choice -d -c AC79_DevKitBoard.config
   tos.py build
   ```

5. 应用侧仍然只调用 `tkl_<periph>_init()`，管脚不出现在应用代码里。

## GPIO

### 映射

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

### 使用

GPIO 不需要板级配置，运行时选扁平编号即可：

```c
#include "tkl_gpio.h"

#define EXAMPLE_GPIO ((TUYA_GPIO_NUM_E)20) /* PB4 = 16 x 1 + 4 */

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

### 使用

UART0 拿来即用；UART1 要先打开才存在：

1. 在板级 Kconfig 里设置 `JIELI_BOARD_UART1_ENABLE=y`。`JIELI_BOARD_UART1_TX_PIN` / `_RX_PIN` 描述的是固定的 PH2/PH3，换不到别的管脚。
2. 按[管脚流程](#管脚如何到达驱动)重新编译。
3. 注意厂商调试台会停掉：在这个 SDK 上打开 `uart2` 会让 PB3 停止输出，而且不会搬到新管脚上。这也是它默认关闭的原因。
4. 摄像头模块依赖 `!JIELI_BOARD_UART1_ENABLE` —— PH2/PH3 是它们的 XCLK 和复位脚，PH2 同时还是 PWM0 输出。

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

## IIC

### 映射

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

### 使用

用硬件还是软件，由管脚组合决定，没有开关可设：

| 端口 | 管脚（`JIELI_BOARD_IIC*_PIN`） | 结果 |
| --- | --- | --- |
| IIC0 | 默认 `0`/`1`（PA0/PA1） | 软件 IIC |
| IIC0 | `112`/`113`（PH0/PH1），选择摄像头模块时自动切换 | 软件 IIC |
| IIC1 | `7`/`8`（PA7/PA8）或 `33`/`34`（PC1/PC2） | 硬件 IIC |
| IIC1 | `148`/`149`（USB DPA/DMA） | 硬件 IIC，仅运行时 |
| IIC1 | 其他组合 | 退回软件 IIC |

PH0/PH1 固定走软件 IIC，因为这两根同时是摄像头模块的二线总线。硬件端口还可以在第一次 `tkl_i2c_init()` 之前运行时改管脚：

```c
#include "tkl_pinmux.h"
#include "tkl_i2c.h"

void example_i2c_move(void)
{
    tkl_io_pinmux_config(7, TUYA_IIC1_SCL);  /* PA7 */
    tkl_io_pinmux_config(8, TUYA_IIC1_SDA);  /* PA8 */
}
```

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

    tkl_i2c_init(TUYA_I2C_NUM_1, &cfg);
    tkl_i2c_master_send(TUYA_I2C_NUM_1, EXAMPLE_I2C_ADDR, cmd, sizeof(cmd), FALSE);
    tkl_i2c_master_receive(TUYA_I2C_NUM_1, EXAMPLE_I2C_ADDR, rx, sizeof(rx), FALSE);
}
```

## ADC

### 映射

ADC0，10 位，参考电压 3300 mV，支持扫描和连续采样，单次请求最多 10 个通道。

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

### 使用

单次采样不支持；先用 `tkl_io_pinmux_config(pin, TUYA_ADC0)` 配置焊盘，再按上表通道号读取。

```c
#include "tkl_adc.h"
#include "tkl_pinmux.h"

#define EXAMPLE_ADC_PIN ((TUYA_PIN_NAME_E)10) /* PA10 = 通道 2 */

void example_adc(void)
{
    TUYA_ADC_BASE_CFG_T cfg = {.ch_list.data = 1u << 2, /* 通道 2 = PA10 */
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

### 使用

WL82 的 SPI 是固定的分组表，不是逐管脚复用 —— 带 SPI 功能的 `tkl_io_pinmux_config()` 在这里返回 `OPRT_NOT_SUPPORTED`。每个控制器可选的组：

| 控制器 | 可选组 |
| --- | --- |
| SPI0 | 仅 B |
| SPI1 | A 或 B |
| SPI2 | A 或 C |

1. 打开 `tuyaos/tuyaos_adapter/src/driver/tkl_spi.c`。
2. 在对应的平台数据块里改分组字母：

   ```c
   SPI1_PLATFORM_DATA_BEGIN(s_spi1_pd)
       .clk    = 1000000,
       .mode   = SPI_STD_MODE,
       .port   = 'A',
   SPI1_PLATFORM_DATA_END()
   ```

3. 重新编译。厂商驱动在 `dev_open()` 时锁定分组，应用只要在第一次传输前调用 `tkl_spi_init(TUYA_SPI_NUM_1, &cfg)`。

## PWM

### 映射

| 通道 | 管脚 | 硬件 |
| --- | --- | --- |
| `TUYA_PWM_NUM_0` | 默认 PH2（`CONFIG_JIELI_BOARD_PWM0_PIN`） | TIMER2 输出通道 2 |

| 项目 | 说明 |
| --- | --- |
| 占空比 | 以 `cycle` 为基准的计数值；`cycle == 0` 按 10000 处理 |
| 极性 | 仅正向 |
| 通道数 | 只有 PWM0；`TUYA_PWM_NUM_1` 到 `_3` 以及多通道启停返回 `OPRT_NOT_SUPPORTED` |
| 改管脚 | 只能在板级 Kconfig 里改，WL82 没有 PWM 的 pinmux 通路 |

### 使用

`JIELI_BOARD_PWM0_PIN` 默认 `114`（PH2），它同时是摄像头 XCLK 和 TKL UART1 的 TX 脚 —— 一个工程三选一。按[管脚流程](#管脚如何到达驱动)改管脚，然后：

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

管脚在厂商驱动打开定时器时锁定，所以是编译期选择，这颗芯片上没有 PWM 的运行时重映射。

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

## Camera

### 映射

两个连接器共用焊盘，并且应答同一个 I2C 地址，所以只能装一个模块、只编译一个。两种模块的 sensor 都由 TDD 负责，板级只提供 I2C 端口、复位脚和时钟。

| 连接器 | 模块 | 通路 | 板级默认分辨率 |
| --- | --- | --- | --- |
| J1，24 pin | GC2145 | DVP | 640 x 480 @ 20 fps |
| J4，12 pin | GC0310 | SPI | 320 x 240 @ 12 fps |

| 项目 | J1 / GC2145 | J4 / GC0310 |
| --- | --- | --- |
| I2C 端口 | `TUYA_I2C_NUM_0`，PH0/PH1（软件） | `TUYA_I2C_NUM_1`，PH0/PH1（软件） |
| 复位 | PH3，低电平有效 | PH3，低电平有效 |
| 时钟 | 24 MHz，PH2 | 24 MHz，PH2 |
| 预览通路 | `tkl_dvp` 对 640x480 画面做中心裁剪 | 厂商 `spi2` 行中断接收，1288 B/行 |

### 使用

1. 在板级 Kconfig 里选模块（`JIELI_BOARD_CAMERA_GC2145` 为默认，或 `_GC0310`）。这个选择会同时打开 `ENABLE_CAMERA` 和 `ENABLE_DVP`，并把 IIC0 切到 PH0/PH1。
2. `JIELI_BOARD_CAMERA_WIDTH` / `_HEIGHT` / `_FPS` 描述的是 **sensor**，不是预览。`board_com_api.c` 按选择注册对应的 TDD 驱动，带上 I2C 端口、复位脚和时钟。
3. 应用只和 TDL 打交道：

   ```c
   TDL_CAMERA_HANDLE_T hdl = tdl_camera_find_dev("camera");
   ```

4. 换模块要断电操作：两个模块都应答 0x42，探测错的那个会把对的复位掉。
5. sensor 寄存器表在通路上电前写入，平台在 `video0`/`spi2` 就绪后通过 TDD 的 setup 钩子重放一次（日志里的 `TDD sensor restart ret=0`）。

## Display

### 映射

| 项目 | 说明 |
| --- | --- |
| 屏 | ILI9488，320 x 480，RGB565 |
| 总线 | MCU8080，8 位数据 |
| DC / 复位 | PC9 / PB0（由 `tkl_8080.c` 持有） |
| TE | PC0，上升沿 |
| 背光 | 普通 GPIO，由厂商屏参配置驱动 |

### 使用

`ENABLE_MCU8080` 和 `ENABLE_DISPLAY` 同时打开时板级会注册这块屏 —— `JIELI_AC79_DevKitBoard_dvp_lcd` 和 `_spi_lcd` 两个配置都满足。没有 TE 时 8080 写入可能落在扫描中间，画面上会出现一条随刷新相位移动的分裂线。

```c
TDL_DISP_HANDLE_T disp = tdl_disp_find_dev("display");
tdl_disp_dev_open(disp);
```

## 编译

```bash
export JIELI_TOOL_DIR=platform/JIELI/tools/toolchains/<os>/pi32/bin
tos.py config choice -d -c AC79_DevKitBoard.config
tos.py build
```
