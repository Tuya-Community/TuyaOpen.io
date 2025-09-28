---
title: "Creating New Product"
---

# TuyaOpen SDK Quick Start

## Environment Setup and SDK Download

First, you need to set up the development environment and download the TuyaOpen SDK. For detailed tutorials, please visit the [TuyaOpen Documentation Center](https://tuyaopen.ai/zh/docs/about-tuyaopen).

## Create Product

Go to the [Tuya Developer Platform > **Product Development**](https://platform.tuya.com/pmg/list) page, click **Create Product**, select the category based on your product form, and refer to [Create Product](https://developer.tuya.com/cn/docs/iot/create-product?id=K914jp1ijtsfe) to complete product creation.

![Create Product.png](https://images.tuyacn.com/content-platform/hestia/175577153664954543874.png)

After entering the product development process, please focus on the following configurations: adding product functions, AI capabilities, and new firmware.

### Add Product Functions

Under **01 Function Definition** > **Product Functions**, click **Add Function** to add standard/custom functions to the product, or enable advanced functions.

To learn about product functions, please refer to [Product Functions](https://developer.tuya.com/cn/docs/iot/define-product-features?id=K97vug7wgxpoq).

![Add Product Functions.png](https://images.tuyacn.com/content-platform/hestia/17557717576bbf113ed8f.png)

### Add AI Capabilities

Under **01 Function Definition** > **Product AI Functions**, click **Add Intelligent Agent** to add AI capabilities to the product.

After entering the intelligent agent development process, refer to [Product AI Function Development](https://developer.tuya.com/cn/docs/iot/AI-feature?id=Keapy1et1fc63) to complete intelligent agent development. Focus on the following configurations:

![Add Intelligent Agent.png](https://images.tuyacn.com/content-platform/hestia/1757318291e68cc87672c.png)


#### Add Tool Set:
1. Under **01 Model Capability Configuration** > **Skill Configuration**, select **Tool Set**, click the add (**+**) button on the right to enter the **Add Tool** page.
2. Under **Device Control** > **Device Self-Control - Only control devices associated with Agent**, select to add **Control devices bound to intelligent agent**.

![Add Tool.png](https://images.tuyacn.com/content-platform/hestia/1755773751f7b81957a77.png)

![Add Tool.png](https://images.tuyacn.com/content-platform/hestia/17557738127051a6780ef.png)

#### Develop Prompts

Under **02 Prompt Development**, refer to [Prompt Tutorial](https://www.tuyaos.com/viewtopic.php?t=3724) to complete prompt development.

![Develop Prompts.png](https://images.tuyacn.com/content-platform/hestia/175577395562cc51ae786.png)

### Add Custom Firmware

To enable subsequent OTA upgrades and batch module ordering, custom firmware needs to be added.

After entering the product development process, under **03 Hardware Development**, select **Cloud Access Development Method** as **TuyaOS AI**, select **Cloud Access Hardware** as T5 module, then click **Create Custom Firmware** and complete related configurations.

![Add Firmware.png](https://images.tuyacn.com/content-platform/hestia/1757318532460587f4648.png)


## AI Control Command Configuration

:::info
If all product functions added during product development are standard functions (Data Point, DP; standard functions are function points with DP ID less than 100), self-control commands are configured by default and this step can be skipped; if you have added custom function points, you need to complete this step to modify the command scheme.
:::

Go to the [**AI Product Command Configuration**](https://platform.tuya.com/exp/voice/ai) page, under **Self-Control Commands**, click **Modify Command Scheme**, and refer to [Device Self-Control Commands](https://developer.tuya.com/cn/docs/iot/Self-control?id=Kep3yhifdrvah) to complete related configurations. 

![AI Product Command Configuration.png](https://images.tuyacn.com/content-platform/hestia/1757320122af584c90f10.png)


## Implement Product Functions

DP (Data Point) is Tuya's data model for defining product functions, used to describe product functionality. To achieve large-scale and digital management of massive and diverse devices, an abstract language is needed to describe devices. For detailed description of the DP model, please refer to [DP Model and Control Protocol](https://developer.tuya.com/cn/docs/iot-device-dev/TuyaOS-iot_abi_dp_ctrl?id=Kcoglhn5r7ajr).

Taking the `your_chat_bot` Demo in TuyaOpen as an example, when the App or AI sends control commands, it will enter the `user_event_handler_on` interface. Among them, Object types (Boolean, Value, Enum, Bitmap, String) enter the `TUYA_EVENT_DP_RECEIVE_OBJ` branch, and Raw types enter the `TUYA_EVENT_DP_RECEIVE_RAW` branch.

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


## Authorize Development Board

### Method 1: Code Authorization

Modify header files. For detailed process, please refer to [Device Authorization](https://tuyaopen.ai/zh/docs/quick-start/equipment-authorization).

For example, open the `your_chat_bot` project, find the `tuya_config.h` file at path: `apps/tuya.ai/your_chat_bot/include/tuya_config.h`, and modify the following three parameters:
- `TUYA_PRODUCT_ID`: Product ID (PID) generated when creating the product.
- `TUYA_OPENSDK_UUID`: UUID can be obtained for free, please contact Tuya staff to get it.
- `TUYA_OPENSDK_AUTHKEY`: Authkey can be obtained for free, please contact Tuya staff to get it.

![Get PID.png](https://images.tuyacn.com/content-platform/hestia/175577227898c13ebfae5.png)

Example as follows:

```
#ifndef TUYA_PRODUCT_ID
#define TUYA_PRODUCT_ID "p320pepzvmm1ghse"//PID
#endif

#define TUYA_OPENSDK_UUID    "uuidxxxxxxxxxxxxxxxx"             // Please change to the correct UUID.
#define TUYA_OPENSDK_AUTHKEY "keyxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" // Please change to the correct authkey.

```

### Method 2: Tool Authorization

In **Tuya Uart Tool**, select the flashing serial port and **BaudRate**, click **Start** to open the serial port, then click **Authorize** to authorize.

<img alt="Tool Authorization" src="https://images.tuyacn.com/content-platform/hestia/1757310278591d8030b54.png" width="600"  />

## Compile and Flash

Enter the following in the terminal:

```
tos.py build && tos.py flash 
```

![Example.png](https://images.tuyacn.com/content-platform/hestia/17557741754d231019d50.png)

If using the T5AI-Board development board, the board itself is configured with two serial ports, one for flashing and one for log output. If flashing fails, you can switch port numbers and retry.

## Common Issues

### Flashing always fails at Write, how to solve?

Please refer to [Install Corresponding Driver](https://tuyaopen.ai/zh/docs/tos-tools/tools-tyutool#%E7%83%A7%E5%BD%95%E8%BF%87%E7%A8%8B%E4%B8%AD%E6%80%BB%E6%98%AF%E5%9C%A8write%E6%97%B6%E5%A4%B1%E8%B4%A5) to try to solve it.