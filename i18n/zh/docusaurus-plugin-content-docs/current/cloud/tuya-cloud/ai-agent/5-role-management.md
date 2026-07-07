---
title: 角色管理
description: "角色管理用于定义智能体可扮演的人设，包括角色名称、描述、音色与 Prompt，先在共享角色库创建角色再绑定到智能体以切换不同人设。"
keywords:
  - Tuya AI Agent
  - 角色管理
  - 人设
  - 音色
---

角色管理用于定义智能体可以扮演的人设，包括角色名称、描述、音色和 Prompt，决定智能体如何对话。你先在共享角色库中创建角色，再将一个或多个角色绑定到智能体，使同一产品能够在不同人设之间切换。它支持 AI 娃娃、AI 故事机等需要不同性格与对话风格的产品形态。

角色管理涵盖当前账号下使用的所有角色。你可以根据业务需求从角色库中选择角色，包括官方参考角色和自定义角色。

## 创建角色

1. 登录 [涂鸦开发者平台](https://platform.tuya.com/)，前往 **智能体** > **智能体开发** > [**角色管理**](https://platform.tuya.com/exp/ai/role) 页面。

   ![角色管理页面](https://images.tuyacn.com/content-platform/hestia/174729786153abf8921fd.png)

2. 在页面右上角单击 **创建角色**，然后配置以下内容：

   - **角色名称**：角色的名称。
   - **角色性格**：角色的性格特征、背景故事、知识体系、兴趣爱好、专长技能等。该字段将作为角色的 Prompt 使用，例如设定为擅长讲笑话或讲故事。
   - **音色**：角色的音色。音色需要与目标区域和语种一致，例如面向美区的 AI 娃娃需选择对应区域支持的音色。可按区域和语种筛选合适的音色资源。
   - **语种**：角色在对话中支持的语种，涵盖文本转语音（TTS）和自动语音识别（ASR）。选择英语时，输入和输出语种默认均为英文。
   - **标签**：用于对角色进行分类，可用于面板和业务展示的分组管理。
   - **头像**：上传的图片，将应用于面板和其他业务渠道。建议保持头像风格一致，增强整体视觉统一性。

   ![角色创建表单与头像上传](https://images.tuyacn.com/content-platform/hestia/1747290418adb048d8504.png)

## 角色在智能体中的应用

每个智能体可关联一个或多个角色，实现针对不同产品场景的角色化对话体验。

**配置步骤**：

1. 进入智能体开发页面，在 **01 模型能力配置** > **变量** 下，单击 **+** 进入 **编辑变量** 页面。

   ![编辑变量页面](https://images.tuyacn.com/content-platform/hestia/17472938573dacf92a83a.png)

2. 在 **角色变量** 下，单击 **角色预设管理** 进入 **角色预设管理** 页面，然后单击 **添加预设**，选择官方角色或自定义角色进行配置。

   ![角色预设管理](https://images.tuyacn.com/content-platform/hestia/17472979753b90f5a0c6a.png)

   ![添加预设角色](https://images.tuyacn.com/content-platform/hestia/1747295778c87c67e5e77.png)

3. 启用变量组开关，开启 **角色变量** 管理。角色变量适用于 AI 玩具、音响等有角色预设需求的场景，需配合产品面板使用，支持用户在 C 端自定义角色、音色和性格。

   ![角色变量开关](https://images.tuyacn.com/content-platform/hestia/1747295409c77545faf55.png)

4. 启用变量、完成智能体开发并与设备关联后，即可在 AI 玩具面板中展示预设角色信息，实现终端用户角色切换功能。

## 与 AI 玩具面板配合使用

以 AI 玩具方案为例，下面是面板的配合使用流程。更多详情，请参考 [产品 AI 功能开发](https://developer.tuya.com/cn/docs/iot/AI-feature?id=Keapy1et1fc63#title-3-%E4%BA%A7%E5%93%81%20AI%20%E5%8A%9F%E8%83%BD%E5%BC%80%E5%8F%91%E6%B5%81%E7%A8%8B)。

1. 产品关联智能体。

   ![产品关联智能体](https://images.tuyacn.com/content-platform/hestia/1746007605f8373614f38.png)

2. 配置角色变量及预设角色。

   ![配置角色变量](https://images.tuyacn.com/content-platform/hestia/1747124008e5ca80ce590.png)

   ![配置预设角色](https://images.tuyacn.com/content-platform/hestia/17472907530115235a301.png)

3. 选择官方面板并进行面板交互开发。

   ![选择官方面板](https://images.tuyacn.com/content-platform/hestia/1746007473d931c585877.png)

   ![面板交互开发](https://images.tuyacn.com/content-platform/hestia/1747290818e43dbfb9d0a.png)

4. 查看面板效果。面板端支持多角色切换，所展示角色来自智能体已配置的角色预设。

   ![面板多角色切换](https://images.tuyacn.com/content-platform/hestia/1746002100200db9a736c.png)

## 相关文档

- [智能体评测](agent-evaluation) — 测试每个角色的响应效果
- [设备自控指令](self-control-commands) — 让设备响应语音指令
