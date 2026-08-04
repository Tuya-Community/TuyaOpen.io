import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import TutorialShell from '@site/src/components/TutorialShell';
import BodyEn from '@site/docs/tutorials/_tuyaopen-ide-practice-4.md';
import BodyZh from '@site/docs/tutorials/zh/_tuyaopen-ide-practice-4.md';

/* =========================================================================
 * LEARN: Practice 4 — Linux board Hello World  (kind: 'markdown')
 * Deploy the simplest Hello World to a Linux board (Raspberry Pi) via the
 * IDE's cross-deploy workflow: build → deploy over SSH → run.
 * ========================================================================= */

const content = {
  en: {
    badge: 'TuyaOpen IDE · Practice 4',
    title: 'Linux board Hello World',
    subtitle:
      'Deploy the simplest Hello World to a Linux board (like a Raspberry Pi) from the IDE — build, deploy over SSH, and run. The cross-deploy workflow for Linux targets.',
    meta: ['Intermediate', '15 min', 'IDE'],
    nav: [
      { id: 'prereq', label: 'Prerequisites' },
      { id: 'diff', label: 'MCU vs Linux board' },
      { id: 'step-1', label: '1. Create project' },
      { id: 'step-2', label: '2. SSH' },
      { id: 'step-3', label: '3. Build' },
      { id: 'step-4', label: '4. Deploy' },
      { id: 'step-5', label: '5. Run' },
      { id: 'next', label: 'Go deeper' },
    ],
  },
  zh: {
    badge: 'TuyaOpen IDE · 实战四',
    title: 'Linux 板 Hello World',
    subtitle: '用 IDE 把最简单的 Hello World 一键部署到树莓派这类 Linux 开发板——编译、SSH 部署、运行，跑通 Linux 板的 cross-deploy 工作流。',
    meta: ['进阶', '15 分钟', 'IDE'],
    nav: [
      { id: 'prereq', label: '前置条件' },
      { id: 'diff', label: '与 MCU 板的区别' },
      { id: 'step-1', label: '一、创建工程' },
      { id: 'step-2', label: '二、配置 SSH' },
      { id: 'step-3', label: '三、编译' },
      { id: 'step-4', label: '四、部署' },
      { id: 'step-5', label: '五、运行' },
      { id: 'next', label: '下一步' },
    ],
  },
};

export default function TuyaOpenIdePractice4() {
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
