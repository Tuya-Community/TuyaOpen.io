---
title: tkl_pinmux | Pinmux 驱动
---

## 概述

`tkl_pinmux` 用于将外设功能映射并复用到物理 IO 管脚上。你可以为单个管脚分配功能（如 `TUYA_IIC0_SCL` 或 `TUYA_UART0_TX`），一次配置多个管脚，或查询某个管脚当前对应的端口和通道。

管脚由 `TUYA_PIN_NAME_E` 取值标识（`TUYA_IO_PIN_0` 到 `TUYA_IO_PIN_60`）。功能由 `TUYA_PIN_FUNC_E` 取值标识，按外设分组，例如 `TUYA_IIC0_SCL`、`TUYA_UART0_TX`、`TUYA_SPI0_CLK`、`TUYA_PWM0`、`TUYA_ADC0`、`TUYA_DAC0`、`TUYA_I2S0_SCK` 和 `TUYA_GPIO`。哪些管脚支持哪些功能取决于具体平台。

## tkl_io_pinmux_config

```c
OPERATE_RET tkl_io_pinmux_config(TUYA_PIN_NAME_E pin, TUYA_PIN_FUNC_E pin_func);
```

配置单个 IO 管脚的功能。

参数：

- `pin`：管脚号。
- `pin_func`：管脚功能。

返回值：

- 成功返回 `OPRT_OK`，其他值请参考 `tuya_error_code.h`。

## tkl_multi_io_pinmux_config

```c
OPERATE_RET tkl_multi_io_pinmux_config(TUYA_MUL_PIN_CFG_T *cfg, uint16_t num);
```

一次配置多个 IO 管脚的功能。

参数：

- `cfg`：管脚配置数组指针。

  ```c
  typedef struct {
      TUYA_PIN_NAME_E pin;       // 管脚号
      TUYA_PIN_FUNC_E pin_func;  // 管脚功能
  } TUYA_MUL_PIN_CFG_T;
  ```

- `num`：`cfg` 数组中的配置数量。

返回值：

- 成功返回 `OPRT_OK`，其他值请参考 `tuya_error_code.h`。

## tkl_io_pin_to_func

```c
int32_t tkl_io_pin_to_func(uint32_t pin, TUYA_PIN_TYPE_E pin_type);
```

针对给定的外设类型，查询管脚对应的端口和通道。

参数：

- `pin`：管脚号。
- `pin_type`：要查询的外设类型。

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

返回值：

- 成功时返回打包的端口和通道：bit0–bit7 为通道，bit8–bit15 为端口。
- 若管脚不对应该功能，返回小于 `0` 的值。

## 示例

分别配置两个管脚：

```c
tkl_io_pinmux_config(TUYA_IO_PIN_0, TUYA_IIC0_SCL);
tkl_io_pinmux_config(TUYA_IO_PIN_1, TUYA_IIC0_SDA);
```

一次配置上述两个管脚：

```c
TUYA_MUL_PIN_CFG_T cfg[2];
cfg[0].pin = TUYA_IO_PIN_0;
cfg[0].pin_func = TUYA_IIC0_SCL;

cfg[1].pin = TUYA_IO_PIN_1;
cfg[1].pin_func = TUYA_IIC0_SDA;

tkl_multi_io_pinmux_config(cfg, 2);
```
