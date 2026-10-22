---
title: Using the AI Agent API
description: "The TuyaOpen Core AI Agent API: initialize the agent with uplink attributes and output callbacks, create sessions, stream audio or text, handle MCP tool calls, and use the debug monitor."
keywords:
  - tuyaopen core
  - ai agent
  - asr
  - nlg
  - mcp
---

The AI Agent API connects your device to Tuya's cloud AI: uplink audio is transcribed (ASR), an agent produces a reply (NLG), and downlink text, audio, and alerts come back to your application. It is compiled only when `CONFIG_ENABLE_AI_COMPONENTS` is enabled (see [Add the library to a project](add-to-project.md)). The main header is `tuya_ai_agent.h`.

:::warning
AI Agent runs over the IoT cloud link. Start it after the device is activated — the sample initializes it from the `TUYA_EVENT_MQTT_CONNECTED` event (see [IoT API](iot-api.md)). The product's PID must have the AI service enabled in the cloud console.
:::

## Initialize the agent

Fill an `AI_AGENT_CFG_T` with the uplink audio format and the five output callbacks:

```c
AI_AGENT_CFG_T cfg = {0};

/* Uplink format the cloud should expect; without this, no ASR/NLG is returned */
cfg.attr.audio.codec_type  = AUDIO_CODEC_PCM;
cfg.attr.audio.sample_rate = 16000;
cfg.attr.audio.channels    = AUDIO_CHANNELS_MONO;
cfg.attr.audio.bit_depth   = 16;

cfg.output.event_cb      = user_ai_event_cb;
cfg.output.media_attr_cb = user_ai_media_attr_cb;
cfg.output.media_data_cb = user_ai_media_data_cb;
cfg.output.text_cb       = user_ai_text_cb;
cfg.output.alert_cb      = user_ai_alert_cb;

tuya_ai_agent_init(&cfg);
```

The output callback table:

| Callback | Receives |
|---|---|
| `event_cb` | Link events: event type, packet type, and event ID |
| `media_attr_cb` | Media attributes, e.g. the downlink audio codec |
| `media_data_cb` | Downlink media chunks (audio, video, image, file) with `len` / `total_len` |
| `text_cb` | Text stream objects tagged `AI_TEXT_ASR`, `AI_TEXT_NLG`, `AI_TEXT_SKILL`, `AI_TEXT_CLOUD_EVENT`, with an `eof` flag |
| `alert_cb` | Voice-prompt alerts such as `AT_NETWORK_FAIL`, `AT_PLEASE_AGAIN`, or `AT_LOW_BATTERY` |

Use `tuya_ai_agent_is_ready()` to know when the client is up, and `tuya_ai_agent_deinit()` to shut it down. A failed init cleans up internally, so retrying on the next MQTT connect is safe.

## Sessions

Conversations are sessions identified by a solution code (`scode`). After the client becomes ready, create one:

```c
tuya_ai_agent_crt_session(scode, bizCode, bizTag, attr, attr_len);
```

The sample creates a default session with empty attributes (`tuya_ai_agent_crt_session("", 0, 0, NULL, 0)`) once the AI client reports it is running. A session is one token round trip after readiness — allow it a moment to settle before sending input. `tuya_ai_agent_get_scode()` returns the active solution code; the `_s`-suffixed input/event calls let you target a specific scode in multi-solution designs.

## Send audio or text

Start the input channel, then feed packets. Audio frames and text append into per-session ring buffers inside the agent:

```c
tuya_ai_input_start(FALSE);

/* PCM frames from your capture path */
tuya_ai_audio_input(timestamp_ms, pts_us, frame, frame_len, total_len);

/* or a text utterance */
tuya_ai_text_input((uint8_t *)"turn on the light", strlen("turn on the light"), strlen("turn on the light"));
```

The `total_len` argument supports chunked upload of a fixed-size payload. Mute the uplink without stopping the session with `tuya_ai_input_mute_audio(TRUE)`, and stop the channel with `tuya_ai_input_stop()`.

The Linux agent sample demonstrates the uplink without real hardware: it plays a bundled 16 kHz/16-bit/mono PCM file once, calling `tuya_ai_audio_input` per frame, and treats the cloud ASR response as proof the link works.

## Receive the reply

Downlink text is where the conversation result appears. The text callback gets JSON objects:

```c
static OPERATE_RET user_ai_text_cb(AI_TEXT_TYPE_E type, cJSON *root, BOOL_T eof)
{
    /* AI_TEXT_ASR: what the cloud heard
       AI_TEXT_NLG: the agent's reply */
    return OPRT_OK;
}
```

Downlink audio arrives through `media_attr_cb` (codec, e.g. MP3 or Opus) followed by `media_data_cb` chunks. The default TTS format is 16 kHz MP3; change it with a `tts_cfg` in the agent config (`bit_rate`, `sample_rate`, `format` — `"opus"` reduces latency if your player supports it). Alerts such as `AT_WAKEUP` or `AT_VOLUME` arrive on `alert_cb` for playing local voice prompts.

## MCP tool calls

Enable MCP with `enable_mcp = TRUE` in the agent config (the sample's build enables the MCP module by default). When the cloud model calls a tool on the device, your registered callback receives the session ID, event ID, and arguments:

```c
static OPERATE_RET user_mcp_cb(char *sid, char *eid, const cJSON *json, void *user_data)
{
    /* inspect the tool call arguments in json, run the device action... */
    tuya_ai_agent_mcp_response(sid, eid, "done");
    return OPRT_OK;
}

tuya_ai_agent_mcp_set_cb(user_mcp_cb, NULL);
```

Reply with `tuya_ai_agent_mcp_response`, passing back the same `sid` and `eid`. The SDK also provides a server-side helper macro, `AI_MCP_TOOL_ADD(name, description, callback, user_data, ...)`, for declaring named tools with a JSON-schema description.

## Debug monitor

A built-in TCP monitor service is available for development diagnostics:

```c
ai_monitor_config_t cfg = AI_MONITOR_CFG_DEFAULT; /* port 5055, 3 clients */
tuya_ai_monitor_init(&cfg);
```

It is a debug aid, not part of the product link — the sample logs its failures without aborting agent startup.

## Next steps

- [Quick start on Linux](linux-quick-start.md) — run the agent sample end to end
- [P2P API](p2p-api.md) — combine AI with media streaming
- Cloud-side setup for the AI service: [Create Your Product & Agent](../cloud/tuya-cloud/creating-new-product.md)
