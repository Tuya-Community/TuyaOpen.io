---
title: "从 ESP-IDF 迁移到 TuyaOpen"
---

# 从 ESP-IDF 迁移到 TuyaOpen

本指南帮助现有 ESP-IDF 开发者将项目移植到 TuyaOpen。你保留 ESP-IDF 作为底层平台，同时获得 Tuya Cloud 连接、跨平台可移植性和 TuyaOpen 外设/AI 生态。

## 前提条件

- 已完成 [ESP32 快速开始](esp32-quick-start)
- 了解 ESP-IDF 项目结构（`CMakeLists.txt`、`main/`、`components/`、`sdkconfig`）
- 有一个想要迁移的现有 ESP-IDF 项目（或对其有清晰了解）

## 需求

- TuyaOpen SDK 已克隆并完成环境配置（`source export.sh`）
- ESP32-S3 或 ESP32 开发板
- USB 数据线

## 迁移前后对比

| 方面 | ESP-IDF（迁移前） | TuyaOpen（迁移后） |
|------|-------------------|-------------------|
| 构建系统 | `idf.py build` | `tos.py build`（封装 IDF） |
| Wi-Fi 初始化 | `esp_wifi_init()`, `esp_wifi_start()` | `tal_wifi_init()`, `tal_wifi_station_connect()` |
| GPIO | `gpio_set_direction()`, `gpio_set_level()` | `tkl_gpio_init()`, `tkl_gpio_write()` |
| UART | `uart_driver_install()`, `uart_write_bytes()` | `tkl_uart_init()`, `tkl_uart_write()` |
| BLE | `esp_ble_gap_*`, `esp_gatts_*` | `tal_ble_bt_init()`, `tal_ble_adv_start()` |
| 云端 | 自定义 MQTT 或 HTTP | 内置 `tuya_cloud_service` |
| OTA | 自定义 OTA 分区逻辑 | `tkl_ota` + Tuya Cloud OTA |
| 入口函数 | `app_main()` | `tuya_app_main()`（由 TuyaOpen 初始化后调用） |
| 线程 | `xTaskCreate()` | `tal_thread_create_and_start()` |
| 定时器 | `esp_timer_create()` | `tal_sw_timer_create()` |
| NVS 存储 | `nvs_open()`, `nvs_set_*()` | `tal_kv_set()`, `tal_kv_get()` |
| LVGL | ESP LVGL 移植 | ESP32 保留自有 LVGL 移植 |

## 迁移优先级：哪些是必须的，哪些是可选的

不需要一次性迁移所有内容。根据以下分类确定优先级。

### 必须更改

任何 TuyaOpen 项目编译和运行都需要这些更改。

| 内容 | 为什么是必须的 | 迁移工作量 |
|------|--------------|-----------|
| 入口函数：`app_main()` -> `tuya_app_main()` | TuyaOpen 运行时必须在你的代码之前初始化 | 重命名函数，移除 FreeRTOS/Wi-Fi 引导代码 |
| 构建系统：`idf.py` -> `tos.py` | TuyaOpen 用自己的构建、配置和烧录流程封装 IDF | 创建 `CMakeLists.txt` + 开发板 `.config`；使用 `tos.py build` |
| 开发板配置（`.config` 文件） | 告诉构建系统使用哪种芯片、外设和 BSP | 从 `boards/ESP32/config/` 复制并调整 |

### 强烈推荐

替换这些 ESP-IDF 调用以获得跨平台可移植性。不替换也能编译，但代码将锁定在 ESP32 平台。

| 内容 | ESP-IDF API | TuyaOpen API | 切换的好处 |
|------|-----------|-------------|-----------|
| Wi-Fi | `esp_wifi_*` | `tal_wifi_*` | 可移植到 T5AI、T2、T3、Linux、ESP32 |
| BLE | `esp_ble_*`, `esp_gatts_*` | `tal_ble_*` | 可移植 BLE；支持 Tuya BLE 配网 |
| GPIO | `gpio_*` | `tkl_gpio_*` | 所有平台相同的引脚 API |
| UART | `uart_*` | `tkl_uart_*` | 可移植的串口通信 |
| 线程 | `xTaskCreate` | `tal_thread_create_and_start` | OS 抽象；适用于非 FreeRTOS 平台 |
| 定时器 | `esp_timer_*` | `tal_sw_timer_*` | 可移植的软件定时器 |
| 互斥锁 / 信号量 | `xSemaphore*` | `tal_mutex_*`、`tal_semaphore_*` | OS 抽象 |
| 系统（延时、重启、随机数） | `vTaskDelay`、`esp_restart`、`esp_random` | `tal_system_sleep`、`tal_system_reset`、`tal_system_get_random` | 一致的系统 API |

### 可选 -- 按需采用

这些是增值服务。根据产品需求决定是否采用。

| 内容 | ESP-IDF API | TuyaOpen API | 何时采用 |
|------|-----------|-------------|---------|
| Tuya Cloud 连接 | 自定义 MQTT/HTTP | `tuya_iot_init()`、`tuya_iot_start()` | 需要涂鸦智能 App、远程控制、云端 DP 时 |
| OTA 更新 | `esp_ota_*` + 自定义服务器 | `tkl_ota` + Tuya Cloud OTA | 需要通过 Tuya Cloud 管理固件更新时 |
| 键值存储 | `nvs_*` | `tal_kv_*` | 需要可移植的持久化存储时（基于 FlashDB/littlefs） |
| AI 服务 (ASR, TTS, LLM) | IDF 中不可用 | TuyaOpen AI SDK | 构建语音助手或 AI 驱动设备时 |
| MCP (Model Context Protocol) | IDF 中不可用 | `ai_mcp_server`、`ai_mcp_tools` | 构建 AI Agent 工具调用设备时 |
| 安全 / 加密 | `mbedtls_*`（直接调用） | `tal_security_*` | 需要可移植加密抽象时 |

### 继续使用 ESP-IDF

这些没有 TuyaOpen 等效接口，继续使用 ESP-IDF API。

| 内容 | ESP-IDF API | 说明 |
|------|-----------|------|
| LVGL 图形 | ESP-IDF LVGL 组件 | ESP32 使用自有 LVGL 移植，非 TuyaOpen 的 |
| 显示驱动初始化 (LCD, SPI 总线) | `esp_lcd_*` | 板级 BSP 在 `boards/ESP32/common/` 中调用 IDF |
| 音频编解码器总线初始化 | `i2s_channel_*`、`i2c_master_*` | 板级 BSP 在 `boards/ESP32/common/audio/` 中 |
| ULP 协处理器 | `ulp_*` | ESP32 特有，无抽象 |
| ESP-NOW | `esp_now_*` | ESP32 特有的点对点协议 |
| ESP-MESH | `esp_mesh_*` | ESP32 特有的组网 |
| 触摸传感器 | `touch_pad_*` | ESP32 特有的硬件外设 |
| 自定义分区表 | `esp_partition_*` | 通过 `tos.py idf menuconfig` 配置 |
| IDF 组件管理器 | `idf_component.yml` | 照常添加第三方 IDF 组件 |

:::tip 渐进式迁移
你不需要一次性迁移所有内容。推荐的做法：
1. **先完成必须项**（入口函数、构建系统、开发板配置）。
2. **替换你正在使用的外设**（Wi-Fi、GPIO、UART）以获得可移植性。
3. **在产品需要时添加 Tuya Cloud 和 AI 服务**。
4. **保留 ESP-IDF 特有功能**（LVGL、显示 BSP、ESP-NOW）不变。
:::

## 迁移步骤

### 步骤 1：创建 TuyaOpen 项目

从 TuyaOpen 应用模板开始：

```bash
cd TuyaOpen
cp -r tools/app_template apps/my_esp32_app
cd apps/my_esp32_app
```

编辑 `CMakeLists.txt` 设置项目名称：

```cmake
set(APP_NAME my_esp32_app)
```

### 步骤 2：创建开发板配置

如果使用标准 ESP32 开发板，复制现有配置：

```bash
mkdir -p config
cp ../../boards/ESP32/config/ESP32-S3.config config/MY_BOARD.config
```

编辑 `MY_BOARD.config` 启用所需功能：

```
CONFIG_BOARD_CHOICE_ESP32=y
CONFIG_BOARD_CHOICE_ESP32_S3=y
CONFIG_ENABLE_WIFI=y
CONFIG_ENABLE_BLUETOOTH=y
CONFIG_ENABLE_GPIO=y
CONFIG_ENABLE_UART=y
```

### 步骤 3：替换 ESP-IDF API 调用

这是迁移的核心。将厂商特定调用替换为 TuyaOpen 等效 API。

**Wi-Fi 连接（迁移前）：**

```c
esp_netif_init();
esp_event_loop_create_default();
esp_netif_create_default_wifi_sta();
wifi_init_config_t cfg = WIFI_INIT_CONFIG_DEFAULT();
esp_wifi_init(&cfg);
esp_wifi_set_mode(WIFI_MODE_STA);
wifi_config_t wifi_config = { .sta = { .ssid = "MySSID", .password = "MyPass" } };
esp_wifi_set_config(WIFI_IF_STA, &wifi_config);
esp_wifi_start();
esp_wifi_connect();
```

**Wi-Fi 连接（迁移后）：**

```c
#include "tal_wifi.h"

tal_wifi_init(TUYA_WIFI_WORK_MODE_STATION, NULL);
NW_IP_S ip;
tal_wifi_station_connect("MySSID", "MyPass", &ip);
```

**GPIO 操作（迁移前）：**

```c
gpio_config_t io_conf = {
    .pin_bit_mask = (1ULL << GPIO_NUM_18),
    .mode = GPIO_MODE_OUTPUT,
};
gpio_config(&io_conf);
gpio_set_level(GPIO_NUM_18, 1);
```

**GPIO 操作（迁移后）：**

```c
#include "tkl_gpio.h"

TUYA_GPIO_BASE_CFG_T cfg = {
    .mode = TUYA_GPIO_PUSH_PULL,
    .direct = TUYA_GPIO_OUTPUT,
    .level = TUYA_GPIO_LEVEL_HIGH,
};
tkl_gpio_init(GPIO_NUM_18, &cfg);
tkl_gpio_write(GPIO_NUM_18, TUYA_GPIO_LEVEL_HIGH);
```

### 步骤 4：替换 `app_main` 为 `tuya_app_main`

在 TuyaOpen 中，入口函数是 `tuya_app_main()`，在 TuyaOpen 运行时初始化后被调用：

```c
#include "tuya_iot.h"
#include "tal_api.h"

void tuya_app_main(void)
{
    // 你的应用代码
    // TAL 和 TKL API 已就绪
}
```

### 步骤 5：添加 Tuya Cloud 支持（可选）

如需云端连接，添加 Tuya 设备初始化：

```c
#include "tuya_iot.h"

void tuya_app_main(void)
{
    TUYA_CALL_ERR_LOG(tuya_iot_init("your_product_id"));
    TUYA_CALL_ERR_LOG(tuya_iot_start());
}
```

还需在 `include/tuya_app_config.h` 中配置 PID、UUID 和 AuthKey。

### 步骤 6：构建和测试

```bash
tos.py config choice    # 选择开发板配置
tos.py build
tos.py flash
tos.py monitor
```

### 步骤 7：迁移自定义 IDF 组件（如有）

如果你的 ESP-IDF 项目使用了 TuyaOpen 未抽象的自定义 IDF 组件：

1. 仍可通过 ESP-IDF 组件系统使用。
2. 将组件依赖放在 `platform/ESP32/tuya_open_sdk/` 下的 IDF 项目结构中。
3. 对于非可移植的 ESP32 特有功能（ESP-NOW、ULP 等），直接从应用调用 IDF API。这些代码无法移植到其他 TuyaOpen 平台。

## 无法迁移的内容

部分 ESP-IDF 功能没有 TuyaOpen 等效接口，仍为 ESP32 特有：

- **ULP 协处理器** 编程
- **ESP-NOW** 点对点协议
- **ESP-MESH** 组网
- **触摸传感器** 外设（ESP32 特有硬件）
- **自定义分区表**（通过 `tos.py idf menuconfig` 使用 IDF 的配置）

对于这些功能，直接调用 ESP-IDF API。请注意这些代码无法移植到非 ESP32 的 TuyaOpen 平台。

## API 迁移速查表

| ESP-IDF API | TuyaOpen API | 头文件 | 优先级 |
|-------------|-------------|--------|--------|
| `esp_wifi_*` | `tal_wifi_*` | `tal_wifi.h` | 推荐 |
| `esp_ble_*` / `esp_gatts_*` | `tal_ble_*` | `tal_bluetooth.h` | 推荐 |
| `gpio_*` | `tkl_gpio_*` | `tkl_gpio.h` | 推荐 |
| `uart_*` | `tkl_uart_*` | `tkl_uart.h` | 推荐 |
| `ledc_*` (PWM) | `tkl_pwm_*` | `tkl_pwm.h` | 推荐 |
| `adc1_get_raw` / `adc2_get_raw` | `tkl_adc_*` | `tkl_adc.h` | 推荐 |
| `i2c_*` | `tkl_i2c_*` | `tkl_i2c.h` | 推荐 |
| `spi_*` | `tkl_spi_*` | `tkl_spi.h` | 推荐 |
| `esp_timer_*` | `tal_sw_timer_*` | `tal_sw_timer.h` | 推荐 |
| `xTaskCreate` | `tal_thread_create_and_start` | `tal_thread.h` | 推荐 |
| `xSemaphoreCreate*` | `tal_semaphore_*` | `tal_semaphore.h` | 推荐 |
| `xSemaphoreCreateMutex` | `tal_mutex_*` | `tal_mutex.h` | 推荐 |
| `nvs_*` | `tal_kv_*` | `tal_kv.h` | 可选 |
| `esp_ota_*` | `tkl_ota_*` | `tkl_ota.h` | 可选（云端 OTA） |
| 自定义 MQTT/HTTP | `tuya_iot_init`、`tuya_iot_start` | `tuya_iot.h` | 可选（云端） |
| 无 | `tal_security_*` | `tal_security.h` | 可选（加密） |
| 无 | TuyaOpen AI SDK | `tuya_ai_service` | 可选（AI） |
| `esp_restart` | `tal_system_reset` | `tal_system.h` | 推荐 |
| `esp_random` | `tal_system_get_random` | `tal_system.h` | 推荐 |
| `vTaskDelay` | `tal_system_sleep` | `tal_system.h` | 推荐 |

## 参考资料

- [ESP32 与 TuyaOpen -- 概述](overview-esp32)
- [ESP32 引脚映射](esp32-pin-mapping)
- [TKL GPIO API](../../tkl-api/tkl_gpio)
- [TKL Wi-Fi API](../../tkl-api/tkl_wifi)
- [添加新的 ESP32 开发板](esp32-new-board)
- [编译指南](../../build-system/compilation-guide)
