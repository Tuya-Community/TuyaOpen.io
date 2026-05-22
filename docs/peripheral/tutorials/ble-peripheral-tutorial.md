---
title: BLE Peripheral Tutorial
---

## Overview

This tutorial covers the **BLE Peripheral** example: initialize as a **peripheral**, register advertising and scan-response payloads, **advertise**, accept a **connection** from a central (for example a phone running nRF Connect), and handle **GATT**-related events (read update, writes, subscribe/notify, connection parameter update, MTU). The example path is `examples/ble/ble_peripher` (folder name `ble_peripher` in the repo).

## Prerequisites

- [Environment setup](../../quick-start/enviroment-setup)
- [TAL Bluetooth API reference](tal-bluetooth-api)

## Requirements

- Target that builds **`examples/ble/ble_peripher`** with BLE peripheral support.
- A **BLE central** (phone with nRF Connect, USB dongle, or [BLE Central tutorial](ble-central-tutorial) firmware) to scan and connect.
- Serial log for event traces.

## Steps

1. Open `examples/ble/ble_peripher` in the TuyaOpen tree.

2. Choose a BLE-capable board in `tos.py config choice`.

3. Build and flash:
   ```bash
   cd examples/ble/ble_peripher
   tos.py config choice
   tos.py build
   ```

4. On boot, `tal_ble_bt_init` runs with **`TAL_BLE_ROLE_PERIPERAL`** (this is the identifier used in the current SDK sources) and your event callback.

5. On **`TAL_BLE_STACK_INIT`**, when `init == 0`, the sample sets advertising and scan response with `tal_ble_advertising_data_set`, then **`tal_ble_advertising_start(TUYAOS_BLE_DEFAULT_ADV_PARAM)`**. The scan response includes a **Complete Local Name** of `TY` (bytes `0x09`, `'T'`, `'Y'`) so it is easy to find in nRF Connect.

6. Connect from the central. Typical events in the sample: **`TAL_BLE_EVT_PERIPHERAL_CONNECT`** (then `tal_ble_server_common_read_update` with a combined buffer), **`TAL_BLE_EVT_CONN_PARAM_UPDATE`**, **`TAL_BLE_EVT_MTU_REQUEST`**, **`TAL_BLE_EVT_SUBSCRIBE`** (optional notify `NOTIFY ENABLED`), **`TAL_BLE_EVT_WRITE_REQ`** for client writes, **`TAL_BLE_EVT_DISCONNECT`** followed by **`tal_ble_advertising_start`** again.

**Expected outcome:** Device advertises as **TY**, connects, exchanges connection parameters and MTU, and can receive writes; after disconnect it advertises again.

## Implementation notes

- Advertising payloads are **31-byte** arrays in the example (`adv_data_const`, `scan_rsp_data_const`). Production devices should follow **Bluetooth SIG** GAP rules for AD structures (length, type, value).
- The peripheral tutorial complements the central tutorial: use two boards or a phone plus device for end-to-end tests.
- For API details and error handling patterns, see [TAL Bluetooth API reference](tal-bluetooth-api).
- Extra diagrams and log walkthroughs: `examples/ble/ble_peripher/README.md`.

## References

- Source: `examples/ble/ble_peripher/src/example_ble_peripheral.c`
- [BLE Central tutorial](ble-central-tutorial)
- [TAL Bluetooth API reference](tal-bluetooth-api)
- [Examples index](../../examples/demo-generic-examples)
