# Writing Guidelines -- Extended Examples

Reference file for `tuyaopen-technical-writer`. Detailed examples per doc type.

## Guide Example (Developer Audience)

```markdown
---
title: Connect to Tuya Cloud
---

Send device data to Tuya Cloud using the switch demo application.

## Prerequisites

- Completed [Environment setup](quick-start/enviroment-setup)
- T5AI-Core or ESP32 board connected via USB

## Requirements

- Development board (T5AI-Core, ESP32, or equivalent)
- USB-C cable
- Tuya Cloud license key ([Equipment authorization](quick-start/equipment-authorization))

## Steps

1. Navigate to the switch demo:
   ```bash
   cd apps/tuya_cloud/switch_demo
   ```

2. Configure for your board:
   ```bash
   tos.py config choice
   ```
   Select your target platform from the list.

3. Build:
   ```bash
   tos.py build
   ```

4. Flash:
   ```bash
   tos.py flash
   ```

The device connects to Tuya Cloud and appears in the Tuya Smart app as a switch.

## References

- [Quick Start](quick-start/index)
- [Creating a new product on Tuya Cloud](cloud/tuya-cloud/creating-new-product)
- [T5AI-Core hardware guide](hardware-specific/tuya-t5/t5-ai-core/overview-t5-ai-core)
```

## License / 授权码 in Requirements (documentation scope)

- **Include** a license key / 授权码 item (and link to [equipment authorization](quick-start/equipment-authorization) when helpful) only when the doc’s main job is to run or extend a **Tuya Cloud–dependent** app (e.g. switch demo, AI chat demo, project page, cloud quick start).
- **Do not** add standalone “if you use the cloud, get a license” bullets to **Embedded Programming** content: peripheral tutorials, Memory & storage, TKL/TAL API references, Kconfig/build guides, driver architecture, or generic protocol clients. Those topics stay platform-agnostic; the **application or demo** doc lists cloud credentials.

## API Reference Example (Developer Audience)

```markdown
---
title: TKL GPIO API
---

Hardware abstraction for GPIO pin control across all supported platforms.

## tkl_gpio_init

Initialize a GPIO pin.

**Signature:**
```c
OPERATE_RET tkl_gpio_init(TUYA_GPIO_NUM_E pin, CONST TUYA_GPIO_BASE_CFG_T *cfg);
```

**Parameters:**

| Name | Direction | Type | Description |
|------|-----------|------|-------------|
| pin | in | `TUYA_GPIO_NUM_E` | GPIO pin number |
| cfg | in | `TUYA_GPIO_BASE_CFG_T *` | Pin configuration (direction, pull, level) |

**Return:** `OPRT_OK` on success, `OPRT_INVALID_PARM` if pin or cfg is invalid.

**Example:**
```c
TUYA_GPIO_BASE_CFG_T cfg = {
    .mode = TUYA_GPIO_PUSH_PULL,
    .direct = TUYA_GPIO_OUTPUT,
    .level = TUYA_GPIO_LEVEL_LOW,
};
OPERATE_RET rt = tkl_gpio_init(GPIO_NUM_18, &cfg);
```

## See also

- [TKL ADC API](tkl-api/tkl_adc)
- [Peripheral examples](examples/demo-generic-examples)
```

## Tutorial Example (Student Audience)

```markdown
---
title: Blink an LED with TuyaOpen
---

Learn GPIO basics by toggling an LED. This tutorial covers pin
initialization, output control, and timing.

## Prerequisites

- Completed [Environment setup](quick-start/enviroment-setup)
- Basic C knowledge (variables, functions, loops)

## Requirements

- T5AI-Core or ESP32 board
- LED and 220-ohm resistor (or use the onboard LED)
- USB cable

## What you will learn

- How TKL GPIO abstraction works
- How to configure a pin as output
- How to use TAL delay functions

## Steps

1. Create a new project from the template:
   ```bash
   cp -r tools/app_template my_blink
   ```

2. In `src/tuya_main.c`, initialize a GPIO pin as output:
   ```c
   TUYA_GPIO_BASE_CFG_T cfg = {
       .mode = TUYA_GPIO_PUSH_PULL,
       .direct = TUYA_GPIO_OUTPUT,
       .level = TUYA_GPIO_LEVEL_LOW,
   };
   tkl_gpio_init(GPIO_NUM_18, &cfg);
   ```

3. Toggle the pin in a loop:
   ```c
   while (1) {
       tkl_gpio_write(GPIO_NUM_18, TUYA_GPIO_LEVEL_HIGH);
       tal_system_sleep(500);
       tkl_gpio_write(GPIO_NUM_18, TUYA_GPIO_LEVEL_LOW);
       tal_system_sleep(500);
   }
   ```

4. Build and flash (see [Compilation guide](build-system/compilation-guide)).

The LED blinks at 1 Hz (on 500 ms, off 500 ms).

## References

- [TKL GPIO API](tkl-api/tkl_gpio)
- [GPIO example in repo](https://github.com/tuya/TuyaOpen/tree/master/examples/peripherals/gpio)
- [T5AI-Core pinout](hardware-specific/tuya-t5/t5-ai-core/overview-t5-ai-core)
```

## FAQ Example

```markdown
---
title: Build Errors FAQ
---

## Build fails with "target not found"

**Cause:** Board config file is missing or the platform name is misspelled.

**Fix:**
1. List available configs:
   ```bash
   ls boards/
   ```
2. Verify the config file exists for your board (e.g., `boards/T5AI/TUYA_T5AI_CORE.config`).
3. Re-run `tos.py config choice` and select from the list.

## Flash fails with "permission denied"

**Cause:** Serial port requires elevated permissions on Linux.

**Fix:**
```bash
sudo usermod -aG dialout $USER
```
Log out and back in for the group change to take effect.
```

## zh Mirror Conventions

When creating the Chinese version:

1. Translate prose naturally. Do not do word-by-word translation.
2. Keep all code blocks, commands, file paths, and API names in English.
3. Use the terminology mapping from the workspace rule (e.g., firmware -> 固件, development board -> 开发板).
4. Do not translate: TuyaOpen, TKL, TAL, SDK, API, GPIO, UART, SPI, I2C, OTA, etc.
5. Match heading structure exactly (same H2/H3 hierarchy).
6. Frontmatter `title:` should be translated.
