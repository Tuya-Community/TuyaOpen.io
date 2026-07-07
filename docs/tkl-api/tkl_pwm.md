---
title: "tkl_pwm | PWM Driver"
description: "tkl_pwm reference — TuyaOpen PWM driver TKL API for polarity, duty cycle, frequency, start/stop, and input-capture pulse timing in embedded IoT development."
keywords:
  - tkl_pwm
  - tuyaopen pwm driver
  - tkl pwm api
  - embedded pwm driver
---

The TKL PWM interface generates a pulse-width-modulated signal on a hardware channel and reads pulse timing back through input capture. You configure a channel's polarity, duty cycle, and frequency, then start, adjust, or stop the output at runtime. Channels are addressed by `TUYA_PWM_NUM_E`, starting at `TUYA_PWM_NUM_0`.

A PWM signal encodes an analog value as the ratio of high time to period (the duty cycle). For example, with a 10 ms period, a 7 ms high time is a 70% duty cycle and a 4 ms high time is a 40% duty cycle. Adjusting the duty cycle changes the effective analog output.

## tkl_pwm_init

```c
OPERATE_RET tkl_pwm_init(TUYA_PWM_NUM_E ch_id, const TUYA_PWM_BASE_CFG_T *cfg);
```

Initializes a PWM channel with the given polarity, duty cycle, and frequency.

| Parameter | Type | Description |
| --- | --- | --- |
| `ch_id` | `TUYA_PWM_NUM_E` | PWM channel index, starting at `TUYA_PWM_NUM_0`. |
| `cfg` | `const TUYA_PWM_BASE_CFG_T *` | Channel configuration. |

The configuration structure is:

```c
typedef struct {
    TUYA_PWM_POLARITY_E polarity;
    TUYA_PWM_COUNT_E    count_mode;
    // pulse duty cycle = duty / cycle; e.g. duty = 5000, cycle = 10000 -> 50%
    uint32_t            duty;
    uint32_t            cycle;
    uint32_t            frequency; // Hz
} TUYA_PWM_BASE_CFG_T;
```

`polarity` selects the active level:

| Value | Description |
| --- | --- |
| `TUYA_PWM_NEGATIVE` | Low-level output |
| `TUYA_PWM_POSITIVE` | High-level output |

`count_mode` selects the counter mode:

| Value | Description |
| --- | --- |
| `TUYA_PWM_CNT_UP` | Up counting (default) |
| `TUYA_PWM_CNT_UP_AND_DOWN` | Up-and-down counting, for complementary duplex mode |

`duty` and `cycle` set the duty ratio as `duty / cycle`. `frequency` is the output frequency in Hz.

**Returns** `OPRT_OK` on success. For other values, see `tuya_error_code.h`.

## tkl_pwm_deinit

```c
OPERATE_RET tkl_pwm_deinit(TUYA_PWM_NUM_E ch_id);
```

Deinitializes a PWM channel. Stops any ongoing output and releases the channel's software and hardware resources.

| Parameter | Type | Description |
| --- | --- | --- |
| `ch_id` | `TUYA_PWM_NUM_E` | PWM channel index. |

**Returns** `OPRT_OK` on success. For other values, see `tuya_error_code.h`.

## tkl_pwm_start

```c
OPERATE_RET tkl_pwm_start(TUYA_PWM_NUM_E ch_id);
```

Starts output on a PWM channel.

| Parameter | Type | Description |
| --- | --- | --- |
| `ch_id` | `TUYA_PWM_NUM_E` | PWM channel index. |

**Returns** `OPRT_OK` on success. For other values, see `tuya_error_code.h`.

## tkl_pwm_stop

```c
OPERATE_RET tkl_pwm_stop(TUYA_PWM_NUM_E ch_id);
```

Stops output on a PWM channel.

| Parameter | Type | Description |
| --- | --- | --- |
| `ch_id` | `TUYA_PWM_NUM_E` | PWM channel index. |

**Returns** `OPRT_OK` on success. For other values, see `tuya_error_code.h`.

## tkl_pwm_multichannel_start

```c
OPERATE_RET tkl_pwm_multichannel_start(TUYA_PWM_NUM_E *ch_id, uint8_t num);
```

Starts several PWM channels together for synchronized combined output, for cases with strict timing requirements.

| Parameter | Type | Description |
| --- | --- | --- |
| `ch_id` | `TUYA_PWM_NUM_E *` | Array of channel indices to start. |
| `num` | `uint8_t` | Number of channels in the array. |

**Returns** `OPRT_OK` on success. For other values, see `tuya_error_code.h`.

## tkl_pwm_multichannel_stop

```c
OPERATE_RET tkl_pwm_multichannel_stop(TUYA_PWM_NUM_E *ch_id, uint8_t num);
```

Stops several PWM channels together.

| Parameter | Type | Description |
| --- | --- | --- |
| `ch_id` | `TUYA_PWM_NUM_E *` | Array of channel indices to stop. |
| `num` | `uint8_t` | Number of channels in the array. |

**Returns** `OPRT_OK` on success. For other values, see `tuya_error_code.h`.

## tkl_pwm_duty_set

```c
OPERATE_RET tkl_pwm_duty_set(TUYA_PWM_NUM_E ch_id, uint32_t duty);
```

Sets the duty cycle of a channel.

| Parameter | Type | Description |
| --- | --- | --- |
| `ch_id` | `TUYA_PWM_NUM_E` | PWM channel index. |
| `duty` | `uint32_t` | Duty cycle, used as `duty / cycle`. |

**Returns** `OPRT_OK` on success. For other values, see `tuya_error_code.h`.

## tkl_pwm_frequency_set

```c
OPERATE_RET tkl_pwm_frequency_set(TUYA_PWM_NUM_E ch_id, uint32_t frequency);
```

Sets the output frequency of a channel.

| Parameter | Type | Description |
| --- | --- | --- |
| `ch_id` | `TUYA_PWM_NUM_E` | PWM channel index. |
| `frequency` | `uint32_t` | Output frequency in Hz. |

**Returns** `OPRT_OK` on success. For other values, see `tuya_error_code.h`.

## tkl_pwm_polarity_set

```c
OPERATE_RET tkl_pwm_polarity_set(TUYA_PWM_NUM_E ch_id, TUYA_PWM_POLARITY_E polarity);
```

Sets the output polarity of a channel.

| Parameter | Type | Description |
| --- | --- | --- |
| `ch_id` | `TUYA_PWM_NUM_E` | PWM channel index. |
| `polarity` | `TUYA_PWM_POLARITY_E` | `TUYA_PWM_NEGATIVE` or `TUYA_PWM_POSITIVE`. |

**Returns** `OPRT_OK` on success. For other values, see `tuya_error_code.h`.

## tkl_pwm_info_set

```c
OPERATE_RET tkl_pwm_info_set(TUYA_PWM_NUM_E ch_id, const TUYA_PWM_BASE_CFG_T *info);
```

Replaces the full configuration of a channel, so you can change polarity, duty cycle, and frequency at runtime and restart the channel.

| Parameter | Type | Description |
| --- | --- | --- |
| `ch_id` | `TUYA_PWM_NUM_E` | PWM channel index. |
| `info` | `const TUYA_PWM_BASE_CFG_T *` | New channel configuration (see `tkl_pwm_init`). |

**Returns** `OPRT_OK` on success. For other values, see `tuya_error_code.h`.

## tkl_pwm_info_get

```c
OPERATE_RET tkl_pwm_info_get(TUYA_PWM_NUM_E ch_id, TUYA_PWM_BASE_CFG_T *info);
```

Reads the current configuration of a channel.

| Parameter | Type | Description |
| --- | --- | --- |
| `ch_id` | `TUYA_PWM_NUM_E` | PWM channel index. |
| `info` | `TUYA_PWM_BASE_CFG_T *` | Output: the channel configuration. |

**Returns** `OPRT_OK` on success. For other values, see `tuya_error_code.h`.

## tkl_pwm_cap_start

```c
OPERATE_RET tkl_pwm_cap_start(TUYA_PWM_NUM_E ch_id, const TUYA_PWM_CAP_IRQ_T *cfg);
```

Starts PWM input capture mode on a channel, measuring pulse timing on the input signal.

| Parameter | Type | Description |
| --- | --- | --- |
| `ch_id` | `TUYA_PWM_NUM_E` | PWM channel index. |
| `cfg` | `const TUYA_PWM_CAP_IRQ_T *` | Capture configuration. |

The capture configuration structure is:

```c
typedef struct {
    TUYA_PWM_CAPTURE_MODE_E cap_mode;      // capture mode
    TUYA_PWM_POLARITY_E     trigger_level; // trigger edge
    uint32_t                clk;           // sampling rate of the capture signal
    TUYA_PWM_IRQ_CB         cb;            // capture callback
    void                   *arg;           // argument passed to the callback
} TUYA_PWM_CAP_IRQ_T;
```

`cap_mode` selects the capture mode:

| Value | Description |
| --- | --- |
| `TUYA_PWM_CAPTURE_MODE_ONCE` | Single trigger |
| `TUYA_PWM_CAPTURE_MODE_PERIOD` | Repeated trigger |

`trigger_level` selects the trigger edge:

| Value | Description |
| --- | --- |
| `TUYA_PWM_NEGATIVE` | Falling edge |
| `TUYA_PWM_POSITIVE` | Rising edge |

`clk` is the sampling clock for the captured signal. `cb` is the capture callback, and `arg` is passed to it:

```c
typedef void (*TUYA_PWM_IRQ_CB)(TUYA_PWM_NUM_E port, TUYA_PWM_CAPTURE_DATA_T data, void *arg);

typedef struct {
    uint32_t            cap_value; // captured data
    TUYA_PWM_POLARITY_E cap_edge;  // capture edge: TUYA_PWM_NEGATIVE = falling, TUYA_PWM_POSITIVE = rising
} TUYA_PWM_CAPTURE_DATA_T;
```

**Returns** `OPRT_OK` on success. For other values, see `tuya_error_code.h`.

## tkl_pwm_cap_stop

```c
OPERATE_RET tkl_pwm_cap_stop(TUYA_PWM_NUM_E ch_id);
```

Stops PWM input capture mode on a channel.

| Parameter | Type | Description |
| --- | --- | --- |
| `ch_id` | `TUYA_PWM_NUM_E` | PWM channel index. |

**Returns** `OPRT_OK` on success. For other values, see `tuya_error_code.h`.

## Example

Start a 50% duty cycle output, adjust the duty cycle at runtime, then stop and deinitialize the channel:

```c
void tuya_pwm_test(void)
{
    OPERATE_RET ret;
    TUYA_PWM_BASE_CFG_T cfg = {
        .polarity = TUYA_PWM_POSITIVE,
        .duty = 1000,
        .cycle = 10000,
        .frequency = 1000,
    };

    ret = tkl_pwm_init(TUYA_PWM_NUM_0, &cfg);
    if (ret != OPRT_OK) {
        return;
    }

    ret = tkl_pwm_start(TUYA_PWM_NUM_0);
    if (ret != OPRT_OK) {
        return;
    }
    tkl_system_delay(5000);

    ret = tkl_pwm_info_get(TUYA_PWM_NUM_0, &cfg);
    if (ret != OPRT_OK) {
        return;
    }
    if (cfg.duty != 5000) {
        cfg.duty = 5000;
    }
    ret = tkl_pwm_info_set(TUYA_PWM_NUM_0, &cfg);
    tkl_system_delay(5000);

    ret = tkl_pwm_stop(TUYA_PWM_NUM_0);
    if (ret != OPRT_OK) {
        return;
    }
    ret = tkl_pwm_deinit(TUYA_PWM_NUM_0);
    if (ret != OPRT_OK) {
        return;
    }
}
```
