import Head from '@docusaurus/Head'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import { clsx } from 'clsx'
import React, { useEffect, useRef, useState } from 'react'

import IconGithub from '../../static/img/icons/github.svg'
import IconHelp from '../../static/img/icons/help.svg'
import IconOctocat from '../../static/img/icons/octocat.svg'
import { homepageCopy } from '../data/homepageCopy'
import styles from './index.module.css'

function Home() {
  const { siteConfig, i18n } = useDocusaurusContext()
  const locale = i18n.currentLocale === 'zh' ? 'zh' : 'en'
  const copy = homepageCopy[locale]
  const [cloudDiagramLightboxOpen, setCloudDiagramLightboxOpen] = useState(false)
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0)
  const tuyaAiSectionRef = useRef(null)
  const tuyaAiCarouselRef = useRef(null)
  const tuyaAiWheelAccumRef = useRef(0)
  const [tuyaAiSlideIndex, setTuyaAiSlideIndex] = useState(0)
  const [tuyaAiCarouselMinHeightPx, setTuyaAiCarouselMinHeightPx] = useState(null)
  const [devStorySelectedImageIndex, setDevStorySelectedImageIndex] = useState(null)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTuyaAiSlideIndex(0)
      return undefined
    }
    const el = tuyaAiSectionRef.current
    if (!el) {
      return undefined
    }
    const updateTuyaAiSlide = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      if (rect.bottom < 0 || rect.top > vh) {
        return
      }
      const center = vh / 2
      const p = (center - rect.top) / Math.max(1, rect.height)
      const clamped = Math.max(0, Math.min(1, p))
      const idx = Math.min(copy.tuyaAi.images.length - 1, Math.floor(clamped * copy.tuyaAi.images.length))
      setTuyaAiSlideIndex((prev) => (prev === idx ? prev : idx))
    }
    window.addEventListener('scroll', updateTuyaAiSlide, { passive: true })
    window.addEventListener('resize', updateTuyaAiSlide, { passive: true })
    updateTuyaAiSlide()
    return () => {
      window.removeEventListener('scroll', updateTuyaAiSlide)
      window.removeEventListener('resize', updateTuyaAiSlide)
    }
  }, [locale, copy.tuyaAi.images.length])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }
    const el = tuyaAiCarouselRef.current
    if (!el) {
      return undefined
    }
    tuyaAiWheelAccumRef.current = 0
    const n = copy.tuyaAi.images.length
    const onWheel = (e) => {
      const h = el.clientHeight
      const segment = Math.max(32, h / 3)
      tuyaAiWheelAccumRef.current += e.deltaY
      let consumed = false
      while (tuyaAiWheelAccumRef.current >= segment) {
        tuyaAiWheelAccumRef.current -= segment
        setTuyaAiSlideIndex((i) => Math.min(n - 1, i + 1))
        consumed = true
      }
      while (tuyaAiWheelAccumRef.current <= -segment) {
        tuyaAiWheelAccumRef.current += segment
        setTuyaAiSlideIndex((i) => Math.max(0, i - 1))
        consumed = true
      }
      if (consumed) {
        e.preventDefault()
      }
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      el.removeEventListener('wheel', onWheel)
    }
  }, [locale, copy.tuyaAi.images.length])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }
    setTuyaAiCarouselMinHeightPx(null)
    const el = tuyaAiCarouselRef.current
    if (!el) {
      return undefined
    }
    const urls = copy.tuyaAi.images.map((item) => item.src)

    const measureMaxHeight = () => {
      const w = el.clientWidth
      if (w < 8) {
        return
      }
      Promise.all(
        urls.map(
          (url) =>
            new Promise((resolve) => {
              const img = new Image()
              img.onload = () => {
                const nw = img.naturalWidth
                const nh = img.naturalHeight
                if (nw < 1 || nh < 1) {
                  resolve(0)
                  return
                }
                resolve((nh / nw) * w)
              }
              img.onerror = () => resolve(0)
              img.src = url
            }),
        ),
      ).then((heights) => {
        const maxH = Math.max(0, ...heights)
        if (maxH > 0) {
          setTuyaAiCarouselMinHeightPx(maxH)
        }
      })
    }

    measureMaxHeight()
    const ro = new ResizeObserver(() => {
      measureMaxHeight()
    })
    ro.observe(el)
    return () => {
      ro.disconnect()
    }
  }, [locale])

  useEffect(() => {
    if (!cloudDiagramLightboxOpen) {
      return undefined
    }
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setCloudDiagramLightboxOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [cloudDiagramLightboxOpen])

  useEffect(() => {
    setSelectedStoryIndex(0)
    setDevStorySelectedImageIndex(null)
  }, [locale])

  const storyItems = copy.applicationsUseCases.items
  const activeStory = storyItems[selectedStoryIndex] ?? storyItems[0]

  return (
    <Layout description={copy.metaDescription}>
      <Head>
        <title>TuyaOpen: {siteConfig.tagline}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className={styles.landingRoot}>
        <main className={styles.landingMain}>
          {/* Hero */}
          <section className={styles.landingHero}>
            <div className={styles.heroGlow} aria-hidden />
            <div className={styles.heroInner}>
              <div className={styles.heroGrid}>
                <div>
                  <div className={styles.heroBadge}>
                    <span className={styles.heroBadgeAccent}>●</span> {copy.hero.badge}
                  </div>
                  <h1 className={styles.heroTitle}>
                    <span className={styles.heroTitleGradient}>{copy.hero.line1}</span>
                    <br />
                    {copy.hero.line2}
                    <br />
                    <span className={styles.heroTitleGradient}>{copy.hero.line3}</span>
                  </h1>
                  <p className={styles.heroSubtitle}>{copy.hero.subtitle}</p>
                  <p className={styles.heroBody}>{copy.hero.body}</p>
                  <div className={styles.heroButtons}>
                    <Link to="/docs/quick-start/enviroment-setup" className={styles.btnAccent}>
                      {copy.cta.quickStart} →
                    </Link>
                    <Link to="/docs/about-tuyaopen" className={styles.btnOutlineLight}>
                      {copy.cta.about}
                    </Link>
                    <Link to="#applications-use-cases-heading" className={styles.btnOutlineLight}>
                      {copy.cta.applications}
                    </Link>
                    <Link to="https://github.com/tuya/TuyaOpen" className={styles.btnGhostLight}>
                      <IconOctocat className="tw-w-4 tw-h-4 tw-fill-white" />
                      {copy.cta.github}
                    </Link>
                  </div>
                </div>
                <div className="scroll-to-display">
                  <div className={styles.codeWindow}>
                    <div className={styles.codeHeader}>
                      <span className={styles.codeDot} style={{ background: '#EF4444' }} />
                      <span className={styles.codeDot} style={{ background: '#F59E0B' }} />
                      <span className={styles.codeDot} style={{ background: '#10B981' }} />
                      <span className={styles.codeTitle}>terminal</span>
                    </div>
                    <pre className={styles.codeBody}>
                      <code>{copy.hero.codePreview}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Social proof strip */}
          <section className={styles.socialProof}>
            <div className={styles.socialProofGrid}>
              {copy.socialProof.items.map((item) => (
                <div key={item.label} className={styles.proofItem}>
                  <div className={styles.proofLabel}>{item.label}</div>
                  <div className={styles.proofHint}>{item.hint}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Benefits */}
          <section className={styles.featuresSection}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>{copy.benefits.sectionTag}</span>
              <h2 className={styles.sectionTitle}>{copy.benefits.title}</h2>
              <p className={styles.sectionSubtitle}>{copy.benefits.subtitle}</p>
            </div>
            <div className={styles.featuresGrid}>
              {copy.benefits.items.map((item, i) => (
                <div key={item.title} className={clsx(styles.featureCard, 'scroll-to-display')}>
                  <div className={styles.featureIcon}>{i + 1}</div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Audience */}
          <section className={styles.audienceSection}>
            <div className={styles.container}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionTag}>{copy.audience.sectionTag}</span>
                <h2 className={styles.sectionTitle}>{copy.audience.title}</h2>
                <p className={styles.sectionSubtitle}>{copy.audience.subtitle}</p>
              </div>
              <div className={styles.audienceGrid}>
                {copy.audience.items.map((item) => (
                  <article key={item.title} className={clsx(styles.audienceCard, 'scroll-to-display')}>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Code showcase (full): copy left, terminal + CTAs top-right on wide screens */}
          <section className={styles.codeShowcase}>
            <div className={styles.codeShowcaseInner}>
              <div className={styles.codeShowcaseGrid}>
                <div className={styles.codeShowcaseIntro}>
                  <div className={styles.codeShowcaseHeader}>
                    <span className={styles.sectionTag}>{copy.code.sectionTag}</span>
                    <h2 className={styles.sectionTitle}>{copy.code.title}</h2>
                    <p className={styles.sectionSubtitle}>{copy.code.caption}</p>
                  </div>
                </div>
                <div className={styles.codeShowcaseAside}>
                  <div className={clsx(styles.codeWindow, 'scroll-to-display')}>
                    <div className={styles.codeHeader}>
                      <span className={styles.codeDot} style={{ background: '#EF4444' }} />
                      <span className={styles.codeDot} style={{ background: '#F59E0B' }} />
                      <span className={styles.codeDot} style={{ background: '#10B981' }} />
                      <span className={styles.codeTitle}>terminal</span>
                    </div>
                    <pre className={styles.codeBody}>
                      <code>{copy.code.block}</code>
                    </pre>
                  </div>
                  <div className={styles.codeLinks}></div>
                </div>
              </div>
              <div className={styles.codeShowcaseSteps}>
                <div className={styles.codeShowcaseHeader}>
                  <h2 className={styles.sectionTitle}>{copy.steps.title}</h2>
                </div>
                <div className={styles.codeShowcaseStepsGrid}>
                  {copy.steps.items.map((step, i) => (
                    <div key={step.title} className={clsx(styles.codeShowcaseStepCard, 'scroll-to-display')}>
                      <div className={styles.featureIcon}>{i + 1}</div>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                      <div className={styles.codeShowcaseStepLinks}>
                        {step.ctaLink && step.ctaLabel ? (
                          <Link to={step.ctaLink} className={clsx(styles.codeLinkBtn, styles.codeLinkBtnSecondary)}>
                            {step.ctaLabel} →
                          </Link>
                        ) : null}
                        {i === 1 ? (
                          <Link
                            to="/docs/tos-tools/tos-guide"
                            className={clsx(styles.codeLinkBtn, styles.codeLinkBtnPrimary)}
                          >
                            {copy.cta.tosGuide}
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Cloud interaction one-pager: hardware (left) + cloud (right), full diagram below */}
          <section className={styles.cloudOnePager} aria-labelledby="cloud-one-pager-heading">
            <div className={styles.cloudOnePagerInner}>
              <div className={styles.cloudOnePagerHeader}>
                <span className={styles.sectionTag}>{copy.cloudOnePager.sectionTag}</span>
                <h2 id="cloud-one-pager-heading" className={styles.sectionTitle}>
                  {copy.cloudOnePager.title}
                </h2>
                <p className={styles.sectionSubtitle}>{copy.cloudOnePager.subtitle}</p>
              </div>
              <div className={styles.cloudOnePagerSplit}>
                <div className={clsx(styles.cloudOnePagerCol, styles.cloudOnePagerColHardware, 'scroll-to-display')}>
                  <h3 className={styles.cloudOnePagerColTitle}>{copy.cloudOnePager.hardwareTitle}</h3>
                  <ul className={styles.cloudOnePagerList}>
                    {copy.cloudOnePager.hardwareBullets.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
                <div className={clsx(styles.cloudOnePagerCol, styles.cloudOnePagerColCloud, 'scroll-to-display')}>
                  <h3 className={styles.cloudOnePagerColTitle}>{copy.cloudOnePager.cloudTitle}</h3>
                  <ul className={styles.cloudOnePagerList}>
                    {copy.cloudOnePager.cloudBullets.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <figure className={clsx(styles.cloudOnePagerFigure, 'scroll-to-display')}>
                <button
                  type="button"
                  className={styles.cloudOnePagerImgButton}
                  onClick={() => setCloudDiagramLightboxOpen(true)}
                  aria-label={`${copy.cloudOnePager.diagramZoomHint}: ${copy.cloudOnePager.diagramCaption}`}
                >
                  <img
                    className={styles.cloudOnePagerImg}
                    src={copy.cloudOnePager.diagramUrl}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    aria-hidden
                  />
                </button>
                <figcaption className={styles.cloudOnePagerFigcaption}>
                  {copy.cloudOnePager.diagramCaption}{' '}
                  <span className={styles.cloudOnePagerZoomHint}>{copy.cloudOnePager.diagramZoomHint}</span>
                </figcaption>
              </figure>
            </div>
          </section>

          {/* Platforms + Demos */}
          <section className={styles.lightSection}>
            <div className={styles.container}>
              <div className={clsx(styles.platformsBlock, 'tw-mb-12 scroll-to-display')}>
                <h2 className={styles.platformsMainTitle}>{copy.platforms.title}</h2>
                <p className={styles.platformsIntro}>{copy.platforms.intro}</p>
                <ul className="tw-sr-only">
                  {copy.platforms.categories.map((cat) => (
                    <li key={cat.id}>
                      {cat.label}.{cat.subtext ? ` ${cat.subtext}` : ''}{' '}
                      {cat.items
                        .map((item) => {
                          let t = item.name
                          if (item.multimodal) {
                            t += ` (${copy.platforms.multimodalTag})`
                          }
                          if (item.recommended) {
                            t += ` (${copy.platforms.recommendedTag})`
                          }
                          return t
                        })
                        .join(', ')}
                    </li>
                  ))}
                </ul>
                <div className={styles.platformsStack}>
                  {copy.platforms.categories.map((cat) => (
                    <div key={cat.id} className={styles.platformsCategory}>
                      <div className={styles.platformsCategoryHead}>
                        <span className={styles.platformsCategoryLabel}>{cat.label}</span>
                        {cat.subtext ? <p className={styles.platformsCategorySubtext}>{cat.subtext}</p> : null}
                      </div>
                      <div className={styles.platformsMarqueeShell}>
                        <div className={styles.platformsChipRow}>
                          {cat.items.map((item) => (
                            <div key={`${cat.id}-${item.name}`} className={styles.platformCard}>
                              <span className={styles.platformCardName}>{item.name}</span>
                              {item.multimodal ? (
                                <span className={styles.platformCardAiGlow}>{copy.platforms.multimodalTag}</span>
                              ) : null}
                              {item.recommended ? (
                                <span className={styles.platformCardBadge}>{copy.platforms.recommendedTag}</span>
                              ) : null}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={clsx(styles.panel, 'scroll-to-display')}>
                <h2 className={clsx(styles.sectionTitle, styles.demosTitle)}>{copy.demos.title}</h2>
                <p className={clsx(styles.sectionSubtitle, styles.demosIntro)}>{copy.demos.intro}</p>
                <div className={styles.demosGrid}>
                  {copy.demos.items.map((d) => (
                    <article key={d.name} className={styles.demoCard}>
                      <h3 className={styles.demoCardName}>{d.name}</h3>
                      <p className={styles.demoCardDesc}>{d.desc}</p>
                      <div className={styles.demoCardLinks}>
                        <Link
                          to={d.codeLink}
                          className={clsx(styles.btnOutlineDark, styles.demoCardLinkBtn)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {copy.demos.codeCta}
                        </Link>
                        {!d.hideGuide ? (
                          <Link to={d.guideLink} className={clsx(styles.btnOutlineDark, styles.demoCardLinkBtn)}>
                            {copy.demos.guideCta}
                          </Link>
                        ) : null}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* T5 + Tuya AI (partners follow customer stories + applications) */}
          <section className={styles.lightSection}>
            <div className={styles.container}>
              <div
                className={clsx(
                  styles.experimentalArduino,
                  styles.experimentalArduinoTuyaAi,
                  styles.experimentalArduinoT5,
                  'scroll-to-display',
                )}
              >
                <div className={styles.experimentalArduinoInner}>
                  <div className={styles.experimentalArduinoCopy}>
                    <h2 className={styles.experimentalArduinoTitle}>
                      <span className={styles.spotlightTitleGrad}>{copy.t5.title}</span>
                    </h2>
                    <p className={styles.experimentalArduinoBody}>{copy.t5.body}</p>
                    <Link
                      to="/docs/hardware-specific/tuya-t5/t5-ai-board/overview-t5-ai-board"
                      className={clsx(styles.btnSolidPrimary, 'tw-mt-4 tw-inline-flex')}
                    >
                      {copy.cta.learnMore} →
                    </Link>
                  </div>
                  <div className={styles.experimentalArduinoVisual}>
                    <div className={styles.experimentalArduinoFloat}>
                      <div className={styles.experimentalArduinoFigure}>
                        <img
                          src={copy.t5.imageSrc}
                          alt={copy.t5.imageAlt}
                          className={styles.experimentalArduinoImg}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Experimental: Arduino IDE on T5 — image left, floating tilt */}
              <div className={clsx(styles.experimentalArduino, 'scroll-to-display')}>
                <div className={styles.experimentalArduinoInner}>
                  <div className={styles.experimentalArduinoVisual}>
                    <div className={styles.experimentalArduinoFloat}>
                      <div className={styles.experimentalArduinoFigure}>
                        <img
                          src={copy.arduinoExperimental.imageUrl}
                          alt={copy.arduinoExperimental.imageAlt}
                          className={styles.experimentalArduinoImg}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.experimentalArduinoCopy}>
                    <span className={styles.experimentalArduinoTag}>{copy.arduinoExperimental.sectionTag}</span>
                    <h2 className={styles.experimentalArduinoTitle}>
                      <span className={styles.spotlightTitleGrad}>{copy.arduinoExperimental.title}</span>
                    </h2>
                    <p className={styles.experimentalArduinoBody}>{copy.arduinoExperimental.body}</p>
                    <Link
                      to={copy.arduinoExperimental.ctaPath}
                      className={clsx(styles.btnSolidPrimary, 'tw-inline-flex')}
                    >
                      {copy.cta.learnMore} →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Tuya AI — same gradient card as Arduino; copy left, image right, left-facing tilt; scroll syncs 3 screenshots */}
              <div
                ref={tuyaAiSectionRef}
                className={clsx(styles.experimentalArduino, styles.experimentalArduinoTuyaAi, 'scroll-to-display')}
              >
                <div className={styles.experimentalArduinoInner}>
                  <div className={styles.experimentalArduinoCopy}>
                    <span className={styles.experimentalArduinoTag}>{copy.tuyaAi.sectionTag}</span>
                    <h2 className={styles.experimentalArduinoTitle}>
                      <span className={styles.spotlightTitleGrad}>{copy.tuyaAi.title}</span>
                    </h2>
                    <p className={styles.experimentalArduinoBody}>{copy.tuyaAi.body}</p>
                    {copy.tuyaAi.highlights?.length ? (
                      <ul className={styles.experimentalArduinoHighlights}>
                        {copy.tuyaAi.highlights.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    ) : null}
                    <Link
                      to="/docs/cloud/tuya-cloud/ai-agent/ai-agent-dev-platform"
                      className={clsx(styles.btnSolidPrimary, 'tw-inline-flex')}
                    >
                      {copy.cta.learnMore} →
                    </Link>
                  </div>
                  <div className={styles.experimentalArduinoVisual}>
                    <div className={styles.experimentalArduinoFloat}>
                      <figure
                        className={styles.experimentalArduinoFigure}
                        aria-live="polite"
                        aria-label={`${copy.tuyaAi.title} ${tuyaAiSlideIndex + 1} / ${copy.tuyaAi.images.length}`}
                      >
                        <div
                          ref={tuyaAiCarouselRef}
                          className={styles.tuyaAiCarousel}
                          style={
                            tuyaAiCarouselMinHeightPx != null
                              ? { minHeight: `${Math.round(tuyaAiCarouselMinHeightPx)}px` }
                              : undefined
                          }
                        >
                          <img
                            src={copy.tuyaAi.images[tuyaAiSlideIndex].src}
                            alt={copy.tuyaAi.images[tuyaAiSlideIndex].alt}
                            className={clsx(styles.experimentalArduinoImg, styles.tuyaAiCarouselImg)}
                            key={copy.tuyaAi.images[tuyaAiSlideIndex].src}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </figure>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Applications and use cases: left nav + right content/media */}
          <section className={styles.customerStories} aria-labelledby="applications-use-cases-heading">
            <div className={styles.container}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionTag}>{copy.applicationsUseCases.sectionTag}</span>
                <h2 id="applications-use-cases-heading" className={styles.sectionTitle}>
                  {copy.applicationsUseCases.title}
                </h2>
                <p className={styles.sectionSubtitle}>{copy.applicationsUseCases.subtitle}</p>
              </div>
              <div className={clsx(styles.customerStoriesSplit, 'scroll-to-display')}>
                <div
                  className={styles.customerStoriesNav}
                  role="tablist"
                  aria-label={copy.applicationsUseCases.navAriaLabel}
                >
                  {storyItems.map((item, i) => (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={selectedStoryIndex === i}
                      aria-controls={`story-panel-${item.id}`}
                      id={`story-tab-${item.id}`}
                      className={clsx(
                        styles.customerStoriesNavBtn,
                        selectedStoryIndex === i && styles.customerStoriesNavBtnActive,
                      )}
                      onClick={() => setSelectedStoryIndex(i)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <div
                  className={styles.customerStoriesPanel}
                  role="tabpanel"
                  id={`story-panel-${activeStory.id}`}
                  aria-labelledby={`story-tab-${activeStory.id}`}
                >
                  <div className={styles.customerStoriesPanelSplit}>
                    <div className={styles.customerStoriesPanelText}>
                      <h3 className={styles.customerStoriesPanelTitle}>{activeStory.title}</h3>
                      <p className={styles.customerStoriesPanelBody}>{activeStory.body}</p>
                      {activeStory.highlights?.length ? (
                        <ul className={styles.customerStoriesHighlights}>
                          {activeStory.highlights.map((line) => (
                            <li key={line}>{line}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                    <div className={styles.customerStoriesPanelMedia}>
                      <div className={styles.customerStoriesMediaBlock}>
                        <div className={styles.customerStoriesMediaWrap}>
                          {activeStory.mediaType === 'video' ? (
                            <video
                              className={styles.customerStoriesMedia}
                              controls
                              playsInline
                              preload="metadata"
                              {...(activeStory.poster ? { poster: activeStory.poster } : {})}
                            >
                              <source src={activeStory.mediaSrc} type="video/mp4" />
                            </video>
                          ) : (
                            <img
                              className={styles.customerStoriesMedia}
                              src={activeStory.mediaSrc}
                              alt={activeStory.mediaAlt}
                              loading="lazy"
                              decoding="async"
                            />
                          )}
                        </div>
                        {activeStory.mediaCredit ? (
                          <p className={styles.customerStoriesMediaCredit}>
                            <a href={activeStory.mediaCredit.href} target="_blank" rel="noopener noreferrer">
                              {activeStory.mediaCredit.label}
                            </a>
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Developer story */}
          <section className={styles.devStorySection}>
            <div className={styles.container}>
              <div className={styles.sectionHeader}>
                <span className={clsx(styles.sectionTag, styles.devStoryTag)}>{copy.developerStory.sectionTag}</span>
                <h2 className={styles.sectionTitle}>
                  <span className={styles.devStoryTitleColor}>{copy.developerStory.title}</span>
                </h2>
                <p className={styles.sectionSubtitle}>{copy.developerStory.subtitle}</p>
              </div>
              <div className={clsx(styles.devStorySplit, 'scroll-to-display')}>
                <article className={styles.devStoryNarrative}>
                  <p>{copy.developerStory.story}</p>
                  {copy.developerStory.highlights?.length ? (
                    <ul className={styles.devStoryHighlights}>
                      {copy.developerStory.highlights.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  ) : null}
                </article>
                <div className={styles.devStoryMediaPanel}>
                  <figure
                    className={styles.devStoryVideoCard}
                    role="region"
                    aria-label={copy.developerStory.videoAriaLabel}
                  >
                    <div className={styles.devStoryMediaFrame}>
                      {devStorySelectedImageIndex == null ? (
                        <iframe
                          src={copy.developerStory.videoEmbed.src}
                          title={copy.developerStory.videoEmbed.title}
                          className={styles.devStoryEmbed}
                          loading="lazy"
                          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        />
                      ) : (
                        <div
                          className={styles.devStoryMainImageStage}
                          style={{
                            '--dev-story-image-bg': `url("${copy.developerStory.galleryImages[devStorySelectedImageIndex].src}")`,
                          }}
                        >
                          <img
                            src={copy.developerStory.galleryImages[devStorySelectedImageIndex].src}
                            alt={copy.developerStory.galleryImages[devStorySelectedImageIndex].alt}
                            className={styles.devStoryMainImage}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      )}
                    </div>
                  </figure>
                  <div
                    className={styles.devStoryGallery}
                    role="region"
                    aria-label={copy.developerStory.galleryAriaLabel}
                  >
                    <figure className={styles.devStoryGalleryCard}>
                      <button
                        type="button"
                        className={clsx(
                          styles.devStoryGalleryBtn,
                          devStorySelectedImageIndex == null && styles.devStoryGalleryBtnActive,
                        )}
                        onClick={() => setDevStorySelectedImageIndex(null)}
                        aria-pressed={devStorySelectedImageIndex == null}
                        aria-label={copy.developerStory.videoEmbed.title}
                      >
                        <span className={styles.devStoryVideoThumb}>
                          <span className={styles.devStoryVideoThumbPlay}>▶</span>
                        </span>
                      </button>
                    </figure>
                    {copy.developerStory.galleryImages.map((img, index) => (
                      <figure key={`${img.src}-${index}`} className={styles.devStoryGalleryCard}>
                        <button
                          type="button"
                          className={clsx(
                            styles.devStoryGalleryBtn,
                            devStorySelectedImageIndex === index && styles.devStoryGalleryBtnActive,
                          )}
                          onClick={() => setDevStorySelectedImageIndex(index)}
                          aria-pressed={devStorySelectedImageIndex === index}
                        >
                          <img
                            src={img.src}
                            alt={img.alt}
                            className={styles.devStoryThumbImg}
                            loading="lazy"
                            decoding="async"
                          />
                        </button>
                      </figure>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Partners — no bottom padding so band meets community gradient */}
          <section className={clsx(styles.lightSection, styles.lightSectionFlushBottom)}>
            <div className={styles.container}>
              <div className={clsx(styles.partnersShowcase, 'scroll-to-display')}>
                <div className={styles.partnersShowcaseHeader}>
                  <span className={styles.partnersShowcaseTag}>{copy.partners.sectionTag}</span>
                  <h2 className={styles.partnersShowcaseTitle}>{copy.partners.title}</h2>
                  <p className={styles.partnersShowcaseSubtitle}>{copy.partners.subtitle}</p>
                </div>
                {copy.partners.colabSections?.length > 0 ? (
                  <div className={styles.partnersColabBlock}>
                    {copy.partners.colabSections.map((section, secIdx) => (
                      <div key={secIdx} className={styles.partnersColabSection}>
                        <h3 className={styles.partnersColabTitle}>{section.title}</h3>
                        <div className={styles.partnersColabGrid}>
                          {section.items.map((item) => (
                            <div key={`${secIdx}-${item.alt}-${item.src}`} className={styles.partnersColabCell}>
                              <img
                                className={styles.partnersColabImg}
                                src={item.src}
                                alt={item.alt}
                                loading="lazy"
                                decoding="async"
                                referrerPolicy="no-referrer-when-downgrade"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </section>

          {/* Community */}
          <section className={styles.communitySection}>
            <div className={styles.container}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>{copy.community.title}</h2>
                <p className={styles.sectionSubtitle}>{copy.community.body}</p>
              </div>
              <div className={styles.communityGrid}>
                <div className={clsx(styles.communityCard, 'scroll-to-display')}>
                  <IconGithub className="tw-w-12 tw-h-12 tw-fill-white" />
                  <p>{copy.community.cardGitHub}</p>
                  <Link to="https://github.com/tuya/TuyaOpen" className={styles.btnGh}>
                    GitHub
                  </Link>
                </div>
                <div className={clsx(styles.communityCard, 'scroll-to-display')}>
                  <IconHelp className="tw-w-12 tw-h-12 tw-fill-white" />
                  <p>{copy.community.cardHelp}</p>
                  <div className="tw-flex tw-flex-wrap tw-gap-2">
                    <Link to="https://github.com/tuya/TuyaOpen/issues" className={styles.btnGh}>
                      Issues
                    </Link>
                    <Link to="https://github.com/tuya/TuyaOpen/discussions" className={styles.btnGh}>
                      Discussions
                    </Link>
                  </div>
                </div>
                <div className={clsx(styles.communityCard, 'scroll-to-display')}>
                  <svg
                    className="tw-w-12 tw-h-12 tw-fill-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20.317 4.369A19.791 19.791 0 0 0 16.885 3.2a.074.074 0 0 0-.079.037c-.34.607-.719 1.395-.984 2.01a18.524 18.524 0 0 0-5.59 0 12.51 12.51 0 0 0-.995-2.01.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.369a.069.069 0 0 0-.032.027C.533 9.09-.32 13.579.099 18.021a.082.082 0 0 0 .031.056c2.128 1.565 4.195 2.51 6.229 3.13a.077.077 0 0 0 .084-.027c.48-.66.91-1.356 1.273-2.084a.076.076 0 0 0-.041-.104c-.676-.256-1.32-.568-1.938-.936a.077.077 0 0 1-.008-.127c.13-.098.26-.2.384-.304a.074.074 0 0 1 .077-.01c4.06 1.855 8.447 1.855 12.47 0a.075.075 0 0 1 .078.009c.124.104.254.206.385.304a.077.077 0 0 1-.007.127 12.298 12.298 0 0 1-1.939.936.076.076 0 0 0-.04.105c.36.728.792 1.424 1.272 2.084a.076.076 0 0 0 .084.028c2.04-.62 4.106-1.565 6.23-3.13a.077.077 0 0 0 .03-.055c.5-5.177-.838-9.637-3.548-13.625a.061.061 0 0 0-.03-.028ZM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.175 1.094 2.157 2.418 0 1.334-.955 2.419-2.157 2.419Zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.175 1.094 2.157 2.418 0 1.334-.947 2.419-2.157 2.419Z" />
                  </svg>
                  <p>{copy.community.cardDiscord}</p>
                  <Link to="https://discord.com/invite/yPPShSTttG" className={styles.btnDiscord}>
                    {copy.community.discordButton}
                  </Link>
                </div>
              </div>
              <div className={styles.communityContributorsWrap}>
                <div className={styles.communityContributorsPanel}>
                  <h3 className={styles.communityContributorsTitle}>{copy.community.contributorsTitle}</h3>
                  <a
                    href="https://github.com/tuya/TuyaOpen/graphs/contributors"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.communityContributorsBadge}
                    aria-label={copy.community.contributorsAriaLabel}
                  >
                    <img
                      src="https://contrib.rocks/image?repo=tuya/TuyaOpen"
                      alt={copy.community.contributorsBadgeAlt}
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                </div>
              </div>
            </div>
          </section>

          <p className={styles.footerNote}>
            {copy.community.footerIncubator} <Link to="https://www.tuya.com/">Tuya Inc</Link>{' '}
            {locale === 'zh' ? '孵化的开源项目。' : 'incubating open source project.'}
          </p>
        </main>

        {cloudDiagramLightboxOpen ? (
          <div
            className={styles.imageLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={copy.cloudOnePager.diagramCaption}
            onClick={() => setCloudDiagramLightboxOpen(false)}
          >
            <div className={styles.imageLightboxInner} onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className={styles.imageLightboxClose}
                onClick={() => setCloudDiagramLightboxOpen(false)}
                aria-label={copy.cloudOnePager.lightboxCloseLabel}
              >
                ×
              </button>
              <img
                className={styles.imageLightboxImg}
                src={copy.cloudOnePager.diagramUrl}
                alt={copy.cloudOnePager.diagramAlt}
              />
            </div>
          </div>
        ) : null}
      </div>
    </Layout>
  )
}

export default Home
