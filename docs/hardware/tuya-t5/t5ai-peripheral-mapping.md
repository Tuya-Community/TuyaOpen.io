---
title: T5AI Peripheral Mapping
---

This document describes the mapping relationship between T5AI hardware peripherals and Tuya TKL layer software peripheral ports.

## GPIO 

- All GPIO pins on the module support interrupts.

| Board Pin | Function | Software Pin                       | Software Port |
| --------- | -------- | ---------------------------------- | ------------- |
| P0 - P55  | GPIO     | TUYA_GPIO_NUM_0 - TUYA_GPIO_NUM_55 | /             |



## ADC

- The module supports one 12-bit ADC, with 11 acquisition channels per ADC group.

| Board Pin | Function | Software Pin | Software port  |
| --------- | -------- | ------------ | -------------- |
| P25       | ADC1     | ch_1         | TUYA_ADC_NUM_0 |
| P24       | ADC2     | ch_2         | TUYA_ADC_NUM_0 |
| P23       | ADC3     | ch_3         | TUYA_ADC_NUM_0 |
| P28       | ADC4     | ch_4         | TUYA_ADC_NUM_0 |
| P22       | ADC5     | ch_5         | TUYA_ADC_NUM_0 |
| P21       | ADC6     | ch_6         | TUYA_ADC_NUM_0 |
| P8        | ADC10    | ch_10        | TUYA_ADC_NUM_0 |
| P0        | ADC12    | ch_12        | TUYA_ADC_NUM_0 |
| P1        | ADC13    | ch_13        | TUYA_ADC_NUM_0 |
| P12       | ADC14    | ch_14        | TUYA_ADC_NUM_0 |
| P13       | ADC15    | ch_15        | TUYA_ADC_NUM_0 |



## IIC 

- The module supports 2 hardware IIC channels.
- Software supports 3 IIC channels. By default, the first two are hardware IIC and the third is software-simulated IIC. You can also configure all three channels as software-simulated IIC.
- The second hardware IIC channel has 4 pin groups available for selection. You need to call the `tkl_io_pinmux_config` interface to configure it before IIC initialization.
- If you want to use software-simulated IIC, you need to call the `tkl_io_pinmux_config` interface to map non-hardware IIC pins to corresponding function pins before IIC initialization.

### Hardware IIC

| Board Pin | Function | Software Pin  | Software Port  |
| --------- | -------- | ------------- | -------------- |
| P20       | I2C0_SCL | TUYA_IIC0_SCL | TUYA_I2C_NUM_0 |
| P21       | I2C0_SDA | TUYA_IIC0_SDA | TUYA_I2C_NUM_0 |
| P0        | I2C1_SCL | TUYA_IIC1_SCL | TUYA_I2C_NUM_1 |
| P1        | I2C1_SDA | TUYA_IIC1_SDA | TUYA_I2C_NUM_1 |
| P14       | I2C1_SCL | TUYA_IIC1_SCL | TUYA_I2C_NUM_1 |
| P15       | I2C1_SDA | TUYA_IIC1_SDA | TUYA_I2C_NUM_1 |
| P38       | I2C1_SCL | TUYA_IIC1_SCL | TUYA_I2C_NUM_1 |
| P39       | I2C1_SDA | TUYA_IIC1_SDA | TUYA_I2C_NUM_1 |
| P42       | I2C1_SCL | TUYA_IIC1_SCL | TUYA_I2C_NUM_1 |
| P43       | I2C1_SDA | TUYA_IIC1_SDA | TUYA_I2C_NUM_1 |



## UART

- The module supports 3 UART channels.
- By default, the second UART channel (UART1) is the module log port and is not recommended for use as a regular UART.
- The third UART channel has 2 pin groups available for selection. You can call the `tkl_io_pinmux_config` interface to configure it before UART initialization.

| Board Pin      | Function  | Software Pin   | Software Port   |
| -------------- | --------- | -------------- | --------------- |
| P11            | UART0_TX  | TUYA_UART0_TX  | TUYA_UART_NUM_0 |
| P10            | UART0_RX  | TUYA_UART0_RX  | TUYA_UART_NUM_0 |
| P13            | UART0_CTS | TUYA_UART0_CTS | TUYA_UART_NUM_0 |
| P12            | UART0_RTS | TUYA_UART0_RTS | TUYA_UART_NUM_0 |
| P0             | UART1_TX  | TUYA_UART1_TX  | TUYA_UART_NUM_1 |
| P1             | UART1_RX  | TUYA_UART1_RX  | TUYA_UART_NUM_1 |
| P31  (default) | UART2_TX  | TUYA_UART2_TX  | TUYA_UART_NUM_2 |
| P30  (default) | UART2_RX  | TUYA_UART2_RX  | TUYA_UART_NUM_2 |
| P41            | UART2_TX  | TUYA_UART2_TX  | TUYA_UART_NUM_2 |
| P40            | UART2_RX  | TUYA_UART2_RX  | TUYA_UART_NUM_2 |



## PWM

- The module supports 12 PWM channels.

| Board Pin | Function   | Software Pin | Software Port   |
| --------- | ---------- | ------------ | --------------- |
| P18       | PWMG0_PWM0 | TUYA_PWM0    | TUYA_PWM_NUM_0  |
| P24       | PWMG0_PWM4 | TUYA_PWM1    | TUYA_PWM_NUM_1  |
| P32       | PWMG1_PWM0 | TUYA_PWM2    | TUYA_PWM_NUM_2  |
| P34       | PWMG1_PWM2 | TUYA_PWM3    | TUYA_PWM_NUM_3  |
| P36       | PWMG1_PWM4 | TUYA_PWM4    | TUYA_PWM_NUM_4  |
| P19       | PWMG0_PWM1 | TUYA_PWM5    | TUYA_PWM_NUM_5  |
| P8        | PWMG0_PWM2 | TUYA_PWM6    | TUYA_PWM_NUM_6  |
| P9        | PWMG0_PWM3 | TUYA_PWM7    | TUYA_PWM_NUM_7  |
| P25       | PWMG0_PWM5 | TUYA_PWM8    | TUYA_PWM_NUM_8  |
| P33       | PWMG1_PWM1 | TUYA_PWM9    | TUYA_PWM_NUM_9  |
| P35       | PWMG1_PWM3 | TUYA_PWM10   | TUYA_PWM_NUM_10 |
| P37       | PWMG1_PWM5 | TUYA_PWM11   | TUYA_PWM_NUM_11 |



## TIMER

- The module supports 6 hardware timers.

- The system occupies the first 3 timers. It is recommended that users start using from the 4th timer (TUYA_TIMER_NUM_3).

  

## SPI

- Hardware supports 2 SPI channels.
- Software supports 4 SPI channels. The first two are hardware SPI, and the last two are hardware QSPI simulating SPI protocol.
- The first SPI channel has 2 pin groups available for selection. You can call the `tkl_io_pinmux_config` interface to configure it before SPI initialization.

| Board Pin     | Function  | Software Pin   | Software Port  |
| ------------- | --------- | -------------- | -------------- |
| P15 (default) | SPI0_CSN  | TUYA_SPI0_CS   | TUYA_SPI_NUM_0 |
| P14 (default) | SPI0_SCK  | TUYA_SPI0_CLK  | TUYA_SPI_NUM_0 |
| P16 (default) | SPI0_MOSI | TUYA_SPI0_MOSI | TUYA_SPI_NUM_0 |
| P17 (default) | SPI0_MISO | TUYA_SPI0_MISO | TUYA_SPI_NUM_0 |
| P45           | SPI0_CSN  | TUYA_SPI0_CS   | TUYA_SPI_NUM_0 |
| P44           | SPI0_SCK  | TUYA_SPI0_CLK  | TUYA_SPI_NUM_0 |
| P46           | SPI0_MOSI | TUYA_SPI0_MOSI | TUYA_SPI_NUM_0 |
| P47           | SPI0_MISO | TUYA_SPI0_MISO | TUYA_SPI_NUM_0 |
| P3            | SPI1_CSN  | TUYA_SPI1_CS   | TUYA_SPI_NUM_1 |
| P2            | SPI1_SCK  | TUYA_SPI1_CLK  | TUYA_SPI_NUM_1 |
| P4            | SPI1_MOSI | TUYA_SPI1_MOSI | TUYA_SPI_NUM_1 |
| P5            | SPI1_MISO | TUYA_SPI1_MISO | TUYA_SPI_NUM_1 |
| P23           | QSPI0_CS  | TUYA_QSPI0_CS  | TUYA_SPI_NUM_2 |
| P22           | QSPI0_SCK | TUYA_QSPI0_CLK | TUYA_SPI_NUM_2 |
| P24           | QSPI0_IO0 | TUYA_QSPI0_IO0 | TUYA_SPI_NUM_2 |
| P25           | QSPI0_IO1 | TUYA_QSPI0_IO1 | TUYA_SPI_NUM_2 |
| P26           | QSPI0_IO2 | TUYA_QSPI0_IO2 | TUYA_SPI_NUM_2 |
| P27           | QSPI0_IO3 | TUYA_QSPI0_IO3 | TUYA_SPI_NUM_2 |
| P3            | QSPI1_CS  | TUYA_QSPI1_CS  | TUYA_SPI_NUM_3 |
| P2            | QSPI1_SCK | TUYA_QSPI1_CLK | TUYA_SPI_NUM_3 |
| P4            | QSPI1_IO0 | TUYA_QSPI1_IO0 | TUYA_SPI_NUM_3 |
| P5            | QSPI1_IO1 | TUYA_QSPI1_IO1 | TUYA_SPI_NUM_3 |
| P6            | QSPI1_IO2 | TUYA_QSPI1_IO2 | TUYA_SPI_NUM_3 |
| P7            | QSPI1_IO3 | TUYA_QSPI0_IO3 | TUYA_SPI_NUM_3 |



## QSPI

- The module supports 2 QSPI channels.


| Board Pin | Function  | Software Pin   | Software Port   |
| --------- | --------- | -------------- | --------------- |
| P23       | QSPI0_CS  | TUYA_QSPI0_CS  | TUYA_QSPI_NUM_0 |
| P22       | QSPI0_SCK | TUYA_QSPI0_CLK | TUYA_QSPI_NUM_0 |
| P24       | QSPI0_IO0 | TUYA_QSPI0_IO0 | TUYA_QSPI_NUM_0 |
| P25       | QSPI0_IO1 | TUYA_QSPI0_IO1 | TUYA_QSPI_NUM_0 |
| P26       | QSPI0_IO2 | TUYA_QSPI0_IO2 | TUYA_QSPI_NUM_0 |
| P27       | QSPI0_IO3 | TUYA_QSPI0_IO3 | TUYA_QSPI_NUM_0 |
| P3        | QSPI1_CS  | TUYA_QSPI1_CS  | TUYA_QSPI_NUM_1 |
| P2        | QSPI1_SCK | TUYA_QSPI1_CLK | TUYA_QSPI_NUM_1 |
| P4        | QSPI1_IO0 | TUYA_QSPI1_IO0 | TUYA_QSPI_NUM_1 |
| P5        | QSPI1_IO1 | TUYA_QSPI1_IO1 | TUYA_QSPI_NUM_1 |
| P6        | QSPI1_IO2 | TUYA_QSPI1_IO2 | TUYA_QSPI_NUM_1 |
| P7        | QSPI1_IO3 | TUYA_QSPI0_IO3 | TUYA_QSPI_NUM_1 |



## RGB

- The module supports one hardware RGB 888 channel.
- If the target screen's pixel format is RGB565, then RGB_R0 - RGB_R2, RGB_G0 - RGB_G1, RGB_B0 - RGB_B2 ports will not be initialized.
- If the target screen's pixel format is RGB666, then RGB_R0 - RGB_R1, RGB_G0 - RGB_G1, RGB_B0 - RGB_B1 ports will not be initialized.

| Board Pin | Function  | Software Pin | Software Port |
| --------- | --------- | ------------ | ------------- |
| P50       | RGB_R0    | /            | /             |
| P49       | RGB_R1    | /            | /             |
| P48       | RGB_R2    | /            | /             |
| P23       | RGB_R3    | /            | /             |
| P22       | RGB_R4    | /            | /             |
| P21       | RGB_R5    | /            | /             |
| P20       | RGB_R6    | /            | /             |
| P19       | RGB_R7    | /            | /             |
| P52       | RGB_G0    | /            | /             |
| P51       | RGB_G1    | /            | /             |
| P42       | RGB_G2    | /            | /             |
| P41       | RGB_G3    | /            | /             |
| P40       | RGB_G4    | /            | /             |
| P26       | RGB_G5    | /            | /             |
| P25       | RGB_G6    | /            | /             |
| P24       | RGB_G7    | /            | /             |
| P55       | RGB_B0    | /            | /             |
| P54       | RGB_B1    | /            | /             |
| P53       | RGB_B2    | /            | /             |
| P47       | RGB_B2    | /            | /             |
| P46       | RGB_B5    | /            | /             |
| P45       | RGB_B5    | /            | /             |
| P44       | RGB_B6    | /            | /             |
| P43       | RGB_B7    | /            | /             |
| P14       | RGB_DCLK  | /            | /             |
| P15       | RGB_DISP  | /            | /             |
| P16       | RGB_DE    | /            | /             |
| P17       | RGB_HSYNC | /            | /             |
| P18       | RGB_VSYNC | /            | /             |



## 8080

- The module supports 1 MCU 8080 channel.
- The 8080 interface only supports 3 pixel formats:
  - 8-bit or 16-bit width RGB888
  - 18-bit width RGB666
  - 8-bit width RGB565
- If the data format is 8-bit width, then I8080_D8 - I8080_D17 will not be initialized. If the data format is 16-bit width, then I8080_D16 - I8080_D17 will not be initialized.

| Board Pin | Function    | Software Pin | Software Port |
| --------- | ----------- | ------------ | ------------- |
| P47       | I8080_D0    | /            | /             |
| P46       | I8080_D1    | /            | /             |
| P45       | I8080_D2    | /            | /             |
| P44       | I8080_D3    | /            | /             |
| P43       | I8080_D4    | /            | /             |
| P42       | I8080_D5    | /            | /             |
| P41       | I8080_D6    | /            | /             |
| P40       | I8080_D7    | /            | /             |
| P21       | I8080_D8    | /            | /             |
| P20       | I8080_D9    | /            | /             |
| P19       | I8080_D10   | /            | /             |
| P18       | I8080_D11   | /            | /             |
| P17       | I8080_D12   | /            | /             |
| P16       | I8080_D13   | /            | /             |
| P15       | I8080_D14   | /            | /             |
| P14       | I8080_D15   | /            | /             |
| P48       | I8080_D16   | /            | /             |
| P49       | I8080_D17   | /            | /             |
| P26       | I8080_RDX   | /            | /             |
| P25       | I8080_WDX   | /            | /             |
| P24       | I8080_RSX   | /            | /             |
| P23       | I8080_RESET | /            | /             |
| P22       | I8080_CSX   | /            | /             |



## TOUCH

- The module supports 16 capacitive sensing GPIO channels.
- **This feature is for debugging and learning purposes only. It is not recommended for use in production products. (Enabling this feature will cause ESD test failures)**

| Board Pin | Function | Software Pin | Software Port |
| --------- | -------- | ------------ | ------------- |
| P12       | TOUCH0   | /            | 0x00000001    |
| P13       | TOUCH1   | /            | 0x00000002    |
| P28       | TOUCH2   | /            | 0x00000004    |
| P29       | TOUCH3   | /            | 0x00000008    |
| P30       | TOUCH4   | /            | 0x00000010    |
| P31       | TOUCH5   | /            | 0x00000020    |
| P32       | TOUCH6   | /            | 0x00000040    |
| P33       | TOUCH7   | /            | 0x00000080    |
| P34       | TOUCH8   | /            | 0x00000100    |
| P35       | TOUCH9   | /            | 0x00000200    |
| P36       | TOUCH10  | /            | 0x00000400    |
| P37       | TOUCH11  | /            | 0x00000800    |
| P38       | TOUCH12  | /            | 0x00001000    |
| P39       | TOUCH13  | /            | 0x00002000    |
| P46       | TOUCH14  | /            | 0x00004000    |
| P47       | TOUCH15  | /            | 0x00008000    |



## SDIO

- The module supports 1 SDIO channel.
- This SDIO channel supports 2 pin groups available for selection. You can call the `tkl_io_pinmux_config` interface to configure it before SDIO initialization.
- Currently, the software only supports 1-bit SDIO, not 4-bit SDIO.

| Board Pin    | Function   | Software Pin       | Software Port |
| ------------ | ---------- | ------------------ | ------------- |
| P2 (default) | SDIO_CLK   | TUYA_SDIO_HOST_CLK | /             |
| P3 (default) | SDIO_CMD   | TUYA_SDIO_HOST_CMD | /             |
| P4 (default) | SDIO_DATA0 | TUYA_SDIO_HOST_D0  | /             |
| P5 (default) | SDIO_DATA1 | TUYA_SDIO_HOST_D1  | /             |
| P6 (default) | SDIO_DATA2 | TUYA_SDIO_HOST_D2  | /             |
| P7 (default) | SDIO_DATA3 | TUYA_SDIO_HOST_D3  | /             |
| P14          | SDIO_CLK   | TUYA_SDIO_HOST_CLK | /             |
| P15          | SDIO_CMD   | TUYA_SDIO_HOST_CMD | /             |
| P16          | SDIO_DATA0 | TUYA_SDIO_HOST_D0  | /             |
| P17          | SDIO_DATA1 | TUYA_SDIO_HOST_D1  | /             |
| P18          | SDIO_DATA2 | TUYA_SDIO_HOST_D2  | /             |
| P19          | SDIO_DATA3 | TUYA_SDIO_HOST_D3  | /             |



## DVP

- The module supports 1 DVP channel.
- If clk is set to 0, it is considered that the sensor does not need the module to output a drive clock, then CIS_MCLK will not be initialized.

| Board Pin | Function  | Software Pin | Software Port |
| --------- | --------- | ------------ | ------------- |
| P27       | CIS_MCLK  | /            | /             |
| P29       | CIS_PCLK  | /            | /             |
| P30       | CIS_HSYNC | /            | /             |
| P31       | CIS_VSYNC | /            | /             |
| P32       | CIS_PXD0  | /            | /             |
| P33       | CIS_PXD1  | /            | /             |
| P34       | CIS_PXD2  | /            | /             |
| P35       | CIS_PXD3  | /            | /             |
| P36       | CIS_PXD4  | /            | /             |
| P37       | CIS_PXD5  | /            | /             |
| P38       | CIS_PXD6  | /            | /             |
| P39       | CIS_PXD7  | /            | /             |

