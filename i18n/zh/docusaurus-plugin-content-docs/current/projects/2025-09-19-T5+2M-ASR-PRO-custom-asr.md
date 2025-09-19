---
title: "T5+2M-ASR-PRO 定制命令词"
date: 2025-9-19
---

<BackToProjects />



## 项目介绍

由于 T5 默认支持的唤醒词有限，例如：
- TuyaOS 支持三种默认唤醒词：“你好涂鸦”、“小智同学”、“Hey, Tuya”（英文）
- TuyaOpen 支持四种默认唤醒词：“你好涂鸦“、“小智同学”、“小智管家”、“你好小智”

因此，如果您想要自定义唤醒词，有三种方案：
- 增加语音识别模组 
- [替换唤醒词算法](https://developer.tuya.com/cn/docs/iot-device-dev/tuyaos-wukong-capability-wakeup-internal?id=Keia2dqx0v23b#title-3-%E6%9B%BF%E6%8D%A2%E5%94%A4%E9%86%92%E7%AE%97%E6%B3%95) 
- 定制唤醒词（如需定制，请联系涂鸦商务人员）

本教程为您介绍第一种方案：增加语音识别模组，该方案具有以下几点优势：

- 技术门槛低，不需要了解音频算法。
- 配合涂鸦智能体多角色可以实现多唤醒词。不同的唤醒词对应不同的角色，避免角色和唤醒词不匹配的尴尬场景。
- 支持离线语音识别。ASR PRO 模组支持离线神经网络计算，无需依赖网络即可实现语音识别。这一特性使其即便在无网络连接或网络信号不稳定的环境中，仍能保持正常工作状态。
- 高识别率。ASR PRO 模组具备强劲的回声消除和环境噪声抑制能力，即使在嘈杂环境中也能保持较高的语音识别准确性。其识别率可达 98 %以上，响应时间小于 0.15 秒。

## 所需材料

| 硬件                          | 功能参数                                                                              |
|-----------------------------------------------|-----------------------------------|
| T5 开发板                     | 提供 AI 对话功能核心功能                                    |
| ASR PRO 模组                 | 支持自定义唤醒词和离线语音识别                |
| 串口板或 ASR-LINK 自动下载器 | 普通的 CH340 串口板即可，用于给 ASR PRO 下载程序<br><br>如果有条件可以自行购买 ASR-LINK 自动下载器
| 麦克风                          | 用于给 ASR RPO 模组拾音                     |


## 2M ASR PRO 语音识别模组（核心板）

芯片规格书：[点击查看](https://www.haohaodada.com/jpeguploadfile/twen/ASRPRO/ASRPROCoreV1.1.pdf)

外观图：
<img alt="芯片规格书" src="https://images.tuyacn.com/content-platform/hestia/1756373260721d3bdc55a.png" width="400" >

## 硬件接线说明

首先需要对 ASR PRO 进行编程和固件烧录，然后将 ASR PRO 模组连接到 T5 开发板，因此接线分成两部分：


### ASR PRO 烧录接线

|  ASR PRO 模组 | 串口板 |
|---------------|------|
|       GND       |   GND  |
|        5V       |   5V   |
| PB5（UART0 TX） |   RX   |
| PB6（UART0 RX） |   TX   |
|      MIC +      |  咪头 + |
|      MIC -      | 咪头 - |


### T5 开发板与 ASR PRO 模组连接

|   T5 开发板    |   ASR PRO 模组     |     
|---------------|-------------------------|
|            GND           |       GND       |
|        5V       |             5V            |
| P10（UART0 TX） |         PB5（RX）        |
| P11（UART0 RX）   |         PB6（TX）     |
|  P12（唤醒脚）   | PA4（演示使用，可自定义）<br><br>**注意**：如果使用串口程序唤醒，可以不接 P12 唤醒引脚|

### 运行效果

<video src="https://images.tuyacn.com/content-platform/hestia/1756375350889423076cc.mp4" width="300" style="max-width: 100%" controls></video>


## ASR PRO 程序制作

Tuya AI 智能体支持多角色，ASR PRO 模组支持最多 5 个唤醒词，每个唤醒词有单独的识别标识 ID，因此可以考虑设计一个程序为每个角色设计一个专有唤醒词。在制作 ASR PRO 程序时可以用识别标识 ID 来区分唤醒词，比如识别到不同的标识 ID 控制不同的 IO 引脚拉低，或者也可以通过串口将数据发送到需要连接的主控芯片 T5 上。

通常使用 **天问 Block** 开发 ASR PRO 模组，其图形化编程对新手非常友好。您可以点击前往 [天问 51 官网](http://twen51.com/new/twen51/index.php) 下载。

### 示例程序

系统配置三个唤醒词，分别为 “你好哪吒”、“你好猪八戒”、“你好柯南”。当 ASR PRO 模组识别到上述任一唤醒词时，需通过 IO 接口触发唤醒功能，同时通过串口输出数据：
- ASR PRO 识别到唤醒词后，会控制 PA4 输出低电平 100 ms 然后拉高。
- 通过串口（PB5 PB6）引脚输出十六进制。

| 唤醒词 | 串口输出 |
| --- | --- |
| 你好哪吒 | A0 01 00 |
| 你好猪八戒 | A0 01 01 |
| 你好柯南 | A0 01 02 |

### 资料下载

- 参考代码：[点击下载](https://ccnsi48dnpj0.feishu.cn/wiki/DkQjwT9DpiHJhak5HXec01ldnRb)
- 固件下载：[点击下载](https://images.tuyacn.com/content-platform/hestia/content-platform/hestia/1756434287f142a5459ac.zip)
- 烧录工具：[点击下载](https://images.tuyacn.com/content-platform/hestia/content-platform/hestia/content-platform/hestia/175643445346d29fa1f7a.zip)

### 固件烧录

关于固件烧录的方法，请参考 [视频教程](https://haohaodada.com/new/tencentCloud/cloudiframe.php?id=146)。

参考图：

<img alt="固件烧录" src="https://images.tuyacn.com/content-platform/hestia/17564346638e93644cea5.png" width="800" >

## T5 程序制作

### IO 唤醒

IO 唤醒相对易操作，只需要将 ASR PRO 设置的唤醒脚连接到 T5 唤醒脚（默认 P12）即可。

### 串口唤醒

串口唤醒只需要在串口接收程序中判断识别到唤醒指令并调用 `audio_recorder_start();` 接口即可，下面是一个串口例程：


```C
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
*commandInfo\": 是角色 ID，可以在涂鸦开发者平台获取
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
* 功能：切换角色
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
    // 检查索引是否有效
    if(i >= post_count) {
        TAL_PR_ERR("Role not found: %s", role_name);
        return;
    }
    

    TAL_PR_DEBUG("Processing POST_CONTENT[%u]: %s", i, POST_CONTENTS[i].commandInfo);
    
    // 调用 HTTP POST 函数，传递指定的数组元素
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
        //判断读取超时时间
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
                    { /* 哪吒唤醒词 */
                        sprintf(STR, "哪吒");
                        break;
                    }
                    
                    case  0x01:
                        /* 猪八戒唤醒词 */
                    {
                        sprintf(STR, "猪八戒");
                        break;
                    }                    
                    case  0x02:
                        /* 柯南唤醒词 */
                    {
                        sprintf(STR, "柯南");
                        break;
                    }
                    default:
                        break;
                    
                }
                switch_iot_role(STR);
                audio_recorder_start(); 
                // tuya_voice_proto_get_tts_text(STR);//文本对话，将 STR 内容发送到 Agent
                TAL_PR_DEBUG("-------------->唤醒词: %s", STR);
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
    TUYA_CALL_ERR_RETURN(tal_uart_init(TUYA_UART_NUM_0,&cfg));//usrt 0 init   

    THREAD_CFG_T   param;
    param.priority   = THREAD_PRIO_3;
    param.stackDepth = 1024*4;
    param.thrdname   = "my_uart_asr_thread";

    TUYA_CALL_ERR_RETURN( tal_thread_create_and_start(&my_uart_thread, NULL, NULL,__uart0_rev_task ,NULL , &param));
    

    TAL_PR_DEBUG("======_asr_uart_ task success==============");

    return rt;
}

```