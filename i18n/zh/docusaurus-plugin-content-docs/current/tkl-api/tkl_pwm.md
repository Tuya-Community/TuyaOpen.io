---
title: "tkl_pwm | PWM 驱动"
description: "tkl_pwm 参考 —— 用于配置通道极性、占空比与频率生成 PWM 信号，并通过输入捕获读取脉冲时序的 PWM 驱动 TKL API。"
keywords:
  - tkl_pwm
  - TuyaOpen PWM 驱动
  - 脉宽调制
  - 嵌入式驱动
---

TKL PWM 接口在硬件通道上生成脉冲宽度调制信号，并通过输入捕获读取脉冲时序。你配置通道的极性、占空比和频率，然后在运行时启动、调整或停止输出。通道通过 `TUYA_PWM_NUM_E` 寻址，从 `TUYA_PWM_NUM_0` 开始。

PWM 信号以高电平时间与周期之比（占空比）来编码一个模拟值。例如，在 10 ms 的周期内，7 ms 的高电平对应 70% 的占空比，4 ms 的高电平对应 40% 的占空比。调节占空比即可改变等效的模拟输出。

## tkl_pwm_init

```c
OPERATE_RET tkl_pwm_init(TUYA_PWM_NUM_E ch_id, const TUYA_PWM_BASE_CFG_T *cfg);
```

按给定的极性、占空比和频率初始化一个 PWM 通道。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `ch_id` | `TUYA_PWM_NUM_E` | PWM 通道索引，从 `TUYA_PWM_NUM_0` 开始。 |
| `cfg` | `const TUYA_PWM_BASE_CFG_T *` | 通道配置。 |

配置结构体如下：

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

`polarity` 选择有效电平：

| 取值 | 说明 |
| --- | --- |
| `TUYA_PWM_NEGATIVE` | 低电平输出 |
| `TUYA_PWM_POSITIVE` | 高电平输出 |

`count_mode` 选择计数模式：

| 取值 | 说明 |
| --- | --- |
| `TUYA_PWM_CNT_UP` | 向上计数（默认） |
| `TUYA_PWM_CNT_UP_AND_DOWN` | 上下计数，用于互补双工模式 |

`duty` 与 `cycle` 以 `duty / cycle` 确定占空比。`frequency` 为输出频率，单位 Hz。

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h`。

## tkl_pwm_deinit

```c
OPERATE_RET tkl_pwm_deinit(TUYA_PWM_NUM_E ch_id);
```

反初始化一个 PWM 通道。停止正在进行的输出并释放通道的软硬件资源。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `ch_id` | `TUYA_PWM_NUM_E` | PWM 通道索引。 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h`。

## tkl_pwm_start

```c
OPERATE_RET tkl_pwm_start(TUYA_PWM_NUM_E ch_id);
```

启动 PWM 通道的输出。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `ch_id` | `TUYA_PWM_NUM_E` | PWM 通道索引。 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h`。

## tkl_pwm_stop

```c
OPERATE_RET tkl_pwm_stop(TUYA_PWM_NUM_E ch_id);
```

停止 PWM 通道的输出。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `ch_id` | `TUYA_PWM_NUM_E` | PWM 通道索引。 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h`。

## tkl_pwm_multichannel_start

```c
OPERATE_RET tkl_pwm_multichannel_start(TUYA_PWM_NUM_E *ch_id, uint8_t num);
```

同时启动多个 PWM 通道以实现同步的组合输出，用于对时序要求严格的场景。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `ch_id` | `TUYA_PWM_NUM_E *` | 要启动的通道索引数组。 |
| `num` | `uint8_t` | 数组中的通道数量。 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h`。

## tkl_pwm_multichannel_stop

```c
OPERATE_RET tkl_pwm_multichannel_stop(TUYA_PWM_NUM_E *ch_id, uint8_t num);
```

同时停止多个 PWM 通道。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `ch_id` | `TUYA_PWM_NUM_E *` | 要停止的通道索引数组。 |
| `num` | `uint8_t` | 数组中的通道数量。 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h`。

## tkl_pwm_duty_set

```c
OPERATE_RET tkl_pwm_duty_set(TUYA_PWM_NUM_E ch_id, uint32_t duty);
```

设置通道的占空比。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `ch_id` | `TUYA_PWM_NUM_E` | PWM 通道索引。 |
| `duty` | `uint32_t` | 占空比，以 `duty / cycle` 使用。 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h`。

## tkl_pwm_frequency_set

```c
OPERATE_RET tkl_pwm_frequency_set(TUYA_PWM_NUM_E ch_id, uint32_t frequency);
```

设置通道的输出频率。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `ch_id` | `TUYA_PWM_NUM_E` | PWM 通道索引。 |
| `frequency` | `uint32_t` | 输出频率，单位 Hz。 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h`。

## tkl_pwm_polarity_set

```c
OPERATE_RET tkl_pwm_polarity_set(TUYA_PWM_NUM_E ch_id, TUYA_PWM_POLARITY_E polarity);
```

设置通道的输出极性。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `ch_id` | `TUYA_PWM_NUM_E` | PWM 通道索引。 |
| `polarity` | `TUYA_PWM_POLARITY_E` | `TUYA_PWM_NEGATIVE` 或 `TUYA_PWM_POSITIVE`。 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h`。

## tkl_pwm_info_set

```c
OPERATE_RET tkl_pwm_info_set(TUYA_PWM_NUM_E ch_id, const TUYA_PWM_BASE_CFG_T *info);
```

替换通道的完整配置，从而在运行时修改极性、占空比和频率并重启通道。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `ch_id` | `TUYA_PWM_NUM_E` | PWM 通道索引。 |
| `info` | `const TUYA_PWM_BASE_CFG_T *` | 新的通道配置（参见 `tkl_pwm_init`）。 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h`。

## tkl_pwm_info_get

```c
OPERATE_RET tkl_pwm_info_get(TUYA_PWM_NUM_E ch_id, TUYA_PWM_BASE_CFG_T *info);
```

读取通道的当前配置。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `ch_id` | `TUYA_PWM_NUM_E` | PWM 通道索引。 |
| `info` | `TUYA_PWM_BASE_CFG_T *` | 输出：通道配置。 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h`。

## tkl_pwm_cap_start

```c
OPERATE_RET tkl_pwm_cap_start(TUYA_PWM_NUM_E ch_id, const TUYA_PWM_CAP_IRQ_T *cfg);
```

在通道上启动 PWM 输入捕获模式，测量输入信号的脉冲时序。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `ch_id` | `TUYA_PWM_NUM_E` | PWM 通道索引。 |
| `cfg` | `const TUYA_PWM_CAP_IRQ_T *` | 捕获配置。 |

捕获配置结构体如下：

```c
typedef struct {
    TUYA_PWM_CAPTURE_MODE_E cap_mode;      // 捕获模式
    TUYA_PWM_POLARITY_E     trigger_level; // 触发边沿
    uint32_t                clk;           // 捕获信号的采样率
    TUYA_PWM_IRQ_CB         cb;            // 捕获回调
    void                   *arg;           // 传给回调的参数
} TUYA_PWM_CAP_IRQ_T;
```

`cap_mode` 选择捕获模式：

| 取值 | 说明 |
| --- | --- |
| `TUYA_PWM_CAPTURE_MODE_ONCE` | 单次触发 |
| `TUYA_PWM_CAPTURE_MODE_PERIOD` | 多次触发 |

`trigger_level` 选择触发边沿：

| 取值 | 说明 |
| --- | --- |
| `TUYA_PWM_NEGATIVE` | 下降沿 |
| `TUYA_PWM_POSITIVE` | 上升沿 |

`clk` 是捕获信号的采样时钟。`cb` 是捕获回调，`arg` 会传给它：

```c
typedef void (*TUYA_PWM_IRQ_CB)(TUYA_PWM_NUM_E port, TUYA_PWM_CAPTURE_DATA_T data, void *arg);

typedef struct {
    uint32_t            cap_value; // 捕获到的数据
    TUYA_PWM_POLARITY_E cap_edge;  // 捕获边沿：TUYA_PWM_NEGATIVE 为下降沿，TUYA_PWM_POSITIVE 为上升沿
} TUYA_PWM_CAPTURE_DATA_T;
```

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h`。

## tkl_pwm_cap_stop

```c
OPERATE_RET tkl_pwm_cap_stop(TUYA_PWM_NUM_E ch_id);
```

停止通道上的 PWM 输入捕获模式。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `ch_id` | `TUYA_PWM_NUM_E` | PWM 通道索引。 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h`。

## 示例

启动一个 50% 占空比的输出，在运行时调整占空比，然后停止并反初始化通道：

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
