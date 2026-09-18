---
title: tkl register | 등록 드라이버
description: "tkl register 참고 — TuyaOpen register TKL API for word-level read/write and bit-field read/write of chip registers for porting/platform adaptation."
keywords:
  - tkl_register
  - tuyaopen register api
  - tkl register access
  - chip register io
---

## 제품정보
`tkl_register`독서와 쓰기 칩 기록기를 위한 TKL 통합된 기록기 공용영역입니다. 그것은 word-level 접근을 제공합니다 (`tkl_reg_read`, `tkl_reg_write`) 및 비트 필드 액세스 (`tkl_reg_bit_read`, `tkl_reg_bit_write`).

Bit-field 기능은 시작과 끝 비트를 입력합니다`TUYA_ADDR_BITS_DEF_E`, 그 값의 열렬한`TUYA_IO_BITS_0`제품정보`TUYA_IO_BITS_31`비트 위치에 지도 0 에 31.

## tkl reg 읽기
```c
uint32_t tkl_reg_read(uint32_t addr);
```

등록 값을 읽습니다.

모수:

- `addr`: 등록 주소

반환:

- 에 저장 된 값`addr`.

## tkl reg bit read의 경우
```c
uint32_t tkl_reg_bit_read(uint32_t addr, TUYA_ADDR_BITS_DEF_E start_bit, TUYA_ADDR_BITS_DEF_E end_bit);
```

등록에서 비트 필드를 읽으십시오.

모수:

- `addr`: 등록 주소
- `start_bit`: 필드의 비트를 시작합니다. 이름 *`TUYA_ADDR_BITS_DEF_E`.
- `end_bit`: 필드의 끝 비트. 이름 *`TUYA_ADDR_BITS_DEF_E`.

반환:

- 선택한 비트 필드의 값.

## tkl reg 쓰기
```c
OPERATE_RET tkl_reg_write(uint32_t addr, uint32_t data);
```

등록에 대한 값을 작성합니다.

모수:

- `addr`: 등록 주소
- `data`: 작성 값.

반환:

- `OPRT_OK`성공에. 다른 값의 경우, 참조`tuya_error_code.h`.

## tkl reg bit 쓰기
```c
OPERATE_RET tkl_reg_bit_write(uint32_t addr, TUYA_ADDR_BITS_DEF_E start_bit, TUYA_ADDR_BITS_DEF_E end_bit, uint32_t data);
```

등록의 비트 필드에 값을 씁니다.

모수:

- `addr`: 등록 주소
- `start_bit`: 필드의 비트를 시작합니다. 이름 *`TUYA_ADDR_BITS_DEF_E`.
- `end_bit`: 필드의 끝 비트. 이름 *`TUYA_ADDR_BITS_DEF_E`.
- `data`: 작성 값.

반환:

- `OPRT_OK`성공에. 다른 값의 경우, 참조`tuya_error_code.h`.
