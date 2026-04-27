---
title: "ESP32 适配新开发板"
---

# ESP32 适配新开发板

为自定义 ESP32 硬件创建 TuyaOpen 板级支持包（BSP）。根据目标芯片是否已在 ESP32 平台中适配，分为两种情况。

## 目标芯片已支持

ESP32 平台目前已适配以下芯片：

| 芯片 | 平台标识 |
|------|---------|
| ESP32（经典款） | ESP32 |
| ESP32-C3 | ESP32-C3 |
| ESP32-C6 | ESP32-C6 |
| ESP32-S3 | ESP32-S3 |

如果你的开发板使用上述芯片之一，直接运行以下命令创建新板子：

```bash
tos.py new board
```

按照提示操作：

1. **选择平台**：从列表中选择 `ESP32`
2. **输入板子名称**：输入你的开发板名称

:::tip[命名规范]
板子名称建议使用全大写字母和下划线，格式为 `{厂商}_{芯片}_{型号}`，例如 `WAVESHARE_ESP32S3_TOUCH_AMOLED`。名称会同时作为目录名和 Kconfig 中 `BOARD_CHOICE` 的值，两者必须完全一致（大小写敏感）。更详细的规范请参考 [创建 Board](../../new-hardware/new-board)。
:::

命令执行后，工具会自动完成：

- 在 `boards/ESP32/{BOARD_NAME}/` 下创建目录模板：
  ```
  boards/ESP32/MY_CUSTOM_BOARD/
  ├── Kconfig           # 板级 Kconfig（芯片选择、引脚配置）
  ├── CMakeLists.txt    # 构建配置
  ├── board_com_api.h   # 开发板通用 API 声明
  └── board_com_api.c   # 开发板通用 API 实现
  ```
- 在 `boards/ESP32/Kconfig` 的 `choice` 块中自动插入新板子条目

### 编辑生成的 Kconfig

生成的 `Kconfig` 内容如下：

```kconfig
config CHIP_CHOICE
    string
    default "esp32s3"   # 根据实际芯片修改

config BOARD_CHOICE
    string
    default "MY_CUSTOM_BOARD"

config BOARD_CONFIG
    bool
    default y
```

`CHIP_CHOICE` 的可选值对应已适配的芯片平台，目前支持 `esp32`、`esp32c3`、`esp32c6`、`esp32s3`；若后续新增了芯片平台，可选值也会随之增多。

根据开发板的外围硬件设计，可在 `BOARD_CONFIG` 中通过 `select` 启用对应功能模块，并追加板级参数配置项。例如，一块带触摸屏和音频的 ESP32-S3 板子可扩展为：

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

### 实现板级硬件代码

编辑 Kconfig 完成后，在 `board_com_api.c` 中实现板级硬件初始化逻辑。

模板已生成空函数 `board_register_hardware()`，在其中注册音频、按键、LED 等外设驱动：

```c
OPERATE_RET board_register_hardware(void)
{
    OPERATE_RET rt = OPRT_OK;

    // 注册音频 codec
    TUYA_CALL_ERR_LOG(__board_register_audio());

    return rt;
}
```

对于带显示屏的开发板，还需额外实现以下三个函数，供 LVGL 初始化使用：

```c
int board_display_init(void);
void *board_display_get_panel_io_handle(void);
void *board_display_get_panel_handle(void);
```

外设引脚编号、I2C 地址、I2S 通道等硬件参数统一在 `board_config.h` 中以宏定义的形式管理，供 `board_com_api.c` 引用。可参考已有开发板（如 `boards/ESP32/WAVESHARE_ESP32S3_Touch_AMOLED_1.8/`）的实现作为起点。

### 验证

**第一步：验证基础编译与运行**

使用 GPIO 示例验证板子 BSP 是否正常工作：

```bash
cd examples/peripherals/gpio
```

加载 ESP32 平台默认配置：

```bash
tos.py config choice
```

进入配置菜单，在 **Choice a board** 中选择新建的板子，保存退出：

```bash
tos.py config menu
```

编译并烧录：

```bash
tos.py build
tos.py flash
```

烧录后观察串口日志，确认代码能正常启动运行。

**第二步：验证涂鸦云连接**

使用 Switch Demo 验证网络连接和涂鸦云通信：

```bash
cd apps/tuya_cloud/switch_demo
```

加载 ESP32 平台默认配置：

```bash
tos.py config choice
```

进入配置菜单，在 **Choice a board** 中选择新建的板子，保存退出：

```bash
tos.py config menu
```

在 `src/tuya_config.h` 中填入从涂鸦 IoT 平台获取的设备授权信息（详见 [设备授权](../../quick-start/equipment-authorization)）：

```c
#define TUYA_OPENSDK_UUID    "your_uuid"
#define TUYA_OPENSDK_AUTHKEY "your_authkey"
```

编译并烧录：

```bash
tos.py build
tos.py flash
```

烧录完成后，使用涂鸦 App 对设备进行配网（详见 [设备手机配网](../../quick-start/device-network-configuration)）。配网成功、设备在 App 中显示在线，说明开发板适配完成。

---

## 目标芯片尚未支持

如果目标芯片不在已支持列表中，无需新建平台——ESP32 平台本身已经适配，只需在现有平台内添加该芯片的支持。

### 添加芯片支持

**注册芯片名称**

在 `platform/ESP32/build_setup.py` 的 `SUPPORT_CHIPS` 列表中添加新芯片的名称（与 ESP-IDF 的 `idf_target` 保持一致）：

```python
SUPPORT_CHIPS = [
    "esp32",
    "esp32c3",
    "esp32s3",
    "esp32c6",
    "esp32p4",   # 新增
]
```

注册后，构建系统会在 `platform_prepare` 阶段自动调用 `install.sh {target}` 安装对应芯片的工具链。

**补充 TKL 驱动层的芯片适配**

TKL 驱动中（`platform/ESP32/tuya_open_sdk/tuyaos_adapter/src/drivers/`）对引脚默认值和部分外设行为采用了芯片条件编译。新增芯片时，需在相关文件中补充对应的 `#elif defined(CONFIG_IDF_TARGET_ESP32XXX)` 分支，例如在 `tkl_pwm.c` 和 `tkl_uart.c` 中指定该芯片的默认引脚。

**创建基础板子**

使用 `tos.py new board` 按照芯片型号创建一个基础板子（例如芯片为 `esp32p4`，则板子命名为 `ESP32-P4`），将生成的 `Kconfig` 中 `CHIP_CHOICE` 设置为新芯片名。这个板子作为该芯片的最小参考实现，不承载具体硬件外设逻辑。创建步骤请参考[目标芯片已支持](#目标芯片已支持)中的流程。

**验证编译**

选择刚创建的基础板子，执行编译，确认无报错：

```bash
cd examples/peripherals/gpio
tos.py config choice
tos.py config menu    # 在 Choice a board 中选择刚创建的基础板子
tos.py build
```

编译通过后，说明新芯片已成功接入 ESP32 平台，可以继续创建正式的自定义板子。

### 创建新板子

芯片支持就绪后，按照[目标芯片已支持](#目标芯片已支持)中的完整流程创建并适配你的开发板。这里适配的开发板通常是搭载了音频 Codec、显示屏、触摸屏等外围器件的完整硬件产品，而不是芯片本身。

## 参考资料

- [ESP32 快速开始](esp32-quick-start)
- [创建 Board](../../new-hardware/new-board)
