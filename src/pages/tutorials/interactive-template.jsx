import React, { useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { clsx } from 'clsx';
import TutorialShell from '@site/src/components/TutorialShell';
import shell from '@site/src/components/TutorialShell/styles.module.css';
import styles from './interactive-template.module.css';

/* =========================================================================
 * INTERACTIVE TUTORIAL TEMPLATE  (kind: 'interactive')
 * -------------------------------------------------------------------------
 * Copy this file to src/pages/tutorials/<your-slug>.jsx to start a new
 * interactive HTML tutorial, then add a matching entry to src/data/tutorials.js
 * with kind: 'interactive' and href: '/tutorials/<your-slug>'.
 *
 * Rules of the road for consistency:
 *   • Wrap everything in <TutorialShell> — it provides the hero, the sticky
 *     table of contents, and the shared page frame.
 *   • Build sections with <section id="…"> so the TOC can track them, and pass
 *     the same ids/labels to the shell's `nav` prop.
 *   • Use the exported helper classes from TutorialShell/styles.module.css
 *     (shell.block, shell.h2, shell.h3, shell.lead, shell.steps,
 *     shell.checkList, shell.callout, shell.codeBlock, shell.btnPrimary…).
 *     Only reach for a local module (styles.*) for genuinely bespoke widgets.
 *   • Keep copy bilingual via the `content` object, exactly like this file.
 * ========================================================================= */

const content = {
  en: {
    badge: 'Interactive tutorial',
    title: 'Interactive tutorial — template',
    subtitle:
      'A copy-me reference for building interactive TuyaOpen tutorials. It shows the hero, sticky contents, callouts, code blocks, and a small live widget — all in the shared style.',
    meta: ['Beginner', 'Template'],
    nav: [
      { id: 'intro', label: 'Introduction' },
      { id: 'steps', label: 'Steps' },
      { id: 'widget', label: 'Live widget' },
      { id: 'next', label: 'Next steps' },
    ],
    introTitle: 'Introduction',
    introLead:
      'Interactive tutorials are plain React pages. Because they render inside TutorialShell, they automatically match the markdown tutorials — same hero, same typography, same dark mode.',
    introTip:
      'Prefer the shell helper classes over custom CSS. That is what keeps every tutorial looking like it belongs to the same set.',
    stepsTitle: 'Steps',
    stepsLead: 'Numbered steps use the shell’s step list so spacing and colour are consistent:',
    steps: [
      'Copy this file and rename it to your tutorial slug.',
      'Update the bilingual `content` object with your copy.',
      'Add matching <section id> blocks and TOC entries.',
      'Register the tutorial in src/data/tutorials.js.',
    ],
    codeIntro: 'Show commands with the shared code block:',
    widgetTitle: 'Live widget',
    widgetLead:
      'This is the part markdown cannot do — real interactivity. Pick a board and the flash command updates instantly.',
    widgetBoardLabel: 'Board',
    widgetPortLabel: 'Port',
    widgetPortAuto: 'auto-detect',
    widgetOut: 'Flash command',
    nextTitle: 'Next steps',
    nextLead: 'When your tutorial is ready:',
    nextPoints: [
      'Verify it renders in both English and 简体中文.',
      'Confirm the card shows up under the right filter on /tutorials.',
      'Ask for review before publishing.',
    ],
    docsBtn: 'Browse the docs',
  },
  zh: {
    badge: '交互式教程',
    title: '交互式教程 — 模板',
    subtitle:
      '一个可复制的参考页，用于构建 TuyaOpen 交互式教程。展示了主视觉、粘性目录、提示框、代码块和一个实时小组件 —— 全部采用共享样式。',
    meta: ['入门', '模板'],
    nav: [
      { id: 'intro', label: '简介' },
      { id: 'steps', label: '步骤' },
      { id: 'widget', label: '实时组件' },
      { id: 'next', label: '后续' },
    ],
    introTitle: '简介',
    introLead:
      '交互式教程就是普通的 React 页面。由于它们在 TutorialShell 中渲染，会自动与 Markdown 教程保持一致 —— 相同的主视觉、相同的排版、相同的暗色模式。',
    introTip: '优先使用外壳提供的辅助类而非自定义 CSS，这样每篇教程看起来才像同一套。',
    stepsTitle: '步骤',
    stepsLead: '编号步骤使用外壳的步骤列表，间距与配色保持一致：',
    steps: [
      '复制本文件并重命名为你的教程别名。',
      '用你的文案更新双语 `content` 对象。',
      '添加对应的 <section id> 区块与目录项。',
      '在 src/data/tutorials.js 中注册该教程。',
    ],
    codeIntro: '用共享代码块展示命令：',
    widgetTitle: '实时组件',
    widgetLead: '这是 Markdown 做不到的部分 —— 真正的交互。选择开发板，烧录命令会立即更新。',
    widgetBoardLabel: '开发板',
    widgetPortLabel: '串口',
    widgetPortAuto: '自动检测',
    widgetOut: '烧录命令',
    nextTitle: '后续',
    nextLead: '当你的教程准备就绪：',
    nextPoints: [
      '确认在英文与简体中文下都能正常渲染。',
      '确认卡片在 /tutorials 的正确分类下出现。',
      '发布前请先请人评审。',
    ],
    docsBtn: '浏览文档',
  },
};

const BOARDS = [
  { id: 't5ai', label: 'T5AI' },
  { id: 'bk7231n', label: 'BK7231N' },
  { id: 'esp32', label: 'ESP32' },
];

function FlashWidget({ c }) {
  const [board, setBoard] = useState(BOARDS[0].id);
  const [port, setPort] = useState('');
  const cmd = `tyutool write -d ${board}${port ? ` -p ${port}` : ''} -f app_QIO.bin`;

  return (
    <div className={styles.widget}>
      <div className={styles.widgetControls}>
        <label className={styles.widgetField}>
          <span>{c.widgetBoardLabel}</span>
          <select value={board} onChange={(e) => setBoard(e.target.value)} className={styles.select}>
            {BOARDS.map((b) => (
              <option key={b.id} value={b.id}>
                {b.label}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.widgetField}>
          <span>{c.widgetPortLabel}</span>
          <input
            className={styles.input}
            value={port}
            placeholder={c.widgetPortAuto}
            onChange={(e) => setPort(e.target.value.trim())}
          />
        </label>
      </div>
      <div className={styles.widgetOut}>
        <span className={styles.widgetOutLabel}>{c.widgetOut}</span>
        <code>{cmd}</code>
      </div>
    </div>
  );
}

export default function InteractiveTemplate() {
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale === 'zh' ? 'zh' : 'en';
  const c = content[locale];
  const docsHref = locale === 'zh' ? '/zh/docs/about-tuyaopen' : '/docs/about-tuyaopen';

  return (
    <TutorialShell badge={c.badge} title={c.title} subtitle={c.subtitle} meta={c.meta} nav={c.nav}>
      {/* Intro */}
      <section id="intro" className={shell.block}>
        <h2 className={shell.h2}>{c.introTitle}</h2>
        <p className={shell.lead}>{c.introLead}</p>
        <div className={clsx(shell.callout, shell.calloutTip)}>
          <p>{c.introTip}</p>
        </div>
      </section>

      {/* Steps */}
      <section id="steps" className={shell.block}>
        <h2 className={shell.h2}>{c.stepsTitle}</h2>
        <p className={shell.lead}>{c.stepsLead}</p>
        <ol className={shell.steps}>
          {c.steps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
        <p>{c.codeIntro}</p>
        <pre className={shell.codeBlock}>
          <code>{`cp interactive-template.jsx my-tutorial.jsx
# then edit content{} and register it in src/data/tutorials.js`}</code>
        </pre>
      </section>

      {/* Widget */}
      <section id="widget" className={shell.block}>
        <h2 className={shell.h2}>{c.widgetTitle}</h2>
        <p className={shell.lead}>{c.widgetLead}</p>
        <FlashWidget c={c} />
      </section>

      {/* Next */}
      <section id="next" className={shell.block}>
        <h2 className={shell.h2}>{c.nextTitle}</h2>
        <p className={shell.lead}>{c.nextLead}</p>
        <ul className={shell.checkList}>
          {c.nextPoints.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
        <p style={{ marginTop: '1.5rem' }}>
          <a className={shell.btnPrimary} href={docsHref}>
            {c.docsBtn}
          </a>
        </p>
      </section>
    </TutorialShell>
  );
}
