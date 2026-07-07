import BrowserOnly from '@docusaurus/BrowserOnly'
import Head from '@docusaurus/Head'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import clsx from 'clsx'
import React, { useEffect, useRef } from 'react'

import BlurText from '@site/src/components/BlurText/BlurText'
import PartnersShowcase from '@site/src/components/PartnersShowcase/PartnersShowcase'
import { homepageCopy } from '@site/src/data/homepageCopy'
import styles from './partners.module.css'

// Hotter than About/Mission — the page is an invitation, so the Aurora pushes
// further into saturation. Violet → cyan stays the committed brand axis.
const HERO_AURORA = ['#7c3aed', '#06b6d4', '#22d3ee']
const REACH_AURORA = ['#5227FF', '#7c3aed', '#06b6d4']

const ICONS = {
  silicon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" fill="currentColor" stroke="none" />
      <path d="M9 6V4M12 6V4M15 6V4M9 20v-2M12 20v-2M15 20v-2M6 9H4M6 12H4M6 15H4M20 9h-2M20 12h-2M20 15h-2" />
    </svg>
  ),
  board: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="8" cy="10" r="1.7" fill="currentColor" stroke="none" />
      <circle cx="15" cy="10" r="1.7" fill="currentColor" stroke="none" />
      <rect x="6.5" y="14" width="4" height="2.5" rx="0.5" />
      <path d="M13 14h4M13 16.5h3" />
    </svg>
  ),
  module: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="8" width="14" height="11" rx="2" />
      <path d="M8 8V5.5M12 8V5.5M16 8V5.5M9 13h6M9 16h4" />
      <circle cx="12" cy="3" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  ),
  application: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M3 8h18M12 18v3M7 21h10" />
      <circle cx="6" cy="6" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="8.5" cy="6" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 18a4 4 0 0 1-.5-7.97 5.5 5.5 0 0 1 10.6-1.02A4 4 0 0 1 17 18H7Z" />
      <path d="M12 14.5 13.5 13l1.5 1.5M9 16.5 10 14" />
    </svg>
  ),
  ide: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 8h18M7 12l2.5 2.5L7 17M13 17h4" />
    </svg>
  ),
  open: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="5" r="2.5" />
      <circle cx="6" cy="19" r="2.5" />
      <circle cx="18" cy="9" r="2.5" />
      <path d="M6 7.5v9M6 12a6 6 0 0 0 6-6h3.5" />
    </svg>
  ),
  cloudAi: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 16a4 4 0 0 1-.5-7.97 5.5 5.5 0 0 1 10.6-1.02A4 4 0 0 1 17 16H7Z" />
      <path d="M12 9v6M9 12h6M10.5 10.5l3 3M13.5 10.5l-3 3" />
    </svg>
  ),
  production: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21V9l6 4V9l6 4V9l6 4v8H3Z" />
      <path d="M7 21v-3M12 21v-3M17 21v-3" />
    </svg>
  ),
  ecosystem: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="2.2" />
      <circle cx="18" cy="6" r="2.2" />
      <circle cx="12" cy="18" r="2.4" fill="currentColor" stroke="none" />
      <path d="M7.7 7.6 10.4 16M16.3 7.6 13.6 16M8.2 6h7.6" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.3-5.26-1.28-5.26-5.7 0-1.26.45-2.3 1.2-3.1-.12-.3-.52-1.48.1-3.08 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.5 3.17-1.18 3.17-1.18.63 1.6.23 2.78.11 3.08.75.8 1.2 1.84 1.2 3.1 0 4.43-2.7 5.4-5.28 5.69.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  ),
  discord: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.32 4.57A19.8 19.8 0 0 0 15.4 3l-.26.52a18.3 18.3 0 0 1 4.4 1.4 18.5 18.5 0 0 0-6.7-2.1 18.6 18.6 0 0 0-6.7 2.1 18.3 18.3 0 0 1 4.4-1.4L9.3 3a19.8 19.8 0 0 0-4.93 1.57C1.2 9.9.5 15.1.8 20.24A19.9 19.9 0 0 0 6.9 23l.6-1a13 13 0 0 1-2-.95l.3-.22a14.2 14.2 0 0 0 12.4 0l.3.22a13 13 0 0 1-2 .95l.6 1a19.9 19.9 0 0 0 6.1-2.76c.36-5.95-.62-11.1-3.18-15.67ZM8.6 16.6c-1 0-1.83-.92-1.83-2.05 0-1.13.81-2.05 1.83-2.05 1.02 0 1.84.92 1.83 2.05 0 1.13-.81 2.05-1.83 2.05Zm6.8 0c-1 0-1.83-.92-1.83-2.05 0-1.13.81-2.05 1.83-2.05 1.02 0 1.84.92 1.83 2.05 0 1.13-.81 2.05-1.83 2.05Z" />
    </svg>
  ),
  boardLink: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="6" width="16" height="12" rx="1.5" />
      <circle cx="9" cy="11" r="1.3" />
      <path d="M9 15h6M14 11h2" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
}

// Per-track accent color. The ramp is the committed violet→cyan axis; reading
// top-to-bottom it flows violet (silicon, the physical ground) toward cyan
// (ecosystem, the community surface), so the set reads as one gradient.
const LAYER_COLORS = ['#a78bfa', '#818cf8', '#60a5fa', '#38bdf8', '#22d3ee']

// Generated track icons (Seedream, 160px PNG) — one per track, a white symbol
// on the track's own gradient. Carries the per-track accent so the violet→cyan
// ramp still reads across the set.
const TRACK_ICONS = {
  silicon: 'https://images.tuyacn.com/fe-static/docs/img/67f949f2-b6d0-4684-a2f3-7e31271f4224.png',
  board: 'https://images.tuyacn.com/fe-static/docs/img/af6b8ef7-cad5-4c12-bff3-02e5de1aa0f4.png',
  module: 'https://images.tuyacn.com/fe-static/docs/img/cb5884ff-4d09-45e5-9007-b77f3a9b7d27.png',
  application: 'https://images.tuyacn.com/fe-static/docs/img/71fb4268-bcfd-4e3c-9c9e-9ba239a21ae4.png',
  ecosystem: 'https://images.tuyacn.com/fe-static/docs/img/e4386f8b-faac-4b00-8cb8-fb79f1c169e5.png',
}

// TuyaOpen IDE screenshot for the "IDE exposure" bento feature cell (Tuya CDN).
const IDE_IMG = 'https://images.tuyacn.com/fe-static/docs/img/b7191eb0-0d2a-4609-af52-b8d0bbfc215e.png'

const COPY = {
  en: {
    meta: {
      title: 'Partners & Contributors',
      description:
        'Build TuyaOpen with us. Chip vendors, board builders, module makers, and developers — choose how you contribute. IDE exposure, open source, cloud + AI, and a path to production.',
    },
    hero: {
      label: 'Partners & Contributors',
      titlePre: 'Build TuyaOpen ',
      titleAccent: 'with us.',
      sub: 'TuyaOpen is the open-source stack from silicon to cloud. We’re inviting chip vendors, board builders, module makers, and developers to build it alongside us. Bring your silicon, your kit, your module, or your code.',
      visualAlt:
        'Abstract illustration of partnership in the open TuyaOpen ecosystem: five elements — silicon, board, module, application, and community — converging toward a glowing core, violet to cyan.',
    },
    stack: {
      title: 'What you can do',
      sub: 'Five ways to build TuyaOpen with us. Bring your silicon, your board, your module, your code — or your audience. Each track opens onto the same platform, cloud, and path to production.',
      contribKicker: 'You contribute',
      valueKicker: 'You get back',
      tracks: [
        { icon: 'silicon', role: 'Chip manufacturers', contribute: 'Port the TuyaOpen SDK to your silicon.', value: 'Reach 1.97M+ developers and ship inside every device class.' },
        { icon: 'board', role: 'Dev-board vendors', contribute: 'Contribute the BSP and docs for your kit.', value: 'Your board ships inside the TuyaOpen IDE and the dev-boards catalog.' },
        { icon: 'module', role: 'Module manufacturers', contribute: 'Ship a TuyaOpen-ready module.', value: 'Fast access to developers and a clear path from prototype to commercial product.' },
        { icon: 'application', role: 'Developers', contribute: 'Build with the latest AIoT capabilities.', value: 'The full open-source stack, a real community, and room to build-share-learn.' },
        { icon: 'ecosystem', role: 'Ecosystem partners', contribute: 'Host hackathons, offline events, demos, and tutorials.', value: 'Grow your reach and help the open ecosystem thrive.' },
      ],
    },
    bento: {
      title: 'What TuyaOpen gives you',
      sub: 'Every track opens onto the same ecosystem — the IDE, the open source, the cloud, and the path to production.',
      cells: [
        {
          icon: 'ide',
          title: 'TuyaOpen IDE exposure',
          body: 'Your board, SDK, and tools appear where developers already work — inside the TuyaOpen IDE. No separate funnel; the stack is the funnel.',
        },
        {
          icon: 'open',
          title: 'Apache-2.0, in the open',
          body: 'Public roadmap, open issues, code you can fork today. Contributions steer where TuyaOpen goes next.',
        },
        {
          icon: 'cloudAi',
          title: 'Cloud + AI agents',
          body: 'Tuya cloud, multimodal AI, and agent engines — the capabilities that make hardware agentic.',
        },
        {
          icon: 'production',
          title: 'Prototype → production',
          body: 'From a dev kit to a pilot to mass production, on Tuya’s supply chain across 200+ countries and regions.',
        },
      ],
    },
    reach: {
      title: 'Let’s co-build the open ecosystem.',
      body: 'Tell us about your chip, board, or module — we bring the platform, the cloud, and the developers. You focus on the hardware; we’ll connect it to the people who build with it.',
      emailCta: 'Talk to Luoben directly',
      emailAddr: 'luoben.wang@tuya.com',
      secondary: [
        { icon: 'github', label: 'Port silicon on GitHub', href: 'https://github.com/tuya/TuyaOpen' },
        { icon: 'discord', label: 'Join the community', href: 'https://discord.com/invite/yPPShSTttG' },
        { icon: 'boardLink', label: 'List your board', to: '/dev-boards' },
      ],
    },
  },
  zh: {
    meta: {
      title: '合作伙伴与贡献者',
      description:
        '和 TuyaOpen 一起共建。芯片原厂、开发板厂商、模组厂商与开发者——选择您的方式参与。IDE 曝光、开源生态、云 + AI，以及量产路径。',
    },
    hero: {
      label: '合作伙伴与贡献者',
      titlePre: '邀请您，和我们一起',
      titleAccent: '共建 TuyaOpen',
      sub: 'TuyaOpen 是从芯片到云端的开源技术栈。我们诚邀芯片原厂、开发板厂商、模组厂商与开发者，和我们一起共建。带上您的芯片、开发板、模组或代码。',
      visualAlt: 'TuyaOpen 开放生态中合作伙伴关系的抽象插画：芯片、开发板、模组、应用与社区五种元素向中心光核汇聚，由紫渐蓝。',
    },
    stack: {
      title: '您可以做什么',
      sub: '五种方式，和我们一起共建 TuyaOpen。带上您的芯片、开发板、模组、代码——或您的影响力。每一条路径，都通向同一个平台、云端与量产路径。',
      contribKicker: '您贡献',
      valueKicker: '您获得',
      tracks: [
        { icon: 'silicon', role: '芯片原厂', contribute: '将 TuyaOpen SDK 移植到您的芯片。', value: '触达 197 万+ 开发者，进入每一类设备。' },
        { icon: 'board', role: '开发板厂商', contribute: '为您的开发板贡献 BSP 与文档。', value: '您的板卡进入 TuyaOpen IDE 与开发板目录。' },
        { icon: 'module', role: '模组厂商', contribute: '交付 TuyaOpen 就绪模组。', value: '快速触达开发者，从原型到量产的清晰路径。' },
        { icon: 'application', role: '开发者', contribute: '用最新的 AIoT 能力构建应用。', value: '完整开源技术栈、真实社区，build-share-learn。' },
        { icon: 'ecosystem', role: '生态伙伴', contribute: '举办黑客松、线下活动、Demo 与教程。', value: '扩大影响力，与开放生态共同繁荣。' },
      ],
    },
    bento: {
      title: 'TuyaOpen 给您什么',
      sub: '每一条路径，都通向同一个生态——IDE、开源、云端，以及量产路径。',
      cells: [
        {
          icon: 'ide',
          title: 'TuyaOpen IDE 曝光',
          body: '你的板卡、SDK 与工具，出现在开发者已经在用的 TuyaOpen IDE 里。无需另建漏斗——技术栈本身就是漏斗。',
        },
        {
          icon: 'open',
          title: 'Apache-2.0，全程开放',
          body: '公开路线图、开放 Issue、今天就能 Fork 的代码。你的贡献，决定 TuyaOpen 的下一步。',
        },
        {
          icon: 'cloudAi',
          title: '云 + AI 智能体',
          body: '涂鸦云、多模态 AI 与智能体引擎——让硬件具备智能体能力。',
        },
        {
          icon: 'production',
          title: '原型 → 量产',
          body: '从开发板到试点，再到量产，背靠涂鸦覆盖 200+ 国家与地区的供应链。',
        },
      ],
    },
    reach: {
      title: '开放生态，邀您共建。',
      body: '告诉我们您的芯片、开发板或模组——平台、云端与开发者生态，交给我们。您专注硬件，我们一起把它送到开发者手中。',
      emailCta: '直接联系 Luoben',
      emailAddr: 'luoben.wang@tuya.com',
      secondary: [
        { icon: 'github', label: '在 GitHub 移植芯片', href: 'https://github.com/tuya/TuyaOpen' },
        { icon: 'discord', label: '加入社区', href: 'https://discord.com/invite/yPPShSTttG' },
        { icon: 'boardLink', label: '上架您的开发板', to: '/dev-boards' },
      ],
    },
  },
}

function useScrollReveal(rootRef) {
  useEffect(() => {
    const root = rootRef.current
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
  }, [rootRef])
}

export default function PartnersPage() {
  const { i18n } = useDocusaurusContext()
  const locale = i18n.currentLocale === 'zh' ? 'zh' : 'en'
  const c = COPY[locale]
  // Internal Link `to` is not auto-localized by Docusaurus — prefix /zh manually
  // for the Chinese page so the "List a board" CTA stays in-locale. See
  // pricing-guide.jsx for the established pattern.
  const base = locale === 'zh' ? '/zh' : ''
  const pageRef = useRef(null)
  useScrollReveal(pageRef)

  return (
    <Layout title={c.meta.title} description={c.meta.description}>
      <Head>
        <meta name="keywords" content="tuyaopen partners, b2b iot partnership, aiot platform partnership, open source iot ecosystem, hardware partnership" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div ref={pageRef} className={styles.page}>
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className={styles.hero}>
          <div className={styles.heroAurora} aria-hidden>
            <BrowserOnly>
              {() => {
                const Aurora = require('@site/src/components/Aurora/Aurora').default
                return <Aurora colorStops={HERO_AURORA} blend={0.34} amplitude={1.3} speed={0.85} />
              }}
            </BrowserOnly>
          </div>
          <div className={styles.heroVeil} aria-hidden />
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <p className={styles.heroLabel}>{c.hero.label}</p>
              <h1 className={styles.heroTitle}>
                <BlurText
                  as="span"
                  text={c.hero.titlePre}
                  animateBy="words"
                  direction="bottom"
                  delay={120}
                  stepDuration={0.5}
                  threshold={0.2}
                />
                <BlurText
                  as="span"
                  text={c.hero.titleAccent}
                  animateBy="words"
                  direction="bottom"
                  delay={120}
                  stepDuration={0.5}
                  threshold={0.2}
                  segmentClassName={styles.heroTitleAccent}
                />
              </h1>
              <p className={styles.heroSub}>{c.hero.sub}</p>
            </div>
          </div>
          <div className={styles.heroScrollCue} aria-hidden>
            <span />
            {locale === 'zh' ? '向下滚动' : 'Scroll'}
          </div>
        </section>

        {/* ── What you can do ──────────────────────────────────────────── */}
        <section className={clsx(styles.section, styles.stackSection)}>
          <div className={styles.sectionInner}>
            <div className={clsx(styles.stackHead, styles.reveal)}>
              <h2 className={styles.sectionTitle}>{c.stack.title}</h2>
              <p className={styles.sectionSub}>{c.stack.sub}</p>
            </div>
            <ol className={styles.stackList}>
              {c.stack.tracks.map((l, i) => (
                <li
                  key={i}
                  className={clsx(styles.slab, styles.reveal)}
                  style={{ '--layer-color': LAYER_COLORS[i], '--i': i }}
                >
                  <div className={styles.slabIcon} aria-hidden>
                    <img
                      className={styles.slabIconImg}
                      src={TRACK_ICONS[l.icon]}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className={styles.slabMain}>
                    <span className={styles.slabLayer}>{l.role}</span>
                  </div>
                  <div className={styles.slabCell}>
                    <span className={styles.slabKicker}>{c.stack.contribKicker}</span>
                    <p className={styles.slabText}>{l.contribute}</p>
                  </div>
                  <div className={styles.slabCell}>
                    <span className={styles.slabKicker}>{c.stack.valueKicker}</span>
                    <p className={styles.slabText}>{l.value}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── What you bring back (bento) ──────────────────────────────── */}
        <section className={clsx(styles.section, styles.reveal)}>
          <div className={styles.sectionInner}>
            <h2 className={styles.sectionTitle}>{c.bento.title}</h2>
            <p className={styles.sectionSub}>{c.bento.sub}</p>
            <div className={styles.bento}>
              <div className={clsx(styles.bentoCell, styles.bentoLarge)}>
                <img
                  className={styles.bentoLargeImg}
                  src={IDE_IMG}
                  alt={c.bento.cells[0].title}
                  loading="lazy"
                  decoding="async"
                />
                <h3 className={styles.bentoTitle}>{c.bento.cells[0].title}</h3>
                <p className={styles.bentoBody}>{c.bento.cells[0].body}</p>
              </div>
              {c.bento.cells.slice(1, 3).map((cell, i) => (
                <div key={i} className={styles.bentoCell}>
                  <span className={styles.bentoIcon} aria-hidden>
                    {ICONS[cell.icon]}
                  </span>
                  <h3 className={styles.bentoTitle}>{cell.title}</h3>
                  <p className={styles.bentoBody}>{cell.body}</p>
                </div>
              ))}
              <div className={clsx(styles.bentoCell, styles.bentoWide)}>
                <span className={styles.bentoIcon} aria-hidden>
                  {ICONS[c.bento.cells[3].icon]}
                </span>
                <h3 className={styles.bentoTitle}>{c.bento.cells[3].title}</h3>
                <p className={styles.bentoBody}>{c.bento.cells[3].body}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Collaborate with global partners ─────────────────────────── */}
        <PartnersShowcase {...homepageCopy[locale].partners} />

        {/* ── Reach out ────────────────────────────────────────────────── */}
        <section className={styles.reach}>
          <div className={styles.reachAurora} aria-hidden>
            <BrowserOnly>
              {() => {
                const Aurora = require('@site/src/components/Aurora/Aurora').default
                return <Aurora colorStops={REACH_AURORA} blend={0.42} amplitude={1.15} speed={0.6} />
              }}
            </BrowserOnly>
          </div>
          <div className={styles.reachVeil} aria-hidden />
          <div className={styles.reachInner}>
            <h2 className={styles.reachTitle}>{c.reach.title}</h2>
            <p className={styles.reachBody}>{c.reach.body}</p>
            <a className={styles.reachEmail} href="mailto:luoben.wang@tuya.com">
              <span className={styles.reachEmailIcon} aria-hidden>
                {ICONS.mail}
              </span>
              <span className={styles.reachEmailText}>
                <span className={styles.reachEmailCta}>{c.reach.emailCta}</span>
                <span className={styles.reachEmailAddr}>{c.reach.emailAddr}</span>
              </span>
              <span className={styles.reachEmailArrow} aria-hidden>
                {ICONS.arrow}
              </span>
            </a>
            <div className={styles.reachSecondary}>
              {c.reach.secondary.map((s, i) => (
                <Link
                  key={i}
                  className={styles.reachSecondaryLink}
                  {...(s.to ? { to: base + s.to } : { href: s.href })}
                  {...(s.href
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  <span className={styles.reachSecondaryIcon} aria-hidden>
                    {ICONS[s.icon]}
                  </span>
                  <span>{s.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
