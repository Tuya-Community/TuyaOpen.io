---
title: Peripheral Driver List
---

| Device    | Supported Chips | Dependent Base Driver |
| --------- | --------------- | -------------------- |
| Button    | /               | GPIO                 |
| Indicator | /               | GPIO                 |
| Audio     | /               | AUDIO                |
| [Display](../peripheral/display.md)   | ILI9488         | RGB                  |
|           | ILI9341         | SPI                  |
|           | GC9A01          | SPI                  |
|           | ST7305          | SPI                  |
|           | ST7789          | SPI / MCU8080        |
|           | ST7735S         | QSPI                 |
|           | ST7796S         | MCU8080              |
| Touch     | CST816x         | IIC                  |
|           | GT911           | IIC                  |
|           | GT1151          | IIC                  |