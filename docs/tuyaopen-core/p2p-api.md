---
title: Using the P2P API
description: "The TuyaOpen Core P2P API: initialize the P2P service with a callback table, supply live frames via pull callbacks, push playback frames, answer media-stream events, and use local storage."
keywords:
  - tuyaopen core
  - p2p
  - ipc
  - rtc
  - media
  - local store
---

The P2P API gives an IP-camera-style device low-latency, NAT-traversing audio/video sessions with the Tuya app. It is compiled only when `CONFIG_ENABLE_TUYA_P2P` is enabled (see [Add the library to a project](add-to-project.md)). The session layer is ICE/RTC (vendored pjproject plus KCP), with an RTP stack carrying the media.

:::warning
P2P requires a **cloud-activated device**: initialize it after MQTT connects. Your product must be an **IPC category** product in the cloud console — other categories cannot complete P2P configuration. Cloud signaling arrives as the `TUYA_EVENT_RTC_REQ` event (see [IoT API](iot-api.md)).
:::

## Two integration layers

- `tuya_p2p_sdk.h` — application glue: `TUYA_APP_Start` reports capabilities, initializes the RTC engine and P2P service, and wires cloud/LAN signaling.
- `tuya_ipc_p2p.h` — the underlying callback-table API (`p2p_init`). Prefer it over the legacy `tuya_imm_*` functions in `tuya_p2p_api.h`, which are stubs in the current source.

The Linux sample uses the glue layer; the ten callbacks are the same either way.

## Start the service

Fill a `TUYA_IPC_SDK_VAR_S` callback table and call `TUYA_APP_Start`:

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

`TUYA_APP_Start` reports the P2P capability (and local-storage capability when enabled), calls the RTC initializer, maps your callbacks into `TUYA_IPC_P2P_VAR_T`, then calls `p2p_init` and `p2p_rtc_listen_start`. Stop it with `TUYA_APP_End`. Cloud signaling needs no separate registration — feed `TUYA_EVENT_RTC_REQ` payloads through `gw_p2p_mqtt_data_cb`; when local link is enabled, LAN signaling is registered automatically.

:::warning
Don't start before activation: `p2p_init` retries P2P authentication against the cloud indefinitely, so calling it on an unactivated device blocks.
:::

## Live video: pull, not push

For live sessions the SDK **polls your get-frame callbacks**; you do not call a send function. Fill the SDK-provided `MEDIA_FRAME` (its `data` buffer is preallocated) and return 0; return -1 when no frame is available:

```c
static int user_get_video_frame(MEDIA_FRAME *frame)
{
    /* frame->type: eVideoIFrame / eVideoPBFrame / eAudioFrame ...
       fill frame->data, frame->size, frame->pts (us), frame->timestamp (ms) */
    return -1; /* no frame right now */
}
```

Lifecycle events tell you when to start and stop your capture pipeline:

| Callback | Use for |
|---|---|
| `on_live_video_start/stop` | Open/close the video encoder |
| `on_live_audio_start/stop` | Start/stop audio capture |
| `on_recv_audio_frame` | Accept downlink talk audio from the app |
| `on_request_i_frame` | Force an IDR frame |
| `on_set_video_bitrate(kbps)` | Adapt encoder bitrate to link conditions |

## Playback: push

Sending recorded video to the app uses explicit push calls, keyed by client:

```c
tuya_ipc_media_playback_send_video_frame(client, &video_frame);
tuya_ipc_media_playback_send_audio_frame(client, &audio_frame);
tuya_ipc_media_playback_send_fragment_end(client, &fgmt);
tuya_ipc_media_playback_send_finish(client);
```

- Video frames are `MEDIA_VIDEO_FRAME_T`: codec (`TUYA_CODEC_VIDEO_H264`, `_H265`, …), frame type (`TUYA_VIDEO_FRAME_IFRAME` / `_PBFRAME`), width, height, fps, buffer, and timestamps.
- Audio frames are `MEDIA_AUDIO_FRAME_T`: codec (e.g. `TUYA_CODEC_AUDIO_G711U`, `_AAC_ADTS`), sample rate, sample bits, and channel.
- After the first I-frame is on the wire, call `tuya_ipc_media_p2p_video_send_start()`; when seeking or switching segments, call `tuya_ipc_media_p2p_drop_unsent()` to discard queued data.

## Media-stream events

Register one event callback to answer the app's playback and download requests:

```c
tuya_ipc_media_stream_register_event_cb(user_media_event);
/* int user_media_event(int device, int channel, MEDIA_STREAM_EVENT_E event, void *args) */
```

Key events:

| Event | Request |
|---|---|
| `MEDIA_STREAM_LIVE_VIDEO_START/STOP`, `..._AUDIO_START/STOP` | Live session control |
| `MEDIA_STREAM_PLAYBACK_QUERY_MONTH_SIMPLIFY`, `..._QUERY_DAY_TS` | Answer which days have recordings (fill the month/day bitmap arguments) |
| `MEDIA_STREAM_PLAYBACK_START_TS`, `..._PAUSE`, `..._RESUME`, `..._STOP`, `..._SET_SPEED` | Playback control from a timestamp |
| `MEDIA_STREAM_DOWNLOAD_START`, `..._DOWNLOAD_START_WITH_ENCRYPT` | Download recorded segments |

Logical channels are fixed: 0 signaling, 1 video, 2 audio, 3 download, 5 album.

## Local storage

When `CONFIG_ENABLE_LOCAL_STORE` is enabled, the `local_store` module records media onto the file-system ops module you provide (see [Port to a new platform](port-to-platform.md)). Recordings are written as keyframe-rolled segments with a day index:

```c
local_store_rec_start(prefix, segment_seconds);
local_store_rec_write(data, len, timestamp_ms, is_keyframe);
local_store_rec_write_audio(data, len, timestamp_ms);
local_store_rec_stop();
```

Answer the app's timeline queries with `local_store_query_month` and `local_store_query_day`, and serve playback through a reader:

```c
LOCAL_STORE_READER_T *rd = local_store_reader_open(path);
local_store_reader_seek(rd, relative_ms);
while (local_store_reader_next(rd, &hdr, &payload) == OPRT_OK) {
    /* push via tuya_ipc_media_playback_send_video_frame */
}
local_store_reader_close(rd);
```

On Linux the sample supplies a POSIX file-system module and stores under `./media` (override with `-DLOCAL_STORE_ROOT`). The ESP-IDF port does not yet provide a file-system module.

## What the Linux sample does

The P2P sample needs no real camera: it loads a bundled H.264 file (Annex-B, 2304×1296, 15 fps), indexes its access units, and emits one unit per frame tick into an internal ring buffer. Your get-video callback drains that ring buffer, so the app shows the looped file as a live stream. Media-stream events are answered from `local_store`, and playback requests are served by a dedicated send thread. Give the P2P/ICE thread a generous stack — the sample uses 20 KB; a 4 KB stack overflows inside pjproject.

## Next steps

- [Quick start on Linux](linux-quick-start.md) — run the P2P sample
- [Port to a new platform](port-to-platform.md) — the file-system ops module and platform expectations
- [IoT API](iot-api.md) — the activation and event mechanism P2P builds on
