---
title: "Raspberry Pi 外设"
---

本文档介绍如何在 Raspberry Pi 上运行 TuyaOpen 的外设示例（`examples/peripherals`），包含 GPIO、I2C、SPI、PWM、UART。

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

## GPIO示例

本示例演示如何在 Raspberry Pi 上使用 TuyaOpen 操作 GPIO。

GPIO 的接口定义、参数说明与适配注意事项请参考[GPIO驱动](https://tuyaopen.ai/zh/docs/tkl-api/tkl_gpio)。

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

## I2C示例

本章节演示如何在 Raspberry Pi 上使用 TuyaOpen 操作 I2C。

I2C 的接口定义、参数说明与适配注意事项请参考[I2C驱动](https://tuyaopen.ai/zh/docs/tkl-api/tkl_i2c)，部分函数接口保留，当前实现返回 `OPRT_NOT_SUPPORTED`。

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

## SPI示例

本示例演示如何在 Raspberry Pi 上使用 TuyaOpen 操作 SPI（用户态 spidev）。

SPI 的接口定义、参数说明与适配注意事项请参考[SPI驱动](https://tuyaopen.ai/zh/docs/tkl-api/tkl_spi)，部分函数接口保留，当前实现返回 `OPRT_NOT_SUPPORTED`。

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

## PWM示例

本示例演示如何在 Raspberry Pi 上使用 TuyaOpen 操作 PWM。

PWM 的接口定义、参数说明与适配注意事项请参考[PWM驱动](https://tuyaopen.ai/zh/docs/tkl-api/tkl_pwm)，部分函数接口保留，当前实现返回 `OPRT_NOT_SUPPORTED`。

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

如需快速核对 sysfs 节点是否符合预期，可检查 `/sys/class/pwm/pwmchip0/` 下是否存在（或可 export）对应的 `pwm2`。

> **提示**：PWM 的 sysfs 接口依赖内核/overlay 配置；不同镜像的 `/boot/firmware/config.txt` 路径可能不同，请以实际系统为准。


## UART示例

本示例演示如何在 Raspberry Pi 上使用 TuyaOpen 操作 UART。

UART 的接口定义、参数说明与适配注意事项请参考[UART驱动](https://tuyaopen.ai/zh/docs/tkl-api/tkl_uart)，部分函数接口保留，当前实现返回 `OPRT_NOT_SUPPORTED`。

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
