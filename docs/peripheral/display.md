---
title: Display Driver
---

[display](https://github.com/tuya/TuyaOpen/tree/master/src/peripherals/display) This component implements unified registration, management, control, and frame buffer operations for display devices, providing abstract and unified management interfaces for various types of displays.

## Features

- **Display Device Registration and Management**: Supports registering different types of display devices to the system, maintains device lists for unified management and lookup.
- **Device Lookup and Information Retrieval**: Can find registered display devices by device name and retrieve detailed device information (such as type, resolution, pixel format, rotation angle, etc.).
- **Device Lifecycle Management**: Implements display device open/close operations, automatically handles initialization and release of hardware resources like power and backlight.
- **Frame Buffer Management**: Provides frame buffer creation and release interfaces, supports memory allocation from different types like SRAM and PSRAM.
- **Display Content Refresh**: Supports refreshing frame buffer content to display devices to achieve image display.
- **Backlight Brightness Control**: Based on device configuration, supports controlling backlight brightness through GPIO or PWM methods.
- **Hardware Abstraction and Interface Unification**: Through interface structures, decouples low-level drivers from upper-level management, facilitating extension and adaptation to different display hardware.

## Supported Driver List

| Driver Interface | Chip    | Pixel Format           |
| ---------------- | ------- | ---------------------- |
| RGB              | ILI9488 | RGB565                 |
| SPI              | GC9A01  | RGB565                 |
|                  | ILI9341 | RGB565                 |
|                  | ST7789  | RGB565                 |
|                  | ST7305  | Monochrome             |
|                  | ST7306  | 2-bit depth grayscale  |
| QSPI             | ST7735S | RGB565                 |
| MCU8080          | ST7796  | RGB565                 |
|                  | ST7789  | RGB565                 |
| I2C              | SSD1306 | Monochrome             |

## Functional Modules

The display component is mainly divided into two major modules: abstract management module and instantiation registration module.

- Abstract Management Module (tdl_display)
  - Provides unified display operation interfaces for applications.
  - Abstracts screen driver chips and provides unified adaptation interfaces.
  - Provides more integrated interfaces for screens using several common driver interfaces (RGB/SPI/QSPI/MCU8080).
- Instantiation Registration Module (tdd_display)
  - Screen driver instantiation, currently has integrated over ten driver chips, with more being continuously added.
  - Provides registration interfaces for mounting screens to the abstract management module.

## Workflow

![](/img/peripheral/display/display_work_en.png)

## Kconfig Configuration

- **Enable Macros**

  | Config Macro         | Type    | Description                                          |
  | -------------------- | ------- | ---------------------------------------------------- |
  | ENABLE_DISPLAY       | Boolean | When this macro is enabled, driver code participates in compilation. |
  | ENABLE_DISPLAY_DEV_2 | Boolean | When this macro is enabled, indicates two screen devices |

- **Device Names**

  | Config Macro   | Type   | Description                                           |
  | -------------- | ------ | ----------------------------------------------------- |
  | DISPLAY_NAME   | String | Name of screen device 1, used as index for registration and device lookup. |
  | DISPLAY_NAME_2 | String | Name of screen device 2, used as index for registration and device lookup. |

## Development Guide

### Runtime Environment

To run this driver, you need to first enable the driver's **master enable macro** < `ENABLE_DISPLAY` >. There are three ways to enable this macro: **Board default enable**, **enabling features that require screen driver**, and **manual enable**.

:::warning

All the following commands need to be executed in the target application directory. Do not execute them directly in the TuyaOpen root directory or other directories, otherwise execution will fail.

:::

#### Target Board Default Enable
:::info
In this case, the developer's selected development board usually already has screen devices registered. At this time, the target board's source files already contain registration code, and the Kconfig file will also include `select ENABLE_DISPLAY`.

For example, the TUYA_T5AI_EVB development board comes with a square screen. When adapting this development board, the st7789 240*240 screen device was already registered (specific example code and configuration can be found in boards/T5AI/TUYA_T5AI_EVB).

:::

That is, as long as the developer selects the corresponding target board, this driver will be automatically enabled.

- Execute the command to enter Kconfig menu

  ```shell
  tos.py config menu
  ```

- Select target board (using TUYA_T5AI_EVB as example)

![](/img/peripheral/display/choos_board.png)

- Check if the display driver enable macro is turned on

![](/img/peripheral/display/display_enable.png)

#### Enabling Features That Require Screen Driver

If the developer selects features that depend on screen drivers, such as enabling LVGL, the screen driver enable macro will also be automatically turned on.

- Execute the command to enter Kconfig menu

  ```shell
  tos.py config menu
  ```

- Enable LVGL feature

  ![](/img/peripheral/display/choose_lvgl.png)

- Check if the display driver enable macro is turned on

  ![](/img/peripheral/display/display_enable.png)

#### Manual Enable

- Execute the command to enter Kconfig menu

  ```shell
  tos.py config menu
  ```

- Enable driver macro

  ![](/img/peripheral/display/open_display.png)

### Usage

#### Adapt Display Driver

:::tip

Developers can skip this step if they find the corresponding driver in [tdd_display](https://github.com/tuya/TuyaOpen/tree/master/src/peripherals/display/tdd_display/include). If no suitable display driver is found, you can adapt the display driver yourself.

:::

- Create source and header files in tdd_display.
- Adapt abstract interfaces for display driver: open/refresh/close, etc.
- Call the **register common display device node** interface.
- Example code can refer to already adapted drivers.

#### Register Display Device

:::tip

If the target board selected by the developer already has display devices registered, you only need to select that target board in Kconfig and call the `board_register_hardware()` interface in the application, which already has the corresponding display devices registered.

:::

- Write registration interface according to your screen model and connection pins. It's recommended to write it in `board_register_hardware()`, with implementation path at `boards/<target_platform>/<target_board>/xxx.c`.
- Call the registration interface in the application.
- Registration interface code can refer to `TUYA_T5AI_EVB` registering `st7789` screen, path `boards/T5AI/tuya_t5ai_evb.c`.

#### Control Device

- Find device handle by device name.
- Get device information.
- Create frame buffer.
- Open display device.
- Turn on display backlight.
- Write target data to frame buffer (fill color, draw images, etc.).
- Refresh frame buffer data to screen display.

Specific examples can be found in `examples/peripherals/display`.

## API Description

### Register Common Display Device Node

This interface creates a device node and mounts it to the internal list.

```C
//Abstract interface structure
typedef struct {
    OPERATE_RET (*open)(TDD_DISP_DEV_HANDLE_T device);
    OPERATE_RET (*flush)(TDD_DISP_DEV_HANDLE_T device, TDL_DISP_FRAME_BUFF_T *frame_buff);
    OPERATE_RET (*close)(TDD_DISP_DEV_HANDLE_T device);
} TDD_DISP_INTFS_T;

//Display driver interface type
typedef enum  {
    TUYA_DISPLAY_RGB = 0,
    TUYA_DISPLAY_8080,
    TUYA_DISPLAY_QSPI,
    TUYA_DISPLAY_SPI,
    TUYA_DISPLAY_I2C,
}TUYA_DISPLAY_TYPE_E;

//Pixel format
typedef enum {
    TUYA_PIXEL_FMT_RGB565,  
    TUYA_PIXEL_FMT_RGB666,  
    TUYA_PIXEL_FMT_RGB888,
    TUYA_PIXEL_FMT_MONOCHROME, /* binary pixel format, 1bit per pixel, 0 is black, 1 is white */    
    TUYA_PIXEL_FMT_I2,
} TUYA_DISPLAY_PIXEL_FMT_E;

//Device basic information
typedef struct {
    TUYA_DISPLAY_TYPE_E type;
    uint16_t width;
    uint16_t height;
    TUYA_DISPLAY_PIXEL_FMT_E fmt;
    TUYA_DISPLAY_ROTATION_E  rotation;
    TUYA_DISPLAY_BL_CTRL_T   bl;
    TUYA_DISPLAY_IO_CTRL_T   power;
} TDD_DISP_DEV_INFO_T;

/**
 * @brief Registers a display device with the display management system.
 *
 * This function creates and initializes a new display device entry in the internal 
 * device list, binding it with the provided name, hardware interfaces, callbacks, 
 * and device information.
 *
 * @param name Name of the display device (used for identification).
 * @param tdd_hdl Handle to the low-level display driver instance.
 * @param intfs Pointer to the display interface functions (open, flush, close, etc.).
 * @param dev_info Pointer to the display device information structure.
 *
 * @return Returns OPRT_OK on success, or an appropriate error code if registration fails.
 */
OPERATE_RET tdl_disp_device_register(char *name, TDD_DISP_DEV_HANDLE_T tdd_hdl, \
                                     TDD_DISP_INTFS_T *intfs, TDD_DISP_DEV_INFO_T                                              *dev_info);
```

### Find Display Device

Find device control handle by device name.

```C
/**
 * @brief Finds a registered display device by its name.
 *
 * @param name The name of the display device to find.
 *
 * @return Returns a handle to the found display device, or NULL if no matching device is found.
 */
TDL_DISP_HANDLE_T tdl_disp_find_dev(char *name);
```

### Get Display Device Information

Can retrieve device driver type, width/height, pixel format and other information.

```C
typedef struct {
    TUYA_DISPLAY_TYPE_E type;
    TUYA_DISPLAY_ROTATION_E rotation;
    uint16_t width;
    uint16_t height;
    TUYA_DISPLAY_PIXEL_FMT_E fmt;
} TDL_DISP_DEV_INFO_T;

/**
 * @brief Retrieves information about a registered display device.
 *
 * This function copies the display device's information, such as type, width, height, 
 * pixel format, and rotation, into the provided output structure.
 *
 * @param disp_hdl Handle to the display device.
 * @param dev_info Pointer to the structure where display information will be stored.
 *
 * @return Returns OPRT_OK on success, or an appropriate error code if the operation fails.
 */
OPERATE_RET tdl_disp_dev_get_info(TDL_DISP_HANDLE_T disp_hdl, TDL_DISP_DEV_INFO_T *dev_info);
```

### Open Display Device

Will initialize driver bus, initialize screen configuration parameters, etc.

```C
/**
 * @brief Opens and initializes a display device.
 *
 * This function prepares the specified display device for operation by initializing 
 * its power control, mutex, and invoking the device-specific open function if available.
 *
 * @param disp_hdl Handle to the display device to be opened.
 *
 * @return Returns OPRT_OK on success, or an appropriate error code if opening the device fails.
 */
OPERATE_RET tdl_disp_dev_open(TDL_DISP_HANDLE_T disp_hdl);
```

### Set Backlight Brightness

Set backlight brightness percentage (0%-100%)

```C
/**
 * @brief Sets the brightness level of the display's backlight.
 *
 * This function controls the backlight of the specified display device using either 
 * GPIO or PWM, depending on the configured backlight type.
 *
 * @param disp_hdl Handle to the display device.
 * @param brightness The desired brightness level (0 for off, non-zero for on).
 *
 * @return Returns OPRT_OK on success, or an appropriate error code if setting the brightness fails.
 */
OPERATE_RET tdl_disp_set_brightness(TDL_DISP_HANDLE_T disp_hdl, uint8_t brightness);
```

### Create Frame Buffer

Developers can choose to create the frame buffer from SRAM or PSRAM.

```C
/**
 * @brief Creates and initializes a frame buffer for display operations.
 *
 * This function allocates memory for a frame buffer based on the specified type and length. 
 * It also ensures proper memory alignment for efficient data processing.
 *
 * @param type Type of memory to allocate (e.g., SRAM or PSRAM).
 * @param len Length of the frame buffer data in bytes.
 *
 * @return Returns a pointer to the allocated `TDL_DISP_FRAME_BUFF_T` structure on success, 
 *         or NULL if memory allocation fails.
 */
TDL_DISP_FRAME_BUFF_T *tdl_disp_create_frame_buff(DISP_FB_RAM_TP_E type, uint32_t len);
```

### Free Frame Buffer

```C
/**
 * @brief Frees a previously allocated frame buffer.
 *
 * This function releases the memory associated with the specified frame buffer, 
 * taking into account the type of memory (SRAM or PSRAM) used for allocation.
 *
 * @param frame_buff Pointer to the frame buffer to be freed.
 *
 * @return None.
 */
void tdl_disp_free_frame_buff(TDL_DISP_FRAME_BUFF_T *frame_buff);
```

### Refresh Screen Display

Refresh screen display content based on the passed Frame Buffer.

```C
/**
 * @brief Flushes the frame buffer to the display device.
 *
 * This function sends the contents of the provided frame buffer to the display device 
 * for rendering. It checks if the device is open and if the flush interface is available.
 *
 * @param disp_hdl Handle to the display device.
 * @param frame_buff Pointer to the frame buffer containing pixel data to be displayed.
 *
 * @return Returns OPRT_OK on success, or an appropriate error code if flushing fails.
 */
OPERATE_RET tdl_disp_dev_flush(TDL_DISP_HANDLE_T disp_hdl, TDL_DISP_FRAME_BUFF_T *frame_buff);
```

### Close Display Device

Deinitialize driver bus, turn off screen backlight, etc.

```C
/**
 * @brief Closes and deinitializes a display device.
 *
 * This function shuts down the specified display device by invoking the device-specific 
 * close function (if available), deinitializing backlight control, and power control GPIOs.
 *
 * @param disp_hdl Handle to the display device to be closed.
 *
 * @return Returns OPRT_OK on success, or an appropriate error code if closing the device fails.
 */
OPERATE_RET tdl_disp_dev_close(TDL_DISP_HANDLE_T disp_hdl);
```