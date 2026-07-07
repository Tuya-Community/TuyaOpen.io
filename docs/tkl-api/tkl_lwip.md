---
title: tkl_lwip | lwIP Ethernet Interface
description: "tkl_lwip reference — TuyaOpen lwIP Ethernet TKL API for initializing the interface and tx/rx of packets in pbuf form for porting/platform adaptation."
keywords:
  - tkl_lwip
  - tuyaopen lwip driver
  - tkl ethernet api
  - lwip porting
---

`tkl_lwip` adapts the lwIP network stack to the underlying Ethernet hardware. It initializes the Ethernet interface and transmits and receives packets in lwIP `pbuf` form. The implementation lives in `tkl_lwip.c`, which TuyaOS generates and maintains; add your own code between the `BEGIN` and `END` markers so it survives regeneration.

You only need to adapt these interfaces when `ENABLE_LIBLWIP` is enabled.

The interface uses two opaque handle types:

| Type | Description |
| --- | --- |
| `TKL_NETIF_HANDLE` | Handle to a network interface (`void *`). |
| `TKL_PBUF_HANDLE` | Handle to a packet buffer in lwIP `pbuf` form (`void *`). |

## tkl_ethernetif_init

```c
OPERATE_RET tkl_ethernetif_init(TKL_NETIF_HANDLE netif);
```

Initializes the Ethernet interface hardware.

Parameters:

| Input/Output | Name | Description |
| --- | --- | --- |
| [in] | `netif` | The network interface to initialize. |

Return value:

The lwIP error code: `ERR_OK` on success, other values on failure. See `err_enum_t` in `lwip/err.h`.

## tkl_ethernetif_output

```c
OPERATE_RET tkl_ethernetif_output(TKL_NETIF_HANDLE netif, TKL_PBUF_HANDLE p);
```

Sends a packet through the Ethernet interface.

Parameters:

| Input/Output | Name | Description |
| --- | --- | --- |
| [in] | `netif` | The network interface to send the packet on. |
| [in] | `p` | The packet to send, in `pbuf` form. |

Return value:

The lwIP error code: `ERR_OK` on success, other values on failure. See `err_enum_t` in `lwip/err.h`.

## tkl_ethernetif_recv

```c
OPERATE_RET tkl_ethernetif_recv(TKL_NETIF_HANDLE netif, TKL_PBUF_HANDLE p);
```

Receives a packet from the Ethernet interface.

Parameters:

| Input/Output | Name | Description |
| --- | --- | --- |
| [in] | `netif` | The network interface that received the packet. |
| [in] | `p` | The received packet, in `pbuf` form. |

Return value:

The lwIP error code: `ERR_OK` on success, other values on failure. See `err_enum_t` in `lwip/err.h`.
