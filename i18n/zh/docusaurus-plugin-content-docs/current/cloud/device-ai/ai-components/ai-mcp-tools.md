---
title: 内置 MCP 工具
---

框架自带一组已经写好并注册的 MCP 工具，因此 [MCP 服务端](ai-mcp-server)一启动，设备端 AI 就能对设备做动作。`ai_mcp_init` 在 MQTT 连接成功时自动注册它们——你不需要自己调用，而是由 AI 按名称调用。

它们同时也是**参考实现**。每一个都是工具模式的完整、可用范例——回调读取属性、操作某个组件、返回一个值——你写自己的工具时可以照搬这个结构。

:::note
这些工具定义在 `ai_mcp_tools.c` 中。部分工具仅在对应组件启用时才会编译进来，因此某块开发板实际暴露的工具列表取决于其构建配置。
:::

## 工具列表

| 工具名称 | AI 能做什么 | 涉及的组件 | 可用条件 |
|----------|-------------|------------|----------|
| `device_info_get` | 读取设备信息——型号、序列号、固件版本——并以 JSON 形式回传。 | 设备元信息（`PROJECT_NAME`、`PROJECT_VERSION`） | 始终注册 |
| `device_camera_take_photo` | 用设备摄像头拍摄一张或多张照片（例如检测到画面变化、有访客或用户请求时），并以 Base64 图片回传。 | `ai_video_input` | 需要 `ENABLE_COMP_AI_VIDEO` |
| `device_audio_volume_set` | 把设备播放音量设到 0 到 100 之间的某一级。 | `ai_audio_player` | 需要 `ENABLE_COMP_AI_AUDIO` |
| `device_audio_mode_set` | 切换设备聊天模式——`0` 长按、`1` 按键、`2` 唤醒、`3` 自由。 | `ai_manage_mode` | 始终注册 |

## 每个工具是怎么实现的

这些工具与你自己写工具时遵循同一套模式，可作为模板阅读。

- **`device_info_get`** 构造一个含型号、序列号、固件版本的 `cJSON` 对象，用 `ai_mcp_return_value_set_json` 返回。它没有输入属性。
- **`device_camera_take_photo`** 启动视频显示，从 `ai_video_input` 抓取一帧 JPEG，用 `ai_mcp_return_value_set_image` 以 `MCP_IMAGE_MIME_TYPE_JPEG` 返回。它声明了一个 `question` 字符串属性和一个限定在 `1`–`10` 的 `count` 整数属性。
- **`device_audio_volume_set`** 读取 `volume` 整数属性（限定 `0`–`100`），用 `ai_audio_player_set_vol` 应用音量，返回一个表示成功的布尔值。
- **`device_audio_mode_set`** 读取 `mode` 整数属性（限定 `0`–`3`），用 `ai_mode_switch` 切换模式，返回切换是否成功的布尔值。

:::tip
每个回调都用同样的循环从属性列表里读取输入：匹配 `prop->name`、检查 `prop->type`，再读取对应的 `prop->default_val` 字段。在你自己的工具里复用这个模式即可。
:::

## 相关文档

- [MCP 服务端](ai-mcp-server)——注册自己的工具，定义其属性与返回值
- [AI Agent](ai-agent)——设备如何与涂鸦 AI 云端通信
- [组件框架](ai-components.md)——`ai_mcp` 在 AI 框架中的位置
- [多模态数据流](../multimodal-data-flow)——输入与输出在设备中的流转方式
