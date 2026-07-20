import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import TutorialShell from '@site/src/components/TutorialShell';
import BodyEn from '@site/docs/tutorials/_tuyaopen-ide-vibe-coding.md';
import BodyZh from '@site/docs/tutorials/zh/_tuyaopen-ide-vibe-coding.md';

/* =========================================================================
 * LEARN: Vibe Coding skills  (kind: 'markdown')
 * Copy-paste prompts for the skills that install inside TuyaOpen IDE.
 * ========================================================================= */

const content = {
  en: {
    badge: 'TuyaOpen IDE',
    title: 'Vibe Coding skills',
    subtitle:
      'Skills you can install inside TuyaOpen IDE to let the AI Agent run the development loop — grouped by scenario with ready-to-paste prompts.',
    meta: ['Beginner → Intermediate', 'Reference', 'IDE'],
    nav: [
      { id: 'hardware', label: '1. Hardware peripherals' },
      { id: 'product', label: '2. IoT product' },
      { id: 'platform', label: '3. Platform ops' },
      { id: 'dev-loop', label: '4. Build / flash / debug' },
      { id: 'panel', label: '5. Mini-app panels' },
      { id: 'next', label: 'Next step' },
    ],
  },
  zh: {
    badge: 'TuyaOpen IDE',
    title: 'Vibe Coding 技能',
    subtitle: '可在 TuyaOpen IDE 内安装的 skills，让 AI Agent 跑通开发循环——按场景分组，附可直接复制的提示词。',
    meta: ['入门 → 进阶', '参考', 'IDE'],
    nav: [
      { id: 'hardware', label: '一、硬件外设' },
      { id: 'product', label: '二、IoT 产品' },
      { id: 'platform', label: '三、平台操作' },
      { id: 'dev-loop', label: '四、构建/烧录/调试' },
      { id: 'panel', label: '五、小程序面板' },
      { id: 'next', label: '下一步' },
    ],
  },
};

export default function TuyaOpenIdeVibeCoding() {
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
