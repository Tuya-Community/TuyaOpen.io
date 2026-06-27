---
title: "tkl_dac | DAC Driver"
---

The TKL DAC interface converts digital values into an analog output voltage — the inverse of an ADC. You initialize a DAC unit (`TUYA_DAC_NUM_E`), configure its channels and output width, then push sample data through the FIFO and start conversion. A common use is restoring an audio waveform that was previously captured by an ADC.

## tkl_dac_init

```c
OPERATE_RET tkl_dac_init(TUYA_DAC_NUM_E port_num);
```

Initializes a DAC unit.

| Parameter | Type | Description |
| --- | --- | --- |
| `port_num` | `TUYA_DAC_NUM_E` | DAC unit index (`TUYA_DAC_NUM_0` to `TUYA_DAC_NUM_6`). |

**Returns** `OPRT_OK` on success. For other values, see the definitions in `tuya_error_code.h`.

## tkl_dac_deinit

```c
OPERATE_RET tkl_dac_deinit(TUYA_DAC_NUM_E port_num);
```

Deinitializes a DAC unit and stops conversion.

| Parameter | Type | Description |
| --- | --- | --- |
| `port_num` | `TUYA_DAC_NUM_E` | DAC unit index. |

**Returns** `OPRT_OK` on success. For other values, see the definitions in `tuya_error_code.h`.

## tkl_dac_controller_config

```c
OPERATE_RET tkl_dac_controller_config(TUYA_DAC_NUM_E port_num, TUYA_DAC_CMD_E cmd, void *argu);
```

Configures a DAC unit by command. Use it to set the base configuration or to write data into the FIFO.

| Parameter | Type | Description |
| --- | --- | --- |
| `port_num` | `TUYA_DAC_NUM_E` | DAC unit index. |
| `cmd` | `TUYA_DAC_CMD_E` | Command word (see below). |
| `argu` | `void *` | Argument for the command. |

`cmd` selects the operation, and `argu` points to the matching structure:

| Command | Meaning | `argu` type |
| --- | --- | --- |
| `TUYA_DAC_WRITE_FIFO` | Write data into the DAC FIFO | `TUYA_DAC_DATA_T *` |
| `TUYA_DAC_SET_BASE_CFG` | Set the DAC base configuration | `TUYA_DAC_BASE_CFG_T *` |

```c
typedef struct {
    uint8_t *data; // data buffer
    uint32_t len;  // data length
} TUYA_DAC_DATA_T;

typedef struct {
    TUYA_AD_DA_CH_LIST_U ch_list; // channel list
    uint8_t              ch_nums; // channel number
    uint8_t              width;   // output width
    uint32_t             freq;    // conversion frequency
} TUYA_DAC_BASE_CFG_T;
```

**Returns** `OPRT_OK` on success. For other values, see the definitions in `tuya_error_code.h`.

## tkl_dac_base_cfg_get

```c
OPERATE_RET tkl_dac_base_cfg_get(TUYA_DAC_NUM_E port_num, TUYA_DAC_BASE_CFG_T *cfg);
```

Reads the base configuration of a DAC unit.

| Parameter | Type | Description |
| --- | --- | --- |
| `port_num` | `TUYA_DAC_NUM_E` | DAC unit index. |
| `cfg` | `TUYA_DAC_BASE_CFG_T *` | Output: the base configuration. |

The configuration structure is:

```c
typedef struct {
    TUYA_AD_DA_CH_LIST_U ch_list; // channel list
    uint8_t              ch_nums; // channel number
    uint8_t              width;   // output width
    uint32_t             freq;    // conversion frequency
} TUYA_DAC_BASE_CFG_T;
```

**Returns** `OPRT_OK` on success. For other values, see the definitions in `tuya_error_code.h`.

## tkl_dac_start

```c
OPERATE_RET tkl_dac_start(TUYA_DAC_NUM_E port_num);
```

Starts conversion on a DAC unit.

| Parameter | Type | Description |
| --- | --- | --- |
| `port_num` | `TUYA_DAC_NUM_E` | DAC unit index. |

**Returns** `OPRT_OK` on success. For other values, see the definitions in `tuya_error_code.h`.

## tkl_dac_stop

```c
OPERATE_RET tkl_dac_stop(TUYA_DAC_NUM_E port_num);
```

Stops conversion on a DAC unit.

| Parameter | Type | Description |
| --- | --- | --- |
| `port_num` | `TUYA_DAC_NUM_E` | DAC unit index. |

**Returns** `OPRT_OK` on success. For other values, see the definitions in `tuya_error_code.h`.

## tkl_dac_fifo_reset

```c
OPERATE_RET tkl_dac_fifo_reset(TUYA_DAC_NUM_E port_num);
```

Resets the FIFO of a DAC unit.

| Parameter | Type | Description |
| --- | --- | --- |
| `port_num` | `TUYA_DAC_NUM_E` | DAC unit index. |

**Returns** `OPRT_OK` on success. For other values, see the definitions in `tuya_error_code.h`.

## Example

Initialize a DAC unit, set its base configuration, then stream data through the FIFO:

```c
// Initialize DAC unit 0
tkl_dac_init(TUYA_DAC_NUM_0);

// Set the base configuration
TUYA_DAC_BASE_CFG_T dac_base_cfg;
dac_base_cfg.freq = 8000;          // 8000 conversions per second
dac_base_cfg.width = 16;           // 16-bit output
dac_base_cfg.ch_nums = 1;          // single channel
dac_base_cfg.ch_list.bits.ch_2 = 1;
tkl_dac_controller_config(TUYA_DAC_NUM_0, TUYA_DAC_SET_BASE_CFG, &dac_base_cfg);

// Write the initial data into the FIFO
TUYA_DAC_DATA_T data_fifo;
uint8_t dac_data[1024];
data_fifo.len = sizeof(dac_data);
data_fifo.data = dac_data;
tkl_dac_controller_config(TUYA_DAC_NUM_0, TUYA_DAC_WRITE_FIFO, &data_fifo);

// Start conversion
tkl_dac_start(TUYA_DAC_NUM_0);

// Keep feeding data into the FIFO
while (1) {
    data_fifo.len = sizeof(dac_data);
    data_fifo.data = dac_data;
    tkl_dac_controller_config(TUYA_DAC_NUM_0, TUYA_DAC_WRITE_FIFO, &data_fifo);
}

// Stop and deinitialize
tkl_dac_stop(TUYA_DAC_NUM_0);
tkl_dac_deinit(TUYA_DAC_NUM_0);
```
