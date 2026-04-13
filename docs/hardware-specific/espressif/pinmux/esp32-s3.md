---
title: "ESP32-S3 Peripheral Mapping"
---

This document describes the mapping between ESP32-S3 hardware peripherals and TuyaOpen TKL/TAL software ports. Cross-referenced with [`tkl_pin.c`](https://github.com/tuya/TuyaOpen-esp32/blob/master/tuya_open_sdk/tuyaos_adapter/src/drivers/tkl_pin.c), [`tkl_uart.c`](https://github.com/tuya/TuyaOpen-esp32/blob/master/tuya_open_sdk/tuyaos_adapter/src/drivers/tkl_uart.c), [`tkl_i2c.c`](https://github.com/tuya/TuyaOpen-esp32/blob/master/tuya_open_sdk/tuyaos_adapter/src/drivers/tkl_i2c.c), [`tkl_pwm.c`](https://github.com/tuya/TuyaOpen-esp32/blob/master/tuya_open_sdk/tuyaos_adapter/src/drivers/tkl_pwm.c), [`tkl_adc.c`](https://github.com/tuya/TuyaOpen-esp32/blob/master/tuya_open_sdk/tuyaos_adapter/src/drivers/tkl_adc.c).

## GPIO

- ESP32-S3 has 49 GPIO entries in the pinmap. GPIO 22-25 are `GPIO_NUM_NC` (not connected).
- All usable GPIOs support interrupts (rise, fall, both edges, level).
- `TUYA_GPIO_NUM_N` maps directly to physical `GPIO_NUM_N`.

| Board Pin | Function | Software Pin | Software Port | Notes |
|-----------|----------|-------------|---------------|-------|
| GPIO 0-21 | GPIO | `TUYA_GPIO_NUM_0` - `TUYA_GPIO_NUM_21` | / | Fully usable |
| GPIO 22-25 | NC | `TUYA_GPIO_NUM_22` - `TUYA_GPIO_NUM_25` | / | **Not connected -- do not use** |
| GPIO 26-48 | GPIO | `TUYA_GPIO_NUM_26` - `TUYA_GPIO_NUM_48` | / | Fully usable |

Source: `tkl_pin.c` lines 77-84 (`CONFIG_IDF_TARGET_ESP32S3` block).

## ADC

- ESP32-S3 supports two ADC units via the oneshot driver with curve-fitting calibration.
- Channels are selected via a bitmask: bit N in `cfg->ch_list.data` enables `ADC_CHANNEL_N`.
- Fixed attenuation: `ADC_ATTEN_DB_12` (0-3.3 V range). Reference voltage: 3300 mV.
- `tkl_adc_temperature_get()` returns `OPRT_NOT_SUPPORTED`.

| ADC Channel | GPIO | Software Pin | Software Port |
|-------------|------|-------------|---------------|
| ADC1_CH0 | GPIO 1 | ch_0 (bit 0) | `TUYA_ADC_NUM_0` |
| ADC1_CH1 | GPIO 2 | ch_1 (bit 1) | `TUYA_ADC_NUM_0` |
| ADC1_CH2 | GPIO 3 | ch_2 (bit 2) | `TUYA_ADC_NUM_0` |
| ADC1_CH3 | GPIO 4 | ch_3 (bit 3) | `TUYA_ADC_NUM_0` |
| ADC1_CH4 | GPIO 5 | ch_4 (bit 4) | `TUYA_ADC_NUM_0` |
| ADC1_CH5 | GPIO 6 | ch_5 (bit 5) | `TUYA_ADC_NUM_0` |
| ADC1_CH6 | GPIO 7 | ch_6 (bit 6) | `TUYA_ADC_NUM_0` |
| ADC1_CH7 | GPIO 8 | ch_7 (bit 7) | `TUYA_ADC_NUM_0` |
| ADC1_CH8 | GPIO 9 | ch_8 (bit 8) | `TUYA_ADC_NUM_0` |
| ADC1_CH9 | GPIO 10 | ch_9 (bit 9) | `TUYA_ADC_NUM_0` |
| ADC2_CH0 | GPIO 11 | ch_0 (bit 0) | `TUYA_ADC_NUM_1` |
| ADC2_CH1 | GPIO 12 | ch_1 (bit 1) | `TUYA_ADC_NUM_1` |
| ADC2_CH2 | GPIO 13 | ch_2 (bit 2) | `TUYA_ADC_NUM_1` |
| ADC2_CH3 | GPIO 14 | ch_3 (bit 3) | `TUYA_ADC_NUM_1` |
| ADC2_CH4 | GPIO 15 | ch_4 (bit 4) | `TUYA_ADC_NUM_1` |
| ADC2_CH5 | GPIO 16 | ch_5 (bit 5) | `TUYA_ADC_NUM_1` |
| ADC2_CH6 | GPIO 17 | ch_6 (bit 6) | `TUYA_ADC_NUM_1` |
| ADC2_CH7 | GPIO 18 | ch_7 (bit 7) | `TUYA_ADC_NUM_1` |
| ADC2_CH8 | GPIO 19 | ch_8 (bit 8) | `TUYA_ADC_NUM_1` |
| ADC2_CH9 | GPIO 20 | ch_9 (bit 9) | `TUYA_ADC_NUM_1` |

Source: `tkl_adc.c` `__port_to_unit()` + Espressif `soc/esp32s3/include/soc/adc_channel.h`.

## I2C

- Software supports up to 2 I2C master ports. Slave mode is not supported (`OPRT_NOT_SUPPORTED`).
- Default pins are overridden by calling `tkl_io_pinmux_config()` before `tkl_i2c_init()`.
- ESP32-S3 GPIO matrix allows any GPIO for I2C.

### Default Pins (Before Pinmux Override)

| Board Pin | Function | Software Pin | Software Port |
|-----------|----------|-------------|---------------|
| GPIO 0 | I2C0_SCL | `TUYA_IIC0_SCL` | `TUYA_I2C_NUM_0` |
| GPIO 1 | I2C0_SDA | `TUYA_IIC0_SDA` | `TUYA_I2C_NUM_0` |
| GPIO 2 | I2C1_SCL | `TUYA_IIC1_SCL` | `TUYA_I2C_NUM_1` |
| GPIO 3 | I2C1_SDA | `TUYA_IIC1_SDA` | `TUYA_I2C_NUM_1` |

Source: `tkl_i2c.c` `sg_i2c_pin[]` lines 39-46.

### Board-Level I2C Overrides

Boards override defaults via `tkl_io_pinmux_config()` in `board_register_hardware()`:

| Board | SCL | SDA | Used By |
|-------|-----|-----|---------|
| DNESP32S3 | GPIO 42 | GPIO 41 | ES8388, XL9555 |
| DNESP32S3-BOX | GPIO 45 | GPIO 48 | ES8311, XL9555 |
| DNESP32S3-BOX2 | GPIO 47 | GPIO 48 | ES8389 |
| Bread Compact | GPIO 42 | GPIO 41 | SSD1306 OLED |
| XingZhi Cube | GPIO 42 | GPIO 41 | SSD1306 OLED |
| Waveshare AMOLED | GPIO 14 | GPIO 15 | FT5x06, TCA9554 |

Source: each board's `board_config.h` under `boards/ESP32/`.

## UART

- Software supports 2 UART ports.
- UART0 pins are configurable via Kconfig. UART1 pins are fixed in the driver.
- Boards with `ENABLE_ESP32S3_USB_JTAG_ONLY` route UART0 through the internal USB Serial JTAG controller (no GPIO pins used).

| Board Pin | Function | Software Pin | Software Port | Notes |
|-----------|----------|-------------|---------------|-------|
| GPIO 43 (default) | UART0_TX | `TUYA_UART0_TX` | `TUYA_UART_NUM_0` | Override via `UART_NUM0_TX_PIN` in Kconfig |
| GPIO 44 (default) | UART0_RX | `TUYA_UART0_RX` | `TUYA_UART_NUM_0` | Override via `UART_NUM0_RX_PIN` in Kconfig |
| N/A | UART0_RTS | / | `TUYA_UART_NUM_0` | `UART_PIN_NO_CHANGE` (not connected) |
| N/A | UART0_CTS | / | `TUYA_UART_NUM_0` | `UART_PIN_NO_CHANGE` (not connected) |
| GPIO 17 | UART1_TX | `TUYA_UART1_TX` | `TUYA_UART_NUM_1` | Fixed in driver |
| GPIO 18 | UART1_RX | `TUYA_UART1_RX` | `TUYA_UART_NUM_1` | Fixed in driver |
| N/A | UART1_RTS | / | `TUYA_UART_NUM_1` | `UART_PIN_NO_CHANGE` |
| N/A | UART1_CTS | / | `TUYA_UART_NUM_1` | `UART_PIN_NO_CHANGE` |

Source: `tkl_uart.c` lines 240-255.

## PWM

- Implemented via ESP-IDF LEDC peripheral. 6 channels mapped by default, override via `tkl_io_pinmux_config()`.
- ESP32-S3 hardware supports 8 LEDC channels; the TKL adapter exposes 6.
- Resolution: 12-bit (4096 steps). Speed mode: `LEDC_LOW_SPEED_MODE`.

| Board Pin | Function | Software Pin | Software Port | Notes |
|-----------|----------|-------------|---------------|-------|
| GPIO 18 (default) | PWM_CH0 | `TUYA_PWM0` | `TUYA_PWM_NUM_0` | Override via pinmux |
| GPIO 19 (default) | PWM_CH1 | `TUYA_PWM1` | `TUYA_PWM_NUM_1` | Override via pinmux |
| GPIO 22 (default) | PWM_CH2 | `TUYA_PWM2` | `TUYA_PWM_NUM_2` | **GPIO 22 is NC on S3** -- must override |
| GPIO 23 (default) | PWM_CH3 | `TUYA_PWM3` | `TUYA_PWM_NUM_3` | **GPIO 23 is NC on S3** -- must override |
| GPIO 25 (default) | PWM_CH4 | `TUYA_PWM4` | `TUYA_PWM_NUM_4` | **GPIO 25 is NC on S3** -- must override |
| GPIO 26 (default) | PWM_CH5 | `TUYA_PWM5` | `TUYA_PWM_NUM_5` | Override via pinmux |

:::warning Default PWM Pins Invalid on S3
The default PWM map in `tkl_pwm.c` uses GPIO 22, 23, 25 which are `GPIO_NUM_NC` on ESP32-S3. You **must** call `tkl_io_pinmux_config()` to remap channels 2, 3, and 4 to valid GPIO pins before using them.
:::

Source: `tkl_pwm.c` `sg_pwm_gpio_map[]` lines 43-50.

## I2S

- ESP32-S3 supports 2 I2S ports. Compiled only when `ENABLE_AUDIO=y` in Kconfig.
- I2S pins are configured at the board level via `board_config.h`, not through the TKL pinmux.

### Default I2S Pins

| Board Pin | Function | Software Port | Notes |
|-----------|----------|---------------|-------|
| GPIO 5 | I2S0_CLK | I2S instance 0 | Driver default |
| GPIO 4 | I2S0_WS | I2S instance 0 | Driver default |
| GPIO 6 | I2S0_DATA | I2S instance 0 | Driver default |
| GPIO 15 | I2S1_CLK | I2S instance 1 | Driver default |
| GPIO 16 | I2S1_WS | I2S instance 1 | Driver default |
| GPIO 7 | I2S1_DATA | I2S instance 1 | Driver default |

Source: `tkl_i2s.c` lines 50-54.

### Board-Level I2S Overrides

| Board | MCLK | BCLK | WS | DOUT | DIN | Codec |
|-------|------|------|----|------|-----|-------|
| DNESP32S3 | GPIO 0 | GPIO 46 | GPIO 3 | GPIO 9 | GPIO 10 | ES8388 |
| DNESP32S3-BOX | -1 | GPIO 13 | GPIO 47 | GPIO 14 | GPIO 21 | ES8311 |
| DNESP32S3-BOX2 | GPIO 38 | GPIO 41 | GPIO 39 | GPIO 42 | GPIO 40 | ES8389 |
| Waveshare AMOLED | GPIO 16 | GPIO 45 | GPIO 9 | GPIO 8 | GPIO 10 | ES8311 |

Source: each board's `board_config.h`.

## SPI

- **`tkl_spi` is not implemented** on ESP32 (no `tkl_spi.c` in the adapter). The `ENABLE_SPI=y` Kconfig flag does not produce a TKL SPI driver.
- SPI is handled at the **board BSP level** using ESP-IDF `esp_lcd_*` / `spi_master` directly.
- `tkl_io_pinmux_config()` SPI cases are no-ops.

### Board-Level SPI Assignments

| Board | SPI Host | MOSI | CLK | CS | DC | RST | Use |
|-------|----------|------|-----|----|----|-----|-----|
| DNESP32S3 | SPI2 | GPIO 11 | GPIO 12 | GPIO 40 | GPIO 21 | -1 | ST7789 LCD |
| Waveshare AMOLED | SPI2 | GPIO 7 | GPIO 6 | GPIO 12 | - | GPIO 17 | SH8601 QSPI |

Source: each board's `board_config.h`.

## TIMER

- Software supports 3 GPTimer instances (`TIMER_DEV_NUM = 3`).
- Resolution: 1 MHz (1 tick = 1 us). Count direction: up.
- `tkl_timer_get_current_value()` returns `OPRT_NOT_SUPPORTED`.

Source: `tkl_timer.c` lines 23, 98-100.

## WATCHDOG

- Uses ESP-IDF Task WDT. Timeout configurable via `cfg->interval_ms`.
- **`trigger_panic = true`** -- watchdog timeout causes system panic and reset.

Source: `tkl_watchdog.c` lines 42-54.

## RTC

- Not a hardware RTC driver. Uses POSIX `gettimeofday` / `settimeofday`.
- Time is lost on power cycle unless synced from cloud/NTP.

Source: `tkl_rtc.c` lines 44-64.

## TKL Not Implemented on ESP32-S3

| Interface | Status | Workaround |
|-----------|--------|-----------|
| `tkl_spi` | Not implemented | Use ESP-IDF `spi_master` or board BSP |
| `tkl_dac` | Not available | ESP32-S3 has no DAC hardware |
| `tkl_display` | No TKL layer | Board BSP + ESP-IDF LVGL |
| `tkl_qspi` | Not implemented | Board BSP handles QSPI (SH8601) |
| `tkl_camera` | Not implemented | Use ESP-IDF `esp_camera` |
| `tkl_i2c` slave mode | `OPRT_NOT_SUPPORTED` | Use ESP-IDF `i2c_slave` |
| `tkl_cpu_sleep_callback` | `OPRT_NOT_SUPPORTED` | Use ESP-IDF `esp_pm_*` |
| `tkl_timer_get_current_value` | `OPRT_NOT_SUPPORTED` | Use `gptimer_get_raw_count()` |
| `tkl_system_get_cpu_info` | `OPRT_NOT_SUPPORTED` | Use `esp_chip_info()` |
| `tkl_flash_lock/unlock` | `OPRT_NOT_SUPPORTED` | Use ESP-IDF flash encryption |

## References

- [ESP32 Peripheral Mapping Overview](../esp32-pin-mapping)
- [ESP32-S3 Datasheet](https://www.espressif.com.cn/sites/default/files/documentation/esp32-s3_datasheet_en.pdf)
- [boards/ESP32/ source](https://github.com/tuya/TuyaOpen/tree/master/boards/ESP32)
- [TuyaOpen-esp32 adapter drivers](https://github.com/tuya/TuyaOpen-esp32/tree/master/tuya_open_sdk/tuyaos_adapter/src/drivers)
