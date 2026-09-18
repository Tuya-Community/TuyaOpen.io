import BrowserOnly from '@docusaurus/BrowserOnly'
import Head from '@docusaurus/Head'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import clsx from 'clsx'
import React, { useEffect, useRef } from 'react'

import TypedQuote from '@site/src/components/TypedQuote/TypedQuote'

import styles from './about-us.module.css'

const AURORA_COLORS = ['#7c3aed', '#22d3ee', '#5227FF']

const ICONS = {
  connect: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5" cy="12" r="2.5" />
      <circle cx="19" cy="5" r="2.5" />
      <circle cx="19" cy="19" r="2.5" />
      <path d="M7.2 11 16.8 6.2M7.2 13l9.6 4.8" />
    </svg>
  ),
  open: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 7.5-2" />
    </svg>
  ),
  community: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <path d="M16 5.5a3 3 0 0 1 0 5M17 14.5a6 6 0 0 1 4 5.5" />
    </svg>
  ),
  ship: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 4.5 12h6L9 22l9.5-12h-6L13 2Z" />
    </svg>
  ),
}

const GITHUB_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.3-5.26-1.28-5.26-5.7 0-1.26.45-2.3 1.2-3.1-.12-.3-.52-1.48.1-3.08 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.5 3.17-1.18 3.17-1.18.63 1.6.23 2.78.11 3.08.75.8 1.2 1.84 1.2 3.1 0 4.43-2.7 5.4-5.28 5.69.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
  </svg>
)

const COPY = {
  en: {
    meta: {
      title: 'Our Mission',
      description: 'Make agentic hardware simple — bringing agent connectivity and open protocols to the full spectrum of hardware.',
    },
    label: 'Our Mission',
    hero: {
      titlePre: 'Make agentic hardware ',
      titleAccent: 'simple.',
      sub: 'The simplest — and the industry’s most powerful — multimodal Agent capabilities for developers, building a complete hardware-interaction ecosystem.',
      tagline: 'Agent First Design',
    },
    quote: {
      mark: '“',
      pre: 'The next generation of hardware won’t just run apps. It will ',
      em: 'understand intent and act on it.',
      post: ' Our job is to make that capability the default — for every device.',
      attr: '— The TuyaOpen team',
    },
    story: {
      kicker: 'Why we exist',
      title: 'Hardware is shifting from app-first to agent-first',
      body: [
        'For a decade, smart devices meant an app with fixed buttons, and the intelligence lived in menus the user had to learn. That era is ending.',
        'The next wave routes human intent through an AI agent that reaches the device’s real capabilities — but building that today is **hard**: fragmented chips, closed protocols, and months of plumbing before the first conversation.',
        'We believe agentic capability should be a **default, not a privilege**. TuyaOpen exists to collapse that gap — so a maker, a startup, and an enterprise can all ship intelligent hardware on the same open foundation.',
      ],
    },
    pillars: {
      kicker: 'What we stand for',
      title: 'The principles behind everything we build',
      items: [
        { icon: 'connect', title: 'Agent connectivity for every device', body: 'Bring AI agent connectivity and protocol capabilities to the full hardware spectrum — from low-power Wi-Fi & BLE MCUs to Linux-class boards.' },
        { icon: 'open', title: 'Open by default', body: 'Open source, open protocols, no lock-in. Proven on billions of devices, free for you to inspect, fork, and ship.' },
        { icon: 'community', title: 'Community-driven', body: 'Built in the open with developers worldwide. Roadmaps, issues, and code evolve together with the people who use them.' },
        { icon: 'ship', title: 'Simple to production', body: 'Prototype in hours, mass-produce in days. The hard parts — security, OTA, cloud, certification — come integrated.' },
      ],
    },
    github: 'Star us on GitHub',
  },
  zh: {
    meta: {
      title: '我们的使命',
      description: '让智能体 AI 硬件变得简单——把智能体连接能力与开放协议带给全谱系的硬件。',
    },
    hero: {
      titlePre: '让智能体 AI 硬件，变得',
      titleAccent: '简单。',
      sub: '为开发者提供最简单、也是行业最强大的多模态 Agent 能力，构建完整的硬件交互生态。',
      tagline: 'Agent First Design',
    },
    label: '我们的使命',
    quote: {
      mark: '“',
      pre: '下一代硬件不只是运行 App，它将能够',
      em: '理解意图，并付诸行动。',
      post: ' 而我们的使命，是让这种能力成为每个硬件的默认选项。',
      attr: '—— TuyaOpen 团队',
    },
    story: {
      kicker: '我们为何存在',
      title: '硬件正从「App 优先」走向「智能体优先」',
      body: [
        '过去十年，智能设备意味着一个带着固定按钮的 App，智能藏在用户必须学习的菜单里。这个时代正在落幕。',
        '新一代产品把人的意图经由 AI 智能体路由到设备真正的能力上——但今天要做到这一点依然**很难**：芯片碎片化、协议封闭，在第一次对话之前往往要先填上数月的工程。',
        '我们相信，智能体能力应当是**默认，而非特权**。TuyaOpen 的存在，就是为了抹平这道鸿沟——让创客、初创团队与企业，都能在同一个开放底座上交付智能硬件。',
      ],
    },
    pillars: {
      kicker: '我们坚持的原则',
      title: '支撑我们所做一切的信念',
      items: [
        { icon: 'connect', title: '让每台设备都拥有智能体连接', body: '把 AI 智能体连接与协议能力带给全谱系硬件——从低功耗 Wi-Fi 与 BLE MCU，到 Linux 级别的开发板。' },
        { icon: 'open', title: '开放是默认选项', body: '开源、开放协议、不锁定。代码经数十亿设备验证，供你自由审阅、Fork 与量产。' },
        { icon: 'community', title: '由社区驱动', body: '与全球开发者一同在开放中构建。路线图、Issue 与代码，与使用它们的人共同演进。' },
        { icon: 'ship', title: '一路简单直达量产', body: '数小时出原型，数天可量产。安全、OTA、云端、认证这些难点，都已为你集成。' },
      ],
    },
    github: '在 GitHub 点亮 Star',
  },
  ko: {
    meta: {
      title: '우리의 미션',
      description: '에이전트 하드웨어를 쉽게 만듭니다. 모든 하드웨어에 에이전트 연결과 개방형 프로토콜을 제공합니다.',
    },
    label: '우리의 미션',
    hero: {
      titlePre: '에이전트 하드웨어를 ',
      titleAccent: '간단하게.',
      sub: '개발자를 위한 가장 간단하고 강력한 멀티모달 Agent 역량으로 완전한 하드웨어 상호작용 생태계를 만듭니다.',
      tagline: 'Agent First Design',
    },
    quote: {
      mark: '“',
      pre: '다음 세대 하드웨어는 앱만 실행하지 않습니다. ',
      em: '의도를 이해하고 행동합니다.',
      post: ' 우리의 일은 이 역량을 모든 디바이스의 기본값으로 만드는 것입니다.',
      attr: '— TuyaOpen 팀',
    },
    story: {
      kicker: '우리가 존재하는 이유',
      title: '하드웨어는 앱 우선에서 에이전트 우선으로 이동하고 있습니다',
      body: [
        '지난 10년 동안 스마트 디바이스는 고정된 버튼을 가진 앱을 의미했고, 지능은 사용자가 배워야 하는 메뉴 안에 있었습니다. 그 시대가 끝나고 있습니다.',
        '다음 세대는 사람의 의도를 AI 에이전트를 통해 디바이스의 실제 기능으로 전달합니다. 하지만 오늘날 이를 구현하는 일은 여전히 **어렵습니다**. 칩은 파편화되어 있고 프로토콜은 닫혀 있으며, 첫 대화 전에 수개월의 연결 작업이 필요합니다.',
        '우리는 에이전트 역량이 **특권이 아니라 기본값**이어야 한다고 믿습니다. TuyaOpen은 이 간극을 줄여 메이커, 스타트업, 기업이 같은 개방형 기반에서 지능형 하드웨어를 출시하도록 돕습니다.',
      ],
    },
    pillars: {
      kicker: '우리가 지키는 원칙',
      title: '우리가 만드는 모든 것의 기반',
      items: [
        { icon: 'connect', title: '모든 디바이스에 에이전트 연결', body: '저전력 Wi-Fi 및 BLE MCU부터 Linux급 보드까지 전체 하드웨어에 AI 에이전트 연결과 프로토콜 역량을 제공합니다.' },
        { icon: 'open', title: '기본값은 개방성', body: '오픈 소스, 개방형 프로토콜, 종속 없음. 수십억 대 디바이스에서 검증된 코드를 자유롭게 검토하고 포크하고 출시할 수 있습니다.' },
        { icon: 'community', title: '커뮤니티 중심', body: '전 세계 개발자와 함께 공개적으로 만듭니다. 로드맵, 이슈, 코드가 실제 사용자의 필요에 맞춰 함께 발전합니다.' },
        { icon: 'ship', title: '프로덕션까지 간단하게', body: '몇 시간 안에 프로토타입을 만들고 며칠 안에 양산으로 이동하세요. 보안, OTA, 클라우드, 인증 같은 어려운 부분이 통합되어 있습니다.' },
      ],
    },
    github: 'GitHub에서 Star하기',
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

export default function MissionPage() {
  const { i18n } = useDocusaurusContext()
  const locale = i18n.currentLocale === 'zh' || i18n.currentLocale === 'ko' ? i18n.currentLocale : 'en'
  const c = COPY[locale]
  const pageRef = useRef(null)
  useScrollReveal(pageRef)

  return (
    <Layout title={c.meta.title} description={c.meta.description}>
      <Head>
        <meta name="keywords" content="tuyaopen mission, open source iot platform, aiot innovation, open source ai, smart device development" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <div ref={pageRef} className={styles.page}>
        <div className={styles.split}>
          {/* Fixed left panel — animated by Aurora */}
          <aside className={styles.leftPanel}>
            <div className={styles.auroraLayer} aria-hidden>
              <BrowserOnly>
                {() => {
                  const Aurora = require('@site/src/components/Aurora/Aurora').default
                  return <Aurora colorStops={AURORA_COLORS} blend={0.3} amplitude={1.1} speed={0.8} />
                }}
              </BrowserOnly>
            </div>
            <div className={styles.auroraVeil} aria-hidden />
            <div className={styles.leftInner}>
              <h1 className={styles.leftTitle}>
                {c.hero.titlePre}
                <span className={styles.accent}>{c.hero.titleAccent}</span>
              </h1>
              <p className={styles.leftSub}>{c.hero.sub}</p>
              <p className={styles.tagline}>{c.hero.tagline}</p>
            </div>
            <div className={styles.scrollCue} aria-hidden>
              <span />
              {locale === 'zh' ? '向下滚动' : locale === 'ko' ? '아래로 스크롤' : 'Scroll'}
            </div>
          </aside>

          {/* Scrollable right column */}
          <div className={styles.rightScroll}>
            <div className={styles.rightInner}>
              <p className={styles.pageLabel}>{c.label}</p>
              {/* Pull quote */}
              <section className={clsx(styles.block, styles.reveal)}>
                <div className={styles.quoteMark} aria-hidden>
                  {c.quote.mark}
                </div>
                <p className={styles.quoteText} aria-label={`${c.quote.pre}${c.quote.em}${c.quote.post}`}>
                  <TypedQuote pre={c.quote.pre} em={c.quote.em} post={c.quote.post} />
                </p>
                <p className={styles.quoteAttr}>{c.quote.attr}</p>
              </section>

              {/* Story */}
              <section className={clsx(styles.block, styles.blockDivider, styles.reveal)}>
                <span className={styles.kicker}>{c.story.kicker}</span>
                <h2 className={styles.sectionTitle}>{c.story.title}</h2>
                <div className={styles.prose}>
                  {c.story.body.map((p, i) => (
                    <p key={i} dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
                  ))}
                </div>
              </section>

              {/* Pillars */}
              <section className={clsx(styles.block, styles.blockDivider, styles.reveal)}>
                <span className={styles.kicker}>{c.pillars.kicker}</span>
                <h2 className={styles.sectionTitle}>{c.pillars.title}</h2>
                <div className={styles.cardGrid}>
                  {c.pillars.items.map((item, i) => (
                    <div key={i} className={styles.card}>
                      <span className={styles.cardIcon}>{ICONS[item.icon]}</span>
                      <h3 className={styles.cardTitle}>{item.title}</h3>
                      <p className={styles.cardBody}>{item.body}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* GitHub */}
              <section className={clsx(styles.block, styles.blockDivider, styles.reveal)}>
                <Link className={styles.githubLink} to="https://github.com/tuya/TuyaOpen">
                  {GITHUB_ICON}
                  {c.github}
                </Link>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
