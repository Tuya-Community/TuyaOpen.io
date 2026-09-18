import React from 'react'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import Head from '@docusaurus/Head'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { localePath } from '../utils/localePath'

import { areas, quickStartPointer, elsewhere } from '../data/docsPortal'
import styles from './documentation.module.css'

/* =========================================================================
 * DOCUMENTATION — the landing page behind the navbar "Docs" menu.
 *
 * The five sidebars in sidebars.js are the product areas; this page is the
 * map over them, so someone who doesn't yet know which area they need has
 * somewhere to land. Content lives in src/data/docsPortal.js.
 * ========================================================================= */

/* ---- Inline SVG icons (no emoji), Lucide-style, currentColor ----------- */
const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}
const ArrowIcon = ({ external }) => (
  <svg {...iconProps} width={15} height={15} className={styles.arrow}>
    {external ? <path d="M7 17 17 7M7 7h10v10" /> : <path d="M5 12h14M13 6l6 6-6 6" />}
  </svg>
)
const AREA_ICON = {
  sdk: <path d="m8 6-6 6 6 6M16 6l6 6-6 6" />,
  ide: (
    <>
      <rect x="2.5" y="4" width="19" height="14" rx="2" />
      <path d="M2.5 8h19M8 21h8M12 18v3" />
      <path d="m6.5 11.5 1.5 1.5-1.5 1.5M10.5 15h3" />
    </>
  ),
  hardware: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1" />
      <path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4" />
    </>
  ),
  cloud: (
    <>
      <path d="M17.5 19a4.5 4.5 0 0 0 .5-8.97A6 6 0 0 0 6.1 10.2 3.5 3.5 0 0 0 6.5 19z" />
      <path d="M12 13v4M10 15h4" />
    </>
  ),
  tclaw: (
    <>
      <rect x="4" y="8" width="16" height="12" rx="2" />
      <path d="M12 8V4M8 2h8" />
      <circle cx="9" cy="14" r="1" />
      <circle cx="15" cy="14" r="1" />
    </>
  ),
  tyutool: <path d="M14.7 6.3a4 4 0 0 1-5 5L4 17v3h3l5.7-5.7a4 4 0 0 0 5-5z" />,
}

/* Shown when an area's key has no icon — a renamed key (duckyclaw -> tclaw)
   otherwise renders an empty tinted square with no hint that anything broke. */
const AREA_ICON_FALLBACK = (
  <>
    <rect x="4" y="4" width="16" height="16" rx="3" />
    <path d="M9 9h6M9 13h6M9 17h3" />
  </>
)

/**
 * Bare ids are doc ids under /docs. An area flagged `external` (the IDE, whose
 * material lives on /learn and the product page) stores whole paths instead —
 * they start with "/" and are used as written.
 */
const hrefFor = (id, locale = 'en') => {
  if (id.startsWith('/')) return localePath(locale, id)
  // Index docs: a file named after its own folder (faqs/faqs.md,
  // ai-components/ai-components.md) keeps that doubled id in sidebars.js but
  // is served without the repeat — /docs/faqs, not /docs/faqs/faqs. Collapse
  // it here so ids can stay copy-pasteable from the sidebar config.
  const parts = id.split('/')
  if (parts.length > 1 && parts[parts.length - 1] === parts[parts.length - 2]) parts.pop()
  return localePath(locale, `/docs/${parts.join('/')}`)
}

const KO_LABELS = {
  'Getting started': '시작하기',
  'Two quick-start tracks': '두 가지 빠른 시작 트랙',
  'The Learn hub carries two complete tracks, each running from environment setup through to a paired device: the graphical TuyaOpen IDE workflow, or the SDK with tos.py on the command line.': '학습 센터에는 환경 설정부터 디바이스 페어링까지 이어지는 두 가지 경로가 있습니다. 그래픽 TuyaOpen IDE 워크플로 또는 명령줄에서 tos.py를 사용하는 SDK 워크플로를 선택하세요.',
  'Go to the Learn hub': '학습 센터로 이동',
  'TuyaOpen SDK': 'TuyaOpen SDK',
  'Cross-platform C/C++ SDK': '크로스 플랫폼 C/C++ SDK',
  'C SDK, platform APIs and the build system. Start here if you are writing device firmware.': 'C SDK, 플랫폼 API, 빌드 시스템을 제공합니다. 디바이스 펌웨어를 작성한다면 여기서 시작하세요.',
  'Understand the SDK': 'SDK 이해하기',
  'About TuyaOpen': 'TuyaOpen 소개',
  'Project walkthrough': '프로젝트 구조 살펴보기',
  Terminology: '용어',
  'Releases & maintenance': '릴리스 및 유지보수',
  'Embedded programming': '임베디드 프로그래밍',
  Networking: '네트워킹',
  Graphics: '그래픽',
  Audio: '오디오',
  Peripherals: '주변 장치',
  'Hardware interfaces': '하드웨어 인터페이스',
  'System programming': '시스템 프로그래밍',
  'Memory & storage': '메모리 및 스토리지',
  Examples: '예제',
  'Build & tools': '빌드 및 도구',
  'tos.py guide': 'tos.py 가이드',
  'tos.py reference': 'tos.py 레퍼런스',
  'Compilation guide': '컴파일 가이드',
  'CMake, Kconfig & components': 'CMake, Kconfig 및 컴포넌트',
  'Help & contributing': '도움말 및 기여',
  FAQs: '자주 묻는 질문',
  'Get a developer license': '개발자 라이선스 받기',
  'Contribute guide': '기여 가이드',
  'Coding style': '코딩 스타일',
  'Firmware, cloud and app in one': '펌웨어, 클라우드, 앱을 한곳에서',
  'Board catalogue, one-click build and flash, and an AI agent that writes alongside you.': '개발보드 카탈로그, 원클릭 빌드와 플래시, 함께 코드를 작성하는 AI Agent를 제공합니다.',
  'Get going': '시작하기',
  'What the IDE offers': 'IDE 기능 둘러보기',
  'What TuyaOpen IDE is': 'TuyaOpen IDE란?',
  'Install the IDE': 'TuyaOpen IDE 설치',
  'IDE log feedback': 'IDE 로그 피드백',
  'Practice series': '실습 시리즈',
  'Practice 1: Hello World': '실습 1: Hello World',
  'Practice 2: your_chat_bot': '실습 2: your_chat_bot',
  'Practice 3: mini app panel': '실습 3: 미니 앱 패널',
  'Practice 4: Hello World on Linux': '실습 4: Linux에서 Hello World',
  'Build with the agent': 'Agent로 개발하기',
  'Vibe Coding skills': 'Vibe Coding 스킬',
  'Agent development guide': 'Agent 개발 가이드',
  Hardware: '하드웨어',
  'T2, T3, T5AI, ESP32, Raspberry Pi': 'T2, T3, T5AI, ESP32, Raspberry Pi',
  'Supported silicon, pin maps and everything needed to bring a new board up on TuyaOpen.': '지원 칩, 핀맵, 새 보드를 TuyaOpen에서 구동하는 데 필요한 모든 정보를 제공합니다.',
  'Boards & chips': '보드 및 칩',
  'Dev board catalogue': '개발보드 카탈로그',
  'Tuya T5': 'Tuya T5',
  'Tuya T2': 'Tuya T2',
  'Tuya T3': 'Tuya T3',
  'Espressif ESP32': 'Espressif ESP32',
  'ESP32 supported features': 'ESP32 지원 기능',
  'Arduino IDE': 'Arduino IDE',
  Introduction: '소개',
  'Quick start': '빠른 시작',
  'AI API development': 'AI API 개발',
  'Arduino library': 'Arduino 라이브러리',
  'Bring up new hardware': '새 하드웨어 포팅',
  'Bring your chip to TuyaOpen': '칩을 TuyaOpen에 포팅하기',
  'New platform': '새 플랫폼',
  'Porting a platform': '플랫폼 포팅',
  'New board': '새 보드',
  'New project': '새 프로젝트',
  'Cloud & AI': '클라우드 및 AI',
  'Cloud connection, AI agents, OpenAPI': '클라우드 연결, AI Agent, OpenAPI',
  'Bind devices to Tuya Cloud, then build on-device AI agents — audio, video, skills and MCP.': '디바이스를 Tuya Cloud에 연결한 뒤 오디오, 비디오, 스킬, MCP를 사용하는 온디바이스 AI Agent를 구축하세요.',
  'Connect to Tuya Cloud': 'Tuya Cloud 연결',
  Overview: '개요',
  'Create a product': '제품 만들기',
  'Bind a device': '디바이스 바인딩',
  'IoT client reference': 'IoT Client 레퍼런스',
  'Demo: IoT light': '예제: IoT 조명',
  'On-device AI agent': '온디바이스 AI Agent',
  'Agentic-first hardware': 'Agent 우선 하드웨어',
  'Voice-first design': '음성 우선 설계',
  'AI components': 'AI 컴포넌트',
  'Agent & skills': 'Agent 및 스킬',
  'Multimodal data flow': '멀티모달 데이터 흐름',
  'Voice chat modes': '음성 채팅 모드',
  'MCP & UI': 'MCP 및 UI',
  'Designing device MCP tools': '디바이스 MCP 도구 설계',
  'Expose MCP on the device': '디바이스에서 MCP 노출',
  'On-device chat UIs': '온디바이스 채팅 UI',
  Demos: '데모',
  'Duo eyes & mood': 'Duo 표정 및 감정',
  'Real-world use cases': '실제 활용 사례',
  TClaw: 'TClaw',
  'Edge-AI voice agent on the board': '보드에서 실행되는 엣지 AI 음성 Agent',
  'Run an agent on the board and give it real device tools through MCP.': '보드에서 Agent를 실행하고 MCP를 통해 실제 디바이스 도구를 연결하세요.',
  'Quick start': '빠른 시작',
  'TClaw with T5AI': 'T5AI와 TClaw',
  'TClaw with Raspberry Pi 5': 'Raspberry Pi 5와 TClaw',
  'TClaw with ESP32-S3': 'ESP32-S3와 TClaw',
  'Extend it': '기능 확장',
  'Custom device MCP': '커스텀 디바이스 MCP',
  'Hardware peripheral skills': '하드웨어 주변 장치 스킬',
  'Connect it': '연결하기',
  'Connect TClaw to OpenClaw': 'TClaw을 OpenClaw에 연결',
  'Connect TClaw to TuyaClaw': 'TClaw을 TuyaClaw에 연결',
  tyutool: 'tyutool',
  'Flashing, serial and batch authorization': '플래시, 시리얼 디버깅 및 일괄 인증',
  'The desktop and CLI tool for flashing firmware, serial debugging and batch authorization.': '펌웨어 플래시, 시리얼 디버깅, 일괄 인증을 위한 데스크톱 및 CLI 도구입니다.',
  'Use it': '사용하기',
  Concepts: '개념',
  'Getting started': '시작하기',
  'Flash firmware': '펌웨어 플래시',
  'Serial debug': '시리얼 디버깅',
  'Production & CLI': '양산 및 CLI',
  'Batch auth — operator': '일괄 인증 — 운영자',
  'Batch auth — developer': '일괄 인증 — 개발자',
  CLI: 'CLI',
  Settings: '설정',
  FAQ: 'FAQ',
  Tutorials: '튜토리얼',
  'Guided, hands-on walkthroughs — including the TuyaOpen IDE series.': 'TuyaOpen IDE 시리즈를 포함한 단계별 실습 튜토리얼입니다.',
  'FAQ articles': 'FAQ 문서',
  'Longer answers to the questions that keep coming up.': '반복해서 등장하는 질문에 대한 자세한 답변입니다.',
  Forums: '포럼',
  'Ask the community when the docs run out.': '문서에서 답을 찾지 못했다면 커뮤니티에 질문하세요.',
}

const koText = (value) => KO_LABELS[value] || value

const koAreas = areas.map((area) => ({
  ...area,
  ko: {
    name: koText(area.en.name),
    tagline: koText(area.en.tagline),
    blurb: koText(area.en.blurb),
  },
  groups: area.groups.map((group) => ({
    ...group,
    ko: koText(group.en),
    links: group.links.map((link) => ({ ...link, ko: koText(link.en) })),
  })),
}))

const koElsewhere = elsewhere.map((item) => ({
  ...item,
  ko: { title: koText(item.en.title), desc: koText(item.en.desc) },
}))

function AreaCard({ area, locale }) {
  const c = area[locale]
  return (
    <section className={styles.area} style={{ '--accent': area.accent }}>
      <header className={styles.areaHead}>
        <span className={styles.areaIcon} aria-hidden>
          <svg {...iconProps} width={20} height={20}>
            {AREA_ICON[area.key] ?? AREA_ICON_FALLBACK}
          </svg>
        </span>
        <div className={styles.areaHeadText}>
          <h2 className={styles.areaName}>{c.name}</h2>
          <p className={styles.areaTagline}>{c.tagline}</p>
        </div>
        <Link className={styles.areaEntry} to={hrefFor(area.entry, locale)}>
          {locale === 'zh' ? '进入' : locale === 'ko' ? '열기' : 'Open'}
          <ArrowIcon />
        </Link>
      </header>

      <p className={styles.areaBlurb}>{c.blurb}</p>

      <div className={styles.groups}>
        {area.groups.map((g) => (
          <div className={styles.group} key={g.en}>
            <h3 className={styles.groupTitle}>{g[locale]}</h3>
            <ul className={styles.groupLinks}>
              {g.links.map((l) => (
                <li key={l.id}>
                  <Link className={styles.groupLink} to={hrefFor(l.id, locale)}>
                    {l[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function Documentation() {
  const { i18n } = useDocusaurusContext()
  const locale = i18n.currentLocale === 'zh' || i18n.currentLocale === 'ko' ? i18n.currentLocale : 'en'
  const zh = locale === 'zh'
  const ko = locale === 'ko'
  const localizedAreas = ko ? koAreas : areas
  const localizedElsewhere = ko ? koElsewhere : elsewhere

  const t = {
    eyebrow: ko ? 'TuyaOpen 문서' : zh ? 'TuyaOpen 文档' : 'TuyaOpen Docs',
    title: ko ? '문서 안내' : zh ? '文档导览' : 'Documentation',
    // Count comes from the data, not the copy — an earlier version hardcoded
    // "five" and went stale the moment an area was added. It also repeated the
    // quick-start card that sits directly below; that half is gone.
    subtitle: ko
      ? `${areas.length}개 문서 영역에서 필요한 작업을 선택하세요.`
      : zh
      ? `${areas.length} 个文档区，按你手上要做的事进入。`
      : `${areas.length} documentation areas, entered by what you are trying to do.`,
    areasTitle: ko ? '문서 영역' : zh ? '文档区' : 'Areas',
    elsewhereTitle: ko ? '문서 외 콘텐츠' : zh ? '不在文档里的内容' : 'Beyond the docs',
    pageTitle: ko ? '문서 안내 | TuyaOpen' : zh ? '文档导览 | TuyaOpen' : 'Documentation | TuyaOpen',
  }

  const qs = ko
    ? {
        kicker: '시작하기',
        title: '두 가지 빠른 시작 트랙',
        blurb: KO_LABELS['The Learn hub carries two complete tracks, each running from environment setup through to a paired device: the graphical TuyaOpen IDE workflow, or the SDK with tos.py on the command line.'],
        cta: '학습 센터로 이동',
      }
    : quickStartPointer[locale]

  return (
    <Layout title={t.title} description={t.subtitle}>
      <Head>
        <title>{t.pageTitle}</title>
      </Head>

      <main className={styles.root}>
        <div className={styles.hero}>
          <div className={styles.heroInner}>
            <span className={styles.eyebrow}>{t.eyebrow}</span>
            <h1 className={styles.title}>{t.title}</h1>
            <p className={styles.subtitle}>{t.subtitle}</p>
          </div>
        </div>

        <div className={styles.shell}>
          {/* Onboarding lives on /learn now — this is the signpost to it. */}
          <section className={styles.start}>
            <div className={styles.startHead}>
              <div>
                <span className={styles.startKicker}>{qs.kicker}</span>
                <h2 className={styles.startTitle}>{qs.title}</h2>
                <p className={styles.startBlurb}>{qs.blurb}</p>
              </div>
              <Link className={styles.startCta} to={localePath(locale, quickStartPointer.to)}>
                {qs.cta}
                <ArrowIcon />
              </Link>
            </div>
          </section>

          <h2 className={styles.sectionTitle}>{t.areasTitle}</h2>
          <div className={styles.areas}>
            {localizedAreas.map((a) => (
              <AreaCard area={a} locale={locale} key={a.key} />
            ))}
          </div>

          <h2 className={styles.sectionTitle}>{t.elsewhereTitle}</h2>
          <div className={styles.elsewhere}>
            {localizedElsewhere.map((e) => {
              const c = e[locale]
                const props = e.href
                  ? { href: e.href, target: '_blank', rel: 'noopener noreferrer' }
                : { to: localePath(locale, e.to) }
              return (
                <Link className={styles.elseCard} key={c.title} {...props}>
                  <span className={styles.elseTitle}>
                    {c.title}
                    <ArrowIcon external={Boolean(e.href)} />
                  </span>
                  <span className={styles.elseDesc}>{c.desc}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </main>
    </Layout>
  )
}
