import Head from '@docusaurus/Head'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useBaseUrl from '@docusaurus/useBaseUrl'
import Layout from '@theme/Layout'
import React, { useState } from 'react'

import { tuyaOpenCoreContent } from '../data/tuyaOpenCoreContent'
import { localePath } from '../utils/localePath'
import styles from './tuyaopen-core.module.css'

const CORE_URL = 'https://github.com/tuya/tuyaopen-core'
const FRAMEWORK_URL = 'https://github.com/tuya/TuyaOpen'
const MODULES = ['IoT', 'AI Agent', 'P2P']
const ECOSYSTEMS = ['Linux', 'ESP-IDF', 'RT-Thread', 'Zephyr', 'NuttX']
const CAPABILITY_ASSETS = ['iot', 'agent', 'p2p']

// Product iconography lives in static/img/tuyaopen-core (Seedream-generated
// 3D glass tiles). Two renderers are needed: <img> in HTML, <image> in SVG.
function IconAsset({ asset, size = 40, className }) {
  const src = useBaseUrl(`/img/tuyaopen-core/${asset}.png`)
  return (
    <img src={src} width={size} height={size} className={className} alt="" aria-hidden="true" loading="lazy" />
  )
}

function SvgIconAsset({ asset, size = 48, className }) {
  const href = useBaseUrl(`/img/tuyaopen-core/${asset}.png`)
  return <image href={href} width={size} height={size} className={className} />
}

// IoT is the foundation; Agent and P2P are optional core capabilities.
function toggleCapability(current, key) {
  if (!['agent', 'p2p'].includes(key)) return current
  return { ...current, [key]: !current[key] }
}

function VisualDefs({ id }) {
  return (
    <defs>
      <linearGradient id={`${id}-blue`} x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#b4d7ff" />
        <stop offset=".45" stopColor="#4d83f7" />
        <stop offset="1" stopColor="#3349c5" />
      </linearGradient>
      <linearGradient id={`${id}-teal`} x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#b5fff3" />
        <stop offset=".5" stopColor="#47cfc8" />
        <stop offset="1" stopColor="#147f96" />
      </linearGradient>
      <linearGradient id={`${id}-orange`} x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#ffe1bd" />
        <stop offset=".5" stopColor="#fda46c" />
        <stop offset="1" stopColor="#c86653" />
      </linearGradient>
      <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#7ca7f2" stopOpacity=".42" />
        <stop offset="1" stopColor="#243b72" stopOpacity=".25" />
      </linearGradient>
      <linearGradient id={`${id}-edge`} x1="0" y1="0" x2="1" y2="0">
        <stop stopColor="#24408c" />
        <stop offset=".55" stopColor="#516bde" />
        <stop offset="1" stopColor="#19335f" />
      </linearGradient>
      <radialGradient id={`${id}-aura`}>
        <stop stopColor="#597ffc" stopOpacity=".45" />
        <stop offset="1" stopColor="#597ffc" stopOpacity="0" />
      </radialGradient>
      <filter id={`${id}-shadow`} x="-40%" y="-50%" width="180%" height="230%">
        <feDropShadow dx="0" dy="14" stdDeviation="12" floodColor="#07153b" floodOpacity=".35" />
      </filter>
      <filter id={`${id}-glow`} x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="5" />
      </filter>
    </defs>
  )
}

function ModulePrism({ id, index, x, y, active = true, children }) {
  const color = ['blue', 'teal', 'orange'][index]
  return (
    <g transform={`translate(${x} ${y})`} className={styles.modulePrism} data-active={active}>
      <ellipse cx="60" cy="91" rx="63" ry="20" fill={`url(#${id}-aura)`} />
      <g filter={`url(#${id}-shadow)`}>
        <path d="M0 29 60 58 60 81 0 52Z" fill={index === 1 ? '#237e94' : index === 2 ? '#bc6654' : '#304bb7'} />
        <path d="m60 58 60-29v23L60 81Z" fill={index === 1 ? '#155563' : index === 2 ? '#87413d' : '#1a327d'} />
        <path d="M0 29 60 0 120 29 60 58Z" fill={`url(#${id}-${color})`} stroke="#e0efff" strokeOpacity=".75" />
        <path d="m9 29 51-24 51 24-51 24Z" fill="none" stroke="#eff7ff" strokeOpacity=".3" />
        <g transform="matrix(.8 .38 -.8 .38 60 11)" className={styles.prismIcon}>
          <SvgIconAsset asset={CAPABILITY_ASSETS[index]} size={48} />
        </g>
        <path d="m0 52 60 29 60-29" fill="none" stroke={['#82adff', '#6ce7dd', '#ffc092'][index]} strokeWidth="1.5" />
      </g>
      {children}
    </g>
  )
}

function EcosystemVisual({ copy }) {
  return (
    <figure className={styles.ecosystemVisual} aria-label={copy.diagram}>
      <svg className={styles.ecosystemArt} viewBox="0 0 520 390" fill="none" aria-hidden="true">
        <VisualDefs id="ecosystem-art" />
        <ellipse cx="260" cy="205" rx="208" ry="149" className={styles.systemOrbit} />
        <ellipse cx="260" cy="205" rx="165" ry="114" className={styles.systemOrbitInner} />
        <circle cx="260" cy="194" r="155" fill="url(#ecosystem-art-aura)" opacity=".55" />
        <g className={styles.systemLinks}>
          <path d="M260 190C189 190 190 62 86 62M260 190C340 190 340 62 434 62M260 190H58m202 0h202M260 190v126" />
        </g>
        <g className={styles.systemPortGlow}>
          <circle cx="170" cy="140" r="3" />
          <circle cx="350" cy="140" r="3" />
          <circle cx="169" cy="250" r="3" />
          <circle cx="351" cy="250" r="3" />
        </g>
        <g transform="translate(190 152)" filter="url(#ecosystem-art-shadow)">
          <path d="M0 36 70 70 140 36v25l-70 34L0 61Z" fill="url(#ecosystem-art-edge)" />
          <path d="M0 36 70 0 140 36 70 70Z" fill="url(#ecosystem-art-blue)" stroke="#bedaff" />
          <path d="m12 36 58-29 58 29-58 28Z" fill="none" stroke="#d5e6ff" strokeOpacity=".5" />
          <g transform="translate(50 16)" className={styles.systemCoreIcon}>
            <SvgIconAsset asset="core" size={40} />
          </g>
        </g>
      </svg>
      <div className={styles.systemCoreLabel}>
        <strong>TuyaOpen Core</strong>
      </div>
      {ECOSYSTEMS.map((name, i) => (
        <span className={styles.systemNode} key={name} data-node={i}>
          <IconAsset asset="system" size={18} />
          {name}
        </span>
      ))}
      <span className={styles.moreSystems}>
        <span aria-hidden="true">···</span>
        {copy.more}
      </span>
      <figcaption className={styles.visuallyHidden}>{copy.caption}</figcaption>
    </figure>
  )
}

function CompositionVisual({ selection, copy }) {
  return (
    <div className={styles.connectedComposition}>
      <div className={styles.compositionCloud}>
        <div className={styles.cloudIdentity}>
          <IconAsset asset="cloud" size={32} />
          <strong>{copy.cloud}</strong>
        </div>
        <p>{copy.cloudValue}</p>
        <span className={styles.cloudAI} data-active={selection.agent}>
          {copy.cloudAI}
        </span>
      </div>
      <p className={styles.cloudBridge}>{copy.cloudBridge}</p>
      <div className={styles.compositionVisual} aria-label={copy.legend}>
        <svg className={styles.compositionArt} viewBox="0 0 480 290" fill="none" aria-hidden="true">
          <VisualDefs id="composition-art" />
          <path d="M240 0h-109v22" className={styles.cloudAgentConnection} data-active={selection.agent} />
          <ellipse cx="240" cy="220" rx="207" ry="67" fill="url(#composition-art-aura)" opacity=".6" />
          <g className={styles.compositionSocket}>
            <path d="M55 202 240 120 425 202 240 283Z" fill="url(#composition-art-glass)" />
            <path d="M55 202 240 120 425 202 240 283Z" stroke="currentColor" />
            <path d="m73 202 167-74 167 74-167 74Z" stroke="currentColor" strokeDasharray="2 6" opacity=".4" />
          </g>
          <g className={styles.compositionBranch} data-active={selection.agent}>
            <path d="M131 98v55l109 49" />
            <path d="M131 98v55l109 49" className={styles.compositionPulse} />
          </g>
          <g className={styles.compositionBranch} data-active={selection.p2p}>
            <path d="M349 98v55l-109 49" />
            <path d="M349 98v55l-109 49" className={styles.compositionPulse} />
          </g>
          <ModulePrism id="composition-art" index={1} x={71} y={22} active={selection.agent} />
          <ModulePrism id="composition-art" index={2} x={289} y={22} active={selection.p2p} />
          <g transform="translate(180 165)">
            <ModulePrism id="composition-art" index={0} x={0} y={0} />
          </g>
        </svg>
        <span className={styles.compositionLabel} data-module="agent" data-active={selection.agent}>
          AI Agent
        </span>
        <span className={styles.compositionLabel} data-module="p2p" data-active={selection.p2p}>
          P2P
        </span>
        <span className={styles.compositionFoundation}>{copy.foundation}</span>
      </div>
    </div>
  )
}

function CapabilityComposer({ copy }) {
  const [selection, setSelection] = useState({ agent: true, p2p: false })
  const scenario = selection.agent ? (selection.p2p ? 'both' : 'agent') : selection.p2p ? 'p2p' : 'iot'
  return (
    <div className={styles.composer}>
      <div className={styles.composerLegend}>{copy.legend}</div>
      <div className={styles.composerControls} role="group" aria-label={copy.legend}>
        <button type="button" aria-pressed="true" disabled>
          <span aria-hidden="true">●</span>
          {copy.foundation}
        </button>
        {['agent', 'p2p'].map((key) => (
          <button
            type="button"
            key={key}
            aria-pressed={selection[key]}
            onClick={() => setSelection((current) => toggleCapability(current, key))}
          >
            <span aria-hidden="true">{selection[key] ? '−' : '+'}</span>
            {copy[key]}
          </button>
        ))}
      </div>
      <div className={styles.compositionBoard}>
        <CompositionVisual selection={selection} copy={copy} />
        <div className={styles.compositionStatus} role="status" aria-live="polite" aria-atomic="true">
          <span>{copy.result}</span>
          <p>{copy.scenarios[scenario]}</p>
        </div>
      </div>
      <p className={styles.composerNote}>{copy.note}</p>
    </div>
  )
}

function Arrow({ diagonal = false }) {
  return (
    <svg
      className={styles.arrow}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M4 12h15m-6-6 6 6-6 6'} />
    </svg>
  )
}

function CoreVisual({ copy }) {
  const capabilities = [
    { index: 0, color: '#9cbaff' },
    { index: 1, color: '#8dded6' },
    { index: 2, color: '#f3ba9b' },
  ]
  const systems = [
    ['Linux', 60, 239],
    ['RTOS', 580, 239],
    ['SDK', 125, 477],
    [`${copy.more} ···`, 515, 477],
  ]
  return (
    <figure className={styles.coreVisual} aria-label={copy.label}>
      <svg className={styles.coreArtwork} viewBox="0 0 640 570" fill="none" aria-hidden="true">
        <defs>
          <radialGradient id="core-scene-aura">
            <stop stopColor="#739fee" stopOpacity=".17" />
            <stop offset="1" stopColor="#739fee" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="core-scene-panel" x1="0" y1="0" x2=".85" y2="1">
            <stop stopColor="#263e60" />
            <stop offset=".5" stopColor="#172c47" />
            <stop offset="1" stopColor="#0e1f36" />
          </linearGradient>
          <linearGradient id="core-scene-edge" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#b6d4fb" stopOpacity=".65" />
            <stop offset=".4" stopColor="#7ba1d0" stopOpacity=".15" />
            <stop offset="1" stopColor="#9bb8de" stopOpacity=".35" />
          </linearGradient>
          <linearGradient id="core-scene-tile" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#fff" stopOpacity=".055" />
            <stop offset="1" stopColor="#fff" stopOpacity=".012" />
          </linearGradient>
          <linearGradient id="core-scene-reflection" x1="0" y1="0" x2=".6" y2="1">
            <stop stopColor="#b6d4ff" stopOpacity=".04" />
            <stop offset="1" stopColor="#b6d4ff" stopOpacity="0" />
          </linearGradient>
          <filter id="core-scene-shadow" x="-30%" y="-30%" width="160%" height="180%">
            <feDropShadow dx="0" dy="20" stdDeviation="24" floodColor="#020918" floodOpacity=".45" />
          </filter>
          <filter id="core-icon-shadow" x="-40%" y="-40%" width="180%" height="200%">
            <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#030e20" floodOpacity=".45" />
          </filter>
          {capabilities.map(({ index, color }) => (
            <linearGradient id={`core-scene-icon-${index}`} key={index} x1="0" y1="0" x2=".8" y2="1">
              <stop stopColor={color} stopOpacity=".4" />
              <stop offset=".45" stopColor={color} stopOpacity=".15" />
              <stop offset="1" stopColor={color} stopOpacity=".05" />
            </linearGradient>
          ))}
        </defs>
        <ellipse cx="320" cy="250" rx="280" ry="240" fill="url(#core-scene-aura)" />
        <g className={styles.sceneConnections}>
          <path d="M116 239c41 0 5 153 77 153h46m-114 60c0-35 105-10 132-44m267-169c-41 0-5 153-77 153h-46m114 60c0-35-105-10-132-44" />
          <path d="M116 239c41 0 5 153 77 153h46m285-153c-41 0-5 153-77 153h-46" className={styles.sceneSignal} />
        </g>
        <g data-core-container="true">
          <rect
            x="144"
            y="94"
            width="352"
            height="340"
            rx="24"
            fill="#091b32"
            stroke="#2a4367"
            transform="translate(0 6)"
          />
          <rect
            x="144"
            y="94"
            width="352"
            height="340"
            rx="24"
            fill="url(#core-scene-panel)"
            stroke="url(#core-scene-edge)"
            filter="url(#core-scene-shadow)"
          />
          <rect x="149" y="99" width="342" height="330" rx="20" stroke="#fff" strokeOpacity=".035" />
          <path d="M168 94h304" stroke="#b8d5ff" strokeOpacity=".42" />
          <path d="M168 434h304" stroke="#8daee0" strokeOpacity=".25" />
          <path d="M170 100h300q20 0 20 20v66L150 304V120q0-20 20-20Z" fill="url(#core-scene-reflection)" />
          <text x="320" y="145" textAnchor="middle" className={styles.sceneBrand}>
            TuyaOpen Core
          </text>
          <text x="320" y="173" textAnchor="middle" className={styles.sceneSubtitle}>
            {copy.composition}
          </text>
          {capabilities.map(({ index, color }) => (
            <g
              key={MODULES[index]}
              transform={`translate(168 ${195 + index * 55})`}
              data-core-capability={MODULES[index]}
            >
              <rect width="304" height="47" rx="10" fill="url(#core-scene-tile)" stroke="#adc8ee" strokeOpacity=".12" />
              <rect
                x="10"
                y="8"
                width="31"
                height="31"
                rx="9"
                fill={`url(#core-scene-icon-${index})`}
                stroke={color}
                strokeOpacity=".25"
              />
              <g transform="translate(14 12)" className={styles.sceneIcon}>
                <SvgIconAsset asset={CAPABILITY_ASSETS[index]} size={23} />
              </g>
              <text x="55" y="29" className={styles.sceneCapability}>
                {MODULES[index]}
              </text>
              <rect x="215" y="13" width="76" height="22" rx="11" fill={color} fillOpacity=".07" />
              <text x="253" y="28" textAnchor="middle" className={styles.sceneQualifier} fill={color}>
                {index === 0 ? copy.required : copy.optional}
              </text>
            </g>
          ))}
          <path d="M320 352v24" stroke="#809cc2" strokeOpacity=".3" />
          <rect x="238" y="376" width="164" height="32" rx="16" fill="#13293b" stroke="#94c9d1" strokeOpacity=".25" />
          <circle cx="254" cy="392" r="2.5" fill="#8dded6" />
          <text x="326" y="397" textAnchor="middle" className={styles.sceneAdapter}>
            {copy.adapter}
          </text>
          <circle cx="238" cy="392" r="3" fill="#cae5ef" />
          <circle cx="402" cy="392" r="3" fill="#cae5ef" />
        </g>
        {systems.map(([name, x, y]) => (
          <g key={name} transform={`translate(${x} ${y})`}>
            <rect x="-51" y="-25" width="102" height="50" rx="14" fill="#12243a" stroke="#87a6d0" strokeOpacity=".3" />
            <path d="M-33-25h66" stroke="#b7d0f0" strokeOpacity=".25" />
            <text y="6" textAnchor="middle" className={styles.sceneSystem}>
              {name}
            </text>
          </g>
        ))}
        <text x="320" y="528" textAnchor="middle" className={styles.scenePlatform}>
          {copy.platform}
        </text>
      </svg>
    </figure>
  )
}

function SectionHeading({ label, title, description, id }) {
  return (
    <div className={styles.sectionHeading}>
      <p className={styles.eyebrow}>{label}</p>
      <h2 id={id}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  )
}

function Architecture({ copy }) {
  return (
    <figure className={styles.architectureFigure} aria-label={copy.aria}>
      <div className={styles.architectureHost}>
        <div className={styles.hostHeading}>
          <strong>{copy.host}</strong>
          <span>{copy.hostDetail}</span>
        </div>
        <div className={styles.hostApplication}>{copy.application}</div>
        <div className={styles.hostLibraries}>
          <div className={styles.architectureCore}>
            <strong className={styles.architectureBrand}>TuyaOpen Core</strong>
            <p className={styles.layerCaption}>{copy.library}</p>
            <div className={styles.architectureModules}>
              {MODULES.map((name) => (
                <strong key={name}>{name}</strong>
              ))}
            </div>
            <div className={styles.hostAdapter}>{copy.adapter}</div>
          </div>
          <div className={styles.hostComponents}>
            <IconAsset asset="core" size={40} />
            <strong>{copy.components}</strong>
            <span>{copy.componentsDetail}</span>
          </div>
        </div>
        <div className={styles.hostServices}>{copy.services}</div>
      </div>
      <div className={styles.hostHardware}>{copy.hardware}</div>
    </figure>
  )
}

export default function TuyaOpenCorePage() {
  const { i18n } = useDocusaurusContext()
  const locale = i18n.currentLocale
  const copy = tuyaOpenCoreContent[locale] || tuyaOpenCoreContent.en
  const heroDocsPath = localePath(locale, copy.hero.docs)

  return (
    <Layout title={copy.meta.title} description={copy.meta.description}>
      <Head>
        <meta property="og:title" content={copy.meta.title} />
        <meta property="og:description" content={copy.meta.description} />
      </Head>
      <main className={styles.page}>
        <div className={styles.heroShell}>
          <section className={`${styles.hero} ${styles.container}`} aria-labelledby="core-title">
            <div className={styles.heroContent}>
              <p className={styles.eyebrow}>
                <span className={styles.orangeDot} />
                {copy.hero.eyebrow}
              </p>
              <h1 id="core-title">
                TuyaOpen{' '}
                <span>
                  Core<span className={styles.titleDot}>.</span>
                </span>
              </h1>
              <p className={styles.heroClaim}>
                <span>{copy.hero.title}</span> <span>{copy.hero.accent}</span>
              </p>
              <p className={styles.heroDescription}>{copy.hero.description}</p>
              <div className={styles.actions}>
                <Link className={styles.primaryButton} to={heroDocsPath}>
                  {copy.hero.explore}
                  <Arrow />
                </Link>
                <Link className={styles.secondaryButton} href={CORE_URL}>
                  {copy.hero.github}
                  <Arrow diagonal />
                </Link>
              </div>
              <p className={styles.heroNote}>{copy.hero.note}</p>
            </div>
            <CoreVisual copy={copy.visual} />
          </section>
        </div>

        <section className={`${styles.adaptationSection} ${styles.container}`} aria-labelledby="adaptation-title">
          <SectionHeading
            label={copy.flexibility.ecosystem.label}
            title={copy.flexibility.ecosystem.title}
            description={copy.flexibility.ecosystem.body}
            id="adaptation-title"
          />
          <div className={styles.adaptationScene}>
            <EcosystemVisual copy={copy.flexibility.ecosystem} />
            <p className={styles.ecosystemCaption}>{copy.flexibility.ecosystem.caption}</p>
          </div>
        </section>

        <section className={styles.compositionSection} aria-labelledby="composition-title">
          <div className={styles.container}>
            <SectionHeading
              label={copy.flexibility.composition.label}
              title={copy.flexibility.composition.title}
              description={copy.flexibility.composition.body}
              id="composition-title"
            />
            <CapabilityComposer copy={copy.flexibility.composition} />
          </div>
        </section>

        <section className={styles.capabilities} id="capabilities" aria-labelledby="capabilities-title">
          <div className={styles.container}>
            <SectionHeading {...copy.capabilities} id="capabilities-title" />
            <div className={styles.capabilityList}>
              {copy.capabilities.items.map((item, index) => (
                <article className={styles.capability} key={item.name}>
                  <div className={styles.capabilityIdentity}>
                    <span>0{index + 1}</span>
                    <div className={styles.capabilityIcon}>
                      <IconAsset asset={CAPABILITY_ASSETS[index]} size={52} />
                    </div>
                    <h3>{item.name}</h3>
                  </div>
                  <div className={styles.capabilityBody}>
                    <h4>{item.title}</h4>
                    <p>{item.body}</p>
                    <ul className={styles.tags}>
                      {item.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.flow} aria-hidden="true">
                    {item.flow.map((step, i) => (
                      <React.Fragment key={step}>
                        {i > 0 && <span className={styles.flowConnector} />}
                        <span className={i === 1 ? styles.flowCore : styles.flowEndpoint}>{step}</span>
                      </React.Fragment>
                    ))}
                  </div>
                  <Link className={styles.capabilityDocsLink} to={localePath(locale, item.docs)}>
                    {copy.capabilities.docsCta}
                    <span aria-hidden="true">→</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.architecture} aria-labelledby="architecture-title">
          <div className={`${styles.container} ${styles.architectureLayout}`}>
            <SectionHeading {...copy.architecture} id="architecture-title" />
            <Architecture copy={copy.architecture} />
          </div>
        </section>

        <section className={`${styles.relationship} ${styles.container}`} aria-labelledby="relationship-title">
          <SectionHeading {...copy.relationship} id="relationship-title" />
          <div className={styles.relationshipGrid}>
            {['core', 'full'].map((key) => (
              <article key={key} className={key === 'core' ? styles.relationshipCore : ''}>
                <span className={styles.relationshipLabel}>{copy.relationship[key].label}</span>
                <div className={styles.relationshipVisual} aria-hidden="true">
                  <IconAsset asset={key === 'core' ? 'rel-core' : 'rel-full'} size={150} />
                </div>
                <h3>{copy.relationship[key].title}</h3>
                <p>{copy.relationship[key].body}</p>
                {key === 'full' && (
                  <Link className={styles.textLink} href={FRAMEWORK_URL}>
                    {copy.relationship.link}
                    <Arrow diagonal />
                  </Link>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className={styles.closing} aria-labelledby="closing-title">
          <div className={styles.container}>
            <p className={styles.eyebrow}>{copy.closing.label}</p>
            <h2 id="closing-title">{copy.closing.title}</h2>
            <p>{copy.closing.description}</p>
            <Link className={styles.primaryButton} href={CORE_URL}>
              {copy.closing.cta}
              <Arrow diagonal />
            </Link>
            <div className={styles.closingModules} aria-hidden="true">
              IoT
              <span />
              AI Agent
              <span />
              P2P
            </div>
          </div>
        </section>
      </main>
    </Layout>
  )
}
