import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import TutorialShell from '@site/src/components/TutorialShell';
import MarkdownSection from '@site/src/components/MarkdownSection';

/* =========================================================================
 * MARKDOWN TUTORIAL TEMPLATE  (kind: 'markdown')
 * -------------------------------------------------------------------------
 * Use this when the tutorial is plain prose and you'd rather author it in
 * Markdown than JSX. The .md file lives as a partial (underscore prefix so it
 * is NOT routed on its own) under docs/tutorials/, and is rendered here inside
 * TutorialShell with `markdown` — giving it the SAME look as the interactive
 * tutorials.
 *
 * To make your own:
 *   1. Write docs/tutorials/_my-tutorial.md
 *   2. Copy this file to src/pages/tutorials/my-tutorial.jsx and point SOURCE
 *      at your file (per-locale if you have a zh version).
 *   3. Register it in src/data/tutorials.js with kind: 'markdown'.
 *
 * (Tutorials that are really just a normal /docs page can skip this wrapper
 *  entirely — set the manifest href straight to the /docs/... route.)
 * ========================================================================= */

const SOURCE = {
  en: '/docs/tutorials/_sample-getting-started.md',
  zh: '/docs/tutorials/_sample-getting-started.md',
};

const content = {
  en: {
    badge: 'Markdown tutorial',
    title: 'Markdown tutorial — template',
    subtitle:
      'This whole page body is a Markdown file rendered inside the shared tutorial shell. Same hero, same typography, same dark mode as the interactive tutorials — just authored in .md.',
    meta: ['Beginner', 'Template'],
  },
  zh: {
    badge: 'Markdown 教程',
    title: 'Markdown 教程 — 模板',
    subtitle:
      '整个页面正文都是一个 Markdown 文件，在共享的教程外壳中渲染。与交互式教程相同的主视觉、排版与暗色模式 —— 只是用 .md 编写。',
    meta: ['入门', '模板'],
  },
};

export default function MarkdownTemplate() {
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale === 'zh' ? 'zh' : 'en';
  const c = content[locale];

  return (
    <TutorialShell badge={c.badge} title={c.title} subtitle={c.subtitle} meta={c.meta} markdown>
      <MarkdownSection source={SOURCE[locale] || SOURCE.en} />
    </TutorialShell>
  );
}
