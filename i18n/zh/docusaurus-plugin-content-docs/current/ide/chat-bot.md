---
title: "your_chat_bot —— 云端 AI Agent"
description: "端到端搭建经典 AI + IoT 项目：从示例创建、编译烧录、授权到配网，讲清 IDE 中云端 IoT / AI Agent 流程。"
sidebar_label: "04 实战二 —— your_chat_bot"
sidebar_position: 4
keywords:
  - TuyaOpen IDE
  - TuyaOpen
  - 嵌入式开发
---

这是 TuyaOpen 最经典的 **AI + IoT** 项目。本实战**重点讲清 IDE 中云端 IoT / AI Agent 的开发流程**。

## 两种开发模式 {/* #modes */}

| 模式 | 适合 | 步骤 |
| --- | --- | --- |
| **基础模式**（推荐新手） | 刚接触 TuyaOpen / AI | 直接用官方**默认 PID**（已完成功能配置和智能体配置）。 |
| **进阶模式** | 要开发自己的产品 | ① 创建 PID ② 创建智能体 ③ 把智能体绑定到 PID。 |

本次实战选择**基础模式**，适合新手快速上手，体验三端合一。

## 第一步：从示例创建项目 {/* #step-1 */}

1. 点击 IDE 工具栏**示例**，选择 AI 语音聊天机器人，点击**创建项目**。
2. 依次选择涂鸦 T5AI、涂鸦 T5AI-Board 开发板，以及 3.5 寸 LCD 触摸屏（按需选择）。

   ![示例库——AI 语音聊天机器人](https://images.tuyacn.com/fe-static/docs/img/5860abdb-9e01-472f-979b-a6a06204ba3c.png?imageMogr2/format/webp)

3. 跟随指引去 OEM 示例的 PID，会跳转到浏览器涂鸦开发者平台。关于 PID 的概念，请参阅 [PID 名词解释](/docs/quick-start#pid)。

   ![OEM 示例 PID——跳转到开发者平台](https://images.tuyacn.com/fe-static/docs/img/1eae82ba-87f7-47d3-ab2b-00b9f779a414.png?imageMogr2/format/webp)

4. 点击**复制产品**，填写产品名称和产品型号，点击确定。

   ![复制产品对话框](https://images.tuyacn.com/fe-static/docs/img/e280d7e1-5d98-4cce-89ea-6dfbec962b64.png?imageMogr2/format/webp)

5. 复制左侧产品 ID。

   ![从产品复制 PID](https://images.tuyacn.com/fe-static/docs/img/b2e15e19-8cf1-4882-9e26-ef827e1ecd23.png?imageMogr2/format/webp)

6. 回到 TuyaOpen IDE 界面，粘贴 PID，点击下一步，创建项目。

   ![在 IDE 中粘贴 PID 并创建项目](https://images.tuyacn.com/fe-static/docs/img/9008b31a-e2eb-4e29-8ee8-878d7b358063.png?imageMogr2/format/webp)

:::note
**为什么用复制？** 复制可以快速完成与默认 PID 功能一致的产品；AI + IoT 类产品还会一并复制当前产品已绑定的智能体。
:::

## 第二步：编译与烧录 {/* #step-2 */}

1. 在**云端 IoT / Agent 开发**可以看到已经成功绑定云端产品。

   ![云端 IoT / Agent 页面——产品已绑定](https://images.tuyacn.com/fe-static/docs/img/eb4b57ab-51f1-461e-8ef3-f4cf7698299b.png?imageMogr2/format/webp)

2. 进入**项目详情**，进行编译和烧录。页面下方可以看到 Vibe Coding 硬件视图和全部引脚情况。

   ![项目详情——Vibe Coding 硬件视图](https://images.tuyacn.com/fe-static/docs/img/51676430-396a-4f83-ae6f-932e78341a78.png?imageMogr2/format/webp)

3. 烧录成功后可以看到触摸屏亮起。

## 第三步：设备授权 {/* #step-3 */}

授权码（UUID + Authkey）是设备联网上云的凭证，在 [涂鸦 IoT 平台](https://platform.tuya.com/) 获取。

1. 关于授权码的概念及获取方式，请参阅 [TuyaOpen 专用授权码](/docs/quick-start#tuyaopen-专用授权码) 和[授权指南](/pricing-guide)。根据项目实战需求先获取 2 个免费的授权码。回到[涂鸦开发者平台](https://platform.tuya.com/)，点击左侧栏 AI 产品 → 产品开发，能看到第一步 OEM 的产品示例。

   ![开发者平台中的 OEM 产品示例](https://images.tuyacn.com/fe-static/docs/img/123a95b4-7036-43fa-94aa-1da50ad33f4a.png?imageMogr2/format/webp)

2. 点击右侧继续开发。

   ![平台上继续开发](https://images.tuyacn.com/fe-static/docs/img/0fcac836-7faf-42c4-9a2d-23797a4d8b3d.png?imageMogr2/format/webp)

3. 点击 03 硬件开发后，在已选云端接入硬件处，点击免费领取 2 个授权码。

   ![免费领取授权码](https://images.tuyacn.com/fe-static/docs/img/728a7dc9-ca41-4bd7-aea2-fcc2eda4069c.png?imageMogr2/format/webp)

   ![授权码已领取](https://images.tuyacn.com/fe-static/docs/img/7161ee3b-3898-4451-92f5-d661bf24a818.png?imageMogr2/format/webp)

   ![授权码清单详情](https://images.tuyacn.com/fe-static/docs/img/f0891c1c-9e39-4023-b6b3-00c7507eb084.png?imageMogr2/format/webp)

4. 下载授权码清单。

   ![下载授权码清单](https://images.tuyacn.com/fe-static/docs/img/4812b52c-e4ce-4f21-9eff-68231e77f636.png?imageMogr2/format/webp)

5. 将授权码填写到 IDE 的**授权码管理**面板（即**密钥管理**页面）。

   ![IDE 授权码管理](https://images.tuyacn.com/fe-static/docs/img/5a02c86b-9e3e-459b-ba80-14643e6d7e67.png?imageMogr2/format/webp)

6. 通过 AI 将授权码写入设备。

   ![AI 将授权码写入设备](https://images.tuyacn.com/fe-static/docs/img/2d41f33a-7e0b-4d23-af46-213eee2fe058.png?imageMogr2/format/webp)

## 第四步：设备配网 {/* #step-4 */}

1. 参照官方[设备配网步骤](/docs/quick-start/device-network-configuration)完成设备配网。
2. 配网完成后，在小程序面板可以切换对话的 AI Agent。

   ![小程序面板切换 AI Agent](https://images.tuyacn.com/fe-static/docs/img/9cb76469-cee7-44e3-84a8-1d54bdb1fb54.png?imageMogr2/format/webp)

3. 双击开发板 KEY 按键，可以切换对话模式，当前项目支持唤醒词"你好涂鸦" / "Hey Tuya"。

:::info
**进阶——自建智能体（进阶模式）**：参阅 [Agent 开发指南](./agent-development.md)。
:::

## 下一步 {/* #next */}

你已经有一台联网设备了。继续 [实战三：小程序面板](./miniapp-panel.md)——为它做一个手机控制面板。

