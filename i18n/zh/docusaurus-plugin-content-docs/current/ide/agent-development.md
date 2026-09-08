---
title: "Agent 开发指南"
description: "使用 TuyaOpen IDE 端到端地开发、部署和绑定 TuyaOpen IoT 智能体的完整工作流。"
sidebar_label: "Agent 开发指南"
sidebar_position: 8
keywords:
  - TuyaOpen IDE
  - TuyaOpen
  - AI Agent
  - 数据点
---

## 概述 {/* #overview */}

TuyaOpen IDE 将 Tuya IoT 硬件与云端 AI 能力连接起来。你只需开发并部署一次 Agent，然后通过唯一的产品 ID（PID）将其绑定到一个或多个设备。设备使用标准化的数据点（DP）向 Agent 发送遥测数据并接收控制命令。

本文覆盖：

- 设备 - 云端 - Agent 架构的工作原理
- 在 IDE 中创建和定义产品
- 使用 AI 辅助管理 DP 定义
- 开发和发布 Agent
- 将 Agent 绑定到产品

:::tip

TuyaOpen IDE 支持所有硬件平台（T5AI-Core、ESP32S3、BK7231X、Raspberry Pi 等）。IDE 中的 Agent 开发流程与平台无关。

:::

## 工作原理 {/* #architecture */}

TuyaOpen IDE 系统采用三层绑定模型。所有数据都通过这个架构一致地流动。

```text
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│   Device PID    │◄───────►│   Tuya Cloud    │◄───────►│    AI Agent     │
│  Hardware Code  │ DP API  │ Product + DPs   │ LLM     │ Skills / MCP    │
│                 │  Sync   │                 │ Call    │   Workflows     │
└─────────────────┘         └─────────────────┘         └─────────────────┘
```

### 绑定原理

**产品 ID（PID）** 是贯穿三层的唯一绑定标识符。每个设备都有硬件 PID，每个云端产品都有 PID，每个 Agent 都绑定到一个 PID。当三者共享同一个 PID 时，它们会自动互通。

**DP（数据点）** 是数据契约。DP 定义了设备与云端之间流动的每一条数据——传感器读数、开关状态、原始二进制有效载荷等。Agent 通过读写 DP 来观察和控制设备。

![端到端 Agent 绑定架构](https://images.tuyacn.com/fe-static/docs/img/c3422cc7-27e6-4f25-a726-e2d36b87322f.png?imageMogr2/format/webp)

## 1. 启用 Agent 开发 {/* #enable */}

在 IDE 中创建新的 TuyaOpen 项目时，你可以选择启用云端 Agent 开发。并非每个项目都需要云端能力——纯本地固件可以跳过此步骤。

1. 创建或打开一个 TuyaOpen 项目。
2. 在项目落地页，从导航栏选择 **Agent**。
3. 确认启用云端 IoT Agent 功能。

![IDE Agent 开发页面](https://images.tuyacn.com/fe-static/docs/img/00e11062-4ecf-4096-8529-df9796344448.png?imageMogr2/format/webp)

启用后，Agent 开发页面显示四个主要面板：

| 面板 | 用途 |
| --- | --- |
| **产品 PID** | 查看或更改绑定到此项目的产品 |
| **发布状态** | 检查 Agent 发布和部署状态 |
| **DP 数据点** | 定义和管理设备 - 云端数据契约 |
| **Agent 开发区域** | 创建、配置和开发 Agent |

![页面组成总览](https://images.tuyacn.com/fe-static/docs/img/a515f50b-98a2-497f-9e08-2a6c43fb913f.png?imageMogr2/format/webp)

## 2. 创建产品 {/* #product */}

开发 Agent 之前，你需要一个云端产品。产品持有设备固件和 Agent 代码共享的 DP 模型。有两种创建方式。

### AI 辅助（推荐）

向 IDE AI 助手描述你的产品。它会自动创建产品并生成相应的 DP 定义。

1. 在项目中打开 **Agent** 页面。
2. 在 IDE 聊天中输入：`帮我创建一个智能温湿度传感器产品`。
3. 助手创建产品、定义相关 DP，并将它们同步到你的项目。

### 手动创建

在云控制台中逐步完成产品配置。

1. 在 **Agent** 页面，点击**创建产品**。
2. 选择产品类别（例如**智能家居 > 传感器**）。
3. 输入产品名称和描述。
4. 选择连接协议。
5. 保存以生成 PID。

![产品创建界面](https://images.tuyacn.com/fe-static/docs/img/46ff66c9-ba75-49ad-9b6c-4dfbade62fc2.png?imageMogr2/format/webp)

:::info

创建后，PID 会出现在**产品 PID** 面板中。

:::

## 3. 定义 DP 数据点 {/* #dp */}

DP（数据点）是设备固件与云端之间的数据契约。设备报告的每一个值、设备接收的每一条命令，都通过 DP 传输。

每个 DP 都有：

| 属性 | 说明 |
| --- | --- |
| **DPID** | 数字标识符（1–255） |
| **DPCode** | 可读名称（例如 `switch_1`、`temp_current`） |
| **类型** | 布尔型、数值型、枚举型、字符串、原始型、故障型 |
| **约束** | 最小/最大值、步长、枚举选项 |

:::warning

DP 在设备固件、涂鸦云和 Agent 之间共享。不更新所有三者就更改 DP 定义会破坏通信。请始终使用 AI 工作流进行 DP 更改——它会保持三层同步。

:::

### AI 辅助 DP 管理

使用 IDE AI 助手创建、修改或扩展 DP 定义。这是推荐的方法，因为它会自动验证 DP 格式和约束、更新云端产品模型、生成匹配的设备固件代码，并更新面板/应用定义。

示例提示词：

```text
1. 帮我添加一个通道 1 继电器开关的布尔 DP
2. 创建一个温度上报 DP，范围 -40 到 125°C，精度 0.1°C
3. 添加一个 RGB 灯带控制的原始数据 DP——3 字节，R G B
4. 创建一个三路开关，带三个布尔 DP
```

:::info

助手会在云端生成 DP 定义，更新你的项目配置，并为设备固件生成 C 代码。

:::

### 查看 DP

在 **Agent** 页面，**DP 数据点**面板显示为产品 PID 定义的所有 DP。你可以看到 DPID、类型、名称和当前约束。

![DP 列表示例](https://images.tuyacn.com/fe-static/docs/img/3cdc22e9-38bd-423d-bc52-c44a1afd9af4.png?imageMogr2/format/webp)

### DP 作为 Agent 控制接口

Agent 使用 DP 来读取和控制设备。推理时：Agent 从设备接收所有当前 DP 值，LLM 使用这些值推理设备状态，Agent 可以将 DP 值写回设备以执行动作。这就是 Agent 执行设备控制的方式——通过读写 DP 契约。

## 4. 开发 Agent {/* #develop */}

你可以在两种模式之一中创建 Agent：

| 模式 | 适用场景 |
| --- | --- |
| **智能体模式** | 带工具的单个 LLM。简单直接的基于提示词的开发。适用于大多数设备控制场景。 |
| **工作流模式** | 带有多模型编排、意图识别和条件逻辑的多步系统。适用于复杂的语音助手或多智能体系统。 |

### 创建新 Agent

1. 在 **Agent** 页面，进入 **Agent** 面板。
2. 点击**新建智能体**。
3. 输入 Agent 的名称和描述。
4. 选择模式：**智能体**或**工作流**。

![创建新 Agent 界面](https://images.tuyacn.com/fe-static/docs/img/e057081c-54c3-4442-b9a0-04883a7e87b1.png?imageMogr2/format/webp)

### 复用现有 Agent

你可以将先前发布的 Agent 绑定到你的产品。当你希望相同的 Agent 逻辑跨多种设备类型工作时，这很有用。

1. 在 **Agent** 页面，进入 **Agent** 面板。
2. 点击**选择已有智能体**。
3. 从已发布的 Agent 列表中选择。

![选择已有 Agent 界面](https://images.tuyacn.com/fe-static/docs/img/fb45626e-26ba-4eaf-bc03-95984ae00fa0.png?imageMogr2/format/webp)

:::note

所选的 Agent 必须已发布才能绑定到产品。当产品之间的 DPCode 兼容时，复用效果最好——为单开关编写的 Agent 可能无法在三档开关上正常工作，除非两者使用匹配的 DPCode。

:::

![Agent 绑定成功](https://images.tuyacn.com/fe-static/docs/img/019529fc-eddc-4f6b-bb07-10e3062037fe.png?imageMogr2/format/webp)

:::info

创建或选择后，Agent 会绑定到产品 PID。你会在 **Agent** 面板中看到绑定确认。

:::

## 5. 智能体模式 {/* #agent-mode */}

智能体模式是默认且最简单的开发模型。你配置一个带有系统提示词、工具和能力的单个 LLM。

1. 在 **Agent** 页面，点击**开发智能体**。
2. Agent 编辑器打开。

![Agent 编辑器界面](https://images.tuyacn.com/fe-static/docs/img/ed89d187-2949-4318-b385-f6b4b6431b92.png?imageMogr2/format/webp)

在智能体模式下，你配置：

| 配置项 | 说明 |
| --- | --- |
| **系统提示词** | 定义 Agent 的角色、行为和知识 |
| **模型选择** | 选择底层 LLM |
| **工具** | 启用 MCP 连接器、技能、RAG 和设备控制 |
| **能力** | 语音（ASR/TTS）、视觉等 |

![智能体模式配置](https://images.tuyacn.com/fe-static/docs/img/85b7cf0c-10ed-47cf-b514-38eb92c3fbc6.png?imageMogr2/format/webp)

恒温器 Agent 的示例系统提示词：

```text
你是一个恒温控制 Agent。监控室温和湿度。
当温度超过 26°C 时，打开制冷器（switch_2 = true）。
当温度低于 20°C 时，打开加热器（switch_1 = true）。
被询问时始终报告当前温度和湿度。
保持回复简洁和有帮助。
```

:::note

DP 读写工具自动对每个绑定的 Agent 可用——你不需要显式添加它。

:::

## 6. 工作流模式 {/* #workflow-mode */}

工作流模式让你构建复杂的多步 Agent 系统。当你需要意图识别、模型链、条件逻辑或并行执行时使用它。

工作流模式能力：

- **意图识别**——根据意图将用户查询路由到不同的处理程序。
- **多模型编排**——为不同任务调用不同模型。
- **条件分支**——基于中间结果的逻辑门。
- **同步和并行执行**——控制执行流程。

![工作流编辑器界面](https://images.tuyacn.com/fe-static/docs/img/34af0b69-5333-4a36-a30a-da744b5edd80.png?imageMogr2/format/webp)

:::info

完整的工作流开发参考，请参阅「工作流管理」。

:::

## 7. 发布和绑定 {/* #publish */}

开发完 Agent 后：

1. 在 Agent 编辑器中点击**发布**。
2. 选择版本标签或使用自动版本控制。
3. 等待部署完成。

:::tip

发布后，Agent 会自动绑定到产品 PID。任何使用该 PID 的设备都会连接到你的 Agent。

:::

## 最佳实践：设计优秀的 Agent 赋能设备 {/* #best-practices */}

最成功的 Agent - 硬件产品遵循以下原则：

#### DP 优先设计

定义映射到语义设备能力的 DP，而不是原始寄存器值。Agent 理解 `target_temp` 比理解 `register_0x12_value` 更好。

#### 人类可读的 DPCode

使用描述性名称（`hvac_mode`，而不是 `dp5`）。LLM 使用 DPCode 名称来理解每个 DP 的作用。

#### 先状态后动作

给 Agent 足够的可读状态以做出好决策。恒温器 Agent 需要知道当前温度才能决定加热或冷却。

#### 幂等动作

设备控制 DP 应该可以安全地多次写入。网络故障时 Agent 可能会重试 DP 写入。

#### 考虑模态

这个设备需要语音吗？视觉？两者都需要？让 Agent 模式和硬件能力与用例匹配。

:::info

更深入的产品设计指导，请参阅「Agent-First 硬件概念」。

:::

## 另请参阅 {/* #see-also */}

- [TClaw 快速开始（T5-AI）](/docs/tclaw/ducky-quick-start-T5AI)
- [硬件技能开发](/docs/tclaw/hardware-skill)
- [自定义设备 MCP](/docs/tclaw/custom-device-mcp)
