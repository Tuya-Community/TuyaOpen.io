---
title: MCP Server
---

MCP (Model Context Protocol) lets the on-device AI call your device's own functions as **tools** — read a sensor, change a setting, trigger an actuator — instead of only talking. `ai_mcp` is the device-side MCP server: you register your functions as tools, and the server runs them when the AI asks.

Each tool has a name, a description the AI reads to decide when to call it, typed **input properties** (parameters), and a **return value** the AI receives back. The server speaks JSON-RPC 2.0 and follows the [Model Context Protocol](https://modelcontextprotocol.io/specification/2024-11-05) `2024-11-05` revision.

:::note
This page documents the **on-device** MCP server that runs inside your firmware. Cloud-side MCP servers are configured separately under the AI agent platform's MCP management. This server exposes the hardware in front of you.
:::

## Why use this

Without MCP, the AI can only answer in words. With MCP, the same AI can act on the device: turn the volume down because you said it is too loud, take a photo when it hears a visitor, or report the firmware version when asked. You write the function once; the AI decides when to call it from the description you give.

## How it fits together

```mermaid
flowchart LR
    AI[On-device AI] -->|tools/call| Server[ai_mcp server]
    Server -->|invoke| Tool[Your tool callback]
    Tool -->|read / actuate| HW[Device hardware]
    Tool -->|return value| Server
    Server -->|result| AI
```

## Lifecycle

`ai_mcp_init` is the one call your application makes. It subscribes to the MQTT-connected event and, on connection, brings up the server and registers the [built-in tools](ai-mcp-tools). The `ai_mcp_server_*` calls underneath are what you use to build a server by hand or to add your own tools.

| Function | Parameters | Purpose |
|----------|------------|---------|
| `ai_mcp_init` | — | Subscribe to MQTT-connected; on connect, start the server and register built-in tools. |
| `ai_mcp_deinit` | — | Destroy the server and release its resources. |
| `ai_mcp_server_init` | `name`, `version` | Initialize the server. `name` is the server (board) name; `version` is its version string. |
| `ai_mcp_server_destroy` | — | Destroy the server and every registered tool. |
| `ai_mcp_server_add_tool` | `tool` — an `MCP_TOOL_T *` | Add a tool to the server. Ownership transfers to the server. |
| `ai_mcp_server_find_tool` | `name` | Return the registered tool with that name, or `NULL`. |

Headers: `ai_mcp.h` (`ai_mcp_init` / `ai_mcp_deinit`) and `ai_mcp_server.h` (everything else). Every function that can fail returns `OPERATE_RET` (`OPRT_OK` on success).

:::warning
Initialize the server only after MQTT connects. `ai_mcp_init` already does this for you by subscribing to `EVENT_MQTT_CONNECTED`. Call `ai_mcp_server_init` directly only if you manage that event yourself.
:::

## Tools

A **tool** pairs a callback with a name and a description. The callback runs when the AI calls the tool; it reads the input properties, does the work, and fills in a return value.

```c
typedef OPERATE_RET (*MCP_TOOL_CALLBACK)(const MCP_PROPERTY_LIST_T *properties,
                                         MCP_RETURN_VALUE_T *ret_val,
                                         void *user_data);
```

`MCP_TOOL_T` holds the tool's `name`, `description`, `properties`, `callback`, and `user_data`.

| Function | Parameters | Purpose |
|----------|------------|---------|
| `ai_mcp_tool_register` | `name`, `description`, `callback`, `user_data`, `...` | Create a tool and register it on the server in one call. The variadic arguments are `MCP_PROPERTY_DEF_T *` property definitions, terminated by `NULL`. |
| `ai_mcp_tool_create` | `name`, `description`, `callback`, `user_data` | Create a tool without registering it. Returns `MCP_TOOL_T *` or `NULL`. |
| `ai_mcp_tool_add_property` | `tool`, `prop` | Add one property to a tool you created. |
| `ai_mcp_tool_destroy` | `tool` | Free a tool you created but did not hand to the server. |

:::tip
Name tools with dots, like `device.audio.set_volume`, and write the description the way you would explain the tool to a person — the AI reads it to decide when and how to call the tool.
:::

The convenience macro `AI_MCP_TOOL_ADD(name, description, callback, user_data, ...)` calls `ai_mcp_tool_register` and appends the `NULL` terminator for you, so you can pass property definitions directly. Build those definitions with the `MCP_PROP_*` macros:

| Macro | Defines |
|-------|---------|
| `MCP_PROP_INT(name, desc)` | An integer parameter. |
| `MCP_PROP_INT_DEF(name, desc, def)` | An integer with a default. |
| `MCP_PROP_INT_RANGE(name, desc, min, max)` | An integer bounded to `[min, max]`. |
| `MCP_PROP_INT_DEF_RANGE(name, desc, def, min, max)` | An integer with a default and a range. |
| `MCP_PROP_BOOL(name, desc)` / `MCP_PROP_BOOL_DEF(name, desc, def)` | A boolean parameter. |
| `MCP_PROP_STR(name, desc)` / `MCP_PROP_STR_DEF(name, desc, def)` | A string parameter. |

## Properties

A **property** is one typed input parameter of a tool. `MCP_PROPERTY_T` carries the property's `name`, `type` (an `MCP_PROPERTY_TYPE_E`), `description`, optional default, and — for integers — an optional `[min_val, max_val]` range. A `MCP_PROPERTY_LIST_T` holds up to `MCP_MAX_PROPERTIES` (16) of them.

`MCP_PROPERTY_TYPE_E` is one of `MCP_PROPERTY_TYPE_BOOLEAN`, `MCP_PROPERTY_TYPE_INTEGER`, or `MCP_PROPERTY_TYPE_STRING`.

Use these when you build a property list by hand instead of with the `MCP_PROP_*` macros:

| Function | Parameters | Purpose |
|----------|------------|---------|
| `ai_mcp_property_create` | `name`, `type`, `description` | Create a property. Returns `MCP_PROPERTY_T *` or `NULL`. |
| `ai_mcp_property_set_default_bool` | `prop`, `value` | Set a boolean default. |
| `ai_mcp_property_set_default_int` | `prop`, `value` | Set an integer default. |
| `ai_mcp_property_set_default_str` | `prop`, `value` | Set a string default. |
| `ai_mcp_property_set_range` | `prop`, `min_val`, `max_val` | Bound an integer property to a range. |
| `ai_mcp_property_destroy` | `prop` | Free a property. |
| `ai_mcp_property_list_init` | `list` | Initialize an empty property list. |
| `ai_mcp_property_list_add` | `list`, `prop` | Add a property to the list. |
| `ai_mcp_property_list_find` | `list`, `name` | Find a property by name. |
| `ai_mcp_property_list_destroy` | `list` | Free every property in the list. |

:::note
Inside a callback, the value the AI passed for each property arrives in `prop->default_val` — for example `prop->default_val.int_val` for an integer. Match the property by `name`, check its `type`, and read the matching union field.
:::

## Return values

A **return value** is what the tool hands back to the AI. `MCP_RETURN_VALUE_T` carries a `type` (an `MCP_RETURN_TYPE_E`) and the matching data.

`MCP_RETURN_TYPE_E` is one of `MCP_RETURN_TYPE_BOOLEAN`, `MCP_RETURN_TYPE_INTEGER`, `MCP_RETURN_TYPE_STRING`, `MCP_RETURN_TYPE_JSON`, or `MCP_RETURN_TYPE_IMAGE`.

| Function | Parameters | Purpose |
|----------|------------|---------|
| `ai_mcp_return_value_init` | `ret_val`, `type` | Initialize a return value to a type. |
| `ai_mcp_return_value_set_bool` | `ret_val`, `value` | Return a boolean. |
| `ai_mcp_return_value_set_int` | `ret_val`, `value` | Return an integer. |
| `ai_mcp_return_value_set_str` | `ret_val`, `value` | Return a string (duplicated internally). |
| `ai_mcp_return_value_set_json` | `ret_val`, `json` | Return a `cJSON` object (ownership transfers). |
| `ai_mcp_return_value_set_image` | `ret_val`, `mime_type`, `data`, `data_len` | Return an image; the data is Base64-encoded for transport. |
| `ai_mcp_return_value_cleanup` | `ret_val` | Free any memory held by the return value. |

For images, pass `MCP_IMAGE_MIME_TYPE_JPEG` or `MCP_IMAGE_MIME_TYPE_PNG` as the MIME type.

## Worked example

Define one tool that reports whether a door is open, register it with a boolean input property and a boolean return value, and let the AI call it. The `AI_MCP_TOOL_ADD` macro creates and registers the tool in a single call:

```c
#include "ai_mcp_server.h"

// The AI calls this when it wants the door state. It reads the optional
// "refresh" property, samples the sensor, and returns a boolean.
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

    bool open = read_door_sensor(refresh);   // your hardware read
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

Call `register_door_tool()` after the server is up — for example from your own MQTT-connected handler, alongside `ai_mcp_init()`.

## See also

- [Built-in MCP tools](ai-mcp-tools) — the tools that ship registered, as reference implementations
- [AI Agent](ai-agent) — how the device talks to the Tuya AI cloud
- [Component Framework](ai-components.md) — where `ai_mcp` sits in the AI framework
- [Multimodal data flow](../multimodal-data-flow) — how input and output move through the device
