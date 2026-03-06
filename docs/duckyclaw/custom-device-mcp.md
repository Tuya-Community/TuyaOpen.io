---
title: Custom Device MCP (Hardware Skills Guide)
---

# DuckyClaw - Custom Device MCP (Hardware Skills Guide)

This guide describes how to create custom device MCP tools (hardware skills) for DuckyClaw. It is for app developers who want to connect cameras, sensors, displays, and other peripherals as skills that plug into the same agentic framework—so the agent can reason over sensor data, trigger actions on hardware, and combine device inputs with cloud AI.

## Prerequisites

- Completed [Environment setup](/docs/quick-start/enviroment-setup) for your target platform (Tuya T5AI, ESP32, Raspberry Pi, or Linux).
- Basic familiarity with the [MCP Server](/docs/applications/tuya.ai/ai-components/ai-mcp-server) (tool discovery and execution) and [MCP Tools](/docs/applications/tuya.ai/ai-components/ai-mcp-tools) (predefined device tools).
- A DuckyClaw-capable board or runtime. See the [DuckyClaw project](https://github.com/tuya/DuckyClaw) for supported platforms.

## Requirements

- **Hardware**: A supported board (e.g. Tuya T5AI Module, ESP32, Raspberry Pi 4/5, or Linux ARM/x64) and any peripherals you want to expose as skills (camera, sensors, display, etc.).
- **Software**: TuyaOpen SDK with MCP support; `ENABLE_COMP_AI_MCP` enabled in your configuration.
- **License key**: A valid Tuya license key is required for Tuya cloud access.
- **Optional**: TuyaOpen drivers or APIs for the peripherals you are integrating (e.g. sensor driver, display driver).


## Overview: Device MCP in DuckyClaw

In DuckyClaw, **device MCP** means the device runs an MCP server and exposes **tools** that the agent (local or cloud) can discover and call. Each tool is a function with a name, description, input parameters, and a callback that runs on the device. Built-in device MCP tools in DuckyClaw include:

- **CRON**: Scheduled device tasks and heartbeating.
- **FILE**: File operations on the device.
- **IoT Device Control**: Management of Tuya-connected devices.
- **EXEC** (e.g. Raspberry Pi): Remote code execution.

When you build a **custom device MCP** (hardware skill), you define one or more new tools that use your hardware—for example, "read temperature," "capture image," or "set display text." The agent sees these tools in the same way as the built-in ones and can call them in the same loop.

## Development steps

### 1. Enable MCP and initialize the server

Ensure the MCP component is enabled in your config (e.g. `ai_mcp/Kconfig` → `ENABLE_COMP_AI_MCP`). In your application startup, after MQTT (or the transport your DuckyClaw stack uses) is ready, initialize the MCP server and register your tools.

```c
#include "ai_mcp_server.h"

OPERATE_RET init_my_mcp(void)
{
    TUYA_CALL_ERR_RETURN(ai_mcp_server_init("My Device MCP", "1.0"));
    // Register custom tools (step 2)
    return OPRT_OK;
}
```

Details: [MCP Server – Initialize MCP server](/docs/applications/tuya.ai/ai-components/ai-mcp-server#initialize-mcp-server).

### 2. Define a tool callback

Implement a callback that receives input properties, performs your hardware or logic, and sets the return value. Use the property helpers to read arguments (e.g. `MCP_PROPERTY_TYPE_INTEGER`, `MCP_PROPERTY_TYPE_STRING`).

```c
static OPERATE_RET my_sensor_read_cb(const MCP_PROPERTY_LIST_T *properties,
                                     MCP_RETURN_VALUE_T *ret_val,
                                     void *user_data)
{
    (void)properties;
    (void)user_data;
    // Read from your sensor (TuyaOpen driver or HAL)
    int value = my_sensor_get_value();
    ai_mcp_return_value_set_int(ret_val, value);
    return OPRT_OK;
}
```

Return types: use `ai_mcp_return_value_set_bool`, `ai_mcp_return_value_set_int`, `ai_mcp_return_value_set_str`, `ai_mcp_return_value_set_json`, or `ai_mcp_return_value_set_image` as appropriate. Clean up with `ai_mcp_return_value_cleanup` when the return value uses dynamically allocated data.

### 3. Register the tool with properties

Use the `AI_MCP_TOOL_ADD` macro to create and register the tool. Define input properties with the `MCP_PROP_*` macros so the agent knows what parameters to pass.

```c
TUYA_CALL_ERR_RETURN(AI_MCP_TOOL_ADD(
    "sensor_temperature_read",
    "Read the current temperature from the onboard sensor in degrees Celsius.",
    my_sensor_read_cb,
    NULL
));
```

Example with parameters:

```c
TUYA_CALL_ERR_RETURN(AI_MCP_TOOL_ADD(
    "display_show_text",
    "Show text on the device display.",
    display_show_text_cb,
    NULL,
    MCP_PROP_STR("text", "The text to display."),
    MCP_PROP_INT_DEF_RANGE("line", "Line number (1-4).", 1, 1, 4),
    MCP_PROP_END
));
```

Reference: [MCP Server – Attribute definition macro](/docs/applications/tuya.ai/ai-components/ai-mcp-server#attribute-definition-macro) and [Development steps](/docs/applications/tuya.ai/ai-components/ai-mcp-server#development-steps).

### 4. Wire message handling

Ensure incoming MCP messages (e.g. JSON-RPC over the same channel DuckyClaw uses for the agent) are passed to the server:

```c
ai_mcp_server_parse_message(json, NULL);
```

This is typically done in the message or MQTT callback that your DuckyClaw/AI agent stack uses. The server will dispatch to the correct tool callback and return the response.

### 5. Build and verify

Build your application for the target board, flash or deploy, and run DuckyClaw. Confirm that the agent (or cloud) can list your new tool and invoke it. Expected outcome: the tool appears in the tool list and returns the correct type of value (integer, string, JSON, etc.) when called.

## Integration with TuyaOpen drivers

For hardware skills, use TuyaOpen drivers and APIs where available so your tool callbacks stay portable across boards. Access peripherals through the TKL or driver layer (e.g. ADC for a sensor, GPIO for a relay) rather than board-specific code when possible. This aligns with the "build on TuyaOpen drivers and APIs for fast prototyping" approach described on the [DuckyClaw page](/duckyclaw).

:::info
[Generic examples](/docs/examples/demo-generic-examples) include sample code to help you validate hardware interfaces and minimal interface code. Use them to test peripherals (e.g. GPIO, UART, ADC) before wiring them into your device MCP tool callbacks.
:::

## References

- [MCP Server](/docs/applications/tuya.ai/ai-components/ai-mcp-server) — Device MCP access, tool registration, and API reference.
- [MCP Tools](/docs/applications/tuya.ai/ai-components/ai-mcp-tools) — Predefined device tools and initialization.
- [Generic examples](/docs/examples/demo-generic-examples) — Validate hardware interfaces and minimal interface code examples.
- [DuckyClaw project](https://github.com/tuya/DuckyClaw) — Repository and built-in device MCP tools (CRON, FILE, IoT, EXEC).
