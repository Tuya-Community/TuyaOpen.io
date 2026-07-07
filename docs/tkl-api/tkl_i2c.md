---
title: "tkl_i2c | I2C Driver"
description: "tkl_i2c reference — TuyaOpen I2C driver TKL API for master/slave bus init, send, receive, and interrupt callbacks in embedded IoT development."
keywords:
  - tkl_i2c
  - tuyaopen i2c driver
  - tkl i2c api
  - embedded i2c driver
---

The TKL I2C interface drives the I2C bus as either master or slave for sensors, displays, IO expanders, and other peripherals. You initialize a bus (`TUYA_I2C_NUM_E`) with a role, speed, and address width, then send and receive bytes against each device address, optionally with interrupt-driven event callbacks.

I2C is a two-wire synchronous serial bus: a bidirectional data line (SDA) and a clock line (SCL), shared by all devices. The master generates the clock, issues the start and stop conditions, and addresses each slave by its unique 7-bit or 10-bit address. After the start condition, every slave compares the address on the bus against its own and the matching device responds.

## tkl_i2c_init

```c
OPERATE_RET tkl_i2c_init(TUYA_I2C_NUM_E port, const TUYA_IIC_BASE_CFG_T *cfg);
```

Initializes an I2C bus with the given role, speed, and address width.

| Parameter | Type | Description |
| --- | --- | --- |
| `port` | `TUYA_I2C_NUM_E` | I2C bus index, starting at `TUYA_I2C_NUM_0`. |
| `cfg` | `const TUYA_IIC_BASE_CFG_T *` | Bus configuration. |

The configuration structure is:

```c
typedef struct {
    TUYA_IIC_ROLE_E      role;
    TUYA_IIC_SPEED_E     speed;
    TUYA_IIC_ADDR_MODE_E addr_width;
} TUYA_IIC_BASE_CFG_T;
```

`role` selects the bus role:

| Value | Description |
| --- | --- |
| `TUYA_IIC_MODE_MASTER` | Master mode |
| `TUYA_IIC_MODE_SLAVE` | Slave mode |

`speed` selects the bus speed:

| Value | Description |
| --- | --- |
| `TUYA_IIC_BUS_SPEED_100K` | Standard speed (100 kHz) |
| `TUYA_IIC_BUS_SPEED_400K` | Fast speed (400 kHz) |
| `TUYA_IIC_BUS_SPEED_1M` | Fast+ speed (1 MHz) |
| `TUYA_IIC_BUS_SPEED_3_4M` | High speed (3.4 MHz) |

`addr_width` selects the address mode:

| Value | Description |
| --- | --- |
| `TUYA_IIC_ADDRESS_7BIT` | 7-bit address mode |
| `TUYA_IIC_ADDRESS_10BIT` | 10-bit address mode |

**Returns** `OPRT_OK` on success. For other values, see the `OS_ADAPTER_I2C` section of `tuya_error_code.h`.

## tkl_i2c_deinit

```c
OPERATE_RET tkl_i2c_deinit(TUYA_I2C_NUM_E port);
```

Deinitializes an I2C bus, stopping it and releasing its software and hardware resources.

| Parameter | Type | Description |
| --- | --- | --- |
| `port` | `TUYA_I2C_NUM_E` | I2C bus index. |

**Returns** `OPRT_OK` on success. For other values, see the `OS_ADAPTER_I2C` section of `tuya_error_code.h`.

## tkl_i2c_irq_init

```c
OPERATE_RET tkl_i2c_irq_init(TUYA_I2C_NUM_E port, TUYA_I2C_IRQ_CB cb);
```

Registers an I2C interrupt callback. This call does not enable the interrupt; call `tkl_i2c_irq_enable` afterward.

| Parameter | Type | Description |
| --- | --- | --- |
| `port` | `TUYA_I2C_NUM_E` | I2C bus index. |
| `cb` | `TUYA_I2C_IRQ_CB` | Interrupt callback. |

The callback type is:

```c
typedef void (*TUYA_I2C_IRQ_CB)(TUYA_I2C_NUM_E port, TUYA_IIC_IRQ_EVT_E event);
```

`event` is one of the following:

| Value | Description |
| --- | --- |
| `TUYA_IIC_EVENT_TRANSFER_DONE` | Transfer complete |
| `TUYA_IIC_EVENT_TRANSFER_INCOMPLETE` | Transfer incomplete |
| `TUYA_IIC_EVENT_SLAVE_TRANSMIT` | Slave transmit requested |
| `TUYA_IIC_EVENT_SLAVE_RECEIVE` | Slave receive requested |
| `TUYA_IIC_EVENT_ADDRESS_NACK` | Address not acknowledged by slave |
| `TUYA_IIC_EVENT_GENERAL_CALL` | General call (address 0) received |
| `TUYA_IIC_EVENT_ARBITRATION_LOST` | Master lost arbitration |
| `TUYA_IIC_EVENT_BUS_ERROR` | Bus error detected |
| `TUYA_IIC_EVENT_BUS_CLEAR` | Bus clear finished |

**Returns** `OPRT_OK` on success. For other values, see the `OS_ADAPTER_I2C` section of `tuya_error_code.h`.

## tkl_i2c_irq_enable

```c
OPERATE_RET tkl_i2c_irq_enable(TUYA_I2C_NUM_E port);
```

Enables the I2C interrupt registered with `tkl_i2c_irq_init`.

| Parameter | Type | Description |
| --- | --- | --- |
| `port` | `TUYA_I2C_NUM_E` | I2C bus index. |

**Returns** `OPRT_OK` on success. For other values, see the `OS_ADAPTER_I2C` section of `tuya_error_code.h`.

## tkl_i2c_irq_disable

```c
OPERATE_RET tkl_i2c_irq_disable(TUYA_I2C_NUM_E port);
```

Disables the I2C interrupt.

| Parameter | Type | Description |
| --- | --- | --- |
| `port` | `TUYA_I2C_NUM_E` | I2C bus index. |

**Returns** `OPRT_OK` on success. For other values, see the `OS_ADAPTER_I2C` section of `tuya_error_code.h`.

## tkl_i2c_master_send

```c
OPERATE_RET tkl_i2c_master_send(TUYA_I2C_NUM_E port, uint16_t dev_addr, const void *data, uint32_t size, BOOL_T xfer_pending);
```

Sends data to a slave when the bus is in master mode.

| Parameter | Type | Description |
| --- | --- | --- |
| `port` | `TUYA_I2C_NUM_E` | I2C bus index. |
| `dev_addr` | `uint16_t` | Slave device address. |
| `data` | `const void *` | Data to send. |
| `size` | `uint32_t` | Number of bytes to send. |
| `xfer_pending` | `BOOL_T` | `TRUE` to keep the bus (no stop condition), `FALSE` to send a stop condition. |

**Returns** `OPRT_OK` on success. For other values, see the `OS_ADAPTER_I2C` section of `tuya_error_code.h`.

## tkl_i2c_master_receive

```c
OPERATE_RET tkl_i2c_master_receive(TUYA_I2C_NUM_E port, uint16_t dev_addr, void *data, uint32_t size, BOOL_T xfer_pending);
```

Receives data from a slave when the bus is in master mode.

| Parameter | Type | Description |
| --- | --- | --- |
| `port` | `TUYA_I2C_NUM_E` | I2C bus index. |
| `dev_addr` | `uint16_t` | Slave device address. |
| `data` | `void *` | Output: buffer for received data. |
| `size` | `uint32_t` | Number of bytes to receive. |
| `xfer_pending` | `BOOL_T` | `TRUE` to keep the bus (no stop condition), `FALSE` to send a stop condition. |

**Returns** `OPRT_OK` on success. For other values, see the `OS_ADAPTER_I2C` section of `tuya_error_code.h`.

## tkl_i2c_set_slave_addr

```c
OPERATE_RET tkl_i2c_set_slave_addr(TUYA_I2C_NUM_E port, uint16_t dev_addr);
```

Sets the device address used when the bus operates as a slave.

| Parameter | Type | Description |
| --- | --- | --- |
| `port` | `TUYA_I2C_NUM_E` | I2C bus index. |
| `dev_addr` | `uint16_t` | Slave address to respond to. |

**Returns** `OPRT_OK` on success. For other values, see the `OS_ADAPTER_I2C` section of `tuya_error_code.h`.

## tkl_i2c_slave_send

```c
OPERATE_RET tkl_i2c_slave_send(TUYA_I2C_NUM_E port, const void *data, uint32_t size);
```

Sends data when the bus is in slave mode.

| Parameter | Type | Description |
| --- | --- | --- |
| `port` | `TUYA_I2C_NUM_E` | I2C bus index. |
| `data` | `const void *` | Data to send. |
| `size` | `uint32_t` | Number of bytes to send. |

**Returns** `OPRT_OK` on success. For other values, see the `OS_ADAPTER_I2C` section of `tuya_error_code.h`.

## tkl_i2c_slave_receive

```c
OPERATE_RET tkl_i2c_slave_receive(TUYA_I2C_NUM_E port, void *data, uint32_t size);
```

Receives data when the bus is in slave mode.

| Parameter | Type | Description |
| --- | --- | --- |
| `port` | `TUYA_I2C_NUM_E` | I2C bus index. |
| `data` | `void *` | Output: buffer for received data. |
| `size` | `uint32_t` | Number of bytes to receive. |

**Returns** `OPRT_OK` on success. For other values, see the `OS_ADAPTER_I2C` section of `tuya_error_code.h`.

## tkl_i2c_get_status

```c
OPERATE_RET tkl_i2c_get_status(TUYA_I2C_NUM_E port, TUYA_IIC_STATUS_T *status);
```

Reads the current status of an I2C bus.

| Parameter | Type | Description |
| --- | --- | --- |
| `port` | `TUYA_I2C_NUM_E` | I2C bus index. |
| `status` | `TUYA_IIC_STATUS_T *` | Output: the bus status. |

The status structure is:

```c
typedef struct {
    uint32_t busy             : 1; // transmitter/receiver busy (1 = busy)
    uint32_t mode             : 1; // 0 = slave, 1 = master
    uint32_t direction        : 1; // 0 = transmitter, 1 = receiver
    uint32_t general_call     : 1; // general call indication
    uint32_t arbitration_lost : 1; // master lost arbitration
    uint32_t bus_error        : 1; // bus error detected
} TUYA_IIC_STATUS_T;
```

**Returns** `OPRT_OK` on success. For other values, see the `OS_ADAPTER_I2C` section of `tuya_error_code.h`.

## tkl_i2c_reset

```c
OPERATE_RET tkl_i2c_reset(TUYA_I2C_NUM_E port);
```

Resets an I2C bus.

| Parameter | Type | Description |
| --- | --- | --- |
| `port` | `TUYA_I2C_NUM_E` | I2C bus index. |

**Returns** `OPRT_OK` on success. For other values, see the `OS_ADAPTER_I2C` section of `tuya_error_code.h`.

## tkl_i2c_get_data_count

```c
int32_t tkl_i2c_get_data_count(TUYA_I2C_NUM_E port);
```

Returns the number of data items transferred by the most recent operation.

| Parameter | Type | Description |
| --- | --- | --- |
| `port` | `TUYA_I2C_NUM_E` | I2C bus index. |

**Returns** a count `>= 0` on success, or a negative value on error. The count is the bytes transmitted and acknowledged for `tkl_i2c_master_send`, received for `tkl_i2c_master_receive`, transmitted for `tkl_i2c_slave_send`, and received and acknowledged for `tkl_i2c_slave_receive`.

## tkl_i2c_ioctl

```c
OPERATE_RET tkl_i2c_ioctl(TUYA_I2C_NUM_E port, uint32_t cmd, void *args);
```

Performs a device-specific control operation. For example, `I2C_IOCTL_SET_REGADDR_WIDTH` sets the register address width via a `REGADDR_WIDTH_T` argument.

| Parameter | Type | Description |
| --- | --- | --- |
| `port` | `TUYA_I2C_NUM_E` | I2C bus index. |
| `cmd` | `uint32_t` | Control command. |
| `args` | `void *` | Argument associated with the command. |

**Returns** `OPRT_OK` on success. For other values, see the `OS_ADAPTER_I2C` section of `tuya_error_code.h`.

## Examples

Master mode with an interrupt callback:

```c
static uint16_t cb_transfer_flag = 0xff;

static void i2c_event_cb_fun(TUYA_I2C_NUM_E port, TUYA_IIC_IRQ_EVT_E event)
{
    if (port == TUYA_I2C_NUM_0) {
        cb_transfer_flag = event;
    }
}

void tuya_i2c_master_test(void)
{
    OPERATE_RET ret;
    TUYA_IIC_BASE_CFG_T cfg;
    char rcv_buf[10];
    char send_buf[10] = {0,1,2,3,4,5,6,7,8,9};

    tkl_io_pinmux_config(TUYA_IO_PIN_0, TUYA_IIC0_SCL);
    tkl_io_pinmux_config(TUYA_IO_PIN_1, TUYA_IIC0_SDA);

    cfg.role = TUYA_IIC_MODE_MASTER;
    cfg.speed = TUYA_IIC_BUS_SPEED_100K;
    cfg.addr_width = TUYA_IIC_ADDRESS_7BIT;

    ret = tkl_i2c_init(TUYA_I2C_NUM_0, &cfg);
    if (ret != OPRT_OK) {
        return;
    }

    tkl_i2c_irq_init(TUYA_I2C_NUM_0, i2c_event_cb_fun);
    tkl_i2c_irq_enable(TUYA_I2C_NUM_0);

    tkl_i2c_master_send(TUYA_I2C_NUM_0, 0x57, send_buf, sizeof(send_buf), FALSE);
    while (cb_transfer_flag == 0xff);
    cb_transfer_flag = 0xff;

    tkl_i2c_master_receive(TUYA_I2C_NUM_0, 0x57, rcv_buf, sizeof(rcv_buf), FALSE);
    while (cb_transfer_flag == 0xff);

    tkl_i2c_irq_disable(TUYA_I2C_NUM_0);
    tkl_i2c_deinit(TUYA_I2C_NUM_0);
}
```

Slave mode, polling the status to wait for completion:

```c
void tuya_i2c_slave_test(void)
{
    OPERATE_RET ret;
    TUYA_IIC_BASE_CFG_T cfg;
    TUYA_IIC_STATUS_T st;
    char rcv_buf[10];
    char send_buf[10] = {0,1,2,3,4,5,6,7,8,9};
    int32_t cnt;

    tkl_io_pinmux_config(TUYA_IO_PIN_0, TUYA_IIC0_SCL);
    tkl_io_pinmux_config(TUYA_IO_PIN_1, TUYA_IIC0_SDA);

    cfg.role = TUYA_IIC_MODE_SLAVE;
    cfg.speed = TUYA_IIC_BUS_SPEED_100K;
    cfg.addr_width = TUYA_IIC_ADDRESS_7BIT;

    ret = tkl_i2c_init(TUYA_I2C_NUM_0, &cfg);
    if (ret != OPRT_OK) {
        return;
    }

    tkl_i2c_set_slave_addr(TUYA_I2C_NUM_0, 0x57);

    tkl_i2c_slave_send(TUYA_I2C_NUM_0, send_buf, sizeof(send_buf));
    cnt = 100;
    while (cnt--) {
        tkl_system_sleep(1);
        tkl_i2c_get_status(TUYA_I2C_NUM_0, &st);
        if (st.busy == 0) {
            break;
        }
    }

    tkl_i2c_slave_receive(TUYA_I2C_NUM_0, rcv_buf, sizeof(rcv_buf));
    cnt = 100;
    while (cnt--) {
        tkl_system_sleep(1);
        tkl_i2c_get_status(TUYA_I2C_NUM_0, &st);
        if (st.busy == 0) {
            break;
        }
    }

    tkl_i2c_deinit(TUYA_I2C_NUM_0);
}
```

## See also

- [I2C Peripheral Guide](../peripheral/tutorials/i2c-guide)
