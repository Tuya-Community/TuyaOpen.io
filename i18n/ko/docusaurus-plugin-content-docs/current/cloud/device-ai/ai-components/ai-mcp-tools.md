---
title: 내장 MCP 도구
description: "내장 MCP 도구는 MCP 서버를 통해 AI 호출, 카메라, 볼륨, 모드 (info, camera, volume, mode)의 사전 등록 된 장치 기능입니다."
keywords:
  - mcp tools
  - device tools
  - ai mcp
  - tuyaopen
  - physical ai agent
---

프레임 워크는 이미 작성 및 등록 된 MCP 도구 세트를 발송하므로 on-device AI는 장치에서 작동 할 수 있으므로 [MCP 서버] (ai-mcp-server)가 올립니다. `ai_mcp_init`는 MQTT가 연결될 때 자동으로 등록합니다.

그들은 또한 ** 설정 구현 **. 각 도구 패턴의 전체 작업 예제입니다 - 속성을 읽는 콜백, 구성 요소를 터치하고 값을 반환합니다 - 그래서 당신은 자신의 도구를 작성할 때 모양을 복사 할 수 있습니다.

:::기사
이 도구는 `ai_mcp_tools.c`에서 정의됩니다. 몇몇은 그들의 성분이 활성화될 때에서만 컴파일됩니다, 그래서 주어진 널은 그것의 건축 윤곽에 달려 있습니다.
:::

## 도구
|도구 이름|AI는 할 수 있습니다|구성 요소 그것은 접촉|제품정보|
|-----------|--------------------|----------------------|--------------|
|`device_info_get`를|장치 정보 읽기 - 모델, 일련 번호 및 펌웨어 버전 - 그리고 JSON로 다시 얻을.|장치 메타데이터 (`PROJECT_NAME`, `PROJECT_VERSION`)|항상 등록|
|`device_camera_take_photo`를|장치 카메라와 함께 하나 이상의 사진을 캡처 (예를 들어 감지 된 장면 변경, 방문자, 또는 사용자 요청) 그리고 Base64 이미지로 다시 얻을.|`ai_video_input`를|`ENABLE_COMP_AI_VIDEO` 요구|
|`device_audio_volume_set`를|장치의 재생 볼륨을 0에서 100 수준으로 설정합니다.|`ai_audio_player`를|`ENABLE_COMP_AI_AUDIO` 요구|
|`device_audio_mode_set`를|장치의 채팅 모드를 전환 - `0` 파악, `1` 키 프레스, `2` 깨어, `3` 무료.|`ai_manage_mode`를|항상 등록|

## 각 것을 건축하는 방법
도구는 같은 패턴을 따라 자신의 사용, 그래서 템플릿으로 그들을 읽습니다.

- **`device_info_get`**는 모델, 일련 번호 및 펌웨어 버전으로 `cJSON` 객체를 구축하고, `ai_mcp_return_value_set_json`로 반환합니다. 입력 속성이 없습니다.
- **`device_camera_take_photo`**는 비디오 디스플레이를 시작으로 `ai_video_input`에서 JPEG 프레임을 잡아 `MCP_IMAGE_MIME_TYPE_JPEG`를 사용하여 `ai_mcp_return_value_set_image`로 반환합니다. `question` 문자열 속성과 `count` 정수 속성을 `1`–`10`로 나타냈습니다.
- **`device_audio_volume_set`**는 `volume` 정수 속성을 읽습니다 (`0`–`100`), `ai_audio_player_set_vol`와 함께 적용하고 성공을 위해 ean을 반환합니다.
- **`device_audio_mode_set`**는 `mode` 정수 속성을 읽습니다 (`0`–`3`), `ai_mode_switch`와 스위치 모드, 스위치가 성공했는지 여부에 대한 안을 반환합니다.

:::가격
각 콜백은 동일한 루프와 함께 속성 목록에서 입력을 읽습니다. `prop->name`와 일치하여 `prop->type`를 확인한 다음 `prop->default_val` 필드를 읽습니다. 자신의 도구에서 패턴을 재사용합니다.
:::

## 참조
- [MCP Server](ai-mcp-server) - 자신의 도구를 등록하고 속성을 정의하고 값 반환
- [AI Agent](ai-agent) - 장치가 Tuya AI 클라우드에 어떻게 이야기하는지
- [Component Framework] (ai-components.md) - `ai_mcp`가 AI 프레임 워크에 앉아있는 곳
- [Multimodal data flow](../multimodal-data-flow) - 기기를 통해 입력 및 출력 이동 방법
