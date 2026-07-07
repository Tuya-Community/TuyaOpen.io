---
title: tkl_wired | Wired Ethernet Driver
description: "tkl_wired reference — TuyaOpen wired Ethernet TKL API for link state, IPv4/IPv6 and MAC addresses, and link-change callbacks for porting/platform adaptation."
keywords:
  - tkl_wired
  - tuyaopen ethernet driver
  - tkl wired api
  - embedded ethernet
---

`tkl_wired` adapts a wired Ethernet link to TuyaOS. It reports the link state, the IPv4 and IPv6 addresses, and the MAC address of the wired interface, and lets you register a callback that fires when the link state changes. The implementation lives in `tkl_wired.c`, which TuyaOS generates with marked regions for your platform code.

## Link status

`tkl_wired_get_status` and the status-change callback report one of two states:

| Enum | Description |
| --- | --- |
| `TKL_WIRED_LINK_DOWN` | The network cable is unplugged. |
| `TKL_WIRED_LINK_UP` | The network cable is plugged in and an IP address is acquired. |

## tkl_wired_get_status

```c
OPERATE_RET tkl_wired_get_status(TKL_WIRED_STAT_E *status);
```

Gets the current link status of the wired connection.

Parameters:

| Input/Output | Name | Description |
| --- | --- | --- |
| [out] | `status` | The link status, `TKL_WIRED_STAT_E`. |

Return value:

`OPRT_OK` on success. Other values indicate an error; see `tuya_error_code.h`.

## tkl_wired_set_status_cb

```c
OPERATE_RET tkl_wired_set_status_cb(TKL_WIRED_STATUS_CHANGE_CB cb);
```

Registers a callback that fires when the wired link status changes.

Parameters:

| Input/Output | Name | Description |
| --- | --- | --- |
| [in] | `cb` | The callback to invoke on a status change. |

The callback has the following signature:

```c
typedef void (*TKL_WIRED_STATUS_CHANGE_CB)(TKL_WIRED_STAT_E status);
```

Return value:

`OPRT_OK` on success. Other values indicate an error; see `tuya_error_code.h`.

## tkl_wired_get_ip

```c
OPERATE_RET tkl_wired_get_ip(NW_IP_S *ip);
```

Gets the IPv4 address, gateway, and subnet mask of the wired link.

Parameters:

| Input/Output | Name | Description |
| --- | --- | --- |
| [out] | `ip` | The IP information, `NW_IP_S`. |

Return value:

`OPRT_OK` on success. Other values indicate an error; see `tuya_error_code.h`.

## tkl_wired_get_ipv6

```c
OPERATE_RET tkl_wired_get_ipv6(NW_IP_TYPE type, NW_IP_S *ip);
```

Gets an IPv6 address of the wired link.

Parameters:

| Input/Output | Name | Description |
| --- | --- | --- |
| [in] | `type` | The IPv6 address type to read, `NW_IP_TYPE`. |
| [out] | `ip` | The IP information, `NW_IP_S`. |

Return value:

`OPRT_OK` on success. Other values indicate an error; see `tuya_error_code.h`.

## tkl_wired_get_mac

```c
OPERATE_RET tkl_wired_get_mac(NW_MAC_S *mac);
```

Gets the MAC address of the wired link.

Parameters:

| Input/Output | Name | Description |
| --- | --- | --- |
| [out] | `mac` | The MAC address, `NW_MAC_S`. |

Return value:

`OPRT_OK` on success. Other values indicate an error; see `tuya_error_code.h`.

## tkl_wired_set_mac

```c
OPERATE_RET tkl_wired_set_mac(const NW_MAC_S *mac);
```

Sets the MAC address of the wired link.

Parameters:

| Input/Output | Name | Description |
| --- | --- | --- |
| [in] | `mac` | The MAC address to set, `NW_MAC_S`. |

Return value:

`OPRT_OK` on success. Other values indicate an error; see `tuya_error_code.h`.
