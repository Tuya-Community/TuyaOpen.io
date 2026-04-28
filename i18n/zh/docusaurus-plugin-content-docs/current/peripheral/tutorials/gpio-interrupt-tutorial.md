---
title: "GPIO 与中断教程"
---

# GPIO 与中断教程

在 TuyaOpen 中配置 GPIO 引脚的数字输入、输出和中断驱动事件处理。

## 数字输出（LED 闪烁）

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

## 中断驱动输入

```c
static void button_isr(void *arg)
{
    /* ISR 上下文 -- 保持简短 */
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

### 中断模式

| 模式 | 触发方式 |
|------|---------|
| `TUYA_GPIO_IRQ_RISE` | 上升沿 |
| `TUYA_GPIO_IRQ_FALL` | 下降沿 |
| `TUYA_GPIO_IRQ_RISE_FALL` | 双边沿 |
| `TUYA_GPIO_IRQ_LOW` | 低电平 |
| `TUYA_GPIO_IRQ_HIGH` | 高电平 |

### 软件消抖

机械按键会产生抖动。结合中断和定时器实现干净的检测：

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

:::tip TDL 按键框架
对于产品级按键处理（长按、连按、多按键支持），使用 [TDL 按键框架](../button) 而非原始 GPIO 中断。
:::

## GPIO 上下拉模式

| 模式 | 常量 | 用途 |
|------|------|------|
| 推挽输出 | `TUYA_GPIO_PUSH_PULL` | LED、继电器 |
| 上拉输入 | `TUYA_GPIO_PULLUP` | 低电平有效按键 |
| 下拉输入 | `TUYA_GPIO_PULLDOWN` | 高电平有效传感器 |
| 开漏 | `TUYA_GPIO_OPENDRAIN` | I2C bit-bang |
| 浮空 | `TUYA_GPIO_FLOATING` | 外部上拉电阻 |

## 平台说明

- **ESP32 经典款：** GPIO 34-39 仅输入，输出模式将失败。
- **ESP32-S3：** GPIO 22-25 为 NC，不要使用。
- **ESP32-C3：** 仅 22 个 GPIO（0-21）。

## 参考资料

- [TKL GPIO API](/docs/tkl-api/tkl_gpio)
- [按键驱动](../button)
- [GPIO 示例](https://github.com/tuya/TuyaOpen/tree/master/examples/peripherals/gpio)
- [ESP32 引脚映射](../../hardware-specific/espressif/esp32-pin-mapping)
