# 树莓派 5 GPIO 参考手册

## 1. 详细引脚功能分布图

![Raspberry Pi GPIO Detailed Pinout](https://images.tuyacn.com/fe-static/docs/img/4154ba76-67b8-4330-a824-585c7467e30d.png)

**图片来源**：[Random Nerd Tutorials](https://randomnerdtutorials.com/raspberry-pi-pinout-gpios/)  
**授权协议**：基于 [Raspberry Pi Ltd](https://www.raspberrypi.com/) 官方资料，[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)  
**适用型号**：树莓派 4B/5 等 40Pin 型号

---

## 2. 树莓派 5 GPIO 功能复用表

**芯片型号**：RP1（Raspberry Pi 5 专用 I/O 控制器）  
**设计说明**：功能块及其在 GPIO 引脚上的位置经过精心设计，可与 Raspberry Pi 4 B 型的 40 引脚接头上面向用户的功能相匹配

| GPIO | F1 | F2 | F3 | F4 | F5 | F6 | F7 | F8 | F9 |
|:----:|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| 0 | SPI0_SIO[3] | DPI_PCLK | UART1_TX | I2C0_SDA | SYS_RIO[0] | PROC_RIO[0] | PIO[0] | SPI2_CSn[0] | |
| 1 | SPI0_SIO[2] | DPI_DE | UART1_RX | I2C0_SCL | SYS_RIO[1] | PROC_RIO[1] | PIO[1] | SPI2_SIO[1] | |
| 2 | SPI0_CSn[3] | DPI_VSYNC | UART1_CTS | I2C1_SDA | UART0_IR_RX | SYS_RIO[2] | PROC_RIO[2] | PIO[2] | SPI2_SIO[0] |
| 3 | SPI0_CSn[2] | DPI_HSYNC | UART1_RTS | I2C1_SCL | UART0_IR_TX | SYS_RIO[3] | PROC_RIO[3] | PIO[3] | SPI2_SCLK |
| 4 | GPCLK[0] | DPI_D[0] | UART2_TX | I2C2_SDA | UART0_RI | SYS_RIO[4] | PROC_RIO[4] | PIO[4] | SPI3_CSn[0] |
| 5 | GPCLK[1] | DPI_D[1] | UART2_RX | I2C2_SCL | UART0_DTR | SYS_RIO[5] | PROC_RIO[5] | PIO[5] | SPI3_SIO[1] |
| 6 | GPCLK[2] | DPI_D[2] | UART2_CTS | I2C3_SDA | UART0_DCD | SYS_RIO[6] | PROC_RIO[6] | PIO[6] | SPI3_SIO[0] |
| 7 | SPI0_CSn[1] | DPI_D[3] | UART2_RTS | I2C3_SCL | UART0_DSR | SYS_RIO[7] | PROC_RIO[7] | PIO[7] | SPI3_SCLK |
| 8 | SPI0_CSn[0] | DPI_D[4] | UART3_TX | I2C0_SDA | SYS_RIO[8] | PROC_RIO[8] | PIO[8] | SPI4_CSn[0] | |
| 9 | SPI0_SIO[1] | DPI_D[5] | UART3_RX | I2C0_SCL | SYS_RIO[9] | PROC_RIO[9] | PIO[9] | SPI4_SIO[0] | |
| 10 | SPI0_SIO[0] | DPI_D[6] | UART3_CTS | I2C1_SDA | SYS_RIO[10] | PROC_RIO[10] | PIO[10] | SPI4_SIO[1] | |
| 11 | SPI0_SCLK | DPI_D[7] | UART3_RTS | I2C1_SCL | SYS_RIO[11] | PROC_RIO[11] | PIO[11] | SPI4_SCLK | |
| 12 | PWM0[0] | DPI_D[8] | UART4_TX | I2C2_SDA | AUDIO_OUT_L | SYS_RIO[12] | PROC_RIO[12] | PIO[12] | SPI5_CSn[0] |
| 13 | PWM0[1] | DPI_D[9] | UART4_RX | I2C2_SCL | AUDIO_OUT_R | SYS_RIO[13] | PROC_RIO[13] | PIO[13] | SPI5_SIO[1] |
| 14 | PWM0[2] | DPI_D[10] | UART4_CTS | I2C3_SDA | UART0_TX | SYS_RIO[14] | PROC_RIO[14] | PIO[14] | SPI5_SIO[0] |
| 15 | PWM0[3] | DPI_D[11] | UART4_RTS | I2C3_SCL | UART0_RX | SYS_RIO[15] | PROC_RIO[15] | PIO[15] | SPI5_SCLK |
| 16 | SPI1_CSn[2] | DPI_D[12] | MIPI0_DSI_TE | UART0_CTS | SYS_RIO[16] | PROC_RIO[16] | PIO[16] | | |
| 17 | SPI1_CSn[1] | DPI_D[13] | MIPI1_DSI_TE | UART0_RTS | SYS_RIO[17] | PROC_RIO[17] | PIO[17] | | |
| 18 | SPI1_CSn[0] | DPI_D[14] | I2S0_SCLK | PWM0[2] | I2S1_SCLK | SYS_RIO[18] | PROC_RIO[18] | PIO[18] | GPCLK[1] |
| 19 | SPI1_SIO[1] | DPI_D[15] | I2S0_WS | PWM0[3] | I2S1_WS | SYS_RIO[19] | PROC_RIO[19] | PIO[19] | |
| 20 | SPI1_SIO[0] | DPI_D[16] | I2S0_SDI[0] | GPCLK[0] | I2S1_SDI[0] | SYS_RIO[20] | PROC_RIO[20] | PIO[20] | |
| 21 | SPI1_SCLK | DPI_D[17] | I2S0_SDO[0] | GPCLK[1] | I2S1_SDO[0] | SYS_RIO[21] | PROC_RIO[21] | PIO[21] | |
| 22 | SDIO0_CLK | DPI_D[18] | I2S0_SDI[1] | I2C3_SDA | I2S1_SDI[1] | SYS_RIO[22] | PROC_RIO[22] | PIO[22] | |
| 23 | SDIO0_CMD | DPI_D[19] | I2S0_SDO[1] | I2C3_SCL | I2S1_SDO[1] | SYS_RIO[23] | PROC_RIO[23] | PIO[23] | |
| 24 | SDIO0_DAT[0] | DPI_D[20] | I2S0_SDI[2] | I2S1_SDI[2] | SYS_RIO[24] | PROC_RIO[24] | PIO[24] | SPI2_CSn[1] | |
| 25 | SDIO0_DAT[1] | DPI_D[21] | I2S0_SDO[2] | AUDIO_IN_CLK | I2S1_SDO[2] | SYS_RIO[25] | PROC_RIO[25] | PIO[25] | SPI3_CSn[1] |
| 26 | SDIO0_DAT[2] | DPI_D[22] | I2S0_SDI[3] | AUDIO_IN_DAT0 | I2S1_SDI[3] | SYS_RIO[26] | PROC_RIO[26] | PIO[26] | SPI5_CSn[1] |
| 27 | SDIO0_DAT[3] | DPI_D[23] | I2S0_SDO[3] | AUDIO_IN_DAT1 | I2S1_SDO[3] | SYS_RIO[27] | PROC_RIO[27] | PIO[27] | SPI1_CSn[1] |

---

## 许可证声明

本文档引用的树莓派硬件资料遵循 **Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)** 协议。

