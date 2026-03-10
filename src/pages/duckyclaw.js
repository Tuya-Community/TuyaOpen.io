import Head from '@docusaurus/Head'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import { clsx } from 'clsx'
import React from 'react'

import IconGithub from '../../static/img/icons/github.svg'
import styles from './duckyclaw.module.css'

const BANNER_IMG = 'https://images.tuyacn.com/fe-static/docs/img/210f532a-0bb1-4ca5-9037-f5488958a709.jpg'
const ARCH_IMG_ZH = 'https://images.tuyacn.com/fe-static/docs/img/9b8d1a57-3359-4837-af84-710f729d8e48.png'
const ARCH_IMG_EN = 'https://images.tuyacn.com/fe-static/docs/img/bbeed5a9-9fb5-4710-b20b-76fb3ed1add4.png'

/** Demo video: set URL to show in 效果展示 (ZH). EN stays "Work in progress". */
const DEMO_VIDEO_URL = 'https://www.bilibili.com/video/BV1dePxzfEvd'
/** Optional: iframe embed URL (e.g. Bilibili player) so the video shows on the page for ZH. */
const DEMO_VIDEO_EMBED_URL =
  'https://player.bilibili.com/player.html?isOutside=true&aid=116182740896449&bvid=BV1dePxzfEvd&cid=36504996323&p=1'

const t = (en, zh, isZh) => (isZh ? zh : en)

/** DuckyClaw skills list: name, category, deployment, purpose (en/zh) */
const SKILLS_LIST = [
  {
    nameEn: 'Long-term memory',
    nameZh: '长期记忆',
    emoji: '🧠',
    categoryEn: 'Memory & storage',
    categoryZh: '记忆与存储',
    deployEn: 'Device',
    deployZh: '端侧',
    purposeEn: 'Persist key conversation and daily event logs on device for cross-session long-term memory.',
    purposeZh: '在设备端持久化存储关键对话信息与每日事件日志，实现跨会话的长期记忆能力',
  },
  {
    nameEn: 'CORN (local cron)',
    nameZh: 'CORN（本地定时）',
    emoji: '⏰',
    categoryEn: 'Task scheduling',
    categoryZh: '任务调度',
    deployEn: 'Device',
    deployZh: '端侧',
    purposeEn: 'Parse timed and scheduled tasks from conversation; trigger reminders or to-dos at specified times.',
    purposeZh: '解析对话中的定时与计划任务，于指定时间自动触发 AI 执行提醒或待办事项',
  },
  {
    nameEn: 'Skill creation',
    nameZh: '技能创建',
    emoji: '✨',
    categoryEn: 'Capability extension',
    categoryZh: '能力扩展',
    deployEn: 'Device',
    deployZh: '端侧',
    purposeEn: 'Users grant AI new abilities via natural language; AI learns and stores new skills locally over time.',
    purposeZh: '支持用户通过自然语言交互主动赋予 AI 新能力，AI 在持续对话中自主学习并本地化存储新技能',
  },
  {
    nameEn: 'Personality definition',
    nameZh: '性格定义',
    emoji: '🎭',
    categoryEn: 'Personalization',
    categoryZh: '个性化配置',
    deployEn: 'Device',
    deployZh: '端侧',
    purposeEn:
      'Configure AI personality, language style, values and behavior on device; record user profile perceived by AI.',
    purposeZh: '在设备本地配置 AI 的性格特质、语言风格、价值取向与行为规范，并记录 AI 对用户特征的认知画像',
  },
  {
    nameEn: 'Heartbeat wake-up',
    nameZh: '心跳唤醒',
    emoji: '💓',
    categoryEn: 'Task scheduling',
    categoryZh: '任务调度',
    deployEn: 'Device',
    deployZh: '端侧',
    purposeEn: 'AI periodically checks device to-do list and proactively reminds unfinished tasks for closure.',
    purposeZh: 'AI 按周期自主检查设备端待办清单，对未完成任务进行主动提醒，保障任务闭环执行',
  },
  {
    nameEn: 'Command terminal',
    nameZh: '命令终端',
    emoji: '💻',
    categoryEn: 'Capability extension',
    categoryZh: '能力扩展',
    deployEn: 'Device (Linux only)',
    deployZh: '端侧-Linux Only',
    purposeEn:
      'Natural language to local Shell; AI parses and runs Bash commands for toolchains and system management.',
    purposeZh:
      '支持通过自然语言与设备本地 Shell 命令交互，AI 可解析并执行 Bash 指令，适用于定制化工具链调用、系统管理等高级需求',
  },
  {
    nameEn: 'File operations',
    nameZh: '文件操作',
    emoji: '📁',
    categoryEn: 'Capability extension',
    categoryZh: '能力扩展',
    deployEn: 'Device',
    deployZh: '端侧',
    purposeEn: 'Read, write, move, and delete files on device; control file management via conversation.',
    purposeZh: '实现对设备本地文件系统的读取、写入、移动及删除操作，通过会话控制文件管理任务，提升端侧自动化能力',
  },
  {
    nameEn: 'Local service monitoring',
    nameZh: '本地服务监控',
    emoji: '📊',
    categoryEn: 'Task scheduling',
    categoryZh: '任务调度',
    deployEn: 'Device (Linux only)',
    deployZh: '端侧-Linux Only',
    purposeEn:
      'Monitor key local service processes; alert on failure and support auto-heal or restart for high availability.',
    purposeZh: '检查与监控本地关键服务进程运行状态，异常时自动告警，并支持服务自愈或重启操作，保障系统高可用性',
  },
  {
    nameEn: 'Resource usage analysis',
    nameZh: '资源占用分析',
    emoji: '📈',
    categoryEn: 'Information retrieval',
    categoryZh: '信息检索',
    deployEn: 'Device (Linux only)',
    deployZh: '端侧-Linux Only',
    purposeEn: 'Report real-time CPU, memory, disk usage to help optimize performance and resource allocation.',
    purposeZh: '提供对本地 CPU、内存、磁盘等资源实时占用情况的分析与汇报，辅助用户优化系统性能和资源分配',
  },
  {
    nameEn: 'Web search',
    nameZh: '联网搜索',
    emoji: '🔍',
    categoryEn: 'Information retrieval',
    categoryZh: '信息检索',
    deployEn: 'Cloud',
    deployZh: '云端',
    purposeEn: 'Search the internet for accurate, up-to-date information and knowledge.',
    purposeZh: '自主检索互联网实时信息，提供准确、时效性强的知识支持',
  },
  {
    nameEn: 'IoT whole-home control',
    nameZh: 'IoT 全屋控制',
    emoji: '🏠',
    categoryEn: 'Device control',
    categoryZh: '设备控制',
    deployEn: 'Cloud',
    deployZh: '云端',
    purposeEn: 'Control Powered by Tuya devices: lighting, appliances, cleaning, and full smart-home scenarios.',
    purposeZh: '全面支持控制基于 Powered by Tuya 生态的硬件设备，覆盖照明、用电、清洁等全品类智能家居场景',
  },
  {
    nameEn: 'Emotion perception',
    nameZh: '情绪感知',
    emoji: '😊',
    categoryEn: 'Emotional interaction',
    categoryZh: '情感交互',
    deployEn: 'Cloud',
    deployZh: '云端',
    purposeEn: 'Analyze conversation to detect user emotion and present it as text or Emoji.',
    purposeZh: '实时分析对话内容以识别用户情绪状态，并通过文本或 Emoji 的形式直观呈现情绪信息',
  },
  {
    nameEn: 'Weather',
    nameZh: '天气获取',
    emoji: '🌤️',
    categoryEn: 'Information retrieval',
    categoryZh: '信息检索',
    deployEn: 'Cloud',
    deployZh: '云端',
    purposeEn: 'Get global real-time weather without extra config; support multi-scenario queries.',
    purposeZh: '无需额外配置，即可跨地域获取全球实时天气数据，支持多场景气象信息查询',
  },
  {
    nameEn: 'MCP tools',
    nameZh: 'MCP 工具',
    emoji: '🔧',
    categoryEn: 'Capability extension',
    categoryZh: '能力扩展',
    deployEn: 'Cloud / Device',
    deployZh: '云端/端侧',
    purposeEn: 'Develop and deploy MCP servers to extend AI capabilities without changing the LLM application.',
    purposeZh: '支持独立开发与部署 MCP 服务器，在不变更 LLM 应用本体的前提下，灵活扩展 AI 的功能边界与工具能力',
  },
  {
    nameEn: 'Image recognition',
    nameZh: '图片识别',
    emoji: '🖼️',
    categoryEn: 'Multimodal perception',
    categoryZh: '多模态感知',
    deployEn: 'Cloud',
    deployZh: '云端',
    purposeEn: 'Understand and analyze image content; support object detection and scene description.',
    purposeZh: '对输入的图像内容进行语义理解与结构化分析，支持目标检测、场景描述等视觉认知任务',
  },
  {
    nameEn: 'Text-to-image',
    nameZh: '文字生图',
    emoji: '🎨',
    categoryEn: 'Multimodal generation',
    categoryZh: '多模态生成',
    deployEn: 'Cloud',
    deployZh: '云端',
    purposeEn: 'Generate images from natural language descriptions; support multiple styles and scenes.',
    purposeZh: '根据自然语言描述生成对应的图像内容，支持多风格、多场景的 AI 图像创作',
  },
  {
    nameEn: 'ASR',
    nameZh: 'ASR',
    emoji: '🎤',
    categoryEn: 'Voice processing',
    categoryZh: '语音处理',
    deployEn: 'Cloud',
    deployZh: '云端',
    purposeEn: 'Convert user speech into structured text for AI processing.',
    purposeZh: '将用户输入的语音信号精准转换为可供 AI 处理的结构化文本内容',
  },
  {
    nameEn: 'TTS',
    nameZh: 'TTS',
    emoji: '🔊',
    categoryEn: 'Voice processing',
    categoryZh: '语音处理',
    deployEn: 'Cloud',
    deployZh: '云端',
    purposeEn: 'Synthesize LLM text into natural speech and stream to device for playback.',
    purposeZh: '将 LLM 生成的文本响应合成为自然语音，并实时下发至设备端进行播放',
  },
  {
    nameEn: 'Triggers',
    nameZh: '触发器',
    emoji: '⚡',
    categoryEn: 'Automation rules',
    categoryZh: '自动化规则',
    deployEn: 'Cloud',
    deployZh: '云端',
    purposeEn:
      'When device meets trigger conditions, invoke agent automatically (e.g. low battery, temperature alert).',
    purposeZh:
      '当设备满足预设的事件触发条件时，自动唤起智能体执行对应任务，适用于低电量告警、温度异常等规则化自动化场景',
  },
  {
    nameEn: 'NetEase Cloud Music',
    nameZh: '网易云音乐',
    emoji: '🎵',
    categoryEn: 'Media service',
    categoryZh: '媒体服务',
    deployEn: 'Cloud',
    deployZh: '云端',
    purposeEn: 'Access NetEase Cloud Music and play streams on device.',
    purposeZh: '接入网易云音乐服务，获取音乐资源流并在设备端进行本地播放',
  },
  {
    nameEn: 'Device self-control',
    nameZh: '设备自控',
    emoji: '🤖',
    categoryEn: 'Device control',
    categoryZh: '设备控制',
    deployEn: 'Cloud',
    deployZh: '云端',
    purposeEn: 'Device parses user intent and controls its own hardware via conversation.',
    purposeZh: '设备自主解析用户语义指令并执行相应操作，实现用户对话控制设备硬件功能',
  },
  {
    nameEn: 'Device remote control',
    nameZh: '设备被控',
    emoji: '📡',
    categoryEn: 'Device control',
    categoryZh: '设备控制',
    deployEn: 'Cloud',
    deployZh: '云端',
    purposeEn: 'Device acts as controlled node; accept commands from other devices for cross-device automation.',
    purposeZh: '当前设备作为受控端，接受其他设备下发的控制指令，支持构建跨设备协同联动的自动化控制场景',
  },
  {
    nameEn: 'Model switching',
    nameZh: '模型切换',
    emoji: '🔄',
    categoryEn: 'Platform management',
    categoryZh: '平台管理',
    deployEn: 'Cloud',
    deployZh: '云端',
    purposeEn: 'Switch mainstream LLMs on Tuya developer platform to fit different scenarios.',
    purposeZh: '通过涂鸦开发者平台快速切换主流大语言模型配置，灵活适配不同业务场景的模型需求',
  },
  {
    nameEn: 'Voice switching',
    nameZh: '音色切换',
    emoji: '🎙️',
    categoryEn: 'Platform management',
    categoryZh: '平台管理',
    deployEn: 'Cloud',
    deployZh: '云端',
    purposeEn: 'Switch TTS voice on Tuya developer platform for personalized experience.',
    purposeZh: '通过涂鸦开发者平台快速切换设备 TTS 播放音色，满足个性化语音交互体验需求',
  },
  {
    nameEn: 'MCP (multi-component processor)',
    nameZh: 'MCP（多组件处理器）',
    emoji: '⚙️',
    categoryEn: 'Capability extension',
    categoryZh: '能力扩展',
    deployEn: 'Device / Cloud',
    deployZh: '端侧/云端',
    purposeEn:
      'Register hardware (GPIO, sensors, relays, servos, motors) via open interfaces so AI can control and schedule them in conversation and automation.',
    purposeZh:
      '支持将底层硬件功能（如 GPIO 控制、环境传感器数据采集、继电器/舵机/电机控制等）通过开放接口统一注册到 AI 系统，实现硬件能力的原生对话调用与自动化调度，助力个性化智能场景开发与设备功能二次扩展',
  },
]

/* Neo beams: shorter length; each shoots briefly, long cycle = fewer lit at once */
const NEO_BEAM_COUNT = 20
const neoBeams = Array.from({ length: NEO_BEAM_COUNT }, (_, i) => {
  const baseAngle = (360 / NEO_BEAM_COUNT) * i
  const angle = baseAngle + (Math.random() * 20 - 10) // ±10° offset
  const duration = 7 + (i % 4) * 1.5 + (i % 3) * 0.8
  const delay = (i % 9) * 0.9 + (i % 2) * 0.4
  return { angle, duration, delay }
})

/* Snow/ash flakes: slightly larger, star-like with variant brightness */
const FLAKE_COUNT = 36
const snowAshFlakes = Array.from({ length: FLAKE_COUNT }, (_, i) => {
  const left = (i * 31 + 7) % 98
  const top = (i * 23 + 11) % 95
  const size = 4 + (i % 4) + (i % 3) * 0.6
  const duration = 8 + (i % 6) * 2 + (i % 2) * 1.5
  const delay = (i % 11) * 0.6 + (i % 5) * 0.2
  const drift = (i % 5) - 2
  const type = i % 4 === 0 ? 'ash' : i % 4 === 1 ? 'ember' : 'snow'
  const brightness = i % 3 === 0 ? 'dim' : i % 3 === 1 ? 'mid' : 'bright'
  return { left, top, size, duration, delay, drift, type, brightness }
})

export default function DuckyClaw() {
  const { siteConfig, i18n } = useDocusaurusContext()
  const isZh = (i18n.currentLocale || '').startsWith('zh')
  const [archLightboxOpen, setArchLightboxOpen] = React.useState(false)
  const [workflowLightboxOpen, setWorkflowLightboxOpen] = React.useState(false)
  const [skillsExpanded, setSkillsExpanded] = React.useState(false)
  const workflowImageSrc = 'https://images.tuyacn.com/content-platform/hestia/175551024951299d2e04e.png'
  React.useEffect(() => {
    if (!archLightboxOpen) return
    const onEscape = (e) => {
      if (e.key === 'Escape') setArchLightboxOpen(false)
    }
    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [archLightboxOpen])
  React.useEffect(() => {
    if (!workflowLightboxOpen) return
    const onEscape = (e) => {
      if (e.key === 'Escape') setWorkflowLightboxOpen(false)
    }
    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [workflowLightboxOpen])

  return (
    <Layout
      title={t('DuckyClaw Project', 'DuckyClaw 项目', isZh)}
      description={t(
        'AI Agent in the physical world. Deploy OpenClaw-style agents to MCUs, SoCs, and PCs with one codebase.',
        '端侧 AI Agent 框架：一套代码，横跨 MCU、SoC、PC 部署。',
        isZh,
      )}
      wrapperClassName={clsx(styles.page, styles.duckyclawTheme)}
    >
      <Head>
        <title>DuckyClaw — {siteConfig.title}</title>
        <meta
          name="description"
          content={t(
            'Hardware-oriented OpenClaw. One TuyaOpen key. Deploy to T5AI, ESP32, Raspberry Pi, Linux.',
            '面向硬件的 OpenClaw。一个 TuyaOpen 密钥，部署到 T5AI、ESP32、树莓派、Linux。',
            isZh,
          )}
        />
      </Head>

      {/* Hero — neo beams + content + banner in one main section */}
      <section className={styles.hero} id="top">
        {/* Red neo beams: expand from center, dynamic length & speed */}
        <div className={styles.heroNeoBeams} aria-hidden="true">
          {neoBeams.map((beam, i) => (
            <div
              key={i}
              className={styles.neoBeam}
              style={{
                '--beam-angle': `${beam.angle}deg`,
                '--beam-duration': `${beam.duration}s`,
                '--beam-delay': `${beam.delay}s`,
              }}
            />
          ))}
        </div>

        {/* Random snow/ash flake drift */}
        <div className={styles.heroSnowAsh} aria-hidden="true">
          {snowAshFlakes.map((f, i) => (
            <div
              key={i}
              className={styles.snowAshFlake}
              data-type={f.type}
              data-brightness={f.brightness}
              style={{
                left: `${f.left}%`,
                top: `${f.top}%`,
                width: f.size,
                height: f.size,
                '--flake-duration': `${f.duration}s`,
                '--flake-delay': `${f.delay}s`,
                '--flake-drift': `${f.drift}px`,
              }}
            />
          ))}
        </div>

        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>{t('Open source · TuyaOpen', '开源 · TuyaOpen', isZh)}</span>
          <h1 className={styles.heroTitle}>DuckyClaw 🐣🦞</h1>
          <p className={styles.heroTagline}>
            {t(
              'Your autonomous AI companion. Deploy agent brains to real hardware—MCUs, SoCs, PCs. One codebase.',
              '你的自主 AI 伙伴。将 Agent 大脑部署到真实硬件：MCU、SoC、PC，一套代码。',
              isZh,
            )}
          </p>
          <div className={styles.heroCtas}>
            <Link to="#quickstart" className={styles.heroCtaPrimary}>
              {t('Get started', '快速开始', isZh)}
            </Link>
            <Link to="#architecture" className={styles.heroCtaSecondary}>
              {t('See architecture', '查看架构', isZh)}
            </Link>
            <a
              href="https://github.com/tuya/DuckyClaw"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.heroCtaSecondary}
            >
              GitHub
            </a>
          </div>

          {/* Banner image inside main page section */}
          <div className={styles.heroBannerWrap}>
            <img src={BANNER_IMG} alt={t('DuckyClaw project banner', 'DuckyClaw 项目横幅', isZh)} />
          </div>
        </div>
      </section>

      {/* In-page nav (anchor strip) — order matches page flow */}
      <div className="tw-container tw-mx-auto tw-px-4">
        <nav className={styles.anchorStrip} aria-label={t('Page sections', '页面章节', isZh)}>
          <a href="#intro" className={styles.anchorLink}>
            {t('Intro', '介绍', isZh)}
          </a>
          <a href="#features" className={styles.anchorLink}>
            {t('Core features', '核心功能', isZh)}
          </a>
          <a href="#quickstart" className={styles.anchorLink}>
            {t('Quick start', '快速开始', isZh)}
          </a>
          <a href="#hardware" className={styles.anchorLink}>
            {t('Hardware support', '硬件支持', isZh)}
          </a>
          <a href="#hardware-skills" className={styles.anchorLink}>
            {t('Hardware skills', '硬件技能', isZh)}
          </a>
          <a href="#skills-list" className={styles.anchorLink}>
            {t('Skills list', '技能清单', isZh)}
          </a>
          <a href="#agent-workflow" className={styles.anchorLink}>
            {t('Agent & Cloud', 'Agent 与云', isZh)}
          </a>
          <a href="#architecture" className={styles.anchorLink}>
            {t('Architecture', '架构', isZh)}
          </a>
          <a href="#specs" className={styles.anchorLink}>
            {t('Platform overview', '平台总览', isZh)}
          </a>
          <a href="#community" className={styles.anchorLink}>
            {t('Community & links', '社区与链接', isZh)}
          </a>
          <a href="#more" className={styles.anchorLink}>
            {t('See it in action', '效果展示', isZh)}
          </a>
        </nav>
      </div>

      {/* Intro */}
      <section className={`${styles.section} ${styles.sectionAlt}`} id="intro">
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>{t('What is DuckyClaw?', '什么是 DuckyClaw？', isZh)}</h2>
          <p className={styles.sectionSubtitle}>
            {t(
              'A hardware-oriented AI Agent framework. Not just a dev board—a full deployment stack for the physical world.',
              '面向硬件的 AI Agent 框架。不只是一块开发板，而是物理世界的完整部署栈。',
              isZh,
            )}
          </p>
          <p className={styles.introLead}>
            {t(
              'When your AI Agent needs to perceive, decide, and control real devices, DuckyClaw is the stack. Built on TuyaOpen C SDK—no Node.js on MCU. One codebase from ARM Cortex-M to x64.',
              '当 AI Agent 需要感知、决策并控制真实设备时，DuckyClaw 就是这套技术栈。基于 TuyaOpen C SDK 构建，MCU 上无需 Node.js。从 ARM Cortex-M 到 x64，一套代码。',
              isZh,
            )}
          </p>
          <ul className={styles.introPoints}>
            <li className={styles.introPoint}>
              {t(
                'Device–cloud fusion: low cost, one TuyaOpen key for unified access to services.',
                '端云融合：低成本，一个 TuyaOpen 密钥统一接入各项服务。',
                isZh,
              )}
            </li>
            <li className={styles.introPoint}>
              {t('Unified messaging: Telegram, Discord, Feishu.', '统一消息：Telegram、Discord、飞书。', isZh)}
            </li>
            <li className={styles.introPoint}>
              {t(
                'Native IoT control: real devices in the Tuya ecosystem.',
                '原生 IoT 控制：涂鸦生态中的真实设备。',
                isZh,
              )}
            </li>
            <li className={styles.introPoint}>
              {t(
                'Proactive agent: agentic loop and monitoring, not just chat.',
                '主动式 Agent：Agent 循环与监控，不止于聊天。',
                isZh,
              )}
            </li>
          </ul>
        </div>
      </section>

      {/* Features */}
      <section className={styles.section} id="features">
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>{t('Core features', '核心功能', isZh)}</h2>
          <p className={styles.sectionSubtitle}>
            {t(
              'Everything you need to run an AI Agent on the edge and in the cloud.',
              '在边缘与云端运行 AI Agent 所需的一切。',
              isZh,
            )}
          </p>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <span className={styles.featureCardNewTag}>{t('NEW', 'NEW', isZh)}</span>
              <div className={styles.featureIcon}>☁️</div>
              <h3 className={styles.featureTitle}>{t('Device–Cloud Multi-Agent', '端/云 混合Agent', isZh)}</h3>
              <p className={styles.featureDesc}>
                {t(
                  'On-device and cloud agents in one system. Tuya Cloud for LLM, RAG, MCP.',
                  '设备端与云端 Agent 一体。涂鸦云提供 LLM、RAG、MCP。',
                  isZh,
                )}
              </p>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.featureCardNewTag}>{t('NEW', 'NEW', isZh)}</span>
              <div className={styles.featureIcon}>🏠</div>
              <h3 className={styles.featureTitle}>{t('IoT device control', 'IoT 设备控制', isZh)}</h3>
              <p className={styles.featureDesc}>
                {t(
                  'Control Tuya smart devices directly. IoT memory learns your preferences.',
                  '直接控制涂鸦智能设备。IoT 记忆学习你的偏好。',
                  isZh,
                )}
              </p>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.featureCardNewTag}>{t('NEW', 'NEW', isZh)}</span>
              <div className={styles.featureIcon}>🎤</div>
              <h3 className={styles.featureTitle}>{t('Hardware voice (ASR)', '硬件语音 ASR', isZh)}</h3>
              <p className={styles.featureDesc}>
                {t(
                  'Voice input with ASR on supported boards. No extra app needed.',
                  '在支持的板子上用 ASR 语音输入，无需额外应用。',
                  isZh,
                )}
              </p>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.featureCardNewTag}>{t('NEW', 'NEW', isZh)}</span>
              <div className={styles.featureIcon}>🔌</div>
              <h3 className={styles.featureTitle}>{t('Device skills', '设备技能', isZh)}</h3>
              <p className={styles.featureDesc}>
                {t(
                  'Extensible hardware skills: cameras, sensors, displays. Build and plug in your own; deep integration with the agent loop.',
                  '可扩展硬件技能：摄像头、传感器、显示屏。自建并接入，与 Agent 循环深度集成。',
                  isZh,
                )}
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>💬</div>
              <h3 className={styles.featureTitle}>{t('Unified messaging', '统一消息', isZh)}</h3>
              <p className={styles.featureDesc}>
                {t(
                  'Telegram, Discord, Feishu via one gateway. No platform lock-in.',
                  '通过统一网关接入 Telegram、Discord、飞书，无平台锁定。',
                  isZh,
                )}
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🧩</div>
              <h3 className={styles.featureTitle}>{t('MCP tools', 'MCP 工具', isZh)}</h3>
              <p className={styles.featureDesc}>
                {t(
                  'CRON, FILE, IoT control, EXEC (e.g. RPi). Extensible skill plugins.',
                  'CRON、FILE、IoT 控制、EXEC（如 RPi）。可扩展技能插件。',
                  isZh,
                )}
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🧠</div>
              <h3 className={styles.featureTitle}>{t('Persistent memory', '持久记忆', isZh)}</h3>
              <p className={styles.featureDesc}>
                {t(
                  'Agent.txt, memory.txt, IoT memory. Context that evolves over time.',
                  'Agent.txt、memory.txt、IoT 记忆。随时间的上下文。',
                  isZh,
                )}
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>💓</div>
              <h3 className={styles.featureTitle}>{t('Agent loop heartbeat', 'Agent 循环心跳', isZh)}</h3>
              <p className={styles.featureDesc}>
                {t(
                  'Heartbeat mechanism keeps the agent loop alive: scheduled pings, health checks, and continuous background operation.',
                  '心跳机制维持 Agent 循环运行：定时 ping、健康检查与持续后台运行。',
                  isZh,
                )}
              </p>
            </div>
          </div>
          {/* Placeholder CTA — add link later
          <div className="tw-text-center tw-mt-8">
            <Link to="/docs/about-tuyaopen" className={styles.quickstartBtn}>
              {t('Read full feature list', '查看完整功能列表', isZh)} →
            </Link>
          </div> */}
        </div>
      </section>

      {/* Quick start */}
      <section className={`${styles.section} ${styles.sectionAlt} ${styles.sectionCompactAfter}`} id="quickstart">
        <div className={styles.sectionInner}>
          <img
            src="https://images.tuyacn.com/fe-static/docs/img/362d79aa-d41a-4bc8-8da5-794d8af7194c.png"
            alt={t('Quick start illustration', '快速开始示意图', isZh)}
            className={styles.quickStartImage}
          />
          <h2 className={styles.sectionTitle}>{t('Quick start', '快速开始', isZh)}</h2>
          <p className={styles.sectionSubtitle}>
            {t(
              'One TuyaOpen key. Pick your board. Configure and run.',
              '一个 TuyaOpen 密钥。选择开发板。配置并运行。',
              isZh,
            )}
          </p>
          <div className={styles.quickstartSteps}>
            <Link to="/pricing" className={styles.quickstartBtn}>
              {t('Get Auth/License Key', '获取授权码', isZh)}
            </Link>
            <a href="#hardware" className={styles.quickstartBtn}>
              {t('Pick your board', '选择开发板', isZh)} →
            </a>
          </div>
        </div>
      </section>

      {/* Hardware support */}
      <section className={`${styles.section} ${styles.sectionAlt} ${styles.sectionCompactBefore}`} id="hardware">
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>{t('Hardware support', '硬件支持', isZh)}</h2>
          <p className={styles.sectionSubtitle}>
            {t(
              'One codebase. From microcontrollers to single-board computers to PC.',
              '一套代码。从微控制器到单板机再到 PC。',
              isZh,
            )}
          </p>

          <div className={styles.quickstartCtaWrap}>
            <Link to="/docs/duckyclaw/ducky-quick-start-T5AI" className={styles.quickstartBtn}>
              {t(
                'DuckyClaw quick start: T5-AI Board · ESP32-S3 · Raspberry Pi 5',
                'DuckyClaw 快速开始：T5-AI Board · ESP32-S3 · Raspberry Pi 5',
                isZh,
              )}
            </Link>
          </div>
          <div className={styles.hardwareGrid}>
            <div className={styles.hardwareCard}>
              <span className={styles.hardwareCardRecommendTag}>{t('Recommend', '推荐', isZh)}</span>
              <div className={styles.hardwareCardImageWrap}>
                <img
                  src="https://images.tuyacn.com/fe-static/docs/img/a693145e-919d-440f-9ef5-abeaf36fb7d5.png"
                  alt="Tuya T5"
                  className={styles.hardwareCardImage}
                />
              </div>
              <div className={styles.hardwareCategory}>MCU</div>
              <p className={styles.hardwareList}>Tuya T5AI Board</p>
              <div className={styles.hardwareCardBtns}>
                <Link to="/get-hardware" className={styles.hardwareCardBtnPrimary}>
                  {t('Purchase', '购买', isZh)}
                </Link>
                <Link
                  to="/docs/hardware-specific/tuya-t5/t5-ai-board/overview-t5-ai-board"
                  className={styles.hardwareCardBtnSecondary}
                >
                  {t('HW Docs', '硬件文档', isZh)}
                </Link>
                <Link to="/docs/duckyclaw/ducky-quick-start-T5AI" className={styles.hardwareCardBtnSecondary}>
                  {t('Quick start(T5)', '快速开始(T5)', isZh)}
                </Link>
              </div>
            </div>
            <div className={styles.hardwareCard}>
              <span className={styles.hardwareCardRecommendTag}>{t('Recommend', '推荐', isZh)}</span>
              <div className={styles.hardwareCardImageWrap}>
                <img
                  src="https://images.tuyacn.com/fe-static/docs/img/3cdadc91-6974-40b0-83d1-683f33a68b6e.png"
                  alt="Tuya T5"
                  className={styles.hardwareCardImage}
                />
              </div>
              <div className={styles.hardwareCategory}>MCU</div>
              <p className={styles.hardwareList}>Tuya T5AI Core</p>
              <div className={styles.hardwareCardBtns}>
                <Link to="/get-hardware" className={styles.hardwareCardBtnPrimary}>
                  {t('Purchase', '购买', isZh)}
                </Link>
                <Link
                  to="/docs/hardware-specific/tuya-t5/t5-ai-core/overview-t5-ai-core"
                  className={styles.hardwareCardBtnSecondary}
                >
                  {t('HW Docs', '硬件文档', isZh)}
                </Link>
                <Link to="/docs/duckyclaw/ducky-quick-start-T5AI" className={styles.hardwareCardBtnSecondary}>
                  {t('Quick start (T5)', '快速开始 (T5)', isZh)}
                </Link>
              </div>
            </div>
            {isZh && (
              <div className={styles.hardwareCard}>
                <span className={styles.hardwareCardRecommendTag}>推荐</span>
                <div className={styles.hardwareCardImageWrap}>
                  <img
                    src="https://images.tuyacn.com/fe-static/docs/img/f3d126d5-3613-491a-847f-490440354837.jpg"
                    alt="正点电子 T5AI"
                    className={styles.hardwareCardImage}
                  />
                </div>
                <div className={styles.hardwareCategory}>MCU</div>
                <p className={styles.hardwareList}>正点电子 T5AI</p>
                <div className={styles.hardwareCardBtns}>
                  <a
                    href="https://detail.tmall.com/item.htm?abbucket=14&id=1003181296002&rn=7f1543f99cd08ddb7ff3e50cc9d30043&skuId=6156250414801&spm=a1z10.5-b.w4011-22287621884.60.340c7ed3QgtFMz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.hardwareCardBtnPrimary}
                  >
                    购买
                  </a>
                  <a
                    href="https://wiki.alientek.com/docs/category/%E5%85%A5%E9%97%A8%E6%8C%87%E5%8D%97-2/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.hardwareCardBtnSecondary}
                  >
                    硬件文档
                  </a>
                  <Link to="/docs/duckyclaw/ducky-quick-start-T5AI" className={styles.hardwareCardBtnSecondary}>
                    快速开始 (T5)
                  </Link>
                </div>
              </div>
            )}
            <div className={styles.hardwareCard}>
              <div className={styles.hardwareCardImageWrap}>
                <img
                  src="https://images.tuyacn.com/fe-static/docs/img/42eb8d02-cc72-41ec-ad57-956461e8c85a.png"
                  alt="ESP32"
                  className={styles.hardwareCardImage}
                />
              </div>
              <div className={styles.hardwareCategory}>MCU</div>
              <p className={styles.hardwareList}>ESP32 series</p>
              <div className={styles.hardwareCardBtns}>
                <Link to="/docs/duckyclaw/ducky-quick-start-ESP32S3" className={styles.hardwareCardBtnSecondary}>
                  {t('Quick start (ESP32-S3)', '快速开始 (ESP32-S3)', isZh)}
                </Link>
              </div>
            </div>
            <div className={styles.hardwareCard}>
              <div className={styles.hardwareCardImageWrap}>
                <img
                  src="https://images.tuyacn.com/fe-static/docs/img/b748b5fb-ac48-4fa1-98c6-9faaf5430d32.png"
                  alt="DshanPI-A1 RK3576"
                  className={styles.hardwareCardImage}
                />
              </div>
              <div className={styles.hardwareCategory}>SoC</div>
              <p className={styles.hardwareList}>DshanPI-A1 RK3576</p>
              <div className={styles.hardwareCardBtns}>
                <a
                  href="https://item.taobao.com/item.htm?abbucket=12&id=967894092488&mi_id=00000nOXSB4r1ZaQXcCIxcYrEMOMYzE4c3vgpsZWLGSWvEU&ns=1&skuId=6097645322398&spm=a21n57.1.hoverItem.1&utparam=%7B%22aplus_abtest%22%3A%22f0530f6557e6318bdabd61ab6573770f%22%7D&xxc=taobaoSearch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.hardwareCardBtnPrimary}
                >
                  {t('Purchase', '购买', isZh)}
                </a>
                <a
                  href="https://wiki.dshanpi.org/en/docs/DshanPi-A1/intro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.hardwareCardBtnSecondary}
                >
                  {t('HW Docs', '硬件文档', isZh)}
                </a>
                <span className={styles.hardwareCardBtnDisabled} aria-disabled="true">
                  {t('Guide', '指南', isZh)} — {t('Coming soon', '即将推出', isZh)}
                </span>
              </div>
            </div>
            <div className={styles.hardwareCard}>
              <div className={styles.hardwareCardImageWrap}>
                <img
                  src="https://images.tuyacn.com/fe-static/docs/img/4097ba26-6c20-4eb5-ab54-919f2a7e564e.png"
                  alt="Raspberry Pi"
                  className={styles.hardwareCardImage}
                />
              </div>
              <div className={styles.hardwareCategory}>SoC</div>
              <p className={styles.hardwareList}>Raspberry Pi 4/5, CM4/CM5</p>
              <div className={styles.hardwareCardBtns}>
                <Link to="/docs/duckyclaw/ducky-quick-start-raspberry-pi-5" className={styles.hardwareCardBtnSecondary}>
                  {t('Quick start (Raspberry Pi 5)', '快速开始 (Raspberry Pi 5)', isZh)}
                </Link>
              </div>
            </div>
            <div className={styles.hardwareCard}>
              <div className={styles.hardwareCardImageWrap}>
                <img
                  src="https://images.tuyacn.com/fe-static/docs/img/bb9b615d-2de8-4837-8cf8-957751bb63b4.png"
                  alt="Linux"
                  className={styles.hardwareCardImage}
                />
              </div>
              <div className={styles.hardwareCategory}>ARM/SBC/PC</div>
              <p className={styles.hardwareList}>Linux Ubuntu</p>
              <div className={styles.hardwareCardBtns}>
                <span className={styles.hardwareCardBtnDisabled} aria-disabled="true">
                  {t('Docs', '文档', isZh)} — {t('🚧Coming soon', '🚧即将推出', isZh)}
                </span>
              </div>
            </div>
            <div className={styles.hardwareCard}>
              <span className={styles.hardwareCardRecommendTag}>{t('Recommend', '推荐', isZh)}</span>
              <div className={styles.hardwareCardImageWrap}>
                <img
                  src="https://images.tuyacn.com/fe-static/docs/img/ee1b81e7-6bf6-4f75-b33b-9d4c9bc42614.jpg"
                  alt="Waveshare T5-E1 Touch AMOLED 1.75"
                  className={styles.hardwareCardImage}
                />
              </div>
              <div className={styles.hardwareCategory}>MCU</div>
              <p className={styles.hardwareList}>Waveshare T5-E1-Touch-AMOLED-1.75</p>
              <div className={styles.hardwareCardBtns}>
                <a
                  href="https://www.waveshare.com/T5-E1-Touch-AMOLED-1.75.htm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.hardwareCardBtnPrimary}
                >
                  {t('Purchase', '购买', isZh)}
                </a>
                <a
                  href="https://www.waveshare.com/wiki/T5-E1-Touch-AMOLED-1.75"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.hardwareCardBtnSecondary}
                >
                  {t('HW Docs', '硬件文档', isZh)}
                </a>
                <Link to="/docs/duckyclaw/ducky-quick-start-T5AI" className={styles.hardwareCardBtnSecondary}>
                  {t('Quick start (T5)', '快速开始 (T5)', isZh)}
                </Link>
              </div>
            </div>
            <div className={clsx(styles.hardwareCard, styles.hardwareCardMore)}>
              <p className={styles.hardwareCardMoreText}>
                {t(
                  '🧩 More boards are supported. The framework is highly portable and compatible — contributions are welcome.',
                  '🧩 更多开发板支持中，框架支持移植和兼容性良好，欢迎共建。',
                  isZh,
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hardware skills — build your own, deep agentic integration */}
      <section className={`${styles.section} ${styles.sectionHardwareSkillsWrap}`} id="hardware-skills">
        <div
          className={styles.sectionHardwareSkillsBg}
          style={{
            backgroundImage:
              "url('https://images.tuyacn.com/fe-static/docs/img/f49ab176-063d-4369-bd4f-366b4214614b.png')",
          }}
          aria-hidden="true"
        />
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>{t('Build your own hardware skills', '自建硬件技能', isZh)}</h2>
          <p className={styles.sectionSubtitle}>
            {t(
              'Create and extend hardware skills. Connect cameras, sensors, and other peripherals with deep integration into the agentic AI loop.',
              '创建与扩展硬件技能。连接摄像头、传感器及其他外设，与 Agent 式 AI 深度集成。',
              isZh,
            )}
          </p>
          <p className={styles.introLead}>
            {t(
              'Developers can build custom hardware skills on top of DuckyClaw: add cameras for vision, sensors for environment data, displays, audio, and more. These skills plug into the same agentic framework—the agent can reason over sensor data, trigger actions on hardware, and combine device inputs with cloud AI. Deep integration means your hardware is a first-class part of the agent loop, not a side script.',
              '开发者可在 DuckyClaw 上构建自定义硬件技能：接入摄像头做视觉、传感器做环境数据、显示屏、音频等。这些技能接入同一套 Agent 框架——Agent 可基于传感器数据推理、在硬件上触发动作，并将设备输入与云端 AI 结合。深度集成意味着你的硬件是 Agent 循环的一等公民，而非旁路脚本。',
              isZh,
            )}
          </p>
          <ul className={styles.introPoints}>
            <li className={styles.introPoint}>
              {t(
                'Connect cameras, sensors, displays, and other peripherals as skills.',
                '将摄像头、传感器、显示屏等外设作为技能接入。',
                isZh,
              )}
            </li>
            <li className={styles.introPoint}>
              {t(
                'Deep integration: hardware feeds the agent; agent controls hardware in the same loop.',
                '深度集成：硬件数据输入 Agent，Agent 在同一循环中控制硬件。',
                isZh,
              )}
            </li>
            <li className={styles.introPoint}>
              {t(
                'Build on TuyaOpen drivers and APIs for fast prototyping.',
                '基于 TuyaOpen 驱动与 API 快速原型开发。',
                isZh,
              )}
            </li>
          </ul>
          <div className="tw-text-center tw-mt-8">
            <Link to="/docs/duckyclaw/custom-device-mcp" className={styles.docLink}>
              {t('Hardware skills guide: Custom device MCP', '硬件技能开发指南：自定义设备 MCP', isZh)}
            </Link>
          </div>
        </div>
        <a
          href="https://unsplash.com/photos/icon-9sO9CKo37Rg"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.bgImageCredit}
        >
          Photo by Fajrul Islam on Unsplash
        </a>
      </section>

      {/* DuckyClaw Skills list */}
      <section className={`${styles.section} ${styles.sectionSkillsList}`} id="skills-list">
        <div className={styles.sectionInner}>
          <img
            src="https://images.tuyacn.com/fe-static/docs/img/d8c2dc8a-3b70-41a4-b0d0-be3d07e2bde0.png"
            alt={t('DuckyClaw skills list illustration', 'DuckyClaw 技能清单示意图', isZh)}
            className={styles.skillsListImage}
          />
          <h2 className={styles.sectionTitle}>{t('DuckyClaw Skills list', 'DuckyClaw 技能清单', isZh)}</h2>
          <p className={styles.sectionSubtitle}>
            {t(
              'Skills by category, capability scope, and core purpose.',
              '按技能类别、能力所属与核心用途列出的技能清单。',
              isZh,
            )}
          </p>
          <div className={styles.skillsTableOuter}>
            <div
              className={clsx(
                styles.specsTableWrap,
                styles.skillsTableBlurWrap,
                !skillsExpanded && styles.skillsTableBlurWrapCollapsed,
              )}
            >
              <table className={styles.specsTable}>
                <thead>
                  <tr>
                    <th>{t('Skill name', '技能名称', isZh)}</th>
                    <th>{t('Category', '技能类别', isZh)}</th>
                    <th>{t('Capability scope', '能力所属', isZh)}</th>
                    <th>{t('Core purpose', '核心用途', isZh)}</th>
                  </tr>
                </thead>
                <tbody>
                  {(skillsExpanded ? SKILLS_LIST : SKILLS_LIST.slice(0, 6)).map((skill, i) => (
                    <tr key={i}>
                      <td>
                        <span className={styles.skillNameCell}>
                          {skill.emoji} {isZh ? skill.nameZh : skill.nameEn}
                        </span>
                      </td>
                      <td>{isZh ? skill.categoryZh : skill.categoryEn}</td>
                      <td>{isZh ? skill.deployZh : skill.deployEn}</td>
                      <td>{isZh ? skill.purposeZh : skill.purposeEn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {!skillsExpanded && (
              <div className={styles.skillsTableBlurStripWrap} aria-hidden="true">
                <div className={styles.skillsTableBlurLayer} data-layer="1" />
                <div className={styles.skillsTableBlurLayer} data-layer="2" />
                <div className={styles.skillsTableBlurLayer} data-layer="3" />
              </div>
            )}
            {!skillsExpanded ? (
              <div className={styles.skillsTableOverlay} aria-hidden="false">
                <button
                  type="button"
                  className={styles.skillsTableExpandBtn}
                  onClick={() => setSkillsExpanded(true)}
                  aria-expanded="false"
                  aria-label={t('Show more skills', '展开更多技能', isZh)}
                >
                  … {t('Show more', '展开更多', isZh)}
                </button>
              </div>
            ) : (
              <div className={styles.skillsTableExpandBtnWrap}>
                <button
                  type="button"
                  className={styles.skillsTableExpandBtn}
                  onClick={() => setSkillsExpanded(false)}
                  aria-expanded="true"
                  aria-label={t('Show fewer skills', '收起技能列表', isZh)}
                >
                  {t('Show less', '收起', isZh)}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Agent loop & Tuya Cloud workflow */}
      <section className={`${styles.section} ${styles.sectionAlt}`} id="agent-workflow">
        <div className={styles.sectionInner}>
          <img
            src="https://images.tuyacn.com/fe-static/docs/img/f66b08b2-2f2a-4358-b3b0-e1970ada4dbe.png"
            alt={t('Local agent loop and Tuya Cloud illustration', '本地 Agent 循环与涂鸦云示意图', isZh)}
            className={styles.agentWorkflowImage}
          />
          <h2 className={styles.sectionTitle}>
            {t('Local agent loop + Tuya Cloud', '本地 Agent 循环 + 涂鸦云', isZh)}
          </h2>
          <p className={styles.sectionSubtitle}>
            {t(
              'Start on device, scale with the cloud. One agent loop, unlimited possibilities.',
              '从设备起步，随云端扩展。一个 Agent 循环，无限可能。',
              isZh,
            )}
          </p>
          <blockquote className={styles.agentWorkflowQuote}>
            {t(
              "Don't limit your agent to local—get more with Tuya Cloud.",
              '别把 Agent 困在本地，涂鸦云给你更多可能。',
              isZh,
            )}
          </blockquote>
          <p className={styles.introLead}>
            {t(
              "Your agent doesn't have to choose. Run the core loop on your board for speed and privacy; when you need more power—multi-agent workflows, RAG, web search, IoT, music—Tuya Cloud extends it with one unified key. Low cost, no lock-in.",
              '你的 Agent 不必二选一。在开发板上跑核心循环，快速又私密；需要更强能力时，涂鸦云用同一密钥扩展多智能体工作流、RAG、网页搜索、IoT、音乐等。低成本，无绑定。',
              isZh,
            )}
          </p>
          <div className={styles.agentWorkflowLayout}>
            <div className={styles.agentWorkflowCards}>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>🔄</div>
                <h3 className={styles.featureTitle}>{t('Device local agent loop', '设备端本地 Agent 循环', isZh)}</h3>
                <p className={styles.featureDesc}>
                  {t(
                    'Sense, reason, act—all on your board. Core loop runs on the edge with full control; no cloud required.',
                    '感知、推理、执行，全在开发板上完成。核心循环在边缘运行，完全可控，无需依赖云端。',
                    isZh,
                  )}
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>☁️</div>
                <h3 className={styles.featureTitle}>
                  {t('Tuya Cloud: multi-agent & more', '涂鸦云：多智能体与更多', isZh)}
                </h3>
                <p className={styles.featureDesc}>
                  {t(
                    'Unlock multi-agent workflows, RAG, ASR/TTS, third-party MCPs, web search, IoT control, music services—all with one unified key. Low cost.',
                    '解锁多智能体工作流、RAG、ASR/TTS、第三方 MCP、网页搜索、IoT 控制、音乐服务等，一个密钥统一接入。低成本。',
                    isZh,
                  )}
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>⚙️</div>
                <h3 className={styles.featureTitle}>{t('Customizable workflow & more', '可定制工作流与更多', isZh)}</h3>
                <p className={styles.featureDesc}>
                  {t(
                    'Define triggers, variables, and roles. Plug in hardware skills, MCP tools, and Tuya IoT—your rules, your agent.',
                    '自定义触发器、变量与角色。接入硬件技能、MCP 工具与涂鸦 IoT，你的规则，你的 Agent。',
                    isZh,
                  )}
                </p>
              </div>
            </div>
            <div
              className={styles.agentWorkflowImageWrap}
              role="button"
              tabIndex={0}
              onClick={() => setWorkflowLightboxOpen(true)}
              onKeyDown={(e) => e.key === 'Enter' && setWorkflowLightboxOpen(true)}
              aria-label={t('Click to enlarge workflow diagram', '点击放大工作流示意图', isZh)}
            >
              <img
                src={workflowImageSrc}
                alt={t('DuckyClaw agent and workflow diagram', 'DuckyClaw Agent 与工作流示意', isZh)}
                className={styles.agentWorkflowImage}
              />
            </div>
            {workflowLightboxOpen && (
              <div
                className={styles.archLightboxBackdrop}
                onClick={() => setWorkflowLightboxOpen(false)}
                onKeyDown={(e) => e.key === 'Escape' && setWorkflowLightboxOpen(false)}
                role="button"
                tabIndex={0}
                aria-label={t('Close', '关闭', isZh)}
              >
                <button
                  type="button"
                  className={styles.archLightboxClose}
                  onClick={(e) => {
                    e.stopPropagation()
                    setWorkflowLightboxOpen(false)
                  }}
                  aria-label={t('Close', '关闭', isZh)}
                >
                  ×
                </button>
                <img
                  src={workflowImageSrc}
                  alt={t('DuckyClaw agent and workflow diagram', 'DuckyClaw Agent 与工作流示意', isZh)}
                  className={styles.archLightboxImage}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className={styles.section} id="architecture">
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>{t('Architecture', '架构', isZh)}</h2>
          <p className={styles.sectionSubtitle}>
            {t(
              'Local execution layer + agentic loop + Tuya Cloud. Digital and physical in one loop.',
              '本地执行层 + Agent 循环 + 涂鸦云。数字与物理在同一闭环。',
              isZh,
            )}
          </p>
          <div
            className={styles.archImageWrap}
            role="button"
            tabIndex={0}
            onClick={() => setArchLightboxOpen(true)}
            onKeyDown={(e) => e.key === 'Enter' && setArchLightboxOpen(true)}
            aria-label={t('Click to enlarge architecture diagram', '点击放大架构图', isZh)}
          >
            <img
              src={isZh ? ARCH_IMG_ZH : ARCH_IMG_EN}
              alt={t('DuckyClaw architecture diagram', 'DuckyClaw 架构图', isZh)}
              className={styles.archImage}
            />
          </div>
          {archLightboxOpen && (
            <div
              className={styles.archLightboxBackdrop}
              onClick={() => setArchLightboxOpen(false)}
              onKeyDown={(e) => e.key === 'Escape' && setArchLightboxOpen(false)}
              role="button"
              tabIndex={0}
              aria-label={t('Close', '关闭', isZh)}
            >
              <button
                type="button"
                className={styles.archLightboxClose}
                onClick={(e) => {
                  e.stopPropagation()
                  setArchLightboxOpen(false)
                }}
                aria-label={t('Close', '关闭', isZh)}
              >
                ×
              </button>
              <img
                src={isZh ? ARCH_IMG_ZH : ARCH_IMG_EN}
                alt={t('DuckyClaw architecture diagram', 'DuckyClaw 架构图', isZh)}
                className={styles.archLightboxImage}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          <p className={styles.introLead} style={{ marginTop: '1.5rem' }}>
            {t(
              'Gateway aggregates messaging and voice; Agent Brain runs locally or in the cloud; modular skills handle both digital (FILE, CRON, MCP) and hardware (IoT, GPIO, sensors) actions.',
              '网关聚合消息与语音；Agent 大脑在本地或云端运行；模块化技能同时处理数字（FILE、CRON、MCP）与硬件（IoT、GPIO、传感器）动作。',
              isZh,
            )}
          </p>
          {/* Placeholder: link to detailed architecture doc */}
          <div className="tw-text-center tw-mt-4">
            <a
              href="https://github.com/tuya/DuckyClaw?tab=readme-ov-file#-features"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.quickstartBtn}
            >
              {t('Architecture deep-dive', '架构详解', isZh)}
            </a>
          </div>
        </div>
      </section>

      {/* Platform Overview & Architecture Comparison */}
      <section className={`${styles.section} ${styles.sectionAlt}`} id="specs">
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>{t('Platform Overview', '平台总览', isZh)}</h2>
          <p className={styles.sectionSubtitle}>
            {t(
              'Where DuckyClaw runs, its architecture layers, and quick comparison with similar solutions.',
              'DuckyClaw 部署方式、架构层次及对比其他方案。',
              isZh,
            )}
          </p>

          {/* Three-layer architecture */}
          <h3 className={styles.specsSubtitle}>{t('Three-layer architecture', '三层架构', isZh)}</h3>
          <ul className={styles.specsLayerList}>
            <li>
              <strong>{t('Layer 1 — Local hardware execution', '第一层：本地硬件执行', isZh)}</strong>{' '}
              {t(
                'Gateway (Telegram, Discord, Feishu, ASR); Agent Brain / LLM / Vision; persistent memory + IoT Memory; modular skills (FILE, CRON, MCP) and hardware skills.',
                '网关（Telegram、Discord、飞书、ASR）；Agent 大脑 / LLM / Vision；持久记忆与 IoT 记忆；模块化技能（FILE、CRON、MCP）与硬件技能。',
                isZh,
              )}
            </li>
            <li>
              <strong>
                {t('Layer 2 — Agentic loop & proactive monitoring', '第二层：Agent 循环与主动监控', isZh)}
              </strong>{' '}
              {t(
                'Agent runs in the background, senses state changes, and triggers actions without manual wake-up.',
                'Agent 持续后台运行，感知状态变化并自主触发动作，无需每次手动唤醒。',
                isZh,
              )}
            </li>
            <li>
              <strong>{t('Layer 3 — Tuya AI Cloud', '第三层：涂鸦 AI 云', isZh)}</strong>{' '}
              {t(
                'Unified model access (GPT, Claude, Qwen, DeepSeek); low-cost, unified key access to services; Multi-Agent workflows, RAG, ASR/TTS/STT, cloud MCPs, Tuya Agentic IoT Control.',
                '统一大模型接入（GPT、Claude、Qwen、DeepSeek）；低成本、统一密钥接入服务；Multi-Agent 工作流、RAG、ASR/TTS/STT、云端 MCP、涂鸦 Agentic IoT 控制。',
                isZh,
              )}
            </li>
          </ul>

          {/* Comparison */}
          <h3 className={styles.specsSubtitle}>
            {t('DuckyClaw vs others (at a glance)', 'DuckyClaw 与其它方案概览', isZh)}
          </h3>
          <div className={styles.specsTableWrap}>
            <table className={styles.specsTable}>
              <thead>
                <tr>
                  <th>{t('Aspect', '方面', isZh)}</th>
                  <th>DuckyClaw</th>
                  <th>{t('OpenClaw / MimiClaw / others', 'OpenClaw / MimiClaw / 其它', isZh)}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{t('Runtime', '运行时', isZh)}</td>
                  <td>TuyaOpen C; ARM Cortex-M / Cortex-A / x64; no Node on MCU</td>
                  <td>Node.js (OpenClaw); ESP32-S3 only (MimiClaw); server/desktop</td>
                </tr>
                <tr>
                  <td>{t('Deployment', '部署', isZh)}</td>
                  <td>MCU, SoC, PC — one codebase</td>
                  <td>Mac/Pi/VPS or single board; no edge MCU (others)</td>
                </tr>
                <tr>
                  <td>{t('Cost', '成本', isZh)}</td>
                  <td>{t('Low cost; unified key access to services', '低成本；统一密钥接入服务')}</td>
                  <td>Bring your own API; Claude Pro/Max $20–200/mo or API-heavy</td>
                </tr>
                <tr>
                  <td>{t('Device IoT control', '设备 IoT 控制', isZh)}</td>
                  <td>{t('Native Tuya ecosystem control', '原生涂鸦生态控制')}</td>
                  <td>Typically no built-in device control</td>
                </tr>
                <tr>
                  <td>{t('Voice (ASR) input', '语音 ASR 输入', isZh)}</td>
                  <td>{t('Hardware ASR on select boards', '部分板载硬件 ASR')}</td>
                  <td>Not natively supported</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Cloud capabilities list */}
          <h3 className={styles.specsSubtitle}>
            {t('Tuya Cloud capabilities (zero-coding extendability)', '涂鸦云能力（零代码扩展）', isZh)}
          </h3>
          <ul className={styles.specsBulletList}>
            <li>Multi-Agent workflow orchestration</li>
            <li>RAG knowledge retrieval</li>
            <li>ASR / TTS / STT full voice pipeline</li>
            <li>Cloud third-party MCPs</li>
            <li>Tuya Agentic IoT Control</li>
          </ul>
        </div>
      </section>

      {/* Community & links */}
      <section className={styles.section} id="community">
        <div className={styles.sectionInner}>
          <img
            src="https://images.tuyacn.com/fe-static/docs/img/b7669327-0c0a-422b-abc0-582ab22d0f42.png"
            alt={t('Community and links illustration', '社区与链接示意图', isZh)}
            className={styles.communityImage}
          />
          <h2 className={styles.sectionTitle}>{t('Community & links', '社区与链接', isZh)}</h2>
          <p className={styles.sectionSubtitle}>
            {t('Star, contribute, and stay in touch.', 'Star、参与贡献、保持联系。', isZh)}
          </p>
          <div className={styles.communityContributeCtaWrap}>
            <a
              href="https://github.com/tuya/DuckyClaw"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.communityContributeCta}
              aria-label={t('Contribute on GitHub', '在 GitHub 上参与贡献', isZh)}
            >
              <IconGithub className={styles.communityContributeCtaIcon} aria-hidden />
              <span>{t('Contribute on GitHub', '在 GitHub 上参与贡献', isZh)}</span>
            </a>
          </div>
          <div className={styles.communityGrid}>
            <a
              href="https://github.com/tuya/DuckyClaw/issues"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.communityLink}
            >
              {t('Report issues', '反馈问题', isZh)}
            </a>
            <Link to="/docs/about-tuyaopen" className={styles.communityLink}>
              {t('Documentation', '文档', isZh)}
            </Link>
            <a
              href="https://discord.com/invite/yPPShSTttG"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.communityLink}
            >
              Discord
            </a>
          </div>
          {/* Credits — merged */}
          <div className={styles.communityContributeBlock}>
            <p className={styles.footerContributorsCredit}>
              {isZh ? (
                <>
                  本项目由{' '}
                  <a href="https://tuyaopen.ai/" target="_blank" rel="noopener noreferrer">
                    TuyaOpen Team
                  </a>{' '}
                  创建，感谢优秀的{' '}
                  <a
                    href="https://github.com/tuya/DuckyClaw/graphs/contributors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    贡献者
                  </a>
                  。 基于{' '}
                  <a href="https://github.com/tuya/TuyaOpen" target="_blank" rel="noopener noreferrer">
                    TuyaOpen
                  </a>
                  ，灵感来自{' '}
                  <a href="https://github.com/openclaw/openclaw" target="_blank" rel="noopener noreferrer">
                    OpenClaw
                  </a>{' '}
                  与{' '}
                  <a href="https://github.com/memovai/mimiclaw" target="_blank" rel="noopener noreferrer">
                    MimiClaw
                  </a>
                  。
                </>
              ) : (
                <>
                  Created by{' '}
                  <a href="https://tuyaopen.ai/" target="_blank" rel="noopener noreferrer">
                    TuyaOpen Team
                  </a>
                  , with the help of awesome{' '}
                  <a
                    href="https://github.com/tuya/DuckyClaw/graphs/contributors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    contributors
                  </a>
                  . Built on{' '}
                  <a href="https://github.com/tuya/TuyaOpen" target="_blank" rel="noopener noreferrer">
                    TuyaOpen
                  </a>
                  . Inspired by{' '}
                  <a href="https://github.com/openclaw/openclaw" target="_blank" rel="noopener noreferrer">
                    OpenClaw
                  </a>{' '}
                  and{' '}
                  <a href="https://github.com/memovai/mimiclaw" target="_blank" rel="noopener noreferrer">
                    MimiClaw
                  </a>
                  .
                </>
              )}
            </p>
            <a
              href="https://github.com/tuya/DuckyClaw/graphs/contributors"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerContributorsBadge}
              aria-label={t('View contributors', '查看贡献者', isZh)}
            >
              <img
                src="https://contrib.rocks/image?repo=tuya/DuckyClaw"
                alt={t('DuckyClaw contributors', 'DuckyClaw 贡献者', isZh)}
              />
            </a>
          </div>
        </div>
      </section>

      {/* Optional: extra media/CTA section — placeholder for more images or buttons */}
      <section className={`${styles.section} ${styles.sectionAlt}`} id="more">
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>{t('See it in action', '效果展示', isZh)}</h2>
          <p className={styles.sectionSubtitle}>
            {t(
              'Experience DuckyClaw in action — watch highlight videos, see live demos, and explore real-world deployments below.',
              '体验 DuckyClaw — 观看高光视频、实机演示与实际应用案例。',
              isZh,
            )}
          </p>
          <div className={styles.bannerWrap}>
            {!isZh ? (
              <div className={styles.bannerPlaceholder} style={{ fontSize: '1.5em' }}>
                🚧 Work in progress 🚧
              </div>
            ) : DEMO_VIDEO_URL || DEMO_VIDEO_EMBED_URL ? (
              <div className={styles.demoVideoWrap}>
                {DEMO_VIDEO_EMBED_URL ? (
                  <div className={styles.demoVideoEmbedWrap}>
                    <iframe
                      src={DEMO_VIDEO_EMBED_URL.replace(/([&?])autoplay=1/, '$1autoplay=0')}
                      title={t('DuckyClaw demo video', 'DuckyClaw 演示视频', isZh)}
                      className={styles.demoVideoEmbed}
                      scrolling="no"
                      frameBorder="0"
                      allowFullScreen
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  </div>
                ) : null}
              </div>
            ) : (
              <div className={styles.bannerPlaceholder} style={{ fontSize: '1.5em' }}>
                🚧 内容建设中 🚧
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  )
}
