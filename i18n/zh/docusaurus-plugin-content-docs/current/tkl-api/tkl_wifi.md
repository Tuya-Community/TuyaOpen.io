---
title: tkl_wifi | Wi-Fi 驱动
---

`tkl_wifi` 将平台的 Wi-Fi 驱动适配到 TuyaOS，涵盖 station 与 soft-AP 两种工作方式：初始化、扫描、连接、信道与国家码控制、MAC 与 IP 管理、sniffer 与管理帧抓取、低功耗模式以及快连。其实现位于 `tkl_wifi.c`，由 TuyaOS 生成，并预留了供平台代码填写的区域。

除非另有说明，每个函数成功时返回 `OPRT_OK`，失败时返回其他值，错误码请参见 `tuya_error_code.h`。

## 关键类型

接口类型用于选择 API 作用于哪个逻辑 Wi-Fi 接口：

| `WF_IF_E` | 描述 |
| --- | --- |
| `WF_STATION` | Station（客户端）接口。 |
| `WF_AP` | Soft-AP 接口。 |

工作模式用于选择 Wi-Fi 子系统的运行方式：

| `WF_WK_MD_E` | 描述 |
| --- | --- |
| `WWM_POWERDOWN` | 关闭（Wi-Fi 模块下电）。 |
| `WWM_SNIFFER` | Sniffer（监听）模式。 |
| `WWM_STATION` | Station 模式。 |
| `WWM_SOFTAP` | Soft-AP 模式。 |
| `WWM_STATIONAP` | Station 与 Soft-AP 共存。 |
| `WWM_UNKNOWN` | 未知模式。 |

station 状态用于上报连接进度：

| `WF_STATION_STAT_E` | 描述 |
| --- | --- |
| `WSS_IDLE` | 未连接。 |
| `WSS_CONNECTING` | 正在连接。 |
| `WSS_PASSWD_WRONG` | 密码不匹配。 |
| `WSS_NO_AP_FOUND` | 未找到 AP。 |
| `WSS_CONN_FAIL` | 连接失败。 |
| `WSS_CONN_SUCCESS` | 已连接到 AP。 |
| `WSS_GOT_IP` | 已获取 IP 地址。 |
| `WSS_DHCP_FAIL` | DHCP 失败。 |

## tkl_wifi_init

```c
OPERATE_RET tkl_wifi_init(WIFI_EVENT_CB cb);
```

初始化 Wi-Fi 子系统并注册事件回调。

参数：

| 输入/输出 | 参数名 | 描述 |
| --- | --- | --- |
| [in] | `cb` | Wi-Fi 事件回调，`WIFI_EVENT_CB`。 |

回调函数签名如下，其中 `event` 为 `WF_EVENT_E`（`WFE_CONNECTED`、`WFE_CONNECT_FAILED`、`WFE_DISCONNECTED`）：

```c
typedef void (*WIFI_EVENT_CB)(WF_EVENT_E event, void *arg);
```

## tkl_wifi_scan_ap

```c
OPERATE_RET tkl_wifi_scan_ap(const int8_t *ssid, AP_IF_S **ap_ary, uint32_t *num);
```

扫描当前环境并返回找到的 AP。

参数：

| 输入/输出 | 参数名 | 描述 |
| --- | --- | --- |
| [in] | `ssid` | 要扫描的 SSID。为 `NULL` 时扫描所有 AP，否则扫描指定 SSID。 |
| [out] | `ap_ary` | 扫描到的 AP 信息数组，`AP_IF_S`。 |
| [out] | `num` | `ap_ary` 中的 AP 数量。 |

:::note
该函数会分配结果内存，且为阻塞调用。不再使用时，请调用 `tkl_wifi_release_ap` 释放结果。它仅扫描当前国家码对应的信道。
:::

## tkl_wifi_release_ap

```c
OPERATE_RET tkl_wifi_release_ap(AP_IF_S *ap);
```

释放由 `tkl_wifi_scan_ap` 分配的 AP 信息。

参数：

| 输入/输出 | 参数名 | 描述 |
| --- | --- | --- |
| [in] | `ap` | 要释放的 AP 信息。 |

## tkl_wifi_start_ap

```c
OPERATE_RET tkl_wifi_start_ap(const WF_AP_CFG_IF_S *cfg);
```

按给定配置启动 soft-AP 模式。

参数：

| 输入/输出 | 参数名 | 描述 |
| --- | --- | --- |
| [in] | `cfg` | soft-AP 配置，`WF_AP_CFG_IF_S`。 |

`WF_AP_CFG_IF_S` 包含 SSID、密码、信道、加密模式（`md`，类型为 `WF_AP_AUTH_MODE_E`）、隐藏标志、最大连接数（`max_conn`）、广播间隔以及 AP 模式的 IP 信息：

```c
typedef struct {
    uint8_t ssid[WIFI_SSID_LEN + 1];     // ssid
    uint8_t s_len;                       // len of ssid
    uint8_t passwd[WIFI_PASSWD_LEN + 1]; // passwd
    uint8_t p_len;                       // len of passwd
    uint8_t chan;                        // channel, default: 6
    WF_AP_AUTH_MODE_E md;                // encryption type
    uint8_t ssid_hidden;                 // ssid hidden, default: 0
    uint8_t max_conn;                    // max sta connect nums, default: 1
    uint16_t ms_interval;                // broadcast interval, default: 100
    NW_IP_S ip;                          // ip info for ap mode
} WF_AP_CFG_IF_S;
```

## tkl_wifi_stop_ap

```c
OPERATE_RET tkl_wifi_stop_ap(void);
```

停止 soft-AP 模式。

## tkl_wifi_set_cur_channel

```c
OPERATE_RET tkl_wifi_set_cur_channel(const uint8_t chan);
```

设置 Wi-Fi 接口的工作信道。

参数：

| 输入/输出 | 参数名 | 描述 |
| --- | --- | --- |
| [in] | `chan` | 要设置的信道。 |

:::note
设置超出当前国家码信道范围的信道会失败。支持在 sniffer 回调中设置信道。
:::

## tkl_wifi_get_cur_channel

```c
OPERATE_RET tkl_wifi_get_cur_channel(uint8_t *chan);
```

获取当前工作信道。

参数：

| 输入/输出 | 参数名 | 描述 |
| --- | --- | --- |
| [out] | `chan` | 当前信道。 |

## tkl_wifi_set_sniffer

```c
OPERATE_RET tkl_wifi_set_sniffer(const BOOL_T en, const SNIFFER_CALLBACK cb);
```

开启或关闭 sniffer 模式。开启后，驱动会将抓取到的每个数据帧回调给 `cb`。

参数：

| 输入/输出 | 参数名 | 描述 |
| --- | --- | --- |
| [in] | `en` | `TRUE` 开启 sniffer 模式，`FALSE` 关闭。 |
| [in] | `cb` | 抓包回调，`SNIFFER_CALLBACK`。 |

回调函数签名如下：

```c
typedef void (*SNIFFER_CALLBACK)(const uint8_t *buf, const uint16_t len, const int8_t rssi);
```

## tkl_wifi_get_ip

```c
OPERATE_RET tkl_wifi_get_ip(const WF_IF_E wf, NW_IP_S *ip);
```

获取指定接口的 IPv4 地址、网关和子网掩码。

参数：

| 输入/输出 | 参数名 | 描述 |
| --- | --- | --- |
| [in] | `wf` | Wi-Fi 接口，`WF_IF_E`。 |
| [out] | `ip` | IP 信息，`NW_IP_S`。 |

:::note
在 station+AP 模式下设备有两个 IP，请通过 `wf` 选择要读取的接口。
:::

## tkl_wifi_get_ipv6

```c
OPERATE_RET tkl_wifi_get_ipv6(const WF_IF_E wf, NW_IP_TYPE type, NW_IP_S *ip);
```

获取指定接口的 IPv6 地址。

参数：

| 输入/输出 | 参数名 | 描述 |
| --- | --- | --- |
| [in] | `wf` | Wi-Fi 接口，`WF_IF_E`。 |
| [in] | `type` | 要读取的 IPv6 地址类型，`NW_IP_TYPE`。 |
| [out] | `ip` | IP 信息，`NW_IP_S`。 |

## tkl_wifi_set_ip

```c
OPERATE_RET tkl_wifi_set_ip(const WF_IF_E wf, NW_IP_S *ip);
```

为指定接口设置静态 IPv4 地址、网关和子网掩码。

参数：

| 输入/输出 | 参数名 | 描述 |
| --- | --- | --- |
| [in] | `wf` | Wi-Fi 接口，`WF_IF_E`。 |
| [in] | `ip` | 要设置的 IP 信息，`NW_IP_S`。 |

## tkl_wifi_set_mac

```c
OPERATE_RET tkl_wifi_set_mac(const WF_IF_E wf, const NW_MAC_S *mac);
```

设置指定接口的 MAC 地址。

参数：

| 输入/输出 | 参数名 | 描述 |
| --- | --- | --- |
| [in] | `wf` | Wi-Fi 接口，`WF_IF_E`。 |
| [in] | `mac` | 要设置的 MAC 地址，`NW_MAC_S`。 |

## tkl_wifi_get_mac

```c
OPERATE_RET tkl_wifi_get_mac(const WF_IF_E wf, NW_MAC_S *mac);
```

获取指定接口的 MAC 地址。

参数：

| 输入/输出 | 参数名 | 描述 |
| --- | --- | --- |
| [in] | `wf` | Wi-Fi 接口，`WF_IF_E`。 |
| [out] | `mac` | MAC 地址，`NW_MAC_S`。 |

## tkl_wifi_set_work_mode

```c
OPERATE_RET tkl_wifi_set_work_mode(const WF_WK_MD_E mode);
```

设置 Wi-Fi 工作模式。

参数：

| 输入/输出 | 参数名 | 描述 |
| --- | --- | --- |
| [in] | `mode` | 工作模式，`WF_WK_MD_E`。 |

## tkl_wifi_get_work_mode

```c
OPERATE_RET tkl_wifi_get_work_mode(WF_WK_MD_E *mode);
```

获取当前 Wi-Fi 工作模式。

参数：

| 输入/输出 | 参数名 | 描述 |
| --- | --- | --- |
| [out] | `mode` | 工作模式，`WF_WK_MD_E`。 |

## tkl_wifi_get_connected_ap_info

```c
OPERATE_RET tkl_wifi_get_connected_ap_info(FAST_WF_CONNECTED_AP_INFO_T **fast_ap_info);
```

获取当前已连接 AP 的信息，用于快连功能。

参数：

| 输入/输出 | 参数名 | 描述 |
| --- | --- | --- |
| [out] | `fast_ap_info` | 已连接 AP 信息，`FAST_WF_CONNECTED_AP_INFO_T`。 |

:::note
该函数会分配 `fast_ap_info`。配合 `tkl_wifi_station_fast_connect` 可加快重启后的重连。
:::

## tkl_wifi_get_bssid

```c
OPERATE_RET tkl_wifi_get_bssid(uint8_t *mac);
```

获取已连接 AP 的 BSSID（MAC 地址）。

参数：

| 输入/输出 | 参数名 | 描述 |
| --- | --- | --- |
| [out] | `mac` | 接收 BSSID 的 6 字节缓冲区。 |

## tkl_wifi_set_country_code

```c
OPERATE_RET tkl_wifi_set_country_code(const COUNTRY_CODE_E ccode);
```

设置射频国家码，决定允许使用的信道列表。

参数：

| 输入/输出 | 参数名 | 描述 |
| --- | --- | --- |
| [in] | `ccode` | 国家码，`COUNTRY_CODE_E`。 |

| `COUNTRY_CODE_E` | 区域 | 信道 |
| --- | --- | --- |
| `COUNTRY_CODE_CN` | 中国 | 1–13 |
| `COUNTRY_CODE_US` | 美国 | 1–11 |
| `COUNTRY_CODE_JP` | 日本 | 1–14 |
| `COUNTRY_CODE_EU` | 欧洲 | 1–13 |

## tkl_wifi_set_rf_calibrated

```c
OPERATE_RET tkl_wifi_set_rf_calibrated(void);
```

执行 Wi-Fi 射频校准，在 Wi-Fi 产测时调用。

返回值：

成功时返回 `OPRT_OK`，其他值表示错误，请参见 `tuya_error_code.h`。

## tkl_wifi_set_lp_mode

```c
OPERATE_RET tkl_wifi_set_lp_mode(const BOOL_T enable, const uint8_t dtim);
```

开启或关闭 Wi-Fi 低功耗模式。

参数：

| 输入/输出 | 参数名 | 描述 |
| --- | --- | --- |
| [in] | `enable` | `TRUE` 开启低功耗模式，`FALSE` 关闭。 |
| [in] | `dtim` | DTIM 间隔。 |

## tkl_wifi_station_fast_connect

```c
OPERATE_RET tkl_wifi_station_fast_connect(const FAST_WF_CONNECTED_AP_INFO_T *fast_ap_info);
```

使用缓存的 AP 信息连接路由器，实现更快的连接。

参数：

| 输入/输出 | 参数名 | 描述 |
| --- | --- | --- |
| [in] | `fast_ap_info` | 来自 `tkl_wifi_get_connected_ap_info` 的缓存 AP 信息。 |

:::note
用于配网并重启后的首次连接。
:::

## tkl_wifi_station_connect

```c
OPERATE_RET tkl_wifi_station_connect(const int8_t *ssid, const int8_t *passwd);
```

将 station 连接到路由器。

参数：

| 输入/输出 | 参数名 | 描述 |
| --- | --- | --- |
| [in] | `ssid` | 要连接的 SSID。 |
| [in] | `passwd` | 密码。 |

:::note
非阻塞。连接启动后，轮询 `tkl_wifi_station_get_status` 跟踪进度。
:::

## tkl_wifi_station_disconnect

```c
OPERATE_RET tkl_wifi_station_disconnect(void);
```

断开 station 与路由器的连接。

## tkl_wifi_station_get_conn_ap_rssi

```c
OPERATE_RET tkl_wifi_station_get_conn_ap_rssi(int8_t *rssi);
```

获取已连接 AP 的信号强度（RSSI）。

参数：

| 输入/输出 | 参数名 | 描述 |
| --- | --- | --- |
| [out] | `rssi` | RSSI 值。 |

## tkl_wifi_station_get_status

```c
OPERATE_RET tkl_wifi_station_get_status(WF_STATION_STAT_E *stat);
```

获取当前 station 连接状态。

参数：

| 输入/输出 | 参数名 | 描述 |
| --- | --- | --- |
| [out] | `stat` | station 状态，`WF_STATION_STAT_E`。 |

## tkl_wifi_send_mgnt

```c
OPERATE_RET tkl_wifi_send_mgnt(const uint8_t *buf, const uint32_t len);
```

发送 Wi-Fi 管理帧。

参数：

| 输入/输出 | 参数名 | 描述 |
| --- | --- | --- |
| [in] | `buf` | 管理帧缓冲区。 |
| [in] | `len` | 缓冲区长度。 |

## tkl_wifi_register_recv_mgnt_callback

```c
OPERATE_RET tkl_wifi_register_recv_mgnt_callback(const BOOL_T enable, const WIFI_REV_MGNT_CB recv_cb);
```

开启或关闭将接收到的管理帧回调给应用层。

参数：

| 输入/输出 | 参数名 | 描述 |
| --- | --- | --- |
| [in] | `enable` | `TRUE` 开启管理帧接收，`FALSE` 关闭。 |
| [in] | `recv_cb` | 接收回调，`WIFI_REV_MGNT_CB`。 |

回调函数签名如下：

```c
typedef void (*WIFI_REV_MGNT_CB)(uint8_t *buf, uint32_t len);
```

## tkl_wifi_ioctl

```c
OPERATE_RET tkl_wifi_ioctl(WF_IOCTL_CMD_E cmd, void *args);
```

下发驱动相关的控制命令。

参数：

| 输入/输出 | 参数名 | 描述 |
| --- | --- | --- |
| [in] | `cmd` | 命令，`WF_IOCTL_CMD_E`。 |
| [in] | `args` | 与命令相关的参数。 |

| `WF_IOCTL_CMD_E` | 描述 |
| --- | --- |
| `WFI_BEACON_CMD` | 配置 beacon 厂商自定义信息元素。 |
| `WFI_GET_LAST_DISCONN_REASON` | 获取最后一次断连原因，`WF_DISCONN_REASON_E`。 |
| `WFI_AP_GET_STALIST_CMD` | 获取 soft-AP 的 station 列表，`WF_STA_LIST_S`。 |
| `WFI_CONNECT_CMD` | 使用 `WF_IOCTL_CONN_T` 发起连接。 |
