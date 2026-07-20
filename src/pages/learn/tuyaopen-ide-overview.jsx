import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import TutorialShell from '@site/src/components/TutorialShell';
import BodyEn from '@site/docs/tutorials/_tuyaopen-ide-overview.md';
import BodyZh from '@site/docs/tutorials/zh/_tuyaopen-ide-overview.md';

/* =========================================================================
 * LEARN: What is TuyaOpen IDE  (kind: 'markdown')
 * Concept doc — the entry point of the TuyaOpen IDE learning path.
 * Prose lives in docs/tutorials/_tuyaopen-ide-overview.md (en) and the
 * zh counterpart; this wrapper renders it inside TutorialShell with a TOC.
 * ========================================================================= */

const content = {
  en: {
    badge: 'TuyaOpen IDE',
    title: 'What is TuyaOpen IDE',
    subtitle:
      'TuyaOpen IDE is an AI-era embedded development environment: describe the device you want in natural language, and the AI Agent generates firmware, configures the cloud, and wires up the app.',
    meta: ['Beginner', 'Concept', 'IDE'],
    nav: [
      { id: 'what-is', label: 'What it is' },
      { id: 'what-it-can-do', label: 'What it can do' },
      { id: 'core-features', label: 'Core features' },
      { id: 'vs-traditional', label: 'vs Traditional' },
      { id: 'who-it-is-for', label: 'Who it is for' },
      { id: 'supported-boards', label: 'Supported boards' },
      { id: 'next', label: 'Next steps' },
    ],
  },
  zh: {
    badge: 'TuyaOpen IDE',
    title: 'TuyaOpen IDE 是什么',
    subtitle:
      'TuyaOpen IDE 是面向 AI 时代的嵌入式开发环境：用自然语言描述你要的设备，AI Agent 就会生成固件、配置云端、打通 App。',
    meta: ['入门', '概念', 'IDE'],
    nav: [
      { id: 'what-is', label: '是什么' },
      { id: 'what-it-can-do', label: '能做什么' },
      { id: 'core-features', label: '核心特性' },
      { id: 'vs-traditional', label: '与传统对比' },
      { id: 'who-it-is-for', label: '适用人群' },
      { id: 'supported-boards', label: '支持的开发板' },
      { id: 'next', label: '下一步' },
    ],
  },
};

export default function TuyaOpenIdeOverview() {
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale === 'zh' ? 'zh' : 'en';
  const c = content[locale];
  const Body = locale === 'zh' ? BodyZh : BodyEn;

  return (
    <TutorialShell badge={c.badge} title={c.title} subtitle={c.subtitle} meta={c.meta} nav={c.nav} markdown>
      <Body />
    </TutorialShell>
  );
}
