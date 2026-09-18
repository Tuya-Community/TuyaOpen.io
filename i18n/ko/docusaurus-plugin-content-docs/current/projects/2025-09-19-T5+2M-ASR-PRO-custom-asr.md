---
title: "T5+2M-ASR-PRO 사용자 지정 웨이크 워드"
---

<BackToProjects />

## 프로젝트 소개
T5 플랫폼은 기본 깨진 단어의 제한된 세트를 지원하며 예를 들어:
- TuyaOS는 "Nihao Tuya"(Hello Tuya), "Xiao Zhi Tongxue"(Classmate Zhi) 및 "Hey, Tuya"(영어)를 지원합니다.
- TuyaOpen는 4개의 기본 웨이브 단어를 지원합니다: "Nihao Tuya", "Xiao Zhi Tongxue", "Xiao Zhi Guanjia" (버틀러 Zhi), 그리고 "Nihao Xiao Zhi".

웨이브 단어를 사용자 정의하려는 경우, 세 가지 솔루션이 있습니다.
- 음성 인식 모듈 추가
- [실행 단어 알고리즘](https://developer.tuya.com/cn/docs/iot-device-dev/tuyaos-wukong-capability-wakeup-internal?id=Keia2dqx0v23b#title-3-%E6%9B%BF%E6%8D%A2%E5%94%A4%E9%86%92%E7%AE%97%E6%B3%95)
- 사용자 정의 웨이브 단어 (사용자 정의, 문의하시기 바랍니다 Tuya 판매)

이 튜토리얼은 첫 번째 솔루션을 소개합니다 : 음성 인식 모듈을 추가합니다. 이 접근법에는 다음과 같은 이점이 있습니다:

- 낮은 기술 장벽, 오디오 알고리즘을 이해할 필요가 없습니다.
- Tuya AI Agent 멀티롤 기능으로 여러 가지 웨이브 단어를 지원합니다. 다른 웨이브 단어는 다른 역할에 대응할 수 있으며 역할과 깨어있는 단어 사이에 어색한 mismatches를 피할 수 있습니다.
- 오프라인 음성 인식 지원 ASR PRO 모듈은 오프라인 neural 네트워크 컴퓨팅을 지원하며 네트워크에 의존하지 않고 음성 인식을 가능하게 합니다. 이 정상적인 가동은 아니 또는 불안정한 네트워크 연결을 가진 환경에서 조차 지킵니다.
- 높은 인식률. ASR PRO 모듈은 강력한 에코 취소 및 환경 노이즈 환경에서도 높은 음성 인식 정확도를 유지하고 있습니다. 승인 비율은 98% 이상, 0.15 초 미만의 응답 시간으로 도달할 수 있습니다.

## 필수 물자
|제품정보|기능 / 모수|
|------------------------------------|-------------------------------------------------------------------------------------|
|T5 개발위원회|AI 대화 기능 제공|
|ASR PRO 모듈|사용자 정의 깨진 단어 및 오프라인 음성 인식 지원|
|직렬 보드 또는 ASR-LINK Downloader|표준 CH340 직렬 보드는 ASR PRO에 다운로드 프로그램에 충분합니다. 사용 가능한 경우 ASR-LINK 자동 다운로더를 구입할 수 있습니다.|
|마이크|ASR PRO 모듈의 오디오 픽업에 사용|


## 2M ASR PRO 스피커 인식 모듈 (Core Board)
Chip 데이터 시트: [여기보기](https://www.haohaodada.com/jpeguploadfile/twen/ASRPRO/ASRPROCoreV1.1.pdf)

외관:
<img alt="Chip Datasheet" src="https://images.tuyacn.com/content-platform/hestia/1756373260721d3bdc55a.png" width="400"  />

## 하드웨어 배선 지침
먼저, 당신은 프로그램 및 플래시 펌웨어를 ASR PRO, 다음을 연결 ASR PRO 모듈 T5 개발 보드. 따라서, 배선은 2개 부품으로 분할됩니다:

### ASR PRO 번쩍이는 배선
|ASR PRO 모듈|직렬 보드|
|-----------------|-------------|
|사이트맵|사이트맵|
|5V의|5V의|
|PB5 (UART0 TX)|사이트맵|
|PB6 (UART0 RX)|사이트맵|
|사이트맵|마이크 +|
|사이트맵|한국어 -|


### T5 개발 보드 ASR PRO 모듈 연결
|T5 개발위원회|ASR PRO 모듈|     
|-----------------------|--------------------------|
|사이트맵|사이트맵|
|5V의|5V의|
|P10 (미국)|PB5 (RX)|
|P11 (우아트0 RX)|모델 번호: PB6|
|P12 (가공 핀)|PA4 (Demo 사용, customizable). ** 참고**: 직렬 파업을 사용하는 경우 P12 웨이브 핀을 연결 할 수 있습니다.|

## 데모 비디오
<video src="https://images.tuyacn.com/content-platform/hestia/1756375350889423076cc.mp4" width="300" style={{maxWidth: "100%"}} controls></video>


## ASR PRO 프로그램 개발
Tuya AI Agent는 여러 역할을 지원하며, ASR PRO 모듈은 최대 5개의 웨이브 단어를 지원하며, 고유한 인식 ID로 각각 지원합니다. 각 역할에는 전용 웨이브 단어가 있습니다. ASR PRO 프로그램을 개발할 때, 예를 들어, 다른 IO 핀을 제어하거나 시리얼을 메인 컨트롤러 T5로 전송할 수 있는 인식 ID를 사용할 수 있습니다.

ASR PRO 모듈 개발을 위해 **Tianwen Block**을 사용하는 것이 좋습니다. 그래픽 프로그래밍 인터페이스는 매우 초보자 친화적입니다. [Tianwen 51 공식 웹 사이트에서 다운로드 할 수 있습니다](http://twen51.com/new/twen51/index.php).

### 예제 프로그램
시스템은 세 가지 웨이브 단어로 구성되어 있습니다 : "Hello Nezha", "Hello Zhu Bajie", "Hello Conan". ASR PRO 모듈이 이 웨이브 단어 중 하나를 인식 할 때 시리얼을 통해 IO 및 출력 데이터를 통해 깨진 기능을 트리거해야합니다.
- 깨진 단어를 인식 한 후, ASR PRO는 PA4을 100 ms로 낮게 설정한 후, 높이를 끌어냅니다.
- 직렬 (PB5 PB6 핀)를 통해 16 진수 데이터를 출력합니다.

|모닝콜|연속 출력|
| -------------- | ------------- |
|안녕 Nezha|₢ 킹|
|안녕 주 Bajie|₢ 킹|
|안녕하세요.|A0 01 02 ·|

### 다운로드
- 참조 코드 : [다운로드] (https://ccnsi48dnpj0.feishu.cn/wiki/DkQjwT9DpiHJhak5HXec01ldnRb)
- 펌웨어: [다운로드](https://images.tuyacn.com/content-platform/hestia/content-platform/hestia/1756434287f142a5459ac.zip)
- 플래시 툴: [다운로드](https://images.tuyacn.com/content-platform/hestia/content-platform/hestia/content-platform/hestia/175643445346d29fa1f7a.zip)

## Firmware 번쩍이는
펌웨어 번쩍에 대한 지침은 [비디오 자습서](https://haohaodada.com/new/tencentCloud/cloudiframe.php?id=146)를 참조하시기 바랍니다.

참고 이미지:

<img alt="Firmware Flashing" src="https://images.tuyacn.com/content-platform/hestia/17564346638e93644cea5.png" width="800"  />

## T5 프로그램 개발
## # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
IO Wakeup은 상대적으로 간단합니다. 그냥 ASR PRO의 웨이브 핀을 T5의 웨이브 핀 (기본 P12) 연결.

## 시리얼 Wakeup
serial Wakeup의 경우, 직렬 수신 프로그램에서 인식 된 Wake 명령을 확인하고 `audio_recorder_start();` 인터페이스를 호출합니다. 아래는 serial 예제입니다.

```c
#include "tal_uart.h"
#include "tal_system.h"
#include "tal_log.h"
#include "base_event.h"
#include "tuya_cloud_types.h"
#include <stdio.h>
#include "audio_recorder.h"
#ifdef ENABLE_WIFI_SERVICE
#include "tuya_iot_wifi_api.h"
#else
#include "tuya_iot_base_api.h"
#endif

#define UART_BOUND 9600
STATIC THREAD_HANDLE my_uart_thread = NULL;

/***********************************************************
***********************typedef define***********************
***********************************************************/
#define ROLE_API              "thing.ai.agent.switch.role"
#define API_VERSION              "1.0"

typedef struct {
    char *commandInfo;
    char *description;
} TY_AI_ROLE_T;

/*
*commandInfo: the role ID, available from the Tuya Developer Platform
*/
const  TY_AI_ROLE_T POST_CONTENTS[] = {
    {"{\"commandInfo\": \"DIY_XEM_EPAXATC0U0W0\"}","小恶魔"},
    {"{\"commandInfo\": \"DIY_XTS_EPAXBE3SFRB4\"}","小天使"},
    {"{\"commandInfo\": \"DIY_SWK_EPAA4V9THGQO\"}","孙悟空"},
    {"{\"commandInfo\": \"DIY_ZBJ_EPA9XXFY2WOW\"}","猪八戒"},
    {"{\"commandInfo\": \"DIY_CE_EPA9SDZAXOG0\"}","嫦娥"},
    {"{\"commandInfo\": \"DIY_TZ_EPA9NAVSDKAO\"}","唐僧" },
    {"{\"commandInfo\": \"DIY_ND_EPAW3QRNEDQ8\"}","牛顿"},
    {"{\"commandInfo\": \"DIY_HTL_EPAWROAK5TDS\"}","灰太狼"},
    {"{\"commandInfo\": \"DIY_HLBT_EPAWXZXJJG8W\"}","哈利波特"},
    {"{\"commandInfo\": \"DIY_KN_EPAX5IQQQOE8\"}","柯南"},
    {"{\"commandInfo\": \"SYS_GJXY_EKGXPAQA11J4\"}","杠精小丫"},
};

int g_role_max = sizeof(POST_CONTENTS) / sizeof(POST_CONTENTS[0]);;

/***********************************************************
***********************variable define**********************
***********************************************************/

/**
* @brief  http task
* switch role
* @param[in] param:Task parameters
* @return none
*/
VOID switch_iot_role(char *role_name)
{
    OPERATE_RET rt = OPRT_OK;
    ty_cJSON* result = NULL;
    CHAR_T *print_data = NULL;
    const CHAR_T post_count = sizeof(POST_CONTENTS) / sizeof(POST_CONTENTS[0]);
    CHAR_T i;

    for(i=0; i<post_count; i++)
    {
        if(strstr(POST_CONTENTS[i].description,role_name) != NULL) {
            break;
        }
    }
    // check whether the index is valid
    if(i >= post_count) {
        TAL_PR_ERR("Role not found: %s", role_name);
        return;
    }


    TAL_PR_DEBUG("Processing POST_CONTENT[%u]: %s", i, POST_CONTENTS[i].commandInfo);

    // call the HTTP POST function, passing the specified array element
    rt = iot_httpc_common_post_simple(ROLE_API, API_VERSION, POST_CONTENTS[i].commandInfo, NULL, &result);
    if (NULL == result) {
        TAL_PR_DEBUG("result is NULL");
        return;
    }

    print_data = ty_cJSON_PrintUnformatted(result);
    if (NULL != print_data) {
        TAL_PR_NOTICE("%s", print_data);
        ty_cJSON_FreeBuffer(print_data);
        print_data = NULL;
    }

    ty_cJSON_Delete(result);
    result = NULL;

    return;
}

STATIC VOID __uart0_rev_task(VOID  *arg)
{
    UINT8_T rx_data[256];
    INT_T ret_len=0;
    OPERATE_RET rt = OPRT_OK;

    int uart_num=TUYA_UART_NUM_0;
    while ((1))
    {
        int cnt=0;
        // determine the read timeout
        while(tal_uart_get_rx_data_size(uart_num)<1){
            cnt++;
            if(cnt>5){
                break;
            }
            tal_system_sleep(10);
        }
        if(cnt>5) continue;

        ret_len = tal_uart_read(uart_num,rx_data,sizeof(rx_data));
        char STR[128]=  {0};
        if(ret_len != 0)
        {
            TAL_PR_HEXDUMP_DEBUG("UART_RX:",rx_data,ret_len);
            if(rx_data[0] == 0xA0 && rx_data[1] == 0x01) {
                switch (rx_data[2])  // Assuming rx_data[2] contains the command type
                {
                    case  0x00:
                    { /* Nezha wake word */
                        sprintf(STR, "哪吒");
                        break;
                    }

                    case  0x01:
                        /* Zhu Bajie wake word */
                    {
                        sprintf(STR, "猪八戒");
                        break;
                    }
                    case  0x02:
                        /* Conan wake word */
                    {
                        sprintf(STR, "柯南");
                        break;
                    }
                    default:
                        break;

                }
                switch_iot_role(STR);
                audio_recorder_start();
                // tuya_voice_proto_get_tts_text(STR); // text dialogue, sends STR content to the Agent
                TAL_PR_DEBUG("-------------->wake word: %s", STR);
            }
        }

    }

    tal_thread_delete(my_uart_thread);
    my_uart_thread = NULL;
}

OPERATE_RET my_asr_uart_thread(VOID)
{
    OPERATE_RET rt = OPRT_OK;

    TAL_UART_CFG_T cfg = {0};
    cfg.base_cfg.baudrate = UART_BOUND;
    cfg.base_cfg.databits = TUYA_UART_DATA_LEN_8BIT;
    cfg.base_cfg.stopbits = TUYA_UART_STOP_LEN_1BIT;
    cfg.base_cfg.parity = TUYA_UART_PARITY_TYPE_NONE;
    cfg.rx_buffer_size = 256;
    cfg.open_mode = O_BLOCK;

    tal_uart_deinit(TUYA_UART_NUM_0);
    TUYA_CALL_ERR_RETURN(tal_uart_init(TUYA_UART_NUM_0,&cfg));// uart 0 init

    THREAD_CFG_T   param;
    param.priority   = THREAD_PRIO_3;
    param.stackDepth = 1024*4;
    param.thrdname   = "my_uart_asr_thread";

    TUYA_CALL_ERR_RETURN( tal_thread_create_and_start(&my_uart_thread, NULL, NULL,__uart0_rev_task ,NULL , &param));


    TAL_PR_DEBUG("======_asr_uart_ task success==============");

    return rt;
}
```