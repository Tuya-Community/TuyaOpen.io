---
title: "I2C 外设指南"
---

# I2C 外设指南

在 TuyaOpen 中配置和使用 I2C 总线进行传感器通信、OLED 显示、IO 扩展器等外设。

## 初始化

### 1. 通过 pinmux 分配引脚

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
tkl_i2c_init(TUYA_I2C_NUM_0, &i2c_cfg);
```

## 读写操作

### 写寄存器

```c
UINT8_T buf[2] = { reg_addr, value };
tkl_i2c_master_send(TUYA_I2C_NUM_0, device_addr, buf, 2, TRUE);
```

### 读寄存器

```c
UINT8_T reg = 0x00;
UINT8_T data[2];
tkl_i2c_master_send(TUYA_I2C_NUM_0, device_addr, &reg, 1, FALSE);
tkl_i2c_master_receive(TUYA_I2C_NUM_0, device_addr, data, 2, TRUE);
```

最后参数 `FALSE` 表示不产生 STOP 条件，以便后续读取生成 repeated START。

## I2C 总线扫描

```c
for (UINT8_T addr = 0x08; addr < 0x78; addr++) {
    UINT8_T dummy;
    OPERATE_RET rt = tkl_i2c_master_receive(TUYA_I2C_NUM_0, addr, &dummy, 1, TRUE);
    if (rt == OPRT_OK) {
        TAL_PR_INFO("found device at 0x%02X", addr);
    }
}
```

## 限制

| 功能 | 状态 |
|------|------|
| 主模式 | 支持 |
| 从模式 | **不支持** (`OPRT_NOT_SUPPORTED`) |
| 10-bit 寻址 | 支持 |
| 总线复位 / ioctl | **不支持** |

## TuyaOpen 项目中常用 I2C 设备

| 设备 | 地址 | 类型 |
|------|------|------|
| SHT3x | 0x44 / 0x45 | 温湿度传感器 |
| SSD1306 | 0x3C | OLED 显示 |
| ES8311 | 0x18 | 音频编解码器 |
| ES8388 | 0x20 | 音频编解码器 |
| FT5x06 | 0x38 | 触摸控制器 |
| BMI270 | 0x68 / 0x69 | IMU |

## 参考资料

- [编写新的传感器驱动](writing-sensor-driver)
- [TKL I2C API](/docs/tkl-api/tkl_i2c)
- [TDD/TDL 驱动架构](../driver-architecture)
