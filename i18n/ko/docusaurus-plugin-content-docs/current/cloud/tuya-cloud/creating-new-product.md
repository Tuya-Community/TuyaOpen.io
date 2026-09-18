---
title: 제품 및 에이전트 생성
description: "Tuya의 제품 및 Agent 만들기 — 장치 기능을 정의, AI 에이전트, 클라우드에 펌웨어 항목, 다음 PID 당신의 보드에 대한 활성화."
keywords:
  - create product
  - tuya cloud
  - pid
  - ai agent
  - device cloud binding
---

제품 만들기는 [device–cloud 바인딩](device-cloud-binding)의 클라우드 측면 반입니다. Tuya 플랫폼에서 장치 모델을 정의합니다. 기능, AI 에이전트 및 펌웨어 항목 - 장치가 활성화 될 `PID`를 얻을 수 있습니다. 이 가이드는 빈 제품에서 플래시, 경계 보드로 가득 경로를 걸어.

:::기사
이 흐름은 Tuya Cloud를 사용하므로 라이센스 키 ())가 필요합니다. 새로운 이동 부품? [How device–cloud 바인딩 작품](device-cloud-binding)를 먼저 읽으십시오.
:::

## 필수품
- TuyaOpen SDK의 개발 환경 - [TuyaOpen 문서 센터](https://tuyaopen.ai/docs/about-tuyaopen)를 참조하십시오.
- Tuya Developer Platform 계정.
- 이사회의 라이센스 (`UUID` + `AuthKey`) - [Equipment authorization](../../quick-start/equipment-authorization)를 참조하십시오.

## 1. 제품 만들기
**Tuya Developer Platform**에 로그인하고 [AI 제품 > 개발](https://platform.tuya.com/pmg/list) 페이지를 엽니다. **Create**를 클릭하고 제품을 일치시키는 범주를 선택하고 [Create Product](https://developer.tuya.com/en/docs/iot/create-product?id=K914jp1ijtsfe) 를 눌러 작성을 완료합니다. 이 생성 `PID` 당신의 펌웨어 사용.

![상품](https://images.tuyacn.com/content-platform/hestia/1757320259ee8123626b5.png)

## 2. 제품 기능 추가 (DPs)
** 기능 정의 ** 탭에서 ** 제품 기능 ** 아래, ** 추가 ** 표준 및 사용자 정의 기능을 추가하거나 고급 기능을 활성화. 각 함수는 데이터 포인트(DP)가 됩니다. – 디바이스를 제어하기 위한 앱과 에이전트 사용 [제품 기능] (https://developer.tuya.com/en/docs/iot/define-product-features?id=K97vug7wgxpoq)를 보십시오.

![기능 추가](https://images.tuyacn.com/content-platform/hestia/17573218285953b9bc340.png)

## 3. AI 기능 추가
** 기능 정의 ** 탭에서 ** 제품 AI 기능 **, 클릭 ** Agent **. 전체 에이전트 워크플로우는 [AI Capabilities Development](https://developer.tuya.com/en/docs/iot/AI-feature?id=Keapy1et1fc63); 아래 두 단계에 집중합니다.

![Add 대리인] (https://images.tuyacn.com/content-platform/hestia/1757320405d1df1428baa.png)

## 플러그인 추가
1. **01 Model Configuration** > **Skills Configuration**, **Plugin**를 선택하고 **+**를 클릭하여 **Add Tool** 페이지를 엽니다.

![추가 도구](https://images.tuyacn.com/content-platform/hestia/1757320476afd9b9187e0.png)

2. **장치 제어** 탭에서, **장치 제어 · Bound Only**를 클릭하고, **장치 자체를 제어하고, **Add**를 클릭합니다.

![장치 제어](https://images.tuyacn.com/content-platform/hestia/1757320567346a0cffce4.png)

### 신속한 개발
**02 Prompt Development**에서 [Prompt Guide](https://www.tuyaos.com/viewtopic.php?t=3725)를 따르십시오.

![진행](https://images.tuyacn.com/content-platform/hestia/1757321381a528942f97c.png)

## 4. 사용자 정의 펌웨어 추가
OTA 업데이트 및 대량 모듈 주문 지원하려면 사용자 정의 펌웨어를 만듭니다. ** 하드웨어 개발 **, ** ** 클라우드 액세스 모드 ** ** ** ** TuyaOS AI**, ** 클라우드 액세스 하드웨어 **로 T5 모듈을 선택, ** 사용자 지정 펌웨어 추가 **, 구성을 완료.

![펌웨어 추가](https://images.tuyacn.com/content-platform/hestia/17573208516655d5cc41f.png)

## 5. AI 제어 명령 구성
:::정보
제품에 추가 된 기능은 데이터 포인트 (DP); 표준 기능은 100 미만의 ID와 DP입니다. 추가된 모든 함수는 표준이며, 자체 제어 명령은 기본적으로 구성되며 이 단계를 건너뛸 수 있습니다. 사용자 정의 기능을 추가하면 명령 솔루션을 업데이트하기 위해이 단계를 완료하십시오.
:::

[AI 제품 명령](https://platform.tuya.com/exp/voice/ai) 페이지를 열고, **Self-control 명령어**를 찾아, **Modify 명령 솔루션**를 클릭하고, [Self-control Commands](https://developer.tuya.com/en/docs/iot/Self-control?id=Kep3yhifdrvah)를 따르세요.

![AI 제품명](https://images.tuyacn.com/content-platform/hestia/17573209519b80058e8dd.png)

## 장치의 핸들 제어
DP는 1개의 장치 기능을 위한 Tuya의 자료 모형입니다. 앱 또는 에이전트가 명령을 보낼 때, 펌웨어의 이벤트 핸들러 화재 : 객체 DPs (boolean, value, enum, bitmap, string)는 `TUYA_EVENT_DP_RECEIVE_OBJ`로 도착하고, `TUYA_EVENT_DP_RECEIVE_RAW`로 Raw DPs. `your_chat_bot` 데모 사용:

```c
void user_event_handler_on(tuya_iot_client_t *client, tuya_event_msg_t *event)
{
    switch (event->id) {
    /* Object DP (boolean / value / enum / bitmap / string) */
    case TUYA_EVENT_DP_RECEIVE_OBJ: {
        dp_obj_recv_t *dpobj = event->value.dpobj;
        audio_dp_obj_proc(dpobj);
        tuya_iot_dp_obj_report(client, dpobj->devid, dpobj->dps, dpobj->dpscnt, 0);
    } break;

    /* Raw DP */
    case TUYA_EVENT_DP_RECEIVE_RAW: {
        dp_raw_recv_t *dpraw = event->value.dpraw;
        tuya_iot_dp_raw_report(client, dpraw->devid, &dpraw->dp, 3);
    } break;

    default:
        break;
    }
}
```

DP 모형을 위해, [DP 모형과 통제 의정서] (https://developer.tuya.com/en/docs/iot-device-dev/TuyaOS-iot_abi_dp_ctrl?id=Kcoglhn5r7ajr) 및 [Tuya IoT 클라이언트 API] (../iot-client/tuya-iot-client-reference)를 보십시오.

## 6. 보드 승인
이 게시판은 귀하의 제품에 적용됩니다. 사용 방법.

## 으로 코드
`apps/tuya.ai/your_chat_bot/include/tuya_config.h`를 열고 3개의 필드를 설정합니다 (전체 단계: [장치를 삭제] (https://tuyaopen.ai/docs/quick-start/equipment-authorization):

- `TUYA_PRODUCT_ID` - 제품 생성에서 `PID`.
- `TUYA_OPENSDK_UUID` - 장치 UUID (토야 지원에서 무료).
- `TUYA_OPENSDK_AUTHKEY` - 장치 AuthKey (토야 지원에서 무료).

```c
#define TUYA_PRODUCT_ID      "p320pepzvmm1ghse"
#define TUYA_OPENSDK_UUID    "uuidxxxxxxxxxxxxxxxx"
#define TUYA_OPENSDK_AUTHKEY "keyxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

![PID 받기](https://images.tuyacn.com/content-platform/hestia/17573217004faaa23cc52.png)

## 도구로
**Tuya Uart Tool**에서 serial port와 baud rate를 선택하고 **Start**를 클릭하여 포트를 열면 **Authorize**를 클릭하십시오.

<img alt="Authorize with the tool" src="https://images.tuyacn.com/content-platform/hestia/1757310278591d8030b54.png" width="500" />

## 7. 빌드 및 플래시
```bash
tos.py build && tos.py flash
```

T5AI-Board는 2개의 직렬 포트를 노출합니다 — 번쩍이기를 위한 것, 통나무를 위한 것. 깜박이 실패하면 다른 포트와 재스트로 전환합니다. 첫 번째 부팅 장치 쌍과 제품에 대한 활성화, 바인딩 완료.

## 자주 묻는 질문
** 플래시는 쓰기 단계 동안 실패합니다.** [Install the driver](https://tuyaopen.ai/docs/tos-tools/tools-tyutool) 그리고 다시 시도합니다.

## 참조
- [How device–cloud 바인딩 작품](device-cloud-binding) - 이 단계 뒤에 모델
- [Tuya IoT 클라이언트 API] (../iot-client/tuya-iot-client-reference) - 장치 측 클라우드 클라이언트
- [switch demo](../iot-client/demo-tuya-iot-light) - 최소 경계 장치
