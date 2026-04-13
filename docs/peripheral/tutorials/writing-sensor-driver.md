---
title: "Writing a New I2C Sensor Driver"
---

# Writing a New I2C Sensor Driver

Step-by-step tutorial for integrating a new I2C sensor (temperature, humidity, IMU, pressure, etc.) into a TuyaOpen project. Uses the SHT3x temperature/humidity sensor as a concrete example.

## Prerequisites

- Completed [Environment Setup](../../quick-start/enviroment-setup)
- Understanding of I2C basics (address, read/write, registers)
- Sensor datasheet with register map

## Requirements

- TuyaOpen SDK cloned and environment set up
- Development board (T5AI, ESP32-S3, or any supported platform)
- I2C sensor module (e.g., SHT30/SHT31, BME280, BMP280, MPU6050)
- Jumper wires, breadboard

## When to Use TDL/TDD vs Direct TKL

| Approach | When to use | Example |
|----------|-------------|---------|
| **Direct TKL I2C** | Simple sensors, one-off reads, prototyping | SHT3x, BME280, BMP280 |
| **Full TDL/TDD** | Reusable driver shared across boards, complex lifecycle | Display panel, audio codec, touch controller |

Most I2C sensors work well with direct TKL calls. Use the TDL/TDD pattern when you need device registration, multiple instances, or board-level abstraction.

## Steps

### Step 1: Configure I2C pins

Set up the I2C bus with `tkl_io_pinmux_config()` before initializing:

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

### Step 2: Write the sensor read function

For SHT3x, the measurement command is `0x2400` (high repeatability, no clock stretching). The sensor returns 6 bytes: 2 temp + 1 CRC + 2 humidity + 1 CRC.

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

### Step 3: Create a periodic read task

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

### Step 4: Add to your project

Create the project structure:

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

Enable I2C in your board config:

```
CONFIG_ENABLE_I2C=y
```

### Step 5: Build and test

```bash
cd apps/my_sensor_app
tos.py config choice       # Select your board
tos.py build
tos.py flash
tos.py monitor
```

Expected output:

```
[01-01 00:00:02 TUYA I][tuya_main.c:xx] temp: 25.43 C, humidity: 48.21 %
[01-01 00:00:04 TUYA I][tuya_main.c:xx] temp: 25.51 C, humidity: 47.89 %
```

## Adding CRC Validation

Production code should validate the CRC-8 bytes:

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

## Cross-Platform Considerations

This sensor code is portable because it only uses TKL I2C APIs. The same code runs on T5AI, ESP32, Raspberry Pi, and other platforms -- only the pin numbers change.

To make pin numbers configurable, use Kconfig:

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

## Sending Sensor Data to Tuya Cloud (Optional)

To report sensor data as Tuya Cloud data points:

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

This requires a Tuya Cloud product with matching DP definitions. See [Creating a New Product](../../cloud/tuya-cloud/creating-new-product).

## References

- [TDD/TDL Driver Architecture](../driver-architecture)
- [Migrating a Sensor Library](migrating-sensor-driver)
- [I2C Peripheral Guide](i2c-guide)
- [TKL I2C API](/docs/tkl-api/tkl_i2c)
- [SHT3x example in repo](https://github.com/tuya/TuyaOpen/tree/master/examples/peripherals/i2c/sht3x_4x_sensor)
