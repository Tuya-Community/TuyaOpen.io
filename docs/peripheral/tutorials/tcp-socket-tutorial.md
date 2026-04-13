---
title: TCP Socket Client Tutorial
---

## Overview

This tutorial explains the **TCP client** example: create a TCP socket with **TAL** (`tal_net_socket_create`), connect with `tal_net_connect`, send data in a loop, then `tal_net_close`. It complements the [TAL Network API reference](tal-network-api) with a concrete `netmgr` + Wi-Fi flow.

## Prerequisites

- [Environment setup](../../quick-start/enviroment-setup)
- [TAL Network API reference](tal-network-api)

## Requirements

- Target that builds `examples/protocols/tcp_client` with `tal_network` and (typically) Wi-Fi.
- A reachable TCP server. The default sample uses `127.0.0.1` and port **7** (echo); on a real device you must set **`TCP_SERVER_IP`** to your PC or server LAN address and ensure the port is open.

## Steps

1. Open [`examples/protocols/tcp_client`](https://github.com/tuya/TuyaOpen/tree/master/examples/protocols/tcp_client).

2. Set `TCP_SERVER_IP` and `TCP_SERVER_PORT` in `src/example_tcp_client.c` to your server.

3. Configure Wi-Fi credentials in the same file when `ENABLE_WIFI` is defined.

4. Build and run:
   ```bash
   cd examples/protocols/tcp_client
   tos.py config choice
   tos.py build
   ```

5. Trace the task flow: after network is up, the sample creates `PROTOCOL_TCP` socket, `tal_net_str2addr` + `tal_net_connect`, then sends a small buffer several times with `tal_net_send`, sleeps between sends, and closes the socket.

**Expected outcome:** Server receives repeated payloads; device logs show connect and send success.

## Implementation notes

- Check return values of `tal_net_connect` and `tal_net_send`; negative values indicate errors per the adapter.
- For servers, see the sibling example [`examples/protocols/tcp_server`](https://github.com/tuya/TuyaOpen/tree/master/examples/protocols/tcp_server).
- Use `tal_net_set_block` or `tal_net_select` if you need timeouts or non-blocking I/O.

## References

- Client source: `examples/protocols/tcp_client/src/example_tcp_client.c`
- Server example: `examples/protocols/tcp_server`
- [Wi-Fi Station tutorial](wifi-station-tutorial)
- [Examples index](../../examples/demo-generic-examples)
