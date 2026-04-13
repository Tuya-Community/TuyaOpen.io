---
title: HTTP Client Tutorial
---

## Overview

This tutorial walks through the HTTP client example in the TuyaOpen tree. It uses the SDK `http_client_interface` API (`http_client_request`, `http_client_free`) to send a GET request after the network link is up. The sample uses netmgr and Wi-Fi or wired connection helpers.

## Prerequisites

- [Environment setup](../../quick-start/enviroment-setup)
- [Wi-Fi Station tutorial](wifi-station-tutorial)

## Requirements

- Board or config with Wi-Fi or wired and HTTP client support for the example project.
- Network that can reach your test host (default sample uses httpbin.org).

## Steps

1. Open the example in the TuyaOpen repo: `examples/protocols/http_client`.

2. Set Wi-Fi credentials in `src/example_http_client.c` when ENABLE_WIFI is on.

3. From the example directory, build:
   ```bash
   cd examples/protocols/http_client
   tos.py config choice
   tos.py build
   ```

4. Flash and monitor. When the link goes up, the sample calls `http_client_request` with host, method, path, and headers, then `http_client_free` on the response.

5. For HTTPS, use `examples/protocols/https_client` instead.

**Expected outcome:** Logs show DNS, TCP connect, and response body from the test endpoint.

## Implementation notes

- Run HTTP work after NETMGR_LINK_UP (sample uses `__link_status_cb`).
- Always call `http_client_free` after `http_client_request`.
- See [TAL Network API reference](tal-network-api) for sockets and DNS details.

## References

- Source: `examples/protocols/http_client/src/example_http_client.c`
- [Examples index](../../examples/demo-generic-examples)
- [TAL Network API reference](tal-network-api)
