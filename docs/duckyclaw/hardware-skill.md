---
title: Hardware Peripheral Skills
---

# Hardware Peripheral Skills (Hardware MCP Tools)

This guide describes the hardware peripheral MCP tools built into DuckyClaw. It is aimed at developers who want to control GPIO, ADC, I2C, UART, PWM, and servo peripherals directly through natural-language AI voice commands.

## Overview

Hardware peripheral skills are a set of built-in MCP (Model Context Protocol) tools that allow the AI Agent to operate device hardware through natural language. Once enabled, you can say things like "set GPIO 5 high" or "read the UART buffer" and the AI will automatically call the corresponding hardware tool.

- **Source file**: `tools/tool_hw.c`
- **Use cases**: Hardware debugging, peripheral validation, rapid prototyping

---

## Enabling hardware peripheral skills

The hardware peripheral skills are controlled by the `ENABLE_HARDWARE_MCP` macro.

:::note
T5AI-BOARD enables `ENABLE_HARDWARE_MCP` by default — no manual configuration is needed. For other platforms, follow the steps below.
:::

Run the configuration menu from the project directory:

```bash
tos.py config menu
```

Find and enable the `ENABLE_HARDWARE_MCP` option, save, then recompile the firmware.

:::tip
If you cannot find the option, you can also add it directly to the project `Kconfig` or `config` file:

```
CONFIG_ENABLE_HARDWARE_MCP=y
```

:::

---

## Tool reference

### 1. GPIO Output

Sets a GPIO pin to a high or low output level.

| Parameter | Type | Description |
|-----------|------|-------------|
| `pin` | Integer | GPIO pin number |
| `level` | Integer | Output level: `1` = high, `0` = low |

**Example voice / text commands:**

> "Set GPIO 5 to high"
> "Pull pin 12 low"
> "GPIO 8 output 1"

:::note
Reference example: `TuyaOpen/examples/peripherals/gpio/src/example_gpio.c`
:::

---

### 2. GPIO Input

Reads the current input level on a GPIO pin.

| Parameter | Type | Description |
|-----------|------|-------------|
| `pin` | Integer | GPIO pin number |

**Return value:** Current pin level (`0` or `1`).

**Example voice / text commands:**

> "Read the level of GPIO 3"
> "What is the state of pin 7?"
> "Is GPIO 10 high or low?"

---

### 3. I2C Scan

Scans the I2C bus and returns the addresses of all responding devices. Useful for checking whether sensors, displays, or other I2C devices are correctly wired.

| Parameter | Type | Description |
|-----------|------|-------------|
| `scl_pin` | Integer | I2C clock line (SCL) pin number |
| `sda_pin` | Integer | I2C data line (SDA) pin number |

**Return value:** List of device addresses found on the bus (hexadecimal).

**Example voice / text commands:**

> "Scan the I2C bus, SCL is pin 22 and SDA is pin 21"
> "I2C scan with SCL=9 and SDA=10"
> "Scan for I2C devices on clock pin 22 and data pin 21"

:::note
Reference example: `TuyaOpen/examples/peripherals/i2c/i2c_scan/src/example_i2c_scan.c`
:::

---

### 4. ADC Sampling

Reads the analog sample value from an ADC pin. Use this to measure voltages, sensor outputs, and other analog signals.

| Parameter | Type | Description |
|-----------|------|-------------|
| `pin` | Integer | ADC pin number |

**Return value:** Raw ADC sample value (integer).

**Example voice / text commands:**

> "Read the ADC value on pin 34"
> "Sample ADC channel 6"
> "What is the voltage on GPIO 36?"

:::tip
The ADC value is a raw integer. Convert it to a voltage using your board's reference voltage and ADC resolution.
:::

:::note
Reference example: `TuyaOpen/examples/peripherals/adc/src/example_adc.c`
:::

---

### 5. UART Send

Sends a string over UART2.

| Parameter | Type | Description |
|-----------|------|-------------|
| `data` | String | Text to send |

**Example voice / text commands:**

> "Send 'Hello World' over UART"
> "Send AT+RESET via serial"
> "UART transmit 'start test'"

:::note
This tool uses UART2 with default baud rate and settings. Reference example: `TuyaOpen/examples/peripherals/uart/src/example_uart.c`
:::

---

### 6. UART Read

Reads data from the UART2 receive buffer.

| Parameter | Description |
|-----------|-------------|
| None | No parameters required |

**Return value:** String data currently in the UART receive buffer.

**Example voice / text commands:**

> "Read the UART data"
> "Check the serial receive buffer"
> "Has the UART received anything?"

---

### 7. PWM Output

Initializes PWM output on a specified pin and sets the duty cycle. Frequency and other parameters use default values.

| Parameter | Type | Description |
|-----------|------|-------------|
| `pin` | Integer | PWM output pin number |
| `duty` | Integer | Duty cycle: `0` (0%) to `100` (100%) |

**Example voice / text commands:**

> "Output 50% PWM on pin 18"
> "Set the PWM duty cycle on GPIO 19 to 75"
> "Set pin 5 PWM to 30%"

:::note
Reference example: `TuyaOpen/examples/peripherals/pwm/src/example_pwm.c`
:::

---

### 8. Servo Control

Controls a servo motor by rotating it to a specified angle using a PWM signal.

- Frequency fixed at **50 Hz** (20 ms period)
- Pulse width range 0.5 ms (0°) to 2.5 ms (180°) is calculated automatically

| Parameter | Type | Description |
|-----------|------|-------------|
| `angle` | Integer | Target angle in degrees: `0` to `180` |

**Example voice / text commands:**

> "Rotate the servo to 90 degrees"
> "Move the servo to 45 degrees"
> "Set servo angle to 180"

:::tip
The servo tool converts the angle to the corresponding PWM pulse width automatically — no manual calculation needed.
:::

---

## Usage tips

- When describing hardware operations to the AI, always provide the **pin number** and **target value** explicitly for more accurate tool calls.
- If a device is unresponsive, use **I2C Scan** or **GPIO Input** first to verify the hardware connection.
- The UART tools are useful for communicating with external MCUs or sensor modules (e.g. sending AT commands).

---

## References

- [Custom Device MCP (Hardware Skills Development Guide)](custom-device-mcp)
- [DuckyClaw Quick Start (T5-AI)](ducky-quick-start-T5AI)
- TuyaOpen peripheral examples: `TuyaOpen/examples/peripherals/`
