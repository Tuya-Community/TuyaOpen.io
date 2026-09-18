---
title: "tkl gpio | GPIO 드라이버"
description: "tkl gpio reference — TuyaOpen GPIO 드라이버 TKL API for configuring pin mode/direction, 읽기 및 쓰기 수준, 그리고 내장된 IoT 개발의 중단."
keywords:
  - tkl_gpio
  - tuyaopen gpio driver
  - tkl gpio api
  - embedded gpio driver
---

TKL GPIO 인터페이스는 범용 입력 또는 출력으로 칩 핀을 구성, 읽거나 논리 레벨을 작성, 가장자리 또는 레벨 이벤트에 대한 중단 핸들러를 첨부합니다. Pins는 Tuya에 의해 할당된 색인을 붙입니다`TUYA_GPIO_NUM_E`( 0에서 시작), 칩의 물리적 핀 번호의 독립적 인.

유효한 핀 형태는 칩에 달려 있습니다. 아래 표는 API를 표현할 수 있는 전체 세트입니다; 주어진 플랫폼은 subset만 지원할 수 있습니다.

|주요 특징|회사연혁|
| --- | --- |
|풀업 입력| `TUYA_GPIO_PULLUP` |
|풀다운 입력| `TUYA_GPIO_PULLDOWN` |
|높은 임피던스 입력| `TUYA_GPIO_HIGH_IMPEDANCE` |
|공급 능력| `TUYA_GPIO_FLOATING` |
|Push-pull 출력| `TUYA_GPIO_PUSH_PULL` |
|Open-drain 출력| `TUYA_GPIO_OPENDRAIN` |
|풀업 출력을 가진 Open-drain| `TUYA_GPIO_OPENDRAIN_PULLUP` |

## 프로젝트
```c
OPERATE_RET tkl_gpio_init(TUYA_GPIO_NUM_E pin_id, const TUYA_GPIO_BASE_CFG_T *cfg);
```

주어진 형태, 방향 및 처음 수준을 가진 1개의 GPIO 핀을 형성하십시오.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `pin_id` | `TUYA_GPIO_NUM_E` |GPIO 핀 인덱스, 시작`TUYA_GPIO_NUM_0`. |
| `cfg` | `const TUYA_GPIO_BASE_CFG_T *` |Pin 윤곽.|

구성 구조는:

```c
typedef struct {
    TUYA_GPIO_MODE_E  mode;   // pin mode
    TUYA_GPIO_DRCT_E  direct; // input/output direction
    TUYA_GPIO_LEVEL_E level;  // initial level
} TUYA_GPIO_BASE_CFG_T;
```

`mode`위의 테이블에 나열된 값을 허용합니다.`direct`방향을 선택합니다:

|주요 특징|이름 *|
| --- | --- |
| `TUYA_GPIO_INPUT` |입력 모드|
| `TUYA_GPIO_OUTPUT` |출력 모드|

`level`초기 출력 레벨을 설정합니다:

|주요 특징|이름 *|
| --- | --- |
| `TUYA_GPIO_LEVEL_LOW` |낮은 수준|
| `TUYA_GPIO_LEVEL_HIGH` |높은 수준|
| `TUYA_GPIO_LEVEL_NONE` |레벨 없음 (unset)|

**리턴 **`OPRT_OK`성공에. 다른 값의 경우,`OPRT_OS_ADAPTER_GPIO_ERRCODE`이름 *`tuya_error_code.h`.

## 프로젝트
```c
OPERATE_RET tkl_gpio_deinit(TUYA_GPIO_NUM_E pin_id);
```

GPIO 핀을 초기 상태로 복원하고 리소스를 출시합니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `pin_id` | `TUYA_GPIO_NUM_E` |GPIO 핀 색인.|

**리턴 **`OPRT_OK`성공에. 다른 값의 경우,`OPRT_OS_ADAPTER_GPIO_ERRCODE`이름 *`tuya_error_code.h`.

## tkl gpio 쓰기
```c
OPERATE_RET tkl_gpio_write(TUYA_GPIO_NUM_E pin_id, TUYA_GPIO_LEVEL_E level);
```

주어진 수준에 산출 핀을 모십시오.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `pin_id` | `TUYA_GPIO_NUM_E` |GPIO 핀 색인.|
| `level` | `TUYA_GPIO_LEVEL_E` |드라이브에 출력 레벨.|

**리턴 **`OPRT_OK`성공에. 다른 값의 경우,`OPRT_OS_ADAPTER_GPIO_ERRCODE`이름 *`tuya_error_code.h`.

## tkl gpio 읽기
```c
OPERATE_RET tkl_gpio_read(TUYA_GPIO_NUM_E pin_id, TUYA_GPIO_LEVEL_E *level);
```

핀의 현재 수준을 읽습니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `pin_id` | `TUYA_GPIO_NUM_E` |GPIO 핀 색인.|
| `level` | `TUYA_GPIO_LEVEL_E *` |산출: 수준은 핀에서 읽습니다.|

**리턴 **`OPRT_OK`성공에. 다른 값의 경우,`OPRT_OS_ADAPTER_GPIO_ERRCODE`이름 *`tuya_error_code.h`.

## 프로젝트
```c
OPERATE_RET tkl_gpio_irq_init(TUYA_GPIO_NUM_E pin_id, const TUYA_GPIO_IRQ_T *cfg);
```

핀에 대한 중단 핸들러 등록. 이 호출은 중단을 활성화하지 않습니다; 전화`tkl_gpio_irq_enable`뒤로.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `pin_id` | `TUYA_GPIO_NUM_E` |GPIO 핀 색인.|
| `cfg` | `const TUYA_GPIO_IRQ_T *` |Interrupt 윤곽.|

중단 윤곽 구조는:

```c
typedef struct {
    TUYA_GPIO_IRQ_E  mode; // trigger mode
    TUYA_GPIO_IRQ_CB cb;   // callback function
    void            *arg;  // argument passed to the callback
} TUYA_GPIO_IRQ_T;
```

`mode`방아쇠 상태를 선택하십시오:

|주요 특징|이름 *|
| --- | --- |
| `TUYA_GPIO_IRQ_RISE` |연락처|
| `TUYA_GPIO_IRQ_FALL` |연락처|
| `TUYA_GPIO_IRQ_RISE_FALL` |둘 다 가장자리|
| `TUYA_GPIO_IRQ_LOW` |낮은 수준|
| `TUYA_GPIO_IRQ_HIGH` |높은 수준|

`cb`콜백은 중단에 호출됩니다:

```c
typedef void (*TUYA_GPIO_IRQ_CB)(void *args);
```

**리턴 **`OPRT_OK`성공에. 다른 값의 경우,`OPRT_OS_ADAPTER_GPIO_ERRCODE`이름 *`tuya_error_code.h`.

## tkl gpio irq enable의 경우
```c
OPERATE_RET tkl_gpio_irq_enable(TUYA_GPIO_NUM_E pin_id);
```

등록 된 중단을 활성화`tkl_gpio_irq_init`.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `pin_id` | `TUYA_GPIO_NUM_E` |GPIO 핀 색인.|

**리턴 **`OPRT_OK`성공에. 다른 값의 경우,`OPRT_OS_ADAPTER_GPIO_ERRCODE`이름 *`tuya_error_code.h`.

## tkl gpio irq disable의 경우
```c
OPERATE_RET tkl_gpio_irq_disable(TUYA_GPIO_NUM_E pin_id);
```

핀에 대한 중단을 비활성화합니다.

|제품 설명|제품정보|이름 *|
| --- | --- | --- |
| `pin_id` | `TUYA_GPIO_NUM_E` |GPIO 핀 색인.|

**리턴 **`OPRT_OK`성공에. 다른 값의 경우,`OPRT_OS_ADAPTER_GPIO_ERRCODE`이름 *`tuya_error_code.h`.

## 이름 *
푸시-풀 출력으로 두 개의 핀을 구성하고 높은 드라이브 :

```c
void tuya_gpio_test(void)
{
    TUYA_GPIO_BASE_CFG_T cfg = {
        .mode = TUYA_GPIO_PUSH_PULL,
        .direct = TUYA_GPIO_OUTPUT,
        .level = TUYA_GPIO_LEVEL_LOW,
    };
    tkl_gpio_init(TUYA_GPIO_NUM_3, &cfg);
    tkl_gpio_init(TUYA_GPIO_NUM_4, &cfg);

    tkl_gpio_write(TUYA_GPIO_NUM_3, TUYA_GPIO_LEVEL_HIGH);
    tkl_gpio_write(TUYA_GPIO_NUM_4, TUYA_GPIO_LEVEL_HIGH);
}
```

등록하고 2개의 핀에 상승 가장자리 중단을 가능하게 합니다:

```c
static void __gpio_irq_callback7(void *args)
{
    // handle interrupt on pin 7
}

static void __gpio_irq_callback8(void *args)
{
    // handle interrupt on pin 8
}

void tuya_gpio_irq_test(void)
{
    TUYA_GPIO_IRQ_T irq_cfg_7 = {
        .mode = TUYA_GPIO_IRQ_RISE,
        .cb = __gpio_irq_callback7,
        .arg = NULL,
    };
    TUYA_GPIO_IRQ_T irq_cfg_8 = {
        .mode = TUYA_GPIO_IRQ_RISE,
        .cb = __gpio_irq_callback8,
        .arg = NULL,
    };
    tkl_gpio_irq_init(TUYA_GPIO_NUM_7, &irq_cfg_7);
    tkl_gpio_irq_init(TUYA_GPIO_NUM_8, &irq_cfg_8);
    tkl_gpio_irq_enable(TUYA_GPIO_NUM_7);
    tkl_gpio_irq_enable(TUYA_GPIO_NUM_8);
}
```

## 더 보기
- [GPIO 및 Interrupt 자습서](../peripheral/tutorials/gpio-interrupt-tutorial)
