---
title: 프레임워크 진입점
description: "Framework Entry (ai main)는 구성 요소를 초기화하고 채팅 모드를 등록하고 TuyaOpen AI 앱에서 이벤트 파견을 시작합니다."
keywords:
  - ai main
  - framework entry
  - tuyaopen ai
  - ai_chat_init
  - device ai
---

`ai_main`는 On-device AI 프레임 워크의 항목 포인트입니다. One call - `ai_chat_init` - 활성화 된 구성 요소를 초기화, 채팅 모드를 등록, 대화를 구동하는 이벤트에 가입하고 파견을 시작합니다. 응용 프로그램의 나머지는이 하나의 모듈을 통해 프레임 워크에 이야기합니다.

이 페이지는 항목 API의 참조입니다. 전체 통합 연습을 위해 - 어떤 모듈이 존재하고, 어떻게 서로 맞으며, 완벽한 앱을 와이어하는 방법 - [Component Framework](ai-components.md)를 참조하십시오.

## 구성
`AI_CHAT_MODE_CFG_T`를 `ai_chat_init`에 전달하십시오:

```c
typedef struct {
    AI_CHAT_MODE_E        default_mode;
    int                   default_vol;
    AI_USER_EVENT_NOTIFY  evt_cb;
} AI_CHAT_MODE_CFG_T;
```

|제품정보|이름 *|
|-------|---------|
|`default_mode`를|(`AI_CHAT_MODE_HOLD`, `AI_CHAT_MODE_ONE_SHOT`, `AI_CHAT_MODE_WAKEUP`, 또는 `AI_CHAT_MODE_FREE`)에서 시작하는 채팅 모드. 모드가 저장되지 않거나 저장된 모드는 등록되지 않습니다.|
|`default_vol`를|기본 볼륨, `0`–`100`. 볼륨이 저장되지 않을 때 사용.|
|`evt_cb`를|`AI_USER_EVENT_NOTIFY` 콜백은 응용 프로그램에 대한 프레임 워크 이벤트를 수신합니다.|

프레임 워크는 활성 모드와 볼륨을 주장합니다. `ai_chat_init`는 저장된 값을로드하고 `default_mode`와 `default_vol`로 돌아갑니다.

## API 참조
헤더: `ai_chat_main.h`.

```c
OPERATE_RET ai_chat_init(AI_CHAT_MODE_CFG_T *cfg);
OPERATE_RET ai_chat_set_volume(int volume);
int         ai_chat_get_volume(void);
```

|제품정보|이름 *|기타 제품|제품정보|
|----------|------------|---------|---------|
|`ai_chat_init`를|`cfg` - 채팅 구성|`OPERATE_RET` (`OPRT_OK` 성공)|활성화 된 구성 요소를 초기화하고 채팅 모드를 등록하고, 파견 이벤트를 시작합니다.|
|`ai_chat_set_volume`를|`volume` - `0`–`100`|`OPERATE_RET`를|재생 볼륨을 설정합니다.|
|`ai_chat_get_volume`를| — |`int` - `0`–`100`|현재 재생 볼륨을 가져옵니다.|

:::기사
프레임 워크는 당신을 위해 [AI Agent] (ai-agent)를 초기화합니다. `ai_chat_init`는 `EVENT_MQTT_CONNECTED`에 가입하고 에이전트는 MQTT 연결이 성공하면 자동으로 초기화됩니다. `ai_agent_init`를 직접 호출하지 않습니다.
:::

## 작업 예
일단 프레임 워크를 초기화 한 다음 실행 시간에 볼륨을 조정 :

```c
static void __ai_user_event(AI_NOTIFY_EVENT_T *event)
{
    // Handle framework events for your application here.
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

## 참조
- [Component Framework](ai-components.md) - 전체 통합 워크플로우 및 모듈 맵
- [AI Agent] (ai-agent) - 클라우드 브리지 프레임 워크가 당신을 위해 초기화
- [Multimodal Data Flow](../multimodal-data-flow) - 장치와 클라우드 간의 데이터 여행
