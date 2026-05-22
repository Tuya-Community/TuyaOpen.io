---
title: "编写新的 I2C 传感器驱动"
---

# 编写新的 I2C 传感器驱动

逐步教程：将新的 I2C 传感器（温度、湿度、IMU、压力等）集成到 TuyaOpen 项目。以 SHT3x 温湿度传感器为具体示例。

## 前提条件

- 已完成[环境搭建](../../quick-start/enviroment-setup)
- 了解 I2C 基础（地址、读写、寄存器）
- 传感器数据手册及寄存器映射

## 需求

- TuyaOpen SDK 已克隆并完成环境配置
- 开发板（T5AI、ESP32-S3 或其他支持平台）
- I2C 传感器模块（如 SHT30/SHT31、BME280、BMP280、MPU6050）
- 杜邦线、面包板

## 何时使用 TDL/TDD vs 直接 TKL

| 方式 | 何时使用 | 示例 |
|------|---------|------|
| **直接 TKL I2C** | 简单传感器、一次性读取、原型开发 | SHT3x、BME280、BMP280 |
| **完整 TDL/TDD** | 跨开发板复用的驱动、复杂生命周期 | 显示面板、音频编解码器、触摸控制器 |

## 步骤

### 步骤 1：配置 I2C 引脚

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

### 步骤 2：编写传感器读取函数

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

### 步骤 3：创建周期读取任务

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

### 步骤 4：构建和测试

```bash
cd apps/my_sensor_app
tos.py config choice
tos.py build
tos.py flash
tos.py monitor
```

预期输出：

```
[01-01 00:00:02 TUYA I][tuya_main.c:xx] temp: 25.43 C, humidity: 48.21 %
```

## CRC 校验

生产代码应验证 CRC-8 字节：

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
```

## 跨平台说明

该传感器代码可移植，因为仅使用 TKL I2C API。相同代码可在 T5AI、ESP32、Raspberry Pi 等平台上运行——仅引脚编号不同。

## 上报传感器数据到 Tuya Cloud（可选）

```c
#include "tuya_iot.h"

dp_obj_t dp_temp = {
    .dpid = 1,
    .type = PROP_VALUE,
    .value.dp_value = (int)(temp * 10),
};
dev_report_dp_json_async(NULL, &dp_temp, 1);
```

需要在 Tuya Cloud 创建产品并定义匹配的 DP。参见[创建新产品](../../cloud/tuya-cloud/creating-new-product)。

## 参考资料

- [TDD/TDL 驱动架构](../driver-architecture)
- [将传感器库迁移到 TuyaOpen](migrating-sensor-driver)
- [I2C 外设指南](i2c-guide)
- [TKL I2C API](/docs/tkl-api/tkl_i2c)
- [SHT3x 示例](https://github.com/tuya/TuyaOpen/tree/master/examples/peripherals/i2c/sht3x_4x_sensor)
