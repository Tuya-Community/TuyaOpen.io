---
title: "TAL Wi-Fi API 参考"
---

TAL Wi-Fi API（`tal_wifi.h`）为 Wi-Fi station 与 AP 操作提供平台无关接口。它封装 TKL Wi-Fi 适配层，后者再调用各平台的 Wi-Fi 驱动（ESP-IDF、T5AI SDK、Linux 等）。

头文件：`#include "tal_wifi.h"`。除特别说明外，函数均返回 `OPERATE_RET`（成功为 `OPRT_OK`）。

## 初始化

### tal_wifi_init

初始化 Wi-Fi 子系统并注册事件回调。

```c
OPERATE_RET tal_wifi_init(WIFI_EVENT_CB cb);
```

| 参数 | 方向 | 类型 | 说明 |
|-----------|-----------|------|-------------|
| cb | in | `WIFI_EVENT_CB` | Wi-Fi 事件（连接、断开、获取 IP 等）回调 |

**返回：** 成功返回 `OPRT_OK`。

在调用任何其他 Wi-Fi 操作前，于启动时调用一次。

## 扫描

### tal_wifi_all_ap_scan

扫描所有可见的接入点。

```c
OPERATE_RET tal_wifi_all_ap_scan(AP_IF_S **ap_ary, uint32_t *num);
```

| 参数 | 方向 | 类型 | 说明 |
|-----------|-----------|------|-------------|
| ap_ary | out | `AP_IF_S **` | AP 信息数组指针（由函数分配） |
| num | out | `uint32_t *` | 扫描到的 AP 数量 |

**返回：** 成功返回 `OPRT_OK`。调用方须用 `tal_wifi_release_ap()` 释放结果。

### tal_wifi_assign_ap_scan

扫描指定 SSID。

```c
OPERATE_RET tal_wifi_assign_ap_scan(int8_t *ssid, AP_IF_S **ap);
```

### tal_wifi_release_ap

释放扫描函数分配的内存。

```c
OPERATE_RET tal_wifi_release_ap(AP_IF_S *ap);
```

## Station 连接

### tal_wifi_station_connect

连接到接入点。

```c
OPERATE_RET tal_wifi_station_connect(int8_t *ssid, int8_t *passwd);
```

| 参数 | 方向 | 类型 | 说明 |
|-----------|-----------|------|-------------|
| ssid | in | `int8_t *` | 要连接的 SSID |
| passwd | in | `int8_t *` | 密码（开放网络可传 NULL 或空字符串） |

### tal_wifi_station_disconnect

从当前接入点断开。

```c
OPERATE_RET tal_wifi_station_disconnect(void);
```

### tal_fast_station_connect

使用缓存的 AP 信息（信道、BSSID）重连，跳过扫描。

```c
OPERATE_RET tal_fast_station_connect(FAST_WF_CONNECTED_AP_INFO_T *fast_ap_info);
```

### tal_wifi_get_connected_ap_info

获取缓存的 AP 信息，供后续快速连接使用。

```c
OPERATE_RET tal_wifi_get_connected_ap_info(FAST_WF_CONNECTED_AP_INFO_T **fast_ap_info);
```

### tal_wifi_station_get_status

获取当前 station 连接状态。

```c
OPERATE_RET tal_wifi_station_get_status(WF_STATION_STAT_E *stat);
```

状态取值包括：`WSS_IDLE`、`WSS_CONNECTING`、`WSS_PASSWD_WRONG`、`WSS_NO_AP_FOUND`、`WSS_CONN_FAIL`、`WSS_CONN_SUCCESS`、`WSS_GOT_IP`。

### tal_wifi_station_get_conn_ap_rssi

获取已连接 AP 的信号强度。

```c
OPERATE_RET tal_wifi_station_get_conn_ap_rssi(int8_t *rssi);
```

返回 RSSI，单位 dBm（负值；例如 -45 较强，-80 较弱）。

### tal_wifi_station_get_err_stat

连接失败后获取错误状态。

```c
OPERATE_RET tal_wifi_station_get_err_stat(WF_STATION_STAT_E *stat);
```

## 软 AP

### tal_wifi_ap_start

启动软 AP。

```c
OPERATE_RET tal_wifi_ap_start(WF_AP_CFG_IF_S *cfg);
```

配置结构体包含 SSID、密码、信道、加密类型与最大接入数。

:::note ESP32 限制
ESP32 上 `tal_wifi_ap_stop()` 当前实现不完整（返回 `OPRT_OK`，但未完全拆除 AP）。从 AP 切换到 STA 模式可能需要重启设备。
:::

### tal_wifi_ap_stop

停止软 AP。

```c
OPERATE_RET tal_wifi_ap_stop(void);
```

## 网络配置

### tal_wifi_get_ip / tal_wifi_set_ip

获取或设置 station 或 AP 接口的 IP 配置。

```c
OPERATE_RET tal_wifi_get_ip(WF_IF_E wf, NW_IP_S *ip);
OPERATE_RET tal_wifi_set_ip(WF_IF_E wf, NW_IP_S *ip);
```

`WF_IF_E` 取值为 `WF_STATION` 或 `WF_AP`。`NW_IP_S` 以字符串形式包含 `ip`、`mask`、`gw`。

### tal_wifi_get_mac / tal_wifi_set_mac

获取或设置 MAC 地址。

```c
OPERATE_RET tal_wifi_get_mac(WF_IF_E wf, NW_MAC_S *mac);
OPERATE_RET tal_wifi_set_mac(WF_IF_E wf, NW_MAC_S *mac);
```

### tal_wifi_get_bssid

获取已连接 AP 的 BSSID。

```c
OPERATE_RET tal_wifi_get_bssid(uint8_t *mac);
```

:::warning ESP32
ESP32 上此函数可能返回 `OPRT_OK` 但未填充缓冲区。请校验输出。
:::

## 信道与模式

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

模式：`WWM_STATION`、`WWM_SOFTAP`、`WWM_STATIONAP`。

### tal_wifi_set_country_code

设置 Wi-Fi 监管区域国家码。

```c
OPERATE_RET tal_wifi_set_country_code(char *country_code);
```

支持：`"CN"`、`"US"`、`"JP"`、`"EU"`。

## 嗅探模式

### tal_wifi_sniffer_set

启用或禁用混杂（嗅探）模式。

```c
OPERATE_RET tal_wifi_sniffer_set(BOOL_T en, SNIFFER_CALLBACK cb);
```

启用后，原始 802.11 帧通过回调上报。用于 Tuya 的 SmartConfig 配网。

## 管理帧

### tal_wifi_send_mgnt

发送原始管理帧。

```c
OPERATE_RET tal_wifi_send_mgnt(uint8_t *buf, uint32_t len);
```

### tal_wifi_register_recv_mgnt_callback

注册接收管理帧的回调。

```c
OPERATE_RET tal_wifi_register_recv_mgnt_callback(BOOL_T enable, WIFI_REV_MGNT_CB recv_cb);
```

## 电源管理

### tal_wifi_lp_enable / tal_wifi_lp_disable

启用或禁用 Wi-Fi 低功耗模式。

```c
OPERATE_RET tal_wifi_lp_enable(void);
OPERATE_RET tal_wifi_lp_disable(void);
```

### tal_wifi_set_lps_dtim

设置低功耗模式下的 DTIM 间隔。

```c
void tal_wifi_set_lps_dtim(uint32_t dtim);
```

在进入低功耗模式前调用。

## 其他

### tal_wifi_rf_calibrated

检查是否已执行 Wi-Fi RF 校准。

```c
BOOL_T tal_wifi_rf_calibrated(void);
```

### tal_wifi_ioctl

平台相关的 Wi-Fi 控制。

```c
OPERATE_RET tal_wifi_ioctl(WF_IOCTL_CMD_E cmd, void *args);
```

:::note
ESP32 上返回 `OPRT_NOT_SUPPORTED`。
:::

## 用法示例

```c
#include "tal_wifi.h"
#include "tal_log.h"

static void wifi_event_cb(WF_EVENT_E event, void *arg)
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

## 相关文档

- [Wi-Fi Station 教程](wifi-station-tutorial)
- [TAL Network API 参考](tal-network-api)
- [TKL Wi-Fi API](/docs/tkl-api/tkl_wifi)
- [Wi-Fi 示例](https://github.com/tuya/TuyaOpen/tree/master/examples/wifi)
- [ESP32 Wi-Fi 说明](../../hardware/espressif/overview-esp32)
