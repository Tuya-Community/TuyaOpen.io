---
title: "Bring-up 4: Cloud connection"
---

The fourth stage is the integration milestone: with system, storage, and network in place, the device pairs, activates, and talks to the Tuya cloud over MQTT. When `switch_demo` works end to end, your port is functionally complete.

## Goal

The device pairs (Bluetooth or Wi-Fi AP), activates against a product, connects to the cloud over MQTT, and reports/receives data points — verified with `switch_demo`.

## Files to implement

This stage adds little new adapter code — it exercises stages 1–3 together. Confirm these supporting pieces:

| File | What you implement / confirm |
|------|------------------------------|
| `tkl_rtc.c` *(or SNTP)* | Real time — TLS certificate validation and the cloud handshake need a correct clock |
| `tkl_system.c` RNG | A strong random source (revisit from stage 1) for TLS and key generation |
| `tkl_bluetooth.c` *(optional)* | Only for **BLE provisioning**; Wi-Fi AP pairing needs no Bluetooth |

The rest — MQTT, TLS, activation — is TuyaOpen library code running on the stack you already ported.

## Details

- **Prerequisites:** a `PID` and a license (`UUID` + `AuthKey`) flashed into the firmware. See [How device–cloud binding works](../../../cloud/tuya-cloud/device-cloud-binding) and [Equipment authorization](../../../quick-start/equipment-authorization).
- **Time matters.** A wrong clock fails TLS certificate validation — sync via RTC or SNTP before the cloud handshake.
- **Pairing path.** BLE provisioning needs `tkl_bluetooth.c`; otherwise use Wi-Fi AP pairing and defer Bluetooth to the next stage.
- **Use `switch_demo`** as the reference app — it is minimal and isolates the cloud path from peripheral concerns.

## Verify

Build and flash `apps/tuya_cloud/switch_demo`, pair it in the Tuya app, and confirm it activates and connects (look for `TUYA_EVENT_MQTT_CONNECTED`). Toggle the switch from the app and from the device, and confirm the data point updates both ways. Optionally validate an OTA. This stage passing means the platform is cloud-ready.

Next: [Bring-up 5: Peripherals and AI](peripherals-and-ai).

## See also

- [How device–cloud binding works](../../../cloud/tuya-cloud/device-cloud-binding)
- [Tuya IoT client API](../../../cloud/iot-client/tuya-iot-client-reference)
- [switch_demo](../../../cloud/iot-client/demo-tuya-iot-light)
