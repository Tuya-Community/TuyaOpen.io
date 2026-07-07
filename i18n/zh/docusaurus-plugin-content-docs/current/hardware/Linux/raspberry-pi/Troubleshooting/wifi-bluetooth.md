---
title: "Raspberry Pi 配网失败排障"
slug: /hardware/Linux/raspberry-pi/wifi-bluetooth
description: "排查在 Raspberry Pi 上运行 TuyaOpen 应用时阻碍配网的 Wi-Fi 与蓝牙问题：每节给出现象、原因与解决方法。"
keywords:
  - Raspberry Pi
  - 配网排障
  - Wi-Fi
  - 蓝牙
  - TuyaOpen 硬件
---

排查在 Raspberry Pi 上运行 TuyaOpen 应用（如 `apps/tuya.ai/your_chat_bot`）时阻碍配网的 Wi-Fi 与蓝牙问题。下面每一节都给出现象、原因和解决方法。

## 前置准备

请先阅读 [快速开始](https://tuyaopen.ai/zh/docs/quick-start) 及其子章节：

- 搭建 [TuyaOpen 开发环境](https://tuyaopen.ai/zh/docs/quick-start/enviroment-setup)。
- 获取 [TuyaOpen 专用授权码](https://tuyaopen.ai/zh/docs/quick-start/equipment-authorization)，推荐使用修改头文件的方式进行授权。
- 了解[设备配网](https://tuyaopen.ai/zh/docs/quick-start/device-network-configuration)。

## 配网失败或设备无法重新配对

**现象。** 首次运行时应用无法进入配网流程，或已配对的设备联网失败。

**原因。** 应用会在工作目录的 `tuyadb` 文件夹中保存设备信息（包括配对状态），残留数据可能会阻碍重新配网。

**解决方法。** 清理设备信息后重新运行：

1. 停止正在运行的程序。
2. 删除程序运行目录下的 `tuyadb` 文件夹：

   ```bash
   rm -rf tuyadb
   ```

3. 重新运行程序并再次进入配网流程。

## 终端未输出配网二维码

**现象。** 应用已启动，但终端始终没有打印配网二维码，无法扫码。

**原因。** 二维码默认通过 UART0 发送。在树莓派上，UART0 可能输出到硬件串口线而非你的终端。将 UART 重定向到标准输出，即可在终端中看到二维码。

**解决方法。** 启用 UART 重定向（即 “Dummy 串口” stdin/stdout/UDP 模式）：

1. 激活 `tos.py` 环境，进入应用目录（以 `your_chat_bot` 为例）：

   ```bash
   cd apps/tuya.ai/your_chat_bot
   ```

2. 打开配置菜单：

   ```bash
   tos.py config menu
   ```

3. 进入 `Choice a board → LINUX → TKL Board Configuration`，勾选：

   - `Enable UART`
   - `UART redirection (stdin/stdout/UDP) instead of hardware ttyAMA*`

![TKL Board Configuration 菜单中 UART 重定向的配置示例](https://images.tuyacn.com/fe-static/docs/img/842c4b01-3d4b-487b-973d-4744e82935e9.png)

启用 UART 重定向后，应用在配网时会将二维码输出到当前终端。使用智能生活 App 扫码即可完成配网。

## Wi-Fi 或蓝牙被系统禁用

**现象。** 蓝牙扫描或配网失败（BLE 不工作、找不到设备），Wi-Fi 也可能不可用。

**原因。** 系统可能通过 `rfkill` 禁用射频，分为软件禁用（`Soft blocked`）和硬件禁用（`Hard blocked`，例如物理开关）。

**解决方法。**

1. 查看 Wi-Fi 与蓝牙状态：

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

   - `Soft blocked: yes` 表示设备在软件层面被禁用。
   - `Hard blocked: yes` 表示设备在硬件层面被禁用（例如物理开关），需要先解除硬件禁用。

2. 解除软件禁用：

   ```bash
   sudo rfkill unblock all
   ```

   如需只解锁某一项：

   ```bash
   sudo rfkill unblock wifi
   sudo rfkill unblock bluetooth
   ```

## 解除禁用后蓝牙配网仍然失败

**现象。** 射频未被禁用，但蓝牙配网依然无法工作。

**原因。** 编译配置中可能未启用 TuyaOpen 蓝牙服务，或修改配置后未重新构建。

**解决方法。** 在 `tos.py config menu` 中确认蓝牙服务已启用：

```text
configure tuyaopen  --->
  configure tuya cloud service  --->
    [*] ENABLE_BT_SERVICE: enable tuya bt iot function  --->
      [ ] ENABLE_NIMBLE: enable nimble stack instead of ble stack in board
```

建议配置：

- 开启蓝牙服务。
- 关闭 `NIMBLE` 协议栈。

修改配置后需要重新构建（例如执行 `tos.py build`），否则配置不会生效。

## 访问射频时出现权限错误

**现象。** 应用在运行时无法打开 `/dev/*` 节点或系统服务接口。

**原因。** 树莓派上的 Wi-Fi、蓝牙与外设操作通常需要较高权限。

**解决方法。** 使用 `sudo` 运行生成的可执行文件：

```bash
sudo ./your_chat_bot_*.elf
```
