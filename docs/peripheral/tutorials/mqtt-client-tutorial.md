---
title: MQTT Client Tutorial
---

## Overview

This tutorial covers the **MQTT client** example: connect to a public broker, subscribe, publish with QoS, then unsubscribe. The code uses `mqtt_client_interface.h` (init, connect, `mqtt_client_yield`, subscribe/publish/unsubscribe) on top of **netmgr** and Wi-Fi or wired networking.

## Prerequisites

- [Environment setup](../../quick-start/enviroment-setup)
- Familiarity with MQTT topics and QoS (0/1)

## Requirements

- Board config with MQTT client and network support for `examples/protocols/mqtt_client`.
- Outbound access to the broker host and port (default sample uses `broker.emqx.io:1883`).
- Broker credentials: the stock example uses EMQX demo username/password; **replace** for production or private brokers.

## Steps

1. Open [`examples/protocols/mqtt_client`](https://github.com/tuya/TuyaOpen/tree/master/examples/protocols/mqtt_client).

2. Edit `src/examples_mqtt_client.c`:
   - Wi-Fi SSID/password if using Wi-Fi.
   - `mqtt_client_config_t`: `host`, `port`, `clientid`, `username`, `password`, and callback hooks (`on_connected`, `on_message`, and so on).

3. Build and flash from the example directory:
   ```bash
   cd examples/protocols/mqtt_client
   tos.py config choice
   tos.py build
   ```

4. After **link up**, the sample calls `mqtt_client_init`, `mqtt_client_connect`, then **`mqtt_client_yield`** so the stack processes incoming packets. The connected callback subscribes; the subscribe callback publishes a test message; the publish-ack path unsubscribes.

**Expected outcome:** Serial log shows connect, subscribe, publish, and PUBACK, matching the callback order in the source.

## Implementation notes

- You must call **`mqtt_client_yield`** (or an equivalent pump) regularly while connected, or the client will not process SUBACK/PUBLISH/PUBACK.
- Topic names and payload encoding must match your cloud or broker contract.
- This example is **not** the same as Tuya Cloud MQTT inside `tuya_iot`; it is a generic MQTT client for custom brokers.

## References

- Example source: `examples/protocols/mqtt_client/src/examples_mqtt_client.c`
- [TAL Network API reference](tal-network-api)
- [Examples index](../../examples/demo-generic-examples)
