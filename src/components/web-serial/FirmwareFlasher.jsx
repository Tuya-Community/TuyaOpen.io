/**
 * <FirmwareFlasher /> — flash .bin firmware to a device over Web Serial.
 *
 * ESP32 family uses a clean esptool-js port; T5AI/T3/T2/BK7231N/LN882H use the
 * vendored binary-protocol downloaders (see protocol/). The component owns its
 * serial port exclusively (opened at 115200; the downloader/esptool switches
 * baud internally), so there's no read loop and no lock juggling.
 *
 * Per-chip defaults (baud / flash size / bridge) are ported from tyutool's
 * chip-manifests.ts; selecting a target auto-sets the recommended baud.
 *
 * variant="full"    → panel with device/baud/address/file + progress + log
 * variant="minimal" → target + file + Start + progress/status only (auto-connects)
 */
import React, {useCallback, useEffect, useRef, useState} from 'react'
import {clsx} from 'clsx'
import {requestAndOpenPort, useWebSerialSupport} from './useSerialPort'
import {COPY, fmt} from './i18n'
import {useLocale} from './hooks'
import {flash, CHIPS, FLASH_BAUDS} from './protocol/flash'
import {Button, StatusChip, Field, ProgressBar, Notice, ResultBanner} from './primitives'
import LogSurface from './LogSurface'
import s from './styles.module.css'
import {UploadIcon, UsbIcon, PowerIcon, FileIcon, PlayIcon, SquareIcon, CpuIcon, AlertIcon} from './icons'

let _id = 0
const newId = () => ++_id

function parseAddr(str) {
  return parseInt(str, 16) >>> 0
}
function fmtBytes(n) {
  if (n < 1024) return `${n} B`
  if (n < 1048576) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / 1048576).toFixed(2)} MB`
}
function fmtFlashSize(n) {
  const mb = n / (1024 * 1024)
  if (mb >= 1) return `${mb} MiB`
  return `${Math.round(n / 1024)} KiB`
}

export default function FirmwareFlasher({variant = 'full', locale: localeProp, className}) {
  const ctxLocale = useLocale()
  const locale = localeProp || ctxLocale
  const t = COPY[locale]
  const supported = useWebSerialSupport()

  const [chipId, setChipId] = useState('T5AI')
  const [baud, setBaud] = useState(CHIPS[0].flashBaud)
  const [isCustomBaud, setIsCustomBaud] = useState(false)
  const [addrMode, setAddrMode] = useState('full') // full (0x0000) | custom
  const [customAddr, setCustomAddr] = useState('0x10000')
  const [file, setFile] = useState(null) // {name, size, data}
  const [dragging, setDragging] = useState(false)
  const [portState, setPortState] = useState('idle')
  const [flashing, setFlashing] = useState(false)
  const [progress, setProgress] = useState({percent: 0, state: 'idle', written: 0, total: 0, phase: null, message: ''})
  const [log, setLog] = useState([])
  const [elapsed, setElapsed] = useState(0)
  const [autoDisconnect, setAutoDisconnect] = useState(true)
  const [result, setResult] = useState(null) // {ok, msg}

  const portRef = useRef(null)
  const jobRef = useRef(null)
  const cancelRef = useRef(false)
  const startRef = useRef(0)
  const timerRef = useRef(null)
  const inputRef = useRef(null)

  const chip = CHIPS.find((c) => c.id === chipId) || CHIPS[0]
  const address = chip.family === 'esp32' && addrMode === 'custom' ? parseAddr(customAddr) : 0x0
  // ESP32 firmware is often distributed as *QIO*.bin (flash mode in the name).
  const filePat = chip.family === 'esp32' ? '*QIO*.bin' : '.bin'

  // Auto-set the recommended baud whenever the target chip changes.
  useEffect(() => {
    setBaud(chip.flashBaud)
    setIsCustomBaud(false)
  }, [chipId, chip.flashBaud])

  const push = useCallback((text, isError = false) => {
    setLog((l) => {
      const next = [...l, {id: newId(), type: isError ? 'err' : 'sys', text, ts: new Date()}]
      return next.length > 1000 ? next.slice(-1000) : next
    })
  }, [])

  const onProgress = useCallback((percent, info) => {
    setProgress((prev) => ({
      percent: typeof percent === 'number' ? percent : prev.percent,
      state: info?.error ? 'error' : percent >= 100 ? 'done' : 'active',
      written: info?.written ?? prev.written,
      total: info?.total ?? prev.total,
      phase: info?.phase ?? prev.phase,
      message: info?.message ?? prev.message,
    }))
  }, [])

  // elapsed timer while flashing
  useEffect(() => {
    if (!flashing) return
    timerRef.current = setInterval(() => {
      setElapsed((Date.now() - startRef.current) / 1000)
    }, 200)
    return () => clearInterval(timerRef.current)
  }, [flashing])

  // close port on unmount
  useEffect(() => {
    return () => {
      try {
        portRef.current?.close()
      } catch {
        /* noop */
      }
    }
  }, [])

  const readFile = useCallback(
    async (f) => {
      if (!f) return
      const lower = f.name.toLowerCase()
      if (!lower.endsWith('.bin') && !lower.endsWith('.img')) {
        push(`${f.name}: unsupported file type`, true)
        setResult({ok: false, msg: `${f.name}: unsupported file type`})
        return
      }
      const buf = new Uint8Array(await f.arrayBuffer())
      setFile({name: f.name, size: buf.byteLength, data: buf})
      setResult(null)
      push(fmt(t.file_selected, f.name, buf.byteLength))
    },
    [push, t],
  )

  const onPickFile = (e) => {
    readFile(e.target.files?.[0])
  }
  const onDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    readFile(e.dataTransfer.files?.[0])
  }

  const onConnect = async () => {
    setPortState('connecting')
    try {
      portRef.current = await requestAndOpenPort({baudRate: 115200})
      setPortState('connected')
      push(`${t.status_connected} · ${baud} ${t.bps}`)
    } catch (e) {
      const quiet = e?.name === 'NotFoundError' || e?.name === 'AbortError'
      setPortState(quiet ? 'idle' : 'error')
      if (!quiet) push(fmt(t.connect_failed, e?.message || String(e)), true)
    }
  }
  const onDisconnect = async () => {
    try {
      await portRef.current?.close()
    } catch {
      /* noop */
    }
    portRef.current = null
    setPortState('idle')
    push(t.flash_serial_disconnected || t.status_disconnected)
  }

  const runFlash = async () => {
    if (!portRef.current) {
      push(t.please_connect_flash_serial, true)
      return
    }
    cancelRef.current = false
    setFlashing(true)
    setResult(null)
    setProgress({percent: 0, state: 'active', written: 0, total: file.size, phase: 'handshake', message: ''})
    setElapsed(0)
    startRef.current = Date.now()
    push(fmt(t.start_download_to, chip.label))

    const job = flash({
      chipId,
      port: portRef.current,
      file: file.data,
      address,
      baud,
      locale,
      onLog: (msg, isErr) => push(msg, isErr),
      onProgress,
    })
    jobRef.current = job

    try {
      await job.done
      const secs = ((Date.now() - startRef.current) / 1000).toFixed(1)
      setProgress((p) => ({...p, percent: 100, state: 'done', phase: null}))
      push(fmt(t.firmware_download_completed_time, secs))
      push(t.flash_download_success)
      setResult({ok: true, msg: fmt(t.result_success, `${secs}s`)})
    } catch (e) {
      if (cancelRef.current) {
        push(t.user_cancelled)
        setProgress((p) => ({...p, state: 'idle'}))
        setResult({ok: false, msg: t.user_cancelled})
      } else {
        const m = e?.message || String(e)
        push(fmt(t.flash_download_failed, m), true)
        setProgress((p) => ({...p, state: 'error'}))
        setResult({ok: false, msg: fmt(t.result_failed, m)})
      }
    } finally {
      setFlashing(false)
      jobRef.current = null
      if (autoDisconnect && portRef.current) {
        try {
          await portRef.current.close()
        } catch {
          /* noop */
        }
        portRef.current = null
        setPortState('idle')
      }
    }
  }

  // Start: auto-connect (open the OS port picker) if needed, then flash.
  const onStart = async () => {
    if (!file) {
      push(t.please_select_file, true)
      setResult({ok: false, msg: t.please_select_file})
      return
    }
    if (!portRef.current) {
      setPortState('connecting')
      push(t.auto_connecting)
      try {
        portRef.current = await requestAndOpenPort({baudRate: 115200})
        setPortState('connected')
        push(`${t.status_connected} · ${baud} ${t.bps}`)
      } catch (e) {
        const quiet = e?.name === 'NotFoundError' || e?.name === 'AbortError'
        setPortState(quiet ? 'idle' : 'error')
        if (!quiet) {
          const m = fmt(t.connect_failed, e?.message || String(e))
          push(m, true)
          setResult({ok: false, msg: m})
        }
        return
      }
    }
    await runFlash()
  }

  const onStop = () => {
    cancelRef.current = true
    jobRef.current?.stop()
  }

  const portLabel =
    portState === 'connected'
      ? `${t.status_connected} · ${baud}`
      : portState === 'connecting'
        ? t.status_connecting
        : portState === 'error'
          ? t.status_error
          : t.status_disconnected

  const phaseLabel = progress.phase ? t[`phase_${progress.phase}`] : null
  const statusText = flashing
    ? `${phaseLabel || t.phase_write}${progress.percent > 0 ? ` · ${Math.round(progress.percent)}%` : ''}`
    : progress.state === 'done'
      ? t.flash_download_success
      : progress.state === 'error'
        ? t.status_error
        : t.phase_idle

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

  const baudField = (
    <Field
      label={t.baud_rate}
      hint={baud === chip.flashBaud && !isCustomBaud ? fmt(t.recommended_baud, chip.label) : undefined}
    >
      <select
        className={s.select}
        value={isCustomBaud ? 'custom' : baud}
        onChange={(e) => {
          if (e.target.value === 'custom') {
            setIsCustomBaud(true)
          } else {
            setIsCustomBaud(false)
            setBaud(+e.target.value)
          }
        }}
      >
        {FLASH_BAUDS.map((b) => (
          <option key={b} value={b}>
            {b}
            {b === chip.flashBaud ? ` · ${t.recommended_tag}` : ''}
          </option>
        ))}
        <option value="custom">{t.custom_baud}</option>
      </select>
    </Field>
  )

  const customBaudInput = isCustomBaud ? (
    <Field label={t.custom_baud}>
      <input
        className={clsx(s.input, s.inputMono)}
        type="number"
        min="1200"
        value={baud}
        onChange={(e) => setBaud(Math.max(1200, +e.target.value || 0))}
        placeholder={t.custom_baud_placeholder}
      />
    </Field>
  ) : null

  const addressField =
    chip.family === 'esp32' ? (
      <Field label={t.esp32_flash_address}>
        <select className={s.select} value={addrMode} onChange={(e) => setAddrMode(e.target.value)}>
          <option value="full">{t.complete_firmware}</option>
          <option value="custom">{t.custom_address}</option>
        </select>
      </Field>
    ) : null

  const chipHint = (
    <div className={s.hint}>
      <span>{fmt(t.flash_size_hint, fmtFlashSize(chip.flashSize))}</span>
    </div>
  )

  const fileDrop = (
    <div
      className={clsx(s.fileDrop, dragging && s.fileDropActive, file && s.fileDropFilled)}
      onDragOver={(e) => {
        e.preventDefault()
        setDragging(true)
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click()
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".bin,.img"
        onChange={onPickFile}
        style={{display: 'none'}}
      />
      {file ? (
        <div className={s.fileInfo}>
          <FileIcon size={18} />
          <span className={s.fileName}>{file.name}</span>
          <span className={s.meta}>{fmtBytes(file.size)}</span>
        </div>
      ) : (
        <div className={s.fileInfo}>
          <UploadIcon size={18} />
          <span>{t.select_file}</span>
          <span className={s.meta}>{fmt(t.no_file_selected, filePat)}</span>
        </div>
      )}
    </div>
  )

  const connectRow = (
    <div className={s.spread}>
      <StatusChip state={portState} label={portLabel} />
      <div className={s.row}>
        {portState === 'connected' ? (
          <Button variant="danger" icon={PowerIcon} onClick={onDisconnect} disabled={flashing}>
            {t.disconnect}
          </Button>
        ) : (
          <Button
            icon={UsbIcon}
            loading={portState === 'connecting'}
            onClick={onConnect}
            disabled={portState === 'connecting' || flashing}
          >
            {t.connect}
          </Button>
        )}
        {flashing ? (
          <Button variant="danger" icon={SquareIcon} onClick={onStop}>
            {t.stop_download}
          </Button>
        ) : (
          <Button variant="primary" icon={PlayIcon} onClick={onStart} disabled={!file}>
            {t.start_download}
          </Button>
        )}
      </div>
    </div>
  )

  const progressBlock = (
    <div className={s.stack}>
      <div className={s.spread}>
        <span className={s.statusLine}>
          <span className={s.progLabel}>{t.status_label}</span>
          <span className={s.statusPhase}>{statusText}</span>
        </span>
        <span className={clsx(s.meta, s.mono)}>
          {flashing ? `${elapsed.toFixed(1)}s` : ''}
          {progress.percent > 0 ? ` · ${Math.round(progress.percent)}%` : ''}
        </span>
      </div>
      <div className={s.row}>
        <span className={s.progLabel}>{t.progress_label}</span>
        <ProgressBar value={progress.percent} state={progress.state} phase={progress.phase} className={s.grow} />
        {progress.total ? (
          <span className={clsx(s.meta, s.mono)}>{fmtBytes(progress.written)}/{fmtBytes(progress.total)}</span>
        ) : null}
      </div>
    </div>
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

  if (!supported) {
    return (
      <div className={clsx(s.wsTool, className)} data-ws-mode="flash">
        <Notice variant="warn" icon={AlertIcon} title={`${t.status_error} — `}>
          {t.browser_not_supported}
        </Notice>
      </div>
    )
  }

  if (variant === 'minimal') {
    return (
      <div className={clsx(s.wsTool, className)} data-ws-mode="flash">
        <div className={s.panel}>
          <div className={s.panelHead}>
            <h3 className={s.panelTitle}>
              <CpuIcon size={17} />
              {t.flash_config}
            </h3>
            <StatusChip state={portState} label={portLabel} />
          </div>
          <div className={clsx(s.panelBody, s.stack)}>
            {deviceField}
            {fileDrop}
            <div className={s.statusLine}>
              <span className={s.progLabel}>{t.status_label}</span>
              <span className={s.statusPhase}>{statusText}</span>
            </div>
            <div className={s.row}>
              <span className={s.progLabel}>{t.progress_label}</span>
              <ProgressBar value={progress.percent} state={progress.state} phase={progress.phase} className={s.grow} />
              {progress.total ? (
                <span className={clsx(s.meta, s.mono)}>{fmtBytes(progress.written)}/{fmtBytes(progress.total)}</span>
              ) : null}
            </div>
            {flashing ? (
              <Button variant="danger" icon={SquareIcon} onClick={onStop} style={{width: '100%'}}>
                {t.stop_download}
              </Button>
            ) : (
              <Button
                variant="primary"
                icon={PlayIcon}
                onClick={onStart}
                disabled={!file}
                style={{width: '100%'}}
              >
                {t.start_flash_btn}
              </Button>
            )}
            {resultBanner}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={clsx(s.wsTool, className)} data-ws-mode="flash">
      <div className={s.panel}>
        <div className={s.panelHead}>
          <h3 className={s.panelTitle}>
            <CpuIcon size={17} />
            {t.flash_config}
          </h3>
          <StatusChip state={portState} label={portLabel} />
        </div>
        <div className={clsx(s.panelBody, s.stack)}>
          <div className="tw-grid tw-gap-3 sm:tw-grid-cols-3">
            {deviceField}
            {baudField}
            {addressField}
          </div>
          {customBaudInput}
          {chipHint}
          {fileDrop}
          {connectRow}
          {progressBlock}
          {resultBanner}
          <LogSurface
            entries={log}
            onClear={() => setLog([])}
            emptyText={t.waiting_download}
            height={260}
            stats={`${log.length}`}
          />
          <label className={s.checkRow}>
            <input
              type="checkbox"
              checked={autoDisconnect}
              onChange={(e) => setAutoDisconnect(e.target.checked)}
            />
            <span>{t.auto_disconnect_after_flash}</span>
          </label>
        </div>
      </div>
    </div>
  )
}
