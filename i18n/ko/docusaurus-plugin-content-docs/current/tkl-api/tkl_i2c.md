---
title: "tkl i2c | I2C 드라이버"
description: "tkl i2c 참고 — TuyaOpen I2C 드라이버 TKL API for master/slave bus init, send, receive, and interrupt callbacks in Embedded IoT 개발."
keywords:
  - tkl_i2c
  - tuyaopen i2c driver
  - tkl i2c api
  - embedded i2c driver
---

TKL I2C 인터페이스는 센서, 디스플레이, IO 확장기 및 기타 주변 장치를위한 마스터 또는 노예로 I2C 버스를 구동합니다. 당신은 버스를 초기화 (`TUYA_I2C_NUM_E`) 역할, 속도 및 주소 폭을 가진, 그 후에 각 장치 주소, 선택적으로 중단 몬 사건 callbacks에 대하여 바이트를 보내고 받으십시오.

I2C는 두 배 철사 동시 직렬 버스입니다: 양방향 데이터 선 (SDA)와 모든 장치에 의해 공유되는 시계 선 (SCL). 마스터는 시계를 생성, 시작 및 중지 조건을 문제, 그리고 각각의 노예를 고유 7 비트 또는 10 비트 주소. 시작 상태 후에, 모든 노예는 그것의 자신의에 대하여 버스에 주소를 비교하고 일치한 장치는 반응합니다.

## 사이트맵
```c
OPERATE_RET tkl_i2c_init(TUYA_I2C_NUM_E port, const TUYA_IIC_BASE_CFG_T *cfg);
```

주어진 역할, 속도 및 주소 폭을 가진 I2C 버스를 초기화하십시오.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `port` | `TUYA_I2C_NUM_E` |I2C 버스 인덱스, 시작`TUYA_I2C_NUM_0`. |
| `cfg` | `const TUYA_IIC_BASE_CFG_T *` |버스 구성.|

구성 구조는:

```c
typedef struct {
    TUYA_IIC_ROLE_E      role;
    TUYA_IIC_SPEED_E     speed;
    TUYA_IIC_ADDR_MODE_E addr_width;
} TUYA_IIC_BASE_CFG_T;
```

`role`버스 역할 선택:

|주요 특징|이름 *|
| --- | --- |
| `TUYA_IIC_MODE_MASTER` |마스터 모드|
| `TUYA_IIC_MODE_SLAVE` |노예 모드|

`speed`버스 속도 선택:

|주요 특징|이름 *|
| --- | --- |
| `TUYA_IIC_BUS_SPEED_100K` |표준 속도 (100 kHz)|
| `TUYA_IIC_BUS_SPEED_400K` |빠른 속도 (400 kHz)|
| `TUYA_IIC_BUS_SPEED_1M` |빠른 속도 (1 MHz)|
| `TUYA_IIC_BUS_SPEED_3_4M` |고속 (3.4 MHz)|

`addr_width`주소 모드 선택:

|주요 특징|이름 *|
| --- | --- |
| `TUYA_IIC_ADDRESS_7BIT` |7 비트 주소 모드|
| `TUYA_IIC_ADDRESS_10BIT` |10 비트 주소 모드|

**리턴 **`OPRT_OK`성공에. 다른 값의 경우,`OS_ADAPTER_I2C`이름 *`tuya_error_code.h`.

## 사이트맵
```c
OPERATE_RET tkl_i2c_deinit(TUYA_I2C_NUM_E port);
```

I2C 버스를 분리하고 소프트웨어 및 하드웨어 리소스를 중지합니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `port` | `TUYA_I2C_NUM_E` |I2C 버스 색인.|

**리턴 **`OPRT_OK`성공에. 다른 값의 경우,`OS_ADAPTER_I2C`이름 *`tuya_error_code.h`.

## tkl i2c irq init의 경우
```c
OPERATE_RET tkl_i2c_irq_init(TUYA_I2C_NUM_E port, TUYA_I2C_IRQ_CB cb);
```

I2C 중단 콜백 등록 이 호출은 중단을 활성화하지 않습니다; 전화`tkl_i2c_irq_enable`뒤로.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `port` | `TUYA_I2C_NUM_E` |I2C 버스 색인.|
| `cb` | `TUYA_I2C_IRQ_CB` |Interrupt 콜백.|

콜백 타입은:

```c
typedef void (*TUYA_I2C_IRQ_CB)(TUYA_I2C_NUM_E port, TUYA_IIC_IRQ_EVT_E event);
```

`event`다음 중 하나입니다:

|주요 특징|이름 *|
| --- | --- |
| `TUYA_IIC_EVENT_TRANSFER_DONE` |전송 완료|
| `TUYA_IIC_EVENT_TRANSFER_INCOMPLETE` |로그인|
| `TUYA_IIC_EVENT_SLAVE_TRANSMIT` |노예 전송 요청|
| `TUYA_IIC_EVENT_SLAVE_RECEIVE` |노예 요청|
| `TUYA_IIC_EVENT_ADDRESS_NACK` |노예에 의해 인정되지 않는 주소|
| `TUYA_IIC_EVENT_GENERAL_CALL` |일반 전화 (주소 0) 수신|
| `TUYA_IIC_EVENT_ARBITRATION_LOST` |마스터 분실 중재|
| `TUYA_IIC_EVENT_BUS_ERROR` |버스 오류 검출|
| `TUYA_IIC_EVENT_BUS_CLEAR` |버스 명확한 완성|

**리턴 **`OPRT_OK`성공에. 다른 값의 경우,`OS_ADAPTER_I2C`이름 *`tuya_error_code.h`.

## tkl i2c irq enable의 경우
```c
OPERATE_RET tkl_i2c_irq_enable(TUYA_I2C_NUM_E port);
```

I2C 중단을 등록할 수 있습니다.`tkl_i2c_irq_init`.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `port` | `TUYA_I2C_NUM_E` |I2C 버스 색인.|

**리턴 **`OPRT_OK`성공에. 다른 값의 경우,`OS_ADAPTER_I2C`이름 *`tuya_error_code.h`.

## tkl i2c irq disable의 경우
```c
OPERATE_RET tkl_i2c_irq_disable(TUYA_I2C_NUM_E port);
```

I2C 중단을 비활성화합니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `port` | `TUYA_I2C_NUM_E` |I2C 버스 색인.|

**리턴 **`OPRT_OK`성공에. 다른 값의 경우,`OS_ADAPTER_I2C`이름 *`tuya_error_code.h`.

## tkl i2c master send의
```c
OPERATE_RET tkl_i2c_master_send(TUYA_I2C_NUM_E port, uint16_t dev_addr, const void *data, uint32_t size, BOOL_T xfer_pending);
```

버스가 마스터 모드에서 있을 때 노예에 데이터를 보냅니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `port` | `TUYA_I2C_NUM_E` |I2C 버스 색인.|
| `dev_addr` | `uint16_t` |노예 장치 주소.|
| `data` | `const void *` |전송하는 자료.|
| `size` | `uint32_t` |보낼 바이트 수.|
| `xfer_pending` | `BOOL_T` | `TRUE`버스를 지키려면 (정지 조건 없음),`FALSE`정지 상태를 보내려면.|

**리턴 **`OPRT_OK`성공에. 다른 값의 경우,`OS_ADAPTER_I2C`이름 *`tuya_error_code.h`.

## tkl i2c master receive의
```c
OPERATE_RET tkl_i2c_master_receive(TUYA_I2C_NUM_E port, uint16_t dev_addr, void *data, uint32_t size, BOOL_T xfer_pending);
```

버스가 마스터 모드에서 있을 때 노예로부터 데이터를 수신합니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `port` | `TUYA_I2C_NUM_E` |I2C 버스 색인.|
| `dev_addr` | `uint16_t` |노예 장치 주소.|
| `data` | `void *` |산출: 주어진 자료를 위한 완충기.|
| `size` | `uint32_t` |받는 바이트 수.|
| `xfer_pending` | `BOOL_T` | `TRUE`버스를 지키려면 (정지 조건 없음),`FALSE`정지 상태를 보내려면.|

**리턴 **`OPRT_OK`성공에. 다른 값의 경우,`OS_ADAPTER_I2C`이름 *`tuya_error_code.h`.

## tkl i2c set slave addr에
```c
OPERATE_RET tkl_i2c_set_slave_addr(TUYA_I2C_NUM_E port, uint16_t dev_addr);
```

버스가 노예로 작동 할 때 사용되는 장치 주소를 설정합니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `port` | `TUYA_I2C_NUM_E` |I2C 버스 색인.|
| `dev_addr` | `uint16_t` |응답 할 노예 주소.|

**리턴 **`OPRT_OK`성공에. 다른 값의 경우,`OS_ADAPTER_I2C`이름 *`tuya_error_code.h`.

## 프로젝트
```c
OPERATE_RET tkl_i2c_slave_send(TUYA_I2C_NUM_E port, const void *data, uint32_t size);
```

버스가 노예 모드에서 있을 때 데이터를 전송합니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `port` | `TUYA_I2C_NUM_E` |I2C 버스 색인.|
| `data` | `const void *` |전송하는 자료.|
| `size` | `uint32_t` |보낼 바이트 수.|

**리턴 **`OPRT_OK`성공에. 다른 값의 경우,`OS_ADAPTER_I2C`이름 *`tuya_error_code.h`.

## tkl i2c slave receive의
```c
OPERATE_RET tkl_i2c_slave_receive(TUYA_I2C_NUM_E port, void *data, uint32_t size);
```

버스가 노예 모드에서 있을 때 데이터를 수신합니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `port` | `TUYA_I2C_NUM_E` |I2C 버스 색인.|
| `data` | `void *` |산출: 주어진 자료를 위한 완충기.|
| `size` | `uint32_t` |받는 바이트 수.|

**리턴 **`OPRT_OK`성공에. 다른 값의 경우,`OS_ADAPTER_I2C`이름 *`tuya_error_code.h`.

## tkl i2c get status의
```c
OPERATE_RET tkl_i2c_get_status(TUYA_I2C_NUM_E port, TUYA_IIC_STATUS_T *status);
```

I2C 버스의 현재 상태를 읽습니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `port` | `TUYA_I2C_NUM_E` |I2C 버스 색인.|
| `status` | `TUYA_IIC_STATUS_T *` |산출: 버스 상태.|

상태 구조는:

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

**리턴 **`OPRT_OK`성공에. 다른 값의 경우,`OS_ADAPTER_I2C`이름 *`tuya_error_code.h`.

## tkl i2c reset의 경우
```c
OPERATE_RET tkl_i2c_reset(TUYA_I2C_NUM_E port);
```

I2C 버스를 재설정합니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `port` | `TUYA_I2C_NUM_E` |I2C 버스 색인.|

**리턴 **`OPRT_OK`성공에. 다른 값의 경우,`OS_ADAPTER_I2C`이름 *`tuya_error_code.h`.

## tkl i2c get data count의 경우
```c
int32_t tkl_i2c_get_data_count(TUYA_I2C_NUM_E port);
```

가장 최근의 작업에 의해 전송 된 데이터 항목의 번호를 반환합니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `port` | `TUYA_I2C_NUM_E` |I2C 버스 색인.|

** 카운트 **`>= 0`성공에, 또는 오류에 부정적인 값. 카운트는 전송된 바이트이며 인정됩니다.`tkl_i2c_master_send`, 받아지는`tkl_i2c_master_receive`, 전송`tkl_i2c_slave_send`, 그리고 받아지고 인정하는`tkl_i2c_slave_receive`.

## 사이트맵
```c
OPERATE_RET tkl_i2c_ioctl(TUYA_I2C_NUM_E port, uint32_t cmd, void *args);
```

Device-specific 제어 작업을 수행합니다. 예를 들어,`I2C_IOCTL_SET_REGADDR_WIDTH`등록 주소 너비 설정`REGADDR_WIDTH_T`인수.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `port` | `TUYA_I2C_NUM_E` |I2C 버스 색인.|
| `cmd` | `uint32_t` |제어 명령.|
| `args` | `void *` |명령과 관련된 Argument.|

**리턴 **`OPRT_OK`성공에. 다른 값의 경우,`OS_ADAPTER_I2C`이름 *`tuya_error_code.h`.

## 이름 *
중단 콜백이있는 마스터 모드 :

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

노예 모드, 완료를 기다리는 상태를 polling:

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

## 더 보기
- [I2C 주변 가이드](../peripheral/tutorials/i2c-guide)
