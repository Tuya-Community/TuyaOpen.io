---
title: Framework Entry
---

`ai_main` is the entry point of the on-device AI framework. One call — `ai_chat_init` — initializes the enabled components, registers the chat modes, subscribes to the events that drive the conversation, and starts dispatching. The rest of your application talks to the framework through this one module.

This page is the reference for the entry API. For the full integration walkthrough — which modules exist, how they fit together, and how to wire a complete app — see the [Component Framework](ai-components.md).

## Configuration

Pass an `AI_CHAT_MODE_CFG_T` to `ai_chat_init`:

```c
typedef struct {
    AI_CHAT_MODE_E        default_mode;
    int                   default_vol;
    AI_USER_EVENT_NOTIFY  evt_cb;
} AI_CHAT_MODE_CFG_T;
```

| Field | Meaning |
|-------|---------|
| `default_mode` | The chat mode to start in (`AI_CHAT_MODE_HOLD`, `AI_CHAT_MODE_ONE_SHOT`, `AI_CHAT_MODE_WAKEUP`, or `AI_CHAT_MODE_FREE`). Used when no mode is saved or the saved mode is not registered. |
| `default_vol` | The default volume, `0`–`100`. Used when no volume is saved. |
| `evt_cb` | An `AI_USER_EVENT_NOTIFY` callback that receives framework events for your application to act on. |

The framework persists the active mode and volume. `ai_chat_init` loads the saved values and falls back to `default_mode` and `default_vol` on first run.

## API reference

Header: `ai_chat_main.h`.

```c
OPERATE_RET ai_chat_init(AI_CHAT_MODE_CFG_T *cfg);
OPERATE_RET ai_chat_set_volume(int volume);
int         ai_chat_get_volume(void);
```

| Function | Parameters | Returns | Purpose |
|----------|------------|---------|---------|
| `ai_chat_init` | `cfg` — chat configuration | `OPERATE_RET` (`OPRT_OK` on success) | Initialize the enabled components, register the chat modes, and start dispatching events. |
| `ai_chat_set_volume` | `volume` — `0`–`100` | `OPERATE_RET` | Set the playback volume. |
| `ai_chat_get_volume` | — | `int` — `0`–`100` | Get the current playback volume. |

:::note
The framework initializes the [AI Agent](ai-agent) for you. `ai_chat_init` subscribes to `EVENT_MQTT_CONNECTED`, and the agent is initialized automatically once the MQTT connection succeeds — you do not call `ai_agent_init` yourself.
:::

## Worked example

Initialize the framework once, then adjust volume at runtime:

```c
static void __ai_user_event(AI_NOTIFY_EVENT_T *event)
{
    // Handle framework events for your application here.
}

OPERATE_RET app_ai_init(void)
{
    AI_CHAT_MODE_CFG_T cfg = {
        .default_mode = AI_CHAT_MODE_WAKEUP,
        .default_vol  = 60,
        .evt_cb       = __ai_user_event,
    };
    return ai_chat_init(&cfg);
}

void volume_up(void)
{
    ai_chat_set_volume(ai_chat_get_volume() + 10);
}
```

## See also

- [Component Framework](ai-components.md) — the full integration walkthrough and module map
- [AI Agent](ai-agent) — the cloud bridge the framework initializes for you
- [Multimodal Data Flow](../multimodal-data-flow) — how data travels between device and cloud
