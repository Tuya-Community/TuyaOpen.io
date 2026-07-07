---
title: "I2C 外设指南"
description: "TKL I2C 接口以主模式驱动 I2C 总线，用于传感器、OLED 显示、IO 扩展器等外设：分配 SCL/SDA 引脚、按速率初始化后按地址收发字节。"
keywords:
  - I2C
  - TKL
  - 主模式
  - TuyaOpen 外设
  - 嵌入式驱动
---

TKL I2C 接口以主模式驱动 I2C 总线，用于传感器、OLED 显示、IO 扩展器等外设。你分配 SCL/SDA 引脚，按所选速率初始化总线，然后针对各设备地址收发字节。

## 先决条件

- 已完成 [环境搭建](../../quick-start/enviroment-setup)
- 开发板具备 I2C 引脚，且在 Kconfig 中设置了 `ENABLE_I2C=y`

## TuyaOpen 中的 I2C

TuyaOpen 通过 TKL 层提供 I2C 主模式。该 API 在所有平台（T5AI、ESP32、Linux 等）上保持一致。

## 初始化

### 1. 通过 pinmux 分配引脚

I2C 引脚默认为 GPIO 0/1（I2C0）与 GPIO 2/3（I2C1）。按你的开发板覆盖：

```c
#include "tkl_pinmux.h"
#include "tkl_i2c.h"

tkl_io_pinmux_config(TUYA_GPIO_NUM_9, TUYA_IIC0_SCL);
tkl_io_pinmux_config(TUYA_GPIO_NUM_10, TUYA_IIC0_SDA);
```

### 2. 初始化总线

```c
TUYA_IIC_BASE_CFG_T i2c_cfg = {
    .role = TUYA_IIC_MODE_MASTER,
    .speed = TUYA_IIC_BUS_SPEED_400K,
    .addr_width = TUYA_IIC_ADDRESS_7BIT,
};
OPERATE_RET rt = tkl_i2c_init(TUYA_I2C_NUM_0, &i2c_cfg);
```

速率可选：`TUYA_IIC_BUS_SPEED_100K`、`TUYA_IIC_BUS_SPEED_400K`、`TUYA_IIC_BUS_SPEED_1M`（若硬件支持）。

## 读写操作

### 写寄存器

```c
UINT8_T buf[2] = { reg_addr, value };
tkl_i2c_master_send(TUYA_I2C_NUM_0, device_addr, buf, 2, TRUE);
```

最后一个参数（`TRUE`）会在传输后产生 STOP 条件。

### 读寄存器

```c
UINT8_T reg = 0x00;
UINT8_T data[2];
tkl_i2c_master_send(TUYA_I2C_NUM_0, device_addr, &reg, 1, FALSE);
tkl_i2c_master_receive(TUYA_I2C_NUM_0, device_addr, data, 2, TRUE);
```

写操作传入 `FALSE` 表示不产生 STOP，从而为后续读取生成 repeated START。

## I2C 总线扫描

通过尝试从每个地址读取来扫描已连接的设备：

```c
for (UINT8_T addr = 0x08; addr < 0x78; addr++) {
    UINT8_T dummy;
    OPERATE_RET rt = tkl_i2c_master_receive(TUYA_I2C_NUM_0, addr, &dummy, 1, TRUE);
    if (rt == OPRT_OK) {
        TAL_PR_INFO("found device at 0x%02X", addr);
    }
}
```

参见 SDK 中的 [I2C 扫描示例](https://github.com/tuya/TuyaOpen/tree/master/examples/peripherals/i2c/i2c_scan)。

## 一条总线上的多个设备

I2C 是多设备总线。地址不同的多个传感器可共用同一组 SCL/SDA：

```c
#define OLED_ADDR   0x3C
#define SENSOR_ADDR 0x44
#define EXPANDER_ADDR 0x20

tkl_i2c_master_send(TUYA_I2C_NUM_0, OLED_ADDR, oled_cmd, sizeof(oled_cmd), TRUE);
tkl_i2c_master_send(TUYA_I2C_NUM_0, SENSOR_ADDR, sensor_cmd, 2, TRUE);
tkl_i2c_master_send(TUYA_I2C_NUM_0, EXPANDER_ADDR, exp_cmd, 2, TRUE);
```

:::warning 地址冲突
若两个设备使用相同的 I2C 地址，需要分开的总线（I2C0 与 I2C1）或一个 I2C 多路复用器。
:::

## 限制

| 功能 | 状态 |
|------|------|
| 主模式 | 支持 |
| 从模式 | **不支持**（`OPRT_NOT_SUPPORTED`） |
| 10-bit 寻址 | 支持（设置 `addr_width = TUYA_IIC_ADDRESS_10BIT`） |
| 总线复位 / ioctl | **不支持** |
| DMA 传输 | 与平台相关（对 TKL API 透明） |

## TuyaOpen 项目中常用 I2C 设备

| 设备 | 地址 | 类型 | 使用方 |
|------|------|------|--------|
| SHT3x（温湿度） | 0x44 / 0x45 | 传感器 | I2C 传感器示例 |
| SSD1306（OLED） | 0x3C | 显示 | ESP32 Bread Compact、XingZhi Cube |
| ES8311（音频编解码器） | 0x18 | 音频 | DNESP32S3-BOX、Waveshare AMOLED |
| ES8388（音频编解码器） | 0x20 | 音频 | ESP32 Bread Board、DNESP32S3 |
| FT5x06（触摸） | 0x38 | 触摸 | Waveshare AMOLED |
| XL9555（IO 扩展器） | 0x20 | GPIO 扩展器 | DNESP32S3、DNESP32S3-BOX |
| TCA9554（IO 扩展器） | 0x20 | GPIO 扩展器 | Waveshare AMOLED |
| BMI270（IMU） | 0x68 / 0x69 | 运动传感器 | IMU 示例 |

## 参考资料

- [编写新的传感器驱动](writing-sensor-driver)
- [TKL I2C API](/docs/tkl-api/tkl_i2c)
- [TDD/TDL 驱动架构](../driver-architecture)
- [I2C 传感器示例](https://github.com/tuya/TuyaOpen/tree/master/examples/peripherals/i2c/sht3x_4x_sensor)
