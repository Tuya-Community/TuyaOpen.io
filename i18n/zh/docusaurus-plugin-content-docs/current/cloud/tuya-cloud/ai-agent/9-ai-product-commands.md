---
title: 设备被控指令
---
# **设备被控指令**
# **概述**

为实现智能体对家居设备（如灯光、插座等）的精准控制，需基于智能体开发平台与设备控制工具完成一体化配置。通过指令标准化与生态互联，赋能用户以自然语言对话操控设备，打造无缝智能体验。

本文介绍如何在涂鸦开发者平台上配置设备被控指令，让 AI 智能助手更懂您的产品。

# **示例场景**

假设您想要实现使用智能体控制家里的灯、插座，则需要满足以下条件：

- **智能体能力扩展**：智能体需要添加设备控制工具，为智能体赋予硬件交互权限。
- **设备 AI 指令绑定**：为待控设备（如智能灯、插座）配置标准化 AI 指令，定义指令与设备动作的映射关系（例：“开灯” → 触发电源开启）。
- **生态联动**：通过 **涂鸦** App 或 **智能生活** App 添加设备，完成设备入网与账号绑定，并使用智能体对话控制设备。

以家庭灯光控制和温控器控制为例：

### 家庭灯光控制

当家庭设备对应的 PID 配置了 AI 指令，比如灯的开关、冷暖指令且智能体配置了 “设备控制” 插件时，与 AI 对话即可实现语义理解 → 设备控制。

![设备被控指令](https://images.tuyacn.com/content-platform/hestia/1743404357232c546097c.png)

### 温控器控制

当家庭设备对应的 PID 配置了 AI 指令，比如温控器、设置了温度条件指令且智能体配置了 “设备控制” 插件时，与 AI 对话即可实现设备控制。

![设备被控指令](https://images.tuyacn.com/content-platform/hestia/1743404481a00087a879c.png)

# **配置 AI 产品指令**

进入 [涂鸦开发者平台](https://platform.tuya.com/)，单击左侧菜单栏上的 **智能体** > **智能体配置** > **AI 控制指令配置**，进入 [**AI 产品指令配置**](https://platform.tuya.com/exp/voice/ai) 页面，然后单击 **被控指令**。

![设备被控指令](https://images.tuyacn.com/content-platform/hestia/1750929173251267525a7.png)

如当前产品已有指令配置，会在页面显示品类已配置的功能指令。您可以单击页面下方的 **修改指令方案** 对现有版本的修改进行确认，然后单击 **确定** 并开始指令配置的流程。**请注意，指令方案修改后需要重新发布。**

![设备被控指令](https://images.tuyacn.com/content-platform/hestia/17509294383e311190d40.png)

### 第一步：指令配置

**选择产品所属品类**

产品品类用于展示在语音平台 App 上的设备类型，建议选择与设备最接近的品类。

如产品暂未设置分类，单击 **设置分类**；如需修改产品分类，单击 **修改**。然后选择要映射到语音平台的设备类型，单击 **确定**。

![设备被控指令](https://images.tuyacn.com/content-platform/hestia/1750674164e82c22ad7e2.png)

**配置产品所需功能指令**

### 编辑已有指令

如需修改已添加指令，单击 **操作** 栏下的 **编辑**，然后在 **编辑指令** 页面修改已有指令，并单击 **确定**。

![设备被控指令](https://images.tuyacn.com/content-platform/hestia/1742970627a3863f579de.png)

![设备被控指令](https://images.tuyacn.com/content-platform/hestia/1742970825d0108e2c8fb.png)

### 自定义指令

通过自定义指令，您可以个性化配置需要的语音指令，添加符合产品特性的开关、模式、档位的指令能力。如需添加自定义指令，单击 **自定义指令**，然后在 **添加功能指令** 页面，完成以下配置：

- **自定义指令语种**：选择需要支持的语种。
- **功能指令名称**：输入功能指令名称，例如 **风扇开关**。
- **能力类型**：选择要实现的能力类型，然后完成相应配置。例如，当选择能力类型为 **开关**，则需要完成开关对应的 DP、说法等配置，并输入语音能力说明。

![设备被控指令](https://images.tuyacn.com/content-platform/hestia/174297237595109333ce7.png)

![设备被控指令](https://images.tuyacn.com/content-platform/hestia/174297231807522af9f94.png)

配置完成后，单击 **确定**。

如需了解更多关于自定义语音能力的配置，请参考 [高级自定义语音能力](https://developer.tuya.com/cn/docs/iot/voice-advanced-custom-language?id=Kb4xiveclrg9k) 或者 [提交工单](https://service.console.tuya.com/8/3/create?step=2&id=010306)。

### 添加功能指令

如需新增功能指令，单击 **添加指令**，然后完成以下操作：

![设备被控指令](https://images.tuyacn.com/content-platform/hestia/174297369604e4403fdc4.png)

1. **选择指令**：在功能列表中选择或搜索出您想要为产品添加的指令，然后在目标指令的 **操作** 栏下，单击 **配置**。
    
    ![设备被控指令](https://images.tuyacn.com/content-platform/hestia/174297407892eec53e152.png)
    
2. **配置指令**：编辑 **推荐指令**、**自定义指令** 或 **通用指令** 的能力参数与 DP 参数之间的关系，配置完成后，单击 **确定**。
    
    以 **电源开关** 指令为例，需要完成 DP 选择、功能属性、查询电源状态等配置。
    
    ![设备被控指令](https://images.tuyacn.com/content-platform/hestia/17429761511ac36122cff.png)
    
3. （可选）若没有找到想要的能力，可以单击添加 **自定义指令**。更多详情，请参考 [高级自定义语音能力](https://developer.tuya.com/cn/docs/iot/voice-advanced-custom-language?id=Kb4xiveclrg9k)。
    
    ![设备被控指令](https://images.tuyacn.com/content-platform/hestia/1742977706cf7fb677450.png)
    

完成指令方案的配置后，单击页面下方的 **确认配置，前往体验**。

### 第二步：体验配置

参考以下流程进行指令的体验：

1. 配置体验账号：单击 **体验账号** 下的 **立即配置**，然后在 **配置体验账号** 页面选择要体验语音能力的应用并添加体验账号。最多能配置三个体验账号（白名单账号）。
    
    ![设备被控指令](https://images.tuyacn.com/content-platform/hestia/17429790475d21cbb4998.png)
    
2. 添加虚拟设备：请使用 OEM App 或者 **智能生活** App 扫码添加虚拟设备。
3. 扫码测试：通过 App 扫码进入 AI 智能助手进行测试。

![设备被控指令](https://images.tuyacn.com/content-platform/hestia/1742979605838480ad06d.png)

### 第三步：发布生效

测试完成后，单击 页面下方的 **下一步：发布生效** 来发布指令使其生效。请注意，发布后则无法撤回。确认无误，单击 **确定**。发布后，页面会显示为 **发布生效**。

![设备被控指令](https://images.tuyacn.com/content-platform/hestia/1742979829d1920f49b35.png)

![设备被控指令](https://images.tuyacn.com/content-platform/hestia/17506748943fdd0d1b1a3.png)

# **版本管理**

您可以单击 **版本管理** 进入 **历史版本** 页面来查看和编辑指令的发布版本。

![设备被控指令](https://images.tuyacn.com/content-platform/hestia/17509299650bb6f6cf87b.png)

![设备被控指令](https://images.tuyacn.com/content-platform/hestia/1742980696634e83a324e.png)

您也可以单击 **新增版本** 来体验配置并发布新的指令版本。

![设备被控指令](https://images.tuyacn.com/content-platform/hestia/17429810955246a10ec9b.png)