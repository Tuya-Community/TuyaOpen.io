import Head from '@docusaurus/Head'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import BorderGlow from '@site/src/components/BorderGlow'
import FlowingMenu from '@site/src/components/FlowingMenu'
import Layout from '@theme/Layout'
import React, { useEffect, useMemo, useRef, useState } from 'react'

import boardsData from '../data/devBoards'
import { devBoardsKo } from '../data/devBoardsKo'
import { devBoardsKoContent } from '../data/devBoardsKoContent'
import styles from './dev-boards.module.css'

/* ------------------------------------------------------------------ */
/* i18n helpers                                                        */
/* ------------------------------------------------------------------ */

let CURRENT_BOARD_LOCALE = 'en'

/** Resolve a manifest LocalizedString (string | {locale}) for a site locale. */
function pick(field, locale) {
  if (field == null) return undefined
  if (typeof field === 'string') return field
  if (locale === 'zh') return field['zh-CN'] || field['zh'] || field['en'] || firstVal(field)
  if (locale === 'ko') return field.ko || field.en || firstVal(field)
  return field['en'] || firstVal(field)
}

function ui(en, zh) {
  if (CURRENT_BOARD_LOCALE !== 'ko') return CURRENT_BOARD_LOCALE === 'zh' ? zh : en
  if (devBoardsKo[en]) return devBoardsKo[en]
  const view = en.match(/^View (.+) details$/)
  if (view) return `${view[1]} 세부 정보 보기`
  const chipset = en.match(/^View (.+) chipset details$/)
  if (chipset) return `${chipset[1]} 칩셋 세부 정보 보기`
  const boardCount = en.match(/^Boards on (.+) \((\d+)\)$/)
  if (boardCount) return `${boardCount[1]} 기반 개발 보드 (${boardCount[2]})`
  const pinCount = en.match(/^Expansion Pins \(GPIO\) — (\d+)$/)
  if (pinCount) return `확장 핀 (GPIO) — ${pinCount[1]}`
  const chipPinCount = en.match(/^Chip pinout — (\d+)$/)
  if (chipPinCount) return `칩 핀 배치 — ${chipPinCount[1]}`
  return en
}
function firstVal(obj) {
  for (const k of Object.keys(obj)) if (obj[k]) return obj[k]
  return undefined
}

function localizeBoard(board) {
  if (CURRENT_BOARD_LOCALE !== 'ko') return board
  const copy = devBoardsKoContent.boards[board.id]
  const platformCopy = devBoardsKoContent.platforms[board.variantId || board.platformId]
  if (!copy && !platformCopy) return board
  return {
    ...board,
    ...(copy || {}),
    ...(platformCopy?.name ? { platform: platformCopy.name } : {}),
  }
}

function localizeVariant(variant) {
  if (CURRENT_BOARD_LOCALE !== 'ko') return variant
  const copy = devBoardsKoContent.platforms[variant.id]
  if (!copy) return variant
  return { ...variant, name: copy.name, summary: copy.summary }
}

function localizePlatform(platform) {
  if (CURRENT_BOARD_LOCALE !== 'ko') return platform
  const copy = devBoardsKoContent.platforms[platform.id]
  if (!copy) return platform
  return { ...platform, name: copy.name }
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
  return c ? ui(c.en, c.zh) : id
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
  const label = ui(t?.en || tagId, t?.zh || tagId)
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
        aria-label={ui(`View ${board.name} details`, `查看 ${board.name} 详情`)}
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
          <span>{ui('View', '查看')}</span>
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
  const name = variant.name ? pick(variant.name, CURRENT_BOARD_LOCALE) : variant.id
  const summary = variant.summary ? pick(variant.summary, CURRENT_BOARD_LOCALE) : null
  const hasDetail = Boolean(variant.detailUrl)
  const moreLabel = ui('More about chipset', '了解更多芯片')
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
            {boards.length} {ui('boards', '块开发板')}
          </span>
          {hasDetail ? (
            <button
              type="button"
              className={styles.platformChipsetLink}
              onClick={() => onSelectPlatform(variant.id)}
              aria-label={ui(`View ${name} chipset details`, `查看 ${name} 芯片详情`)}
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
        <span className={styles.periphName}>{pick(p.name, CURRENT_BOARD_LOCALE)}</span>
        {p.model && <span className={styles.periphModel}>{p.model}</span>}
      </div>
      <div className={styles.periphMeta}>
        {p.interface && <span className={styles.chip}>{p.interface}</span>}
        {p.mounting && (
          <span className={styles.chip}>
            {p.mounting === 'onboard' ? ui('Onboard', '板载') : ui('Accessory', '配件')}
          </span>
        )}
        {pinCount > 0 && <span className={styles.chip}>{ui(`${pinCount} pins`, `${pinCount} 引脚`)}</span>}
        {p.width && p.height && (
          <span className={styles.chip}>
            {p.width}×{p.height}
          </span>
        )}
      </div>
      {p.note && <p className={styles.periphNote}>{pick(p.note, CURRENT_BOARD_LOCALE)}</p>}
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
  const [platformSpec, setPlatformSpec] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(false)
    setDetail(null)
    setPlatformSpec(null)

    // Load both board detail and platform chip spec in parallel
    const promises = []

    if (board.detailUrl) {
      promises.push(
        fetch(`/dev-boards-data/${board.id}.json`).then((r) => {
          if (!r.ok) throw new Error(r.status)
          return r.json()
        }),
      )
    } else {
      promises.push(Promise.resolve(null))
    }

    if (board.platformId) {
      promises.push(
        fetch(`/dev-boards-data/platforms/${board.platformId}.json`).then((r) => {
          if (!r.ok) throw new Error(r.status)
          return r.json()
        }),
      )
    } else {
      promises.push(Promise.resolve(null))
    }

    Promise.allSettled(promises)
      .then((results) => {
        if (!cancelled) {
          const detailResult = results[0]
          const platformResult = results[1]
          if (detailResult.status === 'fulfilled') {
            setDetail(detailResult.value)
          }
          if (platformResult.status === 'fulfilled') {
            setPlatformSpec(platformResult.value)
          }
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
  }, [board.id, board.detailUrl, board.platformId])

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
  const loc = CURRENT_BOARD_LOCALE

  // Chip spec data from platform spec JSON
  const conn = platformSpec?.connectivity || {}
  const mem = platformSpec?.memory || {}
  const pwr = platformSpec?.power || {}
  const periphs = platformSpec?.peripherals || {}

  // Chip peripheral count tiles
  const periphEntries = PERIPHERAL_ORDER.filter(
    (k) => periphs[k] && periphs[k].enabled !== false && periphs[k].count,
  ).map((k) => ({ key: k, label: PERIPHERAL_LABELS[k], count: periphs[k].count }))
  for (const k of Object.keys(periphs)) {
    if (PERIPHERAL_LABELS[k] || ['wifi', 'ble', 'pinmux'].includes(k)) continue
    if (periphs[k].enabled !== false && periphs[k].count) {
      periphEntries.push({ key: k, label: k.toUpperCase(), count: periphs[k].count })
    }
  }

  // Format wireless specs
  const formatWifiSpec = (spec) => {
    if (!spec) return null
    const parts = []
    if (spec.standard) parts.push(spec.standard)
    if (spec.bands) parts.push(spec.bands.join(', '))
    return parts.join(' · ')
  }
  const formatBleSpec = (spec) => {
    if (!spec) return null
    return spec.version ? `Bluetooth ${spec.version}` : null
  }
  const wifiSpec = formatWifiSpec(periphs.wifi?.spec)
  const bleSpec = formatBleSpec(periphs.ble?.spec)

  return (
    <div className={styles.detail}>
      <button type="button" className={styles.backLink} onClick={onBack} ref={backRef}>
        <ArrowBack />
        <span>{ui('Back to boards', '返回开发板列表')}</span>
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
            {board.platform && !board.name.toLowerCase().includes(board.platform.toLowerCase()) && (
              <span className={styles.detailPlatform}>{board.platform}</span>
            )}
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
        <h2 className={styles.sectionTitle}>{ui('Resources & Purchase', '资料与购买')}</h2>
        <div className={styles.linkList}>
          <LinkItem href={pick(links.datasheet, loc)} icon={<DocIcon />} label={ui('Datasheet', '数据手册')} />
          <LinkItem href={links.schematic} icon={<ChipIcon />} label={ui('Schematic', '原理图')} />
          <LinkItem href={pick(links.productPage, loc)} icon={<CartIcon />} label={ui('Buy', '购买')} />
          <LinkItem href={links['3dModel']} icon={<BoxIcon />} label={ui('3D Model', '3D 模型')} />
          <LinkItem href={detail?.source?.repo} icon={<CodeIcon />} label={ui('Source', '源码')} />
        </div>
      </section>

      {/* Loading / error states for the lazy detail */}
      {loading && <div className={styles.statusBox}>{ui('Loading board details…', '加载板卡详情…')}</div>}
      {error && <div className={styles.statusBox}>{ui('Could not load board details.', '无法加载板卡详情。')}</div>}

      {/* Chip Platform Overview */}
      {platformSpec && (
        <>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{ui('Chip Overview', '芯片概述')}</h2>
            <div className={styles.specGrid}>
              <SpecTile label={ui('Architecture', '架构')} value={prettyArch(platformSpec.arch)} />
              <SpecTile
                label={ui('Flash interface', 'Flash 接口')}
                value={platformSpec.flashInterface ? platformSpec.flashInterface.toUpperCase() : null}
              />
              <SpecTile label="SRAM" value={formatBytes(mem.sramBytes)} />
              <SpecTile label="ROM" value={formatBytes(mem.romBytes)} />
              <SpecTile label={ui('Flash max', 'Flash 最大')} value={formatBytes(mem.flashMaxBytes)} />
              {mem.psramMaxBytes > 0 && (
                <SpecTile label={ui('PSRAM max', 'PSRAM 最大')} value={formatBytes(mem.psramMaxBytes)} />
              )}
              <SpecTile label="VDD" value={pwr.vdd ? `${pwr.vdd.min}–${pwr.vdd.max} ${pwr.vdd.unit}` : null} />
              <SpecTile label={ui('Deep sleep', '深度睡眠电流')} value={pwr.deepSleep ? `${pwr.deepSleep} μA` : null} />
              <SpecTile
                label={ui('Operating temp', '工作温度')}
                value={pwr.temp ? `${pwr.temp.min}～${pwr.temp.max} ${pwr.temp.unit}` : null}
              />
              <SpecTile
                label={ui('CPU speed', '工作频率')}
                value={
                  platformSpec.cpu
                    ? `${platformSpec.cpu.speedMin == null ? '' : `${platformSpec.cpu.speedMin}–`}${platformSpec.cpu.speedMax} MHz`
                    : null
                }
              />
            </div>
          </section>

          {/* Wireless */}
          {(conn.wifi || conn.ble) && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{ui('Wireless', '无线')}</h2>
              <div className={styles.specGrid}>
                {conn.wifi && (
                  <div className={styles.wirelessSpec}>
                    <h3 className={styles.wirelessTitle}>Wi-Fi</h3>
                    {wifiSpec && <p className={styles.wirelessSub}>{wifiSpec}</p>}
                  </div>
                )}
                {conn.ble && (
                  <div className={styles.wirelessSpec}>
                    <h3 className={styles.wirelessTitle}>Bluetooth LE</h3>
                    {bleSpec && <p className={styles.wirelessSub}>{bleSpec}</p>}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Chip Peripherals */}
          {periphEntries.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{ui('Chip Peripherals', '芯片外设')}</h2>
              <div className={styles.chipPeriphGrid}>
                {periphEntries.map((e) => (
                  <div key={e.key} className={styles.periphTile}>
                    <span className={styles.periphTileCount}>
                      <span className={styles.periphTileTimes} aria-hidden="true">
                        ×
                      </span>
                      {e.count}
                    </span>
                    <span className={styles.periphTileName}>{e.label}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}

      {/* Board Peripherals */}
      {detail && orderedCategories.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{ui('Board Peripherals', '板载外设')}</h2>
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
              {ui(`Expansion Pins (GPIO) — ${pins.length}`, `扩展引脚 (GPIO) — ${pins.length}`)}
            </summary>
            <div className={styles.pinTableWrap}>
              <table className={styles.pinTable}>
                <thead>
                  <tr>
                    <th>{ui('GPIO', 'GPIO')}</th>
                    <th>{ui('Functions', '功能')}</th>
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

  const name = variant.name ? pick(variant.name, CURRENT_BOARD_LOCALE) : variant.id
  const summary = variant.summary ? pick(variant.summary, CURRENT_BOARD_LOCALE) : null

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
        <span>{ui('Back to boards', '返回开发板列表')}</span>
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
            <span className={styles.detailPlatform}>{ui('Chip platform', '芯片平台')}</span>
            <h1 className={styles.detailTitle}>{name}</h1>
            {summary && <p className={styles.detailSummary}>{summary}</p>}
            <div className={styles.connBadges}>
              {conn.wifi && <span className={styles.connBadge}>Wi-Fi</span>}
              {conn.ble && <span className={styles.connBadge}>{ui('Bluetooth LE', '蓝牙 LE')}</span>}
              {conn.ethernet && <span className={styles.connBadge}>{ui('Ethernet', '以太网')}</span>}
              {conn.cellular && <span className={styles.connBadge}>{ui('Cellular', '蜂窝网络')}</span>}
            </div>
          </div>
        </div>
      </BorderGlow>

      {loading && <div className={styles.statusBox}>{ui('Loading chip specs…', '加载芯片规格…')}</div>}
      {error && <div className={styles.statusBox}>{ui('Could not load chip specs.', '无法加载芯片规格。')}</div>}

      {detail && (
        <>
          {/* Overview */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{ui('Overview', '概述')}</h2>
            <div className={styles.specGrid}>
              <SpecTile label={ui('Architecture', '架构')} value={prettyArch(detail.arch)} />
              <SpecTile
                label={ui('Flash interface', 'Flash 接口')}
                value={detail.flashInterface ? detail.flashInterface.toUpperCase() : null}
              />
              <SpecTile label="SRAM" value={formatBytes(mem.sramBytes)} />
              <SpecTile label="ROM" value={formatBytes(mem.romBytes)} />
              <SpecTile label={ui('Flash max', 'Flash 最大')} value={formatBytes(mem.flashMaxBytes)} />
              {mem.psramMaxBytes > 0 && (
                <SpecTile label={ui('PSRAM max', 'PSRAM 最大')} value={formatBytes(mem.psramMaxBytes)} />
              )}
              <SpecTile label="VDD" value={pwr.vdd ? `${pwr.vdd.min}–${pwr.vdd.max} ${pwr.vdd.unit}` : null} />
              <SpecTile
                label={ui('Deep sleep', '深度睡眠电流')}
                value={pwr.deepSleepCurrent ? `${pwr.deepSleepCurrent.typical} ${pwr.deepSleepCurrent.unit}` : null}
              />
              {pwr.activeCurrent && conn.wifi && (
                <SpecTile
                  label={ui('Active (Wi-Fi)', '活跃 (Wi-Fi)')}
                  value={`${pwr.activeCurrent.wifi} ${pwr.activeCurrent.unit}`}
                />
              )}
              {pwr.activeCurrent && conn.ble && (
                <SpecTile
                  label={ui('Active (BLE)', '活跃 (BLE)')}
                  value={`${pwr.activeCurrent.ble} ${pwr.activeCurrent.unit}`}
                />
              )}
            </div>
          </section>

          {/* Wireless */}
          {(wifiSpec || bleSpec) && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{ui('Wireless', '无线')}</h2>
              <div className={styles.specGrid}>
                {wifiSpec && <SpecTile label={ui('Wi-Fi standard', 'Wi-Fi 标准')} value={wifiSpec.standard} />}
                {wifiSpec?.bands && <SpecTile label={ui('Bands', '频段')} value={wifiSpec.bands.join(', ')} />}
                {wifiSpec?.modes && <SpecTile label={ui('Modes', '模式')} value={wifiSpec.modes.join(', ')} />}
                {bleSpec && <SpecTile label={ui('Bluetooth', '蓝牙版本')} value={`BLE ${bleSpec.version}`} />}
              </div>
            </section>
          )}

          {/* Peripherals */}
          {periphEntries.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{ui('Peripherals', '外设')}</h2>
              <div className={styles.chipPeriphGrid}>
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
                  {ui(`Chip pinout — ${pinout.length}`, `芯片引脚 — ${pinout.length}`)}
                </summary>
                <div className={styles.pinTableWrap}>
                  <table className={styles.pinTable}>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>{ui('Name', '名称')}</th>
                        <th>GPIO</th>
                        <th>{ui('Type', '类型')}</th>
                        <th>{ui('Functions', '功能')}</th>
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
          {ui(`Boards on ${name} (${boards.length})`, `基于 ${name} 的开发板 (${boards.length})`)}
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
  CURRENT_BOARD_LOCALE = locale
  const zh = locale === 'zh'
  const baseBoards = boardsData.boards[locale] || boardsData.boards.en
  const boards = locale === 'ko' ? baseBoards.map(localizeBoard) : baseBoards
  const platforms = locale === 'ko' ? boardsData.platforms.map(localizePlatform) : boardsData.platforms
  const variants = (boardsData.variants || []).map(localizeVariant)
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

  const title = ui('Dev Boards', '开发板')
  const description = ui(
    'Browse TuyaOpen-supported dev boards and chip modules: specs, peripherals, pinouts, and purchase links.',
    '浏览 TuyaOpen 支持的开发板与芯片模组：规格、外设、引脚与购买链接。',
  )

  const menuItems = useMemo(
    () => [
      { key: 'all', text: ui('All', '全部'), count: boards.length },
      ...platforms.map((p) => ({
        key: p.id,
        text: pick(p.name, locale),
        count: p.count,
      })),
    ],
    [zh, boards, platforms],
  )

  const activePlatform = platformFilter === 'all' ? null : platforms.find((p) => p.id === platformFilter)
  const activeLabel = platformFilter === 'all' ? ui('All boards', '全部开发板') : pick(activePlatform?.name, locale)

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
                <span className={styles.heroBadge}>{ui('Hardware', '硬件')}</span>
                <h1 className={styles.heroTitle}>{title}</h1>
                <p className={styles.heroSubtitle}>{description}</p>
              </div>
            </header>

            {/* -------------------------------------- Body: sidebar + cards */}
            <div className={styles.shell}>
              <aside className={styles.sidebar}>
                <div className={styles.sidebarSticky}>
                  <p className={styles.sidebarTitle}>{ui('Platform', '平台')}</p>
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
                      placeholder={ui('Search boards…', '搜索开发板…')}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      aria-label={ui('Search boards', '搜索开发板')}
                    />
                    <span className={styles.resultCount}>
                      {filtered.length} {ui('boards', '块')}
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
                  <p className={styles.empty}>{ui('No boards match your search.', '没有匹配的开发板。')}</p>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </Layout>
  )
}
