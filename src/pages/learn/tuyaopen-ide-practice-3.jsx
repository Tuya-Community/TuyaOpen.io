import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import TutorialShell from '@site/src/components/TutorialShell';
import BodyEn from '@site/docs/tutorials/_tuyaopen-ide-practice-3.md';
import BodyZh from '@site/docs/tutorials/zh/_tuyaopen-ide-practice-3.md';

/* =========================================================================
 * LEARN: Practice 3 — mini-app panel  (kind: 'markdown')
 * Build a device control panel (mini-app) that talks to firmware over DP.
 * ========================================================================= */

const content = {
  en: {
    badge: 'TuyaOpen IDE · Practice 3',
    title: 'Mini-app panel',
    subtitle:
      'Build a device control panel that runs in the phone app and cooperates with the firmware over DP (Data Points) — create, bind, preview, and publish.',
    meta: ['Intermediate', '20 min', 'IDE'],
    nav: [
      { id: 'dp-model', label: 'DP model' },
      { id: 'step-1', label: '1. Account & product' },
      { id: 'step-2', label: '2. Debug & preview' },
      { id: 'step-3', label: '3. Upload & publish' },
      { id: 'next', label: 'Go deeper' },
    ],
  },
  zh: {
    badge: 'TuyaOpen IDE · 实战三',
    title: '小程序面板',
    subtitle: '做一个跑在手机 App 里、通过 DP 与固件联动的设备控制面板——创建、绑定、预览、发布。',
    meta: ['进阶', '20 分钟', 'IDE'],
    nav: [
      { id: 'dp-model', label: 'DP 协作模型' },
      { id: 'step-1', label: '一、账号产品' },
      { id: 'step-2', label: '二、调试预览' },
      { id: 'step-3', label: '三、上传发布' },
      { id: 'next', label: '深入学习' },
    ],
  },
};

export default function TuyaOpenIdePractice3() {
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
