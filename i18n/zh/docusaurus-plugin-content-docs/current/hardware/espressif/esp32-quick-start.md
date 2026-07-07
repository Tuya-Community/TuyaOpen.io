---
title: "ESP32 快速开始"
description: "在 ESP32 开发板上构建、烧录并运行你的第一个 TuyaOpen 应用：覆盖硬件准备、环境搭建、克隆仓库、配置、编译烧录与配网验证。"
keywords:
  - ESP32
  - 快速开始
  - 烧录
  - 配网
  - TuyaOpen 硬件
---

在 ESP32 开发板上构建、烧录并运行你的第一个 TuyaOpen 应用。

## 前提条件

- 已完成[环境搭建](../../quick-start/enviroment-setup)
- 了解基本的 C 语言开发和串口终端使用

## 准备硬件

- 一块 ESP32 开发板（ESP32、ESP32-S3、ESP32-C3 或 ESP32-C6）
- USB 数据线（USB-C 或 Micro-USB，取决于开发板）
- 运行 Linux、macOS 或 Windows（推荐 WSL）的电脑
- Wi-Fi 网络（2.4 GHz）

:::info
如果你的应用使用 Tuya Cloud 功能（远程控制、AI Agent、OTA），还需要一个 [Tuya Cloud 授权码](../../quick-start/equipment-authorization)。仅本地运行的项目（GPIO、UART、显示示例）不需要授权码。
:::

## 步骤

### 1. 克隆 TuyaOpen 并配置环境

```bash
git clone https://github.com/tuya/TuyaOpen.git
cd TuyaOpen
git submodule update --init
```

激活 TuyaOpen 环境：

```bash
source export.sh
```

确认工具可用：

```bash
tos.py version
tos.py check
```

详细步骤参见[环境搭建](../../quick-start/enviroment-setup)。

### 2. 选择要构建的项目

首次构建建议使用 **switch demo**（简单的云端开关）：

```bash
cd apps/tuya_cloud/switch_demo
```

或使用不需要 Tuya Cloud 的 **GPIO 示例**：

```bash
cd examples/peripherals/gpio
```

:::warning
大多数外设示例默认配置为 T5AI。运行 `tos.py config choice` 时可能看不到预置的 ESP32 配置。请手动选择你的 ESP32 芯片，或在示例的 `config/` 目录下创建一个 `.config` 文件（格式参见 [ESP32 适配新开发板](esp32-new-board)）。
:::

### 3. 选择 ESP32 开发板配置

```bash
tos.py config choice
```

你将看到可用配置列表，选择与你的开发板匹配的配置：

```
1. ESP32.config
2. ESP32-C3.config
3. ESP32-C6.config
4. ESP32-S3.config
5. DNESP32S3.config
...
```

输入对应数字。如果你使用通用 ESP32-S3 开发板，选择 `ESP32-S3.config`。

### 4. 构建固件

```bash
tos.py build
```

构建过程会编译 TuyaOpen SDK、应用代码和 ESP-IDF 平台层。首次构建需要数分钟，因为需要下载 ESP-IDF 工具链和依赖。

### 5. 烧录固件

通过 USB 连接 ESP32 开发板，然后：

```bash
tos.py flash
```

如果串口未自动检测到，手动指定：

```bash
tos.py flash --port /dev/ttyUSB0
```

:::tip[Linux 串口权限]
如果在 Linux 上遇到 "permission denied" 错误：

```bash
sudo usermod -aG dialout $USER
```

注销后重新登录使更改生效。
:::

### 6. 查看串口日志

```bash
tos.py monitor
```

或直接使用 ESP-IDF monitor：

```bash
tos.py idf monitor
```

按 `Ctrl+]` 退出 monitor。

### 7.（仅云端项目）设备配网

对于使用 Tuya Cloud 的项目（如 switch_demo）：

1. 在手机上打开 **涂鸦智能** 或 **Smart Life** App。
2. 点击 **添加设备** > **自动扫描**。
3. 确保手机连接到同一 2.4 GHz Wi-Fi 网络。
4. 按照 App 指引完成配网。

设备应出现在 App 中，并可响应远程控制命令。

## 预期结果

- **GPIO 示例**：串口输出显示 GPIO 电平翻转。可用 LED 或万用表验证。
- **Switch demo**：设备连接 Tuya Cloud，在涂鸦智能 App 中显示为可控开关。

## 使用 ESP-IDF 命令

`tos.py idf` 是 `idf.py` 的透传入口：传入的参数会直接转发。需要先用 `tos.py config choice` 将项目配置为 ESP32。

```bash
# 任意 idf.py 命令均可使用
tos.py idf menuconfig
tos.py idf monitor
tos.py idf fullclean
tos.py idf flash -p /dev/ttyUSB0
tos.py idf set-target esp32s3
tos.py idf size

# 传递 IDF 专属参数
tos.py idf --idf-flags="-v" build
```

这对高级配置（分区表、IDF 组件设置、详细日志构建等）很有用。实现参见 [`cli_idf.py`](https://github.com/tuya/TuyaOpen/blob/master/tools/cli_command/cli_idf.py)。

## 常见问题

| 问题 | 解决方案 |
|------|---------|
| `tos.py check` 失败 | 重新运行 `source export.sh`。确保安装了 Python 3.8+。 |
| 构建错误 "IDF not found" | ESP-IDF 工具链在首次构建时下载，确保网络连接正常。 |
| 烧录失败 "port not found" | 检查 USB 连接。在 Linux 上验证 `/dev/ttyUSB*` 或 `/dev/ttyACM*` 是否存在。 |
| 设备无法配网 | 确认使用 2.4 GHz Wi-Fi。检查 `tuya_app_config.h` 中的授权码。 |
| 串口输出 "auth error" | 写入授权码。参见[设备授权](../../quick-start/equipment-authorization)。 |

## 相关文档

- [ESP32 与 TuyaOpen -- 概述](overview-esp32)
- [ESP32 引脚映射](esp32-pin-mapping)
- [ESP32 OTA 固件升级](esp32-ota)
- [环境搭建](../../quick-start/enviroment-setup)
- [编译指南](../../build-system/compilation-guide)
- [设备授权](../../quick-start/equipment-authorization)
- [tos.py 使用指南](../../tos-tools/tos-guide)
