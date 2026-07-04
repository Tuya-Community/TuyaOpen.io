import Head from '@docusaurus/Head'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import BorderGlow from '@site/src/components/BorderGlow'
import FlowingMenu from '@site/src/components/FlowingMenu'
import Layout from '@theme/Layout'
import React, { useEffect, useMemo, useRef, useState } from 'react'

import boardsData from '../data/devBoards'
import styles from './dev-boards.module.css'

/* ------------------------------------------------------------------ */
/* i18n helpers                                                        */
/* ------------------------------------------------------------------ */

/** Resolve a manifest LocalizedString (string | {locale}) for a site locale. */
function pick(field, locale) {
  if (field == null) return undefined
  if (typeof field === 'string') return field
  if (locale === 'zh') return field['zh-CN'] || field['zh'] || field['en'] || firstVal(field)
  return field['en'] || firstVal(field)
}
function firstVal(obj) {
  for (const k of Object.keys(obj)) if (obj[k]) return obj[k]
  return undefined
}

/** Peripheral category labels + display order (board detail). */
const PERIPHERAL_CATEGORIES = [
  { id: 'display', en: 'Display', zh: '显示屏' },
  { id: 'camera', en: 'Camera', zh: '摄像头' },
  { id: 'audio', en: 'Audio', zh: '音频' },
  { id: 'led', en: 'LED', zh: 'LED' },
  { id: 'button', en: 'Button', zh: '按键' },
  { id: 'touchpad', en: 'Touchpad', zh: '触摸板' },
  { id: 'printer', en: 'Printer', zh: '打印机' },
  { id: 'sensor', en: 'Sensor', zh: '传感器' },
  { id: 'storage', en: 'Storage', zh: '存储' },
  { id: 'power', en: 'Power', zh: '电源' },
  { id: 'communication', en: 'Communication', zh: '通信' },
]
function categoryLabel(id, zh) {
  const c = PERIPHERAL_CATEGORIES.find((c) => c.id === id)
  return c ? (zh ? c.zh : c.en) : id
}

/** Tag dot color by manifest tag category — stays on the violet/orange brand. */
const TAG_CATEGORY_COLOR = {
  connectivity: '#7c5cff',
  peripherals: '#ff6b35',
  application: '#a78bfa',
  'form-factor': '#64748b',
}

/** Chip peripheral display names + ordering for the chip detail view. */
const PERIPHERAL_LABELS = {
  gpio: 'GPIO',
  uart: 'UART',
  i2c: 'I2C',
  spi: 'SPI',
  qspi: 'QSPI',
  pwm: 'PWM',
  adc: 'ADC',
  i2s: 'I2S',
  timer: 'Timer',
  wdt: 'WDT',
  rtc: 'RTC',
  touch: 'Touch',
  twai: 'TWAI',
  sdmmc: 'SD/MMC',
  usb: 'USB',
  flash: 'Flash',
  dma2d: 'DMA2D',
  rgb: 'RGB LCD',
  i8080: 'I8080 LCD',
  dvp: 'DVP Camera',
  kws: 'KWS',
  vad: 'VAD',
}
const PERIPHERAL_ORDER = Object.keys(PERIPHERAL_LABELS)

function prettyArch(arch) {
  if (!arch) return null
  const map = {
    'arm-cortex-m33': 'ARM Cortex-M33',
    'arm-cortex-m4': 'ARM Cortex-M4',
    'xtensa-lx6': 'Xtensa LX6',
    'xtensa-lx7': 'Xtensa LX7',
    'risc-v': 'RISC-V',
  }
  return map[arch] || arch
}
function formatBytes(b) {
  if (b == null) return null
  if (b >= 1048576) {
    const mb = b / 1048576
    return `${Number.isInteger(mb) ? mb.toFixed(0) : mb.toFixed(1)} MB`
  }
  if (b >= 1024) return `${Math.round(b / 1024)} KB`
  return `${b} B`
}

/* ------------------------------------------------------------------ */
/* Inline SVG icons (Lucide-style, currentColor)                       */
/* ------------------------------------------------------------------ */

const iconProps = {
  width: 16,
  height: 16,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}
const ArrowRight = ({ className }) => (
  <svg {...iconProps} className={className}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)
const ArrowExternal = ({ className }) => (
  <svg {...iconProps} className={className}>
    <path d="M7 17 17 7M7 7h10v10" />
  </svg>
)
const ArrowBack = ({ className }) => (
  <svg {...iconProps} className={className}>
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </svg>
)
const ChipIcon = ({ className }) => (
  <svg {...iconProps} className={className}>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
  </svg>
)
const DocIcon = () => (
  <svg {...iconProps}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M16 13H8M16 17H8M10 9H8" />
  </svg>
)
const CartIcon = () => (
  <svg {...iconProps}>
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
)
const BoxIcon = () => (
  <svg {...iconProps}>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <path d="M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12" />
  </svg>
)
const CodeIcon = () => (
  <svg {...iconProps}>
    <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
  </svg>
)

/* BorderGlow theming — same violet brand + orange accent as the tutorials hub. */
const GLOW = {
  backgroundColor: 'var(--tut-card-bg)',
  colors: ['#a78bfa', '#7c5cff', '#ff6b35'],
  glowColor: '255 92 76',
  borderRadius: 18,
  glowRadius: 30,
  glowIntensity: 0.9,
  coneSpread: 22,
  edgeSensitivity: 24,
  fillOpacity: 0.35,
}

/* ------------------------------------------------------------------ */
/* Tag (dot + label, no background)                                    */
/* ------------------------------------------------------------------ */

function Tag({ tagId, tags, zh }) {
  const t = tags[tagId]
  const label = t ? (zh ? t.zh : t.en) : tagId
  const color = (t && TAG_CATEGORY_COLOR[t.category]) || '#7c5cff'
  return (
    <span className={styles.tag}>
      <span className={styles.tagDot} style={{ background: color }} aria-hidden />
      {label}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* Placeholder for boards without an image in the manifest             */
/* ------------------------------------------------------------------ */

function BoardImagePlaceholder({ name, compact }) {
  return (
    <div className={styles.placeholder} aria-hidden="true">
      <svg viewBox="0 0 64 64" className={styles.placeholderIcon} role="img">
        <rect x="18" y="18" width="28" height="28" rx="3" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="24" y1="14" x2="24" y2="18" />
          <line x1="32" y1="14" x2="32" y2="18" />
          <line x1="40" y1="14" x2="40" y2="18" />
          <line x1="24" y1="46" x2="24" y2="50" />
          <line x1="32" y1="46" x2="32" y2="50" />
          <line x1="40" y1="46" x2="40" y2="50" />
          <line x1="14" y1="24" x2="18" y2="24" />
          <line x1="14" y1="32" x2="18" y2="32" />
          <line x1="14" y1="40" x2="18" y2="40" />
          <line x1="46" y1="24" x2="50" y2="24" />
          <line x1="46" y1="32" x2="50" y2="32" />
          <line x1="46" y1="40" x2="50" y2="40" />
        </g>
        <circle cx="25" cy="25" r="2.5" fill="currentColor" />
      </svg>
      {!compact && <span className={styles.placeholderName}>{name}</span>}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Board card (separated, larger image + improved text layout)         */
/* ------------------------------------------------------------------ */

function BoardCard({ board, tags, zh, onSelect }) {
  return (
    <BorderGlow className={styles.boardCard} {...GLOW}>
      <a
        className={styles.boardCardLink}
        href={`#${board.id}`}
        onClick={(e) => {
          e.preventDefault()
          onSelect(board.id)
        }}
        aria-label={zh ? `查看 ${board.name} 详情` : `View ${board.name} details`}
      >
        <div className={styles.boardCardThumb}>
          {board.image ? (
            <img src={board.image} alt={board.name} className={styles.boardCardImage} loading="lazy" decoding="async" />
          ) : (
            <BoardImagePlaceholder name={board.name} />
          )}
        </div>
        <div className={styles.boardCardBody}>
          <div className={styles.boardCardTop}>
            <h3 className={styles.boardCardTitle}>{board.name}</h3>
            {board.manufacturer && <span className={styles.boardCardMfr}>{board.manufacturer}</span>}
          </div>
          {board.summary && <p className={styles.boardCardSummary}>{board.summary}</p>}
          {board.tags?.length > 0 && (
            <div className={styles.boardCardTags}>
              {board.tags.slice(0, 5).map((t) => (
                <Tag key={t} tagId={t} tags={tags} zh={zh} />
              ))}
            </div>
          )}
        </div>
        <div className={styles.boardCardCta}>
          <span>{zh ? '查看' : 'View'}</span>
          <ArrowRight className={styles.inlineArrow} />
        </div>
      </a>
    </BorderGlow>
  )
}

/* ------------------------------------------------------------------ */
/* Platform group (header bar + separated board cards, bounded)        */
/* ------------------------------------------------------------------ */

function PlatformGroup({ variant, boards, tags, zh, onSelectBoard, onSelectPlatform }) {
  const name = variant.name ? (zh ? variant.name.zh : variant.name.en) : variant.id
  const summary = variant.summary ? (zh ? variant.summary.zh : variant.summary.en) : null
  const hasDetail = Boolean(variant.detailUrl)
  const moreLabel = zh ? '了解更多芯片' : 'More about chipset'
  return (
    <section className={styles.platformGroup}>
      <header className={styles.platformHead}>
        <div className={styles.platformHeadLeft}>
          <span className={styles.platformIconWrap}>
            {variant.image ? (
              <img src={variant.image} alt={name} className={styles.platformIconImg} loading="lazy" decoding="async" />
            ) : (
              <ChipIcon />
            )}
          </span>
          <div className={styles.platformHeading}>
            <h3 className={styles.platformName}>{name}</h3>
            {summary && <p className={styles.platformBlurb}>{summary}</p>}
          </div>
        </div>
        <div className={styles.platformHeadRight}>
          <span className={styles.platformCount}>
            {boards.length} {zh ? '块开发板' : 'boards'}
          </span>
          {hasDetail ? (
            <button
              type="button"
              className={styles.platformChipsetLink}
              onClick={() => onSelectPlatform(variant.id)}
              aria-label={zh ? `查看 ${name} 芯片详情` : `View ${name} chipset details`}
            >
              {moreLabel}
              <ArrowRight className={styles.inlineArrow} />
            </button>
          ) : (
            <span className={`${styles.platformChipsetLink} ${styles.linkItemDisabled}`}>{moreLabel}</span>
          )}
        </div>
      </header>
      <div className={styles.boardList}>
        {boards.map((board) => (
          <BoardCard key={board.id} board={board} tags={tags} zh={zh} onSelect={onSelectBoard} />
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Resource link (no background — text + leading icon + arrow)         */
/* ------------------------------------------------------------------ */

function LinkItem({ href, icon, label }) {
  const external = /^https?:\/\//.test(href || '')
  const content = (
    <>
      {icon}
      <span>{label}</span>
      {href &&
        (external ? (
          <ArrowExternal className={styles.linkItemArrow} />
        ) : (
          <ArrowRight className={styles.linkItemArrow} />
        ))}
    </>
  )
  if (!href) {
    return (
      <span className={`${styles.linkItem} ${styles.linkItemDisabled}`} aria-disabled="true">
        {content}
      </span>
    )
  }
  return (
    <a className={styles.linkItem} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {content}
    </a>
  )
}

/* ------------------------------------------------------------------ */
/* Peripheral card (board detail)                                      */
/* ------------------------------------------------------------------ */

function PeripheralCard({ p, zh }) {
  const pinCount = Object.values(p.pins || {}).reduce((n, arr) => n + (arr?.length || 0), 0)
  return (
    <div className={styles.periphCard}>
      <div className={styles.periphHead}>
        <span className={styles.periphName}>{pick(p.name, zh ? 'zh' : 'en')}</span>
        {p.model && <span className={styles.periphModel}>{p.model}</span>}
      </div>
      <div className={styles.periphMeta}>
        {p.interface && <span className={styles.chip}>{p.interface}</span>}
        {p.mounting && (
          <span className={styles.chip}>
            {p.mounting === 'onboard' ? (zh ? '板载' : 'Onboard') : zh ? '配件' : 'Accessory'}
          </span>
        )}
        {pinCount > 0 && <span className={styles.chip}>{zh ? `${pinCount} 引脚` : `${pinCount} pins`}</span>}
        {p.width && p.height && (
          <span className={styles.chip}>
            {p.width}×{p.height}
          </span>
        )}
      </div>
      {p.note && <p className={styles.periphNote}>{pick(p.note, zh ? 'zh' : 'en')}</p>}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Spec tile (chip detail)                                             */
/* ------------------------------------------------------------------ */

function SpecTile({ label, value }) {
  if (value == null || value === '') return null
  return (
    <div className={styles.specTile}>
      <span className={styles.specLabel}>{label}</span>
      <span className={styles.specValue}>{value}</span>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Board detail view                                                   */
/* ------------------------------------------------------------------ */

function BoardDetail({ board, tags, zh, onBack }) {
  const [detail, setDetail] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(false)
    setDetail(null)
    if (!board.detailUrl) {
      setLoading(false)
      return
    }
    fetch(`/dev-boards-data/${board.id}.json`)
      .then((r) => {
        if (!r.ok) throw new Error(r.status)
        return r.json()
      })
      .then((d) => {
        if (!cancelled) {
          setDetail(d)
          setLoading(false)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(true)
          setLoading(false)
        }
      })
    return () => {
      cancelled = true
    }
  }, [board.id, board.detailUrl])

  // Focus the back button on mount; Escape returns to the catalog.
  const backRef = useRef(null)
  useEffect(() => {
    backRef.current?.focus()
    window.scrollTo(0, 0)
    const onKey = (e) => {
      if (e.key === 'Escape') onBack()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onBack])

  const links = detail?.links || {}
  const peripheralPatterns = detail?.peripheralPatterns || {}
  const categories = Object.keys(peripheralPatterns).filter((c) => peripheralPatterns[c]?.length > 0)
  const orderedCategories = [
    ...PERIPHERAL_CATEGORIES.map((c) => c.id).filter((id) => categories.includes(id)),
    ...categories.filter((id) => !PERIPHERAL_CATEGORIES.find((c) => c.id === id)),
  ]
  const pins = detail?.expansionPins || []
  const loc = zh ? 'zh' : 'en'

  return (
    <div className={styles.detail}>
      <button type="button" className={styles.backLink} onClick={onBack} ref={backRef}>
        <ArrowBack />
        <span>{zh ? '返回开发板列表' : 'Back to boards'}</span>
      </button>

      {/* Hero */}
      <BorderGlow className={styles.detailHeroGlow} {...GLOW}>
        <div className={styles.detailHero}>
          <div className={styles.detailImageWrap}>
            {board.image ? (
              <img src={board.image} alt={board.name} className={styles.detailImage} decoding="async" />
            ) : (
              <BoardImagePlaceholder name={board.name} />
            )}
          </div>
          <div className={styles.detailInfo}>
            {board.platform && <span className={styles.detailPlatform}>{board.platform}</span>}
            <h1 className={styles.detailTitle}>{board.name}</h1>
            {board.manufacturer && <p className={styles.detailMfr}>{board.manufacturer}</p>}
            {board.summary && <p className={styles.detailSummary}>{board.summary}</p>}
            {board.tags?.length > 0 && (
              <div className={styles.detailTags}>
                {board.tags.map((t) => (
                  <Tag key={t} tagId={t} tags={tags} zh={zh} />
                ))}
              </div>
            )}
          </div>
        </div>
      </BorderGlow>

      {/* Links */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{zh ? '资料与购买' : 'Resources & Purchase'}</h2>
        <div className={styles.linkList}>
          <LinkItem href={pick(links.datasheet, loc)} icon={<DocIcon />} label={zh ? '数据手册' : 'Datasheet'} />
          <LinkItem href={links.schematic} icon={<ChipIcon />} label={zh ? '原理图' : 'Schematic'} />
          <LinkItem href={pick(links.productPage, loc)} icon={<CartIcon />} label={zh ? '购买' : 'Buy'} />
          <LinkItem href={links['3dModel']} icon={<BoxIcon />} label={zh ? '3D 模型' : '3D Model'} />
          <LinkItem href={detail?.source?.repo} icon={<CodeIcon />} label={zh ? '源码' : 'Source'} />
        </div>
      </section>

      {/* Loading / error states for the lazy detail */}
      {loading && <div className={styles.statusBox}>{zh ? '加载板卡详情…' : 'Loading board details…'}</div>}
      {error && <div className={styles.statusBox}>{zh ? '无法加载板卡详情。' : 'Could not load board details.'}</div>}

      {/* Peripherals */}
      {detail && orderedCategories.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{zh ? '外设' : 'Peripherals'}</h2>
          {orderedCategories.map((cat) => (
            <details key={cat} className={styles.periphGroup} open>
              <summary className={styles.periphGroupSummary}>
                {categoryLabel(cat, zh)}{' '}
                <span className={styles.periphGroupCount}>{peripheralPatterns[cat].length}</span>
              </summary>
              <div className={styles.periphGrid}>
                {peripheralPatterns[cat].map((p, i) => (
                  <PeripheralCard key={p.id || i} p={p} zh={zh} />
                ))}
              </div>
            </details>
          ))}
        </section>
      )}

      {/* Expansion pinout */}
      {detail && pins.length > 0 && (
        <section className={styles.section}>
          <details className={styles.pinoutDetails} open>
            <summary className={styles.sectionTitle}>
              {zh ? `扩展引脚 (GPIO) — ${pins.length}` : `Expansion Pins (GPIO) — ${pins.length}`}
            </summary>
            <div className={styles.pinTableWrap}>
              <table className={styles.pinTable}>
                <thead>
                  <tr>
                    <th>{zh ? 'GPIO' : 'GPIO'}</th>
                    <th>{zh ? '功能' : 'Functions'}</th>
                  </tr>
                </thead>
                <tbody>
                  {pins.map((pin) => (
                    <tr key={pin.gpio}>
                      <td className={styles.pinGpio}>{pin.gpio}</td>
                      <td className={styles.pinFuncs}>
                        {(pin.functions || []).map((f) => (
                          <span key={f} className={styles.pinFunc}>
                            {f}
                          </span>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </section>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Chip platform detail view                                           */
/* ------------------------------------------------------------------ */

function PlatformDetail({ variant, boards, tags, zh, onSelectBoard, onBack }) {
  const [detail, setDetail] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(false)
    setDetail(null)
    if (!variant.detailUrl) {
      setLoading(false)
      return
    }
    fetch(`/dev-boards-data/platforms/${variant.id}.json`)
      .then((r) => {
        if (!r.ok) throw new Error(r.status)
        return r.json()
      })
      .then((d) => {
        if (!cancelled) {
          setDetail(d)
          setLoading(false)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(true)
          setLoading(false)
        }
      })
    return () => {
      cancelled = true
    }
  }, [variant.id, variant.detailUrl])

  const backRef = useRef(null)
  useEffect(() => {
    backRef.current?.focus()
    window.scrollTo(0, 0)
    const onKey = (e) => {
      if (e.key === 'Escape') onBack()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onBack])

  const name = variant.name ? (zh ? variant.name.zh : variant.name.en) : variant.id
  const summary = variant.summary ? (zh ? variant.summary.zh : variant.summary.en) : null

  const conn = detail?.connectivity || {}
  const mem = detail?.memory || {}
  const pwr = detail?.power || {}
  const periphs = detail?.peripherals || {}
  const pinout = detail?.pinout || []

  // Peripheral count chips: skip connectivity (shown as badges) + pinmux.
  const periphEntries = PERIPHERAL_ORDER.filter(
    (k) => periphs[k] && periphs[k].enabled !== false && periphs[k].count,
  ).map((k) => ({ key: k, label: PERIPHERAL_LABELS[k], count: periphs[k].count }))
  // Include any enabled peripherals not in the known order.
  for (const k of Object.keys(periphs)) {
    if (PERIPHERAL_LABELS[k] || ['wifi', 'ble', 'pinmux'].includes(k)) continue
    if (periphs[k].enabled !== false && periphs[k].count) {
      periphEntries.push({ key: k, label: k.toUpperCase(), count: periphs[k].count })
    }
  }

  const wifiSpec = periphs.wifi?.spec
  const bleSpec = periphs.ble?.spec

  return (
    <div className={styles.detail}>
      <button type="button" className={styles.backLink} onClick={onBack} ref={backRef}>
        <ArrowBack />
        <span>{zh ? '返回开发板列表' : 'Back to boards'}</span>
      </button>

      {/* Hero */}
      <BorderGlow className={styles.detailHeroGlow} {...GLOW}>
        <div className={styles.detailHero}>
          <div className={styles.detailImageWrap}>
            {variant.image ? (
              <img src={variant.image} alt={name} className={styles.detailImage} decoding="async" />
            ) : (
              <div className={styles.chipIconBig}>
                <ChipIcon />
              </div>
            )}
          </div>
          <div className={styles.detailInfo}>
            <span className={styles.detailPlatform}>{zh ? '芯片平台' : 'Chip platform'}</span>
            <h1 className={styles.detailTitle}>{name}</h1>
            {summary && <p className={styles.detailSummary}>{summary}</p>}
            <div className={styles.connBadges}>
              {conn.wifi && <span className={styles.connBadge}>Wi-Fi</span>}
              {conn.ble && <span className={styles.connBadge}>{zh ? '蓝牙 LE' : 'Bluetooth LE'}</span>}
              {conn.ethernet && <span className={styles.connBadge}>{zh ? '以太网' : 'Ethernet'}</span>}
              {conn.cellular && <span className={styles.connBadge}>{zh ? '蜂窝网络' : 'Cellular'}</span>}
            </div>
          </div>
        </div>
      </BorderGlow>

      {loading && <div className={styles.statusBox}>{zh ? '加载芯片规格…' : 'Loading chip specs…'}</div>}
      {error && <div className={styles.statusBox}>{zh ? '无法加载芯片规格。' : 'Could not load chip specs.'}</div>}

      {detail && (
        <>
          {/* Overview */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{zh ? '概述' : 'Overview'}</h2>
            <div className={styles.specGrid}>
              <SpecTile label={zh ? '架构' : 'Architecture'} value={prettyArch(detail.arch)} />
              <SpecTile
                label={zh ? 'Flash 接口' : 'Flash interface'}
                value={detail.flashInterface ? detail.flashInterface.toUpperCase() : null}
              />
              <SpecTile label="SRAM" value={formatBytes(mem.sramBytes)} />
              <SpecTile label="ROM" value={formatBytes(mem.romBytes)} />
              <SpecTile label={zh ? 'Flash 最大' : 'Flash max'} value={formatBytes(mem.flashMaxBytes)} />
              {mem.psramMaxBytes > 0 && (
                <SpecTile label={zh ? 'PSRAM 最大' : 'PSRAM max'} value={formatBytes(mem.psramMaxBytes)} />
              )}
              <SpecTile label="VDD" value={pwr.vdd ? `${pwr.vdd.min}–${pwr.vdd.max} ${pwr.vdd.unit}` : null} />
              <SpecTile
                label={zh ? '深度睡眠电流' : 'Deep sleep'}
                value={pwr.deepSleepCurrent ? `${pwr.deepSleepCurrent.typical} ${pwr.deepSleepCurrent.unit}` : null}
              />
              {pwr.activeCurrent && conn.wifi && (
                <SpecTile
                  label={zh ? '活跃 (Wi-Fi)' : 'Active (Wi-Fi)'}
                  value={`${pwr.activeCurrent.wifi} ${pwr.activeCurrent.unit}`}
                />
              )}
              {pwr.activeCurrent && conn.ble && (
                <SpecTile
                  label={zh ? '活跃 (BLE)' : 'Active (BLE)'}
                  value={`${pwr.activeCurrent.ble} ${pwr.activeCurrent.unit}`}
                />
              )}
            </div>
          </section>

          {/* Wireless */}
          {(wifiSpec || bleSpec) && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{zh ? '无线' : 'Wireless'}</h2>
              <div className={styles.specGrid}>
                {wifiSpec && <SpecTile label={zh ? 'Wi-Fi 标准' : 'Wi-Fi standard'} value={wifiSpec.standard} />}
                {wifiSpec?.bands && <SpecTile label={zh ? '频段' : 'Bands'} value={wifiSpec.bands.join(', ')} />}
                {wifiSpec?.modes && <SpecTile label={zh ? '模式' : 'Modes'} value={wifiSpec.modes.join(', ')} />}
                {bleSpec && <SpecTile label={zh ? '蓝牙版本' : 'Bluetooth'} value={`BLE ${bleSpec.version}`} />}
              </div>
            </section>
          )}

          {/* Peripherals */}
          {periphEntries.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{zh ? '外设' : 'Peripherals'}</h2>
              <div className={styles.periphGrid}>
                {periphEntries.map((e) => (
                  <div key={e.key} className={styles.periphTile}>
                    <span className={styles.periphTileCount}>
                      <span className={styles.periphTileTimes} aria-hidden="true">
                        ×
                      </span>
                      <span className={styles.periphTileNum}>{e.count}</span>
                    </span>
                    <span className={styles.periphTileLabel}>{e.label}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Chip pinout */}
          {pinout.length > 0 && (
            <section className={styles.section}>
              <details className={styles.pinoutDetails}>
                <summary className={styles.sectionTitle}>
                  {zh ? `芯片引脚 — ${pinout.length}` : `Chip pinout — ${pinout.length}`}
                </summary>
                <div className={styles.pinTableWrap}>
                  <table className={styles.pinTable}>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>{zh ? '名称' : 'Name'}</th>
                        <th>GPIO</th>
                        <th>{zh ? '类型' : 'Type'}</th>
                        <th>{zh ? '功能' : 'Functions'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pinout.map((pin) => (
                        <tr key={pin.pin}>
                          <td className={styles.pinGpio}>{pin.pin}</td>
                          <td className={styles.pinName}>{pin.name}</td>
                          <td className={styles.pinGpio}>{pin.gpio == null ? '—' : pin.gpio}</td>
                          <td className={styles.pinType}>{pin.type || ''}</td>
                          <td className={styles.pinFuncs}>
                            {(pin.functions || []).map((f) => (
                              <span key={f} className={styles.pinFunc}>
                                {f}
                              </span>
                            ))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>
            </section>
          )}
        </>
      )}

      {/* Boards on this chip */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          {zh ? `基于 ${name} 的开发板 (${boards.length})` : `Boards on ${name} (${boards.length})`}
        </h2>
        <div className={styles.boardList}>
          {boards.map((board) => (
            <BoardCard key={board.id} board={board} tags={tags} zh={zh} onSelect={onSelectBoard} />
          ))}
        </div>
      </section>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function DevBoardsPage() {
  const { i18n } = useDocusaurusContext()
  const locale = i18n.currentLocale
  const zh = locale === 'zh'
  const boards = boardsData.boards[locale] || boardsData.boards.en
  const platforms = boardsData.platforms
  const variants = boardsData.variants || []
  const tags = boardsData.tags

  const [platformFilter, setPlatformFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(null) // board id
  const [platformVariant, setPlatformVariant] = useState(null) // chip variant id

  // Deep-linking: open a board or chip platform from the URL hash, keep
  // history in sync. Boards use #<boardId>; chip platforms use
  // #platform-<variantId>.
  useEffect(() => {
    const parse = () => {
      const h = window.location.hash.replace(/^#/, '')
      if (!h) {
        setSelectedId(null)
        setPlatformVariant(null)
        return
      }
      if (h.startsWith('platform-')) {
        const vid = h.slice('platform-'.length)
        setPlatformVariant(variants.some((v) => v.id === vid) ? vid : null)
        setSelectedId(null)
        return
      }
      if (boards.some((b) => b.id === h)) {
        setSelectedId(h)
        setPlatformVariant(null)
        return
      }
      setSelectedId(null)
      setPlatformVariant(null)
    }
    parse()
    window.addEventListener('popstate', parse)
    return () => window.removeEventListener('popstate', parse)
  }, [boards, variants])

  const selectBoard = (id) => {
    window.history.pushState({ devBoard: id }, '', `#${id}`)
    setSelectedId(id)
    setPlatformVariant(null)
  }
  const selectPlatform = (vid) => {
    window.history.pushState({ devPlatform: vid }, '', `#platform-${vid}`)
    setPlatformVariant(vid)
    setSelectedId(null)
    window.scrollTo(0, 0)
  }
  const back = () => {
    const st = window.history.state || {}
    if (st.devBoard || st.devPlatform) {
      window.history.back()
    } else {
      window.history.pushState(null, '', window.location.pathname)
      setSelectedId(null)
      setPlatformVariant(null)
    }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return boards.filter((b) => {
      if (platformFilter !== 'all' && b.platformId !== platformFilter) return false
      if (q) {
        const hay = `${b.name} ${b.summary || ''} ${b.manufacturer || ''} ${(b.tags || []).join(' ')}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [boards, platformFilter, query])

  // Group filtered boards by chip variant, in stable variant order.
  const grouped = useMemo(() => {
    const map = new Map()
    for (const b of filtered) {
      const vid = b.variantId || b.platformId
      if (!map.has(vid)) map.set(vid, [])
      map.get(vid).push(b)
    }
    const known = variants.filter((v) => map.has(v.id)).map((v) => ({ variant: v, boards: map.get(v.id) }))
    // Any board whose variant isn't in the catalog (defensive) → fallback group.
    const fallback = []
    for (const [vid, bs] of map) {
      if (!variants.some((v) => v.id === vid)) {
        fallback.push({
          variant: {
            id: vid,
            platformId: vid,
            name: { en: vid, zh: vid },
            summary: null,
            image: null,
            detailUrl: null,
          },
          boards: bs,
        })
      }
    }
    return [...known, ...fallback]
  }, [filtered, variants])

  const selected = selectedId ? boards.find((b) => b.id === selectedId) : null
  const platformVariantObj = platformVariant ? variants.find((v) => v.id === platformVariant) : null
  const platformBoards = platformVariant ? boards.filter((b) => (b.variantId || b.platformId) === platformVariant) : []

  const title = zh ? '开发板' : 'Dev Boards'
  const description = zh
    ? '浏览 TuyaOpen 支持的开发板与芯片模组：规格、外设、引脚与购买链接。'
    : 'Browse TuyaOpen-supported dev boards and chip modules: specs, peripherals, pinouts, and purchase links.'

  const menuItems = useMemo(
    () => [
      { key: 'all', text: zh ? '全部' : 'All', count: boards.length },
      ...platforms.map((p) => ({
        key: p.id,
        text: zh ? p.name.zh : p.name.en,
        count: p.count,
      })),
    ],
    [zh, boards, platforms],
  )

  const activePlatform = platformFilter === 'all' ? null : platforms.find((p) => p.id === platformFilter)
  const activeLabel =
    platformFilter === 'all'
      ? zh
        ? '全部开发板'
        : 'All boards'
      : zh
        ? activePlatform?.name.zh
        : activePlatform?.name.en

  return (
    <Layout title={title} description={description}>
      <Head>
        <meta name="description" content={description} />
      </Head>
      <main className={styles.root}>
        {selected ? (
          <BoardDetail board={selected} tags={tags} zh={zh} onBack={back} />
        ) : platformVariantObj ? (
          <PlatformDetail
            variant={platformVariantObj}
            boards={platformBoards}
            tags={tags}
            zh={zh}
            onSelectBoard={selectBoard}
            onBack={back}
          />
        ) : (
          <>
            {/* --------------------------------------------------------- Hero */}
            <header className={styles.hero}>
              <div className={styles.heroGlow} aria-hidden />
              <div className={styles.heroInner}>
                <span className={styles.heroBadge}>{zh ? '硬件' : 'Hardware'}</span>
                <h1 className={styles.heroTitle}>{title}</h1>
                <p className={styles.heroSubtitle}>{description}</p>
              </div>
            </header>

            {/* -------------------------------------- Body: sidebar + cards */}
            <div className={styles.shell}>
              <aside className={styles.sidebar}>
                <div className={styles.sidebarSticky}>
                  <p className={styles.sidebarTitle}>{zh ? '平台' : 'Platform'}</p>
                  <FlowingMenu
                    items={menuItems}
                    activeKey={platformFilter}
                    onSelect={setPlatformFilter}
                    marqueeBgColor="#7c5cff"
                    marqueeTextColor="#ffffff"
                  />
                </div>
              </aside>

              <div className={styles.main}>
                <div className={styles.mainHead}>
                  <h2 className={styles.mainTitle}>{activeLabel}</h2>
                  <div className={styles.mainTools}>
                    <input
                      type="search"
                      className={styles.search}
                      placeholder={zh ? '搜索开发板…' : 'Search boards…'}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      aria-label={zh ? '搜索开发板' : 'Search boards'}
                    />
                    <span className={styles.resultCount}>
                      {filtered.length} {zh ? '块' : 'boards'}
                    </span>
                  </div>
                </div>

                {grouped.length > 0 ? (
                  <div className={styles.platformList}>
                    {grouped.map(({ variant, boards: bds }) => (
                      <PlatformGroup
                        key={variant.id}
                        variant={variant}
                        boards={bds}
                        tags={tags}
                        zh={zh}
                        onSelectBoard={selectBoard}
                        onSelectPlatform={selectPlatform}
                      />
                    ))}
                  </div>
                ) : (
                  <p className={styles.empty}>{zh ? '没有匹配的开发板。' : 'No boards match your search.'}</p>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </Layout>
  )
}
