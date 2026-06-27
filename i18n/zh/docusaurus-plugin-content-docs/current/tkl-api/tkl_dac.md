---
title: "tkl_dac | DAC 驱动"
---

TKL DAC 接口将数字值转换为模拟输出电压，作用与 ADC 相反。你初始化一个 DAC 单元（`TUYA_DAC_NUM_E`），配置其通道和输出位宽，然后通过 FIFO 推入采样数据并启动转换。常见用途是还原此前由 ADC 采集的音频波形。

## tkl_dac_init

```c
OPERATE_RET tkl_dac_init(TUYA_DAC_NUM_E port_num);
```

初始化一个 DAC 单元。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `port_num` | `TUYA_DAC_NUM_E` | DAC 单元索引（`TUYA_DAC_NUM_0` 至 `TUYA_DAC_NUM_6`）。 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h` 中的定义部分。

## tkl_dac_deinit

```c
OPERATE_RET tkl_dac_deinit(TUYA_DAC_NUM_E port_num);
```

反初始化一个 DAC 单元并停止转换。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `port_num` | `TUYA_DAC_NUM_E` | DAC 单元索引。 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h` 中的定义部分。

## tkl_dac_controller_config

```c
OPERATE_RET tkl_dac_controller_config(TUYA_DAC_NUM_E port_num, TUYA_DAC_CMD_E cmd, void *argu);
```

按命令配置 DAC 单元。可用于设置基础配置或向 FIFO 写入数据。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `port_num` | `TUYA_DAC_NUM_E` | DAC 单元索引。 |
| `cmd` | `TUYA_DAC_CMD_E` | 命令字（见下文）。 |
| `argu` | `void *` | 命令对应的参数。 |

`cmd` 选择操作，`argu` 指向对应的结构体：

| 命令 | 含义 | `argu` 类型 |
| --- | --- | --- |
| `TUYA_DAC_WRITE_FIFO` | 向 DAC FIFO 写入数据 | `TUYA_DAC_DATA_T *` |
| `TUYA_DAC_SET_BASE_CFG` | 设置 DAC 基础配置 | `TUYA_DAC_BASE_CFG_T *` |

```c
typedef struct {
    uint8_t *data; // 数据缓冲区
    uint32_t len;  // 数据长度
} TUYA_DAC_DATA_T;

typedef struct {
    TUYA_AD_DA_CH_LIST_U ch_list; // 通道列表
    uint8_t              ch_nums; // 通道数量
    uint8_t              width;   // 输出位宽
    uint32_t             freq;    // 转换频率
} TUYA_DAC_BASE_CFG_T;
```

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h` 中的定义部分。

## tkl_dac_base_cfg_get

```c
OPERATE_RET tkl_dac_base_cfg_get(TUYA_DAC_NUM_E port_num, TUYA_DAC_BASE_CFG_T *cfg);
```

读取 DAC 单元的基础配置。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `port_num` | `TUYA_DAC_NUM_E` | DAC 单元索引。 |
| `cfg` | `TUYA_DAC_BASE_CFG_T *` | 输出：基础配置。 |

配置结构体如下：

```c
typedef struct {
    TUYA_AD_DA_CH_LIST_U ch_list; // 通道列表
    uint8_t              ch_nums; // 通道数量
    uint8_t              width;   // 输出位宽
    uint32_t             freq;    // 转换频率
} TUYA_DAC_BASE_CFG_T;
```

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h` 中的定义部分。

## tkl_dac_start

```c
OPERATE_RET tkl_dac_start(TUYA_DAC_NUM_E port_num);
```

启动 DAC 单元的转换。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `port_num` | `TUYA_DAC_NUM_E` | DAC 单元索引。 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h` 中的定义部分。

## tkl_dac_stop

```c
OPERATE_RET tkl_dac_stop(TUYA_DAC_NUM_E port_num);
```

停止 DAC 单元的转换。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `port_num` | `TUYA_DAC_NUM_E` | DAC 单元索引。 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h` 中的定义部分。

## tkl_dac_fifo_reset

```c
OPERATE_RET tkl_dac_fifo_reset(TUYA_DAC_NUM_E port_num);
```

复位 DAC 单元的 FIFO。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `port_num` | `TUYA_DAC_NUM_E` | DAC 单元索引。 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h` 中的定义部分。

## 示例

初始化一个 DAC 单元，设置其基础配置，然后通过 FIFO 持续推送数据：

```c
// 初始化 DAC 单元 0
tkl_dac_init(TUYA_DAC_NUM_0);

// 设置基础配置
TUYA_DAC_BASE_CFG_T dac_base_cfg;
dac_base_cfg.freq = 8000;          // 每秒转换 8000 次
dac_base_cfg.width = 16;           // 16 位输出
dac_base_cfg.ch_nums = 1;          // 单通道
dac_base_cfg.ch_list.bits.ch_2 = 1;
tkl_dac_controller_config(TUYA_DAC_NUM_0, TUYA_DAC_SET_BASE_CFG, &dac_base_cfg);

// 向 FIFO 写入初始数据
TUYA_DAC_DATA_T data_fifo;
uint8_t dac_data[1024];
data_fifo.len = sizeof(dac_data);
data_fifo.data = dac_data;
tkl_dac_controller_config(TUYA_DAC_NUM_0, TUYA_DAC_WRITE_FIFO, &data_fifo);

// 启动转换
tkl_dac_start(TUYA_DAC_NUM_0);

// 持续向 FIFO 喂数据
while (1) {
    data_fifo.len = sizeof(dac_data);
    data_fifo.data = dac_data;
    tkl_dac_controller_config(TUYA_DAC_NUM_0, TUYA_DAC_WRITE_FIFO, &data_fifo);
}

// 停止并反初始化
tkl_dac_stop(TUYA_DAC_NUM_0);
tkl_dac_deinit(TUYA_DAC_NUM_0);
```
