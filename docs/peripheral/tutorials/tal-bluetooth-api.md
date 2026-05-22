---
title: TAL Bluetooth API Reference
---

## Overview

The header `tal_bluetooth.h` exposes the TuyaOpen TAL Bluetooth API: stack initialization, advertising, scanning, connections, GATT-style data exchange, and MTU negotiation. Events are delivered through the callback registered in `tal_ble_bt_init`. Types such as `TAL_BLE_ADV_PARAMS_T` are defined in `tal_bluetooth_def.h`.

**Audience:** Developers integrating BLE central or peripheral behavior on supported platforms.

## Return values

Functions return `OPERATE_RET` (`OPRT_OK` on success). Several APIs note that RSSI, connection parameter updates, and similar outcomes are also reported asynchronously via BLE events.

## Initialization and identity

| Function | Description |
|----------|-------------|
| `tal_ble_bt_init` | Initialize Bluetooth for the given role; register event callback. |
| `tal_ble_bt_deinit` | Deinitialize Bluetooth (or one role). |
| `tal_ble_address_set` | Set local identity address. |
| `tal_ble_address_get` | Read local identity address. |
| `tal_ble_bt_link_max` | Get maximum link count or MTU-related limit per platform. |

## Advertising (peripheral)

| Function | Description |
|----------|-------------|
| `tal_ble_advertising_start` | Start advertising. |
| `tal_ble_advertising_data_set` | Set advertising and scan response payload. |
| `tal_ble_advertising_stop` | Stop advertising. |
| `tal_ble_advertising_data_update` | Update payloads; behavior depends on whether advertising is active. |

## Scanning (central)

| Function | Description |
|----------|-------------|
| `tal_ble_scan_start` | Start scanning; adv and scan response data arrive through `TAL_BLE_EVT_ADV_REPORT`. |
| `tal_ble_scan_stop` | Stop scanning. |

## Connection management

| Function | Description |
|----------|-------------|
| `tal_ble_connect_and_discovery` | Start connection; completion via `TAL_BLE_EVT_CENTRAL_CONNECT`. |
| `tal_ble_disconnect` | Disconnect; works for central or peripheral (fill handle and address per role). |
| `tal_ble_conn_param_update` | Request connection parameter update; result via `TAL_BLE_EVT_CONN_PARAM_UPDATE`. |
| `tal_ble_rssi_get` | Request RSSI; sample delivered via `TAL_BLE_EVT_LINK_RSSI`. |

## Data path (GATT-style helpers)

| Function | Description |
|----------|-------------|
| `tal_ble_server_common_send` | Peripheral: notify or indicate on common channel. |
| `tal_ble_server_common_notify` | Peripheral: notify by characteristic index. |
| `tal_ble_server_common_read_update` | Peripheral: update readable value. |
| `tal_ble_server_common_read_update_ext` | Peripheral: update by characteristic index. |
| `tal_ble_client_common_send` | Central: write to peer. |
| `tal_ble_client_common_read` | Central: read from peer. |

## MTU exchange

| Function | Description |
|----------|-------------|
| `tal_ble_server_exchange_mtu_reply` | Peripheral: reply to MTU exchange. |
| `tal_ble_client_exchange_mtu_request` | Central: request MTU exchange. |

## Platform notes

- Feature availability depends on the chip, SDK configuration, and TKL adapter (for example classic BT versus BLE-only parts).
- Always implement the event callback passed to `tal_ble_bt_init`; many APIs complete work asynchronously through events.

## References

- Source: `TuyaOpen/src/tal_bluetooth/include/tal_bluetooth.h` and `tal_bluetooth_def.h`
- [Wi-Fi Station tutorial](wifi-station-tutorial)
- [TKL Bluetooth](../../tkl-api/tkl_bluetooth)
