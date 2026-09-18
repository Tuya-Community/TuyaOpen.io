---
title: AI 비디오 입력
description: "AI Video Input (ai video)는 카메라 프레임을 캡처하고 AI 클라우드에 JPEG를 인코딩하여 디스플레이에 라이브 미리보기를 구동합니다."
keywords:
  - ai video input
  - camera capture
  - device ai
  - jpeg
  - tuyaopen
---

`ai_video`는 AI의 입력 소스로 카메라를 전환합니다. 그것은 카메라 프레임을 캡처, JPEG로 여전히 인코딩 그래서 AI는 장치를 볼 수 분석하고 디스플레이에 라이브 미리보기를 구동 할 수 있습니다. [AI Agent](ai-agent)를 통해 클라우드에 캡처한 JPEG를 보냅니다.

** 옵션 ** 모듈입니다. Kconfig 옵션 `ENABLE_COMP_AI_VIDEO`와 함께 사용할 수 있습니다. 옵션이 꺼지면 아래 기능의 아무도 내장되어 있습니다.

## 무엇 그것
-**Captures and encodes** - 카메라에서 프레임을 끌어서 수요에 JPEG로 인코딩합니다.
- **Previews live** - 플러시 콜백을 통해 디스플레이 스트림 카메라 프레임, 그래서 사용자는 카메라가 보는 것을 볼 수 있습니다.

미리보기 경로와 캡처 경로는 독립적입니다. JPEG 캡처에 영향을주지 않고 라이브 미리보기를 시작하고 미리보기가 실행되지 않는 JPEG를 캡처 할 수 있습니다.

## 구성
`AI_VIDEO_CFG_T`를 `ai_video_init`로 전달합니다. 단일 필드는 모든 미리보기 프레임에 대한 모듈 호출을 표시합니다.

```c
typedef void (*AI_VIDEO_DISP_FLUSH_CB)(TDL_CAMERA_FRAME_T *frame);

typedef struct {
    AI_VIDEO_DISP_FLUSH_CB disp_flush_cb;
} AI_VIDEO_CFG_T;
```

콜백은 각 프레임에 대한 `TDL_CAMERA_FRAME_T *`를받습니다. 콜백 안에 디스플레이에 렌더링합니다. 단위는 구조를 소유합니다; 그것을 해방하지 마십시오.

## API 참조
헤더: `ai_video_input.h`. 모든 기능은 `OPERATE_RET` (`OPRT_OK`를 성공에 반환합니다)를 반환합니다.

```c
OPERATE_RET ai_video_init(AI_VIDEO_CFG_T *vi_cfg);
OPERATE_RET ai_video_get_jpeg_frame(uint8_t **image_data, uint32_t *image_data_len);
OPERATE_RET ai_video_jpeg_image_free(uint8_t **image_data);
OPERATE_RET ai_video_display_start(void);
OPERATE_RET ai_video_display_stop(void);
```

|제품정보|이름 *|제품정보|
|----------|------------|---------|
|`ai_video_init`를|`vi_cfg` - 비디오 구성|모듈을 초기화하고 디스플레이-flush 콜백을 등록합니다.|
|`ai_video_get_jpeg_frame`를|`image_data` - JPEG 버퍼 포인터를받습니다. `image_data_len` - 길이를받습니다.|한 프레임을 캡처하고 JPEG로 인코딩합니다.|
|`ai_video_jpeg_image_free`를|`image_data` - JPEG 버퍼 포인터에 포인터|`ai_video_get_jpeg_frame`에 의해 반환된 JPEG 완충기를 풀어 놓으십시오.|
|`ai_video_display_start`를| — |라이브 미리보기를 시작; 프레임은 플러시 콜백에 흐릅니다.|
|`ai_video_display_stop`를| — |라이브 미리보기를 중지합니다.|

:::대여
`ai_video_jpeg_image_free`를 가진 항상 쌍 `ai_video_get_jpeg_frame`. 캡처 된 JPEG는 heap-allocated입니다. 일단 보내거나 복사 한 후에는 장치가 모든 캡처에 메모리를 누출합니다.
:::

## 클라우드에 캡처 된 프레임을 전송
JPEG를 캡처, `ai_agent_send_image`로 업로드, 다음 버퍼를 무료로:

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

카메라가 보는 사용자를 표시하려면, 플러시 콜백으로 초기화하고 미리보기를 시작합니다.

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

## 참조
- [AI Agent] (ai-agent) - `ai_agent_send_image`로 캡처 된 JPEG를 업로드
- [Component Framework] (ai-components.md) - `ai_video`가 더 넓은 AI 프레임 워크에 적합
- [Multimodal Data Flow](../multimodal-data-flow) - 장치와 클라우드 간의 이미지 여행
