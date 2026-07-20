这是 TuyaOpen 最经典的 **AI + IoT** 项目。本实战**重点讲清 IDE 中云端 IoT / AI Agent 的开发流程**。

<section id="modes" className="section">

## 两种开发模式

| 模式 | 适合 | 步骤 |
| --- | --- | --- |
| **基础模式**（推荐新手） | 刚接触 TuyaOpen / AI | 直接用官方**默认 PID**（已完成功能配置和智能体配置）。 |
| **进阶模式** | 要开发自己的产品 | ① 创建 PID ② 创建智能体 ③ 把智能体绑定到 PID。 |

本次实战选择**基础模式**，适合新手快速上手，体验三端合一。

</section>

<section id="step-1" className="section">

## 第一步：从示例创建项目

1. 点击 IDE 工具栏**示例**，选择 AI 语音聊天机器人，点击**创建项目**。
2. 依次选择涂鸦 T5AI、涂鸦 T5AI-Board 开发板，以及 3.5 寸 LCD 触摸屏（按需选择）。

   ![示例库——AI 语音聊天机器人](/img/ide/get-started/examples-ai-voice-chatbot.png)

3. 跟随指引去 OEM 示例的 PID，会跳转到浏览器涂鸦开发者平台。关于 PID 的概念，请参阅 [PID 名词解释](/docs/quick-start#pid)。

   ![OEM 示例 PID——跳转到开发者平台](/img/ide/get-started/oem-pid-jump-to-developer-platform.png)

4. 点击**复制产品**，填写产品名称和产品型号，点击确定。

   ![复制产品对话框](/img/ide/get-started/copy-product-dialog.png)

5. 点击进入开发流程。

   ![进入开发流程](/img/ide/get-started/enter-development-flow.png)

   ![开发流程详情](/img/ide/get-started/development-flow-detail.png)

6. 复制左上角 PID。

   ![从产品复制 PID](/img/ide/get-started/copy-pid-from-product.png)

7. 回到 TuyaOpen IDE 界面，粘贴 PID，点击下一步，创建项目。

   ![在 IDE 中粘贴 PID 并创建项目](/img/ide/get-started/ide-paste-pid-create-project.png)

:::note
**为什么用复制？** 复制可以快速完成与默认 PID 功能一致的产品；AI + IoT 类产品还会一并复制当前产品已绑定的智能体。
:::

</section>

<section id="step-2" className="section">

## 第二步：编译与烧录

1. 在**云端 IoT / Agent 开发**可以看到已经成功绑定云端产品。

   ![云端 IoT / Agent 页面——产品已绑定](/img/ide/get-started/cloud-iot-agent-product-bound.png)

2. 进入**项目详情**，进行编译和烧录。页面下方可以看到 Vibe Coding 硬件视图和全部引脚情况。

   ![项目详情——Vibe Coding 硬件视图](/img/ide/get-started/project-details-vibe-hardware-view.png)

3. 烧录成功后可以看到触摸屏亮起。

</section>

<section id="step-3" className="section">

## 第三步：设备授权

授权码（UUID + Authkey）是设备联网上云的凭证，在 [涂鸦 IoT 平台](https://platform.tuya.com/) 获取。

1. 关于授权码的概念及获取方式，请参阅 [TuyaOpen 专用授权码](/docs/quick-start#tuyaopen-专用授权码) 和[授权指南](/pricing-guide)。根据项目实战需求先获取 2 个免费的授权码。回到[涂鸦开发者平台](https://platform.tuya.com/)，点击左侧栏 AI 产品 → 产品开发，能看到第一步 OEM 的产品示例。

   ![开发者平台中的 OEM 产品示例](/img/ide/get-started/oem-product-example-in-platform.png)

2. 点击右侧继续开发。

   ![平台上继续开发](/img/ide/get-started/developer-platform-continue-development.png)

3. 点击 03 硬件开发后，在已选云端接入硬件处，点击免费领取 2 个授权码。

   ![免费领取授权码](/img/ide/get-started/claim-free-license-keys.png)

   ![授权码已领取](/img/ide/get-started/license-keys-claimed.png)

   ![授权码清单详情](/img/ide/get-started/license-key-list-detail.png)

4. 下载授权码清单。

   ![下载授权码清单](/img/ide/get-started/download-license-key-list.png)

5. 将授权码填写到 TuyaOpen IDE 授权码管理处。

   ![IDE 授权码管理](/img/ide/get-started/ide-license-key-manager.png)

6. 通过 AI 将授权码写入设备。

   ![AI 将授权码写入设备](/img/ide/get-started/ai-write-license-to-device.png)

</section>

<section id="step-4" className="section">

## 第四步：设备配网

1. 参照官方[设备配网步骤](/docs/quick-start/device-network-configuration)完成设备配网。
2. 配网完成后，在小程序面板可以切换对话的 AI Agent。

   ![小程序面板切换 AI Agent](/img/ide/get-started/miniapp-switch-agent.png)

3. 双击开发板 KEY 按键，可以切换对话模式，当前项目支持唤醒词"你好涂鸦" / "Hey Tuya"。

:::info
**进阶——自建智能体（进阶模式）**：参阅 [Agent 开发指南](/learn/tuyaopen-ide-agent-dev)。
:::

</section>

<section id="next" className="section">

## 下一步

你已经有一台联网设备了。继续 [实战三：小程序面板](/learn/tuyaopen-ide-practice-3)——为它做一个手机控制面板。

</section>
