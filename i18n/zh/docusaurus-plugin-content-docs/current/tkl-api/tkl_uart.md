---
title: tkl_uart | UART 驱动
description: "tkl_uart 参考 —— 提供端口初始化、数据读写、收发中断回调注册与流控的通用异步收发器 UART 驱动 TKL API。"
keywords:
  - tkl_uart
  - TuyaOpen UART 驱动
  - 串口通信
  - 嵌入式驱动
---

## 概述

UART（Universal Asynchronous Receiver/Transmitter，通用异步收发器）是一种用于异步通信的串行总线，支持双向通信，可实现全双工收发。

本驱动覆盖完整的 UART 生命周期：初始化端口，写入与读取数据，注册接收和发送中断回调，控制发送中断与接收流控，等待接收数据，以及下发控制命令。

每个函数都接受一个类型为 `TUYA_UART_NUM_E` 的 `port_id`：

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

在 Linux 平台上，`port_id` 的高 16 位还编码一个 `TUYA_UART_TYPE_E`（`TUYA_UART_SYS`、`TUYA_UART_USB`、`TUYA_UART_SDIO`、`TUYA_UART_WCH` 之一），低 16 位编码端口号。使用 `TUYA_UART_PORT_ID(port_type, port_num)` 宏构造该值，例如 `TUYA_UART_PORT_ID(TUYA_UART_SYS, 2)`。

## tkl_uart_init

```c
OPERATE_RET tkl_uart_init(TUYA_UART_NUM_E port_id, TUYA_UART_BASE_CFG_T *cfg);
```

根据基础配置初始化 UART 端口并返回结果。

参数：

- `port_id`：端口号。
- `cfg`：基础配置，包含波特率、奇偶校验、数据位、停止位和流控。

  ```c
  typedef struct {
      uint32_t                    baudrate;
      TUYA_UART_PARITY_TYPE_E     parity;
      TUYA_UART_DATA_LEN_E        databits;
      TUYA_UART_STOP_LEN_E        stopbits;
      TUYA_UART_FLOWCTRL_TYPE_E   flowctrl;
  } TUYA_UART_BASE_CFG_T;
  ```

  `TUYA_UART_PARITY_TYPE_E`：

  | 名称                         | 取值 | 说明     |
  | :--------------------------- | :--- | :------- |
  | `TUYA_UART_PARITY_TYPE_NONE` | `0`  | 无校验   |
  | `TUYA_UART_PARITY_TYPE_ODD`  | `1`  | 奇校验   |
  | `TUYA_UART_PARITY_TYPE_EVEN` | `2`  | 偶校验   |

  `TUYA_UART_DATA_LEN_E`：

  | 名称                      | 取值   | 说明        |
  | :------------------------ | :----- | :---------- |
  | `TUYA_UART_DATA_LEN_5BIT` | `0x05` | 5 位数据长度 |
  | `TUYA_UART_DATA_LEN_6BIT` | `0x06` | 6 位数据长度 |
  | `TUYA_UART_DATA_LEN_7BIT` | `0x07` | 7 位数据长度 |
  | `TUYA_UART_DATA_LEN_8BIT` | `0x08` | 8 位数据长度 |

  `TUYA_UART_STOP_LEN_E`：

  | 名称                         | 取值   | 说明        |
  | :--------------------------- | :----- | :---------- |
  | `TUYA_UART_STOP_LEN_1BIT`    | `0x01` | 1 位停止位   |
  | `TUYA_UART_STOP_LEN_1_5BIT1` | `0x02` | 1.5 位停止位 |
  | `TUYA_UART_STOP_LEN_2BIT`    | `0x03` | 2 位停止位   |

  `TUYA_UART_FLOWCTRL_TYPE_E`：

  | 名称                         | 取值 | 说明                  |
  | :--------------------------- | :--- | :-------------------- |
  | `TUYA_UART_FLOWCTRL_NONE`    | `0`  | 无流控                |
  | `TUYA_UART_FLOWCTRL_RTSCTS`  | `1`  | RTS/CTS 硬件流控       |
  | `TUYA_UART_FLOWCTRL_XONXOFF` | `2`  | XON/XOFF 软件流控      |
  | `TUYA_UART_FLOWCTRL_DTRDSR`  | `3`  | DTR/DSR 硬件流控       |

返回值：

- 成功返回 `OPRT_OK`，其他值请参考 `tuya_error_code.h`。

## tkl_uart_deinit

```c
OPERATE_RET tkl_uart_deinit(TUYA_UART_NUM_E port_id);
```

反初始化 UART 端口。该操作会停止 UART，结束正在进行的传输（如果有），并释放相关的软硬件资源。

参数：

- `port_id`：端口号。

返回值：

- 成功返回 `OPRT_OK`，其他值请参考 `tuya_error_code.h`。

## tkl_uart_write

```c
int tkl_uart_write(TUYA_UART_NUM_E port_id, void *buff, uint16_t len);
```

向 UART 端口写入数据。

参数：

- `port_id`：端口号。
- `buff`：要发送的数据缓冲区。
- `len`：要发送的数据长度。

返回值：

- 返回写入的字节数（`> 0`），出错时返回小于等于 `0` 的值。

## tkl_uart_rx_irq_cb_reg

```c
void tkl_uart_rx_irq_cb_reg(TUYA_UART_NUM_E port_id, TUYA_UART_IRQ_CB rx_cb);
```

使能 UART 接收中断并注册其回调。

参数：

- `port_id`：端口号。
- `rx_cb`：接收中断回调。`TUYA_UART_IRQ_CB` 定义如下：

  ```c
  typedef void (*TUYA_UART_IRQ_CB)(TUYA_UART_NUM_E port_id);
  ```

  其中 `port_id` 为触发中断的端口号。

返回值：

- 无。

## tkl_uart_tx_irq_cb_reg

```c
void tkl_uart_tx_irq_cb_reg(TUYA_UART_NUM_E port_id, TUYA_UART_IRQ_CB tx_cb);
```

注册 UART 发送中断回调。注册后表示数据通过中断异步发送：调用 `tkl_uart_write` 即可发起异步传输。

参数：

- `port_id`：端口号。
- `tx_cb`：发送中断回调。`TUYA_UART_IRQ_CB` 定义如下：

  ```c
  typedef void (*TUYA_UART_IRQ_CB)(TUYA_UART_NUM_E port_id);
  ```

  其中 `port_id` 为触发中断的端口号。

返回值：

- 无。

## tkl_uart_read

```c
int tkl_uart_read(TUYA_UART_NUM_E port_id, void *buff, uint16_t len);
```

从 UART 端口读取数据。

参数：

- `port_id`：端口号。
- `buff`：数据接收缓冲区。
- `len`：要读取的数据长度。

返回值：

- 返回读取的字节数（`>= 0`），出错时返回小于 `0` 的值。

## tkl_uart_set_tx_int

```c
OPERATE_RET tkl_uart_set_tx_int(TUYA_UART_NUM_E port_id, BOOL_T enable);
```

使能或禁用 UART 发送中断。

参数：

- `port_id`：端口号。
- `enable`：`TRUE` 使能发送中断，`FALSE` 禁用发送中断。

返回值：

- 成功返回 `OPRT_OK`，其他值请参考 `tuya_error_code.h`。

## tkl_uart_set_rx_flowctrl

```c
OPERATE_RET tkl_uart_set_rx_flowctrl(TUYA_UART_NUM_E port_id, BOOL_T enable);
```

使能或禁用 UART 接收流控。

参数：

- `port_id`：端口号。
- `enable`：`TRUE` 使能接收流控，`FALSE` 禁用接收流控。

返回值：

- 成功返回 `OPRT_OK`，其他值请参考 `tuya_error_code.h`。

## tkl_uart_wait_for_data

```c
OPERATE_RET tkl_uart_wait_for_data(TUYA_UART_NUM_E port_id, int timeout_ms);
```

等待接收数据就绪。

参数：

- `port_id`：端口号。
- `timeout_ms`：最大等待时间，单位毫秒。`-1` 表示无限阻塞，`0` 表示不阻塞，大于 `0` 为超时时间。

返回值：

- 成功返回 `OPRT_OK`，其他值请参考 `tuya_error_code.h`。

## tkl_uart_ioctl

```c
OPERATE_RET tkl_uart_ioctl(TUYA_UART_NUM_E port_id, uint32_t cmd, void *arg);
```

向 UART 端口下发控制命令。

参数：

- `port_id`：端口号。
- `cmd`：控制命令。

  `TUYA_UART_IOCTL_CMD_E`：

  | 名称                     | 取值   | 说明              |
  | :----------------------- | :----- | :---------------- |
  | `TUYA_UART_SUSPEND_CMD`  | `0`    | 挂起 UART         |
  | `TUYA_UART_RESUME_CMD`   | `1`    | 恢复 UART         |
  | `TUYA_UART_FLUSH_CMD`    | `2`    | 刷新 UART 缓冲     |
  | `TUYA_UART_RECONFIG_CMD` | `3`    | 重新配置 UART     |
  | `TUYA_UART_USER_CMD`     | `4`    | 用户自定义命令    |
  | `TUYA_UART_MAX_CMD`      | `1000` | 命令边界          |

- `arg`：对应控制命令的参数。

返回值：

- 成功返回 `OPRT_OK`，其他值请参考 `tuya_error_code.h`。

## 示例

### 轮询回环

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

### 中断驱动回环

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
