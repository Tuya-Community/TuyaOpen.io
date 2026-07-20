import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import TutorialShell from '@site/src/components/TutorialShell';
import BodyEn from '@site/docs/tutorials/_tuyaopen-ide-practice-1.md';
import BodyZh from '@site/docs/tutorials/zh/_tuyaopen-ide-practice-1.md';

/* =========================================================================
 * LEARN: Practice 1 — Hello World  (kind: 'markdown')
 * The smallest closed loop: pick board → build → flash → read logs. No code.
 * ========================================================================= */

const content = {
  en: {
    badge: 'TuyaOpen IDE · Practice 1',
    title: 'Hello World — IDE basics',
    subtitle:
      'Run an official example with zero code and learn the core TuyaOpen IDE chain: pick board → build → flash → read logs.',
    meta: ['Beginner', '15 min', 'IDE'],
    nav: [
      { id: 'prereq', label: 'Prerequisites' },
      { id: 'step-1', label: '1. Board catalogue' },
      { id: 'step-2', label: '2. Create project' },
      { id: 'step-3', label: '3. Build' },
      { id: 'step-4', label: '4. Flash' },
      { id: 'step-5', label: '5. Monitor' },
      { id: 'next', label: 'Next step' },
    ],
  },
  zh: {
    badge: 'TuyaOpen IDE · 实战一',
    title: 'Hello World —— IDE 基础操作',
    subtitle: '不写一行代码跑通官方示例，掌握 TuyaOpen IDE 核心链路：选板 → 编译 → 烧录 → 看日志。',
    meta: ['入门', '15 分钟', 'IDE'],
    nav: [
      { id: 'prereq', label: '前置条件' },
      { id: 'step-1', label: '一、开发板目录' },
      { id: 'step-2', label: '二、创建项目' },
      { id: 'step-3', label: '三、编译' },
      { id: 'step-4', label: '四、烧录' },
      { id: 'step-5', label: '五、监控日志' },
      { id: 'next', label: '下一步' },
    ],
  },
};

export default function TuyaOpenIdePractice1() {
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
