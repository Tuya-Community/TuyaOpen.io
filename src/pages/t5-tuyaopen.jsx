import Head from '@docusaurus/Head'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import clsx from 'clsx'
import React, { useEffect, useRef, useState } from 'react'

import { T5_CHIPSET_DATASHEET_URL, T5_FEATURE_COLUMNS } from '../data/t5-tuyaopen-features-data'
import styles from './t5-tuyaopen.module.css'

const PARTICLE_LAYOUT = [
  { left: '8%', top: '75%', delay: '0s' },
  { left: '15%', top: '20%', delay: '1s' },
  { left: '22%', top: '55%', delay: '2s' },
  { left: '35%', top: '12%', delay: '0.5s' },
  { left: '42%', top: '80%', delay: '3s' },
  { left: '55%', top: '30%', delay: '1.5s' },
  { left: '62%', top: '65%', delay: '2.5s' },
  { left: '78%', top: '18%', delay: '0.8s' },
  { left: '88%', top: '50%', delay: '2.2s' },
  { left: '92%', top: '85%', delay: '1.2s' },
  { left: '5%', top: '40%', delay: '3.5s' },
  { left: '70%', top: '88%', delay: '0.3s' },
]

const DEV_KIT_IMAGE = 'https://images.tuyacn.com/fe-static/docs/img/c230edfa-ff75-400a-80c2-298cadfe5202.jpg'
const DEV_KIT_PINOUT_IMAGE = 'https://images.tuyacn.com/fe-static/docs/img/2730839b-37f9-4135-8181-a7da2315c466.jpg'
const SDK_ARCH_IMAGE = 'https://images.tuyacn.com/fe-static/docs/img/28d06828-e246-4bef-acbb-408166748400.png'
const BLOCK_DIAGRAM_IMAGE = 'https://images.tuyacn.com/fe-static/docs/img/4cd94493-c714-4604-8b0c-8a3a6bb7599b.png'
const METHOD_IMAGES = {
  csdk: 'https://images.tuyacn.com/fe-static/docs/img/676cbf7e-74bd-4871-a4e1-d8dd1538d3fc.png',
  arduino: 'https://images.tuyacn.com/fe-static/docs/img/ab667c2a-f784-4dfb-ae21-1837ea7c21f6.png',
  lua: 'https://images.tuyacn.com/fe-static/docs/img/46cd082a-1dbf-4193-93ec-8dcdb6a32c39.png',
}

/* ----------------------------------------------------------------------- */
/* Bilingual copy                                                          */
/* ----------------------------------------------------------------------- */

const COPY = {
  en: {
    meta: {
      title: 'Tuya T5 Chip',
      description: 'A powerful Wi-Fi and Bluetooth connectivity MCU for next-gen AIoT products.',
    },
    hero: {
      eyebrow: 'Tuya T5 Connectivity MCU',
      titlePre: 'Built for Agentic AI ',
      titleAccent: 'Multimodal Interfacing',
      sub: 'Tuya T5 delivers robust wireless connectivity, low power operation, and rich peripherals for audio, vision, and sensor interfaces in advanced AIoT products.',
      highlight: 'AI workloads run in the cloud, while T5 handles real-world multisensory device interfacing',
      ctaPrimary: 'Get started',
      ctaGhost: 'View dev kits',
    },
    chip: {
      line2: 'Wi-Fi 6 (2.4 GHz) + BLE 5.4',
      moduleBadge: 'Module',
      stack: ['ARMv8-M 480MHz', 'Camera / Audio / Graphics', 'Low Power', 'Agentic AI Ready', 'Tuya Cloud Integration'],
    },
    t5: {
      title: 'Tuya T5: built for Agentic AI gadgets',
      sub: 'Tuya T5’s capability stack is the all-in-one foundation for Agentic AI — speed, connectivity, and efficiency in one place.',
      imgAlt: 'Tuya T5AI development board',
      specs: [
        'Flagship Processing: **480MHz** ARMv8-M Star Core (DSP + FPU).',
        'All-in-One Peripherals: **1080p** camera, premium audio, smooth display — everything for immersive smart experiences.',
        'Ultra-Low Power: **22nm** process (**16μA** deep sleep) for always-on AI without battery drain.',
        'Dual-Mode Connectivity: **Wi-Fi 6** + **Bluetooth 5.4 LE** — fast, stable, long-range connectivity.',
      ],
    },
    open: {
      imgAlt: 'TuyaOpen C SDK system architecture diagram',
      badge: 'Trusted by 1.3M+ developers',
      title: 'TuyaOpen: scale Tuya T5 products globally',
      sub: 'TuyaOpen turns Tuya T5’s raw power into market-ready innovation — cut development time, reduce costs, and scale faster.',
      benefitsLead: 'TuyaOpen’s benefits for developers',
      benefits: [
        { title: 'Open-Source Freedom, Enterprise Reliability', desc: 'No lock-in, proven code validated by billions of devices.', icon: 'lock' },
        { title: 'Seamless AI Integration', desc: 'Edge-cloud intelligence and LLM integrations, optimized for Tuya T5.', icon: 'brain' },
        { title: 'Fast Development', desc: 'Zero-code to full-code flexibility — prototype in 8 hours, mass-produce in 15 days.', icon: 'speed' },
        { title: 'Global Security & Scale', desc: 'Compliant cloud, multi-layer security, and OTA updates worldwide.', icon: 'globe' },
      ],
    },
    why: {
      title: 'Why Tuya T5 + TuyaOpen = Agentic AI success',
      sub: 'From silicon to software to shipment — one aligned path for intelligent devices.',
      cards: [
        { n: 1, title: 'Real-Time Local AI', body: 'Powered by TFLite-ready CPU performance with AI inference support, and comes with KWS plus realtime audio 3A AI algos.', icon: 'clock' },
        { n: 2, title: 'All-in-One Ecosystem', body: 'Cut development time by 60%+ with pre-integrated SDKs and developer support.', icon: 'puzzle' },
        { n: 3, title: 'Production-Ready', body: 'Pre-certified modules, firmware services, and OEM/ODM support for fast scaling.', icon: 'factory' },
        { n: 4, title: 'Unlimited Versatility', body: 'Build any Agentic AI gadget — no hardware or platform restrictions.', icon: 'infinity' },
      ],
    },
    devkit: {
      imgAlt: 'Tuya T5 dev kit board pinout diagram',
      title: 'Start building today: T5 dev kit + TuyaOpen',
      sub: 'Turn your vision into a working prototype in hours with hardware fully integrated with TuyaOpen tools.',
      includesLabel: 'Dev kit includes',
      items: [
        'Pre-certified Tuya T5 module (802.11ax 2.4 GHz Wi-Fi 6 + Bluetooth 5.4 LE)',
        'Full peripheral breakout (camera, LCD, audio, USB-C)',
        'Pre-installed TuyaOpen SDK (AI libraries, LVGL graphics)',
        'TuyaOpen setup guide + code examples',
      ],
      bonusLabel: 'Bonus:',
      bonusText: 'Join TuyaOpen’s Discord and developer community for support and collaboration.',
      orderCta: 'Order dev kit',
    },
    methods: {
      title: 'Development methods that fit your workflow',
      sub: 'Choose the stack you prefer — Tuya T5 and TuyaOpen support multiple paths from bring-up to production.',
      cards: [
        { title: 'TuyaOpen C SDK', desc: 'Enterprise-grade, full-featured SDK for deep customization and high-performance Tuya T5 projects.', image: METHOD_IMAGES.csdk },
        { title: 'Arduino IDE', desc: 'Beginner-friendly environment with a large community and pre-built libraries for rapid prototyping.', image: METHOD_IMAGES.arduino },
        { title: 'Lua', desc: 'Lightweight, script-based development for fast iterations from simple to complex Tuya T5 applications.', image: METHOD_IMAGES.lua },
      ],
    },
    use: {
      title: 'Ideal use cases',
      sub: 'Where chip performance, TuyaOpen middleware, and cloud applications converge.',
      hint: 'Swipe to explore →',
      cards: [
        { title: 'AI Smart Glasses', desc: 'Voice assistant, camera / vision pipeline, BLE audio — powered by Tuya T5, simplified by TuyaOpen.', icon: 'glasses' },
        { title: 'Smart Home Agents', desc: 'Voice hubs, vision sensors, HMI panels — fast to build, easy to scale.', icon: 'home' },
        { title: 'Wearable AI Cameras', desc: 'Local AI, Wi-Fi streaming, long battery life — leveraging Tuya T5’s efficiency.', icon: 'camera' },
        { title: 'Industrial AI Sensors', desc: 'Machine vision, predictive maintenance — secured by Tuya’s security stack.', icon: 'sensor' },
        { title: 'Smart Medical Devices', desc: 'Health monitoring, local AI — aligned with global compliance expectations.', icon: 'medical' },
      ],
    },
    specs: {
      title: 'Specs',
      systemDiagram: 'System Diagram',
      moduleDatasheet: 'Module datasheet',
      chipsetDatasheet: 'T5 ChipSet Datasheet',
      diagramAlt: 'Tuya T5 block diagram',
      enlargeAria: 'Enlarge Tuya T5 block diagram',
    },
    final: {
      title: 'Lead the Agentic AI revolution — start now',
      sub: 'Lead the Agentic AI era — powered by Tuya T5, enabled by TuyaOpen.',
      exploreDocs: 'Explore documentation',
      getDevKits: 'Get dev kits',
      starGithub: 'Star on GitHub',
      tagline: 'Chip · TuyaOpen stack · Applications — ship with confidence',
    },
  },

  zh: {
    meta: {
      title: 'Tuya T5 芯片',
      description: '面向下一代 AIoT 产品的强大 Wi-Fi 与蓝牙连接 MCU。',
    },
    hero: {
      eyebrow: 'Tuya T5 连接 MCU',
      titlePre: '为智能体 AI 而生的',
      titleAccent: '多模态交互',
      sub: 'Tuya T5 为先进的 AIoT 产品提供稳定的无线连接、低功耗运行，以及面向音频、视觉与传感接口的丰富外设。',
      highlight: 'AI 运算在云端运行，而 T5 负责真实世界的多感官设备交互',
      ctaPrimary: '快速开始',
      ctaGhost: '查看开发套件',
    },
    chip: {
      line2: 'Wi-Fi 6 (2.4 GHz) + BLE 5.4',
      moduleBadge: '模组',
      stack: ['ARMv8-M 480MHz', '摄像头 / 音频 / 图形', '低功耗', '智能体 AI 就绪', '涂鸦云集成'],
    },
    t5: {
      title: 'Tuya T5：为智能体 AI 设备而生',
      sub: 'Tuya T5 的能力栈是智能体 AI 的一体化基石——速度、连接与能效集于一身。',
      imgAlt: 'Tuya T5AI 开发板',
      specs: [
        '旗舰算力：**480MHz** ARMv8-M Star 内核（DSP + FPU）。',
        '一体化外设：**1080p** 摄像头、高品质音频、流畅显示——打造沉浸式智能体验所需的一切。',
        '超低功耗：**22nm** 工艺（深度睡眠 **16μA**），实现常开 AI 而不耗尽电量。',
        '双模连接：**Wi-Fi 6** + **蓝牙 5.4 LE**——快速、稳定、远距离连接。',
      ],
    },
    open: {
      imgAlt: 'TuyaOpen C SDK 系统架构图',
      badge: '已获 130 万+ 开发者信赖',
      title: 'TuyaOpen：让 Tuya T5 产品走向全球',
      sub: 'TuyaOpen 将 Tuya T5 的强大性能转化为可上市的创新——缩短开发周期、降低成本、更快规模化。',
      benefitsLead: 'TuyaOpen 为开发者带来的优势',
      benefits: [
        { title: '开源的自由，企业级的可靠', desc: '无厂商锁定，代码经数十亿设备验证。', icon: 'lock' },
        { title: '无缝 AI 集成', desc: '端云协同智能与大模型集成，针对 Tuya T5 优化。', icon: 'brain' },
        { title: '快速开发', desc: '从零代码到全代码灵活自如——8 小时出原型，15 天可量产。', icon: 'speed' },
        { title: '全球安全与规模化', desc: '合规云服务、多层安全防护与全球 OTA 升级。', icon: 'globe' },
      ],
    },
    why: {
      title: '为什么 Tuya T5 + TuyaOpen = 智能体 AI 的成功',
      sub: '从芯片到软件再到量产交付——为智能设备打造的一条贯通路径。',
      cards: [
        { n: 1, title: '实时本地 AI', body: '具备支持 AI 推理的 TFLite-ready CPU 性能，内置 KWS 关键词唤醒与实时音频 3A AI 算法。', icon: 'clock' },
        { n: 2, title: '一体化生态', body: '凭借预集成 SDK 与开发者支持，开发时间缩短 60% 以上。', icon: 'puzzle' },
        { n: 3, title: '量产就绪', body: '预认证模组、固件服务与 OEM/ODM 支持，助力快速规模化。', icon: 'factory' },
        { n: 4, title: '无限可能', body: '打造任意智能体 AI 设备——不受硬件或平台限制。', icon: 'infinity' },
      ],
    },
    devkit: {
      imgAlt: 'Tuya T5 开发套件引脚图',
      title: '即刻开始构建：T5 开发套件 + TuyaOpen',
      sub: '借助与 TuyaOpen 工具深度集成的硬件，数小时内将你的构想变为可运行的原型。',
      includesLabel: '开发套件包含',
      items: [
        '预认证 Tuya T5 模组（802.11ax 2.4 GHz Wi-Fi 6 + 蓝牙 5.4 LE）',
        '完整外设引出（摄像头、LCD、音频、USB-C）',
        '预装 TuyaOpen SDK（AI 库、LVGL 图形）',
        'TuyaOpen 上手指南 + 代码示例',
      ],
      bonusLabel: '福利：',
      bonusText: '加入 TuyaOpen 的 Discord 与开发者社区，获取支持与协作。',
      orderCta: '订购开发套件',
    },
    methods: {
      title: '契合你工作流的开发方式',
      sub: '选择你偏好的技术栈——Tuya T5 与 TuyaOpen 支持从点亮到量产的多种路径。',
      cards: [
        { title: 'TuyaOpen C SDK', desc: '企业级、功能完整的 SDK，适合深度定制与高性能 Tuya T5 项目。', image: METHOD_IMAGES.csdk },
        { title: 'Arduino IDE', desc: '对新手友好的环境，拥有庞大社区与现成库，适合快速原型开发。', image: METHOD_IMAGES.arduino },
        { title: 'Lua', desc: '轻量的脚本式开发，让从简单到复杂的 Tuya T5 应用都能快速迭代。', image: METHOD_IMAGES.lua },
      ],
    },
    use: {
      title: '理想应用场景',
      sub: '芯片性能、TuyaOpen 中间件与云端应用的交汇之处。',
      hint: '滑动浏览 →',
      cards: [
        { title: 'AI 智能眼镜', desc: '语音助手、摄像头/视觉管线、BLE 音频——由 Tuya T5 驱动，TuyaOpen 化繁为简。', icon: 'glasses' },
        { title: '智能家居智能体', desc: '语音中枢、视觉传感器、HMI 面板——构建快速，扩展轻松。', icon: 'home' },
        { title: '可穿戴 AI 相机', desc: '本地 AI、Wi-Fi 推流、长续航——充分发挥 Tuya T5 的能效优势。', icon: 'camera' },
        { title: '工业 AI 传感器', desc: '机器视觉、预测性维护——由涂鸦安全体系保驾护航。', icon: 'sensor' },
        { title: '智能医疗设备', desc: '健康监测、本地 AI——满足全球合规要求。', icon: 'medical' },
      ],
    },
    specs: {
      title: '规格参数',
      systemDiagram: '系统框图',
      moduleDatasheet: '模组规格书',
      chipsetDatasheet: 'T5 芯片规格书',
      diagramAlt: 'Tuya T5 系统框图',
      enlargeAria: '放大 Tuya T5 系统框图',
    },
    final: {
      title: '引领智能体 AI 革命——立即开始',
      sub: '引领智能体 AI 时代——由 Tuya T5 驱动，由 TuyaOpen 赋能。',
      exploreDocs: '浏览文档',
      getDevKits: '获取开发套件',
      starGithub: '在 GitHub 上 Star',
      tagline: '芯片 · TuyaOpen 技术栈 · 应用——放心交付',
    },
  },
}

function IconCheck() {
  return (
    <svg className={styles.check} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SpecLine({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <li className={styles.specItem}>
      <IconCheck />
      <span>
        {parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            const inner = part.slice(2, -2)
            return (
              <span key={i} className={styles.accent}>
                {inner}
              </span>
            )
          }
          return <React.Fragment key={i}>{part}</React.Fragment>
        })}
      </span>
    </li>
  )
}

function BenefitIcon({ name }) {
  const common = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.75 }
  switch (name) {
    case 'lock':
      return (
        <svg {...common}>
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 018 0v4" />
        </svg>
      )
    case 'brain':
      return (
        <svg {...common}>
          <path d="M12 5a3 3 0 00-3 3v1H7a2 2 0 00-2 2v2a2 2 0 002 2h1v1a3 3 0 006 0v-1h1a2 2 0 002-2v-2a2 2 0 00-2-2h-2V8a3 3 0 00-3-3z" />
        </svg>
      )
    case 'speed':
      return (
        <svg {...common}>
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      )
    case 'globe':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15 15 0 0110 10 15 15 0 01-10 10 15 15 0 01-10-10 15 15 0 0110-10z" />
        </svg>
      )
    default:
      return null
  }
}

function MethodIcon({ name }) {
  const common = { className: styles.methodIcon, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 }
  if (name === 'code') {
    return (
      <svg {...common}>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    )
  }
  if (name === 'arduino') {
    return (
      <svg {...common}>
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path d="M14 2v6h6M10 13h4M10 17h4" />
    </svg>
  )
}

function UseIcon({ name }) {
  const c = { className: styles.useIcon, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 }
  const icons = {
    glasses: (
      <svg {...c}>
        <circle cx="6" cy="12" r="4" />
        <circle cx="18" cy="12" r="4" />
        <path d="M10 12h4M2 12h2M22 12h-2" />
      </svg>
    ),
    home: (
      <svg {...c}>
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    camera: (
      <svg {...c}>
        <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
    sensor: (
      <svg {...c}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    medical: (
      <svg {...c}>
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  }
  return icons[name] || icons.home
}

function WhyIcon({ name }) {
  const s = { width: 20, height: 20, stroke: 'currentColor', fill: 'none', strokeWidth: 1.75 }
  if (name === 'clock') {
    return (
      <svg viewBox="0 0 24 24" {...s}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    )
  }
  if (name === 'puzzle') {
    return (
      <svg viewBox="0 0 24 24" {...s}>
        <path d="M12 2v4M12 18v4M4.5 8.5l3 1.5M16.5 14l3 1.5M8.5 4.5L10 7.5M14 16.5l1.5 3M19.5 8.5L17 10M5 14l-1.5 3" />
      </svg>
    )
  }
  if (name === 'factory') {
    return (
      <svg viewBox="0 0 24 24" {...s}>
        <path d="M2 22h20M4 22V10l4 3V10l4 3V6h8v16" />
        <path d="M9 18h1M14 18h1M9 14h1M14 14h1" />
      </svg>
    )
  }
  return (
    <span style={{ fontSize: '1.125rem', fontWeight: 800, lineHeight: 1, fontFamily: 'system-ui, sans-serif' }} aria-hidden>
      ∞
    </span>
  )
}

function HeroChipVisual({ stack, moduleBadge, line2 }) {
  return (
    <div className={styles.heroChipShell}>
      <div className={styles.heroChipStage}>
        <div className={styles.heroChipTilt}>
          <div className={styles.heroChipAmbient} aria-hidden />
          <div className={styles.heroChipColumn}>
            <div className={styles.heroChipRing}>
              <div className={styles.heroChipInner}>
                <div className={styles.heroChipText}>
                  <span className={styles.heroChipLine1}>Tuya T5</span>
                  <span className={styles.heroChipLine2}>{line2}</span>
                </div>
                <span className={styles.heroChipModuleBadge}>{moduleBadge}</span>
              </div>
            </div>
            {stack.map((label, i) => (
              <div key={label} className={styles.heroStackLayer} style={{ '--stackI': i, zIndex: 9 - i }}>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function FeatureColumn({ groups, moduleDatasheetLabel }) {
  return (
    <>
      {groups.map((g) => (
        <div key={g.title} className={styles.featureGroupCard}>
          <h3 className={styles.featureGroupTitle}>{g.title}</h3>
          <ul className={styles.featureBulletList}>
            {g.bullets.map((line, i) => (
              <li key={`${g.title}-${i}`}>
                {typeof line === 'string' ? line : line.text}
                {typeof line !== 'string' && line.modelDetails && line.modelDetails.length > 0 ? (
                  <div className={styles.packagingModelGrid}>
                    {line.modelDetails.map((model) => (
                      <div key={model.name} className={styles.packagingModelCard}>
                        {model.image ? (
                          <img
                            className={styles.packagingModelImage}
                            src={model.image}
                            alt={`${model.name} package pinout`}
                            loading="lazy"
                          />
                        ) : null}
                        <p className={styles.packagingModelName}>{model.name}</p>
                        <p className={styles.packagingModelMeta}>{model.meta}</p>
                        <p className={styles.packagingModelDims}>{model.dimensions}</p>
                        {model.href ? (
                          <a className={styles.packagingModelLink} href={model.href} target="_blank" rel="noopener noreferrer">
                            {moduleDatasheetLabel}
                          </a>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : null}
                {typeof line !== 'string' && line.subBullets && line.subBullets.length > 0 ? (
                  <ul className={styles.featureSubBulletList}>
                    {line.subBullets.map((sub, subIdx) => (
                      <li key={`${g.title}-${i}-${subIdx}`}>{sub}</li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  )
}

export default function T5TuyaOpenLanding() {
  const { i18n } = useDocusaurusContext()
  const locale = i18n.currentLocale === 'zh' ? 'zh' : 'en'
  const c = COPY[locale]
  const columns = T5_FEATURE_COLUMNS[locale]

  const pageRef = useRef(null)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isSpecsDiagramOpen, setIsSpecsDiagramOpen] = useState(false)

  useEffect(() => {
    const root = pageRef.current
    if (!root) {
      return undefined
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.revealVisible)
            obs.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    root.querySelectorAll(`.${styles.reveal}`).forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 480)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isSpecsDiagramOpen) {
      return undefined
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsSpecsDiagramOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isSpecsDiagramOpen])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <Layout title={c.meta.title} description={c.meta.description}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <div ref={pageRef} className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.heroGrid} aria-hidden />
          <div className={styles.particles} aria-hidden>
            {PARTICLE_LAYOUT.map((p, i) => (
              <span key={i} className={styles.particle} style={{ left: p.left, top: p.top, animationDelay: p.delay }} />
            ))}
          </div>
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>{c.hero.eyebrow}</p>
              <h1 className={styles.heroTitle}>
                {c.hero.titlePre}
                <span>{c.hero.titleAccent}</span>
              </h1>
              <p className={styles.heroSub}>{c.hero.sub}</p>
              <p className={styles.heroHighlight}>{c.hero.highlight}</p>
              <div className={styles.ctaRow}>
                <Link className={styles.btnPrimary} to="/docs/quick-start/unboxing">
                  {c.hero.ctaPrimary}
                </Link>
                <Link className={styles.btnGhost} to="/get-hardware">
                  {c.hero.ctaGhost}
                </Link>
              </div>
            </div>
            <div className={styles.heroVisual}>
              <HeroChipVisual stack={c.chip.stack} moduleBadge={c.chip.moduleBadge} line2={c.chip.line2} />
            </div>
          </div>
        </header>

        <section className={clsx(styles.section, styles.t5Section)}>
          <div className={styles.container}>
            <div className={clsx(styles.t5Card, styles.reveal)}>
              <div>
                <h2 className={styles.sectionTitle}>{c.t5.title}</h2>
                <p className={styles.sectionSub}>{c.t5.sub}</p>
                <ul className={styles.specList}>
                  {c.t5.specs.map((t, i) => (
                    <SpecLine key={i} text={t} />
                  ))}
                </ul>
              </div>
              <div className={styles.chipVisualWrap}>
                <img className={styles.chipPhoto} src={DEV_KIT_IMAGE} alt={c.t5.imgAlt} loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        <section className={clsx(styles.section, styles.openSection)}>
          <div className={styles.container}>
            <div className={clsx(styles.openGrid, styles.openGridReverse, styles.reveal)}>
              <div className={styles.ecoArt}>
                <img src={SDK_ARCH_IMAGE} alt={c.open.imgAlt} loading="lazy" />
              </div>
              <div>
                <span className={styles.badge}>{c.open.badge}</span>
                <h2 className={styles.sectionTitle}>{c.open.title}</h2>
                <p className={styles.sectionSub}>{c.open.sub}</p>
                <p className={styles.sectionSub} style={{ marginTop: '-1rem' }}>
                  <strong>{c.open.benefitsLead}</strong>
                </p>
                <ul className={styles.benefitList}>
                  {c.open.benefits.map((b, i) => (
                    <li key={i} className={styles.benefitItem}>
                      <span className={styles.benefitIcon}>
                        <BenefitIcon name={b.icon} />
                      </span>
                      <div>
                        <strong>{b.title}</strong>
                        <p style={{ margin: '0.35rem 0 0', fontSize: '0.9375rem', color: 'var(--ifm-color-emphasis-700)' }}>
                          {b.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className={clsx(styles.section, styles.whySection)}>
          <div className={styles.whyGridBg} aria-hidden />
          <div className={styles.container} style={{ position: 'relative' }}>
            <h2 className={clsx(styles.sectionTitle, styles.reveal)} style={{ textAlign: 'center', maxWidth: '36rem', margin: '0 auto 0.75rem' }}>
              {c.why.title}
            </h2>
            <p className={clsx(styles.sectionSub, styles.reveal)} style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
              {c.why.sub}
            </p>
            <div className={styles.whyGrid}>
              {c.why.cards.map((card) => (
                <article key={card.n} className={clsx(styles.whyCard, styles.reveal)}>
                  <span className={styles.whyNum}>{card.n}</span>
                  <div style={{ color: 'var(--ifm-color-emphasis-600)', marginBottom: '0.35rem' }}>
                    <WhyIcon name={card.icon} />
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={clsx(styles.section, styles.devkitSection)}>
          <div className={styles.container}>
            <div className={clsx(styles.devkitRow, styles.reveal)}>
              <div className={styles.devkitMock}>
                <img className={styles.devkitImg} src={DEV_KIT_PINOUT_IMAGE} alt={c.devkit.imgAlt} loading="lazy" />
              </div>
              <div>
                <h2 className={styles.sectionTitle}>{c.devkit.title}</h2>
                <p className={styles.sectionSub}>{c.devkit.sub}</p>
                <p style={{ fontWeight: 700, marginBottom: '0.75rem' }}>{c.devkit.includesLabel}</p>
                <ul className={styles.specList}>
                  {c.devkit.items.map((t, i) => (
                    <li key={i} className={styles.specItem}>
                      <IconCheck />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
                <div className={styles.bonus}>
                  <strong>{c.devkit.bonusLabel}</strong> {c.devkit.bonusText}
                </div>
                <Link className={clsx(styles.btnPrimary, styles.btnWide)} to="/get-hardware">
                  {c.devkit.orderCta}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={clsx(styles.section, styles.methodsSection)}>
          <div className={styles.container}>
            <div className={styles.methodsHead}>
              <h2 className={clsx(styles.sectionTitle, styles.reveal)}>{c.methods.title}</h2>
              <p className={clsx(styles.sectionSub, styles.reveal)} style={{ margin: '0 auto', textAlign: 'center' }}>
                {c.methods.sub}
              </p>
            </div>
            <div className={styles.methodCards}>
              {c.methods.cards.map((m) => (
                <div key={m.title} className={clsx(styles.methodCard, styles.reveal)}>
                  {m.image ? (
                    <img className={styles.methodIconImage} src={m.image} alt={`${m.title} icon`} loading="lazy" />
                  ) : (
                    <MethodIcon name={m.icon} />
                  )}
                  <h3>{m.title}</h3>
                  <p>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={clsx(styles.section, styles.useSection)}>
          <div className={styles.container}>
            <h2 className={clsx(styles.sectionTitle, styles.useHead, styles.reveal)}>{c.use.title}</h2>
            <p className={clsx(styles.sectionSub, styles.useHead, styles.reveal)} style={{ margin: '0 auto 0.5rem' }}>
              {c.use.sub}
            </p>
            <p className={styles.useHint}>{c.use.hint}</p>
            <div className={styles.useTrack}>
              {c.use.cards.map((u) => (
                <div key={u.title} className={clsx(styles.useCard, styles.reveal)}>
                  <UseIcon name={u.icon} />
                  <h3>{u.title}</h3>
                  <p>{u.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={clsx(styles.section, styles.featuresSection)} aria-labelledby="t5-specs-heading">
          <div className={styles.container}>
            <h2 id="t5-specs-heading" className={clsx(styles.sectionTitle, styles.featuresHead)}>
              {c.specs.title}
            </h2>
            <div className={styles.featuresLayout}>
              <div className={styles.featuresColLeft}>
                <FeatureColumn groups={columns.left} moduleDatasheetLabel={c.specs.moduleDatasheet} />
              </div>
              <div className={styles.featuresColRight}>
                <FeatureColumn groups={columns.right} moduleDatasheetLabel={c.specs.moduleDatasheet} />
              </div>
            </div>
            <figure className={styles.featuresDiagram}>
              <p className={styles.featuresDiagramTitle}>{c.specs.systemDiagram}</p>
              <button
                type="button"
                className={styles.featuresDiagramTrigger}
                onClick={() => setIsSpecsDiagramOpen(true)}
                aria-label={c.specs.enlargeAria}
              >
                <img className={styles.featuresDiagramImage} src={BLOCK_DIAGRAM_IMAGE} alt={c.specs.diagramAlt} loading="lazy" />
              </button>
            </figure>
            <a className={styles.featuresChipsetBtn} href={T5_CHIPSET_DATASHEET_URL} target="_blank" rel="noopener noreferrer">
              {c.specs.chipsetDatasheet}
            </a>
          </div>
        </section>

        {isSpecsDiagramOpen ? (
          <div className={styles.featuresDiagramModal} onClick={() => setIsSpecsDiagramOpen(false)} role="dialog" aria-modal="true">
            <button
              type="button"
              className={styles.featuresDiagramModalClose}
              onClick={() => setIsSpecsDiagramOpen(false)}
              aria-label="Close enlarged diagram"
            >
              ×
            </button>
            <img
              className={styles.featuresDiagramModalImage}
              src={BLOCK_DIAGRAM_IMAGE}
              alt={c.specs.diagramAlt}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        ) : null}

        <footer className={styles.finalCta}>
          <div className={styles.finalParticles} aria-hidden>
            <div className={styles.finalGlow} />
          </div>
          <div className={styles.finalInner}>
            <h2 className={styles.finalTitle}>{c.final.title}</h2>
            <p className={styles.finalSub}>{c.final.sub}</p>
            <div className={styles.finalBtns}>
              <Link className={clsx(styles.finalBtn, styles.finalBtnPrimary)} to="/docs/about-tuyaopen">
                {c.final.exploreDocs}
              </Link>
              <Link className={clsx(styles.finalBtn, styles.finalBtnSecondary)} to="/get-hardware">
                {c.final.getDevKits}
              </Link>
              <a className={clsx(styles.finalBtn, styles.finalBtnSecondary)} href="https://github.com/tuya/TuyaOpen" target="_blank" rel="noopener noreferrer">
                {c.final.starGithub}
              </a>
            </div>
            <p className={styles.tagline}>{c.final.tagline}</p>
          </div>
        </footer>

        <button
          type="button"
          className={clsx(styles.scrollTop, showScrollTop && styles.scrollTopVisible)}
          onClick={scrollTop}
          aria-label="Scroll to top"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
      </div>
    </Layout>
  )
}
