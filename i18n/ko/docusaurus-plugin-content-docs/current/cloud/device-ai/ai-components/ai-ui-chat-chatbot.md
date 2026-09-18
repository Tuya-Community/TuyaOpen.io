---
title: 챗봇 UI
description: "Chatbot UI (ai ui chat chatbot)는 kiosks와 장난감과 같은 초점 표시를 위한 시간, 최신 AI 대답 또는 상태에 1개의 중심에 두는 메시지를 보여줍니다."
keywords:
  - chatbot ui
  - ai ui
  - device ai
  - tuyaopen
  - chat display
---

`ai_ui_chat_chatbot`는 TuyaOpen AI 프레임 워크를 위한 간단한 chatbot UI입니다. 그것은 화면에 중심 한 번에 하나의 메시지를 보여줍니다 - 현재 AI 응답 또는 상태 - 오히려 스크롤 역사보다. 그것은 [`ai_ui_manage`] (ai-ui-manage) 인터페이스를 구현하므로 채팅 메시지, 감정 및 프레임 워크 파견 상태를 렌더링합니다.

## 그것을 선택할 때
Chatbot UI를 선택하면 깨끗하고 초점을 맞춘 디스플레이를 원하는 경우 최신 메시지 - 키오스크, 장난감, 또는 텍스트가 전체 채팅 스레드보다 더 명확합니다. 색상 LCD의 스크롤 버블 대화는 [WeChat-style UI](ai-ui-chat-wechat); 작은 모노크롬 스크린 사용 [OLED UI](ai-ui-chat-oled).

## 그것을 사용
스타일을 등록하면 UI 모듈을 초기화합니다. `ai_ui_init()`가 스타일 `disp_init` 콜백을 호출하기 때문에 먼저 등록:

```c
#include "ai_ui_chat_chatbot.h"
#include "ai_ui_manage.h"

// Register the Chatbot UI, then initialize the UI module.
ai_ui_chat_chatbot_register();
ai_ui_init();
```

`ai_ui_chat_chatbot_register()`는 `OPERATE_RET` (`OPRT_OK`를 성공) 반환합니다. 이 스타일이 노출되는 유일한 기능입니다. 즉, `ai_ui_manage`를 통해 화면을 완전히 구동합니다.

:::기사
`ai_ui_init()`를 호출하기 전에 정확히 하나의 UI 스타일을 등록하십시오. 초기화 후, `ai_ui_disp_msg()`로 메시지를 보내 - [UI Management](ai-ui-manage)를 참조하십시오.
:::

## 참조
- [UI Management](ai-ui-manage) - 이 스타일의 파견층은
- [WeChat-style UI](ai-ui-chat-wechat) - 컬러 LCD용 버블 채팅
- [OLED UI] (ai-ui-chat-oled) - 작은 모노크롬 스크린의 경우
- [AI Agent](ai-agent) - 메시지 생성 클라우드 브리지
- [Component Framework] (ai-components.md) - `ai_ui`가 더 넓은 AI 프레임 워크에 적합
