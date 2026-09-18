/* =========================================================================
 * Quick-start tracks — the two mainlines at the top of /learn.
 *
 * Replaces the old style × difficulty chooser: there are exactly two ways to
 * get a first device running, so both are laid out flat and side by side
 * rather than hidden behind a choice.
 *
 *   ide — the TuyaOpen IDE tutorial series (pages under /learn)
 *   sdk — the nine-step Getting Started funnel (docs under /docs/quick-start)
 *
 * The SDK track intentionally mirrors /docs/quick-start's own order, so the
 * track and the sidebar tell the same story. Step titles drop the "Step N:"
 * prefix the docs carry, because the list already numbers them.
 *
 * TIMINGS — `minutes` is hands-on time (downloading, building, waiting on the
 * board), not reading time. That is the existing convention: the install page
 * is longer than Practice 1 but is labelled 5 min against its 15, because one
 * is clicking through a wizard and the other is a build-and-flash loop.
 *
 * Only the SDK steps carry `minutes` here. The IDE steps are Learn tutorials,
 * so their duration already lives in tutorials.js and the card looks it up by
 * href — one fact, one home.
 *
 * The SDK figures are estimates from page content, NOT measured runs. The
 * environment-setup number in particular depends on download speed.
 * ========================================================================= */

export const quickStartTracks = {
  en: [
    {
      id: 'ide',
      accent: '#7c5cff',
      name: 'TuyaOpen IDE',
      tagline: 'Graphical development environment',
      blurb:
        'Board catalogue, one-click build and flash, and an AI agent spanning all three surfaces: firmware, cloud agent, and app panel. Suited to a first encounter with TuyaOpen.',
      entry: { label: 'Start with the IDE', href: '/docs/ide' },
      steps: [
        { href: '/docs/ide', title: 'What TuyaOpen IDE is' },
        { href: '/docs/ide/install', title: 'Install the IDE' },
        { href: '/docs/ide/hello-world', title: 'Practice 1: Hello World' },
        { href: '/docs/ide/chat-bot', title: 'Practice 2: your_chat_bot' },
        { href: '/docs/ide/miniapp-panel', title: 'Practice 3: mini app panel' },
        { href: '/docs/ide/linux-board', title: 'Practice 4: Hello World on Linux' },
        { href: '/docs/ide/vibe-coding', title: 'Vibe Coding skills' },
        { href: '/docs/ide/agent-development', title: 'Agent development guide' },
        { href: '/docs/ide/ide-feedback', title: 'IDE log feedback' },
      ],
    },
    {
      id: 'sdk',
      accent: '#0ea5e9',
      name: 'TuyaOpen SDK',
      tagline: 'Command line and toolchain',
      blurb:
        "Follows the docs' own nine-step Getting Started: environment, build, flash, authorize and pair, through to product development and OTA.",
      entry: { label: 'Start with the CLI', href: '/docs/quick-start' },
      steps: [
        { href: '/docs/quick-start/unboxing', title: 'Unboxing', minutes: 5 },
        { href: '/docs/quick-start/enviroment-setup', title: 'Environment setup', minutes: 20 },
        { href: '/docs/quick-start/project-compilation', title: 'Build project', minutes: 10 },
        { href: '/docs/quick-start/firmware-burning', title: 'Flashing and logging', minutes: 10 },
        { href: '/docs/quick-start/equipment-authorization', title: 'Authorize devices', minutes: 10 },
        { href: '/docs/quick-start/device-network-configuration', title: 'Pair with a phone', minutes: 10 },
        { href: '/docs/quick-start/device-debug', title: 'Device debugging', minutes: 10 },
        { href: '/docs/quick-start/tuya-product-development', title: 'Tuya product development', minutes: 15 },
        { href: '/docs/quick-start/firmware-ota', title: 'Firmware upgrade', minutes: 15 },
      ],
    },
  ],

  zh: [
    {
      id: 'ide',
      accent: '#7c5cff',
      name: 'TuyaOpen IDE',
      tagline: '图形化开发环境',
      blurb: '开发板目录、一键编译烧录，AI Agent 覆盖固件、云端 Agent 与面板 App 三端。适合首次接触 TuyaOpen。',
      entry: { label: '从 IDE 开始', href: '/docs/ide' },
      steps: [
        { href: '/docs/ide', title: 'TuyaOpen IDE 是什么' },
        { href: '/docs/ide/install', title: '安装 TuyaOpen IDE' },
        { href: '/docs/ide/hello-world', title: '实战一：Hello World' },
        { href: '/docs/ide/chat-bot', title: '实战二：your_chat_bot' },
        { href: '/docs/ide/miniapp-panel', title: '实战三：小程序面板' },
        { href: '/docs/ide/linux-board', title: '实战四：Linux 板 Hello World' },
        { href: '/docs/ide/vibe-coding', title: 'Vibe Coding 技能' },
        { href: '/docs/ide/agent-development', title: 'Agent 开发指南' },
        { href: '/docs/ide/ide-feedback', title: 'IDE 日志反馈' },
      ],
    },
    {
      id: 'sdk',
      accent: '#0ea5e9',
      name: 'TuyaOpen SDK',
      tagline: '命令行与工具链',
      blurb: '沿用文档的九步快速开始：环境搭建、编译、烧录、授权、配网，直至产品开发与 OTA。',
      entry: { label: '从 CLI 开始', href: '/docs/quick-start' },
      steps: [
        { href: '/docs/quick-start/unboxing', title: '极速体验', minutes: 5 },
        { href: '/docs/quick-start/enviroment-setup', title: '环境搭建', minutes: 20 },
        { href: '/docs/quick-start/project-compilation', title: '项目编译', minutes: 10 },
        { href: '/docs/quick-start/firmware-burning', title: '固件烧录', minutes: 10 },
        { href: '/docs/quick-start/equipment-authorization', title: '设备授权', minutes: 10 },
        { href: '/docs/quick-start/device-network-configuration', title: '设备手机配网', minutes: 10 },
        { href: '/docs/quick-start/device-debug', title: '设备调试', minutes: 10 },
        { href: '/docs/quick-start/tuya-product-development', title: 'Tuya 产品开发', minutes: 15 },
        { href: '/docs/quick-start/firmware-ota', title: '固件升级', minutes: 15 },
      ],
    },
  ],
}

quickStartTracks.ko = [
  {
    ...quickStartTracks.en[0],
    tagline: '그래픽 개발 환경',
    blurb: '보드 카탈로그, 원클릭 빌드와 플래시, 펌웨어·클라우드 Agent·앱 패널을 아우르는 AI Agent를 제공합니다.',
    entry: { ...quickStartTracks.en[0].entry, label: 'IDE로 시작하기' },
    steps: quickStartTracks.en[0].steps.map((step, index) => ({
      ...step,
      title: [
        'TuyaOpen IDE란?',
        'IDE 설치',
        '실습 1: Hello World',
        '실습 2: your_chat_bot',
        '실습 3: 미니 앱 패널',
        '실습 4: Linux에서 Hello World',
        'Vibe Coding 스킬',
        'Agent 개발 가이드',
        'IDE 피드백',
      ][index],
    })),
  },
  {
    ...quickStartTracks.en[1],
    tagline: '명령줄 및 툴체인',
    blurb: '환경 설정, 빌드, 플래시, 인증과 페어링부터 제품 개발과 OTA까지 아홉 단계로 안내합니다.',
    entry: { ...quickStartTracks.en[1].entry, label: 'CLI로 시작하기' },
    steps: quickStartTracks.en[1].steps.map((step, index) => ({
      ...step,
      title: [
        '개봉 및 시작',
        '환경 설정',
        '프로젝트 빌드',
        '플래시 및 로그 확인',
        '디바이스 인증',
        '휴대폰과 페어링',
        '디바이스 디버깅',
        'Tuya 제품 개발',
        '펌웨어 업그레이드',
      ][index],
    })),
  },
]
