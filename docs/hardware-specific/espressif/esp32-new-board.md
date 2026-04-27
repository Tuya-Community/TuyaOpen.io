---
title: "Adding a New ESP32 Board"
---

# Adding a New ESP32 Board

Create a TuyaOpen Board Support Package (BSP) for your custom ESP32 hardware. The process differs depending on whether your target chip is already supported by the ESP32 platform.

## Target Chip Is Supported

The ESP32 platform currently supports the following chips:

| Chip | Platform ID |
|------|-------------|
| ESP32 (Classic) | ESP32 |
| ESP32-C3 | ESP32-C3 |
| ESP32-C6 | ESP32-C6 |
| ESP32-S3 | ESP32-S3 |

If your board uses one of the chips above, run the following command to create a new board:

```bash
tos.py new board
```

Follow the prompts:

1. **Select platform**: Choose `ESP32` from the list
2. **Enter board name**: Enter a name for your board

:::tip[Naming convention]
Use all-uppercase letters and underscores, following the pattern `{VENDOR}_{CHIP}_{MODEL}` — for example, `WAVESHARE_ESP32S3_TOUCH_AMOLED`. The name is used as both the directory name and the `BOARD_CHOICE` value in Kconfig; they must match exactly (case-sensitive). For more details, see [Create Board](../../new-hardware/new-board).
:::

The tool automatically:

- Creates a directory template under `boards/ESP32/{BOARD_NAME}/`:
  ```
  boards/ESP32/MY_CUSTOM_BOARD/
  ├── Kconfig           # Board-level Kconfig (chip selection, pin config)
  ├── CMakeLists.txt    # Build configuration
  ├── board_com_api.h   # Board common API declarations
  └── board_com_api.c   # Board common API implementation
  ```
- Inserts a new board entry into the `choice` block in `boards/ESP32/Kconfig`

### Edit the Generated Kconfig

The generated `Kconfig` looks like this:

```kconfig
config CHIP_CHOICE
    string
    default "esp32s3"   # adjust to match your actual chip

config BOARD_CHOICE
    string
    default "MY_CUSTOM_BOARD"

config BOARD_CONFIG
    bool
    default y
```

Valid `CHIP_CHOICE` values correspond to the supported chip platforms. Currently: `esp32`, `esp32c3`, `esp32c6`, `esp32s3`. Additional values become available as new chip platforms are ported.

Based on your board's peripheral hardware, use `select` in `BOARD_CONFIG` to enable the required feature modules, and append board-specific parameter options. For example, an ESP32-S3 board with a touchscreen and audio codec might extend the config like this:

```kconfig
config BOARD_CONFIG
    bool
    default y
    select ENABLE_AUDIO
    select ENABLE_ESP_DISPLAY
    select ENABLE_AUDIO_CODECS

config LVGL_ENABLE_TOUCH
    bool "Enable LVGL Touch Support"
    default y

config BOARD_LCD_DEFAULT_BRIGHTNESS
    int "Default LCD backlight (0-100)"
    range 0 100
    default 80
    depends on ENABLE_ESP_DISPLAY
```

### Implement Board Hardware Code

After editing the Kconfig, implement the board hardware initialization in `board_com_api.c`.

The template generates an empty `board_register_hardware()` function. Fill it in to register your audio codec, buttons, LEDs, and other peripherals:

```c
OPERATE_RET board_register_hardware(void)
{
    OPERATE_RET rt = OPRT_OK;

    // register audio codec
    TUYA_CALL_ERR_LOG(__board_register_audio());

    return rt;
}
```

For boards with a display, also implement these three functions required by LVGL initialization:

```c
int board_display_init(void);
void *board_display_get_panel_io_handle(void);
void *board_display_get_panel_handle(void);
```

Pin numbers, I2C addresses, I2S channel IDs, and other hardware parameters should be defined as macros in `board_config.h` and referenced from `board_com_api.c`. Use an existing board (e.g., `boards/ESP32/WAVESHARE_ESP32S3_Touch_AMOLED_1.8/`) as a starting point.

### Verify

**Step 1: Verify basic compilation and execution**

Use the GPIO example to confirm the board BSP is working correctly:

```bash
cd examples/peripherals/gpio
```

Load the ESP32 platform default config:

```bash
tos.py config choice
```

Open the config menu, select your board under **Choice a board**, then save and exit:

```bash
tos.py config menu
```

Build and flash:

```bash
tos.py build
tos.py flash
```

After flashing, check the serial output to confirm the firmware boots and runs as expected.

**Step 2: Verify Tuya Cloud connectivity**

Use the Switch Demo to verify network and Tuya Cloud communication:

```bash
cd apps/tuya_cloud/switch_demo
```

Load the ESP32 platform default config:

```bash
tos.py config choice
```

Open the config menu, select your board under **Choice a board**, then save and exit:

```bash
tos.py config menu
```

Fill in the device credentials from the Tuya IoT Platform in `src/tuya_config.h` (see [Authorize Devices](../../quick-start/equipment-authorization)):

```c
#define TUYA_OPENSDK_UUID    "your_uuid"
#define TUYA_OPENSDK_AUTHKEY "your_authkey"
```

Build and flash:

```bash
tos.py build
tos.py flash
```

After flashing, provision the device using the Tuya app (see [Device Pairing w/ Smartphone](../../quick-start/device-network-configuration)). Once the device appears online in the app, the board adaptation is complete.

---

## Target Chip Is Not Yet Supported

If your target chip is not in the supported list, you do not need to create a new platform — the ESP32 platform itself is already integrated. You only need to add support for the new chip within the existing platform.

### Add Chip Support

**Register the chip name**

Add the new chip name to the `SUPPORT_CHIPS` list in `platform/ESP32/build_setup.py`, matching the `idf_target` identifier used by ESP-IDF:

```python
SUPPORT_CHIPS = [
    "esp32",
    "esp32c3",
    "esp32s3",
    "esp32c6",
    "esp32p4",   # new
]
```

Once registered, the build system will automatically call `install.sh {target}` during `platform_prepare` to install the toolchain for the new chip.

**Add chip-specific TKL driver support**

TKL driver files under `platform/ESP32/tuya_open_sdk/tuyaos_adapter/src/drivers/` use chip-conditional compilation for default pin assignments and peripheral behavior. When adding a new chip, add the corresponding `#elif defined(CONFIG_IDF_TARGET_ESP32XXX)` branches in the relevant files (e.g., `tkl_pwm.c`, `tkl_uart.c`) to define default pins for that chip.

**Create a base board**

Use `tos.py new board` to create a base board named after the chip model (e.g., for chip `esp32p4`, name the board `ESP32-P4`). Set `CHIP_CHOICE` in the generated `Kconfig` to the new chip name. This board serves as the minimal reference implementation for the chip and does not need to include any peripheral logic. For the creation steps, follow the [Target Chip Is Supported](#target-chip-is-supported) workflow above.

**Verify compilation**

Select the newly created base board and run a build to confirm everything compiles cleanly:

```bash
cd examples/peripherals/gpio
tos.py config choice
tos.py config menu    # select the base board under "Choice a board"
tos.py build
```

A successful build confirms the new chip is fully integrated into the ESP32 platform. You can then proceed to create your actual custom board.

### Create the New Board

Once chip support is in place, follow the complete [Target Chip Is Supported](#target-chip-is-supported) workflow to create and adapt your board. The boards you adapt here are typically complete hardware products equipped with peripherals such as an audio codec, display, or touch screen — not bare chips.

## References

- [ESP32 Quick Start](esp32-quick-start)
- [Create Board](../../new-hardware/new-board)
