/**
 * Minimal, correct-enough ANSI SGR parser for the serial terminal.
 *
 * Device firmware logs (TuyaOpen included) emit CSI color sequences. We parse
 * SGR (`m`) sequences into colored React spans and strip everything else so
 * control noise never reaches the DOM. Handles: reset, bold/dim/italic/
 * underline, 16-color, 256-color (xterm cube + grayscale), and truecolor.
 */
import React from 'react'

const FG = ['#1f2328', '#cf222e', '#1a7f37', '#9a6700', '#0550ae', '#8250df', '#0a7384', '#656d76']
const FG_BRIGHT = ['#57606a', '#ff6b6b', '#46d160', '#d4a72c', '#54aeff', '#bc8cff', '#56d4dd', '#8c959f']

function color256(n) {
  if (n < 8) return FG[n]
  if (n < 16) return FG_BRIGHT[n - 8]
  if (n >= 232) {
    const v = 8 + (n - 232) * 10
    return `rgb(${v},${v},${v})`
  }
  n -= 16
  const r = Math.floor(n / 36)
  const g = Math.floor((n % 36) / 6)
  const b = n % 6
  const c = (v) => (v ? v * 40 + 55 : 0)
  return `rgb(${c(r)},${c(g)},${c(b)})`
}

// Strip every CSI sequence (for plain-text logs / fallback).
const CSI = /\x1b\[[0-9;]*[A-Za-z]/g
export function stripAnsi(str) {
  return str.replace(CSI, '')
}

// Parse SGR sequences into React nodes; strip other CSI.
export function parseAnsi(text, keyPrefix = '') {
  if (!text) return text
  if (text.indexOf('\x1b') === -1) return text

  const nodes = []
  let bold = false
  let dim = false
  let italic = false
  let underline = false
  let fg = null
  let bg = null

  // Split into [plain, params, plain, params, …] keeping SGR only.
  const sgr = /\x1b\[([\d;]*)m/g
  const other = /\x1b\[[0-9;]*[A-Za-z]/g
  // Remove non-SGR CSI first so they don't confuse indices.
  const clean = text.replace(other, '')

  let last = 0
  let m
  let idx = 0
  const emit = (str) => {
    if (!str) return
    const style = {}
    if (bold) style.fontWeight = 700
    if (dim) style.opacity = 0.55
    if (italic) style.fontStyle = 'italic'
    if (underline) style.textDecoration = 'underline'
    if (fg) style.color = fg
    if (bg) style.background = bg
    nodes.push(
      Object.keys(style).length ? (
        <span key={`${keyPrefix}-${idx++}`} style={style}>
          {str}
        </span>
      ) : (
        str
      ),
    )
  }

  while ((m = sgr.exec(clean))) {
    if (m.index > last) emit(clean.slice(last, m.index))
    last = sgr.lastIndex
    const params = m[1] === '' ? ['0'] : m[1].split(';')
    for (let p = 0; p < params.length; p++) {
      const code = parseInt(params[p], 10)
      if (Number.isNaN(code)) continue
      if (code === 0) {
        bold = dim = italic = underline = false
        fg = bg = null
      } else if (code === 1) bold = true
      else if (code === 2) dim = true
      else if (code === 3) italic = true
      else if (code === 4) underline = true
      else if (code === 22) {
        bold = false
        dim = false
      } else if (code === 23) italic = false
      else if (code === 24) underline = false
      else if (code === 39) fg = null
      else if (code === 49) bg = null
      else if (code >= 30 && code <= 37) fg = FG[code - 30]
      else if (code >= 40 && code <= 47) bg = FG[code - 40]
      else if (code >= 90 && code <= 97) fg = FG_BRIGHT[code - 90]
      else if (code >= 100 && code <= 107) bg = FG_BRIGHT[code - 100]
      else if (code === 38) {
        if (params[p + 1] === '5') {
          fg = color256(parseInt(params[p + 2], 10))
          p += 2
        } else if (params[p + 1] === '2') {
          fg = `rgb(${params[p + 2]},${params[p + 3]},${params[p + 4]})`
          p += 4
        }
      } else if (code === 48) {
        if (params[p + 1] === '5') {
          bg = color256(parseInt(params[p + 2], 10))
          p += 2
        } else if (params[p + 1] === '2') {
          bg = `rgb(${params[p + 2]},${params[p + 3]},${params[p + 4]})`
          p += 4
        }
      }
    }
  }
  if (last < clean.length) emit(clean.slice(last))
  return nodes.length ? nodes : text
}
