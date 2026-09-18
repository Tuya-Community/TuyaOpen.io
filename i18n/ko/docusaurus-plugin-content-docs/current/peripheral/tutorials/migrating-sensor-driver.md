---
title: "센서 라이브러리를 TuyaOpen로 마이그레이션"
description: "센서 라이브러리를 TuyaOpen에 마이그레이션: 등록 및 응용 논리 정수를 유지하면서 TKL API에 대한 Arduino 또는 ESP-IDF 버스 레이어를 교환."
keywords:
  - sensor driver
  - migration
  - arduino
  - esp-idf
  - tuyaopen
---

센서 라이브러리를 마이그레이션하는 것은 TuyaOpen의 TKL API에 대한 버스 레이어를 스왑하여 등록 및 응용 논리 정수를 유지하면서 드라이버는 모든 지원 플랫폼에서 실행됩니다. 이 가이드는 기존 Arduino 또는 ESP-IDF 라이브러리를 포트합니다.

## 자주 묻는 질문
- 한국어[환경 설정](../../quick-start/enviroment-setup)
- 지원하다[TDD/TDL 드라이버 아키텍처](../driver-architecture)
- 포트 (Arduino, ESP-IDF 또는 일반 C)로 원하는 기존 센서 라이브러리

## 제품 정보
- TuyaOpen SDK 복제 및 환경 설정
- 센서 라이브러리의 소스 코드
- 센서 데이터시트

## Migration 전략
대부분의 감지기 도서관에는 3개의 층이 있습니다:

1. **버스 요약** -- 아르두노`Wire.h`또는 ESP-IDF`i2c_master_*`
2. **등록 ** -- 읽기/쓰기 칩 등록
3. **Application logic** -- 측정, 교정, 변환

레이어 1을 대체 할 필요가 있습니다. 레이어 2 및 3 같은 유지.

## Step-by-Step: BME280 Arduino 라이브러리를 포트링
### 1 단계 : 버스 통화 식별
전형적인 Arduino 도서관에서:

```cpp
Wire.beginTransmission(addr);
Wire.write(reg);
Wire.endTransmission();
Wire.requestFrom(addr, len);
while (Wire.available()) { data[i++] = Wire.read(); }
```

### 단계 2: TKL I2C 래퍼 만들기
TuyaOpen 동등물과 와이어 통화를 대체 :

```c
#include "tkl_i2c.h"

#define BME280_I2C_PORT  TUYA_I2C_NUM_0
#define BME280_ADDR      0x76

static OPERATE_RET bme280_read_reg(UINT8_T reg, UINT8_T *buf, UINT8_T len)
{
    OPERATE_RET rt;
    rt = tkl_i2c_master_send(BME280_I2C_PORT, BME280_ADDR, &reg, 1, FALSE);
    if (rt != OPRT_OK) {
        return rt;
    }
    return tkl_i2c_master_receive(BME280_I2C_PORT, BME280_ADDR, buf, len, TRUE);
}

static OPERATE_RET bme280_write_reg(UINT8_T reg, UINT8_T value)
{
    UINT8_T buf[2] = { reg, value };
    return tkl_i2c_master_send(BME280_I2C_PORT, BME280_ADDR, buf, 2, TRUE);
}
```

### 단계 3: init를 항구하고 기능을 읽으십시오
본래 구경측정을 지키십시오. I/O만 대체하십시오:

```c
static OPERATE_RET bme280_init(void)
{
    UINT8_T chip_id;
    OPERATE_RET rt = bme280_read_reg(0xD0, &chip_id, 1);
    if (rt != OPRT_OK || chip_id != 0x60) {
        return OPRT_COM_ERROR;
    }

    bme280_write_reg(0xF2, 0x01);  /* humidity oversampling x1 */
    bme280_write_reg(0xF4, 0x27);  /* temp+pressure oversampling x1, normal mode */
    bme280_write_reg(0xF5, 0xA0);  /* standby 1000ms, filter off */

    /* Read calibration data (same logic as Arduino library) */
    return bme280_read_calibration();
}
```

### 4 단계 : 지연 및 인쇄 통화 교체
|아르두노 / ESP-IDF|카테고리|
|-------------------|----------|
| `delay(ms)` | `tal_system_sleep(ms)` |
| `Serial.println()` | `TAL_PR_INFO()` |
| `millis()` | `tal_system_get_millisecond()` |
| `malloc` / `free` | `tal_malloc` / `tal_free` |

### 단계 5: 손잡이 SPI 감지기
SPI 센서의 경우 TuyaOpen은 제공하지 않습니다.`tkl_spi`ESP32에 어댑터. 2개의 선택권:

** 옵션 A : ** ESP-IDF SPI를 직접 사용하십시오 (ESP32 전용, 휴대용) :

```c
#include "driver/spi_master.h"
spi_device_handle_t spi;
/* Standard ESP-IDF SPI init and transfer */
```

** 옵션 B : ** 얇은 쓰기`tkl_spi`- 플랫폼 당 포트와 같은 래퍼.

### 단계 6: 적절한 TuyaOpen 앱 만들기
```
apps/my_bme280_app/
├── CMakeLists.txt
├── src/
│   ├── tuya_main.c
│   └── bme280.c
├── include/
│   └── bme280.h
└── config/
    └── ESP32-S3.config
```

## 일반적인 Porting 패턴
### 아르두노`Wire.h`-> TKL I2C를
|아르두노|카테고리|
|---------|----------|
| `Wire.begin(sda, scl)` | `tkl_io_pinmux_config()` + `tkl_i2c_init()` |
| `Wire.beginTransmission(addr)` + `Wire.write(data)` + `Wire.endTransmission()` | `tkl_i2c_master_send(port, addr, data, len, TRUE)` |
| `Wire.requestFrom(addr, len)` + `Wire.read()` | `tkl_i2c_master_receive(port, addr, buf, len, TRUE)` |
| `Wire.setClock(freq)` |설치하기`speed`내 계정`TUYA_IIC_BASE_CFG_T`에 init|

### 사이트맵`i2c_master_*`-> TKL I2C를
|사이트맵|카테고리|
|---------|----------|
| `i2c_new_master_bus()` | `tkl_i2c_init()` |
| `i2c_master_transmit()` | `tkl_i2c_master_send()` |
| `i2c_master_receive()` | `tkl_i2c_master_receive()` |
| `i2c_master_bus_rm_device()` | `tkl_i2c_deinit()` |

### 사이트맵`gpio_*`-> TKL GPIO
|사이트맵|카테고리|
|---------|----------|
| `gpio_config()` | `tkl_gpio_init()` |
| `gpio_set_level()` | `tkl_gpio_write()` |
| `gpio_get_level()` | `tkl_gpio_read()` |
| `gpio_isr_handler_add()` | `tkl_gpio_irq_init()` + `tkl_gpio_irq_enable()` |

## 지정할 수 없습니다 (Stays Platform-Specific)
- DMA 기반 SPI 전송
- 하드웨어 별 센서 주변 장치 (ESP32 터치 센서, ULP ADC)
- Vendor SDK 콜백 (`esp_event_*`)
- FreeRTOS-specific APIs는 TAL에 없습니다 (`xEventGroup`, `xStreamBuffer`)

## 이름 *
- [TDD/TDL 드라이버 아키텍처](../driver-architecture)
- [새로운 센서 드라이버 작성](writing-sensor-driver)
- [ESP32 마이그레이션 가이드](../../hardware/espressif/esp32-migration-guide)
- [TKL I2C API를](/docs/tkl-api/tkl_i2c)
