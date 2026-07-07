---
title: 视频输入
description: "ai_video 把摄像头变成 AI 的输入源，采集画面并编码为 JPEG 供 AI 视觉问答，同时通过回调驱动屏幕实时预览。"
keywords:
  - ai_video
  - 视频输入
  - 摄像头采集
  - 端侧 AI
---

`ai_video` 把摄像头变成 AI 的输入源。它采集摄像头画面、将一帧编码为 JPEG 静态图供 AI 分析设备所见，并在屏幕上驱动实时预览。你通过 [AI 智能体](ai-agent) 把采集到的 JPEG 发送到云端，用于视觉问答与图像理解。

这是一个**可选**模块。通过 Kconfig 选项 `ENABLE_COMP_AI_VIDEO` 启用；关闭该选项时，下文的函数不会参与编译。

## 功能说明

- **采集与编码**——按需从摄像头取一帧，并编码为 JPEG 静态图。
- **实时预览**——通过你提供的刷新回调把摄像头画面送到屏幕，让用户看到摄像头所见的画面。

预览路径与采集路径相互独立：你可以在不影响 JPEG 采集的前提下启动或停止实时预览，也可以在预览开启与否的情况下采集 JPEG。

## 配置

向 `ai_video_init` 传入一个 `AI_VIDEO_CFG_T`。它只有一个字段，即模块对每一帧预览调用的显示刷新回调：

```c
typedef void (*AI_VIDEO_DISP_FLUSH_CB)(TDL_CAMERA_FRAME_T *frame);

typedef struct {
    AI_VIDEO_DISP_FLUSH_CB disp_flush_cb;
} AI_VIDEO_CFG_T;
```

回调对每一帧都收到一个 `TDL_CAMERA_FRAME_T *`。在回调内把它渲染到屏幕。该帧由模块持有，请勿释放。

## API 参考

头文件：`ai_video_input.h`。所有函数返回 `OPERATE_RET`（成功为 `OPRT_OK`）。

```c
OPERATE_RET ai_video_init(AI_VIDEO_CFG_T *vi_cfg);
OPERATE_RET ai_video_get_jpeg_frame(uint8_t **image_data, uint32_t *image_data_len);
OPERATE_RET ai_video_jpeg_image_free(uint8_t **image_data);
OPERATE_RET ai_video_display_start(void);
OPERATE_RET ai_video_display_stop(void);
```

| 函数 | 参数 | 作用 |
|------|------|------|
| `ai_video_init` | `vi_cfg`——视频配置 | 初始化模块并注册显示刷新回调。 |
| `ai_video_get_jpeg_frame` | `image_data`——返回 JPEG 缓冲区指针；`image_data_len`——返回其长度 | 采集一帧并编码为 JPEG 静态图。 |
| `ai_video_jpeg_image_free` | `image_data`——指向 JPEG 缓冲区指针的指针 | 释放 `ai_video_get_jpeg_frame` 返回的 JPEG 缓冲区。 |
| `ai_video_display_start` | 无 | 启动实时预览；画面流向你的刷新回调。 |
| `ai_video_display_stop` | 无 | 停止实时预览。 |

:::warning
务必把 `ai_video_get_jpeg_frame` 与 `ai_video_jpeg_image_free` 成对使用。采集到的 JPEG 在堆上分配；发送或拷贝完成后即应释放，否则每次采集都会导致设备内存泄漏。
:::

## 把采集到的画面发往云端

采集 JPEG，用 `ai_agent_send_image` 上传，然后释放缓冲区：

```c
void send_camera_view_to_ai(void)
{
    uint8_t *jpeg = NULL;
    uint32_t jpeg_len = 0;

    if (OPRT_OK != ai_video_get_jpeg_frame(&jpeg, &jpeg_len)) {
        return;
    }

    // 上传静态图用于视觉问答；参见 AI 智能体页面。
    ai_agent_send_image(jpeg, jpeg_len);

    // 上传完成后释放缓冲区。
    ai_video_jpeg_image_free(&jpeg);
}
```

要向用户展示摄像头所见，初始化时传入刷新回调并启动预览：

```c
static void __disp_flush(TDL_CAMERA_FRAME_T *frame)
{
    // 在此把画面渲染到屏幕。请勿释放该帧。
}

void preview_init(void)
{
    AI_VIDEO_CFG_T cfg = { .disp_flush_cb = __disp_flush };
    ai_video_init(&cfg);
    ai_video_display_start();
}
```

## 相关文档

- [AI 智能体](ai-agent)——用 `ai_agent_send_image` 上传采集到的 JPEG
- [组件框架](ai-components.md)——`ai_video` 在整个 AI 框架中的位置
- [多模态数据流](../multimodal-data-flow)——图像如何在设备与云端之间传输
