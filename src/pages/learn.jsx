import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useLocation } from '@docusaurus/router';

import BorderGlow from '@site/src/components/BorderGlow';
import FlowingMenu from '@site/src/components/FlowingMenu';
import { categories, levels, tags as tagMeta, tutorials } from '../data/tutorials';
import styles from './learn.module.css';

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

/* sessionStorage keys for preserving the hub state across a tutorial visit.
   SCROLL_KEY captures window.scrollY at the moment a card is opened (one-shot,
   cleared on restore) so the hub can return to that spot. CAT_KEY holds the
   last active filter so the detail page's "Back to Learn" can deep-link back
   to the same filtered view. */
const SCROLL_KEY = 'learn:scroll';
const CAT_KEY = 'learn:cat';

function readStorage(key) {
  try {
    return typeof sessionStorage !== 'undefined' ? sessionStorage.getItem(key) : null;
  } catch {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
}

function removeStorage(key) {
  try {
    sessionStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

const COPY = {
  en: {
    title: 'Learn',
    subtitle:
      'Hands-on, user-facing guidance for TuyaOpen — pick your board, set up the IDE, learn the SDK, and follow along with projects, tutorials, and guides.',
    all: 'All',
    empty: 'No guides in this section yet — check back soon.',
    countOne: 'guide',
    countMany: 'guides',
  },
  zh: {
    title: '学习',
    subtitle:
      '面向用户的 TuyaOpen 实操指引 —— 选择开发板、配置 IDE、学习 SDK，并跟随项目、教程与指南一步步动手。',
    all: '全部',
    empty: '该分类下暂无教程，敬请期待。',
    countOne: '篇指南',
    countMany: '篇指南',
  },
};

function LearnCard({ item, locale, catMap, levelMap, tagMap }) {
  const external = item.kind === 'external';
  // A card may carry one destination (`href`) OR a set of named links
  // (`links: [{label, href}]`) — e.g. a community demo with both a details
  // link and a source-code link. Multi-link cards render as a non-anchor
  // container with a button row in the footer (a card can't be a single <a>
  // and also contain <a> buttons — invalid HTML). Single-`links` and `href`
  // cards stay whole-card-clickable.
  const links = item.links && item.links.length > 0 ? item.links : null;
  const multiLink = !!links && links.length > 1;
  const linkHref = links ? links[0].href : item.href;
  // Tag internal links so the destination can offer a "back to learn" return.
  const href =
    links || external
      ? linkHref
      : `${localize(item.href, locale)}?from=learn`;
  const cat = catMap[item.category];
  const cta = external ? (locale === 'zh' ? '前往' : 'Visit') : locale === 'zh' ? '打开' : 'Open';
  const meta = [item.level && levelMap[item.level], item.duration].filter(Boolean);

  // Optional hover-reveal image. Hidden by default; on `.glowCard:hover` it
  // quickly emerges as a peek thumbnail in the top-right of the card. Purely
  // additive — does not touch the glow, translate, or arrow effects.
  const imgSrc = item.image ? useBaseUrl(item.image) : null;

  // Capture the hub's scroll position the instant an internal card is opened,
  // so we can restore it when the visitor returns. External links open in a
  // new tab and leave the hub untouched, so they're skipped.
  const handleOpen = useCallback(() => {
    if (external) return;
    writeStorage(SCROLL_KEY, String(window.scrollY));
  }, [external]);

  const body = (
    <>
      {imgSrc && (
        <img
          src={imgSrc}
          alt=""
          aria-hidden
          className={styles.cardImagePeek}
          loading="lazy"
        />
      )}
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
        {meta.length > 0 && <span className={styles.cardMeta}>{meta.join(' · ')}</span>}
        {multiLink ? (
          <div className={styles.cardLinks}>
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cardCta}
              >
                {l.label}
                <ArrowIcon external />
              </a>
            ))}
          </div>
        ) : (
          <span className={styles.cardCta}>
            {links ? links[0].label : cta}
            <ArrowIcon external={external || !!links} />
          </span>
        )}
      </div>
    </>
  );

  // Multi-link cards can't be a single anchor (they contain <a> buttons), so
  // they render as a plain div; the hover effects still apply via .glowCard.
  // Single-link and href cards stay whole-card-clickable.
  const linkEl = multiLink ? (
    <div className={styles.card}>{body}</div>
  ) : external || links ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={styles.card}>
      {body}
    </a>
  ) : (
    <Link to={href} onClick={handleOpen} className={styles.card}>
      {body}
    </Link>
  );

  return (
    <BorderGlow className={styles.glowCard} {...GLOW}>
      {linkEl}
    </BorderGlow>
  );
}

export default function LearnPage() {
  const { siteConfig, i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale === 'zh' ? 'zh' : 'en';
  const t = COPY[locale];

  const cats = categories[locale] || categories.en;
  const catMap = useMemo(() => Object.fromEntries(cats.map((c) => [c.id, c])), [cats]);
  const levelMap = levels[locale] || levels.en;
  const tagMap = tagMeta[locale] || tagMeta.en;
  const items = tutorials[locale] || tutorials.en;

  // Deep-link a category via ?cat=<id> (or #<id>) so redirected nav entries
  // (e.g. the old Projects link → /learn?cat=community) land on the right tab.
  const location = useLocation();
  const initialCat = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const candidate = params.get('cat') || location.hash.replace('#', '');
    return cats.some((c) => c.id === candidate) ? candidate : 'all';
  }, [location.search, location.hash, cats]);

  const [active, setActive] = useState(initialCat);

  // Persist the active filter into the URL (via replaceState, preserving
  // React Router's history.state) and sessionStorage. Browser-back to the hub
  // then re-reads `?cat=` via initialCat, and the detail page's "Back to
  // Learn" link reads CAT_KEY — so either return path lands on the same view.
  // replaceState does not fire popstate, so this never re-triggers React Router.
  useEffect(() => {
    const params = new URLSearchParams();
    if (active !== 'all') params.set('cat', active);
    const search = params.toString();
    const url = `${location.pathname}${search ? `?${search}` : ''}${location.hash}`;
    if (url !== `${location.pathname}${location.search}${location.hash}`) {
      window.history.replaceState(window.history.state, '', url);
    }
    writeStorage(CAT_KEY, active);
  }, [active, location.pathname, location.search, location.hash]);

  // Restore scroll after returning from a tutorial. Docusaurus scrolls to
  // (0,0) on route change through a layout effect, so defer past it with a
  // double rAF. The saved value is one-shot (cleared here) so an unrelated
  // later visit (e.g. navbar → /learn) starts at the top.
  const restoredRef = useRef(false);
  useEffect(() => {
    if (restoredRef.current) return;
    const saved = readStorage(SCROLL_KEY);
    if (saved == null) return;
    const y = Number(saved);
    if (!Number.isFinite(y)) return;
    restoredRef.current = true;
    const raf1 = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        window.scrollTo(0, y);
        removeStorage(SCROLL_KEY);
      });
    });
    return () => window.cancelAnimationFrame(raf1);
  }, []);

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
                  <LearnCard
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
