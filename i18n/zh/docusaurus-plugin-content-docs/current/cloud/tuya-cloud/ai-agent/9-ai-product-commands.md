---
title: 设备被控指令
---

设备被控指令将自然语言（如 “开灯”）映射为设备动作，让 AI 智能体能够控制灯光、插座等家居设备。您在涂鸦开发者平台上完成配置，并发布指令方案后即可生效。

## 前提条件

要让智能体控制家居设备，需同时满足以下三个条件：

- **智能体能力扩展**：为智能体添加设备控制工具，赋予其硬件交互权限。
- **设备 AI 指令绑定**：为待控设备（如智能灯、插座）配置标准化 AI 指令，并定义指令与设备动作的映射关系，例如 “开灯” 触发电源开启。
- **生态联动**：通过 **涂鸦** App 或 **智能生活** App 添加设备，完成设备入网与账号绑定，使智能体可以控制设备。

当设备对应的 PID 配置了 AI 指令，且智能体启用了 **设备控制** 插件时，与 AI 对话即可实现语义理解，进而完成设备控制。家庭灯光控制（开关、冷暖）、温控器控制（温度设置）等场景均适用。

### 家庭灯光控制

![设备被控指令](https://images.tuyacn.com/content-platform/hestia/1743404357232c546097c.png)

### 温控器控制

![设备被控指令](https://images.tuyacn.com/content-platform/hestia/1743404481a00087a879c.png)

## 配置 AI 产品指令

进入 [涂鸦开发者平台](https://platform.tuya.com/)，在左侧菜单栏单击 **智能体** > **智能体配置** > **AI 控制指令配置**，进入 [AI 产品指令配置](https://platform.tuya.com/exp/voice/ai) 页面，然后单击 **被控指令**。

![设备被控指令](https://images.tuyacn.com/content-platform/hestia/1750929173251267525a7.png)

如当前产品已有指令配置，页面会显示该品类已配置的功能指令。您可以单击页面下方的 **修改指令方案** 确认对现有版本的修改，然后单击 **确定** 进入指令配置流程。

:::note
指令方案修改后需要重新发布才能生效。
:::

![设备被控指令](https://images.tuyacn.com/content-platform/hestia/17509294383e311190d40.png)

### 第一步：指令配置

**选择产品所属品类**

产品品类决定该产品在语音平台 App 上展示的设备类型，建议选择与设备最接近的品类。

如产品暂未设置品类，单击 **设置分类**；如需修改品类，单击 **修改**。然后选择要映射到语音平台的设备类型，单击 **确定**。

![设备被控指令](https://images.tuyacn.com/content-platform/hestia/1750674164e82c22ad7e2.png)

**编辑已有指令**

单击 **操作** 栏下的 **编辑**，在 **编辑指令** 页面修改已有指令，然后单击 **确定**。

![设备被控指令](https://images.tuyacn.com/content-platform/hestia/1742970627a3863f579de.png)

![设备被控指令](https://images.tuyacn.com/content-platform/hestia/1742970825d0108e2c8fb.png)

**自定义指令**

您可以个性化配置开关、模式、档位的指令能力，以匹配产品特性。单击 **自定义指令**，在 **添加功能指令** 页面完成以下配置：

- **自定义指令语种**：选择需要支持的语种。
- **功能指令名称**：输入功能指令名称，例如 **风扇开关**。
- **能力类型**：选择要实现的能力类型，然后完成相应配置。例如，当选择能力类型为 **开关** 时，需配置开关对应的 DP、说法等，并输入语音能力说明。

![设备被控指令](https://images.tuyacn.com/content-platform/hestia/174297237595109333ce7.png)

![设备被控指令](https://images.tuyacn.com/content-platform/hestia/174297231807522af9f94.png)

配置完成后，单击 **确定**。

如需了解更多自定义语音能力的配置，请参考 [高级自定义语音能力](https://developer.tuya.com/cn/docs/iot/voice-advanced-custom-language?id=Kb4xiveclrg9k) 或 [提交工单](https://service.console.tuya.com/8/3/create?step=2&id=010306)。

**添加功能指令**

如需新增功能指令，单击 **添加指令**，然后完成以下操作：

![设备被控指令](https://images.tuyacn.com/content-platform/hestia/174297369604e4403fdc4.png)

1. **选择指令**：在功能列表中选择或搜索要为产品添加的指令，然后在目标指令的 **操作** 栏下单击 **配置**。

   ![设备被控指令](https://images.tuyacn.com/content-platform/hestia/174297407892eec53e152.png)

2. **配置指令**：编辑 **推荐指令**、**自定义指令** 或 **通用指令** 的能力参数与 DP 参数之间的关系，然后单击 **确定**。

   以 **电源开关** 指令为例，需完成 DP 选择、功能属性、查询电源状态等配置。

   ![设备被控指令](https://images.tuyacn.com/content-platform/hestia/17429761511ac36122cff.png)

3. （可选）若未找到所需能力，可单击 **自定义指令**。更多详情，请参考 [高级自定义语音能力](https://developer.tuya.com/cn/docs/iot/voice-advanced-custom-language?id=Kb4xiveclrg9k)。

   ![设备被控指令](https://images.tuyacn.com/content-platform/hestia/1742977706cf7fb677450.png)

完成指令方案配置后，单击页面下方的 **确认配置，前往体验**。

### 第二步：体验配置

参考以下流程体验指令：

1. 配置体验账号：单击 **体验账号** 下的 **立即配置**，在 **配置体验账号** 页面选择要体验语音能力的应用并添加体验账号。最多可配置三个体验账号（白名单账号）。

   ![设备被控指令](https://images.tuyacn.com/content-platform/hestia/17429790475d21cbb4998.png)

2. 添加虚拟设备：使用 OEM App 或 **智能生活** App 扫码添加虚拟设备。
3. 扫码测试：通过 App 扫码进入 AI 智能助手进行测试。

   ![设备被控指令](https://images.tuyacn.com/content-platform/hestia/1742979605838480ad06d.png)

### 第三步：发布生效

测试完成后，单击页面下方的 **下一步：发布生效** 发布指令。确认无误后，单击 **确定**。发布后，页面会显示 **发布生效**。

:::warning
指令发布后无法撤回，请确认配置无误后再发布。
:::

![设备被控指令](https://images.tuyacn.com/content-platform/hestia/1742979829d1920f49b35.png)

![设备被控指令](https://images.tuyacn.com/content-platform/hestia/17506748943fdd0d1b1a3.png)

## 版本管理

单击 **版本管理** 进入 **历史版本** 页面，查看和编辑已发布的指令版本。

![设备被控指令](https://images.tuyacn.com/content-platform/hestia/17509299650bb6f6cf87b.png)

![设备被控指令](https://images.tuyacn.com/content-platform/hestia/1742980696634e83a324e.png)

如需体验配置并发布新的指令版本，可单击 **新增版本**。

![设备被控指令](https://images.tuyacn.com/content-platform/hestia/17429810955246a10ec9b.png)

## 相关文档

- [智能体支持语种及音色](10-supported-languages-and-voice-variants)
- [添加自定义音色](10.1-add-custom-voice)
- [数据库](11-database)
