---
title: ESP-IDF 快速开始
description: "编译并烧录 TuyaOpen Core ESP32 示例：添加核心与移植组件、配置 Wi-Fi 与授权信息，通过串口二维码完成激活。"
keywords:
  - tuyaopen core
  - esp-idf
  - esp32
  - 快速开始
---

本篇简要说明如何通过 ESP-IDF 组件流程在乐鑫芯片上运行 Core IoT 示例。示例位于 examples 仓库的 `esp32/examples/iot_demo`。

:::warning
请使用 **ESP-IDF v5.x**（推荐 v5.4）。v6.2 及之后版本把 mbedTLS 底层加密头文件移入私有位置，当前组件无法支持。
:::

## 与 Linux 有何不同

应用流程与 [Linux 示例](linux-quick-start.md)完全一致——同样是 `tuya_iot_init` → `tuya_iot_start` → `tuya_iot_yield`。只有两点差异：

- **Wi-Fi 由你自己实现。** 核心没有 Wi-Fi 抽象。示例自行建立 station 连接（`main/wifi_sta.c`，原生 ESP-IDF API，带回退重连）；获得 IP 后由移植层上报链路状态，套接字走 lwIP。
- **OTA 使用 ESP-IDF 接口。** `main/ota_app.c` 通过 `esp_ota_*` 写入下一个 OTA 分区并调用 `esp_restart()`。

## 工程结构

顶层 `CMakeLists.txt` 添加**两个**本地组件：

```cmake
set(EXTRA_COMPONENT_DIRS
    "${TUYAOPEN_CORE_DIR}"
    "${TUYAOPEN_CORE_DIR}/port/esp-idf")
```

SDK 仓库根目录是 `tuyaopen-core` 组件；`port/esp-idf` 是移植组件（ESP-IDF 以目录名命名组件）。组件注册表不下载任何内容——`idf_component.yml` 中没有 Tuya 依赖。

示例自带 4 MB 分区表（`partitions.csv`）：64 KB NVS、otadata、两个 1.5 MB OTA 槽位与 768 KB 存储区。

## 编译烧录

```bash
source <esp-idf>/export.sh
cd esp32/examples/iot_demo
idf.py set-target esp32s3        # 或 esp32、esp32c3 等
idf.py menuconfig                # iot_demo 菜单 -> Wi-Fi SSID / 密码
idf.py build
idf.py -p /dev/ttyUSB0 flash monitor
```

## 配置项

| 项目 | 位置 |
|---|---|
| Wi-Fi SSID / 密码 | `menuconfig` → iot_demo（`CONFIG_DEMO_WIFI_SSID`、`CONFIG_DEMO_WIFI_PASSWORD`）。SSID 为空时直接跳过 Wi-Fi，链路保持断开。 |
| PID / UUID / AuthKey | `main/tuya_config.h`，或不入库的 `main/tuya_config_secrets.h`（复制 `.example` 模板） |
| Core 开关 | `menuconfig` → **tuyaopen-core**，默认值在 `sdkconfig.defaults` |

关键默认值：`CONFIG_ENABLE_PLATFORM_MBEDTLS=y`（使用 ESP-IDF 自带 mbedTLS——切勿编译内置副本，否则符号冲突）、`CONFIG_LITTLE_END=y`、BLE 使用 NimBLE（仅外设角色）。

示例在专用线程上运行 `user_main()`，栈为 **8 KB**；请保持该大小——TLS 握手峰值接近上限。

## 激活

首次启动时示例通过串口打印绑定二维码。用涂鸦 App 扫码；成功后可看到 `TUYA_EVENT_ACTIVATE_SUCCESSED`，随后是 `TUYA_EVENT_MQTT_CONNECTED`，开关指令以 `TUYA_EVENT_DP_RECEIVE_OBJ` 到达。

## 下一步

- [把库加入工程](add-to-project.md) —— 在你自己的固件中集成组件
- [使用 IoT API](iot-api.md) —— 事件与数据点
- [适配新平台](port-to-platform.md) —— 移植层背后的 ops module 契约
