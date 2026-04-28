---
title: TAL Network API Reference
---

## Overview

`tal_network.h` wraps TCP and UDP sockets, `select`, and common socket options behind one portable API. It follows BSD-style flows: create a socket, connect or bind, listen, accept, then send and recv. UDP uses `send_to` and `recvfrom`. Helpers convert between strings and `TUYA_IP_ADDR_T` host-order IPv4.

**Source:** `TuyaOpen/src/tal_network/include/tal_network.h`

**Audience:** Developers implementing HTTP clients, custom TCP or UDP protocols, or debugging connectivity with `tal_wifi`.

## IP address constants

| Macro | Meaning |
|-------|---------|
| `TY_IPADDR_LOOPBACK` | 127.0.0.1 |
| `TY_IPADDR_ANY` | 0.0.0.0 |
| `TY_IPADDR_BROADCAST` | 255.255.255.255 |

## Errors and multiplexing

| Function | Description |
|----------|-------------|
| `tal_net_get_errno` | Last network error as `TUYA_ERRNO`. |
| `tal_net_select` | Wait on read, write, except sets. Timeout in ms. |
| `tal_net_fd_set`, `tal_net_fd_clear`, `tal_net_fd_isset`, `tal_net_fd_zero` | FD set helpers. Macros: `TAL_FD_SET`, `TAL_FD_CLR`, `TAL_FD_ISSET`, `TAL_FD_ZERO`. |
| `tal_net_get_nonblock` | Query non-blocking mode. |
| `tal_net_set_block` | Set blocking or non-blocking. |
| `tal_net_close` | Close socket fd. |

## Socket lifecycle

| Function | Description |
|----------|-------------|
| `tal_net_socket_create` | Create TCP or UDP (`TUYA_PROTOCOL_TYPE_E`). Returns fd. |
| `tal_net_connect` | TCP connect to address and port. |
| `tal_net_connect_raw` | Connect using raw socket address buffer. |
| `tal_net_bind` | Bind local address and port. |
| `tal_net_listen` | Listen with backlog. |
| `tal_net_accept` | Accept; optional peer address and port out. |

## Data transfer

| Function | Description |
|----------|-------------|
| `tal_net_send`, `tal_net_recv` | Stream I/O. |
| `tal_net_send_to`, `tal_net_recvfrom` | UDP with peer address. |
| `tal_net_recv_nd_size` | Recv until `nd_size` bytes or error. |

## Options and DNS

| Function | Description |
|----------|-------------|
| `tal_net_set_timeout` | Send or recv timeout (`TUYA_TRANS_TYPE_E`). |
| `tal_net_set_bufsize` | Buffer sizes. |
| `tal_net_set_reuse` | SO_REUSEADDR style reuse. |
| `tal_net_disable_nagle` | TCP_NODELAY. |
| `tal_net_set_broadcast` | UDP broadcast. |
| `tal_net_set_keepalive` | TCP keepalive. |
| `tal_net_gethostbyname` | Resolve name to `TUYA_IP_ADDR_T`. |
| `tal_net_get_socket_ip` | Local bound address. |
| `tal_net_str2addr`, `tal_net_addr2str` | String and address conversion. |
| `tal_net_setsockopt`, `tal_net_getsockopt` | Raw options (`TUYA_OPT_LEVEL`, `TUYA_OPT_NAME`). |

## Typical TCP client

1. Bring Wi-Fi up ([Wi-Fi Station tutorial](wifi-station-tutorial)).
2. Create socket with `tal_net_socket_create` using the TCP enum from `tuya_cloud_types.h`.
3. Optionally use non-blocking mode and `tal_net_select` for timeouts.
4. Resolve host with `tal_net_gethostbyname`, then `tal_net_connect`.
5. Loop on `tal_net_send` and `tal_net_recv`.
6. `tal_net_close`.

## Platform notes

Return types mix `OPERATE_RET`, `TUYA_ERRNO`, and byte counts. Read each function comment in the header. The adapter maps to the port stack (for example lwIP).

## References

- [TAL Wi-Fi API reference](tal-wifi-api)
- [TKL lwIP](../../tkl-api/tkl_lwip)
- `TuyaOpen/src/tal_network/include/tal_network.h`
