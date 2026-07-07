/**
 * <SerialConsole /> — serial debug. Connect at a chosen baud, stream RX to the
 * terminal (ANSI-colored), send text or hex. RX is buffered into lines with a
 * live "pending" tail so streaming output reads naturally.
 *
 * variant="full"    → full config (baud / data / stop / parity)
 * variant="minimal" → baud only, compact, for docs embedding
 */
import React, {useCallback, useRef, useState} from 'react'
import {clsx} from 'clsx'
import {useSerialPort} from './useSerialPort'
import {COPY, fmt} from './i18n'
import {useLocale} from './hooks'
import {Button, StatusChip, Field} from './primitives'
import LogSurface from './LogSurface'
import s from './styles.module.css'
import {UsbIcon, PowerIcon, SendIcon, TerminalIcon} from './icons'

let _id = 0
const newId = () => ++_id

const BAUDS = [9600, 19200, 38400, 57600, 115200, 230400, 460800, 921600, 1500000, 2000000]

export default function SerialConsole({variant = 'full', locale: localeProp, className}) {
  const ctxLocale = useLocale()
  const locale = localeProp || ctxLocale
  const t = COPY[locale]

  const [baud, setBaud] = useState(115200)
  const [dataBits, setDataBits] = useState(8)
  const [stopBits, setStopBits] = useState(1)
  const [parity, setParity] = useState('none')
  const [input, setInput] = useState('')
  const [hex, setHex] = useState(false)
  const [newline, setNewline] = useState(true)
  const [showTs, setShowTs] = useState(false)
  const [log, setLog] = useState([])
  const [pending, setPending] = useState('')
  const [rxBytes, setRxBytes] = useState(0)
  const [txBytes, setTxBytes] = useState(0)
  const bufRef = useRef('')

  const push = useCallback((type, text) => {
    setLog((l) => {
      const next = [...l, {id: newId(), type, text, ts: new Date()}]
      return next.length > 2000 ? next.slice(-2000) : next
    })
  }, [])

  const flushBuffer = useCallback(() => {
    if (bufRef.current.length) {
      push('rx', bufRef.current)
      bufRef.current = ''
      setPending('')
    }
  }, [push])

  const onReceive = useCallback(
    (_uint8, text) => {
      setRxBytes((n) => n + _uint8.byteLength)
      bufRef.current += text
      let idx
      while ((idx = bufRef.current.indexOf('\n')) !== -1) {
        let line = bufRef.current.slice(0, idx)
        if (line.endsWith('\r')) line = line.slice(0, -1)
        push('rx', line)
        bufRef.current = bufRef.current.slice(idx + 1)
      }
      setPending(bufRef.current)
    },
    [push],
  )

  const {state, connect, disconnect, write} = useSerialPort({onReceive})
  const connected = state === 'connected'
  const connecting = state === 'connecting'

  const statusLabel =
    state === 'connected'
      ? `${t.status_connected} · ${baud} ${t.bps}`
      : state === 'connecting'
        ? t.status_connecting
        : state === 'error'
          ? t.status_error
          : t.status_disconnected

  const onConnect = () => {
    bufRef.current = ''
    setPending('')
    push('sys', `${t.status_connected} · ${baud} ${t.bps}`)
    connect({baudRate: baud, dataBits, stopBits, parity})
  }
  const onDisconnect = async () => {
    flushBuffer()
    await disconnect()
    push('sys', t.status_disconnected)
  }

  const parseHex = (str) => {
    const clean = str.replace(/0x/gi, '').replace(/[\s,]/g, '')
    if (!/^[0-9a-fA-F]*$/.test(clean) || clean.length % 2 !== 0) return null
    const out = new Uint8Array(clean.length / 2)
    for (let i = 0; i < out.length; i++) out[i] = parseInt(clean.substr(i * 2, 2), 16)
    return out
  }

  const onSend = async () => {
    if (!connected) {
      push('err', t.serial_not_connected)
      return
    }
    let bytes
    let display
    if (hex) {
      const parsed = parseHex(input)
      if (!parsed) {
        push('err', t.hex_length_error)
        return
      }
      bytes = parsed
      display = `[hex] ${input.trim()}`
    } else {
      const text = newline ? input + '\r\n' : input
      bytes = new TextEncoder().encode(text)
      display = input
    }
    flushBuffer() // RX and TX shouldn't share a line
    push('tx', display)
    setTxBytes((n) => n + bytes.byteLength)
    try {
      await write(bytes)
    } catch (e) {
      push('err', fmt(t.send_error, e.message || String(e)))
    }
    setInput('')
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey || !e.shiftKey)) {
      e.preventDefault()
      onSend()
    }
  }

  // Show pending live tail as a final pseudo-entry.
  const entries = pending
    ? [...log, {id: 'pending', type: 'rx', text: pending, ts: null, live: true}]
    : log

  const stats = `${fmt(t.rx_count, rxBytes)}  ·  ${fmt(t.tx_count, txBytes)}`

  const configFields =
    variant === 'minimal' ? (
      <Field label={t.baud_rate}>
        <select className={s.select} value={baud} onChange={(e) => setBaud(+e.target.value)}>
          {BAUDS.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </Field>
    ) : (
      <div className="tw-grid tw-grid-cols-2 tw-gap-3 sm:tw-grid-cols-4">
        <Field label={t.baud_rate}>
          <select className={s.select} value={baud} onChange={(e) => setBaud(+e.target.value)}>
            {BAUDS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t.data_bits}>
          <select
            className={s.select}
            value={dataBits}
            onChange={(e) => setDataBits(+e.target.value)}
          >
            <option value={8}>8</option>
            <option value={7}>7</option>
          </select>
        </Field>
        <Field label={t.stop_bits}>
          <select
            className={s.select}
            value={stopBits}
            onChange={(e) => setStopBits(+e.target.value)}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
          </select>
        </Field>
        <Field label={t.parity}>
          <select
            className={s.select}
            value={parity}
            onChange={(e) => setParity(e.target.value)}
          >
            <option value="none">{t.parity_none}</option>
            <option value="even">{t.parity_even}</option>
            <option value="odd">{t.parity_odd}</option>
          </select>
        </Field>
      </div>
    )

  const connectRow = (
    <div className={s.spread}>
      <StatusChip state={state} label={statusLabel} />
      <div className={s.row}>
        {connected ? (
          <Button variant="danger" icon={PowerIcon} onClick={onDisconnect}>
            {t.disconnect}
          </Button>
        ) : (
          <Button icon={UsbIcon} loading={connecting} onClick={onConnect} disabled={connecting}>
            {t.connect}
          </Button>
        )}
      </div>
    </div>
  )

  const sendRow = (
    <div className={s.sendRow}>
      <div className={s.sendToggles}>
        <button
          type="button"
          className={clsx(s.toggle, hex && s.toggleOn)}
          onClick={() => setHex((v) => !v)}
          aria-pressed={hex}
          title={t.hex_mode}
        >
          HEX
        </button>
        <button
          type="button"
          className={clsx(s.toggle, newline && s.toggleOn)}
          onClick={() => setNewline((v) => !v)}
          aria-pressed={newline}
          title={t.add_newline}
        >
          ↵
        </button>
        <button
          type="button"
          className={clsx(s.toggle, showTs && s.toggleOn)}
          onClick={() => setShowTs((v) => !v)}
          aria-pressed={showTs}
          title={t.show_timestamp}
        >
          TS
        </button>
      </div>
      <input
        className={clsx(s.input, s.inputMono, s.sendInput)}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={hex ? t.input_placeholder_hex : t.input_placeholder}
        spellCheck={false}
        autoComplete="off"
      />
      <Button variant="primary" icon={SendIcon} onClick={onSend} disabled={!connected || !input}>
        {t.send}
      </Button>
    </div>
  )

  if (variant === 'minimal') {
    return (
      <div className={clsx(s.wsTool, className)} data-ws-mode="serial">
        <div className={s.stack}>
          {configFields}
          {connectRow}
          <LogSurface
            entries={entries}
            onClear={() => {
              setLog([])
              setPending('')
              setRxBytes(0)
              setTxBytes(0)
            }}
            ansi
            showTimestamps={showTs}
            emptyText={t.waiting_data}
            height={220}
            stats={stats}
          />
          {sendRow}
        </div>
      </div>
    )
  }

  return (
    <div className={clsx(s.wsTool, className)}>
      <div className={s.panel}>
        <div className={s.panelHead}>
          <h3 className={s.panelTitle}>
            <TerminalIcon size={17} />
            {t.control_title}
          </h3>
          <StatusChip state={state} label={statusLabel} />
        </div>
        <div className={clsx(s.panelBody, s.stack)}>
          {configFields}
          {connectRow}
          <LogSurface
            entries={entries}
            onClear={() => {
              setLog([])
              setPending('')
              setRxBytes(0)
              setTxBytes(0)
            }}
            ansi
            showTimestamps={showTs}
            emptyText={t.waiting_data}
            height={320}
            stats={stats}
          />
          {sendRow}
        </div>
      </div>
    </div>
  )
}
