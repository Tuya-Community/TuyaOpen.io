---
title: "ESP32-C3 外设映射"
---

# ESP32-C3 外设映射

本文说明 ESP32-C3（单核 RISC-V，成本优化）片上外设与 TuyaOpen TKL 层软件端口的映射关系。

## GPIO

- 所有 GPIO 引脚均支持中断。
- `TUYA_GPIO_NUM_E` 枚举值与物理 GPIO 编号直接 1:1 对应。
- 共 22 个 GPIO（GPIO0 ~ GPIO21），是 ESP32 系列中 GPIO 最少的型号，请提前规划引脚分配。

| GPIO 范围 | TUYA_GPIO_NUM 范围 | 说明 |
|-----------|-------------------|------|
| GPIO0 ~ GPIO21 | TUYA_GPIO_NUM_0 ~ TUYA_GPIO_NUM_21 | 通用 IO，全部可用 |

## UART

- 支持 2 路串口。
- UART0 的 TX / RX 引脚通过 Kconfig 选项 `UART_NUM0_TX_PIN` / `UART_NUM0_RX_PIN` 配置，默认为 GPIO21 / GPIO20。
- UART1 无专用 IO_MUX 引脚，走 GPIO Matrix，默认引脚可在初始化前通过 `tkl_io_pinmux_config()` 修改。

:::info[修改 UART0 引脚]
在项目目录下运行 `tos.py config menu` 进入板子配置子界面，找到对应选项并输入目标 GPIO 编号，或直接编辑 `boards/ESP32/ESP32-C3/Kconfig` 中的 `default` 值，重新构建后生效。
:::

| Board Pin | Function | Software Pin | Software Port |
|-----------|----------|--------------|---------------|
| GPIO21（默认） | UART0_TX | TUYA_GPIO_NUM_21 | TUYA_UART_NUM_0 |
| GPIO20（默认） | UART0_RX | TUYA_GPIO_NUM_20 | TUYA_UART_NUM_0 |
| GPIO17（默认） | UART1_TX | TUYA_GPIO_NUM_17 | TUYA_UART_NUM_1 |
| GPIO18（默认） | UART1_RX | TUYA_GPIO_NUM_18 | TUYA_UART_NUM_1 |

## I2C

- 支持 1 路硬件 I2C（TUYA_I2C_NUM_0）。
- 默认引脚可在外设初始化前通过 `tkl_io_pinmux_config()` 修改。

| Board Pin（默认） | Function | Software Pin | Software Port |
|-----------------|----------|--------------|---------------|
| GPIO0 | I2C0_SCL | TUYA_IIC0_SCL | TUYA_I2C_NUM_0 |
| GPIO1 | I2C0_SDA | TUYA_IIC0_SDA | TUYA_I2C_NUM_0 |

## PWM

- 支持 6 路 PWM，使用 ESP-IDF LEDC 驱动（LEDC_LOW_SPEED_MODE，12 位分辨率）。
- 默认引脚可在外设初始化前通过 `tkl_io_pinmux_config()` 修改。

| Board Pin（默认） | Function | Software Pin | Software Port |
|-----------------|----------|--------------|---------------|
| GPIO18 | PWM0 | TUYA_PWM0 | TUYA_PWM_NUM_0 |
| GPIO19 | PWM1 | TUYA_PWM1 | TUYA_PWM_NUM_1 |
| GPIO3 | PWM2 | TUYA_PWM2 | TUYA_PWM_NUM_2 |
| GPIO4 | PWM3 | TUYA_PWM3 | TUYA_PWM_NUM_3 |
| GPIO5 | PWM4 | TUYA_PWM4 | TUYA_PWM_NUM_4 |
| GPIO6 | PWM5 | TUYA_PWM5 | TUYA_PWM_NUM_5 |

## ADC

- 仅支持 ADC1（TUYA_ADC_NUM_0），共 6 个通道。
- 通道通过位掩码（`ch_list.data`）配置，bit N 对应 `ADC_CHANNEL_N`。
- 衰减固定为 `ADC_ATTEN_DB_12`（量程约 0–3.3 V），校准采用 Curve-fitting 方案。

| Board Pin | ADC Channel | Software Port |
|-----------|-------------|---------------|
| GPIO0 | ADC1_CH0 | TUYA_ADC_NUM_0 |
| GPIO1 | ADC1_CH1 | TUYA_ADC_NUM_0 |
| GPIO2 | ADC1_CH2 | TUYA_ADC_NUM_0 |
| GPIO3 | ADC1_CH3 | TUYA_ADC_NUM_0 |
| GPIO4 | ADC1_CH4 | TUYA_ADC_NUM_0 |
| GPIO5 | ADC1_CH5 | TUYA_ADC_NUM_0 |

## 参考资料

- [ESP32 引脚映射 -- 概述](../esp32-pin-mapping)
- [ESP32-C3 数据手册](https://www.espressif.com.cn/sites/default/files/documentation/esp32-c3_datasheet_en.pdf)
