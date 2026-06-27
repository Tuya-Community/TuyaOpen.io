import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import React, { useEffect, useRef, useState } from 'react'

import styles from './device-cloud.module.css'

// ---------------------------------------------------------------------------
// Copy (bilingual). The page picks en/zh from the active Docusaurus locale.
// ---------------------------------------------------------------------------
const COPY = {
  en: {
    title: 'Device & Cloud Collaboration',
    subtitle:
      'An agentic TuyaOpen device splits the work in two: the device does what must be instant, the cloud does what must be smart. Pick a recipe below to watch them collaborate.',
    ovenAlt: 'A smart oven whose functions are exposed as tool calls to an AI agent that plans a recipe',
    demoHeading: 'See it work: a smart oven',
    demoHint: 'Choose a recipe, then press Run to step through the collaboration.',
    run: 'Run',
    running: 'Running…',
    reset: 'Reset',
    next: 'Step',
    cloudCol: 'Cloud agent · reasoning',
    deviceCol: 'Device · tool calls',
    idle: 'Press Run to start the recipe.',
    done: 'Done — the dish is ready.',
    capHeading: 'Who does what',
    capLead:
      'The same split applies to every agentic device, not just the oven. Real-time perception and actuation live on the device; knowledge, reasoning, and language live in the cloud.',
    deviceCapTitle: 'On the device',
    deviceCapSub: 'Real-time · local · low-latency',
    cloudCapTitle: 'In the cloud',
    cloudCapSub: 'Knowledge · reasoning · always improving',
    principle: 'Device handles what must be instant. Cloud handles what must be smart.',
    learnHeading: 'Go deeper',
    deviceCaps: [
      'Capture microphone audio and detect speech (VAD)',
      'Wake word and chat modes — decide when to listen',
      'Play the spoken reply, music, and prompt tones',
      'Capture camera frames and show a live preview',
      'Render the on-screen chat UI',
      'Run MCP tool calls on real sensors and actuators',
      'Stay responsive with low latency, even on a flaky link',
    ],
    cloudCaps: [
      'Speech recognition (ASR) — speech to text',
      'Language understanding and generation (NLG)',
      'World knowledge and step-by-step reasoning',
      'Agent roles, prompts, and long-term memory',
      'Skill orchestration and task planning',
      'Cloud MCP to external services and APIs',
      'Multilingual voices — improves without re-flashing',
    ],
    links: [
      { label: 'Agentic-first hardware', to: '/docs/cloud/device-ai/concepts/agentic-first-hardware' },
      { label: 'Designing device MCP tools', to: '/docs/cloud/device-ai/concepts/designing-device-mcp-tools' },
      { label: 'Multimodal data flow', to: '/docs/cloud/device-ai/multimodal-data-flow' },
      { label: 'What agentic hardware unlocks', to: '/docs/cloud/device-ai/concepts/real-world-use-cases' },
    ],
  },
  zh: {
    title: '设备与云端协作',
    subtitle:
      '面向智能体的 TuyaOpen 设备把工作一分为二：设备负责必须即时的部分，云端负责必须聪明的部分。选择下面的菜谱，看它们如何协作。',
    ovenAlt: '智能烤箱的功能作为工具调用暴露给规划菜谱的 AI 智能体',
    demoHeading: '实际演示：智能烤箱',
    demoHint: '选择一道菜谱，然后点击"运行"逐步查看协作过程。',
    run: '运行',
    running: '运行中…',
    reset: '重置',
    next: '单步',
    cloudCol: '云端智能体 · 推理',
    deviceCol: '设备 · 工具调用',
    idle: '点击"运行"开始菜谱。',
    done: '完成——菜做好了。',
    capHeading: '谁负责什么',
    capLead: '这一分工适用于每一个面向智能体的设备，而不只是烤箱。实时的感知与执行在设备侧；知识、推理与语言在云端。',
    deviceCapTitle: '在设备上',
    deviceCapSub: '实时 · 本地 · 低延迟',
    cloudCapTitle: '在云端',
    cloudCapSub: '知识 · 推理 · 持续进化',
    principle: '设备负责必须即时的部分，云端负责必须聪明的部分。',
    learnHeading: '深入了解',
    deviceCaps: [
      '采集麦克风音频并检测语音（VAD）',
      '唤醒词与对话模式——决定何时聆听',
      '播放语音回复、音乐与提示音',
      '采集摄像头画面并显示实时预览',
      '渲染屏幕上的对话 UI',
      '在真实传感器与执行器上运行 MCP 工具调用',
      '即使网络不稳也能低延迟响应',
    ],
    cloudCaps: [
      '语音识别（ASR）——语音转文本',
      '语言理解与生成（NLG）',
      '世界知识与逐步推理',
      '智能体角色、Prompt 与长期记忆',
      '技能编排与任务规划',
      '云端 MCP 接入外部服务与 API',
      '多语种音色——无需重新烧录即可进化',
    ],
    links: [
      { label: '面向智能体的硬件', to: '/zh/docs/cloud/device-ai/concepts/agentic-first-hardware' },
      { label: '设计设备 MCP 工具', to: '/zh/docs/cloud/device-ai/concepts/designing-device-mcp-tools' },
      { label: '多模态数据流', to: '/zh/docs/cloud/device-ai/multimodal-data-flow' },
      { label: '智能体硬件能解决什么', to: '/zh/docs/cloud/device-ai/concepts/real-world-use-cases' },
    ],
  },
}

// Recipe scripts. Each step runs on the `cloud` (reasoning) or the `device`
// (a concrete tool call). `tool` shows the tool-call signature for device steps.
const RECIPES = [
  {
    id: 'cookies',
    name: { en: 'Chocolate-chip cookies', zh: '巧克力曲奇' },
    emoji: '🍪',
    steps: [
      { side: 'cloud', en: 'Plan: 180°C, ~12 min, both elements', zh: '规划：180°C，约 12 分钟，上下发热管' },
      { side: 'device', tool: 'set_temperature(180)', en: 'Set the oven to 180°C', zh: '设定 180°C' },
      { side: 'device', tool: 'set_heat(both, on)', en: 'Turn on top and bottom heat', zh: '开启上下发热管' },
      { side: 'device', tool: 'set_time(12)', en: 'Set a 12-minute timer', zh: '设定 12 分钟' },
      { side: 'device', tool: 'start()', en: 'Start baking', zh: '开始烘焙' },
      { side: 'cloud', en: 'Decide to check near the end', zh: '临近结束时决定检查' },
      { side: 'device', tool: 'take_photo()', en: 'Photograph the cookies', zh: '拍摄曲奇' },
      { side: 'cloud', en: 'Assess doneness from the image', zh: '根据图像判断熟度' },
      { side: 'device', tool: 'stop()', en: 'Golden — stop the oven', zh: '金黄——停止加热' },
    ],
  },
  {
    id: 'chicken',
    name: { en: 'Roast chicken', zh: '烤鸡' },
    emoji: '🍗',
    steps: [
      {
        side: 'cloud',
        en: 'Plan: 200°C, 60 min, bottom heat, brown at the end',
        zh: '规划：200°C，60 分钟，下发热管，最后上色',
      },
      { side: 'device', tool: 'set_temperature(200)', en: 'Set the oven to 200°C', zh: '设定 200°C' },
      { side: 'device', tool: 'set_heat(bottom, on)', en: 'Use bottom heat to cook through', zh: '用下发热管烤熟' },
      { side: 'device', tool: 'set_time(60)', en: 'Set a 60-minute timer', zh: '设定 60 分钟' },
      { side: 'device', tool: 'start()', en: 'Start roasting', zh: '开始烤制' },
      { side: 'cloud', en: 'Check color before browning', zh: '上色前检查色泽' },
      { side: 'device', tool: 'take_photo()', en: 'Photograph the chicken', zh: '拍摄烤鸡' },
      { side: 'cloud', en: 'Decide to brown the skin', zh: '决定给表皮上色' },
      { side: 'device', tool: 'set_heat(top, on)', en: 'Add top heat to crisp the skin', zh: '加上发热管使表皮酥脆' },
      { side: 'device', tool: 'stop()', en: 'Done — stop the oven', zh: '完成——停止加热' },
    ],
  },
  {
    id: 'reheat',
    name: { en: 'Reheat leftovers', zh: '加热剩菜' },
    emoji: '♨️',
    steps: [
      { side: 'cloud', en: 'Plan: gentle 150°C for 8 min', zh: '规划：150°C 轻柔加热 8 分钟' },
      { side: 'device', tool: 'set_temperature(150)', en: 'Set a gentle 150°C', zh: '设定温和的 150°C' },
      { side: 'device', tool: 'set_heat(both, on)', en: 'Turn on both elements', zh: '开启上下发热管' },
      { side: 'device', tool: 'set_time(8)', en: 'Set an 8-minute timer', zh: '设定 8 分钟' },
      { side: 'device', tool: 'start()', en: 'Start reheating', zh: '开始加热' },
      { side: 'device', tool: 'stop()', en: 'Warm through — stop', zh: '热透——停止' },
    ],
  },
]

function StepLog({ step, active, done, lang }) {
  const isCloud = step.side === 'cloud'
  return (
    <div
      className={[
        styles.step,
        isCloud ? styles.stepCloud : styles.stepDevice,
        active ? styles.stepActive : '',
        done ? styles.stepDone : '',
      ].join(' ')}
    >
      <span className={styles.stepBadge}>{isCloud ? '☁' : '⚙'}</span>
      <div className={styles.stepBody}>
        {step.tool && <code className={styles.stepTool}>{step.tool}</code>}
        <span className={styles.stepLabel}>{step[lang]}</span>
      </div>
    </div>
  )
}

export default function DeviceCloudPage() {
  const { i18n } = useDocusaurusContext()
  const lang = i18n.currentLocale === 'zh' ? 'zh' : 'en'
  const t = COPY[lang]

  const [recipeId, setRecipeId] = useState(RECIPES[0].id)
  const [cursor, setCursor] = useState(-1) // -1 = idle; index of last revealed step
  const [playing, setPlaying] = useState(false)
  const timer = useRef(null)

  const recipe = RECIPES.find((r) => r.id === recipeId)
  const steps = recipe.steps

  const clearTimer = () => {
    if (timer.current) {
      clearTimeout(timer.current)
      timer.current = null
    }
  }

  // Auto-advance while playing.
  useEffect(() => {
    if (!playing) return
    if (cursor >= steps.length - 1) {
      setPlaying(false)
      return
    }
    timer.current = setTimeout(() => setCursor((c) => c + 1), 900)
    return clearTimer
  }, [playing, cursor, steps.length])

  const selectRecipe = (id) => {
    clearTimer()
    setPlaying(false)
    setCursor(-1)
    setRecipeId(id)
  }

  const onRun = () => {
    if (cursor >= steps.length - 1) setCursor(-1)
    setPlaying(true)
  }
  const onReset = () => {
    clearTimer()
    setPlaying(false)
    setCursor(-1)
  }
  const onStep = () => {
    clearTimer()
    setPlaying(false)
    setCursor((c) => Math.min(c + 1, steps.length - 1))
  }

  const finished = cursor >= steps.length - 1
  const cloudSteps = steps.map((s, i) => ({ ...s, i })).filter((s) => s.side === 'cloud')
  const deviceSteps = steps.map((s, i) => ({ ...s, i })).filter((s) => s.side === 'device')

  return (
    <Layout title={t.title} description={t.subtitle}>
      <main className={styles.page}>
        {/* Hero */}
        <header className={styles.hero}>
          <h1 className={styles.heroTitle}>{t.title}</h1>
          <p className={styles.heroSub}>{t.subtitle}</p>
          <img
            className={styles.heroImg}
            src="/img/cloud/device-ai/smart-oven-tools.png"
            alt={t.ovenAlt}
            loading="lazy"
          />
        </header>

        {/* Interactive recipe demo */}
        <section className={styles.demo}>
          <h2 className={styles.sectionTitle}>{t.demoHeading}</h2>
          <p className={styles.sectionLead}>{t.demoHint}</p>

          <div className={styles.recipeRow}>
            {RECIPES.map((r) => (
              <button
                key={r.id}
                className={[styles.recipeBtn, r.id === recipeId ? styles.recipeBtnActive : ''].join(' ')}
                onClick={() => selectRecipe(r.id)}
                type="button"
              >
                <span className={styles.recipeEmoji}>{r.emoji}</span>
                {r.name[lang]}
              </button>
            ))}
          </div>

          <div className={styles.controls}>
            <button className={styles.runBtn} onClick={onRun} disabled={playing} type="button">
              {playing ? t.running : t.run}
            </button>
            <button className={styles.ctrlBtn} onClick={onStep} disabled={playing || finished} type="button">
              {t.next}
            </button>
            <button className={styles.ctrlBtn} onClick={onReset} type="button">
              {t.reset}
            </button>
            <span className={styles.statusMsg}>{cursor < 0 ? t.idle : finished ? t.done : ''}</span>
          </div>

          <div className={styles.lanes}>
            <div className={[styles.lane, styles.laneCloud].join(' ')}>
              <div className={styles.laneHead}>{t.cloudCol}</div>
              {cloudSteps.map((s) => (
                <StepLog key={s.i} step={s} lang={lang} active={cursor === s.i} done={cursor > s.i} />
              ))}
            </div>
            <div className={[styles.lane, styles.laneDevice].join(' ')}>
              <div className={styles.laneHead}>{t.deviceCol}</div>
              {deviceSteps.map((s) => (
                <StepLog key={s.i} step={s} lang={lang} active={cursor === s.i} done={cursor > s.i} />
              ))}
            </div>
          </div>
        </section>

        {/* Capability split */}
        <section className={styles.caps}>
          <h2 className={styles.sectionTitle}>{t.capHeading}</h2>
          <p className={styles.sectionLead}>{t.capLead}</p>

          <div className={styles.capGrid}>
            <div className={[styles.capCard, styles.capDevice].join(' ')}>
              <div className={styles.capIcon}>⚙</div>
              <h3 className={styles.capTitle}>{t.deviceCapTitle}</h3>
              <p className={styles.capSub}>{t.deviceCapSub}</p>
              <ul className={styles.capList}>
                {t.deviceCaps.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>

            <div className={styles.bridge}>
              <span className={styles.bridgeLabel}>MCP</span>
              <span className={styles.bridgeArrow}>⇄</span>
            </div>

            <div className={[styles.capCard, styles.capCloud].join(' ')}>
              <div className={styles.capIcon}>☁</div>
              <h3 className={styles.capTitle}>{t.cloudCapTitle}</h3>
              <p className={styles.capSub}>{t.cloudCapSub}</p>
              <ul className={styles.capList}>
                {t.cloudCaps.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>

          <p className={styles.principle}>{t.principle}</p>
        </section>

        {/* Learn more */}
        <section className={styles.learn}>
          <h2 className={styles.sectionTitle}>{t.learnHeading}</h2>
          <div className={styles.linkRow}>
            {t.links.map((l) => (
              <Link key={l.to} className={styles.linkCard} to={l.to}>
                {l.label} →
              </Link>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  )
}
