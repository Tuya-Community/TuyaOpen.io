---
title: "ADC 外设指南"
description: "TKL ADC 接口用于读取传感器、电位器等模拟源的电压：配置 ADC 单元、用位掩码使能通道，再读取原始计数并换算为毫伏。"
keywords:
  - ADC
  - TKL
  - 模拟电压
  - TuyaOpen 外设
  - 嵌入式驱动
---

TKL ADC 接口用于读取来自传感器、电位器及其他模拟源的电压。你先配置一个 ADC 单元，用位掩码使能通道，再读取原始计数并换算为毫伏。

## 先决条件

- 已完成 [环境搭建](../../quick-start/enviroment-setup)
- 开发板在 Kconfig 中设置了 `ENABLE_ADC=y`

## ADC 在 TuyaOpen 中的工作方式

TuyaOpen 的 ADC 采用 **端口 + 通道位掩码** 模型：

- **端口** 选择 ADC 单元：`TUYA_ADC_NUM_0` = ADC1，`TUYA_ADC_NUM_1` = ADC2
- **通道位掩码**（`cfg->ch_list.data`）使能具体通道：第 N 位使能 `ADC_CHANNEL_N`
- **衰减** 固定为 `ADC_ATTEN_DB_12`（0-3.3 V 满量程）
- **参考电压** 为 3300 mV，由 `tkl_adc_ref_voltage_get()` 返回

## 基本 ADC 读取

```c
#include "tkl_adc.h"

#define ADC_PORT    TUYA_ADC_NUM_0
#define ADC_CHANNEL 4

static OPERATE_RET read_adc(uint32_t *raw_value)
{
    TUYA_ADC_BASE_CFG_T cfg = {
        .ch_list.data = (1 << ADC_CHANNEL),
        .ch_nums = 1,
        .width = 12,
        .type = TUYA_ADC_INNER_SAMPLE_VOL,
    };

    OPERATE_RET rt = tkl_adc_init(ADC_PORT, &cfg);
    if (rt != OPRT_OK) {
        return rt;
    }

    int32_t value;
    rt = tkl_adc_read_single_channel(ADC_PORT, ADC_CHANNEL, &value);
    tkl_adc_deinit(ADC_PORT);

    *raw_value = (uint32_t)value;
    return rt;
}
```

## 原始值换算为电压

```c
uint32_t raw;
read_adc(&raw);

uint32_t ref_mv = tkl_adc_ref_voltage_get(ADC_PORT);

float voltage = (float)raw * ref_mv / ((1 << 12) - 1);
TAL_PR_INFO("voltage: %.2f mV", voltage);
```

## 多通道读取

用位掩码同时使能多个通道：

```c
TUYA_ADC_BASE_CFG_T cfg = {
    .ch_list.data = (1 << 0) | (1 << 1) | (1 << 4),
    .ch_nums = 3,
    .width = 12,
};
tkl_adc_init(TUYA_ADC_NUM_0, &cfg);

int32_t ch0_val, ch1_val, ch4_val;
tkl_adc_read_single_channel(TUYA_ADC_NUM_0, 0, &ch0_val);
tkl_adc_read_single_channel(TUYA_ADC_NUM_0, 1, &ch1_val);
tkl_adc_read_single_channel(TUYA_ADC_NUM_0, 4, &ch4_val);

tkl_adc_deinit(TUYA_ADC_NUM_0);
```

## ADC 通道到 GPIO 的映射

通道到 GPIO 的映射取决于芯片。完整对照表见各芯片的 pinmux 文档：

| 平台 | ADC1 端口 | ADC2 端口 | Pinmux 文档 |
|----------|-----------|-----------|-----------|
| ESP32 | `TUYA_ADC_NUM_0`（GPIO 32-39） | `TUYA_ADC_NUM_1`（GPIO 0-27） | [ESP32 Classic Pinmux](/docs/hardware/espressif/pinmux/esp32-classic) |
| ESP32-S3 | `TUYA_ADC_NUM_0`（GPIO 1-10） | `TUYA_ADC_NUM_1`（GPIO 11-20） | [ESP32-S3 Pinmux](/docs/hardware/espressif/pinmux/esp32-s3) |
| ESP32-C3 | `TUYA_ADC_NUM_0`（GPIO 0-4） | `TUYA_ADC_NUM_1`（GPIO 5） | [ESP32-C3 Pinmux](/docs/hardware/espressif/pinmux/esp32-c3) |
| ESP32-C6 | `TUYA_ADC_NUM_0`（GPIO 0-6） | N/A | [ESP32-C6 Pinmux](/docs/hardware/espressif/pinmux/esp32-c6) |
| T5AI | `TUYA_ADC_NUM_0`（P0-P28） | N/A | [T5AI Peripheral Mapping](/docs/hardware/tuya-t5/t5ai-peripheral-mapping) |

## ESP32 ADC2 与 Wi-Fi 冲突

:::warning
在经典 ESP32 上，**Wi-Fi 工作期间无法使用 ADC2**。ADC2 通道与 Wi-Fi 射频共用硬件。如果应用使用 Wi-Fi（大多数都会），则仅 ADC1 通道可用。

该限制不适用于 ESP32-S3、ESP32-C3 或 ESP32-C6。
:::

## 位宽选项

| 位宽 | 分辨率 | 最大原始值 |
|-------|-----------|---------------|
| 9 | 512 级 | 511 |
| 10 | 1024 级 | 1023 |
| 11 | 2048 级 | 2047 |
| 12（默认） | 4096 级 | 4095 |
| 13 | 8192 级 | 8191 |

并非所有芯片都支持全部位宽。为获得最佳兼容性，使用 `12`。

## 温度传感器

在 ESP32 上 `tkl_adc_temperature_get()` 返回 `OPRT_NOT_SUPPORTED`。芯片内部温度传感器使用单独的 ESP-IDF 驱动（`temperature_sensor_*`），而非 ADC 通路。

## 实战示例：电池电压监测

通过分压电阻（2:1 比例）读取电池电压：

```c
#define BATTERY_ADC_PORT    TUYA_ADC_NUM_0
#define BATTERY_ADC_CHANNEL 5
#define DIVIDER_RATIO       2.0f

float get_battery_voltage_mv(void)
{
    TUYA_ADC_BASE_CFG_T cfg = {
        .ch_list.data = (1 << BATTERY_ADC_CHANNEL),
        .ch_nums = 1,
        .width = 12,
    };
    tkl_adc_init(BATTERY_ADC_PORT, &cfg);

    int32_t raw;
    tkl_adc_read_single_channel(BATTERY_ADC_PORT, BATTERY_ADC_CHANNEL, &raw);
    tkl_adc_deinit(BATTERY_ADC_PORT);

    uint32_t ref_mv = tkl_adc_ref_voltage_get(BATTERY_ADC_PORT);

    float measured_mv = (float)raw * ref_mv / 4095.0f;
    return measured_mv * DIVIDER_RATIO;
}
```

## 参考资料

- [TKL ADC API](/docs/tkl-api/tkl_adc)
- [SDK 中的 ADC 示例](https://github.com/tuya/TuyaOpen/tree/master/examples/peripherals/adc)
- [ESP32 引脚映射](/docs/hardware/espressif/esp32-pin-mapping)
