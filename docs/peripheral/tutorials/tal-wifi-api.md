---
title: "TAL Wi-Fi API Reference"
---

# TAL Wi-Fi API Reference

The TAL Wi-Fi API (`tal_wifi.h`) provides a platform-independent interface for Wi-Fi station and AP operations. It wraps the TKL Wi-Fi adapter, which in turn calls the platform's Wi-Fi driver (ESP-IDF, T5AI SDK, Linux, etc.).

Header: `#include "tal_wifi.h"`

## Initialization

### tal_wifi_init

Initialize the Wi-Fi subsystem and register the event callback.

```c
OPERATE_RET tal_wifi_init(WIFI_EVENT_CB cb);
```

| Parameter | Direction | Type | Description |
|-----------|-----------|------|-------------|
| cb | in | `WIFI_EVENT_CB` | Callback invoked on Wi-Fi events (connect, disconnect, IP obtained) |

**Return:** `OPRT_OK` on success.

Call this once at startup before any other Wi-Fi operation.

## Scanning

### tal_wifi_all_ap_scan

Scan all visible access points.

```c
OPERATE_RET tal_wifi_all_ap_scan(AP_IF_S **ap_ary, uint32_t *num);
```

| Parameter | Direction | Type | Description |
|-----------|-----------|------|-------------|
| ap_ary | out | `AP_IF_S **` | Pointer to the AP info array (allocated by the function) |
| num | out | `uint32_t *` | Number of APs found |

**Return:** `OPRT_OK` on success. Caller must free the result with `tal_wifi_release_ap()`.

### tal_wifi_assign_ap_scan

Scan for a specific SSID.

```c
OPERATE_RET tal_wifi_assign_ap_scan(int8_t *ssid, AP_IF_S **ap);
```

### tal_wifi_release_ap

Free the memory allocated by scan functions.

```c
OPERATE_RET tal_wifi_release_ap(AP_IF_S *ap);
```

## Station Connection

### tal_wifi_station_connect

Connect to an access point.

```c
OPERATE_RET tal_wifi_station_connect(int8_t *ssid, int8_t *passwd);
```

| Parameter | Direction | Type | Description |
|-----------|-----------|------|-------------|
| ssid | in | `int8_t *` | SSID to connect to |
| passwd | in | `int8_t *` | Password (NULL or empty for open networks) |

### tal_wifi_station_disconnect

Disconnect from the current access point.

```c
OPERATE_RET tal_wifi_station_disconnect(void);
```

### tal_fast_station_connect

Reconnect using cached AP info (channel, BSSID) to skip scanning.

```c
OPERATE_RET tal_fast_station_connect(FAST_WF_CONNECTED_AP_INFO_T *fast_ap_info);
```

### tal_wifi_get_connected_ap_info

Get cached AP info for subsequent fast connects.

```c
OPERATE_RET tal_wifi_get_connected_ap_info(FAST_WF_CONNECTED_AP_INFO_T **fast_ap_info);
```

### tal_wifi_station_get_status

Get current station connection status.

```c
OPERATE_RET tal_wifi_station_get_status(WF_STATION_STAT_E *stat);
```

Status values include: `WSS_IDLE`, `WSS_CONNECTING`, `WSS_PASSWD_WRONG`, `WSS_NO_AP_FOUND`, `WSS_CONN_FAIL`, `WSS_CONN_SUCCESS`, `WSS_GOT_IP`.

### tal_wifi_station_get_conn_ap_rssi

Get signal strength of the connected AP.

```c
OPERATE_RET tal_wifi_station_get_conn_ap_rssi(int8_t *rssi);
```

Returns RSSI in dBm (negative value; e.g., -45 is strong, -80 is weak).

### tal_wifi_station_get_err_stat

Get error status after a failed connection attempt.

```c
OPERATE_RET tal_wifi_station_get_err_stat(WF_STATION_STAT_E *stat);
```

## Soft AP

### tal_wifi_ap_start

Start a soft access point.

```c
OPERATE_RET tal_wifi_ap_start(WF_AP_CFG_IF_S *cfg);
```

The config struct includes SSID, password, channel, encryption type, and max stations.

:::note ESP32 Limitation
`tal_wifi_ap_stop()` on ESP32 is currently incomplete (returns `OPRT_OK` but does not fully tear down the AP). Switching from AP to STA mode may require a device restart.
:::

### tal_wifi_ap_stop

Stop the soft access point.

```c
OPERATE_RET tal_wifi_ap_stop(void);
```

## Network Configuration

### tal_wifi_get_ip / tal_wifi_set_ip

Get or set the IP configuration for station or AP interface.

```c
OPERATE_RET tal_wifi_get_ip(WF_IF_E wf, NW_IP_S *ip);
OPERATE_RET tal_wifi_set_ip(WF_IF_E wf, NW_IP_S *ip);
```

`WF_IF_E` is `WF_STATION` or `WF_AP`. `NW_IP_S` contains `ip`, `mask`, `gw` as strings.

### tal_wifi_get_mac / tal_wifi_set_mac

Get or set the MAC address.

```c
OPERATE_RET tal_wifi_get_mac(WF_IF_E wf, NW_MAC_S *mac);
OPERATE_RET tal_wifi_set_mac(WF_IF_E wf, NW_MAC_S *mac);
```

### tal_wifi_get_bssid

Get the BSSID of the connected AP.

```c
OPERATE_RET tal_wifi_get_bssid(uint8_t *mac);
```

:::warning ESP32
On ESP32, this function may return `OPRT_OK` without filling the buffer. Verify the output.
:::

## Channel and Mode

### tal_wifi_set_cur_channel / tal_wifi_get_cur_channel

```c
OPERATE_RET tal_wifi_set_cur_channel(uint8_t chan);
OPERATE_RET tal_wifi_get_cur_channel(uint8_t *chan);
```

### tal_wifi_set_work_mode / tal_wifi_get_work_mode

```c
OPERATE_RET tal_wifi_set_work_mode(WF_WK_MD_E mode);
OPERATE_RET tal_wifi_get_work_mode(WF_WK_MD_E *mode);
```

Modes: `WWM_STATION`, `WWM_SOFTAP`, `WWM_STATIONAP`.

### tal_wifi_set_country_code

Set the Wi-Fi regulatory country code.

```c
OPERATE_RET tal_wifi_set_country_code(char *country_code);
```

Supported: `"CN"`, `"US"`, `"JP"`, `"EU"`.

## Sniffer Mode

### tal_wifi_sniffer_set

Enable or disable promiscuous (sniffer) mode.

```c
OPERATE_RET tal_wifi_sniffer_set(BOOL_T en, SNIFFER_CALLBACK cb);
```

When enabled, raw 802.11 frames are delivered to the callback. Used for Tuya's SmartConfig provisioning.

## Management Frames

### tal_wifi_send_mgnt

Send a raw management frame.

```c
OPERATE_RET tal_wifi_send_mgnt(uint8_t *buf, uint32_t len);
```

### tal_wifi_register_recv_mgnt_callback

Register a callback for received management frames.

```c
OPERATE_RET tal_wifi_register_recv_mgnt_callback(BOOL_T enable, WIFI_REV_MGNT_CB recv_cb);
```

## Power Management

### tal_wifi_lp_enable / tal_wifi_lp_disable

Enable or disable Wi-Fi low-power mode.

```c
OPERATE_RET tal_wifi_lp_enable(void);
OPERATE_RET tal_wifi_lp_disable(void);
```

### tal_wifi_set_lps_dtim

Set the DTIM interval for low-power mode.

```c
void tal_wifi_set_lps_dtim(uint32_t dtim);
```

Call before entering low-power mode.

## Other

### tal_wifi_rf_calibrated

Check if Wi-Fi RF calibration has been performed.

```c
BOOL_T tal_wifi_rf_calibrated(void);
```

### tal_wifi_ioctl

Platform-specific Wi-Fi control.

```c
OPERATE_RET tal_wifi_ioctl(WF_IOCTL_CMD_E cmd, void *args);
```

:::note
Returns `OPRT_NOT_SUPPORTED` on ESP32.
:::

## Usage Example

```c
#include "tal_wifi.h"
#include "tal_log.h"

static void wifi_event_cb(void *arg)
{
    WF_STATION_STAT_E stat;
    tal_wifi_station_get_status(&stat);
    if (stat == WSS_GOT_IP) {
        NW_IP_S ip;
        tal_wifi_get_ip(WF_STATION, &ip);
        TAL_PR_INFO("connected, IP: %s", ip.ip);
    }
}

void connect(void)
{
    tal_wifi_init(wifi_event_cb);
    tal_wifi_station_connect((int8_t *)"MySSID", (int8_t *)"MyPassword");
}
```

## References

- [Wi-Fi Station Tutorial](wifi-station-tutorial)
- [TKL Wi-Fi API](/docs/tkl-api/tkl_wifi)
- [Wi-Fi examples](https://github.com/tuya/TuyaOpen/tree/master/examples/wifi)
- [ESP32 Wi-Fi Notes](../../hardware-specific/espressif/overview-esp32)
