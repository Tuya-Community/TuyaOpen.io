---
title: tkl_uart | UART Driver
---

## Overview

UART (Universal Asynchronous Receiver/Transmitter) is a serial bus for asynchronous communication. It is bidirectional and supports full-duplex transmit and receive.

This driver covers the full UART lifecycle: initialize a port, write and read data, register receive and transmit interrupt callbacks, control the transmit interrupt and receive flow control, wait for incoming data, and issue control commands.

Every function takes a `port_id` of type `TUYA_UART_NUM_E`:

```c
typedef enum {
    TUYA_UART_NUM_0, // UART 0
    TUYA_UART_NUM_1, // UART 1
    TUYA_UART_NUM_2, // UART 2
    TUYA_UART_NUM_3, // UART 3
    TUYA_UART_NUM_4, // UART 4
    TUYA_UART_NUM_5, // UART 5
    TUYA_UART_NUM_MAX,
} TUYA_UART_NUM_E;
```

On Linux, the high 16 bits of `port_id` also encode a `TUYA_UART_TYPE_E` (one of `TUYA_UART_SYS`, `TUYA_UART_USB`, `TUYA_UART_SDIO`, `TUYA_UART_WCH`) and the low 16 bits encode the port number. Build such a value with the `TUYA_UART_PORT_ID(port_type, port_num)` macro, for example `TUYA_UART_PORT_ID(TUYA_UART_SYS, 2)`.

## tkl_uart_init

```c
OPERATE_RET tkl_uart_init(TUYA_UART_NUM_E port_id, TUYA_UART_BASE_CFG_T *cfg);
```

Initializes a UART port from the base configuration and returns the result.

Parameters:

- `port_id`: Port number.
- `cfg`: Base configuration — baud rate, parity, data bits, stop bits, and flow control.

  ```c
  typedef struct {
      uint32_t                    baudrate;
      TUYA_UART_PARITY_TYPE_E     parity;
      TUYA_UART_DATA_LEN_E        databits;
      TUYA_UART_STOP_LEN_E        stopbits;
      TUYA_UART_FLOWCTRL_TYPE_E   flowctrl;
  } TUYA_UART_BASE_CFG_T;
  ```

  `TUYA_UART_PARITY_TYPE_E`:

  | Name                         | Value | Description       |
  | :--------------------------- | :---- | :---------------- |
  | `TUYA_UART_PARITY_TYPE_NONE` | `0`   | No parity         |
  | `TUYA_UART_PARITY_TYPE_ODD`  | `1`   | Odd parity        |
  | `TUYA_UART_PARITY_TYPE_EVEN` | `2`   | Even parity       |

  `TUYA_UART_DATA_LEN_E`:

  | Name                      | Value  | Description       |
  | :------------------------ | :----- | :---------------- |
  | `TUYA_UART_DATA_LEN_5BIT` | `0x05` | 5-bit data length |
  | `TUYA_UART_DATA_LEN_6BIT` | `0x06` | 6-bit data length |
  | `TUYA_UART_DATA_LEN_7BIT` | `0x07` | 7-bit data length |
  | `TUYA_UART_DATA_LEN_8BIT` | `0x08` | 8-bit data length |

  `TUYA_UART_STOP_LEN_E`:

  | Name                         | Value  | Description       |
  | :--------------------------- | :----- | :---------------- |
  | `TUYA_UART_STOP_LEN_1BIT`    | `0x01` | 1 stop bit        |
  | `TUYA_UART_STOP_LEN_1_5BIT1` | `0x02` | 1.5 stop bits     |
  | `TUYA_UART_STOP_LEN_2BIT`    | `0x03` | 2 stop bits       |

  `TUYA_UART_FLOWCTRL_TYPE_E`:

  | Name                         | Value | Description                        |
  | :--------------------------- | :---- | :--------------------------------- |
  | `TUYA_UART_FLOWCTRL_NONE`    | `0`   | No flow control                    |
  | `TUYA_UART_FLOWCTRL_RTSCTS`  | `1`   | RTS/CTS hardware flow control      |
  | `TUYA_UART_FLOWCTRL_XONXOFF` | `2`   | XON/XOFF software flow control     |
  | `TUYA_UART_FLOWCTRL_DTRDSR`  | `3`   | DTR/DSR hardware flow control      |

Returns:

- `OPRT_OK` on success. For other values, see `tuya_error_code.h`.

## tkl_uart_deinit

```c
OPERATE_RET tkl_uart_deinit(TUYA_UART_NUM_E port_id);
```

Deinitializes a UART port. This stops the UART, ends any transfer in progress, and releases the related software and hardware resources.

Parameters:

- `port_id`: Port number.

Returns:

- `OPRT_OK` on success. For other values, see `tuya_error_code.h`.

## tkl_uart_write

```c
int tkl_uart_write(TUYA_UART_NUM_E port_id, void *buff, uint16_t len);
```

Writes data to a UART port.

Parameters:

- `port_id`: Port number.
- `buff`: Data buffer to send.
- `len`: Length of the data to send.

Returns:

- The number of bytes written (`> 0`), or a value less than or equal to `0` on error.

## tkl_uart_rx_irq_cb_reg

```c
void tkl_uart_rx_irq_cb_reg(TUYA_UART_NUM_E port_id, TUYA_UART_IRQ_CB rx_cb);
```

Enables the UART receive interrupt and registers its callback.

Parameters:

- `port_id`: Port number.
- `rx_cb`: Receive interrupt callback. `TUYA_UART_IRQ_CB` is defined as:

  ```c
  typedef void (*TUYA_UART_IRQ_CB)(TUYA_UART_NUM_E port_id);
  ```

  where `port_id` is the port that raised the interrupt.

Returns:

- None.

## tkl_uart_tx_irq_cb_reg

```c
void tkl_uart_tx_irq_cb_reg(TUYA_UART_NUM_E port_id, TUYA_UART_IRQ_CB tx_cb);
```

Registers the UART transmit interrupt callback. Registering it means data is sent asynchronously through the interrupt: call `tkl_uart_write` to start an asynchronous transfer.

Parameters:

- `port_id`: Port number.
- `tx_cb`: Transmit interrupt callback. `TUYA_UART_IRQ_CB` is defined as:

  ```c
  typedef void (*TUYA_UART_IRQ_CB)(TUYA_UART_NUM_E port_id);
  ```

  where `port_id` is the port that raised the interrupt.

Returns:

- None.

## tkl_uart_read

```c
int tkl_uart_read(TUYA_UART_NUM_E port_id, void *buff, uint16_t len);
```

Reads data from a UART port.

Parameters:

- `port_id`: Port number.
- `buff`: Receive buffer.
- `len`: Length of the data to read.

Returns:

- The number of bytes read (`>= 0`), or a value less than `0` on error.

## tkl_uart_set_tx_int

```c
OPERATE_RET tkl_uart_set_tx_int(TUYA_UART_NUM_E port_id, BOOL_T enable);
```

Enables or disables the UART transmit interrupt.

Parameters:

- `port_id`: Port number.
- `enable`: `TRUE` to enable the transmit interrupt, `FALSE` to disable it.

Returns:

- `OPRT_OK` on success. For other values, see `tuya_error_code.h`.

## tkl_uart_set_rx_flowctrl

```c
OPERATE_RET tkl_uart_set_rx_flowctrl(TUYA_UART_NUM_E port_id, BOOL_T enable);
```

Enables or disables UART receive flow control.

Parameters:

- `port_id`: Port number.
- `enable`: `TRUE` to enable receive flow control, `FALSE` to disable it.

Returns:

- `OPRT_OK` on success. For other values, see `tuya_error_code.h`.

## tkl_uart_wait_for_data

```c
OPERATE_RET tkl_uart_wait_for_data(TUYA_UART_NUM_E port_id, int timeout_ms);
```

Waits for received data to become available.

Parameters:

- `port_id`: Port number.
- `timeout_ms`: Maximum wait time in milliseconds. `-1` blocks indefinitely, `0` does not block, and a value greater than `0` is the timeout.

Returns:

- `OPRT_OK` on success. For other values, see `tuya_error_code.h`.

## tkl_uart_ioctl

```c
OPERATE_RET tkl_uart_ioctl(TUYA_UART_NUM_E port_id, uint32_t cmd, void *arg);
```

Issues a control command to a UART port.

Parameters:

- `port_id`: Port number.
- `cmd`: Control command.

  `TUYA_UART_IOCTL_CMD_E`:

  | Name                     | Value  | Description            |
  | :----------------------- | :----- | :--------------------- |
  | `TUYA_UART_SUSPEND_CMD`  | `0`    | Suspend the UART       |
  | `TUYA_UART_RESUME_CMD`   | `1`    | Resume the UART        |
  | `TUYA_UART_FLUSH_CMD`    | `2`    | Flush the UART buffer  |
  | `TUYA_UART_RECONFIG_CMD` | `3`    | Reconfigure the UART   |
  | `TUYA_UART_USER_CMD`     | `4`    | User-defined command   |
  | `TUYA_UART_MAX_CMD`      | `1000` | Command boundary       |

- `arg`: Argument for the control command.

Returns:

- `OPRT_OK` on success. For other values, see `tuya_error_code.h`.

## Examples

### Polled loopback

```c
int uart_loopback_test(void)
{
    uint32_t port_id;
    TUYA_UART_BASE_CFG_T cfg;
    OPERATE_RET ret = OPRT_OK;
    const int bufsize = 8;
    unsigned char tx[bufsize], rx[bufsize];
    int bytes;
    int i;

    // start
    port_id = TUYA_UART_NUM_0;

    cfg.baudrate = 115200;
    cfg.databits = TUYA_UART_DATA_LEN_8BIT;
    cfg.parity = TUYA_UART_PARITY_TYPE_NONE;
    cfg.stopbits = TUYA_UART_STOP_LEN_1BIT;
    cfg.flowctrl = TUYA_UART_FLOWCTRL_NONE;

    ret = tkl_uart_init(port_id, &cfg);

    for (i = 0; i < bufsize; i++) {
        tx[i] = 'A' + i;
    }

    // loop 3 times
    for (i = 0; i < 3; i++) {
        bzero(rx, sizeof(rx));

        bytes = tkl_uart_write(port_id, tx, sizeof(tx));
        if (bytes <= 0) {
            // fail
            ret = OPRT_COM_ERROR;
        } else {
            // wait at most 5 seconds until the data is ready
            ret = tkl_uart_wait_for_data(port_id, 5000);
            if (ret == OPRT_TIMEOUT) {
                // timeout
                tkl_uart_deinit(port_id);
                return OPRT_COM_ERROR;
            }

            bytes = tkl_uart_read(port_id, rx, sizeof(rx));
            if (bytes < 0) {
                // fail
                ret = OPRT_COM_ERROR;
            } else {
                if (memcmp(tx, rx, bufsize) != 0) {
                    // data is not identical
                    ret = OPRT_COM_ERROR;
                } else {
                    ret = OPRT_OK;
                }
            }
        }

        if (ret != OPRT_OK) {
            // fail
        } else {
            // ok
        }
    }
    // deinit
    tkl_uart_deinit(port_id);
    return ret;
}
```

### Interrupt-driven loopback

```c
static int sg_rx_flag = 0;
static int sg_tx_flag = 0;

static void tuya_rx_cb(TUYA_UART_NUM_E port_id)
{
    // mutex lock
    sg_rx_flag = 1;
    // mutex unlock
}

static void tuya_tx_cb(TUYA_UART_NUM_E port_id)
{
    // mutex lock
    sg_tx_flag = 1;
    // mutex unlock
}

int uart_loopback_test(void)
{
    uint32_t port_id;
    TUYA_UART_BASE_CFG_T cfg;
    OPERATE_RET ret = OPRT_OK;
    const int bufsize = 8;
    unsigned char tx[bufsize], rx[bufsize];
    int bytes;
    static int sl_first_time = 1;
    int i;

    // start
    sg_rx_flag = 0;
    sg_tx_flag = 0;

    port_id = TUYA_UART_NUM_0;

    cfg.baudrate = 115200;
    cfg.databits = TUYA_UART_DATA_LEN_8BIT;
    cfg.parity = TUYA_UART_PARITY_TYPE_NONE;
    cfg.stopbits = TUYA_UART_STOP_LEN_1BIT;
    cfg.flowctrl = TUYA_UART_FLOWCTRL_NONE;

    ret = tkl_uart_init(port_id, &cfg);

    if (tkl_uart_set_tx_int(port_id, 1) < 0) {
        // fail
        tkl_uart_deinit(port_id);
        return OPRT_COM_ERROR;
    }

    for (i = 0; i < bufsize; i++) {
        tx[i] = 'A' + i;
    }

    // loop 3 times
    for (i = 0; i < 3; i++) {
        bzero(rx, sizeof(rx));

        if (sl_first_time || sg_tx_flag) {
            bytes = tkl_uart_write(port_id, tx, sizeof(tx));
        } else {
            continue;
        }

        if (bytes <= 0) {
            // fail
            ret = OPRT_COM_ERROR;
        } else {
            // wait at most 5 seconds until the data is ready
            ret = tkl_uart_wait_for_data(port_id, 5000);

            if (sg_rx_flag) {
                bytes = tkl_uart_read(port_id, rx, sizeof(rx));
                if (bytes < 0) {
                    // fail
                    ret = OPRT_COM_ERROR;
                } else {
                    if (memcmp(tx, rx, bufsize) != 0) {
                        // data is not identical
                        ret = OPRT_COM_ERROR;
                    } else {
                        ret = OPRT_OK;
                    }
                }
                sg_rx_flag = 0;
            }
        }
        if (ret != OPRT_OK) {
            // fail
        } else {
            // ok
        }
    }
    // disable int
    tkl_uart_set_tx_int(port_id, 0);
    // deinit
    tkl_uart_deinit(port_id);
    return ret;
}
```
