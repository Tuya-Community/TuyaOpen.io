/* =========================================================================
 * Docs portal content — the map behind /documentation.
 *
 * Mirrors the five sidebars declared in sidebars.js (sdk / hardware / cloud /
 * tclaw / tyutool). Every `id` here is a doc id from that file, so a link
 * that breaks means a doc moved; keep the two in step.
 *
 * Groups are ordered the way someone actually walks a product: what it is,
 * then how to build with it, then how to ship it.
 * ========================================================================= */

/**
 * Pointer to the quick-start mainlines, which live on /learn.
 *
 * The nine-step funnel used to be laid out here too. It isn't any more: /learn
 * now owns both onboarding routes (IDE and SDK), and having the steps in two
 * places invited them to drift apart. This page sends you there instead.
 */
export const quickStartPointer = {
  to: '/learn',
  en: {
    kicker: 'Getting started',
    title: 'Two quick-start tracks',
    blurb:
      'The Learn hub carries two complete tracks, each running from environment setup through to a paired device: the graphical TuyaOpen IDE workflow, or the SDK with tos.py on the command line.',
    cta: 'Go to the Learn hub',
  },
  zh: {
    kicker: '入门路径',
    title: '两条快速上手主线',
    blurb:
      '学习中心提供两条完整主线，均覆盖从环境准备到设备配网的全过程：TuyaOpen IDE 图形化流程，或 SDK 与 tos.py 命令行流程。',
    cta: '前往学习中心',
  },
}

/** The five documentation areas surfaced from the navbar "Docs" menu. */
export const areas = [
  {
    key: 'sdk',
    accent: '#7c5cff',
    en: {
      name: 'TuyaOpen SDK',
      tagline: 'Cross-platform C/C++ SDK',
      blurb: 'C SDK, platform APIs and the build system. Start here if you are writing device firmware.',
    },
    zh: {
      name: 'TuyaOpen SDK',
      tagline: '跨平台 C/C++ SDK',
      blurb: 'C SDK、平台 API 与构建系统。写设备固件从这里开始。',
    },
    entry: 'about-tuyaopen',
    groups: [
      {
        en: 'Understand the SDK',
        zh: '了解 SDK',
        links: [
          { id: 'about-tuyaopen', en: 'About TuyaOpen', zh: 'TuyaOpen 简介' },
          { id: 'project-walkthrough', en: 'Project walkthrough', zh: '工程结构导读' },
          { id: 'advanced-use/terminologies', en: 'Terminology', zh: '术语表' },
          { id: 'maintenance-and-releases', en: 'Releases & maintenance', zh: '版本与维护' },
        ],
      },
      {
        en: 'Embedded programming',
        zh: '嵌入式编程',
        // Category index pages, not single tutorials. A label that names a
        // whole topic has to land on that topic — pointing "Networking" at one
        // Wi-Fi Station page hid the other four. These slugs come from the
        // `index()` categories in sidebars.js; keep the two in step.
        links: [
          { id: '/docs/category/networking', en: 'Networking', zh: '网络' },
          { id: '/docs/category/graphics', en: 'Graphics', zh: '图形' },
          { id: '/docs/category/audio', en: 'Audio', zh: '音频' },
          { id: '/docs/category/peripherals', en: 'Peripherals', zh: '外设' },
          { id: '/docs/category/hardware-interfaces', en: 'Hardware interfaces', zh: '硬件接口' },
          { id: '/docs/category/system-programming', en: 'System programming', zh: '系统编程' },
          { id: '/docs/category/memory-storage', en: 'Memory & storage', zh: '存储' },
          { id: 'examples/demo-generic-examples', en: 'Examples', zh: '示例工程' },
        ],
      },
      {
        en: 'Build & tools',
        zh: '构建与工具',
        links: [
          { id: 'tos-tools/tos-guide', en: 'tos.py guide', zh: 'tos.py 指南' },
          { id: 'tos-tools/tos-idf-reference', en: 'tos.py reference', zh: 'tos.py 命令参考' },
          { id: 'build-system/compilation-guide', en: 'Compilation guide', zh: '编译指南' },
          {
            id: 'build-system/cmake-kconfig-and-components',
            en: 'CMake, Kconfig & components',
            zh: 'CMake / Kconfig / 组件',
          },
        ],
      },
      {
        en: 'Help & contributing',
        zh: '帮助与贡献',
        links: [
          { id: 'faqs/faqs', en: 'FAQs', zh: '常见问题' },
          { id: 'faqs/get-developer-license', en: 'Get a developer license', zh: '获取开发者授权码' },
          { id: 'contribute/contribute-guide', en: 'Contribute guide', zh: '贡献指南' },
          { id: 'contribute/coding-style-guide', en: 'Coding style', zh: '编码规范' },
        ],
      },
    ],
  },

  {
    key: 'ide',
    accent: '#a855f7',
    // The IDE has no /docs sidebar — its material is the tutorial series on
    // /learn plus the product page. Linked as-is rather than stubbed into
    // /docs, so there is one copy of each page and no redirect to maintain.
    external: true,
    en: {
      name: 'TuyaOpen IDE',
      tagline: 'Firmware, cloud and app in one',
      blurb: 'Board catalogue, one-click build and flash, and an AI agent that writes alongside you.',
    },
    zh: {
      name: 'TuyaOpen IDE',
      tagline: '固件 / 云端 Agent / 面板 App 三端合一',
      blurb: '开发板目录、一键编译烧录，以及能陪你写代码的 AI Agent。',
    },
    entry: '/tuyaopen-ide',
    groups: [
      {
        en: 'Get going',
        zh: '开始使用',
        links: [
          { id: '/tuyaopen-ide', en: 'What the IDE offers', zh: 'IDE 能力总览' },
          { id: '/learn/tuyaopen-ide-overview', en: 'What TuyaOpen IDE is', zh: 'TuyaOpen IDE 是什么' },
          { id: '/learn/tuyaopen-ide-install', en: 'Install the IDE', zh: '安装 TuyaOpen IDE' },
        ],
      },
      {
        en: 'Practice series',
        zh: '实战系列',
        links: [
          { id: '/learn/tuyaopen-ide-practice-1', en: 'Practice 1 — Hello World', zh: '实战一 —— Hello World' },
          { id: '/learn/tuyaopen-ide-practice-2', en: 'Practice 2 — your_chat_bot', zh: '实战二 —— your_chat_bot' },
          { id: '/learn/tuyaopen-ide-practice-3', en: 'Practice 3 — mini app panel', zh: '实战三 —— 小程序面板' },
          {
            id: '/learn/tuyaopen-ide-practice-4',
            en: 'Practice 4 — Hello World on Linux',
            zh: '实战四 —— Linux 板 Hello World',
          },
        ],
      },
      {
        en: 'Build with the agent',
        zh: '用 Agent 开发',
        links: [
          { id: '/learn/tuyaopen-ide-vibe-coding', en: 'Vibe Coding skills', zh: 'Vibe Coding 技能' },
          { id: '/learn/tuyaopen-ide-agent-dev', en: 'Agent development guide', zh: 'Agent 开发指南' },
        ],
      },
    ],
  },

  {
    key: 'hardware',
    accent: '#ff6b35',
    en: {
      name: 'Hardware',
      tagline: 'T2, T3, T5AI, ESP32, Raspberry Pi',
      blurb: 'Supported silicon, pin maps and everything needed to bring a new board up on TuyaOpen.',
    },
    zh: {
      name: 'Hardware',
      tagline: 'T2 / T3 / T5AI / ESP32 / 树莓派',
      blurb: '已支持的芯片与开发板、引脚映射，以及把新硬件适配到 TuyaOpen 的完整流程。',
    },
    entry: 'hardware',
    groups: [
      {
        en: 'Boards & chips',
        zh: '开发板与芯片',
        links: [
          // Not a doc — the catalogue page, which is where most people should
          // start in this area. Whole path, so hrefFor() leaves it alone.
          { id: '/dev-boards', en: 'Dev board catalogue', zh: '开发板目录' },
          { id: '/docs/category/tuya-t5', en: 'Tuya T5', zh: '涂鸦 T5' },
          { id: 'hardware/tuya-t2/overview-t2', en: 'Tuya T2', zh: '涂鸦 T2' },
          { id: 'hardware/tuya-t3/overview-t3', en: 'Tuya T3', zh: '涂鸦 T3' },
          { id: 'hardware/espressif/overview-esp32', en: 'Espressif ESP32', zh: '乐鑫 ESP32' },
          {
            id: 'hardware/espressif/esp32-supported-features',
            en: 'ESP32 supported features',
            zh: 'ESP32 功能支持情况',
          },
        ],
      },
      {
        en: 'Arduino IDE',
        zh: 'Arduino IDE',
        links: [
          { id: 'hardware/tuya-t5/develop-with-Arduino/Introduction', en: 'Introduction', zh: '概述' },
          { id: 'hardware/tuya-t5/develop-with-Arduino/Quick_start', en: 'Quick start', zh: '快速上手' },
          {
            id: 'hardware/tuya-t5/develop-with-Arduino/AI_API_Development',
            en: 'AI API development',
            zh: 'AI API 开发',
          },
          { id: 'hardware/tuya-t5/develop-with-Arduino/Arduino_Library', en: 'Arduino library', zh: 'Arduino 库' },
        ],
      },
      {
        en: 'Bring up new hardware',
        zh: '适配新硬件',
        links: [
          {
            id: 'hardware/porting/bring-your-chip-to-tuyaopen',
            en: 'Bring your chip to TuyaOpen',
            zh: '把你的芯片接入 TuyaOpen',
          },
          { id: 'hardware/porting/new-platform', en: 'New platform', zh: '新建平台' },
          { id: 'hardware/porting/porting-platform', en: 'Porting a platform', zh: '平台移植' },
          { id: 'hardware/porting/new-board', en: 'New board', zh: '新建开发板' },
          { id: 'hardware/porting/new-project', en: 'New project', zh: '新建工程' },
        ],
      },
    ],
  },

  {
    key: 'cloud',
    accent: '#0ea5e9',
    en: {
      name: 'Cloud & AI',
      tagline: 'Cloud connection, AI agents, OpenAPI',
      blurb: 'Bind devices to Tuya Cloud, then build on-device AI agents — audio, video, skills and MCP.',
    },
    zh: {
      name: 'Cloud & AI',
      tagline: '设备上云、AI Agent 与 OpenAPI',
      blurb: '把设备接入涂鸦云，再构建端侧 AI Agent——音频、视频、技能与 MCP。',
    },
    entry: 'cloud/overview',
    groups: [
      {
        en: 'Connect to Tuya Cloud',
        zh: '接入涂鸦云',
        links: [
          { id: 'cloud/overview', en: 'Overview', zh: '总览' },
          { id: 'cloud/tuya-cloud/creating-new-product', en: 'Create a product', zh: '创建产品' },
          { id: 'cloud/tuya-cloud/device-cloud-binding', en: 'Bind a device', zh: '设备绑定上云' },
          { id: 'cloud/iot-client/tuya-iot-client-reference', en: 'IoT client reference', zh: 'IoT Client 参考' },
          { id: 'cloud/iot-client/demo-tuya-iot-light', en: 'Demo: IoT light', zh: '示例：智能灯' },
        ],
      },
      {
        en: 'On-device AI agent',
        zh: '端侧 AI Agent',
        links: [
          {
            id: 'cloud/device-ai/concepts/agentic-first-hardware',
            en: 'Agentic-first hardware',
            zh: 'Agent 优先的硬件设计',
          },
          { id: 'cloud/device-ai/concepts/voice-first-design', en: 'Voice-first design', zh: '语音优先设计' },
          { id: 'cloud/device-ai/ai-components/ai-components', en: 'AI components', zh: 'AI 组件总览' },
          { id: 'cloud/device-ai/ai-components/ai-agent', en: 'Agent & skills', zh: 'Agent 与技能' },
          { id: 'cloud/device-ai/multimodal-data-flow', en: 'Multimodal data flow', zh: '多模态数据流' },
          { id: 'cloud/device-ai/ai-components/ai-mode-manage', en: 'Voice chat modes', zh: '语音交互模式' },
        ],
      },
      {
        en: 'MCP & UI',
        zh: 'MCP 与界面',
        links: [
          {
            id: 'cloud/device-ai/concepts/designing-device-mcp-tools',
            en: 'Designing device MCP tools',
            zh: '设计设备 MCP 工具',
          },
          { id: 'cloud/device-ai/ai-components/ai-mcp-server', en: 'Expose MCP on the device', zh: '设备端暴露 MCP' },
          { id: 'cloud/device-ai/ai-components/ai-ui-manage', en: 'On-device chat UIs', zh: '端侧对话界面' },
        ],
      },
      {
        en: 'Demos',
        zh: '完整示例',
        links: [
          { id: 'cloud/device-ai/demo-your-chat-bot', en: 'your_chat_bot', zh: 'your_chat_bot' },
          { id: 'cloud/device-ai/demo-duo-eyes-mood', en: 'Duo eyes & mood', zh: 'Duo 表情与情绪' },
          { id: 'cloud/device-ai/concepts/real-world-use-cases', en: 'Real-world use cases', zh: '真实场景案例' },
        ],
      },
    ],
  },

  {
    key: 'tclaw',
    accent: '#f59e0b',
    // Renamed from TuyaOpenClaw in #258. The doc ids moved duckyclaw/ ->
    // tclaw/ but kept their DuckyClaw-* filenames, which is why those two ids
    // still read oddly against their titles.
    en: {
      name: 'TClaw',
      tagline: 'Edge-AI voice agent on the board',
      blurb: 'Run an agent on the board and give it real device tools through MCP.',
    },
    zh: {
      name: 'TClaw',
      tagline: '板上运行的端侧语音 Agent',
      blurb: '让 Agent 跑在开发板上，通过 MCP 调用真实的设备能力。',
    },
    entry: '/tclaw',
    groups: [
      {
        en: 'Quick start',
        zh: '快速开始',
        links: [
          { id: 'tclaw/ducky-quick-start-T5AI', en: 'TClaw with T5AI', zh: 'TClaw 与 T5-AI' },
          {
            id: 'tclaw/ducky-quick-start-raspberry-pi-5',
            en: 'TClaw with Raspberry Pi 5',
            zh: 'TClaw 与 Raspberry Pi 5',
          },
          { id: 'tclaw/ducky-quick-start-ESP32S3', en: 'TClaw with ESP32-S3', zh: 'TClaw 与 ESP32-S3' },
        ],
      },
      {
        en: 'Extend it',
        zh: '扩展能力',
        links: [
          { id: 'tclaw/custom-device-mcp', en: 'Custom device MCP', zh: '自定义设备 MCP' },
          { id: 'tclaw/hardware-skill', en: 'Hardware peripheral skills', zh: '硬件外设技能' },
        ],
      },
      {
        en: 'Connect it',
        zh: '对接',
        links: [
          { id: 'tclaw/DuckyClaw-OpenClaw', en: 'Connect TClaw to OpenClaw', zh: 'TClaw 连接 OpenClaw' },
          { id: 'tclaw/DuckyClaw-TuyaClaw', en: 'Connect TClaw to TuyaClaw', zh: 'TClaw 连接 TuyaClaw' },
        ],
      },
    ],
  },

  {
    key: 'tyutool',
    accent: '#10b981',
    en: {
      name: 'tyutool',
      tagline: 'Flashing, serial and batch authorization',
      blurb: 'The desktop and CLI tool for flashing firmware, serial debugging and batch authorization.',
    },
    zh: {
      name: 'tyutool',
      tagline: '烧录、串口调试与批量授权',
      blurb: '烧录固件、串口调试与批量授权的桌面端 / 命令行工具。',
    },
    entry: 'tyutool',
    groups: [
      {
        en: 'Use it',
        zh: '基本使用',
        links: [
          { id: 'tyutool', en: 'Overview', zh: '总览' },
          { id: 'tyutool/concepts', en: 'Concepts', zh: '基本概念' },
          { id: 'tyutool/getting-started', en: 'Getting started', zh: '快速上手' },
          { id: 'tyutool/flash', en: 'Flash firmware', zh: '烧录固件' },
          { id: 'tyutool/serial-debug', en: 'Serial debug', zh: '串口调试' },
        ],
      },
      {
        en: 'Production & CLI',
        zh: '量产与命令行',
        links: [
          { id: 'tyutool/batch-auth-operator', en: 'Batch auth — operator', zh: '批量授权 · 操作员' },
          { id: 'tyutool/batch-auth-developer', en: 'Batch auth — developer', zh: '批量授权 · 开发者' },
          { id: 'tyutool/cli', en: 'CLI', zh: '命令行' },
          { id: 'tyutool/settings', en: 'Settings', zh: '设置' },
          { id: 'tyutool/faq', en: 'FAQ', zh: '常见问题' },
        ],
      },
    ],
  },
]

/** Non-docs destinations worth surfacing from the same page. */
export const elsewhere = [
  {
    to: '/learn',
    en: { title: 'Tutorials', desc: 'Guided, hands-on walkthroughs — including the TuyaOpen IDE series.' },
    zh: { title: '教程', desc: '手把手的实战教程，含 TuyaOpen IDE 系列。' },
  },
  {
    to: '/faq',
    en: { title: 'FAQ articles', desc: 'Longer answers to the questions that keep coming up.' },
    zh: { title: 'FAQ 文章', desc: '高频问题的深入解答。' },
  },
  {
    href: 'https://forum-tuyaopen.discourse.group/',
    en: { title: 'Forums', desc: 'Ask the community when the docs run out.' },
    zh: { title: '论坛', desc: '文档没覆盖到的问题，来社区问。' },
  },
]
