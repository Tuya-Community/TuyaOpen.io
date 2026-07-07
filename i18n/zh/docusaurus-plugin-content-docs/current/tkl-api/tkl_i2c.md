---
title: "tkl_i2c | I2C 驱动"
description: "tkl_i2c 参考 —— 以主机或从机模式驱动 I2C 总线，配置角色速度地址宽度并按设备地址收发字节的 I2C 驱动 TKL API。"
keywords:
  - tkl_i2c
  - TuyaOpen I2C 驱动
  - 同步串行总线
  - 嵌入式驱动
---

TKL I2C 接口以主机或从机模式驱动 I2C 总线，用于传感器、显示屏、IO 扩展器等外设。你为一条总线（`TUYA_I2C_NUM_E`）配置角色、速度和地址宽度，然后针对各设备地址发送和接收字节，并可选用中断驱动的事件回调。

I2C 是一种两线同步串行总线：一根双向数据线（SDA）和一根时钟线（SCL），由所有设备共享。主机产生时钟、发出起始和停止条件，并通过 7 位或 10 位的唯一地址寻址每个从机。起始条件之后，每个从机将总线上的地址与自身地址比较，匹配的设备做出响应。

## tkl_i2c_init

```c
OPERATE_RET tkl_i2c_init(TUYA_I2C_NUM_E port, const TUYA_IIC_BASE_CFG_T *cfg);
```

按给定的角色、速度和地址宽度初始化一条 I2C 总线。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `port` | `TUYA_I2C_NUM_E` | I2C 总线索引，从 `TUYA_I2C_NUM_0` 开始。 |
| `cfg` | `const TUYA_IIC_BASE_CFG_T *` | 总线配置。 |

配置结构体如下：

```c
typedef struct {
    TUYA_IIC_ROLE_E      role;
    TUYA_IIC_SPEED_E     speed;
    TUYA_IIC_ADDR_MODE_E addr_width;
} TUYA_IIC_BASE_CFG_T;
```

`role` 选择总线角色：

| 取值 | 说明 |
| --- | --- |
| `TUYA_IIC_MODE_MASTER` | 主机模式 |
| `TUYA_IIC_MODE_SLAVE` | 从机模式 |

`speed` 选择总线速度：

| 取值 | 说明 |
| --- | --- |
| `TUYA_IIC_BUS_SPEED_100K` | 标准速度（100 kHz） |
| `TUYA_IIC_BUS_SPEED_400K` | 快速（400 kHz） |
| `TUYA_IIC_BUS_SPEED_1M` | 快速+（1 MHz） |
| `TUYA_IIC_BUS_SPEED_3_4M` | 高速（3.4 MHz） |

`addr_width` 选择地址模式：

| 取值 | 说明 |
| --- | --- |
| `TUYA_IIC_ADDRESS_7BIT` | 7 位地址模式 |
| `TUYA_IIC_ADDRESS_10BIT` | 10 位地址模式 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h` 中 `OS_ADAPTER_I2C` 定义部分。

## tkl_i2c_deinit

```c
OPERATE_RET tkl_i2c_deinit(TUYA_I2C_NUM_E port);
```

反初始化一条 I2C 总线，停止该总线并释放其软硬件资源。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `port` | `TUYA_I2C_NUM_E` | I2C 总线索引。 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h` 中 `OS_ADAPTER_I2C` 定义部分。

## tkl_i2c_irq_init

```c
OPERATE_RET tkl_i2c_irq_init(TUYA_I2C_NUM_E port, TUYA_I2C_IRQ_CB cb);
```

注册 I2C 中断回调。此调用不会使能中断，需随后调用 `tkl_i2c_irq_enable`。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `port` | `TUYA_I2C_NUM_E` | I2C 总线索引。 |
| `cb` | `TUYA_I2C_IRQ_CB` | 中断回调。 |

回调类型如下：

```c
typedef void (*TUYA_I2C_IRQ_CB)(TUYA_I2C_NUM_E port, TUYA_IIC_IRQ_EVT_E event);
```

`event` 为下列之一：

| 取值 | 说明 |
| --- | --- |
| `TUYA_IIC_EVENT_TRANSFER_DONE` | 传输完成 |
| `TUYA_IIC_EVENT_TRANSFER_INCOMPLETE` | 传输未完成 |
| `TUYA_IIC_EVENT_SLAVE_TRANSMIT` | 请求从机发送 |
| `TUYA_IIC_EVENT_SLAVE_RECEIVE` | 请求从机接收 |
| `TUYA_IIC_EVENT_ADDRESS_NACK` | 从机未应答地址 |
| `TUYA_IIC_EVENT_GENERAL_CALL` | 收到广播呼叫（地址为 0） |
| `TUYA_IIC_EVENT_ARBITRATION_LOST` | 主机仲裁失败 |
| `TUYA_IIC_EVENT_BUS_ERROR` | 检测到总线错误 |
| `TUYA_IIC_EVENT_BUS_CLEAR` | 总线清除完成 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h` 中 `OS_ADAPTER_I2C` 定义部分。

## tkl_i2c_irq_enable

```c
OPERATE_RET tkl_i2c_irq_enable(TUYA_I2C_NUM_E port);
```

使能通过 `tkl_i2c_irq_init` 注册的 I2C 中断。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `port` | `TUYA_I2C_NUM_E` | I2C 总线索引。 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h` 中 `OS_ADAPTER_I2C` 定义部分。

## tkl_i2c_irq_disable

```c
OPERATE_RET tkl_i2c_irq_disable(TUYA_I2C_NUM_E port);
```

失能 I2C 中断。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `port` | `TUYA_I2C_NUM_E` | I2C 总线索引。 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h` 中 `OS_ADAPTER_I2C` 定义部分。

## tkl_i2c_master_send

```c
OPERATE_RET tkl_i2c_master_send(TUYA_I2C_NUM_E port, uint16_t dev_addr, const void *data, uint32_t size, BOOL_T xfer_pending);
```

总线处于主机模式时向从机发送数据。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `port` | `TUYA_I2C_NUM_E` | I2C 总线索引。 |
| `dev_addr` | `uint16_t` | 从机设备地址。 |
| `data` | `const void *` | 要发送的数据。 |
| `size` | `uint32_t` | 要发送的字节数。 |
| `xfer_pending` | `BOOL_T` | `TRUE` 不发送停止条件（保持占用总线），`FALSE` 发送停止条件。 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h` 中 `OS_ADAPTER_I2C` 定义部分。

## tkl_i2c_master_receive

```c
OPERATE_RET tkl_i2c_master_receive(TUYA_I2C_NUM_E port, uint16_t dev_addr, void *data, uint32_t size, BOOL_T xfer_pending);
```

总线处于主机模式时从从机接收数据。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `port` | `TUYA_I2C_NUM_E` | I2C 总线索引。 |
| `dev_addr` | `uint16_t` | 从机设备地址。 |
| `data` | `void *` | 输出：接收数据的缓冲区。 |
| `size` | `uint32_t` | 要接收的字节数。 |
| `xfer_pending` | `BOOL_T` | `TRUE` 不发送停止条件（保持占用总线），`FALSE` 发送停止条件。 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h` 中 `OS_ADAPTER_I2C` 定义部分。

## tkl_i2c_set_slave_addr

```c
OPERATE_RET tkl_i2c_set_slave_addr(TUYA_I2C_NUM_E port, uint16_t dev_addr);
```

设置总线作为从机时使用的设备地址。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `port` | `TUYA_I2C_NUM_E` | I2C 总线索引。 |
| `dev_addr` | `uint16_t` | 要响应的从机地址。 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h` 中 `OS_ADAPTER_I2C` 定义部分。

## tkl_i2c_slave_send

```c
OPERATE_RET tkl_i2c_slave_send(TUYA_I2C_NUM_E port, const void *data, uint32_t size);
```

总线处于从机模式时发送数据。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `port` | `TUYA_I2C_NUM_E` | I2C 总线索引。 |
| `data` | `const void *` | 要发送的数据。 |
| `size` | `uint32_t` | 要发送的字节数。 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h` 中 `OS_ADAPTER_I2C` 定义部分。

## tkl_i2c_slave_receive

```c
OPERATE_RET tkl_i2c_slave_receive(TUYA_I2C_NUM_E port, void *data, uint32_t size);
```

总线处于从机模式时接收数据。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `port` | `TUYA_I2C_NUM_E` | I2C 总线索引。 |
| `data` | `void *` | 输出：接收数据的缓冲区。 |
| `size` | `uint32_t` | 要接收的字节数。 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h` 中 `OS_ADAPTER_I2C` 定义部分。

## tkl_i2c_get_status

```c
OPERATE_RET tkl_i2c_get_status(TUYA_I2C_NUM_E port, TUYA_IIC_STATUS_T *status);
```

读取 I2C 总线的当前状态。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `port` | `TUYA_I2C_NUM_E` | I2C 总线索引。 |
| `status` | `TUYA_IIC_STATUS_T *` | 输出：总线状态。 |

状态结构体如下：

```c
typedef struct {
    uint32_t busy             : 1; // 收发忙标志（1 = 忙）
    uint32_t mode             : 1; // 0 = 从机，1 = 主机
    uint32_t direction        : 1; // 0 = 发送，1 = 接收
    uint32_t general_call     : 1; // 广播呼叫指示
    uint32_t arbitration_lost : 1; // 主机仲裁失败
    uint32_t bus_error        : 1; // 检测到总线错误
} TUYA_IIC_STATUS_T;
```

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h` 中 `OS_ADAPTER_I2C` 定义部分。

## tkl_i2c_reset

```c
OPERATE_RET tkl_i2c_reset(TUYA_I2C_NUM_E port);
```

复位一条 I2C 总线。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `port` | `TUYA_I2C_NUM_E` | I2C 总线索引。 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h` 中 `OS_ADAPTER_I2C` 定义部分。

## tkl_i2c_get_data_count

```c
int32_t tkl_i2c_get_data_count(TUYA_I2C_NUM_E port);
```

返回最近一次操作传输的数据项数量。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `port` | `TUYA_I2C_NUM_E` | I2C 总线索引。 |

**返回值**：成功返回 `>= 0` 的计数，出错返回负值。对于 `tkl_i2c_master_send` 为已发送并被应答的字节数，对于 `tkl_i2c_master_receive` 为已接收的字节数，对于 `tkl_i2c_slave_send` 为已发送的字节数，对于 `tkl_i2c_slave_receive` 为已接收并被应答的字节数。

## tkl_i2c_ioctl

```c
OPERATE_RET tkl_i2c_ioctl(TUYA_I2C_NUM_E port, uint32_t cmd, void *args);
```

执行设备相关的控制操作。例如，`I2C_IOCTL_SET_REGADDR_WIDTH` 通过 `REGADDR_WIDTH_T` 参数设置寄存器地址宽度。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `port` | `TUYA_I2C_NUM_E` | I2C 总线索引。 |
| `cmd` | `uint32_t` | 控制命令。 |
| `args` | `void *` | 命令对应的参数。 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h` 中 `OS_ADAPTER_I2C` 定义部分。

## 示例

带中断回调的主机模式：

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

从机模式，通过轮询状态等待完成：

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

## 相关文档

- [I2C 外设指南](../peripheral/tutorials/i2c-guide)
