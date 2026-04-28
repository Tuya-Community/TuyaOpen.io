---
title: TCP and UDP Socket Tutorial
---

## Overview

This tutorial explains how to use **TAL network** sockets for **TCP** and **UDP**. The **TCP client** walkthrough matches `examples/protocols/tcp_client` (`PROTOCOL_TCP`, `tal_net_connect`, `tal_net_send`). **UDP** is illustrated with `PROTOCOL_UDP`, `tal_net_bind`, **`tal_net_send_to`**, and **`tal_net_recvfrom`**; a concrete **UDP broadcast** sample lives in `examples/wifi/ap`.

## Prerequisites

- [Environment setup](../../quick-start/enviroment-setup)
- [TAL Network API reference](tal-network-api)

## Requirements

- Target that builds `examples/protocols/tcp_client` with `tal_network` and (typically) Wi-Fi.
- A reachable **TCP** server. The default sample uses `127.0.0.1` and port **7**; on hardware set **`TCP_SERVER_IP`** to your PC or server LAN address and open the port.
- For **UDP** experiments, a peer IP/port or a broadcast-capable LAN (see the Wi-Fi AP example).

## Steps (TCP client)

1. Open [`examples/protocols/tcp_client`](https://github.com/tuya/TuyaOpen/tree/master/examples/protocols/tcp_client).

2. Set `TCP_SERVER_IP` and `TCP_SERVER_PORT` in `src/example_tcp_client.c`.

3. Configure Wi-Fi credentials in the same file when `ENABLE_WIFI` is defined.

4. Build and run:
   ```bash
   cd examples/protocols/tcp_client
   tos.py config choice
   tos.py build
   ```

5. After the network is up, the task creates a **`PROTOCOL_TCP`** socket, resolves the address with `tal_net_str2addr`, calls `tal_net_connect`, sends a small buffer several times with `tal_net_send`, then `tal_net_close`.

**Expected outcome:** The server receives repeated payloads; device logs show connect and send success.

## TCP client code pattern

```c
#include "tal_network.h"

int sock_fd = tal_net_socket_create(PROTOCOL_TCP);
TUYA_IP_ADDR_T server_ip = tal_net_str2addr(TCP_SERVER_IP);

if (tal_net_connect(sock_fd, server_ip, TCP_SERVER_PORT) < 0) {
    PR_ERR("connect failed");
    tal_net_close(sock_fd);
    return;
}

const char msg[] = "Hello Tuya\n";
tal_net_send(sock_fd, msg, strlen(msg));
tal_net_close(sock_fd);
```

For a **TCP server**, use `examples/protocols/tcp_server` (`tal_net_bind`, `tal_net_listen`, `tal_net_accept`, `tal_net_recv`).

## UDP send and receive

Create a **UDP** socket with **`PROTOCOL_UDP`**. For a simple **unicast** client that sends to a known host and reads one reply:

```c
#include "tal_network.h"

#define LOCAL_PORT  45000
#define REMOTE_PORT 45001

int udp_fd = tal_net_socket_create(PROTOCOL_UDP);
if (udp_fd < 0) {
    PR_ERR("udp create failed");
    return;
}

TUYA_IP_ADDR_T local_ip = tal_net_str2addr("192.168.1.50"); /* your interface address */
if (tal_net_bind(udp_fd, local_ip, LOCAL_PORT) < 0) {
    PR_ERR("bind failed");
    tal_net_close(udp_fd);
    return;
}

const char payload[] = "ping";
TUYA_IP_ADDR_T peer_ip = tal_net_str2addr("192.168.1.100");
tal_net_send_to(udp_fd, payload, strlen(payload), peer_ip, REMOTE_PORT);

char rx[256];
TUYA_IP_ADDR_T from_addr = 0;
uint16_t from_port = 0;
TUYA_ERRNO n = tal_net_recvfrom(udp_fd, rx, sizeof(rx), &from_addr, &from_port);
if (n > 0) {
    PR_DEBUG("got %d bytes from port %u", (int)n, (unsigned)from_port);
}
tal_net_close(udp_fd);
```

Replace `local_ip` with the IPv4 address of the interface you want to bind; the exact value depends on your netmgr or static config.

## UDP broadcast reference

**Broadcast** (periodic beacon on the AP subnet) is implemented in **`examples/wifi/ap/src/example_wifi_ap.c`**: `tal_net_socket_create(PROTOCOL_UDP)`, `tal_net_bind`, **`tal_net_set_broadcast`**, and **`tal_net_send_to`** with address **`0xFFFFFFFF`** and a chosen port.

## Implementation notes

- Check return values of `tal_net_connect`, `tal_net_send`, `tal_net_send_to`, and `tal_net_recvfrom`; negative values indicate errors per the adapter.
- Use `tal_net_set_block` or `tal_net_select` if you need timeouts or non-blocking I/O.
- TCP is **connection-oriented**; UDP is **datagram** based—each `tal_net_send_to` is one packet unless the stack fragments.

## References

- TCP client: `examples/protocols/tcp_client/src/example_tcp_client.c`
- TCP server: `examples/protocols/tcp_server`
- UDP broadcast: `examples/wifi/ap/src/example_wifi_ap.c`
- API: `src/tal_network/include/tal_network.h`
- [Wi-Fi Station tutorial](wifi-station-tutorial)
- [Examples index](../../examples/demo-generic-examples)
