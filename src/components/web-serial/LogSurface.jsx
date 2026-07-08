/**
 * Terminal log surface — the shared "real terminal" for serial RX/TX, flash
 * progress, and auth replies. Renders parsed entries with optional ANSI
 * color, type tags, and timestamps. Auto-scrolls to the newest line while
 * "Follow" is on (default); toggle Follow off to read history while new output
 * arrives. Pinning is instant (no smooth animation) so rapid output stays
 * glued to the bottom.
 */
import React, {useLayoutEffect, useRef, useState} from 'react'
import {clsx} from 'clsx'
import s from './styles.module.css'
import {parseAnsi, stripAnsi} from './ansi'
import {CopyIcon, CheckIcon, TrashIcon, DownloadIcon} from './icons'

const TAG = {
  rx: {cls: s.logTagRx, label: 'RX'},
  tx: {cls: s.logTagTx, label: 'TX'},
  error: {cls: s.logTagErr, label: 'E'},
  warn: {cls: s.logTagWarn, label: 'W'},
  info: {cls: s.logTagInfo, label: 'I'},
  debug: {cls: s.logTagDebug, label: 'D'},
  sys: {cls: s.logTagSys, label: ''},
}

// text color by level: errors/warns emphasized, debug muted, info/sys readable.
const TEXT = {
  error: s.logTextErr,
  warn: s.logTextWarn,
  debug: s.logTextDebug,
}

function ts(d) {
  const p = (n, l = 2) => String(n).padStart(l, '0')
  return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}.${p(
    d.getMilliseconds(),
    3,
  )}`
}

export default function LogSurface({
  entries,
  onClear,
  ansi = false,
  showTimestamps = false,
  stats,
  emptyText,
  height = 280,
  className,
  defaultFollow = true,
}) {
  const viewportRef = useRef(null)
  const [follow, setFollow] = useState(defaultFollow)
  const [atBottom, setAtBottom] = useState(true)
  const [copied, setCopied] = useState(false)

  const handleScroll = () => {
    const el = viewportRef.current
    if (!el) return
    const bottom = el.scrollHeight - el.scrollTop - el.clientHeight < 24
    setAtBottom(bottom)
  }

  // Pin to the newest line on new entries while Follow is on.
  useLayoutEffect(() => {
    if (!follow) return
    const el = viewportRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [entries, follow])

  const jumpToBottom = () => {
    const el = viewportRef.current
    if (el) el.scrollTop = el.scrollHeight
    setAtBottom(true)
    setFollow(true)
  }

  const toggleFollow = () => {
    setFollow((f) => {
      const next = !f
      if (next) {
        const el = viewportRef.current
        if (el) el.scrollTop = el.scrollHeight
        setAtBottom(true)
      }
      return next
    })
  }

  const copy = async () => {
    const text = entries.map((e) => (ansi ? stripAnsi(e.text) : e.text)).join('\n')
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    } catch {
      /* clipboard blocked */
    }
  }

  const save = () => {
    const text = entries.map((e) => (ansi ? stripAnsi(e.text) : e.text)).join('\n')
    const blob = new Blob([text], {type: 'text/plain;charset=utf-8'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    const d = new Date()
    const p = (n, l = 2) => String(n).padStart(l, '0')
    const ts = `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`
    a.href = url
    a.download = `tuyaopen-web-serial-${ts}.log`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className={clsx(s.log, className)} style={{height}}>
      <div
        ref={viewportRef}
        className={s.logViewport}
        onScroll={handleScroll}
      >
        {entries.length === 0 ? (
          <div className={s.logEmpty}>{emptyText || ''}</div>
        ) : (
          entries.map((e) => {
            const tag = TAG[e.type] || TAG.sys
            return (
              <div className={s.logLine} key={e.id}>
                {showTimestamps && e.ts ? <span className={s.logTs}>{ts(e.ts)}</span> : null}
                {tag.label ? <span className={clsx(s.logTag, tag.cls)}>{tag.label}</span> : null}
                <span className={clsx(s.logText, TEXT[e.type])}>
                  {ansi ? parseAnsi(e.text, String(e.id)) : e.text}
                </span>
              </div>
            )
          })
        )}
      </div>
      <div className={s.logToolbar}>
        <span className={s.logStats}>{stats || ''}</span>
        <span className={s.grow} />
        <button
          type="button"
          className={clsx(s.btn, s.btnSubtle, follow && s.logFollowOn)}
          onClick={toggleFollow}
          aria-pressed={follow}
          title={follow ? 'Locked to newest — click to pause' : 'Paused — click to lock to newest'}
        >
          Lock Scrolling
        </button>
        {!atBottom ? (
          <button
            type="button"
            className={clsx(s.btn, s.btnSubtle)}
            onClick={jumpToBottom}
            title="Jump to latest"
          >
            ↓
          </button>
        ) : null}
        <button
          type="button"
          className={clsx(s.btn, s.btnSubtle)}
          onClick={save}
          title="Save log"
        >
          <DownloadIcon size={14} />
        </button>
        <button
          type="button"
          className={clsx(s.btn, s.btnSubtle)}
          onClick={copy}
          title="Copy log"
        >
          {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
        </button>
        {onClear ? (
          <button
            type="button"
            className={clsx(s.btn, s.btnSubtle)}
            onClick={onClear}
            title="Clear log"
          >
            <TrashIcon size={14} />
          </button>
        ) : null}
      </div>
    </div>
  )
}
