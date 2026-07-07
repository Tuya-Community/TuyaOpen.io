---
title: tkl_wired | 以太有线驱动
description: "tkl_wired 参考 —— 将有线以太网链路适配到 TuyaOS，上报链路状态与 IP/MAC 地址并注册状态变化回调的有线驱动 TKL API。"
keywords:
  - tkl_wired
  - TuyaOpen 有线驱动
  - 以太网链路
  - 嵌入式驱动
---

`tkl_wired` 将有线以太网链路适配到 TuyaOS。它用于上报链路状态、有线接口的 IPv4 和 IPv6 地址以及 MAC 地址，并允许注册在链路状态变化时触发的回调。其实现位于 `tkl_wired.c`，由 TuyaOS 生成，并预留了供平台代码填写的区域。

## 链路状态

`tkl_wired_get_status` 与状态变化回调会上报以下两种状态之一：

| 枚举 | 描述 |
| --- | --- |
| `TKL_WIRED_LINK_DOWN` | 网线已拔出。 |
| `TKL_WIRED_LINK_UP` | 网线已插入且已获取到 IP 地址。 |

## tkl_wired_get_status

```c
OPERATE_RET tkl_wired_get_status(TKL_WIRED_STAT_E *status);
```

获取有线连接的当前链路状态。

参数：

| 输入/输出 | 参数名 | 描述 |
| --- | --- | --- |
| [out] | `status` | 链路状态，`TKL_WIRED_STAT_E`。 |

返回值：

成功时返回 `OPRT_OK`，其他值表示错误，请参见 `tuya_error_code.h`。

## tkl_wired_set_status_cb

```c
OPERATE_RET tkl_wired_set_status_cb(TKL_WIRED_STATUS_CHANGE_CB cb);
```

注册在有线链路状态变化时触发的回调函数。

参数：

| 输入/输出 | 参数名 | 描述 |
| --- | --- | --- |
| [in] | `cb` | 状态变化时调用的回调函数。 |

回调函数的签名如下：

```c
typedef void (*TKL_WIRED_STATUS_CHANGE_CB)(TKL_WIRED_STAT_E status);
```

返回值：

成功时返回 `OPRT_OK`，其他值表示错误，请参见 `tuya_error_code.h`。

## tkl_wired_get_ip

```c
OPERATE_RET tkl_wired_get_ip(NW_IP_S *ip);
```

获取有线链路的 IPv4 地址、网关和子网掩码。

参数：

| 输入/输出 | 参数名 | 描述 |
| --- | --- | --- |
| [out] | `ip` | IP 信息，`NW_IP_S`。 |

返回值：

成功时返回 `OPRT_OK`，其他值表示错误，请参见 `tuya_error_code.h`。

## tkl_wired_get_ipv6

```c
OPERATE_RET tkl_wired_get_ipv6(NW_IP_TYPE type, NW_IP_S *ip);
```

获取有线链路的 IPv6 地址。

参数：

| 输入/输出 | 参数名 | 描述 |
| --- | --- | --- |
| [in] | `type` | 要读取的 IPv6 地址类型，`NW_IP_TYPE`。 |
| [out] | `ip` | IP 信息，`NW_IP_S`。 |

返回值：

成功时返回 `OPRT_OK`，其他值表示错误，请参见 `tuya_error_code.h`。

## tkl_wired_get_mac

```c
OPERATE_RET tkl_wired_get_mac(NW_MAC_S *mac);
```

获取有线链路的 MAC 地址。

参数：

| 输入/输出 | 参数名 | 描述 |
| --- | --- | --- |
| [out] | `mac` | MAC 地址，`NW_MAC_S`。 |

返回值：

成功时返回 `OPRT_OK`，其他值表示错误，请参见 `tuya_error_code.h`。

## tkl_wired_set_mac

```c
OPERATE_RET tkl_wired_set_mac(const NW_MAC_S *mac);
```

设置有线链路的 MAC 地址。

参数：

| 输入/输出 | 参数名 | 描述 |
| --- | --- | --- |
| [in] | `mac` | 要设置的 MAC 地址，`NW_MAC_S`。 |

返回值：

成功时返回 `OPRT_OK`，其他值表示错误，请参见 `tuya_error_code.h`。
