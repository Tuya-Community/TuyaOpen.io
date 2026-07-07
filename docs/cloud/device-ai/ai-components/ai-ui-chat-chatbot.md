---
title: Chatbot UI
description: "Chatbot UI (ai_ui_chat_chatbot) shows one centered message at a time, the latest AI reply or status, for focused displays like kiosks and toys."
keywords:
  - chatbot ui
  - ai ui
  - device ai
  - tuyaopen
  - chat display
---

`ai_ui_chat_chatbot` is a simple chatbot UI for the TuyaOpen AI framework. It shows one message at a time, centered on the screen — the current AI reply or status — rather than a scrolling history. It implements the [`ai_ui_manage`](ai-ui-manage) interface, so once registered it renders the chat messages, emotions, and status the framework dispatches.

## When to choose it

Choose the Chatbot UI when you want a clean, focused display that shows only the latest message — a kiosk, a toy, or any product where one centered line of text is clearer than a full chat thread. For a scrolling bubble conversation on a color LCD use the [WeChat-style UI](ai-ui-chat-wechat); for a small monochrome screen use the [OLED UI](ai-ui-chat-oled).

## Enable it

Register the style, then initialize the UI module. Registration runs first because `ai_ui_init()` invokes the style's `disp_init` callback:

```c
#include "ai_ui_chat_chatbot.h"
#include "ai_ui_manage.h"

// Register the Chatbot UI, then initialize the UI module.
ai_ui_chat_chatbot_register();
ai_ui_init();
```

`ai_ui_chat_chatbot_register()` returns `OPERATE_RET` (`OPRT_OK` on success). It is the only function this style exposes — after it runs, you drive the screen entirely through `ai_ui_manage`.

:::note
Register exactly one UI style before calling `ai_ui_init()`. After initialization, send messages with `ai_ui_disp_msg()` — see [UI Management](ai-ui-manage).
:::

## See also

- [UI Management](ai-ui-manage) — the dispatch layer this style registers with
- [WeChat-style UI](ai-ui-chat-wechat) — bubble chat for color LCDs
- [OLED UI](ai-ui-chat-oled) — for small monochrome screens
- [AI Agent](ai-agent) — the cloud bridge that produces the messages
- [Component Framework](ai-components.md) — how `ai_ui` fits the wider AI framework
