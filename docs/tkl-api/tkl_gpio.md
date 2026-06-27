---
title: "tkl_gpio | GPIO Driver"
---

The TKL GPIO interface configures a chip pin as a general-purpose input or output, reads or writes its logic level, and attaches an interrupt handler for edge or level events. Pins are addressed by the Tuya-assigned index `TUYA_GPIO_NUM_E` (starting at 0), which is independent of the chip's physical pin numbering.

The available pin modes depend on the chip. The table below is the full set the API can express; a given platform may support only a subset.

| Mode | Enumeration |
| --- | --- |
| Pull-up input | `TUYA_GPIO_PULLUP` |
| Pull-down input | `TUYA_GPIO_PULLDOWN` |
| High-impedance input | `TUYA_GPIO_HIGH_IMPEDANCE` |
| Floating input | `TUYA_GPIO_FLOATING` |
| Push-pull output | `TUYA_GPIO_PUSH_PULL` |
| Open-drain output | `TUYA_GPIO_OPENDRAIN` |
| Open-drain with pull-up output | `TUYA_GPIO_OPENDRAIN_PULLUP` |

## tkl_gpio_init

```c
OPERATE_RET tkl_gpio_init(TUYA_GPIO_NUM_E pin_id, const TUYA_GPIO_BASE_CFG_T *cfg);
```

Configures one GPIO pin with the given mode, direction, and initial level.

| Parameter | Type | Description |
| --- | --- | --- |
| `pin_id` | `TUYA_GPIO_NUM_E` | GPIO pin index, starting at `TUYA_GPIO_NUM_0`. |
| `cfg` | `const TUYA_GPIO_BASE_CFG_T *` | Pin configuration. |

The configuration structure is:

```c
typedef struct {
    TUYA_GPIO_MODE_E  mode;   // pin mode
    TUYA_GPIO_DRCT_E  direct; // input/output direction
    TUYA_GPIO_LEVEL_E level;  // initial level
} TUYA_GPIO_BASE_CFG_T;
```

`mode` accepts the values listed in the table above. `direct` selects the direction:

| Value | Description |
| --- | --- |
| `TUYA_GPIO_INPUT` | Input mode |
| `TUYA_GPIO_OUTPUT` | Output mode |

`level` sets the initial output level:

| Value | Description |
| --- | --- |
| `TUYA_GPIO_LEVEL_LOW` | Low level |
| `TUYA_GPIO_LEVEL_HIGH` | High level |
| `TUYA_GPIO_LEVEL_NONE` | No level (unset) |

**Returns** `OPRT_OK` on success. For other values, see the `OPRT_OS_ADAPTER_GPIO_ERRCODE` section of `tuya_error_code.h`.

## tkl_gpio_deinit

```c
OPERATE_RET tkl_gpio_deinit(TUYA_GPIO_NUM_E pin_id);
```

Restores a GPIO pin to its initial state and releases its resources.

| Parameter | Type | Description |
| --- | --- | --- |
| `pin_id` | `TUYA_GPIO_NUM_E` | GPIO pin index. |

**Returns** `OPRT_OK` on success. For other values, see the `OPRT_OS_ADAPTER_GPIO_ERRCODE` section of `tuya_error_code.h`.

## tkl_gpio_write

```c
OPERATE_RET tkl_gpio_write(TUYA_GPIO_NUM_E pin_id, TUYA_GPIO_LEVEL_E level);
```

Drives an output pin to the given level.

| Parameter | Type | Description |
| --- | --- | --- |
| `pin_id` | `TUYA_GPIO_NUM_E` | GPIO pin index. |
| `level` | `TUYA_GPIO_LEVEL_E` | Output level to drive. |

**Returns** `OPRT_OK` on success. For other values, see the `OPRT_OS_ADAPTER_GPIO_ERRCODE` section of `tuya_error_code.h`.

## tkl_gpio_read

```c
OPERATE_RET tkl_gpio_read(TUYA_GPIO_NUM_E pin_id, TUYA_GPIO_LEVEL_E *level);
```

Reads the current level of a pin.

| Parameter | Type | Description |
| --- | --- | --- |
| `pin_id` | `TUYA_GPIO_NUM_E` | GPIO pin index. |
| `level` | `TUYA_GPIO_LEVEL_E *` | Output: the level read from the pin. |

**Returns** `OPRT_OK` on success. For other values, see the `OPRT_OS_ADAPTER_GPIO_ERRCODE` section of `tuya_error_code.h`.

## tkl_gpio_irq_init

```c
OPERATE_RET tkl_gpio_irq_init(TUYA_GPIO_NUM_E pin_id, const TUYA_GPIO_IRQ_T *cfg);
```

Registers an interrupt handler for a pin. This call does not enable the interrupt; call `tkl_gpio_irq_enable` afterward.

| Parameter | Type | Description |
| --- | --- | --- |
| `pin_id` | `TUYA_GPIO_NUM_E` | GPIO pin index. |
| `cfg` | `const TUYA_GPIO_IRQ_T *` | Interrupt configuration. |

The interrupt configuration structure is:

```c
typedef struct {
    TUYA_GPIO_IRQ_E  mode; // trigger mode
    TUYA_GPIO_IRQ_CB cb;   // callback function
    void            *arg;  // argument passed to the callback
} TUYA_GPIO_IRQ_T;
```

`mode` selects the trigger condition:

| Value | Description |
| --- | --- |
| `TUYA_GPIO_IRQ_RISE` | Rising edge |
| `TUYA_GPIO_IRQ_FALL` | Falling edge |
| `TUYA_GPIO_IRQ_RISE_FALL` | Both edges |
| `TUYA_GPIO_IRQ_LOW` | Low level |
| `TUYA_GPIO_IRQ_HIGH` | High level |

`cb` is the callback invoked on the interrupt:

```c
typedef void (*TUYA_GPIO_IRQ_CB)(void *args);
```

**Returns** `OPRT_OK` on success. For other values, see the `OPRT_OS_ADAPTER_GPIO_ERRCODE` section of `tuya_error_code.h`.

## tkl_gpio_irq_enable

```c
OPERATE_RET tkl_gpio_irq_enable(TUYA_GPIO_NUM_E pin_id);
```

Enables the interrupt registered with `tkl_gpio_irq_init`.

| Parameter | Type | Description |
| --- | --- | --- |
| `pin_id` | `TUYA_GPIO_NUM_E` | GPIO pin index. |

**Returns** `OPRT_OK` on success. For other values, see the `OPRT_OS_ADAPTER_GPIO_ERRCODE` section of `tuya_error_code.h`.

## tkl_gpio_irq_disable

```c
OPERATE_RET tkl_gpio_irq_disable(TUYA_GPIO_NUM_E pin_id);
```

Disables the interrupt for a pin.

| Parameter | Type | Description |
| --- | --- | --- |
| `pin_id` | `TUYA_GPIO_NUM_E` | GPIO pin index. |

**Returns** `OPRT_OK` on success. For other values, see the `OPRT_OS_ADAPTER_GPIO_ERRCODE` section of `tuya_error_code.h`.

## Examples

Configure two pins as push-pull outputs and drive them high:

```c
void tuya_gpio_test(void)
{
    TUYA_GPIO_BASE_CFG_T cfg = {
        .mode = TUYA_GPIO_PUSH_PULL,
        .direct = TUYA_GPIO_OUTPUT,
        .level = TUYA_GPIO_LEVEL_LOW,
    };
    tkl_gpio_init(TUYA_GPIO_NUM_3, &cfg);
    tkl_gpio_init(TUYA_GPIO_NUM_4, &cfg);

    tkl_gpio_write(TUYA_GPIO_NUM_3, TUYA_GPIO_LEVEL_HIGH);
    tkl_gpio_write(TUYA_GPIO_NUM_4, TUYA_GPIO_LEVEL_HIGH);
}
```

Register and enable a rising-edge interrupt on two pins:

```c
static void __gpio_irq_callback7(void *args)
{
    // handle interrupt on pin 7
}

static void __gpio_irq_callback8(void *args)
{
    // handle interrupt on pin 8
}

void tuya_gpio_irq_test(void)
{
    TUYA_GPIO_IRQ_T irq_cfg_7 = {
        .mode = TUYA_GPIO_IRQ_RISE,
        .cb = __gpio_irq_callback7,
        .arg = NULL,
    };
    TUYA_GPIO_IRQ_T irq_cfg_8 = {
        .mode = TUYA_GPIO_IRQ_RISE,
        .cb = __gpio_irq_callback8,
        .arg = NULL,
    };
    tkl_gpio_irq_init(TUYA_GPIO_NUM_7, &irq_cfg_7);
    tkl_gpio_irq_init(TUYA_GPIO_NUM_8, &irq_cfg_8);
    tkl_gpio_irq_enable(TUYA_GPIO_NUM_7);
    tkl_gpio_irq_enable(TUYA_GPIO_NUM_8);
}
```

## See also

- [GPIO and Interrupt Tutorial](../peripheral/tutorials/gpio-interrupt-tutorial)
