import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import TutorialShell from '@site/src/components/TutorialShell';
import BodyEn from '@site/docs/tutorials/_tuyaopen-ide-install.md';
import BodyZh from '@site/docs/tutorials/zh/_tuyaopen-ide-install.md';

/* =========================================================================
 * LEARN: Install TuyaOpen IDE  (kind: 'markdown')
 * How-to — install the extension in VS Code or Cursor (AI-agent or manual
 * .vsix), verify, and troubleshoot.
 * ========================================================================= */

const content = {
  en: {
    badge: 'TuyaOpen IDE',
    title: 'Install TuyaOpen IDE',
    subtitle:
      'Install the TuyaOpen IDE extension in VS Code or Cursor — by letting an AI coding agent do it, or from the manual .vsix — then verify it is enabled.',
    meta: ['Beginner', '5 min', 'IDE'],
    nav: [
      { id: 'before-install', label: 'Before you install' },
      { id: 'ai-agent-install', label: 'Method 1: AI agent' },
      { id: 'manual-vsix', label: 'Method 2: manual .vsix' },
      { id: 'verify', label: 'Verify' },
      { id: 'troubleshoot', label: 'Troubleshoot' },
      { id: 'next', label: 'Next step' },
    ],
  },
  zh: {
    badge: 'TuyaOpen IDE',
    title: '安装 TuyaOpen IDE',
    subtitle:
      '在 VS Code 或 Cursor 中安装 TuyaOpen IDE 扩展——让 AI 编程 Agent 帮你装，或用手动 .vsix 安装，然后验证已启用。',
    meta: ['入门', '5 分钟', 'IDE'],
    nav: [
      { id: 'before-install', label: '安装前准备' },
      { id: 'ai-agent-install', label: '方式一：AI Agent' },
      { id: 'manual-vsix', label: '方式二：手动 .vsix' },
      { id: 'verify', label: '验证安装' },
      { id: 'troubleshoot', label: '故障排查' },
      { id: 'next', label: '下一步' },
    ],
  },
};

export default function TuyaOpenIdeInstall() {
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
