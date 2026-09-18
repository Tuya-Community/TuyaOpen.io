---
title: HTTP 및 HTTPS 클라이언트 자습서
description: "TuyaOpen의 HTTP 및 HTTPS 클라이언트 튜토리얼: HTTP client request와 GET/POST 요청을 보내고, HTTPS CA certs를 구성하고, cJSON과 JSON을 파."
keywords:
  - http client
  - https
  - http_client_request
  - json
  - tuyaopen peripheral
---

## 제품정보
이 튜토리얼은 일반 HTTP 및 HTTPS 요청을 포함합니다.`http_client_request`이름 *`http_client_free`이름 *`http_client_interface.h`. 그것은 요청 및 응답 structs (필드, 요청 헤더, 쿼리 args에`path`, 응답 상태 및 헤더 블록), 다음 JSON body, HTTPS CA 설정 및 CJSON과 JSON 패싱과 GET 및 POST를 보여줍니다 (`cJSON_ParseWithLength`). Runnable 표본은 아래에 있습니다`examples/protocols/http_client`이름 *`examples/protocols/https_client`.

## 자주 묻는 질문
- [환경 설정](../../quick-start/enviroment-setup)
- [Wi-Fi 스테이션 튜토리얼](wifi-station-tutorial)

## 제품 정보
- 예 프로젝트의 Wi-Fi 또는 유선 네트워킹 및 HTTP 클라이언트 지원과 함께 보드 또는 구성.
- 테스트 호스트에 도달 할 수있는 네트워크 (samples default to`httpbin.org`).
- JSON 예제: 애플리케이션은 SDK cJSON 라이브러리(TuyaOpen ships it under)를 연결해야 합니다.`src/libcjson`). CJSON을 사용하는 다른 예와 같은 앱 CMake 또는 Kconfig에 구성품을 추가하면 이미 포함되지 않습니다.

## 한국어
1. 기타`examples/protocols/http_client`TuyaOpen repo에서.

2. Wi-Fi 자격 설정`src/example_http_client.c`현재 위치`ENABLE_WIFI`에 있다.

3. 구조와 섬광:

   ```bash
   cd examples/protocols/http_client
   tos.py config choice
   tos.py build
   ```

4. 로그를 모니터링합니다. 링크가 올 때, 샘플은 GET을 보내`httpbin.org/get`, 몸을 인쇄하고, 통화`http_client_free`.

**확장된 결과:** 로그는 DNS, TCP 연결 및 테스트 엔드포인트의 응답 바디를 보여줍니다.

## 요청 및 응답 API
유형과 기능은 정의됩니다.`http_client_interface.h`.

### `http_client_request_t`(사용 요청)
|제품정보|제품정보|제품정보|
| ----- | ---- | ---- |
| `host` | `const char *` |서버 호스트 이름 (현장 없음). 예:`httpbin.org`. |
| `port` | `uint16_t` |TCP 포트. 제품 정보`80`HTTP 또는`443`HTTPS, 또는`0`클라이언트 기본값 (80 / 443)를 하자.|
| `path` | `const char *` |자주 묻는 질문`/`. ** 쿼리 문자열:** 여기에 추가, 예를 들어.`/get?foo=bar&count=3`. 당신은 **URL-encode ** 그들은 예약 된 문자를 포함 한 경우 값.|
| `method` | `const char *` |방법 이름, e.g.`"GET"`, `"POST"`, `"PUT"`, `"DELETE"`. |
| `headers` | `http_client_header_t *` |요청 헤더 항목의 배열 (아래 참조). 수 있습니다`NULL`이름 *`headers_count`이름 *`0`. |
| `headers_count` | `uint8_t` |항목 번호`headers`. |
| `body` | `const uint8_t *` |POST/PUT에 대한 신체 요청; 빈 문자열을 사용`body_length == 0`견적 요청|
| `body_length` | `size_t` |길이의`body`파일 형식|
| `timeout_ms` | `uint32_t` |밀리 초의 전체 타임 아웃.|
| `cacert` | `const uint8_t *` |TLS를 위한 PEM CA blob;`NULL`일반 HTTP의 경우.|
| `cacert_len` | `size_t` |길이의`cacert`. |
| `tls_no_verify` | `bool` |사실, TLS는 동료 검증(bring-up only; avoid in production)을 건너갈 수 있습니다.|

### 요청 헤더 (`http_client_header_t`)
각 우두머리는 1개의 열쇠/값 쌍입니다:

|제품정보|제품정보|제품정보|
| ----- | ---- | ---- |
| `key` | `const char *` |헤더 이름, 예.`"Content-Type"`, `"Authorization"`, `"Accept"`. |
| `value` | `const char *` |헤더 값, e.g.`"application/json"`. |

예제 배열:

```c
http_client_header_t headers[] = {
    {.key = "Content-Type", .value = "application/json"},
    {.key = "Accept", .value = "application/json"},
};
```

SDK는 HTTP 요청 (Core HTTP 클라이언트를 통해 내부적으로`HTTPClient_AddHeader`경로).

### `http_client_response_t`(응답)
성공 후`http_client_request`, 클라이언트 채우기:

|제품정보|제품정보|제품정보|
| ----- | ---- | ---- |
| `status_code` | `uint16_t` |HTTP 상태 코드, 예.`200`, `404`, `500`. |
| `headers` | `const uint8_t *` |get buffer (status line and header field as receive; not a parsed map)에서 **raw 응답 헤더 블록 **의 시작.|
| `headers_length` | `size_t` |그 헤더 블록의 바이트 길이.|
| `body` | `const uint8_t *` |응답 몸의 시작.|
| `body_length` | `size_t` |바이트의 몸 길이. null-terminated이 아닐 수 있습니다.|
| `buffer` | `uint8_t *` |응답을 위한 버퍼를 소유하기 (배치에 대한 간단한 세부 사항; 헤더 코멘트를 참조).|
| `buffer_length` | `size_t` |총 크기`buffer`. |

본문으로 응답 헤더를 검사, 치료`headers` + `headers_length`opaque 바이트 범위 (ASCII)로. 예제 디버그 인쇄 :

```c
if (http_response.headers && http_response.headers_length > 0) {
    PR_DEBUG_RAW("response headers (%u bytes):\n%.*s\n",
                 (unsigned int)http_response.headers_length,
                 (int)http_response.headers_length,
                 (const char *)http_response.headers);
}
```

구조 사용 (e.g. 읽기`Content-Type`), 자신을 막거나 만 사용`body` + `status_code`API에 대해 충분히.

항상 전화`http_client_free`할 때; 그것은 응답을 위해 할당 된 메모리를 방출합니다.

## 자주 묻는 질문
배송 예는 링크 업 콜백 (간단한) 내부의이 모양을 따릅니다.

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

상류 표본 잎`.port`unset (zero) 및 아직도 많은 목표에 작동; 설정`.port = 80`intent 지시어를 사용한다.

## JSON body와 POST 요청
설치하기`method`으로`"POST"`, 점`path`몸을 받아들이는 endpoint에서 (예를 들면`httpbin.org/post`), 채우기`body`이름 *`body_length`. 계속`Content-Type: application/json`헤더 목록에서:

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

## HTTPS 요청
제품 정보`examples/protocols/https_client`. HTTP와 비교,`user_main`자주 묻는 질문`tuya_tls_init()`이름 *`tuya_register_center_init()`, 그리고 요구는 TLS 물자를 공급합니다:

- `tuya_iotdns_query_domain_certs(host, &cacert, &cacert_len)`호스트에 대한 CA를 얻는다.
- `.port = 443`, `.cacert`이름 *`.cacert_len`으로`http_client_request_t`.

연결 후에 본:

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

`http_client_request_t`또한 있습니다`tls_no_verify`를 위해 생산 트래픽을 위해 검증을 활성화하고 적절한 신뢰 저장소를 사용합니다.

HTTPS에서 POST는 동일합니다`method`, `path`, `body`·`body_length`일반 HTTP; TLS 필드와 포트는 다릅니다.

## 응답에서 JSON을 파
TuyaOpen (hooks, 소유권, 건물 객체)의 cJSON에 대한 구조화 된 소개[cJSON 추락 코스](cjson-tutorial).

응답은 null-terminated 일 수 없습니다. 공지사항`cJSON_ParseWithLength`이름 *`http_response.body`이름 *`http_response.body_length`.

POST에서`httpbin.org/post`, HTTP 응답의 JSON 몸은 포함`json`제출 된 필드를 미러링하는 개체 :

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

요청 몸에 JSON을 구축하려면, 사용할 수 있습니다.`cJSON_CreateObject`, `cJSON_AddStringToObject`, 다음`cJSON_PrintUnformatted`, 문자열을 보냅니다`body`, and free the print string with allocator your cJSON hooks use (often)`tal_free`또는`free`구성에 따라).

## 구현 노트
- HTTP 및 HTTPS 작업을 실행`NETMGR_LINK_UP`(예: 사용`__link_status_cb`).
- 항상 전화`http_client_free`성공 후`http_client_request`.
- 이름 *[TAL 네트워크 API 참조](tal-network-api)소켓과 DNS를 위해.

## 이름 *
- HTTP 소스:`examples/protocols/http_client/src/example_http_client.c`
- HTTPS 소스:`examples/protocols/https_client/src/example_https_client.c`
- 머리:`src/libhttp/include/http_client_interface.h`
- cJSON:`src/libcjson/cJSON/cJSON.h`; [cJSON 추락 코스](cjson-tutorial)
- [예제 인덱스](../../examples/demo-generic-examples)
- [TAL 네트워크 API 참조](tal-network-api)
