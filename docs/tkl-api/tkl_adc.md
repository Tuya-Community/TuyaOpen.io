---
title: "tkl_adc | ADC Driver"
---

The TKL ADC interface reads analog voltages by sampling them with an analog-to-digital converter. You configure an ADC unit (`TUYA_ADC_NUM_E`) with a channel list, resolution, and sampling mode, then read raw counts, convert them to millivolts, or query the chip temperature. Each ADC unit usually exposes several channels selected through a bitmask.

An ADC turns a continuous analog signal into discrete digital samples through sampling, holding, quantization, and encoding. Key properties are resolution (bit width, such as 8, 10, 12, or 16 bits), accuracy, conversion time, and the reference voltage that sets the measurable range.

## tkl_adc_init

```c
OPERATE_RET tkl_adc_init(TUYA_ADC_NUM_E port_num, TUYA_ADC_BASE_CFG_T *cfg);
```

Initializes an ADC unit with the given channel list, resolution, and sampling mode.

| Parameter | Type | Description |
| --- | --- | --- |
| `port_num` | `TUYA_ADC_NUM_E` | ADC unit index (`TUYA_ADC_NUM_0` to `TUYA_ADC_NUM_6`). Each unit is one physical ADC, usually with multiple channels. |
| `cfg` | `TUYA_ADC_BASE_CFG_T *` | ADC configuration. |

The configuration structure is:

```c
typedef struct {
    TUYA_AD_DA_CH_LIST_U ch_list;  // channel list
    uint8_t              ch_nums;  // number of channels to convert
    uint8_t              width;    // sampling resolution (bit width)
    uint32_t             freq;     // sampling frequency
    TUYA_ADC_TYPE_E      type;     // sampling type
    TUYA_ADC_MODE_E      mode;     // sampling mode
    uint16_t             conv_cnt; // number of samples
    uint32_t             ref_vol;  // reference voltage in mV (ignored if not supported)
} TUYA_ADC_BASE_CFG_T;
```

`ch_list` selects the channels to convert. You can set individual bits or assign the whole word through `data`:

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

`ch_nums` is the number of channels in `ch_list` to convert. `type` selects the sampling source:

| Value | Description |
| --- | --- |
| `TUYA_ADC_INNER_SAMPLE_VOL` | Sample an internal voltage, such as the supply voltage |
| `TUYA_ADC_EXTERNAL_SAMPLE_VOL` | Sample an external voltage, such as a pin voltage |

`mode` selects the conversion mode:

| Value | Description |
| --- | --- |
| `TUYA_ADC_SINGLE` | Single conversion — one channel at a time |
| `TUYA_ADC_CONTINUOUS` | Continuous conversion — one channel a set number of times |
| `TUYA_ADC_SCAN` | Scan mode — a group of channels in one pass |

`conv_cnt` sets how many samples the mode takes.

**Returns** `OPRT_OK` on success. For other values, see the `OS_ADAPTER_ADC` section of `tuya_error_code.h`.

## tkl_adc_deinit

```c
OPERATE_RET tkl_adc_deinit(TUYA_ADC_NUM_E port_num);
```

Deinitializes an ADC unit and releases its resources.

| Parameter | Type | Description |
| --- | --- | --- |
| `port_num` | `TUYA_ADC_NUM_E` | ADC unit index. |

**Returns** `OPRT_OK` on success. For other values, see the `OS_ADAPTER_ADC` section of `tuya_error_code.h`.

## tkl_adc_width_get

```c
uint8_t tkl_adc_width_get(TUYA_ADC_NUM_E port_num);
```

Reads the resolution (bit width) of an ADC unit.

| Parameter | Type | Description |
| --- | --- | --- |
| `port_num` | `TUYA_ADC_NUM_E` | ADC unit index. |

**Returns** the ADC resolution in bits.

## tkl_adc_ref_voltage_get

```c
uint32_t tkl_adc_ref_voltage_get(TUYA_ADC_NUM_E port_num);
```

Reads the reference voltage of an ADC unit.

| Parameter | Type | Description |
| --- | --- | --- |
| `port_num` | `TUYA_ADC_NUM_E` | ADC unit index. |

**Returns** the reference voltage in mV.

## tkl_adc_temperature_get

```c
int32_t tkl_adc_temperature_get(void);
```

Reads the chip temperature.

**Returns** the temperature in degrees Celsius.

## tkl_adc_read_data

```c
OPERATE_RET tkl_adc_read_data(TUYA_ADC_NUM_E port_num, int32_t *buff, uint16_t len);
```

Reads raw conversion data from the ADC register into a buffer.

| Parameter | Type | Description |
| --- | --- | --- |
| `port_num` | `TUYA_ADC_NUM_E` | ADC unit index. |
| `buff` | `int32_t *` | Output: buffer for the read data. |
| `len` | `uint16_t` | Buffer length. |

**Returns** `OPRT_OK` on success. For other values, see the `OS_ADAPTER_ADC` section of `tuya_error_code.h`.

## tkl_adc_read_single_channel

```c
OPERATE_RET tkl_adc_read_single_channel(TUYA_ADC_NUM_E port_num, uint8_t ch_id, int32_t *data);
```

Reads the conversion result of a single channel.

| Parameter | Type | Description |
| --- | --- | --- |
| `port_num` | `TUYA_ADC_NUM_E` | ADC unit index. |
| `ch_id` | `uint8_t` | Channel index within the ADC unit. |
| `data` | `int32_t *` | Output: the conversion result. |

**Returns** `OPRT_OK` on success. For other values, see the `OS_ADAPTER_ADC` section of `tuya_error_code.h`.

## tkl_adc_read_voltage

```c
OPERATE_RET tkl_adc_read_voltage(TUYA_ADC_NUM_E port_num, int32_t *buff, uint16_t len);
```

Reads conversion data and returns it as calculated voltages.

| Parameter | Type | Description |
| --- | --- | --- |
| `port_num` | `TUYA_ADC_NUM_E` | ADC unit index. |
| `buff` | `int32_t *` | Output: buffer for voltages, in mV. |
| `len` | `uint16_t` | Buffer length. |

**Returns** `OPRT_OK` on success. For other values, see the `OS_ADAPTER_ADC` section of `tuya_error_code.h`.

## Examples

Read a single channel:

```c
void tuya_adc_single_channel_test(void)
{
    OPERATE_RET ret;
    TUYA_ADC_BASE_CFG_T adc_cfg;
    int32_t adc_value = 0;
    uint8_t channel = 0;

    adc_cfg.ch_list.data = 1; // or adc_cfg.ch_list.bits.ch_0 = 1;
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

    // use adc_value

    tkl_adc_deinit(TUYA_ADC_NUM_0);
}
```

Scan multiple channels in one pass:

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

    // use adc_value[0..ADC_CHANNEL_NUM-1]

    tkl_adc_deinit(TUYA_ADC_NUM_0);
}
```

## See also

- [ADC Peripheral Guide](../peripheral/tutorials/adc-guide)
