---
title: 角色管理
---
# **角色管理**
# **角色管理**

角色管理用于支持 AI 娃娃、AI 故事机等需要通过智能体实现不同性格与对话风格的产品形态。每个角色包含角色名称、描述、个性设定等内容。平台支持用户自定义角色，同时也提供官方参考角色。

角色管理涵盖当前账号下使用的所有角色。不同智能体可根据业务需求从角色库中选择并关联所需角色。

# **创建角色**

1. 登录 [涂鸦开发者平台](https://platform.tuya.com/)，前往 **智能体** > **智能体开发** > [**角色管理**](https://platform.tuya.com/exp/ai/role) 页面。
    
    ![角色管理](https://images.tuyacn.com/content-platform/hestia/174729786153abf8921fd.png)
    
2. 在页面右上角单击 **创建角色**，然后配置以下内容：
    - **角色名称**：角色的名称。
    - **角色性格**：用于描述角色的性格特征、背景故事、知识体系、兴趣爱好、专长技能等。该字段将作为角色的 Prompt 使用，例如可设定为擅长讲笑话、讲故事等。
    - **音色**：支持自定义角色音色。
        
        音色需要与目标区域和语种一致，例如面向美区的 AI 娃娃需选择对应区域支持的音色。支持按区域和语种筛选合适的音色资源。
        
    - **语种**：代表角色在对话中所支持的语种（文本转语音，TTS；及自动语音识别，ASR ）。如选择英语，则默认输入和输出的语种均为英文。
    - **标签**：用于对角色进行分类，可用于面板和业务展示的分组管理。
    - **头像**：每个角色都需要上传头像，头像将应用于面板和其他业务渠道。建议保持头像风格一致，增强整体视觉统一性。
    
    ![角色管理](https://images.tuyacn.com/content-platform/hestia/1747290418adb048d8504.png)
    

# **角色在智能体中的应用**

每个智能体可关联一个或多个角色，实现针对不同产品场景的角色化对话体验。

**配置步骤**：

1. 进入智能体开发页面，在 **01 模型能力配置** > **变量** 下，单击 **+** 进入 **编辑变量** 页面。
    
    ![角色管理](https://images.tuyacn.com/content-platform/hestia/17472938573dacf92a83a.png)
    
2. 在 **角色变量** 下，单击 **角色预设管理** 进入 **角色预设管理** 页面，然后单击 **添加预设**，并择官方角色或自定义角色进行配置。
    
    ![角色管理](https://images.tuyacn.com/content-platform/hestia/17472979753b90f5a0c6a.png)
    
    ![角色管理](https://images.tuyacn.com/content-platform/hestia/1747295778c87c67e5e77.png)
    
3. 启用变量组开关，开启 **角色变量** 管理：角色变量适用于 AI 玩具、音响等有角色预设需求的场景，需配合产品面板使用，支持用户在 C 端自定义角色、音色和性格。
    
    ![角色管理](https://images.tuyacn.com/content-platform/hestia/1747295409c77545faf55.png)
    
4. 启用变量、完成智能体开发、并与设备关联后，即可在 AI 玩具面板中展示预设角色信息，实现终端用户角色切换功能。

# **与 AI 玩具角色面板配合使用说明**

以 AI 玩具方案为例，以下为面板配合使用流程。更多详情，请参考 [产品 AI 功能开发](https://developer.tuya.com/cn/docs/iot/AI-feature?id=Keapy1et1fc63#title-3-%E4%BA%A7%E5%93%81%20AI%20%E5%8A%9F%E8%83%BD%E5%BC%80%E5%8F%91%E6%B5%81%E7%A8%8B)。

1. 产品关联智能体，如下图所示。
    
    ![角色管理](https://images.tuyacn.com/content-platform/hestia/1746007605f8373614f38.png)
    
2. 配置角色变量及预设角色。
    
    ![角色管理](https://images.tuyacn.com/content-platform/hestia/1747124008e5ca80ce590.png)
    
    ![角色管理](https://images.tuyacn.com/content-platform/hestia/17472907530115235a301.png)
    
3. 选择官方面板并进行面板交互开发。
    
    ![角色管理](https://images.tuyacn.com/content-platform/hestia/1746007473d931c585877.png)
    
    ![角色管理](https://images.tuyacn.com/content-platform/hestia/1747290818e43dbfb9d0a.png)
    
4. 面板效果展示：面板端支持多角色切换，所展示角色来自智能体已配置的角色预设。
    
    ![角色管理](https://images.tuyacn.com/content-platform/hestia/1746002100200db9a736c.png)