---
title: Built-in MCP Tools
---

The framework ships a set of MCP tools already written and registered, so the on-device AI can act on the device the moment the [MCP server](ai-mcp-server) comes up. `ai_mcp_init` registers them automatically when MQTT connects — you do not call them yourself; the AI does, by name.

They are also **reference implementations**. Each one is a complete, working example of the tool pattern — a callback that reads properties, touches a component, and returns a value — so you can copy the shape when you write your own tools.

:::note
These tools are defined in `ai_mcp_tools.c`. Some are compiled in only when their component is enabled, so the list a given board exposes depends on its build configuration.
:::

## The tools

| Tool name | What the AI can do | Component it touches | Availability |
|-----------|--------------------|----------------------|--------------|
| `device_info_get` | Read device information — model, serial number, and firmware version — and get it back as JSON. | Device metadata (`PROJECT_NAME`, `PROJECT_VERSION`) | Always registered |
| `device_camera_take_photo` | Capture one or more photos with the device camera (for example on a detected scene change, a visitor, or a user request) and get them back as a Base64 image. | `ai_video_input` | Requires `ENABLE_COMP_AI_VIDEO` |
| `device_audio_volume_set` | Set the device's playback volume to a level from 0 to 100. | `ai_audio_player` | Requires `ENABLE_COMP_AI_AUDIO` |
| `device_audio_mode_set` | Switch the device's chat mode — `0` hold, `1` key press, `2` wakeup, `3` free. | `ai_manage_mode` | Always registered |

## How each one is built

The tools follow the same pattern you use for your own, so read them as templates.

- **`device_info_get`** builds a `cJSON` object with the model, serial number, and firmware version, then returns it with `ai_mcp_return_value_set_json`. It takes no input properties.
- **`device_camera_take_photo`** starts the video display, grabs a JPEG frame from `ai_video_input`, and returns it with `ai_mcp_return_value_set_image` using `MCP_IMAGE_MIME_TYPE_JPEG`. It declares a `question` string property and a `count` integer property bounded to `1`–`10`.
- **`device_audio_volume_set`** reads the `volume` integer property (bounded `0`–`100`), applies it with `ai_audio_player_set_vol`, and returns a boolean for success.
- **`device_audio_mode_set`** reads the `mode` integer property (bounded `0`–`3`), switches mode with `ai_mode_switch`, and returns a boolean for whether the switch succeeded.

:::tip
Each callback reads its input from the property list with the same loop: match `prop->name`, check `prop->type`, then read the matching `prop->default_val` field. Reuse that pattern in your own tools.
:::

## See also

- [MCP Server](ai-mcp-server) — register your own tools and define their properties and return values
- [AI Agent](ai-agent) — how the device talks to the Tuya AI cloud
- [Component Framework](ai-components.md) — where `ai_mcp` sits in the AI framework
- [Multimodal data flow](../multimodal-data-flow) — how input and output move through the device
