---
title: "Bring-up 3：Wi-Fi 与网络"
---

第三个阶段把你的芯片连入网络：关联到一个 AP、获取 IP，并通过 TCP 和 TLS 访问互联网。这是云端连接所依赖的基础。

## 目标

TuyaOpen 能够扫描并加入一个 Wi-Fi AP、获取 IP 地址、解析 DNS，并向某个互联网主机打开一个 TLS socket。

## 需要实现的文件

| 文件 | 你需要实现的内容 |
|------|--------------------|
| `tkl_wifi.c` | 扫描、连接/断开、station/AP/模式切换、MAC 获取/设置、RF 校准、国家码 |
| `tkl_network.c` **或** `tkl_lwip.c` | socket 层——根据你使用的是谁的 lwIP（见下文），只需实现**其中之一** |
| `tkl_hash.c` / `tkl_symmetry.c` *（可选）* | 仅当你使用自己 SDK 的加解密、而非 TuyaOpen 的 Mbed TLS 时才需要 |

## 细节

- **选择一个网络适配方案：**
  - **厂商 lwIP**——保留你 SDK 自带的 lwIP 并适配 `tkl_network.c`。范例：[TuyaOpen-esp32 `tkl_network.c`](https://github.com/tuya/TuyaOpen-esp32/blob/master/tuya_open_sdk/tuyaos_adapter/src/drivers/tkl_network.c)。
  - **TuyaOpen lwIP**——使用 TuyaOpen 的 lwIP 并适配 `tkl_lwip.c`。范例：[TuyaOpen-T2 `tkl_lwip.c`](https://github.com/tuya/TuyaOpen-T2/blob/master/tuyaos/tuyaos_adapter/src/tkl_lwip.c)。

  只适配其中一个。在 `tos.py config menu` → `configure tuyaopen` → `configure enable/disable liblwip` 中切换。
- **TLS / 加解密。** 使用你 SDK 的 Mbed TLS 或 TuyaOpen 的（`configure mbedtls` → `Enable user custom`）。无论哪种方式，一个良好的硬件**随机数生成器**都至关重要——熵不足会破坏 TLS 握手。
- **Wi-Fi 事件。** 驱动 `WIFI_EVENT_CB`，让 TuyaOpen 能感知到连接/断开/获取 IP 的状态转换；station 状态机和重连逻辑都依赖于这些事件。

## 验证

在一个测试 app 中：扫描并加入你的 AP，通过日志确认已获取到 IP，解析一个主机名（DNS），并向某个互联网端点打开一个 TLS 连接。当一个 TLS socket 能够稳定地建立连接并收发数据时，即为成功。

下一步：[Bring-up 4：云端连接](cloud-connection)。

## 参见

- [tkl_wifi 参考](../../../tkl-api/tkl_wifi) · [tkl_network](../../../tkl-api/tkl_network) · [tkl_lwip](../../../tkl-api/tkl_lwip)
- [TAL Wi-Fi 教程](../../../peripheral/tutorials/tal-wifi-api)
