---
title: "ADC Peripheral Guide"
---

# ADC Peripheral Guide

Read analog voltages from sensors, potentiometers, and other analog sources using the TuyaOpen TKL ADC interface.

## Prerequisites

- Completed [Environment Setup](../../quick-start/enviroment-setup)
- Board with `ENABLE_ADC=y` in Kconfig

## How ADC Works in TuyaOpen

TuyaOpen's ADC uses a **port + channel bitmask** model:

- **Port** selects the ADC unit: `TUYA_ADC_NUM_0` = ADC1, `TUYA_ADC_NUM_1` = ADC2
- **Channel bitmask** (`cfg->ch_list.data`) enables specific channels: bit N enables `ADC_CHANNEL_N`
- **Attenuation** is fixed at `ADC_ATTEN_DB_12` (0-3.3 V full range)
- **Reference voltage** is 3300 mV (`tkl_adc_ref_voltage_get()`)

## Basic ADC Read

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

## Converting Raw to Voltage

```c
uint32_t raw;
read_adc(&raw);

uint32_t ref_mv;
tkl_adc_ref_voltage_get(ADC_PORT, &ref_mv);

float voltage = (float)raw * ref_mv / ((1 << 12) - 1);
TAL_PR_INFO("voltage: %.2f mV", voltage);
```

## Multi-Channel Reading

Enable multiple channels simultaneously with the bitmask:

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

## ADC Channel-to-GPIO Mapping

Channel-to-GPIO mapping depends on the chip. See the per-chip pinmux docs for complete tables:

| Platform | ADC1 Port | ADC2 Port | Pinmux Doc |
|----------|-----------|-----------|-----------|
| ESP32 | `TUYA_ADC_NUM_0` (GPIO 32-39) | `TUYA_ADC_NUM_1` (GPIO 0-27) | [ESP32 Classic Pinmux](/docs/hardware-specific/espressif/pinmux/esp32-classic) |
| ESP32-S3 | `TUYA_ADC_NUM_0` (GPIO 1-10) | `TUYA_ADC_NUM_1` (GPIO 11-20) | [ESP32-S3 Pinmux](/docs/hardware-specific/espressif/pinmux/esp32-s3) |
| ESP32-C3 | `TUYA_ADC_NUM_0` (GPIO 0-4) | `TUYA_ADC_NUM_1` (GPIO 5) | [ESP32-C3 Pinmux](/docs/hardware-specific/espressif/pinmux/esp32-c3) |
| ESP32-C6 | `TUYA_ADC_NUM_0` (GPIO 0-6) | N/A | [ESP32-C6 Pinmux](/docs/hardware-specific/espressif/pinmux/esp32-c6) |
| T5AI | `TUYA_ADC_NUM_0` (P0-P28) | N/A | [T5AI Peripheral Mapping](/docs/hardware-specific/tuya-t5/t5ai-peripheral-mapping) |

## ESP32 ADC2 and Wi-Fi Conflict

:::warning
On classic ESP32, **ADC2 cannot be used while Wi-Fi is active**. ADC2 channels share hardware with the Wi-Fi radio. If your application uses Wi-Fi (most do), only ADC1 channels are available.

This limitation does not apply to ESP32-S3, ESP32-C3, or ESP32-C6.
:::

## Bit Width Options

| Width | Resolution | Max Raw Value |
|-------|-----------|---------------|
| 9 | 512 levels | 511 |
| 10 | 1024 levels | 1023 |
| 11 | 2048 levels | 2047 |
| 12 (default) | 4096 levels | 4095 |
| 13 | 8192 levels | 8191 |

Not all widths are available on all chips. Use `12` for best compatibility.

## Temperature Sensor

`tkl_adc_temperature_get()` returns `OPRT_NOT_SUPPORTED` on ESP32. The chip's internal temperature sensor uses a separate ESP-IDF driver (`temperature_sensor_*`), not the ADC path.

## Practical Example: Battery Voltage Monitor

Read a battery voltage through a resistor divider (2:1 ratio):

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

    uint32_t ref_mv;
    tkl_adc_ref_voltage_get(BATTERY_ADC_PORT, &ref_mv);

    float measured_mv = (float)raw * ref_mv / 4095.0f;
    return measured_mv * DIVIDER_RATIO;
}
```

## References

- [TKL ADC API](/docs/tkl-api/tkl_adc)
- [ADC example in SDK](https://github.com/tuya/TuyaOpen/tree/master/examples/peripherals/adc)
- [ESP32 Pin Mapping](/docs/hardware-specific/espressif/esp32-pin-mapping)
