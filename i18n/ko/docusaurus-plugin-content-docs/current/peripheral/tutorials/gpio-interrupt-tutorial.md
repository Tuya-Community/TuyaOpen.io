---
title: "GPIO 및 Interrupt 자습서"
description: "TuyaOpen의 GPIO 및 중단 자습서 : 디지털 입력, 출력 및 중단 콜백 처리 가장자리 및 레벨 이벤트에 대한 TKL 핀 구성."
keywords:
  - gpio
  - interrupt
  - tkl_gpio
  - edge trigger
  - tuyaopen peripheral
---

TKL GPIO 공용영역은 디지털 입력, 산출, 또는 중단 몬 사건 취급을 위한 핀을 구성합니다. 핀 모드와 방향을 설정하고, 레벨을 읽고, 선택적으로 가장자리 또는 레벨 이벤트에 대한 중단 콜백을 첨부합니다.

## 자주 묻는 질문
- 한국어[환경 설정](../../quick-start/enviroment-setup)
- 이사회`ENABLE_GPIO=y`Kconfig에서

## 디지털 출력 (Blink LED)
```c
#include "tkl_gpio.h"
#include "tal_system.h"

#define LED_PIN  TUYA_GPIO_NUM_18

void blink_led(void)
{
    TUYA_GPIO_BASE_CFG_T cfg = {
        .mode = TUYA_GPIO_PUSH_PULL,
        .direct = TUYA_GPIO_OUTPUT,
        .level = TUYA_GPIO_LEVEL_LOW,
    };
    tkl_gpio_init(LED_PIN, &cfg);

    while (1) {
        tkl_gpio_write(LED_PIN, TUYA_GPIO_LEVEL_HIGH);
        tal_system_sleep(500);
        tkl_gpio_write(LED_PIN, TUYA_GPIO_LEVEL_LOW);
        tal_system_sleep(500);
    }
}
```

## 디지털 입력 (더 버튼)
```c
#define BUTTON_PIN  TUYA_GPIO_NUM_0

void read_button(void)
{
    TUYA_GPIO_BASE_CFG_T cfg = {
        .mode = TUYA_GPIO_PULLUP,
        .direct = TUYA_GPIO_INPUT,
    };
    tkl_gpio_init(BUTTON_PIN, &cfg);

    TUYA_GPIO_LEVEL_E level;
    tkl_gpio_read(BUTTON_PIN, &level);

    if (level == TUYA_GPIO_LEVEL_LOW) {
        TAL_PR_INFO("button pressed");
    }
}
```

## Interrupt-Driven 입력
응답 버튼 처리의 경우 GPIO가 오염 대신 중단합니다.

```c
static void button_isr(void *arg)
{
    /* ISR context -- keep it short */
    /* Post to a semaphore or queue to handle in a thread */
}

void setup_interrupt(void)
{
    TUYA_GPIO_IRQ_T irq_cfg = {
        .mode = TUYA_GPIO_IRQ_FALL,
        .cb = button_isr,
        .arg = NULL,
    };
    tkl_gpio_irq_init(BUTTON_PIN, &irq_cfg);
    tkl_gpio_irq_enable(BUTTON_PIN);
}
```

### IRQ 형태
|주요 특징|더 큰|
|------|---------|
| `TUYA_GPIO_IRQ_RISE` |상승 가장자리 (LOW -> HIGH)|
| `TUYA_GPIO_IRQ_FALL` |떨어지는 가장자리 (HIGH -> LOW)|
| `TUYA_GPIO_IRQ_RISE_FALL` |둘 다 가장자리|
| `TUYA_GPIO_IRQ_LOW` |낮은 수준|
| `TUYA_GPIO_IRQ_HIGH` |높은 수준|

### IRQ를 가진 소프트웨어 Debounce
기계적인 단추 생성 되튐. 깨끗한 탐지를 위한 타이머를 가진 IRQ를 결합하십시오:

```c
static TIMER_ID s_debounce_timer;

static void debounce_cb(TIMER_ID id, void *arg)
{
    TUYA_GPIO_LEVEL_E level;
    tkl_gpio_read(BUTTON_PIN, &level);
    if (level == TUYA_GPIO_LEVEL_LOW) {
        TAL_PR_INFO("confirmed press");
    }
}

static void button_isr(void *arg)
{
    tkl_gpio_irq_disable(BUTTON_PIN);
    tal_sw_timer_start(s_debounce_timer, 50, TAL_TIMER_ONCE);
}
```

:::tip TDL 단추
긴 압박, 반복 및 다 단추 지원을 가진 생산 단추 취급을 위해, 사용[TDL 버튼 프레임](../button)대신 GPIO 중단. TDL는 debounce, 가장자리 탐지 및 사건 콜백을 취급합니다.
:::

## GPIO 풀 모드
|주요 특징|주요 특징|사용 사례|
|------|----------|----------|
|Push-pull 출력| `TUYA_GPIO_PUSH_PULL` |LED의 릴레이는, 핀을 가능하게 합니다|
|풀업 입력| `TUYA_GPIO_PULLUP` |Active-low 버튼|
|풀다운 입력| `TUYA_GPIO_PULLDOWN` |Active-high 센서|
|공지사항| `TUYA_GPIO_OPENDRAIN` |I2C bit-bang, 공유 버스|
|오픈 드레인 + 풀업| `TUYA_GPIO_OPENDRAIN_PULLUP` |내부 풀업을 가진 I2C|
|기타 제품| `TUYA_GPIO_FLOATING` |외부 잡아당기기 resistor|

## 회사 소개
```c
tkl_gpio_irq_disable(BUTTON_PIN);
tkl_gpio_deinit(BUTTON_PIN);
```

`tkl_gpio_deinit()`ISR 핸들러를 제거하고 중단을 비활성화하고 핀을 재설정합니다.

## 플랫폼 노트
- **ESP32 고전 : ** GPIO 34-39 입력 전용입니다. 출력 모드가 실패합니다.
- **ESP32-S3: ** GPIO 22-25는`NC`. 사용하지 마십시오.
- **ESP32-C3:** 만 22 GPIOs (0-21).
- ** 모든 플랫폼:** ISR 서비스는 세계 최초로`tkl_gpio_irq_init()`모든 핀에 걸쳐 호출 및 공유.

## 이름 *
- [TKL의 GPIO API](/docs/tkl-api/tkl_gpio)
- [버튼 드라이버](../button)
- [GPIO 예제](https://github.com/tuya/TuyaOpen/tree/master/examples/peripherals/gpio)
- [ESP32 핀 Mapping](../../hardware/espressif/esp32-pin-mapping)
