---
title: "tkl_spi | SPI Driver"
---

The TKL SPI interface drives the SPI bus in master or slave mode for displays, flash, sensors, and other high-speed peripherals. You initialize a bus (`TUYA_SPI_NUM_E`) with a role, clock mode, data width, and bit order, then send, receive, or full-duplex transfer data, optionally with interrupt-driven event callbacks.

SPI is a high-speed, full-duplex, synchronous bus with one master and one or more slaves over four lines: MISO (slave output), MOSI (master output), SCK (clock from the master), and CS (slave select). The clock mode combines clock polarity (CPOL) and clock phase (CPHA):

| Mode | CPOL / CPHA | Idle clock | Sampling edge |
| --- | --- | --- | --- |
| `TUYA_SPI_MODE0` | 0 / 0 | Low | Rising |
| `TUYA_SPI_MODE1` | 0 / 1 | Low | Falling |
| `TUYA_SPI_MODE2` | 1 / 0 | High | Falling |
| `TUYA_SPI_MODE3` | 1 / 1 | High | Rising |

The master and the peripheral must use the same clock mode.

## tkl_spi_init

```c
OPERATE_RET tkl_spi_init(TUYA_SPI_NUM_E port, const TUYA_SPI_BASE_CFG_T *cfg);
```

Initializes an SPI bus with the given role, clock mode, data width, and bit order.

| Parameter | Type | Description |
| --- | --- | --- |
| `port` | `TUYA_SPI_NUM_E` | SPI bus index, starting at `TUYA_SPI_NUM_0`. |
| `cfg` | `const TUYA_SPI_BASE_CFG_T *` | Bus configuration. |

The configuration structure is:

```c
typedef struct {
    TUYA_SPI_ROLE_E      role;
    TUYA_SPI_MODE_E      mode;
    TUYA_SPI_TYPE_E      type;
    TUYA_SPI_DATABITS_E  databits;
    TUYA_SPI_BIT_ORDER_E bitorder;
    uint32_t             freq_hz;
    uint32_t             spi_dma_flags; // 1 = use DMA
} TUYA_SPI_BASE_CFG_T;
```

`role` selects the bus role:

| Value | Description |
| --- | --- |
| `TUYA_SPI_ROLE_INACTIVE` | Inactive |
| `TUYA_SPI_ROLE_MASTER` | Full-duplex master |
| `TUYA_SPI_ROLE_SLAVE` | Full-duplex slave |
| `TUYA_SPI_ROLE_MASTER_SIMPLEX` | Half-duplex master |
| `TUYA_SPI_ROLE_SLAVE_SIMPLEX` | Half-duplex slave |

`mode` selects one of the four clock modes (`TUYA_SPI_MODE0` to `TUYA_SPI_MODE3`) described above. `type` selects the chip-select handling:

| Value | Description |
| --- | --- |
| `TUYA_SPI_AUTO_TYPE` | Hardware-managed SS (CS) pin |
| `TUYA_SPI_SOFT_TYPE` | Software-managed SS pin |
| `TUYA_SPI_SOFT_ONE_WIRE_TYPE` | Three-wire mode, MISO/MOSI multiplexed |

`databits` selects the data width:

| Value | Description |
| --- | --- |
| `TUYA_SPI_DATA_BIT8` | 8-bit data |
| `TUYA_SPI_DATA_BIT16` | 16-bit data |

`bitorder` selects the bit order:

| Value | Description |
| --- | --- |
| `TUYA_SPI_ORDER_MSB2LSB` | MSB first |
| `TUYA_SPI_ORDER_LSB2MSB` | LSB first |

**Returns** `OPRT_OK` on success. For other values, see the `OS_ADAPTER_SPI` section of `tuya_error_code.h`.

## tkl_spi_deinit

```c
OPERATE_RET tkl_spi_deinit(TUYA_SPI_NUM_E port);
```

Deinitializes an SPI bus, stopping it and releasing its software and hardware resources.

| Parameter | Type | Description |
| --- | --- | --- |
| `port` | `TUYA_SPI_NUM_E` | SPI bus index. |

**Returns** `OPRT_OK` on success. For other values, see the `OS_ADAPTER_SPI` section of `tuya_error_code.h`.

## tkl_spi_send

```c
OPERATE_RET tkl_spi_send(TUYA_SPI_NUM_E port, void *data, uint32_t size);
```

Sends data on the SPI bus.

| Parameter | Type | Description |
| --- | --- | --- |
| `port` | `TUYA_SPI_NUM_E` | SPI bus index. |
| `data` | `void *` | Data to send. |
| `size` | `uint32_t` | Number of bytes to send. |

**Returns** `OPRT_OK` on success. For other values, see the `OS_ADAPTER_SPI` section of `tuya_error_code.h`.

## tkl_spi_recv

```c
OPERATE_RET tkl_spi_recv(TUYA_SPI_NUM_E port, void *data, uint32_t size);
```

Receives data on the SPI bus.

| Parameter | Type | Description |
| --- | --- | --- |
| `port` | `TUYA_SPI_NUM_E` | SPI bus index. |
| `data` | `void *` | Output: buffer for received data. |
| `size` | `uint32_t` | Number of bytes to receive. |

**Returns** `OPRT_OK` on success. For other values, see the `OS_ADAPTER_SPI` section of `tuya_error_code.h`.

## tkl_spi_transfer

```c
OPERATE_RET tkl_spi_transfer(TUYA_SPI_NUM_E port, void *send_buf, void *receive_buf, uint32_t length);
```

Performs a full-duplex transfer, sending and receiving the same number of bytes at once.

| Parameter | Type | Description |
| --- | --- | --- |
| `port` | `TUYA_SPI_NUM_E` | SPI bus index. |
| `send_buf` | `void *` | Data to send. |
| `receive_buf` | `void *` | Output: buffer for received data. |
| `length` | `uint32_t` | Number of bytes to transfer. |

**Returns** `OPRT_OK` on success. For other values, see the `OS_ADAPTER_SPI` section of `tuya_error_code.h`.

## tkl_spi_transfer_with_length

```c
OPERATE_RET tkl_spi_transfer_with_length(TUYA_SPI_NUM_E port, void *send_buf, uint32_t send_len, void *receive_buf, uint32_t receive_len);
```

Performs a transfer with independent send and receive lengths.

| Parameter | Type | Description |
| --- | --- | --- |
| `port` | `TUYA_SPI_NUM_E` | SPI bus index. |
| `send_buf` | `void *` | Data to send. |
| `send_len` | `uint32_t` | Number of bytes to send. |
| `receive_buf` | `void *` | Output: buffer for received data. |
| `receive_len` | `uint32_t` | Number of bytes to receive. |

**Returns** `OPRT_OK` on success. For other values, see the `OS_ADAPTER_SPI` section of `tuya_error_code.h`.

## tkl_spi_abort_transfer

```c
OPERATE_RET tkl_spi_abort_transfer(TUYA_SPI_NUM_E port);
```

Aborts an ongoing transfer, send, or receive.

| Parameter | Type | Description |
| --- | --- | --- |
| `port` | `TUYA_SPI_NUM_E` | SPI bus index. |

**Returns** `OPRT_OK` on success. For other values, see the `OS_ADAPTER_SPI` section of `tuya_error_code.h`.

## tkl_spi_get_status

```c
OPERATE_RET tkl_spi_get_status(TUYA_SPI_NUM_E port, TUYA_SPI_STATUS_T *status);
```

Reads the current status of an SPI bus.

| Parameter | Type | Description |
| --- | --- | --- |
| `port` | `TUYA_SPI_NUM_E` | SPI bus index. |
| `status` | `TUYA_SPI_STATUS_T *` | Output: the bus status. |

The status structure is:

```c
typedef struct {
    uint32_t busy       : 1; // transmitter/receiver busy (1 = busy)
    uint32_t data_lost  : 1; // receive overflow / transmit underflow
    uint32_t mode_fault : 1; // mode fault detected
} TUYA_SPI_STATUS_T;
```

**Returns** `OPRT_OK` on success. For other values, see the `OS_ADAPTER_SPI` section of `tuya_error_code.h`.

## tkl_spi_irq_init

```c
OPERATE_RET tkl_spi_irq_init(TUYA_SPI_NUM_E port, TUYA_SPI_IRQ_CB cb);
```

Registers an SPI interrupt callback. This call does not enable the interrupt; call `tkl_spi_irq_enable` afterward.

| Parameter | Type | Description |
| --- | --- | --- |
| `port` | `TUYA_SPI_NUM_E` | SPI bus index. |
| `cb` | `TUYA_SPI_IRQ_CB` | Interrupt callback. |

The callback type is:

```c
typedef void (*TUYA_SPI_IRQ_CB)(TUYA_SPI_NUM_E port, TUYA_SPI_IRQ_EVT_E event);
```

`event` is one of `TUYA_SPI_EVENT_TRANSFER_COMPLETE`, `TUYA_SPI_EVENT_TX_COMPLETE`, `TUYA_SPI_EVENT_RX_COMPLETE`, `TUYA_SPI_EVENT_DATA_LOST`, or `TUYA_SPI_EVENT_MODE_FAULT`.

**Returns** `OPRT_OK` on success. For other values, see the `OS_ADAPTER_SPI` section of `tuya_error_code.h`.

## tkl_spi_irq_enable

```c
OPERATE_RET tkl_spi_irq_enable(TUYA_SPI_NUM_E port);
```

Enables the SPI interrupt registered with `tkl_spi_irq_init`.

| Parameter | Type | Description |
| --- | --- | --- |
| `port` | `TUYA_SPI_NUM_E` | SPI bus index. |

**Returns** `OPRT_OK` on success. For other values, see the `OS_ADAPTER_SPI` section of `tuya_error_code.h`.

## tkl_spi_irq_disable

```c
OPERATE_RET tkl_spi_irq_disable(TUYA_SPI_NUM_E port);
```

Disables the SPI interrupt.

| Parameter | Type | Description |
| --- | --- | --- |
| `port` | `TUYA_SPI_NUM_E` | SPI bus index. |

**Returns** `OPRT_OK` on success. For other values, see the `OS_ADAPTER_SPI` section of `tuya_error_code.h`.

## tkl_spi_get_data_count

```c
int32_t tkl_spi_get_data_count(TUYA_SPI_NUM_E port);
```

Returns the number of data items transferred by the most recent `tkl_spi_send`, `tkl_spi_recv`, or `tkl_spi_transfer` operation.

| Parameter | Type | Description |
| --- | --- | --- |
| `port` | `TUYA_SPI_NUM_E` | SPI bus index. |

**Returns** a count `>= 0` on success, or a negative value on error.

## tkl_spi_ioctl

```c
OPERATE_RET tkl_spi_ioctl(TUYA_SPI_NUM_E port, uint32_t cmd, void *args);
```

Performs a device-specific control operation.

| Parameter | Type | Description |
| --- | --- | --- |
| `port` | `TUYA_SPI_NUM_E` | SPI bus index. |
| `cmd` | `uint32_t` | Control command. |
| `args` | `void *` | Argument associated with the command. |

**Returns** `OPRT_OK` on success. For other values, see the `OS_ADAPTER_SPI` section of `tuya_error_code.h`.

## tkl_spi_get_max_dma_data_length

```c
uint32_t tkl_spi_get_max_dma_data_length(void);
```

Returns the maximum DMA data length supported for `tkl_spi_send`, `tkl_spi_recv`, and `tkl_spi_transfer`.

**Returns** the supported maximum DMA length.

## Examples

Master mode, polling the status between operations:

```c
void tuya_spi_test1(void)
{
    OPERATE_RET ret;
    TUYA_SPI_BASE_CFG_T cfg;
    TUYA_SPI_STATUS_T status;
    char rcv_buf[8];
    char send_buf[8] = {0,1,2,3,4,5,6,7};

    tkl_io_pinmux_config(TUYA_IO_PIN_0, TUYA_SPI0_MISO);
    tkl_io_pinmux_config(TUYA_IO_PIN_1, TUYA_SPI0_MOSI);
    tkl_io_pinmux_config(TUYA_IO_PIN_2, TUYA_SPI0_CS);
    tkl_io_pinmux_config(TUYA_IO_PIN_3, TUYA_SPI0_CLK);

    cfg.role = TUYA_SPI_ROLE_MASTER;
    cfg.mode = TUYA_SPI_MODE0;
    cfg.type = TUYA_SPI_AUTO_TYPE;
    cfg.databits = TUYA_SPI_DATA_BIT8;
    cfg.bitorder = TUYA_SPI_ORDER_MSB2LSB;
    cfg.freq_hz = 1000000;

    ret = tkl_spi_init(TUYA_SPI_NUM_0, &cfg);
    if (ret != OPRT_OK) {
        return;
    }

    tkl_spi_send(TUYA_SPI_NUM_0, send_buf, 8);
    tkl_spi_get_status(TUYA_SPI_NUM_0, &status);
    while (status.busy) {
        tkl_spi_get_status(TUYA_SPI_NUM_0, &status);
        tkl_system_sleep(2);
    }

    tkl_spi_recv(TUYA_SPI_NUM_0, rcv_buf, 8);
    tkl_spi_get_status(TUYA_SPI_NUM_0, &status);
    while (status.busy) {
        tkl_spi_get_status(TUYA_SPI_NUM_0, &status);
        tkl_system_sleep(2);
    }

    tkl_spi_transfer(TUYA_SPI_NUM_0, send_buf, rcv_buf, 6);
    tkl_spi_get_status(TUYA_SPI_NUM_0, &status);
    while (status.busy) {
        tkl_spi_get_status(TUYA_SPI_NUM_0, &status);
        tkl_system_sleep(2);
    }

    tkl_spi_deinit(TUYA_SPI_NUM_0);
}
```

Master mode with interrupt-driven event handling:

```c
static int event_flag = -1;

static void spi_event_cb(TUYA_SPI_NUM_E port, TUYA_SPI_IRQ_EVT_E event)
{
    event_flag = event;
}

void tuya_spi_test2(void)
{
    OPERATE_RET ret;
    TUYA_SPI_BASE_CFG_T cfg;
    char rcv_buf[6];
    char send_buf[6] = {0x90,0x0,0x0,0x0,0x0,0x0};

    tkl_io_pinmux_config(TUYA_IO_PIN_0, TUYA_SPI0_MISO);
    tkl_io_pinmux_config(TUYA_IO_PIN_1, TUYA_SPI0_MOSI);
    tkl_io_pinmux_config(TUYA_IO_PIN_2, TUYA_SPI0_CS);
    tkl_io_pinmux_config(TUYA_IO_PIN_3, TUYA_SPI0_CLK);

    cfg.role = TUYA_SPI_ROLE_MASTER;
    cfg.mode = TUYA_SPI_MODE0;
    cfg.type = TUYA_SPI_AUTO_TYPE;
    cfg.databits = TUYA_SPI_DATA_BIT8;
    cfg.bitorder = TUYA_SPI_ORDER_MSB2LSB;
    cfg.freq_hz = 1000000;

    ret = tkl_spi_init(TUYA_SPI_NUM_0, &cfg);
    if (ret != OPRT_OK) {
        return;
    }

    tkl_spi_irq_init(TUYA_SPI_NUM_0, spi_event_cb);
    tkl_spi_irq_enable(TUYA_SPI_NUM_0);

    event_flag = -1;
    tkl_spi_transfer(TUYA_SPI_NUM_0, send_buf, rcv_buf, 6);
    while (TUYA_SPI_EVENT_TRANSFER_COMPLETE != event_flag) {
        tkl_system_sleep(2);
    }

    event_flag = -1;
    tkl_spi_send(TUYA_SPI_NUM_0, send_buf, 6);
    while (TUYA_SPI_EVENT_TX_COMPLETE != event_flag) {
        tkl_system_sleep(2);
    }

    event_flag = -1;
    tkl_spi_recv(TUYA_SPI_NUM_0, rcv_buf, 6);
    while (TUYA_SPI_EVENT_RX_COMPLETE != event_flag) {
        tkl_system_sleep(2);
    }

    tkl_spi_irq_disable(TUYA_SPI_NUM_0);
    tkl_spi_deinit(TUYA_SPI_NUM_0);
}
```
