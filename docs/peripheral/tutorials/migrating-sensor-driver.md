---
title: "Migrating a Sensor Library to TuyaOpen"
---

# Migrating a Sensor Library to TuyaOpen

Port an existing Arduino or ESP-IDF sensor library to TuyaOpen so it works across all supported platforms.

## Prerequisites

- Completed [Environment Setup](../../quick-start/enviroment-setup)
- Read [TDD/TDL Driver Architecture](../driver-architecture)
- An existing sensor library you want to port (Arduino, ESP-IDF, or plain C)

## Requirements

- TuyaOpen SDK cloned and environment set up
- Source code of the sensor library
- Sensor datasheet for reference

## Migration Strategy

Most sensor libraries have three layers:

1. **Bus abstraction** -- Arduino `Wire.h` or ESP-IDF `i2c_master_*`
2. **Register access** -- read/write chip registers
3. **Application logic** -- measurement, calibration, conversions

You only need to replace layer 1. Layers 2 and 3 stay the same.

## Step-by-Step: Porting a BME280 Arduino Library

### Step 1: Identify the bus calls

In a typical Arduino library:

```cpp
Wire.beginTransmission(addr);
Wire.write(reg);
Wire.endTransmission();
Wire.requestFrom(addr, len);
while (Wire.available()) { data[i++] = Wire.read(); }
```

### Step 2: Create TKL I2C wrappers

Replace Wire calls with TuyaOpen equivalents:

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

### Step 3: Port the init and read functions

Keep the original calibration math. Replace only I/O:

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

### Step 4: Replace delay and print calls

| Arduino / ESP-IDF | TuyaOpen |
|-------------------|----------|
| `delay(ms)` | `tal_system_sleep(ms)` |
| `Serial.println()` | `TAL_PR_INFO()` |
| `millis()` | `tal_system_get_millisecond()` |
| `malloc` / `free` | `tal_malloc` / `tal_free` |

### Step 5: Handle SPI sensors

For SPI sensors, TuyaOpen does not provide a `tkl_spi` adapter on ESP32. Two options:

**Option A:** Use ESP-IDF SPI directly (ESP32-only, not portable):

```c
#include "driver/spi_master.h"
spi_device_handle_t spi;
/* Standard ESP-IDF SPI init and transfer */
```

**Option B:** Write a thin `tkl_spi`-like wrapper that you port per platform.

### Step 6: Make it a proper TuyaOpen app

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

## Common Porting Patterns

### Arduino `Wire.h` -> TKL I2C

| Arduino | TuyaOpen |
|---------|----------|
| `Wire.begin(sda, scl)` | `tkl_io_pinmux_config()` + `tkl_i2c_init()` |
| `Wire.beginTransmission(addr)` + `Wire.write(data)` + `Wire.endTransmission()` | `tkl_i2c_master_send(port, addr, data, len, TRUE)` |
| `Wire.requestFrom(addr, len)` + `Wire.read()` | `tkl_i2c_master_receive(port, addr, buf, len, TRUE)` |
| `Wire.setClock(freq)` | Set `speed` in `TUYA_IIC_BASE_CFG_T` at init |

### ESP-IDF `i2c_master_*` -> TKL I2C

| ESP-IDF | TuyaOpen |
|---------|----------|
| `i2c_new_master_bus()` | `tkl_i2c_init()` |
| `i2c_master_transmit()` | `tkl_i2c_master_send()` |
| `i2c_master_receive()` | `tkl_i2c_master_receive()` |
| `i2c_master_bus_rm_device()` | `tkl_i2c_deinit()` |

### ESP-IDF `gpio_*` -> TKL GPIO

| ESP-IDF | TuyaOpen |
|---------|----------|
| `gpio_config()` | `tkl_gpio_init()` |
| `gpio_set_level()` | `tkl_gpio_write()` |
| `gpio_get_level()` | `tkl_gpio_read()` |
| `gpio_isr_handler_add()` | `tkl_gpio_irq_init()` + `tkl_gpio_irq_enable()` |

## What Cannot Be Ported (Stays Platform-Specific)

- DMA-based SPI transfers
- Hardware-specific sensor peripherals (ESP32 touch sensor, ULP ADC)
- Vendor SDK callbacks (`esp_event_*`)
- FreeRTOS-specific APIs not in TAL (`xEventGroup`, `xStreamBuffer`)

## References

- [TDD/TDL Driver Architecture](../driver-architecture)
- [Writing a New Sensor Driver](writing-sensor-driver)
- [ESP32 Migration Guide](../../hardware-specific/espressif/esp32-migration-guide)
- [TKL I2C API](/docs/tkl-api/tkl_i2c)
