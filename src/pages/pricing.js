import Head from '@docusaurus/Head'
import Link from '@docusaurus/Link'
import useBaseUrl from '@docusaurus/useBaseUrl'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import { clsx } from 'clsx'
import React, { useEffect, useRef, useState } from 'react'

import styles from './pricing.module.css'

const PURCHASE = 'https://platform.tuya.com/purchase/index?type=6'
const PLATFORM = 'https://platform.tuya.com/'

/* ----------------------------------------------------------------------- */
/* Bilingual copy                                                          */
/* ----------------------------------------------------------------------- */

const content = {
  en: {
    meta: 'TuyaOpen licensing — a simple, one-time license per device for Tuya Cloud and AI. Free for local and offline projects.',
    title: 'TuyaOpen Licensing & Pricing',
    badge: 'One-time license · per device · no subscription',
    heroTitle: ['One license.', 'Connect to the cloud, add AI.'],
    heroSubtitle: 'Build for free. Pay once per device only when it connects to Tuya Cloud.',
    heroBody:
      'TuyaOpen is free and open source. A license — a UUID + AuthKey written to each device — is only needed when that device connects to Tuya Cloud. Choose IoT connectivity at ¥5, or unlock multimodal AI at ¥12. One-time, per device, no monthly fees.',
    ctaPlans: 'Compare plans',
    ctaGuide: 'Licensing guide',
    ctaHow: 'How it works',
    stats: [
      { value: '¥0', label: 'Local & offline projects' },
      { value: '¥5 / ¥12', label: 'IoT / AI + IoT per device' },
      { value: '1×', label: 'One-time, no subscription' },
      { value: '11+', label: 'Supported chips' },
    ],
    plans: {
      tag: 'Plans',
      title: 'Pick the tier your device needs',
      subtitle:
        'Every tier shares the same open-source framework, build tools, and chip support. You only pay when your device talks to Tuya Cloud.',
      includesLabel: 'Includes',
      tiers: [
        {
          name: 'Open Source',
          tagline: 'For makers, students, and local-only or offline products.',
          price: 'Free',
          unit: '',
          alt: 'No license required',
          includes: 'The full framework',
          features: [
            'Open-source IoT OS for Wi-Fi / Bluetooth / audio / camera',
            'Develop on Tuya T-series, ESP32, BK7231N, LN882H, Raspberry Pi',
            'GPIO / PWM / ADC / I²C / SPI drivers and local LAN control',
            'Call any third-party API (OpenAI, your own HTTP)',
            'tos.py build tools, Arduino & docs',
            'Community support',
          ],
          cta: 'Start building',
          ctaHref: 'https://github.com/tuya/TuyaOpen',
          external: true,
          featured: false,
        },
        {
          name: 'IoT Connection',
          tagline: 'Bring your device online and control it from the Tuya app.',
          price: '¥5',
          unit: '/ device',
          alt: '≈ $0.7 · one-time',
          includes: 'Everything in Open Source, plus',
          features: [
            'Connect to Tuya Cloud over MQTT',
            'Remote control via the Tuya Smart Life app',
            'Data-point (DP) model: report & control device state',
            'Bluetooth / Wi-Fi pairing and device binding',
            'Over-the-air (OTA) firmware updates',
            'Custom IoT products & mass-flash / pre-flashed modules',
          ],
          cta: 'Buy IoT license',
          ctaHref: PURCHASE,
          external: true,
          featured: false,
        },
        {
          name: 'AI + IoT',
          tagline: 'Everything IoT, plus a full multimodal AI agent on-device.',
          price: '¥12',
          unit: '/ device',
          alt: '≈ $1.7 · one-time',
          includes: 'Everything in IoT Connection, plus',
          features: [
            'Wake-word, cloud ASR & TTS voice pipeline',
            'Top LLMs: ChatGPT, Claude, Gemini, Qwen, Doubao, DeepSeek…',
            'Vision: upload camera frames for visual Q&A',
            'MCP — let the AI call your sensors & actuators',
            'AI Agent platform: prompts, skills, emotions, roles',
            'Ready-to-flash demos: your_chat_bot, robots, desk emoji',
          ],
          cta: 'Buy AI + IoT license',
          ctaHref: PURCHASE,
          external: true,
          featured: true,
          popular: 'Most popular',
        },
      ],
      enterprise: {
        title: 'Enterprise & custom solutions',
        body: 'OEM/ODM services, custom products, and production at scale on the commercial Tuya framework — trusted by 5,800+ customers across 200M+ connected devices.',
        cta: 'Contact sales',
        ctaHref: 'mailto:service@tuya.com',
      },
    },
    starter: {
      badge: '🎁 Free to start',
      title: '2 starter licenses, on us',
      body: 'Every developer can claim 2 free device licenses (¥20 value) from the Tuya Developer Platform — enough to build, pair, and test a full cloud or AI project end to end before you buy a single production code.',
      points: [
        'Full AI + IoT capabilities for development & debugging',
        'No credit card — claim them with a Tuya account',
        'Upgrade to ¥5 / ¥12 production licenses only when you ship',
      ],
      claimCta: 'Claim 2 free licenses',
      guideCta: 'How to apply',
    },
    how: {
      tag: 'How licensing works',
      title: 'A license is one credential, written once',
      subtitle:
        'No accounts to keep alive, no monthly bills. Here is what a TuyaOpen license actually is and when you need one.',
      cards: [
        {
          icon: '🔑',
          title: 'UUID + AuthKey',
          desc: 'A license is a 20-character UUID and a 32-character AuthKey, issued by Tuya and bound to your product. Together they are the device’s cloud identity.',
        },
        {
          icon: '☁️',
          title: 'Only for Tuya Cloud',
          desc: 'You only need a license when a device connects to Tuya Cloud. Local, Bluetooth, Wi-Fi, and third-party-API projects stay completely free.',
        },
        {
          icon: '🔒',
          title: 'One device, one UUID',
          desc: 'Each UUID brings one device online. The AuthKey can be reused on another board only after you unpair the first one from the app.',
        },
        {
          icon: '♻️',
          title: 'Written once, it stays',
          desc: 'On MCUs the license lives in a protected key-value area — it survives firmware updates and is only lost on a full flash erase.',
        },
      ],
    },
    compare: {
      tag: 'Full comparison',
      title: 'What each tier unlocks',
      subtitle: 'A feature-by-feature look, drawn straight from the TuyaOpen docs.',
      cols: [
        { name: 'Open Source', price: 'Free' },
        { name: 'IoT', price: '¥5 / device' },
        { name: 'AI + IoT', price: '¥12 / device' },
      ],
      groups: [
        {
          name: 'Framework & tooling',
          rows: [
            ['Open-source C/C++ SDK', true, true, true],
            ['tos.py build / config / flash', true, true, true],
            ['Arduino, Lua & MicroPython', true, true, true],
            ['11+ chips (T-series, ESP32, Pi…)', true, true, true],
            ['Serial debug & tyutool flashing', true, true, true],
          ],
        },
        {
          name: 'Connectivity & peripherals',
          rows: [
            ['Wi-Fi / Bluetooth / Ethernet', true, true, true],
            ['Local LAN control', true, true, true],
            ['Camera, microphone, speaker, display', true, true, true],
            ['GPIO / PWM / ADC / I²C / SPI', true, true, true],
            ['Third-party API calls', true, true, true],
          ],
        },
        {
          name: 'Tuya Cloud (IoT)',
          rows: [
            ['Tuya Cloud connection (MQTT)', false, true, true],
            ['Tuya Smart Life app control', false, true, true],
            ['Data-point report & control', false, true, true],
            ['Device pairing & binding', false, true, true],
            ['OTA firmware updates', false, true, true],
            ['Custom IoT products', false, true, true],
            ['Custom mini-app control panel', false, true, true],
          ],
        },
        {
          name: 'Multimodal AI',
          rows: [
            ['Wake-word detection', true, true, true],
            ['Cloud ASR / TTS voice', false, false, true],
            ['LLM chat (ChatGPT, Claude, Qwen…)', false, false, true],
            ['Vision / visual Q&A', false, false, true],
            ['MCP device tool-calling', false, false, true],
            ['AI Agent platform (skills, emotions)', false, false, true],
            ['Customizable AI agent (prompts, roles)', false, false, true],
          ],
        },
        {
          name: 'Production & support',
          rows: [
            ['Free developer test licenses', false, 'Starter free license', 'Starter free license'],
            ['Per-device production license', '—', '¥5', '¥12'],
            ['Mass-flash & pre-flashed modules', false, true, true],
            ['Commercial production ready', false, true, true],
            ['Community support', true, true, true],
          ],
        },
      ],
    },
    steps: {
      tag: 'Get started',
      title: 'From zero to cloud in three steps',
      subtitle: 'Claim a free license to test, write it to your device, and verify it came online.',
      items: [
        {
          n: '1',
          title: 'Get a license',
          desc: 'Create a product on the Tuya Developer Platform and claim 2 free developer licenses (¥20 value) to start. Buy ¥5 / ¥12 production licenses when you ship.',
          code: `# Tuya Developer Platform
1. Create a product (pick any category)
2. Select the T5 module + dummy firmware
3. Claim 2 free authorization codes
4. Copy your UUID + AuthKey`,
          codeTitle: 'platform.tuya.com',
        },
        {
          n: '2',
          title: 'Write it to the device',
          desc: 'Bake the license into your build via tuya_config.h, or write it over serial with the auth command (or tyutool / the web tool).',
          code: `// tuya_config.h
#define TUYA_OPENSDK_UUID    "uuidxxxxxxxxxxxxxxxx"
#define TUYA_OPENSDK_AUTHKEY "keyxxxxxxxxxxxxxxxxxx"

# …or over serial:
tos.py monitor -b 115200
auth uuid9f6a6...  cGuDnU2Yxj...`,
          codeTitle: 'authorize',
        },
        {
          n: '3',
          title: 'Verify & go online',
          desc: 'Read the stored license back, reboot, then pair the device in the Tuya app. It activates against the cloud with your credentials.',
          code: `tuya> auth-read
uuid9f6a6xxxxxxxxxxx
cGuDnU2YxjHJldjxxxxxxxxxxxxxxxxx

# reboot → pair in the Tuya app ✓`,
          codeTitle: 'verify',
        },
      ],
      guideCta: 'Read the full licensing guide',
    },
    faq: {
      tag: 'FAQ',
      title: 'Common questions',
      items: [
        {
          q: 'Why do I need a license key?',
          a: 'A license (UUID + AuthKey) is the device’s identity for secure access to Tuya Cloud. After a one-time purchase, each device carries its own unique license.',
        },
        {
          q: 'When is a license NOT required?',
          a: 'Local-only or offline applications need no license. Bluetooth, Wi-Fi, simple apps, and third-party API calls all run on the free open-source framework.',
        },
        {
          q: 'Is this a monthly subscription?',
          a: 'No. The ¥5 / ¥12 license is a one-time purchase per connected device — not a recurring fee.',
        },
        {
          q: 'What’s the difference between the ¥5 and ¥12 license?',
          a: 'The ¥5 IoT license connects your device to Tuya Cloud for app control, DP data, and OTA. The ¥12 AI + IoT license adds the full multimodal AI agent: wake-word, ASR/TTS, LLMs, vision, and MCP tool-calling.',
        },
        {
          q: 'Can I reuse a license on another device?',
          a: 'Each UUID brings one device online at a time. You can reuse the AuthKey on a new board only after unpairing the original device from the Tuya Smart Life app.',
        },
        {
          q: 'Are AI tokens included in the ¥12 license?',
          a: 'The ¥12 license unlocks AI capabilities. Actual AI usage — LLM tokens, ASR minutes, TTS characters — is metered separately by use. See the licensing guide for the breakdown.',
        },
        {
          q: 'Do TuyaOS licenses work with TuyaOpen?',
          a: 'No. TuyaOpen requires TuyaOpen-specific licenses. TuyaOS authorization codes cannot connect within the TuyaOpen framework.',
        },
        {
          q: 'Do you offer enterprise or startup pricing?',
          a: 'Yes. We offer custom and volume pricing for startups, education, and enterprise. Contact <a href="mailto:service@tuya.com">service@tuya.com</a> for a quote.',
        },
      ],
    },
    finalCta: {
      title: 'Ready to bring your device online?',
      subtitle: 'Claim two free developer licenses, or read the guide to write your first one.',
    },
  },

  zh: {
    meta: 'TuyaOpen 授权 —— 面向涂鸦云与 AI 的简单一次性授权，按设备计费。本地与离线项目完全免费。',
    title: 'TuyaOpen 授权与价格',
    badge: '一次性授权 · 按设备 · 无订阅',
    heroTitle: ['一码授权，', '接入云端，开启 AI。'],
    heroSubtitle: '免费开发。只有当设备接入涂鸦云时，才需按设备一次性付费。',
    heroBody:
      'TuyaOpen 免费且开源。授权码 —— 写入每台设备的 UUID + AuthKey —— 仅在设备接入涂鸦云时才需要。¥5 解锁 IoT 连接，¥12 解锁多模态 AI。一次性、按设备，无月费。',
    ctaPlans: '对比方案',
    ctaGuide: '授权指南',
    ctaHow: '工作原理',
    stats: [
      { value: '¥0', label: '本地与离线项目' },
      { value: '¥5 / ¥12', label: 'IoT / AI + IoT 每设备' },
      { value: '1×', label: '一次性，无订阅' },
      { value: '11+', label: '支持的芯片' },
    ],
    plans: {
      tag: '方案',
      title: '选择你的设备所需的档位',
      subtitle: '所有档位共享同一套开源框架、构建工具与芯片支持。只有当设备与涂鸦云通信时才需付费。',
      includesLabel: '包含',
      tiers: [
        {
          name: '开源开发者',
          tagline: '面向创客、学生，以及本地或离线产品。',
          price: '免费',
          unit: '',
          alt: '无需授权码',
          includes: '完整框架',
          features: [
            '面向 Wi-Fi / 蓝牙 / 音频 / 摄像头的开源 IoT OS',
            '可在涂鸦 T 系列、ESP32、BK7231N、LN882H、树莓派上开发',
            'GPIO / PWM / ADC / I²C / SPI 驱动与本地局域网控制',
            '调用任意第三方 API（OpenAI、你自己的 HTTP）',
            'tos.py 构建工具、Arduino 与完整文档',
            '社区支持',
          ],
          cta: '开始开发',
          ctaHref: 'https://github.com/tuya/TuyaOpen',
          external: true,
          featured: false,
        },
        {
          name: 'IoT 连接',
          tagline: '让设备上线，并通过涂鸦 App 控制。',
          price: '¥5',
          unit: '/ 设备',
          alt: '≈ $0.7 · 一次性',
          includes: '包含开源版全部能力，另加',
          features: [
            '通过 MQTT 接入涂鸦云',
            '通过涂鸦智能生活 App 远程控制',
            '数据点（DP）模型：上报与控制设备状态',
            '蓝牙 / Wi-Fi 配网与设备绑定',
            'OTA 固件升级',
            '自定义 IoT 产品，及量产烧录 / 预烧录模块',
          ],
          cta: '购买 IoT 授权',
          ctaHref: PURCHASE,
          external: true,
          featured: false,
        },
        {
          name: 'AI + IoT',
          tagline: '在 IoT 之上，提供完整的设备端多模态 AI 智能体。',
          price: '¥12',
          unit: '/ 设备',
          alt: '≈ $1.7 · 一次性',
          includes: '包含 IoT 连接全部能力，另加',
          features: [
            '唤醒词、云端 ASR 与 TTS 语音链路',
            '顶级大模型：ChatGPT、Claude、Gemini、通义千问、豆包、DeepSeek…',
            '视觉：上传摄像头画面进行视觉问答',
            'MCP —— 让 AI 调用你的传感器与执行器',
            'AI 智能体平台：提示词、技能、情绪、角色',
            '即烧即用示例：your_chat_bot、机器人、桌面表情',
          ],
          cta: '购买 AI + IoT 授权',
          ctaHref: PURCHASE,
          external: true,
          featured: true,
          popular: '最受欢迎',
        },
      ],
      enterprise: {
        title: '企业与定制解决方案',
        body: '基于商用涂鸦框架提供 OEM/ODM 服务、定制产品与规模化量产 —— 已获 5,800+ 客户信赖，连接超 2 亿台设备。',
        cta: '联系销售',
        ctaHref: 'mailto:service@tuya.com',
      },
    },
    starter: {
      badge: '🎁 免费起步',
      title: '送你 2 个入门授权',
      body: '每位开发者都可在涂鸦开发者平台领取 2 个免费设备授权（价值 ¥20）—— 足以在购买任何量产授权之前，完整地构建、配网并测试一个云端或 AI 项目。',
      points: [
        '面向开发与调试的完整 AI + IoT 能力',
        '无需信用卡 —— 用涂鸦账号即可领取',
        '量产时再升级为 ¥5 / ¥12 授权',
      ],
      claimCta: '领取 2 个免费授权',
      guideCta: '如何申请',
    },
    how: {
      tag: '授权原理',
      title: '授权就是一份凭据，写入一次即可',
      subtitle: '无需维护账号，也没有月账单。下面说明 TuyaOpen 授权到底是什么，以及何时需要它。',
      cards: [
        {
          icon: '🔑',
          title: 'UUID + AuthKey',
          desc: '授权由一个 20 位 UUID 和一个 32 位 AuthKey 组成，由涂鸦签发并与你的产品绑定。二者共同构成设备的云端身份。',
        },
        {
          icon: '☁️',
          title: '仅用于涂鸦云',
          desc: '只有当设备接入涂鸦云时才需要授权。本地、蓝牙、Wi-Fi 以及第三方 API 项目完全免费。',
        },
        {
          icon: '🔒',
          title: '一设备一 UUID',
          desc: '每个 UUID 让一台设备上线。只有在 App 中解绑第一台设备后，AuthKey 才能在另一块板子上复用。',
        },
        {
          icon: '♻️',
          title: '写一次，长期保留',
          desc: '在 MCU 上，授权存于受保护的键值区 —— 固件升级不会丢失，仅在整片擦除时才会清除。',
        },
      ],
    },
    compare: {
      tag: '完整对比',
      title: '各档位解锁的能力',
      subtitle: '逐项对比，内容直接取自 TuyaOpen 文档。',
      cols: [
        { name: '开源开发者', price: '免费' },
        { name: 'IoT', price: '¥5 / 设备' },
        { name: 'AI + IoT', price: '¥12 / 设备' },
      ],
      groups: [
        {
          name: '框架与工具',
          rows: [
            ['开源 C/C++ SDK', true, true, true],
            ['tos.py 构建 / 配置 / 烧录', true, true, true],
            ['Arduino、Lua 与 MicroPython', true, true, true],
            ['11+ 芯片（T 系列、ESP32、树莓派…）', true, true, true],
            ['串口调试与 tyutool 烧录', true, true, true],
          ],
        },
        {
          name: '连接与外设',
          rows: [
            ['Wi-Fi / 蓝牙 / 以太网', true, true, true],
            ['本地局域网控制', true, true, true],
            ['摄像头、麦克风、扬声器、显示屏', true, true, true],
            ['GPIO / PWM / ADC / I²C / SPI', true, true, true],
            ['第三方 API 调用', true, true, true],
          ],
        },
        {
          name: '涂鸦云（IoT）',
          rows: [
            ['接入涂鸦云（MQTT）', false, true, true],
            ['涂鸦智能生活 App 控制', false, true, true],
            ['数据点上报与控制', false, true, true],
            ['设备配网与绑定', false, true, true],
            ['OTA 固件升级', false, true, true],
            ['自定义 IoT 产品', false, true, true],
            ['自定义小程序控制面板', false, true, true],
          ],
        },
        {
          name: '多模态 AI',
          rows: [
            ['唤醒词识别', true, true, true],
            ['云端 ASR / TTS 语音', false, false, true],
            ['大模型对话（ChatGPT、Claude、千问…）', false, false, true],
            ['视觉 / 视觉问答', false, false, true],
            ['MCP 设备工具调用', false, false, true],
            ['AI 智能体平台（技能、情绪）', false, false, true],
            ['可定制 AI 智能体（提示词、角色）', false, false, true],
          ],
        },
        {
          name: '量产与支持',
          rows: [
            ['免费开发者测试授权', false, '入门免费授权', '入门免费授权'],
            ['每设备量产授权', '—', '¥5', '¥12'],
            ['批量烧录与预烧录模块', false, true, true],
            ['商用量产就绪', false, true, true],
            ['社区支持', true, true, true],
          ],
        },
      ],
    },
    steps: {
      tag: '快速上手',
      title: '三步从零接入云端',
      subtitle: '领取免费授权用于测试，写入设备，再确认其已上线。',
      items: [
        {
          n: '1',
          title: '获取授权',
          desc: '在涂鸦开发者平台创建产品，领取 2 个免费开发者授权（价值 ¥20）即可开始。量产时再购买 ¥5 / ¥12 授权。',
          code: `# 涂鸦开发者平台
1. 创建产品（任选一个品类）
2. 选择 T5 模组 + 占位固件
3. 领取 2 个免费授权码
4. 复制你的 UUID + AuthKey`,
          codeTitle: 'platform.tuya.com',
        },
        {
          n: '2',
          title: '写入设备',
          desc: '通过 tuya_config.h 将授权编入固件，或用 auth 命令经串口写入（也可用 tyutool / 网页工具）。',
          code: `// tuya_config.h
#define TUYA_OPENSDK_UUID    "uuidxxxxxxxxxxxxxxxx"
#define TUYA_OPENSDK_AUTHKEY "keyxxxxxxxxxxxxxxxxxx"

# …或经串口：
tos.py monitor -b 115200
auth uuid9f6a6...  cGuDnU2Yxj...`,
          codeTitle: 'authorize',
        },
        {
          n: '3',
          title: '校验并上线',
          desc: '回读已写入的授权，重启后在涂鸦 App 中配网，设备即以你的凭据向云端激活。',
          code: `tuya> auth-read
uuid9f6a6xxxxxxxxxxx
cGuDnU2YxjHJldjxxxxxxxxxxxxxxxxx

# 重启 → 在涂鸦 App 配网 ✓`,
          codeTitle: 'verify',
        },
      ],
      guideCta: '阅读完整授权指南',
    },
    faq: {
      tag: '常见问题',
      title: '常见问题',
      items: [
        {
          q: '为什么需要授权码？',
          a: '授权（UUID + AuthKey）是设备安全接入涂鸦云的身份。一次性购买后，每台设备都拥有自己唯一的授权。',
        },
        {
          q: '什么情况下无需授权？',
          a: '纯本地或离线应用无需授权。蓝牙、Wi-Fi、简单应用以及第三方 API 调用，均可在免费开源框架上运行。',
        },
        {
          q: '这是按月订阅吗？',
          a: '不是。¥5 / ¥12 授权是按连接设备的一次性购买，并非周期性费用。',
        },
        {
          q: '¥5 与 ¥12 授权有何区别？',
          a: '¥5 的 IoT 授权让设备接入涂鸦云，用于 App 控制、DP 数据与 OTA。¥12 的 AI + IoT 授权在此之上增加完整的多模态 AI 智能体：唤醒词、ASR/TTS、大模型、视觉与 MCP 工具调用。',
        },
        {
          q: '授权可以在其他设备上复用吗？',
          a: '每个 UUID 同一时间仅能让一台设备上线。只有在涂鸦智能生活 App 中解绑原设备后，AuthKey 才能在新板子上复用。',
        },
        {
          q: '¥12 授权是否包含 AI tokens？',
          a: '¥12 授权解锁 AI 能力。实际 AI 用量 —— 大模型 token、ASR 时长、TTS 字符 —— 按使用单独计量。明细见授权指南。',
        },
        {
          q: 'TuyaOS 授权能用于 TuyaOpen 吗？',
          a: '不能。TuyaOpen 需要 TuyaOpen 专用授权。TuyaOS 授权码无法在 TuyaOpen 框架内接入云端。',
        },
        {
          q: '是否提供企业或初创优惠？',
          a: '是的。我们为初创、教育与企业提供定制与批量价格。请联系 <a href="mailto:service@tuya.com">service@tuya.com</a> 获取报价。',
        },
      ],
    },
    finalCta: {
      title: '准备好让设备上线了吗？',
      subtitle: '领取两个免费开发者授权，或先看指南写下你的第一个授权。',
    },
  },
}

/* ----------------------------------------------------------------------- */
/* Helpers                                                                 */
/* ----------------------------------------------------------------------- */

function Reveal({ className, children, as: Tag = 'div', ...rest }) {
  return (
    <Tag className={clsx(styles.reveal, className)} data-reveal {...rest}>
      {children}
    </Tag>
  )
}

function CodeWindow({ title, code }) {
  return (
    <div className={styles.codeWindow}>
      <div className={styles.codeHeader}>
        <span className={styles.codeDot} style={{ background: '#EF4444' }} />
        <span className={styles.codeDot} style={{ background: '#F59E0B' }} />
        <span className={styles.codeDot} style={{ background: '#10B981' }} />
        <span className={styles.codeTitle}>{title}</span>
      </div>
      <pre className={styles.codeBody}>
        <code>{code}</code>
      </pre>
    </div>
  )
}

function TierButton({ tier, className }) {
  if (tier.external) {
    return (
      <a className={className} href={tier.ctaHref} target="_blank" rel="noopener noreferrer">
        {tier.cta}
      </a>
    )
  }
  return (
    <Link className={className} to={tier.ctaHref}>
      {tier.cta}
    </Link>
  )
}

function Cell({ value }) {
  if (value === true) return <span className={styles.tick}>✓</span>
  if (value === false) return <span className={styles.cross}>—</span>
  return <span className={styles.cellText}>{value}</span>
}

/* ----------------------------------------------------------------------- */
/* Page                                                                    */
/* ----------------------------------------------------------------------- */

export default function Pricing() {
  const { i18n } = useDocusaurusContext()
  const locale = i18n.currentLocale === 'zh' ? 'zh' : 'en'
  const c = content[locale]
  const base = locale === 'zh' ? '/zh' : ''
  const guideHref = `${base}/pricing-guide`
  const tierImgs = [
    'https://images.tuyacn.com/fe-static/docs/img/9d2e76d8-1ee0-4243-a6a2-fa44ab8855e2.png', // free
    'https://images.tuyacn.com/fe-static/docs/img/30131d50-5cb6-4819-a849-884184eff257.png', // iot
    'https://images.tuyacn.com/fe-static/docs/img/31184fbb-e536-4e69-8dc6-c7d318e18af8.png', // ai
  ]
  const starterImg = 'https://images.tuyacn.com/fe-static/docs/img/30f88543-eb59-493e-9e0d-847c0c50789b.png'
  const howImgs = [
    'https://images.tuyacn.com/fe-static/docs/img/3ff1f0a9-4d3d-45b1-b0ef-1bc5d8c6b387.png', // how-uuid
    'https://images.tuyacn.com/fe-static/docs/img/6599c558-59a6-4051-a40d-cfefb55a696e.png', // how-cloud
    'https://images.tuyacn.com/fe-static/docs/img/bf82d133-86a0-430a-b961-e0acfe230942.png', // how-device
    'https://images.tuyacn.com/fe-static/docs/img/3c69e123-5141-48f4-ad9f-1785095cff8e.png', // how-persist
  ]
  const rootRef = useRef(null)
  const [openFaq, setOpenFaq] = useState(null)

  // Scroll-reveal: fade sections in as they enter the viewport.
  useEffect(() => {
    const root = rootRef.current
    if (!root || typeof IntersectionObserver === 'undefined') return undefined
    const targets = root.querySelectorAll('[data-reveal]')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach((t) => t.classList.add(styles.revealVisible))
      return undefined
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealVisible)
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [locale])

  return (
    <Layout title={c.title} description={c.meta}>
      <Head>
        <title>{c.title}</title>
        <meta name="description" content={c.meta} />
      </Head>

      <main className={styles.root} ref={rootRef}>
        {/* ---------------------------------------------------------- Hero */}
        <section className={styles.hero}>
          <div className={styles.heroGlow} aria-hidden />
          <div className={styles.heroInner}>
            <span className={styles.heroBadge}>{c.badge}</span>
            <h1 className={styles.heroTitle}>
              <span className={styles.heroTitleGradient}>{c.heroTitle[0]}</span> {c.heroTitle[1]}
            </h1>
            <p className={styles.heroSubtitle}>{c.heroSubtitle}</p>
            <div className={styles.heroPills}>
              {c.plans.tiers.map((t, i) => (
                <a key={i} href="#plans" className={clsx(styles.heroPill, t.featured && styles.heroPillFeatured)}>
                  <span className={styles.heroPillPrice}>{t.price}</span>
                  <span className={styles.heroPillName}>{t.name}</span>
                </a>
              ))}
            </div>
            <div className={styles.heroButtons}>
              <a className={styles.btnAccent} href="#plans">
                {c.ctaPlans}
              </a>
              <Link className={styles.btnGhostLight} to={guideHref}>
                {c.ctaGuide}
              </Link>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- Stats */}
        <section className={styles.stats}>
          <div className={styles.statsGrid}>
            {c.stats.map((s, i) => (
              <div className={styles.statItem} key={i}>
                <div className={styles.statValue}>{s.value}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* --------------------------------------------------------- Plans */}
        <section className={styles.section} id="plans">
          <div className={styles.sectionInner}>
            <Reveal className={styles.sectionHeader}>
              <span className={styles.sectionTag}>{c.plans.tag}</span>
              <h2 className={styles.sectionTitle}>{c.plans.title}</h2>
              <p className={styles.sectionSubtitle}>{c.plans.subtitle}</p>
            </Reveal>
            <div className={styles.plansGrid}>
              {c.plans.tiers.map((tier, i) => (
                <Reveal
                  className={clsx(styles.tierCard, tier.featured && styles.tierFeatured)}
                  key={i}
                  style={{ transitionDelay: `${i * 70}ms` }}
                >
                  {tier.popular && <span className={styles.popularBadge}>{tier.popular}</span>}
                  <div className={styles.tierMedia}>
                    <img src={tierImgs[i]} alt={tier.name} loading="lazy" />
                  </div>
                  <div className={styles.tierName}>{tier.name}</div>
                  <p className={styles.tierTagline}>{tier.tagline}</p>
                  <div className={styles.tierPriceRow}>
                    <span className={styles.tierPrice}>{tier.price}</span>
                    {tier.unit && <span className={styles.tierUnit}>{tier.unit}</span>}
                  </div>
                  <div className={styles.tierAlt}>{tier.alt}</div>
                  <div className={styles.tierDivider} />
                  <div className={styles.tierIncludes}>{tier.includes}</div>
                  <ul className={styles.tierFeatures}>
                    {tier.features.map((f, j) => (
                      <li key={j}>{f}</li>
                    ))}
                  </ul>
                  <TierButton
                    tier={tier}
                    className={clsx(styles.tierCta, tier.featured ? styles.btnAccent : styles.btnPrimary)}
                  />
                </Reveal>
              ))}
            </div>

            <Reveal className={styles.enterprise}>
              <div className={styles.enterpriseText}>
                <h3>{c.plans.enterprise.title}</h3>
                <p>{c.plans.enterprise.body}</p>
              </div>
              <a className={styles.btnPrimary} href={c.plans.enterprise.ctaHref}>
                {c.plans.enterprise.cta}
              </a>
            </Reveal>
          </div>
        </section>

        {/* --------------------------------------------------- Starter */}
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <Reveal className={styles.starterBand}>
              <img className={styles.starterImg} src={starterImg} alt="" aria-hidden />
              <div className={styles.starterBody}>
                <span className={styles.starterBadge}>{c.starter.badge}</span>
                <h2 className={styles.starterTitle}>{c.starter.title}</h2>
                <p className={styles.starterText}>{c.starter.body}</p>
                <ul className={styles.starterList}>
                  {c.starter.points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
                <div className={styles.starterCtas}>
                  <a className={styles.btnAccent} href={PLATFORM} target="_blank" rel="noopener noreferrer">
                    {c.starter.claimCta}
                  </a>
                  <Link className={styles.btnGhost} to={guideHref}>
                    {c.starter.guideCta} →
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ------------------------------------------------- How it works */}
        <section className={clsx(styles.section, styles.sectionAlt)} id="how">
          <div className={styles.sectionInner}>
            <Reveal className={styles.sectionHeader}>
              <span className={styles.sectionTag}>{c.how.tag}</span>
              <h2 className={styles.sectionTitle}>{c.how.title}</h2>
              <p className={styles.sectionSubtitle}>{c.how.subtitle}</p>
            </Reveal>
            <div className={styles.infoGrid}>
              {c.how.cards.map((card, i) => (
                <Reveal className={styles.infoCard} key={i} style={{ transitionDelay: `${(i % 4) * 60}ms` }}>
                  <div className={styles.infoMedia}>
                    <img src={howImgs[i]} alt="" loading="lazy" />
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------- Compare */}
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <Reveal className={styles.sectionHeader}>
              <span className={styles.sectionTag}>{c.compare.tag}</span>
              <h2 className={styles.sectionTitle}>{c.compare.title}</h2>
              <p className={styles.sectionSubtitle}>{c.compare.subtitle}</p>
            </Reveal>
            <Reveal className={styles.compareWrap}>
              <table className={styles.compareTable}>
                <thead>
                  <tr>
                    <th />
                    {c.compare.cols.map((col, i) => (
                      <th key={i} className={i === 2 ? styles.colPopular : undefined}>
                        <div className={styles.colHeadName}>{col.name}</div>
                        <div className={styles.colHeadPrice}>{col.price}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {c.compare.groups.map((group, gi) => (
                    <React.Fragment key={gi}>
                      <tr className={styles.groupRow}>
                        <td colSpan={4}>{group.name}</td>
                      </tr>
                      {group.rows.map((row, ri) => (
                        <tr key={ri}>
                          <td>{row[0]}</td>
                          <td>
                            <Cell value={row[1]} />
                          </td>
                          <td>
                            <Cell value={row[2]} />
                          </td>
                          <td className={styles.colPopular}>
                            <Cell value={row[3]} />
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </Reveal>
          </div>
        </section>

        {/* ------------------------------------------------------- Steps */}
        <section className={clsx(styles.section, styles.sectionAlt)}>
          <div className={styles.sectionInner}>
            <Reveal className={styles.sectionHeader}>
              <span className={styles.sectionTag}>{c.steps.tag}</span>
              <h2 className={styles.sectionTitle}>{c.steps.title}</h2>
              <p className={styles.sectionSubtitle}>{c.steps.subtitle}</p>
            </Reveal>
            <div className={styles.stepsGrid}>
              {c.steps.items.map((step, i) => (
                <Reveal className={styles.stepCard} key={i} style={{ transitionDelay: `${i * 70}ms` }}>
                  <div className={styles.stepNum}>{step.n}</div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                  <CodeWindow title={step.codeTitle} code={step.code} />
                </Reveal>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '2.25rem' }}>
              <Link className={styles.btnGhost} to={guideHref}>
                {c.steps.guideCta} →
              </Link>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- FAQ */}
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <Reveal className={styles.sectionHeader}>
              <span className={styles.sectionTag}>{c.faq.tag}</span>
              <h2 className={styles.sectionTitle}>{c.faq.title}</h2>
            </Reveal>
            <div className={styles.faqContainer}>
              {c.faq.items.map((item, i) => (
                <div className={styles.faqItem} key={i}>
                  <div
                    className={clsx(styles.faqQuestion, openFaq === i && styles.active)}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    {item.q}
                  </div>
                  <div className={clsx(styles.faqAnswer, openFaq === i && styles.show)}>
                    <p dangerouslySetInnerHTML={{ __html: item.a }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------- Final CTA */}
        <section className={styles.ctaBand}>
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>{c.finalCta.title}</h2>
            <p className={styles.ctaSubtitle}>{c.finalCta.subtitle}</p>
            <div className={styles.ctaButtons}>
              <a className={styles.btnAccent} href={PLATFORM} target="_blank" rel="noopener noreferrer">
                {c.plans.tiers[1].cta}
              </a>
              <Link className={styles.btnOutlineLight} to={guideHref}>
                {c.ctaGuide}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  )
}
