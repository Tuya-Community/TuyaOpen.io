---
title: 自定义设备 MCP（硬件技能开发指南）
---

# DuckyClaw - 自定义设备 MCP（硬件技能开发指南）

本文介绍如何为 DuckyClaw 创建自定义设备 MCP 工具（硬件技能）。面向希望将摄像头、传感器、显示屏等外设作为技能接入同一套 Agent 框架的应用开发者——使智能体能够基于传感器数据推理、在硬件上触发动作，并将设备输入与云端 AI 结合。

## 前置条件

- 已针对目标平台（Tuya T5AI、ESP32、Raspberry Pi 或 Linux）完成[环境配置](/docs/quick-start/enviroment-setup)。
- 对 [MCP Server](/docs/applications/tuya.ai/ai-components/ai-mcp-server)（工具发现与执行）与 [MCP Tools](/docs/applications/tuya.ai/ai-components/ai-mcp-tools)（预定义设备工具）有基本了解。
- 具备可运行 DuckyClaw 的开发板或运行环境。支持的平台见 [DuckyClaw 项目](https://github.com/tuya/DuckyClaw)。

## 要求

- **硬件**：支持的目标板（如 Tuya T5AI 模块、ESP32、Raspberry Pi 4/5 或 Linux ARM/x64）以及要作为技能暴露的外设（摄像头、传感器、显示屏等）。
- **软件**：支持 MCP 的 TuyaOpen SDK；在配置中启用 `ENABLE_COMP_AI_MCP`。
- **授权码**：使用 Tuya 云能力时需有效的 Tuya 授权码。
- **可选**：所接入外设对应的 TuyaOpen 驱动或 API（如传感器驱动、显示屏驱动）。

## 概述：DuckyClaw 中的设备 MCP

在 DuckyClaw 中，**设备 MCP** 指设备侧运行 MCP 服务器并对外暴露**工具**，供本地或云端智能体发现与调用。每个工具包含名称、描述、输入参数及在设备上执行的回调。DuckyClaw 内置的设备 MCP 工具包括：

- **CRON**：设备定时任务与心跳。
- **FILE**：设备端文件操作。
- **IoT Device Control**：涂鸦联网设备的管理。
- **EXEC**（如 Raspberry Pi）：远程代码执行。

当你构建**自定义设备 MCP**（硬件技能）时，即定义并使用一个或多个新工具操作你的硬件——例如「读取温度」「拍照」「设置显示屏文本」。智能体以与内置工具相同的方式发现并调用这些工具，在同一循环中执行。

## 开发步骤

### 1. 启用 MCP 并初始化服务器

在配置中确保已启用 MCP 组件（如 `ai_mcp/Kconfig` → `ENABLE_COMP_AI_MCP`）。在应用启动时，待 MQTT（或 DuckyClaw 使用的传输通道）就绪后，初始化 MCP 服务器并注册你的工具。

```c
#include "ai_mcp_server.h"

OPERATE_RET init_my_mcp(void)
{
    TUYA_CALL_ERR_RETURN(ai_mcp_server_init("My Device MCP", "1.0"));
    // 注册自定义工具（步骤 2）
    return OPRT_OK;
}
```

详见：[MCP Server – 初始化 MCP 服务器](/docs/applications/tuya.ai/ai-components/ai-mcp-server#initialize-mcp-server)。

### 2. 定义工具回调

实现一个回调：接收输入属性、执行你的硬件或逻辑、并设置返回值。通过属性辅助接口读取参数（如 `MCP_PROPERTY_TYPE_INTEGER`、`MCP_PROPERTY_TYPE_STRING`）。

```c
static OPERATE_RET my_sensor_read_cb(const MCP_PROPERTY_LIST_T *properties,
                                     MCP_RETURN_VALUE_T *ret_val,
                                     void *user_data)
{
    (void)properties;
    (void)user_data;
    // 从传感器读取（TuyaOpen 驱动或 HAL）
    int value = my_sensor_get_value();
    ai_mcp_return_value_set_int(ret_val, value);
    return OPRT_OK;
}
```

返回值类型：按需使用 `ai_mcp_return_value_set_bool`、`ai_mcp_return_value_set_int`、`ai_mcp_return_value_set_str`、`ai_mcp_return_value_set_json` 或 `ai_mcp_return_value_set_image`。若返回值包含动态分配内存，需使用 `ai_mcp_return_value_cleanup` 清理。

### 3. 使用属性注册工具

使用 `AI_MCP_TOOL_ADD` 宏创建并注册工具。用 `MCP_PROP_*` 系列宏定义输入属性，便于智能体传入正确参数。

```c
TUYA_CALL_ERR_RETURN(AI_MCP_TOOL_ADD(
    "sensor_temperature_read",
    "Read the current temperature from the onboard sensor in degrees Celsius.",
    my_sensor_read_cb,
    NULL
));
```

带参数的示例：

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

参考：[MCP Server – 属性定义宏](/docs/applications/tuya.ai/ai-components/ai-mcp-server#attribute-definition-macro)与[开发步骤](/docs/applications/tuya.ai/ai-components/ai-mcp-server#development-steps)。

### 4. 接入消息处理

确保将收到的 MCP 消息（如通过 DuckyClaw 与智能体共用的通道传输的 JSON-RPC）交给服务器处理：

```c
ai_mcp_server_parse_message(json, NULL);
```

通常在 DuckyClaw/AI 智能体栈的消息或 MQTT 回调中调用。服务器会分发到对应工具回调并返回响应。

### 5. 构建与验证

针对目标板构建应用，烧录或部署后运行 DuckyClaw。确认智能体（或云端）能列出并调用新工具。预期结果：工具出现在工具列表中，被调用时返回正确类型的值（整数、字符串、JSON 等）。

## 与 TuyaOpen 驱动的集成

硬件技能应尽量使用 TuyaOpen 驱动与 API，使工具回调在不同开发板上保持可移植。通过 TKL 或驱动层访问外设（如传感器的 ADC、继电器的 GPIO），避免板级专用代码。这与 [DuckyClaw 页面](/duckyclaw) 中「基于 TuyaOpen 驱动与 API 快速原型开发」的做法一致。

:::info
[通用示例](/docs/examples/demo-generic-examples) 提供示例代码，便于你验证硬件接口与最小接口代码。在将外设（如 GPIO、UART、ADC）接入设备 MCP 工具回调前，可先通过该文档进行验证。
:::

## 参考资料

- [MCP Server](/docs/applications/tuya.ai/ai-components/ai-mcp-server) — 设备 MCP 接入、工具注册与 API 说明。
- [MCP Tools](/docs/applications/tuya.ai/ai-components/ai-mcp-tools) — 预定义设备工具与初始化。
- [通用示例](/docs/examples/demo-generic-examples) — 验证硬件接口及最小接口代码示例。
- [DuckyClaw 项目](https://github.com/tuya/DuckyClaw) — 仓库与内置设备 MCP 工具（CRON、FILE、IoT、EXEC）。
