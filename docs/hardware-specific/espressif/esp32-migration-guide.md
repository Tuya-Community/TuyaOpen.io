---
title: "Migrating from ESP-IDF to TuyaOpen"
---

# Migrating from ESP-IDF to TuyaOpen

This guide helps existing ESP-IDF developers port their projects to TuyaOpen. You keep ESP-IDF as the underlying platform but gain Tuya Cloud connectivity, cross-platform portability, and the TuyaOpen peripheral/AI ecosystem.

## Prerequisites

- Completed [ESP32 Quick Start](esp32-quick-start)
- Working knowledge of ESP-IDF project structure (`CMakeLists.txt`, `main/`, `components/`, `sdkconfig`)
- An existing ESP-IDF project you want to migrate (or a clear understanding of one)

## Requirements

- TuyaOpen SDK cloned and environment set up (`source export.sh`)
- ESP32-S3 or ESP32 board
- USB cable

## What Changes, What Stays

| Aspect | ESP-IDF (before) | TuyaOpen (after) |
|--------|-------------------|-------------------|
| Build system | `idf.py build` | `tos.py build` (wraps IDF) |
| Wi-Fi init | `esp_wifi_init()`, `esp_wifi_start()` | `tal_wifi_init()`, `tal_wifi_station_connect()` |
| GPIO | `gpio_set_direction()`, `gpio_set_level()` | `tkl_gpio_init()`, `tkl_gpio_write()` |
| UART | `uart_driver_install()`, `uart_write_bytes()` | `tkl_uart_init()`, `tkl_uart_write()` |
| BLE | `esp_ble_gap_*`, `esp_gatts_*` | `tal_ble_bt_init()`, `tal_ble_adv_start()` |
| Cloud | Custom MQTT or HTTP | Built-in `tuya_cloud_service` |
| OTA | Custom OTA partition logic | `tkl_ota` + Tuya Cloud OTA |
| Entry point | `app_main()` | `tuya_app_main()` (called by TuyaOpen init) |
| Threads | `xTaskCreate()` | `tal_thread_create_and_start()` |
| Timers | `esp_timer_create()` | `tal_sw_timer_create()` |
| NVS storage | `nvs_open()`, `nvs_set_*()` | `tal_kv_set()`, `tal_kv_get()` |
| LVGL | ESP LVGL port | ESP32 keeps its own LVGL port |

## Migration Priority: What Is Required vs Optional

Not everything needs to change at once. Use this table to prioritize your migration.

### Mandatory Changes

These are required for any TuyaOpen project to compile and run.

| What | Why it is mandatory | Migration effort |
|------|-------------------|-----------------|
| Entry point: `app_main()` -> `tuya_app_main()` | TuyaOpen runtime must initialize before your code runs | Rename function, remove FreeRTOS/Wi-Fi bootstrap code |
| Build system: `idf.py` -> `tos.py` | TuyaOpen wraps IDF with its own build, config, and flash pipeline | Create `CMakeLists.txt` + board `.config`; use `tos.py build` |
| Board config (`.config` file) | Tells the build which chip, peripherals, and BSP to enable | Copy from `boards/ESP32/config/` and adjust |

### Strongly Recommended

Replace these ESP-IDF calls to get cross-platform portability. Your code still compiles if you skip them, but it will be locked to ESP32 only.

| What | ESP-IDF API | TuyaOpen API | Benefit of switching |
|------|-----------|-------------|---------------------|
| Wi-Fi | `esp_wifi_*` | `tal_wifi_*` | Portable across T5AI, T2, T3, Linux, ESP32 |
| BLE | `esp_ble_*`, `esp_gatts_*` | `tal_ble_*` | Portable BLE; enables Tuya BLE provisioning |
| GPIO | `gpio_*` | `tkl_gpio_*` | Same pin API on all platforms |
| UART | `uart_*` | `tkl_uart_*` | Portable serial communication |
| Threads | `xTaskCreate` | `tal_thread_create_and_start` | OS abstraction; works on non-FreeRTOS platforms |
| Timers | `esp_timer_*` | `tal_sw_timer_*` | Portable software timers |
| Mutex / Semaphore | `xSemaphore*` | `tal_mutex_*`, `tal_semaphore_*` | OS abstraction |
| System (delay, reset, random) | `vTaskDelay`, `esp_restart`, `esp_random` | `tal_system_sleep`, `tal_system_reset`, `tal_system_get_random` | Consistent system API |

### Optional -- Adopt When Needed

These are value-add services. Adopt them based on your product requirements.

| What | ESP-IDF API | TuyaOpen API | When to adopt |
|------|-----------|-------------|--------------|
| Tuya Cloud connectivity | Custom MQTT/HTTP | `tuya_iot_init()`, `tuya_iot_start()` | When you need Tuya Smart app, remote control, cloud DP |
| OTA updates | `esp_ota_*` + custom server | `tkl_ota` + Tuya Cloud OTA | When you need managed firmware updates via Tuya Cloud |
| Key-value storage | `nvs_*` | `tal_kv_*` | When you want portable persistent storage (backed by FlashDB/littlefs) |
| AI services (ASR, TTS, LLM) | Not available in IDF | TuyaOpen AI SDK | When building voice assistants or AI-powered devices |
| MCP (Model Context Protocol) | Not available in IDF | `ai_mcp_server`, `ai_mcp_tools` | When building AI Agent tool-calling devices |
| Security / Crypto | `mbedtls_*` (direct) | `tal_security_*` | When you need portable crypto abstraction |

### Keep Using ESP-IDF Directly

These have no TuyaOpen equivalent. Continue using ESP-IDF APIs for them.

| What | ESP-IDF API | Notes |
|------|-----------|-------|
| LVGL graphics | ESP-IDF LVGL component | ESP32 uses its own LVGL port, not TuyaOpen's |
| Display driver init (LCD, SPI bus) | `esp_lcd_*` | Board-level BSP in `boards/ESP32/common/` calls IDF |
| Audio codec bus init | `i2s_channel_*`, `i2c_master_*` | Board-level BSP in `boards/ESP32/common/audio/` |
| ULP coprocessor | `ulp_*` | ESP32-specific, no abstraction |
| ESP-NOW | `esp_now_*` | ESP32-specific P2P protocol |
| ESP-MESH | `esp_mesh_*` | ESP32-specific mesh networking |
| Touch sensor | `touch_pad_*` | ESP32-specific hardware peripheral |
| Custom partition tables | `esp_partition_*` | Configure via `tos.py idf menuconfig` |
| IDF component manager | `idf_component.yml` | Add third-party IDF components as usual |

:::tip Incremental Migration
You do not need to migrate everything at once. A practical approach:
1. **Start with the mandatory items** (entry point, build system, board config).
2. **Replace peripherals you actively use** (Wi-Fi, GPIO, UART) to gain portability.
3. **Add Tuya Cloud and AI services** when your product requires them.
4. **Leave ESP-IDF-only features** (LVGL, display BSP, ESP-NOW) as-is.
:::

## Migration Steps

### Step 1: Create a TuyaOpen project

Start from the TuyaOpen app template:

```bash
cd TuyaOpen
cp -r tools/app_template apps/my_esp32_app
cd apps/my_esp32_app
```

Edit `CMakeLists.txt` to set your project name:

```cmake
set(APP_NAME my_esp32_app)
```

### Step 2: Create your board config

If you are using a standard ESP32 board, copy an existing config:

```bash
mkdir -p config
cp ../../boards/ESP32/config/ESP32-S3.config config/MY_BOARD.config
```

Edit `MY_BOARD.config` to enable the features you need:

```
CONFIG_BOARD_CHOICE_ESP32=y
CONFIG_BOARD_CHOICE_ESP32_S3=y
CONFIG_ENABLE_WIFI=y
CONFIG_ENABLE_BLUETOOTH=y
CONFIG_ENABLE_GPIO=y
CONFIG_ENABLE_UART=y
```

### Step 3: Replace ESP-IDF API calls

This is the core of the migration. Replace vendor-specific calls with TuyaOpen equivalents.

**Wi-Fi connection (before):**

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

**Wi-Fi connection (after):**

```c
#include "tal_wifi.h"

tal_wifi_init(TUYA_WIFI_WORK_MODE_STATION, NULL);
NW_IP_S ip;
tal_wifi_station_connect("MySSID", "MyPass", &ip);
```

**GPIO toggle (before):**

```c
gpio_config_t io_conf = {
    .pin_bit_mask = (1ULL << GPIO_NUM_18),
    .mode = GPIO_MODE_OUTPUT,
};
gpio_config(&io_conf);
gpio_set_level(GPIO_NUM_18, 1);
```

**GPIO toggle (after):**

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

**Thread creation (before):**

```c
xTaskCreate(my_task, "my_task", 4096, NULL, 5, NULL);
```

**Thread creation (after):**

```c
#include "tal_thread.h"

THREAD_HANDLE handle;
THREAD_CFG_T cfg = {
    .thrdname = "my_task",
    .stackDepth = 4096,
    .priority = THREAD_PRIO_3,
};
tal_thread_create_and_start(&handle, NULL, NULL, my_task, NULL, &cfg);
```

### Step 4: Replace `app_main` with `tuya_app_main`

In TuyaOpen, the entry point is `tuya_app_main()`, which is called after the TuyaOpen runtime initializes:

```c
#include "tuya_iot.h"
#include "tal_api.h"

void tuya_app_main(void)
{
    // Your application code here
    // TAL and TKL APIs are ready to use
}
```

TuyaOpen handles FreeRTOS startup, Wi-Fi driver init, and platform initialization before calling your code.

### Step 5: Add Tuya Cloud support (optional)

If you want cloud connectivity, add the Tuya device initialization:

```c
#include "tuya_iot.h"

void tuya_app_main(void)
{
    TUYA_CALL_ERR_LOG(tuya_iot_init("your_product_id"));
    TUYA_CALL_ERR_LOG(tuya_iot_start());
}
```

You also need to configure your PID, UUID, and AuthKey in `include/tuya_app_config.h`.

### Step 6: Build and test

```bash
tos.py config choice    # Select your board config
tos.py build
tos.py flash
tos.py monitor
```

### Step 7: Move custom IDF components (if any)

If your ESP-IDF project uses custom IDF components that are not abstracted by TuyaOpen:

1. You can still use them via the ESP-IDF component system.
2. Place component dependencies in the IDF project structure under `platform/ESP32/tuya_open_sdk/`.
3. For non-portable, ESP32-specific features (ESP-NOW, ULP, etc.), call IDF APIs directly from your app. These calls will not be portable to other TuyaOpen platforms.

## What You Cannot Migrate

Some ESP-IDF features have no TuyaOpen equivalent and remain ESP32-specific:

- **ULP coprocessor** programming
- **ESP-NOW** peer-to-peer protocol
- **ESP-MESH** networking
- **Touch sensor** peripheral (ESP32-specific hardware)
- **Custom partition tables** (use IDF's `menuconfig` via `tos.py idf menuconfig`)

For these, call the ESP-IDF APIs directly. Be aware this code will not be portable to non-ESP32 TuyaOpen platforms.

## API Migration Quick Reference

| ESP-IDF API | TuyaOpen API | Header | Priority |
|-------------|-------------|--------|----------|
| `esp_wifi_*` | `tal_wifi_*` | `tal_wifi.h` | Recommended |
| `esp_ble_*` / `esp_gatts_*` | `tal_ble_*` | `tal_bluetooth.h` | Recommended |
| `gpio_*` | `tkl_gpio_*` | `tkl_gpio.h` | Recommended |
| `uart_*` | `tkl_uart_*` | `tkl_uart.h` | Recommended |
| `ledc_*` (PWM) | `tkl_pwm_*` | `tkl_pwm.h` | Recommended |
| `adc1_get_raw` / `adc2_get_raw` | `tkl_adc_*` | `tkl_adc.h` | Recommended |
| `i2c_*` | `tkl_i2c_*` | `tkl_i2c.h` | Recommended |
| `spi_*` | `tkl_spi_*` | `tkl_spi.h` | Recommended |
| `esp_timer_*` | `tal_sw_timer_*` | `tal_sw_timer.h` | Recommended |
| `xTaskCreate` | `tal_thread_create_and_start` | `tal_thread.h` | Recommended |
| `xSemaphoreCreate*` | `tal_semaphore_*` | `tal_semaphore.h` | Recommended |
| `xSemaphoreCreateMutex` | `tal_mutex_*` | `tal_mutex.h` | Recommended |
| `nvs_*` | `tal_kv_*` | `tal_kv.h` | Optional |
| `esp_ota_*` | `tkl_ota_*` | `tkl_ota.h` | Optional (cloud OTA) |
| Custom MQTT/HTTP | `tuya_iot_init`, `tuya_iot_start` | `tuya_iot.h` | Optional (cloud) |
| N/A | `tal_security_*` | `tal_security.h` | Optional (crypto) |
| N/A | TuyaOpen AI SDK | `tuya_ai_service` | Optional (AI) |
| `esp_restart` | `tal_system_reset` | `tal_system.h` | Recommended |
| `esp_random` | `tal_system_get_random` | `tal_system.h` | Recommended |
| `vTaskDelay` | `tal_system_sleep` | `tal_system.h` | Recommended |

## References

- [ESP32 on TuyaOpen -- Overview](overview-esp32)
- [ESP32 Pin Mapping](esp32-pin-mapping)
- [TKL GPIO API](../../tkl-api/tkl_gpio)
- [TKL Wi-Fi API](../../tkl-api/tkl_wifi)
- [Adding a New ESP32 Board](esp32-new-board)
- [Project Compilation Guide](../../build-system/compilation-guide)
