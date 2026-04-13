---
title: "I2C Peripheral Guide"
---

# I2C Peripheral Guide

Configure and use the I2C bus in TuyaOpen for sensor communication, OLED displays, IO expanders, and other I2C peripherals.

## Prerequisites

- Completed [Environment Setup](../../quick-start/enviroment-setup)
- Board with I2C-capable pins and `ENABLE_I2C=y` in Kconfig

## I2C in TuyaOpen

TuyaOpen provides I2C master mode through the TKL layer. The API is the same across all platforms (T5AI, ESP32, Linux, etc.).

## Initialization

### 1. Assign pins via pinmux

I2C pins default to GPIO 0/1 (I2C0) and GPIO 2/3 (I2C1). Override for your board:

```c
#include "tkl_pinmux.h"
#include "tkl_i2c.h"

tkl_io_pinmux_config(TUYA_GPIO_NUM_9, TUYA_IIC0_SCL);
tkl_io_pinmux_config(TUYA_GPIO_NUM_10, TUYA_IIC0_SDA);
```

### 2. Initialize the bus

```c
TUYA_IIC_BASE_CFG_T i2c_cfg = {
    .role = TUYA_IIC_MODE_MASTER,
    .speed = TUYA_IIC_BUS_SPEED_400K,
    .addr_width = TUYA_IIC_ADDRESS_7BIT,
};
OPERATE_RET rt = tkl_i2c_init(TUYA_I2C_NUM_0, &i2c_cfg);
```

Speed options: `TUYA_IIC_BUS_SPEED_100K`, `TUYA_IIC_BUS_SPEED_400K`, `TUYA_IIC_BUS_SPEED_1M` (if hardware supports it).

## Read and Write

### Write a register

```c
UINT8_T buf[2] = { reg_addr, value };
tkl_i2c_master_send(TUYA_I2C_NUM_0, device_addr, buf, 2, TRUE);
```

The last parameter (`TRUE`) generates a STOP condition after the transfer.

### Read a register

```c
UINT8_T reg = 0x00;
UINT8_T data[2];
tkl_i2c_master_send(TUYA_I2C_NUM_0, device_addr, &reg, 1, FALSE);
tkl_i2c_master_receive(TUYA_I2C_NUM_0, device_addr, data, 2, TRUE);
```

Use `FALSE` for the STOP on the write to generate a repeated START for the subsequent read.

## I2C Bus Scan

Scan for connected devices by attempting to read from each address:

```c
for (UINT8_T addr = 0x08; addr < 0x78; addr++) {
    UINT8_T dummy;
    OPERATE_RET rt = tkl_i2c_master_receive(TUYA_I2C_NUM_0, addr, &dummy, 1, TRUE);
    if (rt == OPRT_OK) {
        TAL_PR_INFO("found device at 0x%02X", addr);
    }
}
```

See the [I2C scan example](https://github.com/tuya/TuyaOpen/tree/master/examples/peripherals/i2c/i2c_scan) in the SDK.

## Multiple Devices on One Bus

I2C is a multi-device bus. Multiple sensors with different addresses share the same SCL/SDA:

```c
#define OLED_ADDR   0x3C
#define SENSOR_ADDR 0x44
#define EXPANDER_ADDR 0x20

tkl_i2c_master_send(TUYA_I2C_NUM_0, OLED_ADDR, oled_cmd, sizeof(oled_cmd), TRUE);
tkl_i2c_master_send(TUYA_I2C_NUM_0, SENSOR_ADDR, sensor_cmd, 2, TRUE);
tkl_i2c_master_send(TUYA_I2C_NUM_0, EXPANDER_ADDR, exp_cmd, 2, TRUE);
```

:::warning Address Conflicts
If two devices share the same I2C address, you need separate buses (I2C0 and I2C1) or an I2C multiplexer.
:::

## Limitations

| Feature | Status |
|---------|--------|
| Master mode | Supported |
| Slave mode | **Not supported** (`OPRT_NOT_SUPPORTED`) |
| 10-bit addressing | Supported (set `addr_width = TUYA_IIC_ADDRESS_10BIT`) |
| Bus reset / ioctl | **Not supported** |
| DMA transfers | Platform-dependent (transparent to TKL API) |

## Common I2C Devices in TuyaOpen Projects

| Device | Address | Type | Used By |
|--------|---------|------|---------|
| SHT3x (temp/humidity) | 0x44 / 0x45 | Sensor | I2C sensor example |
| SSD1306 (OLED) | 0x3C | Display | ESP32 Bread Compact, XingZhi Cube |
| ES8311 (audio codec) | 0x18 | Audio | DNESP32S3-BOX, Waveshare AMOLED |
| ES8388 (audio codec) | 0x20 | Audio | ESP32 Bread Board, DNESP32S3 |
| FT5x06 (touch) | 0x38 | Touch | Waveshare AMOLED |
| XL9555 (IO expander) | 0x20 | GPIO expander | DNESP32S3, DNESP32S3-BOX |
| TCA9554 (IO expander) | 0x20 | GPIO expander | Waveshare AMOLED |
| BMI270 (IMU) | 0x68 / 0x69 | Motion sensor | IMU example |

## References

- [Writing a New Sensor Driver](writing-sensor-driver)
- [TKL I2C API](/docs/tkl-api/tkl_i2c)
- [TDD/TDL Driver Architecture](../driver-architecture)
- [I2C sensor example](https://github.com/tuya/TuyaOpen/tree/master/examples/peripherals/i2c/sht3x_4x_sensor)
