/**
 * <DeviceAuth /> — write a TuyaOpen license (UUID + AUTH_KEY) to a device.
 *
 * Protocol (from upstream sendTuyaAuth): open the port at 115200/8N1, write
 * `auth <uuid> <authkey>\r\n`, read the device's text reply line-by-line.
 * No handshake, no binary framing — the firmware persists the credentials.
 *
 * A target-chip selector sets the recommended auth baud (115200 for every
 * family — the firmware console) and surfaces bridge guidance, mirroring the
 * flasher's auto-config.
 *
 * variant="full"    → panel with header, notices, license guide (page use)
 * variant="minimal" → target + UUID/AUTH_KEY + Write + status (auto-connects)
 */
import React, {useCallback, useRef, useState} from 'react'
import {clsx} from 'clsx'
import {useSerialPort} from './useSerialPort'
import {COPY, fmt} from './i18n'
import {useLocale} from './hooks'
import {CHIPS} from './protocol/flash'
import {Button, StatusChip, Field, Notice, ResultBanner} from './primitives'
import LogSurface from './LogSurface'
import s from './styles.module.css'
import {KeyRoundIcon, UsbIcon, PowerIcon, BookIcon} from './icons'

let _id = 0
const newId = () => ++_id

export default function DeviceAuth({variant = 'full', locale: localeProp, className}) {
  const ctxLocale = useLocale()
  const locale = localeProp || ctxLocale
  const t = COPY[locale]

  const [chipId, setChipId] = useState('T5AI')
  const [uuid, setUuid] = useState('')
  const [authKey, setAuthKey] = useState('')
  const [log, setLog] = useState([])
  const [sending, setSending] = useState(false)
  const [lastReply, setLastReply] = useState('')
  const [result, setResult] = useState(null) // {ok, msg}
  const bufRef = useRef('')

  const chip = CHIPS.find((c) => c.id === chipId) || CHIPS[0]
  const uuidValid = uuid.length === 20
  const authValid = authKey.length === 32
  const canAuth = uuidValid && authValid

  const push = useCallback((type, text) => {
    setLog((l) => {
      const next = [...l, {id: newId(), type, text, ts: new Date()}]
      return next.length > 600 ? next.slice(-600) : next
    })
  }, [])

  const onReceive = useCallback(
    (_uint8, text) => {
      bufRef.current += text
      let idx
      const lines = []
      while ((idx = bufRef.current.indexOf('\n')) !== -1) {
        let line = bufRef.current.slice(0, idx)
        if (line.endsWith('\r')) line = line.slice(0, -1)
        lines.push(line)
        bufRef.current = bufRef.current.slice(idx + 1)
      }
      for (const line of lines) {
        if (line.length) {
          push('rx', line)
          setLastReply(line)
        }
      }
    },
    [push],
  )

  const {state, connect, disconnect, write, getPort} = useSerialPort({onReceive})
  const connected = state === 'connected'
  const connecting = state === 'connecting'

  const statusLabel =
    state === 'connected'
      ? t.tuya_auth_connected
      : state === 'connecting'
        ? t.status_connecting
        : state === 'error'
          ? t.status_error
          : t.tuya_auth_disconnected

  const statusText = sending
    ? t.tuya_auth_sending
    : state === 'connecting'
      ? t.status_connecting
      : state === 'connected'
        ? lastReply || t.tuya_auth_waiting
        : state === 'error'
          ? t.status_error
          : t.phase_idle

  const onConnect = () => {
    bufRef.current = ''
    setLastReply('')
    push('sys', t.tuya_auth_waiting)
    connect({baudRate: chip.authBaud, dataBits: 8, stopBits: 1, parity: 'none'})
  }
  const onDisconnect = async () => {
    await disconnect()
    push('sys', t.tuya_auth_serial_disconnected)
  }

  // Write license: auto-connect (open the OS port picker) if needed, then send.
  const onAuthorize = async () => {
    if (!canAuth) {
      const msg = !uuidValid ? t.uuid_length_error : t.auth_key_length_error
      if (!uuidValid) push('error', t.uuid_length_error)
      if (!authValid) push('error', t.auth_key_length_error)
      setResult({ok: false, msg})
      return
    }
    setSending(true)
    setResult(null)
    try {
      if (!getPort()) {
        push('sys', t.opening_port)
        await connect({baudRate: chip.authBaud, dataBits: 8, stopBits: 1, parity: 'none'})
        if (!getPort()) {
          // user dismissed the picker, or connect failed — state already reflects it
          setSending(false)
          return
        }
      }
      push('sys', t.tuya_auth_sending)
      const masked = '•'.repeat(authKey.length)
      push('tx', fmt(t.tuya_auth_command_sent, uuid, masked))
      const cmd = new TextEncoder().encode(`auth ${uuid} ${authKey}\r\n`)
      await write(cmd)
      push('sys', t.tuya_auth_success)
      setResult({ok: true, msg: t.tuya_auth_success})
    } catch (e) {
      const msg = fmt(t.tuya_auth_failed, e.message || String(e))
      push('error', msg)
      setResult({ok: false, msg})
    } finally {
      setSending(false)
    }
  }

  const deviceField = (
    <Field label={t.target_device} hint={chip.desc}>
      <select className={s.select} value={chipId} onChange={(e) => setChipId(e.target.value)}>
        {CHIPS.map((c) => (
          <option key={c.id} value={c.id}>
            {c.label}
          </option>
        ))}
      </select>
    </Field>
  )

  const fields = (
    <div className="tw-grid tw-gap-4 max-md:tw-grid-cols-1 md:tw-grid-cols-2">
      <Field
        label={t.uuid_label}
        htmlFor="ws-uuid"
        counter={`${uuid.length}/20`}
        counterState={uuidValid ? 'ok' : undefined}
      >
        <input
          id="ws-uuid"
          className={clsx(s.input, s.inputMono, uuidValid && s.inputOk)}
          value={uuid}
          onChange={(e) => setUuid(e.target.value.slice(0, 20))}
          placeholder={t.uuid_placeholder}
          maxLength={20}
          autoComplete="off"
          spellCheck={false}
          aria-invalid={!uuidValid && uuid.length > 0}
        />
      </Field>
      <Field
        label={t.auth_key_label}
        htmlFor="ws-authkey"
        counter={`${authKey.length}/32`}
        counterState={authValid ? 'ok' : undefined}
      >
        <input
          id="ws-authkey"
          className={clsx(s.input, s.inputMono, authValid && s.inputOk)}
          value={authKey}
          onChange={(e) => setAuthKey(e.target.value.slice(0, 32))}
          placeholder={t.auth_key_placeholder}
          maxLength={32}
          autoComplete="off"
          spellCheck={false}
          aria-invalid={!authValid && authKey.length > 0}
        />
      </Field>
    </div>
  )

  const authHint = (
    <div className={s.hint}>
      <span>{t.auth_baud_hint}</span>
    </div>
  )

  const connectRow = (
    <div className={s.spread}>
      <StatusChip state={state} label={statusLabel} />
      <div className={s.row}>
        {connected ? (
          <Button variant="danger" icon={PowerIcon} onClick={onDisconnect} disabled={sending}>
            {t.disconnect_tuya_auth}
          </Button>
        ) : (
          <Button icon={UsbIcon} loading={connecting} onClick={onConnect} disabled={connecting || sending}>
            {t.connect_tuya_auth}
          </Button>
        )}
        <Button
          variant="primary"
          icon={KeyRoundIcon}
          loading={sending}
          onClick={onAuthorize}
          disabled={!canAuth || sending}
        >
          {t.authorize_btn}
        </Button>
      </div>
    </div>
  )

  const logSurface = (
    <LogSurface
      entries={log}
      onClear={() => setLog([])}
      emptyText={t.tuya_auth_waiting}
      height={variant === 'minimal' ? 180 : 240}
      stats={`${log.length}`}
    />
  )

  const resultBanner = result ? (
    <ResultBanner
      state={result.ok ? 'ok' : 'error'}
      onDismiss={() => setResult(null)}
      dismissLabel={t.dismiss}
    >
      {result.msg}
    </ResultBanner>
  ) : null

  if (variant === 'minimal') {
    return (
      <div className={clsx(s.wsTool, className)} data-ws-mode="auth">
        <div className={s.panel}>
          <div className={s.panelHead}>
            <h3 className={s.panelTitle}>
              <KeyRoundIcon size={17} />
              {t.tuya_auth_title}
            </h3>
            <StatusChip state={state} label={statusLabel} />
          </div>
          <div className={clsx(s.panelBody, s.stack)}>
            {deviceField}
            {fields}
            {authHint}
            <div className={s.statusLine}>
              <span className={s.statusPhase}>{statusText}</span>
            </div>
            <Button
              variant="primary"
              icon={KeyRoundIcon}
              loading={sending || connecting}
              onClick={onAuthorize}
              disabled={!canAuth || sending}
              style={{width: '100%'}}
            >
              {t.authorize_btn}
            </Button>
            {resultBanner}
            <a className={s.meta} href={licenseHref(locale)}>
              {t.license_link} →
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={clsx(s.wsTool, className)} data-ws-mode="auth">
      <div className={s.stack}>
        <div className={s.panel}>
          <div className={s.panelHead}>
            <h3 className={s.panelTitle}>
              <KeyRoundIcon size={17} />
              {t.tuya_auth_title}
            </h3>
            <StatusChip state={state} label={statusLabel} />
          </div>
          <div className={clsx(s.panelBody, s.stack)}>
            <div className={s.meta}>{t.tuya_auth_subtitle}</div>
            <Notice variant="warn" title={`${t.tuya_auth_notice_title}：`}>
              {t.tuya_auth_notice_content} {t.tuya_auth_additional_info}
            </Notice>
            {deviceField}
            {authHint}
            {fields}
            {connectRow}
            {resultBanner}
            {logSurface}
            <LicenseGuide t={t} locale={locale} />
          </div>
        </div>
      </div>
    </div>
  )
}

/** Locale-aware href to the license guide page (Docusaurus needs /zh/ prefix). */
function licenseHref(locale) {
  return locale === 'zh' ? '/zh/learn/using-license-key' : '/learn/using-license-key'
}

function LicenseGuide({t, locale}) {
  const href = licenseHref(locale)
  return (
    <details className={s.guide}>
      <summary className={s.guideSummary}>
        <BookIcon size={15} />
        {t.license_guide}
      </summary>
      <div className={s.guideBody}>
        <p>
          <b>{t.what_is_license}</b> — {t.license_info}{' '}
          <a href={href}>{t.license_link} →</a>
        </p>
        <p className={s.guideHeading}>{t.how_to_get}</p>
        <ol className={s.guideList}>
          <li>
            <b>{t.method1_title}</b> — {t.method1_desc} <span className={s.meta}>{t.method1_advantage}</span>
          </li>
          <li>
            <b>{t.method2_title}</b> — {t.method2_desc} <span className={s.meta}>{t.method2_advantage}</span>
          </li>
          <li>
            <b>{t.method3_title}</b> — {t.method3_desc} <span className={s.meta}>{t.method3_advantage}</span>
          </li>
        </ol>
        <p className={s.meta}>{t.check_existing}</p>
        <p>
          <a href={href}>{t.license_link} →</a>
          {' · '}
          <a href="https://platform.tuya.com/purchase/index?type=6" target="_blank" rel="noreferrer noopener">
            {t.auth_purchase} ↗
          </a>
          {' · '}
          <a
            href="https://tuyaopen.ai/docs/quick-start/equipment-authorization"
            target="_blank"
            rel="noreferrer noopener"
          >
            {t.auth_docs} ↗
          </a>
        </p>
      </div>
    </details>
  )
}
