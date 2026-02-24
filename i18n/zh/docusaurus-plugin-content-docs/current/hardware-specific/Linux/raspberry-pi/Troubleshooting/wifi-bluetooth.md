---
title: "Raspberry Pi配网失败排障"
slug: /hardware-specific/Linux/raspberry-pi/wifi-bluetooth
---

本文档用于排查在 Raspberry Pi 上运行 TuyaOpen 应用（如 `apps/tuya.ai/your_chat_bot`）时遇到的 Wi‑Fi/蓝牙相关问题，例如：配网二维码未输出、蓝牙不可用、Wi‑Fi/蓝牙被系统禁用等。

## 前置准备

请先阅读 [快速开始](https://tuyaopen.ai/zh/docs/quick-start) 及其子章节，了解以下内容：
- 如何搭建 [TuyaOpen 开发环境](https://tuyaopen.ai/zh/docs/quick-start/enviroment-setup)
- 如何获取 [TuyaOpen 专用授权码](https://tuyaopen.ai/zh/docs/quick-start/equipment-authorization)，推荐使用修改头文件的方式进行授权
- 如何进行[设备配网](https://tuyaopen.ai/zh/docs/quick-start/device-network-configuration)


## 常见现象

- 运行程序后无法进入配网流程，或终端没有打印配网二维码。
- 蓝牙扫描/配网失败（BLE 不工作、找不到设备）。
- Wi‑Fi 或蓝牙被系统禁用（`rfkill` 显示 blocked）。

## 配网二维码未输出到终端

在 Raspberry Pi 上，为了让配网二维码等信息直接输出到当前终端，建议启用“fake UART（stdin/UDP）”。

1. 激活 `tos.py` 环境，并进入应用目录（以 `your_chat_bot` 为例）：

```bash
cd apps/tuya.ai/your_chat_bot
```

2. 打开配置菜单：

```bash
tos.py config menu
```

3. 进入 `Choice a board → LINUX → TKL Board Configuration`，勾选：

- `Enable UART`
- `Use fake UART (stdin/UDP) instead of hardware ttyAMA*`

示例界面如下：

![Raspberry Pi UART fake 配置示例](https://images.tuyacn.com/fe-static/docs/img/842c4b01-3d4b-487b-973d-4744e82935e9.png)

启用 fake UART 后，应用在配网时通常会将二维码等信息输出到当前终端，直接使用智能生活APP扫码配网。

## 检查 Wi‑Fi/蓝牙是否被 rfkill 禁用

1. 查看 Wi‑Fi 与蓝牙状态：

```bash
rfkill list
```

示例输出：

```text
0: hci0: Bluetooth
        Soft blocked: no
        Hard blocked: no
1: phy0: Wireless LAN
        Soft blocked: yes
        Hard blocked: no
```

其中：

- `Soft blocked: yes` 表示设备在软件层面被禁用。
- `Hard blocked: yes` 表示设备在硬件层面被禁用（例如物理开关），需要先解除硬件禁用。

2. 解除软件禁用：

```bash
sudo rfkill unblock all
```

如需只解锁某一项，也可以用：

```bash
sudo rfkill unblock wifi
sudo rfkill unblock bluetooth
```

## 蓝牙服务与 TuyaOpen 配置项检查

### 确认 TuyaOpen 启用了蓝牙服务

在 `tos.py config menu` 中检查：

```text
configure tuyaopen  --->
  configure tuya cloud service  --->
    [*] ENABLE_BT_SERVICE: enable tuya bt iot function  --->
      [ ] ENABLE_NIMBLE: enable nimble stack instead of ble stack in board
```

一般建议：
开启蓝牙服务，同时关闭 `NIMBLE` 协议栈。

修改配置后需要重新构建（例如执行 `tos.py build`），否则配置不会生效。

## 运行权限提示

在 Raspberry Pi 上运行应用/示例时，Wi‑Fi/蓝牙/外设相关操作往往需要访问 `/dev/*` 或系统服务接口，建议使用 `sudo` 运行生成的可执行文件，例如：

```bash
sudo ./your_chat_bot_*.elf
```
