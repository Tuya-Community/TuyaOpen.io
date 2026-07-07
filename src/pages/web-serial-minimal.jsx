import React from 'react'
import Head from '@docusaurus/Head'
import Layout from '@theme/Layout'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import BrowserOnly from '@docusaurus/BrowserOnly'
import {COPY} from '@site/src/components/web-serial/i18n'
import {SerialConsole, DeviceAuth, FirmwareFlasher} from '@site/src/components/web-serial'
import s from '@site/src/components/web-serial/styles.module.css'

/**
 * Hidden test page for the web-serial tool's `minimal` variants — the shapes
 * you'd drop into an MDX doc. Not linked from nav/footer and noindex'd, so it
 * only exists for manual testing at /web-serial-minimal (and /zh/...).
 */
export default function WebSerialMinimalPage() {
  const {i18n} = useDocusaurusContext()
  const locale = i18n?.currentLocale === 'zh' ? 'zh' : 'en'
  const t = COPY[locale]

  return (
    <Layout
      title={`web-serial · minimal (test)`}
      description="Minimal-variant test page for the web-serial tool."
      wrapperClassName={s.wsTool}
    >
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <main
        className={s.wsTool}
        style={{maxWidth: 780, margin: '0 auto', padding: '2.5rem 1.25rem 5rem'}}
      >
        <h1 style={{fontSize: '1.6rem', marginBottom: '0.4rem'}}>
          web-serial · minimal variants
        </h1>
        <p style={{color: 'var(--ifm-color-emphasis-700)', marginBottom: '2rem'}}>
          {locale === 'zh'
            ? '最小变体测试页 — 模拟嵌入文档时的样式。此页面未被导航链接，且 noindex。'
            : 'Test page for the minimal variants — how they look embedded in a doc. Not linked; noindex.'}
        </p>

        <BrowserOnly fallback={<div style={{color: 'var(--ifm-color-emphasis-600)'}}>…</div>}>
          {() => (
            <div className={s.stack}>
              <Section
                title="FirmwareFlasher"
                hint='variant="minimal"'
                code={`<FirmwareFlasher variant="minimal" />`}
              >
                <FirmwareFlasher variant="minimal" locale={locale} />
              </Section>

              <Section
                title="DeviceAuth"
                hint='variant="minimal"'
                code={`<DeviceAuth variant="minimal" />`}
              >
                <DeviceAuth variant="minimal" locale={locale} />
              </Section>

              <Section
                title="SerialConsole"
                hint='variant="minimal"'
                code={`<SerialConsole variant="minimal" />`}
              >
                <SerialConsole variant="minimal" locale={locale} />
              </Section>
            </div>
          )}
        </BrowserOnly>
      </main>
    </Layout>
  )
}

function Section({title, hint, code, children}) {
  return (
    <section>
      <h2
        style={{
          fontSize: '0.95rem',
          fontWeight: 650,
          color: 'var(--ifm-color-emphasis-800, var(--ifm-font-color-base))',
          margin: '0 0 0.3rem',
        }}
      >
        {title} <span style={{fontWeight: 400, color: 'var(--ifm-color-emphasis-600)'}}>{hint}</span>
      </h2>
      <pre
        style={{
          fontFamily: 'var(--ws-mono)',
          fontSize: '0.75rem',
          background: 'var(--ifm-color-emphasis-100)',
          border: '1px solid var(--ifm-color-emphasis-200)',
          borderRadius: 8,
          padding: '0.5rem 0.7rem',
          margin: '0 0 0.75rem',
          overflowX: 'auto',
          color: 'var(--ifm-color-emphasis-700)',
        }}
      >
        <code>{code}</code>
      </pre>
      {children}
    </section>
  )
}
