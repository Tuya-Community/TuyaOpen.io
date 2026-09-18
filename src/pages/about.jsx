import BrowserOnly from '@docusaurus/BrowserOnly'
import Head from '@docusaurus/Head'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import clsx from 'clsx'
import React, { useEffect, useRef } from 'react'

import TypedQuote from '@site/src/components/TypedQuote/TypedQuote'

import styles from './about-us.module.css'

const AURORA_COLORS = ['#06b6d4', '#7c3aed', '#a5b4fc']

const ICONS = {
  heart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20s-7-4.4-7-9.5A3.5 3.5 0 0 1 12 7a3.5 3.5 0 0 1 7 3.5C19 15.6 12 20 12 20Z" />
    </svg>
  ),
  branch: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="5" r="2.5" />
      <circle cx="6" cy="19" r="2.5" />
      <circle cx="18" cy="9" r="2.5" />
      <path d="M6 7.5v9M6 12a6 6 0 0 0 6-6h3.5" />
    </svg>
  ),
  grid: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
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
      title: 'About Us',
      description: 'A team inside Tuya dedicated to the open-source community — bringing agent connectivity and protocol capabilities to the full spectrum of hardware.',
    },
    label: 'About Us',
    hero: {
      titlePre: 'A team inside Tuya, building agentic hardware ',
      titleAccent: 'in the open.',
      sub: 'We’re the people behind TuyaOpen — a community-driven, open-source foundation that brings agent connectivity and protocols to every kind of device.',
    },
    quote: {
      mark: '“',
      pre: 'We don’t build for the community from the outside. ',
      em: 'We build with it,',
      post: ' in the open, one pull request and one device at a time.',
      attr: '— The TuyaOpen team',
    },
    story: {
      kicker: 'Who we are',
      title: 'Open source is how we work, not a side project',
      body: [
        'TuyaOpen is built by a dedicated team **inside Tuya** whose whole focus is the open-source developer community. We sit close to the silicon, the cloud, and the AI stack — and we put all of it in the open.',
        'Our work is **community-driven**: the roadmap is public, the issues are yours to file, and the code is yours to read, fork, and ship — backed by Tuya’s scale across 200+ countries and regions.',
        'We have one technical north star: **bring agent connectivity and protocol capabilities to the full spectrum of hardware** — from the smallest Wi-Fi MCU to Linux-class boards.',
      ],
    },
    tuya: {
      kicker: 'The company behind us',
      title: 'Backed by Tuya',
      body: [
        '**Tuya Inc.** (NYSE: TUYA; HKEX: 2391) is a leading global AI cloud platform service provider. Through the TuyaOpen open-source framework and universal AI Agent engines, it integrates multimodal AI to lower the barrier to development and bring AI into the physical world — an open, neutral global AIoT ecosystem for brands, OEMs, integrators, and developers.',
      ],
    },
    stats: {
      items: [
        { num: '1.97M+', label: 'Registered AI developers' },
        { num: '200+', label: 'Countries & regions reached' },
        { num: '100%', label: 'Open source · Apache-2.0' },
      ],
      note: '* As of March 31, 2026',
    },
    values: {
      kicker: 'How we work',
      title: 'What community-driven means to us',
      items: [
        { icon: 'heart', title: 'Inside Tuya, for the community', body: 'A dedicated team with the full backing of Tuya’s connectivity, cloud, and AI — pointed entirely at open-source developers.' },
        { icon: 'branch', title: 'Built in the open', body: 'Public roadmaps, open issues, and code you can fork today. Contributions shape where TuyaOpen goes next.' },
        { icon: 'grid', title: 'Agent connectivity for all hardware', body: 'We meet your hardware where it is — bringing agent and protocol capabilities across the entire device spectrum.' },
      ],
    },
    github: 'Star us on GitHub',
  },
  zh: {
    meta: {
      title: '关于我们',
      description: '一支专注于开源社区的涂鸦团队——把智能体连接能力与协议带给全谱系的硬件。',
    },
    label: '关于我们',
    hero: {
      titlePre: '一支来自涂鸦的团队，和社区一起',
      titleAccent: '把智能体 AI 硬件开源。',
      sub: '我们就是 TuyaOpen 背后的人。和全球开发者一起，让每一类硬件都用上开放的智能体连接与协议能力。',
    },
    quote: {
      mark: '“',
      pre: '最好的智能体 AI 硬件，从来不是闭门造车。',
      em: '它在社区里共同生长——',
      post: '每一个 PR、每一台设备，都是你我共同向前的一步。',
      attr: '—— TuyaOpen 团队',
    },
    story: {
      kicker: '我们是谁',
      title: '开源是我们的工作方式，而非副业',
      body: [
        'TuyaOpen 由一支**就在涂鸦内部**、全身心投入开源开发者社区的团队打造。我们紧贴芯片、云端与 AI 技术栈——并把这一切都放到开放之中。',
        '我们的工作**由社区驱动**：路线图公开，Issue 由你提交，代码供你审阅、Fork 与量产——背靠涂鸦覆盖 200+ 个国家与地区的规模。',
        '我们有一个明确的技术北极星：**把智能体连接与协议能力带给全谱系硬件**——从最小的 Wi-Fi MCU 到 Linux 级别的开发板。',
      ],
    },
    tuya: {
      kicker: '我们背后的公司',
      title: '背靠涂鸦',
      body: [
        '**涂鸦智能**（纽交所：TUYA；港交所：2391）是全球领先的 AI 云平台服务提供商。通过 TuyaOpen 开源开发框架与通用 AI Agent 引擎，集成多模态 AI 能力，降低开发门槛，让 AI 走进物理世界——并提供开放中立的全球化 AIoT 生态，连接品牌、OEM、系统集成商与开发者。',
      ],
    },
    stats: {
      items: [
        { num: '197万+', label: '注册 AI 开发者' },
        { num: '200+', label: '覆盖国家与地区' },
        { num: '100%', label: '开源 · Apache-2.0' },
      ],
      note: '* 截至 2026 年 3 月 31 日',
    },
    values: {
      kicker: '我们如何工作',
      title: '「社区驱动」对我们意味着什么',
      items: [
        { icon: 'heart', title: '身处涂鸦，服务社区', body: '一支专注的团队，背靠涂鸦完整的连接、云端与 AI 能力——并将全部精力投向开源开发者。' },
        { icon: 'branch', title: '在开放中构建', body: '公开的路线图、开放的 Issue，以及今天就能 Fork 的代码。社区的贡献，决定 TuyaOpen 的下一步。' },
        { icon: 'grid', title: '为全部硬件带来智能体连接', body: '我们在你的硬件所在之处与它相遇——把智能体与协议能力带给整个设备谱系。' },
      ],
    },
    github: '在 GitHub 点亮 Star',
  },
  ko: {
    meta: {
      title: '회사 소개',
      description: '오픈 소스 커뮤니티에 집중하는 Tuya 팀입니다. 모든 하드웨어에 에이전트 연결과 프로토콜 역량을 제공합니다.',
    },
    label: '회사 소개',
    hero: {
      titlePre: 'Tuya에서 시작해 커뮤니티와 함께 만드는 ',
      titleAccent: '오픈 에이전트 하드웨어.',
      sub: '우리는 TuyaOpen을 만드는 사람들입니다. 커뮤니티 중심의 오픈 소스 기반으로 모든 디바이스에 에이전트 연결과 프로토콜 역량을 제공합니다.',
    },
    quote: {
      mark: '“',
      pre: '커뮤니티를 외부에서 위해 만드는 것이 아닙니다. ',
      em: '커뮤니티와 함께 만들고,',
      post: ' 하나의 PR과 하나의 디바이스를 통해 공개적으로 성장합니다.',
      attr: '— TuyaOpen 팀',
    },
    story: {
      kicker: '우리는 누구인가',
      title: '오픈 소스는 부가 프로젝트가 아니라 우리의 방식입니다',
      body: [
        'TuyaOpen은 오픈 소스 개발자 커뮤니티에 전념하는 **Tuya 내부 팀**이 만들고 있습니다. 우리는 칩, 클라우드, AI 기술 스택과 가까이 일하며 그 모든 것을 공개합니다.',
        '우리의 작업은 **커뮤니티 중심**입니다. 로드맵은 공개되고, 이슈는 누구나 제안할 수 있으며, 코드는 읽고 포크하고 제품에 적용할 수 있습니다. 여기에 200개 이상의 국가와 지역에서 검증된 Tuya의 규모가 더해집니다.',
        '우리의 기술적 목표는 분명합니다. 가장 작은 Wi-Fi MCU부터 Linux급 보드까지, 모든 하드웨어에 **에이전트 연결과 프로토콜 역량을 제공하는 것**입니다.',
      ],
    },
    tuya: {
      kicker: '우리의 기반이 되는 회사',
      title: 'Tuya의 지원',
      body: [
        '**Tuya Inc.**(NYSE: TUYA, HKEX: 2391)는 글로벌 AI 클라우드 플랫폼 서비스 제공업체입니다. TuyaOpen 오픈 소스 프레임워크와 범용 AI Agent 엔진을 통해 멀티모달 AI의 개발 장벽을 낮추고, 브랜드·OEM·통합업체·개발자를 연결하는 개방형 글로벌 AIoT 생태계를 만듭니다.',
      ],
    },
    stats: {
      items: [
        { num: '197만+', label: '등록 AI 개발자' },
        { num: '200+', label: '지원 국가 및 지역' },
        { num: '100%', label: '오픈 소스 · Apache-2.0' },
      ],
      note: '* 2026년 3월 31일 기준',
    },
    values: {
      kicker: '일하는 방식',
      title: '커뮤니티 중심이 우리에게 의미하는 것',
      items: [
        { icon: 'heart', title: 'Tuya 안에서 커뮤니티를 위해', body: 'Tuya의 연결성, 클라우드, AI 역량을 바탕으로 오픈 소스 개발자에게 집중하는 전담 팀입니다.' },
        { icon: 'branch', title: '공개적으로 만들기', body: '공개 로드맵, 열린 이슈, 오늘 바로 포크할 수 있는 코드. 커뮤니티의 기여가 TuyaOpen의 다음 방향을 만듭니다.' },
        { icon: 'grid', title: '모든 하드웨어에 에이전트 연결', body: '각자의 하드웨어 환경에서 시작해 전체 디바이스 스펙트럼에 에이전트와 프로토콜 역량을 제공합니다.' },
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

export default function AboutPage() {
  const { i18n } = useDocusaurusContext()
  const locale = i18n.currentLocale === 'zh' || i18n.currentLocale === 'ko' ? i18n.currentLocale : 'en'
  const c = COPY[locale]
  const pageRef = useRef(null)
  useScrollReveal(pageRef)

  return (
    <Layout title={c.meta.title} description={c.meta.description}>
      <Head>
        <meta name="keywords" content="open source iot platform, aiot platform, about tuyaopen, open source ai platform, tuyaopen" />
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
                  return <Aurora colorStops={AURORA_COLORS} blend={0.3} amplitude={1.1} speed={0.7} />
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

              {/* Backed by Tuya */}
              <section className={clsx(styles.block, styles.blockDivider, styles.reveal)}>
                <span className={styles.kicker}>{c.tuya.kicker}</span>
                <h2 className={styles.sectionTitle}>{c.tuya.title}</h2>
                <div className={styles.prose}>
                  {c.tuya.body.map((p, i) => (
                    <p key={i} dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
                  ))}
                </div>
              </section>

              {/* Stats */}
              <section className={clsx(styles.block, styles.blockDivider, styles.reveal)}>
                <div className={styles.stats}>
                  {c.stats.items.map((s, i) => (
                    <div key={i}>
                      <div className={styles.statNum}>{s.num}</div>
                      <div className={styles.statLabel}>{s.label}</div>
                    </div>
                  ))}
                </div>
                <p className={styles.statsNote}>{c.stats.note}</p>
              </section>

              {/* Values */}
              <section className={clsx(styles.block, styles.blockDivider, styles.reveal)}>
                <span className={styles.kicker}>{c.values.kicker}</span>
                <h2 className={styles.sectionTitle}>{c.values.title}</h2>
                <div className={styles.cardGrid}>
                  {c.values.items.map((item, i) => (
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
