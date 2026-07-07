import React, { useEffect, useRef, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { clsx } from 'clsx';
import styles from './styles.module.css';

/* =========================================================================
 * TutorialShell — shared chrome for every tutorial detail page.
 * -------------------------------------------------------------------------
 * Wrap either hand-built React content OR rendered Markdown in this shell and
 * both come out looking identical: same hero, same sticky contents, same body
 * typography. That is what keeps `kind: 'interactive'` and `kind: 'markdown'`
 * tutorials consistent.
 *
 * Props:
 *   badge     small pill above the title (usually the category label)
 *   title     page H1
 *   subtitle  one-line intro under the title
 *   meta      optional array of strings shown as pills (e.g. ['Beginner', '10 min'])
 *   nav       optional [{ id, label }] — renders a sticky "On this page" TOC that
 *             tracks <section id="…"> elements in the content. Omit for no TOC.
 *   markdown  when true, the content column gets the `.markdown` body styles so
 *             rendered MDX matches the hand-built pages. (interactive pages that
 *             use the shell's own classes should leave this false.)
 *   docTitle / docDescription  <head> values (default to title / subtitle)
 *   children  the tutorial content
 * ========================================================================= */
export default function TutorialShell({
  badge,
  title,
  subtitle,
  meta = [],
  nav = null,
  markdown = false,
  docTitle,
  docDescription,
  children,
}) {
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale === 'zh' ? 'zh' : 'en';
  const hubHref = locale === 'zh' ? '/zh/learn' : '/learn';
  const backLabel = locale === 'zh' ? '返回学习中心' : 'Back to Learn';
  const tocLabel = locale === 'zh' ? '本页内容' : 'On this page';

  // Deep-link the "Back to Learn" breadcrumb back to the filter the visitor
  // was on when they opened the tutorial (saved by the hub). Read in an effect
  // so the server render and first client render match (no hydration mismatch).
  const [backHref, setBackHref] = useState(hubHref);
  useEffect(() => {
    let cat = null;
    try {
      cat = sessionStorage.getItem('learn:cat');
    } catch {
      /* ignore */
    }
    setBackHref(cat && cat !== 'all' ? `${hubHref}?cat=${encodeURIComponent(cat)}` : hubHref);
  }, [hubHref]);

  const hasToc = Array.isArray(nav) && nav.length > 0;
  const [activeId, setActiveId] = useState(hasToc ? nav[0].id : null);
  const contentRef = useRef(null);
  const tocListRef = useRef(null);

  // Reading-progress TOC — mirrors the docs TOC behaviour (src/clientModules/
  // toc-reading-progress.js): a primary-colored fill on the rail tracks how far
  // the reader has scrolled, and the active item is the last section whose top
  // has passed a reading line just below the sticky navbar. Window is the
  // scroller on this site, so a rAF-throttled scroll listener drives both.
  useEffect(() => {
    if (!hasToc || typeof window === 'undefined') return undefined;
    const root = contentRef.current;
    if (!root) return undefined;
    const sections = Array.from(root.querySelectorAll('section[id]'));
    if (!sections.length) return undefined;

    const readingLine = () => {
      const navbar = document.querySelector('.navbar');
      return (navbar ? navbar.offsetHeight : 60) + 40;
    };

    let ticking = false;

    const update = () => {
      ticking = false;
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const readingPos = scrollY + readingLine();
      const tops = sections.map((s) => s.getBoundingClientRect().top + scrollY);

      let current = -1;
      for (let i = 0; i < tops.length; i += 1) {
        if (tops[i] <= readingPos) current = i;
        else break;
      }
      const atBottom =
        window.innerHeight + scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) current = sections.length - 1;

      setActiveId(current >= 0 ? sections[current].id : sections[0].id);

      // Map the reading position onto the TOC link offsets for the fill height.
      const ul = tocListRef.current;
      if (ul) {
        const links = ul.querySelectorAll('a[href^="#"]');
        let fillPx = 0;
        if (current >= 0 && links[current]) {
          const linkTop = links[current].offsetTop;
          const nextTop =
            current + 1 < links.length ? links[current + 1].offsetTop : ul.scrollHeight;
          const secStart = tops[current];
          const secEnd = current + 1 < tops.length ? tops[current + 1] : scrollY + document.documentElement.scrollHeight;
          let frac = secEnd > secStart ? (readingPos - secStart) / (secEnd - secStart) : 1;
          frac = Math.max(0, Math.min(1, frac));
          fillPx = linkTop + frac * (nextTop - linkTop);
        }
        if (atBottom) fillPx = ul.scrollHeight;
        ul.style.setProperty('--toc-progress', `${Math.round(fillPx)}px`);
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    const timers = [setTimeout(update, 250), setTimeout(update, 1000)];
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      timers.forEach(clearTimeout);
    };
  }, [hasToc, locale]);

  return (
    <Layout title={docTitle || title} description={docDescription || subtitle}>
      <main className={styles.root}>
        {/* -------------------------------------------------------- Hero */}
        <header className={styles.hero}>
          <div className={styles.heroGlow} aria-hidden />
          <div className={styles.heroInner}>
            <Link to={backHref} className={styles.breadcrumb}>
              <svg
                className={styles.breadcrumbArrow}
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden>
                <path d="M19 12H5M11 6l-6 6 6 6" />
              </svg>
              {backLabel}
            </Link>
            {badge && <span className={styles.heroBadge}>{badge}</span>}
            <h1 className={styles.heroTitle}>{title}</h1>
            {subtitle && <p className={styles.heroSubtitle}>{subtitle}</p>}
            {meta.length > 0 && (
              <div className={styles.heroMeta}>
                {meta.map((m) => (
                  <span key={m} className={styles.metaPill}>
                    {m}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        <div className={clsx(styles.layout, !hasToc && styles.layoutNoToc)}>
          {/* ----------------------------------------------------- TOC */}
          {hasToc && (
            <aside className={styles.toc}>
              <div className={styles.tocSticky}>
                <div className={styles.tocTitle}>{tocLabel}</div>
                <nav>
                  <ul ref={tocListRef}>
                    {nav.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className={clsx(styles.tocLink, activeId === item.id && styles.tocLinkActive)}
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>
          )}

          {/* ------------------------------------------------- Content */}
          <div className={clsx(styles.content, markdown && styles.markdown)} ref={contentRef}>
            {children}
          </div>
        </div>
      </main>
    </Layout>
  );
}
