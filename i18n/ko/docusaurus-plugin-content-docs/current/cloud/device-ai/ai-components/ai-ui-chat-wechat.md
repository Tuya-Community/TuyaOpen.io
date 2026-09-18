---
title: WeChat 스타일 UI
description: "WeChat-style UI (ai ui chat wechat)는 스트리밍 답글 및 카메라 미리보기와 함께 색상 LCD에 스크롤 버블 스레드로 대화를 렌더링합니다."
keywords:
  - wechat ui
  - ai ui
  - device ai
  - tuyaopen
  - chat bubbles
---

`ai_ui_chat_wechat`는 TuyaOpen AI 기구를 위한 WeChat 작풍 거품 잡담 UI입니다. 그것은 거품의 스크롤 스레드로 대화를 보여줍니다 - 오른쪽에 사용자의 메시지, 왼쪽에 AI의 답글 - 사람들이 이미 메시징 앱에서 알고 있습니다. 그것은 [`ai_ui_manage`] (ai-ui-manage) 인터페이스를 구현하므로 모든 채팅 메시지, 감정, 상태, 카메라 프레임을 렌더링하고 프레임 워크 파견을 그림합니다.

## 그것을 선택할 때
제품에는 ** 컬러 LCD**가 그래픽, 멀티메시지 스레드에 대한 충분한 해상도와 메모리를 가진 WeChat-style UI를 선택하십시오. 3개의 붙박이 작풍의 가장 부유합니다: 그것은 스크린에 최근 역사를 지키고, AI는 낱말에 의해 낱말을 대답하고, 사진기 시사 및 그림을 보여줄 수 있습니다. 단일 중심 메시지 사용 [Chatbot UI](ai-ui-chat-chatbot); 작은 모노크롬 스크린 사용 [OLED UI](ai-ui-chat-oled).

## 그것을 사용
스타일을 등록하면 UI 모듈을 초기화합니다. `ai_ui_init()`가 스타일 `disp_init` 콜백을 호출하기 때문에 먼저 등록:

```c
#include "ai_ui_chat_wechat.h"
#include "ai_ui_manage.h"

// Register the WeChat-style UI, then initialize the UI module.
ai_ui_chat_wechat_register();
ai_ui_init();
```

`ai_ui_chat_wechat_register()`는 `OPERATE_RET` (`OPRT_OK`를 성공) 반환합니다. 이 스타일이 노출되는 유일한 기능입니다. 즉, `ai_ui_manage`를 통해 화면을 완전히 구동합니다.

:::기사
`ai_ui_init()`를 호출하기 전에 정확히 하나의 UI 스타일을 등록하십시오. 초기화 후, `ai_ui_disp_msg()`로 메시지를 보내 - [UI Management](ai-ui-manage)를 참조하십시오.
:::

## 참조
- [UI Management](ai-ui-manage) - 이 스타일의 파견층은
- [Chatbot UI](ai-ui-chat-chatbot) - 중심의 단거리 디스플레이
- [OLED UI] (ai-ui-chat-oled) - 작은 모노크롬 스크린의 경우
- [AI Agent](ai-agent) - 메시지 생성 클라우드 브리지
- [Component Framework] (ai-components.md) - `ai_ui`가 더 넓은 AI 프레임 워크에 적합
