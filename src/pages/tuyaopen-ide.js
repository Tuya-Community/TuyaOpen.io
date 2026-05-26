import useBaseUrl from '@docusaurus/useBaseUrl'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import clsx from 'clsx'
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

import { tuyaOpenIdeCopy } from '../data/tuyaOpenIdeCopy'
import styles from './tuyaopen-ide.module.css'

function patchGifPlayOnce(buf) {
  const data = new Uint8Array(buf)
  const gctSize = data[10] & 0x80 ? 3 * (1 << ((data[10] & 0x07) + 1)) : 0
  const headerEnd = 13 + gctSize
  let netscapeStart = -1
  let netscapeEnd = -1
  let i = headerEnd
  while (i < data.length - 1) {
    if (data[i] === 0x21 && data[i + 1] === 0xff && i + 2 < data.length) {
      const blockSize = data[i + 2]
      if (blockSize === 11 && i + 14 < data.length) {
        const label = String.fromCharCode(...data.slice(i + 3, i + 14))
        if (label === 'NETSCAPE2.0' || label === 'ANIMEXTS1.0') {
          netscapeStart = i
          let j = i + 2
          while (j < data.length && data[j]) j += data[j] + 1
          j++
          netscapeEnd = j
          break
        }
      }
    }
    i++
  }
  if (netscapeStart === -1) return buf
  const result = new Uint8Array(data.length - (netscapeEnd - netscapeStart))
  result.set(data.slice(0, netscapeStart))
  result.set(data.slice(netscapeEnd), netscapeStart)
  return result.buffer
}

function makePlayOnceBlobUrl(src) {
  return fetch(src)
    .then((r) => r.arrayBuffer())
    .then((buf) => {
      const patched = patchGifPlayOnce(buf)
      const blob = new Blob([patched], { type: 'image/gif' })
      return URL.createObjectURL(blob)
    })
}

function AnimatedGif({ src, alt, className }) {
  const imgRef = useRef(null)
  const blobUrlRef = useRef(null)

  useEffect(() => {
    let revoke
    makePlayOnceBlobUrl(src).then((url) => {
      blobUrlRef.current = url
      revoke = url
      if (imgRef.current) imgRef.current.src = url
    })
    return () => {
      if (revoke) URL.revokeObjectURL(revoke)
    }
  }, [src])

  const handleMouseEnter = useCallback(() => {
    const img = imgRef.current
    if (!img || !blobUrlRef.current) return
    const oldUrl = blobUrlRef.current
    makePlayOnceBlobUrl(src).then((url) => {
      blobUrlRef.current = url
      if (imgRef.current) imgRef.current.src = url
      URL.revokeObjectURL(oldUrl)
    })
  }, [src])

  return <img ref={imgRef} alt={alt} className={className} onMouseEnter={handleMouseEnter} />
}

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

function useScrollFadeIn() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-visible', 'true')
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' },
    )
    const targets = el.querySelectorAll('[data-animate]')
    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  return ref
}

function useTilt(cardSelector) {
  const ref = useRef(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return
    const cards = container.querySelectorAll(cardSelector)

    const handlers = []
    cards.forEach((card) => {
      const onMove = (e) => {
        const rect = card.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        card.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateZ(8px)`
      }
      const onLeave = () => {
        card.style.transform = ''
      }
      card.addEventListener('mousemove', onMove)
      card.addEventListener('mouseleave', onLeave)
      handlers.push({ card, onMove, onLeave })
    })

    return () => {
      handlers.forEach(({ card, onMove, onLeave }) => {
        card.removeEventListener('mousemove', onMove)
        card.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [cardSelector])

  return ref
}

function useParallaxOrbs() {
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY
          document.querySelectorAll('[data-parallax-orb]').forEach((orb, i) => {
            const speed = 0.03 + i * 0.015
            orb.style.transform = `translateY(${scrollY * speed}px)`
          })
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
}

function HeroMockupParallax({ children }) {
  const mockupRef = useRef(null)
  const heroRef = useRef(null)

  useEffect(() => {
    const hero = heroRef.current
    const mockup = mockupRef.current
    if (!hero || !mockup) return

    const onMove = (e) => {
      const rect = hero.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      mockup.style.transform = `rotateX(${8 + y * -6}deg) rotateY(${-3 + x * 8}deg) rotateZ(${1 + x * -2}deg)`
    }
    const onLeave = () => {
      mockup.style.transform = ''
    }

    hero.addEventListener('mousemove', onMove)
    hero.addEventListener('mouseleave', onLeave)
    return () => {
      hero.removeEventListener('mousemove', onMove)
      hero.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return { heroRef, mockupRef }
}

function FeatureDetailSection({ copy }) {
  const [activeScene, setActiveScene] = useState(0)

  return (
    <section className={styles.featureDetail} id="detail">
      <div className={styles.featureDetailInner}>
        <div className={styles.fdLeft} data-animate data-animate-type="left">
          <div className={styles.fdDescCard}>
            <h3 className={styles.fdDescCardTitle}>{copy.featureDetail.title}</h3>
            <p className={styles.fdDescCardText}>
              {copy.featureDetail.desc}
              <br />
              <br />
              <strong>{copy.featureDetail.mode1Label}</strong> {copy.featureDetail.mode1Desc}
              <br />
              <br />
              <strong>{copy.featureDetail.mode2Label}</strong> {copy.featureDetail.mode2Desc}
            </p>
          </div>
          <div className={styles.fdPills}>
            {copy.featureDetail.pills.map((pill, i) => (
              <button
                key={i}
                className={clsx(styles.fdPill, i === activeScene && styles.fdPillActive)}
                onClick={() => setActiveScene(i)}
              >
                <span className={styles.fdPillLabel}>{pill.label}</span>
                <div className={clsx(styles.fdPillDetail, i === activeScene && styles.fdPillDetailOpen)}>
                  {pill.detail}
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className={styles.fdRight} data-scene={activeScene} data-animate data-animate-type="right">
          <div className={styles.fdMainImage}>
            <div className={styles.fdImagePlaceholder} />
          </div>
          <div className={clsx(styles.fdFloatPanel, styles.fdFloat1)} />
          <div className={clsx(styles.fdFloatPanel, styles.fdFloat2)} />
        </div>
      </div>
    </section>
  )
}

const CAP_VISUAL_CLASSES = [
  styles.capV1,
  styles.capV2,
  styles.capV3,
  styles.capV4,
  styles.capV5,
  styles.capV6,
  styles.capV7,
  styles.capV8,
]

const FEATURE_ICONS = [
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ color: 'var(--accent-from)' }}
  >
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>,
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ color: 'var(--violet-from)' }}
  >
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>,
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ color: '#4ec9b0' }}
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>,
]

const FEATURE_ICON_STYLES = [styles.featureIconOrange, styles.featureIconViolet, styles.featureIconGreen]

export default function TuyaOpenIdePage() {
  const { i18n } = useDocusaurusContext()
  const [locale, setLocale] = useState(i18n.currentLocale === 'zh' ? 'zh' : 'en')
  const copy = tuyaOpenIdeCopy[locale]
  const debuggerGifUrl = useBaseUrl('/img/ide/debugger.gif')
  const pinIoConfigUrl = useBaseUrl('/img/ide/pin-io-config.svg')
  const demoLibraryGifUrl = useBaseUrl('/img/ide/demo-library.gif')
  const skillCardGifUrl = useBaseUrl('/img/ide/skill-card.gif')
  const boardCatalogueGifUrl = useBaseUrl('/img/ide/board-catalogue.gif')

  const capVisualImages = {
    0: { src: boardCatalogueGifUrl, alt: 'Board Catalogue' },
    1: { src: pinIoConfigUrl, alt: 'AI Pin Mapping' },
    2: { src: demoLibraryGifUrl, alt: 'Demo Library' },
    3: { src: skillCardGifUrl, alt: 'Skills Registry' },
    4: { src: useBaseUrl('/img/ide/sdk-management.gif'), alt: 'SDK Management' },
    5: { src: debuggerGifUrl, alt: 'Device Tooling' },
  }

  const containerRef = useScrollFadeIn()
  const capRef = useTilt('[data-tilt]')
  useParallaxOrbs()

  const heroRef = useRef(null)
  const mockupRef = useRef(null)

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
        if (stepNum) return stepNum
      }
    }
    return null
  }, [hilTerminalLines])

  useEffect(() => {
    const hero = heroRef.current
    const mockup = mockupRef.current
    if (!hero || !mockup) return

    const onMove = (e) => {
      const rect = hero.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      mockup.style.transform = `rotateX(${8 + y * -6}deg) rotateY(${-3 + x * 8}deg) rotateZ(${1 + x * -2}deg)`
    }
    const onLeave = () => {
      mockup.style.transform = ''
    }

    hero.addEventListener('mousemove', onMove)
    hero.addEventListener('mouseleave', onLeave)
    return () => {
      hero.removeEventListener('mousemove', onMove)
      hero.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const type = entry.target.getAttribute('data-animate-type')
            if (type === 'left') {
              entry.target.classList.add(styles.fadeInLeftVisible)
            } else if (type === 'right') {
              entry.target.classList.add(styles.fadeInRightVisible)
            } else {
              entry.target.classList.add(styles.fadeInVisible)
            }
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' },
    )
    const targets = container.querySelectorAll('[data-animate]')
    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  // HIL: IntersectionObserver to activate animation
  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setHilPrefersReducedMotion(mq.matches)
    const el = hilSectionRef.current
    if (!el) return undefined
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

  // HIL: cleanup copy timeout
  useEffect(() => {
    return () => {
      if (devSkillsCopiedTimeoutRef.current) window.clearTimeout(devSkillsCopiedTimeoutRef.current)
    }
  }, [])

  // HIL: terminal animation loop
  useEffect(() => {
    const hil = tuyaOpenIdeCopy[locale].realWorldValidation
    const seq = hil.hilTerminalSequence
    if (hilPrefersReducedMotion) {
      let lastDiagram = null
      const staticLines = seq.map((step, i) => {
        if (step.diagramIndex !== undefined && step.diagramIndex !== null) lastDiagram = step.diagramIndex
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
        if (cancelled) break
        for (let s = 0; s < seq.length; s += 1) {
          if (cancelled) break
          const step = seq[s]
          const wait = Math.max(32, Math.round((step.delayBefore ?? 0) * delayScale))
          await sleep(wait)
          if (cancelled) break
          if (step.kind === 'log' && step.diagramIndex !== undefined && step.diagramIndex !== null) {
            setHilDiagramActiveIndex(step.diagramIndex)
          }
          setHilTerminalLines((prev) => [...prev, { id: nextLineId(), ...step }])
        }
        if (cancelled) break
        await sleep(HIL_RESTART_DELAY_MS)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [hilActive, hilPrefersReducedMotion, locale])

  // HIL: LED blink
  useEffect(() => {
    const el = hilHubLedRef.current
    if (!el) return undefined
    if (hilPrefersReducedMotion || !hilActive) {
      el.classList.remove(styles.hilDiagramHubLedDim)
      return undefined
    }
    let timeoutId = null
    let cancelled = false
    const schedule = () => {
      if (cancelled) return
      el.classList.toggle(styles.hilDiagramHubLedDim)
      const ms = 40 + Math.random() * 160
      timeoutId = window.setTimeout(schedule, ms)
    }
    timeoutId = window.setTimeout(schedule, 60 + Math.random() * 140)
    return () => {
      cancelled = true
      if (timeoutId !== null) window.clearTimeout(timeoutId)
      el.classList.remove(styles.hilDiagramHubLedDim)
    }
  }, [hilActive, hilPrefersReducedMotion])

  // HIL: auto-scroll console
  useLayoutEffect(() => {
    const el = hilConsoleBodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [hilTerminalLines])

  return (
    <Layout title="TuyaOpen IDE" description="The all-in-one VS Code extension for embedded IoT development.">
      <div className={styles.idePage} ref={containerRef}>
        {/* Header */}
        <header className={styles.header}>
          <a href="/tuyaopen-ide" className={styles.headerLogo}>
            <span className={styles.logoIcon}>T</span>
            <span>TuyaOpen IDE</span>
          </a>
          <nav>
            <ul className={styles.headerNav}>
              <li>
                <a href="#features">{copy.nav.features}</a>
              </li>
              <li>
                <a href="#capabilities">{copy.nav.capabilities}</a>
              </li>
              <li>
                <a href="#showcase">{copy.nav.showcase}</a>
              </li>
              <li>
                <a href="#why">{copy.nav.why}</a>
              </li>
              <li>
                <a href="#download">{copy.nav.download}</a>
              </li>
            </ul>
          </nav>
          <div className={styles.headerActions}>
            <button
              type="button"
              className={styles.localeSwitchBtn}
              onClick={() => setLocale((prev) => (prev === 'en' ? 'zh' : 'en'))}
              aria-label={locale === 'en' ? 'Switch to Chinese' : 'Switch to English'}
            >
              {locale === 'en' ? '中文' : 'EN'}
            </button>
            <a href="#download" className={styles.btnCta}>
              {copy.nav.cta}
            </a>
          </div>
        </header>

        {/* Hero */}
        <section className={styles.hero} ref={heroRef}>
          <div className={clsx(styles.floatOrb, styles.heroOrb1)} data-parallax-orb></div>
          <div className={clsx(styles.floatOrb, styles.heroOrb2)} data-parallax-orb></div>
          <div className={clsx(styles.floatOrb, styles.heroOrb3)} data-parallax-orb></div>

          <div className={clsx(styles.heroBadge, styles.fadeIn)} data-animate>
            <span className={styles.heroDot}></span>
            <span>{copy.hero.badge}</span>
          </div>
          <h1 className={clsx(styles.heroTitle, styles.fadeIn)} data-animate>
            <span>{copy.hero.titlePrefix}</span>
            <span className={styles.gradientText}>{copy.hero.titleHighlight}</span>
          </h1>
          <p className={clsx(styles.heroSubtitle, styles.fadeIn)} data-animate>
            {copy.hero.subtitle}
          </p>
          <div className={clsx(styles.heroButtons, styles.fadeIn)} data-animate>
            <a href="#download" className={clsx(styles.btnCta, styles.btnCtaLg)}>
              {copy.hero.ctaPrimary}
            </a>
            <a
              href="https://github.com/tuya/tuyaopen"
              className={styles.btnSecondary}
              target="_blank"
              rel="noopener noreferrer"
            >
              {copy.hero.ctaSecondary}
            </a>
          </div>

          <div className={clsx(styles.heroMockup, styles.fadeIn)} data-animate>
            <div className={styles.mockupMain} ref={mockupRef}>
              <img
                src="https://images.tuyacn.com/fe-static/docs/img/a967ad23-91ec-49d6-998f-77a2d8a32d1e.gif"
                alt={copy.hero.screenshotAlt}
                className={styles.heroGif}
              />
            </div>
            <div className={clsx(styles.floatingPanel, styles.panel1)}>
              <span className={styles.panelDot} style={{ background: '#4ec9b0' }}></span>
              <span>{copy.hero.floatBuild}</span>
            </div>
            <div className={clsx(styles.floatingPanel, styles.panel2)}>
              <span className={styles.panelDot} style={{ background: 'var(--accent-from)' }}></span>
              <span>{copy.hero.floatFlash}</span>
            </div>
            <div className={clsx(styles.floatingPanel, styles.panel3)}>
              <span className={styles.panelDot} style={{ background: 'var(--violet-from)' }}></span>
              <span>{copy.hero.floatConnected}</span>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className={styles.section} id="features">
          <div className={styles.fadeIn} data-animate>
            <span className={styles.sectionLabel}>{copy.features.label}</span>
            <h2 className={styles.sectionTitle}>{copy.features.title}</h2>
            <p className={styles.sectionDesc}>{copy.features.desc}</p>
          </div>
          <div className={styles.featuresGrid}>
            {copy.features.items.map((item, i) => (
              <div key={i} className={clsx(styles.featureCard, styles.fadeIn)} data-animate>
                <div className={clsx(styles.featureIcon, FEATURE_ICON_STYLES[i])}>{FEATURE_ICONS[i]}</div>
                <h3 className={styles.featureCardTitle}>{item.title}</h3>
                <p className={styles.featureCardDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Feature Detail */}
        <FeatureDetailSection copy={copy} />

        {/* Vibe Coding / Hardware-in-the-Loop */}
        <section
          ref={hilSectionRef}
          className={styles.hilSection}
          data-hil-active={hilActive ? 'true' : 'false'}
          aria-labelledby="ide-vibe-coding"
        >
          <div className={styles.hilContainer}>
            <div className={styles.hilHeader}>
              <div className={styles.hilTopLayout}>
                <div className={styles.hilIntroColumn}>
                  <span className={styles.hilEyebrow}>{copy.realWorldValidation.sectionTag}</span>
                  <h2 id="ide-vibe-coding" className={styles.hilTitle}>
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
                      'M 95 110 C 190 110 228 44 272 38',
                      'M 95 110 C 190 110 230 70 272 74',
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

        {/* Capabilities */}
        <section className={styles.section} id="capabilities" ref={capRef}>
          <div className={styles.fadeIn} data-animate>
            <span className={styles.sectionLabel}>{copy.capabilities.label}</span>
            <h2 className={styles.sectionTitle}>{copy.capabilities.title}</h2>
            <p className={styles.sectionDesc}>{copy.capabilities.desc}</p>
          </div>
          <div className={styles.capabilitiesGrid}>
            {copy.capabilities.items.map((item, i) => (
              <div
                key={i}
                className={clsx(styles.capabilityCard, styles.fadeIn, styles.staggerChild)}
                data-animate
                data-tilt
              >
                <div className={clsx(styles.capVisual, CAP_VISUAL_CLASSES[i])}>
                  {capVisualImages[i] ? (
                    capVisualImages[i].src.endsWith('.gif') ? (
                      <AnimatedGif
                        src={capVisualImages[i].src}
                        alt={capVisualImages[i].alt}
                        className={i === 5 ? styles.capVisualImgSmall : styles.capVisualImg}
                      />
                    ) : (
                      <img
                        src={capVisualImages[i].src}
                        alt={capVisualImages[i].alt}
                        className={i === 5 ? styles.capVisualImgSmall : styles.capVisualImg}
                        loading="lazy"
                      />
                    )
                  ) : (
                    <span>{item.icon}</span>
                  )}
                </div>
                <h4 className={styles.capTitle}>{item.title}</h4>
                <p className={styles.capDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Showcase */}
        <section className={styles.showcaseSection} id="showcase">
          <div className={clsx(styles.floatOrb, styles.showcaseOrb)}></div>
          <div className={styles.showcaseInner}>
            <div className={styles.fadeIn} data-animate>
              <span className={styles.sectionLabel}>{copy.showcase.label}</span>
              <h2 className={styles.sectionTitle}>{copy.showcase.title}</h2>
              <p className={clsx(styles.sectionDesc, styles.showcaseDescCenter)}>{copy.showcase.desc}</p>
            </div>
            <div className={clsx(styles.showcaseStack, styles.fadeIn)} data-animate>
              <div className={clsx(styles.showcaseCard, styles.scBack)}>
                <span>{copy.showcase.back}</span>
              </div>
              <div className={clsx(styles.showcaseCard, styles.scMid)}>
                <span>{copy.showcase.mid}</span>
              </div>
              <div className={clsx(styles.showcaseCard, styles.scFront)}>
                <span>{copy.showcase.front}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Why */}
        <section className={styles.whySection} id="why">
          <div className={styles.whyGrid}>
            <div className={clsx(styles.whyContent, styles.fadeInLeft)} data-animate data-animate-type="left">
              <span className={styles.sectionLabel}>{copy.why.label}</span>
              <h2 className={styles.whyTitle}>{copy.why.title}</h2>
              <p className={styles.whyDesc}>{copy.why.desc}</p>
              <ul className={styles.whyList}>
                {copy.why.items.map((item, i) => (
                  <li key={i} className={styles.whyListItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className={clsx(styles.whyVisualWrap, styles.fadeInRight)} data-animate data-animate-type="right">
              <div className={styles.whyVisual}>
                <img
                  src={copy.why.architectureImg}
                  alt={copy.why.architectureAlt}
                  className={styles.whyArchImg}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Download */}
        <section className={styles.downloadSection} id="download">
          <div className={clsx(styles.floatOrb, styles.downloadOrb)}></div>
          <div className={styles.fadeIn} data-animate>
            <h2 className={styles.downloadTitle}>{copy.download.title}</h2>
            <p className={styles.downloadDesc}>{copy.download.desc}</p>
            <div className={styles.downloadButtons}>
              <a href="#" className={clsx(styles.btnCta, styles.btnCtaLg)}>
                {copy.download.marketplace}
              </a>
              <a
                href="https://github.com/tuya/tuyaopen"
                className={styles.btnSecondary}
                target="_blank"
                rel="noopener noreferrer"
              >
                {copy.download.github}
              </a>
            </div>
            <p className={styles.platformInfo}>{copy.download.platforms}</p>
          </div>
        </section>
      </div>
    </Layout>
  )
}
