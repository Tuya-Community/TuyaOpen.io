---
title: TAL Bluetooth API 参考
---

## 概述

`tal_bluetooth.h` 提供 TuyaOpen **TAL** 层蓝牙接口：协议栈初始化、广播、扫描、连接、类 GATT 数据收发与 MTU 协商。事件通过 `tal_ble_bt_init` 注册的回调上报。`TAL_BLE_ADV_PARAMS_T` 等类型定义见 `tal_bluetooth_def.h`。

**读者：** 在支持平台上开发 BLE 主机或从机功能的开发者。

## 返回值

函数返回 `OPERATE_RET`（成功一般为 `OPRT_OK`）。RSSI、连接参数更新等部分结果也会通过异步事件上报。

## 初始化与地址

| 函数 | 说明 |
|----------|-------------|
| `tal_ble_bt_init(TAL_BLE_ROLE_E role, const TAL_BLE_EVT_FUNC_CB ble_event)` | 按角色初始化蓝牙并注册事件回调。 |
| `tal_ble_bt_deinit(TAL_BLE_ROLE_E role)` | 去初始化（可指定角色）。 |
| `tal_ble_address_set(TAL_BLE_ADDR_T const *p_addr)` | 设置本地地址。 |
| `tal_ble_address_get(TAL_BLE_ADDR_T *p_addr)` | 读取本地地址。 |
| `tal_ble_bt_link_max(uint16_t *p_maxlink)` | 查询最大链路数或与 MTU 相关的平台限制。 |

## 广播（从机）

| 函数 | 说明 |
|----------|-------------|
| `tal_ble_advertising_start(TAL_BLE_ADV_PARAMS_T const *p_adv_param)` | 开始广播。 |
| `tal_ble_advertising_data_set(TAL_BLE_DATA_T *p_adv, TAL_BLE_DATA_T *p_scan_rsp)` | 设置广播与扫描响应数据。 |
| `tal_ble_advertising_stop(void)` | 停止广播。 |
| `tal_ble_advertising_data_update(TAL_BLE_DATA_T *p_adv, TAL_BLE_DATA_T *p_scan_rsp)` | 更新广播内容；是否在播发中会影响行为。 |

## 扫描（主机）

| 函数 | 说明 |
|----------|-------------|
| `tal_ble_scan_start(TAL_BLE_SCAN_PARAMS_T const *p_scan_param)` | 开始扫描；数据通过 `TAL_BLE_EVT_ADV_REPORT` 上报。 |
| `tal_ble_scan_stop(void)` | 停止扫描。 |

## 连接管理

| 函数 | 说明 |
|----------|-------------|
| `tal_ble_connect_and_discovery(TAL_BLE_PEER_INFO_T peer, TAL_BLE_CONN_PARAMS_T const *p_conn_params)` | 建立连接；结果见 `TAL_BLE_EVT_CENTRAL_CONNECT`。 |
| `tal_ble_disconnect(TAL_BLE_PEER_INFO_T peer)` | 断开连接（主机/从机均可调用，按角色填写句柄与地址）。 |
| `tal_ble_conn_param_update(TAL_BLE_PEER_INFO_T peer, TAL_BLE_CONN_PARAMS_T const *p_conn_params)` | 请求更新连接参数；结果见 `TAL_BLE_EVT_CONN_PARAM_UPDATE`。 |
| `tal_ble_rssi_get(TAL_BLE_PEER_INFO_T peer)` | 读取 RSSI；采样见 `TAL_BLE_EVT_LINK_RSSI`。 |

## 数据通道（GATT 风格封装）

| 函数 | 说明 |
|----------|-------------|
| `tal_ble_server_common_send(TAL_BLE_DATA_T *p_data)` | 从机：通用通道通知/指示。 |
| `tal_ble_server_common_notify(uint16_t index, TAL_BLE_DATA_T *p_data)` | 从机：按特征索引通知。 |
| `tal_ble_server_common_read_update(TAL_BLE_DATA_T *p_data)` | 从机：更新可读特征值。 |
| `tal_ble_server_common_read_update_ext(uint16_t index, TAL_BLE_DATA_T *p_data)` | 从机：按索引更新可读值。 |
| `tal_ble_client_common_send(TAL_BLE_PEER_INFO_T peer, TAL_BLE_DATA_T *p_data)` | 主机：向对端写入。 |
| `tal_ble_client_common_read(TAL_BLE_PEER_INFO_T peer)` | 主机：从对端读取。 |

## MTU 交换

| 函数 | 说明 |
|----------|-------------|
| `tal_ble_server_exchange_mtu_reply(TAL_BLE_PEER_INFO_T peer, uint16_t server_mtu)` | 从机：回复 MTU 交换请求。 |
| `tal_ble_client_exchange_mtu_request(TAL_BLE_PEER_INFO_T peer, uint16_t client_mtu)` | 主机：发起 MTU 交换。 |

## 平台说明

- 能力取决于芯片、SDK 配置与 TKL 适配（例如仅 BLE 或双模）。
- 必须在 `tal_ble_bt_init` 中实现事件回调；多数操作与状态以异步事件完成。

## 参考

- 源码：`TuyaOpen/src/tal_bluetooth/include/tal_bluetooth.h`、`tal_bluetooth_def.h`
- [Wi-Fi Station 教程](wifi-station-tutorial)
- [TKL Bluetooth 文档](../../tkl-api/tkl_bluetooth)
