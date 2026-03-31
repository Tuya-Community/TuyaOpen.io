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
      line1: 'Agentic AI',
      line2: 'on real devices',
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
        {
          title: 'From prototype to production',
          body: 'Production-ready architecture from day one: reusable layers, stable connectivity, security-by-design, and scalable cloud integration so teams can move from proof-of-concept to shipped products with less rework.',
        },
      ],
    },
    audience: {
      sectionTag: 'Who is it for?',
      title: 'Built for builders at every stage',
      subtitle:
        'From first prototype to scaled shipment, TuyaOpen helps you build bold IoT and agentic hardware faster.',
      items: [
        {
          title: 'Students and learners',
          body: 'Turn ideas into working devices with a practical stack and clear workflows. Learn by building real AI+IoT products, not toy examples.',
        },
        {
          title: 'Makers and IoT enthusiasts',
          body: 'Move from hackathon concepts to polished demos quickly. Reusable SDK layers and ready integrations help you ship cool hardware with less glue code.',
        },
        {
          title: 'AI agent hardware creators',
          body: 'Design voice-first, multimodal products with agent workflows, tools, and cloud orchestration that map cleanly to real devices.',
        },
        {
          title: 'Commercial product teams',
          body: 'Adopt a production-oriented architecture with security, OTA, and scalable cloud capabilities to reduce risk and speed time-to-market.',
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
        'Start from production-oriented demos. Pick a target, open the source, and follow the guide to run it on your board in minutes.',
      items: [
        {
          name: 'switch_demo',
          desc: 'Baseline IoT firmware for networking, pairing, cloud control, and OTA across supported targets. A simple and straightforward IoT on/off example with a controllable app panel.',
          codeLink: 'https://github.com/tuya/TuyaOpen/tree/master/apps/tuya_cloud/switch_demo',
          guideLink: '/docs/applications/tuya_cloud/demo-tuya-iot-light',
        },
        {
          name: 'your_chat_bot',
          desc: 'Voice-first AI chat demo with agent interaction, tuned for T5AI, ESP32-S3, and Raspberry Pi 4/5 class devices. Supports multimodal input and skill extension, ideal for personal assistants and conversational experiences.',
          codeLink: 'https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/your_chat_bot',
          guideLink: '/docs/applications/tuya.ai/demo-your-chat-bot',
        },
        {
          name: 'duo_eye_mood',
          desc: 'Dual-eye expressive demo with eye and mood visuals, plus conversational interaction on T5AI.',
          codeLink: 'https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/duo_eye_mood',
          guideLink: '/docs/applications/tuya.ai/demo-duo-eyes-mood',
        },
        {
          name: 'Rich Peripheral Examples',
          desc: 'From hardware protocols and OS-level programming to LVGL GUI and generic examples, this is a practical building-block set to get started fast.',
          codeLink: 'https://github.com/tuya/TuyaOpen/tree/master/examples',
          guideLink: '/docs/hardware-specific/Linux/raspberry-pi/Examples/peripherals-raspberry-pi',
          hideGuide: true,
        },
      ],
      cta: 'Browse applications',
      codeCta: 'Code',
      guideCta: 'Guide',
    },
    socialProof: {
      items: [
        { label: 'Apache 2.0', hint: 'Open source license' },
        { label: 'C/C++ SDK', hint: 'Cross-platform from MCU to SoC' },
        { label: 'Tuya Cloud', hint: 'IoT + multimodal AI' },
        { label: 'Community', hint: 'GitHub & Discord · 8000+ active developers' },
      ],
    },
    steps: {
      title: 'Get started in three steps',
      items: [
        {
          title: '1. TuyaOpen license',
          body: 'Get a TuyaOpen dedicated license (UUID + AuthKey) for Tuya Cloud access. See Get Started for acquisition and writing options.',
          ctaLink: '/pricing',
          ctaLabel: 'Get TuyaOpen license',
        },
        {
          title: '2. Clone, init SDK, and pick a board',
          body: 'Clone TuyaOpen from GitHub or Gitee, cd into the repo, and run the export script (. ./export.sh on Linux/macOS, or export.ps1 / export.bat on Windows) to initialize the tos.py environment. Run tos.py check, then in your app folder use tos.py config choice for the board.',
          ctaLink: '/docs/quick-start/enviroment-setup',
          ctaLabel: 'Step-by-Step Guide',
        },
        {
          title: '3. Build and flash',
          body: 'From the application directory, run tos.py build and tos.py flash. Use tos.py monitor when you need serial logs or authorization steps.',
        },
      ],
    },
    t5: {
      title: 'Tuya T5 : Cost-effective for Agentic AI',
      body: 'Tuya T5 chip/module is a high-performance embedded Wi-Fi 6 + Bluetooth 5.4 dual-mode communication module, embedded with ARMv8-M Star (M33F) processor and a main frequency up to 480MHz. The chip is purpose-built for multimodal AI interaction scenarios with audio, video, and display enablement. Rich GPIO resources accelerate integration, and built-in Wi-Fi 6 (2.4 GHz) plus BLE connectivity simplifies product bring-up.',
      imageSrc: 'https://images.tuyacn.com/fe-static/docs/img/8eb57de9-ec7b-4f8d-b602-e86f9e24f94a.png',
      imageAlt: 'Tuya T5 MCU board image.',
    },
    arduinoExperimental: {
      sectionTag: 'Experimental feature',
      title: 'Now Develop agentic AI hardware with Arduino IDE.',
      body: 'Prototype on T5 with a familiar Arduino workflow—board support and libraries integrated with TuyaOpen so you can move fast on agentic AI hardware.',
      imageUrl: 'https://images.tuyacn.com/fe-static/docs/img/e413737d-6270-4758-aff1-3a039c5d81b3.jpg',
      imageAlt: 'TuyaOpen in Arduino IDE on a dark theme',
      ctaPath: '/docs/hardware-specific/tuya-t5/develop-with-Arduino/Quick_start',
    },
    tuyaAi: {
      sectionTag: 'Multimodal AI',
      title: 'Tuya AI: Zero-Code Cloud Platform',
      body: 'Tuya AI: Multimodal edge-cloud intelligence with edge AI inference and a cloud agent hub, enabling access to leading AI models (DeepSeek, ChatGPT, Claude, Gemini) and cross-modal functions including voice/text interaction and image/video generation for edge devices. On the Tuya Cloud platform, you can build zero-code agents and customize IoT behaviors without rebuilding firmware.',
      highlights: [
        'Agentic Hardware Control',
        'Memory RAG',
        'Agent Workflow',
        'Agent Prompting',
        'ASR',
        'Skills (Weather, IoT Control, and Third-party)',
        'Model Context Protocols (MCPs)',
      ],
      images: [
        {
          src: 'https://images.tuyacn.com/content-platform/hestia/17387367985ed6a35665b.png',
          alt: 'Tuya AI platform screenshot: dashboard overview.',
        },
        {
          src: 'https://images.tuyacn.com/content-platform/hestia/1744265039409b61af6dd.png',
          alt: 'Tuya AI platform screenshot: multimodal and agent features.',
        },
        {
          src: 'https://images.tuyacn.com/content-platform/hestia/17472931805c7ebbec7fe.png',
          alt: 'Tuya AI platform screenshot: cloud and model integration.',
        },
      ],
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
        {
          title: 'Community and ecosystem partners',
          items: [
            {
              alt: 'Arduino Community CN',
              src: 'https://images.tuyacn.com/fe-static/docs/img/d6bfd773-54f6-4c3a-807d-7bf91dffc5e6.png',
            },
            {
              alt: 'CSDN',
              src: 'https://images.tuyacn.com/fe-static/docs/img/5bd5a630-e9e2-42bd-8be9-8ef23962ad09.png',
            },
            {
              alt: 'GigaDev',
              src: 'https://images.tuyacn.com/fe-static/docs/img/78e893ea-6de1-447d-850b-4f35126da817.png',
            },
            {
              alt: 'Hackster',
              src: 'https://images.tuyacn.com/fe-static/docs/img/cbb2e6ff-8c80-4220-800e-55a9855e6a7e.png',
            },
            {
              alt: 'OpenJumper',
              src: 'https://images.tuyacn.com/fe-static/docs/img/d2f86404-5b90-4f53-888d-a37fb06181ca.png',
            },
            {
              alt: 'OSCHINA',
              src: 'https://images.tuyacn.com/fe-static/docs/img/e43bce40-9efc-4ade-b49a-79dc6496ac8b.png',
            },
            {
              alt: 'OSHWHub',
              src: 'https://images.tuyacn.com/fe-static/docs/img/6ec76beb-1f31-482b-806f-2f8668617ad2.png',
            },
            {
              alt: 'Silicon Labs',
              src: 'https://images.tuyacn.com/fe-static/docs/img/4437cbf1-a892-4d9d-8512-c6f5eb077454.png',
            },
            {
              alt: 'Sekorm',
              src: 'https://images.tuyacn.com/fe-static/docs/img/1c904de4-5200-416c-8d1d-cc25248f69e7.png',
            },
            {
              alt: 'D-Robotics',
              src: 'https://images.tuyacn.com/fe-static/docs/img/06a9db0d-7e68-4f04-9544-e902e7b9c205.png',
            },
            {
              alt: 'Waveshare',
              src: 'https://images.tuyacn.com/fe-static/docs/img/a2712d41-b969-47db-a9b0-bfb87376556a.png',
            },
            {
              alt: 'Zhengdian Electronics',
              src: 'https://images.tuyacn.com/fe-static/docs/img/02e7aeb1-5a70-4f49-bdfa-f33acb8657aa.png',
            },
            {
              alt: 'Elecfans',
              src: 'https://images.tuyacn.com/fe-static/docs/img/30d4d462-afc6-4369-a297-f4d4f939d913.png',
            },
            {
              alt: 'Baiwenwang',
              src: 'https://images.tuyacn.com/fe-static/docs/img/75ba59d8-4174-4836-af42-bf0f71bf34ca.png',
            },
            {
              alt: 'Wildfire',
              src: 'https://images.tuyacn.com/fe-static/docs/img/65d2ee1f-ab95-4ed7-9205-21e4b49e8e23.png',
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
        'Reference designs, products, and industry patterns with TuyaOpen: devices above, plus smart buildings, industrial IoT, and retail—IoT connectivity and agentic AI on one stack.',
      navAriaLabel: 'Select an application or use case',
      items: [
        {
          id: 'emoji-desktop-robot',
          label: 'AI Emoji robot',
          title: 'AI Emoji Desktop Robot',
          body: 'A desktop companion that blends expressive on-screen faces with AI listening and understanding. Rich emoji-style reactions meet gesture and voice control: speak or wave, and the display tracks smoothly for a responsive, playful presence.',
          mediaType: 'image',
          mediaSrc: 'https://images.tuyacn.com/fe-static/docs/img/a1b664f3-0854-4a33-bb64-9c91c5357a11.png',
          mediaAlt: 'Emoji desktop robot with expressive display.',
        },
        {
          id: 'otto-robot',
          label: 'AI OTTO',
          title: 'AI OTTO Robot',
          body: 'A compact biped robot driven by the T5-E1 module across six servos—walk, sway, moonwalk, and jump with lifelike motion. Dual SPI smart eyes add character. Control moves from the app or wake by voice; custom actions are one tap away for demos and play.',
          mediaType: 'image',
          mediaSrc: 'https://images.tuyacn.com/fe-static/docs/img/1f7ea16f-b8ac-4b2c-9949-68ae0ea24af3.png',
          mediaAlt: 'OTTO biped robot with smart eyes.',
        },
        {
          id: 'ai-pixels',
          label: 'AI Pixels',
          title: 'AI Pixels',
          body: 'A high-density pixel display built on TuyaOpen and Tuya T5 Wi-Fi / Bluetooth modules—open from hardware to firmware. Pair with a companion app for custom widgets and Tuya developer services to wire in AI agents, MCP tools, and text-to-image style workflows.',
          mediaType: 'image',
          mediaSrc: 'https://images.tuyacn.com/fe-static/docs/img/ff6bdaa1-18c1-4702-ae39-ed34eaaf37b4.png',
          mediaAlt: 'AI Pixels high-density display.',
        },
        {
          id: 'ai-pocket-console',
          label: 'AI Pocket Console',
          title: 'AI Pocket Console',
          body: 'A pocketable platform for multimodal LLM agents—virtual pets, conversational assistants, and whole-home control through devices you bring onto the Tuya ecosystem.',
          highlights: [
            'Multimodal edge–cloud AI agent development',
            'Virtual pet (Tamagotchi-style) experiences',
            'AI Personal Assistant',
            'Smart home: connect and control Tuya App–linked IoT devices you define',
          ],
          mediaType: 'image',
          mediaSrc: 'https://images.tuyacn.com/fe-static/docs/img/cb944b70-3a99-4193-8cd2-55d071dfca94.png',
          mediaAlt: 'AI pocket console device.',
        },
        {
          id: 'ai-companion-avatar',
          label: 'AI Companion  Avatar',
          title: 'AI Companion Avatar',
          body: 'A tabletop digital presence: hybrid speech, semantic understanding, and emotion-aware responses, with 3D avatar motion that ties expressions and gestures together for a coherent companion experience.',
          highlights: [
            'Host: Raspberry Pi 5',
            'Display: Waveshare 10.4" QLED capacitive touch (10.4HP-CAPQLED)',
            'OS: Raspberry Pi OS (customized)',
            'Stack: TuyaOpen plus in-house motion logic',
            'Voice: Hybrid on-device / cloud ASR and semantics with expressive output',
            'Avatar: 3D rendering with AI-driven motion (expressions and body linked)',
          ],
          mediaType: 'image',
          mediaSrc: 'https://images.tuyacn.com/fe-static/docs/img/54d5130d-9c7b-4784-9f67-b7be40a90033.png',
          mediaAlt: 'AI companion avatar with display.',
        },
        {
          id: 'ai-robot-dog',
          label: 'AI Robot dog',
          title: 'AI Robot Dog',
          body: 'Voice-first interaction for chat, weather, time, and music. Control motion by voice or gesture; combine vision and speech for multimodal recognition and responsive behavior.',
          mediaType: 'image',
          mediaSrc: 'https://images.tuyacn.com/fe-static/docs/img/17dcaa9c-1ffc-4bda-b07f-eae9029cfed0.png',
          mediaAlt: 'AI robot dog.',
        },
        {
          id: 'ai-wearable-badge',
          label: 'AI Wearable badge',
          title: 'AI Wearable Badge',
          body: 'A ~4 cm wearable focused on emotional connection—idols, partners, or fan communities—through AI voice, dynamic visuals, and lightweight social hooks. Carry a character you care about with always-on, glanceable interaction.',
          mediaType: 'image',
          mediaSrc: 'https://images.tuyacn.com/fe-static/docs/img/4cf677ee-9195-4ab3-956d-5347639d4afa.png',
          mediaAlt: 'AI wearable badge pendant.',
        },
        {
          id: 'aiot-industry-devices',
          label: 'AIoT industry',
          title: 'AIoT Industry Devices',
          body: 'Use TuyaOpen sources to build Wi-Fi IoT products that join the Tuya ecosystem. Map device capabilities to Data Points (DP) and configure cloud behavior with low-code tools on the Tuya developer platform.',
          mediaType: 'image',
          mediaSrc: 'https://images.tuyacn.com/fe-static/docs/img/25c41ea4-6c2a-4bdd-9384-4cca1011c894.png',
          mediaAlt: 'AIoT industry IoT device concept.',
        },
        {
          id: 'industry-smart-building',
          label: 'AI Smart building',
          title: 'Smart home & smart building',
          body: 'Ship lighting, climate, access, and sensing with the same SDK across MCUs and SoCs. Standard IoT and Data Points (DP) map cleanly to Tuya Cloud for remote control, monitoring, and OTA—while agentic workflows add voice-first assistants, scenes, and context-aware policies without stitching integrations yourself. The more you use it, the smarter the agent becomes.',
          mediaType: 'image',
          mediaSrc:
            'https://images.unsplash.com/photo-1604328727766-a151d1045ab4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          mediaAlt: 'Modern workspace and collaborative smart-building environment.',
          mediaCredit: {
            label: 'Photo: Copernico on Unsplash',
            href: 'https://unsplash.com/@copernicowork',
          },
        },
        {
          id: 'industry-industrial-energy',
          label: 'AI Industrial',
          title: 'Industrial & energy',
          body: 'Connect machines, meters, and gateways over Wi-Fi where it fits your plant or field architecture. Use TuyaOpen for reliable firmware, secure device lifecycle, and streaming telemetry; pair with cloud agents for alerting, diagnostics, and operational copilots that turn raw signals into decisions.',
          mediaType: 'image',
          mediaSrc:
            'https://images.unsplash.com/photo-1620203853151-496c7228306c?q=80&w=1596&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          mediaAlt: 'Wind turbines and solar panels at sunset—industrial renewable energy.',
          mediaCredit: {
            label: 'Photo: rGaleria on Unsplash',
            href: 'https://unsplash.com/@rgaleriacom',
          },
        },
        {
          id: 'industry-retail-hospitality',
          label: 'AI Retail',
          title: 'Retail & hospitality',
          body: 'Power connected displays, kiosks, and service-style devices that need natural interaction and multimodal input. IoT ties the hardware to the cloud; agentic AI on Tuya Cloud supports multilingual dialogue, custom agent workflows, MCP tools, RAG-style memory, and more toolkits you can configure.',
          mediaType: 'image',
          mediaSrc:
            'https://images.unsplash.com/photo-1764795849878-59b546cfe9c7?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          mediaAlt: 'Bright café or hospitality interior with seating and natural light.',
          mediaCredit: {
            label: 'Photo: Cova Software on Unsplash',
            href: 'https://unsplash.com/@covasoftware',
          },
        },
      ],
    },
    developerStory: {
      sectionTag: 'Developer Story',
      title: 'Cattle Tracking with AI Agents',
      subtitle: 'HTX Studio: Bringing Smart Farming to Remote Villages',
      story:
        'When HTX Studio stepped into remote mountain villages, they saw farmers trekking rough slopes daily to find cattle, getting hurt again and again, while regular (4G Cellular) trackers simply lost signal in blind mountain terrain. Moved to help, the team leveraged TuyaOpen open-source capabilities to integrate long-range LoRa connectivity with local-dialect AI voice interaction. They quickly built a complete smart grazing system, skipping heavy low-level bottlenecks. With ready device-cloud and AI toolchains, they turned empathy into simple, reliable smart technology for farmers deep in the mountains. Conversational AI cattle tracking makes daily interaction easier, with almost no learning curve for elderly users.',
      highlights: [
        'Built with TuyaOpen',
        'Agentic interaction with location awareness and LLM interpretation',
        'Core hardware: Tuya T5',
        'Custom-integrated GPS, LoRa, and accelerometer modules',
        '4G cellular connectivity module paired with Tuya T5',
        'Audio support for ASR and OLED display for tracking status',
      ],
      videoAriaLabel: 'AI cattle herding developer story video',
      videoEmbed: {
        src: 'https://www.youtube.com/embed/h_NnHgmB530?rel=0',
        title: 'AI Cattle Herdeling demo video',
      },
      galleryAriaLabel: 'AI cattle herding gallery images',
      galleryImages: [
        {
          src: 'https://images.tuyacn.com/fe-static/docs/img/ac0b58f9-e097-451b-a30f-d9fac6187f13.jpg',
          alt: 'AI cattle herding gallery image 1.',
        },
        {
          src: 'https://images.tuyacn.com/fe-static/docs/img/54d885f5-7330-4a2a-a1ce-fd245f14469f.jpg',
          alt: 'AI cattle herding gallery image 2.',
        },
        {
          src: 'https://images.tuyacn.com/fe-static/docs/img/4f08951a-5c4d-45f3-bc60-c19ea4a2d544.jpg',
          alt: 'AI cattle herding gallery image 3.',
        },
        {
          src: 'https://images.tuyacn.com/fe-static/docs/img/7aeb0a86-197d-421a-b0c8-4e3495697b56.jpg',
          alt: 'AI cattle herding gallery image 4.',
        },
        {
          src: 'https://images.tuyacn.com/fe-static/docs/img/ce94036a-6fa7-4758-9331-de6f5ef751cc.jpg',
          alt: 'AI cattle herding gallery image 5.',
        },
        {
          src: 'https://images.tuyacn.com/fe-static/docs/img/3a7a3d50-70a0-4f92-98bd-4a1456193917.jpg',
          alt: 'AI cattle herding gallery image 6.',
        },
        {
          src: 'https://images.tuyacn.com/fe-static/docs/img/7874237c-5f1b-491f-87c9-de8f8e3c040a.jpg',
          alt: 'AI cattle herding gallery image 7.',
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
      line1: 'Agentic AI',
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
        {
          title: '从原型到量产',
          body: '面向生产的架构从第一天开始：可复用分层、稳定连接、安全能力与可扩展云端集成，帮助团队更少返工，更快从 PoC 走向可交付产品。',
        },
      ],
    },
    audience: {
      sectionTag: '适合谁？',
      title: '面向每一类硬件创造者',
      subtitle: '从第一个原型到规模化交付，TuyaOpen 帮你更快做出更酷的 IoT 与智能体硬件。',
      items: [
        {
          title: '学生与学习者',
          body: '用真实可跑的工程栈把想法变成设备，在实践中快速掌握 AI+IoT 开发，而不是停留在玩具示例。',
        },
        {
          title: '创客与 IoT 爱好者',
          body: '从灵感到成品 Demo 更高效。可复用分层与现成能力减少胶水代码，让硬件创意更快落地。',
        },
        {
          title: '智能体硬件开发者',
          body: '围绕语音优先与多模态交互打造产品，结合智能体工作流、工具能力与云端编排，直接映射到真实设备。',
        },
        {
          title: '商业化产品团队',
          body: '以量产为导向的架构配合安全、OTA 与可扩展云能力，降低研发风险，加速从验证到上市。',
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
      diagramUrl: 'https://images.tuyacn.com/fe-static/docs/img/207eb9a0-5583-4f04-a71d-1917cbefc5ba.png',
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
      intro: '从可落地的 Demo 快速上手：先选目标应用，再跳转源码与指南，几分钟即可在开发板跑通。',
      items: [
        {
          name: 'switch_demo',
          desc: '覆盖配网、连接、云端控制与 OTA 的基础 IoT 固件，适配多类目标硬件。提供简单直观的 IoT 开关示例，并支持可控的 App 面板。',
          codeLink: 'https://github.com/tuya/TuyaOpen/tree/master/apps/tuya_cloud/switch_demo',
          guideLink: '/docs/applications/tuya_cloud/demo-tuya-iot-light',
        },
        {
          name: 'your_chat_bot',
          desc: '语音优先的 AI 对话 Demo，支持智能体交互，面向 T5AI、ESP32-S3 与 Raspberry Pi 4/5 等平台。支持多模态输入与技能扩展，适合个人助理与自然对话体验。',
          codeLink: 'https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/your_chat_bot',
          guideLink: '/docs/applications/tuya.ai/demo-your-chat-bot',
        },
        {
          name: 'duo_eye_mood',
          desc: '双眼表情与情绪视觉联动，并支持对话交互，适配 T5AI 平台。',
          codeLink: 'https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/duo_eye_mood',
          guideLink: '/docs/applications/tuya.ai/demo-duo-eyes-mood',
        },
        {
          name: 'Rich Peripheral Examples',
          desc: '从硬件协议、OS 系统编程到 LVGL GUI 与通用示例，作为快速上手的高价值积木组合。',
          codeLink: 'https://github.com/tuya/TuyaOpen/tree/master/examples',
          guideLink: '/docs/hardware-specific/Linux/raspberry-pi/Examples/peripherals-raspberry-pi',
          hideGuide: true,
        },
      ],
      cta: '浏览应用',
      codeCta: '源码',
      guideCta: '指南',
    },
    socialProof: {
      items: [
        { label: 'Apache 2.0', hint: '开源许可证' },
        { label: 'C/C++ SDK', hint: '从 MCU 到 SoC 的跨平台能力' },
        { label: '涂鸦云', hint: '物联网 + 多模态 AI' },
        { label: '社区', hint: 'GitHub 与 Discord · 8000+ 活跃开发者' },
      ],
    },
    steps: {
      title: '三步上手',
      items: [
        {
          title: '1. TuyaOpen 授权码',
          body: '连接涂鸦云需要 TuyaOpen 专用授权码（UUID + AuthKey）。获取与写入方式见快速开始。',
          ctaLink: '/pricing',
          ctaLabel: '获取 TuyaOpen 授权码',
        },
        {
          title: '2. 克隆、初始化 SDK、选板',
          body: '从 GitHub 或 Gitee 克隆仓库，进入根目录后执行 export 脚本（Linux/macOS：. ./export.sh；Windows：export.ps1 或 export.bat）以激活 tos.py。在根目录执行 tos.py check，再进入应用工程目录使用 tos.py config choice 选择开发板。',
          ctaLink: '/docs/quick-start/enviroment-setup',
          ctaLabel: '分步指南',
        },
        {
          title: '3. 编译与烧录',
          body: '在应用目录执行 tos.py build 与 tos.py flash。需要串口日志或授权信息时使用 tos.py monitor。',
        },
      ],
    },
    t5: {
      title: '涂鸦 T5 芯片 Agentic AI 高性价比之选',
      body: '涂鸦 T5 芯片/模组是一款高性能嵌入式 Wi-Fi 6 + 蓝牙 5.4 双模通信模组，内嵌 ARMv8-M Star (M33F) 处理器，主频高达 480MHz。芯片面向多模态 AI 交互场景而设计，支持音频、视频与显示能力。丰富 GPIO 资源可加速集成，内置 Wi-Fi 6（2.4G）与 BLE 连接能力，帮助产品快速落地。',
      imageSrc: 'https://images.tuyacn.com/fe-static/docs/img/8eb57de9-ec7b-4f8d-b602-e86f9e24f94a.png',
      imageAlt: '涂鸦 T5 芯片板卡图片。',
    },
    arduinoExperimental: {
      sectionTag: '实验性功能',
      title: '使用 Arduino IDE 开发智能体 AI 硬件。',
      body: '在 T5 上沿用熟悉的 Arduino 工作流——板级支持与库与 TuyaOpen 打通，更快验证智能体 AI 硬件原型。',
      imageUrl: 'https://images.tuyacn.com/fe-static/docs/img/e413737d-6270-4758-aff1-3a039c5d81b3.jpg',
      imageAlt: '深色主题下 Arduino IDE 中的 TuyaOpen 开发界面',
      ctaPath: '/docs/hardware-specific/tuya-t5/develop-with-Arduino/Quick_start',
    },
    tuyaAi: {
      sectionTag: '多模态 AI',
      title: 'Tuya AI：零代码云平台',
      body: 'Tuya AI：端云协同的多模态智能，支持端侧推理与云端智能体中枢，可接入 DeepSeek、ChatGPT、Claude、Gemini 等模型，并支持语音/文本交互与图像/视频生成等跨模态能力。基于 Tuya Cloud 平台，你可以零代码构建智能体，并按业务需求自定义 IoT 行为，无需反复改固件。',
      highlights: [
        'Agentic Hardware Control',
        'Memory RAG',
        'Agent Workflow',
        'Agent Prompting',
        'ASR',
        'Skills（天气、IoT 控制、和第三方）',
        'Model Context Protocols (MCPs)',
      ],
      images: [
        {
          src: 'https://images.tuyacn.com/content-platform/hestia/17387367985ed6a35665b.png',
          alt: 'Tuya AI 平台界面截图：总览。',
        },
        {
          src: 'https://images.tuyacn.com/content-platform/hestia/1744265039409b61af6dd.png',
          alt: 'Tuya AI 平台界面截图：多模态与智能体能力。',
        },
        {
          src: 'https://images.tuyacn.com/content-platform/hestia/17472931805c7ebbec7fe.png',
          alt: 'Tuya AI 平台界面截图：云端与模型接入。',
        },
      ],
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
        {
          title: '社区与生态合作伙伴',
          items: [
            {
              alt: 'Arduino 中文社区',
              src: 'https://images.tuyacn.com/fe-static/docs/img/d6bfd773-54f6-4c3a-807d-7bf91dffc5e6.png',
            },
            {
              alt: 'CSDN',
              src: 'https://images.tuyacn.com/fe-static/docs/img/5bd5a630-e9e2-42bd-8be9-8ef23962ad09.png',
            },
            {
              alt: 'GigaDev',
              src: 'https://images.tuyacn.com/fe-static/docs/img/78e893ea-6de1-447d-850b-4f35126da817.png',
            },
            {
              alt: 'Hackster.io',
              src: 'https://images.tuyacn.com/fe-static/docs/img/cbb2e6ff-8c80-4220-800e-55a9855e6a7e.png',
            },
            {
              alt: 'OpenJumper',
              src: 'https://images.tuyacn.com/fe-static/docs/img/d2f86404-5b90-4f53-888d-a37fb06181ca.png',
            },
            {
              alt: 'OSCHINA',
              src: 'https://images.tuyacn.com/fe-static/docs/img/e43bce40-9efc-4ade-b49a-79dc6496ac8b.png',
            },
            {
              alt: 'OSHWHub',
              src: 'https://images.tuyacn.com/fe-static/docs/img/6ec76beb-1f31-482b-806f-2f8668617ad2.png',
            },
            {
              alt: 'Silicon Labs',
              src: 'https://images.tuyacn.com/fe-static/docs/img/4437cbf1-a892-4d9d-8512-c6f5eb077454.png',
            },
            {
              alt: '世强',
              src: 'https://images.tuyacn.com/fe-static/docs/img/1c904de4-5200-416c-8d1d-cc25248f69e7.png',
            },
            {
              alt: '地瓜机器人 D-Robotics',
              src: 'https://images.tuyacn.com/fe-static/docs/img/a2d0672b-d49c-401f-a2ef-d97355443258.png',
            },
            {
              alt: '微雪电子 Waveshare',
              src: 'https://images.tuyacn.com/fe-static/docs/img/aaeb694c-029b-4066-9e80-f62864439655.png',
            },
            {
              alt: '正点电子',
              src: 'https://images.tuyacn.com/fe-static/docs/img/02e7aeb1-5a70-4f49-bdfa-f33acb8657aa.png',
            },
            {
              alt: '电子发烧友',
              src: 'https://images.tuyacn.com/fe-static/docs/img/30d4d462-afc6-4369-a297-f4d4f939d913.png',
            },
            {
              alt: '百问网',
              src: 'https://images.tuyacn.com/fe-static/docs/img/75ba59d8-4174-4836-af42-bf0f71bf34ca.png',
            },
            {
              alt: '野火电子',
              src: 'https://images.tuyacn.com/fe-static/docs/img/65d2ee1f-ab95-4ed7-9205-21e4b49e8e23.png',
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
        '基于 TuyaOpen 的参考设计、产品与行业范式：上方为具体产品，另含智能家居与建筑、工业与能源、零售与酒店服务——物联网与智能体能力同一套栈。',
      navAriaLabel: '选择应用或用例',
      items: [
        {
          id: 'emoji-desktop-robot',
          label: 'AI Emoji 桌面机器人',
          title: 'AI Emoji 桌面机器人',
          body: '桌面陪伴型设备，将丰富的表情呈现与「听得懂、看得懂」的 AI 能力结合。支持 AI 语音与手势识别，挥手或开口即可驱动屏幕灵活转动，互动自然、玩法多样。',
          mediaType: 'image',
          mediaSrc: 'https://images.tuyacn.com/fe-static/docs/img/a1b664f3-0854-4a33-bb64-9c91c5357a11.png',
          mediaAlt: 'Emoji 桌面机器人产品展示。',
        },
        {
          id: 'otto-robot',
          label: 'AI OTTO',
          title: 'AI OTTO 机器人',
          body: '造型轻巧可爱，由 T5-E1 模组驱动六路舵机，可完成摇摆、月球步、跳跃等灵动动作；双路 SPI 智能眼睛增强神态。支持 App 遥控与语音唤醒，动作与展示模式切换简单，兼顾观赏与互动。',
          mediaType: 'image',
          mediaSrc: 'https://images.tuyacn.com/fe-static/docs/img/1f7ea16f-b8ac-4b2c-9949-68ae0ea24af3.png',
          mediaAlt: 'OTTO 双足机器人与智能眼睛。',
        },
        {
          id: 'ai-pixels',
          label: 'AI Pixels',
          title: 'AI Pixels 像素屏',
          body: '基于 TuyaOpen 与高性能涂鸦 T5 Wi-Fi/蓝牙模组的紧凑像素屏，软硬件开源。可与手机 App 定制组件，并在涂鸦开发者平台上对接 AI Agent、MCP、文生图等能力，实现「喊一声，像素动起来」的创意场景。',
          mediaType: 'image',
          mediaSrc: 'https://images.tuyacn.com/fe-static/docs/img/ff6bdaa1-18c1-4702-ae39-ed34eaaf37b4.png',
          mediaAlt: 'AI Pixels 高密度像素屏。',
        },
        {
          id: 'ai-pocket-console',
          label: 'AI 口袋机',
          title: 'AI 口袋机',
          body: '面向多模态大模型智能体的便携形态：虚拟宠物、对话管家与可定制的全屋设备联动，在涂鸦生态内完成控制与被控。',
          highlights: [
            '多模态大模型 AI-Agent 端云协同开发',
            'AI 虚拟宠物（拓麻歌子式玩法）',
            'AI 管家：开放问答',
            '智能居家：自定义联网 IoT 设备，接入涂鸦 App 控制与被控',
          ],
          mediaType: 'image',
          mediaSrc: 'https://images.tuyacn.com/fe-static/docs/img/cb944b70-3a99-4193-8cd2-55d071dfca94.png',
          mediaAlt: 'AI 口袋机设备。',
        },
        {
          id: 'ai-companion-avatar',
          label: 'AI 数字陪伴',
          title: 'AI 数字陪伴',
          body: '桌面数字陪伴方案：混合语音与语义理解，配合 3D 形象与动作联动，呈现连贯的陪伴与互动体验。',
          highlights: [
            '主控：Raspberry Pi 5',
            '显示：Waveshare 10.4 寸 QLED 全贴合触控屏（10.4HP-CAPQLED）',
            '系统：Raspberry Pi OS（定制优化）',
            '框架：TuyaOpen + 自研动作控制',
            '语音：本地/云端混合语音识别、语义理解、情绪与表达生成',
            '形象：3D 渲染与 AI 动作系统（表情与肢体联动）',
          ],
          mediaType: 'image',
          mediaSrc: 'https://images.tuyacn.com/fe-static/docs/img/54d5130d-9c7b-4784-9f67-b7be40a90033.png',
          mediaAlt: 'AI 数字陪伴与显示屏。',
        },
        {
          id: 'ai-robot-dog',
          label: 'AI 机器狗',
          title: 'AI 机器狗',
          body: '支持 AI 语音对话、天气与时间查询、音乐播放；手势或语音控制动作，并具备视觉与语音多模态识别能力，行为响应更自然。',
          mediaType: 'image',
          mediaSrc: 'https://images.tuyacn.com/fe-static/docs/img/17dcaa9c-1ffc-4bda-b07f-eae9029cfed0.png',
          mediaAlt: 'AI 机器狗。',
        },
        {
          id: 'ai-wearable-badge',
          label: 'AI 挂件',
          title: 'AI 挂件',
          body: '以明星、情侣或二次元等情感陪伴为核心，结合 AI 语音、动态视觉与社群联动，将角色装进约 4 cm 随身挂件，便于应援、传情与高频互动。',
          mediaType: 'image',
          mediaSrc: 'https://images.tuyacn.com/fe-static/docs/img/4cf677ee-9195-4ab3-956d-5347639d4afa.png',
          mediaAlt: 'AI 随身挂件。',
        },
        {
          id: 'aiot-industry-devices',
          label: 'AIoT 行业设备',
          title: 'AIoT 行业物联网设备',
          body: '基于 TuyaOpen 开源代码定制开发可接入涂鸦生态的 Wi-Fi 物联网设备；通过 DP（Data Point）建模能力，并在云端以低代码方式完成配置与运营。',
          mediaType: 'image',
          mediaSrc: 'https://images.tuyacn.com/fe-static/docs/img/25c41ea4-6c2a-4bdd-9384-4cca1011c894.png',
          mediaAlt: 'AIoT 行业物联网设备概念。',
        },
        {
          id: 'industry-smart-building',
          label: 'AI 智能建筑',
          title: '智能家居与智能建筑',
          body: '以同一套 SDK 覆盖 MCU 与 SoC，交付照明、环控、门禁与传感等能力。通过标准物联网与 DP（Data Point）对接涂鸦云，实现远程控制、监控与 OTA；在云端编排语音优先、场景化与具备上下文的智能体策略，无需从零搭建各类集成。使用越久，智能体越能持续学习、响应越智能。',
          mediaType: 'image',
          mediaSrc:
            'https://images.unsplash.com/photo-1604328727766-a151d1045ab4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          mediaAlt: '现代协作空间与智能建筑场景。',
          mediaCredit: {
            label: '图片来源：Copernico（Unsplash）',
            href: 'https://unsplash.com/@copernicowork',
          },
        },
        {
          id: 'industry-industrial-energy',
          label: 'AI 工业能源',
          title: '工业与能源',
          body: '在适合的网络架构下接入产线设备、表计与网关。TuyaOpen 支撑可靠固件、设备生命周期与安全连接；遥测数据上云后，可结合云端智能体做告警、诊断与运维辅助，让数据从「可见」走向「可决策」。',
          mediaType: 'image',
          mediaSrc:
            'https://images.unsplash.com/photo-1620203853151-496c7228306c?q=80&w=1596&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          mediaAlt: '日落时分的工业风电与光伏场景。',
          mediaCredit: {
            label: '图片来源：rGaleria（Unsplash）',
            href: 'https://unsplash.com/@rgaleriacom',
          },
        },
        {
          id: 'industry-retail-hospitality',
          label: 'AI 零售酒店',
          title: '零售与酒店服务',
          body: '支撑互联屏、自助终端与类服务机器人等需要自然交互与多模态输入的设备。物联网将硬件接入云端；涂鸦云上的智能体 AI 支持多语言对话、自定义智能体工作流、MCP、RAG 记忆与更多可配置的工具能力。',
          mediaType: 'image',
          mediaSrc:
            'https://images.unsplash.com/photo-1764795849878-59b546cfe9c7?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          mediaAlt: '明亮的咖啡馆或酒店餐饮空间。',
          mediaCredit: {
            label: '图片来源：Cova Software（Unsplash）',
            href: 'https://unsplash.com/@covasoftware',
          },
        },
      ],
    },
    developerStory: {
      sectionTag: '开发者故事',
      title: 'AI 智能体 · 放牛神助攻',
      subtitle: '何同学：让山里养殖也能搭上智能快车',
      story:
        '何同学走进深山，亲眼看见农户日日爬陡坡寻牛，摔过、累过，普通定位器进了山里就彻底失联。心里放不下这份难处，团队决定用技术暖心相助。依托 TuyaOpen 开源能力，快速打通 LoRa 远距通信与方言 AI 语音，轻巧搭起整套智能放牛系统。不用啃底层难题，靠着成熟的端云与 AI 工具，把贴心好用的智慧方案，稳稳送到大山田间。通过对话式 AI 放牛追踪，日常交互更轻松，老年用户也几乎无需学习成本。',
      highlights: [
        '基于 TuyaOpen 构建',
        '具备位置感知与 LLM 语义理解的智能体交互',
        '核心硬件：Tuya T5',
        '自定义集成 GPS、LoRa 与加速度传感模块',
        '4G 蜂窝通信模块与 Tuya T5 组合部署',
        '支持 ASR 语音能力，并通过 OLED 显示追踪状态',
        'LoRa 组网能力，支持后续扩展',
      ],
      videoAriaLabel: 'AI 智能放牛开发者故事视频',
      videoEmbed: {
        src: '//player.bilibili.com/player.html?isOutside=true&aid=115570020190349&bvid=BV17PygBiETq&cid=34088224972&p=1',
        title: 'AI Cattle Herdeling 演示视频',
      },
      galleryAriaLabel: 'AI 智能放牛图片画廊',
      galleryImages: [
        {
          src: 'https://images.tuyacn.com/fe-static/docs/img/ac0b58f9-e097-451b-a30f-d9fac6187f13.jpg',
          alt: 'AI 智能放牛画廊图片 1。',
        },
        {
          src: 'https://images.tuyacn.com/fe-static/docs/img/54d885f5-7330-4a2a-a1ce-fd245f14469f.jpg',
          alt: 'AI 智能放牛画廊图片 2。',
        },
        {
          src: 'https://images.tuyacn.com/fe-static/docs/img/4f08951a-5c4d-45f3-bc60-c19ea4a2d544.jpg',
          alt: 'AI 智能放牛画廊图片 3。',
        },
        {
          src: 'https://images.tuyacn.com/fe-static/docs/img/7aeb0a86-197d-421a-b0c8-4e3495697b56.jpg',
          alt: 'AI 智能放牛画廊图片 4。',
        },
        {
          src: 'https://images.tuyacn.com/fe-static/docs/img/ce94036a-6fa7-4758-9331-de6f5ef751cc.jpg',
          alt: 'AI 智能放牛画廊图片 5。',
        },
        {
          src: 'https://images.tuyacn.com/fe-static/docs/img/3a7a3d50-70a0-4f92-98bd-4a1456193917.jpg',
          alt: 'AI 智能放牛画廊图片 6。',
        },
        {
          src: 'https://images.tuyacn.com/fe-static/docs/img/7874237c-5f1b-491f-87c9-de8f8e3c040a.jpg',
          alt: 'AI 智能放牛画廊图片 7。',
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
