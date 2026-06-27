---
title: 框架入口
---

`ai_main` 是设备端 AI 框架的入口。一次调用——`ai_chat_init`——即可初始化已启用的组件、注册对话模式、订阅驱动对话的事件并开始分发。你的应用其余部分都通过这一个模块与框架交互。

本页是入口 API 的参考文档。关于完整的集成说明——有哪些模块、它们如何协作、如何接入一个完整应用——请参见 [组件框架](ai-components.md)。

## 配置

向 `ai_chat_init` 传入一个 `AI_CHAT_MODE_CFG_T`：

```c
typedef struct {
    AI_CHAT_MODE_E        default_mode;
    int                   default_vol;
    AI_USER_EVENT_NOTIFY  evt_cb;
} AI_CHAT_MODE_CFG_T;
```

| 字段 | 含义 |
|------|------|
| `default_mode` | 启动时使用的对话模式（`AI_CHAT_MODE_HOLD`、`AI_CHAT_MODE_ONE_SHOT`、`AI_CHAT_MODE_WAKEUP` 或 `AI_CHAT_MODE_FREE`）。当没有已保存的模式、或已保存的模式未注册时使用。 |
| `default_vol` | 默认音量，`0`–`100`。当没有已保存的音量时使用。 |
| `evt_cb` | 一个 `AI_USER_EVENT_NOTIFY` 回调，接收框架事件供你的应用处理。 |

框架会持久化当前的模式与音量。`ai_chat_init` 加载已保存的值，首次运行时回退到 `default_mode` 与 `default_vol`。

## API 参考

头文件：`ai_chat_main.h`。

```c
OPERATE_RET ai_chat_init(AI_CHAT_MODE_CFG_T *cfg);
OPERATE_RET ai_chat_set_volume(int volume);
int         ai_chat_get_volume(void);
```

| 函数 | 参数 | 返回 | 作用 |
|------|------|------|------|
| `ai_chat_init` | `cfg`——对话配置 | `OPERATE_RET`（成功为 `OPRT_OK`） | 初始化已启用的组件、注册对话模式并开始分发事件。 |
| `ai_chat_set_volume` | `volume`——`0`–`100` | `OPERATE_RET` | 设置播放音量。 |
| `ai_chat_get_volume` | 无 | `int`——`0`–`100` | 获取当前播放音量。 |

:::note
框架会替你初始化 [AI 智能体](ai-agent)。`ai_chat_init` 订阅 `EVENT_MQTT_CONNECTED`，MQTT 连接成功后智能体会自动初始化——你无需自行调用 `ai_agent_init`。
:::

## 完整示例

初始化框架一次，随后在运行时调节音量：

```c
static void __ai_user_event(AI_NOTIFY_EVENT_T *event)
{
    // 在此处理框架事件供你的应用使用。
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

## 相关文档

- [组件框架](ai-components.md)——完整的集成说明与模块全景
- [AI 智能体](ai-agent)——框架替你初始化的云端桥梁
- [多模态数据流](../multimodal-data-flow)——数据如何在设备与云端之间传输
