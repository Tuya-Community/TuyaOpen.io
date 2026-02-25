---
title: "Raspberry Pi Peripherals"
---

This document describes how to run TuyaOpen peripheral examples on Raspberry Pi (`examples/peripherals`), including GPIO, I2C, SPI, PWM, and UART.

## Quick Start

1. Make sure you have completed the basic TuyaOpen environment setup and are in the TuyaOpen repository root directory.
2. Open the configuration menu:
  - Run `tos.py config menu`
  - Select board: `Choice a board → LINUX → Choice a board → RaspberryPi`
  - Select model: `Raspberry Pi Board Configuration → Choose Raspberry Pi model → Raspberry Pi 5` (choose your actual model)
3. Enable the peripherals you need: go to `Choice a board → LINUX → TKL Board Configuration`, and enable `ENABLE_GPIO`/`ENABLE_I2C`/`ENABLE_SPI`/`ENABLE_PWM`/`ENABLE_UART`.

![models_path_config](https://images.tuyacn.com/fe-static/docs/img/4b6127c5-ab9f-415a-b365-cb136467efed.png)

4. Go to the corresponding example directory (for example, `examples/peripherals/gpio`), run `tos.py build`, then run the generated `*.elf` with `sudo`.

> **Note (build method)**: Raspberry Pi supports both cross-compilation and native build. The build system selects an appropriate method automatically based on your current platform.

## General Notes

- **Permissions**: Peripheral examples usually need access to `/dev/*` or `/sys/class/*`. When running on Raspberry Pi, use `sudo`.
- **Device nodes**: Device node names can differ across OS images (for example, UART may be `/dev/ttyAMA0` or `/dev/ttyS0`). If the node name does not match TuyaOpen port mapping, adapt based on your actual node or adjust the configuration.
- **`OPRT_NOT_SUPPORTED`**: Some TKL peripheral APIs are kept for a unified abstraction across MCUs/Linux. On Raspberry Pi (Linux user space), if the underlying standard interfaces (such as i2c-dev/spidev/sysfs/tty/gpio-cdev) cannot provide the capability, or if extra kernel drivers/subsystems are required but not implemented in the current adaptation, the API may return `OPRT_NOT_SUPPORTED`.

## GPIO Example

This example shows how to control GPIO using TuyaOpen on Raspberry Pi.

For GPIO API definitions, parameter descriptions, and adaptation notes, see [GPIO Driver](https://tuyaopen.ai/docs/tkl-api/tkl_gpio).

### Enter the example directory

```bash
cd examples/peripherals/gpio
```

### Configuration

Open the configuration menu:

```bash
tos.py config menu
```

After selecting the board/model (see "Quick Start"), go to `Choice a board → LINUX → TKL Board Configuration` and enable `ENABLE_GPIO`.

> 
> **Tip**: For the GPIO pinout and RP1 mux table, see [Raspberry Pi 5 GPIO Reference](https://tuyaopen.ai/docs/hardware-specific/Linux/raspberry-pi/Examples/raspberry-pi.md).

In `Application config`, choose appropriate pins for:

- output pin
- input pin
- irq pin

Make sure the selected pins are free and match your actual wiring.

### Build and run

Build:

```bash
tos.py build
```

After the build completes, an executable such as `gpio_1.0.0.elf` is generated. Run it on Raspberry Pi:

```bash
sudo ./gpio_1.0.0.elf
```

## I2C Example

This section shows how to use I2C with TuyaOpen on Raspberry Pi.

For I2C API definitions, parameter descriptions, and adaptation notes, see [I2C Driver](https://tuyaopen.ai/docs/tkl-api/tkl_i2c). Some reserved APIs currently return `OPRT_NOT_SUPPORTED`.

### Enable I2C on Raspberry Pi (system configuration)

Run:

```bash
sudo raspi-config
```

Enable I2C via:

- `3 Interface Options` → `I5 I2C` → `Enable`

![models_path_config](https://images.tuyacn.com/fe-static/docs/img/c8daf0da-c625-472e-888f-090968719dc9.png)

Confirm the device node exists:

```bash
ls /dev | grep i2c
```

### Example 1: Scan the bus (i2c_scan)

Enter the example directory:

```bash
cd examples/peripherals/i2c/i2c_scan
```

Configure:

```bash
tos.py config menu
```

- `Choice a board → LINUX → TKL Board Configuration`: enable `ENABLE_I2C`
- `Application config`: set `i2c port`, `sda pin`, `scl pin`

Notes:

- The Linux adaptation accesses `/dev/i2c-${port}`.
- On Raspberry Pi, the common node is `/dev/i2c-1` (GPIO2/3), so `i2c port` usually needs to match the actual node number.

Build and run:

```bash
tos.py build
sudo ./i2c_scan_1.0.0.elf
```

If devices are found, you will see logs like:

- `[example_i2c_scan.c:xx] i2c device found at address: 0x44`

### Example 2: Read temperature/humidity (sht3x_4x_sensor)

Enter the example directory:

```bash
cd examples/peripherals/i2c/sht3x_4x_sensor
```

Configure and build the same way as above. In **Application config**, choose:

- `sensor type`: sht3x or sht4x

Run:

```bash
sudo ./sht3x_4x_sensor_1.0.0.elf
```

You should see periodic temperature and humidity logs.

## SPI Example

This example shows how to use SPI (user-space spidev) with TuyaOpen on Raspberry Pi.

For SPI API definitions, parameter descriptions, and adaptation notes, see [SPI Driver](https://tuyaopen.ai/docs/tkl-api/tkl_spi). Some reserved APIs currently return `OPRT_NOT_SUPPORTED`.

### Enable SPI on Raspberry Pi (system configuration)

```bash
sudo raspi-config
```

Enable SPI via:

- `3 Interface Options` → `I4 SPI` → `Enable`

Confirm the device nodes exist:

```bash
ls /dev | grep spidev
```

> In TuyaOpen SPI examples, `Application config -> spi port` is a **port number**.
> The Linux adaptation maps the port number to a specific device node (see `platform/LINUX/tuyaos_adapter/src/tkl_spi.c` and `prv_spi_dev_path()`):
>
> - `spi port = 0` → `/dev/spidev0.0`
> - `spi port = 1` → `/dev/spidev0.1`
> - `spi port = 2` → `/dev/spidev1.0`
> - `spi port = 3` → `/dev/spidev1.1`
> - `spi port = 4` → `/dev/spidev2.0`
> - `spi port = 5` → `/dev/spidev2.1`
>
> For example, for `spidev0.0 / spidev0.1`, set `spi port` to `0 / 1`.

### Enter the example directory

```bash
cd examples/peripherals/spi
```

### Configuration, build, and run

Configure:

```bash
tos.py config menu
```

- `Choice a board → LINUX → TKL Board Configuration`: enable `ENABLE_SPI`
- `Application config`: set `spi port` and `spi baudrate`

Suggested `spi port` values:

- Use `/dev/spidev0.0`: set to `0`
- Use `/dev/spidev0.1`: set to `1`

For `spi baudrate` (Hz), start with `1000000` or `8000000` to validate loopback/communication, then increase gradually based on your peripheral.

Build and run:

```bash
tos.py build
sudo ./spi_1.0.0.elf
```

## PWM Example

This example shows how to use PWM with TuyaOpen on Raspberry Pi.

For PWM API definitions, parameter descriptions, and adaptation notes, see [PWM Driver](https://tuyaopen.ai/docs/tkl-api/tkl_pwm). Some reserved APIs currently return `OPRT_NOT_SUPPORTED`.

### PWM experiment (example: output a PWM square wave on GPIO18)

#### Enter the example directory

```bash
cd examples/peripherals/pwm
```

#### Enable PWM on Raspberry Pi (system configuration)

1. Make sure the pin is not in use:

   ```bash
   pinctrl get 18
   ```

   If it is not multiplexed, you typically see:

   - `18: no    pd | -- // GPIO18 = none`

2. Enable the PWM overlay:

   Append the following to the end of `/boot/firmware/config.txt`:

   ```text
   dtoverlay=pwm,pin=18,func=2
   ```

   Reboot to apply.

3. After reboot, verify the mapping:

   ```bash
   pinctrl get 18
   ```

   Expected output (indicates switching to a PWM channel):

   - `18: a3    pd | lo // GPIO18 = PWM0_CHAN2`

#### Configuration

Open the configuration menu:

```bash
tos.py config menu
```

- `Choice a board → LINUX → TKL Board Configuration`: enable `ENABLE_PWM`
- In the same configuration tree, set:
  - `PWM_SYSFS_CHIP = 0` (corresponds to `/sys/class/pwm/pwmchip0`)
  - `PWM_SYSFS_CHANNEL_BASE = 2` (because GPIO18 maps to `PWM0_CHAN2`)
- `Application config`: set `pwm port = 0` (because this is `PWM0`)

#### Build and run

```bash
tos.py build
sudo ./pwm_1.0.0.elf
```

To quickly sanity-check the sysfs nodes, you can verify that `/sys/class/pwm/pwmchip0/` contains (or can export) `pwm2`.

> **Tip**: The PWM sysfs interface depends on the kernel/overlay configuration. The path to `config.txt` may differ across images; use the correct path for your system.

## UART Example

This example shows how to use UART with TuyaOpen on Raspberry Pi.

For UART API definitions, parameter descriptions, and adaptation notes, see [UART Driver](https://tuyaopen.ai/docs/tkl-api/tkl_uart). Some reserved APIs currently return `OPRT_NOT_SUPPORTED`.

### Wiring notes (physical UART)

If you use a **physical UART** (for example, connecting Raspberry Pi UART pins to a USB-TTL module or another board's UART):

- Make sure both sides share a **common GND**. Without common ground, you often see garbled RX data, dropped bytes, or unstable communication.

### UART redirection (dummy UART: stdin/stdout/UDP)

To allow UART-related components to run **without real UART hardware**, the Linux platform provides `TKL_UART_REDIRECT_LOG_TO_STDOUT` (in `LINUX` → `TKL Board Configuration`).

When the redirection (dummy UART) is enabled, `tkl_uart.c` behaves roughly as follows (different from a real UART; mainly for debugging/demo):

- `TUYA_UART_NUM_0` (port 0):
  - RX: reads from the current process stdin (`/dev/stdin`) (i.e. keyboard input in the terminal where you run `*.elf`).
  - TX: writes to stdout (prints directly in the terminal).
  - Typical usage: "keyboard input → UART RX" and "UART TX → terminal output", without requiring any `/dev/ttyAMA*`.
- `TUYA_UART_NUM_1` (port 1):
  - RX: receives data via a UDP socket and feeds bytes to the upper-layer RX callback.
  - TX: sends data via a UDP socket to the peer.
  - Note: In the current implementation, the bind/send IP and ports are fixed (environment-dependent). For most networks you will need to modify the adaptation layer source code and rebuild.

Limitations/notes of dummy mode:

- Baud rate/parity/stop bits termios settings are **not equivalent to a real UART** in dummy mode (port 0 only sets stdin to non-canonical mode to read characters immediately; stdout has no real UART timing).
- Dummy mode is intended for logic verification and interactive demos, not for accurate UART protocol timing validation.

How to choose whether to use redirection:

- If you want UART examples/CLI to use Raspberry Pi's real UART pins (`/dev/ttyAMA*` or `/dev/ttyS*`), go to:
  - `Choice a board → LINUX → TKL Board Configuration`
  - set `UART redirection (stdin/stdout/UDP) instead of hardware ttyAMA*` to `n`
  - Note: when this option is **disabled**, it uses physical UART (accessing real `ttyAMA*`/`ttyS*` nodes).
- If you just want to quickly validate UART logic and do not have USB-TTL/hardware loopback wiring, keep it as `y`.

#### Note: QR code output channel during provisioning (your_chat_bot)

When running `your_chat_bot` on Linux/Raspberry Pi for provisioning demos, enabling `TKL_UART_REDIRECT_LOG_TO_STDOUT` is recommended so the QR code content is printed directly in the current terminal.

**1) Expected behavior (redirection enabled)**

- You can see the QR code (string/ASCII art) directly in the terminal running `your_chat_bot*.elf`.

**2) Why it works (output via UART0 TX)**

- During provisioning, the QR code content is typically sent via UART0 (`TUYA_UART_NUM_0`).
- When `TKL_UART_REDIRECT_LOG_TO_STDOUT = y`: UART0 TX maps to stdout, so the QR code shows in the terminal.
- When `TKL_UART_REDIRECT_LOG_TO_STDOUT = n`: UART0 TX writes to a real UART device node (for example, `/dev/ttyAMA0`/`/dev/ttyS0`), so the QR code will not appear in the terminal; it is sent over the serial line.

### Enable UART on Raspberry Pi (system configuration)

```bash
sudo raspi-config
```

Configure serial port via:

- `3 Interface Options` → `I6 Serial Port`

Typically choose:

- **Disable serial login shell**
- **Enable serial port hardware**

Check serial device nodes:

```bash
ls -l /dev/ttyAMA* /dev/ttyS* 2>/dev/null
```

### Enter the example directory

```bash
cd examples/peripherals/uart
```

### Configuration, build, and run

Configure:

```bash
tos.py config menu
```

- `Choice a board → LINUX → TKL Board Configuration`: enable `ENABLE_UART`

Optional: In the same menu, set `UART redirection (stdin/stdout/UDP) instead of hardware ttyAMA*` depending on whether you want dummy UART redirection.

- Enabled (`*`): dummy UART redirection (stdin/stdout/UDP), no real UART hardware node required.
- Disabled (` `): physical UART (access real `ttyAMA*`/`ttyS*` nodes).

Build:

```bash
tos.py build
```

Run:

```bash
sudo ./uart_1.0.0.elf
```

> Reminder: The example code uses `TUYA_UART_NUM_0` (UART0) by default. On Raspberry Pi, UART0 may be occupied by the system console. If it fails to open or there is no echo, check serial port usage and adjust the example UART port selection or the adaptation layer's device node mapping if needed.
