---
title: OLED UI
---

`ai_ui_chat_oled` 是 TuyaOpen AI 框架中为小尺寸单色 OLED 屏优化的聊天 UI。它在典型 OLED 面板有限的空间与单一颜色下渲染对话，在图形化气泡布局放不下的场景里仍保持文字清晰可读。它实现了 [`ai_ui_manage`](ai-ui-manage) 接口，注册后即可渲染框架分发的聊天消息与状态。

## 何时选择

当产品使用**小尺寸单色 OLED**（例如 0.96 英寸或 1.3 英寸的 SSD1306 类面板）时，选择 OLED UI——这类屏常见于紧凑、低成本的开发板。它针对有限的像素与内存预算做了优化。若需要彩色 LCD 上可滚动的气泡对话，请用 [微信风格 UI](ai-ui-chat-wechat)；若只需居中显示单条消息，请用 [Chatbot UI](ai-ui-chat-chatbot)。

## 启用方式

先注册风格，再初始化 UI 模块。注册必须在前，因为 `ai_ui_init()` 会调用风格的 `disp_init` 回调：

```c
#include "ai_ui_chat_oled.h"
#include "ai_ui_manage.h"

// 注册 OLED UI，再初始化 UI 模块。
ai_ui_chat_oled_register();
ai_ui_init();
```

`ai_ui_chat_oled_register()` 返回 `OPERATE_RET`（成功时为 `OPRT_OK`）。它是该风格暴露的唯一函数——注册完成后，你完全通过 `ai_ui_manage` 驱动屏幕。

:::note
在调用 `ai_ui_init()` 之前只注册一种 UI 风格。初始化后，用 `ai_ui_disp_msg()` 发送消息——参见 [UI 管理](ai-ui-manage)。
:::

## 相关文档

- [UI 管理](ai-ui-manage)——该风格注册到的调度层
- [微信风格 UI](ai-ui-chat-wechat)——适用于彩色 LCD 的气泡聊天
- [Chatbot UI](ai-ui-chat-chatbot)——居中的单条消息显示
- [AI Agent](ai-agent)——产生消息的云端桥梁
- [组件框架](ai-components.md)——`ai_ui` 在整个 AI 框架中的位置
