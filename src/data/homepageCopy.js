/**
 * Homepage copy for root `/` — aligned with docs (about-tuyaopen, quick-start, applications, tos-tools).
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
      tosGuide: 'CLI - tos.py Development Tool',
      envSetup: 'Environment setup',
    },
    ideLaunch: {
      badge: 'New Release',
      title: 'Meet TuyaOpen IDE',
      subtitle: 'The all-in-one, AI Coding development tool for AI hardware.',
      body: 'From project creation to device firmware, cloud Agent, and App development — three platforms unified in one workflow. Vibe-code your next device with the AI coding agent you already love.',
      highlights: [
        'AI coding-agent extension for VS Code & Cursor',
        'Hardware-in-the-loop build, flash & debug',
        'Unified firmware · cloud · app workflow',
      ],
      primaryCta: 'Explore TuyaOpen IDE',
      secondaryCta: 'Install Extension',
      primaryPath: '/tuyaopen-ide',
      secondaryUrl: '/tuyaopen-ide#download',
      image: 'https://images.tuyacn.com/fe-static/docs/img/83d924fd-d76b-4692-b844-5c15a4ddb0fe.png',
      imageAlt: 'TuyaOpen IDE interface',
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
    realWorldValidation: {
      sectionTag: 'VIBECODING & HARDWARE IN-THE-LOOP',
      newBadgeLabel: 'NEW',
      titleAccent: 'Vibe Coding Workflows',
      titleBase: 'Real-World Hardware',
      bodyBefore: 'We built a ',
      bodyHighlight: 'TuyaOpen SDK Expert Skill',
      bodyAfter:
        ' with deep know-how for real hardware—optimized for VibeCoding. It guides you from new project setup and device authentication through build, flash, debug, and injected event testing, with a hardware-in-the-loop mindset so shipping connected AI device hardware is faster and easier.',
      consoleTitle: 'VibeCoding agent',
      devSkillsCopyText: 'Install the TuyaOpen Dev Skills from https://github.com/tuya/TuyaOpen-dev-skills',
      devSkillsToolsHint:
        'Paste into the chat or agent sidebar in: Cursor, Claude Code, Amazon Kiro, and other vibe-coding tools that load skills.',
      devSkillsCopyButton: 'Copy install prompt',
      devSkillsCopyButtonAria: 'Copy TuyaOpen Dev Skills install prompt to clipboard',
      devSkillsCopiedLabel: 'Copied',
      devSkillsPasteHint: 'Paste it into your coding agent or chat.',
      consoleStatus: '● LIVE',
      consoleChannels: [
        { id: 'VibeCoding', tone: 'teal' },
        { id: 'BUILD', tone: 'amber' },
        { id: 'FLASH', tone: 'orange' },
        { id: 'AUTH', tone: 'purple' },
        { id: 'CLOUD', tone: 'blue' },
      ],
      hilTerminalUserLabel: 'User',
      hilTerminalAgentLabel: 'Agent>',
      /**
       * `delayBefore` = relative weight; runtime scales so intro + all steps + tail budget ≈ 10s, then 5s pause before repeat.
       */
      hilTerminalSequence: [
        { kind: 'user', delayBefore: 480, text: 'Create a TuyaCloud IoT connected humidity sensor.' },
        { kind: 'agent', delayBefore: 820, text: 'Initializing VibeCoding AI...' },
        {
          kind: 'log',
          delayBefore: 120,
          tag: 'VibeCoding',
          tone: 'teal',
          text: 'Fetching latest Tuya IoT SDK...',
          diagramIndex: 0,
        },
        {
          kind: 'log',
          delayBefore: 58,
          tag: 'VibeCoding',
          tone: 'teal',
          text: 'Analysing compatible I2C humidity sensors...',
        },
        { kind: 'log', delayBefore: 58, tag: 'VibeCoding', tone: 'teal', text: 'Suggesting: HDC1080, SHT31, AHT20' },
        { kind: 'log', delayBefore: 58, tag: 'VibeCoding', tone: 'teal', text: 'Selecting driver: SHT31' },
        { kind: 'log', delayBefore: 58, tag: 'VibeCoding', tone: 'teal', text: 'Forking template: iot_sensor_base' },
        {
          kind: 'log',
          delayBefore: 58,
          tag: 'VibeCoding',
          tone: 'teal',
          text: 'Setting up project: "IoT_Humidity_Sensor"',
        },
        { kind: 'log', delayBefore: 58, tag: 'VibeCoding', tone: 'teal', text: 'Migrating codebase...' },
        { kind: 'log', delayBefore: 58, tag: 'VibeCoding', tone: 'teal', text: 'Adding Hardware Debug CLI support...' },
        {
          kind: 'log',
          delayBefore: 58,
          tag: 'VibeCoding',
          tone: 'teal',
          text: 'Generating TuyaCloud DP (Datapoint) interface for Humidity...',
        },
        { kind: 'agent', delayBefore: 780, text: 'Build and Flash' },
        {
          kind: 'log',
          delayBefore: 120,
          tag: 'BUILD',
          tone: 'amber',
          text: 'Compiling firmware... (37 files, GCC 10.3)',
          diagramIndex: 1,
        },
        { kind: 'log', delayBefore: 55, tag: 'BUILD', tone: 'amber', text: 'Linking...' },
        {
          kind: 'log',
          delayBefore: 55,
          tag: 'BUILD',
          tone: 'amber',
          text: '✓ Success: app_iot_humidity_sensor.bin (412 KB)',
        },
        {
          kind: 'log',
          delayBefore: 55,
          tag: 'FLASH',
          tone: 'orange',
          text: 'T5AI DevKit detected @COM4',
          diagramIndex: 1,
        },
        {
          kind: 'log',
          delayBefore: 52,
          tag: 'FLASH',
          tone: 'orange',
          text: 'Erasing flash @ 0x10000... ✓ Done (2.3s)',
        },
        { kind: 'log', delayBefore: 52, tag: 'FLASH', tone: 'orange', text: 'Writing firmware... (412 KB / 412 KB)' },
        { kind: 'log', delayBefore: 52, tag: 'FLASH', tone: 'orange', text: 'Verifying... ✓ Done' },
        { kind: 'log', delayBefore: 52, tag: 'FLASH', tone: 'orange', text: 'Rebooting device...' },
        { kind: 'agent', delayBefore: 800, text: 'Authenticating Device' },
        {
          kind: 'log',
          delayBefore: 120,
          tag: 'AUTH',
          tone: 'purple',
          text: 'Requesting Tuya Device ID...',
          diagramIndex: 2,
        },
        { kind: 'log', delayBefore: 55, tag: 'AUTH', tone: 'purple', text: 'Downloading credentials' },
        {
          kind: 'log',
          delayBefore: 55,
          tag: 'AUTH',
          tone: 'purple',
          text: 'Writing credentials: product_id=3FB2XXZ1, uuid=b1994432...',
        },
        { kind: 'log', delayBefore: 55, tag: 'AUTH', tone: 'purple', text: '✓ Device Authenticated' },
        { kind: 'agent', delayBefore: 820, text: 'Start Monitor, Debug Output' },
        {
          kind: 'log',
          delayBefore: 120,
          tag: 'DEBUG',
          tone: 'blue',
          text: 'Opening UART Console @115200 baud',
          diagramIndex: 4,
        },
        {
          kind: 'log',
          delayBefore: 55,
          tag: 'I2C',
          tone: 'green',
          text: 'Scanning I2C bus... Found device: 0x44 (SHT31)',
        },
        { kind: 'log', delayBefore: 55, tag: 'SENSOR', tone: 'green', text: 'Initializing sensor SHT31... OK' },
        { kind: 'log', delayBefore: 55, tag: 'SENSOR', tone: 'green', text: 'Reading humidity value...' },
        {
          kind: 'log',
          delayBefore: 55,
          tag: 'SENSOR',
          tone: 'green',
          text: 'Raw: 0x02D9  | Temp: 22.7C  | Humidity: 46.3%',
        },
        {
          kind: 'log',
          delayBefore: 55,
          tag: 'SENSOR',
          tone: 'green',
          text: 'Raw: 0x01E2  | Temp: 22.8C  | Humidity: 45.2%',
        },
        {
          kind: 'log',
          delayBefore: 55,
          tag: 'NETWORK',
          tone: 'purple',
          text: "Attempting to connect WiFi 'TUYA_TEST_LAB'...",
          diagramIndex: 4,
        },
        {
          kind: 'log',
          delayBefore: 55,
          tag: 'NETWORK',
          tone: 'purple',
          text: 'Connected, RSSI: -47dBm, IP: 192.168.0.122',
        },
        {
          kind: 'log',
          delayBefore: 55,
          tag: 'CLOUD',
          tone: 'blue',
          text: 'Binding device to TuyaCloud... OK',
          diagramIndex: 4,
        },
        {
          kind: 'log',
          delayBefore: 55,
          tag: 'CLOUD',
          tone: 'blue',
          text: 'Reporting Humidity: 45.2%',
          diagramIndex: 4,
        },
        { kind: 'log', delayBefore: 55, tag: 'LOG', tone: 'green', text: 'Awaiting cloud command...' },
        { kind: 'agent', delayBefore: 800, text: 'Inject Hardware CLI Test' },
        {
          kind: 'log',
          delayBefore: 120,
          tag: 'HW_CLI',
          tone: 'orange',
          text: '> connect_wifi --ssid TUYA_TEST_LAB --psk ***',
          diagramIndex: 3,
        },
        { kind: 'log', delayBefore: 55, tag: 'HW_CLI', tone: 'orange', text: '> force_sensor_cycle' },
        { kind: 'log', delayBefore: 55, tag: 'HW_CLI', tone: 'orange', text: 'User triggered manual read event' },
        {
          kind: 'log',
          delayBefore: 55,
          tag: 'SENSOR',
          tone: 'green',
          text: 'Raw: 0x021D  | Temp: 22.6C  | Humidity: 44.7%',
        },
        {
          kind: 'log',
          delayBefore: 55,
          tag: 'CLOUD',
          tone: 'blue',
          text: 'Reporting Humidity: 44.7%',
          diagramIndex: 4,
        },
        { kind: 'log', delayBefore: 55, tag: 'DEBUG', tone: 'blue', text: 'Log streaming active...' },
      ],
      diagramCenterLabel: 'DEVICE',
      diagramCenterSub: 'Tuya T5 / ESP32',
      diagramNodes: [
        { id: 'vibe', label: 'Vibe coding' },
        { id: 'build', label: 'Create/Build/Flash' },
        { id: 'auth', label: 'Auth Credentials' },
        { id: 'cli', label: 'CLI Testing' },
        { id: 'debug', label: 'Debugging' },
      ],
      steps: [
        {
          num: '01',
          title: 'New Project, build, and flash',
          body: 'VibeCoding narrows SDK and peripherals, forks a template, wires DP and CLI hooks, then compiles and flashes a binary to hardware—the create, build, and flash lane in the demo.',
        },
        {
          num: '02',
          title: 'Authenticate and connect',
          body: 'Provision device identity, open the monitor stream, attach Wi-Fi, bind to Tuya Cloud, and push DP telemetry—the auth credentials and live cloud path you see in the log.',
        },
        {
          num: '03',
          title: 'Debug and CLI test',
          body: 'Read UART, I2C, and sensor output in real time, then inject hardware CLI commands to force reads and connectivity checks—debugging plus scripted hardware tests on the board.',
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
          guideLink: '/docs/cloud/iot-client/demo-tuya-iot-light',
        },
        {
          name: 'your_chat_bot',
          desc: 'Voice-first AI chat demo with agent interaction, tuned for T5AI, ESP32-S3, and Raspberry Pi 4/5 class devices. Supports multimodal input and skill extension, ideal for personal assistants and conversational experiences.',
          codeLink: 'https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/your_chat_bot',
          guideLink: '/docs/cloud/device-ai/demo-your-chat-bot',
        },
        {
          name: 'duo_eye_mood',
          desc: 'Dual-eye expressive demo with eye and mood visuals, plus conversational interaction on T5AI.',
          codeLink: 'https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/duo_eye_mood',
          guideLink: '/docs/cloud/device-ai/demo-duo-eyes-mood',
        },
        {
          name: 'Rich Peripheral Examples',
          desc: 'From hardware protocols and OS-level programming to LVGL GUI and generic examples, this is a practical building-block set to get started fast.',
          codeLink: 'https://github.com/tuya/TuyaOpen/tree/master/examples',
          guideLink: '/docs/hardware/Linux/raspberry-pi/Examples/peripherals-raspberry-pi',
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
      ctaPath: '/docs/hardware/tuya-t5/develop-with-Arduino/Quick_start',
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
              invertForLightBg: true,
            },
            {
              alt: 'Amazon Nova',
              src: 'https://static1.tuyaeu.com/static/portal-tuyaai/_next/static/img/a60d91ef186a1bd78d92.png',
              invertForLightBg: true,
            },
            {
              alt: 'DeepSeek',
              src: 'https://static1.tuyaeu.com/static/portal-tuyaai/_next/static/img/db559231a82d53cd2696.png',
            },
            {
              alt: 'Grok',
              src: 'https://static1.tuyaeu.com/static/portal-tuyaai/_next/static/img/61c8914c1476f0a111e5.png',
              invertForLightBg: true,
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
              invertForLightBg: true,
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
              invertForLightBg: true,
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
              invertForLightBg: true,
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
              invertForLightBg: true,
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
              invertForLightBg: true,
            },
            {
              alt: 'D-Robotics',
              src: 'https://images.tuyacn.com/fe-static/docs/img/06a9db0d-7e68-4f04-9544-e902e7b9c205.png',
              invertForLightBg: true,
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
              invertForLightBg: true,
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
      tosGuide: 'CLI - tos.py 开发工具',
      envSetup: '环境搭建',
    },
    ideLaunch: {
      badge: '全新发布',
      title: '隆重推出 TuyaOpen IDE',
      subtitle: '面向 AI 硬件的 AI Coding 一体化开发工具。',
      body: '从项目创建到设备固件、云端 Agent 与 App 开发 —— 三端合一的工作流。用你熟悉的 AI Coding Agent，Vibe Coding 你的下一个硬件产品。',
      highlights: [
        '面向 VS Code 与 Cursor 的 AI Coding Agent 插件',
        '硬件在环的编译、烧录与调试',
        '固件 · 云 · App 统一工作流',
      ],
      primaryCta: '了解 TuyaOpen IDE',
      secondaryCta: '安装插件',
      primaryPath: '/tuyaopen-ide',
      secondaryUrl: '/tuyaopen-ide#download',
      image: 'https://images.tuyacn.com/fe-static/docs/img/83d924fd-d76b-4692-b844-5c15a4ddb0fe.png',
      imageAlt: 'TuyaOpen IDE 界面',
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
    realWorldValidation: {
      sectionTag: 'VibeCoding 与硬件在环',
      newBadgeLabel: '新推出',
      titleAccent: 'Vibe Coding 工作流',
      titleBase: '真实硬件',
      bodyBefore: '我们推出 ',
      bodyHighlight: 'TuyaOpen SDK 专家技能',
      bodyAfter:
        '：沉淀硬件开发最佳实践，面向 VibeCoding 优化——从新建工程、设备认证、编译烧录，到调试与事件注入测试，全程遵循硬件在环思路，让联网 AI 设备硬件落地更快、更省力。',
      consoleTitle: 'VibeCoding agent',
      devSkillsCopyText: '安装 TuyaOpen 开发者 专家工作流 Skill: https://github.com/tuya/TuyaOpen-dev-skills',
      devSkillsToolsHint:
        '粘贴到对话或智能体侧栏，例如：Cursor、Claude Code、Amazon Kiro，以及其他支持加载 Skills 的 vibe coding 工具。',
      devSkillsCopyButton: '复制安装提示词',
      devSkillsCopyButtonAria: '复制 TuyaOpen Dev Skills 安装提示词到剪贴板',
      devSkillsCopiedLabel: '已复制',
      devSkillsPasteHint: '请粘贴到智能体或对话输入框。',
      consoleStatus: '● 运行中',
      consoleChannels: [
        { id: 'VibeCoding', tone: 'teal' },
        { id: 'BUILD', tone: 'amber' },
        { id: 'FLASH', tone: 'orange' },
        { id: 'AUTH', tone: 'purple' },
        { id: 'CLOUD', tone: 'blue' },
      ],
      hilTerminalUserLabel: '用户',
      hilTerminalAgentLabel: 'Agent>',
      hilTerminalSequence: [
        { kind: 'user', delayBefore: 480, text: '创建一个连接涂鸦云 IoT 的湿度传感器工程。' },
        { kind: 'agent', delayBefore: 820, text: '正在初始化 VibeCoding AI...' },
        {
          kind: 'log',
          delayBefore: 120,
          tag: 'VibeCoding',
          tone: 'teal',
          text: '拉取最新 Tuya IoT SDK...',
          diagramIndex: 0,
        },
        { kind: 'log', delayBefore: 58, tag: 'VibeCoding', tone: 'teal', text: '分析兼容的 I2C 湿度传感器...' },
        { kind: 'log', delayBefore: 58, tag: 'VibeCoding', tone: 'teal', text: '建议：HDC1080, SHT31, AHT20' },
        { kind: 'log', delayBefore: 58, tag: 'VibeCoding', tone: 'teal', text: '选择驱动：SHT31' },
        { kind: 'log', delayBefore: 58, tag: 'VibeCoding', tone: 'teal', text: '从模板派生：iot_sensor_base' },
        { kind: 'log', delayBefore: 58, tag: 'VibeCoding', tone: 'teal', text: '创建工程："IoT_Humidity_Sensor"' },
        { kind: 'log', delayBefore: 58, tag: 'VibeCoding', tone: 'teal', text: '迁移代码库...' },
        { kind: 'log', delayBefore: 58, tag: 'VibeCoding', tone: 'teal', text: '添加 Hardware Debug CLI 支持...' },
        { kind: 'log', delayBefore: 58, tag: 'VibeCoding', tone: 'teal', text: '生成涂鸦云 DP（数据点）湿度接口...' },
        { kind: 'agent', delayBefore: 780, text: '构建并烧录' },
        {
          kind: 'log',
          delayBefore: 120,
          tag: 'BUILD',
          tone: 'amber',
          text: '编译固件...（37 个文件，GCC 10.3）',
          diagramIndex: 1,
        },
        { kind: 'log', delayBefore: 55, tag: 'BUILD', tone: 'amber', text: '链接中...' },
        {
          kind: 'log',
          delayBefore: 55,
          tag: 'BUILD',
          tone: 'amber',
          text: '✓ 成功：app_iot_humidity_sensor.bin (412 KB)',
        },
        {
          kind: 'log',
          delayBefore: 55,
          tag: 'FLASH',
          tone: 'orange',
          text: '检测到 T5AI DevKit @COM4',
          diagramIndex: 1,
        },
        { kind: 'log', delayBefore: 52, tag: 'FLASH', tone: 'orange', text: '擦除 Flash @ 0x10000... ✓ 完成（2.3s）' },
        { kind: 'log', delayBefore: 52, tag: 'FLASH', tone: 'orange', text: '写入固件... (412 KB / 412 KB)' },
        { kind: 'log', delayBefore: 52, tag: 'FLASH', tone: 'orange', text: '校验... ✓ 完成' },
        { kind: 'log', delayBefore: 52, tag: 'FLASH', tone: 'orange', text: '设备重启中...' },
        { kind: 'agent', delayBefore: 800, text: '设备认证' },
        {
          kind: 'log',
          delayBefore: 120,
          tag: 'AUTH',
          tone: 'purple',
          text: '请求涂鸦 Device ID...',
          diagramIndex: 2,
        },
        { kind: 'log', delayBefore: 55, tag: 'AUTH', tone: 'purple', text: '下载凭据' },
        {
          kind: 'log',
          delayBefore: 55,
          tag: 'AUTH',
          tone: 'purple',
          text: '写入凭据：product_id=3FB2XXZ1, uuid=b1994432...',
        },
        { kind: 'log', delayBefore: 55, tag: 'AUTH', tone: 'purple', text: '✓ 设备已认证' },
        { kind: 'agent', delayBefore: 820, text: '启动监视器与调试输出' },
        {
          kind: 'log',
          delayBefore: 120,
          tag: 'DEBUG',
          tone: 'blue',
          text: '打开 UART 控制台 @115200 baud',
          diagramIndex: 4,
        },
        { kind: 'log', delayBefore: 55, tag: 'I2C', tone: 'green', text: '扫描 I2C 总线... 发现设备：0x44 (SHT31)' },
        { kind: 'log', delayBefore: 55, tag: 'SENSOR', tone: 'green', text: '初始化传感器 SHT31... OK' },
        { kind: 'log', delayBefore: 55, tag: 'SENSOR', tone: 'green', text: '读取湿度...' },
        {
          kind: 'log',
          delayBefore: 55,
          tag: 'SENSOR',
          tone: 'green',
          text: 'Raw: 0x02D9  | 温度: 22.7°C  | 湿度: 46.3%',
        },
        {
          kind: 'log',
          delayBefore: 55,
          tag: 'SENSOR',
          tone: 'green',
          text: 'Raw: 0x01E2  | 温度: 22.8°C  | 湿度: 45.2%',
        },
        {
          kind: 'log',
          delayBefore: 55,
          tag: 'NETWORK',
          tone: 'purple',
          text: "尝试连接 WiFi 'TUYA_TEST_LAB'...",
          diagramIndex: 4,
        },
        {
          kind: 'log',
          delayBefore: 55,
          tag: 'NETWORK',
          tone: 'purple',
          text: '已连接，RSSI: -47dBm，IP: 192.168.0.122',
        },
        { kind: 'log', delayBefore: 55, tag: 'CLOUD', tone: 'blue', text: '绑定设备到涂鸦云... OK', diagramIndex: 4 },
        { kind: 'log', delayBefore: 55, tag: 'CLOUD', tone: 'blue', text: '上报湿度：45.2%', diagramIndex: 4 },
        { kind: 'log', delayBefore: 55, tag: 'LOG', tone: 'green', text: '等待云端指令...' },
        { kind: 'agent', delayBefore: 800, text: '注入 Hardware CLI 测试' },
        {
          kind: 'log',
          delayBefore: 120,
          tag: 'HW_CLI',
          tone: 'orange',
          text: '> connect_wifi --ssid TUYA_TEST_LAB --psk ***',
          diagramIndex: 3,
        },
        { kind: 'log', delayBefore: 55, tag: 'HW_CLI', tone: 'orange', text: '> force_sensor_cycle' },
        { kind: 'log', delayBefore: 55, tag: 'HW_CLI', tone: 'orange', text: '用户触发手动读数' },
        {
          kind: 'log',
          delayBefore: 55,
          tag: 'SENSOR',
          tone: 'green',
          text: 'Raw: 0x021D  | 温度: 22.6°C  | 湿度: 44.7%',
        },
        { kind: 'log', delayBefore: 55, tag: 'CLOUD', tone: 'blue', text: '上报湿度：44.7%', diagramIndex: 4 },
        { kind: 'log', delayBefore: 55, tag: 'DEBUG', tone: 'blue', text: '日志流已激活...' },
      ],
      diagramCenterLabel: '设备',
      diagramCenterSub: 'Tuya T5 / ESP32',
      diagramNodes: [
        { id: 'vibe', label: 'Vibe coding' },
        { id: 'build', label: '创建/构建/烧录' },
        { id: 'auth', label: '认证与凭据' },
        { id: 'cli', label: 'CLI 测试' },
        { id: 'debug', label: '调试' },
      ],
      steps: [
        {
          num: '01',
          title: '搭建、构建与烧录',
          body: 'VibeCoding 收敛 SDK 与外设选型、从模板派生工程、接入 DP 与 CLI，再编译并烧录固件到硬件——对应演示中的创建、构建与烧录链路。',
        },
        {
          num: '02',
          title: '认证与连接',
          body: '完成设备身份与凭据、打开监视输出、Wi-Fi 联网、绑定涂鸦云并上报 DP——与日志中的认证与云平台路径一致。',
        },
        {
          num: '03',
          title: '调试与 CLI 测试',
          body: '实时查看 UART、I2C 与传感器输出，并通过硬件 CLI 注入命令做联网与读数验证——调试与板端脚本化测试闭环。',
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
          guideLink: '/docs/cloud/iot-client/demo-tuya-iot-light',
        },
        {
          name: 'your_chat_bot',
          desc: '语音优先的 AI 对话 Demo，支持智能体交互，面向 T5AI、ESP32-S3 与 Raspberry Pi 4/5 等平台。支持多模态输入与技能扩展，适合个人助理与自然对话体验。',
          codeLink: 'https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/your_chat_bot',
          guideLink: '/docs/cloud/device-ai/demo-your-chat-bot',
        },
        {
          name: 'duo_eye_mood',
          desc: '双眼表情与情绪视觉联动，并支持对话交互，适配 T5AI 平台。',
          codeLink: 'https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/duo_eye_mood',
          guideLink: '/docs/cloud/device-ai/demo-duo-eyes-mood',
        },
        {
          name: 'Rich Peripheral Examples',
          desc: '从硬件协议、OS 系统编程到 LVGL GUI 与通用示例，作为快速上手的高价值积木组合。',
          codeLink: 'https://github.com/tuya/TuyaOpen/tree/master/examples',
          guideLink: '/docs/hardware/Linux/raspberry-pi/Examples/peripherals-raspberry-pi',
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
      ctaPath: '/docs/hardware/tuya-t5/develop-with-Arduino/Quick_start',
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
              invertForLightBg: true,
            },
            {
              alt: 'Amazon Nova',
              src: 'https://static1.tuyaeu.com/static/portal-tuyaai/_next/static/img/a60d91ef186a1bd78d92.png',
              invertForLightBg: true,
            },
            {
              alt: 'DeepSeek',
              src: 'https://static1.tuyaeu.com/static/portal-tuyaai/_next/static/img/db559231a82d53cd2696.png',
            },
            {
              alt: 'Grok',
              src: 'https://static1.tuyaeu.com/static/portal-tuyaai/_next/static/img/61c8914c1476f0a111e5.png',
              invertForLightBg: true,
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
              invertForLightBg: true,
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
              invertForLightBg: true,
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
              invertForLightBg: true,
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
              invertForLightBg: true,
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
              invertForLightBg: true,
            },
            {
              alt: '地瓜机器人 D-Robotics',
              src: 'https://images.tuyacn.com/fe-static/docs/img/a2d0672b-d49c-401f-a2ef-d97355443258.png',
              invertForLightBg: true,
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
              invertForLightBg: true,
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
      subtitle: '何同学团队-让山里养殖也能搭上智能快车',
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

// Korean is introduced as a real locale in stages. Keep the complete English
// shape as a safe fallback, while translating the homepage sections visitors
// see first instead of rendering an empty or partially-shaped page.
homepageCopy.ko = {
  ...homepageCopy.en,
  metaDescription:
    'TuyaOpen은 실제 디바이스를 위한 오픈 소스 AI+IoT 개발 프레임워크입니다. Tuya T 시리즈 MCU, Raspberry Pi, ESP32 등을 지원하는 크로스 플랫폼 C/C++ SDK를 제공합니다.',
  hero: {
    ...homepageCopy.en.hero,
    badge: '오픈 소스 · AI + IoT',
    line1: '에이전트형 AI',
    line2: '실제 디바이스에서',
    line3: 'TuyaOpen과 함께',
    subtitle: '한 번 개발하고 여러 칩에 배포하세요.',
    body: 'TuyaOpen은 유연한 크로스 플랫폼 C/C++ SDK로 Tuya T 시리즈 Wi-Fi/BT MCU, Raspberry Pi, ESP32를 지원합니다. Tuya Cloud 멀티모달 AI와 주요 모델을 연결해 음성, 비전, 센서 기능을 갖춘 AIoT 디바이스를 빠르게 만들 수 있습니다.',
  },
  cta: {
    ...homepageCopy.en.cta,
    quickStart: '빠른 시작',
    about: 'TuyaOpen 소개',
    applications: '애플리케이션 사례',
    github: 'GitHub',
    learnMore: '자세히 보기',
    tosGuide: 'CLI - tos.py 개발 도구',
    envSetup: '환경 설정',
  },
  ideLaunch: {
    ...homepageCopy.en.ideLaunch,
    badge: '새 릴리스',
    title: 'TuyaOpen IDE를 만나보세요',
    subtitle: 'AI 하드웨어를 위한 올인원 AI 코딩 개발 도구입니다.',
    body: '프로젝트 생성부터 디바이스 펌웨어, 클라우드 Agent, App 개발까지 세 플랫폼을 하나의 워크플로로 연결합니다. 익숙한 AI 코딩 Agent로 다음 AI 디바이스를 만들어 보세요.',
    highlights: [
      'VS Code 및 Cursor용 AI 코딩 Agent 확장',
      '하드웨어 연결 빌드·플래시·디버깅',
      '펌웨어·클라우드·앱을 하나로 연결',
    ],
    primaryCta: 'TuyaOpen IDE 살펴보기',
    secondaryCta: '확장 설치',
    imageAlt: 'TuyaOpen IDE 인터페이스',
  },
  benefits: {
    ...homepageCopy.en.benefits,
    sectionTag: '왜 TuyaOpen인가',
    title: '개발을 더 간단하게',
    subtitle: '계층형 SDK, 멀티모달 AI, 클라우드 기반 빌딩 블록을 제공합니다.',
    items: [
      {
        title: '확장 가능한 계층형 SDK',
        body: 'TKL 하드웨어 추상화, TAL OS/디바이스 추상화, 라이브러리와 서비스를 조합해 한 번 개발하고 어디서나 배포하세요.',
      },
      {
        title: '엣지에서 실행되는 멀티모달 AI',
        body: '음성, 비전, 센서 기능을 통합하고 DeepSeek, ChatGPT, Claude, Gemini 등 주요 모델과 연결하세요.',
      },
      {
        title: '클라우드 연결과 보안',
        body: 'Tuya Cloud의 원격 제어, 모니터링, OTA를 활용하세요. 디바이스 인증과 데이터 암호화도 지원합니다.',
      },
      {
        title: '프로토타입에서 양산까지',
        body: '재사용 가능한 계층, 안정적인 연결, 보안을 고려한 설계와 확장 가능한 클라우드 연동으로 제품화를 앞당기세요.',
      },
    ],
  },
  audience: {
    ...homepageCopy.en.audience,
    sectionTag: '누구를 위한 플랫폼인가요?',
    title: '모든 단계의 빌더를 위해',
    subtitle: '첫 프로토타입부터 양산까지 TuyaOpen으로 대담한 IoT와 에이전트형 하드웨어를 더 빠르게 만드세요.',
    items: [
      { title: '학생과 학습자', body: '실제 AI+IoT 제품을 만들며 아이디어를 동작하는 디바이스로 발전시키세요.' },
      {
        title: '메이커와 IoT 애호가',
        body: '재사용 가능한 SDK와 준비된 연동 기능으로 해커톤 아이디어를 완성도 높은 데모로 빠르게 만드세요.',
      },
      { title: 'AI 하드웨어 개발자', body: '음성 중심의 멀티모달 제품과 Agent 워크플로를 실제 디바이스에 연결하세요.' },
      {
        title: '상용 제품 팀',
        body: '보안, OTA, 확장 가능한 클라우드 기능을 갖춘 생산 지향 아키텍처로 출시 리스크를 줄이세요.',
      },
    ],
  },
  realWorldValidation: {
    ...homepageCopy.en.realWorldValidation,
    sectionTag: 'VIBECODING 및 하드웨어 연결 개발',
    titleBase: '실제 하드웨어',
    titleAccent: 'Vibe Coding 워크플로',
    newBadgeLabel: '새 기능',
    bodyBefore: '',
    bodyHighlight: 'TuyaOpen SDK Expert Skill',
    bodyAfter:
      '은 실제 하드웨어 개발 경험을 바탕으로 프로젝트 생성, 인증, 빌드, 플래시, 디버깅과 이벤트 테스트를 안내합니다.',
    consoleTitle: 'VibeCoding Agent',
    devSkillsCopyText: 'TuyaOpen Dev Skills를 설치하세요: https://github.com/tuya/TuyaOpen-dev-skills',
    devSkillsToolsHint:
      'Cursor, Claude Code, Amazon Kiro 등 Skills를 지원하는 코딩 도구의 채팅 또는 Agent 사이드바에 붙여넣으세요.',
    devSkillsCopyButton: '설치 프롬프트 복사',
    devSkillsCopyButtonAria: 'TuyaOpen Dev Skills 설치 프롬프트를 클립보드에 복사',
    devSkillsCopiedLabel: '복사됨',
    devSkillsPasteHint: '코딩 Agent 또는 채팅에 붙여넣으세요.',
    consoleStatus: '● 실행 중',
    hilTerminalUserLabel: '사용자',
    hilTerminalAgentLabel: 'Agent>',
    diagramCenterLabel: '디바이스',
    diagramCenterSub: 'Tuya T5 / ESP32',
    diagramNodes: [
      { id: 'vibe', label: 'Vibe 코딩' },
      { id: 'build', label: '생성·빌드·플래시' },
      { id: 'auth', label: '인증 정보' },
      { id: 'cli', label: 'CLI 테스트' },
      { id: 'debug', label: '디버깅' },
    ],
    steps: [
      {
        num: '01',
        title: '새 프로젝트 생성, 빌드 및 플래시',
        body: 'VibeCoding이 SDK와 주변 장치를 좁히고 템플릿을 분기한 뒤 DP 및 CLI 훅을 연결합니다. 데모의 생성·빌드·플래시 흐름에서 바이너리를 컴파일해 하드웨어에 기록합니다.',
      },
      {
        num: '02',
        title: '디바이스 인증 및 연결',
        body: '디바이스 ID를 준비하고 모니터 스트림을 연 뒤 Wi-Fi를 연결하세요. Tuya Cloud에 바인딩하고 로그에 보이는 인증 정보와 실시간 클라우드 경로로 DP 텔레메트리를 전송합니다.',
      },
      {
        num: '03',
        title: '디버깅 및 CLI 테스트',
        body: 'UART, I2C와 센서 출력을 실시간으로 확인하고 하드웨어 CLI 명령으로 읽기 및 연결 상태를 점검하세요. 보드에서 디버깅과 스크립트 기반 하드웨어 테스트를 함께 수행합니다.',
      },
    ],
  },
  code: {
    ...homepageCopy.en.code,
    sectionTag: '개발자 워크플로',
    title: '클론부터 플래시까지',
    caption:
      '임베디드 MCU부터 Linux급 SoC까지 한 번의 워크플로로 개발하세요. 저장소를 클론하고 export를 실행한 뒤 아래 명령을 따라 시작할 수 있습니다.',
  },
  cloudOnePager: {
    ...homepageCopy.en.cloudOnePager,
    sectionTag: '디바이스-클라우드 한눈에 보기',
    title: 'TuyaOpen은 클라우드와 어떻게 연결되나요?',
    subtitle: '엣지에서는 TuyaOpen C/C++ SDK로 펌웨어를 실행하고, 클라우드에서는 Tuya Cloud 멀티모달 AI를 활용합니다.',
    hardwareTitle: '하드웨어 및 TuyaOpenSDK',
    cloudTitle: 'Tuya Cloud 플랫폼',
    hardwareBullets: [
      'Tuya T 시리즈 MCU부터 Raspberry Pi, Rockchip 및 Linux SoC, ESP32까지 하나의 모듈형 스택으로 지원합니다.',
      '풍부한 주변 장치와 드라이버로 Windows, macOS, Linux 도구 체인에서 IoT 및 AI Agent 애플리케이션을 개발하세요.',
      '디바이스 빌딩 블록과 클라우드 AI API를 결합해 Wi-Fi IoT와 멀티모달 기능을 구현하세요.',
    ],
    cloudBullets: [
      '클라우드 멀티모달 AI, 저지연 음성·비전, 제로·로우코드 통합과 드래그 앤 드롭 Agent 워크플로를 제공합니다.',
      '장기·단기 메모리, 커스텀 MCP 서버, 감정 인식 TTS/STT, MiniApp 패널을 지원합니다.',
      'ChatGPT, Gemini, Claude, Qwen, DeepSeek 등 주요 모델과 Tuya Smart 하드웨어 생태계에서 동작합니다.',
    ],
    diagramCaption: '왼쪽은 TuyaOpen 하드웨어 개발, 오른쪽은 Tuya Cloud 멀티모달 AI 플랫폼입니다.',
    diagramZoomHint: '확대하려면 클릭',
    lightboxCloseLabel: '닫기',
  },
  platforms: {
    ...homepageCopy.en.platforms,
    title: '지원 칩 플랫폼',
    intro: '초저전력 MCU부터 Linux급 SoC까지 전력 예산과 지연 시간, AI 구성을 고려해 플랫폼을 선택하세요.',
    linkLabel: '플랫폼 표 보기',
    recommendedTag: '권장',
    multimodalTag: '멀티모달',
    categories: [
      {
        ...homepageCopy.en.platforms.categories[0],
        subtext:
          '초경량·저비용·저전력으로 상시 연결 IoT에 적합합니다. 센서와 미디어 데이터를 Tuya Cloud로 전송하고, 멀티모달 AI는 클라우드에서 처리해 디바이스를 가볍게 유지합니다.',
      },
      {
        ...homepageCopy.en.platforms.categories[1],
        subtext:
          '엣지 AI를 위한 여유 있는 성능으로 더 풍부한 모델을 로컬에서 실행한 뒤 Tuya Cloud AI와 결합하세요. 디바이스부터 클라우드까지 하나의 스택으로 확장할 수 있습니다.',
      },
    ],
  },
  demos: {
    ...homepageCopy.en.demos,
    title: '추천 데모',
    intro: '제품 지향 데모에서 시작하세요. 대상을 선택하고 소스를 확인한 뒤 몇 분 만에 보드에서 실행할 수 있습니다.',
    cta: '애플리케이션 보기',
    codeCta: '코드',
    guideCta: '가이드',
    items: [
      {
        ...homepageCopy.en.demos.items[0],
        desc: '지원 대상에서 네트워크, 페어링, 클라우드 제어와 OTA를 처리하는 기본 IoT 펌웨어입니다. 앱 패널로 제어할 수 있는 간단한 온·오프 예제입니다.',
      },
      {
        ...homepageCopy.en.demos.items[1],
        desc: 'Agent 상호작용을 갖춘 음성 중심 AI 채팅 데모입니다. T5AI, ESP32-S3 및 Raspberry Pi 4/5급 디바이스에 맞춰 멀티모달 입력과 Skill 확장을 지원합니다.',
      },
      {
        ...homepageCopy.en.demos.items[2],
        desc: 'T5AI에서 눈과 감정 그래픽, 대화형 상호작용을 보여 주는 양안 표현 데모입니다.',
      },
      {
        ...homepageCopy.en.demos.items[3],
        name: '주변 장치 예제',
        desc: '하드웨어 프로토콜과 OS 프로그래밍부터 LVGL GUI와 일반 예제까지 빠르게 시작할 수 있는 실용적인 빌딩 블록 모음입니다.',
      },
    ],
  },
  socialProof: {
    items: [
      { label: 'Apache 2.0', hint: '오픈 소스 라이선스' },
      { label: 'C/C++ SDK', hint: 'MCU부터 SoC까지 크로스 플랫폼' },
      { label: 'Tuya Cloud', hint: 'IoT + 멀티모달 AI' },
      { label: '커뮤니티', hint: 'GitHub 및 Discord · 8,000명 이상의 개발자' },
    ],
  },
  steps: {
    ...homepageCopy.en.steps,
    title: '세 단계로 시작하기',
    items: [
      {
        ...homepageCopy.en.steps.items[0],
        title: '1. TuyaOpen 라이선스',
        body: 'Tuya Cloud에 연결하려면 전용 라이선스(UUID + AuthKey)를 준비하세요.',
        ctaLabel: 'TuyaOpen 라이선스 받기',
      },
      {
        ...homepageCopy.en.steps.items[1],
        title: '2. SDK 초기화 및 보드 선택',
        body: 'TuyaOpen을 클론하고 export 스크립트를 실행한 뒤 tos.py로 보드를 선택하세요.',
        ctaLabel: '단계별 가이드',
      },
      {
        ...homepageCopy.en.steps.items[2],
        title: '3. 빌드 및 플래시',
        body: '애플리케이션 디렉터리에서 tos.py build와 tos.py flash를 실행하세요.',
      },
    ],
  },
  t5: {
    ...homepageCopy.en.t5,
    title: '에이전트형 AI를 위한 가성비 Tuya T5',
    body: 'Tuya T5 칩·모듈은 Wi-Fi 6와 Bluetooth 5.4 듀얼 모드 통신, 최대 480MHz ARMv8-M Star(M33F) 프로세서를 갖춘 고성능 임베디드 모듈입니다. 오디오·비디오·디스플레이를 활용하는 멀티모달 AI 상호작용에 맞춰 설계되었으며, 풍부한 GPIO와 Wi-Fi 6 및 BLE 연결로 제품 통합을 간소화합니다.',
    imageAlt: 'Tuya T5 MCU 보드 이미지',
  },
  arduinoExperimental: {
    ...homepageCopy.en.arduinoExperimental,
    sectionTag: '실험 기능',
    title: 'Arduino IDE로 에이전트형 AI 하드웨어를 개발하세요.',
    body: '익숙한 Arduino 워크플로에서 T5를 프로토타이핑하세요. 보드 지원과 라이브러리를 TuyaOpen에 통합해 에이전트형 AI 하드웨어를 빠르게 개발할 수 있습니다.',
    imageAlt: '어두운 테마의 Arduino IDE에서 실행 중인 TuyaOpen',
  },
  tuyaAi: {
    ...homepageCopy.en.tuyaAi,
    sectionTag: '멀티모달 AI',
    title: 'Tuya AI: 제로 코드 클라우드 플랫폼',
    body: 'Tuya AI는 엣지 AI 추론과 클라우드 Agent 허브를 결합해 DeepSeek, ChatGPT, Claude, Gemini 등 주요 모델과 음성·텍스트 상호작용, 이미지·비디오 생성 기능을 제공합니다. Tuya Cloud에서 펌웨어를 다시 빌드하지 않고도 제로 코드 Agent와 IoT 동작을 구성할 수 있습니다.',
    highlights: [
      'Agent형 하드웨어 제어',
      'Memory RAG',
      'Agent 워크플로',
      'Agent 프롬프트',
      'ASR',
      'Skill(날씨, IoT 제어 및 서드파티)',
      'Model Context Protocol(MCP)',
    ],
  },
  partners: {
    ...homepageCopy.en.partners,
    sectionTag: '생태계',
    title: '전 세계 파트너와 함께',
    subtitle: '하드웨어 제조사, 실리콘 파트너와 개발자 플랫폼이 TuyaOpen 생태계에서 협력합니다.',
    colabSections: homepageCopy.en.partners.colabSections.map((section, index) => ({
      ...section,
      title:
        ['올인원 AI 대규모 모델 액세스', '신뢰할 수 있는 클라우드 제공업체 기반', '커뮤니티 및 생태계 파트너'][index] ||
        section.title,
    })),
  },
  applicationsUseCases: {
    ...homepageCopy.en.applicationsUseCases,
    sectionTag: '애플리케이션 및 활용 사례',
    title: '실제 문제를 위한 AIoT',
    subtitle: 'TuyaOpen으로 연결된 디바이스와 에이전트형 AI를 하나의 스택에서 구축하세요.',
    navAriaLabel: '애플리케이션 또는 활용 사례 선택',
    items: homepageCopy.en.applicationsUseCases.items.map((item) => ({
      ...item,
      ...({
        'emoji-desktop-robot': {
          label: 'AI 이모지 로봇',
          title: 'AI 이모지 데스크톱 로봇',
          body: '표정이 풍부한 화면과 AI 듣기·이해 기능을 결합한 데스크톱 동반자입니다. 말하거나 손을 흔들면 디스플레이가 부드럽게 따라 움직여 반응성 높은 경험을 제공합니다.',
        },
        'otto-robot': {
          label: 'AI OTTO',
          title: 'AI OTTO 로봇',
          body: 'T5-E1 모듈과 6개의 서보로 움직이는 소형 이족 보행 로봇입니다. 걷기, 흔들기, 문워크와 점프를 수행하고 스마트 눈으로 개성을 더합니다.',
        },
        'ai-pixels': {
          label: 'AI Pixels',
          title: 'AI Pixels',
          body: 'TuyaOpen과 Tuya T5 Wi-Fi·Bluetooth 모듈로 만든 고밀도 픽셀 디스플레이입니다. 동반 앱과 개발자 서비스를 연결해 맞춤 위젯, AI Agent, MCP 도구와 텍스트-이미지 워크플로를 구성하세요.',
        },
        'ai-pocket-console': {
          label: 'AI 포켓 콘솔',
          title: 'AI 포켓 콘솔',
          body: '멀티모달 LLM Agent를 위한 휴대형 플랫폼입니다. 가상 반려동물, 대화형 도우미와 Tuya 생태계에 연결한 디바이스를 통한 홈 제어를 지원합니다.',
        },
        'ai-companion-avatar': {
          label: 'AI 동반자 아바타',
          title: 'AI 동반자 아바타',
          body: '음성, 의미 이해와 감정 인식 응답에 3D 아바타 동작을 결합한 탁상형 디지털 동반자입니다. 표정과 제스처가 하나의 일관된 경험으로 연결됩니다.',
        },
        'ai-robot-dog': {
          label: 'AI 로봇 강아지',
          title: 'AI 로봇 강아지',
          body: '대화, 날씨, 시간과 음악을 음성 중심으로 상호작용합니다. 음성 또는 제스처로 움직임을 제어하고 비전과 음성을 결합해 반응성 높은 멀티모달 동작을 구현합니다.',
        },
        'ai-wearable-badge': {
          label: 'AI 웨어러블 배지',
          title: 'AI 웨어러블 배지',
          body: 'AI 음성, 동적 비주얼과 가벼운 소셜 기능으로 정서적 연결을 만드는 약 4cm 웨어러블입니다. 언제든 바라보고 상호작용할 수 있는 캐릭터를 휴대하세요.',
        },
        'aiot-industry-devices': {
          label: 'AIoT 산업 디바이스',
          title: 'AIoT 산업 디바이스',
          body: 'TuyaOpen 소스로 Tuya 생태계에 참여하는 Wi-Fi IoT 제품을 만드세요. 디바이스 기능을 Data Point(DP)에 연결하고 Tuya 개발자 플랫폼의 로우코드 도구로 클라우드 동작을 구성할 수 있습니다.',
        },
        'industry-smart-building': {
          label: 'AI 스마트 빌딩',
          title: '스마트 홈 및 스마트 빌딩',
          body: 'MCU와 SoC에서 동일한 SDK로 조명, 온도, 출입과 센싱 기능을 구현하세요. Tuya Cloud의 원격 제어·모니터링·OTA와 Agent 워크플로를 결합해 음성 중심 도우미와 상황 인식 정책을 구성할 수 있습니다.',
        },
        'industry-industrial-energy': {
          label: 'AI 산업',
          title: '산업 및 에너지',
          body: '공장과 현장의 아키텍처에 맞춰 기계, 계량기와 게이트웨이를 Wi-Fi로 연결하세요. 안정적인 펌웨어와 보안 디바이스 수명주기, 클라우드 Agent 기반 알림·진단으로 원시 신호를 의사결정으로 바꿉니다.',
        },
        'industry-retail-hospitality': {
          label: 'AI 리테일',
          title: '리테일 및 호스피탈리티',
          body: '자연스러운 상호작용과 멀티모달 입력이 필요한 디스플레이, 키오스크와 서비스 디바이스를 구축하세요. Tuya Cloud Agent로 다국어 대화, MCP 도구와 RAG 스타일 메모리를 구성할 수 있습니다.',
        },
      }[item.id] || {}),
    })),
  },
  developerStory: {
    ...homepageCopy.en.developerStory,
    sectionTag: '개발자 스토리',
    title: 'AI Agent로 만드는 스마트 축산',
    subtitle: 'HTX Studio: 외딴 마을에 스마트 농업을 구현하다',
    story:
      'HTX Studio는 외딴 산간 마을에서 농부들이 매일 험한 비탈을 오르내리며 소를 찾다가 다치는 모습을 보았습니다. 일반 4G 트래커는 산악 지형의 음영 지역에서 신호를 잃었습니다. 팀은 TuyaOpen 오픈 소스 기능에 장거리 LoRa 연결과 현지 방언 AI 음성 상호작용을 결합해 스마트 방목 시스템을 빠르게 구축했습니다. 준비된 디바이스·클라우드·AI 도구 체인으로 복잡한 저수준 작업을 줄이고, 고령 사용자도 쉽게 사용할 수 있는 대화형 소 추적 경험을 만들었습니다.',
    highlights: [
      'TuyaOpen으로 구축',
      '위치 인식 및 LLM 해석을 결합한 Agent 상호작용',
      '핵심 하드웨어: Tuya T5',
      'GPS, LoRa, 가속도계 모듈 통합',
      'Tuya T5와 4G 셀룰러 모듈 결합',
      'ASR 오디오 및 추적 상태용 OLED 디스플레이',
    ],
    videoAriaLabel: 'AI 축산 개발자 스토리 영상',
    galleryAriaLabel: 'AI 축산 갤러리 이미지',
  },
  community: {
    ...homepageCopy.en.community,
    title: '함께 만드는 커뮤니티',
    body: '저장소에 Star를 보내고 Issue 또는 Discussion을 열어 주세요. Discord에 참여하고 기여 가이드도 확인할 수 있습니다.',
    cardGitHub: 'GitHub에서 기여하기',
    cardHelp: '문제가 있나요? Issues 또는 Discussions에서 질문하세요.',
    cardDiscord: 'Discord에서 다른 개발자와 대화하기',
    discordButton: 'Discord 참여',
    contributorsTitle: '기여자',
    footerIncubator: 'TuyaOpen은',
  },
}
