---
title: "Bring-up 3: Wi-Fi and network"
---

The third stage connects your chip to the network: associate with an AP, obtain an IP, and reach the internet over TCP and TLS. This is the foundation the cloud connection sits on.

## Goal

TuyaOpen can scan and join a Wi-Fi AP, get an IP address, resolve DNS, and open a TLS socket to an internet host.

## Files to implement

| File | What you implement |
|------|--------------------|
| `tkl_wifi.c` | Scan, connect/disconnect, station/AP/mode switch, MAC get/set, RF calibration, country code |
| `tkl_network.c` **or** `tkl_lwip.c` | The socket layer — implement **one**, depending on whose lwIP you use (below) |
| `tkl_hash.c` / `tkl_symmetry.c` *(optional)* | Only if you use your SDK's crypto instead of TuyaOpen's Mbed TLS |

## Details

- **Pick one network adapter:**
  - **Vendor lwIP** — keep your SDK's lwIP and adapt `tkl_network.c`. Model: [TuyaOpen-esp32 `tkl_network.c`](https://github.com/tuya/TuyaOpen-esp32/blob/master/tuya_open_sdk/tuyaos_adapter/src/drivers/tkl_network.c).
  - **TuyaOpen lwIP** — use TuyaOpen's lwIP and adapt `tkl_lwip.c`. Model: [TuyaOpen-T2 `tkl_lwip.c`](https://github.com/tuya/TuyaOpen-T2/blob/master/tuyaos/tuyaos_adapter/src/tkl_lwip.c).

  Adapt only one. Toggle in `tos.py config menu` → `configure tuyaopen` → `configure enable/disable liblwip`.
- **TLS / crypto.** Use your SDK's Mbed TLS or TuyaOpen's (`configure mbedtls` → `Enable user custom`). Either way, a good hardware **random number generator** is essential — weak entropy breaks the TLS handshake.
- **Wi-Fi events.** Drive the `WIFI_EVENT_CB` so TuyaOpen sees connect/disconnect/got-IP transitions; the station state machine and reconnect logic depend on these.

## Verify

From a test app: scan and join your AP, confirm an IP via your logs, resolve a hostname (DNS), and open a TLS connection to an internet endpoint. You succeed when a TLS socket connects and exchanges data reliably.

Next: [Bring-up 4: Cloud connection](cloud-connection).

## See also

- [tkl_wifi reference](../../../tkl-api/tkl_wifi) · [tkl_network](../../../tkl-api/tkl_network) · [tkl_lwip](../../../tkl-api/tkl_lwip)
- [TAL Wi-Fi tutorial](../../../peripheral/tutorials/tal-wifi-api)
