import Head from '@docusaurus/Head'
import Link from '@docusaurus/Link'
import Layout from '@theme/Layout'
import clsx from 'clsx'
import React, { useEffect, useRef, useState } from 'react'

import { T5_CHIPSET_DATASHEET_URL, T5_FEATURE_GROUPS_LEFT, T5_FEATURE_GROUPS_RIGHT } from '../data/t5-tuyaopen-features-data'
import styles from './t5-tuyaopen.module.css'

const PARTICLE_LAYOUT = [
  { left: '8%', top: '75%', delay: '0s' },
  { left: '15%', top: '20%', delay: '1s' },
  { left: '22%', top: '55%', delay: '2s' },
  { left: '35%', top: '12%', delay: '0.5s' },
  { left: '42%', top: '80%', delay: '3s' },
  { left: '55%', top: '30%', delay: '1.5s' },
  { left: '62%', top: '65%', delay: '2.5s' },
  { left: '78%', top: '18%', delay: '0.8s' },
  { left: '88%', top: '50%', delay: '2.2s' },
  { left: '92%', top: '85%', delay: '1.2s' },
  { left: '5%', top: '40%', delay: '3.5s' },
  { left: '70%', top: '88%', delay: '0.3s' },
]

const WHY_CARDS = [
  {
    n: 1,
    title: 'Real-Time Local AI',
    body: 'Powered by TFLite-ready CPU performance with AI inference support, and comes with KWS plus realtime audio 3A AI algos.',
    icon: 'clock',
  },
  {
    n: 2,
    title: 'All-in-One Ecosystem',
    body: 'Cut development time by 60%+ with pre-integrated SDKs and developer support.',
    icon: 'puzzle',
  },
  {
    n: 3,
    title: 'Production-Ready',
    body: 'Pre-certified modules, firmware services, and OEM/ODM support for fast scaling.',
    icon: 'factory',
  },
  {
    n: 4,
    title: 'Unlimited Versatility',
    body: 'Build any Agentic AI gadget — no hardware or platform restrictions.',
    icon: 'infinity',
  },
]

const METHODS = [
  {
    title: 'TuyaOpen C SDK',
    desc: 'Enterprise-grade, full-featured SDK for deep customization and high-performance Tuya T5 projects.',
    icon: 'code',
    image: 'https://images.tuyacn.com/fe-static/docs/img/676cbf7e-74bd-4871-a4e1-d8dd1538d3fc.png',
  },
  {
    title: 'Arduino IDE',
    desc: 'Beginner-friendly environment with a large community and pre-built libraries for rapid prototyping.',
    icon: 'arduino',
    image: 'https://images.tuyacn.com/fe-static/docs/img/ab667c2a-f784-4dfb-ae21-1837ea7c21f6.png',
  },
  {
    title: 'Lua',
    desc: 'Lightweight, script-based development for fast iterations from simple to complex Tuya T5 applications.',
    icon: 'lua',
    image: 'https://images.tuyacn.com/fe-static/docs/img/46cd082a-1dbf-4193-93ec-8dcdb6a32c39.png',
  },
]

const USE_CASES = [
  {
    title: 'AI Smart Glasses',
    desc: 'Voice assistant, camera / vision pipeline, BLE audio — powered by Tuya T5, simplified by TuyaOpen.',
    icon: 'glasses',
  },
  {
    title: 'Smart Home Agents',
    desc: 'Voice hubs, vision sensors, HMI panels — fast to build, easy to scale.',
    icon: 'home',
  },
  {
    title: 'Wearable AI Cameras',
    desc: 'Local AI, Wi-Fi streaming, long battery life — leveraging Tuya T5’s efficiency.',
    icon: 'camera',
  },
  {
    title: 'Industrial AI Sensors',
    desc: 'Machine vision, predictive maintenance — secured by Tuya’s security stack.',
    icon: 'sensor',
  },
  {
    title: 'Smart Medical Devices',
    desc: 'Health monitoring, local AI — aligned with global compliance expectations.',
    icon: 'medical',
  },
]

const T5_SPECS = [
  'Flagship Processing: **480MHz** ARMv8-M Star Core (DSP + FPU).',
  'All-in-One Peripherals: **1080p** camera, premium audio, smooth display — everything for immersive smart experiences.',
  'Ultra-Low Power: **22nm** process (**16μA** deep sleep) for always-on AI without battery drain.',
  'Dual-Mode Connectivity: **Wi-Fi 6** + **Bluetooth 5.4 LE** — fast, stable, long-range connectivity.',
]

const TUYAOPEN_BENEFITS = [
  {
    title: 'Open-Source Freedom, Enterprise Reliability',
    desc: 'No lock-in, proven code validated by billions of devices.',
    icon: 'lock',
  },
  {
    title: 'Seamless AI Integration',
    desc: 'Edge-cloud intelligence and LLM integrations, optimized for Tuya T5.',
    icon: 'brain',
  },
  {
    title: 'Fast Development',
    desc: 'Zero-code to full-code flexibility — prototype in 8 hours, mass-produce in 15 days.',
    icon: 'speed',
  },
  {
    title: 'Global Security & Scale',
    desc: 'Compliant cloud, multi-layer security, and OTA updates worldwide.',
    icon: 'globe',
  },
]

const DEV_KIT_ITEMS = [
  'Pre-certified Tuya T5 module (802.11ax 2.4 GHz Wi-Fi 6 + Bluetooth 5.4 LE)',
  'Full peripheral breakout (camera, LCD, audio, USB-C)',
  'Pre-installed TuyaOpen SDK (AI libraries, LVGL graphics)',
  'TuyaOpen setup guide + code examples',
]

const DEV_KIT_IMAGE =
  'https://images.tuyacn.com/fe-static/docs/img/c230edfa-ff75-400a-80c2-298cadfe5202.jpg'
const DEV_KIT_PINOUT_IMAGE = 'https://images.tuyacn.com/fe-static/docs/img/2730839b-37f9-4135-8181-a7da2315c466.jpg'

function IconCheck() {
  return (
    <svg className={styles.check} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SpecLine({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <li className={styles.specItem}>
      <IconCheck />
      <span>
        {parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            const inner = part.slice(2, -2)
            return (
              <span key={i} className={styles.accent}>
                {inner}
              </span>
            )
          }
          return <React.Fragment key={i}>{part}</React.Fragment>
        })}
      </span>
    </li>
  )
}

function BenefitIcon({ name }) {
  const common = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.75 }
  switch (name) {
    case 'lock':
      return (
        <svg {...common}>
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 018 0v4" />
        </svg>
      )
    case 'brain':
      return (
        <svg {...common}>
          <path d="M12 5a3 3 0 00-3 3v1H7a2 2 0 00-2 2v2a2 2 0 002 2h1v1a3 3 0 006 0v-1h1a2 2 0 002-2v-2a2 2 0 00-2-2h-2V8a3 3 0 00-3-3z" />
        </svg>
      )
    case 'speed':
      return (
        <svg {...common}>
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      )
    case 'globe':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15 15 0 0110 10 15 15 0 01-10 10 15 15 0 01-10-10 15 15 0 0110-10z" />
        </svg>
      )
    case 'wallet':
      return (
        <svg {...common}>
          <path d="M21 12V7H5a2 2 0 010-4h14v4" />
          <path d="M3 5v14a2 2 0 002 2h16v-5" />
          <path d="M18 12h.01" />
        </svg>
      )
    default:
      return null
  }
}

function MethodIcon({ name }) {
  const common = { className: styles.methodIcon, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 }
  if (name === 'code') {
    return (
      <svg {...common}>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    )
  }
  if (name === 'arduino') {
    return (
      <svg {...common}>
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path d="M14 2v6h6M10 13h4M10 17h4" />
    </svg>
  )
}

function UseIcon({ name }) {
  const c = { className: styles.useIcon, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 }
  const icons = {
    glasses: (
      <svg {...c}>
        <circle cx="6" cy="12" r="4" />
        <circle cx="18" cy="12" r="4" />
        <path d="M10 12h4M2 12h2M22 12h-2" />
      </svg>
    ),
    home: (
      <svg {...c}>
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    camera: (
      <svg {...c}>
        <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
    sensor: (
      <svg {...c}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    medical: (
      <svg {...c}>
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  }
  return icons[name] || icons.home
}

function WhyIcon({ name }) {
  const s = { width: 20, height: 20, stroke: 'currentColor', fill: 'none', strokeWidth: 1.75 }
  if (name === 'clock') {
    return (
      <svg viewBox="0 0 24 24" {...s}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    )
  }
  if (name === 'puzzle') {
    return (
      <svg viewBox="0 0 24 24" {...s}>
        <path d="M12 2v4M12 18v4M4.5 8.5l3 1.5M16.5 14l3 1.5M8.5 4.5L10 7.5M14 16.5l1.5 3M19.5 8.5L17 10M5 14l-1.5 3" />
      </svg>
    )
  }
  if (name === 'factory') {
    return (
      <svg viewBox="0 0 24 24" {...s}>
        <path d="M2 22h20M4 22V10l4 3V10l4 3V6h8v16" />
        <path d="M9 18h1M14 18h1M9 14h1M14 14h1" />
      </svg>
    )
  }
  return (
    <span style={{ fontSize: '1.125rem', fontWeight: 800, lineHeight: 1, fontFamily: 'system-ui, sans-serif' }} aria-hidden>
      ∞
    </span>
  )
}

const HERO_CAPABILITY_STACK = ['ARMv8-M 480MHz', 'Camera / Audio / Graphics', 'Low Power', 'Agentic AI Ready', 'Tuya Cloud Integration']

function HeroChipVisual() {
  return (
    <div className={styles.heroChipShell}>
      <div className={styles.heroChipStage}>
        <div className={styles.heroChipTilt}>
          <div className={styles.heroChipAmbient} aria-hidden />
          <div className={styles.heroChipColumn}>
            <div className={styles.heroChipRing}>
              <div className={styles.heroChipInner}>
                <div className={styles.heroChipText}>
                  <span className={styles.heroChipLine1}>Tuya T5</span>
                  <span className={styles.heroChipLine2}>Wi-Fi 6 (2.4 GHz) + BLE 5.4</span>
                </div>
                <span className={styles.heroChipModuleBadge}>Module</span>
              </div>
            </div>
            {HERO_CAPABILITY_STACK.map((label, i) => (
              <div
                key={label}
                className={styles.heroStackLayer}
                style={{ '--stackI': i, zIndex: 9 - i }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function EcosystemIllustration() {
  return (
    <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="eg1" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#60a5fa" />
          <stop offset="1" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      <ellipse cx="160" cy="200" rx="120" ry="24" fill="rgba(255,255,255,0.08)" />
      <rect x="120" y="100" width="80" height="70" rx="8" stroke="url(#eg1)" strokeWidth="2" fill="rgba(255,255,255,0.06)" />
      <path d="M40 180 L120 135 M280 180 L200 135 M160 100 L160 60" stroke="url(#eg1)" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <circle cx="160" cy="50" r="22" stroke="url(#eg1)" strokeWidth="2" fill="rgba(96,165,250,0.15)" />
      <circle cx="40" cy="190" r="14" stroke="#34d399" strokeWidth="2" fill="rgba(52,211,153,0.12)" />
      <circle cx="280" cy="190" r="14" stroke="#f472b6" strokeWidth="2" fill="rgba(244,114,182,0.12)" />
      <text x="125" y="142" fill="#f1f5f9" fontSize="11" fontFamily="system-ui">TuyaOpen</text>
    </svg>
  )
}

export default function T5TuyaOpenLanding() {
  const pageRef = useRef(null)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isSpecsDiagramOpen, setIsSpecsDiagramOpen] = useState(false)

  useEffect(() => {
    const root = pageRef.current
    if (!root) {
      return undefined
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.revealVisible)
            obs.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    root.querySelectorAll(`.${styles.reveal}`).forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 480)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isSpecsDiagramOpen) {
      return undefined
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsSpecsDiagramOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isSpecsDiagramOpen])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <Layout title="Tuya T5 Chip" description="A powerful Wi-Fi and Bluetooth connectivity MCU for next-gen AIoT products.">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div ref={pageRef} className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.heroGrid} aria-hidden />
          <div className={styles.particles} aria-hidden>
            {PARTICLE_LAYOUT.map((p, i) => (
              <span
                key={i}
                className={styles.particle}
                style={{ left: p.left, top: p.top, animationDelay: p.delay }}
              />
            ))}
          </div>
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Tuya T5 Connectivity MCU</p>
              <h1 className={styles.heroTitle}>
                Built for Agentic AI <span>Multimodal Interfacing</span>
              </h1>
              <p className={styles.heroSub}>
                Tuya T5 delivers robust wireless connectivity, low power operation, and rich peripherals for audio,
                vision, and sensor interfaces in advanced AIoT products.
              </p>
              <p className={styles.heroHighlight}>AI workloads run in the cloud, while T5 handles real-world multisensory device interfacing</p>
              <div className={styles.ctaRow}>
                <Link className={styles.btnPrimary} to="/docs/quick-start/unboxing">
                  Get started
                </Link>
                <Link className={styles.btnGhost} to="/get-hardware">
                  View dev kits
                </Link>
              </div>
            </div>
            <div className={styles.heroVisual}>
              <HeroChipVisual />
            </div>
          </div>
        </header>

        <section className={clsx(styles.section, styles.t5Section)}>
          <div className={styles.container}>
            <div className={clsx(styles.t5Card, styles.reveal)}>
              <div>
                <h2 className={styles.sectionTitle}>Tuya T5: built for Agentic AI gadgets</h2>
                <p className={styles.sectionSub}>
                  Tuya T5&apos;s capability stack is the all-in-one foundation for Agentic AI — speed, connectivity, and
                  efficiency in one place.
                </p>
                <ul className={styles.specList}>
                  {T5_SPECS.map((t, i) => (
                    <SpecLine key={i} text={t} />
                  ))}
                </ul>
              </div>
              <div className={styles.chipVisualWrap}>
                <img className={styles.chipPhoto} src={DEV_KIT_IMAGE} alt="Tuya T5AI development board" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        <section className={clsx(styles.section, styles.openSection)}>
          <div className={styles.container}>
            <div className={clsx(styles.openGrid, styles.openGridReverse, styles.reveal)}>
              <div className={styles.ecoArt}>
                <img
                  src="https://images.tuyacn.com/fe-static/docs/img/28d06828-e246-4bef-acbb-408166748400.png"
                  alt="TuyaOpen C SDK system architecture diagram"
                  loading="lazy"
                />
              </div>
              <div>
                <span className={styles.badge}>Trusted by 1.3M+ developers</span>
                <h2 className={styles.sectionTitle}>TuyaOpen: scale Tuya T5 products globally</h2>
                <p className={styles.sectionSub}>
                  TuyaOpen turns Tuya T5&apos;s raw power into market-ready innovation — cut development time, reduce
                  costs, and scale faster.
                </p>
                <p className={styles.sectionSub} style={{ marginTop: '-1rem' }}>
                  <strong>TuyaOpen&apos;s benefits for developers</strong>
                </p>
                <ul className={styles.benefitList}>
                  {TUYAOPEN_BENEFITS.map((b, i) => (
                    <li key={i} className={styles.benefitItem}>
                      <span className={styles.benefitIcon}>
                        <BenefitIcon name={b.icon} />
                      </span>
                      <div>
                        <strong>{b.title}</strong>
                        <p style={{ margin: '0.35rem 0 0', fontSize: '0.9375rem', color: 'var(--ifm-color-emphasis-700)' }}>
                          {b.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className={clsx(styles.section, styles.whySection)}>
          <div className={styles.whyGridBg} aria-hidden />
          <div className={styles.container} style={{ position: 'relative' }}>
            <h2 className={clsx(styles.sectionTitle, styles.reveal)} style={{ textAlign: 'center', maxWidth: '36rem', margin: '0 auto 0.75rem' }}>
              Why Tuya T5 + TuyaOpen = Agentic AI success
            </h2>
            <p
              className={clsx(styles.sectionSub, styles.reveal)}
              style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}
            >
              From silicon to software to shipment — one aligned path for intelligent devices.
            </p>
            <div className={styles.whyGrid}>
              {WHY_CARDS.map((c) => (
                <article key={c.n} className={clsx(styles.whyCard, styles.reveal)}>
                  <span className={styles.whyNum}>{c.n}</span>
                  <div style={{ color: 'var(--ifm-color-emphasis-600)', marginBottom: '0.35rem' }}>
                    <WhyIcon name={c.icon} />
                  </div>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={clsx(styles.section, styles.devkitSection)}>
          <div className={styles.container}>
            <div className={clsx(styles.devkitRow, styles.reveal)}>
              <div className={styles.devkitMock}>
                <img className={styles.devkitImg} src={DEV_KIT_PINOUT_IMAGE} alt="Tuya T5 dev kit board pinout diagram" loading="lazy" />
              </div>
              <div>
                <h2 className={styles.sectionTitle}>Start building today: T5 dev kit + TuyaOpen</h2>
                <p className={styles.sectionSub}>
                  Turn your vision into a working prototype in hours with hardware fully integrated with TuyaOpen tools.
                </p>
                <p style={{ fontWeight: 700, marginBottom: '0.75rem' }}>Dev kit includes</p>
                <ul className={styles.specList}>
                  {DEV_KIT_ITEMS.map((t, i) => (
                    <li key={i} className={styles.specItem}>
                      <IconCheck />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
                <div className={styles.bonus}>
                  <strong>Bonus:</strong> Join TuyaOpen&apos;s Discord and developer community for support and collaboration.
                </div>
                <Link className={clsx(styles.btnPrimary, styles.btnWide)} to="/get-hardware">
                  Order dev kit
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={clsx(styles.section, styles.methodsSection)}>
          <div className={styles.container}>
            <div className={styles.methodsHead}>
              <h2 className={clsx(styles.sectionTitle, styles.reveal)}>Development methods that fit your workflow</h2>
              <p className={clsx(styles.sectionSub, styles.reveal)} style={{ margin: '0 auto', textAlign: 'center' }}>
                Choose the stack you prefer — Tuya T5 and TuyaOpen support multiple paths from bring-up to production.
              </p>
            </div>
            <div className={styles.methodCards}>
              {METHODS.map((m) => (
                <div key={m.title} className={clsx(styles.methodCard, styles.reveal)}>
                  {m.image ? (
                    <img className={styles.methodIconImage} src={m.image} alt={`${m.title} icon`} loading="lazy" />
                  ) : (
                    <MethodIcon name={m.icon} />
                  )}
                  <h3>{m.title}</h3>
                  <p>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={clsx(styles.section, styles.useSection)}>
          <div className={styles.container}>
            <h2 className={clsx(styles.sectionTitle, styles.useHead, styles.reveal)}>Ideal use cases</h2>
            <p className={clsx(styles.sectionSub, styles.useHead, styles.reveal)} style={{ margin: '0 auto 0.5rem' }}>
              Where chip performance, TuyaOpen middleware, and cloud applications converge.
            </p>
            <p className={styles.useHint}>Swipe to explore →</p>
            <div className={styles.useTrack}>
              {USE_CASES.map((u) => (
                <div key={u.title} className={clsx(styles.useCard, styles.reveal)}>
                  <UseIcon name={u.icon} />
                  <h3>{u.title}</h3>
                  <p>{u.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={clsx(styles.section, styles.featuresSection)} aria-labelledby="t5-specs-heading">
          <div className={styles.container}>
            <h2 id="t5-specs-heading" className={clsx(styles.sectionTitle, styles.featuresHead)}>
              Specs
            </h2>
            <div className={styles.featuresLayout}>
              <div className={styles.featuresColLeft}>
                {T5_FEATURE_GROUPS_LEFT.map((g) => (
                  <div key={g.title} className={styles.featureGroupCard}>
                    <h3 className={styles.featureGroupTitle}>{g.title}</h3>
                    <ul className={styles.featureBulletList}>
                      {g.bullets.map((line, i) => (
                        <li key={`${g.title}-${i}`}>
                          {typeof line === 'string' ? line : line.text}
                          {typeof line !== 'string' && line.modelDetails && line.modelDetails.length > 0 ? (
                            <div className={styles.packagingModelGrid}>
                              {line.modelDetails.map((model) => (
                                <div key={model.name} className={styles.packagingModelCard}>
                                  {model.image ? (
                                    <img
                                      className={styles.packagingModelImage}
                                      src={model.image}
                                      alt={`${model.name} package pinout`}
                                      loading="lazy"
                                    />
                                  ) : null}
                                  <p className={styles.packagingModelName}>{model.name}</p>
                                  <p className={styles.packagingModelMeta}>{model.meta}</p>
                                  <p className={styles.packagingModelDims}>{model.dimensions}</p>
                                  {model.href ? (
                                    <a className={styles.packagingModelLink} href={model.href} target="_blank" rel="noopener noreferrer">
                                      Module datasheet
                                    </a>
                                  ) : null}
                                </div>
                              ))}
                            </div>
                          ) : null}
                          {typeof line !== 'string' && line.subBullets && line.subBullets.length > 0 ? (
                            <ul className={styles.featureSubBulletList}>
                              {line.subBullets.map((sub, subIdx) => (
                                <li key={`${g.title}-${i}-${subIdx}`}>{sub}</li>
                              ))}
                            </ul>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className={styles.featuresColRight}>
                {T5_FEATURE_GROUPS_RIGHT.map((g) => (
                  <div key={g.title} className={styles.featureGroupCard}>
                    <h3 className={styles.featureGroupTitle}>{g.title}</h3>
                    <ul className={styles.featureBulletList}>
                      {g.bullets.map((line, i) => (
                        <li key={`${g.title}-${i}`}>
                          {typeof line === 'string' ? line : line.text}
                          {typeof line !== 'string' && line.modelDetails && line.modelDetails.length > 0 ? (
                            <div className={styles.packagingModelGrid}>
                              {line.modelDetails.map((model) => (
                                <div key={model.name} className={styles.packagingModelCard}>
                                  {model.image ? (
                                    <img
                                      className={styles.packagingModelImage}
                                      src={model.image}
                                      alt={`${model.name} package pinout`}
                                      loading="lazy"
                                    />
                                  ) : null}
                                  <p className={styles.packagingModelName}>{model.name}</p>
                                  <p className={styles.packagingModelMeta}>{model.meta}</p>
                                  <p className={styles.packagingModelDims}>{model.dimensions}</p>
                                  {model.href ? (
                                    <a className={styles.packagingModelLink} href={model.href} target="_blank" rel="noopener noreferrer">
                                      Module datasheet
                                    </a>
                                  ) : null}
                                </div>
                              ))}
                            </div>
                          ) : null}
                          {typeof line !== 'string' && line.subBullets && line.subBullets.length > 0 ? (
                            <ul className={styles.featureSubBulletList}>
                              {line.subBullets.map((sub, subIdx) => (
                                <li key={`${g.title}-${i}-${subIdx}`}>{sub}</li>
                              ))}
                            </ul>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <figure className={styles.featuresDiagram}>
              <p className={styles.featuresDiagramTitle}>System Diagram</p>
              <button
                type="button"
                className={styles.featuresDiagramTrigger}
                onClick={() => setIsSpecsDiagramOpen(true)}
                aria-label="Enlarge Tuya T5 block diagram"
              >
                <img
                  className={styles.featuresDiagramImage}
                  src="https://images.tuyacn.com/fe-static/docs/img/4cd94493-c714-4604-8b0c-8a3a6bb7599b.png"
                  alt="Tuya T5 block diagram"
                  loading="lazy"
                />
              </button>
            </figure>
            <a className={styles.featuresChipsetBtn} href={T5_CHIPSET_DATASHEET_URL} target="_blank" rel="noopener noreferrer">
              T5 ChipSet Datasheet
            </a>
          </div>
        </section>

        {isSpecsDiagramOpen ? (
          <div className={styles.featuresDiagramModal} onClick={() => setIsSpecsDiagramOpen(false)} role="dialog" aria-modal="true">
            <button
              type="button"
              className={styles.featuresDiagramModalClose}
              onClick={() => setIsSpecsDiagramOpen(false)}
              aria-label="Close enlarged diagram"
            >
              ×
            </button>
            <img
              className={styles.featuresDiagramModalImage}
              src="https://images.tuyacn.com/fe-static/docs/img/4cd94493-c714-4604-8b0c-8a3a6bb7599b.png"
              alt="Tuya T5 block diagram enlarged"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        ) : null}

        <footer className={styles.finalCta}>
          <div className={styles.finalParticles} aria-hidden>
            <div className={styles.finalGlow} />
          </div>
          <div className={styles.finalInner}>
            <h2 className={styles.finalTitle}>Lead the Agentic AI revolution — start now</h2>
            <p className={styles.finalSub}>
              Lead the Agentic AI era — powered by Tuya T5, enabled by TuyaOpen.
            </p>
            <div className={styles.finalBtns}>
              <Link className={clsx(styles.finalBtn, styles.finalBtnPrimary)} to="/docs/about-tuyaopen">
                Explore documentation
              </Link>
              <Link className={clsx(styles.finalBtn, styles.finalBtnSecondary)} to="/get-hardware">
                Get dev kits
              </Link>
              <a
                className={clsx(styles.finalBtn, styles.finalBtnSecondary)}
                href="https://github.com/tuya/TuyaOpen"
                target="_blank"
                rel="noopener noreferrer"
              >
                Star on GitHub
              </a>
            </div>
            <p className={styles.tagline}>Chip · TuyaOpen stack · Applications — ship with confidence</p>
          </div>
        </footer>

        <button
          type="button"
          className={clsx(styles.scrollTop, showScrollTop && styles.scrollTopVisible)}
          onClick={scrollTop}
          aria-label="Scroll to top"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
      </div>
    </Layout>
  )
}
