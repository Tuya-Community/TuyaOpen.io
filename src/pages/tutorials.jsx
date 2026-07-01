import React, { useMemo, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import BorderGlow from '@site/src/components/BorderGlow';
import FlowingMenu from '@site/src/components/FlowingMenu';
import { categories, levels, tags as tagMeta, tutorials } from '../data/tutorials';
import styles from './tutorials.module.css';

/* ---- Inline SVG icons (no emoji), Lucide-style, currentColor ----------- */
const iconProps = {
  width: 14,
  height: 14,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};
const ArrowIcon = ({ external }) => (
  <svg {...iconProps} width={16} height={16} className={styles.ctaArrow}>
    {external ? <path d="M7 17 17 7M7 7h10v10" /> : <path d="M5 12h14M13 6l6 6-6 6" />}
  </svg>
);

/* BorderGlow theming — violet brand + orange accent, works light & dark. */
const GLOW = {
  backgroundColor: 'var(--tut-card-bg)',
  colors: ['#a78bfa', '#7c5cff', '#ff6b35'],
  glowColor: '255 92 76',
  borderRadius: 18,
  glowRadius: 30,
  glowIntensity: 0.9,
  coneSpread: 22,
  edgeSensitivity: 24,
  fillOpacity: 0.35,
};

/* Internal Docusaurus <Link> is NOT auto-localized — prepend /zh/ for zh. */
function localize(href, locale) {
  if (locale !== 'zh') return href;
  if (!href.startsWith('/') || href.startsWith('/zh/')) return href;
  return `/zh${href}`;
}

const COPY = {
  en: {
    title: 'Tutorials',
    subtitle:
      'Hands-on, user-facing guidance for TuyaOpen — pick your board, set up the IDE, learn the SDK, and follow along with projects, tutorials, and guides.',
    all: 'All',
    empty: 'No tutorials in this section yet — check back soon.',
    countOne: 'tutorial',
    countMany: 'tutorials',
  },
  zh: {
    title: '教程',
    subtitle:
      '面向用户的 TuyaOpen 实操指引 —— 选择开发板、配置 IDE、学习 SDK，并跟随项目、教程与指南一步步动手。',
    all: '全部',
    empty: '该分类下暂无教程，敬请期待。',
    countOne: '篇教程',
    countMany: '篇教程',
  },
};

function TutorialCard({ item, locale, catMap, levelMap, tagMap }) {
  const external = item.kind === 'external';
  // Tag internal links so the destination can offer a "back to tutorials" return.
  const href = external ? item.href : `${localize(item.href, locale)}?from=tutorials`;
  const cat = catMap[item.category];
  const cta = external ? (locale === 'zh' ? '前往' : 'Visit') : locale === 'zh' ? '打开' : 'Open';
  const meta = [item.level && levelMap[item.level], item.duration].filter(Boolean);

  const body = (
    <>
      <div className={styles.cardTop}>
        <span className={styles.cardCat}>
          <span className={styles.cardCatDot} aria-hidden />
          {cat?.label}
        </span>
      </div>

      <h3 className={styles.cardTitle}>{item.title}</h3>
      <p className={styles.cardDesc}>{item.description}</p>

      {(item.tags || []).length > 0 && (
        <div className={styles.tagRow}>
          {item.tags.map((t) => {
            const tag = tagMap[t];
            if (!tag) return null;
            return (
              <span key={t} className={styles.tag}>
                <span className={styles.tagDot} style={{ background: tag.color }} aria-hidden />
                {tag.label}
              </span>
            );
          })}
        </div>
      )}

      <div className={styles.cardFooter}>
        <span className={styles.cardMeta}>{meta.join(' · ')}</span>
        <span className={styles.cardCta}>
          {cta}
          <ArrowIcon external={external} />
        </span>
      </div>
    </>
  );

  const linkEl = external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={styles.card}>
      {body}
    </a>
  ) : (
    <Link to={href} className={styles.card}>
      {body}
    </Link>
  );

  return (
    <BorderGlow className={styles.glowCard} {...GLOW}>
      {linkEl}
    </BorderGlow>
  );
}

export default function TutorialsPage() {
  const { siteConfig, i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale === 'zh' ? 'zh' : 'en';
  const t = COPY[locale];

  const cats = categories[locale] || categories.en;
  const catMap = useMemo(() => Object.fromEntries(cats.map((c) => [c.id, c])), [cats]);
  const levelMap = levels[locale] || levels.en;
  const tagMap = tagMeta[locale] || tagMeta.en;
  const items = tutorials[locale] || tutorials.en;

  const [active, setActive] = useState('all');

  const counts = useMemo(() => {
    const c = { all: items.length };
    cats.forEach((cat) => {
      c[cat.id] = items.filter((it) => it.category === cat.id).length;
    });
    return c;
  }, [items, cats]);

  const shown = active === 'all' ? items : items.filter((it) => it.category === active);

  const menuItems = useMemo(
    () => [
      { key: 'all', text: t.all, count: counts.all },
      ...cats.map((c) => ({ key: c.id, text: c.label, count: counts[c.id] })),
    ],
    [t.all, cats, counts],
  );

  const activeLabel = active === 'all' ? t.all : catMap[active]?.label;

  return (
    <Layout title={t.title} description={t.subtitle}>
      <Head>
        <title>
          {t.title} - {siteConfig.title}
        </title>
        <meta name="description" content={t.subtitle} />
      </Head>

      <main className={styles.root}>
        {/* --------------------------------------------------------- Hero */}
        <header className={styles.hero}>
          <div className={styles.heroGlow} aria-hidden />
          <div className={styles.heroInner}>
            <span className={styles.heroBadge}>{locale === 'zh' ? '学习中心' : 'Learn'}</span>
            <h1 className={styles.heroTitle}>{t.title}</h1>
            <p className={styles.heroSubtitle}>{t.subtitle}</p>
          </div>
        </header>

        {/* -------------------------------------- Body: sidebar + grid */}
        <div className={styles.shell}>
          <aside className={styles.sidebar}>
            <div className={styles.sidebarSticky}>
              <p className={styles.sidebarTitle}>{locale === 'zh' ? '分类' : 'Browse'}</p>
              <FlowingMenu
                items={menuItems}
                activeKey={active}
                onSelect={setActive}
                marqueeBgColor="#7c5cff"
                marqueeTextColor="#ffffff"
              />
            </div>
          </aside>

          <div className={styles.main}>
            <div className={styles.mainHead}>
              <h2 className={styles.mainTitle}>{activeLabel}</h2>
              <span className={styles.resultCount}>
                {shown.length} {shown.length === 1 ? t.countOne : t.countMany}
              </span>
            </div>
            {shown.length === 0 ? (
              <p className={styles.empty}>{t.empty}</p>
            ) : (
              <div className={styles.grid}>
                {shown.map((item) => (
                  <TutorialCard
                    key={item.id}
                    item={item}
                    locale={locale}
                    catMap={catMap}
                    levelMap={levelMap}
                    tagMap={tagMap}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
}
