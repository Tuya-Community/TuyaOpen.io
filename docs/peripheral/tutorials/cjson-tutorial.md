---
title: cJSON crash course
---

## Overview

TuyaOpen ships **cJSON** (Dave Gamble, MIT) under `TuyaOpen/src/libcjson/cJSON/`. Cloud demos, AI apps, and protocol examples use it to parse MQTT/HTTP payloads and build request bodies. This tutorial gives a **minimal, correct usage path** on TuyaOpen: hooks, parse, traverse, print, and free.

**Audience:** C developers who already build a TuyaOpen app and need JSON without pulling in another parser.

## Prerequisites

- [Environment setup](../../quick-start/enviroment-setup) and a project that compiles.
- Basic C (pointers, `NULL` checks).

## Requirements

- `#include "cJSON.h"` (header path from the **libcjson** component in your app’s include path).
- Your **CMake / Kconfig** must link the cJSON library (same as other apps that use JSON; see `examples/protocols/http_client` or `apps/tuya_cloud/switch_demo`).

## Steps

### 1. Optional — route cJSON allocations through TAL

Many TuyaOpen apps call **`cJSON_InitHooks`** once during startup so **`cJSON_Print`** and **`cJSON_Parse`** use **`tal_malloc` / `tal_free`** (or PSRAM variants when large JSON is expected):

```c
#include "cJSON.h"
#include "tal_api.h"

void app_json_init(void)
{
    cJSON_InitHooks(&(cJSON_Hooks){.malloc_fn = tal_malloc, .free_fn = tal_free});
}
```

Pass **`NULL`** to `cJSON_InitHooks` to restore default libc `malloc`/`free`. If you switch between **PSRAM** and internal RAM for different phases, match **allocator** to where you free **`cJSON_Print`** output (see step 4). For background on PSRAM, see [Heap allocation and PSRAM](../memory/heap-allocation-and-psram).

:::note
`cJSON_InitHooks` affects **global** allocator choice for cJSON in that process; call it before any other cJSON API if you rely on it.
:::

### 2. Parse JSON from a buffer that may not be null-terminated

For HTTP bodies, MQTT payloads, or file chunks, use **`cJSON_ParseWithLength`** with an explicit length (see also [HTTP client tutorial](http-client-tutorial)):

```c
const char *buf = ...;
size_t len = ...;

cJSON *root = cJSON_ParseWithLength(buf, len);
if (root == NULL) {
    const char *ep = cJSON_GetErrorPtr();
    if (ep != NULL) {
        /* ep points near the failure; walk back a few chars when logging */
    }
    return;
}
/* ... use root ... */
cJSON_Delete(root);
```

For C strings that are **null-terminated**, **`cJSON_Parse`** is enough.

### 3. Read object fields with type checks

**`cJSON_GetObjectItem`** is **case-insensitive** on the key. Prefer **`cJSON_Is*`** before reading **`valuestring`** / **`valuedouble`**:

```c
cJSON *ver = cJSON_GetObjectItem(root, "version");
if (cJSON_IsString(ver)) {
    const char *s = cJSON_GetStringValue(ver); /* or ver->valuestring when non-NULL is guaranteed */
    (void)s;
}

cJSON *code = cJSON_GetObjectItem(root, "code");
if (cJSON_IsNumber(code)) {
    double d = cJSON_GetNumberValue(code);
    (void)d;
}
```

For arrays, use **`cJSON_GetArraySize`** and **`cJSON_GetArrayItem`**, or walk **`child`** links as in upstream cJSON docs.

### 4. Build JSON and send it as text

```c
cJSON *obj = cJSON_CreateObject();
if (obj == NULL) {
    return;
}
cJSON_AddStringToObject(obj, "cmd", "ping");
cJSON_AddNumberToObject(obj, "id", 42);

char *printed = cJSON_PrintUnformatted(obj);
cJSON_Delete(obj);
if (printed == NULL) {
    return;
}
/* send printed with length strlen(printed), then free with the same allocator as cJSON hooks */
tal_free(printed);
```

If hooks were **not** set to TAL, free the printed string with **`cJSON_free`** or **`free`** as appropriate for your build (see the comment block above **`cJSON_Parse`** in `cJSON.h`).

### 5. Ownership rules (avoid leaks and double-free)

- **`cJSON_Parse*`** → you own the tree → **`cJSON_Delete(root)`** when done.
- **`cJSON_Print*`** → you own the returned **`char *`** → free once with the matching allocator.
- **`cJSON_AddItemToObject`** / **`cJSON_AddItemToArray`** → the **parent** owns the child; **do not** `Delete` the child separately unless you **`Detach`** it first.

## Expected outcome

You can parse and emit JSON in a TuyaOpen app with **`cJSON_ParseWithLength`** for untrusted-length buffers, **`cJSON_InitHooks`** aligned to **`tal_malloc`/`tal_free`**, and correct **`cJSON_Delete`** / string free pairing.

## References

- Header: `TuyaOpen/src/libcjson/cJSON/cJSON.h` (upstream **1.7.16** in-tree).
- [HTTP client tutorial](http-client-tutorial) — JSON over HTTP.
- [Heap allocation and PSRAM](../memory/heap-allocation-and-psram) — when to use `tal_psram_malloc` in hooks.
- [Examples index](../../examples/demo-generic-examples) — search for `cJSON_` in `examples/` and `apps/`.
