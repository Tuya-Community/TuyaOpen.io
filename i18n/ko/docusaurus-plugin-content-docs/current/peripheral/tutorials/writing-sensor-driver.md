---
title: "새로운 I2C 센서 드라이버 작성"
description: "TuyaOpen의 새로운 I2C 센서 드라이버를 작성하십시오. TKL I2C 버스를 통해 칩을 읽고 SHT3x를 콘크리트 예로 사용하여 응용 프로그램에 결과를 노출하십시오."
keywords:
  - i2c sensor driver
  - sht3x
  - tkl_i2c
  - sensor
  - tuyaopen peripheral
---

TuyaOpen의 I2C 센서 드라이버는 TKL I2C 버스를 통해 칩을 읽었으며 플랫폼 전반에 걸쳐 응용 프로그램에 결과를 노출시킵니다. 이 튜토리얼은 SHT3x 온도 / 습도 센서를 콘크리트 예로 사용하여 단계별로 새로운 I2C 센서 (온도, 습도, IMU, 압력) 단계를 통합합니다.

## 자주 묻는 질문
- 한국어[환경 설정](../../quick-start/enviroment-setup)
- I2C 기본 이해 (주소, 읽기/쓰기, 등록)
- Sensor datasheet 와 등록 맵

## 제품 정보
- TuyaOpen SDK 복제 및 환경 설정
- 개발 보드 (T5AI, ESP32-S3, 또는 지원되는 플랫폼)
- I2C 감지기 단위 (예를들면, SHT30/SHT31, BME280, BMP280, MPU6050)
- 점퍼 와이어, 밀가루

## TDL/TDD 대 직접 TKL를 사용하는 경우
|계정 관리|이용 시|이름 *|
|----------|-------------|---------|
|** 직접 TKL I2C **|간단한 센서, 원오프 읽기, 프로토 타이핑|SHT3x의 BME280, BMP280|
|** 전체 TDL/TDD **|보드, 복잡한 수명주기를 통해 공유 가능한 드라이버|디스플레이 패널, 오디오 코덱, 터치 컨트롤러|

대부분의 I2C 센서는 직접 TKL 통화로 잘 작동합니다. 장치 등록, 여러 인스턴스 또는 보드 레벨 요약이 필요할 때 TDL / TDD 패턴을 사용하십시오.

## 한국어
### 단계 1: I2C 핀 구성
I2C 버스를 설치`tkl_io_pinmux_config()`초기화하기 전에:

```c
#include "tkl_i2c.h"
#include "tkl_pinmux.h"

#define SENSOR_I2C_PORT  TUYA_I2C_NUM_0
#define SENSOR_SCL_PIN   TUYA_GPIO_NUM_9
#define SENSOR_SDA_PIN   TUYA_GPIO_NUM_10

static OPERATE_RET sensor_i2c_init(void)
{
    tkl_io_pinmux_config(SENSOR_SCL_PIN, TUYA_IIC0_SCL);
    tkl_io_pinmux_config(SENSOR_SDA_PIN, TUYA_IIC0_SDA);

    TUYA_IIC_BASE_CFG_T cfg = {
        .role = TUYA_IIC_MODE_MASTER,
        .speed = TUYA_IIC_BUS_SPEED_400K,
        .addr_width = TUYA_IIC_ADDRESS_7BIT,
    };
    return tkl_i2c_init(SENSOR_I2C_PORT, &cfg);
}
```

### 2 단계 : 센서 읽기 기능을 쓰기
SHT3x의 경우 측정 명령은`0x2400`(높은 반복성, 시계 기지개 없음). 센서는 6 바이트를 반환합니다 : 2 온도 + 1 CRC + 2 습도 + 1 CRC.

```c
#define SHT3X_ADDR      0x44
#define SHT3X_CMD_MEAS  0x2400

static OPERATE_RET sht3x_read(float *temperature, float *humidity)
{
    UINT8_T cmd[2] = { (SHT3X_CMD_MEAS >> 8), (SHT3X_CMD_MEAS & 0xFF) };
    UINT8_T data[6] = {0};
    OPERATE_RET rt;

    rt = tkl_i2c_master_send(SENSOR_I2C_PORT, SHT3X_ADDR, cmd, 2, TRUE);
    if (rt != OPRT_OK) {
        return rt;
    }

    tal_system_sleep(20);

    rt = tkl_i2c_master_receive(SENSOR_I2C_PORT, SHT3X_ADDR, data, 6, TRUE);
    if (rt != OPRT_OK) {
        return rt;
    }

    UINT16_T raw_temp = (data[0] << 8) | data[1];
    UINT16_T raw_humi = (data[3] << 8) | data[4];

    *temperature = -45.0f + 175.0f * ((float)raw_temp / 65535.0f);
    *humidity = 100.0f * ((float)raw_humi / 65535.0f);

    return OPRT_OK;
}
```

### 3 단계 : 정기적인 읽기 작업을 작성
```c
#include "tal_thread.h"
#include "tal_log.h"

static void sensor_task(void *arg)
{
    float temp, humi;

    sensor_i2c_init();

    while (1) {
        if (sht3x_read(&temp, &humi) == OPRT_OK) {
            TAL_PR_INFO("temp: %.2f C, humidity: %.2f %%", temp, humi);
        } else {
            TAL_PR_ERR("sensor read failed");
        }
        tal_system_sleep(2000);
    }
}

void tuya_app_main(void)
{
    THREAD_HANDLE handle;
    THREAD_CFG_T cfg = {
        .thrdname = "sensor",
        .stackDepth = 4096,
        .priority = THREAD_PRIO_3,
    };
    tal_thread_create_and_start(&handle, NULL, NULL, sensor_task, NULL, &cfg);
}
```

### 단계 4: 당신의 프로젝트에 추가
프로젝트 구조 만들기:

```
apps/my_sensor_app/
├── CMakeLists.txt
├── src/
│   └── tuya_main.c        (contains tuya_app_main + sensor code)
├── include/
│   └── sht3x.h            (optional: separate header)
├── config/
│   └── ESP32-S3.config     (or your board config)
└── Kconfig
```

`CMakeLists.txt`:

```cmake
set(APP_NAME my_sensor_app)
```

보드 설정에서 I2C 활성화:

```
CONFIG_ENABLE_I2C=y
```

### 5 단계 : 빌드 및 테스트
```bash
cd apps/my_sensor_app
tos.py config choice       # Select your board
tos.py build
tos.py flash
tos.py monitor
```

예상된 산출:

```
[01-01 00:00:02 TUYA I][tuya_main.c:xx] temp: 25.43 C, humidity: 48.21 %
[01-01 00:00:04 TUYA I][tuya_main.c:xx] temp: 25.51 C, humidity: 47.89 %
```

## CRC 검증 추가
생산 부호는 CRC-8 바이트를 유효해야 합니다:

```c
static UINT8_T sht3x_crc8(UINT8_T *data, UINT8_T len)
{
    UINT8_T crc = 0xFF;
    for (UINT8_T i = 0; i < len; i++) {
        crc ^= data[i];
        for (UINT8_T bit = 0; bit < 8; bit++) {
            crc = (crc & 0x80) ? (crc << 1) ^ 0x31 : (crc << 1);
        }
    }
    return crc;
}

if (sht3x_crc8(&data[0], 2) != data[2] ||
    sht3x_crc8(&data[3], 2) != data[5]) {
    return OPRT_CRC32_FAILED;
}
```

## 크로스 플랫폼 고려
이 센서 코드는 TKL I2C API를 사용하므로 휴대용입니다. 동일한 코드는 T5AI, ESP32, Raspberry Pi 및 기타 플랫폼에서 실행됩니다. - 핀 번호 만 변경됩니다.

핀 번호 구성을 만들기 위해, Kconfig를 사용:

```kconfig
config SENSOR_I2C_PORT
    int "I2C port"
    default 0

config SENSOR_SCL_PIN
    int "SCL pin"
    default 9

config SENSOR_SDA_PIN
    int "SDA pin"
    default 10
```

## 센서 데이터를 Tuya Cloud로 전송 (선택 사항)
Tuya Cloud 데이터 포인트로 센서 데이터를 보고하려면:

```c
#include "tuya_iot.h"

OPERATE_RET report_sensor_data(float temp, float humi)
{
    dp_obj_t dp_temp = {
        .dpid = 1,
        .type = PROP_VALUE,
        .value.dp_value = (int)(temp * 10),
    };
    dp_obj_t dp_humi = {
        .dpid = 2,
        .type = PROP_VALUE,
        .value.dp_value = (int)(humi * 10),
    };

    return dev_report_dp_json_async(NULL, &dp_temp, 1);
    return dev_report_dp_json_async(NULL, &dp_humi, 1);
}
```

이것은 DP 정의와 일치하는 Tuya Cloud 제품을 요구합니다. 이름 *[새로운 제품 만들기](../../cloud/tuya-cloud/creating-new-product).

## 이름 *
- [TDD/TDL 드라이버 아키텍처](../driver-architecture)
- [센서 라이브러리 마이그레이션](migrating-sensor-driver)
- [I2C 주변 가이드](i2c-guide)
- [TKL I2C API를](/docs/tkl-api/tkl_i2c)
- [repo에서 SHT3x 예제](https://github.com/tuya/TuyaOpen/tree/master/examples/peripherals/i2c/sht3x_4x_sensor)
