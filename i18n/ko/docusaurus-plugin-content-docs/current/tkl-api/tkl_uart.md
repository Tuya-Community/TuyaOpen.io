---
title: tkl uart | UART 드라이버
description: "tkl uart reference — TuyaOpen UART TKL API for port init, read/write, rx/tx callbacks, flow control, and control commands in Embedded IoT 개발."
keywords:
  - tkl_uart
  - tuyaopen uart driver
  - tkl uart api
  - embedded uart driver
---

## 제품정보
UART (Universal Asynchronous Receiver/Transmitter)는 비동기적인 커뮤니케이션을 위한 직렬 버스입니다. 양방향이며 전체 듀플렉스 전송 및 수신을 지원합니다.

이 드라이버는 전체 UART 라이프 사이클을 다룹니다: 포트를 초기화, 쓰기 및 읽기 데이터, 등록 수신 및 전송 중단 콜백, 전송 중단을 제어하고 흐름 제어를 수신, 들어오는 데이터에 대한 대기, 및 문제 제어 명령.

모든 함수는`port_id`유형의`TUYA_UART_NUM_E`:

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

리눅스에서, 높은 16 비트의`port_id`또한 인코딩`TUYA_UART_TYPE_E`(하나의)`TUYA_UART_SYS`, `TUYA_UART_USB`, `TUYA_UART_SDIO`, `TUYA_UART_WCH`) 그리고 낮은 16 조금은 항구 수를 암호로 합니다. 그런 값을`TUYA_UART_PORT_ID(port_type, port_num)`예를 들어,`TUYA_UART_PORT_ID(TUYA_UART_SYS, 2)`.

## 프로젝트
```c
OPERATE_RET tkl_uart_init(TUYA_UART_NUM_E port_id, TUYA_UART_BASE_CFG_T *cfg);
```

기본 설정에서 UART 포트를 초기화하고 결과를 반환합니다.

모수:

- `port_id`: 포트 번호.
- `cfg`: 기본 구성 - 보드율, 패리티, 데이터 비트, 정지 비트, 및 유량 제어.

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

  |이름 *|주요 특징|이름 *|
  | :--------------------------- | :---- | :---------------- |
  | `TUYA_UART_PARITY_TYPE_NONE` | `0`   |이름 *|
  | `TUYA_UART_PARITY_TYPE_ODD`  | `1`   |Odd 패티|
  | `TUYA_UART_PARITY_TYPE_EVEN` | `2`   |저녁 식사|

  `TUYA_UART_DATA_LEN_E`:

  |이름 *|주요 특징|이름 *|
  | :------------------------ | :----- | :---------------- |
  | `TUYA_UART_DATA_LEN_5BIT` | `0x05` |5 비트 데이터 길이|
  | `TUYA_UART_DATA_LEN_6BIT` | `0x06` |6 비트 데이터 길이|
  | `TUYA_UART_DATA_LEN_7BIT` | `0x07` |7 비트 데이터 길이|
  | `TUYA_UART_DATA_LEN_8BIT` | `0x08` |8 비트 데이터 길이|

  `TUYA_UART_STOP_LEN_E`:

  |이름 *|주요 특징|이름 *|
  | :--------------------------- | :----- | :---------------- |
  | `TUYA_UART_STOP_LEN_1BIT`    | `0x01` |1개의 정지 조금|
  | `TUYA_UART_STOP_LEN_1_5BIT1` | `0x02` |1.5 정지 비트|
  | `TUYA_UART_STOP_LEN_2BIT`    | `0x03` |2개의 정지 조금|

  `TUYA_UART_FLOWCTRL_TYPE_E`:

  |이름 *|주요 특징|이름 *|
  | :--------------------------- | :---- | :--------------------------------- |
  | `TUYA_UART_FLOWCTRL_NONE`    | `0`   |유량 제어|
  | `TUYA_UART_FLOWCTRL_RTSCTS`  | `1`   |RTS/CTS 하드웨어 유량 제어|
  | `TUYA_UART_FLOWCTRL_XONXOFF` | `2`   |XON/XOFF 소프트웨어 흐름 제어|
  | `TUYA_UART_FLOWCTRL_DTRDSR`  | `3`   |DTR/DSR 하드웨어 유량 제어|

반환:

- `OPRT_OK`성공에. 다른 값의 경우, 참조`tuya_error_code.h`.

## 프로젝트
```c
OPERATE_RET tkl_uart_deinit(TUYA_UART_NUM_E port_id);
```

UART 포트를 분리합니다. UART를 중지하고 진행중인 모든 전송을 종료하고 관련 소프트웨어 및 하드웨어 리소스를 공개합니다.

모수:

- `port_id`: 포트 번호.

반환:

- `OPRT_OK`성공에. 다른 값의 경우, 참조`tuya_error_code.h`.

## tkl uart 쓰기
```c
int tkl_uart_write(TUYA_UART_NUM_E port_id, void *buff, uint16_t len);
```

UART 포트에 데이터 쓰기.

모수:

- `port_id`: 포트 번호.
- `buff`: 전송하는 데이터 버퍼.
- `len`: 전송하는 자료의 길이.

반환:

- 작성된 바이트 수 (`> 0`), 또는 가치 더 적은 보다는 또는 동등한 것`0`오류에.

## 프로젝트
```c
void tkl_uart_rx_irq_cb_reg(TUYA_UART_NUM_E port_id, TUYA_UART_IRQ_CB rx_cb);
```

UART는 중단을 받고 콜백을 등록할 수 있습니다.

모수:

- `port_id`: 포트 번호.
- `rx_cb`: 콜백을 수신합니다.`TUYA_UART_IRQ_CB`정의:

  ```c
  typedef void (*TUYA_UART_IRQ_CB)(TUYA_UART_NUM_E port_id);
  ```

이름 *`port_id`중단을 제기 한 포트입니다.

반환:

- 없음.

## tkl uart tx irq cb reg의
```c
void tkl_uart_tx_irq_cb_reg(TUYA_UART_NUM_E port_id, TUYA_UART_IRQ_CB tx_cb);
```

UART는 중지 콜백을 전송합니다. 데이터가 중단을 통해 비동기적으로 전송되는 것을 의미합니다. 호출`tkl_uart_write`비동기 전송을 시작합니다.

모수:

- `port_id`: 포트 번호.
- `tx_cb`: 콜백을 전달합니다.`TUYA_UART_IRQ_CB`정의:

  ```c
  typedef void (*TUYA_UART_IRQ_CB)(TUYA_UART_NUM_E port_id);
  ```

이름 *`port_id`중단을 제기 한 포트입니다.

반환:

- 없음.

## tkl uart 읽기
```c
int tkl_uart_read(TUYA_UART_NUM_E port_id, void *buff, uint16_t len);
```

UART 포트에서 데이터를 읽습니다.

모수:

- `port_id`: 포트 번호.
- `buff`: 버퍼 수신
- `len`: 읽는 자료의 길이.

반환:

- 바이트의 수 읽기 (`>= 0`), 또는 가치 더 적은 보다는`0`오류에.

## tkl uart set tx int에
```c
OPERATE_RET tkl_uart_set_tx_int(TUYA_UART_NUM_E port_id, BOOL_T enable);
```

UART 전송 중단을 활성화하거나 비활성화합니다.

모수:

- `port_id`: 포트 번호.
- `enable`: `TRUE`전달 중단을 활성화하려면`FALSE`그것을 비활성화합니다.

반환:

- `OPRT_OK`성공에. 다른 값의 경우, 참조`tuya_error_code.h`.

## tkl uart set rx flowctrl의 경우
```c
OPERATE_RET tkl_uart_set_rx_flowctrl(TUYA_UART_NUM_E port_id, BOOL_T enable);
```

UART를 사용하거나 비활성화하면 유량 제어가 가능합니다.

모수:

- `port_id`: 포트 번호.
- `enable`: `TRUE`유량 제어를받을 수 있습니다.`FALSE`그것을 비활성화합니다.

반환:

- `OPRT_OK`성공에. 다른 값의 경우, 참조`tuya_error_code.h`.

## tkl uart wait for data의 데이터
```c
OPERATE_RET tkl_uart_wait_for_data(TUYA_UART_NUM_E port_id, int timeout_ms);
```

수신된 데이터를 사용할 수 있습니다.

모수:

- `port_id`: 포트 번호.
- `timeout_ms`: 밀리 초의 최대 대기 시간.`-1`indefinitely 블록,`0`차단하지 않고 값이 더 큰`0`타임아웃입니다.

반환:

- `OPRT_OK`성공에. 다른 값의 경우, 참조`tuya_error_code.h`.

## 프로젝트
```c
OPERATE_RET tkl_uart_ioctl(TUYA_UART_NUM_E port_id, uint32_t cmd, void *arg);
```

UART 포트에 제어 명령을 발급합니다.

모수:

- `port_id`: 포트 번호.
- `cmd`: 제어 명령.

  `TUYA_UART_IOCTL_CMD_E`:

  |이름 *|주요 특징|이름 *|
  | :----------------------- | :----- | :--------------------- |
  | `TUYA_UART_SUSPEND_CMD`  | `0`    |UART 소개|
  | `TUYA_UART_RESUME_CMD`   | `1`    |UART 소개|
  | `TUYA_UART_FLUSH_CMD`    | `2`    |UART 버퍼|
  | `TUYA_UART_RECONFIG_CMD` | `3`    |UART 설정|
  | `TUYA_UART_USER_CMD`     | `4`    |사용자 정의 명령|
  | `TUYA_UART_MAX_CMD`      | `1000` |명령 경계|

- `arg`: 제어 명령의 Argument.

반환:

- `OPRT_OK`성공에. 다른 값의 경우, 참조`tuya_error_code.h`.

## 이름 *
### 오염된 루프백
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

### Interrupt 구동 루프백
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
