---
title: tkl_register | Register 驱动
---

## 概述

`tkl_register` 是涂鸦统一的寄存器操作接口，用于读取与写入芯片寄存器。它提供字级访问（`tkl_reg_read`、`tkl_reg_write`）和位域访问（`tkl_reg_bit_read`、`tkl_reg_bit_write`）。

位域函数的起始位和结束位类型为 `TUYA_ADDR_BITS_DEF_E`，该枚举的取值 `TUYA_IO_BITS_0` 到 `TUYA_IO_BITS_31` 对应 0 到 31 的位位置。

## tkl_reg_read

```c
uint32_t tkl_reg_read(uint32_t addr);
```

读取寄存器数据。

参数：

- `addr`：寄存器地址。

返回值：

- `addr` 处存储的数据。

## tkl_reg_bit_read

```c
uint32_t tkl_reg_bit_read(uint32_t addr, TUYA_ADDR_BITS_DEF_E start_bit, TUYA_ADDR_BITS_DEF_E end_bit);
```

读取寄存器中某个位域的数据。

参数：

- `addr`：寄存器地址。
- `start_bit`：位域的起始 bit 位，参考 `TUYA_ADDR_BITS_DEF_E`。
- `end_bit`：位域的结束 bit 位，参考 `TUYA_ADDR_BITS_DEF_E`。

返回值：

- 所选位域的数据。

## tkl_reg_write

```c
OPERATE_RET tkl_reg_write(uint32_t addr, uint32_t data);
```

向寄存器写入数据。

参数：

- `addr`：要写入的寄存器地址。
- `data`：要写入的数据。

返回值：

- 成功返回 `OPRT_OK`，其他值请参考 `tuya_error_code.h`。

## tkl_reg_bit_write

```c
OPERATE_RET tkl_reg_bit_write(uint32_t addr, TUYA_ADDR_BITS_DEF_E start_bit, TUYA_ADDR_BITS_DEF_E end_bit, uint32_t data);
```

向寄存器的某个位域写入数据。

参数：

- `addr`：要写入的寄存器地址。
- `start_bit`：位域的起始 bit 位，参考 `TUYA_ADDR_BITS_DEF_E`。
- `end_bit`：位域的结束 bit 位，参考 `TUYA_ADDR_BITS_DEF_E`。
- `data`：要写入的数据。

返回值：

- 成功返回 `OPRT_OK`，其他值请参考 `tuya_error_code.h`。
