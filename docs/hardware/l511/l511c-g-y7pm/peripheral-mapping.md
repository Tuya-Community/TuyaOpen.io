---
title: L511C/G-Y7PM Peripheral Mapping
description: Pin multiplexing and TuyaOpen SDK support status for L511C/G-Y7PM.
---

# L511C/G-Y7PM Peripheral Mapping

Applies to L511C-Y7PM and L511G-Y7PM. The GPIO API uses module pin numbers. I/O defaults to 1.8 V; 3.3 V requires SDK configuration support. “Registered” means the ordinary GPIO API recognizes the pin. An unexposed pin returns `OPRT_COM_ERROR` from init; ordinary init on Pin 79 returns `OPRT_NOT_SUPPORTED`. This does not prevent independent peripheral multiplexing.

## GPIO

| Tuya Pin | Default/multiplexed function | C ordinary GPIO | G ordinary GPIO | Notes |
|---:|---|---|---|---|
| 5 | GPIO1 | Registered | Registered | Init configures a wakeup pad. |
| 6 | GPIO2 | Registered | Registered | Init configures a wakeup pad. |
| 16 | NET_STATUS | Registered | Registered | Occupied by the network status indicator. |
| 19 | MAIN_DTR | Registered | Registered | Init configures a wakeup pad. |
| 20 | MAIN_RI | Registered | Registered |  |
| 21 | MAIN_DCD | Registered | Registered |  |
| 22 | MAIN_CTS | Registered | Registered |  |
| 25 | STATUS | Registered | Registered |  |
| 26 | I2S_MCLK | Registered | Registered |  |
| 28 | AUX_RXD | Registered | Registered |  |
| 29 | AUX_TXD | Registered | Registered |  |
| 30 | PCM_CLK | Registered | Registered |  |
| 31 | PCM_SYNC | Registered | Registered |  |
| 32 | PCM_DIN | Registered | Registered | Interrupt anomaly noted in the old reference. |
| 33 | PCM_DOUT | Registered | Registered |  |
| 49 | LCD_RST | Registered | Registered |  |
| 50 | LCD_SPI_OUT | Registered | Registered |  |
| 51 | LCD_SPI_RS | Registered | Registered |  |
| 52 | LCD_SPI_CS | Registered | Registered |  |
| 53 | LCD_SPI_CLK | Registered | Registered |  |
| 54 | CAM_MCLK | Registered | Registered |  |
| 55 | CAM_SPI_DATA0 | Registered | Registered |  |
| 56 | CAM_SPI_DATA1 | Registered | Registered |  |
| 57 | CAM_I2C_SCL | Registered | Registered |  |
| 58 | CAM_I2C_SDA | Registered | Registered | Interrupt anomaly noted in the old reference. |
| 62 | USIM2_CLK | Not exposed | Not exposed |  |
| 63 | USIM2_RST | Not exposed | Not exposed |  |
| 64 | USIM2_DATA | Not exposed | Not exposed |  |
| 66 | I2C1_SDA | Registered | Not exposed | C source notes IRQ abnormal despite output registration. |
| 67 | I2C1_SCL | Registered | Not exposed | C source notes IRQ abnormal despite output registration. |
| 78 | LCD_TE | Registered | Not exposed |  |
| 79 | USIM1_DET | Dedicated/conditional | Dedicated/conditional | Both SDKs return `OPRT_NOT_SUPPORTED` from `tkl_gpio_init`; SIM-detect/wakeup use, subject to platform conditions. |
| 80 | CAM_SPI_CLK | Registered | Registered |  |
| 81 | CAM_PWDN | Registered | Registered |  |
| 82 | USB_BOOT | Registered | Registered | USB boot function. |
| 100 | GPIO3 | Not exposed | Registered | May be occupied on versions with built-in GNSS, per hardware reference. |
| 101 | GPIO4 | Registered | Not exposed |  |
| 103 | CAM_RST_N | Registered | Not exposed |  |

## ADC

ADC ports 0 and 1 support `tkl_adc_read_voltage()`; `tkl_adc_read_data()` and `tkl_adc_read_single_channel()` return `OPRT_NOT_SUPPORTED`.

## PWM

| Tuya PWM | Tuya Pin | PWM channel in hardware reference |
|---:|---:|---|
| 0 | 22 | PWM0 |
| 1 | 23 | PWM1 |
| 2 | 54 | PWM2 |
| 3 | 25 | PWM3 |
| 4 | 20 | PWM4 |

PWM pins are multiplexed with other functions; configure the selected model accordingly.

## I2C

Current default routing in the C/G-Y7PM SDK `tkl_i2c.c`:

| SDK I2C port | SCL | SDA | Status |
|---:|---:|---:|---|
| I2C0 | Tuya Pin 57 | Tuya Pin 58 | SDK default; old reference notes interrupt anomaly on Pin 58 |
| I2C1 | Tuya Pin 67 | Tuya Pin 66 | SDK default; SDA=66, SCL=67 |

I2C master initialization, send, and receive are supported; IRQ and slave interfaces are not supported.

## SPI

Reference pin multiplexing (requires configuration):

| SPI port | CS | MOSI | MISO | CLK |
|---:|---:|---:|---:|---:|
| SPI0 | 66 | 67 | 28 | 29 |
| SPI1 | 64 | 63 | 62 | 49 |

## UART

| Tuya UART | Reference status |
|---:|---|
| 0 | OK |
| 1 | OK |
| 2 | Pending verification |
| 3 (USB UART) | OK |

Pin mapping is not provided.

## I2S

Reference PCM/I2S pins: Pin 30 PCM_CLK, 31 PCM_SYNC, 32 PCM_DIN, 33 PCM_DOUT, and 26 I2S_MCLK; ES8311 is listed. Configure the codec and clocks for the design.

## References

- [Hardware reference](https://github.com/tuya/tuyaopen-ide-manifests/blob/main/docs/hardware/l511c-g-y7pm.md)
- [L511C-Y7PM SDK source](https://github.com/tuya/TuyaOpen-LYNQ/tree/8034a0198880850ca9e579b2f254b592c3132327/tuyaos/tuyaos_adapter/src)
- [L511G-Y7PM SDK source](https://github.com/tuya/TuyaOpen-LYNQ/tree/d7ccde744e87659d8dd11bcaa7b246c5b9f856cf/tuyaos/tuyaos_adapter/src)
