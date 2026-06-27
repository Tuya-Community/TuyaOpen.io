---
title: 创建产品与智能体
---

创建产品是 [设备与云端绑定](device-cloud-binding) 的云端侧环节：你在涂鸦平台上定义设备型号——包括其功能、AI 智能体和一条固件条目——并获得设备激活时所需的 `PID`。本指南将带你走完从一个空产品到烧录并完成绑定的开发板的全过程。

:::note
本流程需要使用涂鸦云端，因此需要一个授权码（license key）。对涉及的各个环节还不熟悉？请先阅读 [设备与云端绑定原理](device-cloud-binding)。
:::

## 前提条件

- 一个已安装 TuyaOpen SDK 的开发环境——参见 [TuyaOpen 文档中心](https://tuyaopen.ai/docs/about-tuyaopen)。
- 一个涂鸦开发者平台账号。
- 一组用于开发板的授权码（`UUID` + `AuthKey`）——参见 [设备授权](../../quick-start/equipment-authorization)。

## 1. 创建产品

登录 **涂鸦开发者平台**，打开 [AI 产品 > 开发](https://platform.tuya.com/pmg/list) 页面。点击 **创建**，选择与你的产品匹配的品类，并按照 [创建产品](https://developer.tuya.com/en/docs/iot/create-product?id=K914jp1ijtsfe) 指南完成创建。这一步会生成固件将要使用的 `PID`。

![创建产品](https://images.tuyacn.com/content-platform/hestia/1757320259ee8123626b5.png)

## 2. 添加产品功能（DP）

在 **功能定义** 标签页的 **产品功能** 下，点击 **添加** 以添加标准功能和自定义功能，或启用高级功能。每个功能都会成为一个数据点（DP）——App 和智能体用来控制设备的最小单元。参见 [产品功能](https://developer.tuya.com/en/docs/iot/define-product-features?id=K97vug7wgxpoq)。

![添加功能](https://images.tuyacn.com/content-platform/hestia/17573218285953b9bc340.png)

## 3. 添加 AI 能力

在 **功能定义** 标签页的 **产品 AI 能力** 下，点击 **添加智能体**。完整的智能体配置流程参见 [AI 能力开发](https://developer.tuya.com/en/docs/iot/AI-feature?id=Keapy1et1fc63)；这里重点介绍下面两个步骤。

![添加智能体](https://images.tuyacn.com/content-platform/hestia/1757320405d1df1428baa.png)

### 添加插件

1. 在 **01 模型配置** > **技能配置** 中，选择 **插件** 并点击 **+**，打开 **添加工具** 页面。

   ![添加工具](https://images.tuyacn.com/content-platform/hestia/1757320476afd9b9187e0.png)

2. 在 **设备控制** 标签页中，点击 **设备控制 · 仅限已绑定**，找到 **控制设备本身**，并点击 **添加**。

   ![设备控制](https://images.tuyacn.com/content-platform/hestia/1757320567346a0cffce4.png)

### 编写提示词

在 **02 提示词开发** 中，按照 [提示词指南](https://www.tuyaos.com/viewtopic.php?t=3725) 编写你的提示词。

![编写提示词](https://images.tuyacn.com/content-platform/hestia/1757321381a528942f97c.png)

## 4. 添加自定义固件

为了支持 OTA 升级和模组批量下单，需要创建一条自定义固件。在 **硬件开发** 中，将 **云端接入方式** 设置为 **TuyaOS AI**，选择一款 T5 模组作为 **云端接入硬件**，点击 **添加自定义固件**，并完成相关配置。

![添加固件](https://images.tuyacn.com/content-platform/hestia/17573208516655d5cc41f.png)

## 5. 配置 AI 控制指令

:::info
添加到产品的功能即为数据点（DP）；标准功能是 DP ID 小于 100 的功能点。如果你添加的功能全部为标准功能，则自控指令默认已配置好，可以跳过本步骤。如果你添加了自定义功能，请完成本步骤以更新指令方案。
:::

打开 [AI 产品指令](https://platform.tuya.com/exp/voice/ai) 页面，找到 **自控指令**，点击 **修改指令方案**，并参照 [设备自控指令](https://developer.tuya.com/en/docs/iot/Self-control?id=Kep3yhifdrvah)。

![AI 产品指令](https://images.tuyacn.com/content-platform/hestia/17573209519b80058e8dd.png)

## 在设备端处理控制

DP 是涂鸦用于描述单个设备功能的数据模型。当 App 或智能体下发指令时，固件的事件处理函数会被触发：对象 DP（布尔、数值、枚举、位图、字符串）以 `TUYA_EVENT_DP_RECEIVE_OBJ` 到达，裸数据 DP 则以 `TUYA_EVENT_DP_RECEIVE_RAW` 到达。以 `your_chat_bot` 示例为例：

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

关于 DP 模型本身，参见 [DP 模型与控制协议](https://developer.tuya.com/en/docs/iot-device-dev/TuyaOS-iot_abi_dp_ctrl?id=Kcoglhn5r7ajr) 以及 [涂鸦 IoT 客户端 API](../iot-client/tuya-iot-client-reference)。

## 6. 授权开发板

授权码将这块开发板与你的产品绑定。下面两种方法任选其一。

### 通过代码

打开 `apps/tuya.ai/your_chat_bot/include/tuya_config.h`，设置三个字段（完整步骤参见 [设备授权](https://tuyaopen.ai/docs/quick-start/equipment-authorization)）：

- `TUYA_PRODUCT_ID` —— 产品创建时获得的 `PID`。
- `TUYA_OPENSDK_UUID` —— 你的设备 UUID（可向涂鸦技术支持免费领取）。
- `TUYA_OPENSDK_AUTHKEY` —— 你的设备 AuthKey（可向涂鸦技术支持免费领取）。

```c
#define TUYA_PRODUCT_ID      "p320pepzvmm1ghse"
#define TUYA_OPENSDK_UUID    "uuidxxxxxxxxxxxxxxxx"
#define TUYA_OPENSDK_AUTHKEY "keyxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

![获取 PID](https://images.tuyacn.com/content-platform/hestia/17573217004faaa23cc52.png)

### 通过工具

在 **Tuya Uart Tool** 中，选择串口和波特率，点击 **Start** 打开串口，然后点击 **Authorize**。

<img alt="Authorize with the tool" src="https://images.tuyacn.com/content-platform/hestia/1757310278591d8030b54.png" width="500" />

## 7. 编译并烧录

```bash
tos.py build && tos.py flash
```

T5AI-Board 提供两个串口——一个用于烧录，一个用于日志。如果烧录失败，请切换到另一个串口重试。设备首次启动时会进行配网，并向你的产品发起激活，从而完成绑定。

## 常见问题

**烧录在 Write 阶段失败。** [安装驱动](https://tuyaopen.ai/docs/tos-tools/tools-tyutool) 后重试。

## 参见

- [设备与云端绑定原理](device-cloud-binding) —— 这些步骤背后的原理模型
- [涂鸦 IoT 客户端 API](../iot-client/tuya-iot-client-reference) —— 设备侧的云端客户端
- [switch_demo](../iot-client/demo-tuya-iot-light) —— 一个最小的已绑定设备示例
