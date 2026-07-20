/* =========================================================================
 * Tutorials manifest
 * -------------------------------------------------------------------------
 * Single source of truth for the /tutorials hub. Add a card by appending an
 * entry to `tutorials.en` and `tutorials.zh` (keep the two in sync by `id`).
 *
 * Each entry:
 *   id          unique, kebab-case
 *   category    one of the keys in `categories` (drives the filter)
 *   kind        'markdown' | 'interactive' | 'external'
 *                 markdown    → prose/doc content rendered with shared style
 *                               (a /docs page, or a page wrapping <MarkdownSection>)
 *                 interactive → a hand-built HTML/React page (uses <TutorialShell>)
 *                 external    → opens in a new tab (GitHub, YouTube, …)
 *   href        destination. Internal routes start with '/'. Locale prefixing
 *               for zh is handled by the page — author the plain (en) path here.
 *   title       card title
 *   description one/two sentence summary
 *   tags        optional array of tag keys (see `tags` below)
 *   level       optional 'beginner' | 'intermediate' | 'advanced'
 *   duration    optional human string, e.g. '10 min'
 *   image       optional card image URL; on hover the card quickly reveals it
 *               For multi-link cards (e.g. a demo with a details link AND a source
 *               link), set `links: [{label, href}]` instead of `href`.
 *   meta        optional array of page-hero pills (per-locale); community projects
 *               use it for tier + domain, e.g. ['Maker', 'Robotics']
 *
 * The `kind` badge and external-link behaviour are derived automatically on the
 * page — you never style a card by hand, which is what keeps markdown and HTML
 * entries visually consistent.
 * ========================================================================= */

/* ------------------------------------------------------------- Categories */
/* Order here is the order of the filter chips. Sections may be empty for now.
 * Each category may carry an `intro` (one-line description) and an optional
 * `image` shown on its section-header card on the /learn hub. */
export const categories = {
  en: [
    {
      id: 'basics',
      label: 'Basics',
      intro: 'Quick takeaways and fundamentals — the essential concepts, tools, and tips to get moving with TuyaOpen.',
      image: '/img/learn/cat-basics.png',
    },
    {
      id: 'ide',
      label: 'TuyaOpen IDE',
      intro: 'Build firmware, cloud Agents, and app panels from one AI-driven workspace with Vibe Coding.',
      image: '/img/learn/cat-ide.png',
    },
    {
      id: 'sdk',
      label: 'TuyaOpen SDK',
      intro: 'The toolchain workflow — set up the environment, build firmware, flash, monitor, and pair a device.',
      image: '/img/learn/cat-sdk.png',
    },
    {
      id: 'projects',
      label: 'Projects',
      intro: 'Step-by-step builds that take you from a blank board to a finished, connected device.',
      image: '/img/learn/cat-projects.png',
    },
    {
      id: 'tutorials',
      label: 'Tutorials',
      intro: 'Focused how-tos for specific tasks, peripherals, and techniques.',
      image: '/img/learn/cat-tutorials.png',
    },
    {
      id: 'community',
      label: 'Community',
      intro: 'Projects built by the TuyaOpen community — robots, wearables, edge AI, and more.',
      image: '/img/learn/cat-community.png',
    },
  ],
  zh: [
    {
      id: 'basics',
      label: '基础',
      intro: '快速要点与基础概念——上手 TuyaOpen 必备的概念、工具与小技巧。',
      image: '/img/learn/cat-basics.png',
    },
    {
      id: 'ide',
      label: 'TuyaOpen IDE',
      intro: '在一个 AI 驱动的工作区里用 Vibe Coding 打通固件、云端 Agent 与 App 面板。',
      image: '/img/learn/cat-ide.png',
    },
    {
      id: 'sdk',
      label: 'TuyaOpen SDK',
      intro: '工具链工作流——配置环境、编译固件、烧录、监听并配网一台设备。',
      image: '/img/learn/cat-sdk.png',
    },
    {
      id: 'projects',
      label: '项目',
      intro: '从一块空板到一台完成的联网设备的分步实战。',
      image: '/img/learn/cat-projects.png',
    },
    {
      id: 'tutorials',
      label: '教程',
      intro: '针对具体任务、外设与技巧的专题指南。',
      image: '/img/learn/cat-tutorials.png',
    },
    {
      id: 'community',
      label: '社区',
      intro: '由 TuyaOpen 社区打造的项目——机器人、可穿戴、边缘 AI 等。',
      image: '/img/learn/cat-community.png',
    },
  ],
}

/* -------------------------------------------------------------- Kind meta */
/* Small badge shown on every card so md / html / external read consistently. */
export const kinds = {
  en: {
    markdown: { label: 'Guide' },
    interactive: { label: 'Interactive' },
    external: { label: 'External' },
  },
  zh: {
    markdown: { label: '图文' },
    interactive: { label: '交互' },
    external: { label: '站外' },
  },
}

/* -------------------------------------------------------------- Level meta */
export const levels = {
  en: {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
  },
  zh: {
    beginner: '入门',
    intermediate: '进阶',
    advanced: '高级',
  },
}

/* --------------------------------------------------------------- Tag meta */
/* Reuse a small palette; label per-locale, colours shared. */
export const tags = {
  en: {
    flashing: { label: 'Flashing', color: '#f97316' },
    setup: { label: 'Setup', color: '#3b82f6' },
    cli: { label: 'CLI', color: '#64748b' },
  },
  zh: {
    flashing: { label: '烧录', color: '#f97316' },
    setup: { label: '配置', color: '#3b82f6' },
    cli: { label: 'CLI', color: '#64748b' },
  },
}

/* ------------------------------------------------------------- Tutorials */
export const tutorials = {
  en: [
    {
      id: 'tyutool-guide',
      category: 'basics',
      kind: 'interactive',
      href: '/tyutool-guide',
      title: 'tyutool — flashing & authorization guide',
      description:
        'Install tyutool, flash your first board, authorize it for Tuya IoT, and fix common hiccups (GUI + CLI).',
      tags: ['flashing', 'cli'],
      level: 'beginner',
    },
    {
      id: 'license-key',
      category: 'basics',
      kind: 'interactive',
      href: '/pricing',
      title: 'Get a license key',
      description: 'Understand TuyaOpen authorization and how to obtain UUID / AuthKey credentials for your devices.',
      tags: ['setup'],
      level: 'beginner',
    },
    {
      id: 'using-license-key',
      category: 'basics',
      kind: 'interactive',
      href: '/tutorials/using-license-key',
      title: 'Use your license key',
      description:
        'Write the UUID + AuthKey to a device with tyutool (GUI + CLI), then verify it activates against the Tuya Cloud.',
      tags: ['setup', 'flashing'],
      level: 'beginner',
    },
    {
      id: 'setup-environment',
      category: 'sdk',
      kind: 'interactive',
      href: '/learn/setup-environment',
      title: 'Set up your development environment',
      description:
        'Install the TuyaOpen toolchain, clone the repo, and activate tos.py — the one command every later step uses.',
      tags: ['setup', 'cli'],
      level: 'beginner',
      duration: '10 min',
    },
    {
      id: 'build-first-firmware',
      category: 'sdk',
      kind: 'interactive',
      href: '/learn/build-first-firmware',
      title: 'Build your first firmware',
      description:
        'Configure switch_demo for your board with tos.py config choice, then compile it into a flashable bin with tos.py build.',
      tags: ['cli'],
      level: 'beginner',
      duration: '8 min',
    },
    {
      id: 'flash-and-monitor',
      category: 'sdk',
      kind: 'interactive',
      href: '/learn/flash-and-monitor',
      title: 'Flash and monitor your device',
      description:
        'Write the built bin to the board with tos.py flash, then watch it boot with tos.py monitor — both from the project directory.',
      tags: ['flashing', 'cli'],
      level: 'beginner',
      duration: '8 min',
    },
    {
      id: 'pair-device',
      category: 'sdk',
      kind: 'interactive',
      href: '/learn/pair-device',
      title: 'Pair your device with the SmartLife app',
      description:
        'Put a flashed, authorized device into pairing mode and register it to the Tuya IoT Cloud — the last step to a device you control from your phone.',
      tags: ['setup'],
      level: 'beginner',
      duration: '6 min',
    },
    {
      id: 'tos-cli',
      category: 'sdk',
      kind: 'interactive',
      href: '/learn/tos-cli',
      title: 'tos.py command reference',
      description:
        'An interactive reference for every tos.py subcommand — pick one to see its signature, a real example, and when to use it.',
      tags: ['cli'],
      level: 'intermediate',
    },
    {
      id: 'tuyaopen-ide-overview',
      category: 'ide',
      kind: 'markdown',
      href: '/learn/tuyaopen-ide-overview',
      title: 'What is TuyaOpen IDE',
      description:
        'Understand TuyaOpen IDE — the AI-era embedded dev environment where you describe a device in natural language and the Agent generates firmware, configures the cloud, and wires up the app.',
      level: 'beginner',
    },
    {
      id: 'tuyaopen-ide-install',
      category: 'ide',
      kind: 'markdown',
      href: '/learn/tuyaopen-ide-install',
      title: 'Install TuyaOpen IDE',
      description:
        'Install the TuyaOpen IDE extension in VS Code or Cursor — via an AI coding agent or the manual .vsix — then verify it is enabled.',
      tags: ['setup'],
      level: 'beginner',
      duration: '5 min',
    },
    {
      id: 'tuyaopen-ide-practice-1',
      category: 'ide',
      kind: 'markdown',
      href: '/learn/tuyaopen-ide-practice-1',
      title: 'Practice 1: Hello World',
      description:
        'Run an official example with zero code and learn the core IDE chain — pick board, build, flash, and read logs.',
      tags: ['setup'],
      level: 'beginner',
      duration: '15 min',
    },
    {
      id: 'tuyaopen-ide-practice-2',
      category: 'ide',
      kind: 'markdown',
      href: '/learn/tuyaopen-ide-practice-2',
      title: 'Practice 2: your_chat_bot',
      description:
        'Build the classic AI + IoT project end-to-end — create, build, flash, authorize, and pair — the cloud IoT / AI Agent flow in the IDE.',
      tags: ['setup'],
      level: 'intermediate',
      duration: '20 min',
    },
    {
      id: 'tuyaopen-ide-practice-3',
      category: 'ide',
      kind: 'markdown',
      href: '/learn/tuyaopen-ide-practice-3',
      title: 'Practice 3: mini-app panel',
      description:
        'Build a device control panel that runs in the phone app and cooperates with firmware over DP — create, bind, preview, and publish.',
      tags: ['setup'],
      level: 'intermediate',
      duration: '20 min',
    },
    {
      id: 'tuyaopen-ide-vibe-coding',
      category: 'ide',
      kind: 'markdown',
      href: '/learn/tuyaopen-ide-vibe-coding',
      title: 'Vibe Coding skills',
      description:
        'Copy-paste prompts for the skills that install inside TuyaOpen IDE — hardware peripherals, IoT products, platform ops, build/flash/debug, and panels.',
      level: 'beginner',
    },
    {
      id: 'tuyaopen-ide-agent-dev',
      category: 'ide',
      kind: 'interactive',
      href: '/learn/tuyaopen-ide-agent-dev',
      title: 'Agent Development Guide',
      description:
        'Complete end-to-end workflow for developing, deploying, and binding TuyaOpen IoT Agents across device and cloud using the TuyaOpen IDE.',
      tags: ['setup'],
      level: 'beginner',
      duration: '15 min',
    },
    {
      id: 'otto-ninja-open-source-robot',
      category: 'community',
      kind: 'markdown',
      href: '/learn/otto-ninja-open-source-robot',
      title: 'Otto Ninja — Open-Source Dual-Mode Robot',
      description:
        'Build a 3D-printed robot that walks and races on wheels, driven by TuyaOpen with voice control and a GC9D01 display.',
      image: 'https://images.tuyacn.com/fe-static/docs/img/402dea40-bf93-43ae-ab9a-e502233e8604.png',
      meta: ['Maker', 'Robotics'],
    },
    {
      id: 't5-pocket',
      category: 'community',
      kind: 'markdown',
      href: '/learn/t5-pocket',
      title: 'T5-Pocket — Your AI+IoT Companion',
      description:
        'Carry a pocket-sized AI+IoT host running TuyaOpen: multimodal chat, audio/video, and a virtual pet.',
      image: 'https://images.tuyacn.com/fe-static/docs/img/0f9616de-e94e-49af-ac0b-a6842296e1db.png',
      meta: ['Maker', 'AI + IoT'],
    },
    {
      id: 'led-matrix',
      category: 'community',
      kind: 'markdown',
      href: '/learn/led-matrix',
      title: 'LED Pixel Art Light Matrix',
      description: 'Drive a 16x16 LED matrix from the TuyaOpen SDK with 8 animation modes and real-time color control.',
      image: 'https://images.tuyacn.com/fe-static/docs/img/47909930-54ec-483d-8aac-41eb4ed769f2.gif',
      meta: ['Maker', 'Display'],
    },
    {
      id: 't5ai-core-ai-chatbot',
      category: 'community',
      kind: 'markdown',
      href: '/learn/t5ai-core-ai-chatbot',
      title: 'AI Chatbot on T5AI-Core',
      description: 'Stand up an AI chatbot on T5AI-Core with an ST7789 screen, live emotion display, and voice I/O.',
      image: 'https://images.tuyacn.com/fe-static/docs/img/62704802-0b90-42c0-8020-55e0da9cbd38.png',
      meta: ['Beginner', 'AI + IoT'],
    },
    {
      id: 'simple-iot-switch',
      category: 'community',
      kind: 'markdown',
      href: '/learn/simple-iot-switch',
      title: 'Simple Cloud-Connected Switch',
      description: 'Wire up a TuyaOpen switch you can control from the app, with secure cloud authentication.',
      image: '/img/projects/project-iot-switch.png',
      meta: ['Beginner', 'Smart Home'],
    },
    {
      id: 'lvgl-font-change-tutorial',
      category: 'community',
      kind: 'markdown',
      href: '/learn/lvgl-font-change-tutorial',
      title: 'Custom Fonts in LVGL',
      description:
        'Set local and global fonts in LVGL, change the default, and add custom icon glyphs for embedded UIs.',
      image: 'https://images.tuyacn.com/fe-static/docs/img/3cff6dfb-ccff-4fde-8386-78babc9578b3.png',
      meta: ['Intermediate', 'UI'],
    },
    {
      id: 't5-2m-asr-pro-custom-asr',
      category: 'community',
      kind: 'markdown',
      href: '/learn/t5-2m-asr-pro-custom-asr',
      title: 'Custom Wake Words with T5 + 2M-ASR-PRO',
      description: 'Add offline speech recognition to a T5 board with custom wake words and multi-role support.',
      image: 'https://images.tuyacn.com/fe-static/docs/img/e7b390c6-10bf-4a92-a499-c7bacea116d5.jpg',
      meta: ['Intermediate', 'Voice'],
    },
    {
      id: 'star-tracker',
      category: 'community',
      kind: 'markdown',
      href: '/learn/star-tracker',
      title: 'Star Tracker — Astronomical Compass',
      description: 'Point a T5AI-Core + T5-E1 module at the stars and chat with an astronomy agent.',
      image: 'https://images.tuyacn.com/fe-static/docs/img/11fcf2a4-25b6-4a90-8f3a-bc6e5f0dde38.jpg',
      meta: ['Maker', 'AI + IoT'],
    },
    {
      id: 'cyber-glass',
      category: 'community',
      kind: 'markdown',
      href: '/learn/cyber-glass',
      title: 'Dynamic Light-Effect Glasses',
      description: 'Turn heartbeat and music rhythm into visible light flowing through a wearable frame.',
      image: 'https://images.tuyacn.com/fe-static/docs/img/303c2850-621d-4c50-84c2-b964e8c83d0f.jpg',
      meta: ['Maker', 'Wearable'],
    },
    {
      id: 'nft-plent-collector',
      category: 'community',
      kind: 'markdown',
      href: '/learn/nft-plent-collector',
      title: 'CyberPlant — Plant NFT',
      description: 'A blockchain plant-NFT project with a frontend, backend API, and smart contracts.',
      image: 'https://images.tuyacn.com/fe-static/docs/img/fd0ed95b-c96d-4106-938b-7d203a45675c.jpg',
      meta: ['Advanced', 'Web3'],
    },
    {
      id: 'robot-arm',
      category: 'community',
      kind: 'markdown',
      href: '/learn/robot-arm',
      title: 'Auraflow — Focus Companion Robot',
      description: 'A pomodoro companion robot that nudges deep-focus users toward scientific breaks.',
      image: 'https://images.tuyacn.com/fe-static/docs/img/74f40f1e-8650-4e59-9593-837255081cc9.jpg',
      meta: ['Maker', 'AI + IoT'],
    },
    {
      id: 'rdk-x5',
      category: 'community',
      kind: 'markdown',
      href: '/learn/rdk-x5',
      title: 'TuyaOpen on RDK-X5',
      description: "Run TuyaOpen's multimodal agent on RDK-X5's local NPU for edge AI + IoT.",
      image: 'https://images.tuyacn.com/fe-static/docs/img/7a0fcb92-b721-4f38-8b32-3cb84aca785e.jpg',
      meta: ['Advanced', 'Edge AI'],
    },
    {
      id: 'rolling-ball',
      category: 'community',
      kind: 'markdown',
      href: '/learn/rolling-ball',
      title: 'Soccer Star — Spherical Robot',
      description: 'A self-balancing ball-shaped robot that rolls itself toward the goal.',
      image: 'https://images.tuyacn.com/fe-static/docs/img/61811184-3563-4a14-93e1-c603dcb29395.jpg',
      meta: ['Maker', 'Robotics'],
    },
    {
      id: 'ai-social-badge',
      category: 'community',
      kind: 'markdown',
      href: '/learn/ai-social-badge',
      title: 'Smart Social Badge',
      description: 'A wearable that flashes the same light as a nearby stranger who shares your interests.',
      image: 'https://images.tuyacn.com/fe-static/docs/img/206894ec-546e-4a6d-a0ce-9b521d574ccb.jpg',
      meta: ['Maker', 'Wearable'],
    },
    {
      id: 'openclaw-desktop-pet',
      category: 'community',
      kind: 'external',
      links: [
        { label: 'Details', href: 'https://github.com/Eilgnaw/openclaw_pet/blob/main/%E8%A7%84%E5%88%92%E4%B9%A6.md' },
        { label: 'Source', href: 'https://github.com/Eilgnaw/openclaw_pet' },
      ],
      title: 'OpenClaw Desktop Pet',
      description:
        'Pixel side-scroller on an embedded device whose characters react to OpenClaw server status over TCP/MQTT. — by 王劣劣',
      image:
        'https://images.tuyacn.com/rms-static/c3f19730-54e5-11f1-8d53-258e63d3fe0e-1779348123683.png?tyName=%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_9ce2f097-cba5-4072-b3c7-ed4de3f25c78.png',
    },
    {
      id: 'verdure-buddy',
      category: 'community',
      kind: 'external',
      links: [
        { label: 'Details', href: 'https://www.bilibili.com/opus/1190792232759721993' },
        { label: 'Source', href: 'https://github.com/maker-community/VerdureLab' },
      ],
      title: 'Verdure Buddy Desktop Ornament',
      description: 'A desktop ornament on the Tuya T5 board running a full DuckyClaw. — by 绿荫阿广',
      image:
        'https://images.tuyacn.com/rms-static/85d7a6f0-54e6-11f1-95db-cfd3b8132c07-1779348448991.png?tyName=%E6%88%AA%E5%B1%8F2026-05-21%2015.27.10.png',
    },
    {
      id: 'win95-t5-demo',
      category: 'community',
      kind: 'external',
      links: [
        { label: 'Details', href: 'https://drive.weixin.qq.com/s?k=AGQAugfWAAkKNQ0Gw0AeQA2gaJAKQ' },
        { label: 'Source', href: 'https://github.com/tuya/TuyaOpen-Community-Projects/pull/7' },
      ],
      title: 'Win95-style OS on T5',
      description: 'A Windows 95-style embedded desktop simulator on the TuyaOpen T5 AI board. — by 福杰',
      image:
        'https://images.tuyacn.com/rms-static/37772610-54e7-11f1-95db-cfd3b8132c07-1779348746993.png?tyName=%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_2568bbea-5e60-4415-8f08-8f6314289f49.png',
    },
    {
      id: 'work-buddy-assistant',
      category: 'community',
      kind: 'external',
      links: [
        {
          label: 'Source',
          href: 'https://mp.weixin.qq.com/s?__biz=MzY5ODI3MDk1NA==&mid=2247483692&idx=1&sn=88350412b920f3c523abb8cea137880c&chksm=f5600cfe0aadb5e0ed4b0cc61bbaef9bcbff0087492f6ed05ae93178360a199f58c93154092c&scene=90&subscene=93#rd',
        },
      ],
      title: 'Work Buddy Desktop Assistant',
      description:
        'A desktop assistant on a Tuya AI board with screen, mic, speaker, and camera, backed by the Tuya Cloud. — by 陈瑞',
      image:
        'https://images.tuyacn.com/rms-static/b35ea960-54e7-11f1-8d53-258e63d3fe0e-1779348954870.png?tyName=%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_5b6bb0db-5bf1-4032-96ec-e3b36bfbd8f7.png',
    },
    {
      id: 'duckyclaw-smart-car',
      category: 'community',
      kind: 'external',
      links: [
        { label: 'Details', href: 'https://mp.weixin.qq.com/s/WPXo0rM8BTjJ4Bp6TnxUwg' },
        { label: 'Source', href: 'https://github.com/jiaxianhua/DuckyClaw' },
      ],
      title: 'DuckyClaw Voice-Controlled Smart Car',
      description:
        'Voice-control an ESP32 smart car from a Tuya T5 AI board — the AI parses natural language and sends HTTP commands to drive. — by 贾献华',
      image:
        'https://images.tuyacn.com/rms-static/2bdcc2f0-54e8-11f1-95db-cfd3b8132c07-1779349157023.png?tyName=%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_61412cf2-a4d6-4b77-8561-f0cafd552602.png',
    },
    {
      id: 'zodiac-eink-screen',
      category: 'community',
      kind: 'external',
      links: [{ label: 'Source', href: 'https://github.com/HonestQiao/e-Paper-Album' }],
      title: 'Zodiac E-Paper Screen',
      description:
        'A 4-inch E6 color e-paper display on Tuya T5AI hardware that generates zodiac imagery with AI. — by 乔楚',
      image:
        'https://images.tuyacn.com/rms-static/cd439f10-1d0c-11f1-95db-cfd3b8132c07-1773207624577.png?tyName=%E6%88%AA%E5%B1%8F2026-03-11%2013.38.47.png',
    },
    {
      id: 't5-e-paper-reader',
      category: 'community',
      kind: 'external',
      links: [
        {
          label: 'Details',
          href: 'https://mp.weixin.qq.com/s/gYr4v2M-IWmP05P7OQH0tw?mpshare=1&scene=1&srcid=0211OnlTf2MrYGk7lPBPuJcI&sharer_shareinfo=48d1e0aa58f476e0ee5ca59dd7031c52&sharer_shareinfo_first=d2b6d45d7ea466fe4d57441576254e8d&version=4.1.33.70494&platform=mac#rd',
        },
        { label: 'Source', href: 'https://github.com/jiaxianhua/Tuya_T5_ePaper_Reader/blob/main/docs/WIKI.md' },
      ],
      title: 'E-Paper Reader on T5AI-Board',
      description:
        'An e-paper reader with SD-card browsing, text/image viewing, orientation switch, and NTP — paper-like static display. — by 贾献华',
      image:
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=e-paper%20reader%20device%20with%20T5AI-Board%20text%20on%20screen&image_size=square',
    },
    {
      id: 't5-ported-games',
      category: 'community',
      kind: 'external',
      links: [{ label: 'Source', href: 'https://github.com/HangYongmao/lvgl_games' }],
      title: 'Ported Games on T5AI-Board',
      description:
        'Five classic games (Plants vs Zombies, 2048, etc.) ported to the Tuya T5AI-Board with LVGL touch interaction. — by 大树',
      image:
        'https://images.tuyacn.com/rms-static/137fb440-1d0e-11f1-bc69-dd9d99b0210c-1773208171908.png?tyName=%E6%B8%B8%E6%88%8F%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_f8c773df-3b23-479b-95a3-9538556e5fa4.png',
    },
  ],

  zh: [
    {
      id: 'tyutool-guide',
      category: 'basics',
      kind: 'interactive',
      href: '/tyutool-guide',
      title: 'tyutool —— 烧录与授权指南',
      description: '安装 tyutool、烧录第一块板子、为涂鸦 IoT 授权，并解决常见问题（GUI + CLI）。',
      tags: ['flashing', 'cli'],
      level: 'beginner',
    },
    {
      id: 'license-key',
      category: 'basics',
      kind: 'interactive',
      href: '/pricing',
      title: '获取授权码',
      description: '了解 TuyaOpen 授权机制，以及如何为你的设备获取 UUID / AuthKey 凭据。',
      tags: ['setup'],
      level: 'beginner',
    },
    {
      id: 'using-license-key',
      category: 'basics',
      kind: 'interactive',
      href: '/tutorials/using-license-key',
      title: '使用授权码',
      description: '用 tyutool（GUI + CLI）将 UUID + AuthKey 写入设备，并验证其在涂鸦云上成功激活。',
      tags: ['setup', 'flashing'],
      level: 'beginner',
    },
    {
      id: 'setup-environment',
      category: 'sdk',
      kind: 'interactive',
      href: '/learn/setup-environment',
      title: '配置开发环境',
      description: '安装 TuyaOpen 工具链、克隆仓库并激活 tos.py —— 这一条命令贯穿后续所有步骤。',
      tags: ['setup', 'cli'],
      level: 'beginner',
      duration: '10 分钟',
    },
    {
      id: 'build-first-firmware',
      category: 'sdk',
      kind: 'interactive',
      href: '/learn/build-first-firmware',
      title: '编译第一个固件',
      description: '用 tos.py config choice 为你的开发板配置 switch_demo，再用 tos.py build 编译出可烧录的 bin。',
      tags: ['cli'],
      level: 'beginner',
      duration: '8 分钟',
    },
    {
      id: 'flash-and-monitor',
      category: 'sdk',
      kind: 'interactive',
      href: '/learn/flash-and-monitor',
      title: '烧录固件并监听设备',
      description: '用 tos.py flash 把编译好的 bin 写入开发板，再用 tos.py monitor 观察启动 —— 都在项目目录中完成。',
      tags: ['flashing', 'cli'],
      level: 'beginner',
      duration: '8 分钟',
    },
    {
      id: 'pair-device',
      category: 'sdk',
      kind: 'interactive',
      href: '/learn/pair-device',
      title: '用 SmartLife App 配网',
      description: '让已烧录并授权的设备进入配网模式并注册到涂鸦云 —— 让设备可从手机控制的最后一步。',
      tags: ['setup'],
      level: 'beginner',
      duration: '6 分钟',
    },
    {
      id: 'tos-cli',
      category: 'sdk',
      kind: 'interactive',
      href: '/learn/tos-cli',
      title: 'tos.py 命令参考',
      description: '每个 tos.py 子命令的交互式参考 —— 选择一个查看其签名、真实示例与使用时机。',
      tags: ['cli'],
      level: 'intermediate',
    },
    {
      id: 'tuyaopen-ide-overview',
      category: 'ide',
      kind: 'markdown',
      href: '/learn/tuyaopen-ide-overview',
      title: 'TuyaOpen IDE 是什么',
      description:
        '了解 TuyaOpen IDE——面向 AI 时代的嵌入式开发环境，你用自然语言描述设备，Agent 就生成固件、配置云端、打通 App。',
      level: 'beginner',
    },
    {
      id: 'tuyaopen-ide-install',
      category: 'ide',
      kind: 'markdown',
      href: '/learn/tuyaopen-ide-install',
      title: '安装 TuyaOpen IDE',
      description:
        '在 VS Code 或 Cursor 中安装 TuyaOpen IDE 扩展——让 AI 编程 Agent 帮你装，或用手动 .vsix 安装，然后验证已启用。',
      tags: ['setup'],
      level: 'beginner',
      duration: '5 分钟',
    },
    {
      id: 'tuyaopen-ide-practice-1',
      category: 'ide',
      kind: 'markdown',
      href: '/learn/tuyaopen-ide-practice-1',
      title: '实战一：Hello World',
      description: '不写一行代码跑通官方示例，掌握 IDE 核心链路——选板、编译、烧录、看日志。',
      tags: ['setup'],
      level: 'beginner',
      duration: '15 分钟',
    },
    {
      id: 'tuyaopen-ide-practice-2',
      category: 'ide',
      kind: 'markdown',
      href: '/learn/tuyaopen-ide-practice-2',
      title: '实战二：your_chat_bot',
      description: '端到端搭建经典 AI + IoT 项目——创建、编译、烧录、授权、配网，讲清 IDE 中云端 IoT / AI Agent 流程。',
      tags: ['setup'],
      level: 'intermediate',
      duration: '20 分钟',
    },
    {
      id: 'tuyaopen-ide-practice-3',
      category: 'ide',
      kind: 'markdown',
      href: '/learn/tuyaopen-ide-practice-3',
      title: '实战三：小程序面板',
      description: '做一个跑在手机 App 里、通过 DP 与固件联动的设备控制面板——创建、绑定、预览、发布。',
      tags: ['setup'],
      level: 'intermediate',
      duration: '20 分钟',
    },
    {
      id: 'tuyaopen-ide-vibe-coding',
      category: 'ide',
      kind: 'markdown',
      href: '/learn/tuyaopen-ide-vibe-coding',
      title: 'Vibe Coding 技能',
      description: '可在 TuyaOpen IDE 内安装的 skills 提示词——硬件外设、IoT 产品、平台操作、构建/烧录/调试、面板。',
      level: 'beginner',
    },
    {
      id: 'tuyaopen-ide-agent-dev',
      category: 'ide',
      kind: 'interactive',
      href: '/learn/tuyaopen-ide-agent-dev',
      title: 'Agent 开发指南',
      description: '使用 TuyaOpen IDE 进行端到端的开发、部署和绑定 TuyaOpen IoT 智能体的完整工作流。',
      tags: ['setup'],
      level: 'beginner',
      duration: '15 分钟',
    },
    {
      id: 'otto-ninja-open-source-robot',
      category: 'community',
      kind: 'markdown',
      href: '/learn/otto-ninja-open-source-robot',
      title: 'Otto Ninja 开源机器人',
      description: '用 TuyaOpen 打造一台 3D 打印的双模式机器人，支持步行与轮式竞速一键切换，带语音控制与 GC9D01 显示。',
      image: 'https://images.tuyacn.com/fe-static/docs/img/0cd58a4c-eaf9-40f8-88fa-4f46d17cb833.png',
      meta: ['创客', '机器人'],
    },
    {
      id: 't5-pocket',
      category: 'community',
      kind: 'markdown',
      href: '/learn/t5-pocket',
      title: '玩转 T5-Pocket：你的 AI+IoT 智能伙伴',
      description: '一台口袋级 AI+IoT 主机，运行 TuyaOpen，内置多模态对话、音视频与虚拟宠物。',
      image: 'https://images.tuyacn.com/fe-static/docs/img/0f9616de-e94e-49af-ac0b-a6842296e1db.png',
      meta: ['创客', 'AI + IoT'],
    },
    {
      id: 'led-matrix',
      category: 'community',
      kind: 'markdown',
      href: '/learn/led-matrix',
      title: 'LED 像素艺术灯矩阵',
      description: '用 TuyaOpen SDK 驱动 16×16 LED 矩阵，8 种动画模式，支持实时调色。',
      image: 'https://images.tuyacn.com/fe-static/docs/img/47909930-54ec-483d-8aac-41eb4ed769f2.gif',
      meta: ['创客', '显示'],
    },
    {
      id: 't5ai-core-ai-chatbot',
      category: 'community',
      kind: 'markdown',
      href: '/learn/t5ai-core-ai-chatbot',
      title: 'T5AI-Core 聊天机器人',
      description: '在 T5AI-Core 与 ST7789 屏幕上搭建 AI 聊天机器人，支持实时表情与语音输入输出。',
      image: 'https://images.tuyacn.com/fe-static/docs/img/62704802-0b90-42c0-8020-55e0da9cbd38.png',
      meta: ['入门', 'AI + IoT'],
    },
    {
      id: 'simple-iot-switch',
      category: 'community',
      kind: 'markdown',
      href: '/learn/simple-iot-switch',
      title: '简单云端物联网开关',
      description: '用 TuyaOpen 搭一个可从 App 远程控制、带云端安全认证的开关。',
      image: '/img/projects/project-iot-switch.png',
      meta: ['入门', '智能家居'],
    },
    {
      id: 'lvgl-font-change-tutorial',
      category: 'community',
      kind: 'markdown',
      href: '/learn/lvgl-font-change-tutorial',
      title: 'LVGL 字体自定义',
      description: '在 LVGL 中设置局部/全局字体、修改默认字体，并为嵌入式 UI 添加自定义图标字形。',
      image: 'https://images.tuyacn.com/fe-static/docs/img/3cf655aa-37ed-46b5-9700-784c84a7b2b6.png',
      meta: ['进阶', 'UI'],
    },
    {
      id: 't5-2m-asr-pro-custom-asr',
      category: 'community',
      kind: 'markdown',
      href: '/learn/t5-2m-asr-pro-custom-asr',
      title: 'T5 + 2M-ASR-PRO 定制唤醒词',
      description: '为 T5 开发板加上离线语音识别，支持自定义唤醒词与多角色。',
      image: 'https://images.tuyacn.com/fe-static/docs/img/5e634b99-003f-48c9-b7d1-04d086785b46.jpg',
      meta: ['进阶', '语音'],
    },
    {
      id: 'star-tracker',
      category: 'community',
      kind: 'markdown',
      href: '/learn/star-tracker',
      title: '觅星 —— 天文指南针',
      description: '用 T5AI-Core + T5-E1 模组指向星星，与天文 Agent 对话。',
      image: 'https://images.tuyacn.com/fe-static/docs/img/11fcf2a4-25b6-4a90-8f3a-bc6e5f0dde38.jpg',
      meta: ['创客', 'AI + IoT'],
    },
    {
      id: 'cyber-glass',
      category: 'community',
      kind: 'markdown',
      href: '/learn/cyber-glass',
      title: '动感光效眼镜',
      description: '让心跳与节拍变成看得见的光，在可穿戴镜框中流动。',
      image: 'https://images.tuyacn.com/fe-static/docs/img/303c2850-621d-4c50-84c2-b964e8c83d0f.jpg',
      meta: ['创客', '可穿戴'],
    },
    {
      id: 'nft-plent-collector',
      category: 'community',
      kind: 'markdown',
      href: '/learn/nft-plent-collector',
      title: 'CyberPlant 赛博植物',
      description: '基于区块链的植物 NFT 项目，含前端界面、后端 API 与智能合约。',
      image: 'https://images.tuyacn.com/fe-static/docs/img/fd0ed95b-c96d-4106-938b-7d203a45675c.jpg',
      meta: ['高级', 'Web3'],
    },
    {
      id: 'robot-arm',
      category: 'community',
      kind: 'markdown',
      href: '/learn/robot-arm',
      title: 'Auraflow 心流空间',
      description: '一款陪伴式番茄钟机器人，提醒深度专注者科学休息。',
      image: 'https://images.tuyacn.com/fe-static/docs/img/74f40f1e-8650-4e59-9593-837255081cc9.jpg',
      meta: ['创客', 'AI + IoT'],
    },
    {
      id: 'rdk-x5',
      category: 'community',
      kind: 'markdown',
      href: '/learn/rdk-x5',
      title: 'TuyaOpen 运行于 RDK-X5',
      description: '在 RDK-X5 的本地 NPU 上运行 TuyaOpen 多模态智能体，做边缘 AI+IoT。',
      image: 'https://images.tuyacn.com/fe-static/docs/img/7a0fcb92-b721-4f38-8b32-3cb84aca785e.jpg',
      meta: ['高级', '边缘 AI'],
    },
    {
      id: 'rolling-ball',
      category: 'community',
      kind: 'markdown',
      href: '/learn/rolling-ball',
      title: '国足之星 —— 球形机器人',
      description: '一台自平衡球形机器人，能自己滚向球门。',
      image: 'https://images.tuyacn.com/fe-static/docs/img/61811184-3563-4a14-93e1-c603dcb29395.jpg',
      meta: ['创客', '机器人'],
    },
    {
      id: 'ai-social-badge',
      category: 'community',
      kind: 'markdown',
      href: '/learn/ai-social-badge',
      title: '友念智能社交徽章',
      description: '一款可穿戴徽章，遇到有共同语言的陌生人时双方同闪。',
      image: 'https://images.tuyacn.com/fe-static/docs/img/206894ec-546e-4a6d-a0ce-9b521d574ccb.jpg',
      meta: ['创客', '可穿戴'],
    },
    {
      id: 'openclaw-desktop-pet',
      category: 'community',
      kind: 'external',
      links: [
        { label: '详情', href: 'https://github.com/Eilgnaw/openclaw_pet/blob/main/%E8%A7%84%E5%88%92%E4%B9%A6.md' },
        { label: '代码', href: 'https://github.com/Eilgnaw/openclaw_pet' },
      ],
      title: '桌面宠物',
      description:
        '像素风格横版游戏运行于嵌入式设备，通过 TCP/MQTT 接收 OpenClaw 服务器工作状态，驱动小动物做出对应动作。 —— 开发者：王劣劣',
      image:
        'https://images.tuyacn.com/rms-static/c3f19730-54e5-11f1-8d53-258e63d3fe0e-1779348123683.png?tyName=%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_9ce2f097-cba5-4072-b3c7-ed4de3f25c78.png',
    },
    {
      id: 'verdure-buddy',
      category: 'community',
      kind: 'external',
      links: [
        { label: '详情', href: 'https://www.bilibili.com/opus/1190792232759721993' },
        { label: '代码', href: 'https://github.com/maker-community/VerdureLab' },
      ],
      title: '绿荫伴伴桌面助手',
      description: '基于涂鸦 T5 开发板的精致桌面摆件，里面完整运行了一个 DuckyClaw。 —— 开发者：绿荫阿广',
      image:
        'https://images.tuyacn.com/rms-static/85d7a6f0-54e6-11f1-95db-cfd3b8132c07-1779348448991.png?tyName=%E6%88%AA%E5%B1%8F2026-05-21%2015.27.10.png',
    },
    {
      id: 'win95-t5-demo',
      category: 'community',
      kind: 'external',
      links: [
        { label: '详情', href: 'https://drive.weixin.qq.com/s?k=AGQAugfWAAkKNQ0Gw0AeQA2gaJAKQ' },
        { label: '代码', href: 'https://github.com/tuya/TuyaOpen-Community-Projects/pull/7' },
      ],
      title: '仿 Win95 操作系统的 T5 开发板 Demo',
      description: '运行在 TuyaOpen T5 AI 开发板上的 Windows 95 风格嵌入式桌面模拟器。 —— 开发者：福杰',
      image:
        'https://images.tuyacn.com/rms-static/37772610-54e7-11f1-95db-cfd3b8132c07-1779348746993.png?tyName=%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_2568bbea-5e60-4415-8f08-8f6314289f49.png',
    },
    {
      id: 'work-buddy-assistant',
      category: 'community',
      kind: 'external',
      links: [
        {
          label: '代码',
          href: 'https://mp.weixin.qq.com/s?__biz=MzY5ODI3MDk1NA==&mid=2247483692&idx=1&sn=88350412b920f3c523abb8cea137880c&chksm=f5600cfe0aadb5e0ed4b0cc61bbaef9bcbff0087492f6ed05ae93178360a199f58c93154092c&scene=90&subscene=93#rd',
        },
      ],
      title: '上班搭子桌面助手',
      description: '基于涂鸦云平台与带屏、麦克风、扬声器、摄像头的 AI 开发板打造的桌面助手。 —— 开发者：陈瑞',
      image:
        'https://images.tuyacn.com/rms-static/b35ea960-54e7-11f1-8d53-258e63d3fe0e-1779348954870.png?tyName=%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_5b6bb0db-5bf1-4032-96ec-e3b36bfbd8f7.png',
    },
    {
      id: 'duckyclaw-smart-car',
      category: 'community',
      kind: 'external',
      links: [
        { label: '详情', href: 'https://mp.weixin.qq.com/s/WPXo0rM8BTjJ4Bp6TnxUwg' },
        { label: '代码', href: 'https://github.com/jiaxianhua/DuckyClaw' },
      ],
      title: 'DuckyClaw 端云硬件-智造桌面智能小车搭子',
      description:
        '用 TuyaT5AIBoard 通过语音命令控制 ESP32 智能小车 —— AI 助手理解自然语言后下发 HTTP 指令，实现进退转向。 —— 开发者：贾献华',
      image:
        'https://images.tuyacn.com/rms-static/2bdcc2f0-54e8-11f1-95db-cfd3b8132c07-1779349157023.png?tyName=%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_61412cf2-a4d6-4b77-8561-f0cafd552602.png',
    },
    {
      id: 'zodiac-eink-screen',
      category: 'community',
      kind: 'external',
      links: [{ label: '代码', href: 'https://github.com/HonestQiao/e-Paper-Album' }],
      title: '基于涂鸦 T5 的智能生肖墨水屏',
      description:
        '涂鸦 T5AI 硬件 + 4 英寸 E6 全彩墨水屏 + AI 图片生成，融合传统生肖文化与现代科技的智能展示设备。 —— 开发者：乔楚',
      image:
        'https://images.tuyacn.com/rms-static/cd439f10-1d0c-11f1-95db-cfd3b8132c07-1773207624577.png?tyName=%E6%88%AA%E5%B1%8F2026-03-11%2013.38.47.png',
    },
    {
      id: 't5-e-paper-reader',
      category: 'community',
      kind: 'external',
      links: [
        {
          label: '详情',
          href: 'https://mp.weixin.qq.com/s/gYr4v2M-IWmP05P7OQH0tw?mpshare=1&scene=1&srcid=0211OnlTf2MrYGk7lPBPuJcI&sharer_shareinfo=48d1e0aa58f476e0ee5ca59dd7031c52&sharer_shareinfo_first=d2b6d45d7ea466fe4d57441576254e8d&version=4.1.33.70494&platform=mac#rd',
        },
        { label: '代码', href: 'https://github.com/jiaxianhua/Tuya_T5_ePaper_Reader/blob/main/docs/WIKI.md' },
      ],
      title: '基于涂鸦 T5AI-Board 的墨水屏阅读器',
      description:
        '支持 SD 卡文件浏览、文本/图片阅读、横竖屏切换及网络时间同步，类纸感静态内容展示。 —— 开发者：贾献华',
      image:
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=e-paper%20reader%20device%20with%20T5AI-Board%20text%20on%20screen&image_size=square',
    },
    {
      id: 't5-ported-games',
      category: 'community',
      kind: 'external',
      links: [{ label: '代码', href: 'https://github.com/HangYongmao/lvgl_games' }],
      title: '基于涂鸦 T5AI 的开发板移植游戏',
      description:
        '在涂鸦 T5AI-Board 上移植植物大战僵尸、2048、羊了个羊、消消乐、华容道五款经典游戏，LVGL 实现触摸交互。 —— 开发者：大树',
      image:
        'https://images.tuyacn.com/rms-static/137fb440-1d0e-11f1-bc69-dd9d99b0210c-1773208171908.png?tyName=%E6%B8%B8%E6%88%8F%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_f8c773df-3b23-479b-95a3-9538556e5fa4.png',
    },
  ],
}

export default { categories, kinds, levels, tags, tutorials }
