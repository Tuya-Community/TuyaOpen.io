---
title: HTTP 与 HTTPS 客户端教程
---

## 概述

本教程介绍如何使用 `http_client_interface.h` 中的 `http_client_request` 与 `http_client_free` 发送 HTTP 与 HTTPS 请求。文中说明**请求与响应结构体**各字段、**请求头**键值、`path` 上的**查询参数**，以及响应**状态码**与**原始响应头**块；并包含 GET、带 JSON 的 POST、HTTPS CA、以及用 cJSON 的 `cJSON_ParseWithLength` 解析正文。可运行示例位于 `examples/protocols/http_client` 与 `examples/protocols/https_client`。

## 前置条件

- [环境搭建](../../quick-start/enviroment-setup)
- [Wi-Fi Station 教程](wifi-station-tutorial)

## 要求

- 板级或配置支持 Wi-Fi 或有线网络及 HTTP 客户端。
- 网络可访问测试主机（示例默认 `httpbin.org`）。
- 若使用 JSON 示例：应用需链接 SDK 自带的 cJSON（源码在 `src/libcjson`）。若工程尚未引入，请按其他已使用 `cJSON` 的示例，在 CMake 或 Kconfig 中增加对应组件。

## 步骤

1. 在 TuyaOpen 仓库中打开 `examples/protocols/http_client`。

2. 开启 Wi-Fi 时在 `src/example_http_client.c` 填写 SSID 与密码。

3. 编译并烧录：

   ```bash
   cd examples/protocols/http_client
   tos.py config choice
   tos.py build
   ```

4. 查看串口日志。链路上线后，示例会向 `httpbin.org/get` 发 GET、打印正文，并调用 `http_client_free`。

**预期结果：** 日志包含 DNS、TCP 连接与响应正文。

## 请求与响应 API

类型与函数定义见 `http_client_interface.h`。

### `http_client_request_t`（发出的请求）

| 字段 | 类型 | 说明 |
| ---- | ---- | ---- |
| `host` | `const char *` | 主机名（不含协议前缀），例如 `httpbin.org`。 |
| `port` | `uint16_t` | TCP 端口。HTTP 常用 `80`，HTTPS 常用 `443`；填 `0` 时客户端会按协议使用默认端口（80 / 443）。 |
| `path` | `const char *` | 路径，以 `/` 开头。**查询参数**写在此字符串末尾，例如 `/get?foo=bar&count=3`。若值含保留字符，需自行做 **URL 编码**。 |
| `method` | `const char *` | 方法名，如 `"GET"`、`"POST"`、`"PUT"`、`"DELETE"`。 |
| `headers` | `http_client_header_t *` | 请求头数组（见下）。无自定义头时可 `NULL` 且 `headers_count == 0`。 |
| `headers_count` | `uint8_t` | `headers` 元素个数。 |
| `body` | `const uint8_t *` | POST/PUT 等请求体；GET 可用空字符串且 `body_length == 0`。 |
| `body_length` | `size_t` | `body` 字节长度。 |
| `timeout_ms` | `uint32_t` | 超时时间（毫秒）。 |
| `cacert` | `const uint8_t *` | TLS 的 PEM 格式 CA；明文 HTTP 时为 `NULL`。 |
| `cacert_len` | `size_t` | `cacert` 长度。 |
| `tls_no_verify` | `bool` | 为 true 时可能跳过对端校验（仅联调；生产勿用）。 |

### 请求头（`http_client_header_t`）

每个头字段为一对键值：

| 字段 | 类型 | 说明 |
| ---- | ---- | ---- |
| `key` | `const char *` | 头名，如 `Content-Type`、`Authorization`、`Accept`。 |
| `value` | `const char *` | 头值，如 `application/json`。 |

示例：

```c
http_client_header_t headers[] = {
    {.key = "Content-Type", .value = "application/json"},
    {.key = "Accept", .value = "application/json"},
};
```

底层实现会将这些条目序列化进 HTTP 请求（内部经 `HTTPClient_AddHeader` 等接口）。

### `http_client_response_t`（收到的响应）

`http_client_request` 成功后由客户端填充：

| 字段 | 类型 | 说明 |
| ---- | ---- | ---- |
| `status_code` | `uint16_t` | HTTP 状态码，如 `200`、`404`、`500`。 |
| `headers` | `const uint8_t *` | **原始响应头块**在缓冲区中的起始位置（含状态行与头部文本；非键值表结构）。 |
| `headers_length` | `size_t` | 上述头块的字节长度。 |
| `body` | `const uint8_t *` | 响应体起始位置。 |
| `body_length` | `size_t` | 响应体长度；**不一定**以 `\0` 结尾。 |
| `buffer` | `uint8_t *` | 存放响应数据的缓冲区（分配细节见头文件注释）。 |
| `buffer_length` | `size_t` | `buffer` 总长度。 |

若需**以文本查看响应头**，把 `headers` 与 `headers_length` 当作一段字节区间打印（通常为 ASCII）。示例：

```c
if (http_response.headers && http_response.headers_length > 0) {
    PR_DEBUG_RAW("response headers (%u bytes):\n%.*s\n",
                 (unsigned int)http_response.headers_length,
                 (int)http_response.headers_length,
                 (const char *)http_response.headers);
}
```

若要按字段解析（例如读取 `Content-Type`），需自行解析该文本块；若业务 API 只关心 JSON 正文，通常使用 `status_code` 与 `body` 即可。

用毕请调用 **`http_client_free`** 释放响应相关内存。

## GET 请求

链路上线回调中的典型写法如下（简化）：

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

仓库中的示例未显式设置 `.port`（为 0）在多数平台上仍可用；显式设置 `.port = 80` 含义更清晰。

## 带 JSON 正文的 POST

将 `method` 设为 `"POST"`，`path` 指向接受正文的接口（例如 `httpbin.org/post`），并填写 `body` 与 `body_length`。请求头中保留 `Content-Type: application/json`：

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

## HTTPS 请求

请使用 `examples/protocols/https_client`。与 HTTP 相比，`user_main` 中还会调用 `tuya_tls_init()`、`tuya_register_center_init()`，并在请求中提供 TLS 参数：使用 `tuya_iotdns_query_domain_certs(host, &cacert, &cacert_len)` 获取主机 CA，并设置 `.port = 443` 以及 `.cacert`、`.cacert_len`。

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

`http_client_request_t` 中的 `tls_no_verify` 仅适合联调。生产环境应保持校验并配置可信 CA。HTTPS 下的 POST 与明文 HTTP 相同，仍使用 `method`、`path`、`body`、`body_length`；区别在 TLS 相关字段与端口。

## 解析响应中的 JSON

在 TuyaOpen 上系统学习 cJSON（钩子、所有权、构造对象）可参考 [cJSON 快速入门](cjson-tutorial)。

响应正文可能没有 `\0` 结尾。请使用 `cJSON_ParseWithLength`，长度为 `http_response.body_length`。对 `httpbin.org/post` 的 POST，响应 JSON 中会包含 `json` 字段：

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

构造请求 JSON 时，可使用 `cJSON_CreateObject`、`cJSON_AddStringToObject`，再用 `cJSON_PrintUnformatted` 得到字符串填入 `body`，并按 cJSON 钩子释放打印结果（可能是 `tal_free` 或 `free`）。

## 实现说明

- 在 NETMGR_LINK_UP 之后再发请求（示例用 `__link_status_cb`）。
- `http_client_request` 后必须 `http_client_free`。
- 套接字与 DNS 详见 [TAL Network API 参考](tal-network-api)。

## 参考

- HTTP 源码：`examples/protocols/http_client/src/example_http_client.c`
- HTTPS 源码：`examples/protocols/https_client/src/example_https_client.c`
- 头文件：`src/libhttp/include/http_client_interface.h`
- cJSON：`src/libcjson/cJSON/cJSON.h`；[cJSON 快速入门](cjson-tutorial)
- [示例索引](../../examples/demo-generic-examples)
- [TAL Network API 参考](tal-network-api)
