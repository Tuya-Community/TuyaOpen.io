---
title: 外设驱动列表
---

| 设备   | 支持的芯片 | 依赖的基础驱动 |
| ------ | ---------- | ------------------ |
| 按键   | /          | GPIO               |
| 指示灯 | /          | GPIO               |
| 音频   | /          | AUDIO              |
| [显示](../peripheral/display.md)   | ILI9488    | RGB                |
|        | ILI9341    | SPI                |
|        | GC9A01     | SPI                |
|        | ST7305     | SPI                |
|        | ST7789     | SPI / MCU8080      |
|        | ST7735S    | QSPI               |
|        | ST7796S    | MCU8080            |
| 触摸   | CST816x    | IIC                |
|        | GT911      | IIC                |
|        | GT1151     | IIC                |


