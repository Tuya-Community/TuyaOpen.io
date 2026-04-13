---
title: "ESP32 产品化与 OTA 指南"
---

# ESP32 产品化与 OTA 指南

将你的 ESP32 TuyaOpen 项目从原型推向产品化：设备授权、固件管理和空中升级。

## 前提条件

- 已完成 [ESP32 快速开始](esp32-quick-start)
- 拥有可连接 Tuya Cloud 的 TuyaOpen 项目
- 已在 [Tuya IoT 平台](https://iot.tuya.com) 创建产品

## 需求

- 已烧录固件的 ESP32 开发板
- Tuya Cloud 授权码（PID、UUID、AuthKey）
- 联网的电脑
- USB 数据线（用于初始烧录）

## 设备授权

每个连接 Tuya Cloud 的设备需要唯一身份（UUID + AuthKey）并关联产品 ID（PID）。

### 单设备授权（开发阶段）

开发和测试时，直接在固件中配置凭证：

编辑 `include/tuya_app_config.h`：

```c
#define TUYA_PRODUCT_ID     "your_pid_here"
#define TUYA_UUID           "your_uuid_here"
#define TUYA_AUTHKEY        "your_authkey_here"
```

正常构建和烧录：

```bash
tos.py build
tos.py flash
```

详见[设备授权](../../quick-start/equipment-authorization)。

### 批量授权（量产阶段）

量产时不在固件中硬编码凭证：

1. **构建单一固件镜像**，不内嵌凭证。
2. **使用 Tuya 产线工具** 在产线上为每台设备烧录固件和唯一凭证（UUID + AuthKey）。
3. **授权码** 通过 Tuya IoT 平台批量采购。

:::note
批量产线工具和授权码采购通过 [Tuya IoT 平台](https://iot.tuya.com) 管理。如需产线规模授权，请联系 Tuya 支持。
:::

## 空中升级 (OTA)

TuyaOpen 通过 Tuya Cloud 平台为 ESP32 提供内置 OTA 支持。

### OTA 工作原理

1. 你将新固件二进制文件上传到 Tuya IoT 平台。
2. 平台将更新分发到目标设备。
3. 设备下载固件，验证完整性，并应用更新。
4. 设备重启进入新固件。

TKL OTA 适配器 (`tkl_ota.c`) 负责 ESP32 分区管理和 Flash 操作。

### 构建 OTA 固件

正常构建固件：

```bash
tos.py build
```

构建输出包含 OTA 二进制文件。

### 上传固件到 Tuya Cloud

1. 登录 [Tuya IoT 平台](https://iot.tuya.com)。
2. 进入产品 > **设备管理** > **固件**。
3. 上传固件二进制文件。
4. 设置目标版本和更新策略（静默、用户确认或强制）。
5. 选择目标设备或设备组。

### OTA 最佳实践

- **先在少量设备上测试。** 使用分批发布功能先推送到少量设备。
- **固件版本化。** 在构建配置中使用语义化版本号。
- **优雅处理 OTA 失败。** TuyaOpen 维护回滚分区，新固件启动失败时自动回退。
- **不要在 OTA 版本间更改分区表**，除非有迁移方案。

## Flash 和串口配置

### Flash 大小

TuyaOpen 中 ESP32 开发板默认 4 MB Flash。部分开发板（特别是 S3 系列）使用 16 MB：

```kconfig
config PLATFORM_FLASHSIZE_16M
    bool
    default y
```

### 串口波特率

TuyaOpen 中 ESP32 默认串口配置：

| 芯片 | UART | 波特率 | TX 引脚 | RX 引脚 |
|------|------|--------|---------|---------|
| ESP32 | UART0 | 115200 | 默认 | 默认 |
| ESP32-C3 | UART0 | 115200 | 21 | 20 |
| ESP32-C6 | UART0 | 115200 | 16 | 17 |
| ESP32-S3 | UART0 | 115200 | 43 | 44 |

### USB JTAG (ESP32-S3)

部分 ESP32-S3 开发板将 USB 端口路由到内部 USB-JTAG 控制器。如果你的开发板使用 USB JTAG 作为串口输出：

```kconfig
config ENABLE_ESP32S3_USB_JTAG_ONLY
    bool
    default y
```

## 固件安全

### Secure Boot

ESP-IDF 在 ESP32-S3、ESP32-C3 和 ESP32-C6 上支持 Secure Boot v2，可通过以下方式配置：

```bash
tos.py idf menuconfig
```

导航到 **Security features** > **Enable hardware Secure Boot**。

:::warning
启用 Secure Boot 是芯片上的一次性不可逆操作。在产品硬件上启用前，务必在开发设备上充分测试。
:::

### Flash 加密

ESP-IDF Flash 加密保护固件不被从芯片中读取。通过 `menuconfig` 配置：

导航到 **Security features** > **Enable flash encryption on boot**。

## 产品化检查清单

出货前确认：

- [ ] 固件在目标硬件上正确构建并运行
- [ ] Tuya Cloud 连接已测试（设备配网、DP 功能、命令接收）
- [ ] OTA 已测试（上传新固件，验证设备更新和重启）
- [ ] 每台设备使用唯一授权码（非硬编码的开发凭证）
- [ ] 串口输出已禁用或设置为产品日志级别
- [ ] 已评估 Flash 加密和 Secure Boot 是否满足安全需求
- [ ] 已通过目标市场的法规认证（FCC、CE 等）

## 参考资料

- [设备授权](../../quick-start/equipment-authorization)
- [ESP32 与 TuyaOpen -- 概述](overview-esp32)
- [ESP32 快速开始](esp32-quick-start)
- [在 Tuya Cloud 创建新产品](../../cloud/tuya-cloud/creating-new-product)
- [Tuya IoT 平台](https://iot.tuya.com)
