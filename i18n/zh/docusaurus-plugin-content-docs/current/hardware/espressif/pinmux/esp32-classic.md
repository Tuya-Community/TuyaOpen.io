---
title: "ESP32（经典款）外设映射"
---

# ESP32（经典款）外设映射

本文说明 ESP32（双核 Xtensa LX6）片上外设与 TuyaOpen TKL 层软件端口的映射关系。

## GPIO

- 所有 GPIO 引脚均支持中断。
- `TUYA_GPIO_NUM_E` 枚举值与物理 GPIO 编号直接 1:1 对应。
- `TUYA_GPIO_NUM_24` 映射为 `GPIO_NUM_NC`，**不可使用**。
- GPIO34 ~ GPIO39 为**仅输入**引脚，不支持输出模式及上下拉配置。

| GPIO 范围 | TUYA_GPIO_NUM 范围 | 说明 |
|-----------|-------------------|------|
| GPIO0 ~ GPIO23 | TUYA_GPIO_NUM_0 ~ TUYA_GPIO_NUM_23 | 通用 IO |
| — | TUYA_GPIO_NUM_24 | NC，不可使用 |
| GPIO25 ~ GPIO33 | TUYA_GPIO_NUM_25 ~ TUYA_GPIO_NUM_33 | 通用 IO |
| GPIO34 ~ GPIO39 | TUYA_GPIO_NUM_34 ~ TUYA_GPIO_NUM_39 | 仅输入，无输出 / 上下拉 |

## UART

- 支持 2 路串口。
- UART0 的 TX / RX 引脚通过 Kconfig 选项 `UART_NUM0_TX_PIN` / `UART_NUM0_RX_PIN` 配置，默认为 GPIO1 / GPIO3。
- UART1 有专用 IO_MUX 引脚，默认引脚可在初始化前通过 `tkl_io_pinmux_config()` 修改。

:::info[修改 UART0 引脚]
在项目目录下运行 `tos.py config menu` 进入板子配置子界面，找到对应选项并输入目标 GPIO 编号，或直接编辑 `boards/ESP32/ESP32/Kconfig` 中的 `default` 值，重新构建后生效。
:::

| Board Pin | Function | Software Pin | Software Port |
|-----------|----------|--------------|---------------|
| GPIO1（默认） | UART0_TX | TUYA_GPIO_NUM_1 | TUYA_UART_NUM_0 |
| GPIO3（默认） | UART0_RX | TUYA_GPIO_NUM_3 | TUYA_UART_NUM_0 |
| GPIO10（默认） | UART1_TX | TUYA_GPIO_NUM_10 | TUYA_UART_NUM_1 |
| GPIO9（默认） | UART1_RX | TUYA_GPIO_NUM_9 | TUYA_UART_NUM_1 |

## I2C

- 支持 2 路 I2C。
- 默认引脚可在外设初始化前通过 `tkl_io_pinmux_config()` 修改。

| Board Pin（默认） | Function | Software Pin | Software Port |
|-----------------|----------|--------------|---------------|
| GPIO0 | I2C0_SCL | TUYA_IIC0_SCL | TUYA_I2C_NUM_0 |
| GPIO1 | I2C0_SDA | TUYA_IIC0_SDA | TUYA_I2C_NUM_0 |
| GPIO2 | I2C1_SCL | TUYA_IIC1_SCL | TUYA_I2C_NUM_1 |
| GPIO3 | I2C1_SDA | TUYA_IIC1_SDA | TUYA_I2C_NUM_1 |

## PWM

- 支持 6 路 PWM，使用 ESP-IDF LEDC 驱动（LEDC_LOW_SPEED_MODE，12 位分辨率）。
- 默认引脚可在外设初始化前通过 `tkl_io_pinmux_config()` 修改。

| Board Pin（默认） | Function | Software Pin | Software Port |
|-----------------|----------|--------------|---------------|
| GPIO18 | PWM0 | TUYA_PWM0 | TUYA_PWM_NUM_0 |
| GPIO19 | PWM1 | TUYA_PWM1 | TUYA_PWM_NUM_1 |
| GPIO22 | PWM2 | TUYA_PWM2 | TUYA_PWM_NUM_2 |
| GPIO23 | PWM3 | TUYA_PWM3 | TUYA_PWM_NUM_3 |
| GPIO25 | PWM4 | TUYA_PWM4 | TUYA_PWM_NUM_4 |
| GPIO26 | PWM5 | TUYA_PWM5 | TUYA_PWM_NUM_5 |

## ADC

- 支持 2 路 ADC，通道通过位掩码（`ch_list.data`）配置，bit N 对应 `ADC_CHANNEL_N`。
- 衰减固定为 `ADC_ATTEN_DB_12`（量程约 0–3.3 V），校准采用 Line-fitting 方案。
- ADC2 与 Wi-Fi 共用资源，Wi-Fi 激活期间不可读取。

### ADC1（TUYA_ADC_NUM_0）

| Board Pin | ADC Channel | Software Port |
|-----------|-------------|---------------|
| GPIO36（VP） | ADC1_CH0 | TUYA_ADC_NUM_0 |
| GPIO37 | ADC1_CH1 | TUYA_ADC_NUM_0 |
| GPIO38 | ADC1_CH2 | TUYA_ADC_NUM_0 |
| GPIO39（VN） | ADC1_CH3 | TUYA_ADC_NUM_0 |
| GPIO32 | ADC1_CH4 | TUYA_ADC_NUM_0 |
| GPIO33 | ADC1_CH5 | TUYA_ADC_NUM_0 |
| GPIO34 | ADC1_CH6 | TUYA_ADC_NUM_0 |
| GPIO35 | ADC1_CH7 | TUYA_ADC_NUM_0 |

### ADC2（TUYA_ADC_NUM_1）

:::warning[Wi-Fi 冲突]
ESP32 ADC2 与 Wi-Fi RF 共用硬件资源，Wi-Fi 激活期间 ADC2 读取将失败。仅在 Wi-Fi 关闭时使用 `TUYA_ADC_NUM_1`。
:::

| Board Pin | ADC Channel | Software Port |
|-----------|-------------|---------------|
| GPIO4 | ADC2_CH0 | TUYA_ADC_NUM_1 |
| GPIO0 | ADC2_CH1 | TUYA_ADC_NUM_1 |
| GPIO2 | ADC2_CH2 | TUYA_ADC_NUM_1 |
| GPIO15 | ADC2_CH3 | TUYA_ADC_NUM_1 |
| GPIO13 | ADC2_CH4 | TUYA_ADC_NUM_1 |
| GPIO12 | ADC2_CH5 | TUYA_ADC_NUM_1 |
| GPIO14 | ADC2_CH6 | TUYA_ADC_NUM_1 |
| GPIO27 | ADC2_CH7 | TUYA_ADC_NUM_1 |
| GPIO25 | ADC2_CH8 | TUYA_ADC_NUM_1 |
| GPIO26 | ADC2_CH9 | TUYA_ADC_NUM_1 |

## 参考资料

- [ESP32 引脚映射 -- 概述](../esp32-pin-mapping)
- [ESP32 数据手册](https://www.espressif.com.cn/sites/default/files/documentation/esp32_datasheet_en.pdf)
