---
title: "ESP32 引脚映射 -- 概述"
---

# ESP32 引脚映射

本文说明 ESP32 片上外设与 TuyaOpen TKL 层软件端口及引脚之间的映射关系。

## 通用引脚映射机制

以下机制适用于所有 ESP32 芯片型号。

### GPIO 编号映射

TuyaOpen 在 ESP32 平台上采用**直接 1:1 映射**：`TUYA_GPIO_NUM_E` 枚举值直接对应物理 ESP32 GPIO 编号。`TUYA_GPIO_NUM_18` 操作的就是物理 `GPIO18`，`TUYA_GPIO_NUM_5` 操作的就是物理 `GPIO5`，以此类推。

该映射定义在 [`tkl_pin.c`](https://github.com/tuya/TuyaOpen-esp32/blob/master/tuya_open_sdk/tuyaos_adapter/src/drivers/tkl_pin.c) 的 `pinmap[]` 数组中，不同芯片型号的可用 GPIO 范围各有差异。

各芯片可用的 GPIO 范围见 [各平台引脚映射文档](#各平台引脚映射文档)。

### Pinmux（引脚复用）

ESP32 片上外设（I2C、PWM、UART 等）并不固定绑定某几根引脚，而是可以灵活路由到不同的 GPIO。TKL 的 `tkl_io_pinmux_config()` 封装了这一能力，让开发者在外设初始化前指定实际使用的引脚。

**使用场景**：
- 板级默认引脚与硬件设计冲突（如引脚被其他外设占用）
- 自定义开发板未沿用 TuyaOpen 默认引脚分配
- 同一应用中多路同类外设（如两路 I2C）需要分配到不同引脚

**如何使用**：在调用外设的 `tkl_xxx_init()` **之前**调用 `tkl_io_pinmux_config()` 完成引脚绑定：

```c
// 将 I2C0 路由到 GPIO42（SCL）和 GPIO41（SDA）
tkl_io_pinmux_config(TUYA_GPIO_NUM_42, TUYA_IIC0_SCL);
tkl_io_pinmux_config(TUYA_GPIO_NUM_41, TUYA_IIC0_SDA);
tkl_i2c_init(TUYA_I2C_NUM_0, &cfg);   // 初始化时生效

// 将 PWM0 路由到 GPIO5
tkl_io_pinmux_config(TUYA_GPIO_NUM_5, TUYA_PWM0);
tkl_pwm_init(TUYA_PWM_NUM_0, &pwm_cfg);
```

:::info[注意]
`tkl_io_pinmux_config()` 必须在对应外设的 `tkl_xxx_init()` 之前调用，否则引脚覆盖不生效。
:::

## 各平台引脚映射文档

每个 ESP32 芯片型号都有专门的引脚映射文档，涵盖 GPIO 范围、UART 默认引脚和开发板配置：

- [ESP32（经典款）](pinmux/esp32-classic) -- 双核 Xtensa LX6，GPIO 0–39
- [ESP32-S3](pinmux/esp32-s3) -- 双核 Xtensa LX7，GPIO 0–48，支持 AI/音频
- [ESP32-C3](pinmux/esp32-c3) -- 单核 RISC-V，GPIO 0–21，成本优化
- [ESP32-C6](pinmux/esp32-c6) -- 单核 RISC-V，GPIO 0–30，Wi-Fi 6

## 参考资料

- [ESP32 与 TuyaOpen -- 概述](overview-esp32)
- [ESP32 支持功能](esp32-supported-features)
- [添加新的 ESP32 开发板](esp32-new-board)
