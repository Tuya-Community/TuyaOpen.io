---
title: 사용자 지정 디바이스 MCP(하드웨어 스킬 가이드)
description: "TClaw 사용자 정의 장치 MCP 도구는 카메라, 센서를 노출하고 하드웨어 기술로 디스플레이 AI 에이전트는 장치 하드웨어에 호출 할 수 있습니다."
keywords:
  - duckyclaw
  - tclaw
  - device mcp
  - hardware skills
  - physical ai agent
---

# TClaw - 사용자 정의 장치 MCP (Hardware Skills 가이드)
이 가이드는 TClaw (이전 DuckyClaw)에 대한 맞춤형 장치 MCP 도구 (하드웨어 기술)를 만드는 방법을 설명합니다. 카메라, 센서, 디스플레이, 기타 주변 장치를 연결하고 싶은 앱 개발자는 동일한 에이전트 프레임 워크로 연결되는 기술로 연결되므로 에이전트는 센서 데이터, 하드웨어에 대한 트리거 작업, 클라우드 AI와 장치 입력을 결합 할 수 있습니다.

## 필수품
- 대상 플랫폼 (Tuya T5AI, ESP32, Raspberry Pi 또는 Linux)에 대한 [환경 설정](/docs/quick-start/enviroment-setup)을 완료했습니다.
- [MCP Server](/docs/cloud/device-ai/ai-components/ai-mcp-server) (tool discovery and exec) 및 [MCP Tools](/docs/cloud/device-ai/ai-components/ai-mcp-tools) (predefined Device tools)와 기본 친숙성.
- TClaw-capable 널 또는 런타임. 지원되는 플랫폼에 대한 [TClaw 프로젝트](https://github.com/tuya/DuckyClaw)를 참조하십시오.

## 요구 사항
- ** 기계설비 **: 지원되는 널 (예를들면 Tuya T5AI 단위, ESP32, Raspberry Pi 4/5, 또는 Linux 팔/x64) 및 기술 (카메라, 감지기, 전시, 등)로 노출하고 싶은 어떤 주변 장치.
-**Software**: MCP 지원을 가진 SDK SDK; 당신의 윤곽에서 사용 가능한 `ENABLE_COMP_AI_MCP`.
- **라이센스 키**: Tuya 라이센스 키는 Tuya 클라우드 액세스를 위해 필요합니다.
- ** 옵션 **: TuyaOpen 드라이버 또는 API는 통합 (예 : 센서 드라이버, 디스플레이 드라이버)입니다.


## 개요: TClaw의 장치 MCP
TClaw에서**device MCP**는 MCP 서버를 실행하고 **tools** 에이전트 (현지 또는 클라우드)가 발견하고 호출 할 수 있다는 것을 의미합니다. 각 도구는 이름, 설명, 입력 매개 변수 및 장치에서 실행되는 콜백과 기능입니다. TClaw의 내장 장치 MCP 도구는 다음과 같습니다.

- **CRON**: 일정한 장치 작업 및 심화.
- **전화**: 장치에서 파일 작업.
- **IoT Device Control**: Tuya 연결 장치의 관리.
- **EXEC** (예: Raspberry Pi): 원격 코드 실행.

** 사용자 지정 장치 MCP** (hardware Skill)를 구축할 때 하드웨어를 사용하기 위해 하나 이상의 새로운 도구를 정의합니다. 예를 들어 "읽는 온도," "캡쳐 이미지," 또는 "설정 표시 텍스트" 에이전트는 내장 된 것과 같은 방식으로이 도구를보고 동일한 루프에서 호출 할 수 있습니다.

## 개발 단계
## 1. MCP를 활성화하고 서버를 초기화
MCP 구성 요소가 구성 (예: `ai_mcp/Kconfig` → `ENABLE_COMP_AI_MCP`)에서 활성화됩니다. 애플리케이션 시작에서 MQTT (또는 TClaw 스택 사용 전송)이 준비되면 MCP 서버를 초기화하고 도구를 등록하십시오.

```c
#include "ai_mcp_server.h"

OPERATE_RET init_my_mcp(void)
{
    TUYA_CALL_ERR_RETURN(ai_mcp_server_init("My Device MCP", "1.0"));
    // Register custom tools (step 2)
    return OPRT_OK;
}
```

Details: [MCP Server – MCP 서버 초기화](/docs/cloud/device-ai/ai-components/ai-mcp-server#initialize-mcp-server).

## 2. 도구 콜백 정의
입력 속성을 수신하는 콜백을 구현하고 하드웨어 또는 논리를 수행하고 반품 값을 설정합니다. 인수를 읽으려면 속성 도움말을 사용하십시오 (예: `MCP_PROPERTY_TYPE_INTEGER`, `MCP_PROPERTY_TYPE_STRING`).

```c
static OPERATE_RET my_sensor_read_cb(const MCP_PROPERTY_LIST_T *properties,
                                     MCP_RETURN_VALUE_T *ret_val,
                                     void *user_data)
{
    (void)properties;
    (void)user_data;
    // Read from your sensor (TuyaOpen driver or HAL)
    int value = my_sensor_get_value();
    ai_mcp_return_value_set_int(ret_val, value);
    return OPRT_OK;
}
```

반환 유형: 사용 `ai_mcp_return_value_set_bool`, `ai_mcp_return_value_set_int`, `ai_mcp_return_value_set_str`, `ai_mcp_return_value_set_json`, 또는 `ai_mcp_return_value_set_image` 적합. 반환 값이 동적 할당 된 데이터를 사용하여 `ai_mcp_return_value_cleanup`로 청소하십시오.

## 3. 속성을 가진 공구 등록
`AI_MCP_TOOL_ADD` 매크로를 사용하여 도구를 생성하고 등록합니다. `MCP_PROP_*` 매크로로 입력 속성을 정의하므로 에이전트는 전달하는 매개 변수를 알고 있습니다.

```c
TUYA_CALL_ERR_RETURN(AI_MCP_TOOL_ADD(
    "sensor_temperature_read",
    "Read the current temperature from the onboard sensor in degrees Celsius.",
    my_sensor_read_cb,
    NULL
));
```

매개변수를 가진 보기:

```c
TUYA_CALL_ERR_RETURN(AI_MCP_TOOL_ADD(
    "display_show_text",
    "Show text on the device display.",
    display_show_text_cb,
    NULL,
    MCP_PROP_STR("text", "The text to display."),
    MCP_PROP_INT_DEF_RANGE("line", "Line number (1-4).", 1, 1, 4),
    MCP_PROP_END
));
```

참고: [MCP Server – Attribute 정의 매크로](/docs/cloud/device-ai/ai-components/ai-mcp-server#attribute-definition-macro) 및 [개발 단계](/docs/cloud/device-ai/ai-components/ai-mcp-server#development-steps).

## 4. 와이어 메시지 처리
MCP 메시지 (예를 들어 JSON-RPC와 같은 채널 TClaw가 에이전트에 사용됩니다) 서버로 전달됩니다.

```c
ai_mcp_server_parse_message(json, NULL);
```

이것은 일반적으로 메시지 또는 MQTT 콜백에서 TClaw/AI 에이전트 스택 사용. 서버는 올바른 도구 콜백을 파견하고 응답을 반환합니다.

## 5. 빌드 및 검증
대상 보드, 플래시 또는 배포를위한 응용 프로그램을 구축하고 TClaw를 실행합니다. 에이전트 (또는 클라우드)가 새로운 도구를 나열 할 수 있는지 확인합니다. 예상된 결과: 도구 목록에서 나타나고 호출 할 때 값 (integer, string, JSON 등)의 올바른 유형을 반환합니다.

## TuyaOpen 드라이버와 통합
하드웨어 기술에 대한 TuyaOpen 드라이버 및 API를 사용하여 공구 콜백은 보드 전체에 휴대용을 유지합니다. TKL 또는 드라이버 레이어 (예 : 센서 용 ADC, 릴레이 용 GPIO)를 통해 주변 장치가 가능 할 때 보드 별 코드보다 오히려. [TClaw 페이지](/tclaw)에 설명된 “TuyaOpen 드라이버와 APIs에 대한 빌드”와 일치합니다.

:::정보
[Generic 예제](/docs/examples/demo-generic-examples)에는 하드웨어 인터페이스 및 최소 인터페이스 코드를 검증하는 데 도움이되는 샘플 코드를 포함합니다. 장치 MCP 도구 콜백으로 배선하기 전에 주변 장치 (예 : GPIO, UART, ADC)를 테스트하는 데 사용됩니다.
:::

## 참조
- [MCP Server](/docs/cloud/device-ai/ai-components/ai-mcp-server) - 장치 MCP 액세스, 도구 등록 및 API 참조.
- [MCP Tools](/docs/cloud/device-ai/ai-components/ai-mcp-tools) - 사전 정의된 장치 도구 및 초기화.
- [Generic 예제](/docs/examples/demo-generic-examples) - 하드웨어 인터페이스 및 최소 인터페이스 코드 예제를 검증합니다.
- [TClaw 프로젝트] (https://github.com/tuya/DuckyClaw) - 저장소 및 내장 장치 MCP 도구 (CRON, FILE, IoT, EXEC).
