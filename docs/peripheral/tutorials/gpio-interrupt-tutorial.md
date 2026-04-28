---
title: "GPIO and Interrupt Tutorial"
---

# GPIO and Interrupt Tutorial

Configure GPIO pins for digital input, output, and interrupt-driven event handling in TuyaOpen.

## Prerequisites

- Completed [Environment Setup](../../quick-start/enviroment-setup)
- Board with `ENABLE_GPIO=y` in Kconfig

## Digital Output (Blink an LED)

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

## Digital Input (Read a Button)

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

## Interrupt-Driven Input

For responsive button handling, use GPIO interrupts instead of polling:

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

### IRQ Modes

| Mode | Trigger |
|------|---------|
| `TUYA_GPIO_IRQ_RISE` | Rising edge (LOW -> HIGH) |
| `TUYA_GPIO_IRQ_FALL` | Falling edge (HIGH -> LOW) |
| `TUYA_GPIO_IRQ_RISE_FALL` | Both edges |
| `TUYA_GPIO_IRQ_LOW` | Level low |
| `TUYA_GPIO_IRQ_HIGH` | Level high |

### Software Debounce with IRQ

Mechanical buttons generate bounce. Combine IRQ with a timer for clean detection:

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

:::tip TDL Button
For production button handling with long-press, repeat, and multi-button support, use the [TDL button framework](../button) instead of raw GPIO interrupts. TDL handles debounce, edge detection, and event callbacks.
:::

## GPIO Pull Modes

| Mode | Constant | Use case |
|------|----------|----------|
| Push-pull output | `TUYA_GPIO_PUSH_PULL` | LED, relay, enable pin |
| Pull-up input | `TUYA_GPIO_PULLUP` | Active-low button |
| Pull-down input | `TUYA_GPIO_PULLDOWN` | Active-high sensor |
| Open-drain | `TUYA_GPIO_OPENDRAIN` | I2C bit-bang, shared bus |
| Open-drain + pull-up | `TUYA_GPIO_OPENDRAIN_PULLUP` | I2C with internal pull-up |
| Floating | `TUYA_GPIO_FLOATING` | External pull resistor |

## Cleanup

```c
tkl_gpio_irq_disable(BUTTON_PIN);
tkl_gpio_deinit(BUTTON_PIN);
```

`tkl_gpio_deinit()` removes the ISR handler, disables the interrupt, and resets the pin.

## Platform Notes

- **ESP32 classic:** GPIO 34-39 are input-only. Output mode will fail.
- **ESP32-S3:** GPIO 22-25 are `NC`. Do not use.
- **ESP32-C3:** Only 22 GPIOs (0-21).
- **All platforms:** ISR service is installed globally on first `tkl_gpio_irq_init()` call and shared across all pins.

## References

- [TKL GPIO API](/docs/tkl-api/tkl_gpio)
- [Button Driver](../button)
- [GPIO example](https://github.com/tuya/TuyaOpen/tree/master/examples/peripherals/gpio)
- [ESP32 Pin Mapping](../../hardware-specific/espressif/esp32-pin-mapping)
