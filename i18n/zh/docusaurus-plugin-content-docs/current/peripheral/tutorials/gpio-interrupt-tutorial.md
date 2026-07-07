---
title: "GPIO 与中断教程"
description: "TKL GPIO 接口用于将引脚配置为数字输入、输出或中断驱动的事件处理，支持电平读写并可选地为边沿或电平事件挂载中断回调。"
keywords:
  - GPIO
  - TKL
  - 中断
  - TuyaOpen 教程
  - 嵌入式驱动
---

TKL GPIO 接口用于将引脚配置为数字输入、输出或中断驱动的事件处理。你设置引脚的模式与方向，读写其电平，并可选地为边沿或电平事件挂载中断回调。

## 先决条件

- 已完成 [环境搭建](../../quick-start/enviroment-setup)
- 开发板在 Kconfig 中设置了 `ENABLE_GPIO=y`

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

## 数字输入（读取按键）

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

## 中断驱动输入

要获得灵敏的按键响应，使用 GPIO 中断而非轮询：

```c
static void button_isr(void *arg)
{
    /* ISR 上下文 -- 保持简短 */
    /* 通过信号量或队列投递到线程中处理 */
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
| `TUYA_GPIO_IRQ_RISE` | 上升沿（LOW -> HIGH） |
| `TUYA_GPIO_IRQ_FALL` | 下降沿（HIGH -> LOW） |
| `TUYA_GPIO_IRQ_RISE_FALL` | 双边沿 |
| `TUYA_GPIO_IRQ_LOW` | 低电平 |
| `TUYA_GPIO_IRQ_HIGH` | 高电平 |

### 中断配合软件消抖

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
对于产品级按键处理（长按、连按、多按键支持），使用 [TDL 按键框架](../button) 而非原始 GPIO 中断。TDL 已处理消抖、边沿检测与事件回调。
:::

## GPIO 上下拉模式

| 模式 | 常量 | 用途 |
|------|------|------|
| 推挽输出 | `TUYA_GPIO_PUSH_PULL` | LED、继电器、使能脚 |
| 上拉输入 | `TUYA_GPIO_PULLUP` | 低电平有效按键 |
| 下拉输入 | `TUYA_GPIO_PULLDOWN` | 高电平有效传感器 |
| 开漏 | `TUYA_GPIO_OPENDRAIN` | I2C bit-bang、共享总线 |
| 开漏 + 上拉 | `TUYA_GPIO_OPENDRAIN_PULLUP` | 带内部上拉的 I2C |
| 浮空 | `TUYA_GPIO_FLOATING` | 外部上拉电阻 |

## 清理

```c
tkl_gpio_irq_disable(BUTTON_PIN);
tkl_gpio_deinit(BUTTON_PIN);
```

`tkl_gpio_deinit()` 会移除 ISR 处理函数、关闭中断并复位引脚。

## 平台说明

- **ESP32 经典款：** GPIO 34-39 仅输入，输出模式将失败。
- **ESP32-S3：** GPIO 22-25 为 `NC`，不要使用。
- **ESP32-C3：** 仅 22 个 GPIO（0-21）。
- **所有平台：** ISR 服务在首次调用 `tkl_gpio_irq_init()` 时全局安装，并由所有引脚共享。

## 参考资料

- [TKL GPIO API](/docs/tkl-api/tkl_gpio)
- [按键驱动](../button)
- [GPIO 示例](https://github.com/tuya/TuyaOpen/tree/master/examples/peripherals/gpio)
- [ESP32 引脚映射](../../hardware/espressif/esp32-pin-mapping)
