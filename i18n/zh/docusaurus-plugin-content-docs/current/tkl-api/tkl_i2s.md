---
title: tkl_i2s | I2S 驱动
description: "tkl_i2s 参考 —— 用于初始化 I2S 端口并按位时钟与声道选择收发数字音频数据的 I2S 音频驱动 TKL API。"
keywords:
  - tkl_i2s
  - TuyaOpen I2S 驱动
  - 数字音频
  - 嵌入式驱动
---

## 概述

I2S（Inter-IC Sound，集成芯片间音频）是飞利浦在 1986 年定义（1996 年修订）的数字音频传输标准，用于在系统内部器件之间传输数字音频数据，例如编解码器 CODEC、DSP、数字输入/输出接口、ADC、DAC 和数字滤波器等。

I2S 是较为简单的接口协议，没有地址或设备选择机制。在 I2S 总线上，同一时刻只存在一个主设备和一个发送设备；主设备可以是发送设备、接收设备，或协调两者的其他控制设备。驱动时钟线（`SCK` 和 `WS`）的设备为主设备。

总线使用三个信号：

- `SCK`：位时钟，每一位音频数据对应一个脉冲，频率 = 2 × 采样率 × 采样位数。
- `WS`：声道选择，用于切换左右声道，频率 = 采样率；`1` 表示左声道，`0` 表示右声道。
- `SD`：串行数据，用二进制补码表示的音频数据。

本驱动提供六个函数：初始化与反初始化端口、发送与接收数据，以及停止发送或接收。

## tkl_i2s_init

```c
OPERATE_RET tkl_i2s_init(TUYA_I2S_NUM_E i2s_num, const TUYA_I2S_BASE_CFG_T *i2s_config);
```

根据基础配置初始化 I2S 端口并返回结果。

参数：

- `i2s_num`：端口号（`TUYA_I2S_NUM_0`、`TUYA_I2S_NUM_1`、`TUYA_I2S_NUM_2`）。
- `i2s_config`：基础配置。

  ```c
  typedef struct {
      TUYA_I2S_MODE_E             mode;                   /*!< I2S work mode */
      uint32_t                    sample_rate;            /*!< I2S sample rate */
      uint32_t                    mclk;                   /*!< I2S mclk */
      TUYA_I2S_BITS_PER_SAMP_E    bits_per_sample;        /*!< I2S sample bits in one channel */
      TUYA_I2S_CHANNEL_FMT_E      channel_format;         /*!< I2S channel format */
      TUYA_I2S_COMM_FORMAT_E      communication_format;   /*!< I2S communication format */
      uint32_t                    i2s_dma_flags;          /*!< I2S DMA flag, 1 to use DMA */
  } TUYA_I2S_BASE_CFG_T;
  ```

  `TUYA_I2S_MODE_E` 的取值为位标志，组合后用于选择主/从和发送/接收：

  | 名称                   | 取值       | 说明     |
  | :--------------------- | :--------- | :------- |
  | `TUYA_I2S_MODE_MASTER` | `0x1 << 0` | 主机模式 |
  | `TUYA_I2S_MODE_SLAVE`  | `0x1 << 1` | 从机模式 |
  | `TUYA_I2S_MODE_TX`     | `0x1 << 2` | 发送模式 |
  | `TUYA_I2S_MODE_RX`     | `0x1 << 3` | 接收模式 |

  将一个角色标志与一个方向标志组合使用：

  - `TUYA_I2S_MODE_MASTER | TUYA_I2S_MODE_TX`
  - `TUYA_I2S_MODE_MASTER | TUYA_I2S_MODE_RX`
  - `TUYA_I2S_MODE_SLAVE | TUYA_I2S_MODE_TX`
  - `TUYA_I2S_MODE_SLAVE | TUYA_I2S_MODE_RX`

  `sample_rate` 为采样率。`mclk` 为主时钟，一般是采样率的 256 或 384 倍。

  `TUYA_I2S_BITS_PER_SAMP_E`：

  | 名称                             | 取值 | 说明      |
  | :------------------------------- | :--- | :-------- |
  | `TUYA_I2S_BITS_PER_SAMPLE_8BIT`  | 8    | 数据位宽 8  |
  | `TUYA_I2S_BITS_PER_SAMPLE_16BIT` | 16   | 数据位宽 16 |
  | `TUYA_I2S_BITS_PER_SAMPLE_24BIT` | 24   | 数据位宽 24 |
  | `TUYA_I2S_BITS_PER_SAMPLE_32BIT` | 32   | 数据位宽 32 |

  `TUYA_I2S_CHANNEL_FMT_E`：

  | 名称                              | 说明                     | 备注       |
  | :-------------------------------- | :----------------------- | :--------- |
  | `TUYA_I2S_CHANNEL_FMT_RIGHT_LEFT` | 左右声道分开             |            |
  | `TUYA_I2S_CHANNEL_FMT_ALL_RIGHT`  | 将右声道数据加载到两个声道 |          |
  | `TUYA_I2S_CHANNEL_FMT_ALL_LEFT`   | 将左声道数据加载到两个声道 |          |
  | `TUYA_I2S_CHANNEL_FMT_ONLY_RIGHT` | 仅加载右声道数据         | 单声道模式 |
  | `TUYA_I2S_CHANNEL_FMT_ONLY_LEFT`  | 仅加载左声道数据         | 单声道模式 |

  `TUYA_I2S_COMM_FORMAT_E`：

  | 名称                              | 取值   | 说明                                                  |
  | :-------------------------------- | :----- | :---------------------------------------------------- |
  | `I2S_COMM_FORMAT_STAND_I2S`       | `0x01` | Philips 标准，数据在第二个 BCK 传输                   |
  | `I2S_COMM_FORMAT_STAND_MSB`       | `0x02` | MSB（左对齐）标准，数据在第一个 BCK 传输              |
  | `I2S_COMM_FORMAT_STAND_PCM_SHORT` | `0x04` | PCM 短标准（DSP 模式），同步信号（WS）周期为 1 个 BCK 周期 |
  | `I2S_COMM_FORMAT_STAND_PCM_LONG`  | `0x0C` | PCM 长标准，同步信号（WS）周期为 channel_bit × BCK 周期 |

返回值：

- 成功返回 `OPRT_OK`，其他值请参考 `tuya_error_code.h`。

## tkl_i2s_send

```c
OPERATE_RET tkl_i2s_send(TUYA_I2S_NUM_E i2s_num, void *buff, uint32_t len);
```

通过 I2S 发送数据。

参数：

- `i2s_num`：端口号。
- `buff`：指向要发送数据的指针。
- `len`：要发送数据的长度。

返回值：

- 成功返回 `OPRT_OK`，其他值请参考 `tuya_error_code.h` 的 `OS_ADAPTER_I2S` 部分。

## tkl_i2s_recv

```c
int tkl_i2s_recv(TUYA_I2S_NUM_E i2s_num, void *buff, uint32_t len);
```

通过 I2S 异步接收数据。

参数：

- `i2s_num`：端口号。
- `buff`：指向接收数据缓冲区的指针。
- `len`：要接收数据的长度。

返回值：

- 返回读取的字节数（`>= 0`），出错时返回小于 `0` 的值。

## tkl_i2s_send_stop

```c
OPERATE_RET tkl_i2s_send_stop(TUYA_I2S_NUM_E i2s_num);
```

停止通过 I2S 发送数据。

参数：

- `i2s_num`：端口号。

返回值：

- 成功返回 `OPRT_OK`，其他值请参考 `tuya_error_code.h` 的 `OS_ADAPTER_I2S` 部分。

## tkl_i2s_recv_stop

```c
OPERATE_RET tkl_i2s_recv_stop(TUYA_I2S_NUM_E i2s_num);
```

停止通过 I2S 接收数据。

参数：

- `i2s_num`：端口号。

返回值：

- 成功返回 `OPRT_OK`，其他值请参考 `tuya_error_code.h` 的 `OS_ADAPTER_I2S` 部分。

## tkl_i2s_deinit

```c
OPERATE_RET tkl_i2s_deinit(TUYA_I2S_NUM_E i2s_num);
```

反初始化 I2S 端口。

参数：

- `i2s_num`：端口号。

返回值：

- 成功返回 `OPRT_OK`，其他值请参考 `tuya_error_code.h` 的 `OS_ADAPTER_I2S` 部分。
