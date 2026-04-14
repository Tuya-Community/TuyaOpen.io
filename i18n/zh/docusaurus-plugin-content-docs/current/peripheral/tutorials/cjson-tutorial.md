---
title: cJSON 快速入门
---

## 概述

TuyaOpen 在 `TuyaOpen/src/libcjson/cJSON/` 中内置 **cJSON**（Dave Gamble，MIT 许可）。云端 Demo、AI 应用与协议示例常用它解析 MQTT/HTTP 负载并构造请求体。本篇给出在 TuyaOpen 上**最小且正确**的用法：**钩子**、**解析**、**遍历**、**打印**与**释放**。

**读者对象：** 已能编译 TuyaOpen 应用、需要在设备端处理 JSON 而不引入其他解析库的 C 开发者。

## 先决条件

- 已完成 [环境搭建](../../quick-start/enviroment-setup)，且工程能成功编译。
- 具备基本 C 能力（指针、`NULL` 判断）。

## 要求

- `#include "cJSON.h"`（由应用的 **libcjson** 组件提供头文件搜索路径）。
- **CMake / Kconfig** 须链接 cJSON 库（与其他使用 JSON 的示例一致，可参考 `examples/protocols/http_client` 或 `apps/tuya_cloud/switch_demo`）。

## 步骤

### 1. 可选 — 将 cJSON 的分配器接到 TAL

许多 TuyaOpen 应用在启动时调用一次 **`cJSON_InitHooks`**，使 **`cJSON_Print`**、**`cJSON_Parse`** 使用 **`tal_malloc` / `tal_free`**（若 JSON 很大，也可在启用 **PSRAM** 时使用 **`tal_psram_malloc` / `tal_psram_free`**）：

```c
#include "cJSON.h"
#include "tal_api.h"

void app_json_init(void)
{
    cJSON_InitHooks(&(cJSON_Hooks){.malloc_fn = tal_malloc, .free_fn = tal_free});
}
```

向 **`cJSON_InitHooks`** 传入 **`NULL`** 可恢复默认的 libc `malloc`/`free`。若在不同阶段切换 **PSRAM** 与片上堆，**释放 `cJSON_Print` 结果时须与钩子使用的分配器一致**（见步骤 4）。PSRAM 背景见 [堆分配与 PSRAM](../memory/heap-allocation-and-psram)。

:::note
**`cJSON_InitHooks`** 会改变本进程内 cJSON 的**全局**分配行为；若依赖该行为，请在任何其他 cJSON API 之前调用。
:::

### 2. 解析可能没有 `\0` 结尾的缓冲

对 HTTP 正文、MQTT 负载或文件分片，应使用带长度的 **`cJSON_ParseWithLength`**（另见 [HTTP 客户端教程](http-client-tutorial)）：

```c
const char *buf = ...;
size_t len = ...;

cJSON *root = cJSON_ParseWithLength(buf, len);
if (root == NULL) {
    const char *ep = cJSON_GetErrorPtr();
    if (ep != NULL) {
        /* ep 指向失败位置附近；打日志时可向前多看几个字符 */
    }
    return;
}
/* ... 使用 root ... */
cJSON_Delete(root);
```

若输入是已保证 **`\0` 结尾** 的 C 字符串，使用 **`cJSON_Parse`** 即可。

### 3. 读对象字段前先判断类型

**`cJSON_GetObjectItem`** 对键名**大小写不敏感**。读取前请用 **`cJSON_Is*`** 判断类型，再访问 **`valuestring`** / **`valuedouble`**：

```c
cJSON *ver = cJSON_GetObjectItem(root, "version");
if (cJSON_IsString(ver)) {
    const char *s = cJSON_GetStringValue(ver); /* 或在可保证非 NULL 时用 ver->valuestring */
    (void)s;
}

cJSON *code = cJSON_GetObjectItem(root, "code");
if (cJSON_IsNumber(code)) {
    double d = cJSON_GetNumberValue(code);
    (void)d;
}
```

数组请用 **`cJSON_GetArraySize`** 与 **`cJSON_GetArrayItem`**，或按上游 cJSON 文档遍历 **`child`** 链。

### 4. 构造 JSON 并作为文本发送

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
/* 按 strlen(printed) 发送 printed，然后用与 cJSON 钩子一致的分配器释放 */
tal_free(printed);
```

若未将钩子设为 TAL，请按构建环境使用 **`cJSON_free`** 或 **`free`** 释放打印结果（见 `cJSON.h` 中 **`cJSON_Parse`** 上方注释）。

### 5. 所有权规则（避免泄漏与重复释放）

- **`cJSON_Parse*`** 得到的树由你拥有 → 用完 **`cJSON_Delete(root)`**。
- **`cJSON_Print*`** 返回的 **`char *`** 由你拥有 → 用匹配的分配器**只释放一次**。
- **`cJSON_AddItemToObject`** / **`cJSON_AddItemToArray`** 后，**父节点拥有子节点**；除非先 **`Detach`**，否则不要对子节点再单独 **`Delete`**。

## 预期结果

你能在 TuyaOpen 应用中：对无 `\0` 结尾的缓冲使用 **`cJSON_ParseWithLength`**；用与 **`tal_malloc`/`tal_free`** 一致的 **`cJSON_InitHooks`**；并正确配对 **`cJSON_Delete`** 与字符串释放。

## 参考

- 头文件：`TuyaOpen/src/libcjson/cJSON/cJSON.h`（仓库内为上游 **1.7.16**）。
- [HTTP 客户端教程](http-client-tutorial) — HTTP 场景下的 JSON。
- [堆分配与 PSRAM](../memory/heap-allocation-and-psram) — 何时在钩子中使用 `tal_psram_malloc`。
- [示例索引](../../examples/demo-generic-examples) — 在 `examples/`、`apps/` 中搜索 `cJSON_`。
