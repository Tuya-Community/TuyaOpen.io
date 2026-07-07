---
title: "tkl_spi | SPI 驱动"
description: "tkl_spi 参考 —— 以主机或从机模式驱动 SPI 总线，配置角色时钟模式与位宽位序并收发数据的 SPI 驱动 TKL API。"
keywords:
  - tkl_spi
  - TuyaOpen SPI 驱动
  - 同步串行总线
  - 嵌入式驱动
---

TKL SPI 接口以主机或从机模式驱动 SPI 总线，用于显示屏、Flash、传感器等高速外设。你为一条总线（`TUYA_SPI_NUM_E`）配置角色、时钟模式、数据位宽和位序，然后发送、接收或全双工传输数据，并可选用中断驱动的事件回调。

SPI 是一种高速、全双工、同步总线，由一个主机和一个或多个从机通过四根线连接：MISO（从机输出）、MOSI（主机输出）、SCK（主机产生的时钟）和 CS（从机片选）。时钟模式由时钟极性（CPOL）和时钟相位（CPHA）组合而成：

| 模式 | CPOL / CPHA | 空闲时钟 | 采样边沿 |
| --- | --- | --- | --- |
| `TUYA_SPI_MODE0` | 0 / 0 | 低 | 上升沿 |
| `TUYA_SPI_MODE1` | 0 / 1 | 低 | 下降沿 |
| `TUYA_SPI_MODE2` | 1 / 0 | 高 | 下降沿 |
| `TUYA_SPI_MODE3` | 1 / 1 | 高 | 上升沿 |

主机与外设必须使用相同的时钟模式。

## tkl_spi_init

```c
OPERATE_RET tkl_spi_init(TUYA_SPI_NUM_E port, const TUYA_SPI_BASE_CFG_T *cfg);
```

按给定的角色、时钟模式、数据位宽和位序初始化一条 SPI 总线。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `port` | `TUYA_SPI_NUM_E` | SPI 总线索引，从 `TUYA_SPI_NUM_0` 开始。 |
| `cfg` | `const TUYA_SPI_BASE_CFG_T *` | 总线配置。 |

配置结构体如下：

```c
typedef struct {
    TUYA_SPI_ROLE_E      role;
    TUYA_SPI_MODE_E      mode;
    TUYA_SPI_TYPE_E      type;
    TUYA_SPI_DATABITS_E  databits;
    TUYA_SPI_BIT_ORDER_E bitorder;
    uint32_t             freq_hz;
    uint32_t             spi_dma_flags; // 1 = 使用 DMA
} TUYA_SPI_BASE_CFG_T;
```

`role` 选择总线角色：

| 取值 | 说明 |
| --- | --- |
| `TUYA_SPI_ROLE_INACTIVE` | 未激活 |
| `TUYA_SPI_ROLE_MASTER` | 全双工主机 |
| `TUYA_SPI_ROLE_SLAVE` | 全双工从机 |
| `TUYA_SPI_ROLE_MASTER_SIMPLEX` | 半双工主机 |
| `TUYA_SPI_ROLE_SLAVE_SIMPLEX` | 半双工从机 |

`mode` 选择上文所述四种时钟模式之一（`TUYA_SPI_MODE0` 至 `TUYA_SPI_MODE3`）。`type` 选择片选处理方式：

| 取值 | 说明 |
| --- | --- |
| `TUYA_SPI_AUTO_TYPE` | 硬件管理 SS（CS）引脚 |
| `TUYA_SPI_SOFT_TYPE` | 软件管理 SS 引脚 |
| `TUYA_SPI_SOFT_ONE_WIRE_TYPE` | 三线模式，MISO/MOSI 复用 |

`databits` 选择数据位宽：

| 取值 | 说明 |
| --- | --- |
| `TUYA_SPI_DATA_BIT8` | 8 位数据 |
| `TUYA_SPI_DATA_BIT16` | 16 位数据 |

`bitorder` 选择位序：

| 取值 | 说明 |
| --- | --- |
| `TUYA_SPI_ORDER_MSB2LSB` | 高位（MSB）在前 |
| `TUYA_SPI_ORDER_LSB2MSB` | 低位（LSB）在前 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h` 中 `OS_ADAPTER_SPI` 定义部分。

## tkl_spi_deinit

```c
OPERATE_RET tkl_spi_deinit(TUYA_SPI_NUM_E port);
```

反初始化一条 SPI 总线，停止该总线并释放其软硬件资源。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `port` | `TUYA_SPI_NUM_E` | SPI 总线索引。 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h` 中 `OS_ADAPTER_SPI` 定义部分。

## tkl_spi_send

```c
OPERATE_RET tkl_spi_send(TUYA_SPI_NUM_E port, void *data, uint32_t size);
```

在 SPI 总线上发送数据。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `port` | `TUYA_SPI_NUM_E` | SPI 总线索引。 |
| `data` | `void *` | 要发送的数据。 |
| `size` | `uint32_t` | 要发送的字节数。 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h` 中 `OS_ADAPTER_SPI` 定义部分。

## tkl_spi_recv

```c
OPERATE_RET tkl_spi_recv(TUYA_SPI_NUM_E port, void *data, uint32_t size);
```

在 SPI 总线上接收数据。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `port` | `TUYA_SPI_NUM_E` | SPI 总线索引。 |
| `data` | `void *` | 输出：接收数据的缓冲区。 |
| `size` | `uint32_t` | 要接收的字节数。 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h` 中 `OS_ADAPTER_SPI` 定义部分。

## tkl_spi_transfer

```c
OPERATE_RET tkl_spi_transfer(TUYA_SPI_NUM_E port, void *send_buf, void *receive_buf, uint32_t length);
```

执行全双工传输，一次收发相同字节数。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `port` | `TUYA_SPI_NUM_E` | SPI 总线索引。 |
| `send_buf` | `void *` | 要发送的数据。 |
| `receive_buf` | `void *` | 输出：接收数据的缓冲区。 |
| `length` | `uint32_t` | 要传输的字节数。 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h` 中 `OS_ADAPTER_SPI` 定义部分。

## tkl_spi_transfer_with_length

```c
OPERATE_RET tkl_spi_transfer_with_length(TUYA_SPI_NUM_E port, void *send_buf, uint32_t send_len, void *receive_buf, uint32_t receive_len);
```

以相互独立的发送和接收长度执行传输。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `port` | `TUYA_SPI_NUM_E` | SPI 总线索引。 |
| `send_buf` | `void *` | 要发送的数据。 |
| `send_len` | `uint32_t` | 要发送的字节数。 |
| `receive_buf` | `void *` | 输出：接收数据的缓冲区。 |
| `receive_len` | `uint32_t` | 要接收的字节数。 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h` 中 `OS_ADAPTER_SPI` 定义部分。

## tkl_spi_abort_transfer

```c
OPERATE_RET tkl_spi_abort_transfer(TUYA_SPI_NUM_E port);
```

中止正在进行的传输、发送或接收。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `port` | `TUYA_SPI_NUM_E` | SPI 总线索引。 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h` 中 `OS_ADAPTER_SPI` 定义部分。

## tkl_spi_get_status

```c
OPERATE_RET tkl_spi_get_status(TUYA_SPI_NUM_E port, TUYA_SPI_STATUS_T *status);
```

读取 SPI 总线的当前状态。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `port` | `TUYA_SPI_NUM_E` | SPI 总线索引。 |
| `status` | `TUYA_SPI_STATUS_T *` | 输出：总线状态。 |

状态结构体如下：

```c
typedef struct {
    uint32_t busy       : 1; // 收发忙标志（1 = 忙）
    uint32_t data_lost  : 1; // 接收溢出 / 发送欠载
    uint32_t mode_fault : 1; // 检测到模式错误
} TUYA_SPI_STATUS_T;
```

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h` 中 `OS_ADAPTER_SPI` 定义部分。

## tkl_spi_irq_init

```c
OPERATE_RET tkl_spi_irq_init(TUYA_SPI_NUM_E port, TUYA_SPI_IRQ_CB cb);
```

注册 SPI 中断回调。此调用不会使能中断，需随后调用 `tkl_spi_irq_enable`。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `port` | `TUYA_SPI_NUM_E` | SPI 总线索引。 |
| `cb` | `TUYA_SPI_IRQ_CB` | 中断回调。 |

回调类型如下：

```c
typedef void (*TUYA_SPI_IRQ_CB)(TUYA_SPI_NUM_E port, TUYA_SPI_IRQ_EVT_E event);
```

`event` 为 `TUYA_SPI_EVENT_TRANSFER_COMPLETE`、`TUYA_SPI_EVENT_TX_COMPLETE`、`TUYA_SPI_EVENT_RX_COMPLETE`、`TUYA_SPI_EVENT_DATA_LOST` 或 `TUYA_SPI_EVENT_MODE_FAULT` 之一。

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h` 中 `OS_ADAPTER_SPI` 定义部分。

## tkl_spi_irq_enable

```c
OPERATE_RET tkl_spi_irq_enable(TUYA_SPI_NUM_E port);
```

使能通过 `tkl_spi_irq_init` 注册的 SPI 中断。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `port` | `TUYA_SPI_NUM_E` | SPI 总线索引。 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h` 中 `OS_ADAPTER_SPI` 定义部分。

## tkl_spi_irq_disable

```c
OPERATE_RET tkl_spi_irq_disable(TUYA_SPI_NUM_E port);
```

失能 SPI 中断。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `port` | `TUYA_SPI_NUM_E` | SPI 总线索引。 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h` 中 `OS_ADAPTER_SPI` 定义部分。

## tkl_spi_get_data_count

```c
int32_t tkl_spi_get_data_count(TUYA_SPI_NUM_E port);
```

返回最近一次 `tkl_spi_send`、`tkl_spi_recv` 或 `tkl_spi_transfer` 操作传输的数据项数量。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `port` | `TUYA_SPI_NUM_E` | SPI 总线索引。 |

**返回值**：成功返回 `>= 0` 的计数，出错返回负值。

## tkl_spi_ioctl

```c
OPERATE_RET tkl_spi_ioctl(TUYA_SPI_NUM_E port, uint32_t cmd, void *args);
```

执行设备相关的控制操作。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `port` | `TUYA_SPI_NUM_E` | SPI 总线索引。 |
| `cmd` | `uint32_t` | 控制命令。 |
| `args` | `void *` | 命令对应的参数。 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h` 中 `OS_ADAPTER_SPI` 定义部分。

## tkl_spi_get_max_dma_data_length

```c
uint32_t tkl_spi_get_max_dma_data_length(void);
```

返回 `tkl_spi_send`、`tkl_spi_recv` 和 `tkl_spi_transfer` 所支持的最大 DMA 数据长度。

**返回值**：支持的最大 DMA 长度。

## 示例

主机模式，在操作之间轮询状态：

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

主机模式，使用中断驱动的事件处理：

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
