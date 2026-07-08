/**
 * Shared UI primitives for the web-serial tool. Built on the tokens in
 * styles.module.css. Restrained, state-rich, keyboard-reachable — product
 * register. Every interactive piece has default/hover/focus/active/disabled.
 */
import React from 'react'
import {clsx} from 'clsx'
import s from './styles.module.css'
import {AlertIcon, InfoIcon, CheckIcon} from './icons'

const VARIANT = {
  default: s.btn,
  primary: clsx(s.btn, s.btnPrimary),
  danger: clsx(s.btn, s.btnDanger),
  subtle: clsx(s.btn, s.btnSubtle),
}

export function Button({
  variant = 'default',
  icon: Icon,
  iconRight: IconRight,
  loading,
  children,
  className,
  ...rest
}) {
  return (
    <button className={clsx(VARIANT[variant] || VARIANT.default, className)} {...rest}>
      {loading ? (
        <Spinner />
      ) : Icon ? (
        <Icon size={16} />
      ) : null}
      {children}
      {IconRight ? <IconRight size={16} /> : null}
    </button>
  )
}

export function Spinner({className}) {
  return <span className={clsx(s.spinner, className)} aria-hidden="true" />
}

const STATE = {
  connected: {cls: s.chipOk, dot: true},
  connecting: {cls: s.chipWarn, dot: true},
  error: {cls: s.chipErr, dot: false},
  disconnected: {cls: s.chip, dot: false},
}

export function StatusChip({state = 'disconnected', label, className}) {
  const cfg = STATE[state] || STATE.disconnected
  return (
    <span
      className={clsx(s.chip, cfg.cls, className)}
      role="status"
      aria-live="polite"
    >
      <span className={s.chipDot} />
      {label}
    </span>
  )
}

/**
 * Segmented control. Rendered as a radiogroup of buttons for keyboard parity
 * (left/right to move, Enter/Space to confirm — though selection is immediate).
 */
export function SegmentedControl({options, value, onChange, ariaLabel, className}) {
  return (
    <div className={clsx(s.segmented, className)} role="radiogroup" aria-label={ariaLabel}>
      {options.map((opt) => {
        const active = opt.value === value
        const Icon = opt.icon
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            className={clsx(s.segmentedBtn, active && s.segmentedBtnActive)}
            onClick={() => onChange(opt.value)}
            onKeyDown={(e) => {
              const i = options.findIndex((o) => o.value === value)
              if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault()
                const n = options[(i + 1) % options.length]
                onChange(n.value)
              } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault()
                const n = options[(i - 1 + options.length) % options.length]
                onChange(n.value)
              }
            }}
          >
            {Icon ? <Icon size={15} /> : null}
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

export function Field({
  label,
  hint,
  error,
  counter,
  counterState,
  htmlFor,
  children,
  className,
}) {
  return (
    <div className={clsx(s.field, className)}>
      {(label || counter != null) && (
        <label className={s.fieldLabel} htmlFor={htmlFor}>
          <span>{label}</span>
          {counter != null && (
            <span
              className={clsx(
                s.counter,
                counterState === 'bad' && s.counterBad,
                counterState === 'ok' && s.counterOk,
              )}
            >
              {counter}
            </span>
          )}
        </label>
      )}
      {children}
      {error ? (
        <div className={s.fieldError}>
          <AlertIcon size={13} />
          {error}
        </div>
      ) : hint ? (
        <div className={s.meta}>{hint}</div>
      ) : null}
    </div>
  )
}

export function Notice({variant = 'default', icon, title, children, className}) {
  const Icon = icon || (variant === 'warn' ? AlertIcon : variant === 'info' ? InfoIcon : null)
  return (
    <div
      className={clsx(
        s.notice,
        variant === 'warn' && s.noticeWarn,
        variant === 'info' && s.noticeInfo,
        className,
      )}
    >
      {Icon ? <Icon size={16} /> : null}
      <div>
        {title ? (
          <b>{title}</b>
        ) : null}
        {title && children ? <br /> : null}
        {children}
      </div>
    </div>
  )
}

export function ProgressBar({value = 0, state = 'active', phase, className}) {
  const pct = Math.max(0, Math.min(100, value))
  return (
    <div
      className={clsx(s.progress, className)}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={clsx(
          s.progressFill,
          state === 'error' && s.progressFillErr,
          state === 'done' && s.progressFillDone,
          state === 'active' && phase === 'erase' && s.progressFillErase,
          state === 'active' && phase === 'verify' && s.progressFillVerify,
        )}
        style={{width: `${pct}%`}}
      />
    </div>
  )
}

/**
 * Success/error banner shown when a job settles. state: 'ok' | 'error' | null.
 */
export function ResultBanner({state, title, children, onDismiss, dismissLabel = 'Dismiss', className}) {
  if (!state) return null
  const ok = state === 'ok'
  const Icon = ok ? CheckIcon : AlertIcon
  return (
    <div
      className={clsx(s.resultBanner, ok ? s.resultBannerOk : s.resultBannerErr, className)}
      role="status"
      aria-live="polite"
    >
      <Icon size={16} />
      <div className={s.resultBannerMsg}>
        {title ? <b>{title} </b> : null}
        {children}
      </div>
      {onDismiss ? (
        <button
          type="button"
          className={clsx(s.btn, s.btnSubtle)}
          onClick={onDismiss}
          aria-label={dismissLabel}
          title={dismissLabel}
        >
          ×
        </button>
      ) : null}
    </div>
  )
}
