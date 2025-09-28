---
title: "创建新产品"
---

# Tuya 云

## 环境搭建及 SDK 下载

首先，您需要搭建开发环境并下载 TuyaOpen SDK，详细教程请前往 [TuyaOpen 文档中心](https://tuyaopen.ai/zh/docs/about-tuyaopen) 查看。

## 创建产品

前往登录 [涂鸦开发者平台 > **产品开发**](https://platform.tuya.com/pmg/list) 页面，单击 **创建产品**，根据您的产品形态选择品类，并参考 [创建产品](https://developer.tuya.com/cn/docs/iot/create-product?id=K914jp1ijtsfe) 完成产品的创建。

![创建产品.png](https://images.tuyacn.com/content-platform/hestia/175577153664954543874.png)

进入产品开发流程后，请重点关注下文介绍的添加产品功能、AI 能力和新增固件相关配置。

### 添加产品功能

在 **01 功能定义** > **产品功能** 下，单击 **添加功能** 来为产品添加标准/自定义功能，或开启高级功能。

了解产品功能，请参考 [产品功能](https://developer.tuya.com/cn/docs/iot/define-product-features?id=K97vug7wgxpoq)。

![添加产品功能.png](https://images.tuyacn.com/content-platform/hestia/17557717576bbf113ed8f.png)

### 添加 AI 能力

在 **01 功能定义** > **产品 AI 功能** 下，单击 **新增智能体** 来为产品添加 AI 能力。

进入智能体开发流程后，参考 [产品 AI 功能开发](https://developer.tuya.com/cn/docs/iot/AI-feature?id=Keapy1et1fc63) 完成智能体的开发。其中，重点关注以下配置：

![添加智能体.png](https://images.tuyacn.com/content-platform/hestia/1757318291e68cc87672c.png)


#### 添加工具集：
1. 在 **01 模型能力配置** > **技能配置** 下选择 **工具集**，单击右侧添加（**+**）按钮进入 **添加工具** 页面。
2. 在 **设备控制** > **设备自控 - 仅控制与 Agent 关联的设备** 下，选择添加 **控制智能体绑定的设备**。

![添加工具.png](https://images.tuyacn.com/content-platform/hestia/1755773751f7b81957a77.png)

![添加工具.png](https://images.tuyacn.com/content-platform/hestia/17557738127051a6780ef.png)

#### 开发提示词

在 **02 提示词开发** 下，参考 [Prompt 入门教程](https://www.tuyaos.com/viewtopic.php?t=3724) 完成提示词的开发。

![开发提示词.png](https://images.tuyacn.com/content-platform/hestia/175577395562cc51ae786.png)

### 新增自定义固件

为了后续 OTA 升级和模组批量下单，需要新增自定义固件。

进入产品开发流程后，在 **03 硬件开发** 下，选择 **云端接入开发方式** 为 **TuyaOS AI**，选择 **云端接入硬件** 为 T5 模组，然后单击 **新建自定义固件** 并完成相关配置。

![新增固件.png](https://images.tuyacn.com/content-platform/hestia/1757318532460587f4648.png)


## AI 控制指令配置

:::info
如您在产品开发过程中添加的产品功能均为标准功能（Data Point，DP；标准功能即 DP ID 小于 100 的功能点），则默认已配置自控指令，可以跳过本步骤；如您增加了自定义功能点，则需要完成本步骤修改指令方案。
:::

前往 [**AI 产品指令配置**](https://platform.tuya.com/exp/voice/ai) 页面，在 **自控指令** 下单击 **修改指令方案**，并参考 [设备自控指令](https://developer.tuya.com/cn/docs/iot/Self-control?id=Kep3yhifdrvah) 完成相关配置。 

![AI 产品指令配置.png](https://images.tuyacn.com/content-platform/hestia/1757320122af584c90f10.png)


## 实现产品功能

DP（Data Point）是涂鸦对产品功能定义的数据模型，用于描述产品的功能。为了实现对海量且多样的设备进行规模化和数字化管理，需要使用一种抽象语言来描述设备。关于 DP 模型的详细说明，请参考 [DP 模型与控制协议](https://developer.tuya.com/cn/docs/iot-device-dev/TuyaOS-iot_abi_dp_ctrl?id=Kcoglhn5r7ajr)。

以 TuyaOpen 中的 `your_chat_bot` Demo 为例，当 App 或者 AI 下发控制指令时，会进入 `user_event_handler_on` 接口。其中，Object 类型（Boolean、Value、Enum、Bitmap、String）进入 `TUYA_EVENT_DP_RECEIVE_OBJ` 分支，Raw 类型进入 `TUYA_EVENT_DP_RECEIVE_RAW` 分支。

```c
void user_event_handler_on(tuya_iot_client_t *client, tuya_event_msg_t *event)
{
    PR_DEBUG("Tuya Event ID:%d(%s)", event->id, EVENT_ID2STR(event->id));
    PR_INFO("Device Free heap %d", tal_system_get_free_heap_size());

    switch (event->id) {
    /*
    ******Omit the intermediate process here******
    */
        /* RECV OBJ DP */
    case TUYA_EVENT_DP_RECEIVE_OBJ: {
        dp_obj_recv_t *dpobj = event->value.dpobj;
        PR_DEBUG("SOC Rev DP Cmd t1:%d t2:%d CNT:%u", dpobj->cmd_tp, dpobj->dtt_tp, dpobj->dpscnt);
        if (dpobj->devid != NULL) {
            PR_DEBUG("devid.%s", dpobj->devid);
        }

        audio_dp_obj_proc(dpobj);

        tuya_iot_dp_obj_report(client, dpobj->devid, dpobj->dps, dpobj->dpscnt, 0);

    } break;

    /* RECV RAW DP */
    case TUYA_EVENT_DP_RECEIVE_RAW: {
        dp_raw_recv_t *dpraw = event->value.dpraw;
        PR_DEBUG("SOC Rev DP Cmd t1:%d t2:%d", dpraw->cmd_tp, dpraw->dtt_tp);
        if (dpraw->devid != NULL) {
            PR_DEBUG("devid.%s", dpraw->devid);
        }

        uint32_t index = 0;
        dp_raw_t *dp = &dpraw->dp;
        PR_DEBUG("dpid:%d type:RAW len:%d data:", dp->id, dp->len);
        for (index = 0; index < dp->len; index++) {
            PR_DEBUG_RAW("%02x", dp->data[index]);
        }

        tuya_iot_dp_raw_report(client, dpraw->devid, &dpraw->dp, 3);

    } break;

    default:
        break;
    }
}

```


## 授权开发板

### 方式一：代码授权

修改头文件。详细流程，请参考 [设备授权](https://tuyaopen.ai/zh/docs/quick-start/equipment-authorization)。

例如，打开 `your_chat_bot` 项目，找到 `tuya_config.h` 文件，路径为：`apps/tuya.ai/your_chat_bot/include/tuya_config.h`，并修改以下三个参数：
- `TUYA_PRODUCT_ID`：产品创建时生成的 Product ID（PID）。
- `TUYA_OPENSDK_UUID`：UUID 可免费获取，请联系涂鸦工作人员领取。
- `TUYA_OPENSDK_AUTHKEY`：Authkey 可免费获取，请联系涂鸦工作人员领取。

![获取 PID.png](https://images.tuyacn.com/content-platform/hestia/175577227898c13ebfae5.png)

示例如下：

```
#ifndef TUYA_PRODUCT_ID
#define TUYA_PRODUCT_ID "p320pepzvmm1ghse"//PID
#endif

#define TUYA_OPENSDK_UUID    "uuidxxxxxxxxxxxxxxxx"             // Please change to the correct UUID.
#define TUYA_OPENSDK_AUTHKEY "keyxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" // Please change to the correct authkey.

```

### 方式二：工具授权

在 **Tuya Uart Tool** 中，选择烧录串口和 **BaudRate**（波特率），单击 **Start** 打开串口，然后单击 **Authorize** 进行授权。

<img alt="工具授权" src="https://images.tuyacn.com/content-platform/hestia/1757310278591d8030b54.png" width="600"  />

## 编译和烧录

在终端输入以下：

```
tos.py build && tos.py flash 
```

![示例图.png](https://images.tuyacn.com/content-platform/hestia/17557741754d231019d50.png)

如果使用 T5AI-Board 开发板，板本身配置有两路串口，一路用于烧录，另一路用于日志输出。如果烧录失败，可以切换端口号并重试。

## 常见问题

### 烧录总是在 Write 时失败，如何解决？

请参考 [安装对应驱动](https://tuyaopen.ai/zh/docs/tos-tools/tools-tyutool#%E7%83%A7%E5%BD%95%E8%BF%87%E7%A8%8B%E4%B8%AD%E6%80%BB%E6%98%AF%E5%9C%A8write%E6%97%B6%E5%A4%B1%E8%B4%A5) 尝试解决。