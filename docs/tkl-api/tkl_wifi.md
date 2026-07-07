---
title: tkl_wifi | Wi-Fi Driver
description: "tkl_wifi reference — TuyaOpen Wi-Fi driver TKL API for station/soft-AP, scan, connect, channel, MAC/IP, sniffer, and low-power for porting/platform adaptation."
keywords:
  - tkl_wifi
  - tuyaopen wifi driver
  - tkl wifi api
  - embedded wifi driver
---

`tkl_wifi` adapts a platform's Wi-Fi driver to TuyaOS. It covers station and soft-AP operation: initialization, scanning, connecting, channel and country-code control, MAC and IP management, sniffer and management-frame capture, low-power mode, and fast connect. The implementation lives in `tkl_wifi.c`, which TuyaOS generates with marked regions for your platform code.

Unless noted otherwise, every function returns `OPRT_OK` on success and another value on error; see `tuya_error_code.h` for the error codes.

## Key types

The interface mode selects which logical Wi-Fi interface an API acts on:

| `WF_IF_E` | Description |
| --- | --- |
| `WF_STATION` | Station (client) interface. |
| `WF_AP` | Soft-AP interface. |

The work mode selects how the Wi-Fi subsystem runs:

| `WF_WK_MD_E` | Description |
| --- | --- |
| `WWM_POWERDOWN` | Powered down (Wi-Fi module off). |
| `WWM_SNIFFER` | Sniffer (monitor) mode. |
| `WWM_STATION` | Station mode. |
| `WWM_SOFTAP` | Soft-AP mode. |
| `WWM_STATIONAP` | Concurrent station and soft-AP. |
| `WWM_UNKNOWN` | Unknown mode. |

The station status reports the connection progress:

| `WF_STATION_STAT_E` | Description |
| --- | --- |
| `WSS_IDLE` | Not connected. |
| `WSS_CONNECTING` | Connecting. |
| `WSS_PASSWD_WRONG` | Password does not match. |
| `WSS_NO_AP_FOUND` | AP not found. |
| `WSS_CONN_FAIL` | Connection failed. |
| `WSS_CONN_SUCCESS` | Connected to the AP. |
| `WSS_GOT_IP` | IP address acquired. |
| `WSS_DHCP_FAIL` | DHCP failed. |

## tkl_wifi_init

```c
OPERATE_RET tkl_wifi_init(WIFI_EVENT_CB cb);
```

Initializes the Wi-Fi subsystem and registers the event callback.

Parameters:

| Input/Output | Name | Description |
| --- | --- | --- |
| [in] | `cb` | The Wi-Fi event callback, `WIFI_EVENT_CB`. |

The callback has the following signature, where `event` is a `WF_EVENT_E` (`WFE_CONNECTED`, `WFE_CONNECT_FAILED`, `WFE_DISCONNECTED`):

```c
typedef void (*WIFI_EVENT_CB)(WF_EVENT_E event, void *arg);
```

## tkl_wifi_scan_ap

```c
OPERATE_RET tkl_wifi_scan_ap(const int8_t *ssid, AP_IF_S **ap_ary, uint32_t *num);
```

Scans the environment and returns the APs found.

Parameters:

| Input/Output | Name | Description |
| --- | --- | --- |
| [in] | `ssid` | The SSID to scan for. If `NULL`, scans all APs; otherwise scans the specified SSID. |
| [out] | `ap_ary` | The array of scanned AP information, `AP_IF_S`. |
| [out] | `num` | The number of APs in `ap_ary`. |

:::note
This function allocates the result memory and is blocking. Release the result with `tkl_wifi_release_ap` when you no longer need it. It scans only the channels of the current country code.
:::

## tkl_wifi_release_ap

```c
OPERATE_RET tkl_wifi_release_ap(AP_IF_S *ap);
```

Releases the AP information allocated by `tkl_wifi_scan_ap`.

Parameters:

| Input/Output | Name | Description |
| --- | --- | --- |
| [in] | `ap` | The AP information to release. |

## tkl_wifi_start_ap

```c
OPERATE_RET tkl_wifi_start_ap(const WF_AP_CFG_IF_S *cfg);
```

Starts soft-AP mode with the given configuration.

Parameters:

| Input/Output | Name | Description |
| --- | --- | --- |
| [in] | `cfg` | The soft-AP configuration, `WF_AP_CFG_IF_S`. |

`WF_AP_CFG_IF_S` carries the SSID, password, channel, encryption mode (`md`, a `WF_AP_AUTH_MODE_E`), hidden flag, maximum connections (`max_conn`), broadcast interval, and the AP-mode IP information:

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

Stops soft-AP mode.

## tkl_wifi_set_cur_channel

```c
OPERATE_RET tkl_wifi_set_cur_channel(const uint8_t chan);
```

Sets the working channel of the Wi-Fi interface.

Parameters:

| Input/Output | Name | Description |
| --- | --- | --- |
| [in] | `chan` | The channel to set. |

:::note
Setting a channel outside the current country-code channel range fails. Setting the channel from inside the sniffer callback is supported.
:::

## tkl_wifi_get_cur_channel

```c
OPERATE_RET tkl_wifi_get_cur_channel(uint8_t *chan);
```

Gets the current working channel.

Parameters:

| Input/Output | Name | Description |
| --- | --- | --- |
| [out] | `chan` | The current channel. |

## tkl_wifi_set_sniffer

```c
OPERATE_RET tkl_wifi_set_sniffer(const BOOL_T en, const SNIFFER_CALLBACK cb);
```

Enables or disables sniffer mode. While enabled, the driver delivers each captured frame to `cb`.

Parameters:

| Input/Output | Name | Description |
| --- | --- | --- |
| [in] | `en` | `TRUE` to enable sniffer mode, `FALSE` to disable it. |
| [in] | `cb` | The capture callback, `SNIFFER_CALLBACK`. |

The callback has the following signature:

```c
typedef void (*SNIFFER_CALLBACK)(const uint8_t *buf, const uint16_t len, const int8_t rssi);
```

## tkl_wifi_get_ip

```c
OPERATE_RET tkl_wifi_get_ip(const WF_IF_E wf, NW_IP_S *ip);
```

Gets the IPv4 address, gateway, and subnet mask of the given interface.

Parameters:

| Input/Output | Name | Description |
| --- | --- | --- |
| [in] | `wf` | The Wi-Fi interface, `WF_IF_E`. |
| [out] | `ip` | The IP information, `NW_IP_S`. |

:::note
In station+AP mode the device has two IPs; pass `wf` to select which interface to read.
:::

## tkl_wifi_get_ipv6

```c
OPERATE_RET tkl_wifi_get_ipv6(const WF_IF_E wf, NW_IP_TYPE type, NW_IP_S *ip);
```

Gets an IPv6 address of the given interface.

Parameters:

| Input/Output | Name | Description |
| --- | --- | --- |
| [in] | `wf` | The Wi-Fi interface, `WF_IF_E`. |
| [in] | `type` | The IPv6 address type to read, `NW_IP_TYPE`. |
| [out] | `ip` | The IP information, `NW_IP_S`. |

## tkl_wifi_set_ip

```c
OPERATE_RET tkl_wifi_set_ip(const WF_IF_E wf, NW_IP_S *ip);
```

Sets a static IPv4 address, gateway, and subnet mask on the given interface.

Parameters:

| Input/Output | Name | Description |
| --- | --- | --- |
| [in] | `wf` | The Wi-Fi interface, `WF_IF_E`. |
| [in] | `ip` | The IP information to set, `NW_IP_S`. |

## tkl_wifi_set_mac

```c
OPERATE_RET tkl_wifi_set_mac(const WF_IF_E wf, const NW_MAC_S *mac);
```

Sets the MAC address of the given interface.

Parameters:

| Input/Output | Name | Description |
| --- | --- | --- |
| [in] | `wf` | The Wi-Fi interface, `WF_IF_E`. |
| [in] | `mac` | The MAC address to set, `NW_MAC_S`. |

## tkl_wifi_get_mac

```c
OPERATE_RET tkl_wifi_get_mac(const WF_IF_E wf, NW_MAC_S *mac);
```

Gets the MAC address of the given interface.

Parameters:

| Input/Output | Name | Description |
| --- | --- | --- |
| [in] | `wf` | The Wi-Fi interface, `WF_IF_E`. |
| [out] | `mac` | The MAC address, `NW_MAC_S`. |

## tkl_wifi_set_work_mode

```c
OPERATE_RET tkl_wifi_set_work_mode(const WF_WK_MD_E mode);
```

Sets the Wi-Fi work mode.

Parameters:

| Input/Output | Name | Description |
| --- | --- | --- |
| [in] | `mode` | The work mode, `WF_WK_MD_E`. |

## tkl_wifi_get_work_mode

```c
OPERATE_RET tkl_wifi_get_work_mode(WF_WK_MD_E *mode);
```

Gets the current Wi-Fi work mode.

Parameters:

| Input/Output | Name | Description |
| --- | --- | --- |
| [out] | `mode` | The work mode, `WF_WK_MD_E`. |

## tkl_wifi_get_connected_ap_info

```c
OPERATE_RET tkl_wifi_get_connected_ap_info(FAST_WF_CONNECTED_AP_INFO_T **fast_ap_info);
```

Gets the information of the currently connected AP, for use with the fast-connect feature.

Parameters:

| Input/Output | Name | Description |
| --- | --- | --- |
| [out] | `fast_ap_info` | The connected-AP information, `FAST_WF_CONNECTED_AP_INFO_T`. |

:::note
This function allocates `fast_ap_info`. Pair it with `tkl_wifi_station_fast_connect` to speed up reconnection after a restart.
:::

## tkl_wifi_get_bssid

```c
OPERATE_RET tkl_wifi_get_bssid(uint8_t *mac);
```

Gets the BSSID (MAC address) of the connected AP.

Parameters:

| Input/Output | Name | Description |
| --- | --- | --- |
| [out] | `mac` | A 6-byte buffer receiving the BSSID. |

## tkl_wifi_set_country_code

```c
OPERATE_RET tkl_wifi_set_country_code(const COUNTRY_CODE_E ccode);
```

Sets the regulatory country code, which determines the allowed channel list.

Parameters:

| Input/Output | Name | Description |
| --- | --- | --- |
| [in] | `ccode` | The country code, `COUNTRY_CODE_E`. |

| `COUNTRY_CODE_E` | Region | Channels |
| --- | --- | --- |
| `COUNTRY_CODE_CN` | China | 1–13 |
| `COUNTRY_CODE_US` | United States | 1–11 |
| `COUNTRY_CODE_JP` | Japan | 1–14 |
| `COUNTRY_CODE_EU` | Europe | 1–13 |

## tkl_wifi_set_rf_calibrated

```c
OPERATE_RET tkl_wifi_set_rf_calibrated(void);
```

Performs Wi-Fi RF calibration. Called during Wi-Fi production testing.

Return value:

`OPRT_OK` on success. Other values indicate an error; see `tuya_error_code.h`.

## tkl_wifi_set_lp_mode

```c
OPERATE_RET tkl_wifi_set_lp_mode(const BOOL_T enable, const uint8_t dtim);
```

Enables or disables Wi-Fi low-power mode.

Parameters:

| Input/Output | Name | Description |
| --- | --- | --- |
| [in] | `enable` | `TRUE` to enable low-power mode, `FALSE` to disable it. |
| [in] | `dtim` | The DTIM interval. |

## tkl_wifi_station_fast_connect

```c
OPERATE_RET tkl_wifi_station_fast_connect(const FAST_WF_CONNECTED_AP_INFO_T *fast_ap_info);
```

Connects to a router using cached AP information for a faster connection.

Parameters:

| Input/Output | Name | Description |
| --- | --- | --- |
| [in] | `fast_ap_info` | The cached AP information from `tkl_wifi_get_connected_ap_info`. |

:::note
Used for the first connection after pairing and a device restart.
:::

## tkl_wifi_station_connect

```c
OPERATE_RET tkl_wifi_station_connect(const int8_t *ssid, const int8_t *passwd);
```

Connects the station to a router.

Parameters:

| Input/Output | Name | Description |
| --- | --- | --- |
| [in] | `ssid` | The SSID to connect to. |
| [in] | `passwd` | The password. |

:::note
Non-blocking. After the connection starts, poll `tkl_wifi_station_get_status` to follow progress.
:::

## tkl_wifi_station_disconnect

```c
OPERATE_RET tkl_wifi_station_disconnect(void);
```

Disconnects the station from the router.

## tkl_wifi_station_get_conn_ap_rssi

```c
OPERATE_RET tkl_wifi_station_get_conn_ap_rssi(int8_t *rssi);
```

Gets the signal strength (RSSI) of the connected AP.

Parameters:

| Input/Output | Name | Description |
| --- | --- | --- |
| [out] | `rssi` | The RSSI value. |

## tkl_wifi_station_get_status

```c
OPERATE_RET tkl_wifi_station_get_status(WF_STATION_STAT_E *stat);
```

Gets the current station connection status.

Parameters:

| Input/Output | Name | Description |
| --- | --- | --- |
| [out] | `stat` | The station status, `WF_STATION_STAT_E`. |

## tkl_wifi_send_mgnt

```c
OPERATE_RET tkl_wifi_send_mgnt(const uint8_t *buf, const uint32_t len);
```

Sends a Wi-Fi management frame.

Parameters:

| Input/Output | Name | Description |
| --- | --- | --- |
| [in] | `buf` | The management-frame buffer. |
| [in] | `len` | The buffer length. |

## tkl_wifi_register_recv_mgnt_callback

```c
OPERATE_RET tkl_wifi_register_recv_mgnt_callback(const BOOL_T enable, const WIFI_REV_MGNT_CB recv_cb);
```

Enables or disables delivery of received management frames to a callback.

Parameters:

| Input/Output | Name | Description |
| --- | --- | --- |
| [in] | `enable` | `TRUE` to enable management-frame reception, `FALSE` to disable it. |
| [in] | `recv_cb` | The receive callback, `WIFI_REV_MGNT_CB`. |

The callback has the following signature:

```c
typedef void (*WIFI_REV_MGNT_CB)(uint8_t *buf, uint32_t len);
```

## tkl_wifi_ioctl

```c
OPERATE_RET tkl_wifi_ioctl(WF_IOCTL_CMD_E cmd, void *args);
```

Issues a driver-specific control command.

Parameters:

| Input/Output | Name | Description |
| --- | --- | --- |
| [in] | `cmd` | The command, `WF_IOCTL_CMD_E`. |
| [in] | `args` | The arguments associated with the command. |

| `WF_IOCTL_CMD_E` | Description |
| --- | --- |
| `WFI_BEACON_CMD` | Configure beacon vendor-specific information element. |
| `WFI_GET_LAST_DISCONN_REASON` | Get the last disconnect reason, `WF_DISCONN_REASON_E`. |
| `WFI_AP_GET_STALIST_CMD` | Get the soft-AP station list, `WF_STA_LIST_S`. |
| `WFI_CONNECT_CMD` | Connect using `WF_IOCTL_CONN_T`. |
