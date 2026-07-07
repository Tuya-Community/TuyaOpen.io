---
title: WeChat-style UI
description: "WeChat-style UI (ai_ui_chat_wechat) renders the conversation as a scrolling bubble thread on color LCD, with streaming replies and camera previews."
keywords:
  - wechat ui
  - ai ui
  - device ai
  - tuyaopen
  - chat bubbles
---

`ai_ui_chat_wechat` is a WeChat-style bubble chat UI for the TuyaOpen AI framework. It shows the conversation as a scrolling thread of bubbles — the user's messages on the right, the AI's replies on the left — the look people already know from messaging apps. It implements the [`ai_ui_manage`](ai-ui-manage) interface, so once registered it renders every chat message, emotion, status, camera frame, and picture the framework dispatches.

## When to choose it

Choose the WeChat-style UI when your product has a **color LCD** with enough resolution and memory for a graphical, multi-message thread. It is the richest of the three built-in styles: it keeps recent history on screen, streams AI replies word by word, and can show camera previews and pictures. For a single centered message use the [Chatbot UI](ai-ui-chat-chatbot); for a small monochrome screen use the [OLED UI](ai-ui-chat-oled).

## Enable it

Register the style, then initialize the UI module. Registration runs first because `ai_ui_init()` invokes the style's `disp_init` callback:

```c
#include "ai_ui_chat_wechat.h"
#include "ai_ui_manage.h"

// Register the WeChat-style UI, then initialize the UI module.
ai_ui_chat_wechat_register();
ai_ui_init();
```

`ai_ui_chat_wechat_register()` returns `OPERATE_RET` (`OPRT_OK` on success). It is the only function this style exposes — after it runs, you drive the screen entirely through `ai_ui_manage`.

:::note
Register exactly one UI style before calling `ai_ui_init()`. After initialization, send messages with `ai_ui_disp_msg()` — see [UI Management](ai-ui-manage).
:::

## See also

- [UI Management](ai-ui-manage) — the dispatch layer this style registers with
- [Chatbot UI](ai-ui-chat-chatbot) — centered single-message display
- [OLED UI](ai-ui-chat-oled) — for small monochrome screens
- [AI Agent](ai-agent) — the cloud bridge that produces the messages
- [Component Framework](ai-components.md) — how `ai_ui` fits the wider AI framework
