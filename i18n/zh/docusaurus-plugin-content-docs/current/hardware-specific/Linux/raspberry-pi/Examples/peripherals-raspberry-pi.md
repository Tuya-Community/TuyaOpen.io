---
title: "Raspberry Pi 外设"
---

本文档介绍如何在 Raspberry Pi 上运行 TuyaOpen 的外设示例（`examples/peripherals`），包含 GPIO、I2C、SPI、PWM、UART等。

## 快速开始

1. 确保你已完成 TuyaOpen 基础环境搭建，并进入 TuyaOpen 仓库根目录。
2. 打开配置界面：
  - 运行 `tos.py config menu`
  - 选择板卡：`Choice a board → LINUX → Choice a board → RaspberryPi`
  - 选择型号：`Raspberry Pi Board Configuration → Choose Raspberry Pi model → Raspberry Pi 5`（按实际型号选择）
3. 按需开启外设开关：进入 `Choice a board → LINUX → TKL Board Configuration`，勾选 `ENABLE_GPIO`/`ENABLE_I2C`/`ENABLE_SPI`/`ENABLE_PWM`/`ENABLE_UART`。

![models_path_config](https://images.tuyacn.com/fe-static/docs/img/4b6127c5-ab9f-415a-b365-cb136467efed.png)

4. 进入对应示例目录（如 `examples/peripherals/gpio`），执行 `tos.py build` 编译，然后用 `sudo` 运行生成的 `*.elf`。

> **说明（编译方式）**：Raspberry Pi 支持交叉编译与本地编译两种方式；构建时会根据当前平台自动选择合适的编译方式。

## 通用说明

- **权限**：外设示例通常需要访问 `/dev/*` 或 `/sys/class/*`，建议在树莓派上运行时使用 `sudo`。
- **设备节点**：不同系统镜像下外设节点名称可能不同（例如 UART 可能是 `/dev/ttyAMA0` 或 `/dev/ttyS0`）。如节点与 TuyaOpen 端口映射不一致，请以实际节点为准做适配或调整配置。
- **`OPRT_NOT_SUPPORTED`**：部分 TKL 外设接口为跨 MCU/Linux 统一抽象而保留；在 Raspberry Pi（Linux 用户态）下，如果底层标准接口（如 i2c-dev/spidev/sysfs/tty/gpio-cdev）无法提供对应能力，或需要额外内核驱动/子系统支持但当前适配未实现，则该接口会返回 `OPRT_NOT_SUPPORTED`。

## GPIO 示例

本示例演示如何在 Raspberry Pi 上使用 TuyaOpen 操作 GPIO。

### 适配说明（Linux TKL GPIO）

#### 已支持（可用）

- 基础读写
  - `tkl_gpio_init()` / `tkl_gpio_deinit()`：基于 Linux gpio-cdev（`/dev/gpiochip*`）申请/释放 line handle。
  - `tkl_gpio_write()` / `tkl_gpio_read()`：通过 `GPIOHANDLE_*` ioctl 写入/读取电平。
- 中断回调（事件通知）
  - `tkl_gpio_irq_init()` / `tkl_gpio_irq_enable()` / `tkl_gpio_irq_disable()`：通过 `GPIO_GET_LINEEVENT_IOCTL` 请求事件 fd，并由线程 `poll()` 监听触发回调。

#### 说明/限制

- 依赖系统提供 `/dev/gpiochip*`（内核需启用 gpio 字符设备接口，且当前用户具备访问权限；通常建议 `sudo` 运行示例）。
- `TUYA_GPIO_NUM_E` 在 Linux 侧按 gpiochip 的 line offset 使用；在树莓派上通常与 BCM GPIO 编号一致，但不同发行版/内核配置可能存在差异，建议用 `gpioinfo`/`pinctrl` 核对。
- `TUYA_GPIO_IRQ_LOW/HIGH` 属于“近似实现”：底层使用边沿事件监听，再读取当前电平做过滤，不等同硬件电平触发中断。

#### 参考

- GPIO 的接口定义、参数说明与适配注意事项请参考 [GPIO驱动](https://tuyaopen.ai/zh/docs/tkl-api/tkl_gpio)。

### 进入示例目录

```bash
cd examples/peripherals/gpio
```

### 配置

启动配置界面：

```bash
tos.py config menu
```

按“快速开始”完成板卡与型号选择后，进入：`Choice a board → LINUX → TKL Board Configuration`并勾选 `ENABLE_GPIO`。

> 
> **提示**：GPIO 引脚分布图与 RP1 复用功能表可参考 [树莓派 5 GPIO 参考手册](https://tuyaopen.ai/zh/docs/hardware-specific/Linux/raspberry-pi/Examples/raspberry-pi.md)。

在 `Application config` 中选择合适的引脚作为：

- output pin
- input pin
- irq pin

请确保所选引脚为空闲且与硬件连接一致。

### 编译与运行

编译：

```bash
tos.py build
```

编译完成后会生成类似 `gpio_1.0.0.elf` 的可执行文件。在树莓派上运行：

```bash
sudo ./gpio_1.0.0.elf
```

### 最小示例

下面代码演示：

- 初始化一个输出脚并每秒翻转一次电平
- 初始化一个输入脚并读取电平

> 说明：代码片段仅展示核心调用，完整可编译工程请直接参考 `examples/peripherals/gpio`。

```c
#include "tal_api.h"
#include "tkl_gpio.h"

// 这两个宏在示例工程里通常通过 Kconfig/Application config 配置
// #define EXAMPLE_OUTPUT_PIN ...
// #define EXAMPLE_INPUT_PIN  ...

static void gpio_min_demo(void)
{
  TUYA_GPIO_BASE_CFG_T out_cfg = {
    .mode   = TUYA_GPIO_PUSH_PULL,
    .direct = TUYA_GPIO_OUTPUT,
    .level  = TUYA_GPIO_LEVEL_LOW,
  };
  TUYA_GPIO_BASE_CFG_T in_cfg = {
    .mode   = TUYA_GPIO_PULLUP,
    .direct = TUYA_GPIO_INPUT,
  };

  tkl_gpio_init(EXAMPLE_OUTPUT_PIN, &out_cfg);
  tkl_gpio_init(EXAMPLE_INPUT_PIN,  &in_cfg);

  while (1) {
    static uint8_t level = 0;
    TUYA_GPIO_LEVEL_E in_level = TUYA_GPIO_LEVEL_LOW;

    level ^= 1;
    tkl_gpio_write(EXAMPLE_OUTPUT_PIN, level ? TUYA_GPIO_LEVEL_HIGH : TUYA_GPIO_LEVEL_LOW);

    tkl_gpio_read(EXAMPLE_INPUT_PIN, &in_level);
    PR_NOTICE("GPIO in=%d out=%d", (int)in_level, (int)level);

    tal_system_sleep(1000);
  }
}
```

## I2C 示例

本章节演示如何在 Raspberry Pi 上使用 TuyaOpen 操作 I2C。

### 适配说明（Linux TKL I2C）

#### 已支持（可用）

- 主机模式基础收发
  - `tkl_i2c_master_send()`：对指定设备地址执行写入（底层使用 `/dev/i2c-X` + `I2C_SLAVE` + `write()`）。
  - `tkl_i2c_master_receive()`：对指定设备地址执行读取（底层使用 `I2C_SLAVE` + `read()`）。
- 寄存器读取的常见组合事务（Repeated Start）
  - 当 `tkl_i2c_master_send(..., xfer_pending=true)` 之后紧接 `tkl_i2c_master_receive()`，会合并为一次 `I2C_RDWR` 事务，实现“先写寄存器地址/命令，再重复起始读数据”。
- 地址探测（扫描）
  - 当 `tkl_i2c_master_send()` 的 `size==0` 时，使用 SMBus “quick”方式尝试探测设备是否应答（适合做简单地址扫描）。

#### 暂未支持（接口保留，当前实现返回 `OPRT_NOT_SUPPORTED`）

- 从机模式（Slave）：`tkl_i2c_set_slave_addr()`、`tkl_i2c_slave_send()`、`tkl_i2c_slave_receive()`。
- 中断/事件回调：`tkl_i2c_irq_init()`、`tkl_i2c_irq_enable()`、`tkl_i2c_irq_disable()`。
- 扩展控制/状态查询：`tkl_i2c_ioctl()`、`tkl_i2c_get_status()`。
  - 说明：`tkl_i2c_get_status()` 当前实现会将输出结构体清零后返回 `OPRT_NOT_SUPPORTED`，请勿依赖其返回内容。

#### 参考

- I2C 的接口定义、参数说明与适配注意事项请参考 [I2C驱动](https://tuyaopen.ai/zh/docs/tkl-api/tkl_i2c)。

### 在树莓派启用 I2C（系统配置）

在树莓派终端执行：

```bash
sudo raspi-config
```

在 `raspi-config` 中按以下路径启用 I2C：

- `3 Interface Options` → `I5 I2C` → `Enable`

![models_path_config](https://images.tuyacn.com/fe-static/docs/img/c8daf0da-c625-472e-888f-090968719dc9.png)

确认设备节点已创建：

```bash
ls /dev | grep i2c
```

### 示例 1：扫描总线（i2c_scan）

进入示例目录：

```bash
cd examples/peripherals/i2c/i2c_scan
```

配置：

```bash
tos.py config menu
```

- `Choice a board → LINUX → TKL Board Configuration`：勾选 `ENABLE_I2C`
- `Application config`：配置 `i2c port`、`sda pin`、`scl pin`

说明：

- Linux 适配会访问 `/dev/i2c-${port}`。
- 树莓派系统侧常见为 `/dev/i2c-1`（对应 GPIO2/3），因此 `i2c port` 通常需要与实际节点编号一致。

编译与运行：

```bash
tos.py build
sudo ./i2c_scan_1.0.0.elf
```

若扫描到设备，会打印类似日志：

- `[example_i2c_scan.c:xx] i2c device found at address: 0x44`

### 最小示例

下面代码演示“扫描 I2C 7-bit 地址”（Linux 适配下 `size==0` 会走 quick 探测）：

> 说明：完整可编译工程参考 `examples/peripherals/i2c/i2c_scan`。

```c
#include "tal_api.h"
#include "tkl_i2c.h"

static void i2c_scan_demo(TUYA_I2C_NUM_E port)
{
  for (uint8_t addr = 0x08; addr <= 0x77; addr++) {
    // size=0：用于探测
    if (tkl_i2c_master_send(port, addr, NULL, 0, TRUE) == OPRT_OK) {
      PR_NOTICE("I2C device found: 0x%02X", addr);
    }
  }
}
```

### 示例 2：读取温湿度（sht3x_4x_sensor）

进入示例目录：

```bash
cd examples/peripherals/i2c/sht3x_4x_sensor
```

配置与编译方式同上，在 **Application config** 中选择：

- `sensor type`：sht3x 或 sht4x

运行：

```bash
sudo ./sht3x_4x_sensor_1.0.0.elf
```

可看到周期性输出的温度与湿度日志。

## SPI 示例

本示例演示如何在 Raspberry Pi 上使用 TuyaOpen 操作 SPI（用户态 spidev）。

### 适配说明（Linux TKL SPI）

#### 已支持（可用）

- 主机模式（Master）
  - `tkl_spi_init()`：打开 `/dev/spidevX.Y` 并配置 mode/bits/speed/bitorder。
  - 仅支持 `TUYA_SPI_ROLE_MASTER` / `TUYA_SPI_ROLE_MASTER_SIMPLEX`。
- 基础收发
  - `tkl_spi_send()`：底层 `write()` 发送。
  - `tkl_spi_recv()`：底层 `read()` 接收。
- 传输
  - `tkl_spi_transfer()`：`SPI_IOC_MESSAGE(1)` 全双工 TX/RX。
  - `tkl_spi_transfer_with_length()`：`SPI_IOC_MESSAGE(2)` 支持“先发后收”。
- 计数与状态（兼容接口）
  - `tkl_spi_get_data_count()`：返回最近一次传输字节数。
  - `tkl_spi_get_status()`：返回 `OPRT_OK`，当前仅清零结构体（不提供真实状态）。

#### 暂未支持（接口保留，当前实现返回 `OPRT_NOT_SUPPORTED`）

- 中断回调：`tkl_spi_irq_init()` / `tkl_spi_irq_enable()` / `tkl_spi_irq_disable()` 返回 `OPRT_NOT_SUPPORTED`。
- 扩展控制：`tkl_spi_ioctl()` 返回 `OPRT_NOT_SUPPORTED`。

#### 行为限制/兼容实现

- 中止传输：`tkl_spi_abort_transfer()` 返回 `OPRT_OK`，但不执行真实 abort。
- DMA 长度：`tkl_spi_get_max_dma_data_length()` 返回 0（Linux spidev 下该值无实际意义）。

#### 端口到设备节点映射（默认）

| spi port | 设备节点 |
| --- | --- |
| 0 | `/dev/spidev0.0` |
| 1 | `/dev/spidev0.1` |
| 2 | `/dev/spidev1.0` |
| 3 | `/dev/spidev1.1` |
| 4 | `/dev/spidev2.0` |
| 5 | `/dev/spidev2.1` |

#### 参考

- SPI 的接口定义、参数说明与适配注意事项请参考 [SPI驱动](https://tuyaopen.ai/zh/docs/tkl-api/tkl_spi)。

### 在树莓派启用 SPI（系统配置）

```bash
sudo raspi-config
```

在 `raspi-config` 中按以下路径启用 SPI：

- `3 Interface Options` → `I4 SPI` → `Enable`

确认设备节点已创建：

```bash
ls /dev | grep spidev
```

> TuyaOpen 的 SPI 示例里，`Application config -> spi port` 是一个 **端口号**。
> Linux 适配层会把端口号映射到具体设备节点（见 `platform/LINUX/tuyaos_adapter/src/tkl_spi.c` 的 `prv_spi_dev_path()`）：
>
> - `spi port = 0` → `/dev/spidev0.0`
> - `spi port = 1` → `/dev/spidev0.1`
> - `spi port = 2` → `/dev/spidev1.0`
> - `spi port = 3` → `/dev/spidev1.1`
> - `spi port = 4` → `/dev/spidev2.0`
> - `spi port = 5` → `/dev/spidev2.1`
>
> 比如 `spidev0.0 / spidev0.1`，对应把 `spi port` 设为 `0 / 1`。

### 进入示例目录

```bash
cd examples/peripherals/spi
```

### 配置、编译与运行

配置：

```bash
tos.py config menu
```

- `Choice a board → LINUX → TKL Board Configuration`：勾选 `ENABLE_SPI`
- `Application config`：配置 `spi port`、`spi baudrate`

`spi port` 建议这样选：

- 需要走 `/dev/spidev0.0`：设为 `0`
- 需要走 `/dev/spidev0.1`：设为 `1`

`spi baudrate`（Hz）建议先用 `1000000` 或 `8000000` 跑通回环/通讯，再按外设能力逐步提高。

编译与运行：

```bash
tos.py build
sudo ./spi_1.0.0.elf
```

### 最小示例

下面代码演示 SPI Master 发送固定字符串（Linux 下走 `/dev/spidevX.Y`）：

> 说明：完整可编译工程参考 `examples/peripherals/spi`。

```c
#include "tal_api.h"
#include "tkl_spi.h"

// #define EXAMPLE_SPI_PORT ...
// #define EXAMPLE_SPI_BAUDRATE ...

static void spi_min_demo(void)
{
  TUYA_SPI_BASE_CFG_T cfg = {
    .mode     = TUYA_SPI_MODE0,
    .freq_hz  = EXAMPLE_SPI_BAUDRATE,
    .databits = TUYA_SPI_DATA_BIT8,
    .bitorder = TUYA_SPI_ORDER_LSB2MSB,
    .role     = TUYA_SPI_ROLE_MASTER,
    .type     = TUYA_SPI_AUTO_TYPE,
  };

  uint8_t tx[] = "Hello Tuya";
  tkl_spi_init(EXAMPLE_SPI_PORT, &cfg);

  while (1) {
    tkl_spi_send(EXAMPLE_SPI_PORT, tx, sizeof(tx));
    tal_system_sleep(500);
  }
}
```

## PWM 示例

本示例演示如何在 Raspberry Pi 上使用 TuyaOpen 操作 PWM。

### 适配说明（Linux TKL PWM）

#### 已支持（可用）

- PWM 输出（`/sys/class/pwm`）
  - `tkl_pwm_init()`：export 通道并配置 polarity/period/duty。
  - `tkl_pwm_start()` / `tkl_pwm_stop()`：写 `enable` 启停。
  - `tkl_pwm_duty_set()`：更新占空比。
  - `tkl_pwm_frequency_set()`：更新频率。
  - `tkl_pwm_polarity_set()`：更新极性。
  - `tkl_pwm_info_set()` / `tkl_pwm_info_get()`：整组参数设置/读取（读取为软件保存的 cfg）。
  - `tkl_pwm_multichannel_start()` / `tkl_pwm_multichannel_stop()`：多通道依次启停。
  - `tkl_pwm_deinit()`：停止并 unexport。

#### 暂未支持（接口保留，当前实现返回 `OPRT_NOT_SUPPORTED`）

- PWM 捕获（Capture）：`tkl_pwm_cap_start()` / `tkl_pwm_cap_stop()`。
  - 说明：当前实现直接返回 `OPRT_NOT_SUPPORTED`。

#### 参考

- PWM 的接口定义、参数说明与适配注意事项请参考 [PWM驱动](https://tuyaopen.ai/zh/docs/tkl-api/tkl_pwm)。

### PWM 实验步骤（以 GPIO18 输出PWM方波为例）

#### 进入示例目录

```bash
cd examples/peripherals/pwm
```

#### 在树莓派启用 PWM（系统配置）

1. 确认引脚未被占用：

   ```bash
   pinctrl get 18
   ```

   若未被复用，通常会看到类似输出：

   - `18: no    pd | -- // GPIO18 = none`

2. 启用 PWM overlay：

   在 `/boot/firmware/config.txt` 末尾添加：

   ```text
   dtoverlay=pwm,pin=18,func=2
   ```

   重启树莓派使其生效。

3. 重启后确认映射关系：

   ```bash
   pinctrl get 18
   ```

   期望看到类似输出（表示已切到 PWM 通道）：

   - `18: a3    pd | lo // GPIO18 = PWM0_CHAN2`

#### 配置

启动配置界面：

```bash
tos.py config menu
```

- `Choice a board → LINUX → TKL Board Configuration`：勾选 `ENABLE_PWM`
- 在同一配置树里设置：
  - `PWM_SYSFS_CHIP = 0`（对应 `/sys/class/pwm/pwmchip0`）
  - `PWM_SYSFS_CHANNEL_BASE = 2`（因为 GPIO18 映射为 `PWM0_CHAN2`）
- `Application config`：选择 `pwm port = 0`（因为是 `PWM0`）

#### 编译与运行

```bash
tos.py build
sudo ./pwm_1.0.0.elf
```

### 最小示例

下面代码演示 PWM 输出（初始化 + start）：

> 说明：完整可编译工程参考 `examples/peripherals/pwm`。

```c
#include "tal_api.h"
#include "tkl_pwm.h"

// #define EXAMPLE_PWM_PORT ...
// #define EXAMPLE_PWM_FREQUENCY ...
// #define EXAMPLE_PWM_DUTY ... // 1-10000

static void pwm_min_demo(void)
{
  TUYA_PWM_BASE_CFG_T cfg = {
    .duty      = EXAMPLE_PWM_DUTY,
    .frequency = EXAMPLE_PWM_FREQUENCY,
    .polarity  = TUYA_PWM_NEGATIVE,
  };

  tkl_pwm_init(EXAMPLE_PWM_PORT, &cfg);
  tkl_pwm_start(EXAMPLE_PWM_PORT);

  while (1) {
    tal_system_sleep(2000);
  }
}
```

如需快速核对 sysfs 节点是否符合预期，可检查 `/sys/class/pwm/pwmchip0/` 下是否存在（或可 export）对应的 `pwm2`。

> **提示**：PWM 的 sysfs 接口依赖内核/overlay 配置；不同镜像的 `/boot/firmware/config.txt` 路径可能不同，请以实际系统为准。


## UART 示例

本示例演示如何在 Raspberry Pi 上使用 TuyaOpen 操作 UART。

### 适配说明（Linux TKL UART）

#### 已支持（可用）

- 基础收发
  - `tkl_uart_init()`：打开串口设备并用 termios 配置波特率/数据位/校验/停止位。
  - `tkl_uart_write()`：底层 `write()` 发送。
  - `tkl_uart_read()`：底层 `read()` 接收。
  - `tkl_uart_deinit()`：关闭 fd 并停止接收线程。
- RX 回调通知（近似“中断”语义）
  - `tkl_uart_rx_irq_cb_reg()`：注册接收回调。
  - Linux 侧通过线程 `select()` 监听 fd 可读事件，触发后调用回调。

#### 暂未支持（接口保留，当前实现返回 `OPRT_NOT_SUPPORTED`）

- `tkl_uart_set_tx_int()` / `tkl_uart_set_rx_flowctrl()` / `tkl_uart_wait_for_data()` / `tkl_uart_ioctl()`：返回 `OPRT_NOT_SUPPORTED`。

#### 空实现（调用无效果）

- `tkl_uart_tx_irq_cb_reg()`：当前为空实现。

#### 设备节点映射（与 FAKE 串口开关相关）

- 当 `TKL_UART_REDIRECT_LOG_TO_STDOUT = n`（关闭串口重定向，使用真实硬件 UART）时，默认映射为：
  - `port 0 -> /dev/ttyAMA0`
  - `port 1 -> /dev/ttyAMA1`
  - `port 2 -> /dev/ttyAMA2`
- 当 `TKL_UART_REDIRECT_LOG_TO_STDOUT = y`（开启串口重定向）时，不会访问 `/dev/ttyAMA*`，而是使用 Dummy 串口实现（见下文）。

#### 参考

- UART 的接口定义、参数说明与适配注意事项请参考 [UART驱动](https://tuyaopen.ai/zh/docs/tkl-api/tkl_uart)。

### 硬件连接注意事项（物理串口）

如果使用**物理串口**（例如树莓派 UART 引脚对接 USB-TTL 模块或另一块板子的 UART）：

- 必须将双方 **GND 共地**。不共地时常见现象是接收数据乱码、丢字节或通信极不稳定。

### 串口重定向（Dummy 串口：stdin/stdout/UDP）说明

Linux 平台为了在**没有接入真实串口硬件**的情况下也能跑通 UART 相关组件，提供了一个 `TKL_UART_REDIRECT_LOG_TO_STDOUT` 开关（在 LINUX 的 `TKL Board Configuration` 中）。

当开启重定向（Dummy 串口）后，`tkl_uart.c` 的行为大致如下（与真实 UART 不同，主要用于联调/演示）：

- `TUYA_UART_NUM_0`（port 0）：
  - RX：从当前进程的标准输入 `/dev/stdin` 读取（也就是你运行 `*.elf` 的终端键盘输入）。
  - TX：写到标准输出 `stdout`（终端上直接打印）。
  - 典型用途：在 SSH/本地终端里直接“键盘输入 → UART RX”，并在屏幕看到“UART TX”输出，不依赖任何 `/dev/ttyAMA*`。
- `TUYA_UART_NUM_1`（port 1）：
  - RX：通过 UDP socket 接收数据，逐字节喂给上层 RX 回调。
  - TX：通过 UDP socket 把数据发到对端。
  - 注意：当前实现里 UDP 的 bind/send IP 与端口是固定的（环境相关），不同网络环境下通常需要修改适配层源码后重新编译。

Dummy 模式的限制/注意点：

- 波特率/校验位/停止位等 termios 配置在 Dummy 模式下**不等价于真实串口**（port 0 仅把 stdin 设为非规范模式以便即时读到字符；stdout 也不具备真实串口时序）。
- Dummy 主要用于“功能跑通/交互演示”，不适合做严肃的串口协议时序验证。

如何选择是否使用串口重定向：

- 如果你希望 UART 示例/CLI 走树莓派真实串口引脚（`/dev/ttyAMA*` 或 `/dev/ttyS*`），请在：
  - `Choice a board → LINUX → TKL Board Configuration`
  - 将 `UART redirection (stdin/stdout/UDP) instead of hardware ttyAMA*` 设为 `n`
  - 说明：该选项**不勾选**时，即走物理串口（访问真实的 `ttyAMA*`/`ttyS*` 设备节点）。
- 如果只是想快速验证 UART 逻辑、且暂时没有外接 USB-TTL/硬件回环线，可以保持该选项为 `y`。

#### 注意：your_chat_bot 配网二维码输出通道（串口重定向）

在 Linux/树莓派上运行 `your_chat_bot` 做配网演示时，推荐开启 `TKL_UART_REDIRECT_LOG_TO_STDOUT`，以便将配网阶段的二维码内容直接输出到当前终端。

**1）期望现象（开启重定向）**

- 在运行 `your_chat_bot*.elf` 的终端内可以直接看到二维码（二维码字符串/ASCII 图形）。

**2）原理说明（输出走 UART0 TX）**

- `your_chat_bot` 配网阶段的二维码内容通常通过 UART0（`TUYA_UART_NUM_0`）发送。
- 当 `TKL_UART_REDIRECT_LOG_TO_STDOUT = y` 时：UART0 TX 映射到 `stdout`，因此二维码会显示在当前终端。
- 当 `TKL_UART_REDIRECT_LOG_TO_STDOUT = n` 时：UART0 TX 写入真实串口设备（例如 `/dev/ttyAMA0`/`/dev/ttyS0`），因此二维码不会显示在当前终端，而是输出到串口线上。

### 在树莓派启用 UART（系统配置）

```bash
sudo raspi-config
```

在 `raspi-config` 中按以下路径配置串口：

- `3 Interface Options` → `I6 Serial Port`

通常建议按提示选择：

- **Disable serial login shell**
- **Enable serial port hardware**

检查系统串口节点：

```bash
ls -l /dev/ttyAMA* /dev/ttyS* 2>/dev/null
```

### 进入示例目录

```bash
cd examples/peripherals/uart
```

### 配置、编译与运行

配置：

```bash
tos.py config menu
```

- `Choice a board → LINUX → TKL Board Configuration`：勾选 `ENABLE_UART`

可选：在同一菜单中按需设置 `UART redirection (stdin/stdout/UDP) instead of hardware ttyAMA*`（是否开启串口重定向 / Dummy 串口）。

- 勾选（`*`）：开启串口重定向（Dummy 串口：stdin/stdout/UDP），不依赖真实硬件串口设备节点。
- 不勾选（` `）：使用物理串口（访问真实 `ttyAMA*`/`ttyS*` 设备节点）。

编译：

```bash
tos.py build
```

运行：

```bash
sudo ./uart_1.0.0.elf
```

> 提醒：示例代码默认使用 `TUYA_UART_NUM_0`（UART0）。在树莓派上 UART0 可能被系统控制台占用；若运行无回显或打开失败，请先检查系统串口占用情况，并按需修改示例选择的 UART 端口或调整适配层设备节点映射。

### 最小示例 1：交互式回显（Echo）

这个示例最适合在 **Dummy 串口重定向**（stdin/stdout）模式下快速验证 UART 通路：你在终端输入什么，它就回显什么。

> 说明：该思路与 `examples/peripherals/uart` 一致。

```c
#include "tal_api.h"

#include "tkl_output.h"

#define UART_NUM TUYA_UART_NUM_0

static void uart_echo_demo(void)
{
  TAL_UART_CFG_T cfg = {0};
  cfg.base_cfg.baudrate = 115200;
  cfg.base_cfg.databits = TUYA_UART_DATA_LEN_8BIT;
  cfg.base_cfg.stopbits = TUYA_UART_STOP_LEN_1BIT;
  cfg.base_cfg.parity   = TUYA_UART_PARITY_TYPE_NONE;
  cfg.rx_buffer_size    = 256;
  cfg.open_mode         = O_BLOCK;

  tal_uart_init(UART_NUM, &cfg);
  tal_uart_write(UART_NUM, (const uint8_t*)"Please input text:\r\n", sizeof("Please input text:\r\n") - 1);

  while (1) {
    uint8_t buf[128];
    int n = tal_uart_read(UART_NUM, buf, sizeof(buf));
    if (n > 0) {
      tal_uart_write(UART_NUM, buf, n);
    } else {
      tal_system_sleep(10);
    }
  }
}
```

### 最小示例 2：硬件回环自检（TX 与 RX 短接）

这个示例用于做“发出去的数据能否原样读回来”的自检（`memcmp` 校验），通常需要：

- 关闭 Dummy 重定向（使用物理串口设备节点）
- 将同一 UART 的 **TX 与 RX 短接**（同时确保 GND 共地）

```c
#include <string.h>

#include "tal_api.h"
#include "tkl_uart.h"

static OPERATE_RET uart_loopback_test(TUYA_UART_NUM_E port)
{
  TUYA_UART_BASE_CFG_T cfg = {0};
  cfg.baudrate = 115200;
  cfg.databits = TUYA_UART_DATA_LEN_8BIT;
  cfg.parity   = TUYA_UART_PARITY_TYPE_NONE;
  cfg.stopbits = TUYA_UART_STOP_LEN_1BIT;
  cfg.flowctrl = TUYA_UART_FLOWCTRL_NONE;

  OPERATE_RET ret = tkl_uart_init(port, &cfg);
  if (ret != OPRT_OK) {
    return ret;
  }

  const uint32_t timeout_ms = 5000;
  const int bufsize = 8;
  uint8_t tx[bufsize];
  uint8_t rx[bufsize];

  for (int i = 0; i < bufsize; i++) {
    tx[i] = (uint8_t)('A' + i);
  }

  for (int round = 0; round < 3; round++) {
    memset(rx, 0, sizeof(rx));

    int wr = tkl_uart_write(port, tx, sizeof(tx));
    if (wr != (int)sizeof(tx)) {
      ret = OPRT_COM_ERROR;
      break;
    }

    int got = 0;
    SYS_TIME_T start = tal_system_get_millisecond();
    while (got < (int)sizeof(rx)) {
      SYS_TIME_T now = tal_system_get_millisecond();
      if ((uint32_t)(now - start) > timeout_ms) {
        ret = OPRT_TIMEOUT;
        break;
      }

      int rd = tkl_uart_read(port, rx + got, (uint32_t)sizeof(rx) - (uint32_t)got);
      if (rd > 0) {
        got += rd;
      } else {
        tal_system_sleep(5);
      }
    }

    if (ret != OPRT_OK) {
      break;
    }
    if (memcmp(tx, rx, sizeof(tx)) != 0) {
      ret = OPRT_COM_ERROR;
      break;
    }
  }

  tkl_uart_deinit(port);
  return ret;
}
```

## Button 示例

本示例演示如何在 Raspberry Pi 上使用 TuyaOpen 的 Button 组件（TDL Button 管理层）处理按键输入。

### 适配说明（Raspberry Pi：键盘模拟按键）

Raspberry Pi 平台默认通过“键盘输入”模拟按键：你在运行 `*.elf` 的终端里按下某个字符，即可触发按钮事件。

- 是否启用由板卡 Kconfig 控制：`ENABLE_KEYBOARD_INPUT`
- 触发按键字符由 `BUTTON_NAME` 指定（默认 `s`）

> 说明：示例工程里将 `TDL_BUTTON_PRESS_DOWN` 的日志打印成了 `single click`（见 `examples/peripherals/button/src/example_button.c`），它代表“按下”事件。

### 进入示例目录

```bash
cd examples/peripherals/button
```

### 配置

```bash
tos.py config choice
```

选择 `RaspberryPi.config` 对应的数字并按下回车。

```bash
tos.py config menu
```

按“快速开始”完成板卡与型号选择后，进入：

- `Choice a board → LINUX → Raspberry Pi Board Configuration`
  - 确认 `Enable keyboard input for Raspberry Pi` 已被勾选。
  - 设置 `Keyboard button device value`，例如：`s`

说明：这里的 `Keyboard button device value` 对应板卡配置项 `BUTTON_NAME`，表示“用键盘上的哪个字符来模拟按键”。

- 设为 `s`：在运行 `*.elf` 的终端里按下 `s`，会触发名为 `s` 的按钮事件。
- 建议使用**单个字符**（如 `s` / `a` / `d` / `1`），避免使用多字符字符串，以免不同实现只取第一个字符导致理解偏差。

### 编译与运行

编译：

```bash
tos.py build
```

运行：

```bash
sudo ./button_1.0.0.elf
```

### 期望现象

- 在终端按下 `BUTTON_NAME` 对应字符（默认 `s`），会打印一次 `s: single click`（按下事件）。
- 按住不放约 3 秒（示例里 `long_start_valid_time=3000ms`），会打印 `s: long press`（长按事件）。


## Audio Codecs 示例（audio_codecs）

本示例演示如何在 Raspberry Pi 上通过 ALSA 进行**录音 + 回放**（PCM 16k/16bit/mono），并展示 TuyaOpen 的 `TDL Audio` 管理层接口用法。

### 适配说明（Linux ALSA）

- Raspberry Pi（Linux）下音频通过 ALSA 访问 `/dev/snd/*`。
- 该示例依赖 `src/peripherals/audio_codecs` 组件，并使用 ALSA 驱动实现（`tdd_audio_alsa.c`）。
- 建议用 `sudo` 运行，或确保当前用户属于 `audio` 组（否则可能无法打开声卡设备节点）。

### 前置检查（确认 USB 声卡已识别）

以 USB 音频模块（例如 YD1076/Y1076）为例，在树莓派终端执行：

```bash
aplay -l
arecord -l
ls -la /dev/snd/
```

你应能在列表中看到类似 `card 2: Y1076 ...` 的设备。

### 进入示例目录

```bash
cd examples/peripherals/audio_codecs
```

### 配置

打开配置界面：


```bash
tos.py config choice
```

选择 `RaspberryPi.config` 对应的数字并按下回车。

```bash
tos.py config menu
```

按“快速开始”完成板卡选择后，进入：

- `Choice a board → LINUX → Choice a board → RaspberryPi → Raspberry Pi Board Configuration`
  - 确认 `Enable keyboard input for Raspberry Pi` 已被勾选。
  - 设置 `Keyboard button device value`，例如：`s`

### 编译与运行

编译：

```bash
tos.py build
```

运行（树莓派上建议用 `sudo`）：

```bash
sudo ./audio_codecs_1.0.0.elf
```

交互说明：示例默认使用键盘按键模拟按钮（通常为 `s`）。按住开始录音，松开结束录音并回放（以实际日志/行为为准）。

### 常见问题排查

1) **打开 `default` 设备失败**

如果看到类似：

- `ALSA lib pcm_asym.c:... capture slave is not defined`
- `Audio capture device 'default' not available: Invalid argument`

说明当前系统的 ALSA `default` PCM 配置不可用于录音。

解决思路：

- 在树莓派上创建 `/etc/asound.conf`，将 `default` 映射到 USB 声卡：

```bash
sudo tee /etc/asound.conf >/dev/null <<'EOF'
pcm.!default {
    type asym
    playback.pcm "plughw:CARD=Y1076,DEV=0"
    capture.pcm  "plughw:CARD=Y1076,DEV=0"
}

ctl.!default {
    type hw
    card "Y1076"
}
EOF
```

创建后可用以下命令验证：

```bash
arecord -D default -f S16_LE -c1 -r16000 -d2 /tmp/t.wav
aplay -D default /tmp/t.wav
```


