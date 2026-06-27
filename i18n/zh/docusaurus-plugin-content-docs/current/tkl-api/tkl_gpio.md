---
title: "tkl_gpio | GPIO 驱动"
---

TKL GPIO 接口将芯片引脚配置为通用输入或输出，读写其逻辑电平，并为边沿或电平事件注册中断处理函数。引脚通过涂鸦分配的索引 `TUYA_GPIO_NUM_E`（从 0 开始）寻址，该索引独立于芯片的物理引脚编号。

可用的引脚模式取决于芯片本身。下表是该接口可表达的全集，具体平台可能只支持其中一部分。

| 模式 | 枚举 |
| --- | --- |
| 上拉输入 | `TUYA_GPIO_PULLUP` |
| 下拉输入 | `TUYA_GPIO_PULLDOWN` |
| 高阻输入 | `TUYA_GPIO_HIGH_IMPEDANCE` |
| 浮空输入 | `TUYA_GPIO_FLOATING` |
| 推挽输出 | `TUYA_GPIO_PUSH_PULL` |
| 开漏输出 | `TUYA_GPIO_OPENDRAIN` |
| 开漏带上拉输出 | `TUYA_GPIO_OPENDRAIN_PULLUP` |

## tkl_gpio_init

```c
OPERATE_RET tkl_gpio_init(TUYA_GPIO_NUM_E pin_id, const TUYA_GPIO_BASE_CFG_T *cfg);
```

按给定的模式、方向和初始电平配置一个 GPIO 引脚。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `pin_id` | `TUYA_GPIO_NUM_E` | GPIO 引脚索引，从 `TUYA_GPIO_NUM_0` 开始。 |
| `cfg` | `const TUYA_GPIO_BASE_CFG_T *` | 引脚配置。 |

配置结构体如下：

```c
typedef struct {
    TUYA_GPIO_MODE_E  mode;   // 引脚模式
    TUYA_GPIO_DRCT_E  direct; // 输入/输出方向
    TUYA_GPIO_LEVEL_E level;  // 初始电平
} TUYA_GPIO_BASE_CFG_T;
```

`mode` 取上表中列出的值。`direct` 选择方向：

| 取值 | 说明 |
| --- | --- |
| `TUYA_GPIO_INPUT` | 输入模式 |
| `TUYA_GPIO_OUTPUT` | 输出模式 |

`level` 设置初始输出电平：

| 取值 | 说明 |
| --- | --- |
| `TUYA_GPIO_LEVEL_LOW` | 低电平 |
| `TUYA_GPIO_LEVEL_HIGH` | 高电平 |
| `TUYA_GPIO_LEVEL_NONE` | 不设置电平 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h` 中 `OPRT_OS_ADAPTER_GPIO_ERRCODE` 定义部分。

## tkl_gpio_deinit

```c
OPERATE_RET tkl_gpio_deinit(TUYA_GPIO_NUM_E pin_id);
```

将 GPIO 引脚恢复到初始状态并释放其资源。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `pin_id` | `TUYA_GPIO_NUM_E` | GPIO 引脚索引。 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h` 中 `OPRT_OS_ADAPTER_GPIO_ERRCODE` 定义部分。

## tkl_gpio_write

```c
OPERATE_RET tkl_gpio_write(TUYA_GPIO_NUM_E pin_id, TUYA_GPIO_LEVEL_E level);
```

将输出引脚驱动到给定电平。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `pin_id` | `TUYA_GPIO_NUM_E` | GPIO 引脚索引。 |
| `level` | `TUYA_GPIO_LEVEL_E` | 要驱动的输出电平。 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h` 中 `OPRT_OS_ADAPTER_GPIO_ERRCODE` 定义部分。

## tkl_gpio_read

```c
OPERATE_RET tkl_gpio_read(TUYA_GPIO_NUM_E pin_id, TUYA_GPIO_LEVEL_E *level);
```

读取引脚的当前电平。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `pin_id` | `TUYA_GPIO_NUM_E` | GPIO 引脚索引。 |
| `level` | `TUYA_GPIO_LEVEL_E *` | 输出：从引脚读取的电平。 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h` 中 `OPRT_OS_ADAPTER_GPIO_ERRCODE` 定义部分。

## tkl_gpio_irq_init

```c
OPERATE_RET tkl_gpio_irq_init(TUYA_GPIO_NUM_E pin_id, const TUYA_GPIO_IRQ_T *cfg);
```

为引脚注册中断处理函数。此调用不会使能中断，需随后调用 `tkl_gpio_irq_enable`。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `pin_id` | `TUYA_GPIO_NUM_E` | GPIO 引脚索引。 |
| `cfg` | `const TUYA_GPIO_IRQ_T *` | 中断配置。 |

中断配置结构体如下：

```c
typedef struct {
    TUYA_GPIO_IRQ_E  mode; // 触发模式
    TUYA_GPIO_IRQ_CB cb;   // 回调函数
    void            *arg;  // 传给回调函数的参数
} TUYA_GPIO_IRQ_T;
```

`mode` 选择触发条件：

| 取值 | 说明 |
| --- | --- |
| `TUYA_GPIO_IRQ_RISE` | 上升沿 |
| `TUYA_GPIO_IRQ_FALL` | 下降沿 |
| `TUYA_GPIO_IRQ_RISE_FALL` | 双边沿 |
| `TUYA_GPIO_IRQ_LOW` | 低电平 |
| `TUYA_GPIO_IRQ_HIGH` | 高电平 |

`cb` 是中断触发时调用的回调：

```c
typedef void (*TUYA_GPIO_IRQ_CB)(void *args);
```

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h` 中 `OPRT_OS_ADAPTER_GPIO_ERRCODE` 定义部分。

## tkl_gpio_irq_enable

```c
OPERATE_RET tkl_gpio_irq_enable(TUYA_GPIO_NUM_E pin_id);
```

使能通过 `tkl_gpio_irq_init` 注册的中断。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `pin_id` | `TUYA_GPIO_NUM_E` | GPIO 引脚索引。 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h` 中 `OPRT_OS_ADAPTER_GPIO_ERRCODE` 定义部分。

## tkl_gpio_irq_disable

```c
OPERATE_RET tkl_gpio_irq_disable(TUYA_GPIO_NUM_E pin_id);
```

失能引脚的中断。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `pin_id` | `TUYA_GPIO_NUM_E` | GPIO 引脚索引。 |

**返回值**：成功返回 `OPRT_OK`。其他值请参考 `tuya_error_code.h` 中 `OPRT_OS_ADAPTER_GPIO_ERRCODE` 定义部分。

## 示例

将两个引脚配置为推挽输出并驱动为高电平：

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

为两个引脚注册并使能上升沿中断：

```c
static void __gpio_irq_callback7(void *args)
{
    // 处理引脚 7 的中断
}

static void __gpio_irq_callback8(void *args)
{
    // 处理引脚 8 的中断
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

## 相关文档

- [GPIO 与中断教程](../peripheral/tutorials/gpio-interrupt-tutorial)
