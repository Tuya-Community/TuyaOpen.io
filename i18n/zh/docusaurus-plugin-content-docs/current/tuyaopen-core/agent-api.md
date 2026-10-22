---
title: 使用 AI Agent API
description: "TuyaOpen Core AI Agent API：以上行属性与输出回调初始化 Agent、创建会话、流式上传音频或文本、处理 MCP 工具调用，以及使用调试 monitor。"
keywords:
  - tuyaopen core
  - ai agent
  - 语音识别
  - mcp
---

AI Agent API 把设备接入涂鸦云端 AI：上行音频经语音识别（ASR）转写，Agent 生成回复（NLG），下行文本、音频与提示音回到应用。仅在开启 `CONFIG_ENABLE_AI_COMPONENTS` 时编译（见 [把库加入工程](add-to-project.md)）。主头文件为 `tuya_ai_agent.h`。

:::warning
AI Agent 运行在 IoT 云端连接之上，请在设备激活后再启动——示例在 `TUYA_EVENT_MQTT_CONNECTED` 事件中初始化（见 [IoT API](iot-api.md)）。产品的 PID 必须在云平台开通 AI 服务。
:::

## 初始化 Agent

填写 `AI_AGENT_CFG_T`：上行音频格式与五个输出回调：

```c
AI_AGENT_CFG_T cfg = {0};

/* 云端需要的上行格式；不设置则不会返回 ASR/NLG */
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

输出回调表：

| 回调 | 接收内容 |
|---|---|
| `event_cb` | 链路事件：事件类型、包类型与事件 ID |
| `media_attr_cb` | 媒体属性，例如下行音频编码格式 |
| `media_data_cb` | 下行媒体分片（音频、视频、图片、文件），含 `len` / `total_len` |
| `text_cb` | 文本流对象，标记为 `AI_TEXT_ASR`、`AI_TEXT_NLG`、`AI_TEXT_SKILL`、`AI_TEXT_CLOUD_EVENT`，带 `eof` 标志 |
| `alert_cb` | 语音提示音事件，如 `AT_NETWORK_FAIL`、`AT_PLEASE_AGAIN`、`AT_LOW_BATTERY` |

用 `tuya_ai_agent_is_ready()` 判断客户端是否就绪，用 `tuya_ai_agent_deinit()` 关闭。初始化失败时内部会自行清理，因此下次 MQTT 连接时重试是安全的。

## 会话

对话以方案码（`scode`）标识的会话为单位。客户端就绪后创建会话：

```c
tuya_ai_agent_crt_session(scode, bizCode, bizTag, attr, attr_len);
```

示例在 AI 客户端上报运行状态后，以空属性创建默认会话（`tuya_ai_agent_crt_session("", 0, 0, NULL, 0)`）。会话建立比 ready 多一次 token 往返，发送输入前应稍作等待。`tuya_ai_agent_get_scode()` 返回当前方案码；带 `_s` 后缀的输入/事件接口可在多方案设计中指定具体 scode。

## 发送音频或文本

先启动输入通道，再送入数据包。音频帧与文本会追加到 Agent 内部的按会话环形缓冲：

```c
tuya_ai_input_start(FALSE);

/* 来自采集链路的 PCM 帧 */
tuya_ai_audio_input(timestamp_ms, pts_us, frame, frame_len, total_len);

/* 或文本输入 */
tuya_ai_text_input((uint8_t *)"turn on the light", strlen("turn on the light"), strlen("turn on the light"));
```

`total_len` 参数用于定长负载的分块上传。只想静音而不结束会话时调用 `tuya_ai_input_mute_audio(TRUE)`；停止通道用 `tuya_ai_input_stop()`。

Linux agent 示例在没有真实硬件的情况下演示了上行链路：它把内置的 16 kHz/16 bit/单声道 PCM 文件逐帧播放一次，每帧调用 `tuya_ai_audio_input`，并以云端返回 ASR 作为链路可用的判据。

## 接收回复

对话结果出现在下行文本中。文本回调收到 JSON 对象：

```c
static OPERATE_RET user_ai_text_cb(AI_TEXT_TYPE_E type, cJSON *root, BOOL_T eof)
{
    /* AI_TEXT_ASR：云端听到的内容
       AI_TEXT_NLG：Agent 的回复 */
    return OPRT_OK;
}
```

下行音频先经 `media_attr_cb` 给出编码（如 MP3 或 Opus），随后由 `media_data_cb` 逐片到达。默认 TTS 格式为 16 kHz MP3；可在 Agent 配置中通过 `tts_cfg` 修改（`bit_rate`、`sample_rate`、`format`——播放端支持时设为 `"opus"` 可降低延迟）。`AT_WAKEUP`、`AT_VOLUME` 等提示音通过 `alert_cb` 到达，用于播放本地语音。

## MCP 工具调用

在 Agent 配置中设置 `enable_mcp = TRUE` 即可开启 MCP（示例构建默认开启 MCP 模块）。当云端模型调用设备上的工具时，注册的回调会收到会话 ID、事件 ID 与参数：

```c
static OPERATE_RET user_mcp_cb(char *sid, char *eid, const cJSON *json, void *user_data)
{
    /* 从 json 解析工具参数，执行设备动作…… */
    tuya_ai_agent_mcp_response(sid, eid, "done");
    return OPRT_OK;
}

tuya_ai_agent_mcp_set_cb(user_mcp_cb, NULL);
```

回复时调用 `tuya_ai_agent_mcp_response`，原样传回 `sid` 与 `eid`。SDK 还提供服务端辅助宏 `AI_MCP_TOOL_ADD(name, description, callback, user_data, ...)`，用于以 JSON Schema 描述声明命名工具。

## 调试 monitor

内置的 TCP monitor 服务可用于开发期诊断：

```c
ai_monitor_config_t cfg = AI_MONITOR_CFG_DEFAULT; /* 端口 5055，3 个客户端 */
tuya_ai_monitor_init(&cfg);
```

它只是调试辅助，不属于产品链路——示例在它启动失败时只记录日志，不会中止 Agent 启动。

## 下一步

- [Linux 快速开始](linux-quick-start.md) —— 端到端运行 agent 示例
- [P2P API](p2p-api.md) —— AI 与媒体流结合
- 云端 AI 服务配置：[创建产品与 Agent](../cloud/tuya-cloud/creating-new-product.md)
