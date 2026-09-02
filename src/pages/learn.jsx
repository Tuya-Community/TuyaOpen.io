import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useLocation } from '@docusaurus/router';

import BorderGlow from '@site/src/components/BorderGlow';
import { categories, levels, tags as tagMeta, tutorials } from '../data/tutorials';
import { quickStartTracks } from '../data/quickStartTracks';
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
const SearchIcon = () => (
  <svg {...iconProps} width={15} height={15}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
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
      'Hands-on material for TuyaOpen: two quick-start tracks to a first working device, plus tutorials and community projects grouped by topic.',
    onThisPage: 'On this page',
    empty: 'No guides in this section yet — check back soon.',
    countOne: 'guide',
    countMany: 'guides',
    pathsTitle: 'Quick start',
    pathsSubtitle:
      'Both tracks cover the same ground, environment setup through to a paired device. They differ in method: a graphical workflow, or the command line.',
    browseTitle: 'Tutorials and community projects',
    stepCount: (n) => `${n} steps`,
    searchPlaceholder: 'Search title, description, or tag…',
    searchEmpty: 'No guides match your search.',
  },
  zh: {
    title: '学习',
    subtitle: 'TuyaOpen 的实操内容：两条通向第一台可用设备的快速上手主线，以及按主题分类的教程与社区项目。',
    onThisPage: '本页目录',
    empty: '该分类下暂无教程，敬请期待。',
    countOne: '篇指南',
    countMany: '篇指南',
    pathsTitle: '快速上手',
    pathsSubtitle: '两条主线覆盖相同范围——从环境准备到设备配网，差别在于图形化流程还是命令行流程。',
    browseTitle: '教程与社区项目',
    stepCount: (n) => `${n} 步`,
    searchPlaceholder: '搜索标题、描述或标签…',
    searchEmpty: '没有匹配的教程。',
  },
};

/* '15 min' / '15 分钟' → 15. Steps without a usable duration contribute 0 to
   the track total rather than breaking it. */
function parseMinutes(duration) {
  const match = typeof duration === 'string' && duration.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

/* Hands-on time, not reading time. Over an hour reads badly in bare minutes
   ("约 105 分钟"), so split it — the total is the number people decide on. */
function formatMinutes(total, locale, approx) {
  if (!total) return null;
  const zh = locale === 'zh';
  const h = Math.floor(total / 60);
  const m = total % 60;
  const body = h > 0 ? (zh ? `${h} 小时${m ? ` ${m} 分钟` : ''}` : `${h}h${m ? ` ${m}m` : ''}`) : zh ? `${total} 分钟` : `${total} min`;
  if (!approx) return body;
  return zh ? `约 ${body}` : `~${body}`;
}

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

/* Height of the fixed Docusaurus navbar, plus a little air. Anchors are
   scrolled to this offset so a heading never lands underneath the navbar. */
const SCROLL_OFFSET = 88;

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET,
    behavior: reduce ? 'auto' : 'smooth',
  });
}

/* Scroll spy: reports whichever observed section most recently crossed the
   reading line near the top of the viewport. The bottom margin is deliberately
   large so a section counts as "current" while its heading sits in the top
   third, rather than flickering between neighbours mid-scroll.

   Only ever pass leaf ids. A parent section contains its children and so is
   always intersecting when they are — observe both and the parent wins every
   time, which is exactly how the children never lit up. The owning group is
   derived from the active leaf instead. */
function useScrollSpy(ids) {
  const [activeId, setActiveId] = useState(ids[0]);
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined' || ids.length === 0) return;
    const visible = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id)));
        // Keep document order so the topmost visible section wins.
        const first = ids.find((id) => visible.has(id));
        if (first) setActiveId(first);
      },
      { rootMargin: `-${SCROLL_OFFSET}px 0px -68% 0px`, threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids.join('|')]);
  return activeId;
}

/* The sidebar is the page's table of contents, in the order the page reads.
   It navigates, it does not filter: every tutorial stays on the page, so
   there is nothing to switch back to and no "All" entry to provide. */
function PageNav({ groups, activeGroupId, activeLeafId, heading }) {
  return (
    <nav className={styles.toc} aria-label={heading}>
      <span className={styles.tocHeading}>{heading}</span>
      {groups.map((group) => {
        const groupActive = activeGroupId === group.id;
        // A childless group is itself the smallest region the spy can report,
        // so it carries the strong "you are here" marker rather than the quiet
        // parent one — there is no row beneath it to hand that job to.
        const isLeafGroup = group.children.length === 0;
        return (
          <div className={`${styles.tocGroup} ${groupActive ? styles.tocGroupCurrent : ''}`} key={group.id}>
            <button
              type="button"
              className={`${styles.tocGroupLink} ${
                groupActive ? (isLeafGroup ? styles.tocActive : styles.tocGroupActive) : ''
              }`}
              onClick={() => scrollToId(group.id)}
              aria-current={groupActive ? (isLeafGroup ? 'location' : 'true') : undefined}
            >
              {group.label}
            </button>
            {group.children.length > 0 && (
              <ul className={styles.tocChildren}>
                {group.children.map((child) => {
                  const leafActive =
                    activeLeafId === child.id;
                  return (
                    <li key={child.id}>
                      <button
                        type="button"
                        className={`${styles.tocChildLink} ${leafActive ? styles.tocActive : ''}`}
                        onClick={() => scrollToId(child.id)}
                        aria-current={leafActive ? 'location' : undefined}
                      >
                        <span className={styles.tocChildLabel}>{child.label}</span>
                        {child.count != null && <span className={styles.tocCount}>{child.count}</span>}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </nav>
  );
}

/* Section header card for a category — spans the full grid width and leads
   each grouped section on the hub. Carries the category title, a one-line
   intro, an optional image, and the guide count. */
function CategoryHeader({ cat, count, countWord, locale }) {
  const imgSrc = cat.image ? useBaseUrl(cat.image) : null;
  const countLabel = locale === 'zh' ? `${count} 篇指南` : `${count} ${countWord}`;
  return (
    <div className={styles.categoryHeader}>
      {imgSrc && (
        <img
          src={imgSrc}
          alt=""
          aria-hidden
          className={styles.categoryHeaderImage}
          loading="lazy"
        />
      )}
      <div className={styles.categoryHeaderText}>
        <div className={styles.categoryHeaderTop}>
          <span className={styles.categoryHeaderDot} aria-hidden />
          <h3 className={styles.categoryHeaderTitle}>{cat.label}</h3>
          <span className={styles.categoryHeaderCount}>{countLabel}</span>
        </div>
        {cat.intro && <p className={styles.categoryHeaderIntro}>{cat.intro}</p>}
      </div>
    </div>
  );
}

/* One quick-start mainline — the IDE route or the SDK route. Both are laid
   out flat and in full: there are only two ways in, so hiding either behind a
   choice or an accordion costs more than it saves. */
function TrackCard({ track, locale, durationByHref, t }) {
  // A step's minutes come from the track (SDK, whose steps are docs pages) or
  // from the tutorial manifest (IDE, whose steps are Learn cards).
  const minutesOf = (step) => step.minutes ?? parseMinutes(durationByHref[step.href]);
  const total = track.steps.reduce((sum, s) => sum + minutesOf(s), 0);

  return (
    <li className={styles.track} style={{ '--accent': track.accent }}>
      <div className={styles.trackCard}>
        <div className={styles.trackHead}>
          <h3 className={styles.trackName}>{track.name}</h3>
          <p className={styles.trackTagline}>{track.tagline}</p>
          {/* The two numbers someone weighs before committing to a track. */}
          <p className={styles.trackMeta}>
            {t.stepCount(track.steps.length)}
            {total > 0 && (
              <>
                <span className={styles.trackMetaDot} aria-hidden>
                  ·
                </span>
                {formatMinutes(total, locale, true)}
              </>
            )}
          </p>
        </div>
        <p className={styles.trackBlurb}>{track.blurb}</p>
        <ol className={styles.trackSteps}>
          {track.steps.map((step, i) => {
            const mins = minutesOf(step);
            return (
              <li key={step.href} className={styles.trackStep}>
                <span className={styles.trackStepNum}>{String(i + 1).padStart(2, '0')}</span>
                <Link to={`${localize(step.href, locale)}?from=learn`} className={styles.trackStepLink}>
                  {step.title}
                </Link>
                {mins > 0 && <span className={styles.trackStepTime}>{formatMinutes(mins, locale)}</span>}
              </li>
            );
          })}
        </ol>
        <Link className={styles.trackCta} to={localize(track.entry.href, locale)}>
          {track.entry.label}
          <ArrowIcon />
        </Link>
      </div>
    </li>
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

  const location = useLocation();
  const [search, setSearch] = useState('');

  // ---- Quick-start tracks: the IDE route and the SDK route, both laid out
  // flat. No chooser and no accordion — with only two routes, showing both in
  // full is cheaper for the reader than any interaction that hides one.
  const tracks = quickStartTracks[locale] || quickStartTracks.en;

  // IDE track steps are Learn tutorials, so their duration lives in the
  // manifest, not in the track — look it up rather than storing it twice.
  const durationByHref = useMemo(
    () => Object.fromEntries(items.filter((x) => x.duration).map((x) => [x.href, x.duration])),
    [items],
  );

  // `?cat=<id>` (or `#<id>`) used to select a filter tab. Nothing filters any
  // more — every category is always on the page — so the same links now scroll
  // to that category's section instead. This keeps the three navbar/footer
  // entries pointing at ?cat=community working, and the detail pages' "Back to
  // Learn" link with them.
  const deepLinkCat = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const candidate = params.get('cat') || location.hash.replace('#', '');
    return cats.some((c) => c.id === candidate) ? candidate : null;
  }, [location.search, location.hash, cats]);

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

  // A deep link arrives before the sections have laid out, so defer the jump
  // past paint the same way the scroll restore above does.
  useEffect(() => {
    if (!deepLinkCat) return;
    const raf = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => scrollToId(`cat-${deepLinkCat}`));
    });
    return () => window.cancelAnimationFrame(raf);
  }, [deepLinkCat]);

  const query = search.trim().toLowerCase();
  const shown = query
    ? items.filter((it) => {
        const tagLabels = (it.tags || []).map((tg) => tagMap[tg]?.label || tg);
        const haystack = [it.title, it.description, ...tagLabels].join(' ').toLowerCase();
        return haystack.includes(query);
      })
    : items;

  // Group the visible items by category, in category order, dropping empty
  // categories. Each group renders as a full-width section header card
  // followed by that category's card grid — so the hub reads as a series of
  // labeled sections rather than one long flat grid. When a single category
  // is filtered, exactly one group is produced.
  const sections = useMemo(() => {
    const byCat = {};
    shown.forEach((it) => {
      (byCat[it.category] ||= []).push(it);
    });
    return cats
      .filter((c) => byCat[c.id] && byCat[c.id].length > 0)
      .map((c) => ({ cat: c, items: byCat[c.id] }));
  }, [shown, cats]);

  // The page's own outline, in reading order: the two quick-start tracks,
  // then every category section that currently has cards.
  const tocGroups = useMemo(
    () => [
      // No children. The two tracks sit side by side, so "which one am I
      // scrolling past" has no honest answer, and both cards are visible from
      // the section heading anyway — the section is the smallest useful target.
      { id: 'quick-start', label: t.pathsTitle, children: [] },
      {
        id: 'browse',
        label: t.browseTitle,
        children: sections.map(({ cat, items: catItems }) => ({
          id: `cat-${cat.id}`,
          label: cat.label,
          count: catItems.length,
        })),
      },
    ],
    [t.pathsTitle, t.browseTitle, tracks, sections],
  );

  // Leaves only — see useScrollSpy on why observing the parents too breaks it.
  // One spy target per highlightable region: a group's children when it has
  // them, otherwise the group itself. Never both — see useScrollSpy on why a
  // parent observed alongside its children swallows them.
  const spyIds = useMemo(
    () => tocGroups.flatMap((g) => (g.children.length ? g.children.map((c) => c.id) : [g.id])),
    [tocGroups],
  );
  const activeLeafId = useScrollSpy(spyIds);
  const activeGroupId = useMemo(
    () =>
      tocGroups.find((g) => g.id === activeLeafId || g.children.some((c) => c.id === activeLeafId))?.id ??
      tocGroups[0]?.id,
    [tocGroups, activeLeafId],
  );

  // The detail pages' "Back to Learn" reads this to return you to the section
  // you left from, so keep it pointed at whichever category is in view.
  useEffect(() => {
    if (activeLeafId?.startsWith('cat-')) writeStorage(CAT_KEY, activeLeafId.slice(4));
  }, [activeLeafId]);

  return (
    <Layout title={t.title} description={t.subtitle}>
      <Head>
        <title>
          {t.title} - {siteConfig.title}
        </title>
        <meta name="description" content={t.subtitle} />
        <meta name="keywords" content="tuyaopen learn, aiot projects, ai powered iot applications, embedded ai tutorial, iot development" />
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

        {/* ------------------------------- Persistent sidebar + main column */}
        <div className={styles.shell}>
          <aside className={styles.sidebar}>
            {/* Table of contents, not a filter — see PageNav. */}
            <div className={styles.sidebarSticky}>
              <PageNav
                groups={tocGroups}
                activeGroupId={activeGroupId}
                activeLeafId={activeLeafId}
                heading={t.onThisPage}
              />
            </div>
          </aside>

          <div className={styles.main}>
            {/* -------------------------------------------- Quick start */}
            {/* Two mainlines, both open: IDE tutorials and the SDK funnel. */}
            <section className={styles.pathsSection} id="quick-start">
              <h2 className={styles.pathsTitle}>{t.pathsTitle}</h2>
              <p className={styles.pathsSubtitle}>{t.pathsSubtitle}</p>

              <ol className={styles.tracks}>
                {tracks.map((track) => (
                  <TrackCard
                    key={track.id}
                    track={track}
                    locale={locale}
                    durationByHref={durationByHref}
                    t={t}
                  />
                ))}
              </ol>
            </section>

            {/* --------------------------- Tutorials & community projects */}
            <section className={styles.browseSection} id="browse">
              <h2 className={styles.pathsTitle}>{t.browseTitle}</h2>
              <div className={styles.mainHead}>
                <div className={styles.mainHeadRight}>
                  <span className={styles.resultCount}>
                    {shown.length} {shown.length === 1 ? t.countOne : t.countMany}
                  </span>
                  <div className={styles.searchBox}>
                    <SearchIcon />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder={t.searchPlaceholder}
                      className={styles.searchInput}
                      aria-label={t.searchPlaceholder}
                    />
                  </div>
                </div>
              </div>
              {shown.length === 0 ? (
                <p className={styles.empty}>{query ? t.searchEmpty : t.empty}</p>
              ) : (
                <div className={styles.sections}>
                  {sections.map(({ cat, items: catItems }) => (
                    <section key={cat.id} id={`cat-${cat.id}`} className={styles.section}>
                      <CategoryHeader
                        cat={cat}
                        count={catItems.length}
                        countWord={catItems.length === 1 ? t.countOne : t.countMany}
                        locale={locale}
                      />
                      <div className={styles.grid}>
                        {catItems.map((item) => (
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
                    </section>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </Layout>
  );
}
