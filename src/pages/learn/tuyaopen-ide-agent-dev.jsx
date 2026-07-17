import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { clsx } from 'clsx';
import TutorialShell from '@site/src/components/TutorialShell';
import shell from '@site/src/components/TutorialShell/styles.module.css';

/* =========================================================================
 * LEARN: TuyaOpen IDE Agent Development   kind: 'interactive'
 * Complete end-to-end guide for developing, deploying, and binding
 * TuyaOpen IoT Agents across device and cloud in the TuyaOpen IDE.
 * ========================================================================= */

const content = {
  en: {
    badge: 'TuyaOpen IDE',
    title: 'TuyaOpen IDE Agent Development Guide',
    subtitle:
      'Complete end-to-end workflow for developing, deploying, and binding TuyaOpen IoT Agents across device and cloud using the TuyaOpen IDE.',
    meta: ['Beginner', '15 min', 'IDE'],
    nav: [
      { id: 'overview', label: 'Overview' },
      { id: 'architecture', label: 'Architecture' },
      { id: 'enable', label: 'Enable Agent' },
      { id: 'product', label: 'Create Product' },
      { id: 'dp', label: 'Define DP Points' },
      { id: 'develop', label: 'Develop Agent' },
      { id: 'agent-mode', label: 'Agent Mode' },
      { id: 'workflow-mode', label: 'Workflow Mode' },
      { id: 'publish', label: 'Publish & Bind' },
      { id: 'best-practices', label: 'Best Practices' },
    ],
    overviewTitle: 'Overview',
    overviewLead:
      'TuyaOpen IDEs connect Tuya IoT hardware to cloud-based AI capabilities. You develop and deploy an Agent once, then bind it to one or more devices through a unique Product ID (PID). The device uses standardized Data Points (DPs) to send telemetry and receive control commands from the Agent.',
    overviewPoints: [
      'How the device-cloud-Agent architecture works',
      'Creating and defining a product in the IDE',
      'Managing DP definitions with AI assistance',
      'Developing and publishing an Agent',
      'Binding an Agent to a product',
    ],
    overviewTip:
      'TuyaOpen IDEs work across all supported hardware platforms (T5AI-Core, ESP32S3, BK7231X, Raspberry Pi, and more). The Agent development workflow in the IDE is platform-agnostic.',

    architectureTitle: 'How It Works',
    architectureLead: 'The TuyaOpen IDE system follows a three-layer binding model. Every piece of data flows through this architecture consistently.',
    bindingTitle: 'Binding Principle',
    bindingLead:
      'Product ID (PID) is the single binding identifier across all three layers. Every device has a hardware PID. Every cloud product has a PID. Every Agent is bound to a PID. When all three share the same PID, they interoperate automatically.',
    bindingDpLead:
      'DP (Data Point) is the data contract. DPs define every piece of data that flows between device and cloud — sensor readings, switch states, raw binary payloads, and more. The Agent reads and writes DPs to observe and control the device.',

    enableTitle: '1. Enable Agent Development',
    enableLead:
      'When you create a new TuyaOpen project in the IDE, you can optionally enable cloud Agent development. Not every project needs cloud capabilities — skip this for local-only firmware.',
    enableSteps: [
      'Create or open a TuyaOpen project',
      'On the project landing page, select Agent from the navigation bar',
      'Confirm you want to enable cloud IoT Agent features',
    ],
    enablePanelsTitle: 'Once enabled, the Agent development page shows four main panels:',
    enablePanels: [
      ['Product PID', 'View or change the product bound to this project'],
      ['Publish Status', 'Check Agent publish and deployment state'],
      ['DP Data Points', 'Define and manage the device-cloud data contract'],
      ['Agent Editor', 'Create, configure, and develop the Agent'],
    ],

    productTitle: '2. Create a Product',
    productLead:
      'Before developing an Agent, you need a cloud product. The product holds the DP model that both device firmware and Agent code share.',
    productMethodsTitle: 'You can create a product in two ways:',
    productAiTitle: 'AI-assisted (recommended)',
    productAiLead:
      'Describe your product to the IDE AI assistant. It creates the product and generates appropriate DP definitions automatically.',
    productAiSteps: [
      'Open the Agent page in your project',
      'In the IDE chat, type: "Create a smart temperature sensor product for me"',
      'The assistant creates the product, defines relevant DPs, and syncs them to your project',
    ],
    productManualTitle: 'Manual',
    productManualLead: 'Step through product configuration in the cloud console.',
    productManualSteps: [
      'On the Agent page, click Create Product',
      'Select a product category (e.g. Smart Home > Sensor)',
      'Enter a product name and description',
      'Choose the connection protocol',
      'Save to generate a PID',
    ],
    productResult: 'After creation, the PID appears in the Product PID panel.',

    dpTitle: '3. Define DP Data Points',
    dpLead:
      'DPs (Data Points) are the data contract between device firmware and the cloud. Every value the device reports, and every command the device receives, travels through a DP.',
    dpPropsTitle: 'Each DP has:',
    dpProps: [
      ['DPID', 'Numeric identifier (1–255)'],
      ['DPCode', 'Human-readable name (e.g. switch_1, temp_current)'],
      ['Type', 'Boolean, value, enum, string, raw, fault'],
      ['Constraints', 'Min/max values, step size, enum options'],
    ],
    dpWarning:
      'DPs are shared across device firmware, Tuya Cloud, and the Agent. Changing a DP definition without updating all three breaks communication. Always use the AI workflow for DP changes — it keeps all three layers in sync.',
    dpAiTitle: 'AI-assisted DP management',
    dpAiLead:
      'Use the IDE AI assistant to create, modify, or extend DP definitions. This is the recommended method because it validates DP format and constraints automatically, updates the cloud product model, generates matching device firmware code, and updates panel/app definitions.',
    dpExamplesTitle: 'Example prompts:',
    dpExamples: [
      'Add a boolean DP for a relay switch on channel 1',
      'Create a temperature reporting DP with range -40 to 125°C and 0.1°C precision',
      'Add a raw data DP for RGB LED strip control — 3 bytes, R G B',
      'Create a 3-gang switch with three boolean DPs',
    ],
    dpResult:
      'The assistant generates the DP definition in the cloud, updates your project config, and generates C code for the device firmware.',
    dpViewTitle: 'Viewing DPs',
    dpViewLead:
      'On the Agent page, the DP Data Points panel shows all DPs defined for the product PID. You can see the DPID, type, name, and current constraints.',
    dpControlTitle: 'DPs as the Agent control interface',
    dpControlLead:
      'The Agent uses DPs to both read and control the device. At inference time: the Agent receives all current DP values from the device, the LLM reasons about device state using those values, and the Agent can write DP values back to the device to execute actions. This is how an Agent performs device control — by reading and writing the DP contract.',

    developTitle: '4. Develop an Agent',
    developLead: 'You create an Agent in one of two modes:',
    developModes: [
      ['Agent mode', 'Single LLM with tools. Straightforward prompt-based development. Best for most device control use cases.'],
      ['Workflow mode', 'Multi-step orchestration with multiple models, intent recognition, and conditional logic. Best for complex voice assistants or multi-agent systems.'],
    ],
    developNewTitle: 'Create a new Agent',
    developNewSteps: [
      'On the Agent page, go to the Agent panel',
      'Click Create New Agent',
      'Enter a name and description for your Agent',
      'Select the mode: Agent or Workflow',
    ],
    developReuseTitle: 'Reuse an existing Agent',
    developReuseLead:
      'You can bind a previously published Agent to your product. This is useful when you want the same Agent logic across multiple device types.',
    developReuseSteps: [
      'On the Agent page, go to the Agent panel',
      'Click Select Existing Agent',
      'Choose from the list of published Agents',
    ],
    developReuseNote:
      'The selected Agent must be published before it can be bound to a product. Reuse works best when the DPCodes across products are compatible — an Agent written for a single switch may not work correctly on a 3-gang switch unless both use matching DPCodes.',
    developResult: 'After creation or selection, the Agent is bound to the product PID. You see the binding confirmation in the Agent panel.',

    agentModeTitle: '5. Agent Mode',
    agentModeLead:
      'Agent mode is the default and simplest development model. You configure a single LLM with a system prompt, tools, and capabilities.',
    agentModeOpenSteps: [
      'On the Agent page, click Develop Agent',
      'The Agent editor opens',
    ],
    agentModeConfigTitle: 'In Agent mode you configure:',
    agentModeConfig: [
      ['System prompt', 'Defines the Agent\'s persona, behavior, and knowledge'],
      ['Model selection', 'Choose the underlying LLM'],
      ['Tools', 'Enable MCP connectors, Skills, RAG, and device control'],
      ['Capabilities', 'Voice (ASR/TTS), vision, and more'],
    ],
    agentModeExampleTitle: 'Example system prompt for a thermostat Agent:',
    agentModeExample: `You are a thermostat control Agent. Monitor room temperature and humidity.
When temperature exceeds 26°C, turn on the cooler (switch_2 = true).
When temperature drops below 20°C, turn on the heater (switch_1 = true).
Always report the current temperature and humidity when asked.
Keep responses concise and helpful.`,
    agentModeNote:
      'The DP read/write tool is automatically available to every bound Agent — you do not need to add it explicitly.',

    workflowModeTitle: '6. Workflow Mode',
    workflowModeLead:
      'Workflow mode lets you build complex multi-step Agent systems. Use it when you need intent recognition, model chaining, conditional logic, or parallel execution.',
    workflowModeCapsTitle: 'Workflow mode capabilities:',
    workflowModeCaps: [
      'Intent recognition: Route user queries to different handlers based on intent',
      'Multi-model orchestration: Call different models for different tasks',
      'Conditional branches: Logic gates based on intermediate results',
      'Synchronous and parallel execution: Control execution flow',
    ],
    workflowModeLink: 'For full Workflow development reference, see: Workflow Management',

    publishTitle: '7. Publish and Bind',
    publishLead: 'After developing your Agent:',
    publishSteps: [
      'Click Publish in the Agent editor',
      'Select a version tag or use auto-versioning',
      'Wait for deployment to complete',
    ],
    publishResult:
      'Once published, the Agent is automatically bound to the product PID. Any device using that PID connects to your Agent.',

    bestPracticesTitle: 'Best Practices: Designing Good Agent-Enabled Devices',
    bestPracticesLead:
      'The most successful Agent-hardware products follow these principles:',
    bestPractices: [
      {
        title: 'DP-first design',
        desc: 'Define DPs that map to semantic device capabilities, not raw register values. An Agent understands target_temp better than register_0x12_value.',
      },
      {
        title: 'Human-readable DPCodes',
        desc: 'Use descriptive names (hvac_mode, not dp5). The LLM uses DPCode names to understand what each DP does.',
      },
      {
        title: 'State before action',
        desc: 'Give the Agent enough readable state to make good decisions. A thermostat Agent needs to know current temperature before it can decide to heat or cool.',
      },
      {
        title: 'Idempotent actions',
        desc: 'Device control DPs should be safe to write multiple times. The Agent may retry DP writes on network failure.',
      },
      {
        title: 'Think about modality',
        desc: 'Does this device need voice? Vision? Both? Match your Agent mode and hardware capabilities to the use case.',
      },
    ],
    bestPracticesLink: 'For deeper product design guidance, see: Agent-First Hardware Concepts',

    seeAlsoTitle: 'See Also',
    seeAlso: [
      { label: 'TuyaOpenClaw Quick Start (T5-AI)', href: '/docs/duckyclaw/ducky-quick-start-T5AI' },
      { label: 'Hardware Skill Development', href: '/docs/duckyclaw/hardware-skill' },
      { label: 'Custom Device MCP', href: '/docs/duckyclaw/custom-device-mcp' },
    ],
  },
  zh: {
    badge: 'TuyaOpen IDE',
    title: 'TuyaOpen IDE Agent 开发指南',
    subtitle:
      '使用 TuyaOpen IDE 进行端到端的开发、部署和绑定 TuyaOpen IoT 智能体的完整工作流。',
    meta: ['入门', '15 分钟', 'IDE'],
    nav: [
      { id: 'overview', label: '概述' },
      { id: 'architecture', label: '架构原理' },
      { id: 'enable', label: '启用 Agent' },
      { id: 'product', label: '创建产品' },
      { id: 'dp', label: '定义 DP' },
      { id: 'develop', label: '开发智能体' },
      { id: 'agent-mode', label: '智能体模式' },
      { id: 'workflow-mode', label: '工作流模式' },
      { id: 'publish', label: '发布绑定' },
      { id: 'best-practices', label: '最佳实践' },
    ],
    overviewTitle: '概述',
    overviewLead:
      'TuyaOpen IDE 将 Tuya IoT 硬件与云端 AI 能力连接起来。您只需开发并部署一次 Agent，然后通过唯一的产品 ID (PID) 将其绑定到一个或多个设备。设备使用标准化的数据点 (DP) 向 Agent 发送遥测数据并接收控制命令。',
    overviewPoints: [
      '设备-云端-Agent 架构的工作原理',
      '在 IDE 中创建和定义产品',
      '使用 AI 辅助管理 DP 定义',
      '开发和发布 Agent',
      '将 Agent 绑定到产品',
    ],
    overviewTip:
      'TuyaOpen IDE 支持所有硬件平台（T5AI-Core、ESP32S3、BK7231X、Raspberry Pi 等）。IDE 中的 Agent 开发流程与平台无关。',

    architectureTitle: '工作原理',
    architectureLead: 'TuyaOpen IDE 系统采用三层绑定模型。所有数据都通过这个架构一致地流动。',
    bindingTitle: '绑定原理',
    bindingLead:
      '产品 ID (PID) 是贯穿三层的唯一绑定标识符。每个设备都有硬件 PID。每个云端产品都有 PID。每个 Agent 都绑定到一个 PID。当三者共享同一个 PID 时，它们会自动互通。',
    bindingDpLead:
      'DP（数据点）是数据契约。DP 定义了设备与云端之间流动的每一条数据——传感器读数、开关状态、原始二进制有效载荷等。Agent 通过读写 DP 来观察和控制设备。',

    enableTitle: '1. 启用 Agent 开发',
    enableLead:
      '在 IDE 中创建新的 TuyaOpen 项目时，您可以选择启用云端 Agent 开发。并非每个项目都需要云端能力——纯本地固件可以跳过此步骤。',
    enableSteps: [
      '创建或打开一个 TuyaOpen 项目',
      '在项目落地页，从导航栏选择 Agent',
      '确认启用云端 IoT Agent 功能',
    ],
    enablePanelsTitle: '启用后，Agent 开发页面显示四个主要面板：',
    enablePanels: [
      ['产品 PID', '查看或更改绑定到此项目的产品'],
      ['发布状态', '检查 Agent 发布和部署状态'],
      ['DP 数据点', '定义和管理设备-云端数据契约'],
      ['Agent 开发区域', '创建、配置和开发 Agent'],
    ],

    productTitle: '2. 创建产品',
    productLead:
      '开发 Agent 之前，您需要一个云端产品。产品持有设备固件和 Agent 代码共享的 DP 模型。',
    productMethodsTitle: '您可以通过两种方式创建产品：',
    productAiTitle: 'AI 辅助（推荐）',
    productAiLead:
      '向 IDE AI 助手描述您的产品。它会自动创建产品并生成相应的 DP 定义。',
    productAiSteps: [
      '在项目中打开 Agent 页面',
      '在 IDE 聊天中输入："帮我创建一个智能温湿度传感器产品"',
      '助手创建产品、定义相关 DP，并将它们同步到您的项目',
    ],
    productManualTitle: '手动创建',
    productManualLead: '在云控制台中逐步完成产品配置。',
    productManualSteps: [
      '在 Agent 页面，点击创建产品',
      '选择产品类别（例如 智能家居 > 传感器）',
      '输入产品名称和描述',
      '选择连接协议',
      '保存以生成 PID',
    ],
    productResult: '创建后，PID 会出现在产品 PID 面板中。',

    dpTitle: '3. 定义 DP 数据点',
    dpLead:
      'DP（数据点）是设备固件与云端之间的数据契约。设备报告的每一个值、设备接收的每一条命令，都通过 DP 传输。',
    dpPropsTitle: '每个 DP 都有：',
    dpProps: [
      ['DPID', '数字标识符（1–255）'],
      ['DPCode', '可读名称（例如 switch_1、temp_current）'],
      ['类型', '布尔型、数值型、枚举型、字符串、原始型、故障型'],
      ['约束', '最小/最大值、步长、枚举选项'],
    ],
    dpWarning:
      'DP 在设备固件、涂鸦云和 Agent 之间共享。不更新所有三者就更改 DP 定义会破坏通信。始终使用 AI 工作流进行 DP 更改——它会保持所有三层同步。',
    dpAiTitle: 'AI 辅助 DP 管理',
    dpAiLead:
      '使用 IDE AI 助手创建、修改或扩展 DP 定义。这是推荐的方法，因为它自动验证 DP 格式和约束、更新云端产品模型、生成匹配的设备固件代码、并更新面板/应用定义。',
    dpExamplesTitle: '示例提示：',
    dpExamples: [
      '帮我添加一个通道 1 继电器开关的布尔 DP',
      '创建一个温度上报 DP，范围 -40 到 125°C，精度 0.1°C',
      '添加一个 RGB 灯带控制的原始数据 DP——3 字节，R G B',
      '创建一个三路开关，带三个布尔 DP',
    ],
    dpResult:
      '助手会在云端生成 DP 定义，更新您的项目配置，并为设备固件生成 C 代码。',
    dpViewTitle: '查看 DP',
    dpViewLead:
      '在 Agent 页面，DP 数据点面板显示为产品 PID 定义的所有 DP。您可以看到 DPID、类型、名称和当前约束。',
    dpControlTitle: 'DP 作为 Agent 控制接口',
    dpControlLead:
      'Agent 使用 DP 来读取和控制设备。推理时：Agent 从设备接收所有当前 DP 值，LLM 使用这些值推理设备状态，Agent 可以将 DP 值写回设备以执行动作。这就是 Agent 执行设备控制的方式——通过读写 DP 契约。',

    developTitle: '4. 开发 Agent',
    developLead: '您可以在两种模式之一中创建 Agent：',
    developModes: [
      ['智能体模式', '带工具的单个 LLM。简单直接的基于提示的开发。适用于大多数设备控制场景。'],
      ['工作流模式', '带有多模型编排、意图识别和条件逻辑的多步系统。适用于复杂的语音助手或多智能体系统。'],
    ],
    developNewTitle: '创建新 Agent',
    developNewSteps: [
      '在 Agent 页面，进入 Agent 面板',
      '点击新建智能体',
      '输入 Agent 的名称和描述',
      '选择模式：智能体或工作流',
    ],
    developReuseTitle: '复用现有 Agent',
    developReuseLead:
      '您可以将先前发布的 Agent 绑定到您的产品。当您希望相同的 Agent 逻辑跨多种设备类型工作时，这很有用。',
    developReuseSteps: [
      '在 Agent 页面，进入 Agent 面板',
      '点击选择已有智能体',
      '从已发布的 Agent 列表中选择',
    ],
    developReuseNote:
      '所选的 Agent 必须已发布才能绑定到产品。当产品之间的 DPCode 兼容时，复用效果最好——为单开关编写的 Agent 可能无法在三档开关上正常工作，除非两者使用匹配的 DPCode。',
    developResult: '创建或选择后，Agent 会绑定到产品 PID。您会在 Agent 面板中看到绑定确认。',

    agentModeTitle: '5. 智能体模式',
    agentModeLead:
      '智能体模式是默认且最简单的开发模型。您配置一个带有系统提示、工具和能力的单个 LLM。',
    agentModeOpenSteps: [
      '在 Agent 页面，点击开发智能体',
      'Agent 编辑器打开',
    ],
    agentModeConfigTitle: '在智能体模式下，您配置：',
    agentModeConfig: [
      ['系统提示', '定义 Agent 的角色、行为和知识'],
      ['模型选择', '选择底层 LLM'],
      ['工具', '启用 MCP 连接器、技能、RAG 和设备控制'],
      ['能力', '语音（ASR/TTS）、视觉等'],
    ],
    agentModeExampleTitle: '恒温器 Agent 的示例系统提示：',
    agentModeExample: `你是一个恒温控制 Agent。监控室温和湿度。
当温度超过 26°C 时，打开制冷器（switch_2 = true）。
当温度低于 20°C 时，打开加热器（switch_1 = true）。
被询问时始终报告当前温度和湿度。
保持回复简洁和有帮助。`,
    agentModeNote:
      'DP 读写工具自动对每个绑定的 Agent 可用——您不需要显式添加它。',

    workflowModeTitle: '6. 工作流模式',
    workflowModeLead:
      '工作流模式让您构建复杂的多步 Agent 系统。当您需要意图识别、模型链、条件逻辑或并行执行时使用它。',
    workflowModeCapsTitle: '工作流模式能力：',
    workflowModeCaps: [
      '意图识别：根据意图将用户查询路由到不同的处理程序',
      '多模型编排：为不同任务调用不同模型',
      '条件分支：基于中间结果的逻辑门',
      '同步和并行执行：控制执行流程',
    ],
    workflowModeLink: '完整的工作流开发参考，请参阅：工作流管理',

    publishTitle: '7. 发布和绑定',
    publishLead: '开发完 Agent 后：',
    publishSteps: [
      '在 Agent 编辑器中点击发布',
      '选择版本标签或使用自动版本控制',
      '等待部署完成',
    ],
    publishResult:
      '发布后，Agent 会自动绑定到产品 PID。任何使用该 PID 的设备都会连接到您的 Agent。',

    bestPracticesTitle: '最佳实践：设计优秀的 Agent 赋能设备',
    bestPracticesLead:
      '最成功的 Agent-硬件产品遵循以下原则：',
    bestPractices: [
      {
        title: 'DP 优先设计',
        desc: '定义映射到语义设备能力的 DP，而不是原始寄存器值。Agent 理解 target_temp 比理解 register_0x12_value 更好。',
      },
      {
        title: '人类可读的 DPCode',
        desc: '使用描述性名称（hvac_mode，而不是 dp5）。LLM 使用 DPCode 名称来理解每个 DP 的作用。',
      },
      {
        title: '先状态后动作',
        desc: '给 Agent 足够的可读状态以做出好决策。恒温器 Agent 需要知道当前温度才能决定加热或冷却。',
      },
      {
        title: '幂等动作',
        desc: '设备控制 DP 应该可以安全地多次写入。网络故障时 Agent 可能会重试 DP 写入。',
      },
      {
        title: '考虑模态',
        desc: '这个设备需要语音吗？视觉？两者都需要？让您的 Agent 模式和硬件能力与用例匹配。',
      },
    ],
    bestPracticesLink: '更深入的产品设计指导，请参阅：Agent-First 硬件概念',

    seeAlsoTitle: '另请参阅',
    seeAlso: [
      { label: 'TuyaOpenClaw 快速开始（T5-AI）', href: '/zh/docs/duckyclaw/ducky-quick-start-T5AI' },
      { label: '硬件技能开发', href: '/zh/docs/duckyclaw/hardware-skill' },
      { label: '自定义设备 MCP', href: '/zh/docs/duckyclaw/custom-device-mcp' },
    ],
  },
};

export default function TuyaOpenIdeAgentDev() {
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale === 'zh' ? 'zh' : 'en';
  const c = content[locale];
    return (
    <TutorialShell badge={c.badge} title={c.title} subtitle={c.subtitle} meta={c.meta} nav={c.nav}>
      {/* Overview */}
      <section id="overview" className={shell.block}>
        <h2 className={shell.h2}>{c.overviewTitle}</h2>
        <p className={shell.lead}>{c.overviewLead}</p>
        <ul className={shell.checkList}>
          {c.overviewPoints.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
        <div className={clsx(shell.callout, shell.calloutTip)}>
          <p>{c.overviewTip}</p>
        </div>
      </section>

      {/* Architecture */}
      <section id="architecture" className={shell.block}>
        <h2 className={shell.h2}>{c.architectureTitle}</h2>
        <p className={shell.lead}>{c.architectureLead}</p>
        <pre className={shell.codeBlock} style={{ textAlign: 'center', fontWeight: 600 }}>
          <code>{`┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│   Device PID    │◄───────►│   Tuya Cloud    │◄───────►│    AI Agent     │
│  Hardware Code  │ DP API  │ Product + DPs   │ LLM     │ Skills / MCP   │
│                 │  Sync   │                 │ Call    │   Workflows     │
└─────────────────┘         └─────────────────┘         └─────────────────┘`}</code>
        </pre>
        <h3 className={shell.h3}>{c.bindingTitle}</h3>
        <p>{c.bindingLead}</p>
        <p>{c.bindingDpLead}</p>
        <p>
          <img
            src="https://picgocloud.com/m/200ce5b2-2e15-47ff-85bd-34e955018cff.png"
            alt="End-to-end Agent binding architecture"
            style={{ width: '100%', borderRadius: '8px', margin: '1rem 0' }}
          />
        </p>
      </section>

      {/* Enable */}
      <section id="enable" className={shell.block}>
        <h2 className={shell.h2}>{c.enableTitle}</h2>
        <p className={shell.lead}>{c.enableLead}</p>
        <ol className={shell.steps}>
          {c.enableSteps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
        <p>
          <img
            src="https://picgocloud.com/m/0e082b7f-9fc4-4696-8eb4-efe910162c1b.png"
            alt="IDE Agent development page"
            style={{ width: '100%', borderRadius: '8px', margin: '1rem 0' }}
          />
        </p>
        <p>{c.enablePanelsTitle}</p>
        <table className={shell.table}>
          <thead>
            <tr>
              <th>Panel</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            {c.enablePanels.map(([label, desc], i) => (
              <tr key={i}>
                <td><strong>{label}</strong></td>
                <td>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          <img
            src="https://picgocloud.com/m/1f6b76f2-b234-41c1-b48b-4d73a1fa7baf.png"
            alt="Page components overview"
            style={{ width: '100%', borderRadius: '8px', margin: '1rem 0' }}
          />
        </p>
      </section>

      {/* Product */}
      <section id="product" className={shell.block}>
        <h2 className={shell.h2}>{c.productTitle}</h2>
        <p className={shell.lead}>{c.productLead}</p>
        <h3 className={shell.h3}>{c.productMethodsTitle}</h3>

        <h4 className={shell.h4}>{c.productAiTitle}</h4>
        <p>{c.productAiLead}</p>
        <ol className={shell.steps}>
          {c.productAiSteps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>

        <h4 className={shell.h4}>{c.productManualTitle}</h4>
        <p>{c.productManualLead}</p>
        <ol className={shell.steps}>
          {c.productManualSteps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>

        <p>
          <img
            src="https://picgocloud.com/m/6aac633b-235a-4a69-b8e0-fd58424e44a5.png"
            alt="Product creation UI"
            style={{ width: '100%', borderRadius: '8px', margin: '1rem 0' }}
          />
        </p>
        <div className={clsx(shell.callout, shell.calloutInfo)}>
          <p>{c.productResult}</p>
        </div>
      </section>

      {/* DP */}
      <section id="dp" className={shell.block}>
        <h2 className={shell.h2}>{c.dpTitle}</h2>
        <p className={shell.lead}>{c.dpLead}</p>
        <h3 className={shell.h3}>{c.dpPropsTitle}</h3>
        <table className={shell.table}>
          <thead>
            <tr>
              <th>Property</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {c.dpProps.map(([label, desc], i) => (
              <tr key={i}>
                <td><strong>{label}</strong></td>
                <td>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={clsx(shell.callout, shell.calloutWarning)}>
          <p>{c.dpWarning}</p>
        </div>
        <h3 className={shell.h3}>{c.dpAiTitle}</h3>
        <p>{c.dpAiLead}</p>
        <p>{c.dpExamplesTitle}</p>
        <pre className={shell.codeBlock}>
          <code>{c.dpExamples.map((e, i) => `${i + 1}. ${e}`).join('\n')}</code>
        </pre>
        <div className={clsx(shell.callout, shell.calloutInfo)}>
          <p>{c.dpResult}</p>
        </div>
        <h3 className={shell.h3}>{c.dpViewTitle}</h3>
        <p>{c.dpViewLead}</p>
        <p>
          <img
            src="https://picgocloud.com/m/1376d68d-2934-44cb-a4bf-16d49adb28c6.png"
            alt="DP list example"
            style={{ width: '100%', borderRadius: '8px', margin: '1rem 0' }}
          />
        </p>
        <h3 className={shell.h3}>{c.dpControlTitle}</h3>
        <p>{c.dpControlLead}</p>
      </section>

      {/* Develop */}
      <section id="develop" className={shell.block}>
        <h2 className={shell.h2}>{c.developTitle}</h2>
        <p className={shell.lead}>{c.developLead}</p>
        <table className={shell.table}>
          <thead>
            <tr>
              <th>Mode</th>
              <th>Use case</th>
            </tr>
          </thead>
          <tbody>
            {c.developModes.map(([label, desc], i) => (
              <tr key={i}>
                <td><strong>{label}</strong></td>
                <td>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className={shell.h3}>{c.developNewTitle}</h3>
        <ol className={shell.steps}>
          {c.developNewSteps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
        <p>
          <img
            src="https://picgocloud.com/m/d5bc842d-b5ca-4daa-b16f-64573adb6873.png"
            alt="Create new Agent UI"
            style={{ width: '100%', borderRadius: '8px', margin: '1rem 0' }}
          />
        </p>

        <h3 className={shell.h3}>{c.developReuseTitle}</h3>
        <p>{c.developReuseLead}</p>
        <ol className={shell.steps}>
          {c.developReuseSteps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
        <p>
          <img
            src="https://picgocloud.com/m/160dc4fc-5502-4795-9a27-9fae7b58497a.png"
            alt="Select existing Agent UI"
            style={{ width: '100%', borderRadius: '8px', margin: '1rem 0' }}
          />
        </p>
        <div className={clsx(shell.callout, shell.calloutNote)}>
          <p>{c.developReuseNote}</p>
        </div>
        <p>
          <img
            src="https://picgocloud.com/m/6bbf731c-bc2b-4d30-8818-a773358672f3.png"
            alt="Agent bound successfully"
            style={{ width: '100%', borderRadius: '8px', margin: '1rem 0' }}
          />
        </p>
        <div className={clsx(shell.callout, shell.calloutInfo)}>
          <p>{c.developResult}</p>
        </div>
      </section>

      {/* Agent Mode */}
      <section id="agent-mode" className={shell.block}>
        <h2 className={shell.h2}>{c.agentModeTitle}</h2>
        <p className={shell.lead}>{c.agentModeLead}</p>
        <ol className={shell.steps}>
          {c.agentModeOpenSteps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
        <p>
          <img
            src="https://picgocloud.com/m/95740f0d-0974-476a-a0c9-aa892d847782.png"
            alt="Agent editor UI"
            style={{ width: '100%', borderRadius: '8px', margin: '1rem 0' }}
          />
        </p>
        <h3 className={shell.h3}>{c.agentModeConfigTitle}</h3>
        <table className={shell.table}>
          <thead>
            <tr>
              <th>Config</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {c.agentModeConfig.map(([label, desc], i) => (
              <tr key={i}>
                <td><strong>{label}</strong></td>
                <td>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          <img
            src="https://picgocloud.com/m/0b0de463-ad30-4685-a51a-50cc30cab1b6.png"
            alt="Agent mode configuration"
            style={{ width: '100%', borderRadius: '8px', margin: '1rem 0' }}
          />
        </p>
        <h4 className={shell.h4}>{c.agentModeExampleTitle}</h4>
        <pre className={shell.codeBlock}>
          <code>{c.agentModeExample}</code>
        </pre>
        <div className={clsx(shell.callout, shell.calloutNote)}>
          <p>{c.agentModeNote}</p>
        </div>
      </section>

      {/* Workflow Mode */}
      <section id="workflow-mode" className={shell.block}>
        <h2 className={shell.h2}>{c.workflowModeTitle}</h2>
        <p className={shell.lead}>{c.workflowModeLead}</p>
        <h3 className={shell.h3}>{c.workflowModeCapsTitle}</h3>
        <ul className={shell.checkList}>
          {c.workflowModeCaps.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
        <p>
          <img
            src="https://picgocloud.com/m/b4458a15-ec49-46b1-8447-b7df4b2d0d6f.png"
            alt="Workflow editor UI"
            style={{ width: '100%', borderRadius: '8px', margin: '1rem 0' }}
          />
        </p>
        <div className={clsx(shell.callout, shell.calloutInfo)}>
          <p>{c.workflowModeLink}</p>
        </div>
      </section>

      {/* Publish */}
      <section id="publish" className={shell.block}>
        <h2 className={shell.h2}>{c.publishTitle}</h2>
        <p className={shell.lead}>{c.publishLead}</p>
        <ol className={shell.steps}>
          {c.publishSteps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
        <div className={clsx(shell.callout, shell.calloutSuccess)}>
          <p>{c.publishResult}</p>
        </div>
      </section>

      {/* Best Practices */}
      <section id="best-practices" className={shell.block}>
        <h2 className={shell.h2}>{c.bestPracticesTitle}</h2>
        <p className={shell.lead}>{c.bestPracticesLead}</p>
        {c.bestPractices.map((bp, i) => (
          <div key={i} style={{ marginBottom: '1rem' }}>
            <h4 className={shell.h4}>{bp.title}</h4>
            <p>{bp.desc}</p>
          </div>
        ))}
        <div className={clsx(shell.callout, shell.calloutInfo)}>
          <p>{c.bestPracticesLink}</p>
        </div>
      </section>

      {/* See Also */}
      <section className={shell.block}>
        <h2 className={shell.h2}>{c.seeAlsoTitle}</h2>
        <ul className={shell.checkList}>
          {c.seeAlso.map((item, i) => (
            <li key={i}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </section>
    </TutorialShell>
  );
}
