---
title: "tkl_adc | ADC 驱动"
description: "tkl_adc 参考 —— 用于配置 ADC 单元通道、分辨率与采样模式并读取原始计数值或毫伏电压的 ADC 驱动 TKL API。"
keywords:
  - tkl_adc
  - TuyaOpen ADC 驱动
  - 模数转换
  - 嵌入式驱动
---

TKL ADC 接口通过模数转换器对模拟电压进行采样以完成读取。你为一个 ADC 单元（`TUYA_ADC_NUM_E`）配置通道列表、分辨率和采样模式，然后读取原始计数值、将其转换为毫伏，或查询芯片温度。每个 ADC 单元通常通过位掩码暴露多个通道。

ADC 经过采样、保持、量化和编码，将连续的模拟信号转换为离散的数字采样。其关键指标包括分辨率（位宽，如 8、10、12、16 位）、精度、转换时间，以及决定可测范围的参考电压。

## tkl_adc_init

```c
OPERATE_RET tkl_adc_init(TUYA_ADC_NUM_E port_num, TUYA_ADC_BASE_CFG_T *cfg);
```

按给定的通道列表、分辨率和采样模式初始化一个 ADC 单元。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `port_num` | `TUYA_ADC_NUM_E` | ADC 单元索引（`TUYA_ADC_NUM_0` 至 `TUYA_ADC_NUM_6`）。每个单元为一个物理 ADC，通常带多个通道。 |
| `cfg` | `TUYA_ADC_BASE_CFG_T *` | ADC 配置。 |

配置结构体如下：

```c
typedef struct {
    TUYA_AD_DA_CH_LIST_U ch_list;  // 通道列表
    uint8_t              ch_nums;  // 要转换的通道数量
    uint8_t              width;    // 采样分辨率（位宽）
    uint32_t             freq;     // 采样频率
    TUYA_ADC_TYPE_E      type;     // 采样类型
    TUYA_ADC_MODE_E      mode;     // 采样模式
    uint16_t             conv_cnt; // 采样次数
    uint32_t             ref_vol;  // 参考电压，单位 mV（不支持则忽略）
} TUYA_ADC_BASE_CFG_T;
```

`ch_list` 选择要转换的通道。你可以按位设置，也可以通过 `data` 整字赋值：

```c
typedef union {
    TUYA_AD_DA_CH_LIST_BIT_T bits;
    uint32_t                 data;
} TUYA_AD_DA_CH_LIST_U;

typedef struct {
    uint32_t ch_0  : 1;
    uint32_t ch_1  : 1;
    uint32_t ch_2  : 1;
    uint32_t ch_3  : 1;
    uint32_t ch_4  : 1;
    uint32_t ch_5  : 1;
    uint32_t ch_6  : 1;
    uint32_t ch_7  : 1;
    uint32_t ch_8  : 1;
    uint32_t ch_9  : 1;
    uint32_t ch_10 : 1;
    uint32_t ch_11 : 1;
    uint32_t ch_12 : 1;
    uint32_t ch_13 : 1;
    uint32_t ch_14 : 1;
    uint32_t ch_15 : 1;
    uint32_t rsv   : 16;
} TUYA_AD_DA_CH_LIST_BIT_T;
```

`ch_nums` 是 `ch_list` 中要转换的通道数量。`type` 选择采样源：

| 取值 | 说明 |
| --- | --- |
| `TUYA_ADC_INNER_SAMPLE_VOL` | 采样内部电压，如供电电压 |
| `TUYA_ADC_EXTERNAL_SAMPLE_VOL` | 采样外部电压，如引脚电压 |

`mode` 选择转换模式：

| 取值 | 说明 |
| --- | --- |
| `TUYA_ADC_SINGLE` | 单次转换 —— 每次转换一个通道 |
| `TUYA_ADC_CONTINUOUS` | 连续转换 —— 对一个通道转换设定的次数 |
| `TUYA_ADC_SCAN` | 扫描模式 —— 一次转换一组通道 |

`conv_cnt` 设置该模式下的采样次数。

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h` 中 `OS_ADAPTER_ADC` 定义部分。

## tkl_adc_deinit

```c
OPERATE_RET tkl_adc_deinit(TUYA_ADC_NUM_E port_num);
```

反初始化一个 ADC 单元并释放其资源。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `port_num` | `TUYA_ADC_NUM_E` | ADC 单元索引。 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h` 中 `OS_ADAPTER_ADC` 定义部分。

## tkl_adc_width_get

```c
uint8_t tkl_adc_width_get(TUYA_ADC_NUM_E port_num);
```

读取 ADC 单元的分辨率（位宽）。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `port_num` | `TUYA_ADC_NUM_E` | ADC 单元索引。 |

**返回值**：ADC 分辨率，单位为位。

## tkl_adc_ref_voltage_get

```c
uint32_t tkl_adc_ref_voltage_get(TUYA_ADC_NUM_E port_num);
```

读取 ADC 单元的参考电压。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `port_num` | `TUYA_ADC_NUM_E` | ADC 单元索引。 |

**返回值**：参考电压，单位 mV。

## tkl_adc_temperature_get

```c
int32_t tkl_adc_temperature_get(void);
```

读取芯片温度。

**返回值**：温度，单位为摄氏度。

## tkl_adc_read_data

```c
OPERATE_RET tkl_adc_read_data(TUYA_ADC_NUM_E port_num, int32_t *buff, uint16_t len);
```

从 ADC 寄存器读取原始转换数据到缓冲区。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `port_num` | `TUYA_ADC_NUM_E` | ADC 单元索引。 |
| `buff` | `int32_t *` | 输出：存放读取数据的缓冲区。 |
| `len` | `uint16_t` | 缓冲区长度。 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h` 中 `OS_ADAPTER_ADC` 定义部分。

## tkl_adc_read_single_channel

```c
OPERATE_RET tkl_adc_read_single_channel(TUYA_ADC_NUM_E port_num, uint8_t ch_id, int32_t *data);
```

读取单个通道的转换结果。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `port_num` | `TUYA_ADC_NUM_E` | ADC 单元索引。 |
| `ch_id` | `uint8_t` | ADC 单元内的通道索引。 |
| `data` | `int32_t *` | 输出：转换结果。 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h` 中 `OS_ADAPTER_ADC` 定义部分。

## tkl_adc_read_voltage

```c
OPERATE_RET tkl_adc_read_voltage(TUYA_ADC_NUM_E port_num, int32_t *buff, uint16_t len);
```

读取转换数据并以计算后的电压返回。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `port_num` | `TUYA_ADC_NUM_E` | ADC 单元索引。 |
| `buff` | `int32_t *` | 输出：存放电压的缓冲区，单位 mV。 |
| `len` | `uint16_t` | 缓冲区长度。 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h` 中 `OS_ADAPTER_ADC` 定义部分。

## 示例

读取单个通道：

```c
void tuya_adc_single_channel_test(void)
{
    OPERATE_RET ret;
    TUYA_ADC_BASE_CFG_T adc_cfg;
    int32_t adc_value = 0;
    uint8_t channel = 0;

    adc_cfg.ch_list.data = 1; // 或 adc_cfg.ch_list.bits.ch_0 = 1;
    adc_cfg.ch_nums = 1;
    adc_cfg.type = TUYA_ADC_INNER_SAMPLE_VOL;
    adc_cfg.mode = TUYA_ADC_SINGLE;
    adc_cfg.width = 10;
    adc_cfg.conv_cnt = 1;

    ret = tkl_adc_init(TUYA_ADC_NUM_0, &adc_cfg);
    if (ret != OPRT_OK) {
        return;
    }

    ret = tkl_adc_read_single_channel(TUYA_ADC_NUM_0, channel, &adc_value);
    if (ret != OPRT_OK) {
        return;
    }

    // 使用 adc_value

    tkl_adc_deinit(TUYA_ADC_NUM_0);
}
```

扫描模式一次读取多个通道：

```c
#define ADC_CHANNEL_NUM 3

void tuya_adc_multi_channel_test(void)
{
    OPERATE_RET ret;
    TUYA_ADC_BASE_CFG_T adc_cfg;
    int32_t adc_value[ADC_CHANNEL_NUM] = {0};

    adc_cfg.ch_list.bits.ch_0 = 1;
    adc_cfg.ch_list.bits.ch_1 = 1;
    adc_cfg.ch_list.bits.ch_2 = 1;
    adc_cfg.ch_nums = ADC_CHANNEL_NUM;
    adc_cfg.type = TUYA_ADC_INNER_SAMPLE_VOL;
    adc_cfg.mode = TUYA_ADC_SCAN;
    adc_cfg.width = 10;
    adc_cfg.conv_cnt = 1;

    ret = tkl_adc_init(TUYA_ADC_NUM_0, &adc_cfg);
    if (ret != OPRT_OK) {
        return;
    }

    ret = tkl_adc_read_data(TUYA_ADC_NUM_0, adc_value, ADC_CHANNEL_NUM);
    if (ret != OPRT_OK) {
        return;
    }

    // 使用 adc_value[0..ADC_CHANNEL_NUM-1]

    tkl_adc_deinit(TUYA_ADC_NUM_0);
}
```

## 相关文档

- [ADC 外设指南](../peripheral/tutorials/adc-guide)
