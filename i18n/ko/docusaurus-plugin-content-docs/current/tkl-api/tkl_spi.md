---
title: "tkl spi | SPI 드라이버"
description: "tkl spi reference — TuyaOpen SPI 드라이버 TKL API for master/slave init, send, receive, full-duplex transfer, 그리고 내장된 IoT 개발에서 콜백."
keywords:
  - tkl_spi
  - tuyaopen spi driver
  - tkl spi api
  - embedded spi driver
---

TKL SPI 인터페이스는 디스플레이, 플래시, 센서 및 기타 고속 주변 장치를위한 마스터 또는 노예 모드에서 SPI 버스를 구동합니다. 당신은 버스를 초기화 (`TUYA_SPI_NUM_E`) 역할, 시계 형태, 자료 폭 및 조금 순서로, 그 후에 보내, 받거나, 또는 중단 몬 사건 callbacks로 선택적으로 가득 차있 이중 이동 자료.

SPI는 4개의 선에 1개의 주인 및 1개 또는 더 노예를 가진 고속, 가득 차있 이중, 동시 버스입니다: MISO (slave 산출), MOSI (주인 산출), SCK (주인에서 시) 및 CS (slave 선택). 시계 형태는 시계 극성 (CPOL)와 시계 단계 (CPHA)를 결합합니다:

|주요 특징|CPOL/CPHA를 위해|Idle 시계|샘플링 가장자리|
| --- | --- | --- | --- |
| `TUYA_SPI_MODE0` | 0 / 0 |이름 *|투자정보|
| `TUYA_SPI_MODE1` | 0 / 1 |이름 *|뚱 베어|
| `TUYA_SPI_MODE2` | 1 / 0 |주요 특징|뚱 베어|
| `TUYA_SPI_MODE3` | 1 / 1 |주요 특징|투자정보|

마스터 및 주변 장치는 동일한 시계 모드를 사용해야합니다.

## 프로젝트
```c
OPERATE_RET tkl_spi_init(TUYA_SPI_NUM_E port, const TUYA_SPI_BASE_CFG_T *cfg);
```

주어진 역할, 시계 형태, 자료 폭 및 조금 순서를 가진 SPI 버스를 초기화하십시오.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `port` | `TUYA_SPI_NUM_E` |SPI 버스 인덱스, 시작`TUYA_SPI_NUM_0`. |
| `cfg` | `const TUYA_SPI_BASE_CFG_T *` |버스 구성.|

구성 구조는:

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

`role`버스 역할 선택:

|주요 특징|이름 *|
| --- | --- |
| `TUYA_SPI_ROLE_INACTIVE` |제품정보|
| `TUYA_SPI_ROLE_MASTER` |Full-duplex 마스터|
| `TUYA_SPI_ROLE_SLAVE` |풀 듀플렉스 노예|
| `TUYA_SPI_ROLE_MASTER_SIMPLEX` |반 듀플렉스 마스터|
| `TUYA_SPI_ROLE_SLAVE_SIMPLEX` |반 듀플렉스 노예|

`mode`4개의 시계 형태 중 하나를 선택합니다 (`TUYA_SPI_MODE0`으로`TUYA_SPI_MODE3`) 위에 묘사해.`type`칩 선택 취급을 선정하십시오:

|주요 특징|이름 *|
| --- | --- |
| `TUYA_SPI_AUTO_TYPE` |하드웨어 관리 SS (CS) 핀|
| `TUYA_SPI_SOFT_TYPE` |소프트웨어 관리 SS 핀|
| `TUYA_SPI_SOFT_ONE_WIRE_TYPE` |3 철사 형태, 다중 송신되는 MISO/MOSI|

`databits`데이터 너비 선택:

|주요 특징|이름 *|
| --- | --- |
| `TUYA_SPI_DATA_BIT8` |8 비트 데이터|
| `TUYA_SPI_DATA_BIT16` |16비트 데이터|

`bitorder`조금 순서를 선정하십시오:

|주요 특징|이름 *|
| --- | --- |
| `TUYA_SPI_ORDER_MSB2LSB` |MSB 먼저|
| `TUYA_SPI_ORDER_LSB2MSB` |LSB 첫 번째|

**리턴 **`OPRT_OK`성공에. 다른 값의 경우,`OS_ADAPTER_SPI`이름 *`tuya_error_code.h`.

## 프로젝트
```c
OPERATE_RET tkl_spi_deinit(TUYA_SPI_NUM_E port);
```

SPI 버스를 분리하고 소프트웨어 및 하드웨어 리소스를 해제합니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `port` | `TUYA_SPI_NUM_E` |SPI 버스 인덱스.|

**리턴 **`OPRT_OK`성공에. 다른 값의 경우,`OS_ADAPTER_SPI`이름 *`tuya_error_code.h`.

## 프로젝트
```c
OPERATE_RET tkl_spi_send(TUYA_SPI_NUM_E port, void *data, uint32_t size);
```

SPI 버스에 데이터를 보냅니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `port` | `TUYA_SPI_NUM_E` |SPI 버스 인덱스.|
| `data` | `void *` |전송하는 자료.|
| `size` | `uint32_t` |보낼 바이트 수.|

**리턴 **`OPRT_OK`성공에. 다른 값의 경우,`OS_ADAPTER_SPI`이름 *`tuya_error_code.h`.

## 파일 형식
```c
OPERATE_RET tkl_spi_recv(TUYA_SPI_NUM_E port, void *data, uint32_t size);
```

SPI 버스에 데이터를 수신합니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `port` | `TUYA_SPI_NUM_E` |SPI 버스 인덱스.|
| `data` | `void *` |산출: 주어진 자료를 위한 완충기.|
| `size` | `uint32_t` |받는 바이트 수.|

**리턴 **`OPRT_OK`성공에. 다른 값의 경우,`OS_ADAPTER_SPI`이름 *`tuya_error_code.h`.

## 프로젝트
```c
OPERATE_RET tkl_spi_transfer(TUYA_SPI_NUM_E port, void *send_buf, void *receive_buf, uint32_t length);
```

한 번에 바이트의 동일한 숫자를 전송, 전송 및 수신하는 전체 쌍 이동을 수행합니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `port` | `TUYA_SPI_NUM_E` |SPI 버스 인덱스.|
| `send_buf` | `void *` |전송하는 자료.|
| `receive_buf` | `void *` |산출: 주어진 자료를 위한 완충기.|
| `length` | `uint32_t` |전송할 바이트 수.|

**리턴 **`OPRT_OK`성공에. 다른 값의 경우,`OS_ADAPTER_SPI`이름 *`tuya_error_code.h`.

## tkl spi transfer with length의 길이
```c
OPERATE_RET tkl_spi_transfer_with_length(TUYA_SPI_NUM_E port, void *send_buf, uint32_t send_len, void *receive_buf, uint32_t receive_len);
```

독립적 인 전송을 수행하고 길이를받습니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `port` | `TUYA_SPI_NUM_E` |SPI 버스 인덱스.|
| `send_buf` | `void *` |전송하는 자료.|
| `send_len` | `uint32_t` |보낼 바이트 수.|
| `receive_buf` | `void *` |산출: 주어진 자료를 위한 완충기.|
| `receive_len` | `uint32_t` |받는 바이트 수.|

**리턴 **`OPRT_OK`성공에. 다른 값의 경우,`OS_ADAPTER_SPI`이름 *`tuya_error_code.h`.

## tkl spi abort transfer   전송
```c
OPERATE_RET tkl_spi_abort_transfer(TUYA_SPI_NUM_E port);
```

지속적인 전송, 전송, 또는 수신.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `port` | `TUYA_SPI_NUM_E` |SPI 버스 인덱스.|

**리턴 **`OPRT_OK`성공에. 다른 값의 경우,`OS_ADAPTER_SPI`이름 *`tuya_error_code.h`.

## 프로젝트
```c
OPERATE_RET tkl_spi_get_status(TUYA_SPI_NUM_E port, TUYA_SPI_STATUS_T *status);
```

SPI 버스의 현재 상태를 읽습니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `port` | `TUYA_SPI_NUM_E` |SPI 버스 인덱스.|
| `status` | `TUYA_SPI_STATUS_T *` |산출: 버스 상태.|

상태 구조는:

```c
typedef struct {
    uint32_t busy       : 1; // transmitter/receiver busy (1 = busy)
    uint32_t data_lost  : 1; // receive overflow / transmit underflow
    uint32_t mode_fault : 1; // mode fault detected
} TUYA_SPI_STATUS_T;
```

**리턴 **`OPRT_OK`성공에. 다른 값의 경우,`OS_ADAPTER_SPI`이름 *`tuya_error_code.h`.

## 프로젝트
```c
OPERATE_RET tkl_spi_irq_init(TUYA_SPI_NUM_E port, TUYA_SPI_IRQ_CB cb);
```

SPI 중단 콜백 등록 이 호출은 중단을 활성화하지 않습니다; 전화`tkl_spi_irq_enable`뒤로.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `port` | `TUYA_SPI_NUM_E` |SPI 버스 인덱스.|
| `cb` | `TUYA_SPI_IRQ_CB` |Interrupt 콜백.|

콜백 타입은:

```c
typedef void (*TUYA_SPI_IRQ_CB)(TUYA_SPI_NUM_E port, TUYA_SPI_IRQ_EVT_E event);
```

`event`중 하나`TUYA_SPI_EVENT_TRANSFER_COMPLETE`, `TUYA_SPI_EVENT_TX_COMPLETE`, `TUYA_SPI_EVENT_RX_COMPLETE`, `TUYA_SPI_EVENT_DATA_LOST`, 또는`TUYA_SPI_EVENT_MODE_FAULT`.

**리턴 **`OPRT_OK`성공에. 다른 값의 경우,`OS_ADAPTER_SPI`이름 *`tuya_error_code.h`.

## tkl spi irq enable의
```c
OPERATE_RET tkl_spi_irq_enable(TUYA_SPI_NUM_E port);
```

SPI가 등록된 상태에서 사용 가능`tkl_spi_irq_init`.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `port` | `TUYA_SPI_NUM_E` |SPI 버스 인덱스.|

**리턴 **`OPRT_OK`성공에. 다른 값의 경우,`OS_ADAPTER_SPI`이름 *`tuya_error_code.h`.

## tkl spi irq disable의 경우
```c
OPERATE_RET tkl_spi_irq_disable(TUYA_SPI_NUM_E port);
```

SPI 중단을 비활성화합니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `port` | `TUYA_SPI_NUM_E` |SPI 버스 인덱스.|

**리턴 **`OPRT_OK`성공에. 다른 값의 경우,`OS_ADAPTER_SPI`이름 *`tuya_error_code.h`.

## tkl spi get data count에 대해
```c
int32_t tkl_spi_get_data_count(TUYA_SPI_NUM_E port);
```

가장 최근의 데이터 항목의 번호를 반환`tkl_spi_send`, `tkl_spi_recv`, 또는`tkl_spi_transfer`작업.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `port` | `TUYA_SPI_NUM_E` |SPI 버스 인덱스.|

** 카운트 **`>= 0`성공에, 또는 오류에 부정적인 값.

## 프로젝트
```c
OPERATE_RET tkl_spi_ioctl(TUYA_SPI_NUM_E port, uint32_t cmd, void *args);
```

Device-specific 제어 작업을 수행합니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `port` | `TUYA_SPI_NUM_E` |SPI 버스 인덱스.|
| `cmd` | `uint32_t` |제어 명령.|
| `args` | `void *` |명령과 관련된 Argument.|

**리턴 **`OPRT_OK`성공에. 다른 값의 경우,`OS_ADAPTER_SPI`이름 *`tuya_error_code.h`.

## tkl spi get max dma data length의 경우
```c
uint32_t tkl_spi_get_max_dma_data_length(void);
```

최대 DMA 데이터 길이를 반환합니다.`tkl_spi_send`, `tkl_spi_recv`·`tkl_spi_transfer`.

**Returns** 지원되는 최대 DMA 길이.

## 이름 *
마스터 모드, 작업 사이의 상태를 polling:

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

중단된 사건 취급을 가진 주된 형태:

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
