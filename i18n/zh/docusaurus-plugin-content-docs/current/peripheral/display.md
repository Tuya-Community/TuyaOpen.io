---
title: 显示屏驱动
---
## 概述

[display](https://github.com/tuya/TuyaOpen/tree/master/src/peripherals/display) 组件实现了显示设备的统一注册、管理、控制和帧缓冲操作，为多种显示屏提供了抽象和统一的管理接口。

## 功能介绍

- **显示设备的注册与管理**：支持将不同类型的显示设备注册到系统中，维护设备列表，便于统一管理和查找。
- **设备查找与信息获取**：可通过设备名查找已注册的显示设备，并获取设备的详细信息（如类型、分辨率、像素格式、旋转角度等）。
- **设备生命周期管理**：实现显示设备的打开、关闭等操作，自动处理电源、背光等硬件资源的初始化与释放。
- **帧缓冲管理**：提供帧缓冲的创建与释放接口，支持 SRAM、PSRAM 等不同类型内存的分配。
- **显示内容刷新**：支持将帧缓冲内容刷新到显示设备，实现图像的显示。
- **背光亮度控制**：根据设备配置，支持通过 GPIO 或 PWM 方式控制背光亮度。
- **硬件抽象与接口统一**：通过接口结构体，将底层驱动与上层管理解耦，便于扩展和适配不同显示屏硬件。

## 支持驱动列表


<table class="tg"><thead>
  <tr>
    <th class="tg-0pky">驱动接口</th>
    <th class="tg-0pky">芯片</th>
    <th class="tg-0pky">像素格式</th>
  </tr></thead>
<tbody>
  <tr>
    <td class="tg-0pky">RGB</td>
    <td class="tg-0pky">ILI9488</td>
    <td class="tg-0pky">RGB565</td>
  </tr>
  <tr>
    <td class="tg-0pky" rowspan="5">SPI</td>
    <td class="tg-0pky">GC9A01</td>
    <td class="tg-0pky">RGB565</td>
  </tr>
  <tr>
    <td class="tg-0pky">ILI9341</td>
    <td class="tg-0pky">RGB565</td>
  </tr>
  <tr>
    <td class="tg-0pky">ST7789</td>
    <td class="tg-0pky">RGB565</td>
  </tr>
  <tr>
    <td class="tg-0pky">ST7305</td>
    <td class="tg-0pky">单色</td>
  </tr>
  <tr>
    <td class="tg-0pky">ST7306</td>
    <td class="tg-0pky">2 位深度的灰度格式</td>
  </tr>
  <tr>
    <td class="tg-0pky">QSPI</td>
    <td class="tg-0pky">ST7735S</td>
    <td class="tg-0pky">RGB565</td>
  </tr>
  <tr>
    <td class="tg-0pky" rowspan="2">MCU8080</td>
    <td class="tg-0pky">ST7796</td>
    <td class="tg-0pky">RGB565</td>
  </tr>
  <tr>
    <td class="tg-0pky">ST7789</td>
    <td class="tg-0pky">RGB565</td>
  </tr>
  <tr>
    <td class="tg-0pky">I2C</td>
    <td class="tg-0pky">SSD1306</td>
    <td class="tg-0pky">单色</td>
  </tr>
</tbody></table>


## 功能模块

显示组件主要分为两大模块：抽象管理模块和实例化注册模块。

- 抽象管理模块（`tdl_display`）：
  - 为应用提供统一的显示屏操作接口。
  - 对屏幕驱动芯片进行抽象处理，提供统一的适配接口。
  - 为使用几种常规驱动接口（RGB/SPI/QSPI/MCU8080）的屏幕提供更加集成的接口。
- 实例化注册模块（`tdd_display`）：
  - 屏幕驱动实例化，目前已经接入了十几种驱动芯片，后续会持续增加。
  - 提供将屏幕挂载到抽象管理模块上的注册接口。

## 工作流程

![](/img/peripheral/display/display_work_zh.png)

## Kconfig 配置

- **使能宏**

  | 配置宏               | 类型 | 说明                               |
  | -------------------- | ---- | ---------------------------------- |
  | ENABLE_DISPLAY       | 布尔 | 该宏被打开，驱动代码才会参与编译 |
  | ENABLE_DISPLAY_DEV_2 | 布尔 | 该宏被打开，表示有两个屏幕设备     |

- **设备名**

  | 配置宏         | 类型   | 说明                                        |
  | -------------- | ------ | ------------------------------------------- |
  | DISPLAY_NAME   | 字符串 | 屏幕设备 1 的名称，作为注册和查找设备的索引 |
  | DISPLAY_NAME_2 | 字符串 | 屏幕设备 2 的名称，作为注册和查找设备的索引 |

## 开发指导

### 运行环境

如果想要运行该驱动，需要先打开驱动的 **总使能宏**（`ENABLE_DISPLAY`）。打开该使能宏有三种方式：**目标 Board 默认打开**、**已开启需要屏幕驱动的功能**、**手动打开**。

:::warning

以下所有命令都需要切到目标应用目录下执行，请勿直接在 TuyaOpen 根目录下或者其他目录下执行，否则执行会报错。

:::

#### 目标 Board 默认打开

:::info

这种情况通常为您选择的开发板已经注册好了屏幕设备。此时目标 Board 中的源文件中已经写好注册代码，`Kconfig` 文件也配置了 `select ENABLE_DISPLAY`。

例如，TUYA_T5AI_EVB 开发板自带一块方屏，在适配这块开发板时就已经注册好 ST7789 240*240 的屏幕设备，具体示例代码和配置可参考 `boards/T5AI/TUYA_T5AI_EVB`。

:::

只要选择对应的目标 Board，该驱动会自动被使能。

1. 执行命令进入 `Kconfig` 菜单。

    ```shell
    tos.py config menu
    ```

2. 选择目标 Board，以 TUYA_T5AI_EVB 为例。

    ![](/img/peripheral/display/choos_board.png)

3. 查看显示驱动的使能宏是否被打开。

    ![](/img/peripheral/display/display_enable.png)

#### 已开启需要屏幕驱动的功能

如果您选择了依赖屏幕驱动的功能，如使能了 LVGL，则屏幕驱动的使能宏也会被自动打开。

1. 执行命令进入 `Kconfig` 菜单。

    ```shell
    tos.py config menu
    ```
2. 打开 LVGL 功能。

    ![](/img/peripheral/display/choose_lvgl.png)

3. 查看显示驱动的使能宏是否被打开。

    ![](/img/peripheral/display/display_enable.png)

#### 手动打开使能宏

1. 执行命令进入 `Kconfig` 菜单。

    ```shell
    tos.py config menu
    ```

2. 打开驱动使能宏。

    ![](/img/peripheral/display/open_display.png)

### 使用方法

#### 适配显示驱动

:::tip

如果您已经在 [tdd_display](https://github.com/tuya/TuyaOpen/tree/master/src/peripherals/display/tdd_display/include) 中找到了对应的驱动，则可忽略此步骤；如果没有找到适合自己的显示驱动，可自行适配显示驱动。

:::

1. 在 `tdd_display` 中创建源文件和头文件。
2. 适配显示驱动的抽象接口，如打开、刷新、关闭等。
3. 调用 **注册通用显示设备节点** 接口。
4. 示例代码可参考已经适配好的驱动。

#### 注册显示设备

:::tip

如果您选择的目标 Board 中已经注册好了显示设备，则只需要在 `Kconfig` 中选择该目标板，应用上调用 `board_register_hardware()` 接口即可，该接口中已经注册好对应的显示设备。

:::

1. 根据屏幕的型号与连接引脚编写注册接口。建议写在 `board_register_hardware()` 中，该接口实现的路径为 `boards/<target_platform>/<target_board>/xxx.c`。
2. 应用上调用注册接口。
3. 编写的注册接口代码可参考 `TUYA_T5AI_EVB` 注册 ST7789 屏幕，路径为 `boards/T5AI/tuya_t5ai_evb.c`。

#### 控制设备

1. 根据设备名称找到设备句柄。
2. 获取设备信息。
3. 创建帧缓存。
4. 打开显示设备。
5. 打开显示的背光。
6. 在帧缓存中写入目标数据，如填色、画图等。
7. 将帧缓存中的数据刷新至屏幕显示。

具体的示例可参考 `examples/peripherals/display`。

## 接口说明

### 注册通用显示设备节点

该接口会创建一个设备节点，并将该节点挂在到内部列表中。

```C
//抽象的接口结构体
typedef struct {
    OPERATE_RET (*open)(TDD_DISP_DEV_HANDLE_T device);
    OPERATE_RET (*flush)(TDD_DISP_DEV_HANDLE_T device, TDL_DISP_FRAME_BUFF_T *frame_buff);
    OPERATE_RET (*close)(TDD_DISP_DEV_HANDLE_T device);
} TDD_DISP_INTFS_T;

//显示驱动接口类型
typedef enum  {
    TUYA_DISPLAY_RGB = 0,
    TUYA_DISPLAY_8080,
    TUYA_DISPLAY_QSPI,
    TUYA_DISPLAY_SPI,
    TUYA_DISPLAY_I2C,
}TUYA_DISPLAY_TYPE_E;

//像素格式
typedef enum {
	TUYA_PIXEL_FMT_RGB565,  
    TUYA_PIXEL_FMT_RGB666,  
	TUYA_PIXEL_FMT_RGB888,
    TUYA_PIXEL_FMT_MONOCHROME, /* binary pixel format, 1bit per pixel, 0 is black, 1 is white */    
    TUYA_PIXEL_FMT_I2,
} TUYA_DISPLAY_PIXEL_FMT_E;

//设备基础信息
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

### 查找显示设备

根据设备名称查找设备控制句柄。

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

### 获取显示设备的信息

可获取设备的驱动类型、长宽、像素格式等信息。

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

### 打开显示设备

初始化驱动总线，初始化屏幕配置参数等。

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

### 设置背光亮度

设置背光亮度百分比（0% - 100%）。

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

### 创建帧缓存

可选择从 SRAM 或 PSRAM 中创建该帧缓存。

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

### 释放帧缓存

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

### 刷新屏幕显示

根据传入的 Frame Buffer 刷新屏幕的显示内容。

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

### 关闭显示设备

去初始化驱动总线，关闭屏幕背光等。

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

