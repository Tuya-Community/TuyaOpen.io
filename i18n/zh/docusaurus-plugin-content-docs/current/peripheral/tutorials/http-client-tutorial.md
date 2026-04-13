---
title: HTTP 与 HTTPS 客户端教程
---

## 概述

本教程介绍如何使用 `http_client_interface.h` 中的 `http_client_request` 与 `http_client_free` 发送 HTTP 与 HTTPS 请求，包含 GET、带 JSON 正文的 POST、HTTPS 如何加载 CA 证书，以及使用 cJSON 的 `cJSON_ParseWithLength` 解析响应 JSON。可运行示例位于 `examples/protocols/http_client` 与 `examples/protocols/https_client`。

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
- cJSON：`src/libcjson/cJSON/cJSON.h`
- [示例索引](../../examples/demo-generic-examples)
- [TAL Network API 参考](tal-network-api)
