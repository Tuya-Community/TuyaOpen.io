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

const t = (en, zh, isZh) => (isZh ? zh : en)

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
  const isZh = i18n.currentLocale === 'zh'
  const [archLightboxOpen, setArchLightboxOpen] = React.useState(false)
  const [workflowLightboxOpen, setWorkflowLightboxOpen] = React.useState(false)
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
      <section className={`${styles.section} ${styles.sectionAlt}`} id="quickstart">
        <div className={styles.sectionInner}>
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
            <a
              href="https://github.com/tuya/DuckyClaw#readme"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.quickstartBtn}
            >
              Install → GitHub
            </a>
            <Link to="/docs/quick-start/enviroment-setup" className={styles.quickstartBtn}>
              {t('Environment setup', '环境配置', isZh)}
            </Link>
            <a href="#hardware" className={styles.quickstartBtn}>
              {t('Pick your board', '选择开发板', isZh)} →
            </a>
          </div>
          <p className={styles.sectionSubtitle} style={{ marginTop: '1.5rem', marginBottom: 0 }}>
            {t(
              '🚧 Under active development. Docs and guides are being added.',
              '🚧 开发中。文档与指南持续补充。',
              isZh,
            )}
          </p>
        </div>
      </section>

      {/* Hardware support */}
      <section className={`${styles.section} ${styles.sectionAlt}`} id="hardware">
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>{t('Hardware support', '硬件支持', isZh)}</h2>
          <p className={styles.sectionSubtitle}>
            {t(
              'One codebase. From microcontrollers to single-board computers to PC.',
              '一套代码。从微控制器到单板机再到 PC。',
              isZh,
            )}
          </p>
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
                <span className={styles.hardwareCardBtnDisabled} aria-disabled="true">
                  {t('Docs', '文档', isZh)} — {t('Coming soon', '即将推出', isZh)}
                </span>
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
                <span className={styles.hardwareCardBtnDisabled} aria-disabled="true">
                  {t('Docs', '文档', isZh)} — {t('Coming soon', '即将推出', isZh)}
                </span>
              </div>
            </div>
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
                <span className={styles.hardwareCardBtnDisabled} aria-disabled="true">
                  {t('Docs', '文档', isZh)} — {t('Coming soon', '即将推出', isZh)}
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
                <span className={styles.hardwareCardBtnDisabled} aria-disabled="true">
                  {t('Docs', '文档', isZh)} — {t('Coming soon', '即将推出', isZh)}
                </span>
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
                  {t('Docs', '文档', isZh)} — {t('Coming soon', '即将推出', isZh)}
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
                <span className={styles.hardwareCardBtnDisabled} aria-disabled="true">
                  {t('Docs', '文档', isZh)} — {t('Coming soon', '即将推出', isZh)}
                </span>
              </div>
            </div>
          </div>
          {/* Placeholder: add board-specific docs later */}
          <div className="tw-text-center tw-mt-6">
            <span className={styles.quickstartBtn} style={{ cursor: 'default', opacity: 0.8 }}>
              {t('Board-specific guides (coming soon)', '板级指南（即将推出）', isZh)}
            </span>
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

      {/* Agent loop & Tuya Cloud workflow */}
      <section className={`${styles.section} ${styles.sectionAlt}`} id="agent-workflow">
        <div className={styles.sectionInner}>
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
            <div className={styles.bannerPlaceholder}>
              {t('Placeholder: add screenshot or video embed', '占位：可添加截图或视频嵌入', isZh)}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
