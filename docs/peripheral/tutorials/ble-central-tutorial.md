---
title: BLE Central Tutorial
---

## Overview

This tutorial walks through the BLE Central example: initialize the stack as a central device, scan for advertisers, and handle `TAL_BLE_EVT_ADV_REPORT` events. You use `tal_ble_bt_init` with `TAL_BLE_ROLE_CENTRAL`, `tal_ble_scan_start`, and a callback that prints peer address, address type, RSSI, and raw advertising payload. The example is under `examples/ble/ble_central` in the TuyaOpen repo.

## Prerequisites

- [Environment setup](../../quick-start/enviroment-setup)
- [TAL Bluetooth API reference](tal-bluetooth-api)

## Requirements

- Target chip and board config that includes BLE and builds `examples/ble/ble_central`.
- A BLE peripheral nearby (phone with nRF Connect, another board, or the BLE Peripheral tutorial device).
- Serial log to verify scan output.

## Steps

1. Open the example: `examples/ble/ble_central` in the TuyaOpen tree.

2. Select a board that supports BLE central in `tos.py config choice`.

3. Build and flash:

   ```bash
   cd examples/ble/ble_central
   tos.py config choice
   tos.py build
   ```

4. After boot, the app calls `tal_ble_bt_init(TAL_BLE_ROLE_CENTRAL, __ble_central_event_callback)` and starts scanning with `TAL_BLE_SCAN_PARAMS_T` (active scan, interval and window `0x400`, long timeout in the sample).

5. When an advertisement is reported, the callback logs address bytes, public vs random address type, ADV payload type, RSSI, and a hex dump of `p_data` and `data_len`, then calls `tal_ble_scan_stop()` (the sample stops after handling reports).

**Expected outcome:** Logs show `TAL_BLE_EVT_ADV_REPORT` with peer address, RSSI, and advertising bytes when peripherals are in range.

## Implementation notes

- Central role initiates scanning; peripherals advertise. Pair with `examples/ble/ble_peripher` to test on two boards.
- Adjust `scan_cfg` (type, interval, window, timeout, `filter_dup`) for your product. See `TAL_BLE_SCAN_PARAMS_T` in `tal_bluetooth.h`.
- The sample stops the scan inside the event callback; for continuous scanning, avoid stopping on every report or restart scan as needed.
- Longer background on addresses and AD structures is in `examples/ble/ble_central/README.md`.

## References

- Source: `examples/ble/ble_central/src/example_ble_central.c`
- [BLE Peripheral tutorial](ble-peripheral-tutorial)
- [TAL Bluetooth API reference](tal-bluetooth-api)
- [Examples index](../../examples/demo-generic-examples)
