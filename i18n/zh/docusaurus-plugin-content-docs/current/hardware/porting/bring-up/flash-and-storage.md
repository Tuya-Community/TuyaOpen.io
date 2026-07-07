---
title: "Bring-up 2：Flash 与存储"
description: "移植 bring-up 第二阶段：为 TuyaOpen 在芯片 flash 上预留持久化区域，实现读、写、擦除并支持掉电安全的键值存储。"
keywords:
  - 移植
  - Flash 存储
  - 键值存储
  - LittleFS
  - TuyaOpen 硬件
---

第二个阶段为 TuyaOpen 在你芯片的 flash 上提供一处持久化数据的空间。设备授权信息、密钥和配网状态必须在重启后依然保留——因此该阶段必须先工作起来，设备才能保持对云端的激活状态。

## 目标

TuyaOpen 能够读取、写入和擦除一块预留的 flash 区域，并且其键值存储能够在掉电重启后保留数据。

## 需要实现的文件

| 文件 | 你需要实现的内容 |
|------|--------------------|
| `tkl_flash.c` | Flash 读 / 写 / 擦除，以及你为 TuyaOpen 预留的区域的分区信息（基地址 + 大小） |
| `tkl_fs.c` *（可选）* | 仅当你使用**厂商 SDK 的**文件系统、而非 TuyaOpen 内置的 LittleFS 时才需要 |

## 细节

- **预留一块未使用的 flash 区域。** 选取固件区域之外、并按你的 flash 擦除粒度对齐的一块区域，并在 `tkl_flash.c` 中返回它。TuyaOpen 和 TuyaOS 都会在这里存储授权数据。
- **启用 `ENABLE_FLASH`**，在 `tos.py config menu` 中开启——这是必须的。
- **文件系统的选择**（`ENABLE_FILE_SYSTEM`）：
  - **关闭（建议起步时采用）：** TuyaOpen 使用其内置的 **LittleFS** 并启用 AES128-CBC 加密，其地址和大小由 `tkl_flash.c` 指定。你只需实现 `tkl_flash.c`。
  - **启用：** TuyaOpen 使用厂商文件系统——你还需要适配 `tkl_fs.c`。
- **掉电安全。** 遵守先擦除后写入以及对齐要求；一个忽略擦除粒度的 flash 适配会在意外复位时损坏 KV 存储。

:::tip
为什么要专门预留一块区域？配网后，设备会把它的身份信息和密钥保存到 flash。一块预留好、大小正确的区域能让 TuyaOpen（LittleFS）和 TuyaOS（KV）安全地存储这些数据，并让你能在两个 SDK 之间切换而无需重新烧录布局。
:::

## 验证

通过 KV/存储 API 写入一个值，重启，然后读回并确认其未发生变化。端到端验证：一旦[云端连接](cloud-connection)工作正常，给设备配网一次，并确认它在掉电重启后仍保持激活状态（无需重新配网）——这就证明了 flash 区域和 KV 是可靠的。

下一步：[Bring-up 3：Wi-Fi 与网络](wifi-and-network)。

## 参见

- [tkl_flash 参考](../../../tkl-api/tkl_flash)
- [适配新平台](../porting-platform)——flash 预留的原理说明
