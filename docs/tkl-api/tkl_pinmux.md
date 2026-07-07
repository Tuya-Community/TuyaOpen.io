---
title: tkl_pinmux | Pinmux Driver
description: "tkl_pinmux reference — TuyaOpen pinmux TKL API for mapping peripheral functions to physical IO pins and querying pin assignments in embedded IoT development."
keywords:
  - tkl_pinmux
  - tuyaopen pinmux driver
  - tkl pinmux api
  - embedded pinmux
---

## Overview

`tkl_pinmux` maps and multiplexes peripheral functions onto physical IO pins. You assign a function (such as `TUYA_IIC0_SCL` or `TUYA_UART0_TX`) to a pin, configure several pins at once, or query which port and channel a pin currently serves.

Pins are identified by `TUYA_PIN_NAME_E` values (`TUYA_IO_PIN_0` to `TUYA_IO_PIN_60`). Functions are identified by `TUYA_PIN_FUNC_E` values grouped by peripheral, for example `TUYA_IIC0_SCL`, `TUYA_UART0_TX`, `TUYA_SPI0_CLK`, `TUYA_PWM0`, `TUYA_ADC0`, `TUYA_DAC0`, `TUYA_I2S0_SCK`, and `TUYA_GPIO`. Which pins support which functions is platform-specific.

## tkl_io_pinmux_config

```c
OPERATE_RET tkl_io_pinmux_config(TUYA_PIN_NAME_E pin, TUYA_PIN_FUNC_E pin_func);
```

Configures the function of a single IO pin.

Parameters:

- `pin`: Pin number.
- `pin_func`: Pin function.

Returns:

- `OPRT_OK` on success. For other values, see `tuya_error_code.h`.

## tkl_multi_io_pinmux_config

```c
OPERATE_RET tkl_multi_io_pinmux_config(TUYA_MUL_PIN_CFG_T *cfg, uint16_t num);
```

Configures the functions of multiple IO pins in one call.

Parameters:

- `cfg`: Pointer to an array of pin configurations.

  ```c
  typedef struct {
      TUYA_PIN_NAME_E pin;       // Pin number
      TUYA_PIN_FUNC_E pin_func;  // Pin function
  } TUYA_MUL_PIN_CFG_T;
  ```

- `num`: Number of entries in the `cfg` array.

Returns:

- `OPRT_OK` on success. For other values, see `tuya_error_code.h`.

## tkl_io_pin_to_func

```c
int32_t tkl_io_pin_to_func(uint32_t pin, TUYA_PIN_TYPE_E pin_type);
```

Resolves the port and channel that a pin maps to for a given peripheral type.

Parameters:

- `pin`: Pin number.
- `pin_type`: Peripheral type to query.

  ```c
  typedef enum {
      TUYA_IO_TYPE_PWM,
      TUYA_IO_TYPE_ADC,
      TUYA_IO_TYPE_DAC,
      TUYA_IO_TYPE_UART,
      TUYA_IO_TYPE_SPI,
      TUYA_IO_TYPE_I2C,
      TUYA_IO_TYPE_I2S,
      TUYA_IO_TYPE_GPIO,
      TUYA_IO_TYPE_MAX = 0xFFFF,
  } TUYA_PIN_TYPE_E;
  ```

Returns:

- On success, the packed port and channel: bits 0–7 are the channel and bits 8–15 are the port.
- A value less than `0` if the pin maps to no such function.

## Examples

Configure two pins individually:

```c
tkl_io_pinmux_config(TUYA_IO_PIN_0, TUYA_IIC0_SCL);
tkl_io_pinmux_config(TUYA_IO_PIN_1, TUYA_IIC0_SDA);
```

Configure the same two pins in one call:

```c
TUYA_MUL_PIN_CFG_T cfg[2];
cfg[0].pin = TUYA_IO_PIN_0;
cfg[0].pin_func = TUYA_IIC0_SCL;

cfg[1].pin = TUYA_IO_PIN_1;
cfg[1].pin_func = TUYA_IIC0_SDA;

tkl_multi_io_pinmux_config(cfg, 2);
```
