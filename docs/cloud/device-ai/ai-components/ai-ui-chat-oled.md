---
title: OLED UI
---

`ai_ui_chat_oled` is a chat UI for the TuyaOpen AI framework optimized for small monochrome OLED screens. It renders the conversation in the limited space and single color of a typical OLED panel, keeping text legible where a graphical bubble layout would not fit. It implements the [`ai_ui_manage`](ai-ui-manage) interface, so once registered it renders the chat messages and status the framework dispatches.

## When to choose it

Choose the OLED UI when your product uses a **small monochrome OLED** (such as a 0.96" or 1.3" SSD1306-class panel) — common on compact, low-cost boards. It is tuned for tight pixel and memory budgets. For a scrolling bubble conversation on a color LCD use the [WeChat-style UI](ai-ui-chat-wechat); for a centered single message use the [Chatbot UI](ai-ui-chat-chatbot).

## Enable it

Register the style, then initialize the UI module. Registration runs first because `ai_ui_init()` invokes the style's `disp_init` callback:

```c
#include "ai_ui_chat_oled.h"
#include "ai_ui_manage.h"

// Register the OLED UI, then initialize the UI module.
ai_ui_chat_oled_register();
ai_ui_init();
```

`ai_ui_chat_oled_register()` returns `OPERATE_RET` (`OPRT_OK` on success). It is the only function this style exposes — after it runs, you drive the screen entirely through `ai_ui_manage`.

:::note
Register exactly one UI style before calling `ai_ui_init()`. After initialization, send messages with `ai_ui_disp_msg()` — see [UI Management](ai-ui-manage).
:::

## See also

- [UI Management](ai-ui-manage) — the dispatch layer this style registers with
- [WeChat-style UI](ai-ui-chat-wechat) — bubble chat for color LCDs
- [Chatbot UI](ai-ui-chat-chatbot) — centered single-message display
- [AI Agent](ai-agent) — the cloud bridge that produces the messages
- [Component Framework](ai-components.md) — how `ai_ui` fits the wider AI framework
