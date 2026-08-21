import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import TutorialShell from '@site/src/components/TutorialShell';
import BodyEn from '@site/docs/tutorials/hardware-mcp-skills-smart-oven.md';
import BodyZh from '@site/docs/tutorials/zh/hardware-mcp-skills-smart-oven.md';

/* =========================================================================
 * LEARN: Hands-On — Build MCP Skills That Let AI Control Real Devices
 * (kind: 'markdown', category: 'tutorials')
 * Renders through TutorialShell directly (not CommunityProjectPage) so it
 * gets the same "On this page" TOC sidebar as the other tutorial-category
 * markdown pages (e.g. tuyaopen-ide-overview) — nav ids below must match the
 * <section id="..."> wrappers in the two source .md files.
 * ========================================================================= */

const content = {
  en: {
    badge: 'Tutorials',
    title: 'Hands-On: Build MCP Skills That Let AI Control Real Devices',
    subtitle:
      "Create hardware MCP skills (tool functions) that let an AI agent control physical devices — build an AI Smart Oven from scratch with TuyaOpen's MCP function-call framework.",
    meta: ['Intermediate', '30 min', 'MCP'],
    nav: [
      { id: 'what-youll-build', label: "What You'll Build" },
      { id: 'how-it-works', label: 'How It Works' },
      { id: 'step-1-cloud-product', label: '1. Cloud Product' },
      { id: 'step-2-mock-hardware', label: '2. Mock Hardware' },
      { id: 'step-3-register-tools', label: '3. Register MCP Tools' },
      { id: 'step-4-wire-boot', label: '4. Wire Boot Sequence' },
      { id: 'step-5-build-test', label: '5. Build and Test' },
      { id: 'complete-tool-set', label: 'Complete Tool Set' },
      { id: 'ai-coding-prompts', label: 'AI Coding Prompts' },
      { id: 'key-takeaways', label: 'Key Takeaways' },
      { id: 'next-steps', label: 'Next Steps' },
    ],
  },
  zh: {
    badge: '教程',
    title: '实战：给你的硬件装上大脑 — 构建让 AI 控制真实设备的 MCP 技能',
    subtitle:
      '学习如何创建硬件 MCP 技能（工具函数），让 AI Agent 控制物理设备——用 TuyaOpen 的 MCP Function Call 框架从零构建一台 AI 智能烤箱。',
    meta: ['进阶', '30 分钟', 'MCP'],
    nav: [
      { id: 'what-youll-build', label: '你将构建什么' },
      { id: 'how-it-works', label: '架构原理' },
      { id: 'step-1-cloud-product', label: '一、创建云端产品' },
      { id: 'step-2-mock-hardware', label: '二、Mock 硬件层' },
      { id: 'step-3-register-tools', label: '三、注册 MCP 工具' },
      { id: 'step-4-wire-boot', label: '四、接入启动流程' },
      { id: 'step-5-build-test', label: '五、构建与测试' },
      { id: 'complete-tool-set', label: '完整工具集' },
      { id: 'ai-coding-prompts', label: 'AI 编程提示词' },
      { id: 'key-takeaways', label: '核心要点' },
      { id: 'next-steps', label: '下一步' },
    ],
  },
};

export default function HardwareMcpSkillsSmartOven() {
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
