---
title: "ESP32 快速开始"
---

# ESP32 快速开始

在 ESP32 开发板上构建、烧录并运行你的第一个 TuyaOpen 应用。

## 准备环境

- ESP32 开发板（ESP32、ESP32-S3、ESP32-C3 或 ESP32-C6）
- USB 数据线（USB-C 或 Micro-USB，取决于开发板）
- 运行 Linux、macOS 或 Windows（推荐 WSL）的电脑
- Wi-Fi 网络（2.4 GHz）

:::info
如果你的应用使用 Tuya Cloud 功能（远程控制、AI Agent、OTA），还需要 [Tuya Cloud 授权码](../../quick-start/equipment-authorization)。仅本地运行的项目（GPIO、UART、显示示例）不需要授权码。
:::

## 步骤

### 1. 克隆 TuyaOpen 并配置环境

参考[环境搭建](../../quick-start/enviroment-setup)，在对应的系统内下载 TuyaOpen 并配置。

### 2. 选择要构建的项目

首次构建建议使用 **switch demo**（简单的云端开关）：

```bash
cd apps/tuya_cloud/switch_demo
```

或使用不需要 Tuya Cloud 的 **GPIO 示例**：

```bash
cd examples/peripherals/gpio
```

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

构建过程: 编译 TuyaOpen SDK、应用代码和 ESP-IDF 平台层。

:::info
首次构建需要数分钟，因为需要下载 ESP-IDF 工具链和依赖。
:::

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
如果在 Linux 上遇到"permission denied"错误,
请执行以下指令: 
```bash
sudo usermod -aG dialout $USER
```
注销后重新登录使更改生效。
:::

### 6. 查看设备日志

```bash
tos.py monitor
```

或直接使用 ESP-IDF monitor：

```bash
tos.py idf monitor
```

如果直接使用 ESP-IDF moniotr, 是按 `Ctrl+]` 退出。

### 7.设备配网

对于使用需要连接涂鸦云的项目（如 switch_demo），需要该步骤：

1. 在手机上打开 **涂鸦智能** 或 **Smart Life** App。
2. 点击 **添加设备** > **自动扫描**。
3. 确保手机连接到同一 2.4 GHz Wi-Fi 网络。
4. 按照 App 指引完成配网。

设备应出现在 App 中，并可响应远程控制命令。

## 预期结果

- **GPIO 示例**：串口输出显示 GPIO 电平翻转。可用 LED 或万用表验证。
- **Switch demo**：设备连接 Tuya Cloud，在 涂鸦智能 App 中显示为可控开关。

## 使用 ESP-IDF 命令

TuyaOpen 封装了 ESP-IDF，但你可以直接访问 IDF 命令：

```bash
# 打开 ESP-IDF menuconfig
tos.py idf menuconfig

# 运行 IDF monitor
tos.py idf monitor

# 清理 IDF 构建
tos.py idf fullclean
```

这对高级配置（分区表、IDF 组件设置等）很有用。

## 常见问题

| 问题 | 解决方案 |
|------|---------|
| `tos.py check` 失败 | 重新运行 `tos.py`。确保安装了 Python 3.8+。 |
| 构建错误 "IDF not found" | ESP-IDF 工具链在首次构建时下载，确保网络连接正常。 |
| 烧录失败 "port not found" | 检查 USB 连接。在 Linux 上验证 `/dev/ttyUSB*` 或 `/dev/ttyACM*` 是否存在。 |
| 设备无法配网 | 确认使用 2.4 GHz Wi-Fi。检查设备是否已写入正确的授权码，参见[设备授权](../../quick-start/equipment-authorization)。 |
| 串口输出 "auth error" | 设备没有授权，需要给设备授权，参见[设备授权](../../quick-start/equipment-authorization)。 |

## 参考资料

- [ESP32 与 TuyaOpen -- 概述](overview-esp32)
- [环境搭建](../../quick-start/enviroment-setup)
- [编译指南](../../build-system/compilation-guide)
- [设备授权](../../quick-start/equipment-authorization)
- [tos.py 使用指南](../../tos-tools/tos-guide)
