---
title: AI Video Input
---

`ai_video` turns a camera into an input source for the AI. It captures camera frames, encodes a still as JPEG so the AI can analyze what the device sees, and drives a live preview on the display. You send a captured JPEG to the cloud through the [AI Agent](ai-agent) for visual question answering and image understanding.

It is an **optional** module. Enable it with the Kconfig option `ENABLE_COMP_AI_VIDEO`; when the option is off, none of the functions below are built.

## What it does

- **Captures and encodes** — pulls a frame from the camera and encodes it as a JPEG still on demand.
- **Previews live** — streams camera frames to the display through a flush callback you supply, so the user sees what the camera sees.

The preview path and the capture path are independent: you can start and stop the live preview without affecting JPEG capture, and capture a JPEG whether or not the preview is running.

## Configuration

Pass an `AI_VIDEO_CFG_T` to `ai_video_init`. Its single field is a display-flush callback the module calls for every preview frame:

```c
typedef void (*AI_VIDEO_DISP_FLUSH_CB)(TDL_CAMERA_FRAME_T *frame);

typedef struct {
    AI_VIDEO_DISP_FLUSH_CB disp_flush_cb;
} AI_VIDEO_CFG_T;
```

The callback receives a `TDL_CAMERA_FRAME_T *` for each frame. Render it to your display inside the callback. The module owns the frame; do not free it.

## API reference

Header: `ai_video_input.h`. Every function returns `OPERATE_RET` (`OPRT_OK` on success).

```c
OPERATE_RET ai_video_init(AI_VIDEO_CFG_T *vi_cfg);
OPERATE_RET ai_video_get_jpeg_frame(uint8_t **image_data, uint32_t *image_data_len);
OPERATE_RET ai_video_jpeg_image_free(uint8_t **image_data);
OPERATE_RET ai_video_display_start(void);
OPERATE_RET ai_video_display_stop(void);
```

| Function | Parameters | Purpose |
|----------|------------|---------|
| `ai_video_init` | `vi_cfg` — video configuration | Initialize the module and register the display-flush callback. |
| `ai_video_get_jpeg_frame` | `image_data` — receives the JPEG buffer pointer; `image_data_len` — receives its length | Capture one frame and encode it as a JPEG still. |
| `ai_video_jpeg_image_free` | `image_data` — pointer to the JPEG buffer pointer | Release a JPEG buffer returned by `ai_video_get_jpeg_frame`. |
| `ai_video_display_start` | — | Start the live preview; frames flow to your flush callback. |
| `ai_video_display_stop` | — | Stop the live preview. |

:::warning
Always pair `ai_video_get_jpeg_frame` with `ai_video_jpeg_image_free`. The captured JPEG is heap-allocated; free it once you have sent or copied it, or the device leaks memory on every capture.
:::

## Send a captured frame to the cloud

Capture a JPEG, upload it with `ai_agent_send_image`, then free the buffer:

```c
void send_camera_view_to_ai(void)
{
    uint8_t *jpeg = NULL;
    uint32_t jpeg_len = 0;

    if (OPRT_OK != ai_video_get_jpeg_frame(&jpeg, &jpeg_len)) {
        return;
    }

    // Upload the still for visual Q&A; see the AI Agent page.
    ai_agent_send_image(jpeg, jpeg_len);

    // Free the buffer once it is uploaded.
    ai_video_jpeg_image_free(&jpeg);
}
```

To show the user what the camera sees, initialize with a flush callback and start the preview:

```c
static void __disp_flush(TDL_CAMERA_FRAME_T *frame)
{
    // Render the frame to your display here. Do not free the frame.
}

void preview_init(void)
{
    AI_VIDEO_CFG_T cfg = { .disp_flush_cb = __disp_flush };
    ai_video_init(&cfg);
    ai_video_display_start();
}
```

## See also

- [AI Agent](ai-agent) — uploads the captured JPEG with `ai_agent_send_image`
- [Component Framework](ai-components.md) — how `ai_video` fits the wider AI framework
- [Multimodal Data Flow](../multimodal-data-flow) — how images travel between device and cloud
