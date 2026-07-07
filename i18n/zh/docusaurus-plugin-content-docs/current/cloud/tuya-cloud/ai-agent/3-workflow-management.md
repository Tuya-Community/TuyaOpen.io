---
title: 工作流管理
description: "工作流管理是涂鸦智能体开发平台用于简化和自动化智能体业务逻辑的可视化工作台，通过拖放节点创建、管理和优化工作流以提升效率并减少幻觉。"
keywords:
  - Tuya AI Agent
  - 工作流管理
  - 可视化工作台
  - 涂鸦云
---

工作流是一款用于简化和自动化智能体业务逻辑的可视化工作台。您在拖放式界面上创建、管理和优化工作流，从而提升智能体的效率并减少幻觉。

## 创建工作流

在 [工作流](https://platform.tuya.com/exp/workflow) 平台，单击页面右上角的 **创建工作流**，输入 **工作流名称** 和 **工作流描述**，即可创建工作流项目。

![创建工作流对话框](https://images.tuyacn.com/content-platform/hestia/175515700231f6152067e.png)

## 配置工作流

### 可视化工作台

通过拖放节点构建工作流。每个节点定义一个独立的任务或决策，便于清晰地呈现整个流程。

![可视化工作台](https://images.tuyacn.com/content-platform/hestia/175515636079a5d67adfc.png)

### 开始节点

开始节点定义启动工作流所需的信息，默认输入变量为 `USER_TEXT`。

![开始节点](https://images.tuyacn.com/content-platform/hestia/1755154270b3b8706e640.png)

单击 **添加节点** 添加以下节点，构建工作流：

- [意图识别节点](https://developer.tuya.com/cn/docs/iot/ai-agent-workflow?id=Keak4gh7rdhd2#recognition)
- [大模型节点](https://developer.tuya.com/cn/docs/iot/ai-agent-workflow?id=Keak4gh7rdhd2#llm)
- [输出节点](https://developer.tuya.com/cn/docs/iot/ai-agent-workflow?id=Keak4gh7rdhd2#output)

### 意图识别节点

意图识别节点用于识别和分类用户输入的意图。设置意图识别模型后，系统即可读取用户输入并进行相应的意图分类。

![意图识别节点](https://images.tuyacn.com/content-platform/hestia/1755150705a0e497f31a4.png)

您可以选择 **极速模式** 或 **完整模式**。

**极速模式**：

- **模型**：选择合适的模型。
- **输入**：设置用于判断意图的参数，常用输入为 `USER_TEXT`。
- **意图识别**：设置需要识别的意图，以及用于匹配用户输入的意图选项。
- **异常处理**：设置超时时间、重试逻辑和异常处理方式。

**完整模式** 在极速模式的基础上增加了支持变量的 **系统提示词** 功能。系统提示词对输入进行解读，从而更深入地理解用户意图。

### 大模型节点

大模型节点是基于大模型构建的对话节点，根据您配置的变量和提示词生成高质量的回复。

![大模型节点](https://images.tuyacn.com/content-platform/hestia/1755152569d14a51a5d61.png)

- **会话历史**：开启后，节点会将会话上下文发送给模型，使用户输入保持上下文连贯。
- **输入**：需要添加到提示词的信息，支持动态引用变量。
- **模型**：选择所需的模型。
- **系统提示词**：设定模型的基础行为，如角色描述、举例参考、输出限制等，支持引用变量的语法。
- **用户提示词**：模型处理的用户指令，如查询或基于文本的提问，通常引用用户输入变量 `USER_TEXT`。
- **输出**：将模型生成的内容存为变量值，供下游节点使用。
- **异常处理**：设置超时时间、重试逻辑和异常处理方式。

### 输出节点

输出节点支持中间过程处理和消息输出，具备流式和非流式两种输出方式，提供灵活的数据输出方案。

![输出节点](https://images.tuyacn.com/content-platform/hestia/17551544153c5c451a030.png)

- **输入变量**：支持在提示词中动态引用变量。
- **输出内容**：支持引用变量的语法。开启 **流式输出** 后，模型生成的内容将逐字实时输出。

### 结束节点

结束节点用于结束一个逻辑分支，配置方式与输出节点一致。

![结束节点](https://images.tuyacn.com/content-platform/hestia/1755155123e64b3147020.png)

:::warning
如果有逻辑分支未收束到结束节点，工作流将无法运行。
:::

## 试运行

选择与工作流中设置的大模型相匹配的数据大区，在 `USER_TEXT` 中输入模拟内容，开启试运行即可得到输出结果。

![试运行](https://images.tuyacn.com/content-platform/hestia/1755155397e3c05b66c0b.png)

## 发布工作流

配置完成后，单击工作台右上角的 **发布**。涂鸦会对工作流进行逻辑校验以确保其完整；校验通过后，工作流即发布完成。

![发布工作流](https://images.tuyacn.com/content-platform/hestia/175515612584077daa16f.png)

发布后，在智能体中选择该工作流并单击 **添加工作流** 即可挂载。

![向智能体添加工作流](https://images.tuyacn.com/content-platform/hestia/1755156257c92b0d016d0.png)

## 相关文档

- [智能体开发平台](ai-agent-dev-platform)：创建智能体并挂载工作流
- [变量管理](variables-management)：工作流读写的变量
