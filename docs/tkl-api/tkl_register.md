---
title: tkl_register | Register Driver
---

## Overview

`tkl_register` is the TKL unified register interface for reading and writing chip registers. It provides word-level access (`tkl_reg_read`, `tkl_reg_write`) and bit-field access (`tkl_reg_bit_read`, `tkl_reg_bit_write`).

Bit-field functions take a start and end bit of type `TUYA_ADDR_BITS_DEF_E`, an enumeration whose values `TUYA_IO_BITS_0` through `TUYA_IO_BITS_31` map to bit positions 0 to 31.

## tkl_reg_read

```c
uint32_t tkl_reg_read(uint32_t addr);
```

Reads a register value.

Parameters:

- `addr`: Register address.

Returns:

- The value stored at `addr`.

## tkl_reg_bit_read

```c
uint32_t tkl_reg_bit_read(uint32_t addr, TUYA_ADDR_BITS_DEF_E start_bit, TUYA_ADDR_BITS_DEF_E end_bit);
```

Reads a bit field from a register.

Parameters:

- `addr`: Register address.
- `start_bit`: Start bit of the field. See `TUYA_ADDR_BITS_DEF_E`.
- `end_bit`: End bit of the field. See `TUYA_ADDR_BITS_DEF_E`.

Returns:

- The value of the selected bit field.

## tkl_reg_write

```c
OPERATE_RET tkl_reg_write(uint32_t addr, uint32_t data);
```

Writes a value to a register.

Parameters:

- `addr`: Register address to write.
- `data`: Value to write.

Returns:

- `OPRT_OK` on success. For other values, see `tuya_error_code.h`.

## tkl_reg_bit_write

```c
OPERATE_RET tkl_reg_bit_write(uint32_t addr, TUYA_ADDR_BITS_DEF_E start_bit, TUYA_ADDR_BITS_DEF_E end_bit, uint32_t data);
```

Writes a value to a bit field of a register.

Parameters:

- `addr`: Register address to write.
- `start_bit`: Start bit of the field. See `TUYA_ADDR_BITS_DEF_E`.
- `end_bit`: End bit of the field. See `TUYA_ADDR_BITS_DEF_E`.
- `data`: Value to write.

Returns:

- `OPRT_OK` on success. For other values, see `tuya_error_code.h`.
