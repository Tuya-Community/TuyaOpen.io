import bakedStars from '@site/src/data/github-stars.json'
import React, { useEffect, useState } from 'react'

const REPO = 'tuya/TuyaOpen'
const MASCOT_URL = 'https://images.tuyacn.com/fe-static/docs/img/7e618945-0ae2-4290-8844-6c33153e228a.png'
const CACHE_KEY = 'tuyaopen-gh-stars'
const CACHE_TTL = 60 * 60 * 1000 // 1h — avoid hammering the unauthenticated API
const FETCH_TIMEOUT = 8000

/**
 * Client-side refresh sources, tried in order. api.github.com is exact but
 * rate-limited per visitor IP and unreachable from some networks (notably
 * mainland-China egress), so mirror endpoints back it up. All three send
 * `Access-Control-Allow-Origin: *`.
 */
const SOURCES = [
  {
    url: `https://api.github.com/repos/${REPO}`,
    pick: (d) => d.stargazers_count,
  },
  {
    url: `https://ungh.cc/repos/${REPO}`,
    pick: (d) => d?.repo?.stars,
  },
  {
    url: `https://img.shields.io/github/stars/${REPO}.json`,
    pick: (d) => parseAbbrev(d?.value),
  },
]

// Baked at build time by scripts/fetch-github-stars.js, so the value shown on
// first paint (SSR + when every refresh source fails) is never older than the
// last deploy instead of being a permanently stale hardcoded number.
const FALLBACK = formatStars(bakedStars.count)

function formatStars(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k`
  return String(n)
}

/** Parse GitHub's abbreviated counts ("1.9k", "2k", "1,954") into an integer. */
function parseAbbrev(value) {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null
  if (typeof value !== 'string') return null
  const m = value
    .replace(/,/g, '')
    .trim()
    .match(/^(\d+(?:\.\d+)?)\s*([km])?$/i)
  if (!m) return null
  return Math.round(parseFloat(m[1]) * (m[2] ? (m[2].toLowerCase() === 'k' ? 1e3 : 1e6) : 1))
}

function readCache() {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null')
    if (cached && typeof cached.n === 'number' && cached.n > 0 && typeof cached.t === 'number') {
      return cached
    }
  } catch {
    // ignore malformed/unavailable storage
  }
  return null
}

function writeCache(n) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ n, t: Date.now() }))
  } catch {
    // storage may be unavailable (private mode) — the count still shows this session
  }
}

async function fetchStars() {
  for (const source of SOURCES) {
    try {
      const res = await fetch(source.url, {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(FETCH_TIMEOUT),
      })
      if (!res.ok) continue
      const n = parseAbbrev(source.pick(await res.json()))
      if (Number.isFinite(n) && n > 0) return n
    } catch {
      // try the next source
    }
  }
  return null
}

/**
 * GitHub link in the navbar, rendered as a bordered pill showing the live star
 * count. Rendering our own <a> (instead of a Docusaurus navbar item) keeps the
 * external-link icon off and lets us update the count client-side.
 */
export default function GithubStars() {
  const [stars, setStars] = useState(FALLBACK)
  const href = `https://github.com/${REPO}`

  useEffect(() => {
    let cancelled = false

    // Paint the cached value immediately (if any) so a returning visitor never
    // sees the build-time number flash down/up.
    const cached = readCache()
    if (cached) setStars(formatStars(cached.n))

    // Fresh cache: no network call needed.
    if (cached && Date.now() - cached.t < CACHE_TTL) return undefined

    fetchStars().then((n) => {
      if (cancelled || n === null) return
      setStars(formatStars(n))
      writeCache(n)
    })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="header-github">
      {/* Decorative mascot — nudges people toward the star button. Duplicate of
          the link below, so it's hidden from a11y/keyboard to avoid repetition. */}
      <a
        className="header-github__mascot"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-hidden="true"
      >
        <img src={MASCOT_URL} alt="" width={40} />
      </a>
      <a
        className="header-github-link"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`TuyaOpen on GitHub — ${stars} stars`}
      >
        {stars}
      </a>
    </div>
  )
}
