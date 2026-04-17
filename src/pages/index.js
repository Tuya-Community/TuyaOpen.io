import Head from '@docusaurus/Head'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import { clsx } from 'clsx'
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

import IconGithub from '../../static/img/icons/github.svg'
import IconHelp from '../../static/img/icons/help.svg'
import IconOctocat from '../../static/img/icons/octocat.svg'
import { homepageCopy } from '../data/homepageCopy'
import styles from './index.module.css'

/** Terminal log `tag` → bottom step card id (see `realWorldValidation.steps` in homepageCopy). */
const HIL_LOG_TAG_TO_STEP_NUM = {
  VibeCoding: '01',
  BUILD: '01',
  FLASH: '01',
  AUTH: '02',
  DEBUG: '03',
  HW_CLI: '03',
}

function hilToneTagClass(tone) {
  return clsx(
    tone === 'orange' && styles.hilLogTagOrange,
    tone === 'blue' && styles.hilLogTagBlue,
    tone === 'green' && styles.hilLogTagGreen,
    tone === 'purple' && styles.hilLogTagPurple,
    tone === 'teal' && styles.hilLogTagTeal,
    tone === 'amber' && styles.hilLogTagAmber,
  )
}

function Home() {
  const { siteConfig, i18n } = useDocusaurusContext()
  const locale = i18n.currentLocale === 'zh' ? 'zh' : 'en'
  const copy = homepageCopy[locale]
  const [cloudDiagramLightboxOpen, setCloudDiagramLightboxOpen] = useState(false)
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0)
  const tuyaAiSectionRef = useRef(null)
  const tuyaAiCarouselRef = useRef(null)
  const tuyaAiWheelAccumRef = useRef(0)
  const [tuyaAiSlideIndex, setTuyaAiSlideIndex] = useState(0)
  const [tuyaAiCarouselMinHeightPx, setTuyaAiCarouselMinHeightPx] = useState(null)
  const [devStorySelectedImageIndex, setDevStorySelectedImageIndex] = useState(null)
  const hilSectionRef = useRef(null)
  const hilConsoleBodyRef = useRef(null)
  const hilHubLedRef = useRef(null)
  const [hilActive, setHilActive] = useState(false)
  const [hilPrefersReducedMotion, setHilPrefersReducedMotion] = useState(false)
  const [hilTerminalLines, setHilTerminalLines] = useState([])
  const [hilDiagramActiveIndex, setHilDiagramActiveIndex] = useState(null)
  const [devSkillsCopied, setDevSkillsCopied] = useState(false)
  const devSkillsCopiedTimeoutRef = useRef(null)

  const hilHighlightedStepNum = useMemo(() => {
    for (let i = hilTerminalLines.length - 1; i >= 0; i -= 1) {
      const line = hilTerminalLines[i]
      if (line.kind === 'log' && line.tag) {
        const stepNum = HIL_LOG_TAG_TO_STEP_NUM[line.tag]
        if (stepNum) {
          return stepNum
        }
      }
    }
    return null
  }, [hilTerminalLines])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setHilPrefersReducedMotion(mq.matches)
    const el = hilSectionRef.current
    if (!el) {
      return undefined
    }
    if (mq.matches) {
      setHilActive(true)
      return undefined
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        setHilActive(entry.isIntersecting)
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    return () => {
      if (devSkillsCopiedTimeoutRef.current) {
        window.clearTimeout(devSkillsCopiedTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const hil = homepageCopy[locale].realWorldValidation
    const seq = hil.hilTerminalSequence
    if (hilPrefersReducedMotion) {
      let lastDiagram = null
      const staticLines = seq.map((step, i) => {
        if (step.diagramIndex !== undefined && step.diagramIndex !== null) {
          lastDiagram = step.diagramIndex
        }
        return { id: `hil-rm-${i}`, ...step }
      })
      setHilTerminalLines(staticLines)
      setHilDiagramActiveIndex(lastDiagram ?? null)
      return undefined
    }
    if (!hilActive) {
      setHilTerminalLines([])
      setHilDiagramActiveIndex(null)
      return undefined
    }
    let cancelled = false
    let lineCounter = 0
    const nextLineId = () => {
      lineCounter += 1
      return `hil-${lineCounter}`
    }
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
    const HIL_LOOP_TOTAL_MS = 10000
    const HIL_INTRO_MS = 280
    /* Subtracted from the 10s budget only for scaling step delays (not the pause after the last line). */
    const HIL_TAIL_BUDGET_MS = 720
    const HIL_RESTART_DELAY_MS = 5000
    const weightSum = seq.reduce((acc, step) => acc + (step.delayBefore ?? 0), 0)
    const stepBudget = Math.max(0, HIL_LOOP_TOTAL_MS - HIL_INTRO_MS - HIL_TAIL_BUDGET_MS)
    const delayScale = weightSum > 0 ? stepBudget / weightSum : 1
    const run = async () => {
      while (!cancelled) {
        setHilTerminalLines([])
        setHilDiagramActiveIndex(null)
        await sleep(HIL_INTRO_MS)
        if (cancelled) {
          break
        }
        for (let s = 0; s < seq.length; s += 1) {
          if (cancelled) {
            break
          }
          const step = seq[s]
          const wait = Math.max(32, Math.round((step.delayBefore ?? 0) * delayScale))
          await sleep(wait)
          if (cancelled) {
            break
          }
          if (step.kind === 'log' && step.diagramIndex !== undefined && step.diagramIndex !== null) {
            setHilDiagramActiveIndex(step.diagramIndex)
          }
          setHilTerminalLines((prev) => [...prev, { id: nextLineId(), ...step }])
        }
        if (cancelled) {
          break
        }
        await sleep(HIL_RESTART_DELAY_MS)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [hilActive, hilPrefersReducedMotion, locale])

  useEffect(() => {
    const el = hilHubLedRef.current
    if (!el) {
      return undefined
    }
    if (hilPrefersReducedMotion || !hilActive) {
      el.classList.remove(styles.hilDiagramHubLedDim)
      return undefined
    }
    let timeoutId = null
    let cancelled = false
    const schedule = () => {
      if (cancelled) {
        return
      }
      el.classList.toggle(styles.hilDiagramHubLedDim)
      /* ~5 Hz mean toggle rate: half-period ~100 ms, heavily jittered */
      const ms = 40 + Math.random() * 160
      timeoutId = window.setTimeout(schedule, ms)
    }
    timeoutId = window.setTimeout(schedule, 60 + Math.random() * 140)
    return () => {
      cancelled = true
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId)
      }
      el.classList.remove(styles.hilDiagramHubLedDim)
    }
  }, [hilActive, hilPrefersReducedMotion])

  useLayoutEffect(() => {
    const el = hilConsoleBodyRef.current
    if (el) {
      el.scrollTop = el.scrollHeight
    }
  }, [hilTerminalLines])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTuyaAiSlideIndex(0)
      return undefined
    }
    const el = tuyaAiSectionRef.current
    if (!el) {
      return undefined
    }
    const updateTuyaAiSlide = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      if (rect.bottom < 0 || rect.top > vh) {
        return
      }
      const center = vh / 2
      const p = (center - rect.top) / Math.max(1, rect.height)
      const clamped = Math.max(0, Math.min(1, p))
      const idx = Math.min(copy.tuyaAi.images.length - 1, Math.floor(clamped * copy.tuyaAi.images.length))
      setTuyaAiSlideIndex((prev) => (prev === idx ? prev : idx))
    }
    window.addEventListener('scroll', updateTuyaAiSlide, { passive: true })
    window.addEventListener('resize', updateTuyaAiSlide, { passive: true })
    updateTuyaAiSlide()
    return () => {
      window.removeEventListener('scroll', updateTuyaAiSlide)
      window.removeEventListener('resize', updateTuyaAiSlide)
    }
  }, [locale, copy.tuyaAi.images.length])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }
    const el = tuyaAiCarouselRef.current
    if (!el) {
      return undefined
    }
    tuyaAiWheelAccumRef.current = 0
    const n = copy.tuyaAi.images.length
    const onWheel = (e) => {
      const h = el.clientHeight
      const segment = Math.max(32, h / 3)
      tuyaAiWheelAccumRef.current += e.deltaY
      let consumed = false
      while (tuyaAiWheelAccumRef.current >= segment) {
        tuyaAiWheelAccumRef.current -= segment
        setTuyaAiSlideIndex((i) => Math.min(n - 1, i + 1))
        consumed = true
      }
      while (tuyaAiWheelAccumRef.current <= -segment) {
        tuyaAiWheelAccumRef.current += segment
        setTuyaAiSlideIndex((i) => Math.max(0, i - 1))
        consumed = true
      }
      if (consumed) {
        e.preventDefault()
      }
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      el.removeEventListener('wheel', onWheel)
    }
  }, [locale, copy.tuyaAi.images.length])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }
    setTuyaAiCarouselMinHeightPx(null)
    const el = tuyaAiCarouselRef.current
    if (!el) {
      return undefined
    }
    const urls = copy.tuyaAi.images.map((item) => item.src)

    const measureMaxHeight = () => {
      const w = el.clientWidth
      if (w < 8) {
        return
      }
      Promise.all(
        urls.map(
          (url) =>
            new Promise((resolve) => {
              const img = new Image()
              img.onload = () => {
                const nw = img.naturalWidth
                const nh = img.naturalHeight
                if (nw < 1 || nh < 1) {
                  resolve(0)
                  return
                }
                resolve((nh / nw) * w)
              }
              img.onerror = () => resolve(0)
              img.src = url
            }),
        ),
      ).then((heights) => {
        const maxH = Math.max(0, ...heights)
        if (maxH > 0) {
          setTuyaAiCarouselMinHeightPx(maxH)
        }
      })
    }

    measureMaxHeight()
    const ro = new ResizeObserver(() => {
      measureMaxHeight()
    })
    ro.observe(el)
    return () => {
      ro.disconnect()
    }
  }, [locale])

  useEffect(() => {
    if (!cloudDiagramLightboxOpen) {
      return undefined
    }
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setCloudDiagramLightboxOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [cloudDiagramLightboxOpen])

  useEffect(() => {
    setSelectedStoryIndex(0)
    setDevStorySelectedImageIndex(null)
  }, [locale])

  const storyItems = copy.applicationsUseCases.items
  const activeStory = storyItems[selectedStoryIndex] ?? storyItems[0]

  return (
    <Layout description={copy.metaDescription}>
      <Head>
        <title>TuyaOpen: {siteConfig.tagline}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className={styles.landingRoot}>
        <main className={styles.landingMain}>
          {/* Hero */}
          <section className={styles.landingHero}>
            <div className={styles.heroGlow} aria-hidden />
            <div className={styles.heroInner}>
              <div className={styles.heroGrid}>
                <div>
                  <div className={styles.heroBadge}>
                    <span className={styles.heroBadgeAccent}>●</span> {copy.hero.badge}
                  </div>
                  <h1 className={styles.heroTitle}>
                    <span className={styles.heroTitleGradient}>{copy.hero.line1}</span>
                    <br />
                    {copy.hero.line2}
                    <br />
                    <span className={styles.heroTitleGradient}>{copy.hero.line3}</span>
                  </h1>
                  <p className={styles.heroSubtitle}>{copy.hero.subtitle}</p>
                  <p className={styles.heroBody}>{copy.hero.body}</p>
                  <div className={styles.heroButtons}>
                    <Link to="/docs/quick-start/enviroment-setup" className={styles.btnAccent}>
                      {copy.cta.quickStart} →
                    </Link>
                    <Link to="/docs/about-tuyaopen" className={styles.btnOutlineLight}>
                      {copy.cta.about}
                    </Link>
                    <Link to="#applications-use-cases-heading" className={styles.btnOutlineLight}>
                      {copy.cta.applications}
                    </Link>
                    <Link to="https://github.com/tuya/TuyaOpen" className={styles.btnGhostLight}>
                      <IconOctocat className="tw-w-4 tw-h-4 tw-fill-white" />
                      {copy.cta.github}
                    </Link>
                  </div>
                </div>
                <div className="scroll-to-display">
                  <div className={styles.codeWindow}>
                    <div className={styles.codeHeader}>
                      <span className={styles.codeDot} style={{ background: '#EF4444' }} />
                      <span className={styles.codeDot} style={{ background: '#F59E0B' }} />
                      <span className={styles.codeDot} style={{ background: '#10B981' }} />
                      <span className={styles.codeTitle}>terminal</span>
                    </div>
                    <pre className={styles.codeBody}>
                      <code>{copy.hero.codePreview}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Social proof strip */}
          <section className={styles.socialProof}>
            <div className={styles.socialProofGrid}>
              {copy.socialProof.items.map((item) => (
                <div key={item.label} className={styles.proofItem}>
                  <div className={styles.proofLabel}>{item.label}</div>
                  <div className={styles.proofHint}>{item.hint}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Benefits */}
          <section className={styles.featuresSection}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>{copy.benefits.sectionTag}</span>
              <h2 className={styles.sectionTitle}>{copy.benefits.title}</h2>
              <p className={styles.sectionSubtitle}>{copy.benefits.subtitle}</p>
            </div>
            <div className={styles.featuresGrid}>
              {copy.benefits.items.map((item, i) => (
                <div key={item.title} className={clsx(styles.featureCard, 'scroll-to-display')}>
                  <div className={styles.featureIcon}>{i + 1}</div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Audience */}
          <section className={styles.audienceSection}>
            <div className={styles.container}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionTag}>{copy.audience.sectionTag}</span>
                <h2 className={styles.sectionTitle}>{copy.audience.title}</h2>
                <p className={styles.sectionSubtitle}>{copy.audience.subtitle}</p>
              </div>
              <div className={styles.audienceGrid}>
                {copy.audience.items.map((item) => (
                  <article key={item.title} className={clsx(styles.audienceCard, 'scroll-to-display')}>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Hardware-in-the-loop: Embedder-inspired console + flow diagram */}
          <section
            ref={hilSectionRef}
            className={styles.hilSection}
            data-hil-active={hilActive ? 'true' : 'false'}
            aria-labelledby="tuyaopen-vibe-coding"
          >
            <span className={styles.hilSectionNewBadge}>{copy.realWorldValidation.newBadgeLabel}</span>
            <div className={styles.container}>
              <div className={styles.hilHeader}>
                <div className={styles.hilTopLayout}>
                  <div className={styles.hilIntroColumn}>
                    <span className={styles.hilEyebrow}>{copy.realWorldValidation.sectionTag}</span>
                    <h2 id="tuyaopen-vibe-coding" className={styles.hilTitle}>
                      <span className={styles.hilTitleBase}>{copy.realWorldValidation.titleBase}</span>{' '}
                      <span className={styles.hilTitleAccent}>{copy.realWorldValidation.titleAccent}</span>
                    </h2>
                    <p className={styles.hilBody} lang={locale === 'zh' ? 'zh-CN' : 'en'}>
                      {copy.realWorldValidation.bodyBefore}
                      <span className={styles.hilBodyHighlight} lang={locale === 'zh' ? 'zh-CN' : 'en'}>
                        {copy.realWorldValidation.bodyHighlight}
                      </span>
                      {copy.realWorldValidation.bodyAfter}
                    </p>
                  </div>
                  <aside className={styles.hilDevSkillsPanel}>
                    <div className={styles.hilDevSkillsCopyRow}>
                      <pre className={styles.hilDevSkillsPre} id="tuyaopen-dev-skills-install-prompt" tabIndex={0}>
                        {copy.realWorldValidation.devSkillsCopyText}
                      </pre>
                      <button
                        type="button"
                        className={styles.hilDevSkillsCopyBtn}
                        aria-describedby="tuyaopen-dev-skills-install-prompt"
                        aria-label={copy.realWorldValidation.devSkillsCopyButtonAria}
                        onClick={async () => {
                          const text = copy.realWorldValidation.devSkillsCopyText
                          try {
                            if (navigator.clipboard?.writeText) {
                              await navigator.clipboard.writeText(text)
                            } else {
                              const ta = document.createElement('textarea')
                              ta.value = text
                              ta.setAttribute('readonly', '')
                              ta.style.position = 'fixed'
                              ta.style.left = '-9999px'
                              document.body.appendChild(ta)
                              ta.select()
                              document.execCommand('copy')
                              document.body.removeChild(ta)
                            }
                            setDevSkillsCopied(true)
                            if (devSkillsCopiedTimeoutRef.current) {
                              window.clearTimeout(devSkillsCopiedTimeoutRef.current)
                            }
                            devSkillsCopiedTimeoutRef.current = window.setTimeout(() => {
                              setDevSkillsCopied(false)
                              devSkillsCopiedTimeoutRef.current = null
                            }, 4500)
                          } catch {
                            setDevSkillsCopied(false)
                          }
                        }}
                      >
                        {devSkillsCopied
                          ? copy.realWorldValidation.devSkillsCopiedLabel
                          : copy.realWorldValidation.devSkillsCopyButton}
                      </button>
                      {devSkillsCopied ? (
                        <p className={styles.hilDevSkillsPasteHint} role="status" aria-live="polite">
                          {copy.realWorldValidation.devSkillsPasteHint}
                        </p>
                      ) : null}
                    </div>
                    <p className={styles.hilDevSkillsTools}>{copy.realWorldValidation.devSkillsToolsHint}</p>
                  </aside>
                </div>
              </div>
              <div className={styles.hilSplit}>
                <div className={styles.hilConsole}>
                  <div className={styles.hilConsoleTop}>
                    <div className={styles.hilConsoleChannels}>
                      {copy.realWorldValidation.consoleChannels.map((ch) => (
                        <span
                          key={ch.id}
                          className={clsx(styles.hilConsoleChannel, styles.hilLogTag, hilToneTagClass(ch.tone))}
                        >
                          {ch.id}
                        </span>
                      ))}
                    </div>
                    <span className={styles.hilConsoleStatus}>{copy.realWorldValidation.consoleStatus}</span>
                  </div>
                  <div className={styles.hilConsoleBar}>
                    <span className={styles.hilConsoleBarTitle}>{copy.realWorldValidation.consoleTitle}</span>
                  </div>
                  <div
                    ref={hilConsoleBodyRef}
                    className={styles.hilConsoleBody}
                    role="log"
                    aria-live="polite"
                    aria-relevant="additions"
                  >
                    {hilTerminalLines.map((line) => {
                      if (line.kind === 'user') {
                        return (
                          <div key={line.id} className={clsx(styles.hilLogLine, styles.hilLogLineUser)}>
                            <span className={styles.hilLogUserPrefix}>
                              <span className={styles.hilLogPrefixEmoji} aria-hidden>
                                👤
                              </span>
                              {copy.realWorldValidation.hilTerminalUserLabel}
                            </span>
                            <span className={styles.hilLogText}>{line.text}</span>
                          </div>
                        )
                      }
                      if (line.kind === 'agent') {
                        return (
                          <div key={line.id} className={clsx(styles.hilLogLine, styles.hilLogLineAgent)}>
                            <span className={styles.hilLogAgentPrefix}>
                              <span className={styles.hilLogPrefixEmoji} aria-hidden>
                                🤖
                              </span>
                              {copy.realWorldValidation.hilTerminalAgentLabel}
                            </span>
                            <span className={styles.hilLogText}>{line.text}</span>
                          </div>
                        )
                      }
                      return (
                        <div key={line.id} className={clsx(styles.hilLogLine, styles.hilLogLineLog)}>
                          <span className={clsx(styles.hilLogTag, hilToneTagClass(line.tone))}>{line.tag}</span>
                          <span className={styles.hilLogText}>{line.text}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className={styles.hilDiagram}>
                  <div className={styles.hilDiagramInner}>
                    <svg
                      className={styles.hilDiagramSvg}
                      viewBox="0 0 360 220"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      {[
                        /* M / first control shifted right with hub (end + margin + larger card) so trunk meets box edge. */
                        'M 95 110 C 190 110 228 44 272 38',
                        'M 95 110 C 190 110 230 70 272 74',
                        /* Cloud: straight horizontal from hub centerline. */
                        'M 95 110 L 272 110',
                        'M 95 110 C 190 110 230 150 272 146',
                        'M 95 110 C 190 110 228 176 272 182',
                      ].map((d, i) => {
                        const active = hilDiagramActiveIndex === i
                        return (
                          <g key={i}>
                            <path
                              d={d}
                              pathLength={1}
                              className={clsx(styles.hilFlowPathBase, active && styles.hilFlowPathActive)}
                            />
                            <path
                              d={d}
                              pathLength={1}
                              className={clsx(styles.hilFlowPathRun, active && styles.hilFlowPathRunActive)}
                            />
                          </g>
                        )
                      })}
                    </svg>
                    <div className={styles.hilDiagramHub}>
                      <span ref={hilHubLedRef} className={styles.hilDiagramHubLed} aria-hidden />
                      <span className={styles.hilDiagramHubLabel}>{copy.realWorldValidation.diagramCenterLabel}</span>
                      <span className={styles.hilDiagramHubSub}>{copy.realWorldValidation.diagramCenterSub}</span>
                    </div>
                    <div className={styles.hilDiagramNodes}>
                      {copy.realWorldValidation.diagramNodes.map((node, i) => (
                        <div
                          key={node.id}
                          className={clsx(
                            styles.hilDiagramNode,
                            hilDiagramActiveIndex === i && styles.hilDiagramNodeActive,
                          )}
                        >
                          {node.label}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.hilSteps}>
                {copy.realWorldValidation.steps.map((step) => (
                  <div
                    key={step.num}
                    className={clsx(styles.hilStepCard, hilHighlightedStepNum === step.num && styles.hilStepCardActive)}
                    aria-current={hilHighlightedStepNum === step.num ? 'step' : undefined}
                  >
                    <span className={styles.hilStepNum}>{step.num}</span>
                    <h3 className={styles.hilStepTitle}>{step.title}</h3>
                    <p className={styles.hilStepBody}>{step.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Code showcase (full): copy left, terminal + CTAs top-right on wide screens */}
          <section className={styles.codeShowcase}>
            <div className={styles.codeShowcaseInner}>
              <div className={styles.codeShowcaseGrid}>
                <div className={styles.codeShowcaseIntro}>
                  <div className={styles.codeShowcaseHeader}>
                    <span className={styles.sectionTag}>{copy.code.sectionTag}</span>
                    <h2 className={styles.sectionTitle}>{copy.code.title}</h2>
                    <p className={styles.sectionSubtitle}>{copy.code.caption}</p>
                  </div>
                </div>
                <div className={styles.codeShowcaseAside}>
                  <div className={clsx(styles.codeWindow, 'scroll-to-display')}>
                    <div className={styles.codeHeader}>
                      <span className={styles.codeDot} style={{ background: '#EF4444' }} />
                      <span className={styles.codeDot} style={{ background: '#F59E0B' }} />
                      <span className={styles.codeDot} style={{ background: '#10B981' }} />
                      <span className={styles.codeTitle}>terminal</span>
                    </div>
                    <pre className={styles.codeBody}>
                      <code>{copy.code.block}</code>
                    </pre>
                  </div>
                  <div className={styles.codeLinks}></div>
                </div>
              </div>
              <div className={styles.codeShowcaseSteps}>
                <div className={styles.codeShowcaseHeader}>
                  <h2 className={styles.sectionTitle}>{copy.steps.title}</h2>
                </div>
                <div className={styles.codeShowcaseStepsGrid}>
                  {copy.steps.items.map((step, i) => (
                    <div key={step.title} className={clsx(styles.codeShowcaseStepCard, 'scroll-to-display')}>
                      <div className={styles.featureIcon}>{i + 1}</div>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                      <div className={styles.codeShowcaseStepLinks}>
                        {step.ctaLink && step.ctaLabel ? (
                          <Link to={step.ctaLink} className={clsx(styles.codeLinkBtn, styles.codeLinkBtnSecondary)}>
                            {step.ctaLabel} →
                          </Link>
                        ) : null}
                        {i === 1 ? (
                          <Link
                            to="/docs/tos-tools/tos-guide"
                            className={clsx(styles.codeLinkBtn, styles.codeLinkBtnPrimary)}
                          >
                            {copy.cta.tosGuide}
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Cloud interaction one-pager: hardware (left) + cloud (right), full diagram below */}
          <section className={styles.cloudOnePager} aria-labelledby="cloud-one-pager-heading">
            <div className={styles.cloudOnePagerInner}>
              <div className={styles.cloudOnePagerHeader}>
                <span className={styles.sectionTag}>{copy.cloudOnePager.sectionTag}</span>
                <h2 id="cloud-one-pager-heading" className={styles.sectionTitle}>
                  {copy.cloudOnePager.title}
                </h2>
                <p className={styles.sectionSubtitle}>{copy.cloudOnePager.subtitle}</p>
              </div>
              <div className={styles.cloudOnePagerSplit}>
                <div className={clsx(styles.cloudOnePagerCol, styles.cloudOnePagerColHardware, 'scroll-to-display')}>
                  <h3 className={styles.cloudOnePagerColTitle}>{copy.cloudOnePager.hardwareTitle}</h3>
                  <ul className={styles.cloudOnePagerList}>
                    {copy.cloudOnePager.hardwareBullets.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
                <div className={clsx(styles.cloudOnePagerCol, styles.cloudOnePagerColCloud, 'scroll-to-display')}>
                  <h3 className={styles.cloudOnePagerColTitle}>{copy.cloudOnePager.cloudTitle}</h3>
                  <ul className={styles.cloudOnePagerList}>
                    {copy.cloudOnePager.cloudBullets.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <figure className={clsx(styles.cloudOnePagerFigure, 'scroll-to-display')}>
                <button
                  type="button"
                  className={styles.cloudOnePagerImgButton}
                  onClick={() => setCloudDiagramLightboxOpen(true)}
                  aria-label={`${copy.cloudOnePager.diagramZoomHint}: ${copy.cloudOnePager.diagramCaption}`}
                >
                  <img
                    className={styles.cloudOnePagerImg}
                    src={copy.cloudOnePager.diagramUrl}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    aria-hidden
                  />
                </button>
                <figcaption className={styles.cloudOnePagerFigcaption}>
                  {copy.cloudOnePager.diagramCaption}{' '}
                  <span className={styles.cloudOnePagerZoomHint}>{copy.cloudOnePager.diagramZoomHint}</span>
                </figcaption>
              </figure>
            </div>
          </section>

          {/* Platforms + Demos */}
          <section className={styles.lightSection}>
            <div className={styles.container}>
              <div className={clsx(styles.platformsBlock, 'tw-mb-12 scroll-to-display')}>
                <h2 className={styles.platformsMainTitle}>{copy.platforms.title}</h2>
                <p className={styles.platformsIntro}>{copy.platforms.intro}</p>
                <ul className="tw-sr-only">
                  {copy.platforms.categories.map((cat) => (
                    <li key={cat.id}>
                      {cat.label}.{cat.subtext ? ` ${cat.subtext}` : ''}{' '}
                      {cat.items
                        .map((item) => {
                          let t = item.name
                          if (item.multimodal) {
                            t += ` (${copy.platforms.multimodalTag})`
                          }
                          if (item.recommended) {
                            t += ` (${copy.platforms.recommendedTag})`
                          }
                          return t
                        })
                        .join(', ')}
                    </li>
                  ))}
                </ul>
                <div className={styles.platformsStack}>
                  {copy.platforms.categories.map((cat) => (
                    <div key={cat.id} className={styles.platformsCategory}>
                      <div className={styles.platformsCategoryHead}>
                        <span className={styles.platformsCategoryLabel}>{cat.label}</span>
                        {cat.subtext ? <p className={styles.platformsCategorySubtext}>{cat.subtext}</p> : null}
                      </div>
                      <div className={styles.platformsMarqueeShell}>
                        <div className={styles.platformsChipRow}>
                          {cat.items.map((item) => (
                            <div key={`${cat.id}-${item.name}`} className={styles.platformCard}>
                              <span className={styles.platformCardName}>{item.name}</span>
                              {item.multimodal ? (
                                <span className={styles.platformCardAiGlow}>{copy.platforms.multimodalTag}</span>
                              ) : null}
                              {item.recommended ? (
                                <span className={styles.platformCardBadge}>{copy.platforms.recommendedTag}</span>
                              ) : null}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={clsx(styles.panel, 'scroll-to-display')}>
                <h2 className={clsx(styles.sectionTitle, styles.demosTitle)}>{copy.demos.title}</h2>
                <p className={clsx(styles.sectionSubtitle, styles.demosIntro)}>{copy.demos.intro}</p>
                <div className={styles.demosGrid}>
                  {copy.demos.items.map((d) => (
                    <article key={d.name} className={styles.demoCard}>
                      <h3 className={styles.demoCardName}>{d.name}</h3>
                      <p className={styles.demoCardDesc}>{d.desc}</p>
                      <div className={styles.demoCardLinks}>
                        <Link
                          to={d.codeLink}
                          className={clsx(styles.btnOutlineDark, styles.demoCardLinkBtn)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {copy.demos.codeCta}
                        </Link>
                        {!d.hideGuide ? (
                          <Link to={d.guideLink} className={clsx(styles.btnOutlineDark, styles.demoCardLinkBtn)}>
                            {copy.demos.guideCta}
                          </Link>
                        ) : null}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* T5 + Tuya AI (partners follow customer stories + applications) */}
          <section className={styles.lightSection}>
            <div className={styles.container}>
              <div
                className={clsx(
                  styles.experimentalArduino,
                  styles.experimentalArduinoTuyaAi,
                  styles.experimentalArduinoT5,
                  'scroll-to-display',
                )}
              >
                <div className={styles.experimentalArduinoInner}>
                  <div className={styles.experimentalArduinoCopy}>
                    <h2 className={styles.experimentalArduinoTitle}>
                      <span className={styles.spotlightTitleGrad}>{copy.t5.title}</span>
                    </h2>
                    <p className={styles.experimentalArduinoBody}>{copy.t5.body}</p>
                    <Link
                      to="/docs/hardware-specific/tuya-t5/t5-ai-board/overview-t5-ai-board"
                      className={clsx(styles.btnSolidPrimary, 'tw-mt-4 tw-inline-flex')}
                    >
                      {copy.cta.learnMore} →
                    </Link>
                  </div>
                  <div className={styles.experimentalArduinoVisual}>
                    <div className={styles.experimentalArduinoFloat}>
                      <div className={styles.experimentalArduinoFigure}>
                        <img
                          src={copy.t5.imageSrc}
                          alt={copy.t5.imageAlt}
                          className={styles.experimentalArduinoImg}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Experimental: Arduino IDE on T5 — image left, floating tilt */}
              <div className={clsx(styles.experimentalArduino, 'scroll-to-display')}>
                <div className={styles.experimentalArduinoInner}>
                  <div className={styles.experimentalArduinoVisual}>
                    <div className={styles.experimentalArduinoFloat}>
                      <div className={styles.experimentalArduinoFigure}>
                        <img
                          src={copy.arduinoExperimental.imageUrl}
                          alt={copy.arduinoExperimental.imageAlt}
                          className={styles.experimentalArduinoImg}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.experimentalArduinoCopy}>
                    <span className={styles.experimentalArduinoTag}>{copy.arduinoExperimental.sectionTag}</span>
                    <h2 className={styles.experimentalArduinoTitle}>
                      <span className={styles.spotlightTitleGrad}>{copy.arduinoExperimental.title}</span>
                    </h2>
                    <p className={styles.experimentalArduinoBody}>{copy.arduinoExperimental.body}</p>
                    <Link
                      to={copy.arduinoExperimental.ctaPath}
                      className={clsx(styles.btnSolidPrimary, 'tw-inline-flex')}
                    >
                      {copy.cta.learnMore} →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Tuya AI — same gradient card as Arduino; copy left, image right, left-facing tilt; scroll syncs 3 screenshots */}
              <div
                ref={tuyaAiSectionRef}
                className={clsx(styles.experimentalArduino, styles.experimentalArduinoTuyaAi, 'scroll-to-display')}
              >
                <div className={styles.experimentalArduinoInner}>
                  <div className={styles.experimentalArduinoCopy}>
                    <span className={styles.experimentalArduinoTag}>{copy.tuyaAi.sectionTag}</span>
                    <h2 className={styles.experimentalArduinoTitle}>
                      <span className={styles.spotlightTitleGrad}>{copy.tuyaAi.title}</span>
                    </h2>
                    <p className={styles.experimentalArduinoBody}>{copy.tuyaAi.body}</p>
                    {copy.tuyaAi.highlights?.length ? (
                      <ul className={styles.experimentalArduinoHighlights}>
                        {copy.tuyaAi.highlights.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    ) : null}
                    <Link
                      to="/docs/cloud/tuya-cloud/ai-agent/ai-agent-dev-platform"
                      className={clsx(styles.btnSolidPrimary, 'tw-inline-flex')}
                    >
                      {copy.cta.learnMore} →
                    </Link>
                  </div>
                  <div className={styles.experimentalArduinoVisual}>
                    <div className={styles.experimentalArduinoFloat}>
                      <figure
                        className={styles.experimentalArduinoFigure}
                        aria-live="polite"
                        aria-label={`${copy.tuyaAi.title} ${tuyaAiSlideIndex + 1} / ${copy.tuyaAi.images.length}`}
                      >
                        <div
                          ref={tuyaAiCarouselRef}
                          className={styles.tuyaAiCarousel}
                          style={
                            tuyaAiCarouselMinHeightPx != null
                              ? { minHeight: `${Math.round(tuyaAiCarouselMinHeightPx)}px` }
                              : undefined
                          }
                        >
                          <img
                            src={copy.tuyaAi.images[tuyaAiSlideIndex].src}
                            alt={copy.tuyaAi.images[tuyaAiSlideIndex].alt}
                            className={clsx(styles.experimentalArduinoImg, styles.tuyaAiCarouselImg)}
                            key={copy.tuyaAi.images[tuyaAiSlideIndex].src}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </figure>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Applications and use cases: left nav + right content/media */}
          <section className={styles.customerStories} aria-labelledby="applications-use-cases-heading">
            <div className={styles.container}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionTag}>{copy.applicationsUseCases.sectionTag}</span>
                <h2 id="applications-use-cases-heading" className={styles.sectionTitle}>
                  {copy.applicationsUseCases.title}
                </h2>
                <p className={styles.sectionSubtitle}>{copy.applicationsUseCases.subtitle}</p>
              </div>
              <div className={clsx(styles.customerStoriesSplit, 'scroll-to-display')}>
                <div
                  className={styles.customerStoriesNav}
                  role="tablist"
                  aria-label={copy.applicationsUseCases.navAriaLabel}
                >
                  {storyItems.map((item, i) => (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={selectedStoryIndex === i}
                      aria-controls={`story-panel-${item.id}`}
                      id={`story-tab-${item.id}`}
                      className={clsx(
                        styles.customerStoriesNavBtn,
                        selectedStoryIndex === i && styles.customerStoriesNavBtnActive,
                      )}
                      onClick={() => setSelectedStoryIndex(i)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <div
                  className={styles.customerStoriesPanel}
                  role="tabpanel"
                  id={`story-panel-${activeStory.id}`}
                  aria-labelledby={`story-tab-${activeStory.id}`}
                >
                  <div className={styles.customerStoriesPanelSplit}>
                    <div className={styles.customerStoriesPanelText}>
                      <h3 className={styles.customerStoriesPanelTitle}>{activeStory.title}</h3>
                      <p className={styles.customerStoriesPanelBody}>{activeStory.body}</p>
                      {activeStory.highlights?.length ? (
                        <ul className={styles.customerStoriesHighlights}>
                          {activeStory.highlights.map((line) => (
                            <li key={line}>{line}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                    <div className={styles.customerStoriesPanelMedia}>
                      <div className={styles.customerStoriesMediaBlock}>
                        <div className={styles.customerStoriesMediaWrap}>
                          {activeStory.mediaType === 'video' ? (
                            <video
                              className={styles.customerStoriesMedia}
                              controls
                              playsInline
                              preload="metadata"
                              {...(activeStory.poster ? { poster: activeStory.poster } : {})}
                            >
                              <source src={activeStory.mediaSrc} type="video/mp4" />
                            </video>
                          ) : (
                            <img
                              className={styles.customerStoriesMedia}
                              src={activeStory.mediaSrc}
                              alt={activeStory.mediaAlt}
                              loading="lazy"
                              decoding="async"
                            />
                          )}
                        </div>
                        {activeStory.mediaCredit ? (
                          <p className={styles.customerStoriesMediaCredit}>
                            <a href={activeStory.mediaCredit.href} target="_blank" rel="noopener noreferrer">
                              {activeStory.mediaCredit.label}
                            </a>
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Developer story */}
          <section className={styles.devStorySection}>
            <div className={styles.container}>
              <div className={styles.sectionHeader}>
                <span className={clsx(styles.sectionTag, styles.devStoryTag)}>{copy.developerStory.sectionTag}</span>
                <h2 className={styles.sectionTitle}>
                  <span className={styles.devStoryTitleColor}>{copy.developerStory.title}</span>
                </h2>
                <p className={styles.sectionSubtitle}>{copy.developerStory.subtitle}</p>
              </div>
              <div className={clsx(styles.devStorySplit, 'scroll-to-display')}>
                <article className={styles.devStoryNarrative}>
                  <p>{copy.developerStory.story}</p>
                  {copy.developerStory.highlights?.length ? (
                    <ul className={styles.devStoryHighlights}>
                      {copy.developerStory.highlights.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  ) : null}
                </article>
                <div className={styles.devStoryMediaPanel}>
                  <figure
                    className={styles.devStoryVideoCard}
                    role="region"
                    aria-label={copy.developerStory.videoAriaLabel}
                  >
                    <div className={styles.devStoryMediaFrame}>
                      {devStorySelectedImageIndex == null ? (
                        <iframe
                          src={copy.developerStory.videoEmbed.src}
                          title={copy.developerStory.videoEmbed.title}
                          className={styles.devStoryEmbed}
                          loading="lazy"
                          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        />
                      ) : (
                        <div
                          className={styles.devStoryMainImageStage}
                          style={{
                            '--dev-story-image-bg': `url("${copy.developerStory.galleryImages[devStorySelectedImageIndex].src}")`,
                          }}
                        >
                          <img
                            src={copy.developerStory.galleryImages[devStorySelectedImageIndex].src}
                            alt={copy.developerStory.galleryImages[devStorySelectedImageIndex].alt}
                            className={styles.devStoryMainImage}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      )}
                    </div>
                  </figure>
                  <div
                    className={styles.devStoryGallery}
                    role="region"
                    aria-label={copy.developerStory.galleryAriaLabel}
                  >
                    <figure className={styles.devStoryGalleryCard}>
                      <button
                        type="button"
                        className={clsx(
                          styles.devStoryGalleryBtn,
                          devStorySelectedImageIndex == null && styles.devStoryGalleryBtnActive,
                        )}
                        onClick={() => setDevStorySelectedImageIndex(null)}
                        aria-pressed={devStorySelectedImageIndex == null}
                        aria-label={copy.developerStory.videoEmbed.title}
                      >
                        <span className={styles.devStoryVideoThumb}>
                          <span className={styles.devStoryVideoThumbPlay}>▶</span>
                        </span>
                      </button>
                    </figure>
                    {copy.developerStory.galleryImages.map((img, index) => (
                      <figure key={`${img.src}-${index}`} className={styles.devStoryGalleryCard}>
                        <button
                          type="button"
                          className={clsx(
                            styles.devStoryGalleryBtn,
                            devStorySelectedImageIndex === index && styles.devStoryGalleryBtnActive,
                          )}
                          onClick={() => setDevStorySelectedImageIndex(index)}
                          aria-pressed={devStorySelectedImageIndex === index}
                        >
                          <img
                            src={img.src}
                            alt={img.alt}
                            className={styles.devStoryThumbImg}
                            loading="lazy"
                            decoding="async"
                          />
                        </button>
                      </figure>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Partners — no bottom padding so band meets community gradient */}
          <section className={clsx(styles.lightSection, styles.lightSectionFlushBottom)}>
            <div className={styles.container}>
              <div className={clsx(styles.partnersShowcase, 'scroll-to-display')}>
                <div className={styles.partnersShowcaseHeader}>
                  <span className={styles.partnersShowcaseTag}>{copy.partners.sectionTag}</span>
                  <h2 className={styles.partnersShowcaseTitle}>{copy.partners.title}</h2>
                  <p className={styles.partnersShowcaseSubtitle}>{copy.partners.subtitle}</p>
                </div>
                {copy.partners.colabSections?.length > 0 ? (
                  <div className={styles.partnersColabBlock}>
                    {copy.partners.colabSections.map((section, secIdx) => (
                      <div key={secIdx} className={styles.partnersColabSection}>
                        <h3 className={styles.partnersColabTitle}>{section.title}</h3>
                        <div className={styles.partnersColabGrid}>
                          {section.items.map((item) => (
                            <div key={`${secIdx}-${item.alt}-${item.src}`} className={styles.partnersColabCell}>
                              <img
                                className={clsx(
                                  styles.partnersColabImg,
                                  item.invertForLightBg && styles.partnersColabImgInvertLight,
                                )}
                                src={item.src}
                                alt={item.alt}
                                loading="lazy"
                                decoding="async"
                                referrerPolicy="no-referrer-when-downgrade"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </section>

          {/* Community */}
          <section className={styles.communitySection}>
            <div className={styles.container}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>{copy.community.title}</h2>
                <p className={styles.sectionSubtitle}>{copy.community.body}</p>
              </div>
              <div className={styles.communityGrid}>
                <div className={clsx(styles.communityCard, 'scroll-to-display')}>
                  <IconGithub className="tw-w-12 tw-h-12 tw-fill-white" />
                  <p>{copy.community.cardGitHub}</p>
                  <Link to="https://github.com/tuya/TuyaOpen" className={styles.btnGh}>
                    GitHub
                  </Link>
                </div>
                <div className={clsx(styles.communityCard, 'scroll-to-display')}>
                  <IconHelp className="tw-w-12 tw-h-12 tw-fill-white" />
                  <p>{copy.community.cardHelp}</p>
                  <div className="tw-flex tw-flex-wrap tw-gap-2">
                    <Link to="https://github.com/tuya/TuyaOpen/issues" className={styles.btnGh}>
                      Issues
                    </Link>
                    <Link to="https://github.com/tuya/TuyaOpen/discussions" className={styles.btnGh}>
                      Discussions
                    </Link>
                  </div>
                </div>
                <div className={clsx(styles.communityCard, 'scroll-to-display')}>
                  <svg
                    className="tw-w-12 tw-h-12 tw-fill-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20.317 4.369A19.791 19.791 0 0 0 16.885 3.2a.074.074 0 0 0-.079.037c-.34.607-.719 1.395-.984 2.01a18.524 18.524 0 0 0-5.59 0 12.51 12.51 0 0 0-.995-2.01.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.369a.069.069 0 0 0-.032.027C.533 9.09-.32 13.579.099 18.021a.082.082 0 0 0 .031.056c2.128 1.565 4.195 2.51 6.229 3.13a.077.077 0 0 0 .084-.027c.48-.66.91-1.356 1.273-2.084a.076.076 0 0 0-.041-.104c-.676-.256-1.32-.568-1.938-.936a.077.077 0 0 1-.008-.127c.13-.098.26-.2.384-.304a.074.074 0 0 1 .077-.01c4.06 1.855 8.447 1.855 12.47 0a.075.075 0 0 1 .078.009c.124.104.254.206.385.304a.077.077 0 0 1-.007.127 12.298 12.298 0 0 1-1.939.936.076.076 0 0 0-.04.105c.36.728.792 1.424 1.272 2.084a.076.076 0 0 0 .084.028c2.04-.62 4.106-1.565 6.23-3.13a.077.077 0 0 0 .03-.055c.5-5.177-.838-9.637-3.548-13.625a.061.061 0 0 0-.03-.028ZM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.175 1.094 2.157 2.418 0 1.334-.955 2.419-2.157 2.419Zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.175 1.094 2.157 2.418 0 1.334-.947 2.419-2.157 2.419Z" />
                  </svg>
                  <p>{copy.community.cardDiscord}</p>
                  <Link to="https://discord.com/invite/yPPShSTttG" className={styles.btnDiscord}>
                    {copy.community.discordButton}
                  </Link>
                </div>
              </div>
              <div className={styles.communityContributorsWrap}>
                <div className={styles.communityContributorsPanel}>
                  <h3 className={styles.communityContributorsTitle}>{copy.community.contributorsTitle}</h3>
                  <a
                    href="https://github.com/tuya/TuyaOpen/graphs/contributors"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.communityContributorsBadge}
                    aria-label={copy.community.contributorsAriaLabel}
                  >
                    <img
                      src="https://contrib.rocks/image?repo=tuya/TuyaOpen"
                      alt={copy.community.contributorsBadgeAlt}
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                </div>
              </div>
            </div>
          </section>

          <p className={styles.footerNote}>
            {copy.community.footerIncubator} <Link to="https://www.tuya.com/">Tuya Inc</Link>{' '}
            {locale === 'zh' ? '孵化的开源项目。' : 'incubating open source project.'}
          </p>
        </main>

        {cloudDiagramLightboxOpen ? (
          <div
            className={styles.imageLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={copy.cloudOnePager.diagramCaption}
            onClick={() => setCloudDiagramLightboxOpen(false)}
          >
            <div className={styles.imageLightboxInner} onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className={styles.imageLightboxClose}
                onClick={() => setCloudDiagramLightboxOpen(false)}
                aria-label={copy.cloudOnePager.lightboxCloseLabel}
              >
                ×
              </button>
              <img
                className={styles.imageLightboxImg}
                src={copy.cloudOnePager.diagramUrl}
                alt={copy.cloudOnePager.diagramAlt}
              />
            </div>
          </div>
        ) : null}
      </div>
    </Layout>
  )
}

export default Home
