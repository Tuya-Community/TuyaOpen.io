---
title: Chatbot UI
description: "ai_ui_chat_chatbot 是简单聊天机器人 UI，在屏幕中央一次只显示当前一条 AI 回复或状态，适合自助终端、玩具等聚焦产品。"
keywords:
  - Chatbot UI
  - ai_ui_chat_chatbot
  - 聊天 UI
  - 端侧 AI
---

`ai_ui_chat_chatbot` 是 TuyaOpen AI 框架的简单聊天机器人 UI。它在屏幕中央一次只显示一条消息——当前的 AI 回复或状态——而不是可滚动的历史记录。它实现了 [`ai_ui_manage`](ai-ui-manage) 接口，注册后即可渲染框架分发的聊天消息、情绪与状态。

## 何时选择

当你需要简洁、聚焦、只显示最新消息的界面时，选择 Chatbot UI——例如自助终端、玩具，或任何「一行居中文本比完整对话列表更清晰」的产品。若需要彩色 LCD 上可滚动的气泡对话，请用 [微信风格 UI](ai-ui-chat-wechat)；若是小尺寸单色屏，请用 [OLED UI](ai-ui-chat-oled)。

## 启用方式

先注册风格，再初始化 UI 模块。注册必须在前，因为 `ai_ui_init()` 会调用风格的 `disp_init` 回调：

```c
#include "ai_ui_chat_chatbot.h"
#include "ai_ui_manage.h"

// 注册 Chatbot UI，再初始化 UI 模块。
ai_ui_chat_chatbot_register();
ai_ui_init();
```

`ai_ui_chat_chatbot_register()` 返回 `OPERATE_RET`（成功时为 `OPRT_OK`）。它是该风格暴露的唯一函数——注册完成后，你完全通过 `ai_ui_manage` 驱动屏幕。

:::note
在调用 `ai_ui_init()` 之前只注册一种 UI 风格。初始化后，用 `ai_ui_disp_msg()` 发送消息——参见 [UI 管理](ai-ui-manage)。
:::

## 相关文档

- [UI 管理](ai-ui-manage)——该风格注册到的调度层
- [微信风格 UI](ai-ui-chat-wechat)——适用于彩色 LCD 的气泡聊天
- [OLED UI](ai-ui-chat-oled)——适用于小尺寸单色屏
- [AI Agent](ai-agent)——产生消息的云端桥梁
- [组件框架](ai-components.md)——`ai_ui` 在整个 AI 框架中的位置
