/**
 * Homepage copy for root `/` — aligned with docs (about-tuyaopen, quick-start, applications, tos-guide).
 * Keys: en | zh
 */

export const homepageCopy = {
  en: {
    metaDescription:
      'TuyaOpen is an open source AI+IoT development framework: a cross-platform C/C++ SDK for Tuya T-Series MCU, Raspberry Pi, ESP32, and more. Pair with Tuya Cloud multimodal AI, integrate leading LLMs, and build devices with voice, vision, and sensor features.',
    hero: {
      badge: 'Open source · AI + IoT',
      line1: 'Open source AI',
      line2: 'for real devices',
      line3: 'with TuyaOpen',
      subtitle: 'Build once, deploy across chips.',
      body: 'TuyaOpen powers next-gen AI-agent hardware: it supports gear (Tuya T-Series Wi-Fi/BT MCUs, Pi, ESP32s) via a flexible cross-platform C/C++ SDK, pairs with Tuya Cloud multimodal AI, integrates top models (ChatGPT, Gemini, Qwen, Doubao, and more), and streamlines open AI-IoT ecosystem building.',
      codePreview: `git clone https://github.com/tuya/TuyaOpen.git
cd TuyaOpen
. ./export.sh

tos.py check
cd apps/tuya_cloud/switch_demo
tos.py config choice
tos.py build
tos.py flash`,
    },
    cta: {
      quickStart: 'Quick Start',
      about: 'About TuyaOpen',
      applications: 'Applications',
      github: 'GitHub',
      learnMore: 'Learn more',
      releases: 'Releases & roadmap',
      contribute: 'Contribution guide',
      tosGuide: 'tos.py guide',
      envSetup: 'Environment setup',
    },
    benefits: {
      sectionTag: 'Why TuyaOpen',
      title: 'Make development straightforward',
      subtitle: 'Layered SDK, multimodal AI, and cloud-ready building blocks.',
      items: [
        {
          title: 'Layered SDK you can grow on',
          body: 'TKL (hardware abstraction), TAL (OS/device abstraction), libraries, services, and applications—develop once, deploy everywhere with reusable building blocks.',
        },
        {
          title: 'Multimodal AI on the edge',
          body: 'Speech (ASR, KWS, TTS, STT), vision, and sensor-based features. Integrate leading LLMs and platforms (DeepSeek, ChatGPT, Claude, Gemini, and more).',
        },
        {
          title: 'Cloud-connected and secure',
          body: 'Connect to Tuya Cloud for remote control, monitoring, and OTA updates. Built-in security, device authentication, and data encryption.',
        },
      ],
    },
    code: {
      sectionTag: 'Developer workflow',
      title: 'From clone to flash',
      caption:
        'Write once, target every chip class—from embedded MCUs to application SoCs—with one straightforward workflow. Develop on Windows, macOS, or Linux: the same tos.py toolchain on the OS you already use. Clone the repo, run export at the root to bring the SDK online, then follow the commands below. Host prerequisites and Windows export scripts: Environment setup.',
      block: `git clone https://github.com/tuya/TuyaOpen.git
cd TuyaOpen
. ./export.sh

tos.py check
cd apps/tuya_cloud/switch_demo

tos.py config choice
tos.py build
tos.py flash`,
    },
    cloudOnePager: {
      sectionTag: 'Device-Cloud One pager',
      title: 'How TuyaOpen connects to the cloud',
      subtitle:
        'On the edge you ship firmware with the TuyaOpen C/C++ SDK; in the cloud you use the Tuya Cloud developer platform for multimodal AI. Text, speech, vision, and sensor data move between device and cloud so you can build next-gen AI-agent hardware and open smart ecosystems.',
      hardwareTitle: 'Hardware & TuyaOpenSDK',
      hardwareBullets: [
        'Targets from Tuya T-Series MCUs to Raspberry Pi, Rockchip and Linux SoCs, and ESP32—one RTOS-like, modular stack.',
        'Rich peripherals and drivers; build generic IoT and AI-agent applications with familiar Win / macOS / Linux toolchains.',
        'Device-side building blocks pair with cloud AI APIs for Wi-Fi IoT and multimodal features.',
      ],
      cloudTitle: 'Tuya Cloud platform',
      cloudBullets: [
        'Cloud-based multimodal AI: low-latency speech and vision, zero/low-code integration, and drag-and-drop AI agent workflows.',
        'Long- and short-term memory, custom MCP servers, emotion-aware TTS/STT, and MiniApp app panels.',
        'Works with leading models (ChatGPT, Gemini, Claude, Qwen, DeepSeek, and more) and the Tuya Smart hardware ecosystem.',
      ],
      diagramCaption: 'Overview: TuyaOpen hardware development (left) and Tuya Cloud (right).',
      diagramZoomHint: 'Click to enlarge',
      lightboxCloseLabel: 'Close',
      diagramUrl: 'https://images.tuyacn.com/fe-static/docs/img/2eed8b23-0459-4db4-8f17-e7cce8b36b8a.png',
      diagramAlt:
        'Infographic showing TuyaOpen C/C++ SDK hardware development on the left—including MCUs, Raspberry Pi, SoCs, and ESP32—and the Tuya Cloud developer platform on the right for multimodal AI, with bidirectional flows for text, speech, camera, and sensor data in the center.',
    },
    platforms: {
      title: 'Supported chipset platforms',
      intro:
        'From coin-cell MCUs to Linux-class SoCs—pick the silicon that matches your power budget, latency goals, and AI topology. Host tooling on Windows, macOS, and Linux. See About TuyaOpen for the full matrix.',
      linkLabel: 'View platform table',
      recommendedTag: 'Recommended',
      multimodalTag: 'Multimodal',
      categories: [
        {
          id: 'mcu',
          label: 'MCU',
          subtext:
            'Ultra-lightweight, low-cost, and power-efficient—built for always-on IoT. Stream sensor and media data to Tuya Cloud; multimodal AI is processed in the cloud so your device stays lean.',
          items: [
            { name: 'Tuya T5', recommended: true, multimodal: true },
            { name: 'Tuya T2', recommended: false },
            { name: 'Tuya T3', recommended: false },
            { name: 'ESP32-C3', recommended: false },
            { name: 'ESP32-S3', recommended: false },
            { name: 'ESP32-C6', recommended: false },
          ],
        },
        {
          id: 'soc',
          label: 'SoC',
          subtext:
            'More headroom for edge AI: run richer models locally, then fuse with Tuya Cloud AI for scale, orchestration, and the latest LLMs—one stack from device to cloud.',
          items: [
            { name: 'Raspberry Pi', recommended: false },
            { name: 'Linux', recommended: false },
            { name: 'Ubuntu', recommended: false },
            { name: 'Rockchip', recommended: false },
          ],
        },
      ],
    },
    demos: {
      title: 'Demos to try',
      intro:
        'TuyaOpen ships IoT and AI+IoT applications you can copy and extend. See the application list for product copy links and details.',
      items: [
        {
          name: 'switch_demo',
          desc: 'IoT device firmware that supports all chips.',
        },
        {
          name: 'your_chat_bot',
          desc: 'AI chat dialogue robot (T5AI and ESP32-S3).',
        },
        {
          name: 'duo_eye_mood',
          desc: 'AI dual-eye expression dialogue robot (T5AI).',
        },
      ],
      cta: 'Browse applications',
    },
    socialProof: {
      items: [
        { label: 'Apache 2.0', hint: 'Open source license' },
        { label: 'C/C++ SDK', hint: 'Cross-platform' },
        { label: 'Tuya Cloud', hint: 'IoT + multimodal AI' },
        { label: 'Community', hint: 'GitHub & Discord' },
      ],
    },
    steps: {
      title: 'Get started in three steps',
      items: [
        {
          title: '1. TuyaOpen license',
          body: 'Get a TuyaOpen dedicated license (UUID + AuthKey) for Tuya Cloud access. See Get Started for acquisition and writing options.',
        },
        {
          title: '2. Clone, init SDK, and pick a board',
          body: 'Clone TuyaOpen from GitHub or Gitee, cd into the repo, and run the export script (. ./export.sh on Linux/macOS, or export.ps1 / export.bat on Windows) to initialize the tos.py environment. Run tos.py check, then in your app folder use tos.py config choice for the board.',
        },
        {
          title: '3. Build and flash',
          body: 'From the application directory, run tos.py build and tos.py flash. Use tos.py monitor when you need serial logs or authorization steps.',
        },
      ],
    },
    t5: {
      title: 'Tuya T5 MCU',
      body: 'Tuya T5 chip/module is a high-performance embedded Wi-Fi 6 + Bluetooth 5.4 dual-mode communication module, embedded with ARMv8-M Star (M33F) processor, with a main frequency up to 480MHz, specially designed for smart audio-video applications.',
    },
    arduinoExperimental: {
      sectionTag: 'Experimental feature',
      title: 'Now Develop agentic AI hardware with Arduino IDE.',
      body: 'Prototype on T5 with a familiar Arduino workflow—board support and libraries integrated with TuyaOpen so you can move fast on agentic AI hardware.',
      imageUrl: '/img/home/tuyaopen-arduino-ide-dark.jpg',
      imageAlt: 'TuyaOpen in Arduino IDE on a dark theme',
      ctaPath: '/docs/hardware-specific/tuya-t5/develop-with-Arduino/Quick_start',
    },
    tuyaAi: {
      sectionTag: 'Multimodal AI',
      title: 'Tuya AI',
      body: 'Tuya AI: Multimodal edge-cloud intelligence with edge AI inference and cloud agent hub, enabling access to leading AI models (DeepSeek, ChatGPT, Claude, Gemini) and cross-modal functions including voice/text interaction and image/video generation for edge devices.',
      imageSrc: 'img/features/Smart home-amico.svg',
      imageAlt: 'Illustration: smart home and multimodal AI devices.',
    },
    partners: {
      sectionTag: 'Ecosystem',
      title: 'Working with partners worldwide',
      subtitle: 'Hardware vendors, silicon partners, and developer platforms collaborating around TuyaOpen.',
      colabSections: [
        {
          title: 'All-in-One AI large model access',
          items: [
            {
              alt: 'Gemini',
              src: 'https://static1.tuyaeu.com/static/portal-tuyaai/_next/static/img/29e2b750cb859f7dd69a.png',
            },
            {
              alt: 'OpenAI',
              src: 'https://static1.tuyaeu.com/static/portal-tuyaai/_next/static/img/2af737816482e94c0f9d.png',
            },
            {
              alt: 'Amazon Nova',
              src: 'https://static1.tuyaeu.com/static/portal-tuyaai/_next/static/img/a60d91ef186a1bd78d92.png',
            },
            {
              alt: 'DeepSeek',
              src: 'https://static1.tuyaeu.com/static/portal-tuyaai/_next/static/img/db559231a82d53cd2696.png',
            },
            {
              alt: 'Grok',
              src: 'https://static1.tuyaeu.com/static/portal-tuyaai/_next/static/img/61c8914c1476f0a111e5.png',
            },
            {
              alt: 'Qwen',
              src: 'https://static1.tuyaeu.com/static/portal-tuyaai/_next/static/img/738adb6598d4ffa900e3.png',
            },
          ],
        },
        {
          title: 'Built on trusted cloud providers',
          items: [
            {
              alt: 'Google Cloud',
              src: 'https://static1.tuyaeu.com/static/portal-tuyaai/_next/static/img/34362f48fffae9a062d3.png',
            },
            {
              alt: 'Microsoft Azure',
              src: 'https://static1.tuyaeu.com/static/portal-tuyaai/_next/static/img/835a4e49535f670a50e4.png',
            },
            {
              alt: 'Oracle Cloud',
              src: 'https://static1.tuyaeu.com/static/portal-tuyaai/_next/static/img/87e10d4486c50b2af029.png',
            },
            {
              alt: 'Alibaba Cloud',
              src: 'https://static1.tuyaeu.com/static/portal-tuyaai/_next/static/img/ebdbb28fac270b3c1927.png',
            },
            {
              alt: 'Tencent Cloud',
              src: 'https://static1.tuyaeu.com/static/portal-tuyaai/_next/static/img/382bd17ca7f322124399.png',
            },
            {
              alt: 'AWS',
              src: 'https://static1.tuyaeu.com/static/portal-tuyaai/_next/static/img/9dbd17abc9287d7cf51e.png',
            },
          ],
        },
      ],
      items: [
        { href: 'https://www.espressif.com/', src: '/img/home/partners/espressif.svg', alt: 'Espressif' },
        { href: 'https://www.raspberrypi.com/', src: '/img/home/partners/raspberry-pi.svg', alt: 'Raspberry Pi' },
        { href: 'https://www.arduino.cc/', src: '/img/home/partners/arduino.svg', alt: 'Arduino' },
        { href: 'https://www.rock-chips.com/', src: '/img/home/partners/rockchip.svg', alt: 'Rockchip' },
        { href: 'https://www.tuya.com/', src: '/img/home/partners/tuya-smart.svg', alt: 'Tuya Smart' },
        { href: 'https://github.com/', src: '/img/home/partners/github.svg', alt: 'GitHub' },
      ],
    },
    applicationsUseCases: {
      sectionTag: 'Applications & use cases',
      title: 'Applications and use cases',
      subtitle:
        'And much more for you to explore. Wi-Fi connected, AI-ready hardware you can ship with TuyaOpen—sensing, speakers, wearables, and toys.',
      navAriaLabel: 'Select an application or use case',
      items: [
        {
          id: 'ai-sensor',
          label: 'AI Sensor',
          title: 'Smarter spaces with AI sensing',
          body: 'On-device perception plus cloud AI: understand people, rooms, and routines—so products feel safer, use energy more wisely, and stay effortless to live with.',
          highlights: [
            'Human sensing: posture and spatial awareness',
            'Environmental insight from richer sensor analytics',
            'Voice-first scheduling with calendars and connected devices',
          ],
          mediaType: 'image',
          mediaSrc: '/img/features/Firmware-amico.svg',
          mediaAlt: 'Illustration: embedded firmware and intelligent sensing.',
        },
        {
          id: 'ai-speaker',
          label: 'AI Speaker',
          title: 'The LLM-powered speaker',
          body: 'Go beyond command-and-control to real conversation—an intelligent home companion powered by Large Language Models, built for natural human-device interaction.',
          mediaType: 'image',
          mediaSrc: '/img/features/Voice interface-rafiki.svg',
          mediaAlt: 'Illustration: voice interface and smart speaker.',
        },
        {
          id: 'ai-wearable',
          label: 'AI Wearable',
          title: 'Wearables that act—not only record',
          body: 'Voice, vision, and multimodal building blocks for earbuds, watches, rings, and glasses—elevating devices from data loggers to companions that understand and serve.',
          highlights: [
            'Health Advisor: continuous signals turned into clear, actionable insight',
            'Assistant mode: natural-language control of whole-home devices',
          ],
          mediaType: 'image',
          mediaSrc: '/img/features/Pair programming-amico.svg',
          mediaAlt: 'Illustration: companion-style wearable and interaction.',
        },
        {
          id: 'ai-toy',
          label: 'AI Toy',
          title: 'Toys that listen, talk, and remember',
          body: 'Hardware-to-cloud paths to leading models without stitching LLMs yourself—privacy-aware design, fluent dialogue, multimodal play, and long-term memory that fits the product.',
          highlights: [
            'Data protection: COPPA- and GDPR-aligned patterns for AI toys',
            'Smart dialogue in many languages; multimodal voice, vision, touch, and motion',
            'Long-term memory for profiles and conversation context',
          ],
          mediaType: 'image',
          mediaSrc: '/img/features/Robotics-pana.svg',
          mediaAlt: 'Illustration: playful robotics and AI toy concept.',
        },
      ],
    },
    community: {
      title: 'Build the community together',
      body: 'Star the repo, open issues or discussions, join Discord, and read the Contribution Guide. Contributions are welcome under Apache License 2.0.',
      cardGitHub: 'Contribute on GitHub',
      cardHelp: 'Need help? Ask on Issues or Discussions.',
      cardDiscord: 'Chat with other developers on Discord.',
      discordButton: 'Join Discord',
      contributorsTitle: 'Contributors',
      contributorsBadgeAlt: 'TuyaOpen contributors',
      contributorsAriaLabel: 'View TuyaOpen contributors on GitHub',
      footerIncubator: 'TuyaOpen is an open source project incubated by',
    },
  },
  zh: {
    metaDescription:
      'TuyaOpen 是开源 AI+IoT 开发框架：以跨平台 C/C++ SDK 支持涂鸦 T 系列 MCU、树莓派、ESP32 等设备，搭配涂鸦云多模态 AI，集成主流大模型，构建具备语音、视觉与传感能力的智能设备。',
    hero: {
      badge: '开源 · AI + IoT',
      line1: '开源 AI',
      line2: '落地真实硬件',
      line3: '就用 TuyaOpen',
      subtitle: '一次开发，多端部署。',
      body: 'TuyaOpen 赋能下一代 AI 智能体硬件：以灵活跨平台 C/C++ SDK 支持涂鸦 T 系列 WIFI/蓝牙芯片、树莓派、ESP32 等设备，搭配涂鸦云低延迟多模态 AI，集成顶尖模型，简化开放式 AI-IoT 生态搭建。',
      codePreview: `git clone https://github.com/tuya/TuyaOpen.git
cd TuyaOpen
. ./export.sh

tos.py check
cd apps/tuya_cloud/switch_demo
tos.py config choice
tos.py build
tos.py flash`,
    },
    cta: {
      quickStart: '快速开始',
      about: '关于 TuyaOpen',
      applications: '应用',
      github: 'GitHub',
      learnMore: '了解更多',
      releases: '发布与路线图',
      contribute: '贡献指南',
      tosGuide: 'tos.py 指南',
      envSetup: '环境搭建',
    },
    benefits: {
      sectionTag: '为什么选择 TuyaOpen',
      title: '让开发更简单直接',
      subtitle: '分层 SDK、多模态 AI、可上云能力。',
      items: [
        {
          title: '可演进的分层架构',
          body: 'TKL（硬件抽象）、TAL（OS/设备抽象）、库、服务与应用层——底层灵活适配硬件，上层快速复用标准化能力，实现“一次开发，多端部署”。',
        },
        {
          title: '端侧多模态 AI',
          body: '支持 ASR、KWS、TTS、STT 等语音能力，以及视觉与传感相关能力；可集成 DeepSeek、ChatGPT、Claude、Gemini 等主流 LLM 与平台。',
        },
        {
          title: '连云与安全',
          body: '连接涂鸦云实现远程控制、监控与 OTA 升级；内置安全性、设备认证与数据加密等能力。',
        },
      ],
    },
    code: {
      sectionTag: '开发工作流',
      title: '从克隆到烧录',
      caption:
        '一次工作流，面向从 MCU 到 SoC 的多样目标硬件；开发体验同样简单：在 Windows、macOS、Linux 上使用同一套 tos.py 工具链。克隆仓库后在根目录执行 export 激活 SDK，再按下方命令继续。本机依赖与 Windows 脚本见环境搭建。',
      block: `git clone https://github.com/tuya/TuyaOpen.git
cd TuyaOpen
. ./export.sh

tos.py check
cd apps/tuya_cloud/switch_demo

tos.py config choice
tos.py build
tos.py flash`,
    },
    cloudOnePager: {
      sectionTag: '设备-云端一页通',
      title: 'TuyaOpen 如何与云端协同',
      subtitle:
        '在端侧，你使用 TuyaOpen C/C++ SDK 交付固件；在云端，你使用涂鸦云开发者平台承载多模态 AI。文本、语音、视觉与传感数据在设备与云端之间流动，支撑新一代 AI 智能体硬件与开放智能生态。',
      hardwareTitle: '硬件与 TuyaOpenSDK',
      hardwareBullets: [
        '覆盖涂鸦 T 系列 MCU、树莓派、Rockchip / Linux SoC、ESP32 等目标，同一套类 RTOS、模块化栈。',
        '丰富的外设与驱动；在 Windows / macOS / Linux 上用熟悉的工具链开发通用 IoT 与 AI 智能体应用。',
        '端侧能力可与云端 AI API 配合，实现 Wi-Fi 物联网与多模态能力。',
      ],
      cloudTitle: '涂鸦云开发者平台',
      cloudBullets: [
        '云端多模态 AI：低延迟语音与视觉、低代码/零代码接入、拖拽式 AI 智能体工作流。',
        '长短期记忆、自定义 MCP、情感化 TTS/STT、MiniApp 控制面板等能力。',
        '对接主流大模型（ChatGPT、Gemini、Claude、Qwen、DeepSeek 等），并与涂鸦智能硬件生态联动。',
      ],
      diagramCaption: '示意图：左侧为 TuyaOpen 硬件开发，右侧为涂鸦云。',
      lightboxCloseLabel: '关闭',
      diagramUrl: 'https://images.tuyacn.com/fe-static/docs/img/2eed8b23-0459-4db4-8f17-e7cce8b36b8a.png',
      diagramAlt:
        '信息图：左侧为 TuyaOpen C/C++ SDK 硬件开发（含 MCU、树莓派、SoC、ESP32 等），右侧为涂鸦云开发者平台与多模态 AI；中间为文本、语音、摄像头与传感器数据的双向流动。',
    },
    platforms: {
      title: '支持的芯片平台',
      intro:
        '从超低功耗 MCU 到 Linux 级 SoC——按功耗、时延与 AI 拓扑选型。主机构建在 Windows / macOS / Linux 上均可；完整矩阵见「关于 TuyaOpen」。',
      linkLabel: '查看平台矩阵',
      recommendedTag: '推荐',
      multimodalTag: '多模态',
      categories: [
        {
          id: 'mcu',
          label: 'MCU',
          subtext:
            '轻量化、低成本、低功耗，适合长连接物联网。传感与音视频数据上云处理，多模态 AI 在涂鸦云上完成推理与编排，端侧保持极简。',
          items: [
            { name: 'Tuya T5', recommended: true, multimodal: true },
            { name: 'Tuya T2', recommended: false },
            { name: 'Tuya T3', recommended: false },
            { name: 'ESP32-C3', recommended: false },
            { name: 'ESP32-S3', recommended: false },
            { name: 'ESP32-C6', recommended: false },
          ],
        },
        {
          id: 'soc',
          label: 'SoC',
          subtext:
            '更强算力，适合端侧 AI 与云端 AI 协同：本地跑更重的模型，再与涂鸦云融合编排、弹性扩缩与最新大模型能力，一条链路从设备到云。',
          items: [
            { name: 'Raspberry Pi', recommended: false },
            { name: 'Linux', recommended: false },
            { name: 'Ubuntu', recommended: false },
            { name: 'Rockchip', recommended: false },
          ],
        },
      ],
    },
    demos: {
      title: '可体验的 Demo',
      intro: 'TuyaOpen 提供 IoT 与 AI+IoT 应用，可按文档复制产品与智能体。详情见应用列表。',
      items: [
        {
          name: 'switch_demo',
          desc: '支持全芯片的 IoT 设备固件。',
        },
        {
          name: 'your_chat_bot',
          desc: 'AI 对话机器人（当前支持 T5AI 与 ESP32-S3）。',
        },
        {
          name: 'duo_eye_mood',
          desc: 'AI 双眼表情对话机器人（当前支持 T5AI）。',
        },
      ],
      cta: '浏览应用',
    },
    socialProof: {
      items: [
        { label: 'Apache 2.0', hint: '开源许可证' },
        { label: 'C/C++ SDK', hint: '跨平台' },
        { label: '涂鸦云', hint: '物联网 + 多模态 AI' },
        { label: '社区', hint: 'GitHub 与 Discord' },
      ],
    },
    steps: {
      title: '三步上手',
      items: [
        {
          title: '1. TuyaOpen 授权码',
          body: '连接涂鸦云需要 TuyaOpen 专用授权码（UUID + AuthKey）。获取与写入方式见快速开始。',
        },
        {
          title: '2. 克隆、初始化 SDK、选板',
          body: '从 GitHub 或 Gitee 克隆仓库，进入根目录后执行 export 脚本（Linux/macOS：. ./export.sh；Windows：export.ps1 或 export.bat）以激活 tos.py。在根目录执行 tos.py check，再进入应用工程目录使用 tos.py config choice 选择开发板。',
        },
        {
          title: '3. 编译与烧录',
          body: '在应用目录执行 tos.py build 与 tos.py flash。需要串口日志或授权信息时使用 tos.py monitor。',
        },
      ],
    },
    t5: {
      title: '涂鸦 T5 芯片',
      body: '涂鸦 T5 芯片/模组是一款高性能嵌入式 Wi-Fi 6 + 蓝牙 5.4 双模通信模组，内嵌 ARMv8-M Star (M33F) 处理器，主频高达 480MHz，专为智能音视频及人机交互场景设计。',
    },
    arduinoExperimental: {
      sectionTag: '实验性功能',
      title: '使用 Arduino IDE 开发智能体 AI 硬件。',
      body: '在 T5 上沿用熟悉的 Arduino 工作流——板级支持与库与 TuyaOpen 打通，更快验证智能体 AI 硬件原型。',
      imageUrl: '/img/home/tuyaopen-arduino-ide-dark.jpg',
      imageAlt: '深色主题下 Arduino IDE 中的 TuyaOpen 开发界面',
      ctaPath: '/docs/hardware-specific/tuya-t5/develop-with-Arduino/Quick_start',
    },
    tuyaAi: {
      sectionTag: '多模态 AI',
      title: 'Tuya AI',
      body: 'Tuya AI：端云协同的多模态智能，支持端侧推理与云端智能体中枢，可接入 DeepSeek、ChatGPT、Claude、Gemini 等模型，并支持语音/文本交互与图像/视频生成等跨模态能力。',
      imageSrc: 'img/features/Smart home-amico.svg',
      imageAlt: '插图：智能家居与多模态 AI 设备。',
    },
    partners: {
      sectionTag: '生态伙伴',
      title: '与全球伙伴协作',
      subtitle: '芯片与模组厂商、硬件生态与开发者平台共同推动 TuyaOpen。',
      colabSections: [
        {
          title: '一站式 AI 大模型接入',
          items: [
            {
              alt: 'Gemini',
              src: 'https://static1.tuyaeu.com/static/portal-tuyaai/_next/static/img/29e2b750cb859f7dd69a.png',
            },
            {
              alt: 'OpenAI',
              src: 'https://static1.tuyaeu.com/static/portal-tuyaai/_next/static/img/2af737816482e94c0f9d.png',
            },
            {
              alt: 'Amazon Nova',
              src: 'https://static1.tuyaeu.com/static/portal-tuyaai/_next/static/img/a60d91ef186a1bd78d92.png',
            },
            {
              alt: 'DeepSeek',
              src: 'https://static1.tuyaeu.com/static/portal-tuyaai/_next/static/img/db559231a82d53cd2696.png',
            },
            {
              alt: 'Grok',
              src: 'https://static1.tuyaeu.com/static/portal-tuyaai/_next/static/img/61c8914c1476f0a111e5.png',
            },
            {
              alt: '通义千问 Qwen',
              src: 'https://static1.tuyaeu.com/static/portal-tuyaai/_next/static/img/738adb6598d4ffa900e3.png',
            },
          ],
        },
        {
          title: '可信云基础设施',
          items: [
            {
              alt: 'Google Cloud',
              src: 'https://static1.tuyaeu.com/static/portal-tuyaai/_next/static/img/34362f48fffae9a062d3.png',
            },
            {
              alt: 'Microsoft Azure',
              src: 'https://static1.tuyaeu.com/static/portal-tuyaai/_next/static/img/835a4e49535f670a50e4.png',
            },
            {
              alt: 'Oracle Cloud',
              src: 'https://static1.tuyaeu.com/static/portal-tuyaai/_next/static/img/87e10d4486c50b2af029.png',
            },
            {
              alt: '阿里云',
              src: 'https://static1.tuyaeu.com/static/portal-tuyaai/_next/static/img/ebdbb28fac270b3c1927.png',
            },
            {
              alt: '腾讯云',
              src: 'https://static1.tuyaeu.com/static/portal-tuyaai/_next/static/img/382bd17ca7f322124399.png',
            },
            {
              alt: 'AWS',
              src: 'https://static1.tuyaeu.com/static/portal-tuyaai/_next/static/img/9dbd17abc9287d7cf51e.png',
            },
          ],
        },
      ],
      items: [
        { href: 'https://www.tuya.com/', src: '/img/home/partners/tuya-smart.svg', alt: 'Tuya Smart' },
        { href: 'https://www.espressif.com/', src: '/img/home/partners/espressif.svg', alt: 'Espressif' },
        { href: 'https://www.rock-chips.com/', src: '/img/home/partners/rockchip.svg', alt: 'Rockchip' },
        { href: 'https://www.arduino.cc/', src: '/img/home/partners/arduino.svg', alt: 'Arduino' },
        { href: 'https://gitee.com/', src: '/img/home/partners/gitee.svg', alt: 'Gitee' },
        { href: 'https://www.raspberrypi.com/', src: '/img/home/partners/raspberry-pi.svg', alt: 'Raspberry Pi' },
      ],
    },
    applicationsUseCases: {
      sectionTag: '应用与用例',
      title: '应用与用例',
      subtitle:
        '更多精彩内容，等你探索。基于 TuyaOpen 的 Wi-Fi 联网、AI 就绪硬件：AI 传感、AI 音箱、AI 穿戴与 AI 玩具。',
      navAriaLabel: '选择应用或用例',
      items: [
        {
          id: 'ai-sensor',
          label: 'AI 传感',
          title: '更懂空间的 AI 感知',
          body: '端侧感知结合云端 AI：理解人与环境、支撑日程与设备联动——更安全、更节能、更省心。',
          highlights: [
            '人体感知：空间边界、姿态等感知能力',
            '环境能力：让传感数据更易读、更可行动',
            '日程管理：语音与设备协同，管理日历与日常安排',
          ],
          mediaType: 'image',
          mediaSrc: '/img/features/Firmware-amico.svg',
          mediaAlt: '插图：固件与智能感知。',
        },
        {
          id: 'ai-speaker',
          label: 'AI 音箱',
          title: '大模型驱动的智能音箱',
          body: '从「执行指令」到「真正对话」——以 LLM 赋能的家庭智能伴侣，重塑人机交互体验。',
          mediaType: 'image',
          mediaSrc: '/img/features/Voice interface-rafiki.svg',
          mediaAlt: '插图：语音界面与智能音箱。',
        },
        {
          id: 'ai-wearable',
          label: 'AI 穿戴',
          title: '不止记录，更会服务',
          body: '语音、视觉与多模态能力覆盖耳戴、手表、戒指、眼镜等形态，把数据变成洞察，把穿戴设备变成自然入口。',
          highlights: ['健康顾问：持续监测与更专业的健康分析呈现', '家居入口：自然语言控制全屋设备'],
          mediaType: 'image',
          mediaSrc: '/img/features/Pair programming-amico.svg',
          mediaAlt: '插图：陪伴式交互与穿戴场景。',
        },
        {
          id: 'ai-toy',
          label: 'AI 玩具',
          title: '会听、会说、会记住的玩具',
          body: '从硬件到云端的完整路径，快速接入主流大模型；合规的数据处理、流畅多语对话、多模态互动与长期记忆，一次搭好产品力。',
          highlights: [
            '数据保护：面向儿童场景的合规数据处理与加密实践',
            '智能对话：多语言语音交互；多模态支持语音、视觉、触控与动作',
            '长期记忆：用户画像与对话内容的持续学习与召回',
          ],
          mediaType: 'image',
          mediaSrc: '/img/features/Robotics-pana.svg',
          mediaAlt: '插图：机器人与 AI 玩具概念。',
        },
      ],
    },
    community: {
      title: '共建社区',
      body: 'Star 仓库、提交 Issue 或 Discussion、加入 Discord，并阅读贡献指南。贡献需遵循 Apache License 2.0。',
      cardGitHub: '在 GitHub 上贡献',
      cardHelp: '遇到问题？在 Issues 或 Discussions 提问。',
      cardDiscord: '在 Discord 与其他开发者交流。',
      discordButton: '加入 Discord',
      contributorsTitle: '贡献者',
      contributorsBadgeAlt: 'TuyaOpen 贡献者',
      contributorsAriaLabel: '在 GitHub 查看 TuyaOpen 贡献者',
      footerIncubator: 'TuyaOpen 是由',
    },
  },
}
