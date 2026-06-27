---
title: MCP 服务端
---

MCP（Model Context Protocol，模型上下文协议）让设备端 AI 不再只是"说话"，而是把设备自身的函数当作**工具**来调用——读取传感器、修改设置、触发执行器。`ai_mcp` 就是运行在设备端的 MCP 服务端：你把函数注册成工具，AI 需要时由服务端来执行它们。

每个工具都有名称、供 AI 判断何时调用的描述、带类型的**输入属性**（参数），以及回传给 AI 的**返回值**。服务端使用 JSON-RPC 2.0，遵循 [Model Context Protocol](https://modelcontextprotocol.io/specification/2024-11-05) 的 `2024-11-05` 版本。

:::note
本页讲的是运行在固件内部的**设备端** MCP 服务端。云端 MCP 服务端在 AI 智能体平台的 MCP 管理中单独配置。本服务端暴露的是你眼前这台设备的硬件。
:::

## 为什么需要它

没有 MCP，AI 只能用语言回答。有了 MCP，同一个 AI 就能对设备做动作：因为你说太吵就调低音量、听到访客就拍张照、被问到时报出固件版本。你只写一次函数，AI 会根据你给的描述判断何时调用。

## 整体协作关系

```mermaid
flowchart LR
    AI[设备端 AI] -->|tools/call| Server[ai_mcp 服务端]
    Server -->|调用| Tool[你的工具回调]
    Tool -->|读取 / 执行| HW[设备硬件]
    Tool -->|返回值| Server
    Server -->|结果| AI
```

## 生命周期

`ai_mcp_init` 是应用唯一需要发起的调用。它订阅 MQTT 连接事件，连接成功后启动服务端并注册[内置工具](ai-mcp-tools)。底层的 `ai_mcp_server_*` 系列则用于手动构建服务端或添加你自己的工具。

| 函数 | 参数 | 作用 |
|------|------|------|
| `ai_mcp_init` | — | 订阅 MQTT 连接事件；连接后启动服务端并注册内置工具。 |
| `ai_mcp_deinit` | — | 销毁服务端并释放其资源。 |
| `ai_mcp_server_init` | `name`、`version` | 初始化服务端。`name` 为服务端（开发板）名称，`version` 为版本字符串。 |
| `ai_mcp_server_destroy` | — | 销毁服务端及所有已注册工具。 |
| `ai_mcp_server_add_tool` | `tool`——`MCP_TOOL_T *` | 向服务端添加一个工具，所有权移交给服务端。 |
| `ai_mcp_server_find_tool` | `name` | 返回该名称对应的已注册工具，找不到则返回 `NULL`。 |

头文件：`ai_mcp.h`（`ai_mcp_init` / `ai_mcp_deinit`）与 `ai_mcp_server.h`（其余全部）。所有可能失败的函数都返回 `OPERATE_RET`（成功为 `OPRT_OK`）。

:::warning
只能在 MQTT 连接成功后初始化服务端。`ai_mcp_init` 通过订阅 `EVENT_MQTT_CONNECTED` 已经替你做了这件事。仅当你自行管理该事件时，才需要直接调用 `ai_mcp_server_init`。
:::

## 工具

一个**工具**把回调与名称、描述绑定在一起。AI 调用工具时回调即运行：读取输入属性、完成工作、填好返回值。

```c
typedef OPERATE_RET (*MCP_TOOL_CALLBACK)(const MCP_PROPERTY_LIST_T *properties,
                                         MCP_RETURN_VALUE_T *ret_val,
                                         void *user_data);
```

`MCP_TOOL_T` 保存工具的 `name`、`description`、`properties`、`callback` 与 `user_data`。

| 函数 | 参数 | 作用 |
|------|------|------|
| `ai_mcp_tool_register` | `name`、`description`、`callback`、`user_data`、`...` | 一次调用即创建工具并注册到服务端。可变参数为 `MCP_PROPERTY_DEF_T *` 属性定义，以 `NULL` 结尾。 |
| `ai_mcp_tool_create` | `name`、`description`、`callback`、`user_data` | 仅创建工具而不注册。返回 `MCP_TOOL_T *` 或 `NULL`。 |
| `ai_mcp_tool_add_property` | `tool`、`prop` | 向你创建的工具添加一个属性。 |
| `ai_mcp_tool_destroy` | `tool` | 释放你创建但未交给服务端的工具。 |

:::tip
用点号命名工具，例如 `device.audio.set_volume`，并把描述写得像向一个人解释这个工具一样——AI 会读它来决定何时、如何调用工具。
:::

便捷宏 `AI_MCP_TOOL_ADD(name, description, callback, user_data, ...)` 会调用 `ai_mcp_tool_register` 并替你补上 `NULL` 结尾，因此可直接传入属性定义。用 `MCP_PROP_*` 系列宏来构造这些定义：

| 宏 | 定义 |
|----|------|
| `MCP_PROP_INT(name, desc)` | 整数参数。 |
| `MCP_PROP_INT_DEF(name, desc, def)` | 带默认值的整数。 |
| `MCP_PROP_INT_RANGE(name, desc, min, max)` | 限定在 `[min, max]` 的整数。 |
| `MCP_PROP_INT_DEF_RANGE(name, desc, def, min, max)` | 带默认值与范围的整数。 |
| `MCP_PROP_BOOL(name, desc)` / `MCP_PROP_BOOL_DEF(name, desc, def)` | 布尔参数。 |
| `MCP_PROP_STR(name, desc)` / `MCP_PROP_STR_DEF(name, desc, def)` | 字符串参数。 |

## 属性

**属性**是工具的一个带类型的输入参数。`MCP_PROPERTY_T` 保存属性的 `name`、`type`（`MCP_PROPERTY_TYPE_E`）、`description`、可选默认值，以及——针对整数——可选的 `[min_val, max_val]` 范围。一个 `MCP_PROPERTY_LIST_T` 最多容纳 `MCP_MAX_PROPERTIES`（16）个属性。

`MCP_PROPERTY_TYPE_E` 取值为 `MCP_PROPERTY_TYPE_BOOLEAN`、`MCP_PROPERTY_TYPE_INTEGER` 或 `MCP_PROPERTY_TYPE_STRING`。

当你不用 `MCP_PROP_*` 宏、而是手动构建属性列表时使用以下函数：

| 函数 | 参数 | 作用 |
|------|------|------|
| `ai_mcp_property_create` | `name`、`type`、`description` | 创建属性。返回 `MCP_PROPERTY_T *` 或 `NULL`。 |
| `ai_mcp_property_set_default_bool` | `prop`、`value` | 设置布尔默认值。 |
| `ai_mcp_property_set_default_int` | `prop`、`value` | 设置整数默认值。 |
| `ai_mcp_property_set_default_str` | `prop`、`value` | 设置字符串默认值。 |
| `ai_mcp_property_set_range` | `prop`、`min_val`、`max_val` | 为整数属性限定范围。 |
| `ai_mcp_property_destroy` | `prop` | 释放一个属性。 |
| `ai_mcp_property_list_init` | `list` | 初始化一个空属性列表。 |
| `ai_mcp_property_list_add` | `list`、`prop` | 向列表添加一个属性。 |
| `ai_mcp_property_list_find` | `list`、`name` | 按名称查找属性。 |
| `ai_mcp_property_list_destroy` | `list` | 释放列表中的所有属性。 |

:::note
在回调内部，AI 为每个属性传入的值放在 `prop->default_val` 中——例如整数为 `prop->default_val.int_val`。按 `name` 匹配属性、检查 `type`，再读取对应的联合体字段。
:::

## 返回值

**返回值**是工具回传给 AI 的内容。`MCP_RETURN_VALUE_T` 保存 `type`（`MCP_RETURN_TYPE_E`）及对应数据。

`MCP_RETURN_TYPE_E` 取值为 `MCP_RETURN_TYPE_BOOLEAN`、`MCP_RETURN_TYPE_INTEGER`、`MCP_RETURN_TYPE_STRING`、`MCP_RETURN_TYPE_JSON` 或 `MCP_RETURN_TYPE_IMAGE`。

| 函数 | 参数 | 作用 |
|------|------|------|
| `ai_mcp_return_value_init` | `ret_val`、`type` | 把返回值初始化为某种类型。 |
| `ai_mcp_return_value_set_bool` | `ret_val`、`value` | 返回一个布尔值。 |
| `ai_mcp_return_value_set_int` | `ret_val`、`value` | 返回一个整数。 |
| `ai_mcp_return_value_set_str` | `ret_val`、`value` | 返回一个字符串（内部会复制）。 |
| `ai_mcp_return_value_set_json` | `ret_val`、`json` | 返回一个 `cJSON` 对象（所有权移交）。 |
| `ai_mcp_return_value_set_image` | `ret_val`、`mime_type`、`data`、`data_len` | 返回一张图片，数据会经 Base64 编码用于传输。 |
| `ai_mcp_return_value_cleanup` | `ret_val` | 释放返回值占用的内存。 |

图片的 MIME 类型传入 `MCP_IMAGE_MIME_TYPE_JPEG` 或 `MCP_IMAGE_MIME_TYPE_PNG`。

## 完整示例

定义一个上报门是否打开的工具，给它一个布尔输入属性和一个布尔返回值并注册，让 AI 可以调用。`AI_MCP_TOOL_ADD` 宏一次完成创建与注册：

```c
#include "ai_mcp_server.h"

// AI 想知道门的状态时调用本回调。它读取可选的 "refresh" 属性，
// 采样传感器，返回一个布尔值。
static OPERATE_RET door_is_open_cb(const MCP_PROPERTY_LIST_T *properties,
                                   MCP_RETURN_VALUE_T *ret_val,
                                   void *user_data)
{
    bool refresh = false;
    for (int i = 0; i < properties->count; i++) {
        MCP_PROPERTY_T *prop = properties->properties[i];
        if (strcmp(prop->name, "refresh") == 0 && prop->type == MCP_PROPERTY_TYPE_BOOLEAN) {
            refresh = prop->default_val.bool_val;
            break;
        }
    }

    bool open = read_door_sensor(refresh);   // 你的硬件读取
    ai_mcp_return_value_set_bool(ret_val, open);
    return OPRT_OK;
}

OPERATE_RET register_door_tool(void)
{
    return AI_MCP_TOOL_ADD(
        "device.door.is_open",
        "Report whether the door is currently open. Returns true if open.",
        door_is_open_cb,
        NULL,
        MCP_PROP_BOOL_DEF("refresh", "Re-read the sensor instead of using the cached value.", false));
}
```

在服务端启动后调用 `register_door_tool()`——例如在你自己的 MQTT 连接处理函数里，与 `ai_mcp_init()` 一起。

## 相关文档

- [内置 MCP 工具](ai-mcp-tools)——随框架注册的工具，可作为参考实现
- [AI Agent](ai-agent)——设备如何与涂鸦 AI 云端通信
- [组件框架](ai-components.md)——`ai_mcp` 在 AI 框架中的位置
- [多模态数据流](../multimodal-data-flow)——输入与输出在设备中的流转方式
