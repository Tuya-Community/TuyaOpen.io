---
title: 使用 P2P API
description: "TuyaOpen Core P2P API：用回调表初始化 P2P 服务、通过拉取回调提供实时帧、推送回放帧、响应媒体流事件，以及使用本地存储。"
keywords:
  - tuyaopen core
  - p2p
  - ipc
  - rtc
  - 媒体
  - 本地存储
---

P2P API 为 IPC（摄像机类）设备提供与涂鸦 App 之间低延迟、可穿透 NAT 的音视频会话。仅在开启 `CONFIG_ENABLE_TUYA_P2P` 时编译（见 [把库加入工程](add-to-project.md)）。会话层基于 ICE/RTC（内置 pjproject 与 KCP），媒体由 RTP 栈承载。

:::warning
P2P 要求**设备已在云端激活**：请在 MQTT 连接后初始化。产品在云平台必须是 **IPC 类目**，其他类目无法完成 P2P 配置。云端信令以 `TUYA_EVENT_RTC_REQ` 事件到达（见 [IoT API](iot-api.md)）。
:::

## 两个集成层

- `tuya_p2p_sdk.h` —— 应用粘合层：`TUYA_APP_Start` 负责上报能力、初始化 RTC 引擎与 P2P 服务、接通云端/局域网信令。
- `tuya_ipc_p2p.h` —— 底层回调表 API（`p2p_init`）。请优先使用它，不要使用 `tuya_p2p_api.h` 中的旧版 `tuya_imm_*` 接口——它们在当前源码中是空桩。

Linux 示例使用粘合层；无论哪一层，十个回调都相同。

## 启动服务

填写 `TUYA_IPC_SDK_VAR_S` 回调表并调用 `TUYA_APP_Start`：

```c
TUYA_IPC_SDK_VAR_S sdk = {
    .OnSignalDisconnectCallback  = user_disconnect,
    .OnGetVideoFrameCallback     = user_get_video_frame,
    .OnGetAudioFrameCallback     = user_get_audio_frame,
    .OnLiveVideoStartCallback    = user_live_video_start,
    .OnLiveVideoStopCallback     = user_live_video_stop,
    .OnLiveAudioStartCallback    = user_live_audio_start,
    .OnLiveAudioStopCallback     = user_live_audio_stop,
    .OnRecvAudioFrameCallback    = user_recv_audio_frame,
    .OnRequestIFrameCallback     = user_request_i_frame,
    .OnSetVideoBitrateCallback   = user_set_bitrate,
};
TUYA_APP_Start(&sdk);
```

`TUYA_APP_Start` 会上报 P2P 能力（启用时还包括本地存储能力）、调用 RTC 初始化、把回调映射进 `TUYA_IPC_P2P_VAR_T`，然后调用 `p2p_init` 与 `p2p_rtc_listen_start`。停止用 `TUYA_APP_End`。云端信令无需单独注册——把 `TUYA_EVENT_RTC_REQ` 的负载交给 `gw_p2p_mqtt_data_cb` 即可；启用本地连接时局域网信令会自动注册。

:::warning
不要在激活前启动：`p2p_init` 会持续向云端重试 P2P 鉴权，在未激活设备上调用会阻塞。
:::

## 实时流：拉模型，而非推模型

实时会话中 SDK 会**轮询你的取帧回调**，应用不主动调用发送接口。请填充 SDK 提供的 `MEDIA_FRAME`（其 `data` 缓冲区已预分配）并返回 0；当前无帧时返回 -1：

```c
static int user_get_video_frame(MEDIA_FRAME *frame)
{
    /* frame->type：eVideoIFrame / eVideoPBFrame / eAudioFrame 等
       填充 frame->data、frame->size、frame->pts（微秒）、frame->timestamp（毫秒） */
    return -1; /* 此刻没有帧 */
}
```

生命周期事件告诉你何时启停采集管线：

| 回调 | 用途 |
|---|---|
| `on_live_video_start/stop` | 打开/关闭视频编码 |
| `on_live_audio_start/stop` | 启动/停止音频采集 |
| `on_recv_audio_frame` | 接收 App 下行的对讲音频 |
| `on_request_i_frame` | 请求强制 IDR 帧 |
| `on_set_video_bitrate(kbps)` | 按链路状况调整编码码率 |

## 回放：推模型

向 App 发送录像使用显式推送接口，以 client 编号区分会话：

```c
tuya_ipc_media_playback_send_video_frame(client, &video_frame);
tuya_ipc_media_playback_send_audio_frame(client, &audio_frame);
tuya_ipc_media_playback_send_fragment_end(client, &fgmt);
tuya_ipc_media_playback_send_finish(client);
```

- 视频帧为 `MEDIA_VIDEO_FRAME_T`：编码格式（`TUYA_CODEC_VIDEO_H264`、`_H265` 等）、帧类型（`TUYA_VIDEO_FRAME_IFRAME` / `_PBFRAME`）、宽高、fps、缓冲区与时间戳。
- 音频帧为 `MEDIA_AUDIO_FRAME_T`：编码格式（如 `TUYA_CODEC_AUDIO_G711U`、`_AAC_ADTS`）、采样率、采样位数与声道。
- 首个 I 帧上线后调用 `tuya_ipc_media_p2p_video_send_start()`；跳转或切换录像段时调用 `tuya_ipc_media_p2p_drop_unsent()` 丢弃排队数据。

## 媒体流事件

注册一个事件回调来响应 App 的回放与下载请求：

```c
tuya_ipc_media_stream_register_event_cb(user_media_event);
/* int user_media_event(int device, int channel, MEDIA_STREAM_EVENT_E event, void *args) */
```

关键事件：

| 事件 | 请求 |
|---|---|
| `MEDIA_STREAM_LIVE_VIDEO_START/STOP`、`..._AUDIO_START/STOP` | 实时会话控制 |
| `MEDIA_STREAM_PLAYBACK_QUERY_MONTH_SIMPLIFY`、`..._QUERY_DAY_TS` | 查询哪些天有录像（填充月/日位图参数） |
| `MEDIA_STREAM_PLAYBACK_START_TS`、`..._PAUSE`、`..._RESUME`、`..._STOP`、`..._SET_SPEED` | 从时间戳开始的回放控制 |
| `MEDIA_STREAM_DOWNLOAD_START`、`..._DOWNLOAD_START_WITH_ENCRYPT` | 下载录像段 |

逻辑通道是固定的：0 信令、1 视频、2 音频、3 下载、5 相册。

## 本地存储

启用 `CONFIG_ENABLE_LOCAL_STORE` 后，`local_store` 模块通过你提供的文件系统 ops module 录制媒体（见 [适配新平台](port-to-platform.md)）。录像按关键帧切段并带日期索引：

```c
local_store_rec_start(prefix, segment_seconds);
local_store_rec_write(data, len, timestamp_ms, is_keyframe);
local_store_rec_write_audio(data, len, timestamp_ms);
local_store_rec_stop();
```

用 `local_store_query_month`、`local_store_query_day` 响应 App 的时间线查询，通过 reader 提供回放：

```c
LOCAL_STORE_READER_T *rd = local_store_reader_open(path);
local_store_reader_seek(rd, relative_ms);
while (local_store_reader_next(rd, &hdr, &payload) == OPRT_OK) {
    /* 通过 tuya_ipc_media_playback_send_video_frame 推送 */
}
local_store_reader_close(rd);
```

Linux 上示例提供 POSIX 文件系统 module，录像存储在 `./media`（可用 `-DLOCAL_STORE_ROOT` 覆盖）。ESP-IDF 移植目前尚未提供文件系统 module。

## Linux 示例做了什么

P2P 示例不需要真实摄像头：它加载内置 H.264 文件（Annex-B，2304×1296，15 fps），为访问单元建立索引，然后按帧节拍逐个送入内部环形缓冲。你的取视频回调从环形缓冲取数据，App 端就能看到这段循环文件的实时画面。媒体流事件由 `local_store` 应答，回放请求由专门的发送线程服务。P2P/ICE 线程请给足栈空间——示例使用 20 KB；4 KB 栈会在 pjproject 内部溢出。

## 下一步

- [Linux 快速开始](linux-quick-start.md) —— 运行 P2P 示例
- [适配新平台](port-to-platform.md) —— 文件系统 ops module 与平台要求
- [IoT API](iot-api.md) —— P2P 所依赖的激活与事件机制
