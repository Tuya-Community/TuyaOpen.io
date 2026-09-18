---
title: OLED UI
description: "OLED UI (ai ui chat oled)는 소형 널에 단단한 화소 및 기억 예산을 위해 조정된 작은 단색 OLED 패널에 AI 대화를, 만듭니다."
keywords:
  - oled ui
  - ai ui
  - device ai
  - tuyaopen
  - monochrome display
---

`ai_ui_chat_oled`는 소형 단색 OLED 스크린을 위해 낙관된 TuyaOpen AI 기구를 위한 잡담 UI입니다. 일반 OLED 패널의 제한된 공간과 단일 색상의 대화를 렌더링하여 그래픽 거품 레이아웃이 맞지 않을 수 있습니다. 그것은 [`ai_ui_manage`] (ai-ui-manage) 인터페이스를 구현하므로 채팅 메시지를 렌더링하고 프레임 워크 파견 상태를 확인합니다.

## 그것을 선택할 때
제품을 사용할 때 OLED UI를 선택하십시오 ** 소형 단색 OLED** (0.96" 또는 1.3" SSD1306 클래스 패널과 같은) - 일반, 저비용 보드. 그것은 단단한 화소 및 기억 예산을 위해 조정됩니다. 색상 LCD의 스크롤 버블 대화는 [WeChat-style UI](ai-ui-chat-wechat); 중심의 단일 메시지 사용 [Chatbot UI](ai-ui-chat-chatbot).

## 그것을 사용
스타일을 등록하면 UI 모듈을 초기화합니다. `ai_ui_init()`가 스타일 `disp_init` 콜백을 호출하기 때문에 먼저 등록:

```c
#include "ai_ui_chat_oled.h"
#include "ai_ui_manage.h"

// Register the OLED UI, then initialize the UI module.
ai_ui_chat_oled_register();
ai_ui_init();
```

`ai_ui_chat_oled_register()`는 `OPERATE_RET` (`OPRT_OK`를 성공) 반환합니다. 이 스타일이 노출되는 유일한 기능입니다. 즉, `ai_ui_manage`를 통해 화면을 완전히 구동합니다.

:::기사
`ai_ui_init()`를 호출하기 전에 정확히 하나의 UI 스타일을 등록하십시오. 초기화 후, `ai_ui_disp_msg()`로 메시지를 보내 - [UI Management](ai-ui-manage)를 참조하십시오.
:::

## 참조
- [UI Management](ai-ui-manage) - 이 스타일의 파견층은
- [WeChat-style UI](ai-ui-chat-wechat) - 컬러 LCD용 버블 채팅
- [Chatbot UI](ai-ui-chat-chatbot) - 중심의 단거리 디스플레이
- [AI Agent](ai-agent) - 메시지 생성 클라우드 브리지
- [Component Framework] (ai-components.md) - `ai_ui`가 더 넓은 AI 프레임 워크에 적합
