---
title: "ESP32 Pin Mapping -- Overview"
---

# ESP32 Pin Mapping

This article explains the mapping between ESP32 on-chip peripherals and the TuyaOpen TKL layer's software ports and pins — covering the correspondence between `TUYA_GPIO_NUM_E` enum values and physical GPIO numbers, and how to route peripherals to specific pins using the pinmux interface.

## Common Pin Mapping Mechanics

These mechanisms apply to all ESP32 chip variants.

### GPIO Number Mapping

TuyaOpen uses a **direct 1:1 mapping** on ESP32: `TUYA_GPIO_NUM_E` enum values map directly to physical ESP32 GPIO numbers. `TUYA_GPIO_NUM_18` operates on physical `GPIO18`, `TUYA_GPIO_NUM_5` operates on physical `GPIO5`, and so on.

This mapping is defined in the `pinmap[]` array in [`tkl_pin.c`](https://github.com/tuya/TuyaOpen-esp32/blob/master/tuya_open_sdk/tuyaos_adapter/src/drivers/tkl_pin.c). The available GPIO range varies by chip variant.

For the available GPIO range per chip, see the [Per-Platform Pin Mapping Docs](#per-platform-pin-mapping-docs) below.

### Pinmux (Pin Multiplexing)

**What it does:** ESP32 on-chip peripherals (I2C, PWM, UART, etc.) are not hardwired to fixed pins — they can be flexibly routed to different GPIOs. The TKL `tkl_io_pinmux_config()` function wraps this capability, letting developers assign a peripheral function to a specific pin before initialization.

**When to use it:**
- The board's default pins conflict with your hardware design (e.g., a pin is occupied by another peripheral)
- Your custom board does not follow TuyaOpen's default pin assignments
- Your application uses multiple instances of the same peripheral type (e.g., two I2C buses) that need separate pins

**How to use it:** Call `tkl_io_pinmux_config()` **before** the corresponding `tkl_xxx_init()`:

```c
// Route I2C0 to GPIO42 (SCL) and GPIO41 (SDA)
tkl_io_pinmux_config(TUYA_GPIO_NUM_42, TUYA_IIC0_SCL);
tkl_io_pinmux_config(TUYA_GPIO_NUM_41, TUYA_IIC0_SDA);
tkl_i2c_init(TUYA_I2C_NUM_0, &cfg);   // picks up the pin assignment above

// Route PWM0 to GPIO5
tkl_io_pinmux_config(TUYA_GPIO_NUM_5, TUYA_PWM0);
tkl_pwm_init(TUYA_PWM_NUM_0, &pwm_cfg);
```

:::info[Note]
`tkl_io_pinmux_config()` must be called before the corresponding `tkl_xxx_init()`. Calling it after initialization has no effect.
:::

## Per-Platform Pin Mapping Docs

Each ESP32 chip variant has a dedicated pin mapping document covering its GPIO range, UART defaults, and board configurations:

- [ESP32 (Classic)](pinmux/esp32-classic) -- Dual-core Xtensa LX6, GPIO 0–39
- [ESP32-S3](pinmux/esp32-s3) -- Dual-core Xtensa LX7, GPIO 0–48, AI/audio capable
- [ESP32-C3](pinmux/esp32-c3) -- Single RISC-V core, GPIO 0–21, cost-optimized
- [ESP32-C6](pinmux/esp32-c6) -- Single RISC-V core, GPIO 0–30, Wi-Fi 6

## ADC Mapping

ADC on ESP32 uses a **port + channel bitmask** model in [`tkl_adc.c`](https://github.com/tuya/TuyaOpen-esp32/blob/master/tuya_open_sdk/tuyaos_adapter/src/drivers/tkl_adc.c):

| TuyaOpen Port | ESP-IDF Unit | Notes |
|--------------|-------------|-------|
| `TUYA_ADC_NUM_0` | `ADC_UNIT_1` | Always available |
| `TUYA_ADC_NUM_1` | `ADC_UNIT_2` | Unavailable during Wi-Fi on classic ESP32 |

**Channel selection:** `cfg->ch_list.data` is a bitmask where bit N enables `ADC_CHANNEL_N`.

**Fixed settings:** Attenuation is `ADC_ATTEN_DB_12` (~0–3.3 V range). `tkl_adc_ref_voltage_get()` returns 3300 mV. Calibration uses curve-fitting (S2/S3/C3/C6) or line-fitting (classic ESP32).

**Not supported:** `tkl_adc_temperature_get()` returns `OPRT_NOT_SUPPORTED`. Use the ESP-IDF temperature sensor driver instead.

## References

- [ESP32 on TuyaOpen -- Overview](overview-esp32)
- [ESP32 Supported Features](esp32-supported-features)
- [Adding a New ESP32 Board](esp32-new-board)
