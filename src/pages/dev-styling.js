import Head from '@docusaurus/Head'
import { useColorMode } from '@docusaurus/theme-common'
import Layout from '@theme/Layout'
import React, { useEffect, useState } from 'react'

import styles from './dev-styling.module.css'

/* ------------------------------------------------------------------ *
 * Design tokens for this site.
 *
 * Sources of truth:
 *   - Infima theme variables ............ src/styles/custom.css (:root + [data-theme])
 *   - Core design palette ............... extracted from the landing/product page
 *                                         CSS modules (src/pages/*.module.css);
 *                                         `count` = number of literal occurrences
 *                                         across src/ at the time this page was built.
 *   - Type families / scale / weights ... aggregated from the same modules.
 *
 * This page renders live swatches; toggle the navbar light/dark switch to see
 * how the Infima tokens respond.
 * ------------------------------------------------------------------ */

// Infima theme variables — values mirror src/styles/custom.css.
const THEME_TOKENS = [
  { name: '--ifm-color-primary', light: '#172d72', dark: '#10a6fa' },
  { name: '--ifm-color-primary-dark', light: '#152967', dark: '#0598ea' },
  { name: '--ifm-color-primary-darker', light: '#142661', dark: '#0590dd' },
  { name: '--ifm-color-primary-darkest', light: '#102050', dark: '#0476b6' },
  { name: '--ifm-color-primary-light', light: '#19327d', dark: '#2ab0fb' },
  { name: '--ifm-color-primary-lighter', light: '#1a3483', dark: '#37b5fb' },
  { name: '--ifm-color-primary-lightest', light: '#1e3b94', dark: '#5ec3fc' },
]

// Core design palette, grouped by role. Hex + nearest Tailwind name + usage note.
const PALETTE_GROUPS = [
  {
    title: 'Brand Blue',
    tag: '#172d72',
    note: 'Primary identity — navy in light, bright azure in dark. Links, CTAs, accents.',
    colors: [
      { hex: '#172d72', name: 'Brand navy (primary/light)', count: 4 },
      { hex: '#10a6fa', name: 'Brand azure (primary/dark)', count: 3 },
      { hex: '#0066ff', name: 'Electric blue', count: 7 },
      { hex: '#2563eb', name: 'blue-600', count: 7 },
      { hex: '#3b82f6', name: 'blue-500', count: 12 },
      { hex: '#1e40af', name: 'blue-800', count: 4 },
      { hex: '#0ea5e9', name: 'sky-500', count: 9 },
      { hex: '#38bdf8', name: 'sky-400', count: 4 },
    ],
  },
  {
    title: 'Violet / AI accent',
    tag: '#7c3aed',
    note: 'tyutool + AI / agent surfaces, Aurora gradient backgrounds.',
    colors: [
      { hex: '#7c3aed', name: 'violet-600', count: 19 },
      { hex: '#8b5cf6', name: 'violet-500', count: 4 },
      { hex: '#a78bfa', name: 'violet-400', count: 6 },
      { hex: '#c4b5fd', name: 'violet-300', count: 4 },
      { hex: '#ede9fe', name: 'violet-100', count: 7 },
      { hex: '#312e81', name: 'indigo-900', count: 6 },
      { hex: '#a5b4fc', name: 'indigo-300', count: 4 },
      { hex: '#5227ff', name: 'Aurora violet', count: 3 },
    ],
  },
  {
    title: 'Orange / Hardware accent',
    tag: '#ff6b35',
    note: 'IDE & hardware pages, root-level sidebar items, energetic CTAs.',
    colors: [
      { hex: '#ff4d00', name: 'IDE accent-from', count: 6 },
      { hex: '#ff6b35', name: 'Hardware orange', count: 8 },
      { hex: '#f97316', name: 'orange-500', count: 6 },
      { hex: '#ff7a18', name: 'Bright orange', count: 4 },
      { hex: '#e8590c', name: 'Sidebar root (light)', count: 2 },
      { hex: '#f59e0b', name: 'amber-500', count: 9 },
    ],
  },
  {
    title: 'Green / Teal — success',
    tag: '#10b981',
    note: 'Success states, "open / free" badges, status pills.',
    colors: [
      { hex: '#10b981', name: 'emerald-500', count: 10 },
      { hex: '#34d399', name: 'emerald-400', count: 8 },
      { hex: '#22c55e', name: 'green-500', count: 4 },
      { hex: '#16a34a', name: 'green-600', count: 5 },
      { hex: '#06b6d4', name: 'cyan-500', count: 7 },
      { hex: '#0d9488', name: 'teal-600', count: 6 },
      { hex: '#5eead4', name: 'teal-300', count: 6 },
    ],
  },
  {
    title: 'Pink / Red',
    tag: '#ec4899',
    note: 'Highlights, decorative gradients, error / destructive states.',
    colors: [
      { hex: '#ec4899', name: 'pink-500', count: 6 },
      { hex: '#f472b6', name: 'pink-400', count: 6 },
      { hex: '#fce7f3', name: 'pink-100', count: 4 },
      { hex: '#ef4444', name: 'red-500', count: 8 },
      { hex: '#f43f5e', name: 'rose-500', count: 4 },
      { hex: '#c41e3a', name: 'Crimson', count: 4 },
    ],
  },
  {
    title: 'Neutrals — Slate scale',
    tag: '#64748b',
    note: 'The workhorse grayscale: text, borders, surfaces, dividers (Tailwind slate).',
    colors: [
      { hex: '#f8fafc', name: 'slate-50', count: 19 },
      { hex: '#f1f5f9', name: 'slate-100', count: 46 },
      { hex: '#e2e8f0', name: 'slate-200', count: 37 },
      { hex: '#cbd5e1', name: 'slate-300', count: 10 },
      { hex: '#94a3b8', name: 'slate-400', count: 5 },
      { hex: '#64748b', name: 'slate-500', count: 6 },
      { hex: '#475569', name: 'slate-600', count: 8 },
      { hex: '#334155', name: 'slate-700', count: 8 },
      { hex: '#1e293b', name: 'slate-800', count: 10 },
      { hex: '#0f172a', name: 'slate-900', count: 25 },
    ],
  },
  {
    title: 'Dark surfaces',
    tag: '#0a0a0c',
    note: 'Near-black backgrounds for dark-theme product pages (IDE, T5).',
    colors: [
      { hex: '#0a0a0c', name: 'IDE bg-primary', count: 5 },
      { hex: '#0b1220', name: 'Deep navy bg', count: 6 },
      { hex: '#131316', name: 'IDE bg-secondary', count: 2 },
      { hex: '#1a1a1a', name: 'Near-black', count: 12 },
    ],
  },
]

const FONT_FAMILIES = [
  {
    name: 'Open Sans',
    role: 'Base / UI',
    stack: "'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif",
    family: "'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif",
    note: 'Defined as --ifm-font-family-base in custom.css; loaded from Google Fonts (weights 300–700).',
  },
  {
    name: 'Inter',
    role: 'Display',
    stack: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    note: 'Used on select landing sections and Mermaid diagrams.',
  },
  {
    name: 'JetBrains Mono',
    role: 'Mono / Code',
    stack: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    family: "'JetBrains Mono', ui-monospace, monospace",
    note: 'Code samples, config tables, technical labels.',
    mono: true,
  },
  {
    name: 'CJK stack (Noto Sans SC)',
    role: '简体中文',
    stack:
      "'Noto Sans SC', system-ui, -apple-system, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
    family:
      "'Noto Sans SC', system-ui, -apple-system, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
    note: 'Applied on Chinese-locale product pages; falls back to native PingFang / YaHei.',
    cjk: true,
  },
]

// Type scale — sizes actually used across the page modules, with usage counts.
const TYPE_SCALE = [
  { size: '0.75rem', px: '12px', count: 9 },
  { size: '0.8125rem', px: '13px', count: 18 },
  { size: '0.875rem', px: '14px', count: 20 },
  { size: '0.9rem', px: '14.4px', count: 21 },
  { size: '0.9375rem', px: '15px', count: 18 },
  { size: '0.95rem', px: '15.2px', count: 26 },
  { size: '1rem', px: '16px', count: 18 },
  { size: '1.05rem', px: '16.8px', count: 12 },
  { size: '1.125rem', px: '18px', count: 13 },
  { size: '1.2rem', px: '19.2px', count: 11 },
  { size: '1.5rem', px: '24px', count: 6 },
  { size: '2rem', px: '32px', count: 3 },
  { size: 'clamp(1.75rem, 4vw, 2.5rem)', px: 'fluid', count: 6 },
  { size: 'clamp(2rem, 5vw, 3.25rem)', px: 'fluid', count: 3 },
]

const WEIGHTS = [
  { w: 400, label: 'Regular', count: 7 },
  { w: 500, label: 'Medium', count: 28 },
  { w: 600, label: 'Semibold', count: 97 },
  { w: 700, label: 'Bold', count: 105 },
  { w: 800, label: 'Extrabold', count: 72 },
]

function Swatch({ hex, name, count }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    try {
      navigator.clipboard?.writeText(hex)
      setCopied(true)
      setTimeout(() => setCopied(false), 1100)
    } catch (e) {
      /* clipboard unavailable */
    }
  }
  return (
    <button type="button" className={styles.swatch} onClick={copy} title={`Copy ${hex}`}>
      <span className={styles.swatchChip} style={{ background: hex }} />
      <span className={styles.swatchMeta}>
        <span className={styles.swatchHex}>
          {hex}
          {copied ? (
            <span className={styles.copied}>copied</span>
          ) : (
            <span className={styles.swatchCount}>×{count}</span>
          )}
        </span>
        <span className={styles.swatchName}>{name}</span>
      </span>
    </button>
  )
}

function ThemeTokens() {
  const [resolved, setResolved] = useState({})
  const { colorMode } = useColorMode()

  // Read the actually-applied values from :root so the table reflects reality.
  useEffect(() => {
    const cs = getComputedStyle(document.documentElement)
    const next = {}
    THEME_TOKENS.forEach((t) => {
      next[t.name] = cs.getPropertyValue(t.name).trim()
    })
    setResolved(next)
  }, [colorMode])

  return (
    <div className={styles.tokenGrid}>
      {THEME_TOKENS.map((t) => (
        <div key={t.name} className={styles.tokenCard}>
          <div className={styles.tokenSwatch} style={{ background: resolved[t.name] || t.light }} />
          <div className={styles.tokenBody}>
            <div className={styles.tokenName}>{t.name}</div>
            <div className={styles.tokenVals}>
              <span className={styles.tokenVal}>
                <b>Light</b> {t.light}
              </span>
              <span className={styles.tokenVal}>
                <b>Dark</b> {t.dark}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function ModePill() {
  const { colorMode } = useColorMode()
  return (
    <span className={styles.modeNote}>
      <span className={styles.modeDot} />
      Live preview — current theme: <b>{colorMode}</b>. Toggle it in the navbar.
    </span>
  )
}

function Section({ num, title, desc, children }) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.sectionNum}>{num}</span>
          {title}
        </h2>
        {desc && <p className={styles.sectionDesc}>{desc}</p>}
      </div>
      {children}
    </section>
  )
}

function StylingContent() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Design System</span>
        <h1 className={styles.title}>Styling Reference</h1>
        <p className={styles.lede}>
          The living color, type, and theming reference for tuyaopen.io. Tokens come from{' '}
          <span className={styles.codeInline}>src/styles/custom.css</span> and the page CSS modules. Click any swatch to
          copy its hex.
        </p>
        <div>
          <ModePill />
        </div>
      </header>

      <Section
        num="01"
        title="Theme tokens"
        desc="Infima CSS variables that drive Docusaurus chrome (links, buttons, sidebar, TOC). Swatches read the values currently applied to :root; the Light/Dark columns list both definitions."
      >
        <ThemeTokens />
      </Section>

      <Section
        num="02"
        title="Core design palette"
        desc="Colors extracted from the landing & product CSS modules, grouped by role. The ×N badge counts literal occurrences across src/ — a rough proxy for how load-bearing each color is."
      >
        {PALETTE_GROUPS.map((g) => (
          <div key={g.title} className={styles.paletteGroup}>
            <h3 className={styles.paletteGroupTitle}>
              <span className={styles.paletteGroupTag} style={{ background: g.tag }} />
              {g.title}
              <span className={styles.paletteGroupNote}>{g.note}</span>
            </h3>
            <div className={styles.swatchGrid}>
              {g.colors.map((c) => (
                <Swatch key={c.hex} hex={c.hex} name={c.name} count={c.count} />
              ))}
            </div>
          </div>
        ))}
      </Section>

      <Section
        num="03"
        title="Typography — families"
        desc="Four families cover the site. The CJK stack swaps in automatically on Chinese-locale pages."
      >
        {FONT_FAMILIES.map((f) => (
          <div key={f.name} className={styles.fontCard}>
            <div className={styles.fontCardHead}>
              <span className={styles.fontCardName}>{f.name}</span>
              <span className={styles.fontCardRole}>{f.role}</span>
            </div>
            <div className={styles.fontStack}>{f.stack}</div>
            {f.cjk ? (
              <>
                <p className={styles.fontSampleZh} style={{ fontFamily: f.family }} lang="zh-CN">
                  <span className={styles.langLabel}>ZH</span>涂鸦开放平台 — 让硬件接入智能体更简单。
                </p>
                <p className={styles.fontSampleEn} style={{ fontFamily: f.family }} lang="en">
                  <span className={styles.langLabel}>EN</span>The quick brown fox 0123
                </p>
              </>
            ) : f.mono ? (
              <p className={styles.fontSampleMono} style={{ fontFamily: f.family }}>
                const sdk = TuyaOpen(); // 0123456789 {`=> {}`}
              </p>
            ) : (
              <>
                <p className={styles.fontSampleEn} style={{ fontFamily: f.family }} lang="en">
                  <span className={styles.langLabel}>EN</span>The quick brown fox 0123
                </p>
                <p className={styles.fontSampleZh} style={{ fontFamily: f.family }} lang="zh-CN">
                  <span className={styles.langLabel}>ZH</span>涂鸦开放平台 0123
                </p>
              </>
            )}
            <p className={styles.sectionDesc}>{f.note}</p>
          </div>
        ))}
      </Section>

      <Section
        num="04"
        title="Type scale"
        desc="Font sizes in active use, smallest to largest, with occurrence counts. Fluid clamp() values are reserved for hero headings."
      >
        <div>
          {TYPE_SCALE.map((s) => (
            <div key={s.size} className={styles.scaleRow}>
              <span className={styles.scaleSize}>{s.size}</span>
              <span className={styles.scaleCount}>×{s.count}</span>
              <span className={styles.scaleSample} style={{ fontSize: s.size }}>
                Make agentic hardware simple
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section num="05" title="Font weights" desc="The site leans heavy — 600/700/800 dominate headings and emphasis.">
        <div className={styles.weightGrid}>
          {WEIGHTS.map((w) => (
            <div key={w.w} className={styles.weightCard}>
              <div className={styles.weightSample} style={{ fontWeight: w.w }}>
                Aa 智能
              </div>
              <div className={styles.weightLabel}>
                {w.w} · {w.label} · ×{w.count}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        num="06"
        title="Light & dark"
        desc="Docusaurus respects the OS preference (respectPrefersColorScheme: true). Tokens flip via the [data-theme='dark'] selector on :root; dark product pages additionally define their own local variables."
      >
        <div className={styles.ldGrid}>
          <div className={`${styles.ldCard} ${styles.ldCardLight}`}>
            <div className={styles.ldCardTitle}>☀️ Light</div>
            <div className={styles.ldSwatchRow}>
              <span className={styles.ldSwatch} style={{ background: '#172d72' }} />
              <span className={styles.ldSwatch} style={{ background: '#ffffff' }} />
              <span className={styles.ldSwatch} style={{ background: '#f1f5f9' }} />
              <span className={styles.ldSwatch} style={{ background: '#0f172a' }} />
            </div>
            <p className={styles.ldNote}>
              Primary navy #172d72 · white surface · slate-100 panels · slate-900 text. The default content theme.
            </p>
          </div>
          <div className={`${styles.ldCard} ${styles.ldCardDark}`}>
            <div className={styles.ldCardTitle}>🌙 Dark</div>
            <div className={styles.ldSwatchRow}>
              <span className={styles.ldSwatch} style={{ background: '#10a6fa' }} />
              <span className={styles.ldSwatch} style={{ background: '#0a0a0c' }} />
              <span className={styles.ldSwatch} style={{ background: '#1e293b' }} />
              <span className={styles.ldSwatch} style={{ background: '#f0f0f0' }} />
            </div>
            <p className={styles.ldNote}>
              Primary azure #10a6fa · near-black #0a0a0c surface · slate-800 panels · off-white text. Brighter primary
              for contrast on dark.
            </p>
          </div>
        </div>
        <div className={styles.callout}>
          <strong>Authoring tip:</strong> prefer Infima variables (
          <span className={styles.codeInline}>var(--ifm-color-primary)</span>,{' '}
          <span className={styles.codeInline}>var(--ifm-color-emphasis-200)</span>) over raw hex so components track the
          theme automatically. Reach for the palette hexes above only for brand-specific accents that should not shift
          with the theme.
        </div>
      </Section>
    </div>
  )
}

export default function DevStyling() {
  return (
    <Layout
      title="Styling Reference"
      description="Design system reference for tuyaopen.io — colors, typography, theming."
    >
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <StylingContent />
    </Layout>
  )
}
