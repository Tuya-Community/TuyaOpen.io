import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import TutorialShell from '@site/src/components/TutorialShell';
import BodyEn from '@site/docs/tutorials/_tuyaopen-ide-practice-2.md';
import BodyZh from '@site/docs/tutorials/zh/_tuyaopen-ide-practice-2.md';

/* =========================================================================
 * LEARN: Practice 2 — your_chat_bot end-to-end  (kind: 'markdown')
 * The classic AI + IoT project: cloud IoT / AI Agent development flow.
 * ========================================================================= */

const content = {
  en: {
    badge: 'TuyaOpen IDE · Practice 2',
    title: 'your_chat_bot — cloud AI Agent',
    subtitle:
      'Build the classic AI + IoT project end-to-end: create from an example, build and flash, authorize, and pair — the cloud IoT / AI Agent flow in the IDE.',
    meta: ['Intermediate', '20 min', 'IDE'],
    nav: [
      { id: 'modes', label: 'Two modes' },
      { id: 'step-1', label: '1. Create project' },
      { id: 'step-2', label: '2. Build & flash' },
      { id: 'step-3', label: '3. Authorize' },
      { id: 'step-4', label: '4. Pair' },
      { id: 'next', label: 'Next step' },
    ],
  },
  zh: {
    badge: 'TuyaOpen IDE · 实战二',
    title: 'your_chat_bot —— 云端 AI Agent',
    subtitle: '端到端搭建经典 AI + IoT 项目：从示例创建、编译烧录、授权到配网，讲清 IDE 中云端 IoT / AI Agent 流程。',
    meta: ['进阶', '20 分钟', 'IDE'],
    nav: [
      { id: 'modes', label: '两种模式' },
      { id: 'step-1', label: '一、创建项目' },
      { id: 'step-2', label: '二、编译烧录' },
      { id: 'step-3', label: '三、设备授权' },
      { id: 'step-4', label: '四、设备配网' },
      { id: 'next', label: '下一步' },
    ],
  },
};

export default function TuyaOpenIdePractice2() {
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
