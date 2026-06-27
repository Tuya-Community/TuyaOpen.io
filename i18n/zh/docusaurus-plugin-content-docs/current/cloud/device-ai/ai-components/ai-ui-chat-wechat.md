---
title: 微信风格 UI
---

`ai_ui_chat_wechat` 是 TuyaOpen AI 框架的微信风格气泡聊天 UI。它把对话呈现为可滚动的气泡列表——用户消息在右侧、AI 回复在左侧——即大家熟悉的聊天软件外观。它实现了 [`ai_ui_manage`](ai-ui-manage) 接口，注册后即可渲染框架分发的每条聊天消息、情绪、状态、摄像头画面与图片。

## 何时选择

当产品配备**彩色 LCD**，且分辨率与内存足以承载图形化的多消息列表时，选择微信风格 UI。它是三种内置风格中最丰富的一种：在屏幕上保留近期历史、逐字流式显示 AI 回复，并能显示摄像头预览与图片。若只需居中显示单条消息，请用 [Chatbot UI](ai-ui-chat-chatbot)；若是小尺寸单色屏，请用 [OLED UI](ai-ui-chat-oled)。

## 启用方式

先注册风格，再初始化 UI 模块。注册必须在前，因为 `ai_ui_init()` 会调用风格的 `disp_init` 回调：

```c
#include "ai_ui_chat_wechat.h"
#include "ai_ui_manage.h"

// 注册微信风格 UI，再初始化 UI 模块。
ai_ui_chat_wechat_register();
ai_ui_init();
```

`ai_ui_chat_wechat_register()` 返回 `OPERATE_RET`（成功时为 `OPRT_OK`）。它是该风格暴露的唯一函数——注册完成后，你完全通过 `ai_ui_manage` 驱动屏幕。

:::note
在调用 `ai_ui_init()` 之前只注册一种 UI 风格。初始化后，用 `ai_ui_disp_msg()` 发送消息——参见 [UI 管理](ai-ui-manage)。
:::

## 相关文档

- [UI 管理](ai-ui-manage)——该风格注册到的调度层
- [Chatbot UI](ai-ui-chat-chatbot)——居中的单条消息显示
- [OLED UI](ai-ui-chat-oled)——适用于小尺寸单色屏
- [AI Agent](ai-agent)——产生消息的云端桥梁
- [组件框架](ai-components.md)——`ai_ui` 在整个 AI 框架中的位置
