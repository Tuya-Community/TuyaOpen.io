---
title: "Bring-up 4：云端连接"
description: "移植 bring-up 第四阶段：在系统、存储与网络就绪之后，设备完成配网与激活，经 MQTT 与涂鸦云端建立连接并收发数据点。"
keywords:
  - 移植
  - 云端连接
  - MQTT
  - 配网
  - TuyaOpen 硬件
---

第四个阶段是集成里程碑：在系统、存储和网络都就绪后，设备完成配网、激活，并通过 MQTT 与 Tuya 云端通信。当 `switch_demo` 端到端跑通时，你的移植在功能上就基本完成了。

## 目标

设备完成配网（蓝牙或 Wi-Fi AP）、针对某个产品完成激活、通过 MQTT 连接到云端，并上报/接收数据点——通过 `switch_demo` 进行验证。

## 需要实现的文件

本阶段几乎不新增适配代码——它是对阶段 1–3 的综合检验。请确认以下这些支撑部分：

| 文件 | 你需要实现 / 确认的内容 |
|------|------------------------------|
| `tkl_rtc.c` *（或 SNTP）* | 真实时间——TLS 证书校验和云端握手都需要一个准确的时钟 |
| `tkl_system.c` RNG | 一个强随机源（从阶段 1 起重新审视），用于 TLS 和密钥生成 |
| `tkl_bluetooth.c` *（可选）* | 仅用于 **BLE 配网**；Wi-Fi AP 配网不需要蓝牙 |

其余部分——MQTT、TLS、激活——都是 TuyaOpen 库代码，运行在你已经移植好的协议栈之上。

## 细节

- **前置条件：** 一个 `PID` 和一个 license（`UUID` + `AuthKey`）已烧录进固件。参见[设备—云绑定的工作原理](../../../cloud/tuya-cloud/device-cloud-binding)和[设备授权](../../../quick-start/equipment-authorization)。
- **时间很重要。** 错误的时钟会导致 TLS 证书校验失败——在云端握手前，通过 RTC 或 SNTP 同步时间。
- **配网路径。** BLE 配网需要 `tkl_bluetooth.c`；否则使用 Wi-Fi AP 配网，把蓝牙推迟到下一阶段。
- **使用 `switch_demo`** 作为参考 app——它最精简，能把云端路径与外设相关的问题隔离开。

## 验证

构建并烧录 `apps/tuya_cloud/switch_demo`，在 Tuya app 中给它配网，确认它能够激活并连接（留意 `TUYA_EVENT_MQTT_CONNECTED`）。从 app 端和设备端分别切换开关，确认数据点双向更新。可选地验证一次 OTA。本阶段通过，意味着该平台已具备云端连接能力。

下一步：[Bring-up 5：外设与 AI](peripherals-and-ai)。

## 参见

- [设备—云绑定的工作原理](../../../cloud/tuya-cloud/device-cloud-binding)
- [Tuya IoT 客户端 API](../../../cloud/iot-client/tuya-iot-client-reference)
- [switch_demo](../../../cloud/iot-client/demo-tuya-iot-light)
