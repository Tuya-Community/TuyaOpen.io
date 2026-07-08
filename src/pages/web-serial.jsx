import React, {useState} from 'react'
import Head from '@docusaurus/Head'
import Layout from '@theme/Layout'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import BrowserOnly from '@docusaurus/BrowserOnly'
import Link from '@docusaurus/Link'
import {COPY} from '@site/src/components/web-serial/i18n'
import {useWebSerialSupport} from '@site/src/components/web-serial/useSerialPort'
import {SegmentedControl, Notice} from '@site/src/components/web-serial/primitives'
import {TerminalIcon, KeyRoundIcon, UploadIcon, AlertIcon} from '@site/src/components/web-serial/icons'
import {SerialConsole, DeviceAuth, FirmwareFlasher} from '@site/src/components/web-serial'
import p from './web-serial.module.css'
import s from '@site/src/components/web-serial/styles.module.css'

export default function WebSerialPage() {
  const {i18n, siteConfig} = useDocusaurusContext()
  const locale = i18n?.currentLocale === 'zh' ? 'zh' : 'en'
  const t = COPY[locale]

  return (
    <Layout
      title={t.title}
      description={t.subtitle}
      wrapperClassName={s.wsTool}
    >
      <Head>
        <meta name="keywords" content="TuyaOpen, web serial, WebSerial, firmware flash, esptool, T5AI, ESP32, license, authorization" />
        <meta property="og:title" content={t.title} />
        <meta property="og:description" content={t.subtitle} />
      </Head>

      <div className={p.page}>
        <section className={p.hero}>
          <h1 className={p.title}>{t.title}</h1>
          <p className={p.sub}>{t.subtitle}</p>
          <div className={p.heroMeta}>
            <span>{t.browser_requirement}</span>
            <span className={p.dot} />
            <a
              href="https://github.com/tuya/TuyaOpen-WebTools"
              target="_blank"
              rel="noreferrer noopener"
            >
              {t.beta_notice} {t.repository_link} ↗
            </a>
          </div>
        </section>

        <BrowserOnly fallback={<div className={p.fallback}>…</div>}>
          {() => <ToolBody locale={locale} t={t} />}
        </BrowserOnly>
      </div>
    </Layout>
  )
}

function ToolBody({locale, t}) {
  const supported = useWebSerialSupport()
  const [mode, setMode] = useState('serial')

  const modes = [
    {value: 'serial', label: t.tab_serial, icon: TerminalIcon},
    {value: 'flash', label: t.tab_flash, icon: UploadIcon},
    {value: 'auth', label: t.tab_tuya_auth, icon: KeyRoundIcon},
  ]

  return (
    <>
      {!supported ? (
        <div className={p.unsupportedBanner}>
          <Notice variant="warn" icon={AlertIcon} title={`${t.status_error} — `}>
            {t.browser_not_supported}
          </Notice>
        </div>
      ) : null}

      <div className={s.wsTool} data-ws-mode={mode}>
        <div className={p.modeBar}>
          <div className={p.modeBarInner}>
            <SegmentedControl
              options={modes}
              value={mode}
              onChange={setMode}
              ariaLabel="Tool mode"
            />
            <span className={p.modeHint}>
              {mode === 'serial' ? t.control_title : mode === 'flash' ? t.flash_config : t.tuya_auth_title}
            </span>
          </div>
        </div>

        <div className={p.content}>
          {mode === 'serial' ? (
            <SerialConsole locale={locale} />
          ) : mode === 'auth' ? (
            <DeviceAuth locale={locale} />
          ) : (
            <FirmwareFlasher locale={locale} />
          )}
        </div>
      </div>

      <section className={p.marketing}>
        <div className={p.marketingCard}>
          <h2 className={p.marketingTitle}>{t.desktop_title}</h2>
          <p className={p.marketingDesc}>{t.desktop_desc}</p>
          <div className={p.marketingLinks}>
            <a
              className={p.marketingPrimary}
              href="https://github.com/tuya/tyutool/releases/latest"
              target="_blank"
              rel="noreferrer noopener"
            >
              {t.desktop_download} ↗
            </a>
            <Link to={locale === 'zh' ? '/zh/tyutool' : '/tyutool'}>{t.desktop_features} →</Link>
            <Link to={locale === 'zh' ? '/zh/tyutool-guide' : '/tyutool-guide'}>{t.desktop_guide} →</Link>
          </div>
        </div>
      </section>
    </>
  )
}
