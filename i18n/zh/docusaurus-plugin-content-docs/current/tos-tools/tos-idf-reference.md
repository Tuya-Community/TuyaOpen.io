---
title: tos.py idf 命令参考
---

## 概述

`tos.py idf` 将参数转发到 ESP32 平台树内的 Espressif `idf.py`。在仍位于 TuyaOpen 应用目录的前提下，可使用原生 ESP-IDF 工作流（menuconfig、fullclean、set-target、doctor 等）。

**适用读者：** 使用 TuyaOpen 构建 ESP32 的开发者。

**前提：** 工程已配置为 **ESP32**（`app_default.config` 中 `CONFIG_PLATFORM_CHOICE=ESP32`）。请先执行 `tos.py config choice` 或 `tos.py config menu`。

## 行为说明

1. 读取当前 `app_default.config` 并确认平台为 ESP32。
2. 定位 `TuyaOpen/platform/ESP32/` 下的 ESP32 平台目录。
3. 拼接命令：`idf.py` 加可选的 `--idf-flags` 加子命令及参数。
4. 在 `platform/ESP32/tuya_open_sdk/` 工作目录下执行。

属于**透传**：只要当前安装的 ESP-IDF 支持，即可使用对应的 `idf.py` 子命令与选项。

## 语法

```bash
tos.py idf [OPTIONS] IDF_SUBCOMMAND [ARGS...]
```

| 选项 | 说明 |
|--------|-------------|
| `--idf-flags TEXT` | 插在 `idf.py` 与子命令之间的额外参数（引号包裹，按 shell 拆分）。例如 `-v`、`-D MY_MACRO=1`。 |

## 示例

```bash
tos.py idf menuconfig
tos.py idf fullclean
tos.py idf --idf-flags="-v" build
tos.py idf flash
```

## 常见错误

- **工程未配置** — 请在应用目录执行 `tos.py config choice` 或 `tos.py config menu`。
- **非 ESP32 平台** — 其他平台不可用 `idf`，请切换配置或使用对应平台的 `tos.py build`。
- **导入或路径错误** — 确认 ESP32 平台子模块与工具链已就绪（`tos.py check`、`tos.py update`）。

## 参见

- [ESP32 快速开始](../hardware-specific/espressif/esp32-quick-start)
- [ESP32 概述](../hardware-specific/espressif/overview-esp32)
- [tos.py 使用指南](tos-guide)
