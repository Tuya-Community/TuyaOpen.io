---
title: "I2C 주변 가이드"
description: "TuyaOpen의 I2C 주변 가이드 : 마스터 모드에서 TKL I2C 버스를 구동, SCL / SDA 핀을 할당, 설정 속도, 및 장치 주소로 전송 / 수신 바이트."
keywords:
  - i2c
  - tkl_i2c
  - master mode
  - sensor bus
  - tuyaopen peripheral
---

TKL I2C 인터페이스는 센서, OLED 디스플레이, IO 확장기 및 기타 주변 장치를 위한 마스터 모드에서 I2C 버스를 구동한다. SCL/SDA 핀을 지정하고 선택한 속도로 버스를 초기화 한 다음 각 장치 주소에 대해 바이트를 보내고 수신합니다.

## 자주 묻는 질문
- 한국어[환경 설정](../../quick-start/enviroment-setup)
- I2C-capable 핀과 널`ENABLE_I2C=y`Kconfig에서

## I2C 에 TuyaOpen
TuyaOpen은 TKL 레이어를 통해 I2C 마스터 모드를 제공합니다. API는 모든 플랫폼 (T5AI, ESP32, Linux 등)과 동일합니다.

## 초기화
### 1. pinmux를 통해 할당 핀
I2C는 GPIO 0/1 (I2C0)와 GPIO 2/3 (I2C1)에 기본적으로 핀입니다. 당신의 널을 위한 Override:

```c
#include "tkl_pinmux.h"
#include "tkl_i2c.h"

tkl_io_pinmux_config(TUYA_GPIO_NUM_9, TUYA_IIC0_SCL);
tkl_io_pinmux_config(TUYA_GPIO_NUM_10, TUYA_IIC0_SDA);
```

### 2. 버스를 초기화
```c
TUYA_IIC_BASE_CFG_T i2c_cfg = {
    .role = TUYA_IIC_MODE_MASTER,
    .speed = TUYA_IIC_BUS_SPEED_400K,
    .addr_width = TUYA_IIC_ADDRESS_7BIT,
};
OPERATE_RET rt = tkl_i2c_init(TUYA_I2C_NUM_0, &i2c_cfg);
```

속도 옵션:`TUYA_IIC_BUS_SPEED_100K`, `TUYA_IIC_BUS_SPEED_400K`, `TUYA_IIC_BUS_SPEED_1M`( 하드웨어가 지원되는 경우).

## 읽기 및 쓰기
### 자주 묻는 질문
```c
UINT8_T buf[2] = { reg_addr, value };
tkl_i2c_master_send(TUYA_I2C_NUM_0, device_addr, buf, 2, TRUE);
```

마지막 모수 (`TRUE`) 전송 후 STOP 상태를 생성합니다.

### 자주 묻는 질문
```c
UINT8_T reg = 0x00;
UINT8_T data[2];
tkl_i2c_master_send(TUYA_I2C_NUM_0, device_addr, &reg, 1, FALSE);
tkl_i2c_master_receive(TUYA_I2C_NUM_0, device_addr, data, 2, TRUE);
```

제품 정보`FALSE`쓰기에 STOP에 대한 후속 읽기에 대한 반복된 START 생성.

## I2C 버스 검사
각 주소에서 읽는 것을 시도하여 연결된 장치를 위한 검사:

```c
for (UINT8_T addr = 0x08; addr < 0x78; addr++) {
    UINT8_T dummy;
    OPERATE_RET rt = tkl_i2c_master_receive(TUYA_I2C_NUM_0, addr, &dummy, 1, TRUE);
    if (rt == OPRT_OK) {
        TAL_PR_INFO("found device at 0x%02X", addr);
    }
}
```

이름 *[I2C 검사 예](https://github.com/tuya/TuyaOpen/tree/master/examples/peripherals/i2c/i2c_scan)SDK에서.

## 1개의 버스에 다수 장치
I2C는 다 장치 버스입니다. 다른 주소를 가진 다수 감지기는 동일한 SCL/SDA를 공유합니다:

```c
#define OLED_ADDR   0x3C
#define SENSOR_ADDR 0x44
#define EXPANDER_ADDR 0x20

tkl_i2c_master_send(TUYA_I2C_NUM_0, OLED_ADDR, oled_cmd, sizeof(oled_cmd), TRUE);
tkl_i2c_master_send(TUYA_I2C_NUM_0, SENSOR_ADDR, sensor_cmd, 2, TRUE);
tkl_i2c_master_send(TUYA_I2C_NUM_0, EXPANDER_ADDR, exp_cmd, 2, TRUE);
```

:::warning 주소 Conflicts
두 개의 장치가 동일한 I2C 주소를 공유하면 별도의 버스(I2C0 및 I2C1) 또는 I2C 다중화기를 필요로 합니다.
:::

## 계정 관리
|제품 정보|주요연혁|
|---------|--------|
|마스터 모드|지원되는|
|노예 모드|** 지원되지 않음 ** (`OPRT_NOT_SUPPORTED`) |
|10 비트 주소|지원되는 (set`addr_width = TUYA_IIC_ADDRESS_10BIT`) |
|버스 재설정 / ioctl|** 지원되지 않음 **|
|DMA 전송|플랫폼 의존 (TKL API로 투명)|

## TuyaOpen 프로젝트의 일반적인 I2C 장치
|제품정보|이름 *|제품정보|에 의해|
|--------|---------|------|---------|
|SHT3x (temp/습도)|0x44 / 0x45의|제품정보|I2C 센서 예|
|SSD1306 (OLED)|크기: 1x3C|제품정보|ESP32 빵 콤팩트, XingZhi 큐브|
|ES8311 (오디오 코덱)|0x18'실제 이름입|언어: 영어|DNESP32S3-BOX, 파셰어 AMOLED|
|ES8388 (오디오 코덱)|0x20의|언어: 영어|ESP32 빵 널, DNESP32S3|
|FT5x06 (터치)|크기: 1x3|제품정보|Waveshare AMOLED의 특징|
|XL9555 (IO 확장자)|0x20의|GPIO 확장기|DNESP32S3의 DNESP32S3-BOX|
|TCA9554 (IO 확장자)|0x20의|GPIO 확장기|Waveshare AMOLED의 특징|
|BMI270 (마이우)|0x68 / 0x69의|모션 센서|IMU 예제|

## 이름 *
- [새로운 센서 드라이버 작성](writing-sensor-driver)
- [TKL I2C API를](/docs/tkl-api/tkl_i2c)
- [TDD/TDL 드라이버 아키텍처](../driver-architecture)
- [I2C 센서 예](https://github.com/tuya/TuyaOpen/tree/master/examples/peripherals/i2c/sht3x_4x_sensor)
