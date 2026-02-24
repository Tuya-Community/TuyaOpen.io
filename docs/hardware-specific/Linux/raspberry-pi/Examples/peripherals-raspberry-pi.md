---
title: "Raspberry Pi Peripherals"
---

This document explains how to run TuyaOpen peripheral examples (`examples/peripherals`) on Raspberry Pi, including GPIO, I2C, SPI, PWM, and UART.

> **Tip**: If this is your first time running TuyaOpen on Raspberry Pi, start with [Running your_chat_bot on Raspberry Pi](../Applications/your-chat-bot-on-raspberry-pi.md).

## Table of contents

- [Quick start](#quick-start)
- [General notes](#general-notes)
- [GPIO](#gpio)
- [I2C](#i2c)
- [SPI](#spi)
- [PWM](#pwm)
- [UART](#uart)

## Quick start

1. Make sure you have completed the basic TuyaOpen environment setup, and enter the TuyaOpen repository root directory.
2. Open the configuration menu:
  - Run `tos.py config menu`
  - Select the board: `Choice a board → LINUX → Choice a board → RaspberryPi`
  - Select the model: `Raspberry Pi Board Configuration → Choose Raspberry Pi model → Raspberry Pi 5` (choose the actual model)
3. Enable peripheral switches as needed: go to `Choice a board → LINUX → TKL Board Configuration`, and enable `ENABLE_GPIO` / `ENABLE_I2C` / `ENABLE_SPI` / `ENABLE_PWM` / `ENABLE_UART`.

![models_path_config](https://images.tuyacn.com/fe-static/docs/img/4b6127c5-ab9f-415a-b365-cb136467efed.png)

4. Enter the corresponding example directory (for example `examples/peripherals/gpio`), run `tos.py build`, then run the generated `*.elf` with `sudo`.

> **Note (build modes)**: Raspberry Pi supports both cross-compilation and native compilation. The build system will automatically select the proper mode based on the current platform.

## General notes

- **Permissions**: peripheral examples usually need to access `/dev/*` or `/sys/class/*`. Running with `sudo` on Raspberry Pi is recommended.
- **Device nodes**: device node names may differ across OS images (for example UART could be `/dev/ttyAMA0` or `/dev/ttyS0`). If the node differs from TuyaOpen port mapping, adapt according to the actual node or adjust configuration.

## GPIO

This example demonstrates how to operate GPIO on Raspberry Pi using TuyaOpen.

<details>
<summary><strong>Porting notes (Linux TKL GPIO)</strong></summary>

**Supported (available)**

- Basic read/write
  - `tkl_gpio_init()` / `tkl_gpio_deinit()`: request/release a line handle via Linux gpio-cdev (`/dev/gpiochip*`).
  - `tkl_gpio_write()` / `tkl_gpio_read()`: write/read the level via `GPIOHANDLE_*` ioctls.
- Interrupt callback (event notification)
  - `tkl_gpio_irq_init()` / `tkl_gpio_irq_enable()` / `tkl_gpio_irq_disable()`: request an event fd via `GPIO_GET_LINEEVENT_IOCTL`, then a thread uses `poll()` to wait for events and invoke the callback.

**Notes / limitations**

- Requires `/dev/gpiochip*` provided by the system (kernel must enable the GPIO character device interface, and the current user must have permission; typically run with `sudo`).
- On Linux, `TUYA_GPIO_NUM_E` is used as the gpiochip line offset. On Raspberry Pi it is often aligned with BCM GPIO numbering, but it may vary across distros/kernels; verify with `gpioinfo` / `pinctrl`.
- `TUYA_GPIO_IRQ_LOW/HIGH` is an “approximate implementation”: the backend listens for edge events and then reads the current level for filtering. It is not the same as true level-triggered hardware interrupts.

</details>

### Enter the example directory

```bash
cd examples/peripherals/gpio
```

### Configure

Start the configuration menu:

```bash
tos.py config menu
```

After completing board/model selection in “Quick start”, go to: `Choice a board → LINUX → TKL Board Configuration`.

Enable `ENABLE_GPIO`.

In `Application config`, select proper pins for:

- output pin
- input pin
- irq pin

Make sure the selected pins are free and match your wiring.

### Build and run

Build:

```bash
tos.py build
```

After the build, an executable like `gpio_1.0.0.elf` will be generated. Run it on Raspberry Pi:

```bash
sudo ./gpio_1.0.0.elf
```

## I2C

This section demonstrates how to operate I2C on Raspberry Pi using TuyaOpen.

<details>
<summary><strong>Porting notes (Linux TKL I2C)</strong></summary>

**Supported (available)**

- Basic master send/receive
  - `tkl_i2c_master_send()`: write to the target device address (backend uses `/dev/i2c-X` + `I2C_SLAVE` + `write()`).
  - `tkl_i2c_master_receive()`: read from the target device address (backend uses `I2C_SLAVE` + `read()`).
- Common register read combined transaction (Repeated Start)
  - When `tkl_i2c_master_send(..., xfer_pending=true)` is immediately followed by `tkl_i2c_master_receive()`, the backend merges them into a single `I2C_RDWR` transaction to achieve “write register address/command, then repeated-start read data”.
- Address probing (scan)
  - When `tkl_i2c_master_send()` is called with `size==0`, the backend uses SMBus “quick” to probe whether the device ACKs (useful for simple address scanning).

**Not supported yet (API kept, current implementation returns `OPRT_NOT_SUPPORTED`)**

- Slave mode: `tkl_i2c_set_slave_addr()`, `tkl_i2c_slave_send()`, `tkl_i2c_slave_receive()`.
- Interrupt/event callbacks: `tkl_i2c_irq_init()`, `tkl_i2c_irq_enable()`, `tkl_i2c_irq_disable()`.
- Extended control/status query: `tkl_i2c_ioctl()`, `tkl_i2c_get_status()`.
  - Note: `tkl_i2c_get_status()` currently clears the output struct and returns `OPRT_NOT_SUPPORTED`. Do not rely on the returned content.

</details>

### Enable I2C on Raspberry Pi (system configuration)

Run on Raspberry Pi:

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
- `Application config`: configure `i2c port`, `sda pin`, `scl pin`

Notes:

- The Linux porting layer accesses `/dev/i2c-${port}`.
- On Raspberry Pi, it is commonly `/dev/i2c-1` (GPIO2/3), so `i2c port` usually needs to match the actual device node index.

Build and run:

```bash
tos.py build
sudo ./i2c_scan_1.0.0.elf
```

If a device is found, you will see logs like:

- `[example_i2c_scan.c:xx] i2c device found at address: 0x44`

### Example 2: Read temperature/humidity (sht3x_4x_sensor)

Enter the example directory:

```bash
cd examples/peripherals/i2c/sht3x_4x_sensor
```

Configure and build the same way. In **Application config**, choose:

- `sensor type`: sht3x or sht4x (based on your hardware)

Run:

```bash
sudo ./sht3x_4x_sensor_1.0.0.elf
```

You should see periodic temperature/humidity logs.

## SPI

This example demonstrates SPI on Raspberry Pi using TuyaOpen (user-space spidev).

<details>
<summary><strong>Porting notes (Linux TKL SPI)</strong></summary>

**Supported (available)**

- Master mode
  - `tkl_spi_init()`: open `/dev/spidevX.Y` and configure mode/bits/speed/bitorder.
  - Only `TUYA_SPI_ROLE_MASTER` / `TUYA_SPI_ROLE_MASTER_SIMPLEX` are supported.
- Basic send/receive
  - `tkl_spi_send()`: backend uses `write()`.
  - `tkl_spi_recv()`: backend uses `read()`.
- Transfer
  - `tkl_spi_transfer()`: full-duplex TX/RX via `SPI_IOC_MESSAGE(1)`.
  - `tkl_spi_transfer_with_length()`: supports “send then receive” via `SPI_IOC_MESSAGE(2)`.
- Counters and status (compatibility APIs)
  - `tkl_spi_get_data_count()`: returns the byte count from the most recent transfer.
  - `tkl_spi_get_status()`: returns `OPRT_OK`; currently only clears the struct (does not provide real status).

**Not supported yet (API kept, current implementation returns `OPRT_NOT_SUPPORTED`)**

- Interrupt callbacks: `tkl_spi_irq_init()` / `tkl_spi_irq_enable()` / `tkl_spi_irq_disable()`.
- Extended control: `tkl_spi_ioctl()`.

**Behavior limitations / compatibility behavior**

- Abort transfer: `tkl_spi_abort_transfer()` returns `OPRT_OK` but does not perform a real abort.
- DMA length: `tkl_spi_get_max_dma_data_length()` returns 0 (not meaningful under Linux spidev).

**Port to device node mapping (default)**

| spi port | Device node |
| --- | --- |
| 0 | `/dev/spidev0.0` |
| 1 | `/dev/spidev0.1` |
| 2 | `/dev/spidev1.0` |
| 3 | `/dev/spidev1.1` |
| 4 | `/dev/spidev2.0` |
| 5 | `/dev/spidev2.1` |

</details>

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
> The Linux porting layer maps the port number to a concrete device node (see `prv_spi_dev_path()` in `platform/LINUX/tuyaos_adapter/src/tkl_spi.c`):
>
> - `spi port = 0` → `/dev/spidev0.0`
> - `spi port = 1` → `/dev/spidev0.1`
> - `spi port = 2` → `/dev/spidev1.0`
> - `spi port = 3` → `/dev/spidev1.1`
> - `spi port = 4` → `/dev/spidev2.0`
> - `spi port = 5` → `/dev/spidev2.1`
>
> For example, `spidev0.0 / spidev0.1` correspond to `spi port` set to `0 / 1`.

### Enter the example directory

```bash
cd examples/peripherals/spi
```

### Configure, build and run

Configure:

```bash
tos.py config menu
```

- `Choice a board → LINUX → TKL Board Configuration`: enable `ENABLE_SPI`
- `Application config`: configure `spi port`, `spi baudrate`

Recommended `spi port` choices:

- Use `/dev/spidev0.0`: set to `0`
- Use `/dev/spidev0.1`: set to `1`

For `spi baudrate` (Hz), it is recommended to start with `1000000` or `8000000` to verify loopback/communication, then increase gradually based on the peripheral capability.

Build and run:

```bash
tos.py build
sudo ./spi_1.0.0.elf
```

## PWM

This example demonstrates PWM on Raspberry Pi using TuyaOpen.

<details>
<summary><strong>Porting notes (Linux TKL PWM)</strong></summary>

**Supported (available)**

- PWM output (`/sys/class/pwm`)
  - `tkl_pwm_init()`: export the channel and configure polarity/period/duty.
  - `tkl_pwm_start()` / `tkl_pwm_stop()`: start/stop via the `enable` node.
  - `tkl_pwm_duty_set()`: update duty cycle.
  - `tkl_pwm_frequency_set()`: update frequency.
  - `tkl_pwm_polarity_set()`: update polarity.
  - `tkl_pwm_info_set()` / `tkl_pwm_info_get()`: set/get a full parameter set (get returns the config cached in software).
  - `tkl_pwm_multichannel_start()` / `tkl_pwm_multichannel_stop()`: start/stop multiple channels sequentially.
  - `tkl_pwm_deinit()`: stop and unexport.

**Not supported yet (API kept, current implementation returns `OPRT_NOT_SUPPORTED`)**

- PWM capture: `tkl_pwm_cap_start()` / `tkl_pwm_cap_stop()`.
  - Note: the current implementation returns `OPRT_NOT_SUPPORTED` directly.

</details>

### PWM experiment steps (GPIO18 example)

#### Enter the example directory

```bash
cd examples/peripherals/pwm
```

#### Enable PWM on Raspberry Pi (system configuration)

1. Confirm the pin is not in use:

   ```bash
   pinctrl get 18
   ```

   If it is not multiplexed, you will typically see output like:

   - `18: no    pd | -- // GPIO18 = none`

2. Enable the PWM overlay:

   Append the following to the end of `/boot/firmware/config.txt`:

   ```text
   dtoverlay=pwm,pin=18,func=2
   ```

   Reboot the Raspberry Pi for it to take effect.

3. After reboot, verify the mapping:

   ```bash
   pinctrl get 18
   ```

   Expected output (meaning it has switched to a PWM channel):

   - `18: a3    pd | lo // GPIO18 = PWM0_CHAN2`

#### Configure

Start the configuration menu:

```bash
tos.py config menu
```

- `Choice a board → LINUX → TKL Board Configuration`: enable `ENABLE_PWM`
- In the same configuration tree, set:
  - `PWM_SYSFS_CHIP = 0` (corresponds to `/sys/class/pwm/pwmchip0`)
  - `PWM_SYSFS_CHANNEL_BASE = 2` (because GPIO18 maps to `PWM0_CHAN2`)
- `Application config`: select `pwm port = 0` (because it is `PWM0`)

#### Build and run

```bash
tos.py build
sudo ./pwm_1.0.0.elf
```

To quickly verify sysfs nodes, check whether `pwm2` exists (or can be exported) under `/sys/class/pwm/pwmchip0/`.

> **Tip**: PWM sysfs depends on kernel/overlay configuration. The location of `/boot/firmware/config.txt` can vary across OS images—use the actual path on your system.

## UART

This example demonstrates UART on Raspberry Pi using TuyaOpen.

### Hardware wiring notes (physical UART)

If you use a **physical UART** (for example, Raspberry Pi UART pins connected to a USB-TTL adapter or another board’s UART):

- You must connect **GND to GND**. Without a common ground, typical symptoms include garbled RX data, dropped bytes, or very unstable communication.

<details>
<summary><strong>Porting notes (Linux TKL UART)</strong></summary>

**Supported (available)**

- Basic send/receive
  - `tkl_uart_init()`: opens the UART device and configures baud rate/data bits/parity/stop bits via termios.
  - `tkl_uart_write()`: backend uses `write()`.
  - `tkl_uart_read()`: backend uses `read()`.
  - `tkl_uart_deinit()`: closes the fd and stops the RX thread.
- RX callback notification (approximate “interrupt” semantics)
  - `tkl_uart_rx_irq_cb_reg()`: registers the RX callback.
  - On Linux, a thread uses `select()` to monitor fd readability and invokes the callback when data arrives.

**Not supported yet (API kept, current implementation returns `OPRT_NOT_SUPPORTED`)**

- `tkl_uart_set_tx_int()` / `tkl_uart_set_rx_flowctrl()` / `tkl_uart_wait_for_data()` / `tkl_uart_ioctl()`.

**No-op implementation (calling has no effect)**

- `tkl_uart_tx_irq_cb_reg()` is currently an empty implementation.

**Device node mapping (related to the FAKE UART switch)**

- When `TKL_UART_USE_FAKE = n` (FAKE disabled, using real hardware UART), the default mapping is:
  - `port 0 -> /dev/ttyAMA0`
  - `port 1 -> /dev/ttyAMA1`
  - `port 2 -> /dev/ttyAMA2`
- When `TKL_UART_USE_FAKE = y` (FAKE enabled), it does not access `/dev/ttyAMA*` and uses a “fake UART” implementation instead (see below).

</details>

### FAKE UART (stdin/UDP)

To allow UART-related components to run on Linux **without real UART hardware attached**, the Linux platform provides a `TKL_UART_USE_FAKE` switch (under LINUX `TKL Board Configuration`).

When FAKE is enabled, the behavior of `tkl_uart.c` roughly becomes the following (different from real UART; mainly for bring-up/demo):

- `TUYA_UART_NUM_0` (port 0):
  - RX: reads from the current process standard input `/dev/stdin` (i.e. keyboard input in the terminal where you run the `*.elf`).
  - TX: writes to standard output `stdout` (printed directly in the terminal).
  - Typical usage: “keyboard input → UART RX”, and you can see “UART TX” output on screen, without relying on any `/dev/ttyAMA*`.
- `TUYA_UART_NUM_1` (port 1):
  - RX: receives data from a UDP socket and feeds it to the upper-layer RX callback byte-by-byte.
  - TX: sends data to the peer via UDP.
  - Note: in the current implementation, the bind/send IP and ports are hard-coded (environment-dependent). In most cases you need to modify the porting-layer source and rebuild.

Limitations / notes of FAKE mode:

- Baud rate/parity/stop bit termios settings are **not equivalent to real UART** in FAKE mode (port 0 only puts stdin into non-canonical mode to read characters immediately; stdout does not have real UART timing).
- FAKE is mainly for “logic verification / interactive demo”, not for serious serial protocol timing validation.

How to choose whether to use FAKE:

- If you want UART examples/CLI to use the Raspberry Pi real UART pins (`/dev/ttyAMA*` or `/dev/ttyS*`), go to:
  - `Choice a board → LINUX → TKL Board Configuration`
  - set `Use fake UART (stdin/UDP) instead of hardware ttyAMA*` to `n`
  - Note: when this option is **unchecked**, it uses the physical UART (accessing real `ttyAMA*` / `ttyS*` device nodes).
- If you just want a quick UART logic check and you don’t have a USB-TTL adapter or hardware loopback yet, keep it as `y`.

#### Note: QR-code output channel during `your_chat_bot` provisioning (FAKE UART)

When running `your_chat_bot` provisioning demos on Linux/Raspberry Pi, it is recommended to enable `TKL_UART_USE_FAKE`, so that the QR-code content during provisioning is printed directly in the current terminal.

**1) Expected behavior (FAKE enabled)**

- You can see the QR code (QR string / ASCII art) directly in the terminal where you run `your_chat_bot*.elf`.

**2) How it works (output goes through UART0 TX)**

- QR-code content during provisioning is typically sent via UART0 (`TUYA_UART_NUM_0`).
- When `TKL_UART_USE_FAKE = y`: UART0 TX is mapped to `stdout`, so the QR code appears in the current terminal.
- When `TKL_UART_USE_FAKE = n`: UART0 TX is written to the real serial device (for example `/dev/ttyAMA0` / `/dev/ttyS0`), so it will not appear in the terminal and will be output on the serial line.

### Enable UART on Raspberry Pi (system configuration)

```bash
sudo raspi-config
```

Configure the serial port via:

- `3 Interface Options` → `I6 Serial Port`

Usually choose:

- **Disable serial login shell**
- **Enable serial port hardware**

Check the system serial nodes:

```bash
ls -l /dev/ttyAMA* /dev/ttyS* 2>/dev/null
```

### Enter the example directory

```bash
cd examples/peripherals/uart
```

### Configure, build and run

Configure:

```bash
tos.py config menu
```

- `Choice a board → LINUX → TKL Board Configuration`: enable `ENABLE_UART`

Optional: set `Use fake UART (stdin/UDP) instead of hardware ttyAMA*` (whether to use FAKE UART) in the same menu.

- Checked (`*`): use FAKE UART (stdin/UDP), no dependency on real hardware UART device nodes.
- Unchecked (` `): use physical UART (access real `ttyAMA*` / `ttyS*` device nodes).

Build:

```bash
tos.py build
```

Run:

```bash
sudo ./uart_1.0.0.elf
```

> **Reminder**: the example uses `TUYA_UART_NUM_0` (UART0) by default. On Raspberry Pi, UART0 may be occupied by the system console. If it shows no output or fails to open, check console usage and adjust the UART port selection in the example or update the device-node mapping in the porting layer.

