---
title: HTTP and HTTPS Client Tutorial
---

## Overview

This tutorial covers plain HTTP and HTTPS requests using `http_client_request` and `http_client_free` from `http_client_interface.h`. It documents **request and response structs** (fields, request headers, query args on `path`, response status and header block), then shows GET and POST with a JSON body, HTTPS CA setup, and JSON parsing with cJSON (`cJSON_ParseWithLength`). Runnable samples are under `examples/protocols/http_client` and `examples/protocols/https_client`.

## Prerequisites

- [Environment setup](../../quick-start/enviroment-setup)
- [Wi-Fi Station tutorial](wifi-station-tutorial)

## Requirements

- Board or config with Wi-Fi or wired networking and HTTP client support for the example project.
- Network that can reach your test host (samples default to `httpbin.org`).
- For JSON examples: your application must link the SDK cJSON library (TuyaOpen ships it under `src/libcjson`). Add the component to your app CMake or Kconfig like other examples that use `cJSON`, if it is not already included.

## Steps

1. Open `examples/protocols/http_client` in the TuyaOpen repo.

2. Set Wi-Fi credentials in `src/example_http_client.c` when `ENABLE_WIFI` is on.

3. Build and flash:

   ```bash
   cd examples/protocols/http_client
   tos.py config choice
   tos.py build
   ```

4. Monitor the log. After the link is up, the sample sends a GET to `httpbin.org/get`, prints the body, and calls `http_client_free`.

**Expected outcome:** Logs show DNS, TCP connect, and the response body from the test endpoint.

## Request and response API

Types and functions are defined in `http_client_interface.h`.

### `http_client_request_t` (outgoing request)

| Field | Type | Role |
| ----- | ---- | ---- |
| `host` | `const char *` | Server hostname (no scheme). Example: `httpbin.org`. |
| `port` | `uint16_t` | TCP port. Use `80` for HTTP or `443` for HTTPS, or `0` to let the client default (80 / 443). |
| `path` | `const char *` | Request path, starting with `/`. **Query string:** append it here, e.g. `/get?foo=bar&count=3`. You must **URL-encode** values yourself if they contain reserved characters. |
| `method` | `const char *` | Method name, e.g. `"GET"`, `"POST"`, `"PUT"`, `"DELETE"`. |
| `headers` | `http_client_header_t *` | Array of request header entries (see below). Can be `NULL` if `headers_count` is `0`. |
| `headers_count` | `uint8_t` | Number of entries in `headers`. |
| `body` | `const uint8_t *` | Request body for POST/PUT; use empty string and `body_length == 0` for GET. |
| `body_length` | `size_t` | Length of `body` in bytes. |
| `timeout_ms` | `uint32_t` | Overall timeout in milliseconds. |
| `cacert` | `const uint8_t *` | PEM CA blob for TLS; `NULL` for plain HTTP. |
| `cacert_len` | `size_t` | Length of `cacert`. |
| `tls_no_verify` | `bool` | If true, TLS may skip peer verification (bring-up only; avoid in production). |

### Request headers (`http_client_header_t`)

Each header is one key/value pair:

| Field | Type | Role |
| ----- | ---- | ---- |
| `key` | `const char *` | Header name, e.g. `"Content-Type"`, `"Authorization"`, `"Accept"`. |
| `value` | `const char *` | Header value, e.g. `"application/json"`. |

Example array:

```c
http_client_header_t headers[] = {
    {.key = "Content-Type", .value = "application/json"},
    {.key = "Accept", .value = "application/json"},
};
```

The SDK serializes these into the outgoing HTTP request (internally via the core HTTP client `HTTPClient_AddHeader` path).

### `http_client_response_t` (incoming response)

After a successful `http_client_request`, the client fills:

| Field | Type | Role |
| ----- | ---- | ---- |
| `status_code` | `uint16_t` | HTTP status code, e.g. `200`, `404`, `500`. |
| `headers` | `const uint8_t *` | Start of the **raw response header block** in the receive buffer (status line and header fields as received; not a parsed map). |
| `headers_length` | `size_t` | Length in bytes of that header block. |
| `body` | `const uint8_t *` | Start of the response body. |
| `body_length` | `size_t` | Body length in bytes. May not be null-terminated. |
| `buffer` | `uint8_t *` | Owning buffer for the response (implementation detail for allocation; see header comment). |
| `buffer_length` | `size_t` | Total size of `buffer`. |

To **inspect response headers as text**, treat `headers` + `headers_length` as an opaque byte range (often ASCII). Example debug print:

```c
if (http_response.headers && http_response.headers_length > 0) {
    PR_DEBUG_RAW("response headers (%u bytes):\n%.*s\n",
                 (unsigned int)http_response.headers_length,
                 (int)http_response.headers_length,
                 (const char *)http_response.headers);
}
```

For structured use (e.g. read `Content-Type`), parse that block yourself or use only `body` + `status_code` if enough for your API.

Always call **`http_client_free`** when done; it releases memory allocated for the response.

## GET request

The shipped example follows this shape inside your link-up callback (simplified):

```c
#include "http_client_interface.h"

http_client_response_t http_response = {0};
http_client_header_t headers[] = {
    {.key = "Content-Type", .value = "application/json"},
};

http_client_status_t http_status = http_client_request(
    &(const http_client_request_t){
        .host = "httpbin.org",
        .port = 80,
        .method = "GET",
        .path = "/get",
        .headers = headers,
        .headers_count = sizeof(headers) / sizeof(headers[0]),
        .body = (const uint8_t *)"",
        .body_length = 0,
        .timeout_ms = 10 * 1000,
    },
    &http_response);

if (HTTP_CLIENT_SUCCESS == http_status) {
    PR_DEBUG_RAW("body:\n%s\n", (char *)http_response.body);
}
http_client_free(&http_response);
```

The upstream sample leaves `.port` unset (zero) and still works on many targets; setting `.port = 80` makes the intent explicit.

## POST request with a JSON body

Set `method` to `"POST"`, point `path` at an endpoint that accepts a body (for example `httpbin.org/post`), and fill `body` and `body_length`. Keep `Content-Type: application/json` in the header list:

```c
static const char json_body[] = "{\"sensor\":\"temp\",\"value\":23.5}";

http_client_response_t http_response = {0};
http_client_header_t headers[] = {
    {.key = "Content-Type", .value = "application/json"},
};

http_client_status_t http_status = http_client_request(
    &(const http_client_request_t){
        .host = "httpbin.org",
        .port = 80,
        .method = "POST",
        .path = "/post",
        .headers = headers,
        .headers_count = sizeof(headers) / sizeof(headers[0]),
        .body = (const uint8_t *)json_body,
        .body_length = sizeof(json_body) - 1,
        .timeout_ms = 10 * 1000,
    },
    &http_response);

if (HTTP_CLIENT_SUCCESS == http_status) {
    PR_DEBUG_RAW("status_code: %u\n", (unsigned int)http_response.status_code);
    PR_DEBUG_RAW("body len: %u\n", (unsigned int)http_response.body_length);
}
http_client_free(&http_response);
```

## HTTPS request

Use `examples/protocols/https_client`. Compared with HTTP, `user_main` also calls `tuya_tls_init()` and `tuya_register_center_init()`, and the request supplies TLS material:

- `tuya_iotdns_query_domain_certs(host, &cacert, &cacert_len)` to obtain a CA for the host.
- `.port = 443`, `.cacert` and `.cacert_len` on `http_client_request_t`.

Pattern after link up:

```c
uint16_t cacert_len = 0;
uint8_t *cacert = NULL;
http_client_response_t http_response = {0};

TUYA_CALL_ERR_RETURN(tuya_iotdns_query_domain_certs("httpbin.org", &cacert, &cacert_len));

http_client_header_t headers[] = {
    {.key = "Content-Type", .value = "application/json"},
};

http_client_status_t http_status = http_client_request(
    &(const http_client_request_t){
        .cacert = cacert,
        .cacert_len = cacert_len,
        .host = "httpbin.org",
        .port = 443,
        .method = "GET",
        .path = "/get",
        .headers = headers,
        .headers_count = sizeof(headers) / sizeof(headers[0]),
        .body = (const uint8_t *)"",
        .body_length = 0,
        .timeout_ms = 10 * 1000,
    },
    &http_response);

if (HTTP_CLIENT_SUCCESS == http_status) {
    PR_DEBUG_RAW("body:\n%s\n", (char *)http_response.body);
}
http_client_free(&http_response);
```

`http_client_request_t` also has `tls_no_verify` for bring-up only. For production traffic, keep verification enabled and use a proper trust store.

POST over HTTPS uses the same `method`, `path`, `body`, and `body_length` as plain HTTP; only TLS fields and port differ.

## Parse JSON from the response

Responses may not be null-terminated. Prefer `cJSON_ParseWithLength` with `http_response.body` and `http_response.body_length`.

For a POST to `httpbin.org/post`, the JSON body of the HTTP response includes a `json` object that mirrors your submitted fields:

```c
#include "cJSON.h"

if (HTTP_CLIENT_SUCCESS == http_status && http_response.body && http_response.body_length > 0) {
    cJSON *root = cJSON_ParseWithLength((const char *)http_response.body, http_response.body_length);
    if (root) {
        cJSON *json = cJSON_GetObjectItem(root, "json");
        if (cJSON_IsObject(json)) {
            cJSON *val = cJSON_GetObjectItem(json, "sensor");
            if (cJSON_IsString(val)) {
                PR_DEBUG("sensor: %s", val->valuestring);
            }
        }
        cJSON_Delete(root);
    }
}
```

To build JSON for a request body, you can use `cJSON_CreateObject`, `cJSON_AddStringToObject`, then `cJSON_PrintUnformatted`, send the string in `body`, and free the printed string with the allocator your cJSON hooks use (often `tal_free` or `free` depending on configuration).

## Implementation notes

- Run HTTP and HTTPS work after NETMGR_LINK_UP (the examples use `__link_status_cb`).
- Always call `http_client_free` after a successful `http_client_request`.
- See [TAL Network API reference](tal-network-api) for sockets and DNS.

## References

- HTTP source: `examples/protocols/http_client/src/example_http_client.c`
- HTTPS source: `examples/protocols/https_client/src/example_https_client.c`
- Headers: `src/libhttp/include/http_client_interface.h`
- cJSON: `src/libcjson/cJSON/cJSON.h`
- [Examples index](../../examples/demo-generic-examples)
- [TAL Network API reference](tal-network-api)
