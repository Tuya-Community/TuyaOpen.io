---
title: tkl_i2s | I2S Driver
---

## Overview

I2S (Inter-IC Sound) is a digital audio transmission standard defined by Philips in 1986 (revised in 1996). It carries digital audio data between components inside a system, such as codecs, DSPs, digital input/output interfaces, ADCs, DACs, and digital filters.

I2S is a simple interface with no addressing or device-selection mechanism. On an I2S bus there is one master and one transmitter at a time; the master may be the transmitter, the receiver, or a separate device that coordinates the two. The device that drives the clock lines (`SCK` and `WS`) is the master.

The bus uses three signals:

- `SCK`: Bit clock — one pulse per audio data bit. Its frequency is 2 × sample rate × sample bit depth.
- `WS`: Word select — selects the channel. Its frequency equals the sample rate; `1` selects the left channel and `0` selects the right channel.
- `SD`: Serial data — audio samples in two's complement.

This driver exposes six functions: initialize and deinitialize the port, send and receive data, and stop sending or receiving.

## tkl_i2s_init

```c
OPERATE_RET tkl_i2s_init(TUYA_I2S_NUM_E i2s_num, const TUYA_I2S_BASE_CFG_T *i2s_config);
```

Initializes an I2S port from the base configuration and returns the result.

Parameters:

- `i2s_num`: Port number (`TUYA_I2S_NUM_0`, `TUYA_I2S_NUM_1`, `TUYA_I2S_NUM_2`).
- `i2s_config`: Base configuration.

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

  `TUYA_I2S_MODE_E` values are bit flags, combined to select master/slave and transmit/receive:

  | Name                 | Value     | Description    |
  | :------------------- | :-------- | :------------- |
  | `TUYA_I2S_MODE_MASTER` | `0x1 << 0` | Master mode  |
  | `TUYA_I2S_MODE_SLAVE`  | `0x1 << 1` | Slave mode   |
  | `TUYA_I2S_MODE_TX`     | `0x1 << 2` | Transmit mode |
  | `TUYA_I2S_MODE_RX`     | `0x1 << 3` | Receive mode |

  Combine one role flag with one direction flag:

  - `TUYA_I2S_MODE_MASTER | TUYA_I2S_MODE_TX`
  - `TUYA_I2S_MODE_MASTER | TUYA_I2S_MODE_RX`
  - `TUYA_I2S_MODE_SLAVE | TUYA_I2S_MODE_TX`
  - `TUYA_I2S_MODE_SLAVE | TUYA_I2S_MODE_RX`

  `sample_rate` is the sample rate. `mclk` is the master clock, typically 256 or 384 times the sample rate.

  `TUYA_I2S_BITS_PER_SAMP_E`:

  | Name                             | Value | Description       |
  | :------------------------------- | :---- | :---------------- |
  | `TUYA_I2S_BITS_PER_SAMPLE_8BIT`  | 8     | 8-bit data width  |
  | `TUYA_I2S_BITS_PER_SAMPLE_16BIT` | 16    | 16-bit data width |
  | `TUYA_I2S_BITS_PER_SAMPLE_24BIT` | 24    | 24-bit data width |
  | `TUYA_I2S_BITS_PER_SAMPLE_32BIT` | 32    | 32-bit data width |

  `TUYA_I2S_CHANNEL_FMT_E`:

  | Name                              | Description                              | Remarks   |
  | :-------------------------------- | :--------------------------------------- | :-------- |
  | `TUYA_I2S_CHANNEL_FMT_RIGHT_LEFT` | Separate left and right channels         |           |
  | `TUYA_I2S_CHANNEL_FMT_ALL_RIGHT`  | Load right channel data into both channels |         |
  | `TUYA_I2S_CHANNEL_FMT_ALL_LEFT`   | Load left channel data into both channels |          |
  | `TUYA_I2S_CHANNEL_FMT_ONLY_RIGHT` | Load only right channel data             | Mono mode |
  | `TUYA_I2S_CHANNEL_FMT_ONLY_LEFT`  | Load only left channel data              | Mono mode |

  `TUYA_I2S_COMM_FORMAT_E`:

  | Name                              | Value  | Description                                                                 |
  | :-------------------------------- | :----- | :-------------------------------------------------------------------------- |
  | `I2S_COMM_FORMAT_STAND_I2S`       | `0x01` | Philips standard; data launches on the second BCK                           |
  | `I2S_COMM_FORMAT_STAND_MSB`       | `0x02` | MSB (left-aligned) standard; data launches on the first BCK                 |
  | `I2S_COMM_FORMAT_STAND_PCM_SHORT` | `0x04` | PCM short standard (DSP mode); the WS period is 1 BCK cycle                  |
  | `I2S_COMM_FORMAT_STAND_PCM_LONG`  | `0x0C` | PCM long standard; the WS period is channel_bit × BCK cycles                |

Returns:

- `OPRT_OK` on success. For other values, see `tuya_error_code.h`.

## tkl_i2s_send

```c
OPERATE_RET tkl_i2s_send(TUYA_I2S_NUM_E i2s_num, void *buff, uint32_t len);
```

Sends data over I2S.

Parameters:

- `i2s_num`: Port number.
- `buff`: Pointer to the data to send.
- `len`: Length of the data to send.

Returns:

- `OPRT_OK` on success. For other values, see the `OS_ADAPTER_I2S` section of `tuya_error_code.h`.

## tkl_i2s_recv

```c
int tkl_i2s_recv(TUYA_I2S_NUM_E i2s_num, void *buff, uint32_t len);
```

Receives data over I2S asynchronously.

Parameters:

- `i2s_num`: Port number.
- `buff`: Pointer to the buffer that receives the data.
- `len`: Length of the data to receive.

Returns:

- The number of bytes read (`>= 0`), or a value less than `0` on error.

## tkl_i2s_send_stop

```c
OPERATE_RET tkl_i2s_send_stop(TUYA_I2S_NUM_E i2s_num);
```

Stops sending data over I2S.

Parameters:

- `i2s_num`: Port number.

Returns:

- `OPRT_OK` on success. For other values, see the `OS_ADAPTER_I2S` section of `tuya_error_code.h`.

## tkl_i2s_recv_stop

```c
OPERATE_RET tkl_i2s_recv_stop(TUYA_I2S_NUM_E i2s_num);
```

Stops receiving data over I2S.

Parameters:

- `i2s_num`: Port number.

Returns:

- `OPRT_OK` on success. For other values, see the `OS_ADAPTER_I2S` section of `tuya_error_code.h`.

## tkl_i2s_deinit

```c
OPERATE_RET tkl_i2s_deinit(TUYA_I2S_NUM_E i2s_num);
```

Deinitializes an I2S port.

Parameters:

- `i2s_num`: Port number.

Returns:

- `OPRT_OK` on success. For other values, see the `OS_ADAPTER_I2S` section of `tuya_error_code.h`.
