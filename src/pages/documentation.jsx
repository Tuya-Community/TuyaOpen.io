import React from 'react'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import Head from '@docusaurus/Head'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

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
const hrefFor = (id) => {
  if (id.startsWith('/')) return id
  // Index docs: a file named after its own folder (faqs/faqs.md,
  // ai-components/ai-components.md) keeps that doubled id in sidebars.js but
  // is served without the repeat — /docs/faqs, not /docs/faqs/faqs. Collapse
  // it here so ids can stay copy-pasteable from the sidebar config.
  const parts = id.split('/')
  if (parts.length > 1 && parts[parts.length - 1] === parts[parts.length - 2]) parts.pop()
  return `/docs/${parts.join('/')}`
}

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
        <Link className={styles.areaEntry} to={hrefFor(area.entry)}>
          {locale === 'zh' ? '进入' : 'Open'}
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
                  <Link className={styles.groupLink} to={hrefFor(l.id)}>
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
  const locale = i18n.currentLocale === 'zh' ? 'zh' : 'en'
  const zh = locale === 'zh'

  const t = {
    eyebrow: zh ? 'TuyaOpen 文档' : 'TuyaOpen Docs',
    title: zh ? '文档导览' : 'Documentation',
    // Count comes from the data, not the copy — an earlier version hardcoded
    // "five" and went stale the moment an area was added. It also repeated the
    // quick-start card that sits directly below; that half is gone.
    subtitle: zh
      ? `${areas.length} 个文档区，按你手上要做的事进入。`
      : `${areas.length} documentation areas, entered by what you are trying to do.`,
    areasTitle: zh ? '文档区' : 'Areas',
    elsewhereTitle: zh ? '不在文档里的内容' : 'Beyond the docs',
    pageTitle: zh ? '文档导览 | TuyaOpen' : 'Documentation | TuyaOpen',
  }

  const qs = quickStartPointer[locale]

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
              <Link className={styles.startCta} to={quickStartPointer.to}>
                {qs.cta}
                <ArrowIcon />
              </Link>
            </div>
          </section>

          <h2 className={styles.sectionTitle}>{t.areasTitle}</h2>
          <div className={styles.areas}>
            {areas.map((a) => (
              <AreaCard area={a} locale={locale} key={a.key} />
            ))}
          </div>

          <h2 className={styles.sectionTitle}>{t.elsewhereTitle}</h2>
          <div className={styles.elsewhere}>
            {elsewhere.map((e) => {
              const c = e[locale]
              const props = e.href
                ? { href: e.href, target: '_blank', rel: 'noopener noreferrer' }
                : { to: e.to }
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
