---
title: tkl pinmux | 핀무스 드라이버
description: "tkl pinmux reference — TuyaOpen pinmux TKL API to mapping peripheral function to physical IO pins and querying pin assignments in Embedded IoT 개발."
keywords:
  - tkl_pinmux
  - tuyaopen pinmux driver
  - tkl pinmux api
  - embedded pinmux
---

## 제품정보
`tkl_pinmux`물리적 IO 핀에 맵 및 다중화 주변 기능. 함수를 할당합니다.`TUYA_IIC0_SCL`또는`TUYA_UART0_TX`) 핀에, 한 번에 몇몇 핀을, 또는 항구 및 수로를 현재 봉사하는 질문.

핀이 식별됩니다.`TUYA_PIN_NAME_E`값 (`TUYA_IO_PIN_0`으로`TUYA_IO_PIN_60`). 기능에 의해 식별`TUYA_PIN_FUNC_E`값은 peripheral에 의해, 예를 들면`TUYA_IIC0_SCL`, `TUYA_UART0_TX`, `TUYA_SPI0_CLK`, `TUYA_PWM0`, `TUYA_ADC0`, `TUYA_DAC0`, `TUYA_I2S0_SCK`·`TUYA_GPIO`. 어떤 핀 지원은 플랫폼 별입니다.

## tkl io pinmux config 설정
```c
OPERATE_RET tkl_io_pinmux_config(TUYA_PIN_NAME_E pin, TUYA_PIN_FUNC_E pin_func);
```

단일 IO 핀의 기능을 구성합니다.

모수:

- `pin`: 핀 번호.
- `pin_func`: 핀 기능.

반환:

- `OPRT_OK`성공에. 다른 값의 경우, 참조`tuya_error_code.h`.

## tkl multi io pinmux config 설정
```c
OPERATE_RET tkl_multi_io_pinmux_config(TUYA_MUL_PIN_CFG_T *cfg, uint16_t num);
```

하나의 호출에 여러 IO 핀의 기능을 구성합니다.

모수:

- `cfg`: 핀 구성의 배열에 포인터.

  ```c
  typedef struct {
      TUYA_PIN_NAME_E pin;       // Pin number
      TUYA_PIN_FUNC_E pin_func;  // Pin function
  } TUYA_MUL_PIN_CFG_T;
  ```

- `num`: 항목 수`cfg`배열.

반환:

- `OPRT_OK`성공에. 다른 값의 경우, 참조`tuya_error_code.h`.

## tkl io pin to func의
```c
int32_t tkl_io_pin_to_func(uint32_t pin, TUYA_PIN_TYPE_E pin_type);
```

지정된 주변 유형에 핀 맵이 있는 포트 및 채널을 해결합니다.

모수:

- `pin`: 핀 번호.
- `pin_type`: 쿼리에 Peripheral 유형.

  ```c
  typedef enum {
      TUYA_IO_TYPE_PWM,
      TUYA_IO_TYPE_ADC,
      TUYA_IO_TYPE_DAC,
      TUYA_IO_TYPE_UART,
      TUYA_IO_TYPE_SPI,
      TUYA_IO_TYPE_I2C,
      TUYA_IO_TYPE_I2S,
      TUYA_IO_TYPE_GPIO,
      TUYA_IO_TYPE_MAX = 0xFFFF,
  } TUYA_PIN_TYPE_E;
  ```

반환:

- 성공에, 포장 포트 및 채널: 비트 0–7 채널이며 비트 8–15 포트입니다.
- 가치 더 적은 보다는`0`그런 기능에 핀 지도가 없는 경우에.

## 이름 *
2개의 핀을 개별적으로 구성하십시오:

```c
tkl_io_pinmux_config(TUYA_IO_PIN_0, TUYA_IIC0_SCL);
tkl_io_pinmux_config(TUYA_IO_PIN_1, TUYA_IIC0_SDA);
```

1개의 통화에 있는 동일한 2개의 핀을 구성하십시오:

```c
TUYA_MUL_PIN_CFG_T cfg[2];
cfg[0].pin = TUYA_IO_PIN_0;
cfg[0].pin_func = TUYA_IIC0_SCL;

cfg[1].pin = TUYA_IO_PIN_1;
cfg[1].pin_func = TUYA_IIC0_SDA;

tkl_multi_io_pinmux_config(cfg, 2);
```
